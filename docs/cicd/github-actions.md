# GitHub Actions

## Ban chat: GitHub cho ban MUON MAY TINH mien phi

Day la dieu quan trong nhat can hieu, va rat nhieu nguoi hieu sai:

> **GitHub Actions runner = mot MAY TINH THAT (virtual machine) ma GitHub CHO BAN MUON MIEN PHI.**

Khi ban push code len GitHub, day la nhung gi xay ra:

1. GitHub **khoi dong mot may tinh Ubuntu moi tinh** (hoac Windows/macOS)
2. May tinh do **download code cua ban** tu repository
3. May tinh do **cai dat moi thu** ban can (Node.js, browsers, packages...)
4. May tinh do **chay tests cua ban**
5. May tinh do **bao ket qua** (pass/fail)
6. GitHub **XOA may tinh do** -- bien mat hoan toan

::: tip Aha moment
Moi lan pipeline chay = mot may tinh HOAN TOAN MOI. Khong co gi con sot lai tu lan chay truoc. Giong nhu ban thue phong khach san -- check-in, o, check-out, phong duoc don sach cho nguoi tiep theo.
:::

**Chi phi:**
- **Public repos:** MIEN PHI khong gioi han
- **Private repos:** 2000 phut/thang mien phi (thua du cho hau het team)

---

## .yml files = "To huong dan" cho may tinh muon

File `.yml` (YAML) la **danh sach chi thi** ban viet cho may tinh cua GitHub. Giong nhu ban viet giay nho cho nguoi giup viec: "Buoc 1 lam cai nay, buoc 2 lam cai kia..."

### Vi tri file

```
project-cua-ban/
  .github/
    workflows/
      test.yml          <-- Chay tests khi push/PR
      regression.yml    <-- Full regression (hang dem/hang tuan)
      deploy.yml        <-- Deploy website
```

### Giai thich TUNG DONG -- Playwright Test Workflow

```yaml
# .github/workflows/test.yml
# ^^^ File nay nam trong thu muc .github/workflows/

name: Playwright Tests
# ^^^ Ten hien thi tren GitHub -- dat ten de nhin la biet lam gi

# === KHI NAO chay? ===
on:
  push:
    branches: [main, develop]
    # ^^^ Khi ai do PUSH code len branch main hoac develop --> chay
  pull_request:
    branches: [main]
    # ^^^ Khi ai do TAO PULL REQUEST vao main --> chay

# === LAM GI? ===
jobs:
  test:
    runs-on: ubuntu-latest
    # ^^^ "Cho toi muon may Ubuntu phien ban moi nhat"
    # (Day la luc GitHub khoi dong 1 may tinh moi cho ban)

    timeout-minutes: 30
    # ^^^ "Neu chay qua 30 phut thi dung lai" (phong truong hop treo)

    steps:
      # Buoc 1: Download code tu repo vao may tinh muon
      - uses: actions/checkout@v4
        # ^^^ "actions/checkout" la mot "cong cu co san" cua GitHub
        # No giong nhu: git clone <repo-cua-ban> tren may tinh muon

      # Buoc 2: Cai dat Node.js tren may tinh muon
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
        # ^^^ May tinh moi KHONG co Node.js --> phai cai
        # cache: 'npm' = luu cache de lan sau cai nhanh hon

      # Buoc 3: Cai dat dependencies (npm packages)
      - run: npm ci
        # ^^^ "npm ci" = cai dat DUNG CHINH XAC cac packages trong package-lock.json
        # Giong "npm install" nhung nhanh hon va chinh xac hon cho CI

      # Buoc 4: Cai dat browsers cho Playwright
      - run: npx playwright install --with-deps
        # ^^^ Playwright can Chromium, Firefox, WebKit de chay tests
        # --with-deps = cai luon system dependencies (font, libraries...)

      # Buoc 5: CHAY TESTS!
      - run: npx playwright test
        # ^^^ Day la dong quan trong nhat -- chay tat ca tests
        # Neu co test FAIL --> whole pipeline = FAIL

      # Buoc 6: Upload test report (de xem sau)
      - uses: actions/upload-artifact@v4
        if: always()
        # ^^^ "if: always()" = LUON upload, ke ca khi tests FAIL
        # (Khi tests fail moi can xem report nhat!)
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
          # ^^^ Giu report 30 ngay roi tu dong xoa

      # Buoc 7: Upload test results (screenshots, videos khi fail)
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 7
```

::: tip Aha moment
Moi dong `- run:` la mot lenh chay tren may tinh muon -- GIONG HET nhu ban go lenh do trong Terminal cua minh. `- uses:` la goi mot "cong cu co san" (action) ma nguoi khac da viet san.
:::

---

## Nightly Regression -- Chay tests hang dem

```yaml
# .github/workflows/regression.yml
name: Nightly Regression

on:
  schedule:
    - cron: '0 22 * * 1-5'
    # ^^^ Cron expression: "22:00 UTC, thu 2 den thu 6"
    # (= 5:00 sang gio Viet Nam -- chay xong truoc khi team bat dau lam)
    #
    # Cron format: phut gio ngay thang thu
    # 0 22 * * 1-5 = phut 0, gio 22, moi ngay, moi thang, thu 2-6

  workflow_dispatch: {}
    # ^^^ Them nut "Run workflow" tren GitHub de chay bang tay khi can

jobs:
  regression:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    # ^^^ Regression chay lau hon --> tang timeout len 60 phut

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps

      # Chi chay tests co tag @regression
      - run: npx playwright test --grep @regression
        env:
          BASE_URL: https://staging.example.com
          # ^^^ "env" = truyen bien moi truong (environment variable)
          # Code doc: process.env.BASE_URL

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: regression-report
          path: playwright-report/
```

---

## Sharding = Chia pizza cho nhieu nguoi an cung luc

Tuong tuong ban co 200 test cases. Chay tuan tu = **1 nguoi an ca cai pizza** --> 40 phut.

**Sharding** = **chia pizza thanh 4 mieng**, 4 nguoi an cung luc --> **10 phut!**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/4, 2/4, 3/4, 4/4]
        # ^^^ Tao 4 "may tinh muon" CUNG LUC
        # May 1: chay tests 1-50
        # May 2: chay tests 51-100
        # May 3: chay tests 101-150
        # May 4: chay tests 151-200
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shard }}
        # ^^^ ${{ matrix.shard }} = gia tri tu matrix (1/4, 2/4, 3/4, 4/4)
        # Playwright tu dong chia tests deu cho cac shards
```

::: tip Aha moment
Sharding = ban MUON 4 MAY TINH cung luc thay vi 1. GitHub cho phep chay **song song** -- nen tong thoi gian giam con 1/4. Day la ly do CI/CD chay tests NHANH hon chay tren may ban.
:::

### Multi-browser Testing -- Chay tren nhieu browser cung luc

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [chromium, firefox, webkit]
        # ^^^ 3 may tinh: 1 chay Chrome, 1 chay Firefox, 1 chay Safari
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

---

## Secrets = "Phong bi niem phong" chua mat khau

Code push len GitHub ai cung doc duoc. Vay mat khau, API keys de o dau?

**GitHub Secrets** = "phong bi niem phong". Ban bo mat khau vao, GitHub **niem kin**. Chi khi pipeline chay, GitHub moi **mo phong bi** va dua cho may tinh muon. Sau khi chay xong, may tinh bi xoa --> mat khau cung bien mat.

### Cach setup

```
GitHub repo --> Settings --> Secrets and variables --> Actions --> New repository secret

Name: TEST_USER_EMAIL
Value: qauser@company.com

Name: TEST_USER_PASSWORD
Value: SecureP@ss123!

Name: API_KEY
Value: sk-abc123xyz789
```

### Cach dung trong workflow

```yaml
steps:
  - run: npx playwright test
    env:
      # Doc secrets tu "phong bi niem phong" cua GitHub
      TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
      API_KEY: ${{ secrets.API_KEY }}
      # ^^^ ${{ secrets.TEN }} = lay gia tri tu GitHub Secrets
      # Gia tri nay KHONG BAO GIO hien thi trong logs (GitHub tu dong an)
```

```typescript
// Trong test code -- doc tu environment variable
// (Giong nhu doc tu "bien moi truong" cua may tinh)
const email = process.env.TEST_USER_EMAIL || 'default@test.com';
const password = process.env.TEST_USER_PASSWORD || 'DefaultPass@123';
```

::: warning
**TUYET DOI khong hardcode mat khau trong code!**
```typescript
// SAI -- mat khau lo ra cho moi nguoi thay
const password = 'RealP@ssw0rd!';

// DUNG -- doc tu environment variable
const password = process.env.TEST_USER_PASSWORD;
```
:::

---

## Tom tat chuong

| Concept | An du | Giai thich |
|---|---|---|
| **Runner** | May tinh cho muon | GitHub khoi dong VM moi, chay tests, roi xoa |
| **Workflow (.yml)** | To huong dan | File chi thi cho may tinh muon |
| **Trigger (on:)** | "Khi nao chay?" | push, pull_request, schedule, manual |
| **Steps** | Tung buoc mot | Moi step = 1 lenh hoac 1 action |
| **Matrix** | Nhan ban may tinh | Chay song song nhieu config |
| **Sharding** | Chia pizza | Chia tests ra nhieu may chay cung luc |
| **Artifacts** | File ket qua | Upload reports, screenshots de xem sau |
| **Secrets** | Phong bi niem phong | Luu mat khau an toan, chi mo khi chay |
