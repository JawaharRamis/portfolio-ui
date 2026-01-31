<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled ? 'py-3' : 'py-6',
      mobileMenuOpen ? 'bg-[var(--color-bg)]' : ''
    ]"
    :style="{ backgroundColor: isScrolled || mobileMenuOpen ? 'var(--color-bg)' : 'transparent' }"
  >
    <!-- Border bottom when scrolled -->
    <div
      v-if="isScrolled && !mobileMenuOpen"
      class="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
      :style="{ backgroundColor: 'var(--color-border)' }"
    ></div>

    <div class="max-w-[90rem] mx-auto px-6">
      <div class="flex items-center justify-between">
        <!-- Logo / Name -->
        <a
          href="#hero"
          class="text-lg font-serif font-medium tracking-tight transition-colors hover:opacity-70"
          :style="{ color: 'var(--color-text)' }"
          @click.prevent="scrollToSection('hero')"
        >
          AKSHATHA KELAT
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="section in sections"
            :key="section.id"
            href="#"
            class="relative px-4 py-2 text-xs font-sans uppercase tracking-[0.1em] transition-all duration-300"
            :class="[
              activeSection === section.id ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            ]"
            @mouseenter="handleMouseEnter($event, section.id)"
            @mouseleave="handleMouseLeave($event)"
            @click.prevent="scrollToSection(section.id)"
          >
            {{ section.label }}
            <!-- Active indicator -->
            <span
              v-if="activeSection === section.id"
              class="absolute bottom-1 left-4 right-4 h-px transition-all duration-300"
              :style="{ backgroundColor: 'var(--color-accent)' }"
            ></span>
          </a>

          <div class="flex items-center gap-2 ml-4 pl-4 border-l" :style="{ borderColor: 'var(--color-border)' }">
            <!-- Contact Button -->
            <button
              @click="$emit('open-contact')"
              class="px-4 py-2 text-xs font-sans uppercase tracking-[0.1em] transition-all duration-300"
              :style="{
                backgroundColor: 'var(--color-text)',
                color: 'var(--color-bg)'
              }"
              @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent)'"
              @mouseleave="$event.target.style.backgroundColor = ''"
            >
              {{ $t('footer.contact') }}
            </button>

            <!-- Theme Toggle -->
            <div class="relative">
              <button
                @click="cycleTheme"
                class="p-2 transition-colors"
                :style="{ color: 'var(--color-text-muted)' }"
                aria-label="Toggle theme"
              >
                <svg v-if="currentTheme === 'sandstone'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg v-else-if="currentTheme === 'deep-ocean'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <!-- Language Switcher -->
            <div class="relative">
              <button
                ref="languageButton"
                @click="toggleLanguageDropdown"
                class="px-2 py-1 text-xs font-sans uppercase tracking-[0.1em] transition-colors hover:text-[var(--color-text)]"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                {{ locale.toUpperCase() }}
              </button>
              <!-- Language Dropdown -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2"
              >
                <div
                  v-if="languageDropdownOpen"
                  class="absolute top-full right-0 mt-2 py-1 min-w-[80px] rounded-lg shadow-lg overflow-hidden"
                  :style="{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }"
                >
                  <button
                    v-for="lang in availableLocales"
                    :key="lang.value"
                    @click="switchLanguage(lang.value)"
                    class="w-full px-4 py-2 text-left text-xs font-sans uppercase tracking-[0.1em] transition-colors"
                    :class="locale === lang.value ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'"
                  >
                    {{ lang.label }}
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button & Controls -->
        <div class="flex items-center gap-3 md:hidden">
          <!-- Contact Icon -->
          <button
            @click="$emit('open-contact')"
            class="p-2 transition-colors"
            :style="{ color: 'var(--color-text-muted)' }"
            aria-label="Contact"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>

          <!-- Theme Toggle -->
          <button
            @click="cycleTheme"
            class="p-2 transition-colors"
            :style="{ color: 'var(--color-text-muted)' }"
            aria-label="Toggle theme"
          >
            <svg v-if="currentTheme === 'sandstone'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else-if="currentTheme === 'deep-ocean'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>

          <!-- Language Switcher -->
          <div class="relative">
            <button
              ref="mobileLanguageButton"
              @click="toggleMobileLanguageDropdown"
              class="px-2 py-1 text-xs font-sans uppercase tracking-[0.1em]"
              :style="{ color: 'var(--color-text-muted)' }"
            >
              {{ locale.toUpperCase() }}
            </button>
            <!-- Mobile Language Dropdown -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-2"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-2"
            >
              <div
                v-if="mobileLanguageDropdownOpen"
                class="absolute top-full right-0 mt-2 py-1 min-w-[80px] rounded-lg shadow-lg overflow-hidden z-50"
                :style="{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }"
              >
                <button
                  v-for="lang in availableLocales"
                  :key="lang.value"
                  @click="switchLanguage(lang.value)"
                  class="w-full px-4 py-2 text-left text-xs font-sans uppercase tracking-[0.1em] transition-colors"
                  :class="locale === lang.value ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'"
                >
                  {{ lang.label }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Menu Toggle -->
          <button
            class="p-2 transition-colors"
            :style="{ color: 'var(--color-text-muted)' }"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden py-6 mt-4 border-t"
          :style="{ borderColor: 'var(--color-border)' }"
        >
          <div class="flex flex-col gap-1">
            <a
              v-for="section in sections"
              :key="section.id"
              href="#"
              class="px-2 py-3 text-sm font-sans uppercase tracking-[0.1em] transition-colors"
              :class="[
                activeSection === section.id ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'
              ]"
              :style="{ color: activeSection === section.id ? 'var(--color-text)' : 'var(--color-text-muted)' }"
              @click.prevent="scrollToSection(section.id); mobileMenuOpen = false"
            >
              {{ section.label }}
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

defineEmits(['open-contact'])

const { t, locale } = useI18n()
const { currentTheme, cycleTheme } = useTheme()

const sections = computed(() => [
  { id: 'hero', label: t('nav.home') },
  { id: 'about', label: t('nav.about') },
  { id: 'projects', label: t('nav.projects') },
  { id: 'academic', label: t('nav.academic') },
  { id: 'artwork', label: t('nav.artwork') }
])

const activeSection = ref('hero')
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const languageDropdownOpen = ref(false)
const mobileLanguageDropdownOpen = ref(false)

const availableLocales = [
  { label: 'EN', value: 'en' },
  { label: 'DE', value: 'de' }
]

const switchLanguage = (newLocale) => {
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  languageDropdownOpen.value = false
  mobileLanguageDropdownOpen.value = false
}

const toggleLanguageDropdown = () => {
  languageDropdownOpen.value = !languageDropdownOpen.value
  mobileLanguageDropdownOpen.value = false
}

const toggleMobileLanguageDropdown = () => {
  mobileLanguageDropdownOpen.value = !mobileLanguageDropdownOpen.value
  languageDropdownOpen.value = false
}

const closeDropdowns = (event) => {
  // Close desktop dropdown if clicking outside
  if (languageDropdownOpen.value && !event.target.closest('.relative')) {
    languageDropdownOpen.value = false
  }
  // Close mobile dropdown if clicking outside
  if (mobileLanguageDropdownOpen.value && !event.target.closest('.relative')) {
    mobileLanguageDropdownOpen.value = false
  }
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const handleMouseEnter = (event, sectionId) => {
  event.target.style.color = 'var(--color-text)'
}

const handleMouseLeave = (event) => {
  if (activeSection.value !== sectionId) {
    event.target.style.color = 'var(--color-text-muted)'
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40

  // Determine active section
  const scrollPosition = window.scrollY + 120

  for (const section of sections.value) {
    const element = document.getElementById(section.id)
    if (element) {
      const { top, bottom } = element.getBoundingClientRect()
      const absoluteTop = top + window.scrollY
      const absoluteBottom = bottom + window.scrollY

      if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
        activeSection.value = section.id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', closeDropdowns)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', closeDropdowns)
})
</script>