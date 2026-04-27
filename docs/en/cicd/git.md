# Git & Version Control

## The essence: Git = "Save Game" for code

You're playing an RPG. Before fighting the boss, you **save the game**. If you die, you **reload** from that save point. Git does exactly the same thing for code:

- Every **commit** = you **save the game** at that moment
- If your code breaks, you can **go back** to any previous "save point"
- Multiple people can **play the same game** without overwriting each other

::: tip Aha moment
Without Git, "reverting to yesterday's code" means you have to REMEMBER what you changed. With Git, you just run a single command and the code returns to the exact moment you want -- like a time machine for code.
:::

---

## Core concepts -- Explained with visuals

### Repository (Repo) = A project folder with "memory"

```
Repository = Project folder + Entire change history

Local Repo  <-- On your computer (you work here)
Remote Repo <-- On GitHub/GitLab (cloud -- where everyone sees your code)
```

Think of it this way: Local repo = you sketch on draft paper. Remote repo = you take a photo and upload it to Google Drive for the whole team to see.

### Branch = Parallel universe

```
main ──●──●──●──●──●──●──●──●── (main code, always working)
              |              ^
              |              | Merge (combine code back)
              v              |
feature/login ●──●──●──●──●─┘  (you experiment here)
```

**Why do you need branches?** Imagine you're writing a group report. If 3 people edit the SAME Google Doc DIRECTLY at the same time -- chaos! Instead:
- Each person **makes their own copy** (creates a branch)
- When done, they **merge it back** (merge)
- If someone breaks something, only their copy is broken -- **the original stays safe**

### Branching Strategy in real projects

```
main          <-- Production code (code running for real users)
  |
  +-- develop <-- Integration branch (combine code before going to main)
  |     |
  |     +-- feature/login-test    <-- QA writes new tests
  |     +-- feature/cart-test     <-- QA writes new tests
  |     +-- bugfix/flaky-test     <-- Fix a flaky test
  |
  +-- release/v2.0 <-- Preparing for release
```

### Commit = A "screenshot" of the code at this moment

Each commit records:
- **WHO** made the change? (author)
- **WHAT** changed? (which files, which lines)
- **WHEN** did it change? (timestamp)
- **WHY** did it change? (the commit message you write)

### Push / Pull = Upload / Download

```
Your machine (Local)         GitHub (Remote)
     |                        |
     |--- git push --------->|   (Upload code to cloud)
     |                        |
     |<--- git pull ---------|   (Download new code from cloud)
```

Just like Google Drive: push = upload a file, pull = download the latest version.

### Merge Conflict = Two people editing the same line

Imagine you and a colleague **both edit line 5** of the file `login.spec.ts`:
- You change the email to `test@gmail.com`
- Your colleague changes the email to `admin@company.com`

Git doesn't know which one to pick -- so it **flags a conflict** and asks you to CHOOSE:

```bash
# Git marks the conflict in the file like this:
<<<<<<< HEAD
  await page.fill('#email', 'test@gmail.com');      // Your code
=======
  await page.fill('#email', 'admin@company.com');   // Your colleague's code
>>>>>>> main

# You must: pick one version, delete the markers (<<<<, ====, >>>>), save the file
  await page.fill('#email', 'admin@company.com');   // Choose the correct version
```

::: warning
A merge conflict is NOT a serious error. It's just Git saying: "I don't know which version to pick -- you decide for me." Stay calm, read through it, and choose the right version.
:::

---

## Git Commands -- Learn by following the daily workflow

### First time: Clone the repo to your machine

```bash
# Clone = "download the entire project to your machine for the first time"
git clone https://github.com/company/automation-tests.git
cd automation-tests

# Configure your name and email (Git needs to know who you are)
git config --global user.name "Nguyen Van An"
git config --global user.email "an@company.com"
```

### Daily workflow (what QA uses MOST)

```bash
# Step 1: Pull the latest code from cloud (like "syncing" Google Drive)
git pull origin main

# Step 2: Create a new branch for today's work
# (create a "parallel universe" to work in without affecting main)
git checkout -b feature/add-checkout-tests

# Step 3: Write code... (write test cases, fix tests...)
# ... you code as usual here ...

# Step 4: See what you've changed
git status          # Shows which files have changed (like "view file list")
git diff            # Shows exactly which lines changed (like "compare 2 versions")

# Step 5: "Select files" to save (stage)
git add tests/checkout.spec.ts    # Select a specific file
git add tests/                     # Select an entire directory
git add .                          # Select EVERYTHING (be careful -- you might add unwanted files!)

# Step 6: "Save the game" (commit)
git commit -m "Add checkout flow e2e tests"

# Step 7: Upload to cloud (push)
git push origin feature/add-checkout-tests

# Step 8: Create a Pull Request on GitHub --> Team reviews --> Merge into main
```

::: tip Aha moment
`git add` is like **putting items in your shopping cart** (stage). `git commit` is like **going to the checkout counter** (save). You can put many items in the cart before checking out -- similarly, you can `add` multiple files before doing a single `commit`.
:::

### Additional useful commands

```bash
# View "save game" history (commits)
git log --oneline -10       # Last 10 commits, one line each

# Switch to another branch (like "loading a different save game")
git checkout main
git checkout feature/login-test

# View all branches
git branch -a

# Delete a merged branch (cleanup after the work is done)
git branch -d feature/old-branch

# Fetch new info from cloud WITHOUT merging (just "look" at it)
git fetch origin

# "Undo" uncommitted changes
git checkout -- filename.ts     # Undo a single file
git stash                       # Temporarily stash ALL changes (like "putting them in a drawer")
git stash pop                   # Retrieve from the "drawer"
```

---

## Pull Request (PR) = "Asking permission" before merging code

### What is a PR?

Imagine you've written an essay. Before submitting it, you **ask a friend to read it and give feedback**. A Pull Request is the same process for code:

1. You **push your branch** to GitHub
2. You **create a Pull Request**: "Hey team, I finished writing these tests -- please review"
3. The team **reads the code**, **gives feedback**, **approves**
4. The CI pipeline **automatically runs tests**
5. Everything is OK --> **Merge into main**

### QA creating a PR

```
1. Push branch to remote
2. Create a Pull Request on GitHub:
   - Title: "Add checkout e2e tests"
   - Description: What changed, why, how to review
   - Reviewers: Team lead, other QA
   - Labels: "automation", "tests"
3. CI pipeline automatically runs tests
4. Reviewers approve --> Merge into main
```

### QA reviewing a Dev's PR

This is the "secret weapon" of a skilled QA -- **reading the dev's code changes** to:

```
When reviewing a dev's PR, QA focuses on:
- Which files changed?  --> Which modules need re-testing?
- What new logic?       --> What test cases are needed?
- Are there edge cases the dev didn't handle?
- Are there enough unit tests for the new code?
```

::: tip Aha moment
QA reviewing a dev's PR = **shift-left testing**. You find bugs BEFORE the code gets merged, instead of waiting until you test on staging. Faster, cheaper, more effective.
:::

---

## .gitignore -- A "blocklist" of files not to push to cloud

Some files **should not** be pushed to GitHub (temporary files, password files, large files):

```gitignore
# Dependencies (too large -- anyone who needs them can install themselves)
node_modules/

# Test outputs (generated every run, no need to save)
test-results/
playwright-report/
screenshots/
videos/

# Environment (contains passwords, tokens -- NEVER push these!)
.env
.env.local

# IDE settings (personal to each developer)
.vscode/settings.json
.idea/

# OS files (junk files from the operating system)
.DS_Store
Thumbs.db

# Build output
dist/
```

---

## Commit Message Convention -- A clear "logbook"

```
Format: <type>: <short description>

Types:
  test:     Add or modify tests
  fix:      Fix a bug in test code
  feat:     Add a new feature (page object, helper)
  refactor: Refactor code (no behavior change)
  ci:       Change CI/CD config
  docs:     Update documentation

Examples:
  test: add checkout flow e2e tests
  fix: resolve flaky login test timeout
  refactor: extract common login helper
  ci: add parallel test execution
```

::: tip
A good commit message = you read one line and know what changed and WHY. A bad commit message = "fix bug", "update code" -- you read it and still have no idea.
:::

---

## Chapter summary

| Concept | Analogy | QA uses it when |
|---|---|---|
| **Git** | "Save game" for code | Every working day |
| **Branch** | Parallel universe | Creating a branch for a new feature |
| **Commit** | Code screenshot | Saving work progress |
| **Push/Pull** | Upload/Download | Syncing code with the team |
| **Merge Conflict** | Two people editing the same line | Resolving during a merge |
| **Pull Request** | Asking permission to merge code | Reviewing before merging |
| **.gitignore** | Blocklist | Not pushing unnecessary files |
