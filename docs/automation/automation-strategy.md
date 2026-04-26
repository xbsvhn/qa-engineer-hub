# Automation Strategy

## Tại sao cần Strategy? (WHY)

Automation không phải "cứ viết test là xong". Cần chiến lược rõ ràng, nếu không:
- Automate sai thứ → **lãng phí effort**
- Chọn sai tool → **phải migrate sau** (tốn x3 effort)
- Không có maintenance plan → test suite **chết dần** (flaky, outdated)

---

## Bước 1: Nên Automate cái gì?

### Automate

| Tiêu chí | Ví dụ |
|---|---|
| Chạy **lặp lại** nhiều lần | Regression tests |
| **Stable** requirements | Login, checkout flow |
| Nhiều **data combinations** | Form validation với 50 bộ data |
| **Cross-browser/device** | Test trên Chrome, Firefox, Safari |
| **Smoke tests** | Chạy mỗi build mới |
| **API tests** | CRUD operations, business logic |

### Không nên Automate

| Tiêu chí | Ví dụ |
|---|---|
| Chạy **1 lần** rồi thôi | Ad-hoc testing |
| **UI thay đổi liên tục** | Feature đang develop |
| Cần **đánh giá chủ quan** | UX, look & feel, accessibility (phần lớn) |
| **Exploratory testing** | Khám phá bugs mới |
| **Setup phức tạp hơn value** | Test case quá edge, hiếm khi xảy ra |

### Quy tắc 80/20

```
Automate 80% effort vào:
├── Smoke tests (critical paths)
├── Regression tests (core features)
├── API tests (business logic)
└── Data-driven tests (form validations)

Giữ manual 20% cho:
├── Exploratory testing
├── Usability testing
├── Edge cases phức tạp
└── Features mới (chưa stable)
```

---

## Bước 2: Chọn Tool nào?

### Decision Matrix

| Tiêu chí | Playwright | Cypress | Selenium |
|---|---|---|---|
| Dự án mới, JS/TS team | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Dự án mới, Java team | ⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐ |
| Dự án legacy có Selenium | ⭐⭐ (migrate?) | ⭐⭐ | ⭐⭐⭐⭐⭐ (keep) |
| Cần multi-browser | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| Cần API testing | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| Frontend team viết test | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Mobile web testing | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| CI/CD speed | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

### Recommendation

```
Bạn đang bắt đầu career QA Automation?
└── Học Playwright (TypeScript) ← Best choice 2025-2026

Bạn join dự án đã có Selenium?
└── Maintain Selenium, đề xuất pilot Playwright cho module mới

Bạn trong frontend team?
└── Cypress hoặc Playwright đều OK

Bạn cần support Java/.NET?
└── Selenium hoặc Playwright (cả hai hỗ trợ Java/C#)
```

---

## Bước 3: ROI — Có đáng đầu tư không?

### Automation ROI Formula

```
ROI = (Manual Cost - Automation Cost) / Automation Cost × 100%

Manual Cost = Thời gian chạy manual × Số lần chạy × Hourly rate
Automation Cost = Thời gian viết script + Maintenance + Infrastructure
```

### Ví dụ tính ROI

| Metric | Manual | Automation |
|---|---|---|
| Regression suite | 200 test cases | 200 test cases |
| Thời gian 1 lần chạy | 3 ngày (24h) | 30 phút |
| Chạy bao nhiêu lần/tháng | 4 lần | 20 lần (mỗi build) |
| Thời gian/tháng | 96 giờ | 10 giờ |
| Chi phí viết automation | - | 2 tháng (1 lần) |
| Maintenance/tháng | - | 8 giờ |

**Sau 3 tháng:**
- Manual: 96h × 3 = **288 giờ**
- Automation: 320h (setup) + 10h × 3 + 8h × 3 = **374 giờ** (chưa hòa vốn)

**Sau 6 tháng:**
- Manual: 96h × 6 = **576 giờ**
- Automation: 320h + 10h × 6 + 8h × 6 = **428 giờ** (bắt đầu tiết kiệm!)

**Sau 12 tháng:**
- Manual: **1,152 giờ**
- Automation: **536 giờ** → Tiết kiệm **616 giờ** (53%!)

::: tip Quy tắc ngón tay cái
Automation **hòa vốn** sau khoảng **4-6 tháng**. Sau đó, mỗi tháng tiết kiệm đáng kể. ROI càng cao khi test chạy càng nhiều lần.
:::

---

## Bước 4: Automation Roadmap

### Phase 1 — Foundation (Tháng 1-2)

```
✅ Setup project structure (POM, config, CI/CD)
✅ Automate Smoke tests (~20-30 critical test cases)
✅ API tests cho core endpoints
✅ Team training
```

### Phase 2 — Growth (Tháng 3-4)

```
✅ Automate Regression tests (core features)
✅ Data-driven testing
✅ Cross-browser testing
✅ Integrate với test management tool (Jira, TestRail)
```

### Phase 3 — Maturity (Tháng 5-6)

```
✅ Performance testing automation
✅ Visual regression testing
✅ Nightly runs + Slack notifications
✅ Test coverage reporting
✅ Flaky test detection & fix
```

### Phase 4 — Optimization (Ongoing)

```
✅ Reduce test execution time (parallel, sharding)
✅ Self-healing locators
✅ AI-assisted test generation
✅ Continuous improvement
```

---

## Metrics để đo Automation Success

| Metric | Target | Cách đo |
|---|---|---|
| **Automation coverage** | ≥ 70% regression | Automated / Total test cases |
| **Pass rate** | ≥ 95% | Passed / Total executed |
| **Execution time** | < 30 phút | CI pipeline duration |
| **Flaky rate** | < 5% | Inconsistent results / Total |
| **Defect detection** | Tăng theo thời gian | Bugs found by automation |
| **ROI** | Positive sau 6 tháng | (Manual cost saved - Auto cost) |

---

## Common Pitfalls — Sai lầm thường gặp

### 1. "Automate everything"
**Sai:** Automate 100% test cases.
**Đúng:** Automate smart — focus vào regression, smoke, data-driven.

### 2. "UI test for everything"
**Sai:** Mọi thứ test qua UI.
**Đúng:** Test Pyramid — nhiều API/unit test, ít UI test.

### 3. "Ignore maintenance"
**Sai:** Viết xong rồi quên.
**Đúng:** Budget **20-30% effort** cho maintenance mỗi sprint.

### 4. "No strategy, just code"
**Sai:** Nhảy vào viết test ngay.
**Đúng:** Plan trước — chọn tool, define scope, setup CI/CD.

### 5. "Flaky tests are OK"
**Sai:** Ignore test hay fail ngẫu nhiên.
**Đúng:** Fix hoặc remove flaky tests ngay. Flaky tests phá hủy trust vào automation.

---

## Tóm tắt chương

| Bước | Câu hỏi | Output |
|---|---|---|
| **1. What to automate** | Automate cái gì? | Automation scope |
| **2. Tool selection** | Dùng tool nào? | Playwright / Cypress / Selenium |
| **3. ROI calculation** | Có đáng không? | Business case |
| **4. Roadmap** | Bắt đầu thế nào? | Phased plan |
| **5. Metrics** | Đo success thế nào? | KPIs & dashboards |
