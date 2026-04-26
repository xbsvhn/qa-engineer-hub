# Performance Concepts

## Tại sao Performance Testing quan trọng? (WHY)

- **53% users** rời trang nếu load > 3 giây (Google research)
- **Amazon**: mỗi 100ms delay = giảm 1% doanh thu
- **Performance bug** khó tìm hơn functional bug — cần đo lường có hệ thống

---

## Metrics quan trọng (WHAT)

### Response Time — Thời gian phản hồi

```
Client gửi request ──────────────────► Server xử lý ──► Client nhận response
|←─────────── Response Time ──────────────────────────────────────►|
```

| Metric | Ý nghĩa | Target phổ biến |
|---|---|---|
| **Average Response Time** | Trung bình tất cả requests | < 2 giây |
| **Median (P50)** | 50% requests nhanh hơn giá trị này | < 1 giây |
| **P90** | 90% requests nhanh hơn giá trị này | < 3 giây |
| **P95** | 95% requests nhanh hơn giá trị này | < 5 giây |
| **P99** | 99% requests nhanh hơn giá trị này | < 10 giây |

::: warning Đừng chỉ nhìn Average!
Average = (1ms + 1ms + 1ms + 10,000ms) / 4 = **2,500ms** — trông OK.
Nhưng P99 = 10,000ms — 1% users đợi **10 giây**!

→ Luôn report **P90/P95** thay vì chỉ Average.
:::

### Throughput — Lượng xử lý

| Metric | Ý nghĩa |
|---|---|
| **Requests per second (RPS)** | Số requests server xử lý mỗi giây |
| **Transactions per second (TPS)** | Số transactions hoàn thành mỗi giây |

### Error Rate — Tỷ lệ lỗi

```
Error Rate = (Số requests lỗi / Tổng requests) × 100%

Target: < 1% dưới tải bình thường
        < 5% dưới stress test
```

### Resource Utilization

| Resource | Metric | Warning threshold |
|---|---|---|
| **CPU** | % sử dụng | > 80% liên tục |
| **Memory** | % sử dụng, memory leak | > 85% hoặc tăng liên tục |
| **Disk I/O** | Read/Write speed | Bottleneck |
| **Network** | Bandwidth usage | Saturation |

---

## Các loại Performance Testing chi tiết

### 1. Load Testing — Tải bình thường

**Mục đích:** Verify hệ thống hoạt động tốt với **số users dự kiến**.

```
Users
  │
200├────────────────────────────────
  │                              (giữ 200 users trong 30 phút)
  │           ╱──────────────────
  │         ╱
  │       ╱    (ramp up 5 phút)
  │     ╱
  │   ╱
  0├─╱─────────────────────────────► Thời gian
   0    5min              35min
```

**Khi dùng:** Trước release, verify SLA.

### 2. Stress Testing — Vượt giới hạn

**Mục đích:** Tìm **breaking point** — hệ thống chịu được bao nhiêu users.

```
Users
  │
500├─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ← Breaking point (error > 5%)
  │                       ╱
400├──────────────────── ╱
  │                    ╱
300├──────────────── ╱
  │                ╱
200├──────────── ╱
  │            ╱
100├──────── ╱
  │        ╱
  0├─────╱────────────────────────► Thời gian
        (tăng dần cho đến khi vỡ)
```

**Khi dùng:** Biết capacity limit, plan cho growth.

### 3. Spike Testing — Tải đột ngột

**Mục đích:** Hệ thống react thế nào khi tải **tăng đột ngột** (flash sale, viral event).

```
Users
  │
1000├──────┐
  │       │    ┌──────┐
  │       │    │      │
  │       │    │      │
100├──────┘────┘──────┘──────
  │
  0├──────────────────────────► Thời gian
      Spike  Normal  Spike
```

**Verify:** Hệ thống recover sau spike? Có mất data không? Error rate?

### 4. Endurance Testing — Chạy lâu dài

**Mục đích:** Tìm **memory leaks** và degradation khi chạy dài.

```
Users
  │
200├──────────────────────────────── (200 users liên tục 24 giờ)
  │
  0├──────────────────────────────► Thời gian
   0                              24h
```

**Verify:** Response time có tăng dần? Memory có leak? Database connections có tăng?

---

## Performance Testing Process

```
1. Define Requirements
   └── Response time < 2s, support 1000 concurrent users, error rate < 1%

2. Plan Tests
   └── Tool selection, test scenarios, test data, environment

3. Create Scripts
   └── Viết test scripts (K6/JMeter), configure load patterns

4. Execute Tests
   └── Chạy tests, monitor resources

5. Analyze Results
   └── Compare với requirements, identify bottlenecks

6. Report & Optimize
   └── Report findings, collaborate với dev để fix
   └── Re-test sau khi optimize
```

---

## Phân tích kết quả — Ví dụ

### Kết quả Load Test

```
Scenario: 200 concurrent users, 30 minutes
Target: Response time < 2s, Error rate < 1%

Results:
┌────────────────┬──────────┬────────┐
│ Metric         │ Result   │ Status │
├────────────────┼──────────┼────────┤
│ Avg Response   │ 850ms    │ ✅ OK  │
│ P90 Response   │ 1,200ms  │ ✅ OK  │
│ P95 Response   │ 1,800ms  │ ✅ OK  │
│ P99 Response   │ 4,500ms  │ ❌ FAIL│
│ Throughput     │ 150 RPS  │ ✅ OK  │
│ Error Rate     │ 0.3%     │ ✅ OK  │
│ CPU Usage      │ 72%      │ ⚠️ WARN│
└────────────────┴──────────┴────────┘

Analysis:
- P99 = 4.5s → 1% users trải nghiệm chậm
- CPU 72% → gần threshold, ít room cho growth
- Recommend: Optimize slow queries (P99 bottleneck)
```

### Bottleneck phổ biến

| Bottleneck | Triệu chứng | Giải pháp |
|---|---|---|
| **Slow DB queries** | Response time cao, CPU DB cao | Index optimization, query tuning |
| **Memory leak** | Memory tăng dần, eventual crash | Fix code leaks, increase memory |
| **Connection pool** | Timeout errors, connection refused | Increase pool size, connection reuse |
| **Blocking I/O** | Low throughput, high wait time | Async processing, caching |
| **Bandwidth** | Slow file downloads, timeouts | CDN, compression, lazy loading |

---

## Tóm tắt chương

| Concept | Điểm cốt lõi |
|---|---|
| **Response Time** | Dùng P90/P95, không chỉ Average |
| **Throughput** | Requests/second server xử lý được |
| **Error Rate** | < 1% normal load, < 5% stress |
| **Load Test** | Verify với expected users |
| **Stress Test** | Tìm breaking point |
| **Spike Test** | Test tải đột ngột |
| **Endurance** | Tìm memory leaks, degradation |
