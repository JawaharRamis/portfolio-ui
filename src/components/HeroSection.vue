<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
    <!-- Background with subtle animation -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <!-- Animated geometric shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-white/2 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div class="grid md:grid-cols-2 gap-16 items-center min-h-[80vh]">
        <!-- Animated Text Content -->
        <div class="order-2 md:order-1 space-y-8">
          <!-- Staggered fade-in animations -->
          <div class="overflow-hidden">
            <p class="hero-text text-sm font-sans tracking-[0.3em] text-gray-400 uppercase">
              Architecture & Design
            </p>
          </div>

          <div class="overflow-hidden">
            <h1 class="hero-text text-5xl md:text-7xl font-serif font-light text-white leading-tight">
              <span class="block">Creating</span>
              <span class="block text-gray-500">spaces that</span>
              <span class="block">inspire &</span>
              <span class="block text-gray-500">endure</span>
            </h1>
          </div>

          <div class="overflow-hidden">
            <p class="hero-text text-lg font-sans text-gray-400 max-w-md leading-relaxed">
              {{ profile?.bio || 'Passionate architect focused on sustainable design and innovative spatial experiences.' }}
            </p>
          </div>

          <!-- Animated CTA Button -->
          <div class="hero-text pt-4">
            <a
              href="#projects"
              class="group inline-flex items-center gap-4 px-8 py-4 bg-white text-gray-900 font-sans text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-500"
              @click.prevent="scrollToProjects"
            >
              <span>View Projects</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Animated Hero Image -->
        <div class="order-1 md:order-2">
          <div class="relative">
            <!-- Image reveal animation container -->
            <div class="hero-image-reveal overflow-hidden aspect-[3/4] bg-gray-800">
              <img
                v-if="profile?.heroImage"
                :src="profile.heroImage"
                :alt="profile.name"
                class="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <div class="w-32 h-32 mx-auto border border-gray-600 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p class="font-serif text-gray-500 italic">Profile Image</p>
                </div>
              </div>
            </div>

            <!-- Decorative frame -->
            <div class="absolute -bottom-6 -left-6 w-full h-full border border-white/20 pointer-events-none"></div>
            <div class="absolute -top-6 -right-6 w-full h-full border border-white/20 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import profileData from '@/data/profile.json'

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
    el.style.animationDelay = `${index * 0.15}s`
  })
})
</script>

<style scoped>
.hero-text {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-image-reveal {
  opacity: 0;
  transform: translateX(60px);
  animation: revealImage 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
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
