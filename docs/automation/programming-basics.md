# Lập trình cơ bản cho QA

## Tại sao QA cần biết lập trình? (WHY)

Bạn **không cần trở thành developer** để làm Automation QA. Nhưng bạn cần hiểu lập trình đủ để:

1. **Viết automation test scripts** — đây là mục tiêu chính
2. **Đọc hiểu code** của developer — để biết test gì, ở đâu
3. **Debug khi test fail** — tìm nguyên nhân lỗi test
4. **Giao tiếp với dev** — nói cùng ngôn ngữ kỹ thuật
5. **Tăng giá trị bản thân** — QA biết code lương cao hơn 30-50%

::: tip Thực tế thị trường
- **Manual QA:** 8-15 triệu/tháng
- **Automation QA:** 15-35 triệu/tháng
- **SDET (Software Development Engineer in Test):** 25-50 triệu/tháng

Biết lập trình là con đường nhanh nhất để tăng thu nhập trong ngành QA.
:::

---

## Lập trình là gì? (WHAT)

### Định nghĩa đơn giản

Lập trình là viết **tập hợp các chỉ dẫn** (instructions) để máy tính thực hiện một công việc cụ thể.

**Ví dụ ngoài đời:** Công thức nấu phở là "chương trình" để "máy tính" (người nấu) thực hiện. Mỗi bước (đun nước, cho gia vị, thêm phở) là một "lệnh" (instruction).

**Ví dụ trong automation:**
```
Chỉ dẫn cho máy tính:
1. Mở trình duyệt Chrome
2. Truy cập trang login
3. Nhập email "test@mail.com"
4. Nhập password "Pass@123"
5. Click nút "Login"
6. Kiểm tra: trang Dashboard có hiển thị không?
7. Nếu có → TEST PASS ✅
8. Nếu không → TEST FAIL ❌
```

Viết những chỉ dẫn này bằng **ngôn ngữ lập trình** = lập trình automation test.

### Ngôn ngữ lập trình là gì?

Ngôn ngữ lập trình là **phương tiện giao tiếp** giữa con người và máy tính. Giống như tiếng Việt, tiếng Anh là ngôn ngữ giao tiếp giữa người với người.

Máy tính chỉ hiểu **0 và 1** (mã nhị phân). Ngôn ngữ lập trình giúp viết code gần ngôn ngữ con người, rồi được **dịch** sang mã máy.

---

## Phân loại ngôn ngữ lập trình (HOW)

### Theo cách thực thi

| Loại | Cách hoạt động | Ví dụ | Ưu điểm | Nhược điểm |
|---|---|---|---|---|
| **Compiled** | Code → dịch toàn bộ → file thực thi → chạy | Java, C, C++, Go | Chạy nhanh, phát hiện lỗi sớm | Phải compile trước, chậm khi develop |
| **Interpreted** | Code → dịch từng dòng → chạy ngay | JavaScript, Python, Ruby | Phát triển nhanh, linh hoạt | Chạy chậm hơn compiled |

```
Compiled (Java):
  Source code (.java) → Compiler → Bytecode (.class) → JVM → Chạy
  [Dịch 1 lần]                                         [Chạy nhiều lần]

Interpreted (JavaScript):
  Source code (.js) → Interpreter → Chạy ngay
  [Dịch và chạy đồng thời, từng dòng]
```

**Với QA:** JavaScript và Python (interpreted) phổ biến hơn vì **viết nhanh, chạy ngay**, không cần compile — rất phù hợp cho automation test.

### Theo paradigm (mô hình lập trình)

| Paradigm | Ý tưởng chính | Ví dụ |
|---|---|---|
| **OOP (Object-Oriented)** | Tổ chức code thành "đối tượng" có thuộc tính và hành vi | Java, C#, TypeScript |
| **Functional** | Tổ chức code thành "hàm", tránh thay đổi state | Haskell, Elixir |
| **Multi-paradigm** | Hỗ trợ nhiều paradigm | **JavaScript**, **Python**, TypeScript |

**Với QA Automation:** JavaScript/TypeScript là **multi-paradigm** — bạn có thể dùng cả OOP (Page Object Model) lẫn Functional (test scripts đơn giản). Rất linh hoạt.

### Theo mức độ abstraction

```
Gần máy (Low-level):
  Assembly → C → C++ → Java → JavaScript → Python
                                              Gần người (High-level)
```

- **Low-level** (Assembly, C): Kiểm soát phần cứng, rất nhanh, rất khó viết
- **High-level** (JavaScript, Python): Dễ viết, dễ đọc, phù hợp cho automation

---

## Ngôn ngữ nào cho QA Automation?

### Top 5 ngôn ngữ phổ biến trong Automation Testing

| # | Ngôn ngữ | Phổ biến | Framework chính | Phù hợp |
|---|---|---|---|---|
| 1 | **JavaScript/TypeScript** | ⭐⭐⭐⭐⭐ | Playwright, Cypress, WebdriverIO | Web testing, Full-stack QA |
| 2 | **Python** | ⭐⭐⭐⭐⭐ | pytest, Selenium, Robot Framework | API testing, Data testing |
| 3 | **Java** | ⭐⭐⭐⭐ | Selenium, TestNG, RestAssured | Enterprise, Android testing |
| 4 | **C#** | ⭐⭐⭐ | Selenium, NUnit, SpecFlow | .NET projects |
| 5 | **Ruby** | ⭐⭐ | Capybara, RSpec | Ít phổ biến hơn |

### Tại sao chọn JavaScript/TypeScript? (WHY)

1. **Phổ biến nhất thế giới** — Hàng triệu developer, cộng đồng hỗ trợ lớn
2. **Dùng cho cả Frontend và Backend** — Hiểu được code của dev
3. **Framework hiện đại nhất** — Playwright, Cypress đều dựa trên JS/TS
4. **Dễ học** — Syntax đơn giản, chạy ngay trên browser
5. **TypeScript** — Thêm type safety, code chất lượng hơn, IDE hỗ trợ tốt hơn
6. **Thị trường việc làm** — Nhiều job yêu cầu JS/TS cho automation

### JavaScript vs TypeScript?

| | JavaScript (JS) | TypeScript (TS) |
|---|---|---|
| **Typing** | Dynamic (không khai báo type) | Static (khai báo type) |
| **Ví dụ** | `let name = "An"` | `let name: string = "An"` |
| **Lỗi** | Phát hiện khi chạy | Phát hiện khi viết code |
| **Học** | Dễ hơn để bắt đầu | Khó hơn một chút |
| **Thực tế** | Prototype nhanh | Production code |
| **Trend** | Đang giảm | Đang tăng mạnh |

```typescript
// JavaScript — không biết name là gì cho đến khi chạy
let name = "An";
name = 123; // Không lỗi khi viết, nhưng có thể gây bug

// TypeScript — IDE báo lỗi ngay khi viết
let name: string = "An";
name = 123; // ❌ IDE báo lỗi ngay: Type 'number' is not assignable to type 'string'
```

**Recommendation:** Học **JavaScript trước** (1-2 tuần) → rồi chuyển sang **TypeScript** (thêm 1 tuần). Trong thực tế automation, đa số dự án mới dùng TypeScript.

---

## Khái niệm lập trình cốt lõi

Dưới đây là những concept **bắt buộc phải hiểu** trước khi viết automation test. Ví dụ bằng JavaScript/TypeScript.

### 1. Variables — Biến

Biến là **"hộp chứa"** dữ liệu, có tên để gọi lại.

```javascript
// Khai báo biến
let userName = "Nguyen Van An";     // Có thể thay đổi giá trị
const maxRetries = 3;               // Không thể thay đổi (constant)
let isLoggedIn = false;             // Boolean (true/false)

// Sử dụng biến
console.log(userName);              // In ra: "Nguyen Van An"
userName = "Tran Thi Binh";        // Đổi giá trị
console.log(userName);              // In ra: "Tran Thi Binh"
```

### 2. Data Types — Kiểu dữ liệu

| Type | Mô tả | Ví dụ |
|---|---|---|
| `string` | Chuỗi ký tự | `"Hello"`, `'test@mail.com'` |
| `number` | Số | `42`, `3.14`, `-10` |
| `boolean` | Đúng/Sai | `true`, `false` |
| `array` | Danh sách | `[1, 2, 3]`, `["Chrome", "Firefox"]` |
| `object` | Đối tượng | `{ name: "An", age: 25 }` |
| `null` | Không có giá trị (intentional) | `null` |
| `undefined` | Chưa gán giá trị | `undefined` |

```javascript
// String
let email = "test@mail.com";
let greeting = `Hello ${email}`;    // Template literal: "Hello test@mail.com"

// Number
let price = 500000;
let discount = price * 0.2;         // 100000

// Boolean
let isVisible = true;
let hasError = false;

// Array — danh sách
let browsers = ["Chrome", "Firefox", "Safari"];
console.log(browsers[0]);           // "Chrome" (index bắt đầu từ 0)
console.log(browsers.length);       // 3

// Object — đối tượng có nhiều thuộc tính
let user = {
  name: "Nguyen Van An",
  email: "an@mail.com",
  age: 25,
  isVIP: true
};
console.log(user.name);             // "Nguyen Van An"
console.log(user.email);            // "an@mail.com"
```

### 3. Conditionals — Điều kiện

Quyết định **làm gì** dựa trên điều kiện.

```javascript
let age = 17;

// if...else
if (age >= 18) {
  console.log("Được phép đăng ký");
} else {
  console.log("Chưa đủ tuổi");       // ← Chạy dòng này
}

// Ternary (viết ngắn)
let message = age >= 18 ? "Đủ tuổi" : "Chưa đủ tuổi";

// Multiple conditions
let score = 85;
if (score >= 90) {
  console.log("Excellent");
} else if (score >= 70) {
  console.log("Good");               // ← Chạy dòng này
} else if (score >= 50) {
  console.log("Average");
} else {
  console.log("Fail");
}
```

**Trong automation:** Dùng conditionals để xử lý các trường hợp khác nhau:
```javascript
// Kiểm tra element có hiển thị không trước khi click
if (await page.isVisible('#popup-close')) {
  await page.click('#popup-close');
}
```

### 4. Loops — Vòng lặp

Thực hiện **lặp đi lặp lại** một hành động.

```javascript
// for loop — khi biết trước số lần lặp
let browsers = ["Chrome", "Firefox", "Safari"];

for (let i = 0; i < browsers.length; i++) {
  console.log(`Testing on ${browsers[i]}`);
}
// Testing on Chrome
// Testing on Firefox
// Testing on Safari

// for...of — duyệt qua từng phần tử
for (let browser of browsers) {
  console.log(`Testing on ${browser}`);
}

// while loop — lặp cho đến khi điều kiện sai
let retries = 0;
while (retries < 3) {
  console.log(`Attempt ${retries + 1}`);
  retries++;
}
```

**Trong automation:** Chạy test trên nhiều browsers, nhiều bộ test data:
```javascript
// Data-driven testing
const testCases = [
  { email: "valid@mail.com", password: "Pass@123", expected: "success" },
  { email: "invalid", password: "Pass@123", expected: "error" },
  { email: "", password: "", expected: "error" },
];

for (let tc of testCases) {
  test(`Login with ${tc.email}`, async () => {
    // test logic here
  });
}
```

### 5. Functions — Hàm

Đóng gói một **nhóm lệnh** thành khối có tên, có thể gọi lại nhiều lần.

```javascript
// Khai báo function
function calculateDiscount(price, percent) {
  return price - (price * percent / 100);
}

// Gọi function
let finalPrice = calculateDiscount(500000, 20);
console.log(finalPrice);  // 400000

// Arrow function (cách viết ngắn, phổ biến trong automation)
const calculateDiscount = (price, percent) => {
  return price - (price * percent / 100);
};

// Arrow function 1 dòng
const isAdult = (age) => age >= 18;
console.log(isAdult(20));  // true
console.log(isAdult(15));  // false
```

**Trong automation:** Functions giúp **tái sử dụng** code:
```javascript
// Helper function — dùng lại ở nhiều test
async function login(page, email, password) {
  await page.goto('/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('#login-btn');
}

// Dùng trong test
test('Test 1', async ({ page }) => {
  await login(page, 'user1@mail.com', 'Pass@123');
  // ... test tiếp
});

test('Test 2', async ({ page }) => {
  await login(page, 'user2@mail.com', 'Pass@456');
  // ... test tiếp
});
```

### 6. Async/Await — Xử lý bất đồng bộ

Đây là concept **quan trọng nhất** trong automation web testing. Mọi tương tác với browser đều là **bất đồng bộ** (asynchronous) — phải đợi.

```javascript
// Vấn đề: Web page load mất thời gian
// Nếu code chạy tuần tự → click vào element chưa load → FAIL

// Synchronous (tuần tự) — ❌ Không hoạt động cho web
click('#button');          // Click ngay → element chưa có → Error!
getText('#result');        // Lấy text ngay → chưa load → Empty!

// Asynchronous với async/await — ✅ Đợi cho đến khi xong
await page.click('#button');    // Đợi element xuất hiện → rồi click
await page.textContent('#result'); // Đợi element có text → rồi lấy
```

**Giải thích đơn giản:**
- `async` — đánh dấu function là bất đồng bộ
- `await` — "hãy đợi dòng này xong rồi mới chạy dòng tiếp"

```javascript
// Mọi test function trong Playwright đều là async
test('login test', async ({ page }) => {
  await page.goto('https://example.com');     // Đợi page load xong
  await page.fill('#email', 'test@mail.com'); // Đợi fill xong
  await page.click('#login');                  // Đợi click xong
  await expect(page).toHaveURL('/dashboard');  // Đợi kiểm tra URL
});
```

::: warning Lỗi phổ biến nhất của QA mới
**Quên `await`** là lỗi #1 gây test flaky (lúc pass lúc fail):

```javascript
// ❌ Thiếu await — test có thể fail ngẫu nhiên
page.click('#button');
page.fill('#input', 'text');

// ✅ Có await — đợi mỗi action xong mới tiếp tục
await page.click('#button');
await page.fill('#input', 'text');
```
:::

### 7. Classes & Objects — Lớp và Đối tượng (OOP)

Class là **bản thiết kế** để tạo ra objects. Rất quan trọng cho **Page Object Model** (POM).

```typescript
// Class = bản thiết kế
class LoginPage {
  // Properties (thuộc tính)
  private page: Page;
  readonly emailInput = '#email';
  readonly passwordInput = '#password';
  readonly loginButton = '#login-btn';

  // Constructor — chạy khi tạo object mới
  constructor(page: Page) {
    this.page = page;
  }

  // Methods (hành vi)
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.textContent('.error-message') || '';
  }
}

// Sử dụng class trong test
test('login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);      // Tạo object từ class
  await loginPage.login('user@mail.com', 'Pass@123');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## Công cụ cần cài đặt

### 1. Node.js — Runtime để chạy JavaScript

Node.js cho phép chạy JavaScript **ngoài browser**. Tất cả automation tools (Playwright, Cypress) đều cần Node.js.

```bash
# Kiểm tra đã cài chưa
node --version    # v20.x.x
npm --version     # 10.x.x

# Cài đặt: download từ https://nodejs.org (chọn LTS version)
```

### 2. VS Code — Code Editor

VS Code là editor **miễn phí**, phổ biến nhất, có extensions tuyệt vời cho automation:

**Extensions cần cài:**
- **Playwright Test for VS Code** — chạy và debug test trực tiếp
- **ESLint** — kiểm tra lỗi code
- **Prettier** — format code đẹp
- **TypeScript** — (built-in) hỗ trợ TypeScript

### 3. Git — Version Control

Quản lý code, làm việc nhóm. Chi tiết ở bài [Git & Version Control](/cicd/git).

---

## Cấu trúc một Automation Project

Đây là cấu trúc **thực tế** bạn sẽ thấy trong dự án:

```
my-automation-project/
├── node_modules/           # Dependencies (tự generate, không sửa)
├── tests/                  # Test files
│   ├── login.spec.ts       # Test cho Login feature
│   ├── cart.spec.ts        # Test cho Cart feature
│   └── checkout.spec.ts    # Test cho Checkout feature
├── pages/                  # Page Objects
│   ├── LoginPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/               # Test data
│   ├── users.json
│   └── products.json
├── utils/                  # Helper functions
│   └── helpers.ts
├── playwright.config.ts    # Cấu hình Playwright
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript config
└── .gitignore              # Files không push lên Git
```

**Giải thích:**
- `tests/` — Mỗi file `.spec.ts` chứa test cases cho 1 feature
- `pages/` — Page Object classes, đóng gói tương tác với từng trang
- `fixtures/` — Test data tách riêng khỏi test logic
- `utils/` — Functions dùng chung (login helper, data generator...)
- `playwright.config.ts` — Config browsers, timeout, base URL...

---

## Lộ trình học lập trình cho QA

```
Tuần 1-2: JavaScript cơ bản
  Variables, Data types, Conditionals, Loops, Functions
  → Làm bài tập trên freeCodeCamp hoặc Codecademy

Tuần 3: TypeScript basics
  Types, Interfaces, async/await
  → Convert bài JavaScript sang TypeScript

Tuần 4: Automation đầu tiên
  Cài Playwright, viết test đầu tiên
  → Test login flow trên trang demo

Tuần 5-6: Page Object Model
  Tổ chức code chuyên nghiệp
  → Refactor tests sang POM pattern

Tuần 7-8: Nâng cao
  Data-driven testing, CI/CD integration
  → Tích hợp vào GitHub Actions
```

::: tip Lời khuyên
**Đừng cố học hết lý thuyết rồi mới code.** Học concept → viết code ngay → gặp lỗi → debug → học thêm. Vòng lặp này giúp bạn học nhanh nhất.
:::

---

## Tóm tắt chương

| Concept | Tại sao QA cần | Dùng ở đâu |
|---|---|---|
| **Variables** | Lưu test data, kết quả | Mọi nơi |
| **Data Types** | Hiểu data để verify đúng | Assertions, test data |
| **Conditionals** | Xử lý các scenarios khác nhau | Conditional test logic |
| **Loops** | Chạy test với nhiều data | Data-driven testing |
| **Functions** | Tái sử dụng code | Helper functions, utilities |
| **Async/Await** | Tương tác với browser | Mọi web automation action |
| **Classes** | Tổ chức code chuyên nghiệp | Page Object Model |
