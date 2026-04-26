# REST API Testing

## HTTP Methods — 5 hành động cơ bản trong nhà hàng

Quay lại nhà hàng quen thuộc. Khi bạn ngồi ở bàn, bạn chỉ có thể làm **5 việc**:

| Hành động nhà hàng | HTTP Method | CRUD | Ý nghĩa |
|---|---|---|---|
| **Xem menu** — đọc danh sách món | **GET** | Read | Lấy dữ liệu, không thay đổi gì |
| **Gọi món mới** — thêm order | **POST** | Create | Tạo mới resource |
| **Đổi toàn bộ order** — viết lại từ đầu | **PUT** | Update (full) | Thay thế toàn bộ resource |
| **Sửa 1 món** — "thêm ớt vào phở" | **PATCH** | Update (partial) | Sửa một phần resource |
| **Hủy món** — không muốn nữa | **DELETE** | Delete | Xóa resource |

**CRUD** (Create-Read-Update-Delete) là 4 thao tác cơ bản với dữ liệu — POST tạo, GET đọc, PUT/PATCH sửa, DELETE xóa.

### Idempotent — Gọi nhiều lần, kết quả giống nhau?

**Idempotent** (tạm dịch: bất biến khi lặp lại) nghĩa là gọi 1 lần hay 100 lần đều cho **cùng kết quả**:

- `GET /users/1` gọi 10 lần → luôn trả về cùng user → **Idempotent**
- `POST /users` gọi 10 lần → tạo ra **10 users khác nhau** → **Không idempotent**
- `DELETE /users/1` gọi 10 lần → lần 1 xóa thành công, lần 2+ trả 404 (đã xóa rồi) → **Idempotent** (user vẫn bị xóa, trạng thái không đổi)

:::tip Aha Moment
Tại sao biết idempotent quan trọng? Vì network có thể retry request khi timeout. Nếu `POST /orders` bị retry → tạo 2 đơn hàng trùng! Đó là bug. QA cần test: "Gọi POST 2 lần liên tiếp với cùng data → có tạo duplicate không?"
:::

### Ví dụ thực tế — User API

```
# GET — Xem menu (đọc danh sách users)
# Giống: "Cho tôi xem menu trang 1, mỗi trang 10 món"
GET /api/users?page=1&limit=10&sort=name
Response 200:
{
  "data": [
    { "id": 1, "name": "An", "email": "an@mail.com" },
    { "id": 2, "name": "Binh", "email": "binh@mail.com" }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 50 }
}

# GET — Xem chi tiết 1 món (lấy 1 user cụ thể)
GET /api/users/1
Response 200:
{ "id": 1, "name": "An", "email": "an@mail.com", "role": "admin" }

# POST — Gọi món mới (tạo user)
# Giống: "Cho tôi thêm 1 món mới vào order"
POST /api/users
Body: { "name": "Chi", "email": "chi@mail.com", "password": "Pass@123" }
Response 201:
{ "id": 3, "name": "Chi", "email": "chi@mail.com" }

# PUT — Viết lại toàn bộ order
PUT /api/users/3
Body: { "name": "Chi Updated", "email": "chi.new@mail.com", "role": "vip" }
Response 200:
{ "id": 3, "name": "Chi Updated", "email": "chi.new@mail.com", "role": "vip" }

# PATCH — Sửa 1 chi tiết nhỏ ("thêm ớt vào phở")
PATCH /api/users/3
Body: { "name": "Chi Final" }
Response 200:
{ "id": 3, "name": "Chi Final", "email": "chi.new@mail.com", "role": "vip" }

# DELETE — Hủy món
DELETE /api/users/3
Response 204 (No Content — xóa thành công, không trả body)
```

---

## PUT vs PATCH — Viết lại cả lá thư vs Sửa 1 từ bằng bút xóa

Đây là điểm **nhiều người nhầm nhất**. Hãy tưởng tượng:

- **PUT** = bạn viết lại **toàn bộ lá thư**. Đoạn nào không viết lại → **mất luôn**.
- **PATCH** = bạn dùng **bút xóa (white-out)** sửa **1 từ**. Phần còn lại → **giữ nguyên**.

```
User hiện tại trong database:
{ "name": "An", "email": "an@mail.com", "role": "admin" }

━━━ PUT: Viết lại toàn bộ ━━━
PUT /api/users/1
Body: { "name": "An Updated" }
                              ↓ CHỈ gửi name, KHÔNG gửi email và role
Kết quả: { "name": "An Updated", "email": null, "role": null }
         ⚠️ email và role BỊ MẤT vì PUT thay thế TOÀN BỘ!

━━━ PATCH: Sửa 1 chi tiết ━━━
PATCH /api/users/1
Body: { "name": "An Updated" }
                              ↓ CHỈ gửi name
Kết quả: { "name": "An Updated", "email": "an@mail.com", "role": "admin" }
         ✅ email và role VẪN CÒN vì PATCH chỉ sửa field được gửi!
```

:::tip Aha Moment
**Vấn đề data loss (mất dữ liệu) với PUT** là bug phổ biến! QA cần test: "Gửi PUT chỉ với 1 field → các field khác có bị null/mất không?". Nếu API design kém, PUT có thể xóa sạch data mà developer không lường trước.
:::

---

## HTTP Status Codes — Bếp trả lời thế nào?

Status codes (mã trạng thái) giống lời phản hồi từ bếp. Chúng được chia thành 3 nhóm chính:

### 2xx — Thành công ("Đơn order hoàn thành!")

Mọi thứ OK, bạn nhận được đồ ăn.

| Code | Tên | Ý nghĩa | Khi nào |
|---|---|---|---|
| **200** | OK | Thành công | GET, PUT, PATCH thành công |
| **201** | Created | Tạo mới thành công | POST tạo resource mới |
| **204** | No Content | Thành công nhưng không có body | DELETE thành công |

### 3xx — Redirect ("Nhà hàng đã chuyển địa chỉ!")

Bạn đến nhà hàng cũ, nhân viên nói: "Chúng tôi đã chuyển sang địa chỉ mới."

| Code | Tên | Ý nghĩa |
|---|---|---|
| **301** | Moved Permanently | URL đã chuyển vĩnh viễn — update bookmark đi |
| **302** | Found | Redirect tạm thời — URL cũ vẫn dùng được |
| **304** | Not Modified | Data không thay đổi — dùng cache đi cho nhanh |

### 4xx — Lỗi từ phía bạn ("Bạn gọi sai rồi!")

Bạn gọi món không có trên menu, đưa sai số bàn, quên mang vé VIP...

| Code | Tên | Ví dụ ngoài đời | Ví dụ API |
|---|---|---|---|
| **400** | Bad Request | Gọi món nhưng nói không rõ | Body thiếu required field, sai data type |
| **401** | Unauthorized | Quên mang vé vào cửa | Token hết hạn, không gửi token |
| **403** | Forbidden | Có vé thường nhưng đòi vào khu VIP | User thường gọi API admin |
| **404** | Not Found | Gọi "Phở Nhật" — không có trên menu | GET /api/users/99999 |
| **405** | Method Not Allowed | Muốn hủy món nhưng bếp nói "món này không hủy được" | DELETE trên endpoint chỉ có GET |
| **409** | Conflict | Đặt bàn nhưng bàn đó đã có người | Email đã tồn tại |
| **422** | Unprocessable Entity | Gọi "Phở bò" nhưng yêu cầu "không nước, không bò" — vô lý | Email format sai |
| **429** | Too Many Requests | Gọi phục vụ liên tục 100 lần trong 1 phút | Gọi API quá nhiều — rate limit |

### 5xx — Lỗi từ bếp ("Bếp cháy rồi!")

Bạn gọi đúng, nhưng bếp gặp sự cố. **Đây luôn là lỗi của server**, không phải lỗi của bạn.

| Code | Tên | Ví dụ ngoài đời | QA action |
|---|---|---|---|
| **500** | Internal Server Error | Bếp cháy không rõ nguyên nhân | **Log bug!** Server không nên trả 500 |
| **502** | Bad Gateway | Nhà hàng gọi nguyên liệu từ chợ nhưng chợ đóng cửa | Có thể là infra issue |
| **503** | Service Unavailable | Bếp quá tải, không nhận thêm order | Test performance |
| **504** | Gateway Timeout | Đợi nguyên liệu từ chợ quá lâu | Kiểm tra API response time |

::: warning Quy tắc vàng cho QA
- **4xx** = Client gửi sai → cần **error message rõ ràng** để client biết sửa
- **5xx** = Server lỗi → **luôn luôn là bug** (server phải handle mọi input)
- Nếu gửi input sai mà nhận **500** thay vì 400/422 → **BUG chắc chắn!** Server phải validate input và trả lỗi hợp lý
:::

---

## Headers — "Ghi chú đặc biệt" trên đơn order

Headers (tiêu đề) là **metadata** — thông tin bổ sung đi kèm request/response. Giống ghi chú trên đơn order: "không cay", "mang đi", "thanh toán thẻ".

### Request Headers quan trọng

| Header | Giống ghi chú | Ví dụ |
|---|---|---|
| **Content-Type** | "Đơn order viết bằng tiếng Việt" — format của body | `application/json` |
| **Authorization** | "Đây là vé VIP của tôi" — token xác thực | `Bearer eyJhbGci...` |
| **Accept** | "Tôi muốn nhận hóa đơn bằng tiếng Anh" — format response mong muốn | `application/json` |
| **Accept-Language** | "Trả lời tôi bằng tiếng Việt" | `vi-VN`, `en-US` |
| **X-Request-Id** | "Mã tracking đơn hàng" — dùng để trace request | `uuid-abc-123` |

### Response Headers quan trọng

| Header | Ý nghĩa | QA cần verify |
|---|---|---|
| **Content-Type** | Format response trả về | Phải là `application/json` |
| **X-RateLimit-Remaining** | Số requests còn lại trước khi bị chặn | Rate limit có hoạt động? |
| **Cache-Control** | Policy caching (lưu tạm kết quả) | Sensitive data không nên cache! |
| **Set-Cookie** | Cookies gửi về client | Có HttpOnly, Secure flags? (bảo mật) |

---

## API Testing Checklist — Danh sách kiểm tra đầy đủ

### Functional Testing (Kiểm tra chức năng)

**Positive — Happy Path (mọi thứ đúng):**
- [ ] GET trả về đúng data
- [ ] POST tạo thành công, trả về 201
- [ ] PUT/PATCH update đúng
- [ ] DELETE xóa thành công
- [ ] Pagination (phân trang) hoạt động: page, limit, offset
- [ ] Sorting (sắp xếp) hoạt động: asc, desc
- [ ] Filtering (lọc) hoạt động: query params
- [ ] Search (tìm kiếm) hoạt động

**Negative — Error Handling (gửi sai thì sao?):**
- [ ] Request thiếu required field → 400 + error message rõ ràng
- [ ] Data type sai (string thay vì number) → 400
- [ ] ID không tồn tại → 404
- [ ] Không gửi token → 401
- [ ] Token hết hạn → 401
- [ ] Không đủ quyền → 403
- [ ] Duplicate data (trùng) → 409
- [ ] Invalid format (email, phone sai) → 422
- [ ] Body quá lớn → 413
- [ ] Request quá nhiều → 429

### Security Testing (Kiểm tra bảo mật)

- [ ] **SQL injection:** `"name": "'; DROP TABLE users; --"` → không được crash
- [ ] **XSS:** `"name": "<script>alert('xss')</script>"` → phải escape
- [ ] **IDOR:** User A truy cập data User B qua API → phải bị chặn (403)
- [ ] **Broken auth:** Gọi API mà không cần token → phải bị chặn (401)
- [ ] **Sensitive data:** Password **không được** trả về trong response
- [ ] **HTTPS:** API có enforce HTTPS? (không cho HTTP)

:::tip Aha Moment
**IDOR** (Insecure Direct Object Reference) là lỗi bảo mật phổ biến nhất trong API: User A đổi ID trong URL từ `/users/1` (của mình) thành `/users/2` (của người khác) → nếu server trả data user 2 → đó là **bug bảo mật nghiêm trọng!**
:::

### Performance Testing (Kiểm tra hiệu năng)

- [ ] Response time < 200ms (simple queries)
- [ ] Response time < 2s (complex queries)
- [ ] Pagination hoạt động (không load toàn bộ data 1 lần)
- [ ] Payload size (kích thước response) hợp lý

### Data Integrity (Toàn vẹn dữ liệu)

- [ ] Tạo via API → verify trong database đúng
- [ ] Update via API → verify data thay đổi chính xác
- [ ] Delete via API → verify data thật sự bị xóa
- [ ] Concurrent requests (nhiều request cùng lúc) → không race condition (xung đột)

---

## Ví dụ Test Cases cho User API

### Test Matrix — Bảng kịch bản test

| # | Scenario | Method | URL | Body | Expected |
|---|---|---|---|---|---|
| 1 | Lấy danh sách users | GET | /api/users | - | 200, array of users |
| 2 | Lấy user theo ID | GET | /api/users/1 | - | 200, user object |
| 3 | User không tồn tại | GET | /api/users/9999 | - | 404 |
| 4 | Tạo user hợp lệ | POST | /api/users | valid data | 201, user with id |
| 5 | Tạo thiếu name | POST | /api/users | missing name | 400, error message |
| 6 | Email đã tồn tại | POST | /api/users | existing email | 409 |
| 7 | Email sai format | POST | /api/users | bad email | 422 |
| 8 | Update toàn bộ | PUT | /api/users/1 | full data | 200, updated user |
| 9 | Update 1 phần | PATCH | /api/users/1 | partial data | 200, merged data |
| 10 | Xóa user | DELETE | /api/users/1 | - | 204 |
| 11 | Xóa user đã bị xóa | DELETE | /api/users/1 | - | 404 |
| 12 | Không có auth token | GET | /api/users | - | 401 |
| 13 | Token không hợp lệ | GET | /api/users | - | 401 |
| 14 | User thường gọi API admin | GET | /api/admin/users | - | 403 |
| 15 | SQL injection trong name | POST | /api/users | malicious | 400 (KHÔNG PHẢI 500!) |

---

## Tóm tắt chương

| Concept | Bản chất (Essence) | Điểm cốt lõi |
|---|---|---|
| **HTTP Methods** | 5 hành động trong nhà hàng | GET=Xem menu, POST=Gọi món, PUT=Viết lại order, PATCH=Sửa 1 chi tiết, DELETE=Hủy |
| **PUT vs PATCH** | Viết lại lá thư vs Sửa 1 từ bằng bút xóa | PUT thay toàn bộ (coi chừng mất data!), PATCH chỉ sửa fields gửi |
| **Status Codes** | Lời phản hồi từ bếp | 2xx=OK, 4xx=Bạn sai, 5xx=Bếp lỗi (luôn là bug) |
| **Headers** | Ghi chú đặc biệt trên đơn order | Content-Type, Authorization, Rate Limit |
| **Testing Checklist** | Kiểm tra toàn diện | Positive + Negative + Security + Performance + Data Integrity |
