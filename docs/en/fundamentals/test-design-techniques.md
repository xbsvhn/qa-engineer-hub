# Test Design Techniques

## Why do we need Test Case Design Techniques? (WHY)

### A real-world problem everyone faces

Imagine you are a QA assigned to test a registration form with 5 fields:

- **Full name:** accepts 1-50 characters
- **Email:** must be a valid email format
- **Age:** accepts 18-65
- **Password:** 8-20 characters, must contain uppercase, number, and special character
- **Phone number:** 10-11 digits

How many test cases do you think you need?

If each field has about **10 values worth testing** (valid, invalid, empty, too long, too short, special characters...), then the total combinations are:

```
10 x 10 x 10 x 10 x 10 = 100,000 combinations
```

Assuming each test case takes 2 minutes to run manually, you'd need **200,000 minutes = 138 continuous working days** just to test 1 form. The deadline is next week. What do you do?

This is exactly why ISTQB Principle #2 exists: **"Exhaustive testing is impossible"**. The question isn't "how much to test?" but rather **"WHAT to test?"**

### Test Design Techniques = Your roadmap

Think of it this way: you're traveling to a new city. You have 2 options:
- **Option 1:** Wander randomly, maybe you find something nice, maybe you get lost
- **Option 2:** Use a map, mark the important spots, plan a route

Test Design Techniques are the **map** for QA. They help you:

1. **Reduce the number** of test cases from hundreds of thousands to a few dozen, while still achieving high coverage
2. **Find the right spots** where bugs tend to hide — because bugs don't hide randomly, they have their favorite "nests"
3. **Be systematic** — instead of "random testing" or "testing by gut feeling"
4. **Justify your choices** — when the PM asks "why did you test these cases?", you can explain the logic rather than saying "I felt like testing this"

---

## Classification

Before diving into details, let's look at the big picture. Test Design Techniques are divided into 3 major groups based on **how much you know about the system's internals**:

```
Test Design Techniques
├── Black-box (no need to know the code)
│   ├── Equivalence Partitioning
│   ├── Boundary Value Analysis
│   ├── Decision Table
│   ├── State Transition
│   └── Use Case / User Story Testing
├── White-box (need to know the code)
│   ├── Statement Coverage
│   ├── Branch Coverage
│   └── Path Coverage
└── Experience-based
    ├── Error Guessing
    ├── Exploratory Testing
    └── Checklist-based Testing
```

- **Black-box** (the black box): you only look from the outside — feed input in, check the output. Like testing an ATM: insert a card, press withdraw, check if money comes out. You don't need to know what software runs inside the machine.
- **White-box** (the white box): you open the lid and look at the code inside. Like an ATM repair technician: opening the machine and inspecting each circuit board.
- **Experience-based** (based on experience): you use intuition and hands-on experience. Like a veteran repair technician: just hearing the machine's sound tells them what's broken.

---

## Black-box Techniques

**Black-box** = you test **without knowing how the internal code** works. You only need 2 things: **requirements** and **input/output**.

> Imagine you're testing a vending machine. You insert money, press the Coca-Cola button, and check if a can of Coca-Cola comes out. You don't need to know how many motors are inside, how the wiring works. You only care: **correct money + correct button = correct drink**.

### 1. Equivalence Partitioning (EP)

#### Understanding the essence through an everyday example

Imagine you are slicing a **pizza** into pieces. Each pizza slice represents a "group" of values. The key insight is: **every piece within the same group tastes the same** — you only need to taste 1 piece to know the flavor of the entire group.

That is the idea behind **Equivalence Partitioning** (EP):
- **Equivalence** = equivalent, the same
- **Partitioning** = dividing into groups
- **Meaning:** Divide input data into **groups** (called partitions), such that all values within the same group will **produce the same result**. Then you only need to test **1 representative value** per group.

#### Why is it effective? (The "Aha!" moment)

Think about how the system processes things. When a developer writes code to validate age:

```javascript
// Code the developer writes to validate age
if (age >= 18 && age <= 65) {
    // Accept — every number from 18 to 65 runs THIS EXACT LINE
    return "Accepted";
} else {
    // Reject — every number outside 18-65 runs THIS EXACT LINE
    return "Rejected";
}
```

See? If `age = 25` works correctly, then `age = 30`, `age = 40`, `age = 50` will also work correctly because they **go through the same code branch**. Testing 30, 40, 50 as well is **wasting time** — you're tasting the same pizza flavor again.

Conversely, `age = 10` will go into a different branch. So `10` belongs to a **different group** and needs to be tested separately.

#### How to apply in detail

**Example: "Age" field accepts 18-65**

Step 1 - Identify the partitions (groups):

| Partition | Range | Why is it a separate group? |
|---|---|---|
| Invalid low | Numbers < 18 | System rejects because too young |
| **Valid** | **18 - 65** | **System accepts** |
| Invalid high | Numbers > 65 | System rejects because too old |
| Not a number | abc, @#$, emoji | System rejects because wrong data type |
| Empty | (left blank) | System rejects because data is missing |
| Negative numbers | -1, -100 | System rejects (age cannot be negative) |

Step 2 - Choose **1 representative** for each group:

| Partition | Representative value | Expected Result |
|---|---|---|
| Invalid low | `10` | Error: "Age must be between 18-65" |
| **Valid** | **`30`** | **Accept** |
| Invalid high | `70` | Error: "Age must be between 18-65" |
| Not a number | `"abc"` | Error: "Please enter a number" |
| Empty | `""` | Error: "Required field" |
| Negative number | `-5` | Error: "Age must be between 18-65" |

**Result: 6 test cases** instead of testing every number from 1 to 100+. You've just reduced hundreds of test cases to 6, while still covering every "type" of input.

#### Practical tips

When encountering any field, ask yourself 3 questions:
1. How many **valid partitions** (valid groups) are there?
2. How many **invalid partitions** (invalid groups) are there? Think about: empty, wrong type, too small, too large, special characters...
3. Choose **1 "middle-of-the-range" value** to represent each group — don't choose boundary values (save those for BVA)

---

### 2. Boundary Value Analysis (BVA)

#### Understanding the essence: Why do bugs love to hide at boundaries?

Imagine you are driving on a highway. Where do most accidents happen? **At the intersections between lanes** — the boundary between one lane and another. Not in the middle of a lane.

In software, it's the same. Bugs don't hide at "middle" values (like age 30 or 40). Bugs hide at **boundaries** — where the system has to decide "accept or reject?", "correct or incorrect?"

**Boundary** = the border, the dividing point between valid and invalid. **BVA** is a technique that focuses testing on exactly these boundary points.

#### The "Aha!" moment: A classic developer bug

Look at a mistake developers make **every single day**:

```javascript
// ===== SCENARIO: Age field accepts 18 to 65 =====

// Developer writes it WRONG (a very common error):
if (age > 18 && age < 65) {
    return "Accepted";
}
// The line above uses > instead of >= and < instead of <=
// Result: an 18-year-old gets REJECTED (wrong!)
// Result: a 65-year-old gets REJECTED (wrong!)
// But a 30-year-old still gets ACCEPTED (correct)
// => If you only test age 30, you WON'T find this bug!

// Developer writes it CORRECTLY:
if (age >= 18 && age <= 65) {
    return "Accepted";
}
// The line above uses >= and <= (with the equals sign)
// Result: an 18-year-old gets ACCEPTED (correct!)
// Result: a 65-year-old gets ACCEPTED (correct!)
```

See? Just one missing **`=` sign** and the system is wrong. And this bug **only occurs at boundary values** (18 and 65). If you test age 30, everything looks fine, you think the system is correct. But in reality, 18-year-old and 65-year-old customers will be wrongly rejected.

**BVA was created to catch exactly this type of bug.**

#### How to apply in detail

**Example: "Age" field accepts 18-65**

BVA principle: test **right at the boundary**, **just above the boundary**, and **just below the boundary**.

```
       INVALID        │         VALID          │       INVALID
   ◄─────────────────►│◄──────────────────────►│◄──────────────────►
                       │                        │
   ...  16   17  [18]  19  20  ...  63  64  [65]  66   67  ...
              ↑    ↑    ↑                   ↑    ↑    ↑
           below  LOWER above            below  UPPER above
           bound  BOUND bound            bound  BOUND bound
```

Explanation of the diagram above:
- `[18]` and `[65]` are the 2 **boundary points** — the border between valid and invalid
- `17` is the value **just below the lower boundary** — on the invalid side
- `19` is the value **just above the lower boundary** — on the valid side
- `64` is the value **just below the upper boundary** — on the valid side
- `66` is the value **just above the upper boundary** — on the invalid side

| Test value | Expected | Why test it | Bug it catches |
|---|---|---|---|
| `17` | Invalid | Just below lower boundary | Checks if the lower boundary blocks correctly |
| `18` | **Valid** | **Lower boundary** | Catches `> 18` instead of `>= 18` |
| `19` | Valid | Just above lower boundary | Confirms the valid zone works |
| `64` | Valid | Just below upper boundary | Confirms the valid zone works |
| `65` | **Valid** | **Upper boundary** | Catches `< 65` instead of `<= 65` |
| `66` | Invalid | Just above upper boundary | Checks if the upper boundary blocks correctly |

**6 test cases** — each one "aims" at exactly where bugs most love to hide.

#### EP + BVA = The most powerful combo

In practice, **always combine EP and BVA** as two complementary weapons:

- **EP** answers the question: "Test **which GROUPS**?" (valid, invalid low, invalid high, wrong type...)
- **BVA** answers the question: "Test **which VALUES** in each group?" (boundary value, just above boundary, just below boundary)

If EP is the regional map, then BVA is the magnifying glass examining the border lines.

---

### 3. Decision Table

#### Understanding the essence: Restaurant combo menu

You walk into a restaurant, and the menu has:
- Drink: Pepsi or Water
- Main dish: Chicken or Fish
- Dessert: Yes or No

Question: how many possible combos are there? You list them all:

| Combo | Drink | Main dish | Dessert |
|---|---|---|---|
| 1 | Pepsi | Chicken | Yes |
| 2 | Pepsi | Chicken | No |
| 3 | Pepsi | Fish | Yes |
| 4 | Pepsi | Fish | No |
| 5 | Water | Chicken | Yes |
| 6 | Water | Chicken | No |
| 7 | Water | Fish | Yes |
| 8 | Water | Fish | No |

Total: 2 x 2 x 2 = **8 combos**. You just created a **Decision Table** without knowing it!

**Decision Table** is a technique that lists **all combinations** of conditions, then determines the corresponding **action** for each combination. It ensures you **don't miss** any case.

#### When to use?

Use when business logic has **multiple conditions combined** with AND/OR to produce different results. For example:
- Discount policies that depend on multiple factors
- Access permissions that depend on role + level + department
- Shipping fees that depend on region + weight + product type

#### How to apply in detail

**Example: E-commerce discount policy**

Rules:
- VIP customers get 20% off
- Orders > 500K get an additional 10% off
- New customers (first order) get 15% off

Step 1 - List all conditions. There are 3 conditions, each with 2 values (Yes/No), so total combinations = 2^3 = **8 rules**:

| | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|---|---|---|---|---|---|---|---|---|
| **Conditions** | | | | | | | | |
| VIP customer? | Y | Y | Y | Y | N | N | N | N |
| Order > 500K? | Y | Y | N | N | Y | Y | N | N |
| First order? | Y | N | Y | N | Y | N | Y | N |
| **Actions** | | | | | | | | |
| VIP 20% discount | x | x | x | x | | | | |
| Large order 10% discount | x | x | | | x | x | | |
| First order 15% discount | x | | x | | x | | x | |
| **Total discount** | 45% | 30% | 35% | 20% | 25% | 10% | 15% | 0% |

Step 2 - Each column (Rule) = **1 test case**. You verify the system calculates the discount correctly for each combination.

Example test case for R1: VIP customer, places an order of 600K, first-time buyer. Expected: 45% discount.

#### Practical tips

- **Formula:** Number of rules = 2^n (n = number of conditions). 3 conditions = 8 rules, 4 conditions = 16 rules
- If there are **too many conditions** (5+) leading to 32+ rules, group independent conditions together or eliminate impossible combinations (e.g., "new customer" + "VIP customer" might not exist simultaneously)
- Use **Excel or Google Sheets** to create them quickly — less error-prone than writing by hand

---

### 4. State Transition

#### Understanding the essence: Traffic lights

Look at the traffic light on the street:

```
   [Red] ──60 seconds elapsed──► [Green] ──30 seconds elapsed──► [Yellow] ──3 seconds elapsed──► [Red]
```

The traffic light has:
- **States**: Red, Green, Yellow — at any given moment, the light is in ONLY 1 state
- **Events**: countdown timer expires — the event that triggers a state change
- **Transitions**: Red → Green, Green → Yellow, Yellow → Red — the rules for changing from one state to another

**State Transition Testing** = map out all states of the system, all possible events, and verify that every transition works correctly.

#### When to use?

Whenever a system has **multiple states** and transitions between them according to rules:
- **Login flow:** Start → Attempt 1 → Attempt 2 → Locked
- **Order status:** Pending → Processing → Shipped → Delivered (or Cancelled)
- **Workflow approval:** Draft → Submitted → Approved / Rejected
- **Subscription:** Trial → Active → Expired → Renewed

#### How to apply in detail

**Example: Login with a 3-attempt password limit**

Step 1 - Draw the state transition diagram:

```
                    ┌──── Correct password ────► [Logged In]
                    │
[Start] ──► [Attempt 1] ── Wrong password ──► [Attempt 2]
                                                    │
                    ┌──── Correct password ────►    │
                    │                               │
              [Logged In]  ◄── Correct password ── [Attempt 3]
                                                    │
                                              Wrong password
                                                    │
                                                    ▼
                                               [Locked]
```

Diagram explanation: when the user starts logging in, the system is in the Attempt 1 state. If they enter the correct password, it transitions to Logged In. If wrong, it transitions to Attempt 2. Three consecutive wrong attempts transitions to Locked (account locked).

Step 2 - Create a State Transition Table (each row = 1 test case):

| Current State | Event | Next State | Action |
|---|---|---|---|
| Start | Enter credentials | Attempt 1 | Display login form |
| Attempt 1 | Correct password | Logged In | Navigate to dashboard |
| Attempt 1 | Wrong password | Attempt 2 | Display "Wrong password. 2 attempts remaining" |
| Attempt 2 | Correct password | Logged In | Navigate to dashboard |
| Attempt 2 | Wrong password | Attempt 3 | Display "Wrong password. 1 attempt remaining" |
| Attempt 3 | Correct password | Logged In | Navigate to dashboard |
| Attempt 3 | Wrong password | Locked | Display "Account has been locked" |
| Locked | Any input | Locked | Display "Contact admin" |

**8 test cases** — covering every transition. You ensure that:
- Correct password always grants access, regardless of which attempt
- 3 wrong passwords locks the account
- After locking, login is no longer possible

#### Important tip

Beyond testing **valid** transitions, think about **invalid** transitions as well. For example: from the Locked state, can a user call the API directly to bypass and log in? This is a serious security bug.

---

### 5. Use Case / User Story Testing

#### Understanding the essence: Testing like a real user

The techniques above all focus on **individual fields** or **individual logic** in isolation. But real users don't use the app by "testing the age field" then "testing the email field." Real users follow **a journey**: open the app → find a product → add to cart → checkout → receive the order.

**Use Case Testing** = testing according to the **real user journey**, from start to finish (end-to-end).

A Use Case consists of:
- **Actor:** who performs it? (customer, admin, system)
- **Precondition:** conditions before starting (already logged in, items in cart...)
- **Main flow:** the main journey — everything goes smoothly (happy path)
- **Alternative flows:** different branches (user changes their mind, chooses a different method...)
- **Exception flows:** when errors occur (out of stock, payment fails...)

#### How to apply in detail

**Example: User Story "Checkout an order"**

```
User Story: As a customer, I want to checkout my cart
            so that I can receive my order.

Acceptance Criteria:
- Cart must have at least 1 item
- Shipping address is required
- Payment method must be valid
- Send confirmation email after successful payment
```

Test scenarios — including happy path, alternative, and exception:

| # | Type | Scenario | Expected |
|---|---|---|---|
| 1 | Happy path | Add items → Checkout → Enter address → Payment succeeds | Order created, email sent |
| 2 | Exception | Cart is empty → Click Checkout | Display "Cart is empty" |
| 3 | Exception | Checkout → Leave address blank → Click Continue | Validation error on address |
| 4 | Exception | Pay with an expired card | Message that card was declined |
| 5 | Exception | Payment → Network drops midway | Show retry button, don't charge twice |
| 6 | Alternative | Apply discount code → Checkout | Price reduced according to the code |
| 7 | Alternative | Add items → Remove all → Click Checkout | Display "Cart is empty" |

The strength of Use Case Testing: it finds **integration** bugs — bugs that only appear when multiple steps combine together, which testing individual fields in isolation cannot detect.

---

## White-box Techniques

**White-box** = you **open the box and see the code inside**. Usually performed by developers or SDETs (Software Development Engineers in Test).

### Why does QA need to know this?

Even if you don't directly write white-box tests, you **need to understand** them because:
- When dev says "unit test coverage is 80%", you need to understand what that number means
- You need to know **which parts aren't covered** so you can focus additional testing there
- In meetings, you can ask "Branch coverage or statement coverage?" — this question shows deep understanding

### What is Code Coverage?

**Code coverage** = the **percentage of code that has been executed** during testing. Like visiting a building: 80% coverage means you've entered 80% of the rooms. The remaining 20% of rooms haven't been checked — bugs could be hiding there.

There are 3 coverage levels from weakest to strongest:

### 1. Statement Coverage

**Goal:** Every **line of code** (statement) is executed at least once.

```javascript
function calculateDiscount(price, isVIP) {
    let discount = 0;           // Line 1: initialize discount variable = 0
    if (isVIP) {                // Line 2: check if VIP
        discount = price * 0.2; // Line 3: if VIP then 20% discount
    }
    return price - discount;    // Line 4: return price after discount
}
```

Test 1 case: `calculateDiscount(100, true)` - runs through Line 1 → 2 → 3 → 4. All 4 lines are executed → **100% statement coverage**.

**But there's a problem:** you've never tested the case where `isVIP = false`! If the developer wrote incorrect logic for the false branch, you wouldn't know. 100% statement coverage but still has a bug. This is why statement coverage is considered the **weakest level**.

### 2. Branch Coverage

**Goal:** Every **branch** of every conditional statement is executed at least once. Branch means: the `if = true` branch AND the `if = false` branch.

```javascript
function calculateDiscount(price, isVIP) {
    let discount = 0;
    if (isVIP) {                // 2 branches: true AND false
        discount = price * 0.2;
    }
    return price - discount;
}
```

Need **2 test cases**:
1. `calculateDiscount(100, true)` → the `isVIP = true` branch is executed
2. `calculateDiscount(100, false)` → the `isVIP = false` branch is executed

Both branches covered → **100% branch coverage**. Branch coverage is **stronger than** statement coverage because it forces you to test both sides of every condition.

### 3. Path Coverage

**Goal:** Every **path** through the code is executed at least once.

When code has multiple if statements, the number of paths grows exponentially:
- 1 if → 2 paths
- 2 ifs → 4 paths
- 3 ifs → 8 paths
- n ifs → 2^n paths

With real-world code having 10 if statements, you'd need 1,024 test cases. **100% path coverage is nearly impossible** with complex code.

### Coverage in practice

| Metric | Common target | Meaning |
|---|---|---|
| Statement | >= 80% | Minimum acceptable level |
| Branch | >= 80% | Recommended level for most projects |
| Path | No target set | Too difficult to achieve 100% |

::: warning Be careful with "100% coverage"
100% code coverage **DOES NOT mean there are no bugs**. Coverage only measures **"which code was executed"**, not **"whether the code ran correctly"**. A test that runs through every line of code but has no assertions (result checks) is still meaningless — like entering every room in a building but not inspecting anything.
:::

---

## Experience-based Techniques

The two previous categories (Black-box and White-box) are both based on **clear rules**. But in practice, there are bugs that no rule can catch — you need the **experience** and **intuition** of someone who has tested extensively.

Like a veteran doctor: sometimes they see a patient and know the diagnosis, without waiting for test results. Not because they're good at guessing, but because they've **seen this pattern hundreds of times**.

### 1. Error Guessing

**Error Guessing** = using experience to guess **"where do bugs tend to occur?"** There's no specific formula — you build this skill over time.

Below is a list of common "bug nests" that experienced QA always checks:

**Special values:**
- **Null / Empty:** leave a field blank, submit an empty form
- **Zero:** many developers forget to handle dividing by zero, quantity = 0
- **Negative numbers:** age -1, price -100, quantity -5
- **Very large numbers:** enter 999999999999 in a price field

**Dangerous characters:**
- **Script injection:** enter `<script>alert('hack')</script>` in a name field
- **SQL injection:** enter `' OR 1=1 --` in a login field
- **Emoji:** enter a name with emoji, many systems crash due to incomplete Unicode support
- **Very long strings:** paste 10,000 characters into a field with a max length

**Unexpected situations:**
- **Concurrent actions:** 2 users edit the same record at the same time — who wins?
- **Double submit:** click the Submit button twice very quickly — creates 2 orders?
- **Back button:** press the browser Back button after completing payment — charged twice?
- **Timezone:** user in Vietnam (UTC+7) places an order, server in the US (UTC-5) — date/time displayed incorrectly?

### 2. Checklist-based Testing

**Checklist-based Testing** = using a pre-built checklist, compiled from the team's experience across many projects. Like a pilot checking the airplane before takeoff — not because they don't know what to do, but because a checklist ensures **nothing is forgotten**.

**Example: Checklist for Form Input**

- [ ] Do required fields display an asterisk (*)?
- [ ] Are validation messages clear and specific?
- [ ] Is the tab order correct from top to bottom?
- [ ] Does copy/paste work normally?
- [ ] Does the browser's autofill work?
- [ ] Does pressing Enter submit the form?
- [ ] Does double-clicking the Submit button create duplicate records?
- [ ] Does pressing the Back button lose entered data?
- [ ] Does the form layout break when the browser is resized smaller?
- [ ] Does the form have a reasonable fallback when JavaScript is disabled?

The difference between Error Guessing and Checklists: Error Guessing depends on the **individual** (each person guesses differently), while Checklists are a **shared asset** of the team (anyone can use them).

---

## When to use which technique?

This is the most practical question. No technique is "the best" — only the technique that's **most appropriate** for each situation:

| Situation | Suitable technique | Reason |
|---|---|---|
| Input field with a specific range (age 18-65, price 0-10M) | **EP + BVA** | Reduce test cases, focus on boundaries |
| Complex business logic with multiple AND/OR conditions | **Decision Table** | List all combinations, miss nothing |
| System has workflows, states that change | **State Transition** | Cover every transition path |
| End-to-end testing of a complete feature | **Use Case Testing** | Test like a real user |
| Dev requires code coverage | **White-box** | Statement → Branch → Path |
| No clear requirements, new feature | **Error Guessing + Exploratory** | Use experience to find bugs |
| Regression test (retesting existing features) | **Checklist-based** | Ensure no case is forgotten |

**Pro tip:** In practice, you **always combine multiple techniques**. For example, for a Login form:
- EP + BVA for input fields (email, password)
- State Transition for the login flow (attempt 1 → 2 → 3 → locked)
- Error Guessing for unexpected situations (SQL injection, double submit)
- Checklist for general UI/UX standards

---

## Chapter Summary

| Technique | Use when | Key idea | Easy to remember |
|---|---|---|---|
| **EP** | Input has ranges/groups | 1 representative per group | Pizza: taste 1 slice to know the whole group |
| **BVA** | Input has boundaries | Test at the boundaries | Bugs hide at the borders |
| **Decision Table** | Multiple conditions combine | List all combinations | Restaurant combo menu |
| **State Transition** | System has states | Test all transitions | Traffic lights |
| **Use Case** | End-to-end flows | Test like a real user | Customer journey |
| **White-box** | Code coverage | Statement → Branch → Path | Open the box, look at the code |
| **Error Guessing** | Experience | Guess where bugs hide | Veteran doctor |
| **Checklist** | Regression, standards | A list so nothing is forgotten | Pilot before takeoff |
