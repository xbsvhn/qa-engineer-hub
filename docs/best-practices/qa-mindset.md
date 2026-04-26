# QA Mindset — 5 Trụ Cột Tư Duy

## Mindset là gì? Tại sao quan trọng hơn Skills?

**Bản chất (Essence):** Mindset là **cách bạn nhìn mọi thứ** — trước cả khi bạn dùng bất kỳ tool nào.

Hãy tưởng tượng hai đầu bếp cùng có dao, bếp, nguyên liệu giống nhau. Nhưng một người nấu ra món ngon, người kia nấu dở. Khác biệt không nằm ở dụng cụ — mà ở **cách họ nếm, cách họ quan sát, cách họ hiểu nguyên liệu**. QA cũng vậy.

Hai QA cùng biết Playwright, cùng biết SQL, cùng đọc chung requirement. Nhưng một người tìm được 20 bugs, người kia chỉ tìm được 5. Khác biệt nằm ở **mindset** — cách tư duy, cách đặt câu hỏi, cách nhìn nhận vấn đề.

> Skills có thể học trong vài tháng. Mindset cần rèn luyện mỗi ngày — như tập gym cho não.

::: tip Aha Moment
Bạn không cần tool đắt tiền để tìm bugs. Bạn cần **đúng cách nghĩ**. Một QA với mindset tốt + chỉ có browser DevTools sẽ tìm được nhiều bugs hơn một QA với 10 tools nhưng mindset kém.
:::

---

## 5 Pillars of QA Mindset

### Pillar 1: Think Like a User — "Bà ngoại có hiểu nút này không?"

**Bản chất (Essence):** Bạn không phải user. Bạn là người hiểu tech, quen giao diện, biết flow. Nhưng user thật thì không. **Think Like a User** nghĩa là bỏ hết kiến thức kỹ thuật ra ngoài, và tự hỏi: "Nếu đây là lần đầu tiên tôi dùng app này, tôi có hiểu không?"

**Analogy (Ví dụ đời thực):** Bạn thiết kế một cánh cửa. Bạn biết phải **kéo** để mở. Nhưng nếu cánh cửa có tay nắm hình **đẩy** — 100% người sẽ đẩy trước. Đó là **bad UX** — thiết kế khiến user hành động sai. Trong software, nút "Cancel" màu xanh lá (giống "Confirm") cũng là bad UX tương tự.

**Câu hỏi cốt lõi trước mỗi feature:**

```
1. User thật sẽ dùng feature này như thế nào? (Không phải cách dev nghĩ)
2. User nào sẽ dùng? (Tech-savvy 25 tuổi? Hay bà ngoại 70 tuổi?)
3. User mong đợi gì khi click nút này?
4. Nếu tôi là user lần đầu dùng app — tôi có biết bước tiếp theo?
5. Nếu xảy ra lỗi — user có hiểu phải làm gì không?
```

**So sánh thực tế:**

| Tình huống | QA bình thường | QA có User Mindset |
|---|---|---|
| Login | "Login thành công → test pass" | "Login mất 5 giây, user sẽ nghĩ app bị đơ. Cần loading indicator." |
| Error message | "Error message hiển thị → pass" | "Message 'ERR_422' không giúp user hiểu phải làm gì. Cần viết: 'Vui lòng nhập email hợp lệ'" |
| Checkout | "Checkout flow hoạt động" | "Checkout cần 7 bước, quá nhiều. User sẽ bỏ giỏ hàng ở bước 4-5." |
| Search | "Search trả về kết quả" | "Search 'iphone' không trả kết quả 'iPhone'. User sẽ nghĩ hết hàng." |
| Form | "Form submit thành công" | "Form có 15 fields nhưng không lưu draft. User lỡ đóng tab → mất hết data." |

**Bài tập thực hành hàng ngày:**
- Mở một app bạn dùng hàng ngày (Grab, Shopee, Tiki)
- Giả vờ bạn là bà ngoại 70 tuổi lần đầu dùng smartphone
- Thử hoàn thành 1 task (đặt hàng, thanh toán)
- Ghi lại mọi chỗ bạn bị confused hoặc stuck

::: tip Aha Moment
Test không chỉ là "feature có hoạt động không?" mà là "user có **muốn** dùng feature này không?". Một feature hoạt động đúng nhưng confusing — vẫn là bug từ góc nhìn user.
:::

---

### Pillar 2: Think Like a Hacker — "Đổi URL xem có thấy data người khác không?"

**Bản chất (Essence):** Hacker không dùng app theo cách được thiết kế. Họ **tìm cách lách, phá, bypass**. Think Like a Hacker nghĩa là bạn chủ động **tìm điểm yếu** của hệ thống — trước khi hacker thật làm điều đó.

**Analogy (Ví dụ đời thực):** Bạn khóa cửa nhà trước khi đi ngủ. Nhưng bạn có check cửa sổ không? Cửa sau? Cửa thoát hiểm? Garage? Hacker không gõ cửa chính — họ tìm cửa sổ quên khóa. QA cũng phải **kiểm tra mọi "cửa sổ"** của hệ thống.

**Cách nghĩ khi test mỗi feature:**

```
Với MỖI input field, hỏi:
- Nhập gì vào đây để hệ thống crash?
- Có cách nào bypass validation không? (Frontend có check, API thì sao?)
- Nếu tôi gửi 1000 requests cùng lúc thì sao?

Với MỖI URL/API, hỏi:
- Đổi parameter thì chuyện gì xảy ra? (/orders/123 → /orders/124)
- Có thể xem data của người khác không?
- Xóa token rồi gọi API thì sao?
- Gửi request với role thấp hơn thì sao?
```

**Bảng test "Hacker Style" cho từng loại feature:**

| Field/Feature | Cách test bình thường | Cách test Hacker |
|---|---|---|
| Search box | Nhập "laptop" → có kết quả | Nhập `<script>alert('xss')</script>` → check XSS |
| Price field | Nhập "100000" | Nhập `-100`, `0`, `99999999999`, `abc` |
| Upload avatar | Upload ảnh PNG | Upload file `.exe`, `.php`, file 500MB, file tên `../../../etc/passwd` |
| Order ID in URL | Vào `/orders/123` (order của mình) | Đổi thành `/orders/124` (order người khác) |
| Coupon code | Apply coupon "SALE10" | Apply cùng coupon 100 lần. Apply 2 coupons cùng lúc. Apply coupon hết hạn. |
| Payment | Thanh toán thành công | Double-click nút Pay (charge 2 lần?). Sửa giá trong request body. |
| Login | Login với đúng username/password | Thử 1000 passwords liên tiếp (brute force). Login bằng SQL injection: `' OR 1=1 --` |
| API endpoint | Gọi API với token hợp lệ | Gọi không token. Token hết hạn. Token của user khác. |

**Ví dụ thực tế đáng sợ:**

```
Tình huống: E-commerce app, trang order detail
URL: /api/orders/12345

QA bình thường: Xem order của mình → hiển thị đúng → Pass ✅

QA Hacker:
1. Đổi 12345 thành 12346 → Thấy order người khác! → Critical Bug 🔴
2. Thử /api/orders/-1 → Server trả stack trace → Info Disclosure Bug 🔴
3. Gọi API không có token → Vẫn trả data → Auth Bug 🔴
4. Thử /api/orders/../../users → Path Traversal → Critical Bug 🔴

→ Mỗi bug trên đều có thể lên báo nếu bị exploit trên production.
```

::: tip Aha Moment
Bạn không cần là security expert. Bạn chỉ cần hỏi: **"Nếu tôi là người xấu, tôi sẽ thử gì?"**. Chỉ riêng câu hỏi đó đã giúp bạn tìm được 50% security bugs mà QA bình thường bỏ qua.
:::

---

### Pillar 3: Question Everything — "Spec nói X, nhưng còn NOT X thì sao?"

**Bản chất (Essence):** Con người có xu hướng **giả định** (assume). "Chắc dev đã handle rồi", "Chắc giống version cũ", "Requirement không nói → chắc không cần". Mỗi assumption là một **bug đang chờ xảy ra**. Question Everything nghĩa là **không bao giờ assume — luôn verify**.

**Analogy (Ví dụ đời thực):** Bạn đi mua nhà. Chủ nhà nói "Nhà không bị dột". Bạn có tin ngay không? Không — bạn sẽ đến xem, kiểm tra trần, hỏi hàng xóm, check vào mùa mưa. Đó chính là Question Everything — **trust but verify**.

**Những assumption nguy hiểm nhất:**

```
❌ "Chắc là giống version cũ"
   → Thực tế: Dev refactor lại, behavior đã thay đổi. VERIFY!

❌ "Chắc dev đã handle edge case rồi"
   → Thực tế: Dev focus vào happy path. Edge cases thường bị quên. TEST XEM!

❌ "Requirement không nói → chắc không cần test"
   → Thực tế: Requirement hay thiếu. Đó chính là chỗ có bugs. HỎI LẠI!

❌ "Test pass trên Chrome → chắc Firefox cũng OK"
   → Thực tế: CSS rendering khác, JS engine khác. TEST THỬ!

❌ "API trả 200 → chắc data đúng"
   → Thực tế: API trả 200 nhưng body rỗng, hoặc data sai. VERIFY DATA!

❌ "Dev nói đã fix → chắc fix rồi"
   → Thực tế: Fix chỗ này, hỏng chỗ khác. LUÔN RETEST!
```

**5 câu hỏi vàng cho MỌI requirement:**

| # | Câu hỏi | Ví dụ cụ thể |
|---|---|---|
| 1 | "Nếu user KHÔNG làm bước này thì sao?" | Form có 5 fields — user chỉ điền 3 fields rồi submit? |
| 2 | "Nếu data TRỐNG/NULL thì hiển thị gì?" | User mới, chưa có order → trang Order History hiện gì? |
| 3 | "Nếu có LỖI xảy ra thì user thấy gì?" | API timeout → user thấy blank page hay error message? |
| 4 | "Spec nói X — nhưng NGƯỢC LẠI thì sao?" | "Coupon giảm 10%" → Nhưng nếu đơn hàng = 0đ thì sao? Giảm thành âm? |
| 5 | "Trường hợp nào spec CHƯA NÓI ĐẾN?" | "User có thể edit profile" → Nhưng edit thành empty name? Edit bằng emoji? |

**Ví dụ thực tế — Đọc requirement và đặt câu hỏi:**

```
Requirement: "User có thể apply coupon code khi checkout"

QA bình thường: Viết 3 test cases → Apply coupon → Giá giảm → Pass ✅

QA Question Everything:
1. Apply coupon rồi XÓA coupon → giá có trở lại original không?
2. Apply 2 coupons cùng lúc được không? Nếu không → error message gì?
3. Coupon hết hạn → message gì? "Invalid" hay "Expired"?
4. Coupon chỉ cho đơn từ 500k → đơn 499k thì sao?
5. Apply coupon → back lại giỏ hàng → quay lại checkout → coupon còn không?
6. Apply coupon trên web → check trên mobile app → có consistent không?
7. Coupon giảm 50% → đơn 100k → shipping 30k → giảm trên giá nào?
8. Apply coupon → đổi sản phẩm trong giỏ → coupon còn valid?
9. Coupon cho category "Điện thoại" → giỏ hàng có cả Điện thoại + Phụ kiện → giảm item nào?
10. 2 users cùng apply coupon giới hạn 100 lượt → race condition?
```

::: tip Aha Moment
Requirement chỉ nói cho bạn **một nửa câu chuyện**. Nửa còn lại — những thứ requirement KHÔNG nói — chính là nơi bugs ẩn náu. **Câu hỏi tốt nhất của QA không phải "Nó có hoạt động không?" mà là "Nó KHÔNG hoạt động trong trường hợp nào?"**
:::

---

### Pillar 4: Attention to Detail — "Font này 14px hay 13px?"

**Bản chất (Essence):** Bugs thường không ở chỗ "to" — mà ẩn ở **chi tiết nhỏ** mà người khác bỏ qua. Attention to Detail nghĩa là bạn **nhìn thấy những thứ người khác không nhìn** — pixel lệch, số tiền sai 1 đồng, timezone sai 1 giờ, console warning mà ai cũng ignore.

**Analogy (Ví dụ đời thực):** Bạn đi khám bệnh. Bác sĩ giỏi không chỉ hỏi "Đau ở đâu?". Họ nhìn màu da, check nhịp tim, hỏi giấc ngủ, xem lịch sử bệnh. Họ **nhìn toàn bộ chi tiết** — vì triệu chứng nhỏ có thể là dấu hiệu bệnh lớn. QA cũng vậy — console warning hôm nay có thể là server crash ngày mai.

**Chi tiết cần check — Phân loại cụ thể:**

**UI/UX Details:**

```
□ Font size: Design nói 14px — thực tế 13px? (Dùng DevTools → Computed tab)
□ Font weight: Bold hay Semi-bold? (400 vs 600 vs 700 — trông gần giống nhau)
□ Color: #333333 hay #3333333? (Sai 1 ký tự → màu khác)
□ Spacing: Padding 16px hay 12px? Margin giữa các elements đều không?
□ Alignment: Text có thực sự center không? (Khó thấy bằng mắt → dùng DevTools)
□ Responsive: iPhone SE (nhỏ nhất) → text có bị cắt không?
□ Loading state: Khi fetch data → user thấy gì? Blank? Skeleton? Spinner?
□ Empty state: Không có data → "No results" hay blank trắng?
□ Error state: API fail → thông báo gì? Hay chỉ blank page?
□ Hover/Focus state: Button có hover effect không? Focus ring cho accessibility?
```

**Data Details:**

```
□ Số tiền: 1,500,000đ hay 1500000đ? (Format theo locale)
□ Ngày giờ: UTC hay timezone local? (Sai timezone = sai ngày)
   → Ví dụ: Server UTC 23:30 ngày 31/12 = VN 06:30 ngày 01/01 → Sai ngày!
□ Tên: "Nguyen Van An" hay "nguyen van an"? (Capitalization)
□ Số điện thoại: "0901234567" hay "+84901234567"? (Format)
□ Pagination: Hiện "Showing 1-10 of 100" — nhưng filter thì sao? "1-10 of 3"?
□ Sort: Sort by name → "An, Bình, Cường" hay "an, Bình, cường"? (Case-sensitive?)
□ Decimal: 1.5 hay 1,5? (US format vs VN format)
□ Currency: "$" trước số hay "đ" sau số?
```

**Technical Details (F12 là bạn thân):**

```
□ Console tab: Có error hay warning không? (Nhiều QA KHÔNG BAO GIỜ mở Console)
□ Network tab: Có failed requests (đỏ) không? Response time bao lâu?
□ API response: Status 200 nhưng body có error message ẩn?
□ Local storage/cookies: Data sensitive có bị lưu plain text?
□ Memory leak: Chuyển trang qua lại nhiều lần → RAM tăng liên tục?
□ Image: Ảnh có lazy load? Ảnh broken? Alt text có không? (Accessibility)
```

**Ví dụ thực tế — Bug mà chỉ "detail person" mới tìm được:**

```
Tình huống: E-commerce — trang Product Detail

QA bình thường: Sản phẩm hiển thị đúng tên, giá, ảnh → Pass ✅

QA Attention to Detail:
1. Giá "1,500,000đ" nhưng trong giỏ hàng hiện "1500000" → Inconsistent ❌
2. Ảnh sản phẩm 5MB → load 3 giây trên 4G → Cần optimize ❌
3. Mô tả sản phẩm có typo: "Điện thoại Samsng" → ❌
4. Console có warning: "Each child should have a unique key" → React bug ❌
5. Breadcrumb: Home > Điện tử > Điện thoại — nhưng sản phẩm là Laptop → ❌
6. Meta title vẫn là "Product Detail" thay vì tên sản phẩm → SEO fail ❌
7. Schema markup price = 0 → Google hiển thị sai giá → ❌
```

::: tip Aha Moment
Mở **F12 (DevTools)** LUÔN LUÔN khi test. Console tab và Network tab cho bạn thông tin mà UI không bao giờ hiện. 80% bugs ẩn nằm ở đó — đặc biệt console warnings, failed API calls, và slow responses.
:::

---

### Pillar 5: Big Picture Thinking — "Fix giá sản phẩm → check cả Cart, Checkout, Email, Dashboard, Reports"

**Bản chất (Essence):** Không feature nào tồn tại một mình. Mọi thứ trong hệ thống đều **kết nối nhau** như domino. Thay đổi một chỗ có thể **gây hỏng chỗ khác**. Big Picture Thinking nghĩa là bạn nhìn thấy **chuỗi domino** — không chỉ viên domino trước mặt.

**Analogy (Ví dụ đời thực):** Bạn thay đổi giờ làm việc từ 8h sáng thành 9h sáng. Nghe đơn giản? Nhưng nghĩ lại: giờ đón con thay đổi → xe bus khác → ăn trưa giờ khác → meeting bị conflict → deadline bị ảnh hưởng. **Một thay đổi nhỏ → chuỗi hậu quả dài**. Software cũng vậy.

**Ví dụ thực tế — Hiệu ứng Domino:**

```
Dev sửa logic tính giá giảm (discount calculation):

QA bình thường:
  → Test coupon code → Giá giảm đúng → Pass ✅ → Done!

QA Big Picture — theo dấu chuỗi domino:
  → Coupon code → Giá giảm đúng ✅
  → Cart total tính đúng sau discount? ✅
  → Checkout total match với cart? ✅ (Nhiều app tính lại ở checkout)
  → Order confirmation page hiển thị đúng? ✅
  → Email xác nhận có giá đúng? ✅ (Email dùng template riêng!)
  → Order history hiển thị đúng? ✅
  → User quay lại mua tiếp → coupon đã used → không apply lại được? ✅
  → Admin dashboard → revenue report có đúng? ✅
  → Export CSV/Excel → số liệu match dashboard? 🤔
  → Accounting system (nếu integrate) → data đúng? 🤔
  → Refund flow → refund đúng số tiền sau discount? 🤔
```

**Impact Analysis Framework — Hỏi 5 câu:**

| # | Câu hỏi | Mục đích |
|---|---|---|
| 1 | Feature này **tương tác** với modules nào? | Tìm integration points |
| 2 | **API nào** bị ảnh hưởng? | Tìm affected endpoints |
| 3 | **Data nào** thay đổi? (DB, cache, session) | Tìm data corruption risk |
| 4 | **Ai** sẽ dùng feature? (Customer? Admin? Both?) | Tìm affected users |
| 5 | Nếu feature này **lỗi** → ảnh hưởng **business** gì? | Đánh giá priority |

**Ví dụ Impact Analysis:**

```
Feature: Thêm "Mã giới thiệu" (Referral Code) khi đăng ký

Modules bị ảnh hưởng:
├── Registration flow (obviously)
├── User profile (hiển thị mã của mình)
├── Reward system (người giới thiệu được thưởng)
├── Notification (email/push cho người được thưởng)
├── Admin panel (quản lý referral program)
├── Reports (referral conversion rate)
├── Payment (nếu thưởng bằng tiền)
└── Fraud detection (spam referral codes?)

→ Bạn thấy không? Một feature "đơn giản" ảnh hưởng 8+ modules.
   QA bình thường chỉ test Registration. QA Big Picture test cả 8.
```

::: tip Aha Moment
Khi nhận một feature mới, hãy **vẽ ra giấy** (hoặc trong đầu) các modules bị ảnh hưởng. Chỉ 5 phút brainstorm sẽ giúp bạn tìm thêm 2-3x test cases mà requirement không đề cập. Đây là kỹ năng phân biệt Senior QA với Junior QA.
:::

---

## Rèn Luyện Mindset Hàng Ngày — 15 Phút/Ngày

Mindset không phải đọc xong là có. Nó như **cơ bắp** — cần tập mỗi ngày.

### Routine 15 phút mỗi ngày:

```
Phút 1-5: ĐỌC
  → Đọc 2-3 bug reports của team (Jira)
  → Hỏi: "Tại sao mình không tìm được bug này?"
  → Hỏi: "Bug này thuộc pillar nào?" (User? Hacker? Detail? Big Picture?)

Phút 6-10: QUAN SÁT
  → Mở 1 app bạn dùng hàng ngày (banking, shopping, social media)
  → Tìm 3 điểm có thể cải thiện (UX, performance, accessibility)
  → Nghĩ: "Nếu mình test app này, mình sẽ tìm bug gì?"

Phút 11-15: HỌC
  → Đọc 1 bài ngắn về testing (Ministry of Testing, dev.to, Medium)
  → Hoặc: Xem 1 case study về production bug (nổi tiếng)
  → Ghi chú 1 điều mới học được
```

### Khi nhận requirement mới — Thinking Checklist:

```
□ User nào sẽ dùng? (Persona — ai, bao nhiêu tuổi, tech level?)
□ Happy path là gì? (Con đường "lý tưởng")
□ Unhappy paths nào có thể xảy ra? (Sai input, timeout, error)
□ Edge cases: empty, null, max, min, special chars, emoji?
□ Modules nào liên quan? (Impact analysis — hiệu ứng domino)
□ Security concerns? (Auth, data access, injection)
□ Performance concerns? (Slow load, large data, concurrent users)
□ Accessibility concerns? (Screen reader, keyboard navigation, color contrast)
□ Requirement nào chưa rõ → CẦN HỎI LẠI NGAY?
```

### Sau khi tìm 1 bug — Đừng dừng lại:

```
Bug = Đầu mối, không phải đích đến.

1. Bug ở chỗ này → chỗ TƯƠNG TỰ có bị không?
   (Bug ở trang Product → check trang Category, trang Search)

2. Bug với data này → DATA KHÁC thì sao?
   (Bug với giá 0đ → check giá âm, giá max, giá decimal)

3. Bug trên Chrome → BROWSER KHÁC thì sao?
   (Chrome OK, Firefox broken → rendering bug)

4. Bug ở UI → API LEVEL cũng bị không?
   (UI hiện giá sai → check API response → có thể API đúng, UI parse sai)

5. Bug này có thể bị KHAI THÁC (security)?
   (Thấy data người khác → chắc chắn là security vulnerability)
```

---

## Sai Lầm Mindset Thường Gặp

| Sai lầm | Tại sao nguy hiểm | Mindset đúng |
|---|---|---|
| "Chỉ test happy path" | Happy path chỉ chiếm 30% scenarios. 70% bugs nằm ở negative + edge cases | Luôn test negative, boundary, edge cases |
| "Dev nói OK là OK" | Dev biased vì họ viết code. Họ test theo logic của mình | Trust but verify — LUÔN retest |
| "Không phải bug, là feature" | Che đậy quality issues, tích lũy technical debt | Report objectively, để PM quyết định |
| "Test xong rồi, không cần test lại" | Regression bugs — fix A hỏng B | Regression test mỗi release. Automate nếu có thể |
| "Chỉ test cái được assign" | Bỏ sót integration bugs ở "ranh giới" giữa features | Exploratory testing + impact analysis |
| "Tool sẽ tìm hết bugs" | Tool chỉ tìm bugs mà bạn **bảo nó tìm** | Tool hỗ trợ, mindset quyết định |
| "Bugs nhiều = QA giỏi" | Quantity không bằng quality. 1 critical bug > 10 cosmetic bugs | Focus vào severity và business impact |
| "Requirement là tất cả" | Requirement luôn thiếu sót | Requirement là starting point, không phải finish line |

---

## Tóm tắt — 5 Pillars Cheat Sheet

| Pillar | Core Question | Real-world Check |
|---|---|---|
| **User Thinking** | "Bà ngoại có hiểu nút này không?" | Thử dùng app với mắt của người mới |
| **Hacker Thinking** | "Đổi URL, sửa request — xem có gì xảy ra?" | Luôn thử phá trước khi confirm pass |
| **Question Everything** | "Spec nói X — nhưng NOT X thì sao?" | Không assume — luôn verify |
| **Attention to Detail** | "F12 có error gì không?" | Mở DevTools LUÔN khi test |
| **Big Picture** | "Fix chỗ này → domino effect ở đâu?" | Vẽ impact map trước khi test |

::: tip Aha Moment cuối cùng
5 pillars này không phải checklist để follow một cách máy móc. Chúng là **lens** — 5 cặp kính khác nhau để nhìn cùng một feature. Mỗi lần bạn "đổi kính", bạn sẽ thấy bugs mà cặp kính trước không thấy. QA xuất sắc là người **liên tục đổi kính** — User → Hacker → Questioner → Detective → Architect — cho đến khi không còn gì ẩn.
:::
