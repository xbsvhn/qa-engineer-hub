# Exploratory Testing

## Exploratory Testing là gì?

Exploratory Testing là phương pháp kiểm thử mà việc **học, thiết kế và thực thi test** diễn ra đồng thời, dựa trên kinh nghiệm và tư duy phân tích của tester.

## So sánh với Scripted Testing

| Scripted Testing | Exploratory Testing |
|---|---|
| Follow test case có sẵn | Tự do khám phá |
| Planned trước | Real-time decision |
| Đảm bảo coverage | Tìm unexpected bugs |
| Ai cũng execute được | Cần kinh nghiệm |

## Session-based Exploratory Testing

### Charter (Nhiệm vụ)
Xác định **mục tiêu** và **phạm vi** cho session.

```
Charter: Explore the checkout flow
         focusing on payment methods
         to discover usability issues
```

### Time-box
Mỗi session thường kéo dài **60-90 phút**.

### Session Report
- Bugs found
- Areas covered
- Notes & observations
- Questions & concerns

## Kỹ thuật Exploratory Testing

### 1. Tours
- **Feature Tour:** Đi qua tất cả features
- **Complexity Tour:** Test phần phức tạp nhất
- **Claims Tour:** Verify mọi claim trên UI

### 2. Heuristics
- **SFDPOT:** Structure, Function, Data, Platform, Operations, Time
- **RCRCRC:** Recent, Core, Risky, Configuration, Repaired, Chronic

### 3. Persona-based
Test từ góc nhìn của các loại user khác nhau:
- New user (lần đầu dùng)
- Power user (dùng nhiều tính năng)
- Malicious user (cố tình phá)

::: tip
Exploratory Testing **không thay thế** Scripted Testing. Kết hợp cả hai sẽ cho kết quả tốt nhất.
:::
