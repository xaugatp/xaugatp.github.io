<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { experiences } from '@/data/experience'
import { ExternalLink } from '@lucide/vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.05 })
</script>

<template>
  <section id="experience" class="section-padding">
    <div
      ref="sectionRef"
      class="max-w-[900px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-xs font-bold uppercase tracking-widest mb-3 text-accent-500">
          Track Record
        </p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: 'var(--text-primary)' }">
          Where I have delivered <span class="gradient-text">real-world results</span>
        </h2>
        <p class="max-w-lg mx-auto text-sm font-light" :style="{ color: 'var(--text-muted)' }">
          From government emergency services and enterprise platforms to university research labs, I have shipped production-grade AI and software across demanding domains.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div
          class="absolute left-6 md:left-8 top-0 bottom-0 w-px"
          style="background: linear-gradient(to bottom, #D97706, #F59E0B, transparent)"
        />

        <div class="space-y-8">
          <div
            v-for="(exp, i) in experiences"
            :key="exp.id"
            class="relative pl-16 md:pl-20"
            :style="{ transitionDelay: `${i * 90}ms` }"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-4 md:left-6 w-4 h-4 rounded-full border-2 top-2"
              :style="{ background: 'var(--bg-base)', borderColor: exp.current ? '#D97706' : '#F59E0B', boxShadow: exp.current ? '0 0 14px rgba(217,119,6,0.5)' : 'none' }"
            >
              <div
                v-if="exp.current"
                class="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-40"
              />
            </div>

            <!-- Card -->
            <div class="glass-card p-6 md:p-7">
              <div class="flex items-start gap-4 mb-4">
                <!-- Logo -->
                <div
                  class="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 overflow-hidden"
                  :style="{ background: 'var(--bg-base)', borderColor: 'var(--border-subtle)' }"
                >
                  <img
                    v-if="exp.logo"
                    :src="exp.logo"
                    :alt="exp.company"
                    class="w-full h-full object-contain p-1.5"
                    loading="lazy"
                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                  />
                  <span
                    v-if="exp.logoFallback"
                    class="text-xs font-bold text-accent-500 uppercase"
                  >
                    {{ exp.logoFallback }}
                  </span>
                </div>

                <div class="flex-1 min-w-0">
                  <h3 class="text-base md:text-lg font-bold leading-snug" :style="{ color: 'var(--text-primary)' }">
                    {{ exp.role }}
                  </h3>
                  <p class="text-sm font-medium" :style="{ color: 'var(--text-secondary)' }">
                    {{ exp.company }}
                  </p>
                  <p class="text-xs mt-0.5 font-light" :style="{ color: 'var(--text-muted)' }">
                    {{ exp.period }}
                    <span v-if="exp.location"> · {{ exp.location }}</span>
                  </p>
                </div>

                <span
                  v-if="exp.current"
                  class="text-[0.65rem] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shrink-0"
                >
                  Current
                </span>
              </div>

              <ul class="space-y-2 mb-5">
                <li
                  v-for="bullet in exp.bullets"
                  :key="bullet"
                  class="flex items-start gap-2.5 text-sm font-light leading-relaxed"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  <span class="text-accent-500 mt-0.5 shrink-0">▹</span>
                  {{ bullet }}
                </li>
              </ul>

              <a
                v-if="exp.websiteUrl"
                :href="exp.websiteUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-500 hover:text-amber-400 transition-colors"
              >
                <ExternalLink :size="13" />
                Visit {{ exp.company }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
