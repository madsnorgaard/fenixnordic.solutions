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
            'Project management, logistics and IT solutions for ambitious businesses. Based in Skanderborg, Denmark.',
        },
        { name: 'theme-color', content: '#0b0b10' },
        { property: 'og:title', content: 'Fenix Nordic Solutions' },
        {
          property: 'og:description',
          content: 'Project management, logistics and IT solutions for ambitious businesses.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://fenixnordic.solutions' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap',
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
