# QA Mindset

## Mindset quan trọng hơn Skills? (WHY)

Hai QA cùng biết Playwright, cùng biết SQL, cùng đọc chung requirement. Nhưng một người tìm được 20 bugs, người kia chỉ tìm được 5. Khác biệt nằm ở **mindset** — cách tư duy, cách nhìn nhận vấn đề.

> Skills có thể học trong vài tháng. Mindset cần rèn luyện mỗi ngày.

---

## 5 Pillars of QA Mindset

### 1. Think Like a User — "Tôi là người dùng"

**Bản chất:** Đặt mình vào vị trí end-user — không phải developer, không phải QA.

**Thực hành:**

```
Trước khi test, hỏi:
- User thật sẽ dùng feature này như thế nào?
- User nào sẽ dùng? (tech-savvy hay bà ngoại 70 tuổi?)
- User mong đợi gì khi click nút này?
- Nếu tôi là user lần đầu dùng app, tôi có hiểu không?
```

**Ví dụ thực tế:**

| QA bình thường | QA có User Mindset |
|---|---|
| "Login thành công, test pass" | "Login mất 5 giây, user sẽ nghĩ app bị đơ" |
| "Error message hiển thị đúng" | "Error message 'ERR_422' không giúp user hiểu phải làm gì" |
| "Checkout flow hoạt động" | "Checkout cần 7 bước, quá nhiều, user sẽ bỏ giỏ hàng" |

---

### 2. Think Like a Hacker — "Tôi muốn phá hệ thống"

**Bản chất:** Chủ động tìm cách phá, bypass, exploit hệ thống.

**Thực hành:**

```
Mỗi feature, hỏi:
- Nhập gì vào đây để hệ thống crash?
- Có cách nào bypass validation không?
- Có thể xem data của người khác không?
- Nếu tôi gửi 1000 requests cùng lúc thì sao?
- Đổi URL parameter thì chuyện gì xảy ra?
```

**Ví dụ:**

| Field/Feature | Hacker Mindset Test |
|---|---|
| Search box | Nhập `<script>alert('xss')</script>` |
| Price field | Nhập số âm `-100`, nhập `0` |
| Upload avatar | Upload file `.exe`, file 100MB |
| Order ID in URL | Đổi `/orders/123` thành `/orders/124` |
| Coupon code | Apply cùng coupon 100 lần |
| Payment | Submit form 2 lần liên tục (double charge?) |

---

### 3. Question Everything — "Tôi không assume"

**Bản chất:** Không bao giờ giả định. Luôn hỏi, luôn verify.

**Thực hành:**

```
Khi đọc requirement:
❌ "Chắc là giống version cũ" → Verify!
❌ "Chắc dev đã handle rồi" → Test xem!
❌ "Requirement không nói → chắc không cần" → Hỏi lại!

Khi test:
❌ "Test pass trên Chrome → chắc Firefox cũng OK" → Test thử!
❌ "API trả 200 → chắc data đúng" → Verify data!
❌ "Dev nói đã fix → chắc fix rồi" → Retest!
```

**Câu hỏi vàng cho mọi requirement:**
1. "Nếu user KHÔNG làm bước này thì sao?"
2. "Nếu data TRỐNG thì hiển thị gì?"
3. "Nếu có LỖI xảy ra thì user thấy gì?"
4. "Requirement nói X, nhưng NGƯỢC LẠI thì sao?"
5. "Trường hợp nào requirement CHƯA NÓI ĐẾN?"

---

### 4. Attention to Detail — "Chi tiết tạo nên sự khác biệt"

**Bản chất:** Chú ý mọi thứ nhỏ nhất — vì bug thường ẩn ở chi tiết.

**Thực hành:**

```
UI/UX Details:
- Font size/color có consistent không?
- Spacing, alignment có đều không?
- Typo? Grammar? (tiếng Anh lẫn tiếng Việt)
- Loading state hiển thị đúng?
- Empty state có message phù hợp?
- Error state UX có tốt không?

Data Details:
- Số tiền có format đúng? (1,500,000đ vs 1500000)
- Ngày giờ đúng timezone?
- Tên hiển thị đúng? (Nguyen Van An vs nguyen van an)
- Pagination count có đúng?
- Sort order có chính xác?

Technical Details:
- Console có error/warning không? (F12)
- Network tab có failed requests?
- Response time có chấp nhận được?
- API trả về đúng HTTP status code?
```

---

### 5. Big Picture Thinking — "Tôi thấy cả hệ thống"

**Bản chất:** Không chỉ test feature riêng lẻ — mà hiểu feature đó **ảnh hưởng** đến phần khác như thế nào.

**Thực hành: Impact Analysis**

```
Dev sửa logic tính giá giảm:

QA bình thường:
  → Test coupon code → Pass ✅ → Done

QA có Big Picture:
  → Test coupon code → Pass ✅
  → Cart total tính đúng? ✅
  → Checkout total match cart? ✅
  → Order confirmation hiển thị đúng? ✅
  → Email xác nhận giá đúng? ✅
  → Order history hiển thị đúng? ✅
  → Admin dashboard revenue đúng? ✅
  → Report/Analytics bị ảnh hưởng? 🤔
```

**Khi nhận feature mới, hỏi:**
- Feature này tương tác với modules nào?
- API nào bị ảnh hưởng?
- Data nào thay đổi?
- Ai sẽ dùng feature này? (Customer? Admin? Both?)
- Nếu feature này lỗi, ảnh hưởng business gì?

---

## Rèn luyện Mindset hàng ngày

### Daily Practice

```
Mỗi ngày 15 phút:
1. Đọc bug reports của team → Học cách người khác tìm bugs
2. Dùng 1 app bất kỳ → Tìm 3 điểm có thể cải thiện
3. Đọc 1 bài về testing → Mở rộng góc nhìn
```

### Khi nhận requirement mới

```
Checklist tư duy:
□ User nào sẽ dùng? (Persona)
□ Happy path là gì?
□ Unhappy paths nào có thể xảy ra?
□ Edge cases: empty, null, max, min, special chars?
□ Modules nào liên quan? (Impact analysis)
□ Security concerns?
□ Performance concerns?
□ Accessibility concerns?
□ Requirement nào chưa rõ → cần hỏi lại?
```

### Sau khi tìm bug

```
Đừng dừng lại ở 1 bug!
1. Bug ở chỗ này → chỗ tương tự có bị không?
2. Bug với data này → data khác thì sao?
3. Bug trên Chrome → Firefox thì sao?
4. Bug ở UI → API level cũng bị không?
5. Bug này có thể bị khai thác (security)?
```

---

## Sai lầm Mindset thường gặp

| Sai lầm | Hậu quả | Mindset đúng |
|---|---|---|
| "Chỉ test happy path" | Bỏ sót 70% bugs | Test cả negative + edge cases |
| "Dev nói OK là OK" | Trust nhưng verify | Luôn retest, luôn verify data |
| "Không phải bug, là feature" | Che đậy quality issues | Report objectively, let PM decide |
| "Test xong rồi, không cần test lại" | Regression bugs | Regression test mỗi release |
| "Chỉ test cái mình được assign" | Bỏ sót integration bugs | Exploratory + impact analysis |

---

## Tóm tắt chương

| Mindset | Core Question |
|---|---|
| **User Thinking** | "User sẽ trải nghiệm thế nào?" |
| **Hacker Thinking** | "Làm sao để phá hệ thống?" |
| **Question Everything** | "Tôi đang assume điều gì?" |
| **Attention to Detail** | "Chi tiết nào tôi đang bỏ qua?" |
| **Big Picture** | "Feature này ảnh hưởng đến đâu?" |
