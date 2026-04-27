# Test Case Design

## A Test Case Is Like a Recipe Card

You want to cook pho. What do you need?

| Cooking | Test Case |
|---|---|
| **Dish name**: Beef pho | **Title**: Successful login with valid email |
| **Ingredients**: Rice noodles, beef, onion, cinnamon... | **Test Data**: email = "test@mail.com", password = "Pass@123" |
| **Precondition**: Broth is already boiling | **Precondition**: User account already exists in the system |
| **Steps**: 1. Blanch noodles → 2. Arrange meat → 3. Ladle broth | **Steps**: 1. Open login page → 2. Enter email → 3. Click Login |
| **Finished dish**: Hot bowl of pho, clear broth, rare beef | **Expected Result**: Redirect to Dashboard, display "Hello, Test User" |

Each recipe card gives you **enough information** for anyone to cook the dish -- even if they have never been in a kitchen. A test case works the same way: anyone who executes it should get the **same result**.

:::tip Aha moment
The best test case is one that **a newcomer to the team can read and execute immediately**, without having to ask anyone. Like a well-written recipe -- no chef needs to stand beside you and guide you through it.
:::

---

## Standard Test Case Structure -- What Goes on the "Recipe Card"?

| Field | Description | Example | Required? |
|---|---|---|---|
| **Test Case ID** | Unique identifier | TC_LOGIN_001 | Required |
| **Title** | Brief description of the test purpose | Verify successful login | Required |
| **Priority** | Importance level | High / Medium / Low | Required |
| **Precondition** | Conditions that must be met BEFORE testing | User account already exists | Required |
| **Test Steps** | Numbered step-by-step actions | 1. Go to /login, 2. Enter email... | Required |
| **Test Data** | Specific data used for testing | email = "a@b.com", pass = "123" | Required |
| **Expected Result** | Expected outcome -- specific and measurable | Redirect to /dashboard | Required |
| **Actual Result** | Actual outcome (filled in during execution) | (Pass) or describe the defect | During execution |
| **Status** | Final result | Pass / Fail / Skip / Blocked | During execution |
| **Module** | Related feature/module | Authentication | Recommended |
| **Linked Requirement** | Related User Story | US-123 | Recommended |

---

## 5 Principles for Writing Good Test Cases

### Principle 1: Each step = one single action

Like a recipe: "Blanch the noodles" is one step, "Arrange the meat" is another -- don't combine them into "Blanch noodles arrange meat ladle broth and serve."

```
# WRONG -- multiple actions crammed into 1 step
# Others won't know where it failed
Step 1: Open browser, go to login page, enter email and password, click Login

# RIGHT -- each step is 1 action
# If it fails at step 3, you know immediately the password field has an issue
Step 1: Open browser and navigate to https://staging.example.com/login
Step 2: Enter "test@mail.com" in the Email field
Step 3: Enter "Pass@123" in the Password field
Step 4: Click the "Login" button
```

:::tip Aha moment
Why split steps? Because when a test **fails**, you need to know **which step failed**. If you cram 5 actions into 1 step, the developer will ask: "Where exactly did it break?" Smaller steps = faster debugging.
:::

### Principle 2: Expected Results must be SPECIFIC and measurable

Expected Results are like describing the finished dish: **anyone reading it can judge** whether it is "right" or "wrong."

```
# WRONG -- too vague, everyone interprets it differently
# What does "works normally" mean?
Expected: System works normally
Expected: Page loads successfully
Expected: Displays correctly

# RIGHT -- specific, anyone can verify
Expected: User is redirected to /dashboard within 3 seconds
Expected: Welcome message displays "Hello, Nguyen Van An"
Expected: Cart icon displays badge number "3" (number of items in the cart)
Expected: Error message "Invalid email format" displays in red below the Email field
```

### Principle 3: Each Test Case must be INDEPENDENT

Each test case should be able to run **on its own**, without depending on another test case. Like each recipe being complete in itself -- you don't need to "cook dish A first before you can cook dish B."

```
# WRONG -- TC_002 depends on TC_001
# If TC_001 fails --> TC_002 also can't run --> domino effect
TC_001: Create user         <-- TC_002 needs this user
TC_002: Edit user profile   <-- If TC_001 fails, TC_002 also fails

# RIGHT -- each TC prepares its own conditions via Precondition
TC_001: Create user
  Precondition: None (creating new)
TC_002: Edit user profile
  Precondition: User "test_user" already exists in the system
  (Even if TC_001 fails, TC_002 still runs because the user already exists in test data)
```

### Principle 4: Include both Positive and Negative cases

**Positive tests** (Happy path): The system works correctly when input is valid. **Negative tests** (Unhappy path): The system handles it correctly when input is invalid.

```
# Positive -- "Cook it right, the pho should taste great"
- Login with valid credentials --> redirect to Dashboard
- Add to cart --> badge count increases by 1

# Negative -- "Add too much salt, the system should warn you"
- Login with wrong password --> display error message
- Login with empty email --> display "Email is required"
- Login with SQL injection ('; DROP TABLE users;--) --> display error, NOT get hacked
- Checkout with empty cart --> Checkout button is disabled
```

:::tip Aha moment
About **40-60% of bugs** come from negative cases -- things users **shouldn't do** but **will do**. Users are always more creative than you think. Testing both sides is what makes testing thorough.
:::

### Principle 5: Test Data must be specific, not vague

```
# WRONG -- "A valid email" -- which email exactly? Who knows?
Test Data: Enter a valid email

# RIGHT -- specify exact values, everyone uses the same data
Test Data: Email = "test_user_01@mail.com", Password = "Test@123"
```

---

## Practical Example 1: Login Feature

### Original Requirement

```
User Story: As a registered user, I want to login with email and password
so that I can access my account.

Acceptance Criteria:
1. Email and password are required fields
2. Email must be in valid format (contains @ and domain)
3. Password minimum 8 characters
4. Successful login --> redirect to Dashboard
5. Failed login --> display error message
6. 5 consecutive wrong passwords --> lock the account
7. "Remember me" keeps the session for 30 days
```

### TC_LOGIN_001: Successful Login

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_001 |
| **Title** | Verify successful login with valid credentials |
| **Priority** | High |
| **Precondition** | User account exists: test@mail.com / Pass@123 |
| **Module** | Authentication |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to /login | Login page displays: Email field, Password field, Login button |
| 2 | Enter "test@mail.com" in the Email field | Email field displays the entered value |
| 3 | Enter "Pass@123" in the Password field | Password field displays as dots (masked) |
| 4 | Click the "Login" button | Loading indicator appears briefly |
| 5 | -- | User is redirected to /dashboard |
| 6 | -- | Welcome message "Hello, Test User" is displayed |
| 7 | -- | User avatar/name appears in the header |

### TC_LOGIN_002: Login with Empty Email

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_002 |
| **Title** | Verify error when email field is empty |
| **Priority** | High |
| **Precondition** | On the /login page |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Leave the Email field empty | -- |
| 2 | Enter "Pass@123" in the Password field | -- |
| 3 | Click "Login" | Error "Email is required" appears below the Email field in red |
| 4 | -- | User remains on /login page (no redirect) |
| 5 | -- | Password field is NOT cleared |

### TC_LOGIN_003: Login with Wrong Password

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_003 |
| **Title** | Verify error message with incorrect password |
| **Priority** | High |
| **Precondition** | User account exists: test@mail.com / Pass@123 |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Enter "test@mail.com" in Email | -- |
| 2 | Enter "WrongPass@999" in Password | -- |
| 3 | Click "Login" | Error "Invalid email or password" is displayed |
| 4 | -- | Error does NOT reveal which field is wrong (security) |
| 5 | -- | Password field is cleared |

### TC_LOGIN_004: Account Locks After 5 Failed Attempts

| Field | Value |
|---|---|
| **ID** | TC_LOGIN_004 |
| **Title** | Verify account locks after 5 consecutive wrong passwords |
| **Priority** | Medium |
| **Precondition** | User account exists, not currently locked |

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login with wrong password (attempt 1) | Error "Invalid email or password" |
| 2 | Login with wrong password (attempt 2) | Error "Invalid email or password" |
| 3 | Login with wrong password (attempt 3) | Error "Invalid email or password. 2 attempts remaining" |
| 4 | Login with wrong password (attempt 4) | Error "Invalid email or password. 1 attempt remaining" |
| 5 | Login with wrong password (attempt 5) | Error "Account locked. Contact support" |
| 6 | Login with correct password | Still locked: "Account locked. Contact support" |

---

## Practical Example 2: E-commerce Checkout

### TC_CHECKOUT_001: Successful Checkout

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login with a registered user account | Dashboard page is displayed |
| 2 | Add "iPhone 15" to the cart | Cart badge shows "1" |
| 3 | Click Cart icon, select "Proceed to Checkout" | Checkout page with order summary |
| 4 | Verify order summary | Product name, quantity, and price are correct |
| 5 | Fill in shipping: "123 Nguyen Hue, District 1, HCM" | Address saved successfully |
| 6 | Select payment: Credit Card | Payment form appears |
| 7 | Enter card: 4111 1111 1111 1111, exp 12/28, CVV 123 | Card is accepted |
| 8 | Click "Place Order" | Order Confirmation page is displayed |
| 9 | Verify order ID | Format "ORD-XXXXXXXX" |
| 10 | Check email confirmation | Email with order details is sent |

### TC_CHECKOUT_002: Checkout with Empty Cart

| Step | Action | Expected Result |
|---|---|---|
| 1 | Login with a registered user | Dashboard |
| 2 | Go to /cart (no items) | Empty cart page |
| 3 | Click the "Checkout" button | Button is disabled OR message "Your cart is empty" |

### TC_CHECKOUT_003: Applying a Coupon Code

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add a product worth 500,000d to the cart | Cart total: 500,000d |
| 2 | Enter coupon "SALE20" | Message "Coupon applied" |
| 3 | Verify discount | Discount: -100,000d (20%) |
| 4 | Verify total | Total: 400,000d |
| 5 | Enter another coupon "FREESHIP" | Message "Only 1 coupon allowed" |
| 6 | Remove coupon "SALE20" | Total returns to 500,000d |

---

## Priority System -- "Which Dish to Cook First?"

When time is limited (and it always is), you need to know **which test cases to run first**.

| Priority | Criteria | Example | Regression? |
|---|---|---|---|
| **Critical** | Core business flow -- causes financial loss if broken | Login, Checkout, Payment | Always run |
| **High** | Important feature, affects many users | Search, Add to Cart, Profile | Always run |
| **Medium** | Standard feature, alternatives exist | Filter, Sort, Wishlist | Selective |
| **Low** | Minor, cosmetic, rare edge case | Tooltip, hover effect, icon alignment | Rarely |

:::tip Aha moment
The **80/20 rule**: 80% of serious bugs are found in 20% of test cases -- the **Critical + High** ones. When a deadline is tight, run Critical first, then High, then Medium if time allows. Low only when you have spare time.
:::

---

## Test Case Review Checklist -- Check Before Submitting

Before sending test cases for team review, self-check:

- [ ] Each test case has **1 clear purpose** (not testing 2 things in 1 TC)
- [ ] Steps are **specific** -- a newcomer to the team can execute them
- [ ] Expected results are **unambiguous** -- can be verified as Pass/Fail
- [ ] Includes both **positive and negative** cases
- [ ] Test data is **specific** (not "enter a valid email")
- [ ] Preconditions are **complete** -- no missing setup
- [ ] Covers all **Acceptance Criteria** from the User Story
- [ ] No **duplicates** with other test cases
- [ ] **Priority** is reasonable (Critical/High/Medium/Low)
- [ ] **Test design techniques** have been applied (EP, BVA, Decision Table...)

---

## Summary -- The Recipe for Writing Great Test Cases

| Aspect | Best Practice | Cooking Equivalent |
|---|---|---|
| **Structure** | ID, Title, Precondition, Steps, Data, Expected | Dish name, ingredients, instructions |
| **Steps** | 1 step = 1 action, specific | Each cooking step is separate |
| **Expected** | Specific, measurable, unambiguous | Clear description of the finished dish |
| **Independence** | Each TC runs independently | Each recipe is self-contained |
| **Coverage** | Positive + Negative + Edge cases | Cook it right + Cook it wrong + Cook it weird |
| **Priority** | Critical, High, Medium, Low | Main course first, dessert later |
| **Review** | Self-check before submitting | Taste before serving |
