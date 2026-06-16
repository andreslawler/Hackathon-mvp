import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadFile } from '../lib/files.js';

// `source` is either a string path to a file under /public (fetched and rendered as markdown),
// or an inline object { title, text } for the uploaded customer RFQ (rendered as plain text).
export default function FileViewer({ source, onClose }) {
  const isInline = source && typeof source === 'object';
  const path = isInline ? null : source;
  const heading = isInline ? source.title : source;

  const [text, setText] = useState(isInline ? source.text || '' : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isInline) {
      setText(source.text || '');
      setError('');
      return;
    }
    let cancelled = false;
    setText('');
    setError('');
    loadFile(path)
      .then((t) => !cancelled && setText(t))
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="path">{heading}</span>
          <button onClick={onClose}>close · esc</button>
        </div>
        <div className="modal-body">
          {error && <p style={{ color: '#b85c1f' }}>Failed to load file: {error}</p>}
          {!error && !text && <p style={{ color: '#8a8a8a' }}>Loading…</p>}
          {text &&
            (isInline ? (
              <pre className="inline-doc">{text}</pre>
            ) : (
              <ReactMarkdown>{text}</ReactMarkdown>
            ))}
        </div>
      </div>
    </div>
  );
}
