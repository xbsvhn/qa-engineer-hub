# Testing Types — Phân loại kiểm thử

## Câu hỏi khởi đầu: Tại sao phải phân loại?

Hãy tưởng tượng bạn vừa mua một chiếc xe hơi mới. Bạn sẽ kiểm tra những gì?

- **"Xe có chạy không?"** — Đề máy, vào số, nhấn ga, xe di chuyển? Đây là kiểm tra **chức năng** (Functional)
- **"Xe chạy có TỐT không?"** — Tốc độ tối đa? Tiết kiệm xăng? Ghế ngồi êm? An toàn khi va chạm? Đây là kiểm tra **phi chức năng** (Non-functional)

Hai câu hỏi này chính là nền tảng để phân loại **mọi loại testing** trong phần mềm.

---

## Functional vs Non-functional — Hai trụ cột của Testing

### Functional Testing — "Hệ thống LÀM GÌ?"

**Functional Testing** (kiểm thử chức năng) là kiểm tra xem phần mềm có **làm đúng** những gì được yêu cầu hay không. Tập trung vào câu hỏi **WHAT** — cái gì.

> Hãy nghĩ đến một cái máy tính bỏ túi. Functional testing hỏi: "Bấm 2 + 3 có ra 5 không? Bấm nút CE có xóa không? Bấm % có tính phần trăm đúng không?"

Nói đơn giản: **mỗi nút bấm có làm đúng việc của nó không?**

### Non-functional Testing — "Hệ thống hoạt động TỐT NHƯ THẾ NÀO?"

**Non-functional Testing** (kiểm thử phi chức năng) là kiểm tra **chất lượng** của việc thực hiện chức năng đó. Tập trung vào câu hỏi **HOW WELL** — tốt đến mức nào.

> Vẫn cái máy tính đó. Non-functional testing hỏi: "Bấm 2 + 3 có ra kết quả NHANH không? Màn hình có dễ đọc dưới nắng không? Pin dùng được bao lâu? Rơi xuống đất có hỏng không?"

::: tip Aha moment
Functional = **"CÁI GÌ"** — Cái máy tính có cộng đúng không?
Non-functional = **"NHƯ THẾ NÀO"** — Cái máy tính cộng có nhanh không? Có dùng được trên mobile không? Có bảo mật không?

Một phần mềm có thể **làm đúng** mọi chức năng nhưng vẫn **thất bại** vì quá chậm, khó dùng, hoặc không an toàn.
:::

### Bức tranh tổng thể

```
Testing Types
├── Functional Testing (WHAT — Hệ thống LÀM GÌ?)
│   ├── Smoke Testing        → "Bật TV lên có sáng không?"
│   ├── Sanity Testing       → "Bác sĩ kiểm tra cánh tay vừa bó bột"
│   ├── Regression Testing   → "Sửa ống nước bếp, kiểm tra nhà tắm có rò rỉ?"
│   ├── Retesting            → "Kiểm tra lại chính cái ống vừa sửa"
│   └── End-to-end Testing   → "Đi thử toàn bộ hành trình mua hàng"
│
└── Non-functional Testing (HOW WELL — Hoạt động TỐT ra sao?)
    ├── Performance Testing  → "Thang máy chở được bao nhiêu người?"
    ├── Security Testing     → "Khóa cửa có chắc không?"
    ├── Usability Testing    → "Bà ngoại có dùng được không?"
    ├── Compatibility Testing → "App chạy được trên mọi điện thoại?"
    └── Accessibility Testing → "Người khiếm thị có dùng được không?"
```

---

## Functional Testing — Chi tiết từng loại

### Smoke Testing — "Bật TV mới mua lên, có sáng không?"

#### Bản chất

Bạn vừa mua một cái TV mới. Mở hộp, cắm điện. Bạn kiểm tra gì **đầu tiên**?

1. Bấm nút nguồn — TV có bật lên không?
2. Màn hình có hiển thị hình ảnh không?
3. Loa có phát ra tiếng không?
4. Remote có điều khiển được không?

Bạn **không** ngồi kiểm tra từng kênh, từng cổng HDMI, từng setting âm thanh ngay. Bạn chỉ muốn biết: **"TV này có hoạt động cơ bản không?"**

Đó chính là **Smoke Testing** — kiểm tra nhanh các chức năng **cốt lõi nhất** để xác nhận phần mềm đủ ổn định cho việc test tiếp.

#### Nguồn gốc cái tên — Tại sao gọi là "Smoke" Test?

::: info Câu chuyện thú vị
Thuật ngữ này bắt nguồn từ ngành **điện tử**. Khi lắp xong một mạch điện mới, kỹ sư sẽ cắm điện lần đầu tiên. Nếu **có khói bốc lên** (smoke comes out) — mạch đã hỏng, không cần test gì thêm.

Tương tự, nếu phần mềm không qua nổi smoke test (login fail, trang chủ crash) thì không cần mất công test chi tiết — **reject build** ngay.
:::

#### Ví dụ thực tế: Smoke Test cho app e-commerce

```
Build mới vừa deploy lên staging environment...

Smoke Test Checklist (10-15 phút):
  ✅ App load thành công, không trắng trang
  ✅ Trang đăng nhập hiển thị, login được
  ✅ Trang chủ hiển thị danh sách sản phẩm
  ✅ Tìm kiếm sản phẩm hoạt động
  ✅ Thêm vào giỏ hàng thành công
  ✅ Trang thanh toán load được
  ✅ API thanh toán phản hồi

Kết quả:
  → Tất cả PASS → Build ổn định, tiếp tục test chi tiết
  → Bất kỳ FAIL → Reject build, yêu cầu dev fix ngay
```

#### Đặc điểm quan trọng

- **Rộng nhưng nông** — cover nhiều chức năng, nhưng mỗi chức năng chỉ check cơ bản
- **Nhanh** — chỉ 10-15 phút, không phải hàng giờ
- **Ai cũng chạy được** — QA, Dev, PM đều có thể thực hiện
- **Nên automate** — vì phải chạy mỗi lần có build mới
- Trong **CI/CD pipeline** (hệ thống tự động build và deploy): smoke test chạy tự động sau mỗi lần deploy, nếu fail thì tự động rollback

---

### Sanity Testing — "Bác sĩ kiểm tra cánh tay vừa bó bột"

#### Bản chất

Bạn bị gãy tay, bác sĩ bó bột xong. Lần tái khám, bác sĩ có kiểm tra **toàn bộ cơ thể** bạn không? Không. Bác sĩ tập trung kiểm tra **cụ thể cánh tay đó**: cử động được chưa? Còn đau không? Xương lành chưa? Vùng xung quanh chỗ bó có bình thường không?

Đó là **Sanity Testing** — sau khi một phần cụ thể được sửa hoặc thay đổi, kiểm tra **sâu** vào đúng phần đó và vùng liên quan trực tiếp.

#### Khi nào dùng

- Dev fix một bug cụ thể → sanity check bug đó và các chức năng lân cận
- Có một thay đổi nhỏ (minor change) → verify thay đổi hoạt động đúng
- Không đủ thời gian cho full regression → sanity test phần quan trọng nhất

#### Smoke vs Sanity — Phân biệt rõ ràng

```
Tình huống: Build mới deploy, trong đó dev fix bug "Mã giảm giá không apply được"

Bước 1 — Smoke Test (rộng, nông):
   ├── Login OK?          ✅
   ├── Trang chủ OK?      ✅
   ├── Tìm kiếm OK?       ✅
   ├── Giỏ hàng OK?       ✅
   └── Thanh toán OK?     ✅
   → Kết luận: Build ổn định, test tiếp

Bước 2 — Sanity Test (hẹp, sâu) vào phần coupon:
   ├── Apply mã hợp lệ "SALE20"         ✅ Giảm đúng 20%
   ├── Apply mã hết hạn                  ✅ Hiện thông báo lỗi
   ├── Apply rồi xóa mã                  ✅ Giá về lại ban đầu
   ├── Apply 2 mã cùng lúc              ✅ Hiện "chỉ dùng 1 mã"
   ├── Checkout với mã giảm giá          ✅ Tổng tiền tính đúng
   └── Mã giảm giá + miễn phí ship      ✅ Cả hai cùng hoạt động
   → Kết luận: Bug đã fix, vùng coupon ổn định
```

| Tiêu chí | Smoke Testing | Sanity Testing |
|---|---|---|
| **Phạm vi** | Rộng — cả ứng dụng | Hẹp — phần cụ thể |
| **Độ sâu** | Nông — chỉ check cơ bản | Sâu — test kỹ phần đó |
| **Khi nào** | Nhận build mới | Sau khi fix bug / thay đổi |
| **Mục đích** | Build có đủ ổn định để test? | Fix/change có hoạt động đúng? |
| **Ví von** | Bật TV — có sáng không? | Bác sĩ kiểm tra tay bó bột |

---

### Regression Testing — Loại test QUAN TRỌNG NHẤT

#### Bản chất — Hiệu ứng domino trong phần mềm

Hãy tưởng tượng ngôi nhà bạn bị rò ống nước ở **bếp**. Thợ sửa ống nước đến, sửa xong. Bạn kiểm tra bếp — hết rò rỉ, tuyệt vời!

Nhưng khoan... bạn có kiểm tra **phòng tắm** không? Vì hệ thống ống nước **kết nối với nhau**. Sửa ống ở bếp hoàn toàn có thể gây rò rỉ ở phòng tắm.

::: warning Aha moment — Tại sao Regression Testing tồn tại
Trong phần mềm, mọi thứ **kết nối với nhau** giống hệ thống ống nước. Fix bug A hoàn toàn có thể **phá hỏng** feature B mà không ai ngờ tới. Đây gọi là **side effect** (tác dụng phụ).

**Regression Testing** tồn tại để trả lời một câu hỏi duy nhất: **"Những thứ đang chạy tốt CÓ CÒN chạy tốt không sau khi thay đổi code?"**
:::

#### Tại sao đây là loại test quan trọng nhất?

**Câu chuyện thực tế:** Dev sửa lỗi tính giá giảm trong module Payment. Code thay đổi ảnh hưởng đến cách tính tổng tiền. Nếu không regression test:

```
Trước khi sửa:
  Payment: tính giá giảm SAI ❌ (bug)
  Cart: hiển thị tổng tiền ĐÚNG ✅
  Order History: hiển thị ĐÚNG ✅

Sau khi sửa (KHÔNG có regression test):
  Payment: tính giá giảm ĐÚNG ✅ (bug fixed!)
  Cart: hiển thị tổng tiền SAI ❌ (side effect!)
  Order History: hiển thị SAI ❌ (side effect!)

→ Fix 1 bug, tạo ra 2 bug mới. Khách hàng gặp lỗi mới ngay chức năng đã hoạt động tốt.
```

#### Ba chiến lược Regression Test

**1. Full Regression — Chạy toàn bộ test suite**
- Khi nào: Major release, trước khi go-live (lên production)
- Effort: Rất cao nếu manual (có thể vài ngày)
- Ví von: Kiểm tra **toàn bộ** hệ thống ống nước trong nhà

**2. Partial Regression — Chạy test liên quan đến phần thay đổi**
- Khi nào: Sprint release, minor fix
- Yêu cầu: **Impact analysis** — phân tích xem phần nào bị ảnh hưởng bởi thay đổi
- Ví von: Sửa ống bếp → kiểm tra bếp + phòng tắm (cùng đường ống), không cần kiểm tra mái nhà

**3. Risk-based Regression — Ưu tiên theo mức độ rủi ro**
- Khi nào: Thiếu thời gian, cần chọn lọc
- Focus: Core business flows (luồng nghiệp vụ chính), phần có lịch sử nhiều bug
- Ví von: Kiểm tra ống nước chính trước, ống phụ để sau

::: tip Đây chính là LÝ DO automation ra đời
Regression testing là lý do **số 1** để đầu tư vào **test automation** (kiểm thử tự động). Tại sao?

Một bộ 200 regression test cases:
- **Manual:** 3-5 ngày, dễ sai sót vì lặp đi lặp lại
- **Automation:** 30 phút, chính xác 100%, chạy bất kỳ lúc nào

Mỗi sprint có thay đổi → phải regression test → nếu manual thì QA chỉ ngồi chạy regression cả đời. Automation giải phóng QA để tập trung vào **exploratory testing** (test khám phá sáng tạo).
:::

---

### Retesting vs Regression — Hai anh em hay bị nhầm

#### Phân biệt bằng ví dụ thực tế

Tình huống: Bug **"Mã giảm giá SALE20 không trừ tiền"** đã được dev fix.

```
RETESTING — Kiểm tra lại CHÍNH cái bug đó:
  → Bước 1: Thêm sản phẩm vào giỏ hàng
  → Bước 2: Nhập mã "SALE20"
  → Bước 3: Verify giá đã giảm 20%
  → Kết quả: PASS ✅
  → Kết luận: Bug đã được fix thành công

REGRESSION — Kiểm tra các chức năng XUNG QUANH:
  → Mã giảm giá khác (FREESHIP) vẫn hoạt động? ✅
  → Mã giảm giá theo % và theo số tiền cố định? ✅
  → Tổng tiền ở trang checkout tính đúng? ✅
  → Email xác nhận đơn hàng hiển thị giá đúng? ✅
  → Order history hiển thị đúng? ✅
  → Kết luận: Không có side effect
```

| Tiêu chí | Retesting | Regression |
|---|---|---|
| **Mục đích** | Confirm bug **đã được fix** | Confirm fix **không gây lỗi mới** |
| **Phạm vi** | Chỉ đúng bug đó | Các feature liên quan |
| **Test case** | Test case gốc (tìm ra bug ban đầu) | Bộ regression test cases |
| **Bắt buộc?** | **Luôn luôn** — mọi bug fix phải retest | Tùy thuộc mức độ rủi ro |
| **Ví von** | Sửa ống bếp → mở vòi bếp kiểm tra | Sửa ống bếp → kiểm tra cả phòng tắm |

::: tip Quy trình thực tế khi bug được fix
1. **Retesting** (bắt buộc) — Chạy lại test case gốc, confirm bug đã fix
2. **Sanity Testing** — Test sâu vùng xung quanh bug
3. **Regression Testing** — Test các chức năng liên quan khác
:::

---

## Non-functional Testing — Chi tiết từng loại

### Performance Testing — "Thang máy chở được bao nhiêu người?"

Thang máy thiết kế cho 10 người. Performance testing hỏi:
- **10 người** vào → chạy bình thường? (**Load Testing** — test với tải dự kiến)
- **20 người** cố nhét vào → chuyện gì xảy ra? (**Stress Testing** — test vượt giới hạn)
- Đang trống, đột ngột **15 người** nhảy vào cùng lúc → có bị giật? (**Spike Testing** — test tải đột ngột)
- **8 người** đi lên đi xuống liên tục **24 giờ** → có hỏng không? (**Endurance Testing** — test độ bền)

| Loại | Câu hỏi | Ví dụ thực tế |
|---|---|---|
| **Load Testing** | Chịu được tải bình thường? | 1,000 users truy cập cùng lúc |
| **Stress Testing** | Điểm giới hạn ở đâu? | Tăng lên 5,000... 10,000 users |
| **Spike Testing** | Tải đột ngột thì sao? | Flash sale: 0 → 3,000 users trong 1 phút |
| **Endurance Testing** | Chạy lâu có vấn đề? | 1,000 users liên tục trong 24 giờ |

**Metrics (chỉ số) cần theo dõi:**
- **Response time:** Trang load dưới 2 giây (user rời đi nếu quá 3 giây)
- **Throughput:** Hệ thống xử lý bao nhiêu request mỗi giây
- **Error rate:** Tỷ lệ lỗi phải dưới 1%
- **Resource usage:** CPU < 80%, Memory < 80%

---

### Security Testing — "Khóa cửa nhà có chắc không?"

Bạn vừa xây xong một ngôi nhà đẹp. Mọi phòng đều hoạt động tốt (functional). Nhưng... cửa có khóa chắc không? Cửa sổ có chốt không? Ai lạ có thể vào nhà không?

| Kiểm tra | Ví von | Ví dụ trong phần mềm |
|---|---|---|
| **Authentication** | Khóa cửa trước có hoạt động? | Login có bảo mật? Password có mã hóa? |
| **Authorization** | Khách có vào được phòng riêng? | User thường có truy cập được trang admin? |
| **Data Protection** | Két sắt có khóa? | Thông tin thẻ tín dụng có được mã hóa? |
| **Input Validation** | Cửa sổ có chốt? | SQL injection, XSS có bị chặn? |

> **SQL injection** là kỹ thuật hacker nhập mã độc vào ô input để truy cập database trái phép. **XSS** (Cross-Site Scripting) là chèn script độc hại vào website để đánh cắp thông tin user.

---

### Usability Testing — "Bà ngoại có dùng được không?"

Đây là bài test đơn giản nhất để đánh giá: **đưa sản phẩm cho người chưa biết gì và quan sát họ dùng.**

Nếu bà ngoại bạn muốn đặt hàng trên app mà không cần gọi bạn hỏi "bấm vào đâu con?" — app đó có **usability tốt**.

| Tiêu chí | Câu hỏi | Test thế nào |
|---|---|---|
| **Learnability** | Lần đầu dùng, có tự biết cách? | Đưa user mới, không hướng dẫn, quan sát |
| **Efficiency** | Hoàn thành mất bao nhiêu bước? | Đặt hàng mất 3 bước hay 10 bước? |
| **Memorability** | Lâu không dùng, có nhớ cách? | Sau 2 tuần quay lại, user có lạc không? |
| **Error recovery** | Làm sai thì app có giúp sửa? | Nhập sai email → app gợi ý "Thiếu @"? |
| **Satisfaction** | Dùng xong có hài lòng? | Khảo sát NPS (Net Promoter Score) |

---

### Compatibility Testing — "App chạy được trên mọi thiết bị?"

Giống như một bộ phim phải xem được trên TV, laptop, tablet, điện thoại — phần mềm cũng phải hoạt động trên **nhiều môi trường khác nhau**.

| Loại | Kiểm tra | Ví dụ |
|---|---|---|
| **Browser** | Các trình duyệt phổ biến | Chrome, Firefox, Safari, Edge |
| **OS** | Hệ điều hành | Windows, macOS, iOS, Android |
| **Device** | Loại thiết bị | Desktop, tablet, mobile |
| **Screen size** | Kích thước màn hình | 1920px, 1366px, 768px, 375px |
| **Version** | Phiên bản cũ vs mới | App v2.0 có tương thích API mới? |

**Thực tế:** Dùng **BrowserStack** hoặc **LambdaTest** để test trên hàng trăm thiết bị mà không cần mua thiết bị thật. Thường ưu tiên test trên top 3-5 trình duyệt/thiết bị có lượng user cao nhất (kiểm tra từ **Google Analytics**).

---

### Accessibility Testing (a11y) — "Người khuyết tật có dùng được không?"

> **a11y** là viết tắt của "accessibility" — chữ "a", 11 ký tự ở giữa, chữ "y".

Tưởng tượng bạn bị bó bột tay phải và phải dùng app chỉ bằng tay trái. Hoặc bạn bị mù màu và không phân biệt được nút xanh vs đỏ. Accessibility testing đảm bảo **mọi người** đều dùng được sản phẩm.

| Tiêu chuẩn | Kiểm tra | Tại sao quan trọng |
|---|---|---|
| **WCAG 2.1** | Tiêu chuẩn quốc tế | Nhiều nước yêu cầu bắt buộc theo luật |
| **Screen reader** | App đọc được bằng trình đọc màn hình? | Người khiếm thị sử dụng |
| **Keyboard navigation** | Dùng được chỉ bằng bàn phím? | Người không dùng được chuột |
| **Color contrast** | Text đủ tương phản với nền? | Người mù màu hoặc thị lực yếu |
| **Alt text** | Hình ảnh có mô tả bằng text? | Screen reader đọc mô tả thay vì hình |

**Tools phổ biến:** Lighthouse (tích hợp sẵn trong Chrome DevTools), axe DevTools, WAVE.

---

## Khi nào dùng loại nào? — Timeline trong Sprint

### Sơ đồ quy trình thực tế

```
Sprint bắt đầu → Dev code xong → Build deploy lên staging
│
├─► BƯỚC 1: Smoke Test (10-15 phút)
│   "Bật TV — có sáng không?"
│   ├── PASS → Tiếp tục bước 2
│   └── FAIL → Reject build, dev fix rồi deploy lại
│
├─► BƯỚC 2: Functional Testing (1-3 ngày)
│   "Kiểm tra từng chức năng chi tiết"
│   ├── Test feature mới theo test cases
│   ├── Bug retesting (chạy lại test case gốc)
│   ├── Sanity testing (test sâu vùng vừa fix)
│   └── Edge cases & negative testing
│
├─► BƯỚC 3: Regression Testing
│   "Cái cũ vẫn chạy tốt chứ?"
│   ├── Automation: 30-60 phút ⚡
│   └── Manual (nếu chưa có automation): 1-3 ngày
│
├─► BƯỚC 4: Non-functional Testing (nếu cần)
│   ├── Performance — khi có thay đổi lớn về architecture
│   ├── Security — khi có feature liên quan đến auth/payment
│   └── Compatibility — khi có UI thay đổi
│
└─► BƯỚC 5: Sanity check cuối cùng trước release
    "Lần kiểm tra cuối — mọi thứ ổn chứ?"
```

### Checklist cho QA trong Sprint

| Giai đoạn | Testing Type | Bắt buộc? | Thời gian |
|---|---|---|---|
| Nhận build mới | Smoke Test | **Bắt buộc** | 10-15 phút |
| Test feature mới | Functional Test | **Bắt buộc** | 1-3 ngày |
| Bug fix deploy | Retesting + Sanity | **Bắt buộc** | 30 phút - 2 giờ |
| Trước release | Regression Test | **Bắt buộc** | 30 phút (auto) / 1-3 ngày (manual) |
| Major release | Performance + Security | Khuyến nghị | 1-2 ngày |
| Web app | Compatibility | Khuyến nghị | 0.5-1 ngày |
| App công khai | Accessibility | Khuyến nghị (một số nước bắt buộc) | 0.5-1 ngày |

---

## Tóm tắt chương — Bảng tổng hợp

| Type | Câu hỏi chính | Khi nào | Effort | Ví von |
|---|---|---|---|---|
| **Smoke** | Build có sống không? | Mỗi build mới | Thấp (15 phút) | Bật TV — có sáng? |
| **Sanity** | Phần vừa sửa ổn không? | Sau mỗi fix/change | Thấp-TB | Bác sĩ khám tay bó bột |
| **Regression** | Cái cũ còn chạy không? | Trước release | Cao (nên automate) | Sửa ống bếp — check phòng tắm |
| **Retesting** | Bug đã fix chưa? | Mỗi bug fix | Thấp | Mở vòi bếp vừa sửa |
| **Performance** | Nhanh? Chịu tải? | Major release | TB-Cao | Thang máy chở bao nhiêu người? |
| **Security** | An toàn? | Định kỳ + release lớn | TB-Cao | Khóa cửa có chắc? |
| **Usability** | Dễ dùng? | Khi có UI mới | TB | Bà ngoại dùng được không? |
| **Compatibility** | Chạy mọi nơi? | Major release | TB | Phim xem được mọi thiết bị? |
| **Accessibility** | Ai cũng dùng được? | Khi có UI mới | TB | Người khuyết tật dùng được? |

::: tip Ghi nhớ quan trọng
- **Smoke** = Rộng, nông — kiểm tra nhanh toàn bộ
- **Sanity** = Hẹp, sâu — kiểm tra kỹ phần cụ thể
- **Retesting** = Đúng bug đó
- **Regression** = Mọi thứ xung quanh bug đó
- **Regression là lý do số 1 để làm automation**
:::
