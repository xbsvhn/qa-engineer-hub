---
layout: page
---

<div class="roadmap-page">

<div class="roadmap-header">
  <h1 class="roadmap-title">QA Engineer Roadmap</h1>
  <p class="roadmap-subtitle">Hành trình từ Zero đến Senior — bay qua từng hành tinh kiến thức</p>
</div>

<div class="galaxy">

  <!-- Stars background -->
  <div class="stars"></div>

  <!-- Orbit path -->
  <div class="orbit-path"></div>

  <!-- Planet 1: Fundamentals -->
  <a href="/qa-engineer-hub/fundamentals/" class="planet-wrapper" style="--delay: 0s; --orbit-position: 0;">
    <div class="planet planet-1">
      <span class="planet-icon">📚</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Phase 1</span>
      <h3>Fundamentals</h3>
      <p>Testing Concepts · SDLC · Agile · Test Design · SQL</p>
      <span class="planet-time">Tháng 1-2</span>
    </div>
  </a>

  <!-- Planet 2: Manual Testing -->
  <a href="/qa-engineer-hub/manual-testing/" class="planet-wrapper" style="--delay: 0.1s; --orbit-position: 1;">
    <div class="planet planet-2">
      <span class="planet-icon">🔍</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Phase 2</span>
      <h3>Manual Testing</h3>
      <p>Test Plan · Test Case · Bug Report · Exploratory</p>
      <span class="planet-time">Tháng 2-3</span>
    </div>
  </a>

  <!-- Planet 3: API Testing -->
  <a href="/qa-engineer-hub/api-testing/" class="planet-wrapper" style="--delay: 0.2s; --orbit-position: 2;">
    <div class="planet planet-3">
      <span class="planet-icon">🔗</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Phase 3</span>
      <h3>API Testing</h3>
      <p>HTTP · REST · Postman · API Automation</p>
      <span class="planet-time">Tháng 3-4</span>
    </div>
  </a>

  <!-- Planet 4: Automation -->
  <a href="/qa-engineer-hub/automation/" class="planet-wrapper" style="--delay: 0.3s; --orbit-position: 3;">
    <div class="planet planet-4">
      <span class="planet-icon">🤖</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Phase 4</span>
      <h3>Automation</h3>
      <p>JavaScript · TypeScript · Playwright · POM · CI/CD</p>
      <span class="planet-time">Tháng 4-7</span>
    </div>
  </a>

  <!-- Planet 5: Performance -->
  <a href="/qa-engineer-hub/performance/" class="planet-wrapper" style="--delay: 0.4s; --orbit-position: 4;">
    <div class="planet planet-5">
      <span class="planet-icon">⚡</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Phase 5</span>
      <h3>Performance</h3>
      <p>Load Testing · JMeter · K6 · Metrics</p>
      <span class="planet-time">Tháng 7-8</span>
    </div>
  </a>

  <!-- Planet 6: Security -->
  <a href="/qa-engineer-hub/security/" class="planet-wrapper" style="--delay: 0.5s; --orbit-position: 5;">
    <div class="planet planet-6">
      <span class="planet-icon">🛡️</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Phase 6</span>
      <h3>Security</h3>
      <p>OWASP Top 10 · ZAP · Burp Suite</p>
      <span class="planet-time">Tháng 8-9</span>
    </div>
  </a>

  <!-- Planet 7: CI/CD -->
  <a href="/qa-engineer-hub/cicd/" class="planet-wrapper" style="--delay: 0.6s; --orbit-position: 6;">
    <div class="planet planet-7">
      <span class="planet-icon">🔄</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Phase 7</span>
      <h3>CI/CD & DevOps</h3>
      <p>Git · GitHub Actions · Docker</p>
      <span class="planet-time">Tháng 9-10</span>
    </div>
  </a>

  <!-- Planet 8: Senior / Destination -->
  <a href="/qa-engineer-hub/best-practices/" class="planet-wrapper" style="--delay: 0.7s; --orbit-position: 7;">
    <div class="planet planet-8">
      <span class="planet-icon">🌟</span>
    </div>
    <div class="planet-info">
      <span class="planet-phase">Destination</span>
      <h3>Senior QA</h3>
      <p>Mindset · Communication · Career Path</p>
      <span class="planet-time">Tháng 10-12+</span>
    </div>
  </a>

</div>

<div class="roadmap-footer">
  <p>Click vào bất kỳ hành tinh nào để bắt đầu khám phá</p>
</div>

</div>

<style>
.roadmap-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.roadmap-header {
  text-align: center;
  margin-bottom: 2rem;
}

.roadmap-title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.roadmap-subtitle {
  font-size: 1.05rem;
  opacity: 0.7;
  margin: 0.5rem 0 0;
}

/* Galaxy container */
.galaxy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1rem 0;
}

/* Stars */
.stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 30% 60%, rgba(139, 92, 246, 0.2) 0%, transparent 100%),
    radial-gradient(1px 1px at 50% 10%, rgba(99, 102, 241, 0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 70% 40%, rgba(167, 139, 250, 0.2) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 100%);
  pointer-events: none;
  border-radius: 20px;
}

/* Planet wrapper */
.planet-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  margin: 4px 0;
  border-radius: 16px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  animation: fadeInUp 0.5s ease-out backwards;
  animation-delay: var(--delay);
  border: 1px solid transparent;
}

.planet-wrapper:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateX(8px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.12);
}

/* Connecting line */
.planet-wrapper:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 39px;
  bottom: -4px;
  width: 2px;
  height: 8px;
  background: linear-gradient(to bottom, var(--vp-c-brand-1), transparent);
  opacity: 0.3;
}

/* Planet orb */
.planet {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  transition: all 0.3s;
}

.planet-wrapper:hover .planet {
  transform: scale(1.15);
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.4);
}

.planet-icon {
  font-size: 24px;
  position: relative;
  z-index: 1;
}

/* Planet colors */
.planet-1 { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.planet-2 { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
.planet-3 { background: linear-gradient(135deg, #06b6d4, #0891b2); }
.planet-4 { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.planet-5 { background: linear-gradient(135deg, #f59e0b, #d97706); }
.planet-6 { background: linear-gradient(135deg, #ef4444, #dc2626); }
.planet-7 { background: linear-gradient(135deg, #10b981, #059669); }
.planet-8 { background: linear-gradient(135deg, #f59e0b, #f97316); box-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }

/* Planet info */
.planet-info {
  flex: 1;
  min-width: 0;
}

.planet-info .planet-phase {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--vp-c-brand-1);
  display: block;
  margin-bottom: 2px;
}

.planet-info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
}

.planet-info p {
  margin: 4px 0 0;
  font-size: 0.85rem;
  opacity: 0.65;
  line-height: 1.4;
}

.planet-time {
  display: inline-block;
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

/* Footer */
.roadmap-footer {
  text-align: center;
  margin-top: 2rem;
  opacity: 0.5;
  font-size: 0.9rem;
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode adjustments */
.dark .planet-wrapper:hover {
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
}

/* Mobile */
@media (max-width: 640px) {
  .roadmap-title {
    font-size: 1.6rem;
  }

  .planet-wrapper {
    gap: 14px;
    padding: 12px 14px;
  }

  .planet {
    width: 48px;
    height: 48px;
  }

  .planet-icon {
    font-size: 20px;
  }

  .planet-info h3 {
    font-size: 1rem;
  }
}
</style>
