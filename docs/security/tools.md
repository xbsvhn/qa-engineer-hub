# Security Testing Tools

## Bản chất: SAST vs DAST = Kiểm tra bản vẽ vs Kiểm tra nhà thật

Trước khi hiểu các tools, bạn cần hiểu 2 cách tiếp cận bảo mật:

| | SAST (Static) | DAST (Dynamic) |
|---|---|---|
| **Ẩn dụ** | **Kiểm tra bản vẽ** nhà trước khi xây | **Kiểm tra nhà đã xây** xong (thử phá cửa) |
| **Khi nào** | Scan source code (trước khi chạy) | Scan app ĐANG CHẠY |
| **Input** | Source code, dependencies | URL của app |
| **Tìm được** | Code vulnerabilities, insecure patterns | Runtime vulnerabilities, config issues |
| **Ưu điểm** | Phát hiện SỚM, trong CI/CD | Tìm REAL vulnerabilities |
| **Nhược điểm** | False positives nhiều (báo động giả) | Cần app đang chạy |
| **Tools** | SonarQube, Snyk, ESLint Security | OWASP ZAP, Burp Suite |

```
Development Pipeline:
Code --> SAST scan --> Build --> Deploy --> DAST scan --> Release
         (Snyk)                            (OWASP ZAP)

SAST = "xem bản vẽ tìm lỗi"      (phát hiện sớm, rẻ)
DAST = "đào vào nhà thử phá"     (phát hiện muộn hơn, nhưng chính xác hơn)
```

::: tip Aha moment
SAST và DAST **bổ sung cho nhau**, không thay thế nhau. SAST tìm lỗi trong code (như "ở đây không có khóa"), DAST verify lỗi thật (như "tôi thực sự mở được cửa"). Dùng CẢ HAI để bảo mật tốt nhất.
:::

---

## OWASP ZAP -- Miễn phí, mạnh mẽ

### ZAP là gì?

**OWASP ZAP** (Zed Attack Proxy) là tool **MIỄN PHÍ** để tìm security vulnerabilities trong web applications. Nó hoạt động như một **"người trung gian"** giữa browser và server -- nghe lén mọi request/response và tìm lỗ hổng.

Ẩn dụ: ZAP giống như **máy soi chiếu** ở sân bay. Mỗi "hành lý" (request) đi qua, nó soi và tìm "đồ cấm" (vulnerabilities).

### Cách dùng cơ bản

```
1. Automated Scan (nhanh, dễ):
   - Mở ZAP --> Nhập URL target --> Click "Attack"
   - ZAP tự động:
     a. Crawl toàn bộ website (tìm tất cả các trang)
     b. Gửi payloads độc hại vào mọi input (SQL injection, XSS...)
     c. Phân tích responses
     d. Báo cáo vulnerabilities tìm được
   - Thời gian: 5-30 phút tùy độ lớn website

2. Manual Explore (qua proxy -- chính xác hơn):
   - Set browser proxy --> ZAP (ZAP nghe mọi request)
   - Browse website BÌNH THƯỜNG (login, click, điền form...)
   - ZAP capture và analyze MỌI request/response
   - ZAP highlight các vấn đề tiềm ẩn
   - Sau đó chạy "Active Scan" trên các URLs đã capture

3. Active Scan (tấn công thử):
   - Sau khi explore, chọn URLs cần scan sâu
   - ZAP thử inject payloads (SQL, XSS, path traversal...)
   - Report vulnerabilities với độ nghiêm trọng
```

### ZAP Alerts -- Đọc kết quả

| Risk Level | Màu | Ví dụ | Action |
|---|---|---|---|
| **High** | Đỏ | SQL Injection, Remote Code Execution | Fix NGAY |
| **Medium** | Cam | XSS, Missing Security Headers | Fix trong sprint này |
| **Low** | Vàng | Cookie without HttpOnly flag | Plan fix |
| **Informational** | Xanh | Server version disclosure | Nice to fix |

### CI/CD Integration -- Chạy ZAP tự động

```yaml
# GitHub Actions -- ZAP Scan mỗi đêm
- name: ZAP Full Scan
  uses: zaproxy/action-full-scan@v0.10.0
  with:
    target: 'https://staging.example.com'
    # ^^^ Scan trên STAGING, không phải production!
    rules_file_name: '.zap/rules.tsv'
    # ^^^ File config: alert nào bỏ qua, alert nào báo
    cmd_options: '-a'
    # ^^^ -a = include alpha rules (nhiều checks hơn)
```

---

## Burp Suite -- "Dao Thụy Sĩ" của security testing

### Burp Suite là gì?

**Burp Suite** là tool **phổ biến nhất** cho penetration testing. Giống như "dao Thụy Sĩ" -- nhiều công cụ trong 1.

- **Community Edition**: Miễn phí (đủ cho QA)
- **Professional Edition**: Trả phí (cho security engineers)

### QA dùng Burp Suite để:

| Feature | Ẩn dụ | Mục đích |
|---|---|---|
| **Proxy** | Máy nghe lén | Bắt và xem MỌI request/response |
| **Repeater** | Máy fax | Gửi lại 1 request, sửa trước khi gửi |
| **Intruder** | Máy bơm thử | Tự động gửi hàng ngàn requests (brute force, fuzzing) |
| **Scanner** | Máy soi chiếu (Pro) | Tự động tìm vulnerabilities |

### Ví dụ: Test IDOR với Burp

```
1. Login as User A
2. Bật Burp Proxy --> capture tất cả requests
3. Tìm request: GET /api/orders/123  (order của User A)
4. Click phải --> "Send to Repeater"
5. Trong Repeater, đổi ID: GET /api/orders/124  (order của User B?)
6. Click "Send" --> Xem response
7. Nếu trả về data order 124 --> BUG: IDOR vulnerability!
   (User A KHÔNG nên xem được order của User B)
```

::: tip Aha moment
Burp Repeater là "vũ khí" mạnh nhất của QA khi test security. Bạn bắt 1 request, sửa bất kỳ gì (ID, token, params), gửi lại, và xem server phản ứng sao. Đơn giản nhưng CỰC HIỆU QUẢ.
:::

---

## Snyk -- Bảo vệ cửa trước (Dependency Security)

### Snyk là gì?

**Snyk** scan **dependencies** (npm packages, Python packages...) để tìm lỗ hổng ĐÃ BIẾT. Giống như kiểm tra xem ổ khóa bạn đang dùng có nằm trong "danh sách ổ khóa bị bẻ" không.

```bash
# Cài đặt
npm install -g snyk

# Scan project
snyk test

# Output ví dụ:
# x  High severity vulnerability found in lodash
#    Description: Prototype Pollution
#    Introduced through: lodash@4.17.20
#    Fixed in: lodash@4.17.21        <-- Chỉ cần update lên version này!
#    Path: myapp > lodash
```

### CI/CD Integration

```yaml
# GitHub Actions -- Chạy mỗi PR
- name: Snyk Security Check
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  # Nếu tìm thấy lỗ hổng High/Critical --> pipeline FAIL
  # --> Dev PHẢI fix trước khi merge
```

---

## Các tools khác

| Tool | Loại | Mô tả | Ẩn dụ | Cost |
|---|---|---|---|---|
| **SonarQube** | SAST | Scan code quality + security | "Giáo viên chấm bài" | Free (Community) |
| **ESLint Security** | SAST | Security rules cho JavaScript | "Spell checker cho security" | Free |
| **npm audit** | SCA | Check npm dependencies | "Kiểm tra danh sách thu hồi" | Free (built-in) |
| **Dependabot** | SCA | Tự động tạo PR khi có lỗ hổng | "Bảo vệ tự động" | Free (GitHub) |
| **Lighthouse** | Audit | Security + Performance audit | "Kiểm tra sức khỏe tổng quát" | Free (Chrome) |

**SCA** = Software Composition Analysis -- kiểm tra thư viện bạn đang dùng có an toàn không.

---

## Security Testing Workflow cho QA

```
Hàng ngày:
  +-- Khi test feature mới --> thử basic SQL/XSS injection
      (mất 2 phút, nhưng có thể tìm được lỗ hổng nghiêm trọng)

Mỗi Sprint:
  +-- npm audit --> fix critical vulnerabilities
  +-- OWASP ZAP quick scan trên staging
      (chạy automated scan, đọc report, log bugs)

Mỗi Release:
  +-- OWASP ZAP full scan
  +-- Review security headers
  +-- Test authentication flows (login, logout, token, session)
  +-- IDOR checks trên API endpoints mới

CI/CD Pipeline (tự động):
  +-- Snyk --> check dependencies (mỗi PR)
  +-- SonarQube --> SAST scan (mỗi PR)
  +-- ZAP --> DAST scan (hàng đêm trên staging)
```

::: tip Aha moment
Security testing không phải làm 1 lần rồi xong. Nó là **quy trình liên tục** -- mỗi feature mới có thể tạo lỗ hổng mới. Nhưng chỉ cần **2 phút** thử SQL/XSS trên mỗi form mới là bạn đã làm được 80% công việc.
:::

---

## Tóm tắt chương

| Tool | Ẩn dụ | Loại | QA dùng khi | Cost |
|---|---|---|---|---|
| **OWASP ZAP** | Máy soi chiếu sân bay | DAST | Scan web app tìm lỗ hổng | Free |
| **Burp Suite** | Dao Thụy Sĩ | Proxy/DAST | Bắt request, test IDOR | Free (Community) |
| **Snyk** | Kiểm tra danh sách thu hồi | SCA | Check vulnerable dependencies | Free tier |
| **npm audit** | Kiểm tra nhanh | SCA | Quick dependency check | Free |
| **SonarQube** | Giáo viên chấm bài | SAST | Code quality + security | Free (Community) |
| **SAST** | Kiểm tra bản vẽ | Static | Tìm lỗi trong code | -- |
| **DAST** | Thử phá cửa nhà thật | Dynamic | Tìm lỗi khi app chạy | -- |
