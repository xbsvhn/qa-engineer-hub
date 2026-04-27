# GitHub Actions

## Bản chất: GitHub cho bạn MƯỢN MÁY TÍNH miễn phí

Đây là điều quan trọng nhất cần hiểu, và rất nhiều người hiểu sai:

> **GitHub Actions runner = một MÁY TÍNH THẬT (virtual machine) mà GitHub CHO BẠN MƯỢN MIỄN PHÍ.**

Khi bạn push code lên GitHub, đây là những gì xảy ra:

1. GitHub **khởi động một máy tính Ubuntu mới tinh** (hoặc Windows/macOS)
2. Máy tính đó **download code của bạn** từ repository
3. Máy tính đó **cài đặt mọi thứ** bạn cần (Node.js, browsers, packages...)
4. Máy tính đó **chạy tests của bạn**
5. Máy tính đó **báo kết quả** (pass/fail)
6. GitHub **XÓA máy tính đó** -- biến mất hoàn toàn

::: tip Aha moment
Mỗi lần pipeline chạy = một máy tính HOÀN TOÀN MỚI. Không có gì còn sót lại từ lần chạy trước. Giống như bạn thuê phòng khách sạn -- check-in, ở, check-out, phòng được dọn sạch cho người tiếp theo.
:::

**Chi phí:**
- **Public repos:** MIỄN PHÍ không giới hạn
- **Private repos:** 2000 phút/tháng miễn phí (thừa đủ cho hầu hết team)

---

## .yml files = "Tờ hướng dẫn" cho máy tính mượn

File `.yml` (YAML) là **danh sách chỉ thị** bạn viết cho máy tính của GitHub. Giống như bạn viết giấy nhờ cho người giúp việc: "Bước 1 làm cái này, bước 2 làm cái kia..."

### Vị trí file

```
project-của-bạn/
  .github/
    workflows/
      test.yml          <-- Chạy tests khi push/PR
      regression.yml    <-- Full regression (hàng đêm/hàng tuần)
      deploy.yml        <-- Deploy website
```

### Giải thích TỪNG DÒNG -- Playwright Test Workflow

```yaml
# .github/workflows/test.yml
# ^^^ File này nằm trong thư mục .github/workflows/

name: Playwright Tests
# ^^^ Tên hiển thị trên GitHub -- đặt tên để nhìn là biết làm gì

# === KHI NÀO chạy? ===
on:
  push:
    branches: [main, develop]
    # ^^^ Khi ai đó PUSH code lên branch main hoặc develop --> chạy
  pull_request:
    branches: [main]
    # ^^^ Khi ai đó TẠO PULL REQUEST vào main --> chạy

# === LÀM GÌ? ===
jobs:
  test:
    runs-on: ubuntu-latest
    # ^^^ "Cho tôi mượn máy Ubuntu phiên bản mới nhất"
    # (Đây là lúc GitHub khởi động 1 máy tính mới cho bạn)

    timeout-minutes: 30
    # ^^^ "Nếu chạy quá 30 phút thì dừng lại" (phòng trường hợp treo)

    steps:
      # Bước 1: Download code từ repo vào máy tính mượn
      - uses: actions/checkout@v4
        # ^^^ "actions/checkout" là một "công cụ có sẵn" của GitHub
        # Nó giống như: git clone <repo-của-bạn> trên máy tính mượn

      # Bước 2: Cài đặt Node.js trên máy tính mượn
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
        # ^^^ Máy tính mới KHÔNG có Node.js --> phải cài
        # cache: 'npm' = lưu cache để lần sau cài nhanh hơn

      # Bước 3: Cài đặt dependencies (npm packages)
      - run: npm ci
        # ^^^ "npm ci" = cài đặt ĐÚNG CHÍNH XÁC các packages trong package-lock.json
        # Giống "npm install" nhưng nhanh hơn và chính xác hơn cho CI

      # Bước 4: Cài đặt browsers cho Playwright
      - run: npx playwright install --with-deps
        # ^^^ Playwright cần Chromium, Firefox, WebKit để chạy tests
        # --with-deps = cài luôn system dependencies (font, libraries...)

      # Bước 5: CHẠY TESTS!
      - run: npx playwright test
        # ^^^ Đây là dòng quan trọng nhất -- chạy tất cả tests
        # Nếu có test FAIL --> whole pipeline = FAIL

      # Bước 6: Upload test report (để xem sau)
      - uses: actions/upload-artifact@v4
        if: always()
        # ^^^ "if: always()" = LUÔN upload, kể cả khi tests FAIL
        # (Khi tests fail mới cần xem report nhất!)
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
          # ^^^ Giữ report 30 ngày rồi tự động xóa

      # Bước 7: Upload test results (screenshots, videos khi fail)
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 7
```

::: tip Aha moment
Mỗi dòng `- run:` là một lệnh chạy trên máy tính mượn -- GIỐNG HỆT như bạn gõ lệnh đó trong Terminal của mình. `- uses:` là gọi một "công cụ có sẵn" (action) mà người khác đã viết sẵn.
:::

---

## Nightly Regression -- Chạy tests hàng đêm

```yaml
# .github/workflows/regression.yml
name: Nightly Regression

on:
  schedule:
    - cron: '0 22 * * 1-5'
    # ^^^ Cron expression: "22:00 UTC, thứ 2 đến thứ 6"
    # (= 5:00 sáng giờ Việt Nam -- chạy xong trước khi team bắt đầu làm)
    #
    # Cron format: phút giờ ngày tháng thứ
    # 0 22 * * 1-5 = phút 0, giờ 22, mọi ngày, mọi tháng, thứ 2-6

  workflow_dispatch: {}
    # ^^^ Thêm nút "Run workflow" trên GitHub để chạy bằng tay khi cần

jobs:
  regression:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    # ^^^ Regression chạy lâu hơn --> tăng timeout lên 60 phút

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps

      # Chỉ chạy tests có tag @regression
      - run: npx playwright test --grep @regression
        env:
          BASE_URL: https://staging.example.com
          # ^^^ "env" = truyền biến môi trường (environment variable)
          # Code đọc: process.env.BASE_URL

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: regression-report
          path: playwright-report/
```

---

## Sharding = Chia pizza cho nhiều người ăn cùng lúc

Tưởng tượng bạn có 200 test cases. Chạy tuần tự = **1 người ăn cả cái pizza** --> 40 phút.

**Sharding** = **chia pizza thành 4 miếng**, 4 người ăn cùng lúc --> **10 phút!**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/4, 2/4, 3/4, 4/4]
        # ^^^ Tạo 4 "máy tính mượn" CÙNG LÚC
        # Máy 1: chạy tests 1-50
        # Máy 2: chạy tests 51-100
        # Máy 3: chạy tests 101-150
        # Máy 4: chạy tests 151-200
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shard }}
        # ^^^ ${{ matrix.shard }} = giá trị từ matrix (1/4, 2/4, 3/4, 4/4)
        # Playwright tự động chia tests đều cho các shards
```

::: tip Aha moment
Sharding = bạn MƯỢN 4 MÁY TÍNH cùng lúc thay vì 1. GitHub cho phép chạy **song song** -- nên tổng thời gian giảm còn 1/4. Đây là lý do CI/CD chạy tests NHANH hơn chạy trên máy bạn.
:::

### Multi-browser Testing -- Chạy trên nhiều browser cùng lúc

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [chromium, firefox, webkit]
        # ^^^ 3 máy tính: 1 chạy Chrome, 1 chạy Firefox, 1 chạy Safari
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

## Secrets = "Phong bì niêm phong" chứa mật khẩu

Code push lên GitHub ai cũng đọc được. Vậy mật khẩu, API keys để ở đâu?

**GitHub Secrets** = "phong bì niêm phong". Bạn bỏ mật khẩu vào, GitHub **niêm kín**. Chỉ khi pipeline chạy, GitHub mới **mở phong bì** và đưa cho máy tính mượn. Sau khi chạy xong, máy tính bị xóa --> mật khẩu cũng biến mất.

### Cách setup

```
GitHub repo --> Settings --> Secrets and variables --> Actions --> New repository secret

Name: TEST_USER_EMAIL
Value: qauser@company.com

Name: TEST_USER_PASSWORD
Value: SecureP@ss123!

Name: API_KEY
Value: sk-abc123xyz789
```

### Cách dùng trong workflow

```yaml
steps:
  - run: npx playwright test
    env:
      # Đọc secrets từ "phong bì niêm phong" của GitHub
      TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
      API_KEY: ${{ secrets.API_KEY }}
      # ^^^ ${{ secrets.TEN }} = lấy giá trị từ GitHub Secrets
      # Giá trị này KHÔNG BAO GIỜ hiển thị trong logs (GitHub tự động ẩn)
```

```typescript
// Trong test code -- đọc từ environment variable
// (Giống như đọc từ "biến môi trường" của máy tính)
const email = process.env.TEST_USER_EMAIL || 'default@test.com';
const password = process.env.TEST_USER_PASSWORD || 'DefaultPass@123';
```

::: warning
**TUYỆT ĐỐI không hardcode mật khẩu trong code!**
```typescript
// SAI -- mật khẩu lộ ra cho mọi người thấy
const password = 'RealP@ssw0rd!';

// ĐÚNG -- đọc từ environment variable
const password = process.env.TEST_USER_PASSWORD;
```
:::

---

## Sai lầm thường gặp

❌ **Không cache dependencies — mỗi lần chạy đều `npm install` từ đầu**
→ ✅ Dùng `cache: 'npm'` trong `actions/setup-node` hoặc `actions/cache`
→ 💡 Không cache = mỗi pipeline mất thêm 2-5 phút cài packages. Cache = giảm còn 10-30 giây. Nhân 20 lần chạy/ngày = tiết kiệm hàng giờ

❌ **Chạy ALL tests trên mọi push — kể cả thay đổi README**
→ ✅ Dùng `paths` filter để chỉ trigger khi code thay đổi, hoặc dùng `@smoke` tag cho push, `@regression` cho nightly
→ 💡 Push sửa docs mà phải đợi 30 phút chạy full regression = waste resources. Filter thông minh = feedback nhanh hơn

❌ **Hardcode secrets (password, API key) trong code hoặc file .yml**
→ ✅ Dùng **GitHub Secrets** (Settings → Secrets → Actions), đọc bằng cú pháp `$\{\{ secrets.TEN_BIEN \}\}`
→ 💡 Code trên GitHub ai cũng đọc được (nhất là public repo). Hardcode password = lộ cho toàn thế giới

❌ **Không upload artifacts — test fail mà không có report/screenshot để debug**
→ ✅ Luôn dùng `actions/upload-artifact` với `if: always()` để upload report + screenshots
→ 💡 `if: always()` = upload KỂ CẢ khi test fail. Không có artifacts = test fail nhưng không ai biết fail ở đâu → mất thời gian reproduce lại trên local

---

## Tóm tắt chương

| Concept | Ẩn dụ | Giải thích |
|---|---|---|
| **Runner** | Máy tính cho mượn | GitHub khởi động VM mới, chạy tests, rồi xóa |
| **Workflow (.yml)** | Tờ hướng dẫn | File chỉ thị cho máy tính mượn |
| **Trigger (on:)** | "Khi nào chạy?" | push, pull_request, schedule, manual |
| **Steps** | Từng bước một | Mỗi step = 1 lệnh hoặc 1 action |
| **Matrix** | Nhân bản máy tính | Chạy song song nhiều config |
| **Sharding** | Chia pizza | Chia tests ra nhiều máy chạy cùng lúc |
| **Artifacts** | File kết quả | Upload reports, screenshots để xem sau |
| **Secrets** | Phong bì niêm phong | Lưu mật khẩu an toàn, chỉ mở khi chạy |
