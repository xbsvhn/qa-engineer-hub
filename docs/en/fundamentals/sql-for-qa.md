# SQL for QA — Talking to the Database

## What is a Database? Imagine a filing cabinet

Before learning SQL, you need to understand what a **database** is. Don't think of it as complicated — imagine you're standing in front of **a giant filing cabinet** in an office.

```
🗄️ FILING CABINET (DATABASE: ecommerce_db)
│
├── 📂 Drawer "users" (TABLE)
│   ├── 📁 File #1: {Name: An, Email: an@mail.com}      ← ROW (1 data record)
│   ├── 📁 File #2: {Name: Binh, Email: binh@mail.com}
│   └── 📁 File #3: {Name: Chi, Email: chi@mail.com}
│
├── 📂 Drawer "products" (TABLE)
│   ├── 📁 File #1: {Product: T-shirt, Price: $20}
│   └── 📁 File #2: {Product: Jeans, Price: $50}
│
└── 📂 Drawer "orders" (TABLE)
    ├── 📁 File #1: {User: An, Total: $70, Status: completed}
    └── 📁 File #2: {User: Binh, Total: $20, Status: pending}
```

Now translated into technical terms:

| Filing cabinet | Database term | Explanation |
|---|---|---|
| **The entire cabinet** | **Database** | Where all of an application's data is stored |
| **One drawer** | **Table** | A group of the same type of data (users, products, orders) |
| **One file folder** | **Row** (record) | A specific record — e.g., one user's information |
| **One item in a folder** | **Column** (field) | One type of information — e.g., name, email, price |
| **Number on the folder** | **Primary Key** (PK) | A unique identifier for each record, never duplicated |
| **Note saying "see also drawer X"** | **Foreign Key** (FK) | A link between 2 tables — e.g., an order with `user_id = 1` means "this order belongs to user #1" |

::: tip Aha moment
A Primary Key is like a national ID number — each person has a unique one, no duplicates. Thanks to this, you can always find exactly the right person.
:::

---

## What is SQL? The language for "talking" to the filing cabinet

**SQL** (Structured Query Language) is the **language you use to give commands to the filing cabinet**.

You can't just open a drawer and rummage through it yourself. You have to **write a command** in SQL, and the database will return the results. Like telling a librarian: "Let me see the file for a user named An" — but in the SQL language.

A few basic "phrases":

| SQL keyword | Plain English | Real-world example |
|---|---|---|
| `SELECT` | "Show me..." | Show me the names and emails of all users |
| `WHERE` | "But only the ones where..." | ...but only the user whose email is an@mail.com |
| `JOIN` | "Combine information from 2 drawers" | Show me user names along with their orders |
| `INSERT` | "Add a new file" | Add a new user named Test User |
| `UPDATE` | "Edit a file" | Change the status of order #1 to completed |
| `DELETE` | "Remove a file" | Delete all test files |

---

## Why does QA need to know SQL?

This is the most important question. Not "how to use SQL" but **"why do I need it"**.

### 1. Verify whether the API is telling the truth

The API returns `"status": "created"` — but has the data **actually** been saved to the database? Or did the API say "done" when it actually isn't?

```
You test an API to create a user → API returns: { "status": "success", "id": 999 }

Question: Does user #999 actually exist in the database?

Open DBeaver, run:
SELECT * FROM users WHERE id = 999;

→ If results appear → API told the truth ✅
→ If nothing comes back → API lied! This is a BUG 🐛
```

### 2. Create test data super fast

Need to test a feature for "VIP user with 100 orders"? You're not going to manually create 100 orders. A single SQL command solves it in 1 second.

### 3. Debug bugs at the data layer

The UI displays something wrong? It could be that the **data in the database was already wrong to begin with**. SQL lets you look straight at the "truth" — the actual data sitting in the database.

::: info Interview reality
About 80% of companies require QA to know basic SQL. Many job descriptions explicitly state "SQL is required." This is not optional knowledge — it's a **must-have**.
:::

---

## SELECT and WHERE — The two commands you'll use most

### SELECT — "Show me..."

```sql
-- The simplest command: see ALL data in the users table
SELECT * FROM users;
```

Breaking down each part:
- `SELECT` — "Show me" (the read data command)
- `*` — "all columns" (the asterisk = wildcard = everything)
- `FROM users` — "from the users table" (which drawer?)

```sql
-- Only see name and email, not everything
SELECT name, email FROM users;
```

Here instead of `*` (everything), you specify exactly: only get the `name` and `email` columns.

```sql
-- Only see the first 10 records (avoid loading millions of rows)
SELECT * FROM users LIMIT 10;
```

`LIMIT 10` = "only show me the first 10." **Always use LIMIT** when you don't know how much data a table has — to avoid a table with 1 million rows loading all at once.

### WHERE — "But only the ones where..."

`WHERE` is the filter. Without `WHERE`, you get **everything**. With `WHERE`, you get **exactly what you need**.

```sql
-- Find a user with a specific email
SELECT * FROM users WHERE email = 'an@mail.com';
```

Explanation: "Show me all information from the users table, **but only** the user whose email equals an@mail.com."

```sql
-- Find users who registered in April 2026
SELECT * FROM users
WHERE created_at >= '2026-04-01'    -- from April 1
  AND created_at < '2026-05-01';    -- up to (but not including) May 1
```

`AND` = "and" — both conditions must be true. The user must have registered **from** April 1 **and** **before** May 1.

```sql
-- Find users whose name contains "Nguyen"
SELECT * FROM users WHERE name LIKE '%Nguyen%';
```

`LIKE` = search by pattern. The `%` sign = "any characters." So `'%Nguyen%'` means "anything + Nguyen + anything" — finds all names containing the word Nguyen.

**Commonly used operators (comparison operations):**

| Operator | Meaning | Example |
|---|---|---|
| `=` | Equals | `status = 'active'` |
| `!=` or `<>` | Not equal | `status != 'deleted'` |
| `>`, `<`, `>=`, `<=` | Greater than, less than | `price > 100000` |
| `LIKE` | Search by pattern | `name LIKE '%nguyen%'` |
| `IN` | In a list | `status IN ('active', 'pending')` |
| `BETWEEN` | Within a range | `price BETWEEN 100 AND 500` |
| `IS NULL` | Has no value | `email IS NULL` |
| `AND` | And (both conditions true) | `age > 18 AND status = 'active'` |
| `OR` | Or (either condition true) | `role = 'admin' OR role = 'manager'` |

### ORDER BY — Sort results

```sql
-- See newest users first (sort by creation date descending)
SELECT * FROM users ORDER BY created_at DESC;
```

- `ORDER BY created_at` = sort by the created_at column
- `DESC` = descending (newest first). The opposite is `ASC` = ascending (oldest first)

### COUNT, SUM, AVG — Count, total, average

```sql
-- Count total number of users
SELECT COUNT(*) FROM users;
-- COUNT(*) = count all rows. Result: a single number, e.g., 1500

-- Count orders by each status
SELECT status, COUNT(*) as total
FROM orders
GROUP BY status;
-- GROUP BY status = group by status, count each group
-- "as total" = name the result column "total" for readability
-- Result: completed: 500, pending: 200, cancelled: 50
```

---

## JOIN — Combining information from 2 tables

This is the **most important** part and also the most confusing. Let's understand the essence first.

**Why do we need JOIN?** Because data is split across multiple tables. The `orders` table only stores `user_id = 1`, not the user's name. To find out "who placed this order?" you need to **combine** the orders table with the users table.

Like this: the "orders" drawer only says "belongs to file #1." To find out "who is file #1?" you need to open the "users" drawer.

### INNER JOIN — Only get data that matches in BOTH tables

```
Users table:                     Orders table:
┌────┬───────┬──────────────┐   ┌────┬─────────┬────────┬───────────┐
│ id │ name  │ email        │   │ id │ user_id │ total  │ status    │
├────┼───────┼──────────────┤   ├────┼─────────┼────────┼───────────┤
│ 1  │ An    │ an@mail.com  │   │ 1  │ 1       │ $50    │ completed │
│ 2  │ Binh  │ binh@mail.com│   │ 2  │ 2       │ $30    │ pending   │
│ 3  │ Chi   │ chi@mail.com │   │ 3  │ 1       │ $20    │ completed │
└────┴───────┴──────────────┘   └────┴─────────┴────────┴───────────┘
                                     ↑
                          user_id points back to id in the users table
```

```sql
-- "Show me user names along with their orders"
SELECT users.name, orders.id as order_id, orders.total, orders.status
FROM orders
INNER JOIN users ON orders.user_id = users.id;
```

Breaking down each line:
- `SELECT users.name, orders.total` — Get the name column from users table, total column from orders table
- `FROM orders` — Start from the orders table
- `INNER JOIN users` — Combine with the users table
- `ON orders.user_id = users.id` — Join condition: user_id in orders **matches** id in users

```
INNER JOIN result:
┌───────┬──────────┬────────┬───────────┐
│ name  │ order_id │ total  │ status    │
├───────┼──────────┼────────┼───────────┤
│ An    │ 1        │ $50    │ completed │  ← An has 2 orders
│ An    │ 3        │ $20    │ completed │
│ Binh  │ 2        │ $30    │ pending   │
└───────┴──────────┴────────┴───────────┘

⚠️  Chi DOES NOT appear — because Chi has no orders
    INNER JOIN only returns rows that MATCH in both tables
```

### LEFT JOIN — Get ALL from the left table, even if there's no match

```sql
-- "Show me ALL users, including those who haven't bought anything"
SELECT users.name, orders.total
FROM users                                    -- LEFT table (get everything)
LEFT JOIN orders ON users.id = orders.user_id; -- RIGHT table (match if possible, NULL if not)
```

```
LEFT JOIN result:
┌───────┬────────┐
│ name  │ total  │
├───────┼────────┤
│ An    │ $50    │
│ An    │ $20    │
│ Binh  │ $30    │
│ Chi   │ NULL   │  ← Chi STILL appears, total = NULL because no orders
└───────┴────────┘
```

::: tip Aha moment
- **INNER JOIN** = "Show me the couples" — only shows those who HAVE a partner on the other side
- **LEFT JOIN** = "Show me everyone on the left side, pair them up if possible, leave blank (NULL) if not"

QA uses LEFT JOIN when looking for **missing data** — for example: "Which users have registered but never made a purchase?"
:::

---

## INSERT / UPDATE / DELETE — Adding, editing, deleting data

### INSERT — Add new data (create test data)

```sql
-- Add 1 test user
INSERT INTO users (name, email, created_at)
VALUES ('Test User', 'testuser@test.com', NOW());
```

Explanation:
- `INSERT INTO users` — Add to the users table
- `(name, email, created_at)` — The columns that will receive data
- `VALUES (...)` — The corresponding values for each column
- `NOW()` — A function that returns the current time

```sql
-- Add multiple users at once (bulk insert)
INSERT INTO users (name, email, created_at) VALUES
  ('User 1', 'user1@test.com', NOW()),
  ('User 2', 'user2@test.com', NOW()),
  ('User 3', 'user3@test.com', NOW());
```

### UPDATE — Edit existing data

```sql
-- Change the status of order #1 to completed
UPDATE orders SET status = 'completed' WHERE id = 1;
```

Explanation:
- `UPDATE orders` — Edit in the orders table
- `SET status = 'completed'` — Set the status column to 'completed'
- `WHERE id = 1` — **ONLY** the row with id = 1

### DELETE — Remove data

```sql
-- Delete all test data (based on email pattern)
DELETE FROM users WHERE email LIKE '%@test.com';
```

Explanation:
- `DELETE FROM users` — Delete from the users table
- `WHERE email LIKE '%@test.com'` — Only delete users whose email ends with @test.com

---

::: danger EXTREMELY IMPORTANT WARNING — UPDATE/DELETE WITHOUT WHERE

This is the **most dangerous mistake** when writing SQL and it happens more often than you think.

**If you forget the WHERE clause, SQL will execute the command on the ENTIRE table.**

```sql
-- ❌ DISASTER: Deletes ALL users in the database!
DELETE FROM users;

-- ❌ DISASTER: Changes ALL orders to completed!
UPDATE orders SET status = 'completed';
```

Imagine: you want to delete 1 test file folder from a drawer, but instead of pulling out 1 folder, you **dump the entire drawer into the trash**. Thousands of real customer files — all gone.

**The correct way — ALWAYS include a WHERE clause:**

```sql
-- ✅ SAFE: Only deletes test data
DELETE FROM users WHERE email LIKE '%@test.com';

-- ✅ SAFE: Only updates 1 specific order
UPDATE orders SET status = 'completed' WHERE id = 1;
```

**Golden rule: Always run SELECT first, then DELETE/UPDATE**

```sql
-- Step 1: PREVIEW what will be affected
SELECT * FROM users WHERE email LIKE '%@test.com';
-- → Result: 3 rows. Those are the 3 test users to delete. OK!

-- Step 2: NOW delete (replace SELECT * with DELETE)
DELETE FROM users WHERE email LIKE '%@test.com';
-- → 3 rows affected. Exactly as expected ✅
```

If step 1 returns 50,000 rows instead of 3 — you know the WHERE clause is wrong and you stop in time!
:::

---

## Real-world use cases where QA uses SQL daily

### 1. Verify data after calling an API

```sql
-- API to create a user returned id = 999. Verify in DB:
SELECT * FROM users WHERE id = 999;
-- Check: are name, email, created_at correct?
```

### 2. Debug bug: UI displays wrong order total

```sql
-- UI says user #456 has total orders = 0. Check the reality:
SELECT COUNT(*) as order_count, SUM(total) as total_amount
FROM orders
WHERE user_id = 456 AND status = 'completed';
-- Finding: orders are in status = 'pending', so completed total = 0
-- → Bug is in the status update logic, not a UI bug
```

### 3. Create test data quickly

```sql
-- Create a VIP user + orders for testing
INSERT INTO users (name, email, role, created_at)
VALUES ('VIP Tester', 'vip@test.com', 'vip', NOW());

INSERT INTO orders (user_id, total, status, created_at)
VALUES
  ((SELECT id FROM users WHERE email = 'vip@test.com'), 500000, 'completed', NOW()),
  ((SELECT id FROM users WHERE email = 'vip@test.com'), 300000, 'pending', NOW());
```

### 4. Find duplicate data

```sql
-- Find which emails are duplicated — this is a data integrity bug
SELECT email, COUNT(*) as occurrences
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
-- GROUP BY email = group by email
-- HAVING COUNT(*) > 1 = only show groups with more than 1 record (duplicates)
```

### 5. Find orphan data

```sql
-- Find orders with user_id pointing to a user that doesn't exist
SELECT orders.*
FROM orders
LEFT JOIN users ON orders.user_id = users.id
WHERE users.id IS NULL;
-- LEFT JOIN keeps all orders
-- WHERE users.id IS NULL = filter orders where the user on the other side doesn't exist
-- If there are results → data integrity is broken!
```

### 6. Clean up test data after testing

```sql
-- Step 1: PREVIEW first (golden rule!)
SELECT * FROM users WHERE email LIKE '%@test.com';

-- Step 2: Delete orders of test users first (because orders depend on users)
DELETE FROM orders WHERE user_id IN (
  SELECT id FROM users WHERE email LIKE '%@test.com'
);

-- Step 3: Delete test users
DELETE FROM users WHERE email LIKE '%@test.com';
```

---

## Recommended Tool: DBeaver

To run SQL, you need a **database client** — software that connects to the database and lets you write SQL.

| Tool | Price | Notes |
|---|---|---|
| **DBeaver** | Free | Supports all DB types (MySQL, PostgreSQL, SQL Server...). Friendly interface, has SQL auto-complete. **Recommended for QA.** |
| MySQL Workbench | Free | Only for MySQL |
| pgAdmin | Free | Only for PostgreSQL |
| DataGrip | Paid | By JetBrains, very powerful but costs money |

::: tip Why DBeaver?
DBeaver is the best choice for QA because: it's free, supports nearly every type of database, has an intuitive interface, provides auto-complete to help you write SQL faster, and has a large community so it's easy to find help when you get stuck.
:::

---

## Chapter Summary

| Command | Like saying... | QA uses it when |
|---|---|---|
| `SELECT` | "Show me..." | Verifying data, debugging bugs |
| `WHERE` | "But only the ones where..." | Filtering to the exact record needed |
| `JOIN` | "Combine 2 drawers" | Checking relationships between tables |
| `INSERT` | "Add a new file" | Creating test data |
| `UPDATE` | "Edit a file" (ALWAYS with WHERE!) | Setting up test conditions |
| `DELETE` | "Remove a file" (ALWAYS with WHERE!) | Cleaning up test data |
| `COUNT/SUM` | "Count/total it up for me" | Verifying calculations |
| `GROUP BY` | "Group by..." | Statistics, finding duplicates |

::: warning Most important takeaway
**Before any UPDATE or DELETE — ALWAYS run a SELECT with the same WHERE clause first.** Check if the results look right, then proceed. A single wrong SQL command can destroy data beyond recovery.
:::
