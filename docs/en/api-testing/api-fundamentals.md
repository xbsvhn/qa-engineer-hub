# API Fundamentals

## What is an API? — Imagine you are dining at a restaurant

You walk into a restaurant. You **never** go into the kitchen and cook yourself. Instead:

```
You (Client)  →  Waiter (API)  →  Kitchen (Server)
  order food      takes order      cooks food
                  brings it back   returns dish
```

The **waiter** is the **API** (Application Programming Interface). The waiter is the intermediary who:
- Receives your **request** (request)
- Passes it to the **kitchen** for processing (server)
- Brings the **result** back to you (response)

You don't need to know how the kitchen cooks or what ingredients it uses. You only need to know: **order the right dish, receive the right food**.

:::tip Aha Moment
An API is the "waiter" between software systems. The Grab app calls the Google Maps API to display a map — Grab doesn't need to know how Google Maps processes maps, it just sends coordinates and receives a map image back.
:::

### In real-world software

```
Mobile App ──────┐
                 │
Web Browser ─────┼──► API Server ──► Database
                 │
Partner System ──┘
```

Many different "customers" (mobile app, web, partners) all call the same **API Server** — just like many tables in a restaurant all order from the same team of waiters.

**Real-world examples:**
- The **Grab** app calls the **Google Maps** API to display maps
- An e-commerce website calls the **VNPay** API to process payments
- A React frontend calls the Backend API to fetch a product list

### Why do QAs need to test APIs?

| Reason | Explained with the restaurant analogy |
|---|---|
| **Faster than UI testing** | Checking the dish in the kitchen (API) is faster than waiting for the waiter to bring it to the table (UI) |
| **More stable** | The kitchen still cooks well even if the restaurant remodels its furniture (UI changes) |
| **Catches bugs earlier** | Taste-testing in the kitchen before serving to customers |
| **Deeper coverage** | You can check ingredients and seasoning — things customers don't see on the table |
| **Required in Agile** | Backend is done first → QA tests API → in parallel with UI development |

**In practice:** In Agile projects, about 60-70% of bugs are found at the API layer, only about 30% at the UI layer.

---

## HTTP — The language Client and Server speak to each other

### What is HTTP?

Back to the restaurant: you speak a language to order food, the waiter understands and relays it to the kitchen. **HTTP** (HyperText Transfer Protocol) is the **common language** that clients and servers use to communicate over the internet.

Every interaction follows a simple pattern: **you ask (Request), the kitchen answers (Response)**.

```
Client (Browser/App)                    Server (API)
┌─────────────────┐                    ┌─────────────────┐
│                 │ ── HTTP Request ──► │                 │
│  Sends request  │                    │ Processes request│
│                 │ ◄── HTTP Response ─ │ Returns result  │
└─────────────────┘                    └─────────────────┘
```

### Request structure — Your "order form"

When you order at a restaurant, your order usually has:
- **What do you want?** (new dish, cancel, change) → **Method**
- **Which restaurant, which table?** → **URL** (Uniform Resource Locator — resource address)
- **Special instructions** (no spice, extra ice) → **Headers** (additional information)
- **Dish details** (chicken rice, sauce on the side) → **Body** (data sent along)

```
POST /api/users HTTP/1.1              ← Method + URL: "I want to create a new user"
Host: api.example.com                 ← Headers: which restaurant
Content-Type: application/json        ← Headers: I'm sending data in JSON format
Authorization: Bearer eyJhbGci...     ← Headers: this is my entry pass
                                      ← Blank line separating headers and body
{                                     ← Body: details of the "dish" I want
  "name": "Nguyen Van An",
  "email": "an@mail.com"
}
```

| Component | Restaurant analogy | API example |
|---|---|---|
| **Method** | Order / cancel / change a dish | GET, POST, PUT, DELETE |
| **URL** | Restaurant address + table number | `/api/users/123` |
| **Headers** | "No spice", "extra ice" | Content-Type, Authorization |
| **Body** | Details: "chicken rice, sauce on the side" | JSON data |

### Response structure — The "food" the kitchen brings out

```
HTTP/1.1 200 OK                       ← Status: "Order successful!"
Content-Type: application/json        ← Headers: "food" is in JSON format
X-Request-Id: abc123                  ← Headers: order tracking code
                                      ← Blank line
{                                     ← Body: here is your "food"
  "id": 1,
  "name": "Nguyen Van An",
  "email": "an@mail.com",
  "created_at": "2026-04-26T10:00:00Z"
}
```

| Component | Meaning | QA needs to verify |
|---|---|---|
| **Status Code** | Result: success or error? | 200 OK? 404 Not Found? 500 Error? |
| **Headers** | Additional information about the response | Is Content-Type correct? Are there cache headers? |
| **Body** | Data returned | Is the data correct? Is the format right? Are all fields present? |

---

## Types of APIs — REST, GraphQL, SOAP

Imagine 3 different types of restaurants:

### 1. REST API — Fixed menu (most common, about 90%)

**REST** (Representational State Transfer) is like a restaurant with a **fixed menu**. Each dish has a clear name, price, and description. You order "Pho" and you get a full bowl of pho — nothing more, nothing less.

| Feature | Details |
|---|---|
| **Format** | JSON (primarily) — easy-to-read text-based data |
| **Architecture** | Resource-based — each URL represents one "dish" (resource) |
| **Stateless** | The server doesn't remember who you are between calls — each request must re-introduce itself |

```
REST API URLs — each URL is a "dish" on the menu:
GET    /api/users          → View user list (browse the menu)
GET    /api/users/123      → View user with id=123 (view details of one dish)
POST   /api/users          → Create a new user (place an order)
PUT    /api/users/123      → Replace all info for user 123
PATCH  /api/users/123      → Modify part of user 123's info
DELETE /api/users/123      → Delete user 123 (cancel an order)
```

### 2. GraphQL — Custom ordering

**GraphQL** is like a restaurant that lets you **customize every detail**: "I want chicken rice, but **no** fish sauce, **add** vegetables, **remove** cucumber". You only receive **exactly what you asked for**, nothing more, nothing less.

```graphql
# REST: GET /api/users/123 → returns ALL fields (may include extra data)
# Like ordering a "combo" — you get a soda even if you don't drink it

# GraphQL: Only get name and email — nothing extra
query {
  user(id: 123) {
    name
    email
  }
}
# Response: { "name": "An", "email": "an@mail.com" }
# Only the 2 fields you need! No extra fields.
```

| Feature | Details |
|---|---|
| **Single endpoint** | Only 1 URL (usually `/graphql`) — like a single order counter that handles all requests |
| **No over-fetching** | No extra data fetched — saves bandwidth |
| **Used by** | Facebook, GitHub, Shopify |

### 3. SOAP — Formal banquet with a dress code

**SOAP** (Simple Object Access Protocol) is like a **formal banquet**: strict dress code, must use the correct XML format, must declare the proper schema. Very "heavyweight" but very "official".

| Feature | Details |
|---|---|
| **Mandatory format** | XML — an older, verbose format |
| **Complex** | WSDL, XML Schema, Envelope — lots of "formalities" |
| **Used by** | Enterprise legacy: banking, insurance, government |

### Comparing the 3 API types

| | REST | GraphQL | SOAP |
|---|---|---|---|
| **Analogy** | Fixed menu | Custom ordering | Formal banquet |
| **Format** | JSON | JSON | XML |
| **Learning curve** | Low | Medium | High |
| **Flexibility** | Medium | High | Low |
| **Performance** | Good | Very good (no over-fetch) | Slow (verbose XML) |
| **Tools** | Postman, Playwright | GraphQL Playground, Postman | SoapUI |

:::tip Aha Moment
90% of the time you will test REST APIs. GraphQL is growing. SOAP is only found in legacy projects (older systems). Focus on learning REST first!
:::

---

## JSON — The order slip

### What is JSON?

When you order food, the waiter writes the order on a slip. In the API world, that "order slip" is **JSON** (JavaScript Object Notation). JSON is the most popular **data exchange format** — lightweight, easy to read, easy to process.

### Syntax — Simply key:value pairs

JSON is written in **key:value** format, like labels on a food container:

```json
{
  "string": "Hello World",       // Text — always enclosed in ""
  "number": 42,                  // Integer — no "" needed
  "decimal": 3.14,               // Decimal number
  "boolean": true,               // True/False — only true or false
  "null_value": null,            // Empty — no value
  "array": [1, 2, 3],           // List — multiple values inside []
  "object": {                    // Nested object — {} inside {}
    "nested": "value"
  }
}
```

:::tip Aha Moment
JSON is like **labels on a food container**: `"dish_name": "Pho"`, `"price": 50000`, `"spicy": true`. Each piece of information is a **key:value** pair. The key is on the left of `:`, the value is on the right.
:::

### Real-world example — API returning user information

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

### What should QA verify in a JSON Response?

| What to check | Example | Analogy |
|---|---|---|
| **Structure** | Are all fields present? | Check if the pho bowl has all the meat, herbs, and broth |
| **Data types** | `id` must be a number, `name` must be a string | Meat must be meat, vegetables must be vegetables |
| **Values** | Is the email format correct? Is the number positive? | The dish must taste like what was ordered |
| **Null handling** | Which fields are allowed to be null? | Which dishes might be out of stock? |
| **Array** | Correct number of elements? Does each element have all fields? | Does the combo set have all 3 dishes? |
| **Nested objects** | Is the child object's structure correct? | Is the dipping sauce in the pho the right kind? |

---

## Authentication — "Who are you?" (The festival wristband)

### Imagine you are going to a music festival

You buy a ticket → arrive at the gate → staff checks your ticket → they put a **wristband** on you. From then on, you just **show your wristband** to enter any area — no need to buy a ticket again.

In APIs, that **wristband** is the **Bearer Token** (authentication code). The flow works exactly the same:

```
Step 1: "Buy a ticket" — Login to get a token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/login
Body: { "email": "an@mail.com", "password": "Pass@123" }

→ Server verifies email + password
→ Response: { "token": "eyJhbGciOiJIUzI1NiIs..." }
  (This is your "wristband")

Step 2: "Show your wristband" — Send the token with every subsequent request
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET /api/users/me
Headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..." }

→ Server checks token → valid → returns data
→ Response: { "name": "An", "email": "an@mail.com" }

Step 3: Token expires — "Wristband" is no longer valid
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET /api/users/me (with an old/expired token)
→ Response: 401 Unauthorized — "Your wristband has expired, please get a new one"
```

:::tip Aha Moment
A Bearer Token is like a **festival wristband**: log in once → receive a token → use that token for every subsequent request. When the token expires (like a wristband expiring at the end of the day), you must log in again to get a new token.
:::

### Common Authentication methods

| Method | Real-world analogy | When to use |
|---|---|---|
| **API Key** | A gym membership code — one unique code, anyone with it can enter | Simple APIs, third-party |
| **Basic Auth** | Username + Password every time you enter | Legacy systems |
| **Bearer Token (JWT)** | Festival wristband — log in once, use many times | Modern apps (about 80% today) |
| **OAuth 2.0** | Login with Google/Facebook — a third party confirms your identity | Social login |

### Authorization — "What are you allowed to do?"

Authentication (Authn) = verifying **who you are** (checking the ticket). Authorization (Authz) = checking **which areas you can enter** (VIP or standard).

```
Admin user (VIP ticket):
  GET  /api/users     → 200 OK (has permission to view all users)
  DELETE /api/users/5  → 200 OK (has permission to delete a user)

Normal user (standard ticket):
  GET  /api/users     → 403 Forbidden (no permission to view all users)
  DELETE /api/users/5  → 403 Forbidden (no permission to delete)
  GET  /api/users/me  → 200 OK (can only view their own information)
```

**QA should test Authorization by checking:**
- Can a user with role A access an endpoint for role B? (Expected: 403 Forbidden)
- Can a user view/edit/delete another user's data? (Expected: 403)
- What happens when a token expires? (Expected: 401 Unauthorized)

---

## Swagger — The "menu" of the API restaurant

### What is Swagger?

A restaurant has a **menu** so you know what dishes are available, how much they cost, and what they contain. APIs also have a "menu" — that is **Swagger** (or **OpenAPI**). Swagger UI is a web page that displays all API endpoints, helping you:

- See all available "dishes" (endpoints)
- Know what to send (request format: which fields are required, what data types)
- Know what you will receive (response format: status codes, response body)
- **Try it out** — call the API directly from the Swagger page (like taste-testing!)

```
Common Swagger UI URLs:
https://api.example.com/swagger
https://api.example.com/docs
https://api.example.com/api-docs
```

### How to read Swagger — Like reading a restaurant menu

```yaml
# This is the "dish description" in the API menu
POST /api/users:                    # Endpoint: "order to create a new user"
  summary: Create a new user        # Short description
  requestBody:                      # What do you need to send?
    required: true                  # Body is mandatory
    content:
      application/json:             # Format: JSON
        schema:
          type: object
          required: [name, email, password]  # 3 required fields!
          properties:
            name:
              type: string          # name must be text
              maxLength: 100        # maximum 100 characters
            email:
              type: string
              format: email         # must be a valid email format
            password:
              type: string
              minLength: 8          # minimum 8 characters
  responses:                        # What might the kitchen return?
    201:
      description: User created successfully    # Success
    400:
      description: Validation error             # Bad data sent
    409:
      description: Email already exists         # Duplicate email
```

:::tip Aha Moment
From the API doc (Swagger) above, a QA immediately knows what to test:
- POST with valid data → 201 (success)
- POST missing `name` → 400 (missing required field)
- POST with wrong email format → 400 (invalid format)
- POST with password < 8 characters → 400 (too short)
- POST with an already existing email → 409 (duplicate)

**Swagger is the primary source for writing test cases!**
:::

---

## Chapter Summary

| Concept | Essence | Key Point |
|---|---|---|
| **API** | Restaurant waiter — intermediary between client and server | Faster and more stable testing than UI |
| **HTTP** | Communication language between client and server | Request (Method+URL+Headers+Body) → Response (Status+Body) |
| **REST** | Fixed menu — each URL is a resource | Most common, uses JSON, about 90% of APIs |
| **GraphQL** | Custom ordering — get exactly the data you need | 1 endpoint, no over-fetching |
| **SOAP** | Formal banquet — mandatory XML, complex | Legacy systems (banking, insurance) |
| **JSON** | The order slip — key:value format | Verify structure + types + values |
| **Authentication** | Festival wristband — log in once, use many times | Bearer Token/JWT is most common |
| **Authorization** | VIP vs standard ticket — who enters which area | Test role-based access, permission boundaries |
| **Swagger** | Restaurant menu — lists all API "dishes" | Primary source for writing test cases |
