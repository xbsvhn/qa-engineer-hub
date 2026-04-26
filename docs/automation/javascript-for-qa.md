# JavaScript & TypeScript cho QA

## Tại sao JavaScript/TypeScript? (WHY)

Bài trước đã giải thích các concept lập trình. Bài này đi sâu vào **JavaScript/TypeScript** — ngôn ngữ bạn sẽ dùng hàng ngày trong automation testing với Playwright.

### JavaScript trong Automation Ecosystem

```
JavaScript / TypeScript
├── Web Automation: Playwright, Cypress, WebdriverIO
├── API Testing: Playwright API, Supertest, Axios
├── Unit Testing: Jest, Vitest, Mocha
├── Mobile Testing: Appium (JS client), Detox
└── Performance: K6 (JS-based scripting)
```

→ Học 1 ngôn ngữ, dùng cho **mọi loại testing**.

---

## Node.js & npm — Nền tảng

### Node.js là gì?

JavaScript ban đầu chỉ chạy trong **browser**. **Node.js** cho phép chạy JavaScript **ở bất kỳ đâu** — server, máy tính, CI/CD pipeline.

```bash
# Kiểm tra Node.js
node --version   # v20.x.x hoặc mới hơn

# Chạy JavaScript file
node hello.js
```

### npm — Package Manager

npm (Node Package Manager) giúp **cài đặt và quản lý** các thư viện (packages).

```bash
# Khởi tạo project mới
npm init -y

# Cài đặt Playwright
npm install -D @playwright/test

# Cài đặt tất cả dependencies từ package.json
npm install

# Chạy scripts
npm test
npm run test:ui
```

### package.json — "Hồ sơ" của project

```json
{
  "name": "my-automation",
  "version": "1.0.0",
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:headed": "npx playwright test --headed",
    "report": "npx playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.0",
    "typescript": "^5.5.0"
  }
}
```

**Giải thích:**
- `scripts` — Các lệnh shortcut để chạy test
- `devDependencies` — Thư viện cần cho development/testing
- `npm test` = chạy `npx playwright test`

---

## TypeScript Essentials cho Automation

### Tại sao TypeScript thay vì JavaScript?

```typescript
// JavaScript — không biết loginData có gì
function login(loginData) {
  page.fill('#email', loginData.emial);  // Typo "emial" → runtime error!
}

// TypeScript — IDE báo lỗi ngay
interface LoginData {
  email: string;
  password: string;
}

function login(loginData: LoginData) {
  page.fill('#email', loginData.emial);  // ❌ IDE gạch đỏ ngay!
  page.fill('#email', loginData.email);  // ✅ Đúng
}
```

### Type Annotations — Khai báo kiểu

```typescript
// Primitive types
let url: string = "https://example.com";
let timeout: number = 30000;
let isHeadless: boolean = true;

// Array
let browsers: string[] = ["chromium", "firefox", "webkit"];

// Object với Interface
interface User {
  name: string;
  email: string;
  age: number;
  isVIP?: boolean;  // ? = optional (có thể có hoặc không)
}

const testUser: User = {
  name: "Test User",
  email: "test@mail.com",
  age: 25
  // isVIP không bắt buộc
};

// Function với type
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// Async function
async function getTitle(page: Page): Promise<string> {
  return await page.title();
}
```

### Type cho Automation Testing

```typescript
// Test data types
interface TestCase {
  id: string;
  description: string;
  input: {
    email: string;
    password: string;
  };
  expected: {
    status: 'success' | 'error';  // Union type — chỉ 1 trong 2 giá trị
    message?: string;
  };
}

const loginTests: TestCase[] = [
  {
    id: 'TC_001',
    description: 'Login with valid credentials',
    input: { email: 'user@mail.com', password: 'Pass@123' },
    expected: { status: 'success' }
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

Dùng nhiều khi verify text, parse response.

```typescript
let text = "  Welcome to Dashboard  ";

text.trim();                    // "Welcome to Dashboard" (bỏ spaces)
text.toLowerCase();             // "  welcome to dashboard  "
text.includes("Dashboard");     // true
text.startsWith("  Welcome");   // true

// Template literals — nối chuỗi
let name = "An";
let greeting = `Hello ${name}, you have ${3} items`; // "Hello An, you have 3 items"

// Regex — kiểm tra pattern
let email = "test@mail.com";
let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // true
```

### 2. Array Methods — Xử lý danh sách

Dùng nhiều khi làm việc với test data, list elements.

```typescript
let prices = [100, 200, 300, 150, 250];

// filter — lọc
let expensive = prices.filter(p => p > 200);        // [300, 250]

// map — biến đổi
let discounted = prices.map(p => p * 0.8);           // [80, 160, 240, 120, 200]

// find — tìm 1 phần tử
let firstBig = prices.find(p => p > 200);            // 300

// some — kiểm tra có ít nhất 1 phần tử thỏa mãn
let hasExpensive = prices.some(p => p > 200);        // true

// every — kiểm tra tất cả phần tử thỏa mãn
let allPositive = prices.every(p => p > 0);          // true

// reduce — tính tổng
let total = prices.reduce((sum, p) => sum + p, 0);   // 1000

// sort
let sorted = [...prices].sort((a, b) => a - b);      // [100, 150, 200, 250, 300]
```

**Trong automation:**
```typescript
// Lấy tất cả product names trên trang
const productNames = await page.locator('.product-name').allTextContents();
// ["iPhone 15", "Samsung S24", "Pixel 8"]

// Kiểm tra tất cả products chứa keyword
const allMatch = productNames.every(name => name.includes("Phone"));

// Lọc products có giá > 10tr
const products = await page.locator('.product').all();
const expensiveProducts = [];
for (const product of products) {
  const price = await product.locator('.price').textContent();
  if (parseInt(price || '0') > 10000000) {
    expensiveProducts.push(product);
  }
}
```

### 3. Object Destructuring — Tách object

```typescript
// Thay vì viết dài
const config = { baseURL: 'https://example.com', timeout: 30000, headless: true };
const baseURL = config.baseURL;
const timeout = config.timeout;

// Destructuring — viết ngắn
const { baseURL, timeout, headless } = config;

// Dùng trong function parameters
function setupTest({ baseURL, timeout }: { baseURL: string; timeout: number }) {
  console.log(`Testing ${baseURL} with timeout ${timeout}ms`);
}

// Dùng trong Playwright fixtures
test('example', async ({ page, context, browser }) => {
  // page, context, browser được destructure từ fixtures
});
```

### 4. Spread Operator — Sao chép và mở rộng

```typescript
// Sao chép array
const browsers = ["chromium", "firefox"];
const allBrowsers = [...browsers, "webkit"];  // ["chromium", "firefox", "webkit"]

// Sao chép và override object
const defaultConfig = { timeout: 30000, headless: true, baseURL: '' };
const testConfig = { ...defaultConfig, baseURL: 'https://staging.example.com' };
// { timeout: 30000, headless: true, baseURL: 'https://staging.example.com' }
```

### 5. Error Handling — Xử lý lỗi

```typescript
// try/catch — bắt lỗi
try {
  await page.click('#button', { timeout: 5000 });
} catch (error) {
  console.log('Button not found, skipping...');
}

// Trong automation test — xử lý popup/dialog không mong đợi
async function safeClick(page: Page, selector: string) {
  try {
    await page.click(selector, { timeout: 3000 });
  } catch {
    console.log(`Element ${selector} not found`);
  }
}
```

### 6. Promises & Promise.all — Chạy song song

```typescript
// Chạy tuần tự (chậm)
const title = await page.title();          // Đợi 100ms
const url = await page.url();              // Đợi 100ms thêm
// Tổng: 200ms

// Chạy song song (nhanh)
const [title, url] = await Promise.all([
  page.title(),
  page.url()
]);
// Tổng: 100ms (chạy đồng thời)

// Practical: đợi cả API response và navigation
const [response] = await Promise.all([
  page.waitForResponse('**/api/login'),
  page.click('#login-btn')                 // Click trigger cả navigation và API call
]);
```

---

## TypeScript Config cho Automation

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./",
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["pages/*"],
      "@utils/*": ["utils/*"],
      "@fixtures/*": ["fixtures/*"]
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Bài tập thực hành

### Bài 1: Variables & Functions
```typescript
// Viết function kiểm tra email valid
function isValidEmail(email: string): boolean {
  // Hint: dùng regex hoặc includes('@')
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Test
console.log(isValidEmail("test@mail.com"));  // true
console.log(isValidEmail("invalid"));         // false
console.log(isValidEmail("a@b"));             // false
```

### Bài 2: Array & Objects
```typescript
// Cho danh sách test results, tính pass rate
interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'skip';
}

const results: TestResult[] = [
  { name: 'Login', status: 'pass' },
  { name: 'Cart', status: 'fail' },
  { name: 'Search', status: 'pass' },
  { name: 'Profile', status: 'pass' },
  { name: 'Settings', status: 'skip' },
];

// Tính pass rate (không tính skip)
const executed = results.filter(r => r.status !== 'skip');
const passed = results.filter(r => r.status === 'pass');
const passRate = (passed.length / executed.length * 100).toFixed(1);
console.log(`Pass rate: ${passRate}%`);  // "Pass rate: 75.0%"
```

### Bài 3: Async/Await
```typescript
// Mô phỏng gọi API
async function fetchUser(id: number): Promise<{ name: string; email: string }> {
  // Giả lập delay 1 giây
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { name: `User ${id}`, email: `user${id}@mail.com` };
}

// Gọi và sử dụng
async function main() {
  const user = await fetchUser(1);
  console.log(user.name);   // "User 1"
  console.log(user.email);  // "user1@mail.com"
}
main();
```

---

## Tóm tắt chương

| Concept | Dùng trong Automation |
|---|---|
| **Node.js + npm** | Runtime và package manager cho mọi project |
| **TypeScript types** | Bắt lỗi sớm, IDE hỗ trợ tốt, code dễ maintain |
| **String methods** | Verify text content, parse response data |
| **Array methods** | Xử lý list elements, filter test data |
| **Destructuring** | Viết code ngắn gọn, Playwright fixtures |
| **async/await** | Mọi tương tác với browser |
| **try/catch** | Xử lý elements không tồn tại, timeout |
| **Promise.all** | Tối ưu tốc độ test, đợi nhiều thứ cùng lúc |

::: tip Tiếp theo
Đã hiểu ngôn ngữ rồi, giờ hãy học cách **tổ chức code** chuyên nghiệp → [Automation Framework](./framework).
:::
