# Programming Basics for QA

## Before We Begin: Why You MUST Read This

Let's look at real market numbers in Vietnam (2024-2025):

| Position | Monthly Salary | Key Requirement |
|---|---|---|
| **Manual QA** (manual testing) | 8 - 15 million VND | No coding needed |
| **Automation QA** (automated testing) | 20 - 40 million VND | Programming + framework knowledge |
| **SDET** (Software Development Engineer in Test) | 30 - 60 million VND | Code as well as a developer |

The difference is **2-4x** — all because of one skill: **programming**.

You don't need to become a developer. You just need to understand enough to:
- Write automation test scripts
- Read developer code (to know what to test and where)
- Debug when tests fail (find the root cause)
- Speak the same "language" as the dev team

::: tip Aha moment
The difference between a Manual QA earning 10 million and an Automation QA earning 35 million comes down to about **8 weeks of serious programming study**. That's the highest ROI (Return On Investment) you can get in a QA career.
:::

---

## 1. What Is Programming? — "Writing a Recipe for the Computer"

### Essence

Imagine you're writing a **pho recipe** for someone who has never cooked before:

```
Step 1: Boil 2 liters of water
Step 2: Add beef bones, simmer for 2 hours
Step 3: Skim the foam, add roasted onion
Step 4: Season with fish sauce, salt, sugar
Step 5: Blanch the rice noodles in boiling water
Step 6: Place noodles in a bowl, ladle the broth over them
```

Programming is **exactly the same** — except instead of writing for a person, you write for a **computer**. Instead of "boil water", you write "open the browser". Instead of "add seasoning", you write "enter the email in the login field".

```javascript
// A "recipe" for a login test
// (Read top to bottom, step by step, just like a cooking recipe)

// Step 1: Open the browser, navigate to the login page
await page.goto('https://example.com/login');

// Step 2: Enter the email in the email field
await page.fill('#email', 'test@mail.com');

// Step 3: Enter the password in the password field
await page.fill('#password', 'Pass@123');

// Step 4: Click the Login button
await page.click('#login-btn');

// Step 5: Verify — are we on the Dashboard now?
await expect(page).toHaveURL('/dashboard');
```

::: tip Aha moment
Programming is not "advanced math". Programming is **writing step-by-step instructions** for a "very fast but very literal-minded child" (the computer). It does EXACTLY what you write — nothing more, nothing less. Write it wrong? It does it wrong. Write it right? It does it right, 1000 times without getting tired.
:::

---

## 2. Programming Languages — "The Translator Between You and the Computer"

### Essence

You want to talk to a Japanese person, but you only speak Vietnamese. You need a **translator**.

Computers are the same. They only understand **0s and 1s** (called binary). You can't write "click the Login button" in 0s and 1s. So you need a **translator** — that's what a **programming language** is.

```
You (human)
    ↓ write in a programming language (JavaScript, Python...)
Translator (compiler/interpreter)
    ↓ translates to machine code (01001010...)
Computer (understands and executes)
```

There are hundreds of programming languages, just like there are hundreds of human languages in the world. But as a QA, you only need to care about a few popular ones: **JavaScript**, **Python**, **Java**.

### Compiled vs Interpreted — Two Types of "Translation"

Imagine you have an English book and need to read it in your native language:

**Compiled = Translate the entire book first, then read**

```
English book (source code)
    ↓ Translator sits down and translates the entire book (compiling)
    ↓ ... takes time ...
Fully translated book (executable)
    ↓ You read very quickly, no more waiting for translation
```

Examples: **Java, C, C++, Go**. Runs fast, but every time you change the code, the whole book must be re-translated.

**Interpreted = Translate page by page as you read**

```
English book (source code)
    ↓ Translator sits beside you, translating each page as you read it
    ↓ Read immediately, no need to wait for the full translation
    ↓ Want to change a page? Edit it and re-read that page right away
```

Examples: **JavaScript, Python, Ruby**. Slightly slower, but you can run code immediately after writing it, and iterate quickly.

::: tip Aha moment
QA Automation primarily uses **interpreted languages** (JavaScript, Python) because: write a test --> run it immediately --> see the error --> fix it --> run again. This feedback loop needs to be FAST. Nobody wants to wait 5 minutes for compilation every time they change a single line of test code.
:::

### Which Language Should QA Learn?

| Language | Popular Test Frameworks | When to Choose |
|---|---|---|
| **JavaScript/TypeScript** | Playwright, Cypress, WebdriverIO | Web testing, most popular |
| **Python** | pytest, Selenium, Robot Framework | API testing, data projects |
| **Java** | Selenium, TestNG, RestAssured | Large enterprise projects |

**Recommendation:** Learn **JavaScript** first. Here's why:
1. Playwright (the most powerful framework today) uses JS/TS
2. The frontend of every web app is JavaScript — understanding JS means understanding the dev's code
3. Largest community, most documentation available
4. Once you're solid with JS, switching to **TypeScript** (an upgraded version with type safety) takes only 1 week

---

## 3. Variables — "Labeled Boxes"

### Essence

Imagine you have **several cardboard boxes**. You **put a label** on the outside of each box and **put something inside**.

```
 ┌───────────┐    ┌───────────┐    ┌───────────┐
 │  "An"     │    │   25      │    │   true    │
 │           │    │           │    │           │
 └───────────┘    └───────────┘    └───────────┘
   name             age             isLoggedIn
   (label)          (label)         (label)
```

- **Box** = a memory location in the computer
- **Label** = variable name
- **Contents** = value

When you need something, you call it by its label: "Get the box labeled `name`" --> the computer returns `"An"`.

### Practical Code

```javascript
// ===== DECLARING VARIABLES =====

// "let" = create a box whose contents CAN be changed later
let userName = "Nguyen Van An";   // Create box "userName", put "Nguyen Van An" inside

// "const" = create a box whose contents CANNOT be changed (constant)
const maxRetries = 3;             // Box "maxRetries" always contains 3, never changes

// "let" for values that can change
let isLoggedIn = false;           // Not logged in yet --> false

// ===== USING VARIABLES =====

// Read the value: call it by the label
console.log(userName);            // Prints: "Nguyen Van An"

// Change the value (only "let", not "const")
userName = "Tran Thi Binh";      // Swap the contents of the userName box
isLoggedIn = true;                // User logged in --> change to true

// Error if you try to change a const
// maxRetries = 5;                // Error! const doesn't allow changes
```

::: tip Aha moment
When to use `let` vs `const`? Simple rule: **use `const` by default**. Only use `let` when you KNOW the value will change. In automation tests, most variables are `const` because test data is usually fixed.
:::

---

## 4. Data Types — "What Kind of Stuff Is in the Box"

### Essence

Back to the cardboard box analogy. Each box contains a **different kind of thing**: a box with books (text), a box with marbles (numbers), a box with a switch (on/off). Data types tell the computer **what kind of thing is in the box**.

| Type | Explanation | Examples |
|---|---|---|
| `string` (text) | Characters, text, enclosed in quotes | `"Hello"`, `"test@mail.com"` |
| `number` | Integers or decimals | `42`, `3.14`, `-10` |
| `boolean` (true/false) | Only 2 possible values: `true` or `false` | `true`, `false` |
| `array` (list) | An ordered list of items | `["Chrome", "Firefox"]` |
| `object` | A group of related information | `{ name: "An", age: 25 }` |
| `null` | An **intentionally** empty box | `null` |
| `undefined` | A box with nothing put in yet | `undefined` |

### Practical Code

```javascript
// ===== STRING (text) =====
const email = "test@mail.com";       // A string of characters, enclosed in ""
const greeting = `Hello ${email}`;   // Template literal: embed a variable in a string
// greeting = "Hello test@mail.com"  // Backticks ` ` allow ${} for embedding

// ===== NUMBER =====
const price = 500000;                // Integer
const discount = price * 0.2;        // Calculation: 500000 * 0.2 = 100000
const finalPrice = price - discount; // 500000 - 100000 = 400000

// ===== BOOLEAN (true/false) =====
const isVisible = true;              // Is the element visible? Yes
const hasError = false;              // Is there an error? No
// Booleans are used A LOT in automation: checking if an element is visible,
// if a button is enabled, if a checkbox is checked...

// ===== ARRAY (list) =====
const browsers = ["Chrome", "Firefox", "Safari"];
// Think of it as: a row of boxes numbered starting from 0
// browsers[0] = "Chrome"   (box #0)
// browsers[1] = "Firefox"  (box #1)
// browsers[2] = "Safari"   (box #2)
// browsers.length = 3      (3 boxes total)

// ===== OBJECT (a group of related information) =====
const user = {
  name: "Nguyen Van An",     // property: name
  email: "an@mail.com",      // property: email
  age: 25,                   // property: age
  isVIP: true                // property: isVIP
};
// Access: user.name --> "Nguyen Van An"
// Access: user.email --> "an@mail.com"

// ===== NULL vs UNDEFINED =====
let result = null;            // You INTENTIONALLY left the box empty (no result yet)
let something;                // You created a box but FORGOT to put anything in --> undefined
```

::: tip Aha moment
In automation, you use `object` VERY OFTEN to organize test data:
```javascript
const testData = {
  validUser: { email: "good@mail.com", password: "Pass@123" },
  invalidUser: { email: "bad", password: "" }
};
```
Clean, readable, and much easier to maintain than scattering 4 separate variables around.
:::

---

## 5. Conditionals — "A Fork in the Road"

### Essence

Every morning you leave the house and have to **make a decision**:

```
Is it raining?
    ├── Yes    --> Bring an umbrella
    └── No     --> Wear sunglasses
```

That's a **conditional**. Computers also need to make decisions: **IF** a condition is true **THEN** do A, **OTHERWISE** do B.

### Practical Code

```javascript
// ===== Basic IF...ELSE =====
const age = 17;

if (age >= 18) {                   // IF age >= 18
  console.log("Allowed to register");  //   THEN print "Allowed to register"
} else {                           // OTHERWISE
  console.log("Not old enough");     //   print "Not old enough"
}
// Result: "Not old enough" (because 17 < 18)

// ===== MULTIPLE CONDITIONS =====
const score = 85;

if (score >= 90) {                 // IF score >= 90
  console.log("Excellent");         //   THEN excellent
} else if (score >= 70) {          // ELSE IF >= 70
  console.log("Good");              //   THEN good (this runs because 85 >= 70)
} else if (score >= 50) {          // ELSE IF >= 50
  console.log("Average");           //   THEN average
} else {                           // NONE OF THE ABOVE
  console.log("Fail");              //   THEN fail
}
```

**In automation testing:**

```javascript
// Real-world example: close a popup if it appears
// (Many websites show random ad popups; if you don't close them, the test gets blocked)

if (await page.isVisible('#popup-close')) {  // IF the close-popup button is visible
  await page.click('#popup-close');           //   THEN click to close it
}
// If the popup doesn't appear? Do nothing, test continues normally
```

---

## 6. Loops — "Do It Again and Again Without Rewriting"

### Essence

Your boss says: "Test this form on Chrome, then on Firefox, then on Safari."

**Bad approach:** Write 3 separate tests, copy-paste, only changing the browser name.

**Better approach:** Write 1 test, then tell the computer: "**Repeat** this for each browser in the list."

That's a **loop** — write once, run many times.

### Practical Code

```javascript
// ===== FOR...OF — iterate through each item in a list =====
const browsers = ["Chrome", "Firefox", "Safari"];

for (const browser of browsers) {       // FOR EACH browser in the list
  console.log(`Testing on ${browser}`);  //   print "Testing on ..."
}
// Result:
// Testing on Chrome
// Testing on Firefox
// Testing on Safari
// --> 3 lines of code instead of 9 if you wrote each one separately!

// ===== Classic FOR — when you need to know which iteration you're on =====
for (let i = 0; i < 3; i++) {           // i goes from 0 to 2 (3 iterations total)
  console.log(`Attempt ${i + 1}`);      //   prints "Attempt 1", "Attempt 2", "Attempt 3"
}

// ===== WHILE — repeat until the condition is false =====
let retries = 0;                         // Count the number of attempts
while (retries < 3) {                    // WHILE number of attempts < 3
  console.log(`Attempt ${retries + 1}`); //   print the current attempt
  retries++;                             //   increment counter by 1 (++ means +1)
}
```

**Real-world application — Data-driven testing:**

```javascript
// Instead of writing 3 separate tests, use a loop to run 1 test with 3 data sets
const testCases = [
  { email: "valid@mail.com", password: "Pass@123", shouldPass: true },
  { email: "invalid-email",  password: "Pass@123", shouldPass: false },
  { email: "",               password: "",          shouldPass: false },
];

for (const tc of testCases) {                // FOR EACH test data set
  test(`Login with ${tc.email}`, async () => { //   create a test case
    await page.fill('#email', tc.email);        //   enter email from data
    await page.fill('#password', tc.password);  //   enter password from data
    await page.click('#login-btn');             //   click login
    // Check the result based on shouldPass
  });
}
// Result: 3 test cases from 1 block of code. Need more data? Add 1 line to the array.
```

::: tip Aha moment
The real power of loops: you have 100 test data sets? Add 100 lines to the `testCases` array — NO changes to the test logic needed. This is why automation is more powerful than manual testing — adding data requires virtually zero effort.
:::

---

## 7. Functions — "A Recipe You Write Once, Use Many Times"

### Essence

You have a **recipe for iced coffee**. Every morning you don't have to think it through from scratch — just follow the recipe. Want a different type of coffee? Different amount of milk? Just change the **ingredients**, the steps stay the same.

A function = a **recipe** you write once and "cook" (call) as many times as you like.

```
Recipe makeCoffee(coffeeType, milkAmount):
  Step 1: Brew coffeeType with hot water
  Step 2: Add milkAmount ml of milk
  Step 3: Add ice
  Step 4: Return the coffee

--> makeCoffee("Robusta", 30)  = a Robusta with 30ml milk
--> makeCoffee("Arabica", 50)  = an Arabica with 50ml milk
```

### Practical Code

```javascript
// ===== DECLARING A FUNCTION =====

// "function" = keyword to create a recipe
// "calculateDiscount" = recipe name
// "(price, percent)" = input ingredients (parameters)
// "return" = the output result
function calculateDiscount(price, percent) {
  const discountAmount = price * percent / 100;  // Calculate the discount amount
  return price - discountAmount;                  // Return the price after discount
}

// ===== CALLING A FUNCTION =====
const result1 = calculateDiscount(500000, 20);  // Call with price 500k, 20% off
console.log(result1);                            // 400000

const result2 = calculateDiscount(1000000, 10); // Call again with different data
console.log(result2);                            // 900000
// --> Write once, use as many times as you want!

// ===== ARROW FUNCTION (shorthand syntax, very common) =====
// The "=>" (arrow) replaces the "function" keyword
const isAdult = (age) => age >= 18;
// Meaning: takes "age", returns the result of "age >= 18" (true or false)

console.log(isAdult(20));  // true  (20 >= 18 is true)
console.log(isAdult(15));  // false (15 >= 18 is false)
```

**Application in automation — Helper function:**

```javascript
// Write the login recipe ONCE
async function login(page, email, password) {
  await page.goto('/login');               // Step 1: Open the login page
  await page.fill('#email', email);        // Step 2: Enter email
  await page.fill('#password', password);  // Step 3: Enter password
  await page.click('#login-btn');          // Step 4: Click the Login button
}

// Use in every test — never have to rewrite those 4 steps
test('View dashboard after login', async ({ page }) => {
  await login(page, 'user1@mail.com', 'Pass@123');  // Call the recipe
  await expect(page).toHaveURL('/dashboard');         // Verify the result
});

test('View profile after login', async ({ page }) => {
  await login(page, 'user2@mail.com', 'Pass@456');  // Call again, different data
  await page.click('#profile-link');                  // Continue testing
});
```

::: tip Aha moment
If the UI changes (e.g., `#login-btn` becomes `#submit-btn`), you only fix it in **one place** — the `login()` function. All 50 tests using that function are automatically updated. Without the function? Fix 50 places. This is called the **DRY** principle — Don't Repeat Yourself.
:::

---

## 8. Async/Await — THE MOST IMPORTANT CONCEPT

### Essence — Read This Section Carefully!

This is the part that **causes the most errors** for beginners. Understanding async/await = eliminating 80% of flaky tests (tests that sometimes pass and sometimes fail).

**The problem:** Web pages are SLOW. When you click the "Login" button, everything does NOT happen instantly:

```
Click "Login" --> Send request to server --> Server processes --> Server returns result
                  (takes 200ms)             (takes 500ms)       (takes 200ms)

Total: about 1 second. In the computer world, 1 second = AN ETERNITY.
```

If code runs sequentially in the normal way (synchronous):

```javascript
// Code runs immediately, DOES NOT WAIT
page.click('#login-btn');           // Sends the click command (not finished yet)
page.textContent('#welcome');       // Gets text RIGHT AWAY --> page hasn't loaded --> ERROR!
```

It's like **pressing the start button on a washing machine and immediately hanging the clothes to dry** — the washing cycle hasn't finished yet!

**The solution: `await`** = "WAIT for this to finish before moving on"

```javascript
await page.click('#login-btn');     // WAIT for the click to complete (page starts loading)
await page.textContent('#welcome'); // WAIT for the element to appear --> then get the text
```

It's like **pressing start on the washing machine, WAITING for it to finish, THEN hanging the clothes to dry**.

### What Are `async` and `await`?

```javascript
// "async" = marks a function as "this function CONTAINS steps that need waiting"
// (async is required before you can use await inside the function)

// "await" = "WAIT for this line to complete before running the next line"

// In Playwright, EVERY test function is async
test('login test', async ({ page }) => {
  // async above ^^^^^ allows using await below

  await page.goto('https://example.com');     // WAIT for the page to load
  await page.fill('#email', 'test@mail.com'); // WAIT for the email to be filled
  await page.fill('#password', 'Pass@123');   // WAIT for the password to be filled
  await page.click('#login');                  // WAIT for the click to complete
  await expect(page).toHaveURL('/dashboard');  // WAIT for URL to change, then verify
});
```

### The Classic Mistake — Forgetting `await`

::: danger Mistake #1 for new QAs: forgetting await
```javascript
// WRONG — missing await --> test is FLAKY (randomly passes and fails)
page.click('#button');             // Sends the click but DOES NOT WAIT
page.fill('#input', 'text');       // Fills immediately --> element not ready --> FAIL

// CORRECT — with await --> test is STABLE
await page.click('#button');       // WAIT for the click to complete
await page.fill('#input', 'text'); // THEN fill
```

When a test randomly passes and fails and you don't understand why? **Check for missing await first.** 90% of the time, an await is missing somewhere.
:::

::: tip Aha moment
Why doesn't the computer just wait automatically — why do you have to write `await`? Because sometimes you WANT to run multiple things simultaneously (in parallel) for better performance. `await` gives you the CHOICE: which lines to wait for, which ones not to. But in automation testing, **nearly every line that interacts with the browser needs `await`**. When in doubt? Add `await`.
:::

---

## 9. Classes & Objects — "A House Blueprint"

### Essence

You want to build 10 identical houses in a neighborhood. You don't draw the design 10 times. You draw **1 blueprint**, then build 10 houses from that blueprint.

- **Class** = the blueprint. It describes: what the house has (bedrooms, living room = **properties**) and what the house can do (open door, turn on lights = **methods**).
- **Object** = an actual house built from the blueprint. Each one can differ: one painted white, another blue — but they share the same structure.

```
Class House (blueprint):                Object myHouse (actual house):
  - color (paint color)                   - color = "white"
  - rooms (number of rooms)               - rooms = 3
  - openDoor() (open the door)            - openDoor() --> opens this house's door
```

### Why Do QAs Need Classes?

Because automation testing uses the **Page Object Model** (POM) — each web page is a class:

```typescript
// ===== CLASS = Blueprint for the Login page =====
class LoginPage {
  // ----- Properties: elements on the page -----
  private page: Page;                     // Browser page (Playwright Page object)
  readonly emailInput = '#email';         // CSS selector for the email field
  readonly passwordInput = '#password';   // CSS selector for the password field
  readonly loginButton = '#login-btn';    // CSS selector for the Login button
  readonly errorMsg = '.error-message';   // CSS selector for the error message

  // ----- Constructor: runs when a new object is created -----
  // (Like when building a house from a blueprint, the first step is laying the foundation)
  constructor(page: Page) {
    this.page = page;                     // Assign the browser page to this object
  }

  // ----- Methods: actions on the page -----

  // login method: enter email, password, click Login
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);       // Enter email
    await this.page.fill(this.passwordInput, password); // Enter password
    await this.page.click(this.loginButton);            // Click the Login button
  }

  // getErrorMessage method: get the error message content
  async getErrorMessage(): Promise<string> {
    return await this.page.textContent(this.errorMsg) || '';
  }
}
```

**Using it in tests:**

```typescript
test('Successful login', async ({ page }) => {
  // Create an object from the class (build a house from the blueprint)
  const loginPage = new LoginPage(page);

  // Call the method (use the house)
  await loginPage.login('user@mail.com', 'Pass@123');

  // Verify the result
  await expect(page).toHaveURL('/dashboard');
});

test('Failed login — wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);  // Create a new object for a new test
  await loginPage.login('user@mail.com', 'wrong-password');

  // Get the error message
  const error = await loginPage.getErrorMessage();
  expect(error).toBe('Invalid credentials');  // Verify the error content
});
```

::: tip Aha moment
The biggest benefit of POM: when a developer changes the UI (e.g., `#login-btn` to `#submit`), you only change **1 line** in the `LoginPage` class. All tests using that class are automatically updated. Without POM? 50 tests, 50 places to fix, miss 1 = a randomly failing test = hours of debugging.
:::

---

## 10. Putting It All Together — A Complete Automation Test

Now you understand each concept individually. Let's see how they **come together** in a real project:

```
my-automation-project/
├── tests/                  # Test files (use functions, loops, async/await)
│   ├── login.spec.ts       # Test the Login feature
│   └── cart.spec.ts        # Test the Cart feature
├── pages/                  # Page Objects (use classes)
│   ├── LoginPage.ts        # Class for the Login page
│   └── CartPage.ts         # Class for the Cart page
├── fixtures/               # Test data (use objects, arrays)
│   └── users.json          # Data: list of users for testing
├── utils/                  # Helper functions (use functions)
│   └── helpers.ts          # Shared utility functions
├── playwright.config.ts    # Config: browsers, timeout, base URL
├── package.json            # List of dependencies (libraries to install)
└── tsconfig.json           # TypeScript configuration
```

**Which concept each folder uses:**
- `tests/` — async/await (browser interactions), conditionals (handling edge cases), loops (data-driven)
- `pages/` — classes (Page Object Model), methods (actions on pages)
- `fixtures/` — objects & arrays (organizing test data)
- `utils/` — functions (shared code, called repeatedly)

---

## 11. Learning Path — 8 Weeks to Transform Your Career

```
Weeks 1-2: JavaScript Basics
  --> Variables, Data Types, Conditionals, Loops, Functions
  --> Practice: freeCodeCamp.org or Codecademy (free)
  --> Goal: write small programs, read and understand code

Week 3: Async/Await + TypeScript
  --> Understand Promise, async/await (section 8 of this guide)
  --> Learn TypeScript basics: adding types to variables
  --> Goal: understand why await is needed, read TypeScript code

Week 4: Write Your First Test
  --> Install Playwright, write a login test on a demo site
  --> Goal: run 1 automated test, see the browser open automatically

Weeks 5-6: Page Object Model
  --> Organize code with classes (section 9 of this guide)
  --> Refactor simple tests to the POM pattern
  --> Goal: understand why POM is better than writing inline code

Weeks 7-8: Advanced Topics + Portfolio
  --> Data-driven testing, CI/CD integration
  --> Create a demo project on GitHub
  --> Goal: have a portfolio for Automation QA interviews
```

::: warning Important advice
**DON'T** learn all the theory before writing code. For each new concept: **Read --> Code immediately --> Hit errors --> Debug --> Gain deeper understanding**. This loop helps you learn 3x faster than just reading books.
:::

---

## Full Summary

| Concept | One-Sentence Explanation | Where QA Uses It |
|---|---|---|
| **Variables** | Labeled boxes that hold data | Store test data, results, selectors |
| **Data Types** | What kind of stuff is in the box (text, numbers, true/false...) | Understand data to verify correctly |
| **Conditionals** | A fork in the road — if A then do X, otherwise Y | Handle popups, edge cases |
| **Loops** | Repeat an action many times | Data-driven testing, multi-browser |
| **Functions** | A recipe written once, used many times | Helper functions, page actions |
| **Async/Await** | WAIT for this step to finish before doing the next | **EVERY** browser interaction |
| **Classes** | A blueprint for creating multiple objects | Page Object Model (POM) |

::: tip The Road Ahead
You've just learned the **foundation** — enough to understand 80% of the code in an automation project. The remaining 20% you'll pick up gradually through practice. Next step: set up your environment and write your first test with Playwright.

Remember: going from a Manual QA salary to an Automation QA salary is just **8 weeks of commitment** apart. Start today.
:::
