# Test Management Tools

## Tại sao cần Tool quản lý Test? -- Từ sổ tay lên hệ thống

Hãy tưởng tượng bạn là bác sĩ:

- **5 bệnh nhân/ngày**: Ghi sổ tay giấy OK, nhớ hết.
- **50 bệnh nhân/ngày**: Sổ tay không đủ. Ai đã khám? Ai chờ tái khám? Kết quả xét nghiệm ở đâu? Bắt đầu hỗn loạn.
- **200 bệnh nhân/ngày**: Cần **hệ thống quản lý bệnh viện** -- lưu hồ sơ, tra cứu nhanh, báo cáo tự động.

Test management cũng vậy:

| Số test cases | Bạn cần | Tương đương Y tế |
|---|---|---|
| < 30 | Google Sheet là đủ | Sổ tay ghi chép |
| 30 - 200 | Jira + plugin (Zephyr/Xray) | Phần mềm phòng khám |
| 200+ | Dedicated tool (TestRail, qTest) | Hệ thống bệnh viện |

:::tip Aha moment
**Đừng over-engineer.** Google Sheet + Jira đủ tốt cho **80% teams**. Chỉ đầu tư dedicated tool khi team **> 5 QA** hoặc có **compliance requirements** (ISO, SOC2). Bệnh viện quận không cần phần mềm của bệnh viện trung ương.
:::

---

## So sánh nhanh các Tool phổ biến

| Tool | Giá | Điểm mạnh | Phù hợp cho |
|---|---|---|---|
| **Google Sheet** | Free | Đơn giản, ai cũng biết dùng, linh hoạt | Team nhỏ (1-3 QA), startup |
| **Jira + Zephyr** | ~$10/mo | Tích hợp trực tiếp trong Jira | Team đã dùng Jira |
| **Jira + Xray** | ~$10/mo | BDD support, CI/CD integration tốt | Agile teams trên Jira |
| **TestRail** | ~$36/mo | Chuyên biệt cho test management, UI rõ ràng | Team 5-15 QA |
| **qTest** | Enterprise | Full-featured, compliance, CI/CD | Enterprise, regulated industries |
| **Azure Test Plans** | Included | Microsoft ecosystem, tích hợp DevOps | Teams dùng Azure/.NET |

---

## Google Sheet -- "Sổ tay" miễn phí nhưng hiệu quả

Khi team nhỏ và budget hạn chế, Google Sheet **vẫn dùng tốt**:

### Template Test Case trong Sheet

```
# Tạo Google Sheet với các cột sau:

| ID | Module | Title | Priority | Precondition | Steps | Expected | Status | Tester | Date |
|----|--------|-------|----------|--------------|-------|----------|--------|--------|------|
| TC_001 | Login | Valid login | High | User exists | 1. Go to... | Dashboard | Pass | An | 26/04 |
| TC_002 | Login | Empty email | High | On login page | 1. Leave... | Error msg | Fail | An | 26/04 |
```

### Template Test Report trong Sheet

```
# Sprint 15 Test Report -- tóm tắt 1 trang

Summary:
- Total test cases: 150
- Executed: 148 (98.7%)
- Passed: 140 (94.6%)
- Failed: 8 (5.4%)
- Blocked: 2

Bugs Found: 12
- Critical: 1
- Major: 4
- Minor: 5
- Trivial: 2

Recommendation:
- No-Go: 1 Critical bug chưa fix (BUG-123: Payment crash)
- Sau khi fix BUG-123 --> Re-evaluate
```

### Ưu và Nhược điểm

| Ưu điểm | Nhược điểm |
|---|---|
| Miễn phí hoàn toàn | Không link test case với requirement tự động |
| Ai cũng biết dùng | Không có built-in metrics/reports |
| Real-time collaboration | Khó scale khi > 100 test cases |
| Linh hoạt format tùy ý | Không integrate với CI/CD |

---

## Jira cho QA -- Tool bạn dùng nhiều nhất

Jira là **project management tool phổ biến nhất** trong Agile teams. Dù không phải test management tool, QA dùng Jira **hàng ngày** để:

- Track User Stories và Acceptance Criteria
- Tạo và quản lý Bug reports
- Monitor sprint progress
- Kết hợp plugin (Zephyr/Xray) cho test execution

### QA Workflow trong Jira Sprint Board

```
# Sprint Board -- QA theo dõi stories qua các cột

| To Do    | In Dev   | In QA    | Done     | Blocked  |
|----------|----------|----------|----------|----------|
| Story #5 | Story #3 | Story #1 | Story #0 | Story #4 |
| Story #6 |          | Story #2 |          |(env down)|

# QA tập trung cột "In QA" -- stories đã dev xong, chờ test
```

### Jira Issue Types QA hay dùng

| Type | Ai tạo | Khi nào | Ví dụ |
|---|---|---|---|
| **Story** | PO | Feature request | "User can login with Google" |
| **Bug** | QA | Phát hiện lỗi | "Login returns 500 error" |
| **Task** | QA/Dev | Công việc cần làm | "Write test cases for Login" |
| **Sub-task** | QA | Chia nhỏ story/task | "Test login positive cases" |
| **Epic** | PO | Nhóm stories lớn | "Authentication Module" |

### JQL -- "Ngôn ngữ tìm kiếm" của Jira

JQL (Jira Query Language) giúp bạn tìm issues cực nhanh. Như Google search nhưng cho Jira:

```sql
-- Bugs tôi report, chưa close
reporter = currentUser() AND type = Bug AND status != Closed

-- Stories đang chờ QA test trong sprint hiện tại
type = Story AND sprint in openSprints() AND status = "In QA"

-- Critical bugs chưa fix -- cần escalate
type = Bug AND "Severity" = Critical AND status not in (Closed, Resolved)

-- Bugs cần retest -- việc hàng ngày của QA
type = Bug AND status = "Ready for Retest" AND reporter = currentUser()

-- Thống kê bugs tháng này
project = ECOM AND type = Bug AND created >= "2026-04-01"
```

---

## TestRail -- Dedicated Test Management

TestRail là tool **chuyên biệt cho test management** -- quản lý test cases, test runs, reports chuyên nghiệp.

### Cấu trúc TestRail

```
# TestRail tổ chức theo cây thư mục

TestRail
  |-- Projects
       |-- E-Commerce App
            |-- Test Suites (nhóm test cases)
            |    |-- Authentication (Login, Register, Forgot Password...)
            |    |-- Products (Search, Filter, Detail page...)
            |    |-- Checkout (Cart, Payment, Order...)
            |
            |-- Test Runs (mỗi sprint tạo 1 run)
            |    |-- Sprint 15 - Full Regression
            |    |-- Sprint 15 - Smoke Test
            |    |-- Sprint 15 - New Features Only
            |
            |-- Reports (tự động generate)
                 |-- Pass rate, coverage, defect summary
```

### TestRail + Jira Integration

```
# TestRail và Jira nói chuyện với nhau:

TestRail Test Case  <-->  Jira User Story    (traceability)
TestRail Fail       --->  Jira Bug           (auto-create bug khi fail)
TestRail Dashboard  <-->  Jira Sprint Board  (sync status)
```

---

## Chọn tool nào? -- Flowchart quyết định

| Câu hỏi | Nếu YES | Nếu NO |
|---|---|---|
| Team < 3 QA và budget hạn chế? | **Google Sheet + Jira** | Xem tiếp |
| Team đã dùng Jira? | **Zephyr hoặc Xray** (plugin) | Xem tiếp |
| Team 5-15 QA, cần reports chuyên nghiệp? | **TestRail** | Xem tiếp |
| Enterprise, cần compliance (ISO/SOC2)? | **qTest hoặc Azure Test Plans** | Quay lại Google Sheet |

:::tip Aha moment
**Tool không quan trọng bằng process.** Một team dùng Google Sheet với process tốt sẽ hiệu quả hơn team dùng TestRail mà không ai cập nhật. Chọn tool phù hợp với team size và budget -- rồi **dùng nó consistently**.
:::

---

## Tóm tắt

| Tool | Best for | Cost | Keyword |
|---|---|---|---|
| **Google Sheet** | Small teams, quick start | Free | Đơn giản, linh hoạt |
| **Jira + Zephyr/Xray** | Teams dùng Jira | $10-30/mo | Tích hợp, Agile-friendly |
| **TestRail** | Mid-size teams, cần reports | $36+/mo | Chuyên biệt, professional |
| **qTest** | Enterprise, compliance | Custom | Full-featured, scalable |
| **Azure Test Plans** | Microsoft ecosystem | Included | DevOps integration |
