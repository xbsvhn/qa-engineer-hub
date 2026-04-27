# Performance Testing

## The Essence: Measuring the "Health" of a System

Imagine you are opening a restaurant. Functional testing = checking whether **the food tastes good** (correct functionality). Performance testing = checking **how many customers the restaurant can serve at the same time** while maintaining quality.

- App takes **3 seconds** to load instead of 0.5 seconds? **53% of users will leave** (Google research)
- Amazon: every **100ms of extra latency** = **1% revenue loss**
- Performance bugs are **harder to find** than functional bugs -- they require systematic measurement

## Types of Performance Testing -- Overview

```
Load Testing      --> Can the restaurant serve 200 customers at the same time?
Stress Testing    --> At what point does the restaurant "break"? 500 customers? 1000?
Spike Testing     --> What happens when 10 customers suddenly jump to 500?
Endurance Testing --> Can the restaurant serve 200 customers CONTINUOUSLY for 24 hours?
```

## Contents of This Section

| # | Topic | Description |
|---|---|---|
| 1 | [Performance Concepts](./concepts) | Metrics (P90/P95/P99), test types, result analysis |
| 2 | [JMeter](./jmeter) | Popular GUI tool, Thread Groups, Reports |
| 3 | [K6](./k6) | Modern tool written in JavaScript, CI/CD integration |

## When Does QA Need Performance Testing?

| Situation | Action |
|---|---|
| Before a major release | Load test with the expected number of users |
| After changing the database/API | Verify it is not slower than before |
| Users complain "the app is slow" | Find the bottleneck |
| Preparing for an event (sale, campaign) | Stress test with peak load |
