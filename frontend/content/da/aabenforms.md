---
title: Sagsgange der kører sig selv
description: "AabenForms: open source platform (Drupal 11 og Nuxt) til kommunale selvbetjeningsløsninger og sagsgange. MitID, Digital Post, ESDH og en fuld sagsmotor."
product: AabenForms
kicker: Selvbetjening og sagsgange til kommuner
lede: AabenForms er en open source platform (Drupal 11 og Nuxt) til kommunale selvbetjeningsløsninger og sagsgange. Sagsgange bygges som konfiguration i en visuel editor og eksekveres automatisk. Resultatet er et læsbart artefakt, ikke skræddersyet kode i en leverandørs kodebase.
facts: Atten færdige kommunale flows, seks KOMBIT-integrationer, fire ESDH-systemer. GPL, så kommunen ejer løsningen.
cta:
  heading: Klar til en POC med rigtige integrationer
  lede: Næste skridt er en pilotkommune, der stiller certifikater og et konkret sagsområde til rådighed. Platformen er der allerede.
  primary:
    label: Se live demo
    href: https://aabenforms.dk
  secondary:
    label: Book en gennemgang
    href: /da#contact
footnote: AabenForms af Fenix Nordic Solutions. Skærmbilleder og testresultater er fra den kørende platform, juli 2026.
---

::margin-note{term="Interfacet" tone="ash"}
::

## Moderne for borgeren. Gennemsigtig for forvaltningen.

::lede
Borgeren møder en hurtig, tilgængelig frontend. Forvaltningen kan læse, gennemgå og godkende selve sagsgangen, fordi den er et diagram og ikke kode.
::

::case-figure{src="/media/aabenforms/citizen-flow.webp" src2x="/media/aabenforms/citizen-flow@2x.webp" width="960" height="667" alt="Borgerflow med MitID-login, fremdriftsindikator i fire trin og forklaring af hvad der sker bag kulisserne."}
Borgerflow. Dansk og engelsk indbygget. Demo-tilstand er mærket tydeligt, ikke skjult.
::

::case-figure{src="/media/aabenforms/editor.webp" src2x="/media/aabenforms/editor@2x.webp" width="960" height="600" alt="Den visuelle workflow-editor med skoleskift-flowet: hændelse, betingelser og handlinger som forbundne noder."}
Den visuelle editor. Bygget af folk der kender både sagsområdet og infrastrukturen, men læsbar for alle der skal godkende den.
::

::case-figure{src="/media/aabenforms/operations.webp" src2x="/media/aabenforms/operations@2x.webp" width="960" height="733" alt="Administrationsdashboard med status for Digital Post, MitID, tenants og auditlog."}
Driftsoverblik: integrationer, køer, tenants og auditlog.
::

::case-figure{src="/media/aabenforms/traces.webp" src2x="/media/aabenforms/traces@2x.webp" width="960" height="733" alt="Evidence traces: tabel over indsendelser med sag, resultat, MitID-status og antal steps."}
Hver indsendelse efterlader et spor gennem hver dansk servicekontrakt den rørte.
::

::margin-note{term="Bygget til Danmark" tone="ash"}
::

## Integrationerne følger KOMBIT-standarderne direkte

::lede
Ikke et generisk formularværktøj med danske felter ovenpå. Servicekontrakterne er en del af motoren.
::

::rows
:::row{term="MitID og NemLog-in"}
OIDC med PKCE og nonce. NSIS-assurance håndhæves i selve flowet, ikke kun ved login.
:::
:::row{term="CPR- og CVR-opslag"}
Serviceplatformen SF1520 og SF1530. Familie- og forældremyndighedsopslag via SF6006.
:::
:::row{term="Digital Post (SF1601)"}
MeMo-format, kvitteringer via Beskedfordeler, fjernprint som fallback.
:::
:::row{term="Sagsindeks og fordeling"}
Journalisering via SF1470 og fordeling til fagsystem via Fordelingskomponenten (SF2900).
:::
:::row{term="ESDH"}
GetOrganized, SBSYS, WorkZone og Acadre. ESDH er en udskiftelig connector, ikke en afhængighed.
:::
:::row{term="Forvaltningsloven er kodet ind"}
Partshøring og klagevejledning er obligatoriske trin. Fristberegning springer helligdage over.
:::
::

::margin-note{term="Ud over formularer" tone="ash"}
::

## En fuld sagsmotor, ikke en formularmodtager

::rows
:::row{term="Hele forløbet"}
Fra ansøgning over journalisering og afgørelse til klage og aflevering til fagsystem.
:::
:::row{term="Lovlige statusændringer håndhæves i databasen"}
Ingen kodesti, heller ikke admin-formularen eller JSON:API, kan bringe en sag i en ulovlig tilstand.
:::
:::row{term="Alle skift logges som revisioner"}
Hvem, hvornår og hvorfor. Fuldt audit-spor.
:::
:::row{term="Frister beregnes korrekt"}
Hverdage i dansk tidszone, helligdage sprunget over, per sagsområde.
:::
:::row{term="CPR krypteres altid"}
AES-256. Systemet nægter at gemme klartekst.
:::
:::row{term="Multi-tenant"}
En installation kan betjene flere kommuner eller magistrater med isolerede data.
:::
::

::margin-note{term="Case" tone="ash"}
::

## Skoleskift: den kæde ingen har samlet

Byggetilladelser og adresseændringer er lineære. Sagsgange om børn er det ikke. De involverer flere parter med hver deres rettigheder, og en forkert afsendelse er et databrud.

Et skoleskift kræver, at nogen med forældremyndighed ansøger. Ved fælles myndighed er skolevalg en væsentlig beslutning efter forældreansvarslovens §3, så begge indehavere skal være enige. Ved kendt uenighed kan kommunen slet ikke gennemføre skiftet. Afgørelsen skal sendes til begge indehavere i Digital Post hver for sig. Det har været lov siden 21. marts 2022.

Alle byggeklodser findes i dansk infrastruktur. CPR indeholder forældremyndighed. SF1601 sender Digital Post. borger.dk har kørt medunderskrift via link i årevis. Ingen har samlet kæden. I OS2Forms er ønsket om parallelle parter i et forløb registreret som åbent siden januar 2026, og der findes ikke en eneste sag om opslag af forældremyndighed i de offentlige OS2-trackere.

::case-figure{src="/media/aabenforms/diagram.webp" src2x="/media/aabenforms/diagram@2x.webp" width="960" height="132" alt="Flowdiagram genereret fra det aktive ECA-flow med forgreninger til skoleleder, medunderskrift eller partshøring."}
Diagrammet genereres fra det aktive flow, ikke tegnet i hånden. Grøn er start, blå er handling, rød er afvisning.
::

::rows
:::row{term="Eneforældremyndighed"}
Registret bekræfter eneindehaver. Sagen går direkte til skolelederen på den ønskede skole.
:::
:::row{term="Fælles myndighed, enige"}
Den anden indehaver får et sikkert link i Digital Post, logger ind med MitID og underskriver. 14 dages frist.
:::
:::row{term="Kendt uenighed"}
Flowet nægter at træffe afgørelse. Sagen overgår til manuel behandling med partshøring (FOB 2025-9).
:::
::

::margin-note{term="Verificeret" tone="ash"}
::

## Testet mod motoren, ikke mod en mock

Testene opretter en rigtig MitID-session, sender til det live endpoint og læser det step-spor motoren returnerer. Workflow-laget er ikke mocket.

### Ansøger uden forældremyndighed

::margin-note{term="Tre steps og ud"}
Ingen sag, intet journalnummer, intet brev. Registret sagde nej, og den dyre del af maskineriet startede aldrig.
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

::margin-note{term="Ærlig status"}
::

## Pre-pilot POC. Her er præcis hvad det betyder.

::status-list
:::status-item{state="done" label="Kører"}
Live på aabenforms.dk og api.aabenforms.dk.
:::
:::status-item{state="partial" label="Testrail"}
Mod test- og mock-integrationer. Der er ikke udstedt Serviceplatformen-certifikat, så CPR-opslag kører mod testdata og Digital Post skrives til en lokal log i stedet for SF1601.
:::
:::status-item{state="done" label="Ærligt"}
Et step der kørte mod testdata skriver "demo" i sporet. Et audit-spor der lyver er værre end intet audit-spor.
:::
:::status-item{state="done" label="Reelt"}
Motoren, sagsmodellen, forgreningerne, fristberegningen, kryptering og audit. Det der mangler er certifikater og en pilotkommune.
:::
::

::margin-note{term="Se den køre" tone="ash"}
::

## Sagsmotoren, trin for trin

To rigtige ECA-arbejdsgange optaget mens de kører: MitID, register-opslag, afgørelse, Digital Post og GDPR-spor. Se dem herunder, eller åbn den interaktive demo og gennemgå hvert trin.

::flow-video{name="aabenforms-merudgifter-da" width="1440" height="900" alt="AabenForms merudgifter-arbejdsgang eksekverer trin for trin til afgørelse og SF2900" demo="/aabenforms-demo-da.html"}
Merudgifter (SEL §41).
::

::flow-video{name="aabenforms-skoleskift-da" width="1440" height="900" alt="AabenForms skoleskift-arbejdsgang eksekverer trin for trin med medunderskrift" demo="/aabenforms-demo-da.html"}
Skoleskift (fælles forældremyndighed).
::
