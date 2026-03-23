<template>
  <footer id="footer" class="py-16 lg:py-20" :style="{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }">
    <div class="max-w-[90rem] mx-auto px-6 lg:px-10">

      <!-- Main footer row -->
      <div class="grid md:grid-cols-3 gap-12 mb-14">

        <!-- Brand / Left -->
        <div>
          <p class="font-serif text-lg tracking-tight mb-3" :style="{ color: 'var(--color-text)' }">Akshatha Kelat</p>
          <p class="text-xs font-sans uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--color-text-light)' }">
            {{ $t('footer.architecture') }}
          </p>
          <p
            v-if="profile?.bio"
            class="text-xs font-sans leading-[1.85] max-w-[28ch]"
            :style="{ color: 'var(--color-text-muted)' }"
          >
            {{ profile.bio.slice(0, 120) }}{{ profile.bio.length > 120 ? '...' : '' }}
          </p>
        </div>

        <!-- Navigation / Center -->
        <div class="flex flex-col gap-3">
          <p class="text-[0.6rem] font-sans uppercase tracking-[0.2em] mb-2" :style="{ color: 'var(--color-text-light)' }">
            {{ $t('footer.quickLinks') }}
          </p>
          <a
            v-for="section in sections"
            :key="section.id"
            href="#"
            class="text-xs font-sans uppercase tracking-[0.1em] transition-colors duration-200 w-fit"
            :style="{ color: 'var(--color-text-muted)' }"
            @click.prevent="scrollToSection(section.id)"
            @mouseenter="e => e.currentTarget.style.color = 'var(--color-accent)'"
            @mouseleave="e => e.currentTarget.style.color = ''"
          >
            {{ section.label }}
          </a>
        </div>

        <!-- Contact + Social / Right -->
        <div>
          <p class="text-[0.6rem] font-sans uppercase tracking-[0.2em] mb-4" :style="{ color: 'var(--color-text-light)' }">
            {{ $t('footer.contact') }}
          </p>
          <div class="space-y-2 mb-6">
            <a
              v-if="profile?.contact?.email"
              :href="`mailto:${profile.contact.email}`"
              class="block text-xs font-sans transition-colors duration-200"
              :style="{ color: 'var(--color-text-muted)' }"
              @mouseenter="e => e.currentTarget.style.color = 'var(--color-accent)'"
              @mouseleave="e => e.currentTarget.style.color = ''"
            >
              {{ profile.contact.email }}
            </a>
            <p
              v-if="profile?.contact?.location"
              class="text-xs font-sans"
              :style="{ color: 'var(--color-text-light)' }"
            >
              {{ profile.contact.location }}
            </p>
          </div>

          <!-- Social icons -->
          <div class="flex items-center gap-3">
            <a
              v-if="profile?.contact?.social?.linkedin"
              :href="profile.contact.social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              :style="{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }"
              aria-label="LinkedIn"
              @mouseenter="e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }"
              @mouseleave="e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = '' }"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              v-if="profile?.contact?.social?.instagram"
              :href="profile.contact.social.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              :style="{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }"
              aria-label="Instagram"
              @mouseenter="e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }"
              @mouseleave="e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = '' }"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8"
        :style="{ borderTop: '1px solid var(--color-border)' }"
      >
        <!-- Copyright -->
        <p class="text-[0.65rem] font-sans" :style="{ color: 'var(--color-text-light)' }">
          &copy; {{ new Date().getFullYear() }} {{ profile?.name || 'Akshatha Kelat' }}
        </p>

        <!-- Theme toggles (3 circles) -->
        <div class="flex items-center gap-2" role="group" aria-label="Select color theme">
          <button
            v-for="theme in themes"
            :key="theme.id"
            class="theme-dot transition-all duration-300"
            :style="{
              backgroundColor: theme.color,
              outline: currentTheme === theme.id ? `2px solid var(--color-text)` : '2px solid transparent',
              outlineOffset: '2px'
            }"
            @click="setTheme(theme.id)"
            :aria-label="`${theme.label} theme`"
            :aria-pressed="currentTheme === theme.id"
          ></button>
        </div>

        <!-- Get in touch -->
        <button
          @click="$emit('open-contact')"
          class="text-[0.65rem] font-sans uppercase tracking-[0.15em] transition-colors duration-200"
          :style="{ color: 'var(--color-text-muted)' }"
          @mouseenter="e => e.currentTarget.style.color = 'var(--color-accent)'"
          @mouseleave="e => e.currentTarget.style.color = ''"
        >
          {{ $t('footer.getInTouch') }}
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'
import { useTheme } from '@/composables/useTheme'

defineEmits(['open-contact'])

const { t, locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const { currentTheme, cycleTheme } = useTheme()
const profile = ref(null)

const themes = [
  { id: 'sandstone', label: 'Sandstone', color: '#B8653A' },
  { id: 'deep-ocean', label: 'Deep Ocean', color: '#0D1117' },
  { id: 'slate-blush', label: 'Slate Blush', color: '#C4727A' }
]

const setTheme = (themeId) => {
  // Cycle until we reach the target theme
  let attempts = 0
  while (currentTheme.value !== themeId && attempts < 3) {
    cycleTheme()
    attempts++
  }
}

const loadProfile = async () => {
  profile.value = await loadLocalizedContent('profile')
}

onMounted(loadProfile)
watch(locale, loadProfile)

const sections = computed(() => [
  { id: 'hero', label: t('nav.home') },
  { id: 'about', label: t('nav.about') },
  { id: 'projects', label: t('nav.projects') },
  { id: 'academic', label: t('nav.academic') },
  { id: 'artwork', label: t('nav.artwork') }
])

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease, outline-color 0.2s ease;
}

.theme-dot:hover {
  transform: scale(1.2);
}
</style>
