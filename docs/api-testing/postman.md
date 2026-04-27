# Postman

## Postman là gì? — Chiếc điện thoại gọi đến API

Hãy tưởng tượng bạn muốn gọi món ăn từ nhà hàng. Bạn cần **chiếc điện thoại** để gọi. **Postman** chính là chiếc điện thoại đó — nó giúp bạn **gửi request đến API** và xem kết quả trả về, mà **không cần viết code**.

Bạn chỉ cần:
1. Chọn **số điện thoại** (URL của API)
2. Nói **bạn muốn gì** (Method: GET, POST, PUT, DELETE)
3. Đính kèm **thông tin chi tiết** nếu cần (Body, Headers)
4. Bấm **Send** (nhấc máy gọi)
5. Xem **kết quả** trả về (Response)

### Tại sao dùng Postman?

| Lý do | Giống như | Chi tiết |
|---|---|---|
| **Không cần code** | Dùng điện thoại thay vì tự đi bộ đến nhà hàng | GUI trực quan, kéo thả |
| **Nhanh** | Bấm gọi → nghe trả lời ngay | Gửi request, xem response tức thì |
| **Lưu trữ** | Danh bạ điện thoại | Organize requests thành Collections |
| **Chia sẻ** | Chia sẻ danh bạ cho đồng nghiệp | Share collections với team |
| **Automation** | Gọi tự động theo lịch | Viết tests, chạy Collection Runner |
| **Miễn phí** | Bản free đủ dùng | Chỉ cần tạo account |

---

## Giao diện Postman — "Chiếc điện thoại" của bạn

```
┌─────────────────────────────────────────────────────────────┐
│  Collections │          Request Builder                      │
│  (Danh bạ)  │  ┌─────────────────────────────────────────┐ │
│  ├── Auth    │  │ [POST ▼] https://api.example.com/users  │ │
│  │  ├── Login│  │ (Method)  (URL — "số điện thoại")  [Send]│ │
│  │  └── ...  │  ├─────────────────────────────────────────┤ │
│  ├── Users   │  │ Params │ Auth │ Headers │ Body │ Tests  │ │
│  │  ├── GET  │  │ (Các tab để cấu hình chi tiết request) │ │
│  │  ├── POST │  │                                         │ │
│  │  └── ...  │  │ Body (raw - JSON):                      │ │
│  └── Orders  │  │ {                                       │ │
│              │  │   "name": "Test User",                  │ │
│  Environments│  │   "email": "test@mail.com"              │ │
│  (Speed Dial)│  │ }                                       │ │
│  ├── Dev     │  ├─────────────────────────────────────────┤ │
│  ├── Staging │  │ Response:    Status: 201    Time: 120ms │ │
│  └── Prod    │  │ (Kết quả bếp trả lại)                  │ │
│              │  │ {                                       │ │
│              │  │   "id": 1,                              │ │
│              │  │   "name": "Test User"                   │ │
│              │  │ }                                       │ │
│              │  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **Collections** (bên trái) = **Danh bạ** — nơi lưu tất cả API requests đã tạo
- **Request Builder** (bên phải) = **Màn hình gọi** — nơi soạn và gửi request
- **Response** (phía dưới) = **Kết quả cuộc gọi** — server trả lại gì

---

## Gửi Request đầu tiên — Thử "nhấc máy gọi"

### GET Request — "Xem menu"

```
Method: GET                                    ← Muốn ĐỌC dữ liệu
URL: https://jsonplaceholder.typicode.com/users/1  ← "Số điện thoại" API
Headers: (không cần)                           ← GET thường không cần headers
Body: (không cần)                              ← GET không gửi body

→ Click Send                                   ← Nhấc máy gọi!

Response (200 OK):                             ← "Bếp trả lời: đây là user #1"
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz"
}
```

### POST Request — "Gọi món mới"

```
Method: POST                                   ← Muốn TẠO MỚI
URL: https://jsonplaceholder.typicode.com/users    ← Endpoint tạo user
Headers:
  Content-Type: application/json               ← "Tôi gửi data dạng JSON"
Body (raw - JSON):                             ← Chi tiết "món" muốn tạo
{
  "name": "Test User",
  "email": "test@mail.com",
  "phone": "0901234567"
}

→ Click Send

Response (201 Created):                        ← "Bếp xác nhận: đã tạo user mới!"
{
  "id": 11,
  "name": "Test User",
  "email": "test@mail.com"
}
```

:::tip Aha Moment
**jsonplaceholder.typicode.com** là API miễn phí để bạn tập luyện. Không cần token, không cần đăng ký. Hãy mở Postman ngay và thử gửi GET `https://jsonplaceholder.typicode.com/users` — bạn sẽ thấy danh sách 10 users!
:::

---

## Environments — Speed Dial cho từng nhà hàng

### Vấn đề

Bạn có 3 nhà hàng (môi trường): Dev, Staging, Production. Mỗi nhà hàng có **số điện thoại (URL) khác nhau**. Bạn không muốn phải tạo 3 bộ requests giống hệt nhau, chỉ khác URL.

### Giải pháp: Environment Variables (biến môi trường)

Giống **speed dial** (phím gọi nhanh) trên điện thoại. Thay vì nhớ từng số, bạn lưu:
- Phím 1 = Nhà hàng Dev
- Phím 2 = Nhà hàng Staging
- Phím 3 = Nhà hàng Production

**Tạo Environments trong Postman:**

```
[Dev Environment]           ← "Nhà hàng Dev"
base_url = http://localhost:3000
api_key = dev-key-123

[Staging Environment]       ← "Nhà hàng Staging"
base_url = https://staging-api.example.com
api_key = staging-key-456

[Production Environment]    ← "Nhà hàng Production"
base_url = https://api.example.com
api_key = prod-key-789
```

**Dùng trong Request — Thay URL cứng bằng biến:**

```
# Thay vì viết cứng:
URL: https://staging-api.example.com/api/users

# Dùng biến (variable):
URL: {{base_url}}/api/users
Headers:
  X-API-Key: {{api_key}}
```

Chỉ cần **đổi environment** ở dropdown góc trên phải → tất cả requests tự đổi URL. Không cần sửa từng request!

:::tip Aha Moment
`{{base_url}}` là cú pháp biến trong Postman. Hai dấu ngoặc nhọn `{{ }}` bao quanh tên biến. Postman sẽ tự thay thế biến bằng giá trị tương ứng với environment bạn chọn. Giống mail merge trong Word: "Dear {{tên_khách_hàng}}" → "Dear Nguyen Van An".
:::

### Biến thường dùng

| Biến | Ví dụ | Mục đích |
|---|---|---|
| `{{base_url}}` | `https://staging.example.com` | Base URL theo environment |
| `{{token}}` | `eyJhbGci...` | Auth token (lấy từ login response) |
| `{{user_id}}` | `123` | ID tạo từ request trước |
| `{{api_key}}` | `key-abc` | API key theo environment |

---

## Tests — Kiểm tra "đồ ăn" khi nhận được

Khi phục vụ mang đồ ăn ra, bạn sẽ kiểm tra:
- Đúng món không? (status code)
- Đủ phần không? (response body)
- Mang nhanh không? (response time)
- Đĩa sạch không? (headers)

Đây là phần **quan trọng nhất** — biến Postman từ "tool gửi request" thành "automation tool". Tests được viết trong tab **Tests** bằng JavaScript.

### Kiểm tra Status Code — "Đúng món không?"

```javascript
// Kiểm tra status code phải là 200
pm.test("Status code is 200", () => {
  // pm.response = response nhận được từ server
  // .to.have.status(200) = phải có status code là 200
  pm.response.to.have.status(200);
});

// Hoặc kiểm tra nằm trong range 2xx (bất kỳ 200-299)
pm.test("Status code is 2xx", () => {
  // pm.expect() = hàm assertion (kiểm tra điều kiện)
  // pm.response.code = mã status code (số)
  // .to.be.within(200, 299) = phải nằm trong khoảng 200-299
  pm.expect(pm.response.code).to.be.within(200, 299);
});
```

### Kiểm tra Response Body — "Đủ phần không?"

```javascript
pm.test("Response has correct user data", () => {
  // Chuyển response body từ text sang JSON object
  const json = pm.response.json();

  // Kiểm tra field "name" phải bằng "Test User"
  pm.expect(json.name).to.eql("Test User");

  // Kiểm tra field "email" phải chứa ký tự "@"
  pm.expect(json.email).to.include("@");

  // Kiểm tra field "id" phải là kiểu number (số)
  pm.expect(json.id).to.be.a("number");
});
```

### Kiểm tra Response Time — "Mang nhanh không?"

```javascript
pm.test("Response time < 500ms", () => {
  // pm.response.responseTime = thời gian response (mili-giây)
  // .to.be.below(500) = phải dưới 500ms
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

### Kiểm tra Headers — "Đĩa sạch không?"

```javascript
pm.test("Content-Type is JSON", () => {
  // Kiểm tra response header "Content-Type" phải đúng giá trị
  pm.response.to.have.header(
    "Content-Type",
    "application/json; charset=utf-8"
  );
});
```

### Kiểm tra Array — "Set combo đủ món không?"

```javascript
pm.test("Response returns 10 users", () => {
  const json = pm.response.json();

  // Kiểm tra response phải là array (danh sách)
  pm.expect(json).to.be.an("array");

  // Kiểm tra phải có đúng 10 phần tử
  pm.expect(json.length).to.eql(10);
});
```

### Kiểm tra Nested Object — "Nước chấm trong tô phở đúng loại?"

```javascript
pm.test("User has valid address", () => {
  const json = pm.response.json();

  // Kiểm tra object "address" có property "city"
  pm.expect(json.address).to.have.property("city");

  // Kiểm tra "city" phải là string
  pm.expect(json.address.city).to.be.a("string");
});
```

### JSON Schema Validation — "Kiểm tra theo tiêu chuẩn nhà hàng"

```javascript
pm.test("Response matches schema", () => {
  // Schema = "tiêu chuẩn" mà response phải tuân theo
  const schema = {
    type: "object",                     // Response phải là object
    required: ["id", "name", "email"],  // 3 fields bắt buộc phải có
    properties: {
      id: { type: "number" },           // id phải là số
      name: { type: "string" },         // name phải là text
      email: { type: "string" }         // email phải là text
    }
  };

  // Kiểm tra response có khớp schema không
  pm.response.to.have.jsonSchema(schema);
});
```

---

## Lưu data từ Response — Chuyền "đồ ăn" sang request tiếp theo

Đây là kỹ thuật cực kỳ quan trọng: kết quả của request A trở thành input cho request B.

```javascript
// ===== Login → Lưu token để dùng cho các requests sau =====
pm.test("Save auth token", () => {
  const json = pm.response.json();
  // Lưu token vào biến environment "token"
  // Các request sau dùng {{token}} sẽ tự lấy giá trị này
  pm.environment.set("token", json.token);
});

// ===== Create user → Lưu user_id =====
pm.test("Save created user ID", () => {
  const json = pm.response.json();
  // Lưu id user vừa tạo → dùng cho GET/PUT/DELETE sau
  pm.environment.set("user_id", json.id);
});
```

**Flow thực tế — "Dây chuyền" request:**
```
1. POST /login       → Response: { token: "abc" }
                      → Tests: pm.environment.set("token", "abc")

2. GET /users/me     → Headers: Authorization: Bearer {{token}}
                      → Postman tự điền "abc" vào chỗ {{token}}
                      → Server nhận token → verify → trả data
```

:::tip Aha Moment
Đây là cách Postman "nhớ" kết quả giữa các request. Login trả token → lưu vào biến → các request sau tự dùng. Giống bạn mua vé vào lễ hội (login), lưu vé trong ví (environment), rồi mỗi khi vào khu vực mới chỉ cần giơ vé ({{token}}).
:::

---

## Pre-request Scripts — Chuẩn bị trước khi gọi

Pre-request Scripts chạy **trước** khi gửi request. Dùng để setup data, giống việc bạn chuẩn bị tiền, chọn bàn **trước khi** vào nhà hàng.

```javascript
// Tạo email ngẫu nhiên cho mỗi lần test
// Date.now() trả về số mili-giây hiện tại → email luôn unique
const randomEmail = `user_${Date.now()}@test.com`;
// Lưu vào biến để dùng trong Body: {{random_email}}
pm.environment.set("random_email", randomEmail);

// Tạo timestamp (mốc thời gian) hiện tại
pm.environment.set("timestamp", new Date().toISOString());

// Tự động thêm Authorization header
const token = pm.environment.get("token"); // Lấy token từ biến
pm.request.headers.add({
  key: "Authorization",
  value: `Bearer ${token}`  // Thêm vào header của request
});
```

---

## Collections & Folders — Tổ chức danh bạ gọn gàng

Collections (bộ sưu tập) giống **danh bạ điện thoại**, Folders giống **nhóm liên lạc**.

```
E-Commerce API Tests                ← Collection (danh bạ)
├── Auth                            ← Folder "Xác thực"
│   ├── POST Login (valid)
│   ├── POST Login (invalid password)
│   ├── POST Login (missing email)
│   └── POST Register
├── Users                           ← Folder "Quản lý user"
│   ├── GET All Users
│   ├── GET User by ID
│   ├── POST Create User
│   ├── PUT Update User
│   ├── PATCH Partial Update
│   └── DELETE User
├── Products                        ← Folder "Sản phẩm"
│   ├── GET All Products
│   ├── GET Product by ID
│   ├── GET Search Products
│   └── POST Create Product (Admin)
└── Orders                          ← Folder "Đơn hàng"
    ├── POST Create Order
    ├── GET Order by ID
    └── PATCH Update Order Status
```

---

## Collection Runner — Gọi 100 đơn liên tiếp để test

### Bản chất

Collection Runner giống **hệ thống gọi tự động** — thay vì bạn ngồi nhấc máy gọi từng request, Runner sẽ **gọi tất cả requests trong collection** liên tiếp và báo cáo kết quả.

### Cách chạy

1. Click **Run** trên Collection
2. Chọn **Environment** (Dev, Staging, Prod)
3. Set **iterations** (số lần lặp lại toàn bộ collection)
4. Click **Run Collection**

### Data-Driven Testing — Gọi cùng "số" nhưng nội dung khác nhau

Giống việc dùng 1 template đơn order, nhưng thay đổi nội dung mỗi lần. Dùng file CSV/JSON để chạy test với nhiều bộ data:

**File: test-users.csv**
```csv
name,email,expected_status
Valid User,valid@mail.com,201
,missing@mail.com,400
No Email User,,400
```

**Trong Request Body — Dùng biến từ CSV:**
```json
{
  "name": "{{name}}",
  "email": "{{email}}"
}
```

**Trong Tests — Kiểm tra theo expected_status:**
```javascript
// pm.iterationData = data từ CSV cho lần chạy hiện tại
// .get("expected_status") = lấy giá trị cột "expected_status"
pm.test(`Expected status ${pm.iterationData.get("expected_status")}`, () => {
  pm.response.to.have.status(
    // parseInt() chuyển string "201" thành số 201
    parseInt(pm.iterationData.get("expected_status"))
  );
});
```

Runner chạy **3 lần** (vì CSV có 3 dòng data), mỗi lần dùng 1 dòng — tự động test cả valid và invalid cases!

:::tip Aha Moment
Data-Driven Testing cực kỳ mạnh: viết 1 request + 1 test script, nhưng chạy với 100 bộ data khác nhau từ CSV. Thay vì tạo 100 requests riêng biệt, bạn chỉ cần 1 request + 1 file CSV.
:::

---

## Workflow thực tế của QA

### Hàng ngày

```
1. Developer push code → deploy lên staging

2. QA mở Postman:
   a. Chạy Smoke Collection (5-10 API critical nhất)
   b. Nếu FAIL → báo dev ngay (không cần test tiếp)
   c. Nếu PASS → tiếp tục test chi tiết

3. Test feature mới:
   a. Đọc API docs (Swagger) — hiểu endpoint cần test
   b. Tạo requests trong Postman — soạn "cuộc gọi"
   c. Viết tests (assertions) — setup "kiểm tra đồ ăn"
   d. Test positive + negative cases — gọi đúng + gọi sai
   e. Log bugs nếu tìm thấy

4. Regression (kiểm tra lại chức năng cũ):
   a. Chạy Collection Runner — gọi tự động toàn bộ
   b. Review results — xem có fail không
   c. Export report — báo cáo cho team
```

### Postman vs Code Automation — Khi nào dùng gì?

| Postman | Code (Playwright/Supertest) |
|---|---|
| GUI, dễ dùng — giống gọi điện | Cần biết code — giống viết chương trình tự động gọi |
| Nhanh để explore API | Tốn thời gian setup ban đầu |
| Share qua Postman Cloud | Share qua Git — version control tốt hơn |
| Collection Runner | CI/CD pipeline — chạy tự động mỗi lần deploy |
| Giới hạn logic phức tạp | Flexible — logic tùy ý, xử lý phức tạp |
| **Dùng cho:** Manual API testing, khám phá API mới | **Dùng cho:** Automation, CI/CD, regression |

::: tip Aha Moment
**Combo lý tưởng:** Dùng **Postman để khám phá và test manual** (nhanh, trực quan) → sau đó chuyển critical tests sang **code automation** (Playwright) để tích hợp CI/CD. Không cần chọn 1 trong 2 — dùng cả 2 cho đúng mục đích!
:::

---

## Sai lầm thường gặp

❌ **Hardcode URL trực tiếp trong request**
→ ✅ Dùng **Environments** với `{{base_url}}`
→ 💡 Khi đổi environment (Dev → Staging → Prod), chỉ cần switch dropdown thay vì sửa 50 requests

❌ **Gửi request xong nhưng không viết Tests trong tab Tests**
→ ✅ Mỗi request đều viết ít nhất 1 assertion (status code, response body)
→ 💡 Không có tests = Postman chỉ là tool gửi request, không phải testing tool. Tests biến Postman thành automation tool

❌ **Lưu password, API key thật trong Shared Collections**
→ ✅ Dùng **Environment variables** cho sensitive data, chỉ share Collection (không share Environment)
→ 💡 Collection share cho cả team → ai cũng thấy. Sensitive data phải nằm trong Environment riêng của mỗi người

❌ **Không tổ chức requests — đổ hết vào 1 collection**
→ ✅ Dùng **Folders** phân nhóm theo module (Auth, Users, Orders...)
→ 💡 Khi collection có 100+ requests mà không có folders = không ai tìm được gì

---

## Góc nhìn đa chiều

**Team A:** "Dùng Postman cho MỌI THỨ" — manual testing, automation (Collection Runner), monitoring, documentation. Postman là trung tâm API testing.

**Team B:** "Dùng Postman chỉ để EXPLORE" — khám phá API mới, debug nhanh. Sau đó chuyển hết sang code (Supertest, Playwright API testing) để tích hợp CI/CD và version control qua Git.

**Cả hai đều hợp lý.** Team nhỏ, ít automation experience → Postman-centric tiết kiệm thời gian. Team có strong engineering culture → code-based cho long-term maintainability. Quan trọng là **chọn đúng cho context của team**, không phải chọn theo trend.

---

## Tóm tắt chương

| Feature | Bản chất (Essence) | Khi dùng |
|---|---|---|
| **Send Request** | Nhấc máy gọi API | Explore API, manual test |
| **Environments** | Speed dial cho từng nhà hàng (Dev/Staging/Prod) | Khi có nhiều environments |
| **Tests** | Kiểm tra đồ ăn khi nhận | Mọi request — verify response |
| **Pre-request Scripts** | Chuẩn bị trước khi gọi | Dynamic data, auto-attach token |
| **Collection Runner** | Hệ thống gọi tự động | Regression, smoke test |
| **Data-Driven** | 1 template + nhiều bộ data từ CSV | Test nhiều inputs cùng lúc |
