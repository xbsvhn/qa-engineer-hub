# JMeter

## JMeter là gì? (WHAT)

Apache JMeter là **open-source performance testing tool** phổ biến nhất, hỗ trợ HTTP, JDBC, SOAP, REST, FTP. Giao diện GUI trực quan, phù hợp cho QA không chuyên code.

### Khi nào dùng JMeter?

| Dùng JMeter | Dùng K6 |
|---|---|
| Team không biết code | Team biết JavaScript |
| Cần GUI trực quan | Cần tích hợp CI/CD |
| Test protocols khác (JDBC, FTP) | Chủ yếu HTTP/REST |
| Có sẵn JMeter expertise | Dự án mới, modern stack |

---

## Cài đặt

```bash
# Yêu cầu: Java 8+
java -version

# Download: https://jmeter.apache.org/download_jmeter.cgi
# Giải nén và chạy:
cd apache-jmeter-5.x/bin
./jmeter.sh     # macOS/Linux
jmeter.bat      # Windows
```

---

## Các thành phần chính

### Test Plan Structure

```
Test Plan
├── Thread Group           ← Mô phỏng users
│   ├── HTTP Request       ← Request đến server
│   ├── HTTP Header Manager ← Headers (Content-Type, Auth)
│   ├── CSV Data Set Config ← Test data từ CSV
│   ├── Response Assertion  ← Verify response
│   └── View Results Tree  ← Xem chi tiết response
├── Summary Report          ← Metrics tổng hợp
└── Aggregate Report        ← P90, P95, P99
```

### Thread Group — Mô phỏng Users

```
Thread Group Settings:
- Number of Threads: 100        ← 100 virtual users
- Ramp-up Period: 60 seconds    ← Tăng dần trong 60 giây
- Loop Count: 10                ← Mỗi user chạy 10 lần
- Duration: 300 seconds         ← Hoặc chạy trong 5 phút

Timeline:
Giây 0:  0 users
Giây 6:  10 users
Giây 12: 20 users
...
Giây 60: 100 users (full load)
→ Giữ 100 users cho đến hết duration
```

### HTTP Request Sampler

```
Protocol: https
Server: api.example.com
Port: 443
Method: GET
Path: /api/products
Parameters:
  page=1
  limit=20
```

### Assertions — Verify Response

| Assertion | Verify | Ví dụ |
|---|---|---|
| **Response Assertion** | Status code, body text | Status = 200, body contains "products" |
| **Duration Assertion** | Response time | < 2000ms |
| **Size Assertion** | Response size | < 1MB |
| **JSON Assertion** | JSON path value | `$.data.length` > 0 |

---

## Ví dụ: Load Test Login API

### Scenario

```
Test: 100 users login đồng thời
Duration: 5 phút
Target: Response time < 2s, Error rate < 1%
```

### Steps trong JMeter

```
1. Tạo Thread Group:
   - Threads: 100
   - Ramp-up: 60s
   - Duration: 300s

2. Thêm HTTP Request:
   - POST https://api.example.com/auth/login
   - Body: {"email":"user${__threadNum}@test.com","password":"Pass@123"}

3. Thêm HTTP Header Manager:
   - Content-Type: application/json

4. Thêm Response Assertion:
   - Response code: 200

5. Thêm Duration Assertion:
   - Max duration: 2000ms

6. Thêm Listeners:
   - Summary Report
   - Aggregate Report
   - View Results Tree (debug only, tắt khi chạy load)
```

### Đọc kết quả

```
Aggregate Report:
┌──────────┬─────────┬────────┬────────┬────────┬────────┬───────┐
│ Label    │ Samples │ Avg(ms)│ P90(ms)│ P95(ms)│ P99(ms)│ Error%│
├──────────┼─────────┼────────┼────────┼────────┼────────┼───────┤
│ Login    │ 10,000  │ 450    │ 890    │ 1,200  │ 2,800  │ 0.5%  │
└──────────┴─────────┴────────┴────────┴────────┴────────┴───────┘

Phân tích:
✅ Avg 450ms — tốt
✅ P90 890ms — tốt
✅ P95 1.2s — OK, dưới 2s
⚠️ P99 2.8s — vượt target 2s cho 1% users
✅ Error 0.5% — dưới 1%

Recommendation: Investigate P99 spike, có thể do slow DB query
```

---

## Best Practices

### 1. Không dùng GUI khi chạy load test

```bash
# GUI chỉ dùng để thiết kế và debug
# Chạy load test bằng CLI (non-GUI mode):
jmeter -n -t test-plan.jmx -l results.jtl -e -o report/

# -n: non-GUI mode
# -t: test plan file
# -l: results log file
# -e -o: generate HTML report
```

### 2. Ramp-up realistic

```
❌ Sai: 1000 users, Ramp-up 0 giây (tất cả cùng lúc)
✅ Đúng: 1000 users, Ramp-up 300 giây (tăng dần 5 phút)
```

### 3. Think Time — Mô phỏng user thật

```
Users thật không click liên tục.
Thêm "Constant Timer" hoặc "Gaussian Random Timer" giữa requests:
- Min: 1000ms
- Max: 5000ms
```

---

## Tóm tắt chương

| Component | Mục đích |
|---|---|
| **Thread Group** | Config số users, ramp-up, duration |
| **HTTP Request** | Request đến server |
| **Assertions** | Verify response (status, time, body) |
| **Listeners** | Xem results (Summary, Aggregate, Graph) |
| **CLI mode** | Chạy load test thực tế (không dùng GUI) |
