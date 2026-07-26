// Site Content-Security-Policy. frame-ancestors is a parameter so the
// self-hosted AabenForms live-demo widgets (iframed same-origin from the case
// study page) can opt into 'self' while every other route stays 'none'.
const csp = (frameAncestors: string): string => [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://analytics.theazanianprepper.online",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data:",
  "connect-src 'self' https://analytics.theazanianprepper.online",
  `frame-ancestors ${frameAncestors}`,
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ')

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/seo'],

  // The case studies are self-contained files in public/, served by nginx via
  // try_files. The link checker cannot resolve them to a Nuxt route, so it
  // reports a false 404 and fails the build. They are excluded here rather
  // than by weakening error reporting for every link on the site.
  linkChecker: {
    excludeLinks: ['/aabenforms', '/aabenintra'],
  },

  site: {
    url: 'https://fenixnordic.solutions',
    name: 'Fenix Nordic Solutions',
    description: 'We help small and medium businesses cut cloud and licence costs by moving onto European hosting and open source tools they own. IT audits, off-cloud migration, custom software, and the AabenForms and AabenIntra platforms. Based in Skanderborg, Denmark.',
    defaultLocale: 'en',
  },

  robots: {
    groups: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Fenix Nordic Solutions',
      url: 'https://fenixnordic.solutions',
      logo: 'https://fenixnordic.solutions/favicon.svg',
      description: 'We help small and medium businesses cut cloud and licence costs by moving onto European hosting and open source tools they own. IT audits, off-cloud migration, custom software, and the AabenForms and AabenIntra platforms.',
      address: {
        type: 'PostalAddress',
        addressLocality: 'Skanderborg',
        addressCountry: 'DK',
      },
    },
  },

  app: {
    head: {
      title: 'Fenix Nordic Solutions',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0b0b10' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      script: [
        {
          defer: true,
          'data-domain': 'fenixnordic.solutions',
          src: 'https://analytics.theazanianprepper.online/js/script.file-downloads.hash.outbound-links.js',
        },
        {
          innerHTML: "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }",
        },
      ],
    },
  },
  routeRules: {
    '/**': {
      headers: { 'Content-Security-Policy': csp("'none'") },
    },
    // Same-origin iframe embeds on the AabenForms case study page.
    '/aabenforms-demo-da.html': {
      headers: { 'Content-Security-Policy': csp("'self'") },
    },
    '/aabenforms-demo-en.html': {
      headers: { 'Content-Security-Policy': csp("'self'") },
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
      // The case studies are self-contained files in public/, served by nginx
      // via try_files. They are not Nuxt routes, so the link crawler must not
      // try to prerender them or the build fails on a 404 it cannot resolve.
      ignore: ['/aabenforms', '/aabenintra'],
    },
  },
})
