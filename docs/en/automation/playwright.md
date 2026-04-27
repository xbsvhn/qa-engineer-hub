# Playwright

## What is Playwright?

Playwright is a **modern web testing framework** developed by Microsoft (2020). It quickly became the **most popular** automation tool today, surpassing both Selenium and Cypress.

But before learning how to use it, you must understand **WHY it is faster and more powerful**.

---

## Architecture -- WHY is Playwright faster than Selenium?

### Selenium's problem: communicating through a MIDDLEMAN

Imagine you want to call your friend on the phone:
- **Selenium** = You call a RECEPTIONIST, the receptionist writes down the message, then calls your friend, your friend answers the receptionist, and the receptionist relays the answer back to you. **Slow, time-consuming, and information can get lost.**
- **Playwright** = You call your friend DIRECTLY. **Fast, accurate, no information lost.**

This is the most fundamental difference:

```
Selenium (SLOW -- multiple intermediary steps):
  Test code --> WebDriver Protocol --> HTTP Request --> Browser Driver (.exe) --> Browser
  (4 steps, each step takes time)

Playwright (FAST -- direct communication):
  Test code --> CDP/WebSocket --> Browser
  (2 steps, direct connection)
```

**CDP = Chrome DevTools Protocol** -- the protocol that Chrome provides for direct communication with the browser. When you open DevTools (F12) in Chrome, it also uses CDP. Playwright uses this exact same protocol.

**WebSocket** = a two-way, persistent connection. No need to send a request and wait for a response like HTTP. Think of it like a phone call -- both sides talk continuously, without hanging up and calling back.

### Playwright Architecture in Detail

```
┌──────────────────────┐
│   Your Test Code     │    You write code here
│   (TypeScript)       │
└──────────┬───────────┘
           │ Playwright API (functions like click(), fill(), expect()...)
┌──────────▼───────────┐
│   Playwright Library │    The Playwright library handles everything
│   (CDP / WebSocket)  │    Communicates DIRECTLY with the browser
└──────────┬───────────┘
     ┌─────┼─────┐
     ▼     ▼     ▼
  Chromium Firefox WebKit     3 REAL browsers (no separate drivers needed)
```

**Comparison with Selenium:**
| | Selenium | Playwright |
|---|---|---|
| Need to install separate drivers? | Yes (chromedriver.exe, geckodriver.exe) | No (automatic) |
| Communication | Via HTTP (slow) | Via WebSocket (fast) |
| Driver updates | Manual, version mismatch errors common | Automatic, worry-free |
| Multi-browser | Install each driver separately | One command installs all |

---

## Auto-Wait -- THE KILLER FEATURE

### Selenium's problem: you must WRITE waits EVERYWHERE

In Selenium, before doing ANYTHING, you must write wait code yourself:

```
// Selenium (Java) -- MUST write 4 wait lines just to click 1 button:
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Step 1: wait for element to appear in DOM
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("button")));

// Step 2: wait for element to be visible
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("button")));

// Step 3: wait for element to be clickable (not obscured, not disabled)
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));

// Step 4: FINALLY you can click
button.click();
```

If you **FORGET** to write waits --> tests become "flaky" (sometimes pass, sometimes fail). This is the biggest nightmare of Selenium.

### Playwright's solution: AUTOMATIC waiting, you don't need to do anything

```typescript
// Playwright -- JUST 1 LINE:
await page.click('#button');

// Playwright AUTOMATICALLY does ALL of this BEFORE clicking:
// 1. Wait for element to appear in DOM               ✅ Automatic
// 2. Wait for element to be visible                   ✅ Automatic
// 3. Wait for element to be stable (not animating)    ✅ Automatic
// 4. Wait for element to be enabled (not disabled)    ✅ Automatic
// 5. Wait for no other element to be covering it      ✅ Automatic
// 6. Finally click                                    ✅ Automatic
//
// You DON'T NEED to write any wait lines. Playwright handles it all.
```

**This is reason #1 why Playwright has fewer flaky tests than Selenium.**

### When you DO need explicit waits (rarely)

```typescript
// Wait for navigation
// waitForURL() = wait until the URL changes to the expected value
await page.waitForURL('/dashboard');

// Wait for an API response
// waitForResponse() = wait until the browser receives a response from this URL
// ** = wildcard, any domain
const response = await page.waitForResponse('**/api/users');

// Wait for a loading spinner to disappear
// state: 'hidden' = wait until the element is NO LONGER visible
await page.waitForSelector('.loading-spinner', { state: 'hidden' });

// Wait for the page to finish loading completely (no more requests)
// 'networkidle' = no requests for 500ms
await page.waitForLoadState('networkidle');
```

---

## Quick Start -- Get started in 2 minutes

### Installation

```bash
# Create a new Playwright project from scratch
# npm init = create a Node.js project
# playwright@latest = latest version of Playwright
npm init playwright@latest

# OR add Playwright to an existing project
# -D = devDependency (only used during development, not needed for deployment)
npm install -D @playwright/test

# Install browsers for Playwright (Chromium, Firefox, WebKit)
npx playwright install
```

### Your first test

```typescript
// tests/example.spec.ts

// import = import a library
// test = function to create a test case
// expect = function to check results
import { test, expect } from '@playwright/test';

// test('test name', async ({ page }) => { ... })
// 'test name' = describes what the test does
// async = asynchronous function (needs to wait for browser)
// { page } = Playwright automatically creates a new browser tab for you
test('has correct title', async ({ page }) => {
  // goto() = open a URL in the browser
  await page.goto('https://playwright.dev');

  // expect(page).toHaveTitle() = check the page title
  // /Playwright/ = Regular Expression, matches "Playwright" anywhere
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link works', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // getByRole('link', { name: 'Get started' })
  // = find an element with role "link" and text "Get started"
  // click() = click on that link
  await page.getByRole('link', { name: 'Get started' }).click();

  // Check that the "Installation" heading is visible after clicking
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

### Running tests

```bash
# Run ALL tests
npx playwright test

# Run with UI mode (RECOMMENDED when writing tests)
# Opens a visual interface to see each test step
npx playwright test --ui

# Run with browser visible (normally Playwright runs headless)
# headed = show browser, headless = hide browser
npx playwright test --headed

# Run a specific file
npx playwright test tests/login.spec.ts

# Run tests containing the keyword "login" in the name
# -g = grep (filter by name)
npx playwright test -g "login"

# View report after running
npx playwright show-report
```

---

## Locators -- How to find elements on a web page

**Locator = the address of an element.** Just like you need a mailing address to send a letter, Playwright needs a locator to know where to click, where to type text.

### Priority order (IMPORTANT -- memorize this)

```
1. getByRole()        ← BEST -- most resilient
2. getByText()        ← Find by visible text
3. getByLabel()       ← Find form field by label
4. getByPlaceholder() ← Find input by placeholder
5. getByTestId()      ← Find by data-testid attribute
6. locator()          ← CSS/XPath -- use as LAST RESORT
```

### WHY does this order matter?

**getByRole() is best because:** Developers can change CSS classes at any time (`.btn-primary` to `.button-main`). But **an element's role almost NEVER changes** -- a button is still a button, a link is still a link, a heading is still a heading. Your tests still pass even if developers change the CSS.

**locator() (CSS/XPath) is worst because:** CSS classes change frequently. A developer renames `.login-btn` to `.signin-button` --> test fails immediately. You have to fix the test even though the application has no actual bugs.

### Detailed examples -- each line explained

```typescript
// ===== 1. getByRole -- BEST, use this first =====
// Find element by its ROLE (button, link, heading, textbox...)
// { name: 'Submit' } = has text "Submit"

// Find a button with text "Submit" and click it
await page.getByRole('button', { name: 'Submit' }).click();

// Find a link with text "Sign up" and click it
await page.getByRole('link', { name: 'Sign up' }).click();

// Find a heading with text "Welcome"
await page.getByRole('heading', { name: 'Welcome' });

// Find a text input with label "Email" and type an email
await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');

// Find a checkbox with label "Remember me" and check it
await page.getByRole('checkbox', { name: 'Remember me' }).check();


// ===== 2. getByText -- Find by visible text on screen =====
// Find element with text "Login" and click it
await page.getByText('Login').click();

// /welcome/i = Regular Expression
// i = case-insensitive
// Matches "welcome", "Welcome", "WELCOME", etc.
await page.getByText(/welcome/i);


// ===== 3. getByLabel -- Find form field by label =====
// HTML: <label for="email">Email Address</label><input id="email">
// Find input with label "Email Address" and type an email
await page.getByLabel('Email Address').fill('test@mail.com');


// ===== 4. getByPlaceholder -- Find input by placeholder =====
// HTML: <input placeholder="Enter your email">
await page.getByPlaceholder('Enter your email').fill('test@mail.com');


// ===== 5. getByTestId -- Find by data-testid attribute =====
// HTML: <button data-testid="submit-btn">Submit</button>
// Developers add data-testid specifically for QA testing
await page.getByTestId('submit-btn').click();


// ===== 6. CSS/XPath -- ONLY USE when no other option exists =====
// '#email-input' = CSS selector, find element with id="email-input"
await page.locator('#email-input').fill('test@mail.com');

// '.btn.primary' = CSS selector, find element with class="btn" AND class="primary"
await page.locator('.btn.primary').click();
```

### Chaining Locators -- Finding elements WITHIN elements

```typescript
// Problem: The page has 10 "Add to Cart" buttons, how to click the right one?
// Solution: Find the product card first, then find the button inside it

// Step 1: Find the product card containing text "iPhone 15"
// filter({ hasText: '...' }) = filter to only elements containing this text
const productCard = page.locator('.product-card').filter({ hasText: 'iPhone 15' });

// Step 2: Inside that card, find the "Add to Cart" button and click it
await productCard.getByRole('button', { name: 'Add to Cart' }).click();

// Similarly with tables: find the row containing text "Nguyen Van An"
const row = page.getByRole('row').filter({ hasText: 'Nguyen Van An' });
// Inside that row, find the "Edit" button and click it
await row.getByRole('button', { name: 'Edit' }).click();
```

---

## Actions -- Interacting with web pages

### Input

```typescript
// fill() = CLEAR the input field then type new text
// Use for most input scenarios
await page.getByLabel('Email').fill('test@mail.com');

// pressSequentially() = type EACH CHARACTER one at a time (like a real person typing)
// Use for auto-complete, search boxes (needs to trigger keyup events)
// { delay: 100 } = wait 100ms between each character
await page.getByLabel('Search').pressSequentially('iPhone', { delay: 100 });

// clear() = clear the input field
await page.getByLabel('Email').clear();

// selectOption() = select a value in a <select> dropdown
// Select by option value
await page.getByLabel('Country').selectOption('vietnam');
// Or select by visible option text
await page.getByLabel('Country').selectOption({ label: 'Viet Nam' });

// check() = check a checkbox or radio button
await page.getByLabel('Remember me').check();       // Check the checkbox
// uncheck() = uncheck a checkbox
await page.getByLabel('Remember me').uncheck();      // Uncheck the checkbox
// Radio buttons also use check()
await page.getByLabel('Male').check();               // Select "Male" radio

// setInputFiles() = upload a file
// Pass the path to the file to upload
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf');
// Upload multiple files at once -- pass an array
await page.getByLabel('Upload').setInputFiles(['file1.pdf', 'file2.pdf']);
```

### Click

```typescript
// click() = left-click (normal)
await page.getByRole('button', { name: 'Submit' }).click();

// dblclick() = double-click
await page.getByText('Edit').dblclick();

// click({ button: 'right' }) = right-click
// Commonly used to open context menus
await page.getByText('Item').click({ button: 'right' });

// click({ force: true }) = FORCE click, skip all checks
// Use when an element is covered by an overlay
// ONLY USE when necessary -- normally you should not use this
await page.getByRole('button', { name: 'Submit' }).click({ force: true });
```

### Navigation

```typescript
// goto() = open a URL in the browser
// Full URL
await page.goto('https://example.com');
// Relative URL (used with baseURL in config)
// If baseURL = 'https://example.com' then '/login' = 'https://example.com/login'
await page.goto('/login');

// goBack() = press the browser's Back button (go to previous page)
await page.goBack();

// goForward() = press the browser's Forward button (go to next page)
await page.goForward();

// reload() = reload the page (like pressing F5)
await page.reload();
```

---

## Assertions -- Checking results (pass or fail?)

Playwright assertions **automatically retry** until they pass or timeout. You **DON'T NEED to write sleep or wait** before assertions.

### Hard Assertion vs Soft Assertion

**Hard Assertion (default):** Like an exam that STOPS IMMEDIATELY when you get the first answer wrong. Wrong on question 1 --> you cannot attempt questions 2, 3, 4. You only know you got question 1 wrong, with no idea if you would have gotten others wrong too.

**Soft Assertion:** Like a normal exam -- finish the ENTIRE exam then count the errors. Wrong on question 1, continue with questions 2, 3, 4. At the end you find out: wrong on questions 1 and 3. **You see all failures at once.**

```typescript
// ===== HARD Assertion (default) =====
// If this line FAILS --> test STOPS IMMEDIATELY, does not continue
await expect(page.getByText('Welcome')).toBeVisible();
// If the above fails --> this line NEVER runs
await expect(page.getByText('Dashboard')).toBeVisible();

// ===== SOFT Assertion =====
// expect.soft() = record the FAIL but CONTINUE running the test
await expect.soft(page.getByText('Welcome')).toBeVisible();     // If fail --> record it, continue
await expect.soft(page.getByText('Dashboard')).toBeVisible();   // Still runs even if above failed
await expect.soft(page.getByText('Profile')).toBeVisible();     // Still continues
// At end of test: report ALL soft failures at once
// "Test failed because: Welcome not visible, Profile not visible"
```

**When to use Soft Assertion?**
- Checking multiple elements on a single page at once (dashboard has 10 widgets, check them all)
- When you want to see ALL failures, not just the first one

### Page Assertions -- Checking the web page

```typescript
// Check current URL
// toHaveURL() = URL must be exactly '/dashboard'
await expect(page).toHaveURL('/dashboard');
// Use regex to check that URL contains "dashboard"
await expect(page).toHaveURL(/.*dashboard/);

// Check page title (text shown on browser tab)
await expect(page).toHaveTitle('Dashboard - My App');
// Regex: title contains "Dashboard"
await expect(page).toHaveTitle(/Dashboard/);
```

### Element Assertions -- Checking elements

```typescript
// Create variables to reuse, so you don't repeat yourself
const submitBtn = page.getByRole('button', { name: 'Submit' });
const emailInput = page.getByLabel('Email');
const errorMsg = page.locator('.error-message');

// --- Visibility checks ---
// toBeVisible() = element MUST be visible on screen
await expect(submitBtn).toBeVisible();
// toBeHidden() = element MUST be hidden
await expect(errorMsg).toBeHidden();
// not.toBeVisible() = element must NOT be visible (similar to toBeHidden)
await expect(errorMsg).not.toBeVisible();

// --- Text checks ---
// toHaveText() = text must be EXACTLY 'Invalid email'
await expect(errorMsg).toHaveText('Invalid email');
// toContainText() = text CONTAINS 'Invalid' (does not need to be exact)
await expect(errorMsg).toContainText('Invalid');

// --- Input value checks ---
// toHaveValue() = value in the input must be 'test@mail.com'
await expect(emailInput).toHaveValue('test@mail.com');
// toBeEmpty() = input must be empty
await expect(emailInput).toBeEmpty();

// --- State checks ---
// toBeEnabled() = element is interactive (not disabled)
await expect(submitBtn).toBeEnabled();
// toBeDisabled() = element is disabled (grayed out, cannot click)
await expect(submitBtn).toBeDisabled();
// toBeChecked() = checkbox/radio is checked
await expect(page.getByLabel('Agree')).toBeChecked();

// --- Count checks ---
// toHaveCount(10) = there must be EXACTLY 10 matching elements
await expect(page.locator('.product-card')).toHaveCount(10);

// --- CSS checks ---
// toHaveCSS() = check element styles
await expect(errorMsg).toHaveCSS('color', 'rgb(255, 0, 0)');   // Red
// toHaveClass() = element has this class
await expect(submitBtn).toHaveClass(/primary/);

// --- Attribute checks ---
// toHaveAttribute() = element has attribute with specific value
await expect(page.locator('img')).toHaveAttribute('alt', 'Logo');
```

---

## Test Organization

### Describe & Test

```typescript
import { test, expect } from '@playwright/test';

// test.describe() = group related tests together
// Like a folder grouping files
test.describe('Login Feature', () => {

  // test.beforeEach() = run BEFORE EACH test in this group
  // Like a restaurant clearing the table before each new guest
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('user@mail.com');
    await page.getByLabel('Password').fill('Pass@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error with empty email', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  // test.skip() = SKIP this test (don't run it)
  // Use when a feature is not ready yet or is currently broken
  test.skip('should login with Google', async ({ page }) => {
    // TODO: implement when Google OAuth is ready
  });

  // test.only() = run ONLY this test, skip all others
  // Use when debugging a specific test
  // WARNING: remember to remove .only before committing code!
  // test.only('debug this test', async ({ page }) => { ... });
});
```

### Tags & Filtering

```typescript
// Tag tests by adding @tag to the test name
// @smoke = important test, run on every deploy
// @critical = extremely important test
test('checkout flow @smoke @critical', async ({ page }) => {
  // ...
});

// @regression = full test run (takes more time)
test('product review @regression', async ({ page }) => {
  // ...
});
```

```bash
# Run ONLY tests with the @smoke tag
# --grep = filter by pattern in test name
npx playwright test --grep @smoke

# Run ALL tests EXCEPT those with the @regression tag
# --grep-invert = inverse filter (exclude matching tests)
npx playwright test --grep-invert @regression
```

---

## API Testing -- Test APIs with Playwright (no Postman needed)

Playwright has **built-in API testing** -- you don't need separate tools like Postman or RestAssured.

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const API_URL = 'https://api.example.com';

  // { request } = Playwright automatically provides an object for API calls
  // Just like { page } for UI, { request } is for APIs
  test('GET /users should return users list', async ({ request }) => {

    // request.get() = send an HTTP GET request to the URL
    // Like typing a URL in the browser to view data
    const response = await request.get(`${API_URL}/users`);

    // Check HTTP status code = 200 (success)
    // 200 = OK, 201 = Created, 400 = Bad Request, 404 = Not Found, 500 = Server Error
    expect(response.status()).toBe(200);

    // response.json() = convert response body to a JavaScript object
    const body = await response.json();

    // Check that the users array has at least 1 element
    expect(body.length).toBeGreaterThan(0);
    // Check that the first element has 'name' and 'email' fields
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('email');
  });

  test('POST /users should create user', async ({ request }) => {

    // request.post() = send an HTTP POST request (create new data)
    // data = request body (data sent to the server)
    const response = await request.post(`${API_URL}/users`, {
      data: {
        name: 'Test User',
        email: 'test@mail.com'
      }
    });

    // 201 = Created (successfully created)
    expect(response.status()).toBe(201);

    const user = await response.json();
    expect(user.name).toBe('Test User');
    // toBeDefined() = the 'id' field must exist (auto-generated by server)
    expect(user.id).toBeDefined();
  });

  // BIG FEATURE: Combine API + UI in the same test
  // Use API to SET UP quickly, use UI to VERIFY
  test('API + UI: Create via API, verify on UI', async ({ request, page }) => {

    // Step 1: Create user via API (FASTER than creating through UI)
    // Instead of: goto login page -> fill form -> click register -> ...
    // Just 1 API call and done
    const response = await request.post(`${API_URL}/users`, {
      data: { name: 'UI Test User', email: 'uitest@mail.com' }
    });
    const user = await response.json();

    // Step 2: Open the web page and verify the user just created is displayed correctly
    await page.goto(`/users/${user.id}`);
    await expect(page.getByText('UI Test User')).toBeVisible();
  });
});
```

---

## Configuration

### playwright.config.ts

```typescript
// defineConfig = function to create Playwright configuration
// devices = list of available devices (Desktop Chrome, iPhone 14...)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Directory containing all test files
  testDir: './tests',

  // fullyParallel = true: run all tests IN PARALLEL (simultaneously)
  // Much faster than running sequentially (one test finishes before the next starts)
  fullyParallel: true,

  // forbidOnly: forbid test.only on CI (automated environment)
  // If you forget to remove test.only --> CI will error instead of running just 1 test
  // process.env.CI = environment variable, has a value on CI servers
  // !! = convert value to true/false
  forbidOnly: !!process.env.CI,

  // retries = number of times to retry when a test fails
  // On CI: retry 2 times (CI often has environment issues)
  // On local: no retries (0) so you see failures immediately
  retries: process.env.CI ? 2 : 0,

  // workers = number of tests running CONCURRENTLY
  // On CI: 1 worker (more stable)
  // On local: undefined = automatically choose based on CPU count
  workers: process.env.CI ? 1 : undefined,

  // reporter = how to display test results
  reporter: [
    ['html', { open: 'never' }],      // Generate HTML report (open in browser)
    ['list'],                           // Display in terminal (console)
    // ['junit', { outputFile: 'results.xml' }],  // For CI/CD tools to read
  ],

  // use = SHARED configuration for ALL tests
  use: {
    // baseURL = root URL of the application
    // When you write page.goto('/login') --> becomes 'https://staging.example.com/login'
    baseURL: 'https://staging.example.com',

    // Take screenshot when test fails (to see where the error is)
    screenshot: 'only-on-failure',

    // Record video when test fails
    video: 'retain-on-failure',

    // Trace = record the ENTIRE test process (see Debugging section below)
    trace: 'retain-on-failure',

    // Timeout for each action (click, fill, expect...)
    // 10000 = 10 seconds. If not done in 10 seconds --> fail
    actionTimeout: 10000,
  },

  // projects = list of browsers/devices to test on
  // The same test will run on MULTIPLE browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },    // Chrome on desktop
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },   // Firefox on desktop
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },    // Safari on desktop
    },
    // Mobile -- test on phones (emulation, not real devices)
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },           // Android phone
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },          // iPhone
    },
  ],
});
```

---

## Debugging -- Finding and fixing errors in tests

### 1. UI Mode (RECOMMENDED)

```bash
npx playwright test --ui
```

Opens a visual interface: see each test step as it runs, click on any step to view the DOM snapshot at that point in time. **This is the best way to understand what your test is doing.**

### 2. Debug Mode -- Playwright Inspector

```bash
# Open Playwright Inspector -- step through each action
npx playwright test --debug

# Debug a specific file
npx playwright test tests/login.spec.ts --debug
```

The Inspector lets you: run step-by-step, view locators, and try new locators.

### 3. Trace Viewer -- "Security camera" that replays your test

**Trace Viewer is like a security camera replay.** You can rewind time and see EXACTLY what happened at each step of the test.

```bash
# View trace after a test fails
npx playwright show-trace trace.zip
```

Trace records:
- **Screenshots** at EVERY step (before and after each action)
- **DOM snapshot** -- the page HTML at that moment (you can inspect elements)
- **Network requests** -- all API calls, images, CSS loaded
- **Console logs** -- JavaScript errors in the browser
- **Timing** -- how long each step took

**When to use Trace?**
- Test fails on CI but passes on your machine --> view the CI trace to understand why
- Test fails overnight (nobody watching) --> view the trace the next morning
- Hard-to-reproduce bug --> view the trace to see exactly which step went wrong

### 4. Codegen -- "Playwright watches you click, then writes code for you"

```bash
# Open browser, you click on the web page, Playwright auto-generates code
npx playwright codegen https://example.com
```

**What is Codegen?** You open a web page, click buttons, type text, select dropdowns... and Playwright **automatically writes the corresponding code** for you. It's like having someone sitting next to you, noting down every action as code.

Codegen is very useful when:
- **Finding the right locator** -- you click on an element, Codegen gives you the best locator
- **Generating code quickly** -- click and you have code, just copy-paste into your test
- **Learning syntax** -- beginners can see Codegen-generated code to understand how to write tests
- **Quick testing** -- try a flow quickly before writing the official test

---

## Real-world Example: E-commerce Test Suite

```typescript
// tests/checkout/checkout-flow.spec.ts
// Test the checkout process -- from login to successful order

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

// @smoke = run on every deploy
// @critical = extremely important test, fail = do not deploy
test.describe('Checkout Flow @smoke @critical', () => {

  // Declare variables for all Page Objects
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // Before each test: create Page Objects and login
  test.beforeEach(async ({ page }) => {
    // Create Page Object instances
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.login('customer@test.com', 'Pass@123');
  });

  test('should complete checkout with valid payment', async ({ page }) => {
    // Step 1: Find and add product to cart
    await productPage.searchProduct('iPhone 15');
    await productPage.addToCart('iPhone 15');

    // Step 2: Go to cart, verify
    await cartPage.goto();
    await cartPage.expectItemCount(1);          // Must have 1 product
    await cartPage.expectTotalGreaterThan(0);   // Total > 0

    // Step 3: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 4: Fill shipping information
    await checkoutPage.fillShipping({
      address: '123 Nguyen Hue',
      city: 'Ho Chi Minh',
      phone: '0901234567'
    });

    // Step 5: Fill payment information
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',    // Test card number (Visa)
      expiry: '12/28',                   // Expiration date
      cvv: '123'                         // Security code
    });
    await checkoutPage.placeOrder();             // Click place order button

    // Step 6: Verify order success
    await checkoutPage.expectOrderSuccess();
    const orderId = await checkoutPage.getOrderId();
    // toMatch() = check using regex
    // /^ORD-\d+$/ = starts with "ORD-" followed by digits
    expect(orderId).toMatch(/^ORD-\d+$/);
  });

  test('should show error with expired card', async ({ page }) => {
    // Add product and go to checkout
    await productPage.addToCart('iPhone 15');
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    // Fill shipping information
    await checkoutPage.fillShipping({
      address: '123 Main St', city: 'HCM', phone: '0901234567'
    });

    // Fill an EXPIRED card (01/20 = January 2020 -- already past)
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',
      expiry: '01/20',    // Expired!
      cvv: '123'
    });
    await checkoutPage.placeOrder();

    // Verify expired card error is displayed
    await checkoutPage.expectPaymentError('Card has expired');
  });
});
```

---

## Common Mistakes

### ❌ Forgetting `await` before each action
> ✅ **Every browser interaction needs `await`** — `await page.click()`, `await page.fill()`, `await expect()`. Missing `await` = the test runs but doesn't actually wait for results.
> 💡 **Why:** Without `await`, Playwright fires-and-forgets — the click hasn't finished but the next line already runs. Tests pass sometimes and fail sometimes (flaky) with no obvious reason. The TypeScript compiler will warn, but many people ignore it.

### ❌ Hardcoding test data in test files
> ✅ **Separate test data into dedicated files** — use JSON, .env, or fixtures. Test files should contain only logic, not `'user@mail.com'` or `'Pass@123'` scattered everywhere.
> 💡 **Why:** When switching environments (staging → production), you'd have to edit 50 files instead of 1 data file. And hardcoded passwords in code = security risk when pushed to Git.

### ❌ Not using `data-testid` — relying on CSS classes or complex XPath
> ✅ **Ask developers to add `data-testid` to important elements** — `<button data-testid="submit-order">`. Use `page.getByTestId('submit-order')`.
> 💡 **Why:** CSS classes change when developers refactor the UI (`.btn-primary` → `.button-main`). Long XPath expressions break easily when DOM structure changes. `data-testid` exists ONLY for testing — nobody changes it accidentally.

### ❌ Using flaky selectors — `.container > div:nth-child(3) > span`
> ✅ **Priority order: `getByRole()` > `getByText()` > `getByTestId()` > CSS selector.** Only use CSS/XPath when there is no other option.
> 💡 **Why:** Selectors based on DOM structure break immediately when a developer adds a `<div>` wrapper. `getByRole('button', { name: 'Submit' })` still works even if the HTML structure changes completely.

### ❌ Not using `beforeEach` for setup — copy-pasting login code into every test
> ✅ **Use `test.beforeEach()` or custom Fixtures** for shared setup (login, navigate, create data).
> 💡 **Why:** DRY — when the login flow changes, you fix 1 place instead of 30 places. Fixtures also automatically teardown (clean up) after each test.

---

## Chapter Summary

| Feature | Meaning | Why it matters |
|---|---|---|
| **Architecture** | Communicates DIRECTLY with browser (no middleman) | 2-3x faster than Selenium |
| **Auto-wait** | Automatically waits for elements to be ready before interacting | Reduces flaky tests by 90%, no need to write waits |
| **Locators** | getByRole > getByText > getByTestId > CSS | Tests don't fail when developers change CSS |
| **Assertions** | Auto-retry, with hard and soft assertions | Hard = stop immediately on fail, Soft = run all then count failures |
| **Trace Viewer** | Security camera that replays the entire test | See exactly which step failed, even if you weren't there when the test ran |
| **Codegen** | Watches you click, writes code automatically | Find locators fast, generate boilerplate code |
| **API Testing** | Built-in API testing, combine API + UI | No need for Postman, API setup is faster than UI |
| **Multi-browser** | Chromium + Firefox + WebKit + Mobile | One test runs on multiple browsers automatically |

::: tip Next steps
- Now that you know Playwright --> Check out [Selenium](./selenium) for comparison
- Want to know which tool to choose --> See [Automation Strategy](./automation-strategy)
:::
