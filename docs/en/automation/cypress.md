# Cypress — "Passenger in the Car" vs "Drone in the Sky"

## The essence: Cypress runs INSIDE the browser

This is the most important thing to understand — and also the root cause of all of Cypress's strengths and weaknesses.

### Analogy: Passenger vs Drone

**Cypress is like a passenger sitting inside a car.** You can clearly see everything inside — the dashboard, seats, speed, music playing. But you **can't control other cars** on the road, you can't jump to another car, and your view is limited by the windows.

**Playwright is like a drone flying overhead.** You see the entire picture — every car on the road, every turn. You can follow one car, switch to another, and you're not limited by any single vehicle.

```
Cypress (runs inside the browser — same process):

  ┌─────────────────────────────────────┐
  │           BROWSER                    │
  │                                      │
  │   ┌────────────┐  ┌──────────────┐  │
  │   │  Your App   │  │ Cypress Test │  │
  │   │  (iframe)   │  │  Runner      │  │
  │   └────────────┘  └──────────────┘  │
  │                                      │
  │   Same process → direct DOM access, │
  │   fast. But "trapped" inside        │
  │   1 browser, 1 origin.             │
  └─────────────────────────────────────┘


Playwright (runs outside the browser — remote control):

  ┌──────────────┐
  │  Playwright   │ ◄── Controls from outside
  │  Test Code    │
  └──────┬───────┘
         │ CDP / WebSocket
    ┌────┼────┬────────────┐
    ▼    ▼    ▼            ▼
  Chrome  FF  WebKit    Can open
                        multiple tabs,
                        multiple windows,
                        cross-origin
```

**Key insight:** Cypress injects code directly into the browser → fast when interacting with the DOM, but limited by the browser security model (same-origin policy). Playwright controls from outside → no such limitations.

---

## Network Stubbing — Cypress's Superpower

This is the feature where Cypress excels **the most**, and the reason many frontend teams love it.

### Concept: "Movie set" instead of "real location"

Imagine you're shooting a film. Instead of flying to Paris to film one scene, you build a **movie set** — fake buildings, fake scenery, but on camera it looks just like the real thing.

Network stubbing works the same way. You tell Cypress: **"When the app calls an API, DON'T actually call the server. Instead, pretend the server returned THIS data."**

### Why do you need stubbing?

```
Without stubbing:
  Test → App → Real API → Real Database → Real Server
                │
                └── Slow, depends on server, data changes,
                    server down = test fails (not the app's fault)

With stubbing:
  Test → App → Cypress intercept → Fake response (defined by you)
                │
                └── Fast, deterministic, no dependencies,
                    test can even run offline
```

### Real-world example: Testing the Products page

```typescript
describe('Products Page', () => {

  it('displays product list from API', () => {
    // SETUP: When the app calls GET /api/products → return fake data
    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: [
        { id: 1, name: 'iPhone 15', price: 25000000 },
        { id: 2, name: 'Samsung S24', price: 22000000 },
      ]
    }).as('getProducts');    // give it an alias to track

    cy.visit('/products');
    cy.wait('@getProducts'); // wait for the request to happen

    // VERIFY: App displays the fake data correctly
    cy.get('.product-card').should('have.length', 2);
    cy.get('.product-card').first().should('contain', 'iPhone 15');
    cy.get('.product-card').last().should('contain', '22,000,000');
  });

  it('displays error when API returns 500', () => {
    // SETUP: Simulate a server error
    cy.intercept('GET', '/api/products', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getProducts');

    cy.visit('/products');
    cy.wait('@getProducts');

    // VERIFY: App handles the error gracefully
    cy.get('.error-state').should('be.visible');
    cy.get('.retry-button').should('exist');
  });

  it('displays loading state while waiting for API', () => {
    // SETUP: Delay response by 2 seconds to see loading state
    cy.intercept('GET', '/api/products', (req) => {
      req.reply({
        delay: 2000,    // simulate slow network
        statusCode: 200,
        body: [{ id: 1, name: 'iPhone 15', price: 25000000 }]
      });
    }).as('getProducts');

    cy.visit('/products');

    // Loading spinner appears WHILE waiting
    cy.get('.loading-spinner').should('be.visible');

    // After API responds → spinner disappears
    cy.wait('@getProducts');
    cy.get('.loading-spinner').should('not.exist');
    cy.get('.product-card').should('have.length', 1);
  });
});
```

::: tip Why is stubbing powerful?
You control **every scenario** that the server could return — success, error, slow network, empty data, invalid format — without **needing to set up a server**. Frontend teams can write tests before the backend is finished.
:::

### Comparison: Cypress intercept vs Playwright route

```typescript
// Cypress — cy.intercept()
cy.intercept('GET', '/api/users', { body: mockUsers }).as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');

// Playwright — page.route()
await page.route('/api/users', route =>
  route.fulfill({ body: JSON.stringify(mockUsers) })
);
await page.goto('/users');
```

Both can do the same thing. Cypress syntax is slightly easier to read. Playwright is more flexible (can modify request headers, abort requests, etc.).

---

## Developer Experience — Why Cypress became famous

### Time Travel Debugging

Cypress records a **DOM snapshot at every step**. Hover your mouse over any step in the Cypress UI → see what the page looked like at that point in time.

```
Step 1: cy.visit('/login')           ← hover → see the login page
Step 2: cy.get('#email').type(...)    ← hover → see email being typed
Step 3: cy.get('button').click()      ← hover → see button being clicked
Step 4: cy.url().should(...)          ← hover → see redirect to dashboard
```

It's like **rewinding a video** — go back to any point in time. Extremely useful when debugging test failures.

### Real-time Reload

Edit your test code → save → Cypress **automatically reruns the test** immediately. Feedback loop is incredibly fast.

### Auto-wait (similar to Playwright)

```typescript
// Cypress AUTO-RETRIES the assertion until it passes (or times out)
cy.get('.success-msg').should('contain', 'Saved');
// If the element hasn't appeared yet → Cypress waits automatically, retries
// No need for explicit waits like Selenium
```

---

## Cypress Limitations — Honest assessment

### 1. No multi-tab support

```typescript
// Cypress CANNOT do this:
// - Open a link in a new tab
// - Test popup windows (OAuth, payment gateways)
// - Test flows that require multiple tabs

// Workaround: remove target="_blank" attribute
cy.get('a[target="_blank"]')
  .invoke('removeAttr', 'target')
  .click();
// But this is a hack, not real user behavior
```

### 2. Same-origin limitation

```typescript
// App is at https://myapp.com
// OAuth redirects to https://accounts.google.com ← DIFFERENT origin

// Cypress: very difficult to test this flow
// Playwright: no problem at all
```

Because Cypress runs inside the browser, it's bound by the **same-origin policy**. Cross-domain flows (SSO, OAuth, payment redirects) are very difficult to test.

### 3. Parallel execution — requires payment

```
Cypress free:        Runs sequentially — 1 test at a time
Cypress Dashboard:   Parallel, analytics, video recording
                     Pricing: $67-399/month

Playwright:          Parallel built-in, FREE
                     npx playwright test --workers=4
```

### 4. JavaScript/TypeScript only

Teams using Java, Python, C# → cannot use Cypress. Playwright supports all of them.

### 5. Narrower browser support

```
Cypress:     Chrome, Edge, Firefox (limited), Electron
             No WebKit/Safari

Playwright:  Chromium, Firefox, WebKit (Safari engine)
             More complete coverage
```

---

## When to choose Cypress? (Practical guide)

### Choose Cypress when:

| Situation | Reason |
|---|---|
| **Frontend team writes tests** | React/Vue/Angular devs are familiar with JS, excellent DX |
| **Need heavy API mocking** | `cy.intercept()` syntax is very clean |
| **Single-page app** | No need for multi-tab, same-origin is fine |
| **Team already knows Cypress** | Switching cost > benefit |

### Choose Playwright over Cypress when:

| Situation | Reason |
|---|---|
| **Dedicated QA team** | Need more flexibility and power than DX |
| **Cross-domain flows** | OAuth, SSO, payment gateways |
| **Multi-tab / popup** | Cypress doesn't support it |
| **Budget-conscious** | Parallel execution is free |
| **Multi-language team** | Java, Python, C# support |

---

## Quick Start — If you need to use it

```bash
npm install -D cypress
npx cypress open          # open UI mode
npx cypress run           # run headless in CI
```

```typescript
// cypress/e2e/login.cy.ts
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('logs in successfully', () => {
    cy.get('#email').type('user@mail.com');
    cy.get('#password').type('Pass@123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('.welcome-msg').should('contain', 'Welcome');
  });

  it('shows error with wrong credentials', () => {
    cy.get('#email').type('wrong@mail.com');
    cy.get('#password').type('wrong');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
```

---

## Summary — Remember 4 things

| # | Key Point |
|---|---|
| 1 | Cypress runs **inside the browser** (passenger in the car). Playwright runs **outside the browser** (drone in the sky). This architecture determines everything. |
| 2 | **Network stubbing** (`cy.intercept`) is a superpower — test every API scenario without a real server. Like a movie set instead of flying to Paris. |
| 3 | Excellent DX (time-travel, real-time reload) — the reason frontend devs love it. |
| 4 | **Real-world limitations:** no multi-tab, same-origin only, parallel requires payment. This is why QA teams usually choose Playwright. |

::: tip How to choose?
**Frontend dev writing tests for their own component/page → Cypress is perfectly fine.**
**QA Engineer building a test framework for the entire project → Playwright is a better fit.**
No tool is "the best" — there's only the tool **best suited for your context**.
:::
