export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/seo'],

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
      headers: {
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://analytics.theazanianprepper.online",
          "style-src 'self' 'unsafe-inline'",
          "font-src 'self' data:",
          "img-src 'self' data:",
          "connect-src 'self' https://analytics.theazanianprepper.online",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "upgrade-insecure-requests",
        ].join('; '),
      },
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
