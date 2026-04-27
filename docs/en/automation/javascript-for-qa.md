# JavaScript & TypeScript for QA

## ESSENCE: What Is JavaScript? Why Do QAs Need to Learn It?

> **Essence:** JavaScript is a **programming language** — a way for you to "talk" to a computer and tell it what to do. Just as you use your native language to communicate with people, you use JavaScript to communicate with computers.

### Why JavaScript and Not Another Language?

```
JavaScript / TypeScript
├── Web Automation  : Playwright, Cypress, WebdriverIO
├── API Testing     : Playwright API, Supertest, Axios
├── Unit Testing    : Jest, Vitest, Mocha
├── Mobile Testing  : Appium (JS client), Detox
└── Performance     : K6 (JS-based scripting)
```

> Learn **1 language**, use it for **every type of testing**. That's why we choose JavaScript.

---

## Node.js — From a Fish in a Tank to the Open Ocean

### ESSENCE: What Is Node.js?

> **Essence:** JavaScript was originally born to **run only inside the browser**. It was like a fish that could only live in an aquarium. Then one day, someone took the JavaScript engine **out of the browser** and made it run ANYWHERE — on servers, on your computer, in CI/CD pipelines. That is **Node.js**. It's like someone invented a **portable water tank** so the fish can travel everywhere.

**Without Node.js:** JavaScript can only run when you open a browser.
**With Node.js:** JavaScript can run anywhere — including your automation tests.

```bash
# Check if Node.js is installed
node --version   # v20.x.x or newer

# Run a JavaScript file with Node.js
# (no browser needed!)
node hello.js
```

::: tip AHA MOMENT
When you run `npx playwright test`, Node.js is actually running your JavaScript/TypeScript code. No Node.js = can't run Playwright. Node.js is the **foundation** of everything.
:::

---

## npm — The "App Store" for Code

### ESSENCE: What Is npm?

> **Essence:** npm (Node Package Manager) is the **"app store" for code**. Just like Google Play for Android or App Store for iPhone — but instead of downloading apps, you download **code libraries** (library/package). Someone has already written the Playwright code; you just "download" it and use it.

```bash
# Like: open App Store → search "Playwright" → tap Install
npm install -D @playwright/test

# Download ALL libraries that the project needs
# (like restoring a backup — re-download all purchased apps)
npm install

# Initialize a new project (creates a package.json file)
npm init -y
```

### package.json — The Project's "Shopping List"

> **Essence:** package.json is the project's **shopping list**. It records: what the project is called, which libraries it needs, and what shortcut commands are available. When a colleague clones your project, they run `npm install` and npm reads this "list" then downloads exactly what's needed.

```json
{
  // Your project name
  "name": "my-automation",

  // Project version
  "version": "1.0.0",

  // scripts = shortcut commands
  // Instead of typing long commands, you type short ones
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:headed": "npx playwright test --headed",
    "report": "npx playwright show-report"
  },

  // devDependencies = list of libraries to download
  // This is the "shopping list"
  "devDependencies": {
    "@playwright/test": "^1.45.0",
    "typescript": "^5.5.0"
  }
}
```

```bash
# npm test = run the command in "scripts" → "test"
# Which means: npx playwright test
npm test

# npm run test:ui = run Playwright UI mode
npm run test:ui
```

::: tip AHA MOMENT
When you encounter a new project, open `package.json` FIRST. It tells you what the project uses (`devDependencies`) and how to run it (`scripts`). It's like reading the "menu" before ordering.
:::

---

## TypeScript vs JavaScript — Writing With Spell Check vs Without

### ESSENCE: What Is TypeScript?

> **Essence:** Imagine you're writing an important email.
> - **JavaScript** = writing an email **WITHOUT spell check**. You mistype "email" as "emial", and nothing alerts you. You only discover it after sending.
> - **TypeScript** = writing an email **WITH spell check**. The moment you mistype, it **underlines it in red immediately**. Fix it before sending.
>
> TypeScript = JavaScript + a **type checking system**. It catches errors BEFORE you run the code.

### The "Aha!" Example — A Typo That JavaScript Can't Catch

```typescript
// ===== JAVASCRIPT — No spell check =====
function loginJS(loginData) {
  // Mistyped "email" → "emial"
  // JavaScript: "OK fine, no warnings"
  page.fill('#email', loginData.emial);  // Runs → BUG! undefined!
}

// ===== TYPESCRIPT — With spell check =====

// Step 1: Declare a "template" (interface) for the data
// interface = a description: this data MUST have these fields
interface LoginData {
  email: string;     // must have an email field, type string
  password: string;  // must have a password field, type string
}

function loginTS(loginData: LoginData) {
  // Mistyped "emial" → IDE underlines it in red IMMEDIATELY
  page.fill('#email', loginData.emial);  // TS error: "emial" does not exist!
  page.fill('#email', loginData.email);  // Correct, red underline gone
}
```

::: tip AHA MOMENT
In automation testing, a small typo can make a test falsely PASS (false positive) because it compares `undefined` instead of the real value. TypeScript prevents this BEFORE the test even runs.
:::

### Type Annotations — "Labels" for Data

> **Essence:** Type annotations are like **labeling a box**. A box labeled "Books" should only contain books, not clothes. Code labeled `string` should only hold text, not numbers.

```typescript
// --- Primitive types ---
let url: string = "https://example.com";   // string = text characters
let timeout: number = 30000;               // number = numeric value
let isHeadless: boolean = true;            // boolean = true/false

// --- Array = a list of values of the same type ---
let browsers: string[] = ["chromium", "firefox", "webkit"];
// string[] means: an array containing only strings

// --- Interface = a "template" for an object ---
// Object = a "package" containing several related pieces of information
interface User {
  name: string;       // name — required
  email: string;      // email — required
  age: number;        // age — required
  isVIP?: boolean;    // ? = optional (may or may not be present)
}

// Create a user following the template
const testUser: User = {
  name: "Test User",           // required
  email: "test@mail.com",     // required
  age: 25                      // required
  // isVIP not provided — ok because it's optional
};

// --- Function with types ---
// (price: number, quantity: number) = takes 2 numbers as input
// : number = returns a number
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;    // return the product of the 2 numbers
}

// --- Async function ---
// Promise<string> = "promises" to return a string (explained in detail later)
async function getTitle(page: Page): Promise<string> {
  return await page.title();  // get the web page title
}
```

### Types in Practice for Automation Testing

```typescript
// Union type: status can ONLY be 'success' OR 'error'
// Like a dropdown menu — you can only pick one of the given options
interface TestCase {
  id: string;                          // test case ID
  description: string;                 // test case description
  input: {                             // input data
    email: string;
    password: string;
  };
  expected: {                          // expected result
    status: 'success' | 'error';       // union type: only 1 of 2
    message?: string;                  // message (optional)
  };
}

// Array of test cases — using the interface above as the template
const loginTests: TestCase[] = [
  {
    id: 'TC_001',                                         // test case ID
    description: 'Login with valid credentials',          // description
    input: { email: 'user@mail.com', password: 'Pass@123' }, // input
    expected: { status: 'success' }                       // expect success
  },
  {
    id: 'TC_002',
    description: 'Login with invalid email',
    input: { email: 'invalid', password: 'Pass@123' },
    expected: { status: 'error', message: 'Invalid email format' }
  }
];
```

---

## JavaScript/TypeScript Patterns for QA

### 1. String Methods — Working with Text

> **Essence:** A string is a piece of text. In QA, you frequently need to check text on web pages — trim whitespace, compare case-insensitively, search for keywords. String methods are the "tools" for handling that text.

```typescript
let text = "  Welcome to Dashboard  ";

// trim() = remove whitespace from both ends
// QA use case: text on the web often has extra spaces
text.trim();                    // "Welcome to Dashboard"

// includes() = check if a substring is present
// QA use case: verify the page displays expected text
text.includes("Dashboard");     // true — contains "Dashboard"
text.includes("Login");         // false — doesn't contain "Login"

// toLowerCase() = convert everything to lowercase
// QA use case: compare text case-insensitively
text.toLowerCase();             // "  welcome to dashboard  "

// startsWith() = check what a string begins with
text.trim().startsWith("Welcome");  // true

// Template literal = join strings using backticks (`) and ${...}
// Much more readable than using the + operator
let name = "An";
let greeting = `Hello ${name}, you have ${3} items`;
// Result: "Hello An, you have 3 items"

// Regex (Regular Expression) = a "pattern" for validation
// QA use case: validate email, phone, specific formats
let email = "test@mail.com";
let isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // true
```

### 2. Array Methods — "Filters" for Lists

> **Essence:** An array is an ordered list. In QA, you often have lists: product lists, test results, error messages. Array methods help you **filter**, **transform**, and **search** through those lists.

```typescript
// --- filter() = FILTER — keep only elements that match a condition ---
// Like a coffee filter: only keep what you want
let prices = [100, 200, 300, 150, 250];
let expensive = prices.filter(p => p > 200);
// Result: [300, 250] — only prices > 200

// --- map() = TRANSFORM — convert each element to a different form ---
// Like a juicer: fruit goes in, juice comes out
let discounted = prices.map(p => p * 0.8);
// Result: [80, 160, 240, 120, 200] — each price x 0.8

// --- find() = FIND ONE — return the FIRST element that matches ---
let firstBig = prices.find(p => p > 200);
// Result: 300 — the first element > 200

// --- some() = does AT LEAST ONE element match? ---
let hasExpensive = prices.some(p => p > 200);
// Result: true — at least 1 price > 200

// --- every() = do ALL elements match? ---
let allPositive = prices.every(p => p > 0);
// Result: true — all are > 0

// --- reduce() = ACCUMULATE — collapse the entire list into 1 value ---
let total = prices.reduce((sum, p) => sum + p, 0);
// Result: 1000 — sum of all prices

// --- sort() = SORT ---
// [...prices] = create a copy before sorting
let sorted = [...prices].sort((a, b) => a - b);
// Result: [100, 150, 200, 250, 300] — ascending order
```

**Real-world example in automation:**

```typescript
// Get all product names on the page
const names = await page.locator('.product-name').allTextContents();
// names = ["iPhone 15", "Samsung S24", "Pixel 8"]

// Check if ALL products contain a keyword
const allMatch = names.every(name => name.includes("Phone"));
// false — "Samsung S24" doesn't contain "Phone"

// Filter products with price > 10 million
const products = await page.locator('.product').all();
const expensiveProducts = [];          // empty array to hold results
for (const product of products) {      // iterate through each product
  const price = await product.locator('.price').textContent(); // get the price
  if (parseInt(price || '0') > 10000000) {  // if price > 10 million
    expensiveProducts.push(product);         // add to the list
  }
}
```

### 3. Destructuring — "Quickly Unboxing"

> **Essence:** Destructuring is like **opening a gift box**. Instead of taking items out one at a time (open box --> take out shirt --> put it down --> take out pants --> put them down), you **take everything out at once** in a single move.

```typescript
// --- OLD WAY: Take out one at a time (slow, verbose) ---
const config = { baseURL: 'https://example.com', timeout: 30000, headless: true };
const baseURL = config.baseURL;     // get baseURL
const timeout = config.timeout;     // get timeout
const headless = config.headless;   // get headless

// --- DESTRUCTURING: Take everything out at once (fast, clean) ---
const { baseURL, timeout, headless } = config;
// One line = 3 values extracted!

// --- In function parameters ---
function setupTest({ baseURL, timeout }: { baseURL: string; timeout: number }) {
  console.log(`Testing ${baseURL} with timeout ${timeout}ms`);
}

// --- In Playwright tests — you'll see this A LOT ---
test('example', async ({ page, context, browser }) => {
  // page, context, browser are "unboxed" from Playwright fixtures
  // Instead of: const page = fixtures.page; const context = fixtures.context;...
  await page.goto('https://example.com');
});
```

::: tip AHA MOMENT
Every time you write `async ({ page }) =>` in a Playwright test, that's destructuring! Playwright gives you a "box" containing page, context, browser,... and you "unbox" just what you need.
:::

### 4. Spread Operator — Copy and Extend

> **Essence:** The `...` (three dots) means "spread everything out". It's like dumping everything from a box onto a table, then adding new items.

```typescript
// Spread an array and add new elements
const browsers = ["chromium", "firefox"];
const allBrowsers = [...browsers, "webkit"];
// Result: ["chromium", "firefox", "webkit"]
// ...browsers = spreads out "chromium", "firefox"
// Then adds "webkit" at the end

// Copy an object and override some fields
const defaultConfig = { timeout: 30000, headless: true, baseURL: '' };
const testConfig = { ...defaultConfig, baseURL: 'https://staging.example.com' };
// Result: { timeout: 30000, headless: true, baseURL: 'https://staging.example.com' }
// ...defaultConfig = copy everything, then the new baseURL overrides the old one
```

### 5. async/await — Orderly Waiting

> **Essence:** Many operations in automation take **time** — click then wait for the page to load, call an API then wait for the response. `async/await` is how you tell the code: "**Wait** (await) for this operation to finish before continuing."
> - `async` = marks a function as "contains operations that require waiting"
> - `await` = "pause here, wait for this line to finish, then move on"

```typescript
// Without await: code continues WITHOUT waiting for the page to load
// With await: code PAUSES, waits for the page to load, then continues
async function loginTest(page) {
  await page.goto('https://example.com/login');  // wait for the page to open
  await page.fill('#email', 'user@mail.com');    // wait for the field to be filled
  await page.fill('#password', 'Pass@123');      // wait for the field to be filled
  await page.click('#login-btn');                // wait for the click to complete
  await page.waitForURL('**/dashboard');         // wait for the page to navigate
}
```

### 6. Promise.all — Do Multiple Things AT ONCE

> **Essence:** Normally `await` = finish task 1 before starting task 2 (sequential). But sometimes you can work **in parallel** — like **doing laundry AND cooking at the same time** instead of finishing laundry then cooking. `Promise.all` = "run everything at once, wait for all to finish".

```typescript
// --- Sequential (slow) — finish laundry then cook ---
const title = await page.title();     // wait 100ms
const url = page.url();               // wait 50ms more
// Total: 150ms

// --- Parallel (fast) — do laundry AND cook at the same time ---
const [title, url] = await Promise.all([
  page.title(),    // runs concurrently
  page.url()       // runs concurrently
]);
// Total: 100ms (time = the slowest operation)

// --- REAL-WORLD example: wait for API response AND click ---
const [response] = await Promise.all([
  page.waitForResponse('**/api/login'),  // wait for the API to respond
  page.click('#login-btn')               // click the login button (triggers the API call)
]);
// Click and wait for API response SIMULTANEOUSLY
// This is a VERY COMMON pattern in Playwright
```

### 7. try/catch — "Plan B" When Something Goes Wrong

> **Essence:** try/catch is like a **backup plan**. "**Try** to click this button. **If it fails** (catch) — for example the button doesn't exist — then do something else instead of letting the test crash." Without try/catch, a small error = the entire test stops.

```typescript
// --- Basic: try to click, if it fails then skip ---
try {
  // "Try" to do this
  await page.click('#popup-close', { timeout: 3000 });
} catch (error) {
  // "If it fails" (popup didn't appear) → do this instead
  console.log('Popup not found, continuing...');
}
// Code continues normally, no crash!

// --- Real-world: handle popups/dialogs that don't always appear ---
async function safeClick(page: Page, selector: string) {
  try {
    await page.click(selector, { timeout: 3000 }); // try to click
    return true;                                     // clicked successfully → return true
  } catch {
    console.log(`${selector} not found, skipping`); // couldn't click
    return false;                                    // return false
  }
}

// Usage:
const popupClosed = await safeClick(page, '#dismiss-banner');
// popupClosed = true if the banner appeared and was closed
// popupClosed = false if the banner didn't appear — test still continues
```

::: tip AHA MOMENT
In real-world testing, websites often have popups, banners, cookie consents... that appear **intermittently** (sometimes yes, sometimes no). try/catch is how you handle them without causing the test to fail for no good reason.
:::

---

## Practice Exercises

### Exercise 1: Validate Email

```typescript
// Write a function to check if an email is valid
function isValidEmail(email: string): boolean {
  // regex to check format: xxx@yyy.zzz
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Test it
console.log(isValidEmail("test@mail.com"));  // true — valid email
console.log(isValidEmail("invalid"));         // false — missing @
console.log(isValidEmail("a@b"));             // false — missing domain
```

### Exercise 2: Calculate Pass Rate from Test Results

```typescript
// Declare an interface for a test result
interface TestResult {
  name: string;                           // test case name
  status: 'pass' | 'fail' | 'skip';      // status: only 1 of 3
}

// List of test results
const results: TestResult[] = [
  { name: 'Login', status: 'pass' },      // pass
  { name: 'Cart', status: 'fail' },       // fail
  { name: 'Search', status: 'pass' },     // pass
  { name: 'Profile', status: 'pass' },    // pass
  { name: 'Settings', status: 'skip' },   // skip — not counted
];

// Calculate pass rate (excluding skipped tests)
const executed = results.filter(r => r.status !== 'skip'); // filter out skips
const passed = results.filter(r => r.status === 'pass');   // filter for passes
const passRate = (passed.length / executed.length * 100).toFixed(1); // calculate %
console.log(`Pass rate: ${passRate}%`);  // "Pass rate: 75.0%"
```

### Exercise 3: Async/Await with an API

```typescript
// Function that simulates an API call — returns a user after 1 second
async function fetchUser(id: number): Promise<{ name: string; email: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second
  return { name: `User ${id}`, email: `user${id}@mail.com` }; // return data
}

// Call the function and use the result
async function main() {
  const user = await fetchUser(1);   // wait for the API to respond
  console.log(user.name);           // "User 1"
  console.log(user.email);          // "user1@mail.com"
}
main();
```

---

## Chapter Summary

| Concept | Essence | Used in Automation |
|---|---|---|
| **Node.js** | "Portable water tank" — JS runs outside the browser | Runtime that powers all automation tests |
| **npm** | "App store" for code | Download Playwright, libraries, tools |
| **package.json** | "Shopping list" for the project | Manage dependencies & scripts |
| **TypeScript** | JS + "spell check" that catches errors early | Prevent typos, better IDE support |
| **String methods** | Tools for processing text | Verify web page content |
| **Array methods** | Filters/transforms for lists | Filter test data, check elements |
| **Destructuring** | "Quick unboxing" | Playwright fixtures `({ page })` |
| **async/await** | Orderly waiting | Every browser interaction |
| **Promise.all** | Do multiple things at once | Wait for API + click simultaneously |
| **try/catch** | Plan B when something goes wrong | Handle popups, missing elements |

::: tip Next up
Now that you understand the language, let's learn how to **organize code** professionally &rarr; [Automation Framework](./framework).
:::
