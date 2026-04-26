# Testing Concepts

## Software Testing là gì?

**Software Testing** là quá trình **đánh giá và xác minh** rằng một sản phẩm phần mềm hoạt động đúng như mong đợi. Nhưng đó chỉ là định nghĩa ngắn gọn. Bản chất sâu xa hơn:

> Testing là quá trình **đặt câu hỏi** về sản phẩm, **tìm kiếm thông tin** về chất lượng, và **cung cấp feedback** để team ra quyết định đúng đắn.

### Tại sao Testing quan trọng? (WHY)

**Chi phí sửa bug tăng theo thời gian:**

```
Giai đoạn phát hiện bug    │  Chi phí sửa (tương đối)
───────────────────────────┼──────────────────────────
Requirements               │  $1
Design                     │  $5
Coding                     │  $10
Testing                    │  $50
Production                 │  $500 - $10,000+
```

**Ví dụ thực tế:**
- **2012 - Knight Capital:** Một lỗi phần mềm khiến công ty mất **$440 triệu** trong 45 phút
- **2015 - Volkswagen:** Phần mềm gian lận khí thải, phạt **$30 tỷ**
- **Hàng ngày:** App crash mất user, e-commerce tính sai giá mất doanh thu

::: tip Ghi nhớ
Testing không phải để "tìm bug" đơn thuần. Testing là để **giảm rủi ro**, **cung cấp thông tin**, và **xây dựng niềm tin** vào chất lượng sản phẩm.
:::

---

## QA vs QC vs Testing

Đây là 3 khái niệm thường bị nhầm lẫn. Hiểu đúng bản chất sẽ giúp bạn định vị vai trò của mình trong team.

### Phân biệt

| | QA (Quality Assurance) | QC (Quality Control) | Testing |
|---|---|---|---|
| **Bản chất** | Phòng ngừa lỗi | Phát hiện lỗi | Thực thi kiểm tra |
| **Focus** | Process (quy trình) | Product (sản phẩm) | Verification cụ thể |
| **Khi nào** | Xuyên suốt dự án | Sau khi có sản phẩm | Trong phase test |
| **Ai làm** | Cả team | QC team | Tester |
| **Ví dụ** | Định nghĩa coding standards, review process | Inspect sản phẩm, review code | Execute test cases |

### Mối quan hệ

```
┌─────────────────────────────────────────────────────────┐
│  QA (Quality Assurance) - Đảm bảo chất lượng QUY TRÌNH │
│  ┌───────────────────────────────────────────────────┐  │
│  │  QC (Quality Control) - Kiểm soát chất lượng SẢN PHẨM │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  Testing - Thực thi kiểm tra cụ thể         │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Trong thực tế:** Ở các công ty Việt Nam, title "QA" và "QC" thường dùng thay thế nhau. Đa số vị trí tuyển dụng "QA Engineer" thực chất bao gồm cả QC và Testing. Điều quan trọng là hiểu bản chất công việc, không phải title.

---

## 7 Nguyên tắc kiểm thử (ISTQB)

ISTQB (International Software Testing Qualifications Board) đưa ra 7 nguyên tắc nền tảng. Đây không chỉ là lý thuyết thi chứng chỉ — mà là **tư duy** bạn cần áp dụng hàng ngày.

### 1. Testing shows the presence of defects, not their absence

**Bản chất:** Testing chỉ có thể chứng minh phần mềm **có lỗi**, không thể chứng minh phần mềm **không có lỗi**.

**Ví dụ thực tế:** Bạn test Login thành công với 100 bộ data khác nhau. Điều đó chỉ chứng minh Login hoạt động đúng với 100 bộ data đó — không có nghĩa Login không bao giờ lỗi.

**Áp dụng:** Đừng bao giờ nói "hệ thống không có bug". Hãy nói "không phát hiện bug nào trong phạm vi đã test".

### 2. Exhaustive testing is impossible

**Bản chất:** Không thể test tất cả tổ hợp đầu vào, đường đi, và điều kiện.

**Ví dụ thực tế:** Một form có 5 fields, mỗi field có 10 giá trị test → 10^5 = **100,000 tổ hợp**. Thêm 3 browsers × 2 OS = **600,000 tổ hợp**. Không đủ thời gian test hết.

**Áp dụng:** Sử dụng **risk-based testing** — ưu tiên test phần quan trọng nhất, rủi ro cao nhất. Đây là lý do cần biết Test Design Techniques.

### 3. Early testing saves time and money

**Bản chất:** Bug phát hiện càng sớm, chi phí sửa càng thấp.

**Ví dụ thực tế:**
- Phát hiện requirement mâu thuẫn ở phase analysis → sửa requirement (15 phút)
- Phát hiện sau khi code xong → developer phải code lại (2 ngày)
- Phát hiện ở production → hotfix + rollback + customer impact (1 tuần + mất uy tín)

**Áp dụng:** QA nên tham gia từ giai đoạn **Requirement Review** — đọc spec, đặt câu hỏi, phát hiện gaps. Đây gọi là **Shift-left Testing**.

### 4. Defects cluster together

**Bản chất:** Phần lớn bug tập trung ở một số ít module. Tuân theo **Pareto Principle (80/20)**: 80% bug nằm trong 20% module.

**Ví dụ thực tế:** Trong một dự án e-commerce, module **Payment** và **Cart** thường có nhiều bug hơn module **About Us** hay **FAQ**. Vì chúng phức tạp hơn, có nhiều logic hơn.

**Áp dụng:** Sau vài sprint, phân tích bug report → xác định module nào nhiều bug nhất → tập trung test sâu hơn vào đó.

### 5. Pesticide paradox

**Bản chất:** Chạy đi chạy lại cùng một bộ test case sẽ không tìm được bug mới. Giống thuốc trừ sâu dùng nhiều lần, sâu bọ sẽ kháng thuốc.

**Ví dụ thực tế:** Regression test suite chạy 50 lần đều pass. Nhưng user vẫn report bug mới → vì test case chỉ cover những scenario đã biết.

**Áp dụng:**
- Thường xuyên **review và cập nhật** test case
- Bổ sung test case từ **bug đã phát hiện**
- Kết hợp **Exploratory Testing** để tìm bug mới

### 6. Testing is context dependent

**Bản chất:** Không có cách test nào đúng cho mọi dự án. **Context** quyết định approach.

**Ví dụ thực tế:**

| Context | Approach |
|---|---|
| App ngân hàng | Security testing rất kỹ, compliance check, audit trail |
| Game mobile | Performance testing, UX testing, device compatibility |
| Startup MVP | Smoke testing nhanh, focus happy path, ship fast |
| Hệ thống y tế | Exhaustive testing, regulation compliance, zero tolerance for defects |

**Áp dụng:** Luôn hỏi "Context dự án này là gì?" trước khi đề xuất test strategy.

### 7. Absence-of-errors is a fallacy

**Bản chất:** Phần mềm không có bug nhưng không đáp ứng nhu cầu user thì vẫn **thất bại**.

**Ví dụ thực tế:** Bạn test app và confirm không có bug nào. Nhưng user phàn nàn: "App chậm quá", "UI khó dùng", "Không có feature tôi cần". → Sản phẩm vẫn fail.

**Áp dụng:** Testing không chỉ kiểm tra "đúng/sai" mà còn phải đánh giá **usability**, **performance**, và **business value**.

---

## Verification vs Validation

Hai khái niệm này trả lời hai câu hỏi hoàn toàn khác nhau:

| | Verification | Validation |
|---|---|---|
| **Câu hỏi** | "Are we building the product **right**?" | "Are we building the **right** product?" |
| **Mục đích** | Sản phẩm có đúng spec không? | Sản phẩm có đúng nhu cầu user không? |
| **Phương pháp** | Review, Inspection, Walkthrough, Static Analysis | Testing, UAT, Demo, Beta Testing |
| **Khi nào** | Mọi giai đoạn (không cần chạy code) | Khi có sản phẩm chạy được |
| **Ví dụ** | Review code xem có follow coding standards không | User dùng thử và confirm đây là cái họ cần |

### Ví dụ thực tế

Bạn xây một ngôi nhà:
- **Verification:** Kiểm tra bản vẽ có đúng kỹ thuật không? Tường có đúng kích thước? Điện nước có đúng tiêu chuẩn? → Đúng spec
- **Validation:** Người ở có thấy thoải mái không? Phòng bếp có tiện không? Có muốn sửa gì không? → Đúng nhu cầu

**Trong thực tế dự án:**
- Dev push code → **Code Review** (Verification) → Merge
- Build deploy staging → **QA Testing** (cả Verification lẫn Validation)
- Demo cho client → **UAT** (Validation)

---

## Error, Defect, Failure

Ba khái niệm này mô tả **chuỗi nhân quả** của lỗi phần mềm:

```
  👤 Con người           📄 Sản phẩm          💻 Hệ thống
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    ERROR     │ ──►│   DEFECT     │ ──►│   FAILURE    │
│  (Mistake)   │    │   (Bug)      │    │  (Sự cố)     │
└──────────────┘    └──────────────┘    └──────────────┘
  Developer sai       Code bị sai         App crash/
  logic khi code      hoặc thiếu          hiển thị sai
```

### Định nghĩa chi tiết

| | Error | Defect | Failure |
|---|---|---|---|
| **Là gì** | Sai lầm của con người | Kết quả của error trong code/doc | Hệ thống hoạt động không đúng |
| **Ở đâu** | Trong đầu developer | Trong source code, document | Khi chạy phần mềm |
| **Ai tạo ra** | Con người (dev, BA, designer) | Tồn tại trong artifact | Biểu hiện ra bên ngoài |
| **Ví dụ** | Dev hiểu sai requirement: "giảm 10%" thành "trừ 10 đồng" | Code: `price = price - 10` thay vì `price = price * 0.9` | User mua hàng 1 triệu, giảm giá chỉ hiện 999,990đ thay vì 900,000đ |

### Quan trọng: Không phải mọi chuỗi đều hoàn chỉnh

```
Error  →  Defect  →  Failure     ✅ Chuỗi hoàn chỉnh
Error  →  Defect  ✗  (no Failure) ✅ Defect ở code path ít dùng, chưa ai trigger
Error  ✗  (no Defect)             ✅ Dev code sai → nhận ra ngay → sửa trước commit
Defect  →  Failure                ✅ Defect do environment, không phải do error
```

**Ví dụ "Defect without Failure":** Có bug trong code xử lý đơn hàng > 100 triệu. Nhưng shop chỉ bán đồ giá vài trăm nghìn → bug tồn tại nhưng chưa bao giờ trigger → chưa có failure.

---

## Tư duy của một Tester

Ngoài kiến thức kỹ thuật, mindset là thứ phân biệt tester giỏi với tester bình thường:

### 1. Đặt câu hỏi "What if...?"
- What if user nhập emoji vào ô tên? 🤔
- What if mạng đứt giữa chừng khi thanh toán?
- What if 1000 user đăng nhập cùng lúc?

### 2. Nghĩ như User, phá như Hacker
- **User perspective:** Flow có dễ hiểu không? Có bị confuse ở đâu không?
- **Hacker perspective:** Có thể bypass validation không? Có thể xem data của người khác không?

### 3. Evidence-based
- Mọi claim đều cần **bằng chứng**: screenshot, video, log
- "Tôi nghĩ có bug" → ❌
- "Khi thực hiện step 1-2-3, actual result là X, expected là Y. Đây là screenshot" → ✅

### 4. Không assume
- Requirement không rõ → **hỏi**, đừng tự suy đoán
- "Feature này chắc hoạt động giống version cũ" → **verify**, đừng assume

::: warning Sai lầm phổ biến của Tester mới
- Chỉ test happy path (đường đi chính xác)
- Không test edge cases (giá trị biên, ký tự đặc biệt, empty field)
- Test xong không report, hoặc report thiếu thông tin
- Assume requirement thay vì hỏi lại
:::

---

## Tóm tắt chương

| Concept | Điểm cốt lõi |
|---|---|
| **Software Testing** | Giảm rủi ro, cung cấp thông tin, xây dựng niềm tin |
| **QA vs QC vs Testing** | QA = process, QC = product, Testing = execution |
| **7 Principles** | Tư duy nền tảng, áp dụng hàng ngày |
| **V&V** | Verification = đúng spec, Validation = đúng nhu cầu |
| **Error → Defect → Failure** | Chuỗi nhân quả, không phải lúc nào cũng đầy đủ |
| **Tester Mindset** | What if, Think like user/hacker, Evidence-based |
