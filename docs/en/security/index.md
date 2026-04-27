# Security Testing

## The essence: Find the "holes" before the bad guys do

Imagine you are the security guard of a building. Security testing = you **try to break in yourself first** -- climbing fences, impersonating employees, trying unlocked doors -- to find vulnerabilities and patch them BEFORE a real thief does.

> **Security testing** = deliberately **attacking your own system** to find security vulnerabilities before hackers do.

## QA doesn't need to be a security expert

Security is **the WHOLE TEAM's responsibility**, not just the security team's. QA can catch **MANY common vulnerabilities** with just basic security checks:

```
Basic Security Checks (QA SHOULD do):
+-- SQL Injection          --> Enter ' OR 1=1 -- into a form
+-- XSS                    --> Enter <script>alert('xss')</script>
+-- Broken Access Control  --> Can User A see User B's data?
+-- Authentication bugs    --> Login without a password?
+-- Sensitive Data Exposure--> Password visible in API response?
+-- Input Validation       --> Upload an .exe file? Enter 1 million characters?

Advanced Security (Dedicated security team):
+-- Penetration Testing
+-- Network security
+-- Cryptography review
+-- Infrastructure security
```

::: tip Aha moment
You don't need to be a security expert. Just understanding the **OWASP Top 10** and knowing basic testing techniques already **increases your value** significantly. Most QA engineers only know functional testing -- adding security testing to your skillset = you stand out!
:::

## Section contents

| # | Topic | Description |
|---|---|---|
| 1 | [OWASP Top 10](./owasp-top-10) | The 10 most common vulnerabilities, how to test each one |
| 2 | [Security Testing Tools](./tools) | ZAP, Burp Suite, Snyk, SAST vs DAST |
