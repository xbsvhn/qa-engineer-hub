# Agile & Scrum cho QA

## Tại sao cần học Agile? (WHY)

Khoảng **80% dự án phần mềm** hiện nay sử dụng Agile. Nếu bạn đi phỏng vấn QA, gần như chắc chắn sẽ được hỏi:
- "Bạn đã làm việc trong Agile/Scrum chưa?"
- "QA trong Sprint làm những gì?"
- "Definition of Done là gì?"

Không hiểu Agile = không hiểu cách team vận hành.

---

## Agile là gì? (WHAT)

### Agile Manifesto (2001)

Agile không phải framework hay tool — nó là **tập hợp giá trị và nguyên tắc** về cách phát triển phần mềm:

| Coi trọng hơn (trái) | | Thay vì (phải) |
|---|---|---|
| **Individuals and interactions** | hơn | Processes and tools |
| **Working software** | hơn | Comprehensive documentation |
| **Customer collaboration** | hơn | Contract negotiation |
| **Responding to change** | hơn | Following a plan |

**Giải thích đơn giản:**
- Con người quan trọng hơn quy trình
- Phần mềm chạy được quan trọng hơn tài liệu dày cộp
- Hợp tác với khách hàng quan trọng hơn hợp đồng cứng nhắc
- Thích ứng thay đổi quan trọng hơn bám theo kế hoạch

### Agile vs Waterfall

| Tiêu chí | Waterfall | Agile |
|---|---|---|
| **Delivery** | Cuối dự án (vài tháng) | Mỗi Sprint (2-4 tuần) |
| **Requirement** | Fix từ đầu | Thay đổi liên tục |
| **Testing** | Cuối project | Mỗi Sprint |
| **Feedback** | Muộn | Sớm, liên tục |
| **Risk** | Phát hiện muộn | Phát hiện sớm |
| **Team** | Chuyên biệt (Dev team, QA team) | Cross-functional (Dev + QA + BA cùng team) |

---

## Scrum Framework

Scrum là framework Agile **phổ biến nhất**. Hiểu Scrum = hiểu cách ~70% dự án Agile vận hành.

### Scrum Team

```
┌──────────────────────────────────────────┐
│              Scrum Team (5-9 người)      │
│                                          │
│  👤 Product Owner (PO)                   │
│     └── Quyết định build cái gì         │
│     └── Quản lý Product Backlog         │
│     └── Ưu tiên features               │
│                                          │
│  👤 Scrum Master (SM)                    │
│     └── Đảm bảo team follow Scrum       │
│     └── Remove blockers                 │
│     └── Facilitate meetings             │
│                                          │
│  👥 Development Team (Dev + QA + Design) │
│     └── Build & test product            │
│     └── Self-organizing                 │
│     └── Cross-functional                │
└──────────────────────────────────────────┘
```

**QA nằm trong Development Team** — không phải team riêng. QA là một phần integral của team, tham gia mọi hoạt động.

### Sprint

Sprint là chu kỳ phát triển cố định, thường **2 tuần** (có team dùng 1 hoặc 3 tuần).

```
Sprint 2 tuần (10 working days):
╔═══════════════════════════════════════════════════════════╗
║ Day 1    │ Day 2-3  │ Day 4-7    │ Day 8-9  │ Day 10    ║
║ Sprint   │ Dev bắt  │ Dev + QA   │ Bug fix  │ Sprint    ║
║ Planning │ đầu code │ test song  │ Retest   │ Review +  ║
║          │ QA viết  │ song       │ Regress  │ Retro     ║
║          │ test case│            │          │           ║
╚═══════════════════════════════════════════════════════════╝
```

### Scrum Events (Ceremonies)

#### 1. Sprint Planning — "Sprint này làm gì?"

| | Chi tiết |
|---|---|
| **Khi** | Đầu Sprint |
| **Thời lượng** | 2-4 giờ |
| **Ai tham gia** | Cả Scrum Team |
| **Output** | Sprint Backlog (danh sách items sẽ làm) |

**QA trong Sprint Planning:**
- Đặt câu hỏi về User Story: "AC có đủ chi tiết chưa?"
- Ước lượng effort test: "Story này cần 2 ngày test"
- Identify test dependencies: "Cần test data X, environment Y"
- Đóng góp vào estimation (story points)

#### 2. Daily Standup — "Hôm nay làm gì?"

| | Chi tiết |
|---|---|
| **Khi** | Mỗi ngày, cùng giờ |
| **Thời lượng** | 15 phút (max!) |
| **Format** | 3 câu hỏi |

**QA trong Daily Standup:**

```
"Yesterday: Completed testing for User Story #123 - Login feature.
            Found 2 bugs (JIRA-456, JIRA-457).

 Today:     Will start testing User Story #124 - Profile page.
            Need to retest bug JIRA-450 (fixed yesterday).

 Blocker:   Staging environment is down since 9am.
            Need DevOps to look at it."
```

::: warning Tips
- Ngắn gọn, đúng 3 câu. Không biến standup thành meeting thảo luận
- Nếu cần discuss chi tiết → "Let's take this offline"
- Focus vào **blockers** — điều gì đang chặn bạn?
:::

#### 3. Sprint Review (Demo) — "Sprint này đã làm được gì?"

| | Chi tiết |
|---|---|
| **Khi** | Cuối Sprint |
| **Thời lượng** | 1-2 giờ |
| **Ai tham gia** | Scrum Team + Stakeholders |
| **Mục đích** | Demo working software, thu thập feedback |

**QA trong Sprint Review:**
- Hỗ trợ demo (prepare test accounts, data)
- Chia sẻ test metrics: pass rate, bugs found
- Highlight bất kỳ risk nào chưa resolve

#### 4. Sprint Retrospective — "Làm sao tốt hơn?"

| | Chi tiết |
|---|---|
| **Khi** | Cuối Sprint (sau Review) |
| **Thời lượng** | 1-1.5 giờ |
| **Format** | What went well? / What to improve? / Action items |

**QA nên chia sẻ:**
- "Test environment không ổn định → đề xuất monitoring"
- "Requirements thiếu edge cases → đề xuất QA review story trước Sprint"
- "Automation coverage tăng 15% → tiết kiệm 2 ngày regression"

---

## Scrum Artifacts

### 1. Product Backlog

**Là gì:** Danh sách **tất cả** tính năng, bug, improvement cần làm cho sản phẩm. PO quản lý và ưu tiên.

**Ví dụ:**

| Priority | Item | Type | Story Points |
|---|---|---|---|
| 1 | Login with Google | Feature | 5 |
| 2 | Fix: Cart total sai khi apply coupon | Bug | 3 |
| 3 | Improve search performance | Improvement | 8 |
| 4 | Add product reviews | Feature | 13 |

### 2. Sprint Backlog

**Là gì:** Subset của Product Backlog — chỉ những items **team commit** sẽ hoàn thành trong Sprint này.

### 3. Increment

**Là gì:** Phần mềm **working** (đã test, đã đạt DoD) được deliver cuối mỗi Sprint.

---

## User Story và Acceptance Criteria

### User Story Format

```
As a [type of user],
I want [some goal],
So that [some reason].
```

**Ví dụ:**

```
As a customer,
I want to filter products by price range,
So that I can quickly find products within my budget.
```

### Acceptance Criteria (AC)

AC là **điều kiện cần đạt** để User Story được coi là hoàn thành. **QA dùng AC để viết test case.**

**Ví dụ AC cho story trên:**

```
Given I am on the Products page
When I set price filter min=100K and max=500K
Then only products with price 100K-500K are displayed
And the product count is updated
And "Clear filter" button is shown

Given I set an invalid range (min > max)
When I click Apply
Then show error "Min price must be less than max price"
```

::: tip
QA nên **tham gia viết AC** cùng PO và Dev. QA thường phát hiện edge cases mà PO không nghĩ đến.
:::

---

## Definition of Done (DoD) và Definition of Ready (DoR)

### Definition of Ready (DoR) — "Story có sẵn sàng để bắt đầu?"

Checklist trước khi bắt đầu code:
- [ ] User Story rõ ràng, không mơ hồ
- [ ] Acceptance Criteria đầy đủ
- [ ] UI/UX design có sẵn (nếu cần)
- [ ] Dependencies đã identify
- [ ] Story đã estimate (story points)
- [ ] QA đã review và không có câu hỏi

### Definition of Done (DoD) — "Story đã hoàn thành chưa?"

Checklist để confirm story DONE:
- [ ] Code completed và pushed
- [ ] Code reviewed (approved)
- [ ] Unit tests pass (coverage ≥ 80%)
- [ ] QA tested (manual + automation)
- [ ] All AC verified
- [ ] No open Critical/Major bugs
- [ ] Documentation updated (nếu cần)
- [ ] Deployed to staging successfully

::: warning Quan trọng
Story chưa đạt DoD = **Story chưa Done**. Không có "Done nhưng chưa test" hay "Done nhưng còn 1 bug". Done là Done.
:::

---

## QA Workflow trong Sprint

### Timeline chi tiết (Sprint 2 tuần)

```
TRƯỚC SPRINT:
  • Review upcoming stories trong Backlog Refinement
  • Hỏi clarification, đề xuất edge cases
  • Tham gia Sprint Planning, estimate test effort

TRONG SPRINT:
  Day 1-2: Viết test cases cho stories trong Sprint
           Setup test data, prepare automation scripts

  Day 3-5: Dev hoàn thành stories → QA bắt đầu test
           Execute manual test cases
           Log bugs vào Jira

  Day 6-7: Retest bug fixes
           Run automation tests
           Exploratory testing

  Day 8-9: Regression testing (automation + manual critical paths)
           Final sanity check
           Update test results, prepare metrics

  Day 10:  Sprint Review (demo support)
           Sprint Retro (chia sẻ observations)

SAU SPRINT:
  • Update regression test suite
  • Cải thiện automation coverage
  • Document lessons learned
```

### Collaboration trong team

```
PO viết User Story
    ↓
QA + PO + Dev refine AC (Three Amigos)
    ↓
Dev codes + Unit Test
    ↓ (song song)
QA viết Test Cases + Automation Scripts
    ↓
Dev done → QA test
    ↓
Bug found → Dev fix → QA retest
    ↓
All AC passed + DoD met → Story DONE
```

**Three Amigos** (Ba người bạn): Meeting ngắn giữa PO, Dev, QA để review User Story trước khi code. Đây là practice **rất hiệu quả** để đảm bảo cả 3 hiểu cùng 1 thứ.

---

## Kanban — Alternative cho Scrum

Ngoài Scrum, **Kanban** là Agile framework phổ biến thứ 2:

| | Scrum | Kanban |
|---|---|---|
| **Cadence** | Sprint cố định (2 tuần) | Continuous flow |
| **Roles** | PO, SM, Dev Team | Không bắt buộc roles |
| **Board** | Sprint Board (reset mỗi sprint) | Kanban Board (continuous) |
| **WIP Limit** | Sprint capacity | WIP limit per column |
| **Planning** | Sprint Planning | Continuous prioritization |

**Kanban Board:**

```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Backlog  │  To Do   │  In Dev  │ In QA    │   Done   │
│          │          │ (WIP: 3) │ (WIP: 2) │          │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│ Story #7 │ Story #5 │ Story #3 │ Story #1 │ Story #0 │
│ Story #8 │ Story #6 │ Story #4 │ Story #2 │          │
│ Story #9 │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

**WIP (Work in Progress) Limit:** Giới hạn số items đang làm cùng lúc. Nếu "In QA" limit = 2, dev không được push thêm cho QA khi QA đang test 2 items. Giúp tránh overload QA.

---

## Câu hỏi phỏng vấn thường gặp

| Câu hỏi | Key points trong câu trả lời |
|---|---|
| "QA làm gì trong Sprint?" | Test stories, log bugs, retest, regression, tham gia ceremonies |
| "DoD vs DoR?" | DoR = ready to start, DoD = done done |
| "Khi nào QA bắt đầu test?" | Ngay khi dev push, KHÔNG đợi cuối Sprint |
| "Nếu cuối Sprint còn bug?" | Bug carry over sang Sprint tiếp, story chưa Done |
| "Regression test khi nào?" | Cuối Sprint, trước release. Automation rất quan trọng |

---

## Tóm tắt chương

| Concept | Điểm cốt lõi |
|---|---|
| **Agile** | Iterative, feedback nhanh, embrace change |
| **Scrum** | Sprint 2 tuần, 4 ceremonies, 3 artifacts |
| **QA Role** | Là phần của Dev Team, tham gia mọi activities |
| **User Story + AC** | AC là cơ sở để viết test case |
| **DoR / DoD** | Checklist để start/finish story |
| **Three Amigos** | PO + Dev + QA review story cùng nhau |
