# GitHub Actions

## The essence: GitHub LENDS YOU A COMPUTER for free

This is the most important thing to understand, and many people get it wrong:

> **GitHub Actions runner = a REAL COMPUTER (virtual machine) that GitHub LENDS YOU FOR FREE.**

When you push code to GitHub, here's what happens:

1. GitHub **spins up a brand-new Ubuntu machine** (or Windows/macOS)
2. That machine **downloads your code** from the repository
3. That machine **installs everything** you need (Node.js, browsers, packages...)
4. That machine **runs your tests**
5. That machine **reports the results** (pass/fail)
6. GitHub **DELETES that machine** -- it disappears completely

::: tip Aha moment
Every pipeline run = a COMPLETELY NEW machine. Nothing remains from the previous run. It's like renting a hotel room -- check in, stay, check out, the room is cleaned for the next guest.
:::

**Cost:**
- **Public repos:** FREE with no limits
- **Private repos:** 2000 minutes/month free (more than enough for most teams)

---

## .yml files = "Instruction sheet" for the borrowed computer

A `.yml` (YAML) file is a **list of instructions** you write for GitHub's computer. It's like writing a to-do list for an assistant: "Step 1 do this, step 2 do that..."

### File location

```
your-project/
  .github/
    workflows/
      test.yml          <-- Run tests on push/PR
      regression.yml    <-- Full regression (nightly/weekly)
      deploy.yml        <-- Deploy website
```

### Line-by-line explanation -- Playwright Test Workflow

```yaml
# .github/workflows/test.yml
# ^^^ This file lives in the .github/workflows/ directory

name: Playwright Tests
# ^^^ Display name on GitHub -- name it so you know what it does at a glance

# === WHEN to run? ===
on:
  push:
    branches: [main, develop]
    # ^^^ When someone PUSHES code to the main or develop branch --> run
  pull_request:
    branches: [main]
    # ^^^ When someone CREATES A PULL REQUEST into main --> run

# === WHAT to do? ===
jobs:
  test:
    runs-on: ubuntu-latest
    # ^^^ "Lend me the latest version of an Ubuntu machine"
    # (This is when GitHub spins up a new computer for you)

    timeout-minutes: 30
    # ^^^ "If it runs longer than 30 minutes, stop" (in case it hangs)

    steps:
      # Step 1: Download code from the repo onto the borrowed computer
      - uses: actions/checkout@v4
        # ^^^ "actions/checkout" is a built-in GitHub "tool"
        # It's like running: git clone <your-repo> on the borrowed computer

      # Step 2: Install Node.js on the borrowed computer
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
        # ^^^ The new machine does NOT have Node.js --> must install it
        # cache: 'npm' = save a cache so the next install is faster

      # Step 3: Install dependencies (npm packages)
      - run: npm ci
        # ^^^ "npm ci" = install the EXACT packages listed in package-lock.json
        # Like "npm install" but faster and more precise for CI

      # Step 4: Install browsers for Playwright
      - run: npx playwright install --with-deps
        # ^^^ Playwright needs Chromium, Firefox, WebKit to run tests
        # --with-deps = also install system dependencies (fonts, libraries...)

      # Step 5: RUN TESTS!
      - run: npx playwright test
        # ^^^ This is the most important line -- run all tests
        # If any test FAILS --> the whole pipeline = FAIL

      # Step 6: Upload test report (to view later)
      - uses: actions/upload-artifact@v4
        if: always()
        # ^^^ "if: always()" = ALWAYS upload, even when tests FAIL
        # (When tests fail is when you need the report most!)
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
          # ^^^ Keep the report for 30 days, then auto-delete

      # Step 7: Upload test results (screenshots, videos on failure)
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 7
```

::: tip Aha moment
Every `- run:` line is a command executed on the borrowed computer -- EXACTLY the same as if you typed that command in your own Terminal. `- uses:` calls a pre-built "tool" (action) that someone else already wrote.
:::

---

## Nightly Regression -- Running tests every night

```yaml
# .github/workflows/regression.yml
name: Nightly Regression

on:
  schedule:
    - cron: '0 22 * * 1-5'
    # ^^^ Cron expression: "22:00 UTC, Monday through Friday"
    # (= 5:00 AM Vietnam time -- finishes before the team starts work)
    #
    # Cron format: minute hour day month weekday
    # 0 22 * * 1-5 = minute 0, hour 22, every day, every month, Mon-Fri

  workflow_dispatch: {}
    # ^^^ Adds a "Run workflow" button on GitHub to trigger manually when needed

jobs:
  regression:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    # ^^^ Regression takes longer --> increase timeout to 60 minutes

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps

      # Only run tests tagged with @regression
      - run: npx playwright test --grep @regression
        env:
          BASE_URL: https://staging.example.com
          # ^^^ "env" = pass environment variables
          # Code reads it as: process.env.BASE_URL

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: regression-report
          path: playwright-report/
```

---

## Sharding = Splitting a pizza so multiple people eat at the same time

Imagine you have 200 test cases. Running them sequentially = **one person eating the whole pizza** --> 40 minutes.

**Sharding** = **splitting the pizza into 4 slices**, 4 people eat at the same time --> **10 minutes!**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/4, 2/4, 3/4, 4/4]
        # ^^^ Spin up 4 "borrowed computers" AT THE SAME TIME
        # Machine 1: runs tests 1-50
        # Machine 2: runs tests 51-100
        # Machine 3: runs tests 101-150
        # Machine 4: runs tests 151-200
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=$\{\{ matrix.shard \}\}
        # ^^^ $\{\{ matrix.shard \}\} = value from the matrix (1/4, 2/4, 3/4, 4/4)
        # Playwright automatically distributes tests evenly across shards
```

::: tip Aha moment
Sharding = you BORROW 4 COMPUTERS at once instead of 1. GitHub allows **parallel** execution -- so total time drops to 1/4. This is why CI/CD runs tests FASTER than running them on your machine.
:::

### Multi-browser Testing -- Running on multiple browsers at the same time

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [chromium, firefox, webkit]
        # ^^^ 3 computers: 1 runs Chrome, 1 runs Firefox, 1 runs Safari
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --project=$\{\{ matrix.project \}\}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: report-$\{\{ matrix.project \}\}
          path: playwright-report/
```

---

## Secrets = "Sealed envelopes" containing passwords

Code pushed to GitHub is readable by anyone. So where do you put passwords and API keys?

**GitHub Secrets** = "sealed envelopes." You put the password inside, and GitHub **seals it shut**. Only when the pipeline runs does GitHub **open the envelope** and hand it to the borrowed computer. After the run finishes, the machine is deleted --> the password vanishes too.

### How to set up

```
GitHub repo --> Settings --> Secrets and variables --> Actions --> New repository secret

Name: TEST_USER_EMAIL
Value: qauser@company.com

Name: TEST_USER_PASSWORD
Value: SecureP@ss123!

Name: API_KEY
Value: sk-abc123xyz789
```

### How to use in a workflow

```yaml
steps:
  - run: npx playwright test
    env:
      # Read secrets from GitHub's "sealed envelope"
      TEST_USER_EMAIL: $\{\{ secrets.TEST_USER_EMAIL \}\}
      TEST_USER_PASSWORD: $\{\{ secrets.TEST_USER_PASSWORD \}\}
      API_KEY: $\{\{ secrets.API_KEY \}\}
      # ^^^ $\{\{ secrets.NAME \}\} = retrieve the value from GitHub Secrets
      # This value is NEVER shown in logs (GitHub automatically masks it)
```

```typescript
// In test code -- read from environment variables
// (Like reading from the machine's "environment variables")
const email = process.env.TEST_USER_EMAIL || 'default@test.com';
const password = process.env.TEST_USER_PASSWORD || 'DefaultPass@123';
```

::: warning
**NEVER hardcode passwords in your code!**
```typescript
// WRONG -- the password is exposed for everyone to see
const password = 'RealP@ssw0rd!';

// CORRECT -- read from environment variable
const password = process.env.TEST_USER_PASSWORD;
```
:::

---

## Common mistakes

❌ **Not caching dependencies -- running `npm install` from scratch every time**
→ ✅ Use `cache: 'npm'` in `actions/setup-node` or `actions/cache`
→ 💡 No cache = each pipeline wastes an extra 2-5 minutes installing packages. With cache = down to 10-30 seconds. Multiply by 20 runs/day = hours saved

❌ **Running ALL tests on every push -- even when you only changed a README**
→ ✅ Use `paths` filters to only trigger when code changes, or use `@smoke` tags for pushes and `@regression` for nightly runs
→ 💡 Pushing a docs fix and waiting 30 minutes for a full regression = wasted resources. Smart filtering = faster feedback

❌ **Hardcoding secrets (passwords, API keys) in code or .yml files**
→ ✅ Use **GitHub Secrets** (Settings → Secrets → Actions), read them with `$\{\{ secrets.VARIABLE_NAME \}\}` syntax
→ 💡 Code on GitHub is readable by everyone (especially public repos). Hardcoding a password = exposing it to the whole world

❌ **Not uploading artifacts -- tests fail but there's no report or screenshot to debug with**
→ ✅ Always use `actions/upload-artifact` with `if: always()` to upload reports + screenshots
→ 💡 `if: always()` = upload EVEN when tests fail. Without artifacts = tests fail but nobody knows where → time wasted reproducing locally

---

## Chapter summary

| Concept | Analogy | Explanation |
|---|---|---|
| **Runner** | Borrowed computer | GitHub spins up a new VM, runs tests, then deletes it |
| **Workflow (.yml)** | Instruction sheet | File with instructions for the borrowed computer |
| **Trigger (on:)** | "When to run?" | push, pull_request, schedule, manual |
| **Steps** | One step at a time | Each step = 1 command or 1 action |
| **Matrix** | Cloning computers | Run multiple configs in parallel |
| **Sharding** | Splitting the pizza | Distribute tests across multiple machines running simultaneously |
| **Artifacts** | Result files | Upload reports, screenshots to view later |
| **Secrets** | Sealed envelopes | Store passwords securely, only opened at runtime |
