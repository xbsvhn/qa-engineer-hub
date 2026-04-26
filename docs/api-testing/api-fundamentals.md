# API Fundamentals

## API là gì? — Hãy tưởng tượng bạn đi ăn nhà hàng

Bạn bước vào nhà hàng. Bạn **không bao giờ** tự vào bếp nấu ăn. Thay vào đó:

```
Bạn (Client)  →  Phục vụ (API)  →  Bếp (Server)
   gọi món          nhận order       nấu ăn
                     mang ra         trả món
```

**Phục vụ** chính là **API** (Application Programming Interface — giao diện lập trình ứng dụng). Phục vụ là người trung gian:
- Nhận **yêu cầu** từ bạn (request)
- Chuyển cho **bếp** xử lý (server)
- Mang **kết quả** về cho bạn (response)

Bạn không cần biết bếp nấu thế nào, dùng nguyên liệu gì. Bạn chỉ cần biết: **gọi đúng món, nhận đúng đồ ăn**.

:::tip Aha Moment
API chính là "người phục vụ" giữa phần mềm với nhau. App Grab gọi API Google Maps để hiển thị bản đồ — Grab không cần biết Google Maps xử lý bản đồ ra sao, chỉ cần gửi tọa độ và nhận lại hình ảnh bản đồ.
:::

### Trong phần mềm thực tế

```
Mobile App ──────┐
                 │
Web Browser ─────┼──► API Server ──► Database
                 │
Partner System ──┘
```

Nhiều "khách hàng" khác nhau (mobile app, web, đối tác) đều gọi cùng **một API Server** — giống như nhiều bàn trong nhà hàng đều gọi cùng một đội phục vụ.

**Ví dụ ngoài đời:**
- App **Grab** gọi API **Google Maps** để hiển thị bản đồ
- Website bán hàng gọi API **VNPay** để thanh toán
- Frontend React gọi API Backend để lấy danh sách sản phẩm

### Tại sao QA cần test API?

| Lý do | Giải thích bằng ví dụ nhà hàng |
|---|---|
| **Nhanh hơn UI test** | Kiểm tra món trong bếp (API) nhanh hơn đợi phục vụ bưng ra bàn (UI) |
| **Ổn định hơn** | Bếp vẫn nấu ngon dù nhà hàng sửa bàn ghế (UI thay đổi) |
| **Phát hiện bug sớm** | Nếm thử trong bếp trước khi mang ra khách |
| **Coverage sâu hơn** | Kiểm tra được nguyên liệu, gia vị — thứ khách không thấy trên bàn |
| **Bắt buộc trong Agile** | Backend xong trước → QA test API → song song với UI development |

**Thực tế:** Trong dự án Agile, khoảng 60-70% bugs được tìm ở tầng API, chỉ khoảng 30% ở tầng UI.

---

## HTTP — Ngôn ngữ mà Client và Server nói với nhau

### HTTP là gì?

Quay lại nhà hàng: bạn nói tiếng Việt để gọi món, phục vụ hiểu và chuyển cho bếp. **HTTP** (HyperText Transfer Protocol — giao thức truyền siêu văn bản) chính là **ngôn ngữ chung** mà client và server dùng để giao tiếp qua internet.

Mọi tương tác đều theo một pattern đơn giản: **bạn hỏi (Request), bếp trả lời (Response)**.

```
Client (Browser/App)                    Server (API)
┌─────────────────┐                    ┌─────────────────┐
│                 │ ── HTTP Request ──► │                 │
│   Gửi yêu cầu  │                    │   Xử lý yêu cầu│
│                 │ ◄── HTTP Response ─ │   Trả kết quả  │
└─────────────────┘                    └─────────────────┘
```

### Cấu trúc Request — "Đơn order" của bạn

Khi bạn gọi món ở nhà hàng, đơn order thường có:
- **Bạn muốn gì?** (gọi món mới, hủy món, đổi món) → **Method**
- **Nhà hàng nào, bàn nào?** → **URL** (Uniform Resource Locator — địa chỉ tài nguyên)
- **Yêu cầu đặc biệt** (không cay, thêm đá) → **Headers** (thông tin bổ sung)
- **Chi tiết món** (cơm gà, nước mắm riêng) → **Body** (dữ liệu gửi kèm)

```
POST /api/users HTTP/1.1              ← Method + URL: "Tôi muốn tạo user mới"
Host: api.example.com                 ← Headers: nhà hàng nào
Content-Type: application/json        ← Headers: tôi gửi dữ liệu dạng JSON
Authorization: Bearer eyJhbGci...     ← Headers: đây là vé vào cửa của tôi
                                      ← Dòng trống ngăn cách header và body
{                                     ← Body: chi tiết "món" tôi muốn
  "name": "Nguyen Van An",
  "email": "an@mail.com"
}
```

| Thành phần | Ví dụ nhà hàng | Ví dụ API |
|---|---|---|
| **Method** | Gọi món / hủy món / đổi món | GET, POST, PUT, DELETE |
| **URL** | Địa chỉ nhà hàng + số bàn | `/api/users/123` |
| **Headers** | "Không cay", "thêm đá" | Content-Type, Authorization |
| **Body** | Chi tiết: "cơm gà, nước mắm riêng" | JSON data |

### Cấu trúc Response — "Đồ ăn" bếp mang ra

```
HTTP/1.1 200 OK                       ← Status: "Đơn order thành công!"
Content-Type: application/json        ← Headers: "Đồ ăn" dạng JSON
X-Request-Id: abc123                  ← Headers: mã tracking đơn
                                      ← Dòng trống
{                                     ← Body: đây là "đồ ăn" của bạn
  "id": 1,
  "name": "Nguyen Van An",
  "email": "an@mail.com",
  "created_at": "2026-04-26T10:00:00Z"
}
```

| Thành phần | Ý nghĩa | QA cần verify |
|---|---|---|
| **Status Code** | Kết quả: thành công hay lỗi? | 200 OK? 404 Not Found? 500 Error? |
| **Headers** | Thông tin bổ sung về response | Content-Type đúng? Có cache headers? |
| **Body** | Dữ liệu trả về | Data đúng? Format đúng? Đủ fields? |

---

## Các kiểu API — REST, GraphQL, SOAP

Hãy tưởng tượng 3 kiểu nhà hàng khác nhau:

### 1. REST API — Menu cố định (phổ biến nhất, khoảng 90%)

**REST** (Representational State Transfer) giống nhà hàng có **menu cố định**. Mỗi món có tên, giá, mô tả rõ ràng. Bạn gọi "Phở bò" thì được cả tô phở đầy đủ — không thêm, không bớt.

| Đặc điểm | Chi tiết |
|---|---|
| **Format** | JSON (chủ yếu) — dữ liệu dạng text dễ đọc |
| **Architecture** | Resource-based — mỗi URL đại diện cho 1 "món" (resource) |
| **Stateless** | Server không nhớ bạn là ai giữa các lần gọi — mỗi request phải tự giới thiệu lại |

```
REST API URLs — mỗi URL là một "món" trên menu:
GET    /api/users          → Xem danh sách users (đọc menu)
GET    /api/users/123      → Xem user có id=123 (xem chi tiết 1 món)
POST   /api/users          → Tạo user mới (gọi món)
PUT    /api/users/123      → Thay toàn bộ thông tin user 123
PATCH  /api/users/123      → Sửa 1 phần thông tin user 123
DELETE /api/users/123      → Xóa user 123 (hủy món)
```

### 2. GraphQL — Gọi món tùy chỉnh

**GraphQL** giống nhà hàng cho phép bạn **customize từng chi tiết**: "Tôi muốn cơm gà, nhưng **không** nước mắm, **thêm** rau, **bỏ** dưa leo". Bạn chỉ nhận **đúng thứ bạn yêu cầu**, không thừa, không thiếu.

```graphql
# REST: GET /api/users/123 → trả về TẤT CẢ fields (có thể thừa data)
# Giống gọi "combo" — được cả nước ngọt dù bạn không uống

# GraphQL: Chỉ lấy đúng name và email — không thừa gì cả
query {
  user(id: 123) {
    name
    email
  }
}
# Response: { "name": "An", "email": "an@mail.com" }
# Chỉ có 2 fields bạn cần! Không có fields thừa.
```

| Đặc điểm | Chi tiết |
|---|---|
| **1 endpoint duy nhất** | Chỉ có 1 URL (thường là `/graphql`) — giống 1 quầy order nhận mọi loại yêu cầu |
| **No over-fetching** | Không lấy thừa data — tiết kiệm bandwidth |
| **Phổ biến** | Facebook, GitHub, Shopify |

### 3. SOAP — Tiệc formal có dress code

**SOAP** (Simple Object Access Protocol) giống **tiệc banquet formal**: có dress code nghiêm ngặt, phải dùng đúng format XML, phải khai báo đúng schema. Rất "nặng nề" nhưng rất "chính thống".

| Đặc điểm | Chi tiết |
|---|---|
| **Format bắt buộc** | XML — format cũ, dài dòng (verbose) |
| **Phức tạp** | WSDL, XML Schema, Envelope — nhiều "thủ tục" |
| **Phổ biến** | Enterprise legacy: ngân hàng, bảo hiểm, chính phủ |

### So sánh 3 kiểu API

| | REST | GraphQL | SOAP |
|---|---|---|---|
| **Ví dụ** | Menu cố định | Gọi món tùy chỉnh | Tiệc formal |
| **Format** | JSON | JSON | XML |
| **Learning curve** | Thấp | Trung bình | Cao |
| **Flexibility** | Trung bình | Cao | Thấp |
| **Performance** | Tốt | Rất tốt (no over-fetch) | Chậm (XML verbose) |
| **Tools** | Postman, Playwright | GraphQL Playground, Postman | SoapUI |

:::tip Aha Moment
90% thời gian bạn sẽ test REST API. GraphQL đang tăng dần. SOAP chỉ gặp ở dự án legacy (hệ thống cũ). Nên tập trung học REST trước!
:::

---

## JSON — Tờ giấy viết đơn order

### JSON là gì?

Khi bạn gọi món, phục vụ viết order lên giấy. Trong thế giới API, "tờ giấy" đó chính là **JSON** (JavaScript Object Notation — ký pháp đối tượng JavaScript). JSON là format **trao đổi dữ liệu** phổ biến nhất — nhẹ, dễ đọc, dễ xử lý.

### Cú pháp — Đơn giản là cặp key:value

JSON được viết theo format **key:value** (tên:giá trị), giống nhãn dán trên hộp đồ ăn:

```json
{
  "string": "Hello World",       // Text — luôn nằm trong dấu ""
  "number": 42,                  // Số nguyên — không cần dấu ""
  "decimal": 3.14,               // Số thập phân
  "boolean": true,               // Đúng/Sai — chỉ có true hoặc false
  "null_value": null,            // Trống — không có giá trị
  "array": [1, 2, 3],           // Danh sách — nhiều giá trị trong []
  "object": {                    // Object lồng nhau — {} bên trong {}
    "nested": "value"
  }
}
```

:::tip Aha Moment
JSON giống **nhãn dán trên hộp đồ ăn**: `"tên_món": "Phở bò"`, `"giá": 50000`, `"cay": true`. Mỗi thông tin là một cặp **key:value**. Key nằm bên trái dấu `:`, value nằm bên phải.
:::

### Ví dụ thực tế — API trả về thông tin user

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

| Cần check | Ví dụ | Giống như |
|---|---|---|
| **Structure** | Có đủ fields không? | Kiểm tra tô phở có đủ thịt, rau, nước |
| **Data types** | `id` phải là number, `name` phải là string | Thịt phải là thịt, rau phải là rau |
| **Values** | Email format đúng? Số dương? | Món ăn phải đúng vị đặt |
| **Null handling** | Field nào được phép null? | Món nào có thể hết nguyên liệu? |
| **Array** | Đúng số phần tử? Mỗi phần tử đủ fields? | Set combo đủ 3 món? |
| **Nested objects** | Object con đúng structure? | Nước chấm trong tô phở đúng loại? |

---

## Authentication — "Bạn là ai?" (Vòng tay vào cửa lễ hội)

### Tưởng tượng bạn đi lễ hội âm nhạc

Bạn mua vé → đến cổng → nhân viên kiểm tra vé → đeo cho bạn **vòng tay (wristband)**. Từ đó, bạn chỉ cần **giơ vòng tay** là vào được mọi khu vực — không cần mua vé lại.

Trong API, **vòng tay** đó chính là **Bearer Token** (mã xác thực). Flow hoạt động y hệt:

```
Bước 1: "Mua vé" — Login để lấy token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/login
Body: { "email": "an@mail.com", "password": "Pass@123" }

→ Server kiểm tra email + password
→ Response: { "token": "eyJhbGciOiJIUzI1NiIs..." }
  (Đây là "vòng tay" của bạn)

Bước 2: "Giơ vòng tay" — Gửi token trong mọi request sau
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET /api/users/me
Headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..." }

→ Server kiểm tra token → hợp lệ → trả về data
→ Response: { "name": "An", "email": "an@mail.com" }

Bước 3: Token hết hạn — "Vòng tay" hết hiệu lực
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET /api/users/me (với token cũ/hết hạn)
→ Response: 401 Unauthorized — "Vòng tay đã hết hạn, vui lòng lấy cái mới"
```

:::tip Aha Moment
Bearer Token giống **vòng tay lễ hội**: login 1 lần → nhận token → dùng token cho mọi request sau. Khi token hết hạn (giống vòng tay hết ngày), bạn phải login lại để lấy token mới.
:::

### Các phương thức Authentication phổ biến

| Phương thức | Ví dụ ngoài đời | Khi nào dùng |
|---|---|---|
| **API Key** | Mã thành viên gym — 1 mã duy nhất, ai có cũng vào được | Simple APIs, third-party |
| **Basic Auth** | Username + Password mỗi lần vào cửa | Legacy systems (hệ thống cũ) |
| **Bearer Token (JWT)** | Vòng tay lễ hội — login 1 lần, dùng nhiều lần | Modern apps (khoảng 80% hiện nay) |
| **OAuth 2.0** | Login bằng Google/Facebook — nhờ bên thứ 3 xác nhận | Social login |

### Authorization — "Bạn được phép làm gì?"

Authentication (Authn) = xác minh **bạn là ai** (kiểm tra vé). Authorization (Authz) = kiểm tra **bạn được vào khu nào** (VIP hay thường).

```
Admin user (vé VIP):
  GET  /api/users     → 200 OK (có quyền xem tất cả users)
  DELETE /api/users/5  → 200 OK (có quyền xóa user)

Normal user (vé thường):
  GET  /api/users     → 403 Forbidden (không có quyền xem all users)
  DELETE /api/users/5  → 403 Forbidden (không có quyền xóa)
  GET  /api/users/me  → 200 OK (chỉ xem được thông tin của mình)
```

**QA test Authorization cần check:**
- User role A có truy cập được endpoint của role B không? (Expected: 403 Forbidden)
- User có xem/sửa/xóa data của user khác không? (Expected: 403)
- Token hết hạn → trả về gì? (Expected: 401 Unauthorized)

---

## Swagger — "Menu" của nhà hàng API

### Swagger là gì?

Nhà hàng có **menu** để bạn biết có món gì, giá bao nhiêu, mô tả thế nào. API cũng có "menu" — đó là **Swagger** (hay **OpenAPI**). Swagger UI là trang web hiển thị tất cả API endpoints, giúp bạn:

- Xem tất cả "món" (endpoints) available
- Biết cần gửi gì (request format: fields nào required, data type gì)
- Biết nhận lại gì (response format: status codes, response body)
- **Try it out** — gọi API trực tiếp từ trang Swagger (như nếm thử!)

```
Swagger UI URL thường gặp:
https://api.example.com/swagger
https://api.example.com/docs
https://api.example.com/api-docs
```

### Cách đọc Swagger — Giống đọc menu nhà hàng

```yaml
# Đây là "mô tả món" trong menu API
POST /api/users:                    # Endpoint: "gọi món tạo user mới"
  summary: Create a new user        # Mô tả ngắn
  requestBody:                      # Bạn cần gửi gì?
    required: true                  # Bắt buộc phải có body
    content:
      application/json:             # Format: JSON
        schema:
          type: object
          required: [name, email, password]  # 3 fields bắt buộc!
          properties:
            name:
              type: string          # name phải là text
              maxLength: 100        # tối đa 100 ký tự
            email:
              type: string
              format: email         # phải đúng format email
            password:
              type: string
              minLength: 8          # tối thiểu 8 ký tự
  responses:                        # Bếp có thể trả lại gì?
    201:
      description: User created successfully    # Thành công
    400:
      description: Validation error             # Gửi sai data
    409:
      description: Email already exists         # Email trùng
```

:::tip Aha Moment
Từ API doc (Swagger) trên, QA biết ngay cần test gì:
- POST với valid data → 201 (thành công)
- POST thiếu `name` → 400 (thiếu field bắt buộc)
- POST email sai format → 400 (sai format)
- POST password < 8 ký tự → 400 (quá ngắn)
- POST email đã tồn tại → 409 (trùng)

**Swagger chính là nguồn để viết test cases!**
:::

---

## Tóm tắt chương

| Concept | Bản chất (Essence) | Điểm cốt lõi |
|---|---|---|
| **API** | Phục vụ nhà hàng — trung gian client ↔ server | Test nhanh hơn, ổn định hơn UI |
| **HTTP** | Ngôn ngữ giao tiếp client ↔ server | Request (Method+URL+Headers+Body) → Response (Status+Body) |
| **REST** | Menu cố định — mỗi URL là 1 resource | Phổ biến nhất, dùng JSON, khoảng 90% APIs |
| **GraphQL** | Gọi món tùy chỉnh — lấy đúng data cần | 1 endpoint, no over-fetching |
| **SOAP** | Tiệc formal — XML bắt buộc, phức tạp | Legacy systems (ngân hàng, bảo hiểm) |
| **JSON** | Tờ giấy viết order — format key:value | Verify structure + types + values |
| **Authentication** | Vòng tay lễ hội — login 1 lần, dùng nhiều lần | Bearer Token/JWT phổ biến nhất |
| **Authorization** | Vé VIP vs thường — ai vào khu nào | Test role-based access, permission boundaries |
| **Swagger** | Menu nhà hàng — liệt kê tất cả "món" API | Nguồn chính để viết test cases |
