import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

const messages = {
  en,
  de
}

const getSavedLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['en', 'de'].includes(savedLocale)) {
    return savedLocale
  }
  const browserLang = navigator.language?.split('-')[0]
  if (['en', 'de'].includes(browserLang)) {
    return browserLang
  }
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages
})

export default i18n
