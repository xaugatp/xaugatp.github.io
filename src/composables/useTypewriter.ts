import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(
  phrases: string[],
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseTime = 2000
) {
  const displayText = ref(phrases[0] || '')
  const cursorVisible = ref(true)
  let phraseIndex = 0
  let charIndex = phrases[0] ? phrases[0].length : 0
  let isDeleting = true
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let cursorIntervalId: ReturnType<typeof setInterval> | null = null

  function tick() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      charIndex--
      displayText.value = currentPhrase.substring(0, charIndex)
    } else {
      charIndex++
      displayText.value = currentPhrase.substring(0, charIndex)
    }

    let nextDelay = isDeleting ? deletingSpeed : typingSpeed

    if (!isDeleting && charIndex === currentPhrase.length) {
      nextDelay = pauseTime
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      nextDelay = 300
    }

    timeoutId = setTimeout(tick, nextDelay)
  }

  onMounted(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      displayText.value = phrases[0]
      return
    }

    tick()
    cursorIntervalId = setInterval(() => {
      cursorVisible.value = !cursorVisible.value
    }, 530)
  })

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
    if (cursorIntervalId) clearInterval(cursorIntervalId)
  })

  return { displayText, cursorVisible }
}
