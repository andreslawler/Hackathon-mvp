# Ericsson's Second Brain — MVP Functional Specification

**Status:** Draft v1.0
**Author:** Andres Lawler
**Purpose:** Hackathon MVP for demonstrating the Second Brain concept to a senior judging panel.
**Audience:** Senior strategy and commercial leadership.

---

## 1. Purpose

This MVP demonstrates the **Ericsson Second Brain** concept: capturing how Ericsson's experienced commercial people decide, and how Ericsson's customers behave, as a structured set of skill files and knowledge artefacts that an AI can reason against.

The demo is not a production system. It is a working probe designed to make the concept concrete and to show, in a controlled side-by-side comparison, the difference between a generic LLM with public information and a model loaded with Ericsson-specific reasoning and customer knowledge.

The single thesis the MVP demonstrates is:

> The advantage in AI-first commercial operations does not come from the model, nor from a data lake. It comes from capturing how Ericsson reasons commercially, and how each major customer actually behaves, in a form an AI can use. The companies that do this will arrive at the AI-first future with an edge. The companies that do not will run generic agents that are, in their CEO's words, *almost right* — which for a mission-critical deal is not good enough.

---

## 2. Architectural overview

A local React application running on the user's laptop, calling the Anthropic API directly. The application loads markdown skill files and knowledgebase documents at runtime from the local filesystem and composes them into Claude system prompts.

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
                                        │
                                        ▼
                            ┌───────────────────────┐
                            │  Anthropic API        │
                            │  (claude-sonnet-4-5)  │
                            └───────────────────────┘
```

### Two parallel calls per scenario

For each scenario the user runs, the app makes **two parallel streaming calls to the Anthropic API**:

| Call | System prompt content | Purpose |
|------|----------------------|---------|
| **Generic** | Generic public Ericsson description + generic public customer description | A fair baseline for what a generic LLM with minimal company-wide RAG would produce |
| **Second Brain** | All applicable role skills + customer skill + all use-case-specific knowledgebase documents | The Second Brain output, reasoning with full Ericsson institutional context |

Both calls receive the **same scenario** as the user message. Same model, same temperature, same max tokens. The only variable is the system prompt.

This is critical for credibility: the comparison is genuinely fair on every dimension except the loaded knowledge.

### File-based architecture

All skills and knowledgebase documents are **real markdown files** in `/public/skills/`, `/public/knowledgebase/`, and `/public/generic-rag/`. The app fetches them at runtime, so:

- A judge can click any file in the inputs panel and view its raw content
- A judge can be shown the actual file structure in VS Code or Finder during the demo
- The user (Andres) can replace any placeholder file with real Ericsson content by simply overwriting it — no rebuild, no code change

There is no hidden state. What's loaded is what's visible.

---

## 3. Use cases

The MVP includes three use cases, presented with equal emphasis. Each demonstrates the Second Brain concept in a different commercial workflow.

### Use Case 1 — Budgetary Quotation Generation

**Goal:** Generate an indicative, non-binding budgetary quotation package for a customer requirement.

**Output (Second Brain version):**
1. **Pricing schedule** — line-item indicative pricing, structured commercial construct (rebates, multi-year terms, indexation, software attach) rather than flat list-price.
2. **Solution description** — high-level technical description tied to the customer's stated needs and known installed base.
3. **Statement of Compliance** — point-by-point response to the customer's stated requirements, with confidence indicators.

**Output (Generic version):** A best-effort quotation produced from the generic LLM with only public Ericsson and customer descriptions in context. Expected to be substantially less specific, less commercially sophisticated, and missing reuse of patterns from prior deals.

**Inputs into the Second Brain prompt:**

| Source | File path |
|--------|-----------|
| Solution Architect skill | `/public/skills/sa-solution-architect.md` |
| Account Manager skill | `/public/skills/am-account-manager.md` |
| Commercial Director skill | `/public/skills/cd-commercial-director.md` |
| Customer skill (GCC operator) | `/public/skills/customer-gcc-operator.md` |
| Customer RFI extract | `/public/knowledgebase/uc1-budgetary-quote/rfi-sample.md` |
| Offer template (Bid Office) | `/public/knowledgebase/uc1-budgetary-quote/offer-template.md` |
| Premium Proposal — prior deals | `/public/knowledgebase/uc1-budgetary-quote/premium-proposal-prior-deals.md` |
| Salesforce deal history | `/public/knowledgebase/uc1-budgetary-quote/salesforce-deal-history.md` |
| Product catalog extract | `/public/knowledgebase/uc1-budgetary-quote/product-catalog-extract.md` |
| Won/Loss + KAM debrief library | `/public/knowledgebase/won-loss-debriefs/` (all files) |

**Inputs into the Generic prompt:**

| Source | File path |
|--------|-----------|
| Public Ericsson description | `/public/generic-rag/ericsson-public-overview.md` |
| Public customer description | `/public/generic-rag/customer-public-overview.md` |

**Fixed scenario:** A leading GCC mobile operator has issued an RFI for a multi-site MCN expansion across UAE deployment, requesting an indicative budgetary quote within seven working days.

---

### Use Case 2 — Negotiation Advisor

**Goal:** Advise on how to handle a specific negotiation scenario, drawing on multiple role perspectives and the customer's known commercial behaviour.

**Output (Second Brain version):**
1. **Customer pattern recognition** — what the customer is doing here, based on observed prior behaviour.
2. **Recommended wanted position** — Ericsson's opening response, framed commercially not just on price.
3. **Likely counter-moves** — what the customer is likely to do at each round, with two or three contingency responses.
4. **Trade-space** — what Ericsson is genuinely willing to move on and what is off the table.
5. **Recommendation on form** — who should respond, in what channel, with what timing.

**Output (Generic version):** Standard negotiation advice from the generic LLM. Expected to be procedurally sensible but tactically generic — missing the specific customer pattern, group-framework risk, and Ericsson-specific commercial constructs.

**Inputs into the Second Brain prompt:**

| Source | File path |
|--------|-----------|
| Commercial Director skill | `/public/skills/cd-commercial-director.md` |
| Account Manager skill | `/public/skills/am-account-manager.md` |
| Solution Architect skill | `/public/skills/sa-solution-architect.md` |
| Customer skill (GCC operator) | `/public/skills/customer-gcc-operator.md` |
| Customer public financials | `/public/knowledgebase/uc2-negotiation/customer-public-financials.md` |
| Customer installed base & internal context | `/public/knowledgebase/uc2-negotiation/customer-installed-base.md` |
| Customer vendor landscape & switching costs | `/public/knowledgebase/uc2-negotiation/customer-vendor-landscape.md` |
| Won/Loss + KAM debrief library | `/public/knowledgebase/won-loss-debriefs/` (all files) |

**Inputs into the Generic prompt:** Same two generic overviews as UC1.

**Fixed scenario:** *"A leading GCC operator has requested a 10% list-price reduction on a $50M MCN expansion deal, citing Nokia competitive pressure. They want to close before Q4. How should we respond?"*

---

### Use Case 3 — BCTC Contract Negotiation Advisor

**Goal:** Assess deviations of a specific customer contract from Ericsson's wanted position on Business-Critical Terms & Conditions (BCTCs), and recommend a negotiation strategy.

**Output (Second Brain version):**
1. **Deviation table** — for each BCTC in the contract, compare to wanted position. Flag deviations with severity: red, amber, green.
2. **Risk analysis** — for red and amber deviations, explain the commercial and legal exposure created.
3. **Negotiation priorities** — which deviations to push back on hardest, which to trade, which to accept. Tied to the customer's known posture.
4. **Suggested redlines** — for the top three priorities, draft replacement language aligned to Ericsson wanted position.

**Output (Generic version):** Generic contract-review observations. Expected to identify clauses but lack BCTC-specific Ericsson context, customer-specific patterns, or strategic prioritisation.

**Inputs into the Second Brain prompt:**

| Source | File path |
|--------|-----------|
| Contract Manager skill | `/public/skills/cm-contract-manager.md` |
| Legal Counsel skill | `/public/skills/legal-counsel.md` |
| Commercial Director skill | `/public/skills/cd-commercial-director.md` |
| Customer contract expert skill | `/public/skills/customer-contract-expert.md` |
| Customer skill (GCC operator) | `/public/skills/customer-gcc-operator.md` |
| BCTC catalogue with wanted positions | `/public/knowledgebase/uc3-bctc/bctc-catalogue.md` |
| Customer's prior contract history with Ericsson | `/public/knowledgebase/uc3-bctc/customer-contract-history.md` |
| Customer public financials | `/public/knowledgebase/uc3-bctc/customer-public-financials.md` |
| Customer vendor landscape | `/public/knowledgebase/uc3-bctc/customer-vendor-landscape.md` |
| Won/Loss + KAM debrief library | `/public/knowledgebase/won-loss-debriefs/` (all files) |

**Inputs into the Generic prompt:** Same two generic overviews as UC1 and UC2.

**Fixed scenario:** The customer has returned the framework agreement with deviations on liability cap, IP indemnity, termination for convenience, and 3PP cost pass-through. Assess against Ericsson's wanted position and recommend a negotiation strategy.

---

## 4. User experience

### 4.1 Application shell

A single React app with a top-level navigation bar showing the three use cases plus a Home screen. The user clicks between them.

Top-of-screen elements (persistent across screens):
- Application title: "Ericsson's Second Brain — MVP"
- Use case tabs: Home · UC1 Quotation · UC2 Negotiation · UC3 BCTC
- API key status indicator (configured / not configured) with a settings affordance to set/clear it

### 4.2 Home screen

Brief framing of the Second Brain thesis, the three use cases as cards, and an entry point into each. Acts as orientation for the panel.

### 4.3 Use case screen layout

All three use case screens share the same three-region layout:

```
┌─────────────────────────────────────────────────────────────────┐
│  USE CASE 2 — NEGOTIATION ADVISOR                               │
├──────────────────┬──────────────────────────────────────────────┤
│  INPUTS          │  SCENARIO                                    │
│                  │  ┌─────────────────────────────────────────┐ │
│  SKILLS LOADED   │  │ A leading GCC operator has requested... │ │
│  • cd skill      │  │                                         │ │
│  • am skill      │  └─────────────────────────────────────────┘ │
│  • sa skill      │  [ Run scenario ]                            │
│  • customer      ├──────────────────────────────────────────────┤
│                  │  OUTPUTS                                     │
│  KNOWLEDGEBASE   │  ┌─────────────────┬──────────────────────┐  │
│  • financials    │  │ Generic LLM     │ Second Brain         │  │
│  • installed     │  │ + public RAG    │ + skills + KB        │  │
│  • vendor lscape │  │                 │                      │  │
│  • debriefs (3)  │  │ (streaming...)  │ (streaming...)       │  │
│                  │  │                 │                      │  │
│  Click any file  │  │                 │                      │  │
│  to view         │  │                 │                      │  │
│                  │  └─────────────────┴──────────────────────┘  │
└──────────────────┴──────────────────────────────────────────────┘
```

### 4.4 Inputs panel

Lists the actual files being loaded for this use case, grouped:
- **Skills loaded** (e.g. CD, AM, SA, customer skill)
- **Knowledgebase** (the use-case-specific documents and the won/loss debriefs)

Each file in the list is **clickable**. Clicking opens a modal or side-drawer that displays the file's raw markdown content. This is essential: it lets the judge verify the files are real, see what content drives the AI's reasoning, and grasp the architecture in seconds.

The inputs panel for the Generic side is also shown, much shorter:
- Generic public Ericsson description
- Generic public customer description

### 4.5 Scenario box

For each use case, a fixed scenario is preloaded (per the spec above). The text is displayed in a styled box but is **read-only** in the MVP — no editing. This avoids any live-input variance that could derail the demo.

### 4.6 Dual output panel

Two columns of equal width, side by side. Header above each column makes clear which is which:

- **Left column:** "Generic LLM + public RAG" (in a muted accent colour)
- **Right column:** "Second Brain — skills + knowledgebase" (in the project's primary green accent)

Both columns stream from the Anthropic API in parallel. While streaming, a blinking cursor indicates progress.

A loading indicator above each column shows which skills/files are loading and being composed into context for that side.

### 4.7 Visual design

Style language continues from the existing concept artifacts (Word doc, deck, prior HTML probe):

- **Typography:** Fraunces serif for headings and emphasis; IBM Plex Sans for body text; JetBrains Mono for labels and metadata.
- **Palette:** Cream background (`#f7f5f0`), dark ink text, primary green accent (`#2d8a73`) for Second Brain elements, deep blue (`#1e4a6d`) and amber (`#c98a3c`) as secondary accents, taupe (`#b0a99a`) for generic/muted.
- **Layout:** Generous whitespace, fine rules, editorial minimalism. Not corporate, not playful — strategist's working document.

The visual language signals seriousness without looking like an internal IT tool.

---

## 5. Technical specification

### 5.1 Stack

- **Framework:** React 18 (functional components, hooks)
- **Build tool:** Vite
- **HTTP:** Native `fetch` for Anthropic API streaming via `text/event-stream`
- **Markdown rendering:** `react-markdown` (already widely used, lightweight)
- **No backend.** All API calls are direct from the browser to Anthropic, using the `anthropic-dangerous-direct-browser-access: true` header. The user's API key is held in `sessionStorage` only — cleared on tab close, never persisted.

### 5.2 Streaming

Both `Generic` and `Second Brain` calls use `stream: true` and parse server-sent events. Streaming text appends to the output panels in real time, giving the judge the live-AI feel that matters in this context.

### 5.3 API model

Default: `claude-sonnet-4-5`. Configurable in `src/lib/api.js`.

### 5.4 Token budget

- `max_tokens: 1500` per call. UC1 outputs (multi-section package) may need 2000–2500; configurable per use case.
- Total context per Second Brain call: estimated 6,000–10,000 input tokens depending on use case. Well within model limits.

### 5.5 Prompt construction

`src/lib/prompts.js` exports a `buildPrompt(useCase, mode)` function. For each use case and mode (`generic` | `second-brain`):

1. Define the **role / system frame** for that use case (the model's character and output shape).
2. Fetch all required files for that mode.
3. Concatenate them into a structured system prompt, with section headers (`## ROLE SKILLS`, `## CUSTOMER CONTEXT`, `## KNOWLEDGEBASE`, etc.).
4. Add the **output structure instruction** — explicit instruction on the shape and sections the response must have.
5. Return the assembled system prompt as a string.

The user message is the fixed scenario for that use case.

### 5.6 File loading

`src/lib/files.js` exports `loadFile(path)` and `loadFiles(paths[])` helpers. These `fetch()` from `/public/...` paths. All file contents are loaded fresh on each scenario run — no caching — so the user can edit any file mid-session and re-run to see the effect without restarting the app.

### 5.7 Error handling

- If a file fails to load, show the path and error inline in the inputs panel.
- If the API call fails, show the error in the affected output column without breaking the other column.
- If the API key is missing or invalid, disable Run and show clear guidance.

---

## 6. File inventory

### 6.1 Skill files (`/public/skills/`)

| File | Role | Owner |
|------|------|-------|
| `cd-commercial-director.md` | Commercial Director | Placeholder; rewrite by Andres |
| `am-account-manager.md` | Account Manager (KAM) | Placeholder; rewrite by Andres |
| `sa-solution-architect.md` | Solution Architect | Placeholder; rewrite by Andres |
| `cm-contract-manager.md` | Contract Manager | Placeholder; rewrite by Andres |
| `legal-counsel.md` | Legal Counsel | Placeholder; rewrite by Andres |
| `customer-gcc-operator.md` | Customer behavioural skill (GCC operator) | Placeholder; rewrite by Andres |
| `customer-contract-expert.md` | Customer contract expert | Placeholder; rewrite by Andres |

Every skill file follows the same internal structure (see template at the top of each placeholder file). All placeholder files carry a clear `DRAFT — illustrative; to be replaced by Andres` header.

### 6.2 Knowledgebase (`/public/knowledgebase/`)

Per use case, plus shared:

```
/public/knowledgebase/
├── uc1-budgetary-quote/
│   ├── rfi-sample.md
│   ├── offer-template.md
│   ├── premium-proposal-prior-deals.md
│   ├── salesforce-deal-history.md
│   └── product-catalog-extract.md
├── uc2-negotiation/
│   ├── customer-public-financials.md
│   ├── customer-installed-base.md
│   └── customer-vendor-landscape.md
├── uc3-bctc/
│   ├── bctc-catalogue.md
│   ├── customer-contract-history.md
│   ├── customer-public-financials.md
│   └── customer-vendor-landscape.md
└── won-loss-debriefs/
    ├── 2024-q3-won-mcn-uae.md
    ├── 2024-q4-lost-private-network-saudi.md
    └── 2025-q1-won-software-attach-bahrain.md
```

Andres will replace or augment these as real Ericsson content becomes available.

### 6.3 Generic RAG (`/public/generic-rag/`)

```
/public/generic-rag/
├── ericsson-public-overview.md       (Ericsson public profile, ~1 page)
└── customer-public-overview.md       (GCC operator public profile, ~1 page)
```

These represent what a generic LLM with company-wide RAG would have access to. Deliberately surface-level. Comparable in volume to a Wikipedia article each.

---

## 7. Demo flow

Recommended 15-minute panel demo:

1. **Open** — show Home screen, frame the thesis in 60 seconds.
2. **UC2 first** — the negotiation scenario lands hardest and is fastest to grasp. Show the inputs panel, click a skill file to display its content, run the scenario, walk both outputs.
3. **UC1** — quotation generation. Demonstrates the productivity case.
4. **UC3** — BCTC negotiation. Demonstrates the legal/contract case and that the same architecture scales to specialist domains.
5. **Close** — return to Home and frame the asks: validate the concept, support Phase 1.

Each use case demo is 3–4 minutes.

---

## 8. Out of scope for the MVP

The following are deliberately not included. Each is a reasonable next-phase question, not a hackathon-MVP requirement.

- **Live data integrations.** No CPQ, Salesforce, or SharePoint connections. All inputs are static files.
- **Skill versioning and governance.** No skill review workflow, no audit log, no permissions model.
- **The capture mechanism.** No tooling for capturing decisions-with-reasons at the moment of decision. The skills are hand-authored.
- **Customer-specific authentication.** No SSO, no role-based access control.
- **Multi-user editing.** Single-user local app only.
- **Performance optimisation.** No caching, no model-call optimisation.
- **Production deployment.** Local development only.

These omissions are intentional and aligned with the demo's goal: validate the concept, not productise it.

---

## 9. What this MVP must do well

If anything else gives way, these three things must work:

1. **The dual output must be visibly different in a way that demonstrates the thesis.** If the Second Brain output is only marginally better than the generic output, the demo fails regardless of how polished the rest is. The skill files and knowledgebase content must carry real Ericsson reasoning the generic side cannot reach.
2. **The inputs must be inspectable.** A judge clicking a skill file and reading it should think *this is real institutional knowledge captured as a file*, not *this is a string in a script*.
3. **The demo must not break.** Pre-tested scenarios. Pre-loaded API key. No live edits during the demo. No internet dependency beyond the API call.

Everything else — perfect visual polish, edge-case error handling, the elegance of the codebase — is secondary.

---

## 10. Sign-off

This specification is the source of truth for the MVP. Code, content, and design decisions should refer back to this document.

Open questions to be resolved during build:
- Final wording and depth of each skill file (Andres rewrite)
- BCTC catalogue content (Andres to provide real BCTC documentation)
- Won/Loss debrief content (Andres to provide one or two real anonymised debriefs if possible)
