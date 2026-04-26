# Playwright

## Playwright là gì? (WHAT)

Playwright là **modern web testing framework** do Microsoft phát triển (2020), nhanh chóng trở thành tool automation **phổ biến nhất** hiện nay, vượt qua Selenium và Cypress.

### Tại sao Playwright? (WHY)

| Feature | Playwright | Selenium | Cypress |
|---|---|---|---|
| **Auto-wait** | Built-in (không cần explicit wait) | Manual waits | Built-in |
| **Multi-browser** | Chromium, Firefox, WebKit | Tất cả | Chromium-based only |
| **Speed** | Rất nhanh (native protocol) | Chậm hơn (WebDriver) | Nhanh |
| **API Testing** | Built-in | Không | Plugin |
| **Mobile emulation** | Built-in | Appium riêng | Không |
| **Trace viewer** | Built-in (time-travel debug) | Không | Partial |
| **Codegen** | Built-in (record actions) | IDE plugin | Cypress Studio |
| **Parallel** | Built-in | Selenium Grid | Paid (Dashboard) |
| **Language** | JS/TS, Python, Java, C# | Nhiều | JS/TS only |
| **Learning curve** | Trung bình | Cao | Thấp |

### Kiến trúc

```
Playwright Architecture:
┌──────────────────────┐
│   Your Test Code     │
│   (TypeScript)       │
└──────────┬───────────┘
           │ Playwright API
┌──────────▼───────────┐
│   Playwright Library │  ← Giao tiếp trực tiếp với browser
│   (CDP / WebSocket)  │     qua Chrome DevTools Protocol
└──────────┬───────────┘
     ┌─────┼─────┐
     ▼     ▼     ▼
  Chromium Firefox WebKit    ← Browsers thật (không phải driver)
```

**So với Selenium** (dùng WebDriver protocol → chậm hơn):
```
Selenium: Test → WebDriver → HTTP → Browser Driver → Browser
Playwright: Test → CDP/WebSocket → Browser (trực tiếp, nhanh hơn)
```

---

## Quick Start

### Cài đặt

```bash
# Tạo project mới
npm init playwright@latest

# Hoặc thêm vào project có sẵn
npm install -D @playwright/test
npx playwright install
```

### Test đầu tiên

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('has correct title', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link works', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

### Chạy test

```bash
# Chạy tất cả tests
npx playwright test

# Chạy với UI mode (recommended cho development)
npx playwright test --ui

# Chạy có browser hiện lên (headed)
npx playwright test --headed

# Chạy 1 file cụ thể
npx playwright test tests/login.spec.ts

# Chạy test có chứa keyword
npx playwright test -g "login"

# Xem report
npx playwright show-report
```

---

## Locators — Tìm Elements

Locator là cách **tìm element** trên trang web. Playwright khuyến khích dùng **user-facing locators** — tìm element theo cách user nhìn thấy.

### Thứ tự ưu tiên (Best → Worst)

```
1. getByRole()        ← BEST: accessible, resilient
2. getByText()        ← Tìm theo text hiển thị
3. getByLabel()       ← Tìm form field theo label
4. getByPlaceholder() ← Tìm input theo placeholder
5. getByTestId()      ← Tìm theo data-testid attribute
6. locator()          ← CSS/XPath selector (last resort)
```

### Ví dụ chi tiết

```typescript
// ===== 1. getByRole — TỐT NHẤT =====
// Tìm theo vai trò accessibility (button, link, heading, textbox...)
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('link', { name: 'Sign up' }).click();
await page.getByRole('heading', { name: 'Welcome' });
await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');
await page.getByRole('checkbox', { name: 'Remember me' }).check();

// ===== 2. getByText — Tìm theo text =====
await page.getByText('Login').click();
await page.getByText(/welcome/i);          // Regex, case-insensitive

// ===== 3. getByLabel — Tìm form field =====
// HTML: <label for="email">Email Address</label><input id="email">
await page.getByLabel('Email Address').fill('test@mail.com');

// ===== 4. getByPlaceholder =====
await page.getByPlaceholder('Enter your email').fill('test@mail.com');

// ===== 5. getByTestId — Dùng data-testid =====
// HTML: <button data-testid="submit-btn">Submit</button>
await page.getByTestId('submit-btn').click();

// ===== 6. CSS/XPath — Khi không có cách nào khác =====
await page.locator('#email-input').fill('test@mail.com');
await page.locator('.btn.primary').click();
await page.locator('div.card >> text=iPhone').click();
```

### Chaining Locators — Tìm element trong element

```typescript
// Tìm button "Add to Cart" trong product card có tên "iPhone 15"
const productCard = page.locator('.product-card').filter({ hasText: 'iPhone 15' });
await productCard.getByRole('button', { name: 'Add to Cart' }).click();

// Tìm row có text "An" trong table
const row = page.getByRole('row').filter({ hasText: 'Nguyen Van An' });
await row.getByRole('button', { name: 'Edit' }).click();
```

---

## Actions — Tương tác

### Nhập liệu

```typescript
// Fill — xóa sạch rồi nhập
await page.getByLabel('Email').fill('test@mail.com');

// Type — gõ từng ký tự (cho auto-complete, search)
await page.getByLabel('Search').pressSequentially('iPhone', { delay: 100 });

// Clear
await page.getByLabel('Email').clear();

// Select dropdown
await page.getByLabel('Country').selectOption('vietnam');
await page.getByLabel('Country').selectOption({ label: 'Viet Nam' });

// Checkbox & Radio
await page.getByLabel('Remember me').check();
await page.getByLabel('Remember me').uncheck();
await page.getByLabel('Male').check();  // Radio button

// File upload
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf');
await page.getByLabel('Upload').setInputFiles(['file1.pdf', 'file2.pdf']);
```

### Click

```typescript
// Click
await page.getByRole('button', { name: 'Submit' }).click();

// Double click
await page.getByText('Edit').dblclick();

// Right click
await page.getByText('Item').click({ button: 'right' });

// Force click (khi element bị che bởi overlay)
await page.getByRole('button', { name: 'Submit' }).click({ force: true });
```

### Navigation

```typescript
// Điều hướng
await page.goto('https://example.com');
await page.goto('/login');    // Relative URL (dùng baseURL)
await page.goBack();
await page.goForward();
await page.reload();
```

---

## Assertions — Kiểm tra

Playwright assertions **tự động retry** cho đến khi pass hoặc timeout. Không cần sleep/wait.

### Page Assertions

```typescript
// URL
await expect(page).toHaveURL('/dashboard');
await expect(page).toHaveURL(/.*dashboard/);

// Title
await expect(page).toHaveTitle('Dashboard - My App');
await expect(page).toHaveTitle(/Dashboard/);
```

### Element Assertions

```typescript
const submitBtn = page.getByRole('button', { name: 'Submit' });
const emailInput = page.getByLabel('Email');
const errorMsg = page.locator('.error-message');

// Visibility
await expect(submitBtn).toBeVisible();
await expect(errorMsg).toBeHidden();
await expect(errorMsg).not.toBeVisible();

// Text
await expect(errorMsg).toHaveText('Invalid email');
await expect(errorMsg).toContainText('Invalid');

// Value (input fields)
await expect(emailInput).toHaveValue('test@mail.com');
await expect(emailInput).toBeEmpty();

// State
await expect(submitBtn).toBeEnabled();
await expect(submitBtn).toBeDisabled();
await expect(page.getByLabel('Agree')).toBeChecked();

// Count (danh sách)
await expect(page.locator('.product-card')).toHaveCount(10);

// CSS
await expect(errorMsg).toHaveCSS('color', 'rgb(255, 0, 0)');
await expect(submitBtn).toHaveClass(/primary/);

// Attributes
await expect(page.locator('img')).toHaveAttribute('alt', 'Logo');
```

### Soft Assertions — Không dừng test khi fail

```typescript
// Hard assertion (default) — test dừng ngay khi fail
await expect(page.getByText('Welcome')).toBeVisible();  // Nếu fail → test stop

// Soft assertion — ghi nhận fail nhưng tiếp tục test
await expect.soft(page.getByText('Welcome')).toBeVisible();  // Nếu fail → tiếp tục
await expect.soft(page.getByText('Dashboard')).toBeVisible();
// Cuối test mới report tất cả soft failures
```

---

## Auto-Wait — Tự động đợi

Đây là **ưu điểm lớn nhất** của Playwright so với Selenium. Bạn **không cần viết wait/sleep**.

```typescript
// Playwright tự động đợi element:
// 1. Xuất hiện trong DOM
// 2. Visible
// 3. Stable (không đang animation)
// 4. Enabled (không disabled)
// 5. Không bị che (no overlay)

// Bạn chỉ cần viết:
await page.click('#button');
// Playwright tự xử lý tất cả waiting ở trên!

// So với Selenium:
// await driver.wait(until.elementLocated(By.id('button')), 10000);
// await driver.wait(until.elementIsVisible(element), 10000);
// await driver.wait(until.elementIsEnabled(element), 10000);
// element.click();
```

### Khi cần explicit wait

```typescript
// Đợi navigation
await page.waitForURL('/dashboard');

// Đợi network response
const response = await page.waitForResponse('**/api/users');

// Đợi element xuất hiện (hiếm khi cần)
await page.waitForSelector('.loading', { state: 'hidden' });

// Đợi loading xong
await page.waitForLoadState('networkidle');
```

---

## Test Organization

### Describe & Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {
  // Chạy trước MỖI test trong describe
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('user@mail.com');
    await page.getByLabel('Password').fill('Pass@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error with empty email', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  // Skip test
  test.skip('should login with Google', async ({ page }) => {
    // TODO: implement when Google OAuth is ready
  });

  // Test chỉ chạy khi focus
  // test.only('debug this test', async ({ page }) => { ... });
});
```

### Tags & Filtering

```typescript
// Gắn tag cho test
test('checkout flow @smoke @critical', async ({ page }) => {
  // ...
});

test('product review @regression', async ({ page }) => {
  // ...
});
```

```bash
# Chạy chỉ smoke tests
npx playwright test --grep @smoke

# Chạy tất cả trừ regression
npx playwright test --grep-invert @regression
```

---

## API Testing với Playwright

Playwright có built-in API testing — không cần tool riêng.

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const API_URL = 'https://api.example.com';

  test('GET /users should return users list', async ({ request }) => {
    const response = await request.get(`${API_URL}/users`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('email');
  });

  test('POST /users should create user', async ({ request }) => {
    const response = await request.post(`${API_URL}/users`, {
      data: {
        name: 'Test User',
        email: 'test@mail.com'
      }
    });

    expect(response.status()).toBe(201);

    const user = await response.json();
    expect(user.name).toBe('Test User');
    expect(user.id).toBeDefined();
  });

  test('API + UI: Create via API, verify on UI', async ({ request, page }) => {
    // 1. Tạo user qua API (nhanh)
    const response = await request.post(`${API_URL}/users`, {
      data: { name: 'UI Test User', email: 'uitest@mail.com' }
    });
    const user = await response.json();

    // 2. Verify trên UI
    await page.goto(`/users/${user.id}`);
    await expect(page.getByText('UI Test User')).toBeVisible();
  });
});
```

---

## Configuration

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Thư mục chứa tests
  testDir: './tests',

  // Chạy tests parallel
  fullyParallel: true,

  // Không cho chạy test.only trên CI
  forbidOnly: !!process.env.CI,

  // Retry khi fail
  retries: process.env.CI ? 2 : 0,

  // Số workers (threads) chạy song song
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ['html', { open: 'never' }],      // HTML report
    ['list'],                           // Console output
    // ['junit', { outputFile: 'results.xml' }],  // Cho CI/CD
  ],

  // Config chung cho tất cả tests
  use: {
    baseURL: 'https://staging.example.com',

    // Screenshot khi test fail
    screenshot: 'only-on-failure',

    // Video recording
    video: 'retain-on-failure',

    // Trace (time-travel debugging)
    trace: 'retain-on-failure',

    // Timeout cho mỗi action
    actionTimeout: 10000,
  },

  // Browsers/devices
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },
  ],
});
```

---

## Debugging

### 1. UI Mode (Recommended)

```bash
npx playwright test --ui
```

Giao diện trực quan: xem từng step, time-travel, xem DOM snapshot.

### 2. Debug Mode

```bash
# Mở Playwright Inspector
npx playwright test --debug

# Debug 1 file cụ thể
npx playwright test tests/login.spec.ts --debug
```

### 3. Trace Viewer

```bash
# Xem trace sau khi test fail
npx playwright show-trace trace.zip
```

Trace cho phép **time-travel debug**: xem lại từng action, network request, DOM snapshot tại mỗi thời điểm.

### 4. Codegen — Record actions

```bash
# Mở browser, record hành động → generate code
npx playwright codegen https://example.com
```

Rất hữu ích để:
- Tìm đúng locator
- Generate boilerplate code nhanh
- Học syntax Playwright

---

## Real-world Example: E-commerce Test Suite

```typescript
// tests/checkout/checkout-flow.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow @smoke @critical', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login trước mỗi test
    await loginPage.goto();
    await loginPage.login('customer@test.com', 'Pass@123');
  });

  test('should complete checkout with valid payment', async ({ page }) => {
    // 1. Search and add product
    await productPage.searchProduct('iPhone 15');
    await productPage.addToCart('iPhone 15');

    // 2. Go to cart
    await cartPage.goto();
    await cartPage.expectItemCount(1);
    await cartPage.expectTotalGreaterThan(0);

    // 3. Proceed to checkout
    await cartPage.proceedToCheckout();

    // 4. Fill shipping
    await checkoutPage.fillShipping({
      address: '123 Nguyen Hue',
      city: 'Ho Chi Minh',
      phone: '0901234567'
    });

    // 5. Pay
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',
      expiry: '12/28',
      cvv: '123'
    });
    await checkoutPage.placeOrder();

    // 6. Verify order confirmation
    await checkoutPage.expectOrderSuccess();
    const orderId = await checkoutPage.getOrderId();
    expect(orderId).toMatch(/^ORD-\d+$/);
  });

  test('should show error with expired card', async ({ page }) => {
    await productPage.addToCart('iPhone 15');
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShipping({
      address: '123 Main St', city: 'HCM', phone: '0901234567'
    });
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',
      expiry: '01/20',  // Expired
      cvv: '123'
    });
    await checkoutPage.placeOrder();

    await checkoutPage.expectPaymentError('Card has expired');
  });
});
```

---

## Tóm tắt chương

| Feature | Ý nghĩa |
|---|---|
| **Auto-wait** | Không cần sleep/wait, code sạch hơn |
| **User-facing locators** | `getByRole`, `getByText` — resilient, dễ đọc |
| **Assertions retry** | Tự động retry → ít flaky test |
| **Multi-browser** | Chromium + Firefox + WebKit |
| **API testing** | Built-in, không cần tool riêng |
| **Trace viewer** | Time-travel debug khi test fail |
| **Codegen** | Record actions → generate code |
| **Parallel** | Chạy nhiều test cùng lúc → nhanh |

::: tip Tiếp theo
- Đã nắm vững Playwright → Tìm hiểu [Selenium](./selenium) để so sánh
- Muốn biết nên chọn tool nào → Xem [Automation Strategy](./automation-strategy)
:::
