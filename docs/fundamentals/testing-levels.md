# Testing Levels

Các cấp độ kiểm thử tương ứng với các giai đoạn phát triển phần mềm.

## 1. Unit Testing

- **Ai thực hiện:** Developer
- **Đối tượng:** Từng function, method, class riêng lẻ
- **Mục đích:** Đảm bảo từng đơn vị code hoạt động đúng
- **Tools:** JUnit, NUnit, pytest, Jest

```javascript
// Ví dụ Unit Test
function add(a, b) {
  return a + b;
}

test('add 1 + 2 = 3', () => {
  expect(add(1, 2)).toBe(3);
});
```

## 2. Integration Testing

- **Ai thực hiện:** Developer / QA
- **Đối tượng:** Tương tác giữa các module/component
- **Mục đích:** Phát hiện lỗi giao tiếp giữa các thành phần

### Approaches
- **Big Bang:** Tích hợp tất cả cùng lúc
- **Top-down:** Từ module cao nhất xuống
- **Bottom-up:** Từ module thấp nhất lên
- **Sandwich:** Kết hợp Top-down và Bottom-up

## 3. System Testing

- **Ai thực hiện:** QA Team
- **Đối tượng:** Toàn bộ hệ thống
- **Mục đích:** Xác minh hệ thống đáp ứng requirements
- **Bao gồm:** Functional & Non-functional testing

## 4. Acceptance Testing (UAT)

- **Ai thực hiện:** End users / Business team
- **Đối tượng:** Toàn bộ hệ thống từ góc nhìn người dùng
- **Mục đích:** Xác nhận hệ thống sẵn sàng đưa vào sử dụng

### Phân loại
- **Alpha Testing:** Test tại môi trường của developer
- **Beta Testing:** Test tại môi trường thực tế với user thật

## Testing Pyramid

```
        /  UAT  \          ← Ít test, chạy chậm, chi phí cao
       /  System  \
      / Integration \
     /   Unit Tests  \     ← Nhiều test, chạy nhanh, chi phí thấp
```

::: tip Best Practice
Nên có **nhiều Unit Test**, vừa phải Integration Test, và **ít** UI/E2E Test. Đây gọi là Testing Pyramid.
:::
