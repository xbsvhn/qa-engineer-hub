# Automation Testing

Automation Testing giúp thực thi test tự động, tiết kiệm thời gian và tăng coverage cho regression testing.

## Nội dung

- [Automation Framework](./framework) - Kiến trúc và thiết kế framework
- [Selenium](./selenium) - Web automation với Selenium
- [Playwright](./playwright) - Modern web testing framework
- [Cypress](./cypress) - JavaScript end-to-end testing

## Khi nào nên Automate?

### Nên automate
- Regression test cases
- Test cases chạy nhiều lần
- Test trên nhiều browser/device
- Data-driven testing
- Performance/Load testing

### Không nên automate
- Test case chỉ chạy 1 lần
- Exploratory testing
- Usability/UX testing
- Feature mới thay đổi liên tục

## Automation Test Pyramid

```
         /   E2E (UI)   \        ← Ít, chậm, dễ flaky
        / Integration API \
       /    Unit Tests     \     ← Nhiều, nhanh, ổn định
```

::: info
Nội dung chi tiết cho từng tool sẽ được bổ sung sau.
:::
