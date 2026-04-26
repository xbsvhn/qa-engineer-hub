# Selenium

## Selenium là gì? (WHAT)

Selenium là bộ công cụ **open-source lâu đời nhất** (2004) cho web browser automation. Dù Playwright đang dẫn đầu về tính năng, Selenium vẫn được dùng rộng rãi vì **nhiều dự án cũ đã xây dựng test suite trên Selenium**.

### Khi nào gặp Selenium? (WHY cần biết)

- **Dự án legacy** — test suite có sẵn hàng nghìn test cases trên Selenium
- **Phỏng vấn** — nhiều công ty vẫn hỏi Selenium
- **Hiểu nền tảng** — Playwright/Cypress đều cải tiến từ những hạn chế của Selenium

---

## Selenium Components

| Component | Mục đích |
|---|---|
| **Selenium WebDriver** | API để điều khiển browser programmatically |
| **Selenium IDE** | Browser extension record & playback (cho beginners) |
| **Selenium Grid** | Chạy test parallel trên nhiều machines/browsers |

### Kiến trúc

```
Selenium Architecture:
┌──────────────────────┐
│   Your Test Code     │
│   (Java/JS/Python)   │
└──────────┬───────────┘
           │ Selenium WebDriver API
┌──────────▼───────────┐
│   HTTP/JSON Wire     │  ← Giao tiếp qua HTTP (chậm hơn Playwright)
│   Protocol           │
└──────────┬───────────┘
     ┌─────┼─────┐
     ▼     ▼     ▼
  ChromeDriver  GeckoDriver  SafariDriver    ← Cần driver riêng cho mỗi browser
     │          │             │
     ▼          ▼             ▼
  Chrome    Firefox       Safari
```

**So với Playwright:** Selenium cần driver trung gian, giao tiếp qua HTTP → chậm hơn và cần quản lý driver versions.

---

## Quick Start (JavaScript/TypeScript)

```bash
# Cài đặt
npm install selenium-webdriver
npm install -D @types/selenium-webdriver  # TypeScript types
```

```typescript
import { Builder, By, until } from 'selenium-webdriver';

async function loginTest() {
  // 1. Khởi tạo browser
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 2. Navigate
    await driver.get('https://example.com/login');

    // 3. Tìm element và tương tác
    await driver.findElement(By.id('email')).sendKeys('test@mail.com');
    await driver.findElement(By.id('password')).sendKeys('Pass@123');
    await driver.findElement(By.css('button.login-btn')).click();

    // 4. Đợi (PHẢI TỰ VIẾT!)
    await driver.wait(until.urlContains('/dashboard'), 10000);

    // 5. Verify
    const title = await driver.getTitle();
    console.log('Title:', title);
  } finally {
    // 6. PHẢI đóng browser thủ công
    await driver.quit();
  }
}

loginTest();
```

---

## Selenium Locators

| Locator | Ví dụ | Ưu tiên |
|---|---|---|
| **By.id()** | `By.id('email')` | Tốt nhất (nếu có) |
| **By.css()** | `By.css('.btn.primary')` | Recommended |
| **By.xpath()** | `By.xpath('//div[@class="header"]')` | Flexible nhất, nhưng dễ fragile |
| **By.name()** | `By.name('email')` | OK cho form fields |
| **By.linkText()** | `By.linkText('Sign In')` | Cho links |
| **By.className()** | `By.className('btn-primary')` | OK |

---

## Waits — Vấn đề lớn nhất của Selenium

Selenium **KHÔNG có auto-wait** như Playwright. Bạn phải tự xử lý.

### Implicit Wait

```typescript
// Đợi TỐI ĐA 10 giây cho MỌI findElement
await driver.manage().setTimeouts({ implicit: 10000 });
```

### Explicit Wait (Recommended)

```typescript
import { until } from 'selenium-webdriver';

const wait = new WebDriverWait(driver, 10000);

// Đợi element hiển thị
await wait.until(until.elementLocated(By.id('dashboard')));

// Đợi element clickable
await wait.until(until.elementIsEnabled(driver.findElement(By.id('submit'))));

// Đợi URL chứa text
await wait.until(until.urlContains('/dashboard'));

// Đợi title
await wait.until(until.titleContains('Dashboard'));
```

### Thread.sleep() — TRÁNH DÙNG!

```typescript
// ❌ TUYỆT ĐỐI KHÔNG LÀM THẾ NÀY
await new Promise(r => setTimeout(r, 5000));  // Đợi 5 giây

// Lý do:
// - Nếu element load sau 1 giây → lãng phí 4 giây
// - Nếu element load sau 6 giây → test vẫn fail
// - Làm test suite chậm đáng kể
```

---

## Selenium vs Playwright — So sánh chi tiết

| Feature | Selenium | Playwright |
|---|---|---|
| **Wait** | Tự viết explicit wait | Auto-wait built-in |
| **Setup** | Cài driver riêng cho mỗi browser | `npx playwright install` |
| **Speed** | HTTP protocol → chậm | CDP → nhanh |
| **Debugging** | Screenshot thủ công | Trace viewer, UI mode |
| **API Testing** | Cần thêm thư viện | Built-in |
| **iframe** | `driver.switchTo().frame()` → phức tạp | `page.frameLocator()` → đơn giản |
| **New tab/window** | `driver.switchTo().window()` | `context.pages()` |
| **File download** | Phức tạp, cần config | Built-in support |
| **Report** | Cần thêm thư viện (Allure) | Built-in HTML report |
| **Community** | Rất lớn (lâu đời) | Đang tăng nhanh |
| **Learning** | Nhiều tài liệu | Docs tốt, ít gotchas |

### Khi nào vẫn chọn Selenium?

1. **Dự án đã có test suite Selenium** — migrate tốn công hơn viết mới
2. **Team dùng Java/C#** — Selenium ecosystem mạnh hơn
3. **Cần test trên browsers cũ** — IE11, Opera
4. **Selenium Grid** — đã có infrastructure

### Khi nào chọn Playwright?

1. **Dự án mới** — không có lý do gì để chọn Selenium
2. **Team dùng JavaScript/TypeScript** — Playwright ecosystem tốt nhất
3. **Cần tốc độ** — CI/CD chạy nhanh hơn nhiều
4. **Cần debugging tốt** — Trace viewer là game changer

---

## Tóm tắt

| Aspect | Ghi nhớ |
|---|---|
| **Selenium là gì** | Tool automation lâu đời nhất, cần driver, không auto-wait |
| **Vẫn cần biết** | Nhiều dự án legacy, câu hỏi phỏng vấn phổ biến |
| **Hạn chế chính** | Không auto-wait, setup phức tạp, chậm hơn |
| **Recommendation** | Dự án mới → Playwright. Dự án cũ → maintain Selenium |
