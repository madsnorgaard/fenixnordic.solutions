---
title: Case workflows that run themselves
description: "AabenForms: an open source platform (Drupal 11 and Nuxt) for municipal self-service and case workflows. MitID, Digital Post, ESDH and a full case engine."
product: AabenForms
kicker: Self-service and case workflows for municipalities
lede: AabenForms is an open source platform (Drupal 11 and Nuxt) for municipal self-service and case handling. Workflows are built as configuration in a visual editor and execute automatically. The result is a readable artifact rather than bespoke code inside a vendor codebase.
facts: Eighteen municipal flows ready, six KOMBIT integrations, four ESDH systems. GPL, so the municipality owns it.
cta:
  heading: Ready for a POC with real integrations
  lede: The next step is a pilot municipality that provides certificates and one concrete case area. The platform is already there.
  primary:
    label: See the live demo
    href: https://aabenforms.dk
  secondary:
    label: Book a walkthrough
    href: /#contact
footnote: AabenForms by Fenix Nordic Solutions. Screenshots and test results are from the running platform, July 2026.
---

::margin-note{term="The interface" tone="ash"}
::

## Modern for the citizen. Transparent for the administration.

::lede
Citizens meet a fast, accessible frontend. The administration can read, review and sign off on the workflow itself, because it is a diagram rather than code.
::

::case-figure{src="/media/aabenforms/citizen-flow.webp" src2x="/media/aabenforms/citizen-flow@2x.webp" width="960" height="667" alt="Citizen flow with MitID login, a four-step progress indicator and an explanation of what happens behind the scenes."}
Citizen flow. Danish and English built in. Demo mode is labelled clearly, not hidden.
::

::case-figure{src="/media/aabenforms/editor.webp" src2x="/media/aabenforms/editor@2x.webp" width="960" height="600" alt="The visual workflow editor showing the school transfer flow as connected event, condition and action nodes."}
The visual editor. Built by people who know both the case area and the infrastructure, but legible to everyone who has to approve it.
::

::case-figure{src="/media/aabenforms/operations.webp" src2x="/media/aabenforms/operations@2x.webp" width="960" height="733" alt="Administration dashboard showing Digital Post, MitID, tenants and audit log status."}
Operations overview: integrations, queues, tenants and audit log.
::

::case-figure{src="/media/aabenforms/traces.webp" src2x="/media/aabenforms/traces@2x.webp" width="960" height="733" alt="Evidence traces: a table of submissions with case, result, MitID status and step count."}
Every submission leaves a trace through each Danish service contract it touched.
::

::margin-note{term="Built for Denmark" tone="ash"}
::

## Integrations follow the KOMBIT standards directly

::lede
Not a generic form builder with Danish fields bolted on. The service contracts are part of the engine.
::

::rows
:::row{term="MitID and NemLog-in"}
OIDC with PKCE and nonce. NSIS assurance is enforced inside the flow, not only at login.
:::
:::row{term="CPR and CVR lookups"}
Serviceplatformen SF1520 and SF1530. Family and custody lookups via SF6006.
:::
:::row{term="Digital Post (SF1601)"}
MeMo format, delivery receipts via Beskedfordeler, remote print as fallback.
:::
:::row{term="Case index and distribution"}
Journalising via SF1470 and distribution to line-of-business systems via Fordelingskomponenten (SF2900).
:::
:::row{term="ESDH"}
GetOrganized, SBSYS, WorkZone and Acadre. ESDH is a swappable connector, not a dependency.
:::
:::row{term="Administrative law is encoded"}
Partshøring and appeal guidance are mandatory steps. Deadline calculation skips public holidays.
:::
::

::margin-note{term="Beyond forms" tone="ash"}
::

## A full case engine, not a form collector

::rows
:::row{term="The whole journey"}
From application through journalising and decision to appeal and handover to the line-of-business system.
:::
:::row{term="Lawful state changes enforced in the database"}
No code path, not the admin form nor JSON:API, can move a case into an unlawful state.
:::
:::row{term="Every transition is a revision"}
Who, when and why. A complete audit trail.
:::
:::row{term="Deadlines computed correctly"}
Working days in Danish local time, public holidays skipped, per case area.
:::
:::row{term="CPR is always encrypted"}
AES-256. The system refuses to store plaintext.
:::
:::row{term="Multi-tenant"}
One installation can serve several municipalities or departments with isolated data.
:::
::

::margin-note{term="Case study" tone="ash"}
::

## School transfer: the chain nobody assembled

Building permits and address changes are linear. Workflows about children are not. They involve several parties with distinct rights, and sending to the wrong one is a data breach.

A school transfer requires somebody with parental custody to apply. Under shared custody, school choice is a significant decision under the Danish Parental Responsibility Act, so both holders must agree. Where disagreement is known, the municipality cannot proceed at all. The decision must reach both custody holders in Digital Post separately. That has been law since 21 March 2022.

Every building block exists in Danish infrastructure. CPR holds custody. SF1601 sends Digital Post. borger.dk has run co-signature by link for years. Nobody has assembled the chain. In OS2Forms the request for parallel parties in a workflow has been open since January 2026, and there is not a single issue about custody lookup anywhere in the public OS2 trackers.

::case-figure{src="/media/aabenforms/diagram.webp" src2x="/media/aabenforms/diagram@2x.webp" width="960" height="132" alt="Flow diagram generated from the active ECA model, branching to school leader review, co-signature or partshøring."}
The diagram is generated from the active flow, not drawn by hand. Green is start, blue is action, red is denial.
::

::rows
:::row{term="Sole custody"}
The registry confirms a single holder. The case goes straight to the school leader at the requested school.
:::
:::row{term="Shared custody, agreed"}
The other holder receives a secure link in Digital Post, signs in with MitID and approves. A 14 day window.
:::
:::row{term="Known disagreement"}
The flow refuses to decide. The case moves to manual handling with partshøring, per the Ombudsman ruling FOB 2025-9.
:::
::

::margin-note{term="Verified" tone="ash"}
::

## Tested against the engine, not against a mock

The tests create a real MitID session, post to the live endpoint and read the step trace the engine returns. The workflow layer is not mocked.

### Applicant without custody

::margin-note{term="Three steps and out"}
No case, no journal number, no letter. The registry said no, and the expensive part of the machinery never started.
::

::status-list{log}
:::status-item{state="done" label="completed"}
**aabenforms_mitid_validate** Citizen identity verified via NemID/MitID national eID
:::
:::status-item{state="failed" label="failed"}
**aabenforms_custody_verify** Adult is not a registered custody holder of the child
:::
:::status-item{state="failed" label="failed"}
**aabenforms_workflow_deny** Ansøgningen blev ikke behandlet, fordi CPR-registret ikke bekræfter, at du har forældremyndighed
:::
::

::margin-note{term="Honest status"}
::

## Pre-pilot POC. Here is exactly what that means.

::status-list
:::status-item{state="done" label="Running"}
Live on aabenforms.dk and api.aabenforms.dk.
:::
:::status-item{state="partial" label="Test rails"}
Against test and mock integrations. No Serviceplatformen certificate has been issued, so CPR lookups run against test data and Digital Post writes to a local log instead of SF1601.
:::
:::status-item{state="done" label="Honest"}
A step that ran against test data writes "demo" in the trace. An audit trail that lies is worse than no audit trail.
:::
:::status-item{state="done" label="Real"}
The engine, the case model, the branching, deadline calculation, encryption and audit. What is missing is certificates and a pilot municipality.
:::
::

::margin-note{term="Watch it run" tone="ash"}
::

## The case engine, step by step

Two real ECA workflows recorded as they run: MitID, registry lookups, a decision, Digital Post and a GDPR trace. Watch them below, or open the interactive demo to step through every node.

::flow-video{name="aabenforms-merudgifter-en" width="1440" height="900" alt="AabenForms disability-costs workflow executing step by step to decision and SF2900" demo="/aabenforms-demo-en.html"}
Disability costs (SEL §41).
::

::flow-video{name="aabenforms-skoleskift-en" width="1440" height="900" alt="AabenForms school-transfer workflow executing step by step with co-signature" demo="/aabenforms-demo-en.html"}
School transfer (joint custody).
::
