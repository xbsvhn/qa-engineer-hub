# Postman

## Postman là gì?

Postman là tool phổ biến nhất để test và phát triển APIs, cung cấp giao diện trực quan để gửi HTTP requests.

## Các tính năng chính

- **Collections:** Nhóm các API requests theo project/module
- **Environments:** Quản lý biến theo môi trường (dev, staging, prod)
- **Tests:** Viết assertions bằng JavaScript
- **Pre-request Scripts:** Setup data trước mỗi request
- **Runner:** Chạy collection tự động
- **Mock Server:** Tạo mock API cho frontend

## Viết Tests trong Postman

```javascript
// Check status code
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

// Check response body
pm.test("Response has user data", () => {
  const json = pm.response.json();
  pm.expect(json.name).to.be.a('string');
  pm.expect(json.email).to.include('@');
});

// Check response time
pm.test("Response time < 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
