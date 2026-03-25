export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Fenix Nordic Solutions',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Digital delivery for ambitious businesses. Open source technology, AI-assisted workflows, and acceptance criteria agreed before work begins. Based in Skanderborg, Denmark.',
        },
        { name: 'theme-color', content: '#0b0b10' },
        { property: 'og:title', content: 'Fenix Nordic Solutions' },
        {
          property: 'og:description',
          content: 'Digital delivery for ambitious businesses. Open source technology, AI-assisted workflows, and acceptance criteria agreed before work begins.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://fenixnordic.solutions' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
