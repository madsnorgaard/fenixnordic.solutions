export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://fenixnordic.solutions',
    name: 'Fenix Nordic Solutions',
    description: 'Digital delivery for ambitious businesses. Open source technology, AI-assisted workflows, and acceptance criteria agreed before work begins. Based in Skanderborg, Denmark.',
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
      description: 'Digital delivery for ambitious businesses. Open source technology, AI-assisted workflows, and acceptance criteria agreed before work begins.',
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
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
