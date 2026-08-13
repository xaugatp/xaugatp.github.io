<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Mail, Moon, Sun } from '@lucide/vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import { useTheme } from '@/composables/useTheme'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const scrolled = ref(false)
const menuOpen = ref(false)
let ticking = false

const { isDark, toggleTheme } = useTheme()

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      scrolled.value = window.scrollY > 50
      ticking = false
    })
    ticking = true
  }
}

function scrollTo(href: string) {
  menuOpen.value = false
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-[1000] transition-all duration-300"
    :class="[
      scrolled
        ? 'backdrop-blur-xl border-b py-3 shadow-2xl'
        : 'bg-transparent py-5',
    ]"
    :style="scrolled ? { background: 'var(--bg-nav)', borderColor: 'var(--border-subtle)', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' } : {}"
  >
    <div class="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#hero"
        class="flex items-center gap-2 text-lg font-black tracking-tight transition-colors"
        :style="{ color: 'var(--text-primary)' }"
        @click.prevent="scrollTo('#hero')"
      >
        <span>saugat</span><span class="text-accent-500 text-xl leading-none">.</span>
        <span
          class="hidden sm:inline-block text-[0.65rem] font-bold uppercase tracking-widest border-l pl-2 ml-1"
          :style="{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }"
        >
          AI & ML Engineer
        </span>
      </a>

      <!-- Desktop Nav Links -->
      <ul class="hidden md:flex items-center gap-7">
        <li v-for="item in navItems" :key="item.href">
          <a
            :href="item.href"
            class="text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-500 after:transition-all after:duration-300 hover:after:w-full"
            :style="{ color: 'var(--text-muted)' }"
            @click.prevent="scrollTo(item.href)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Desktop: Theme Toggle + Socials + CTA -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Theme Toggle -->
        <button
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <a
          href="https://www.linkedin.com/in/xaugat/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="transition-colors p-1"
          :style="{ color: 'var(--text-muted)' }"
        >
          <LinkedinIcon class="w-[18px] h-[18px]" />
        </a>
        <a
          href="https://github.com/xaugatp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="transition-colors p-1"
          :style="{ color: 'var(--text-muted)' }"
        >
          <GithubIcon class="w-[18px] h-[18px]" />
        </a>
        <a
          href="#contact"
          class="ml-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-accent-500 to-amber-600 hover:from-accent-600 hover:to-amber-700 transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
          @click.prevent="scrollTo('#contact')"
        >
          Get in Touch
        </a>
      </div>

      <!-- Mobile: Theme toggle + Hamburger -->
      <div class="md:hidden flex items-center gap-2">
        <button
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-all"
          :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>
        <button
          class="p-2"
          :style="{ color: 'var(--text-primary)' }"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="menuOpen"
        class="md:hidden fixed inset-0 top-0 backdrop-blur-2xl z-[999] flex flex-col items-center justify-center gap-6"
        :style="{ background: 'var(--bg-base)' }"
      >
        <button
          class="absolute top-5 right-6 p-2"
          :style="{ color: 'var(--text-primary)' }"
          aria-label="Close menu"
          @click="menuOpen = false"
        >
          <X :size="24" />
        </button>

        <a
          v-for="(item, i) in navItems"
          :key="item.href"
          :href="item.href"
          class="text-2xl font-bold uppercase tracking-wider transition-all"
          :style="{ color: 'var(--text-primary)', transitionDelay: `${i * 45}ms` }"
          @click.prevent="scrollTo(item.href)"
        >
          {{ item.label }}
        </a>

        <div class="flex gap-5 mt-4">
          <a
            href="https://www.linkedin.com/in/xaugat/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
          >
            <LinkedinIcon class="w-[18px] h-[18px]" />
          </a>
          <a
            href="https://github.com/xaugatp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
          >
            <GithubIcon class="w-[18px] h-[18px]" />
          </a>
          <a
            href="mailto:contact.saugatpoudel@gmail.com"
            aria-label="Email"
            class="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            :style="{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }"
          >
            <Mail :size="18" />
          </a>
        </div>

        <a
          href="/assets/documents/Resume_Saugat.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-accent-500 to-amber-600"
        >
          Download Resume
        </a>
      </div>
    </Transition>
  </nav>
</template>
