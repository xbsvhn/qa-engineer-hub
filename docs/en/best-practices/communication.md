# Communication Skills — Saying the Right Thing

## What is Communication in QA? Why does it matter?

**Essence:** QA is the **translator** between many worlds: Devs speak the language of code, PMs speak the language of business, Users speak the language of emotion. You must **translate** between all of them — accurately, without losing information, and without causing misunderstandings.

**Analogy (Real-world example):** Imagine you are a court interpreter. The plaintiff speaks English, the defendant speaks Vietnamese, and the judge speaks French. If you mistranslate a single word — an innocent person could be convicted. In QA, if you describe a bug incorrectly — the dev fixes the wrong thing, the PM sets the wrong priority, and the release gets delayed.

> The #1 skill that separates a Senior QA from a Junior QA is not technical skills — it is **communication skills**. You may find 100 bugs, but if you cannot communicate them clearly — those bugs are meaningless.

::: tip Aha Moment
Communication is not about "talking a lot". It is about **saying the right thing, to the right person, at the right time, in the right way**. A clear 3-line message is more valuable than a 3-page email that nobody reads.
:::

---

## Communicating With Developers — "Report Facts, Not Blame"

**Essence:** Devs are not the enemy. Devs and QA are on the same team, with the same goal: ship a quality product. When you find a bug, it is not "the dev's fault" — it is "the team caught it early before the user did". **Tone makes all the difference.**

**Analogy:** You go to a doctor. The doctor says: "You have a liver issue that needs early treatment" — you feel grateful. But if the doctor says: "Your liver is terrible, how did you let it get this bad?" — you become defensive. Same information, different delivery -> completely different reaction.

### Before / After — How phrasing makes the difference:

**Scenario 1: Reporting a bug**
```
BEFORE (Blame tone):
"Dev coded this wrong, this bug is obvious. Login is completely broken."

AFTER (Fact-based):
"When performing steps 1-2-3, the actual result is X, expected is Y.
Here is a screenshot and console log. Reproduces 100% on Chrome 120."
```

**Scenario 2: Feature has many bugs**
```
BEFORE:
"This feature is full of bugs, what kind of code is this? Needs a complete rework."

AFTER:
"I found 5 issues in the Payment feature. Logged in Jira:
- 2 Critical (block checkout flow)
- 2 Major (data displayed incorrectly)
- 1 Minor (UI alignment)
Recommend prioritizing PAY-101 and PAY-102 as they block user checkout."
```

**Scenario 3: Old bug still not fixed**
```
BEFORE:
"I reported this bug last sprint and it's still not fixed. QA is clearly not being taken seriously."

AFTER:
"BUG-100 is still open from Sprint 14 and is currently blocking testing for Story #50.
Can you estimate when it can be fixed? If you need more info,
I'm happy to pair debug."
```

### When a Dev says "Not a Bug" / "Works as Designed"

This is the **most common** situation and also the one that causes the most conflict.

```
Step 1: LISTEN — you may have misunderstood the requirement
  -> "I see. Can you explain the logic here?"

Step 2: PRESENT EVIDENCE — if you still disagree
  -> "I understand your perspective. However, from the user's point of view,
     this behavior is confusing because [specific reason + screenshot]."

Step 3: ESCALATE — if you cannot resolve it
  -> "Let's ask the PO for a final decision.
     I'll summarize both viewpoints in a Jira comment."

Step 4: DOCUMENT — record the decision in Jira
  -> "Decision: PO confirms this is expected behavior. Documented."

Step 5: MOVE ON — do NOT hold a grudge, do NOT be passive-aggressive
```

### When you need a Dev to fix an urgent bug

```
Template (Slack/Teams):
"Hi [name], BUG-200 (Checkout crash) is blocking release testing.

Impact: 100% of users cannot checkout in production.
Steps: [link to Jira with full steps + screenshot + logs]
Severity: Critical — recommend P1.

I can help reproduce or pair debug at [specific time].
Can you look into this today?"

Key: Clear impact + Complete info + Offer help + No blame
```

::: tip Aha Moment
Every time you write a message to a Dev, re-read it and ask yourself: **"If I were the dev receiving this message, how would I feel?"**. If the answer is "attacked" — rewrite it. If the answer is "ah, there's a bug to fix, and I know how to reproduce it" — send it.
:::

---

## Communicating With PM/PO — "Speak the Language of Business"

**Essence:** PMs don't care whether the API returns a 500 or a 422. PMs care about **how many users are affected**, **how much money is lost**, and **whether the release is on track**. When speaking with a PM, **translate from technical to business impact**.

**Analogy:** You take your car to a mechanic. The mechanic says: "The spark plug in cylinder 3 is worn by 0.2mm, compression ratio is down 15%". You don't understand. But if the mechanic says: "Your car burns 20% more fuel, and in 6 months the engine will die on the highway" — you understand immediately and decide to fix it. PMs are the same — tell them the **consequences**, not the **technical details**.

### Translating Technical -> Business:

| What you found (Technical) | What to tell PM (Business Impact) |
|---|---|
| "API /orders returns 500 when payload has null" | "Customers cannot place an order if they leave the City field empty. Impact: all new orders" |
| "Memory leak on the Search page" | "The Search page slows down over time; after 5 minutes users must refresh. Poor UX -> users leave" |
| "Race condition when 2 users apply the same coupon" | "A coupon limited to 100 uses could be used 200 times -> lost revenue" |
| "XSS vulnerability in the search box" | "Hackers could steal customers' login credentials" |
| "Test coverage is only 40%" | "60% of the code is untested -> high risk at release, bugs may reach production" |

### Reporting Testing Status — Be specific, use numbers:

```
BAD (Vague — PM doesn't know what to do):
"Testing is going OK, a few bugs left. Probably done next week."

GOOD (Specific — PM has enough information to decide):
"Sprint 15 Testing Status (Day 7/10):

Progress:
- Executed: 120/150 test cases (80%)
- Pass: 108 (90%) | Fail: 12 (10%)
- Blocked: 30 test cases (waiting for API deployment)

Critical Issues:
1. BUG-200: Checkout crash — Dev is fixing, ETA today
2. BUG-201: Tax calculation error — Investigating

Risk Assessment:
- HIGH: If BUG-200 is not fixed by Thursday -> release delayed by 2 days
- MEDIUM: 30 blocked TCs depend on DevOps deploying to staging

Recommendation:
- Prioritize fixing BUG-200 before Thursday
- BUG-201 has a workaround (admin adjusts manually)
- If BUG-200 is fixed -> GO for Friday release"
```

::: tip Aha Moment
PMs need 3 things: **Numbers** (how many?), **Risk** (what could happen?), and **Recommendation** (what should we do?). Every time you report to a PM, make sure your message includes all three. Without a recommendation, you are pushing the decision onto the PM without helping.
:::

---

## Daily Standup — Right Format, Right Amount

**Essence:** Standup is a **status sync**, not a discussion meeting. The goal: everyone knows what you are working on, what you need, and what is blocking you — in **2 minutes** max.

**Analogy:** Standup is like an airport departure board: "Flight VN123: On time", "Flight VN456: Delayed 30 min — gate changed". Short, clear, actionable. Nobody wants to hear the pilot explain the delay for 10 minutes.

### Standard format: Yesterday -> Today -> Blockers

**GOOD Example:**
```
"Yesterday:
- Completed testing Story #45 (Login redesign) — 15/15 TCs pass, 0 bugs
- Logged BUG-185 (Profile avatar crop issue) — Major severity

Today:
- Start testing Story #46 (Profile page) — estimate 20 TCs
- Retest BUG-180 (fix deployed to staging this morning)

Blocker:
- Staging database was reset last night -> need to re-setup test data
  -> @DevOps-Minh can you restore the backup today?"
```

**BAD Example:**
```
"Yesterday I tested login, there were some bugs, then I continued testing the profile
but staging had some error so I switched to testing something else, then...
today I'll keep testing, will report back later..."
```

Why is this BAD?
- No specifics (which test cases? how many?)
- No ticket numbers (BUG-xxx, Story #xx)
- "Will report back later" = no clear plan
- No specific blocker mentioned -> team doesn't know what help is needed

### Pro Tips for Standup:

```
1. PREPARE 2 minutes beforehand (open Jira, note 3 bullets)
2. USE NUMBERS: "15/15 TCs" instead of "testing is done"
3. CITE TICKETS: "BUG-185" instead of "there's a bug"
4. BLOCKER = needs action: tag the person who can resolve it
5. DETAILED discussions -> "let's take it offline after standup with @name"
```

---

## Escalation Framework — "Facts -> Impact -> Options -> Let PM Decide"

**Essence:** Escalation is not "tattling" or "filing a complaint". Escalation is **delivering information to the right person who has the authority to decide**, when the issue exceeds your scope.

**Analogy:** You are a security guard. You see smoke -> you can use a fire extinguisher. You see a major fire -> you MUST call 911. Nobody blames you for calling 911 — they blame you if you DON'T call. Escalation in QA works the same way.

### When should you Escalate?

```
SHOULD escalate:
- Critical bug not fixed, deadline approaching (< 2 days)
- Test environment down > 1 day, nobody fixing it
- Requirement conflict between PM and Dev, QA is stuck in the middle
- Serious quality concern before release
- Resources insufficient -> cannot complete the test plan

Should NOT escalate:
- Normal bug, Dev is fixing on schedule
- Minor disagreement that can be resolved between the two of you
- Personal issues (lateness, lack of cooperation) -> talk 1-1 first
```

### Escalation Template:

```
Hi [PM/Lead],

SITUATION: [Describe the problem — facts only, no emotion]
"BUG-200 (Checkout crash) is still not fixed. Release deadline: Friday."

IMPACT: [Specific business impact]
"If not fixed -> release delayed by at least 3 days.
Impact: Black Friday campaign starts Saturday."

OPTIONS:
(A) Delay release to next Tuesday -> fix completed + full regression
    Pro: Quality assured. Con: Miss Black Friday.
(B) Release without fix + hotfix Saturday
    Pro: Make Black Friday. Con: Users encounter crash, need on-call support.
(C) Release with workaround (temporarily disable coupon feature)
    Pro: On schedule, no crash. Con: Lost revenue from coupons.

RECOMMENDATION: Option C — preserves the timeline + minimizes risk.
Coupon revenue estimated at 5% of GMV, less than the risk of delaying the campaign.

Your call — I'll plan testing accordingly.
```

::: tip Aha Moment
When escalating, **ALWAYS propose a solution**. Showing up to the PM with just "There's a problem!" means you are creating more problems. Showing up with "There's a problem. Here are 3 options. I recommend option B because..." means you are **solving** the problem. That is how Senior QAs operate.
:::

---

## Conflict Resolution — 5 Steps: Listen -> Facts -> Escalate -> Document -> Move On

**Essence:** Conflict within a team is **normal and unavoidable**. QA and Dev will always have moments of disagreement: "This is a bug" vs "This is a feature". Conflict resolution is not about "who wins and who loses" — it is about **finding the truth and making the best decision for the product**.

**Analogy:** Two people look at the same statue — the one in front sees the face, the one behind sees the back. Both are correct from their own perspective. Conflict resolution is **walking around the statue** to see the whole picture.

### 5 Steps for handling conflict:

**Step 1: LISTEN — Truly listen, not just wait for your turn to speak**
```
- Let the dev finish their explanation completely
- Don't interrupt, don't prepare your rebuttal in your head
- Ask clarifying questions: "Do you mean...?"
- You may have misunderstood the requirement — listen first
```

**Step 2: FACTS — Present evidence, not opinions**
```
"I think this is a bug" (opinion)
"Requirement section 3.2 states: 'Price must include VAT'.
   Currently the price does NOT include VAT. Here is the screenshot." (fact)

"The user will be confused" (opinion)
"I tested with 3 real users, and all 3 clicked the wrong button.
   Here is the recording." (fact)
```

**Step 3: ESCALATE — If not resolved within 10 minutes**
```
"I understand your point, and you understand mine.
We have 2 different interpretations.
Let's ask the PO/PM for a final decision."

-> Do NOT argue endlessly. 10 minutes is the max.
-> Dragging it out = wasted time + unnecessary friction.
```

**Step 4: DOCUMENT — Record the decision in Jira/Confluence**
```
Jira comment:
"Discussion between QA (Linh) and Dev (Minh) on 2025-01-15:
- QA perspective: [summary]
- Dev perspective: [summary]
- PO decision: [final decision]
- Action: [who does what]"

-> Why is documentation important?
-> Because 3 months later someone will ask "Why was it done this way?"
-> With documentation = you can answer. Without = you argue all over again.
```

**Step 5: MOVE ON — This is where professionalism shows**
```
- The decision has been made -> follow it, even if you disagree
- Do NOT be passive-aggressive ("See, I told you so")
- Do NOT hold a grudge -> it will affect future collaboration
- Coffee break after a conflict -> reset the relationship
- Remember: Disagree about bugs, not about people
```

### Key Phrases for every situation:

```
When you disagree:
-> "I understand your perspective. From the user's point of view..."
-> "Both viewpoints have merit. Let's ask the PO?"

When you need more information:
-> "Let me double-check the requirement and confirm..."
-> "I'll reproduce it with specific data and update Jira."

When a decision has been made:
-> "OK, I'll update Jira according to this decision."
-> "Thanks for the explanation. I understand better now."

When the dev is right (you were wrong):
-> "Oh, you're right. I misunderstood this part of the requirement.
   Thanks for pointing that out. I'll close this bug."
-> Saying "I was wrong" is NOT embarrassing. It shows professionalism.
```

::: tip Aha Moment
The best QA is not the one who is **always right**. It is the one who **always finds the truth** — even when that truth is that they were wrong. When you are willing to say "I was wrong, thank you for pointing it out" — you earn respect from the entire team. And the next time you say "This is a bug" — the dev will trust you more.
:::

---

## Broader Perspective — Communication Styles

### Direct vs Indirect Feedback

**Western companies (US, Europe):** Feedback is direct and straightforward. "This feature has a bug, here's the evidence." Devs appreciate the clarity; no need to beat around the bush.

**Asian companies (Vietnam, Japan, Korea):** Feedback tends to be more indirect, preserving "face" for colleagues. "I tested this and the result is a bit different from expected — I might be wrong, could you take a look?" Same message, but softer tone.

**Both are effective in their respective contexts.** When working cross-culturally (multinational companies), **observe the team culture first**, then adjust. Wrong tone in a different culture = right message but the listener won't be receptive.

### Async (Slack/Email) vs Sync (Meeting/Call)

**Async-first teams:** Everything goes through Slack/Jira comments. Pros: written record, people read when available, timezone-friendly. Cons: slow for urgent decisions, tone easily misread.

**Sync-first teams:** Prefer quick 5-10 minute calls, then document afterward. Pros: fast resolution, fewer misunderstandings since you hear the tone of voice. Cons: dependent on availability, no record if you forget to document.

**Best practice:** Use **async for updates + documentation**, use **sync for conflict resolution + urgent issues**. Bug report -> Jira (async). Urgent bug fix needed -> Slack ping + quick call (sync). Knowing when to use which channel = an essential communication skill.

---

## Summary — Communication Cheat Sheet

| Audience | Core Principle | Key Action |
|---|---|---|
| **Developer** | Report facts, not blame | Provide evidence + steps + offer help |
| **PM/PO** | Speak the language of business | Numbers + Impact + Recommendation |
| **Standup** | Yesterday -> Today -> Blockers | 2 minutes max, include ticket numbers + numbers |
| **Escalation** | Facts -> Impact -> Options | ALWAYS propose a solution, let PM decide |
| **Conflict** | Listen -> Facts -> Escalate -> Document -> Move On | 10 minutes max of debate, then escalate |
