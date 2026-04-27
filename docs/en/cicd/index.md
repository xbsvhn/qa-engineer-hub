# CI/CD

## What is CI/CD? -- Understanding the essence first

Imagine you're a chef in a restaurant. Every day you cook a new dish (new code). Before serving it to customers, you must:

1. **Check the ingredients** (build -- does the code compile?)
2. **Taste it** (test -- does the code work correctly?)
3. **Bring it to the table** (deploy -- put the code on a server for users)

**CI/CD** is a **robot that automates these 3 steps** every time you change code. You just cook (code), and the robot handles the rest.

- **CI** (Continuous Integration) = automatically build + test every time someone pushes code
- **CD** (Continuous Delivery) = automatically deploy to a server after tests pass

## Pipeline = Assembly line

```
Developer pushes code
       |
       v
+----------------------------------------------------------+
|                    CI/CD Pipeline                          |
|                                                           |
|  Build --> Unit Tests --> API Tests --> Deploy Staging     |
|                                            |              |
|                                            v              |
|                            E2E Tests --> Smoke Test        |
|                                            |              |
|                                   Tests pass? ---+        |
|                                    |             |        |
|                                   Yes           No        |
|                                    |             |        |
|                              Deploy Prod    Notify QA     |
|                                             + Block       |
+----------------------------------------------------------+
```

> **Aha moment:** Automation tests are only TRULY valuable when they run inside a CI/CD pipeline. Writing 1000 test cases that you have to run manually = a waste. Put them in a pipeline = every time a dev pushes code, tests run automatically and report the results.

## What's in this section

| # | Topic | Description |
|---|---|---|
| 1 | [Git & Version Control](./git) | "Save game" for code, branching, Pull Requests |
| 2 | [GitHub Actions](./github-actions) | Free computers GitHub lends you to run tests |
| 3 | [Docker for QA](./docker) | Package code into "containers" that run identically everywhere |
