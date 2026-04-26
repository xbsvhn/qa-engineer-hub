# Test Plan & Strategy

## Test Plan giống như Lịch trình Du lịch

Trước khi đi Đà Nẵng, bạn **không nhảy lên xe chạy liền**. Bạn lên kế hoạch:

| Du lịch | Test Plan |
|---|---|
| **Đi đâu?** (Bà Nà, Hội An, biển Mỹ Khê) | **Scope** - Test cái gì? |
| **Đi mấy ngày?** (3 ngày 2 đêm) | **Schedule** - Timeline bao lâu? |
| **Ai đi?** (4 người, ai lái xe, ai book khách sạn) | **Resources** - Ai test, ai review? |
| **Mang gì?** (kem chống nắng, áo mưa) | **Environment** - Cần browser nào, data gì? |
| **Nếu mưa?** (backup plan: đi museum thay biển) | **Risks** - Rủi ro gì, xử lý sao? |
| **Khi nào xuất phát?** (xe phải đầy xăng, check đồ) | **Entry Criteria** - Bắt đầu khi nào? |
| **Khi nào về?** (hết ngày 3, đủ ảnh check-in) | **Exit Criteria** - Kết thúc khi nào? |

:::tip Aha moment
Test Plan **không phải viết cho đẹp rồi bỏ ngăn kéo**. Nó giống lịch trình trip -- bạn cầm theo, xem lại khi lạc đường, và thay đổi khi thời tiết thay đổi. Một Test Plan tốt là Test Plan **ai đọc cũng biết team đang test cái gì**.
:::

---

## Test Strategy vs Test Plan -- Hai thứ khác nhau

Hãy tưởng tượng:

- **Test Strategy** = "Phong cách du lịch" của cả gia đình: "Nhà mình luôn đi tự túc, book Airbnb, thuê xe máy". Hiếm khi thay đổi.
- **Test Plan** = "Lịch trình chuyến Đà Nẵng cụ thể": ngày nào đi đâu, ăn gì, budget bao nhiêu. Mỗi trip một plan khác.

| | Test Strategy | Test Plan |
|---|---|---|
| **Phạm vi** | Toàn tổ chức / chương trình | Từng project / sprint cụ thể |
| **Ai tạo** | QA Lead / Manager | QA Lead / Senior QA |
| **Thay đổi** | Hiếm khi (như "luật nhà") | Mỗi sprint / release |
| **Nội dung** | Approach chung, tools, standards | Chi tiết: test gì, ai test, bao lâu |
| **Ví dụ** | "Chúng ta dùng Playwright cho web automation" | "Sprint 15: test Login redesign, 2 QA, 3 ngày" |

---

## Các thành phần của Test Plan -- "Pack đồ" cho chuyến đi

### 1. Scope -- "Đi đâu, KHÔNG đi đâu?"

Scope (phạm vi) trả lời: feature nào sẽ test, feature nào **tạm thời không test** -- và quan trọng nhất: **tại sao không test**.

```
# In Scope (Điểm đến chính)
# Những feature sẽ được test trong sprint/release này
- Login/Register module (web + mobile responsive)
- Password reset flow
- Social login (Google, Facebook)
- 2FA authentication

# Out of Scope (Lần sau mới đi)
# Những feature KHÔNG test lần này -- kèm lý do rõ ràng
- Admin panel → chưa có requirement hoàn chỉnh
- Legacy API endpoints → sẽ bị remove trong Q3
- Performance testing → sẽ có plan riêng
```

:::tip Aha moment
**Luôn ghi lý do Out of Scope.** Giống như bạn nói với bạn đi trip: "Không ghé Huế vì chỉ có 3 ngày, lần sau nhé." Nếu không ghi, 2 tuần sau PM sẽ hỏi "Tại sao không test Admin panel?" và bạn... không nhớ.
:::

### 2. Test Approach -- "Đi bằng gì? Xe máy, ô tô, hay bay?"

Approach (cách tiếp cận) là **phương pháp test**: manual hay auto, test những loại gì.

```
# Approach cho Authentication Module

# Functional Testing (Kiểm tra chức năng có đúng không)
- Manual testing: Test lần đầu cho tất cả test cases mới
- Automation: Regression suite chạy lại mỗi build (Playwright)
- API testing: Verify auth endpoints trả về đúng (Postman)

# Non-functional Testing (Kiểm tra "chất lượng" ngoài chức năng)
- Performance: Trang login phải load < 2 giây
- Security: Check theo OWASP authentication checklist
- Compatibility: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari

# Testing Types (Loại test sẽ chạy)
- Smoke test: Chạy sau mỗi build deploy -- "hệ thống còn thở không?"
- Regression: Trước release -- "feature cũ có bị hỏng không?"
- Exploratory: 2 sessions mỗi sprint -- "tìm bug bất ngờ"
```

### 3. Test Environment -- "Ở khách sạn nào? Mang gì theo?"

Environment (môi trường) là nơi bạn test: server nào, browser nào, data gì.

```
# Environments -- mỗi môi trường phục vụ mục đích khác
# Dev:     Nơi developer test code của họ
# Staging: Nơi QA test chính -- giống Production nhất
# UAT:     Business/PO test acceptance
# Prod:    Hệ thống thật -- chỉ verify, không test phá

| Env     | URL                     | Mục đích        |
|---------|-------------------------|-----------------|
| Dev     | dev.example.com         | Dev tự test     |
| Staging | staging.example.com     | QA test chính   |
| UAT     | uat.example.com         | Business verify |
| Prod    | www.example.com         | Live            |

# Test Browsers
- Chrome (latest) — Primary (ưu tiên test đầu tiên)
- Firefox (latest)
- Safari (latest)
- Mobile Chrome (Android)
- Mobile Safari (iOS)

# Test Data -- Tài khoản và dữ liệu dùng để test
- Test user:  test_user@example.com / Test@123
- Admin:      test_admin@example.com / Admin@123
- Credit card: 4111 1111 1111 1111 (thẻ test của Stripe)
```

### 4. Resources & Schedule -- "Ai đi? Ngày nào làm gì?"

```
# Team -- Phân công rõ ai làm gì
- QA Lead: An   → review test plan, phân công, report
- QA 1: Binh    → manual testing, viết bug report
- QA 2: Chi     → automation testing, API testing

# Timeline (Sprint 15 — 2 tuần)
# Giống lịch trình du lịch: ngày nào đi đâu
Day 1-2:   Viết test cases, review requirements  (Chuẩn bị)
Day 3-7:   Test execution (manual + automation)   (Đi chơi)
Day 8-9:   Bug fix verification, regression test   (Check lại)
Day 10:    Test report, sprint demo               (Về nhà, chia sẻ ảnh)
```

### 5. Entry & Exit Criteria -- "Khi nào xuất phát? Khi nào về?"

**Entry Criteria** (Điều kiện BẮT ĐẦU test) giống như checklist trước khi lên xe: xăng đầy chưa? GPS hoạt động chưa? Nếu xe chưa có xăng -- **chưa đi**.

**Exit Criteria** (Điều kiện KẾT THÚC test) giống như: "Về khi nào? Về khi đã check-in đủ 5 điểm, đủ ảnh, và hết ngày 3."

```
# Entry Criteria -- "Chưa đủ thì CHƯA bắt đầu test"
- Requirements đã review và approved
- Build deploy thành công trên Staging
- Smoke test pass (hệ thống "sống")
- Test data sẵn sàng
- Test environment ổn định

# Exit Criteria -- "Đủ thì KẾT THÚC test"
- 100% test cases đã executed
- Pass rate >= 95%
- 0 open Critical/Blocker bugs
- <= 3 open Major bugs (đã có plan fix)
- Regression test pass
- Test summary report approved bởi PM
```

:::tip Aha moment
Entry/Exit Criteria giúp bạn **tránh tranh cãi**. Không ai hỏi "Sao chưa test?" khi build chưa deploy. Không ai hỏi "Test xong chưa?" khi số liệu đã rõ ràng.
:::

### 6. Risk & Mitigation -- "Nếu trời mưa thì sao?"

Risk (rủi ro) là những thứ **có thể xảy ra** làm ảnh hưởng việc test. Mitigation (biện pháp) là **plan B** khi rủi ro xảy ra.

| # | Risk (Rủi ro) | Xác suất | Ảnh hưởng | Mitigation (Plan B) |
|---|---|---|---|---|
| 1 | Requirement thay đổi giữa sprint | Cao | Cao | Buffer 20% thời gian, sẵn sàng adjust |
| 2 | Staging environment bị sập | Trung bình | Cao | Backup test trên Dev env, escalate sớm |
| 3 | QA nghỉ phép đột xuất | Thấp | Trung bình | Cross-training, document test cases rõ |
| 4 | Third-party API (Google login) down | Thấp | Trung bình | Dùng mock responses, test khi API available |
| 5 | Test data bị reset bất ngờ | Trung bình | Thấp | Script tạo test data tự động |

### 7. Deliverables -- "Mang gì về?"

Deliverables (sản phẩm bàn giao) là output bạn deliver cho team:

| Deliverable | Khi nào | Ai nhận |
|---|---|---|
| Test Plan | Đầu sprint | PM, Dev Lead |
| Test Cases | Day 2 | Team review |
| Daily Test Report | Hàng ngày | PM (qua Slack) |
| Bug Reports | Real-time | Dev team (Jira) |
| Test Summary Report | Cuối sprint | PM, Stakeholders |

---

## Test Plan Template -- Copy-Paste ngay

```markdown
# Test Plan: [Feature/Sprint Name]

## 1. Overview
- **Project:** [Tên dự án]
- **Feature:** [Tên feature/module]
- **Sprint:** [Sprint number]
- **Author:** [Tên QA]
- **Date:** [Ngày tạo]

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

## Thực tế: Test Plan trong Agile -- 1 trang, không phải 50 trang

Trong Waterfall, Test Plan có thể dài **50 trang**. Trong Agile, nó chỉ cần **1 trang** -- đủ thông tin, không thừa giấy.

```
# Sprint 15 Test Plan — Authentication Module
# Viết ngắn, đủ ý, ai đọc cũng hiểu

Scope: Login redesign + 2FA + Social login
Out of scope: Admin panel (chưa có requirement)

QA: Binh (manual), Chi (automation)
Timeline: 28/04 - 09/05

Approach:
- New features: Manual first → automate regression sau
- Existing features: Chạy automation suite
- API: Test auth endpoints (Postman)
- Exploratory: 1 session (Friday)

Risks:
- Google OAuth sandbox có thể flaky → dùng mock nếu cần
- 2FA cần phone thật → dùng Twilio test numbers

Exit: 95% pass, 0 Critical bugs
```

:::tip Aha moment
Test Plan giống lịch trình trip -- **ngắn gọn nhưng đầy đủ**. Đủ để cả nhóm đọc 5 phút là hiểu: test gì, ai test, khi nào xong, rủi ro gì. Không ai muốn đọc 50 trang document mà nội dung có thể tóm trong 1 trang.
:::

---

## Tóm tắt -- Mỗi thành phần trả lời 1 câu hỏi

| Thành phần | Câu hỏi trả lời | Tương đương Du lịch |
|---|---|---|
| **Scope** | Test cái gì? Không test cái gì? | Đi đâu? Không ghé đâu? |
| **Approach** | Test bằng cách nào? | Đi xe máy, ô tô, hay bay? |
| **Environment** | Test trên đâu? Cần gì? | Ở khách sạn nào? Mang gì? |
| **Schedule** | Ai làm gì? Khi nào? | Ngày 1 đi đâu? Ai lái xe? |
| **Entry/Exit** | Bắt đầu/Kết thúc khi nào? | Khi nào xuất phát? Khi nào về? |
| **Risks** | Nếu có vấn đề thì sao? | Nếu mưa thì làm gì? |
| **Deliverables** | Bàn giao cái gì? | Mang gì về? (ảnh, quà) |
