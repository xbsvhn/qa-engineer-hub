# Testing Levels — Các Tầng Kiểm Thử

## Bắt đầu từ một câu chuyện

Hãy tưởng tượng bạn đang **xây một ngôi nhà**. Bạn có thuê thợ xây xong rồi dọn vào ở luôn không? Chắc chắn là không. Bạn sẽ kiểm tra theo từng bước:

1. **Kiểm tra từng viên gạch** — Viên nào bị nứt thì loại bỏ ngay
2. **Kiểm tra các bức tường** — Gạch xếp lên nhau có vững không, mạch vữa có dính không
3. **Kiểm tra toàn bộ ngôi nhà** — Điện nước chạy ổn không, cửa đóng mở được không, mái có dột không
4. **Cho người thật vào ở thử** — Họ thấy thoải mái không, có thiếu gì không

Đây chính là bản chất của **Testing Levels** (các cấp độ kiểm thử) trong phần mềm. Mỗi level tìm ra **loại lỗi khác nhau**, ở **thời điểm khác nhau**, bởi **người khác nhau**.

> Nếu chỉ kiểm tra ở một level duy nhất, bạn sẽ bỏ sót rất nhiều lỗi — giống như chỉ kiểm tra gạch mà không kiểm tra cả ngôi nhà vậy.

---

## Testing Pyramid — Kim Tự Tháp Kiểm Thử

### Hình dung trực quan

```
                    ╱╲
                   ╱  ╲
                  ╱ E2E╲          ← Ít test nhất (như kiểm tra toàn bộ nhà)
                 ╱ / UI  ╲
                ╱──────────╲
               ╱            ╲
              ╱ Integration   ╲    ← Số lượng vừa phải (như kiểm tra tường)
             ╱                 ╲
            ╱───────────────────╲
           ╱                     ╲
          ╱     Unit Tests        ╲  ← Nhiều test nhất (như kiểm tra từng viên gạch)
         ╱                         ╲
        ╱───────────────────────────╲
```

### Tại sao lại là hình kim tự tháp?

Đây là câu hỏi quan trọng nhất. Nhiều người nhớ hình dáng nhưng không hiểu **lý do**.

Hãy nghĩ thế này: khi bạn kiểm tra **từng viên gạch**, việc đó rất nhanh — nhặt lên, gõ thử, xong. Nhưng khi kiểm tra **toàn bộ ngôi nhà**, bạn phải đi từng phòng, bật từng công tắc, mở từng vòi nước — rất tốn thời gian.

Trong phần mềm cũng vậy:

| Level | Tốc độ chạy | Chi phí | Độ ổn định | Tỷ lệ nên có |
|---|---|---|---|---|
| **Unit** | Vài millisecond (phần nghìn giây) | Rất thấp | Rất ổn định | **~70%** tổng số test |
| **Integration** | Vài giây | Trung bình | Ổn định | **~20%** tổng số test |
| **E2E / System** | Vài phút | Cao | Hay "flaky" (lúc pass lúc fail) | **~10%** tổng số test |

**Ví dụ thực tế trong một dự án:**
- **500 unit tests** → chạy hết trong 30 giây
- **100 integration tests** → chạy hết trong 5 phút
- **30 E2E tests** → chạy hết trong 15 phút

Tại sao unit test nhanh? Vì nó chỉ test **một mẩu code nhỏ**, không cần kết nối database, không cần mở trình duyệt, không cần gọi API. Còn E2E test phải **khởi động cả hệ thống**, mở browser thật, click thật — nên chậm hơn rất nhiều.

::: tip Nguyên tắc vàng
Viết **nhiều** test nhỏ, nhanh, rẻ ở đáy kim tự tháp. Viết **ít** test lớn, chậm, đắt ở đỉnh kim tự tháp. Đây là cách tối ưu giữa **tốc độ feedback** và **độ bao phủ** (coverage).
:::

---

## Level 1: Unit Testing — Kiểm Tra Từng Viên Gạch

### "Unit" là gì?

**Unit** (đơn vị) là **mẩu code nhỏ nhất làm MỘT việc duy nhất**. Thường là:
- Một **function** (hàm) — ví dụ: hàm tính giảm giá
- Một **method** (phương thức trong class) — ví dụ: method kiểm tra email hợp lệ
- Một **class** nhỏ — ví dụ: class xử lý format ngày tháng

Điểm mấu chốt: unit test kiểm tra mẩu code đó **một cách cô lập** (isolated). Nghĩa là nếu hàm A gọi database, ta sẽ **giả lập** (mock) database đó, để chỉ tập trung test logic của hàm A thôi.

> Giống như khi kiểm tra viên gạch, bạn gõ thử viên gạch **riêng lẻ** — không cần xây cả bức tường lên mới kiểm tra được.

### Ai viết Unit Test?

**Developer** viết unit test. Đây là trách nhiệm của dev, không phải QA. Tuy nhiên, QA cần **hiểu** unit test để:
- Hỏi dev: "Code coverage (độ bao phủ code) bao nhiêu phần trăm?" — nên >= 80%
- Biết rằng unit test pass **không có nghĩa** hệ thống không có bug
- Nếu coverage thấp, QA cần tăng cường test ở các level cao hơn

### Ví dụ code: TypeScript + Jest

Dưới đây là một ví dụ hoàn chỉnh. Đọc từng dòng comment để hiểu:

```typescript
// =============================================
// FILE: src/utils/price.ts
// Đây là "unit" cần test — một hàm tính giảm giá
// =============================================

// "export" nghĩa là cho phép file khác import hàm này
// Hàm nhận 2 tham số: giá gốc và phần trăm giảm giá
// Trả về số tiền sau khi giảm
export function calculateDiscount(
  price: number,            // giá gốc, kiểu số
  discountPercent: number   // % giảm giá, kiểu số
): number {                 // ": number" = hàm trả về kiểu số

  // Guard clause: kiểm tra đầu vào có hợp lệ không
  // Nếu giá âm → ném lỗi (throw Error), dừng hàm ngay
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }

  // Giảm giá phải nằm trong khoảng 0-100
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }

  // Công thức tính: giá gốc - (giá gốc × % giảm / 100)
  // Ví dụ: 200 - (200 × 20 / 100) = 200 - 40 = 160
  return price - (price * discountPercent / 100);
}
```

```typescript
// =============================================
// FILE: src/utils/price.test.ts
// Đây là file test — đuôi ".test.ts" để Jest tự tìm
// =============================================

// Import hàm cần test từ file source
import { calculateDiscount } from './price';

// "describe" = nhóm các test case lại với nhau
// Tên nhóm thường là tên hàm đang test
describe('calculateDiscount', () => {

  // ---- HAPPY PATH: trường hợp bình thường, đầu vào hợp lệ ----

  // "test" (hoặc "it") = một test case cụ thể
  // Tên test mô tả: khi nào → kết quả gì
  test('giảm 20% trên giá 100 → trả về 80', () => {
    // "expect" = kỳ vọng kết quả
    // "toBe" = phải bằng chính xác giá trị này
    expect(calculateDiscount(100, 20)).toBe(80);
  });

  test('giảm 0% → trả về nguyên giá', () => {
    // Giảm 0% nghĩa là không giảm gì cả
    expect(calculateDiscount(250, 0)).toBe(250);
  });

  test('giảm 100% → trả về 0 (miễn phí)', () => {
    expect(calculateDiscount(500, 100)).toBe(0);
  });

  // ---- EDGE CASES: trường hợp biên, đầu vào bất thường ----

  test('giá âm → ném lỗi', () => {
    // Khi test hàm có throw Error, phải bọc trong arrow function
    // () => calculateDiscount(-10, 20) là cách "trì hoãn" việc gọi hàm
    // để Jest có thể "bắt" được lỗi
    expect(() => calculateDiscount(-10, 20))
      .toThrow('Price cannot be negative');
  });

  test('giảm giá > 100% → ném lỗi', () => {
    expect(() => calculateDiscount(100, 150))
      .toThrow('Discount must be between 0 and 100');
  });

  test('giảm giá âm → ném lỗi', () => {
    expect(() => calculateDiscount(100, -5))
      .toThrow('Discount must be between 0 and 100');
  });
});
```

::: info Thuật ngữ trong ví dụ
- **Happy path**: luồng "vui vẻ" — mọi thứ đều đúng, đầu vào hợp lệ
- **Edge case**: trường hợp biên — đầu vào bất thường, ranh giới giá trị
- **Mock**: giả lập — thay thế dependency thật bằng phiên bản giả để test cô lập
- **Guard clause**: đoạn code kiểm tra điều kiện đầu vào ngay đầu hàm, "gác cổng" trước khi chạy logic chính
:::

---

## Level 2: Integration Testing — Các Mảnh LEGO Có Khớp Nhau Không?

### Bản chất qua ví dụ LEGO

Hãy tưởng tượng bạn có một bộ LEGO. Từng miếng LEGO riêng lẻ đều hoàn hảo (unit test đã pass). Nhưng khi bạn **ghép chúng lại**:
- Miếng A có khớp được với miếng B không?
- Khi ghép 3 miếng lại, cái tháp có đứng vững không?
- Màu sắc các miếng có khớp theo đúng hướng dẫn không?

Đó chính là **Integration Testing** — kiểm tra xem các thành phần **hoạt động cùng nhau** có đúng không.

> Trong phần mềm: module User gọi module Database → dữ liệu có lưu đúng không? API trả về JSON → Frontend hiểu được JSON đó không?

### Ai thực hiện?

| Vai trò | Làm gì |
|---|---|
| **Developer** | Viết integration test cho code mình phụ trách |
| **SDET** (Software Dev Engineer in Test) | Viết automation test cho API, service-to-service |
| **QA Engineer** | Test API bằng Postman, verify database, kiểm tra data flow |

### Các cách tiếp cận Integration

```
Big Bang:     Ghép TẤT CẢ module cùng lúc rồi test
              → Nhanh nhưng khi lỗi thì RẤT KHÓ biết lỗi ở đâu
              → Giống như ráp hết LEGO rồi mới kiểm tra

Top-down:     Test từ module TRÊN (gần user) xuống module DƯỚI
              → Module dưới chưa có thì dùng "Stub" (bản giả)
              → Giống như xây nhà từ mái xuống, dùng giàn giáo tạm

Bottom-up:    Test từ module DƯỚI (database, core logic) lên TRÊN
              → Dùng "Driver" (bộ điều khiển tạm) để gọi module
              → Giống như xây móng trước, rồi lên dần

Sandwich:     Kết hợp Top-down + Bottom-up, gặp nhau ở giữa
              → Phổ biến nhất trong thực tế vì linh hoạt
```

### Ví dụ code: API Integration Test

```typescript
// =============================================
// Test: User Service kết nối với Database THẬT
// Đây là integration test vì test 2 thành phần phối hợp:
//   API endpoint ←→ Database
// =============================================

// "supertest" = thư viện giúp gửi HTTP request đến app
// mà không cần khởi động server thật trên port
import request from 'supertest';

// Import ứng dụng Express/NestJS để test
import app from '../app';

// Import kết nối database thật (không phải mock!)
import { db } from '../database';

describe('POST /api/users - Tạo user mới', () => {

  // "beforeEach" = chạy TRƯỚC MỖI test case
  // Mục đích: dọn dẹp data cũ để mỗi test bắt đầu "sạch"
  beforeEach(async () => {
    // Xóa user test cũ trong database (nếu có)
    await db.query(
      'DELETE FROM users WHERE email = $1',  // $1 = placeholder
      ['test@example.com']                    // giá trị thay vào $1
    );
  });

  test('tạo user thành công → trả về 201', async () => {
    // Gửi POST request đến /api/users
    const response = await request(app)
      .post('/api/users')        // method POST, đường dẫn /api/users
      .send({                    // body của request
        name: 'Nguyen Van A',
        email: 'test@example.com',
        password: 'MyPass@123'
      });

    // Kiểm tra response từ API
    expect(response.status).toBe(201);   // 201 = Created thành công
    expect(response.body.email).toBe('test@example.com');

    // QUAN TRỌNG: Kiểm tra data CÓ THẬT SỰ lưu vào DB không
    // Đây là điểm khác biệt so với unit test:
    // Unit test sẽ mock DB, integration test dùng DB thật
    const dbResult = await db.query(
      'SELECT * FROM users WHERE email = $1',
      ['test@example.com']
    );
    expect(dbResult.rows.length).toBe(1);  // Phải có đúng 1 record
  });

  test('email trùng → trả về 409 Conflict', async () => {
    // Tạo user lần 1 — thành công
    await request(app).post('/api/users').send({
      name: 'User 1',
      email: 'test@example.com',
      password: 'Pass@123'
    });

    // Tạo user lần 2 cùng email — phải bị từ chối
    const response = await request(app).post('/api/users').send({
      name: 'User 2',
      email: 'test@example.com',  // trùng email!
      password: 'Pass@456'
    });

    // 409 = Conflict (xung đột dữ liệu)
    expect(response.status).toBe(409);
  });
});
```

### Integration Test tìm được loại lỗi gì?

Đây là những lỗi mà unit test **không bao giờ** tìm được:

- **Data format mismatch**: API trả về `{ "userName": "A" }` nhưng frontend expect `{ "user_name": "A" }`
- **Database query lỗi**: JOIN nhiều bảng bị sai, query trả về duplicate records
- **Authentication fail**: Service A gọi Service B nhưng token hết hạn hoặc sai format
- **Type mismatch**: Service A gửi `id` kiểu string `"123"`, Service B expect kiểu number `123`
- **Race condition**: 2 request cùng lúc update 1 record, data bị ghi đè sai

---

## Level 3: System Testing — Kiểm Tra Toàn Bộ Ngôi Nhà

### Bản chất

Đến bước này, bạn đã kiểm tra từng viên gạch (unit), kiểm tra tường đứng vững (integration). Giờ là lúc kiểm tra **toàn bộ ngôi nhà**: điện có chạy không, nước có lên không, cửa mở đóng có trơn không, wifi có phủ sóng hết không.

**System Testing** nghĩa là test **cả hệ thống hoàn chỉnh** trong môi trường giống production (môi trường thật khi user sử dụng) nhất có thể. Đây là nơi **QA Engineer dành phần lớn thời gian**.

### Ai thực hiện?

Chủ yếu là **QA Team**. Đây là "sân chơi" chính của QA:

| | |
|---|---|
| **Ai thực hiện** | QA Engineer, QA Lead |
| **Đối tượng test** | Toàn bộ hệ thống end-to-end |
| **Mục đích** | Xác nhận hệ thống đáp ứng đầy đủ requirements |
| **Môi trường** | Staging environment (bản sao của production) |
| **Thời điểm** | Sau khi Integration Testing xong |

### System Testing bao gồm những gì?

**Functional Testing** (kiểm tra chức năng):
- Tất cả features hoạt động đúng theo requirements
- End-to-end flows: Đăng ký → Đăng nhập → Duyệt sản phẩm → Thêm vào giỏ → Thanh toán
- Negative testing: nhập sai → hệ thống xử lý lỗi đúng cách

**Non-functional Testing** (kiểm tra phi chức năng):
- **Performance**: Trang load dưới 2 giây? Hệ thống chịu được 1000 người cùng truy cập?
- **Security**: Có bị SQL injection không? Có bị XSS (chèn script độc hại) không?
- **Usability**: Giao diện dễ dùng không? Nhất quán không? Người khuyết tật dùng được không?
- **Compatibility**: Chạy tốt trên Chrome, Firefox, Safari? Trên mobile?

### Ví dụ: E2E Test với Playwright

```typescript
// =============================================
// Test end-to-end: Luồng mua hàng hoàn chỉnh
// Playwright = tool tự động hóa trình duyệt
// Test này mô phỏng CHÍNH XÁC những gì user thật làm
// =============================================

// Import test framework và expect từ Playwright
import { test, expect } from '@playwright/test';

// Một test case mô tả toàn bộ luồng checkout
test('Luồng mua hàng từ đăng nhập đến đặt hàng thành công', async ({ page }) => {
  // "page" = một tab trình duyệt ảo, Playwright tự tạo

  // ===== BƯỚC 1: Đăng nhập =====
  await page.goto('/login');  // Mở trang login (như gõ URL)

  // Điền email vào ô input có data-testid="email"
  // data-testid là attribute đặc biệt dành cho testing, không ảnh hưởng UI
  await page.fill('[data-testid="email"]', 'customer@test.com');
  await page.fill('[data-testid="password"]', 'Pass@123');

  // Click nút đăng nhập
  await page.click('[data-testid="login-btn"]');

  // Kiểm tra: sau khi login, URL phải chuyển sang /dashboard
  await expect(page).toHaveURL('/dashboard');

  // ===== BƯỚC 2: Thêm sản phẩm vào giỏ hàng =====
  await page.goto('/products');  // Mở trang danh sách sản phẩm

  // Click nút "Add to Cart" của sản phẩm đầu tiên
  await page.click('[data-testid="product-1"] >> text=Add to Cart');

  // Kiểm tra: icon giỏ hàng hiển thị số "1"
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

  // ===== BƯỚC 3: Tiến hành thanh toán =====
  await page.click('[data-testid="cart-icon"]');  // Mở giỏ hàng
  await page.click('text=Checkout');               // Click nút Checkout

  // ===== BƯỚC 4: Điền thông tin giao hàng =====
  await page.fill('[data-testid="address"]', '123 Nguyen Hue');
  await page.fill('[data-testid="city"]', 'Ho Chi Minh');
  await page.click('text=Continue');

  // ===== BƯỚC 5: Điền thông tin thanh toán =====
  await page.fill('[data-testid="card-number"]', '4111111111111111');
  await page.fill('[data-testid="expiry"]', '12/28');
  await page.fill('[data-testid="cvv"]', '123');
  await page.click('text=Place Order');  // Đặt hàng

  // ===== BƯỚC 6: Xác nhận đặt hàng thành công =====
  // Kiểm tra: hiển thị thông báo thành công
  await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
  // Kiểm tra: mã đơn hàng bắt đầu bằng "ORD-"
  await expect(page.locator('[data-testid="order-id"]')).toContainText('ORD-');
});
```

---

## Level 4: Acceptance Testing (UAT) — Cho Cư Dân Vào Ở Thử

### Bản chất

Ngôi nhà đã xây xong, đã kiểm tra mọi thứ. Giờ là bước cuối cùng: **cho người thật vào ở thử**. Họ sẽ nấu ăn, tắm rửa, ngủ qua đêm — và cho bạn biết: "Nhà này ổn, tôi chấp nhận" hoặc "Bếp hơi chật, phòng tắm thiếu móc treo khăn".

**UAT** (User Acceptance Testing) là khi **người dùng thật** hoặc **đại diện business** kiểm tra hệ thống để trả lời câu hỏi: **"Đây có phải là cái tôi cần không?"**

Đây không phải là tìm bug kỹ thuật nữa — đây là xác nhận hệ thống **đáp ứng đúng nhu cầu thực tế**.

### Alpha Testing vs Beta Testing

Hai thuật ngữ này nghe phức tạp nhưng thực ra rất đơn giản:

**Alpha Testing** — Ở thử trong nhà mẫu tại công ty:
- Diễn ra **tại công ty phát triển**
- Người test: nhân viên nội bộ, QA đóng vai user
- Mục đích: tìm lỗi lớn trước khi cho người ngoài dùng
- Ví dụ: team QA tự test app như thể mình là khách hàng

**Beta Testing** — Cho khách hàng thật vào ở thử:
- Diễn ra **ở môi trường thật** của user
- Người test: **người dùng thật** (nhóm nhỏ được chọn)
- Mục đích: thu thập feedback thực tế trước khi ra mắt chính thức
- Ví dụ: TestFlight (iOS), Google Play Beta, Steam Early Access

> **Aha moment**: Alpha = "nội bộ dùng thử trước", Beta = "người ngoài dùng thử trước khi ra mắt chính thức". Cứ nhớ thứ tự alphabet: **A**lpha trước, **B**eta sau.

### Chi tiết

| | |
|---|---|
| **Ai thực hiện** | End users, Business team, Product Owner |
| **Đối tượng test** | Business flows, trải nghiệm người dùng |
| **Mục đích** | Xác nhận: "Đúng, đây là cái tôi cần" |
| **Môi trường** | UAT environment (gần giống production) |
| **Thời điểm** | Sau System Testing, trước khi go-live |

### QA làm gì trong UAT?

QA không trực tiếp thực hiện UAT (vì UAT là dành cho user/business), nhưng QA đóng vai trò **hỗ trợ rất quan trọng**:

- **Chuẩn bị**: Viết UAT test scenarios bằng ngôn ngữ business (không phải ngôn ngữ kỹ thuật)
- **Hướng dẫn**: Giúp business users biết cách test, test ở đâu
- **Ghi nhận**: Log bugs mà users báo cáo, track trạng thái
- **Verify**: Sau khi dev fix bug từ UAT, QA kiểm tra lại
- **Tổng kết**: Báo cáo kết quả UAT, tỷ lệ pass/fail

---

## Tổng hợp: Ai Làm Gì Ở Mỗi Level?

```
Developer:
├── Unit Tests         → Viết test cho từng function/method
└── Integration Tests  → Viết test cho phần code mình phụ trách

QA Engineer:
├── Integration Tests  → Test API (Postman), kiểm tra database
├── System Testing     → Test functional + non-functional ← PHẦN CHÍNH
├── E2E Automation     → Viết script Playwright/Cypress
└── Hỗ trợ UAT        → Chuẩn bị scenarios, log bugs, verify fixes

SDET (Software Dev Engineer in Test):
├── Integration Tests  → Viết automation framework cho API
├── E2E Automation     → Xây dựng và maintain automation suite
└── CI/CD Integration  → Tích hợp test vào pipeline

Business / Product Owner:
└── Acceptance Testing → Dùng thử và xác nhận "đúng cái tôi cần"
```

### Mỗi level tìm được loại lỗi gì?

| Level | Ví dụ lỗi tìm được |
|---|---|
| **Unit** | Hàm tính sai, logic if/else sai, chia cho 0, null pointer |
| **Integration** | API trả sai format, database query lỗi, service gọi nhau bị timeout |
| **System** | Luồng checkout bị break, search không ra kết quả, trang load quá chậm |
| **Acceptance** | Luồng khó dùng, thiếu feature user cần, UX gây nhầm lẫn |

---

## Anti-pattern: Ice Cream Cone — Khi Kim Tự Tháp Bị Lật Ngược

### Vấn đề

Trong thực tế, rất nhiều team mắc phải **Ice Cream Cone anti-pattern** (mô hình cây kem) — tức là **đảo ngược** kim tự tháp:

```
        ╱───────────────────────────╲
       ╱   Rất nhiều Manual Tests    ╲    ← Tốn thời gian, không lặp lại được
      ╱─────────────────────────────────╲
         ╱─────────────────────────╲
        ╱   Nhiều E2E / UI Tests    ╲      ← Chậm, hay flaky
       ╱─────────────────────────────╲
            ╱─────────────────╲
           ╱  Ít Integration   ╲            ← Thiếu
          ╱─────────────────────╲
              ╱───────────╲
             ╱  Rất ít     ╲                ← Gần như không có
            ╱  Unit Tests   ╲
           ╱─────────────────╲
```

### Tại sao Ice Cream Cone xảy ra?

- Team không có văn hóa viết unit test
- QA chỉ biết test manual, chưa biết automation
- Management nghĩ "test manual là đủ rồi"
- Dev nói "viết test tốn thời gian, deadline gấp"

### Hậu quả thực tế

| Vấn đề | Ảnh hưởng |
|---|---|
| **CI/CD chạy chậm** | Pipeline mất 30-60 phút thay vì 5-10 phút |
| **Flaky tests** | Test lúc pass lúc fail, team mất niềm tin vào automation |
| **Khó debug** | E2E test fail → không biết lỗi ở UI, API, hay Database |
| **Tốn nhân lực** | Cần nhiều QA manual hơn, regression test mất nhiều ngày |
| **Feedback chậm** | Dev phải đợi hàng giờ mới biết code mình có bug |

### Cách sửa: Từ Ice Cream Cone về Pyramid

1. **Bắt đầu từ Unit Test**: Yêu cầu dev viết unit test cho mọi code mới (minimum 80% coverage)
2. **Thêm API Integration Test**: QA/SDET viết automation test cho API trước, vì ổn định hơn UI test
3. **Giảm dần E2E Test**: Chỉ giữ E2E cho critical flows (login, checkout, payment)
4. **Giảm Manual Test**: Chuyển regression test sang automation, manual chỉ dùng cho exploratory testing

> **Aha moment**: Nếu bạn phải chạy manual regression test mất 3 ngày mỗi sprint — đó là dấu hiệu rõ ràng nhất của Ice Cream Cone anti-pattern.

---

## Trong Agile Sprint: Timeline Thực Tế

```
Day 1-2:   Dev code + viết unit tests
           QA viết test cases + chuẩn bị test data

Day 3-4:   Dev hoàn thành feature → chuyển cho QA
           QA bắt đầu test (manual + automation)

Day 5-7:   QA tiếp tục test, log bugs
           Dev fix bugs

Day 8:     QA retest bugs đã fix
           Regression testing (automation chạy)

Day 9:     UAT — Product Owner/stakeholder dùng thử
           QA hỗ trợ, log feedback

Day 10:    Sprint Demo + Retrospective
           Quyết định release hay không
```

---

## Tóm tắt

| Level | Ai test | Test cái gì | Tools phổ biến |
|---|---|---|---|
| **Unit** | Developer | Logic trong từng function | Jest, JUnit, pytest, Vitest |
| **Integration** | Dev / QA / SDET | Tương tác giữa 2+ modules | Supertest, Postman, REST Assured |
| **System** | QA Team | Toàn bộ hệ thống end-to-end | Playwright, Cypress, Selenium, JMeter |
| **Acceptance** | Business / Users | Hệ thống đáp ứng nhu cầu thật | Manual testing, demo sessions |

::: tip 3 điều cần nhớ
1. **Testing Pyramid**: Nhiều Unit ở đáy, ít E2E ở đỉnh — đây là nguyên tắc vàng
2. **Mỗi level có vai trò riêng**: Không level nào thay thế được level khác
3. **Tránh Ice Cream Cone**: Nếu team bạn đang test manual quá nhiều, hãy bắt đầu tự động hóa từ unit test và API test trước
:::
