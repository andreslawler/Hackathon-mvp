// Client-side generation of the UC1 offer documents (Second Brain side only).
//
// Solution Description: fills the real Ericsson TSD template with docxtemplater, using guillemet
// delimiters so the template's {GUID} content-control identifiers cannot collide with tags.
// Pricing schedule and Statement of Compliance: built from the model's structured data with SheetJS.
//
// Every heavy library is imported dynamically on use, so app startup is unaffected and any failure
// here is caught by the caller and can never take down the screen.

const TEMPLATE_URL = '/offer-templates/solution-description.docx';
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function loadDocxLibs() {
  const [pz, dt] = await Promise.all([import('pizzip'), import('docxtemplater')]);
  return { PizZip: pz.default || pz, Docxtemplater: dt.default || dt };
}

async function loadXlsx() {
  const m = await import('xlsx');
  return m.utils ? m : m.default || m;
}

export async function downloadSolutionDescription(data) {
  const { PizZip, Docxtemplater } = await loadDocxLibs();
  const res = await fetch(TEMPLATE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Template fetch failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  const zip = new PizZip(buf);
  const doc = new Docxtemplater(zip, {
    delimiters: { start: '«', end: '»' },
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render({
    customer: 'a leading GCC operator',
    projectName: (data && data.projectName) || 'Private MCN Core (ICS)',
    requirementSpec: (data && data.requirementSpec) || '',
  });
  const out = doc.getZip().generate({ type: 'blob', mimeType: DOCX_MIME, compression: 'DEFLATE' });
  downloadBlob(out, 'Solution Description (indicative draft).docx');
}

function sheetBlob(XLSX, aoa, sheetName) {
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const arr = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  return new Blob([arr], { type: XLSX_MIME });
}

export async function downloadPricingSchedule(rows) {
  const XLSX = await loadXlsx();
  const header = ['Group', 'Item', 'Component', 'Quantity or capacity', 'One-time', 'Recurring'];
  const body = (rows || []).map((r) => [
    r.group || '', r.item || '', r.component || '', r.quantityOrCapacity || '', r.oneTime || '', r.recurring || '',
  ]);
  const note = [[], ['Indicative and non-binding. Pricing is in ranges and subject to detailed scope.']];
  const blob = sheetBlob(XLSX, [header, ...body, ...note], 'Pricing schedule');
  downloadBlob(blob, 'Pricing schedule (indicative draft).xlsx');
}

export async function downloadCompliance(rows) {
  const XLSX = await loadXlsx();
  const header = ['Requirement', 'Compliance', 'Solution element', 'Note'];
  const body = (rows || []).map((r) => [
    r.requirement || '', r.status || '', r.solutionElement || '', r.note || '',
  ]);
  const blob = sheetBlob(XLSX, [header, ...body], 'Statement of Compliance');
  downloadBlob(blob, 'Statement of Compliance (indicative draft).xlsx');
}

export function downloadMarkdownFallback(text) {
  downloadBlob(new Blob([text || ''], { type: 'text/markdown' }), 'Second Brain output.md');
}
