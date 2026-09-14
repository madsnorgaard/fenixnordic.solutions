const SITE_URL = 'https://fenixnordic.solutions'
const SITE_NAME = 'Fenix Nordic Solutions'
const SITE_DESCRIPTION
  = 'Open source systems for Danish municipalities and Nordic teams, hosted in Europe and owned outright. '
    + 'IT cost audits, off-cloud migration, custom builds, and the AabenForms and AabenIntra platforms. Based in Skanderborg, Denmark.'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },
  ssr: true,

  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/content', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  experimental: {
    viewTransition: true,
  },

  i18n: {
    baseUrl: SITE_URL,
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en', file: 'en.ts', name: 'English' },
      { code: 'da', language: 'da-DK', file: 'da.ts', name: 'Dansk' },
    ],
    experimental: {
      typedOptionsAndMessages: 'default',
    },
  },

  content: {
    experimental: {
      nativeSqlite: true,
    },
    renderer: {
      anchorLinks: false,
    },
  },

  site: {
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    defaultLocale: 'en',
  },

  robots: {
    groups: [{ userAgent: '*', allow: '/' }],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      description: SITE_DESCRIPTION,
      address: {
        type: 'PostalAddress',
        addressLocality: 'Skanderborg',
        addressCountry: 'DK',
      },
    },
  },

  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'theme-color', content: '#0f0d0b' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/bricolage-grotesque-latin.woff2',
          crossorigin: 'anonymous',
        },
      ],
      script: [
        {
          'defer': true,
          'data-domain': 'fenixnordic.solutions',
          'src': 'https://analytics.theazanianprepper.online/js/script.file-downloads.hash.outbound-links.js',
        },
        {
          innerHTML: 'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }',
        },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/da', '/aabenforms', '/aabenintra', '/da/aabenforms', '/da/aabenintra'],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },
})
