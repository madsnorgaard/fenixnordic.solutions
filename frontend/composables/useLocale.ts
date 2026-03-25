export type Locale = 'en' | 'da'

export const useLocale = () => {
  const locale = useState<Locale>('locale', () => 'en')

  const setLocale = (lang: Locale) => {
    locale.value = lang
    if (import.meta.client) {
      localStorage.setItem('fenix_locale', lang)
      document.documentElement.lang = lang
    }
  }

  // Restore from localStorage after hydration — avoids SSR/client mismatch
  onMounted(() => {
    const saved = localStorage.getItem('fenix_locale') as Locale | null
    if (saved === 'en' || saved === 'da') {
      locale.value = saved
      document.documentElement.lang = saved
    }
  })

  return { locale, setLocale }
}
