<template>
  <section id="academic" class="py-24" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-20">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-4xl md:text-5xl font-serif mb-4" :style="{ color: 'var(--color-text)' }">Academic Works</h2>
            <div class="w-20 h-px" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
          </div>
          <p class="hidden md:block text-sm font-sans" :style="{ color: 'var(--color-text-light)' }">{{ academicItems.length }} Works</p>
        </div>
      </div>

      <!-- Academic Items Grid -->
      <div v-if="academicItems.length" class="academic-grid">
        <div
          v-for="(item, index) in academicItems"
          :key="item.id"
          class="academic-item"
          :class="getGridClass(index)"
          @click="openItem(item)"
        >
          <div class="academic-card group relative overflow-hidden" :style="{ backgroundColor: 'var(--color-bg-card)' }">
            <!-- Image -->
            <div class="aspect-[4/3] overflow-hidden">
              <img
                v-if="item.coverImage"
                :src="item.coverImage"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
                <svg class="w-12 h-12" :style="{ color: 'var(--color-text-light)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center" style="background-color: var(--color-bg);">
              <div class="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p class="text-sm font-sans tracking-widest uppercase mb-2" :style="{ color: 'var(--color-accent)' }">View Details</p>
                <svg class="w-8 h-8 mx-auto" :style="{ color: 'var(--color-text)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Item Info - Always visible -->
            <div class="absolute bottom-0 left-0 right-0 p-6" :style="{ background: 'linear-gradient(to top, var(--color-bg-card) 0%, transparent 100%)' }">
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-xs font-sans uppercase tracking-wider mb-1" :style="{ color: 'var(--color-accent)' }">
                    {{ item.category }} {{ item.year ? `· ${item.year}` : '' }}
                  </p>
                  <h3 class="text-xl font-serif" :style="{ color: 'var(--color-text)' }">{{ item.title }}</h3>
                </div>
                <p v-if="item.location" class="hidden sm:block text-xs font-sans" :style="{ color: 'var(--color-text-muted)' }">
                  {{ item.location }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24">
        <p class="font-sans" :style="{ color: 'var(--color-text-light)' }">Academic works coming soon...</p>
      </div>
    </div>

    <!-- Academic Modal -->
    <AcademicModal
      v-if="selectedItem"
      :item="selectedItem"
      :visible="!!selectedItem"
      @close="selectedItem = null"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import academicData from '@/data/academic.json'
import AcademicModal from './AcademicModal.vue'

const academicItems = computed(() => academicData)
const selectedItem = ref(null)
const visibleItems = ref(new Set())

const openItem = (item) => {
  selectedItem.value = item
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
  const cards = document.querySelectorAll('.academic-item')
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.85 && !visibleItems.value.has(index)) {
      visibleItems.value.add(index)
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
.academic-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .academic-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.academic-item {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.academic-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.academic-item:nth-child(1) { transition-delay: 0s; }
.academic-item:nth-child(2) { transition-delay: 0.1s; }
.academic-item:nth-child(3) { transition-delay: 0.2s; }
.academic-item:nth-child(4) { transition-delay: 0.3s; }
.academic-item:nth-child(5) { transition-delay: 0.4s; }
.academic-item:nth-child(6) { transition-delay: 0.5s; }

.academic-card {
  height: 100%;
}
</style>