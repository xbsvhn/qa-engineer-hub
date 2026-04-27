# Communication Skills — Nói Sao Cho Đúng

## Communication là gì trong QA? Tại sao quan trọng?

**Bản chất (Essence):** QA là **người phiên dịch** giữa nhiều thế giới: Dev nói ngôn ngữ code, PM nói ngôn ngữ business, User nói ngôn ngữ cảm xúc. Bạn phải **dịch** giữa tất cả — chính xác, không mất thông tin, không gây hiểu lầm.

**Analogy (Ví dụ đời thực):** Hãy tưởng tượng bạn là phiên dịch viên tại tòa án. Bên nguyên nói tiếng Anh, bên bị nói tiếng Việt, thẩm phán nói tiếng Pháp. Nếu bạn dịch sai một từ — người vô tội có thể bị kết tội. Trong QA, nếu bạn mô tả bug sai — dev fix sai chỗ, PM đánh sai priority, release bị delay.

> Kỹ năng #1 phân biệt Senior QA với Junior QA không phải technical skills — mà là **communication skills**. Bạn có thể tìm được 100 bugs, nhưng nếu không truyền đạt được rõ ràng — bugs đó vô nghĩa.

::: tip Aha Moment
Communication không phải "nói nhiều". Mà là **nói đúng thứ, đúng người, đúng lúc, đúng cách**. Một message 3 dòng rõ ràng có giá trị hơn một email 3 trang mà không ai đọc.
:::

---

## Giao Tiếp Với Developer — "Report Facts, Not Blame"

**Bản chất (Essence):** Dev không phải kẻ thù. Dev và QA cùng một team, cùng mục tiêu: ship sản phẩm chất lượng. Khi bạn tìm thấy bug, đó không phải "dev sai" — đó là "team phát hiện sớm trước khi user gặp phải". **Tone quyết định tất cả.**

**Analogy:** Bạn đi khám bệnh. Bác sĩ nói: "Bạn có vấn đề ở gan, cần điều trị sớm" — bạn cảm ơn. Nhưng nếu bác sĩ nói: "Gan bạn tệ quá, sao để thế này?" — bạn sẽ defensive. Cùng thông tin, khác cách nói → phản ứng hoàn toàn khác.

### Before / After — Cách nói tạo nên sự khác biệt:

**Tình huống 1: Report bug**
```
❌ BEFORE (Blame tone):
"Dev code sai rồi, bug này rõ ràng mà. Login toàn lỗi."

✅ AFTER (Fact-based):
"Khi thực hiện step 1-2-3, actual result là X, expected là Y.
Đây là screenshot và console log. Reproduce 100% trên Chrome 120."
```

**Tình huống 2: Feature có nhiều bugs**
```
❌ BEFORE:
"Feature này toàn bug, code gì vậy? Phải rework hết."

✅ AFTER:
"Mình tìm thấy 5 issues ở feature Payment. Đã log trong Jira:
- 2 Critical (block checkout flow)
- 2 Major (data hiển thị sai)
- 1 Minor (UI alignment)
Recommend ưu tiên PAY-101 và PAY-102 vì block user checkout."
```

**Tình huống 3: Bug cũ chưa fix**
```
❌ BEFORE:
"Bug này mình report từ sprint trước mà chưa fix. Coi thường QA quá."

✅ AFTER:
"BUG-100 vẫn open từ Sprint 14, hiện đang block testing cho Story #50.
Bạn có thể ước lượng khi nào fix được không? Nếu cần thêm info,
mình sẵn sàng pair debug."
```

### Khi Dev nói "Not a Bug" / "Works as Designed"

Đây là tình huống **hay xảy ra nhất** và cũng gây conflict nhiều nhất.

```
Bước 1: LẮNG NGHE — có thể mình hiểu sai requirement
  → "Mình hiểu. Bạn có thể giải thích logic ở đây không?"

Bước 2: NÊU EVIDENCE — nếu vẫn không đồng ý
  → "Mình hiểu perspective của bạn. Tuy nhiên, từ góc nhìn user,
     hành vi này gây confuse vì [lý do cụ thể + screenshot]."

Bước 3: ESCALATE — nếu không resolve được
  → "Chúng ta hỏi PO để có final decision nhé?
     Mình sẽ tóm tắt 2 viewpoints trong Jira comment."

Bước 4: DOCUMENT — ghi decision vào Jira
  → "Decision: PO confirm đây là expected behavior. Documented."

Bước 5: MOVE ON — KHÔNG giữ trong lòng, KHÔNG passive-aggressive
```

### Khi cần Dev fix urgent bug

```
Template (Slack/Teams):
"Hi [tên], BUG-200 (Checkout crash) đang block release testing.

Impact: 100% users không thể checkout trên production.
Steps: [link Jira với đầy đủ steps + screenshot + logs]
Severity: Critical — recommend P1.

Mình có thể help reproduce hoặc pair debug lúc [giờ cụ thể].
Bạn có thể check hôm nay không?"

Key: Impact rõ ràng + Info đầy đủ + Offer help + Không blame
```

::: tip Aha Moment
Mỗi khi viết message cho Dev, hãy đọc lại và tự hỏi: **"Nếu mình là dev nhận message này, mình sẽ cảm thấy thế nào?"**. Nếu câu trả lời là "bị tấn công" — viết lại. Nếu là "à, có bug cần fix, mình biết cách reproduce" — gửi đi.
:::

---

## Giao Tiếp Với PM/PO — "Nói Ngôn Ngữ Business"

**Bản chất (Essence):** PM không care API trả 500 hay 422. PM care **bao nhiêu users bị ảnh hưởng**, **mất bao nhiêu tiền**, **có kịp release không**. Khi nói với PM, hãy **dịch từ technical sang business impact**.

**Analogy:** Bạn đưa xe đi sửa. Thợ máy nói: "Bugi cylinder 3 bị mòn 0.2mm, compression ratio giảm 15%". Bạn không hiểu. Nhưng nếu thợ nói: "Xe tốn xăng hơn 20%, đi được 6 tháng nữa thì sẽ chết máy giữa đường" — bạn hiểu ngay và quyết định sửa. PM cũng vậy — nói **hậu quả**, không nói **kỹ thuật**.

### Dịch Technical → Business:

| Bạn tìm thấy (Technical) | Nói với PM (Business Impact) |
|---|---|
| "API /orders trả 500 khi payload có null" | "Customers không thể đặt hàng nếu bỏ trống Thành phố. Ảnh hưởng: tất cả orders mới" |
| "Memory leak trên trang Search" | "Trang Search chậm dần, sau 5 phút user phải refresh. UX kém → user bỏ đi" |
| "Race condition khi 2 users apply cùng coupon" | "Coupon giới hạn 100 có thể bị dùng 200 lần → mất tiền" |
| "XSS vulnerability ở search box" | "Hacker có thể đánh cắp thông tin đăng nhập của customers" |
| "Test coverage chỉ 40%" | "60% code chưa được test → rủi ro cao khi release, có thể bug trên production" |

### Report Testing Status — Cụ thể, có con số:

```
❌ BAD (Vague — PM không biết phải làm gì):
"Test đang OK, còn vài bugs. Chắc tuần sau xong."

✅ GOOD (Specific — PM có đủ thông tin để quyết định):
"Sprint 15 Testing Status (Day 7/10):

Progress:
- Executed: 120/150 test cases (80%)
- Pass: 108 (90%) | Fail: 12 (10%)
- Blocked: 30 test cases (chờ API deployment)

Critical Issues:
1. BUG-200: Checkout crash — Dev đang fix, ETA hôm nay
2. BUG-201: Sai tax calculation — Đang investigate

Risk Assessment:
- HIGH: Nếu BUG-200 không fix trước thứ 5 → delay release 2 ngày
- MEDIUM: 30 blocked TCs phụ thuộc vào DevOps deploy staging

Recommendation:
- Ưu tiên fix BUG-200 trước thứ 5
- BUG-201 có workaround (admin adjust manually)
- Nếu BUG-200 fix xong → GO for release thứ 6"
```

::: tip Aha Moment
PM cần 3 thứ: **Số liệu** (bao nhiêu?), **Rủi ro** (chuyện gì sẽ xảy ra?), và **Đề xuất** (nên làm gì?). Mỗi khi report cho PM, hãy đảm bảo message có đủ 3 thứ đó. Không có recommendation = bạn đang đẩy decision cho PM mà không giúp gì.
:::

---

## Daily Standup — Nói Đúng Format, Đúng Lượng

**Bản chất (Essence):** Standup là **status sync**, không phải meeting thảo luận. Mục tiêu: mọi người biết bạn đang làm gì, cần gì, bị block gì — trong **2 phút** max.

**Analogy:** Standup giống như bảng tin sân bay: "Flight VN123: On time", "Flight VN456: Delayed 30 min — gate changed". Ngắn, rõ, actionable. Không ai muốn nghe phi công giải thích 10 phút về lý do delay.

### Format chuẩn: Yesterday → Today → Blockers

**GOOD Example:**
```
"Yesterday:
- Completed testing Story #45 (Login redesign) — 15/15 TCs pass, 0 bugs
- Logged BUG-185 (Profile avatar crop issue) — Major severity

Today:
- Start testing Story #46 (Profile page) — estimate 20 TCs
- Retest BUG-180 (fix deployed to staging sáng nay)

Blocker:
- Staging database bị reset đêm qua → cần re-setup test data
  → @DevOps-Minh có thể restore backup hôm nay không?"
```

**BAD Example:**
```
"Hôm qua tôi test login, có mấy cái bug, rồi tôi test tiếp cái profile
nhưng staging bị lỗi gì đó nên tôi chuyển sang test cái khác, rồi...
hôm nay tiếp tục test, có gì sẽ báo sau..."
```

Tại sao BAD?
- Không có specifics (test case nào? bao nhiêu?)
- Không có ticket numbers (BUG-xxx, Story #xx)
- "Có gì sẽ báo sau" = không có plan rõ ràng
- Không nêu blocker cụ thể → team không biết cần help gì

### Pro Tips cho Standup:

```
1. CHUẨN BỊ trước 2 phút (mở Jira, note 3 bullets)
2. NÓI SỐ: "15/15 TCs" thay vì "test xong"
3. NÊU TICKET: "BUG-185" thay vì "có bug"
4. BLOCKER = cần action: tag người cần giải quyết
5. CHI TIẾT thảo luận → "offline sau standup với @tên"
```

---

## Escalation Framework — "Facts → Impact → Options → Let PM Decide"

**Bản chất (Essence):** Escalation không phải "méc" hay "kiện cáo". Escalation là **đưa thông tin lên đúng người có quyền quyết định**, khi vấn đề vượt quá quyền hạn của bạn.

**Analogy:** Bạn là nhân viên bảo vệ. Thấy khói → bạn có thể dùng bình chữa cháy. Thấy cháy lớn → bạn PHẢI gọi 114. Không ai trách bạn gọi 114 — họ trách bạn nếu bạn KHÔNG gọi. Escalation trong QA cũng vậy.

### Khi nào Escalate?

```
✅ Nên escalate:
- Critical bug chưa fix, gần deadline (< 2 ngày)
- Test environment down > 1 ngày, không ai fix
- Requirement conflict giữa PM và Dev, QA bị kẹt giữa
- Quality concern nghiêm trọng trước release
- Resource thiếu → không thể hoàn thành test plan

❌ KHÔNG nên escalate:
- Bug bình thường, Dev đang fix đúng timeline
- Disagreement nhỏ có thể tự resolve
- Vấn đề cá nhân (đi trễ, không cooperate) → talk 1-1 trước
```

### Template Escalation:

```
Hi [PM/Lead],

SITUATION: [Mô tả vấn đề — facts only, không cảm xúc]
"BUG-200 (Checkout crash) vẫn chưa fix. Deadline release: thứ 6."

IMPACT: [Business impact cụ thể]
"Nếu không fix → release delay ít nhất 3 ngày.
Ảnh hưởng: campaign Black Friday bắt đầu thứ 7."

OPTIONS:
(A) Delay release đến thứ 3 tuần sau → fix xong + full regression
    Pro: Chất lượng đảm bảo. Con: Miss Black Friday.
(B) Release without fix + hotfix thứ 7
    Pro: Kịp Black Friday. Con: Users gặp crash, cần on-call support.
(C) Release with workaround (disable coupon feature tạm)
    Pro: Kịp timeline, không crash. Con: Mất revenue từ coupons.

RECOMMENDATION: Option C — vì giữ timeline + minimize risk.
Coupon revenue ước tính 5% GMV, nhỏ hơn risk delay campaign.

Bạn quyết định, mình sẽ plan testing theo.
```

::: tip Aha Moment
Khi escalate, **LUÔN đề xuất giải pháp**. Đến gặp PM chỉ với "Có vấn đề!" = bạn đang tạo thêm vấn đề. Đến với "Có vấn đề. Đây là 3 options. Mình recommend option B vì..." = bạn đang **giải quyết** vấn đề. Đó là cách Senior QA operate.
:::

---

## Conflict Resolution — 5 Bước: Listen → Facts → Escalate → Document → Move On

**Bản chất (Essence):** Conflict trong team là **bình thường và không thể tránh**. QA và Dev sẽ luôn có lúc bất đồng: "Đây là bug" vs "Đây là feature". Conflict resolution không phải "ai thắng ai thua" — mà là **tìm ra sự thật và quyết định tốt nhất cho sản phẩm**.

**Analogy:** Hai người nhìn cùng một bức tượng — người đứng trước thấy mặt, người đứng sau thấy lưng. Cả hai đều đúng từ góc nhìn của mình. Conflict resolution là **đi vòng quanh bức tượng** để thấy toàn bộ.

### 5 Bước xử lý conflict:

**Bước 1: LISTEN — Nghe thật sự, không phải chờ đến lượt nói**
```
- Để dev giải thích xong hoàn toàn
- Không ngắt lời, không chuẩn bị phản bác trong đầu
- Hỏi clarifying questions: "Ý bạn là...?"
- Có thể bạn hiểu sai requirement — lắng nghe trước
```

**Bước 2: FACTS — Đưa ra bằng chứng, không phải ý kiến**
```
❌ "Mình nghĩ đây là bug" (ý kiến)
✅ "Requirement section 3.2 nói: 'Price phải include VAT'.
   Hiện tại price KHÔNG include VAT. Screenshot đây." (fact)

❌ "User sẽ bị confused" (ý kiến)
✅ "Mình test với 3 users thật, cả 3 đều click sai nút.
   Đây là recording." (fact)
```

**Bước 3: ESCALATE — Nếu không resolve trong 10 phút**
```
"Mình hiểu point của bạn, bạn cũng hiểu point của mình.
Chúng ta có 2 interpretation khác nhau.
Để hỏi PO/PM cho final decision nhé?"

→ KHÔNG tranh cãi kéo dài. 10 phút là max.
→ Kéo dài = waste time + tạo friction.
```

**Bước 4: DOCUMENT — Ghi decision vào Jira/Confluence**
```
Jira comment:
"Discussion between QA (Linh) and Dev (Minh) on 2025-01-15:
- QA perspective: [tóm tắt]
- Dev perspective: [tóm tắt]
- PO decision: [quyết định cuối cùng]
- Action: [ai làm gì]"

→ Tại sao document quan trọng?
→ Vì 3 tháng sau ai đó sẽ hỏi "Tại sao làm thế này?"
→ Có document = trả lời được. Không có = cãi lại từ đầu.
```

**Bước 5: MOVE ON — Chuyên nghiệp là ở đây**
```
- Decision đã có → follow nó, dù bạn không đồng ý
- KHÔNG passive-aggressive ("Thấy chưa, mình nói rồi mà")
- KHÔNG giữ trong lòng → ảnh hưởng collaboration sau này
- Coffee break sau conflict → reset relationship
- Nhớ: Disagree about bugs, not about people
```

### Key Phrases cho mọi tình huống:

```
Khi không đồng ý:
→ "Mình hiểu perspective của bạn. Từ góc nhìn user thì..."
→ "Cả hai viewpoints đều có lý. Để hỏi PO nhé?"

Khi cần thêm thông tin:
→ "Để mình check lại requirement và confirm..."
→ "Mình sẽ reproduce lại với data cụ thể và update Jira."

Khi đã có decision:
→ "OK, mình sẽ update Jira theo decision này."
→ "Cảm ơn bạn giải thích. Mình hiểu rõ hơn rồi."

Khi dev đúng (bạn sai):
→ "Ồ, bạn đúng rồi. Mình hiểu sai requirement phần này.
   Cảm ơn bạn point out. Mình sẽ close bug này."
→ Nói "mình sai" KHÔNG xấu hổ. Nó thể hiện professionalism.
```

::: tip Aha Moment
QA giỏi nhất không phải người **luôn đúng**. Mà là người **luôn tìm ra sự thật** — dù sự thật đó là mình sai. Khi bạn sẵn sàng nói "Mình sai, cảm ơn bạn chỉ ra" — bạn earn respect từ toàn team. Và lần sau khi bạn nói "Đây là bug" — dev sẽ tin bạn hơn.
:::

---

## Góc nhìn đa chiều — Communication Styles

### Direct vs Indirect Feedback

**Western companies (Mỹ, Châu Âu):** Feedback trực tiếp, thẳng thắn. "This feature has a bug, here's the evidence." Dev appreciate sự rõ ràng, không cần vòng vo.

**Asian companies (Việt Nam, Nhật, Hàn):** Feedback gián tiếp hơn, giữ "face" cho đồng nghiệp. "Mình test thấy kết quả hơi khác expected, mình có thể hiểu sai — bạn check giúp nhé?" Cùng message, nhưng tone mềm hơn.

**Cả hai đều hiệu quả trong context của mình.** Khi làm việc cross-culture (công ty đa quốc gia), hãy **quan sát team culture trước**, rồi adjust. Sai tone trong culture khác = message đúng nhưng người nghe không tiếp nhận.

### Async (Slack/Email) vs Sync (Meeting/Call)

**Async-first teams:** Mọi thứ qua Slack/Jira comments. Ưu điểm: có written record, mọi người đọc khi rảnh, timezone-friendly. Nhược điểm: chậm khi cần quyết định gấp, dễ hiểu nhầm tone.

**Sync-first teams:** Ưu tiên họp nhanh 5-10 phút, rồi document lại. Ưu điểm: resolve nhanh, ít hiểu nhầm vì nghe giọng nói. Nhược điểm: phụ thuộc availability, không có record nếu quên document.

**Best practice:** Dùng **async cho updates + documentation**, dùng **sync cho conflict resolution + urgent issues**. Bug report → Jira (async). Bug cần fix gấp → Slack ping + quick call (sync). Biết khi nào dùng kênh nào = communication skill quan trọng.

---

## Tóm Tắt — Communication Cheat Sheet

| Audience | Nguyên tắc chính | Key Action |
|---|---|---|
| **Developer** | Report facts, not blame | Cung cấp evidence + steps + offer help |
| **PM/PO** | Nói ngôn ngữ business | Số liệu + Impact + Recommendation |
| **Standup** | Yesterday → Today → Blockers | 2 phút max, có ticket numbers + con số |
| **Escalation** | Facts → Impact → Options | LUÔN đề xuất solution, để PM decide |
| **Conflict** | Listen → Facts → Escalate → Document → Move On | 10 phút max tranh cãi, sau đó escalate |
