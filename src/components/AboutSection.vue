<template>
  <section id="about" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-16">
        <h2 class="text-3xl md:text-4xl font-serif text-gray-900 mb-4">About</h2>
        <div class="w-16 h-px bg-gray-900"></div>
      </div>

      <div class="grid md:grid-cols-3 gap-12">
        <!-- Bio -->
        <div class="md:col-span-2">
          <p class="text-lg font-sans text-gray-600 leading-relaxed mb-8">
            {{ profile?.bio || 'Add your bio to profile.json' }}
          </p>

          <!-- Contact Info -->
          <div class="space-y-2">
            <p v-if="profile?.contact?.email" class="text-sm font-sans text-gray-600">
              <span class="font-medium text-gray-900">Email:</span> {{ profile.contact.email }}
            </p>
            <p v-if="profile?.contact?.phone" class="text-sm font-sans text-gray-600">
              <span class="font-medium text-gray-900">Phone:</span> {{ profile.contact.phone }}
            </p>
            <p v-if="profile?.contact?.location" class="text-sm font-sans text-gray-600">
              <span class="font-medium text-gray-900">Location:</span> {{ profile.contact.location }}
            </p>
          </div>
        </div>

        <!-- Skills & Info -->
        <div class="space-y-12">
          <!-- Skills -->
          <div v-if="profile?.resume?.skills?.length">
            <h3 class="text-lg font-serif text-gray-900 mb-4">Skills</h3>
            <ul class="space-y-2">
              <li
                v-for="skill in profile.resume.skills"
                :key="skill"
                class="text-sm font-sans text-gray-600"
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
              class="inline-flex items-center gap-2 text-sm font-sans text-gray-900 hover:text-gray-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <!-- Experience & Education -->
      <div class="grid md:grid-cols-2 gap-12 mt-16">
        <!-- Experience -->
        <div v-if="profile?.resume?.experience?.length">
          <h3 class="text-xl font-serif text-gray-900 mb-6">Experience</h3>
          <div class="space-y-8">
            <div
              v-for="(job, index) in profile.resume.experience"
              :key="index"
              class="border-l-2 border-gray-200 pl-6"
            >
              <p class="text-lg font-sans font-medium text-gray-900">{{ job.role }}</p>
              <p class="text-sm font-sans text-gray-600">{{ job.company }}</p>
              <p class="text-sm font-sans text-gray-400 mt-1">{{ job.year }}</p>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div v-if="profile?.resume?.education?.length">
          <h3 class="text-xl font-serif text-gray-900 mb-6">Education</h3>
          <div class="space-y-8">
            <div
              v-for="(edu, index) in profile.resume.education"
              :key="index"
              class="border-l-2 border-gray-200 pl-6"
            >
              <p class="text-lg font-sans font-medium text-gray-900">{{ edu.degree }}</p>
              <p class="text-sm font-sans text-gray-600">{{ edu.institution }}</p>
              <p class="text-sm font-sans text-gray-400 mt-1">{{ edu.year }}</p>
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
