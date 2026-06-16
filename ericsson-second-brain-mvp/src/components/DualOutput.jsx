import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamCompletion, getApiKey } from '../lib/api.js';
import { buildPrompt } from '../lib/prompts.js';
import { SCENARIOS } from '../lib/scenarios.js';

export default function DualOutput({ useCase, scenario, maxTokens = 1500 }) {
  const [genericText, setGenericText] = useState('');
  const [brainText, setBrainText] = useState('');
  const [genericState, setGenericState] = useState('idle'); // idle | loading | streaming | done | error
  const [brainState, setBrainState] = useState('idle');
  const [genericErr, setGenericErr] = useState('');
  const [brainErr, setBrainErr] = useState('');
  const [running, setRunning] = useState(false);

  const userMessage = scenario || SCENARIOS[useCase];

  const run = async () => {
    if (!getApiKey()) {
      setGenericErr('API key not set. Click the key indicator in the header.');
      setGenericState('error');
      setBrainErr('API key not set. Click the key indicator in the header.');
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

    const runGeneric = (async () => {
      try {
        const system = await buildPrompt(useCase, 'generic');
        setGenericState('streaming');
        await streamCompletion({
          system,
          userMessage,
          maxTokens,
          onChunk: (t) => setGenericText((prev) => prev + t),
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
          onChunk: (t) => setBrainText((prev) => prev + t),
        });
        setBrainState('done');
      } catch (e) {
        setBrainErr(e.message);
        setBrainState('error');
      }
    })();

    await Promise.allSettled([runGeneric, runBrain]);
    setRunning(false);
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
        />
        <Column
          variant="brain"
          title="Second Brain"
          subtitle="Role skills + customer skill + knowledgebase + Won/Loss debriefs"
          state={brainState}
          text={brainText}
          error={brainErr}
        />
      </div>
    </>
  );
}

function Column({ variant, title, subtitle, state, text, error }) {
  return (
    <div className={`output-col ${variant}`}>
      <h3>{title}</h3>
      <div className="col-sub">{subtitle}</div>

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
          ) : (
            <ReactMarkdown>{text}</ReactMarkdown>
          )}
        </div>
      )}
    </div>
  );
}
