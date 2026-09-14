---
title: Et intranet, medarbejderne faktisk bruger
description: "AabenIntra: open source intranet på Drupal 11. Personligt dashboard, målrettede nyheder, medarbejderoversigt og anerkendelsesvæg. Dansk og engelsk. Fra 7.500 kr. om måneden."
product: AabenIntra
kicker: Intranet til kommuner og organisationer
lede: AabenIntra er et open source intranet bygget på Drupal 11. Personligt dashboard, målrettede nyheder, medarbejderoversigt med organisationsstruktur, og en anerkendelsesvæg der gør kollegers indsats synlig. Dansk og engelsk fra dag ét.
facts: Elleve egne moduler, tretten contrib-afhængigheder, to sprog indbygget. Fra 7.500 kr. om måneden, baseline.
cta:
  heading: Prøv demoen, eller book en gennemgang
  lede: Demoen er åben. Den viser produktet som det er i dag, ikke en prototype af noget der måske kommer.
  primary:
    label: Se live demo
    href: https://aabenintra.fenixnordic.solutions/
  secondary:
    label: Book en gennemgang
    href: /da#contact
footnote: AabenIntra af Fenix Nordic Solutions. Skærmbilleder er fra den kørende installation, juli 2026.
---

::margin-note{term="Interfacet" tone="ash"}
::

## Personligt for den enkelte. Struktureret for organisationen.

::lede
Forsiden er ikke den samme for alle. Indhold vises efter afdeling, efter organisatorisk placering og efter de kanaler man selv følger. Rækkefølge, farve og tæthed kan hver medarbejder selv sætte.
::

::case-figure{src="/media/aabenintra/dashboard.webp" src2x="/media/aabenintra/dashboard@2x.webp" width="960" height="833" alt="AabenIntra dashboard med personlig hilsen, store og små indholdsfliser med fotos, og farvekodede afdelingsmærker."}
Dashboard. Fliserne størrelsessættes serverside, og rækkefølgen er den enkelte medarbejders egen.
::

::case-figure{src="/media/aabenintra/news.webp" src2x="/media/aabenintra/news@2x.webp" width="960" height="667" alt="Nyhedsoversigt på dansk med artikler om budget, Aula-udrulning, vinterberedskab og MitID Erhverv."}
Nyheder på dansk. Samme indhold, oversat, ikke en separat installation.
::

::case-figure{src="/media/aabenintra/directory.webp" src2x="/media/aabenintra/directory@2x.webp" width="960" height="667" alt="Medarbejderoversigt med fotos, stillingsbetegnelser, enheder og kompetencer."}
Medarbejderoversigt med filtrering på navn, titel, enhed, sted og kompetence.
::

::margin-note{term="Kultur" tone="ash"}
::

## Et intranet bygger kultur, eller også er det bare en filserver

::lede
De fleste intranet fejler ikke teknisk. De fejler fordi ingen har en grund til at åbne dem. AabenIntra er bygget omkring det modsatte: at gøre kollegers arbejde synligt.
::

::case-figure{src="/media/aabenintra/recognition.webp" src2x="/media/aabenintra/recognition@2x.webp" width="960" height="667" alt="Anerkendelsesvæg med kort der viser hvem der har anerkendt hvem, med mærker som Teamwork, Innovation og Leadership."}
Anerkendelsesvæggen. Navngivne mærker, konkret begrundelse, og hvem der gav den.
::

::rows
:::row{term="Anerkendelse med indhold"}
Kudos har modtager, mærke og en begrundelse. Ikke et like, men en sætning om hvad kollegaen rent faktisk gjorde. Det er forskellen på en anerkendelse man husker og en notifikation man lukker.
:::
:::row{term="Aktivitetsstrøm der viser bidrag"}
Hver udgivelse, kommentar og anerkendelse logges på skrivetidspunktet. Nye medarbejdere kan se hvem der bidrager hvor, i stedet for at gætte sig frem.
:::
:::row{term="Kanaler man selv vælger"}
Medarbejdere følger de emner der er relevante for dem. Nyhedsstrømmen bliver dermed noget man har valgt, ikke noget der bliver sendt til alle.
:::
:::row{term="Faglige fællesskaber"}
Community er en egen gruppetype, ikke et omdøbt team. Tænkt til netværk på tværs af forvaltninger, med åben, lukket eller skjult synlighed.
:::
:::row{term="Vidensdeling i små bidder"}
Tips deles med kategori: how-to, best practice, fejlfinding. Lavere tærskel end et dokument, og lettere at finde igen.
:::
:::row{term="Find en ekspert"}
Søgning på kompetence frem for på navn. Nyttigt præcis når man ikke ved hvem man skal spørge.
:::
::

::case-figure{src="/media/aabenintra/activity.webp" src2x="/media/aabenintra/activity@2x.webp" width="960" height="833" alt="Aktivitetsstrøm med udgivelser, kommentarer og anerkendelser i kronologisk rækkefølge."}
Aktivitetsstrøm, filtreret efter organisation, grupper og fulgte kanaler.
::

::case-figure{src="/media/aabenintra/experts.webp" src2x="/media/aabenintra/experts@2x.webp" width="960" height="667" alt="Ekspertsøgning hvor medarbejdere kan findes på kompetencemærker."}
Ekspertsøgning på kompetence.
::

::margin-note{term="Under motorhjelmen" tone="ash"}
::

## Organisationen er ikke et felt. Den er en struktur.

De fleste intranet behandler afdeling som et tag. Her er organisationen et hierarki, og synlighed arver nedad. Skriver Digitalisering til hele kommunen, ser alle det. Skriver de til deres egen enhed, gør de ikke.

Den samme afstamning bruges af dashboardet, nyhedsstrømmen og aktivitetsloggen. Ét begreb, tre steder, i én forespørgsel. Det er derfor målretning ikke koster ydeevne.

Aktivitetsloggen skrives på skrivetidspunktet med en unik nøgle, så hooks og genopbygning ikke kan skabe dubletter. Personalisering er cachebar, fordi præferencerne udtrykkes som cache-kontekster i stedet for at slå caching fra.

::case-figure{src="/media/aabenintra/orgchart.webp" src2x="/media/aabenintra/orgchart@2x.webp" width="960" height="667" alt="Organisationsdiagram for Aabenby Kommune med enheder og antal medarbejdere."}
Organisationsdiagram med levende medarbejdertal.
::

::rows
:::row{term="Platform"}
Drupal 11.3
:::
:::row{term="Egne moduler"}
11
:::
:::row{term="Contrib-afhængigheder"}
13
:::
:::row{term="Opsætning"}
Drupal Recipes
:::
:::row{term="Sprog"}
Dansk og engelsk
:::
:::row{term="Licens"}
Open source
:::
::

::margin-note{term="Bevidst valg"}
Kun 13 contrib-moduler. Hvert modul er noget der skal opdateres, sikkerhedsrettes og testes ved hver Drupal-udgivelse.
::

En tynd afhængighedsflade er ikke en begrænsning, det er det der gør en fast månedlig drift realistisk.

::margin-note{term="Compliance" tone="ash"}
::

## Obligatorisk læsning med kvittering

Politikker kan markeres som obligatoriske. Medarbejderen kvitterer, kvitteringen gemmes, og HR kan trække en rapport som CSV. Det er den slags der ellers foregår i et regneark ved siden af intranettet.

::margin-note{term="Drift og aftale" tone="ash"}
::

## Fast pris, så budgettet er kendt

::fact
7.500 kr. om måneden, baseline.
::

Onboarding og træning aftales særskilt ved opstart. Det er også der driftslaget bliver sat op for jeres installation.

::rows
:::row{term="Hosting, opdateringer, backup og overvågning"}
Drift på europæisk infrastruktur, sikkerhedsopdateringer til Drupal core og moduler, daglig backup med afprøvet gendannelse, og overvågning med alarmering.
:::
:::row{term="Support med svartider"}
Navngiven kontakt. Kritiske sager inden for fire arbejdstimer, øvrige inden for to arbejdsdage.
:::
:::row{term="Timer til ændringer"}
Et fast timetal hver måned til nye sektioner, indholdsstruktur og mindre funktioner. Retaineren skal føles som fremdrift, ikke som forsikring.
:::
:::row{term="Onboarding og træning"}
Opsætning, indholdsmigrering og oplæring af redaktører.
:::
::

::margin-note{term="Vær opmærksom"}
Backup med afprøvet gendannelse og overvågning etableres for jeres installation som en del af onboarding.
::

De findes ikke som en færdig service på demo-installationen i dag, og det er præcis noget af det opstartsarbejdet dækker.

::margin-note{term="Ærlig status"}
::

## Hvad der kører i dag, og hvad der ikke gør

::lede
Det er et proof of concept med en offentlig demo. Alt herunder er bygget og kan ses. Det der ikke er bygget, står der også.
::

::status-list
:::status-item{state="done" label="Bygget"}
Dashboard, nyheder, kanaler, medarbejderoversigt, organisationsdiagram, ekspertsøgning, kudos, aktivitetsstrøm, kommentarer og reaktioner, grupper, obligatorisk læsning med CSV-udtræk, dansk og engelsk.
:::
:::status-item{state="missing" label="Ikke bygget"}
Søgning ud over Drupals indbyggede. Ingen notifikationer, kalender eller undersøgelser.
:::
:::status-item{state="partial" label="Ikke dokumenteret"}
Tilgængelighed. Markup følger god praksis, men der er ikke gennemført en audit. EN 301 549 er lovkrav for offentlige myndigheder, så en axe-baseret test i CI og en tilgængelighedserklæring hører med i en pilot. Vi gør det samme på AabenForms i dag.
:::
:::status-item{state="partial" label="Én installation"}
Multi-tenant er tænkt som en container pr. kunde. Der kører én i dag, og per-kunde branding er ikke bygget endnu.
:::
:::status-item{state="partial" label="Demodata"}
Den offentlige demo er seedet med opdigtet indhold fra en fiktiv Aabenby Kommune. Det er med vilje, så man kan se det som det ser ud i brug.
:::
::
