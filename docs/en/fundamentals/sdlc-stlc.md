# SDLC & STLC

## How is software created?

You want to build a house. You can't just go buy bricks and start building right away — you need to:
1. Know **what kind of house** (villa? apartment? single-story?)
2. **Plan** (how much money? how long? who does what?)
3. **Design** (blueprints, materials)
4. **Build** (lay the foundation, build walls, install plumbing and electricity)
5. **Inspect** (is the house sturdy? do the plumbing and electricity work?)
6. **Hand over** to the homeowner
7. **Maintain** (repair when things break)

Software is created through a similar process. That process is called **SDLC**.

---

## What is SDLC — the essence?

**SDLC** = **S**oftware **D**evelopment **L**ife **C**ycle.

**Essence:** SDLC is the **series of steps** that software goes through from when it's just an idea to when it's used by people and maintained. Like the life cycle of a house: from idea → blueprint → construction → inspection → use → repair.

### The 7 phases of SDLC

```
1. Requirement    "What needs to be done?"    → Gather requirements
2. Planning       "How will we do it?"        → Create the plan
3. Design         "What will it look like?"   → Design the architecture
4. Development    "Code!"                     → Write the code
5. Testing        "Is it correct?"            → Verify and test
6. Deployment     "Release!"                  → Deploy to production
7. Maintenance    "Fix + improve"             → Operate and maintain
```

### What does QA do at EACH phase?

This is something many people misunderstand: **QA doesn't only work at step 5 (Testing)**. Good QA participates from step 1.

| Phase | What QA does | Specific example |
|---|---|---|
| **1. Requirement** | Read requirements, ask questions, find gaps | "The requirement says users log in with email. But what error message appears if the user enters an invalid email format? The requirement doesn't say." |
| **2. Planning** | Estimate testing time, propose tools | "This feature needs 3 days of testing. We'll need Postman for API testing." |
| **3. Design** | Review UI/UX design, understand architecture | "This design has buttons that are too small — mobile users will have trouble tapping them." |
| **4. Development** | Write test cases, prepare test data | While dev is coding → QA **simultaneously** writes test cases. Don't wait until dev is done to start. |
| **5. Testing** | Execute tests, report bugs | Run test cases, find bugs, report them in Jira. |
| **6. Deployment** | Smoke test on production | After app is deployed → QA does a quick check: can we log in? does the homepage load? |
| **7. Maintenance** | Test hotfixes, regression test | User reports a bug → Dev fixes it → QA verifies the fix is correct and hasn't caused new issues. |

::: tip Shift-left Testing
"Shift-left" means **pushing testing earlier** (to the left) on the timeline. QA participating from the Requirement phase can detect 30-50% of defects **before a single line of code is written** — saving significant time and money.
:::

---

## SDLC Models — Which model to use?

A "model" here means **the way you organize** the 7 steps above. Just like building a house: some people finish the first floor before starting the second (sequential), while others build multiple sections in parallel (flexible).

### 1. Waterfall

**Essence:** Work **sequentially** step by step, completing one step before moving to the next. No going back.

```
Requirement ──► Design ──► Development ──► Testing ──► Deployment
     (done)       (done)       (done)        (done)       (done)
                                               ↑
                                     QA only starts here!
```

**Problem:** QA only tests at the end. If a requirement error is discovered → you have to go all the way back to the beginning → expensive and slow.

**When to use:** Small projects, requirements 100% clear from the start, no changes. Example: software for a washing machine controller — fixed spec, no need for flexibility.

### 2. Agile

**Essence:** Split the project into **many small iterations** (called Sprints, typically 2 weeks). Each Sprint delivers a small, complete piece from start to finish.

```
Sprint 1 (2 weeks)          Sprint 2 (2 weeks)          Sprint 3...
┌─────────────────┐        ┌─────────────────┐
│ Plan→Code→Test  │   →    │ Plan→Code→Test  │   →    ...
│ →Demo→Feedback  │        │ →Demo→Feedback  │
└─────────────────┘        └─────────────────┘
   Deliver part 1            Deliver part 2
```

**Why is Agile so popular (~80% of projects today)?**
- Early feedback → fix mistakes fast
- QA tests **every Sprint** → detects bugs early
- Flexible enough to change requirements mid-project

**Details on Agile/Scrum:** See the article [Agile & Scrum for QA](./agile-scrum).

### Quick comparison

| | Waterfall | Agile |
|---|---|---|
| **Delivery** | End of project (several months) | Every 2 weeks |
| **Testing** | End of project | Every Sprint |
| **Requirement changes** | Very difficult | Normal |
| **Risk of late discovery** | High | Low |
| **Popularity** | ~20% | ~80% |

---

## What is STLC — the essence?

**STLC** = **S**oftware **T**esting **L**ife **C**ycle.

**Essence:** If SDLC is the process of **creating** software, then STLC is the process of **testing** software. STLC lives **within** SDLC.

```
SDLC (entire project):
  Requirement → Design → Development → [STLC] → Deployment → Maintenance
                                         ↑
                                    The testing process
                                    lives here
```

### The 6 steps of STLC

Each step answers a question:

| Step | Question | What QA does |
|---|---|---|
| **1. Requirement Analysis** | "What needs to be tested?" | Read requirements, ask for clarification, find gaps |
| **2. Test Planning** | "How will we test?" | Write a test plan: scope, timeline, who tests what |
| **3. Test Case Development** | "What are the specific test cases?" | Write test cases, prepare test data |
| **4. Environment Setup** | "Where will we test?" | Set up servers, browsers, databases, test accounts |
| **5. Test Execution** | "Run the tests!" | Execute test cases, report bugs, retest fixes |
| **6. Test Closure** | "What were the results?" | Write the test report, evaluate quality, document lessons learned |

### Practical example

Requirement: *"Users can log in with email and password"*

**Step 1 — Requirement Analysis:** QA reads and asks:
- "What error appears for an invalid email format?"
- "After how many wrong password attempts is the account locked?"
- "Is there a Remember Me option?"
- "Is social login (Google/Facebook) in scope?"

**Step 2 — Test Planning:** "The login feature needs 2 days of testing, 1 QA, tested on Chrome + Firefox + Mobile."

**Step 3 — Test Case Development:** Write 15-20 test cases (correct login, wrong password, empty email, locked account...)

**Step 4 — Environment Setup:** Create test accounts on the staging server.

**Step 5 — Test Execution:** Run 20 test cases → 18 pass, 2 fail → log 2 bugs in Jira.

**Step 6 — Test Closure:** "Login feature: 90% pass rate, 2 bugs (1 Major, 1 Minor). The Major bug needs to be fixed before release."

---

## Entry & Exit Criteria

### Entry Criteria — "Are conditions met to start testing?"

Before starting testing, ensure:
- ✅ Requirements have been reviewed → you know what to test
- ✅ Build deployed successfully → there's something to test
- ✅ Test data is ready → data available for input
- ✅ Smoke test passes → the build doesn't crash immediately

If conditions aren't met → **don't start testing**. Testing on a broken build = wasting time.

### Exit Criteria — "Are conditions met to stop testing?"

When do you stop testing?
- ✅ 100% of test cases have been executed
- ✅ Pass rate ≥ 95%
- ✅ 0 open Critical bugs
- ✅ Test report has been written

**In Agile practice:** Entry/Exit Criteria are often replaced by **Definition of Ready** (the story is ready to start) and **Definition of Done** (the story is complete). See the article [Agile & Scrum](./agile-scrum).

---

## Summary

| Concept | Essence in one sentence |
|---|---|
| **SDLC** | The process of creating software from idea to maintenance — 7 steps |
| **Waterfall** | Sequential, testing at the end — high risk, rarely used |
| **Agile** | Split into 2-week Sprints, test every Sprint — most popular |
| **STLC** | The testing process within SDLC — 6 steps |
| **Entry/Exit** | Checklists for "conditions met to start/finish" |
| **QA Role** | Participates in EVERY phase of SDLC, not just the Testing step |
