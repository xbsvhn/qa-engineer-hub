# API Testing

API Testing is about testing **the "kitchen" behind the restaurant** — where data is processed and business logic is executed — without going through the user interface (UI). It is faster, more stable, and catches bugs earlier than UI testing. In Agile projects, this is the **most in-demand skill** for QAs today.

## Contents

| # | Topic | What you will learn |
|---|---|---|
| 1 | [API Fundamentals](./api-fundamentals) | API = restaurant waiter, HTTP = communication language, JSON, Authentication, Swagger |
| 2 | [REST API Testing](./rest-api) | HTTP Methods (5 actions), Status Codes (responses from the kitchen), Testing Checklist |
| 3 | [Postman](./postman) | The phone that calls APIs — Environments, Tests, Collection Runner |
| 4 | [API Automation](./api-automation) | From manual calls to automated systems — Playwright API testing, API+UI combo |

## Learning Path

```
API Fundamentals → REST API Testing → Postman (manual) → API Automation (code)
   (1 day)           (1 day)           (2-3 days)          (1 week)
```

## Why is API Testing important?

```
                    ┌─────────────────────┐
                    │     UI Testing      │  Slow, flaky
                    │    (10% effort)     │
                    ├─────────────────────┤
                    │   API Testing       │  Fast, stable, high coverage
                    │   (60% effort)      │  ← FOCUS HERE
                    ├─────────────────────┤
                    │   Unit Testing      │  Written by developers
                    │   (30% effort)      │
                    └─────────────────────┘
```

- **60-70% of bugs** are found at the API layer
- API tests run **10-100 times faster** than UI tests
- Not affected by UI changes
- Can be tested before the frontend is complete

::: tip Recommendation
Learn **Postman** first to understand manual API testing (fast, visual) → then move on to **Playwright API testing** to automate and integrate with CI/CD. This combo is sufficient for any project.
:::
