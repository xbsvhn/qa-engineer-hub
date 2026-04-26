# Bug Reporting

## Bug Report giống như Phiếu Khám Bệnh

Bạn đi khám bệnh. Bác sĩ viết phiếu khám gồm: triệu chứng gì, đau ở đâu, từ khi nào, đã uống thuốc gì chưa, kết quả xét nghiệm. Phiếu khám này phải **đủ chi tiết** để bác sĩ khác đọc cũng hiểu và điều trị được.

Bug report cũng vậy:

| Phiếu khám bệnh | Bug Report |
|---|---|
| **Bệnh nhân**: Nguyễn Văn A, nam, 30 tuổi | **Environment**: Chrome 125, macOS, staging |
| **Triệu chứng**: Đau bụng dữ dội sau khi ăn | **Steps to Reproduce**: Nhập thẻ hết hạn, click Place Order |
| **Kết quả thực tế**: Sốt 39 độ, bụng cứng | **Actual Result**: Trang hiện Error 500 |
| **Kết quả mong đợi**: Thân nhiệt 37 độ, bụng mềm | **Expected Result**: Hiện message "Card expired" |
| **Ảnh chụp**: X-quang, xét nghiệm máu | **Attachments**: Screenshot, console log, video |
| **Mức nghiêm trọng**: Cấp cứu / Khám thường | **Severity**: Critical / Major / Minor / Trivial |

:::tip Aha moment
Quy tắc vàng: **Viết bug report như thể developer chưa bao giờ nhìn thấy hệ thống.** Đừng giả định họ biết context. Giống như bác sĩ trực đêm đọc phiếu của bệnh nhân từ phòng khám khác -- mọi thứ phải rõ ràng trên giấy.
:::

---

## Cấu trúc Bug Report chuẩn -- Phiếu khám đầy đủ

| Field | Mô tả | Tương đương Y tế | Bắt buộc? |
|---|---|---|---|
| **Title** | Mô tả ngắn, rõ ràng | Chẩn đoán sơ bộ | Bắt buộc |
| **Severity** | Mức nghiêm trọng kỹ thuật | Mức độ bệnh | Bắt buộc |
| **Priority** | Mức ưu tiên fix | Cần cấp cứu hay khám thường? | Bắt buộc |
| **Environment** | Browser, OS, URL, version | Bệnh viện nào, phòng nào | Bắt buộc |
| **Steps to Reproduce** | Từng bước tái hiện lỗi | Triệu chứng xuất hiện khi nào | Bắt buộc |
| **Actual Result** | Chuyện gì thực sự xảy ra | Kết quả xét nghiệm | Bắt buộc |
| **Expected Result** | Đáng lẽ phải xảy ra gì | Chỉ số bình thường | Bắt buộc |
| **Attachments** | Screenshot, video, log | X-quang, xét nghiệm máu | Bắt buộc |
| **Assignee** | Dev phụ trách fix | Bác sĩ điều trị | Nên có |
| **Linked Story** | User Story liên quan | Hồ sơ bệnh án | Nên có |

---

## Viết Title hiệu quả -- "Chẩn đoán" một dòng

### Format: `[Ở đâu] Làm gì --> Sai ở đâu`

Title (tiêu đề) giống như dòng chẩn đoán trên phiếu khám: **ai đọc cũng hiểu** bệnh gì mà không cần đọc toàn bộ hồ sơ.

```
# SAI -- quá mơ hồ, đọc xong không biết lỗi gì
# Giống viết "Bệnh nhân bị bệnh" trên phiếu khám
"Bug ở trang login"
"Lỗi"
"Không hoạt động"

# ĐÚNG -- đọc title biết ngay: ở đâu, làm gì, sai gì
# Giống viết "Viêm ruột thừa cấp" -- rõ ràng, hành động được
"[Login] Click Login with valid credentials --> Error 500 instead of redirect to Dashboard"
"[Cart] Apply coupon 'SALE20' --> Discount shows 0% instead of 20%"
"[Checkout] Submit order with empty address --> No validation error shown"
"[Search] Search 'iPhone' --> Returns 0 results, but products exist in DB"
```

**3 thành phần của title tốt:**
1. **[Module]** -- Ở đâu? (Login, Cart, Checkout...)
2. **Action** -- User làm gì? (Click, Enter, Submit...)
3. **Wrong Result** -- Sai như thế nào? (Error 500, shows 0%, no message...)

---

## Severity vs Priority -- Bệnh nặng khác với Cần cấp cứu

Đây là khái niệm **hay nhầm nhất** trong QA. Hãy phân biệt rõ:

- **Severity** (Mức nghiêm trọng) = "Bệnh nặng cỡ nào?" -- **QA đánh giá** dựa trên kỹ thuật
- **Priority** (Mức ưu tiên) = "Cần chữa gấp cỡ nào?" -- **PM/Business đánh giá** dựa trên kinh doanh

### Severity -- "Bệnh nặng cỡ nào?" (QA đánh giá)

| Level | Mô tả | Ví dụ | Tương đương Y tế |
|---|---|---|---|
| **Critical** | Hệ thống crash, mất data, lỗ hổng bảo mật | App crash, data bị xóa | Ngừng tim |
| **Major** | Feature chính không hoạt động, không có workaround | Không login được, không checkout | Gãy xương |
| **Minor** | Feature phụ lỗi, có cách khác thay thế | Filter hỏng, nhưng sort vẫn dùng được | Cảm cúm |
| **Trivial** | Giao diện, lỗi chính tả, lệch vài pixel | Typo "Logn" thay vì "Login" | Trầy xước nhẹ |

### Priority -- "Cần chữa gấp cỡ nào?" (PM/Business đánh giá)

| Level | Mô tả | Timeline | Tương đương Y tế |
|---|---|---|---|
| **P1 - Critical** | Fix ngay lập tức | Hotfix trong ngày | Cấp cứu ngay |
| **P2 - High** | Fix trong sprint này | Sprint hiện tại | Nhập viện sớm |
| **P3 - Medium** | Fix khi có thời gian | Sprint tiếp theo | Hẹn tái khám |
| **P4 - Low** | Fix khi rảnh | Backlog | Tự khỏi |

### Severity KHÁC Priority -- 4 ví dụ kinh điển

| Bug | Severity | Priority | Giải thích |
|---|---|---|---|
| App crash trên trang chủ | **Critical** | **P1** | Bệnh nặng + Ảnh hưởng mọi user = Cấp cứu ngay |
| App crash trên trang Admin settings hiếm dùng | **Critical** | **P3** | Bệnh nặng nhưng rất ít người gặp = Hẹn khám sau |
| Logo công ty hiển thị sai trên trang chủ | **Trivial** | **P1** | Trầy xước nhỏ nhưng ảnh hưởng thương hiệu = Fix gấp |
| Typo trong trang FAQ ít người đọc | **Trivial** | **P4** | Trầy xước + Không ai thấy = Fix khi rảnh |

:::tip Aha moment
**Severity cao KHÔNG có nghĩa là Priority cao.** Crash trên trang admin mà chỉ 2 người dùng? P3. Typo trên banner marketing mà triệu user nhìn thấy? P1. Business context quyết định priority, không phải kỹ thuật.
:::

---

## Ví dụ Bug Report chuẩn -- "Phiếu khám mẫu"

### Bug Report TỐT

```
Title: [Checkout] Click "Place Order" with expired credit card
       --> Error 500 instead of user-friendly error message

Severity: Major    (Feature chính bị ảnh hưởng, user không checkout được)
Priority: P2       (Cần fix trong sprint này)
Environment: Chrome 125, macOS 15.3, staging.example.com (build #1234)

Precondition:
- Đã login: test_user@mail.com / Test@123
- Giỏ hàng có ít nhất 1 sản phẩm

Steps to Reproduce:
1. Vào trang /cart
2. Click "Proceed to Checkout"
3. Điền shipping address (bất kỳ địa chỉ hợp lệ)
4. Chọn payment method "Credit Card"
5. Nhập card number: 4111 1111 1111 1111
6. Nhập expiry: 01/20 (thẻ hết hạn)
7. Nhập CVV: 123
8. Click "Place Order"

Actual Result:
- Trang hiện "Internal Server Error 500"
- Console log: "TypeError: Cannot read property 'valid' of undefined"
- Không có error message thân thiện cho user

Expected Result:
- Error message: "Your card has expired. Please use a different card."
- User vẫn ở trang checkout (không mất data đã điền)
- Order KHÔNG được tạo
- Không có error 500

Attachments:
- screenshot_500_error.png
- console_log.txt
- network_response.har

Additional Info:
- Bug xảy ra 100% (5/5 lần thử)
- Cũng lỗi với expiry 01/21, 01/22 (tất cả ngày trong quá khứ)
- Expiry hợp lệ (12/28) hoạt động bình thường
```

### Bug Report KÉM -- đừng viết thế này

```
# SAI -- dev đọc xong vẫn không biết gì
Title: "Error on checkout"
Severity: High
Steps: "Click checkout, got error"
Expected: "Should work"
Attachments: (không có)

# Vấn đề:
# - Title quá mơ hồ
# - Không có environment info
# - Steps không đủ chi tiết để reproduce
# - Expected result quá chung chung
# - Không có screenshot/evidence
# --> Dev sẽ phải hỏi lại 5-10 câu, mất thời gian cả hai bên
```

---

## Bug Life Cycle -- Hành trình của "bệnh nhân"

Mỗi bug đi qua một hành trình, giống như bệnh nhân đi khám:

```
Nhập viện      Khám          Điều trị         Tái khám        Xuất viện
  New  -------> Open -------> In Progress ----> Fixed ---------> Retest
                  |                                               |
                  |                                          Đã khỏi?
                  |                                          /       \
                  |                                       Yes         No
                  |                                        |           |
                  |                                    Verified     Reopen
                  |                                        |        (quay lại
                  |                                     Closed       Open)
                  |
                  |--- Rejected  (Không phải bệnh -- "not a bug")
                  |--- Deferred  (Chưa cần chữa -- "tạm hoãn, fix sau")
                  |--- Duplicate (Trùng hồ sơ -- "đã report rồi")
```

### Chi tiết từng trạng thái

| Status | Ai chuyển | Ý nghĩa | Tương đương Y tế |
|---|---|---|---|
| **New** | QA tạo bug | Bug vừa report | Bệnh nhân mới đến |
| **Open** | QA Lead/PM review | Confirmed, assign cho dev | Bác sĩ nhận bệnh nhân |
| **In Progress** | Dev | Dev đang fix | Đang điều trị |
| **Fixed** | Dev | Dev fix xong, push code | Điều trị xong, chờ tái khám |
| **Retest** | QA | QA verify fix | Tái khám |
| **Verified** | QA | Fix đúng rồi | Khỏi bệnh |
| **Closed** | QA | Bug resolved hoàn toàn | Xuất viện |
| **Reopen** | QA | Fix chưa đúng, cần sửa lại | Tái phát, nhập viện lại |
| **Rejected** | Dev/PM | Không phải bug (by design) | Không phải bệnh, lo lắng thừa |
| **Deferred** | PM | Tạm hoãn, fix sprint sau | Hẹn khám lại tháng sau |
| **Duplicate** | QA/Dev | Trùng với bug đã report | Trùng hồ sơ bệnh án |

:::tip Aha moment
Khi bug bị **Rejected**, đừng buồn. Hãy hỏi "Tại sao đây là by design?" để hiểu product hơn. Khi bug bị **Reopen**, đừng trách dev. Hãy ghi rõ hơn steps reproduce và edge case bị miss. QA và Dev là đồng đội, không phải đối thủ.
:::

---

## Jira Workflow thực tế

### Tạo Bug trong Jira

```
# Cách tạo bug trong Jira -- format chuẩn

Project: ECOM
Issue Type: Bug
Summary: [Checkout] Expired credit card returns 500 error

Description:
  h3. Environment
  Chrome 125, macOS 15.3, staging.example.com

  h3. Steps to Reproduce
  # Navigate to /cart with items
  # Click "Proceed to Checkout"
  # Fill shipping address
  # Enter expired credit card (4111...1111, exp 01/20)
  # Click "Place Order"

  h3. Actual Result
  Error 500 page displayed

  h3. Expected Result
  User-friendly error: "Card has expired"

  h3. Additional Info
  Reproduces 100%. See attached screenshot.

Priority: High
Severity: Major (custom field)
Labels: checkout, payment, regression
Sprint: Sprint 15
Linked Issues: relates to ECOM-456 (Payment User Story)
Attachments: screenshot.png, console_log.txt
```

### JQL Queries hữu ích cho QA

JQL (Jira Query Language) giống SQL cho Jira -- giúp bạn tìm issues nhanh:

```sql
-- Bugs tôi report trong sprint này
-- (Giống: "Cho tôi danh sách bệnh nhân tôi gửi đến trong tuần này")
reporter = currentUser() AND type = Bug AND sprint in openSprints()

-- Open bugs đang chờ dev fix
-- (Giống: "Bệnh nhân nào đang nằm viện chờ điều trị?")
type = Bug AND status in (Open, "In Progress") AND assignee in membersOf("Dev Team")

-- Bugs cần retest -- việc của QA
-- (Giống: "Bệnh nhân nào đã điều trị xong, cần tái khám?")
type = Bug AND status = "Ready for Retest" AND reporter = currentUser()

-- Critical bugs chưa fix -- báo động đỏ
-- (Giống: "Bệnh nhân nào đang nguy kịch mà chưa được cấp cứu?")
type = Bug AND priority in (Critical, Highest) AND status != Closed

-- Bugs created trong 7 ngày gần nhất
-- (Giống: "Thống kê nhập viện tuần qua")
type = Bug AND created >= -7d ORDER BY created DESC
```

---

## Tips viết Bug Report chuyên nghiệp

### 1. Isolate the bug -- Thu hẹp phạm vi trước khi report

Giống bác sĩ hỏi kỹ trước khi chẩn đoán:

```
# Hỏi những câu này TRƯỚC khi report:
- Lỗi chỉ trên 1 browser hay tất cả? (Chrome only? Hay Firefox cũng bị?)
- Lỗi chỉ với data cụ thể hay mọi data? (Chỉ expired card? Hay tất cả card?)
- Lỗi mới xuất hiện từ build nào? (Build #1234? Hay build trước cũng bị?)
- Lỗi xảy ra 100% hay intermittent? (5/5 lần? Hay 2/10 lần?)
```

### 2. Attach evidence -- Đính kèm bằng chứng

```
# Giống X-quang, xét nghiệm máu -- bằng chứng không thể chối cãi

- Screenshot    --> Chụp màn hình, highlight vùng lỗi bằng khung đỏ
- Video         --> Quay màn hình (Loom, OBS) cho lỗi phức tạp
- Console log   --> F12, tab Console, copy error messages
- Network log   --> F12, tab Network, screenshot API response
- HAR file      --> F12, Network, Export HAR (cho API issues)
```

### 3. Report facts, không blame -- Ghi nhận sự thật, không đổ lỗi

```
# SAI -- đổ lỗi cho dev, tạo xung đột
"Dev code sai, function calculateTotal() bị lỗi"

# ĐÚNG -- mô tả sự thật, để dev tự tìm nguyên nhân
"Total hiển thị 0d khi cart có 3 items. Expected: 1,500,000d"
```

### 4. Suggest root cause -- Gợi ý nguyên nhân nếu biết

```
Additional Info:
- Có thể liên quan đến commit abc123 (thay đổi payment validation)
- API /api/payment/validate trả về 500 (xem Network tab đính kèm)
- Chỉ xảy ra với cards có expiry date < ngày hiện tại
```

### 5. Ghi Reproduction Rate -- Tỷ lệ tái hiện

```
# Dev cần biết: lỗi này xảy ra luôn hay "hên xui"?
Reproduction Rate: 100% (5/5 lần thử) --> Bug ổn định, dễ debug
Reproduction Rate: ~30% (3/10 lần thử) --> Intermittent, khó debug hơn
```

:::tip Aha moment
Bug **intermittent** (không phải lúc nào cũng xảy ra) là bug **khó nhất**. Ghi rõ: bạn thử bao nhiêu lần, bao nhiêu lần lỗi, có pattern gì không (chỉ lỗi lúc load nặng? chỉ lỗi request đầu tiên?). Thông tin này cực kỳ quý cho developer.
:::

---

## Bug Metrics -- Theo dõi sức khỏe dự án

| Metric | Ý nghĩa | Target | Tương đương Y tế |
|---|---|---|---|
| **Defect Density** | Số bug mỗi module | Tìm module rủi ro | Tỷ lệ bệnh theo khu vực |
| **Bug Reopen Rate** | % bug reopen sau fix | < 10% | Tỷ lệ tái phát |
| **Defect Leakage** | Bug lọt ra Production | Càng ít càng tốt | Bệnh nhân ra viện lại nhập viện |
| **Avg Fix Time** | Thời gian trung bình fix | Tùy severity | Thời gian điều trị trung bình |
| **Bug Rejection Rate** | % bug bị reject | < 15% | Tỷ lệ chẩn đoán sai |

---

## Tóm tắt -- Phiếu khám hoàn hảo

| Aspect | Best Practice | Nhớ luôn |
|---|---|---|
| **Title** | [Module] Action --> Wrong Result | 1 dòng, ai đọc cũng hiểu |
| **Severity** | Critical > Major > Minor > Trivial | QA đánh giá kỹ thuật |
| **Priority** | P1 > P2 > P3 > P4 | PM đánh giá business |
| **Sev != Pri** | Crash ít user = P3. Typo triệu user = P1 | Context quyết định |
| **Steps** | Cụ thể, đánh số, ai cũng reproduce được | Viết cho người chưa biết gì |
| **Evidence** | Screenshot, video, console log | Không có bằng chứng = không thuyết phục |
| **Tone** | Report facts, không blame | QA và Dev là đồng đội |
| **Lifecycle** | New, Open, Fixed, Retest, Closed | Bug cũng có "hành trình" |
