<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300"
    :style="{ backgroundColor: 'var(--color-nav-bg)', borderColor: 'var(--color-border)' }"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Name -->
        <a
          href="#hero"
          class="text-lg font-serif font-medium transition-colors"
          :style="{ color: 'var(--color-text)' }"
          @mouseenter="$event.target.style.color = 'var(--color-text-muted)'"
          @mouseleave="$event.target.style.color = ''"
        >
          ARCHITECT
        </a>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="section in sections"
            :key="section.id"
            href="#"
            class="text-sm font-sans transition-colors relative"
            :style="{ color: activeSection === section.id ? 'var(--color-text)' : 'var(--color-text-muted)' }"
            :class="{ 'font-medium': activeSection === section.id }"
            @mouseenter="$event.target.style.color = 'var(--color-text)'"
            @mouseleave="$event.target.style.color = ''"
            @click.prevent="scrollToSection(section.id)"
          >
            {{ section.label }}
            <span
              v-if="activeSection === section.id"
              class="absolute -bottom-1 left-0 right-0 h-px transition-colors"
              :style="{ backgroundColor: 'var(--color-accent)' }"
            ></span>
          </a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <!-- Mobile Menu Button & Theme Toggle -->
        <div class="flex items-center gap-2 md:hidden">
          <ThemeToggle :is-small="true" />
          <LanguageSwitcher />
          <button
            class="p-2 transition-colors"
            :style="{ color: 'var(--color-text-muted)' }"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden py-4 border-t"
        :style="{ borderColor: 'var(--color-border)' }"
      >
        <a
          v-for="section in sections"
          :key="section.id"
          href="#"
          class="block py-2 text-sm font-sans transition-colors"
          :style="{ color: 'var(--color-text-muted)' }"
          @mouseenter="$event.target.style.color = 'var(--color-text)'"
          @mouseleave="$event.target.style.color = ''"
          @click.prevent="scrollToSection(section.id); mobileMenuOpen = false"
        >
          {{ section.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()

const sections = computed(() => [
  { id: 'hero', label: t('nav.home') },
  { id: 'about', label: t('nav.about') },
  { id: 'projects', label: t('nav.projects') },
  { id: 'artwork', label: t('nav.artwork') }
])

const activeSection = ref('hero')
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
  const scrollPosition = window.scrollY + 100

  for (const section of sections) {
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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
