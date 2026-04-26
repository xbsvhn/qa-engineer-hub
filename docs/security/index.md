# Security Testing

## Ban chat: Tim "lo hong" truoc khi ke xau tim thay

Tuong tuong ban la bao ve cua mot toa nha. Security testing = ban **thu HOAN THANH tu dong vao** truoc -- leo hang rao, gia danh nhan vien, thu cua khong khoa -- de tim lo hong va vap TRUOC KHI ke trom that lam.

> **Security testing** = co tinh **tan cong he thong cua minh** de tim lo hong bao mat truoc khi hacker lam dieu do.

## QA khong can la security expert

Bao mat la **trach nhiem cua CA TEAM**, khong chi security team. QA co the phat hien **NHIEU lo hong pho bien** chi bang basic security checks:

```
Basic Security Checks (QA NEN lam):
+-- SQL Injection          --> Nhap ' OR 1=1 -- vao form
+-- XSS                    --> Nhap <script>alert('xss')</script>
+-- Broken Access Control  --> User A xem duoc data User B?
+-- Authentication bugs    --> Login khong can password?
+-- Sensitive Data Exposure--> Password hien thi trong API response?
+-- Input Validation       --> Upload file .exe? Nhap 1 trieu ky tu?

Advanced Security (Security team chuyen trach):
+-- Penetration Testing
+-- Network security
+-- Cryptography review
+-- Infrastructure security
```

::: tip Aha moment
Ban khong can la security expert. Chi can hieu **OWASP Top 10** va biet cach test co ban la da **tang gia tri ban than** rat nhieu. Hau het QA chi biet functional testing -- biet them security testing = ban noi bat!
:::

## Noi dung section nay

| # | Chu de | Mo ta |
|---|---|---|
| 1 | [OWASP Top 10](./owasp-top-10) | 10 lo hong pho bien nhat, cach test tung loai |
| 2 | [Security Testing Tools](./tools) | ZAP, Burp Suite, Snyk, SAST vs DAST |
