<template>
  <div
    class="group cursor-pointer"
    :style="{ backgroundColor: 'var(--color-bg-card)' }"
    @click="$emit('click')"
  >
    <!-- Cover Image -->
    <div class="aspect-[4/3] overflow-hidden mb-4" :style="{ backgroundColor: 'var(--color-bg-alt)' }">
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <span class="font-serif italic" :style="{ color: 'var(--color-text-light)' }">Project Image</span>
      </div>
    </div>

    <!-- Project Info -->
    <div class="space-y-1">
      <div class="flex items-center gap-3 text-xs font-sans" :style="{ color: 'var(--color-text-muted)' }">
        <span v-if="project.category">{{ project.category }}</span>
        <span v-if="project.category && project.year">|</span>
        <span v-if="project.year">{{ project.year }}</span>
      </div>
      <h3 class="text-lg font-serif transition-colors" :style="{ color: 'var(--color-text)' }" @mouseenter="$event.target.style.color = 'var(--color-accent)'" @mouseleave="$event.target.style.color = ''">
        {{ project.title }}
      </h3>
      <p v-if="project.location" class="text-sm font-sans" :style="{ color: 'var(--color-text-muted)' }">
        {{ project.location }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
