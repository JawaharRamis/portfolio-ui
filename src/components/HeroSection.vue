<template>
  <section id="hero" class="relative min-h-screen flex items-center overflow-hidden" :style="{ backgroundColor: 'var(--color-bg)' }">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" :stroke="'var(--color-text)'" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>

    <!-- Gradient Accent -->
    <div
      class="absolute top-0 right-0 w-[60vw] h-[60vw] opacity-[0.04] pointer-events-none blur-3xl"
      :style="{ backgroundColor: 'var(--color-accent)', transform: 'translate(30%, -30%)' }"
    ></div>

    <div class="relative z-10 max-w-[90rem] mx-auto px-6 w-full">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[85vh]">
        <!-- Content -->
        <div class="lg:col-span-7 order-2 lg:order-1">
          <!-- Decorative Line -->
          <div class="h-px w-16 mb-10" :style="{ backgroundColor: 'var(--color-accent)' }"></div>

          <!-- Introduction -->
          <div class="reveal-hidden mb-6">
            <p class="text-xs font-sans uppercase tracking-[0.2em] font-medium" :style="{ color: 'var(--color-text-muted)' }">
              {{ $t('hero.accent') }}
            </p>
          </div>

          <!-- Name/Title -->
          <h1 class="reveal-hidden text-display-xl mb-8 leading-[1.1]">
            <span class="block">{{ $t('hero.heading1') }}</span>
            <span class="block mt-1" :style="{ color: 'var(--color-text-muted)' }">{{ $t('hero.heading2') }}</span>
            <span class="block mt-1">{{ $t('hero.heading3') }}</span>
            <span class="block mt-1" :style="{ color: 'var(--color-text-muted)' }">{{ $t('hero.heading4') }}</span>
          </h1>

          <!-- Bio -->
          <div class="reveal-hidden">
            <p class="text-lg font-sans max-w-xl leading-relaxed mb-12" :style="{ color: 'var(--color-text-muted)' }">
              {{ profile?.bio || 'Driven by sustainable and site-responsive architecture, prioritizing regional materials and contextual design.' }}
            </p>
          </div>

          <!-- CTA -->
          <div class="reveal-hidden flex flex-wrap gap-5">
            <a
              href="#projects"
              class="group btn btn-primary"
              @click.prevent="scrollToSection('projects')"
            >
              <span>{{ $t('projects.viewProjects') }}</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              @click="$emit('open-contact')"
              class="group btn btn-secondary"
            >
              <span>{{ $t('footer.getInTouch') }}</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="lg:col-span-5 order-1 lg:order-2">
          <div class="relative">
            <!-- Frame -->
            <div
              class="absolute -inset-4 border opacity-30"
              :style="{ borderColor: 'var(--color-border)' }"
            ></div>
            <div
              class="absolute -inset-8 border opacity-20"
              :style="{ borderColor: 'var(--color-border)' }"
            ></div>

            <!-- Image Container -->
            <div class="reveal-hidden reveal-right relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-alt)]">
              <img
                v-if="profile?.heroImage"
                :src="profile.heroImage"
                :alt="profile.name"
                class="w-full h-full object-cover"
                loading="eager"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-center" :style="{ color: 'var(--color-text-muted)' }">
                  <svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p class="text-sm font-serif italic">Profile Image</p>
                </div>
              </div>

              <!-- Subtle overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <!-- Quick Info -->
          <div class="mt-8 flex gap-8 text-sm">
            <div v-if="profile?.resume?.education?.length">
              <p class="font-sans uppercase tracking-wider mb-1" :style="{ color: 'var(--color-text-light)', fontSize: '0.7rem' }">Education</p>
              <p class="font-serif" :style="{ color: 'var(--color-text-muted)' }">
                {{ profile.resume.education[0]?.institution?.split(',')[0] }}
              </p>
            </div>
            <div v-if="profile?.location">
              <p class="font-sans uppercase tracking-wider mb-1" style="font-size: 0.7rem;" :style="{ color: 'var(--color-text-light)' }">Location</p>
              <p class="font-serif" :style="{ color: 'var(--color-text-muted)' }">{{ profile.location }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span class="text-xs font-sans uppercase tracking-[0.15em]" :style="{ color: 'var(--color-text-light)' }">Scroll</span>
        <div class="w-px h-12 overflow-hidden" :style="{ backgroundColor: 'var(--color-border)' }">
          <div
            class="w-full h-1/2 animate-scroll-indicator"
            :style="{ backgroundColor: 'var(--color-accent)' }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'

defineEmits(['open-contact'])

const { t, locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const profile = ref(null)

const loadProfile = async () => {
  profile.value = await loadLocalizedContent('profile')
}

onMounted(async () => {
  await loadProfile()
  // Trigger animations
  setTimeout(() => {
    document.querySelectorAll('.reveal-hidden').forEach(el => {
      el.classList.add('reveal-visible')
    })
  }, 100)
})

watch(locale, loadProfile)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
@keyframes scrollIndicator {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.animate-scroll-indicator {
  animation: scrollIndicator 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
</style>