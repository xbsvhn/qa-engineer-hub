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

// Scroll-reveal for feature cards + philosophy section
function initScrollReveal() {
  nextTick(() => {
    const cards = document.querySelectorAll('.VPFeatures .VPFeature')
    const philosophy = document.querySelector('.home-philosophy')
    const targets = [...cards, philosophy].filter(Boolean)

    if (!targets.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const delay = el.classList.contains('VPFeature')
            ? Array.from(cards).indexOf(el) * 80
            : 0
          setTimeout(() => el.classList.add('revealed'), delay)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.15 })

    targets.forEach(t => observer.observe(t))
  })
}

// Animated counter for stats
function initCounters() {
  nextTick(() => {
    const items = document.querySelectorAll('.stat-item[data-count]')
    if (!items.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const target = parseInt(el.dataset.count)
          const numEl = el.querySelector('.stat-num')
          if (!numEl || numEl.dataset.done) return
          numEl.dataset.done = '1'

          const duration = 1200
          const start = performance.now()
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3) // easeOutCubic
            numEl.textContent = Math.round(target * ease)
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.5 })

    items.forEach(item => observer.observe(item))
  })
}

// Floating particles on homepage hero
function initParticles() {
  nextTick(() => {
    const hero = document.querySelector('.VPHero')
    if (!hero || hero.querySelector('.particles-canvas')) return

    const canvas = document.createElement('canvas')
    canvas.className = 'particles-canvas'
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;'
    hero.style.position = 'relative'
    hero.insertBefore(canvas, hero.firstChild)

    const ctx = canvas.getContext('2d')
    let particles = []
    let animId

    function resize() {
      canvas.width = hero.offsetWidth
      canvas.height = hero.offsetHeight
    }

    function createParticles() {
      particles = []
      const count = Math.floor(canvas.width * canvas.height / 18000)
      for (let i = 0; i < Math.min(count, 40); i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.5,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`
        ctx.fill()

        p.x += p.dx
        p.y += p.dy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    createParticles()
    draw()

    window.addEventListener('resize', () => { resize(); createParticles() })

    // Cleanup on route change
    const cleanup = () => {
      cancelAnimationFrame(animId)
      canvas.remove()
    }
    return cleanup
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
    let cleanupParticles

    onMounted(() => {
      addReadingTime()
      initScrollReveal()
      initCounters()
      cleanupParticles = initParticles()
    })

    watch(() => route.path, () => {
      addReadingTime()
      if (typeof cleanupParticles === 'function') cleanupParticles()
      initScrollReveal()
      initCounters()
      cleanupParticles = initParticles()
    })
  }
}
