import { useState, useEffect } from 'react';
import Home from './screens/Home.jsx';
import UseCaseScreen from './screens/UseCaseScreen.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';
import { getApiKey } from './lib/api.js';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'uc1', label: 'UC1 · Quotation' },
  { id: 'uc2', label: 'UC2 · Negotiation' },
  { id: 'uc3', label: 'UC3 · Contracting' },
];

export default function App() {
  const [tab, setTab] = useState('home');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyTick, setKeyTick] = useState(0); // bump to re-read getApiKey()
  // Lifted above UseCaseScreen (which remounts per tab) so the collapse state persists as the
  // user moves between UC1, UC2, and UC3 within a session.
  const [inputsCollapsed, setInputsCollapsed] = useState(false);

  useEffect(() => {
    if (!getApiKey()) setShowKeyModal(true);
  }, []);

  const hasKey = !!getApiKey();
  void keyTick; // referenced to ensure re-render when key changes

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          Ericsson's <em>Second Brain</em>
        </div>

        <nav className="app-nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'active' : ''}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className={`api-status ${hasKey ? 'ok' : 'missing'}`}>
          <span className="dot" />
          <span>{hasKey ? 'Token set' : 'No token'}</span>
          <button onClick={() => setShowKeyModal(true)}>
            {hasKey ? 'change' : 'set token'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {tab === 'home' && <Home onNavigate={setTab} />}
        {tab !== 'home' && (
          <UseCaseScreen
            key={tab}
            useCase={tab}
            inputsCollapsed={inputsCollapsed}
            onToggleInputs={() => setInputsCollapsed((c) => !c)}
          />
        )}
      </main>

      {showKeyModal && (
        <ApiKeyModal
          onClose={() => setShowKeyModal(false)}
          onChange={() => setKeyTick((n) => n + 1)}
        />
      )}
    </div>
  );
}
