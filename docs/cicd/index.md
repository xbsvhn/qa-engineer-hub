# CI/CD

## CI/CD là gì? -- Hiểu bản chất trước

Tưởng tượng bạn là một đầu bếp trong nhà hàng. Mỗi ngày bạn nấu món mới (code mới). Trước khi phục vụ khách, bạn phải:

1. **Kiểm tra nguyên liệu** (build -- code có compile được không?)
2. **Nếm thử** (test -- code có chạy đúng không?)
3. **Bưng ra bàn** (deploy -- đưa code lên server cho user dùng)

**CI/CD** là **robot làm 3 bước này tự động** mỗi khi bạn thay đổi code. Bạn chỉ việc nấu (code), robot lo phần còn lại.

- **CI** (Continuous Integration) = tự động build + test mỗi khi ai đó push code
- **CD** (Continuous Delivery) = tự động deploy lên server sau khi tests pass

## Pipeline = dây chuyền sản xuất

```
Developer push code
       |
       v
+----------------------------------------------------------+
|                    CI/CD Pipeline                          |
|                                                           |
|  Build --> Unit Tests --> API Tests --> Deploy Staging     |
|                                            |              |
|                                            v              |
|                            E2E Tests --> Smoke Test        |
|                                            |              |
|                                   Tests pass? ---+        |
|                                    |             |        |
|                                   Yes           No        |
|                                    |             |        |
|                              Deploy Prod    Notify QA     |
|                                             + Block       |
+----------------------------------------------------------+
```

> **Aha moment:** Automation tests chỉ THỰC SỰ có giá trị khi chạy trong CI/CD pipeline. Viết 1000 test cases mà phải chạy bằng tay = lãng phí. Đặt chúng vào pipeline = mỗi lần dev push code, tests tự động chạy và báo kết quả.

## Nội dung section này

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [Git & Version Control](./git) | "Save game" cho code, branching, Pull Request |
| 2 | [GitHub Actions](./github-actions) | Máy tính GitHub cho mượn miễn phí để chạy tests |
| 3 | [Docker cho QA](./docker) | Đóng gói code vào "container" chạy giống nhau mọi nơi |
