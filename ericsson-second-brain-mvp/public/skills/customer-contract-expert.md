> **DRAFT — illustrative content, enriched from Ericsson CM, Legal, and account-team observation of the operator's contract function across many cycles. A customer contract-side behavioural profile narrated as Ericsson's external read, not a customer document. Captures the leading-GCC-operator archetype, not a single named account. To be reviewed before any external use.**

# Skill: Customer Contract Function Profile, A Leading GCC Operator

## What this profile is

Ericsson's captured read of how this operator's contract function (procurement, legal, security, the deal sponsor) actually drafts, pushes, and decides on terms. It complements the operator behavioural profile, which covers the whole vendor decision, by zooming into the contract table. The contract side is not one block. It is a cast with different authorities and incentives, and behaviour is attributed to the actor who drives it. Use it to tell a true red line from an opening anchor, real law from policy from bluff, and a hard stance from a movable one.

> Connective reasoning (mine, not yours): the framing here and the upfront cast are my structuring. The actors, authorities, and behaviours are all from your input, complemented by what Bilal and Samer described of the customer's contract team.

---

## The contract-side cast and who controls terms

- **Procurement / CPO.** Owns the RFQ/RFP package, the first contract draft and redlines, and the tender's defensibility. Bonused on savings and on a visibly competitive process. Controls the first draft, the commercial levers (price, volume, some LD tuning), the process timing, and how hard the opening stance is. Must escalate structural legal, regulatory, and sovereignty topics to legal and security, and material term changes to the business owner or board.
- **In-house legal (affiliate/opco).** Owns governing law, jurisdiction, language, liability architecture, indemnities, IP, and data clauses, and interprets local law and regulation. Can approve or reject legal constructs but is bound by group policy and national law. On data residency, immunity, and sovereign entities, will not move without group or government comfort.
- **Group legal vs affiliate legal.** Group owns the master templates and the group-standard positions for telecom, IT, cloud, data, security, and IP, and is the real source behind "group requires this clause" and "we used this with vendor X in opco Y." Affiliate legal implements the template locally with limited freedom on core clauses (law, jurisdiction, data sovereignty, IP). "Group requires it" is sometimes true and sometimes a local preference elevated to group status to speed acceptance.
- **Security and regulatory.** Review and sometimes dictate data residency, lawful intercept, security, and audit clauses, and influence coverage and national-security obligations. Legal will not override them. If security insists data stays in-country, that becomes a hard contractual requirement.
- **Business / technical owner (CTIO, domain heads).** The deal sponsor. Sometimes hides behind legal ("Legal does not allow this"), sometimes overrides it ("we need this deal, find a way"). Can push legal and procurement to accept more risk with a trusted vendor on strategic domains, or block a vendor they consider too risky regardless of price.
- **Board / sovereign / government.** Not at the table day to day, but set non-negotiable constraints (no certain vendors on strategic domains, strict data and control rules, local law, protection of state entities) and can veto or reshape any clause touching sovereignty, immunity, or national security.

So: procurement controls the opening and the commercial knobs, legal controls the legal architecture, security controls data residency and intercept, and the business owner can collide all of them when the project is strategic enough to win exceptions.

---

## Their standard contract playbook: the default-tilt template

They almost always start from a national or group master template, already tilted their way.

- **Liability and LDs.** High or uncapped liability in chosen areas (data breach and security incidents, regulatory fines, certain service failures), with caps at high multiples of contract value or none for some categories. LDs for delay, milestones, and SLA breach, often per-incident and without a clear aggregate cap, sometimes overlapping with other remedies. The intent is to shift operational and regulatory risk to the vendor beyond commercial norm.
- **Indemnity.** Broad cover for third-party claims, IP infringement, regulatory penalties, and sometimes the customer's own misuse if drafted loosely, pushed as a primary remedy rather than subsidiary to the liability cap.
- **Termination and step-in.** Termination for breach, repeated SLA failure, regulatory change, and convenience with modest or no compensation. Step-in rights to take over operations and use supplier IP or tools "as necessary." Written for maximum exit and control with minimal compensation.
- **IP and escrow.** Broad licences to use, modify, and sometimes sublicense supplier software, and ownership of "all customisations" or "all deliverables" with no recognition of Ericsson background IP. Escrow of source code or system documentation with triggers beyond bankruptcy (repeated SLA breach, change of control).
- **Payment and warranty.** Long DSO (90, 180, 270 days), heavy milestone holdbacks, payments sometimes linked to regulator acceptance or external events. Long warranty (24 to 36 months and beyond) extending past manufacturing defects into performance.
- **MFN, back-to-back, group constructs.** MFN for "no worse terms than any other operator," sometimes region or group wide. Back-to-back so the contract mirrors their obligations to regulators, government, or enterprise customers. Group GSAs cascaded across opcos to reuse the same tough positions.

Mandatory for them: governing law and local jurisdiction or arbitration, data residency, security and lawful intercept, immunity protections for state entities, and certain LD and termination structures tied to regulator obligations. Anchors, not group- or law-mandated, just procurement defining the battlefield: extreme LD rates and caps, very broad indemnities, uncapped liability areas, long payment terms, and broad MFN.

---

## How they negotiate the terms

- **"Group requires this" and "we used this with vendor X."** "Group requires" is used for governing law, data and security wording, and some IP and data clauses, sometimes truly mandated, sometimes local preference rebranded as group to speed acceptance. Precedent is used to lock in concessions other vendors, opcos, or domains once gave. Once a major vendor accepted a clause, it becomes their standard argument.
- **Recasting commercial asks as legal or regulatory.** Long payment terms, strict LDs, and certain indemnities get reframed as "required by regulation" or "group standard due to regulator commitments." Sometimes grounded (coverage and QoS obligations), often about CFO risk appetite rather than a formal legal obligation.
- **Sequencing.** Concede early on cosmetic drafting, some IP wording, LD rate tuning (not structure), and CSR and sustainability language. Hold to the last on governing law and jurisdiction, data residency and security, key liability carve-outs, termination and step-in, and payment and TCO-impacting terms, often linked to "we need this to take you to the board or regulator."
- **The Arabic-prevailing version.** Contracts often state Arabic as prevailing and English as translation. They may agree nuanced English wording, then request "alignment" of the Arabic with some interpretive latitude. Rarely weaponised openly, but it is latent leverage in a dispute.
- **Signing-deadline pressure on terms.** As the board window, budget cut-off, regulator deadline, or Ramadan approaches, certain clauses are declared non-negotiable ("no time to revisit, only price is left," "we cannot change governance or law now, only a discount"). Deliberate: compressing the clock forces the vendor to weigh a concession against missing the window.

---

## What they genuinely defend vs what they trade

**Defended to the end, often backed by group or law:**

1. **Governing law, jurisdiction, immunity.** Local or controlled regional law, local courts or a favourable arbitration seat, and sovereign immunity safeguarded for state entities. It affects enforceability, political control, and exposure of state assets.
2. **Data residency, lawful intercept, security.** Non-negotiable for network data, subscriber personal data, and MCN and defence contexts. Data in-country or in approved locations, explicit lawful-intercept and government-access hooks, and tight control over any cross-border processing including AI tools.
3. **Key liability carve-outs and caps.** Strong remedies preserved for regulatory breaches, security and data incidents, and catastrophic outages. They will trade exact numbers but keep carve-outs where the cap does not apply or is higher.
4. **Termination and step-in.** Especially in managed services, core, and MCN. The ability to step in or exit if the vendor fails or becomes politically unacceptable.
5. **Source-code and escrow in selective domains** (MCN and defence, critical core, bespoke platforms): assurance they can keep systems running if the vendor exits.

**Tabled aggressively but tradeable, the bargaining chips:**

- Exact LD rates and some caps: start high and uncapped, will cap or reduce for something they value more, such as data-residency assurance or TCO transparency.
- Payment terms: push 180 to 270 days and holdbacks, will move to 60 to 120 or release holdbacks for an attractive TCO or a strategic project needing vendor financial health.
- Warranty duration and breadth: ask long and broad, will narrow or shorten for comfortable lifecycle and support arrangements.
- MFN scope: start broad and group-wide, will limit to specific products, volumes, or timeframes.

---

## How prior history shapes the next cycle

Their contract team has a strong institutional memory and treats each cycle as an update, not a fresh start.

- **What they remember:** clauses that were hard for them to enforce, clauses that caused vendors pain they can use as leverage, and past claims, escalations, late deliveries, SLA issues, and any concession given under pressure.
- **How it carries forward:** a clause that was hard to apply gets tightened in their favour, or reshaped if it also hurt them in enforcement. A concession once given (a long payment term, a unique MFN carve-out, a high cap) becomes their default expectation and their baseline argument ("you accepted this in 2019, why not now").
- **Reopening settled positions:** usually to harden where they feel exposed, or to reflect new regulation, group policy, or governance on 3PP, security, or cloud. They rarely reopen to soften their own position unless the market has moved and it helps them adopt a vendor model they want (SaaS, cloud-native, managed services).

---

## What the redlines alone make you misread

Read only the marked-up contract and you see a very hard, one-sided position, and you misjudge what is movable.

- **"Legal requires X," law vs policy vs bluff.** Real law or group mandate: data residency and security hooks, local governing law and a class of courts or arbitration for state entities, lawful-intercept language, and some local-law limits on interest and penalties. They have written opinions and directives, and legal genuinely cannot endorse changes. Policy: many liability caps, indemnity breadth, MFN constructs, and warranty positions are risk appetite, not statute, and bend to a strong business and technical case. Bluff: "regulator requires" or "compliance requires" used to defend long payment terms, aggressive LDs, and non-essential MFNs with no specific law cited. Test it by asking for the underlying law or regulator directive. Real requirements survive detailed probing. Bluffs soften when you offer an alternative risk-mitigation structure.
- **True red lines vs opening anchors.** Red lines: law and jurisdiction, data residency and lawful intercept, state immunity and enforcement, and key liability carve-outs around regulatory and security incidents. Anchors: initial LD rates and caps, payment terms and holdbacks, warranty length and breadth, MFN scope, and wide indemnities. The first redline looks extreme by design. Their behaviour over cycles shows where they consistently walk back, especially on a strategic project with an operationally trusted vendor.
- **Hard procurement stance vs a movable one.** Hard: refuses to engage on structural alternatives, invokes board, regulator, or sovereign repeatedly, and blocks direct legal-to-legal conversations. Movable: willing to have side huddles with their own legal and security, enter joint triage with our CM and Legal, and consider alternative formulations (carve-outs, narrower MFN, limited LD adjustments). When procurement keeps saying "Legal will not allow" but never lets you talk to legal, it is usually a commercial positioning tool.
- **GCC-specific behaviours an outsider misjudges.** Data-residency hardness is a regulatory and political imperative for many data classes, not a tactic, and even transient AI processing can be sensitive. Insistence on local law and jurisdiction for strategic domains is about control, enforceability in their own system, and political protection of state assets. A generic model over-indexes on price and normal liabilities and under-estimates the political and regulatory weight behind these specific clauses.

---

## Voice when written

Ericsson's external read of the customer's contract function, not a customer document and not a single persona. Attributes each move to the actor who drives it (procurement, opco legal, group legal, security, the sponsor). Separates what is mandated by law or group from what is procurement's anchor, real red line from opening position, and a hard stance from a positioning tool. Grounds claims in observed pattern across cycles, and tells the reader how to test a stance, not just label it. Ends on what is actually movable and how to move it.

Forbidden: reading the redlines as fixed positions, taking "legal requires it" at face value, treating the contract side as one block, management jargon, and the construction "the question is not X, it's Y."
