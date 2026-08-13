<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { projects } from '@/data/projects'
import { ExternalLink, X, Sparkles, Layers, Cpu, Monitor } from '@lucide/vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.05 })

const activeFilter = ref<string>('all')
const selectedProject = ref<typeof projects[number] | null>(null)

const categories = [
  { id: 'all', label: 'All Works', icon: Layers },
  { id: 'web', label: 'Software & Web Dev', icon: Monitor },
  { id: 'ai', label: 'Applied AI & LLMs', icon: Sparkles },
  { id: 'research', label: 'ML Research & Vision', icon: Cpu },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category === activeFilter.value)
})

function openModal(project: typeof projects[number]) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

// Category gradient mapping (Clean, premium slate-charcoal and gold/amber-bronze tones)
const categoryGradients: Record<string, string> = {
  web: 'from-slate-900 to-surface-850',
  ai: 'from-slate-900 via-indigo-950/40 to-surface-850',
  research: 'from-slate-900 via-accent-600/10 to-surface-850',
  data: 'from-slate-900 to-surface-850',
}

const categoryLabels: Record<string, string> = {
  web: 'Software & Web Dev',
  ai: 'Applied AI & LLMs',
  research: 'ML Research & Vision',
  data: 'Data Pipelines',
}
</script>

<template>
  <section id="projects" class="section-padding">
    <div
      ref="sectionRef"
      class="max-w-[1200px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <!-- Header -->
      <div class="text-center mb-12">
        <p class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-3">
          Proof of Work & Research
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured <span class="gradient-text">Projects & Applied R&D</span>
        </h2>
        <p class="text-slate-400 max-w-xl mx-auto text-sm font-light">
          Production systems, research models, and interactive software with measurable technical impact.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
          :class="
            activeFilter === cat.id
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-105'
              : 'bg-surface-850 text-slate-400 border border-slate-700/60 hover:border-slate-500 hover:text-slate-200'
          "
          @click="activeFilter = cat.id"
        >
          <component :is="cat.icon" :size="14" />
          {{ cat.label }}
        </button>
      </div>

      <!-- Project Grid -->
      <TransitionGroup
        name="project"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="glass-card overflow-hidden cursor-pointer group flex flex-col justify-between"
          :class="project.featured ? 'md:col-span-2' : ''"
          tabindex="0"
          role="button"
          :aria-label="`View details for ${project.title}`"
          @click="openModal(project)"
          @keydown.enter="openModal(project)"
          @keydown.space.prevent="openModal(project)"
        >
          <!-- Banner -->
          <div
            class="relative h-48 md:h-56 overflow-hidden flex items-center justify-center p-6 bg-gradient-to-br"
            :class="categoryGradients[project.category] || 'from-indigo-900 to-slate-900'"
          >
            <!-- Project Image Backing -->
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <!-- Background mesh -->
            <div
              v-else
              class="absolute inset-0 opacity-20"
              style="background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 28px 28px;"
            />
            <!-- Glow circle -->
            <div class="absolute w-56 h-56 rounded-full bg-brand-500/10 blur-3xl group-hover:scale-125 transition-transform duration-700" />

            <!-- Featured Badge -->
            <span
              v-if="project.featured"
              class="absolute top-4 left-4 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md px-3 py-1 rounded-full z-10"
            >
              Featured Case Study
            </span>

            <!-- Category Badge -->
            <span class="absolute top-4 right-4 text-[0.65rem] font-bold uppercase tracking-wider text-brand-300 bg-brand-500/20 border border-brand-500/30 backdrop-blur-md px-3 py-1 rounded-full z-10">
              {{ categoryLabels[project.category] || project.category }}
            </span>

            <!-- Banner Title -->
            <div class="relative z-10 text-center max-w-lg">
              <h3 class="text-xl md:text-2xl font-black text-white drop-shadow-md leading-snug group-hover:text-brand-300 transition-colors">
                {{ project.title }}
              </h3>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-brand-500 px-4 py-2 rounded-full shadow-lg">
                Inspect Architecture & Metrics →
              </span>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p class="text-sm text-slate-300 leading-relaxed font-light mb-4">
                {{ project.summary }}
              </p>

              <!-- Key Bullet Preview -->
              <ul class="space-y-1.5 mb-5">
                <li
                  v-for="(bullet, idx) in project.bullets.slice(0, 2)"
                  :key="idx"
                  class="flex items-start gap-2 text-xs text-slate-400 font-light"
                >
                  <span class="text-brand-400 shrink-0">▹</span>
                  {{ bullet }}
                </li>
              </ul>
            </div>

            <div class="flex flex-wrap gap-1.5 pt-4 border-t border-slate-700/50">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="text-[0.68rem] font-medium px-2.5 py-1 rounded-md bg-surface-850 text-brand-300 border border-slate-700/70"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <!-- Modal -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="selectedProject"
            class="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            :aria-label="`${selectedProject.title} details`"
            @click.self="closeModal"
            @keydown.escape="closeModal"
          >
            <div class="bg-surface-850 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <!-- Modal Header -->
              <div
                class="relative p-8 flex items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br"
                :class="categoryGradients[selectedProject.category] || 'from-indigo-900 to-slate-900'"
              >
                <!-- Project Image Background -->
                <img
                  v-if="selectedProject.image"
                  :src="selectedProject.image"
                  :alt="selectedProject.title"
                  class="absolute inset-0 w-full h-full object-cover opacity-25"
                />
                <div v-else class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 28px 28px;" />
                
                <div class="relative z-10 text-center">
                  <span class="inline-block text-[0.65rem] font-bold uppercase tracking-widest text-brand-300 bg-brand-500/20 border border-brand-500/30 px-3 py-1 rounded-full mb-3">
                    {{ categoryLabels[selectedProject.category] || selectedProject.category }}
                  </span>
                  <h2 class="text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
                    {{ selectedProject.title }}
                  </h2>
                </div>
                <button
                  class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
                  aria-label="Close"
                  @click="closeModal"
                >
                  <X :size="18" />
                </button>
              </div>

              <!-- Modal Body -->
              <div class="p-6 md:p-8">
                <p class="text-slate-300 leading-relaxed font-light mb-6">
                  {{ selectedProject.description }}
                </p>

                <div class="flex flex-wrap gap-1.5 mb-6">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="text-xs font-medium px-3 py-1 rounded-md bg-surface-950 text-brand-300 border border-slate-700"
                  >
                    {{ tech }}
                  </span>
                </div>

                <hr class="border-slate-700/60 mb-6" />

                <p class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-4">
                  Technical Architecture & Key Metrics
                </p>
                <ul class="space-y-3 mb-8">
                  <li
                    v-for="bullet in selectedProject.bullets"
                    :key="bullet"
                    class="flex items-start gap-3 text-sm text-slate-300 leading-relaxed font-light"
                  >
                    <span class="text-brand-400 mt-0.5 shrink-0">▹</span>
                    {{ bullet }}
                  </li>
                </ul>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-3">
                  <a
                    v-if="selectedProject.demoUrl"
                    :href="selectedProject.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 transition-all shadow-md"
                  >
                    <ExternalLink :size="16" />
                    Live System Demo
                  </a>
                  <a
                    v-if="selectedProject.githubUrl"
                    :href="selectedProject.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-300 rounded-xl bg-surface-950 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
                  >
                    <GithubIcon class="w-[16px] h-[16px]" />
                    Source Code & Docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </section>
</template>

<style scoped>
.project-enter-active,
.project-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.project-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.project-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.project-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
