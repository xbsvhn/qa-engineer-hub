# Agile & Scrum for QA

## Why learn Agile?

About **80% of software projects** today use Agile. In a QA interview, you will almost certainly be asked: "Have you worked in Agile/Scrum?" Not understanding Agile means not understanding how the team operates day-to-day.

---

## What is Agile — the essence?

Imagine two ways of building a house:

**Way 1 (Waterfall):** Complete the entire blueprint → build the whole thing → hand it over to the homeowner. The homeowner then says: "I want a bigger kitchen!" → Tear it down and rebuild → expensive, time-consuming.

**Way 2 (Agile):** Build the living room first → show the homeowner → homeowner gives feedback → fix right away. Then build the kitchen → show → feedback → fix. Continue until done.

**Agile is Way 2:** Split the project into **many small parts**, deliver each part, get feedback early, adjust continuously.

### Agile Manifesto — 4 Core Values

In 2001, 17 programmers met and wrote the "Agile Manifesto" — 4 foundational values:

| Value MORE (left) | | Over (right) |
|---|---|---|
| **Individuals & interactions** | over | Processes & tools |
| **Working software** | over | Comprehensive documentation |
| **Customer collaboration** | over | Contract negotiation |
| **Responding to change** | over | Following a plan |

**What this means in practice:** It doesn't mean abandon documentation or planning. It means **when you have to choose**, prioritize the left side over the right. For example: working software is more important than a 200-page document when the software doesn't even work yet.

---

## What is Scrum — the essence?

**Scrum** is a specific "way to play" (framework) within Agile — like Agile is "sports" and Scrum is "football." About 70% of Agile teams use Scrum.

### Scrum Team — Who does what?

| Role | Essence | Real-world example |
|---|---|---|
| **Product Owner (PO)** | "The homeowner" — decides what to build and what to prioritize | "This Sprint we build Login first, Profile later" |
| **Scrum Master (SM)** | "The coach" — helps the team play by the Scrum rules, removes blockers | "QA is blocked because the env is down → SM escalates to DevOps" |
| **Development Team** | "The builders" — includes **Dev + QA + Designer** | Dev codes + QA tests + Designer reviews UI |

**Key point:** QA is **part of** the Development Team, not a separate team. QA is a member of the team, participating in all activities.

### Sprint — The heartbeat of Scrum

**What is a Sprint?** A **fixed-length cycle** (usually 2 weeks) during which the team completes a portion of work. Every 2 weeks, the team delivers a working piece of software.

```
Sprint 1 (2 weeks)         Sprint 2 (2 weeks)         Sprint 3...
┌────────────────┐        ┌────────────────┐
│ Plan → Code    │        │ Plan → Code    │
│ → Test → Demo  │   →    │ → Test → Demo  │   →    ...
│ → Feedback     │        │ → Feedback     │
└────────────────┘        └────────────────┘
  Deliver Login             Deliver Cart
```

---

## 4 Ceremonies — 4 meetings in each Sprint

"Ceremony" means a **structured meeting**. Scrum has exactly 4 meetings, no more, no less:

### 1. Sprint Planning — "What will we do this Sprint?"

**When:** First day of the Sprint
**Duration:** 2-4 hours
**Essence:** The whole team selects work from the Product Backlog (the list of all work to be done) and pulls it into this Sprint.

**QA in Sprint Planning:**
- Ask about User Stories: "Are the Acceptance Criteria clear?"
- Estimate testing effort: "This story needs 2 days of testing"
- Identify dependencies: "This story needs special test data"

### 2. Daily Standup — "What are we doing today?"

**When:** Every day, at the same time
**Duration:** Maximum **15 minutes** — held standing (standup = stand up, to keep the meeting short)
**Essence:** Each person answers 3 questions:

```
1. What did I do yesterday?
2. What will I do today?
3. Is anything blocking me?
```

**QA in Daily Standup — example:**

```
"Yesterday: Finished testing the Login Story — 15/15 test cases pass.
           Found 2 bugs (BUG-100, BUG-101), logged in Jira.

 Today:    Starting to test the Profile Story.
           Retesting BUG-095 (dev says it's fixed).

 Blocker:  Staging server has been down since this morning.
           Need DevOps to check."
```

::: warning Common mistakes
- Talking too long → Meeting drags to 30 minutes → Everyone loses interest
- Being too vague → "Yesterday I tested, today I'll keep testing" → Nobody knows where you stand
- Turning it into a discussion → "Why did this bug happen?" → Should say "let's discuss offline after the meeting"
:::

### 3. Sprint Review (Demo) — "What did we accomplish?"

**When:** End of Sprint
**Duration:** 1-2 hours
**Essence:** Demo **working software** to stakeholders. Collect feedback.

**QA in Sprint Review:**
- Support the demo (prepare test accounts, data)
- Share metrics: "This Sprint: 95% pass rate, 12 bugs found, 10 fixed"

### 4. Sprint Retrospective — "How can we do better?"

**When:** End of Sprint (after the Review)
**Duration:** 1-1.5 hours
**Essence:** The team reflects: what went well? what needs improvement? what actions for the next Sprint?

```
What went well:
  "Automation saved 2 days of regression testing"

What to improve:
  "Requirements lacked edge cases → QA should join refinement earlier"

Action items:
  "QA will participate in Backlog Refinement starting next Sprint"
```

---

## User Story & Acceptance Criteria

### User Story — Describing a feature in user language

**Standard format:**
```
As a [type of user],
I want [goal],
So that [reason].
```

**Example:**
```
As a customer,
I want to filter products by price,
So that I can find products within my budget.
```

**Essence:** A User Story is not a technical requirement. It describes **what the user wants** and **why** — how to implement it is the developer's job.

### Acceptance Criteria (AC) — What QA uses to write test cases

AC is the **list of conditions** that a User Story must satisfy to be considered "done." **QA uses AC as the primary source for writing test cases.**

**Example AC for the product filter story:**

```
✅ When filter is set to min=100K, max=500K → only products between 100K-500K are shown
✅ When min > max → show error "Min must be less than Max"
✅ When filter is cleared → show all products again
✅ Product count updates when filter is applied
✅ Filter is preserved when navigating pages (pagination)
```

Each AC line = at least 1 test case. 5 ACs = at least 5 test cases.

::: tip QA should participate in writing AC
QA often spots edge cases that the PO doesn't think of. For example: "What's shown if the filter returns 0 results?" — the PO may forget this case.
:::

---

## Definition of Done (DoD) & Definition of Ready (DoR)

### DoR — "Is this story ready to start?"

Before Dev starts coding, check:
- ☑ User Story is clear, not ambiguous
- ☑ Acceptance Criteria are complete
- ☑ UI design is ready (if needed)
- ☑ QA has reviewed, no remaining questions

If DoR isn't met → **don't start**. Coding based on vague requirements = coding it wrong = wasted effort.

### DoD — "Is this story done?"

After Dev finishes coding, check:
- ☑ Code completed + pushed
- ☑ Code reviewed (teammate approved)
- ☑ Unit tests pass
- ☑ **QA tested** (manual + automation)
- ☑ **All AC verified**
- ☑ **0 Critical/Major bugs open**
- ☑ Deployed to staging successfully

**Important:** If DoD isn't met = **not done**. There's no such thing as "done but not tested" or "done but there's still 1 critical bug."

---

## Real-world QA Workflow in a 2-week Sprint

```
BEFORE SPRINT:
  Day 0:   Sprint Planning → know what to test this Sprint

DURING SPRINT:
  Day 1-2: Write test cases for new stories
           Prepare test data
  Day 3-5: Dev pushes code → QA starts testing
           Log bugs in Jira
  Day 6-7: Retest bug fixes
           Exploratory testing
  Day 8-9: Regression testing
           Final sanity check
  Day 10:  Sprint Review (demo support)
           Sprint Retro (share observations)

AFTER SPRINT:
  Update regression test suite
  Improve automation coverage
```

### Three Amigos — The most important meeting

"Three Amigos" = PO + Dev + QA sit down to review the User Story **before coding starts**.

- **PO** explains the business value: "Users need the filter because..."
- **Dev** asks technical questions: "How does the filter API work?"
- **QA** asks about edge cases: "What if the filter returns 0 results?"

15-30 minutes per story → saves days of bug fixing later.

---

## Common Mistakes

### ❌ Piling all testing at the end of the Sprint
> ✅ **Test in parallel with Dev** — as soon as Dev pushes a story, QA tests it right away. Don't wait until day 8-9 to start testing.
> 💡 **Why:** If you pile everything at the end of the Sprint and discover bugs then → Dev doesn't have time to fix → Story isn't Done → Sprint fails. Test early = early feedback = fix in time.

### ❌ Not participating in Backlog Refinement
> ✅ **QA must participate in Refinement and Three Amigos** — read User Stories, ask about edge cases, review Acceptance Criteria BEFORE Dev codes.
> 💡 **Why:** QA sees cases that PO and Dev don't think of ("What if the user enters emoji in the name field?"). Discovering requirement gaps here saves days of bug fixing later.

### ❌ Not speaking up in Daily Standup
> ✅ **Speak clearly: what you tested yesterday, what you'll test today, what's blocking you** — be specific with test case numbers, bug names, and story names.
> 💡 **Why:** If QA stays silent, the team doesn't know where QA stands. Blockers don't get escalated → QA stays blocked all day and nobody knows.

### ❌ Not updating test cases after Retro
> ✅ **After every Sprint Retro, review your test approach** — add test cases for new bug types, update the regression suite.
> 💡 **Why:** The same type of bug occurring in 2 consecutive Sprints = QA hasn't learned from the mistake. A Retro without action items = a meeting for nothing.

## Multiple Perspectives

There is no single Agile QA model that works for every team. Below are different approaches — **all are valid** depending on the context:

| Model | How it works | Best suited when |
|---|---|---|
| **Dedicated QA in team** | Each Scrum team has 1-2 dedicated QAs who participate from Sprint Planning to Retro | Large team (5+ devs), complex product (fintech, healthcare), deep testing expertise needed |
| **Dev self-testing (No dedicated QA)** | Developers write unit tests + integration tests, peer review replaces QA | Early-stage startup, small team (2-3 devs), simple product, shipping fast is priority #1 |
| **QA shared across teams** | 1 QA supports 2-3 Scrum teams, prioritizes by risk | Mid-size company, not enough budget for QA on every team, QA focuses on critical paths |
| **Whole-team quality** | Everyone is responsible for quality — Dev writes tests, QA coaches/reviews, PO verifies AC | Mature team, strong culture, everyone understands testing |

**The key takeaway:** Regardless of the model, **someone must be responsible for verifying the software works correctly**. The question is not "do we need QA?" but "who will ensure quality and how?"

---

## Summary

| Concept | Essence in one sentence |
|---|---|
| **Agile** | Break it down, deliver incrementally, get early feedback, adapt flexibly |
| **Scrum** | A specific Agile framework: 2-week Sprints + 4 ceremonies |
| **Sprint** | A 2-week cycle: plan → code → test → demo → retro |
| **User Story** | Describes a feature in user language, not technical language |
| **AC** | "Done" conditions — the primary source for QA to write test cases |
| **DoR/DoD** | Checklists for starting/finishing a story |
| **Three Amigos** | PO + Dev + QA review the story before coding — highly effective |
