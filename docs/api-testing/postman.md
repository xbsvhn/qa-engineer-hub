# Postman

## Postman là gì? (WHAT)

Postman là tool **phổ biến nhất** để test API, cung cấp giao diện trực quan để gửi HTTP requests mà không cần viết code. Đây thường là tool **đầu tiên** QA học khi bắt đầu API testing.

### Tại sao dùng Postman? (WHY)

- **Không cần code** — giao diện GUI dễ dùng
- **Nhanh** — gửi request, xem response ngay lập tức
- **Lưu trữ** — organize requests thành Collections
- **Chia sẻ** — share collections với team
- **Automation** — viết tests, chạy Collection Runner
- **Miễn phí** — bản free đủ dùng cho hầu hết QA

---

## Giao diện Postman

```
┌─────────────────────────────────────────────────────────────┐
│  Collections │          Request Builder                      │
│  ├── Auth    │  ┌─────────────────────────────────────────┐ │
│  │  ├── Login│  │ [POST ▼] https://api.example.com/users  │ │
│  │  └── ...  │  │                                    [Send]│ │
│  ├── Users   │  ├─────────────────────────────────────────┤ │
│  │  ├── GET  │  │ Params │ Auth │ Headers │ Body │ Tests  │ │
│  │  ├── POST │  │                                         │ │
│  │  └── ...  │  │ Body (raw - JSON):                      │ │
│  └── Orders  │  │ {                                       │ │
│              │  │   "name": "Test User",                  │ │
│  Environments│  │   "email": "test@mail.com"              │ │
│  ├── Dev     │  │ }                                       │ │
│  ├── Staging │  ├─────────────────────────────────────────┤ │
│  └── Prod    │  │ Response:    Status: 201    Time: 120ms │ │
│              │  │ {                                       │ │
│              │  │   "id": 1,                              │ │
│              │  │   "name": "Test User"                   │ │
│              │  │ }                                       │ │
│              │  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Gửi Request đầu tiên

### GET Request

```
Method: GET
URL: https://jsonplaceholder.typicode.com/users/1
Headers: (không cần)
Body: (không cần)

→ Click Send

Response (200 OK):
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz"
}
```

### POST Request

```
Method: POST
URL: https://jsonplaceholder.typicode.com/users
Headers:
  Content-Type: application/json
Body (raw - JSON):
{
  "name": "Test User",
  "email": "test@mail.com",
  "phone": "0901234567"
}

→ Click Send

Response (201 Created):
{
  "id": 11,
  "name": "Test User",
  "email": "test@mail.com"
}
```

---

## Environments — Quản lý môi trường

### Vấn đề

Bạn có 3 môi trường: Dev, Staging, Production. Mỗi môi trường có URL khác nhau. Không lẽ tạo 3 bộ requests giống nhau?

### Giải pháp: Environment Variables

**Tạo Environments:**

```
[Dev Environment]
base_url = http://localhost:3000
api_key = dev-key-123

[Staging Environment]
base_url = https://staging-api.example.com
api_key = staging-key-456

[Production Environment]
base_url = https://api.example.com
api_key = prod-key-789
```

**Dùng trong Request:**

```
URL: {{base_url}}/api/users
Headers:
  X-API-Key: {{api_key}}
```

Chỉ cần **đổi environment** (dropdown góc trên phải) → tất cả requests tự đổi URL.

### Biến thường dùng

| Biến | Ví dụ | Mục đích |
|---|---|---|
| `{{base_url}}` | `https://staging.example.com` | Base URL theo environment |
| `{{token}}` | `eyJhbGci...` | Auth token (set từ login response) |
| `{{user_id}}` | `123` | ID tạo từ request trước |
| `{{api_key}}` | `key-abc` | API key theo environment |

---

## Tests — Viết Assertions

Đây là phần **quan trọng nhất** — biến Postman từ "tool gửi request" thành "automation tool".

### Cú pháp

Tests được viết trong tab **Tests** bằng JavaScript:

```javascript
// ===== Status Code =====
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

// Hoặc kiểm tra range
pm.test("Status code is 2xx", () => {
  pm.expect(pm.response.code).to.be.within(200, 299);
});

// ===== Response Body =====
pm.test("Response has correct user data", () => {
  const json = pm.response.json();
  pm.expect(json.name).to.eql("Test User");
  pm.expect(json.email).to.include("@");
  pm.expect(json.id).to.be.a("number");
});

// ===== Response Time =====
pm.test("Response time < 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// ===== Headers =====
pm.test("Content-Type is JSON", () => {
  pm.response.to.have.header("Content-Type", "application/json; charset=utf-8");
});

// ===== Array =====
pm.test("Response returns 10 users", () => {
  const json = pm.response.json();
  pm.expect(json).to.be.an("array");
  pm.expect(json.length).to.eql(10);
});

// ===== Nested Object =====
pm.test("User has valid address", () => {
  const json = pm.response.json();
  pm.expect(json.address).to.have.property("city");
  pm.expect(json.address.city).to.be.a("string");
});

// ===== JSON Schema Validation =====
pm.test("Response matches schema", () => {
  const schema = {
    type: "object",
    required: ["id", "name", "email"],
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      email: { type: "string" }
    }
  };
  pm.response.to.have.jsonSchema(schema);
});
```

### Lưu data từ Response → Variables

```javascript
// Login → lưu token để dùng cho requests sau
pm.test("Save auth token", () => {
  const json = pm.response.json();
  pm.environment.set("token", json.token);
});

// Create user → lưu user_id
pm.test("Save created user ID", () => {
  const json = pm.response.json();
  pm.environment.set("user_id", json.id);
});
```

**Flow thực tế:**
```
1. POST /login       → Response: { token: "abc" }
                      → Tests: pm.environment.set("token", "abc")

2. GET /users/me     → Headers: Authorization: Bearer {{token}}
                      → Postman tự điền "abc" vào {{token}}
```

---

## Pre-request Scripts

Chạy **trước** khi gửi request. Dùng để setup data.

```javascript
// Generate random email cho mỗi lần test
const randomEmail = `user_${Date.now()}@test.com`;
pm.environment.set("random_email", randomEmail);

// Generate timestamp
pm.environment.set("timestamp", new Date().toISOString());

// Set dynamic authorization header
const token = pm.environment.get("token");
pm.request.headers.add({
  key: "Authorization",
  value: `Bearer ${token}`
});
```

---

## Collections & Folders

### Tổ chức Collections

```
📁 E-Commerce API Tests
├── 📁 Auth
│   ├── POST Login (valid credentials)
│   ├── POST Login (invalid password)
│   ├── POST Login (missing email)
│   └── POST Register
├── 📁 Users
│   ├── GET All Users
│   ├── GET User by ID
│   ├── POST Create User
│   ├── PUT Update User
│   ├── PATCH Partial Update
│   └── DELETE User
├── 📁 Products
│   ├── GET All Products
│   ├── GET Product by ID
│   ├── GET Search Products
│   └── POST Create Product (Admin)
└── 📁 Orders
    ├── POST Create Order
    ├── GET Order by ID
    └── PATCH Update Order Status
```

---

## Collection Runner — Chạy tự động

### Chạy toàn bộ Collection

1. Click **Run** trên Collection
2. Chọn Environment
3. Set iterations (số lần chạy)
4. Click **Run Collection**

### Data-Driven Testing

Dùng file CSV/JSON để chạy test với nhiều bộ data:

**File: test-users.csv**
```csv
name,email,expected_status
Valid User,valid@mail.com,201
,missing@mail.com,400
No Email User,,400
```

**Trong Request Body:**
```json
{
  "name": "{{name}}",
  "email": "{{email}}"
}
```

**Trong Tests:**
```javascript
pm.test(`Expected status ${pm.iterationData.get("expected_status")}`, () => {
  pm.response.to.have.status(
    parseInt(pm.iterationData.get("expected_status"))
  );
});
```

→ Runner chạy 3 lần, mỗi lần dùng 1 dòng data.

---

## Workflow thực tế của QA

### Hàng ngày

```
1. Developer push code → deploy staging

2. QA mở Postman:
   a. Chạy Smoke Collection (5-10 critical APIs)
   b. Nếu fail → báo dev ngay
   c. Nếu pass → tiếp tục test chi tiết

3. Test feature mới:
   a. Đọc API docs (Swagger)
   b. Tạo requests trong Postman
   c. Viết tests (assertions)
   d. Test positive + negative cases
   e. Log bugs nếu tìm thấy

4. Regression:
   a. Chạy Collection Runner
   b. Review results
   c. Export report
```

### Postman vs Code Automation

| Postman | Code (Playwright/Supertest) |
|---|---|
| GUI, dễ dùng | Cần biết code |
| Nhanh để explore API | Tốn thời gian setup ban đầu |
| Share qua Postman Cloud | Share qua Git |
| Collection Runner | CI/CD pipeline |
| Giới hạn logic phức tạp | Flexible, logic tùy ý |
| **Dùng cho:** Manual API testing, exploration | **Dùng cho:** Automation, CI/CD |

::: tip Best Practice
Dùng **Postman để explore và test manual** → sau đó chuyển critical tests sang **code automation** (Playwright API testing) để tích hợp CI/CD.
:::

---

## Tóm tắt chương

| Feature | Mục đích | Khi dùng |
|---|---|---|
| **Send Request** | Gửi API request | Explore API, manual test |
| **Environments** | Quản lý URLs, tokens theo env | Nhiều environments |
| **Tests (Assertions)** | Verify response | Mọi request |
| **Pre-request Scripts** | Setup data trước request | Dynamic data, auth token |
| **Collection Runner** | Chạy batch tests | Regression, smoke test |
| **Data-Driven** | 1 request + CSV data | Test nhiều inputs |
