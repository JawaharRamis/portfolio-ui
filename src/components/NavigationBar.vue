<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{ 'py-3': !isScrolled, 'py-2': isScrolled }"
    :style="{ backgroundColor: 'var(--color-nav-bg)' }"
  >
    <!-- Scroll Progress Bar -->
    <div
      class="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
      :style="{ backgroundColor: 'var(--color-accent)', width: `${scrollProgress}%` }"
    ></div>

    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between">
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
            class="text-sm font-sans transition-colors relative py-2"
            :style="{ color: activeSection === section.id ? 'var(--color-text)' : 'var(--color-text-muted)' }"
            :class="{ 'font-medium': activeSection === section.id }"
            @mouseenter="handleMouseEnter($event, section.id)"
            @mouseleave="handleMouseLeave($event)"
            @click.prevent="scrollToSection(section.id)"
          >
            {{ section.label }}
            <span
              v-if="activeSection === section.id"
              class="absolute -bottom-0.5 left-0 right-0 h-0.5 transition-colors"
              :style="{ backgroundColor: 'var(--color-accent)' }"
            ></span>
          </a>
          <button
            @click="$emit('open-contact')"
            class="px-4 py-2 text-sm font-sans rounded-lg transition-all duration-300"
            :style="{
              backgroundColor: 'var(--color-text)',
              color: 'var(--color-bg)'
            }"
            @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent)'"
            @mouseleave="$event.target.style.backgroundColor = ''"
          >
            Contact
          </button>
          <ThemeToggle />
        </div>

        <!-- Mobile Menu Button & Theme Toggle -->
        <div class="flex items-center gap-2 md:hidden">
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
          <ThemeToggle :is-small="true" />
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
        class="md:hidden py-4 border-t mt-3"
        :style="{ borderColor: 'var(--color-border)' }"
      >
        <a
          v-for="section in sections"
          :key="section.id"
          href="#"
          class="block py-3 text-sm font-sans transition-colors"
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
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

defineEmits(['open-contact'])

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'academic', label: 'Academic' },
  { id: 'artwork', label: 'Artwork' }
]

const activeSection = ref('hero')
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleMouseEnter = (event, sectionId) => {
  event.target.style.color = 'var(--color-text)'
}

const handleMouseLeave = (event) => {
  if (activeSection.value !== event.target.hash) {
    event.target.style.color = 'var(--color-text-muted)'
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20

  // Calculate scroll progress
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

  // Determine active section
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
