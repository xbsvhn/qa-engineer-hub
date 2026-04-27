---
layout: home

hero:
  name: "QA Engineer Hub"
  text: "Knowledge Base"
  tagline: Nền tảng kiến thức chuyên sâu dành cho QA Engineer — Từ cơ bản đến nâng cao.
  image:
    src: /logo.svg
    alt: QA Engineer Hub
  actions:
    - theme: brand
      text: Bắt đầu ngay
      link: /fundamentals/
    - theme: alt
      text: Xem Roadmap
      link: /roadmap

features:
  - icon: 📚
    title: Fundamentals
    details: Testing Concepts, SDLC/STLC, Test Design Techniques — nền tảng vững chắc cho mọi QA Engineer.
    link: /fundamentals/
    linkText: Khám phá
  - icon: 🔍
    title: Manual Testing
    details: Test Plan, Test Case Design, Bug Reporting, Exploratory Testing — kỹ năng thiết yếu không thể thiếu.
    link: /manual-testing/
    linkText: Khám phá
  - icon: 🤖
    title: Automation Testing
    details: Selenium, Playwright, Cypress — làm chủ automation với các framework phổ biến nhất hiện nay.
    link: /automation/
    linkText: Khám phá
  - icon: 🔗
    title: API Testing
    details: REST API, Postman, API Automation — kiểm thử tầng business logic nhanh và hiệu quả.
    link: /api-testing/
    linkText: Khám phá
  - icon: ⚡
    title: Performance Testing
    details: JMeter, K6 — đánh giá hiệu năng và khả năng chịu tải của hệ thống.
    link: /performance/
    linkText: Khám phá
  - icon: 🛡️
    title: Security Testing
    details: OWASP Top 10, Security Tools — phát hiện và phòng ngừa lỗ hổng bảo mật.
    link: /security/
    linkText: Khám phá
  - icon: 🔄
    title: CI/CD
    details: Git, GitHub Actions, Docker — tích hợp testing vào quy trình phát triển liên tục.
    link: /cicd/
    linkText: Khám phá
  - icon: 💡
    title: Best Practices
    details: QA Mindset, Communication, Career Path — phát triển toàn diện sự nghiệp QA.
    link: /best-practices/
    linkText: Khám phá
---

<section class="home-terminal-wrap">
  <div class="terminal">
    <div class="terminal-bar">
      <span class="terminal-dot red"></span>
      <span class="terminal-dot yellow"></span>
      <span class="terminal-dot green"></span>
      <span class="terminal-title">playwright test</span>
    </div>
    <div class="terminal-body">
      <div class="term-line cmd">$ npx playwright test</div>
      <div class="term-line dim">Running 6 tests using 3 workers...</div>
      <div class="term-line pass"><span class="check">✓</span> login.spec.ts — User can login successfully <span class="ms">1.2s</span></div>
      <div class="term-line pass"><span class="check">✓</span> cart.spec.ts — Add item to shopping cart <span class="ms">0.8s</span></div>
      <div class="term-line pass"><span class="check">✓</span> search.spec.ts — Search returns results <span class="ms">0.6s</span></div>
      <div class="term-line pass"><span class="check">✓</span> checkout.spec.ts — Complete purchase flow <span class="ms">2.1s</span></div>
      <div class="term-line pass"><span class="check">✓</span> api/users.spec.ts — CRUD operations <span class="ms">0.4s</span></div>
      <div class="term-line pass"><span class="check">✓</span> performance.spec.ts — Page loads under 3s <span class="ms">1.8s</span></div>
      <div class="term-line result">6 passed <span class="ms">(6.9s)</span></div>
    </div>
  </div>
</section>

<section class="home-section home-numbers">
  <div class="numbers-row">
    <div class="number-item" data-count="37">
      <div class="number-value"><span class="stat-num">0</span><span class="number-suffix">+</span></div>
      <div class="number-label">Bài viết</div>
    </div>
    <div class="number-item" data-count="8">
      <div class="number-value"><span class="stat-num">0</span></div>
      <div class="number-label">Chủ đề</div>
    </div>
    <div class="number-item" data-count="2">
      <div class="number-value"><span class="stat-num">0</span></div>
      <div class="number-label">Ngôn ngữ</div>
    </div>
    <div class="number-item">
      <div class="number-value"><span class="oss-heart">&#9829;</span></div>
      <div class="number-label">Mã nguồn mở</div>
    </div>
  </div>
</section>

<section class="home-section home-motto">
  <div class="motto-glow"></div>
  <div class="motto-text">"Hiểu bản chất, không học thuộc lòng."</div>
  <div class="motto-pillars">
    <div class="pillar"><span class="pillar-line"></span><span>Bản chất trước, kỹ thuật sau</span></div>
    <div class="pillar"><span class="pillar-line"></span><span>Mọi thuật ngữ được giải thích</span></div>
    <div class="pillar"><span class="pillar-line"></span><span>Code giải thích từng dòng</span></div>
    <div class="pillar"><span class="pillar-line"></span><span>Thực tế dự án, nhiều góc nhìn</span></div>
  </div>
</section>

<style>
/* ===== Terminal ===== */
.home-terminal-wrap {
  max-width: 600px;
  margin: 24px auto 48px;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(20px);
  animation: homeReveal 0.7s ease-out 0.5s forwards;
}

.terminal {
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a2e;
  border: 1px solid rgba(99,102,241,0.15);
  box-shadow:
    0 24px 80px rgba(0,0,0,0.25),
    0 0 0 1px rgba(99,102,241,0.05),
    0 0 60px rgba(99,102,241,0.06);
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, monospace;
  font-size: 13px;
  line-height: 1.7;
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  background: #12121f;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.terminal-dot {
  width: 10px; height: 10px; border-radius: 50%;
}
.terminal-dot.red { background: #ff5f57; }
.terminal-dot.yellow { background: #febc2e; }
.terminal-dot.green { background: #28c840; }

.terminal-title {
  margin-left: auto;
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  font-weight: 500;
}

.terminal-body {
  padding: 16px 18px;
}

.term-line {
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  animation: termTypeLine 0.3s ease-out forwards;
}

/* Stagger each line */
.term-line:nth-child(1) { animation-delay: 0.8s; }
.term-line:nth-child(2) { animation-delay: 1.4s; }
.term-line:nth-child(3) { animation-delay: 2.0s; }
.term-line:nth-child(4) { animation-delay: 2.4s; }
.term-line:nth-child(5) { animation-delay: 2.8s; }
.term-line:nth-child(6) { animation-delay: 3.2s; }
.term-line:nth-child(7) { animation-delay: 3.6s; }
.term-line:nth-child(8) { animation-delay: 4.0s; }
.term-line:nth-child(9) { animation-delay: 4.6s; }

.term-line.cmd {
  color: #a78bfa;
}
.term-line.dim {
  color: rgba(255,255,255,0.35);
}
.term-line.pass {
  color: rgba(255,255,255,0.75);
}
.term-line .check {
  color: #4ade80;
  margin-right: 4px;
}
.term-line .ms {
  color: rgba(255,255,255,0.25);
  margin-left: 4px;
}
.term-line.result {
  color: #4ade80;
  font-weight: 600;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

@keyframes termTypeLine {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Light mode terminal adjustments */
:root .terminal {
  box-shadow:
    0 24px 80px rgba(0,0,0,0.12),
    0 0 0 1px rgba(99,102,241,0.08),
    0 0 60px rgba(99,102,241,0.04);
}

@keyframes homeReveal {
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile */
@media (max-width: 640px) {
  .home-terminal-wrap { margin: 16px auto 32px; }
  .terminal { font-size: 11px; }
  .terminal-body { padding: 12px 14px; }
}
</style>
