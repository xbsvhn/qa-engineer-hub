# Bug Reporting

## Bug Report tốt là gì? (WHAT)

Một bug report tốt giúp developer **hiểu ngay vấn đề** và **reproduce được lỗi** mà không cần hỏi lại. Bug report kém → dev mất thời gian hỏi lại → delay fix → delay release.

### Quy tắc vàng

> Viết bug report như thể **người đọc chưa bao giờ thấy hệ thống**. Đừng assume họ biết context.

---

## Cấu trúc Bug Report chuẩn

| Field | Mô tả | Bắt buộc? |
|---|---|---|
| **Title** | Mô tả ngắn gọn, rõ ràng | ✅ |
| **Severity** | Mức nghiêm trọng kỹ thuật | ✅ |
| **Priority** | Mức ưu tiên business | ✅ |
| **Environment** | Browser, OS, URL, version | ✅ |
| **Steps to Reproduce** | Các bước tái hiện | ✅ |
| **Actual Result** | Kết quả thực tế | ✅ |
| **Expected Result** | Kết quả mong đợi | ✅ |
| **Attachments** | Screenshot, video, log | ✅ |
| **Assignee** | Dev phụ trách | Optional |
| **Linked Story** | User Story liên quan | Optional |

---

## Viết Title hiệu quả

### Format: `[Module] Hành động → Kết quả sai`

```
❌ Xấu:
"Bug ở trang login"
"Lỗi"
"Không hoạt động"

✅ Tốt:
"[Login] Click Login with valid credentials → Error 500 instead of redirect to Dashboard"
"[Cart] Apply coupon 'SALE20' → Discount shows 0% instead of 20%"
"[Checkout] Submit order with empty address → No validation error shown"
"[Search] Search 'iPhone' → Returns 0 results, but products exist in DB"
```

**Nguyên tắc:**
- **Ai đọc title cũng hiểu** bug là gì mà không cần đọc description
- Bao gồm: **Module + Action + Wrong Result**
- Ngắn gọn nhưng đủ thông tin (~80 ký tự)

---

## Severity vs Priority

### Severity — "Lỗi nghiêm trọng cỡ nào?" (QA đánh giá)

| Level | Mô tả | Ví dụ |
|---|---|---|
| **Critical** | Hệ thống crash, mất data, security breach | App crash khi mở, data bị xóa |
| **Major** | Feature chính không hoạt động, không có workaround | Không login được, không checkout được |
| **Minor** | Feature phụ lỗi, có workaround | Filter không hoạt động, nhưng có thể sort thủ công |
| **Trivial** | Cosmetic, typo, UI alignment | Typo "Logn" thay vì "Login", icon lệch 2px |

### Priority — "Cần fix sớm cỡ nào?" (PM/Business đánh giá)

| Level | Mô tả | Timeline |
|---|---|---|
| **P1 - Critical** | Fix ngay lập tức | Hotfix trong ngày |
| **P2 - High** | Fix trong sprint này | Sprint hiện tại |
| **P3 - Medium** | Fix khi có thời gian | Sprint tiếp theo |
| **P4 - Low** | Nice to fix | Backlog |

### Severity ≠ Priority

| Bug | Severity | Priority | Giải thích |
|---|---|---|---|
| App crash trên trang chủ | **Critical** | **P1** | Nghiêm trọng + ảnh hưởng tất cả users |
| App crash trên trang admin settings | **Critical** | **P3** | Nghiêm trọng nhưng rất ít người dùng |
| Logo sai trên trang chủ | **Trivial** | **P1** | Cosmetic nhưng ảnh hưởng branding |
| Typo trong FAQ page | **Trivial** | **P4** | Cosmetic + ít ai thấy |

---

## Ví dụ Bug Report chuẩn

### Bug Report tốt

```
Title: [Checkout] Click "Place Order" with expired credit card → Error 500
       instead of user-friendly error message

Severity: Major
Priority: P2
Environment: Chrome 125, macOS 15.3, staging.example.com (build #1234)

Precondition:
- Logged in as customer (test_user@mail.com / Test@123)
- Cart has at least 1 item

Steps to Reproduce:
1. Navigate to /cart
2. Click "Proceed to Checkout"
3. Fill shipping address (any valid address)
4. Select "Credit Card" payment method
5. Enter card number: 4111 1111 1111 1111
6. Enter expiry: 01/20 (expired)
7. Enter CVV: 123
8. Click "Place Order"

Actual Result:
- Page shows "Internal Server Error 500"
- Console shows: "TypeError: Cannot read property 'valid' of undefined"
- No user-friendly error message

Expected Result:
- Error message: "Your card has expired. Please use a different card."
- User stays on checkout page
- Order is NOT created
- No 500 error

Attachments:
- screenshot_500_error.png
- console_log.txt
- network_response.har

Additional Info:
- Bug reproduces 100% of the time
- Same issue with expiry dates 01/21, 01/22 (all past dates)
- Valid expiry dates (12/28) work correctly
```

### Bug Report kém (đừng viết thế này)

```
❌ Title: "Error on checkout"
Severity: High
Steps: "Click checkout, got error"
Expected: "Should work"
Attachments: (none)
```

Vấn đề: Dev không biết test với data gì, ở đâu, reproduce sao, error cụ thể là gì.

---

## Bug Life Cycle

```
┌─────┐    ┌──────┐    ┌───────────┐    ┌───────┐
│ New │───►│ Open │───►│ In Progress│───►│ Fixed │
└─────┘    └──┬───┘    └───────────┘    └───┬───┘
              │                              │
              │         ┌──────────┐    ┌────▼────┐
              ├────────►│ Rejected │    │ Retest  │
              │         └──────────┘    └────┬────┘
              │                              │
              │         ┌──────────┐    ┌────▼────┐
              ├────────►│ Deferred │    │ Verified│──► Closed ✅
              │         └──────────┘    └────┬────┘
              │                              │
              │         ┌──────────┐    ┌────▼────┐
              └────────►│Duplicate │    │ Reopen  │──► Open (vòng lại)
                        └──────────┘    └─────────┘
```

### Chi tiết từng trạng thái

| Status | Ai chuyển | Ý nghĩa |
|---|---|---|
| **New** | QA tạo bug | Bug vừa được report |
| **Open** | QA Lead/PM review | Bug confirmed, assign cho dev |
| **In Progress** | Dev | Dev đang fix |
| **Fixed** | Dev | Dev đã fix, push code |
| **Retest** | QA | QA verify fix |
| **Verified** | QA | Fix đúng, close bug |
| **Closed** | QA | Bug đã resolved |
| **Reopen** | QA | Fix chưa đúng, cần fix lại |
| **Rejected** | Dev/PM | Not a bug, hoặc by design |
| **Deferred** | PM | Tạm hoãn, fix sau |
| **Duplicate** | QA/Dev | Trùng với bug khác |

---

## Jira Workflow thực tế

### Tạo Bug trong Jira

```
Project: ECOM
Issue Type: Bug
Summary: [Checkout] Expired credit card returns 500 error

Description:
  h3. Environment
  Chrome 125, macOS 15.3, staging.example.com

  h3. Steps to Reproduce
  # Navigate to /cart with items
  # Click "Proceed to Checkout"
  # Fill shipping address
  # Enter expired credit card (4111...1111, exp 01/20)
  # Click "Place Order"

  h3. Actual Result
  Error 500 page displayed

  h3. Expected Result
  User-friendly error: "Card has expired"

  h3. Additional Info
  Reproduces 100%. See attached screenshot.

Priority: High
Severity: Major (custom field)
Labels: checkout, payment, regression
Sprint: Sprint 15
Linked Issues: relates to ECOM-456 (Payment User Story)
Attachments: screenshot.png, console_log.txt
```

### Jira Filters hữu ích cho QA

```
# Bugs tôi report trong sprint này
reporter = currentUser() AND type = Bug AND sprint in openSprints()

# Open bugs assigned cho dev team
type = Bug AND status in (Open, "In Progress") AND assignee in membersOf("Dev Team")

# Bugs cần retest
type = Bug AND status = "Ready for Retest" AND reporter = currentUser()

# Critical bugs chưa fix
type = Bug AND priority in (Critical, Highest) AND status != Closed

# Bugs created trong 7 ngày gần nhất
type = Bug AND created >= -7d ORDER BY created DESC
```

---

## Tips viết Bug Report chuyên nghiệp

### 1. Isolate the bug

Trước khi report, hãy thu hẹp scope:
- Lỗi chỉ xảy ra trên **1 browser** hay tất cả?
- Lỗi chỉ với **data cụ thể** hay mọi data?
- Lỗi mới xuất hiện từ **build nào**?
- Lỗi xảy ra **100% thời gian** hay intermittent?

### 2. Attach evidence

- **Screenshot** — highlight vùng lỗi bằng khung đỏ
- **Video** — quay màn hình (Loom, OBS) cho lỗi phức tạp
- **Console log** — F12 → Console, copy errors
- **Network log** — F12 → Network, screenshot API response
- **HAR file** — F12 → Network → Export HAR (cho API issues)

### 3. Không blame, report facts

```
❌ "Dev code sai, function calculateTotal() bị lỗi"
✅ "Total hiển thị 0đ khi cart có 3 items. Expected: 1,500,000đ"
```

### 4. Suggest root cause (nếu biết)

```
Additional Info:
- Có thể liên quan đến commit abc123 (thay đổi payment validation)
- API /api/payment/validate trả về 500 (see network tab)
- Chỉ xảy ra với cards có expiry date < current date
```

### 5. Ghi reproduction rate

```
Reproduction Rate: 100% (5/5 attempts)
Reproduction Rate: ~30% (intermittent - xảy ra 3/10 lần)
```

---

## Bug Metrics — Theo dõi chất lượng

| Metric | Ý nghĩa | Target |
|---|---|---|
| **Defect Density** | Bugs per module | Identify risky modules |
| **Bug Reopen Rate** | % bugs reopen sau fix | < 10% |
| **Defect Leakage** | Bugs found in prod | Càng ít càng tốt |
| **Avg Fix Time** | Thời gian trung bình fix bug | Theo severity |
| **Bug Rejection Rate** | % bugs bị reject | < 15% (nếu cao → cần improve) |

---

## Tóm tắt chương

| Aspect | Best Practice |
|---|---|
| **Title** | [Module] Action → Wrong Result |
| **Severity** | Critical > Major > Minor > Trivial (QA đánh giá) |
| **Priority** | P1 > P2 > P3 > P4 (PM đánh giá) |
| **Steps** | Cụ thể, đánh số, ai cũng reproduce được |
| **Evidence** | Screenshot, video, console log, network log |
| **Tone** | Report facts, không blame |
| **Lifecycle** | New → Open → Fixed → Retest → Closed |
