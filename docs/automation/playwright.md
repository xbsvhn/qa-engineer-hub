# Playwright

## Playwright là gì?

Playwright là **modern web testing framework** do Microsoft phát triển (2020). Nó nhanh chóng trở thành tool automation **phổ biến nhất** hiện nay, vượt qua Selenium và Cypress.

Nhưng trước khi học cách dùng, bạn phải hiểu **TẠI SAO nó nhanh hơn và mạnh hơn**.

---

## Kiến trúc (Architecture) -- TẠI SAO Playwright nhanh hơn Selenium?

### Vấn đề của Selenium: nói chuyện qua TRUNG GIAN

Hãy tưởng tượng bạn muốn gọi điện cho bạn mình:
- **Selenium** = Bạn gọi cho LỄ TÂN (receptionist), lễ tân ghi lại lời nhắn, rồi lễ tân gọi cho bạn mình, bạn mình trả lời lễ tân, lễ tân trả lời lại bạn. **Chậm, mất thời gian, có thể sai lệch.**
- **Playwright** = Bạn gọi TRỰC TIẾP cho bạn mình. **Nhanh, chính xác, không mất thông tin.**

Đây là sự khác biệt cơ bản nhất:

```
Selenium (CHẬM -- qua nhiều bước trung gian):
  Test code --> WebDriver Protocol --> HTTP Request --> Browser Driver (.exe) --> Browser
  (4 bước, mỗi bước mất thời gian)

Playwright (NHANH -- nói chuyện trực tiếp):
  Test code --> CDP/WebSocket --> Browser
  (2 bước, kết nối trực tiếp)
```

**CDP = Chrome DevTools Protocol** -- giao thức (protocol) mà Chrome cung cấp để giao tiếp trực tiếp với browser. Khi bạn mở DevTools (F12) trong Chrome, nó cũng dùng CDP. Playwright dùng chính giao thức này.

**WebSocket** = kết nối 2 chiều, liên tục. Không cần gửi request rồi chờ response như HTTP. Giống như cuộc gọi điện thoại -- 2 bên nói chuyện liên tục, không cần gác máy rồi gọi lại.

### Kiến trúc Playwright chi tiết

```
┌──────────────────────┐
│   Your Test Code     │    Bạn viết code ở đây
│   (TypeScript)       │
└──────────┬───────────┘
           │ Playwright API (các hàm như click(), fill(), expect()...)
┌──────────▼───────────┐
│   Playwright Library │    Thư viện Playwright xử lý mọi thứ
│   (CDP / WebSocket)  │    Giao tiếp TRỰC TIẾP với browser
└──────────┬───────────┘
     ┌─────┼─────┐
     ▼     ▼     ▼
  Chromium Firefox WebKit     3 browser THẬT (không cần driver riêng)
```

**So sánh với Selenium:**
| | Selenium | Playwright |
|---|---|---|
| Cần cài driver riêng? | Có (chromedriver.exe, geckodriver.exe) | Không (tự động) |
| Giao tiếp | Qua HTTP (chậm) | Qua WebSocket (nhanh) |
| Cập nhật driver | Thủ công, hay bị lỗi version | Tự động, không lo |
| Multi-browser | Cần cài từng driver | 1 lệnh cài hết |

---

## Auto-Wait -- THE KILLER FEATURE (tính năng quan trọng nhất)

### Vấn đề của Selenium: phải TỰ VIẾT wait MỌI LÚC MỌI NƠI

Trong Selenium, trước khi làm BẤT CỨ GÌ, bạn phải tự viết code chờ:

```
// Selenium (Java) -- PHẢI viết 4 dòng wait chỉ để click 1 nút:
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Bước 1: chờ element xuất hiện trong DOM
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("button")));

// Bước 2: chờ element hiển thị (visible)
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("button")));

// Bước 3: chờ element có thể click được (không bị che, không bị disabled)
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));

// Bước 4: CUỐI CÙNG mới click được
button.click();
```

Nếu bạn **QUÊN** viết wait --> test bị "flaky" (lúc pass lúc fail). Đây là cơ ác mộng lớn nhất của Selenium.

### Giải pháp của Playwright: TỰ ĐỘNG chờ, bạn không cần làm gì

```typescript
// Playwright -- CHỈ CẦN 1 DÒNG:
await page.click('#button');

// Playwright TỰ ĐỘNG làm TẤT CẢ những việc này TRƯỚC khi click:
// 1. Chờ element xuất hiện trong DOM          ✅ Tự động
// 2. Chờ element visible (hiển thị)           ✅ Tự động
// 3. Chờ element stable (không đang animation) ✅ Tự động
// 4. Chờ element enabled (không bị disabled)   ✅ Tự động
// 5. Chờ không bị element khác che (overlay)   ✅ Tự động
// 6. Cuối cùng mới click                      ✅ Tự động
//
// Bạn KHÔNG CẦN viết bất kỳ dòng wait nào. Playwright lo hết.
```

**Đây là lý do #1 tại sao Playwright ít flaky test hơn Selenium.**

### Khi nào CẦN explicit wait (hiếm khi)

```typescript
// Chờ chuyển trang (navigation)
// waitForURL() = chờ đến khi URL thay đổi thành giá trị mong muốn
await page.waitForURL('/dashboard');

// Chờ API response về
// waitForResponse() = chờ đến khi browser nhận được response từ URL này
// ** = wildcard, bất kỳ domain nào
const response = await page.waitForResponse('**/api/users');

// Chờ loading spinner biến mất
// state: 'hidden' = chờ đến khi element KHÔNG CÒN hiển thị
await page.waitForSelector('.loading-spinner', { state: 'hidden' });

// Chờ trang load xong hoàn toàn (không còn request nào)
// 'networkidle' = không có request nào trong 500ms
await page.waitForLoadState('networkidle');
```

---

## Quick Start -- Bắt đầu trong 2 phút

### Cài đặt

```bash
# Tạo project Playwright mới từ đầu
# npm init = tạo project Node.js
# playwright@latest = phiên bản Playwright mới nhất
npm init playwright@latest

# HOẶC thêm Playwright vào project có sẵn
# -D = devDependency (chỉ dùng khi phát triển, không cần khi deploy)
npm install -D @playwright/test

# Cài browser cho Playwright (Chromium, Firefox, WebKit)
npx playwright install
```

### Test đầu tiên

```typescript
// tests/example.spec.ts

// import = nhập thư viện
// test = hàm để tạo test case
// expect = hàm để kiểm tra kết quả
import { test, expect } from '@playwright/test';

// test('tên test', async ({ page }) => { ... })
// 'tên test' = mô tả test làm gì
// async = hàm bất đồng bộ (cần chờ browser)
// { page } = Playwright tự động tạo 1 tab browser mới cho bạn
test('has correct title', async ({ page }) => {
  // goto() = mở URL trong browser
  await page.goto('https://playwright.dev');

  // expect(page).toHaveTitle() = kiểm tra title của trang
  // /Playwright/ = Regular Expression, tìm từ "Playwright" bất kỳ đâu
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link works', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // getByRole('link', { name: 'Get started' })
  // = tìm element có vai trò (role) là "link" và text là "Get started"
  // click() = nhấn chuột vào link đó
  await page.getByRole('link', { name: 'Get started' }).click();

  // Kiểm tra heading "Installation" hiển thị sau khi click
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

### Chạy test

```bash
# Chạy TẤT CẢ tests
npx playwright test

# Chạy với UI mode (KHUYÊN DÙNG khi đang viết test)
# Mở giao diện để xem từng bước test chạy
npx playwright test --ui

# Chạy có browser hiện lên (bình thường Playwright chạy ẩn)
# headed = hiện browser, headless = ẩn browser
npx playwright test --headed

# Chạy 1 file cụ thể
npx playwright test tests/login.spec.ts

# Chạy test có chứa keyword "login" trong tên
# -g = grep (lọc theo tên)
npx playwright test -g "login"

# Xem report sau khi chạy xong
npx playwright show-report
```

---

## Locators -- Cách tìm element trên trang web

**Locator = địa chỉ của element.** Giống như bạn cần địa chỉ nhà để gửi thư, Playwright cần locator để biết click vào đâu, nhập text vào đâu.

### Thứ tự ưu tiên (QUAN TRỌNG -- phải học thuộc)

```
1. getByRole()        ← TỐT NHẤT -- resilient nhất
2. getByText()        ← Tìm theo text hiển thị
3. getByLabel()       ← Tìm form field theo label
4. getByPlaceholder() ← Tìm input theo placeholder
5. getByTestId()      ← Tìm theo data-testid attribute
6. locator()          ← CSS/XPath -- CUỐI CÙNG mới dùng
```

### TẠI SAO thứ tự này quan trọng?

**getByRole() tốt nhất vì:** Developer có thể đổi CSS class bất kỳ lúc nào (`.btn-primary` thành `.button-main`). Nhưng **role của element hầu như KHÔNG BAO GIỜ thay đổi** -- button vẫn là button, link vẫn là link, heading vẫn là heading. Test của bạn vẫn pass dù developer đổi CSS.

**locator() (CSS/XPath) tệ nhất vì:** CSS class thay đổi thường xuyên. Developer đổi `.login-btn` thành `.signin-button` --> test fail ngay. Bạn phải sửa test dù ứng dụng không có lỗi gì.

### Ví dụ chi tiết -- mỗi dòng có giải thích

```typescript
// ===== 1. getByRole -- TỐT NHẤT, ưu tiên dùng =====
// Tìm element theo VAI TRÒ của nó (button, link, heading, textbox...)
// { name: 'Submit' } = có text là "Submit"

// Tìm nút (button) có text "Submit" rồi click
await page.getByRole('button', { name: 'Submit' }).click();

// Tìm liên kết (link) có text "Sign up" rồi click
await page.getByRole('link', { name: 'Sign up' }).click();

// Tìm tiêu đề (heading) có text "Welcome"
await page.getByRole('heading', { name: 'Welcome' });

// Tìm ô nhập text (textbox) có label "Email" rồi nhập email
await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');

// Tìm checkbox có label "Remember me" rồi tích vào
await page.getByRole('checkbox', { name: 'Remember me' }).check();


// ===== 2. getByText -- Tìm theo text hiển thị trên màn hình =====
// Tìm element có text "Login" rồi click
await page.getByText('Login').click();

// /welcome/i = Regular Expression
// i = case-insensitive (không phân biệt hoa thường)
// Tìm "welcome", "Welcome", "WELCOME" đều được
await page.getByText(/welcome/i);


// ===== 3. getByLabel -- Tìm form field theo label =====
// HTML: <label for="email">Email Address</label><input id="email">
// Tìm input có label "Email Address" rồi nhập email
await page.getByLabel('Email Address').fill('test@mail.com');


// ===== 4. getByPlaceholder -- Tìm input theo placeholder =====
// HTML: <input placeholder="Enter your email">
await page.getByPlaceholder('Enter your email').fill('test@mail.com');


// ===== 5. getByTestId -- Tìm theo attribute data-testid =====
// HTML: <button data-testid="submit-btn">Submit</button>
// Developer thêm data-testid RIÊNG cho QA để test
await page.getByTestId('submit-btn').click();


// ===== 6. CSS/XPath -- CHỈ DÙNG khi không có cách nào khác =====
// '#email-input' = CSS selector, tìm element có id="email-input"
await page.locator('#email-input').fill('test@mail.com');

// '.btn.primary' = CSS selector, tìm element có class="btn" VÀ class="primary"
await page.locator('.btn.primary').click();
```

### Chaining Locators -- Tìm element TRONG element

```typescript
// Vấn đề: Trang có 10 nút "Add to Cart", làm sao click đúng nút?
// Giải pháp: Tìm product card trước, rồi tìm nút bên trong

// Bước 1: Tìm thẻ sản phẩm (product card) có text "iPhone 15"
// filter({ hasText: '...' }) = lọc chỉ những element chứa text này
const productCard = page.locator('.product-card').filter({ hasText: 'iPhone 15' });

// Bước 2: Trong thẻ đó, tìm nút "Add to Cart" rồi click
await productCard.getByRole('button', { name: 'Add to Cart' }).click();

// Tương tự với table: tìm hàng (row) có text "Nguyen Van An"
const row = page.getByRole('row').filter({ hasText: 'Nguyen Van An' });
// Trong hàng đó, tìm nút "Edit" rồi click
await row.getByRole('button', { name: 'Edit' }).click();
```

---

## Actions -- Tương tác với trang web

### Nhập liệu (Input)

```typescript
// fill() = XÓA SẠCH ô input rồi nhập text mới vào
// Dùng cho hầu hết trường hợp nhập liệu
await page.getByLabel('Email').fill('test@mail.com');

// pressSequentially() = gõ TỪNG KÝ TỰ một (giống người thật đang gõ)
// Dùng cho auto-complete, search box (cần trigger keyup event)
// { delay: 100 } = chờ 100ms giữa mỗi ký tự
await page.getByLabel('Search').pressSequentially('iPhone', { delay: 100 });

// clear() = xóa sạch nội dung ô input
await page.getByLabel('Email').clear();

// selectOption() = chọn giá trị trong dropdown <select>
// Chọn theo value của <option>
await page.getByLabel('Country').selectOption('vietnam');
// Hoặc chọn theo text hiển thị của <option>
await page.getByLabel('Country').selectOption({ label: 'Viet Nam' });

// check() = tích vào checkbox hoặc radio button
await page.getByLabel('Remember me').check();       // Tích checkbox
// uncheck() = bỏ tích checkbox
await page.getByLabel('Remember me').uncheck();      // Bỏ tích checkbox
// Radio button cũng dùng check()
await page.getByLabel('Male').check();               // Chọn radio "Male"

// setInputFiles() = upload file
// Truyền đường dẫn file cần upload
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf');
// Upload nhiều file cùng lúc -- truyền mảng (array)
await page.getByLabel('Upload').setInputFiles(['file1.pdf', 'file2.pdf']);
```

### Click (Nhấn chuột)

```typescript
// click() = nhấn chuột trái (bình thường)
await page.getByRole('button', { name: 'Submit' }).click();

// dblclick() = nhấn đôi chuột (double-click)
await page.getByText('Edit').dblclick();

// click({ button: 'right' }) = nhấn chuột phải (right-click)
// Thường dùng để mở context menu
await page.getByText('Item').click({ button: 'right' });

// click({ force: true }) = CƯỠNG CHẾ click, bỏ qua kiểm tra
// Dùng khi element bị overlay (element khác che lên trên)
// CHỈ DÙNG khi cần thiết -- bình thường không nên dùng
await page.getByRole('button', { name: 'Submit' }).click({ force: true });
```

### Navigation (Điều hướng)

```typescript
// goto() = mở URL trong browser
// URL đầy đủ
await page.goto('https://example.com');
// URL tương đối (dùng với baseURL trong config)
// Nếu baseURL = 'https://example.com' thì '/login' = 'https://example.com/login'
await page.goto('/login');

// goBack() = nhấn nút Back của browser (quay lại trang trước)
await page.goBack();

// goForward() = nhấn nút Forward của browser (tiến lên trang sau)
await page.goForward();

// reload() = tải lại trang (như nhấn F5)
await page.reload();
```

---

## Assertions -- Kiểm tra kết quả (pass hay fail?)

Playwright assertions **tự động retry** cho đến khi pass hoặc timeout (hết thời gian chờ). Bạn **KHÔNG CẦN viết sleep hay wait** trước assertion.

### Hard Assertion vs Soft Assertion

**Hard Assertion (mặc định):** Giống như bài thi mà DỪNG NGAY khi sai câu đầu tiên. Sai câu 1 --> không được làm câu 2, 3, 4. Bạn chỉ biết mình sai câu 1, không biết mình có sai câu khác không.

**Soft Assertion:** Giống như bài thi bình thường -- làm HẾT bài rồi mới đếm SAI. Sai câu 1, tiếp tục làm câu 2, 3, 4. Cuối bài mới biết: sai câu 1 và câu 3. **Biết hết tất cả lỗi cùng lúc.**

```typescript
// ===== HARD Assertion (mặc định) =====
// Nếu dòng này FAIL --> test DỪNG NGAY, không chạy tiếp
await expect(page.getByText('Welcome')).toBeVisible();
// Nếu fail ở trên --> dòng dưới KHÔNG BAO GIỜ chạy
await expect(page.getByText('Dashboard')).toBeVisible();

// ===== SOFT Assertion =====
// expect.soft() = ghi nhận FAIL nhưng TIẾP TỤC chạy test
await expect.soft(page.getByText('Welcome')).toBeVisible();     // Nếu fail --> ghi nhận, chạy tiếp
await expect.soft(page.getByText('Dashboard')).toBeVisible();   // Vẫn chạy dù dòng trên fail
await expect.soft(page.getByText('Profile')).toBeVisible();     // Vẫn chạy tiếp
// Cuối test: report TẤT CẢ soft failures cùng lúc
// "Test fail vì: Welcome không hiển thị, Profile không hiển thị"
```

**Khi nào dùng Soft Assertion?**
- Kiểm tra nhiều element trên 1 trang cùng lúc (dashboard có 10 widget, kiểm tra hết)
- Muốn biết TẤT CẢ lỗi, không chỉ lỗi đầu tiên

### Page Assertions -- Kiểm tra trang web

```typescript
// Kiểm tra URL hiện tại
// toHaveURL() = URL phải chính xác là '/dashboard'
await expect(page).toHaveURL('/dashboard');
// Dùng regex để kiểm tra URL chứa từ "dashboard"
await expect(page).toHaveURL(/.*dashboard/);

// Kiểm tra title của trang (text trên tab browser)
await expect(page).toHaveTitle('Dashboard - My App');
// Regex: title chứa từ "Dashboard"
await expect(page).toHaveTitle(/Dashboard/);
```

### Element Assertions -- Kiểm tra element

```typescript
// Tạo biến (variable) để dùng nhiều lần, khỏi viết lại
const submitBtn = page.getByRole('button', { name: 'Submit' });
const emailInput = page.getByLabel('Email');
const errorMsg = page.locator('.error-message');

// --- Kiểm tra hiển thị (Visibility) ---
// toBeVisible() = element PHẢI hiển thị trên màn hình
await expect(submitBtn).toBeVisible();
// toBeHidden() = element PHẢI bị ẩn
await expect(errorMsg).toBeHidden();
// not.toBeVisible() = element KHÔNG được hiển thị (tương tự toBeHidden)
await expect(errorMsg).not.toBeVisible();

// --- Kiểm tra text ---
// toHaveText() = text phải CHÍNH XÁC là 'Invalid email'
await expect(errorMsg).toHaveText('Invalid email');
// toContainText() = text CHỨA từ 'Invalid' (không cần chính xác)
await expect(errorMsg).toContainText('Invalid');

// --- Kiểm tra giá trị input ---
// toHaveValue() = giá trị trong ô input phải là 'test@mail.com'
await expect(emailInput).toHaveValue('test@mail.com');
// toBeEmpty() = ô input phải trống rỗng
await expect(emailInput).toBeEmpty();

// --- Kiểm tra trạng thái ---
// toBeEnabled() = element có thể tương tác (không bị disabled)
await expect(submitBtn).toBeEnabled();
// toBeDisabled() = element bị vô hiệu hóa (xám, không click được)
await expect(submitBtn).toBeDisabled();
// toBeChecked() = checkbox/radio đã được tích
await expect(page.getByLabel('Agree')).toBeChecked();

// --- Kiểm tra số lượng ---
// toHaveCount(10) = phải có CHÍNH XÁC 10 element khớp
await expect(page.locator('.product-card')).toHaveCount(10);

// --- Kiểm tra CSS ---
// toHaveCSS() = kiểm tra style của element
await expect(errorMsg).toHaveCSS('color', 'rgb(255, 0, 0)');   // Màu đỏ
// toHaveClass() = element có class này không
await expect(submitBtn).toHaveClass(/primary/);

// --- Kiểm tra attribute ---
// toHaveAttribute() = element có attribute với giá trị cụ thể
await expect(page.locator('img')).toHaveAttribute('alt', 'Logo');
```

---

## Test Organization -- Tổ chức test code

### Describe & Test

```typescript
import { test, expect } from '@playwright/test';

// test.describe() = nhóm các test liên quan lại
// Giống như thư mục (folder) nhóm các file
test.describe('Login Feature', () => {

  // test.beforeEach() = chạy TRƯỚC MỖI test trong nhóm này
  // Giống như nhà hàng dọn bàn trước mỗi vị khách
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

  // test.skip() = BỎ QUA test này (không chạy)
  // Dùng khi feature chưa sẵn sàng hoặc đang bị lỗi
  test.skip('should login with Google', async ({ page }) => {
    // TODO: implement when Google OAuth is ready
  });

  // test.only() = CHỈ CHẠY test này, bỏ qua tất cả test khác
  // Dùng khi debug 1 test cụ thể
  // CẢNH BÁO: nhớ xóa .only trước khi commit code!
  // test.only('debug this test', async ({ page }) => { ... });
});
```

### Tags & Filtering -- Gắn nhãn và lọc test

```typescript
// Gắn tag vào tên test bằng @tag
// @smoke = test quan trọng, chạy mỗi khi deploy
// @critical = test cực kỳ quan trọng
test('checkout flow @smoke @critical', async ({ page }) => {
  // ...
});

// @regression = test chạy toàn bộ (mất nhiều thời gian hơn)
test('product review @regression', async ({ page }) => {
  // ...
});
```

```bash
# Chạy CHỈ những test có tag @smoke
# --grep = lọc theo pattern trong tên test
npx playwright test --grep @smoke

# Chạy TẤT CẢ test TRỪ những test có tag @regression
# --grep-invert = lọc NGƯỢC (loại bỏ test khớp)
npx playwright test --grep-invert @regression
```

---

## API Testing -- Test API với Playwright (không cần Postman)

Playwright có **built-in API testing** -- bạn không cần cài thêm tool riêng như Postman hay RestAssured.

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const API_URL = 'https://api.example.com';

  // { request } = Playwright tự động cung cấp đối tượng để gọi API
  // Giống như { page } cho UI, { request } cho API
  test('GET /users should return users list', async ({ request }) => {

    // request.get() = gửi HTTP GET request đến URL
    // Giống như bạn gõ URL trên browser để xem data
    const response = await request.get(`${API_URL}/users`);

    // Kiểm tra HTTP status code = 200 (thành công)
    // 200 = OK, 201 = Created, 400 = Bad Request, 404 = Not Found, 500 = Server Error
    expect(response.status()).toBe(200);

    // response.json() = chuyển response body thành đối tượng JavaScript
    const body = await response.json();

    // Kiểm tra mảng users có ít nhất 1 phần tử
    expect(body.length).toBeGreaterThan(0);
    // Kiểm tra phần tử đầu tiên có trường 'name' và 'email'
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('email');
  });

  test('POST /users should create user', async ({ request }) => {

    // request.post() = gửi HTTP POST request (tạo dữ liệu mới)
    // data = body của request (dữ liệu gửi lên server)
    const response = await request.post(`${API_URL}/users`, {
      data: {
        name: 'Test User',
        email: 'test@mail.com'
      }
    });

    // 201 = Created (tạo thành công)
    expect(response.status()).toBe(201);

    const user = await response.json();
    expect(user.name).toBe('Test User');
    // toBeDefined() = trường 'id' phải tồn tại (server tự tạo)
    expect(user.id).toBeDefined();
  });

  // BIG FEATURE: Kết hợp API + UI trong cùng 1 test
  // Dùng API để SETUP nhanh, dùng UI để KIỂM TRA
  test('API + UI: Create via API, verify on UI', async ({ request, page }) => {

    // Bước 1: Tạo user qua API (NHANH hơn tạo qua UI)
    // Thay vì: goto login page -> fill form -> click register -> ...
    // Chỉ cần 1 API call là xong
    const response = await request.post(`${API_URL}/users`, {
      data: { name: 'UI Test User', email: 'uitest@mail.com' }
    });
    const user = await response.json();

    // Bước 2: Mở trang web và kiểm tra user vừa tạo hiển thị đúng
    await page.goto(`/users/${user.id}`);
    await expect(page.getByText('UI Test User')).toBeVisible();
  });
});
```

---

## Configuration -- Cấu hình Playwright

### playwright.config.ts

```typescript
// defineConfig = hàm tạo cấu hình Playwright
// devices = danh sách thiết bị có sẵn (Desktop Chrome, iPhone 14...)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Thư mục chứa tất cả file test
  testDir: './tests',

  // fullyParallel = true: chạy tất cả test SONG SONG (cùng lúc)
  // Nhanh hơn nhiều so với chạy tuần tự (1 test xong mới chạy test tiếp)
  fullyParallel: true,

  // forbidOnly: cấm dùng test.only trên CI (môi trường tự động)
  // Nếu quên xóa test.only --> CI sẽ báo lỗi thay vì chỉ chạy 1 test
  // process.env.CI = biến môi trường, có giá trị trên CI server
  // !! = chuyển giá trị thành true/false
  forbidOnly: !!process.env.CI,

  // retries = số lần thử lại khi test fail
  // Trên CI: thử lại 2 lần (vì CI hay có vấn đề môi trường)
  // Trên local: không thử lại (0) để thấy lỗi ngay
  retries: process.env.CI ? 2 : 0,

  // workers = số lượng test chạy ĐỒNG THỜI
  // Trên CI: 1 worker (ổn định hơn)
  // Trên local: undefined = tự động chọn theo số CPU
  workers: process.env.CI ? 1 : undefined,

  // reporter = cách hiển thị kết quả test
  reporter: [
    ['html', { open: 'never' }],      // Tạo HTML report (mở bằng browser)
    ['list'],                           // Hiển thị trên terminal (console)
    // ['junit', { outputFile: 'results.xml' }],  // Cho CI/CD tools đọc
  ],

  // use = cấu hình CHUNG cho TẤT CẢ tests
  use: {
    // baseURL = URL gốc của ứng dụng
    // Khi bạn viết page.goto('/login') --> thành 'https://staging.example.com/login'
    baseURL: 'https://staging.example.com',

    // Chụp screenshot khi test fail (để xem lỗi ở đâu)
    screenshot: 'only-on-failure',

    // Quay video khi test fail
    video: 'retain-on-failure',

    // Trace = ghi lại TOÀN BỘ quá trình test (xem phần Debugging bên dưới)
    trace: 'retain-on-failure',

    // Timeout cho mỗi hành động (click, fill, expect...)
    // 10000 = 10 giây. Quá 10 giây mà chưa xong --> fail
    actionTimeout: 10000,
  },

  // projects = danh sách browser/thiết bị để test
  // Cùng 1 test sẽ chạy trên NHIỀU browser
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },    // Chrome trên desktop
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },   // Firefox trên desktop
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },    // Safari trên desktop
    },
    // Mobile -- test trên điện thoại (emulation, không phải điện thoại thật)
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

## Debugging -- Tìm và sửa lỗi trong test

### 1. UI Mode (KHUYÊN DÙNG)

```bash
npx playwright test --ui
```

Mở giao diện trực quan: xem từng bước test chạy, click vào bước bất kỳ để xem DOM snapshot tại thời điểm đó. **Đây là cách tốt nhất để hiểu test đang làm gì.**

### 2. Debug Mode -- Playwright Inspector

```bash
# Mở Playwright Inspector -- dừng từng bước, xem từng hành động
npx playwright test --debug

# Debug 1 file cụ thể
npx playwright test tests/login.spec.ts --debug
```

Inspector cho phép: chạy từng bước (step-by-step), xem locator, thử locator mới.

### 3. Trace Viewer -- "Camera an ninh" phát lại test

**Trace Viewer giống như camera an ninh (security camera replay).** Bạn có thể quay ngược thời gian và xem CHÍNH XÁC điều gì đã xảy ra tại mỗi bước của test.

```bash
# Xem trace sau khi test fail
npx playwright show-trace trace.zip
```

Trace ghi lại:
- **Screenshot** tại MỖI bước (trước và sau mỗi hành động)
- **DOM snapshot** -- HTML của trang tại thời điểm đó (bạn có thể inspect element)
- **Network requests** -- tất cả API call, hình ảnh, CSS được tải
- **Console logs** -- lỗi JavaScript trên browser
- **Thời gian** -- mỗi bước mất bao lâu

**Khi nào dùng Trace?**
- Test fail trên CI nhưng pass trên máy bạn --> xem trace của CI để hiểu tại sao
- Test fail vào ban đêm (không ai nhìn thấy) --> xem trace sáng hôm sau
- Bug khó tái hiện --> xem trace để thấy chính xác step nào sai

### 4. Codegen -- "Playwright xem bạn click rồi viết code cho bạn"

```bash
# Mở browser, bạn click trên trang web, Playwright tự động viết code
npx playwright codegen https://example.com
```

**Codegen là gì?** Bạn mở trang web, bạn click vào nút, nhập text, chọn dropdown... và Playwright **tự động viết code tương ứng** cho bạn. Giống như có người ngồi cạnh ghi chép lại mọi hành động của bạn thành code.

Codegen rất hữu ích khi:
- **Tìm đúng locator** -- bạn click vào element, Codegen cho bạn locator tốt nhất
- **Tạo code nhanh** -- click xong là có code, chỉ cần copy-paste vào test
- **Học syntax** -- người mới học xem code Codegen tạo ra để hiểu cách viết
- **Test nhanh** -- thử nhanh 1 flow trước khi viết test chính thức

---

## Real-world Example: E-commerce Test Suite

```typescript
// tests/checkout/checkout-flow.spec.ts
// Test quy trình thanh toán -- từ login đến đặt hàng thành công

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

// @smoke = chạy mỗi khi deploy
// @critical = test cực kỳ quan trọng, fail = không được deploy
test.describe('Checkout Flow @smoke @critical', () => {

  // Khai báo biến cho tất cả Page Objects
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // Trước mỗi test: tạo Page Objects và login
  test.beforeEach(async ({ page }) => {
    // Tạo đối tượng Page Object
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login trước mỗi test
    await loginPage.goto();
    await loginPage.login('customer@test.com', 'Pass@123');
  });

  test('should complete checkout with valid payment', async ({ page }) => {
    // Bước 1: Tìm và thêm sản phẩm vào giỏ hàng
    await productPage.searchProduct('iPhone 15');
    await productPage.addToCart('iPhone 15');

    // Bước 2: Vào giỏ hàng, kiểm tra
    await cartPage.goto();
    await cartPage.expectItemCount(1);          // Phải có 1 sản phẩm
    await cartPage.expectTotalGreaterThan(0);   // Tổng tiền > 0

    // Bước 3: Bắt đầu thanh toán
    await cartPage.proceedToCheckout();

    // Bước 4: Điền thông tin giao hàng
    await checkoutPage.fillShipping({
      address: '123 Nguyen Hue',
      city: 'Ho Chi Minh',
      phone: '0901234567'
    });

    // Bước 5: Điền thông tin thanh toán
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',    // Số thẻ test (Visa)
      expiry: '12/28',                   // Ngày hết hạn
      cvv: '123'                         // Mã bảo mật
    });
    await checkoutPage.placeOrder();             // Nhấn nút đặt hàng

    // Bước 6: Kiểm tra đặt hàng thành công
    await checkoutPage.expectOrderSuccess();
    const orderId = await checkoutPage.getOrderId();
    // toMatch() = kiểm tra theo regex
    // /^ORD-\d+$/ = bắt đầu bằng "ORD-" theo sau là các số
    expect(orderId).toMatch(/^ORD-\d+$/);
  });

  test('should show error with expired card', async ({ page }) => {
    // Thêm sản phẩm và vào checkout
    await productPage.addToCart('iPhone 15');
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    // Điền thông tin giao hàng
    await checkoutPage.fillShipping({
      address: '123 Main St', city: 'HCM', phone: '0901234567'
    });

    // Điền thẻ HẾT HẠN (01/20 = tháng 1 năm 2020 -- đã qua)
    await checkoutPage.fillPayment({
      cardNumber: '4111111111111111',
      expiry: '01/20',    // Expired! Đã hết hạn
      cvv: '123'
    });
    await checkoutPage.placeOrder();

    // Kiểm tra hiển thị lỗi thẻ hết hạn
    await checkoutPage.expectPaymentError('Card has expired');
  });
});
```

---

## Tóm tắt chương

| Feature | Ý nghĩa | Tại sao quan trọng |
|---|---|---|
| **Architecture** | Giao tiếp TRỰC TIẾP với browser (không qua trung gian) | Nhanh hơn Selenium 2-3 lần |
| **Auto-wait** | Tự động chờ element sẵn sàng trước khi tương tác | Giảm 90% flaky tests, không cần viết wait |
| **Locators** | getByRole > getByText > getByTestId > CSS | Test không fail khi developer đổi CSS |
| **Assertions** | Tự động retry, có hard và soft assertion | Hard = dừng ngay khi fail, Soft = chạy hết rồi đếm lỗi |
| **Trace Viewer** | Camera an ninh phát lại toàn bộ test | Xem chính xác bước nào sai, dù không ở đó lúc test chạy |
| **Codegen** | Xem bạn click, viết code tự động | Tìm locator nhanh, tạo boilerplate code |
| **API Testing** | Test API built-in, kết hợp API + UI | Không cần Postman, setup bằng API nhanh hơn UI |
| **Multi-browser** | Chromium + Firefox + WebKit + Mobile | 1 test chạy trên nhiều browser tự động |

::: tip Tiếp theo
- Đã nắm vững Playwright --> Tìm hiểu [Selenium](./selenium) để so sánh
- Muốn biết nên chọn tool nào --> Xem [Automation Strategy](./automation-strategy)
:::
