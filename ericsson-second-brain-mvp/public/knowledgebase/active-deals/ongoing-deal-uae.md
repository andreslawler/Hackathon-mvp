> **DRAFT — anonymised ongoing-deal reference generated from internal Ericsson material. Customer not named. Ongoing deal, no final outcome. Review before external use.**

# Active Deal Reference — telecom operator, UAE

## Deal summary

- **Status and stage:** Ongoing RFP. Ericsson has submitted a technical solution description, statement of work, detailed BoQs, TCO model and a commercial offer letter in response to a qualification RFP for a private 4G–5G core and IMS. Award decision and contract signature are not present in the material. The offer is described as a preliminary non‑binding basis for negotiation and is valid for 120 days, with a special incentive conditional on award before the end of June 2026.
- **Segment:** Integrated Core Solution (ICS) 1.2 on CNIS providing a dual‑mode 4G/5G private core plus Compact IMS for VoLTE and VoNR. Target is a dedicated private mobile core for data and voice with mission‑critical style features and a five‑year TCO framing.
- **Region:** UAE. The customer is a UAE telecom operator procuring a private core solution via its group procurement and technical organisations.
- **Approximate value:** Phase‑1 main scope five‑year TCO is about AED 35.8 million before the one-time introduction incentive and about AED 27.7 million after it (circa AED 14.1 million in year 1 and around AED 3.4 million per year in years 2–5). Optional SC ENM adds around AED 4.0 million TCO. Optional ICS testbed adds around AED 12.9 million. Optional SIM writer and 10k SIMs adds around AED 0.6 million.
- **Competitive context:** The documents describe an open RFP process with technical SOC, security SOC and detailed compliance matrices. Specific competing vendors and any incumbent core supplier are not specified in source.

## Scope and solution

The proposed solution is a fully on‑premises, cloud‑native private core and IMS deployment using Ericsson Integrated Core Solution (ICS) 1.2 on CNIS for the packet core and a Compact IMS solution on CEE over CNIS for voice. The solution supports 4G, 5G NSA and 5G SA, with converged core functions and IMS providing VoLTE and VoNR for a dedicated private network. The design targets mission‑critical style availability with geo‑redundant sites and a separate testbed environment.

Capacity requirements are explicitly phased. Phase‑1 supports 10k data and 10k voice subscribers and 10 Gbps throughput. Phase‑2 scales to 50k data and 50k voice subscribers and 50 Gbps. Phase‑3 scales to 100k data and 100k voice subscribers and 100 Gbps. The design assumes integration of about 21k radio sites from the operator’s live network and must support both public radio sites and private radio sites.

The high‑level scope includes:

- Geo‑redundant production ICS core and Compact IMS across two sites with UE IP session continuity and 1+1 geo‑redundant architecture.
- A test lab core and IMS site as an optional scope for offline validation.
- Integration to the operator’s existing Ericsson Network Manager (ENM) and ENIQ for management and analytics, with an optional Single Compact Server ENM as a new dedicated NMS for the private core and IMS.

The customer time plan spans hardware ordering and delivery, resource mobilisation, HLD, LLD and ATP, deployment and configuration, integration and internal testing, a stream-wide test lab, customer acceptance and go-live. Milestones run from M-3 through M4, covering PO, contract sign-off, kick-off, solution design, implementation, acceptance and go-live, with separate schedule views for the main ICS deployment and the optional SC ENM.

### Domains and components

**Packet core and data layer**

The ICS packet core includes the following cloud‑native network functions deployed on Ericsson CNIS:

- **PCC (Packet Core Controller):** Dual‑mode control plane providing AMF and SMF for 5GC and MME, SGW‑C and PGW‑C for EPC. It handles device network access control, mobility and session management across 4G and 5G, including tight interworking with an existing EPC via N26 and S5‑C/S11.
- **PCG (Packet Core Gateway):** Cloud‑native user plane implementing UPF, SGW‑U and PGW‑U, with advanced data plane functions such as packet inspection, traffic management, content insertion and simultaneous local and central anchoring for distributed deployment. It supports interworking via S5‑U or S1‑U to an existing EPC.
- **CCDM (Cloud Core Data‑Storage Manager):** Provides UDR and a provisioning function for 2G–5G subscription and policy data. It uses Apache Geode as a horizontally scalable in‑memory database and exposes REST and Nudr interfaces for 5G and Ud for 4G.
- **CCSM (Cloud Core Subscription Manager):** Provides UDM and AUSF functionality and interworks with vHSS for 4G registration and subscription management. It performs subscriber authentication, subscription management and can support equipment identity checks.
- **CCRC (Cloud Core Resource Controller):** Provides NRF functionality, and optionally NSSF. In this solution it is deployed for NRF only because network slicing requirements are not requested.
- **CCPC (Cloud Core Policy Controller):** Combines PCF and PCRF for unified policy control for both 5GC and EPC. It provides policy rules based on subscriber profile and network conditions, and integrates with UDR and charging systems.
- **SC (Signaling Controller):** Provides SBA signalling functions including SCP, BSF and SEPP for 5GC, and Diameter DA, DRA and DEA for EPC. It manages NF service discovery and load balancing and can implement binding support functions for PCF selection.
- **vHSS:** Provides HSS front end for EPC and IMS, with ISM, ESM, SDA, AFG and PSM modules for mobility, security, identification, access and session management. Deployed on CEE over CNIS in both production sites and test lab.

The data layer is designed for geo‑redundancy and session continuity. The design options include 1+1 CCDM geo‑redundancy or full integrated geo‑redundancy of the entire ICS stack with UE IP session continuity in case of site failure.

**Private IMS core**

The Compact IMS solution covers 4G and 5G voice services and is explicitly sized for the same 10k, 50k and 100k active‑user phases as the packet core. It intentionally excludes roaming, CS fallback and interconnect for this closed private network and focuses on VoLTE and VoNR for private radio UEs.

Key IMS components are:

- **CSCF (I/S/E‑CSCF, BGCF, EATF)** for SIP call control and service interaction.
- **MTAS (MMTel AS)** for telephony services and extensive supplementary service set.
- **vMRF** for media mixing, announcements and conferencing, integrated with MTAS over H.248 and supporting HD announcements and multiple codecs.
- **vSBG and vBGF** for session border and media gateway functions at access and core edges, deployed as hot-standby mated pairs across multiple trunk networks.
- **IPWorks** providing ENUM and DNS (iDNS/eDNS) for number translation and name resolution, with a MySQL-based ENUM server scaling to hundreds of millions of NAPTR records.
- **vHSS** for IMS and EPC subscriber data, with dedicated profiles for IMS applications.

The Compact IMS is architected as a small three‑server CEE deployment for initial capacity, verified for up to around 200k subscribers per site, and can be expanded by moving to a standard IMS flavour if capacity grows beyond compact profiles. The IMS VNFs deploy on SC and PL virtual machines with anti-affinity policies across internal, OAM, signalling, provisioning and charging networks.

**Cloud infrastructure and platform**

The solution is built on Ericsson Cloud Native Infrastructure Solution (CNIS) with SDI 3 compact cloud fabric. It uses:

- **SDI** for software‑defined infrastructure and management of compute, storage and network resources including EAM‑S control switches and Extreme SLX 8720 data switches with EFA automation, plus SEMC for hardware management.
- **CCD (Cloud Container Distribution)** as CNCF‑certified Kubernetes distribution, with Calico, Multus and OVS CNI, deployed hyperconverged on bare‑metal servers with Ceph‑based persistent storage.
- **CEE** for NFVI and VIM functions for vHSS and IMS VNFs, deployed on CEE vPODs with collocated controller and tenant functions.
- **EVNFM** for CNF and VNF lifecycle management.
- **Common services** including OpenLDAP, cNeLS license server, repositories and automation tools.

The CNIS cluster is logically divided into Packet Core and Standard node pools. Packet Core nodes host PCG and PCC data plane and control plane workloads with SR‑IOV and Ceph OSDs. Standard nodes host CCDM, CCSM, CCPC, CCRC, SC, EDA, EVNFM and other support functions. The control plane nodes also host application pods and Ceph storage in a hyperconverged model.

**Management, OAM and automation**

The OAM model aims for unified management across ICS and IMS:

- **CNOM** embedded as a common GUI for monitoring, alarm viewing and log analysis for ICS CNFs, with applications for CNF Monitor, alarm monitor and log viewer.
- **ENM and ENIQ** for network management and assurance, with an optional SC ENM appliance (Single Compact Server ENM) for this private network.
- **5G Core Automation Solution (5GCAS)** and Cloud Core Pipelines for CI/CD‑style deployment and upgrade of CNFs via GitLab, pipelines and portable automation jobs, with Vault for secret management and AAT for automatic acceptance testing.

Unified OAM interfaces are provided via NETCONF and CLI, with configuration data modelled in YANG, fault management via SNMP and VES, and performance management via 3GPP‑compliant PM files and VES measurement events. Logging uses a common JSON schema with different planes for system, audit, debug and optional syslog forwarding.

**Integration with installed base**

The ICS solution assumes integration with the operator’s existing:

- Multi‑vendor RAN using standard S1/N2/N3.
- Existing ENM and ENIQ for management and analytics.
- Charging systems via standard CDRs and online/offline interfaces.
- Provisioning/BSS systems via EDA2 APIs.
- Lawful interception and security infrastructure via standard ETSI/3GPP LI and security interfaces.

The compliance matrix shows a large number of requirements accepted as compliant or partially compliant, including integration with LBS, CRM, OSS umbrella systems, SIEM, PAM, NAC, vulnerability management, LI systems and SA cloud infrastructure. Specific external platforms such as PTX, TETRA or operator‑specific NMS front ends are out of scope or offered as optional integration only.

Where some integrations are described at high level but with no detailed design or interfaces in the material, the details are not specified in source.

## Customer behaviour and stakeholders

The material reveals a structured and demanding buying organisation within a large UAE telecom operator. The customer runs a multi‑phase RFP and negotiation process that couples technical, security, legal and commercial workstreams under an existing principal framework contract.

### Buying centre and governance

The RFP and offer letter are addressed to the operator’s group procurement leadership, indicating that commercial control sits with centralised procurement supported by technical sponsors from network, IT and security. Ericsson’s Statement of Work (SoW) bases delivery on its EPMM project methodology and System Integration delivery model, and proposes a governance structure with:

- A **Steering Committee** with representatives from both sides to take executive decisions and handle escalations.
- A **Project Management Team** with project managers and solution architects from both parties to drive execution.
- A customer project organisation including project sponsor, project manager, technical leads and stream leaders for core, IMS, infrastructure and OSS integration.

The customer is expected to staff a cross‑functional team that mirrors Ericsson’s project structure and has authority to make day‑to‑day decisions. The SoW stresses that the operator is the end‑to‑end prime integrator for aspects outside Ericsson’s contracted scope, especially third‑party systems and MCX applications.

### Procurement posture and negotiation style

The customer issues a detailed technical and security SOC (statement of compliance) covering packet core, IMS, UDM, security, lawful interception, location services, OSS integration, CRM integration and operational processes. Each clause requires a response as Fully Compliant, Partially Compliant or Non‑Compliant with Ericsson comments and references to product documentation. The compliance sheet runs through LI specifics, encryption, SIEM, PAM, NAC, EDR, vulnerability management, data at rest and in transit, 5G SUCI, IMSI rotation, edge architectures, CRM encryption, PII databases, CDR handling, LBS integration, emergency calls, OSS integration, training, TAPP procedures and many other topics.

The customer pushes for:

- Perpetual licences and lifetime usage rights, or at least technology‑agnostic unified licences that can be used across 4G, 5G NSA and 5G SA, with unlimited concurrent sessions and subscribers where possible.
- Five‑year warranty and support including software upgrades at no additional cost, and post‑warranty support pricing as a percentage of final contract value.
- Strong LI, SA and cyber‑security requirements including hosting LI in the operator’s SA cloud, dual connectivity to SA platforms, buffering, at‑rest and in‑transit encryption, SIEM integration, PAM, EDR and cyber‑security policy compliance.
- Long price validity (36 months) for equipment and services, and comprehensive ALM‑style BoQ with detailed asset life‑cycle information.

Ericsson’s responses show a willingness to align where product capability and commercial models allow and clear push‑back where requirements conflict with portfolio and cost structure. Examples include:

- Licences are offered as term‑based (TBL) rather than perpetual, and perpetual lifetime rights and unlimited licences are marked Non‑Compliant at several points. Ericsson emphasises the term‑based licence model and software subscription with LCM services.
- A five‑year warranty fully free of charge is not accepted. Instead support and LCM are offered as paid services aligned with a five‑year TCO.
- Price validity of 36 months is marked Non‑Compliant for hardware because of volatility in third‑party hardware pricing. Ericsson instead offers hardware prices with short validity and suggests the operator procuring hardware directly where appropriate.
- Several LI and SA integration requirements that relate to SA cloud platforms, buffering, mediation, specific SA processes or additional developments are marked Non‑Compliant or Partially Compliant and explicitly stated as outside the offered scope.

The operator also issues a separate clarification round asking for explicit statements on converged core capability, licensing model, maximum capacity, inclusion of testbed, NMS with full FCAPS, SIM cards and terminals for testing, and separation of commercial line items for data core, voice core and UDM. Ericsson responds positively to most of these, emphasising converged 4G/5G NSA/SA support and separate line items, and offers testbed, SC ENM, SIM writer and resident engineer as optional scopes.

### Technical and security stakeholders

The security, lawful interception and SA teams have strong influence. There is a dedicated LI and SA requirements section in the SOC spreadsheet that goes far beyond standard core requirements, including hosting of LI functions in the SA cloud, compliance with SA cyber‑security policies, and detailed LI behavioural expectations. Ericsson repeatedly notes where non‑technical or platform‑level SA requirements must be addressed by the operator and its LI platform rather than by the 5GC/IMS solution.

The operator’s cyber‑security organisation requires alignment with its cyber‑security process and regulatory requirements, including integration with SIEM, PAM and other enterprise controls. Ericsson confirms alignment at the product level with 3GPP, ETSI NFV‑SEC, GSMA NESAS/SCAS and ISO‑aligned security baselines and commits to mapping to the operator’s specific forms during delivery while stating that some posture and compliance management functions remain outside product scope.

### Project behaviour and responsibilities

The SoW clarifies that:

- The operator is the end‑to‑end prime integrator for the total solution, coordinating third‑party vendors and MCX applications. Ericsson is responsible for the contracted ICS, IMS and CNIS scope and for integration to specified interfaces.
- Many prerequisites and exclusions are explicitly placed on the operator, including providing DC gateways, DNS, NTP, LDAP, remote access, transmission readiness, test tools, terminals, SIMs, RAN readiness, integration to CAS and charging, site civil works, and end‑to‑end drive tests and capacity studies.
- The operator’s SA and security teams will perform separate acceptance and compliance evaluations. Ericsson commits to providing documentation, design and test support but not to running the SA’s internal acceptance process.

Overall the buying behaviour combines tight commercial control, high security expectations, very detailed compliance governance and practical willingness to accept standard Ericsson models where the vendor can justify them.

## Commercial construct in play

The commercial construct is a multi‑component, multi‑year model anchored around a five‑year TCO for Phase‑1, explicit options for testbed and SC ENM, and clearly structured term‑based licences combined with hardware, services, support and life‑cycle management.

### Overall commercial model

Key elements:

- **Five‑year Phase‑1 TCO:** Phase‑1 main scope final TCO after incentives is about AED 27.7 million over five years. Year‑1 is capex‑heavy due to hardware and project services. Years 2–5 are dominated by recurring TBL licences, hardware support, Snowdrop services and support services.
- **Term‑based software licences:** All major software is offered as term‑based licences measured per year, not perpetual. Metrics include kActive User per year, kSAU per year, Gbps per year, 1k IP Sessions per year and MPS per year. The clarifications and SOC explicitly reference term‑based licences and subscription models, and perpetual licences are marked Non‑Compliant where requested.
- **Hardware capex:** CNIS compute, storage, switches and cabinets for core and IMS are paid upfront, with separate third‑party hardware support services for the five‑year period.
- **Professional services:** Project services for Phase‑1 include project management, CNIS deployment, EVNFM deployment, ICS deployment, vIMS deployment, ENM integration and LCM projects. These are priced as services in AED and scheduled across the project phases. Under product keys such as ICS Services, Security WP, ICS Testbed Services, SC ENM and Online trainings, individual packages range from tens of thousands AED up to several million AED, with total ICS services for Phase-1 in the range of about AED 7.3 to 8.5 million depending on whether the additional testbed and security work packages are included.
- **Support and LCM:** Snowdrop (software update) services, hardware support and support services for applications are priced as recurring yearly items. Separate LCM projects are priced from 2027 onward in the BoQ and TCO sheets.

Before the introduction incentive, the Phase-1 five-year TCO is about AED 35.8 million, composed roughly of AED 9.2 million in core and IMS infrastructure hardware across both sites, AED 5.3 million in term-based core and infrastructure software licences for Phase-1 capacity at 10k subscribers, AED 7.3 million in project services for the main ICS deployment, AED 3.2 million in Snowdrop software upgrade services, AED 4.8 million in support services and AED 4.4 million in third-party hardware support across 2027 to 2030. The one-time ICS introduction incentive then subtracts about AED 8.1 million, bringing the Phase-1 TCO to about AED 27.7 million.

Average profitability and Ericsson internal cost structure are not specified in source.

### Payment terms and incentives

The Offer Letter sets explicit payment and incentive conditions:

- Hardware and perpetual software (where any exists) are invoiced 100 percent upon delivery.
- Term‑based licences are invoiced 100 percent yearly in advance.
- Implementation services are invoiced 50 percent in advance and 50 percent at Ready for Service (RFS).
- Recurring services (third‑party hardware support, Snowdrop, support services) are invoiced 100 percent yearly in advance.
- Payment terms are 30 days from invoice.
- A special one‑time “break‑in incentive” is offered for the first ICS deployment for this operator, conditional on a letter of award before the end of June 2026 and contract signature within Q3 2026. The incentive is visible in the TCO sheet as a multi‑year discount row reducing the Phase‑1 TCO by about AED 8.1 million over five years.

Price indexation, foreign exchange terms and inflation clauses are not specified in source.

The SOC and clarifications show the operator requesting 36‑month price validity, but Ericsson flags this as Non‑Compliant for hardware due to market volatility and restricts third‑party hardware price validity to a short window (two weeks) in the Offer Letter.

### Price structure, parameters and dimensioning

The pricing model is tightly linked to the dimensioning assumptions:

- Subscriber and throughput phases are fixed at 10k, 50k and 100k data and voice users with corresponding 10, 50 and 100 Gbps, and the software BoQ quantities scale linearly with these phases for Y1–Y3.
- The ICS SW BoQ specifies Y1, Y2 and Y3 quantities per metric. For example, CCDM UDR 5G Policy Small Profile and CCDM UDR UDM Small Profile are each dimensioned at 5, 20 and 25 kActive Users per year across Y1–Y3, matching the 10k, 50k and 100k subscriber phases. CCSM AUSF and UDM base packages follow similar 5, 20 and 25 kActive User patterns.
- Packet Core control and user plane licences are dimensioned by IP sessions and throughput in kIPS and Gbps. PCC 5GC Base Package kIPS Small is dimensioned at 10, 40 and 50 k IP sessions per year; PCC 5GC Base Package kSAU at 5, 20 and 25 kSAU per year. PCG 5GC Base Package Gbps is sized at 5, 20 and 25 Gbps per year.
- IMS licences are dimensioned by voice subscribers and MPS for SBC and MRF functions, with quantities of 10k, 40k and 50k for many MTAS and CSCF licences and MPS values for signalling and media capacity.

The RFP pricing sheet provides granular net unit prices for each software item in AED per metric. Representative examples from the Phase‑1 BoQ include:

| Area                | Product (example)                                | Metric                    | Typical Y1 Qty | Net unit price (recurring, AED, rounded) | Price parameter insight                       |
|---------------------|--------------------------------------------------|---------------------------|---------------|-------------------------------------------|-----------------------------------------------|
| Subscriber data     | CCDM UDR 5G Policy Small Profile                | kActive User per year     | 5             | ~222 per kActive User                     | Scales with subscriber count in each phase    |
| Subscriber data     | CCDM UDR UDM Small Profile                      | kActive User per year     | 5             | ~319 per kActive User                     | UDM subscription load                         |
| Subscriber data     | CCSM AUSF Small Base Package                    | kActive User per year     | 5             | ~299 per kActive User                     | 5G authentication volume                      |
| Subscriber data     | CCSM UDM/ARPF Small Base Package                | kActive User per year     | 5             | ~599 per kActive User                     | UDM/ARPF base capacity                        |
| Packet core control | PCC 5GC Base Package kIPS Small                 | 1k IP Sessions per year   | 10            | ~1,590 per 1k IP sessions                 | Session dimensioning across phases            |
| Packet core control | PCC 5GC Base Package kSAU Small                 | kSAU per year             | 5             | ~2,099 per kSAU                           | Subscriber attachment capacity                |
| Packet core user    | PCG 5GC Base Package Gbps                       | Gbps per year             | 5             | ~12,589 per Gbps                          | User plane throughput dimensioning            |
| Policy              | CCPC SM‑Policies Small Base Package             | 1k IP Sessions per year   | 5             | ~1,186 per 1k IP sessions                 | Data policies per session                     |
| Policy              | CCPC SM‑Policies Voice Small                    | 1k IP Sessions per year   | 5             | ~356 per 1k IP sessions                   | Voice policy capacity                         |
| Signalling          | SC Base Package Instance                        | Instance per year         | 2             | ~29,086 per instance                      | SC instance licence per site                  |
| Signalling          | Service Proxy Function                          | MPS per year              | 1,200         | ~6 per MPS                                | SBI service proxy throughput                  |
| Orchestration       | EO BP ‑ EVNFM                                   | vCPU per year             | 1,600         | ~98 per vCPU                              | Orchestration compute footprint               |

Values above are rounded from the BoQ and serve as indicative examples; the full BoQ contains many more line items following the same structure.

The pricing sheet also includes extensive hardware line items for HPE and Dell compute, storage disks, racks, PDUs, switches and optics, each with unit net prices. The per-site core BoQ includes two Extreme 8720 data switches (KDU 137 0111/1), two EAM-S 0201 access management switches (KDU 137 0099/1) and 15 to 16 Dell R7615 compute servers with AMD CPUs and CX6 NICs plus one R6615 server. The per-site IMS NFVi BoQ includes three HPE DL345 servers (9654P, 768 GB, CX6) with NVMe SSDs and 25 Gb SFP28 optics. These hardware items are dimensioned to support the CNIS and CEE clusters for core and IMS in both sites and the optional testbed.

### Optional scopes and pricing

The TCO and BoQ spell out optional scopes and their standalone economics:

- **SC ENM system:** Optional single‑server ENM with dedicated hardware, TBL software, Snowdrop and support. Five‑year TCO is about AED 4.0 million, dominated by initial hardware and project services and recurring support and TBL licences.
- **ICS testbed:** Optional full testbed core and IMS environment with its own hardware, TBL infra and application SW, project services, Snowdrop, support and third‑party hardware support. Five‑year TCO is about AED 12.9 million.
- **SIM writer and 10k SIMs:** Optional SIM writer plus 10k SIM cards priced at around AED 0.57 million one‑off.
- **Phase‑2 and Phase‑3 expansions:** Phase‑2 incremental software expansion is about AED 1.3 million per year. Phase‑3 incremental software expansion is about AED 1.6 million per year. Infra expansions for Phase‑2 and Phase‑3 are about AED 1.17 million and AED 1.21 million respectively and include additional core hardware and implementation services.

Average profitability of the optional scopes is not specified in source.

### Commercial levers and negotiation status

The negotiation levers visible in the material include:

- **Special break‑in incentive** for the first ICS deployment, reducing the five‑year TCO by about AED 8.1 million under award‑timing and payment‑term conditions.
- **Term‑based licensing and TCO framing** instead of perpetual licences and simple capex. Ericsson consistently argues for TBL and subscription as the licensing backbone and uses the five‑year TCO view to position the offer.
- **Separation of mandatory and optional scopes** to protect margins on the core while making high‑value options visible: SC ENM, ICS testbed, SIM writer and resident engineer are all priced separately and can be traded in or out.
- **Scope boundaries and exclusions** for LI, analytics, NMS FCAPS and certain security functions, with explicit Non‑Compliant or Not Applicable flags in the SOC for capabilities outside ICS/IMS product scope. This keeps risk contained but may invite commercial pressure on price or additional services.

Where the SOC and clarifications show Non‑Compliant or Partially Compliant positions (for example on perpetual licences, long price validity, certain LI and SA requirements and some cyber‑security controls), the negotiation is clearly still open. The materials do not contain a final reconciled contract version.

## Contract and BCTC positions in play

The Business‑Critical Terms and Conditions (BCTCs) in this deal revolve around licensing model, warranty, LI and security obligations, price validity, termination rights, performance bonds, RMA and support SLAs, and the relationship to an existing principal contract.

### Relationship to principal contract

The Offer Letter explicitly ties the offer terms to an existing principal agreement (referred to as a contract with numbered addenda). It states that offer terms and conditions are as per that contract and this offer letter, and that other T&amp;Cs will be included during negotiation. The offer is declared preliminary and non‑binding, with legal commitment only once a definitive written agreement is signed.

The SOC and SoW repeatedly reference the principal agreement and specific addenda for warranty, support and SLAs, indicating that many BCTCs will be carried over rather than re‑negotiated from scratch.

### Licensing and usage rights

Key BCTC‑level positions:

- The operator requests unlimited, perpetual licences and lifetime usage rights for software without renewal fees. Ericsson declares these Non‑Compliant and positions term‑based licences as the only model, with technology‑agnostic but metric‑based licences across 4G and 5G.
- The operator requests that all basic, optional and enhanced features in future releases be made available at no additional cost. Ericsson responds that software subscription and LCM services will provide access to enhancements within contracted value packs, implicitly limiting scope to the licensed feature sets and lifecycle support window.
- License interchangeability across 4G and 5G is requested. Ericsson confirms this based on its combined licence model for dual‑mode core and converged UDM/UDR.

The materials do not specify any explicit licence audit terms or overage mechanisms beyond capacity dimensioning and BoQ quantities.

### Warranty, support and SLA

The operator demands five‑year warranty and support including software upgrades free of charge. Ericsson’s position is:

- Warranty and support will follow the principal agreement and specific support addenda.
- Software subscription, support and LCM are explicitly monetised as part of the five‑year TCO. Free five‑year warranty including upgrades is marked Non‑Compliant.

The SOC references technical support aligned with agreed SLAs, including RMA, software update handling and joint troubleshooting, but detailed SLA parameters such as restoration times are handled under the existing support contract and not restated in the RFP material.

### Termination, performance bond and liability

The Offer Letter states that termination for convenience is not applicable for this scope and that a performance bond is not applicable. This is a firm deviation from many operators’ standard BCTCs and would need explicit acceptance in the final agreement.

Liability, indemnity and other legal clauses are not detailed in the available material and instead are referenced back to the principal contract or left for later negotiation. Average profitability, liability caps and detailed penalty regimes are not specified in source.

### Price validity and indexation

The operator requires a 36‑month validity for all prices and discounts. Ericsson marks this Non‑Compliant for hardware and highlights hardware price volatility. Third‑party hardware prices are offered with a validity of two weeks. Indexation or inflation adjustments for software and services are not described in the material, so indexation is not specified in source.

### Lawful interception and security BCTCs

The LI and security SOC is one of the most BCTC‑sensitive sections. The operator requires:

- LI compliance with the latest ETSI and 3GPP standards, including support for multiple identifiers (MSISDN, IMSI, SIP URI, TEL URI, IP, MAC, domain) and all service types (voice, video, messaging, conferencing, push‑to‑talk and file or location sharing).
- LI hosting in the SA cloud, with unlimited and perpetual LI licences, buffering, dual connectivity to multiple LI destinations and strict SA policies.
- Comprehensive cyber‑security controls including SIEM, PAM, IAM, NAC, MFA, SOAR, NDR, EDR, vulnerability management, posture and compliance management, PKI and HSM support, data at rest encryption and SUCI‑based SUPI concealment.

Ericsson’s positions include:

- Full LI support for in‑scope network functions in line with 3GPP and ETSI LI standards, but external LI mediation, SA cloud hosting, buffering, dual connectivity and some LI behaviours are left to the operator’s LI platform and are not included in scope. Several clauses referencing SA cloud specifics and SA internal processes are Non‑Compliant or Partially Compliant.
- Data in transit is secured with TLS and IPsec consistent with 3GPP security specifications. Data at rest security follows Ericsson’s security hardening guidelines and CNIS capabilities, but full posture and compliance management, EDR agents and some PKI/HSM usage are declared outside the offered scope or require customer‑provided components.

These LI and security conditions remain open and would be BCTC‑critical in final contract negotiations.

### Other key terms

Other notable BCTC‑related positions include:

- No termination for convenience, no performance bond and strong relief clauses around export licence, force majeure and trade control approvals.
- Hardware delivery terms remain open. The operator requested CIP or site-delivered hardware with all freight and customs managed by Ericsson, while Ericsson offered DAP at port under Incoterms 2020, with the operator bearing local customs, import duties, logistics and warehousing. This sits as partial compliance and is a live negotiation point with freight, customs and risk implications.
- Explicit prerequisites and exclusions for scope, including that integration to MCX platforms, CAS, mediation, charging specifics, LI server platforms, analytics and TETRA are not included and would require separate scope and contracts.

Where information on specific contractual parameters is missing, such as detailed SLAs, indexation formulas or liability caps, it is not specified in source.

## What this teaches for future deals

The material for this ongoing deal offers a rich reference for future Integrated Core Solution and Mission Critical Networks pursuits with large operators in the region.

### Scope and solution patterns

- A converged 4G/5G NSA and SA core plus Compact IMS on cloud‑native infrastructure is a strong and repeatable pattern. The ICS 1.2 on CNIS and Compact IMS on CEE over CNIS combination is presented as an integrated stack covering packet core, IMS, subscriber data layer, orchestration and OAM.
- Mission‑critical and private network requirements such as geo‑redundancy with UE IP session continuity, multiple phases of capacity growth, and integration with both public and private RAN are central and should be built into reference designs for similar opportunities.
- Dimensioning tied to explicit subscriber and throughput phases (10k, 50k, 100k users with 10, 50, 100 Gbps) provides a clear template for sizing CNIS, PCG, PCC, CCDM, CCSM, CCPC, SC and IMS and for phasing expansions.
- A small Compact IMS flavour tightly linked to the ICS core is attractive for closed private networks and can be used as a reference for other enterprise and mission‑critical deals where full IMS scale is not initially needed.

### Commercial benchmarks and structures

- A five‑year TCO framing with explicit Phase‑1 core, optional testbed and optional SC ENM gives a repeatable structure for future offers. The Phase‑1 main TCO of around AED 27.7 million covers dual‑site core, IMS, infrastructure, services and five years of support and LCM; options add incremental TCO of the order of millions for NMS and testbed.
- Term‑based licences keyed to kActive User, kSAU, 1k IP sessions, Gbps and MPS with separate infra and application licence components provide a granular model that can be reused in future private core deals. The pricing sheet offers concrete recurring unit price ranges for these metrics and supports per‑phase incremental SW TCO of roughly AED 1.3–1.6 million per year for 40k–50k subscriber expansions.
- Structuring optional scopes like SC ENM, ICS testbed, SIM writer and resident engineer as discrete options keeps the core offer clean while providing commercial levers and clear upsell paths. The TCO tables show that testbed and NMS options can contribute significant additional revenue and support better lifecycle posture on upgrades and testing.
- A one‑time break‑in incentive for the first system with explicit award‑timing conditions is a concrete pattern for entering new private core footprints where the operator is seeking to balance risk and price.

### Customer behaviour and negotiation themes

- Regional tier‑one operators may anchor new private core deals under existing principal contracts and require strong alignment with their security, SA and cyber‑security frameworks. Early mapping of Ericsson product security baselines, LI behaviour and cyber‑controls to operator forms is critical.
- Expect strong pressure for perpetual licences, lifetime usage rights, five‑year free warranty and long price validity, but the documents show that operators can accept term‑based licensing, paid support and shorter price validity where the vendor provides clear justification and a convincing TCO narrative.
- Operators will often require detailed SOCs covering LI, SA, LBS, CRM, OSS, SIEM, PAM, NAC, EDR, vulnerability management and other controls. Drawing clear boundaries between what ICS and IMS can provide natively and what belongs to external SA, LI and security platforms, while remaining compliant with 3GPP and ETSI, is essential.
- Many prerequisites and exclusions in the SoW place responsibility on the operator for providing RAN readiness, DC gateways, GI‑LAN functions, CAS, charging mediation, terminals and SIMs, test tools and data. Repeating this clarity early helps avoid scope creep and protects margins.

### Negotiation moves for future ICS and MCN pursuits

- Use the ICS plus Compact IMS on CNIS reference architecture, including node pool separation and Ceph hyperconverged storage, as a baseline for other mission‑critical and private networks. The detailed solution description in this deal offers reusable diagrams, component lists and BoQs for similar sizes and higher.
- Anchor pricing discussions around tangible metrics already used here: kActive Users, kSAU, kIP Sessions, Gbps and MPS, and keep the BoQ structure of base packages and expansions as a template for future quotes.
- When facing demands for perpetual licences, lifetime warranty and long price validity, reuse the term‑based, subscription and TCO logic and highlight the volatility of third‑party hardware pricing as shown in this deal’s responses.
- For LI and security, reuse the structured SOC responses that distinguish Ericsson 5GC and IMS capabilities from SA cloud and LI mediation responsibilities and that reference 3GPP and ETSI standards explicitly.
- Emphasise optional testbed and SC ENM scopes early in similar pursuits, using the concrete pricing and scope here as a basis for shaping operator expectations and for justifying investments in dedicated test and management environments.

Where tactical moves such as indexation formulas, hedging for FX risk, or detailed penalty regimes are needed, they are not specified in source and would require additional design in future deals.

---

*Internal source documents and links removed for anonymisation.*
