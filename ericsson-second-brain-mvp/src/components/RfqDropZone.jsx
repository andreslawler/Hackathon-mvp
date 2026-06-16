import { useRef, useState } from 'react';
import { extractDocxText } from '../lib/docx.js';

const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

// UC1 Path 2: optional drag-and-drop of a customer RFQ (.docx). On success the extracted text
// replaces the built-in rfi-sample.md in the Second Brain prompt for the next run. Never blocks
// the screen: a bad type, an empty file, or an extraction failure all fall back to Path 1.
export default function RfqDropZone({ rfq, onIngest, onClear }) {
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    setMsg('');
    if (!file) return;
    const name = file.name || '';
    const isDocx = name.toLowerCase().endsWith('.docx') || file.type === DOCX_MIME;
    if (!isDocx) {
      setMsg('Drop a .docx RFQ. Other formats are not supported in this demo.');
      return;
    }
    setBusy(true);
    try {
      const text = await extractDocxText(file);
      if (!text || !text.trim()) {
        setMsg('No readable text found in that .docx. UC1 will use the built-in sample RFI.');
        return;
      }
      onIngest({ filename: name, text: text.trim() });
    } catch (e) {
      setMsg('Could not read that .docx. UC1 will use the built-in sample RFI.');
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    handleFile(file);
  };

  const openPicker = () => inputRef.current && inputRef.current.click();

  return (
    <div className="rfq-zone">
      <div
        className={`rfq-drop${dragOver ? ' over' : ''}${busy ? ' busy' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPicker();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Optional: upload a customer RFQ as a .docx file"
      >
        <span className="rfq-drop-icon" aria-hidden="true" />
        <span className="rfq-drop-label">
          {busy
            ? 'Reading document…'
            : 'Optional: drop a customer RFQ (.docx) to run against a real document. Otherwise UC1 uses the built-in sample RFI.'}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".docx"
          hidden
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            e.target.value = '';
            handleFile(file);
          }}
        />
      </div>

      <div className="rfq-status">
        <span className="rfq-status-label">Active RFI input</span>
        {rfq ? (
          <span className="rfq-active uploaded">
            <span className="rfq-active-name">Customer RFQ (uploaded): {rfq.filename}</span>
            <button className="rfq-clear" onClick={onClear} type="button">
              clear · use built-in RFI
            </button>
          </span>
        ) : (
          <span className="rfq-active builtin">Built-in sample RFI (rfi-sample.md)</span>
        )}
      </div>

      {msg && <div className="rfq-msg">{msg}</div>}
    </div>
  );
}
