<template>
  <section
    id="hero"
    class="relative flex flex-col"
    style="min-height: 100svh;"
    :style="{ backgroundColor: 'var(--color-bg)' }"
  >
    <!-- Subtle architectural grid background -->
    <div class="absolute inset-0 pointer-events-none" style="opacity: 0.025;">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arch-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="currentColor" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arch-grid)" :style="{ color: 'var(--color-text)' }" />
      </svg>
    </div>

    <!-- Main content -->
    <div class="relative z-10 flex-1 flex items-center max-w-[90rem] mx-auto px-6 lg:px-10 w-full pt-28 pb-16">
      <div class="w-full grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

        <!-- Left: Typography block -->
        <div class="order-2 lg:order-1">
          <!-- Section notation -->
          <div class="flex items-center gap-4 mb-10 reveal-hidden">
            <span class="text-[0.65rem] font-sans uppercase tracking-[0.25em]" :style="{ color: 'var(--color-text-light)' }">
              {{ $t('hero.accent') }}
            </span>
            <div class="flex-1 h-px max-w-[3rem]" :style="{ backgroundColor: 'var(--color-border-dark)' }"></div>
          </div>

          <!-- Name — the largest typographic statement -->
          <h1 class="hero-name reveal-hidden mb-6 leading-[0.95]" :style="{ color: 'var(--color-text)' }">
            <span class="block">Akshatha</span>
            <span class="block hero-name-accent">Kelat</span>
          </h1>

          <!-- Title line -->
          <div class="reveal-hidden mb-10 flex items-center gap-5">
            <div class="w-8 h-px" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
            <p class="text-sm font-sans uppercase tracking-[0.2em] font-light" :style="{ color: 'var(--color-text-muted)' }">
              Architect &mdash; Stuttgart, Germany
            </p>
          </div>

          <!-- Bio -->
          <p class="reveal-hidden text-base font-sans leading-[1.85] max-w-[38ch] mb-12" :style="{ color: 'var(--color-text-muted)' }">
            {{ profile?.bio || 'Driven by sustainable and site-responsive architecture, prioritizing regional materials and contextual design.' }}
          </p>

          <!-- CTAs -->
          <div class="reveal-hidden flex flex-wrap gap-4">
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
            </button>
          </div>

          <!-- Stats row -->
          <div
            class="reveal-hidden grid grid-cols-3 gap-0 mt-16 pt-10 border-t"
            :style="{ borderColor: 'var(--color-border)' }"
          >
            <div class="pr-6">
              <p class="hero-stat-number font-serif" :style="{ color: 'var(--color-text)' }">5+</p>
              <p class="text-[0.65rem] font-sans uppercase tracking-[0.18em] mt-1" :style="{ color: 'var(--color-text-light)' }">Years</p>
            </div>
            <div class="px-6 border-x" :style="{ borderColor: 'var(--color-border)' }">
              <p class="hero-stat-number font-serif" :style="{ color: 'var(--color-text)' }">{{ profile?.resume?.experience?.length || 3 }}+</p>
              <p class="text-[0.65rem] font-sans uppercase tracking-[0.18em] mt-1" :style="{ color: 'var(--color-text-light)' }">Studios</p>
            </div>
            <div class="pl-6">
              <p class="hero-stat-number font-serif" :style="{ color: 'var(--color-text)' }">DE/IN</p>
              <p class="text-[0.65rem] font-sans uppercase tracking-[0.18em] mt-1" :style="{ color: 'var(--color-text-light)' }">Based</p>
            </div>
          </div>
        </div>

        <!-- Right: Portrait with architectural frame -->
        <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div class="hero-portrait-wrap reveal-hidden reveal-right">
            <!-- Outer offset frame lines -->
            <div
              class="hero-frame-outer"
              :style="{ borderColor: 'var(--color-border)' }"
            ></div>
            <div
              class="hero-frame-inner"
              :style="{ borderColor: 'var(--color-border-dark)' }"
            ></div>

            <!-- Portrait image -->
            <div
              class="hero-portrait-img relative overflow-hidden"
              :style="{ backgroundColor: 'var(--color-bg-alt)' }"
            >
              <img
                v-if="profile?.heroImage && !imageError"
                :src="profile.heroImage"
                :alt="profile?.name || 'Akshatha Kelat'"
                class="w-full h-full object-cover object-top"
                loading="eager"
                @error="imageError = true"
              />
              <div v-else class="w-full h-full flex flex-col items-center justify-center gap-4" :style="{ color: 'var(--color-text-light)' }">
                <svg class="w-14 h-14 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-xs font-sans uppercase tracking-[0.2em] opacity-40">Portrait</span>
              </div>

              <!-- Corner accent -->
              <div
                class="absolute top-4 right-4 w-6 h-6"
                style="border-top: 1px solid; border-right: 1px solid; opacity: 0.5;"
                :style="{ borderColor: 'var(--color-accent)' }"
              ></div>
              <div
                class="absolute bottom-4 left-4 w-6 h-6"
                style="border-bottom: 1px solid; border-left: 1px solid; opacity: 0.5;"
                :style="{ borderColor: 'var(--color-accent)' }"
              ></div>
            </div>

            <!-- Caption below image -->
            <div class="mt-5 flex items-center justify-between">
              <div v-if="profile?.contact?.location">
                <p class="text-[0.6rem] font-sans uppercase tracking-[0.2em]" :style="{ color: 'var(--color-text-light)' }">Location</p>
                <p class="text-xs font-serif mt-0.5" :style="{ color: 'var(--color-text-muted)' }">{{ profile.contact.location }}</p>
              </div>
              <div v-if="profile?.resume?.education?.length">
                <p class="text-[0.6rem] font-sans uppercase tracking-[0.2em] text-right" :style="{ color: 'var(--color-text-light)' }">Education</p>
                <p class="text-xs font-serif mt-0.5 text-right" :style="{ color: 'var(--color-text-muted)' }">
                  {{ profile.resume.education[0]?.institution?.split(',')[0] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="relative z-10 pb-10 flex flex-col items-center gap-3">
      <span class="text-[0.6rem] font-sans uppercase tracking-[0.25em]" :style="{ color: 'var(--color-text-light)' }">Scroll</span>
      <div class="w-px h-10 overflow-hidden relative" :style="{ backgroundColor: 'var(--color-border)' }">
        <div
          class="absolute top-0 left-0 w-full"
          style="height: 40%; animation: scrollLine 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
          :style="{ backgroundColor: 'var(--color-accent)' }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'

defineEmits(['open-contact'])

const { locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const profile = ref(null)
const imageError = ref(false)

const loadProfile = async () => {
  imageError.value = false
  profile.value = await loadLocalizedContent('profile')
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await loadProfile()
  // Stagger reveal animations
  const els = document.querySelectorAll('#hero .reveal-hidden')
  els.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('reveal-visible')
    }, 80 + i * 80)
  })
})

watch(locale, loadProfile)
</script>

<style scoped>
.hero-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: 500;
  letter-spacing: -0.02em;
}

.hero-name-accent {
  color: var(--color-accent);
}

.hero-stat-number {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1;
}

.hero-portrait-wrap {
  position: relative;
  width: clamp(280px, 38vw, 440px);
}

.hero-portrait-img {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
}

.hero-frame-outer {
  position: absolute;
  top: -16px;
  right: -16px;
  bottom: 16px;
  left: 16px;
  border: 1px solid;
  pointer-events: none;
  opacity: 0.25;
}

.hero-frame-inner {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: 8px;
  left: 8px;
  border: 1px solid;
  pointer-events: none;
  opacity: 0.4;
}

@keyframes scrollLine {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(250%); }
}
</style>
