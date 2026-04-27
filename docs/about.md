---
layout: page
---

<div class="about-page">

<div class="about-hero">
  <div class="about-avatar">
    <div class="avatar-ring"></div>
    <div class="avatar-text">VHN</div>
  </div>
  <h1 class="about-name">Vũ Hoài Nam</h1>
  <p class="about-tagline">Software quality, from code to culture.</p>
</div>

<div class="about-divider">
  <div class="divider-line"></div>
  <div class="divider-dot"></div>
  <div class="divider-line"></div>
</div>

<div class="about-body">
  <p>Tôi làm việc ở giao điểm giữa development và quality — nơi code gặp mindset.</p>
  <p>Trải qua nhiều vai trò — developer, QA lead, business analyst, mentor — tôi nhận ra rằng chất lượng phần mềm không nằm ở tool hay process, mà ở cách mọi người trong team <em>nghĩ</em> về sản phẩm.</p>
  <p><strong>QA Engineer Hub</strong> là nơi tôi đúc kết lại những gì mình biết, theo cách mà tôi ước mình được học từ đầu: bản chất trước, kỹ thuật sau.</p>
</div>

<div class="about-quote">
  <div class="quote-mark">"</div>
  <p>Hiểu bản chất, không học thuộc lòng.</p>
</div>

<div class="about-roles">
  <span class="role" style="--i:0">Developer</span>
  <span class="role" style="--i:1">QA Lead</span>
  <span class="role" style="--i:2">Mentor</span>
  <span class="role" style="--i:3">Business Analyst</span>
</div>

<div class="about-connect">
  <a href="https://www.linkedin.com/in/namvuhoai/" target="_blank" class="connect-btn linkedin">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>LinkedIn</span>
  </a>
  <a href="https://github.com/xbsvhn/qa-engineer-hub" target="_blank" class="connect-btn github">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    <span>Source</span>
  </a>
</div>

<div class="about-footer-note">
  Open-source · Free forever · Built for the QA community
</div>

</div>

<style>
/* ===== Page ===== */
.about-page {
  max-width: 520px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
  text-align: center;
}

/* ===== Hero ===== */
.about-hero {
  animation: aboutFadeDown 0.7s ease-out;
}

.about-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin-bottom: 1.5rem;
}

.avatar-text {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 2;
  box-shadow:
    0 8px 32px rgba(99,102,241,0.3),
    0 0 0 1px rgba(99,102,241,0.1);
}

.avatar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px dashed rgba(99,102,241,0.3);
  animation: avatarSpin 20s linear infinite;
}

@keyframes avatarSpin {
  to { transform: rotate(360deg); }
}

.about-name {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
}

.about-tagline {
  font-size: 0.95rem;
  opacity: 0.45;
  margin: 0.5rem 0 0;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.01em;
}

/* ===== Divider ===== */
.about-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin: 2rem 0;
  animation: aboutFadeIn 0.7s ease-out 0.15s backwards;
}

.divider-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand-1), transparent);
  opacity: 0.3;
}

.divider-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0.4;
}

/* ===== Body ===== */
.about-body {
  text-align: left;
  animation: aboutFadeIn 0.7s ease-out 0.25s backwards;
}

.about-body p {
  font-size: 0.95rem;
  line-height: 1.85;
  opacity: 0.7;
  margin: 0 0 1rem;
}

.about-body p:last-child { margin-bottom: 0; }

.about-body strong {
  color: var(--vp-c-text-1);
  opacity: 1;
}

/* ===== Quote ===== */
.about-quote {
  margin: 2.5rem 0;
  padding: 1.5rem 2rem;
  position: relative;
  background: linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.03));
  border-radius: 16px;
  border: 1px solid rgba(99,102,241,0.08);
  animation: aboutFadeIn 0.7s ease-out 0.35s backwards;
}

.quote-mark {
  font-size: 3.5rem;
  font-family: Georgia, serif;
  color: var(--vp-c-brand-1);
  opacity: 0.2;
  line-height: 1;
  margin-bottom: -12px;
}

.about-quote p {
  font-size: 1.05rem;
  font-weight: 600;
  font-style: italic;
  color: var(--vp-c-brand-1);
  opacity: 0.7;
  margin: 0;
  letter-spacing: 0.01em;
}

/* ===== Roles ===== */
.about-roles {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  animation: aboutFadeIn 0.7s ease-out 0.45s backwards;
}

.role {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: roleSlideIn 0.5s ease-out calc(0.5s + var(--i) * 0.08s) backwards;
  cursor: default;
}

.role:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99,102,241,0.12);
}

@keyframes roleSlideIn {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ===== Connect ===== */
.about-connect {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 2.5rem;
  animation: aboutFadeIn 0.7s ease-out 0.55s backwards;
}

.connect-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2) !important;
  background: var(--vp-c-bg);
}

.connect-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.connect-btn.linkedin:hover {
  border-color: #0077B5;
  color: #0077B5 !important;
  box-shadow: 0 8px 24px rgba(0,119,181,0.15);
}

.connect-btn.github:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
  box-shadow: 0 8px 24px rgba(99,102,241,0.15);
}

/* ===== Footer note ===== */
.about-footer-note {
  font-size: 0.78rem;
  opacity: 0.35;
  font-weight: 500;
  letter-spacing: 0.05em;
  animation: aboutFadeIn 0.7s ease-out 0.65s backwards;
}

/* ===== Animations ===== */
@keyframes aboutFadeDown {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes aboutFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== Mobile ===== */
@media (max-width: 640px) {
  .about-page { padding: 2rem 1.2rem 4rem; }
  .about-name { font-size: 1.6rem; }
  .avatar-text { width: 68px; height: 68px; font-size: 22px; }
  .about-avatar { width: 82px; height: 82px; }
  .about-connect { flex-direction: column; align-items: center; }
  .about-quote { padding: 1.2rem 1.5rem; }
}
</style>
