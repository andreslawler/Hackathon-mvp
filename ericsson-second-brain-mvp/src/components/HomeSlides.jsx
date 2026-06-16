import { useState, useEffect } from 'react';

// Presentation sections for the Home screen. Each can be toggled to a standalone full-screen slide
// (position fixed, inset 0) and exited with Escape, so the presenter can drive them as slides.

const COL = {
  blue: '#1e4a6d',
  green: '#2d8a73',
  amber: '#c98a3c',
  ink: '#1a1815',
  taupe: '#b0a99a',
};

const ROLE_NODES = [
  'Commercial Director',
  'Account Manager',
  'Solution Architect',
  'Contract Manager',
  'Customer Twin',
];

const KB_NODES = [
  'Won/Loss Debriefs',
  'Installed Base + Financials',
  'Prior Deal Proposals',
  'BCTC Catalogue',
  'Product Catalog + RFI',
];

const UC_BOXES = [
  { tag: 'UC1', out: 'Budgetary quotation' },
  { tag: 'UC2', out: 'Negotiation play' },
  { tag: 'UC3', out: 'BCTC assessment' },
];

function SlideShell({ title, kicker, children }) {
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (!full) return undefined;
    const onEsc = (e) => {
      if (e.key === 'Escape') setFull(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [full]);

  return (
    <section className={`slide${full ? ' slide-full' : ''}`} aria-label={title}>
      <button
        type="button"
        className="slide-full-btn"
        onClick={() => setFull((f) => !f)}
        title={full ? 'Exit full screen (Escape)' : 'Full screen'}
      >
        {full ? 'Exit · Esc' : 'Full screen'}
      </button>
      <div className="slide-head">
        {kicker ? <div className="slide-kicker">{kicker}</div> : null}
        <h2 className="slide-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function BusinessCaseSlide() {
  return (
    <SlideShell title="The business case" kicker="Why now">
      <div className="bc-region">
        <h3 className="bc-headline">
          Without institutional knowledge, AI adoption fails.
          <br />
          Ericsson has SEK 2.40B of exposure if it does.
        </h3>
        <p className="bc-lead">
          Gartner finds 60% of AI projects fail without AI-ready institutional knowledge. Applied
          to Ericsson's SEK 4.0B AI investment base, that is SEK 2.40B of risk exposure.
        </p>
      </div>

      <div className="bc-region bc-evidence">
        <div className="bc-cell">
          <div className="bc-kicker">Gartner · 2025</div>
          <div className="bc-fig">60%</div>
          <div className="bc-desc">
            of AI projects without AI-ready data and knowledge foundations will be abandoned through
            2026.
          </div>
        </div>
        <div className="bc-cell">
          <div className="bc-kicker">MIT NANDA · July 2025</div>
          <div className="bc-fig">95%</div>
          <div className="bc-desc">
            of enterprise GenAI pilots deliver zero measurable P&amp;L impact. Root cause: tools that
            do not learn from organisational workflows.
          </div>
        </div>
        <div className="bc-cell">
          <div className="bc-kicker">S&amp;P Global · 2025</div>
          <div className="bc-fig">42%</div>
          <div className="bc-desc">
            of companies abandoned most AI initiatives in 2025, up from 17% the year prior. Average
            org scrapped 46% of proofs-of-concept.
          </div>
        </div>
      </div>

      <div className="bc-region bc-bridge">
        <div className="bc-block bc-block-risk">
          <div className="bc-block-label">Root cause</div>
          <p className="bc-block-body">
            The failure is not the model. It is a failure of context: AI running without the
            institutional knowledge that defines how the organisation actually works. Generic agents
            produce generic output. For a mission-critical deal, generic is not good enough.
          </p>
        </div>
        <div className="bc-block bc-block-brain">
          <div className="bc-block-label">What the Second Brain does</div>
          <p className="bc-block-body">
            The Second Brain is that institutional knowledge, captured as files an AI can reason
            against. Not another pilot. The knowledge foundation that makes AI adoption succeed.
          </p>
        </div>
      </div>

      <div className="bc-region bc-return">
        <div className="bc-return-kicker">Savings enabled: effort freed per month across three use cases</div>
        <table className="bc-table">
          <thead>
            <tr>
              <th>Use case</th>
              <th>Hours saved per run</th>
              <th>Users per month</th>
              <th>Annual value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UC1: Budgetary quotation</td>
              <td className="bc-num">40 hrs</td>
              <td className="bc-num">300</td>
              <td className="bc-eur">EUR 21.6M</td>
            </tr>
            <tr>
              <td>UC2: Negotiation advisor</td>
              <td className="bc-num">4 hrs</td>
              <td className="bc-num">40</td>
              <td className="bc-eur">EUR 0.3M</td>
            </tr>
            <tr>
              <td>UC3: BCTC review</td>
              <td className="bc-num">8 hrs</td>
              <td className="bc-num">200</td>
              <td className="bc-eur">EUR 2.9M</td>
            </tr>
          </tbody>
        </table>
        <div className="bc-return-footer">
          13,760 hours freed per month · EUR 24.8M annual effort value
        </div>
      </div>
    </SlideShell>
  );
}

export function BrainDiagramSlide() {
  const NW = 204;
  const NH = 44;
  const NY0 = 44;
  const NP = 80;
  const LX = 16;
  const RX = 1000 - 16 - NW; // 780
  const cy = (i) => NY0 + i * NP + NH / 2;
  const leftTargetX = 312;
  const rightTargetX = 688;
  const target = (i) => 158 + i * 36;
  const UCY = 548;
  const BW = 210;
  const BH = 78;
  const boxCx = [185, 500, 815];

  const marker = (id, fill) => (
    <marker id={id} viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill={fill} />
    </marker>
  );

  return (
    <SlideShell title="How it is built" kicker="Architecture">
      <div className="brain-diagram">
        <svg
          viewBox="0 0 1000 690"
          className="brain-svg"
          role="img"
          aria-label="Role skills and knowledgebase feed one model, which produces three use case outputs"
        >
          <defs>
            {marker('ar-blue', COL.blue)}
            {marker('ar-green', COL.green)}
            {marker('ar-amber', COL.amber)}
            {marker('ar-taupe', COL.taupe)}
          </defs>

          <g>
            <ellipse cx="455" cy="232" rx="150" ry="104" fill={COL.ink} fillOpacity="0.13" stroke={COL.ink} strokeOpacity="0.16" strokeWidth="0.5" />
            <ellipse cx="545" cy="232" rx="150" ry="104" fill={COL.ink} fillOpacity="0.13" stroke={COL.ink} strokeOpacity="0.16" strokeWidth="0.5" />
            <path d="M345 205 q38 -22 76 0 q38 22 76 0 q38 -22 76 0 q38 22 62 4" fill="none" stroke={COL.ink} strokeOpacity="0.12" strokeWidth="0.5" />
            <path d="M345 240 q38 22 76 0 q38 -22 76 0 q38 22 76 0 q38 -22 62 -4" fill="none" stroke={COL.ink} strokeOpacity="0.12" strokeWidth="0.5" />
            <path d="M360 272 q36 -20 72 0 q36 20 72 0 q36 -20 72 0 q36 20 60 2" fill="none" stroke={COL.ink} strokeOpacity="0.12" strokeWidth="0.5" />
            <text x="500" y="150" textAnchor="middle" className="bd-brainlabel">
              SECOND BRAIN
            </text>
            <text x="500" y="316" textAnchor="middle" className="bd-brainmodel">
              one model · one scenario
            </text>
          </g>

          <text x={LX + NW / 2} y="28" textAnchor="middle" className="bd-colcap" fill={COL.blue}>
            ROLE SKILLS
          </text>
          <text x={RX + NW / 2} y="28" textAnchor="middle" className="bd-colcap" fill={COL.green}>
            KNOWLEDGEBASE
          </text>

          {ROLE_NODES.map((label, i) => {
            const twin = i === ROLE_NODES.length - 1;
            const c = twin ? COL.amber : COL.blue;
            const y = NY0 + i * NP;
            return (
              <g key={label}>
                <line
                  x1={LX + NW}
                  y1={cy(i)}
                  x2={leftTargetX}
                  y2={target(i)}
                  stroke={c}
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                  markerEnd={`url(#${twin ? 'ar-amber' : 'ar-blue'})`}
                />
                <rect x={LX} y={y} width={NW} height={NH} rx="4" fill="#ffffff" stroke={c} strokeWidth="1" />
                <text x={LX + NW / 2} y={y + NH / 2 + 4} textAnchor="middle" className="bd-node" fill={c}>
                  {label}
                </text>
              </g>
            );
          })}

          {KB_NODES.map((label, i) => {
            const y = NY0 + i * NP;
            return (
              <g key={label}>
                <line
                  x1={RX}
                  y1={cy(i)}
                  x2={rightTargetX}
                  y2={target(i)}
                  stroke={COL.green}
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                  markerEnd="url(#ar-green)"
                />
                <rect x={RX} y={y} width={NW} height={NH} rx="4" fill="#ffffff" stroke={COL.green} strokeWidth="1" />
                <text x={RX + NW / 2} y={y + NH / 2 + 4} textAnchor="middle" className="bd-node" fill={COL.green}>
                  {label}
                </text>
              </g>
            );
          })}

          {UC_BOXES.map((uc, i) => {
            const bx = boxCx[i] - BW / 2;
            return (
              <g key={uc.tag}>
                <line
                  x1="500"
                  y1="340"
                  x2={boxCx[i]}
                  y2={UCY}
                  stroke={COL.taupe}
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                  markerEnd="url(#ar-taupe)"
                />
                <rect x={bx} y={UCY} width={BW} height={BH} rx="4" fill="#ffffff" stroke={COL.green} strokeWidth="1" />
                <text x={boxCx[i]} y={UCY + 30} textAnchor="middle" className="bd-uctag" fill={COL.ink}>
                  {uc.tag}
                </text>
                <text x={boxCx[i]} y={UCY + 52} textAnchor="middle" className="bd-ucout">
                  {uc.out}
                </text>
              </g>
            );
          })}

          <text x="500" y="678" textAnchor="middle" className="bd-caption">
            Same model. Same scenario. Only the loaded knowledge differs.
          </text>
        </svg>
      </div>
    </SlideShell>
  );
}
