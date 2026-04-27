# Performance Concepts

## Tại sao Performance Testing quan trọng?

Một app **chạy đúng** nhưng **chạy CHẬM** = app **hỏng** trong mắt người dùng.

- **53% users** rời trang nếu load > 3 giây (Google research)
- **Amazon**: mỗi 100ms delay = giảm 1% doanh thu
- **Performance bug** khó tìm hơn functional bug -- app "chạy đúng" nhưng chậm dần khi có nhiều người dùng

::: tip Aha moment
Functional testing hỏi: "App có LÀM ĐÚNG không?" Performance testing hỏi: "App có làm đúng NHANH KHÔNG khi 1000 người dùng cùng lúc?" -- hai câu hỏi khác nhau hoàn toàn.
:::

---

## Metrics = "Chỉ số sức khỏe" của hệ thống

### Response Time -- Thời gian phản hồi

```
Client gửi request ────────────────────> Server xử lý ──> Client nhận response
|<──────────────── Response Time ──────────────────────────────────>|
```

Tưởng tượng bạn gọi món ăn trong nhà hàng. Response time = thời gian từ lúc bạn gọi đến lúc món ăn lên bàn.

### P90/P95/P99 -- Giải thích bằng ví dụ thật

**Ví dụ:** 100 người gọi món ăn trong nhà hàng.

| Metric | Ý nghĩa | Ví dụ | Target phổ biến |
|---|---|---|---|
| **Average** | Trung bình | Trung bình mỗi người đợi 5 phút | Tham khảo, KHÔNG dùng để đánh giá |
| **P50 (Median)** | 50 người nhận đồ ăn trong... | 3 phút | < 1 giây |
| **P90** | 90 người nhận đồ ăn trong... | 8 phút | < 3 giây |
| **P95** | 95 người nhận đồ ăn trong... | 12 phút | < 5 giây |
| **P99** | 99 người nhận đồ ăn trong... | 25 phút (1 người xui) | < 10 giây |

::: warning Đừng chỉ nhìn Average -- nó là "bẫy" kinh điển!
```
4 requests: 1ms, 1ms, 1ms, 10,000ms
Average = (1 + 1 + 1 + 10,000) / 4 = 2,500ms --> "trông có vẻ OK"
NHƯNG P99 = 10,000ms --> 1% users đợi 10 GIÂY!
```
Average che giấu những trường hợp tệ nhất. **LUÔN report P90/P95** thay vì chỉ Average.
:::

::: tip Aha moment
Khi lead hỏi "Performance có OK không?", đừng trả lời "Average là 500ms". Hãy trả lời "P95 là 1.2 giây, nghĩa là 95% requests nhanh hơn 1.2s, chỉ 5% chậm hơn." -- đây mới là thông tin có giá trị.
:::

### Throughput = Công suất xử lý

| Metric | Ý nghĩa |
|---|---|
| **RPS** (Requests per second) | Số requests server xử lý được mỗi giây |
| **TPS** (Transactions per second) | Số transactions hoàn thành mỗi giây |

Giống như nhà hàng phục vụ được bao nhiêu món/phút. RPS cao = nhà hàng nhanh nhẹn.

### Error Rate = Tỷ lệ thất bại

```
Error Rate = (Số requests lỗi / Tổng requests) x 100%

Target: < 1% dưới tải bình thường
        < 5% dưới stress test
```

Giống tỷ lệ order bị sai trong nhà hàng. 1% là chấp nhận được. 10% = nhà hàng có vấn đề nghiêm trọng.

### Resource Utilization = "Sức khỏe" của server

| Resource | Metric | Báo động khi |
|---|---|---|
| **CPU** | % sử dụng | > 80% liên tục |
| **Memory** | % sử dụng, có tăng liên tục? | > 85% hoặc tăng dần không ngừng |
| **Disk I/O** | Tốc độ đọc/ghi | Bottleneck |
| **Network** | Bandwidth | Bão hòa |

---

## Các loại Performance Testing -- Chi tiết

### 1. Load Testing = "Nhà hàng có phục vụ được 200 khách không?"

**Mục đích:** Verify hệ thống hoạt động tốt với **số users DỰ KIẾN** (không vượt quá giới hạn).

```
Users
  |
200+────────────────────────────────
  |                              (giữ 200 users trong 30 phút)
  |           /──────────────────
  |         /
  |       /    (ramp up 5 phút -- tăng dần từ 0 lên 200)
  |     /
  |   /
  0+─/─────────────────────────────> Thời gian
   0    5min              35min
```

**Khi dùng:** Trước release, verify SLA (Service Level Agreement -- cam kết về performance).

### 2. Stress Testing = "Nhà hàng VỠ ở điểm nào?"

**Mục đích:** Tìm **breaking point** -- hệ thống chịu được BAO NHIÊU users trước khi "chết".

```
Users
  |
500+ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  <-- Breaking point (error > 5%)
  |                       /
400+──────────────────── /
  |                    /
300+──────────────── /
  |                /
200+──────────── /
  |            /
100+──────── /
  |        /
  0+─────/────────────────────────> Thời gian
        (tăng dần cho đến khi "vỡ")
```

**Khi dùng:** Biết capacity limit, plan cho growth. "Hệ thống hiện tại chịu được 500 users, năm sau cần 800 --> cần nâng cấp."

### 3. Spike Testing = "Đột ngột từ 10 khách lên 500 khách"

**Mục đích:** Hệ thống react sao khi tải **tăng ĐỘT NGỘT** (flash sale, bài viral, event).

```
Users
  |
1000+──────+
  |        |    +──────+
  |        |    |      |
  |        |    |      |
 100+──────+────+──────+──────
  |
  0+──────────────────────────> Thời gian
      Spike  Normal  Spike
```

**Verify:** Hệ thống có **recover** sau spike? Có mất data không? Error rate bao nhiêu?

Giống như nhà hàng bình thường phục vụ 10 khách, đột ngột 500 khách kéo đến (có ngôi sao review trên TikTok). Nhà hàng có ứng phó được không? Hay chaos?

### 4. Endurance Testing = "Phục vụ 200 khách LIÊN TỤC 24 giờ"

**Mục đích:** Tìm **memory leaks** và **degradation** khi chạy lâu.

```
Users
  |
200+──────────────────────────────── (200 users liên tục 24 giờ)
  |
  0+──────────────────────────────> Thời gian
   0                              24h
```

**Verify:** Response time có **tăng dần** theo thời gian? Memory có **leak** (tăng mãi không giảm)? Database connections có tăng?

::: tip Aha moment
Memory leak = vòi nước bị rỉ. Lượng nước rỉ rất nhỏ, bạn không nhận ra. Nhưng để 24 giờ, sàn nhà ngập. Endurance testing giúp tìm những "vòi nước rỉ" này.
:::

---

## Bottleneck = "Nút thắt" làm chậm hệ thống

**Bottleneck** giống như **điểm tắc đường** trên xa lộ. Dù xa lộ rộng 6 làn, nếu có 1 điểm chỉ còn 2 làn --> TẤT CẢ xe phải chen qua 2 làn đó --> chậm.

### Bottleneck phổ biến

| Bottleneck | Triệu chứng | Giải pháp |
|---|---|---|
| **Slow DB queries** | Response time cao, CPU database cao | Tối ưu query, thêm index |
| **Memory leak** | Memory tăng dần, cuối cùng crash | Fix code, tăng memory |
| **Connection pool** | Timeout errors, "connection refused" | Tăng pool size |
| **Blocking I/O** | Throughput thấp, wait time cao | Async processing, caching |
| **Bandwidth** | Download chậm, timeout | CDN, compression, lazy loading |

---

## Performance Testing Process -- 6 bước

```
1. Define Requirements
   "Response time < 2s, chịu 1000 concurrent users, error rate < 1%"

2. Plan Tests
   Chọn tool (K6/JMeter), thiết kế scenario, chuẩn bị test data

3. Create Scripts
   Viết test scripts, configure load patterns

4. Execute Tests
   Chạy tests, ĐỒNG THỜI monitor resources (CPU, Memory, DB)

5. Analyze Results
   So sánh với requirements, tìm bottlenecks

6. Report & Re-test
   Báo cáo findings, phối hợp với dev fix, chạy lại để verify
```

---

## Đọc kết quả -- Ví dụ thực tế

### Kết quả Load Test

```
Scenario: 200 concurrent users, 30 phút
Target: Response time < 2s, Error rate < 1%

Results:
+────────────────+──────────+────────+
| Metric         | Kết quả  | Status |
+────────────────+──────────+────────+
| Avg Response   | 850ms    | OK     |
| P90 Response   | 1,200ms  | OK     |
| P95 Response   | 1,800ms  | OK     |
| P99 Response   | 4,500ms  | FAIL   |
| Throughput     | 150 RPS  | OK     |
| Error Rate     | 0.3%     | OK     |
| CPU Usage      | 72%      | WARN   |
+────────────────+──────────+────────+

Phân tích:
- P99 = 4.5s --> 1% users trải nghiệm CHẬM (vượt target 2s)
- CPU 72% --> gần ngưỡng báo động 80%, ít room cho growth
- Recommendation: Tối ưu slow queries (nguyên nhân P99 cao)
```

::: tip Aha moment
Khi báo cáo performance test, ĐỪNG chỉ liệt kê số liệu. Hãy trả lời câu hỏi: "Vậy có PASS không?" và "Nếu FAIL thì vì SAO và cần làm gì?" -- đây là giá trị của QA.
:::

---

## Sai lầm thường gặp

❌ **Chỉ nhìn Average response time để đánh giá performance**
→ ✅ Luôn report **P90/P95/P99** — Average che giấu những trường hợp tệ nhất
→ 💡 4 requests: 1ms, 1ms, 1ms, 10,000ms → Average = 2,500ms "trông OK", nhưng P99 = 10s. 1% users đợi 10 giây!

❌ **Test performance trên Dev environment thay vì Staging**
→ ✅ Test trên **Staging** — môi trường giống Production nhất (cùng config, cùng data volume)
→ 💡 Dev environment thường có ít data, phần cứng khác Production → kết quả không phản ánh thực tế

❌ **Không dùng think time trong load test — bắn request liên tục**
→ ✅ Thêm **think time** (1-5 giây giữa các requests) để mô phỏng user thật
→ 💡 User thật đọc trang, suy nghĩ, rồi mới click tiếp. Không có think time = tải giả cao hơn thực tế → kết quả sai lệch

❌ **Chạy load test từ cùng network với server (cùng data center)**
→ ✅ Chạy từ **máy/cloud khác network** với server, hoặc dùng distributed load generators
→ 💡 Cùng network = latency gần 0, không phản ánh trải nghiệm user thật (user ở xa, qua internet)

❌ **Chạy 1 lần rồi kết luận — không chạy lại để verify**
→ ✅ Chạy ít nhất **2-3 lần** để confirm kết quả ổn định, loại bỏ noise
→ 💡 1 lần chạy có thể bị ảnh hưởng bởi background processes, GC, network spike. Nhiều lần → kết quả đáng tin hơn

---

## Góc nhìn đa chiều

**Team A:** "Test performance **mỗi sprint**" — tích hợp vào CI/CD, chạy automated performance tests mỗi build. Phù hợp cho SaaS products, e-commerce, real-time apps nơi performance là core feature.

**Team B:** "Test performance **trước major releases**" — chạy full load/stress test 1-2 lần mỗi quarter. Phù hợp cho internal tools, B2B apps ít users, hoặc team nhỏ không đủ resource cho continuous perf testing.

**Cả hai đều hợp lý.** Sản phẩm có millions users cần test thường xuyên vì mỗi regression nhỏ ảnh hưởng lớn. Sản phẩm có 50 users nội bộ chỉ cần test khi có thay đổi lớn về architecture hoặc data volume.

---

## Tóm tắt chương

| Concept | Ẩn dụ | Điểm cốt lõi |
|---|---|---|
| **Response Time** | Thời gian đợi món ăn | Dùng P90/P95, KHÔNG chỉ Average |
| **Throughput** | Số món phục vụ/phút | RPS càng cao càng tốt |
| **Error Rate** | Tỷ lệ order sai | < 1% bình thường, < 5% stress |
| **Load Test** | 200 khách như bình thường | Verify hệ thống chịu được tải dự kiến |
| **Stress Test** | Tăng khách cho đến khi "vỡ" | Tìm breaking point |
| **Spike Test** | Đột ngột 500 khách kéo đến | Test tải đột ngột |
| **Endurance** | 200 khách liên tục 24h | Tìm memory leaks |
| **Bottleneck** | Điểm tắc đường | Tìm và xử lý điểm chậm nhất |
