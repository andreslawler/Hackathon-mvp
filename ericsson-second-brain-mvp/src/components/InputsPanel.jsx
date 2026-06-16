import { GENERIC_MANIFEST, MANIFEST } from '../lib/prompts.js';

export default function InputsPanel({ useCase, onOpen }) {
  const m = MANIFEST[useCase].secondBrain;

  return (
    <aside className="inputs-panel">
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
        {m.knowledgebase.map((k) => (
          <li
            key={k.path}
            className="input-file kb"
            onClick={() => onOpen(k.path)}
            title={k.path}
          >
            <span className="icon" />
            <span>{k.label}</span>
          </li>
        ))}
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
