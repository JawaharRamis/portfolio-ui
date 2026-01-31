<template>
  <section id="artwork" class="py-24" :style="{ backgroundColor: 'var(--color-bg-card)' }">
    <div class="max-w-[95rem] mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal-hidden mb-20">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div class="h-px w-16 mb-6" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
            <h2 class="text-display mb-3">{{ $t('artwork.title') }}</h2>
            <p class="text-sm font-sans tracking-wider uppercase" :style="{ color: 'var(--color-text-light)' }">
              {{ artworks.length }} {{ $t('artwork.pieces') }}
            </p>
          </div>
          <p class="text-lg font-sans max-w-md leading-relaxed hidden md:block" :style="{ color: 'var(--color-text-muted)' }">
            Personal artistic explorations in painting and mixed media.
          </p>
        </div>
      </div>

      <!-- Horizontal Scroll Gallery -->
      <div v-if="artworks.length" class="artwork-scroller">
        <div
          class="artwork-track"
          :style="{ transform: `translateX(${scrollPosition}px)` }"
        >
          <div
            v-for="(artwork, index) in artworks"
            :key="artwork.id"
            class="artwork-item reveal-hidden"
            @click="openArtwork(artwork)"
          >
            <div
              class="artwork-card group relative overflow-hidden"
              :style="{ backgroundColor: 'var(--color-bg)' }"
            >
              <!-- Image -->
              <div
                class="aspect-[3/4] overflow-hidden relative"
                :class="getAspectClass(index)"
              >
                <img
                  v-if="artwork.thumbnail || artwork.image"
                  :src="artwork.thumbnail || artwork.image"
                  :alt="artwork.title"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center img-placeholder">
                  <svg class="w-10 h-10 opacity-25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <!-- Subtle overlay on hover -->
                <div
                  class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  :style="{ backgroundColor: 'var(--color-bg)' }"
                >
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p class="text-xs font-sans uppercase tracking-[0.15em] mb-3" :style="{ color: 'var(--color-accent)' }">
                        View Artwork
                      </p>
                      <svg class="w-10 h-10 mx-auto" :style="{ color: 'var(--color-text)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Info (visible on hover) -->
              <div
                class="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                :style="{ background: 'linear-gradient(to top, var(--color-bg) 0%, var(--color-bg) 90%, transparent 100%)' }"
              >
                <h3 v-if="artwork.title" class="text-lg font-serif mb-1" :style="{ color: 'var(--color-text)' }">
                  {{ artwork.title }}
                </h3>
                <p v-if="artwork.medium || artwork.year" class="text-xs font-sans uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">
                  {{ [artwork.medium, artwork.year].filter(Boolean).join(' · ') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="reveal-hidden text-center py-32">
        <p class="font-sans" :style="{ color: 'var(--color-text-muted)' }">{{ $t('artwork.comingSoon') }}</p>
      </div>
    </div>

    <!-- Artwork Lightbox Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedArtwork"
          class="fixed inset-0 z-50 flex items-center justify-center p-0"
          :style="{ backgroundColor: 'var(--color-modal-backdrop)' }"
          @click="close"
        >
          <!-- Close Button -->
          <button
            class="absolute top-6 right-6 p-3 transition-all duration-300 hover:scale-110 z-20"
            :style="{ color: 'var(--color-text)' }"
            @click="close"
            aria-label="Close"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Navigation -->
          <button
            v-if="artworks.length > 1"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 transition-all duration-300 hover:scale-110"
            :style="{ color: 'var(--color-text)' }"
            @click.stop="prev"
            aria-label="Previous"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            v-if="artworks.length > 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 transition-all duration-300 hover:scale-110"
            :style="{ color: 'var(--color-text)' }"
            @click.stop="next"
            aria-label="Next"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Main Image Container -->
          <div class="w-full h-full flex items-center justify-center p-8 md:p-16">
            <div class="relative max-w-5xl max-h-full">
              <img
                :src="selectedArtwork.image"
                :alt="selectedArtwork.title"
                class="max-w-full max-h-[75vh] object-contain"
                @click.stop
              />

              <!-- Counter -->
              <div
                v-if="artworks.length > 1"
                class="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs font-sans uppercase tracking-wider"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                {{ currentIndex + 1 }} / {{ artworks.length }}
              </div>
            </div>
          </div>

          <!-- Artwork Info -->
          <div
            class="absolute bottom-0 left-0 right-0 p-8 md:p-10"
            :style="{ background: 'linear-gradient(to top, var(--color-bg) 0%, var(--color-bg) 85%, transparent 100%)' }"
          >
            <div class="max-w-3xl mx-auto text-center">
              <h3 v-if="selectedArtwork.title" class="text-2xl font-serif mb-2" :style="{ color: 'var(--color-text)' }">
                {{ selectedArtwork.title }}
              </h3>
              <p v-if="selectedArtwork.medium || selectedArtwork.year" class="text-sm font-sans uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">
                {{ [selectedArtwork.medium, selectedArtwork.year].filter(Boolean).join(' · ') }}
              </p>
              <p v-if="selectedArtwork.description" class="text-base font-sans mt-4 leading-relaxed max-w-2xl mx-auto" :style="{ color: 'var(--color-text-muted)' }">
                {{ selectedArtwork.description }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'

const { t, locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const artworks = ref([])
const selectedArtwork = ref(null)
const currentIndex = ref(0)
const scrollPosition = ref(0)

const loadArtworks = async () => {
  artworks.value = await loadLocalizedContent('artwork')
}

watch(locale, loadArtworks)

// Varying aspect ratios for visual interest
const getAspectClass = (index) => {
  const aspects = ['aspect-[3/4]', 'aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/5]', 'aspect-[4/3]']
  return aspects[index % aspects.length]
}

const openArtwork = (artwork) => {
  currentIndex.value = artworks.value.findIndex(a => a.id === artwork.id)
  selectedArtwork.value = artwork
}

const close = () => {
  selectedArtwork.value = null
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % artworks.value.length
  selectedArtwork.value = artworks.value[currentIndex.value]
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + artworks.value.length) % artworks.value.length
  selectedArtwork.value = artworks.value[currentIndex.value]
}

const handleKeydown = (e) => {
  if (!selectedArtwork.value) return

  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

watch(selectedArtwork, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '0px'
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

onMounted(async () => {
  await loadArtworks()
  if (selectedArtwork.value) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '0px'
    window.addEventListener('keydown', handleKeydown)
  }

  // Trigger scroll reveal
  setTimeout(() => {
    document.querySelectorAll('.artwork-item').forEach(el => {
      el.classList.add('reveal-visible')
    })
  }, 200)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.artwork-scroller {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  padding-bottom: 1rem;
}

.artwork-scroller::-webkit-scrollbar {
  height: 4px;
}

.artwork-scroller::-webkit-scrollbar-track {
  background: transparent;
}

.artwork-scroller::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 2px;
}

.artwork-track {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  width: max-content;
}

.artwork-item {
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
}

.artwork-card {
  width: 260px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.artwork-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px var(--color-shadow-lg);
}

@media (min-width: 768px) {
  .artwork-card {
    width: 300px;
  }
}

/* Responsive image sizes for different aspect ratios */
.img-placeholder-portrait { min-height: 350px; }
.img-placeholder-square { min-height: 300px; }
.img-placeholder-tall { min-height: 320px; }
.img-placeholder-narrow { min-height: 280px; }
.img-placeholder-landscape { min-height: 220px; }
</style>