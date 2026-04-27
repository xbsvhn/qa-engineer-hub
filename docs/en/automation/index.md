# Automation Testing

Automation Testing enables automated test execution, saving time and increasing coverage — especially for regression testing. This is a **mandatory** skill if you want to advance your QA career to Senior and SDET levels.

## Contents

| # | Topic | Description |
|---|---|---|
| 1 | [Programming Basics](./programming-basics) | What is a programming language? Categories? Variables, Functions, Async/Await, Classes |
| 2 | [JavaScript & TypeScript for QA](./javascript-for-qa) | Node.js, npm, TypeScript essentials, Array/String methods, Patterns for automation |
| 3 | [Automation Framework](./framework) | Page Object Model, Data-Driven Testing, Fixtures, real-world project structure |
| 4 | [Playwright (Focus)](./playwright) | Deep dive: Locators, Actions, Assertions, Auto-wait, API testing, Debugging |
| 5 | [Selenium](./selenium) | Foundational knowledge, comparison with Playwright, when Selenium is still needed |
| 6 | [Cypress](./cypress) | Key features, Network Stubbing, comparison, when to choose Cypress |
| 7 | [Automation Strategy](./automation-strategy) | What to automate? Which tool? ROI, Roadmap, Metrics |

## Learning Path

```
New to programming:
  Programming Basics → JavaScript/TypeScript → Framework → Playwright
  (2 weeks)            (1 week)               (1 week)    (2 weeks)

Already know programming:
  Framework → Playwright → Automation Strategy
  (3 days)    (1 week)     (1 day)
```

## When Should You Automate?

| Should automate | Should NOT automate |
|---|---|
| Regression tests (run repeatedly) | Exploratory testing |
| Smoke tests (every build) | Feature UI that changes constantly |
| Data-driven tests (many data sets) | One-time tests |
| Cross-browser testing | Usability / UX testing |
| API testing | Overly complex edge cases |

::: tip Tool recommendation 2025-2026
**Playwright + TypeScript** is the best choice for new projects. It supports multi-browser, auto-wait, built-in API testing, excellent debugging, and has the fastest-growing community.
:::
