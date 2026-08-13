// ── Project ─────────────────────────────────────
export interface Project {
  id: string
  title: string
  summary: string
  description: string
  category: 'web' | 'ai' | 'data' | 'research'
  technologies: string[]
  bullets: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
}

// ── Experience ──────────────────────────────────
export interface Experience {
  id: string
  role: string
  company: string
  logo?: string
  logoFallback?: string
  period: string
  location?: string
  bullets: string[]
  websiteUrl?: string
  current?: boolean
}

// ── Education ───────────────────────────────────
export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  logo?: string
  logoFallback?: string
  skills: string
  status: 'in-progress' | 'completed'
}

// ── Certification ───────────────────────────────
export interface Certification {
  id: string
  title: string
  issuer: string
  logo?: string
  logoFallback?: string
  credentialUrl?: string
  status?: 'in-progress' | 'completed'
  highlight?: boolean
}

// ── Service ─────────────────────────────────────
export interface Service {
  id: string
  icon: string
  title: string
  description: string
  capabilities: string[]
  highlighted?: boolean
}

// ── Skill Group ─────────────────────────────────
export interface SkillGroup {
  id: string
  title: string
  icon: string
  skills: string[]
}

// ── Testimonial ─────────────────────────────────
export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  avatar?: string
}

// ── Social Link ─────────────────────────────────
export interface SocialLink {
  id: string
  label: string
  url: string
  icon: string
}

// ── Nav Item ────────────────────────────────────
export interface NavItem {
  label: string
  href: string
}
