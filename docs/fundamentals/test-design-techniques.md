# Test Design Techniques

## Tại sao cần kỹ thuật thiết kế Test Case? (WHY)

Quay lại nguyên tắc ISTQB #2: **Exhaustive testing is impossible** — không thể test mọi tổ hợp. Vậy làm sao chọn đúng giá trị để test?

**Ví dụ:** Form đăng ký có 4 fields:
- Tên (text, 1-50 ký tự)
- Email (format email)
- Tuổi (số, 18-65)
- Password (8-20 ký tự, có uppercase, number, special char)

Nếu test random → **hàng triệu tổ hợp**, không hiệu quả.
Nếu dùng kỹ thuật → **vài chục test case**, cover được ~95% lỗi phổ biến.

**Test Design Techniques giúp bạn:**
1. **Giảm số lượng** test case nhưng vẫn đạt coverage cao
2. **Tìm đúng chỗ** lỗi thường xảy ra
3. **Có hệ thống** — không phải "test random" hay "test theo cảm tính"
4. **Giải trình được** — khi PM hỏi "tại sao test những case này?"

---

## Phân loại

```
Test Design Techniques
├── Black-box (không cần biết code)
│   ├── Equivalence Partitioning
│   ├── Boundary Value Analysis
│   ├── Decision Table
│   ├── State Transition
│   └── Use Case / User Story Testing
├── White-box (cần biết code)
│   ├── Statement Coverage
│   ├── Branch Coverage
│   └── Path Coverage
└── Experience-based
    ├── Error Guessing
    ├── Exploratory Testing
    └── Checklist-based Testing
```

---

## Black-box Techniques

Black-box = **không cần biết code bên trong**. Chỉ dựa vào input/output và requirements.

> Tưởng tượng bạn test một cái máy bán nước: bạn bỏ tiền vào, nhấn nút, kiểm tra có ra đúng lon nước không. Bạn không cần biết bên trong máy hoạt động ra sao.

### 1. Equivalence Partitioning (EP) — Phân lớp tương đương

#### Bản chất (WHAT)

Chia dữ liệu đầu vào thành **các nhóm (partition)** mà các giá trị trong cùng nhóm có hành vi giống nhau. Chỉ cần test **1 giá trị đại diện** cho mỗi nhóm.

#### Tại sao hiệu quả (WHY)

Nếu giá trị `25` hoạt động đúng trong nhóm `18-65`, thì rất có thể `30`, `40`, `50` cũng đúng. Không cần test tất cả.

#### Cách áp dụng (HOW)

**Ví dụ: Field "Tuổi" chấp nhận 18-65**

| Partition | Range | Đại diện | Expected Result |
|---|---|---|---|
| Invalid (thấp) | < 18 | `10` | Error: "Tuổi phải từ 18-65" |
| **Valid** | **18-65** | **`30`** | **Accept** |
| Invalid (cao) | > 65 | `70` | Error: "Tuổi phải từ 18-65" |
| Invalid (không phải số) | abc, @#$ | `"abc"` | Error: "Vui lòng nhập số" |
| Invalid (empty) | (trống) | `""` | Error: "Trường bắt buộc" |
| Invalid (số âm) | < 0 | `-5` | Error: "Tuổi phải từ 18-65" |

→ **6 test cases** thay vì test từng số từ 1 đến 100+.

#### Thực tế dự án

Khi viết test case cho một field, luôn xác định:
1. Có bao nhiêu **valid partition**?
2. Có bao nhiêu **invalid partition**? (empty, wrong type, too small, too big, special chars...)
3. Chọn **1 đại diện** cho mỗi partition

---

### 2. Boundary Value Analysis (BVA) — Phân tích giá trị biên

#### Bản chất (WHAT)

Test tại các **giá trị biên** — ranh giới giữa valid và invalid. Đây là nơi **lỗi xảy ra nhiều nhất** vì developer hay sai ở điều kiện `<`, `<=`, `>`, `>=`.

#### Tại sao hiệu quả (WHY)

Bug kinh điển:
```javascript
// Developer viết:
if (age > 18 && age < 65) { ... }   // ❌ Sai! Người 18 tuổi và 65 tuổi bị reject

// Đúng phải là:
if (age >= 18 && age <= 65) { ... }  // ✅
```

BVA sẽ bắt được lỗi này ngay lập tức.

#### Cách áp dụng (HOW)

**Ví dụ: Field "Tuổi" chấp nhận 18-65**

```
    Invalid    │       Valid        │    Invalid
  ◄───────────►│◄──────────────────►│◄───────────►
               │                    │
Test:  17  [18]  19          59  [60]  [65]  66
       ↑    ↑    ↑                  ↑    ↑    ↑
      OUT  EDGE  IN                IN  EDGE  OUT
```

| Test Value | Expected | Lý do test |
|---|---|---|
| `17` | Invalid | Ngay dưới biên dưới |
| `18` | Valid | **Biên dưới (boundary)** |
| `19` | Valid | Ngay trên biên dưới |
| `64` | Valid | Ngay dưới biên trên |
| `65` | Valid | **Biên trên (boundary)** |
| `66` | Invalid | Ngay trên biên trên |

→ **6 test cases** tập trung đúng chỗ lỗi hay xảy ra nhất.

#### EP + BVA = Combo hiệu quả nhất

Trong thực tế, luôn **kết hợp cả EP và BVA**:
- EP cho bạn biết **test những nhóm nào**
- BVA cho bạn biết **test giá trị nào** trong mỗi nhóm

---

### 3. Decision Table — Bảng quyết định

#### Bản chất (WHAT)

Dùng khi có **nhiều điều kiện kết hợp** tạo ra các kết quả khác nhau. Decision Table liệt kê **tất cả tổ hợp** điều kiện và kết quả tương ứng.

#### Khi nào dùng (WHY)

- Business logic phức tạp với nhiều điều kiện AND/OR
- Có nhiều quy tắc kinh doanh đan xen
- Cần đảm bảo không bỏ sót tổ hợp nào

#### Cách áp dụng (HOW)

**Ví dụ: Chính sách giảm giá của một e-commerce**

Quy tắc:
- Khách VIP được giảm 20%
- Đơn hàng > 500K được giảm thêm 10%
- Khách mới (first order) được giảm 15%

| | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|---|---|---|---|---|---|---|---|---|
| **Conditions** | | | | | | | | |
| Khách VIP? | Y | Y | Y | Y | N | N | N | N |
| Đơn > 500K? | Y | Y | N | N | Y | Y | N | N |
| First order? | Y | N | Y | N | Y | N | Y | N |
| **Actions** | | | | | | | | |
| Giảm VIP 20% | ✅ | ✅ | ✅ | ✅ | | | | |
| Giảm đơn lớn 10% | ✅ | ✅ | | | ✅ | ✅ | | |
| Giảm first order 15% | ✅ | | ✅ | | ✅ | | ✅ | |

→ **8 test cases** cover hết tổ hợp. Không bỏ sót trường hợp nào.

#### Mẹo thực tế

- Số rules = 2^n (n = số conditions). 3 conditions → 8 rules
- Nếu quá nhiều conditions → nhóm những conditions independent lại
- Dùng Excel/Google Sheet để tạo nhanh

---

### 4. State Transition — Chuyển trạng thái

#### Bản chất (WHAT)

Dùng khi hệ thống có **các trạng thái (state)** khác nhau, và **sự kiện (event)** gây ra chuyển đổi giữa chúng.

#### Khi nào dùng (WHY)

- Login/Logout flows
- Order status (Pending → Processing → Shipped → Delivered)
- Workflow approval (Draft → Submitted → Approved/Rejected)
- Subscription plans (Trial → Active → Expired → Renewed)

#### Cách áp dụng (HOW)

**Ví dụ: Login với giới hạn 3 lần sai password**

```
                    ┌──── Correct password ────► [Logged In]
                    │
[Start] ──► [Attempt 1] ── Wrong password ──► [Attempt 2]
                                                    │
                    ┌──── Correct password ────►    │
                    │                               │
              [Logged In]  ◄── Correct password ── [Attempt 3]
                                                    │
                                              Wrong password
                                                    │
                                                    ▼
                                               [Locked]
```

**State Transition Table:**

| Current State | Event | Next State | Action |
|---|---|---|---|
| Start | Enter credentials | Attempt 1 | - |
| Attempt 1 | Correct password | Logged In | Show dashboard |
| Attempt 1 | Wrong password | Attempt 2 | Show "1st incorrect" |
| Attempt 2 | Correct password | Logged In | Show dashboard |
| Attempt 2 | Wrong password | Attempt 3 | Show "2nd incorrect" |
| Attempt 3 | Correct password | Logged In | Show dashboard |
| Attempt 3 | Wrong password | Locked | Show "Account locked" |
| Locked | Any input | Locked | Show "Contact admin" |

→ Mỗi row = **1 test case**. Đảm bảo cover hết state transitions.

---

### 5. Use Case / User Story Testing

#### Bản chất (WHAT)

Test dựa trên **scenario thực tế** của user — từ đầu đến cuối một flow.

#### Cách áp dụng (HOW)

**Ví dụ: User Story "Thanh toán đơn hàng"**

```
User Story: As a customer, I want to checkout my cart so that I can receive my order.

Acceptance Criteria:
- Cart must have at least 1 item
- Shipping address is required
- Payment method must be valid
- Order confirmation email is sent after successful payment
```

**Test scenarios:**

| # | Scenario | Expected |
|---|---|---|
| 1 | Happy path: add item → checkout → fill address → pay → confirm | Order created, email sent |
| 2 | Empty cart → checkout | Show "Cart is empty" |
| 3 | Checkout → skip address | Validation error on address |
| 4 | Pay with expired card | Payment rejected, order not created |
| 5 | Pay → network timeout | Show retry option, no double charge |
| 6 | Apply coupon → pay | Price reduced correctly |
| 7 | Cart → remove all items → checkout | Show "Cart is empty" |

---

## White-box Techniques

White-box = **cần biết code bên trong**. Thường developer hoặc SDET thực hiện.

### Tại sao QA cần biết? (WHY)

Dù không trực tiếp làm white-box testing, QA cần hiểu để:
- Giao tiếp hiệu quả với dev về **code coverage**
- Hiểu khi dev nói "unit test coverage 80%"
- Đánh giá **rủi ro** của phần code chưa được cover

### 1. Statement Coverage

**Mục tiêu:** Mỗi **dòng code** được chạy ít nhất 1 lần.

```javascript
function calculateDiscount(price, isVIP) {
  let discount = 0;           // Line 1
  if (isVIP) {                // Line 2
    discount = price * 0.2;   // Line 3
  }
  return price - discount;    // Line 4
}
```

- Test: `calculateDiscount(100, true)` → chạy Line 1, 2, 3, 4 → **100% statement coverage**
- Nhưng chưa test trường hợp `isVIP = false`! ⚠️

### 2. Branch Coverage

**Mục tiêu:** Mỗi **nhánh** (if true / if false) được chạy ít nhất 1 lần.

```javascript
function calculateDiscount(price, isVIP) {
  let discount = 0;
  if (isVIP) {                // Branch: true ✅ | false ❓
    discount = price * 0.2;
  }
  return price - discount;
}
```

Cần **2 test cases**:
1. `calculateDiscount(100, true)` → Branch true ✅
2. `calculateDiscount(100, false)` → Branch false ✅

→ **100% branch coverage** (mạnh hơn statement coverage)

### 3. Path Coverage

**Mục tiêu:** Mỗi **đường đi** qua code được chạy ít nhất 1 lần.

Với code có nhiều if/else, số đường đi tăng nhanh:
- 1 if → 2 paths
- 2 if → 4 paths
- 3 if → 8 paths
- n if → 2^n paths

**Thực tế:** Path coverage 100% gần như không khả thi với code phức tạp. Thường nhắm đến **branch coverage ≥ 80%**.

### Coverage trong thực tế

| Metric | Target phổ biến | Ý nghĩa |
|---|---|---|
| Statement | ≥ 80% | Minimum acceptable |
| Branch | ≥ 80% | Recommended |
| Path | Không set target | Quá khó đạt 100% |

::: warning Cẩn thận với "100% coverage"
100% code coverage **không có nghĩa không có bug**. Coverage chỉ đo **code nào đã chạy**, không đo **logic đúng hay sai**. Một test chạy qua mọi dòng code nhưng không có assertion nào thì vẫn vô nghĩa.
:::

---

## Experience-based Techniques

### 1. Error Guessing

Dựa vào **kinh nghiệm** để đoán chỗ hay lỗi:
- Null/empty values
- Số âm, số 0
- Ký tự đặc biệt: `<script>`, `' OR 1=1 --`, emoji 🎉
- Rất dài (10,000 ký tự)
- Format sai (email không có @, phone có chữ)
- Concurrent actions (2 user cùng sửa 1 record)
- Timezone issues

### 2. Checklist-based Testing

Dùng checklist có sẵn cho từng loại feature:

**Checklist cho Form Input:**
- [ ] Required fields hiển thị dấu *
- [ ] Validation message rõ ràng
- [ ] Tab order đúng thứ tự
- [ ] Copy/Paste hoạt động
- [ ] Autofill browser hoạt động
- [ ] Submit bằng Enter key
- [ ] Double-click submit không tạo duplicate
- [ ] Back button không mất data đã nhập

---

## Khi nào dùng kỹ thuật nào?

| Tình huống | Kỹ thuật phù hợp |
|---|---|
| Input field với range cụ thể | EP + BVA |
| Business logic phức tạp, nhiều conditions | Decision Table |
| Workflow/status changes | State Transition |
| End-to-end user flow | Use Case Testing |
| Code coverage requirement | White-box (Statement/Branch) |
| Không có requirement rõ ràng | Error Guessing + Exploratory |
| Regression trên feature cũ | Checklist-based |

---

## Thực hành: Thiết kế Test Cases cho Login Form

Áp dụng tổng hợp các kỹ thuật:

**Requirements:** Login form với Email + Password + Remember Me checkbox

**EP + BVA cho Email:**
| # | Input | Expected |
|---|---|---|
| 1 | Valid email: `user@mail.com` | Accept |
| 2 | Missing @: `usermail.com` | "Invalid email format" |
| 3 | Missing domain: `user@` | "Invalid email format" |
| 4 | Empty | "Email is required" |
| 5 | SQL injection: `' OR 1=1 --` | "Invalid email format" |
| 6 | Max length email (254 chars) | Accept |
| 7 | Over max length (255+ chars) | "Email too long" |

**EP + BVA cho Password:**
| # | Input | Expected |
|---|---|---|
| 8 | Valid: `Pass@123` (8 chars) | Accept |
| 9 | Too short: `Pa@1` (4 chars) | "Min 8 characters" |
| 10 | Boundary: 7 chars | "Min 8 characters" |
| 11 | Boundary: 8 chars | Accept |
| 12 | Max: 20 chars | Accept |
| 13 | Over max: 21 chars | "Max 20 characters" |
| 14 | Empty | "Password is required" |

**State Transition cho Login attempts:**
| # | Scenario | Expected |
|---|---|---|
| 15 | Correct credentials | Redirect to dashboard |
| 16 | Wrong password 1st time | "Incorrect password. 2 attempts left" |
| 17 | Wrong password 3rd time | Account locked |
| 18 | Login while locked | "Account locked. Contact admin" |

**Use Case cho Remember Me:**
| # | Scenario | Expected |
|---|---|---|
| 19 | Login + Remember Me checked | Session persists after close browser |
| 20 | Login + Remember Me unchecked | Session expires after close browser |

→ **20 test cases** cover toàn diện Login form bằng cách kết hợp nhiều kỹ thuật.

---

## Tóm tắt chương

| Technique | Dùng khi | Key idea |
|---|---|---|
| **EP** | Input có range/groups | 1 đại diện per group |
| **BVA** | Input có boundaries | Test ở ranh giới |
| **Decision Table** | Nhiều conditions kết hợp | Liệt kê mọi tổ hợp |
| **State Transition** | Hệ thống có states | Test mọi transitions |
| **Use Case** | End-to-end flows | Test như user thật |
| **White-box** | Code coverage | Statement → Branch → Path |
| **Error Guessing** | Kinh nghiệm | Đoán chỗ hay lỗi |
