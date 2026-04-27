# Testing Concepts

## What is Software Testing — really?

You buy a brand-new motorbike. Before hitting the road, what do you do? You **check**: do the brakes work, do the lights turn on, is there enough fuel? You do this because if the brakes fail in the middle of the road, the consequences are severe.

Software Testing works the same way — except instead of checking a motorbike, you are checking **software**.

**The essential definition:**

> Software Testing is the process of **asking questions** of the software: "Do you work correctly?" — and then **finding evidence** to answer that question.

The evidence here is: click the Login button → does it go to the Dashboard? Enter a wrong password → does it show an error message? Rather than just assuming "it's probably fine."

### Testing is NOT "finding bugs"

Many people think QA = finding bugs. Wrong.

Bugs are merely a **byproduct** of testing. The real purpose is to **provide information** to the team so they can make decisions: "Is this software good enough to release?"

- If QA says "95% tests pass, 0 critical bugs" → PM decides to release
- If QA says "Payment module has 3 critical bugs" → PM decides to delay the release

QA is the **information provider**, not the **decision maker**.

---

## Why is Testing critically important?

### The cost of fixing bugs increases EXPONENTIALLY over time

Think of it this way:

```
You write an email, and spot a typo BEFORE sending:
→ Fix takes 2 seconds (backspace + retype)

You spot the typo AFTER sending it to 500 people:
→ You have to send a correction email, apologize, explain → credibility lost
```

Software works the same way:

| Bug discovered at stage... | Relative cost to fix | Why? |
|---|---|---|
| Writing requirements | **$1** | Just fix one line in the document |
| During coding | **$10** | Developer fixes their own code |
| During testing | **$100** | Developer fixes + QA has to retest |
| After release to users | **$1,000 - $10,000+** | Hotfix + rollback + credibility loss + users leaving the app |

**Real-world examples that made headlines:**
- **2012 — Knight Capital:** A software trading bug → the company lost **$440 million USD** in 45 minutes → went bankrupt
- **Every day:** App crashes → users delete the app → revenue lost. Checkout page breaks → users abandon their cart → money lost

> Testing helps **detect bugs early** → cheaper to fix → prevents disasters.

---

## QA vs QC vs Testing — Three concepts often confused

### Explained with a shoe factory analogy

**QA (Quality Assurance)** = Ensuring the **process** of manufacturing is good.
> "Do we have a process for inspecting leather before cutting? Is there a checklist for each stage? Are workers trained?"
> QA **prevents** defects by following the right process from the start.

**QC (Quality Control)** = Inspecting the **product** that has been made.
> "Are these shoes misaligned at the sole? Is the stitching strong? Is the color correct?"
> QC **detects** defects in the product.

**Testing** = The **specific act** of checking.
> "I'm pulling on the thread to see if it breaks. I'm trying on the shoe to see if it hurts."
> Testing is the **execution** of checking.

### The relationship

```
QA (broadest) — manages the entire quality process
 └── QC — controls quality of specific products
      └── Testing — the specific act of checking
```

**In practice:** The title "QA Engineer" usually encompasses all three: you test (Testing), report (QC), and propose process improvements (QA). Don't worry too much about titles — understanding the essence is what matters.

---

## 7 Testing Principles — ISTQB

ISTQB (International Software Testing Qualifications Board) is an international organization that sets standards for the testing industry. They distilled 7 foundational principles — these are not abstract theory, but **hard-won lessons** from millions of projects.

### 1. "Testing shows the presence of defects, not their absence"

**Essence:** It's like checking 100 apples out of a barrel of 1,000. Finding 100 good apples doesn't mean the remaining 900 are also good — apple number 101 might be rotten.

**Application:** Never say "the system has no bugs." Instead say "within the scope tested, no bugs were found."

### 2. "Exhaustive testing is impossible"

**Essence:** A form with 5 input fields, each accepting 100 different values → 100^5 = **10 billion** combinations. If each combination takes 1 second to test → you'd need **317 years** to test everything.

**Application:** Choose to test **what matters most** instead of testing everything. This is why you need Test Design Techniques (covered in a later article).

### 3. "Early testing saves money"

**Essence:** Recall the cost example above. A bug found at the requirements stage costs $1 to fix. The same bug found in production costs $10,000.

**Application:** QA should **participate in reading requirements from the start** — no code needed, no testing needed, just reading and asking: "Does this requirement have contradictions? Are any cases missing?"

### 4. "Defects cluster together"

**Essence:** Like the 80/20 rule (Pareto): 80% of bugs live in 20% of the code. Complex modules (Payment, Cart) have more bugs than simple ones (About Us, FAQ).

**Application:** Analyze which modules are most error-prone → focus your testing efforts more heavily there.

### 5. "The pesticide paradox"

**Essence:** Just like pesticide used for too long causes insects to develop resistance, running the same 100 test cases over and over only confirms old bugs haven't returned — it won't find new bugs.

**Application:** Regularly **update your test cases**, add new scenarios. Combine with [Exploratory Testing](/manual-testing/exploratory-testing) to find unexpected bugs.

### 6. "Testing is context-dependent"

**Essence:** Testing a game app is completely different from testing a banking app. A game can tolerate occasional crashes. A banking app — one miscalculation of money = disaster.

| App | Testing focus |
|---|---|
| Mobile game | Performance, UX, compatibility |
| Banking | Security, accuracy, audit trail |
| Startup MVP | Happy path, ship fast |

### 7. "Absence of errors is a fallacy"

**Essence:** You build a perfect bridge with zero technical defects. But the bridge is in a location nobody needs to cross → the bridge is useless.

Software is the same: no bugs, but users don't like using it, the UI is confusing, essential features are missing → it still fails.

---

## Verification vs Validation

These two concepts sound similar but are **completely different**:

**Verification** — "Are we **building it right**?"
> Checking whether the product matches the **design specifications** (spec/requirement).
> Example: The requirement says "Login button is blue" → check if the Login button is actually blue.

**Validation** — "Are we **building the right thing**?"
> Checking whether the product meets the **actual needs** of users.
> Example: The Login button is blue (matches spec), but a 60-year-old user can't see it because it's too small → fails validation.

**An easy-to-remember example:**

You order a custom birthday cake with the requirements: "Strawberry cream cake, 2 tiers, with 'Happy Birthday' written on it."

- **Verification:** The bakery checks: Strawberry cream? ✅ 2 tiers? ✅ Correct text? ✅ → Matches the requirements.
- **Validation:** The recipient: "I'm allergic to strawberries..." → The requirements were met, but the **actual need** was not satisfied.

---

## Error → Defect → Failure — The causal chain of bugs

These three terms describe the **3 stages** of a software bug:

**Error (Mistake)** — A human makes a mistake.
> The developer misunderstands the requirement: "10% discount" but codes it as "subtract 10 dollars."
> The error exists **in someone's mind**, not yet in the code.

**Defect (Bug in code)** — The result of an Error, now embedded in the code.
> The line of code: `price = price - 10` instead of `price = price * 0.9`
> The defect exists **in the code** and can be found by reading the code.

**Failure (Incident)** — The user or QA sees the bug when running the software.
> A product priced at $1,000,000, with a 10% discount applied, shows $999,990 instead of $900,000.
> The failure is **in the running system**, visible to the user.

```
Human → Error: Misunderstood "10% discount"
  ↓
Code → Defect: price = price - 10  (wrong logic)
  ↓
System → Failure: User sees the wrong price
```

**Important point:** Not every Defect causes a Failure. If the buggy line of code is in a feature nobody uses → the Defect exists but nobody has seen a Failure. Like a bridge with a crack that nobody has walked across yet — the crack is there, but nobody has fallen.

---

## The mindset of a great Tester

Technical knowledge can be learned by anyone. But the **way you think** is what sets you apart:

### "What if...?" — Always ask "What if... then what?"

Every time you see an input field, a button, or a web page — a great QA automatically asks:

```
Name input field:
- What if I enter emoji 🎉?
- What if I enter 10,000 characters?
- What if I enter HTML code <b>bold</b>?
- What if I leave it blank?
- What if I only enter spaces?

Payment button:
- What if I click it twice in quick succession? (charged twice?)
- What if the network drops mid-process?
- What if I switch tabs for 30 minutes and then come back and click?
```

### Think like a User vs Think like a Hacker

**User:** "Is this page easy to use? Do I understand what this button does?"
**Hacker:** "Can I see someone else's data by changing the number in the URL?"

A great QA **thinks both ways** — ensuring the user is happy while also ensuring the system is secure.

### Evidence-based — Everything needs proof

```
❌ "I think there's a bug" → Nobody believes you
✅ "When entering X at steps 1-2-3, the result is Y, but the requirement says it should be Z.
    Here's a screenshot. Here's the console log." → Dev fixes it immediately
```

---

## Common Mistakes

### ❌ Only testing the Happy Path
> ✅ **Always test Negative Paths and Edge Cases too** — wrong input, empty fields, special characters, boundary values.
> 💡 **Why:** 70-80% of bugs are in cases that users "shouldn't do" but still do. The happy path is usually already tested by the developer.

### ❌ Assuming instead of Verifying
> ✅ **Everything must have evidence** — screenshots, logs, steps to reproduce. "I think it's correct" is not testing.
> 💡 **Why:** No evidence = you can't convince anyone. Developers will ask "reproduce it for me" — if you don't have clear steps, your bug report gets rejected.

### ❌ Skipping Requirement Review
> ✅ **Read requirements BEFORE dev starts coding** — ask questions immediately when you see ambiguity, missing acceptance criteria, or contradictions.
> 💡 **Why:** A bug found at the requirements stage costs $1 to fix. The same bug found after coding is done costs $100+. QA reading requirements early = saving the whole team weeks of effort.

### ❌ Testing without a plan — "open the app and click around randomly"
> ✅ **Have a test plan or checklist before starting** — even a simple one so you know what you'll test.
> 💡 **Why:** Random testing can't be repeated and can't measure coverage. You won't know how much you've tested or what's still missing.

---

## Summary

| Concept | Essence in one sentence |
|---|---|
| **Testing** | Ask the software "are you correct?" and find the evidence |
| **QA/QC/Testing** | QA = process, QC = product, Testing = the act of checking |
| **7 Principles** | Hard-won lessons: test early, test smart, you can't test everything |
| **Verification** | Built correctly according to the blueprint? |
| **Validation** | Built the right thing that users need? |
| **Error→Defect→Failure** | Human mistake → Code bug → System malfunction |
| **Tester Mindset** | "What if?", think like user + hacker, always need evidence |
