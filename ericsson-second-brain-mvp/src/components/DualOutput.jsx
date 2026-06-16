import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamCompletion, getApiKey } from '../lib/api.js';
import { buildPrompt, buildAssessmentPrompt, buildOfferDataPrompt, citationIndex } from '../lib/prompts.js';
import { SCENARIOS } from '../lib/scenarios.js';
import {
  preprocessCitations,
  stripCiteMarkers,
  parseAssessmentJson,
  citeUrlTransform,
  countGroundedFromMarkdown,
} from '../lib/citations.js';
import {
  downloadSolutionDescription,
  downloadPricingSchedule,
  downloadCompliance,
  downloadMarkdownFallback,
} from '../lib/offerDocs.js';

export default function DualOutput({ useCase, scenario, maxTokens = 1500, rfqOverride = null }) {
  const [genericText, setGenericText] = useState('');
  const [brainText, setBrainText] = useState('');
  const [genericState, setGenericState] = useState('idle'); // idle | loading | streaming | done | error
  const [brainState, setBrainState] = useState('idle');
  const [genericErr, setGenericErr] = useState('');
  const [brainErr, setBrainErr] = useState('');
  const [running, setRunning] = useState(false);

  // Assessment (Features 2 and 3). Additive: never blocks the two outputs.
  const [assessment, setAssessment] = useState(null);
  const [assessmentState, setAssessmentState] = useState('idle'); // idle | loading | done | unavailable

  // Offer documents (UC1 only). Additive: never blocks the outputs.
  const [offerData, setOfferData] = useState(null);
  const [offerState, setOfferState] = useState('idle'); // idle | loading | done | unavailable

  const userMessage = scenario || SCENARIOS[useCase];

  const run = async () => {
    if (!getApiKey()) {
      setGenericErr('Token not set. Click the token indicator in the header.');
      setGenericState('error');
      setBrainErr('Token not set. Click the token indicator in the header.');
      setBrainState('error');
      return;
    }

    setRunning(true);
    setGenericText('');
    setBrainText('');
    setGenericErr('');
    setBrainErr('');
    setGenericState('loading');
    setBrainState('loading');
    setAssessment(null);
    setAssessmentState('idle');
    setOfferData(null);
    setOfferState('idle');

    let genericFull = '';
    let brainFull = '';

    const runGeneric = (async () => {
      try {
        const system = await buildPrompt(useCase, 'generic');
        setGenericState('streaming');
        await streamCompletion({
          system,
          userMessage,
          maxTokens,
          onChunk: (t) => {
            genericFull += t;
            setGenericText((prev) => prev + t);
          },
        });
        setGenericState('done');
      } catch (e) {
        setGenericErr(e.message);
        setGenericState('error');
      }
    })();

    const runBrain = (async () => {
      try {
        const system = await buildPrompt(useCase, 'second-brain', { rfqOverride });
        setBrainState('streaming');
        await streamCompletion({
          system,
          userMessage,
          maxTokens,
          onChunk: (t) => {
            brainFull += t;
            setBrainText((prev) => prev + t);
          },
        });
        setBrainState('done');
      } catch (e) {
        setBrainErr(e.message);
        setBrainState('error');
      }
    })();

    await Promise.allSettled([runGeneric, runBrain]);
    setRunning(false);

    // Fire the assessment only when both outputs have content. Fire and forget so it can
    // never block or break the rendered outputs.
    if (genericFull.trim() && brainFull.trim()) {
      setAssessmentState('loading');
      (async () => {
        try {
          const { system, userMessage: aMsg } = await buildAssessmentPrompt(
            useCase,
            genericFull,
            stripCiteMarkers(brainFull),
          );
          let raw = '';
          await streamCompletion({
            system,
            userMessage: aMsg,
            maxTokens: 1800,
            onChunk: (t) => {
              raw += t;
            },
          });
          const parsed = parseAssessmentJson(raw);
          if (parsed && parsed.rubric) {
            setAssessment(parsed);
            setAssessmentState('done');
          } else {
            setAssessmentState('unavailable');
          }
        } catch {
          setAssessmentState('unavailable');
        }
      })();
    }

    // Offer documents from the Second Brain output (UC1 only). Fire and forget.
    if (useCase === 'uc1' && brainFull.trim()) {
      setOfferState('loading');
      (async () => {
        try {
          const { system, userMessage: oMsg } = await buildOfferDataPrompt(stripCiteMarkers(brainFull));
          let raw = '';
          await streamCompletion({
            system,
            userMessage: oMsg,
            maxTokens: 2200,
            onChunk: (t) => {
              raw += t;
            },
          });
          const parsed = parseAssessmentJson(raw);
          if (parsed && (parsed.requirementSpec || parsed.pricing || parsed.compliance)) {
            setOfferData(parsed);
            setOfferState('done');
          } else {
            setOfferState('unavailable');
          }
        } catch {
          setOfferState('unavailable');
        }
      })();
    }
  };

  return (
    <>
      <div className="run-bar">
        <button className="run" onClick={run} disabled={running}>
          {running ? 'Running…' : 'Run scenario'}
        </button>
        <span className="note">
          Both columns run in parallel. Same model. Same scenario. Only the loaded knowledge differs.
        </span>
      </div>

      <div className="dual-output">
        <Column
          variant="generic"
          title="Generic LLM + public RAG"
          subtitle="Public Ericsson description + public customer description"
          state={genericState}
          text={genericText}
          error={genericErr}
          useCase={useCase}
          scorecard={assessment && assessment.rubric ? assessment.rubric.generic : null}
          assessmentState={assessmentState}
          cdCommentary={assessment ? assessment.cdCommentary : ''}
        />
        <Column
          variant="brain"
          title="Second Brain"
          subtitle="Role skills + customer skill + knowledgebase + Won/Loss debriefs"
          state={brainState}
          text={brainText}
          error={brainErr}
          cited
          useCase={useCase}
          scorecard={assessment && assessment.rubric ? assessment.rubric.secondBrain : null}
          assessmentState={assessmentState}
          offerState={offerState}
          offerData={offerData}
        />
      </div>
    </>
  );
}

function Column({
  variant,
  title,
  subtitle,
  state,
  text,
  error,
  cited,
  useCase,
  scorecard,
  assessmentState,
  cdCommentary,
  offerState,
  offerData,
}) {
  // One citation parse per output, shared by the rendered pills and the grounding count, so the
  // number can never diverge from the highlights. The generic side is never tagged, so it has no
  // parse and a hardcoded zero.
  const idx = useMemo(() => (cited ? citationIndex(useCase) : null), [cited, useCase]);
  const cite = useMemo(() => {
    if (!cited) return { ok: true, md: null };
    try {
      return { ok: true, md: preprocessCitations(text) };
    } catch {
      return { ok: false, md: stripCiteMarkers(text) };
    }
  }, [cited, text]);
  const grounding = useMemo(() => {
    if (!cited) return { ok: true, valid: 0, reasoning: 0, data: 0 };
    if (!cite.ok) return { ok: false, valid: 0, reasoning: 0, data: 0 };
    return { ok: true, ...countGroundedFromMarkdown(cite.md, idx) };
  }, [cited, cite, idx]);

  return (
    <div className={`output-col ${variant}`}>
      <h3>{title}</h3>
      <div className="col-sub">{subtitle}</div>

      {state === 'done' && <GroundingIndicator variant={variant} grounding={grounding} />}

      {assessmentState !== 'idle' && <Scorecard items={scorecard} state={assessmentState} />}

      {state === 'idle' && (
        <div className="output-body empty">
          Click <em>Run scenario</em> to compare outputs.
        </div>
      )}

      {state === 'loading' && (
        <div className="output-body loading">
          <span className="spinner" /> Loading skills and knowledgebase…
        </div>
      )}

      {state === 'error' && <div className="output-body error">{error}</div>}

      {(state === 'streaming' || state === 'done') && (
        <div className={`output-body ${state === 'streaming' ? 'streaming' : ''}`}>
          {state === 'streaming' && !text ? (
            <span className="loading">
              <span className="spinner" /> Generating…
            </span>
          ) : cited ? (
            <CitedMarkdown md={cite.md} idx={idx} />
          ) : (
            <ReactMarkdown>{text}</ReactMarkdown>
          )}
        </div>
      )}

      {variant === 'generic' && assessmentState !== 'idle' && (
        <CdCommentary text={cdCommentary} state={assessmentState} />
      )}

      {variant === 'brain' && offerState !== 'idle' && (
        <OfferDocs state={offerState} data={offerData} brainText={text} />
      )}
    </div>
  );
}

function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// Renders the Second Brain output with citation pills. Falls back to plain (markers stripped)
// if preprocessing ever fails, so the output always reads correctly.
function CitedMarkdown({ md, idx }) {
  const components = {
    a: ({ href, children }) => {
      if (typeof href === 'string' && href.startsWith('cite://')) {
        const file = safeDecode(href.slice('cite://'.length));
        const type = (idx && idx[file]) || null;
        const cls = type ? `cite cite-${type}` : 'cite cite-unknown';
        const tip = type ? file : `unrecognised source: ${file}`;
        return (
          <span className={cls} title={tip}>
            {children}
          </span>
        );
      }
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
  };

  return (
    <ReactMarkdown urlTransform={citeUrlTransform} components={components}>
      {md}
    </ReactMarkdown>
  );
}

// Per-run grounding density. Derived only from the parsed pills above: the count of validated
// citations in this answer. Generic is always zero by construction. This is a claim about this
// answer's traceability, not about corpus size.
function GroundingIndicator({ variant, grounding }) {
  if (variant === 'brain' && grounding && grounding.ok === false) {
    return <div className="grounding muted">Grounding unavailable</div>;
  }
  const n = (grounding && grounding.valid) || 0;
  const noun = n === 1 ? 'claim' : 'claims';
  const showSplit =
    variant === 'brain' && n > 0 && grounding && (grounding.reasoning || grounding.data);
  return (
    <div className={`grounding ${variant}`}>
      <span className="g-count">{n}</span> {noun} grounded in named sources
      {showSplit ? (
        <span className="g-split">
          {' · '}
          {grounding.reasoning} reasoning, {grounding.data} data
        </span>
      ) : null}
    </div>
  );
}

function Scorecard({ items, state }) {
  if (state === 'loading') {
    return (
      <div className="scorecard loading">
        <span className="spinner" /> Scoring against the rubric…
      </div>
    );
  }
  if (state === 'unavailable' || !Array.isArray(items) || items.length === 0) {
    return <div className="scorecard muted">Assessment unavailable</div>;
  }
  return (
    <div className="scorecard">
      {items.map((it, i) => {
        const pass = it && it.pass === true;
        return (
          <div key={i} className={`sc-row ${pass ? 'pass' : 'fail'}`} title={(it && it.note) || ''}>
            <span className="sc-mark">{pass ? '✓' : '—'}</span>
            <span className="sc-item">{(it && it.item) || ''}</span>
          </div>
        );
      })}
    </div>
  );
}

function CdCommentary({ text, state }) {
  if (state === 'loading') return null;
  if (state === 'unavailable' || !text) {
    return (
      <div className="cd-commentary muted">
        <div className="cd-label">What a Commercial Director would say</div>
        <p>Assessment unavailable.</p>
      </div>
    );
  }
  return (
    <div className="cd-commentary">
      <div className="cd-label">What a Commercial Director would say</div>
      <p>{text}</p>
    </div>
  );
}

// Send-ready document downloads (Second Brain, UC1). Each file is generated on click with a
// lazy-loaded library. A failure surfaces an inline message and the raw-output fallback, so it
// can never take down the column.
function OfferDocs({ state, data, brainText }) {
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');

  if (state === 'loading') {
    return (
      <div className="offer-docs loading">
        <span className="spinner" /> Preparing send-ready documents…
      </div>
    );
  }

  if (state === 'unavailable' || !data) {
    return (
      <div className="offer-docs">
        <div className="offer-label">Send-ready documents</div>
        <p className="offer-note">Structured generation unavailable. You can still download the raw output.</p>
        <div className="offer-btns">
          <button className="offer-btn" onClick={() => downloadMarkdownFallback(stripCiteMarkers(brainText))}>
            Second Brain output (.md)
          </button>
        </div>
      </div>
    );
  }

  const gen = async (key, fn) => {
    setErr('');
    setBusy(key);
    try {
      await fn();
    } catch {
      setErr('Could not generate that file. Use the raw output below.');
    } finally {
      setBusy('');
    }
  };

  return (
    <div className="offer-docs">
      <div className="offer-label">Send-ready documents · indicative draft</div>
      <div className="offer-btns">
        <button
          className="offer-btn doc"
          disabled={!!busy}
          onClick={() => gen('sd', () => downloadSolutionDescription(data))}
        >
          {busy === 'sd' ? 'Generating…' : 'Solution Description (.docx)'}
        </button>
        <button
          className="offer-btn"
          disabled={!!busy}
          onClick={() => gen('pr', () => downloadPricingSchedule(data.pricing))}
        >
          {busy === 'pr' ? 'Generating…' : 'Pricing schedule (.xlsx)'}
        </button>
        <button
          className="offer-btn"
          disabled={!!busy}
          onClick={() => gen('co', () => downloadCompliance(data.compliance))}
        >
          {busy === 'co' ? 'Generating…' : 'Statement of Compliance (.xlsx)'}
        </button>
      </div>
      {err && <p className="offer-err">{err}</p>}
      <p className="offer-note">
        Solution Description fills the real Ericsson template. Indicative draft for review, not a binding offer.
      </p>
    </div>
  );
}
