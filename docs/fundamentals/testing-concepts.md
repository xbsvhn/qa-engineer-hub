# Testing Concepts

## Testing là gì?

Software Testing là quá trình đánh giá và xác minh rằng một sản phẩm phần mềm hoạt động đúng như mong đợi. Testing giúp phát hiện bugs, đảm bảo chất lượng và giảm rủi ro.

## 7 Nguyên tắc kiểm thử (ISTQB)

### 1. Testing shows the presence of defects, not their absence
Testing chỉ có thể chứng minh phần mềm **có lỗi**, không thể chứng minh phần mềm **không có lỗi**.

### 2. Exhaustive testing is impossible
Không thể test tất cả các tổ hợp đầu vào. Cần sử dụng **risk analysis** và **priorities** để tập trung vào những phần quan trọng nhất.

### 3. Early testing saves time and money
Phát hiện lỗi càng sớm, chi phí sửa càng thấp. **Shift-left testing** là xu hướng hiện đại.

### 4. Defects cluster together
Phần lớn lỗi tập trung ở một số ít module. Áp dụng **Pareto Principle** (80/20).

### 5. Pesticide paradox
Chạy đi chạy lại cùng một bộ test case sẽ không tìm được lỗi mới. Cần **review và cập nhật** test case thường xuyên.

### 6. Testing is context dependent
Cách test một ứng dụng e-commerce khác với cách test phần mềm y tế. **Context** quyết định approach.

### 7. Absence-of-errors is a fallacy
Phần mềm không có lỗi nhưng không đáp ứng nhu cầu người dùng thì vẫn **thất bại**.

## Verification vs Validation

| | Verification | Validation |
|---|---|---|
| **Câu hỏi** | Are we building the product right? | Are we building the right product? |
| **Mục đích** | Kiểm tra sản phẩm đúng spec | Kiểm tra sản phẩm đúng nhu cầu user |
| **Phương pháp** | Review, Inspection, Walkthrough | Testing, Demo, UAT |

## Error, Defect, Failure

- **Error (Mistake)**: Lỗi do con người tạo ra trong quá trình coding
- **Defect (Bug)**: Sai sót trong code/document, kết quả của Error
- **Failure**: Hệ thống hoạt động không đúng, kết quả của Defect

```
Error → Defect → Failure
(Người) → (Code) → (Hệ thống)
```

::: info Ghi nhớ
Không phải mọi Error đều tạo ra Defect, và không phải mọi Defect đều gây ra Failure.
:::
