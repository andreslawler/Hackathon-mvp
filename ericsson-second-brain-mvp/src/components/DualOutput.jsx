import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamCompletion, getApiKey } from '../lib/api.js';
import { buildPrompt, buildAssessmentPrompt, citationIndex } from '../lib/prompts.js';
import { SCENARIOS } from '../lib/scenarios.js';
import {
  preprocessCitations,
  stripCiteMarkers,
  parseAssessmentJson,
  citeUrlTransform,
} from '../lib/citations.js';

export default function DualOutput({ useCase, scenario, maxTokens = 1500 }) {
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
        const system = await buildPrompt(useCase, 'second-brain');
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
}) {
  return (
    <div className={`output-col ${variant}`}>
      <h3>{title}</h3>
      <div className="col-sub">{subtitle}</div>

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
            <CitedMarkdown text={text} useCase={useCase} />
          ) : (
            <ReactMarkdown>{text}</ReactMarkdown>
          )}
        </div>
      )}

      {variant === 'generic' && assessmentState !== 'idle' && (
        <CdCommentary text={cdCommentary} state={assessmentState} />
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
function CitedMarkdown({ text, useCase }) {
  let md;
  try {
    md = preprocessCitations(text);
  } catch {
    md = stripCiteMarkers(text);
  }
  const idx = citationIndex(useCase);

  const components = {
    a: ({ href, children }) => {
      if (typeof href === 'string' && href.startsWith('cite://')) {
        const file = safeDecode(href.slice('cite://'.length));
        const type = idx[file] || null;
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
