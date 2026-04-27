# REST API Testing

## HTTP Methods — 5 basic actions in the restaurant

Back to our familiar restaurant. When you sit at a table, you can only do **5 things**:

| Restaurant action | HTTP Method | CRUD | Meaning |
|---|---|---|---|
| **View the menu** — read the dish list | **GET** | Read | Retrieve data, changes nothing |
| **Place a new order** — add an order | **POST** | Create | Create a new resource |
| **Rewrite the entire order** — start from scratch | **PUT** | Update (full) | Replace the entire resource |
| **Modify one dish** — "add chili to the pho" | **PATCH** | Update (partial) | Modify part of a resource |
| **Cancel a dish** — don't want it anymore | **DELETE** | Delete | Remove a resource |

**CRUD** (Create-Read-Update-Delete) represents the 4 basic data operations — POST creates, GET reads, PUT/PATCH updates, DELETE removes.

### Idempotent — Same result when called multiple times?

**Idempotent** means calling once or 100 times produces **the same result**:

- `GET /users/1` called 10 times → always returns the same user → **Idempotent**
- `POST /users` called 10 times → creates **10 different users** → **Not idempotent**
- `DELETE /users/1` called 10 times → first call deletes successfully, subsequent calls return 404 (already deleted) → **Idempotent** (the user is still deleted, the state hasn't changed)

:::tip Aha Moment
Why does knowing about idempotency matter? Because the network may retry a request on timeout. If `POST /orders` gets retried → 2 duplicate orders are created! That's a bug. QA should test: "Call POST twice in a row with the same data → does it create duplicates?"
:::

### Real-world example — User API

```
# GET — View the menu (read the user list)
# Like: "Show me page 1 of the menu, 10 items per page"
GET /api/users?page=1&limit=10&sort=name
Response 200:
{
  "data": [
    { "id": 1, "name": "An", "email": "an@mail.com" },
    { "id": 2, "name": "Binh", "email": "binh@mail.com" }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 50 }
}

# GET — View details of one dish (get a specific user)
GET /api/users/1
Response 200:
{ "id": 1, "name": "An", "email": "an@mail.com", "role": "admin" }

# POST — Place a new order (create a user)
# Like: "I'd like to add a new item to my order"
POST /api/users
Body: { "name": "Chi", "email": "chi@mail.com", "password": "Pass@123" }
Response 201:
{ "id": 3, "name": "Chi", "email": "chi@mail.com" }

# PUT — Rewrite the entire order
PUT /api/users/3
Body: { "name": "Chi Updated", "email": "chi.new@mail.com", "role": "vip" }
Response 200:
{ "id": 3, "name": "Chi Updated", "email": "chi.new@mail.com", "role": "vip" }

# PATCH — Modify one small detail ("add chili to the pho")
PATCH /api/users/3
Body: { "name": "Chi Final" }
Response 200:
{ "id": 3, "name": "Chi Final", "email": "chi.new@mail.com", "role": "vip" }

# DELETE — Cancel a dish
DELETE /api/users/3
Response 204 (No Content — deleted successfully, no body returned)
```

---

## PUT vs PATCH — Rewriting the entire letter vs Fixing one word with white-out

This is the point **most people confuse**. Imagine:

- **PUT** = you rewrite **the entire letter**. Anything you don't rewrite → **is gone**.
- **PATCH** = you use **white-out** to fix **one word**. Everything else → **stays the same**.

```
Current user in the database:
{ "name": "An", "email": "an@mail.com", "role": "admin" }

━━━ PUT: Rewrite everything ━━━
PUT /api/users/1
Body: { "name": "An Updated" }
                              ↓ ONLY name sent, email and role NOT sent
Result: { "name": "An Updated", "email": null, "role": null }
         ⚠️ email and role are LOST because PUT replaces EVERYTHING!

━━━ PATCH: Fix one detail ━━━
PATCH /api/users/1
Body: { "name": "An Updated" }
                              ↓ ONLY name sent
Result: { "name": "An Updated", "email": "an@mail.com", "role": "admin" }
         ✅ email and role are STILL THERE because PATCH only modifies the fields sent!
```

:::tip Aha Moment
**Data loss with PUT** is a common bug! QA should test: "Send PUT with only 1 field → do the other fields become null/disappear?". If the API is poorly designed, PUT can wipe out data that developers didn't anticipate.
:::

---

## HTTP Status Codes — How does the kitchen respond?

Status codes are like responses from the kitchen. They are divided into 3 main groups:

### 2xx — Success ("Order complete!")

Everything is OK, you received your food.

| Code | Name | Meaning | When |
|---|---|---|---|
| **200** | OK | Success | Successful GET, PUT, PATCH |
| **201** | Created | Successfully created | POST creates a new resource |
| **204** | No Content | Success but no body returned | Successful DELETE |

### 3xx — Redirect ("The restaurant has moved!")

You arrive at the old restaurant and staff says: "We've moved to a new address."

| Code | Name | Meaning |
|---|---|---|
| **301** | Moved Permanently | URL has permanently changed — update your bookmarks |
| **302** | Found | Temporary redirect — the old URL still works |
| **304** | Not Modified | Data hasn't changed — use the cache for speed |

### 4xx — Client error ("You ordered wrong!")

You ordered a dish that's not on the menu, gave the wrong table number, forgot to bring your VIP pass...

| Code | Name | Real-world analogy | API example |
|---|---|---|---|
| **400** | Bad Request | Ordering but speaking unclearly | Body missing a required field, wrong data type |
| **401** | Unauthorized | Forgot to bring your entry ticket | Token expired, no token sent |
| **403** | Forbidden | Have a standard ticket but demanding VIP access | Regular user calling an admin API |
| **404** | Not Found | Ordering "Japanese Pho" — not on the menu | GET /api/users/99999 |
| **405** | Method Not Allowed | Want to cancel a dish but kitchen says "this dish can't be cancelled" | DELETE on an endpoint that only supports GET |
| **409** | Conflict | Reserving a table that's already taken | Email already exists |
| **422** | Unprocessable Entity | Ordering "Pho" but requesting "no broth, no beef" — makes no sense | Invalid email format |
| **429** | Too Many Requests | Calling the waiter 100 times in 1 minute | Too many API calls — rate limited |

### 5xx — Server error ("The kitchen is on fire!")

You ordered correctly, but the kitchen had an incident. **This is always the server's fault**, not yours.

| Code | Name | Real-world analogy | QA action |
|---|---|---|---|
| **500** | Internal Server Error | Kitchen fire with unknown cause | **Log a bug!** Server should not return 500 |
| **502** | Bad Gateway | Restaurant ordered ingredients from the market but the market is closed | Could be an infra issue |
| **503** | Service Unavailable | Kitchen is overloaded, not accepting more orders | Test performance |
| **504** | Gateway Timeout | Waited too long for ingredients from the market | Check API response time |

::: warning Golden Rule for QA
- **4xx** = Client sent something wrong → needs a **clear error message** so the client knows how to fix it
- **5xx** = Server error → **always a bug** (the server must handle all inputs)
- If you send bad input and receive **500** instead of 400/422 → **Definitely a BUG!** The server must validate input and return an appropriate error
:::

---

## Headers — "Special notes" on the order form

Headers are **metadata** — additional information that accompanies a request/response. Like notes on an order form: "no spice", "to go", "pay by card".

### Important Request Headers

| Header | Like a note | Example |
|---|---|---|
| **Content-Type** | "The order is written in Vietnamese" — the format of the body | `application/json` |
| **Authorization** | "Here is my VIP pass" — authentication token | `Bearer eyJhbGci...` |
| **Accept** | "I want the receipt in English" — desired response format | `application/json` |
| **Accept-Language** | "Reply to me in Vietnamese" | `vi-VN`, `en-US` |
| **X-Request-Id** | "Order tracking code" — used to trace the request | `uuid-abc-123` |

### Important Response Headers

| Header | Meaning | QA needs to verify |
|---|---|---|
| **Content-Type** | Format of the response | Must be `application/json` |
| **X-RateLimit-Remaining** | Number of requests left before being blocked | Is rate limiting working? |
| **Cache-Control** | Caching policy (temporarily storing results) | Sensitive data should not be cached! |
| **Set-Cookie** | Cookies sent to the client | Are HttpOnly and Secure flags set? (security) |

---

## API Testing Checklist — Complete verification list

### Functional Testing

**Positive — Happy Path (everything correct):**
- [ ] GET returns the correct data
- [ ] POST creates successfully, returns 201
- [ ] PUT/PATCH updates correctly
- [ ] DELETE removes successfully
- [ ] Pagination works: page, limit, offset
- [ ] Sorting works: asc, desc
- [ ] Filtering works: query params
- [ ] Search works

**Negative — Error Handling (what if you send something wrong?):**
- [ ] Request missing a required field → 400 + clear error message
- [ ] Wrong data type (string instead of number) → 400
- [ ] Non-existent ID → 404
- [ ] No token sent → 401
- [ ] Expired token → 401
- [ ] Insufficient permissions → 403
- [ ] Duplicate data → 409
- [ ] Invalid format (bad email, phone) → 422
- [ ] Body too large → 413
- [ ] Too many requests → 429

### Security Testing

- [ ] **SQL injection:** `"name": "'; DROP TABLE users; --"` → must not crash
- [ ] **XSS:** `"name": "<script>alert('xss')</script>"` → must be escaped
- [ ] **IDOR:** User A accesses User B's data via API → must be blocked (403)
- [ ] **Broken auth:** Calling API without a token → must be blocked (401)
- [ ] **Sensitive data:** Password **must not** be returned in the response
- [ ] **HTTPS:** Does the API enforce HTTPS? (no HTTP allowed)

:::tip Aha Moment
**IDOR** (Insecure Direct Object Reference) is the most common API security flaw: User A changes the ID in the URL from `/users/1` (their own) to `/users/2` (someone else's) → if the server returns user 2's data → that's a **critical security bug!**
:::

### Performance Testing

- [ ] Response time < 200ms (simple queries)
- [ ] Response time < 2s (complex queries)
- [ ] Pagination works (not loading all data at once)
- [ ] Payload size (response size) is reasonable

### Data Integrity

- [ ] Created via API → verify in the database is correct
- [ ] Updated via API → verify data changed accurately
- [ ] Deleted via API → verify data is actually removed
- [ ] Concurrent requests (multiple requests at the same time) → no race conditions

---

## Example Test Cases for User API

### Test Matrix — Test scenario table

| # | Scenario | Method | URL | Body | Expected |
|---|---|---|---|---|---|
| 1 | Get user list | GET | /api/users | - | 200, array of users |
| 2 | Get user by ID | GET | /api/users/1 | - | 200, user object |
| 3 | Non-existent user | GET | /api/users/9999 | - | 404 |
| 4 | Create valid user | POST | /api/users | valid data | 201, user with id |
| 5 | Create missing name | POST | /api/users | missing name | 400, error message |
| 6 | Email already exists | POST | /api/users | existing email | 409 |
| 7 | Invalid email format | POST | /api/users | bad email | 422 |
| 8 | Full update | PUT | /api/users/1 | full data | 200, updated user |
| 9 | Partial update | PATCH | /api/users/1 | partial data | 200, merged data |
| 10 | Delete user | DELETE | /api/users/1 | - | 204 |
| 11 | Delete already deleted user | DELETE | /api/users/1 | - | 404 |
| 12 | No auth token | GET | /api/users | - | 401 |
| 13 | Invalid token | GET | /api/users | - | 401 |
| 14 | Regular user calls admin API | GET | /api/admin/users | - | 403 |
| 15 | SQL injection in name | POST | /api/users | malicious | 400 (NOT 500!) |

---

## Chapter Summary

| Concept | Essence | Key Point |
|---|---|---|
| **HTTP Methods** | 5 actions in the restaurant | GET=View menu, POST=Place order, PUT=Rewrite order, PATCH=Fix one detail, DELETE=Cancel |
| **PUT vs PATCH** | Rewriting the letter vs Fixing one word with white-out | PUT replaces everything (beware of data loss!), PATCH only modifies the fields sent |
| **Status Codes** | Responses from the kitchen | 2xx=OK, 4xx=Your mistake, 5xx=Kitchen error (always a bug) |
| **Headers** | Special notes on the order form | Content-Type, Authorization, Rate Limit |
| **Testing Checklist** | Comprehensive verification | Positive + Negative + Security + Performance + Data Integrity |
