// Browser-side .docx text extraction via mammoth.
//
// mammoth is imported dynamically (its pre-browserified bundle) so a bundling or load failure
// can never take down the UC1 screen at startup. The caller wraps this in try/catch and falls
// back to the built-in sample RFI on any failure, so the screen never breaks.

export async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const mod = await import('mammoth/mammoth.browser.js');
  const mammoth = mod && mod.default ? mod.default : mod;
  if (!mammoth || typeof mammoth.extractRawText !== 'function') {
    throw new Error('mammoth extractor unavailable');
  }
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result && typeof result.value === 'string' ? result.value : '';
}
