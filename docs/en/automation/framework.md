# Automation Framework

## Design Patterns — You Need to Understand This Concept First

Before we talk about Frameworks, you need to understand what a **Design Pattern** is.

**A Design Pattern is a NAMED SOLUTION for a problem that keeps recurring.** It's like a cooking recipe that many chefs independently discover — it works well, so people give it a name to make it easy to share.

> Imagine: 1000 programmers solve the same problem, and they independently arrive at the same solution. That solution gets a name = Design Pattern.

### 3 Design Patterns That QAs Need to Know

| Pattern | Meaning | Real-World Example |
|---|---|---|
| **Singleton** | There is only ONE of something | There's only 1 database connection in the entire system. Like a school having only 1 principal — you don't create a second one. |
| **Factory** | Creates something for you | You say "I need a user", the Factory creates the user for you. You don't need to know how the user is created — just like ordering food at a restaurant without knowing how the kitchen prepares it. |
| **Page Object Model (POM)** | Organizes test code by page | Each web page = 1 separate code file. This is the **MOST IMPORTANT** pattern for QA Automation. |

---

## Page Object Model (POM) — The Most Important Pattern

### The Problem BEFORE (the PAIN) — Why Does POM Exist?

Imagine you're working on an e-commerce project. You write 200 test files. In 50 of them, you need to log in:

```typescript
// File 1: login.spec.ts
test('login successfully', async ({ page }) => {
  // '#email-input' is a CSS selector — a way to find an element on the web page
  // fill() fills text into an input
  await page.fill('#email-input', 'user@mail.com');     // Locator is hardcoded
  await page.fill('#password-input', 'Pass@123');        // Locator is hardcoded
  await page.click('button.login-btn');                  // Locator is hardcoded
  await expect(page).toHaveURL('/dashboard');
});

// File 2: profile.spec.ts
test('update profile after login', async ({ page }) => {
  await page.fill('#email-input', 'user@mail.com');      // DUPLICATE! Same as file 1
  await page.fill('#password-input', 'Pass@123');         // DUPLICATE! Same as file 1
  await page.click('button.login-btn');                   // DUPLICATE! Same as file 1
  // ... update profile
});

// File 3: order.spec.ts — duplicated again
// File 4: cart.spec.ts — duplicated again
// ... 50 more files with the same copy-paste
```

**Now the developer changes `#email-input` to `#user-email`.**

Result: **You have to open 50 files, find and fix each one.** Miss 1 file = 1 failing test. This is the nightmare of every QA Automation engineer.

### The Solution: Page Object Model

The idea is extremely simple: **Group all locators and actions for a page into a single file.** When the developer changes something, you only edit 1 file.

```typescript
// pages/LoginPage.ts — EVERYTHING about the Login page lives here

// import = bring in a library from outside into this file
// Page = an object representing a browser tab (provided by Playwright)
// Locator = an object representing an element on the page (button, input, text...)
// expect = a function for checking results (pass or fail)
import { Page, Locator, expect } from '@playwright/test';

// export = allow other files to use this class
// class = a blueprint for creating objects
// LoginPage = class name, named after the web page
export class LoginPage {

  // private = can only be used INSIDE this class, not visible outside
  // page: Page = variable "page" with data type "Page"
  private page: Page;

  // Locator = the address of an element on the web page
  // Like a home address — you save it once, use it many times
  private emailInput: Locator;       // Email input field
  private passwordInput: Locator;    // Password input field
  private loginButton: Locator;      // Login button
  private errorMessage: Locator;     // Error message

  // constructor = a function that runs AUTOMATICALLY when a new object is created
  // When you write: new LoginPage(page) --> the constructor runs
  // Like when you're born, you automatically have a name and blood type — automatic, no calling needed
  constructor(page: Page) {
    // this = this very object (itself)
    // this.page = store "page" inside the object for later use
    this.page = page;

    // page.locator() = find an element on the page using a CSS selector
    // '#email-input' = find the element with id="email-input"
    this.emailInput = page.locator('#email-input');

    // '#password-input' = find the element with id="password-input"
    this.passwordInput = page.locator('#password-input');

    // 'button.login-btn' = find the <button> tag with class="login-btn"
    this.loginButton = page.locator('button.login-btn');

    // '.error-message' = find the element with class="error-message"
    this.errorMessage = page.locator('.error-message');
  }

  // async = this function runs ASYNCHRONOUSLY (takes time, must wait)
  // Because the browser needs time to load pages, click, enter text...
  // Whenever a function has "await" inside it --> must declare "async"
  async goto() {
    // await = WAIT for this action to finish before continuing
    // goto() = navigate the browser to a URL
    await this.page.goto('/login');
  }

  // email: string = parameter "email" with data type string
  // password: string = parameter "password" with data type string
  async login(email: string, password: string) {
    // fill() = clear the input field then type text into it
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    // click() = click on the element
    await this.loginButton.click();
  }

  // Promise<string> = this function RETURNS a string (but must wait)
  // Promise = a "promise" that "I will return a result, just not sure when"
  async getError(): Promise<string> {
    // textContent() = get the text content of an element
    // || '' = if there's no text, return an empty string
    return await this.errorMessage.textContent() || '';
  }

  // Assertions — verify results
  async expectLoginSuccess() {
    // expect(page).toHaveURL() = verify the current URL is correct
    await expect(this.page).toHaveURL('/dashboard');
  }

  async expectErrorVisible(message: string) {
    // toBeVisible() = verify the element is visible on screen
    await expect(this.errorMessage).toBeVisible();
    // toContainText() = verify the element contains this text
    await expect(this.errorMessage).toContainText(message);
  }
}
```

Now the test code becomes **extremely clean**:

```typescript
// tests/login.spec.ts — clean test, reads like a requirement

// import LoginPage from the file pages/LoginPage.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// test.describe() = group tests together by feature
test.describe('Login Feature', () => {

  // let = declare a variable (value can be changed later)
  // loginPage: LoginPage = variable with data type LoginPage
  let loginPage: LoginPage;

  // beforeEach = runs BEFORE EACH test in this group
  // Like a restaurant setting the table before each guest
  test.beforeEach(async ({ page }) => {
    // new LoginPage(page) = create a new LoginPage object
    // This is when the constructor runs
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async () => {
    // Reads like English: loginPage.login('email', 'pass')
    // No locators visible — clean!
    await loginPage.login('user@mail.com', 'Pass@123');
    await loginPage.expectLoginSuccess();
  });

  test('should show error with invalid email', async () => {
    await loginPage.login('invalid-email', 'Pass@123');
    await loginPage.expectErrorVisible('Invalid email format');
  });

  test('should show error with wrong password', async () => {
    await loginPage.login('user@mail.com', 'wrong');
    await loginPage.expectErrorVisible('Incorrect password');
  });
});
```

**Result:** The developer changes `#email-input` to `#user-email` --> you only edit a SINGLE line in `LoginPage.ts`. The 50 test files don't need any changes.

---

## BasePage — Inheritance

### What Is Inheritance?

**Inheritance is like children inheriting traits from their parents.** Children have eyes, a nose, hands and feet — all "inherited" from their parents without having to create them on their own.

In code: **BasePage is the "parent"**, and other Pages are the "children". Children automatically have all of the parent's methods.

```typescript
// pages/BasePage.ts — "Parent" of all Page Objects

import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  // protected = like private, but CHILDREN can also use it
  // private = only I can use it
  // protected = I AND my children can use it
  // public = anyone can use it
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common methods that every page needs
  // All "children" will automatically have these methods

  // Wait for the page to fully load
  // 'networkidle' = no more pending network requests
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  // Get the page title
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // Take a screenshot
  // name: string = the screenshot file name
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  // Scroll to the bottom of the page
  // evaluate() = run JavaScript on the actual browser
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
```

```typescript
// pages/ProductPage.ts — "Child" that inherits from BasePage

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// extends = inherits, "ProductPage is a child of BasePage"
// ProductPage automatically has: waitForPageLoad(), getTitle(), takeScreenshot(), scrollToBottom()
export class ProductPage extends BasePage {
  private searchInput: Locator;
  private searchButton: Locator;
  private productCards: Locator;     // List of product cards
  private sortDropdown: Locator;     // Sort dropdown

  constructor(page: Page) {
    // super(page) = call the PARENT's constructor (BasePage)
    // Must call super() before using "this"
    // Like: before doing your own thing, finish the family's shared tasks first
    super(page);

    // [data-testid="search-input"] = find element with attribute data-testid="search-input"
    // This is the best way to set locators — developers add data-testid for QA
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('[data-testid="search-btn"]');
    this.productCards = page.locator('[data-testid="product-card"]');
    this.sortDropdown = page.locator('[data-testid="sort-select"]');
  }

  // Search for a product
  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    // waitForPageLoad() — this method comes from BasePage (parent)!
    // ProductPage didn't declare it but can still use it — thanks to inheritance
    await this.waitForPageLoad();
  }

  // Count the number of displayed products
  // count() = count the number of elements matching the locator
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  // Sort products
  // 'price-asc' | 'price-desc' | 'name' | 'newest' = only these 4 values are accepted
  // This is a Union Type in TypeScript — restricts the allowed input values
  async sortBy(option: 'price-asc' | 'price-desc' | 'name' | 'newest') {
    // selectOption() = select a value in a dropdown <select>
    await this.sortDropdown.selectOption(option);
    await this.waitForPageLoad();
  }

  // Get all product names
  // Promise<string[]> = returns an ARRAY of strings
  async getProductNames(): Promise<string[]> {
    // .locator('.product-name') = find child elements with class="product-name"
    // allTextContents() = get the text of ALL matching elements (returns an array)
    return await this.productCards.locator('.product-name').allTextContents();
  }

  // Verify the product count
  async expectProductCount(count: number) {
    // toHaveCount() = verify the number of elements
    await expect(this.productCards).toHaveCount(count);
  }
}
```

**Inheritance summary:**
- `BasePage` has 4 common methods (waitForPageLoad, getTitle, takeScreenshot, scrollToBottom)
- `ProductPage extends BasePage` --> automatically has those 4 methods + its own additional methods
- `LoginPage extends BasePage` --> also automatically has those 4 methods
- Fix 1 method in BasePage --> all Page Objects are updated

---

## Data-Driven Testing — Same Recipe, Different Ingredients

### The Core Idea

**Data-Driven Testing = same recipe, but with many different ingredients.**

Real-world example: You're testing a login form with invalid emails. There are 10 kinds of invalid emails:
- Empty email ("")
- Email without @
- Email without a domain
- Email with special characters
- ... and 6 more

**Without Data-Driven:** You write 10 tests, each differing only in the email and error message. 90% of the code is identical = WASTEFUL.

**With Data-Driven:** You write 1 test + 1 data file with 10 rows = 10 test cases automatically. Add 1 row of data = add 1 test case. **NO ADDITIONAL CODE NEEDED.**

### How to Do It

**Step 1: Create the data file (ingredients)**
```json
// fixtures/test-data/login-data.json
// JSON = a data storage format, like an Excel spreadsheet but for computers to read
{
  "validLogin": {
    "email": "user@mail.com",
    "password": "Pass@123"
  },
  "invalidEmails": [
    { "email": "", "error": "Email is required" },
    { "email": "invalid", "error": "Invalid email format" },
    { "email": "no-domain@", "error": "Invalid email format" },
    { "email": "test@.com", "error": "Invalid email format" },
    { "email": "@gmail.com", "error": "Invalid email format" },
    { "email": "has space@gmail.com", "error": "Invalid email format" }
  ],
  "invalidPasswords": [
    { "password": "", "error": "Password is required" },
    { "password": "short", "error": "Min 8 characters" },
    { "password": "no-uppercase1!", "error": "Must contain uppercase" },
    { "password": "NOLOWERCASE1!", "error": "Must contain lowercase" }
  ]
}
```

**Step 2: Write 1 test that works for all data (the recipe)**
```typescript
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

// import data from the JSON file
// loginData now contains all the data above
import loginData from '../../fixtures/test-data/login-data.json';

test.describe('Login - Invalid Email', () => {

  // for...of = iterate through each element in the array
  // loginData.invalidEmails is an array with 6 elements
  // Each iteration, "data" is one element: { email: "...", error: "..." }
  for (const data of loginData.invalidEmails) {

    // Template literal: `text ${variable}` = embed a variable in the string
    // data.email || '(empty)' = if email is empty, show "(empty)"
    test(`should show error for email: "${data.email || '(empty)'}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      // Each iteration, email and error are different
      await loginPage.login(data.email, 'Pass@123');
      await loginPage.expectErrorVisible(data.error);
    });
  }
});

// RESULT: 6 rows of data --> 6 test cases automatically:
// should show error for email: "(empty)"
// should show error for email: "invalid"
// should show error for email: "no-domain@"
// should show error for email: "test@.com"
// should show error for email: "@gmail.com"
// should show error for email: "has space@gmail.com"
//
// Add 1 row to the JSON = automatically get 1 more test. NO CODE CHANGES NEEDED.
```

---

## Fixtures Pattern — Automatic Setup Before Each Test

### What Are Fixtures?

**Fixtures = preparation (setup) that happens AUTOMATICALLY before each test.**

Like a restaurant: before each guest (test), the staff automatically clears the table, lays the cloth, and sets out utensils (setup). The guest sits down and eats right away — no self-service needed. After the guest leaves, the staff cleans up (teardown).

In testing:
- **Setup** = pre-login, pre-create data, pre-navigate to the page
- **Teardown** = delete data, logout, close connections
- **Fixture** = the umbrella term for all these setup + teardown steps

### How to Create Custom Fixtures in Playwright

```typescript
// fixtures/auth.fixture.ts

// import test from Playwright and rename it to "base"
// because we'll create a NEW test based on the original
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

// type = define a new data type
// MyFixtures = data type describing our custom fixtures
type MyFixtures = {
  loginPage: LoginPage;              // Fixture 1: login page ready to go
  cartPage: CartPage;                // Fixture 2: cart page ready to go
  authenticatedPage: LoginPage;      // Fixture 3: already LOGGED IN
};

// base.extend<MyFixtures> = extend the original test, adding new fixtures
// Like: take the original test, attach "accessories" (fixtures) to it
export const test = base.extend<MyFixtures>({

  // Fixture "loginPage": create a LoginPage and navigate to the login page
  // { page } = get the page object from Playwright (built-in)
  // use = "this is the value the test will receive"
  loginPage: async ({ page }, use) => {
    // SETUP: create LoginPage and open the login page
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // use(loginPage) = hand loginPage to the test
    // The test runs IN BETWEEN here...
    await use(loginPage);

    // TEARDOWN: code after use() runs AFTER the test finishes
    // (nothing to clean up here)
  },

  // Fixture "authenticatedPage": ALREADY LOGGED IN
  // Tests receiving this fixture = already authenticated, no need to log in
  authenticatedPage: async ({ page }, use) => {
    // SETUP: log in ahead of time for the test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@mail.com', 'Pass@123');
    await loginPage.expectLoginSuccess();

    // Hand the loginPage (already logged in) to the test
    await use(loginPage);
  },

  // Fixture "cartPage": create a CartPage ready to use
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  }
});

// Re-export expect so other test files can use it
export { expect } from '@playwright/test';
```

```typescript
// tests/cart/add-to-cart.spec.ts — USING custom fixtures

// IMPORTANT: import from the fixture file, NOT from '@playwright/test'
// This way the test has access to our custom fixtures
import { test, expect } from '../../fixtures/auth.fixture';

// authenticatedPage = already logged in (fixture handles everything)
// cartPage = already created (fixture handles everything)
// The test only needs to focus on testing, not setup
test('should add product to cart', async ({ authenticatedPage, cartPage, page }) => {
  // authenticatedPage is already logged in — NO NEED to log in again!
  // Like a guest sitting down at a pre-set table — eat right away
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart-1"]');
  // ... verify cart
});
```

---

## Real-World Project Structure — What Each Folder Is For

### Standard Structure for Playwright + TypeScript

```
automation-project/
│
├── tests/                          # Contains ALL test files (.spec.ts)
│   │                               # Organized by feature/module of the application
│   ├── auth/                       # Tests related to authentication
│   │   ├── login.spec.ts           # Login tests
│   │   ├── register.spec.ts        # Registration tests
│   │   └── forgot-password.spec.ts # Forgot password tests
│   ├── products/                   # Tests related to products
│   │   ├── search.spec.ts          # Product search tests
│   │   ├── filter.spec.ts          # Product filter tests
│   │   └── product-detail.spec.ts  # Product detail page tests
│   ├── cart/                       # Tests related to the shopping cart
│   │   ├── add-to-cart.spec.ts     # Add product to cart tests
│   │   └── update-cart.spec.ts     # Update cart tests
│   └── checkout/                   # Tests related to checkout
│       ├── checkout-flow.spec.ts   # Checkout flow tests
│       └── payment.spec.ts         # Payment method tests
│
├── pages/                          # Contains ALL Page Objects
│   │                               # Each file = 1 web page = 1 class
│   ├── BasePage.ts                 # "Parent" — common methods (screenshot, scroll...)
│   ├── LoginPage.ts                # Page Object for the login page
│   ├── RegisterPage.ts             # Page Object for the registration page
│   ├── ProductPage.ts              # Page Object for the product page
│   ├── CartPage.ts                 # Page Object for the cart page
│   └── CheckoutPage.ts            # Page Object for the checkout page
│
├── fixtures/                       # Contains test data and custom fixtures
│   ├── test-data/                  # Test data (separated from code)
│   │   ├── users.json              # User data (email, password...)
│   │   ├── products.json           # Product data (name, price...)
│   │   └── payments.json           # Payment data (card number, CVV...)
│   └── auth.fixture.ts            # Custom fixture (pre-login, pre-create data...)
│
├── utils/                          # Helper tools (utility functions)
│   ├── api-helper.ts              # Call APIs for setup/teardown (create users, delete data...)
│   ├── db-helper.ts               # Query the database directly (verify data)
│   └── data-generator.ts          # Generate random data (random email, phone...)
│
├── playwright.config.ts            # Playwright CONFIGURATION (browser, timeout, baseURL...)
├── package.json                    # Manage libraries (dependencies)
├── tsconfig.json                   # TypeScript configuration
└── .github/
    └── workflows/
        └── test.yml                # CI/CD pipeline — automatically run tests when code is pushed
```

### Small Projects vs Large Projects

**Small project (1-2 QAs, under 100 tests):**
```
project/
├── tests/           # No subfolders needed — all files in one place
├── pages/           # Still need Page Objects!
├── playwright.config.ts
└── package.json
```

**Large project (3+ QAs, 100+ tests):**
```
project/
├── tests/           # MUST organize by feature/module
│   ├── auth/
│   ├── products/
│   ├── checkout/
│   └── admin/
├── pages/
├── fixtures/        # Custom fixtures + separate test data
├── utils/           # Helper functions
├── scripts/         # Setup/teardown scripts (create DB, seed data...)
├── .github/workflows/
└── playwright.config.ts
```

---

## CI/CD Pipeline — Automatically Run Tests When Code Is Pushed

```yaml
# .github/workflows/test.yml
# This file tells GitHub: "Every time code is pushed, automatically run the tests"

name: Automation Tests      # Pipeline name

on:                         # When to run?
  push:
    branches: [main, develop]   # When pushing to the main or develop branch
  pull_request:
    branches: [main]            # When creating a Pull Request to main

jobs:
  test:
    runs-on: ubuntu-latest      # Run on a virtual Ubuntu machine (free from GitHub)
    steps:
      - uses: actions/checkout@v4          # Step 1: download the source code
      - uses: actions/setup-node@v4        # Step 2: install Node.js
        with:
          node-version: 20
      - run: npm ci                        # Step 3: install libraries (dependencies)
      - run: npx playwright install --with-deps   # Step 4: install browsers for Playwright
      - run: npx playwright test           # Step 5: RUN TESTS
      - uses: actions/upload-artifact@v4   # Step 6: save the report
        if: always()                       # Save the report WHETHER tests pass or fail
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Best Practices — Golden Rules

### File Naming Conventions

```
tests/
  login.spec.ts          <- feature-name.spec.ts (lowercase, hyphens)
  product-search.spec.ts <- kebab-case (lowercase-with-hyphens)

pages/
  LoginPage.ts           <- PascalCase + "Page" suffix (CapitalizedWords + "Page")
  ProductPage.ts

fixtures/
  test-data/users.json   <- kebab-case (lowercase-with-hyphens)
```

### 5 Rules for Writing Page Objects

1. **1 page = 1 class** — don't mix 2 pages into 1 file
2. **Locators go in the constructor** — easy to find, easy to fix, all in one place
3. **Method names describe the action** — `login()`, `searchProduct()`, NOT `clickButton()`
4. **Assertions go in the Page Object** — `expectLoginSuccess()` rather than in the test file
5. **Use data-testid** — `[data-testid="login-btn"]` instead of `.btn.primary` (CSS classes change often)

### 4 Rules for Writing Tests

1. **1 test = 1 scenario** — don't test multiple things in 1 test
2. **Tests are independent** — test A doesn't depend on test B (test A failing shouldn't make test B fail)
3. **Arrange, Act, Assert** — Set up data, Perform the action, Verify the result
4. **Test names describe the scenario** — `should show error when password is empty` (read it and you know what the test does)

---

## Common Mistakes

### Too many layers of abstraction
**Fix:** Keep it simple: Test --> Page Object --> Browser. Don't create BasePage --> AbstractPage --> BaseComponent --> PageFactory if the project only has 20 tests.
**Why:** Each layer adds complexity. A new team member spends 2 days just understanding the architecture instead of writing tests. Over-engineering is worse than under-engineering.

### Page Object is too large — 1 file with 500+ lines
**Fix:** Break it down by component/section — `CheckoutPage` can be split into `ShippingForm`, `PaymentForm`, `OrderSummary` if each part is complex.
**Why:** A 500-line file = hard to find methods, hard to maintain, easy to conflict when 2 people edit simultaneously. Rule of thumb: a Page Object should be under 200 lines.

### Mixing test logic into Page Objects
**Fix:** Page Objects should only contain locators + actions + basic assertions. Business logic, conditional flows, and test data decisions belong in the test file.
**Why:** A Page Object is the "API of the web page" — it describes what the page HAS and what it CAN DO. It doesn't decide the test scenario. Mixing them = hard to reuse, hard to read.

### Not using BasePage when you have 5+ Page Objects
**Fix:** Create a BasePage for shared methods — `waitForPageLoad()`, `takeScreenshot()`, `getTitle()` should be in BasePage, not copy-pasted into each Page.
**Why:** DRY (Don't Repeat Yourself). Fix the wait logic once in BasePage = all Pages are updated. Copy-paste = fix 10 places, miss 1 place = bug.

## Multiple Perspectives

| Approach | Description | Best When |
|---|---|---|
| **Strict POM** | Every interaction MUST go through a Page Object. Test files have no locators at all. | Large projects (100+ tests), multiple QAs working together, need consistency and maintainability |
| **Lightweight POM** | Page Objects for main pages, but simple tests can use locators directly. | Small projects (under 30 tests), 1 QA working alone, prioritizing speed of writing tests |
| **Screenplay Pattern** | Organized by Actor --> Task --> Action instead of by Page. More abstract than POM. | Experienced team, project needs to describe complex business flows |
| **No pattern** | Write tests directly, no Page Objects. | Proof of concept, spike, or project with under 10 tests that nobody will maintain |

**Advice:** Start with basic POM. If it works well --> keep it. If you find it lacking --> expand gradually. Don't start with the most complex architecture before writing your first test.

---

## Chapter Summary

| Pattern | Problem It Solves | When to Use |
|---|---|---|
| **Page Object Model** | Locators duplicated across 50 files, changing 1 thing = editing 50 files | Every project (MANDATORY) |
| **BasePage** | Multiple Pages share the same methods, copy-paste everywhere | When you have more than 3 Page Objects |
| **Data-Driven** | 10 test cases are 90% identical, only the data differs | When testing many input variations |
| **Fixtures** | Must log in before every test, copy-paste setup code | When many tests need the same setup |
| **CI/CD** | Forgetting to run tests before deploying, bugs reaching production | Every project (RECOMMENDED) |
