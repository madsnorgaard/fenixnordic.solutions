import type { Messages } from '../types'

const en: Messages = {
  meta: {
    title: 'Fenix Nordic Solutions',
    description: 'Open source systems for Danish municipalities and Nordic teams, hosted in Europe and owned outright. IT cost audits, off-cloud migration, custom builds, and the AabenForms and AabenIntra platforms. Based in Skanderborg, Denmark.',
  },
  nav: {
    label: 'Site',
    contact: 'Contact',
    skip: 'Skip to content',
    language: 'Language',
  },
  hero: {
    line1: 'Own the system.',
    line2: 'Cut the bill.',
    lede: 'Fenix Nordic builds open source systems for Danish municipalities and Nordic teams: hosted in Europe, owned outright, priced for the work rather than the licence. From Skanderborg, delivering anywhere.',
    primary: 'Talk to us',
    secondary: 'See AabenForms',
  },
  how: {
    heading: 'How we work',
    lede: 'From the audit to the day you run it yourself.',
    steps: [
      {
        term: 'Analyse',
        body: 'We map your licences, hosting and workflows and find where you pay for infrastructure you do not need. You get a clear picture of spend and a realistic plan to bring it down.',
      },
      {
        term: 'Build',
        body: 'We move you onto right-sized European hosting and open source tooling, and build the specific applications your workflow needs. We use AI where it speeds delivery, never where it adds risk.',
      },
      {
        term: 'Own',
        body: 'Every system is documented, testable and yours to run. No vendor lock-in, no per-seat surprises, no dependency you cannot cut.',
      },
    ],
  },
  services: {
    heading: 'What we do',
    lede: 'Fewer licences. More that is yours.',
    items: [
      {
        term: 'Audit',
        title: 'IT cost and licence audit',
        body: 'We analyse your software licences, SaaS subscriptions and cloud hosting against what your business actually uses. You get a prioritised list of what to cut, replace or right-size, with the savings attached.',
      },
      {
        term: 'Migration',
        title: 'Off-cloud migration',
        body: 'Move from over-provisioned cloud onto your own servers or a European VPS. The same reliability for a fraction of the bill, with your data under your control and EU jurisdiction.',
      },
      {
        term: 'Custom builds',
        title: 'Custom open source solutions',
        body: 'When an expensive tool only solves part of your problem, we build the application that solves the rest, on open source foundations you own. AI-assisted delivery keeps it fast and affordable.',
      },
      {
        term: 'Web',
        title: 'Websites, platforms and integration',
        body: 'Headless CMS, Nuxt and Vue frontends, and the API integrations that make your systems talk. Fast, maintainable and free of lock-in.',
      },
      {
        term: 'Drupal',
        title: 'Drupal migration, upgrades and support',
        body: 'Drupal is our core platform: sixteen years of it, on projects from a single site to large multi-site archives. We migrate legacy sites, run major-version upgrades, fix long-standing pain points and smooth out the daily friction your team has learned to live with.',
      },
      {
        term: 'Maintenance',
        title: 'Continuous maintenance',
        body: 'Software left alone becomes a liability. We keep your stack patched, current and secure: dependencies, security releases and platform updates handled as routine, so problems are prevented rather than discovered.',
      },
    ],
  },
  products: {
    heading: 'Products',
    lede: 'Open source products you own, not licence agreements you rent.',
    items: [
      {
        name: 'AabenForms',
        kicker: 'Self-service and case workflows for municipalities',
        claim: 'Citizen-facing forms and workflows, without the per-form licence.',
        paragraphs: [
          'AabenForms is an open source platform for secure digital forms and case workflows: MitID login, Digital Post, and the approval flows that public-sector and regulated work depend on. The proprietary alternatives charge per form, per seat and per integration. AabenForms does not.',
          'Built on Drupal and Nuxt and designed to run on infrastructure you control, it keeps citizen data in the EU and under your governance. You own the platform, the forms and the data, not a vendor.',
        ],
        facts: 'Eighteen municipal flows ready, six KOMBIT integrations, four ESDH systems. GPL, so the municipality owns it.',
        status: {
          term: 'Honest status',
          body: 'Pre-pilot proof of concept, live on aabenforms.dk. The engine, case model, branching, deadlines, encryption and audit are real. Missing: Serviceplatformen certificates and a pilot municipality.',
        },
        video: {
          name: 'aabenforms-skoleskift-en',
          alt: 'The AabenForms school-transfer workflow executing step by step, with co-signature from the second custody holder',
          caption: 'School transfer under joint custody, recorded as it runs.',
          demo: '/aabenforms-demo-en.html',
        },
        links: {
          study: 'Read the case study',
          site: 'Visit aabenforms.dk',
        },
      },
      {
        name: 'AabenIntra',
        kicker: 'Intranet for municipalities and organisations',
        claim: 'The intranet your team will actually open.',
        paragraphs: [
          'AabenIntra is an open source intranet on Drupal 11: one place for news, documents, people and the everyday tools your team relies on. A personal dashboard, targeted news, a directory with real organisational structure, and a recognition wall that makes colleagues\' work visible.',
          'It draws on years of intranet and employee-experience work, including an award-winning Danish workplace recognised for employee satisfaction. An intranet only earns its cost when people open it, so that is exactly what it is designed for. Danish and English from day one, for Nordic teams and international workplaces alike.',
        ],
        facts: 'Eleven custom modules, thirteen contrib dependencies, two languages. From 7,500 DKK a month, hosting and maintenance included.',
        status: {
          term: 'Honest status',
          body: 'Proof of concept with a public demo. Dashboard, news, directory, org chart, recognition and mandatory reading are built. Search beyond Drupal core, notifications, calendar and surveys are not.',
        },
        image: {
          src: '/media/aabenintra/dashboard.webp',
          width: 960,
          height: 833,
          alt: 'The AabenIntra dashboard with a personal greeting, content tiles with photography and colour-coded department chips',
          caption: 'The dashboard. Tile sizing is resolved server side, and the order is the employee\'s own.',
        },
        links: {
          study: 'Read the case study',
          site: 'See the live demo',
        },
      },
    ],
  },
  cases: {
    heading: 'Cases',
    lede: 'Open archives, built to last.',
    items: [
      {
        name: 'South African History Online',
        tag: 'Free, open history for the next generation.',
        note: {
          term: 'Since 2010',
          body: 'Technical lead and digital transformation. Drupal, self-hosted, no per-user licensing. No paygate, free for all.',
        },
        paragraphs: [
          'South African History Online is one of the largest free history archives on the continent, and it has stayed free. Mads has been its technical lead since 2010, now in his sixteenth year of using Drupal to keep the archive in front of the public, while Phoenix leads its ongoing digital transformation.',
          'The work is about reach: making sure the archive lands with the next generation of readers, students and activists, not only the researchers who already know it is there. We renew and reinforce founder Omar Badsha\'s vision: no paygate, no subscription, history and information freely available to every learner and researcher.',
          'Open source is what keeps that promise affordable. Drupal, self-hosted infrastructure and no per-user licensing let the archive grow without a growing bill, and without ever putting knowledge behind a wall.',
        ],
        link: 'Visit sahistory.org.za',
      },
    ],
  },
  who: {
    heading: 'Who we are',
    lede: 'Two people. No handoffs.',
    people: [
      {
        name: 'Phoenix',
        paragraphs: [
          'Phoenix has spent fifteen years building things that actually ship. Creative productions with SoldierMuse in Cape Town. Supply chain operations at Hummel International in Denmark. Now leading the digital transformation of South African History Online from Skanderborg.',
          'The consistent thread: closing the gap between what a project promises and what it delivers. SCRUM certified, experienced with distributed international teams, comfortable where creative direction and operational precision meet.',
          'English native, Danish conversational. Denmark-based, available anywhere.',
        ],
      },
      {
        name: 'Mads',
        paragraphs: [
          'Senior developer and DevOps engineer. Self-taught, fifteen years building on Drupal, PHP, Docker and Linux. Senior developer and DevOps engineer at Eksponent, a Danish development agency. Technical lead for South African History Online since 2010.',
          'Today he runs self-hosted infrastructure across European servers, the same move off expensive cloud that Fenix brings to its clients. Comfortable at every layer of the stack, from containers and CI/CD to headless CMS and frontend, he builds the systems that make delivery reliable and independence practical.',
          'Skanderborg, Denmark.',
        ],
      },
    ],
    closing: 'Fenix Nordic is a small, hands-on consultancy. You work directly with the people building your project. No account managers, no handoffs. Every engagement starts with a shared definition of done.',
  },
  contact: {
    heading: 'Contact',
    lede: 'Tell us about your project, or your cloud bill.',
    sub: 'We reply within one business day.',
    address: 'Denmark-based, working anywhere',
    cvr: 'CVR',
    form: {
      name: 'Your name',
      company: 'Company (optional)',
      email: 'Email address',
      message: 'How can we help?',
      submit: 'Send message',
      sending: 'Sending',
      success: 'Message sent. We will be in touch soon.',
      error: 'Something went wrong. Please try again or email us directly.',
    },
  },
  footer: {
    country: 'Denmark',
    top: 'Back to the top',
  },
  case: {
    back: 'Back to products',
    demo: 'Open the interactive demo',
    kicker: 'Case study',
  },
  error: {
    title: 'That page does not exist.',
    body: 'The address may be old or mistyped.',
    home: 'Go to the front page',
  },
}

export default en
