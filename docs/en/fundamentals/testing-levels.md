# Testing Levels

## Starting with a story

Imagine you are **building a house**. Would you hire builders, wait until it's done, and move right in? Definitely not. You would inspect it step by step:

1. **Inspect each individual brick** — Any cracked ones get discarded immediately
2. **Inspect the walls** — Are the bricks stacked solidly? Is the mortar holding?
3. **Inspect the entire house** — Does the plumbing and electricity work? Do the doors open and close? Is the roof leaking?
4. **Have real people move in on a trial basis** — Are they comfortable? Is anything missing?

This is the essence of **Testing Levels** in software. Each level finds **different types of bugs**, at **different times**, by **different people**.

> If you only test at a single level, you'll miss a lot of bugs — just like only inspecting the bricks without inspecting the whole house.

---

## Testing Pyramid

### Visual overview

```
                    ╱╲
                   ╱  ╲
                  ╱ E2E╲          ← Fewest tests (like inspecting the entire house)
                 ╱ / UI  ╲
                ╱──────────╲
               ╱            ╲
              ╱ Integration   ╲    ← Moderate number (like inspecting the walls)
             ╱                 ╲
            ╱───────────────────╲
           ╱                     ╲
          ╱     Unit Tests        ╲  ← Most tests (like inspecting each brick)
         ╱                         ╲
        ╱───────────────────────────╲
```

### Why is it shaped like a pyramid?

This is the most important question. Many people remember the shape but don't understand **the reason**.

Think of it this way: when you inspect **each individual brick**, it's very fast — pick it up, tap it, done. But when you inspect **the entire house**, you have to walk through every room, flip every switch, turn on every faucet — very time-consuming.

In software it's the same:

| Level | Execution speed | Cost | Stability | Recommended ratio |
|---|---|---|---|---|
| **Unit** | A few milliseconds | Very low | Very stable | **~70%** of all tests |
| **Integration** | A few seconds | Medium | Stable | **~20%** of all tests |
| **E2E / System** | A few minutes | High | Often "flaky" (sometimes passes, sometimes fails) | **~10%** of all tests |

**Real-world example in a project:**
- **500 unit tests** → complete in 30 seconds
- **100 integration tests** → complete in 5 minutes
- **30 E2E tests** → complete in 15 minutes

Why are unit tests fast? Because they only test **a small piece of code**, with no need to connect to a database, open a browser, or call an API. E2E tests have to **start the entire system**, open a real browser, and perform real clicks — so they're much slower.

::: tip The golden rule
Write **many** small, fast, cheap tests at the base of the pyramid. Write **few** large, slow, expensive tests at the top. This is the optimal balance between **feedback speed** and **coverage**.
:::

---

## Level 1: Unit Testing — Inspecting Each Brick

### What is a "Unit"?

A **unit** is the **smallest piece of code that does ONE single thing**. Typically:
- A **function** — e.g., a function that calculates a discount
- A **method** (a function within a class) — e.g., a method that validates an email
- A small **class** — e.g., a class that handles date formatting

The key point: a unit test checks that piece of code **in isolation**. Meaning if function A calls a database, we **mock** (simulate) that database, so we only focus on testing function A's logic.

> Like inspecting a brick: you tap the brick **on its own** — you don't need to build an entire wall just to inspect it.

### Who writes Unit Tests?

**Developers** write unit tests. This is the developer's responsibility, not QA's. However, QA needs to **understand** unit tests in order to:
- Ask dev: "What's the code coverage percentage?" — should be >= 80%
- Know that unit tests passing **does not mean** the system has no bugs
- If coverage is low, QA needs to increase testing effort at higher levels

### Code example: TypeScript + Jest

Below is a complete example. Read each comment line to understand:

```typescript
// =============================================
// FILE: src/utils/price.ts
// This is the "unit" to test — a discount calculation function
// =============================================

// "export" means allowing other files to import this function
// The function takes 2 parameters: original price and discount percentage
// Returns the price after discount
export function calculateDiscount(
  price: number,            // original price, number type
  discountPercent: number   // discount %, number type
): number {                 // ": number" = function returns a number

  // Guard clause: check if inputs are valid
  // If price is negative → throw an error, stop the function immediately
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }

  // Discount must be between 0 and 100
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }

  // Calculation formula: original price - (original price x discount% / 100)
  // Example: 200 - (200 x 20 / 100) = 200 - 40 = 160
  return price - (price * discountPercent / 100);
}
```

```typescript
// =============================================
// FILE: src/utils/price.test.ts
// This is the test file — the ".test.ts" suffix lets Jest find it automatically
// =============================================

// Import the function to test from the source file
import { calculateDiscount } from './price';

// "describe" = group test cases together
// The group name is usually the function being tested
describe('calculateDiscount', () => {

  // ---- HAPPY PATH: normal cases, valid input ----

  // "test" (or "it") = one specific test case
  // Test name describes: when → what result
  test('20% off on price 100 → returns 80', () => {
    // "expect" = expect this result
    // "toBe" = must equal exactly this value
    expect(calculateDiscount(100, 20)).toBe(80);
  });

  test('0% off → returns original price', () => {
    // 0% discount means no discount at all
    expect(calculateDiscount(250, 0)).toBe(250);
  });

  test('100% off → returns 0 (free)', () => {
    expect(calculateDiscount(500, 100)).toBe(0);
  });

  // ---- EDGE CASES: boundary cases, unusual input ----

  test('negative price → throws error', () => {
    // When testing a function that throws an Error, wrap it in an arrow function
    // () => calculateDiscount(-10, 20) is a way to "defer" calling the function
    // so Jest can "catch" the error
    expect(() => calculateDiscount(-10, 20))
      .toThrow('Price cannot be negative');
  });

  test('discount > 100% → throws error', () => {
    expect(() => calculateDiscount(100, 150))
      .toThrow('Discount must be between 0 and 100');
  });

  test('negative discount → throws error', () => {
    expect(() => calculateDiscount(100, -5))
      .toThrow('Discount must be between 0 and 100');
  });
});
```

::: info Terminology in the example
- **Happy path**: the "happy" flow — everything is correct, input is valid
- **Edge case**: boundary case — unusual input, values at the limits
- **Mock**: simulate — replace a real dependency with a fake version for isolated testing
- **Guard clause**: code that checks input conditions at the beginning of a function, "guarding the gate" before running the main logic
:::

---

## Level 2: Integration Testing — Do the LEGO Pieces Fit Together?

### The essence through a LEGO analogy

Imagine you have a LEGO set. Each individual LEGO piece is perfect (unit tests passed). But when you **snap them together**:
- Does piece A fit with piece B?
- When 3 pieces are connected, does the tower stand firm?
- Do the colors of the pieces match according to the instructions?

That is **Integration Testing** — checking whether components **work correctly together**.

> In software: the User module calls the Database module → is data saved correctly? The API returns JSON → does the Frontend understand that JSON?

### Who performs it?

| Role | What they do |
|---|---|
| **Developer** | Write integration tests for the code they own |
| **SDET** (Software Dev Engineer in Test) | Write automation tests for APIs, service-to-service |
| **QA Engineer** | Test APIs with Postman, verify database, check data flow |

### Integration approaches

```
Big Bang:     Assemble ALL modules at once then test
              → Fast but when it fails, VERY HARD to know where the problem is
              → Like assembling all LEGO pieces then checking

Top-down:     Test from the TOP module (closest to user) down to LOWER modules
              → Use "Stubs" (fake versions) for lower modules not yet available
              → Like building a house from the roof down, using temporary scaffolding

Bottom-up:    Test from the LOWER modules (database, core logic) up to the TOP
              → Use "Drivers" (temporary controllers) to call the modules
              → Like building the foundation first, then going up

Sandwich:     Combine Top-down + Bottom-up, meeting in the middle
              → Most common in practice because it's flexible
```

### Code example: API Integration Test

```typescript
// =============================================
// Test: User Service connecting to a REAL Database
// This is an integration test because it tests 2 components working together:
//   API endpoint ←→ Database
// =============================================

// "supertest" = a library that sends HTTP requests to the app
// without needing to start a real server on a port
import request from 'supertest';

// Import the Express/NestJS application to test
import app from '../app';

// Import the real database connection (not a mock!)
import { db } from '../database';

describe('POST /api/users - Create a new user', () => {

  // "beforeEach" = runs BEFORE EACH test case
  // Purpose: clean up old data so each test starts "clean"
  beforeEach(async () => {
    // Delete old test user from database (if exists)
    await db.query(
      'DELETE FROM users WHERE email = $1',  // $1 = placeholder
      ['test@example.com']                    // value to substitute for $1
    );
  });

  test('create user successfully → returns 201', async () => {
    // Send POST request to /api/users
    const response = await request(app)
      .post('/api/users')        // POST method, path /api/users
      .send({                    // request body
        name: 'Nguyen Van A',
        email: 'test@example.com',
        password: 'MyPass@123'
      });

    // Check the API response
    expect(response.status).toBe(201);   // 201 = Created successfully
    expect(response.body.email).toBe('test@example.com');

    // IMPORTANT: Check if data was ACTUALLY saved to the DB
    // This is the key difference from unit tests:
    // Unit tests mock the DB, integration tests use the real DB
    const dbResult = await db.query(
      'SELECT * FROM users WHERE email = $1',
      ['test@example.com']
    );
    expect(dbResult.rows.length).toBe(1);  // Must have exactly 1 record
  });

  test('duplicate email → returns 409 Conflict', async () => {
    // Create user attempt 1 — succeeds
    await request(app).post('/api/users').send({
      name: 'User 1',
      email: 'test@example.com',
      password: 'Pass@123'
    });

    // Create user attempt 2 with same email — must be rejected
    const response = await request(app).post('/api/users').send({
      name: 'User 2',
      email: 'test@example.com',  // duplicate email!
      password: 'Pass@456'
    });

    // 409 = Conflict (data conflict)
    expect(response.status).toBe(409);
  });
});
```

### What types of bugs does Integration Testing find?

These are bugs that unit tests **can never** find:

- **Data format mismatch**: API returns `{ "userName": "A" }` but frontend expects `{ "user_name": "A" }`
- **Database query errors**: JOINing multiple tables incorrectly, query returns duplicate records
- **Authentication failures**: Service A calls Service B but the token is expired or in the wrong format
- **Type mismatch**: Service A sends `id` as string `"123"`, Service B expects number `123`
- **Race condition**: 2 requests simultaneously update the same record, data gets overwritten incorrectly

---

## Level 3: System Testing — Inspecting the Entire House

### The essence

At this point, you've inspected each brick (unit), checked that the walls are sturdy (integration). Now it's time to inspect **the entire house**: does the electricity work, does the water flow, do the doors open and close smoothly, does the wifi cover the whole house?

**System Testing** means testing **the complete system** in an environment as close to production (the real environment where users operate) as possible. This is where **QA Engineers spend most of their time**.

### Who performs it?

Primarily the **QA Team**. This is QA's main "playground":

| | |
|---|---|
| **Who performs** | QA Engineer, QA Lead |
| **What is tested** | The entire end-to-end system |
| **Purpose** | Confirm the system fully meets requirements |
| **Environment** | Staging environment (a copy of production) |
| **Timing** | After Integration Testing is complete |

### What does System Testing include?

**Functional Testing** (testing functionality):
- All features work correctly according to requirements
- End-to-end flows: Register → Login → Browse products → Add to cart → Checkout
- Negative testing: enter wrong data → system handles errors correctly

**Non-functional Testing** (testing non-functional qualities):
- **Performance**: Does the page load in under 2 seconds? Can the system handle 1,000 concurrent users?
- **Security**: Is there SQL injection vulnerability? Is there XSS (malicious script injection)?
- **Usability**: Is the interface easy to use? Consistent? Accessible to people with disabilities?
- **Compatibility**: Works well on Chrome, Firefox, Safari? On mobile?

### Example: E2E Test with Playwright

```typescript
// =============================================
// End-to-end test: Complete purchase flow
// Playwright = browser automation tool
// This test simulates EXACTLY what a real user does
// =============================================

// Import test framework and expect from Playwright
import { test, expect } from '@playwright/test';

// A test case describing the entire checkout flow
test('Purchase flow from login to successful order', async ({ page }) => {
  // "page" = a virtual browser tab, automatically created by Playwright

  // ===== STEP 1: Login =====
  await page.goto('/login');  // Open the login page (like typing a URL)

  // Fill email into the input with data-testid="email"
  // data-testid is a special attribute for testing, doesn't affect the UI
  await page.fill('[data-testid="email"]', 'customer@test.com');
  await page.fill('[data-testid="password"]', 'Pass@123');

  // Click the login button
  await page.click('[data-testid="login-btn"]');

  // Check: after login, URL should navigate to /dashboard
  await expect(page).toHaveURL('/dashboard');

  // ===== STEP 2: Add product to cart =====
  await page.goto('/products');  // Open the product listing page

  // Click "Add to Cart" button on the first product
  await page.click('[data-testid="product-1"] >> text=Add to Cart');

  // Check: cart icon shows the number "1"
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

  // ===== STEP 3: Proceed to checkout =====
  await page.click('[data-testid="cart-icon"]');  // Open the cart
  await page.click('text=Checkout');               // Click the Checkout button

  // ===== STEP 4: Enter shipping information =====
  await page.fill('[data-testid="address"]', '123 Nguyen Hue');
  await page.fill('[data-testid="city"]', 'Ho Chi Minh');
  await page.click('text=Continue');

  // ===== STEP 5: Enter payment information =====
  await page.fill('[data-testid="card-number"]', '4111111111111111');
  await page.fill('[data-testid="expiry"]', '12/28');
  await page.fill('[data-testid="cvv"]', '123');
  await page.click('text=Place Order');  // Place the order

  // ===== STEP 6: Confirm order success =====
  // Check: success message is displayed
  await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
  // Check: order ID starts with "ORD-"
  await expect(page.locator('[data-testid="order-id"]')).toContainText('ORD-');
});
```

---

## Level 4: Acceptance Testing (UAT) — Having Residents Move In

### The essence

The house is built, everything has been inspected. Now comes the final step: **have real people move in on a trial basis**. They'll cook, shower, sleep overnight — and tell you: "The house is fine, I accept it" or "The kitchen is a bit cramped, the bathroom is missing a towel hook."

**UAT** (User Acceptance Testing) is when **real users** or **business representatives** test the system to answer the question: **"Is this what I need?"**

This isn't about finding technical bugs anymore — this is about confirming the system **meets real-world needs**.

### Alpha Testing vs Beta Testing

These two terms sound complex but are actually very simple:

**Alpha Testing** — Trial in the model home at the company:
- Takes place **at the development company**
- Testers: internal staff, QA acting as users
- Purpose: find major issues before letting outsiders use it
- Example: the QA team tests the app as if they were customers

**Beta Testing** — Real customers moving in for a trial:
- Takes place **in the user's real environment**
- Testers: **real users** (a selected small group)
- Purpose: collect real-world feedback before the official launch
- Example: TestFlight (iOS), Google Play Beta, Steam Early Access

> **Aha moment**: Alpha = "internal trial first", Beta = "external trial before official launch." Just remember the alphabetical order: **A**lpha first, **B**eta second.

### Details

| | |
|---|---|
| **Who performs** | End users, Business team, Product Owner |
| **What is tested** | Business flows, user experience |
| **Purpose** | Confirm: "Yes, this is what I need" |
| **Environment** | UAT environment (close to production) |
| **Timing** | After System Testing, before go-live |

### What does QA do during UAT?

QA doesn't directly perform UAT (since UAT is for users/business), but QA plays a **very important support role**:

- **Prepare**: Write UAT test scenarios in business language (not technical language)
- **Guide**: Help business users know how to test and where to test
- **Record**: Log bugs reported by users, track their status
- **Verify**: After dev fixes bugs from UAT, QA re-verifies
- **Summarize**: Report UAT results, pass/fail rates

---

## Summary: Who Does What at Each Level?

```
Developer:
├── Unit Tests         → Write tests for each function/method
└── Integration Tests  → Write tests for the code they own

QA Engineer:
├── Integration Tests  → Test APIs (Postman), verify database
├── System Testing     → Test functional + non-functional ← MAIN RESPONSIBILITY
├── E2E Automation     → Write Playwright/Cypress scripts
└── UAT Support        → Prepare scenarios, log bugs, verify fixes

SDET (Software Dev Engineer in Test):
├── Integration Tests  → Build automation frameworks for APIs
├── E2E Automation     → Build and maintain the automation suite
└── CI/CD Integration  → Integrate tests into the pipeline

Business / Product Owner:
└── Acceptance Testing → Use the product and confirm "this is what I need"
```

### What types of bugs does each level find?

| Level | Example bugs found |
|---|---|
| **Unit** | Function calculates incorrectly, if/else logic wrong, division by zero, null pointer |
| **Integration** | API returns wrong format, database query error, services calling each other timeout |
| **System** | Checkout flow breaks, search returns no results, page loads too slowly |
| **Acceptance** | Flow is hard to use, missing features users need, UX causes confusion |

---

## Anti-pattern: Ice Cream Cone — When the Pyramid Gets Flipped

### The problem

In practice, many teams fall into the **Ice Cream Cone anti-pattern** — which means **inverting** the pyramid:

```
        ╱───────────────────────────╲
       ╱   Lots of Manual Tests      ╲    ← Time-consuming, not repeatable
      ╱─────────────────────────────────╲
         ╱─────────────────────────╲
        ╱   Many E2E / UI Tests     ╲      ← Slow, often flaky
       ╱─────────────────────────────╲
            ╱─────────────────╲
           ╱  Few Integration  ╲            ← Lacking
          ╱─────────────────────╲
              ╱───────────╲
             ╱  Very few    ╲                ← Almost nonexistent
            ╱  Unit Tests    ╲
           ╱─────────────────╲
```

### Why does the Ice Cream Cone happen?

- The team has no culture of writing unit tests
- QA only knows manual testing, not automation
- Management thinks "manual testing is enough"
- Dev says "writing tests takes time, the deadline is tight"

### Real-world consequences

| Problem | Impact |
|---|---|
| **CI/CD runs slowly** | Pipeline takes 30-60 minutes instead of 5-10 minutes |
| **Flaky tests** | Tests sometimes pass, sometimes fail, team loses trust in automation |
| **Hard to debug** | E2E test fails → can't tell if the issue is in UI, API, or Database |
| **Drains manpower** | Need more manual QA, regression testing takes multiple days |
| **Slow feedback** | Dev has to wait hours to know if their code has bugs |

### How to fix: From Ice Cream Cone back to Pyramid

1. **Start with Unit Tests**: Require dev to write unit tests for all new code (minimum 80% coverage)
2. **Add API Integration Tests**: QA/SDET write automation tests for APIs first, since they're more stable than UI tests
3. **Gradually reduce E2E Tests**: Only keep E2E for critical flows (login, checkout, payment)
4. **Reduce Manual Tests**: Move regression tests to automation, use manual testing only for exploratory testing

> **Aha moment**: If you have to run manual regression tests that take 3 days every sprint — that's the clearest sign of the Ice Cream Cone anti-pattern.

---

## In an Agile Sprint: Real-world Timeline

```
Day 1-2:   Dev codes + writes unit tests
           QA writes test cases + prepares test data

Day 3-4:   Dev completes feature → hands off to QA
           QA begins testing (manual + automation)

Day 5-7:   QA continues testing, logs bugs
           Dev fixes bugs

Day 8:     QA retests fixed bugs
           Regression testing (automation runs)

Day 9:     UAT — Product Owner/stakeholder tries the product
           QA supports, logs feedback

Day 10:    Sprint Demo + Retrospective
           Decision on whether to release
```

---

## Summary

| Level | Who tests | What is tested | Common tools |
|---|---|---|---|
| **Unit** | Developer | Logic within each function | Jest, JUnit, pytest, Vitest |
| **Integration** | Dev / QA / SDET | Interaction between 2+ modules | Supertest, Postman, REST Assured |
| **System** | QA Team | The entire end-to-end system | Playwright, Cypress, Selenium, JMeter |
| **Acceptance** | Business / Users | System meets real needs | Manual testing, demo sessions |

::: tip 3 things to remember
1. **Testing Pyramid**: Many Unit tests at the base, few E2E at the top — this is the golden rule
2. **Each level has its own role**: No level can replace another
3. **Avoid the Ice Cream Cone**: If your team is doing too much manual testing, start automating with unit tests and API tests first
:::
