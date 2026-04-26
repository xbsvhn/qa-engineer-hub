# Security Testing Tools

## Phân loại

### SAST vs DAST

| | SAST (Static) | DAST (Dynamic) |
|---|---|---|
| **Khi nào** | Scan source code (trước khi chạy) | Scan app đang chạy |
| **Input** | Source code, dependencies | Running application URL |
| **Tìm được** | Code vulnerabilities, insecure patterns | Runtime vulnerabilities, config issues |
| **Ưu điểm** | Phát hiện sớm, trong CI/CD | Tìm real vulnerabilities |
| **Nhược điểm** | False positives nhiều | Cần app đang chạy |
| **Tools** | SonarQube, Snyk, ESLint Security | OWASP ZAP, Burp Suite |

```
Development Pipeline:
Code → SAST scan → Build → Deploy → DAST scan → Release
       (Snyk)                        (OWASP ZAP)
```

---

## OWASP ZAP — Miễn phí, mạnh mẽ

### ZAP là gì?

OWASP ZAP (Zed Attack Proxy) là tool **miễn phí** để tìm security vulnerabilities trong web applications. Hoạt động như một proxy giữa browser và server.

### Cách dùng cơ bản

```
1. Automated Scan:
   - Nhập URL target → Click "Attack"
   - ZAP tự crawl và scan toàn bộ site
   - Report các vulnerabilities tìm được

2. Manual Explore (qua proxy):
   - Set browser proxy → ZAP
   - Browse website bình thường
   - ZAP capture và analyze mọi request/response
   - Highlight potential issues

3. Active Scan:
   - Sau khi explore, chọn URLs cần scan sâu
   - ZAP thử inject payloads (SQL, XSS...)
   - Report vulnerabilities
```

### ZAP Alerts — Đọc kết quả

| Risk Level | Màu | Ví dụ |
|---|---|---|
| **High** | Đỏ | SQL Injection, Remote Code Execution |
| **Medium** | Cam | XSS, Missing Security Headers |
| **Low** | Vàng | Cookie without HttpOnly flag |
| **Informational** | Xanh | Server version disclosure |

### CI/CD Integration

```yaml
# GitHub Actions — ZAP Scan
- name: ZAP Scan
  uses: zaproxy/action-full-scan@v0.10.0
  with:
    target: 'https://staging.example.com'
    rules_file_name: '.zap/rules.tsv'
    cmd_options: '-a'
```

---

## Burp Suite

### Burp Suite là gì?

Burp Suite là tool **phổ biến nhất** cho penetration testing. Community Edition miễn phí, Professional Edition trả phí.

### QA dùng Burp Suite để:

| Feature | Mục đích |
|---|---|
| **Proxy** | Intercept và modify requests |
| **Repeater** | Replay và modify individual requests |
| **Intruder** | Automate attacks (brute force, fuzzing) |
| **Scanner** | Automatic vulnerability scanning (Pro) |

### Ví dụ: Test IDOR với Burp

```
1. Login as User A
2. Bật Burp Proxy → capture requests
3. Tìm request: GET /api/orders/123  (order của User A)
4. Gửi vào Repeater
5. Đổi ID: GET /api/orders/124  (order của User B)
6. Send → Xem response
7. Nếu trả về data → BUG: IDOR vulnerability!
```

---

## Snyk — Dependency Security

### Snyk là gì?

Snyk scan **dependencies** (npm packages, Python packages...) để tìm known vulnerabilities.

```bash
# Cài đặt
npm install -g snyk

# Scan project
snyk test

# Output:
✗ High severity vulnerability found in lodash
  Description: Prototype Pollution
  Introduced through: lodash@4.17.20
  Fixed in: lodash@4.17.21
  Path: myapp > lodash
```

### CI/CD Integration

```yaml
# GitHub Actions
- name: Snyk Security Check
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

---

## Tools khác

| Tool | Loại | Mô tả | Cost |
|---|---|---|---|
| **SonarQube** | SAST | Scan code quality + security | Free (Community) |
| **ESLint Security** | SAST | Security rules cho JavaScript | Free |
| **npm audit** | SCA | Check npm dependencies | Free (built-in) |
| **Dependabot** | SCA | Auto PR khi có vulnerability | Free (GitHub) |
| **Lighthouse** | Audit | Security + Performance audit | Free (Chrome) |

---

## Security Testing Workflow cho QA

```
Hàng ngày:
  └── Khi test feature mới → thử basic SQL/XSS injection

Mỗi Sprint:
  ├── npm audit → fix critical vulnerabilities
  └── OWASP ZAP quick scan trên staging

Mỗi Release:
  ├── OWASP ZAP full scan
  ├── Review security headers
  ├── Test authentication flows
  └── IDOR checks trên API endpoints mới

CI/CD Pipeline:
  ├── Snyk → check dependencies (mỗi PR)
  ├── SonarQube → SAST scan (mỗi PR)
  └── ZAP → DAST scan (nightly)
```

---

## Tóm tắt chương

| Tool | Loại | QA dùng khi | Cost |
|---|---|---|---|
| **OWASP ZAP** | DAST | Scan web app, tìm vulnerabilities | Free |
| **Burp Suite** | Proxy/DAST | Intercept requests, test IDOR | Free (Community) |
| **Snyk** | SCA | Check vulnerable dependencies | Free tier |
| **npm audit** | SCA | Quick dependency check | Free |
| **SonarQube** | SAST | Code quality + security | Free (Community) |
