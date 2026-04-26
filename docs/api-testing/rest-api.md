# REST API Testing

## HTTP Methods — Chi tiết

### CRUD Operations

REST API mapping trực tiếp với CRUD (Create, Read, Update, Delete):

| Method | CRUD | Mô tả | Có Body? | Idempotent? |
|---|---|---|---|---|
| **GET** | Read | Lấy dữ liệu | Không | Yes |
| **POST** | Create | Tạo mới | Có | No |
| **PUT** | Update (full) | Cập nhật toàn bộ | Có | Yes |
| **PATCH** | Update (partial) | Cập nhật một phần | Có | No |
| **DELETE** | Delete | Xóa | Không/Có | Yes |

**Idempotent** = gọi nhiều lần kết quả giống nhau.
- `GET /users/1` gọi 10 lần → kết quả giống nhau ✅
- `POST /users` gọi 10 lần → tạo 10 users ❌ (not idempotent)
- `DELETE /users/1` gọi 10 lần → user vẫn bị xóa (lần 2+ trả 404) ✅

### Ví dụ thực tế — User API

```
# GET — Lấy danh sách users
GET /api/users?page=1&limit=10&sort=name
Response 200:
{
  "data": [
    { "id": 1, "name": "An", "email": "an@mail.com" },
    { "id": 2, "name": "Binh", "email": "binh@mail.com" }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 50 }
}

# GET — Lấy 1 user cụ thể
GET /api/users/1
Response 200:
{ "id": 1, "name": "An", "email": "an@mail.com", "role": "admin" }

# POST — Tạo user mới
POST /api/users
Body: { "name": "Chi", "email": "chi@mail.com", "password": "Pass@123" }
Response 201:
{ "id": 3, "name": "Chi", "email": "chi@mail.com" }

# PUT — Cập nhật toàn bộ user
PUT /api/users/3
Body: { "name": "Chi Updated", "email": "chi.new@mail.com", "role": "vip" }
Response 200:
{ "id": 3, "name": "Chi Updated", "email": "chi.new@mail.com", "role": "vip" }

# PATCH — Cập nhật 1 field
PATCH /api/users/3
Body: { "name": "Chi Final" }
Response 200:
{ "id": 3, "name": "Chi Final", "email": "chi.new@mail.com", "role": "vip" }

# DELETE — Xóa user
DELETE /api/users/3
Response 204 (No Content)
```

### PUT vs PATCH — Khác nhau thế nào?

```
User hiện tại: { "name": "An", "email": "an@mail.com", "role": "admin" }

PUT /api/users/1
Body: { "name": "An Updated" }
→ Kết quả: { "name": "An Updated", "email": null, "role": null }
  (PUT thay THẾ TOÀN BỘ — fields không gửi bị mất!)

PATCH /api/users/1
Body: { "name": "An Updated" }
→ Kết quả: { "name": "An Updated", "email": "an@mail.com", "role": "admin" }
  (PATCH chỉ cập nhật fields được gửi — giữ nguyên fields khác)
```

---

## HTTP Status Codes — Chi tiết

### 2xx — Success

| Code | Tên | Ý nghĩa | Khi nào |
|---|---|---|---|
| **200** | OK | Thành công | GET, PUT, PATCH thành công |
| **201** | Created | Tạo mới thành công | POST tạo resource mới |
| **204** | No Content | Thành công, không có body | DELETE thành công |

### 3xx — Redirect

| Code | Tên | Ý nghĩa |
|---|---|---|
| **301** | Moved Permanently | URL đã chuyển vĩnh viễn |
| **302** | Found | Redirect tạm thời |
| **304** | Not Modified | Data không thay đổi (cache) |

### 4xx — Client Error (Lỗi từ phía client)

| Code | Tên | Ý nghĩa | Ví dụ |
|---|---|---|---|
| **400** | Bad Request | Request sai format | Body thiếu required field, sai data type |
| **401** | Unauthorized | Chưa xác thực | Token hết hạn, không gửi token |
| **403** | Forbidden | Không có quyền | User thường gọi API admin |
| **404** | Not Found | Resource không tồn tại | GET /api/users/99999 |
| **405** | Method Not Allowed | Method không hỗ trợ | DELETE trên endpoint chỉ có GET |
| **409** | Conflict | Xung đột dữ liệu | Email đã tồn tại |
| **422** | Unprocessable Entity | Validation error | Email format sai |
| **429** | Too Many Requests | Rate limit | Gọi API quá nhiều lần |

### 5xx — Server Error (Lỗi từ phía server)

| Code | Tên | Ý nghĩa | QA action |
|---|---|---|---|
| **500** | Internal Server Error | Server lỗi không xác định | Log bug — server không nên trả 500 |
| **502** | Bad Gateway | Proxy/Gateway lỗi | Có thể là infra issue |
| **503** | Service Unavailable | Server quá tải / maintenance | Test performance |
| **504** | Gateway Timeout | Request timeout | Kiểm tra API response time |

::: warning Quy tắc vàng cho QA
- **4xx** = Client gửi sai → cần **error message rõ ràng** để client sửa
- **5xx** = Server lỗi → **luôn luôn là bug** (server phải handle mọi input)
- Nếu gửi input sai mà nhận 500 thay vì 400/422 → **BUG!**
:::

---

## Headers — Metadata của Request/Response

### Request Headers quan trọng

| Header | Mục đích | Ví dụ |
|---|---|---|
| **Content-Type** | Format của body | `application/json` |
| **Authorization** | Token xác thực | `Bearer eyJhbGci...` |
| **Accept** | Format mong muốn của response | `application/json` |
| **Accept-Language** | Ngôn ngữ response | `vi-VN`, `en-US` |
| **X-Request-Id** | ID tracking request | `uuid-abc-123` |

### Response Headers quan trọng

| Header | Mục đích | QA verify |
|---|---|---|
| **Content-Type** | Format response | Phải là `application/json` |
| **X-RateLimit-Remaining** | Số requests còn lại | Rate limit có hoạt động? |
| **Cache-Control** | Caching policy | Sensitive data không nên cache |
| **Set-Cookie** | Cookies | HttpOnly, Secure flags |

---

## API Testing Checklist

### Functional Testing

**Positive (Happy Path):**
- [ ] GET trả về đúng data
- [ ] POST tạo thành công, trả về 201
- [ ] PUT/PATCH update đúng
- [ ] DELETE xóa thành công
- [ ] Pagination hoạt động (page, limit, offset)
- [ ] Sorting hoạt động (asc, desc)
- [ ] Filtering hoạt động (query params)
- [ ] Search hoạt động

**Negative (Error Handling):**
- [ ] Request thiếu required field → 400 + error message
- [ ] Data type sai (string thay vì number) → 400
- [ ] ID không tồn tại → 404
- [ ] Không gửi token → 401
- [ ] Token hết hạn → 401
- [ ] Không đủ quyền → 403
- [ ] Duplicate data → 409
- [ ] Invalid format (email, phone) → 422
- [ ] Body quá lớn → 413
- [ ] Request quá nhiều → 429

### Security Testing

- [ ] SQL injection: `"name": "'; DROP TABLE users; --"`
- [ ] XSS: `"name": "<script>alert('xss')</script>"`
- [ ] IDOR: User A truy cập data User B qua API
- [ ] Broken auth: Gọi API không cần token
- [ ] Sensitive data: Password không trả về trong response
- [ ] HTTPS: API có enforce HTTPS?

### Performance Testing

- [ ] Response time < 200ms (simple queries)
- [ ] Response time < 2s (complex queries)
- [ ] Pagination hoạt động (không load tất cả data)
- [ ] Payload size hợp lý

### Data Integrity

- [ ] Tạo via API → verify trong database
- [ ] Update via API → verify data thay đổi đúng
- [ ] Delete via API → verify data bị xóa
- [ ] Concurrent requests → không race condition

---

## Ví dụ Test Cases cho User API

### Test Matrix

| # | Scenario | Method | URL | Body | Expected |
|---|---|---|---|---|---|
| 1 | Get all users | GET | /api/users | - | 200, array of users |
| 2 | Get user by ID | GET | /api/users/1 | - | 200, user object |
| 3 | Get non-existent user | GET | /api/users/9999 | - | 404 |
| 4 | Create valid user | POST | /api/users | valid data | 201, user with id |
| 5 | Create without name | POST | /api/users | missing name | 400, error message |
| 6 | Create duplicate email | POST | /api/users | existing email | 409 |
| 7 | Create invalid email | POST | /api/users | bad email format | 422 |
| 8 | Update user | PUT | /api/users/1 | updated data | 200, updated user |
| 9 | Partial update | PATCH | /api/users/1 | partial data | 200, merged data |
| 10 | Delete user | DELETE | /api/users/1 | - | 204 |
| 11 | Delete already deleted | DELETE | /api/users/1 | - | 404 |
| 12 | No auth token | GET | /api/users | - | 401 |
| 13 | Invalid token | GET | /api/users | - | 401 |
| 14 | User access admin API | GET | /api/admin/users | - | 403 |
| 15 | SQL injection in name | POST | /api/users | malicious | 400 (not 500!) |

---

## Tóm tắt chương

| Concept | Điểm cốt lõi |
|---|---|
| **HTTP Methods** | GET=Read, POST=Create, PUT=Full Update, PATCH=Partial, DELETE=Remove |
| **PUT vs PATCH** | PUT thay toàn bộ, PATCH chỉ thay fields gửi |
| **Status Codes** | 2xx=OK, 4xx=Client error, 5xx=Server error (luôn là bug) |
| **Headers** | Content-Type, Authorization, Rate Limit |
| **Testing Checklist** | Positive + Negative + Security + Performance + Data Integrity |
