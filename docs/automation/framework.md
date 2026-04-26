# Automation Framework

## Design Pattern -- ban phai hieu khai niem nay truoc

Truoc khi noi ve Framework, ban can hieu **Design Pattern** la gi.

**Design Pattern la mot LOI GIAI DA DUOC DAT TEN cho mot van de cu xay ra hoai.** Giong nhu mot cong thuc nau an (recipe) ma nhieu dau bep (chef) doc lap kham pha ra -- no hoat dong tot, nen nguoi ta dat cho no mot cai ten de de truyen dat.

> Tuong tuong: 1000 lap trinh vien giai cung 1 van de, ho doc lap tim ra cung 1 cach giai. Cach giai do duoc dat ten = Design Pattern.

### 3 Design Patterns ma QA can biet

| Pattern | Y nghia | Vi du thuc te |
|---|---|---|
| **Singleton** | Chi co DUY NHAT MOT thu gi do | Chi co 1 ket noi database trong ca he thong. Nhu ca truong hoc chi co 1 ong hieu truong -- ban khong tao them ong thu 2. |
| **Factory** | Tao ra thu gi do cho ban | Ban noi "toi can 1 user", Factory tao user cho ban. Ban khong can biet user duoc tao nhu the nao -- giong nhu ban goi mon an, khong can biet bep nau ra sao. |
| **Page Object Model (POM)** | To chuc test code theo tung trang | Moi trang web = 1 file code rieng. Day la pattern **QUAN TRONG NHAT** cho QA Automation. |

---

## Page Object Model (POM) -- Pattern quan trong nhat

### Van de TRUOC (the PAIN) -- tai sao POM ton tai?

Hay tuong tuong ban dang lam du an e-commerce. Ban viet 200 file test. Trong 50 file, ban deu can login:

```typescript
// ❌ File 1: login.spec.ts
test('login successfully', async ({ page }) => {
  // '#email-input' la CSS selector -- cach tim element tren trang web
  // fill() la dien text vao input
  await page.fill('#email-input', 'user@mail.com');     // Locator bi hardcode
  await page.fill('#password-input', 'Pass@123');        // Locator bi hardcode
  await page.click('button.login-btn');                  // Locator bi hardcode
  await expect(page).toHaveURL('/dashboard');
});

// ❌ File 2: profile.spec.ts
test('update profile after login', async ({ page }) => {
  await page.fill('#email-input', 'user@mail.com');      // DUPLICATE! Giong het file 1
  await page.fill('#password-input', 'Pass@123');         // DUPLICATE! Giong het file 1
  await page.click('button.login-btn');                   // DUPLICATE! Giong het file 1
  // ... update profile
});

// ❌ File 3: order.spec.ts -- lai duplicate tiep
// ❌ File 4: cart.spec.ts -- lai duplicate tiep
// ... 50 file khac cung copy-paste y het
```

**Bay gio, developer doi `#email-input` thanh `#user-email`.**

Ket qua: **Ban phai mo 50 file, tim va sua tung cai mot.** Miss 1 file = 1 test bi fail. Day la co ac mong (nightmare) cua moi QA Automation.

### Giai phap: Page Object Model

Y tuong cuc ky don gian: **Gom tat ca locator va action cua 1 trang vao 1 file duy nhat.** Developer doi gi thi chi sua 1 file.

```typescript
// ✅ pages/LoginPage.ts -- TAT CA ve trang Login nam o day

// import = nhap thu vien tu ben ngoai vao file nay
// Page = doi tuong dai dien cho 1 tab browser (Playwright cung cap)
// Locator = doi tuong dai dien cho 1 element tren trang (nut, input, text...)
// expect = ham de kiem tra ket qua (pass hay fail)
import { Page, Locator, expect } from '@playwright/test';

// export = cho phep file khac su dung class nay
// class = ban thiet ke (blueprint) de tao doi tuong
// LoginPage = ten class, dat theo ten trang web
export class LoginPage {

  // private = chi dung duoc BEN TRONG class nay, ben ngoai khong thay
  // page: Page = bien "page" co kieu du lieu la "Page"
  private page: Page;

  // Locator = dia chi cua element tren trang web
  // Giong nhu dia chi nha -- ban luu dia chi 1 lan, dung nhieu lan
  private emailInput: Locator;       // O nhap email
  private passwordInput: Locator;    // O nhap password
  private loginButton: Locator;      // Nut dang nhap
  private errorMessage: Locator;     // Thong bao loi

  // constructor = ham chay TU DONG khi tao doi tuong moi
  // Khi ban viet: new LoginPage(page) --> constructor chay
  // Giong nhu khi ban sinh ra, ban tu dong co ten, co nhom mau -- tu dong, khong can goi
  constructor(page: Page) {
    // this = chinh doi tuong nay (chinh minh)
    // this.page = luu "page" vao ben trong doi tuong de dung sau nay
    this.page = page;

    // page.locator() = tim element tren trang bang CSS selector
    // '#email-input' = tim element co id="email-input"
    this.emailInput = page.locator('#email-input');

    // '#password-input' = tim element co id="password-input"
    this.passwordInput = page.locator('#password-input');

    // 'button.login-btn' = tim the <button> co class="login-btn"
    this.loginButton = page.locator('button.login-btn');

    // '.error-message' = tim element co class="error-message"
    this.errorMessage = page.locator('.error-message');
  }

  // async = ham nay chay BAT DONG BO (can thoi gian, phai cho)
  // Vi browser can thoi gian de load trang, click, nhap text...
  // Moi khi ham co "await" ben trong --> phai khai bao "async"
  async goto() {
    // await = CHO cho hanh dong nay xong roi moi lam tiep
    // goto() = dieu huong browser den URL
    await this.page.goto('/login');
  }

  // email: string = tham so "email" co kieu du lieu la chuoi ky tu
  // password: string = tham so "password" co kieu du lieu la chuoi ky tu
  async login(email: string, password: string) {
    // fill() = xoa sach o input roi nhap text vao
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    // click() = nhan chuot vao element
    await this.loginButton.click();
  }

  // Promise<string> = ham nay TRA VE mot chuoi ky tu (nhung phai cho)
  // Promise = loi hua "toi se tra ve ket qua, nhung chua biet khi nao"
  async getError(): Promise<string> {
    // textContent() = lay noi dung text cua element
    // || '' = neu khong co text thi tra ve chuoi rong
    return await this.errorMessage.textContent() || '';
  }

  // Assertions -- kiem tra ket qua
  async expectLoginSuccess() {
    // expect(page).toHaveURL() = kiem tra URL hien tai co dung khong
    await expect(this.page).toHaveURL('/dashboard');
  }

  async expectErrorVisible(message: string) {
    // toBeVisible() = kiem tra element co hien thi tren man hinh khong
    await expect(this.errorMessage).toBeVisible();
    // toContainText() = kiem tra element co chua text nay khong
    await expect(this.errorMessage).toContainText(message);
  }
}
```

Bay gio test code tro nen **cuc ky sach**:

```typescript
// ✅ tests/login.spec.ts -- test sach, doc nhu doc requirement

// import LoginPage tu file pages/LoginPage.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// test.describe() = nhom cac test lai voi nhau theo feature
test.describe('Login Feature', () => {

  // let = khai bao bien (co the thay doi gia tri sau nay)
  // loginPage: LoginPage = bien co kieu du lieu la LoginPage
  let loginPage: LoginPage;

  // beforeEach = chay TRUOC MOI test trong nhom nay
  // Giong nhu nha hang don ban truoc moi vi khach
  test.beforeEach(async ({ page }) => {
    // new LoginPage(page) = tao doi tuong LoginPage moi
    // Day la luc constructor chay
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async () => {
    // Doc nhu tieng Anh: loginPage.login('email', 'pass')
    // Khong thay bat ky locator nao -- sach!
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

**Ket qua:** Developer doi `#email-input` thanh `#user-email` --> chi sua DUY NHAT 1 dong trong `LoginPage.ts`. 50 file test khong can thay doi gi.

---

## BasePage -- Ke thua (Inheritance)

### Ke thua la gi?

**Ke thua giong nhu con cai thua huong dac diem tu cha me.** Con co mat, co mui, co tay chan -- tat ca "thua huong" tu cha me ma khong can tu tao ra.

Trong code: **BasePage la "cha me"**, cac Page khac la "con cai". Con cai tu dong co tat ca method (ham) cua cha me.

```typescript
// pages/BasePage.ts -- "Cha me" cua tat ca Page Objects

import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  // protected = giong private, nhung CON CAI co the dung
  // private = chi minh dung duoc
  // protected = minh VA con cai dung duoc
  // public = ai cung dung duoc
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Nhung method (ham) CHUNG ma trang nao cung can
  // Tat ca "con cai" se tu dong co cac method nay

  // Cho trang load xong hoan toan
  // 'networkidle' = khong con request nao dang chay
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  // Lay tieu de (title) cua trang
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // Chup man hinh (screenshot)
  // name: string = ten file screenshot
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  // Cuon xuong cuoi trang
  // evaluate() = chay JavaScript tren browser that
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
```

```typescript
// pages/ProductPage.ts -- "Con" ke thua tu BasePage

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// extends = ke thua, "ProductPage la con cua BasePage"
// ProductPage tu dong co: waitForPageLoad(), getTitle(), takeScreenshot(), scrollToBottom()
export class ProductPage extends BasePage {
  private searchInput: Locator;
  private searchButton: Locator;
  private productCards: Locator;     // Danh sach the san pham
  private sortDropdown: Locator;     // Dropdown sap xep

  constructor(page: Page) {
    // super(page) = goi constructor cua CHA ME (BasePage)
    // Bat buoc phai goi super() truoc khi dung "this"
    // Giong nhu: truoc khi lam viec rieng, phai lam xong viec chung cua gia dinh
    super(page);

    // [data-testid="search-input"] = tim element co attribute data-testid="search-input"
    // Day la cach tot nhat de dat locator -- developer them data-testid cho QA
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('[data-testid="search-btn"]');
    this.productCards = page.locator('[data-testid="product-card"]');
    this.sortDropdown = page.locator('[data-testid="sort-select"]');
  }

  // Tim kiem san pham
  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    // waitForPageLoad() -- method nay tu BasePage (cha me)!
    // ProductPage khong khai bao nhung van dung duoc -- do ke thua
    await this.waitForPageLoad();
  }

  // Dem so san pham hien thi
  // count() = dem so luong element khop voi locator
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  // Sap xep san pham
  // 'price-asc' | 'price-desc' | 'name' | 'newest' = chi chap nhan 4 gia tri nay
  // Day la Union Type trong TypeScript -- gioi han gia tri dau vao
  async sortBy(option: 'price-asc' | 'price-desc' | 'name' | 'newest') {
    // selectOption() = chon gia tri trong dropdown <select>
    await this.sortDropdown.selectOption(option);
    await this.waitForPageLoad();
  }

  // Lay ten tat ca san pham
  // Promise<string[]> = tra ve MANG cac chuoi ky tu
  async getProductNames(): Promise<string[]> {
    // .locator('.product-name') = tim element con co class="product-name"
    // allTextContents() = lay text cua TAT CA element khop (tra ve mang)
    return await this.productCards.locator('.product-name').allTextContents();
  }

  // Kiem tra so luong san pham
  async expectProductCount(count: number) {
    // toHaveCount() = kiem tra so luong element
    await expect(this.productCards).toHaveCount(count);
  }
}
```

**Tong ket ke thua:**
- `BasePage` co 4 method chung (waitForPageLoad, getTitle, takeScreenshot, scrollToBottom)
- `ProductPage extends BasePage` --> tu dong co 4 method do + them cac method rieng cua minh
- `LoginPage extends BasePage` --> cung tu dong co 4 method do
- Sua 1 method trong BasePage --> tat ca Page Objects deu duoc cap nhat

---

## Data-Driven Testing -- Cung cong thuc, khac nguyen lieu

### Y tuong cot loi

**Data-Driven Testing = cung 1 cong thuc (recipe), nhung dung nhieu nguyen lieu (ingredients) khac nhau.**

Vi du thuc te: Ban test form login voi email sai. Co 10 loai email sai:
- Email trong ("")
- Email khong co @
- Email khong co domain
- Email co ky tu dac biet
- ... va 6 loai nua

**Khong co Data-Driven:** Ban viet 10 test, moi test chi khac nhau dong email va error message. 90% code la giong nhau = LANG PHI.

**Co Data-Driven:** Ban viet 1 test + 1 file data 10 dong = 10 test cases tu dong. Them 1 dong data = them 1 test case. **KHONG CAN VIET THEM CODE.**

### Cach lam

**Buoc 1: Tao file data (nguyen lieu)**
```json
// fixtures/test-data/login-data.json
// JSON = dinh dang luu tru du lieu, giong nhu bang Excel nhung cho may tinh doc
{
  "validLogin": {
    "email": "user@mail.com",
    "password": "Pass@123"
  },
  "invalidEmails": [
    { "email": "", "error": "Email is required" },
    { "email": "invalid", "error": "Invalid email format" },
    { "email": "no-domain@", "error": "Invalid email format" },
    { "email": "test@.com", "error": "Invalid email format" },
    { "email": "@gmail.com", "error": "Invalid email format" },
    { "email": "has space@gmail.com", "error": "Invalid email format" }
  ],
  "invalidPasswords": [
    { "password": "", "error": "Password is required" },
    { "password": "short", "error": "Min 8 characters" },
    { "password": "no-uppercase1!", "error": "Must contain uppercase" },
    { "password": "NOLOWERCASE1!", "error": "Must contain lowercase" }
  ]
}
```

**Buoc 2: Viet 1 test dung cho tat ca data (cong thuc)**
```typescript
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

// import data tu file JSON
// loginData bay gio chua tat ca du lieu o tren
import loginData from '../../fixtures/test-data/login-data.json';

test.describe('Login - Invalid Email', () => {

  // for...of = lap qua tung phan tu trong mang
  // loginData.invalidEmails la mang co 6 phan tu
  // Moi lan lap, "data" la 1 phan tu: { email: "...", error: "..." }
  for (const data of loginData.invalidEmails) {

    // Template literal: `text ${bien}` = chen bien vao chuoi
    // data.email || '(empty)' = neu email rong thi hien "(empty)"
    test(`should show error for email: "${data.email || '(empty)'}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      // Moi lan lap, email va error khac nhau
      await loginPage.login(data.email, 'Pass@123');
      await loginPage.expectErrorVisible(data.error);
    });
  }
});

// KET QUA: 6 dong data --> 6 test cases tu dong:
// ✅ should show error for email: "(empty)"
// ✅ should show error for email: "invalid"
// ✅ should show error for email: "no-domain@"
// ✅ should show error for email: "test@.com"
// ✅ should show error for email: "@gmail.com"
// ✅ should show error for email: "has space@gmail.com"
//
// Them 1 dong vao JSON = tu dong co them 1 test. KHONG CAN SUA CODE.
```

---

## Fixtures Pattern -- Setup tu dong truoc moi test

### Fixtures la gi?

**Fixtures = viec chuan bi (setup) xay ra TU DONG truoc moi test.**

Giong nhu nha hang: truoc moi vi khach (test), nhan vien tu dong don ban, trai khan, dat dao dia (setup). Khach ngoi xuong la an ngay, khong can tu lam. Khach di roi, nhan vien don dep (teardown).

Trong testing:
- **Setup** = login san, tao data san, mo trang san
- **Teardown** = xoa data, logout, dong ket noi
- **Fixture** = goi chung tat ca cac buoc setup + teardown nay

### Cach tao Custom Fixture trong Playwright

```typescript
// fixtures/auth.fixture.ts

// import test tu Playwright va doi ten thanh "base"
// vi minh se tao test MOI dua tren test goc
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

// type = dinh nghia kieu du lieu moi
// MyFixtures = kieu du lieu mo ta cac fixture cua minh
type MyFixtures = {
  loginPage: LoginPage;              // Fixture 1: trang login da san sang
  cartPage: CartPage;                // Fixture 2: trang cart da san sang
  authenticatedPage: LoginPage;      // Fixture 3: da login XONG roi
};

// base.extend<MyFixtures> = mo rong test goc, them cac fixture moi
// Giong nhu: lay ban test goc, gan them "phu kien" (fixture) vao
export const test = base.extend<MyFixtures>({

  // Fixture "loginPage": tao LoginPage va dieu huong den trang login
  // { page } = lay doi tuong page tu Playwright (co san)
  // use = "day la gia tri ma test se nhan duoc"
  loginPage: async ({ page }, use) => {
    // SETUP: tao LoginPage va mo trang login
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // use(loginPage) = trao loginPage cho test su dung
    // Test chay o GIUA day...
    await use(loginPage);

    // TEARDOWN: code sau use() chay SAU khi test xong
    // (o day khong can don dep gi)
  },

  // Fixture "authenticatedPage": DA LOGIN SAN
  // Test nhan duoc fixture nay = da dang nhap roi, khoi login nua
  authenticatedPage: async ({ page }, use) => {
    // SETUP: login san cho test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@mail.com', 'Pass@123');
    await loginPage.expectLoginSuccess();

    // Trao loginPage (da login) cho test
    await use(loginPage);
  },

  // Fixture "cartPage": tao CartPage san sang
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  }
});

// Re-export expect de test file khac dung
export { expect } from '@playwright/test';
```

```typescript
// tests/cart/add-to-cart.spec.ts -- DUNG custom fixture

// QUAN TRONG: import tu file fixture, KHONG PHAI tu '@playwright/test'
// Nhu vay test moi co cac fixture minh tao
import { test, expect } from '../../fixtures/auth.fixture';

// authenticatedPage = da login san (fixture lo het)
// cartPage = da tao san (fixture lo het)
// Test chi can tap trung vao viec test, khong can lo setup
test('should add product to cart', async ({ authenticatedPage, cartPage, page }) => {
  // authenticatedPage da login san -- KHONG CAN login lai!
  // Giong nhu khach ngoi xuong ban da don san -- an ngay
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart-1"]');
  // ... verify cart
});
```

---

## Cau truc Project thuc te -- moi thu muc la gi?

### Cau truc chuan cho Playwright + TypeScript

```
automation-project/
│
├── tests/                          # Chua TAT CA file test (.spec.ts)
│   │                               # Chia theo feature/module cua ung dung
│   ├── auth/                       # Tests lien quan den xac thuc (authentication)
│   │   ├── login.spec.ts           # Test dang nhap
│   │   ├── register.spec.ts        # Test dang ky
│   │   └── forgot-password.spec.ts # Test quen mat khau
│   ├── products/                   # Tests lien quan den san pham
│   │   ├── search.spec.ts          # Test tim kiem san pham
│   │   ├── filter.spec.ts          # Test loc san pham
│   │   └── product-detail.spec.ts  # Test trang chi tiet san pham
│   ├── cart/                       # Tests lien quan den gio hang
│   │   ├── add-to-cart.spec.ts     # Test them san pham vao gio
│   │   └── update-cart.spec.ts     # Test cap nhat gio hang
│   └── checkout/                   # Tests lien quan den thanh toan
│       ├── checkout-flow.spec.ts   # Test quy trinh thanh toan
│       └── payment.spec.ts         # Test phuong thuc thanh toan
│
├── pages/                          # Chua TAT CA Page Objects
│   │                               # Moi file = 1 trang web = 1 class
│   ├── BasePage.ts                 # "Cha me" -- cac method chung (screenshot, scroll...)
│   ├── LoginPage.ts                # Page Object cho trang dang nhap
│   ├── RegisterPage.ts             # Page Object cho trang dang ky
│   ├── ProductPage.ts              # Page Object cho trang san pham
│   ├── CartPage.ts                 # Page Object cho trang gio hang
│   └── CheckoutPage.ts            # Page Object cho trang thanh toan
│
├── fixtures/                       # Chua test data va custom fixtures
│   ├── test-data/                  # Du lieu test (tach rieng khoi code)
│   │   ├── users.json              # Data nguoi dung (email, password...)
│   │   ├── products.json           # Data san pham (ten, gia...)
│   │   └── payments.json           # Data thanh toan (so the, CVV...)
│   └── auth.fixture.ts            # Custom fixture (login san, tao data san...)
│
├── utils/                          # Cong cu ho tro (helper functions)
│   ├── api-helper.ts              # Goi API de setup/teardown (tao user, xoa data...)
│   ├── db-helper.ts               # Truy van database truc tiep (kiem tra data)
│   └── data-generator.ts          # Tao du lieu ngau nhien (random email, phone...)
│
├── playwright.config.ts            # CAU HINH Playwright (browser, timeout, baseURL...)
├── package.json                    # Quan ly thu vien (dependencies)
├── tsconfig.json                   # Cau hinh TypeScript
└── .github/
    └── workflows/
        └── test.yml                # CI/CD pipeline -- tu dong chay test khi push code
```

### Du an nho vs Du an lon

**Du an nho (1-2 QA, duoi 100 tests):**
```
project/
├── tests/           # Khong can chia subfolder -- tat ca file nam chung
├── pages/           # Van can Page Objects!
├── playwright.config.ts
└── package.json
```

**Du an lon (3+ QA, 100+ tests):**
```
project/
├── tests/           # PHAI chia theo feature/module
│   ├── auth/
│   ├── products/
│   ├── checkout/
│   └── admin/
├── pages/
├── fixtures/        # Custom fixtures + test data rieng
├── utils/           # Helper functions
├── scripts/         # Script setup/teardown (tao DB, seed data...)
├── .github/workflows/
└── playwright.config.ts
```

---

## CI/CD Pipeline -- Tu dong chay test khi push code

```yaml
# .github/workflows/test.yml
# File nay noi cho GitHub: "Moi khi push code, hay tu dong chay test"

name: Automation Tests      # Ten cua pipeline

on:                         # Khi nao chay?
  push:
    branches: [main, develop]   # Khi push len branch main hoac develop
  pull_request:
    branches: [main]            # Khi tao Pull Request vao main

jobs:
  test:
    runs-on: ubuntu-latest      # Chay tren may ao Ubuntu (mien phi cua GitHub)
    steps:
      - uses: actions/checkout@v4          # Buoc 1: tai source code ve
      - uses: actions/setup-node@v4        # Buoc 2: cai Node.js
        with:
          node-version: 20
      - run: npm ci                        # Buoc 3: cai thu vien (dependencies)
      - run: npx playwright install --with-deps   # Buoc 4: cai browser cho Playwright
      - run: npx playwright test           # Buoc 5: CHAY TEST
      - uses: actions/upload-artifact@v4   # Buoc 6: luu report
        if: always()                       # Luu report DU test pass hay fail
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Best Practices -- Quy tac vang

### Dat ten file (Naming Convention)

```
tests/
  login.spec.ts          ← feature-name.spec.ts (chu thuong, gach ngang)
  product-search.spec.ts ← kebab-case (chu-thuong-gach-ngang)

pages/
  LoginPage.ts           ← PascalCase + "Page" suffix (ChuInHoa + "Page")
  ProductPage.ts

fixtures/
  test-data/users.json   ← kebab-case (chu-thuong-gach-ngang)
```

### 5 Quy tac viet Page Object

1. **1 trang = 1 class** -- khong tron lan 2 trang vao 1 file
2. **Locators dat trong constructor** -- de tim, de sua, o 1 cho duy nhat
3. **Ten method mo ta hanh dong** -- `login()`, `searchProduct()`, KHONG PHAI `clickButton()`
4. **Assertion dat trong Page Object** -- `expectLoginSuccess()` chu khong de trong test file
5. **Dung data-testid** -- `[data-testid="login-btn"]` thay vi `.btn.primary` (CSS class hay bi doi)

### 4 Quy tac viet Test

1. **1 test = 1 scenario** -- khong test nhieu thu trong 1 test
2. **Test doc lap** -- test A khong phu thuoc test B (test A fail khong lam test B fail)
3. **Arrange, Act, Assert** -- Setup data, Thuc hien hanh dong, Kiem tra ket qua
4. **Ten test mo ta scenario** -- `should show error when password is empty` (doc la hieu test lam gi)

---

## Tom tat chuong

| Pattern | Van de no giai quyet | Khi nao dung |
|---|---|---|
| **Page Object Model** | Locator duplicate o 50 file, sua 1 cho = sua 50 file | Moi du an (BAT BUOC) |
| **BasePage** | Nhieu Page co cung method chung, copy-paste lung tung | Khi co tren 3 Page Objects |
| **Data-Driven** | 10 test cases giong nhau 90%, chi khac data | Khi test nhieu input variations |
| **Fixtures** | Phai login truoc moi test, copy-paste setup code | Khi nhieu test can cung setup |
| **CI/CD** | Quen chay test truoc khi deploy, loi lot ra production | Moi du an (RECOMMENDED) |
