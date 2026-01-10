import { ref, watch, onMounted } from 'vue'

const themes = ['sandstone', 'deep-ocean', 'slate-blush']
const STORAGE_KEY = 'portfolio-theme'

const currentTheme = ref('sandstone')

export function useTheme() {
  const getTheme = () => currentTheme.value
  const setTheme = (theme) => {
    if (themes.includes(theme)) {
      currentTheme.value = theme
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem(STORAGE_KEY, theme)
    }
  }

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const toggleDropdown = ref(false)

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && themes.includes(saved)) {
      setTheme(saved)
    } else {
      setTheme('sandstone')
    }
  })

  return {
    currentTheme,
    themes,
    getTheme,
    setTheme,
    cycleTheme,
    toggleDropdown
  }
}
