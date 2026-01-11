<template>
  <section id="artwork" class="py-24" :style="{ backgroundColor: 'var(--color-bg-card)' }">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-20">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-4xl md:text-5xl font-serif mb-4" :style="{ color: 'var(--color-text)' }">{{ $t('artwork.title') }}</h2>
            <div class="w-20 h-px" :style="{ backgroundColor: 'var(--color-accent)' }"></div>
          </div>
          <p class="hidden md:block text-sm font-sans" :style="{ color: 'var(--color-text-light)' }">{{ artworks.length }} {{ $t('artwork.pieces') }}</p>
        </div>
      </div>

      <!-- Horizontal Scroll Gallery -->
      <div v-if="artworks.length" class="artwork-scroller">
        <div class="artwork-track" :style="{ transform: `translateX(${scrollPosition}px)` }">
          <div
            v-for="(artwork, index) in artworks"
            :key="artwork.id"
            class="artwork-item"
            :class="getArtworkClass(index)"
            @click="openArtwork(artwork)"
          >
            <div class="artwork-card group relative overflow-hidden transition-all duration-500" :style="{ backgroundColor: 'var(--color-bg)' }">
              <!-- Image -->
              <div class="aspect-[3/4] overflow-hidden">
                <img
                  v-if="artwork.thumbnail || artwork.image"
                  :src="artwork.thumbnail || artwork.image"
                  :alt="artwork.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
                  <svg class="w-12 h-12" :style="{ color: 'var(--color-text-light)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- Hover Reveal Info -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" :style="{ backgroundColor: 'var(--color-bg)' }">
                <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 v-if="artwork.title" class="text-xl font-serif mb-2" :style="{ color: 'var(--color-text)' }">{{ artwork.title }}</h3>
                  <p v-if="artwork.medium || artwork.year" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
                    {{ [artwork.medium, artwork.year].filter(Boolean).join(' · ') }}
                  </p>
                  <p v-if="artwork.description" class="text-sm font-sans mt-2 line-clamp-2" :style="{ color: 'var(--color-text-muted)' }">
                    {{ artwork.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24">
        <p class="font-sans" :style="{ color: 'var(--color-text-light)' }">{{ $t('artwork.comingSoon') }}</p>
      </div>
    </div>

    <!-- Artwork Lightbox Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedArtwork"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          style="background-color: rgba(0,0,0,0.95);"
          @click="close"
        >
          <!-- Close Button -->
          <button
            class="absolute top-6 right-6 p-3 transition-colors z-10"
            style="color: rgba(255,255,255,0.7);"
            @click="close"
            aria-label="Close"
            @mouseenter="$event.target.style.color = 'white'"
            @mouseleave="$event.target.style.color = ''"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Navigation -->
          <button
            v-if="artworks.length > 1"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-3 transition-colors"
            style="color: rgba(255,255,255,0.7);"
            @click.stop="prev"
            aria-label="Previous"
            @mouseenter="$event.target.style.color = 'white'"
            @mouseleave="$event.target.style.color = ''"
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            v-if="artworks.length > 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-3 transition-colors"
            style="color: rgba(255,255,255,0.7);"
            @click.stop="next"
            aria-label="Next"
            @mouseenter="$event.target.style.color = 'white'"
            @mouseleave="$event.target.style.color = ''"
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Main Image -->
          <div class="max-w-5xl max-h-[75vh] flex items-center justify-center" @click.stop>
            <img
              :src="selectedArtwork.image"
              :alt="selectedArtwork.title"
              class="max-w-full max-h-[75vh] object-contain"
            />
          </div>

          <!-- Artwork Info -->
          <div class="absolute bottom-0 left-0 right-0 p-8" style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);">
            <div class="max-w-3xl mx-auto text-center">
              <h3 v-if="selectedArtwork.title" class="text-2xl font-serif text-white mb-2">{{ selectedArtwork.title }}</h3>
              <p v-if="selectedArtwork.medium || selectedArtwork.year" class="text-sm font-sans text-white/70 tracking-wide">
                {{ [selectedArtwork.medium, selectedArtwork.year].filter(Boolean).join(' · ') }}
              </p>
              <p v-if="selectedArtwork.description" class="text-sm font-sans text-white/80 mt-3 leading-relaxed">
                {{ selectedArtwork.description }}
              </p>
            </div>
          </div>

          <!-- Counter -->
          <span v-if="artworks.length > 1" class="absolute bottom-8 right-8 text-sm font-sans" style="color: rgba(255,255,255,0.5);">
            {{ currentIndex + 1 }} / {{ artworks.length }}
          </span>
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

const getArtworkClass = (index) => {
  // Varying sizes for visual interest
  const sizes = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/3]', 'aspect-[3/5]']
  return sizes[index % sizes.length]
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
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

onMounted(async () => {
  await loadArtworks()
  if (selectedArtwork.value) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.artwork-scroller {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

.artwork-scroller::-webkit-scrollbar {
  height: 6px;
}

.artwork-scroller::-webkit-scrollbar-track {
  background: transparent;
}

.artwork-scroller::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.artwork-track {
  display: flex;
  gap: 2rem;
  padding: 1rem 0 2rem;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.artwork-item {
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.artwork-item:nth-child(1) { animation-delay: 0.1s; }
.artwork-item:nth-child(2) { animation-delay: 0.2s; }
.artwork-item:nth-child(3) { animation-delay: 0.3s; }
.artwork-item:nth-child(4) { animation-delay: 0.4s; }
.artwork-item:nth-child(5) { animation-delay: 0.5s; }

.artwork-card {
  width: 280px;
  transition: transform 0.3s ease;
}

.artwork-card:hover {
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .artwork-card {
    width: 320px;
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
