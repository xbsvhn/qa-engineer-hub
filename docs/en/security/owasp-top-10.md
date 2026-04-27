# OWASP Top 10

## What is OWASP?

**OWASP** (Open Web Application Security Project) is a non-profit organization that provides web security resources. The **OWASP Top 10** is a list of the **10 most common security vulnerabilities** -- like a "Top 10 most common diseases" that every doctor must know.

::: tip Aha moment
Understanding the OWASP Top 10 is like knowing the 10 most common burglary tricks. You don't need to be a police officer, but knowing how thieves operate helps you **lock the right doors**.
:::

---

## A01: Broken Access Control -- "Wrong Room"

### Analogy

Imagine a hotel with 100 rooms. You are in room 101, but you change the room number on your key card to 102 --> and you can get into someone else's room!

### The essence

A user accesses data/functionality they are **NOT AUTHORIZED** to. This is the **most common** vulnerability (#1).

### How QA tests this

```
1. IDOR (Insecure Direct Object Reference):
   "Changing the room number on the key card"

   - Login as User A (id=1)
   - Call API: GET /api/users/2      --> Can you see User B's data?
   - Call API: PUT /api/users/2      --> Can you EDIT User B's data?
   - Call API: DELETE /api/orders/999 --> Can you DELETE someone else's order?
   --> Expected: 403 Forbidden

2. Privilege Escalation:
   "An employee impersonating the director"

   - Login as normal user
   - Call API: GET /api/admin/dashboard   --> Can you access it?
   - Change URL: /admin/settings          --> Does the admin page show up?
   --> Expected: 403 Forbidden

3. URL Manipulation:
   "Changing the number to view someone else's data"

   - Change /orders/123 to /orders/124
   - Can you see someone else's order?
   --> Expected: 403 or 404
```

---

## A02: Cryptographic Failures -- "Writing your password on a sticky note and putting it on the door"

### Analogy

You write your password on a piece of paper and stick it on your laptop screen. Anyone walking by can read it. This is a cryptographic failure -- sensitive data not properly protected.

### How QA tests this

```
1. Password in API response:
   - Call GET /api/users/me
   - Does the response contain a "password" field?
   --> Expected: NEVER return the password

2. HTTPS enforcement:
   - Access http://example.com (WITHOUT the 's')
   - Does it automatically redirect to https://?
   --> Expected: Auto redirect to HTTPS
   (http = communicating via "postcards" -- anyone can read them.
    https = communicating via "sealed encrypted letters" -- only the two parties understand)

3. Sensitive data in URL:
   - Does the URL contain tokens, passwords, credit card numbers?
   - Example: /reset-password?token=abc123&email=user@mail.com
   --> Sensitive information should be in the BODY, not the URL
   (URLs are stored in browser history, server logs -- easy to leak)
```

---

## A03: Injection -- "Writing extra commands on the order slip"

### Analogy: SQL Injection

You go to a restaurant and write on the order slip: "Beef pho". But an attacker writes: **"Beef pho AND ALSO give me all dishes from every other table"**. The restaurant (database) reads the slip and **follows it** -- returning everyone's data!

### Analogy: XSS (Cross-Site Scripting)

An attacker **hides a camera inside the menu** at a restaurant. When a customer opens the menu (web page), the camera **automatically turns on** and records everything the customer does. XSS = injecting malicious code into a web page to "spy on" other users.

### How QA tests this

```
SQL Injection -- try entering these in EVERY input field:
  ' OR 1=1 --
  '; DROP TABLE users; --
  admin'--

XSS -- try entering these in EVERY input field:
  <script>alert('XSS')</script>
  <img src=x onerror=alert('XSS')>
  javascript:alert('XSS')

Expected:
  - Input is rejected or escaped (displayed as plain text)
  - Script does NOT execute
  - Server returns 400 (Bad Request), NOT 500
  - If you get a 500 --> CRITICAL BUG! (Server can't handle unexpected input)
```

**Example testing a Login form:**

| Input | Field | Expected |
|---|---|---|
| `' OR 1=1 --` | Email | "Invalid email format" (400) |
| `<script>alert(1)</script>` | Name | Text displays normally, does NOT execute |
| `Robert'; DROP TABLE users;--` | Search | Returns 0 results, database is STILL INTACT |

::: tip Aha moment
SQL Injection sounds complex, but **testing for it is very simple**: enter `' OR 1=1 --` into any input field and see what happens. If the app returns a 500 error or unexpected data --> there's a vulnerability.
:::

---

## A04: Insecure Design -- "A restaurant with no locks"

### The essence

The design **lacks security controls from the start**. This isn't a bug in the code -- it's a **missing security feature**.

### How QA tests this

```
1. Rate limiting (limiting the number of attempts):
   - Send 100 login requests in 1 minute
   - Does it get blocked?
   --> Expected: Block after 5-10 attempts
   (Without rate limiting, a hacker could try 1 million passwords)

2. Business logic flaws:
   - Place an order with a NEGATIVE price? (-$100)
   - Apply a coupon 100 times?
   - Transfer MORE money than the account balance?
   - Change quantity to 0 then checkout?

3. Missing authentication:
   - Which API endpoints do NOT require a token?
   - Are there any endpoints that "forgot" to check auth?
   - Try calling an API without sending a token --> does it return data?
```

---

## A05: Security Misconfiguration -- "Leaving the key in the lock"

### The essence

Default configurations, lack of hardening. Like buying a new house but never changing the lock's password -- anyone with the default key can get in.

### How QA tests this

```
1. Default credentials:
   - Try login: admin/admin, admin/password, root/root
   - Try login: admin/123456, test/test
   --> Expected: ALL should be rejected

2. Error messages (error messages that leak information):
   - Send a bad request --> Does the server return a stack trace?
   - Does the error reveal database names, file paths, versions?
   --> Expected: Generic error message
   --> NOT: "MySQL error at /var/www/app/models/user.php line 42"

3. Unnecessary endpoints:
   - Try accessing: /debug, /test, /phpinfo, /swagger
   - On PRODUCTION, are there endpoints that shouldn't be exposed?
   --> Expected: 404 Not Found

4. HTTP Headers:
   - Does the X-Powered-By header reveal the technology? (Express, PHP)
   - CORS policy: does it allow * (all domains)?
```

---

## A06: Vulnerable Components -- "Using a lock that's already been picked"

### The essence

Using libraries/frameworks with KNOWN vulnerabilities. Like using a lock that thieves already know how to open.

### How QA tests this

```bash
# Check dependencies for vulnerabilities
npm audit                    # Node.js projects
pip audit                    # Python projects

# Example output:
# High severity: Prototype Pollution in lodash < 4.17.21
# Fix: npm audit fix
```

This is typically integrated into CI/CD using tools like **Snyk** and **Dependabot** -- they automatically create PRs when vulnerabilities are found.

---

## A07: Authentication Failures -- "An easy-to-pick lock"

### The essence

Weak authentication, allowing brute force, poor session management. Like a door with a 4-digit combination lock --> a thief can try all 10,000 combinations and get in.

### How QA tests this

```
1. Brute force protection:
   - Login incorrectly 10 times in a row
   --> Expected: Account locked or CAPTCHA
   (Without this --> a hacker can try millions of passwords)

2. Password policy:
   - Create password "123"      --> Allowed? (Should REJECT)
   - Create password "password" --> Allowed? (Should REJECT)
   - Create password "aA1@xxxx" --> Accepted (strong enough)

3. Session management:
   - Login --> copy token --> logout --> use old token
   --> Expected: Old token is invalidated (returns 401)

4. Token expiry:
   - Wait for token to expire --> call API
   --> Expected: 401 Unauthorized
   (A token that never expires = if leaked, hackers can use it FOREVER)

5. Password reset:
   - Does the reset link expire? (should expire after 15-30 minutes)
   - Use the reset link twice --> is the second attempt blocked?
```

---

## A08-A10: Summary

| # | Vulnerability | Analogy | QA Quick Check |
|---|---|---|---|
| **A08** | Data Integrity Failures | Receiving a package without checking if the seal is intact | Deserialization attacks, unsigned updates |
| **A09** | Logging & Monitoring | No security cameras | Are failed logins logged? Alerts on brute force? |
| **A10** | SSRF (Server-Side Request Forgery) | Asking a restaurant employee to call a secret warehouse | Does the server call internal URLs from user input? |

---

## Security Testing Checklist for QA

### Every Sprint

- [ ] Try SQL injection on new forms
- [ ] Try XSS on new input fields
- [ ] Check access control for new API endpoints
- [ ] Verify sensitive data is not exposed in responses
- [ ] Verify error messages do not leak internal info

### Every Release

- [ ] `npm audit` / dependency check
- [ ] Test brute force protection
- [ ] Test session/token management
- [ ] HTTPS enforcement
- [ ] CORS policy review

---

## Common mistakes

**Thinking that security testing = penetration testing (pentest)**
--> QA doesn't need to be a pentester. QA needs to know how to **run basic tests following the OWASP checklist** each sprint
--> Pentesting is specialized work, often outsourced. But 80% of common vulnerabilities (IDOR, XSS, SQL injection) can be found by QA with simple tests

**Only testing SQL Injection and XSS, ignoring Access Control (A01)**
--> Broken Access Control is the **#1 most common** vulnerability. Always test: Can User A view/edit/delete User B's data?
--> IDOR (changing the ID in the URL to view someone else's data) is the easiest vulnerability to test but the most commonly overlooked

**Testing security on Production instead of Staging**
--> Run security tests on the **Staging environment** -- never try SQL injection or brute force on Production
--> Destructive testing on Production = breaking the real system, affecting real users. Staging has fake data, safe to "break"

**Seeing a 500 error when entering unusual payloads but not reporting it**
--> A server returning 500 on unexpected input = **CRITICAL BUG**. Expected: 400 Bad Request
--> A 500 error = the server can't handle the input -- this could be a sign of an injection vulnerability

---

## Chapter summary

| Vulnerability | Analogy | QA Quick Test |
|---|---|---|
| **Broken Access** | Wrong hotel room | Can User A see User B's data? |
| **Crypto Failures** | Writing password on paper | Password in response? HTTPS? |
| **Injection** | Writing extra commands on the order slip | `' OR 1=1 --` and `<script>alert(1)</script>` |
| **Insecure Design** | A restaurant with no locks | Rate limit? Business logic flaws? |
| **Misconfiguration** | Leaving the key in the lock | Default creds? Stack trace? |
| **Vulnerable Deps** | Using a lock that's been picked | `npm audit` |
| **Auth Failures** | An easy-to-pick lock | Brute force? Token expiry? |
