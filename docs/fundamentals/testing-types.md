# Testing Types

## Tổng quan

Testing Types phân loại theo **mục đích test**, không phải theo level. Cùng 1 level (System Testing) có thể bao gồm nhiều types khác nhau.

```
Testing Types
├── Functional Testing (Hệ thống LÀM GÌ?)
│   ├── Smoke Testing
│   ├── Sanity Testing
│   ├── Regression Testing
│   ├── Retesting
│   └── End-to-end Testing
└── Non-functional Testing (Hệ thống hoạt động TỐT NHƯ THẾ NÀO?)
    ├── Performance Testing
    ├── Security Testing
    ├── Usability Testing
    ├── Compatibility Testing
    └── Accessibility Testing
```

---

## Functional Testing

Kiểm tra hệ thống **làm đúng** những gì được yêu cầu — tập trung vào **WHAT** (chức năng).

### Smoke Testing — "Kiểm tra nhanh, build có sống không?"

#### Bản chất (WHAT)
Test **nhanh** các chức năng **chính** ngay sau khi nhận build mới. Mục đích: xác nhận build đủ ổn định để test tiếp.

#### Tại sao cần (WHY)
Nếu build bị hỏng nặng (không login được, trang chủ crash), thì chạy cả bộ test 200 test cases sẽ **lãng phí thời gian**. Smoke test giúp **chặn sớm**.

#### Cách thực hiện (HOW)

**Ví dụ Smoke Test cho app e-commerce:**
1. ✅ App load thành công
2. ✅ Login/Register hoạt động
3. ✅ Trang chủ hiển thị sản phẩm
4. ✅ Search hoạt động
5. ✅ Add to cart thành công
6. ✅ Checkout page load được
7. ✅ Payment process hoạt động

→ **~10-15 phút**, cover main flows. Nếu pass → tiếp tục test chi tiết. Nếu fail → **reject build**, yêu cầu dev fix.

#### Thực tế dự án
- Thường **automate** smoke test vì chạy mỗi build mới
- Trong CI/CD: smoke test chạy tự động sau deploy → nếu fail → auto rollback
- Ai cũng có thể chạy (QA, Dev, PM)

---

### Sanity Testing — "Check nhanh phần vừa sửa"

#### Bản chất (WHAT)
Test **tập trung** vào phần vừa thay đổi/fix. Hẹp hơn smoke test, nhưng **sâu hơn** ở phần cụ thể.

#### Khi nào dùng (WHY)
- Sau khi dev fix bug → sanity check bug đó và vùng liên quan
- Sau minor change → verify change hoạt động đúng
- Không đủ thời gian cho full regression

#### Smoke vs Sanity

```
Build mới deploy lên staging:

1. Smoke Test (rộng, nông)
   ├── Login OK?     ✅
   ├── Homepage OK?  ✅
   ├── Search OK?    ✅
   ├── Cart OK?      ✅
   └── Payment OK?   ✅
   → Build stable, tiếp tục test

2. Dev fix bug "Coupon code không apply được"
   → Sanity Test (hẹp, sâu)
   ├── Apply valid coupon         ✅
   ├── Apply expired coupon       ✅ (show error)
   ├── Apply coupon + remove      ✅
   ├── Apply 2 coupons            ✅ (show "only 1 allowed")
   └── Checkout with coupon       ✅ (price correct)
   → Bug fixed, area stable
```

| | Smoke Testing | Sanity Testing |
|---|---|---|
| **Phạm vi** | Rộng (cả app) | Hẹp (phần cụ thể) |
| **Độ sâu** | Nông | Sâu |
| **Khi nào** | Build mới | Sau fix/change |
| **Mục đích** | Build có stable không? | Fix/change có đúng không? |
| **Ai chạy** | Ai cũng được | QA |

---

### Regression Testing — "Đảm bảo cái cũ vẫn hoạt động"

#### Bản chất (WHAT)
Test lại **các chức năng đã hoạt động trước đó** sau khi có thay đổi trong hệ thống (new feature, bug fix, config change).

#### Tại sao quan trọng nhất (WHY)

Đây là testing type **tốn effort nhất** nhưng cũng **quan trọng nhất**:
- Fix bug A → vô tình làm hỏng feature B (side effect)
- Thêm feature mới → ảnh hưởng đến feature cũ
- Upgrade library → behavior thay đổi

**Ví dụ thực tế:** Dev fix lỗi tính giá giảm. Code change ảnh hưởng module Cart. Nếu không regression test → Cart có thể bị lỗi total price.

#### Cách thực hiện (HOW)

**Chiến lược regression test:**

1. **Full Regression** — Chạy toàn bộ test suite
   - Khi: Major release, trước go-live
   - Effort: Cao (có thể vài ngày nếu manual)

2. **Partial Regression** — Chạy test liên quan đến phần thay đổi
   - Khi: Minor fix, sprint release
   - Cần: Impact analysis (phần nào bị ảnh hưởng?)

3. **Risk-based Regression** — Ưu tiên test phần rủi ro cao
   - Khi: Thiếu thời gian
   - Focus: Core business flows, phần có nhiều bug history

::: tip Automation là chìa khóa
Regression testing là lý do **số 1** để đầu tư vào automation. Một bộ 200 regression test cases chạy manual mất 3 ngày → chạy automation mất 30 phút.
:::

---

### Retesting vs Regression

Hai khái niệm hay bị nhầm lẫn:

| | Retesting | Regression |
|---|---|---|
| **Mục đích** | Confirm bug **đã fix** | Confirm fix **không gây lỗi mới** |
| **Phạm vi** | Chỉ bug đó | Các feature liên quan |
| **Test case** | Test case ban đầu tìm ra bug | Bộ regression test cases |
| **Bắt buộc** | Luôn luôn (mọi bug fix) | Phụ thuộc risk |

**Ví dụ:**

```
Bug: "Coupon 'SALE20' không giảm giá"

Retesting (bắt buộc):
  → Apply coupon SALE20 → Verify giá giảm 20% ✅

Regression (nên làm):
  → Apply coupon khác (FREESHIP) → Vẫn hoạt động? ✅
  → Checkout flow → Total tính đúng? ✅
  → Order history → Coupon hiển thị? ✅
```

---

## Non-functional Testing

Kiểm tra hệ thống hoạt động **tốt như thế nào** — tập trung vào **HOW WELL**.

### Performance Testing

**Câu hỏi:** Hệ thống có nhanh không? Chịu được tải không?

| Loại | Mô tả | Ví dụ |
|---|---|---|
| **Load Testing** | Test dưới tải dự kiến | 1000 users đồng thời truy cập |
| **Stress Testing** | Test vượt giới hạn | Tăng dần lên 5000, 10000 users |
| **Spike Testing** | Test tải đột ngột | Flash sale: 0 → 3000 users trong 1 phút |
| **Endurance Testing** | Test chạy lâu dài | Chạy 1000 users liên tục 24 giờ |

**Metrics quan trọng:**
- **Response time:** Trang load < 2 giây
- **Throughput:** Hệ thống xử lý bao nhiêu request/giây
- **Error rate:** Tỷ lệ lỗi < 1%
- **Resource usage:** CPU < 80%, Memory < 80%

Chi tiết: xem section [Performance Testing](/performance/).

### Security Testing

**Câu hỏi:** Hệ thống có an toàn không?

| Kiểm tra | Ví dụ |
|---|---|
| **Authentication** | Có bypass login được không? Password có mã hóa? |
| **Authorization** | User thường có truy cập được API admin không? |
| **Data Protection** | Dữ liệu nhạy cảm (password, credit card) có mã hóa? |
| **Input Validation** | SQL injection, XSS có bị chặn? |

Chi tiết: xem section [Security Testing](/security/).

### Usability Testing

**Câu hỏi:** Hệ thống có dễ dùng không?

| Kiểm tra | Ví dụ |
|---|---|
| **Learnability** | User mới có tự biết dùng không? |
| **Efficiency** | Hoàn thành task mất bao nhiêu bước? |
| **Memorability** | Sau 1 tuần không dùng, có nhớ cách dùng? |
| **Error recovery** | Khi user làm sai, có hướng dẫn sửa không? |
| **Satisfaction** | User có hài lòng với trải nghiệm? |

### Compatibility Testing

**Câu hỏi:** Hệ thống có hoạt động trên mọi môi trường không?

| Loại | Kiểm tra |
|---|---|
| **Browser** | Chrome, Firefox, Safari, Edge |
| **OS** | Windows, macOS, iOS, Android |
| **Device** | Desktop, tablet, mobile |
| **Screen size** | 1920px, 1366px, 768px, 375px |
| **Version** | App version cũ có tương thích API mới không? |

**Thực tế:** Thường dùng **BrowserStack** hoặc **LambdaTest** để test trên nhiều thiết bị mà không cần sở hữu vật lý.

### Accessibility Testing (a11y)

**Câu hỏi:** Người khuyết tật có sử dụng được không?

| Tiêu chuẩn | Kiểm tra |
|---|---|
| **WCAG 2.1** | Tiêu chuẩn quốc tế về accessibility |
| **Screen reader** | App có đọc được bằng screen reader? |
| **Keyboard** | Điều hướng bằng keyboard (không cần chuột)? |
| **Color contrast** | Text có đủ tương phản với background? |
| **Alt text** | Hình ảnh có alt text cho screen reader? |

**Tools:** Lighthouse (Chrome), axe DevTools, WAVE.

---

## Khi nào dùng loại nào?

### Theo giai đoạn trong Sprint

```
Build mới deploy
│
├─► Smoke Test (10 phút)
│   ├── Pass → Tiếp tục
│   └── Fail → Reject build
│
├─► Functional Testing (1-3 ngày)
│   ├── New features
│   ├── Bug retesting
│   └── Edge cases
│
├─► Regression Testing (automation: 30 phút, manual: 1-3 ngày)
│
├─► Non-functional (nếu cần)
│   ├── Performance
│   ├── Security
│   └── Compatibility
│
└─► Sanity check trước release
```

### Checklist cho QA trong Sprint

| Phase | Testing Type | Priority |
|---|---|---|
| Nhận build mới | Smoke | Bắt buộc |
| Test feature mới | Functional | Bắt buộc |
| Bug fix deploy | Retesting + Sanity | Bắt buộc |
| Trước release | Regression | Bắt buộc |
| Major release | Performance + Security | Recommended |
| Web app | Compatibility (top browsers) | Recommended |

---

## Tóm tắt chương

| Type | Mục đích | Khi nào | Effort |
|---|---|---|---|
| **Smoke** | Build stable? | Mỗi build mới | Thấp (10-15 phút) |
| **Sanity** | Fix/change OK? | Sau mỗi fix | Thấp-Trung bình |
| **Regression** | Cái cũ vẫn OK? | Trước release | Cao (nên automate) |
| **Retesting** | Bug đã fix? | Mỗi bug fix | Thấp |
| **Performance** | Nhanh? Chịu tải? | Major release | Trung bình |
| **Security** | An toàn? | Periodic + major release | Trung bình-Cao |
| **Compatibility** | Chạy mọi nơi? | Major release | Trung bình |
