<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70" @click="close"></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
          :style="{ backgroundColor: 'var(--color-bg-card)' }"
        >
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

          <div class="flex flex-col md:flex-row h-full">
            <!-- Info Side -->
            <div
              class="md:w-2/5 p-8 flex flex-col justify-between"
              :style="{ backgroundColor: 'var(--color-bg-alt)' }"
            >
              <div>
                <h2 class="text-2xl font-serif mb-4" :style="{ color: 'var(--color-text)' }">Let's Connect</h2>
                <p class="text-sm font-sans leading-relaxed mb-8" :style="{ color: 'var(--color-text-muted)' }">
                  Interested in working together? Send me a message and I'll get back to you soon.
                </p>

                <div class="space-y-4">
                  <a
                    v-if="profile?.contact?.email"
                    :href="`mailto:${profile.contact.email}`"
                    class="flex items-center gap-3 text-sm font-sans transition-colors"
                    :style="{ color: 'var(--color-text-muted)' }"
                    @mouseenter="$event.target.style.color = 'var(--color-accent)'"
                    @mouseleave="$event.target.style.color = ''"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ profile.contact.email }}
                  </a>
                  <p
                    v-if="profile?.contact?.location"
                    class="flex items-center gap-3 text-sm font-sans"
                    :style="{ color: 'var(--color-text-muted)' }"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ profile.contact.location }}
                  </p>
                </div>
              </div>

              <!-- Social Links -->
              <div class="flex items-center gap-4 pt-8">
                <a
                  v-if="profile?.contact?.social?.linkedin"
                  :href="profile.contact.social.linkedin"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors"
                  :style="{ color: 'var(--color-text-muted)' }"
                  @mouseenter="$event.target.style.color = 'var(--color-accent)'"
                  @mouseleave="$event.target.style.color = ''"
                  aria-label="LinkedIn"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  v-if="profile?.contact?.social?.instagram"
                  :href="profile.contact.social.instagram"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors"
                  :style="{ color: 'var(--color-text-muted)' }"
                  @mouseenter="$event.target.style.color = 'var(--color-accent)'"
                  @mouseleave="$event.target.style.color = ''"
                  aria-label="Instagram"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Form Side -->
            <div class="md:w-3/5 p-8 overflow-y-auto">
              <form @submit.prevent="submitForm" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-sans font-medium mb-2" :style="{ color: 'var(--color-text)' }">Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 text-sm font-sans transition-colors rounded-lg border"
                    :style="{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: formErrors.name ? '#EF4444' : 'var(--color-border)',
                      color: 'var(--color-text)'
                    }"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-sans font-medium mb-2" :style="{ color: 'var(--color-text)' }">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 text-sm font-sans transition-colors rounded-lg border"
                    :style="{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: formErrors.email ? '#EF4444' : 'var(--color-border)',
                      color: 'var(--color-text)'
                    }"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label for="subject" class="block text-sm font-sans font-medium mb-2" :style="{ color: 'var(--color-text)' }">Subject</label>
                  <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    required
                    class="w-full px-4 py-3 text-sm font-sans transition-colors rounded-lg border"
                    :style="{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)'
                    }"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label for="message" class="block text-sm font-sans font-medium mb-2" :style="{ color: 'var(--color-text)' }">Message</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    required
                    class="w-full px-4 py-3 text-sm font-sans transition-colors rounded-lg border resize-none"
                    :style="{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)'
                    }"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full py-4 px-6 text-sm font-sans font-medium tracking-wide rounded-lg transition-all duration-300"
                  :style="{
                    backgroundColor: submitStatus === 'success' ? '#10B981' : 'var(--color-text)',
                    color: submitStatus === 'success' ? 'white' : 'var(--color-bg)'
                  }"
                  :disabled="submitStatus === 'submitting'"
                >
                  <span v-if="submitStatus === 'idle'">Send Message</span>
                  <span v-else-if="submitStatus === 'submitting'">Sending...</span>
                  <span v-else-if="submitStatus === 'success'">Message Sent!</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import profileData from '@/data/profile.json'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const profile = computed(() => profileData)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const formErrors = ref({})
const submitStatus = ref('idle')

const validateForm = () => {
  const errors = {}
  if (!form.value.name.trim()) errors.name = true
  if (!form.value.email.trim() || !form.value.email.includes('@')) errors.email = true
  formErrors.value = errors
  return Object.keys(errors).length === 0
}

const submitForm = () => {
  if (!validateForm()) return

  submitStatus.value = 'submitting'

  // Simulate form submission
  setTimeout(() => {
    // In production, this would send to a backend
    console.log('Form submitted:', form.value)
    submitStatus.value = 'success'

    // Reset form after success
    setTimeout(() => {
      form.value = { name: '', email: '', subject: '', message: '' }
      submitStatus.value = 'idle'
      close()
    }, 2000)
  }, 1500)
}

const close = () => {
  emit('close')
}

const handleKeydown = (e) => {
  if (!props.visible) return
  if (e.key === 'Escape') close()
}

watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
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

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}
</style>
