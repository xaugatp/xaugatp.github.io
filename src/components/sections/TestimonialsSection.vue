<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { testimonials } from '@/data/testimonials'
import { Quote, Star } from '@lucide/vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.05 })
</script>

<template>
  <section id="testimonials" class="section-padding">
    <div
      ref="sectionRef"
      class="max-w-[1200px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-xs font-bold uppercase tracking-widest mb-3 text-accent-500">
          Social Proof
        </p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: 'var(--text-primary)' }">
          What clients and collaborators <span class="gradient-text">say</span>
        </h2>
        <p class="max-w-lg mx-auto text-sm font-light" :style="{ color: 'var(--text-muted)' }">
          Words from the software leads, emergency operations managers, and research professors I have worked with directly.
        </p>
      </div>

      <!-- Testimonial Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(testimonial, i) in testimonials"
          :key="testimonial.id"
          class="glass-card p-7 flex flex-col justify-between"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <!-- Stars -->
              <div class="flex gap-1">
                <Star
                  v-for="n in 5"
                  :key="n"
                  :size="14"
                  class="fill-accent-500 text-accent-500"
                />
              </div>
              <Quote :size="20" class="text-accent-500/30" />
            </div>

            <p class="text-sm leading-relaxed font-light mb-6 italic" :style="{ color: 'var(--text-secondary)' }">
              "{{ testimonial.quote }}"
            </p>
          </div>

          <div class="flex items-center gap-3 pt-4 border-t" :style="{ borderColor: 'var(--border-subtle)' }">
            <!-- Avatar initial -->
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow-md"
              style="background: linear-gradient(135deg, #D97706, #F59E0B)">
              {{ testimonial.name.charAt(0) }}
            </div>
            <div>
              <p class="text-sm font-bold" :style="{ color: 'var(--text-primary)' }">
                {{ testimonial.name }}
              </p>
              <p class="text-xs font-light" :style="{ color: 'var(--text-muted)' }">
                {{ testimonial.title }}, {{ testimonial.company }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
