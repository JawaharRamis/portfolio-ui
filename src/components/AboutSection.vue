<template>
  <section id="about" class="py-24 relative overflow-hidden" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-20">
        <h2 class="text-3xl md:text-4xl font-serif mb-4" :style="{ color: 'var(--color-text)' }">About</h2>
        <div class="w-16 h-px" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
      </div>

      <div class="grid md:grid-cols-12 gap-12">
        <!-- Bio Section -->
        <div class="md:col-span-7 space-y-8">
          <p class="text-lg font-sans leading-relaxed" :style="{ color: 'var(--color-text-muted)' }">
            {{ profile?.bio || 'Add your bio to profile.json' }}
          </p>

          <!-- Contact Info -->
          <div class="grid sm:grid-cols-2 gap-6 pt-4">
            <div v-if="profile?.contact?.email" class="flex items-start gap-3">
              <div class="p-2 rounded-lg" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
                <svg class="w-5 h-5" :style="{ color: 'var(--color-accent)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-sans uppercase tracking-wider mb-1" :style="{ color: 'var(--color-text-light)' }">Email</p>
                <a :href="`mailto:${profile.contact.email}`" class="text-sm font-sans transition-colors" :style="{ color: 'var(--color-text)' }" @mouseenter="$event.target.style.color = 'var(--color-accent)'" @mouseleave="$event.target.style.color = ''">
                  {{ profile.contact.email }}
                </a>
              </div>
            </div>
            <div v-if="profile?.contact?.location" class="flex items-start gap-3">
              <div class="p-2 rounded-lg" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
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

          <!-- Resume Download -->
          <div v-if="profile?.resume?.url" class="pt-4">
            <a
              :href="profile.resume.url"
              target="_blank"
              class="inline-flex items-center gap-2 px-6 py-3 text-sm font-sans rounded-lg transition-all duration-300"
              :style="{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }"
              @mouseenter="$event.target.style.backgroundColor = 'var(--color-accent)'"
              @mouseleave="$event.target.style.backgroundColor = ''"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <!-- Skills -->
        <div class="md:col-span-5">
          <div v-if="profile?.resume?.skills?.length" class="bg-white rounded-2xl p-8" :style="{ backgroundColor: 'var(--color-bg-card)', boxShadow: 'var(--color-shadow)' }">
            <h3 class="text-xl font-serif mb-6" :style="{ color: 'var(--color-text)' }">Skills</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in profile.resume.skills"
                :key="skill"
                class="px-4 py-2 text-sm font-sans rounded-full transition-all duration-300"
                :style="{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-text-muted)' }"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience & Education -->
      <div class="grid md:grid-cols-2 gap-12 mt-20 pt-12" :style="{ borderTop: '1px solid var(--color-border)' }">
        <!-- Experience -->
        <div v-if="profile?.resume?.experience?.length">
          <h3 class="text-2xl font-serif mb-8" :style="{ color: 'var(--color-text)' }">Experience</h3>
          <div class="space-y-8">
            <div
              v-for="(job, index) in profile.resume.experience"
              :key="index"
              class="relative pl-8"
            >
              <!-- Timeline dot -->
              <div
                class="absolute left-0 top-2 w-3 h-3 rounded-full"
                :style="{ backgroundColor: 'var(--color-accent)' }"
              ></div>
              <!-- Timeline line -->
              <div
                v-if="index < profile.resume.experience.length - 1"
                class="absolute left-1.5 top-6 bottom-0 w-px"
                :style="{ backgroundColor: 'var(--color-border)' }"
              ></div>
              <p class="text-lg font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ job.role }}</p>
              <p class="text-sm font-sans mt-1" :style="{ color: 'var(--color-text-muted)' }">{{ job.company }}</p>
              <p class="text-sm mt-1" :style="{ color: 'var(--color-text-light)' }">{{ job.year }}</p>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div v-if="profile?.resume?.education?.length">
          <h3 class="text-2xl font-serif mb-8" :style="{ color: 'var(--color-text)' }">Education</h3>
          <div class="space-y-8">
            <div
              v-for="(edu, index) in profile.resume.education"
              :key="index"
              class="relative pl-8"
            >
              <!-- Timeline dot -->
              <div
                class="absolute left-0 top-2 w-3 h-3 rounded-full"
                :style="{ backgroundColor: 'var(--color-secondary)' }"
              ></div>
              <!-- Timeline line -->
              <div
                v-if="index < profile.resume.education.length - 1"
                class="absolute left-1.5 top-6 bottom-0 w-px"
                :style="{ backgroundColor: 'var(--color-border)' }"
              ></div>
              <p class="text-lg font-sans font-medium" :style="{ color: 'var(--color-text)' }">{{ edu.degree }}</p>
              <p class="text-sm font-sans mt-1" :style="{ color: 'var(--color-text-muted)' }">{{ edu.institution }}</p>
              <p class="text-sm mt-1" :style="{ color: 'var(--color-text-light)' }">{{ edu.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import profileData from '@/data/profile.json'

const profile = computed(() => profileData)
</script>
