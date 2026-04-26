# API Automation

## Tại sao cần Automation cho API? (WHY)

Postman tốt cho **manual testing và exploration**, nhưng có giới hạn:
- Không tích hợp được CI/CD pipeline dễ dàng
- Logic test phức tạp khó implement
- Không có code review, version control
- Collection lớn khó maintain

**API Automation = viết code** để test API, tích hợp vào CI/CD → mỗi lần deploy tự động chạy.

---

## Playwright API Testing (Recommended)

Playwright không chỉ test UI — nó có **built-in API testing** rất mạnh. Dùng cùng framework cho cả UI và API → không cần thêm tool.

### Setup

```bash
# Nếu đã có Playwright project
# Không cần cài thêm gì — API testing built-in!
```

### GET Request

```typescript
import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  const BASE_URL = 'https://api.example.com';

  test('GET /users should return users list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);

    // Status code
    expect(response.status()).toBe(200);

    // Response body
    const body = await response.json();
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);

    // Verify first user structure
    const user = body[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(user.email).toMatch(/@/);
  });

  test('GET /users/:id should return specific user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
  });

  test('GET /users/:id with non-existent ID should return 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/99999`);
    expect(response.status()).toBe(404);
  });
});
```

### POST Request

```typescript
test.describe('Create User', () => {
  test('POST /users should create new user', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      email: `test_${Date.now()}@mail.com`,  // Unique email mỗi lần chạy
      password: 'Pass@123'
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: newUser
    });

    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created.id).toBeDefined();
    expect(created.name).toBe(newUser.name);
    expect(created.email).toBe(newUser.email);
    // Password KHÔNG được trả về trong response!
    expect(created).not.toHaveProperty('password');
  });

  test('POST /users without name should return 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        email: 'test@mail.com',
        password: 'Pass@123'
        // Thiếu name
      }
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.message).toContain('name');
  });

  test('POST /users with invalid email should return 422', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Test',
        email: 'not-an-email',
        password: 'Pass@123'
      }
    });

    expect(response.status()).toBe(422);
  });
});
```

### PUT & PATCH

```typescript
test.describe('Update User', () => {
  let userId: number;

  // Tạo user trước khi test update
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Original Name',
        email: `update_test_${Date.now()}@mail.com`,
        password: 'Pass@123'
      }
    });
    const user = await response.json();
    userId = user.id;
  });

  test('PUT should replace entire user', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/${userId}`, {
      data: {
        name: 'Updated Name',
        email: 'updated@mail.com',
        role: 'vip'
      }
    });

    expect(response.status()).toBe(200);
    const updated = await response.json();
    expect(updated.name).toBe('Updated Name');
    expect(updated.email).toBe('updated@mail.com');
  });

  test('PATCH should update only specified fields', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/users/${userId}`, {
      data: { name: 'Patched Name' }
    });

    expect(response.status()).toBe(200);
    const patched = await response.json();
    expect(patched.name).toBe('Patched Name');
    // Email không gửi → phải giữ nguyên
    expect(patched.email).toBeTruthy();
  });
});
```

### DELETE

```typescript
test.describe('Delete User', () => {
  test('DELETE /users/:id should remove user', async ({ request }) => {
    // 1. Tạo user
    const createRes = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'To Delete',
        email: `delete_${Date.now()}@mail.com`,
        password: 'Pass@123'
      }
    });
    const user = await createRes.json();

    // 2. Delete
    const deleteRes = await request.delete(`${BASE_URL}/users/${user.id}`);
    expect(deleteRes.status()).toBe(204);

    // 3. Verify deleted — GET should return 404
    const getRes = await request.get(`${BASE_URL}/users/${user.id}`);
    expect(getRes.status()).toBe(404);
  });
});
```

### Authentication

```typescript
test.describe('Authenticated API Tests', () => {
  let token: string;

  // Login và lấy token trước tất cả tests
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: 'admin@example.com',
        password: 'AdminPass@123'
      }
    });
    const body = await response.json();
    token = body.token;
  });

  test('GET /profile should return current user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    expect(response.status()).toBe(200);
    const profile = await response.json();
    expect(profile.email).toBe('admin@example.com');
  });

  test('GET /profile without token should return 401', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/profile`);
    expect(response.status()).toBe(401);
  });

  test('GET /admin with user token should return 403', async ({ request }) => {
    // Login as normal user
    const loginRes = await request.post(`${BASE_URL}/auth/login`, {
      data: { email: 'user@example.com', password: 'UserPass@123' }
    });
    const userToken = (await loginRes.json()).token;

    // Try admin endpoint
    const response = await request.get(`${BASE_URL}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    expect(response.status()).toBe(403);
  });
});
```

---

## API + UI Testing kết hợp

Một trong những **lợi thế lớn nhất** của Playwright: test API và UI **trong cùng 1 test**.

```typescript
test('Create product via API, verify on UI', async ({ request, page }) => {
  // 1. Setup: Tạo product qua API (nhanh, reliable)
  const response = await request.post(`${BASE_URL}/products`, {
    data: {
      name: 'iPhone 15 Pro',
      price: 28990000,
      category: 'phones'
    },
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const product = await response.json();

  // 2. Verify: Kiểm tra trên UI
  await page.goto(`/products/${product.id}`);
  await expect(page.getByRole('heading', { name: 'iPhone 15 Pro' })).toBeVisible();
  await expect(page.getByTestId('price')).toContainText('28,990,000');

  // 3. Cleanup: Xóa qua API
  await request.delete(`${BASE_URL}/products/${product.id}`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
});
```

**Pattern phổ biến:**
- **Setup/Teardown qua API** — nhanh, không phụ thuộc UI
- **Verify qua UI** — đảm bảo user thấy đúng
- **Cleanup qua API** — sạch sẽ, không ảnh hưởng tests khác

---

## Playwright Config cho API Testing

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://staging-api.example.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  projects: [
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        // API tests không cần browser
        // Chạy nhanh hơn nhiều
      },
    },
    {
      name: 'ui-tests',
      testDir: './tests/ui',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
```

```bash
# Chạy chỉ API tests (nhanh, không cần browser)
npx playwright test --project=api-tests

# Chạy chỉ UI tests
npx playwright test --project=api-tests

# Chạy tất cả
npx playwright test
```

---

## Cấu trúc Project API Tests

```
tests/
├── api/
│   ├── auth.spec.ts          # Login, Register, Token refresh
│   ├── users.spec.ts         # CRUD Users
│   ├── products.spec.ts      # CRUD Products
│   ├── orders.spec.ts        # Create, Update status
│   └── search.spec.ts        # Search, Filter, Pagination
├── ui/
│   └── ...
├── fixtures/
│   ├── api-data/
│   │   ├── users.json        # Test data cho user tests
│   │   └── products.json     # Test data cho product tests
│   └── api.fixture.ts        # Custom fixture (auth token)
└── utils/
    └── api-helper.ts         # Helper functions
```

### API Helper

```typescript
// utils/api-helper.ts
import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;
  private token: string = '';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post('/auth/login', {
      data: { email, password }
    });
    const body = await response.json();
    this.token = body.token;
    return this.token;
  }

  async createUser(data: { name: string; email: string; password: string }) {
    const response = await this.request.post('/users', {
      data,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return response.json();
  }

  async deleteUser(id: number) {
    await this.request.delete(`/users/${id}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }
}
```

---

## Tóm tắt chương

| Approach | Dùng khi | Tool |
|---|---|---|
| **Postman (manual)** | Explore API, ad-hoc testing | Postman GUI |
| **Playwright API** | Automation, CI/CD, API + UI | `request` fixture |
| **Supertest** | Node.js backend team | supertest + jest |
| **REST Assured** | Java team | REST Assured + TestNG |

### API Testing Workflow

```
1. Đọc API docs (Swagger)           → Hiểu endpoints, request/response format
2. Test manual bằng Postman          → Explore, tìm bugs nhanh
3. Viết automation bằng Playwright   → Regression, CI/CD
4. Tích hợp CI/CD pipeline          → Tự động chạy mỗi deploy
5. Maintain & update                 → Thêm test khi có API mới
```

::: tip Recommendation
**Postman cho exploration** → **Playwright cho automation**. Đây là combo hiệu quả nhất cho QA hiện nay. Không cần học thêm tool riêng cho API automation.
:::
