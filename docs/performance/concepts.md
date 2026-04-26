# Performance Concepts

## Tai sao Performance Testing quan trong?

Mot app **chay dung** nhung **chay CHAM** = app **hong** trong mat nguoi dung.

- **53% users** roi trang neu load > 3 giay (Google research)
- **Amazon**: moi 100ms delay = giam 1% doanh thu
- **Performance bug** kho tim hon functional bug -- app "chay dung" nhung cham dan khi co nhieu nguoi dung

::: tip Aha moment
Functional testing hoi: "App co LAM DUNG khong?" Performance testing hoi: "App co lam dung NHANH KHONG khi 1000 nguoi dung cung luc?" -- hai cau hoi khac nhau hoan toan.
:::

---

## Metrics = "Chi so suc khoe" cua he thong

### Response Time -- Thoi gian phan hoi

```
Client gui request ────────────────────> Server xu ly ──> Client nhan response
|<──────────────── Response Time ──────────────────────────────────>|
```

Tuong tuong ban goi mon an trong nha hang. Response time = thoi gian tu luc ban goi den luc mon an len ban.

### P90/P95/P99 -- Giai thich bang vi du that

**Vi du:** 100 nguoi goi mon an trong nha hang.

| Metric | Y nghia | Vi du | Target pho bien |
|---|---|---|---|
| **Average** | Trung binh | Trung binh moi nguoi doi 5 phut | Tham khao, KHONG dung de danh gia |
| **P50 (Median)** | 50 nguoi nhan do an trong... | 3 phut | < 1 giay |
| **P90** | 90 nguoi nhan do an trong... | 8 phut | < 3 giay |
| **P95** | 95 nguoi nhan do an trong... | 12 phut | < 5 giay |
| **P99** | 99 nguoi nhan do an trong... | 25 phut (1 nguoi xui) | < 10 giay |

::: warning Dung chi nhin Average -- no la "bay" kinh dien!
```
4 requests: 1ms, 1ms, 1ms, 10,000ms
Average = (1 + 1 + 1 + 10,000) / 4 = 2,500ms --> "trong co ve OK"
NHUNG P99 = 10,000ms --> 1% users doi 10 GIAY!
```
Average che giau nhung truong hop te nhat. **LUON report P90/P95** thay vi chi Average.
:::

::: tip Aha moment
Khi lead hoi "Performance co OK khong?", dung tra loi "Average la 500ms". Hay tra loi "P95 la 1.2 giay, nghia la 95% requests nhanh hon 1.2s, chi 5% cham hon." -- day moi la thong tin co gia tri.
:::

### Throughput = Cong suat xu ly

| Metric | Y nghia |
|---|---|
| **RPS** (Requests per second) | So requests server xu ly duoc moi giay |
| **TPS** (Transactions per second) | So transactions hoan thanh moi giay |

Giong nhu nha hang phuc vu duoc bao nhieu mon/phut. RPS cao = nha hang nhanh nhen.

### Error Rate = Ty le that bai

```
Error Rate = (So requests loi / Tong requests) x 100%

Target: < 1% duoi tai binh thuong
        < 5% duoi stress test
```

Giong ty le order bi sai trong nha hang. 1% la chap nhan duoc. 10% = nha hang co van de nghiem trong.

### Resource Utilization = "Suc khoe" cua server

| Resource | Metric | Bao dong khi |
|---|---|---|
| **CPU** | % su dung | > 80% lien tuc |
| **Memory** | % su dung, co tang lien tuc? | > 85% hoac tang dan khong ngung |
| **Disk I/O** | Toc do doc/ghi | Bottleneck |
| **Network** | Bandwidth | Bao hoa |

---

## Cac loai Performance Testing -- Chi tiet

### 1. Load Testing = "Nha hang co phuc vu duoc 200 khach khong?"

**Muc dich:** Verify he thong hoat dong tot voi **so users DU KIEN** (khong vuot qua gioi han).

```
Users
  |
200+────────────────────────────────
  |                              (giu 200 users trong 30 phut)
  |           /──────────────────
  |         /
  |       /    (ramp up 5 phut -- tang dan tu 0 len 200)
  |     /
  |   /
  0+─/─────────────────────────────> Thoi gian
   0    5min              35min
```

**Khi dung:** Truoc release, verify SLA (Service Level Agreement -- cam ket ve performance).

### 2. Stress Testing = "Nha hang VO o diem nao?"

**Muc dich:** Tim **breaking point** -- he thong chiu duoc BAO NHIEU users truoc khi "chet".

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
  0+─────/────────────────────────> Thoi gian
        (tang dan cho den khi "vo")
```

**Khi dung:** Biet capacity limit, plan cho growth. "He thong hien tai chiu duoc 500 users, nam sau can 800 --> can nang cap."

### 3. Spike Testing = "Dot ngot tu 10 khach len 500 khach"

**Muc dich:** He thong react sao khi tai **tang DOT NGOT** (flash sale, bai viral, event).

```
Users
  |
1000+──────+
  |        |    +──────+
  |        |    |      |
  |        |    |      |
 100+──────+────+──────+──────
  |
  0+──────────────────────────> Thoi gian
      Spike  Normal  Spike
```

**Verify:** He thong co **recover** sau spike? Co mat data khong? Error rate bao nhieu?

Giong nhu nha hang binh thuong phuc vu 10 khach, dot ngot 500 khach keo den (co ngoi sao review tren TikTok). Nha hang co ung pho duoc khong? Hay chaos?

### 4. Endurance Testing = "Phuc vu 200 khach LIEN TUC 24 gio"

**Muc dich:** Tim **memory leaks** va **degradation** khi chay lau.

```
Users
  |
200+──────────────────────────────── (200 users lien tuc 24 gio)
  |
  0+──────────────────────────────> Thoi gian
   0                              24h
```

**Verify:** Response time co **tang dan** theo thoi gian? Memory co **leak** (tang mai khong giam)? Database connections co tang?

::: tip Aha moment
Memory leak = voi nuoc bi ri. Luong nuoc ri rat nho, ban khong nhan ra. Nhung de 24 gio, san nha ngap. Endurance testing giup tim nhung "voi nuoc ri" nay.
:::

---

## Bottleneck = "Nut that" lam cham he thong

**Bottleneck** giong nhu **diem tac duong** tren xa lo. Du xa lo rong 6 lan, neu co 1 diem chi con 2 lan --> TAT CA xe phai chen qua 2 lan do --> cham.

### Bottleneck pho bien

| Bottleneck | Trieu chung | Giai phap |
|---|---|---|
| **Slow DB queries** | Response time cao, CPU database cao | Toi uu query, them index |
| **Memory leak** | Memory tang dan, cuoi cung crash | Fix code, tang memory |
| **Connection pool** | Timeout errors, "connection refused" | Tang pool size |
| **Blocking I/O** | Throughput thap, wait time cao | Async processing, caching |
| **Bandwidth** | Download cham, timeout | CDN, compression, lazy loading |

---

## Performance Testing Process -- 6 buoc

```
1. Define Requirements
   "Response time < 2s, chiu 1000 concurrent users, error rate < 1%"

2. Plan Tests
   Chon tool (K6/JMeter), thiet ke scenario, chuan bi test data

3. Create Scripts
   Viet test scripts, configure load patterns

4. Execute Tests
   Chay tests, DONG THOI monitor resources (CPU, Memory, DB)

5. Analyze Results
   So sanh voi requirements, tim bottlenecks

6. Report & Re-test
   Bao cao findings, phoi hop voi dev fix, chay lai de verify
```

---

## Doc ket qua -- Vi du thuc te

### Ket qua Load Test

```
Scenario: 200 concurrent users, 30 phut
Target: Response time < 2s, Error rate < 1%

Results:
+────────────────+──────────+────────+
| Metric         | Ket qua  | Status |
+────────────────+──────────+────────+
| Avg Response   | 850ms    | OK     |
| P90 Response   | 1,200ms  | OK     |
| P95 Response   | 1,800ms  | OK     |
| P99 Response   | 4,500ms  | FAIL   |
| Throughput     | 150 RPS  | OK     |
| Error Rate     | 0.3%     | OK     |
| CPU Usage      | 72%      | WARN   |
+────────────────+──────────+────────+

Phan tich:
- P99 = 4.5s --> 1% users trai nghiem CHAM (vuot target 2s)
- CPU 72% --> gan nguong bao dong 80%, it room cho growth
- Recommendation: Toi uu slow queries (nguyen nhan P99 cao)
```

::: tip Aha moment
Khi bao cao performance test, DUNG chi liet ke so lieu. Hay tra loi cau hoi: "Vay co PASS khong?" va "Neu FAIL thi vi SAO va can lam gi?" -- day la gia tri cua QA.
:::

---

## Tom tat chuong

| Concept | An du | Diem cot loi |
|---|---|---|
| **Response Time** | Thoi gian doi mon an | Dung P90/P95, KHONG chi Average |
| **Throughput** | So mon phuc vu/phut | RPS cang cao cang tot |
| **Error Rate** | Ty le order sai | < 1% binh thuong, < 5% stress |
| **Load Test** | 200 khach nhu binh thuong | Verify he thong chiu duoc tai du kien |
| **Stress Test** | Tang khach cho den khi "vo" | Tim breaking point |
| **Spike Test** | Dot ngot 500 khach keo den | Test tai dot ngot |
| **Endurance** | 200 khach lien tuc 24h | Tim memory leaks |
| **Bottleneck** | Diem tac duong | Tim va xu ly diem cham nhat |
