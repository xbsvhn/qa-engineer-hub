# JMeter

## Ban chat: JMeter = "Mo phong dam dong" truy cap app

Tuong tuong ban muon biet nha hang phuc vu duoc bao nhieu khach. Ban **khong the** moi 1000 nguoi that den -- nhung ban co the **mo phong** 1000 nguoi bang JMeter.

> **Apache JMeter** = tool tao ra **hang tram, hang ngan "nguoi dung ao"** (virtual users) gui request den server cua ban cung luc, roi do xem server co chiu noi khong.

### JMeter vs K6 -- Chon cai nao?

| Tinh huong | JMeter | K6 |
|---|---|---|
| Team **khong biet code** | Dung GUI keo tha | Can viet JavaScript |
| Can **giao dien truc quan** | Co GUI | Khong co GUI |
| Test **JDBC, FTP, SOAP** | Ho tro nhieu protocols | Chu yeu HTTP/REST |
| Du an moi, **modern stack** | OK nhung cu | Phu hop hon |
| Tich hop **CI/CD** | Can config them | Native support |

---

## Cai dat

```bash
# Yeu cau: Java 8 tro len (JMeter chay tren Java)
java -version

# Download: https://jmeter.apache.org/download_jmeter.cgi
# Giai nen va chay:
cd apache-jmeter-5.x/bin
./jmeter.sh     # macOS/Linux
jmeter.bat      # Windows
# --> Cua so GUI cua JMeter se mo ra
```

---

## Cac thanh phan chinh -- Giai thich bang an du

### Test Plan Structure

```
Test Plan                        (= "Ke hoach test toan bo")
+-- Thread Group                 (= "Dam dong" -- 100 nguoi dung ao)
|   +-- HTTP Request             (= Moi nguoi gui 1 request den server)
|   +-- HTTP Header Manager      (= Dinh kem header: Content-Type, Auth token)
|   +-- CSV Data Set Config      (= Doc test data tu file CSV)
|   +-- Response Assertion       (= Kiem tra response co dung khong)
|   +-- View Results Tree        (= Xem chi tiet tung response -- CHI DE DEBUG)
+-- Summary Report               (= Bao cao tong hop)
+-- Aggregate Report             (= Bao cao P90, P95, P99)
```

### Thread Group = "Dam dong nguoi dung ao"

"Thread" trong JMeter = 1 virtual user. "Thread Group" = nhom virtual users.

```
Thread Group Settings:
- Number of Threads: 100        <-- 100 nguoi dung ao
- Ramp-up Period: 60 seconds    <-- Tang DAN trong 60 giay (khong do het 100 nguoi cung luc)
- Loop Count: 10                <-- Moi user gui 10 lan
- Duration: 300 seconds         <-- Hoac chay trong 5 phut

Timeline (voi 100 threads, ramp-up 60s):
Giay 0:   0 users
Giay 6:  10 users
Giay 12: 20 users
...
Giay 60: 100 users (full load)
--> Giu 100 users cho den het duration
```

::: tip Aha moment
**Ramp-up** rat quan trong! Neu de ramp-up = 0 (100 users cung luc), giong nhu 100 nguoi chen vao cua nha hang CUNG LUC -- khong thuc te. Nguoi dung that den **DAN DAN** -- nen ramp-up nen tu 1-5 phut.
:::

### HTTP Request = "Moi nguoi gui gi?"

```
Protocol: https
Server: api.example.com
Port: 443
Method: POST
Path: /api/auth/login
Body: {"email":"user${__threadNum}@test.com","password":"Pass@123"}
       ^^^ ${__threadNum} = so thu tu thread (1, 2, 3...)
           --> Moi user dung email khac nhau
```

### Assertions = "Kiem tra response co dung khong?"

| Assertion | Kiem tra gi | Vi du |
|---|---|---|
| **Response Assertion** | Status code, body text | Status = 200, body co "success" |
| **Duration Assertion** | Response time | < 2000ms |
| **Size Assertion** | Kich thuoc response | < 1MB |
| **JSON Assertion** | Gia tri trong JSON | `$.data.length` > 0 |

---

## Vi du thuc te: Load Test Login API

### Scenario

```
Muc tieu: 100 users login dong thoi
Thoi gian: 5 phut
Target: Response time < 2s, Error rate < 1%
```

### Setup trong JMeter

```
1. Tao Thread Group:
   - Threads: 100           (100 nguoi dung ao)
   - Ramp-up: 60s           (tang dan trong 1 phut)
   - Duration: 300s          (chay 5 phut)

2. Them HTTP Request:
   - POST https://api.example.com/auth/login
   - Body: {"email":"user${__threadNum}@test.com","password":"Pass@123"}

3. Them HTTP Header Manager:
   - Content-Type: application/json

4. Them Response Assertion:
   - Response code: 200

5. Them Duration Assertion:
   - Max duration: 2000ms

6. Them Listeners (xem ket qua):
   - Summary Report      (tong quan)
   - Aggregate Report    (P90, P95, P99)
   - View Results Tree   (debug only -- TAT khi chay load that!)
```

### Doc ket qua

```
Aggregate Report:
+──────────+─────────+────────+────────+────────+────────+───────+
| Label    | Samples | Avg(ms)| P90(ms)| P95(ms)| P99(ms)| Error%|
+──────────+─────────+────────+────────+────────+────────+───────+
| Login    | 10,000  | 450    | 890    | 1,200  | 2,800  | 0.5%  |
+──────────+─────────+────────+────────+────────+────────+───────+

Phan tich:
- Avg 450ms -- tot
- P90 890ms -- tot
- P95 1.2s  -- OK, duoi 2s target
- P99 2.8s  -- VUOT target 2s cho 1% users --> can investigate
- Error 0.5% -- duoi 1% target --> OK

Recommendation: Investigate P99 spike -- co the do slow database query
khi nhieu users login cung luc --> can optimize query hoac them index.
```

---

## Best Practices

### 1. KHONG dung GUI khi chay load test that

```bash
# GUI chi de THIET KE va DEBUG test
# Khi chay load test that --> dung CLI (non-GUI mode):
jmeter -n -t test-plan.jmx -l results.jtl -e -o report/

# Giai thich:
# -n          = non-GUI mode (nhe hon, nhanh hon)
# -t          = file test plan (.jmx)
# -l          = file luu ket qua
# -e -o       = tao HTML report
```

::: warning
Chay load test bang GUI se **an rat nhieu RAM** cua may ban --> ket qua khong chinh xac (may ban cham, khong phai server cham). LUON dung CLI mode cho load test that.
:::

### 2. Think Time -- Mo phong nguoi dung THAT

```
Nguoi dung that KHONG click lien tuc khong nghi.
Ho doc trang, suy nghi, roi moi click tiep.

Them "Constant Timer" hoac "Gaussian Random Timer" giua requests:
- Min: 1000ms (1 giay)
- Max: 5000ms (5 giay)

Khong co think time = mo phong robot, khong phai nguoi dung.
```

### 3. Test data phai da dang

```
SAI:  100 users cung login email "test@test.com"
      --> Server cache ket qua, performance gia tot

DUNG: 100 users dung 100 email khac nhau (tu CSV file)
      --> Mo phong that te hon
```

---

## Tom tat chuong

| Component | An du | Muc dich |
|---|---|---|
| **Thread Group** | Dam dong | Config so users, ramp-up, duration |
| **HTTP Request** | Moi nguoi gui gi | Request den server |
| **Assertions** | Kiem tra don hang | Verify response dung va nhanh |
| **Listeners** | Bao cao | Xem results: Summary, Aggregate, Graph |
| **CLI mode** | Chay that | Load test that phai dung CLI, khong GUI |
| **Think Time** | Nguoi that nghi giua cac click | Mo phong realistic |
