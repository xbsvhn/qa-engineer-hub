# Cypress — "Hành Khách Trong Xe" vs "Drone Trên Trời"

## Bản chất: Cypress chạy BÊN TRONG browser

Đây là điều quan trọng nhất cần hiểu — và cũng là nguồn gốc của mọi điểm mạnh lẫn điểm yếu của Cypress.

### Analogy: Hành khách vs Drone

**Cypress giống hành khách ngồi trong xe hơi.** Bạn thấy rõ mọi thứ bên trong — dashboard, ghế ngồi, tốc độ, nhạc đang phát. Nhưng bạn **không thể kiểm soát xe khác** trên đường, không thể nhảy sang xe khác, và tầm nhìn bị giới hạn bởi cửa kính.

**Playwright giống drone bay trên trời.** Bạn thấy toàn bộ bức tranh — mọi xe trên đường, mọi ngã rẽ. Bạn có thể theo dõi xe này, chuyển sang xe khác, và không bị giới hạn bởi bất kỳ xe nào.

```
Cypress (chạy trong browser — same process):

  ┌─────────────────────────────────────┐
  │           BROWSER                    │
  │                                      │
  │   ┌────────────┐  ┌──────────────┐  │
  │   │  Your App   │  │ Cypress Test │  │
  │   │  (iframe)   │  │  Runner      │  │
  │   └────────────┘  └──────────────┘  │
  │                                      │
  │   Cùng process → truy cập DOM trực  │
  │   tiếp, nhanh. Nhưng bị "nhốt"     │
  │   trong 1 browser, 1 origin.        │
  └─────────────────────────────────────┘


Playwright (chạy ngoài browser — điều khiển từ xa):

  ┌──────────────┐
  │  Playwright   │ ◄── Điều khiển từ bên ngoài
  │  Test Code    │
  └──────┬───────┘
         │ CDP / WebSocket
    ┌────┼────┬────────────┐
    ▼    ▼    ▼            ▼
  Chrome  FF  WebKit    Có thể mở
                        nhiều tabs,
                        nhiều windows,
                        cross-origin
```

**Key insight:** Cypress inject code trực tiếp vào browser → nhanh khi tương tác với DOM, nhưng bị giới hạn bởi browser security model (same-origin policy). Playwright điều khiển từ ngoài → không bị giới hạn nào.

---

## Network Stubbing — Siêu năng lực của Cypress

Đây là tính năng mà Cypress làm **tốt nhất**, và cũng là lý do nhiều frontend team yêu thích nó.

### Concept: "Phim trường" thay vì "thực tế"

Imagine bạn quay phim. Thay vì bay tới Paris để quay 1 cảnh, bạn dựng **phim trường giả** — tòa nhà giả, cảnh giả, nhưng trên camera trông y như thật.

Network stubbing cũng vậy. Bạn nói với Cypress: **"Khi app gọi API, ĐỪNG thực sự gọi server. Thay vào đó, giả vờ server trả về data NÀY."**

### Tại sao cần stubbing?

```
Không có stubbing:
  Test → App → Real API → Real Database → Real Server
                │
                └── Chậm, phụ thuộc server, data thay đổi,
                    server down = test fail (không phải lỗi app)

Có stubbing:
  Test → App → Cypress intercept → Fake response (do bạn define)
                │
                └── Nhanh, deterministic, không phụ thuộc ai,
                    test chạy offline cũng được
```

### Ví dụ thực tế: Test trang Products

```typescript
describe('Products Page', () => {

  it('hiển thị danh sách sản phẩm từ API', () => {
    // SETUP: Khi app gọi GET /api/products → trả về data giả
    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: [
        { id: 1, name: 'iPhone 15', price: 25000000 },
        { id: 2, name: 'Samsung S24', price: 22000000 },
      ]
    }).as('getProducts');    // đặt tên alias để track

    cy.visit('/products');
    cy.wait('@getProducts'); // đợi request xảy ra

    // VERIFY: App hiển thị đúng data giả
    cy.get('.product-card').should('have.length', 2);
    cy.get('.product-card').first().should('contain', 'iPhone 15');
    cy.get('.product-card').last().should('contain', '22,000,000');
  });

  it('hiển thị error khi API trả về 500', () => {
    // SETUP: Giả lập server lỗi
    cy.intercept('GET', '/api/products', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getProducts');

    cy.visit('/products');
    cy.wait('@getProducts');

    // VERIFY: App xử lý lỗi gracefully
    cy.get('.error-state').should('be.visible');
    cy.get('.retry-button').should('exist');
  });

  it('hiển thị loading state trong khi chờ API', () => {
    // SETUP: Delay response 2 giây để thấy loading
    cy.intercept('GET', '/api/products', (req) => {
      req.reply({
        delay: 2000,    // giả lập network chậm
        statusCode: 200,
        body: [{ id: 1, name: 'iPhone 15', price: 25000000 }]
      });
    }).as('getProducts');

    cy.visit('/products');

    // Loading spinner xuất hiện TRONG KHI chờ
    cy.get('.loading-spinner').should('be.visible');

    // Sau khi API trả về → spinner biến mất
    cy.wait('@getProducts');
    cy.get('.loading-spinner').should('not.exist');
    cy.get('.product-card').should('have.length', 1);
  });
});
```

::: tip Tại sao stubbing mạnh?
Bạn kiểm soát **mọi scenario** mà server có thể trả về — success, error, slow network, empty data, invalid format — mà **không cần setup server**. Frontend team có thể viết test trước khi backend xong.
:::

### So sánh: Cypress intercept vs Playwright route

```typescript
// Cypress — cy.intercept()
cy.intercept('GET', '/api/users', { body: mockUsers }).as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');

// Playwright — page.route()
await page.route('/api/users', route =>
  route.fulfill({ body: JSON.stringify(mockUsers) })
);
await page.goto('/users');
```

Cả hai đều làm được. Cypress syntax dễ đọc hơn một chút. Playwright flexible hơn (có thể modify request headers, abort requests, v.v.).

---

## Developer Experience — Lý do Cypress nổi tiếng

### Time Travel Debugging

Cypress ghi lại **DOM snapshot tại mỗi bước**. Hover chuột lên bất kỳ step nào trong Cypress UI → thấy trang web trông như thế nào tại thời điểm đó.

```
Bước 1: cy.visit('/login')           ← hover → thấy trang login
Bước 2: cy.get('#email').type(...)    ← hover → thấy email đang được nhập
Bước 3: cy.get('button').click()      ← hover → thấy button được click
Bước 4: cy.url().should(...)          ← hover → thấy redirect tới dashboard
```

Giống như **rewind video** — quay lại bất kỳ thời điểm nào. Rất hữu ích khi debug test failures.

### Real-time Reload

Sửa code test → save → Cypress **tự động chạy lại test** ngay lập tức. Feedback loop cực nhanh.

### Auto-wait (giống Playwright)

```typescript
// Cypress TỰ retry assertion cho đến khi pass (hoặc timeout)
cy.get('.success-msg').should('contain', 'Saved');
// Nếu element chưa xuất hiện → Cypress tự đợi, tự retry
// Không cần explicit wait như Selenium
```

---

## Hạn chế của Cypress — Honest assessment

### 1. Không hỗ trợ multi-tab

```typescript
// Cypress KHÔNG THỂ LÀM ĐƯỢC:
// - Mở link trong tab mới
// - Test popup windows (OAuth, payment gateways)
// - Test flows yêu cầu nhiều tabs

// Workaround: remove target="_blank" attribute
cy.get('a[target="_blank"]')
  .invoke('removeAttr', 'target')
  .click();
// Nhưng đây là hack, không phải real user behavior
```

### 2. Same-origin limitation

```typescript
// App ở https://myapp.com
// OAuth redirect tới https://accounts.google.com ← KHÁC origin

// Cypress: rất khó test flow này
// Playwright: không vấn đề gì
```

Vì Cypress chạy bên trong browser, nó bị ràng buộc bởi **same-origin policy**. Cross-domain flows (SSO, OAuth, payment redirects) rất khó test.

### 3. Parallel execution — phải trả tiền

```
Cypress free:        Chạy sequential — 1 test tại 1 thời điểm
Cypress Dashboard:   Parallel, analytics, video recording
                     Pricing: $67-399/tháng

Playwright:          Parallel built-in, MIỄN PHÍ
                     npx playwright test --workers=4
```

### 4. Chỉ JavaScript/TypeScript

Team dùng Java, Python, C# → không dùng được Cypress. Playwright hỗ trợ tất cả.

### 5. Browser support hẹp hơn

```
Cypress:     Chrome, Edge, Firefox (limited), Electron
             Không có WebKit/Safari

Playwright:  Chromium, Firefox, WebKit (Safari engine)
             Đầy đủ hơn
```

---

## Khi nào chọn Cypress? (Practical guide)

### Chọn Cypress khi:

| Tình huống | Lý do |
|---|---|
| **Frontend team viết test** | React/Vue/Angular devs quen JS, DX tuyệt vời |
| **Cần mock API nhiều** | `cy.intercept()` syntax rất clean |
| **Single-page app** | Không cần multi-tab, same-origin OK |
| **Team đã quen Cypress** | Switching cost > benefit |

### Chọn Playwright thay vì Cypress khi:

| Tình huống | Lý do |
|---|---|
| **QA team chuyên trách** | Cần flexibility và power hơn DX |
| **Cross-domain flows** | OAuth, SSO, payment gateways |
| **Multi-tab / popup** | Cypress không support |
| **Budget-conscious** | Parallel miễn phí |
| **Multi-language team** | Java, Python, C# support |

---

## Quick Start — Nếu bạn cần dùng

```bash
npm install -D cypress
npx cypress open          # mở UI mode
npx cypress run           # chạy headless trong CI
```

```typescript
// cypress/e2e/login.cy.ts
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('đăng nhập thành công', () => {
    cy.get('#email').type('user@mail.com');
    cy.get('#password').type('Pass@123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('.welcome-msg').should('contain', 'Welcome');
  });

  it('hiển thị lỗi khi sai credentials', () => {
    cy.get('#email').type('wrong@mail.com');
    cy.get('#password').type('wrong');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
```

---

## Tóm tắt — Ghi nhớ 4 điều

| # | Key Point |
|---|---|
| 1 | Cypress chạy **trong browser** (hành khách trong xe). Playwright chạy **ngoài browser** (drone trên trời). Kiến trúc này quyết định mọi thứ. |
| 2 | **Network stubbing** (`cy.intercept`) là siêu năng lực — test mọi API scenario mà không cần server thật. Giống phim trường thay vì bay tới Paris. |
| 3 | DX tuyệt vời (time-travel, real-time reload) — lý do frontend devs yêu thích. |
| 4 | **Hạn chế thực tế:** không multi-tab, same-origin only, parallel phải trả tiền. Đây là lý do QA teams thường chọn Playwright. |

::: tip Chọn thế nào?
**Frontend dev viết test cho component/page mình làm → Cypress rất OK.**
**QA Engineer build test framework cho cả dự án → Playwright phù hợp hơn.**
Không có tool nào "tốt nhất" — chỉ có tool **phù hợp nhất với context**.
:::
