# Automation Strategy — Automate Đúng Thứ, Đúng Cách, Đúng Lúc

## Tại sao cần strategy?

Automation không phải "viết code test rồi chạy". Không có strategy, bạn sẽ rơi vào 1 trong 3 cái bẫy:

- **Automate sai thứ** → bỏ 2 tháng viết test cho feature sắp bị remove
- **Chọn sai tool** → 6 tháng sau phải migrate, tốn x3 effort ban đầu
- **Không plan maintenance** → test suite "chết dần" — 40% tests flaky, team mất trust, bỏ automation

Bài này giúp bạn tránh cả 3.

---

## Bước 1: Automate cái gì? (Quy tắc 80/20)

### Nguyên tắc cốt lõi

**80% giá trị đến từ 20% test cases.** Tìm đúng 20% đó.

Không phải test case nào cũng đáng automate. Hỏi 3 câu:

```
Câu 1: Test này chạy bao nhiêu lần?
        1 lần → manual
        Mỗi sprint → có thể automate
        Mỗi build → PHẢI automate

Câu 2: Test này stable không?
        Feature đang develop, UI thay đổi hàng tuần → ĐỪNG automate (lãng phí)
        Feature stable, requirements rõ ràng → automate

Câu 3: Test này có nhiều data combinations không?
        Login với 1 bộ data → manual OK
        Form validation với 50 bộ data → automate (data-driven testing)
```

### Nên automate

| Loại test | Ví dụ thực tế | Lý do |
|---|---|---|
| **Smoke tests** | Login, view dashboard, create order | Chạy mỗi build, fail = block release |
| **Regression tests** | Core features của sản phẩm | Chạy mỗi sprint, manual mất 3 ngày |
| **API tests** | CRUD operations, business logic | Nhanh, stable, ROI cao nhất |
| **Data-driven tests** | Form validation, search filters | 1 script + 50 bộ data = 50 test cases |
| **Cross-browser** | Cùng flow trên Chrome, Firefox, Safari | Manual test 3 browsers = x3 effort |

### ĐỪNG automate

| Loại test | Ví dụ | Lý do |
|---|---|---|
| **One-time tests** | "Check xem bug #1234 đã fix chưa" | Chạy 1 lần rồi thôi — ROI âm |
| **UX / Visual judgment** | "Layout có đẹp không? Font có hợp không?" | Máy không đánh giá được thẩm mỹ |
| **Exploratory testing** | "Thử break app bằng cách dùng random" | Cần tư duy sáng tạo con người |
| **Unstable features** | Feature đang A/B test, UI redesign hàng tuần | Automate xong → feature thay đổi → viết lại |
| **Edge cases cực kỳ hiếm** | "User mở 500 tabs cùng lúc" | Effort viết > value nó mang lại |

### Ví dụ thực tế: E-commerce app

```
AUTOMATE (20% effort → 80% coverage):
├── Login / Logout                          ← smoke
├── Search products → View detail           ← smoke
├── Add to cart → Checkout → Payment        ← critical path
├── API: Create order, Get order, Cancel    ← business logic
├── Form validation: 30 bộ data            ← data-driven
└── Cùng flow trên Chrome + Firefox         ← cross-browser

MANUAL (cần con người):
├── "Trang chủ có đẹp trên mobile không?"  ← UX judgment
├── "Thử nghịch payment flow xem có bug?"  ← exploratory
├── Feature mới: Loyalty points (đang dev)  ← unstable
└── "Performance có OK khi 1000 users?"     ← cần tool riêng (k6, JMeter)
```

---

## Bước 2: Chọn tool nào? (Decision Matrix)

### Ma trận quyết định

| Tiêu chí | Playwright | Cypress | Selenium |
|---|---|---|---|
| **Dự án mới, JS/TS team** | :star: Best choice | Rất tốt | Không nên |
| **Dự án mới, Java team** | Tốt | Không dùng được | Tốt |
| **Legacy project có Selenium** | Migrate dần | Migrate dần | Giữ nguyên |
| **Cần multi-browser** | Tốt nhất | Hạn chế | Tốt |
| **Cần API testing** | Built-in | Cơ bản | Cần thêm lib |
| **Frontend team viết test** | Tốt | Tốt nhất (DX) | Không nên |
| **CI/CD speed** | Nhanh nhất | Nhanh | Chậm nhất |
| **Budget concern** | Free, parallel free | Parallel trả tiền | Free, Grid tự setup |
| **Cross-domain / multi-tab** | Full support | Không support | Support |

### Chọn nhanh

```
Bạn đang bắt đầu career QA Automation?
└── Playwright (TypeScript) ← best investment 2025-2026

Bạn join dự án đã có Selenium 2000+ tests?
└── Maintain Selenium. Propose pilot Playwright cho module mới.
    Đừng propose "rewrite toàn bộ" — manager sẽ reject.

Bạn trong frontend team, app là SPA?
└── Cypress hoặc Playwright đều OK. Chọn cái team quen hơn.

Team dùng Java/.NET là chính?
└── Selenium hoặc Playwright. Cả hai support Java/C#.
```

---

## Bước 3: ROI Calculation — Thuyết phục manager bằng con số

Manager không care "Playwright cool lắm". Manager care "nó tiết kiệm bao nhiêu tiền, bao lâu hòa vốn?"

### Formula

```
Chi phí Manual mỗi tháng = Thời gian chạy × Số lần chạy × Chi phí/giờ
Chi phí Automation mỗi tháng = (Chi phí setup ÷ số tháng) + Execution + Maintenance
ROI = (Chi phí Manual − Chi phí Automation) ÷ Chi phí Automation × 100%
```

### Tính bằng số THẬT

Giả sử: QA Engineer lương $1,500/tháng (~$9/giờ). Regression suite 200 test cases.

| Metric | Manual | Automation |
|---|---|---|
| Thời gian chạy 1 lần | 3 ngày (24 giờ) | 30 phút (0.5 giờ) |
| Số lần chạy / tháng | 4 (mỗi sprint) | 20 (mỗi build) |
| Tổng giờ chạy / tháng | 96 giờ | 10 giờ |
| Chi phí chạy / tháng | $864 | $90 |
| Chi phí setup (1 lần) | $0 | $4,320 (2 tháng × $2,160/tháng QA senior) |
| Chi phí maintenance / tháng | $0 | $144 (16 giờ × $9) |
| **Tổng chi phí / tháng** | **$864** | **$234 + amortized setup** |

### Break-even analysis

```
Tháng 1-2:  Setup automation. Chi phí: $4,320. Manual vẫn chạy: $1,728
            Tổng: $6,048 cho automation path

Tháng 3:    Automation bắt đầu chạy.
            Manual (nếu không automate): $864/tháng
            Automation: $234/tháng
            Tiết kiệm: $630/tháng

Tháng 5:    BREAK-EVEN POINT
            ┌──────────────────────────────────────┐
            │  Tổng Manual:  5 × $864 = $4,320     │
            │  Tổng Auto:    $4,320 + 3 × $234     │
            │              = $4,320 + $702 = $5,022 │
            │                                       │
            │  Tháng 6: Manual $5,184 vs Auto $5,256│
            │  Tháng 7: Manual $6,048 vs Auto $5,490│
            │  ← Automation rẻ hơn từ tháng 7      │
            └──────────────────────────────────────┘

Tháng 12:   Manual: $10,368  vs  Automation: $6,660
             Tiết kiệm: $3,708 (36%)

Năm 2:      Manual: $20,736  vs  Automation: $9,468
             Tiết kiệm: $11,268 (54%)
```

::: tip Số liệu để show manager
"Đầu tư $4,320 cho automation setup. Break-even tháng thứ 5. Sau 1 năm tiết kiệm ~$3,700. Sau 2 năm tiết kiệm ~$11,000. Và automation chạy 20 lần/tháng thay vì 4 lần — catch bugs sớm hơn 5x."
:::

### Giá trị KHÔNG đo được bằng tiền

- **Catch bugs sớm hơn** — automation chạy mỗi build, không đợi cuối sprint
- **QA Engineers freed up** — dành thời gian exploratory testing, strategy thay vì chạy manual lặp lại
- **Confidence khi release** — "regression suite passed" = team yên tâm deploy
- **Tốc độ release nhanh hơn** — từ 2 tuần/release → 1 tuần/release

---

## Bước 4: Roadmap — Từng bước, đừng vội

### Phase 1: Foundation (Tháng 1-2)

```
Mục tiêu: Chạy được 20-30 smoke tests trong CI/CD

Việc cần làm:
├── Chọn tool (Playwright recommended)
├── Setup project structure
│   ├── Page Object Model
│   ├── Config (environments, browsers)
│   ├── CI/CD pipeline (GitHub Actions / Jenkins)
│   └── Reporting (HTML report)
├── Automate 20-30 smoke test cases
│   ├── Login / Logout
│   ├── Navigate main pages
│   └── 1 critical flow end-to-end
├── API tests cho 5-10 core endpoints
└── Team training (nếu team chưa biết tool)

KPI: Smoke suite chạy trong CI, < 5 phút, pass rate > 95%
```

### Phase 2: Growth (Tháng 3-4)

```
Mục tiêu: Cover core regression, data-driven testing

Việc cần làm:
├── Thêm 50-80 regression test cases
│   ├── Core business flows
│   ├── Form validations (data-driven)
│   └── Error handling scenarios
├── Cross-browser testing (Chrome + Firefox + WebKit)
├── Integrate test management (Jira / TestRail links)
├── Setup nightly runs + Slack notifications
└── Document: test naming conventions, folder structure

KPI: 70%+ regression automated, execution < 15 phút
```

### Phase 3: Maturity (Tháng 5-6)

```
Mục tiêu: Stable, reliable, team trust automation results

Việc cần làm:
├── Visual regression testing (screenshot comparison)
├── Performance monitoring (page load times in tests)
├── Flaky test detection & elimination
│   ├── Track flaky rate per test
│   ├── Fix or quarantine flaky tests
│   └── Target: < 3% flaky rate
├── Test coverage reporting (dashboard)
└── Runbook: "What to do when automation fails"

KPI: Pass rate > 98%, flaky < 3%, team uses results for release decisions
```

### Phase 4: Optimization (Ongoing)

```
Mục tiêu: Faster, smarter, less maintenance

Việc cần làm:
├── Parallel execution / sharding
│   └── 200 tests × 4 workers = 50 tests mỗi worker → 4x nhanh hơn
├── Smart test selection (chỉ chạy tests liên quan tới code changed)
├── Self-healing locators (AI-assisted)
├── Shift-left: developers chạy relevant tests trước khi commit
└── Continuous improvement
    ├── Review automation ROI quarterly
    ├── Remove obsolete tests
    └── Add tests for new features

KPI: Execution < 10 phút, maintenance effort < 20% total automation effort
```

---

## Common Pitfalls — 5 cái bẫy phải tránh

### Bẫy 1: "Automate Everything"

```
Sai:  "Chúng ta phải automate 100% test cases!"
      → 6 tháng sau: 500 tests, 30% flaky, team ghét automation

Đúng: "Automate smart — 70% regression coverage là đủ tốt."
      → Focus vào high-value tests. Manual cho phần còn lại.

Dấu hiệu: Bạn automate test case mà chỉ chạy 1 lần/quý.
           Bạn automate edge case mà phải setup 30 phút data.
```

### Bẫy 2: "UI Test Everything" (đảo ngược Test Pyramid)

```
SAI — Ice Cream Cone:          ĐÚNG — Test Pyramid:

    ┌─────────┐                      /\
    │ UI Tests│ ← RẤT NHIỀU        /  \
    │  (500)  │                    / UI \  ← ÍT (50)
    ├─────────┤                   / (E2E) \
    │API Tests│ ← ÍT            /──────────\
    │  (50)   │                / API Tests   \  ← VỪA (200)
    ├─────────┤               / (Integration)  \
    │  Unit   │ ← KHÔNG CÓ  /──────────────────\
    │  Tests  │             /    Unit Tests       \  ← NHIỀU (500)
    └─────────┘            /______________________\

UI tests: Chậm (5-30s mỗi test), fragile (UI change = test break)
API tests: Nhanh (< 1s mỗi test), stable (API ít thay đổi hơn UI)
Unit tests: Nhanh nhất, stable nhất (developer viết)
```

**Quy tắc:** Nếu test được bằng API → ĐỪNG test bằng UI. UI test chỉ cho flows mà user thực sự tương tác.

### Bẫy 3: "Ignore Maintenance"

```
Sai:  Viết 200 tests → quên → 3 tháng sau 40% fail
      → Team: "Automation không work, bỏ đi"

Đúng: Budget 20-30% effort cho maintenance MỖI sprint
      ├── Fix broken tests do UI changes
      ├── Update test data
      ├── Remove obsolete tests
      └── Refactor duplicated code

Rule of thumb: Mỗi sprint, dành 1-2 ngày cho automation maintenance.
```

### Bẫy 4: "No Strategy, Just Code"

```
Sai:  "Mình biết Playwright rồi, viết test thôi!"
      → 3 tháng sau: tests nằm rải rác, không ai biết chạy thế nào,
        naming convention loạn, CI/CD chưa có

Đúng: Plan trước, code sau.
      Week 1: Define scope, chọn tool, setup project structure
      Week 2: CI/CD pipeline, reporting, naming conventions
      Week 3: BẮT ĐẦU viết tests

Dấu hiệu: Không có README, không có CI/CD, test names kiểu
           "test1", "test2", không ai khác chạy được tests của bạn.
```

### Bẫy 5: "Flaky Tests Are OK"

```
Sai:  "Test đó hay fail ngẫu nhiên, re-run là pass thôi"
      → Team bắt đầu ignore automation results
      → Automation mất giá trị hoàn toàn

Đúng: Flaky test = bug trong automation code. Fix ngay.
      ├── Track flaky rate (target < 3%)
      ├── Quarantine flaky tests (move ra suite riêng)
      ├── Root cause: thường là timing issues, test data dependency
      └── Nếu không fix được → DELETE. Flaky test tệ hơn no test.

Analogy: Flaky test giống chuông báo cháy hay kêu giả.
         Kêu giả nhiều → mọi người ignore → cháy thật thì không ai chạy.
```

---

## Metrics — Đo lường automation success

| Metric | Target | Tại sao quan trọng |
|---|---|---|
| **Automation coverage** | >= 70% regression | Dưới 70% → vẫn manual nhiều quá |
| **Pass rate** | >= 95% | Dưới 95% → quá nhiều failures/flaky |
| **Flaky rate** | < 3% | Trên 5% → team mất trust |
| **Execution time** | < 15 phút | Trên 30 phút → developers không chờ, skip test |
| **Bug detection** | Tăng qua thời gian | Automation phải CATCH bugs, không chỉ "pass" |
| **Maintenance ratio** | < 30% total effort | Trên 30% → code quality kém, cần refactor |

---

## Tóm tắt — Strategy trên 1 trang

```
WHAT to automate:
  80/20 rule → Smoke, Regression, API, Data-driven
  ĐỪNG automate: one-time, UX judgment, unstable features

WHICH tool:
  New project + JS/TS → Playwright
  Legacy Selenium → maintain, pilot Playwright dần
  Frontend team → Cypress hoặc Playwright

WHY (ROI):
  Break-even ~5 tháng. Sau 1 năm tiết kiệm 36%+.
  Giá trị ẩn: catch bugs sớm, release nhanh, QA freed up.

HOW (Roadmap):
  Phase 1 (tháng 1-2): Foundation — 20-30 smoke tests + CI/CD
  Phase 2 (tháng 3-4): Growth — 50-80 regression + cross-browser
  Phase 3 (tháng 5-6): Maturity — visual testing, flaky < 3%
  Phase 4 (ongoing):   Optimize — parallel, smart selection

AVOID:
  "Automate everything" trap
  "UI test everything" trap (follow Test Pyramid)
  "Ignore maintenance" trap (budget 20-30% per sprint)
  "No strategy, just code" trap
  "Flaky tests are OK" trap
```

::: tip Action item
Nếu bạn đang bắt đầu automation cho dự án: copy phần Roadmap Phase 1 làm checklist. Đừng nhảy thẳng tới Phase 3. Foundation vững → mọi thứ sau đó dễ hơn.
:::
