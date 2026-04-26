# Playwright

## Playwright là gì?

Playwright là framework automation testing hiện đại của Microsoft, hỗ trợ Chromium, Firefox và WebKit.

## Tại sao chọn Playwright?

| Feature | Playwright | Selenium | Cypress |
|---|---|---|---|
| Multi-browser | Chromium, Firefox, WebKit | Tất cả browsers | Chromium-based |
| Auto-wait | Built-in | Manual wait | Built-in |
| Speed | Rất nhanh | Trung bình | Nhanh |
| API Testing | Built-in | Không | Plugin |
| Language | JS, TS, Python, Java, C# | Nhiều ngôn ngữ | JS/TS |

## Quick Start

```javascript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

test('login flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'user@test.com');
  await page.fill('#password', 'Pass@123');
  await page.click('#login-btn');
  await expect(page).toHaveURL('/dashboard');
});
```

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
