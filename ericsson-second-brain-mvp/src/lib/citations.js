// Citation-marker handling for the Second Brain output.
//
// The Second Brain model wraps grounded claims inline as:
//     [[cite:TYPE:filename]]claim text[[/cite]]
// We convert each completed marker into a markdown link whose href carries the filename
// (cite://filename). react-markdown then renders it inline, so markdown inside the claim
// still renders, and a custom link component turns it into a pill.
//
// The parser is streaming-tolerant: a half-open or partial marker is never allowed to leak
// raw [[ ]] syntax to the screen, and its inner text is rendered as plain until the closing
// marker arrives.

// Convert the (possibly partial) streamed text into a markdown string that is safe to render.
export function preprocessCitations(text) {
  if (!text) return '';
  let s = String(text);

  // 1. Completed pairs become a markdown link. The href carries only the filename. The link
  //    component derives the pill type from the loaded manifest, which is the source of truth.
  s = s.replace(
    /\[\[cite:(?:reasoning|data):([^\]\n]+?)\]\]([\s\S]*?)\[\[\/cite\]\]/g,
    (_m, file, inner) => {
      const safeInner = inner.replace(/\r?\n/g, ' ').replace(/[[\]]/g, ' ').trim();
      const f = encodeURIComponent(String(file).trim());
      return `[${safeInner || ' '}](cite://${f})`;
    }
  );

  // 2. A completed OPEN marker whose close has not arrived yet: drop the marker, keep the
  //    inner text as plain. No pill until the pair completes.
  s = s.replace(/\[\[cite:(?:reasoning|data):[^\]\n]+?\]\]/g, '');

  // 3. An orphan close marker.
  s = s.replace(/\[\[\/cite\]\]/g, '');

  // 4. A partial marker still arriving at the very end (open or close, not yet terminated).
  s = s.replace(/\[\[\/?c(?:i(?:t(?:e(?::[^\]\n]*)?)?)?)?$/i, '');
  s = s.replace(/\[\[[^\]\n]*$/, '');

  return s;
}

// Remove all citation markers, leaving the plain claim text. Used as the no-pill fallback if
// preprocessing ever fails, and to clean the Second Brain output before the assessment call.
export function stripCiteMarkers(text) {
  if (!text) return '';
  return String(text)
    .replace(/\[\[cite:(?:reasoning|data):[^\]\n]+?\]\]/g, '')
    .replace(/\[\[\/cite\]\]/g, '')
    .replace(/\[\[\/?c(?:i(?:t(?:e(?::[^\]\n]*)?)?)?)?$/i, '')
    .replace(/\[\[[^\]\n]*$/, '');
}

// react-markdown v9 urlTransform. Pass our cite:// scheme through untouched (the default
// transform would strip it), keep the normal safe set, and block everything else.
export function citeUrlTransform(url) {
  const u = String(url || '');
  if (u.startsWith('cite://')) return u;
  if (/^(https?:|mailto:|tel:|#|\/|\.)/i.test(u)) return u;
  return '';
}

// Defensive JSON parse for the assessment call. Strips accidental code fences and slices to
// the outermost braces. Returns the parsed object or null. Never throws.
export function parseAssessmentJson(raw) {
  if (!raw) return null;
  try {
    let s = String(raw).trim();
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
    const start = s.indexOf('{');
    const end = s.lastIndexOf('}');
    if (start === -1 || end === -1 || end < start) return null;
    const obj = JSON.parse(s.slice(start, end + 1));
    return obj && typeof obj === 'object' ? obj : null;
  } catch {
    return null;
  }
}
