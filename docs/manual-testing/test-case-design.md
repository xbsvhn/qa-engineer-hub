# Test Case Design

## Test Case là gì?

Test Case là tập hợp các điều kiện, bước thực hiện và kết quả mong đợi để xác minh một chức năng cụ thể hoạt động đúng.

## Cấu trúc Test Case chuẩn

| Field | Mô tả | Ví dụ |
|---|---|---|
| **Test Case ID** | Mã định danh | TC_LOGIN_001 |
| **Title** | Tên ngắn gọn | Verify login with valid credentials |
| **Precondition** | Điều kiện tiên quyết | User account exists and is active |
| **Test Steps** | Các bước thực hiện | 1. Navigate to login page... |
| **Test Data** | Dữ liệu test | email: test@mail.com, pass: Test@123 |
| **Expected Result** | Kết quả mong đợi | User is redirected to dashboard |
| **Priority** | Độ ưu tiên | High / Medium / Low |

## Nguyên tắc viết Test Case tốt

### 1. Clear & Concise
- Mỗi step chỉ nên có **1 hành động**
- Dùng ngôn ngữ đơn giản, tránh mơ hồ

### 2. Independent
- Mỗi test case **không phụ thuộc** vào test case khác
- Có thể chạy độc lập theo bất kỳ thứ tự nào

### 3. Traceable
- Link đến requirement/user story tương ứng
- Đảm bảo **traceability matrix**

### 4. Reusable
- Viết đủ generic để có thể reuse
- Tách common steps thành shared preconditions

## Ví dụ Test Case

```
TC_LOGIN_001: Verify successful login with valid credentials

Precondition:
- User has registered account (email: test@mail.com, pass: Test@123)
- User is on login page

Steps:
1. Enter email "test@mail.com" in email field
2. Enter password "Test@123" in password field
3. Click "Login" button

Expected Result:
- User is redirected to Dashboard page
- Welcome message displays user's name
- Login session is created
```

::: warning Lỗi thường gặp
- Test case quá dài, có quá nhiều steps
- Expected result mơ hồ ("hệ thống hoạt động bình thường")
- Thiếu test data cụ thể
- Không có negative test cases
:::
