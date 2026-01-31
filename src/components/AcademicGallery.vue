<template>
  <section id="academic" class="py-24" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-[95rem] mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal-hidden mb-20">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div class="h-px w-16 mb-6" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
            <h2 class="text-display mb-3">{{ $t('academic.title') }}</h2>
            <p class="text-sm font-sans tracking-wider uppercase" :style="{ color: 'var(--color-text-light)' }">
              {{ academicItems.length }} {{ $t('academic.worksCount') }}
            </p>
          </div>
          <p class="text-lg font-sans max-w-md leading-relaxed hidden md:block" :style="{ color: 'var(--color-text-muted)' }">
            {{ $t('academic.description') }}
          </p>
        </div>
      </div>

      <!-- Academic Items Grid -->
      <div v-if="academicItems.length" class="academic-grid">
        <div
          v-for="(item, index) in academicItems"
          :key="item.id"
          class="academic-item reveal-hidden"
          :class="getGridClass(index)"
          @click="openItem(item)"
        >
          <div class="academic-card group relative h-full" :style="{ backgroundColor: 'var(--color-bg-card)' }">
            <!-- Image -->
            <div class="aspect-[4/3] overflow-hidden relative">
              <img
                v-if="item.coverImage"
                :src="item.coverImage"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center img-placeholder">
                <svg class="w-10 h-10 opacity-25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                :style="{ backgroundColor: 'var(--color-bg)' }"
              >
                <div class="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p class="text-xs font-sans uppercase tracking-[0.15em] mb-3" :style="{ color: 'var(--color-accent)' }">{{ $t('academic.viewDetails') }}</p>
                  <svg class="w-10 h-10 mx-auto" :style="{ color: 'var(--color-text)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 relative">
              <p class="text-xs font-sans uppercase tracking-wider mb-2" :style="{ color: 'var(--color-accent)' }">
                {{ item.category }}{{ item.year ? ` · ${item.year}` : '' }}
              </p>
              <h3 class="text-xl font-serif mb-2 line-clamp-1" :style="{ color: 'var(--color-text)' }">{{ item.title }}</h3>
              <p v-if="item.location" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
                {{ item.location }}
              </p>
              <!-- Decorative line -->
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
        <p class="font-sans" :style="{ color: 'var(--color-text-muted)' }">{{ $t('academic.comingSoon') }}</p>
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
import { useI18n } from 'vue-i18n'
import academicData from '@/data/academic.json'
import AcademicModal from './AcademicModal.vue'

const { t, locale } = useI18n()

const academicItems = computed(() => academicData)
const selectedItem = ref(null)
const visibleItems = ref(new Set())

const openItem = (item) => {
  selectedItem.value = item
}

const getGridClass = (index) => {
  const patterns = [
    'col-span-1 md:col-span-2 lg:col-span-3 row-span-2',
    'col-span-1 md:col-span-1',
    'col-span-1 md:col-span-1 lg:col-span-2',
    'col-span-1 md:col-span-1',
    'col-span-1 md:col-span-2 row-span-1',
    'col-span-1 md:col-span-1',
  ]
  return patterns[index % patterns.length]
}

const handleScroll = () => {
  const cards = document.querySelectorAll('.academic-item')
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9 && !visibleItems.value.has(index)) {
      visibleItems.value.add(index)
      card.classList.add('reveal-visible')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  setTimeout(handleScroll, 200)
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
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .academic-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.academic-card {
  height: 100%;
  border: 1px solid var(--color-border);
  transition: border-color 0.3s ease, box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.academic-card:hover {
  border-color: var(--color-border-dark);
  box-shadow: 0 12px 32px var(--color-shadow-lg);
}
</style>