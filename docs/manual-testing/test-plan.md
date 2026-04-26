# Test Plan & Strategy

## Test Plan là gì? (WHAT)

Test Plan là **tài liệu chiến lược** mô tả phạm vi, cách tiếp cận, nguồn lực, và lịch trình cho các hoạt động kiểm thử. Đây là **bản đồ** cho toàn bộ quá trình testing.

### Tại sao cần Test Plan? (WHY)

- **Alignment** — cả team hiểu cùng scope, approach, timeline
- **Không bỏ sót** — checklist đảm bảo mọi thứ được xem xét
- **Communication** — PM, Dev, stakeholders biết QA sẽ làm gì
- **Reference** — quay lại xem khi có thắc mắc về scope
- **Accountability** — ai làm gì, khi nào, rõ ràng

**Thực tế:** Trong Agile, Test Plan thường **ngắn hơn** Waterfall. Không cần 50 trang document — 2-5 trang đủ dùng.

---

## Test Strategy vs Test Plan

| | Test Strategy | Test Plan |
|---|---|---|
| **Level** | Organization / Program | Project / Release |
| **Ai tạo** | QA Lead / Manager | QA Lead / Senior QA |
| **Thay đổi** | Hiếm khi thay đổi | Mỗi project / sprint |
| **Nội dung** | Approach chung, tools, standards | Chi tiết cụ thể cho project |
| **Ví dụ** | "Chúng ta dùng Playwright cho web automation" | "Sprint 15: test Login redesign, 2 QA, 3 ngày" |

---

## Các thành phần của Test Plan

### 1. Introduction & Scope

```
✅ In Scope:
- Login/Register module (web + mobile responsive)
- Password reset flow
- Social login (Google, Facebook)
- 2FA authentication

❌ Out of Scope:
- Admin panel (test ở sprint sau)
- Legacy API endpoints (deprecated)
- Performance testing (sẽ có plan riêng)

Lý do Out of Scope:
- Admin panel chưa có requirement hoàn chỉnh
- Legacy APIs sẽ bị remove trong Q3
```

::: tip Luôn ghi lý do Out of Scope
Nếu không ghi lý do, sau này stakeholder sẽ hỏi "Tại sao không test phần này?" và bạn không nhớ.
:::

### 2. Test Approach

```
Approach cho Authentication Module:

Functional Testing:
- Manual testing: Tất cả test cases cho lần đầu
- Automation: Regression test suite (Playwright)
- API testing: Auth endpoints (Postman → Playwright)

Non-functional Testing:
- Performance: Login page load time < 2s
- Security: OWASP authentication checks
- Compatibility: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari

Testing Types:
- Smoke test: Sau mỗi build deploy
- Regression: Trước release
- Exploratory: 2 sessions mỗi sprint
```

### 3. Test Environment

```
Environments:
┌──────────┬─────────────────────────────────┬───────────────┐
│ Env      │ URL                             │ Mục đích      │
├──────────┼─────────────────────────────────┼───────────────┤
│ Dev      │ dev.example.com                 │ Dev testing   │
│ Staging  │ staging.example.com             │ QA testing    │
│ UAT      │ uat.example.com                 │ Business test │
│ Prod     │ www.example.com                 │ Live          │
└──────────┴─────────────────────────────────┴───────────────┘

Test Browsers:
- Chrome (latest) — Primary
- Firefox (latest)
- Safari (latest)
- Mobile Chrome (Android)
- Mobile Safari (iOS)

Test Data:
- Test accounts: test_user@example.com / Test@123
- Admin account: test_admin@example.com / Admin@123
- Test credit card: 4111 1111 1111 1111
```

### 4. Resource & Schedule

```
Team:
- QA Lead: An (review test plan, test strategy)
- QA Engineer 1: Binh (manual testing, bug reporting)
- QA Engineer 2: Chi (automation, API testing)

Timeline (Sprint 15 — 2 weeks):
Day 1-2:   Viết test cases, review requirements
Day 3-7:   Test execution (manual + automation)
Day 8-9:   Bug fix verification, regression
Day 10:    Test report, sprint demo
```

### 5. Entry & Exit Criteria

```
Entry Criteria (Bắt đầu test khi):
☑ Requirements reviewed và approved
☑ Build deploy thành công trên Staging
☑ Smoke test pass
☑ Test data ready
☑ Test environment stable

Exit Criteria (Kết thúc test khi):
☑ 100% test cases executed
☑ Pass rate ≥ 95%
☑ 0 open Critical/Blocker bugs
☑ ≤ 3 open Major bugs (có plan fix)
☑ Regression test pass
☑ Test summary report approved
```

### 6. Risk & Mitigation

| # | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Requirement thay đổi giữa sprint | High | High | Buffer 20% thời gian, Agile mindset |
| 2 | Staging environment không ổn định | Medium | High | Backup test trên Dev env, escalate sớm |
| 3 | Thiếu người (QA nghỉ phép) | Low | Medium | Cross-training, document test cases rõ ràng |
| 4 | Third-party API (Google login) down | Low | Medium | Mock responses, test khi API available |
| 5 | Test data bị reset | Medium | Low | Script tạo test data tự động |

### 7. Deliverables

| Deliverable | Khi nào | Ai nhận |
|---|---|---|
| Test Plan | Đầu sprint | PM, Dev Lead |
| Test Cases | Day 2 | Team review |
| Daily Test Report | Hàng ngày | PM (qua Slack) |
| Bug Reports | Real-time | Dev team (Jira) |
| Test Summary Report | Cuối sprint | PM, Stakeholders |

---

## Test Plan Template — Dùng ngay

```markdown
# Test Plan: [Feature/Sprint Name]

## 1. Overview
- **Project:** [Tên dự án]
- **Feature:** [Tên feature/module]
- **Sprint:** [Sprint number]
- **Author:** [Tên QA]
- **Date:** [Ngày tạo]
- **Version:** [1.0]

## 2. Scope
### In Scope
- [Feature A]
- [Feature B]

### Out of Scope
- [Feature C] — Lý do: [...]

## 3. Test Approach
- **Functional:** Manual + Automation
- **API Testing:** [Yes/No]
- **Performance:** [Yes/No]
- **Security:** [Yes/No]

## 4. Test Environment
| Env | URL | Browser |
|---|---|---|
| Staging | [...] | Chrome, Firefox, Safari |

## 5. Schedule
| Phase | Date | Owner |
|---|---|---|
| Test case design | [Date] | [Name] |
| Test execution | [Date] | [Name] |
| Regression | [Date] | [Name] |

## 6. Entry/Exit Criteria
### Entry: [Checklist]
### Exit: [Checklist]

## 7. Risks
| Risk | Mitigation |
|---|---|
| [...] | [...] |

## 8. Deliverables
- Test cases (link)
- Test report (link)
```

---

## Thực tế: Test Plan trong Agile

### Sprint-level Test Plan (1 trang)

Trong Agile, test plan thường **rất ngắn** — chỉ cần đủ thông tin:

```
Sprint 15 Test Plan — Authentication Module

Scope: Login redesign + 2FA + Social login
Out of scope: Admin panel

QA: Binh (manual), Chi (automation)
Timeline: 28/04 - 09/05

Approach:
- New features: Manual first → automate regression
- Existing features: Run automation suite
- API: Test auth endpoints (Postman)
- Exploratory: 1 session (Friday)

Risks:
- Google OAuth sandbox may be flaky
- 2FA requires real phone number (use Twilio test numbers)

Exit: 95% pass, 0 Critical bugs
```

**1 trang. Đủ dùng.** Không cần 50 trang document mà không ai đọc.

---

## Tóm tắt chương

| Thành phần | Mục đích | Quan trọng nhất |
|---|---|---|
| **Scope** | Test cái gì, KHÔNG test cái gì | Ghi rõ lý do Out of Scope |
| **Approach** | Test như thế nào | Manual/Auto, testing types |
| **Environment** | Test ở đâu | URLs, browsers, test data |
| **Schedule** | Ai làm gì, khi nào | Timeline realistic |
| **Entry/Exit** | Bắt đầu/kết thúc khi nào | Measurable criteria |
| **Risks** | Rủi ro gì, xử lý sao | Mitigation plan |
