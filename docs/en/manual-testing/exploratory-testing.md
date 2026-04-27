# Exploratory Testing

## Exploratory Testing Is Like a Detective Investigating a Crime Scene

Imagine two ways to inspect a house:

**Method 1 -- Scripted Testing (Following a pre-made checklist):**
You hold a list: "Check the front door, check the windows, check the locks." You follow the list exactly, ticking off each item. List complete = job done. But what if there's a crack in the wall that **isn't on the list**? You skip it.

**Method 2 -- Exploratory Testing (Detective investigating):**
You walk into the house, observe the big picture, then **follow your instincts**: "Hmm, water stain on the ceiling... probably a leak. Let me check the pipes above." You **explore, reason, and test** -- all at the same time, without following a script.

| Scripted Testing | Exploratory Testing |
|---|---|
| Follows a pre-made list | Explores using intuition + experience |
| Only finds bugs that were "predicted" | Finds **unexpected** bugs |
| Follows exact steps | Creative, tries many approaches |
| Misses edge cases | Specializes in finding edge cases |
| Doesn't change during execution | Reacts to the system's behavior |

:::tip Aha moment
Exploratory Testing **is not "random testing"**. It is like a skilled detective: there is a goal (charter), a time limit (time-box), documentation (session notes), and a report (debrief). The only difference is the **method of discovery** -- it doesn't follow a script.
:::

**Real-world statistic:** Approximately **35% of serious bugs** are found through Exploratory Testing -- bugs that scripted testing misses because nobody thought to look for them.

---

## Session-Based Test Management (SBTM) -- Even Detectives Need a Plan

SBTM is a framework that gives Exploratory Testing **structure and measurability**. It's not "open the app and click randomly" but rather "have a mission, have a time limit, have a report."

### Charter -- "The Investigation Order"

A charter tells the detective: **what to investigate, how, and what to look for**.

Format: **Explore [target] with [resources] to discover [information]**

```
# Example charters -- each charter is an "investigation order"

"Explore the checkout flow                    # What to investigate
 with different payment methods               # How
 to discover payment processing bugs"         # What to look for

"Explore the search feature
 with special characters and long queries
 to discover input handling issues"

"Explore the mobile responsive layout
 with iPhone SE and iPad screens
 to discover UI/UX issues"

"Explore the user registration
 with boundary values and invalid data
 to discover validation gaps"
```

### Session Structure -- "The Investigation Process"

Each session lasts **60-90 minutes** (time-boxed -- set a timer, stop when time is up).

```
# Phase 1: Setup (5 minutes) -- Prepare before "entering the scene"
- Read the charter (understand the mission)
- Prepare environment, test accounts
- Open necessary tools (browser DevTools, note app)

# Phase 2: Explore (45-70 minutes) -- "Investigate the scene"
- Test according to the charter but DON'T follow a rigid script
- Take notes continuously (don't rely on memory)
- Log bugs immediately when found (don't think "I'll note it later")
- Follow "interesting" paths -- if something looks odd, dig deeper

# Phase 3: Debrief (10-15 minutes) -- "Report findings"
- Summarize findings (what did you discover?)
- Write the session report
- Note: which areas need follow-up sessions?
```

### Session Report Template -- "Investigation Report"

```markdown
## Session Report

**Charter:** Explore checkout with expired/invalid payment cards
**Tester:** Nguyen Van An
**Date:** 2026-04-26
**Duration:** 75 minutes
**Environment:** staging.example.com, Chrome 125

### Areas Covered (What was investigated)
- Credit card validation (expired, invalid number, wrong CVV)
- Debit card flow
- Error messages for payment failures
- Order state after failed payment

### Bugs Found (Evidence discovered)
1. BUG-001: Expired card returns 500 error (Critical)
2. BUG-002: Invalid CVV shows generic "Payment failed" (Minor)
3. BUG-003: After failed payment, Back button loses cart items (Major)

### Observations (Noted -- not bugs yet, but worth attention)
- Payment processing takes 5-8 seconds (is this slow?)
- No loading indicator while payment is processing
- Success page doesn't show the payment method used

### Questions for Team (Questions the team needs to answer)
- What is the expected behavior when a card is declined?
- Are there plans to support Apple Pay / Google Pay?
- Is there a retry limit for failed payments?

### Follow-up Sessions Needed (Further investigation required)
- Explore the refund flow after a successful payment
- Explore concurrent checkout from 2 devices at the same time
```

---

## Heuristics -- The Detective's "Thinking Toolkit"

A heuristic is like the detective's **professional experience**: "When investigating a burglary, always check the windows, check the cameras, interview the neighbors." It helps you know **where to look** and **what to look for** when exploring.

### SFDPOT -- "San Francisco Depot" (6 Perspectives)

SFDPOT is a mnemonic for the 6 aspects to examine in any feature:

| Letter | Aspect | Detective's Question | Login Example |
|---|---|---|---|
| **S** | Structure | "Is the structure correct?" | Do links work? Do images load? Is tab order correct? |
| **F** | Function | "Does the functionality work?" | Do login, logout, remember me work? |
| **D** | Data | "Is the data correct? Edge cases?" | Empty fields, 10000 chars, special chars, SQL injection |
| **P** | Platform | "Does it run on all platforms?" | Chrome, Firefox, Safari, Mobile, Tablet |
| **O** | Operations | "Are operations stable?" | Performance, logging, error handling |
| **T** | Time | "Does time affect behavior?" | Session timeout, token expiry, concurrent login |

```
# Using SFDPOT for a session exploring the Login feature

S - Structure: Valid HTML? Correct tab order? Accessibility OK?
F - Function:  Do login, logout, remember me, forgot password work?
D - Data:      Empty fields, email with 500 chars, special chars, SQL injection?
P - Platform:  Chrome, Firefox, Safari, Mobile Chrome, iPad?
O - Operations: Does login generate logs? Are failed attempts tracked? Response time?
T - Time:      How long is the session timeout? What happens when the token expires? 2 tabs logged in?
```

:::tip Aha moment
SFDPOT helps you **avoid blind spots**. Many QA engineers only test Function (functionality) and forget about Data (edge cases), Time (timeouts), or Platform (mobile). Use SFDPOT as a thinking checklist -- ensure you look from all 6 angles.
:::

### RCRCRC -- "Where to Explore First?"

When the entire system is vast, RCRCRC helps you choose **which areas to explore first**:

| Letter | Focus | Why explore this area? | Example |
|---|---|---|---|
| **R**ecent | Code/features that just changed | New code = new untested bugs | Login was redesigned this sprint |
| **C**ore | Most critical business flows | Bugs here = lost revenue, lost users | Checkout, Payment |
| **R**isky | Complex parts, many integrations | Complexity = more places for things to go wrong | Third-party payment API |
| **C**onfiguration | Settings, permissions, environments | Wrong config = wrong behavior system-wide | User roles, feature flags |
| **R**epaired | Bugs that were recently fixed | Fixing bug A can create bug B | Payment bug fixed last week |
| **C**hronic | Parts with a history of bugs | History repeats itself, keep watch | Upload module always has bugs |

### Touring Heuristics -- "Taking Tours" Through the System

Each "tour" is a different way to explore the system, like a tourist exploring a city by different themes:

| Tour | Description | Purpose |
|---|---|---|
| **Feature Tour** | Go through ALL features, try each one once | Smoke test everything |
| **Complexity Tour** | Focus on the most complex parts, test deeply | Find deep logic bugs |
| **Claims Tour** | Verify every text, label, and message on the UI | Find inconsistencies, typos |
| **Landmark Tour** | Navigate through main pages, click every link | Find broken links, dead ends |
| **Money Tour** | Follow the revenue-generating flow (order, payment) | Ensure business flow is alive |
| **Antisocial Tour** | Deliberately misuse the system, try to break it | Find weak error handling |
| **Garbage Tour** | Enter garbage data into EVERY field | Find missing validations |

**Antisocial Tour Example for Login** -- Deliberately trying to "break" the system:

```
# Antisocial Tour -- play the role of a "destructive" user
# Purpose: see how well the system handles abnormal situations

- Paste JavaScript (<script>alert('XSS')</script>) into the email field
- Enter an extremely long string (10,000 characters) in the password field
- Click Login 50 times rapidly in succession (rate limiting?)
- Open 10 tabs, login with the same account simultaneously
- Login --> press Back --> press Forward --> Refresh
- Disable JavaScript in the browser then try to login
- Modify URL parameters: /login?redirect=http://evil.com
```

---

## Exploratory Testing in an Agile Sprint

### When to Explore?

```
# Sprint Timeline -- Exploration usually happens at the end of the testing phase

Day 1-2:  Scripted test case execution       (Test according to plan)
Day 3-4:  Bug fixes + retest                 (Dev fixes, QA verifies)
Day 5:    Exploratory Testing sessions        (Detective hits the scene)
Day 6:    Regression test                     (Re-run everything)
```

### The Golden Ratio: 70% Scripted + 30% Exploratory

```
# Test Strategy for a new feature:

# 1. Scripted Testing (70% effort)
#    Like "checking against a list" -- ensures COVERAGE
- Cover all Acceptance Criteria from the User Story
- Positive + Negative cases from test design techniques
- Regression tests for related features

# 2. Exploratory Testing (30% effort)
#    Like "detective investigating" -- finds UNEXPECTED bugs
- 1-2 sessions x 60-90 minutes per session
- Focus: edge cases, integration points, error handling
- Use SFDPOT or Touring heuristics

# Scripted = Safety net (don't miss requirements)
# Exploratory = Discovery (find bugs nobody thought of)
```

:::tip Aha moment
**Scripted testing finds bugs you expect. Exploratory testing finds bugs you DON'T expect.** Both are needed. Only scripted = you miss edge cases. Only exploratory = you miss requirements. Combine them = best coverage.
:::

---

## 4 Core Skills for Exploratory Testing

### 1. Observation -- Observe Like a Detective

Notice anything "unusual," no matter how small:
- Response time suddenly slower than normal
- UI flicker when loading a page
- Console errors (F12) -- even when the UI looks fine
- Data displayed inconsistently across pages

### 2. Questioning -- Ask "What if...?"

```
# "What if" questions are the most powerful weapon of an Exploratory Tester

"What if I enter 10,000 characters in the name field?"
"What if I submit the form and click Submit again immediately?"
"What if I change the URL parameter from userId=1 to userId=999?"
"What if I open 2 browser tabs and login with the same account?"
"What if I'm checking out and the network drops midway?"
```

### 3. Note-taking -- Take Notes Continuously

Take notes **while exploring**, don't rely on memory:
- Steps you've performed (so you can reproduce if you find a bug)
- Observations (unusual things you noticed)
- Bugs found (note them now, create tickets later)
- Ideas for further testing

### 4. Time Management -- Manage Your Time

- Set a timer for 60-90 minutes -- when time is up, stop and debrief
- Avoid "rabbit holes" -- if one area takes more than 20 minutes with no findings, note it and move to another area
- Debrief **immediately after the session** -- don't wait until the next day, or you'll forget the details

---

## Summary -- The QA Detective's Toolkit

| Concept | Key Point | Remember |
|---|---|---|
| **Exploratory Testing** | Simultaneously learn + design + execute | Detective, not robot |
| **SBTM** | Charter + Time-box + Session Report | Planned, not random |
| **SFDPOT** | Structure, Function, Data, Platform, Operations, Time | 6 perspectives, don't skip any |
| **RCRCRC** | Recent, Core, Risky, Config, Repaired, Chronic | Where to explore first? |
| **Tours** | Feature, Complexity, Claims, Antisocial, Garbage... | Each tour, a different angle |
| **Ratio** | 70% Scripted + 30% Exploratory | Combine = Best coverage |
