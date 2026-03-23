<template>
  <section id="about" class="py-28 lg:py-36" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-[90rem] mx-auto px-6 lg:px-10">

      <!-- Section Header -->
      <div class="reveal-hidden mb-20">
        <div class="flex items-center gap-5 mb-6">
          <span class="section-number" :style="{ color: 'var(--color-text-light)' }">02</span>
          <div class="h-px w-10" :style="{ backgroundColor: 'var(--color-border-dark)' }"></div>
        </div>
        <h2 class="text-display font-serif" :style="{ color: 'var(--color-text)' }">{{ $t('about.title') }}</h2>
      </div>

      <!-- Primary two-column layout -->
      <div class="grid lg:grid-cols-2 gap-16 xl:gap-24">

        <!-- Left: Bio + Skills -->
        <div class="reveal-hidden reveal-left">
          <!-- Bio -->
          <p class="text-[1.05rem] font-sans leading-[1.9] mb-12" :style="{ color: 'var(--color-text-muted)' }">
            {{ profile?.bio || 'Driven by sustainable and site-responsive architecture, prioritizing regional materials and contextual design.' }}
          </p>

          <!-- Contact details -->
          <div class="flex flex-col gap-3 mb-12">
            <a
              v-if="profile?.contact?.email"
              :href="`mailto:${profile.contact.email}`"
              class="inline-flex items-center gap-3 text-sm font-sans transition-colors duration-200 group"
              :style="{ color: 'var(--color-text-muted)' }"
            >
              <span class="w-px h-4 group-hover:h-6 transition-all duration-300" :style="{ backgroundColor: 'var(--color-accent)' }"></span>
              <span class="group-hover:text-[var(--color-accent)] transition-colors duration-200">{{ profile.contact.email }}</span>
            </a>
            <div
              v-if="profile?.contact?.location"
              class="inline-flex items-center gap-3 text-sm font-sans"
              :style="{ color: 'var(--color-text-muted)' }"
            >
              <span class="w-px h-4" :style="{ backgroundColor: 'var(--color-border)' }"></span>
              <span>{{ profile.contact.location }}</span>
            </div>
          </div>

          <!-- Skills as pills -->
          <div v-if="profile?.resume?.skills?.length">
            <p class="text-[0.65rem] font-sans uppercase tracking-[0.2em] mb-5" :style="{ color: 'var(--color-text-light)' }">
              {{ $t('about.skills') }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in profile.resume.skills"
                :key="skill"
                class="skill-pill text-[0.7rem] font-sans uppercase tracking-[0.08em] px-3.5 py-1.5 transition-all duration-300"
                :style="{
                  backgroundColor: 'var(--color-bg-alt)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)'
                }"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Experience + Education timeline -->
        <div class="space-y-14 reveal-hidden reveal-right">
          <!-- Experience -->
          <div v-if="profile?.resume?.experience?.length">
            <p class="text-[0.65rem] font-sans uppercase tracking-[0.2em] mb-8" :style="{ color: 'var(--color-text-light)' }">
              {{ $t('about.experience') }}
            </p>
            <div class="relative">
              <!-- Vertical line -->
              <div
                class="absolute left-0 top-2 bottom-2 w-px"
                :style="{ backgroundColor: 'var(--color-border)' }"
              ></div>
              <div class="space-y-8">
                <div
                  v-for="(job, index) in profile.resume.experience"
                  :key="index"
                  class="pl-7 relative"
                >
                  <!-- Timeline dot -->
                  <div
                    class="absolute left-[-4px] top-2 w-2 h-2 rounded-full"
                    :style="{ backgroundColor: 'var(--color-accent)' }"
                  ></div>
                  <p
                    class="text-[0.6rem] font-sans uppercase tracking-[0.18em] mb-1.5"
                    :style="{ color: 'var(--color-text-light)' }"
                  >{{ job.year }}</p>
                  <p class="text-sm font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ job.role }}</p>
                  <p class="text-xs font-sans mt-0.5" :style="{ color: 'var(--color-text-muted)' }">{{ job.company }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div v-if="profile?.resume?.education?.length">
            <p class="text-[0.65rem] font-sans uppercase tracking-[0.2em] mb-8" :style="{ color: 'var(--color-text-light)' }">
              {{ $t('about.education') }}
            </p>
            <div class="relative">
              <!-- Vertical line -->
              <div
                class="absolute left-0 top-2 bottom-2 w-px"
                :style="{ backgroundColor: 'var(--color-border)' }"
              ></div>
              <div class="space-y-8">
                <div
                  v-for="(edu, index) in profile.resume.education"
                  :key="index"
                  class="pl-7 relative"
                >
                  <!-- Timeline dot -->
                  <div
                    class="absolute left-[-4px] top-2 w-2 h-2 rounded-full"
                    :style="{ backgroundColor: 'var(--color-secondary)' }"
                  ></div>
                  <p
                    class="text-[0.6rem] font-sans uppercase tracking-[0.18em] mb-1.5"
                    :style="{ color: 'var(--color-text-light)' }"
                  >{{ edu.year }}</p>
                  <p class="text-sm font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ edu.degree }}</p>
                  <p class="text-xs font-sans mt-0.5" :style="{ color: 'var(--color-text-muted)' }">{{ edu.institution }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'

const { locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const profile = ref(null)

const loadProfile = async () => {
  profile.value = await loadLocalizedContent('profile')
}

const initReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('#about .reveal-hidden').forEach(el => observer.observe(el))
}

onMounted(async () => {
  await loadProfile()
  initReveal()
})

watch(locale, loadProfile)
</script>

<style scoped>
.section-number {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.1em;
}

.skill-pill:hover {
  background-color: var(--color-accent-muted) !important;
  color: var(--color-accent) !important;
  border-color: var(--color-accent) !important;
}
</style>
