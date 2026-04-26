# SDLC & STLC

## SDLC là gì? (Software Development Life Cycle)

SDLC là **quy trình** mà một phần mềm đi qua từ ý tưởng ban đầu đến khi được triển khai và bảo trì. Hiểu SDLC giúp QA biết **mình đang ở đâu** trong dự án và **cần làm gì** ở mỗi giai đoạn.

### Tại sao QA cần hiểu SDLC? (WHY)

- Biết **khi nào** nên bắt đầu test (spoiler: càng sớm càng tốt)
- Hiểu **ai** tạo ra cái gì ở mỗi phase → biết cần review artifact nào
- Giao tiếp hiệu quả với Dev, BA, PM bằng **ngôn ngữ chung**
- Đề xuất **test strategy** phù hợp với mô hình dự án đang dùng

---

## Các giai đoạn SDLC

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ 1. Requirement│──►│ 2. Planning │──►│  3. Design  │
│   Analysis   │   │             │   │             │
└─────────────┘   └─────────────┘   └─────────────┘
                                           │
┌─────────────┐   ┌─────────────┐   ┌──────▼──────┐
│7. Maintenance│◄──│6. Deployment│◄──│4. Development│
│              │   │             │   │             │
└─────────────┘   └─────────────┘   └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │ 5. Testing  │
                                    └─────────────┘
```

### Chi tiết từng giai đoạn

#### 1. Requirement Analysis — "Cần làm gì?"

| | Chi tiết |
|---|---|
| **Input** | Business needs, stakeholder interviews |
| **Output** | SRS (Software Requirement Specification), User Stories |
| **Ai làm** | BA (Business Analyst), Product Owner |
| **QA làm gì** | Review requirements, hỏi câu hỏi, identify gaps và ambiguity |

**QA nên hỏi gì ở phase này:**
- "User story này thiếu acceptance criteria"
- "Nếu user nhập sai password 5 lần thì sao? Requirement không nói"
- "Requirement A mâu thuẫn với requirement B"
- "Edge case: nếu giỏ hàng có 0 sản phẩm thì nút Checkout hiện không?"

::: tip Shift-left Testing
Đây chính là **Shift-left Testing** — đưa testing/thinking về bên trái (sớm hơn) trong timeline. QA tham gia từ đây có thể phát hiện 30-50% defects trước khi viết dòng code nào.
:::

#### 2. Planning — "Làm như thế nào? Bao lâu?"

| | Chi tiết |
|---|---|
| **Input** | Requirements, resources, constraints |
| **Output** | Project Plan, timeline, resource allocation |
| **Ai làm** | PM, Tech Lead |
| **QA làm gì** | Ước lượng effort test, đề xuất test strategy, xác định test environment cần |

#### 3. Design — "Kiến trúc hệ thống"

| | Chi tiết |
|---|---|
| **Input** | Requirements |
| **Output** | System Architecture, Database Design, API Design, UI/UX Wireframes |
| **Ai làm** | Architect, Designer, Tech Lead |
| **QA làm gì** | Review design, hiểu architecture để plan integration testing, review UI/UX |

#### 4. Development — "Viết code"

| | Chi tiết |
|---|---|
| **Input** | Design documents |
| **Output** | Source code, Unit tests |
| **Ai làm** | Developers |
| **QA làm gì** | Viết test cases, chuẩn bị test data, setup test environment, viết automation scripts |

**Quan trọng:** QA **không đợi** dev code xong mới bắt đầu. Trong lúc dev code, QA song song chuẩn bị mọi thứ cần thiết.

#### 5. Testing — "Kiểm tra chất lượng"

| | Chi tiết |
|---|---|
| **Input** | Build, test cases, test data |
| **Output** | Bug reports, Test reports, Metrics |
| **Ai làm** | QA Team |
| **QA làm gì** | Execute test cases, report bugs, retest fixes, regression testing |

#### 6. Deployment — "Đưa lên production"

| | Chi tiết |
|---|---|
| **Input** | Tested build, deployment plan |
| **Output** | Live system |
| **Ai làm** | DevOps, Ops team |
| **QA làm gì** | Smoke test trên production, verify critical flows, monitor |

#### 7. Maintenance — "Vận hành và cải tiến"

| | Chi tiết |
|---|---|
| **Input** | User feedback, bug reports, change requests |
| **Output** | Patches, updates, new versions |
| **Ai làm** | Cả team |
| **QA làm gì** | Test hotfixes, regression test sau mỗi patch, maintenance testing |

---

## Các mô hình SDLC phổ biến

### 1. Waterfall — Mô hình thác nước

```
Requirement ──► Design ──► Development ──► Testing ──► Deployment
    (tuần tự, không quay lại)
```

| | |
|---|---|
| **Đặc điểm** | Tuần tự, hoàn thành phase này mới sang phase tiếp |
| **Ưu điểm** | Đơn giản, dễ quản lý, documentation đầy đủ |
| **Nhược điểm** | Không linh hoạt, bug phát hiện muộn, chi phí thay đổi cao |
| **Phù hợp** | Dự án nhỏ, requirement rõ ràng và ổn định |
| **QA Challenge** | Test ở cuối → áp lực thời gian lớn, phát hiện bug muộn |

### 2. V-Model — Mô hình chữ V

```
Requirement Analysis ─────────────────────── Acceptance Testing
    │                                              ▲
    ▼                                              │
  System Design ───────────────────── System Testing
      │                                      ▲
      ▼                                      │
    Architecture Design ──────── Integration Testing
        │                              ▲
        ▼                              │
      Coding ──────────────── Unit Testing
```

| | |
|---|---|
| **Đặc điểm** | Mỗi phase development có phase testing tương ứng |
| **Ưu điểm** | Test planning bắt đầu sớm, rõ ràng level nào test gì |
| **Nhược điểm** | Vẫn tuần tự, không linh hoạt |
| **Phù hợp** | Dự án yêu cầu chất lượng cao (y tế, quân sự, tài chính) |
| **QA Role** | Rất rõ ràng, QA tham gia từ đầu, mỗi level có test plan riêng |

### 3. Agile — Phát triển linh hoạt

```
Sprint 1        Sprint 2        Sprint 3
┌──────────┐   ┌──────────┐   ┌──────────┐
│Plan→Build│   │Plan→Build│   │Plan→Build│
│→Test→Demo│   │→Test→Demo│   │→Test→Demo│
└──────────┘   └──────────┘   └──────────┘
  2-4 weeks      2-4 weeks      2-4 weeks
  ─────────────────────────────────────────►
              Incremental delivery
```

| | |
|---|---|
| **Đặc điểm** | Iterative, chia nhỏ thành Sprint 2-4 tuần |
| **Ưu điểm** | Linh hoạt, feedback nhanh, deliver value sớm |
| **Nhược điểm** | Cần team có kinh nghiệm, documentation ít hơn |
| **Phù hợp** | ~80% dự án hiện đại, đặc biệt product development |
| **QA Role** | QA tham gia mọi Sprint, test liên tục, automation rất quan trọng |

::: info Thực tế
Phần lớn dự án hiện nay dùng **Agile** (cụ thể là Scrum hoặc Kanban). Chi tiết về Agile/Scrum sẽ được trình bày ở bài [Agile & Scrum cho QA](./agile-scrum).
:::

### So sánh tổng quan

| Tiêu chí | Waterfall | V-Model | Agile |
|---|---|---|---|
| **Flexibility** | Thấp | Thấp | Cao |
| **Customer feedback** | Cuối dự án | Cuối dự án | Mỗi sprint |
| **Testing bắt đầu** | Sau development | Song song planning | Mọi sprint |
| **Documentation** | Rất nhiều | Nhiều | Vừa đủ |
| **Risk** | Phát hiện muộn | Tốt hơn Waterfall | Phát hiện sớm |
| **Team size** | Mọi size | Mọi size | Team nhỏ-vừa |

---

## STLC — Software Testing Life Cycle

STLC là quy trình testing **nằm trong** SDLC, mô tả các bước QA cần thực hiện từ đầu đến cuối.

### Các giai đoạn STLC

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ 1. Requirement│──►│ 2. Test      │──►│ 3. Test Case │
│    Analysis   │   │    Planning  │   │  Development │
└──────────────┘   └──────────────┘   └──────┬───────┘
                                              │
┌──────────────┐   ┌──────────────┐   ┌───────▼──────┐
│ 6. Test Cycle│◄──│ 5. Test      │◄──│ 4. Environment│
│    Closure   │   │   Execution  │   │    Setup     │
└──────────────┘   └──────────────┘   └──────────────┘
```

### Chi tiết từng phase

#### Phase 1: Requirement Analysis

**Mục đích:** Hiểu requirement để xác định **cần test gì**.

**QA deliverables:**
- Requirement Traceability Matrix (RTM) — mapping requirement ↔ test case
- Danh sách câu hỏi/clarification cần gửi BA

**Ví dụ thực tế:**

Requirement: *"User can login with email and password"*

QA phân tích:
- Login bằng email valid → expected: success
- Login bằng email invalid → expected: error message gì?
- Password sai → cho phép sai bao nhiêu lần? Có lock account không?
- "Remember me" checkbox có không?
- Social login (Google, Facebook) có trong scope không?
- Forgot password flow?

#### Phase 2: Test Planning

**Mục đích:** Xác định **test như thế nào**, nguồn lực, timeline.

**QA deliverables:**
- Test Plan document
- Test Strategy
- Effort estimation

**Chi tiết:** Xem bài [Test Plan & Strategy](/manual-testing/test-plan).

#### Phase 3: Test Case Development

**Mục đích:** Viết test case cụ thể, chuẩn bị test data.

**QA deliverables:**
- Test Cases
- Test Data
- Automation scripts (nếu có)

**Chi tiết:** Xem bài [Test Case Design](/manual-testing/test-case-design).

#### Phase 4: Environment Setup

**Mục đích:** Chuẩn bị **môi trường** để chạy test.

**Thường bao gồm:**
- Test server (staging environment)
- Test database (có test data)
- Browsers/devices cần test
- Automation tool setup
- Access permissions

**Thực tế:** Nhiều dự án dùng Docker để setup test environment nhanh chóng và consistent.

#### Phase 5: Test Execution

**Mục đích:** **Chạy test** và report kết quả.

**Activities:**
1. Execute test cases (manual hoặc automation)
2. So sánh actual vs expected result
3. Nếu fail → log bug với đầy đủ thông tin
4. Retest bugs đã fix
5. Regression testing
6. Update test result status

**Bug report:** Xem chi tiết ở bài [Bug Reporting](/manual-testing/bug-reporting).

#### Phase 6: Test Cycle Closure

**Mục đích:** Đánh giá và **tổng kết** kết quả testing.

**QA deliverables:**
- Test Summary Report
- Defect metrics (found, fixed, open, deferred)
- Test coverage metrics
- Lessons learned

**Metrics thường report:**

| Metric | Ý nghĩa | Ví dụ |
|---|---|---|
| **Pass rate** | % test case pass | 95% (285/300) |
| **Defect density** | Bugs per module | Payment: 15 bugs, Profile: 3 bugs |
| **Defect leakage** | Bugs found in prod | 2 bugs leaked to prod |
| **Test coverage** | % requirements covered | 100% requirements, 85% code coverage |

---

## Entry & Exit Criteria

Entry và Exit Criteria giúp trả lời: **"Đã đủ điều kiện để bắt đầu/kết thúc chưa?"**

### Entry Criteria — Điều kiện để BẮT ĐẦU test

| Criteria | Tại sao cần |
|---|---|
| Requirements đã review và approved | Không test được nếu không biết test cái gì |
| Test plan đã approved | Cần biết test strategy |
| Build deploy thành công trên test env | Cần có build để test |
| Test data sẵn sàng | Cần data để execute test |
| Smoke test pass | Build phải stable ở mức cơ bản |

### Exit Criteria — Điều kiện để KẾT THÚC test

| Criteria | Ví dụ threshold |
|---|---|
| Tất cả test case đã executed | 100% executed |
| Pass rate đạt ngưỡng | ≥ 95% pass |
| Không còn Critical/Blocker bug | 0 open critical bugs |
| Bug fix rate | ≥ 90% bugs fixed |
| Test summary report done | Report approved by PM |

::: warning Thực tế
Trong Agile, Entry/Exit Criteria thường được thay bằng **Definition of Ready** (DoR) và **Definition of Done** (DoD) ở mức User Story. Xem chi tiết ở bài [Agile & Scrum cho QA](./agile-scrum).
:::

---

## SDLC vs STLC — Mối quan hệ

```
SDLC:  Requirement → Design → Development → Testing → Deployment
                                                │
STLC:  ┌────────────────────────────────────────┤
       │  Req Analysis → Test Planning → TC Development
       │  → Env Setup → Test Execution → Closure
       └─────────────────────────────────────────
```

**Điểm mấu chốt:** STLC **không chỉ chạy trong phase Testing** của SDLC. Req Analysis và Test Planning của STLC nên bắt đầu **song song** với Requirement và Design của SDLC.

---

## Tóm tắt chương

| Concept | Điểm cốt lõi |
|---|---|
| **SDLC** | 7 phases, QA tham gia mọi phase, không chỉ phase Testing |
| **Waterfall** | Tuần tự, test cuối → rủi ro cao |
| **V-Model** | Test planning song song development → tốt hơn Waterfall |
| **Agile** | Iterative, test mỗi sprint → phổ biến nhất hiện nay |
| **STLC** | 6 phases riêng cho testing, bắt đầu từ Requirement Analysis |
| **Entry/Exit** | "Checklist" để quyết định bắt đầu/kết thúc test |
