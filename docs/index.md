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

<div class="home-stats">
  <div class="stats-inner">
    <div class="stat-item" data-count="37">
      <span class="stat-num">0</span>
      <span class="stat-plus">+</span>
      <span class="stat-label">Bài viết chuyên sâu</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item" data-count="8">
      <span class="stat-num">0</span>
      <span class="stat-label">Chủ đề</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item" data-count="2">
      <span class="stat-num">0</span>
      <span class="stat-label">Ngôn ngữ</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item open-source">
      <span class="stat-icon">&#9825;</span>
      <span class="stat-label">Mã nguồn mở</span>
    </div>
  </div>
</div>

<div class="home-philosophy">
  <div class="philosophy-inner">
    <div class="philosophy-quote">"Hiểu bản chất, không học thuộc lòng."</div>
    <div class="philosophy-features">
      <div class="pf-item">
        <div class="pf-icon">&#127919;</div>
        <div class="pf-text">Bản chất trước, kỹ thuật sau</div>
      </div>
      <div class="pf-item">
        <div class="pf-icon">&#128172;</div>
        <div class="pf-text">Mọi thuật ngữ được giải thích</div>
      </div>
      <div class="pf-item">
        <div class="pf-icon">&#128187;</div>
        <div class="pf-text">Code giải thích từng dòng</div>
      </div>
      <div class="pf-item">
        <div class="pf-icon">&#127981;</div>
        <div class="pf-text">Thực tế dự án, nhiều góc nhìn</div>
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
