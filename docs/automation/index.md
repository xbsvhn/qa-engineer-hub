# Automation Testing

Automation Testing giúp thực thi test tự động, tiết kiệm thời gian và tăng coverage — đặc biệt cho regression testing. Đây là kỹ năng **bắt buộc** nếu bạn muốn phát triển career QA lên Senior và SDET.

## Nội dung

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [Lập trình cơ bản](./programming-basics) | Ngôn ngữ lập trình là gì? Phân loại? Variables, Functions, Async/Await, Classes |
| 2 | [JavaScript & TypeScript cho QA](./javascript-for-qa) | Node.js, npm, TypeScript essentials, Array/String methods, Patterns cho automation |
| 3 | [Automation Framework](./framework) | Page Object Model, Data-Driven Testing, Fixtures, cấu trúc project thực tế |
| 4 | [Playwright (Focus)](./playwright) | Deep dive: Locators, Actions, Assertions, Auto-wait, API testing, Debugging |
| 5 | [Selenium](./selenium) | Kiến thức nền tảng, so sánh với Playwright, khi nào vẫn cần Selenium |
| 6 | [Cypress](./cypress) | Đặc điểm, Network Stubbing, so sánh, khi nào chọn Cypress |
| 7 | [Automation Strategy](./automation-strategy) | Automate cái gì? Chọn tool nào? ROI, Roadmap, Metrics |

## Lộ trình học

```
Chưa biết lập trình:
  Lập trình cơ bản → JavaScript/TypeScript → Framework → Playwright
  (2 tuần)            (1 tuần)               (1 tuần)    (2 tuần)

Đã biết lập trình:
  Framework → Playwright → Automation Strategy
  (3 ngày)    (1 tuần)     (1 ngày)
```

## Khi nào nên Automate?

| Nên automate | Không nên automate |
|---|---|
| Regression tests (chạy lặp lại) | Exploratory testing |
| Smoke tests (mỗi build) | Feature UI thay đổi liên tục |
| Data-driven tests (nhiều data) | Test chạy 1 lần |
| Cross-browser testing | Usability / UX testing |
| API testing | Edge case quá phức tạp |

::: tip Tool recommendation 2025-2026
**Playwright + TypeScript** là lựa chọn tốt nhất cho dự án mới. Hỗ trợ multi-browser, auto-wait, API testing built-in, debugging tuyệt vời, và cộng đồng đang tăng trưởng nhanh nhất.
:::
