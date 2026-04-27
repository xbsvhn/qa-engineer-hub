---
layout: page
---

<div class="rm-page">

<div class="rm-header">
  <h1 class="rm-title">QA Roadmap</h1>
  <p class="rm-sub">Hành trình từ Zero đến Senior</p>
</div>

<div class="timeline">
  <div class="tl-line"></div>

  <div class="tl-row" style="--i:0;--c:#3b82f6">
    <div class="tl-content tl-left">
      <b class="tl-phase">Phase 1</b>
      <b class="tl-name">Fundamentals</b>
      <span class="tl-desc">Testing Concepts · SDLC · Agile · Test Design</span>
      <em class="tl-time">Tháng 1-2</em>
    </div>
    <a href="/qa-engineer-hub/fundamentals/" class="tl-planet"><div class="tl-orb"><div class="tl-ring"></div><span>📚</span></div></a>
    <div class="tl-spacer"></div>
  </div>

  <div class="tl-row" style="--i:1;--c:#8b5cf6">
    <div class="tl-spacer"></div>
    <a href="/qa-engineer-hub/manual-testing/" class="tl-planet"><div class="tl-orb"><div class="tl-ring"></div><span>🔍</span></div></a>
    <div class="tl-content tl-right">
      <b class="tl-phase">Phase 2</b>
      <b class="tl-name">Manual Testing</b>
      <span class="tl-desc">Test Plan · Test Case · Bug Report · Exploratory</span>
      <em class="tl-time">Tháng 2-3</em>
    </div>
  </div>

  <div class="tl-row" style="--i:2;--c:#06b6d4">
    <div class="tl-content tl-left">
      <b class="tl-phase">Phase 3</b>
      <b class="tl-name">API Testing</b>
      <span class="tl-desc">HTTP · REST · Postman · API Automation</span>
      <em class="tl-time">Tháng 3-4</em>
    </div>
    <a href="/qa-engineer-hub/api-testing/" class="tl-planet"><div class="tl-orb"><div class="tl-ring"></div><span>🔗</span></div></a>
    <div class="tl-spacer"></div>
  </div>

  <div class="tl-row tl-core" style="--i:3;--c:#6366f1">
    <div class="tl-spacer"></div>
    <a href="/qa-engineer-hub/automation/" class="tl-planet big"><div class="tl-orb"><div class="tl-ring"></div><div class="tl-ring inner"></div><span>🤖</span></div></a>
    <div class="tl-content tl-right">
      <b class="tl-phase">Phase 4 — Core</b>
      <b class="tl-name">Automation</b>
      <span class="tl-desc">JavaScript · TypeScript · Playwright · POM</span>
      <em class="tl-time">Tháng 4-7</em>
    </div>
  </div>

  <div class="tl-row" style="--i:4;--c:#f59e0b">
    <div class="tl-content tl-left">
      <b class="tl-phase">Phase 5</b>
      <b class="tl-name">Performance</b>
      <span class="tl-desc">Load Testing · JMeter · K6</span>
      <em class="tl-time">Tháng 7-8</em>
    </div>
    <a href="/qa-engineer-hub/performance/" class="tl-planet"><div class="tl-orb"><div class="tl-ring"></div><span>⚡</span></div></a>
    <div class="tl-spacer"></div>
  </div>

  <div class="tl-row" style="--i:5;--c:#ef4444">
    <div class="tl-spacer"></div>
    <a href="/qa-engineer-hub/security/" class="tl-planet"><div class="tl-orb"><div class="tl-ring"></div><span>🛡️</span></div></a>
    <div class="tl-content tl-right">
      <b class="tl-phase">Phase 6</b>
      <b class="tl-name">Security</b>
      <span class="tl-desc">OWASP Top 10 · ZAP · Burp Suite</span>
      <em class="tl-time">Tháng 8-9</em>
    </div>
  </div>

  <div class="tl-row" style="--i:6;--c:#10b981">
    <div class="tl-content tl-left">
      <b class="tl-phase">Phase 7</b>
      <b class="tl-name">CI/CD & DevOps</b>
      <span class="tl-desc">Git · GitHub Actions · Docker</span>
      <em class="tl-time">Tháng 9-10</em>
    </div>
    <a href="/qa-engineer-hub/cicd/" class="tl-planet"><div class="tl-orb"><div class="tl-ring"></div><span>🔄</span></div></a>
    <div class="tl-spacer"></div>
  </div>

  <div class="tl-row tl-dest" style="--i:7;--c:#f59e0b">
    <div class="tl-spacer"></div>
    <a href="/qa-engineer-hub/best-practices/" class="tl-planet big"><div class="tl-orb"><div class="tl-ring"></div><div class="tl-ring inner"></div><span>🌟</span></div></a>
    <div class="tl-content tl-right">
      <b class="tl-phase">Destination</b>
      <b class="tl-name">Senior QA Engineer</b>
      <span class="tl-desc">Mindset · Communication · Career</span>
      <em class="tl-time">Tháng 10-12+</em>
    </div>
  </div>

</div>
</div>

<style>
.rm-page { max-width: 740px; margin: 0 auto; padding: 0 1.5rem 4rem; }

/* Header */
.rm-header { text-align: center; padding: 2.5rem 0 2rem; }
.rm-title {
  font-size: 2.2rem; font-weight: 800; margin: 0; padding-bottom: 4px;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.rm-sub { font-size: 1rem; font-weight: 500; margin: 0.3rem 0 0; opacity: 0.55; }

/* ===== Timeline ===== */
.timeline {
  position: relative;
  padding: 20px 0;
}

/* Vertical center line */
.tl-line {
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(to bottom,
    transparent,
    rgba(99,102,241,0.15) 5%,
    rgba(99,102,241,0.15) 95%,
    transparent);
  z-index: 0;
}

/* Row: 3-column grid */
.tl-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0;
  margin-bottom: 8px;
  animation: tlFadeIn 0.5s ease-out backwards;
  animation-delay: calc(var(--i) * 0.08s);
}

.tl-spacer { min-width: 0; }

/* Content block */
.tl-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 24px;
  border-radius: 14px;
  transition: all 0.3s ease;
}

.tl-content.tl-left { text-align: right; align-items: flex-end; }
.tl-content.tl-right { text-align: left; align-items: flex-start; }

.tl-row:hover .tl-content {
  background: rgba(99,102,241,0.03);
}

.tl-phase {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1.2px; color: var(--c); font-style: normal;
  display: block;
}
.tl-name {
  font-size: 1.1rem; font-weight: 700; line-height: 1.3;
  font-style: normal; display: block;
}
.tl-desc {
  font-size: 0.8rem; opacity: 0.45; line-height: 1.4;
  display: block;
}
.tl-time {
  display: inline-block; margin-top: 4px; font-size: 10px; font-weight: 600;
  padding: 2px 10px; border-radius: 6px; font-style: normal;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); opacity: 0.5;
}
.tl-dest .tl-phase { color: #f59e0b; }

/* ===== Planet (center column) ===== */
.tl-planet {
  display: flex; align-items: center; justify-content: center;
  width: 80px; height: 80px;
  position: relative; z-index: 2;
  text-decoration: none !important;
  margin: 0 8px;
}

.tl-planet.big { width: 96px; height: 96px; }

.tl-orb {
  position: relative;
  width: 60px; height: 60px; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%,
    color-mix(in srgb, var(--c) 22%, white),
    color-mix(in srgb, var(--c) 55%, black));
  display: flex; align-items: center; justify-content: center;
  box-shadow:
    0 4px 20px color-mix(in srgb, var(--c) 25%, transparent),
    0 0 0 4px var(--vp-c-bg),
    0 0 0 6px color-mix(in srgb, var(--c) 12%, transparent);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s;
}

.tl-planet.big .tl-orb { width: 72px; height: 72px; }

.tl-orb span { font-size: 26px; position: relative; z-index: 2; }
.tl-planet.big .tl-orb span { font-size: 30px; }

.tl-row:hover .tl-orb {
  transform: scale(1.18) rotate(8deg);
  box-shadow:
    0 8px 32px color-mix(in srgb, var(--c) 35%, transparent),
    0 0 0 4px var(--vp-c-bg),
    0 0 0 6px color-mix(in srgb, var(--c) 25%, transparent);
}

/* Orbit ring */
.tl-ring {
  position: absolute; inset: -7px; border-radius: 50%;
  border: 1.5px dashed var(--c); opacity: 0.2;
  animation: tlSpin 16s linear infinite;
}
.tl-ring.inner {
  inset: -14px; border-width: 1px; opacity: 0.1;
  animation-duration: 24s; animation-direction: reverse;
}
.tl-row:hover .tl-ring { opacity: 0.4; }
.tl-row:hover .tl-ring.inner { opacity: 0.22; }

@keyframes tlSpin { to { transform: rotate(360deg); } }

/* Core & Destination glow */
.tl-core .tl-orb,
.tl-dest .tl-orb {
  box-shadow:
    0 4px 24px color-mix(in srgb, var(--c) 30%, transparent),
    0 0 0 4px var(--vp-c-bg),
    0 0 0 6px color-mix(in srgb, var(--c) 18%, transparent),
    0 0 40px color-mix(in srgb, var(--c) 10%, transparent);
}

@keyframes tlFadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Dark mode */
.dark .tl-orb {
  background: radial-gradient(circle at 35% 35%,
    color-mix(in srgb, var(--c) 38%, #2a2a3e),
    color-mix(in srgb, var(--c) 14%, #0f0f1a));
}
.dark .tl-line {
  background: linear-gradient(to bottom,
    transparent,
    rgba(99,102,241,0.2) 5%,
    rgba(99,102,241,0.2) 95%,
    transparent);
}

/* ===== Mobile ===== */
@media (max-width: 640px) {
  .rm-page { padding: 0 0.75rem 2.5rem; }
  .rm-title { font-size: 1.6rem; }

  .tl-line { left: 32px; transform: none; }

  .tl-row {
    grid-template-columns: auto 1fr;
    gap: 0;
  }
  .tl-spacer { display: none; }
  .tl-content.tl-left,
  .tl-content.tl-right {
    text-align: left; align-items: flex-start;
    padding: 8px 12px;
  }
  .tl-planet { width: 64px; height: 64px; margin: 0; }
  .tl-planet.big { width: 72px; height: 72px; }
  .tl-orb { width: 48px; height: 48px; }
  .tl-planet.big .tl-orb { width: 56px; height: 56px; }
  .tl-orb span { font-size: 22px; }
  .tl-planet.big .tl-orb span { font-size: 26px; }
  .tl-name { font-size: 0.95rem; }
}
</style>
