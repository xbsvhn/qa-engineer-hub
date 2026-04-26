# SDLC & STLC

## Phần mềm được tạo ra như thế nào?

Bạn muốn xây nhà. Bạn không thể đi mua gạch rồi xây ngay — bạn cần:
1. Biết **xây nhà gì** (biệt thự? chung cư? nhà cấp 4?)
2. **Lên kế hoạch** (bao nhiêu tiền? bao lâu? ai làm?)
3. **Thiết kế** (bản vẽ, vật liệu)
4. **Xây** (đổ móng, xây tường, lắp điện nước)
5. **Kiểm tra** (nhà có chắc không? điện nước chạy không?)
6. **Bàn giao** cho chủ nhà ở
7. **Bảo trì** (sửa chữa khi hỏng)

Phần mềm cũng được tạo ra theo quy trình tương tự. Quy trình đó gọi là **SDLC**.

---

## SDLC là gì — bản chất?

**SDLC** = **S**oftware **D**evelopment **L**ife **C**ycle = Vòng đời phát triển phần mềm.

**Bản chất:** SDLC là **chuỗi các bước** mà một phần mềm đi qua từ khi còn là ý tưởng cho đến khi được người dùng sử dụng và bảo trì. Giống như vòng đời của một ngôi nhà: từ ý tưởng → bản vẽ → xây dựng → kiểm tra → dùng → sửa chữa.

### 7 giai đoạn của SDLC

```
1. Requirement    "Cần làm gì?"       → Thu thập yêu cầu
2. Planning       "Làm thế nào?"      → Lên kế hoạch
3. Design         "Trông như thế nào?" → Thiết kế kiến trúc
4. Development    "Code!"              → Viết code
5. Testing        "Đúng chưa?"         → Kiểm tra
6. Deployment     "Release!"           → Đưa lên production
7. Maintenance    "Sửa + cải tiến"     → Vận hành, bảo trì
```

### QA làm gì ở MỖI giai đoạn?

Đây là điều nhiều người hiểu sai: **QA không chỉ làm việc ở bước 5 (Testing)**. QA tốt tham gia từ bước 1.

| Giai đoạn | QA làm gì | Ví dụ cụ thể |
|---|---|---|
| **1. Requirement** | Đọc requirement, hỏi câu hỏi, tìm lỗ hổng | "Requirement nói user login bằng email. Vậy nếu user nhập email sai format thì hiện lỗi gì? Requirement không nói." |
| **2. Planning** | Ước lượng thời gian test, đề xuất tool | "Feature này cần 3 ngày test. Cần Postman cho API testing." |
| **3. Design** | Review UI/UX design, hiểu kiến trúc | "Thiết kế này button quá nhỏ, user mobile khó bấm." |
| **4. Development** | Viết test case, chuẩn bị test data | Dev đang code → QA **đồng thời** viết test case. Không đợi dev xong mới bắt đầu. |
| **5. Testing** | Execute test, report bug | Chạy test cases, tìm bugs, report vào Jira. |
| **6. Deployment** | Smoke test trên production | App deploy xong → QA kiểm tra nhanh: login được không? trang chủ load không? |
| **7. Maintenance** | Test hotfix, regression test | User report bug → Dev fix → QA kiểm tra fix đúng chưa, có gây lỗi mới không. |

::: tip Shift-left Testing
"Shift-left" nghĩa là **đẩy testing về bên trái** (sớm hơn) trên timeline. QA tham gia từ bước Requirement có thể phát hiện 30-50% lỗi **trước khi viết dòng code nào** — tiết kiệm rất nhiều tiền và thời gian.
:::

---

## Các mô hình SDLC — Dùng mô hình nào?

"Mô hình" ở đây nghĩa là **cách tổ chức** 7 bước trên. Giống như cùng là xây nhà, nhưng có người xây xong tầng 1 mới xây tầng 2 (tuần tự), có người xây song song nhiều phần (linh hoạt).

### 1. Waterfall — Thác nước

**Bản chất:** Làm **tuần tự** từng bước, xong bước này mới sang bước tiếp. Không quay lại.

```
Requirement ──► Design ──► Development ──► Testing ──► Deployment
     (xong)       (xong)       (xong)        (xong)       (xong)
                                               ↑
                                     QA mới bắt đầu ở đây!
```

**Vấn đề:** QA chỉ test ở cuối. Nếu phát hiện requirement sai → phải quay lại từ đầu → tốn kém, chậm.

**Dùng khi nào:** Dự án nhỏ, requirement rõ ràng 100% từ đầu, không thay đổi. Ví dụ: phần mềm điều khiển máy giặt — spec cố định, không cần linh hoạt.

### 2. Agile — Linh hoạt

**Bản chất:** Chia dự án thành **nhiều vòng lặp nhỏ** (gọi là Sprint, thường 2 tuần). Mỗi Sprint làm một phần nhỏ, hoàn chỉnh từ đầu đến cuối.

```
Sprint 1 (2 tuần)          Sprint 2 (2 tuần)          Sprint 3...
┌─────────────────┐        ┌─────────────────┐
│ Plan→Code→Test  │   →    │ Plan→Code→Test  │   →    ...
│ →Demo→Feedback  │        │ →Demo→Feedback  │
└─────────────────┘        └─────────────────┘
   Deliver phần 1            Deliver phần 2
```

**Tại sao Agile phổ biến (~80% dự án hiện nay)?**
- Feedback sớm → sửa sai nhanh
- QA test **mỗi Sprint** → phát hiện bug sớm
- Linh hoạt thay đổi requirement giữa chừng

**Chi tiết về Agile/Scrum:** Xem bài [Agile & Scrum cho QA](./agile-scrum).

### So sánh nhanh

| | Waterfall | Agile |
|---|---|---|
| **Delivery** | Cuối dự án (vài tháng) | Mỗi 2 tuần |
| **Testing** | Cuối project | Mỗi Sprint |
| **Thay đổi requirement** | Rất khó | Bình thường |
| **Risk phát hiện muộn** | Cao | Thấp |
| **Phổ biến** | ~20% | ~80% |

---

## STLC là gì — bản chất?

**STLC** = **S**oftware **T**esting **L**ife **C**ycle = Vòng đời kiểm thử phần mềm.

**Bản chất:** Nếu SDLC là quy trình **tạo ra** phần mềm, thì STLC là quy trình **kiểm tra** phần mềm. STLC nằm **bên trong** SDLC.

```
SDLC (toàn bộ dự án):
  Requirement → Design → Development → [STLC] → Deployment → Maintenance
                                         ↑
                                    Quy trình test
                                    nằm ở đây
```

### 6 bước của STLC

Mỗi bước trả lời một câu hỏi:

| Bước | Câu hỏi | QA làm gì |
|---|---|---|
| **1. Requirement Analysis** | "Cần test cái gì?" | Đọc requirement, hỏi clarification, tìm gaps |
| **2. Test Planning** | "Test như thế nào?" | Viết test plan: scope, timeline, ai test gì |
| **3. Test Case Development** | "Test cases cụ thể là gì?" | Viết test cases, chuẩn bị test data |
| **4. Environment Setup** | "Test ở đâu?" | Chuẩn bị server, browser, database, test accounts |
| **5. Test Execution** | "Chạy test!" | Execute test cases, report bugs, retest fixes |
| **6. Test Closure** | "Kết quả thế nào?" | Viết test report, đánh giá chất lượng, lessons learned |

### Ví dụ thực tế

Requirement: *"User có thể login bằng email và password"*

**Bước 1 — Requirement Analysis:** QA đọc và hỏi:
- "Email sai format → hiện lỗi gì?"
- "Password sai bao nhiêu lần → khóa account?"
- "Có Remember me không?"
- "Social login (Google/Facebook) có trong scope không?"

**Bước 2 — Test Planning:** "Login feature cần 2 ngày test, 1 QA, test trên Chrome + Firefox + Mobile."

**Bước 3 — Test Case Development:** Viết 15-20 test cases (login đúng, login sai password, login email trống, login bị lock account...)

**Bước 4 — Environment Setup:** Tạo test account trên staging server.

**Bước 5 — Test Execution:** Chạy 20 test cases → 18 pass, 2 fail → log 2 bugs vào Jira.

**Bước 6 — Test Closure:** "Login feature: 90% pass rate, 2 bugs (1 Major, 1 Minor). Major bug cần fix trước release."

---

## Entry & Exit Criteria

### Entry Criteria — "Đủ điều kiện bắt đầu test chưa?"

Trước khi bắt đầu test, cần đảm bảo:
- ✅ Requirement đã review → biết test cái gì
- ✅ Build deploy thành công → có cái để test
- ✅ Test data sẵn sàng → có data để nhập
- ✅ Smoke test pass → build không crash ngay

Nếu chưa đủ → **không bắt đầu test**. Test trên build hỏng = lãng phí thời gian.

### Exit Criteria — "Đủ điều kiện kết thúc test chưa?"

Khi nào dừng test?
- ✅ 100% test cases đã chạy
- ✅ Pass rate ≥ 95%
- ✅ 0 Critical bugs mở
- ✅ Test report đã viết

**Thực tế trong Agile:** Entry/Exit Criteria thường được thay bằng **Definition of Ready** (story sẵn sàng để bắt đầu) và **Definition of Done** (story hoàn thành). Xem bài [Agile & Scrum](./agile-scrum).

---

## Tóm tắt

| Concept | Bản chất 1 câu |
|---|---|
| **SDLC** | Quy trình tạo phần mềm từ ý tưởng đến bảo trì — 7 bước |
| **Waterfall** | Tuần tự, test cuối — rủi ro cao, ít dùng |
| **Agile** | Chia nhỏ thành Sprint 2 tuần, test mỗi Sprint — phổ biến nhất |
| **STLC** | Quy trình test nằm trong SDLC — 6 bước |
| **Entry/Exit** | Checklist "đủ điều kiện bắt đầu/kết thúc" |
| **QA Role** | Tham gia MỌI giai đoạn SDLC, không chỉ bước Testing |
