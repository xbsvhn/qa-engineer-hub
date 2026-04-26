# Testing Levels

## Tổng quan

Testing Levels là các **cấp độ kiểm thử** tương ứng với các giai đoạn phát triển phần mềm. Mỗi level có mục đích, phạm vi, và người thực hiện khác nhau.

### Tại sao cần nhiều levels? (WHY)

Mỗi level tìm **loại lỗi khác nhau**:
- **Unit test** tìm lỗi logic trong 1 function
- **Integration test** tìm lỗi giao tiếp giữa các module
- **System test** tìm lỗi khi cả hệ thống hoạt động cùng nhau
- **Acceptance test** xác nhận hệ thống đáp ứng nhu cầu user

Nếu chỉ test ở 1 level → bỏ sót nhiều loại lỗi.

---

## Testing Pyramid

Testing Pyramid là mô hình chỉ dẫn **nên có bao nhiêu test ở mỗi level**:

```
                 ╱  E2E / UI  ╲         Ít test
                ╱   (Slow,     ╲        Chạy chậm
               ╱    Expensive)  ╲       Chi phí cao
              ╱─────────────────╲       Dễ flaky
             ╱   Integration     ╲
            ╱    (Medium speed,   ╲     Vừa phải
           ╱      Medium cost)     ╲
          ╱─────────────────────────╲
         ╱       Unit Tests          ╲   Nhiều test
        ╱      (Fast, Cheap,          ╲  Chạy nhanh
       ╱        Stable)                ╲ Chi phí thấp
      ╱─────────────────────────────────╲
```

### Tại sao hình kim tự tháp? (WHY)

| Level | Speed | Cost | Stability | Số lượng nên có |
|---|---|---|---|---|
| Unit | Milliseconds | Rất thấp | Rất ổn định | **Nhiều nhất** (~70%) |
| Integration | Seconds | Trung bình | Ổn định | **Vừa phải** (~20%) |
| E2E/UI | Minutes | Cao | Hay flaky | **Ít nhất** (~10%) |

**Ví dụ thực tế:**
- 1 dự án có **500 unit tests** (chạy 30 giây)
- **100 integration tests** (chạy 5 phút)
- **30 E2E tests** (chạy 15 phút)

Nếu đảo ngược (nhiều E2E, ít unit) → **Ice Cream Cone anti-pattern**:
- CI/CD chạy chậm (30+ phút)
- Test hay fail ngẫu nhiên (flaky)
- Khó debug khi fail (không biết lỗi ở đâu)

---

## Level 1: Unit Testing

### Bản chất (WHAT)

Test **từng đơn vị nhỏ nhất** của code: 1 function, 1 method, 1 class — **tách biệt** khỏi dependencies.

### Chi tiết

| | |
|---|---|
| **Ai thực hiện** | Developer |
| **Đối tượng** | Function, method, class |
| **Mục đích** | Verify logic đúng cho từng unit riêng lẻ |
| **Dependencies** | Mock/Stub (giả lập) |
| **Khi nào chạy** | Mỗi lần commit, trong CI pipeline |

### Ví dụ code (TypeScript + Jest)

```typescript
// src/utils/price.ts
export function calculateDiscount(price: number, discountPercent: number): number {
  if (price < 0) throw new Error('Price cannot be negative');
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be 0-100');
  }
  return price - (price * discountPercent / 100);
}

// src/utils/price.test.ts
import { calculateDiscount } from './price';

describe('calculateDiscount', () => {
  // Happy path
  test('should calculate 20% discount on 100', () => {
    expect(calculateDiscount(100, 20)).toBe(80);
  });

  test('should return original price when discount is 0', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  test('should return 0 when discount is 100%', () => {
    expect(calculateDiscount(100, 100)).toBe(0);
  });

  // Edge cases
  test('should throw error for negative price', () => {
    expect(() => calculateDiscount(-10, 20)).toThrow('Price cannot be negative');
  });

  test('should throw error for discount > 100', () => {
    expect(() => calculateDiscount(100, 150)).toThrow('Discount must be 0-100');
  });
});
```

### QA cần biết gì về Unit Test?

- Không phải việc của QA **viết** unit test, nhưng cần **hiểu** unit test
- Hỏi dev: "Code coverage bao nhiêu %?" → Nên ≥ 80%
- Unit test pass không có nghĩa hệ thống không có bug
- Nếu unit test coverage thấp → tăng focus vào integration và manual testing

---

## Level 2: Integration Testing

### Bản chất (WHAT)

Test **sự tương tác giữa các module/component**. Module A gọi Module B → kết quả có đúng không?

### Chi tiết

| | |
|---|---|
| **Ai thực hiện** | Developer / SDET / QA |
| **Đối tượng** | Tương tác giữa 2+ modules |
| **Mục đích** | Verify interface và data flow giữa các module |
| **Dependencies** | Real hoặc partial mock |
| **Khi nào chạy** | Sau unit test, trong CI pipeline |

### Các approach

```
Big Bang:     [A] + [B] + [C] + [D]  →  Test tất cả cùng lúc
              ⚠️ Khó debug khi fail

Top-down:     [A] → [B] → [C] → [D]  →  Từ trên xuống
              Dùng Stub cho module chưa có

Bottom-up:    [D] → [C] → [B] → [A]  →  Từ dưới lên
              Dùng Driver để gọi module

Sandwich:     Kết hợp Top-down + Bottom-up
              Phổ biến nhất trong thực tế
```

### Ví dụ code (API Integration Test)

```typescript
// Test: User Service gọi Database thực
import request from 'supertest';
import app from '../app';
import { db } from '../database';

describe('POST /api/users', () => {
  // Setup: clean database trước mỗi test
  beforeEach(async () => {
    await db.query('DELETE FROM users WHERE email = $1', ['test@mail.com']);
  });

  test('should create user and return 201', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'test@mail.com',
        password: 'Pass@123'
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@mail.com');

    // Verify data actually saved in DB
    const dbResult = await db.query('SELECT * FROM users WHERE email = $1', ['test@mail.com']);
    expect(dbResult.rows.length).toBe(1);
  });

  test('should return 409 for duplicate email', async () => {
    // Create first user
    await request(app).post('/api/users').send({
      name: 'User 1', email: 'test@mail.com', password: 'Pass@123'
    });

    // Try create duplicate
    const response = await request(app).post('/api/users').send({
      name: 'User 2', email: 'test@mail.com', password: 'Pass@456'
    });

    expect(response.status).toBe(409);
  });
});
```

### Loại lỗi Integration Test tìm được

- API trả về data format khác với frontend expect
- Database query sai khi có JOIN nhiều bảng
- Service A gửi request đến Service B nhưng authentication fail
- Data type mismatch giữa các module (string vs number)
- Race condition khi 2 services cùng update 1 record

---

## Level 3: System Testing

### Bản chất (WHAT)

Test **toàn bộ hệ thống** như một khối hoàn chỉnh, trong môi trường giống production nhất có thể.

### Chi tiết

| | |
|---|---|
| **Ai thực hiện** | QA Team |
| **Đối tượng** | Toàn bộ hệ thống (end-to-end) |
| **Mục đích** | Verify hệ thống đáp ứng requirements |
| **Environment** | Staging (giống production) |
| **Khi nào** | Sau Integration Testing |

### Bao gồm

**Functional Testing:**
- Kiểm tra tất cả features hoạt động đúng requirements
- End-to-end flows: Register → Login → Browse → Add to cart → Checkout → Payment
- Negative testing: invalid inputs, error handling

**Non-functional Testing:**
- **Performance:** Response time < 2s, handle 1000 concurrent users
- **Security:** SQL injection, XSS, authentication bypass
- **Usability:** UI dễ dùng, consistent, accessible
- **Compatibility:** Chrome, Firefox, Safari, mobile

### Ví dụ: E2E Test với Playwright

```typescript
import { test, expect } from '@playwright/test';

test('Complete checkout flow', async ({ page }) => {
  // 1. Login
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'customer@test.com');
  await page.fill('[data-testid="password"]', 'Pass@123');
  await page.click('[data-testid="login-btn"]');
  await expect(page).toHaveURL('/dashboard');

  // 2. Add product to cart
  await page.goto('/products');
  await page.click('[data-testid="product-1"] >> text=Add to Cart');
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

  // 3. Checkout
  await page.click('[data-testid="cart-icon"]');
  await page.click('text=Checkout');

  // 4. Fill shipping
  await page.fill('[data-testid="address"]', '123 Main St');
  await page.fill('[data-testid="city"]', 'Ho Chi Minh');
  await page.click('text=Continue');

  // 5. Payment
  await page.fill('[data-testid="card-number"]', '4111111111111111');
  await page.fill('[data-testid="expiry"]', '12/28');
  await page.fill('[data-testid="cvv"]', '123');
  await page.click('text=Place Order');

  // 6. Verify order confirmation
  await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
  await expect(page.locator('[data-testid="order-id"]')).toContainText('ORD-');
});
```

---

## Level 4: Acceptance Testing (UAT)

### Bản chất (WHAT)

Test từ **góc nhìn end-user** hoặc business để xác nhận hệ thống sẵn sàng đưa vào sử dụng.

### Chi tiết

| | |
|---|---|
| **Ai thực hiện** | End users, Business team, Product Owner |
| **Đối tượng** | Business flows, User experience |
| **Mục đích** | Confirm: "Đây là cái tôi cần" |
| **Environment** | UAT environment (gần giống production) |
| **Khi nào** | Sau System Testing, trước go-live |

### Phân loại

#### Alpha Testing
- Test **tại công ty phát triển**
- Bởi internal users hoặc QA team đóng vai user
- Phát hiện bugs trước khi release cho external users

#### Beta Testing
- Test **tại môi trường thực** của user
- Bởi **real users** (limited group)
- Thu thập feedback thực tế trước khi release chính thức
- Ví dụ: TestFlight (iOS), Google Play Beta, Early Access programs

### QA Role trong UAT

QA không trực tiếp execute UAT, nhưng:
- **Chuẩn bị** UAT test cases/scenarios cho business users
- **Hỗ trợ** users khi gặp issues
- **Log và track** bugs từ UAT
- **Verify fixes** cho UAT bugs
- **Tổng kết** UAT results

---

## Tổng hợp: Mỗi level tìm lỗi gì?

| Level | Ví dụ lỗi tìm được |
|---|---|
| **Unit** | Function tính sai, logic if/else sai, null pointer |
| **Integration** | API trả sai format, database query lỗi, service timeout |
| **System** | Checkout flow bị break, search không ra kết quả, performance chậm |
| **Acceptance** | Flow khó dùng, thiếu feature user cần, UX confusing |

---

## Thực tế dự án: Ai làm gì?

```
Developer:
├── Unit Tests (viết code test)
└── Integration Tests (một phần)

QA Engineer:
├── Integration Tests (API testing, database verification)
├── System Testing (functional + non-functional)
├── E2E Automation (Playwright/Selenium)
└── Hỗ trợ UAT

Business / Product Owner:
└── Acceptance Testing (UAT)
```

### Trong Agile Sprint

```
Day 1-2:  Dev codes + writes unit tests
Day 2-3:  QA writes test cases + automation scripts
Day 3-7:  Dev done → QA executes tests (manual + automation)
Day 7-8:  Bug fixes + retesting
Day 8-9:  Regression testing
Day 9-10: UAT + Sprint Demo
```

---

## Tóm tắt chương

| Level | Ai test | Tìm lỗi gì | Tools phổ biến |
|---|---|---|---|
| **Unit** | Developer | Logic trong function | Jest, JUnit, pytest |
| **Integration** | Dev/QA | Tương tác giữa modules | Supertest, Postman, REST Assured |
| **System** | QA Team | Toàn bộ hệ thống | Playwright, Selenium, JMeter |
| **Acceptance** | Business/Users | Đáp ứng nhu cầu user | Manual, demo |

::: tip Ghi nhớ
Testing Pyramid: **Nhiều Unit, vừa Integration, ít E2E**. Đây là nguyên tắc vàng trong automation testing.
:::
