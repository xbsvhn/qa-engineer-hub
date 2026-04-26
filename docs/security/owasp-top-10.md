# OWASP Top 10

## OWASP là gì?

OWASP (Open Web Application Security Project) là tổ chức phi lợi nhuận cung cấp tài liệu, tools, và standards về bảo mật web. **OWASP Top 10** là danh sách 10 lỗ hổng bảo mật **phổ biến nhất** — cập nhật định kỳ.

---

## OWASP Top 10 (2021)

### A01: Broken Access Control

**Bản chất:** User truy cập dữ liệu/chức năng **không được phép**.

**QA cách test:**

```
1. IDOR (Insecure Direct Object Reference):
   - Login as User A (id=1)
   - Gọi API: GET /api/users/2  → Xem được data User B?
   - Gọi API: PUT /api/users/2  → Sửa được data User B?
   → Expected: 403 Forbidden

2. Privilege Escalation:
   - Login as normal user
   - Gọi API: GET /api/admin/dashboard → Truy cập được?
   - Đổi URL: /admin/settings → Hiển thị trang admin?
   → Expected: 403 Forbidden

3. URL Manipulation:
   - Đổi /orders/123 thành /orders/124
   - Xem được order của người khác?
   → Expected: 403 hoặc 404
```

---

### A02: Cryptographic Failures

**Bản chất:** Dữ liệu nhạy cảm không được mã hóa đúng cách.

**QA cách test:**

```
1. Password trong API response:
   - Gọi GET /api/users/me
   - Response có chứa "password" field không?
   → Expected: Không bao giờ trả về password

2. HTTPS enforcement:
   - Truy cập http://example.com (không có 's')
   - Có redirect sang https:// không?
   → Expected: Auto redirect to HTTPS

3. Sensitive data trong URL:
   - URL có chứa token, password, credit card?
   - Ví dụ: /reset-password?token=abc123&email=user@mail.com
   → Thông tin nhạy cảm nên ở body, không ở URL
```

---

### A03: Injection

**Bản chất:** Kẻ tấn công chèn mã độc vào input → hệ thống thực thi mã đó.

**QA cách test:**

```
SQL Injection — Thử nhập vào mọi input field:
  ' OR 1=1 --
  '; DROP TABLE users; --
  admin'--

XSS (Cross-Site Scripting) — Thử nhập:
  <script>alert('XSS')</script>
  <img src=x onerror=alert('XSS')>
  javascript:alert('XSS')

Expected:
  - Input bị reject hoặc escaped (hiển thị text thường)
  - KHÔNG execute script
  - Server trả về 400, KHÔNG 500
  - Nếu nhận 500 → BUG nghiêm trọng!
```

**Ví dụ test Login form:**

| Input | Field | Expected |
|---|---|---|
| `' OR 1=1 --` | Email | "Invalid email format" (400) |
| `<script>alert(1)</script>` | Name | Text hiển thị bình thường, không execute |
| `Robert'; DROP TABLE users;--` | Search | Trả về 0 results, database vẫn còn |

---

### A04: Insecure Design

**Bản chất:** Thiết kế thiếu security controls từ đầu.

**QA cách test:**

```
1. Rate limiting:
   - Gửi 100 login requests trong 1 phút
   - Có bị block không? (Expected: Block sau 5-10 lần)

2. Business logic flaws:
   - Đặt hàng với giá âm?
   - Apply coupon 100 lần?
   - Transfer tiền nhiều hơn số dư?

3. Missing authentication:
   - API endpoints nào không cần token?
   - Có endpoint "quên" check auth không?
```

---

### A05: Security Misconfiguration

**Bản chất:** Cấu hình mặc định, thiếu hardening.

**QA cách test:**

```
1. Default credentials:
   - Thử login admin/admin, admin/password, root/root

2. Error messages:
   - Gửi request sai → Server trả về stack trace?
   - Error có lộ thông tin internal (DB name, file paths)?
   → Expected: Generic error message, không lộ internal info

3. Unnecessary endpoints:
   - /debug, /test, /phpinfo, /swagger (trên production)
   - Có endpoint nào không nên expose?

4. HTTP Headers:
   - X-Powered-By header có lộ technology?
   - CORS policy đúng chưa?
```

---

### A06: Vulnerable Components

**Bản chất:** Sử dụng thư viện/framework có lỗ hổng đã biết.

**QA cách test:**

```bash
# Kiểm tra dependencies có vulnerability
npm audit                    # Node.js projects
pip audit                    # Python projects
```

Thường được tích hợp vào CI/CD bằng tools như **Snyk**, **Dependabot**.

---

### A07: Authentication Failures

**Bản chất:** Xác thực yếu, cho phép brute force, session management kém.

**QA cách test:**

```
1. Brute force protection:
   - Login sai 10 lần → Account locked? CAPTCHA?

2. Password policy:
   - Tạo password "123" → Cho phép? (Should reject)
   - Tạo password "password" → Cho phép? (Should reject)

3. Session management:
   - Login → copy token → logout → dùng token cũ
   → Expected: Token cũ bị invalidate (401)

4. Token expiry:
   - Đợi token expire → gọi API
   → Expected: 401 Unauthorized

5. Password reset:
   - Reset link có expire không?
   - Dùng reset link 2 lần → lần 2 có blocked?
```

---

### A08-A10: Tóm tắt

| # | Vulnerability | QA Quick Check |
|---|---|---|
| **A08** | Data Integrity Failures | Deserialization attacks, unsigned updates |
| **A09** | Logging & Monitoring | Failed logins có được log? Alert khi brute force? |
| **A10** | SSRF | Server gọi internal URLs từ user input? |

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

| Vulnerability | QA Quick Test |
|---|---|
| **Broken Access** | User A xem data User B? |
| **Crypto Failures** | Password trong response? HTTPS? |
| **Injection** | `' OR 1=1 --` và `<script>alert(1)</script>` |
| **Insecure Design** | Rate limit? Business logic flaws? |
| **Misconfiguration** | Default creds? Stack trace in errors? |
| **Vulnerable Deps** | `npm audit` |
| **Auth Failures** | Brute force? Token expiry? |
