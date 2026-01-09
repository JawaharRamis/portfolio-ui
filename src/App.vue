<template>
  <div class="min-h-screen bg-white">
    <NavigationBar />
    <HeroSection />
    <AboutSection />
    <ProjectsGallery />
    <ArtGallery />
    <FooterSection />
  </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsGallery from './components/ProjectsGallery.vue'
import ArtGallery from './components/ArtGallery.vue'
import FooterSection from './components/FooterSection.vue'
</script>
