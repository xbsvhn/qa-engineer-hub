# Performance Testing

## Bản chất: Đo "sức khỏe" của hệ thống

Tưởng tượng bạn mở một nhà hàng. Functional testing = kiểm tra **đồ ăn có ngon không** (chức năng đúng). Performance testing = kiểm tra **nhà hàng phục vụ được bao nhiêu khách cùng lúc** mà vẫn đảm bảo chất lượng.

- App load **3 giây** thay vì 0.5 giây? **53% user sẽ tắt đi** (Google research)
- Amazon: mỗi **100ms chậm** hơn = **giảm 1% doanh thu**
- Performance bug **khó tìm hơn** functional bug -- phải đo lường có hệ thống

## Các loại Performance Testing -- Tổng quan

```
Load Testing      --> Nhà hàng phục vụ được 200 khách cùng lúc không?
Stress Testing    --> Nhà hàng "vỡ" ở điểm nào? 500 khách? 1000 khách?
Spike Testing     --> 10 khách đột ngột tăng lên 500 thì sao?
Endurance Testing --> Phục vụ 200 khách LIÊN TỤC 24h có ổn không?
```

## Nội dung section này

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [Performance Concepts](./concepts) | Metrics (P90/P95/P99), các loại test, phân tích kết quả |
| 2 | [JMeter](./jmeter) | Tool GUI phổ biến, Thread Groups, Reports |
| 3 | [K6](./k6) | Modern tool viết bằng JavaScript, tích hợp CI/CD |

## Khi nào QA cần Performance Testing?

| Tình huống | Action |
|---|---|
| Trước major release | Load test với số user dự kiến |
| Sau khi đổi database/API | Verify không bị chậm hơn trước |
| User phàn nàn "app chậm" | Tìm bottleneck |
| Chuẩn bị sự kiện (sale, campaign) | Stress test với peak load |
