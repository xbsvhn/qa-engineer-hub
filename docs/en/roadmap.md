---
layout: page
---

<div class="roadmap-page">

<div class="roadmap-header">
  <div class="header-glow"></div>
  <h1 class="roadmap-title">QA Roadmap</h1>
  <p class="roadmap-subtitle">Journey from Zero to Senior</p>
  <p class="roadmap-desc">Click a planet to explore</p>
</div>

<div class="galaxy">
  <div class="stars-layer"></div>
  <div class="orbit-line"></div>

  <a href="/qa-engineer-hub/en/fundamentals/" class="planet-card" style="--i:0">
    <div class="planet-orb p1"><span>📚</span></div>
    <div class="planet-glow p1-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Phase 1</div>
      <h3>Fundamentals</h3>
      <p>Testing Concepts · SDLC · Agile · Test Design · SQL</p>
      <div class="time-tag">Month 1-2</div>
    </div>
  </a>

  <a href="/qa-engineer-hub/en/manual-testing/" class="planet-card" style="--i:1">
    <div class="planet-orb p2"><span>🔍</span></div>
    <div class="planet-glow p2-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Phase 2</div>
      <h3>Manual Testing</h3>
      <p>Test Plan · Test Case · Bug Report · Exploratory</p>
      <div class="time-tag">Month 2-3</div>
    </div>
  </a>

  <a href="/qa-engineer-hub/en/api-testing/" class="planet-card" style="--i:2">
    <div class="planet-orb p3"><span>🔗</span></div>
    <div class="planet-glow p3-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Phase 3</div>
      <h3>API Testing</h3>
      <p>HTTP · REST · Postman · Automation</p>
      <div class="time-tag">Month 3-4</div>
    </div>
  </a>

  <a href="/qa-engineer-hub/en/automation/" class="planet-card featured" style="--i:3">
    <div class="planet-orb p4"><span>🤖</span></div>
    <div class="planet-glow p4-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Phase 4 — Core</div>
      <h3>Automation</h3>
      <p>JavaScript · TypeScript · Playwright · POM</p>
      <div class="time-tag">Month 4-7</div>
    </div>
  </a>

  <a href="/qa-engineer-hub/en/performance/" class="planet-card" style="--i:4">
    <div class="planet-orb p5"><span>⚡</span></div>
    <div class="planet-glow p5-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Phase 5</div>
      <h3>Performance</h3>
      <p>Load Testing · JMeter · K6</p>
      <div class="time-tag">Month 7-8</div>
    </div>
  </a>

  <a href="/qa-engineer-hub/en/security/" class="planet-card" style="--i:5">
    <div class="planet-orb p6"><span>🛡️</span></div>
    <div class="planet-glow p6-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Phase 6</div>
      <h3>Security</h3>
      <p>OWASP Top 10 · ZAP · Burp Suite</p>
      <div class="time-tag">Month 8-9</div>
    </div>
  </a>

  <a href="/qa-engineer-hub/en/cicd/" class="planet-card" style="--i:6">
    <div class="planet-orb p7"><span>🔄</span></div>
    <div class="planet-glow p7-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Phase 7</div>
      <h3>CI/CD & DevOps</h3>
      <p>Git · GitHub Actions · Docker</p>
      <div class="time-tag">Month 9-10</div>
    </div>
  </a>

  <a href="/qa-engineer-hub/en/best-practices/" class="planet-card destination" style="--i:7">
    <div class="planet-orb p8"><span>🌟</span></div>
    <div class="planet-glow p8-glow"></div>
    <div class="card-body">
      <div class="phase-badge">Destination</div>
      <h3>Senior QA Engineer</h3>
      <p>Mindset · Communication · Career</p>
      <div class="time-tag">Month 10-12+</div>
    </div>
  </a>

</div>
</div>

<style>
/* ===== Page ===== */
.roadmap-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

/* ===== Header ===== */
.roadmap-header {
  text-align: center;
  padding: 2rem 0 1.5rem;
  position: relative;
}

.header-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 120px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.roadmap-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.roadmap-subtitle {
  font-size: 1rem;
  font-weight: 500;
  margin: 0.3rem 0 0;
  opacity: 0.8;
}

.roadmap-desc {
  font-size: 0.8rem;
  margin: 0.5rem 0 0;
  opacity: 0.4;
}

/* ===== Galaxy ===== */
.galaxy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Stars */
.stars-layer {
  position: absolute;
  inset: -20px;
  border-radius: 24px;
  pointer-events: none;
  background:
    radial-gradient(1.5px 1.5px at 8% 15%, rgba(99,102,241,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 22% 45%, rgba(167,139,250,0.3) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 38% 8%, rgba(99,102,241,0.35) 0%, transparent 100%),
    radial-gradient(1px 1px at 55% 70%, rgba(139,92,246,0.25) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 72% 25%, rgba(99,102,241,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 85% 55%, rgba(167,139,250,0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 15% 80%, rgba(99,102,241,0.2) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 92% 90%, rgba(139,92,246,0.35) 0%, transparent 100%);
}

/* Orbit line */
.orbit-line {
  position: absolute;
  left: 38px;
  top: 40px;
  bottom: 40px;
  width: 2px;
  background: linear-gradient(to bottom,
    transparent,
    rgba(99,102,241,0.15) 10%,
    rgba(99,102,241,0.15) 90%,
    transparent
  );
  pointer-events: none;
}

/* ===== Planet Card ===== */
.planet-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px;
  border-radius: 14px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  position: relative;
  border: 1px solid transparent;
  transition: all 0.25s ease;
  animation: slideIn 0.4s ease-out backwards;
  animation-delay: calc(var(--i) * 0.06s);
}

.planet-card:hover {
  background: var(--vp-c-brand-soft);
  border-color: rgba(99,102,241,0.25);
  transform: translateX(6px) scale(1.01);
}

.planet-card.featured {
  border: 1px solid rgba(99,102,241,0.2);
  background: rgba(99,102,241,0.04);
}

.planet-card.destination {
  border: 1px solid rgba(245,158,11,0.2);
  background: rgba(245,158,11,0.04);
}

/* ===== Planet Orb ===== */
.planet-orb {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  transition: transform 0.3s, box-shadow 0.3s;
}

.planet-card:hover .planet-orb {
  transform: scale(1.12);
}

.planet-orb span {
  font-size: 22px;
}

/* Planet colors + glow */
.p1 { background: linear-gradient(135deg, #3b82f6, #1e40af); }
.p2 { background: linear-gradient(135deg, #8b5cf6, #5b21b6); }
.p3 { background: linear-gradient(135deg, #06b6d4, #0e7490); }
.p4 { background: linear-gradient(135deg, #6366f1, #4338ca); }
.p5 { background: linear-gradient(135deg, #f59e0b, #b45309); }
.p6 { background: linear-gradient(135deg, #ef4444, #b91c1c); }
.p7 { background: linear-gradient(135deg, #10b981, #047857); }
.p8 { background: linear-gradient(135deg, #f59e0b, #ea580c); }

.planet-glow {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 1;
}

.planet-card:hover .planet-glow { opacity: 0.5; }

.p1-glow { background: #3b82f6; }
.p2-glow { background: #8b5cf6; }
.p3-glow { background: #06b6d4; }
.p4-glow { background: #6366f1; }
.p5-glow { background: #f59e0b; }
.p6-glow { background: #ef4444; }
.p7-glow { background: #10b981; }
.p8-glow { background: #f59e0b; }

/* Always glow for destination */
.planet-card.destination .planet-glow { opacity: 0.35; }
.planet-card.destination:hover .planet-glow { opacity: 0.6; }

/* ===== Card Body ===== */
.card-body {
  flex: 1;
  min-width: 0;
}

.phase-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--vp-c-brand-1);
  margin-bottom: 1px;
}

.planet-card.destination .phase-badge {
  color: #f59e0b;
}

.card-body h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

.card-body p {
  margin: 3px 0 0;
  font-size: 0.82rem;
  opacity: 0.55;
  line-height: 1.35;
}

.time-tag {
  display: inline-block;
  margin-top: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 8px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  opacity: 0.7;
}

/* ===== Animation ===== */
@keyframes slideIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== Dark mode ===== */
.dark .galaxy {
  background: rgba(0,0,0,0.15);
  border-radius: 20px;
  padding: 8px;
}

.dark .orbit-line {
  background: linear-gradient(to bottom,
    transparent,
    rgba(99,102,241,0.2) 10%,
    rgba(99,102,241,0.2) 90%,
    transparent
  );
}

/* ===== Mobile ===== */
@media (max-width: 640px) {
  .roadmap-page { padding: 0 0.75rem 2rem; }
  .roadmap-title { font-size: 1.5rem; }
  .planet-card { gap: 12px; padding: 10px 12px; }
  .planet-orb { width: 42px; height: 42px; }
  .planet-orb span { font-size: 18px; }
  .card-body h3 { font-size: 0.9rem; }
  .card-body p { font-size: 0.78rem; }
  .orbit-line { left: 31px; }
  .planet-glow { left: 12px; width: 42px; height: 42px; }
}
</style>
