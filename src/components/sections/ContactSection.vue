<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { Phone, Mail, Send, CheckCircle, AlertCircle, Clock, ShieldCheck } from '@lucide/vue'

const sectionRef = ref<HTMLElement | null>(null)
const { isVisible } = useScrollAnimation(sectionRef, { threshold: 0.1 })

const form = reactive({
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
})

const submitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

async function handleSubmit() {
  submitting.value = true
  submitStatus.value = 'idle'

  try {
    const response = await fetch('https://formsubmit.co/ajax/contact.saugatpoudel@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        'Project Scope': form.projectType || 'General Inquiry',
        'Budget Range': form.budget || 'Not specified',
        message: form.message,
        _subject: `Portfolio Inquiry from ${form.name} - ${form.projectType || 'General'}`,
        _captcha: 'false',
      }),
    })

    if (response.ok) {
      submitStatus.value = 'success'
      form.name = ''
      form.email = ''
      form.projectType = ''
      form.budget = ''
      form.message = ''
    } else {
      submitStatus.value = 'error'
    }
  } catch {
    submitStatus.value = 'error'
  } finally {
    submitting.value = false
    setTimeout(() => { submitStatus.value = 'idle' }, 6000)
  }
}
</script>

<template>
  <section id="contact" class="section-padding">
    <div
      ref="sectionRef"
      class="max-w-[1000px] mx-auto scroll-reveal"
      :class="{ visible: isVisible }"
    >
      <!-- Header -->
      <div class="text-center mb-14">
        <p class="text-xs font-bold uppercase tracking-widest mb-3 text-accent-500">
          Get In Touch
        </p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: 'var(--text-primary)' }">
          Start a <span class="gradient-text">Project or Research Inquiry</span>
        </h2>
        <p class="max-w-md mx-auto text-sm font-light" :style="{ color: 'var(--text-muted)' }">
          Have an AI application, fullstack web platform, or research work in mind? Fill out the details below.
        </p>
      </div>

      <!-- Contact Box -->
      <div class="glass-card p-8 md:p-12 hover:!transform-none">
        <div class="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10">
          <!-- Left: Information & Trust Badges -->
          <div class="flex flex-col justify-between gap-8">
            <div>
              <h3 class="text-xl font-bold mb-2" :style="{ color: 'var(--text-primary)' }">
                Let's discuss your scope
              </h3>
              <p class="text-sm font-light leading-relaxed mb-6" :style="{ color: 'var(--text-muted)' }">
                Available for freelance engineering contracts, system design consulting, and research collaborations.
              </p>

              <div class="space-y-4">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(217,119,6,0.08); border: 1px solid rgba(217,119,6,0.2)">
                    <Phone :size="18" class="text-accent-500" />
                  </div>
                  <div>
                    <span class="text-[0.7rem] font-bold uppercase tracking-wider block" :style="{ color: 'var(--text-muted)' }">Phone / Mobile</span>
                    <a href="tel:+61450112303" class="text-sm font-medium hover:text-accent-500 transition-colors" :style="{ color: 'var(--text-secondary)' }">
                      +61 450 112 303
                    </a>
                  </div>
                </div>

                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(217,119,6,0.08); border: 1px solid rgba(217,119,6,0.2)">
                    <Mail :size="18" class="text-accent-500" />
                  </div>
                  <div>
                    <span class="text-[0.7rem] font-bold uppercase tracking-wider block" :style="{ color: 'var(--text-muted)' }">Email Address</span>
                    <a href="mailto:contact.saugatpoudel@gmail.com" class="text-sm font-medium hover:text-accent-500 transition-colors break-all" :style="{ color: 'var(--text-secondary)' }">
                      contact.saugatpoudel@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Response Guarantee -->
            <div class="p-4 rounded-xl border space-y-2" :style="{ background: 'var(--pillar-bg)', borderColor: 'var(--border-subtle)' }">
              <div class="flex items-center gap-2 text-xs font-semibold text-accent-500">
                <Clock :size="14" />
                <span>24-Hour Response Guarantee</span>
              </div>
              <div class="flex items-center gap-2 text-xs font-light" :style="{ color: 'var(--text-muted)' }">
                <ShieldCheck :size="14" class="text-emerald-500" />
                <span>NDA and Confidential Project Review available</span>
              </div>
            </div>
          </div>

          <!-- Right: Form -->
          <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <div>
              <label for="contact-name" class="sr-only">Your Name</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Your Full Name *"
                required
                class="w-full px-4 py-3.5 rounded-xl text-base md:text-sm font-light transition-all focus:outline-none focus:ring-2 min-h-[48px]"
                :style="{ background: 'var(--pillar-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }"
              />
            </div>

            <div>
              <label for="contact-email" class="sr-only">Your Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="Work Email Address *"
                required
                class="w-full px-4 py-3.5 rounded-xl text-base md:text-sm font-light transition-all focus:outline-none focus:ring-2 min-h-[48px]"
                :style="{ background: 'var(--pillar-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="contact-type" class="sr-only">Project Type</label>
                <select
                  id="contact-type"
                  v-model="form.projectType"
                  class="w-full px-4 py-3.5 rounded-xl text-base md:text-sm font-light transition-all focus:outline-none focus:ring-2 min-h-[48px]"
                  :style="{ background: 'var(--pillar-bg)', border: '1px solid var(--border-subtle)', color: form.projectType ? 'var(--text-primary)' : 'var(--text-faint)' }"
                >
                  <option value="" disabled>Project Type</option>
                  <option value="Fullstack Web Application">Fullstack Web App</option>
                  <option value="AI and RAG System">Production AI and RAG</option>
                  <option value="ML Research and Computer Vision">ML Research and Vision</option>
                  <option value="Data Engineering and Pipeline">Data Pipeline</option>
                  <option value="Technical Consulting">Consulting and Discovery</option>
                </select>
              </div>

              <div>
                <label for="contact-budget" class="sr-only">Budget Scope</label>
                <select
                  id="contact-budget"
                  v-model="form.budget"
                  class="w-full px-4 py-3.5 rounded-xl text-base md:text-sm font-light transition-all focus:outline-none focus:ring-2 min-h-[48px]"
                  :style="{ background: 'var(--pillar-bg)', border: '1px solid var(--border-subtle)', color: form.budget ? 'var(--text-primary)' : 'var(--text-faint)' }"
                >
                  <option value="" disabled>Budget Range</option>
                  <option value="To Be Discussed / Flexible">To Be Discussed / Not Sure Yet</option>
                  <option value="Under $5,000">Under $5,000 AUD</option>
                  <option value="$5,000 to $15,000">$5,000 to $15,000 AUD</option>
                  <option value="$15,000 to $30,000">$15,000 to $30,000 AUD</option>
                  <option value="$30,000+">$30,000+ AUD</option>
                  <option value="Research / Grant Work">Research and Grant Work</option>
                </select>
              </div>
            </div>

            <div>
              <label for="contact-message" class="sr-only">Project Details</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                placeholder="Describe your project, goals, or research questions *"
                required
                rows="4"
                class="w-full px-4 py-3.5 rounded-xl text-base md:text-sm font-light transition-all focus:outline-none focus:ring-2 resize-y min-h-[110px]"
                :style="{ background: 'var(--pillar-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }"
              />
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full py-4 text-sm font-bold uppercase tracking-wider text-white rounded-xl shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              style="background: linear-gradient(135deg, #D97706, #F59E0B); box-shadow: 0 8px 25px rgba(217,119,6,0.25);"
            >
              <Send v-if="!submitting" :size="16" />
              <svg v-else class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              {{ submitting ? 'Submitting Inquiry...' : 'Submit Inquiry' }}
            </button>

            <!-- Toasts -->
            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                v-if="submitStatus === 'success'"
                class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-400"
              >
                <CheckCircle :size="18" />
                <span>Inquiry submitted! I will reply within 24 hours.</span>
              </div>
              <div
                v-else-if="submitStatus === 'error'"
                class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400"
              >
                <AlertCircle :size="18" />
                <span>Submission failed. Please email contact.saugatpoudel@gmail.com directly.</span>
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
