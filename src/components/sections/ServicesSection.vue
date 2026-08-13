<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { services } from '@/data/services'
import {
  Globe, Bot, BarChart3, Cloud, FlaskConical, Cpu,
} from '@lucide/vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.05 })

const iconMap: Record<string, any> = {
  Globe, Bot, BarChart3, Cloud, FlaskConical, Cpu,
}
</script>

<template>
  <section id="services" class="section-padding">
    <div
      ref="sectionRef"
      class="max-w-[1200px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-sm font-semibold uppercase tracking-wider mb-3 text-accent-500">
          What I Do
        </p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: 'var(--text-primary)' }">
          Services for clients who need
          <span class="gradient-text">results, not reports</span>
        </h2>
        <p class="max-w-xl mx-auto" :style="{ color: 'var(--text-muted)' }">
          I handle the full delivery chain: design, build, deploy, and operate. One point of contact, from the API to the AI.
        </p>
      </div>

      <!-- Service Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(service, i) in services"
          :key="service.id"
          class="glass-card p-7 group relative overflow-hidden"
          :class="service.highlighted ? 'border-accent-500/30' : ''"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <!-- Highlight accent bar -->
          <div
            v-if="service.highlighted"
            class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-500 to-amber-400"
          />

          <!-- Icon -->
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors"
            :style="{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.2)' }"
          >
            <component
              :is="iconMap[service.icon]"
              :size="22"
              class="text-accent-500"
            />
          </div>

          <h3 class="text-lg font-bold mb-2" :style="{ color: 'var(--text-primary)' }">
            {{ service.title }}
          </h3>
          <p class="text-sm leading-relaxed mb-5" :style="{ color: 'var(--text-muted)' }">
            {{ service.description }}
          </p>

          <!-- Capabilities -->
          <ul class="space-y-2">
            <li
              v-for="cap in service.capabilities"
              :key="cap"
              class="flex items-start gap-2 text-sm"
              :style="{ color: 'var(--text-secondary)' }"
            >
              <span class="text-accent-500 mt-0.5 shrink-0">▹</span>
              {{ cap }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
