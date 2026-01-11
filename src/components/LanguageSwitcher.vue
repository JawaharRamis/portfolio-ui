<template>
  <div class="flex items-center gap-2">
    <button
      v-for="locale in locales"
      :key="locale.value"
      class="text-sm font-sans transition-colors duration-200"
      :class="currentLocale === locale.value ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-600'"
      @click="setLocale(locale.value)"
    >
      {{ locale.label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const locales = [
  { label: 'EN', value: 'en' },
  { label: 'DE', value: 'de' }
]

const currentLocale = computed(() => locale.value)

const setLocale = (newLocale) => {
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}
</script>
