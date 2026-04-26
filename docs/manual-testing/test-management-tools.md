# Test Management Tools

## Tại sao cần Test Management Tool? (WHY)

Khi dự án có **50+ test cases**, quản lý bằng Excel/Google Sheet trở nên hỗn loạn:
- Không biết test case nào đã chạy, ai chạy
- Không có metrics (pass rate, coverage)
- Không link được test case ↔ requirement ↔ bug
- Khó collaboration giữa nhiều QA

Test Management Tool giải quyết tất cả vấn đề trên.

---

## So sánh các tool phổ biến

| Tool | Giá | Đặc điểm | Phù hợp |
|---|---|---|---|
| **Jira + Zephyr** | Zephyr từ $10/mo | Tích hợp Jira native | Team đã dùng Jira |
| **TestRail** | Từ $36/mo | Dedicated test management | Mid-large teams |
| **qTest** | Enterprise pricing | Full-featured, CI/CD integration | Enterprise |
| **Azure Test Plans** | Included in Azure DevOps | Microsoft ecosystem | .NET/Azure teams |
| **Xray** | Từ $10/mo | Jira plugin, BDD support | Agile teams on Jira |
| **Google Sheet** | Free | Đơn giản, linh hoạt | Team nhỏ (< 5 QA) |

---

## Jira cho QA

### Jira là gì?

Jira là **project management tool phổ biến nhất** trong Agile teams. QA dùng Jira để:
- Track User Stories và Acceptance Criteria
- Tạo và manage Bug reports
- Track test execution (với plugin)
- Monitor sprint progress

### QA Workflow trong Jira

```
Product Backlog (PO tạo User Stories)
    │
    ▼
Sprint Planning (QA review stories, estimate test effort)
    │
    ▼
Sprint Board:
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ To Do    │ In Dev   │ In QA    │ Done     │ Blocked  │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│ Story #5 │ Story #3 │ Story #1 │ Story #0 │ Story #4 │
│ Story #6 │          │ Story #2 │          │(env down)│
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

### Jira Issue Types cho QA

| Type | Khi dùng | Ví dụ |
|---|---|---|
| **Story** | Feature request (PO tạo) | "User can login with Google" |
| **Bug** | Defect found (QA tạo) | "Login returns 500 error" |
| **Task** | Công việc cần làm | "Write test cases for Login" |
| **Sub-task** | Chia nhỏ task/story | "Test login positive cases" |
| **Epic** | Nhóm stories lớn | "Authentication Module" |

### Jira Query Language (JQL) cho QA

```sql
-- Bugs tôi report, chưa close
reporter = currentUser() AND type = Bug AND status != Closed

-- Stories trong sprint hiện tại, đang chờ QA
type = Story AND sprint in openSprints() AND status = "In QA"

-- Bugs severity Critical chưa fix
type = Bug AND "Severity" = Critical AND status not in (Closed, Resolved)

-- Tất cả bugs của project ECOM trong tháng 4
project = ECOM AND type = Bug AND created >= "2026-04-01"

-- Bugs tôi cần retest
type = Bug AND status = "Ready for Retest" AND reporter = currentUser()
```

---

## TestRail

### TestRail là gì?

TestRail là **dedicated test management tool** — chuyên cho việc quản lý test cases, test runs, và test reports.

### Cấu trúc TestRail

```
TestRail
├── Projects
│   └── E-Commerce App
│       ├── Test Suites
│       │   ├── Authentication
│       │   │   ├── TC_001: Login with valid credentials
│       │   │   ├── TC_002: Login with invalid email
│       │   │   └── ...
│       │   ├── Products
│       │   └── Checkout
│       ├── Test Runs
│       │   ├── Sprint 15 - Full Regression
│       │   ├── Sprint 15 - Smoke Test
│       │   └── Sprint 15 - New Features
│       └── Test Plans
│           └── Release 2.0 Test Plan
```

### Workflow

```
1. Write Test Cases (1 lần)
   └── Organize vào Test Suites

2. Create Test Run (mỗi sprint/release)
   └── Chọn test cases cần chạy
   └── Assign cho QA members

3. Execute Tests
   └── Mark Pass/Fail + add comments
   └── Link bugs (Jira integration)

4. Generate Reports
   └── Pass rate, coverage, defect summary
```

### TestRail Integration với Jira

```
TestRail Test Case ←→ Jira User Story (traceability)
TestRail Test Result → Jira Bug (khi fail → auto create bug)
TestRail Dashboard  → Jira Sprint Board (sync status)
```

---

## Google Sheet — Giải pháp đơn giản

Khi không có budget cho tool, Google Sheet vẫn dùng được:

### Template Test Case

```
| ID | Module | Title | Priority | Precondition | Steps | Expected | Status | Tester | Date |
|----|--------|-------|----------|--------------|-------|----------|--------|--------|------|
| TC_001 | Login | Valid login | High | User exists | 1. Go to /login... | Dashboard | Pass | An | 26/04 |
| TC_002 | Login | Empty email | High | On login page | 1. Leave empty... | Error msg | Fail | An | 26/04 |
```

### Template Test Report

```
Sprint 15 Test Report

Summary:
- Total test cases: 150
- Executed: 148 (98.7%)
- Passed: 140 (94.6%)
- Failed: 8 (5.4%)
- Blocked: 2
- Not run: 0

Bugs Found: 12
- Critical: 1
- Major: 4
- Minor: 5
- Trivial: 2

Recommendation: Go/No-Go
- ❌ No-Go: 1 Critical bug chưa fix (BUG-123: Payment crash)
- Sau khi fix BUG-123 → Re-evaluate
```

### Ưu/Nhược điểm Google Sheet

| Ưu điểm | Nhược điểm |
|---|---|
| Miễn phí | Không có automation integration |
| Dễ dùng, ai cũng biết | Không có traceability tự động |
| Linh hoạt format | Khó scale (100+ test cases) |
| Real-time collaboration | Không có built-in reporting |

---

## Chọn tool nào?

| Tình huống | Recommendation |
|---|---|
| Team nhỏ (1-3 QA), budget hạn chế | **Google Sheet** + Jira |
| Team dùng Jira, muốn test management | **Zephyr** hoặc **Xray** (Jira plugin) |
| Team trung bình (5-10 QA) | **TestRail** |
| Enterprise, cần compliance | **qTest** hoặc **Azure Test Plans** |
| Startup, move fast | **Google Sheet** → migrate sau khi scale |

::: tip Thực tế
Đừng over-engineer. **Google Sheet + Jira** đủ tốt cho 80% teams. Chỉ invest vào dedicated tool khi team **> 5 QA** hoặc có **compliance requirements** (ISO, SOC2).
:::

---

## Tóm tắt chương

| Tool | Best for | Cost |
|---|---|---|
| **Google Sheet** | Small teams, quick start | Free |
| **Jira + Zephyr/Xray** | Teams on Jira ecosystem | $10-30/mo |
| **TestRail** | Dedicated test management | $36+/mo |
| **qTest** | Enterprise | Custom |
| **Azure Test Plans** | Microsoft ecosystem | Included |
