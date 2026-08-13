<script setup lang="ts">
import { Mail } from '@lucide/vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
</script>

<template>
  <footer
    class="border-t backdrop-blur-md"
    :style="{ background: 'var(--footer-bg)', borderColor: 'var(--border-subtle)' }"
  >
    <div class="max-w-[1200px] mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <a href="#hero" class="text-xl font-black" :style="{ color: 'var(--text-primary)' }">
            saugat<span class="text-accent-500">.</span>
          </a>
          <p class="mt-3 text-sm font-light leading-relaxed" :style="{ color: 'var(--text-muted)' }">
            Fullstack AI Engineer and ML Researcher.<br />
            Building production AI, web software, and research solutions.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest mb-4" :style="{ color: 'var(--text-secondary)' }">
            Navigation
          </h4>
          <ul class="space-y-2">
            <li v-for="item in ['Home', 'About', 'Services', 'Work', 'Experience', 'Contact']" :key="item">
              <a
                :href="`#${item === 'Home' ? 'hero' : item === 'Work' ? 'projects' : item.toLowerCase()}`"
                class="text-xs font-medium transition-colors hover:text-accent-500"
                :style="{ color: 'var(--text-muted)' }"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest mb-4" :style="{ color: 'var(--text-secondary)' }">
            Connect
          </h4>
          <div class="flex gap-3">
            <a
              href="https://www.linkedin.com/in/xaugat/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:text-white hover:bg-accent-500"
              :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
            >
              <LinkedinIcon class="w-[16px] h-[16px]" />
            </a>
            <a
              href="https://github.com/xaugatp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:text-white hover:bg-accent-500"
              :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
            >
              <GithubIcon class="w-[16px] h-[16px]" />
            </a>
            <a
              href="mailto:contact.saugatpoudel@gmail.com"
              aria-label="Email"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:text-white hover:bg-accent-500"
              :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
            >
              <Mail :size="16" />
            </a>
          </div>
          <a
            href="/assets/documents/Resume_Saugat.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-4 text-xs font-semibold text-accent-500 hover:text-amber-400 transition-colors"
          >
            Download Curriculum Vitae (PDF) →
          </a>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t text-center" :style="{ borderColor: 'var(--border-subtle)' }">
        <p class="text-xs font-light" :style="{ color: 'var(--text-faint)' }">
          © {{ new Date().getFullYear() }} Saugat Poudel. Built with Vue 3, TypeScript and Tailwind CSS v4.
        </p>
      </div>
    </div>
  </footer>
</template>
