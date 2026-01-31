<template>
  <div class="min-h-screen" :style="{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }">
    <NavigationBar @open-contact="contactModalOpen = true" />
    <main>
      <HeroSection id="hero" @open-contact="contactModalOpen = true" />
      <AboutSection id="about" />
      <ProjectsGallery id="projects" />
      <AcademicGallery id="academic" />
      <ArtGallery id="artwork" />
    </main>
    <FooterSection id="footer" @open-contact="contactModalOpen = true" />
    <ContactModal :visible="contactModalOpen" @close="contactModalOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsGallery from './components/ProjectsGallery.vue'
import AcademicGallery from './components/AcademicGallery.vue'
import ArtGallery from './components/ArtGallery.vue'
import FooterSection from './components/FooterSection.vue'
import ContactModal from './components/ContactModal.vue'
import { useTheme } from './composables/useTheme'

const { setTheme } = useTheme()
const contactModalOpen = ref(false)

onMounted(() => {
  setTheme('sandstone')
})
</script>
