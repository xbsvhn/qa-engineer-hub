# Performance Concepts

## Why Does Performance Testing Matter?

An app that **works correctly** but **runs SLOWLY** = a **broken** app in the eyes of users.

- **53% of users** leave a page if it takes > 3 seconds to load (Google research)
- **Amazon**: every 100ms of delay = 1% revenue loss
- **Performance bugs** are harder to find than functional bugs -- the app "works correctly" but gradually slows down as more users come in

::: tip Aha moment
Functional testing asks: "Does the app DO THE RIGHT THING?" Performance testing asks: "Does the app do the right thing FAST ENOUGH when 1000 users are using it at the same time?" -- two completely different questions.
:::

---

## Metrics = The "Vital Signs" of a System

### Response Time -- How Long Until a Reply

```
Client sends request ────────────────────> Server processes ──> Client receives response
|<──────────────── Response Time ──────────────────────────────────>|
```

Imagine ordering food at a restaurant. Response time = the time from when you place your order until the food arrives at your table.

### P90/P95/P99 -- Explained with a Real Example

**Example:** 100 people order food at a restaurant.

| Metric | Meaning | Example | Common Target |
|---|---|---|---|
| **Average** | The mean | On average, each person waits 5 minutes | For reference only, NOT for evaluation |
| **P50 (Median)** | 50 people receive their food within... | 3 minutes | < 1 second |
| **P90** | 90 people receive their food within... | 8 minutes | < 3 seconds |
| **P95** | 95 people receive their food within... | 12 minutes | < 5 seconds |
| **P99** | 99 people receive their food within... | 25 minutes (1 unlucky person) | < 10 seconds |

::: warning Do not rely on Average alone -- it is a classic "trap"!
```
4 requests: 1ms, 1ms, 1ms, 10,000ms
Average = (1 + 1 + 1 + 10,000) / 4 = 2,500ms --> "looks OK"
BUT P99 = 10,000ms --> 1% of users wait 10 SECONDS!
```
Average hides the worst cases. **ALWAYS report P90/P95** instead of just Average.
:::

::: tip Aha moment
When your lead asks "Is performance OK?", do not answer "Average is 500ms." Instead, say "P95 is 1.2 seconds, meaning 95% of requests are faster than 1.2s, and only 5% are slower." -- that is the information with real value.
:::

### Throughput = Processing Capacity

| Metric | Meaning |
|---|---|
| **RPS** (Requests per second) | Number of requests the server can handle per second |
| **TPS** (Transactions per second) | Number of transactions completed per second |

Think of it as how many dishes a restaurant can serve per minute. Higher RPS = a more efficient restaurant.

### Error Rate = Failure Rate

```
Error Rate = (Number of failed requests / Total requests) x 100%

Target: < 1% under normal load
        < 5% under stress test
```

Think of it as the rate of incorrect orders in a restaurant. 1% is acceptable. 10% = the restaurant has a serious problem.

### Resource Utilization = Server "Health"

| Resource | Metric | Alert When |
|---|---|---|
| **CPU** | % usage | > 80% sustained |
| **Memory** | % usage, is it growing continuously? | > 85% or steadily increasing |
| **Disk I/O** | Read/write speed | Bottleneck |
| **Network** | Bandwidth | Saturated |

---

## Types of Performance Testing -- In Detail

### 1. Load Testing = "Can the restaurant serve 200 customers?"

**Purpose:** Verify the system works well with the **EXPECTED number of users** (not exceeding its limits).

```
Users
  |
200+────────────────────────────────
  |                              (hold 200 users for 30 minutes)
  |           /──────────────────
  |         /
  |       /    (ramp up over 5 minutes -- gradually increase from 0 to 200)
  |     /
  |   /
  0+─/─────────────────────────────> Time
   0    5min              35min
```

**When to use:** Before a release, to verify the SLA (Service Level Agreement -- the commitment on performance).

### 2. Stress Testing = "At what point does the restaurant BREAK?"

**Purpose:** Find the **breaking point** -- how many users the system can handle before it "dies."

```
Users
  |
500+ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  <-- Breaking point (error > 5%)
  |                       /
400+──────────────────── /
  |                    /
300+──────────────── /
  |                /
200+──────────── /
  |            /
100+──────── /
  |        /
  0+─────/────────────────────────> Time
        (increase gradually until it "breaks")
```

**When to use:** To know the capacity limit and plan for growth. "The current system handles 500 users. Next year we need 800 --> we need to scale up."

### 3. Spike Testing = "Suddenly going from 10 customers to 500"

**Purpose:** How does the system react when load **increases SUDDENLY** (flash sale, viral post, event)?

```
Users
  |
1000+──────+
  |        |    +──────+
  |        |    |      |
  |        |    |      |
 100+──────+────+──────+──────
  |
  0+──────────────────────────> Time
      Spike  Normal  Spike
```

**Verify:** Does the system **recover** after a spike? Is any data lost? What is the error rate?

Think of a restaurant that normally serves 10 customers, when suddenly 500 people show up (a celebrity reviewed it on TikTok). Can the restaurant cope? Or is it chaos?

### 4. Endurance Testing = "Serving 200 customers CONTINUOUSLY for 24 hours"

**Purpose:** Find **memory leaks** and **degradation** over extended periods.

```
Users
  |
200+──────────────────────────────── (200 users continuously for 24 hours)
  |
  0+──────────────────────────────> Time
   0                              24h
```

**Verify:** Does response time **increase gradually** over time? Does memory **leak** (keep growing without decreasing)? Do database connections keep growing?

::: tip Aha moment
Memory leak = a dripping faucet. The drip is very small -- you do not notice it. But leave it for 24 hours, and the floor is flooded. Endurance testing helps you find these "dripping faucets."
:::

---

## Bottleneck = The "Chokepoint" That Slows Down the System

A **bottleneck** is like a **traffic jam** on a highway. Even if the highway has 6 lanes, if there is one point where it narrows to 2 lanes --> ALL cars must squeeze through those 2 lanes --> everything slows down.

### Common Bottlenecks

| Bottleneck | Symptoms | Solution |
|---|---|---|
| **Slow DB queries** | High response time, high database CPU | Optimize queries, add indexes |
| **Memory leak** | Memory gradually increases, eventually crashes | Fix code, increase memory |
| **Connection pool** | Timeout errors, "connection refused" | Increase pool size |
| **Blocking I/O** | Low throughput, high wait time | Async processing, caching |
| **Bandwidth** | Slow downloads, timeouts | CDN, compression, lazy loading |

---

## Performance Testing Process -- 6 Steps

```
1. Define Requirements
   "Response time < 2s, support 1000 concurrent users, error rate < 1%"

2. Plan Tests
   Choose a tool (K6/JMeter), design scenarios, prepare test data

3. Create Scripts
   Write test scripts, configure load patterns

4. Execute Tests
   Run tests WHILE SIMULTANEOUSLY monitoring resources (CPU, Memory, DB)

5. Analyze Results
   Compare against requirements, find bottlenecks

6. Report & Re-test
   Report findings, collaborate with devs to fix, re-run to verify
```

---

## Reading Results -- A Practical Example

### Load Test Results

```
Scenario: 200 concurrent users, 30 minutes
Target: Response time < 2s, Error rate < 1%

Results:
+────────────────+──────────+────────+
| Metric         | Result   | Status |
+────────────────+──────────+────────+
| Avg Response   | 850ms    | OK     |
| P90 Response   | 1,200ms  | OK     |
| P95 Response   | 1,800ms  | OK     |
| P99 Response   | 4,500ms  | FAIL   |
| Throughput     | 150 RPS  | OK     |
| Error Rate     | 0.3%     | OK     |
| CPU Usage      | 72%      | WARN   |
+────────────────+──────────+────────+

Analysis:
- P99 = 4.5s --> 1% of users experience SLOW response (exceeds 2s target)
- CPU 72% --> close to the 80% alert threshold, little room for growth
- Recommendation: Optimize slow queries (root cause of high P99)
```

::: tip Aha moment
When reporting a performance test, DO NOT just list numbers. Answer the question: "So did it PASS?" and "If it FAILED, WHY and what needs to be done?" -- that is the value a QA engineer brings.
:::

---

## Common Mistakes

❌ **Evaluating performance based solely on Average response time**
→ ✅ Always report **P90/P95/P99** — Average hides the worst cases
→ 💡 4 requests: 1ms, 1ms, 1ms, 10,000ms → Average = 2,500ms "looks OK", but P99 = 10s. 1% of users wait 10 seconds!

❌ **Testing performance on the Dev environment instead of Staging**
→ ✅ Test on **Staging** — the environment most similar to Production (same config, same data volume)
→ 💡 Dev environments typically have less data and different hardware than Production → results do not reflect reality

❌ **Not using think time in load tests — firing requests non-stop**
→ ✅ Add **think time** (1-5 seconds between requests) to simulate real users
→ 💡 Real users read the page, think, then click. No think time = simulating robots, not users → results are misleading

❌ **Running load tests from the same network as the server (same data center)**
→ ✅ Run from a **different machine/cloud network** than the server, or use distributed load generators
→ 💡 Same network = near-zero latency, which does not reflect the experience of real users (who are remote, going through the internet)

❌ **Running once and drawing conclusions — without re-running to verify**
→ ✅ Run at least **2-3 times** to confirm stable results and eliminate noise
→ 💡 A single run can be affected by background processes, GC, network spikes. Multiple runs → more reliable results

---

## Multiple Perspectives

**Team A:** "Test performance **every sprint**" — integrate into CI/CD, run automated performance tests on every build. Suitable for SaaS products, e-commerce, real-time apps where performance is a core feature.

**Team B:** "Test performance **before major releases**" — run full load/stress tests 1-2 times per quarter. Suitable for internal tools, B2B apps with few users, or small teams without enough resources for continuous performance testing.

**Both approaches are valid.** A product with millions of users needs frequent testing because even a small regression has a large impact. A product with 50 internal users only needs testing when there are major changes to architecture or data volume.

---

## Chapter Summary

| Concept | Analogy | Key Point |
|---|---|---|
| **Response Time** | Time waiting for your food | Use P90/P95, NOT just Average |
| **Throughput** | Dishes served per minute | Higher RPS is better |
| **Error Rate** | Rate of incorrect orders | < 1% normal, < 5% stress |
| **Load Test** | 200 customers as usual | Verify system handles expected load |
| **Stress Test** | Add customers until it "breaks" | Find the breaking point |
| **Spike Test** | 500 customers suddenly show up | Test sudden load surges |
| **Endurance** | 200 customers continuously for 24h | Find memory leaks |
| **Bottleneck** | Traffic jam on the highway | Find and fix the slowest point |
