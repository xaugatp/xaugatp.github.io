<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { ArrowRight, Sparkles } from '@lucide/vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.2 })

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="py-20 px-6">
    <div
      ref="sectionRef"
      class="max-w-[1000px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <div class="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center shadow-2xl"
        style="background: linear-gradient(135deg, #D97706, #B45309, #92400E); box-shadow: 0 25px 60px rgba(217,119,6,0.25);">
        <!-- Dot pattern -->
        <div
          class="absolute inset-0 opacity-15"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px); background-size: 24px 24px;"
          aria-hidden="true"
        />

        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles :size="14" />
          AI and Software Freelancer · Available Now
        </div>

        <h2 class="relative text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          Have an AI or software project in mind?
        </h2>
        <p class="relative text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto font-light">
          Whether you need a fullstack web platform, a production LLM pipeline, or edge AI on custom hardware, I deliver end to end with one point of contact.
        </p>
        <a
          href="#contact"
          class="relative inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold rounded-xl shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
          style="background: white; color: #1A1A1A;"
          @click.prevent="scrollTo('#contact')"
        >
          Get in Touch
          <ArrowRight :size="16" />
        </a>
      </div>
    </div>
  </section>
</template>
