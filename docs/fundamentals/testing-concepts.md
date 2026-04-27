# Testing Concepts

## Software Testing là gì — thực sự?

Bạn mua một chiếc xe máy mới. Trước khi chạy ra đường, bạn làm gì? Bạn **kiểm tra**: phanh có ăn không, đèn có sáng không, xăng có đủ không. Bạn làm vậy vì nếu phanh hỏng giữa đường, hậu quả rất nghiêm trọng.

Software Testing cũng vậy — nhưng thay vì kiểm tra xe, bạn kiểm tra **phần mềm**.

**Định nghĩa bản chất:**

> Software Testing là quá trình **đặt câu hỏi** với phần mềm: "Mày có hoạt động đúng không?" — rồi **tìm bằng chứng** để trả lời câu hỏi đó.

Bằng chứng ở đây là: click vào nút Login → có vào Dashboard không? Nhập sai password → có hiện thông báo lỗi không? Chứ không phải "chắc nó đúng rồi".

### Testing KHÔNG phải là "tìm bug"

Nhiều người nghĩ QA = tìm bug. Sai.

Bug chỉ là **sản phẩm phụ** của testing. Mục đích thực sự là **cung cấp thông tin** cho team để họ ra quyết định: "Phần mềm này có đủ tốt để release chưa?"

- Nếu QA nói "95% test pass, 0 critical bugs" → PM quyết định release
- Nếu QA nói "Payment module có 3 critical bugs" → PM quyết định hoãn release

QA là **người cung cấp thông tin**, không phải **người quyết định**.

---

## Tại sao Testing cực kỳ quan trọng?

### Chi phí sửa bug tăng GẤP BỘI theo thời gian

Hãy hình dung thế này:

```
Bạn viết email, phát hiện lỗi chính tả TRƯỚC KHI gửi:
→ Sửa mất 2 giây (backspace + gõ lại)

Bạn phát hiện lỗi SAU KHI gửi cho 500 người:
→ Phải gửi email đính chính, xin lỗi, giải thích → mất uy tín
```

Phần mềm cũng vậy:

| Phát hiện bug ở giai đoạn... | Chi phí sửa (tương đối) | Tại sao? |
|---|---|---|
| Viết requirement | **$1** | Chỉ cần sửa 1 dòng trong tài liệu |
| Đang code | **$10** | Developer sửa code của mình |
| Đang test | **$100** | Developer sửa + QA phải test lại |
| Đã release cho user | **$1,000 - $10,000+** | Hotfix + rollback + mất uy tín + user bỏ app |

**Ví dụ thực tế gây chấn động:**
- **2012 — Knight Capital:** Một lỗi phần mềm trading → công ty mất **$440 triệu USD** trong 45 phút → phá sản
- **Hàng ngày:** App crash → user xóa app → mất doanh thu. Trang checkout lỗi → user bỏ giỏ hàng → mất tiền

→ Testing giúp **phát hiện lỗi sớm** → sửa rẻ hơn → tránh thảm họa.

---

## QA vs QC vs Testing — Ba khái niệm hay bị nhầm lẫn

### Giải thích bằng ví dụ nhà máy sản xuất giày

**QA (Quality Assurance)** = Đảm bảo **quy trình** sản xuất tốt.
→ "Chúng ta có quy trình kiểm tra da trước khi cắt không? Có checklist cho từng công đoạn không? Công nhân có được training không?"
→ QA **phòng ngừa** lỗi bằng cách làm đúng quy trình từ đầu.

**QC (Quality Control)** = Kiểm tra **sản phẩm** đã làm ra.
→ "Đôi giày này có bị lệch đế không? Chỉ may có chắc không? Màu có đúng không?"
→ QC **phát hiện** lỗi trong sản phẩm.

**Testing** = Hành động **cụ thể** để kiểm tra.
→ "Tôi đang kéo thử sợi chỉ xem có đứt không. Tôi đang đi thử giày xem có đau chân không."
→ Testing là **việc thực thi** kiểm tra.

### Mối quan hệ

```
QA (rộng nhất) — quản lý toàn bộ quy trình chất lượng
 └── QC — kiểm soát chất lượng sản phẩm cụ thể
      └── Testing — hành động kiểm tra cụ thể
```

**Trong thực tế ở Việt Nam:** Title "QA Engineer" thường bao gồm cả 3 việc: bạn vừa test (Testing), vừa report (QC), vừa đề xuất cải thiện quy trình (QA). Đừng quá quan trọng title — hiểu bản chất là đủ.

---

## 7 Nguyên tắc kiểm thử — ISTQB

ISTQB (International Software Testing Qualifications Board) là tổ chức quốc tế đưa ra các chuẩn mực cho ngành testing. Họ đúc kết 7 nguyên tắc nền tảng — đây không phải lý thuyết suông, mà là **bài học xương máu** từ hàng triệu dự án.

### 1. "Testing chỉ chứng minh có lỗi, không chứng minh không có lỗi"

**Bản chất:** Giống như bạn kiểm tra 100 quả táo trong thùng 1000 quả. 100 quả OK không có nghĩa 900 quả còn lại cũng OK — có thể quả thứ 101 đã bị sâu.

**Áp dụng:** Đừng bao giờ nói "hệ thống không có bug". Hãy nói "trong phạm vi đã test, không phát hiện bug nào".

### 2. "Không thể test mọi thứ"

**Bản chất:** Một form có 5 ô nhập, mỗi ô có thể nhận 100 giá trị khác nhau → 100^5 = **10 tỷ** tổ hợp. Nếu mỗi tổ hợp mất 1 giây để test → cần **317 năm** để test hết.

**Áp dụng:** Chọn test **cái gì quan trọng nhất** thay vì test mọi thứ. Đây là lý do cần biết Test Design Techniques (bài sau).

### 3. "Test sớm tiết kiệm tiền"

**Bản chất:** Quay lại ví dụ chi phí ở trên. Bug phát hiện ở requirement mất $1 để sửa. Cùng bug đó phát hiện ở production mất $10,000.

**Áp dụng:** QA nên **tham gia đọc requirement từ đầu** — chưa cần code, chưa cần test, chỉ cần đọc và hỏi: "Requirement này có mâu thuẫn không? Có thiếu case nào không?"

### 4. "Bug tập trung ở một số ít module"

**Bản chất:** Giống quy tắc 80/20 (Pareto): 80% bug nằm ở 20% code. Module phức tạp (Payment, Cart) có nhiều bug hơn module đơn giản (About Us, FAQ).

**Áp dụng:** Phân tích xem module nào hay lỗi → tập trung test kỹ hơn ở đó.

### 5. "Chạy mãi 1 bộ test → không tìm được bug mới"

**Bản chất:** Giống thuốc trừ sâu dùng lâu → sâu bọ kháng thuốc. Chạy đi chạy lại 100 test case cũ → chỉ confirm bug cũ không tái phát, không tìm được bug mới.

**Áp dụng:** Thường xuyên **cập nhật test case**, thêm scenarios mới. Kết hợp [Exploratory Testing](/manual-testing/exploratory-testing) để tìm bug ngoài dự kiến.

### 6. "Context quyết định cách test"

**Bản chất:** Test app game khác hoàn toàn test app ngân hàng. Game chấp nhận crash đôi khi. App ngân hàng — 1 lỗi tính sai tiền = thảm họa.

| App | Focus test |
|---|---|
| Game mobile | Performance, UX, compatibility |
| Ngân hàng | Security, accuracy, audit trail |
| Startup MVP | Happy path, ship fast |

### 7. "Không có bug ≠ phần mềm thành công"

**Bản chất:** Bạn xây một cây cầu hoàn hảo, không có lỗi kỹ thuật nào. Nhưng cầu nằm ở nơi không ai cần đi qua → cầu vô dụng.

Phần mềm cũng vậy: không có bug nhưng user không thích dùng, UI khó hiểu, thiếu feature cần thiết → vẫn thất bại.

---

## Verification vs Validation

Hai khái niệm này nghe giống nhau nhưng **hoàn toàn khác nhau**:

**Verification** — "Chúng ta có đang **xây đúng** không?"
→ Kiểm tra sản phẩm có đúng theo **bản thiết kế** (spec/requirement) không.
→ Ví dụ: Requirement nói "nút Login màu xanh" → kiểm tra nút Login có đúng màu xanh không.

**Validation** — "Chúng ta có đang **xây đúng thứ cần xây** không?"
→ Kiểm tra sản phẩm có đáp ứng **nhu cầu thực tế** của user không.
→ Ví dụ: Nút Login đúng màu xanh (đúng spec), nhưng user 60 tuổi nhìn không thấy vì quá nhỏ → fail validation.

**Ví dụ dễ nhớ:**

Bạn đặt làm bánh sinh nhật, yêu cầu: "Bánh kem dâu, 2 tầng, ghi chữ Happy Birthday".

- **Verification:** Tiệm bánh kiểm tra: Kem dâu? ✅ 2 tầng? ✅ Ghi chữ đúng? ✅ → Đúng yêu cầu.
- **Validation:** Người nhận: "Tôi dị ứng dâu..." → Yêu cầu đúng, nhưng **nhu cầu thực sự** không được đáp ứng.

---

## Error → Defect → Failure — Chuỗi nhân quả của lỗi

Ba từ này mô tả **3 giai đoạn** của một lỗi phần mềm:

**Error (Sai lầm)** — Con người làm sai.
→ Developer hiểu sai requirement: "giảm giá 10%" nhưng code thành "trừ 10 đồng".
→ Error nằm **trong đầu người**, chưa ở trong code.

**Defect (Lỗi trong code)** — Kết quả của Error, đã nằm trong code.
→ Dòng code: `price = price - 10` thay vì `price = price * 0.9`
→ Defect nằm **trong code**, có thể tìm thấy bằng cách đọc code.

**Failure (Sự cố)** — User hoặc QA thấy lỗi khi chạy phần mềm.
→ Sản phẩm giá 1 triệu, áp giảm giá 10%, hiển thị 999,990đ thay vì 900,000đ.
→ Failure nằm **ở hệ thống đang chạy**, user nhìn thấy.

```
Người → Error: Hiểu sai "giảm 10%"
  ↓
Code → Defect: price = price - 10  (sai logic)
  ↓
Hệ thống → Failure: User thấy giá sai
```

**Điểm quan trọng:** Không phải mọi Defect đều gây Failure. Nếu dòng code sai nằm ở chức năng chưa ai dùng → Defect tồn tại nhưng chưa ai thấy Failure. Giống như cây cầu bị nứt nhưng chưa ai đi qua → nứt có đó nhưng chưa ai ngã.

---

## Tư duy của một Tester giỏi

Kiến thức kỹ thuật ai cũng có thể học. Nhưng **cách tư duy** là thứ tạo ra sự khác biệt:

### "What if...?" — Luôn hỏi "Nếu... thì sao?"

Mỗi khi thấy một ô nhập liệu, một nút bấm, một trang web — QA giỏi tự động hỏi:

```
Ô nhập tên:
- Nếu nhập emoji 🎉 thì sao?
- Nếu nhập 10,000 ký tự thì sao?
- Nếu nhập code HTML <b>bold</b> thì sao?
- Nếu để trống thì sao?
- Nếu chỉ nhập dấu cách thì sao?

Nút Thanh toán:
- Nếu click 2 lần liên tiếp thì sao? (bị trừ tiền 2 lần?)
- Nếu mạng đứt giữa chừng thì sao?
- Nếu tab ra ngoài 30 phút rồi quay lại click thì sao?
```

### Nghĩ như User vs Nghĩ như Hacker

**User:** "Trang này dễ dùng không? Tôi có hiểu nút này để làm gì không?"
**Hacker:** "Tôi có thể xem data của người khác bằng cách đổi số trong URL không?"

QA giỏi **nghĩ cả hai cách** — vừa đảm bảo user vui, vừa đảm bảo hệ thống an toàn.

### Evidence-based — Mọi thứ cần bằng chứng

```
❌ "Tôi nghĩ có bug" → Không ai tin
✅ "Khi nhập X ở step 1-2-3, kết quả là Y, nhưng requirement nói phải là Z.
    Đây là screenshot. Đây là console log." → Dev fix ngay
```

---

## Sai lầm thường gặp

### ❌ Chỉ test Happy Path
→ ✅ **Luôn test cả Negative Path và Edge Cases** — nhập sai, để trống, nhập ký tự đặc biệt, giá trị biên (boundary).
→ 💡 **Tại sao:** 70-80% bugs nằm ở những case mà user "không nên làm" nhưng vẫn làm. Happy path thường developer đã tự test rồi.

### ❌ Assume thay vì Verify
→ ✅ **Mọi thứ phải có bằng chứng** — screenshot, log, steps to reproduce. "Tôi nghĩ nó đúng" không phải testing.
→ 💡 **Tại sao:** Không có evidence = không thuyết phục được ai. Dev sẽ hỏi "reproduce lại đi" — nếu bạn không có steps rõ ràng, bug report bị reject.

### ❌ Bỏ qua Requirement Review
→ ✅ **Đọc requirement TRƯỚC khi dev code** — hỏi ngay khi thấy mơ hồ, thiếu acceptance criteria, hoặc mâu thuẫn.
→ 💡 **Tại sao:** Bug phát hiện ở requirement mất $1 sửa. Cùng bug đó phát hiện sau khi code xong mất $100+. QA đọc requirement sớm = tiết kiệm cả team hàng tuần effort.

### ❌ Test không có kế hoạch — "mở app lên rồi click lung tung"
→ ✅ **Có test plan hoặc checklist trước khi bắt đầu** — dù đơn giản cũng cần biết mình sẽ test gì.
→ 💡 **Tại sao:** Random testing không lặp lại được, không đo lường được coverage. Bạn không biết mình đã test bao nhiêu % và còn thiếu gì.

---

## Tóm tắt

| Concept | Bản chất 1 câu |
|---|---|
| **Testing** | Hỏi phần mềm "mày đúng không?" rồi tìm bằng chứng |
| **QA/QC/Testing** | QA = quy trình, QC = sản phẩm, Testing = hành động kiểm tra |
| **7 Principles** | Bài học xương máu: test sớm, test smart, không test hết được |
| **Verification** | Xây đúng theo bản vẽ chưa? |
| **Validation** | Xây đúng thứ user cần chưa? |
| **Error→Defect→Failure** | Người sai → Code sai → Hệ thống lỗi |
| **Tester Mindset** | "What if?", nghĩ như user + hacker, cần bằng chứng |
