# SQL cho QA - Nói chuyện với Database

## Database là gì? Hãy tưởng tượng một tủ hồ sơ

Trước khi học SQL, bạn cần hiểu **database** (cơ sở dữ liệu) là gì đã. Đừng nghĩ nó phức tạp — hãy tưởng tượng bạn đang đứng trước **một tủ hồ sơ khổng lồ** trong văn phòng.

```
🗄️ TỦ HỒ SƠ (DATABASE: ecommerce_db)
│
├── 📂 Ngăn kéo "users" (TABLE)
│   ├── 📁 Hồ sơ #1: {Tên: An, Email: an@mail.com}      ← ROW (1 dòng dữ liệu)
│   ├── 📁 Hồ sơ #2: {Tên: Bình, Email: binh@mail.com}
│   └── 📁 Hồ sơ #3: {Tên: Chi, Email: chi@mail.com}
│
├── 📂 Ngăn kéo "products" (TABLE)
│   ├── 📁 Hồ sơ #1: {Tên SP: Áo thun, Giá: 200K}
│   └── 📁 Hồ sơ #2: {Tên SP: Quần jeans, Giá: 500K}
│
└── 📂 Ngăn kéo "orders" (TABLE)
    ├── 📁 Hồ sơ #1: {User: An, Tổng: 700K, Status: completed}
    └── 📁 Hồ sơ #2: {User: Bình, Tổng: 200K, Status: pending}
```

Bây giờ dịch sang ngôn ngữ kỹ thuật:

| Tủ hồ sơ | Database term | Giải thích |
|---|---|---|
| **Cả cái tủ** | **Database** | Nơi chứa toàn bộ dữ liệu của ứng dụng |
| **Một ngăn kéo** | **Table** (bảng) | Một nhóm dữ liệu cùng loại (users, products, orders) |
| **Một folder hồ sơ** | **Row** (dòng) | Một record cụ thể — ví dụ: thông tin của 1 user |
| **Một mục trong folder** | **Column** (cột) | Một loại thông tin — ví dụ: name, email, price |
| **Số hiệu trên folder** | **Primary Key** (PK) | Mã số duy nhất để nhận diện mỗi record, không trùng lặp |
| **Ghi chú "xem thêm ngăn kéo X"** | **Foreign Key** (FK) | Liên kết giữa 2 bảng — ví dụ: order ghi `user_id = 1` nghĩa là "đơn hàng này của user số 1" |

::: tip Aha moment
Primary Key giống số CMND/CCCD — mỗi người có 1 số duy nhất, không ai trùng ai. Nhờ đó bạn luôn tìm được đúng người cần tìm.
:::

---

## SQL là gì? Ngôn ngữ để "nói chuyện" với tủ hồ sơ

**SQL** (Structured Query Language — ngôn ngữ truy vấn có cấu trúc) là **ngôn ngữ bạn dùng để ra lệnh cho cái tủ hồ sơ**.

Bạn không thể tự mở ngăn kéo và lục tìm. Bạn phải **viết lệnh** bằng SQL, và database sẽ trả kết quả cho bạn. Giống như bạn nói với thủ thư: "Cho tôi xem hồ sơ của user tên An" — nhưng bằng ngôn ngữ SQL.

Một vài "câu nói" cơ bản:

| SQL keyword | Dịch nôm na | Ví dụ thực tế |
|---|---|---|
| `SELECT` | "Cho tôi xem..." | Cho tôi xem tên và email của tất cả users |
| `WHERE` | "Nhưng chỉ những cái mà..." | ...nhưng chỉ user có email là an@mail.com |
| `JOIN` | "Kết hợp thông tin từ 2 ngăn kéo" | Cho tôi xem tên user kèm đơn hàng của họ |
| `INSERT` | "Thêm vào hồ sơ mới" | Thêm 1 user mới tên Test User |
| `UPDATE` | "Sửa hồ sơ" | Đổi status đơn hàng #1 thành completed |
| `DELETE` | "Xóa hồ sơ" | Xóa tất cả hồ sơ test |

---

## Tại sao QA cần biết SQL?

Đây là câu hỏi quan trọng nhất. Không phải "SQL dùng thế nào" mà là **"tại sao mình cần nó"**.

### 1. Verify API có nói dối không

API trả response `"status": "created"` — nhưng **thực sự** data đã được lưu vào database chưa? Hay API nói "xong" mà thực ra chưa xong?

```
Bạn test API tạo user → API trả về: { "status": "success", "id": 999 }

Câu hỏi: Thật sự có user #999 trong database không?

Mở DBeaver, chạy:
SELECT * FROM users WHERE id = 999;

→ Nếu ra kết quả → API nói thật ✅
→ Nếu không có gì → API nói dối! Đây là BUG 🐛
```

### 2. Tạo test data siêu nhanh

Cần test tính năng "VIP user có 100 đơn hàng"? Bạn sẽ không ngồi tạo tay 100 đơn đâu. Một câu SQL giải quyết trong 1 giây.

### 3. Debug bug ở tầng data

UI hiển thị sai? Có thể **data trong database đã sai từ đầu**. SQL giúp bạn nhìn thẳng vào "sự thật" — data thực tế đang nằm trong database.

::: info Thực tế phỏng vấn
Khoảng 80% công ty yêu cầu QA biết SQL cơ bản. Nhiều job description ghi rõ "SQL is required". Đây không phải kiến thức optional — đây là **must-have**.
:::

---

## SELECT và WHERE - Hai lệnh bạn dùng nhiều nhất

### SELECT — "Cho tôi xem..."

```sql
-- Câu lệnh đơn giản nhất: xem TẤT CẢ data trong bảng users
SELECT * FROM users;
```

Giải thích từng phần:
- `SELECT` — "Cho tôi xem" (lệnh đọc dữ liệu)
- `*` — "tất cả columns" (dấu sao = wildcard = tất cả)
- `FROM users` — "từ bảng users" (từ ngăn kéo nào?)

```sql
-- Chỉ xem tên và email thôi, không cần hết
SELECT name, email FROM users;
```

Ở đây thay vì `*` (tất cả), bạn chỉ định rõ: chỉ lấy column `name` và `email`.

```sql
-- Chỉ xem 10 records đầu tiên (tránh load cả triệu dòng)
SELECT * FROM users LIMIT 10;
```

`LIMIT 10` = "chỉ cho tôi xem 10 cái đầu tiên". **Luôn dùng LIMIT** khi bạn không biết bảng có bao nhiêu data — tránh trường hợp bảng có 1 triệu dòng mà bạn load hết lên.

### WHERE — "Nhưng chỉ những cái mà..."

`WHERE` là bộ lọc. Không có `WHERE`, bạn lấy **tất cả**. Có `WHERE`, bạn chỉ lấy **đúng cái cần**.

```sql
-- Tìm user có email cụ thể
SELECT * FROM users WHERE email = 'an@mail.com';
```

Giải thích: "Cho tôi xem tất cả thông tin từ bảng users, **nhưng chỉ** user nào có email bằng an@mail.com".

```sql
-- Tìm users đăng ký trong tháng 4/2026
SELECT * FROM users
WHERE created_at >= '2026-04-01'    -- từ ngày 1/4
  AND created_at < '2026-05-01';    -- đến trước ngày 1/5
```

`AND` = "và" — cả 2 điều kiện phải đúng. User phải đăng ký **từ** ngày 1/4 **và** **trước** ngày 1/5.

```sql
-- Tìm users có tên chứa "Nguyen"
SELECT * FROM users WHERE name LIKE '%Nguyen%';
```

`LIKE` = tìm theo pattern (mẫu). Dấu `%` = "bất kỳ ký tự nào". Nên `'%Nguyen%'` nghĩa là "bất kỳ gì + Nguyen + bất kỳ gì" — tìm tất cả tên có chứa chữ Nguyen.

**Các operators (phép so sánh) hay dùng:**

| Operator | Nghĩa | Ví dụ |
|---|---|---|
| `=` | Bằng | `status = 'active'` |
| `!=` hoặc `<>` | Khác | `status != 'deleted'` |
| `>`, `<`, `>=`, `<=` | Lớn hơn, nhỏ hơn | `price > 100000` |
| `LIKE` | Tìm theo pattern | `name LIKE '%nguyen%'` |
| `IN` | Nằm trong danh sách | `status IN ('active', 'pending')` |
| `BETWEEN` | Trong khoảng | `price BETWEEN 100 AND 500` |
| `IS NULL` | Không có giá trị | `email IS NULL` |
| `AND` | Và (cả 2 điều kiện đúng) | `age > 18 AND status = 'active'` |
| `OR` | Hoặc (1 trong 2 đúng) | `role = 'admin' OR role = 'manager'` |

### ORDER BY — Sắp xếp kết quả

```sql
-- Xem users mới nhất trước (sắp xếp ngày tạo giảm dần)
SELECT * FROM users ORDER BY created_at DESC;
```

- `ORDER BY created_at` = sắp xếp theo cột created_at
- `DESC` = descending (giảm dần — mới nhất lên đầu). Ngược lại là `ASC` = ascending (tăng dần — cũ nhất lên đầu)

### COUNT, SUM, AVG — Đếm, tổng, trung bình

```sql
-- Đếm tổng số users
SELECT COUNT(*) FROM users;
-- COUNT(*) = đếm tất cả rows. Kết quả: 1 con số, ví dụ 1500

-- Đếm orders theo từng status
SELECT status, COUNT(*) as total
FROM orders
GROUP BY status;
-- GROUP BY status = nhóm theo status, đếm mỗi nhóm bao nhiêu
-- "as total" = đặt tên cho cột kết quả là "total" cho dễ đọc
-- Kết quả: completed: 500, pending: 200, cancelled: 50
```

---

## JOIN — Kết hợp thông tin từ 2 bảng

Đây là phần **quan trọng nhất** và cũng hay gây bối rối nhất. Hãy hiểu bản chất trước.

**Tại sao cần JOIN?** Vì data được chia vào nhiều bảng khác nhau. Bảng `orders` chỉ lưu `user_id = 1`, không lưu tên user. Muốn biết "ai đặt đơn hàng này?" thì phải **kết hợp** bảng orders với bảng users.

Giống như: ngăn kéo "đơn hàng" chỉ ghi "của hồ sơ số 1". Muốn biết "hồ sơ số 1 là ai?" thì phải mở ngăn kéo "users" ra.

### INNER JOIN — Chỉ lấy data khớp ở CẢ HAI bảng

```
Bảng users:                     Bảng orders:
┌────┬───────┬──────────────┐   ┌────┬─────────┬────────┬───────────┐
│ id │ name  │ email        │   │ id │ user_id │ total  │ status    │
├────┼───────┼──────────────┤   ├────┼─────────┼────────┼───────────┤
│ 1  │ An    │ an@mail.com  │   │ 1  │ 1       │ 500K   │ completed │
│ 2  │ Bình  │ binh@mail.com│   │ 2  │ 2       │ 300K   │ pending   │
│ 3  │ Chi   │ chi@mail.com │   │ 3  │ 1       │ 200K   │ completed │
└────┴───────┴──────────────┘   └────┴─────────┴────────┴───────────┘
                                     ↑
                          user_id trỏ về id bên bảng users
```

```sql
-- "Cho tôi xem tên user kèm đơn hàng của họ"
SELECT users.name, orders.id as order_id, orders.total, orders.status
FROM orders
INNER JOIN users ON orders.user_id = users.id;
```

Giải thích từng dòng:
- `SELECT users.name, orders.total` — Lấy cột name từ bảng users, cột total từ bảng orders
- `FROM orders` — Bắt đầu từ bảng orders
- `INNER JOIN users` — Kết hợp với bảng users
- `ON orders.user_id = users.id` — Điều kiện kết hợp: user_id bên orders **khớp với** id bên users

```
Kết quả INNER JOIN:
┌───────┬──────────┬────────┬───────────┐
│ name  │ order_id │ total  │ status    │
├───────┼──────────┼────────┼───────────┤
│ An    │ 1        │ 500K   │ completed │  ← An có 2 đơn
│ An    │ 3        │ 200K   │ completed │
│ Bình  │ 2        │ 300K   │ pending   │
└───────┴──────────┴────────┴───────────┘

⚠️  Chi KHÔNG xuất hiện — vì Chi không có đơn hàng nào
    INNER JOIN chỉ lấy những cái KHỚP ở cả 2 bảng
```

### LEFT JOIN — Lấy TẤT CẢ từ bảng bên trái, kể cả không khớp

```sql
-- "Cho tôi xem TẤT CẢ users, kể cả người chưa mua gì"
SELECT users.name, orders.total
FROM users                                    -- bảng TRÁI (lấy hết)
LEFT JOIN orders ON users.id = orders.user_id; -- bảng PHẢI (khớp thì lấy, không thì NULL)
```

```
Kết quả LEFT JOIN:
┌───────┬────────┐
│ name  │ total  │
├───────┼────────┤
│ An    │ 500K   │
│ An    │ 200K   │
│ Bình  │ 300K   │
│ Chi   │ NULL   │  ← Chi VẪN xuất hiện, total = NULL vì không có đơn
└───────┴────────┘
```

::: tip Aha moment
- **INNER JOIN** = "Cho tôi xem cặp đôi" — chỉ hiện những ai CÓ ĐỐI tác bên kia
- **LEFT JOIN** = "Cho tôi xem tất cả bên trái, có đối tác thì ghép, không có thì để trống (NULL)"

QA dùng LEFT JOIN khi muốn **tìm data bị thiếu** — ví dụ: "User nào đã đăng ký nhưng chưa bao giờ mua hàng?"
:::

---

## INSERT / UPDATE / DELETE — Thêm, sửa, xóa data

### INSERT — Thêm data mới (tạo test data)

```sql
-- Thêm 1 test user
INSERT INTO users (name, email, created_at)
VALUES ('Test User', 'testuser@test.com', NOW());
```

Giải thích:
- `INSERT INTO users` — Thêm vào bảng users
- `(name, email, created_at)` — Các columns sẽ điền data
- `VALUES (...)` — Giá trị tương ứng cho mỗi column
- `NOW()` — Hàm trả về thời gian hiện tại

```sql
-- Thêm nhiều users cùng lúc (bulk insert)
INSERT INTO users (name, email, created_at) VALUES
  ('User 1', 'user1@test.com', NOW()),
  ('User 2', 'user2@test.com', NOW()),
  ('User 3', 'user3@test.com', NOW());
```

### UPDATE — Sửa data đã có

```sql
-- Đổi status đơn hàng #1 thành completed
UPDATE orders SET status = 'completed' WHERE id = 1;
```

Giải thích:
- `UPDATE orders` — Sửa trong bảng orders
- `SET status = 'completed'` — Đặt cột status thành 'completed'
- `WHERE id = 1` — **CHỈ** dòng có id = 1

### DELETE — Xóa data

```sql
-- Xóa tất cả test data (dựa vào pattern email)
DELETE FROM users WHERE email LIKE '%@test.com';
```

Giải thích:
- `DELETE FROM users` — Xóa khỏi bảng users
- `WHERE email LIKE '%@test.com'` — Chỉ xóa những user có email kết thúc bằng @test.com

---

::: danger CẢNH BÁO CỰC KỲ QUAN TRỌNG — UPDATE/DELETE KHÔNG CÓ WHERE

Đây là sai lầm **nguy hiểm nhất** khi viết SQL và nó xảy ra thường xuyên hơn bạn nghĩ.

**Nếu bạn quên WHERE, SQL sẽ thực hiện lệnh trên TOÀN BỘ bảng.**

```sql
-- ❌ THẢM HỌA: Xóa TẤT CẢ users trong database!
DELETE FROM users;

-- ❌ THẢM HỌA: Đổi TẤT CẢ đơn hàng thành completed!
UPDATE orders SET status = 'completed';
```

Hãy tưởng tượng: bạn muốn xóa 1 folder hồ sơ test trong ngăn kéo, nhưng thay vì rút 1 folder ra, bạn **đổ hết cả ngăn kéo vào thùng rác**. Hàng ngàn hồ sơ khách hàng thật — mất hết.

**Cách viết đúng — LUÔN LUÔN có WHERE:**

```sql
-- ✅ AN TOÀN: Chỉ xóa đúng test data
DELETE FROM users WHERE email LIKE '%@test.com';

-- ✅ AN TOÀN: Chỉ update đúng 1 đơn hàng
UPDATE orders SET status = 'completed' WHERE id = 1;
```

**Quy tắc vàng: Luôn chạy SELECT trước, rồi mới DELETE/UPDATE**

```sql
-- Bước 1: XEM trước những gì sẽ bị ảnh hưởng
SELECT * FROM users WHERE email LIKE '%@test.com';
-- → Kết quả: 3 rows. Đúng là 3 test users cần xóa. OK!

-- Bước 2: BÂY GIỜ mới xóa (thay SELECT * bằng DELETE)
DELETE FROM users WHERE email LIKE '%@test.com';
-- → 3 rows affected. Đúng như expected ✅
```

Nếu bước 1 cho ra 50,000 rows thay vì 3 — bạn biết WHERE clause đang sai và dừng lại kịp thời!
:::

---

## Use cases thực tế QA dùng SQL hàng ngày

### 1. Verify data sau khi gọi API

```sql
-- API tạo user trả về id = 999. Verify trong DB:
SELECT * FROM users WHERE id = 999;
-- Kiểm tra: name, email, created_at có đúng không?
```

### 2. Debug bug: UI hiển thị sai tổng đơn hàng

```sql
-- UI nói user #456 có tổng đơn = 0. Kiểm tra thực tế:
SELECT COUNT(*) as so_don, SUM(total) as tong_tien
FROM orders
WHERE user_id = 456 AND status = 'completed';
-- Phát hiện: orders đang ở status = 'pending', nên tổng completed = 0
-- → Bug ở logic update status, không phải bug UI
```

### 3. Tạo test data nhanh

```sql
-- Tạo VIP user + đơn hàng cho test
INSERT INTO users (name, email, role, created_at)
VALUES ('VIP Tester', 'vip@test.com', 'vip', NOW());

INSERT INTO orders (user_id, total, status, created_at)
VALUES
  ((SELECT id FROM users WHERE email = 'vip@test.com'), 500000, 'completed', NOW()),
  ((SELECT id FROM users WHERE email = 'vip@test.com'), 300000, 'pending', NOW());
```

### 4. Tìm duplicate data (data bị trùng)

```sql
-- Tìm email nào bị trùng — đây là bug data integrity
SELECT email, COUNT(*) as so_lan
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
-- GROUP BY email = nhóm theo email
-- HAVING COUNT(*) > 1 = chỉ hiện nhóm nào có hơn 1 record (bị trùng)
```

### 5. Tìm orphan data (data mồ côi)

```sql
-- Tìm đơn hàng có user_id trỏ đến user không tồn tại
SELECT orders.*
FROM orders
LEFT JOIN users ON orders.user_id = users.id
WHERE users.id IS NULL;
-- LEFT JOIN giữ lại tất cả orders
-- WHERE users.id IS NULL = lọc ra orders mà user bên kia không tồn tại
-- Nếu có kết quả → data integrity bị lỗi!
```

### 6. Cleanup test data sau khi test xong

```sql
-- Bước 1: XEM trước (quy tắc vàng!)
SELECT * FROM users WHERE email LIKE '%@test.com';

-- Bước 2: Xóa orders của test users trước (vì orders phụ thuộc vào users)
DELETE FROM orders WHERE user_id IN (
  SELECT id FROM users WHERE email LIKE '%@test.com'
);

-- Bước 3: Xóa test users
DELETE FROM users WHERE email LIKE '%@test.com';
```

---

## Tool khuyên dùng: DBeaver

Để chạy SQL, bạn cần một **database client** — phần mềm kết nối đến database và cho bạn viết SQL.

| Tool | Giá | Ghi chú |
|---|---|---|
| **DBeaver** | Free | Hỗ trợ mọi loại DB (MySQL, PostgreSQL, SQL Server...). Giao diện thân thiện, có auto-complete SQL. **Khuyên dùng cho QA.** |
| MySQL Workbench | Free | Chỉ dùng cho MySQL |
| pgAdmin | Free | Chỉ dùng cho PostgreSQL |
| DataGrip | Paid | Của JetBrains, rất mạnh nhưng tốn phí |

::: tip Tại sao DBeaver?
DBeaver là lựa chọn tốt nhất cho QA vì: miễn phí, hỗ trợ gần như mọi loại database, giao diện trực quan, có auto-complete giúp bạn viết SQL nhanh hơn, và cộng đồng lớn nên dễ tìm hướng dẫn khi gặp khó.
:::

---

## Tóm tắt chương

| Lệnh | Giống như nói... | QA dùng khi |
|---|---|---|
| `SELECT` | "Cho tôi xem..." | Verify data, debug bugs |
| `WHERE` | "Nhưng chỉ những cái mà..." | Lọc đúng record cần tìm |
| `JOIN` | "Kết hợp 2 ngăn kéo" | Kiểm tra quan hệ giữa các bảng |
| `INSERT` | "Thêm hồ sơ mới" | Tạo test data |
| `UPDATE` | "Sửa hồ sơ" (LUÔN có WHERE!) | Setup test conditions |
| `DELETE` | "Xóa hồ sơ" (LUÔN có WHERE!) | Cleanup test data |
| `COUNT/SUM` | "Đếm/tính tổng giùm tôi" | Verify calculations |
| `GROUP BY` | "Nhóm lại theo..." | Thống kê, tìm duplicates |

::: warning Ghi nhớ quan trọng nhất
**Trước khi UPDATE hoặc DELETE — LUÔN chạy SELECT với cùng WHERE clause trước.** Xem kết quả đúng chưa, rồi hẵng thực hiện. Một câu SQL sai có thể phá hủy data không khôi phục được.
:::
