# SQL cho QA

## Tại sao QA cần biết SQL? (WHY)

Phần lớn ứng dụng lưu trữ dữ liệu trong **database**. QA cần SQL để:

1. **Verify data** — API trả về đúng, nhưng database lưu đúng chưa?
2. **Tạo test data** — Tạo nhanh 1000 users thay vì register tay từng cái
3. **Debug bugs** — Tìm nguyên nhân lỗi ở tầng data
4. **Kiểm tra data integrity** — Sau khi migration, data có bị mất/sai không?
5. **Hiểu backend** — Giao tiếp hiệu quả hơn với developer

**Thực tế phỏng vấn:** ~80% công ty yêu cầu QA biết SQL cơ bản. Nhiều job description ghi rõ "SQL is required".

---

## Database là gì? (WHAT)

### Định nghĩa

Database (cơ sở dữ liệu) là nơi **lưu trữ dữ liệu có tổ chức** để có thể truy xuất, quản lý và cập nhật dễ dàng.

### Phân loại

| Loại | Đặc điểm | Ví dụ | Khi dùng |
|---|---|---|---|
| **Relational (SQL)** | Bảng, hàng, cột. Quan hệ giữa các bảng | MySQL, PostgreSQL, SQL Server | ~80% ứng dụng business |
| **NoSQL** | Linh hoạt, không cần schema cố định | MongoDB, Redis, DynamoDB | Big data, real-time, flexible schema |

### Cấu trúc Relational Database

```
Database: ecommerce_db
├── Table: users
│   ├── Column: id (INT, Primary Key)
│   ├── Column: name (VARCHAR)
│   ├── Column: email (VARCHAR, Unique)
│   └── Column: created_at (DATETIME)
│
├── Table: products
│   ├── Column: id (INT, Primary Key)
│   ├── Column: name (VARCHAR)
│   ├── Column: price (DECIMAL)
│   └── Column: stock (INT)
│
└── Table: orders
    ├── Column: id (INT, Primary Key)
    ├── Column: user_id (INT, Foreign Key → users.id)
    ├── Column: total (DECIMAL)
    └── Column: status (VARCHAR)
```

**Giải thích:**
- **Table** = Bảng dữ liệu (giống sheet trong Excel)
- **Row** = 1 record (1 dòng dữ liệu)
- **Column** = 1 field (1 thuộc tính)
- **Primary Key (PK)** = ID duy nhất cho mỗi row
- **Foreign Key (FK)** = Liên kết đến PK của bảng khác

---

## SQL cơ bản (HOW)

SQL (Structured Query Language) là ngôn ngữ để **giao tiếp với database**.

### SELECT — Đọc dữ liệu

Lệnh được QA dùng **nhiều nhất**:

```sql
-- Lấy tất cả users
SELECT * FROM users;

-- Lấy một số columns cụ thể
SELECT name, email FROM users;

-- Lấy 10 records đầu tiên
SELECT * FROM users LIMIT 10;
```

### WHERE — Lọc dữ liệu

```sql
-- User có email cụ thể
SELECT * FROM users WHERE email = 'test@mail.com';

-- Users đăng ký trong tháng 4/2026
SELECT * FROM users
WHERE created_at >= '2026-04-01'
  AND created_at < '2026-05-01';

-- Users có tên chứa "Nguyen"
SELECT * FROM users WHERE name LIKE '%Nguyen%';

-- Orders có status không phải 'completed'
SELECT * FROM orders WHERE status != 'completed';

-- Products hết hàng
SELECT * FROM products WHERE stock = 0;
```

**Operators phổ biến:**

| Operator | Ý nghĩa | Ví dụ |
|---|---|---|
| `=` | Bằng | `status = 'active'` |
| `!=` hoặc `<>` | Khác | `status != 'deleted'` |
| `>`, `<`, `>=`, `<=` | So sánh | `price > 100000` |
| `LIKE` | Pattern matching | `name LIKE '%nguyen%'` |
| `IN` | Trong danh sách | `status IN ('active', 'pending')` |
| `BETWEEN` | Trong khoảng | `price BETWEEN 100 AND 500` |
| `IS NULL` | Giá trị null | `email IS NULL` |
| `IS NOT NULL` | Không null | `phone IS NOT NULL` |
| `AND` | Và | `age > 18 AND status = 'active'` |
| `OR` | Hoặc | `role = 'admin' OR role = 'manager'` |

### ORDER BY — Sắp xếp

```sql
-- Sắp xếp theo ngày tạo (mới nhất trước)
SELECT * FROM users ORDER BY created_at DESC;

-- Sắp xếp theo tên (A-Z)
SELECT * FROM users ORDER BY name ASC;

-- Sắp xếp theo nhiều cột
SELECT * FROM orders ORDER BY status ASC, total DESC;
```

### COUNT, SUM, AVG — Tổng hợp

```sql
-- Đếm số users
SELECT COUNT(*) FROM users;

-- Đếm orders theo status
SELECT status, COUNT(*) as total
FROM orders
GROUP BY status;

-- Tổng doanh thu
SELECT SUM(total) as revenue FROM orders WHERE status = 'completed';

-- Giá trung bình sản phẩm
SELECT AVG(price) as avg_price FROM products;

-- Sản phẩm đắt nhất và rẻ nhất
SELECT MAX(price) as max_price, MIN(price) as min_price FROM products;
```

### JOIN — Kết nối bảng

JOIN là khái niệm **quan trọng nhất** cần hiểu. Giúp lấy dữ liệu từ nhiều bảng cùng lúc.

#### INNER JOIN — Chỉ lấy dữ liệu khớp ở cả 2 bảng

```sql
-- Lấy thông tin order kèm tên user
SELECT orders.id, users.name, users.email, orders.total, orders.status
FROM orders
INNER JOIN users ON orders.user_id = users.id;
```

```
Table: users                    Table: orders
┌────┬───────────┐              ┌────┬─────────┬────────┐
│ id │ name      │              │ id │ user_id │ total  │
├────┼───────────┤              ├────┼─────────┼────────┤
│ 1  │ An        │◄────────────►│ 1  │ 1       │ 500K   │
│ 2  │ Binh      │◄────────────►│ 2  │ 2       │ 300K   │
│ 3  │ Chi       │   (no order) │ 3  │ 1       │ 200K   │
└────┴───────────┘              └────┴─────────┴────────┘

INNER JOIN result:
┌───────┬───────────┬────────┐
│ name  │ order_id  │ total  │
├───────┼───────────┼────────┤
│ An    │ 1         │ 500K   │  ← An có 2 orders
│ An    │ 3         │ 200K   │
│ Binh  │ 2         │ 300K   │
└───────┴───────────┴────────┘
(Chi không có order → không xuất hiện)
```

#### LEFT JOIN — Lấy tất cả từ bảng trái, kể cả không khớp

```sql
-- Tất cả users, kể cả chưa có order
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

```
LEFT JOIN result:
┌───────┬────────┐
│ name  │ total  │
├───────┼────────┤
│ An    │ 500K   │
│ An    │ 200K   │
│ Binh  │ 300K   │
│ Chi   │ NULL   │  ← Chi vẫn xuất hiện, total = NULL
└───────┴────────┘
```

**Tóm tắt JOINs:**

| JOIN type | Kết quả |
|---|---|
| **INNER JOIN** | Chỉ rows khớp ở cả 2 bảng |
| **LEFT JOIN** | Tất cả rows bảng trái + khớp bảng phải |
| **RIGHT JOIN** | Tất cả rows bảng phải + khớp bảng trái |
| **FULL JOIN** | Tất cả rows cả 2 bảng |

### INSERT — Thêm dữ liệu

```sql
-- Thêm 1 user (tạo test data)
INSERT INTO users (name, email, created_at)
VALUES ('Test User', 'testuser@mail.com', NOW());

-- Thêm nhiều users cùng lúc
INSERT INTO users (name, email, created_at) VALUES
  ('User 1', 'user1@mail.com', NOW()),
  ('User 2', 'user2@mail.com', NOW()),
  ('User 3', 'user3@mail.com', NOW());
```

### UPDATE — Cập nhật dữ liệu

```sql
-- Cập nhật status order
UPDATE orders SET status = 'completed' WHERE id = 1;

-- Reset password cho test user
UPDATE users SET password = 'hashed_password' WHERE email = 'test@mail.com';
```

::: danger Cẩn thận!
**Luôn có WHERE** khi UPDATE hoặc DELETE. Quên WHERE = thay đổi **toàn bộ** bảng!

```sql
-- ❌ NGUY HIỂM: Update tất cả orders thành completed!
UPDATE orders SET status = 'completed';

-- ✅ AN TOÀN: Chỉ update order cụ thể
UPDATE orders SET status = 'completed' WHERE id = 1;
```
:::

### DELETE — Xóa dữ liệu

```sql
-- Xóa test data sau khi test
DELETE FROM users WHERE email LIKE '%@test.com';

-- Xóa orders cũ hơn 1 năm (cleanup test data)
DELETE FROM orders WHERE created_at < '2025-01-01';
```

---

## SQL trong công việc QA hàng ngày

### 1. Verify API response vs Database

**Scenario:** Test API "Get User Profile" trả về đúng data.

```
Step 1: Gọi API GET /api/users/123
Step 2: Nhận response:
        { "name": "Nguyen Van A", "email": "a@mail.com" }
Step 3: Verify bằng SQL:
```

```sql
SELECT name, email FROM users WHERE id = 123;
-- Kết quả phải match với API response
```

### 2. Verify bug ở tầng data

**Scenario:** UI hiển thị tổng đơn hàng = 0, nhưng user đã mua hàng.

```sql
-- Kiểm tra orders của user
SELECT * FROM orders WHERE user_id = 456;

-- Kiểm tra tổng
SELECT SUM(total) as total_spent
FROM orders
WHERE user_id = 456 AND status = 'completed';
```

→ Có thể phát hiện: data đang là `status = 'pending'` thay vì `'completed'`, nên UI tính tổng sai.

### 3. Tạo test data nhanh

```sql
-- Tạo 1 VIP user cho test
INSERT INTO users (name, email, role, created_at)
VALUES ('VIP Test User', 'vip@test.com', 'vip', NOW());

-- Tạo orders cho user đó
INSERT INTO orders (user_id, total, status, created_at)
VALUES
  ((SELECT id FROM users WHERE email = 'vip@test.com'), 500000, 'completed', NOW()),
  ((SELECT id FROM users WHERE email = 'vip@test.com'), 300000, 'pending', NOW());
```

### 4. Cleanup test data sau khi test

```sql
-- Xóa test data (dựa vào pattern email)
DELETE FROM orders WHERE user_id IN (
  SELECT id FROM users WHERE email LIKE '%@test.com'
);
DELETE FROM users WHERE email LIKE '%@test.com';
```

### 5. Kiểm tra data sau migration

```sql
-- Đếm records trước và sau migration
SELECT COUNT(*) FROM users;  -- Chạy trước migration
-- ... migration chạy ...
SELECT COUNT(*) FROM users;  -- Chạy sau migration → phải bằng nhau

-- Kiểm tra không có data bị null sau migration
SELECT COUNT(*) FROM users WHERE name IS NULL OR email IS NULL;
-- Expected: 0
```

---

## Query patterns hữu ích cho QA

### Tìm duplicate data

```sql
-- Tìm email bị trùng (bug data integrity)
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### Tìm data inconsistency

```sql
-- Orders có user_id không tồn tại trong bảng users (orphan data)
SELECT orders.*
FROM orders
LEFT JOIN users ON orders.user_id = users.id
WHERE users.id IS NULL;
```

### Thống kê cho test report

```sql
-- Số orders theo status (cho báo cáo)
SELECT
  status,
  COUNT(*) as count,
  SUM(total) as total_revenue,
  AVG(total) as avg_order_value
FROM orders
GROUP BY status
ORDER BY count DESC;
```

### Tìm data theo thời gian

```sql
-- Users đăng ký hôm nay
SELECT * FROM users WHERE DATE(created_at) = CURDATE();

-- Orders trong 7 ngày gần nhất
SELECT * FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);
```

---

## Tools để chạy SQL

| Tool | Platform | Đặc điểm |
|---|---|---|
| **DBeaver** | Cross-platform (Free) | Hỗ trợ nhiều loại DB, recommended cho QA |
| **MySQL Workbench** | Cross-platform (Free) | Cho MySQL |
| **pgAdmin** | Cross-platform (Free) | Cho PostgreSQL |
| **DataGrip** | Cross-platform (Paid) | JetBrains, mạnh nhất |
| **Terminal/CLI** | Any | `mysql`, `psql` commands |

::: tip Recommend
**DBeaver** là lựa chọn tốt nhất cho QA: miễn phí, hỗ trợ mọi loại database, giao diện dễ dùng, có auto-complete SQL.
:::

---

## Best Practices

### Nguyên tắc an toàn

1. **Luôn dùng SELECT trước** — Xem data trước khi UPDATE/DELETE
2. **Luôn có WHERE** — Không bao giờ UPDATE/DELETE mà không có WHERE
3. **Dùng LIMIT** — `SELECT * FROM users LIMIT 10` thay vì lấy hết cả triệu records
4. **Backup trước khi thay đổi** — Đặc biệt trên shared environments
5. **Không chạy SQL trên Production** — Trừ khi được authorize và review

### Quy trình an toàn khi cần thay đổi data

```
1. Viết SELECT để xem data sẽ bị ảnh hưởng
   SELECT * FROM users WHERE email LIKE '%@test.com';
   → Verify: đúng 5 records cần xóa

2. Confirm với team (nếu shared env)

3. Thực hiện thay đổi
   DELETE FROM users WHERE email LIKE '%@test.com';
   → Verify: 5 rows affected ✅
```

---

## Tóm tắt chương

| Lệnh | Công dụng | QA dùng khi |
|---|---|---|
| **SELECT** | Đọc data | Verify data, debug bugs |
| **WHERE** | Lọc data | Tìm record cụ thể |
| **JOIN** | Kết nối bảng | Kiểm tra quan hệ data |
| **INSERT** | Thêm data | Tạo test data |
| **UPDATE** | Sửa data | Setup test conditions |
| **DELETE** | Xóa data | Cleanup test data |
| **COUNT/SUM/AVG** | Tổng hợp | Verify calculations, reports |
| **GROUP BY** | Nhóm data | Thống kê, tìm duplicates |
