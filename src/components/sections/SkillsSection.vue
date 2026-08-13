<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { skillGroups } from '@/data/skills'
import {
  Brain, Monitor, Server, Database, Cloud,
} from '@lucide/vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.05 })

const iconMap: Record<string, any> = {
  Brain, Monitor, Server, Database, Cloud,
}
</script>

<template>
  <section id="skills" class="section-padding">
    <div
      ref="sectionRef"
      class="max-w-[1200px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-sm font-semibold uppercase tracking-wider mb-3 text-accent-500">
          Expertise
        </p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: 'var(--text-primary)' }">
          Technical <span class="gradient-text">Skills</span>
        </h2>
        <p class="max-w-xl mx-auto" :style="{ color: 'var(--text-muted)' }">
          Competencies across AI, ML, cloud, and fullstack engineering.
        </p>
      </div>

      <!-- Skill Groups -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(group, i) in skillGroups"
          :key="group.id"
          class="glass-card p-6"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <div class="flex items-center gap-3 mb-5 pb-4 border-b" :style="{ borderColor: 'var(--border-subtle)' }">
            <component
              :is="iconMap[group.icon]"
              :size="20"
              class="text-accent-500"
            />
            <h3 class="text-sm font-bold uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">
              {{ group.title }}
            </h3>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.skills"
              :key="skill"
              class="text-[0.75rem] font-medium px-3 py-1.5 rounded-full border transition-all cursor-default hover:-translate-y-0.5 hover:text-white hover:bg-accent-500 hover:border-accent-500"
              :style="{ color: 'var(--text-secondary)', background: 'var(--pillar-bg)', borderColor: 'var(--border-subtle)' }"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
