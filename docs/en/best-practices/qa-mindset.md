# QA Mindset — 5 Pillars of Thinking

## What is Mindset? Why is it more important than Skills?

**Essence:** Mindset is **how you see everything** — before you ever use any tool.

Imagine two chefs with the same knife, stove, and ingredients. Yet one makes a delicious dish while the other makes a mediocre one. The difference is not in the tools — it is in **how they taste, how they observe, and how they understand the ingredients**. QA is no different.

Two QAs both know Playwright, both know SQL, and both read the same requirement. Yet one finds 20 bugs while the other finds only 5. The difference lies in **mindset** — how they think, how they ask questions, and how they perceive problems.

> Skills can be learned in a few months. Mindset must be trained every day — like going to the gym for your brain.

::: tip Aha Moment
You don't need expensive tools to find bugs. You need the **right way of thinking**. A QA with a good mindset and only browser DevTools will find more bugs than a QA with 10 tools but a poor mindset.
:::

---

## 5 Pillars of QA Mindset

### Pillar 1: Think Like a User — "Would grandma understand this button?"

**Essence:** You are not the user. You understand tech, you are familiar with interfaces, you know the flow. But real users do not. **Think Like a User** means setting aside all your technical knowledge and asking: "If this were my first time using this app, would I understand it?"

**Analogy (Real-world example):** You design a door. You know you need to **pull** to open it. But if the door has a handle shaped like a **push** bar — 100% of people will push first. That is **bad UX** — a design that causes users to act incorrectly. In software, a "Cancel" button colored green (just like "Confirm") is the same kind of bad UX.

**Core questions before every feature:**

```
1. How will a real user actually use this feature? (Not the way the dev imagines)
2. Who will use it? (A tech-savvy 25-year-old? Or a 70-year-old grandmother?)
3. What does the user expect when they click this button?
4. If I were a first-time user — would I know what to do next?
5. If an error occurs — would the user know what to do?
```

**Real-world comparison:**

| Scenario | Ordinary QA | QA with User Mindset |
|---|---|---|
| Login | "Login succeeded -> test pass" | "Login takes 5 seconds; the user will think the app froze. Needs a loading indicator." |
| Error message | "Error message displayed -> pass" | "The message 'ERR_422' doesn't help the user understand what to do. It should say: 'Please enter a valid email'" |
| Checkout | "Checkout flow works" | "Checkout requires 7 steps — too many. Users will abandon their cart around step 4-5." |
| Search | "Search returns results" | "Searching 'iphone' returns no results for 'iPhone'. Users will think it's out of stock." |
| Form | "Form submitted successfully" | "The form has 15 fields but doesn't save drafts. If the user accidentally closes the tab, all data is lost." |

**Daily practice exercises:**
- Open an app you use every day (Grab, Shopee, Tiki)
- Pretend you are a 70-year-old grandmother using a smartphone for the first time
- Try to complete 1 task (place an order, make a payment)
- Write down every point where you feel confused or stuck

::: tip Aha Moment
Testing is not just about "does the feature work?" but "does the user actually **want** to use this feature?". A feature that works correctly but is confusing — is still a bug from the user's perspective.
:::

---

### Pillar 2: Think Like a Hacker — "Change the URL and see if you can view someone else's data?"

**Essence:** Hackers don't use apps the way they were designed. They **look for ways to circumvent, break, and bypass**. Think Like a Hacker means you proactively **search for weaknesses** in the system — before a real hacker does.

**Analogy (Real-world example):** You lock your front door before going to sleep. But did you check the windows? The back door? The emergency exit? The garage? Hackers don't knock on the front door — they look for unlocked windows. A QA must also **check every "window"** in the system.

**How to think when testing each feature:**

```
For EVERY input field, ask:
- What can I enter here to crash the system?
- Is there a way to bypass validation? (Frontend checks it, but what about the API?)
- What happens if I send 1000 requests at once?

For EVERY URL/API, ask:
- What happens if I change the parameter? (/orders/123 -> /orders/124)
- Can I view someone else's data?
- What if I remove the token and call the API?
- What if I send a request with a lower role?
```

**"Hacker Style" test table for each feature type:**

| Field/Feature | Normal testing | Hacker testing |
|---|---|---|
| Search box | Enter "laptop" -> results appear | Enter `<script>alert('xss')</script>` -> check for XSS |
| Price field | Enter "100000" | Enter `-100`, `0`, `99999999999`, `abc` |
| Upload avatar | Upload a PNG image | Upload a `.exe`, `.php`, a 500MB file, a file named `../../../etc/passwd` |
| Order ID in URL | Go to `/orders/123` (my order) | Change to `/orders/124` (someone else's order) |
| Coupon code | Apply coupon "SALE10" | Apply the same coupon 100 times. Apply 2 coupons at once. Apply an expired coupon. |
| Payment | Successful payment | Double-click the Pay button (charged twice?). Modify the price in the request body. |
| Login | Login with correct username/password | Try 1000 passwords in a row (brute force). Login with SQL injection: `' OR 1=1 --` |
| API endpoint | Call API with a valid token | Call without a token. Expired token. Token of another user. |

**Frightening real-world example:**

```
Scenario: E-commerce app, order detail page
URL: /api/orders/12345

Ordinary QA: View my order -> displays correctly -> Pass

Hacker QA:
1. Change 12345 to 12346 -> See someone else's order! -> Critical Bug
2. Try /api/orders/-1 -> Server returns a stack trace -> Info Disclosure Bug
3. Call API without a token -> Still returns data -> Auth Bug
4. Try /api/orders/../../users -> Path Traversal -> Critical Bug

-> Each of these bugs could make headlines if exploited in production.
```

::: tip Aha Moment
You don't need to be a security expert. You just need to ask: **"If I were a bad actor, what would I try?"**. That question alone will help you find 50% of security bugs that ordinary QAs miss.
:::

---

### Pillar 3: Question Everything — "The spec says X, but what about NOT X?"

**Essence:** Humans tend to **assume**. "The dev probably handled it", "It's probably the same as the old version", "The requirement doesn't mention it, so it's probably not needed". Every assumption is a **bug waiting to happen**. Question Everything means **never assume — always verify**.

**Analogy (Real-world example):** You are buying a house. The owner says "The roof doesn't leak". Do you just believe them? No — you visit the house, inspect the ceiling, ask the neighbors, and check during the rainy season. That is Question Everything — **trust but verify**.

**The most dangerous assumptions:**

```
"It's probably the same as the old version"
   -> Reality: The dev refactored it; the behavior has changed. VERIFY!

"The dev probably handled the edge case"
   -> Reality: Devs focus on the happy path. Edge cases are often forgotten. TEST IT!

"The requirement doesn't mention it, so it probably doesn't need testing"
   -> Reality: Requirements are often incomplete. That's exactly where bugs hide. ASK!

"It passed on Chrome, so Firefox is probably fine too"
   -> Reality: CSS rendering differs, JS engines differ. TEST IT!

"The API returned 200, so the data must be correct"
   -> Reality: The API returns 200 but the body is empty, or the data is wrong. VERIFY THE DATA!

"The dev says it's fixed, so it must be fixed"
   -> Reality: Fixing one thing can break another. ALWAYS RETEST!
```

**5 golden questions for EVERY requirement:**

| # | Question | Specific example |
|---|---|---|
| 1 | "What if the user DOESN'T do this step?" | The form has 5 fields — the user fills in only 3, then submits? |
| 2 | "What if the data is EMPTY/NULL?" | A new user with no orders — what does the Order History page show? |
| 3 | "What if an ERROR occurs — what does the user see?" | API timeout — does the user see a blank page or an error message? |
| 4 | "The spec says X — but what about the OPPOSITE?" | "Coupon gives 10% off" — But what if the order total is $0? Does it go negative? |
| 5 | "What cases does the spec NOT MENTION?" | "Users can edit their profile" — But what about editing to an empty name? Editing with emoji? |

**Real-world example — Reading requirements and asking questions:**

```
Requirement: "Users can apply a coupon code at checkout"

Ordinary QA: Writes 3 test cases -> Apply coupon -> Price reduced -> Pass

Question Everything QA:
1. Apply coupon then REMOVE it -> does the price revert to the original?
2. Can you apply 2 coupons at once? If not -> what error message?
3. Expired coupon -> what message? "Invalid" or "Expired"?
4. Coupon only for orders over $50 -> what about a $49 order?
5. Apply coupon -> go back to cart -> return to checkout -> is the coupon still applied?
6. Apply coupon on web -> check on mobile app -> is it consistent?
7. 50% off coupon -> $10 order -> $3 shipping -> which price is discounted?
8. Apply coupon -> change products in cart -> is the coupon still valid?
9. Coupon for "Phones" category -> cart has both Phones + Accessories -> which item gets the discount?
10. 2 users apply a coupon limited to 100 uses -> race condition?
```

::: tip Aha Moment
The requirement only tells you **half the story**. The other half — the things the requirement DOESN'T say — is exactly where bugs hide. **The best QA question is not "Does it work?" but "In what cases does it NOT work?"**
:::

---

### Pillar 4: Attention to Detail — "Is this font 14px or 13px?"

**Essence:** Bugs are usually not in the "big" things — they hide in **small details** that others overlook. Attention to Detail means you **see things others don't** — a pixel that's off, an amount wrong by one cent, a timezone off by one hour, a console warning everyone ignores.

**Analogy (Real-world example):** You go to a doctor. A good doctor doesn't just ask "Where does it hurt?". They look at your skin color, check your heart rate, ask about your sleep, and review your medical history. They **examine every detail** — because a small symptom can be the sign of a serious condition. QA works the same way — today's console warning could be tomorrow's server crash.

**Details to check — Categorized:**

**UI/UX Details:**

```
- Font size: Design says 14px — is it actually 13px? (Use DevTools -> Computed tab)
- Font weight: Bold or Semi-bold? (400 vs 600 vs 700 — they look similar)
- Color: #333333 or #3333333? (One character off -> different color)
- Spacing: Padding 16px or 12px? Is the margin between elements consistent?
- Alignment: Is the text truly centered? (Hard to tell by eye -> use DevTools)
- Responsive: iPhone SE (smallest) -> is text cut off?
- Loading state: When fetching data -> what does the user see? Blank? Skeleton? Spinner?
- Empty state: No data -> "No results" or a blank white screen?
- Error state: API failure -> what message? Or just a blank page?
- Hover/Focus state: Does the button have a hover effect? Focus ring for accessibility?
```

**Data Details:**

```
- Currency: $1,500,000 or 1500000? (Formatted by locale)
- Date/Time: UTC or local timezone? (Wrong timezone = wrong date)
   -> Example: Server UTC 23:30 on Dec 31 = Vietnam 06:30 on Jan 1 -> Wrong date!
- Name: "Nguyen Van An" or "nguyen van an"? (Capitalization)
- Phone number: "0901234567" or "+84901234567"? (Format)
- Pagination: Shows "Showing 1-10 of 100" — but with a filter? "1-10 of 3"?
- Sort: Sort by name -> "An, Binh, Cuong" or "an, Binh, cuong"? (Case-sensitive?)
- Decimal: 1.5 or 1,5? (US format vs European format)
- Currency symbol: "$" before the number or "VND" after the number?
```

**Technical Details (F12 is your best friend):**

```
- Console tab: Any errors or warnings? (Many QAs NEVER open the Console)
- Network tab: Any failed requests (red)? What's the response time?
- API response: Status 200 but body contains a hidden error message?
- Local storage/cookies: Is sensitive data stored in plain text?
- Memory leak: Navigate back and forth repeatedly -> does RAM keep increasing?
- Image: Does the image lazy load? Broken image? Is there alt text? (Accessibility)
```

**Real-world example — Bugs only a "detail person" would find:**

```
Scenario: E-commerce — Product Detail page

Ordinary QA: Product displays correct name, price, image -> Pass

Attention to Detail QA:
1. Price shows "1,500,000 VND" but cart shows "1500000" -> Inconsistent
2. Product image is 5MB -> takes 3 seconds to load on 4G -> Needs optimization
3. Product description has a typo: "Samsng Phone" -> Bug
4. Console has a warning: "Each child should have a unique key" -> React bug
5. Breadcrumb: Home > Electronics > Phones — but the product is a Laptop -> Bug
6. Meta title still says "Product Detail" instead of the product name -> SEO failure
7. Schema markup price = 0 -> Google displays the wrong price -> Bug
```

::: tip Aha Moment
Open **F12 (DevTools)** ALWAYS when testing. The Console tab and Network tab give you information that the UI never shows. 80% of hidden bugs live there — especially console warnings, failed API calls, and slow responses.
:::

---

### Pillar 5: Big Picture Thinking — "Fix the product price -> also check Cart, Checkout, Email, Dashboard, Reports"

**Essence:** No feature exists in isolation. Everything in a system is **connected** like dominoes. A change in one place can **break something elsewhere**. Big Picture Thinking means you see the **chain of dominoes** — not just the one right in front of you.

**Analogy (Real-world example):** You change your work hours from 8 AM to 9 AM. Sounds simple? But think again: your child pickup time changes -> different bus -> lunch at a different time -> meetings conflict -> deadlines affected. **One small change -> a long chain of consequences**. Software is the same.

**Real-world example — The Domino Effect:**

```
Dev fixes the discount calculation logic:

Ordinary QA:
  -> Test coupon code -> Price reduced correctly -> Pass -> Done!

Big Picture QA — following the domino chain:
  -> Coupon code -> Price reduced correctly
  -> Cart total calculated correctly after discount?
  -> Checkout total matches cart? (Many apps recalculate at checkout)
  -> Order confirmation page displays correctly?
  -> Confirmation email shows the correct price? (Email uses a separate template!)
  -> Order history displays correctly?
  -> User returns to buy again -> coupon marked as used -> cannot reapply?
  -> Admin dashboard -> revenue report correct?
  -> Export CSV/Excel -> figures match the dashboard?
  -> Accounting system (if integrated) -> data correct?
  -> Refund flow -> refund the correct amount after discount?
```

**Impact Analysis Framework — Ask 5 questions:**

| # | Question | Purpose |
|---|---|---|
| 1 | What **modules** does this feature interact with? | Find integration points |
| 2 | Which **APIs** are affected? | Find affected endpoints |
| 3 | What **data** changes? (DB, cache, session) | Find data corruption risks |
| 4 | **Who** uses this feature? (Customer? Admin? Both?) | Find affected users |
| 5 | If this feature **fails** — what is the **business** impact? | Assess priority |

**Impact Analysis example:**

```
Feature: Add a "Referral Code" at registration

Affected modules:
+-- Registration flow (obviously)
+-- User profile (display the user's own code)
+-- Reward system (referrer earns a reward)
+-- Notification (email/push to the reward recipient)
+-- Admin panel (manage referral program)
+-- Reports (referral conversion rate)
+-- Payment (if reward is monetary)
+-- Fraud detection (spam referral codes?)

-> See? One "simple" feature affects 8+ modules.
   An ordinary QA tests only Registration. A Big Picture QA tests all 8.
```

::: tip Aha Moment
When you receive a new feature, **sketch out on paper** (or in your head) the affected modules. Just 5 minutes of brainstorming will help you find 2-3x more test cases than the requirement mentions. This is the skill that separates a Senior QA from a Junior QA.
:::

---

## Training Your Mindset Every Day — 15 Minutes/Day

Mindset is not something you acquire by reading about it. It is like a **muscle** — it needs daily training.

### 15-minute daily routine:

```
Minutes 1-5: READ
  -> Read 2-3 bug reports from your team (Jira)
  -> Ask: "Why didn't I find this bug?"
  -> Ask: "Which pillar does this bug fall under?" (User? Hacker? Detail? Big Picture?)

Minutes 6-10: OBSERVE
  -> Open 1 app you use daily (banking, shopping, social media)
  -> Find 3 things that could be improved (UX, performance, accessibility)
  -> Think: "If I were testing this app, what bugs would I find?"

Minutes 11-15: LEARN
  -> Read 1 short article about testing (Ministry of Testing, dev.to, Medium)
  -> Or: Read 1 case study about a famous production bug
  -> Write down 1 new thing you learned
```

### When receiving a new requirement — Thinking Checklist:

```
- Who will use it? (Persona — who, how old, what tech level?)
- What is the happy path? (The "ideal" journey)
- What unhappy paths could occur? (Wrong input, timeout, error)
- Edge cases: empty, null, max, min, special chars, emoji?
- Which modules are related? (Impact analysis — the domino effect)
- Security concerns? (Auth, data access, injection)
- Performance concerns? (Slow load, large data, concurrent users)
- Accessibility concerns? (Screen reader, keyboard navigation, color contrast)
- Which requirements are unclear -> NEED TO ASK RIGHT AWAY?
```

### After finding 1 bug — Don't stop there:

```
A bug = A clue, not the destination.

1. Bug found here -> do SIMILAR places have the same issue?
   (Bug on the Product page -> check the Category page, Search page)

2. Bug with this data -> what about OTHER DATA?
   (Bug with price $0 -> check negative price, max price, decimal price)

3. Bug on Chrome -> what about OTHER BROWSERS?
   (Chrome OK, Firefox broken -> rendering bug)

4. Bug in the UI -> is the API LEVEL also affected?
   (UI shows wrong price -> check API response -> maybe API is correct, UI parses it wrong)

5. Could this bug be EXPLOITED (security)?
   (Seeing someone else's data -> definitely a security vulnerability)
```

---

## Common Mindset Mistakes

| Mistake | Why it's dangerous | Correct mindset |
|---|---|---|
| "Only test the happy path" | The happy path covers only 30% of scenarios. 70% of bugs are in negative + edge cases | Always test negative, boundary, and edge cases |
| "Dev says OK, so it's OK" | Devs are biased because they wrote the code. They test based on their own logic | Trust but verify — ALWAYS retest |
| "It's not a bug, it's a feature" | Hides quality issues, accumulates technical debt | Report objectively, let the PM decide |
| "Testing is done, no need to retest" | Regression bugs — fixing A breaks B | Regression test every release. Automate if possible |
| "Only test what's assigned to me" | Misses integration bugs at the "boundaries" between features | Exploratory testing + impact analysis |
| "Tools will find all bugs" | Tools only find bugs you **tell them to find** | Tools assist; mindset decides |
| "More bugs = better QA" | Quantity does not equal quality. 1 critical bug > 10 cosmetic bugs | Focus on severity and business impact |
| "The requirement is everything" | Requirements are always incomplete | Requirements are the starting point, not the finish line |

---

## Summary — 5 Pillars Cheat Sheet

| Pillar | Core Question | Real-world Check |
|---|---|---|
| **User Thinking** | "Would grandma understand this button?" | Try using the app through a newcomer's eyes |
| **Hacker Thinking** | "Change the URL, modify the request — what happens?" | Always try to break it before confirming pass |
| **Question Everything** | "The spec says X — but what about NOT X?" | Never assume — always verify |
| **Attention to Detail** | "Any errors in F12?" | Open DevTools ALWAYS when testing |
| **Big Picture** | "Fix this spot -> where's the domino effect?" | Draw an impact map before testing |

::: tip Final Aha Moment
These 5 pillars are not a checklist to follow mechanically. They are **lenses** — 5 different pairs of glasses for looking at the same feature. Each time you "switch glasses", you will see bugs that the previous pair missed. An outstanding QA is someone who **continuously switches lenses** — User -> Hacker -> Questioner -> Detective -> Architect — until nothing remains hidden.
:::
