# Test Design Techniques

Kỹ thuật thiết kế test case giúp tạo ra bộ test case hiệu quả với số lượng test case tối thiểu nhưng coverage tối đa.

## Black-box Techniques

### 1. Equivalence Partitioning (EP)

Chia dữ liệu đầu vào thành các **nhóm tương đương**. Chỉ cần test 1 giá trị đại diện cho mỗi nhóm.

**Ví dụ:** Trường tuổi chấp nhận 18-60

| Partition | Giá trị | Expected |
|---|---|---|
| Invalid (< 18) | 10 | Reject |
| Valid (18-60) | 30 | Accept |
| Invalid (> 60) | 70 | Reject |

### 2. Boundary Value Analysis (BVA)

Test tại các **giá trị biên** - nơi lỗi thường xảy ra nhất.

**Ví dụ:** Trường tuổi chấp nhận 18-60

```
Test values: 17, 18, 19, 59, 60, 61
```

### 3. Decision Table

Dùng khi có **nhiều điều kiện kết hợp** tạo ra các kết quả khác nhau.

| Điều kiện | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| Tuổi >= 18 | Y | Y | N | N |
| Có CMND | Y | N | Y | N |
| **Kết quả** | Approve | Reject | Reject | Reject |

### 4. State Transition

Dùng khi hệ thống có **các trạng thái** và chuyển đổi giữa chúng.

```
[Draft] --Submit--> [Pending] --Approve--> [Published]
                              --Reject---> [Draft]
```

### 5. Use Case Testing

Test dựa trên **use case/user story** - mô phỏng hành vi thực tế của user.

## White-box Techniques

### Statement Coverage
Đảm bảo mọi **dòng code** được thực thi ít nhất 1 lần.

### Branch Coverage
Đảm bảo mọi **nhánh** (if/else) được thực thi ít nhất 1 lần.

### Path Coverage
Đảm bảo mọi **đường đi** qua code được thực thi.

::: warning Lưu ý
Trong thực tế, QA thường sử dụng kết hợp nhiều kỹ thuật. Không có kỹ thuật nào là "tốt nhất" - chỉ có kỹ thuật **phù hợp nhất** cho từng trường hợp.
:::
