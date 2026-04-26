# GitHub Actions

## GitHub Actions là gì? (WHAT)

GitHub Actions là CI/CD platform **tích hợp sẵn trong GitHub**. Mỗi khi push code, tạo PR, hoặc theo schedule → tự động chạy workflow (build, test, deploy).

### Tại sao QA cần biết? (WHY)

- **Automation tests chạy tự động** — mỗi PR đều trigger test suite
- **Gate deployment** — tests fail → deploy bị block
- **Test reports tự động** — không cần chạy manual
- **Miễn phí** cho public repos, 2000 phút/tháng cho private repos

---

## Workflow cơ bản

### File structure

```
.github/
└── workflows/
    ├── test.yml          ← Chạy tests khi push/PR
    ├── regression.yml    ← Full regression (nightly/weekly)
    └── deploy.yml        ← Deploy website
```

### Playwright Test Workflow

```yaml
# .github/workflows/test.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      # 1. Checkout code
      - uses: actions/checkout@v4

      # 2. Setup Node.js
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # 3. Install dependencies
      - run: npm ci

      # 4. Install Playwright browsers
      - run: npx playwright install --with-deps

      # 5. Run tests
      - run: npx playwright test

      # 6. Upload test report (luôn upload, kể cả khi fail)
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      # 7. Upload test results
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 7
```

### Nightly Regression

```yaml
# .github/workflows/regression.yml
name: Nightly Regression

on:
  schedule:
    - cron: '0 22 * * 1-5'  # 22:00 UTC, Mon-Fri (5AM Vietnam)
  workflow_dispatch:          # Cho phép trigger manual

jobs:
  regression:
    runs-on: ubuntu-latest
    timeout-minutes: 60

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps

      # Chạy full regression suite
      - run: npx playwright test --grep @regression
        env:
          BASE_URL: https://staging.example.com

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: regression-report
          path: playwright-report/
```

---

## Advanced Patterns

### Multi-browser Testing

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --project=${{ matrix.project }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: report-${{ matrix.project }}
          path: playwright-report/
```

### Sharding — Chạy test song song

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/4, 2/4, 3/4, 4/4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shard }}
```

→ 200 tests chia 4 shards → mỗi shard chạy 50 tests song song → **nhanh gấp 4 lần**.

### Secrets — Quản lý credentials

```yaml
# Không bao giờ hardcode credentials trong code!
# Dùng GitHub Secrets (Settings → Secrets → Actions)

steps:
  - run: npx playwright test
    env:
      TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
      API_KEY: ${{ secrets.API_KEY }}
```

```typescript
// Trong test code — đọc từ environment
const email = process.env.TEST_USER_EMAIL || 'default@test.com';
const password = process.env.TEST_USER_PASSWORD || 'DefaultPass@123';
```

---

## Tóm tắt chương

| Concept | Mục đích |
|---|---|
| **Workflow file** | `.github/workflows/*.yml` — define CI/CD |
| **Triggers** | push, pull_request, schedule, manual |
| **Matrix** | Multi-browser, multi-OS testing |
| **Sharding** | Chia tests chạy song song → nhanh hơn |
| **Artifacts** | Upload test reports, screenshots |
| **Secrets** | Quản lý credentials an toàn |
