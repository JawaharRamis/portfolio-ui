<template>
  <section id="about" class="py-24" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-[90rem] mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal-hidden mb-20">
        <div class="h-px w-16 mb-6" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
        <h2 class="text-display mb-3">{{ $t('about.title') }}</h2>
      </div>

      <div class="grid lg:grid-cols-12 gap-16">
        <!-- Bio Section -->
        <div class="lg:col-span-7 space-y-10">
          <p class="text-lg font-sans leading-relaxed" :style="{ color: 'var(--color-text-muted)' }">
            {{ profile?.bio || 'Driven by sustainable and site-responsive architecture, prioritizing regional materials and contextual design.' }}
          </p>

          <!-- Contact Info Grid -->
          <div class="grid sm:grid-cols-2 gap-8">
            <div v-if="profile?.contact?.email" class="flex items-start gap-4">
              <div class="p-3 mt-1" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
                <svg class="w-5 h-5" :style="{ color: 'var(--color-accent)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-sans uppercase tracking-wider mb-1" :style="{ color: 'var(--color-text-light)' }">Email</p>
                <a
                  :href="`mailto:${profile.contact.email}`"
                  class="text-sm font-sans transition-colors hover:text-[var(--color-accent)]"
                  :style="{ color: 'var(--color-text)' }"
                >
                  {{ profile.contact.email }}
                </a>
              </div>
            </div>
            <div v-if="profile?.contact?.location" class="flex items-start gap-4">
              <div class="p-3 mt-1" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
                <svg class="w-5 h-5" :style="{ color: 'var(--color-accent)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-sans uppercase tracking-wider mb-1" :style="{ color: 'var(--color-text-light)' }">Location</p>
                <p class="text-sm font-sans" :style="{ color: 'var(--color-text)' }">{{ profile.contact.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="lg:col-span-5">
          <div
            v-if="profile?.resume?.skills?.length"
            class="p-8"
            :style="{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }"
          >
            <h3 class="text-xl font-serif mb-6" :style="{ color: 'var(--color-text)' }">{{ $t('about.skills') }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in profile.resume.skills"
                :key="skill"
                class="px-4 py-2 text-sm font-sans transition-all duration-300 hover:translate-y-[-2px]"
                :style="{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-text-muted)' }"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience & Education -->
      <div class="grid lg:grid-cols-2 gap-16 mt-24 pt-12 border-t" :style="{ borderColor: 'var(--color-border)' }">
        <!-- Experience -->
        <div v-if="profile?.resume?.experience?.length" class="reveal-hidden">
          <h3 class="text-2xl font-serif mb-10" :style="{ color: 'var(--color-text)' }">{{ $t('about.experience') }}</h3>
          <div class="space-y-0">
            <div
              v-for="(job, index) in profile.resume.experience"
              :key="index"
              class="relative pl-8 pb-8 last:pb-0"
            >
              <!-- Timeline dot -->
              <div
                class="absolute left-0 top-2 w-2.5 h-2.5 rounded-full"
                :style="{ backgroundColor: 'var(--color-accent)' }"
              ></div>
              <!-- Timeline line -->
              <div
                v-if="index < profile.resume.experience.length - 1"
                class="absolute left-1 top-4 bottom-0 w-px"
                :style="{ backgroundColor: 'var(--color-border)' }"
              ></div>
              <p class="text-lg font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ job.role }}</p>
              <p class="text-sm font-sans mt-1" :style="{ color: 'var(--color-text-muted)' }">{{ job.company }}</p>
              <p class="text-xs mt-2 uppercase tracking-wider" :style="{ color: 'var(--color-text-light)' }">{{ job.year }}</p>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div v-if="profile?.resume?.education?.length" class="reveal-hidden">
          <h3 class="text-2xl font-serif mb-10" :style="{ color: 'var(--color-text)' }">{{ $t('about.education') }}</h3>
          <div class="space-y-0">
            <div
              v-for="(edu, index) in profile.resume.education"
              :key="index"
              class="relative pl-8 pb-8 last:pb-0"
            >
              <!-- Timeline dot -->
              <div
                class="absolute left-0 top-2 w-2.5 h-2.5 rounded-full"
                :style="{ backgroundColor: 'var(--color-secondary)' }"
              ></div>
              <!-- Timeline line -->
              <div
                v-if="index < profile.resume.education.length - 1"
                class="absolute left-1 top-4 bottom-0 w-px"
                :style="{ backgroundColor: 'var(--color-border)' }"
              ></div>
              <p class="text-lg font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ edu.degree }}</p>
              <p class="text-sm font-sans mt-1" :style="{ color: 'var(--color-text-muted)' }">{{ edu.institution }}</p>
              <p class="text-xs mt-2 uppercase tracking-wider" :style="{ color: 'var(--color-text-light)' }">{{ edu.year }}</p>
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

const { t, locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const profile = ref(null)

const loadProfile = async () => {
  profile.value = await loadLocalizedContent('profile')
}

onMounted(async () => {
  await loadProfile()
  // Trigger reveal animations
  setTimeout(() => {
    document.querySelectorAll('#about .reveal-hidden').forEach(el => {
      el.classList.add('reveal-visible')
    })
  }, 200)
})

watch(locale, loadProfile)
</script>