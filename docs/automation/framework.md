# Automation Framework

## Framework là gì? (WHAT)

Automation Framework là **bộ quy tắc, cấu trúc, và công cụ** giúp xây dựng và quản lý automation tests một cách **có hệ thống**. Không có framework → code test sẽ lộn xộn, khó maintain, khó scale.

> Framework giống như **bản vẽ kiến trúc** cho ngôi nhà. Bạn có thể xây nhà không cần bản vẽ, nhưng nó sẽ khó mở rộng, khó sửa chữa, và có thể đổ.

### Tại sao cần Framework? (WHY)

| Không có Framework | Có Framework |
|---|---|
| Test data hardcode trong test | Test data tách riêng (JSON, CSV) |
| Locators duplicate ở nhiều file | Locators tập trung trong Page Object |
| Thay đổi 1 element → sửa 50 file | Thay đổi 1 element → sửa 1 chỗ |
| Khó thêm test mới | Dễ dàng thêm test mới |
| Report không có | Report tự động generate |
| Không ai muốn maintain | Team vui vẻ maintain |

---

## Page Object Model (POM)

### Bản chất (WHAT)

POM là design pattern **phổ biến nhất** trong automation testing. Ý tưởng: mỗi trang web → 1 class chứa tất cả elements và actions của trang đó.

### Tại sao POM quan trọng nhất? (WHY)

**Vấn đề: Không dùng POM**

```typescript
// ❌ login.spec.ts — locators hardcode trong test
test('login successfully', async ({ page }) => {
  await page.fill('#email-input', 'user@mail.com');
  await page.fill('#password-input', 'Pass@123');
  await page.click('button.login-btn');
  await expect(page).toHaveURL('/dashboard');
});

// ❌ profile.spec.ts — cùng locator, duplicate!
test('update profile after login', async ({ page }) => {
  await page.fill('#email-input', 'user@mail.com');      // Duplicate!
  await page.fill('#password-input', 'Pass@123');          // Duplicate!
  await page.click('button.login-btn');                    // Duplicate!
  // ... update profile
});
```

Nếu developer đổi `#email-input` thành `#user-email` → phải sửa **mọi file** có locator đó.

**Giải pháp: Dùng POM**

```typescript
// ✅ pages/LoginPage.ts — tập trung locators và actions
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  // Locators — TẤT CẢ ở 1 chỗ
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email-input');
    this.passwordInput = page.locator('#password-input');
    this.loginButton = page.locator('button.login-btn');
    this.errorMessage = page.locator('.error-message');
  }

  // Actions — đóng gói tương tác
  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getError(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  // Assertions — verify kết quả
  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('/dashboard');
  }

  async expectErrorVisible(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
```

```typescript
// ✅ tests/login.spec.ts — test sạch, dễ đọc
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async () => {
    await loginPage.login('user@mail.com', 'Pass@123');
    await loginPage.expectLoginSuccess();
  });

  test('should show error with invalid email', async () => {
    await loginPage.login('invalid-email', 'Pass@123');
    await loginPage.expectErrorVisible('Invalid email format');
  });

  test('should show error with wrong password', async () => {
    await loginPage.login('user@mail.com', 'wrong');
    await loginPage.expectErrorVisible('Incorrect password');
  });
});
```

**Lợi ích:**
- Developer đổi `#email-input` → chỉ sửa 1 file `LoginPage.ts`
- Test code dễ đọc như đọc requirement
- Người mới join team hiểu ngay test làm gì

---

## Cấu trúc Project thực tế

### Cấu trúc chuẩn cho Playwright + TypeScript

```
automation-project/
│
├── tests/                          # Test specifications
│   ├── auth/
│   │   ├── login.spec.ts           # Login tests
│   │   ├── register.spec.ts        # Register tests
│   │   └── forgot-password.spec.ts
│   ├── products/
│   │   ├── search.spec.ts
│   │   ├── filter.spec.ts
│   │   └── product-detail.spec.ts
│   ├── cart/
│   │   ├── add-to-cart.spec.ts
│   │   └── update-cart.spec.ts
│   └── checkout/
│       ├── checkout-flow.spec.ts
│       └── payment.spec.ts
│
├── pages/                          # Page Objects
│   ├── BasePage.ts                 # Base class (common actions)
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── fixtures/                       # Test data & custom fixtures
│   ├── test-data/
│   │   ├── users.json
│   │   ├── products.json
│   │   └── payments.json
│   └── auth.fixture.ts            # Custom Playwright fixture
│
├── utils/                          # Helpers & utilities
│   ├── api-helper.ts              # API calls for setup/teardown
│   ├── db-helper.ts               # Database queries
│   └── data-generator.ts          # Random data generation
│
├── playwright.config.ts            # Playwright configuration
├── package.json
├── tsconfig.json
└── .github/
    └── workflows/
        └── test.yml                # CI/CD pipeline
```

### BasePage — Base class cho tất cả Page Objects

```typescript
// pages/BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common actions dùng chung cho mọi page
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
```

```typescript
// pages/ProductPage.ts — kế thừa BasePage
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private searchInput: Locator;
  private searchButton: Locator;
  private productCards: Locator;
  private sortDropdown: Locator;

  constructor(page: Page) {
    super(page);  // Gọi constructor của BasePage
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('[data-testid="search-btn"]');
    this.productCards = page.locator('[data-testid="product-card"]');
    this.sortDropdown = page.locator('[data-testid="sort-select"]');
  }

  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await this.waitForPageLoad();  // Method từ BasePage
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async sortBy(option: 'price-asc' | 'price-desc' | 'name' | 'newest') {
    await this.sortDropdown.selectOption(option);
    await this.waitForPageLoad();
  }

  async getProductNames(): Promise<string[]> {
    return await this.productCards.locator('.product-name').allTextContents();
  }

  async expectProductCount(count: number) {
    await expect(this.productCards).toHaveCount(count);
  }
}
```

---

## Data-Driven Testing

### Bản chất (WHAT)

Tách **test data** ra khỏi **test logic**. Cùng 1 test chạy với **nhiều bộ data** khác nhau.

### Cách triển khai (HOW)

**Test data file:**
```json
// fixtures/test-data/login-data.json
{
  "validLogin": {
    "email": "user@mail.com",
    "password": "Pass@123"
  },
  "invalidEmails": [
    { "email": "", "error": "Email is required" },
    { "email": "invalid", "error": "Invalid email format" },
    { "email": "no-domain@", "error": "Invalid email format" },
    { "email": "test@.com", "error": "Invalid email format" }
  ],
  "invalidPasswords": [
    { "password": "", "error": "Password is required" },
    { "password": "short", "error": "Min 8 characters" },
    { "password": "no-uppercase1!", "error": "Must contain uppercase" }
  ]
}
```

**Test dùng data-driven:**
```typescript
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import loginData from '../../fixtures/test-data/login-data.json';

test.describe('Login - Invalid Email', () => {
  for (const data of loginData.invalidEmails) {
    test(`should show error for email: "${data.email || '(empty)'}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(data.email, 'Pass@123');
      await loginPage.expectErrorVisible(data.error);
    });
  }
});
```

→ **4 test cases** tự động generate từ 4 dòng data. Thêm data → tự có thêm test.

---

## Fixtures Pattern (Playwright)

Playwright fixtures giúp **setup/teardown** dùng chung cho nhiều tests.

```typescript
// fixtures/auth.fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

// Định nghĩa custom fixtures
type MyFixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  authenticatedPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  // loginPage fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // authenticatedPage — đã login sẵn
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@mail.com', 'Pass@123');
    await loginPage.expectLoginSuccess();
    await use(loginPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  }
});

export { expect } from '@playwright/test';
```

```typescript
// tests/cart/add-to-cart.spec.ts — dùng custom fixture
import { test, expect } from '../../fixtures/auth.fixture';

test('should add product to cart', async ({ authenticatedPage, cartPage, page }) => {
  // authenticatedPage đã login sẵn — không cần login lại!
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart-1"]');
  // ... verify cart
});
```

---

## Cấu trúc project trong thực tế dự án

### Dự án nhỏ (1-2 QA, < 100 tests)

```
project/
├── tests/           # Flat structure, không chia subfolder
├── pages/
├── playwright.config.ts
└── package.json
```

### Dự án lớn (3+ QA, 100+ tests)

```
project/
├── tests/           # Chia theo feature/module
│   ├── auth/
│   ├── products/
│   ├── checkout/
│   └── admin/
├── pages/
├── fixtures/        # Custom fixtures + test data
├── utils/           # Helpers
├── scripts/         # Setup/teardown scripts
├── .github/workflows/
└── playwright.config.ts
```

### CI/CD Pipeline thực tế

```yaml
# .github/workflows/test.yml
name: Automation Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Best Practices

### Naming Convention

```
tests/
  login.spec.ts          ← feature-name.spec.ts
  product-search.spec.ts ← kebab-case

pages/
  LoginPage.ts           ← PascalCase + "Page" suffix
  ProductPage.ts

fixtures/
  test-data/users.json   ← kebab-case
```

### Quy tắc viết Page Object

1. **1 page = 1 class** — không trộn lẫn
2. **Locators ở constructor** — dễ tìm, dễ sửa
3. **Methods mô tả action** — `login()`, `searchProduct()`, không phải `clickButton()`
4. **Assertions trong Page Object** — `expectLoginSuccess()` chứ không để trong test
5. **Dùng data-testid** — `[data-testid="login-btn"]` thay vì `.btn.primary`

### Quy tắc viết Test

1. **1 test = 1 scenario** — không test nhiều thứ trong 1 test
2. **Test độc lập** — test A không phụ thuộc test B
3. **Arrange → Act → Assert** — Setup → Action → Verify
4. **Tên test mô tả scenario** — `should show error when password is empty`

---

## Tóm tắt chương

| Pattern | Mục đích | Khi dùng |
|---|---|---|
| **Page Object Model** | Tách locators & actions khỏi test | Mọi dự án (bắt buộc) |
| **BasePage** | Common actions dùng chung | Khi có nhiều pages |
| **Data-Driven** | 1 test + nhiều data = nhiều test cases | Khi test nhiều input variations |
| **Fixtures** | Setup/teardown dùng chung | Login trước mỗi test, cleanup |
| **CI/CD** | Chạy test tự động | Mọi dự án (recommended) |
