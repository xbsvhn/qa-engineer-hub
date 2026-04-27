import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { onMounted, watch, nextTick, h, ref } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'

// About icon in navbar — client-side navigation, no reload
const AboutIcon = {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isHover = ref(false)

    const getAboutPath = () => route.path.startsWith('/en/') || route.path.startsWith(withBase('/en/'))
      ? withBase('/en/about')
      : withBase('/about')

    const navigate = (e) => {
      e.preventDefault()
      router.go(getAboutPath())
    }

    const isActive = () => route.path.includes('/about')

    return () => h('a', {
      href: getAboutPath(),
      class: 'about-nav-icon',
      title: 'About',
      'aria-label': 'About',
      onClick: navigate,
      onMouseenter: () => { isHover.value = true },
      onMouseleave: () => { isHover.value = false },
      style: {
        opacity: isActive() ? '1' : (isHover.value ? '0.85' : '0.55'),
        color: isActive() ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-2)',
      }
    }, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '20',
        height: '20',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '1.8',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }, [
        h('circle', { cx: '12', cy: '8', r: '4' }),
        h('path', { d: 'M20 21a8 8 0 0 0-16 0' }),
      ])
    ])
  }
}

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
    const isEn = window.location.pathname.includes('/en/')
    const label = isEn ? `${minutes} min read` : `${minutes} phút đọc`
    badge.innerHTML = `<span class="rt-icon">&#128214;</span> ${label}`
    h1.insertAdjacentElement('afterend', badge)
  })
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(ReadingProgress),
      'nav-bar-content-after': () => h(AboutIcon),
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
