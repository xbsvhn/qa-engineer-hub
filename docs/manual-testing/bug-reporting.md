# Bug Reporting

## Bug Report tốt là gì?

Một bug report tốt giúp developer **hiểu ngay vấn đề** và **reproduce được lỗi** mà không cần hỏi lại.

## Cấu trúc Bug Report

| Field | Mô tả |
|---|---|
| **Bug ID** | Mã tự động từ tool |
| **Title** | Mô tả ngắn gọn, rõ ràng |
| **Severity** | Critical / Major / Minor / Trivial |
| **Priority** | P1 / P2 / P3 / P4 |
| **Environment** | Browser, OS, device, URL |
| **Steps to Reproduce** | Các bước tái hiện lỗi |
| **Actual Result** | Kết quả thực tế |
| **Expected Result** | Kết quả mong đợi |
| **Attachments** | Screenshot, video, log |

## Severity vs Priority

| | Severity (Mức nghiêm trọng) | Priority (Mức ưu tiên) |
|---|---|---|
| **Ai quyết định** | QA | PM / Business |
| **Dựa vào** | Impact kỹ thuật | Impact business |
| **Ví dụ** | High Severity, Low Priority: Lỗi ở trang ít dùng | Low Severity, High Priority: Logo sai trên trang chủ |

## Ví dụ Bug Report tốt

```
Title: [Login] Error 500 when login with email containing "+" character

Severity: Major
Priority: P2
Environment: Chrome 120, macOS, staging.example.com

Steps to Reproduce:
1. Navigate to https://staging.example.com/login
2. Enter email: "user+test@gmail.com"
3. Enter password: "ValidPass@123"
4. Click "Login" button

Actual Result:
- Page shows "Internal Server Error 500"
- Console log: "TypeError: Invalid email format"

Expected Result:
- User should login successfully
- Email with "+" is a valid email format per RFC 5322

Attachments:
- screenshot_error_500.png
- console_log.txt
```

## Bug Life Cycle

```
New → Open → In Progress → Fixed → Retest → Closed
                                   → Reopen (nếu chưa fix xong)
      → Rejected (nếu not a bug)
      → Deferred (fix sau)
      → Duplicate
```

::: tip Pro Tips
1. **Luôn attach evidence** - Screenshot, video, log
2. **Isolate the bug** - Tìm điều kiện nhỏ nhất để reproduce
3. **Không judge** - Report fact, không blame developer
4. **Viết title có cấu trúc** - `[Module] Action - Result`
:::
