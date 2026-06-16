import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadFile } from '../lib/files.js';

export default function FileViewer({ path, onClose }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setText('');
    setError('');
    loadFile(path)
      .then((t) => !cancelled && setText(t))
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [path]);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="path">{path}</span>
          <button onClick={onClose}>close · esc</button>
        </div>
        <div className="modal-body">
          {error && <p style={{ color: '#b85c1f' }}>Failed to load file: {error}</p>}
          {!error && !text && <p style={{ color: '#8a8a8a' }}>Loading…</p>}
          {text && <ReactMarkdown>{text}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
}
