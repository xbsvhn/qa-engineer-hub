# Security Testing

## Bản chất: Tìm "lỗ hổng" trước khi kẻ xấu tìm thấy

Tưởng tượng bạn là bảo vệ của một tòa nhà. Security testing = bạn **thử HOÀN THÀNH tự đồng vào** trước -- leo hàng rào, giả danh nhân viên, thử cửa không khóa -- để tìm lỗ hổng và vá TRƯỚC KHI kẻ trộm thật làm.

> **Security testing** = cố tình **tấn công hệ thống của mình** để tìm lỗ hổng bảo mật trước khi hacker làm điều đó.

## QA không cần là security expert

Bảo mật là **trách nhiệm của CẢ TEAM**, không chỉ security team. QA có thể phát hiện **NHIỀU lỗ hổng phổ biến** chỉ bằng basic security checks:

```
Basic Security Checks (QA NÊN làm):
+-- SQL Injection          --> Nhập ' OR 1=1 -- vào form
+-- XSS                    --> Nhập <script>alert('xss')</script>
+-- Broken Access Control  --> User A xem được data User B?
+-- Authentication bugs    --> Login không cần password?
+-- Sensitive Data Exposure--> Password hiển thị trong API response?
+-- Input Validation       --> Upload file .exe? Nhập 1 triệu ký tự?

Advanced Security (Security team chuyên trách):
+-- Penetration Testing
+-- Network security
+-- Cryptography review
+-- Infrastructure security
```

::: tip Aha moment
Bạn không cần là security expert. Chỉ cần hiểu **OWASP Top 10** và biết cách test cơ bản là đã **tăng giá trị bản thân** rất nhiều. Hầu hết QA chỉ biết functional testing -- biết thêm security testing = bạn nổi bật!
:::

## Nội dung section này

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [OWASP Top 10](./owasp-top-10) | 10 lỗ hổng phổ biến nhất, cách test từng loại |
| 2 | [Security Testing Tools](./tools) | ZAP, Burp Suite, Snyk, SAST vs DAST |
