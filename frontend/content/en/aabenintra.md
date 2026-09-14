---
title: An intranet people actually open
description: "AabenIntra: an open source intranet on Drupal 11. Personal dashboard, targeted news, employee directory and a recognition wall. Danish and English. From 7,500 DKK a month."
product: AabenIntra
kicker: Intranet for municipalities and organisations
lede: AabenIntra is an open source intranet built on Drupal 11. A personal dashboard, targeted news, an employee directory with real organisational structure, and a recognition wall that makes colleagues' work visible. Danish and English from day one.
facts: Eleven custom modules, thirteen contrib dependencies, two languages built in. From 7,500 DKK a month, baseline.
cta:
  heading: Try the demo, or book a walkthrough
  lede: The demo is open. It shows the product as it is today, not a prototype of something that might arrive.
  primary:
    label: See the live demo
    href: https://aabenintra.fenixnordic.solutions/
  secondary:
    label: Book a walkthrough
    href: /#contact
footnote: AabenIntra by Fenix Nordic Solutions. Screenshots are from the running installation, July 2026.
---

::margin-note{term="The interface" tone="ash"}
::

## Personal for the individual. Structured for the organisation.

::lede
The front page is not the same for everyone. Content surfaces by department, by position in the organisation, and by the channels a person chooses to follow. Order, accent colour and density are each employee's own.
::

::case-figure{src="/media/aabenintra/dashboard.webp" src2x="/media/aabenintra/dashboard@2x.webp" width="960" height="833" alt="AabenIntra dashboard with a personal greeting, large and small content tiles with photography, and colour-coded department chips."}
The dashboard. Tile sizing is resolved server side, and the order is the employee's own.
::

::case-figure{src="/media/aabenintra/news.webp" src2x="/media/aabenintra/news@2x.webp" width="960" height="667" alt="News listing in Danish covering budget, Aula rollout, winter service and MitID Erhverv."}
News in Danish. The same content, translated, not a separate installation.
::

::case-figure{src="/media/aabenintra/directory.webp" src2x="/media/aabenintra/directory@2x.webp" width="960" height="667" alt="Employee directory with photographs, job titles, units and skills."}
Directory, filterable by name, title, unit, location and skill.
::

::margin-note{term="Culture" tone="ash"}
::

## An intranet builds culture, or it is just a file server

::lede
Most intranets do not fail technically. They fail because nobody has a reason to open them. AabenIntra is built around the opposite premise: make colleagues' work visible.
::

::case-figure{src="/media/aabenintra/recognition.webp" src2x="/media/aabenintra/recognition@2x.webp" width="960" height="667" alt="Recognition wall showing who recognised whom, with badges such as Teamwork, Innovation and Leadership."}
The recognition wall. Named badges, a concrete reason, and who gave it.
::

::rows
:::row{term="Recognition with substance"}
A kudos has a recipient, a badge and a reason. Not a like, but a sentence about what the colleague actually did. That is the difference between recognition someone remembers and a notification they dismiss.
:::
:::row{term="An activity stream that shows contribution"}
Every publication, comment and recognition is logged at write time. New starters can see who contributes where instead of guessing.
:::
:::row{term="Channels people choose"}
Employees follow the topics relevant to them, so the news stream becomes something they opted into rather than something broadcast at them.
:::
:::row{term="Communities of practice"}
Community is its own group type, not a renamed team. Built for networks across departments, with open, closed or secret visibility.
:::
:::row{term="Knowledge sharing in small pieces"}
Tips are shared by category: how-to, best practice, troubleshooting. A lower barrier than a document, and easier to find again.
:::
:::row{term="Find an expert"}
Search by skill rather than by name. Useful precisely when you do not know who to ask.
:::
::

::case-figure{src="/media/aabenintra/activity.webp" src2x="/media/aabenintra/activity@2x.webp" width="960" height="833" alt="Activity stream listing publications, comments and recognitions in chronological order."}
Activity, scoped by organisation, groups and followed channels.
::

::case-figure{src="/media/aabenintra/experts.webp" src2x="/media/aabenintra/experts@2x.webp" width="960" height="667" alt="Expert finder where colleagues are located by skill tag."}
Expert finder, by skill.
::

::margin-note{term="Under the bonnet" tone="ash"}
::

## The organisation is not a field. It is a structure.

Most intranets treat department as a tag. Here the organisation is a hierarchy and visibility inherits downward. If Digitalisering writes to the whole municipality, everyone sees it. If they write to their own unit, they do not.

That same lineage drives the dashboard, the news stream and the activity log. One concept, three places, in a single query. It is why targeting does not cost performance.

The activity log is written at write time behind a unique key, so hooks and rebuilds cannot produce duplicates. Personalisation stays cacheable because preferences are expressed as cache contexts rather than by switching caching off.

::case-figure{src="/media/aabenintra/orgchart.webp" src2x="/media/aabenintra/orgchart@2x.webp" width="960" height="667" alt="Organisation chart for Aabenby Kommune showing units and headcounts."}
Org chart with live headcounts.
::

::rows
:::row{term="Platform"}
Drupal 11.3
:::
:::row{term="Custom modules"}
11
:::
:::row{term="Contrib dependencies"}
13
:::
:::row{term="Provisioning"}
Drupal Recipes
:::
:::row{term="Languages"}
Danish and English
:::
:::row{term="Licence"}
Open source
:::
::

::margin-note{term="A deliberate choice"}
Only 13 contrib modules. Every module is something to update, patch and test on each Drupal release.
::

A thin dependency surface is not a limitation, it is what makes a fixed monthly maintenance price realistic.

::margin-note{term="Compliance" tone="ash"}
::

## Mandatory reading with receipts

Policies can be marked mandatory. The employee acknowledges, the receipt is stored, and HR can export a report as CSV. This is the sort of thing that otherwise lives in a spreadsheet beside the intranet.

::margin-note{term="Running it" tone="ash"}
::

## A fixed price, so the budget is known

::fact
7,500 DKK a month, baseline.
::

Onboarding and training are agreed separately at the start. That is also when the operational layer is stood up for your installation.

::rows
:::row{term="Hosting, updates, backups and monitoring"}
Hosting on European infrastructure, security updates for Drupal core and modules, daily backups with a tested restore, and monitoring with alerting.
:::
:::row{term="Support with response times"}
A named contact. Critical issues within four business hours, everything else within two business days.
:::
:::row{term="An included change budget"}
A fixed number of hours each month for new sections, content structure and small features. A retainer should feel like progress, not insurance.
:::
:::row{term="Onboarding and training"}
Setup, content migration and training for your editors.
:::
::

::margin-note{term="Worth knowing"}
Backups with a tested restore and monitoring are established for your installation as part of onboarding.
::

They do not exist as a finished service on the demo instance today, and that is precisely part of what the onboarding covers.

::margin-note{term="Honest status"}
::

## What runs today, and what does not

::lede
This is a proof of concept with a public demo. Everything below is built and can be seen. What is not built is stated too.
::

::status-list
:::status-item{state="done" label="Built"}
Dashboard, news, channels, directory, org chart, expert finder, kudos, activity stream, comments and reactions, groups, mandatory reading with CSV export, Danish and English.
:::
:::status-item{state="missing" label="Not built"}
Search beyond Drupal core. No notifications, calendar or surveys.
:::
:::status-item{state="partial" label="Not evidenced"}
Accessibility. The markup follows good practice, but no audit has been run. EN 301 549 is a legal requirement for public bodies, so an axe-based CI gate and an accessibility statement belong in a pilot. We already do exactly that on AabenForms.
:::
:::status-item{state="partial" label="One installation"}
Multi-tenancy is designed as one container per customer. One runs today, and per-customer branding is not built yet.
:::
:::status-item{state="partial" label="Demo data"}
The public demo is seeded with invented content from a fictional Aabenby Kommune. That is deliberate, so you can see it as it looks in use.
:::
::
