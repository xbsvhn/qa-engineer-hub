# OWASP Top 10

## OWASP là gì?

**OWASP** (Open Web Application Security Project) là tổ chức phi lợi nhuận cung cấp tài liệu về bảo mật web. **OWASP Top 10** là danh sách **10 lỗ hổng bảo mật phổ biến nhất** -- giống như "Top 10 bệnh thường gặp" mà bác sĩ nào cũng phải biết.

::: tip Aha moment
Hiểu OWASP Top 10 giống như biết 10 thủ thuật ăn trộm phổ biến nhất. Bạn không cần là cảnh sát, nhưng biết cách kẻ trộm làm giúp bạn **khóa cửa đúng chỗ**.
:::

---

## A01: Broken Access Control -- "Nhầm phòng"

### Ẩn dụ

Tưởng tượng khách sạn có 100 phòng. Bạn ở phòng 101, nhưng đổi số phòng thành 102 trên thẻ từ --> vào được phòng người khác!

### Bản chất

User truy cập dữ liệu/chức năng **KHÔNG ĐƯỢC PHÉP**. Đây là lỗ hổng **phổ biến nhất** (#1).

### QA cách test

```
1. IDOR (Insecure Direct Object Reference):
   "Đổi số phòng trên thẻ từ"

   - Login as User A (id=1)
   - Gọi API: GET /api/users/2      --> Xem được data User B?
   - Gọi API: PUT /api/users/2      --> SỬA được data User B?
   - Gọi API: DELETE /api/orders/999 --> XÓA được order người khác?
   --> Expected: 403 Forbidden

2. Privilege Escalation:
   "Nhân viên giả làm giám đốc"

   - Login as normal user
   - Gọi API: GET /api/admin/dashboard   --> Truy cập được?
   - Đổi URL: /admin/settings            --> Hiển thị trang admin?
   --> Expected: 403 Forbidden

3. URL Manipulation:
   "Đổi số để xem của người khác"

   - Đổi /orders/123 thành /orders/124
   - Xem được order của người khác?
   --> Expected: 403 hoặc 404
```

---

## A02: Cryptographic Failures -- "Viết mật khẩu lên giấy rồi dán ở cửa"

### Ẩn dụ

Bạn ghi password ra giấy và dán trên màn hình laptop. Ai đi ngang cũng đọc được. Đây là cryptographic failure -- dữ liệu nhạy cảm không được bảo vệ đúng cách.

### QA cách test

```
1. Password trong API response:
   - Gọi GET /api/users/me
   - Response có chứa "password" field không?
   --> Expected: KHÔNG BAO GIỜ trả về password

2. HTTPS enforcement:
   - Truy cập http://example.com (KHÔNG có 's')
   - Có tự động redirect sang https:// không?
   --> Expected: Auto redirect to HTTPS
   (http = giao tiếp bằng "thư" -- ai cũng đọc được.
    https = giao tiếp bằng "thư mật mã" -- chỉ 2 bên hiểu)

3. Sensitive data trong URL:
   - URL có chứa token, password, credit card?
   - Ví dụ: /reset-password?token=abc123&email=user@mail.com
   --> Thông tin nhạy cảm nên ở BODY, không ở URL
   (URL được lưu trong browser history, server logs -- dễ lộ)
```

---

## A03: Injection -- "Viết thêm lệnh vào phiếu gọi món"

### Ẩn dụ: SQL Injection

Bạn vào nhà hàng, ghi phiếu gọi món: "Phở bò". Nhưng kẻ xấu ghi: **"Phở bò VÀ ĐỒNG THỜI cho tôi tất cả món của bàn khác"**. Nhà hàng (database) đọc phiếu và **làm theo** -- trả về data của mọi người!

### Ẩn dụ: XSS (Cross-Site Scripting)

Kẻ xấu **giấn camera ẩn vào menu** nhà hàng. Khách hàng mở menu (trang web), camera **tự động bật** và quay lại mọi thứ khách làm. XSS = chèn code độc vào trang web để "theo dõi" người dùng khác.

### QA cách test

```
SQL Injection -- thử nhập vào MỌI input field:
  ' OR 1=1 --
  '; DROP TABLE users; --
  admin'--

XSS -- thử nhập vào MỌI input field:
  <script>alert('XSS')</script>
  <img src=x onerror=alert('XSS')>
  javascript:alert('XSS')

Expected:
  - Input bị reject hoặc escaped (hiển thị dạng text bình thường)
  - KHÔNG execute script
  - Server trả về 400 (Bad Request), KHÔNG phải 500
  - Nếu nhận 500 --> BUG NGHIÊM TRỌNG! (Server không xử lý được input lạ)
```

**Ví dụ test Login form:**

| Input | Field | Expected |
|---|---|---|
| `' OR 1=1 --` | Email | "Invalid email format" (400) |
| `<script>alert(1)</script>` | Name | Text hiển thị bình thường, KHÔNG execute |
| `Robert'; DROP TABLE users;--` | Search | Trả về 0 results, database VẪN CÒN |

::: tip Aha moment
SQL Injection nghe phức tạp, nhưng **cách test rất đơn giản**: nhập `' OR 1=1 --` vào bất kỳ input field nào và xem chuyện gì xảy ra. Nếu app bị lỗi 500 hoặc trả về data lạ --> có lỗ hổng.
:::

---

## A04: Insecure Design -- "Nhà hàng không có cửa khóa"

### Bản chất

Thiết kế **thiếu security controls từ đầu**. Không phải bug trong code, mà là **thiếu tính năng bảo mật**.

### QA cách test

```
1. Rate limiting (giới hạn số lần thử):
   - Gửi 100 login requests trong 1 phút
   - Có bị block không?
   --> Expected: Block sau 5-10 lần
   (Nếu không có rate limit, hacker có thể thử 1 triệu password)

2. Business logic flaws ("lỗ hổng logic"):
   - Đặt hàng với giá ÂM? (-100 VND)
   - Apply coupon 100 lần?
   - Transfer tiền NHIỀU HƠN số dư?
   - Đổi quantity thành 0 rồi checkout?

3. Missing authentication:
   - API endpoints nào KHÔNG cần token?
   - Có endpoint nào "quên" check auth không?
   - Thử gọi API mà không gửi token --> trả về data?
```

---

## A05: Security Misconfiguration -- "Để chìm khóa trong ổ khóa"

### Bản chất

Cấu hình mặc định, thiếu hardening. Giống như mua nhà mới nhưng không đổi mật khẩu của khóa -- ai có chìm khóa mặc định đều vào được.

### QA cách test

```
1. Default credentials (mật khẩu mặc định):
   - Thử login: admin/admin, admin/password, root/root
   - Thử login: admin/123456, test/test
   --> Expected: TẤT CẢ đều bị reject

2. Error messages (thông báo lỗi lộ thông tin):
   - Gửi request sai --> Server trả về stack trace?
   - Error có lộ database name, file paths, version?
   --> Expected: Generic error message
   --> KHÔNG: "MySQL error at /var/www/app/models/user.php line 42"

3. Unnecessary endpoints (endpoint không cần thiết):
   - Thử truy cập: /debug, /test, /phpinfo, /swagger
   - Trên PRODUCTION có endpoint nào không nên expose?
   --> Expected: 404 Not Found

4. HTTP Headers:
   - X-Powered-By header có lộ technology? (Express, PHP)
   - CORS policy: có cho phép * (tất cả domain) không?
```

---

## A06: Vulnerable Components -- "Dùng ổ khóa đã bị bẻ"

### Bản chất

Sử dụng thư viện/framework có lỗ hổng ĐÃ BIẾT. Giống như dùng ổ khóa mà trộm đã biết cách mở.

### QA cách test

```bash
# Kiểm tra dependencies có lỗ hổng
npm audit                    # Node.js projects
pip audit                    # Python projects

# Output ví dụ:
# High severity: Prototype Pollution in lodash < 4.17.21
# Fix: npm audit fix
```

Thường được tích hợp vào CI/CD bằng tools như **Snyk**, **Dependabot** -- tự động tạo PR khi có lỗ hổng.

---

## A07: Authentication Failures -- "Ổ khóa dễ bẻ"

### Bản chất

Xác thực yếu, cho phép brute force, session management kém. Giống như cửa nhà dùng ổ khóa số, chỉ có 4 số --> kẻ trộm thử 10,000 tổ hợp là mở được.

### QA cách test

```
1. Brute force protection:
   - Login sai 10 lần liên tục
   --> Expected: Account locked hoặc CAPTCHA
   (Nếu không có --> hacker có thể thử hàng triệu password)

2. Password policy:
   - Tạo password "123"      --> Cho phép? (Should REJECT)
   - Tạo password "password" --> Cho phép? (Should REJECT)
   - Tạo password "aA1@xxxx" --> Chấp nhận (đủ mạnh)

3. Session management:
   - Login --> copy token --> logout --> dùng token cũ
   --> Expected: Token cũ bị invalidate (trả về 401)

4. Token expiry:
   - Đợi token hết hạn --> gọi API
   --> Expected: 401 Unauthorized
   (Token không hết hạn = nếu bị lộ, hacker dùng MÃI ĐƯỢC)

5. Password reset:
   - Reset link có expire không? (nên hết hạn sau 15-30 phút)
   - Dùng reset link 2 lần --> lần 2 có bị block?
```

---

## A08-A10: Tóm tắt

| # | Vulnerability | Ẩn dụ | QA Quick Check |
|---|---|---|---|
| **A08** | Data Integrity Failures | Nhận hàng nhưng không kiểm tra còn nguyên phong bì | Deserialization attacks, unsigned updates |
| **A09** | Logging & Monitoring | Không có camera an ninh | Failed logins có được log? Alert khi brute force? |
| **A10** | SSRF (Server-Side Request Forgery) | Nhờ nhân viên nhà hàng gọi điện đến kho bí mật | Server gọi internal URLs từ user input? |

---

## Security Testing Checklist cho QA

### Mỗi Sprint

- [ ] Thử SQL injection trên form mới
- [ ] Thử XSS trên input fields mới
- [ ] Check access control cho API endpoints mới
- [ ] Verify sensitive data không lộ trong response
- [ ] Verify error messages không lộ internal info

### Mỗi Release

- [ ] `npm audit` / dependency check
- [ ] Test brute force protection
- [ ] Test session/token management
- [ ] HTTPS enforcement
- [ ] CORS policy review

---

## Tóm tắt chương

| Vulnerability | Ẩn dụ | QA Quick Test |
|---|---|---|
| **Broken Access** | Nhầm phòng khách sạn | User A xem data User B? |
| **Crypto Failures** | Viết password lên giấy | Password trong response? HTTPS? |
| **Injection** | Viết thêm lệnh vào phiếu gọi món | `' OR 1=1 --` và `<script>alert(1)</script>` |
| **Insecure Design** | Nhà hàng không có khóa | Rate limit? Business logic flaws? |
| **Misconfiguration** | Để chìm khóa trong ổ khóa | Default creds? Stack trace? |
| **Vulnerable Deps** | Dùng ổ khóa đã bị bẻ | `npm audit` |
| **Auth Failures** | Ổ khóa dễ bẻ | Brute force? Token expiry? |
