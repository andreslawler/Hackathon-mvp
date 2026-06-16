# Ericsson's Second Brain — MVP

A working demonstration of the Second Brain concept: capturing Ericsson's commercial reasoning and customer behavioural patterns as agent-readable skill files, and proving — through three live, side-by-side comparisons — that company-specific context produces materially better commercial output than a generic LLM with public information alone.

This is a hackathon MVP, not a production system.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open http://localhost:5173 in your browser.

On first load, paste your Anthropic API key into the settings field at the top. The key is stored only in `sessionStorage` and cleared when you close the tab.

---

## What this demonstrates

Three use cases, each running two parallel calls to the same model (`claude-sonnet-4-5`) on the same scenario:

1. **Budgetary Quotation Generation** — pricing schedule, solution description, statement of compliance.
2. **Negotiation Advisor** — recommended wanted position, likely counter-moves, trade-space, recommendation on form.
3. **BCTC Contract Negotiation** — deviation table, risk analysis, negotiation priorities, suggested redlines.

The only variable between the two calls is the system prompt:

- **Generic side:** public Ericsson description + public customer description
- **Second Brain side:** role skills + customer skill + use-case-specific knowledgebase + Won/Loss debriefs

Same model. Same scenario. Same temperature. Same max tokens. The difference you see is the value of the captured knowledge.

---

## Project layout

```
ericsson-second-brain-mvp/
├── docs/
│   └── MVP-FUNCTIONAL-SPEC.md    ← source of truth: read this first
├── public/
│   ├── skills/                   ← role skills and customer skill (.md)
│   ├── knowledgebase/           ← shared pool by domain, not by use case
│   │   ├── customer-intelligence/
│   │   ├── commercial-artifacts/
│   │   ├── contract-artifacts/
│   │   └── won-loss-debriefs/
│   └── generic-rag/              ← what the generic-LLM side gets
├── src/
│   ├── App.jsx                   ← shell, navigation
│   ├── screens/                  ← Home + 3 use case screens
│   ├── components/               ← reusable UI parts
│   ├── lib/
│   │   ├── api.js                ← Anthropic API streaming
│   │   ├── files.js              ← file fetching helpers
│   │   └── prompts.js            ← prompt builders per use case
│   └── styles.css                ← global styles
├── index.html
├── package.json
└── vite.config.js
```

---

## Editing skill files

All skill files and knowledgebase documents are **real `.md` files** in `public/skills/` and `public/knowledgebase/`. To improve any of them, just edit the file in your text editor or IDE.

The app fetches them fresh on every scenario run. No restart needed. Edit, save, click Run, see the difference.

### Placeholder files

Every placeholder file carries a clear header:

```
> **DRAFT — illustrative content. To be replaced by Andres with company-specific material.**
```

When you replace the content with real Ericsson material, remove that header. The rest of the structure (sections, headings) is a suggested template — feel free to adjust.

---

## Demo notes

For demo day:

1. Have your Anthropic API key ready and paste it once before the panel arrives.
2. Open VS Code (or any file browser) in a second window showing the `public/skills/` and `public/knowledgebase/` directories. This visualises the architecture for free.
3. The fixed scenarios are deliberately not editable in the UI to avoid live-input variance. If you want to change them, edit `src/lib/scenarios.js`.
4. Run UC2 first if time-constrained — it's the fastest-landing demonstration.

---

## Iterating with Claude Code

This project is structured to be iterated on with Claude Code. The functional spec at `docs/MVP-FUNCTIONAL-SPEC.md` is the canonical reference. Point Claude Code at the project root and ask it to "read the functional spec and propose changes," or "improve the wording of UC2's recommended position structure," and it will work against the same source of truth this MVP was built against.

---

## License & sensitivity

This MVP contains placeholder content only. No actual Ericsson confidential material should be committed to any public repository. The placeholder skill files are illustrative reconstructions; real Ericsson commercial reasoning lives elsewhere and replaces these locally.
