# API Automation

## Why code instead of Postman? — Manual calls vs Automated dialer system

Postman is like **making phone calls by hand** — you have to sit there, pick up the phone, dial the number, and wait for the result. Fine when you only need to make a few calls.

But if you need to make **500 calls every day**, every time the code changes? You need an **auto-dialer system** — that is **API automation with code**.

| Postman (Manual calls) | Code (Automated system) |
|---|---|
| You must open Postman and click Send | Code runs automatically on every deploy |
| Hard to integrate with CI/CD | CI/CD runs automatically → failure = block deploy |
| Complex logic is hard to write | Write any logic you want |
| No version control | Code stored in Git → review, track changes |
| Large collections are hard to maintain | Code files are easy to organize and refactor |

:::tip Aha Moment
**Postman is for "exploration"**, code is for "guarding". You use Postman to learn about a new API → then write code automation to **automatically guard** that API every day. Like personally inspecting a restaurant once → then installing 24/7 security cameras.
:::

---

## Playwright API Testing — One tool for both UI and API

**Playwright** doesn't just test UI (clicking buttons, filling forms). It has **built-in API testing** — one tool for both. No extra libraries needed!

### `request` fixture — The "phone" in code

In Postman, you have a GUI to send requests. In Playwright, you have the **`request` fixture** — an object that lets you send HTTP requests from code.

```typescript
// Playwright provides "request" automatically — no setup or configuration needed
test('test name', async ({ request }) => {
  //                        ↑ "request" = the phone to call the API
  //                          Playwright injects it automatically, you just use it
});
```

---

## GET Request — "View the menu" in code

```typescript
import { test, expect } from '@playwright/test';
// Import test and expect from Playwright
// test = function to create a test case
// expect = assertion function (checks conditions)

test.describe('Users API', () => {
  // test.describe = group related tests together
  // Like a folder in Postman

  const BASE_URL = 'https://api.example.com';
  // BASE_URL = the API's root address, like {{base_url}} in Postman

  test('GET /users returns a list of users', async ({ request }) => {
    // async ({ request }) = receive the "phone" from Playwright
    // async/await = wait for the result before continuing (because API calls take time)

    const response = await request.get(`${BASE_URL}/users`);
    // request.get() = send a GET request, like selecting GET + clicking Send in Postman
    // await = wait for the server to finish responding before continuing
    // response = the result returned from the server

    // ===== Check status code =====
    expect(response.status()).toBe(200);
    // response.status() = get the status code (e.g., 200, 404, 500)
    // .toBe(200) = must equal 200

    // ===== Check response body =====
    const body = await response.json();
    // response.json() = convert body from text to a JSON object
    // Like pm.response.json() in Postman

    expect(body).toBeInstanceOf(Array);
    // body must be an Array (list), not a single object

    expect(body.length).toBeGreaterThan(0);
    // The list must have at least 1 element (not empty)

    // ===== Check the structure of the first user =====
    const user = body[0];
    // Get the first user in the list (index 0)

    expect(user).toHaveProperty('id');
    // user must have an "id" property

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');

    expect(typeof user.id).toBe('number');
    // typeof = check the data type, "id" must be a number

    expect(typeof user.name).toBe('string');
    // "name" must be a string (text)

    expect(user.email).toMatch(/@/);
    // email must contain the "@" character (regex pattern)
  });

  test('GET /users/1 returns the correct user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    // id must equal 1 — the correct user we requested

    expect(user.name).toBeTruthy();
    // .toBeTruthy() = must have a value (not null, not undefined, not "")

    expect(user.email).toBeTruthy();
  });

  test('GET non-existent user returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/99999`);
    // User id 99999 doesn't exist

    expect(response.status()).toBe(404);
    // Must return 404 Not Found — not 200 or 500!
  });
});
```

---

## POST Request — "Place a new order" in code

```typescript
test.describe('Create User', () => {

  test('POST /users creates a new user successfully', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      email: `test_${Date.now()}@mail.com`,
      // Date.now() = current milliseconds → email is always unique on each run
      // Prevents "email already exists" errors when re-running the test
      password: 'Pass@123'
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: newUser
      // data = the request body, like the Body tab in Postman
      // Playwright automatically sets Content-Type: application/json
    });

    expect(response.status()).toBe(201);
    // 201 Created = successfully created

    const created = await response.json();

    expect(created.id).toBeDefined();
    // .toBeDefined() = must have a value (server must return an id for the new user)

    expect(created.name).toBe(newUser.name);
    // The returned name must match the name sent

    expect(created.email).toBe(newUser.email);

    expect(created).not.toHaveProperty('password');
    // SECURITY: password MUST NOT be returned in the response!
    // If it is → that's a SECURITY BUG!
  });

  test('POST missing name returns 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        email: 'test@mail.com',
        password: 'Pass@123'
        // Missing "name" — a required field
      }
    });

    expect(response.status()).toBe(400);
    // 400 Bad Request = request has wrong format

    const error = await response.json();
    expect(error.message).toContain('name');
    // Error message must specify which field is missing ("name")
    // If it only returns a generic "Bad Request" → poor UX, should log a bug
  });

  test('POST invalid email format returns 422', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Test',
        email: 'not-an-email',
        // "not-an-email" is not a valid email (missing @)
        password: 'Pass@123'
      }
    });

    expect(response.status()).toBe(422);
    // 422 Unprocessable Entity = data is valid JSON but the values are invalid
  });
});
```

---

## PUT & PATCH — "Change the order" in code

```typescript
test.describe('Update User', () => {
  let userId: number;
  // Variable to store the id of the user created for update testing
  // let = declare a variable whose value can change

  test.beforeAll(async ({ request }) => {
    // beforeAll = runs once BEFORE all tests in this describe block
    // Create a user first → then test updates

    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Original Name',
        email: `update_test_${Date.now()}@mail.com`,
        password: 'Pass@123'
      }
    });
    const user = await response.json();
    userId = user.id;
    // Save the id for use in the tests below
  });

  test('PUT replaces the entire user', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/${userId}`, {
      // request.put() = send a PUT request
      // ${userId} = use the id of the user created in beforeAll
      data: {
        name: 'Updated Name',
        email: 'updated@mail.com',
        role: 'vip'
        // PUT sends ALL fields — any field not sent will be null!
      }
    });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.name).toBe('Updated Name');
    expect(updated.email).toBe('updated@mail.com');
  });

  test('PATCH only modifies the fields sent', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/users/${userId}`, {
      // request.patch() = send a PATCH request
      data: { name: 'Patched Name' }
      // Only sending "name" → other fields must remain unchanged!
    });

    expect(response.status()).toBe(200);

    const patched = await response.json();
    expect(patched.name).toBe('Patched Name');
    // name has been updated

    expect(patched.email).toBeTruthy();
    // email MUST still be present (not null)
    // If email is null → PATCH is behaving like PUT → BUG!
  });
});
```

---

## DELETE — "Cancel the order" in code

```typescript
test.describe('Delete User', () => {

  test('DELETE removes a user successfully', async ({ request }) => {
    // Step 1: Create a user to delete (don't delete existing data!)
    const createRes = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'To Delete',
        email: `delete_${Date.now()}@mail.com`,
        password: 'Pass@123'
      }
    });
    const user = await createRes.json();
    // user.id = the id of the just-created user

    // Step 2: Send the DELETE request
    const deleteRes = await request.delete(`${BASE_URL}/users/${user.id}`);
    // request.delete() = send a DELETE request

    expect(deleteRes.status()).toBe(204);
    // 204 No Content = deleted successfully, no body returned

    // Step 3: Verify — GET the deleted user must return 404
    const getRes = await request.get(`${BASE_URL}/users/${user.id}`);

    expect(getRes.status()).toBe(404);
    // User has been deleted → GET must return 404 Not Found
    // If it still returns 200 → DELETE is not working → BUG!
  });
});
```

:::tip Aha Moment
The **Create → Action → Verify → Cleanup** pattern is very common in API testing:
1. **Create** test data via API (fast, no UI dependency)
2. **Action** — perform the action under test
3. **Verify** — check the result
4. **Cleanup** — clean up test data (if needed)

Each test creates its own data → no dependency on other tests → can run in parallel!
:::

---

## Authentication — Sending tokens in code

```typescript
test.describe('Authenticated API Tests', () => {
  let token: string;
  // Variable to store the token after login

  test.beforeAll(async ({ request }) => {
    // Log in once before all tests
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: 'admin@example.com',
        password: 'AdminPass@123'
      }
    });
    const body = await response.json();
    token = body.token;
    // Save the token — like pm.environment.set("token") in Postman
  });

  test('GET /profile returns the current user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
        // Send the token in the header — like "showing your wristband" at the festival
        // Template literal: `Bearer ${token}` = "Bearer " + the token value
      }
    });

    expect(response.status()).toBe(200);

    const profile = await response.json();
    expect(profile.email).toBe('admin@example.com');
    // Profile must match the logged-in account
  });

  test('No token returns 401', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/profile`);
    // Not sending the Authorization header → no "wristband"

    expect(response.status()).toBe(401);
    // 401 Unauthorized = not authenticated
  });

  test('Regular user cannot access admin page', async ({ request }) => {
    // Log in with a regular user account (not admin)
    const loginRes = await request.post(`${BASE_URL}/auth/login`, {
      data: { email: 'user@example.com', password: 'UserPass@123' }
    });
    const userToken = (await loginRes.json()).token;

    // Try to access the admin endpoint
    const response = await request.get(`${BASE_URL}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    expect(response.status()).toBe(403);
    // 403 Forbidden = has a token (authenticated) but insufficient permissions
    // Like having a standard ticket but demanding VIP access
  });
});
```

---

## API + UI Testing Combined — Create via API, verify on UI

This is the **biggest advantage** of Playwright: test API and UI **in the same test**. An extremely effective pattern:

- **Create data via API** — fast, reliable, no UI dependency
- **Verify on UI** — ensure the real user actually sees the right thing
- **Clean up via API** — clean and fast

```typescript
test('Create product via API, verify on UI', async ({ request, page }) => {
  // ({ request, page }) = receive both tools:
  //   request = "phone" to call the API
  //   page = "browser" to test the UI

  // ===== Step 1: Setup — Create product via API (fast!) =====
  const response = await request.post(`${BASE_URL}/products`, {
    data: {
      name: 'iPhone 15 Pro',
      price: 28990000,
      category: 'phones'
    },
    headers: { 'Authorization': `Bearer ${adminToken}` }
    // Need admin token to create a product
  });
  const product = await response.json();
  // product.id = the id of the just-created product

  // ===== Step 2: Verify — Check on the web interface =====
  await page.goto(`/products/${product.id}`);
  // Open the product detail page in the browser

  await expect(
    page.getByRole('heading', { name: 'iPhone 15 Pro' })
  ).toBeVisible();
  // Check that the heading "iPhone 15 Pro" is visible on the page

  await expect(
    page.getByTestId('price')
  ).toContainText('28,990,000');
  // Check that the price displays correctly (with comma formatting)

  // ===== Step 3: Cleanup — Delete via API (clean!) =====
  await request.delete(`${BASE_URL}/products/${product.id}`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  // Delete the test product → don't pollute the database
});
```

:::tip Aha Moment
Why not create the product via UI? Because UI testing is **slow** (must open the page, fill the form, click buttons, wait for redirects...) and **flaky** (if the UI changes, the test breaks). API creates data in **milliseconds** and is **never flaky**. Use API for setup, UI for verification — **best of both worlds!**
:::

---

## Playwright Config for API Testing

```typescript
// playwright.config.ts — Playwright configuration file
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://staging-api.example.com',
    // baseURL = root URL, like {{base_url}} in Postman
    // When calling request.get('/users'), Playwright automatically prepends baseURL

    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // extraHTTPHeaders = headers automatically sent with EVERY request
    // No need to set them in each test
  },

  projects: [
    {
      name: 'api-tests',
      // Separate project for API tests
      testDir: './tests/api',
      // Only runs files in the tests/api directory
      // API tests DON'T need a browser → runs much faster!
    },
    {
      name: 'ui-tests',
      // Separate project for UI tests
      testDir: './tests/ui',
      use: {
        browserName: 'chromium',
        // UI tests need a browser
      },
    },
  ],
});
```

**Running tests:**

```bash
# Run only API tests (fast, no browser needed)
npx playwright test --project=api-tests

# Run only UI tests
npx playwright test --project=ui-tests

# Run all tests
npx playwright test
```

---

## Project Structure — Organizing code neatly

```
tests/
├── api/                              ← All API tests
│   ├── auth.spec.ts                  ← Login, Register, Token refresh
│   ├── users.spec.ts                 ← CRUD Users
│   ├── products.spec.ts              ← CRUD Products
│   ├── orders.spec.ts                ← Create, Update status
│   └── search.spec.ts               ← Search, Filter, Pagination
├── ui/                               ← All UI tests
│   └── ...
├── fixtures/
│   ├── api-data/
│   │   ├── users.json                ← Test data for user tests
│   │   └── products.json             ← Test data for product tests
│   └── api.fixture.ts               ← Custom fixture (auto-login)
└── utils/
    └── api-helper.ts                 ← Shared helper functions
```

### API Helper — A shared "assistant" for many tests

```typescript
// utils/api-helper.ts
import { APIRequestContext } from '@playwright/test';
// APIRequestContext = the type of the "request" object

export class ApiHelper {
  // class = a "blueprint" for creating objects with methods (actions) and properties (attributes)
  private request: APIRequestContext;
  // private = only accessible inside this class, not from outside
  private token: string = '';

  constructor(request: APIRequestContext) {
    // constructor = function that runs when creating a new object: new ApiHelper(request)
    this.request = request;
    // Store the "phone" for use in other methods
  }

  async login(email: string, password: string): Promise<string> {
    // Login method: sends email+password → receives token
    // Promise<string> = async function that returns a string (token)
    const response = await this.request.post('/auth/login', {
      data: { email, password }
    });
    const body = await response.json();
    this.token = body.token;
    // Store the token to automatically send in subsequent requests
    return this.token;
  }

  async createUser(data: { name: string; email: string; password: string }) {
    // Method to create a user — automatically sends the token
    const response = await this.request.post('/users', {
      data,
      headers: { 'Authorization': `Bearer ${this.token}` }
      // Automatically attaches the token — no need to remember each time
    });
    return response.json();
  }

  async deleteUser(id: number) {
    // Method to delete a user — used for cleanup after tests
    await this.request.delete(`/users/${id}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }
}
```

---

## Chapter Summary

| Approach | Essence | When to use |
|---|---|---|
| **Postman (manual)** | Making calls by hand — fast, visual | Explore APIs, ad-hoc testing |
| **Playwright API** | Automated dialer system — code runs daily | Automation, CI/CD, API + UI |
| **API + UI combo** | Create via API (fast), verify on UI (visual) | Most effective E2E testing |

### API Testing Workflow — From manual to automation

```
1. Read API docs (Swagger)           → Understand the "menu" — what's available, what format
2. Manual testing with Postman       → "Test call" — explore, find bugs quickly
3. Write automation with Playwright  → "Install cameras" — automatically guard
4. Integrate into CI/CD pipeline     → Every deploy auto-runs → failure = block deploy
5. Maintain & update                 → New API → add new tests
```

::: tip Aha Moment
**Postman for exploration, Playwright for automation.** This is the most effective combo for QAs today. You don't need to learn a separate tool for API automation — Playwright handles both UI and API within the same framework!
:::
