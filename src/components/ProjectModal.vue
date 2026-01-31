<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6"
        :style="{ backgroundColor: 'var(--color-modal-backdrop)' }"
        @click.self="close"
      >
        <!-- Modal Content -->
        <div
          class="modal-content relative w-full h-full md:max-h-[90vh] md:rounded-none overflow-hidden flex flex-col md:flex-row"
          :style="{ backgroundColor: 'var(--color-bg-card)' }"
        >
          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 z-20 p-3 transition-all duration-300 hover:scale-110"
            :style="{ color: 'var(--color-text)' }"
            @click="close"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Full Image Gallery (Mobile: Full width, Desktop: Left side) -->
          <div class="md:w-3/5 relative bg-[var(--color-bg-alt)]">
            <!-- Main Image -->
            <div class="absolute inset-0 flex items-center justify-center p-4">
              <img
                v-if="currentImage"
                :src="currentImage"
                :alt="project.title"
                class="max-w-full max-h-full object-contain"
              />
            </div>

            <!-- Navigation Arrows -->
            <button
              v-if="project.images?.length > 1"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 transition-all duration-300 hover:scale-110"
              :style="{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }"
              @click="prevImage"
              aria-label="Previous image"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              v-if="project.images?.length > 1"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 transition-all duration-300 hover:scale-110"
              :style="{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }"
              @click="nextImage"
              aria-label="Next image"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Image Counter -->
            <div
              v-if="project.images?.length > 1"
              class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 text-xs font-sans uppercase tracking-wider"
              :style="{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }"
            >
              {{ currentIndex + 1 }} / {{ project.images.length }}
            </div>

            <!-- Thumbnail Strip -->
            <div
              v-if="project.images?.length > 1"
              class="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto py-2 px-12"
              style="background: linear-gradient(to top, var(--color-bg) 80%, transparent);"
            >
              <button
                v-for="(img, idx) in project.images"
                :key="idx"
                class="flex-shrink-0 w-16 h-12 overflow-hidden transition-all duration-300 border-2"
                :class="{ 'opacity-100 border-[var(--color-accent)]': idx === currentIndex, 'opacity-50 border-transparent': idx !== currentIndex }"
                :style="{ backgroundColor: 'var(--color-bg-alt)' }"
                @click="currentIndex = idx"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Project Details (Desktop: Right side) -->
          <div class="md:w-2/5 p-6 md:p-10 overflow-y-auto">
            <div class="space-y-8">
              <!-- Header -->
              <div>
                <p class="text-xs font-sans uppercase tracking-[0.15em] mb-3" :style="{ color: 'var(--color-accent)' }">
                  {{ project.category }}{{ project.year ? ` · ${project.year}` : '' }}
                </p>
                <h2 class="text-2xl md:text-3xl font-serif leading-tight" :style="{ color: 'var(--color-text)' }">
                  {{ project.title }}
                </h2>
                <p v-if="project.location" class="text-sm font-sans mt-2" :style="{ color: 'var(--color-text-muted)' }">
                  {{ project.location }}
                </p>
              </div>

              <!-- Description -->
              <div v-if="project.description" class="prose">
                <p class="text-base font-sans leading-relaxed" :style="{ color: 'var(--color-text-muted)' }">
                  {{ project.description }}
                </p>
              </div>

              <!-- Project Details Grid -->
              <div v-if="project.details" class="space-y-4 pt-6 border-t" :style="{ borderColor: 'var(--color-border)' }">
                <h3 class="text-xs font-sans uppercase tracking-wider font-medium" :style="{ color: 'var(--color-text)' }">
                  Project Details
                </h3>
                <dl class="grid grid-cols-1 gap-3">
                  <div v-if="project.details.area" class="flex justify-between">
                    <dt class="text-sm font-sans" :style="{ color: 'var(--color-text-light)' }">Area</dt>
                    <dd class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">{{ project.details.area }}</dd>
                  </div>
                  <div v-if="project.details.client" class="flex justify-between">
                    <dt class="text-sm font-sans" :style="{ color: 'var(--color-text-light)' }">Client</dt>
                    <dd class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">{{ project.details.client }}</dd>
                  </div>
                  <div v-if="project.details.collaborators" class="flex justify-between">
                    <dt class="text-sm font-sans" :style="{ color: 'var(--color-text-light)' }">Collaborators</dt>
                    <dd class="text-sm font-sans text-right" :style="{ color: 'var(--color-text-muted)' }">{{ project.details.collaborators }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Actions -->
              <div class="pt-6 flex gap-4">
                <button
                  v-if="project.location"
                  class="btn btn-secondary text-xs"
                  @click="openMaps"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View Location
                </button>
              </div>
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

const currentImage = computed(() => {
  if (props.project.images?.length) {
    return props.project.images[currentIndex.value]
  }
  return null
})

const nextImage = () => {
  if (props.project.images?.length) {
    currentIndex.value = (currentIndex.value + 1) % props.project.images.length
  }
}

const prevImage = () => {
  if (props.project.images?.length) {
    currentIndex.value = (currentIndex.value - 1 + props.project.images.length) % props.project.images.length
  }
}

const close = () => {
  emit('close')
}

const openMaps = () => {
  if (props.project.location) {
    const query = encodeURIComponent(props.project.location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
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

onMounted(() => {
  if (props.visible) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '0px'
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Mobile: Full screen modal */
@media (max-width: 767px) {
  .modal-content {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
}

/* Desktop: Contained modal */
@media (min-width: 768px) {
  .modal-content {
    max-height: 90vh;
    border-radius: 0;
  }
}

/* Smooth image transitions */
img {
  transition: opacity 0.3s ease;
}

/* Hide scrollbar on thumbnail strip */
.thumbnail-strip::-webkit-scrollbar {
  height: 4px;
}

.thumbnail-strip::-webkit-scrollbar-track {
  background: transparent;
}

.thumbnail-strip::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 2px;
}

/* Prose styling for description */
.prose p + p {
  margin-top: 1em;
}
</style>