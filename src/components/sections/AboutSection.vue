<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { Briefcase, GraduationCap, FolderGit2, Code2, Brain, Cpu, LineChart, ShieldCheck } from '@lucide/vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.1 })

const stats = [
  { icon: FolderGit2, value: '10', suffix: '+', label: 'Projects Delivered' },
  { icon: Briefcase, value: '10', suffix: '+', label: 'Organisations Served' },
  { icon: GraduationCap, value: '2', suffix: '', label: 'Degrees' },
]

const pillars = [
  {
    icon: Code2,
    title: 'Fullstack Software Engineering',
    desc: 'I design, build, and maintain complete software systems end to end. My focus is on the right architecture and delivery—not a single language or framework. From web platforms to internal tools and APIs, I take ownership of the full product lifecycle.',
  },
  {
    icon: Brain,
    title: 'Production AI and LLM Systems',
    desc: 'I build AI systems that work in production—not just demos. RAG pipelines, LLM integrations, document intelligence, and private offline deployments. The focus is measurable outcomes: faster retrieval, reliable automation, and data governance.',
  },
  {
    icon: Cpu,
    title: 'Edge AI and Computer Vision',
    desc: 'I design and deploy computer vision systems for real-world environments where latency, connectivity, and reliability matter—including drone platforms, industrial, remote sensing, and field applications.',
  },
  {
    icon: LineChart,
    title: 'Applied ML Research',
    desc: 'I partner with universities and enterprises to turn complex data into applied research outcomes. Experience spans agricultural analytics, financial text modeling, remote sensing, and NLP—always with reproducible methods and actionable results.',
  },
]

const trustItems = [
  'Delivered for NT Government (NTFES) emergency services',
  'Research collaborations with University of Sydney and Charles Darwin University',
  'Enterprise software delivery at Radical Systems (AU)',
  'Zero missed deadlines across all client engagements',
]
</script>

<template>
  <section id="about" class="section-padding">
    <div
      ref="sectionRef"
      class="max-w-[1200px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Left: Photo, Stats, Trust Items -->
        <div class="flex flex-col items-center gap-8 order-first lg:order-last">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-accent-500 via-amber-400 to-accent-600 rounded-2xl opacity-35 blur-md group-hover:opacity-60 transition-opacity duration-500" />
            <div
              class="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border-2"
              :style="{ borderColor: 'var(--border-card)', background: 'var(--bg-card)' }"
            >
              <img
                src="/assets/images/profile/me.png"
                alt="Saugat Poudel"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-3 w-full max-w-[420px]">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="glass-card !rounded-xl p-4 text-center hover:!transform-none"
            >
              <component :is="stat.icon" :size="22" class="mx-auto mb-2 text-accent-500" />
              <span class="text-2xl font-extrabold text-accent-500 block">
                {{ stat.value }}{{ stat.suffix }}
              </span>
              <span class="text-[0.65rem] font-bold uppercase tracking-wider" :style="{ color: 'var(--text-muted)' }">
                {{ stat.label }}
              </span>
            </div>
          </div>

          <!-- Trust List -->
          <div
            class="w-full rounded-xl p-5 border"
            :style="{ background: 'var(--pillar-bg)', borderColor: 'var(--border-subtle)' }"
          >
            <p class="text-xs font-bold uppercase tracking-widest mb-3 text-accent-500 flex items-center gap-1.5">
              <ShieldCheck :size="14" />
              Why clients trust me
            </p>
            <ul class="space-y-2.5">
              <li
                v-for="item in trustItems"
                :key="item"
                class="flex items-start gap-2 text-sm"
                :style="{ color: 'var(--text-secondary)' }"
              >
                <span class="text-emerald-500 mt-0.5 shrink-0">✓</span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: Bio and Pillars -->
        <div>
          <p class="text-xs font-bold uppercase tracking-widest mb-3 text-accent-500">
            About Saugat Poudel
          </p>
          <h2 class="text-3xl md:text-4xl font-bold mb-6" :style="{ color: 'var(--text-primary)' }">
            AI and software engineer,
            <span class="gradient-text">freelancing.</span>
          </h2>

          <div class="space-y-4 leading-relaxed font-light text-base mb-8" :style="{ color: 'var(--text-secondary)' }">
            <p>
              I am an <strong :style="{ color: 'var(--text-primary)' }" class="font-semibold">AI and software engineer</strong> based in Australia. I work with government, enterprise, and research teams to design, build, and operate reliable software and AI systems—from first architecture conversation to production deployment.
            </p>
            <p>
              I have delivered across the full engineering chain: fullstack web platforms, production AI and LLM systems, edge and computer vision applications, and applied machine learning research. My work has been used in emergency operations, health platforms, commercial products, and university research programs.
            </p>
            <p>
              I bring an engineer's discipline and a researcher's rigour. You get one accountable point of contact who can move from high-level feasibility to working software—without handoffs, without silos, and without agency overhead.
            </p>
          </div>

          <!-- 4 Pillars Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div
              v-for="pillar in pillars"
              :key="pillar.title"
              class="p-4 rounded-xl border"
              :style="{ background: 'var(--pillar-bg)', borderColor: 'var(--border-subtle)' }"
            >
              <div class="flex items-center gap-2.5 mb-2">
                <component :is="pillar.icon" :size="18" class="text-accent-500 shrink-0" />
                <h4 class="text-sm font-bold" :style="{ color: 'var(--text-primary)' }">
                  {{ pillar.title }}
                </h4>
              </div>
              <p class="text-xs leading-relaxed font-light" :style="{ color: 'var(--text-muted)' }">
                {{ pillar.desc }}
              </p>
            </div>
          </div>

          <!-- Academic Credentials -->
          <div class="space-y-2.5 pt-2 border-t" :style="{ borderColor: 'var(--border-subtle)' }">
            <div class="flex items-center gap-3 text-sm">
              <GraduationCap :size="16" class="text-accent-500 shrink-0" />
              <span class="font-medium" :style="{ color: 'var(--text-secondary)' }">Master of Information Technology (AI Major), Charles Darwin University</span>
              <span class="text-[0.65rem] font-bold text-accent-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full ml-auto shrink-0">In Progress</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <GraduationCap :size="16" class="text-emerald-500 shrink-0" />
              <span class="font-medium" :style="{ color: 'var(--text-secondary)' }">Bachelor of Software Engineering (AI), Torrens University Australia</span>
              <span class="text-[0.65rem] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full ml-auto shrink-0">Graduate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
