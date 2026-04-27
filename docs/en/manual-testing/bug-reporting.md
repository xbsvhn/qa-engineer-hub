# Bug Reporting

## A Bug Report Is Like a Medical Record

You go to the doctor. The doctor writes up a medical record that includes: what the symptoms are, where it hurts, since when, what medication you have already taken, and the test results. This record must be **detailed enough** for another doctor to read it, understand the situation, and continue treatment.

Bug reports work the same way:

| Medical Record | Bug Report |
|---|---|
| **Patient**: Nguyen Van A, male, 30 years old | **Environment**: Chrome 125, macOS, staging |
| **Symptoms**: Severe stomach pain after eating | **Steps to Reproduce**: Enter an expired card, click Place Order |
| **Actual findings**: Fever 39C, rigid abdomen | **Actual Result**: Page shows Error 500 |
| **Expected findings**: Temperature 37C, soft abdomen | **Expected Result**: Show message "Card expired" |
| **Imaging**: X-ray, blood test | **Attachments**: Screenshot, console log, video |
| **Severity level**: Emergency / Routine visit | **Severity**: Critical / Major / Minor / Trivial |

:::tip Aha moment
The golden rule: **Write your bug report as if the developer has never seen the system before.** Don't assume they know the context. It's like a night-shift doctor reading a chart from another clinic -- everything must be clear on paper.
:::

---

## Standard Bug Report Structure -- A Complete Medical Record

| Field | Description | Medical Equivalent | Required? |
|---|---|---|---|
| **Title** | Short, clear description | Preliminary diagnosis | Required |
| **Severity** | Technical severity level | Illness severity | Required |
| **Priority** | Fix urgency | Need emergency care or a routine visit? | Required |
| **Environment** | Browser, OS, URL, version | Which hospital, which ward | Required |
| **Steps to Reproduce** | Step-by-step reproduction of the bug | When do symptoms appear | Required |
| **Actual Result** | What actually happened | Test results | Required |
| **Expected Result** | What should have happened | Normal values | Required |
| **Attachments** | Screenshot, video, log | X-ray, blood tests | Required |
| **Assignee** | Developer responsible for the fix | Treating physician | Recommended |
| **Linked Story** | Related User Story | Medical history file | Recommended |

---

## Writing Effective Titles -- A One-Line "Diagnosis"

### Format: `[Where] What action --> What went wrong`

A title is like the diagnosis line on a medical chart: **anyone reading it understands** the problem without reading the entire file.

```
# WRONG -- too vague, reading it tells you nothing
# Like writing "Patient is sick" on the chart
"Bug on checkout page"
"Error"
"Not working"

# RIGHT -- reading the title tells you immediately: where, what action, what went wrong
# Like writing "Acute appendicitis" -- clear and actionable
"[Login] Click Login with valid credentials --> Error 500 instead of redirect to Dashboard"
"[Cart] Apply coupon 'SALE20' --> Discount shows 0% instead of 20%"
"[Checkout] Submit order with empty address --> No validation error shown"
"[Search] Search 'iPhone' --> Returns 0 results, but products exist in DB"
```

**3 components of a good title:**
1. **[Module]** -- Where? (Login, Cart, Checkout...)
2. **Action** -- What did the user do? (Click, Enter, Submit...)
3. **Wrong Result** -- What went wrong? (Error 500, shows 0%, no message...)

---

## Severity vs Priority -- Being Seriously Ill Is Different from Needing Emergency Care

This is the **most commonly confused concept** in QA. Let's clearly distinguish:

- **Severity** (How serious is the illness?) = "How bad is the disease?" -- **QA assesses** based on technical impact
- **Priority** (How urgently do we treat it?) = "How urgently does it need treatment?" -- **PM/Business assesses** based on business impact

### Severity -- "How bad is the disease?" (QA assesses)

| Level | Description | Example | Medical Equivalent |
|---|---|---|---|
| **Critical** | System crashes, data loss, security breach | App crash, data deleted | Cardiac arrest |
| **Major** | Core feature broken, no workaround | Cannot login, cannot checkout | Broken bone |
| **Minor** | Secondary feature broken, workaround exists | Filter broken, but sort still works | Common cold |
| **Trivial** | UI issue, typo, a few pixels off | Typo "Logn" instead of "Login" | Minor scratch |

### Priority -- "How urgently does it need treatment?" (PM/Business assesses)

| Level | Description | Timeline | Medical Equivalent |
|---|---|---|---|
| **P1 - Critical** | Fix immediately | Hotfix same day | Emergency room now |
| **P2 - High** | Fix in this sprint | Current sprint | Admit to hospital soon |
| **P3 - Medium** | Fix when there is time | Next sprint | Schedule a follow-up |
| **P4 - Low** | Fix when free | Backlog | Will heal on its own |

### Severity IS NOT Priority -- 4 Classic Examples

| Bug | Severity | Priority | Explanation |
|---|---|---|---|
| App crashes on homepage | **Critical** | **P1** | Serious illness + Affects all users = Emergency now |
| App crashes on rarely-used Admin settings page | **Critical** | **P3** | Serious illness but very few people encounter it = Schedule for later |
| Company logo displays incorrectly on homepage | **Trivial** | **P1** | Minor scratch but affects brand image = Fix immediately |
| Typo on a FAQ page that few people read | **Trivial** | **P4** | Minor scratch + Nobody sees it = Fix when free |

:::tip Aha moment
**High Severity does NOT mean high Priority.** A crash on an admin page that only 2 people use? P3. A typo on a marketing banner that millions of users see? P1. Business context determines priority, not technical severity.
:::

---

## Example of a Proper Bug Report -- "Model Medical Record"

### GOOD Bug Report

```
Title: [Checkout] Click "Place Order" with expired credit card
       --> Error 500 instead of user-friendly error message

Severity: Major    (Core feature affected, user cannot checkout)
Priority: P2       (Needs to be fixed this sprint)
Environment: Chrome 125, macOS 15.3, staging.example.com (build #1234)

Precondition:
- Logged in: test_user@mail.com / Test@123
- Cart has at least 1 product

Steps to Reproduce:
1. Go to /cart
2. Click "Proceed to Checkout"
3. Fill in shipping address (any valid address)
4. Select payment method "Credit Card"
5. Enter card number: 4111 1111 1111 1111
6. Enter expiry: 01/20 (expired card)
7. Enter CVV: 123
8. Click "Place Order"

Actual Result:
- Page shows "Internal Server Error 500"
- Console log: "TypeError: Cannot read property 'valid' of undefined"
- No user-friendly error message

Expected Result:
- Error message: "Your card has expired. Please use a different card."
- User remains on the checkout page (previously entered data is not lost)
- Order is NOT created
- No error 500

Attachments:
- screenshot_500_error.png
- console_log.txt
- network_response.har

Additional Info:
- Bug reproduces 100% (5/5 attempts)
- Also fails with expiry 01/21, 01/22 (all past dates)
- Valid expiry (12/28) works correctly
```

### POOR Bug Report -- Don't Write Like This

```
# WRONG -- developer reads this and still knows nothing
Title: "Error on checkout"
Severity: High
Steps: "Click checkout, got error"
Expected: "Should work"
Attachments: (none)

# Problems:
# - Title is too vague
# - No environment info
# - Steps lack enough detail to reproduce
# - Expected result is too generic
# - No screenshot/evidence
# --> Dev will have to ask 5-10 follow-up questions, wasting time on both sides
```

---

## Bug Life Cycle -- The "Patient's" Journey

Every bug goes through a journey, much like a patient going through medical care:

```
Admission       Examination     Treatment        Follow-up       Discharge
  New  -------> Open -------> In Progress ----> Fixed ---------> Retest
                  |                                               |
                  |                                          Recovered?
                  |                                          /       \
                  |                                       Yes         No
                  |                                        |           |
                  |                                    Verified     Reopen
                  |                                        |        (back to
                  |                                     Closed       Open)
                  |
                  |--- Rejected  (Not actually sick -- "not a bug")
                  |--- Deferred  (No treatment needed yet -- "postponed, fix later")
                  |--- Duplicate (Duplicate record -- "already reported")
```

### Detail of Each Status

| Status | Who transitions | Meaning | Medical Equivalent |
|---|---|---|---|
| **New** | QA creates the bug | Bug just reported | New patient arrives |
| **Open** | QA Lead/PM reviews | Confirmed, assigned to dev | Doctor accepts the patient |
| **In Progress** | Dev | Dev is working on the fix | Under treatment |
| **Fixed** | Dev | Dev completed the fix, pushed code | Treatment complete, awaiting follow-up |
| **Retest** | QA | QA verifies the fix | Follow-up appointment |
| **Verified** | QA | Fix is correct | Patient recovered |
| **Closed** | QA | Bug fully resolved | Discharged |
| **Reopen** | QA | Fix was incorrect, needs rework | Relapse, readmitted |
| **Rejected** | Dev/PM | Not a bug (by design) | Not actually ill, unnecessary worry |
| **Deferred** | PM | Postponed, fix in a later sprint | Scheduled for a follow-up next month |
| **Duplicate** | QA/Dev | Same as an already reported bug | Duplicate medical record |

:::tip Aha moment
When a bug is **Rejected**, don't take it personally. Ask "Why is this by design?" to better understand the product. When a bug is **Reopened**, don't blame the developer. Provide clearer reproduction steps and note the edge cases that were missed. QA and Dev are teammates, not opponents.
:::

---

## Practical Jira Workflow

### Creating a Bug in Jira

```
# How to create a bug in Jira -- standard format

Project: ECOM
Issue Type: Bug
Summary: [Checkout] Expired credit card returns 500 error

Description:
  h3. Environment
  Chrome 125, macOS 15.3, staging.example.com

  h3. Steps to Reproduce
  # Navigate to /cart with items
  # Click "Proceed to Checkout"
  # Fill shipping address
  # Enter expired credit card (4111...1111, exp 01/20)
  # Click "Place Order"

  h3. Actual Result
  Error 500 page displayed

  h3. Expected Result
  User-friendly error: "Card has expired"

  h3. Additional Info
  Reproduces 100%. See attached screenshot.

Priority: High
Severity: Major (custom field)
Labels: checkout, payment, regression
Sprint: Sprint 15
Linked Issues: relates to ECOM-456 (Payment User Story)
Attachments: screenshot.png, console_log.txt
```

### Useful JQL Queries for QA

JQL (Jira Query Language) is like SQL for Jira -- it helps you find issues quickly:

```sql
-- Bugs I reported in this sprint
-- (Like: "Show me the patients I admitted this week")
reporter = currentUser() AND type = Bug AND sprint in openSprints()

-- Open bugs waiting for dev to fix
-- (Like: "Which patients are hospitalized waiting for treatment?")
type = Bug AND status in (Open, "In Progress") AND assignee in membersOf("Dev Team")

-- Bugs that need retesting -- QA's job
-- (Like: "Which patients have been treated and need a follow-up?")
type = Bug AND status = "Ready for Retest" AND reporter = currentUser()

-- Critical bugs not yet fixed -- red alert
-- (Like: "Which patients are in critical condition and haven't received emergency care?")
type = Bug AND priority in (Critical, Highest) AND status != Closed

-- Bugs created in the last 7 days
-- (Like: "Admission statistics for the past week")
type = Bug AND created >= -7d ORDER BY created DESC
```

---

## Tips for Writing Professional Bug Reports

### 1. Isolate the bug -- Narrow down the scope before reporting

Like a doctor asking thorough questions before diagnosing:

```
# Ask these questions BEFORE reporting:
- Does the bug occur on just 1 browser or all of them? (Chrome only? Or Firefox too?)
- Does the bug occur with specific data or all data? (Only expired cards? Or all cards?)
- Since which build did the bug appear? (Build #1234? Or was the previous build affected too?)
- Does the bug occur 100% of the time or intermittently? (5/5 times? Or 2/10 times?)
```

### 2. Attach evidence -- Include proof

```
# Like X-rays and blood tests -- undeniable evidence

- Screenshot    --> Capture the screen, highlight the error area with a red box
- Video         --> Record the screen (Loom, OBS) for complex bugs
- Console log   --> F12, Console tab, copy error messages
- Network log   --> F12, Network tab, screenshot the API response
- HAR file      --> F12, Network, Export HAR (for API issues)
```

### 3. Report facts, don't assign blame -- State the facts, don't point fingers

```
# WRONG -- blaming the developer, creating conflict
"Dev coded it wrong, the calculateTotal() function is buggy"

# RIGHT -- state the facts, let the developer find the root cause
"Total displays 0d when the cart has 3 items. Expected: 1,500,000d"
```

### 4. Suggest root cause -- Provide hints if you have them

```
Additional Info:
- May be related to commit abc123 (changed payment validation)
- API /api/payment/validate returns 500 (see attached Network tab)
- Only occurs with cards that have an expiry date before the current date
```

### 5. Note the Reproduction Rate

```
# Developers need to know: does this bug happen every time or "randomly"?
Reproduction Rate: 100% (5/5 attempts) --> Stable bug, easier to debug
Reproduction Rate: ~30% (3/10 attempts) --> Intermittent, harder to debug
```

:::tip Aha moment
**Intermittent** bugs (ones that don't happen every time) are the **hardest** to fix. Clearly note: how many times you tried, how many times it failed, and whether there's a pattern (only fails under heavy load? only on the first request?). This information is extremely valuable for developers.
:::

---

## Bug Metrics -- Tracking Project Health

| Metric | Meaning | Target | Medical Equivalent |
|---|---|---|---|
| **Defect Density** | Number of bugs per module | Identify high-risk modules | Disease rate by region |
| **Bug Reopen Rate** | % of bugs reopened after fix | < 10% | Relapse rate |
| **Defect Leakage** | Bugs that escape to Production | The fewer the better | Patients discharged who get readmitted |
| **Avg Fix Time** | Average time to fix a bug | Depends on severity | Average treatment duration |
| **Bug Rejection Rate** | % of bugs rejected | < 15% | Misdiagnosis rate |

---

## Common Mistakes

**Vague title: "Checkout page error", "Login bug", "Not working"**
--> Use the format `[Module] Action --> Wrong Result`: "[Checkout] Click Place Order with expired card --> Error 500"
--> Developers receive 20 bugs/day. A vague title = they don't know the priority and don't know where to start

**Blaming the developer in the bug report: "Dev coded function X wrong"**
--> Report facts: "Total displays 0d when the cart has 3 items. Expected: 1,500,000d"
--> Blame creates a defensive reaction, and the developer wastes time defending instead of fixing. Facts create collaboration and lead to faster fixes

**Not attaching evidence (screenshot, video, console log)**
--> Every bug MUST have at least 1 screenshot or video + console log if there's an error
--> "Seeing is believing" -- a screenshot is undeniable proof. No evidence = the developer has to reproduce it themselves, taking twice as long

**Reporting a bug without checking if it's already been reported**
--> Before creating a new bug, search Jira using keywords (module name, error message)
--> Duplicate bugs create noise, waste dev time reading and closing them, and reduce QA's credibility. Bug Rejection Rate > 15% = red flag

**Not noting the reproduction rate -- "this bug happens randomly"**
--> Be specific: "Reproduces 100% (5/5)" or "~30% (3/10), usually occurs under heavy load"
--> Developers need to know if the bug is stable or intermittent to choose the right debugging approach

---

## Summary -- The Perfect Medical Record

| Aspect | Best Practice | Remember |
|---|---|---|
| **Title** | [Module] Action --> Wrong Result | 1 line, anyone can understand |
| **Severity** | Critical > Major > Minor > Trivial | QA assesses technical impact |
| **Priority** | P1 > P2 > P3 > P4 | PM assesses business impact |
| **Sev != Pri** | Crash with few users = P3. Typo seen by millions = P1 | Context decides |
| **Steps** | Specific, numbered, anyone can reproduce | Write for someone who knows nothing |
| **Evidence** | Screenshot, video, console log | No evidence = not convincing |
| **Tone** | Report facts, don't blame | QA and Dev are teammates |
| **Lifecycle** | New, Open, Fixed, Retest, Closed | Bugs also have a "journey" |
