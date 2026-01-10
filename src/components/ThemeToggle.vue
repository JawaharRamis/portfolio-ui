<template>
  <div class="relative">
    <button
      class="flex items-center gap-2 rounded-lg transition-all duration-300"
      :class="isSmall ? 'p-2' : 'px-3 py-2'"
      :style="{ color: 'var(--color-text-muted)' }"
      @click="toggleDropdown = !toggleDropdown"
      @blur="handleBlur"
      aria-label="Choose theme"
    >
      <!-- Theme icon that changes based on current theme -->
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle v-if="currentTheme === 'sandstone'" cx="12" cy="12" r="5" stroke="currentColor" />
        <circle v-if="currentTheme === 'deep-ocean'" cx="12" cy="12" r="3" stroke="currentColor" />
        <circle v-if="currentTheme === 'slate-blush'" cx="12" cy="12" r="4" stroke="currentColor" />
        <g v-if="currentTheme === 'sandstone'" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
        <g v-if="currentTheme === 'deep-ocean'" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </g>
        <g v-if="currentTheme === 'slate-blush'" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </g>
      </svg>
      <span v-if="!isSmall" class="hidden sm:inline text-xs font-medium uppercase tracking-wider">{{ currentTheme }}</span>
      <svg v-if="!isSmall" class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': toggleDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toggleDropdown"
        class="absolute right-0 mt-2 py-2 min-w-[160px] rounded-xl shadow-lg border"
        :style="{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }"
      >
        <button
          v-for="theme in themes"
          :key="theme"
          class="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 hover:pl-6"
          :class="{ 'font-medium': currentTheme === theme }"
          :style="{
            color: currentTheme === theme ? 'var(--color-accent)' : 'var(--color-text)'
          }"
          @click="selectTheme(theme)"
        >
          <!-- Color indicator -->
          <span
            class="w-4 h-4 rounded-full border border-opacity-50"
            :style="{ backgroundColor: getThemeColor(theme), borderColor: 'var(--color-border)' }"
          ></span>
          <span class="capitalize">{{ theme.replace('-', ' ') }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

defineProps({
  isSmall: {
    type: Boolean,
    default: false
  }
})

const { currentTheme, themes, setTheme, toggleDropdown } = useTheme()

const selectTheme = (theme) => {
  setTheme(theme)
  toggleDropdown.value = false
}

const handleBlur = () => {
  setTimeout(() => {
    toggleDropdown.value = false
  }, 150)
}

const getThemeColor = (theme) => {
  const colors = {
    'sandstone': '#C4613A',
    'deep-ocean': '#E86A53',
    'slate-blush': '#D4727A'
  }
  return colors[theme] || '#000'
}
</script>
