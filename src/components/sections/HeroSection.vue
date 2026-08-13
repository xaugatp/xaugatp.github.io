<script setup lang="ts">
import { ref } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'
import { useParticleNetwork } from '@/composables/useParticleNetwork'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { Mail, ChevronDown, Sparkles, ArrowRight, CheckCircle } from '@lucide/vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'

const heroRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const { displayText, cursorVisible } = useTypewriter([
  'production-ready AI systems',
  'fullstack web products end-to-end',
  'enterprise LLM and RAG pipelines',
  'edge computer vision for real-world operations',
])

useParticleNetwork(canvasRef, heroRef)
const { isVisible } = useScrollAnimation(contentRef, { threshold: 0.05 })

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const trustSignals = [
  'Government & enterprise clients',
  'University research partnerships',
  'Production AI in the field',
]
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
  >
    <!-- Particle Canvas -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 z-0 opacity-80"
      aria-hidden="true"
    />

    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 z-[1] pointer-events-none"
      style="background: linear-gradient(to bottom, rgba(10,10,12,0.15) 0%, transparent 50%, var(--bg-base) 100%)"
      aria-hidden="true"
    />

    <!-- Content -->
    <div
      ref="contentRef"
      class="relative z-10 max-w-4xl scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <!-- Availability Badge -->
      <div
        class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border shadow-lg backdrop-blur-md mb-8"
        :style="{ background: 'var(--badge-bg)', borderColor: 'var(--border-subtle)' }"
      >
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span class="text-xs font-semibold tracking-wide" :style="{ color: 'var(--text-secondary)' }">
          Available for Freelance Projects
        </span>
      </div>

      <p class="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3 flex items-center justify-center gap-2 text-accent-500">
        <Sparkles :size="14" />
        Saugat Poudel · AI and Software Engineer
      </p>

      <h1 class="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6">
        <span class="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          I build, ship and
        </span>
        <span
          class="block text-2xl sm:text-4xl md:text-5xl font-extrabold mt-2 normal-case gradient-text"
        >
          operate your AI and software end to end.
        </span>
      </h1>

      <!-- Typewriter Subhead -->
      <div class="mb-8 min-h-[2.5rem]">
        <p class="text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed" :style="{ color: 'var(--text-secondary)' }">
          I deliver <span class="gradient-text font-bold">{{ displayText }}</span>
          <span
            class="inline-block w-0.5 h-5 md:h-6 bg-accent-500 ml-1 align-middle transition-opacity"
            :class="cursorVisible ? 'opacity-100' : 'opacity-0'"
          />
        </p>
      </div>

      <p class="text-base md:text-lg font-light max-w-2xl mx-auto mb-8 leading-relaxed" :style="{ color: 'var(--text-muted)' }">
        One point of contact, from architecture and AI model design to deployment and production operations. No handoffs, no silos.
      </p>

      <!-- Trust Signals -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <span
          v-for="signal in trustSignals"
          :key="signal"
          class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
          :style="{ color: 'var(--text-secondary)', background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }"
        >
          <CheckCircle :size="12" class="text-emerald-500" />
          {{ signal }}
        </span>
      </div>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3.5 max-w-md mx-auto mb-12">
        <a
          href="#contact"
          class="min-h-[48px] px-8 py-3.5 text-sm font-bold text-white rounded-xl shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          style="background: linear-gradient(135deg, #D97706, #F59E0B); box-shadow: 0 8px 30px rgba(217,119,6,0.3);"
          @click.prevent="scrollTo('#contact')"
        >
          Start a Project
          <ArrowRight :size="16" />
        </a>
        <a
          href="#projects"
          class="min-h-[48px] px-7 py-3.5 text-sm font-semibold rounded-xl border transition-all backdrop-blur-md flex items-center justify-center cursor-pointer"
          :style="{ color: 'var(--text-secondary)', background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }"
          @click.prevent="scrollTo('#projects')"
        >
          View Case Studies
        </a>
      </div>

      <!-- Social Icons -->
      <div class="flex justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/xaugat/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-md"
          :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
        >
          <LinkedinIcon class="w-[18px] h-[18px]" />
        </a>
        <a
          href="https://github.com/xaugatp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-md"
          :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
        >
          <GithubIcon class="w-[18px] h-[18px]" />
        </a>
        <a
          href="mailto:contact.saugatpoudel@gmail.com"
          aria-label="Email"
          class="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-md"
          :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
        >
          <Mail :size="18" />
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-6 z-10 animate-bounce">
      <ChevronDown :size="24" :style="{ color: 'var(--text-faint)' }" />
    </div>
  </section>
</template>
