# Test Plan & Strategy

## A Test Plan Is Like a Travel Itinerary

Before heading to a vacation destination, you **don't just jump in the car and drive off**. You plan ahead:

| Travel Planning | Test Plan |
|---|---|
| **Where to go?** (landmarks, beaches, old town) | **Scope** -- What to test? |
| **How many days?** (3 days, 2 nights) | **Schedule** -- What is the timeline? |
| **Who's going?** (4 people, who drives, who books the hotel) | **Resources** -- Who tests, who reviews? |
| **What to bring?** (sunscreen, rain jacket) | **Environment** -- Which browsers, what data? |
| **What if it rains?** (backup plan: visit a museum instead of the beach) | **Risks** -- What could go wrong, how to handle it? |
| **When do we leave?** (car must be fueled, bags checked) | **Entry Criteria** -- When do we start? |
| **When do we come back?** (end of day 3, all photos taken) | **Exit Criteria** -- When do we stop? |

:::tip Aha moment
A Test Plan **is not something you write to look good and then file away**. It is like a trip itinerary -- you carry it with you, refer back to it when you get lost, and adjust it when conditions change. A good Test Plan is one that **anyone can read and immediately understand what the team is testing**.
:::

---

## Test Strategy vs Test Plan -- Two Different Things

Think of it this way:

- **Test Strategy** = Your family's "travel style": "We always travel independently, book Airbnbs, and rent motorbikes." It rarely changes.
- **Test Plan** = The specific itinerary for a particular trip: which day you go where, what you eat, and the budget. Each trip has a different plan.

| | Test Strategy | Test Plan |
|---|---|---|
| **Scope** | Entire organization / program | Specific project / sprint |
| **Created by** | QA Lead / Manager | QA Lead / Senior QA |
| **Changes** | Rarely (like "house rules") | Every sprint / release |
| **Content** | Overall approach, tools, standards | Details: what to test, who tests, how long |
| **Example** | "We use Playwright for web automation" | "Sprint 15: test Login redesign, 2 QA, 3 days" |

---

## Test Plan Components -- "Packing" for the Trip

### 1. Scope -- "Where are we going, and where are we NOT going?"

Scope answers: which features will be tested, which features **will not be tested for now** -- and most importantly: **why not**.

```
# In Scope (Main destinations)
# Features that will be tested in this sprint/release
- Login/Register module (web + mobile responsive)
- Password reset flow
- Social login (Google, Facebook)
- 2FA authentication

# Out of Scope (Saved for next time)
# Features NOT being tested this time -- with clear reasons
- Admin panel → requirements not yet finalized
- Legacy API endpoints → will be removed in Q3
- Performance testing → will have a separate plan
```

:::tip Aha moment
**Always document the reason for Out of Scope items.** It is like telling your travel companions: "We're skipping that city because we only have 3 days -- next time." If you don't document it, two weeks later the PM will ask "Why didn't we test the Admin panel?" and you... won't remember.
:::

### 2. Test Approach -- "How are we getting there? Motorbike, car, or plane?"

Approach is the **testing method**: manual or automated, and which types of testing to perform.

```
# Approach for Authentication Module

# Functional Testing (Verifying features work correctly)
- Manual testing: First-pass testing for all new test cases
- Automation: Regression suite runs every build (Playwright)
- API testing: Verify auth endpoints return correct responses (Postman)

# Non-functional Testing (Verifying quality beyond functionality)
- Performance: Login page must load in < 2 seconds
- Security: Check against OWASP authentication checklist
- Compatibility: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari

# Testing Types (Types of tests to run)
- Smoke test: Run after every build deploy -- "is the system still alive?"
- Regression: Before release -- "are existing features still working?"
- Exploratory: 2 sessions per sprint -- "find unexpected bugs"
```

### 3. Test Environment -- "Which hotel? What to bring?"

Environment is where you test: which server, which browser, what data.

```
# Environments -- each environment serves a different purpose
# Dev:     Where developers test their own code
# Staging: Where QA does primary testing -- closest to Production
# UAT:     Business/PO does acceptance testing
# Prod:    Live system -- verify only, no destructive testing

| Env     | URL                     | Purpose            |
|---------|-------------------------|--------------------|
| Dev     | dev.example.com         | Dev self-testing   |
| Staging | staging.example.com     | QA primary testing |
| UAT     | uat.example.com         | Business verify    |
| Prod    | www.example.com         | Live               |

# Test Browsers
- Chrome (latest) — Primary (test this first)
- Firefox (latest)
- Safari (latest)
- Mobile Chrome (Android)
- Mobile Safari (iOS)

# Test Data -- Accounts and data used for testing
- Test user:  test_user@example.com / Test@123
- Admin:      test_admin@example.com / Admin@123
- Credit card: 4111 1111 1111 1111 (Stripe test card)
```

### 4. Resources & Schedule -- "Who's going? What's the daily plan?"

```
# Team -- Clear assignment of who does what
- QA Lead: An   → review test plan, assign tasks, report
- QA 1: Binh    → manual testing, write bug reports
- QA 2: Chi     → automation testing, API testing

# Timeline (Sprint 15 — 2 weeks)
# Like a travel itinerary: what to do each day
Day 1-2:   Write test cases, review requirements    (Preparation)
Day 3-7:   Test execution (manual + automation)      (Exploration)
Day 8-9:   Bug fix verification, regression test     (Review)
Day 10:    Test report, sprint demo                  (Wrap-up and share)
```

### 5. Entry & Exit Criteria -- "When do we leave? When do we come back?"

**Entry Criteria** (conditions to START testing) are like a pre-departure checklist: is the car fueled? Is the GPS working? If the car has no fuel -- **we don't leave yet**.

**Exit Criteria** (conditions to END testing) are like: "When do we head back? When we've visited all 5 landmarks, have enough photos, and it's the end of day 3."

```
# Entry Criteria -- "If not met, do NOT start testing"
- Requirements have been reviewed and approved
- Build successfully deployed to Staging
- Smoke test passes (system is "alive")
- Test data is ready
- Test environment is stable

# Exit Criteria -- "When met, testing is COMPLETE"
- 100% of test cases have been executed
- Pass rate >= 95%
- 0 open Critical/Blocker bugs
- <= 3 open Major bugs (with a fix plan in place)
- Regression test passes
- Test summary report approved by PM
```

:::tip Aha moment
Entry/Exit Criteria help you **avoid arguments**. No one asks "Why haven't you started testing?" when the build hasn't been deployed. No one asks "Is testing done?" when the numbers speak for themselves.
:::

### 6. Risk & Mitigation -- "What if it rains?"

Risk is anything that **could happen** and impact testing. Mitigation is the **Plan B** when a risk materializes.

| # | Risk | Probability | Impact | Mitigation (Plan B) |
|---|---|---|---|---|
| 1 | Requirements change mid-sprint | High | High | Buffer 20% of time, be ready to adjust |
| 2 | Staging environment goes down | Medium | High | Fall back to Dev env, escalate early |
| 3 | QA takes unexpected leave | Low | Medium | Cross-training, clearly documented test cases |
| 4 | Third-party API (Google login) is down | Low | Medium | Use mock responses, test when API is available |
| 5 | Test data is unexpectedly reset | Medium | Low | Script to auto-generate test data |

### 7. Deliverables -- "What do we bring back?"

Deliverables are the outputs you deliver to the team:

| Deliverable | When | Audience |
|---|---|---|
| Test Plan | Start of sprint | PM, Dev Lead |
| Test Cases | Day 2 | Team review |
| Daily Test Report | Daily | PM (via Slack) |
| Bug Reports | Real-time | Dev team (Jira) |
| Test Summary Report | End of sprint | PM, Stakeholders |

---

## Test Plan Template -- Copy and Paste Right Away

```markdown
# Test Plan: [Feature/Sprint Name]

## 1. Overview
- **Project:** [Project name]
- **Feature:** [Feature/module name]
- **Sprint:** [Sprint number]
- **Author:** [QA name]
- **Date:** [Creation date]

## 2. Scope
### In Scope
- [Feature A]
- [Feature B]

### Out of Scope
- [Feature C] — Reason: [...]

## 3. Test Approach
- **Functional:** Manual + Automation
- **API Testing:** [Yes/No]
- **Performance:** [Yes/No]
- **Security:** [Yes/No]

## 4. Test Environment
| Env | URL | Browser |
|---|---|---|
| Staging | [...] | Chrome, Firefox, Safari |

## 5. Schedule
| Phase | Date | Owner |
|---|---|---|
| Test case design | [Date] | [Name] |
| Test execution | [Date] | [Name] |
| Regression | [Date] | [Name] |

## 6. Entry/Exit Criteria
### Entry: [Checklist]
### Exit: [Checklist]

## 7. Risks
| Risk | Mitigation |
|---|---|
| [...] | [...] |

## 8. Deliverables
- Test cases (link)
- Test report (link)
```

---

## In Practice: Test Plans in Agile -- 1 Page, Not 50

In Waterfall, a Test Plan can be **50 pages** long. In Agile, it only needs to be **1 page** -- enough information, no excess.

```
# Sprint 15 Test Plan — Authentication Module
# Keep it short, complete, and understandable by anyone

Scope: Login redesign + 2FA + Social login
Out of scope: Admin panel (requirements not ready)

QA: Binh (manual), Chi (automation)
Timeline: 28/04 - 09/05

Approach:
- New features: Manual first → automate regression later
- Existing features: Run automation suite
- API: Test auth endpoints (Postman)
- Exploratory: 1 session (Friday)

Risks:
- Google OAuth sandbox may be flaky → use mock if needed
- 2FA requires a real phone → use Twilio test numbers

Exit: 95% pass, 0 Critical bugs
```

:::tip Aha moment
A Test Plan is like a trip itinerary -- **short but complete**. Complete enough for the whole team to read in 5 minutes and understand: what is being tested, who is testing, when it will be done, and what the risks are. Nobody wants to read a 50-page document when the content can be summarized in 1 page.
:::

---

## Common Mistakes

**Writing a 50-page Test Plan that nobody reads**
--> Write concisely with just enough information -- 1-3 pages for Agile, longer only when Waterfall demands it
--> A long plan that nobody reads is as good as nonexistent. A short plan that the whole team uses has real value

**Writing it once and never updating when requirements change**
--> Treat the Test Plan as a **living document** -- update whenever scope, timeline, or risks change
--> A plan that doesn't reflect reality is a wrong plan. When sprint requirements change, the plan must change too

**No Risk section -- only writing the "happy path"**
--> Always include a Risk & Mitigation table with at least 3-5 risks
--> No risk plan = the team panics when problems arise. With a risk plan = the team knows Plan B immediately

**Copy-pasting a template without customizing for the project**
--> Every project has its own context -- adjust scope, approach, and risks accordingly
--> A template is a skeleton, not a finished essay. Two different projects with identical plans = something is wrong

---

## Multiple Perspectives

**Waterfall teams:** Write detailed 20-50 page Test Plans, approved by multiple stakeholders, rarely changed. Suitable when requirements are stable (banking, healthcare, government).

**Agile teams:** Write a 1-page Test Plan each sprint, update continuously, focus on scope + risks + exit criteria. Suitable when requirements change frequently (startups, SaaS).

**Context determines the length.** There is no "correct Test Plan" -- only a Test Plan that **fits the way your team works**. Ask: "Who reads this plan? What do they need to know?" Then write just enough for that audience.

---

## Summary -- Each Component Answers One Question

| Component | Question It Answers | Travel Equivalent |
|---|---|---|
| **Scope** | What to test? What not to test? | Where to go? Where not to go? |
| **Approach** | How to test? | By motorbike, car, or plane? |
| **Environment** | Where to test? What's needed? | Which hotel? What to bring? |
| **Schedule** | Who does what? When? | What to do on day 1? Who drives? |
| **Entry/Exit** | When to start/stop? | When do we leave? When do we return? |
| **Risks** | What if something goes wrong? | What if it rains? |
| **Deliverables** | What to deliver? | What to bring back? (photos, souvenirs) |
