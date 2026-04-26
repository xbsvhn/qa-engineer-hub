# Test Plan & Strategy

## Test Plan là gì?

Test Plan là tài liệu mô tả phạm vi, cách tiếp cận, nguồn lực và lịch trình của các hoạt động kiểm thử.

## Các thành phần của Test Plan

### 1. Test Plan Identifier
Mã định danh duy nhất cho test plan.

### 2. Scope
- **In scope:** Những gì sẽ test
- **Out of scope:** Những gì không test (và lý do)

### 3. Test Strategy / Approach
- Loại testing sẽ thực hiện
- Tools sử dụng
- Test techniques áp dụng

### 4. Entry & Exit Criteria

```
Entry: Requirements approved + Build deployed + Env ready
Exit: All critical TC passed + No P1/P2 bugs open + Report done
```

### 5. Test Environment
- Server, browser, device requirements
- Test data preparation

### 6. Resource & Schedule
- Ai test gì, khi nào
- Timeline và milestones

### 7. Risk & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Requirement thay đổi | Phải viết lại TC | Buffer thời gian, Agile approach |
| Thiếu người | Delay testing | Ưu tiên critical features |
| Env không ổn định | Block testing | Backup env, escalate sớm |

## Test Strategy vs Test Plan

| Test Strategy | Test Plan |
|---|---|
| Organization level | Project level |
| Không thay đổi thường xuyên | Thay đổi theo project |
| Định nghĩa approach chung | Chi tiết cụ thể cho project |

::: info Template
Nội dung chi tiết và template sẽ được bổ sung sau.
:::
