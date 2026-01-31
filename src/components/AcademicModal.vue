<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80" @click="close"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col" :style="{ backgroundColor: 'var(--color-bg-card)' }">
          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 z-10 p-2 transition-colors"
            :style="{ color: 'var(--color-text-muted)' }"
            @click="close"
            aria-label="Close modal"
            @mouseenter="$event.target.style.color = 'var(--color-text)'"
            @mouseleave="$event.target.style.color = ''"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex flex-col md:flex-row h-full overflow-hidden">
            <!-- Image Gallery -->
            <div class="md:w-2/3 relative" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
              <div class="aspect-[4/3] md:aspect-auto md:h-full">
                <img
                  v-if="currentImage"
                  :src="currentImage"
                  :alt="item.title"
                  class="w-full h-full object-contain"
                />
              </div>

              <!-- Navigation Arrows -->
              <button
                v-if="item.images?.length > 1"
                class="absolute left-4 top-1/2 -translate-y-1/2 p-2 transition-colors"
                :style="{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)' }"
                @click="prevImage"
                aria-label="Previous image"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                v-if="item.images?.length > 1"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-2 transition-colors"
                :style="{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)' }"
                @click="nextImage"
                aria-label="Next image"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Image Counter -->
              <span
                v-if="item.images?.length > 1"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 text-white text-sm"
                :style="{ backgroundColor: 'var(--color-text)' }"
              >
                {{ currentIndex + 1 }} / {{ item.images.length }}
              </span>
            </div>

            <!-- Item Details -->
            <div class="md:w-1/3 p-8 overflow-y-auto">
              <div class="space-y-6">
                <div>
                  <div class="flex items-center gap-3 text-sm font-sans mb-2" :style="{ color: 'var(--color-text-muted)' }">
                    <span v-if="item.category">{{ item.category }}</span>
                    <span v-if="item.category && item.year">|</span>
                    <span v-if="item.year">{{ item.year }}</span>
                  </div>
                  <h2 class="text-2xl font-serif" :style="{ color: 'var(--color-text)' }">{{ item.title }}</h2>
                  <p v-if="item.location" class="text-sm font-sans mt-1" :style="{ color: 'var(--color-text-muted)' }">
                    {{ item.location }}
                  </p>
                </div>

                <p v-if="item.description" class="text-sm font-sans leading-relaxed" :style="{ color: 'var(--color-text-muted)' }">
                  {{ item.description }}
                </p>

                <!-- Academic Details -->
                <div v-if="item.details" class="space-y-2 pt-4 border-t" :style="{ borderColor: 'var(--color-border)' }">
                  <h3 class="text-sm font-sans font-medium" :style="{ color: 'var(--color-text)' }">Details</h3>
                  <template v-for="(value, key) in item.details" :key="key">
                    <div v-if="value" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
                      <span :style="{ color: 'var(--color-text-light)' }">{{ formatKey(key) }}:</span> {{ value }}
                    </div>
                  </template>
                </div>
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
  item: {
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

const formatKey = (key) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}

const currentImage = computed(() => {
  if (props.item.coverImage && currentIndex.value === 0) {
    return props.item.coverImage
  }
  if (props.item.images?.length) {
    const idx = currentIndex.value > 0 ? currentIndex.value - 1 : 0
    return props.item.images[idx]
  }
  return null
})

const nextImage = () => {
  const total = (props.item.images?.length || 0) + 1
  currentIndex.value = (currentIndex.value + 1) % total
}

const prevImage = () => {
  const total = (props.item.images?.length || 0) + 1
  currentIndex.value = (currentIndex.value - 1 + total) % total
}

const close = () => {
  emit('close')
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>