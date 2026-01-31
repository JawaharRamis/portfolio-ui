<template>
  <section id="projects" class="py-24" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-[95rem] mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal-hidden mb-20">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div class="h-px w-16 mb-6" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
            <h2 class="text-display mb-3">{{ $t('projects.title') }}</h2>
            <p class="text-sm font-sans tracking-wider uppercase" :style="{ color: 'var(--color-text-light)' }">
              {{ projects.length }} {{ $t('projects.projectsCount') }}
            </p>
          </div>
          <p class="text-lg font-sans max-w-md leading-relaxed hidden md:block" :style="{ color: 'var(--color-text-muted)' }">
            Selected works exploring the intersection of sustainability, context, and spatial experience.
          </p>
        </div>
      </div>

      <!-- Masonry Grid -->
      <div v-if="projects.length" class="project-grid">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-item reveal-hidden"
          :class="getGridClass(index)"
          @click="openProject(project)"
        >
          <div class="project-card group relative h-full" :style="{ backgroundColor: 'var(--color-bg-card)' }">
            <!-- Image -->
            <div class="aspect-[4/3] overflow-hidden relative">
              <img
                v-if="project.coverImage"
                :src="project.coverImage"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center img-placeholder">
                <svg class="w-10 h-10 opacity-25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                :style="{ backgroundColor: 'var(--color-bg)' }"
              >
                <div class="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p class="text-xs font-sans uppercase tracking-[0.15em] mb-3" :style="{ color: 'var(--color-accent)' }">
                    {{ $t('projects.viewProject') }}
                  </p>
                  <svg class="w-10 h-10 mx-auto" :style="{ color: 'var(--color-text)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 relative">
              <!-- Category & Year -->
              <p class="text-xs font-sans uppercase tracking-wider mb-2" :style="{ color: 'var(--color-accent)' }">
                {{ project.category }}{{ project.year ? ` · ${project.year}` : '' }}
              </p>

              <!-- Title -->
              <h3 class="text-xl font-serif mb-2 line-clamp-1" :style="{ color: 'var(--color-text)' }">
                {{ project.title }}
              </h3>

              <!-- Location -->
              <p v-if="project.location" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
                {{ project.location }}
              </p>

              <!-- Subtle decorative line -->
              <div
                class="absolute bottom-0 left-6 right-6 h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                :style="{ backgroundColor: 'var(--color-border)' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="reveal-hidden text-center py-32">
        <p class="font-sans" :style="{ color: 'var(--color-text-muted)' }">{{ $t('projects.comingSoon') }}</p>
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

const { t, locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const projects = ref([])
const selectedProject = ref(null)
const visibleProjects = ref(new Set())

const openProject = (project) => {
  selectedProject.value = project
}

const loadProjects = async () => {
  projects.value = await loadLocalizedContent('projects')
}

watch(locale, loadProjects)

// Masonry-style grid classes for visual interest
const getGridClass = (index) => {
  const patterns = [
    'col-span-1 md:col-span-2 lg:col-span-3 row-span-2',     // Large hero
    'col-span-1 md:col-span-1',                              // Standard
    'col-span-1 md:col-span-1 lg:col-span-2',                // Wide
    'col-span-1 md:col-span-1',                              // Standard
    'col-span-1 md:col-span-2 row-span-1',                   // Medium wide
    'col-span-1 md:col-span-1',                              // Standard
    'col-span-1 md:col-span-1 lg:col-span-2 row-span-1',     // Wide
    'col-span-1 md:col-span-2 row-span-1',                   // Medium wide
  ]
  return patterns[index % patterns.length]
}

// Scroll reveal
const handleScroll = () => {
  const cards = document.querySelectorAll('.project-item')
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9 && !visibleProjects.value.has(index)) {
      visibleProjects.value.add(index)
      card.classList.add('reveal-visible')
    }
  })
}

onMounted(async () => {
  await loadProjects()
  window.addEventListener('scroll', handleScroll)
  handleScroll()

  // Trigger initial animations
  setTimeout(handleScroll, 200)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.project-item {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card {
  height: 100%;
  border: 1px solid var(--color-border);
  transition: border-color 0.3s ease, box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover {
  border-color: var(--color-border-dark);
  box-shadow: 0 12px 32px var(--color-shadow-lg);
}
</style>