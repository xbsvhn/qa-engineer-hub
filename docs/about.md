---
layout: page
---

<div class="about-page">

<div class="about-hero">
  <div class="about-avatar">
    <div class="avatar-text">VHN</div>
  </div>
  <h1 class="about-name">Vũ Hoài Nam</h1>
  <p class="about-tagline">Software quality, from code to culture.</p>
  <div class="about-links">
    <a href="https://www.linkedin.com/in/namvuhoai/" target="_blank" class="about-link">LinkedIn</a>
    <span class="about-dot">·</span>
    <a href="https://github.com/xbsvhn/qa-engineer-hub" target="_blank" class="about-link">GitHub</a>
  </div>
</div>

<div class="about-body">

<p>Tôi làm việc ở giao điểm giữa development và quality — nơi code gặp mindset.</p>

<p>Trải qua nhiều vai trò — developer, QA lead, business analyst, mentor — tôi nhận ra rằng chất lượng phần mềm không nằm ở tool hay process, mà ở cách mọi người trong team <em>nghĩ</em> về sản phẩm.</p>

<p><strong>QA Engineer Hub</strong> là nơi tôi đúc kết lại những gì mình biết, theo cách mà tôi ước mình được học từ đầu: bản chất trước, kỹ thuật sau. Mã nguồn mở. Miễn phí.</p>

</div>

<div class="about-quote">
  <p>"Hiểu bản chất, không học thuộc lòng."</p>
</div>

</div>

<style>
.about-page {
  max-width: 560px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
}

/* Hero */
.about-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.about-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(99,102,241,0.25);
}

.avatar-text {
  color: white;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.about-name {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-tagline {
  font-size: 1rem;
  opacity: 0.5;
  margin: 0.4rem 0 1.2rem;
  font-weight: 400;
  font-style: italic;
}

.about-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.about-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: opacity 0.2s;
}

.about-link:hover {
  opacity: 0.7;
}

.about-dot {
  opacity: 0.3;
  font-size: 0.85rem;
}

/* Body */
.about-body {
  margin-bottom: 2.5rem;
}

.about-body p {
  font-size: 0.95rem;
  line-height: 1.8;
  opacity: 0.75;
  margin: 0 0 1rem;
}

.about-body p:last-child {
  margin-bottom: 0;
}

.about-body strong {
  opacity: 1;
  color: var(--vp-c-text-1);
}

.about-body em {
  font-style: italic;
}

/* Quote */
.about-quote {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 2rem;
  text-align: center;
}

.about-quote p {
  font-size: 1rem;
  font-weight: 500;
  font-style: italic;
  color: var(--vp-c-brand-1);
  opacity: 0.6;
  margin: 0;
}

/* Mobile */
@media (max-width: 640px) {
  .about-page { padding: 2.5rem 1.2rem 4rem; }
  .about-name { font-size: 1.5rem; }
  .about-avatar { width: 72px; height: 72px; }
  .avatar-text { font-size: 24px; }
}
</style>
