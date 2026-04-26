# Exploratory Testing

## Exploratory Testing là gì? (WHAT)

Exploratory Testing là phương pháp mà việc **học, thiết kế, và thực thi test diễn ra đồng thời**. Tester dựa vào kinh nghiệm, trực giác và tư duy phân tích để khám phá hệ thống — thay vì follow script có sẵn.

> Scripted Testing: "Làm theo hướng dẫn"
> Exploratory Testing: "Khám phá như thám tử"

### Tại sao cần Exploratory Testing? (WHY)

| Scripted Testing thiếu | Exploratory Testing bổ sung |
|---|---|
| Chỉ test scenarios đã nghĩ ra | Tìm bugs **ngoài dự kiến** |
| Follow exact steps | **Sáng tạo**, thử nhiều cách |
| Dễ bỏ sót edge cases | Chuyên tìm **edge cases** |
| Không adapt realtime | **React** theo behavior hệ thống |

**Thống kê:** ~35% bugs nghiêm trọng được tìm qua Exploratory Testing, không phải scripted testing.

---

## Session-Based Test Management (SBTM)

Exploratory Testing **không phải test bừa**. SBTM giúp có cấu trúc và đo lường được.

### Charter — Nhiệm vụ cho session

Format: **Explore [target] with [resources] to discover [information]**

```
Ví dụ charters:

"Explore the checkout flow
 with different payment methods
 to discover payment processing bugs"

"Explore the search feature
 with special characters and long queries
 to discover input handling issues"

"Explore the mobile responsive layout
 with iPhone SE and iPad screens
 to discover UI/UX issues"

"Explore the user registration
 with boundary values and invalid data
 to discover validation gaps"
```

### Session Structure

```
Session: 60-90 phút (time-boxed)

┌─────────────────────────────────────────┐
│  Phase 1: Setup (5 phút)               │
│  - Đọc charter                          │
│  - Chuẩn bị environment, test accounts  │
├─────────────────────────────────────────┤
│  Phase 2: Explore (45-70 phút)         │
│  - Test theo charter                    │
│  - Ghi notes liên tục                   │
│  - Log bugs ngay khi phát hiện         │
│  - Follow "interesting" paths          │
├─────────────────────────────────────────┤
│  Phase 3: Debrief (10-15 phút)        │
│  - Tổng kết findings                    │
│  - Ghi session report                   │
│  - Identify follow-up sessions needed  │
└─────────────────────────────────────────┘
```

### Session Report Template

```markdown
## Session Report

**Charter:** Explore checkout with expired/invalid payment cards
**Tester:** Nguyen Van An
**Date:** 2026-04-26
**Duration:** 75 minutes
**Environment:** staging.example.com, Chrome 125

### Areas Covered
- Credit card validation (expired, invalid number, wrong CVV)
- Debit card flow
- Error messages for payment failures
- Order state after failed payment

### Bugs Found
1. BUG-001: Expired card returns 500 error (Critical)
2. BUG-002: Invalid CVV shows generic "Payment failed" without detail (Minor)
3. BUG-003: After failed payment, clicking Back loses cart items (Major)

### Observations (not bugs, but notable)
- Payment processing takes 5-8 seconds (slow?)
- No loading indicator during payment processing
- Success page doesn't show payment method used

### Questions for Team
- What's the expected behavior for declined cards?
- Should we support Apple Pay / Google Pay?
- Is there a retry limit for failed payments?

### Follow-up Sessions Needed
- Explore refund flow after successful payment
- Explore concurrent checkout from 2 devices
```

---

## Heuristics — Công cụ tư duy

Heuristics là **"bộ lọc tư duy"** giúp tester biết **nên tìm ở đâu** và **tìm gì**.

### SFDPOT — San Francisco Depot

Mnemonic cho 6 khía cạnh cần kiểm tra:

| Letter | Aspect | Câu hỏi | Ví dụ test |
|---|---|---|---|
| **S** | Structure | Cấu trúc code/UI có đúng? | Links có hoạt động? Images có load? |
| **F** | Function | Chức năng có đúng? | Login, search, checkout hoạt động? |
| **D** | Data | Data có đúng? Edge cases? | Empty, null, max length, special chars |
| **P** | Platform | Hoạt động trên mọi platform? | Browsers, OS, devices, screen sizes |
| **O** | Operations | Vận hành thế nào? | Performance, backup, logging, errors |
| **T** | Time | Thời gian ảnh hưởng? | Timeout, timezone, concurrency, cache |

**Dùng SFDPOT cho Explore session:**
```
Charter: Explore login feature using SFDPOT heuristic

S - Structure: Login page HTML đúng? Tab order? Accessibility?
F - Function: Login, logout, remember me, forgot password?
D - Data: Empty fields, long email, special chars, SQL injection?
P - Platform: Chrome, Firefox, Safari, Mobile, Tablet?
O - Operations: Login logs? Failed attempt tracking? Performance?
T - Time: Session timeout? Token expiry? Concurrent login?
```

### RCRCRC — Recent, Core, Risky, Configuration, Repaired, Chronic

Heuristic cho **chọn areas cần test**:

| Letter | Focus | Tại sao |
|---|---|---|
| **R**ecent | Code/features vừa thay đổi | Code mới = bugs mới |
| **C**ore | Business flows quan trọng nhất | Lỗi ở đây = mất revenue |
| **R**isky | Phần phức tạp, nhiều integration | Phức tạp = dễ lỗi |
| **C**onfiguration | Settings, permissions, environments | Config sai = behavior sai |
| **R**epaired | Bugs vừa fix | Fix bug A có thể tạo bug B |
| **C**hronic | Phần hay lỗi (lịch sử) | Pattern lặp lại |

### Touring Heuristics — "Đi tour" qua hệ thống

| Tour | Mô tả | Mục đích |
|---|---|---|
| **Feature Tour** | Đi qua TẤT CẢ features | Smoke test toàn bộ |
| **Complexity Tour** | Tập trung phần phức tạp nhất | Tìm logic bugs |
| **Claims Tour** | Verify mọi text/claim trên UI | Tìm inconsistency |
| **Landmark Tour** | Navigate qua main pages | Tìm broken links, navigation |
| **Money Tour** | Follow flow tạo revenue | Đảm bảo business flow |
| **Antisocial Tour** | Cố tình dùng sai cách | Tìm error handling issues |
| **Garbage Tour** | Nhập data rác vào mọi field | Tìm validation gaps |

**Ví dụ Antisocial Tour cho Login:**
- Paste JavaScript vào email field
- Nhập emoji 🎉 vào password
- Click Login 100 lần liên tục
- Mở 10 tabs login cùng lúc
- Login → back → forward → refresh

---

## Exploratory Testing trong Agile Sprint

### Khi nào Explore?

```
Sprint Timeline:
Day 1-2:  Scripted test case execution
Day 3-4:  Bug fixes + retest
Day 5:    ★ Exploratory Testing session (1-2 sessions) ★
Day 6:    Regression
```

### Kết hợp Scripted + Exploratory

```
Test Strategy cho feature mới:

1. Scripted Testing (70% effort)
   - Cover acceptance criteria
   - Positive + Negative từ test design techniques
   - Regression tests

2. Exploratory Testing (30% effort)
   - 1-2 sessions × 60-90 phút
   - Focus: edge cases, integration points, error handling
   - Dùng SFDPOT hoặc Tours

→ Scripted đảm bảo COVERAGE
→ Exploratory tìm UNEXPECTED bugs
```

---

## Kỹ năng cần cho Exploratory Testing

### 1. Observation — Quan sát

Chú ý mọi thứ "khác thường":
- Response time đột nhiên chậm
- Flickering UI khi load
- Console errors (F12)
- Data hiển thị không consistent

### 2. Questioning — Đặt câu hỏi

```
"What if...?"
- What if tôi nhập 10,000 ký tự?
- What if tôi submit form 2 lần?
- What if tôi đổi URL parameter?
- What if tôi mở 2 browsers cùng account?
```

### 3. Note-taking — Ghi chép

Ghi chép **liên tục** trong session:
- Steps đã thực hiện
- Observations
- Bugs tìm được
- Ideas cho test tiếp

**Tool:** Notepad, OneNote, hoặc ghi trực tiếp vào Jira/TestRail.

### 4. Time Management

- Đặt timer 60-90 phút
- Không bị "rabbit hole" — nếu 1 area tốn quá 20 phút, note lại, chuyển area khác
- Debrief ngay sau session (không để qua ngày)

---

## Tóm tắt chương

| Concept | Điểm cốt lõi |
|---|---|
| **Exploratory Testing** | Đồng thời learn + design + execute |
| **SBTM** | Charter + Time-box + Session Report |
| **SFDPOT** | 6 khía cạnh: Structure, Function, Data, Platform, Operations, Time |
| **RCRCRC** | 6 focus areas: Recent, Core, Risky, Config, Repaired, Chronic |
| **Tours** | Feature, Complexity, Claims, Antisocial, Garbage |
| **Ratio** | 70% Scripted + 30% Exploratory = Best coverage |

::: tip Nhớ
Exploratory Testing **không thay thế** Scripted Testing. Kết hợp cả hai sẽ cho kết quả tốt nhất. Scripted = safety net, Exploratory = discovery.
:::
