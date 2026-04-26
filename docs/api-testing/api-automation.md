# API Automation

## Tại sao code thay vì Postman? — Gọi tay vs Hệ thống gọi tự động

Postman giống **gọi điện tay** — bạn phải ngồi đó, nhấc máy, bấm số, chờ kết quả. Tốt khi cần gọi vài cuộc.

Nhưng nếu bạn cần gọi **500 cuộc mỗi ngày**, mỗi lần code thay đổi? Bạn cần **hệ thống gọi tự động (auto-dialer)** — đó chính là **API automation bằng code**.

| Postman (Gọi tay) | Code (Hệ thống tự động) |
|---|---|
| Bạn phải mở Postman, click Send | Code tự chạy mỗi khi deploy |
| Khó tích hợp CI/CD | CI/CD chạy tự động → fail = chặn deploy |
| Logic phức tạp khó viết | Viết bất kỳ logic nào bạn muốn |
| Không có version control | Code lưu trên Git → review, track changes |
| Collection lớn khó maintain | File code dễ organize, refactor |

:::tip Aha Moment
**Postman là cho "khám phá"**, code là cho "canh gác". Bạn dùng Postman để tìm hiểu API mới → sau đó viết code automation để **tự động canh gác** API đó mỗi ngày. Giống bạn tự đi kiểm tra nhà hàng 1 lần → rồi lắp camera giám sát 24/7.
:::

---

## Playwright API Testing — Cùng tool cho cả UI và API

**Playwright** không chỉ test UI (click button, fill form). Nó có **built-in API testing** (test API tích hợp sẵn) — cùng 1 tool cho cả hai. Không cần cài thêm thư viện nào!

### `request` fixture — "Chiếc điện thoại" trong code

Trong Postman, bạn có GUI để gửi request. Trong Playwright, bạn có **`request` fixture** — một object (đối tượng) giúp gửi HTTP request từ code.

```typescript
// Playwright tự cung cấp "request" — không cần tạo hay cấu hình gì
test('tên test', async ({ request }) => {
  //                        ↑ "request" = chiếc điện thoại để gọi API
  //                          Playwright tự inject vào, bạn chỉ cần dùng
});
```

---

## GET Request — "Xem menu" bằng code

```typescript
import { test, expect } from '@playwright/test';
// import test và expect từ Playwright
// test = hàm tạo test case
// expect = hàm assertion (kiểm tra điều kiện)

test.describe('Users API', () => {
  // test.describe = nhóm các test liên quan lại với nhau
  // Giống folder trong Postman

  const BASE_URL = 'https://api.example.com';
  // BASE_URL = địa chỉ gốc của API, giống {{base_url}} trong Postman

  test('GET /users trả về danh sách users', async ({ request }) => {
    // async ({ request }) = nhận "chiếc điện thoại" từ Playwright
    // async/await = chờ kết quả trước khi tiếp tục (vì gọi API mất thời gian)

    const response = await request.get(`${BASE_URL}/users`);
    // request.get() = gửi GET request, giống chọn GET + bấm Send trong Postman
    // await = chờ server trả response xong mới tiếp tục
    // response = kết quả trả về từ server

    // ===== Kiểm tra status code =====
    expect(response.status()).toBe(200);
    // response.status() = lấy status code (ví dụ: 200, 404, 500)
    // .toBe(200) = phải bằng 200

    // ===== Kiểm tra response body =====
    const body = await response.json();
    // response.json() = chuyển body từ text sang JSON object
    // Giống pm.response.json() trong Postman

    expect(body).toBeInstanceOf(Array);
    // body phải là Array (danh sách), không phải object đơn lẻ

    expect(body.length).toBeGreaterThan(0);
    // Danh sách phải có ít nhất 1 phần tử (không rỗng)

    // ===== Kiểm tra cấu trúc của user đầu tiên =====
    const user = body[0];
    // Lấy user đầu tiên trong danh sách (index 0)

    expect(user).toHaveProperty('id');
    // user phải có property "id"

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');

    expect(typeof user.id).toBe('number');
    // typeof = kiểm tra kiểu dữ liệu, "id" phải là number

    expect(typeof user.name).toBe('string');
    // "name" phải là string (text)

    expect(user.email).toMatch(/@/);
    // email phải chứa ký tự "@" (regex pattern)
  });

  test('GET /users/1 trả về đúng user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    // id phải bằng 1 — đúng user mình yêu cầu

    expect(user.name).toBeTruthy();
    // .toBeTruthy() = phải có giá trị (không null, không undefined, không "")

    expect(user.email).toBeTruthy();
  });

  test('GET user không tồn tại trả về 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/99999`);
    // User id 99999 không tồn tại

    expect(response.status()).toBe(404);
    // Phải trả 404 Not Found — không phải 200 hay 500!
  });
});
```

---

## POST Request — "Gọi món mới" bằng code

```typescript
test.describe('Create User', () => {

  test('POST /users tạo user mới thành công', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      email: `test_${Date.now()}@mail.com`,
      // Date.now() = số mili-giây hiện tại → email luôn unique mỗi lần chạy
      // Tránh lỗi "email đã tồn tại" khi chạy lại test
      password: 'Pass@123'
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: newUser
      // data = body của request, giống tab Body trong Postman
      // Playwright tự set Content-Type: application/json
    });

    expect(response.status()).toBe(201);
    // 201 Created = tạo thành công

    const created = await response.json();

    expect(created.id).toBeDefined();
    // .toBeDefined() = phải có giá trị (server phải trả id cho user mới)

    expect(created.name).toBe(newUser.name);
    // Tên trả về phải khớp với tên gửi đi

    expect(created.email).toBe(newUser.email);

    expect(created).not.toHaveProperty('password');
    // BẢO MẬT: password KHÔNG ĐƯỢC trả về trong response!
    // Nếu có → đó là BUG bảo mật!
  });

  test('POST thiếu name trả về 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        email: 'test@mail.com',
        password: 'Pass@123'
        // Thiếu "name" — field bắt buộc
      }
    });

    expect(response.status()).toBe(400);
    // 400 Bad Request = request sai format

    const error = await response.json();
    expect(error.message).toContain('name');
    // Error message phải chỉ rõ field nào thiếu ("name")
    // Nếu chỉ trả "Bad Request" chung chung → UX kém, nên log bug
  });

  test('POST email sai format trả về 422', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Test',
        email: 'not-an-email',
        // "not-an-email" không phải email hợp lệ (thiếu @)
        password: 'Pass@123'
      }
    });

    expect(response.status()).toBe(422);
    // 422 Unprocessable Entity = data đúng format JSON nhưng giá trị không hợp lệ
  });
});
```

---

## PUT & PATCH — "Đổi order" bằng code

```typescript
test.describe('Update User', () => {
  let userId: number;
  // Biến lưu id của user sẽ tạo để test update
  // let = khai báo biến có thể thay đổi giá trị

  test.beforeAll(async ({ request }) => {
    // beforeAll = chạy 1 lần TRƯỚC tất cả tests trong describe này
    // Tạo user trước → rồi mới test update

    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Original Name',
        email: `update_test_${Date.now()}@mail.com`,
        password: 'Pass@123'
      }
    });
    const user = await response.json();
    userId = user.id;
    // Lưu id để dùng trong các test bên dưới
  });

  test('PUT thay thế toàn bộ user', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/${userId}`, {
      // request.put() = gửi PUT request
      // ${userId} = dùng id user đã tạo ở beforeAll
      data: {
        name: 'Updated Name',
        email: 'updated@mail.com',
        role: 'vip'
        // PUT gửi TOÀN BỘ fields — field nào không gửi sẽ bị null!
      }
    });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.name).toBe('Updated Name');
    expect(updated.email).toBe('updated@mail.com');
  });

  test('PATCH chỉ sửa field được gửi', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/users/${userId}`, {
      // request.patch() = gửi PATCH request
      data: { name: 'Patched Name' }
      // Chỉ gửi "name" → các field khác phải giữ nguyên!
    });

    expect(response.status()).toBe(200);

    const patched = await response.json();
    expect(patched.name).toBe('Patched Name');
    // name đã được update

    expect(patched.email).toBeTruthy();
    // email PHẢI vẫn còn (không bị null)
    // Nếu email bị null → PATCH hoạt động sai (giống PUT) → BUG!
  });
});
```

---

## DELETE — "Hủy món" bằng code

```typescript
test.describe('Delete User', () => {

  test('DELETE xóa user thành công', async ({ request }) => {
    // Bước 1: Tạo user để xóa (không xóa data có sẵn!)
    const createRes = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'To Delete',
        email: `delete_${Date.now()}@mail.com`,
        password: 'Pass@123'
      }
    });
    const user = await createRes.json();
    // user.id = id user vừa tạo

    // Bước 2: Gửi DELETE request
    const deleteRes = await request.delete(`${BASE_URL}/users/${user.id}`);
    // request.delete() = gửi DELETE request

    expect(deleteRes.status()).toBe(204);
    // 204 No Content = xóa thành công, không trả body

    // Bước 3: Verify — GET lại user đã xóa phải trả 404
    const getRes = await request.get(`${BASE_URL}/users/${user.id}`);

    expect(getRes.status()).toBe(404);
    // User đã bị xóa → GET phải trả 404 Not Found
    // Nếu vẫn trả 200 → DELETE không hoạt động → BUG!
  });
});
```

:::tip Aha Moment
Pattern **Create → Action → Verify → Cleanup** rất phổ biến trong API testing:
1. **Create** data test bằng API (nhanh, không phụ thuộc UI)
2. **Action** — thực hiện hành động cần test
3. **Verify** — kiểm tra kết quả
4. **Cleanup** — dọn dẹp data test (nếu cần)

Mỗi test tự tạo data riêng → không phụ thuộc test khác → chạy song song được!
:::

---

## Authentication — Gửi token trong code

```typescript
test.describe('Authenticated API Tests', () => {
  let token: string;
  // Biến lưu token sau khi login

  test.beforeAll(async ({ request }) => {
    // Login 1 lần trước tất cả tests
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: 'admin@example.com',
        password: 'AdminPass@123'
      }
    });
    const body = await response.json();
    token = body.token;
    // Lưu token — giống pm.environment.set("token") trong Postman
  });

  test('GET /profile trả về user hiện tại', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
        // Gửi token trong header — giống "giơ vòng tay" ở lễ hội
        // Template literal: `Bearer ${token}` = "Bearer " + giá trị token
      }
    });

    expect(response.status()).toBe(200);

    const profile = await response.json();
    expect(profile.email).toBe('admin@example.com');
    // Profile phải khớp với account đã login
  });

  test('Không có token trả về 401', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/profile`);
    // Không gửi Authorization header → không có "vòng tay"

    expect(response.status()).toBe(401);
    // 401 Unauthorized = chưa xác thực
  });

  test('User thường không vào được trang admin', async ({ request }) => {
    // Login bằng account user thường (không phải admin)
    const loginRes = await request.post(`${BASE_URL}/auth/login`, {
      data: { email: 'user@example.com', password: 'UserPass@123' }
    });
    const userToken = (await loginRes.json()).token;

    // Thử truy cập endpoint admin
    const response = await request.get(`${BASE_URL}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    expect(response.status()).toBe(403);
    // 403 Forbidden = có token (đã xác thực) nhưng không đủ quyền
    // Giống có vé thường nhưng đòi vào khu VIP
  });
});
```

---

## API + UI Testing kết hợp — Tạo bằng API, verify trên UI

Đây là **lợi thế lớn nhất** của Playwright: test API và UI **trong cùng 1 test**. Pattern cực kỳ hiệu quả:

- **Tạo data bằng API** — nhanh, đáng tin cậy, không phụ thuộc UI
- **Verify trên UI** — đảm bảo người dùng thật sự thấy đúng
- **Dọn dẹp bằng API** — sạch sẽ, nhanh gọn

```typescript
test('Tạo product qua API, verify trên UI', async ({ request, page }) => {
  // ({ request, page }) = nhận cả 2 tool:
  //   request = "điện thoại" gọi API
  //   page = "trình duyệt" để test UI

  // ===== Bước 1: Setup — Tạo product qua API (nhanh!) =====
  const response = await request.post(`${BASE_URL}/products`, {
    data: {
      name: 'iPhone 15 Pro',
      price: 28990000,
      category: 'phones'
    },
    headers: { 'Authorization': `Bearer ${adminToken}` }
    // Cần admin token để tạo product
  });
  const product = await response.json();
  // product.id = id sản phẩm vừa tạo

  // ===== Bước 2: Verify — Kiểm tra trên giao diện web =====
  await page.goto(`/products/${product.id}`);
  // Mở trang chi tiết sản phẩm trên trình duyệt

  await expect(
    page.getByRole('heading', { name: 'iPhone 15 Pro' })
  ).toBeVisible();
  // Kiểm tra tiêu đề "iPhone 15 Pro" hiển thị trên trang

  await expect(
    page.getByTestId('price')
  ).toContainText('28,990,000');
  // Kiểm tra giá hiển thị đúng (có format dấu phẩy)

  // ===== Bước 3: Cleanup — Xóa qua API (sạch sẽ!) =====
  await request.delete(`${BASE_URL}/products/${product.id}`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  // Xóa product test → không làm bẩn database
});
```

:::tip Aha Moment
Tại sao không tạo product bằng UI? Vì UI test **chậm** (phải mở trang, fill form, click button, đợi redirect...) và **dễ flaky** (nếu UI thay đổi, test vỡ). API tạo data trong **mili-giây** và **không bao giờ flaky**. Dùng API cho setup, UI cho verify — **best of both worlds!**
:::

---

## Playwright Config cho API Testing

```typescript
// playwright.config.ts — File cấu hình Playwright
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://staging-api.example.com',
    // baseURL = URL gốc, giống {{base_url}} trong Postman
    // Khi gọi request.get('/users'), Playwright tự thêm baseURL phía trước

    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // extraHTTPHeaders = headers tự động gửi kèm MỌI request
    // Không cần set lại trong từng test
  },

  projects: [
    {
      name: 'api-tests',
      // Project riêng cho API tests
      testDir: './tests/api',
      // Chỉ chạy file trong thư mục tests/api
      // API tests KHÔNG cần browser → chạy nhanh hơn nhiều!
    },
    {
      name: 'ui-tests',
      // Project riêng cho UI tests
      testDir: './tests/ui',
      use: {
        browserName: 'chromium',
        // UI tests cần browser
      },
    },
  ],
});
```

**Chạy tests:**

```bash
# Chạy chỉ API tests (nhanh, không cần browser)
npx playwright test --project=api-tests

# Chạy chỉ UI tests
npx playwright test --project=ui-tests

# Chạy tất cả
npx playwright test
```

---

## Cấu trúc Project — Organize code gọn gàng

```
tests/
├── api/                              ← Tất cả API tests
│   ├── auth.spec.ts                  ← Login, Register, Token refresh
│   ├── users.spec.ts                 ← CRUD Users
│   ├── products.spec.ts              ← CRUD Products
│   ├── orders.spec.ts                ← Create, Update status
│   └── search.spec.ts               ← Search, Filter, Pagination
├── ui/                               ← Tất cả UI tests
│   └── ...
├── fixtures/
│   ├── api-data/
│   │   ├── users.json                ← Test data cho user tests
│   │   └── products.json             ← Test data cho product tests
│   └── api.fixture.ts               ← Custom fixture (auto-login)
└── utils/
    └── api-helper.ts                 ← Helper functions dùng chung
```

### API Helper — "Trợ lý" dùng chung cho nhiều tests

```typescript
// utils/api-helper.ts
import { APIRequestContext } from '@playwright/test';
// APIRequestContext = kiểu dữ liệu của object "request"

export class ApiHelper {
  // class = "khuôn mẫu" tạo object có methods (hành động) và properties (thuộc tính)
  private request: APIRequestContext;
  // private = chỉ dùng bên trong class này, bên ngoài không truy cập được
  private token: string = '';

  constructor(request: APIRequestContext) {
    // constructor = hàm chạy khi tạo object mới: new ApiHelper(request)
    this.request = request;
    // Lưu "chiếc điện thoại" để dùng trong các method
  }

  async login(email: string, password: string): Promise<string> {
    // Method login: gửi email+password → nhận token
    // Promise<string> = hàm async trả về string (token)
    const response = await this.request.post('/auth/login', {
      data: { email, password }
    });
    const body = await response.json();
    this.token = body.token;
    // Lưu token để tự động gửi trong các request sau
    return this.token;
  }

  async createUser(data: { name: string; email: string; password: string }) {
    // Method tạo user — tự gửi kèm token
    const response = await this.request.post('/users', {
      data,
      headers: { 'Authorization': `Bearer ${this.token}` }
      // Tự đính kèm token — không cần nhớ gửi mỗi lần
    });
    return response.json();
  }

  async deleteUser(id: number) {
    // Method xóa user — dùng để cleanup sau test
    await this.request.delete(`/users/${id}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }
}
```

---

## Tóm tắt chương

| Approach | Bản chất (Essence) | Khi dùng |
|---|---|---|
| **Postman (manual)** | Gọi điện tay — nhanh, trực quan | Explore API, ad-hoc testing |
| **Playwright API** | Hệ thống gọi tự động — code chạy mỗi ngày | Automation, CI/CD, API + UI |
| **API + UI combo** | Tạo bằng API (nhanh), verify trên UI (visual) | E2E testing hiệu quả nhất |

### API Testing Workflow — Lộ trình từ manual đến automation

```
1. Đọc API docs (Swagger)           → Hiểu "menu" — có gì, format nào
2. Test manual bằng Postman          → "Gọi thử" — khám phá, tìm bugs nhanh
3. Viết automation bằng Playwright   → "Lắp camera" — tự động canh gác
4. Tích hợp CI/CD pipeline          → Mỗi deploy tự chạy → fail = chặn deploy
5. Maintain & update                 → API mới → thêm test mới
```

::: tip Aha Moment
**Postman cho exploration, Playwright cho automation.** Đây là combo hiệu quả nhất cho QA hiện nay. Bạn không cần học thêm tool riêng cho API automation — Playwright làm được cả UI và API trong cùng 1 framework!
:::
