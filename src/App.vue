<template>
  <div class="min-h-screen" :style="{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }">
    <NavigationBar />
    <main>
      <HeroSection id="hero" />
      <AboutSection id="about" />
      <ProjectsGallery id="projects" />
      <ArtGallery id="artwork" />
    </main>
    <FooterSection id="footer" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsGallery from './components/ProjectsGallery.vue'
import ArtGallery from './components/ArtGallery.vue'
import FooterSection from './components/FooterSection.vue'
import { useTheme } from './composables/useTheme'

const { setTheme } = useTheme()

onMounted(() => {
  setTheme('sandstone')
})
</script>
