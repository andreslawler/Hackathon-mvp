import { useState } from 'react';
import InputsPanel from '../components/InputsPanel.jsx';
import DualOutput from '../components/DualOutput.jsx';
import FileViewer from '../components/FileViewer.jsx';
import { SCENARIOS } from '../lib/scenarios.js';

const META = {
  uc1: {
    kicker: 'Use Case 1',
    title: 'Budgetary quotation generation',
    deck:
      'Output a pricing schedule, solution description, and statement of compliance from an indicative RFI. Compare a generic LLM with public information against the Second Brain — skills, prior deals, customer behaviour, won/loss debriefs.',
    maxTokens: 2200,
  },
  uc2: {
    kicker: 'Use Case 2',
    title: 'Negotiation advisor',
    deck:
      'A live negotiation scenario. The generic LLM has only public information about Ericsson and the customer. The Second Brain has the CD/AM/SA reasoning, the customer behavioural pattern, vendor landscape, financials, and three Won/Loss debriefs.',
    maxTokens: 1800,
  },
  uc3: {
    kicker: 'Use Case 3',
    title: 'BCTC contract negotiation',
    deck:
      'A contract deviation assessment. The Second Brain has the BCTC catalogue with Ericsson wanted positions, the customer contract history, and the role skills of Contract Manager and Legal Counsel.',
    maxTokens: 2200,
  },
};

export default function UseCaseScreen({ useCase }) {
  const meta = META[useCase];
  const [viewing, setViewing] = useState(null);

  return (
    <>
      <header className="screen-header">
        <div className="screen-kicker">{meta.kicker}</div>
        <h1 className="screen-title">{meta.title}</h1>
        <p className="screen-deck">{meta.deck}</p>
      </header>

      <div className="uc-layout">
        <InputsPanel useCase={useCase} onOpen={(path) => setViewing(path)} />

        <div className="uc-run-area">
          <div className="scenario-box">
            <div className="label">Scenario</div>
            <div className="text">{SCENARIOS[useCase]}</div>
          </div>

          <DualOutput useCase={useCase} maxTokens={meta.maxTokens} />
        </div>
      </div>

      {viewing && <FileViewer path={viewing} onClose={() => setViewing(null)} />}
    </>
  );
}
