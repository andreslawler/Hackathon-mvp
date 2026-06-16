import { GENERIC_MANIFEST, MANIFEST } from '../lib/prompts.js';

function Chevron({ dir }) {
  return (
    <svg className={`chevron ${dir}`} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path
        d="M3.5 1 L7 5 L3.5 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InputsPanel({ useCase, onOpen, collapsed, onToggle, rfq }) {
  const m = MANIFEST[useCase].secondBrain;
  const loadedCount = m.skills.length + m.knowledgebase.length + (rfq ? 1 : 0);

  // Collapsed: a thin rail that still registers that knowledge is loaded (count + icon stack).
  if (collapsed) {
    const dots = [
      ...m.skills.map((_, i) => ({ key: `s${i}`, cls: 'skill' })),
      ...m.knowledgebase.map((_, i) => ({ key: `k${i}`, cls: 'kb' })),
      ...(rfq ? [{ key: 'rfq', cls: 'kb' }] : []),
    ].slice(0, 12);

    return (
      <aside className="inputs-panel collapsed">
        <button
          className="inputs-toggle"
          onClick={onToggle}
          title="Expand inputs"
          aria-label="Expand inputs panel"
        >
          <Chevron dir="right" />
        </button>
        <div className="rail-count">
          <span className="rail-num">{loadedCount}</span>
          <span className="rail-label">files</span>
        </div>
        <div className="rail-stack" aria-hidden="true">
          {dots.map((d) => (
            <span key={d.key} className={`dot ${d.cls}`} />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="inputs-panel">
      <div className="inputs-head">
        <span className="inputs-head-label">Inputs loaded</span>
        <button
          className="inputs-toggle"
          onClick={onToggle}
          title="Collapse inputs"
          aria-label="Collapse inputs panel"
        >
          <Chevron dir="left" />
        </button>
      </div>

      <h4>Second Brain — Skills</h4>
      <ul>
        {m.skills.map((s) => (
          <li
            key={s.path}
            className="input-file skill"
            onClick={() => onOpen(s.path)}
            title={s.path}
          >
            <span className="icon" />
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      <h4>Second Brain — Knowledgebase</h4>
      <ul>
        {m.knowledgebase.map((k) => {
          const superseded = rfq && k.path.endsWith('rfi-sample.md');
          return (
            <li
              key={k.path}
              className={`input-file kb${superseded ? ' superseded' : ''}`}
              onClick={() => onOpen(k.path)}
              title={superseded ? 'Replaced by the uploaded RFQ for this run' : k.path}
            >
              <span className="icon" />
              <span>
                {k.label}
                {superseded ? ' · inactive' : ''}
              </span>
            </li>
          );
        })}
        {rfq && (
          <li
            className="input-file kb uploaded active"
            onClick={() => onOpen({ title: `Customer RFQ (uploaded): ${rfq.filename}`, text: rfq.text })}
            title="Active RFI input for this run (uploaded RFQ)"
          >
            <span className="icon" />
            <span>Customer RFQ (uploaded): {rfq.filename}</span>
          </li>
        )}
      </ul>

      <h4>Generic side</h4>
      <ul>
        {GENERIC_MANIFEST.map((g) => (
          <li
            key={g.path}
            className="input-file generic"
            onClick={() => onOpen(g.path)}
            title={g.path}
          >
            <span className="icon" />
            <span>{g.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
