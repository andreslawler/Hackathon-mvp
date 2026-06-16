// File loader. All knowledge files live under /public/ and are fetched at runtime.
// No caching: edits to the .md files are picked up on the next scenario run.

export async function loadFile(path) {
  const url = path.startsWith('/') ? path : `/${path}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return await res.text();
}

export async function loadFiles(paths) {
  const results = await Promise.all(
    paths.map(async (p) => {
      try {
        const text = await loadFile(p);
        return { path: p, text, ok: true };
      } catch (e) {
        return { path: p, text: '', ok: false, error: e.message };
      }
    }),
  );
  return results;
}
