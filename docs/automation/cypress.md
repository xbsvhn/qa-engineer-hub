# Cypress

## Cypress là gì? (WHAT)

Cypress là JavaScript end-to-end testing framework ra đời năm 2017, nổi tiếng với **Developer Experience tuyệt vời**: real-time reload, time-travel debugging, và setup cực kỳ đơn giản.

### Vị trí trong thị trường

```
Selenium (2004) → Cypress (2017) → Playwright (2020)
   Legacy            DX tốt           Modern nhất
```

---

## Đặc điểm nổi bật

| Feature | Chi tiết |
|---|---|
| **Time Travel** | Hover lên từng step → xem DOM snapshot tại thời điểm đó |
| **Real-time Reload** | Sửa code → test tự chạy lại ngay |
| **Automatic Waiting** | Auto-retry assertions (giống Playwright) |
| **Network Stubbing** | Intercept và mock API responses |
| **Screenshots/Videos** | Tự động capture khi fail |
| **Dashboard** | Cloud dashboard (paid) cho CI analytics |

---

## Quick Start

```bash
# Cài đặt
npm install -D cypress

# Mở Cypress UI
npx cypress open

# Chạy headless
npx cypress run
```

### Test đầu tiên

```typescript
// cypress/e2e/login.cy.ts
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.get('#email').type('user@mail.com');
    cy.get('#password').type('Pass@123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('.welcome-msg').should('contain', 'Welcome');
  });

  it('should show error with invalid credentials', () => {
    cy.get('#email').type('wrong@mail.com');
    cy.get('#password').type('wrong');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
    cy.get('.error-message').should('contain', 'Invalid credentials');
  });
});
```

### Network Stubbing — Tính năng mạnh nhất

```typescript
it('should display products from API', () => {
  // Mock API response
  cy.intercept('GET', '/api/products', {
    statusCode: 200,
    body: [
      { id: 1, name: 'iPhone 15', price: 25000000 },
      { id: 2, name: 'Samsung S24', price: 22000000 },
    ]
  }).as('getProducts');

  cy.visit('/products');
  cy.wait('@getProducts');

  cy.get('.product-card').should('have.length', 2);
  cy.get('.product-card').first().should('contain', 'iPhone 15');
});

it('should handle API error gracefully', () => {
  cy.intercept('GET', '/api/products', {
    statusCode: 500,
    body: { error: 'Internal Server Error' }
  }).as('getProducts');

  cy.visit('/products');
  cy.wait('@getProducts');

  cy.get('.error-state').should('be.visible');
  cy.get('.error-state').should('contain', 'Something went wrong');
});
```

---

## Cypress vs Playwright

| Feature | Cypress | Playwright |
|---|---|---|
| **Browser support** | Chromium-based + Firefox (limited) | Chromium + Firefox + WebKit |
| **Multi-tab** | Không hỗ trợ | Hỗ trợ đầy đủ |
| **iframe** | Plugin cần thiết | Built-in |
| **Language** | JavaScript/TypeScript only | JS/TS, Python, Java, C# |
| **Architecture** | Chạy trong browser (same origin) | Chạy ngoài browser (no limits) |
| **Parallel** | Cypress Dashboard (paid) | Built-in (free) |
| **API testing** | `cy.request()` | `request` fixture |
| **Network mock** | `cy.intercept()` — rất mạnh | `page.route()` — tương đương |
| **DX** | Tuyệt vời (real-time UI) | Rất tốt (UI mode) |

### Hạn chế chính của Cypress

1. **Same-origin limitation** — không test được cross-domain flows dễ dàng
2. **Không hỗ trợ multi-tab** — không mở tab mới, popup window
3. **Chỉ JavaScript/TypeScript** — không dùng được với Java/Python teams
4. **Parallel cần trả tiền** — Cypress Dashboard pricing
5. **Không native mobile support** — chỉ responsive viewport

### Khi nào chọn Cypress?

- Team **frontend-focused** (React, Vue, Angular developers viết test)
- Cần **network stubbing mạnh** (mock API responses)
- Dự án **single-page application** không cần multi-tab
- Đã có Cypress test suite và team quen thuộc

---

## Tóm tắt

| Aspect | Ghi nhớ |
|---|---|
| **Cypress là gì** | JS testing framework, DX tuyệt vời, real-time UI |
| **Điểm mạnh** | Network stubbing, time-travel, setup đơn giản |
| **Điểm yếu** | Không multi-tab, same-origin limit, parallel paid |
| **Recommendation** | Frontend team → Cypress OK. QA team → Playwright tốt hơn |
