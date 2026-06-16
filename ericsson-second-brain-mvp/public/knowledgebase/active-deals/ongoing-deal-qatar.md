> **DRAFT — anonymised ongoing-deal reference generated from internal Ericsson material. Customer not named. Ongoing deal, no final outcome. Review before external use.**

# Active Deal Reference — Airport critical-infrastructure, Qatar

**Deal summary**

- **Status and stage:** Ongoing. Ericsson has submitted a Rev C technical solution proposal in February 2026 and is in active clarification on technical, security and contractual terms as of March 2026. The internal opportunity code and formal pipeline stage name are not specified in source.
- **Segment:** Integrated Core Solution for a private 4G/5G network and mission critical communications. Scope covers private packet core, eMBMS broadcast core, optional compact IMS, optional messaging, IP networking, automation, cloud infrastructure and mission critical PTT with radio-over-IP integration.
- **Region:** Qatar. The private network serves two major international airports operated by a Qatari aviation group, with a local mobile operator acting as prime contractor and Ericsson as core solution vendor.
- **Approximate value:** not specified in source. The BoQ and technical documents provide quantities, capacities and TCO period but no monetary figures or margins.
- **Competitive context:** The deal is structured as a private-network project where the local operator is prime to the airport operator, and Ericsson provides the integrated core and mission critical solution. The documentation reviewed does not specify competing vendors, their offers or incumbency beyond the operator's existing RAN, ENM and ENIQ assets.

**Scope and solution**

**Business requirement and high level scope**

The end customer is a Qatari airport operator that has requested the prime operator to develop a private 4G/5G network to support current and future airport operations at two airports in the country. The private network must cover all indoor buildings and outdoor areas at both airports, using the existing 4G/5G RAN and IBS infrastructure of the operator and deploying a dedicated private core and related systems on airport premises.

The RFP defines a ten year TCO horizon from 2026 to 2035 and requires a dedicated private 4G/5G platform that is robust, highly scalable, geo redundant and capable of 99.99% availability. The private network shall be logically isolated from the operator's commercial network while reusing its RAN, spectrum and existing network management systems where feasible.

The main service requirements across the ten year horizon are:

- Up to 20 000 provisioned users.
- Up to 20 000 simultaneous active users.
- 5 000 native voice dialer users on VoLTE or equivalent.
- Total forecast SIM base growing from about 11 000 in year 1 to about 20 000 in year 10 across three service categories.
- At least 40 Gbps active throughput on the core network.
- Up to 6 000 concurrent SIM users split into roughly 3 000 mission critical PTT users, 2 000 native voice users and 1 000 IoT users.

The RFP defines three main service streams: mission critical communications with native dialing, native voice callers without MCX and private APN services for handhelds, IoT, M2M and autonomous vehicles. The airports intend to use the private network for voice, video, data and IoT use cases including body worn cameras, perimeter surveillance, fixed and mobile cameras, push to talk and push to video, IoT sensors and autonomous vehicle connectivity.

**Solution architecture domains**

The proposed solution is Ericsson Integrated Core Solution deployed as a private 4G/5G core and mission critical communications stack on an on premises cloud infrastructure at the airport sites. The core domains and main components are:

| **Domain**                    | **Main components in solution**                                                                                                                                                    | **Key role in scope**                                                                                                                                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Private 4G/5G Core            | Dual mode 5G core on CNIS including PCC, PCG, CCDM, CCSM, CCRC, CCPC, SC and vHSS.                                                                                                 | Provides combined EPC and 5GC control and user plane, subscriber management, policy, NRF and signaling for the private PLMN. Dual mode architecture supports 4G and 5G access on a single cloud native core.                                          |
| eMBMS / Broadcast Core        | MC BDC (Broadcast Core) with MDF CP, MDF UP, MDF MH and associated MBMS GW / MME functions.                                                                                        | Provides LTE broadcast for MCPTT and MC video using MBMS bearers, supports large group communications and use of broadcast downlink for mission critical services.                                                                                    |
| Private IMS Core (optional)   | Compact IMS solution including CSCF, MTAS, vSBC, vBGF, IPWorks ENUM and DNS, vMRF and HSS for IMS.                                                                                 | Provides VoLTE, ViLTE and 5G voice services for up to 5 000 active private network voice users in the closed private network. No interconnect, roaming or SRVCC features are in scope.                                                                |
| Messaging (optional)          | Sinch SMSC and IP-SM-GW for SMSoIP with 100 TPS capacity per production site.                                                                                                      | Provides SMS over IP services for 4G/5G subscribers as required by RFP, with geo redundant capacity.                                                                                                                                                  |
| Mission Critical PTT and RoIP | Third party MC PTT AS (Streamwide) and Prescom TACTICOM RoIP gateway solution integrated to core and TETRA network.                                                                | Delivers mission critical push to talk, push to video and data services and interworking between LTE based MCX clients and existing TETRA or similar radio networks through RoIP gateways.                                                            |
| IP Networking and DC gateway  | Router 6274 based DC gateway pair at each site with multiple 100G and 25G ports, VRFs and VLAN based separation.                                                                   | Provides routing, VPN and segregation between management, control and user planes and connects the private core to the operator and airport networks.                                                                                                 |
| Cloud infrastructure          | CNIS Compact Cloud on SDI with CCD Kubernetes cluster, EVNFM, Ceph based hosted storage and DC edge, deployed across two geo redundant sites with multiple node pools and servers. | Hosts all core and IMS CNFs and VNFs, provides lifecycle management, storage, network fabrics and high availability for the private core solution.                                                                                                    |
| Operations and automation     | ENM and ENIQ-S reused and expanded at operator level; CNOM, GitLab, EVNFM and AAT as part of core automation and monitoring; customer access to monitoring via operator's NMS.     | Delivers FCAPS and PM across private core, IMS, MBMS and supporting CNFs, and enables automated deployment, upgrades and acceptance testing. ENM and ENIQ-S already manage the operator's RAN and transport and will be extended to the private core. |

The architecture is fully cloud native, with all network functions deployed as CNFs on a CNIS vPOD and exposed through service based interfaces as per 3GPP specifications. Two sites are deployed in geo redundancy and the documentation depicts one site while noting dual site design for resilience.

**Capacity and dimensioning**

The main dimensioning inputs and outputs captured in the solution proposal and technical requirements include:

- Ten year SIM capacity forecast with total SIMs rising from about 11.2k in year 1 to about 20.4k in year 10 across service 1, service 2 and service X.
- 20 000 provisioned users and 20 000 simultaneous active users as baseline requirement.
- 5 000 native voice dialer calling users for VoLTE and 5G voice.
- At least 40 Gbps throughput on the core.
- 6 000 concurrent SIM users split into mission critical PTT, native voice and IoT.
- Requirement for latency not exceeding 20 ms from device to local mobile gateway or headend and no packet loss between device and headend as performance objectives.

The solution uses license based dimensioning for core products. Key license metrics seen in the internal BoQ include:

- PCC EPC and 5GC base packages dimensioned in thousands of IP sessions and thousands of subscribers.
- PCG base packages dimensioned in Gbps with separate entries for EPC and 5GC data rates.
- CCDM, CCSM, CCPC and CCRC license features dimensioned in numbers of active users, subscriber profiles, policy sessions and NRF base packages.
- MBMS broadcast core dimensioned in numbers of PTT subscribers, broadcast streams and MCEs.
- ENM and ENIQ data stores dimensioned in kIP sessions, Packet Core Gbps and numbers of core nodes for assurance.

The BoQ indicates that the license quantities for many of these objects are sized to match the ten year traffic forecast and to support geo redundancy, for example by including specific quantities for geographical redundancy features for both PCC and PCG and by specifying dual site CCD and SDI packages.

**Phasing and TCO structure**

The pricing sheet and internal BoQ structure the solution as a ten year programme from 2026 to 2035 with phased investments:

- Year 1 (2026) contains main capex for application software, MBMS, ENM and ENIQ expansions, cloud infrastructure hardware across two sites, data center gateways, third party Prescom hardware, professional services, training and first year support.
- Subsequent years include additional core software expansions for PCC and PCG capacity, EVNFM and related orchestration, and annual lifecycle management professional services.
- Each year from 2 onwards includes customer support line items for operator network support, third party mission critical application support and MBMS network support.
- Later years include hardware modernization of cloud infrastructure switches and related components and additional spare parts for core routers and switches.

The BoQ enumerates separate line items for year 1 and subsequent years for major product families and clearly distinguishes between application software, ENM and ENIQ expansions, cloud infrastructure hardware, DC gateways, professional services, support and spares, but the monetary values of those items are not present in the material reviewed.

**Customer behaviour and stakeholders**

**Stakeholder map**

The deal involves a chain of stakeholders with distinct roles:

- A Qatari airport operator and aviation group acts as end customer. It issues the master services agreement and RFP requirements for design, deployment and long term maintenance of the private network at the two airports.
- A Qatari mobile operator acts as prime contractor and contracting party under the master services agreement. It owns the existing RAN, ENM, ENIQ-S and transport infrastructure and is responsible for spectrum, RAN and regulatory approvals.
- Ericsson is a subcontractor to the operator. All Ericsson contractual obligations flow through the operator under their pre existing MSA. Ericsson's engagement towards the airport operator is explicitly back to back through the operator's responsibilities.
- Third party vendors supply MC PTT application and Prescom RoIP equipment and software. They integrate with Ericsson's private core and are supported by Ericsson only where explicitly specified in the scope and BoQ.

The documents show that the airport operator is treated as "end customer" with the operator responsible for integrating the private core with existing RAN and for regulatory approvals and SIM card provisioning. Ericsson's role is limited to the private core, IMS, MBMS, messaging, cloud infrastructure and DC gateways including design, deployment, integration and operations support for those domains.

**Behaviour of the end customer**

The end customer's documentation reveals a risk averse and demanding procurement posture consistent with airport critical infrastructure:

- It insists on a proven and certified solution and explicitly rejects any solution that is not already released, certified and successfully deployed without deviations from the requested feature set.
- It demands a dedicated private network with 20 000 SIM capacity, 40 Gbps throughput and strict latency and packet loss requirements for mission critical applications.
- It requires ten year support for upgrades and obsolescence management and expects future upgrades to latest technology to be included in the contract, with backward compatibility to existing mobile devices.
- It treats the private network as part of a wider aviation group and expects the supplier's obligations to extend to other group members, allowing the group to bring claims and recover losses even when only one entity is party to a given order form.
- It requires strong security posture, referencing 5G security standards, 3GPP, ETSI, GSMA NESAS, NIST and local data protection law as applicable security and privacy frameworks for the solution.

The end customer's contractual stance includes requests for:

- High liquidated damages for schedule delay expressed as one percent per day of order form value capped at ten percent.
- Broad unlimited categories of liability including indemnity liabilities and data security breaches.
- Extensive indemnities from the supplier for breach, data security, confidentiality, privacy, and IP infringement.
- Broad rights to terminate for convenience on short notice without compensating the supplier beyond fees for services performed.
- Performance bank guarantees equal to ten percent of the total contract price valid until ninety days after termination or expiry of the order form.

The end customer also requests broad intellectual property rights including assignment of all IP in deliverables, extensive moral rights waivers and wide audit and inspection rights, as well as stringent information security annexes and detailed AI governance provisions.

**Behaviour of the prime operator**

The operator's behaviour in the documents is to pass most obligations from the airport operator onto Ericsson only where they are already covered or can be aligned to the existing Ericsson-operator MSA and to keep the contractual risk profile within that framework.

The operator positions itself as responsible for:

- RAN, IBS and backhaul, including indoor and outdoor coverage design, spectrum and transport network, and SIM card issuance and management.
- Obtaining regulatory approvals and licenses for spectrum and private network use.
- Integrating ENM and ENIQ-S with the private core and MCX systems and bridging monitoring and logging from Ericsson systems into its NMS and from there to the airport operator's monitoring tools and SOC.

The operator relies on Ericsson for technical compliance responses in core and MCX domains and feeds back exceptions where compliance is only partial or not compliant due to scope outside Ericsson's products or because requirements fall on operator functions such as SIM management, naming, RAN coverage maps, or NAC and datalake integration.

**Decision dynamics and optimisation drivers**

From the material, decision dynamics are characterised by:

- The airport operator focuses heavily on service continuity, security, compliance, and long term TCO, requiring geo redundancy, no single point of failure, tight SLAs, and strong contractual remedies for delay and defects.
- The operator focuses on being back to back with the airport operator where its MSA with Ericsson allows but seeks to keep Ericsson's liability, LD, IP and audit obligations within the bounds of their bilateral MSA.
- Ericsson focuses on constraining liability and LD, rejecting requirements that conflict with its MSA with the operator and insisting that many end customer requirements be fulfilled by the operator instead of Ericsson.
- Timing pressures appear through requirements such as go live within 180 days from contract confirmation and the presence of later revision rounds (R3, R5) in the folder structure, which suggest multiple iterations to align technical, commercial and contractual positions, though specific iteration outcomes are not detailed in the sources.

The sources do not explicitly state which stakeholder acts as "economic buyer" or the detailed internal decision governance at the operator or airport operator. Where those details are not described, they are not inferred here and treated as not specified in source.

**Commercial construct in play**

**Overall model and TCO**

The commercial construct is a ten year TCO based model combining initial capex with multi year software, infrastructure and support expansions. The BoQ structure shows:

- Initial year capex for application software, ENM and ENIQ expansions, cloud infrastructure hardware and software for two sites, data center gateways, MBMS components, third party Prescom hardware, professional services and training.
- Annual software expansions for PCC and PCG capacity (both EPC and 5GC), and additional licenses for CCDM, CCSM, CCPC, CCRC, SC, EVNFM and EDA2 to accommodate growth in IP sessions, subscribers and policies.
- Annual lifecycle management professional services and upgrade packages labelled generically as LCM cost and eMBMS upgrade.
- Annual customer support packages combining core software support, hardware support, MBMS network support and third party support for the mission critical AS and RoIP gateways.
- Spares packages for key hardware such as DC gateway routers, control switches and SFP optics.

The pricing construct distinguishes between "Application SW" entries that represent Ericsson core and supporting CNF/VNF products, "ENM/ENIQ SW" expansions, "Cloud Infra" hardware and software packages for CNIS and CCD, DC-GW routers and software, professional services, customer support, third party hardware and third party support, spares and training. No monetary prices, per unit prices or overall value are visible in the reviewed material.

**Price parameters, unit metrics and license quantities**

The BoQ uses a structured price object and license object approach to dimension software and some hardware. Examples of key items and metrics include:

| **Area**                          | **Example price / license objects and metrics**                                                                                                                                                                                                                 | **Example quantities (rounded as seen)**                                                                                                                                                                                                                                      | **Implied parameter**                                                                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Packet core control (PCC)         | PCCEPCBasePackageSmallkIPS, PCCEPCBasePackageSmallkSAU, 5GEPCSmall, PCC5GCBasePackagekIPSSmall, PCC5GCBasePackagekSAUSmall, GeographicalRedundancySmall.                                                                                                        | Many entries show around 15 units of small EPC base packages per metric and similar counts for 5G and redundancy in year 1, with additional units in later years. Exact totals across the ten year horizon are specified but not aggregated in a single figure in the source. | Capacity in thousands of IP sessions, thousands of subscribers and number of instances for EPC and 5GC, plus dedicated redundancy packages. |
| Packet core gateway (PCG)         | PCG EPC Base Package Gbps, PCG 5GC Base Package Gbps, PCG Base Package Instance, Geographical Redundancy.                                                                                                                                                       | Initial year shows about 5 units of EPC Gbps licenses and 5 units of 5GC Gbps licenses and 2 instances plus 10 units of redundancy, with further increments in later years.                                                                                                   | Throughput capacity in Gbps per plane and number of PCG instances with geo redundancy.                                                      |
| Subscriber and policy data (CCDM) | CCDM UDR small profiles for UDM, EPC and policy, provisioning network cost, provisioning for UDM and policy.                                                                                                                                                    | Several blocks of twenty units per profile type, indicating tens of thousands of users and policies across 4G and 5G domains.                                                                                                                                                 | Numbers of subscriber and policy datasets and provisioning transactions across domains.                                                     |
| Subscription management (CCSM)    | CCSM AUSF, UDM, ARPF, HSS EPC and 5G and EIR small base packages.                                                                                                                                                                                               | Quantities around 20 units for each base package in year 1, indicating a symmetrical design across authentication and equipment check features.                                                                                                                               | Number of subscription and authentication profiles across access and service domains.                                                       |
| Policy (CCPC)                     | CCPC SM Policies base, SM Policies voice, SM Policies data.                                                                                                                                                                                                     | Typical initial values around 100 units each across base, voice and data, representing policy session capacity aligned with number of IP sessions and services.                                                                                                               | Number of active policy sessions for base, voice and data per kIP sessions.                                                                 |
| NRF and slice (CCRC)              | CCRC NRF base package.                                                                                                                                                                                                                                          | Around 50 units in the first year, representing NRF registration capacity.                                                                                                                                                                                                    | Registration and discovery capacity for network functions.                                                                                  |
| Signaling controller (SC)         | SC Base Package Instance, binding function, diameter base function, diameter session correlation.                                                                                                                                                               | Instances and feature quantities in the range of 2 and about 1 200 units for binding and diameter functions, matching large signaling load tolerance.                                                                                                                         | Number of SC instances and throughput capacity in messages per second.                                                                      |
| ENM / ENIQ                        | BP R6000, BP SBI, BP other core, BP PC controller IP session and SAU, BP PC GW Gbps and instances, CCDM and CCSM active user metrics, signaling control MPS, EDA2 subscribers, and various Network Assurance Data Store metrics per core product and transport. | Values such as 118 kIP sessions, 100 kSAU, 40 Gbps, 25k active CCDM users, and similar numbers in ENIQ data store metrics indicate alignment between ENM, ENIQ and core license sizing.                                                                                       | Telemetry volumes per product and dimensioned data store capacity for assurance.                                                            |
| MBMS                              | PTT subscribers, MC broadcast streams, MC broadcast core main, geo redundant core, number of MCEs.                                                                                                                                                              | Example quantities show around 8 PTT subscriber blocks, 125 broadcast streams and 2 MCEs per site, plus one core main and one geo redundant core.                                                                                                                             | Group size, number of broadcast streams and resiliency of MBMS broadcast core.                                                              |
| Cloud infrastructure              | CCD base packages and Ceph integrated storage units, SDI networking and equipment management base packages, Ubuntu Pro subscriptions, CNIS configuration for both sites.                                                                                        | The initial year shows CCD and Ceph licenses sized in the thousands for both sites and SDI management units around two and thirteen respectively per site, which align with the number of servers and switches in the design diagrams.                                        | Node counts and storage volumes for CNIS worker, control and storage nodes per site.                                                        |

These metrics define the commercial levers that can be adjusted across the TCO: increasing kIP sessions or kSAU packages, adding Gbps for PCG, scaling MBMS streams and subscribers, and adjusting ENM/ENIQ data store capacities as traffic grows. The material does not provide unit prices or cost data for these licenses, so unitary price and profitability cannot be quantified from the sources.

**Framework, indexation, payment terms and profitability**

The reviewed documents refer to fees, liquidated damages, service credits and taxes but do not specify per line item prices, indexation formulas, detailed payment schedules, or explicit profitability targets for Ericsson or the operator. Where the RFP contract text defines liquidated damages and references order form value, those are expressed as percentages of the order form value rather than monetary amounts.

Specific observations:

- Fee structure: The contract template refers to fees being payable under order forms and to fees being inclusive of taxes in the MSA, while Ericsson indicates that its prices and invoices are exclusive of indirect taxes and that its invoicing must follow the existing MSA with the operator.
- Indexation: No explicit CPI or similar indexation mechanism is described in the reviewed material. Any price evolution across years appears embedded in license counts and separate year labels and not in an explicit indexation clause.
- Payment terms: The documents include conceptual statements about correct and valid tax invoices and the operator's obligation to pay fees within certain periods but do not provide detailed payment term tables specific to this offer.
- Cost and profitability: Neither Ericsson's internal cost base nor expected margins are detailed. There is no explicit profitability analysis or average profitability calculation in the material reviewed. Where average profitability is requested, it is therefore not specified in source.

Overall, the commercial model is rich in quantity based license parameters and multi year service and support lines but monetary price, cost and profitability data are not present in the provided material and are treated as not specified in source.

**Contract and BCTC positions in play**

The bid review spreadsheet documents a detailed term by term comparison between the airport operator's master services agreement and Ericsson's positions, often expressed as "back to back" with the operator or "non compliant". Key Business Critical Terms and positions include:

**Structure, order forms and dependencies**

- Order forms: The master agreement treats order forms as the vehicle for specific projects, with an order of precedence where special conditions override other modules. Ericsson notes that the airport operator's MSA does not apply directly to the Ericsson-operator contract and that all such obligations must be implemented through the operator's MSA and order forms.
- Group obligations: The airport operator wants to treat the aviation group as a whole, allowing any group member to receive services and to bring claims for losses. Ericsson's position is that group wide obligations towards the airport operator are to be handled by the operator and that Ericsson's direct obligations are limited to the operator under their MSA.
- Dependencies: The MSA defines "dependencies" held by the airport operator and states that the supplier's only remedy for failure of dependencies is schedule relief. Ericsson requests explicit treatment of these as relief events in its contract with the operator, including waiver of performance penalties, extensions of due dates and reimbursement of reasonable additional costs resulting from unfulfilled dependencies.

**Delays, LDs and service credits**

- Schedule obligations: The MSA provides for extensions of due dates when delays are caused by the airport operator, and for liquidated damages when delays are attributable to the supplier. Ericsson agrees in principle to time extensions but rejects the formulation that this is the sole and exclusive remedy for dependency failures and refuses to accept the airport operator's LD regime directly.
- Liquidated damages: The MSA sets LDs at one percent of order form value per day of delay, capped at ten percent. Ericsson refers instead to the existing MSA with the operator, which has its own weekly LD percentage and cap and requests that this govern any LD obligations.
- Service credits: The MSA treats service credits as non exclusive remedies for SLA failures. Ericsson insists that service credits remain part of the overall liability regime and that service credits under its contract with the operator should constitute the sole and exclusive remedy for SLA breaches, with any further material breach remedies treated separately and governed by the Ericsson-operator MSA.

**Liability, indemnity and insurance**

- Unlimited liability categories: The MSA specifies unlimited liability categories including indemnity obligations, data security, wilful misconduct and others. Ericsson requests that indemnities be subject to overall liability caps as agreed in the existing MSA with the operator, and that liability limits and caps in that MSA should apply instead of the airport operator's proposed unlimited categories.
- Exclusions and recoverable losses: The MSA identifies certain categories of loss as recoverable, including cost of restoring data and workarounds. Ericsson accepts restoration of data only where loss is directly due to its breach and insists that the customer maintain appropriate backup procedures, again aligning to its MSA with the operator.
- Indemnities: The airport operator seeks one sided indemnities for breaches of confidentiality, privacy and data security. Ericsson requests mutual indemnities subject to liability caps rather than one sided, uncapped obligations.
- Insurance: The MSA prescribes insurance levels. Ericsson proposes to replicate the insurance clause already agreed in the existing MSA with the operator rather than adopting new airport operator specific requirements.

**IP, delivery artefacts and moral rights**

- IP ownership: The airport operator seeks assignment of all intellectual property in deliverables and ownership of physical media, with only pre existing supplier IP excluded. Ericsson rejects assignment of IP in its deliverables because they incorporate Ericsson proprietary software, tools and methods and instead offers licence rights to use the deliverables for the project.
- Moral rights waivers: The MSA requires the supplier to procure written moral rights waivers from all authors of deliverables. Ericsson flags that it cannot guarantee such waivers from all contributors, especially subcontractors and third parties, and relies instead on its IP indemnities to protect the customer.
- Deliverable ownership and return: The MSA sets obligations at termination to return or delete data and refund fees for undelivered services. Ericsson seeks reciprocity, requiring that both parties return or delete each other's data and aligning all such obligations with its existing MSA.

**Security, audit and BCDR**

- Security standards: The airport operator references 3GPP, ETSI, GSMA, NIST and local privacy law and seeks explicit compliance with these and with PCI DSS and local data protection law. Ericsson explains that its Security Reliability Model, ISO/IEC 27001:2022 certification and GSMA NESAS alignment underpin its security posture but that PCI DSS is not applicable because Ericsson does not process payment card data.
- Audit: The MSA gives broad audit rights including cost recovery if overcharging or serious breach is found. Ericsson agrees to audits related to disaster recovery and information security as already covered in its MSA with the operator but declines additional audit obligations and cost shifting clauses not aligned with that MSA.
- Business continuity: The MSA allows the airport operator to terminate if the business continuity plan is not implemented or is unsuccessful after seven days of material disruption. Ericsson refers back to the business continuity and disaster recovery provisions in its MSA with the operator and aligns its position through that channel.
- BCDR obligations: The solution design includes geo redundant core sites, redundant DC gateways, cloud infrastructure redundancy and strong automation to support restoration but the specific commitments in terms of RTO or RPO beyond the 99.99% availability requirement are not detailed in the sources.

**Bank guarantees, termination and step in**

- Performance bank guarantee: The airport operator demands a performance bank guarantee for ten percent of total contract price, issued by a local bank and valid until ninety days after expiry or termination. Ericsson notes that under its MSA with the operator no performance bond is required by default and if agreed as an exception, it must be ten percent of the purchase order value and valid until ninety days after provisional acceptance, with format mutually agreed.
- Termination for convenience: The MSA gives the airport operator a broad right to terminate for convenience with only a payment for services already provided and refund of prepaid fees for undelivered services. Ericsson rejects this construct and points to the need for a termination exit fee consistent with footprint protection provisions to be agreed under BAFO with the operator.
- Step in and disengagement: The MSA includes detailed disengagement obligations for deliverables and knowledge transfer at termination. Ericsson seeks to ensure that the remedies listed under these clauses are treated as sole and exclusive remedies and that conditions are aligned with its MSA rather than introducing additional obligations.

**Assignment, publicity and AI clauses**

- Assignment: The MSA allows the airport operator to assign freely to group members while restricting the supplier. Ericsson insists on mutual assignment clauses that match its MSA with the operator, including consent not unreasonably withheld and continued responsibility of the assigning party for assignee actions.
- Publicity: Publicity provisions are accepted in principle where consistent with existing agreements. The detailed publicity obligations beyond that are not elaborated in the reviewed extract.
- AI: The MSA includes extensive AI clauses governing use of AI, data collection and algorithm transparency. Ericsson agrees to provide AI capabilities that are part of its standard roadmap for products and service delivery but declines to share proprietary algorithms or hyperparameters and rejects clauses that would restrict its use of AI generated insights to improve services across customers.

Overall, Ericsson's contract strategy is to remain back to back with the operator's MSA and to reject clauses that either impose obligations directly towards the airport operator or that expand liability, LD, audit, IP or bank guarantee exposure beyond what has been agreed bilaterally with the operator.

**What this teaches for future deals**

**Technical and scope patterns**

This ongoing deal provides a concrete reference for future Integrated Core Solution and mission critical private network pursuits in similar critical infrastructure contexts:

- Scope pattern: The solution combines private dual mode 4G/5G core, eMBMS broadcast core, optional compact IMS and messaging, mission critical PTT with RoIP, CNIS based cloud infrastructure, DC gateway routers and re use of existing ENM and ENIQ for operations. This pattern fits customers that want a closed private PLMN integrated with an operator's RAN and OSS.
- Capacity benchmarks: Requirements such as 20 000 SIMs, 6 000 concurrent mission critical and voice users, 40 Gbps throughput, and 99.99% availability for airport operations provide practical dimensioning benchmarks for similar mission critical campus deployments.
- Integration footprint: Integration points to operator ENM and ENIQ, MC PTT AS, RoIP gateway, NTP, LDAP, Splunk and NAC, as well as logical separation using VRFs and VLANs in DC gateways, illustrate typical integration surfaces in private networks that must be budgeted in scope and services.
- Options for PLMN: The RFP's two options for dedicated PLMN with separate PLMN ID and Décor based steering on existing PLMN illustrate the need to model both architectural variants when dealing with operators that want to leverage existing public PLMNs for private customers.

**Commercial structure and pricing benchmarks**

Although monetary values are absent, the BoQ reveals useful commercial structuring patterns:

- Multi year license phasing: The license based dimensioning for PCC, PCG, CCDM, CCSM, CCPC, CCRC, SC and MBMS across base packages, Gbps, kIP sessions and kSAU shows how Integrated Core Solution deals can phase license purchases over ten years to match growth and to embed redundancy.
- ENM / ENIQ linkage: The explicit data store and KPI license quantities for ENM and ENIQ tied to core metrics illustrate how operations and assurance platforms should be sized consistently with core capacity and how their licenses should be explicitly included in the TCO.
- Support split: Separate lines for core support, MBMS network support, IT and cloud software support, third party support and hardware support for DC gateways and cloud infrastructure provide a template for structuring annual service fees with clear attribution across domains.
- Training and professional services: Explicit training packages on each major product family and labelled LCM professional services show how to position training and lifecycle work as distinct commercial work packages over the TCO period.

These structural insights can be used as a reference when building future ICS and mission critical proposals, even where local pricing and discount assumptions differ.

**Customer and prime behaviour patterns**

The material documents clear behavioural patterns that are likely to recur in similar deals:

- End customers in critical infrastructure may request aggressive contractual protections including high daily LDs, broad indemnities, extensive audit rights, long duration bank guarantees and full IP ownership of deliverables. Experience here shows that such requests need careful negotiation and alignment with existing MSAs rather than automatic acceptance.
- Prime operators are likely to push back towards subcontractors by requesting full back to back compliance with end customer MSA while also protecting their own MSA terms. This deal illustrates that Ericsson can and should systematically trace each clause to its MSA with the operator and identify where it cannot be made fully back to back.
- Technical requirement matrices such as the SOC Tech Requirements workbook show a high level of scrutiny on design, security, monitoring, reporting and integration. Future bids should assume similar detailed technical compliance matrices and prepare early cross functional responses that distinguish operator, end customer and Ericsson responsibilities.

**Negotiation moves and levers**

The bid review material illustrates several concrete negotiation moves that can inform future deals:

- Reframing sole remedies: Ericsson consistently seeks to avoid formulations where extensions of time or service credits are sole and exclusive remedies when dependencies are not met and instead frames failures of customer obligations as relief events that also give cost relief and liability protection.
- Liability and indemnity structuring: Ericsson resists uncapped indemnities and broad unlimited liability categories by tying indemnity obligations and liability limits directly to caps in an existing MSA and by requesting mutual indemnities rather than one sided ones.
- IP and moral rights: Rather than assigning IP in deliverables, Ericsson positions licences to use deliverables for project purposes and limits moral rights waivers to what is feasible while leveraging its IP indemnity regime.
- Performance security: Ericsson seeks to avoid new or extended bank guarantee obligations beyond what is already agreed and, where guarantees are unavoidable, argues for lower coverage, shorter validity and mutually agreed formats based on its MSA.
- Audit and AI clauses: Ericsson narrows audit rights to disaster recovery and information security already covered by its MSA and refines AI clauses to protect proprietary algorithms while still committing to use AI to improve services.

These patterns provide a concrete reference playbook for contract and BCTC negotiations in future Integrated Core Solution and mission critical private network deals, especially where a local operator is prime and critical infrastructure operators are end customers.

Where any aspect requested for this reference (for example approximate monetary value, detailed competitor behaviour or average profitability) is not documented in the source material, it is not included here and should be treated as **not specified in source**.