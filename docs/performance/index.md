# Performance Testing

## Ban chat: Do "suc khoe" cua he thong

Tuong tuong ban mo mot nha hang. Functional testing = kiem tra **do an co ngon khong** (chuc nang dung). Performance testing = kiem tra **nha hang phuc vu duoc bao nhieu khach cung luc** ma van dam bao chat luong.

- App load **3 giay** thay vi 0.5 giay? **53% user se tat di** (Google research)
- Amazon: moi **100ms cham** hon = **giam 1% doanh thu**
- Performance bug **kho tim hon** functional bug -- phai do luong co he thong

## Cac loai Performance Testing -- Tong quan

```
Load Testing      --> Nha hang phuc vu duoc 200 khach cung luc khong?
Stress Testing    --> Nha hang "vo" o diem nao? 500 khach? 1000 khach?
Spike Testing     --> 10 khach dot ngot tang len 500 thi sao?
Endurance Testing --> Phuc vu 200 khach LIEN TUC 24h co on khong?
```

## Noi dung section nay

| # | Chu de | Mo ta |
|---|---|---|
| 1 | [Performance Concepts](./concepts) | Metrics (P90/P95/P99), cac loai test, phan tich ket qua |
| 2 | [JMeter](./jmeter) | Tool GUI pho bien, Thread Groups, Reports |
| 3 | [K6](./k6) | Modern tool viet bang JavaScript, tich hop CI/CD |

## Khi nao QA can Performance Testing?

| Tinh huong | Action |
|---|---|
| Truoc major release | Load test voi so user du kien |
| Sau khi doi database/API | Verify khong bi cham hon truoc |
| User phan nan "app cham" | Tim bottleneck |
| Chuan bi su kien (sale, campaign) | Stress test voi peak load |
