<template>
  <section id="projects" class="py-28 lg:py-36" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
    <div class="max-w-[90rem] mx-auto px-6 lg:px-10">

      <!-- Section Header -->
      <div class="reveal-hidden mb-16">
        <div class="flex items-center gap-5 mb-6">
          <span class="section-number" :style="{ color: 'var(--color-text-light)' }">03</span>
          <div class="h-px w-10" :style="{ backgroundColor: 'var(--color-border-dark)' }"></div>
        </div>
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 class="text-display font-serif" :style="{ color: 'var(--color-text)' }">{{ $t('projects.title') }}</h2>
          <p
            v-if="projects.length"
            class="text-[0.65rem] font-sans uppercase tracking-[0.2em]"
            :style="{ color: 'var(--color-text-light)' }"
          >
            {{ projects.length }} {{ $t('projects.projectsCount') }}
          </p>
        </div>
      </div>

      <div v-if="projects.length">
        <!-- Featured Hero Project (first project, full width) -->
        <div
          class="featured-project reveal-hidden group cursor-pointer mb-6"
          :style="{ backgroundColor: 'var(--color-bg-card)' }"
          @click="openProject(projects[0])"
          role="button"
          :aria-label="`View project: ${projects[0].title}`"
          tabindex="0"
          @keydown.enter="openProject(projects[0])"
          @keydown.space.prevent="openProject(projects[0])"
        >
          <!-- Image -->
          <div class="featured-image-wrap relative overflow-hidden" :style="{ backgroundColor: 'var(--color-bg-dark)' }">
            <img
              v-if="projects[0].coverImage && !brokenImages.has(projects[0].id)"
              :src="projects[0].coverImage"
              :alt="projects[0].title"
              class="featured-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
              @error="markBroken(projects[0].id)"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center img-placeholder"
              :style="{ minHeight: '400px' }"
            >
              <svg class="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: 'var(--color-text)' }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <!-- Dark overlay + text on hover -->
            <div
              class="absolute inset-0 transition-opacity duration-500"
              style="background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);"
            ></div>

            <!-- Title overlay (always visible) -->
            <div class="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <div class="flex items-end justify-between gap-6">
                <div>
                  <p class="text-[0.65rem] font-sans uppercase tracking-[0.18em] mb-3 text-white/70">
                    {{ projects[0].category }}{{ projects[0].year ? ` · ${projects[0].year}` : '' }}
                  </p>
                  <h3 class="featured-title font-serif text-white leading-tight">{{ projects[0].title }}</h3>
                  <p v-if="projects[0].location" class="text-sm font-sans mt-2 text-white/60">{{ projects[0].location }}</p>
                </div>
                <div
                  class="flex-shrink-0 w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style="border: 1px solid rgba(255,255,255,0.3); color: white;"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Remaining projects: 2-column grid -->
        <div class="project-grid" v-if="projects.length > 1">
          <div
            v-for="(project, index) in projects.slice(1)"
            :key="project.id"
            class="project-card reveal-hidden group cursor-pointer"
            :style="{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }"
            @click="openProject(project)"
            role="button"
            :aria-label="`View project: ${project.title}`"
            tabindex="0"
            @keydown.enter="openProject(project)"
            @keydown.space.prevent="openProject(project)"
          >
            <!-- Image -->
            <div class="relative overflow-hidden project-card-image" :style="{ backgroundColor: 'var(--color-bg-dark)' }">
              <img
                v-if="project.coverImage && !brokenImages.has(project.id)"
                :src="project.coverImage"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04]"
                loading="lazy"
                @error="markBroken(project.id)"
              />
              <div v-else class="w-full h-full flex items-center justify-center img-placeholder">
                <svg class="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: 'var(--color-text)' }">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <!-- Hover CTA overlay -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                :style="{ backgroundColor: 'rgba(var(--color-bg-card), 0.08)' }"
              >
                <span
                  class="text-[0.65rem] font-sans uppercase tracking-[0.2em] px-4 py-2"
                  style="background: rgba(0,0,0,0.5); color: white; letter-spacing: 0.15em;"
                >
                  {{ $t('projects.viewProject') }}
                </span>
              </div>
            </div>

            <!-- Card info -->
            <div class="p-6">
              <p class="text-[0.62rem] font-sans uppercase tracking-[0.18em] mb-2.5" :style="{ color: 'var(--color-accent)' }">
                {{ project.category }}{{ project.year ? ` · ${project.year}` : '' }}
              </p>
              <h3 class="text-lg font-serif leading-snug mb-1.5" :style="{ color: 'var(--color-text)' }">{{ project.title }}</h3>
              <p v-if="project.location" class="text-xs font-sans" :style="{ color: 'var(--color-text-light)' }">{{ project.location }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="reveal-hidden py-32 text-center">
        <p class="font-sans text-sm" :style="{ color: 'var(--color-text-muted)' }">{{ $t('projects.comingSoon') }}</p>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      :visible="!!selectedProject"
      @close="selectedProject = null"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'
import ProjectModal from './ProjectModal.vue'

const { locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const projects = ref([])
const selectedProject = ref(null)
const brokenImages = ref(new Set())

const markBroken = (id) => {
  brokenImages.value = new Set([...brokenImages.value, id])
}

const openProject = (project) => {
  selectedProject.value = project
}

const loadProjects = async () => {
  projects.value = await loadLocalizedContent('projects')
}

watch(locale, loadProjects)

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
    { threshold: 0.08 }
  )
  document.querySelectorAll('#projects .reveal-hidden').forEach(el => observer.observe(el))
}

onMounted(async () => {
  await loadProjects()
  setTimeout(initReveal, 100)
})
</script>

<style scoped>
.section-number {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.1em;
}

.featured-project {
  overflow: hidden;
  transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-project:hover {
  box-shadow: 0 24px 60px var(--color-shadow-xl);
}

.featured-image-wrap {
  height: clamp(320px, 55vw, 620px);
}

.featured-image {
  height: 100%;
}

.featured-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 500;
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

.project-card {
  overflow: hidden;
  transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
}

.project-card:hover {
  box-shadow: 0 16px 40px var(--color-shadow-lg);
  border-color: var(--color-border-dark) !important;
}

.project-card-image {
  height: clamp(180px, 25vw, 280px);
}

.img-placeholder {
  background-color: var(--color-bg-alt);
}
</style>
