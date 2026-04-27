# Security Testing Tools

## The essence: SAST vs DAST = Reviewing blueprints vs Testing the actual house

Before understanding the tools, you need to understand 2 approaches to security:

| | SAST (Static) | DAST (Dynamic) |
|---|---|---|
| **Analogy** | **Reviewing the blueprints** before building | **Testing the finished house** (trying to break in) |
| **When** | Scans source code (before running) | Scans the RUNNING app |
| **Input** | Source code, dependencies | The app's URL |
| **Finds** | Code vulnerabilities, insecure patterns | Runtime vulnerabilities, config issues |
| **Pros** | Catches issues EARLY, in CI/CD | Finds REAL vulnerabilities |
| **Cons** | Many false positives | Requires a running app |
| **Tools** | SonarQube, Snyk, ESLint Security | OWASP ZAP, Burp Suite |

```
Development Pipeline:
Code --> SAST scan --> Build --> Deploy --> DAST scan --> Release
         (Snyk)                            (OWASP ZAP)

SAST = "review the blueprints for flaws"    (catches early, cheap)
DAST = "break into the actual house"        (catches later, but more accurate)
```

::: tip Aha moment
SAST and DAST **complement each other**, they don't replace each other. SAST finds flaws in code (like "there's no lock here"), DAST verifies real flaws (like "I can actually open this door"). Use BOTH for the best security.
:::

---

## OWASP ZAP -- Free and powerful

### What is ZAP?

**OWASP ZAP** (Zed Attack Proxy) is a **FREE** tool for finding security vulnerabilities in web applications. It works as a **"middleman"** between the browser and server -- intercepting every request/response and looking for vulnerabilities.

Analogy: ZAP is like an **airport X-ray scanner**. Every piece of "luggage" (request) passes through, and it scans for "contraband" (vulnerabilities).

### Basic usage

```
1. Automated Scan (fast, easy):
   - Open ZAP --> Enter the target URL --> Click "Attack"
   - ZAP automatically:
     a. Crawls the entire website (finds all pages)
     b. Sends malicious payloads to every input (SQL injection, XSS...)
     c. Analyzes responses
     d. Reports the vulnerabilities found
   - Duration: 5-30 minutes depending on website size

2. Manual Explore (via proxy -- more accurate):
   - Set browser proxy --> ZAP (ZAP intercepts all requests)
   - Browse the website NORMALLY (login, click, fill forms...)
   - ZAP captures and analyzes EVERY request/response
   - ZAP highlights potential issues
   - Then run "Active Scan" on the captured URLs

3. Active Scan (attack testing):
   - After exploring, select the URLs to scan deeply
   - ZAP tries injecting payloads (SQL, XSS, path traversal...)
   - Reports vulnerabilities with severity levels
```

### ZAP Alerts -- Reading the results

| Risk Level | Color | Example | Action |
|---|---|---|---|
| **High** | Red | SQL Injection, Remote Code Execution | Fix IMMEDIATELY |
| **Medium** | Orange | XSS, Missing Security Headers | Fix this sprint |
| **Low** | Yellow | Cookie without HttpOnly flag | Plan fix |
| **Informational** | Blue | Server version disclosure | Nice to fix |

### CI/CD Integration -- Running ZAP automatically

```yaml
# GitHub Actions -- ZAP Scan nightly
- name: ZAP Full Scan
  uses: zaproxy/action-full-scan@v0.10.0
  with:
    target: 'https://staging.example.com'
    # ^^^ Scan on STAGING, not production!
    rules_file_name: '.zap/rules.tsv'
    # ^^^ Config file: which alerts to ignore, which to report
    cmd_options: '-a'
    # ^^^ -a = include alpha rules (more checks)
```

---

## Burp Suite -- The "Swiss Army Knife" of security testing

### What is Burp Suite?

**Burp Suite** is the **most popular** tool for penetration testing. Like a "Swiss Army knife" -- many tools in one.

- **Community Edition**: Free (sufficient for QA)
- **Professional Edition**: Paid (for security engineers)

### QA uses Burp Suite for:

| Feature | Analogy | Purpose |
|---|---|---|
| **Proxy** | Wiretap | Capture and view EVERY request/response |
| **Repeater** | Fax machine | Resend a request, modify it before sending |
| **Intruder** | Pressure tester | Automatically send thousands of requests (brute force, fuzzing) |
| **Scanner** | X-ray scanner (Pro) | Automatically find vulnerabilities |

### Example: Testing IDOR with Burp

```
1. Login as User A
2. Enable Burp Proxy --> capture all requests
3. Find request: GET /api/orders/123  (User A's order)
4. Right-click --> "Send to Repeater"
5. In Repeater, change the ID: GET /api/orders/124  (User B's order?)
6. Click "Send" --> View response
7. If it returns order 124's data --> BUG: IDOR vulnerability!
   (User A should NOT be able to see User B's order)
```

::: tip Aha moment
Burp Repeater is QA's most powerful "weapon" for security testing. You capture a request, modify anything (ID, token, params), resend it, and see how the server responds. Simple but EXTREMELY EFFECTIVE.
:::

---

## Snyk -- Guarding the front door (Dependency Security)

### What is Snyk?

**Snyk** scans **dependencies** (npm packages, Python packages...) to find KNOWN vulnerabilities. Like checking whether the lock you're using is on the "list of compromised locks."

```bash
# Installation
npm install -g snyk

# Scan project
snyk test

# Example output:
# x  High severity vulnerability found in lodash
#    Description: Prototype Pollution
#    Introduced through: lodash@4.17.20
#    Fixed in: lodash@4.17.21        <-- Just update to this version!
#    Path: myapp > lodash
```

### CI/CD Integration

```yaml
# GitHub Actions -- Run on every PR
- name: Snyk Security Check
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  # If High/Critical vulnerabilities found --> pipeline FAILS
  # --> Dev MUST fix before merging
```

---

## Other tools

| Tool | Type | Description | Analogy | Cost |
|---|---|---|---|---|
| **SonarQube** | SAST | Scans code quality + security | "Teacher grading papers" | Free (Community) |
| **ESLint Security** | SAST | Security rules for JavaScript | "Spell checker for security" | Free |
| **npm audit** | SCA | Check npm dependencies | "Checking the recall list" | Free (built-in) |
| **Dependabot** | SCA | Automatically creates PRs when vulnerabilities are found | "Automated security guard" | Free (GitHub) |
| **Lighthouse** | Audit | Security + Performance audit | "General health checkup" | Free (Chrome) |

**SCA** = Software Composition Analysis -- checking whether the libraries you use are safe.

---

## Security Testing Workflow for QA

```
Daily:
  +-- When testing a new feature --> try basic SQL/XSS injection
      (takes 2 minutes, but can uncover critical vulnerabilities)

Every Sprint:
  +-- npm audit --> fix critical vulnerabilities
  +-- OWASP ZAP quick scan on staging
      (run automated scan, read report, log bugs)

Every Release:
  +-- OWASP ZAP full scan
  +-- Review security headers
  +-- Test authentication flows (login, logout, token, session)
  +-- IDOR checks on new API endpoints

CI/CD Pipeline (automated):
  +-- Snyk --> check dependencies (every PR)
  +-- SonarQube --> SAST scan (every PR)
  +-- ZAP --> DAST scan (nightly on staging)
```

::: tip Aha moment
Security testing isn't something you do once and forget. It's a **continuous process** -- every new feature can introduce new vulnerabilities. But just spending **2 minutes** trying SQL/XSS on each new form already covers 80% of the work.
:::

---

## Chapter summary

| Tool | Analogy | Type | QA uses it when | Cost |
|---|---|---|---|---|
| **OWASP ZAP** | Airport X-ray scanner | DAST | Scanning web apps for vulnerabilities | Free |
| **Burp Suite** | Swiss Army knife | Proxy/DAST | Capturing requests, testing IDOR | Free (Community) |
| **Snyk** | Checking the recall list | SCA | Checking vulnerable dependencies | Free tier |
| **npm audit** | Quick check | SCA | Quick dependency check | Free |
| **SonarQube** | Teacher grading papers | SAST | Code quality + security | Free (Community) |
| **SAST** | Reviewing the blueprints | Static | Finding flaws in code | -- |
| **DAST** | Breaking into the actual house | Dynamic | Finding flaws in a running app | -- |
