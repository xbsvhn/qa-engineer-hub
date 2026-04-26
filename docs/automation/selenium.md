# Selenium — Hiểu "Ông Tổ" Để Trân Trọng Playwright

## Bản chất: Selenium là "người trung gian" (THE MIDDLEMAN)

Trước khi nói về syntax hay commands, bạn cần hiểu **kiến trúc** — vì đây chính là lý do Selenium chậm hơn và phức tạp hơn Playwright.

### Analogy: Gọi nhà hàng đặt đồ ăn

Imagine bạn gọi nhà hàng để order đồ ăn, nhưng bạn **không được nói chuyện trực tiếp với đầu bếp**. Bạn phải nói với lễ tân, lễ tân nói với quản lý, quản lý mới nói với đầu bếp. Mỗi lần muốn thay đổi món — lại đi qua cả chuỗi đó.

**Đó chính là Selenium.**

```
Selenium — Con đường vòng:

  Test Code (bạn)
       │
       ▼
  WebDriver Protocol (HTTP requests)   ← "lễ tân"
       │
       ▼
  ChromeDriver / GeckoDriver           ← "quản lý"
       │
       ▼
  Browser (Chrome / Firefox)            ← "đầu bếp"

  Mỗi lệnh click(), type(), getText() = 1 HTTP request đi qua cả chuỗi.
  100 lệnh = 100 HTTP round-trips. Chậm dần đều.
```

```
Playwright — Nói chuyện trực tiếp:

  Test Code (bạn)
       │
       ▼
  CDP / Browser Protocol (WebSocket)    ← kết nối trực tiếp, luôn mở
       │
       ▼
  Browser (Chrome / Firefox / WebKit)

  WebSocket connection mở liên tục — không cần "gọi điện" từng lần.
  Nhanh hơn đáng kể.
```

**Key insight:** Selenium dùng HTTP protocol (stateless, mỗi command là 1 request riêng). Playwright dùng WebSocket (persistent connection, gửi nhận liên tục). Sự khác biệt này quyết định tốc độ.

---

## Selenium Components — 3 phần chính

| Component | Vai trò | Analogy |
|---|---|---|
| **WebDriver** | API để code điều khiển browser | Remote control TV |
| **Selenium IDE** | Browser extension record & playback | Camera ghi lại thao tác |
| **Selenium Grid** | Chạy test song song trên nhiều máy | Chuỗi nhà hàng cùng nấu 1 thực đơn |

Khi nói "Selenium" người ta thường chỉ **WebDriver** — phần bạn sẽ dùng hàng ngày.

---

## Vấn đề LỚN NHẤT: Selenium KHÔNG tự đợi

Đây là **pain point số 1**, là lý do QA Engineers thở dài khi maintain Selenium tests.

### Vấn đề thực tế

Khi bạn click một button, trang web cần thời gian để load. Con người tự biết "chờ trang load xong rồi mới click tiếp". Nhưng Selenium thì **không biết**. Nó thực thi lệnh tiếp theo ngay lập tức, bất kể trang đã load xong hay chưa.

### Selenium: Phải tự viết wait ở khắp nơi

```typescript
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function loginTest() {
  const driver: WebDriver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    await driver.get('https://example.com/login');

    // Đợi form xuất hiện
    await driver.wait(
      until.elementLocated(By.id('email')),
      10000,
      'Email field không xuất hiện sau 10 giây'
    );

    await driver.findElement(By.id('email')).sendKeys('test@mail.com');
    await driver.findElement(By.id('password')).sendKeys('Pass@123');
    await driver.findElement(By.css('button.login-btn')).click();

    // Đợi URL thay đổi
    await driver.wait(
      until.urlContains('/dashboard'),
      10000,
      'Không redirect tới dashboard sau 10 giây'
    );

    // Đợi welcome message xuất hiện
    await driver.wait(
      until.elementLocated(By.css('.welcome-msg')),
      5000
    );

    // Verify
    const welcomeText = await driver
      .findElement(By.css('.welcome-msg'))
      .getText();
    console.assert(welcomeText.includes('Welcome'));

  } finally {
    // PHẢI tự đóng browser — quên là leak memory
    await driver.quit();
  }
}
```

### Playwright: Auto-wait built-in, code sạch hơn rõ rệt

```typescript
import { test, expect } from '@playwright/test';

test('login successfully', async ({ page }) => {
  await page.goto('/login');

  // Playwright TỰ ĐỢI element xuất hiện rồi mới type
  await page.fill('#email', 'test@mail.com');
  await page.fill('#password', 'Pass@123');
  await page.click('button.login-btn');

  // TỰ ĐỢI URL thay đổi, TỰ RETRY assertion
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('.welcome-msg')).toContainText('Welcome');

  // Không cần đóng browser — Playwright tự dọn dẹp
});
```

**Đếm dòng code:** Selenium ~30 dòng, Playwright ~10 dòng. Cùng một logic. Nhân lên 500 test cases — khác biệt rất lớn.

---

## Ba loại Wait trong Selenium

Hiểu để biết tại sao auto-wait của Playwright là game changer.

### 1. Implicit Wait — "Đợi chung cho tất cả"

```typescript
// Set 1 lần, áp dụng cho MỌI findElement
await driver.manage().setTimeouts({ implicit: 10000 });

// Vấn đề: element không tồn tại → đợi ĐỦ 10 giây mới fail
// Test suite 200 cases → chậm kinh khủng khi có failure
```

### 2. Explicit Wait — "Đợi cụ thể từng chỗ" (recommended)

```typescript
import { until } from 'selenium-webdriver';

// Đợi element xuất hiện
await driver.wait(until.elementLocated(By.id('result')), 10000);

// Đợi element visible (có thể located nhưng hidden)
const el = await driver.findElement(By.id('modal'));
await driver.wait(until.elementIsVisible(el), 5000);

// Đợi text thay đổi
await driver.wait(until.elementTextContains(el, 'Success'), 5000);
```

### 3. Thread.sleep — "Cấm dùng nhưng ai cũng từng dùng"

```typescript
// TUYỆT ĐỐI TRÁNH — nhưng deadline gấp thì ai cũng từng...
await new Promise(resolve => setTimeout(resolve, 3000));

// Tại sao tệ:
// - Element load sau 0.5s → lãng phí 2.5s (nhân 200 tests = 500s lãng phí)
// - Element load sau 4s → test vẫn fail
// - Không ai biết sleep bao lâu là "đủ"
// - Đây là nguyên nhân #1 gây flaky tests
```

::: warning Thực tế dự án
Bạn sẽ gặp rất nhiều `sleep` trong Selenium projects cũ. Đừng judge — hãy hiểu context. Nhưng khi viết test mới, luôn dùng explicit wait.
:::

---

## Khi nào vẫn chọn Selenium? (Realistic view)

Đừng nghĩ "Selenium xấu, Playwright tốt". Mỗi tool có context phù hợp.

### Nên giữ Selenium khi:

| Tình huống | Lý do |
|---|---|
| **Dự án có 2,000+ test cases Selenium** | Migrate tốn 3-6 tháng, business không chờ được |
| **Team Java là chính** | Selenium Java ecosystem rất mature, Playwright Java còn non |
| **Đã có Selenium Grid infrastructure** | Đầu tư hardware/cloud rồi, chuyển sang = bỏ phí |
| **Cần test IE11 / browsers cũ** | Playwright không support browsers cũ |

### Nên chuyển sang Playwright khi:

| Tình huống | Lý do |
|---|---|
| **Dự án mới hoàn toàn** | Không có lý do gì chọn Selenium năm 2026 |
| **Team JavaScript/TypeScript** | Playwright ecosystem mạnh nhất |
| **CI/CD chậm vì Selenium** | Playwright nhanh hơn 2-5x |
| **Quá nhiều flaky tests** | Auto-wait giải quyết 70% flaky issues |

---

## So sánh nhanh — Bảng tham khảo

| Feature | Selenium | Playwright |
|---|---|---|
| **Auto-wait** | Không. Tự viết. | Built-in |
| **Setup** | Cài driver riêng mỗi browser, quản lý version | `npx playwright install` — xong |
| **Tốc độ** | HTTP round-trips → chậm | WebSocket → nhanh |
| **Debug** | Screenshot thủ công, logs | Trace Viewer, UI Mode, video recording |
| **API Testing** | Cần thêm library (Axios, RestAssured) | `request` context built-in |
| **iframes** | `driver.switchTo().frame()` — dễ quên switch back | `page.frameLocator()` — tự nhiên |
| **Multi-tab** | `switchTo().window()` — handle phức tạp | `context.pages()` — đơn giản |
| **Parallel** | Selenium Grid (tự setup) | Built-in sharding, zero config |
| **Reports** | Cần Allure/ExtentReports | Built-in HTML report |
| **Community** | Lớn nhất (20+ năm) | Tăng nhanh, docs xuất sắc |

---

## Setup nhanh — Nếu bạn cần

```bash
# Cài đặt
npm install selenium-webdriver
npm install -D @types/selenium-webdriver  # cho TypeScript

# Quan trọng: phải có ChromeDriver match version Chrome của bạn
# Hoặc dùng selenium-manager (từ Selenium 4.6+) tự download
```

```typescript
import { Builder, By, until } from 'selenium-webdriver';

async function quickDemo() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://google.com');
    await driver.findElement(By.name('q')).sendKeys('Playwright vs Selenium');
    await driver.findElement(By.name('q')).submit();
    await driver.wait(until.titleContains('Playwright'), 5000);
    console.log('Title:', await driver.getTitle());
  } finally {
    await driver.quit();
  }
}
```

---

## Tóm tắt — Ghi nhớ 4 điều

| # | Key Point |
|---|---|
| 1 | Selenium dùng **HTTP middleman** → chậm. Playwright dùng **WebSocket trực tiếp** → nhanh. |
| 2 | Selenium **KHÔNG auto-wait** — đây là nguồn gốc của 70% vấn đề (flaky tests, code dài dòng). |
| 3 | Vẫn cần biết Selenium vì **dự án legacy** và **câu hỏi phỏng vấn**. Nhưng dự án mới → Playwright. |
| 4 | Đừng judge code Selenium cũ có `sleep()`. Hãy hiểu context, rồi **cải thiện dần** bằng explicit waits. |

::: tip Mindset
Bài này không phải "Selenium tutorial". Mục đích là: **hiểu Selenium đủ sâu để trả lời phỏng vấn, maintain legacy code, và appreciate tại sao Playwright tốt hơn.**
:::
