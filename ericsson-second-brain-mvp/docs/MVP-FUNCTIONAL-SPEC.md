# Ericsson's Second Brain — MVP Functional Specification

**Status:** v2.1 (synced to the implemented MVP)
**Author:** Andres Lawler
**Purpose:** Hackathon MVP for demonstrating the Second Brain concept to a senior judging panel.
**Audience:** Senior strategy and commercial leadership.

---

## 1. Purpose

This MVP demonstrates the **Ericsson Second Brain** concept: capturing how Ericsson's experienced commercial people decide, and how Ericsson's customers behave, as a structured set of skill files and knowledge artefacts that an AI can reason against.

The demo is not a production system. It is a working probe designed to make the concept concrete and to show, in a controlled side-by-side comparison, the difference between a generic LLM with public information and a model loaded with Ericsson-specific reasoning and customer knowledge.

The single thesis the MVP demonstrates is:

> The advantage in AI-first commercial operations does not come from the model, nor from a data lake. It comes from capturing how Ericsson reasons commercially, and how each major customer actually behaves, in a form an AI can use. The companies that do this will arrive at the AI-first future with an edge. The companies that do not will run generic agents that are, in their CEO's words, *almost right* — which for a mission-critical deal is not good enough.

The worked example throughout is the **Integrated Core Solution (ICS)**, a cloud-native dual-mode 4G/5G core for the Mission Critical Networks (MCN) segment, sold to a leading GCC operator. The customer is never named.

---

## 2. Architectural overview

A local React application running on the user's laptop. It loads markdown skill files and knowledgebase documents at runtime from the local filesystem, composes them into system prompts, and calls an LLM endpoint. The same architecture runs against any OpenAI-compatible endpoint.

### High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Local React app (localhost)                 │
│                                                                 │
│   ┌──────────────┐   ┌──────────────────┐   ┌───────────────┐   │
│   │ Use case     │   │ Inputs panel     │   │ Dual output   │   │
│   │ selector     │ → │ (skills, docs)   │ → │ side-by-side  │   │
│   └──────────────┘   └──────────────────┘   └───────────────┘   │
│                              │                       │          │
│                              ▼                       ▼          │
│                       ┌──────────────────────────────────┐      │
│                       │ Prompt builder (per use case)    │      │
│                       └──────────────────────────────────┘      │
│                                       │                         │
└───────────────────────────────────────┼─────────────────────────┘
                                        │  (Vite dev-server proxy: /mimir)
                                        ▼
                            ┌───────────────────────┐
                            │  Mimir LLM endpoint   │
                            │  (GPT-5.4, internal)  │
                            └───────────────────────┘
```

### LLM endpoint

The app calls the internal Ericsson **Mimir** endpoint, a GPT-5.4 proxy, through a Vite dev-server proxy at `/mimir` (configured in `vite.config.js`). The proxy clears browser CORS and lets the dev machine reach the internal endpoint, so the app must run on the Ericsson corporate network. Authentication is a bearer token the user pastes into the app. It is held in `sessionStorage` only, cleared on tab close, and expires after about an hour. The model and endpoint are configurable in `src/lib/api.js`. The architecture is endpoint-agnostic: any OpenAI-style chat endpoint can be swapped in.

### Calls per scenario run

For each scenario the user runs, the app makes **two parallel generation calls**, then one or two **additive** calls layered on top:

| Call | System prompt content | Purpose |
|------|----------------------|---------|
| **Generic** | Generic public Ericsson description + generic public customer description | A fair baseline for what a generic LLM with minimal public RAG would produce |
| **Second Brain** | All applicable role skills + customer skills + the use-case knowledgebase | The Second Brain output, reasoning with full institutional context |
| **Assessment** (additive) | Both outputs + a fixed six-item rubric + the Commercial Director skill | Scores both outputs and writes a Commercial Director review of the generic one (Features 2 and 3 below) |
| **Offer data** (additive, UC1 only) | The Second Brain output | Structures the quotation into data for the send-ready document downloads |

Both generation calls receive the **same scenario** as the user message. Same model, same parameters. The only variable is the system prompt. This is critical for credibility: the comparison is fair on every dimension except the loaded knowledge.

The two additive calls fire only after both generations complete, and only when both produced text. They are strictly additive: if either fails or returns unparseable output, the two generation outputs still render normally and the additive feature shows a quiet unavailable state. The demo cannot be taken down by the additive layer.

### File-based architecture

All skills and knowledgebase documents are **real markdown files** under `/public/skills/`, `/public/knowledgebase/`, and `/public/generic-rag/`, fetched fresh at runtime. So:

- A judge can click any file in the inputs panel and read its raw content.
- A judge can be shown the actual file structure in VS Code during the demo.
- The user can replace any file by overwriting it. The change shows on the next Run, with no rebuild.

There is no hidden state. What is loaded is what is visible.

---

## 3. Use cases

Three use cases, presented with equal emphasis, mapped to the sales journey: **Quotation, Negotiation, Contracting**. All three are built around the Integrated Core Solution for a leading GCC operator.

### Use Case 1 — Budgetary Quotation (Quotation)

**Goal:** Generate an indicative, non-binding budgetary quotation package for the ICS.

**Output (Second Brain version):**
1. **Pricing schedule:** line-item indicative pricing in ranges, with a structured commercial construct (multi-year framework, software attach, capacity tiers, milestone rebate) rather than a flat list-price discount.
2. **Solution description:** high-level technical description tied to the stated requirement and the ICS component set.
3. **Statement of compliance:** point-by-point response to the stated requirements with compliance status.

**Send-ready documents (Second Brain side only).** After the quotation generates, the user can download three customer-ready files: a **Solution Description** as a Word document filled from the real Ericsson ICS template, and a **Pricing schedule** and **Statement of Compliance** as spreadsheets, all generated client-side from a structured-data pass over the Second Brain output. A markdown fallback is offered if generation fails.

**RFQ drop-zone (Path 2).** UC1 also accepts an uploaded customer RFQ. A dropped document replaces the built-in `rfi-sample.md` in the Second Brain context, so a real customer request drives the output. With no upload (Path 1), the built-in RFI sample is used.

**Output (Generic version):** a best-effort quotation from public information only. Expected to be less specific, less commercially sophisticated, and without reuse of prior-deal patterns.

**Inputs into the Second Brain prompt:** SA, AM, CD, and customer (GCC operator) skills, plus the knowledgebase set: the ICS solution brief, the RFI sample (or the uploaded RFQ), the offer template, the Statement of Work template, the quotation output templates, the Premium Proposal prior deals, the Salesforce deal history, the product catalogue, Nokia competitive intelligence, the three active deals, and the won/loss debrief.

**Fixed scenario:** A leading GCC operator, acting as prime for a national mission-critical end customer, has issued an RFI for an Integrated Core Solution, a dedicated private 4G/5G dual-mode core, requesting an indicative budgetary quotation within seven working days. Geo-redundant across two sites, dimensioned for roughly 20,000 users, about 5,000 voice users, and at least 40 Gbps core throughput.

---

### Use Case 2 — Negotiation Advisor (Negotiation)

**Goal:** Advise on a specific negotiation scenario, drawing on multiple role perspectives and the customer's known commercial behaviour.

**Output (Second Brain version):** customer pattern recognition, recommended wanted position, likely counter-moves three rounds out, trade-space, and recommendation on form.

**Output (Generic version):** procedurally sensible but tactically generic. Misses the specific customer pattern, group-framework risk, and Ericsson commercial constructs.

**Inputs into the Second Brain prompt:** CD, AM, SA, and customer (GCC operator) skills, plus the ICS solution brief, customer public financials, installed base and org map, vendor landscape, Nokia and Huawei competitive intelligence, the three active deals, and the won/loss debrief.

**Fixed scenario:** A leading GCC operator has requested a 10% list-price reduction on a roughly USD 6M Integrated Core Solution deal for its Mission Critical Networks segment, citing Nokia competitive pressure, and wants to close before Q4.

---

### Use Case 3 — Contracting

(Named "Contracting" in the UI to fit the sales journey. The underlying task is a Business-Critical Terms and Conditions deviation assessment.)

**Goal:** Assess a returned framework agreement against Ericsson's wanted positions on Business-Critical Terms, and recommend a negotiation strategy.

**Output (Second Brain version):** a deviation table (BCTC, customer position, Ericsson wanted, severity red/amber/green, note), risk analysis for the red and amber deviations, ranked negotiation priorities, and suggested redlines for the top three.

**Output (Generic version):** generic contract-review observations. Identifies clauses but lacks the BCTC-specific wanted positions, the customer pattern, and strategic prioritisation.

**Inputs into the Second Brain prompt:** Contract Manager, Legal Counsel, Commercial Director, customer contract function, and customer (GCC operator) skills, plus the BCTC catalogue with wanted positions, the customer contract history, public financials, vendor landscape, the three active deals, and the won/loss debrief.

**Fixed scenario:** The customer has returned the framework agreement with deviations on Business-Critical Terms. Assess each against Ericsson's wanted position, prioritise, and recommend a strategy with redlines. (The live scenario text is to be finalised from the real customer deviations against the 28-term BCTC catalogue.)

**Inputs into the Generic prompt (all three use cases):** the two generic public overviews only.

---

## 4. User experience

### 4.1 Application shell

A single React app with a top navigation bar. Persistent elements:
- Application title: "Ericsson's Second Brain"
- Tabs: Home, UC1 Quotation, UC2 Negotiation, UC3 Contracting
- A token status indicator (set / not set) with an affordance to set or change the Mimir token

### 4.2 Home screen

Frames the thesis, presents the three use cases as cards, and links into each. Below the thesis sit two presentation sections built for the panel: a **business case** slide (the cost of inaction, the supporting research, the root cause and the Second Brain bridge, and the effort freed per month) and an **architecture diagram** slide (the role skills and the knowledgebase feeding one model to produce the three use case outputs). Each section has a button that toggles it to a standalone full-screen slide, with Escape to exit, so the presenter can drive them as slides.

### 4.3 Use case screen layout

The three use case screens share a layout: a collapsible inputs panel on the left, and a run area on the right holding the scenario box, the RFQ drop-zone (UC1 only), the Run control, and the dual output. The three screens stay mounted, so a generated output, its assessment, and any uploaded RFQ persist when the presenter navigates between tabs and back within a session. The inputs-panel collapse state is shared across all three.

### 4.4 Inputs panel

Lists the actual files loaded for the use case, grouped into skills and knowledgebase, each clickable to open a viewer showing the raw markdown. The generic side is also listed, short: the two public overviews. The panel is collapsible to give the output more room. On UC1, when an RFQ has been uploaded, the panel reflects that the uploaded document is in use.

### 4.5 Scenario box

A fixed, read-only scenario per use case, to avoid live-input variance during the demo.

### 4.6 Dual output panel

Two equal columns. Left: "Generic LLM + public RAG" in the muted accent. Right: "Second Brain" in the primary green. Output currently renders non-streaming: a "Generating" indicator shows while each call runs, then the full answer renders. Streaming is implemented behind a flag and can be enabled once the endpoint's streaming format is confirmed.

### 4.7 The legibility layer (what makes the delta defensible)

Four features, all computed live from the real outputs on each run. No hardcoded verdicts.

- **Citation pills (Second Brain output only).** As it writes, the Second Brain model wraps grounded claims in inline markers naming the source file. The app renders these as subtle pills: green for a claim drawn from a role skill (reasoning), deep blue for a claim drawn from a knowledgebase artifact (data). General prose stays unmarked. A cited filename that is not actually loaded renders muted, so a bluffed citation looks weaker rather than passing silently. The generic output never gets pills.
- **Grounding density.** A per-run count of the validated citation pills in each answer, shown as a slim line on each column, for example "11 claims grounded in named sources," with an optional reasoning-versus-data split. The generic side always reads zero, by construction. The count comes from the same parsed pills, excludes any unvalidated citation so a bluffed one cannot inflate it, and shows an unavailable state rather than a wrong number if parsing ever fails. It is a claim about this answer's traceability, not about corpus size.
- **Rubric scorecard.** A fixed six-item commercial rubric scores both outputs, shown as a compact card above each column. Green pass, muted dash for fail (not red, this is a comparison, not an error state). The generic side typically shows several fails. Per-item justification appears on hover.
- **Commercial Director commentary.** A short review in the CD's voice, rendered as a callout under the generic output, naming the specific institutional miss and the concrete move.

### 4.8 UC1 send-ready documents and RFQ drop-zone

On UC1 the Second Brain side offers downloads of customer-ready documents (Solution Description as Word, Pricing schedule and Statement of Compliance as spreadsheets), and the run area carries a drop-zone that ingests an uploaded customer RFQ to drive the output. Both are additive and never block the comparison.

### 4.9 Visual design

- **Typography:** Fraunces serif for headings and emphasis, IBM Plex Sans for body, JetBrains Mono for labels and metadata.
- **Palette:** cream background (`#f7f5f0`), dark ink, primary green (`#2d8a73`) for Second Brain elements, deep blue (`#1e4a6d`) and amber (`#c98a3c`) as secondary accents, taupe (`#b0a99a`) for generic and muted.
- **Layout:** generous whitespace, fine rules, editorial minimalism. A strategist's working document, not an internal IT tool.

---

## 5. Technical specification

### 5.1 Stack

- **Framework:** React 18 (functional components, hooks).
- **Build tool:** Vite 5, with a dev-server proxy (`/mimir`) to the internal endpoint.
- **HTTP:** native `fetch`.
- **Markdown:** `react-markdown` (v9).
- **RFQ ingestion (UC1):** `mammoth` extracts text from an uploaded `.docx` in the browser.
- **Document generation (UC1):** `docxtemplater` and `pizzip` (Word from the real ICS template), and `xlsx` / SheetJS (spreadsheets). All of these, and mammoth, are loaded dynamically on use, so app startup is unaffected and any failure is caught.
- **No backend.** Calls go from the browser through the local Vite proxy to the internal endpoint. The bearer token lives in `sessionStorage` only.

### 5.2 Streaming

`src/lib/api.js` carries a `USE_STREAMING` flag, currently off, because the endpoint's server-sent-event format is not yet confirmed. With it off, each answer arrives whole. The streaming branch (OpenAI-style SSE) and a streaming-tolerant citation parser are implemented and ready to enable once the format is verified.

### 5.3 LLM endpoint and model

The Mimir GPT-5.4 proxy at `/mimir/v1/chat/completions`. Request body uses an `input` message array and `model: gpt-5.4`. Response parsing is defensive across common shapes. Endpoint, model, and parameters are configurable in `src/lib/api.js`.

### 5.4 Token budget

Per-call `maxTokens` is set per use case (UC1 and UC3 higher for their multi-section output, UC2 lower). Second Brain context runs to roughly 10,000 to 30,000 input tokens depending on the use case and the loaded knowledgebase, well within model limits.

### 5.5 Prompt construction

`src/lib/prompts.js`:
- `buildPrompt(useCase, mode, options)`: assembles the generic or second-brain system prompt. For second-brain it loads the skills and knowledgebase, injects a citations instruction with the exact citable filenames, and (UC1) swaps in an uploaded RFQ via `options.rfqOverride`.
- `buildAssessmentPrompt(useCase, genericText, brainText)`: the rubric scoring and CD commentary call. Returns the fixed six-item `RUBRIC` and the CD skill in the system prompt, and instructs a strict JSON response.
- `buildOfferDataPrompt(brainText)`: structures the UC1 output into pricing rows, compliance rows, and the solution-description fields for the document downloads.
- `citationIndex(useCase)`: the filename-to-type map the renderer validates citations against.

### 5.6 File loading and parsing

`src/lib/files.js` fetches `/public/...` files fresh on each run (no caching). `src/lib/citations.js` holds the streaming-tolerant citation parser, the marker-stripping fallback, the `cite://` URL pass-through for react-markdown, the grounding-count helper behind the density indicator, and the defensive assessment-JSON parser. `src/lib/docx.js` extracts text from an uploaded RFQ, and `src/lib/offerDocs.js` generates the UC1 downloads.

### 5.7 Error handling and demo safety

- A file that fails to load is skipped, the others still load.
- A failed generation call shows its error in that column only.
- The additive assessment and offer-data calls never block or break the outputs. On failure they show a quiet "unavailable" state.
- Citation parsing failure falls back to plain text with markers stripped, never a broken render.
- A missing token shows clear guidance instead of running.

---

## 6. File inventory

### 6.1 Skill files (`/public/skills/`)

| File | Role | Status |
|------|------|--------|
| `cd-commercial-director.md` | Commercial Director | Enriched, sourced, anonymised |
| `am-account-manager.md` | Account Manager (KAM) | Enriched, sourced, anonymised |
| `sa-solution-architect.md` | Solution Architect | Enriched, sourced, anonymised |
| `cm-contract-manager.md` | Contract Manager | Enriched, sourced, anonymised |
| `legal-counsel.md` | Legal Counsel | Enriched, sourced, anonymised |
| `customer-gcc-operator.md` | Customer behavioural skill (GCC operator) | Enriched, sourced, anonymised |
| `customer-contract-expert.md` | Customer contract function | Enriched, sourced, anonymised |

All seven skills are enriched from real practitioner reasoning and anonymised. Each carries a DRAFT provenance header until cleared for external use.

### 6.2 Knowledgebase (`/public/knowledgebase/`)

A single shared pool organised by knowledge domain, not by use case. Each use case selects what it needs through the manifest in `src/lib/prompts.js`, so one file can feed more than one use case without duplication.

```
/public/knowledgebase/
├── customer-intelligence/
│   ├── customer-public-financials.md
│   ├── customer-vendor-landscape.md
│   ├── customer-installed-base.md
│   └── customer-contract-history.md
├── commercial-artifacts/
│   ├── rfi-sample.md
│   ├── offer-template.md
│   ├── sow-template.md
│   ├── quotation-templates.md
│   ├── premium-proposal-prior-deals.md
│   ├── salesforce-deal-history.md
│   └── product-catalog-extract.md
├── contract-artifacts/
│   └── ericsson_bctc_catalogue.md
├── solutions/
│   └── ics_techno-commercial.md
├── competitive-intelligence/
│   ├── competitive_intel_nokia.md
│   ├── competitive_intel_huawei.md
│   ├── competitive_intel_zte.md
│   └── competitive_intel_samsung.md
├── active-deals/
│   ├── ongoing-deal-qatar.md
│   ├── ongoing-deal-bahrain.md
│   └── ongoing-deal-uae.md
└── won-loss-debriefs/
    └── illustrative_won_loss_debrief.md
```

All knowledge content is anonymised: the customer is always "a leading GCC operator," never named. Several files were sourced through the internal Glean assistant (Bedrock) and pasted in, so this repository must stay private. Still pending real source data: `salesforce-deal-history.md` carries ICS-aligned illustrative content pending a real Salesforce extract, and the UC3 redline that finalises the Contracting scenario is still to come.

### 6.3 Generic RAG (`/public/generic-rag/`)

```
/public/generic-rag/
├── ericsson-public-overview.md       (Ericsson public profile)
└── customer-public-overview.md       (leading GCC operator public profile, unnamed)
```

What a generic LLM with public RAG would have. Deliberately surface-level, but solid and fair: the generic side must be a credible baseline, not a strawman.

### 6.4 Offer templates (`/public/offer-templates/`)

The real Ericsson document templates the UC1 send-ready downloads fill (for example the Solution Description Word template). Served as static assets and read by `src/lib/offerDocs.js`.

### 6.5 Source modules (`/src/`)

`App.jsx` (shell, nav), `screens/Home.jsx`, `screens/UseCaseScreen.jsx`, `components/` (`InputsPanel`, `DualOutput`, `FileViewer`, `ApiKeyModal`, `RfqDropZone`, `HomeSlides`), and `lib/` (`api.js`, `prompts.js`, `citations.js`, `files.js`, `scenarios.js`, `docx.js`, `offerDocs.js`), with `styles.css`.

---

## 7. Demo flow

Recommended 15-minute panel demo:

1. **Open:** Home screen, frame the thesis in 60 seconds.
2. **UC2 first:** the negotiation scenario lands hardest and fastest. Show the inputs panel, click a skill file, run the scenario, walk both outputs, then point to the scorecard, the citation pills, and the Commercial Director commentary.
3. **UC1:** the quotation. The productivity case. Show the send-ready document downloads, and optionally drop in a real RFQ.
4. **UC3 Contracting:** the deviation assessment. The legal and contract case, and proof the same architecture scales to a specialist domain.
5. **Close:** return to Home, take the business case and architecture slides full-screen, and frame the asks.

Each use case is 3 to 4 minutes.

The single live dependency is the Mimir token. Grab a fresh one right before the panel, do not close the tab, and re-paste a fresh token if any call returns a 401 or 500.

---

## 8. Scope

### In scope (implemented)

- The two-call generic-versus-Second-Brain comparison, file-based knowledge loading, the inspectable inputs panel, the fixed scenarios, and output that persists across tab navigation.
- The legibility layer: citation pills, the grounding-density indicator, the rubric scorecard, and the Commercial Director commentary.
- UC1 send-ready document generation from the real templates, and the RFQ drop-zone override.
- The Home presentation slides: the business case and the architecture diagram, each usable full-screen.

### Out of scope (next-phase)

- **Live data integrations** beyond the single dropped RFQ. No CPQ, Salesforce, or SharePoint connections. Knowledge is static files.
- **Production deployment.** Local development only. A SIGMA / Azure AI Foundry deployment with Azure AI Search retrieval is a Phase 1 question, deliberately not built, the curated files are higher fidelity for the demo.
- **The capture mechanism.** Skills are hand-authored, not captured at the moment of decision.
- **Skill versioning and governance, authentication, multi-user editing, performance optimisation.**

These omissions are intentional: validate the concept, not productise it.

---

## 9. What this MVP must do well

If anything else gives way, these must work:

1. **The dual output must be visibly different in a way that demonstrates the thesis.** The skills and knowledgebase must carry real reasoning the generic side cannot reach, and the legibility layer must make that delta obvious in seconds.
2. **The inputs must be inspectable.** A judge clicking a file should think *this is real institutional knowledge captured as a file*, not *a string in a script*.
3. **The demo must not break.** Pre-tested scenarios, a fresh token loaded before the panel, no live edits, and the only network dependency is the endpoint call. The additive layer fails quietly and never takes down the outputs.

Everything else is secondary.

---

## 10. Sign-off

This specification is the source of truth for the MVP. Code, content, and design decisions refer back to it.

Resolved since v1.0: all seven skills enriched and sourced, the knowledgebase populated and anonymised, the BCTC catalogue loaded, the endpoint moved to Mimir GPT-5.4, the use cases reframed around the Integrated Core Solution, the legibility layer built (citation pills, grounding density, rubric scorecard, CD commentary), UC1 document generation and the RFQ drop-zone built, output persistence across tabs added, and the Home business case and architecture slides added.

Open items: finalise the UC3 Contracting scenario from the real customer deviations against the 28-term BCTC catalogue, replace the illustrative `salesforce-deal-history.md` with a real Salesforce extract, and decide whether to enable streaming for the demo.
```
