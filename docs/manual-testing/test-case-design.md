# Test Case Design

## Test Case là gì? (WHAT)

Test Case là **tập hợp điều kiện và bước thực hiện** để verify một chức năng cụ thể. Mỗi test case trả lời: "Khi user làm X, hệ thống có đúng trả về Y không?"

### Tại sao Test Case quan trọng? (WHY)

- **Consistent** — ai execute cũng cho kết quả giống nhau
- **Coverage** — đảm bảo không bỏ sót scenario
- **Reusable** — dùng cho regression testing
- **Traceable** — link đến requirement, biết requirement nào đã test
- **Evidence** — bằng chứng đã test (cho audit, stakeholder)

---

## Cấu trúc Test Case chuẩn

| Field | Mô tả | Bắt buộc? |
|---|---|---|
| **Test Case ID** | Mã định danh duy nhất | ✅ |
| **Title** | Mô tả ngắn gọn | ✅ |
| **Priority** | High / Medium / Low | ✅ |
| **Precondition** | Điều kiện trước khi test | ✅ |
| **Test Steps** | Các bước thực hiện | ✅ |
| **Test Data** | Dữ liệu cần dùng | ✅ |
| **Expected Result** | Kết quả mong đợi | ✅ |
| **Actual Result** | Kết quả thực tế (khi execute) | Khi run |
| **Status** | Pass / Fail / Skip / Blocked | Khi run |
| **Module** | Module/Feature liên quan | Optional |
| **Linked Requirement** | User Story / Requirement ID | Optional |

---

## Nguyên tắc viết Test Case tốt

### 1. Mỗi step = 1 hành động

```
❌ Sai:
Step 1: Mở browser, truy cập trang login, nhập email và password, click Login

✅ Đúng:
Step 1: Mở browser và truy cập https://staging.example.com/login
Step 2: Nhập email "test@mail.com" vào field Email
Step 3: Nhập password "Pass@123" vào field Password
Step 4: Click button "Login"
```

### 2. Expected Result phải cụ thể

```
❌ Mơ hồ:
Expected: Hệ thống hoạt động bình thường
Expected: Trang load thành công
Expected: Hiển thị đúng

✅ Cụ thể:
Expected: User được redirect đến /dashboard
Expected: Welcome message hiển thị "Hello, Nguyen Van An"
Expected: Cart icon hiển thị badge "3" (số items)
Expected: Error message "Invalid email format" hiển thị màu đỏ dưới field Email
```

### 3. Test Case độc lập

Mỗi test case **không phụ thuộc** vào test case khác. Có thể chạy theo bất kỳ thứ tự nào.

```
❌ Phụ thuộc:
TC_001: Create user  ← TC_002 cần user này
TC_002: Edit user    ← Nếu TC_001 fail, TC_002 cũng fail

✅ Độc lập:
TC_001: Create user
  Precondition: None
TC_002: Edit user
  Precondition: User "test_user" đã tồn tại trong hệ thống
```

### 4. Bao gồm cả Positive và Negative

```
Positive (Happy path):
- Login với valid credentials → success

Negative (Unhappy path):
- Login với wrong password → error message
- Login với empty email → validation error
- Login với SQL injection → error, không bị hack
```

### 5. Data-specific, không mơ hồ

```
❌ Mơ hồ:
Test Data: Nhập một email hợp lệ

✅ Cụ thể:
Test Data: Email = "test_user_01@mail.com", Password = "Test@123"
```

---

## Ví dụ thực tế: Login Feature

### Requirement

```
User Story: As a registered user, I want to login with email and password
so that I can access my account.

Acceptance Criteria:
1. Email and password fields are required
2. Email must be valid format
3. Password minimum 8 characters
4. Successful login redirects to Dashboard
5. Failed login shows error message
6. Account locks after 5 consecutive wrong passwords
7. "Remember me" keeps session for 30 days
```

### Test Cases

#### TC_LOGIN_001: Login thành công

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_001 |
| **Title** | Verify successful login with valid credentials |
| **Priority** | High |
| **Precondition** | User account exists: test@mail.com / Pass@123 |
| **Module** | Authentication |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to /login | Login page displays with Email, Password fields and Login button |
| 2 | Enter "test@mail.com" in Email field | Email field shows entered value |
| 3 | Enter "Pass@123" in Password field | Password field shows masked dots |
| 4 | Click "Login" button | Loading indicator shows briefly |
| 5 | — | User redirected to /dashboard |
| 6 | — | Welcome message "Hello, Test User" is visible |
| 7 | — | User avatar/name appears in header |

#### TC_LOGIN_002: Login với empty email

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_002 |
| **Title** | Verify error when email field is empty |
| **Priority** | High |
| **Precondition** | User is on /login page |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Leave Email field empty | — |
| 2 | Enter "Pass@123" in Password field | — |
| 3 | Click "Login" button | Error "Email is required" displayed below Email field in red |
| 4 | — | User remains on /login page (no redirect) |
| 5 | — | Password field is NOT cleared |

#### TC_LOGIN_003: Login với wrong password

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_003 |
| **Title** | Verify error message with incorrect password |
| **Priority** | High |
| **Precondition** | User account exists: test@mail.com / Pass@123 |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Enter "test@mail.com" in Email | — |
| 2 | Enter "WrongPass@999" in Password | — |
| 3 | Click "Login" | Error "Invalid email or password" displayed |
| 4 | — | Error message does NOT reveal which field is wrong (security) |
| 5 | — | Password field is cleared |

#### TC_LOGIN_004: Account lock sau 5 lần sai

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_004 |
| **Title** | Verify account locks after 5 consecutive wrong passwords |
| **Priority** | Medium |
| **Precondition** | User account exists, not locked |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login with wrong password (1st time) | Error "Invalid email or password" |
| 2 | Login with wrong password (2nd time) | Error "Invalid email or password" |
| 3 | Login with wrong password (3rd time) | Error "Invalid email or password. 2 attempts remaining" |
| 4 | Login with wrong password (4th time) | Error "Invalid email or password. 1 attempt remaining" |
| 5 | Login with wrong password (5th time) | Error "Account locked. Contact support" |
| 6 | Login with CORRECT password | Error "Account locked. Contact support" (vẫn locked) |

---

## Ví dụ thực tế: E-commerce Checkout

### Test Cases cho Checkout Flow

#### TC_CHECKOUT_001: Checkout thành công

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as registered user | Dashboard page |
| 2 | Add "iPhone 15" to cart | Cart badge shows "1" |
| 3 | Click Cart icon → "Proceed to Checkout" | Checkout page with order summary |
| 4 | Verify order summary | Product name, quantity, price correct |
| 5 | Fill shipping: "123 Nguyen Hue, HCM" | Address saved |
| 6 | Select payment: Credit Card | Payment form appears |
| 7 | Enter card: 4111 1111 1111 1111, 12/28, 123 | Card accepted |
| 8 | Click "Place Order" | Order confirmation page |
| 9 | Verify order ID format | "ORD-XXXXXXXX" format |
| 10 | Check confirmation email | Email received with order details |

#### TC_CHECKOUT_002: Checkout với giỏ hàng trống

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login as registered user | Dashboard |
| 2 | Navigate to /cart (no items) | Empty cart page |
| 3 | Click "Checkout" button | Button is disabled OR message "Your cart is empty" |

#### TC_CHECKOUT_003: Apply coupon code

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add product (500K) to cart | Cart total: 500,000đ |
| 2 | Enter coupon "SALE20" | "Coupon applied" message |
| 3 | Verify discount | Discount: -100,000đ (20%) |
| 4 | Verify total | Total: 400,000đ |
| 5 | Enter another coupon "FREESHIP" | "Only 1 coupon allowed" message |
| 6 | Remove coupon "SALE20" | Total reverts to 500,000đ |

---

## Test Case Priority

| Priority | Tiêu chí | Ví dụ | Regression? |
|---|---|---|---|
| **Critical** | Core business flow, mất revenue nếu fail | Login, Checkout, Payment | Luôn luôn |
| **High** | Important feature, ảnh hưởng nhiều users | Search, Add to cart, Profile | Luôn luôn |
| **Medium** | Normal feature, có workaround | Filter, Sort, Wishlist | Selective |
| **Low** | Minor, cosmetic, edge case | Tooltip, hover effect | Rarely |

**Trong thời gian hạn chế:** Test Critical → High → Medium. Low chỉ test khi đủ thời gian.

---

## Test Case Review Checklist

Trước khi submit test cases cho team review:

- [ ] Mỗi test case có **1 mục đích rõ ràng**
- [ ] Steps **cụ thể**, ai cũng execute được
- [ ] Expected results **không mơ hồ**
- [ ] Có cả **positive và negative** cases
- [ ] Test data **cụ thể** (không phải "nhập một email")
- [ ] Preconditions **đầy đủ**
- [ ] Cover **acceptance criteria** trong user story
- [ ] Không **duplicate** với test cases khác
- [ ] **Priority** hợp lý
- [ ] Đã apply **test design techniques** (EP, BVA, Decision Table...)

---

## Tóm tắt chương

| Aspect | Best Practice |
|---|---|
| **Structure** | ID, Title, Precondition, Steps, Data, Expected |
| **Steps** | 1 step = 1 action, cụ thể |
| **Expected** | Cụ thể, measurable, không mơ hồ |
| **Independence** | Mỗi TC chạy độc lập |
| **Coverage** | Positive + Negative + Edge cases |
| **Priority** | Critical → High → Medium → Low |
| **Techniques** | Apply EP, BVA, Decision Table |
