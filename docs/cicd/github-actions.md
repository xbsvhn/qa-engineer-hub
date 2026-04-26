# GitHub Actions

## GitHub Actions là gì?

GitHub Actions là CI/CD platform tích hợp sẵn trong GitHub, cho phép tự động hóa build, test và deploy.

## Ví dụ: Chạy tests tự động

```yaml
name: Run Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
```

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
