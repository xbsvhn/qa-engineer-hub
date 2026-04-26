# Testing Types

## Functional Testing

Kiểm tra hệ thống **làm đúng** những gì được yêu cầu.

| Loại | Mô tả |
|---|---|
| **Smoke Testing** | Test nhanh các chức năng chính, đảm bảo build ổn định |
| **Sanity Testing** | Test tập trung vào phần vừa fix/thay đổi |
| **Regression Testing** | Test lại các chức năng cũ sau khi có thay đổi |
| **Retesting** | Test lại bug đã fix |

### Smoke vs Sanity

```
Build mới → Smoke Test (rộng, nông) → Pass → Sanity Test (hẹp, sâu)
                                     → Fail → Reject build
```

### Regression vs Retesting

- **Retesting:** Test lại **đúng bug** đã fix → Confirm fixed hay chưa
- **Regression:** Test các **chức năng liên quan** → Đảm bảo fix bug không gây lỗi mới

## Non-functional Testing

Kiểm tra hệ thống hoạt động **tốt như thế nào**.

| Loại | Mô tả |
|---|---|
| **Performance Testing** | Đo tốc độ, throughput, resource usage |
| **Load Testing** | Test dưới tải bình thường và cao |
| **Stress Testing** | Test vượt quá giới hạn hệ thống |
| **Security Testing** | Tìm lỗ hổng bảo mật |
| **Usability Testing** | Đánh giá trải nghiệm người dùng |
| **Compatibility Testing** | Test trên nhiều browser/device/OS |
| **Accessibility Testing** | Đảm bảo người khuyết tật sử dụng được |

## Maintenance Testing

- **Hot fix testing** - Test bản vá khẩn cấp
- **Patch testing** - Test bản cập nhật
- **Upgrade testing** - Test phiên bản mới

::: info Ghi nhớ
Một dự án thực tế sẽ cần **kết hợp nhiều loại testing**. QA cần hiểu rõ từng loại để đề xuất test strategy phù hợp.
:::
