> **DRAFT — Integrated Core Solution product catalogue extract, distilled from the ICS Technical Solution Description and asset set (anonymised, generic). Customer not named. Component descriptions are real. Indicative pricing is set per opportunity from the Effort Estimates and price list. Review before external use.**

# Integrated Core Solution — Product Catalogue Extract

The ICS is a cloud-native dual-mode 4G/5G core deployed on the Ericsson CNIS platform. The catalogue below lists the network functions and supporting products that make up the solution.

## Dual-Mode 5G Core network functions

| Product | Function | Notes |
|---|---|---|
| PCC (Packet Core Controller) | Control plane: AMF, SMF, MME, SGW-C, PGW-C | Dual-mode 4G/5G NSA and SA control |
| PCG (Packet Core Gateway) | User plane: UPF, SGW-U, PGW-U | Throughput-dimensioned |
| CCDM (Cloud Core Data Storage Manager) | UDR and provisioning | Subscriber and policy data |
| CCSM (Cloud Core Subscription Manager) | UDM, AUSF, HSS-EPC, EIR | Subscription management |
| CCRC (Cloud Core Resource Controller) | NRF and resource control | |
| CCPC (Cloud Core Policy Controller) | PCF / PCRF | Policy for 4G and 5G |
| SC (Signaling Controller) | Diameter DRA/DEA/DA, BSF, SCP, SEPP | Signalling. Enables roaming and MCPTT options |
| vHSS (Home Subscriber Server, Front End) | IMS and EPC HSS | Optional integrated vHSS instead of cnHSS |
| ETDP (Ericsson Telco DataOps Platform) | Data operations platform | |

## Supporting functions

| Product | Function | Notes |
|---|---|---|
| EDA (Ericsson Dynamic Activation 2) | Convergent provisioning | |
| EVNFM | CNF and VNF lifecycle management | Mandatory |
| cNeLS | Cloud-native licensing server | Included |
| 5GC AS (5G Core Automation Solution) | Automation pipelines, CNOM, AAT test automation, CLCPs | Mandatory |

## CNIS cloud platform (mandatory, included)

| Product | Function | Notes |
|---|---|---|
| CCD (Cloud Container Distribution) | Kubernetes cluster | |
| Ceph hosted storage | Hyperconverged storage | |
| CEE (Cloud Execution Environment) | Hosting for vIMS and vHSS VNFs | |
| SDI3 compact cloud | Compact cloud fabric | Two-site geo-redundant |

## Private IMS (optional, for voice)

| Product | Function |
|---|---|
| CSCF, MTAS, SBG/BGF, MRF, IPWorks (ENUM, DNS) | VoLTE for the private network |

## Optional packages

| Package | Products |
|---|---|
| 4G Roaming | SC (DEA, DA) |
| 5G Roaming | SC (SEPP) |
| 4G MCPTT | SC (DRA), Rx integration to the MC application server |
| Network Slicing Enablement | NSSF |
| External Connectivity (HSS) | external HSS interworking |

## Licensing and pricing basis

- Network functions are licensed by capacity (SAU and throughput), with one-time and recurring components.
- Standard dimensioning reference: up to 1M SAU and roughly 120 Gbps per cluster, with scaling steps from 100K to 1M. Private mission-critical deployments are typically dimensioned far below this, in the tens of thousands of users.
- CNIS infrastructure is mandatory and included.
- Services are estimated from the Effort Estimates for the defined work packages.
- Indicative pricing is set per opportunity from the Effort Estimates and the current price list. Present in ranges for a budgetary quote, with the commercial construct (multi-year framework, software-attach, capacity tiers) rather than a flat list-price discount.
