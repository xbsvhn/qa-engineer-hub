# Automation Framework

## Design Pattern -- bạn phải hiểu khái niệm này trước

Trước khi nói về Framework, bạn cần hiểu **Design Pattern** là gì.

**Design Pattern là một LỜI GIẢI ĐÃ ĐƯỢC ĐẶT TÊN cho một vấn đề cứ xảy ra hoài.** Giống như một công thức nấu ăn (recipe) mà nhiều đầu bếp (chef) độc lập khám phá ra -- nó hoạt động tốt, nên người ta đặt cho nó một cái tên để dễ truyền đạt.

> Tưởng tượng: 1000 lập trình viên giải cùng 1 vấn đề, họ độc lập tìm ra cùng 1 cách giải. Cách giải đó được đặt tên = Design Pattern.

### 3 Design Patterns mà QA cần biết

| Pattern | Ý nghĩa | Ví dụ thực tế |
|---|---|---|
| **Singleton** | Chỉ có DUY NHẤT MỘT thứ gì đó | Chỉ có 1 kết nối database trong cả hệ thống. Như cả trường học chỉ có 1 ông hiệu trưởng -- bạn không tạo thêm ông thứ 2. |
| **Factory** | Tạo ra thứ gì đó cho bạn | Bạn nói "tôi cần 1 user", Factory tạo user cho bạn. Bạn không cần biết user được tạo như thế nào -- giống như bạn gọi món ăn, không cần biết bếp nấu ra sao. |
| **Page Object Model (POM)** | Tổ chức test code theo từng trang | Mỗi trang web = 1 file code riêng. Đây là pattern **QUAN TRỌNG NHẤT** cho QA Automation. |

---

## Page Object Model (POM) -- Pattern quan trọng nhất

### Vấn đề TRƯỚC (the PAIN) -- tại sao POM tồn tại?

Hãy tưởng tượng bạn đang làm dự án e-commerce. Bạn viết 200 file test. Trong 50 file, bạn đều cần login:

```typescript
// ❌ File 1: login.spec.ts
test('login successfully', async ({ page }) => {
  // '#email-input' là CSS selector -- cách tìm element trên trang web
  // fill() là điền text vào input
  await page.fill('#email-input', 'user@mail.com');     // Locator bị hardcode
  await page.fill('#password-input', 'Pass@123');        // Locator bị hardcode
  await page.click('button.login-btn');                  // Locator bị hardcode
  await expect(page).toHaveURL('/dashboard');
});

// ❌ File 2: profile.spec.ts
test('update profile after login', async ({ page }) => {
  await page.fill('#email-input', 'user@mail.com');      // DUPLICATE! Giống hệt file 1
  await page.fill('#password-input', 'Pass@123');         // DUPLICATE! Giống hệt file 1
  await page.click('button.login-btn');                   // DUPLICATE! Giống hệt file 1
  // ... update profile
});

// ❌ File 3: order.spec.ts -- lại duplicate tiếp
// ❌ File 4: cart.spec.ts -- lại duplicate tiếp
// ... 50 file khác cũng copy-paste y hệt
```

**Bây giờ, developer đổi `#email-input` thành `#user-email`.**

Kết quả: **Bạn phải mở 50 file, tìm và sửa từng cái một.** Miss 1 file = 1 test bị fail. Đây là cơ ác mộng (nightmare) của mọi QA Automation.

### Giải pháp: Page Object Model

Ý tưởng cực kỳ đơn giản: **Gom tất cả locator và action của 1 trang vào 1 file duy nhất.** Developer đổi gì thì chỉ sửa 1 file.

```typescript
// ✅ pages/LoginPage.ts -- TẤT CẢ về trang Login nằm ở đây

// import = nhập thư viện từ bên ngoài vào file này
// Page = đối tượng đại diện cho 1 tab browser (Playwright cung cấp)
// Locator = đối tượng đại diện cho 1 element trên trang (nút, input, text...)
// expect = hàm để kiểm tra kết quả (pass hay fail)
import { Page, Locator, expect } from '@playwright/test';

// export = cho phép file khác sử dụng class này
// class = bản thiết kế (blueprint) để tạo đối tượng
// LoginPage = tên class, đặt theo tên trang web
export class LoginPage {

  // private = chỉ dùng được BÊN TRONG class này, bên ngoài không thấy
  // page: Page = biến "page" có kiểu dữ liệu là "Page"
  private page: Page;

  // Locator = địa chỉ của element trên trang web
  // Giống như địa chỉ nhà -- bạn lưu địa chỉ 1 lần, dùng nhiều lần
  private emailInput: Locator;       // Ô nhập email
  private passwordInput: Locator;    // Ô nhập password
  private loginButton: Locator;      // Nút đăng nhập
  private errorMessage: Locator;     // Thông báo lỗi

  // constructor = hàm chạy TỰ ĐỘNG khi tạo đối tượng mới
  // Khi bạn viết: new LoginPage(page) --> constructor chạy
  // Giống như khi bạn sinh ra, bạn tự động có tên, có nhóm máu -- tự động, không cần gọi
  constructor(page: Page) {
    // this = chính đối tượng này (chính mình)
    // this.page = lưu "page" vào bên trong đối tượng để dùng sau này
    this.page = page;

    // page.locator() = tìm element trên trang bằng CSS selector
    // '#email-input' = tìm element có id="email-input"
    this.emailInput = page.locator('#email-input');

    // '#password-input' = tìm element có id="password-input"
    this.passwordInput = page.locator('#password-input');

    // 'button.login-btn' = tìm thẻ <button> có class="login-btn"
    this.loginButton = page.locator('button.login-btn');

    // '.error-message' = tìm element có class="error-message"
    this.errorMessage = page.locator('.error-message');
  }

  // async = hàm này chạy BẤT ĐỒNG BỘ (cần thời gian, phải chờ)
  // Vì browser cần thời gian để load trang, click, nhập text...
  // Mỗi khi hàm có "await" bên trong --> phải khai báo "async"
  async goto() {
    // await = CHỜ cho hành động này xong rồi mới làm tiếp
    // goto() = điều hướng browser đến URL
    await this.page.goto('/login');
  }

  // email: string = tham số "email" có kiểu dữ liệu là chuỗi ký tự
  // password: string = tham số "password" có kiểu dữ liệu là chuỗi ký tự
  async login(email: string, password: string) {
    // fill() = xóa sạch ô input rồi nhập text vào
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    // click() = nhấn chuột vào element
    await this.loginButton.click();
  }

  // Promise<string> = hàm này TRẢ VỀ một chuỗi ký tự (nhưng phải chờ)
  // Promise = lời hứa "tôi sẽ trả về kết quả, nhưng chưa biết khi nào"
  async getError(): Promise<string> {
    // textContent() = lấy nội dung text của element
    // || '' = nếu không có text thì trả về chuỗi rỗng
    return await this.errorMessage.textContent() || '';
  }

  // Assertions -- kiểm tra kết quả
  async expectLoginSuccess() {
    // expect(page).toHaveURL() = kiểm tra URL hiện tại có đúng không
    await expect(this.page).toHaveURL('/dashboard');
  }

  async expectErrorVisible(message: string) {
    // toBeVisible() = kiểm tra element có hiển thị trên màn hình không
    await expect(this.errorMessage).toBeVisible();
    // toContainText() = kiểm tra element có chứa text này không
    await expect(this.errorMessage).toContainText(message);
  }
}
```

Bây giờ test code trở nên **cực kỳ sạch**:

```typescript
// ✅ tests/login.spec.ts -- test sạch, đọc như đọc requirement

// import LoginPage từ file pages/LoginPage.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// test.describe() = nhóm các test lại với nhau theo feature
test.describe('Login Feature', () => {

  // let = khai báo biến (có thể thay đổi giá trị sau này)
  // loginPage: LoginPage = biến có kiểu dữ liệu là LoginPage
  let loginPage: LoginPage;

  // beforeEach = chạy TRƯỚC MỖI test trong nhóm này
  // Giống như nhà hàng dọn bàn trước mỗi vị khách
  test.beforeEach(async ({ page }) => {
    // new LoginPage(page) = tạo đối tượng LoginPage mới
    // Đây là lúc constructor chạy
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async () => {
    // Đọc như tiếng Anh: loginPage.login('email', 'pass')
    // Không thấy bất kỳ locator nào -- sạch!
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

**Kết quả:** Developer đổi `#email-input` thành `#user-email` --> chỉ sửa DUY NHẤT 1 dòng trong `LoginPage.ts`. 50 file test không cần thay đổi gì.

---

## BasePage -- Kế thừa (Inheritance)

### Kế thừa là gì?

**Kế thừa giống như con cái thừa hưởng đặc điểm từ cha mẹ.** Con có mắt, có mũi, có tay chân -- tất cả "thừa hưởng" từ cha mẹ mà không cần tự tạo ra.

Trong code: **BasePage là "cha mẹ"**, các Page khác là "con cái". Con cái tự động có tất cả method (hàm) của cha mẹ.

```typescript
// pages/BasePage.ts -- "Cha mẹ" của tất cả Page Objects

import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  // protected = giống private, nhưng CON CÁI có thể dùng
  // private = chỉ mình dùng được
  // protected = mình VÀ con cái dùng được
  // public = ai cũng dùng được
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Những method (hàm) CHUNG mà trang nào cũng cần
  // Tất cả "con cái" sẽ tự động có các method này

  // Chờ trang load xong hoàn toàn
  // 'networkidle' = không còn request nào đang chạy
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  // Lấy tiêu đề (title) của trang
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // Chụp màn hình (screenshot)
  // name: string = tên file screenshot
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  // Cuộn xuống cuối trang
  // evaluate() = chạy JavaScript trên browser thật
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
```

```typescript
// pages/ProductPage.ts -- "Con" kế thừa từ BasePage

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// extends = kế thừa, "ProductPage là con của BasePage"
// ProductPage tự động có: waitForPageLoad(), getTitle(), takeScreenshot(), scrollToBottom()
export class ProductPage extends BasePage {
  private searchInput: Locator;
  private searchButton: Locator;
  private productCards: Locator;     // Danh sách thẻ sản phẩm
  private sortDropdown: Locator;     // Dropdown sắp xếp

  constructor(page: Page) {
    // super(page) = gọi constructor của CHA MẸ (BasePage)
    // Bắt buộc phải gọi super() trước khi dùng "this"
    // Giống như: trước khi làm việc riêng, phải làm xong việc chung của gia đình
    super(page);

    // [data-testid="search-input"] = tìm element có attribute data-testid="search-input"
    // Đây là cách tốt nhất để đặt locator -- developer thêm data-testid cho QA
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('[data-testid="search-btn"]');
    this.productCards = page.locator('[data-testid="product-card"]');
    this.sortDropdown = page.locator('[data-testid="sort-select"]');
  }

  // Tìm kiếm sản phẩm
  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    // waitForPageLoad() -- method này từ BasePage (cha mẹ)!
    // ProductPage không khai báo nhưng vẫn dùng được -- do kế thừa
    await this.waitForPageLoad();
  }

  // Đếm số sản phẩm hiển thị
  // count() = đếm số lượng element khớp với locator
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  // Sắp xếp sản phẩm
  // 'price-asc' | 'price-desc' | 'name' | 'newest' = chỉ chấp nhận 4 giá trị này
  // Đây là Union Type trong TypeScript -- giới hạn giá trị đầu vào
  async sortBy(option: 'price-asc' | 'price-desc' | 'name' | 'newest') {
    // selectOption() = chọn giá trị trong dropdown <select>
    await this.sortDropdown.selectOption(option);
    await this.waitForPageLoad();
  }

  // Lấy tên tất cả sản phẩm
  // Promise<string[]> = trả về MẢNG các chuỗi ký tự
  async getProductNames(): Promise<string[]> {
    // .locator('.product-name') = tìm element con có class="product-name"
    // allTextContents() = lấy text của TẤT CẢ element khớp (trả về mảng)
    return await this.productCards.locator('.product-name').allTextContents();
  }

  // Kiểm tra số lượng sản phẩm
  async expectProductCount(count: number) {
    // toHaveCount() = kiểm tra số lượng element
    await expect(this.productCards).toHaveCount(count);
  }
}
```

**Tổng kết kế thừa:**
- `BasePage` có 4 method chung (waitForPageLoad, getTitle, takeScreenshot, scrollToBottom)
- `ProductPage extends BasePage` --> tự động có 4 method đó + thêm các method riêng của mình
- `LoginPage extends BasePage` --> cũng tự động có 4 method đó
- Sửa 1 method trong BasePage --> tất cả Page Objects đều được cập nhật

---

## Data-Driven Testing -- Cùng công thức, khác nguyên liệu

### Ý tưởng cốt lõi

**Data-Driven Testing = cùng 1 công thức (recipe), nhưng dùng nhiều nguyên liệu (ingredients) khác nhau.**

Ví dụ thực tế: Bạn test form login với email sai. Có 10 loại email sai:
- Email trống ("")
- Email không có @
- Email không có domain
- Email có ký tự đặc biệt
- ... và 6 loại nữa

**Không có Data-Driven:** Bạn viết 10 test, mỗi test chỉ khác nhau dòng email và error message. 90% code là giống nhau = LÃNG PHÍ.

**Có Data-Driven:** Bạn viết 1 test + 1 file data 10 dòng = 10 test cases tự động. Thêm 1 dòng data = thêm 1 test case. **KHÔNG CẦN VIẾT THÊM CODE.**

### Cách làm

**Bước 1: Tạo file data (nguyên liệu)**
```json
// fixtures/test-data/login-data.json
// JSON = định dạng lưu trữ dữ liệu, giống như bảng Excel nhưng cho máy tính đọc
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

**Bước 2: Viết 1 test dùng cho tất cả data (công thức)**
```typescript
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

// import data từ file JSON
// loginData bây giờ chứa tất cả dữ liệu ở trên
import loginData from '../../fixtures/test-data/login-data.json';

test.describe('Login - Invalid Email', () => {

  // for...of = lặp qua từng phần tử trong mảng
  // loginData.invalidEmails là mảng có 6 phần tử
  // Mỗi lần lặp, "data" là 1 phần tử: { email: "...", error: "..." }
  for (const data of loginData.invalidEmails) {

    // Template literal: `text ${biến}` = chèn biến vào chuỗi
    // data.email || '(empty)' = nếu email rỗng thì hiện "(empty)"
    test(`should show error for email: "${data.email || '(empty)'}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      // Mỗi lần lặp, email và error khác nhau
      await loginPage.login(data.email, 'Pass@123');
      await loginPage.expectErrorVisible(data.error);
    });
  }
});

// KẾT QUẢ: 6 dòng data --> 6 test cases tự động:
// ✅ should show error for email: "(empty)"
// ✅ should show error for email: "invalid"
// ✅ should show error for email: "no-domain@"
// ✅ should show error for email: "test@.com"
// ✅ should show error for email: "@gmail.com"
// ✅ should show error for email: "has space@gmail.com"
//
// Thêm 1 dòng vào JSON = tự động có thêm 1 test. KHÔNG CẦN SỬA CODE.
```

---

## Fixtures Pattern -- Setup tự động trước mỗi test

### Fixtures là gì?

**Fixtures = việc chuẩn bị (setup) xảy ra TỰ ĐỘNG trước mỗi test.**

Giống như nhà hàng: trước mỗi vị khách (test), nhân viên tự động dọn bàn, trải khăn, đặt dao dĩa (setup). Khách ngồi xuống là ăn ngay, không cần tự làm. Khách đi rồi, nhân viên dọn dẹp (teardown).

Trong testing:
- **Setup** = login sẵn, tạo data sẵn, mở trang sẵn
- **Teardown** = xóa data, logout, đóng kết nối
- **Fixture** = gọi chung tất cả các bước setup + teardown này

### Cách tạo Custom Fixture trong Playwright

```typescript
// fixtures/auth.fixture.ts

// import test từ Playwright và đổi tên thành "base"
// vì mình sẽ tạo test MỚI dựa trên test gốc
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

// type = định nghĩa kiểu dữ liệu mới
// MyFixtures = kiểu dữ liệu mô tả các fixture của mình
type MyFixtures = {
  loginPage: LoginPage;              // Fixture 1: trang login đã sẵn sàng
  cartPage: CartPage;                // Fixture 2: trang cart đã sẵn sàng
  authenticatedPage: LoginPage;      // Fixture 3: đã login XONG rồi
};

// base.extend<MyFixtures> = mở rộng test gốc, thêm các fixture mới
// Giống như: lấy bản test gốc, gắn thêm "phụ kiện" (fixture) vào
export const test = base.extend<MyFixtures>({

  // Fixture "loginPage": tạo LoginPage và điều hướng đến trang login
  // { page } = lấy đối tượng page từ Playwright (có sẵn)
  // use = "đây là giá trị mà test sẽ nhận được"
  loginPage: async ({ page }, use) => {
    // SETUP: tạo LoginPage và mở trang login
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // use(loginPage) = trao loginPage cho test sử dụng
    // Test chạy ở GIỮA đây...
    await use(loginPage);

    // TEARDOWN: code sau use() chạy SAU khi test xong
    // (ở đây không cần dọn dẹp gì)
  },

  // Fixture "authenticatedPage": ĐÃ LOGIN SẴN
  // Test nhận được fixture này = đã đăng nhập rồi, khỏi login nữa
  authenticatedPage: async ({ page }, use) => {
    // SETUP: login sẵn cho test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@mail.com', 'Pass@123');
    await loginPage.expectLoginSuccess();

    // Trao loginPage (đã login) cho test
    await use(loginPage);
  },

  // Fixture "cartPage": tạo CartPage sẵn sàng
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  }
});

// Re-export expect để test file khác dùng
export { expect } from '@playwright/test';
```

```typescript
// tests/cart/add-to-cart.spec.ts -- DÙNG custom fixture

// QUAN TRỌNG: import từ file fixture, KHÔNG PHẢI từ '@playwright/test'
// Như vậy test mới có các fixture mình tạo
import { test, expect } from '../../fixtures/auth.fixture';

// authenticatedPage = đã login sẵn (fixture lo hết)
// cartPage = đã tạo sẵn (fixture lo hết)
// Test chỉ cần tập trung vào việc test, không cần lo setup
test('should add product to cart', async ({ authenticatedPage, cartPage, page }) => {
  // authenticatedPage đã login sẵn -- KHÔNG CẦN login lại!
  // Giống như khách ngồi xuống bàn đã dọn sẵn -- ăn ngay
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart-1"]');
  // ... verify cart
});
```

---

## Cấu trúc Project thực tế -- mỗi thư mục là gì?

### Cấu trúc chuẩn cho Playwright + TypeScript

```
automation-project/
│
├── tests/                          # Chứa TẤT CẢ file test (.spec.ts)
│   │                               # Chia theo feature/module của ứng dụng
│   ├── auth/                       # Tests liên quan đến xác thực (authentication)
│   │   ├── login.spec.ts           # Test đăng nhập
│   │   ├── register.spec.ts        # Test đăng ký
│   │   └── forgot-password.spec.ts # Test quên mật khẩu
│   ├── products/                   # Tests liên quan đến sản phẩm
│   │   ├── search.spec.ts          # Test tìm kiếm sản phẩm
│   │   ├── filter.spec.ts          # Test lọc sản phẩm
│   │   └── product-detail.spec.ts  # Test trang chi tiết sản phẩm
│   ├── cart/                       # Tests liên quan đến giỏ hàng
│   │   ├── add-to-cart.spec.ts     # Test thêm sản phẩm vào giỏ
│   │   └── update-cart.spec.ts     # Test cập nhật giỏ hàng
│   └── checkout/                   # Tests liên quan đến thanh toán
│       ├── checkout-flow.spec.ts   # Test quy trình thanh toán
│       └── payment.spec.ts         # Test phương thức thanh toán
│
├── pages/                          # Chứa TẤT CẢ Page Objects
│   │                               # Mỗi file = 1 trang web = 1 class
│   ├── BasePage.ts                 # "Cha mẹ" -- các method chung (screenshot, scroll...)
│   ├── LoginPage.ts                # Page Object cho trang đăng nhập
│   ├── RegisterPage.ts             # Page Object cho trang đăng ký
│   ├── ProductPage.ts              # Page Object cho trang sản phẩm
│   ├── CartPage.ts                 # Page Object cho trang giỏ hàng
│   └── CheckoutPage.ts            # Page Object cho trang thanh toán
│
├── fixtures/                       # Chứa test data và custom fixtures
│   ├── test-data/                  # Dữ liệu test (tách riêng khỏi code)
│   │   ├── users.json              # Data người dùng (email, password...)
│   │   ├── products.json           # Data sản phẩm (tên, giá...)
│   │   └── payments.json           # Data thanh toán (số thẻ, CVV...)
│   └── auth.fixture.ts            # Custom fixture (login sẵn, tạo data sẵn...)
│
├── utils/                          # Công cụ hỗ trợ (helper functions)
│   ├── api-helper.ts              # Gọi API để setup/teardown (tạo user, xóa data...)
│   ├── db-helper.ts               # Truy vấn database trực tiếp (kiểm tra data)
│   └── data-generator.ts          # Tạo dữ liệu ngẫu nhiên (random email, phone...)
│
├── playwright.config.ts            # CẤU HÌNH Playwright (browser, timeout, baseURL...)
├── package.json                    # Quản lý thư viện (dependencies)
├── tsconfig.json                   # Cấu hình TypeScript
└── .github/
    └── workflows/
        └── test.yml                # CI/CD pipeline -- tự động chạy test khi push code
```

### Dự án nhỏ vs Dự án lớn

**Dự án nhỏ (1-2 QA, dưới 100 tests):**
```
project/
├── tests/           # Không cần chia subfolder -- tất cả file nằm chung
├── pages/           # Vẫn cần Page Objects!
├── playwright.config.ts
└── package.json
```

**Dự án lớn (3+ QA, 100+ tests):**
```
project/
├── tests/           # PHẢI chia theo feature/module
│   ├── auth/
│   ├── products/
│   ├── checkout/
│   └── admin/
├── pages/
├── fixtures/        # Custom fixtures + test data riêng
├── utils/           # Helper functions
├── scripts/         # Script setup/teardown (tạo DB, seed data...)
├── .github/workflows/
└── playwright.config.ts
```

---

## CI/CD Pipeline -- Tự động chạy test khi push code

```yaml
# .github/workflows/test.yml
# File này nói cho GitHub: "Mỗi khi push code, hãy tự động chạy test"

name: Automation Tests      # Tên của pipeline

on:                         # Khi nào chạy?
  push:
    branches: [main, develop]   # Khi push lên branch main hoặc develop
  pull_request:
    branches: [main]            # Khi tạo Pull Request vào main

jobs:
  test:
    runs-on: ubuntu-latest      # Chạy trên máy ảo Ubuntu (miễn phí của GitHub)
    steps:
      - uses: actions/checkout@v4          # Bước 1: tải source code về
      - uses: actions/setup-node@v4        # Bước 2: cài Node.js
        with:
          node-version: 20
      - run: npm ci                        # Bước 3: cài thư viện (dependencies)
      - run: npx playwright install --with-deps   # Bước 4: cài browser cho Playwright
      - run: npx playwright test           # Bước 5: CHẠY TEST
      - uses: actions/upload-artifact@v4   # Bước 6: lưu report
        if: always()                       # Lưu report DÙ test pass hay fail
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Best Practices -- Quy tắc vàng

### Đặt tên file (Naming Convention)

```
tests/
  login.spec.ts          ← feature-name.spec.ts (chữ thường, gạch ngang)
  product-search.spec.ts ← kebab-case (chữ-thường-gạch-ngang)

pages/
  LoginPage.ts           ← PascalCase + "Page" suffix (ChữInHoa + "Page")
  ProductPage.ts

fixtures/
  test-data/users.json   ← kebab-case (chữ-thường-gạch-ngang)
```

### 5 Quy tắc viết Page Object

1. **1 trang = 1 class** -- không trộn lẫn 2 trang vào 1 file
2. **Locators đặt trong constructor** -- dễ tìm, dễ sửa, ở 1 chỗ duy nhất
3. **Tên method mô tả hành động** -- `login()`, `searchProduct()`, KHÔNG PHẢI `clickButton()`
4. **Assertion đặt trong Page Object** -- `expectLoginSuccess()` chứ không để trong test file
5. **Dùng data-testid** -- `[data-testid="login-btn"]` thay vì `.btn.primary` (CSS class hay bị đổi)

### 4 Quy tắc viết Test

1. **1 test = 1 scenario** -- không test nhiều thứ trong 1 test
2. **Test độc lập** -- test A không phụ thuộc test B (test A fail không làm test B fail)
3. **Arrange, Act, Assert** -- Setup data, Thực hiện hành động, Kiểm tra kết quả
4. **Tên test mô tả scenario** -- `should show error when password is empty` (đọc là hiểu test làm gì)

---

## Sai lầm thường gặp

### ❌ Quá nhiều layers of abstraction
→ ✅ **Giữ đơn giản: Test → Page Object → Browser.** Đừng tạo thêm BasePage → AbstractPage → BaseComponent → PageFactory nếu dự án chỉ có 20 tests.
→ 💡 **Tại sao:** Mỗi layer thêm complexity. Người mới vào team mất 2 ngày chỉ để hiểu architecture thay vì viết test. Over-engineering tệ hơn under-engineering.

### ❌ Page Object quá lớn — 1 file 500+ dòng
→ ✅ **Chia nhỏ theo component/section** — `CheckoutPage` có thể tách thành `ShippingForm`, `PaymentForm`, `OrderSummary` nếu mỗi phần phức tạp.
→ 💡 **Tại sao:** File 500 dòng = khó tìm method, khó maintain, dễ conflict khi 2 người cùng sửa. Rule of thumb: 1 Page Object nên dưới 200 dòng.

### ❌ Trộn test logic vào Page Object
→ ✅ **Page Object chỉ chứa locators + actions + assertions cơ bản.** Business logic, conditional flows, test data decisions nằm trong test file.
→ 💡 **Tại sao:** Page Object là "API của trang web" — nó mô tả trang CÓ GÌ và LÀM ĐƯỢC GÌ. Nó không quyết định test scenario. Trộn lẫn = khó reuse, khó đọc.

### ❌ Không dùng BasePage khi đã có 5+ Page Objects
→ ✅ **Tạo BasePage cho các method chung** — `waitForPageLoad()`, `takeScreenshot()`, `getTitle()` nên nằm ở BasePage, không copy-paste vào từng Page.
→ 💡 **Tại sao:** DRY (Don't Repeat Yourself). Sửa logic wait 1 lần ở BasePage = tất cả Pages được cập nhật. Copy-paste = sửa 10 chỗ, miss 1 chỗ = bug.

## Góc nhìn đa chiều

| Approach | Mô tả | Phù hợp khi |
|---|---|---|
| **POM nghiêm ngặt** | Mọi tương tác PHẢI qua Page Object. Test file không có bất kỳ locator nào. | Dự án lớn (100+ tests), nhiều QA cùng làm, cần consistency và maintainability |
| **POM nhẹ (Lightweight)** | Có Page Objects cho các trang chính, nhưng test đơn giản có thể dùng locator trực tiếp. | Dự án nhỏ (dưới 30 tests), 1 QA làm, ưu tiên tốc độ viết test |
| **Screenplay Pattern** | Tổ chức theo Actor → Task → Action thay vì theo Page. Trừu tượng hơn POM. | Team có kinh nghiệm, dự án cần mô tả business flows phức tạp |
| **Không dùng pattern** | Viết test trực tiếp, không Page Object. | Proof of concept, spike, hoặc dự án có dưới 10 tests và không ai maintain |

**Lời khuyên:** Bắt đầu với POM cơ bản. Nếu thấy đủ tốt → giữ nguyên. Nếu thấy thiếu → mở rộng dần. Đừng bắt đầu với architecture phức tạp nhất rồi mới viết test đầu tiên.

---

## Tóm tắt chương

| Pattern | Vấn đề nó giải quyết | Khi nào dùng |
|---|---|---|
| **Page Object Model** | Locator duplicate ở 50 file, sửa 1 chỗ = sửa 50 file | Mọi dự án (BẮT BUỘC) |
| **BasePage** | Nhiều Page có cùng method chung, copy-paste lung tung | Khi có trên 3 Page Objects |
| **Data-Driven** | 10 test cases giống nhau 90%, chỉ khác data | Khi test nhiều input variations |
| **Fixtures** | Phải login trước mỗi test, copy-paste setup code | Khi nhiều test cần cùng setup |
| **CI/CD** | Quên chạy test trước khi deploy, lỗi lọt ra production | Mọi dự án (RECOMMENDED) |
