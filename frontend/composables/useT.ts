import { en } from '~/i18n/en'
import { da } from '~/i18n/da'

export const useT = () => {
  const { locale } = useLocale()
  return computed(() => (locale.value === 'en' ? en : da))
}
