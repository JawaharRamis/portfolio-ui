<template>
  <section id="projects" class="py-24" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-20">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-4xl md:text-5xl font-serif mb-4" :style="{ color: 'var(--color-text)' }">Selected Works</h2>
            <div class="w-20 h-px" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
          </div>
          <p class="hidden md:block text-sm font-sans" :style="{ color: 'var(--color-text-light)' }">{{ projects.length }} Projects</p>
        </div>
      </div>

      <!-- Creative Project Grid -->
      <div v-if="projects.length" class="project-grid">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-item"
          :class="getGridClass(index)"
          @click="openProject(project)"
        >
          <div class="project-card group relative overflow-hidden" :style="{ backgroundColor: 'var(--color-bg-card)' }">
            <!-- Image -->
            <div class="aspect-[4/3] overflow-hidden">
              <img
                v-if="project.coverImage"
                :src="project.coverImage"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
                <svg class="w-12 h-12" :style="{ color: 'var(--color-text-light)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center" style="background-color: var(--color-bg);">
              <div class="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p class="text-sm font-sans tracking-widest uppercase mb-2" :style="{ color: 'var(--color-accent)' }">View Project</p>
                <svg class="w-8 h-8 mx-auto" :style="{ color: 'var(--color-text)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Project Info - Always visible -->
            <div class="absolute bottom-0 left-0 right-0 p-6" :style="{ background: 'linear-gradient(to top, var(--color-bg-card) 0%, transparent 100%)' }">
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-xs font-sans uppercase tracking-wider mb-1" :style="{ color: 'var(--color-accent)' }">
                    {{ project.category }} {{ project.year ? `· ${project.year}` : '' }}
                  </p>
                  <h3 class="text-xl font-serif" :style="{ color: 'var(--color-text)' }">{{ project.title }}</h3>
                </div>
                <p v-if="project.location" class="hidden sm:block text-xs font-sans" :style="{ color: 'var(--color-text-muted)' }">
                  {{ project.location }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24">
        <p class="font-sans" :style="{ color: 'var(--color-text-light)' }">Projects coming soon...</p>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import projectsData from '@/data/projects.json'
import ProjectModal from './ProjectModal.vue'

const projects = computed(() => projectsData)
const selectedProject = ref(null)
const visibleProjects = ref(new Set())

const openProject = (project) => {
  selectedProject.value = project
}

// Staggered grid layout classes
const getGridClass = (index) => {
  // Create a 3-column staggered layout
  const pattern = index % 6
  switch (pattern) {
    case 0: return 'col-span-1 md:col-span-2 row-span-2'
    case 1: return 'col-span-1'
    case 2: return 'col-span-1'
    case 3: return 'col-span-1 md:col-span-2'
    case 4: return 'col-span-1'
    case 5: return 'col-span-1 md:col-span-2'
    default: return 'col-span-1'
  }
}

// Scroll reveal animation
const handleScroll = () => {
  const cards = document.querySelectorAll('.project-item')
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.85 && !visibleProjects.value.has(index)) {
      visibleProjects.value.add(index)
      card.classList.add('visible')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
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
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-item {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-item:nth-child(1) { transition-delay: 0s; }
.project-item:nth-child(2) { transition-delay: 0.1s; }
.project-item:nth-child(3) { transition-delay: 0.2s; }
.project-item:nth-child(4) { transition-delay: 0.3s; }
.project-item:nth-child(5) { transition-delay: 0.4s; }
.project-item:nth-child(6) { transition-delay: 0.5s; }

.project-card {
  height: 100%;
}
</style>
