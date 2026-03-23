<template>
  <section id="artwork" class="py-28 lg:py-36" :style="{ backgroundColor: 'var(--color-bg)' }">
    <div class="max-w-[90rem] mx-auto px-6 lg:px-10">

      <!-- Section Header -->
      <div class="reveal-hidden mb-16">
        <div class="flex items-center gap-5 mb-6">
          <span class="section-number" :style="{ color: 'var(--color-text-light)' }">05</span>
          <div class="h-px w-10" :style="{ backgroundColor: 'var(--color-border-dark)' }"></div>
        </div>
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 class="text-display font-serif" :style="{ color: 'var(--color-text)' }">{{ $t('artwork.title') }}</h2>
          <p
            v-if="artworks.length"
            class="text-[0.65rem] font-sans uppercase tracking-[0.2em]"
            :style="{ color: 'var(--color-text-light)' }"
          >
            {{ artworks.length }} {{ $t('artwork.pieces') }}
          </p>
        </div>
      </div>

      <!-- Masonry grid using CSS columns -->
      <div v-if="artworks.length" class="art-masonry reveal-hidden">
        <div
          v-for="(artwork, index) in artworks"
          :key="artwork.id || index"
          class="art-item group cursor-pointer"
          @click="openArtwork(index)"
          role="button"
          :aria-label="artwork.title || `Artwork ${index + 1}`"
          tabindex="0"
          @keydown.enter="openArtwork(index)"
          @keydown.space.prevent="openArtwork(index)"
        >
          <!-- Image wrapper -->
          <div
            class="art-img-wrap relative overflow-hidden"
            :style="{ backgroundColor: 'var(--color-bg-alt)' }"
          >
            <img
              v-if="(artwork.thumbnail || artwork.image) && !brokenImages.has(artwork.id || index)"
              :src="artwork.thumbnail || artwork.image"
              :alt="artwork.title || 'Artwork'"
              class="w-full block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
              @error="markBroken(artwork.id || index)"
            />
            <div
              v-else
              class="w-full flex items-center justify-center"
              style="min-height: 180px;"
              :style="{ backgroundColor: 'var(--color-bg-alt)' }"
            >
              <svg class="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: 'var(--color-text)' }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <!-- Hover overlay -->
            <div
              class="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style="background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);"
            >
              <div class="p-4">
                <h3 v-if="artwork.title" class="text-sm font-serif text-white leading-snug">{{ artwork.title }}</h3>
                <p
                  v-if="artwork.medium || artwork.year"
                  class="text-[0.62rem] font-sans uppercase tracking-wider mt-1 text-white/65"
                >
                  {{ [artwork.medium, artwork.year].filter(Boolean).join(' · ') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="reveal-hidden py-32 text-center">
        <p class="font-sans text-sm" :style="{ color: 'var(--color-text-muted)' }">{{ $t('artwork.comingSoon') }}</p>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedIndex !== null"
          class="fixed inset-0 z-50 flex items-center justify-center"
          :style="{ backgroundColor: 'var(--color-modal-backdrop)' }"
          @click="closeModal"
          role="dialog"
          :aria-label="selectedArtwork?.title || 'Artwork'"
          aria-modal="true"
        >
          <!-- Close -->
          <button
            class="absolute top-5 right-5 z-20 p-2.5 transition-all duration-200"
            style="color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2);"
            @click="closeModal"
            aria-label="Close"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Prev -->
          <button
            v-if="artworks.length > 1"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 transition-all duration-200 hover:scale-105"
            style="color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2);"
            @click.stop="prevArtwork"
            aria-label="Previous"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Next -->
          <button
            v-if="artworks.length > 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 transition-all duration-200 hover:scale-105"
            style="color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2);"
            @click.stop="nextArtwork"
            aria-label="Next"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Image -->
          <div class="w-full h-full flex flex-col items-center justify-center px-16 py-10" @click.stop>
            <Transition name="img-fade" mode="out-in">
              <img
                v-if="selectedArtwork?.image && !lightboxError"
                :key="selectedIndex"
                :src="selectedArtwork.image"
                :alt="selectedArtwork.title || 'Artwork'"
                class="max-w-full max-h-[70vh] object-contain"
                @error="lightboxError = true"
              />
              <div
                v-else
                :key="`placeholder-${selectedIndex}`"
                class="flex items-center justify-center w-48 h-48"
                style="border: 1px solid rgba(255,255,255,0.15);"
              >
                <svg class="w-10 h-10 opacity-30 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </Transition>

            <!-- Caption -->
            <div class="mt-6 text-center">
              <h3 v-if="selectedArtwork?.title" class="text-lg font-serif text-white/90">{{ selectedArtwork.title }}</h3>
              <p
                v-if="selectedArtwork?.medium || selectedArtwork?.year"
                class="text-[0.65rem] font-sans uppercase tracking-[0.18em] mt-1.5 text-white/50"
              >
                {{ [selectedArtwork.medium, selectedArtwork.year].filter(Boolean).join(' · ') }}
              </p>
              <p
                v-if="artworks.length > 1"
                class="text-[0.65rem] font-sans mt-3 text-white/30"
              >
                {{ selectedIndex + 1 }} / {{ artworks.length }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'

const { locale } = useI18n()
const { loadLocalizedContent } = useLocalizedContent()
const artworks = ref([])
const selectedIndex = ref(null)
const lightboxError = ref(false)
const brokenImages = ref(new Set())

const markBroken = (id) => {
  brokenImages.value = new Set([...brokenImages.value, id])
}

const selectedArtwork = computed(() =>
  selectedIndex.value !== null ? artworks.value[selectedIndex.value] : null
)

const loadArtworks = async () => {
  artworks.value = await loadLocalizedContent('artwork')
}

watch(locale, loadArtworks)

const openArtwork = (index) => {
  lightboxError.value = false
  selectedIndex.value = index
}

const closeModal = () => {
  selectedIndex.value = null
}

const nextArtwork = () => {
  lightboxError.value = false
  selectedIndex.value = (selectedIndex.value + 1) % artworks.value.length
}

const prevArtwork = () => {
  lightboxError.value = false
  selectedIndex.value = (selectedIndex.value - 1 + artworks.value.length) % artworks.value.length
}

const handleKeydown = (e) => {
  if (selectedIndex.value === null) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowRight') nextArtwork()
  if (e.key === 'ArrowLeft') prevArtwork()
}

watch(selectedIndex, (val) => {
  if (val !== null) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

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
    { threshold: 0.05 }
  )
  document.querySelectorAll('#artwork .reveal-hidden').forEach(el => observer.observe(el))
}

onMounted(async () => {
  await loadArtworks()
  setTimeout(initReveal, 100)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.section-number {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.1em;
}

/* CSS multi-column masonry */
.art-masonry {
  column-count: 2;
  column-gap: 1rem;
}

@media (min-width: 640px) {
  .art-masonry {
    column-count: 3;
    column-gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .art-masonry {
    column-count: 4;
    column-gap: 1.25rem;
  }
}

.art-item {
  break-inside: avoid;
  margin-bottom: 1.25rem;
  display: block;
}

.art-img-wrap {
  overflow: hidden;
}

.img-fade-enter-active,
.img-fade-leave-active {
  transition: opacity 0.2s ease;
}

.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0;
}
</style>
