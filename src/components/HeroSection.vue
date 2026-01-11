<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden" :style="{ backgroundColor: 'var(--color-bg)' }">
    <!-- Background Grid Overlay -->
    <div class="absolute inset-0 opacity-5">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" :stroke="'var(--color-text)'" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Background with subtle animation -->
    <div class="absolute inset-0" :style="{ background: 'radial-gradient(ellipse at 30% 20%, var(--color-bg-alt) 0%, transparent 50%)' }"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div class="grid md:grid-cols-2 gap-16 items-center min-h-[80vh]">
        <!-- Animated Text Content -->
        <div class="order-2 md:order-1 space-y-8">
          <div class="overflow-hidden">
            <p class="hero-text text-sm font-sans tracking-[0.25em] uppercase" :style="{ color: 'var(--color-accent)' }">
              {{ $t('hero.accent') }}
            </p>
          </div>

          <div class="overflow-hidden">
            <h1 class="hero-text text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight" :style="{ color: 'var(--color-text)' }">
              <span class="block">Creating</span>
              <span class="block" :style="{ color: 'var(--color-text-muted)' }">spaces that</span>
              <span class="block">inspire &</span>
              <span class="block" :style="{ color: 'var(--color-text-muted)' }">endure</span>
            </h1>
          </div>

          <div class="overflow-hidden">
            <p class="hero-text text-lg font-sans max-w-md leading-relaxed" :style="{ color: 'var(--color-text-muted)' }">
              {{ profile?.bio || 'Passionate architect focused on sustainable design and innovative spatial experiences.' }}
            </p>
          </div>

          <!-- Animated CTA Buttons -->
          <div class="hero-text pt-4 flex flex-wrap gap-4">
            <a
              href="#projects"
              class="group inline-flex items-center gap-3 px-8 py-4 font-sans text-sm font-medium tracking-wide transition-all duration-300 rounded-lg"
              :style="{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }"
              @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent)'"
              @mouseleave="$event.target.style.backgroundColor = ''"
              @click.prevent="scrollToProjects"
            >
              <span>{{ $t('projects.viewProjects') }}</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              @click="$emit('open-contact')"
              class="group inline-flex items-center gap-3 px-8 py-4 font-sans text-sm font-medium tracking-wide transition-all duration-300 rounded-lg border"
              :style="{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }"
              @mouseenter="$event.target.style.borderColor = 'var(--color-accent)'; $event.target.style.color = 'var(--color-accent)'"
              @mouseleave="$event.target.style.borderColor = ''; $event.target.style.color = ''"
            >
              <span>Get in Touch</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="order-1 md:order-2">
          <div class="relative">
            <!-- Image container with frame -->
            <div class="hero-image-reveal overflow-hidden aspect-[3/4]" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
              <img
                v-if="profile?.heroImage"
                :src="profile.heroImage"
                :alt="profile.name"
                class="w-full h-full object-cover"
                loading="eager"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <div
                    class="w-32 h-32 mx-auto border rounded-full flex items-center justify-center mb-4"
                    :style="{ borderColor: 'var(--color-border)' }"
                  >
                    <svg class="w-12 h-12" :style="{ color: 'var(--color-text-muted)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p class="font-serif italic" :style="{ color: 'var(--color-text-muted)' }">Profile Image</p>
                </div>
              </div>
            </div>

            <!-- Decorative corner accents -->
            <div
              class="absolute top-0 left-0 w-16 h-16 border-l border-t pointer-events-none"
              :style="{ borderColor: 'var(--color-accent)' }"
            ></div>
            <div
              class="absolute bottom-0 right-0 w-16 h-16 border-r border-b pointer-events-none"
              :style="{ borderColor: 'var(--color-accent)' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div class="flex flex-col items-center gap-2 animate-bounce">
          <span class="text-xs font-sans uppercase tracking-widest" :style="{ color: 'var(--color-text-muted)' }">Scroll</span>
          <svg class="w-5 h-5" :style="{ color: 'var(--color-text-muted)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import profileData from '@/data/profile.json'

defineEmits(['open-contact'])

const { t } = useI18n()
const profile = computed(() => profileData)

const scrollToProjects = () => {
  const element = document.getElementById('projects')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Trigger animations
  const elements = document.querySelectorAll('.hero-text')
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.12}s`
  })
})
</script>

<style scoped>
.hero-text {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-image-reveal {
  opacity: 0;
  transform: translateX(40px);
  animation: revealImage 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes revealImage {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
