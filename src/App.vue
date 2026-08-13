<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { useTheme } from '@/composables/useTheme'

const scrollProgress = ref(0)
let ticking = false

// Init theme on app mount
useTheme()

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.value = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div
    id="scroll-progress"
    :style="{ width: scrollProgress + '%' }"
    aria-hidden="true"
  />

  <div class="ambient-bg" aria-hidden="true">
    <span class="ambient-blob ambient-blob-1" />
    <span class="ambient-blob ambient-blob-2" />
    <span class="ambient-blob ambient-blob-3" />
  </div>

  <a href="#main-content" class="skip-link">Skip to main content</a>

  <TheNavbar />

  <main id="main-content">
    <RouterView />
  </main>

  <TheFooter />
</template>
