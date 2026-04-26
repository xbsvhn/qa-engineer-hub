# API Testing

API Testing là kiểm thử **"nhà bếp" phía sau nhà hàng** — nơi dữ liệu được xử lý, logic nghiệp vụ được thực thi — mà không cần đi qua giao diện (UI). Nhanh hơn, ổn định hơn, và phát hiện bug sớm hơn UI testing. Trong dự án Agile, đây là kỹ năng **được yêu cầu nhiều nhất** ở QA hiện nay.

## Nội dung

| # | Chủ đề | Bạn sẽ học được gì |
|---|---|---|
| 1 | [API Fundamentals](./api-fundamentals) | API = phục vụ nhà hàng, HTTP = ngôn ngữ giao tiếp, JSON, Authentication, Swagger |
| 2 | [REST API Testing](./rest-api) | HTTP Methods (5 hành động), Status Codes (phản hồi từ bếp), Testing Checklist |
| 3 | [Postman](./postman) | Chiếc điện thoại gọi API — Environments, Tests, Collection Runner |
| 4 | [API Automation](./api-automation) | Từ gọi tay sang hệ thống tự động — Playwright API testing, API+UI combo |

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
                    │   (60% effort)      │  ← TẬP TRUNG Ở ĐÂY
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
Học **Postman** trước để hiểu API testing bằng tay (nhanh, trực quan) → sau đó chuyển sang **Playwright API testing** để automate và tích hợp CI/CD. Combo này đủ dùng cho mọi dự án.
:::
