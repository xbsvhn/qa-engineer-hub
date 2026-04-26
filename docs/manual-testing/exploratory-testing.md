# Exploratory Testing

## Exploratory Testing giống như Thám tử Điều tra Hiện trường

Hãy tưởng tượng hai cách kiểm tra một ngôi nhà:

**Cách 1 -- Scripted Testing (Theo checklist có sẵn):**
Bạn cầm danh sách: "Kiểm tra cửa trước, kiểm tra cửa sổ, kiểm tra khóa." Bạn đi theo đúng danh sách, đánh dấu từng mục. Xong danh sách = xong việc. Nhưng nếu có vết nứt trên tường mà **không có trong danh sách**? Bạn bỏ qua.

**Cách 2 -- Exploratory Testing (Thám tử điều tra):**
Bạn bước vào nhà, quan sát tổng thể, rồi **đi theo trực giác**: "Hmm, vết nước trên trần... chắc dột. Để kiểm tra đường ống phía trên." Bạn **vừa khám phá, vừa suy luận, vừa test** -- đồng thời, không theo script.

| Scripted Testing | Exploratory Testing |
|---|---|
| Theo danh sách có sẵn | Khám phá theo trực giác + kinh nghiệm |
| Chỉ tìm bug đã "dự đoán" | Tìm bug **ngoài dự kiến** |
| Follow exact steps | Sáng tạo, thử nhiều cách |
| Bỏ sót edge cases | Chuyên tìm edge cases |
| Không thay đổi khi chạy | React theo behavior hệ thống |

:::tip Aha moment
Exploratory Testing **không phải "test bừa"**. Nó giống thám tử giỏi: có mục tiêu (charter), có thời gian (time-box), có ghi chép (session notes), và có báo cáo (debrief). Chỉ là **phương pháp khám phá** khác với follow script.
:::

**Thống kê thực tế:** Khoảng **35% bugs nghiêm trọng** được tìm qua Exploratory Testing -- những bug mà scripted testing bỏ sót vì không ai nghĩ tới.

---

## Session-Based Test Management (SBTM) -- Thám tử cũng cần kế hoạch

SBTM là framework giúp Exploratory Testing có **cấu trúc và đo lường được**. Không phải "mở app lên click bừa" mà là "có nhiệm vụ, có thời gian, có báo cáo."

### Charter -- "Lệnh điều tra"

Charter (nhiệm vụ) nói cho thám tử biết: **điều tra cái gì, bằng cách nào, để tìm gì**.

Format: **Explore [target] with [resources] to discover [information]**

```
# Ví dụ các charters -- mỗi charter là 1 "lệnh điều tra"

"Explore the checkout flow                    # Điều tra cái gì
 with different payment methods               # Bằng cách nào
 to discover payment processing bugs"         # Để tìm gì

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

### Session Structure -- "Quy trình điều tra"

Mỗi session kéo dài **60-90 phút** (time-boxed -- đặt đồng hồ, hết giờ là dừng).

```
# Phase 1: Setup (5 phút) -- Chuẩn bị trước khi "vào hiện trường"
- Đọc charter (hiểu nhiệm vụ)
- Chuẩn bị environment, test accounts
- Mở tools cần thiết (browser DevTools, note app)

# Phase 2: Explore (45-70 phút) -- "Điều tra hiện trường"
- Test theo charter nhưng KHÔNG theo script cứng
- Ghi notes liên tục (đừng dựa vào trí nhớ)
- Log bugs ngay khi phát hiện (đừng để "lát ghi")
- Follow "interesting" paths -- nếu thấy gì lạ, đào sâu

# Phase 3: Debrief (10-15 phút) -- "Báo cáo kết quả"
- Tổng kết findings (tìm được gì?)
- Viết session report
- Ghi lại: cần sessions tiếp theo cho areas nào?
```

### Session Report Template -- "Biên bản điều tra"

```markdown
## Session Report

**Charter:** Explore checkout with expired/invalid payment cards
**Tester:** Nguyen Van An
**Date:** 2026-04-26
**Duration:** 75 minutes
**Environment:** staging.example.com, Chrome 125

### Areas Covered (Đã điều tra những đâu)
- Credit card validation (expired, invalid number, wrong CVV)
- Debit card flow
- Error messages for payment failures
- Order state after failed payment

### Bugs Found (Bằng chứng tìm được)
1. BUG-001: Expired card returns 500 error (Critical)
2. BUG-002: Invalid CVV shows generic "Payment failed" (Minor)
3. BUG-003: After failed payment, Back button loses cart items (Major)

### Observations (Ghi nhận -- chưa phải bug, nhưng đáng chú ý)
- Payment processing mất 5-8 giây (có chậm không?)
- Không có loading indicator khi đang xử lý payment
- Trang Success không hiện payment method đã dùng

### Questions for Team (Câu hỏi cần team trả lời)
- Expected behavior khi card bị decline là gì?
- Có plan hỗ trợ Apple Pay / Google Pay không?
- Có giới hạn retry cho failed payments không?

### Follow-up Sessions Needed (Cần điều tra thêm)
- Explore refund flow sau khi payment thành công
- Explore concurrent checkout từ 2 devices cùng lúc
```

---

## Heuristics -- "Bộ công cụ tư duy" của Thám tử

Heuristic (phương pháp suy luận) giống như **kinh nghiệm nghề** của thám tử: "Khi điều tra vụ trộm, luôn kiểm tra cửa sổ, kiểm tra camera, hỏi hàng xóm." Nó giúp bạn biết **tìm ở đâu** và **tìm gì** khi explore.

### SFDPOT -- "San Francisco Depot" (6 góc nhìn)

SFDPOT là mnemonic (cách nhớ) cho 6 khía cạnh cần kiểm tra bất kỳ feature nào:

| Letter | Aspect | Câu hỏi thám tử đặt ra | Ví dụ test cho Login |
|---|---|---|---|
| **S** | Structure | "Cấu trúc có đúng không?" | Links hoạt động? Images load? Tab order đúng? |
| **F** | Function | "Chức năng có đúng không?" | Login, logout, remember me hoạt động? |
| **D** | Data | "Data có đúng? Edge cases?" | Empty fields, 10000 chars, special chars, SQL injection |
| **P** | Platform | "Chạy trên mọi nền tảng?" | Chrome, Firefox, Safari, Mobile, Tablet |
| **O** | Operations | "Vận hành có ổn không?" | Performance, logging, error handling |
| **T** | Time | "Thời gian ảnh hưởng?" | Session timeout, token expiry, concurrent login |

```
# Dùng SFDPOT cho 1 session explore Login feature

S - Structure: HTML chuẩn không? Tab order đúng không? Accessibility OK?
F - Function:  Login, logout, remember me, forgot password hoạt động?
D - Data:      Empty fields, email dài 500 ký tự, special chars, SQL injection?
P - Platform:  Chrome, Firefox, Safari, Mobile Chrome, iPad?
O - Operations: Login có ghi log không? Failed attempt có tracking? Response time?
T - Time:      Session timeout bao lâu? Token hết hạn xử lý sao? 2 tab cùng login?
```

:::tip Aha moment
SFDPOT giúp bạn **không bỏ sót góc nhìn**. Nhiều QA chỉ test Function (chức năng) mà quên Data (edge cases), Time (timeout), Platform (mobile). Dùng SFDPOT như checklist tư duy -- đảm bảo bạn nhìn từ đủ 6 góc.
:::

### RCRCRC -- "Nên explore ở đâu trước?"

Khi cả hệ thống rộng mênh mông, RCRCRC giúp bạn chọn **areas nào explore trước**:

| Letter | Focus | Tại sao cần explore area này? | Ví dụ |
|---|---|---|---|
| **R**ecent | Code/feature vừa thay đổi | Code mới = bugs mới chưa ai test | Sprint này mới redesign Login |
| **C**ore | Business flow quan trọng nhất | Lỗi ở đây = mất tiền, mất user | Checkout, Payment |
| **R**isky | Phần phức tạp, nhiều integration | Phức tạp = nhiều chỗ sai | Third-party payment API |
| **C**onfiguration | Settings, permissions, environments | Config sai = behavior sai toàn bộ | User roles, feature flags |
| **R**epaired | Bugs vừa được fix | Fix bug A có thể tạo bug B | Bug payment vừa fix tuần trước |
| **C**hronic | Phần hay lỗi theo lịch sử | Lịch sử lặp lại, cần canh chừng | Module upload luôn có bugs |

### Touring Heuristics -- "Đi tour" qua hệ thống

Mỗi "tour" là một cách khác nhau để khám phá hệ thống, giống du khách khám phá thành phố theo các chủ đề:

| Tour | Mô tả | Mục đích |
|---|---|---|
| **Feature Tour** | Đi qua TẤT CẢ features, mỗi cái thử 1 lần | Smoke test toàn bộ |
| **Complexity Tour** | Tập trung phần phức tạp nhất, test sâu | Tìm logic bugs ẩn sâu |
| **Claims Tour** | Verify mọi text, label, message trên UI | Tìm inconsistency, typo |
| **Landmark Tour** | Navigate qua các trang chính, click mọi link | Tìm broken links, dead ends |
| **Money Tour** | Follow flow tạo revenue (đặt hàng, thanh toán) | Đảm bảo business flow sống |
| **Antisocial Tour** | Cố tình dùng sai cách, phá hệ thống | Tìm error handling yếu |
| **Garbage Tour** | Nhập data rác vào MỌI field | Tìm validation thiếu |

**Ví dụ Antisocial Tour cho Login** -- "Phá" hệ thống một cách có chủ đích:

```
# Antisocial Tour -- đóng vai user "phá phách"
# Mục đích: xem hệ thống xử lý tình huống bất thường tốt không

- Paste JavaScript (<script>alert('XSS')</script>) vào email field
- Nhập chuỗi siêu dài (10,000 ký tự) vào password field
- Click Login 50 lần liên tục thật nhanh (rate limiting?)
- Mở 10 tabs, login cùng 1 account đồng thời
- Login --> nhấn Back --> nhấn Forward --> Refresh
- Tắt JavaScript trong browser rồi thử login
- Thay đổi URL parameters: /login?redirect=http://evil.com
```

---

## Exploratory Testing trong Agile Sprint

### Khi nào Explore?

```
# Sprint Timeline -- Explore thường ở cuối giai đoạn test

Day 1-2:  Scripted test case execution      (Test theo kế hoạch)
Day 3-4:  Bug fixes + retest                (Dev fix, QA verify)
Day 5:    Exploratory Testing sessions       (Thám tử ra hiện trường)
Day 6:    Regression test                    (Chạy lại toàn bộ)
```

### Tỷ lệ vàng: 70% Scripted + 30% Exploratory

```
# Test Strategy cho feature mới:

# 1. Scripted Testing (70% effort)
#    Như "kiểm tra theo danh sách" -- đảm bảo COVERAGE
- Cover tất cả Acceptance Criteria từ User Story
- Positive + Negative cases từ test design techniques
- Regression tests cho features liên quan

# 2. Exploratory Testing (30% effort)
#    Như "thám tử điều tra" -- tìm UNEXPECTED bugs
- 1-2 sessions x 60-90 phút mỗi session
- Focus: edge cases, integration points, error handling
- Dùng SFDPOT hoặc Touring heuristics

# Scripted = Safety net (lưới an toàn, không bỏ sót requirements)
# Exploratory = Discovery (khám phá, tìm bug không ai nghĩ tới)
```

:::tip Aha moment
**Scripted testing tìm bug bạn mong đợi. Exploratory testing tìm bug bạn KHÔNG mong đợi.** Cả hai đều cần. Chỉ scripted = bỏ sót edge cases. Chỉ exploratory = bỏ sót requirements. Kết hợp = best coverage.
:::

---

## 4 Kỹ năng cốt lõi cho Exploratory Testing

### 1. Observation -- Quan sát như thám tử

Chú ý mọi thứ "khác thường" dù nhỏ nhất:
- Response time đột nhiên chậm hơn bình thường
- UI flicker (nhấp nháy) khi load trang
- Console errors (F12) -- ngay cả khi UI trông bình thường
- Data hiển thị không nhất quán giữa các trang

### 2. Questioning -- Hỏi "What if...?"

```
# Câu hỏi "What if" là vũ khí mạnh nhất của Exploratory Tester

"What if tôi nhập 10,000 ký tự vào field name?"
"What if tôi submit form rồi click Submit lần nữa ngay lập tức?"
"What if tôi thay đổi URL parameter từ userId=1 thành userId=999?"
"What if tôi mở 2 browser tabs và login cùng 1 account?"
"What if tôi đang checkout và network bị mất giữa chừng?"
```

### 3. Note-taking -- Ghi chép liên tục

Ghi chép **ngay khi đang explore**, đừng dựa vào trí nhớ:
- Steps đã thực hiện (để có thể reproduce nếu tìm thấy bug)
- Observations (điều lạ nhận thấy)
- Bugs tìm được (ghi ngay, tạo ticket sau)
- Ideas cho test tiếp theo

### 4. Time Management -- Quản lý thời gian

- Đặt timer 60-90 phút -- khi hết giờ, dừng lại debrief
- Tránh "rabbit hole" -- nếu 1 area tốn quá 20 phút mà chưa tìm thấy gì, note lại rồi chuyển area khác
- Debrief **ngay sau session** -- không để qua ngày, sẽ quên chi tiết

---

## Tóm tắt -- Bộ công cụ của Thám tử QA

| Concept | Điểm cốt lõi | Nhớ ngay |
|---|---|---|
| **Exploratory Testing** | Vừa learn + vừa design + vừa execute | Thám tử, không phải robot |
| **SBTM** | Charter + Time-box + Session Report | Có kế hoạch, không phải test bừa |
| **SFDPOT** | Structure, Function, Data, Platform, Operations, Time | 6 góc nhìn, đừng quên góc nào |
| **RCRCRC** | Recent, Core, Risky, Config, Repaired, Chronic | Explore đâu trước? |
| **Tours** | Feature, Complexity, Claims, Antisocial, Garbage... | Mỗi tour 1 góc nhìn khác |
| **Tỷ lệ** | 70% Scripted + 30% Exploratory | Kết hợp = Best coverage |
