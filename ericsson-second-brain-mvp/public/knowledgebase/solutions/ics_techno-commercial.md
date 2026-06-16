Source document used:

- **Ericsson Integrated Core Solution**, Portfolio and Commerce article (internal reference).

> **DRAFT — solution technical and commercial brief generated from internal Ericsson sources, anonymised. Customer not named. Core solution for the Mission Critical Networks segment, no RAN. Review before external use.**

# Solution Brief — Integrated Core Solution

**1\. Solution overview**

Ericsson Integrated Core Solution is a cloud native core network solution that supports 4G, 5G NSA and 5G SA networks. It integrates Packet Core, User Data Management and Ericsson Cloud Native Infrastructure into a prescriptive solution. The solution focuses on streamlined deployment, operations and lifecycle management and faster time to service by using pre validated assets and a high degree of automation for deployment and lifecycle management. It optimizes total cost of ownership and enhances operational agility for modern telecom networks.

The article does not explicitly describe a Mission Critical Networks segment. It does not describe vertical segments such as public safety, defence, utilities, enterprise or private networks. These segmentations and use cases are not specified in source.

The business outcomes described in the article are streamlined deployment, more efficient operations, improved lifecycle management, faster time to service, optimized total cost of ownership and enhanced operational agility. The text does not quantify these benefits. It does not provide specific financial or operational metrics.

The article does not describe where Integrated Core Solution sits within the wider Ericsson portfolio. It does not list adjacent products or solutions. It does not map ICS to specific portfolio families such as Mission Critical Networks, Packet Core families or orchestration portfolios.

**2\. Scope and architecture**

The source defines the technical scope at a high level. Integrated Core Solution integrates three main domains: Packet Core, User Data Management and Ericsson Cloud Native Infrastructure. The prescriptive solution bundles these into a single offering. The article does not list individual network functions within Packet Core or User Data Management. It does not list specific products or VNFs or CNFs.

The article does not list signalling, policy and charging, security, exposure, dedicated or private core variants, management and orchestration components or other domains. It does not explicitly state which of these are in or out of scope. For these domains the scope is not specified in source.

A structured view of scope based on the article is as follows:

| **Domain**                                  | **Scope in ICS according to source**   |
| ------------------------------------------- | -------------------------------------- |
| Packet Core                                 | In scope. Part of integrated solution. |
| User Data Management                        | In scope. Part of integrated solution. |
| Cloud Native Infrastructure (Ericsson CNIS) | In scope. Part of integrated solution. |
| Signalling                                  | Not specified in source                |
| Subscriber data management beyond UDM       | Not specified in source                |
| Policy and charging                         | Not specified in source                |
| Security functions                          | Not specified in source                |
| Exposure and APIs                           | Not specified in source                |
| Dedicated or private core variants          | Not specified in source                |
| Management and orchestration                | Not specified in source                |
| Analytics and assurance                     | Not specified in source                |

The logical architecture in the article is implicit. It describes a cloud native solution that integrates the Packet Core and User Data Management domains on top of Ericsson Cloud Native Infrastructure. It characterises the solution as prescriptive and pre validated. However it does not show a reference architecture diagram. It does not list interfaces, reference points or protocols. The key interfaces between Packet Core, User Data Management, radio access networks, transport, OSS or BSS are not specified in source.

Deployment models are referenced implicitly through the cloud native description but not detailed. The article does not state whether ICS deploys on on premises infrastructure, private cloud, public cloud or hybrid models. It does not specify whether CNIS runs on dedicated hardware, COTS servers or third party clouds. These deployment model details are not specified in source.

Redundancy, high availability and geo redundancy are important for mission critical networks, but the article does not describe these characteristics. It does not state availability targets. It does not describe active active or active standby patterns. It does not discuss failure domains, site separation distances or disaster recovery models. These aspects are not specified in source.

The security architecture is not described. The article does not mention security functions, encryption, authentication, role based access control, logging, security analytics or compliance frameworks. It does not describe how ICS supports sovereignty, data localisation or mission critical security requirements. Security architecture is not specified in source.

Integration with a typical installed base is not described. The article does not state how ICS interworks with existing packet core nodes, subscriber databases, policy engines, OSS or BSS. It does not describe migration strategies from legacy cores to ICS. It does not specify support for multi vendor environments. These integration details are not specified in source.

**3\. Technical specification**

The article provides a high level technical description. It states that Integrated Core Solution is cloud native and supports 4G, 5G NSA and 5G SA networks. It integrates Packet Core, User Data Management and Ericsson Cloud Native Infrastructure as a prescriptive solution. It emphasises pre validated assets and a high degree of automation for deployment and lifecycle management.

The article does not provide individual product names, variants or software releases for the Packet Core or User Data Management components. It does not list specific Ericsson products or software versions. It does not describe release trains or life cycle milestones. For product names, variants and software releases the source is not specified.

The article does not provide a dimensioning or capacity model. It does not state subscriber numbers, concurrent sessions, user plane throughput or signalling loads. It does not describe dimensioning rules or utilisation targets. All dimensioning and capacity details are not specified in source.

The article does not provide performance or KPI figures. It does not state availability targets, latency expectations, security KPIs or quality of service metrics. It does not describe performance testing results or benchmarks. These performance aspects are not specified in source.

The article describes the solution as cloud native. Cloud native implies a scale out approach, but the article does not explicitly describe scaling behaviour. It does not state whether packet core and user data components scale horizontally by adding instances. It does not describe auto scaling policies or resource management. Scaling details are not specified in source.

The platform and footprint are only partly described. Ericsson Cloud Native Infrastructure is named as part of the integrated solution. The article does not describe the hardware platform, node types, storage, networking or data centre footprint. It does not state minimum or typical deployments. Platform details beyond the mention of CNIS are not specified in source.

Assumptions and dependencies are not detailed. The article does not list third party components. It does not specify customer provided infrastructure. It does not discuss data residency requirements, lifecycle policies or end of support plans. These assumptions and dependencies are not specified in source.

A dimensioning assumptions table can only reflect the absence of explicit data:

| **Aspect**                 | **Assumption or value** | **Source notes**                                  |
| -------------------------- | ----------------------- | ------------------------------------------------- |
| Registered subscribers     | Not specified in source | No subscriber figures or dimensioning rules given |
| Concurrent sessions        | Not specified in source |                                                   |
| User plane throughput      | Not specified in source |                                                   |
| Signalling rate            | Not specified in source |                                                   |
| CPU utilisation targets    | Not specified in source |                                                   |
| Memory utilisation targets | Not specified in source |                                                   |
| Storage capacity           | Not specified in source |                                                   |
| Number of sites            | Not specified in source |                                                   |
| Availability target        | Not specified in source |                                                   |
| Latency targets            | Not specified in source |                                                   |

**4\. Technical differentiators**

The technical differentiators that the article describes are specific but limited in number. It states that Ericsson Integrated Core Solution is a cloud native solution supporting 4G, 5G NSA and 5G SA networks. This provides multi generation core capability in a single solution.

The article states that ICS integrates Packet Core, User Data Management and Ericsson Cloud Native Infrastructure into a prescriptive solution. This integration and prescriptive design position ICS as more than a collection of independent products. The solution uses pre validated assets and a high degree of automation for deployment and lifecycle management. This creates a differentiator in deployment speed and operational efficiency.

The article states that the solution ensures streamlined deployment, operations and lifecycle management and faster time to service. These effects derive from pre validation and automation. The article also states that ICS optimizes total cost of ownership and enhances operational agility. This places emphasis on economic and operational outcomes, not only functional coverage.

The article does not describe specific technical features such as security mechanisms, mission critical functions, exposure APIs, analytics, AI for operations or lifecycle automation details. It does not provide explicit comparisons versus alternatives from Nokia, Huawei, ZTE or Samsung. It does not name competitor solutions. Therefore technical differentiators beyond cloud native multi generation support, integrated architecture, pre validation, automation, TCO optimisation and operational agility are not specified in source.

**5\. Commercial construct**

The article provides no commercial information. It does not describe the pricing model, license types or payment schedule. It does not state whether pricing is capacity based or license based, or whether it uses subscriptions or perpetual licenses. It does not describe software attach, hardware pricing, services or support.

There is no mention of multi year frameworks, rebates, incentives, indexation, currency protection or third party cost pass through. The article does not describe payment terms. It does not provide a total cost of ownership framework beyond the statement that ICS optimizes TCO.

The article does not describe commercial levers such as volume discounts, bundling, term discounts, outcome based elements, or risk reward mechanisms. It does not state how value sits beyond list price.

A commercial construct table must therefore record the absence of explicit data:

| **Construct element**               | **Source detail**                                   |
| ----------------------------------- | --------------------------------------------------- |
| Pricing model (capacity or license) | Not specified in source                             |
| Subscription versus perpetual       | Not specified in source                             |
| Software attach model               | Not specified in source                             |
| Hardware versus software split      | Not specified in source                             |
| Multi year framework structure      | Not specified in source                             |
| Rebates and incentives              | Not specified in source                             |
| Indexation                          | Not specified in source                             |
| 3PP cost pass through               | Not specified in source                             |
| Payment terms                       | Not specified in source                             |
| TCO framing                         | Solution claims to optimize TCO. No framework given |
| Commercial levers beyond list price | Not specified in source                             |

**6\. Value narrative and positioning**

The article supports a concise value narrative that we can state explicitly. For the technical buyer the value is a cloud native core that supports 4G, 5G NSA and 5G SA in one integrated solution. The integration of Packet Core, User Data Management and Ericsson Cloud Native Infrastructure into a prescriptive solution reduces integration overhead and simplifies delivery. Pre validated assets and a high degree of automation improve deployment efficiency and simplify operations and lifecycle management.

For the economic buyer the article states that ICS optimizes total cost of ownership and enhances operational agility. Faster time to service contributes to earlier revenue or cost savings, although the article does not quantify this. The TCO and agility positioning is explicit but the source does not provide financial models, payback calculations or case studies.

For boards, regulators and sovereign stakeholders the article does not provide specific content. It does not discuss sovereignty, data localisation, critical communications regulations or mission critical assurance. It does not describe resilience, lawful interception, emergency services handling or other regulatory topics. These elements of the value narrative are not specified in source.

The article does not mention competitors. It does not position ICS versus Nokia, Huawei, ZTE or Samsung. It does not describe differences in architecture, capabilities, delivery history, pricing, or ecosystem support. Therefore positioning against each named competitor is not specified in source.

**7\. Sales and win strategy**

The article provides no content on sales motions or win strategies. It does not describe stakeholder mapping or engagement sequences. It does not list recommended touchpoints for CTIO, CFO, regulator, security leads or operations management.

The article does not indicate when to use executive engagement or how to align with customer budget cycles and planning processes. It does not describe how to respond to procurement processes, RFPs, or negotiations. It does not discuss incumbency or installed base leverage.

Customer procurement behaviour and negotiation patterns are not described. The article does not outline typical objections or decision criteria. No guidance exists in the source on how to handle these behaviours for ICS deals.

Therefore the sales and win strategy content is not specified in source.

**8\. Pricing strategy**

The article does not include any pricing numbers or strategies. It does not recommend anchor points, pricing ranges or target discounts. It does not describe price ladders or discount governance. It does not define which elements to hold firm and which to flex.

The article does not describe non price levers such as scope adjustment, phasing, service levels or risk sharing. It does not discuss how to use these levers before moving list price.

Competitive pricing reads against Nokia, Huawei, ZTE or Samsung are not present. The article does not mention competitor price levels or typical discount practices.

All aspects of pricing strategy are not specified in source.

**9\. Risks and red lines**

The article does not describe delivery risks. It does not discuss risks related to third party components, cloud performance, data residency, lifecycle management, end of support, or integration. It does not identify mitigation actions.

The article does not describe commercial risks, such as scope creep, currency exposure, payment default, or performance penalties. It does not mention governance mechanisms, delegated authority constraints or approval processes.

The article does not define red lines for scope, service levels, liability, security guarantees, data location, or intellectual property. It does not state positions that Ericsson must not concede.

Therefore delivery risks, commercial risks, governance constraints and red lines for this solution are not specified in source.

**10\. Competitive counter**

The article does not discuss competitors. It does not name Nokia, Huawei, ZTE or Samsung. It does not mention their solutions, strengths or weaknesses. It does not provide guidance on how to counter competitor plays in core or mission critical deals.

Given this, a competitive counter table can only record the lack of explicit guidance:

| **Competitor** | **Likely play (as per source)** | **Ericsson counter (as per source)** |
| -------------- | ------------------------------- | ------------------------------------ |
| Nokia          | Not specified in source         | Not specified in source              |
| Huawei         | Not specified in source         | Not specified in source              |
| ZTE            | Not specified in source         | Not specified in source              |
| Samsung        | Not specified in source         | Not specified in source              |

The current ICS article in Portfolio & Commerce provides a concise value description around cloud native architecture, integration of Packet Core, User Data Management and Ericsson Cloud Native Infrastructure, pre validation, automation, TCO optimisation and operational agility. It does not contain the deeper technical, commercial, pricing or competitive detail requested in your template. If you can point me to additional internal ICS, Mission Critical Networks or pricing and sales play documents, I can extend this brief while staying fully grounded in Ericsson sources.