> **DRAFT — anonymised ongoing-deal reference generated from internal Ericsson material. Customer not named. Ongoing deal, no final outcome. Review before external use.**

# Active Deal Reference — Defence, Bahrain

## Deal summary

- **Status and stage:** Ongoing. Current pipeline stage not specified in source.  
- **Segment:** Mission Critical Networks core and Integrated Core Solution for a defence private network, coupled with LTE RAN sharing and optional geo-redundant VoLTE / vIMS.  
- **Region:** Bahrain. The prime is a Bahraini mobile operator delivering a nationwide 4G RAN sharing solution to a Bahrain defence end customer on a private core.  
- **Approximate value:** Radio-only option net TCO over five years is about **5.9 million USD**. The Integrated Core Solution plus RAN sharing bundle option net effective TCO over five years is about **9.4 million USD** after an identified incentive. ICS core and geo-redundant VoLTE packages together account for about **8.3 million USD** net over five years when combined. Devices and optional IBS MOCN add about **0.5 million USD** and **0.45 million USD** net respectively. Figures are rounded from the detailed price list and commercial letter.  
- **Competitive context:** No alternative core or RAN vendors are named in the material. A third party mission-critical push-to-talk vendor (Streamwide) is in scope. A third party rugged device vendor (RugGear) is referenced for an associated devices package. Other competitor presence and incumbency are not specified in source.  

## Scope and solution

### Overall business context and architecture

The defence end customer requires a **private 4G/5G core network** with nationwide mission-critical coverage delivered via LTE RAN sharing, combined with a **geo-redundant Integrated Core Solution (ICS)** and an optional **geo-redundant VoLTE / vIMS** system. The private core is hosted in defence premises and integrated to the prime operator’s public LTE RAN across 1800 MHz and 800 MHz bands. RAN sharing is through a **MOCN** configuration. The RAN is managed by the operator, while the private core and vIMS are supplied and integrated by Ericsson.  

The ICS private core solution is built as **dual mode 4G/5G NSA** on Ericsson **CNIS** cloud-native infrastructure, with geo-redundant deployment across two sites. The configuration supports 4G / 5G NSA and is prepared for 5G SA, although 5G SA activation for the radio network is explicitly out of scope on the RAN side in this deal.  

Figure 1 below shows a typical Integrated Core Solution architecture for 4G/5G NSA, including packet core, policy, data management and orchestration domains, as provided in the core solution description. It illustrates the CNIS platform, PCC and PCG control and user planes, policy and data management functions and surrounding OSS/BSS interfaces, which align with the products listed for this defence private core.  



*Figure 1 (diagram omitted): Integrated Core Solution 4G/5G NSA architecture overview.*


*Figure 1: ICS reference architecture for dual mode 4G/5G NSA on CNIS, consistent with the defence private core solution.*  

### Capacity and design targets

The **core capacity requirements** for the defence private network are defined as:  

- **Technology:** 4G and 5G NSA, supporting IMS voice (VoLTE).  
- **Subscribers:** 10,000 data subscribers.  
- **Voice subscribers:** 1,000 concurrent VoLTE users.  
- **Throughput:** 10 Gbps initial core throughput, with hardware ready for up to 20 Gbps and approximately 100,000 subscribers.  
- **Geo-redundancy:** Two geographically separated core sites with active-active and active-standby configurations for different network functions.  

The **compact IMS** solution is specifically dimensioned to support **1,000 active users** from both infrastructure and software license perspectives. It provides basic VoLTE without interconnect, SRVCC or roaming, consistent with a closed private network focussed on internal defence use cases.  

### Core domains and components

The ICS proposal for this deal includes the following key network functions and supporting domains, all deployed as CNFs and VNFs on the CNIS platform:  

| Domain | Components | Role in this deal |
| --- | --- | --- |
| Dual-mode 4G/5G Core | **PCC** (AMF, SMF, MME, SGW-C, PGW-C). **PCG** (UPF, SGW-U, PGW-U). | Provides control and user plane for 4G/5G NSA, including tight interworking to existing EPC via standardized S1 and S5/N interfaces. |
| Subscriber and Policy Data | **CCDM** (UDR and provisioning). **CCSM** (UDM, AUSF, HSS-EPC, EIR). | Stores and provisions subscription and policy data for 4G and 5G NSA services, including defence subscribers and policy profiles. |
| Policy Control | **CCPC** (PCF/PCRF). | Delivers policy decisions for both 4G and 5G domains, integrated with PCG and PCC. Supports QoS and MC service policies. |
| Signalling | **SC** (Diameter DRA/DEA/DA, BSF, SCP, SEPP). | Provides signalling control and routing for 4G/5G core, including PCF bindings and Diameter functions. |
| Private IMS | **CSCF**, **MTAS**, **SBG/BGF**, **MRF**, **IPWorks** (ENUM, DNS), **vHSS** (IMS, EPC, AVG). | Delivers VoLTE and IMS services for up to 1,000 active users with 1+1 geo-redundant deployment. |
| Orchestration & Automation | **EVNFM** (CNF/VM VNF LCM). **EDA2** (convergent provisioning). **5G CAS** (pipelines, CNOM, AAT, GitLab, Vault). | Handles lifecycle management, automated deployment, upgrade and acceptance testing of core CNFs and vIMS VNFs. |
| Cloud Infrastructure | **CNIS** with **SDI3**, **CCD**, **Ceph hosted storage**, **CEE** for vIMS/vHSS. | Provides a compact two-site cloud fabric with hyperconverged Ceph storage and CCD cluster hosting all CNFs. |
| OAM and Monitoring | **CNOM** embedded, ENM / ENIQ integration, EOI-based OAM, PM, FM, logging. | Supports uniform OAM across ICS and vIMS, with alarm and performance data accessible via standard interfaces and CNOM dashboards. |

The CNIS cluster uses **SDI3 compact cloud** with a single pair of data and control switches per site, hosting CCD and Ceph for CNFs, and CEE for vIMS and vHSS where needed. Worker node pools are separated into packet core and standard node pools for optimal placement of PCC, PCG, CCDM, CCPC, CCRC, CCSM, SC, EDA and supporting tools.  

### RAN sharing scope and mission-critical features

The RAN sharing solution covers nationwide 4G LTE 1800 MHz and 800 MHz layers, totalling **30 MHz** of LTE spectrum used for mission-critical services. The defence private core appears as **“Operator 2”** sharing the operator’s LTE RAN via a **MOCN** configuration. The spectrum and radio assets belong to the prime operator, while each operator retains its own core network. The RAN is managed by the operator’s OSS. The private PLMN ID is broadcast alongside the operator PLMN ID in shared cells.  

The RAN solution activates four main LTE Software Value Packages on the existing LTE network:  

1. **Shared Networks (FAJ 801 0434)** to enable MOCN with multiple PLMN IDs per cell and up to six operators sharing LTE RAN.  
2. **IPSec (FAJ 801 0417)** to secure S1 and X2 control and user plane traffic between eNodeB and the private core security gateway, using IKEv2 and a range of encryption and integrity algorithms.  
3. **RAN Slicing (FAJ 801 0570)** to partition radio resources by PLMN with static, dynamic or mixed partitions and to enforce per-PLMN resource shares for fairness and SLA adherence.  
4. **Mission-Critical Services (FAJ 801 1017)** to support MCPTT, MC data and MC signalling, including MC-specific QCIs (65, 66, 69, 70) and enhanced PTT admission control for protecting mission-critical bearer QoS.  

Figure 2 below illustrates a MOCN RAN sharing architecture where a single eNodeB broadcasts multiple PLMNs and connects to separate core networks, consistent with the defence sharing scenario in this deal.  



*Figure 2 (diagram omitted): MOCN multi-operator RAN sharing between the operator and the defence private core.*


*Figure 2: Reference MOCN architecture with shared LTE RAN and separate core networks for the operator and the defence private core.*  

RAN IPSec is configured between eNodeBs and the defence security gateways. IPSec supports IPv4 and IPv6, uses IKEv2 with certificate-based or pre-shared key authentication, and supports a rich set of ESP and IKE algorithms (AES-GCM, ChaCha20-Poly1305, AES-CBC, SHA-2, etc). Multiple IPSec tunnels and redundant security gateways are supported for geo-redundancy. Dead Peer Detection and NAT-Traversal are available, and FQDN-based addressing allows flexible SEG deployment.  

RAN slicing and radio resource partitioning ensure each PLMN has a guaranteed share of radio resources while allowing best-effort use of unused capacity. This is particularly important for separating mission-critical defence traffic from the operator’s commercial traffic. Enhanced PTT admission control reserves sufficient dynamic resources for MC bearers, even during traffic bursts, to protect QoS for MCPTT voice and data sessions.  

### Work breakdown and phasing

The ICS and vIMS SoW describes a multi-phase programme with explicit work packages (WPs):  

- **WP1 Project Management:** Planning, execution, change control, configuration management and conclusion across the ICS and vIMS subprojects using Ericsson’s EPMM methodology.  
- **WP2 CNIS Deployment:** Solution analysis, HLD, LLD, acceptance definition, hardware build (site engineering, hardware installation), CNIS common services, SDI installation, CCD installation, CEE installation for vIMS, testing, acceptance and handover of the CNIS infrastructure.  
- **WP3 EVNFM Deployment:** Requirement analysis, HLD, test strategy, LLD, MoP and configuration, target platform readiness, deployment and integration of EVNFM, security and hardening, testing and acceptance.  
- **WP4 Ericsson Private 4G/5G Core:** Requirement analysis, HLD and signalling flow design, test definition, LLD, installation and configuration of PCC, PCG, CCDM, EDA, CCPC and related tools, integration with simulated BSS/CAS via SOAP UI, provisioning of test subscribers and policy rules, internal verification, and customer acceptance testing for MCN 4G/5G core.  
- **WP5 Ericsson vIMS Solution:** Requirement analysis, HLD, test definition, LLD, installation and configuration of CSCF, MTAS, SBC, MRF, IPWorks and vHSS across two sites, integration and internal verification, and customer acceptance testing for vIMS.  
- **WP6 CNOM Lightweight Network Management:** HLD, LLD and test definition, installation and configuration of CNOM and integration with new CNFs, followed by acceptance testing.  
- **LCM WPs:** Yearly infrastructure (SDI, CCD) and application upgrades for CNFs and vIMS with specific planning, MoPs, environment readiness, upgrade execution, verification and handover to support.  

In parallel, the MOCN SoW defines four main RAN workstreams: design, integration, feature activation and on-airing, and tuning and testing on golden clusters, with a detailed time plan running from purchase order issuance to final completion over several quarters.  

## Customer behaviour and stakeholders

### Stakeholder landscape

The deal involves three main stakeholder groups:  

1. **Defence end customer:** A Bahrain defence organisation using the private network for mission-critical communications.  
2. **Prime operator:** A Bahraini mobile operator that owns and operates the nationwide LTE RAN and acts as prime integrator and contracting party towards the defence end customer.  
3. **Ericsson:** Supplier of the Integrated Core Solution, private vIMS, CNIS infrastructure and MOCN rollout services, contracting with the operator and not directly with the defence end customer.  

Third party vendors are involved for mission-critical PTT application (Streamwide) and potential devices (RugGear). Streamwide contracts directly with the operator for PTT application scope. RugGear is recommended as a direct supplier to the operator for PTT devices and MDM, with Ericsson explicitly indicating that this will avoid additional mark up and is outside the ICS commercial package.  

### Behaviour of the defence end customer

The defence end customer operates through the prime operator’s RFP and contract structures. Its behaviour is inferred from the RFP-driven requirements and scope seen by Ericsson:  

- It demands **mission-critical performance** over the nationwide LTE footprint, including high throughput requirements, PTT and MC data features, RAN slicing and radio resource partitioning to protect mission-critical traffic.  
- It expects **geo-redundant core and IMS**, with 1+1 site architecture and geo-redundant configuration of PCC, PCG, CCDM, CCPC, CCSM, SC, EDA, EVNFM and vIMS VNFs.  
- It requires **private-core integration** into its mission-critical PTT solution and expects the private core to support MCPTT QCIs and enhanced PTT admission control in the RAN.  
- It expects clearly defined **proof of concept** and demonstration of MOCN stability and private network capabilities before full rollout, including prior MOCN trials and an LPG trial for private connectivity to the defence network, subject to trade compliance approvals.  

The defence customer’s detailed procurement posture, internal decision governance and performance KPIs beyond the specific TCO figures and features listed are **not specified in source**.

### Behaviour of the prime operator

The prime operator is the central commercial and technical counterpart to Ericsson. Its behaviours and responsibilities are documented in the responsibility matrix, SoWs and commercial letter:  

- It **owns project governance**, sets up steering committees and project management teams, provides project sponsors, and aligns with Ericsson’s XLPM/EPMM models.  
- It provides **sites, power, cooling, racks, DC gateways and IP backbone**, and ensures transmission readiness and MPLS/core router connectivity for the CNIS and MOCN solutions.  
- It retains **integration responsibilities** for non-Ericsson domains: existing core nodes, security gateways, PKI servers, ENM/ENIQ, OSS/BSS, charging, mediation, billing/CRM, device management, SIM cards, IP network design, and security gateways. These are explicitly out of Ericsson’s scope.  
- It acts as **prime integrator** and holds overall end-to-end responsibility towards the defence customer. Ericsson is responsible only for its scope and products as per the ICS and MOCN SoWs.  
- It is expected to **coordinate 3PPs** and ensure that non-Ericsson systems (mission-critical application server, devices, security gateways, etc) are aligned and ready in time for integration and testing.  

The operator is also responsible for **maintenance windows**, **traffic shifting**, **service tests before and after activities**, and **O&amp;M of the legacy network** during deployment and acceptance, as detailed in the responsibility matrix. It must enforce configuration freezes when required and handle any configuration changes outside Ericsson’s scope through the agreed change control process.  

### Behaviour of Ericsson

Ericsson behaves as a **solution owner** for ICS and vIMS and a **service provider** for MOCN rollout. The responsibility matrix and SoWs show:  

- Ericsson manages project scope, time and cost for its contracted domains.  
- It delivers ICS and vIMS design (HLD/LLD), CNIS design and deployment, EVNFM deployment, CNOM deployment, and all associated work packages.  
- It produces ATPs, TOLs and testing documentation, executes internal and joint acceptance tests, and provides test automation via AAT for ICS and vIMS.  
- It configures and integrates ICS, vIMS and CNOM into the operator’s network, but does not integrate to the defence application core or PTT solution beyond agreed interfaces.  
- For MOCN, Ericsson performs RAN feature activation, configuration of IPSec on eNodeBs, MOCN integration and basic QoS and golden-cluster optimisation, but does not take responsibility for end-to-end mission-critical QoS or defence incidents.  

Ericsson’s behaviour is bounded by clear **assumptions, exclusions and pre-requisites**, with repeated emphasis that any activity outside the written SoWs must be handled via formal change requests.

### Decision dynamics and optimisation goals

Decision-making splits across the actors as follows:  

- The defence end customer optimises for **mission-critical availability, coverage and QoS**. It drives capacity targets (10 Gbps, 10k users), MCPTT and radio slicing requirements and expects demonstration of performance and stability.  
- The prime operator optimises for **integrated RAN and core economics**, bundling radio software, ICS, vIMS, services, LCM and support into a multi-year TCO within its own commercial constraints and risk appetites.  
- Ericsson optimises for **repeatable ICS and MOCN patterns**, bundling core network applications, cloud infrastructure, and services into modular packages and controlling risk on non-Ericsson domains, 3PP hardware and export-controlled trial elements.  

Detailed internal decision processes, including formal pipeline stage names or internal governance beyond the described steering structures, are **not specified in source**.

## Commercial construct in play

### Package structure and bundling

The commercial offer is structured into four main packages plus an optional devices package, with both **bundle** and **radio-only** options presented as BAFO to the prime operator.  

1. **Package 1 – Nationwide MOCN on 4G RAN (30 MHz):**  
   - Software: Value Packages for **Shared Networks**, **IPSec**, **RAN Slicing**, **Mission-Critical Services**, and **RAN ESM** subscription for LTE SW per year.  
   - Services: MOCN POC services, rollout and basic network quality-of-experience services, including integration and optimisation.  
   - Support: Annual software support and ESM support.  

2. **Package 2 – Dedicated Private Core Network (ICS) Geo-redundant:**  
   - Hardware: CNIS infrastructure servers, switches, storage and racks for two sites.  
   - Software: ICS dual-mode core with PCC, PCG, CCPC, CCSM, CCDM, CCRC, EDA2, EVNFM, CNIS CCD/Ceph, NeLS and related ENM/ENIQ data store metrics.  
   - Services: ICS deployment services and LCM services.  
   - Support: Annual core and infrastructure support, including TBL (licence and support buckets) split into application and infrastructure components.  

3. **Package 3 – VoLTE with vIMS Geo-redundant:**  
   - Hardware: Servers, storage and network for vIMS in two sites.  
   - Software: Compact IMS (CSCF, MTAS, SBC, MRF, IPWorks, vHSS) and supporting EVNFM capacity.  
   - Services: vIMS deployment services and LCM services.  
   - Support: Annual vIMS support and e.g. Sinch SMSC ESM subscription.  

4. **Package 4 – Optional MOCN licences on IBS and additional sites:**  
   - Software: Additional MCN/MOCN value packages for IBS and extra LTE sites beyond Package 1 coverage, with associated RAN ESM and support.  

5. **Devices Package – 1,000 rugged PTT devices and MDM SaaS:**  
   - Hardware: 1,000 rugged PTT devices of type RG880i or equivalent.  
   - Software/Opex: MDM SaaS subscription and extended warranty.  
   - Ericsson notes that it does not have necessary approvals to include this package formally and recommends direct contracting between the operator and RugGear.  

The operator can select **Option 1** (radio only) or **Option 2** (radio plus ICS core) bundles. Option 2 is explicitly incentivised with a **bundle incentive** applied across the combined packages, with distribution details to be defined by Ericsson at contracting.  

### TCO and price structure

The **price list and commercial letter** provide detailed TCO breakdowns for five years (2026 to 2030) for each package, separating capex and opex and distinguishing software support and ESM subscriptions.

For **Package 1 – MOCN (radio only)**:  

- Net one-time capex: approximately **3.8 million USD**.  
- Net recurring opex per year (ESM + support): approximately **0.52 million USD**.  
- Five-year net TCO: approximately **5.9 million USD**.  

For **Package 2 – ICS core**:  

- Net one-time ICS capex (including initial LCM): approximately **3.0 million USD**.  
- Net recurring opex per year (LCM, TBL and support): approximately **0.76 million USD**.  
- Five-year net TCO for ICS: approximately **6.1 million USD**.  

For **Package 3 – VoLTE / vIMS**:  

- Net one-time vIMS capex (including initial LCM): approximately **1.3 million USD**.  
- Net recurring opex per year (LCM, TBL and support): approximately **0.22 million USD**.  
- Five-year net TCO: approximately **2.2 million USD**.  

For **Package 4 – Optional IBS MOCN**:  

- Net one-time capex: about **0.30 million USD**.  
- Net recurring opex per year: about **0.04 million USD**.  
- Five-year net TCO: about **0.45 million USD**.  

For the **devices package**:  

- Total net value: about **0.54 million USD**, broken into about **0.35 million USD** devices capex and roughly **0.19 million USD** in SaaS and warranty across the term.  
- Ericsson states these device prices are indicative and non-binding.  

The combined **bundle Option 2 (radio + core)** before incentives has a net TCO of around **14.1 million USD** over five years. The **bundle incentive** of around **4.8 million USD** reduces the net effective TCO to approximately **9.4 million USD**, which is the main reference value for the combined radio and core solution in this deal.  

### Price items, parameters and dimensioning insights

The detailed price list includes hundreds of line items across hardware, software, services and support. Key **price parameters and unit metrics** include:  

- **Core software licences:**  
  - PCC and PCG base packages priced per **1k IP sessions**, **1k SAU**, **Gbps user-plane**, and **instances**.  
  - CCDM UDR and provisioning licences priced per **k active users** for EPC, IMS, 5G Core and policy profiles.  
  - CCPC policy licences priced per **1k IP sessions** for base, voice and data policies.  
  - EDA provisioning packages priced per **k active users** and **k subscriptions** for LTE EPC, 5G EPC, UDM and policy.  
  - EVNFM and EO licences priced per **vCPU-year**.  

- **ENM / ENIQ and assurance licences:**  
  - Network Assurance Data Store metrics for PCC IP sessions, PCC SAU, PCG Gbps, CCPC, CCRC, CCSM, CCDM UDR and AUSF/UDM/ARPF, priced per **k active users**, **1k IP sessions**, **Gbps** and **instances**.  

- **Cloud infrastructure licences:**  
  - SDI SLX networking base packages priced per **switch/year** and **managed object/year**.  
  - CCD base packages and Ceph storage licences priced per **vCPU-year** and **TB-year** at each site.  
  - Ubuntu Pro and CCD single-server licences priced per **server/year**.  

- **Hardware line items:**  
  - CNIS servers (Dell EMC R7615, R6615), SSDs, SDI switches (SLX 8720), cables, racks (Minkels Nexpand, BYB501/BYB504), PDUs and UPS/battery systems, each priced per **unit**.  

- **Services and support:**  
  - ICS services, vIMS services and MOCN rollout services priced per **project**.  
  - LCM years priced as specific service codes per year.  
  - Support codes split into software support, hardware support and 3PP support with yearly recurrence.  

These metrics give **dimensioning insight**: for instance, ICS uses multiple small EPC/5G base packages for 10k users, several Gbps of PCG capacity, tens of thousands of UDR and policy profiles for CCDM, and a CCD cluster with more than 3,000 vCPU-year licences across both sites to support CNFs and EVNFM. Exact license counts and unit prices are visible line by line in the price list but are not aggregated into a single capacity figure beyond the 10k/10 Gbps headline values in the technical scope.  

**Unitary prices** are explicit for each line item (capex and recurring) in the spreadsheet, for example per-kIP session licence prices, per-Gbps PCG prices, per-GB storage prices, and per-server HW prices. However, **Ericsson cost and margin** fields are not included. The column labelled “Column2” and other trailing columns contain ratios and “ERROR:#DIV/0!” entries, but there is no explicit mapping to margins or profitability in the material.  

**Average profitability** for any package or for the overall deal is **not specified in source**.

### Incentives, indexation and payment terms

The commercial letter defines a **bundle incentive** for Option 2 (radio + core), totalling about **4.8 million USD**, to be applied only if the combined scope is contracted. Ericsson states that the incentive is package-specific, will not be used as a benchmark in future deals and is subject to internal approval and deal closure.  

There is **no explicit indexation formula** (such as CPI linkage) in the available documents. Any price evolution over time appears encoded through license profiles and yearly service codes rather than explicit indexing clauses. Indexation is therefore **not specified in source**.

**Payment terms** are specified as:  

- Equipment (HW and SW): 10 percent advance, 80 percent on delivery, 10 percent on acceptance.  
- Services: 10 percent advance, 70 percent on provisional acceptance, 20 percent on final acceptance.  
- Opex and ESM: 100 percent yearly in advance.  
- All payments to be covered 100 percent through a **confirmed and irrevocable Letter of Credit** with a credit period of 45 days.  

This structure provides a **front-loaded cash profile** for services and opex and a slightly more balanced profile for capex, with risk mitigation for Ericsson via LC-based payment.

### Where negotiation currently sits

The available materials present a **Best and Final Offer (BAFO)** with fixed packages, clearly stated exclusions and an explicit bundle incentive. Statements in the commercial letter emphasise:  

- The offer is **conditional** on final scope alignment, agreement of terms and conditions, internal approvals and trade/export control clearances.  
- The **Group Framework Agreement** between Ericsson and the operator remains the governing framework, with Ericsson reserving the right to propose modifications at contracting.  
- The offer **cannot be used for future benchmarking**, indicating that discount levels and incentives are deal specific.  

There is no explicit record of counterproposals or intermediate negotiation positions in the provided documents. The precise current stage of commercial negotiation and any updated price or scope revisions are **not specified in source**.

## Contract and BCTC positions in play

The deal folder does not include a full contract redline or BCTC tracker as in some other cases. However, the commercial letter and SoWs highlight several contract-relevant positions.

### End-user use-case and human-rights clauses

The commercial letter’s Annex 1 includes **end user provisions** focused on appropriate use of technology and human rights:  

- The operator must ensure that the defence end customer uses the services and licensed software in accordance with applicable law and **human rights standards**, including the Global Network Initiative (GNI) principles and Freedom Online Coalition guidelines for surveillance technologies.  
- Ericsson reserves the right, on notice, to **suspend or restrict services or software access** if it reasonably determines that use would breach these obligations.  
- The operator remains responsible for non-compliant use by the defence end customer and must have appropriate contractual or binding commitments in place.  
- **End user data** is treated as an exempt entity. Ericsson assumes no responsibility or liability for defence end user data and gives no indemnity or guarantee regarding such data.  

These provisions function as **BCTC safeguards** around lawful use, privacy and data responsibility.

### 3PP hardware terms and risk allocation

Annex 1 also introduces **3PP hardware terms and conditions** that qualitatively alter risk on third party components:  

- 3PP hardware prices in the offer are **indicative and subject to re-quotation** by Ericsson and the 3PP supplier prior to contracting.  
- Ericsson may **adjust 3PP pricing** later to reflect list price changes, discounts, freight, duties or surcharges from third party vendors.  
- Services not dependent on delivery, installation or operation of 3PP hardware may be invoiced according to agreed payment terms even if 3PP hardware is delayed.  
- 3PP hardware is **excluded** from calculations of Ericsson’s limitation of liability, LDs and SLA measurements.  
- Ericsson will **pass through third-party warranties** in their original form and will not provide additional warranties or liabilities.  
- Ericsson reserves the right to **terminate underlying 3PP agreements or substitute 3PP hardware** with compatible alternatives and does not commit to performance beyond initial deployment.  

These positions demonstrate a deliberate allocation of **3PP performance, price and liability risk** away from Ericsson and onto the operator and end customer.

### Export, sanctions and force majeure

The commercial letter makes the offer conditional on **trade and export control approvals** and includes a force majeure clause referencing delays or denials of export licences and regulatory approvals:  

- Ericsson states that the LPG trial and some aspects of the private network are subject to ongoing trade compliance with Swedish authorities.  
- Any resulting agreement will require completion of approvals under export, sanctions or end-use laws, and no binding obligation arises until a definitive agreement is executed and approvals obtained.  
- Ericsson explicitly excludes liability for failure or delay where export licences or regulatory approvals are delayed or denied and categorises such events as **force majeure**.  

### Liability, confidentiality and IP

The letter reiterates that:  

- The entire offer is **Commercial in Confidence**. Confidential information cannot be disclosed or used by third parties, and IP rights remain with Ericsson.  
- The Group Framework Agreement remains the main contract and will prevail where inconsistent with the proposal unless explicitly overridden.  
- Extensive limitations of liability, LDs and SLA provisions are referenced in the GFA, though their exact numeric values are not restated here.  

The exact LD percentages, liability caps and BCTC deviations versus the GFA are **not specified in source** beyond the 3PP carve out.

### Payment security and LC terms

The commercial letter states that the **entire payment flow** for this deal will be covered by a confirmed, irrevocable **Letter of Credit**, with a 45 day credit period. This substantially reduces Ericsson’s payment risk and functions as a **BCTC-level payment security clause**.  

Other common BCTC topics such as detailed **LD formulations**, **service credits**, **data protection** and **audit** rights are governed by the Group Framework Agreement and are **not specified in source** for this deal.

## What this teaches for future deals

### Scope and technical pattern for defence private networks

This deal shows a reusable pattern for defence and similar mission-critical private network opportunities:  

- **Combined RAN and core approach:** Integrate a geo-redundant ICS private core and optional vIMS with nationwide LTE RAN via MOCN, rather than selling only core. This enables rapid coverage and scale without deploying a dedicated RAN for the defence customer.  
- **RAN features for mission-critical traffic:** Use Shared Networks, IPSec, RAN Slicing and Mission-Critical Services value packages to enable MOCN with strong isolation and QoS for MCPTT and MC data. Include radio resource partitioning and enhanced PTT admission control as standard.  
- **CNIS-based dual-mode core:** Deploy dual-mode 4G/5G NSA core on CNIS with CCD and hyperconverged Ceph storage across two sites. Use EVNFM, EDA2, 5G CAS and CNOM to simplify lifecycle management and observability.  
- **Compact IMS for private voice:** Offer a compact, geo-redundant IMS sized specifically for the private defence user base, without public interconnect or roaming, to reduce resource footprint and risk.  

These patterns can be applied in other **defence and public safety** deals where the operator is prime and wants to reuse its RAN.

### Commercial structuring lessons

The **package and TCO construction** give several benchmarks for future ICS and mission-critical pursuits:  

- A **modular package model** (RAN MOCN, ICS core, vIMS, optional IBS MOCN, devices) gives flexibility to the operator to pick radio-only, core-only or combined options while still allowing Ericsson to offer a bundle incentive for the integrated solution.  
- **Five-year TCO framing** with separate capex and yearly opex lines for ESM, LCM and support makes the deal easier to compare internally and supports defence budget planning.  
- The **bundle incentive** for the combined radio and core option can be a powerful lever to pull the deal towards a more strategic footprint while still keeping radio-only as a fallback.  
- Pricing architecture anchored around **standard Ericsson price objects** (per-1k IP sessions, per-Gbps, per-k active users, per-vCPU-year, per-node) supports scaling up or down in future iterations without redoing the entire commercial model.  

The deal also illustrates the need to **ringfence 3PP exposure** with explicit 3PP clauses and to position 3PP prices as indicative and subject to re-quotation.

### Customer and operator behaviour patterns

The behaviour of the defence end customer and the operator provides **reference expectations**:  

- Defence and mission-critical customers may ask for **very high throughput** and **100 percent availability under stress**; the documentation shows how Ericsson responds with specific MCPTT QCIs, PTT admission control, RAN slicing and geo-redundant core, while at the same time clarifying that dedicated capacity under all conditions is not guaranteed and special events are excluded.  
- Operators acting as prime will push for **E2E responsibility** from Ericsson. The SoWs and responsibility matrix show how Ericsson can reply with a clear split: Ericsson only for ICS, vIMS, CNIS and RAN features; the operator for 3PP, ENM/ENIQ, IP network, devices and end-to-end MCN QoS.  
- The defence context motivates **human rights and end-use clauses** in the commercial letter, which may become standard expectations for future public safety deployments.  

These patterns suggest that early **responsibility matrices**, strong **assumption lists** and explicit **exclusions** are critical for managing scope creep in similar deals.

### Negotiation and BCTC playbook elements

Even without a full term redline, this deal shows several **negotiation moves** relevant to BCTC discussions:  

- **Bundled incentives** with clear non-benchmarking statements help protect pricing levels in later deals.  
- **3PP carve outs** for liability, LDs, SLA and price volatility protect Ericsson from shocks in third party supply chains.  
- **Trade compliance and force majeure language** around export controls should be pre-positioned in offers for defence and cross-border public safety projects.  
- **End user use-case controls** that permit suspension in case of misaligned use set a standard for responsible technology deployment in sensitive sectors.  

These elements can inform future ICS and mission-critical deals where defence, public safety or critical infrastructure customers are involved.

Where details such as exact **pipeline stage**, **internal decision gates**, or **average profitability** are not visible in the source material, they are **not specified in source** and should not be inferred when using this reference.

---



---

## Sources

Internal Ericsson deal documents (anonymised): core and RAN statements of work, commercial letter, core and RAN solution descriptions, detailed price list, MOCN statement of work, and responsibility matrix. Source references removed for confidentiality.
