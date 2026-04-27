import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { onMounted, watch, nextTick, h } from 'vue'
import { useRoute } from 'vitepress'

// Reading progress bar component
const ReadingProgress = {
  setup() {
    onMounted(() => {
      const bar = document.createElement('div')
      bar.id = 'reading-progress'
      bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#6366f1,#a78bfa);z-index:999;transition:width 0.15s ease;width:0%;pointer-events:none;'
      document.body.appendChild(bar)

      const update = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
        bar.style.width = Math.min(progress, 100) + '%'
      }

      window.addEventListener('scroll', update, { passive: true })
      update()
    })
    return () => null
  }
}

// Reading time estimator
function addReadingTime() {
  nextTick(() => {
    const existing = document.querySelector('.reading-time-badge')
    if (existing) existing.remove()

    const content = document.querySelector('.vp-doc')
    if (!content) return

    const h1 = content.querySelector('h1')
    if (!h1) return

    const text = content.textContent || ''
    const words = text.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.ceil(words / 200))

    const badge = document.createElement('div')
    badge.className = 'reading-time-badge'
    badge.innerHTML = `<span class="rt-icon">&#128214;</span> ${minutes} phút đọc`
    h1.insertAdjacentElement('afterend', badge)
  })
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(ReadingProgress)
    })
  },
  setup() {
    const route = useRoute()
    onMounted(() => {
      addReadingTime()
    })
    watch(() => route.path, () => {
      addReadingTime()
    })
  }
}
