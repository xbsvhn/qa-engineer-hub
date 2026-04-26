# Cypress

## Cypress là gì?

Cypress là JavaScript end-to-end testing framework, chạy trực tiếp trong browser với developer experience tuyệt vời.

## Đặc điểm nổi bật

- **Time Travel:** Xem lại từng step bằng snapshot
- **Real-time Reload:** Tự động chạy lại khi code thay đổi
- **Automatic Waiting:** Không cần explicit wait
- **Network Control:** Stub và intercept API calls

## Quick Start

```javascript
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('#email').type('user@test.com');
    cy.get('#password').type('Pass@123');
    cy.get('#login-btn').click();
    cy.url().should('include', '/dashboard');
    cy.get('.welcome-msg').should('contain', 'Welcome');
  });
});
```

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
