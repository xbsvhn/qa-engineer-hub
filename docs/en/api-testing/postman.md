# Postman

## What is Postman? — The phone that calls APIs

Imagine you want to order food from a restaurant. You need a **phone** to call. **Postman** is that phone — it helps you **send requests to APIs** and view the results, **without writing any code**.

You simply:
1. Choose the **phone number** (the API's URL)
2. Say **what you want** (Method: GET, POST, PUT, DELETE)
3. Attach **details** if needed (Body, Headers)
4. Press **Send** (pick up the phone and call)
5. View the **result** returned (Response)

### Why use Postman?

| Reason | Analogy | Details |
|---|---|---|
| **No code needed** | Using a phone instead of walking to the restaurant yourself | Visual GUI, drag and drop |
| **Fast** | Press call → hear the answer immediately | Send a request, see the response instantly |
| **Storage** | Phone contacts | Organize requests into Collections |
| **Sharing** | Share contacts with coworkers | Share collections with the team |
| **Automation** | Auto-dial on a schedule | Write tests, run Collection Runner |
| **Free** | Free tier is sufficient | Just create an account |

---

## Postman Interface — Your "phone"

```
┌─────────────────────────────────────────────────────────────┐
│  Collections │          Request Builder                      │
│  (Contacts)  │  ┌─────────────────────────────────────────┐ │
│  ├── Auth    │  │ [POST ▼] https://api.example.com/users  │ │
│  │  ├── Login│  │ (Method)  (URL — "phone number")  [Send]│ │
│  │  └── ...  │  ├─────────────────────────────────────────┤ │
│  ├── Users   │  │ Params │ Auth │ Headers │ Body │ Tests  │ │
│  │  ├── GET  │  │ (Tabs for configuring request details)  │ │
│  │  ├── POST │  │                                         │ │
│  │  └── ...  │  │ Body (raw - JSON):                      │ │
│  └── Orders  │  │ {                                       │ │
│              │  │   "name": "Test User",                  │ │
│  Environments│  │   "email": "test@mail.com"              │ │
│  (Speed Dial)│  │ }                                       │ │
│  ├── Dev     │  ├─────────────────────────────────────────┤ │
│  ├── Staging │  │ Response:    Status: 201    Time: 120ms │ │
│  └── Prod    │  │ (Result returned from the kitchen)      │ │
│              │  │ {                                       │ │
│              │  │   "id": 1,                              │ │
│              │  │   "name": "Test User"                   │ │
│              │  │ }                                       │ │
│              │  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **Collections** (left panel) = **Contacts** — where all created API requests are saved
- **Request Builder** (right panel) = **Call screen** — where you compose and send requests
- **Response** (bottom) = **Call result** — what the server returned

---

## Sending Your First Request — Try "picking up the phone"

### GET Request — "View the menu"

```
Method: GET                                    ← Want to READ data
URL: https://jsonplaceholder.typicode.com/users/1  ← API "phone number"
Headers: (not needed)                           ← GET usually doesn't need headers
Body: (not needed)                              ← GET doesn't send a body

→ Click Send                                   ← Pick up the phone and call!

Response (200 OK):                             ← "Kitchen answers: here is user #1"
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz"
}
```

### POST Request — "Place a new order"

```
Method: POST                                   ← Want to CREATE NEW
URL: https://jsonplaceholder.typicode.com/users    ← Endpoint to create a user
Headers:
  Content-Type: application/json               ← "I'm sending data in JSON format"
Body (raw - JSON):                             ← Details of the "dish" to create
{
  "name": "Test User",
  "email": "test@mail.com",
  "phone": "0901234567"
}

→ Click Send

Response (201 Created):                        ← "Kitchen confirms: new user created!"
{
  "id": 11,
  "name": "Test User",
  "email": "test@mail.com"
}
```

:::tip Aha Moment
**jsonplaceholder.typicode.com** is a free API for practice. No token needed, no registration required. Open Postman right now and try sending GET `https://jsonplaceholder.typicode.com/users` — you'll see a list of 10 users!
:::

---

## Environments — Speed Dial for each restaurant

### The Problem

You have 3 restaurants (environments): Dev, Staging, Production. Each restaurant has a **different phone number (URL)**. You don't want to create 3 identical sets of requests that only differ by URL.

### The Solution: Environment Variables

Like **speed dial** on a phone. Instead of memorizing each number, you save:
- Key 1 = Dev restaurant
- Key 2 = Staging restaurant
- Key 3 = Production restaurant

**Creating Environments in Postman:**

```
[Dev Environment]           ← "Dev restaurant"
base_url = http://localhost:3000
api_key = dev-key-123

[Staging Environment]       ← "Staging restaurant"
base_url = https://staging-api.example.com
api_key = staging-key-456

[Production Environment]    ← "Production restaurant"
base_url = https://api.example.com
api_key = prod-key-789
```

**Using in a Request — Replace hardcoded URLs with variables:**

```
# Instead of hardcoding:
URL: https://staging-api.example.com/api/users

# Use variables:
URL: {{base_url}}/api/users
Headers:
  X-API-Key: {{api_key}}
```

Just **switch the environment** in the dropdown at the top right → all requests automatically change their URL. No need to edit each request!

:::tip Aha Moment
`{{base_url}}` is Postman's variable syntax. Double curly braces `{{ }}` wrap the variable name. Postman automatically replaces the variable with the corresponding value for the environment you selected. Like mail merge in Word: "Dear {{customer_name}}" → "Dear Nguyen Van An".
:::

### Commonly used variables

| Variable | Example | Purpose |
|---|---|---|
| `{{base_url}}` | `https://staging.example.com` | Base URL per environment |
| `{{token}}` | `eyJhbGci...` | Auth token (obtained from login response) |
| `{{user_id}}` | `123` | ID created from a previous request |
| `{{api_key}}` | `key-abc` | API key per environment |

---

## Tests — Checking the "food" when it arrives

When the waiter brings your food, you check:
- Is it the right dish? (status code)
- Is the portion complete? (response body)
- Was it delivered quickly? (response time)
- Is the plate clean? (headers)

This is the **most important part** — it turns Postman from a "request-sending tool" into an "automation tool". Tests are written in the **Tests** tab using JavaScript.

### Checking Status Code — "Is it the right dish?"

```javascript
// Check that status code is 200
pm.test("Status code is 200", () => {
  // pm.response = the response received from the server
  // .to.have.status(200) = must have status code 200
  pm.response.to.have.status(200);
});

// Or check it falls within the 2xx range (any 200-299)
pm.test("Status code is 2xx", () => {
  // pm.expect() = assertion function (checks a condition)
  // pm.response.code = the status code number
  // .to.be.within(200, 299) = must be between 200 and 299
  pm.expect(pm.response.code).to.be.within(200, 299);
});
```

### Checking Response Body — "Is the portion complete?"

```javascript
pm.test("Response has correct user data", () => {
  // Convert response body from text to a JSON object
  const json = pm.response.json();

  // Check that the "name" field equals "Test User"
  pm.expect(json.name).to.eql("Test User");

  // Check that the "email" field contains the "@" character
  pm.expect(json.email).to.include("@");

  // Check that the "id" field is of type number
  pm.expect(json.id).to.be.a("number");
});
```

### Checking Response Time — "Was it delivered quickly?"

```javascript
pm.test("Response time < 500ms", () => {
  // pm.response.responseTime = response time in milliseconds
  // .to.be.below(500) = must be under 500ms
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

### Checking Headers — "Is the plate clean?"

```javascript
pm.test("Content-Type is JSON", () => {
  // Check that the "Content-Type" response header has the correct value
  pm.response.to.have.header(
    "Content-Type",
    "application/json; charset=utf-8"
  );
});
```

### Checking Arrays — "Does the combo set have all items?"

```javascript
pm.test("Response returns 10 users", () => {
  const json = pm.response.json();

  // Check that the response is an array (list)
  pm.expect(json).to.be.an("array");

  // Check that it has exactly 10 elements
  pm.expect(json.length).to.eql(10);
});
```

### Checking Nested Objects — "Is the dipping sauce the right kind?"

```javascript
pm.test("User has valid address", () => {
  const json = pm.response.json();

  // Check that the "address" object has a "city" property
  pm.expect(json.address).to.have.property("city");

  // Check that "city" is a string
  pm.expect(json.address.city).to.be.a("string");
});
```

### JSON Schema Validation — "Checking against restaurant standards"

```javascript
pm.test("Response matches schema", () => {
  // Schema = the "standard" that the response must follow
  const schema = {
    type: "object",                     // Response must be an object
    required: ["id", "name", "email"],  // 3 fields that must be present
    properties: {
      id: { type: "number" },           // id must be a number
      name: { type: "string" },         // name must be text
      email: { type: "string" }         // email must be text
    }
  };

  // Check if the response matches the schema
  pm.response.to.have.jsonSchema(schema);
});
```

---

## Saving Data from Responses — Passing "food" to the next request

This is an extremely important technique: the result of request A becomes the input for request B.

```javascript
// ===== Login → Save the token for subsequent requests =====
pm.test("Save auth token", () => {
  const json = pm.response.json();
  // Save the token to the environment variable "token"
  // Subsequent requests using {{token}} will automatically use this value
  pm.environment.set("token", json.token);
});

// ===== Create user → Save user_id =====
pm.test("Save created user ID", () => {
  const json = pm.response.json();
  // Save the id of the just-created user → used for GET/PUT/DELETE later
  pm.environment.set("user_id", json.id);
});
```

**Real-world flow — Request "chain":**
```
1. POST /login       → Response: { token: "abc" }
                      → Tests: pm.environment.set("token", "abc")

2. GET /users/me     → Headers: Authorization: Bearer {{token}}
                      → Postman automatically fills "abc" where {{token}} is
                      → Server receives token → verifies → returns data
```

:::tip Aha Moment
This is how Postman "remembers" results between requests. Login returns a token → save it to a variable → subsequent requests use it automatically. Like buying a ticket at a festival (login), storing it in your wallet (environment), then just showing the ticket ({{token}}) each time you enter a new area.
:::

---

## Pre-request Scripts — Preparing before the call

Pre-request Scripts run **before** sending the request. Used to set up data, like preparing money and choosing a table **before** entering the restaurant.

```javascript
// Generate a random email for each test run
// Date.now() returns current milliseconds → email is always unique
const randomEmail = `user_${Date.now()}@test.com`;
// Save to a variable for use in Body: {{random_email}}
pm.environment.set("random_email", randomEmail);

// Create a current timestamp
pm.environment.set("timestamp", new Date().toISOString());

// Automatically add the Authorization header
const token = pm.environment.get("token"); // Get token from variable
pm.request.headers.add({
  key: "Authorization",
  value: `Bearer ${token}`  // Add to the request's headers
});
```

---

## Collections & Folders — Organizing your contacts neatly

Collections are like a **phone contact list**, Folders are like **contact groups**.

```
E-Commerce API Tests                ← Collection (contact list)
├── Auth                            ← Folder "Authentication"
│   ├── POST Login (valid)
│   ├── POST Login (invalid password)
│   ├── POST Login (missing email)
│   └── POST Register
├── Users                           ← Folder "User management"
│   ├── GET All Users
│   ├── GET User by ID
│   ├── POST Create User
│   ├── PUT Update User
│   ├── PATCH Partial Update
│   └── DELETE User
├── Products                        ← Folder "Products"
│   ├── GET All Products
│   ├── GET Product by ID
│   ├── GET Search Products
│   └── POST Create Product (Admin)
└── Orders                          ← Folder "Orders"
    ├── POST Create Order
    ├── GET Order by ID
    └── PATCH Update Order Status
```

---

## Collection Runner — Placing 100 consecutive orders to test

### The Essence

Collection Runner is like an **auto-dialer system** — instead of sitting there picking up the phone for each request, the Runner **calls all requests in the collection** sequentially and reports the results.

### How to run

1. Click **Run** on the Collection
2. Choose the **Environment** (Dev, Staging, Prod)
3. Set **iterations** (number of times to repeat the entire collection)
4. Click **Run Collection**

### Data-Driven Testing — Same "number" but different content each time

Like using 1 order template but changing the content each time. Use a CSV/JSON file to run tests with multiple data sets:

**File: test-users.csv**
```csv
name,email,expected_status
Valid User,valid@mail.com,201
,missing@mail.com,400
No Email User,,400
```

**In the Request Body — Using variables from the CSV:**
```json
{
  "name": "{{name}}",
  "email": "{{email}}"
}
```

**In Tests — Verifying against expected_status:**
```javascript
// pm.iterationData = data from the CSV for the current iteration
// .get("expected_status") = get the value of the "expected_status" column
pm.test(`Expected status ${pm.iterationData.get("expected_status")}`, () => {
  pm.response.to.have.status(
    // parseInt() converts the string "201" to the number 201
    parseInt(pm.iterationData.get("expected_status"))
  );
});
```

The Runner executes **3 times** (because the CSV has 3 data rows), each time using 1 row — automatically testing both valid and invalid cases!

:::tip Aha Moment
Data-Driven Testing is extremely powerful: write 1 request + 1 test script, but run it with 100 different data sets from a CSV. Instead of creating 100 separate requests, you only need 1 request + 1 CSV file.
:::

---

## Real-world QA Workflow

### Daily

```
1. Developer pushes code → deploys to staging

2. QA opens Postman:
   a. Run the Smoke Collection (5-10 most critical APIs)
   b. If FAIL → notify dev immediately (no need to test further)
   c. If PASS → continue with detailed testing

3. Test new features:
   a. Read API docs (Swagger) — understand the endpoints to test
   b. Create requests in Postman — compose the "calls"
   c. Write tests (assertions) — set up "food inspection"
   d. Test positive + negative cases — correct calls + incorrect calls
   e. Log bugs if found

4. Regression (re-testing existing functionality):
   a. Run Collection Runner — auto-call everything
   b. Review results — check for failures
   c. Export report — share with the team
```

### Postman vs Code Automation — When to use which?

| Postman | Code (Playwright/Supertest) |
|---|---|
| GUI, easy to use — like making a phone call | Requires coding skills — like writing an auto-dialer program |
| Quick for exploring APIs | Takes time to set up initially |
| Share via Postman Cloud | Share via Git — better version control |
| Collection Runner | CI/CD pipeline — runs automatically on every deploy |
| Limited complex logic | Flexible — any logic you want, handles complexity |
| **Use for:** Manual API testing, exploring new APIs | **Use for:** Automation, CI/CD, regression |

::: tip Aha Moment
**The ideal combo:** Use **Postman for exploration and manual testing** (fast, visual) → then convert critical tests to **code automation** (Playwright) to integrate with CI/CD. You don't need to choose one or the other — use both for their intended purpose!
:::

---

## Common Mistakes

**Hardcoding URLs directly in requests**
→ Use **Environments** with `{{base_url}}`
→ When switching environments (Dev → Staging → Prod), just switch the dropdown instead of editing 50 requests

**Sending requests without writing Tests in the Tests tab**
→ Every request should have at least 1 assertion (status code, response body)
→ Without tests, Postman is just a request-sending tool, not a testing tool. Tests turn Postman into an automation tool

**Storing real passwords and API keys in Shared Collections**
→ Use **Environment variables** for sensitive data, only share the Collection (not the Environment)
→ Collections shared with the team → everyone can see them. Sensitive data should be in each person's private Environment

**Not organizing requests — dumping everything into 1 collection**
→ Use **Folders** to group by module (Auth, Users, Orders...)
→ When a collection has 100+ requests without folders, no one can find anything

---

## Multiple Perspectives

**Team A:** "Use Postman for EVERYTHING" — manual testing, automation (Collection Runner), monitoring, documentation. Postman is the center of API testing.

**Team B:** "Use Postman only for EXPLORATION" — discover new APIs, quick debugging. Then move everything to code (Supertest, Playwright API testing) for CI/CD integration and version control via Git.

**Both are valid.** Small teams with little automation experience → Postman-centric saves time. Teams with a strong engineering culture → code-based for long-term maintainability. What matters is **choosing what's right for your team's context**, not following trends.

---

## Chapter Summary

| Feature | Essence | When to use |
|---|---|---|
| **Send Request** | Pick up the phone to call the API | Explore APIs, manual testing |
| **Environments** | Speed dial for each restaurant (Dev/Staging/Prod) | When you have multiple environments |
| **Tests** | Check the food when it arrives | Every request — verify the response |
| **Pre-request Scripts** | Prepare before making the call | Dynamic data, auto-attach token |
| **Collection Runner** | Auto-dialer system | Regression, smoke testing |
| **Data-Driven** | 1 template + many data sets from CSV | Test many inputs at once |
