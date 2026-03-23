<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center"
        :style="{ backgroundColor: 'var(--color-modal-backdrop)' }"
        @click.self="close"
        role="dialog"
        :aria-label="project.title"
        aria-modal="true"
      >
        <!-- Modal panel -->
        <div
          class="modal-content relative w-full h-full md:h-auto md:max-h-[92vh] overflow-hidden flex flex-col md:flex-row"
          :style="{ backgroundColor: 'var(--color-bg-card)' }"
          @click.stop
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 z-30 p-2.5 transition-all duration-200"
            :style="{
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)'
            }"
            @click="close"
            :aria-label="$t('modal.close')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Gallery panel (left / top on mobile) -->
          <div
            class="md:w-3/5 relative flex-shrink-0 flex flex-col"
            :style="{ backgroundColor: 'var(--color-bg-dark)' }"
          >
            <!-- Main image display -->
            <div class="flex-1 relative overflow-hidden modal-gallery-main">
              <Transition name="img-fade" mode="out-in">
                <img
                  v-if="currentImage && !imgError"
                  :key="currentIndex"
                  :src="currentImage"
                  :alt="`${project.title} — image ${currentIndex + 1}`"
                  class="absolute inset-0 w-full h-full object-contain"
                  @error="imgError = true"
                />
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center"
                  :style="{ color: 'var(--color-text-light)' }"
                >
                  <svg class="w-12 h-12 opacity-25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </Transition>

              <!-- Prev arrow -->
              <button
                v-if="allImages.length > 1"
                class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 transition-all duration-200 hover:scale-110"
                :style="{
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)'
                }"
                @click="prevImage"
                :aria-label="$t('modal.previous')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Next arrow -->
              <button
                v-if="allImages.length > 1"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 transition-all duration-200 hover:scale-110"
                :style="{
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)'
                }"
                @click="nextImage"
                :aria-label="$t('modal.next')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Image counter -->
              <div
                v-if="allImages.length > 1"
                class="absolute bottom-4 right-4 z-10 px-3 py-1 text-[0.65rem] font-sans uppercase tracking-wider"
                :style="{
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)'
                }"
              >
                {{ currentIndex + 1 }} / {{ allImages.length }}
              </div>
            </div>

            <!-- Thumbnail strip -->
            <div
              v-if="allImages.length > 1"
              class="thumbnail-strip flex gap-1.5 p-3 overflow-x-auto flex-shrink-0"
              :style="{ borderTop: '1px solid var(--color-border)' }"
            >
              <button
                v-for="(img, idx) in allImages"
                :key="idx"
                class="flex-shrink-0 w-14 h-10 overflow-hidden transition-all duration-200"
                :style="{
                  backgroundColor: 'var(--color-bg-alt)',
                  outline: idx === currentIndex ? '2px solid var(--color-accent)' : '2px solid transparent',
                  outlineOffset: '0px',
                  opacity: idx === currentIndex ? '1' : '0.55'
                }"
                @click="goToImage(idx)"
              >
                <img :src="img" class="w-full h-full object-cover" :alt="`Thumbnail ${idx + 1}`" />
              </button>
            </div>
          </div>

          <!-- Details panel (right / bottom on mobile) -->
          <div
            class="md:w-2/5 flex flex-col overflow-y-auto"
            :style="{ borderLeft: '1px solid var(--color-border)' }"
          >
            <div class="p-8 md:p-10 flex-1">
              <!-- Category & year -->
              <p
                class="text-[0.65rem] font-sans uppercase tracking-[0.18em] mb-4"
                :style="{ color: 'var(--color-accent)' }"
              >
                {{ project.category }}{{ project.year ? ` · ${project.year}` : '' }}
              </p>

              <!-- Title -->
              <h2
                class="text-2xl md:text-3xl font-serif leading-tight mb-2"
                :style="{ color: 'var(--color-text)' }"
              >
                {{ project.title }}
              </h2>

              <!-- Location -->
              <p
                v-if="project.location"
                class="text-sm font-sans mb-8"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                {{ project.location }}
              </p>

              <!-- Divider -->
              <div class="h-px mb-8" :style="{ backgroundColor: 'var(--color-border)' }"></div>

              <!-- Description -->
              <p
                v-if="project.description"
                class="text-sm font-sans leading-[1.85]"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                {{ project.description }}
              </p>

              <!-- Short description fallback -->
              <p
                v-else-if="project.shortDescription"
                class="text-sm font-sans leading-[1.85]"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                {{ project.shortDescription }}
              </p>

              <!-- Project details -->
              <div
                v-if="project.details && (project.details.area || project.details.client || project.details.collaborators)"
                class="mt-8 pt-6 border-t"
                :style="{ borderColor: 'var(--color-border)' }"
              >
                <p
                  class="text-[0.65rem] font-sans uppercase tracking-[0.2em] mb-5"
                  :style="{ color: 'var(--color-text-light)' }"
                >
                  {{ $t('modal.projectDetails') }}
                </p>
                <dl class="space-y-4">
                  <div v-if="project.details.area" class="flex items-start justify-between gap-4">
                    <dt class="text-xs font-sans uppercase tracking-wider" :style="{ color: 'var(--color-text-light)' }">{{ $t('modal.area') }}</dt>
                    <dd class="text-xs font-sans text-right" :style="{ color: 'var(--color-text-muted)' }">{{ project.details.area }}</dd>
                  </div>
                  <div v-if="project.details.client" class="flex items-start justify-between gap-4">
                    <dt class="text-xs font-sans uppercase tracking-wider" :style="{ color: 'var(--color-text-light)' }">{{ $t('modal.client') }}</dt>
                    <dd class="text-xs font-sans text-right" :style="{ color: 'var(--color-text-muted)' }">{{ project.details.client }}</dd>
                  </div>
                  <div v-if="project.details.collaborators" class="flex items-start justify-between gap-4">
                    <dt class="text-xs font-sans uppercase tracking-wider" :style="{ color: 'var(--color-text-light)' }">{{ $t('modal.collaborators') }}</dt>
                    <dd class="text-xs font-sans text-right" :style="{ color: 'var(--color-text-muted)' }">{{ project.details.collaborators }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- Footer actions -->
            <div
              class="px-8 md:px-10 py-5 flex items-center gap-3"
              :style="{ borderTop: '1px solid var(--color-border)' }"
            >
              <button
                v-if="project.location"
                class="btn btn-secondary text-[0.7rem] flex items-center gap-2"
                @click="openMaps"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const currentIndex = ref(0)
const imgError = ref(false)

// Combine coverImage + images array, deduplicated
const allImages = computed(() => {
  const imgs = []
  if (props.project.coverImage) imgs.push(props.project.coverImage)
  if (props.project.images?.length) {
    props.project.images.forEach(img => {
      if (!imgs.includes(img)) imgs.push(img)
    })
  }
  return imgs
})

const currentImage = computed(() => allImages.value[currentIndex.value] || null)

const nextImage = () => {
  imgError.value = false
  currentIndex.value = (currentIndex.value + 1) % allImages.value.length
}

const prevImage = () => {
  imgError.value = false
  currentIndex.value = (currentIndex.value - 1 + allImages.value.length) % allImages.value.length
}

const goToImage = (idx) => {
  imgError.value = false
  currentIndex.value = idx
}

const close = () => emit('close')

const openMaps = () => {
  if (props.project.location) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.project.location)}`, '_blank', 'noopener')
  }
}

const handleKeydown = (e) => {
  if (!props.visible) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

watch(() => props.visible, (val) => {
  currentIndex.value = 0
  imgError.value = false
  if (val) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

onMounted(() => {
  if (props.visible) {
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
.modal-content {
  max-width: 100%;
}

@media (min-width: 768px) {
  .modal-content {
    width: 90vw;
    max-width: 1200px;
    max-height: 92vh;
  }
}

.modal-gallery-main {
  min-height: 280px;
}

@media (min-width: 768px) {
  .modal-gallery-main {
    min-height: 480px;
  }
}

.thumbnail-strip {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.thumbnail-strip::-webkit-scrollbar {
  height: 3px;
}

.thumbnail-strip::-webkit-scrollbar-track {
  background: transparent;
}

.thumbnail-strip::-webkit-scrollbar-thumb {
  background: var(--color-border);
}

.img-fade-enter-active,
.img-fade-leave-active {
  transition: opacity 0.25s ease;
}

.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0;
}
</style>
