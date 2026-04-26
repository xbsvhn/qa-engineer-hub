# Performance Testing

Performance Testing đánh giá **tốc độ, khả năng mở rộng, và độ ổn định** của hệ thống dưới tải. Mục tiêu: đảm bảo hệ thống hoạt động tốt khi có **nhiều người dùng đồng thời**.

## Nội dung

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [Performance Concepts](./concepts) | Metrics, các loại performance test, quy trình, phân tích kết quả |
| 2 | [JMeter](./jmeter) | Apache JMeter cơ bản, Thread Groups, Samplers, Assertions, Reports |
| 3 | [K6](./k6) | Modern load testing bằng JavaScript, thresholds, CI/CD integration |

## Các loại Performance Testing

```
Load Testing      → Hệ thống chịu được tải dự kiến không?
Stress Testing    → Hệ thống vỡ ở đâu khi vượt giới hạn?
Spike Testing     → Hệ thống xử lý tải đột ngột thế nào?
Endurance Testing → Hệ thống ổn định khi chạy lâu dài không?
Scalability       → Cần thêm bao nhiêu resource để scale?
```

## Khi nào QA cần Performance Testing?

| Tình huống | Action |
|---|---|
| Trước major release | Load test với expected users |
| Sau khi thay đổi database/API | Verify không regression performance |
| Hệ thống chậm (user phàn nàn) | Profile và identify bottleneck |
| Chuẩn bị cho sự kiện (sale, campaign) | Stress test với peak load |
