# Test Case Design

## Test Case giống như Thẻ Công thức Nấu ăn

Bạn muốn nấu phở. Bạn cần gì?

| Nấu ăn | Test Case |
|---|---|
| **Tên món**: Phở bò | **Title**: Login thành công với email hợp lệ |
| **Nguyên liệu**: Bánh phở, thịt bò, hành, quế... | **Test Data**: email = "test@mail.com", password = "Pass@123" |
| **Điều kiện**: Nồi nước dùng đã sôi sẵn | **Precondition**: User account đã tồn tại trong hệ thống |
| **Các bước**: 1. Trụng bánh phở → 2. Xếp thịt → 3. Chan nước | **Steps**: 1. Mở trang login → 2. Nhập email → 3. Click Login |
| **Thành phẩm**: Bát phở nóng, nước trong, thịt chín tái | **Expected Result**: Redirect tới Dashboard, hiện "Hello, Test User" |

Mỗi thẻ công thức cho bạn **đủ thông tin** để bất kỳ ai cũng nấu được -- dù chưa từng vào bếp. Test case cũng vậy: ai execute cũng cho **cùng kết quả**.

:::tip Aha moment
Test case tốt nhất là test case mà **người mới vào team đọc xong là chạy được**, không cần hỏi thêm ai. Giống như công thức nấu ăn viết rõ ràng -- không cần đầu bếp đứng cạnh hướng dẫn.
:::

---

## Cấu trúc Test Case chuẩn -- "Thẻ công thức" gồm những gì?

| Field | Mô tả | Ví dụ | Bắt buộc? |
|---|---|---|---|
| **Test Case ID** | Mã duy nhất để nhận diện | TC_LOGIN_001 | Bắt buộc |
| **Title** | Mô tả ngắn gọn mục đích test | Verify login thành công | Bắt buộc |
| **Priority** | Mức độ quan trọng | High / Medium / Low | Bắt buộc |
| **Precondition** | Điều kiện cần có TRƯỚC khi test | User account đã tồn tại | Bắt buộc |
| **Test Steps** | Từng bước thực hiện, đánh số | 1. Mở /login, 2. Nhập email... | Bắt buộc |
| **Test Data** | Dữ liệu cụ thể dùng để test | email = "a@b.com", pass = "123" | Bắt buộc |
| **Expected Result** | Kết quả mong đợi -- cụ thể, đo được | Redirect tới /dashboard | Bắt buộc |
| **Actual Result** | Kết quả thực tế (điền khi chạy test) | (Pass) hoặc mô tả lỗi | Khi execute |
| **Status** | Kết quả cuối cùng | Pass / Fail / Skip / Blocked | Khi execute |
| **Module** | Feature/module liên quan | Authentication | Nên có |
| **Linked Requirement** | User Story liên quan | US-123 | Nên có |

---

## 5 Nguyên tắc viết Test Case tốt

### Nguyên tắc 1: Mỗi step = 1 hành động duy nhất

Giống như công thức nấu ăn: "Trụng phở" là 1 bước, "Xếp thịt" là 1 bước -- không gộp lại thành "Trụng phở xếp thịt chan nước rồi bưng ra".

```
# SAI -- gộp nhiều hành động vào 1 step
# Người khác đọc không biết fail ở đâu
Step 1: Mở browser, truy cập trang login, nhập email và password, click Login

# ĐÚNG -- mỗi step là 1 hành động
# Nếu fail ở step 3, biết ngay password field có vấn đề
Step 1: Mở browser và truy cập https://staging.example.com/login
Step 2: Nhập email "test@mail.com" vào field Email
Step 3: Nhập password "Pass@123" vào field Password
Step 4: Click button "Login"
```

:::tip Aha moment
Tại sao tách nhỏ? Vì khi test **fail**, bạn cần biết **fail ở bước nào**. Nếu gộp 5 hành động vào 1 step, developer sẽ hỏi: "Lỗi ở chỗ nào vậy?" Tách nhỏ = debug nhanh.
:::

### Nguyên tắc 2: Expected Result phải CỤ THỂ, đo được

Expected Result (kết quả mong đợi) giống như mô tả thành phẩm: **ai đọc cũng đánh giá được** "đúng" hay "sai".

```
# SAI -- quá mơ hồ, mỗi người hiểu khác nhau
# "Hoạt động bình thường" là như thế nào?
Expected: Hệ thống hoạt động bình thường
Expected: Trang load thành công
Expected: Hiển thị đúng

# ĐÚNG -- cụ thể, ai đọc cũng verify được
Expected: User được redirect đến /dashboard trong vòng 3 giây
Expected: Welcome message hiển thị "Hello, Nguyen Van An"
Expected: Cart icon hiển thị badge số "3" (số items trong giỏ hàng)
Expected: Error message "Invalid email format" hiển thị màu đỏ dưới field Email
```

### Nguyên tắc 3: Mỗi Test Case phải ĐỘC LẬP

Mỗi test case có thể chạy **riêng lẻ**, không phụ thuộc vào test case khác. Giống như mỗi công thức nấu ăn hoàn chỉnh -- không cần "nấu món A trước rồi mới nấu được món B".

```
# SAI -- TC_002 phụ thuộc TC_001
# Nếu TC_001 fail --> TC_002 cũng không chạy được --> domino effect
TC_001: Create user         <-- TC_002 cần user này
TC_002: Edit user profile   <-- Nếu TC_001 fail, TC_002 cũng fail

# ĐÚNG -- mỗi TC tự chuẩn bị điều kiện qua Precondition
TC_001: Create user
  Precondition: Không cần (tạo mới)
TC_002: Edit user profile
  Precondition: User "test_user" đã tồn tại trong hệ thống
  (Dù TC_001 fail, TC_002 vẫn chạy được vì user đã có sẵn trong test data)
```

### Nguyên tắc 4: Bao gồm cả Positive lẫn Negative

**Positive test** (Happy path): Hệ thống hoạt động đúng khi input đúng. **Negative test** (Unhappy path): Hệ thống xử lý đúng khi input sai.

```
# Positive -- "Nấu đúng cách, phở phải ngon"
- Login với valid credentials --> redirect tới Dashboard
- Add to cart --> badge count tăng lên 1

# Negative -- "Bỏ muối quá tay, hệ thống phải cảnh báo"
- Login với wrong password --> hiện error message
- Login để trống email --> hiện "Email is required"
- Login nhập SQL injection ('; DROP TABLE users;--) --> hiện error, KHÔNG bị hack
- Checkout với giỏ hàng rỗng --> nút Checkout bị disabled
```

:::tip Aha moment
Khoảng **40-60% bugs** đến từ negative cases -- những thứ user **không nên làm** nhưng **sẽ làm**. Người dùng luôn sáng tạo hơn bạn nghĩ. Test cả hai mặt mới gọi là test đầy đủ.
:::

### Nguyên tắc 5: Test Data cụ thể, không mơ hồ

```
# SAI -- "Một email hợp lệ" là email gì? Ai biết?
Test Data: Nhập một email hợp lệ

# ĐÚNG -- ghi rõ giá trị, ai chạy cũng dùng cùng data
Test Data: Email = "test_user_01@mail.com", Password = "Test@123"
```

---

## Ví dụ thực tế 1: Login Feature

### Requirement gốc

```
User Story: As a registered user, I want to login with email and password
so that I can access my account.

Acceptance Criteria (Tiêu chí chấp nhận):
1. Email và password là required fields (bắt buộc điền)
2. Email phải đúng format (có @ và domain)
3. Password tối thiểu 8 ký tự
4. Login thành công --> redirect tới Dashboard
5. Login thất bại --> hiện error message
6. Sai password 5 lần liên tiếp --> khóa tài khoản
7. "Remember me" giữ session 30 ngày
```

### TC_LOGIN_001: Login thành công

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_001 |
| **Title** | Verify successful login with valid credentials |
| **Priority** | High |
| **Precondition** | User account tồn tại: test@mail.com / Pass@123 |
| **Module** | Authentication |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Truy cập /login | Trang Login hiển thị: Email field, Password field, Login button |
| 2 | Nhập "test@mail.com" vào field Email | Email field hiển thị giá trị đã nhập |
| 3 | Nhập "Pass@123" vào field Password | Password field hiển thị dạng dots (ẩn) |
| 4 | Click button "Login" | Loading indicator hiện ngắn |
| 5 | -- | User redirect tới /dashboard |
| 6 | -- | Welcome message "Hello, Test User" hiển thị |
| 7 | -- | Avatar/tên user hiện trên header |

### TC_LOGIN_002: Login với email trống

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_002 |
| **Title** | Verify error when email field is empty |
| **Priority** | High |
| **Precondition** | Đang ở trang /login |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Để trống field Email | -- |
| 2 | Nhập "Pass@123" vào field Password | -- |
| 3 | Click "Login" | Error "Email is required" hiện dưới field Email, màu đỏ |
| 4 | -- | User vẫn ở trang /login (không redirect) |
| 5 | -- | Field Password KHÔNG bị xóa |

### TC_LOGIN_003: Login sai password

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_003 |
| **Title** | Verify error message with incorrect password |
| **Priority** | High |
| **Precondition** | User account tồn tại: test@mail.com / Pass@123 |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Nhập "test@mail.com" vào Email | -- |
| 2 | Nhập "WrongPass@999" vào Password | -- |
| 3 | Click "Login" | Error "Invalid email or password" hiển thị |
| 4 | -- | Error KHÔNG tiết lộ field nào sai (bảo mật) |
| 5 | -- | Field Password bị xóa trắng |

### TC_LOGIN_004: Khóa tài khoản sau 5 lần sai

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_004 |
| **Title** | Verify account locks after 5 consecutive wrong passwords |
| **Priority** | Medium |
| **Precondition** | User account tồn tại, chưa bị khóa |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login sai password (lần 1) | Error "Invalid email or password" |
| 2 | Login sai password (lần 2) | Error "Invalid email or password" |
| 3 | Login sai password (lần 3) | Error "Invalid email or password. 2 attempts remaining" |
| 4 | Login sai password (lần 4) | Error "Invalid email or password. 1 attempt remaining" |
| 5 | Login sai password (lần 5) | Error "Account locked. Contact support" |
| 6 | Login đúng password | Vẫn bị khóa: "Account locked. Contact support" |

---

## Ví dụ thực tế 2: E-commerce Checkout

### TC_CHECKOUT_001: Checkout thành công

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login với tài khoản registered user | Trang Dashboard hiển thị |
| 2 | Add "iPhone 15" vào giỏ hàng | Cart badge hiện "1" |
| 3 | Click Cart icon, chọn "Proceed to Checkout" | Trang Checkout với order summary |
| 4 | Verify order summary | Tên sản phẩm, số lượng, giá đúng |
| 5 | Điền shipping: "123 Nguyen Hue, Q1, HCM" | Address lưu thành công |
| 6 | Chọn payment: Credit Card | Form thanh toán hiện ra |
| 7 | Nhập card: 4111 1111 1111 1111, exp 12/28, CVV 123 | Card được accept |
| 8 | Click "Place Order" | Trang Order Confirmation hiển thị |
| 9 | Verify order ID | Format "ORD-XXXXXXXX" |
| 10 | Check email confirmation | Email với order details được gửi |

### TC_CHECKOUT_002: Checkout giỏ hàng rỗng

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login với registered user | Dashboard |
| 2 | Vào /cart (không có item nào) | Trang giỏ hàng trống |
| 3 | Click nút "Checkout" | Nút bị disabled HOẶC message "Your cart is empty" |

### TC_CHECKOUT_003: Áp dụng coupon code

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add sản phẩm 500,000d vào giỏ | Cart total: 500,000d |
| 2 | Nhập coupon "SALE20" | Message "Coupon applied" |
| 3 | Verify discount | Giảm: -100,000d (20%) |
| 4 | Verify tổng tiền | Total: 400,000d |
| 5 | Nhập thêm coupon "FREESHIP" | Message "Only 1 coupon allowed" |
| 6 | Xóa coupon "SALE20" | Total quay lại 500,000d |

---

## Hệ thống Priority -- "Nấu món nào trước?"

Khi thời gian có hạn (và luôn luôn có hạn), bạn cần biết **test case nào chạy trước**.

| Priority | Tiêu chí | Ví dụ | Regression? |
|---|---|---|---|
| **Critical** | Core business flow -- mất tiền nếu lỗi | Login, Checkout, Payment | Luôn luôn chạy |
| **High** | Feature quan trọng, ảnh hưởng nhiều user | Search, Add to Cart, Profile | Luôn luôn chạy |
| **Medium** | Feature bình thường, có cách khác thay thế | Filter, Sort, Wishlist | Chọn lọc |
| **Low** | Nhỏ, cosmetic, edge case hiếm gặp | Tooltip, hover effect, icon alignment | Hiếm khi |

:::tip Aha moment
Quy tắc **80/20**: 80% bugs nghiêm trọng nằm trong 20% test cases **Critical + High**. Khi deadline gấp, chạy Critical trước, High sau, Medium nếu còn thời gian. Low chỉ khi rảnh.
:::

---

## Test Case Review Checklist -- Kiểm tra trước khi submit

Trước khi gửi test cases cho team review, tự check:

- [ ] Mỗi test case có **1 mục đích rõ ràng** (không test 2 thứ trong 1 TC)
- [ ] Steps **cụ thể** -- người mới vào team cũng execute được
- [ ] Expected results **không mơ hồ** -- verify được Pass/Fail
- [ ] Có cả **positive và negative** cases
- [ ] Test data **cụ thể** (không phải "nhập một email hợp lệ")
- [ ] Preconditions **đầy đủ** -- không thiếu setup nào
- [ ] Cover hết **Acceptance Criteria** từ User Story
- [ ] Không **trùng lặp** với test cases khác
- [ ] **Priority** hợp lý (Critical/High/Medium/Low)
- [ ] Đã áp dụng **test design techniques** (EP, BVA, Decision Table...)

---

## Tóm tắt -- Công thức viết Test Case ngon

| Aspect | Best Practice | Tương đương Nấu ăn |
|---|---|---|
| **Structure** | ID, Title, Precondition, Steps, Data, Expected | Tên món, nguyên liệu, cách làm |
| **Steps** | 1 step = 1 action, cụ thể | Mỗi bước nấu tách riêng |
| **Expected** | Cụ thể, đo được, không mơ hồ | Mô tả rõ thành phẩm |
| **Independence** | Mỗi TC chạy độc lập | Mỗi công thức hoàn chỉnh |
| **Coverage** | Positive + Negative + Edge cases | Nấu đúng + Nấu sai + Nấu lạ |
| **Priority** | Critical, High, Medium, Low | Món chính trước, tráng miệng sau |
| **Review** | Tự check trước khi submit | Nếm thử trước khi bưng ra |
