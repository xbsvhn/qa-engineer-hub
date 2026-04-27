---
layout: page
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="roadmap-page">

<div class="roadmap-header">
  <div class="header-glow"></div>
  <h1 class="roadmap-title">QA Roadmap</h1>
  <p class="roadmap-subtitle">Journey from Zero to Senior</p>
</div>

<div class="galaxy">
  <svg class="zigzag-path" viewBox="0 0 600 100" preserveAspectRatio="none">
    <path d="M0,50 Q150,0 300,50 Q450,100 600,50" stroke="url(#zigzag-grad-en)" stroke-width="2" fill="none" stroke-dasharray="8 6" opacity="0.3"/>
    <defs><linearGradient id="zigzag-grad-en" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#a78bfa"/></linearGradient></defs>
  </svg>

  <div class="zigzag-grid">

    <a :href="withBase('/en/fundamentals/')" class="planet-node left" style="--i:0;--c:#3b82f6">
      <div class="node-planet">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg0)"/><circle cx="40" cy="40" r="36" stroke="#3b82f6" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="12s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="22">📚</text><defs><radialGradient id="eg0"><stop offset="0%" stop-color="#60a5fa" stop-opacity="0.3"/><stop offset="100%" stop-color="#1e40af" stop-opacity="0.1"/></radialGradient></defs></svg>
        <div class="planet-ring-glow"></div>
      </div>
      <div class="node-info">
        <span class="node-phase">Phase 1</span>
        <span class="node-title">Fundamentals</span>
        <span class="node-desc">Testing Concepts · SDLC · Agile · Test Design</span>
        <span class="node-time">Month 1-2</span>
      </div>
    </a>

    <a :href="withBase('/en/manual-testing/')" class="planet-node right" style="--i:1;--c:#8b5cf6">
      <div class="node-info">
        <span class="node-phase">Phase 2</span>
        <span class="node-title">Manual Testing</span>
        <span class="node-desc">Test Plan · Test Case · Bug Report · Exploratory</span>
        <span class="node-time">Month 2-3</span>
      </div>
      <div class="node-planet">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg1)"/><circle cx="40" cy="40" r="36" stroke="#8b5cf6" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="14s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="22">🔍</text><defs><radialGradient id="eg1"><stop offset="0%" stop-color="#a78bfa" stop-opacity="0.3"/><stop offset="100%" stop-color="#5b21b6" stop-opacity="0.1"/></radialGradient></defs></svg>
        <div class="planet-ring-glow"></div>
      </div>
    </a>

    <a :href="withBase('/en/api-testing/')" class="planet-node left" style="--i:2;--c:#06b6d4">
      <div class="node-planet">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg2)"/><circle cx="40" cy="40" r="36" stroke="#06b6d4" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="10s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="22">🔗</text><defs><radialGradient id="eg2"><stop offset="0%" stop-color="#22d3ee" stop-opacity="0.3"/><stop offset="100%" stop-color="#0e7490" stop-opacity="0.1"/></radialGradient></defs></svg>
        <div class="planet-ring-glow"></div>
      </div>
      <div class="node-info">
        <span class="node-phase">Phase 3</span>
        <span class="node-title">API Testing</span>
        <span class="node-desc">HTTP · REST · Postman · Automation</span>
        <span class="node-time">Month 3-4</span>
      </div>
    </a>

    <a :href="withBase('/en/automation/')" class="planet-node right core" style="--i:3;--c:#6366f1">
      <div class="node-info">
        <span class="node-phase">Phase 4 — Core</span>
        <span class="node-title">Automation</span>
        <span class="node-desc">JavaScript · TypeScript · Playwright · POM</span>
        <span class="node-time">Month 4-7</span>
      </div>
      <div class="node-planet big">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg3)"/><circle cx="40" cy="40" r="36" stroke="#6366f1" stroke-width="1.5" fill="none" opacity="0.4" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="8s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><circle cx="40" cy="40" r="28" stroke="#a78bfa" stroke-width="0.5" fill="none" opacity="0.2"><animateTransform attributeName="transform" type="rotate" dur="15s" from="360 40 40" to="0 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="24">🤖</text><defs><radialGradient id="eg3"><stop offset="0%" stop-color="#818cf8" stop-opacity="0.35"/><stop offset="100%" stop-color="#4338ca" stop-opacity="0.15"/></radialGradient></defs></svg>
        <div class="planet-ring-glow core-glow"></div>
      </div>
    </a>

    <a :href="withBase('/en/performance/')" class="planet-node left" style="--i:4;--c:#f59e0b">
      <div class="node-planet">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg4)"/><circle cx="40" cy="40" r="36" stroke="#f59e0b" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="11s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="22">⚡</text><defs><radialGradient id="eg4"><stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3"/><stop offset="100%" stop-color="#b45309" stop-opacity="0.1"/></radialGradient></defs></svg>
        <div class="planet-ring-glow"></div>
      </div>
      <div class="node-info">
        <span class="node-phase">Phase 5</span>
        <span class="node-title">Performance</span>
        <span class="node-desc">Load Testing · JMeter · K6</span>
        <span class="node-time">Month 7-8</span>
      </div>
    </a>

    <a :href="withBase('/en/security/')" class="planet-node right" style="--i:5;--c:#ef4444">
      <div class="node-info">
        <span class="node-phase">Phase 6</span>
        <span class="node-title">Security</span>
        <span class="node-desc">OWASP Top 10 · ZAP · Burp Suite</span>
        <span class="node-time">Month 8-9</span>
      </div>
      <div class="node-planet">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg5)"/><circle cx="40" cy="40" r="36" stroke="#ef4444" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="13s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="22">🛡️</text><defs><radialGradient id="eg5"><stop offset="0%" stop-color="#fca5a5" stop-opacity="0.3"/><stop offset="100%" stop-color="#b91c1c" stop-opacity="0.1"/></radialGradient></defs></svg>
        <div class="planet-ring-glow"></div>
      </div>
    </a>

    <a :href="withBase('/en/cicd/')" class="planet-node left" style="--i:6;--c:#10b981">
      <div class="node-planet">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg6)"/><circle cx="40" cy="40" r="36" stroke="#10b981" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="9s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="22">🔄</text><defs><radialGradient id="eg6"><stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.3"/><stop offset="100%" stop-color="#047857" stop-opacity="0.1"/></radialGradient></defs></svg>
        <div class="planet-ring-glow"></div>
      </div>
      <div class="node-info">
        <span class="node-phase">Phase 7</span>
        <span class="node-title">CI/CD & DevOps</span>
        <span class="node-desc">Git · GitHub Actions · Docker</span>
        <span class="node-time">Month 9-10</span>
      </div>
    </a>

    <a :href="withBase('/en/best-practices/')" class="planet-node right destination" style="--i:7;--c:#f59e0b">
      <div class="node-info">
        <span class="node-phase">Destination</span>
        <span class="node-title">Senior QA Engineer</span>
        <span class="node-desc">Mindset · Communication · Career</span>
        <span class="node-time">Month 10-12+</span>
      </div>
      <div class="node-planet big">
        <svg viewBox="0 0 80 80" class="planet-svg"><circle cx="40" cy="40" r="32" fill="url(#eg7)"/><circle cx="40" cy="40" r="36" stroke="#f59e0b" stroke-width="1.5" fill="none" opacity="0.4" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" dur="10s" from="0 40 40" to="360 40 40" repeatCount="indefinite"/></circle><circle cx="40" cy="40" r="28" stroke="#fbbf24" stroke-width="0.5" fill="none" opacity="0.2"><animateTransform attributeName="transform" type="rotate" dur="18s" from="360 40 40" to="0 40 40" repeatCount="indefinite"/></circle><text x="40" y="48" text-anchor="middle" font-size="24">🌟</text><defs><radialGradient id="eg7"><stop offset="0%" stop-color="#fbbf24" stop-opacity="0.35"/><stop offset="100%" stop-color="#ea580c" stop-opacity="0.15"/></radialGradient></defs></svg>
        <div class="planet-ring-glow dest-glow"></div>
      </div>
    </a>

  </div>
</div>
</div>

<style>
.roadmap-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

.roadmap-header {
  text-align: center;
  padding: 2.5rem 0 2rem;
  position: relative;
}

.header-glow {
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 300px; height: 120px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%);
  pointer-events: none;
}

.roadmap-title {
  font-size: 2rem; font-weight: 800; margin: 0;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.roadmap-subtitle {
  font-size: 1rem; font-weight: 500; margin: 0.3rem 0 0; opacity: 0.7;
}

.galaxy { position: relative; }

.zigzag-path {
  position: absolute;
  top: 40px; bottom: 40px; left: 0; right: 0;
  width: 100%; height: calc(100% - 80px);
  pointer-events: none; z-index: 0;
}

.zigzag-grid {
  display: flex; flex-direction: column; gap: 8px;
  position: relative; z-index: 1;
}

.planet-node {
  display: flex; align-items: center; gap: 20px;
  padding: 16px 20px; border-radius: 16px;
  text-decoration: none !important; color: var(--vp-c-text-1) !important;
  border: 1px solid transparent;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: nodeSlideIn 0.5s ease-out backwards;
  animation-delay: calc(var(--i) * 0.08s);
}

.planet-node.left { margin-right: 20%; flex-direction: row; }
.planet-node.right { margin-left: 20%; flex-direction: row-reverse; text-align: right; }
.planet-node.right .node-info { align-items: flex-end; }

.planet-node:hover {
  background: rgba(99,102,241,0.04);
  border-color: rgba(99,102,241,0.12);
  transform: scale(1.02);
}

.planet-node.core {
  background: rgba(99,102,241,0.03);
  border: 1px solid rgba(99,102,241,0.1);
}

.planet-node.destination {
  background: rgba(245,158,11,0.03);
  border: 1px solid rgba(245,158,11,0.1);
}

.node-planet { position: relative; flex-shrink: 0; width: 72px; height: 72px; }
.node-planet.big { width: 84px; height: 84px; }

.planet-svg {
  width: 100%; height: 100%;
  filter: drop-shadow(0 0 8px rgba(99,102,241,0.15));
  transition: transform 0.4s, filter 0.4s;
}

.planet-node:hover .planet-svg {
  transform: scale(1.12) rotate(5deg);
  filter: drop-shadow(0 0 16px var(--c));
}

.planet-ring-glow {
  position: absolute; inset: -8px; border-radius: 50%;
  background: radial-gradient(circle, var(--c) 0%, transparent 70%);
  opacity: 0; filter: blur(12px);
  transition: opacity 0.4s; pointer-events: none;
}

.planet-node:hover .planet-ring-glow { opacity: 0.25; }
.core-glow { opacity: 0.12; }
.dest-glow { opacity: 0.15; }

.node-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }

.node-phase {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1.2px; color: var(--c);
}

.node-title { font-size: 1.05rem; font-weight: 700; line-height: 1.3; }
.node-desc { font-size: 0.8rem; opacity: 0.5; line-height: 1.35; }

.node-time {
  display: inline-block; margin-top: 4px; font-size: 11px; font-weight: 600;
  padding: 2px 10px; border-radius: 8px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
  opacity: 0.6; width: fit-content;
}

.planet-node.destination .node-phase { color: #f59e0b; }

@keyframes nodeSlideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.dark .planet-node:hover { background: rgba(99,102,241,0.06); }

@media (max-width: 640px) {
  .roadmap-page { padding: 0 0.75rem 2.5rem; }
  .roadmap-title { font-size: 1.5rem; }
  .planet-node.left, .planet-node.right {
    margin-left: 0; margin-right: 0;
    flex-direction: row; text-align: left;
  }
  .planet-node.right .node-info { align-items: flex-start; }
  .node-planet { width: 56px; height: 56px; }
  .node-planet.big { width: 64px; height: 64px; }
  .planet-node { gap: 14px; padding: 12px 14px; }
  .node-title { font-size: 0.95rem; }
  .zigzag-path { display: none; }
}
</style>
