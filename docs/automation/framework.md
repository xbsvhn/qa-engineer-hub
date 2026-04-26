# Automation Framework

## Framework là gì?

Automation Framework là tập hợp các quy tắc, tools, và best practices để xây dựng và quản lý automated tests hiệu quả.

## Các loại Framework phổ biến

### 1. Page Object Model (POM)
- Mỗi page/component là một **class**
- Tách biệt **test logic** và **page interaction**
- Dễ maintain khi UI thay đổi

```javascript
// page object
class LoginPage {
  get emailInput() { return '#email'; }
  get passwordInput() { return '#password'; }
  get loginButton() { return '#login-btn'; }

  async login(email, password) {
    await page.fill(this.emailInput, email);
    await page.fill(this.passwordInput, password);
    await page.click(this.loginButton);
  }
}

// test
test('successful login', async () => {
  const loginPage = new LoginPage();
  await loginPage.login('user@test.com', 'Pass@123');
  await expect(page).toHaveURL('/dashboard');
});
```

### 2. Data-Driven Testing
- Test data tách riêng khỏi test script
- Cùng 1 test, chạy với nhiều bộ data
- Data từ CSV, Excel, JSON, Database

### 3. Keyword-Driven Testing
- Actions được định nghĩa bằng keywords
- Non-technical users có thể viết test
- Ví dụ: `OPEN_BROWSER`, `CLICK`, `VERIFY_TEXT`

### 4. Hybrid Framework
Kết hợp nhiều approach trên.

## Cấu trúc Project Automation tiêu chuẩn

```
project/
├── tests/              # Test files
├── pages/              # Page Objects
├── fixtures/           # Test data
├── utils/              # Helper functions
├── config/             # Configuration
├── reports/            # Test reports
└── README.md
```

::: tip
Nội dung chi tiết sẽ được bổ sung sau.
:::
