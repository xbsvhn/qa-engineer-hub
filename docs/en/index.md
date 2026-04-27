---
layout: home

hero:
  name: "QA Engineer Hub"
  text: "Knowledge Base"
  tagline: In-depth knowledge for QA Engineers — From fundamentals to advanced.
  image:
    src: /logo.svg
    alt: QA Engineer Hub
  actions:
    - theme: brand
      text: Get Started
      link: /en/fundamentals/
    - theme: alt
      text: View Roadmap
      link: /en/roadmap

features:
  - icon: 📚
    title: Fundamentals
    details: Testing Concepts, SDLC/STLC, Test Design Techniques — solid foundation for every QA Engineer.
    link: /en/fundamentals/
    linkText: Explore
  - icon: 🔍
    title: Manual Testing
    details: Test Plan, Test Case Design, Bug Reporting, Exploratory Testing — essential skills.
    link: /en/manual-testing/
    linkText: Explore
  - icon: 🤖
    title: Automation Testing
    details: Selenium, Playwright, Cypress — master automation with the most popular frameworks.
    link: /en/automation/
    linkText: Explore
  - icon: 🔗
    title: API Testing
    details: REST API, Postman, API Automation — test business logic fast and efficiently.
    link: /en/api-testing/
    linkText: Explore
  - icon: ⚡
    title: Performance Testing
    details: JMeter, K6 — evaluate system performance and scalability under load.
    link: /en/performance/
    linkText: Explore
  - icon: 🛡️
    title: Security Testing
    details: OWASP Top 10, Security Tools — find and prevent security vulnerabilities.
    link: /en/security/
    linkText: Explore
  - icon: 🔄
    title: CI/CD
    details: Git, GitHub Actions, Docker — integrate testing into the development pipeline.
    link: /en/cicd/
    linkText: Explore
  - icon: 💡
    title: Best Practices
    details: QA Mindset, Communication, Career Path — develop your QA career holistically.
    link: /en/best-practices/
    linkText: Explore
---

<div class="home-stats">
  <div class="stats-inner">
    <div class="stat-item" data-count="37">
      <span class="stat-num">0</span>
      <span class="stat-plus">+</span>
      <span class="stat-label">In-depth Articles</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item" data-count="8">
      <span class="stat-num">0</span>
      <span class="stat-label">Topics</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item" data-count="2">
      <span class="stat-num">0</span>
      <span class="stat-label">Languages</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item open-source">
      <span class="stat-icon">&#9825;</span>
      <span class="stat-label">Open Source</span>
    </div>
  </div>
</div>

<div class="home-philosophy">
  <div class="philosophy-inner">
    <div class="philosophy-quote">"Understand the essence, don't memorize by rote."</div>
    <div class="philosophy-features">
      <div class="pf-item">
        <div class="pf-icon">&#127919;</div>
        <div class="pf-text">Essence first, technique second</div>
      </div>
      <div class="pf-item">
        <div class="pf-icon">&#128172;</div>
        <div class="pf-text">Every term explained on first use</div>
      </div>
      <div class="pf-item">
        <div class="pf-icon">&#128187;</div>
        <div class="pf-text">Code explained line by line</div>
      </div>
      <div class="pf-item">
        <div class="pf-icon">&#127981;</div>
        <div class="pf-text">Real projects, multiple perspectives</div>
      </div>
    </div>
  </div>
</div>

<style>
/* ===== Stats Section ===== */
.home-stats {
  max-width: 720px;
  margin: -20px auto 40px;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(20px);
  animation: homeReveal 0.6s ease-out 0.3s forwards;
}

.stats-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 28px 36px;
  border-radius: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 24px rgba(99, 102, 241, 0.06);
}

.stat-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-num {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.stat-plus {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-left: -2px;
}

.stat-item .stat-num,
.stat-item .stat-plus {
  display: inline;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.5;
  white-space: nowrap;
}

.stat-icon {
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
  line-height: 1.2;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--vp-c-divider);
}

/* ===== Philosophy Section ===== */
.home-philosophy {
  max-width: 720px;
  margin: 0 auto 60px;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(20px);
}

.home-philosophy.revealed {
  animation: homeReveal 0.6s ease-out forwards;
}

.philosophy-inner {
  text-align: center;
  padding: 36px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.03));
  border: 1px solid rgba(99,102,241,0.08);
  position: relative;
  overflow: hidden;
}

.philosophy-inner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 20%, rgba(99,102,241,0.06) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(139,92,246,0.04) 0%, transparent 50%);
  pointer-events: none;
}

.philosophy-quote {
  font-size: 1.15rem;
  font-weight: 600;
  font-style: italic;
  color: var(--vp-c-brand-1);
  margin-bottom: 24px;
  position: relative;
  opacity: 0.8;
}

.philosophy-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  position: relative;
}

.pf-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.pf-item:hover {
  background: rgba(99,102,241,0.06);
  transform: translateX(4px);
}

.pf-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.pf-text {
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.7;
  text-align: left;
}

@keyframes homeReveal {
  to { opacity: 1; transform: translateY(0); }
}

/* ===== Mobile ===== */
@media (max-width: 640px) {
  .stats-inner {
    flex-wrap: wrap;
    gap: 16px;
    padding: 20px 24px;
  }
  .stat-divider { display: none; }
  .stat-item { min-width: 80px; }
  .philosophy-features { grid-template-columns: 1fr; }
  .philosophy-inner { padding: 24px 20px; }
}
</style>
