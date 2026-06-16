import { loadFiles } from './files.js';

// ─────────────────────────────────────────────────────────────────────────────
// File manifests per use case and mode.
// These manifests are *the* definition of what the AI sees in each call.
// Surfaced in the UI so a judge can verify what's loaded.
// ─────────────────────────────────────────────────────────────────────────────

const GENERIC_FILES = [
  '/generic-rag/ericsson-public-overview.md',
  '/generic-rag/customer-public-overview.md',
];

const WON_LOSS_DEBRIEFS = [
  '/knowledgebase/won-loss-debriefs/illustrative_won_loss_debrief.md',
];

export const MANIFEST = {
  uc1: {
    title: 'Budgetary Quotation',
    secondBrain: {
      skills: [
        { path: '/skills/sa-solution-architect.md', label: 'Solution Architect' },
        { path: '/skills/am-account-manager.md', label: 'Account Manager (KAM)' },
        { path: '/skills/cd-commercial-director.md', label: 'Commercial Director' },
        { path: '/skills/customer-gcc-operator.md', label: 'Customer skill (GCC)' },
      ],
      knowledgebase: [
        { path: '/knowledgebase/solutions/ics_techno-commercial.md', label: 'Solution brief: Integrated Core Solution' },
        { path: '/knowledgebase/commercial-artifacts/rfi-sample.md', label: 'Customer RFI extract' },
        { path: '/knowledgebase/commercial-artifacts/offer-template.md', label: 'Bid Office offer template' },
        { path: '/knowledgebase/commercial-artifacts/sow-template.md', label: 'Statement of Work template' },
        { path: '/knowledgebase/commercial-artifacts/quotation-templates.md', label: 'Quotation output templates' },
        { path: '/knowledgebase/commercial-artifacts/premium-proposal-prior-deals.md', label: 'Premium Proposal prior deals' },
        { path: '/knowledgebase/commercial-artifacts/salesforce-deal-history.md', label: 'Salesforce deal history' },
        { path: '/knowledgebase/commercial-artifacts/product-catalog-extract.md', label: 'Product catalogue extract' },
        { path: '/knowledgebase/competitive-intelligence/competitive_intel_nokia.md', label: 'Competitive intelligence: Nokia' },
        { path: '/knowledgebase/active-deals/ongoing-deal-qatar.md', label: 'Active deal: Qatar' },
        { path: '/knowledgebase/active-deals/ongoing-deal-bahrain.md', label: 'Active deal: Bahrain' },
        { path: '/knowledgebase/active-deals/ongoing-deal-uae.md', label: 'Active deal: UAE' },
        ...WON_LOSS_DEBRIEFS.map((p) => ({ path: p, label: filename(p) })),
      ],
    },
  },
  uc2: {
    title: 'Negotiation Advisor',
    secondBrain: {
      skills: [
        { path: '/skills/cd-commercial-director.md', label: 'Commercial Director' },
        { path: '/skills/am-account-manager.md', label: 'Account Manager (KAM)' },
        { path: '/skills/sa-solution-architect.md', label: 'Solution Architect' },
        { path: '/skills/customer-gcc-operator.md', label: 'Customer skill (GCC)' },
      ],
      knowledgebase: [
        { path: '/knowledgebase/solutions/ics_techno-commercial.md', label: 'Solution brief: Integrated Core Solution' },
        { path: '/knowledgebase/customer-intelligence/customer-public-financials.md', label: 'Customer public financials' },
        { path: '/knowledgebase/customer-intelligence/customer-installed-base.md', label: 'Installed base & org map' },
        { path: '/knowledgebase/customer-intelligence/customer-vendor-landscape.md', label: 'Vendor landscape' },
        { path: '/knowledgebase/competitive-intelligence/competitive_intel_nokia.md', label: 'Competitive intelligence: Nokia' },
        { path: '/knowledgebase/competitive-intelligence/competitive_intel_huawei.md', label: 'Competitive intelligence: Huawei' },
        { path: '/knowledgebase/active-deals/ongoing-deal-qatar.md', label: 'Active deal: Qatar' },
        { path: '/knowledgebase/active-deals/ongoing-deal-bahrain.md', label: 'Active deal: Bahrain' },
        { path: '/knowledgebase/active-deals/ongoing-deal-uae.md', label: 'Active deal: UAE' },
        ...WON_LOSS_DEBRIEFS.map((p) => ({ path: p, label: filename(p) })),
      ],
    },
  },
  uc3: {
    title: 'Contracting',
    secondBrain: {
      skills: [
        { path: '/skills/cm-contract-manager.md', label: 'Contract Manager' },
        { path: '/skills/legal-counsel.md', label: 'Legal Counsel' },
        { path: '/skills/cd-commercial-director.md', label: 'Commercial Director' },
        { path: '/skills/customer-contract-expert.md', label: 'Customer contract expert' },
        { path: '/skills/customer-gcc-operator.md', label: 'Customer skill (GCC)' },
      ],
      knowledgebase: [
        { path: '/knowledgebase/contract-artifacts/ericsson_bctc_catalogue.md', label: 'BCTC catalogue (wanted positions)' },
        { path: '/knowledgebase/customer-intelligence/customer-contract-history.md', label: 'Customer contract history' },
        { path: '/knowledgebase/customer-intelligence/customer-public-financials.md', label: 'Customer public financials' },
        { path: '/knowledgebase/customer-intelligence/customer-vendor-landscape.md', label: 'Vendor landscape' },
        { path: '/knowledgebase/active-deals/ongoing-deal-qatar.md', label: 'Active deal: Qatar' },
        { path: '/knowledgebase/active-deals/ongoing-deal-bahrain.md', label: 'Active deal: Bahrain' },
        { path: '/knowledgebase/active-deals/ongoing-deal-uae.md', label: 'Active deal: UAE' },
        ...WON_LOSS_DEBRIEFS.map((p) => ({ path: p, label: filename(p) })),
      ],
    },
  },
};

export const GENERIC_MANIFEST = [
  { path: '/generic-rag/ericsson-public-overview.md', label: 'Ericsson public overview' },
  { path: '/generic-rag/customer-public-overview.md', label: 'Customer public overview' },
];

function filename(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

function basenameExt(path) {
  return path.split('/').pop();
}

// Map of the exact citable filenames for a use case to their pill type.
// Skills are "reasoning" (how Ericsson reasons). Knowledgebase artifacts are "data".
// This is the single source of truth the renderer validates citations against.
export function citationIndex(useCase) {
  const m = MANIFEST[useCase] && MANIFEST[useCase].secondBrain;
  const idx = {};
  if (!m) return idx;
  for (const s of m.skills) idx[basenameExt(s.path)] = 'reasoning';
  for (const k of m.knowledgebase) idx[basenameExt(k.path)] = 'data';
  return idx;
}

// The CITATIONS instruction block injected into the Second Brain prompt, with the exact
// citable filenames for this use case so the model can only cite real loaded files.
function citationBlockText(useCase) {
  const m = MANIFEST[useCase] && MANIFEST[useCase].secondBrain;
  if (!m) return '';
  const list = (arr) => arr.map((p) => `- ${basenameExt(p.path)}`).join('\n');
  return `# CITATIONS

As you write, mark each claim that genuinely draws on a specific fact, pattern, wanted position, or prior outcome found in one of the loaded files listed below. Wrap that claim inline exactly like this:

[[cite:TYPE:filename]]the claim text[[/cite]]

TYPE is "reasoning" when the claim draws on a role skill (how Ericsson reasons). TYPE is "data" when the claim draws on a knowledgebase artifact (a deal record, financials, a won/loss debrief, a contract history, the BCTC catalogue).

Rules:
- Tag only a claim that genuinely draws on one of the named files below. Use the exact filename string. Do not invent, abbreviate, or alter filenames.
- Do not tag general commercial reasoning that any competent advisor would produce. Most prose stays untagged. Selective tagging is the point: a tag means the claim came from institutional memory.
- Never nest tags. One claim, one tag. Keep the tagged span to a single inline claim, not a whole paragraph or list.
- Do not place a tag inside a markdown table cell or a heading.

Files you may cite as reasoning (role skills):
${list(m.skills)}

Files you may cite as data (knowledgebase):
${list(m.knowledgebase)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Role frame and output structure per use case.
// Same role/structure for both modes; only the loaded knowledge differs.
// ─────────────────────────────────────────────────────────────────────────────

const ROLES = {
  uc1: `You are responding as Ericsson's bid response capability for an indicative, non-binding budgetary quotation.

Produce a response with three sections, each clearly headed:

## 1. Pricing schedule
Line-item indicative pricing in ranges (not point estimates). Group by equipment category, software, services, support. Show recommended commercial construct (multi-year framework, software-attach incentive, rebate structure) rather than a flat list-price discount.

## 2. Solution description
High-level technical description tied to the customer's stated needs. Reference relevant product variants, integration with installed base where known, deployment phasing. Concise — this is indicative, not detailed design.

## 3. Statement of compliance
Point-by-point response to the customer's stated requirements. For each, indicate compliance status (FULL / PARTIAL / OPTIONAL / NON-COMPLIANT) with brief justification.

This is an indicative, non-binding quotation. Pricing must be in ranges. Final terms subject to detailed scope and formal commercial discussion.`,

  uc2: `You are advising on a specific negotiation scenario at a major customer. Produce a structured negotiation play with the following sections, each clearly headed:

## 1. Customer pattern recognition
What is the customer actually doing here? Reference their known prior behaviour patterns. Distinguish between rhetorical positioning and real commercial signal.

## 2. Recommended wanted position
Ericsson's opening response. Framed commercially, not just on price. Tied to specific commercial constructs (multi-year framework, software-attach, rebate tiers, indexation) rather than list-price moves.

## 3. Likely counter-moves
Three rounds out. What is the customer likely to do at each stage and what are the contingency responses?

## 4. Trade-space
What Ericsson is genuinely willing to move on, and what is off the table. Be explicit about the framework-cascading risk of certain concessions.

## 5. Recommendation on form
Who from Ericsson should respond, in what channel, with what timing. Senior escalation considerations.`,

  uc3: `You are advising on contract negotiation. Produce a structured BCTC deviation assessment with the following sections:

## 1. Deviation table
Markdown table with columns: BCTC | Customer position | Ericsson wanted | Deviation severity (RED / AMBER / GREEN) | Brief note.

## 2. Risk analysis
For each RED and AMBER deviation, explain the commercial and legal exposure created if accepted as-is. Reference specific clause economics where relevant (liability cap × deal size, indexation × deal duration, etc.).

## 3. Negotiation priorities
Rank the deviations by priority. Which to push back on hardest, which to trade, which can be accepted. Tie to the customer's known patterns and the framework-cascading risk.

## 4. Suggested redlines for top three priorities
Draft replacement language aligned to Ericsson's wanted position for the three highest-priority deviations.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// Prompt assembly
// ─────────────────────────────────────────────────────────────────────────────

export async function buildPrompt(useCase, mode, options = {}) {
  const role = ROLES[useCase];
  if (!role) throw new Error(`Unknown use case: ${useCase}`);

  // UC1 Path 2: an uploaded customer RFQ (.docx text) replaces the built-in rfi-sample.md in the
  // Second Brain context only. Null for the generic side and for every other path and use case.
  const { rfqOverride = null } = options;

  if (mode === 'generic') {
    const files = await loadFiles(GENERIC_FILES);
    const context = files
      .filter((f) => f.ok)
      .map((f) => `### ${f.path}\n\n${f.text}`)
      .join('\n\n---\n\n');

    return `${role}

You have access only to the following generic, publicly available information about Ericsson and the customer. You do not have any internal company knowledge, customer behavioural patterns, prior deal history, contract precedents, or role-specific reasoning beyond what is in these documents and your own general knowledge.

# AVAILABLE CONTEXT

${context}

# INSTRUCTIONS

Produce the requested output to the best of your ability using only the context above and your general knowledge.`;
  }

  if (mode === 'second-brain') {
    const m = MANIFEST[useCase].secondBrain;
    const skillFiles = await loadFiles(m.skills.map((s) => s.path));
    const kbFiles = await loadFiles(m.knowledgebase.map((k) => k.path));

    const skillsBlock = skillFiles
      .filter((f) => f.ok)
      .map((f) => `### ${f.path}\n\n${f.text}`)
      .join('\n\n---\n\n');

    // Build the knowledgebase entries. If an uploaded RFQ is present (UC1 Path 2), swap the
    // built-in rfi-sample.md content for the uploaded document so the dropped file genuinely
    // drives the Second Brain output. Falls back to prepending if rfi-sample.md did not load.
    const kbEntries = kbFiles
      .filter((f) => f.ok)
      .map((f) => ({ heading: f.path, text: f.text }));

    if (rfqOverride && rfqOverride.text && rfqOverride.text.trim()) {
      const uploaded = {
        heading: `Customer RFQ (uploaded): ${rfqOverride.filename || 'customer-rfq.docx'}`,
        text: rfqOverride.text,
      };
      const i = kbEntries.findIndex((e) => e.heading.endsWith('rfi-sample.md'));
      if (i >= 0) kbEntries[i] = uploaded;
      else kbEntries.unshift(uploaded);
    }

    const kbBlock = kbEntries
      .map((e) => `### ${e.heading}\n\n${e.text}`)
      .join('\n\n---\n\n');

    return `${role}

You have access to Ericsson's Second Brain: role skills capturing how experienced Ericsson commercial people reason, a customer behavioural skill capturing how this specific customer negotiates and decides, and knowledgebase documents including prior deal history, Won/Loss + KAM debriefs, the BCTC catalogue with Ericsson wanted positions, and customer-specific intelligence.

Reason as the Ericsson commercial team would, using the patterns and reasoning captured in these skills. Reference prior deals where relevant. Be specific about commercial construct, not vague about "value." Avoid generic management vocabulary. Write in active voice with short declarative sentences.

# ROLE SKILLS

${skillsBlock}

# KNOWLEDGEBASE

${kbBlock}

${citationBlockText(useCase)}

# INSTRUCTIONS

Produce the requested output using all of the above context. Reason like an experienced Ericsson commercial team member with full institutional knowledge of how Ericsson decides and how this customer behaves.`;
  }

  throw new Error(`Unknown mode: ${mode}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Assessment call (Features 2 and 3). One call scores both outputs against the
// shared rubric and writes the Commercial Director review of the generic output.
// ─────────────────────────────────────────────────────────────────────────────

export const RUBRIC = [
  'Avoids a headline percentage discount as the primary lever.',
  'Flags group-framework precedent risk: a concession that propagates across OPCO accounts unless explicitly fenced.',
  'Anchors on value and capability (GPL ratio, commercial construct) rather than cost-plus or list-price matching.',
  'Names what the customer is actually optimizing for, separate from what they state.',
  'Proposes a fenced, non-propagating commercial construct (time-bound bundle incentive, structured terms) rather than an open concession.',
  'Defends the position structurally, not only on price: names the right battlefield when the competitor has a different cost structure.',
];

export async function buildAssessmentPrompt(useCase, genericText, brainText) {
  const [cd] = await loadFiles(['/skills/cd-commercial-director.md']);
  const cdSkill = cd && cd.ok ? cd.text : '';
  const rubricList = RUBRIC.map((r, i) => `${i + 1}. ${r}`).join('\n');

  const system = `You are assessing two AI-generated commercial responses to the same scenario. One response was written by a generic model with only public information. The other was written with Ericsson's institutional knowledge loaded. Score both against a fixed rubric, then write a short Commercial Director review of the generic response.

Be fair to the generic response. Where its answer is reasonable in general commercial terms, say so and pass it. It should lose only on institutional specifics it could not know, not on a rigged standard. Do not strawman it.

Score each output against each rubric item. Each item is a binary pass or fail. For each item, write one sentence of justification grounded in what that output actually says.

RUBRIC (score both outputs against these six items, in order):
${rubricList}

Then write the CD commentary: 2 to 4 short sentences in the voice of an Ericsson Commercial Director, reviewing the GENERIC output and naming the specific institutional miss. Active voice. Short declarative sentences. Observational, not advisory. No em dashes. No semicolons. Do not name any real customer, refer to it as a leading GCC operator. End on the concrete move, not a list of considerations.

Apply the judgement and voice of the Commercial Director skill below.

# COMMERCIAL DIRECTOR SKILL
${cdSkill}

Return ONLY a single valid JSON object. No preamble, no explanation, no markdown code fences. The exact shape is:
{
  "rubric": {
    "generic": [ {"item": "<rubric item text>", "pass": true, "note": "<one sentence>"} ],
    "secondBrain": [ {"item": "<rubric item text>", "pass": true, "note": "<one sentence>"} ]
  },
  "cdCommentary": "<2 to 4 sentences>"
}
Each rubric array must contain exactly six objects, in the same order as the rubric above. The "pass" field is a JSON boolean.`;

  const userMessage = `Both responses answer the same scenario.

=== GENERIC OUTPUT ===
${genericText}

=== SECOND BRAIN OUTPUT ===
${brainText}

Score both against the rubric and write the CD commentary on the generic output. Return only the JSON object.`;

  return { system, userMessage };
}
