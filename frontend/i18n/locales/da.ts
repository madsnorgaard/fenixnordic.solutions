import type { Messages } from '../types'

const da: Messages = {
  meta: {
    title: 'Fenix Nordic Solutions',
    description: 'Open source-systemer til danske kommuner og nordiske teams, hostet i Europa og ejet fuldt ud. IT-omkostningsanalyser, migrering væk fra cloud, specialbyggede løsninger og platformene AabenForms og AabenIntra. Skanderborg, Danmark.',
  },
  nav: {
    label: 'Sitet',
    contact: 'Kontakt',
    skip: 'Spring til indhold',
    language: 'Sprog',
  },
  hero: {
    line1: 'Ej systemet.',
    line2: 'Skær i regningen.',
    lede: 'Fenix Nordic bygger open source-systemer til danske kommuner og nordiske teams: hostet i Europa, ejet fuldt ud og prissat efter arbejdet, ikke efter licensen. Fra Skanderborg, leveret hvor som helst.',
    primary: 'Tal med os',
    secondary: 'Se AabenForms',
  },
  how: {
    heading: 'Sådan arbejder vi',
    lede: 'Fra analysen til den dag I selv driver det.',
    steps: [
      {
        term: 'Analysér',
        body: 'Vi kortlægger jeres licenser, hosting og arbejdsgange og finder, hvor I betaler for infrastruktur, I ikke har brug for. I får et klart billede af omkostningerne og en realistisk plan for at sænke dem.',
      },
      {
        term: 'Byg',
        body: 'Vi flytter jer over på rigtigt dimensioneret europæisk hosting og open source-værktøjer og bygger de specifikke applikationer, jeres arbejdsgang kræver. Vi bruger AI, hvor det fremskynder leveringen, aldrig hvor det øger risikoen.',
      },
      {
        term: 'Ej',
        body: 'Hvert system er dokumenteret, testbart og jeres at drive. Ingen leverandørlåsning, ingen overraskelser pr. bruger, ingen afhængigheder I ikke kan skære fra.',
      },
    ],
  },
  services: {
    heading: 'Hvad vi gør',
    lede: 'Færre licenser. Mere der er jeres.',
    items: [
      {
        term: 'Analyse',
        title: 'IT-omkostnings- og licensanalyse',
        body: 'Vi analyserer jeres softwarelicenser, SaaS-abonnementer og cloud-hosting op mod, hvad virksomheden reelt bruger. I får en prioriteret liste over, hvad der kan skæres, erstattes eller nedskaleres, med besparelsen sat på.',
      },
      {
        term: 'Migrering',
        title: 'Migrering væk fra cloud',
        body: 'Flyt fra overdimensioneret cloud over på jeres egne servere eller en europæisk VPS. Samme driftssikkerhed til en brøkdel af regningen, og jeres data under jeres kontrol og EU-jurisdiktion.',
      },
      {
        term: 'Specialbygget',
        title: 'Specialbyggede open source-løsninger',
        body: 'Når et dyrt værktøj kun løser en del af problemet, bygger vi den applikation, der løser resten, på open source-fundament, I selv ejer. AI-assisteret levering holder det hurtigt og økonomisk.',
      },
      {
        term: 'Web',
        title: 'Hjemmesider, platforme og integration',
        body: 'Headless CMS, Nuxt- og Vue-frontends og de API-integrationer, der får jeres systemer til at tale sammen. Hurtige, vedligeholdelsesvenlige og uden låsning.',
      },
      {
        term: 'Drupal',
        title: 'Drupal-migrering, opgraderinger og support',
        body: 'Drupal er vores kerneplatform: seksten år med den, på projekter fra en enkelt side til store multisite-arkiver. Vi migrerer ældre sites, kører major-opgraderinger, retter mangeårige smertepunkter og udglatter den daglige friktion, jeres team har vænnet sig til at leve med.',
      },
      {
        term: 'Vedligehold',
        title: 'Løbende vedligeholdelse',
        body: 'Software, der ikke vedligeholdes, bliver hurtigt en risiko. Vi holder jeres stak opdateret, sikker og aktuel: afhængigheder, sikkerhedsudgivelser og platformsopdateringer håndteret som rutine, så problemer forebygges frem for at blive opdaget.',
      },
    ],
  },
  products: {
    heading: 'Produkter',
    lede: 'Open source-produkter, I selv ejer, ikke licensaftaler, I lejer.',
    items: [
      {
        name: 'AabenForms',
        kicker: 'Selvbetjening og sagsgange til kommuner',
        claim: 'Borgerrettede formularer og sagsgange, uden licens pr. formular.',
        paragraphs: [
          'AabenForms er en open source-platform til sikre digitale formularer og sagsgange: MitID-login, Digital Post og de godkendelsesflows, som offentligt og reguleret arbejde afhænger af. De proprietære alternativer tager betaling pr. formular, pr. bruger og pr. integration. Det gør AabenForms ikke.',
          'Bygget på Drupal og Nuxt og designet til at køre på infrastruktur, I selv styrer. Borgerdata bliver i EU og under jeres governance. I ejer platformen, formularerne og dataene, ikke en leverandør.',
        ],
        facts: 'Atten færdige kommunale flows, seks KOMBIT-integrationer, fire ESDH-systemer. GPL, så kommunen ejer løsningen.',
        status: {
          term: 'Ærlig status',
          body: 'Pre-pilot proof of concept, live på aabenforms.dk. Motoren, sagsmodellen, forgreningerne, fristerne, krypteringen og auditsporet er reelle. Det der mangler: Serviceplatformen-certifikater og en pilotkommune.',
        },
        video: {
          name: 'aabenforms-skoleskift-da',
          alt: 'AabenForms skoleskift-arbejdsgang, der eksekverer trin for trin med medunderskrift fra den anden forældremyndighedsindehaver',
          caption: 'Skoleskift ved fælles forældremyndighed, optaget mens det kører.',
          demo: '/aabenforms-demo-da.html',
        },
        links: {
          study: 'Læs casen',
          site: 'Besøg aabenforms.dk',
        },
      },
      {
        name: 'AabenIntra',
        kicker: 'Intranet til kommuner og organisationer',
        claim: 'Intranettet, jeres team faktisk åbner.',
        paragraphs: [
          'AabenIntra er et open source-intranet på Drupal 11: ét sted til nyheder, dokumenter, mennesker og de daglige værktøjer, teamet er afhængigt af. Personligt dashboard, målrettede nyheder, medarbejderoversigt med rigtig organisationsstruktur og en anerkendelsesvæg, der gør kollegers arbejde synligt.',
          'Det bygger på mange års arbejde med intranet og medarbejderoplevelse, blandt andet en prisvindende dansk arbejdsplads anerkendt for medarbejdertilfredshed. Et intranet betaler først sin pris, når folk åbner det, og det er præcis det, det er designet til. Dansk og engelsk fra dag ét, til nordiske teams og internationale arbejdspladser.',
        ],
        facts: 'Elleve egne moduler, tretten contrib-afhængigheder, to sprog. Fra 7.500 kr. om måneden, inklusive hosting og vedligehold.',
        status: {
          term: 'Ærlig status',
          body: 'Proof of concept med offentlig demo. Dashboard, nyheder, medarbejderoversigt, organisationsdiagram, anerkendelse og obligatorisk læsning er bygget. Søgning ud over Drupals indbyggede, notifikationer, kalender og undersøgelser er det ikke.',
        },
        image: {
          src: '/media/aabenintra/dashboard.webp',
          width: 960,
          height: 833,
          alt: 'AabenIntra-dashboardet med personlig hilsen, indholdsfliser med fotos og farvekodede afdelingsmærker',
          caption: 'Dashboardet. Fliserne størrelsessættes serverside, og rækkefølgen er medarbejderens egen.',
        },
        links: {
          study: 'Læs casen',
          site: 'Se den live demo',
        },
      },
    ],
  },
  cases: {
    heading: 'Cases',
    lede: 'Åbne arkiver, bygget til at holde.',
    items: [
      {
        name: 'South African History Online',
        tag: 'Fri, åben historie til den næste generation.',
        note: {
          term: 'Siden 2010',
          body: 'Teknisk lead og digital transformation. Drupal, selvhostet, ingen licens pr. bruger. Ingen betalingsmur, frit for alle.',
        },
        paragraphs: [
          'South African History Online er et af de største frie historiearkiver på kontinentet, og det er forblevet frit. Mads har været teknisk lead siden 2010, nu på sit sekstende år med at bruge Drupal til at holde arkivet tilgængeligt for offentligheden, mens Phoenix leder den løbende digitale transformation.',
          'Arbejdet handler om rækkevidde: at sikre, at arkivet når den næste generation af læsere, studerende og aktivister, ikke kun de forskere, der allerede kender det. Vi fornyer og styrker grundlægger Omar Badshas vision: ingen betalingsmur, intet abonnement, historie og viden frit tilgængelig for enhver lærende og forsker.',
          'Open source er det, der holder det løfte økonomisk. Drupal, selvhostet infrastruktur og ingen licens pr. bruger lader arkivet vokse uden en voksende regning, og uden nogensinde at sætte viden bag en mur.',
        ],
        link: 'Besøg sahistory.org.za',
      },
    ],
  },
  who: {
    heading: 'Hvem vi er',
    lede: 'To mennesker. Ingen videregivelser.',
    people: [
      {
        name: 'Phoenix',
        paragraphs: [
          'Phoenix har brugt femten år på at bygge ting, der rent faktisk bliver leveret. Kreative produktioner med SoldierMuse i Cape Town. Supply chain-drift hos Hummel International i Danmark. Nu leder hun den digitale transformation af South African History Online fra Skanderborg.',
          'Den røde tråd: at lukke hullet mellem det, et projekt lover, og det, der faktisk leveres. SCRUM-certificeret, erfaren i at lede distribuerede internationale teams, hjemme i det rum, hvor kreativ retning og operationel præcision mødes.',
          'Engelsk modersmål, dansk til daglig brug. Danmark-baseret, tilgængelig hvor som helst.',
        ],
      },
      {
        name: 'Mads',
        paragraphs: [
          'Senior udvikler og DevOps-ingeniør. Selvlært, femten år med Drupal, PHP, Docker og Linux. Senior udvikler og DevOps-ingeniør hos Eksponent, et dansk udviklingsbureau. Teknisk lead for South African History Online siden 2010.',
          'I dag driver han selvhostet infrastruktur på europæiske servere, netop det skift væk fra dyr cloud, som Fenix tilbyder sine kunder. Hjemme i alle lag af stacken, fra containere og CI/CD til headless CMS og frontend, bygger han de systemer, der gør levering pålidelig og uafhængighed praktisk mulig.',
          'Skanderborg, Danmark.',
        ],
      },
    ],
    closing: 'Fenix Nordic er en lille, praktisk konsulentvirksomhed. I arbejder direkte med dem, der bygger jeres projekt. Ingen account managers, ingen videregivelser. Hvert samarbejde starter med en fælles definition of done.',
  },
  contact: {
    heading: 'Kontakt',
    lede: 'Fortæl os om jeres projekt, eller jeres cloud-regning.',
    sub: 'Vi svarer inden for en arbejdsdag.',
    address: 'Danmark-baseret, arbejder hvor som helst',
    cvr: 'CVR',
    form: {
      name: 'Dit navn',
      company: 'Virksomhed (valgfrit)',
      email: 'E-mailadresse',
      message: 'Hvordan kan vi hjælpe?',
      submit: 'Send besked',
      sending: 'Sender',
      success: 'Besked sendt. Vi vender tilbage snarest.',
      error: 'Noget gik galt. Prøv igen eller skriv direkte til os.',
    },
  },
  footer: {
    country: 'Danmark',
    top: 'Til toppen',
  },
  case: {
    back: 'Tilbage til produkter',
    demo: 'Åbn den interaktive demo',
    kicker: 'Case',
  },
  error: {
    title: 'Den side findes ikke.',
    body: 'Adressen kan være gammel eller stavet forkert.',
    home: 'Gå til forsiden',
  },
}

export default da
