import { useState } from 'react';
import { getApiKey, setApiKey, clearApiKey } from '../lib/api.js';

export default function ApiKeyModal({ onClose, onChange }) {
  const [value, setValue] = useState(getApiKey());

  const save = () => {
    if (value.trim()) {
      setApiKey(value.trim());
    } else {
      clearApiKey();
    }
    onChange?.();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="path">Mimir access token</span>
          <button onClick={onClose}>close · esc</button>
        </div>
        <div className="apikey-form">
          <label htmlFor="apikey">Paste your Mimir token</label>
          <input
            id="apikey"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="eyJ... (access token from Microsoft Graph Explorer)"
            autoFocus
          />
          <div className="note">
            Paste the access token from Microsoft Graph Explorer. Stored in sessionStorage
            only and cleared when this tab closes. The token expires, so refresh it if calls
            start failing. Sent only to the Mimir endpoint through the local dev proxy.
          </div>
          <div className="actions">
            <button className="save" onClick={save}>
              Save
            </button>
            <button className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
