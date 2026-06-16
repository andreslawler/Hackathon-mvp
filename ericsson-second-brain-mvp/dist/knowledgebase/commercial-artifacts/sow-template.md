> **DRAFT — Integrated Core Solution Statement of Work template, distilled from the Ericsson ICS SoW asset (anonymised, generic). Customer not named. Review before external use.**

# Integrated Core Solution — Statement of Work (Template)

Appendix 1 to the Agreement between Ericsson and the Customer, for the Project. This Statement of Work specifies the Integration Services, Software, and Project-Specific Documentation provided by Ericsson, and forms the sole and exclusive scope of the Services. Any activity not stated here is excluded from Ericsson's obligations.

## 1. Revision history

## 2. This Appendix
Scope statement. The SoW and its Annexes are an integral part of the Agreement. Terms not defined here take their meaning from the Agreement.

## 3. Annexes
- Work Package list
- Acceptance Test specification
- Responsibility matrix (RASCI) reference

## 4. Update and change control
Any change to requirements, scope, or detailed design after Analysis and Specification follows the Variations and Change Control provisions of the Agreement.

## 5. Assumptions
- 4G/5G dual-mode core, no exposure use case, dimensioned for up to 1M SAU.
- Cluster dimensioned for 1M and roughly 120 Gbps, with a 48-hour stability and support package.
- Scaling procedure provided in steps from 100K to 1M. Cluster scale-out and scale-in are not in scope.
- Fixed solution with a fixed network design, with limited flexibility (multiple VRF, standard rack layout).
- CNIS Cloud is mandatory and included. 5GCAS and EVNFM are mandatory.
- Testing automation (AAT) is applied by the local project. Deployment of cNeLS is included.
- Full geo-redundant 1+1 with UE IP session continuity is included for the Mission Critical Networks segment. It is optional for MBB/CSP.
- Upgrade is optional. Validation and LCM assets are not in this release.

## 6. Work Packages

### Standard package — ICS Application Deployment
CNIS deployment, 5GCAS, EVNFM, cNeLS, ICS application deployment, manual provisioning, basic policy, and geo-redundancy (Mission Critical Networks).

### Optional packages
4G Roaming, 5G Roaming, 4G MCPTT, Network Slicing Enablement, External Connectivity (HSS). Each is scoped and priced separately, with its own deployment proposal, proposed products, integration points, and use case.

## 7. Entry and exit criteria
Defined per work package.

## 8. Acceptance criteria
Per deliverable, without stability periods, excluding network performance KPIs except where explicitly agreed for defined services. Deemed acceptance applies when the deliverable is used or not rejected within the defined period.

## 9. Roles and responsibilities
Per the Responsibility Matrix (RASCI), split across Ericsson, Customer or Prime Integrator, and the 3PP CaaS supplier.
