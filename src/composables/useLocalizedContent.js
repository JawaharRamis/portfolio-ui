import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import staticData from '@/data/static.json'

export function useLocalizedContent() {
  const { locale } = useI18n()
  const cache = ref({})
  const loading = ref({})

  const loadData = async (section, id = null) => {
    const currentLocale = locale.value
    const cacheKey = id ? `${section}-${id}` : section

    // Check cache first
    if (cache.value[cacheKey] !== undefined && !loading.value[cacheKey]) {
      return cache.value[cacheKey]
    }

    loading.value[cacheKey] = true

    try {
      if (id) {
        // Load single item (project or artwork)
        const localizedModule = await import(
          `../data/${section}/${id}/${currentLocale}.json`
        )
        const staticItem = staticData[section]?.[id] || {}

        cache.value[cacheKey] = {
          ...staticItem,
          ...localizedModule.default
        }
      } else {
        // Load all items for section
        const staticSection = staticData[section] || {}

        if (section === 'profile') {
          // Profile is a single object
          const localizedModule = await import(
            `../data/${section}/${currentLocale}.json`
          )
          cache.value[cacheKey] = {
            ...staticSection,
            ...localizedModule.default
          }
        } else {
          // Projects or artwork - load all folders
          const items = []
          const ids = Object.keys(staticSection)

          for (const itemId of ids) {
            try {
              const localizedModule = await import(
                `../data/${section}/${itemId}/${currentLocale}.json`
              )
              items.push({
                ...staticSection[itemId],
                ...localizedModule.default
              })
            } catch (e) {
              console.warn(`Failed to load ${section}/${itemId}/${currentLocale}.json`)
            }
          }

          // Sort by id
          items.sort((a, b) => (a.id || 0) - (b.id || 0))
          cache.value[cacheKey] = items
        }
      }
    } catch (e) {
      console.warn(`Failed to load ${section}/${currentLocale}.json`)
      cache.value[cacheKey] = id ? null : []
    } finally {
      loading.value[cacheKey] = false
    }

    return cache.value[cacheKey]
  }

  // Auto-reload when locale changes
  watch(locale, () => {
    cache.value = {}
  })

  return {
    loadLocalizedContent: loadData
  }
}
