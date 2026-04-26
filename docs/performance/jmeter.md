# JMeter

## Bản chất: JMeter = "Mô phỏng đám đông" truy cập app

Tưởng tượng bạn muốn biết nhà hàng phục vụ được bao nhiêu khách. Bạn **không thể** mời 1000 người thật đến -- nhưng bạn có thể **mô phỏng** 1000 người bằng JMeter.

> **Apache JMeter** = tool tạo ra **hàng trăm, hàng ngàn "người dùng ảo"** (virtual users) gửi request đến server của bạn cùng lúc, rồi đo xem server có chịu nổi không.

### JMeter vs K6 -- Chọn cái nào?

| Tình huống | JMeter | K6 |
|---|---|---|
| Team **không biết code** | Dùng GUI kéo thả | Cần viết JavaScript |
| Cần **giao diện trực quan** | Có GUI | Không có GUI |
| Test **JDBC, FTP, SOAP** | Hỗ trợ nhiều protocols | Chủ yếu HTTP/REST |
| Dự án mới, **modern stack** | OK nhưng cũ | Phù hợp hơn |
| Tích hợp **CI/CD** | Cần config thêm | Native support |

---

## Cài đặt

```bash
# Yêu cầu: Java 8 trở lên (JMeter chạy trên Java)
java -version

# Download: https://jmeter.apache.org/download_jmeter.cgi
# Giải nén và chạy:
cd apache-jmeter-5.x/bin
./jmeter.sh     # macOS/Linux
jmeter.bat      # Windows
# --> Cửa sổ GUI của JMeter sẽ mở ra
```

---

## Các thành phần chính -- Giải thích bằng ẩn dụ

### Test Plan Structure

```
Test Plan                        (= "Kế hoạch test toàn bộ")
+-- Thread Group                 (= "Đám đông" -- 100 người dùng ảo)
|   +-- HTTP Request             (= Mỗi người gửi 1 request đến server)
|   +-- HTTP Header Manager      (= Đính kèm header: Content-Type, Auth token)
|   +-- CSV Data Set Config      (= Đọc test data từ file CSV)
|   +-- Response Assertion       (= Kiểm tra response có đúng không)
|   +-- View Results Tree        (= Xem chi tiết từng response -- CHỈ ĐỂ DEBUG)
+-- Summary Report               (= Báo cáo tổng hợp)
+-- Aggregate Report             (= Báo cáo P90, P95, P99)
```

### Thread Group = "Đám đông người dùng ảo"

"Thread" trong JMeter = 1 virtual user. "Thread Group" = nhóm virtual users.

```
Thread Group Settings:
- Number of Threads: 100        <-- 100 người dùng ảo
- Ramp-up Period: 60 seconds    <-- Tăng DẦN trong 60 giây (không dồn hết 100 người cùng lúc)
- Loop Count: 10                <-- Mỗi user gửi 10 lần
- Duration: 300 seconds         <-- Hoặc chạy trong 5 phút

Timeline (với 100 threads, ramp-up 60s):
Giây 0:   0 users
Giây 6:  10 users
Giây 12: 20 users
...
Giây 60: 100 users (full load)
--> Giữ 100 users cho đến hết duration
```

::: tip Aha moment
**Ramp-up** rất quan trọng! Nếu để ramp-up = 0 (100 users cùng lúc), giống như 100 người chen vào cửa nhà hàng CÙNG LÚC -- không thực tế. Người dùng thật đến **DẦN DẦN** -- nên ramp-up nên từ 1-5 phút.
:::

### HTTP Request = "Mỗi người gửi gì?"

```
Protocol: https
Server: api.example.com
Port: 443
Method: POST
Path: /api/auth/login
Body: {"email":"user${__threadNum}@test.com","password":"Pass@123"}
       ^^^ ${__threadNum} = số thứ tự thread (1, 2, 3...)
           --> Mỗi user dùng email khác nhau
```

### Assertions = "Kiểm tra response có đúng không?"

| Assertion | Kiểm tra gì | Ví dụ |
|---|---|---|
| **Response Assertion** | Status code, body text | Status = 200, body có "success" |
| **Duration Assertion** | Response time | < 2000ms |
| **Size Assertion** | Kích thước response | < 1MB |
| **JSON Assertion** | Giá trị trong JSON | `$.data.length` > 0 |

---

## Ví dụ thực tế: Load Test Login API

### Scenario

```
Mục tiêu: 100 users login đồng thời
Thời gian: 5 phút
Target: Response time < 2s, Error rate < 1%
```

### Setup trong JMeter

```
1. Tạo Thread Group:
   - Threads: 100           (100 người dùng ảo)
   - Ramp-up: 60s           (tăng dần trong 1 phút)
   - Duration: 300s          (chạy 5 phút)

2. Thêm HTTP Request:
   - POST https://api.example.com/auth/login
   - Body: {"email":"user${__threadNum}@test.com","password":"Pass@123"}

3. Thêm HTTP Header Manager:
   - Content-Type: application/json

4. Thêm Response Assertion:
   - Response code: 200

5. Thêm Duration Assertion:
   - Max duration: 2000ms

6. Thêm Listeners (xem kết quả):
   - Summary Report      (tổng quan)
   - Aggregate Report    (P90, P95, P99)
   - View Results Tree   (debug only -- TẮT khi chạy load thật!)
```

### Đọc kết quả

```
Aggregate Report:
+──────────+─────────+────────+────────+────────+────────+───────+
| Label    | Samples | Avg(ms)| P90(ms)| P95(ms)| P99(ms)| Error%|
+──────────+─────────+────────+────────+────────+────────+───────+
| Login    | 10,000  | 450    | 890    | 1,200  | 2,800  | 0.5%  |
+──────────+─────────+────────+────────+────────+────────+───────+

Phân tích:
- Avg 450ms -- tốt
- P90 890ms -- tốt
- P95 1.2s  -- OK, dưới 2s target
- P99 2.8s  -- VƯỢT target 2s cho 1% users --> cần investigate
- Error 0.5% -- dưới 1% target --> OK

Recommendation: Investigate P99 spike -- có thể do slow database query
khi nhiều users login cùng lúc --> cần optimize query hoặc thêm index.
```

---

## Best Practices

### 1. KHÔNG dùng GUI khi chạy load test thật

```bash
# GUI chỉ để THIẾT KẾ và DEBUG test
# Khi chạy load test thật --> dùng CLI (non-GUI mode):
jmeter -n -t test-plan.jmx -l results.jtl -e -o report/

# Giải thích:
# -n          = non-GUI mode (nhẹ hơn, nhanh hơn)
# -t          = file test plan (.jmx)
# -l          = file lưu kết quả
# -e -o       = tạo HTML report
```

::: warning
Chạy load test bằng GUI sẽ **ăn rất nhiều RAM** của máy bạn --> kết quả không chính xác (máy bạn chậm, không phải server chậm). LUÔN dùng CLI mode cho load test thật.
:::

### 2. Think Time -- Mô phỏng người dùng THẬT

```
Người dùng thật KHÔNG click liên tục không nghỉ.
Họ đọc trang, suy nghĩ, rồi mới click tiếp.

Thêm "Constant Timer" hoặc "Gaussian Random Timer" giữa requests:
- Min: 1000ms (1 giây)
- Max: 5000ms (5 giây)

Không có think time = mô phỏng robot, không phải người dùng.
```

### 3. Test data phải đa dạng

```
SAI:  100 users cùng login email "test@test.com"
      --> Server cache kết quả, performance giả tốt

ĐÚNG: 100 users dùng 100 email khác nhau (từ CSV file)
      --> Mô phỏng thật tế hơn
```

---

## Tóm tắt chương

| Component | Ẩn dụ | Mục đích |
|---|---|---|
| **Thread Group** | Đám đông | Config số users, ramp-up, duration |
| **HTTP Request** | Mỗi người gửi gì | Request đến server |
| **Assertions** | Kiểm tra đơn hàng | Verify response đúng và nhanh |
| **Listeners** | Báo cáo | Xem results: Summary, Aggregate, Graph |
| **CLI mode** | Chạy thật | Load test thật phải dùng CLI, không GUI |
| **Think Time** | Người thật nghỉ giữa các click | Mô phỏng realistic |
