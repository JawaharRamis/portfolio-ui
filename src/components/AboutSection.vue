<template>
  <section id="about" class="py-24" :style="{ backgroundColor: 'var(--color-bg-card)' }">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-16">
        <h2 class="text-3xl md:text-4xl font-serif mb-4" :style="{ color: 'var(--color-text)' }">{{ $t('about.title') }}</h2>
        <div class="w-16 h-px" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
      </div>

      <div class="grid md:grid-cols-3 gap-12">
        <!-- Bio -->
        <div class="md:col-span-2">
          <p class="text-lg font-sans leading-relaxed mb-8" :style="{ color: 'var(--color-text-muted)' }">
            {{ profile?.bio || 'Add your bio to profile.json' }}
          </p>

          <!-- Contact Info -->
          <div class="space-y-2">
            <p v-if="profile?.contact?.email" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
              <span class="font-medium" :style="{ color: 'var(--color-text)' }">Email:</span> {{ profile.contact.email }}
            </p>
            <p v-if="profile?.contact?.phone" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
              <span class="font-medium" :style="{ color: 'var(--color-text)' }">Phone:</span> {{ profile.contact.phone }}
            </p>
            <p v-if="profile?.contact?.location" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
              <span class="font-medium" :style="{ color: 'var(--color-text)' }">Location:</span> {{ profile.contact.location }}
            </p>
          </div>
        </div>

        <!-- Skills & Info -->
        <div class="space-y-12">
          <!-- Skills -->
          <div v-if="profile?.resume?.skills?.length">
            <h3 class="text-lg font-serif mb-4" :style="{ color: 'var(--color-text)' }">{{ $t('about.skills') }}</h3>
            <ul class="space-y-2">
              <li
                v-for="skill in profile.resume.skills"
                :key="skill"
                class="text-sm font-sans"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                {{ skill }}
              </li>
            </ul>
          </div>

          <!-- Download Resume Link -->
          <div v-if="profile?.resume?.url">
            <a
              :href="profile.resume.url"
              target="_blank"
              class="inline-flex items-center gap-2 text-sm font-sans transition-colors"
              :style="{ color: 'var(--color-text)' }"
              @mouseenter="$event.target.style.color = 'var(--color-accent)'"
              @mouseleave="$event.target.style.color = ''"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ $t('about.downloadResume') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Experience & Education -->
      <div class="grid md:grid-cols-2 gap-12 mt-16">
        <!-- Experience -->
        <div v-if="profile?.resume?.experience?.length">
          <h3 class="text-xl font-serif mb-6" :style="{ color: 'var(--color-text)' }">{{ $t('about.experience') }}</h3>
          <div class="space-y-8">
            <div
              v-for="(job, index) in profile.resume.experience"
              :key="index"
              class="border-l-2 pl-6"
              :style="{ borderColor: 'var(--color-border)' }"
            >
              <p class="text-lg font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ job.role }}</p>
              <p class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">{{ job.company }}</p>
              <p class="text-sm mt-1" :style="{ color: 'var(--color-text-light)' }">{{ job.year }}</p>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div v-if="profile?.resume?.education?.length">
          <h3 class="text-xl font-serif mb-6" :style="{ color: 'var(--color-text)' }">{{ $t('about.education') }}</h3>
          <div class="space-y-8">
            <div
              v-for="(edu, index) in profile.resume.education"
              :key="index"
              class="border-l-2 pl-6"
              :style="{ borderColor: 'var(--color-border)' }"
            >
              <p class="text-lg font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ edu.degree }}</p>
              <p class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">{{ edu.institution }}</p>
              <p class="text-sm mt-1" :style="{ color: 'var(--color-text-light)' }">{{ edu.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'

const { t, locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const profile = ref(null)

const handleScroll = () => {
  const reveals = document.querySelectorAll('.reveal')
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('active')
    }
  })
}

const loadProfile = async () => {
  profile.value = await loadLocalizedContent('profile')
}

onMounted(loadProfile)

watch(locale, loadProfile)

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal:nth-child(1) { transition-delay: 0s; }
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }
</style>
