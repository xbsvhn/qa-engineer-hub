# JMeter

## The Essence: JMeter = "Simulating a Crowd" Accessing Your App

Imagine you want to know how many customers your restaurant can serve. You **cannot** invite 1000 real people to show up -- but you can **simulate** 1000 people using JMeter.

> **Apache JMeter** = a tool that creates **hundreds or thousands of "virtual users"** sending requests to your server simultaneously, then measures whether the server can handle it.

### JMeter vs K6 -- Which One to Choose?

| Situation | JMeter | K6 |
|---|---|---|
| Team **does not know how to code** | Drag-and-drop GUI | Requires writing JavaScript |
| Need a **visual interface** | Has GUI | No GUI |
| Testing **JDBC, FTP, SOAP** | Supports many protocols | Mainly HTTP/REST |
| New project, **modern stack** | OK but dated | Better fit |
| **CI/CD** integration | Needs extra configuration | Native support |

---

## Installation

```bash
# Requirement: Java 8 or later (JMeter runs on Java)
java -version

# Download: https://jmeter.apache.org/download_jmeter.cgi
# Extract and run:
cd apache-jmeter-5.x/bin
./jmeter.sh     # macOS/Linux
jmeter.bat      # Windows
# --> The JMeter GUI window will open
```

---

## Key Components -- Explained with Analogies

### Test Plan Structure

```
Test Plan                        (= "The overall test plan")
+-- Thread Group                 (= "The crowd" -- 100 virtual users)
|   +-- HTTP Request             (= Each person sends 1 request to the server)
|   +-- HTTP Header Manager      (= Attach headers: Content-Type, Auth token)
|   +-- CSV Data Set Config      (= Read test data from a CSV file)
|   +-- Response Assertion       (= Verify the response is correct)
|   +-- View Results Tree        (= View each response in detail -- FOR DEBUG ONLY)
+-- Summary Report               (= Overall summary report)
+-- Aggregate Report             (= Report with P90, P95, P99)
```

### Thread Group = "The Crowd of Virtual Users"

A "Thread" in JMeter = 1 virtual user. A "Thread Group" = a group of virtual users.

```
Thread Group Settings:
- Number of Threads: 100        <-- 100 virtual users
- Ramp-up Period: 60 seconds    <-- Increase GRADUALLY over 60 seconds (not all 100 at once)
- Loop Count: 10                <-- Each user sends 10 iterations
- Duration: 300 seconds         <-- Or run for 5 minutes

Timeline (with 100 threads, ramp-up 60s):
Second 0:   0 users
Second 6:  10 users
Second 12: 20 users
...
Second 60: 100 users (full load)
--> Hold 100 users until the duration ends
```

::: tip Aha moment
**Ramp-up** is very important! If you set ramp-up = 0 (all 100 users at once), it is like 100 people rushing through the restaurant door AT THE SAME TIME -- unrealistic. Real users arrive **GRADUALLY** -- so ramp-up should be 1-5 minutes.
:::

### HTTP Request = "What does each person send?"

```
Protocol: https
Server: api.example.com
Port: 443
Method: POST
Path: /api/auth/login
Body: {"email":"user${__threadNum}@test.com","password":"Pass@123"}
       ^^^ ${__threadNum} = the thread number (1, 2, 3...)
           --> Each user uses a different email
```

### Assertions = "Is the response correct?"

| Assertion | What it checks | Example |
|---|---|---|
| **Response Assertion** | Status code, body text | Status = 200, body contains "success" |
| **Duration Assertion** | Response time | < 2000ms |
| **Size Assertion** | Response size | < 1MB |
| **JSON Assertion** | Value in JSON | `$.data.length` > 0 |

---

## Practical Example: Load Test a Login API

### Scenario

```
Objective: 100 users logging in simultaneously
Duration: 5 minutes
Target: Response time < 2s, Error rate < 1%
```

### Setup in JMeter

```
1. Create a Thread Group:
   - Threads: 100           (100 virtual users)
   - Ramp-up: 60s           (increase gradually over 1 minute)
   - Duration: 300s          (run for 5 minutes)

2. Add an HTTP Request:
   - POST https://api.example.com/auth/login
   - Body: {"email":"user${__threadNum}@test.com","password":"Pass@123"}

3. Add an HTTP Header Manager:
   - Content-Type: application/json

4. Add a Response Assertion:
   - Response code: 200

5. Add a Duration Assertion:
   - Max duration: 2000ms

6. Add Listeners (to view results):
   - Summary Report      (overview)
   - Aggregate Report    (P90, P95, P99)
   - View Results Tree   (debug only -- DISABLE when running real load tests!)
```

### Reading Results

```
Aggregate Report:
+──────────+─────────+────────+────────+────────+────────+───────+
| Label    | Samples | Avg(ms)| P90(ms)| P95(ms)| P99(ms)| Error%|
+──────────+─────────+────────+────────+────────+────────+───────+
| Login    | 10,000  | 450    | 890    | 1,200  | 2,800  | 0.5%  |
+──────────+─────────+────────+────────+────────+────────+───────+

Analysis:
- Avg 450ms -- good
- P90 890ms -- good
- P95 1.2s  -- OK, below the 2s target
- P99 2.8s  -- EXCEEDS the 2s target for 1% of users --> needs investigation
- Error 0.5% -- below the 1% target --> OK

Recommendation: Investigate the P99 spike -- likely caused by a slow database query
when many users log in simultaneously --> optimize the query or add an index.
```

---

## Best Practices

### 1. Do NOT use GUI mode when running real load tests

```bash
# GUI is only for DESIGNING and DEBUGGING tests
# When running real load tests --> use CLI (non-GUI mode):
jmeter -n -t test-plan.jmx -l results.jtl -e -o report/

# Explanation:
# -n          = non-GUI mode (lighter, faster)
# -t          = test plan file (.jmx)
# -l          = file to save results
# -e -o       = generate HTML report
```

::: warning
Running load tests in GUI mode will **consume a lot of RAM** on your machine --> inaccurate results (your machine is slow, not the server). ALWAYS use CLI mode for real load tests.
:::

### 2. Think Time -- Simulating REAL Users

```
Real users do NOT click non-stop without pausing.
They read the page, think, then click again.

Add a "Constant Timer" or "Gaussian Random Timer" between requests:
- Min: 1000ms (1 second)
- Max: 5000ms (5 seconds)

No think time = simulating robots, not real users.
```

### 3. Test data must be diverse

```
WRONG: 100 users all logging in with email "test@test.com"
       --> Server caches the result, performance looks falsely good

RIGHT: 100 users using 100 different emails (from a CSV file)
       --> More realistic simulation
```

---

## Chapter Summary

| Component | Analogy | Purpose |
|---|---|---|
| **Thread Group** | The crowd | Configure number of users, ramp-up, duration |
| **HTTP Request** | What each person sends | Request to the server |
| **Assertions** | Checking the order | Verify response is correct and fast |
| **Listeners** | Reports | View results: Summary, Aggregate, Graph |
| **CLI mode** | The real deal | Real load tests must use CLI, not GUI |
| **Think Time** | Real people pause between clicks | Realistic simulation |
