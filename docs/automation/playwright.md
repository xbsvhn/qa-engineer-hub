# Playwright

## Playwright la gi?

Playwright la **modern web testing framework** do Microsoft phat trien (2020). No nhanh chong tro thanh tool automation **pho bien nhat** hien nay, vuot qua Selenium va Cypress.

Nhung truoc khi hoc cach dung, ban phai hieu **TAI SAO no nhanh hon va manh hon**.

---

## Kien truc (Architecture) -- TAI SAO Playwright nhanh hon Selenium?

### Van de cua Selenium: noi chuyen qua TRUNG GIAN

Hay tuong tuong ban muon goi dien cho ban minh:
- **Selenium** = Ban goi cho LE TAN (receptionist), le tan ghi lai loi nhan, roi le tan goi cho ban minh, ban minh tra loi le tan, le tan tra loi lai ban. **Cham, mat thoi gian, co the sai lech.**
- **Playwright** = Ban goi TRUC TIEP cho ban minh. **Nhanh, chinh xac, khong mat thong tin.**

Day la su khac biet co ban nhat:

```
Selenium (CHAM -- qua nhieu buoc trung gian):
  Test code --> WebDriver Protocol --> HTTP Request --> Browser Driver (.exe) --> Browser
  (4 buoc, moi buoc mat thoi gian)

Playwright (NHANH -- noi chuyen truc tiep):
  Test code --> CDP/WebSocket --> Browser
  (2 buoc, ket noi truc tiep)
```

**CDP = Chrome DevTools Protocol** -- giao thuc (protocol) ma Chrome cung cap de giao tiep truc tiep voi browser. Khi ban mo DevTools (F12) trong Chrome, no cung dung CDP. Playwright dung chinh giao thuc nay.

**WebSocket** = ket noi 2 chieu, lien tuc. Khong can gui request roi cho response nhu HTTP. Giong nhu cuoc goi dien thoai -- 2 ben noi chuyen lien tuc, khong can gac may roi goi lai.

### Kien truc Playwright chi tiet

```
┌──────────────────────┐
│   Your Test Code     │    Ban viet code o day
│   (TypeScript)       │
└──────────┬───────────┘
           │ Playwright API (cac ham nhu click(), fill(), expect()...)
┌──────────▼───────────┐
│   Playwright Library │    Thu vien Playwright xu ly moi thu
│   (CDP / WebSocket)  │    Giao tiep TRUC TIEP voi browser
└──────────┬───────────┘
     ┌─────┼─────┐
     ▼     ▼     ▼
  Chromium Firefox WebKit     3 browser THAT (khong can driver rieng)
```

**So sanh voi Selenium:**
| | Selenium | Playwright |
|---|---|---|
| Can cai driver rieng? | Co (chromedriver.exe, geckodriver.exe) | Khong (tu dong) |
| Giao tiep | Qua HTTP (cham) | Qua WebSocket (nhanh) |
| Cap nhat driver | Thu cong, hay bi loi version | Tu dong, khong lo |
| Multi-browser | Can cai tung driver | 1 lenh cai het |

---

## Auto-Wait -- THE KILLER FEATURE (tinh nang quan trong nhat)

### Van de cua Selenium: phai TU VIET wait MOI LUC MOI NOI

Trong Selenium, truoc khi lam BAT CU GI, ban phai tu viet code cho:

```
// Selenium (Java) -- PHAI viet 4 dong wait chi de click 1 nut:
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Buoc 1: cho element xuat hien trong DOM
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("button")));

// Buoc 2: cho element hien thi (visible)
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("button")));

// Buoc 3: cho element co the click duoc (khong bi che, khong bi disabled)
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));

// Buoc 4: CUOI CUNG moi click duoc
button.click();
```

Neu ban **QUEN** viet wait --> test bi "flaky" (luc pass luc fail). Day la co ac mong lon nhat cua Selenium.

### Giai phap cua Playwright: TU DONG cho, ban khong can lam gi

```typescript
// Playwright -- CHI CAN 1 DONG:
await page.click('#button');

// Playwright TU DONG lam TAT CA nhung viec nay TRUOC khi click:
// 1. Cho element xuat hien trong DOM          ✅ Tu dong
// 2. Cho element visible (hien thi)           ✅ Tu dong
// 3. Cho element stable (khong dang animation) ✅ Tu dong
// 4. Cho element enabled (khong bi disabled)   ✅ Tu dong
// 5. Cho khong bi element khac che (overlay)   ✅ Tu dong
// 6. Cuoi cung moi click                      ✅ Tu dong
//
// Ban KHONG CAN viet bat ky dong wait nao. Playwright lo het.
```

**Day la ly do #1 tai sao Playwright it flaky test hon Selenium.**

### Khi nao CAN explicit wait (hiem khi)

```typescript
// Cho chuyen trang (navigation)
// waitForURL() = cho den khi URL thay doi thanh gia tri mong muon
await page.waitForURL('/dashboard');

// Cho API response ve
// waitForResponse() = cho den khi browser nhan duoc response tu URL nay
// ** = wildcard, bat ky domain nao
const response = await page.waitForResponse('**/api/users');

// Cho loading spinner bien mat
// state: 'hidden' = cho den khi element KHONG CON hien thi
await page.waitForSelector('.loading-spinner', { state: 'hidden' });

// Cho trang load xong hoan toan (khong con request nao)
// 'networkidle' = khong co request nao trong 500ms
await page.waitForLoadState('networkidle');
```

---

## Quick Start -- Bat dau trong 2 phut

### Cai dat

```bash
# Tao project Playwright moi tu dau
# npm init = tao project Node.js
# playwright@latest = phien ban Playwright moi nhat
npm init playwright@latest

# HOAC them Playwright vao project co san
# -D = devDependency (chi dung khi phat trien, khong can khi deploy)
npm install -D @playwright/test

# Cai browser cho Playwright (Chromium, Firefox, WebKit)
npx playwright install
```

### Test dau tien

```typescript
// tests/example.spec.ts

// import = nhap thu vien
// test = ham de tao test case
// expect = ham de kiem tra ket qua
import { test, expect } from '@playwright/test';

// test('ten test', async ({ page }) => { ... })
// 'ten test' = mo ta test lam gi
// async = ham bat dong bo (can cho browser)
// { page } = Playwright tu dong tao 1 tab browser moi cho ban
test('has correct title', async ({ page }) => {
  // goto() = mo URL trong browser
  await page.goto('https://playwright.dev');

  // expect(page).toHaveTitle() = kiem tra title cua trang
  // /Playwright/ = Regular Expression, tim tu "Playwright" bat ky dau
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link works', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // getByRole('link', { name: 'Get started' })
  // = tim element co vai tro (role) la "link" va text la "Get started"
  // click() = nhan chuot vao link do
  await page.getByRole('link', { name: 'Get started' }).click();

  // Kiem tra heading "Installation" hien thi sau khi click
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

### Chay test

```bash
# Chay TAT CA tests
npx playwright test

# Chay voi UI mode (KHUYEN DUNG khi dang viet test)
# Mo giao dien de xem tung buoc test chay
npx playwright test --ui

# Chay co browser hien len (binh thuong Playwright chay an)
# headed = hien browser, headless = an browser
npx playwright test --headed

# Chay 1 file cu the
npx playwright test tests/login.spec.ts

# Chay test co chua keyword "login" trong ten
# -g = grep (loc theo ten)
npx playwright test -g "login"

# Xem report sau khi chay xong
npx playwright show-report
```

---

## Locators -- Cach tim element tren trang web

**Locator = dia chi cua element.** Giong nhu ban can dia chi nha de gui thu, Playwright can locator de biet click vao dau, nhap text vao dau.

### Thu tu uu tien (QUAN TRONG -- phai hoc thuoc)

```
1. getByRole()        ← TOT NHAT -- resilient nhat
2. getByText()        ← Tim theo text hien thi
3. getByLabel()       ← Tim form field theo label
4. getByPlaceholder() ← Tim input theo placeholder
5. getByTestId()      ← Tim theo data-testid attribute
6. locator()          ← CSS/XPath -- CUOI CUNG moi dung
```

### TAI SAO thu tu nay quan trong?

**getByRole() tot nhat vi:** Developer co the doi CSS class bat ky luc nao (`.btn-primary` thanh `.button-main`). Nhung **role cua element hau nhu KHONG BAO GIO thay doi** -- button van la button, link van la link, heading van la heading. Test cua ban van pass du developer doi CSS.

**locator() (CSS/XPath) te nhat vi:** CSS class thay doi thuong xuyen. Developer doi `.login-btn` thanh `.signin-button` --> test fail ngay. Ban phai sua test du ung dung khong co loi gi.

### Vi du chi tiet -- moi dong co giai thich

```typescript
// ===== 1. getByRole -- TOT NHAT, uu tien dung =====
// Tim element theo VAI TRO cua no (button, link, heading, textbox...)
// { name: 'Submit' } = co text la "Submit"

// Tim nut (button) co text "Submit" roi click
await page.getByRole('button', { name: 'Submit' }).click();

// Tim lien ket (link) co text "Sign up" roi click
await page.getByRole('link', { name: 'Sign up' }).click();

// Tim tieu de (heading) co text "Welcome"
await page.getByRole('heading', { name: 'Welcome' });

// Tim o nhap text (textbox) co label "Email" roi nhap email
await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');

// Tim checkbox co label "Remember me" roi tich vao
await page.getByRole('checkbox', { name: 'Remember me' }).check();


// ===== 2. getByText -- Tim theo text hien thi tren man hinh =====
// Tim element co text "Login" roi click
await page.getByText('Login').click();

// /welcome/i = Regular Expression
// i = case-insensitive (khong phan biet hoa thuong)
// Tim "welcome", "Welcome", "WELCOME" deu duoc
await page.getByText(/welcome/i);


// ===== 3. getByLabel -- Tim form field theo label =====
// HTML: <label for="email">Email Address</label><input id="email">
// Tim input co label "Email Address" roi nhap email
await page.getByLabel('Email Address').fill('test@mail.com');


// ===== 4. getByPlaceholder -- Tim input theo placeholder =====
// HTML: <input placeholder="Enter your email">
await page.getByPlaceholder('Enter your email').fill('test@mail.com');


// ===== 5. getByTestId -- Tim theo attribute data-testid =====
// HTML: <button data-testid="submit-btn">Submit</button>
// Developer them data-testid RIENG cho QA de test
await page.getByTestId('submit-btn').click();


// ===== 6. CSS/XPath -- CHI DUNG khi khong co cach nao khac =====
// '#email-input' = CSS selector, tim element co id="email-input"
await page.locator('#email-input').fill('test@mail.com');

// '.btn.primary' = CSS selector, tim element co class="btn" VA class="primary"
await page.locator('.btn.primary').click();
```

### Chaining Locators -- Tim element TRONG element

```typescript
// Van de: Trang co 10 nut "Add to Cart", lam sao click dung nut?
// Giai phap: Tim product card truoc, roi tim nut ben trong

// Buoc 1: Tim the san pham (product card) co text "iPhone 15"
// filter({ hasText: '...' }) = loc chi nhung element chua text nay
const productCard = page.locator('.product-card').filter({ hasText: 'iPhone 15' });

// Buoc 2: Trong the do, tim nut "Add to Cart" roi click
await productCard.getByRole('button', { name: 'Add to Cart' }).click();

// Tuong tu voi table: tim hang (row) co text "Nguyen Van An"
const row = page.getByRole('row').filter({ hasText: 'Nguyen Van An' });
// Trong hang do, tim nut "Edit" roi click
await row.getByRole('button', { name: 'Edit' }).click();
```

---

## Actions -- Tuong tac voi trang web

### Nhap lieu (Input)

```typescript
// fill() = XOA SACH o input roi nhap text moi vao
// Dung cho hau het truong hop nhap lieu
await page.getByLabel('Email').fill('test@mail.com');

// pressSequentially() = go TUNG KY TU mot (giong nguoi that dang go)
// Dung cho auto-complete, search box (can trigger keyup event)
// { delay: 100 } = cho 100ms giua moi ky tu
await page.getByLabel('Search').pressSequentially('iPhone', { delay: 100 });

// clear() = xoa sach noi dung o input
await page.getByLabel('Email').clear();

// selectOption() = chon gia tri trong dropdown <select>
// Chon theo value cua <option>
await page.getByLabel('Country').selectOption('vietnam');
// Hoac chon theo text hien thi cua <option>
await page.getByLabel('Country').selectOption({ label: 'Viet Nam' });

// check() = tich vao checkbox hoac radio button
await page.getByLabel('Remember me').check();       // Tich checkbox
// uncheck() = bo tich checkbox
await page.getByLabel('Remember me').uncheck();      // Bo tich checkbox
// Radio button cung dung check()
await page.getByLabel('Male').check();               // Chon radio "Male"

// setInputFiles() = upload file
// Truyen duong dan file can upload
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf');
// Upload nhieu file cung luc -- truyen mang (array)
await page.getByLabel('Upload').setInputFiles(['file1.pdf', 'file2.pdf']);
```

### Click (Nhan chuot)

```typescript
// click() = nhan chuot trai (binh thuong)
await page.getByRole('button', { name: 'Submit' }).click();

// dblclick() = nhan doi chuot (double-click)
await page.getByText('Edit').dblclick();

// click({ button: 'right' }) = nhan chuot phai (right-click)
// Thuong dung de mo context menu
await page.getByText('Item').click({ button: 'right' });

// click({ force: true }) = CUONG CHE click, bo qua kiem tra
// Dung khi element bi overlay (element khac che len tren)
// CHI DUNG khi can thiet -- binh thuong khong nen dung
await page.getByRole('button', { name: 'Submit' }).click({ force: true });
```

### Navigation (Dieu huong)

```typescript
// goto() = mo URL trong browser
// URL day du
await page.goto('https://example.com');
// URL tuong doi (dung voi baseURL trong config)
// Neu baseURL = 'https://example.com' thi '/login' = 'https://example.com/login'
await page.goto('/login');

// goBack() = nhan nut Back cua browser (quay lai trang truoc)
await page.goBack();

// goForward() = nhan nut Forward cua browser (tien len trang sau)
await page.goForward();

// reload() = tai lai trang (nhu nhan F5)
await page.reload();
```

---

## Assertions -- Kiem tra ket qua (pass hay fail?)

Playwright assertions **tu dong retry** cho den khi pass hoac timeout (het thoi gian cho). Ban **KHONG CAN viet sleep hay wait** truoc assertion.

### Hard Assertion vs Soft Assertion

**Hard Assertion (mac dinh):** Giong nhu bai thi ma DUNG NGAY khi sai cau dau tien. Sai cau 1 --> khong duoc lam cau 2, 3, 4. Ban chi biet minh sai cau 1, khong biet minh co sai cau khac khong.

**Soft Assertion:** Giong nhu bai thi binh thuong -- lam HET bai roi moi dem SAI. Sai cau 1, tiep tuc lam cau 2, 3, 4. Cuoi bai moi biet: sai cau 1 va cau 3. **Biet het tat ca loi cung luc.**

```typescript
// ===== HARD Assertion (mac dinh) =====
// Neu dong nay FAIL --> test DUNG NGAY, khong chay tiep
await expect(page.getByText('Welcome')).toBeVisible();
// Neu fail o tren --> dong duoi KHONG BAO GIO chay
await expect(page.getByText('Dashboard')).toBeVisible();

// ===== SOFT Assertion =====
// expect.soft() = ghi nhan FAIL nhung TIEP TUC chay test
await expect.soft(page.getByText('Welcome')).toBeVisible();     // Neu fail --> ghi nhan, chay tiep
await expect.soft(page.getByText('Dashboard')).toBeVisible();   // Van chay du dong tren fail
await expect.soft(page.getByText('Profile')).toBeVisible();     // Van chay tiep
// Cuoi test: report TAT CA soft failures cung luc
// "Test fail vi: Welcome khong hien thi, Profile khong hien thi"
```

**Khi nao dung Soft Assertion?**
- Kiem tra nhieu element tren 1 trang cung luc (dashboard co 10 widget, kiem tra het)
- Muon biet TAT CA loi, khong chi loi dau tien

### Page Assertions -- Kiem tra trang web

```typescript
// Kiem tra URL hien tai
// toHaveURL() = URL phai chinh xac la '/dashboard'
await expect(page).toHaveURL('/dashboard');
// Dung regex de kiem tra URL chua tu "dashboard"
await expect(page).toHaveURL(/.*dashboard/);

// Kiem tra title cua trang (text tren tab browser)
await expect(page).toHaveTitle('Dashboard - My App');
// Regex: title chua tu "Dashboard"
await expect(page).toHaveTitle(/Dashboard/);
```

### Element Assertions -- Kiem tra element

```typescript
// Tao bien (variable) de dung nhieu lan, khoi viet lai
const submitBtn = page.getByRole('button', { name: 'Submit' });
const emailInput = page.getByLabel('Email');
const errorMsg = page.locator('.error-message');

// --- Kiem tra hien thi (Visibility) ---
// toBeVisible() = element PHAI hien thi tren man hinh
await expect(submitBtn).toBeVisible();
// toBeHidden() = element PHAI bi an
await expect(errorMsg).toBeHidden();
// not.toBeVisible() = element KHONG duoc hien thi (tuong tu toBeHidden)
await expect(errorMsg).not.toBeVisible();

// --- Kiem tra text ---
// toHaveText() = text phai CHINH XAC la 'Invalid email'
await expect(errorMsg).toHaveText('Invalid email');
// toContainText() = text CHUA tu 'Invalid' (khong can chinh xac)
await expect(errorMsg).toContainText('Invalid');

// --- Kiem tra gia tri input ---
// toHaveValue() = gia tri trong o input phai la 'test@mail.com'
await expect(emailInput).toHaveValue('test@mail.com');
// toBeEmpty() = o input phai trong rong
await expect(emailInput).toBeEmpty();

// --- Kiem tra trang thai ---
// toBeEnabled() = element co the tuong tac (khong bi disabled)
await expect(submitBtn).toBeEnabled();
// toBeDisabled() = element bi vo hieu hoa (xam, khong click duoc)
await expect(submitBtn).toBeDisabled();
// toBeChecked() = checkbox/radio da duoc tich
await expect(page.getByLabel('Agree')).toBeChecked();

// --- Kiem tra so luong ---
// toHaveCount(10) = phai co CHINH XAC 10 element khop
await expect(page.locator('.product-card')).toHaveCount(10);

// --- Kiem tra CSS ---
// toHaveCSS() = kiem tra style cua element
await expect(errorMsg).toHaveCSS('color', 'rgb(255, 0, 0)');   // Mau do
// toHaveClass() = element co class nay khong
await expect(submitBtn).toHaveClass(/primary/);

// --- Kiem tra attribute ---
// toHaveAttribute() = element co attribute voi gia tri cu the
await expect(page.locator('img')).toHaveAttribute('alt', 'Logo');
```

---

## Test Organization -- To chuc test code

### Describe & Test

```typescript
import { test, expect } from '@playwright/test';

// test.describe() = nhom cac test lien quan lai
// Giong nhu thu muc (folder) nhom cac file
test.describe('Login Feature', () => {

  // test.beforeEach() = chay TRUOC MOI test trong nhom nay
  // Giong nhu nha hang don ban truoc moi vi khach
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

  // test.skip() = BO QUA test nay (khong chay)
  // Dung khi feature chua san sang hoac dang bi loi
  test.skip('should login with Google', async ({ page }) => {
    // TODO: implement when Google OAuth is ready
  });

  // test.only() = CHI CHAY test nay, bo qua tat ca test khac
  // Dung khi debug 1 test cu the
  // CANH BAO: nho xoa .only truoc khi commit code!
  // test.only('debug this test', async ({ page }) => { ... });
});
```

### Tags & Filtering -- Gan nhan va loc test

```typescript
// Gan tag vao ten test bang @tag
// @smoke = test quan trong, chay moi khi deploy
// @critical = test cuc ky quan trong
test('checkout flow @smoke @critical', async ({ page }) => {
  // ...
});

// @regression = test chay toan bo (mat nhieu thoi gian hon)
test('product review @regression', async ({ page }) => {
  // ...
});
```

```bash
# Chay CHI nhung test co tag @smoke
# --grep = loc theo pattern trong ten test
npx playwright test --grep @smoke

# Chay TAT CA test TRU nhung test co tag @regression
# --grep-invert = loc NGUOC (loai bo test khop)
npx playwright test --grep-invert @regression
```

---

## API Testing -- Test API voi Playwright (khong can Postman)

Playwright co **built-in API testing** -- ban khong can cai them tool rieng nhu Postman hay RestAssured.

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const API_URL = 'https://api.example.com';

  // { request } = Playwright tu dong cung cap doi tuong de goi API
  // Giong nhu { page } cho UI, { request } cho API
  test('GET /users should return users list', async ({ request }) => {

    // request.get() = gui HTTP GET request den URL
    // Giong nhu ban go URL tren browser de xem data
    const response = await request.get(`${API_URL}/users`);

    // Kiem tra HTTP status code = 200 (thanh cong)
    // 200 = OK, 201 = Created, 400 = Bad Request, 404 = Not Found, 500 = Server Error
    expect(response.status()).toBe(200);

    // response.json() = chuyen response body thanh doi tuong JavaScript
    const body = await response.json();

    // Kiem tra mang users co it nhat 1 phan tu
    expect(body.length).toBeGreaterThan(0);
    // Kiem tra phan tu dau tien co truong 'name' va 'email'
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('email');
  });

  test('POST /users should create user', async ({ request }) => {

    // request.post() = gui HTTP POST request (tao du lieu moi)
    // data = body cua request (du lieu gui len server)
    const response = await request.post(`${API_URL}/users`, {
      data: {
        name: 'Test User',
        email: 'test@mail.com'
      }
    });

    // 201 = Created (tao thanh cong)
    expect(response.status()).toBe(201);

    const user = await response.json();
    expect(user.name).toBe('Test User');
    // toBeDefined() = truong 'id' phai ton tai (server tu tao)
    expect(user.id).toBeDefined();
  });

  // BIG FEATURE: Ket hop API + UI trong cung 1 test
  // Dung API de SETUP nhanh, dung UI de KIEM TRA
  test('API + UI: Create via API, verify on UI', async ({ request, page }) => {

    // Buoc 1: Tao user qua API (NHANH hon tao qua UI)
    // Thay vi: goto login page -> fill form -> click register -> ...
    // Chi can 1 API call la xong
    const response = await request.post(`${API_URL}/users`, {
      data: { name: 'UI Test User', email: 'uitest@mail.com' }
    });
    const user = await response.json();

    // Buoc 2: Mo trang web va kiem tra user vua tao hien thi dung
    await page.goto(`/users/${user.id}`);
    await expect(page.getByText('UI Test User')).toBeVisible();
  });
});
```

---

## Configuration -- Cau hinh Playwright

### playwright.config.ts

```typescript
// defineConfig = ham tao cau hinh Playwright
// devices = danh sach thiet bi co san (Desktop Chrome, iPhone 14...)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Thu muc chua tat ca file test
  testDir: './tests',

  // fullyParallel = true: chay tat ca test SONG SONG (cung luc)
  // Nhanh hon nhieu so voi chay tuan tu (1 test xong moi chay test tiep)
  fullyParallel: true,

  // forbidOnly: cam dung test.only tren CI (moi truong tu dong)
  // Neu quen xoa test.only --> CI se bao loi thay vi chi chay 1 test
  // process.env.CI = bien moi truong, co gia tri tren CI server
  // !! = chuyen gia tri thanh true/false
  forbidOnly: !!process.env.CI,

  // retries = so lan thu lai khi test fail
  // Tren CI: thu lai 2 lan (vi CI hay co van de moi truong)
  // Tren local: khong thu lai (0) de thay loi ngay
  retries: process.env.CI ? 2 : 0,

  // workers = so luong test chay DONG THOI
  // Tren CI: 1 worker (on dinh hon)
  // Tren local: undefined = tu dong chon theo so CPU
  workers: process.env.CI ? 1 : undefined,

  // reporter = cach hien thi ket qua test
  reporter: [
    ['html', { open: 'never' }],      // Tao HTML report (mo bang browser)
    ['list'],                           // Hien thi tren terminal (console)
    // ['junit', { outputFile: 'results.xml' }],  // Cho CI/CD tools doc
  ],

  // use = cau hinh CHUNG cho TAT CA tests
  use: {
    // baseURL = URL goc cua ung dung
    // Khi ban viet page.goto('/login') --> thanh 'https://staging.example.com/login'
    baseURL: 'https://staging.example.com',

    // Chup screenshot khi test fail (de xem loi o dau)
    screenshot: 'only-on-failure',

    // Quay video khi test fail
    video: 'retain-on-failure',

    // Trace = ghi lai TOAN BO qua trinh test (xem phan Debugging ben duoi)
    trace: 'retain-on-failure',

    // Timeout cho moi hanh dong (click, fill, expect...)
    // 10000 = 10 giay. Qua 10 giay ma chua xong --> fail
    actionTimeout: 10000,
  },

  // projects = danh sach browser/thiet bi de test
  // Cung 1 test se chay tren NHIEU browser
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },    // Chrome tren desktop
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },   // Firefox tren desktop
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },    // Safari tren desktop
    },
    // Mobile -- test tren dien thoai (emulation, khong phai dien thoai that)
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },           // Android phone
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },          // iPhone
    },
  ],
});
```

---

## Debugging -- Tim va sua loi trong test

### 1. UI Mode (KHUYEN DUNG)

```bash
npx playwright test --ui
```

Mo giao dien truc quan: xem tung buoc test chay, click vao buoc bat ky de xem DOM snapshot tai thoi diem do. **Day la cach tot nhat de hieu test dang lam gi.**

### 2. Debug Mode -- Playwright Inspector

```bash
# Mo Playwright Inspector -- dung tung buoc, xem tung hanh dong
npx playwright test --debug

# Debug 1 file cu the
npx playwright test tests/login.spec.ts --debug
```

Inspector cho phep: chay tung buoc (step-by-step), xem locator, thu locator moi.

### 3. Trace Viewer -- "Camera an ninh" phat lai test

**Trace Viewer giong nhu camera an ninh (security camera replay).** Ban co the quay nguoc thoi gian va xem CHINH XAC dieu gi da xay ra tai moi buoc cua test.

```bash
# Xem trace sau khi test fail
npx playwright show-trace trace.zip
```

Trace ghi lai:
- **Screenshot** tai MOI buoc (truoc va sau moi hanh dong)
- **DOM snapshot** -- HTML cua trang tai thoi diem do (ban co the inspect element)
- **Network requests** -- tat ca API call, hinh anh, CSS duoc tai
- **Console logs** -- loi JavaScript tren browser
- **Thoi gian** -- moi buoc mat bao lau

**Khi nao dung Trace?**
- Test fail tren CI nhung pass tren may ban --> xem trace cua CI de hieu tai sao
- Test fail vao ban dem (khong ai nhin thay) --> xem trace sang hom sau
- Bug kho tai hien --> xem trace de thay chinh xac step nao sai

### 4. Codegen -- "Playwright xem ban click roi viet code cho ban"

```bash
# Mo browser, ban click tren trang web, Playwright tu dong viet code
npx playwright codegen https://example.com
```

**Codegen la gi?** Ban mo trang web, ban click vao nut, nhap text, chon dropdown... va Playwright **tu dong viet code tuong ung** cho ban. Giong nhu co nguoi ngoi canh ghi chep lai moi hanh dong cua ban thanh code.

Codegen rat huu ich khi:
- **Tim dung locator** -- ban click vao element, Codegen cho ban locator tot nhat
- **Tao code nhanh** -- click xong la co code, chi can copy-paste vao test
- **Hoc syntax** -- nguoi moi hoc xem code Codegen tao ra de hieu cach viet
- **Test nhanh** -- thu nhanh 1 flow truoc khi viet test chinh thuc

---

## Real-world Example: E-commerce Test Suite

```typescript
// tests/checkout/checkout-flow.spec.ts
// Test quy trinh thanh toan -- tu login den dat hang thanh cong

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

// @smoke = chay moi khi deploy
// @critical = test cuc ky quan trong, fail = khong duoc deploy
test.describe('Checkout Flow @smoke @critical', () => {

  // Khai bao bien cho tat ca Page Objects
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // Truoc moi test: tao Page Objects va login
  test.beforeEach(async ({ page }) => {
    // Tao doi tuong Page Object
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login truoc moi test
    await loginPage.goto();
    await loginPage.login('customer@test.com', 'Pass@123');
  });

  test('should complete checkout with valid payment', async ({ page }) => {
    // Buoc 1: Tim va them san pham vao gio hang
    await productPage.searchProduct('iPhone 15');
    await productPage.addToCart('iPhone 15');

    // Buoc 2: Vao gio hang, kiem tra
    await cartPage.goto();
    await cartPage.expectItemCount(1);          // Phai co 1 san pham
    await cartPage.expectTotalGreaterThan(0);   // Tong tien > 0

    // Buoc 3: Bat dau thanh toan
    await cartPage.proceedToCheckout();

    // Buoc 4: Dien thong tin giao hang
    await checkoutPage.fillShipping({
      address: '123 Nguyen Hue',
      city: 'Ho Chi Minh',
      phone: '0901234567'
    });

    // Buoc 5: Dien thong tin thanh toan
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',    // So the test (Visa)
      expiry: '12/28',                   // Ngay het han
      cvv: '123'                         // Ma bao mat
    });
    await checkoutPage.placeOrder();             // Nhan nut dat hang

    // Buoc 6: Kiem tra dat hang thanh cong
    await checkoutPage.expectOrderSuccess();
    const orderId = await checkoutPage.getOrderId();
    // toMatch() = kiem tra theo regex
    // /^ORD-\d+$/ = bat dau bang "ORD-" theo sau la cac so
    expect(orderId).toMatch(/^ORD-\d+$/);
  });

  test('should show error with expired card', async ({ page }) => {
    // Them san pham va vao checkout
    await productPage.addToCart('iPhone 15');
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    // Dien thong tin giao hang
    await checkoutPage.fillShipping({
      address: '123 Main St', city: 'HCM', phone: '0901234567'
    });

    // Dien the HET HAN (01/20 = thang 1 nam 2020 -- da qua)
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',
      expiry: '01/20',    // Expired! Da het han
      cvv: '123'
    });
    await checkoutPage.placeOrder();

    // Kiem tra hien thi loi the het han
    await checkoutPage.expectPaymentError('Card has expired');
  });
});
```

---

## Tom tat chuong

| Feature | Y nghia | Tai sao quan trong |
|---|---|---|
| **Architecture** | Giao tiep TRUC TIEP voi browser (khong qua trung gian) | Nhanh hon Selenium 2-3 lan |
| **Auto-wait** | Tu dong cho element san sang truoc khi tuong tac | Giam 90% flaky tests, khong can viet wait |
| **Locators** | getByRole > getByText > getByTestId > CSS | Test khong fail khi developer doi CSS |
| **Assertions** | Tu dong retry, co hard va soft assertion | Hard = dung ngay khi fail, Soft = chay het roi dem loi |
| **Trace Viewer** | Camera an ninh phat lai toan bo test | Xem chinh xac buoc nao sai, du khong o do luc test chay |
| **Codegen** | Xem ban click, viet code tu dong | Tim locator nhanh, tao boilerplate code |
| **API Testing** | Test API built-in, ket hop API + UI | Khong can Postman, setup bang API nhanh hon UI |
| **Multi-browser** | Chromium + Firefox + WebKit + Mobile | 1 test chay tren nhieu browser tu dong |

::: tip Tiep theo
- Da nam vung Playwright --> Tim hieu [Selenium](./selenium) de so sanh
- Muon biet nen chon tool nao --> Xem [Automation Strategy](./automation-strategy)
:::
