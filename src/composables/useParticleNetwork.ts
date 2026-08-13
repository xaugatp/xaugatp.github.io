import { onMounted, onUnmounted, type Ref } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function useParticleNetwork(
  canvasRef: Ref<HTMLCanvasElement | null>,
  containerRef: Ref<HTMLElement | null>,
  options?: {
    dotColor?: string
    lineRgb?: string
    linkDistance?: number
    maxParticles?: number
  }
) {
  const DOT_COLOR = options?.dotColor ?? 'rgba(129, 140, 248, 0.6)'
  const LINE_RGB = options?.lineRgb ?? '129, 140, 248'
  const LINK_DIST = options?.linkDistance ?? 140
  const MAX_PARTICLES = options?.maxParticles ?? 80

  let width = 0
  let height = 0
  let particles: Particle[] = []
  let running = false
  let rafId: number | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let resizeTimer: ReturnType<typeof setTimeout> | null = null
  let observer: IntersectionObserver | null = null

  function resize() {
    const canvas = canvasRef.value
    const container = containerRef.value
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    width = canvas.width = rect.width
    height = canvas.height = rect.height

    const count = Math.min(MAX_PARTICLES, Math.max(25, Math.round((width * height) / 20000)))
    particles = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.6,
      })
    }
  }

  function step() {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x <= 0 || p.x >= width) p.vx *= -1
      if (p.y <= 0 || p.y >= height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = DOT_COLOR
      ctx.fill()
    }

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x
        const dy = particles[a].y - particles[b].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < LINK_DIST) {
          ctx.beginPath()
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(particles[b].x, particles[b].y)
          ctx.strokeStyle = `rgba(${LINE_RGB}, ${0.15 * (1 - dist / LINK_DIST)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    if (running) rafId = requestAnimationFrame(step)
  }

  function start() {
    if (running) return
    running = true
    rafId = requestAnimationFrame(step)
  }

  function stop() {
    running = false
    if (rafId) cancelAnimationFrame(rafId)
  }

  function handleVisibility() {
    if (document.hidden) stop()
    else start()
  }

  function handleResize() {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(resize, 200)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas?.getContext) return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    ctx = canvas.getContext('2d')
    if (!ctx) return

    resize()
    start()

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    if ('IntersectionObserver' in window && containerRef.value) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) start()
          else stop()
        },
        { threshold: 0 }
      )
      observer.observe(containerRef.value)
    }
  })

  onUnmounted(() => {
    stop()
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', handleVisibility)
    observer?.disconnect()
    if (resizeTimer) clearTimeout(resizeTimer)
  })
}
