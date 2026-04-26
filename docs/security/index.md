# Security Testing

Security Testing giúp **phát hiện lỗ hổng bảo mật** trước khi kẻ tấn công khai thác. Bảo mật là **trách nhiệm của cả team**, không chỉ security team — QA có thể phát hiện nhiều lỗ hổng phổ biến qua basic security checks.

## Nội dung

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [OWASP Top 10](./owasp-top-10) | 10 lỗ hổng phổ biến nhất, cách test từng loại, ví dụ thực tế |
| 2 | [Security Testing Tools](./tools) | OWASP ZAP, Burp Suite, SAST vs DAST, tích hợp CI/CD |

## QA có thể phát hiện gì?

```
Basic Security Checks (QA nên làm):
├── SQL Injection          → Nhập ' OR 1=1 -- vào form fields
├── XSS (Cross-Site Script)→ Nhập <script>alert('xss')</script>
├── Broken Access Control  → User A xem được data User B?
├── Authentication bugs    → Login không cần password? Token không expire?
├── Sensitive Data Exposure→ Password hiển thị trong API response?
└── Input Validation       → Upload file .exe? Nhập 1 triệu ký tự?

Advanced Security (Security team):
├── Penetration Testing
├── Network security
├── Cryptography review
└── Infrastructure security
```

::: tip Ghi nhớ
Bạn không cần là security expert. Chỉ cần hiểu **OWASP Top 10** và biết cách test cơ bản là đã **tăng giá trị bản thân** rất nhiều so với QA chỉ biết functional testing.
:::
