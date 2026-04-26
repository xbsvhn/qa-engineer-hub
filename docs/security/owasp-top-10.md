# OWASP Top 10

## OWASP la gi?

**OWASP** (Open Web Application Security Project) la to chuc phi loi nhuan cung cap tai lieu ve bao mat web. **OWASP Top 10** la danh sach **10 lo hong bao mat pho bien nhat** -- giong nhu "Top 10 benh thuong gap" ma bac si nao cung phai biet.

::: tip Aha moment
Hieu OWASP Top 10 giong nhu biet 10 thu thuat an trom pho bien nhat. Ban khong can la canh sat, nhung biet cach ke trom lam giup ban **khoa cua dung cho**.
:::

---

## A01: Broken Access Control -- "Nham phong"

### An du

Tuong tuong khach san co 100 phong. Ban o phong 101, nhung doi so phong thanh 102 tren the tu --> vao duoc phong nguoi khac!

### Ban chat

User truy cap du lieu/chuc nang **KHONG DUOC PHEP**. Day la lo hong **pho bien nhat** (#1).

### QA cach test

```
1. IDOR (Insecure Direct Object Reference):
   "Doi so phong tren the tu"

   - Login as User A (id=1)
   - Goi API: GET /api/users/2      --> Xem duoc data User B?
   - Goi API: PUT /api/users/2      --> SUA duoc data User B?
   - Goi API: DELETE /api/orders/999 --> XOA duoc order nguoi khac?
   --> Expected: 403 Forbidden

2. Privilege Escalation:
   "Nhan vien gia lam giam doc"

   - Login as normal user
   - Goi API: GET /api/admin/dashboard   --> Truy cap duoc?
   - Doi URL: /admin/settings            --> Hien thi trang admin?
   --> Expected: 403 Forbidden

3. URL Manipulation:
   "Doi so de xem cua nguoi khac"

   - Doi /orders/123 thanh /orders/124
   - Xem duoc order cua nguoi khac?
   --> Expected: 403 hoac 404
```

---

## A02: Cryptographic Failures -- "Viet mat khau len giay roi dan o cua"

### An du

Ban ghi password ra giay va dan tren man hinh laptop. Ai di ngang cung doc duoc. Day la cryptographic failure -- du lieu nhay cam khong duoc bao ve dung cach.

### QA cach test

```
1. Password trong API response:
   - Goi GET /api/users/me
   - Response co chua "password" field khong?
   --> Expected: KHONG BAO GIO tra ve password

2. HTTPS enforcement:
   - Truy cap http://example.com (KHONG co 's')
   - Co tu dong redirect sang https:// khong?
   --> Expected: Auto redirect to HTTPS
   (http = giao tiep bang "tho" -- ai cung doc duoc.
    https = giao tiep bang "thu mat ma" -- chi 2 ben hieu)

3. Sensitive data trong URL:
   - URL co chua token, password, credit card?
   - Vi du: /reset-password?token=abc123&email=user@mail.com
   --> Thong tin nhay cam nen o BODY, khong o URL
   (URL duoc luu trong browser history, server logs -- de lo)
```

---

## A03: Injection -- "Viet them lenh vao phieu goi mon"

### An du: SQL Injection

Ban vao nha hang, ghi phieu goi mon: "Pho bo". Nhung ke xau ghi: **"Pho bo VA DONG THOI cho toi tat ca mon cua ban khac"**. Nha hang (database) doc phieu va **lam theo** -- tra ve data cua moi nguoi!

### An du: XSS (Cross-Site Scripting)

Ke xau **gian camera an vao menu** nha hang. Khach hang mo menu (trang web), camera **tu dong bat** va quay lai moi thu khach lam. XSS = chen code doc vao trang web de "theo doi" nguoi dung khac.

### QA cach test

```
SQL Injection -- thu nhap vao MOI input field:
  ' OR 1=1 --
  '; DROP TABLE users; --
  admin'--

XSS -- thu nhap vao MOI input field:
  <script>alert('XSS')</script>
  <img src=x onerror=alert('XSS')>
  javascript:alert('XSS')

Expected:
  - Input bi reject hoac escaped (hien thi dang text binh thuong)
  - KHONG execute script
  - Server tra ve 400 (Bad Request), KHONG phai 500
  - Neu nhan 500 --> BUG NGHIEM TRONG! (Server khong xu ly duoc input la)
```

**Vi du test Login form:**

| Input | Field | Expected |
|---|---|---|
| `' OR 1=1 --` | Email | "Invalid email format" (400) |
| `<script>alert(1)</script>` | Name | Text hien thi binh thuong, KHONG execute |
| `Robert'; DROP TABLE users;--` | Search | Tra ve 0 results, database VAN CON |

::: tip Aha moment
SQL Injection nghe phuc tap, nhung **cach test rat don gian**: nhap `' OR 1=1 --` vao bat ky input field nao va xem chuyen gi xay ra. Neu app bi loi 500 hoac tra ve data la --> co lo hong.
:::

---

## A04: Insecure Design -- "Nha hang khong co cua khoa"

### Ban chat

Thiet ke **thieu security controls tu dau**. Khong phai bug trong code, ma la **thieu tinh nang bao mat**.

### QA cach test

```
1. Rate limiting (gioi han so lan thu):
   - Gui 100 login requests trong 1 phut
   - Co bi block khong?
   --> Expected: Block sau 5-10 lan
   (Neu khong co rate limit, hacker co the thu 1 trieu password)

2. Business logic flaws ("lo hong logic"):
   - Dat hang voi gia AM? (-100 VND)
   - Apply coupon 100 lan?
   - Transfer tien NHIEU HON so du?
   - Doi quantity thanh 0 roi checkout?

3. Missing authentication:
   - API endpoints nao KHONG can token?
   - Co endpoint nao "quen" check auth khong?
   - Thu goi API ma khong gui token --> tra ve data?
```

---

## A05: Security Misconfiguration -- "De chim khoa trong o khoa"

### Ban chat

Cau hinh mac dinh, thieu hardening. Giong nhu mua nha moi nhung khong doi mat khau cua khoa -- ai co chim khoa mac dinh deu vao duoc.

### QA cach test

```
1. Default credentials (mat khau mac dinh):
   - Thu login: admin/admin, admin/password, root/root
   - Thu login: admin/123456, test/test
   --> Expected: TAT CA deu bi reject

2. Error messages (thong bao loi lo thong tin):
   - Gui request sai --> Server tra ve stack trace?
   - Error co lo database name, file paths, version?
   --> Expected: Generic error message
   --> KHONG: "MySQL error at /var/www/app/models/user.php line 42"

3. Unnecessary endpoints (endpoint khong can thiet):
   - Thu truy cap: /debug, /test, /phpinfo, /swagger
   - Tren PRODUCTION co endpoint nao khong nen expose?
   --> Expected: 404 Not Found

4. HTTP Headers:
   - X-Powered-By header co lo technology? (Express, PHP)
   - CORS policy: co cho phep * (tat ca domain) khong?
```

---

## A06: Vulnerable Components -- "Dung o khoa da bi be"

### Ban chat

Su dung thu vien/framework co lo hong DA BIET. Giong nhu dung o khoa ma trom da biet cach mo.

### QA cach test

```bash
# Kiem tra dependencies co lo hong
npm audit                    # Node.js projects
pip audit                    # Python projects

# Output vi du:
# High severity: Prototype Pollution in lodash < 4.17.21
# Fix: npm audit fix
```

Thuong duoc tich hop vao CI/CD bang tools nhu **Snyk**, **Dependabot** -- tu dong tao PR khi co lo hong.

---

## A07: Authentication Failures -- "O khoa de be"

### Ban chat

Xac thuc yeu, cho phep brute force, session management kem. Giong nhu cua nha dung o khoa so, chi co 4 so --> ke trom thu 10,000 to hop la mo duoc.

### QA cach test

```
1. Brute force protection:
   - Login sai 10 lan lien tuc
   --> Expected: Account locked hoac CAPTCHA
   (Neu khong co --> hacker co the thu hang trieu password)

2. Password policy:
   - Tao password "123"      --> Cho phep? (Should REJECT)
   - Tao password "password" --> Cho phep? (Should REJECT)
   - Tao password "aA1@xxxx" --> Chap nhan (du manh)

3. Session management:
   - Login --> copy token --> logout --> dung token cu
   --> Expected: Token cu bi invalidate (tra ve 401)

4. Token expiry:
   - Doi token het han --> goi API
   --> Expected: 401 Unauthorized
   (Token khong het han = neu bi lo, hacker dung MAI DUOC)

5. Password reset:
   - Reset link co expire khong? (nen het han sau 15-30 phut)
   - Dung reset link 2 lan --> lan 2 co bi block?
```

---

## A08-A10: Tom tat

| # | Vulnerability | An du | QA Quick Check |
|---|---|---|---|
| **A08** | Data Integrity Failures | Nhan hang nhung khong kiem tra con nguyen phong bi | Deserialization attacks, unsigned updates |
| **A09** | Logging & Monitoring | Khong co camera an ninh | Failed logins co duoc log? Alert khi brute force? |
| **A10** | SSRF (Server-Side Request Forgery) | Nho nhan vien nha hang goi dien den kho bi mat | Server goi internal URLs tu user input? |

---

## Security Testing Checklist cho QA

### Moi Sprint

- [ ] Thu SQL injection tren form moi
- [ ] Thu XSS tren input fields moi
- [ ] Check access control cho API endpoints moi
- [ ] Verify sensitive data khong lo trong response
- [ ] Verify error messages khong lo internal info

### Moi Release

- [ ] `npm audit` / dependency check
- [ ] Test brute force protection
- [ ] Test session/token management
- [ ] HTTPS enforcement
- [ ] CORS policy review

---

## Tom tat chuong

| Vulnerability | An du | QA Quick Test |
|---|---|---|
| **Broken Access** | Nham phong khach san | User A xem data User B? |
| **Crypto Failures** | Viet password len giay | Password trong response? HTTPS? |
| **Injection** | Viet them lenh vao phieu goi mon | `' OR 1=1 --` va `<script>alert(1)</script>` |
| **Insecure Design** | Nha hang khong co khoa | Rate limit? Business logic flaws? |
| **Misconfiguration** | De chim khoa trong o khoa | Default creds? Stack trace? |
| **Vulnerable Deps** | Dung o khoa da bi be | `npm audit` |
| **Auth Failures** | O khoa de be | Brute force? Token expiry? |
