import { ref, watch, onMounted } from 'vue'

const isDark = ref(true)

export function useTheme() {
  function applyTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    isDark.value = saved ? saved === 'dark' : true
    applyTheme(isDark.value)
  })

  watch(isDark, (val) => applyTheme(val))

  return { isDark, toggleTheme }
}
