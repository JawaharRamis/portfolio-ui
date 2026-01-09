<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Name -->
        <a href="#hero" class="text-lg font-serif font-medium text-gray-900 hover:text-gray-600 transition-colors">
          ARCHITECT
        </a>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="'#' + section.id"
            class="text-sm font-sans text-gray-600 hover:text-gray-900 transition-colors"
            :class="{ 'text-gray-900 font-medium': activeSection === section.id }"
            @click.prevent="scrollToSection(section.id)"
          >
            {{ section.label }}
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-gray-600 hover:text-gray-900"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden py-4 border-t border-gray-100"
      >
        <a
          v-for="section in sections"
          :key="section.id"
          :href="'#' + section.id"
          class="block py-2 text-sm font-sans text-gray-600 hover:text-gray-900 transition-colors"
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

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'artwork', label: 'Artwork' }
]

const activeSection = ref('hero')
const mobileMenuOpen = ref(false)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
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
