# API Testing

API Testing là kiểm thử tầng **business logic** mà không cần qua giao diện — nhanh hơn, ổn định hơn, và phát hiện bug sớm hơn UI testing. Trong dự án Agile, đây là kỹ năng **được yêu cầu nhiều nhất** ở QA hiện nay.

## Nội dung

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [API Fundamentals](./api-fundamentals) | API là gì? HTTP protocol, REST vs GraphQL vs SOAP, JSON, Authentication, Swagger |
| 2 | [REST API Testing](./rest-api) | HTTP Methods (CRUD), Status Codes chi tiết, Headers, Testing Checklist đầy đủ |
| 3 | [Postman](./postman) | Gửi request, Environments, viết Tests/Assertions, Collection Runner, Data-driven |
| 4 | [API Automation](./api-automation) | Playwright API testing, CRUD examples, Auth testing, API + UI kết hợp, CI/CD |

## Lộ trình học

```
API Fundamentals → REST API Testing → Postman (manual) → API Automation (code)
   (1 ngày)         (1 ngày)           (2-3 ngày)          (1 tuần)
```

## Tại sao API Testing quan trọng?

```
                    ┌─────────────────────┐
                    │     UI Testing      │  Chậm, dễ flaky
                    │    (10% effort)     │
                    ├─────────────────────┤
                    │   API Testing       │  Nhanh, ổn định, coverage cao
                    │   (60% effort)      │  ← FOCUS HERE
                    ├─────────────────────┤
                    │   Unit Testing      │  Developer viết
                    │   (30% effort)      │
                    └─────────────────────┘
```

- **60-70% bugs** được tìm ở tầng API
- API test chạy nhanh hơn UI test **10-100 lần**
- Không bị ảnh hưởng bởi UI changes
- Test được trước khi frontend hoàn thành

::: tip Recommendation
Học **Postman** trước để hiểu API testing manually → sau đó chuyển sang **Playwright API testing** để automate và tích hợp CI/CD. Combo này đủ dùng cho mọi dự án.
:::
