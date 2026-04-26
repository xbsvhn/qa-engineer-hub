# API Fundamentals

## API là gì? (WHAT)

API (Application Programming Interface) là **cầu nối giao tiếp** giữa các phần mềm với nhau. Thay vì con người tương tác qua giao diện (UI), phần mềm tương tác với nhau qua API.

### Ví dụ ngoài đời

Bạn đến nhà hàng:
- **Bạn** (Client) → nhìn menu, chọn món → gọi **phục vụ** (API) → phục vụ mang order vào **bếp** (Server) → bếp nấu xong → phục vụ mang ra cho bạn

Bạn **không vào bếp trực tiếp**. Phục vụ (API) là trung gian — nhận yêu cầu, chuyển cho bếp, trả kết quả lại.

### Ví dụ trong phần mềm

```
Mobile App ──────┐
                 │
Web Browser ─────┼──► API Server ──► Database
                 │
Partner System ──┘

Ví dụ thực tế:
- App Grab gọi API Google Maps để hiển thị bản đồ
- Website bán hàng gọi API VNPay để thanh toán
- Frontend React gọi API Backend để lấy danh sách sản phẩm
```

### Tại sao QA cần test API? (WHY)

| Lý do | Giải thích |
|---|---|
| **Nhanh hơn UI test** | API test chạy trong milliseconds, UI test mất seconds-minutes |
| **Ổn định hơn** | Không bị ảnh hưởng bởi UI changes (CSS, layout) |
| **Phát hiện bug sớm** | Test được trước khi UI hoàn thành |
| **Coverage sâu hơn** | Test được logic mà UI không thể (edge cases, error codes) |
| **Bắt buộc trong Agile** | Backend xong trước → QA test API → song song với UI development |

**Thực tế:** Trong dự án Agile, ~60-70% bugs được tìm ở tầng API, chỉ ~30% ở tầng UI.

---

## HTTP Protocol — Nền tảng của API

### HTTP là gì?

HTTP (HyperText Transfer Protocol) là **giao thức giao tiếp** giữa client và server trên internet. Mọi API web đều dùng HTTP (hoặc HTTPS — phiên bản bảo mật).

### Request & Response

Mọi tương tác API đều theo mô hình **Request → Response**:

```
Client (Browser/App)                    Server (API)
┌─────────────────┐                    ┌─────────────────┐
│                 │ ── HTTP Request ──► │                 │
│   Gửi yêu cầu  │                    │   Xử lý yêu cầu│
│                 │ ◄── HTTP Response ─ │   Trả kết quả  │
└─────────────────┘                    └─────────────────┘
```

### Cấu trúc HTTP Request

```
POST /api/users HTTP/1.1              ← Request Line (Method + URL + Version)
Host: api.example.com                 ← Headers
Content-Type: application/json
Authorization: Bearer eyJhbGci...
                                      ← Blank line
{                                     ← Body (payload)
  "name": "Nguyen Van An",
  "email": "an@mail.com"
}
```

| Thành phần | Mô tả | Ví dụ |
|---|---|---|
| **Method** | Hành động cần thực hiện | GET, POST, PUT, DELETE |
| **URL** | Địa chỉ resource | `/api/users/123` |
| **Headers** | Metadata của request | Content-Type, Authorization |
| **Body** | Dữ liệu gửi kèm (POST, PUT) | JSON, form data |

### Cấu trúc HTTP Response

```
HTTP/1.1 200 OK                       ← Status Line (Version + Status Code)
Content-Type: application/json        ← Headers
X-Request-Id: abc123
                                      ← Blank line
{                                     ← Body
  "id": 1,
  "name": "Nguyen Van An",
  "email": "an@mail.com",
  "created_at": "2026-04-26T10:00:00Z"
}
```

| Thành phần | Mô tả | QA verify |
|---|---|---|
| **Status Code** | Kết quả xử lý | 200 OK? 404 Not Found? 500 Error? |
| **Headers** | Metadata response | Content-Type đúng? Có cache headers? |
| **Body** | Dữ liệu trả về | Data đúng? Format đúng? Đủ fields? |

---

## Các kiểu API phổ biến

### 1. REST API — Phổ biến nhất (~90%)

| Đặc điểm | Chi tiết |
|---|---|
| **Protocol** | HTTP/HTTPS |
| **Format** | JSON (chủ yếu), XML |
| **Architecture** | Resource-based (mỗi URL = 1 resource) |
| **Stateless** | Server không lưu state client giữa các requests |
| **Phổ biến** | ~90% APIs hiện nay |

```
REST API URLs (Resource-based):
GET    /api/users          → Lấy danh sách users
GET    /api/users/123      → Lấy user có id=123
POST   /api/users          → Tạo user mới
PUT    /api/users/123      → Cập nhật toàn bộ user 123
PATCH  /api/users/123      → Cập nhật 1 phần user 123
DELETE /api/users/123      → Xóa user 123
```

### 2. GraphQL

| Đặc điểm | Chi tiết |
|---|---|
| **Đặc biệt** | Client quyết định lấy **chính xác** fields nào |
| **1 endpoint** | Chỉ có 1 URL (thường `/graphql`) |
| **No over-fetching** | Không lấy thừa data |
| **Phổ biến** | Facebook, GitHub, Shopify |

```graphql
# REST: GET /api/users/123 → trả về TẤT CẢ fields (có thể thừa)

# GraphQL: Chỉ lấy name và email
query {
  user(id: 123) {
    name
    email
  }
}
# Response: { "name": "An", "email": "an@mail.com" }
# Không có fields thừa!
```

### 3. SOAP

| Đặc điểm | Chi tiết |
|---|---|
| **Protocol** | HTTP, SMTP, TCP |
| **Format** | XML (bắt buộc) |
| **Phức tạp** | WSDL, XML Schema, Envelope |
| **Phổ biến** | Enterprise legacy (ngân hàng, bảo hiểm) |

**QA thực tế:** 90% thời gian bạn sẽ test REST API. GraphQL đang tăng. SOAP chỉ gặp ở dự án legacy.

### So sánh

| | REST | GraphQL | SOAP |
|---|---|---|---|
| **Format** | JSON | JSON | XML |
| **Learning curve** | Thấp | Trung bình | Cao |
| **Flexibility** | Medium | Cao | Thấp |
| **Performance** | Tốt | Rất tốt (no over-fetch) | Chậm (XML verbose) |
| **Tools** | Postman, Playwright | GraphQL Playground, Postman | SoapUI |

---

## JSON — Ngôn ngữ của API

### JSON là gì?

JSON (JavaScript Object Notation) là format **trao đổi dữ liệu** phổ biến nhất. Nhẹ, dễ đọc, dễ parse.

### Cú pháp

```json
{
  "string": "Hello World",
  "number": 42,
  "decimal": 3.14,
  "boolean": true,
  "null_value": null,
  "array": [1, 2, 3],
  "object": {
    "nested": "value"
  }
}
```

### Ví dụ thực tế — API Response

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 123,
      "name": "Nguyen Van An",
      "email": "an@mail.com",
      "role": "customer",
      "is_verified": true,
      "addresses": [
        {
          "type": "home",
          "street": "123 Nguyen Hue",
          "city": "Ho Chi Minh"
        },
        {
          "type": "work",
          "street": "456 Le Loi",
          "city": "Ho Chi Minh"
        }
      ],
      "created_at": "2026-01-15T08:30:00Z"
    }
  },
  "meta": {
    "request_id": "abc-123",
    "response_time_ms": 45
  }
}
```

### QA cần verify gì trong JSON Response?

```
1. Structure — Có đủ fields không? Đúng cấu trúc không?
2. Data types — "id" phải là number, "name" phải là string
3. Values — Data đúng logic không? email format đúng?
4. Null handling — Field nào có thể null? Nào bắt buộc?
5. Array — Số phần tử đúng? Mỗi phần tử đủ fields?
6. Nested objects — Object con có đúng structure?
```

---

## Authentication & Authorization

### Authentication (Authn) — "Bạn là ai?"

Xác minh danh tính của người gọi API.

| Phương thức | Cách hoạt động | Phổ biến |
|---|---|---|
| **API Key** | Gửi key trong header/query | Simple APIs, third-party |
| **Basic Auth** | Username:Password encoded Base64 | Legacy systems |
| **Bearer Token (JWT)** | Login → nhận token → gửi trong header | Modern apps (~80%) |
| **OAuth 2.0** | Login qua Google/Facebook → nhận token | Social login |

#### Bearer Token Flow (phổ biến nhất)

```
1. Client gửi login request:
   POST /api/auth/login
   Body: { "email": "an@mail.com", "password": "Pass@123" }

2. Server verify → trả về token:
   Response: { "token": "eyJhbGciOiJIUzI1NiIs..." }

3. Client gửi token trong mọi request sau:
   GET /api/users/me
   Headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..." }

4. Server verify token → trả về data
```

### Authorization (Authz) — "Bạn được phép làm gì?"

Kiểm tra quyền truy cập sau khi đã xác minh danh tính.

```
Admin user:
  GET  /api/users     → 200 OK (có quyền xem tất cả users)
  DELETE /api/users/5  → 200 OK (có quyền xóa user)

Normal user:
  GET  /api/users     → 403 Forbidden (không có quyền xem all users)
  DELETE /api/users/5  → 403 Forbidden (không có quyền xóa)
  GET  /api/users/me  → 200 OK (chỉ xem được thông tin mình)
```

**QA test Authorization:**
- User role A có truy cập được endpoint của role B không? (Expected: 403)
- User có thể xem/sửa/xóa data của user khác không? (Expected: 403)
- Token hết hạn thì trả về gì? (Expected: 401)

---

## API Documentation

### Swagger / OpenAPI

Hầu hết dự án cung cấp API docs qua **Swagger UI**. QA dùng Swagger để:
- Xem tất cả endpoints available
- Biết request format (fields nào required, data type)
- Biết response format (status codes, response body)
- Try it out — gọi API trực tiếp từ Swagger

```
Swagger UI URL thường gặp:
https://api.example.com/swagger
https://api.example.com/docs
https://api.example.com/api-docs
```

### Đọc API Documentation

```yaml
# Ví dụ Swagger/OpenAPI spec
POST /api/users:
  summary: Create a new user
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required: [name, email, password]
          properties:
            name:
              type: string
              maxLength: 100
            email:
              type: string
              format: email
            password:
              type: string
              minLength: 8
  responses:
    201:
      description: User created successfully
    400:
      description: Validation error
    409:
      description: Email already exists
```

**Từ API doc này, QA biết cần test:**
- POST với valid data → 201
- POST thiếu name → 400
- POST email sai format → 400
- POST password < 8 ký tự → 400
- POST email đã tồn tại → 409

---

## Tóm tắt chương

| Concept | Điểm cốt lõi |
|---|---|
| **API** | Cầu nối giao tiếp giữa phần mềm, test nhanh hơn UI |
| **HTTP** | Request (Method + URL + Headers + Body) → Response (Status + Body) |
| **REST** | Resource-based, JSON, phổ biến nhất (~90%) |
| **GraphQL** | Client chọn exact fields, 1 endpoint |
| **JSON** | Format dữ liệu chính, cần verify structure + types + values |
| **Authentication** | Bearer Token/JWT phổ biến nhất |
| **Authorization** | Test role-based access, permission boundaries |
| **Swagger** | API documentation, nguồn để viết test cases |
