<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isScrolled ? 'py-3 nav-scrolled' : 'py-5'"
    :style="{
      backgroundColor: isScrolled || mobileMenuOpen ? 'var(--color-nav-bg)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled && !mobileMenuOpen ? '1px solid var(--color-nav-border)' : '1px solid transparent'
    }"
  >
    <div class="max-w-[90rem] mx-auto px-6 lg:px-10">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a
          href="#hero"
          class="font-serif text-sm tracking-[0.12em] uppercase transition-opacity duration-300 hover:opacity-60"
          :style="{ color: 'var(--color-text)' }"
          @click.prevent="scrollToSection('hero')"
        >
          Akshatha Kelat
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-0">
          <a
            v-for="section in sections"
            :key="section.id"
            href="#"
            class="nav-link relative px-5 py-2 text-[0.7rem] font-sans uppercase tracking-[0.14em] transition-colors duration-300"
            :style="{
              color: activeSection === section.id ? 'var(--color-text)' : 'var(--color-text-muted)'
            }"
            @click.prevent="scrollToSection(section.id)"
          >
            {{ section.label }}
            <!-- Active dot indicator -->
            <span
              class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
              :style="{
                backgroundColor: 'var(--color-accent)',
                opacity: activeSection === section.id ? '1' : '0',
                transform: activeSection === section.id ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)'
              }"
            ></span>
          </a>

          <!-- Divider -->
          <div class="h-4 w-px mx-4" :style="{ backgroundColor: 'var(--color-border)' }"></div>

          <!-- Language Switcher -->
          <div class="relative">
            <button
              ref="languageButton"
              @click="toggleLanguageDropdown"
              class="px-3 py-1.5 text-[0.7rem] font-sans uppercase tracking-[0.14em] transition-colors duration-300"
              :style="{ color: 'var(--color-text-muted)' }"
            >
              {{ locale.toUpperCase() }}
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="languageDropdownOpen"
                class="absolute top-full right-0 mt-2 py-1 min-w-[72px] overflow-hidden"
                :style="{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }"
              >
                <button
                  v-for="lang in availableLocales"
                  :key="lang.value"
                  @click="switchLanguage(lang.value)"
                  class="w-full px-4 py-2 text-left text-[0.7rem] font-sans uppercase tracking-[0.14em] transition-colors duration-200"
                  :style="{
                    color: locale === lang.value ? 'var(--color-accent)' : 'var(--color-text-muted)'
                  }"
                >
                  {{ lang.label }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Contact CTA -->
          <button
            @click="$emit('open-contact')"
            class="ml-3 px-5 py-2 text-[0.7rem] font-sans uppercase tracking-[0.14em] transition-all duration-300"
            :style="{
              backgroundColor: 'var(--color-text)',
              color: 'var(--color-bg)'
            }"
            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--color-accent)'"
            @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--color-text)'"
          >
            {{ $t('footer.contact') }}
          </button>
        </div>

        <!-- Mobile Controls -->
        <div class="flex items-center gap-2 md:hidden">
          <!-- Language -->
          <div class="relative">
            <button
              ref="mobileLanguageButton"
              @click="toggleMobileLanguageDropdown"
              class="px-2 py-1.5 text-[0.7rem] font-sans uppercase tracking-[0.14em]"
              :style="{ color: 'var(--color-text-muted)' }"
            >
              {{ locale.toUpperCase() }}
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="mobileLanguageDropdownOpen"
                class="absolute top-full right-0 mt-2 py-1 min-w-[72px] overflow-hidden z-50"
                :style="{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }"
              >
                <button
                  v-for="lang in availableLocales"
                  :key="lang.value"
                  @click="switchLanguage(lang.value)"
                  class="w-full px-4 py-2 text-left text-[0.7rem] font-sans uppercase tracking-[0.14em] transition-colors duration-200"
                  :style="{ color: locale === lang.value ? 'var(--color-accent)' : 'var(--color-text-muted)' }"
                >
                  {{ lang.label }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Hamburger -->
          <button
            class="p-2 transition-colors"
            :style="{ color: 'var(--color-text-muted)' }"
            @click="mobileMenuOpen = !mobileMenuOpen"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h10M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-3"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden pt-6 pb-4 mt-3 border-t"
          :style="{ borderColor: 'var(--color-border)' }"
        >
          <div class="flex flex-col gap-0.5">
            <a
              v-for="section in sections"
              :key="section.id"
              href="#"
              class="flex items-center gap-3 px-1 py-3 text-[0.7rem] font-sans uppercase tracking-[0.14em] transition-colors duration-200"
              :style="{
                color: activeSection === section.id ? 'var(--color-text)' : 'var(--color-text-muted)'
              }"
              @click.prevent="scrollToSection(section.id); mobileMenuOpen = false"
            >
              <span
                class="w-1 h-1 rounded-full transition-all duration-300"
                :style="{
                  backgroundColor: 'var(--color-accent)',
                  opacity: activeSection === section.id ? '1' : '0'
                }"
              ></span>
              {{ section.label }}
            </a>
          </div>
          <div class="mt-4 pt-4 border-t" :style="{ borderColor: 'var(--color-border)' }">
            <button
              @click="$emit('open-contact'); mobileMenuOpen = false"
              class="w-full py-3 text-[0.7rem] font-sans uppercase tracking-[0.14em] transition-all duration-300"
              :style="{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }"
            >
              {{ $t('footer.contact') }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineEmits(['open-contact'])

const { t, locale } = useI18n()

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
  if (languageDropdownOpen.value && !event.target.closest('.relative')) {
    languageDropdownOpen.value = false
  }
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

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40

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
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('click', closeDropdowns)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', closeDropdowns)
})
</script>
