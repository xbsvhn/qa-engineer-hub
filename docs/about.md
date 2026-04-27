---
layout: page
---

<div class="about-page">

<div class="about-hero">
  <div class="about-avatar">
    <div class="avatar-ring">
      <span class="avatar-text">VHN</span>
    </div>
  </div>
  <h1 class="about-name">Vũ Hoài Nam</h1>
  <p class="about-tagline">Builder · Mentor · Quality Advocate</p>
  <div class="about-badges">
    <span class="badge">Dev</span>
    <span class="badge">QA Lead</span>
    <span class="badge">Mentor</span>
    <span class="badge">BA</span>
  </div>
</div>

<div class="about-section">

## Về tôi

Tôi là người tạo ra **QA Engineer Hub** — nền tảng kiến thức miễn phí, mã nguồn mở, dành cho cộng đồng QA Engineer Việt Nam.

Tôi tin rằng kiến thức phải được chia sẻ **đúng bản chất**, không phải liệt kê thông tin. Mỗi khái niệm trên website này được giải thích từ **gốc rễ** — bắt đầu bằng "tại sao nó tồn tại?" trước khi đi vào "nó hoạt động như thế nào?".

</div>

<div class="about-section">

## Triết lý

> **"Hiểu bản chất, không học thuộc lòng."**

Mỗi bài viết trên QA Engineer Hub tuân theo nguyên tắc:

- **Bản chất trước, kỹ thuật sau** — ví dụ đời thường → rồi mới code
- **Mọi thuật ngữ được giải thích** — lần đầu xuất hiện là lần đầu được giải thích
- **Code giải thích từng dòng** — không bỏ qua dòng nào
- **Thực tế dự án** — không phải lý thuyết suông, mà là cách người ta làm trong dự án thật

</div>

<div class="about-section">

## Kết nối

<div class="about-links">
  <a href="https://www.linkedin.com/in/namvuhoai/" target="_blank" class="about-link linkedin">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    <span>LinkedIn — namvuhoai</span>
  </a>
  <a href="https://github.com/xbsvhn/qa-engineer-hub" target="_blank" class="about-link github">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    <span>GitHub — qa-engineer-hub</span>
  </a>
</div>

</div>

</div>

<style>
.about-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.about-avatar {
  margin-bottom: 1.5rem;
}

.avatar-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
}

.avatar-text {
  color: white;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
}

.about-name {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-tagline {
  font-size: 1.1rem;
  opacity: 0.7;
  margin: 0.5rem 0 1.2rem;
}

.about-badges {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.about-section {
  margin-bottom: 2.5rem;
}

.about-section h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.about-section blockquote {
  border-left: 3px solid var(--vp-c-brand-1);
  padding-left: 1rem;
  font-style: italic;
  opacity: 0.9;
}

.about-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.about-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 500;
  transition: all 0.2s;
}

.about-link:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateX(4px);
}

.about-link.linkedin:hover { color: #0077B5; }
.about-link.github:hover { color: var(--vp-c-brand-1); }
</style>
