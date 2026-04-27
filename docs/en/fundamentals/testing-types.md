# Testing Types

## The opening question: Why classify?

Imagine you just bought a brand-new car. What would you check?

- **"Does the car run?"** — Start the engine, put it in gear, press the gas, does the car move? This is checking **functionality** (Functional)
- **"Does the car run WELL?"** — Top speed? Fuel efficiency? Comfortable seats? Safe in a crash? This is checking **non-functional qualities** (Non-functional)

These two questions are the foundation for classifying **all types of testing** in software.

---

## Functional vs Non-functional — The Two Pillars of Testing

### Functional Testing — "WHAT does the system do?"

**Functional Testing** is checking whether the software **does the right things** as required. Focuses on the question **WHAT**.

> Think of a pocket calculator. Functional testing asks: "Does pressing 2 + 3 give 5? Does pressing CE clear the display? Does pressing % calculate the percentage correctly?"

Simply put: **does each button do its job correctly?**

### Non-functional Testing — "HOW WELL does the system perform?"

**Non-functional Testing** is checking the **quality** of how the system performs its functions. Focuses on the question **HOW WELL**.

> Still the same calculator. Non-functional testing asks: "Does pressing 2 + 3 give the result FAST? Is the screen readable in sunlight? How long does the battery last? Does it break if dropped?"

::: tip Aha moment
Functional = **"WHAT"** — Does the calculator add correctly?
Non-functional = **"HOW WELL"** — Does the calculator add fast? Does it work on mobile? Is it secure?

Software can **do everything right** functionally but still **fail** because it's too slow, hard to use, or insecure.
:::

### The big picture

```
Testing Types
├── Functional Testing (WHAT — What does the system DO?)
│   ├── Smoke Testing        → "Turn on the new TV — does the screen light up?"
│   ├── Sanity Testing       → "Doctor checking the arm that was just casted"
│   ├── Regression Testing   → "Fixed the kitchen pipes, check if the bathroom leaks?"
│   ├── Retesting            → "Re-check the exact pipe that was just fixed"
│   └── End-to-end Testing   → "Walk through the entire purchase journey"
│
└── Non-functional Testing (HOW WELL — How well does it perform?)
    ├── Performance Testing  → "How many people can the elevator carry?"
    ├── Security Testing     → "Is the door lock strong?"
    ├── Usability Testing    → "Can grandma use it?"
    ├── Compatibility Testing → "Does the app run on every phone?"
    └── Accessibility Testing → "Can a visually impaired person use it?"
```

---

## Functional Testing — Each type in detail

### Smoke Testing — "Turn on the new TV — does the screen light up?"

#### The essence

You just bought a new TV. Unbox it, plug it in. What do you check **first**?

1. Press the power button — does the TV turn on?
2. Does the screen display an image?
3. Do the speakers produce sound?
4. Does the remote control work?

You **don't** sit down and check every channel, every HDMI port, every sound setting right away. You just want to know: **"Does this TV work at a basic level?"**

That is **Smoke Testing** — a quick check of the **most critical functions** to confirm the software is stable enough for further testing.

#### Origin of the name — Why is it called "Smoke" Test?

::: info Fun fact
This term originated from the **electronics industry**. When a new circuit board was assembled, the engineer would plug it in for the first time. If **smoke came out** — the circuit was broken, no further testing needed.

Similarly, if the software can't even pass the smoke test (login fails, homepage crashes), there's no point doing detailed testing — **reject the build** immediately.
:::

#### Real-world example: Smoke Test for an e-commerce app

```
A new build was just deployed to the staging environment...

Smoke Test Checklist (10-15 minutes):
  ✅ App loads successfully, no blank page
  ✅ Login page displays, login works
  ✅ Homepage displays product listing
  ✅ Product search works
  ✅ Add to cart succeeds
  ✅ Checkout page loads
  ✅ Payment API responds

Result:
  → All PASS → Build is stable, proceed with detailed testing
  → Any FAIL → Reject build, request dev to fix immediately
```

#### Key characteristics

- **Wide but shallow** — covers many functions, but each one is only checked at a basic level
- **Fast** — only 10-15 minutes, not hours
- **Anyone can run it** — QA, Dev, PM can all perform it
- **Should be automated** — because it must run with every new build
- In a **CI/CD pipeline** (automated build and deploy system): smoke tests run automatically after each deployment, if they fail the system automatically rolls back

---

### Sanity Testing — "Doctor checking the arm that was just casted"

#### The essence

You broke your arm, and the doctor put it in a cast. At your follow-up visit, does the doctor examine **your entire body**? No. The doctor focuses on **that specific arm**: can it move yet? Still painful? Has the bone healed? Is the area around the cast normal?

That is **Sanity Testing** — after a specific part is fixed or changed, check **deeply** into exactly that part and its directly related areas.

#### When to use

- Dev fixes a specific bug → sanity check that bug and neighboring functions
- A minor change is made → verify the change works correctly
- Not enough time for full regression → sanity test the most critical parts

#### Smoke vs Sanity — Clear distinction

```
Scenario: New build deployed, dev fixed the bug "Discount code not being applied"

Step 1 — Smoke Test (wide, shallow):
   ├── Login OK?          ✅
   ├── Homepage OK?       ✅
   ├── Search OK?         ✅
   ├── Cart OK?           ✅
   └── Checkout OK?       ✅
   → Conclusion: Build is stable, continue testing

Step 2 — Sanity Test (narrow, deep) on the coupon section:
   ├── Apply valid code "SALE20"          ✅ Reduces by correct 20%
   ├── Apply expired code                 ✅ Shows error message
   ├── Apply then remove code             ✅ Price returns to original
   ├── Apply 2 codes at once              ✅ Shows "only 1 code allowed"
   ├── Checkout with discount code        ✅ Total is calculated correctly
   └── Discount code + free shipping      ✅ Both work together
   → Conclusion: Bug is fixed, coupon area is stable
```

| Criteria | Smoke Testing | Sanity Testing |
|---|---|---|
| **Scope** | Wide — entire application | Narrow — specific part |
| **Depth** | Shallow — basic checks only | Deep — thorough testing of that part |
| **When** | Receiving a new build | After a bug fix / change |
| **Purpose** | Is the build stable enough to test? | Does the fix/change work correctly? |
| **Analogy** | Turn on TV — does it light up? | Doctor checking the casted arm |

---

### Regression Testing — The MOST IMPORTANT type of test

#### The essence — The domino effect in software

Imagine your house has a leaking pipe in the **kitchen**. A plumber comes and fixes it. You check the kitchen — no more leaks, wonderful!

But wait... did you check the **bathroom**? Because the plumbing system is **all connected**. Fixing a pipe in the kitchen could very well cause a leak in the bathroom.

::: warning Aha moment — Why Regression Testing exists
In software, everything is **interconnected** just like a plumbing system. Fixing bug A can absolutely **break** feature B without anyone expecting it. This is called a **side effect**.

**Regression Testing** exists to answer one single question: **"Do the things that were working fine STILL work fine after the code change?"**
:::

#### Why is this the most important type of test?

**Real-world story:** Dev fixes a pricing discount bug in the Payment module. The code change affects how the total is calculated. Without regression testing:

```
Before the fix:
  Payment: calculates discount WRONG ❌ (bug)
  Cart: displays total correctly ✅
  Order History: displays correctly ✅

After the fix (WITHOUT regression testing):
  Payment: calculates discount CORRECTLY ✅ (bug fixed!)
  Cart: displays total WRONG ❌ (side effect!)
  Order History: displays WRONG ❌ (side effect!)

→ Fixed 1 bug, created 2 new bugs. Customers encounter new bugs in features that were already working.
```

#### Three Regression Test strategies

**1. Full Regression — Run the entire test suite**
- When: Major release, before go-live (deploying to production)
- Effort: Very high if manual (can take several days)
- Analogy: Check the **entire** plumbing system in the house

**2. Partial Regression — Run tests related to the changed area**
- When: Sprint release, minor fix
- Requires: **Impact analysis** — analyze which parts are affected by the change
- Analogy: Fix kitchen pipe → check kitchen + bathroom (same pipe line), no need to check the roof

**3. Risk-based Regression — Prioritize by risk level**
- When: Short on time, need to be selective
- Focus: Core business flows, areas with a history of many bugs
- Analogy: Check the main water pipes first, secondary pipes later

::: tip This is THE reason automation was born
Regression testing is the **#1 reason** to invest in **test automation**. Why?

A suite of 200 regression test cases:
- **Manual:** 3-5 days, error-prone due to repetition
- **Automation:** 30 minutes, 100% accurate, can run anytime

Every sprint has changes → must regression test → if manual, QA spends their entire career running regression. Automation frees QA to focus on **exploratory testing** (creative, discovery-based testing).
:::

---

### Retesting vs Regression — Two siblings often confused

#### Distinguishing with a real-world example

Scenario: Bug **"Discount code SALE20 doesn't deduct money"** has been fixed by dev.

```
RETESTING — Re-check THE EXACT bug:
  → Step 1: Add a product to the cart
  → Step 2: Enter code "SALE20"
  → Step 3: Verify the price was reduced by 20%
  → Result: PASS ✅
  → Conclusion: Bug has been fixed successfully

REGRESSION — Check the SURROUNDING functions:
  → Does another discount code (FREESHIP) still work? ✅
  → Do percentage-based and fixed-amount discounts both work? ✅
  → Is the total on the checkout page correct? ✅
  → Does the order confirmation email display the correct price? ✅
  → Does order history display correctly? ✅
  → Conclusion: No side effects
```

| Criteria | Retesting | Regression |
|---|---|---|
| **Purpose** | Confirm the bug **has been fixed** | Confirm the fix **didn't cause new bugs** |
| **Scope** | Only that exact bug | Related features |
| **Test cases** | The original test case (that found the bug) | The regression test case suite |
| **Required?** | **Always** — every bug fix must be retested | Depends on risk level |
| **Analogy** | Fix kitchen pipe → turn on kitchen faucet to check | Fix kitchen pipe → check the bathroom too |

::: tip Real-world process when a bug is fixed
1. **Retesting** (mandatory) — Run the original test case again, confirm bug is fixed
2. **Sanity Testing** — Test deeply around the bug area
3. **Regression Testing** — Test other related functions
:::

---

## Non-functional Testing — Each type in detail

### Performance Testing — "How many people can the elevator carry?"

An elevator designed for 10 people. Performance testing asks:
- **10 people** enter → runs normally? (**Load Testing** — testing with expected load)
- **20 people** try to squeeze in → what happens? (**Stress Testing** — testing beyond limits)
- Empty, then suddenly **15 people** jump in at once → does it jolt? (**Spike Testing** — testing sudden load)
- **8 people** going up and down continuously for **24 hours** → does it break? (**Endurance Testing** — testing durability)

| Type | Question | Real-world example |
|---|---|---|
| **Load Testing** | Can it handle normal traffic? | 1,000 users accessing simultaneously |
| **Stress Testing** | Where's the breaking point? | Increase to 5,000... 10,000 users |
| **Spike Testing** | What about sudden traffic? | Flash sale: 0 → 3,000 users in 1 minute |
| **Endurance Testing** | Any issues running long? | 1,000 users continuously for 24 hours |

**Metrics to monitor:**
- **Response time:** Page loads in under 2 seconds (users leave if it takes more than 3 seconds)
- **Throughput:** How many requests per second the system processes
- **Error rate:** Must be below 1%
- **Resource usage:** CPU < 80%, Memory < 80%

---

### Security Testing — "Is the door lock strong?"

You just built a beautiful house. Every room works great (functional). But... is the lock strong? Are the windows latched? Can a stranger get in?

| Check | Analogy | Software example |
|---|---|---|
| **Authentication** | Does the front door lock work? | Is login secure? Are passwords encrypted? |
| **Authorization** | Can a guest access the private rooms? | Can a regular user access the admin page? |
| **Data Protection** | Is the safe locked? | Is credit card information encrypted? |
| **Input Validation** | Are the windows latched? | Are SQL injection and XSS blocked? |

> **SQL injection** is a technique where hackers enter malicious code into input fields to gain unauthorized access to the database. **XSS** (Cross-Site Scripting) is injecting malicious scripts into a website to steal user information.

---

### Usability Testing — "Can grandma use it?"

This is the simplest test to evaluate: **give the product to someone who knows nothing about it and observe how they use it.**

If your grandma can order something on the app without calling to ask "where do I tap?" — the app has **good usability**.

| Criteria | Question | How to test |
|---|---|---|
| **Learnability** | Can they figure it out on first use? | Give a new user the product, no instructions, observe |
| **Efficiency** | How many steps to complete a task? | Does ordering take 3 steps or 10 steps? |
| **Memorability** | After not using it for a while, can they remember how? | After 2 weeks away, does the user get lost? |
| **Error recovery** | When they make a mistake, does the app help fix it? | Enter wrong email → does the app suggest "Missing @"? |
| **Satisfaction** | Are they happy after using it? | NPS (Net Promoter Score) survey |

---

### Compatibility Testing — "Does the app run on every device?"

Just like a movie needs to be watchable on a TV, laptop, tablet, and phone — software also needs to work across **many different environments**.

| Type | What to check | Examples |
|---|---|---|
| **Browser** | Popular browsers | Chrome, Firefox, Safari, Edge |
| **OS** | Operating systems | Windows, macOS, iOS, Android |
| **Device** | Device types | Desktop, tablet, mobile |
| **Screen size** | Screen dimensions | 1920px, 1366px, 768px, 375px |
| **Version** | Old vs new versions | Does app v2.0 work with the new API? |

**In practice:** Use **BrowserStack** or **LambdaTest** to test on hundreds of devices without buying physical devices. Usually prioritize testing on the top 3-5 browsers/devices with the highest user traffic (check using **Google Analytics**).

---

### Accessibility Testing (a11y) — "Can a person with disabilities use it?"

> **a11y** is an abbreviation of "accessibility" — the letter "a", 11 characters in the middle, and the letter "y".

Imagine your right hand is in a cast and you have to use the app with only your left hand. Or you're colorblind and can't distinguish between a green and a red button. Accessibility testing ensures **everyone** can use the product.

| Standard | What to check | Why it matters |
|---|---|---|
| **WCAG 2.1** | International standard | Many countries legally require it |
| **Screen reader** | Can the app be read by a screen reader? | Used by visually impaired people |
| **Keyboard navigation** | Can it be used with only a keyboard? | For people who can't use a mouse |
| **Color contrast** | Is text sufficiently contrasted with the background? | For colorblind people or those with weak vision |
| **Alt text** | Do images have text descriptions? | Screen readers read descriptions instead of images |

**Popular tools:** Lighthouse (built into Chrome DevTools), axe DevTools, WAVE.

---

## When to use which? — Timeline in a Sprint

### Real-world process diagram

```
Sprint begins → Dev finishes coding → Build deployed to staging
│
├─► STEP 1: Smoke Test (10-15 minutes)
│   "Turn on the TV — does it light up?"
│   ├── PASS → Continue to step 2
│   └── FAIL → Reject build, dev fixes and redeploys
│
├─► STEP 2: Functional Testing (1-3 days)
│   "Check each function in detail"
│   ├── Test new features against test cases
│   ├── Bug retesting (re-run original test cases)
│   ├── Sanity testing (deep test on recently fixed areas)
│   └── Edge cases & negative testing
│
├─► STEP 3: Regression Testing
│   "Does the old stuff still work?"
│   ├── Automation: 30-60 minutes ⚡
│   └── Manual (if no automation yet): 1-3 days
│
├─► STEP 4: Non-functional Testing (if needed)
│   ├── Performance — when there are major architecture changes
│   ├── Security — when there are features related to auth/payment
│   └── Compatibility — when there are UI changes
│
└─► STEP 5: Final sanity check before release
    "One last check — is everything good?"
```

### QA Checklist for a Sprint

| Phase | Testing Type | Required? | Duration |
|---|---|---|---|
| New build received | Smoke Test | **Required** | 10-15 minutes |
| Testing new features | Functional Test | **Required** | 1-3 days |
| Bug fix deployed | Retesting + Sanity | **Required** | 30 min - 2 hours |
| Before release | Regression Test | **Required** | 30 min (auto) / 1-3 days (manual) |
| Major release | Performance + Security | Recommended | 1-2 days |
| Web app | Compatibility | Recommended | 0.5-1 day |
| Public-facing app | Accessibility | Recommended (legally required in some countries) | 0.5-1 day |

---

## Chapter Summary

| Type | Key question | When | Effort | Analogy |
|---|---|---|---|---|
| **Smoke** | Is the build alive? | Every new build | Low (15 min) | Turn on TV — does it light up? |
| **Sanity** | Is the fixed part OK? | After every fix/change | Low-Medium | Doctor checking the casted arm |
| **Regression** | Does the old stuff still work? | Before release | High (should automate) | Fix kitchen pipe — check the bathroom |
| **Retesting** | Is the bug fixed? | Every bug fix | Low | Turn on the kitchen faucet that was just fixed |
| **Performance** | Fast? Handles load? | Major release | Medium-High | How many people can the elevator carry? |
| **Security** | Is it safe? | Periodically + major releases | Medium-High | Is the door lock strong? |
| **Usability** | Easy to use? | When there's new UI | Medium | Can grandma use it? |
| **Compatibility** | Runs everywhere? | Major release | Medium | Movie watchable on every device? |
| **Accessibility** | Can everyone use it? | When there's new UI | Medium | Can a person with disabilities use it? |

::: tip Key takeaways
- **Smoke** = Wide, shallow — quick check of everything
- **Sanity** = Narrow, deep — thorough check of a specific part
- **Retesting** = That exact bug
- **Regression** = Everything around that bug
- **Regression is the #1 reason to invest in automation**
:::
