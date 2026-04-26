# JavaScript & TypeScript cho QA

## ESSENCE: JavaScript là gì? Tại sao QA cần học?

> **Bản chất (ESSENCE):** JavaScript là **ngôn ngữ lập trình** — một cách để bạn "nói chuyện" với máy tính, ra lệnh cho nó làm việc. Giống như bạn dùng tiếng Việt để giao tiếp với người, bạn dùng JavaScript để giao tiếp với máy tính.

### Tại sao JavaScript mà không phải ngôn ngữ khác?

```
JavaScript / TypeScript
├── Web Automation  : Playwright, Cypress, WebdriverIO
├── API Testing     : Playwright API, Supertest, Axios
├── Unit Testing    : Jest, Vitest, Mocha
├── Mobile Testing  : Appium (JS client), Detox
└── Performance     : K6 (JS-based scripting)
```

> Học **1 ngôn ngữ**, dùng cho **mọi loại testing**. Đó là lý do chúng ta chọn JavaScript.

---

## Node.js — Từ con cá trong bể ra đại dương

### ESSENCE: Node.js là gì?

> **Bản chất:** JavaScript ban đầu được sinh ra **chỉ để chạy trong browser** (trình duyệt). Nó giống như con cá chỉ sống được trong bể cá (aquarium). Rồi một ngày, ai đó lấy engine (động cơ) của JavaScript **ra khỏi browser** và cho nó chạy ở BẤT KỲ ĐÂU — trên server, trên máy tính của bạn, trong CI/CD pipeline. Đó chính là **Node.js**. Giống như ai đó chế ra **bể cá di động** (portable water tank) để con cá có thể đi khắp nơi.

**Không có Node.js:** JavaScript chỉ chạy được khi mở browser.
**Có Node.js:** JavaScript chạy được mọi nơi — kể cả automation test của bạn.

```bash
# Kiểm tra Node.js đã cài chưa
node --version   # v20.x.x hoặc mới hơn

# Chạy một file JavaScript bằng Node.js
# (không cần mở browser!)
node hello.js
```

::: tip AHA MOMENT
Khi bạn chạy `npx playwright test`, thực chất Node.js đang chạy code JavaScript/TypeScript của bạn. Không có Node.js = không chạy được Playwright. Node.js là **nền móng** (foundation) của mọi thứ.
:::

---

## npm — "App Store" cho code

### ESSENCE: npm là gì?

> **Bản chất:** npm (Node Package Manager) là **"app store" dành cho code**. Giống như Google Play cho Android hay App Store cho iPhone — nhưng thay vì tải app, bạn tải **thư viện code** (library/package). Ai đó đã viết sẵn code Playwright, bạn chỉ cần "tải về" và dùng.

```bash
# Giống như: mở App Store → tìm "Playwright" → nhấn Install
npm install -D @playwright/test

# Tải TẤT CẢ thư viện mà project cần
# (giống restore backup — tải lại tất cả app đã mua)
npm install

# Khởi tạo project mới (tạo file package.json)
npm init -y
```

### package.json — "Danh sách mua sắm" của project

> **Bản chất:** package.json là **shopping list** (danh sách mua sắm) của project. Nó ghi lại: project tên gì, cần những thư viện nào, có những lệnh tắt (shortcut) nào. Khi đồng nghiệp clone project của bạn, họ chạy `npm install` và npm sẽ đọc "danh sách" này rồi tải đúng những gì cần.

```json
{
  // Tên project của bạn
  "name": "my-automation",

  // Phiên bản project
  "version": "1.0.0",

  // scripts = các lệnh tắt (shortcut commands)
  // Thay vì gõ dài, bạn gõ ngắn
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:headed": "npx playwright test --headed",
    "report": "npx playwright show-report"
  },

  // devDependencies = danh sách thư viện cần tải
  // Đây chính là "shopping list"
  "devDependencies": {
    "@playwright/test": "^1.45.0",
    "typescript": "^5.5.0"
  }
}
```

```bash
# npm test = chạy lệnh trong "scripts" → "test"
# Tức là chạy: npx playwright test
npm test

# npm run test:ui = chạy Playwright UI mode
npm run test:ui
```

::: tip AHA MOMENT
Khi bạn thấy một project mới, hãy mở `package.json` TRƯỚC TIÊN. Nó cho bạn biết project dùng những gì (`devDependencies`) và chạy bằng lệnh nào (`scripts`). Giống như đọc "menu" trước khi gọi món.
:::

---

## TypeScript vs JavaScript — Viết có spell check vs không

### ESSENCE: TypeScript là gì?

> **Bản chất:** Hãy tưởng tượng bạn đang viết email quan trọng.
> - **JavaScript** = viết email **KHÔNG có spell check** (kiểm tra chính tả). Bạn gõ sai chữ "email" thành "emial", không ai báo. Gửi đi rồi mới phát hiện.
> - **TypeScript** = viết email **CÓ spell check**. Vừa gõ sai, nó **gạch đỏ ngay lập tức**. Sửa trước khi gửi.
>
> TypeScript = JavaScript + **hệ thống kiểm tra kiểu dữ liệu** (type system). Nó bắt lỗi TRƯỚC KHI bạn chạy code.

### Ví dụ "Aha!" — Typo mà JavaScript không bắt được

```typescript
// ===== JAVASCRIPT — Không có spell check =====
function loginJS(loginData) {
  // Gõ nhầm "email" → "emial"
  // JavaScript: "OK fine, không báo gì cả"
  page.fill('#email', loginData.emial);  // Chạy → BUG! undefined!
}

// ===== TYPESCRIPT — Có spell check =====

// Bước 1: Khai báo "khuôn mẫu" (interface) cho data
// interface = bản mô tả: data này phải có những trường gì
interface LoginData {
  email: string;     // bắt buộc có trường email, kiểu chuỗi
  password: string;  // bắt buộc có trường password, kiểu chuỗi
}

function loginTS(loginData: LoginData) {
  // Gõ nhầm "emial" → IDE gạch đỏ NGAY LẬP TỨC
  page.fill('#email', loginData.emial);  // TS báo lỗi: "emial" không tồn tại!
  page.fill('#email', loginData.email);  // Đúng rồi, hết gạch đỏ
}
```

::: tip AHA MOMENT
Trong automation testing, một typo nhỏ có thể khiến test PASS giả (false positive) vì nó so sánh `undefined` thay vì giá trị thật. TypeScript ngăn chặn điều này TRƯỚC KHI test chạy.
:::

### Type Annotations — "Nhãn dán" cho dữ liệu

> **Bản chất:** Type annotation (chú thích kiểu) giống như **dán nhãn lên hộp**. Hộp ghi "Sách" thì chỉ bỏ sách vào, không bỏ quần áo. Code ghi `string` thì chỉ chứa chuỗi, không chứa số.

```typescript
// --- Kiểu cơ bản (primitive types) ---
let url: string = "https://example.com";   // string = chuỗi ký tự
let timeout: number = 30000;               // number = số
let isHeadless: boolean = true;            // boolean = đúng/sai (true/false)

// --- Array (mảng) = danh sách nhiều giá trị cùng kiểu ---
let browsers: string[] = ["chromium", "firefox", "webkit"];
// string[] nghĩa là: mảng chứa toàn chuỗi

// --- Interface = "khuôn mẫu" cho object ---
// Object = một "gói" chứa nhiều thông tin liên quan
interface User {
  name: string;       // tên — bắt buộc
  email: string;      // email — bắt buộc
  age: number;        // tuổi — bắt buộc
  isVIP?: boolean;    // ? = optional (có cũng được, không có cũng được)
}

// Tạo một user theo khuôn mẫu
const testUser: User = {
  name: "Test User",           // bắt buộc
  email: "test@mail.com",     // bắt buộc
  age: 25                      // bắt buộc
  // isVIP không điền — ok vì nó optional
};

// --- Function có type ---
// (price: number, quantity: number) = nhận vào 2 số
// : number = trả về 1 số
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;    // trả về tích của 2 số
}

// --- Async function (hàm bất đồng bộ) ---
// Promise<string> = "hứa" sẽ trả về một chuỗi (giải thích kỹ ở phần sau)
async function getTitle(page: Page): Promise<string> {
  return await page.title();  // lấy tiêu đề trang web
}
```

### Type thực tế trong Automation Testing

```typescript
// Union type: status CHỈ ĐƯỢC là 'success' HOẶC 'error'
// Giống dropdown menu — chỉ chọn 1 trong các option cho sẵn
interface TestCase {
  id: string;                          // mã test case
  description: string;                 // mô tả test case
  input: {                             // dữ liệu đầu vào
    email: string;
    password: string;
  };
  expected: {                          // kết quả mong đợi
    status: 'success' | 'error';       // union type: chỉ 1 trong 2
    message?: string;                  // message (optional)
  };
}

// Mảng test cases — dùng interface ở trên làm khuôn
const loginTests: TestCase[] = [
  {
    id: 'TC_001',                                         // mã test case
    description: 'Login with valid credentials',          // mô tả
    input: { email: 'user@mail.com', password: 'Pass@123' }, // input
    expected: { status: 'success' }                       // expect thành công
  },
  {
    id: 'TC_002',
    description: 'Login with invalid email',
    input: { email: 'invalid', password: 'Pass@123' },
    expected: { status: 'error', message: 'Invalid email format' }
  }
];
```

---

## JavaScript/TypeScript Patterns cho QA

### 1. String Methods — Xử lý chuỗi

> **Bản chất:** String (chuỗi) là đoạn text. Trong QA, bạn thường xuyên cần kiểm tra text trên trang web — cắt bỏ khoảng trắng, so sánh không phân biệt hoa thường, tìm keyword. String methods là các "công cụ" xử lý text đó.

```typescript
let text = "  Welcome to Dashboard  ";

// trim() = cắt bỏ khoảng trắng ở 2 đầu
// QA dùng khi: text trên web thường có space thừa
text.trim();                    // "Welcome to Dashboard"

// includes() = kiểm tra có chứa chuỗi con không
// QA dùng khi: verify trang có hiển thị text mong đợi
text.includes("Dashboard");     // true — có chứa "Dashboard"
text.includes("Login");         // false — không chứa "Login"

// toLowerCase() = chuyển toàn bộ thành chữ thường
// QA dùng khi: so sánh text không phân biệt HOA/thường
text.toLowerCase();             // "  welcome to dashboard  "

// startsWith() = kiểm tra bắt đầu bằng chuỗi gì
text.trim().startsWith("Welcome");  // true

// Template literal = nối chuỗi bằng backtick (`) và ${...}
// Dễ đọc hơn nhiều so với dùng dấu +
let name = "An";
let greeting = `Hello ${name}, you have ${3} items`;
// Kết quả: "Hello An, you have 3 items"

// Regex (Regular Expression) = "công thức" kiểm tra pattern
// QA dùng khi: validate email, phone, format cụ thể
let email = "test@mail.com";
let isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // true
```

### 2. Array Methods — "Bộ lọc" cho danh sách

> **Bản chất:** Array (mảng) = danh sách có thứ tự. Trong QA, bạn thường có danh sách: list sản phẩm, list test results, list error messages. Array methods giúp bạn **lọc**, **biến đổi**, **tìm kiếm** trong danh sách đó.

```typescript
// --- filter() = LỌC — giữ lại những phần tử thỏa điều kiện ---
// Giống lọc cà phê: chỉ giữ lại cái bạn muốn
let prices = [100, 200, 300, 150, 250];
let expensive = prices.filter(p => p > 200);
// Kết quả: [300, 250] — chỉ giữ giá > 200

// --- map() = BIẾN ĐỔI — đổi mỗi phần tử thành dạng khác ---
// Giống máy xay: mỗi trái cây đi vào, nước ép đi ra
let discounted = prices.map(p => p * 0.8);
// Kết quả: [80, 160, 240, 120, 200] — mỗi giá x 0.8

// --- find() = TÌM 1 — trả về phần tử ĐẦU TIÊN thỏa điều kiện ---
let firstBig = prices.find(p => p > 200);
// Kết quả: 300 — phần tử đầu tiên > 200

// --- some() = CÓ ÍT NHẤT 1 phần tử thỏa mãn? ---
let hasExpensive = prices.some(p => p > 200);
// Kết quả: true — có ít nhất 1 giá > 200

// --- every() = TẤT CẢ phần tử đều thỏa mãn? ---
let allPositive = prices.every(p => p > 0);
// Kết quả: true — tất cả đều > 0

// --- reduce() = GOM LẠI — gộp cả danh sách thành 1 giá trị ---
let total = prices.reduce((sum, p) => sum + p, 0);
// Kết quả: 1000 — tổng tất cả giá

// --- sort() = SẮP XẾP ---
// [...prices] = tạo bản sao (copy) trước khi sort
let sorted = [...prices].sort((a, b) => a - b);
// Kết quả: [100, 150, 200, 250, 300] — từ nhỏ đến lớn
```

**Ví dụ thực tế trong automation:**

```typescript
// Lấy tất cả tên sản phẩm trên trang
const names = await page.locator('.product-name').allTextContents();
// names = ["iPhone 15", "Samsung S24", "Pixel 8"]

// Kiểm tra TẤT CẢ sản phẩm đều chứa keyword
const allMatch = names.every(name => name.includes("Phone"));
// false — "Samsung S24" không chứa "Phone"

// Lọc sản phẩm có giá > 10 triệu
const products = await page.locator('.product').all();
const expensiveProducts = [];          // mảng rỗng để chứa kết quả
for (const product of products) {      // duyệt từng sản phẩm
  const price = await product.locator('.price').textContent(); // lấy giá
  if (parseInt(price || '0') > 10000000) {  // nếu giá > 10tr
    expensiveProducts.push(product);         // thêm vào danh sách
  }
}
```

### 3. Destructuring — "Mở hộp lấy đồ nhanh"

> **Bản chất:** Destructuring giống như **mở hộp quà**. Thay vì lấy từng món một (mở hộp → lấy áo → đặt xuống → lấy quần → đặt xuống), bạn **lấy tất cả ra cùng lúc** trong 1 thao tác.

```typescript
// --- CÁCH CŨ: Lấy từng thứ một (chậm, dài dòng) ---
const config = { baseURL: 'https://example.com', timeout: 30000, headless: true };
const baseURL = config.baseURL;     // lấy baseURL
const timeout = config.timeout;     // lấy timeout
const headless = config.headless;   // lấy headless

// --- DESTRUCTURING: Lấy tất cả cùng lúc (nhanh, gọn) ---
const { baseURL, timeout, headless } = config;
// Một dòng = lấy ra 3 giá trị!

// --- Trong function parameters ---
function setupTest({ baseURL, timeout }: { baseURL: string; timeout: number }) {
  console.log(`Testing ${baseURL} with timeout ${timeout}ms`);
}

// --- Trong Playwright test — bạn sẽ thấy RẤT NHIỀU ---
test('example', async ({ page, context, browser }) => {
  // page, context, browser được "mở hộp" từ Playwright fixtures
  // Thay vì: const page = fixtures.page; const context = fixtures.context;...
  await page.goto('https://example.com');
});
```

::: tip AHA MOMENT
Mỗi khi bạn viết `async ({ page }) =>` trong Playwright test, đó chính là destructuring! Playwright đưa cho bạn một "hộp" chứa page, context, browser,... và bạn "mở hộp" lấy đúng thứ mình cần.
:::

### 4. Spread Operator — Copy và mở rộng

> **Bản chất:** Dấu `...` (ba chấm) = "trải ra tất cả". Giống như bạn đổ hết đồ trong hộp ra bàn, rồi thêm đồ mới vào.

```typescript
// Trải array ra và thêm phần tử mới
const browsers = ["chromium", "firefox"];
const allBrowsers = [...browsers, "webkit"];
// Kết quả: ["chromium", "firefox", "webkit"]
// ...browsers = trải ra "chromium", "firefox"
// Thêm "webkit" vào cuối

// Copy object và ghi đè (override) một số trường
const defaultConfig = { timeout: 30000, headless: true, baseURL: '' };
const testConfig = { ...defaultConfig, baseURL: 'https://staging.example.com' };
// Kết quả: { timeout: 30000, headless: true, baseURL: 'https://staging.example.com' }
// ...defaultConfig = copy hết, rồi baseURL mới ghi đè baseURL cũ
```

### 5. async/await — Chờ đợi có trật tự

> **Bản chất:** Nhiều thao tác trong automation cần **thời gian** — click rồi đợi trang load, gọi API rồi đợi response. `async/await` là cách bạn nói với code: "Hãy **chờ** (await) thao tác này xong rồi hãy làm tiếp."
> - `async` = đánh dấu function "có chứa thao tác cần chờ"
> - `await` = "dừng lại chờ dòng này xong rồi mới đi tiếp"

```typescript
// Không có await: code chạy TIẾP mà không đợi trang load
// Có await: code DỪNG LẠI, đợi trang load xong rồi mới tiếp tục
async function loginTest(page) {
  await page.goto('https://example.com/login');  // đợi trang mở xong
  await page.fill('#email', 'user@mail.com');    // đợi điền xong
  await page.fill('#password', 'Pass@123');      // đợi điền xong
  await page.click('#login-btn');                // đợi click xong
  await page.waitForURL('**/dashboard');         // đợi chuyển trang xong
}
```

### 6. Promise.all — Làm nhiều việc CÙNG LÚC

> **Bản chất:** Bình thường `await` = làm xong việc 1 rồi mới làm việc 2 (tuần tự). Nhưng đôi khi bạn có thể làm **song song** — giống như **vừa giặt đồ vừa nấu cơm** thay vì giặt xong rồi mới nấu. `Promise.all` = "chạy tất cả cùng lúc, đợi tất cả xong".

```typescript
// --- Tuần tự (chậm) — giặt xong rồi mới nấu ---
const title = await page.title();     // đợi 100ms
const url = page.url();               // đợi thêm 50ms
// Tổng: 150ms

// --- Song song (nhanh) — giặt VÀ nấu cùng lúc ---
const [title, url] = await Promise.all([
  page.title(),    // chạy đồng thời
  page.url()       // chạy đồng thời
]);
// Tổng: 100ms (thời gian = thao tác lâu nhất)

// --- Ví dụ THỰC TẾ: đợi cả API response VÀ click ---
const [response] = await Promise.all([
  page.waitForResponse('**/api/login'),  // đợi API trả về
  page.click('#login-btn')               // click nút login (trigger API call)
]);
// Click và đợi API response ĐỒNG THỜI
// Đây là pattern RẤT PHỔ BIẾN trong Playwright
```

### 7. try/catch — "Plan B" khi có sự cố

> **Bản chất:** try/catch giống như **kế hoạch dự phòng**. "**Thử** (try) click nút này. **Nếu lỗi** (catch) — ví dụ nút không tồn tại — thì làm cách khác thay vì để test crash." Không có try/catch, một lỗi nhỏ = toàn bộ test dừng lại.

```typescript
// --- Cơ bản: thử click, nếu không được thì bỏ qua ---
try {
  // "Thử" làm điều này
  await page.click('#popup-close', { timeout: 3000 });
} catch (error) {
  // "Nếu lỗi" (popup không xuất hiện) → làm điều này thay thế
  console.log('Popup not found, continuing...');
}
// Code vẫn chạy tiếp bình thường, không crash!

// --- Thực tế: xử lý popup/dialog không lúc nào cũng xuất hiện ---
async function safeClick(page: Page, selector: string) {
  try {
    await page.click(selector, { timeout: 3000 }); // thử click
    return true;                                     // click được → trả về true
  } catch {
    console.log(`${selector} not found, skipping`); // không click được
    return false;                                    // trả về false
  }
}

// Sử dụng:
const popupClosed = await safeClick(page, '#dismiss-banner');
// popupClosed = true nếu banner có xuất hiện và đã đóng
// popupClosed = false nếu banner không xuất hiện — test vẫn chạy tiếp
```

::: tip AHA MOMENT
Trong testing thực tế, trang web thường có popup, banner, cookie consent,... xuất hiện **không đều** (lúc có lúc không). try/catch là cách bạn handle chúng mà không làm test fail vô lý.
:::

---

## Bài tập thực hành

### Bài 1: Validate Email

```typescript
// Viết function kiểm tra email hợp lệ
function isValidEmail(email: string): boolean {
  // regex kiểm tra format: xxx@yyy.zzz
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Test thử
console.log(isValidEmail("test@mail.com"));  // true — email hợp lệ
console.log(isValidEmail("invalid"));         // false — thiếu @
console.log(isValidEmail("a@b"));             // false — thiếu domain
```

### Bài 2: Tính Pass Rate từ Test Results

```typescript
// Khai báo interface cho kết quả test
interface TestResult {
  name: string;                           // tên test case
  status: 'pass' | 'fail' | 'skip';      // trạng thái: chỉ 1 trong 3
}

// Danh sách kết quả test
const results: TestResult[] = [
  { name: 'Login', status: 'pass' },      // pass
  { name: 'Cart', status: 'fail' },       // fail
  { name: 'Search', status: 'pass' },     // pass
  { name: 'Profile', status: 'pass' },    // pass
  { name: 'Settings', status: 'skip' },   // skip — không tính
];

// Tính pass rate (bỏ qua test bị skip)
const executed = results.filter(r => r.status !== 'skip'); // lọc bỏ skip
const passed = results.filter(r => r.status === 'pass');   // lọc lấy pass
const passRate = (passed.length / executed.length * 100).toFixed(1); // tính %
console.log(`Pass rate: ${passRate}%`);  // "Pass rate: 75.0%"
```

### Bài 3: Async/Await với API

```typescript
// Hàm giả lập gọi API — trả về user sau 1 giây
async function fetchUser(id: number): Promise<{ name: string; email: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // đợi 1 giây
  return { name: `User ${id}`, email: `user${id}@mail.com` }; // trả về data
}

// Gọi hàm và sử dụng kết quả
async function main() {
  const user = await fetchUser(1);   // đợi API trả về
  console.log(user.name);           // "User 1"
  console.log(user.email);          // "user1@mail.com"
}
main();
```

---

## Tóm tắt chương

| Concept | Bản chất (ESSENCE) | Dùng trong Automation |
|---|---|---|
| **Node.js** | "Bể cá di động" — JS chạy ngoài browser | Runtime để chạy mọi automation test |
| **npm** | "App store" cho code | Tải Playwright, thư viện, tools |
| **package.json** | "Danh sách mua sắm" | Quản lý dependencies & scripts |
| **TypeScript** | JS + "spell check" bắt lỗi sớm | Tránh typo, IDE hỗ trợ tốt |
| **String methods** | Công cụ xử lý text | Verify nội dung trang web |
| **Array methods** | Bộ lọc/biến đổi danh sách | Filter test data, check elements |
| **Destructuring** | "Mở hộp lấy đồ nhanh" | Playwright fixtures `({ page })` |
| **async/await** | Chờ đợi có trật tự | Mọi tương tác với browser |
| **Promise.all** | Làm nhiều việc cùng lúc | Đợi API + click đồng thời |
| **try/catch** | Plan B khi có sự cố | Handle popup, element không tồn tại |

::: tip Tiep theo
Da hieu ngon ngu roi, gio hay hoc cach **to chuc code** chuyen nghiep &rarr; [Automation Framework](./framework).
:::
