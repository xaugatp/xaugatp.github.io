import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollAnimation(
  elementRef: Ref<HTMLElement | null>,
  options?: { threshold?: number; rootMargin?: string; delay?: number }
) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (options?.delay) {
            setTimeout(() => {
              isVisible.value = true
            }, options.delay)
          } else {
            isVisible.value = true
          }
          observer?.unobserve(entry.target)
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px 0px -30px 0px',
      }
    )
    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible }
}
