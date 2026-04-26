# Agile & Scrum cho QA

## Tại sao phải học Agile?

Khoảng **80% dự án phần mềm** hiện nay dùng Agile. Đi phỏng vấn QA, gần như chắc chắn bạn sẽ bị hỏi: "Bạn đã làm trong Agile/Scrum chưa?" Không hiểu Agile = không hiểu cách team vận hành hàng ngày.

---

## Agile là gì — bản chất?

Hãy tưởng tượng 2 cách xây nhà:

**Cách 1 (Waterfall):** Vẽ bản thiết kế hoàn chỉnh → xây xong toàn bộ → bàn giao cho chủ nhà. Chủ nhà lúc này mới nói: "Tôi muốn phòng bếp to hơn!" → Đập ra xây lại → tốn tiền, tốn thời gian.

**Cách 2 (Agile):** Xây phòng khách trước → cho chủ nhà xem → chủ nhà góp ý → sửa ngay. Rồi xây phòng bếp → cho xem → góp ý → sửa. Cứ thế cho đến khi xong.

**Agile chính là Cách 2:** Chia dự án thành **nhiều phần nhỏ**, làm từng phần, lấy feedback sớm, điều chỉnh liên tục.

### Agile Manifesto — 4 giá trị cốt lõi

Năm 2001, 17 lập trình viên họp lại và viết ra "Tuyên ngôn Agile" — 4 giá trị nền tảng:

| Coi trọng HƠN (trái) | | Thay vì (phải) |
|---|---|---|
| **Con người & tương tác** | hơn | Quy trình & công cụ |
| **Phần mềm chạy được** | hơn | Tài liệu dày cộp |
| **Hợp tác với khách hàng** | hơn | Hợp đồng cứng nhắc |
| **Thích ứng thay đổi** | hơn | Bám theo kế hoạch |

**Ý nghĩa thực tế:** Không có nghĩa bỏ tài liệu, bỏ kế hoạch. Mà **khi phải chọn**, ưu tiên vế trái hơn vế phải. Ví dụ: phần mềm chạy được quan trọng hơn tài liệu 200 trang mà phần mềm chưa hoạt động.

---

## Scrum là gì — bản chất?

**Scrum** là một "cách chơi" (framework) cụ thể của Agile — giống như Agile là "thể thao", Scrum là "bóng đá". Khoảng 70% team Agile dùng Scrum.

### Scrum Team — Ai làm gì?

| Vai trò | Bản chất | Ví dụ thực tế |
|---|---|---|
| **Product Owner (PO)** | "Chủ nhà" — quyết định xây cái gì, ưu tiên cái gì | "Sprint này làm Login trước, Profile sau" |
| **Scrum Master (SM)** | "Huấn luyện viên" — giúp team chơi đúng luật Scrum, gỡ bỏ chướng ngại | "QA bị block vì env down → SM escalate cho DevOps" |
| **Development Team** | "Đội xây" — bao gồm **Dev + QA + Designer** | Dev code + QA test + Designer review UI |

**Điểm quan trọng:** QA **nằm trong** Development Team, không phải team riêng biệt. QA là 1 phần của team, tham gia mọi hoạt động.

### Sprint — Nhịp tim của Scrum

**Sprint là gì?** Là một **chu kỳ cố định** (thường 2 tuần) để team hoàn thành một phần công việc. Cứ 2 tuần, team deliver một phần phần mềm hoạt động được.

```
Sprint 1 (2 tuần)         Sprint 2 (2 tuần)         Sprint 3...
┌────────────────┐        ┌────────────────┐
│ Plan → Code    │        │ Plan → Code    │
│ → Test → Demo  │   →    │ → Test → Demo  │   →    ...
│ → Feedback     │        │ → Feedback     │
└────────────────┘        └────────────────┘
  Deliver Login             Deliver Cart
```

---

## 4 Ceremonies — 4 cuộc họp trong mỗi Sprint

"Ceremony" nghĩa là **cuộc họp có cấu trúc**. Scrum có đúng 4 cuộc họp, không hơn không kém:

### 1. Sprint Planning — "Sprint này làm gì?"

**Khi nào:** Ngày đầu Sprint
**Bao lâu:** 2-4 giờ
**Bản chất:** Cả team chọn công việc từ Product Backlog (danh sách tất cả việc cần làm) đưa vào Sprint này.

**QA trong Sprint Planning:**
- Hỏi về User Story: "Acceptance Criteria đã rõ chưa?"
- Estimate effort test: "Story này cần 2 ngày test"
- Phát hiện dependency: "Story này cần test data đặc biệt"

### 2. Daily Standup — "Hôm nay làm gì?"

**Khi nào:** Mỗi ngày, cùng giờ
**Bao lâu:** Tối đa **15 phút** — đứng họp (standup = đứng, để meeting ngắn gọn)
**Bản chất:** Mỗi người trả lời 3 câu hỏi:

```
1. Hôm qua tôi làm gì?
2. Hôm nay tôi sẽ làm gì?
3. Có gì đang chặn (block) tôi không?
```

**QA trong Daily Standup — ví dụ:**

```
"Hôm qua: Test xong Story Login — 15/15 test cases pass.
           Tìm được 2 bugs (BUG-100, BUG-101), đã log Jira.

 Hôm nay: Bắt đầu test Story Profile.
           Retest BUG-095 (dev nói đã fix).

 Blocker:  Staging server down từ sáng.
           Cần DevOps check."
```

::: warning Lỗi thường gặp
- Nói quá dài → Meeting kéo 30 phút → Mọi người chán
- Nói quá chung → "Hôm qua test, hôm nay test tiếp" → Không ai biết bạn đang ở đâu
- Biến thành thảo luận → "Tại sao bug này xảy ra?" → Nên nói "discuss offline sau meeting"
:::

### 3. Sprint Review (Demo) — "Đã làm được gì?"

**Khi nào:** Cuối Sprint
**Bao lâu:** 1-2 giờ
**Bản chất:** Demo **phần mềm đang chạy** cho stakeholders xem. Thu thập feedback.

**QA trong Sprint Review:**
- Hỗ trợ demo (chuẩn bị test accounts, data)
- Chia sẻ metrics: "Sprint này 95% pass rate, 12 bugs found, 10 fixed"

### 4. Sprint Retrospective — "Làm sao tốt hơn?"

**Khi nào:** Cuối Sprint (sau Review)
**Bao lâu:** 1-1.5 giờ
**Bản chất:** Team tự nhìn lại: cái gì tốt? cái gì cần cải thiện? hành động gì cho Sprint sau?

```
What went well:
  "Automation save 2 ngày regression testing"

What to improve:
  "Requirements thiếu edge cases → QA nên join refinement sớm hơn"

Action items:
  "QA sẽ tham gia Backlog Refinement từ Sprint tiếp"
```

---

## User Story & Acceptance Criteria

### User Story — Mô tả feature bằng ngôn ngữ người dùng

**Format chuẩn:**
```
As a [loại user],
I want [mục tiêu],
So that [lý do].
```

**Ví dụ:**
```
As a customer,
I want to filter products by price,
So that I can find products within my budget.
```

**Bản chất:** User Story không phải requirement kỹ thuật. Nó mô tả **user muốn gì** và **tại sao** — cách implement là việc của Dev.

### Acceptance Criteria (AC) — QA dùng đây để viết test case

AC là **danh sách điều kiện** mà User Story phải thỏa mãn để được coi là "xong". **QA dùng AC như nguồn chính để viết test case.**

**Ví dụ AC cho story filter sản phẩm:**

```
✅ Khi set filter min=100K, max=500K → chỉ hiện products 100K-500K
✅ Khi set min > max → hiện lỗi "Min phải nhỏ hơn Max"
✅ Khi clear filter → hiện lại tất cả products
✅ Product count cập nhật khi filter
✅ Filter giữ nguyên khi chuyển trang (pagination)
```

Mỗi dòng AC = ít nhất 1 test case. 5 AC = ít nhất 5 test cases.

::: tip QA nên tham gia viết AC
QA thường phát hiện edge cases mà PO không nghĩ đến. Ví dụ: "Nếu filter ra 0 kết quả thì hiện gì?" — PO có thể quên case này.
:::

---

## Definition of Done (DoD) & Definition of Ready (DoR)

### DoR — "Story này sẵn sàng để bắt đầu chưa?"

Trước khi Dev bắt đầu code, kiểm tra:
- ☑ User Story rõ ràng, không mơ hồ
- ☑ Acceptance Criteria đầy đủ
- ☑ UI design sẵn sàng (nếu cần)
- ☑ QA đã review, không còn câu hỏi

Chưa đạt DoR → **không bắt đầu**. Code dựa trên requirement mơ hồ = code sai = lãng phí.

### DoD — "Story này xong chưa?"

Sau khi Dev code xong, kiểm tra:
- ☑ Code completed + pushed
- ☑ Code reviewed (teammate approve)
- ☑ Unit tests pass
- ☑ **QA tested** (manual + automation)
- ☑ **Tất cả AC verified**
- ☑ **0 Critical/Major bugs open**
- ☑ Deploy staging thành công

**Quan trọng:** Chưa đạt DoD = **chưa xong**. Không có chuyện "xong nhưng chưa test" hay "xong nhưng còn 1 bug critical".

---

## QA Workflow thực tế trong Sprint 2 tuần

```
TRƯỚC SPRINT:
  Day 0:   Sprint Planning → biết Sprint này test gì

TRONG SPRINT:
  Day 1-2: Viết test cases cho stories mới
           Chuẩn bị test data
  Day 3-5: Dev push code → QA bắt đầu test
           Log bugs vào Jira
  Day 6-7: Retest bug fixes
           Exploratory testing
  Day 8-9: Regression testing
           Final sanity check
  Day 10:  Sprint Review (demo support)
           Sprint Retro (chia sẻ observations)

SAU SPRINT:
  Cập nhật regression test suite
  Cải thiện automation coverage
```

### Three Amigos — Buổi họp quan trọng nhất

"Three Amigos" = PO + Dev + QA ngồi lại review User Story **trước khi code**.

- **PO** giải thích business value: "User cần filter vì..."
- **Dev** hỏi kỹ thuật: "API filter thế nào?"
- **QA** hỏi edge cases: "Nếu filter ra 0 kết quả?"

15-30 phút cho 1 story → tiết kiệm hàng ngày fix bug sau này.

---

## Tóm tắt

| Concept | Bản chất 1 câu |
|---|---|
| **Agile** | Chia nhỏ, deliver từng phần, feedback sớm, thay đổi linh hoạt |
| **Scrum** | Framework cụ thể của Agile: Sprint 2 tuần + 4 ceremonies |
| **Sprint** | Chu kỳ 2 tuần: plan → code → test → demo → retro |
| **User Story** | Mô tả feature bằng ngôn ngữ user, không phải kỹ thuật |
| **AC** | Điều kiện "xong" — nguồn chính để QA viết test case |
| **DoR/DoD** | Checklist bắt đầu/kết thúc story |
| **Three Amigos** | PO + Dev + QA review story trước khi code — rất hiệu quả |
