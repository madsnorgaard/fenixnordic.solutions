// The previous site stored the language choice in localStorage and served
// Danish on the root URL. Send those visitors to /da once, then forget the key.
export default defineNuxtPlugin(() => {
  const router = useRouter()
  router.isReady().then(() => {
    try {
      const stored = localStorage.getItem('fenix_locale')
      if (stored === null) return
      localStorage.removeItem('fenix_locale')
      if (stored === 'da' && router.currentRoute.value.path === '/') {
        // eslint-disable-next-line link-checker/valid-sitemap-link
        navigateTo('/da', { replace: true })
      }
    }
    catch {
      // storage unavailable
    }
  })
})
