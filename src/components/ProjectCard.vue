<template>
  <div
    class="group cursor-pointer bg-white"
    @click="$emit('click')"
  >
    <!-- Cover Image -->
    <div class="aspect-[4/3] bg-gray-200 overflow-hidden mb-4">
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
        <span class="font-serif italic">Project Image</span>
      </div>
    </div>

    <!-- Project Info -->
    <div class="space-y-1">
      <div class="flex items-center gap-3 text-xs font-sans text-gray-500">
        <span v-if="project.category">{{ project.category }}</span>
        <span v-if="project.category && project.year">|</span>
        <span v-if="project.year">{{ project.year }}</span>
      </div>
      <h3 class="text-lg font-serif text-gray-900 group-hover:text-gray-600 transition-colors">
        {{ project.title }}
      </h3>
      <p v-if="project.location" class="text-sm font-sans text-gray-500">
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
