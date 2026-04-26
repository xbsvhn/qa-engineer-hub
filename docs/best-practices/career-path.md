# Career Path — Từ Junior Đến QA Architect

## Career QA trông như thế nào?

**Bản chất (Essence):** Nhiều người nghĩ QA chỉ có một con đường: test mãi → chán → chuyển nghề. Sai hoàn toàn. QA có **cây career đa nhánh** — giống như một game RPG: bạn chọn class, level up, và specialize theo hướng phù hợp với mình.

**Analogy (Ví dụ đời thực):** Nghĩ về career QA như một cái cây. Gốc cây (Junior → Senior) ai cũng phải đi qua. Nhưng đến nhánh, bạn có nhiều hướng: nhánh kỹ thuật (SDET, Architect), nhánh quản lý (Lead, Manager), nhánh chuyên sâu (Performance, Security). Mỗi nhánh dẫn đến đỉnh khác nhau — không nhánh nào "tốt hơn" nhánh nào.

### Bản đồ Career:

```
                          ┌── QA Manager ──── Director of QA
                          │    (quản lý người)
                          │
Junior QA ── QA Engineer ── Senior QA ──┤
 (0-2 năm)   (2-4 năm)    (4-7 năm)    ├── QA Lead / Tech Lead
                                        │    (dẫn dắt kỹ thuật + người)
                                        │
                                        ├── SDET (Dev Engineer in Test)
                                        │    (70% coding, 30% testing)
                                        │
                                        ├── QA Architect
                                        │    (thiết kế hệ thống test)
                                        │
                                        └── Chuyên gia:
                                             Performance Engineer
                                             Security Engineer
                                             DevOps Engineer (chuyển ngành)
```

::: tip Aha Moment
Không có career path "đúng" hay "sai". Có người thích code → SDET. Có người thích quản lý → Lead/Manager. Có người thích đi sâu kỹ thuật → Architect. **Quan trọng là bạn biết mình muốn gì — và plan để đến đó.**
:::

---

## Skills Theo Từng Level — Chi Tiết

### Junior QA (0-2 năm) — "Xây Móng Nhà"

**Bản chất:** Junior giống như thợ xây đang xây móng. Không glamorous, nhưng **móng yếu thì nhà đổ**. Giai đoạn này bạn cần: làm đúng, làm đủ, làm consistently.

| Category | Skills cần có | Mức độ |
|---|---|---|
| **Testing** | Test case design, Bug reporting, STLC, Test types | Solid |
| **Tools** | Jira, Postman (basic), Browser DevTools | Daily use |
| **Technical** | SQL cơ bản (SELECT, JOIN, WHERE), API concepts | Hiểu được |
| **Soft skills** | Communication, Attention to detail, Time management | Developing |
| **Mindset** | Learn fast, Ask questions, Be proactive | Essential |

**Mục tiêu hàng ngày:**
- Viết test cases rõ ràng → Dev đọc hiểu không cần hỏi lại
- Report bugs đầy đủ: steps, actual, expected, evidence → Dev reproduce được ngay
- Tham gia Sprint ceremonies → đóng góp ý kiến (dù nhỏ)
- Hỏi "Tại sao?" ít nhất 3 lần/ngày

**Salary range (Việt Nam 2024-2025):**

| Loại công ty | Khoảng lương/tháng |
|---|---|
| Outsource nhỏ | 8-12 triệu |
| Outsource lớn (FPT, KMS, NAB) | 10-15 triệu |
| Product company (startup) | 10-18 triệu |
| Product company (lớn/foreign) | 12-20 triệu |

---

### QA Engineer (2-4 năm) — "Bắt Đầu Dùng Điện"

**Bản chất:** Từ xây bằng tay (manual) sang dùng máy (automation). Bạn không chỉ test — bạn bắt đầu **nghĩ về strategy**, viết automation, và mentor junior.

| Category | Skills cần có | Mức độ |
|---|---|---|
| **Automation** | Playwright/Cypress, Page Object Model, CI/CD basic | Hands-on |
| **API Testing** | Postman advanced, API automation, REST concepts | Proficient |
| **Technical** | JavaScript/TypeScript, SQL intermediate, Git workflow | Working knowledge |
| **Testing** | Test strategy thinking, Risk-based testing, Exploratory | Applied |
| **Soft skills** | Mentor juniors, Cross-team communication, Estimation | Growing |

**Mục tiêu:**
- Build và maintain automation test suite (50+ test cases)
- API testing proficient — manual lẫn automation
- Contribute vào test strategy decisions (không chỉ execute)
- Mentor 1-2 junior QAs
- Bắt đầu estimate effort testing chính xác

**Salary range (Việt Nam 2024-2025):**

| Loại công ty | Khoảng lương/tháng |
|---|---|
| Outsource nhỏ-trung | 15-22 triệu |
| Outsource lớn | 18-30 triệu |
| Product company (startup) | 18-32 triệu |
| Product company (lớn/foreign) | 22-40 triệu |

---

### Senior QA (4-7 năm) — "Kiến Trúc Sư Chất Lượng"

**Bản chất:** Senior không phải "QA Engineer lâu năm". Senior là người **nhìn thấy bức tranh toàn cảnh**, đưa ra quyết định architecture, và influence cả team. Giống như từ thợ xây thành kiến trúc sư — bạn không đặt gạch nữa, bạn **thiết kế tòa nhà**.

| Category | Skills cần có | Mức độ |
|---|---|---|
| **Architecture** | Automation framework design, Tool selection & evaluation | Ownership |
| **Strategy** | Test strategy cho full product, Risk assessment & mitigation | Leading |
| **Technical** | Performance testing, Security basics, Docker/K8s, Cloud (AWS/GCP) | Practical |
| **Leadership** | Lead testing cho project/team, Process improvement | Driving |
| **Soft skills** | Stakeholder management, Presenting to leadership, Mentoring team | Advanced |

**Mục tiêu:**
- Design automation framework từ scratch
- Own test strategy cho product/team — không ai phải chỉ
- Lead quality initiatives, improve processes
- Influence team decisions (tool, process, standards)
- Present quality reports cho management/stakeholders

**Salary range (Việt Nam 2024-2025):**

| Loại công ty | Khoảng lương/tháng |
|---|---|
| Outsource lớn | 25-40 triệu |
| Product company | 30-50 triệu |
| Product company (foreign/big tech) | 40-65 triệu |
| Remote (company nước ngoài) | 50-100+ triệu |

---

### Specialized Paths — Sau Senior

#### SDET (Software Development Engineer in Test)

**SDET là gì?** SDET là **developer chuyên viết code cho testing**. Không phải QA biết code — mà là **developer hiểu testing sâu**.

```
SDET vs QA Engineer:
- SDET: 70% coding, 30% testing → Build tools, frameworks, infrastructure
- QA:   30% coding, 70% testing → Design tests, execute, analyze

SDET thường làm gì:
- Build automation frameworks from scratch
- Develop test infrastructure (CI/CD pipelines, test environments)
- Write internal tools (test data generators, mock servers, report dashboards)
- Review production code (không chỉ test code)
- Performance engineering, chaos testing
```

**Salary (VN):** 30-55 triệu/tháng | Remote: 60-120+ triệu

#### QA Lead / QA Manager

```
QA Lead (Technical + People):
- Manage 3-8 QA engineers
- Sprint/Release planning cho QA team
- Quality metrics, reporting, dashboards
- Hiring, training, performance reviews
- Process improvement, tool standardization

QA Manager (People + Strategy):
- Manage multiple teams/projects
- Budget planning (tools, training, hiring)
- Organization-level quality strategy
- Stakeholder management (C-level reporting)
- Build QA culture across organization
```

**Salary (VN):** 35-60 triệu/tháng | Remote: 50-100+ triệu

#### QA Architect

```
QA Architect (Visionary):
- Define testing architecture cho toàn organization
- Tool selection, evaluation, và standardization across teams
- Cross-team automation strategy
- Performance/Security testing strategy
- Evaluate và adopt new technologies (AI testing, etc.)
- Set quality standards và best practices
```

**Salary (VN):** 40-70 triệu/tháng | Remote: 70-150+ triệu

---

## Lộ Trình Học Tập Thực Tế — 12 Tháng Đầu

### Tháng 1-3: Fundamentals — "Học đi trước khi học chạy"

```
Tuần 1-2: Testing Fundamentals
  ├── ISTQB concepts (test levels, test types, test techniques)
  ├── STLC (Software Testing Life Cycle)
  └── Hiểu Agile/Scrum cơ bản

Tuần 3-4: Test Case Design
  ├── Equivalence Partitioning, Boundary Value Analysis
  ├── Decision Table, State Transition
  └── Practice: Viết 50 test cases cho 1 feature thực tế

Tuần 5-8: Bug Reporting + Tools
  ├── Bug lifecycle: New → Open → Fixed → Retest → Closed
  ├── Jira workflow (create, assign, transition, filter)
  ├── Browser DevTools (Console, Network, Elements)
  └── Practice: Log 20 bugs cho 1 website thực tế

Tuần 9-12: SQL + API Basics
  ├── SQL: SELECT, WHERE, JOIN, GROUP BY
  ├── Postman: GET, POST, PUT, DELETE
  ├── API concepts: REST, status codes, headers, auth
  └── Practice: Test 10 API endpoints bằng Postman
```

### Tháng 4-6: Tools + API Deep Dive — "Dùng thành thạo vũ khí"

```
Tuần 1-4: Postman Advanced
  ├── Collections, Environments, Variables
  ├── Pre-request scripts, Tests
  ├── Newman (CLI runner)
  └── Practice: Complete API test suite cho 1 project

Tuần 5-8: SQL Intermediate + Developer Skills
  ├── SQL: Subqueries, Indexes, Transactions
  ├── Git basics: clone, branch, commit, push, pull, merge
  ├── Command line basics
  └── Practice: Query production-like database để verify test results

Tuần 9-12: JavaScript Fundamentals
  ├── Variables, functions, arrays, objects
  ├── Async/await, promises
  ├── Node.js basics
  └── Practice: Write 10 small scripts (file processing, API calls)
```

### Tháng 7-12: Automation — "Từ tay sang máy"

```
Tuần 1-4: Playwright Basics
  ├── Setup, first test, locators, assertions
  ├── Page Object Model pattern
  ├── Test configuration, fixtures
  └── Practice: Automate login + 5 core flows

Tuần 5-8: Playwright Advanced + CI/CD
  ├── API testing with Playwright
  ├── Visual testing, mobile emulation
  ├── GitHub Actions: run tests on every PR
  └── Practice: Full automation suite (20+ tests) with CI

Tuần 9-12: Portfolio Project
  ├── Complete automation project on GitHub
  ├── README with setup instructions, test reports
  ├── CI/CD pipeline với test results dashboard
  └── Practice: Present project — chuẩn bị cho interview
```

::: tip Aha Moment
12 tháng này là **minimum viable roadmap**. Bạn không cần master hết — chỉ cần **đủ để làm việc được** rồi tiếp tục học on-the-job. 80% skills thực tế bạn sẽ học từ project thật, không phải từ course.
:::

---

## Certifications — ISTQB: Đánh Giá Thật Lòng

### ISTQB Foundation Level

| Aspect | Đánh giá thật |
|---|---|
| **Kiến thức** | Tốt. Cho bạn vocabulary và framework tư duy chung. Biết terms như "equivalence partitioning", "boundary value" → nói chuyện với team professional hơn. |
| **Resume** | Có giá trị, đặc biệt khi bạn < 2 năm kinh nghiệm. Nhiều công ty outsource **yêu cầu** ISTQB. Product companies thường **không care** lắm. |
| **Thực tế** | Kiến thức trong ISTQB khá **lý thuyết**. Bạn sẽ không dùng 100% trong công việc hàng ngày. Nhưng nó cho bạn nền tảng tốt. |
| **Chi phí** | ~$250 USD (thi) + $0-100 (tự học/mua sách). ROI tốt nếu đang tìm job. |
| **Recommend** | Nên thi trong 1-2 năm đầu. Học 2-3 tuần, thi 1 lần là đỗ. |

### Các Certifications khác

| Cert | Khi nào nên thi | Giá trị thực tế |
|---|---|---|
| **ISTQB Advanced (Test Manager)** | 3+ năm, muốn lên Lead/Manager | Nặng lý thuyết nhưng structured. Useful cho outsource companies. |
| **ISTQB Advanced (Test Automation)** | 3+ năm, focus automation | Khá outdated so với industry practice. Optional. |
| **AWS/Azure Cloud Cert** | Khi project dùng cloud | Giá trị cao nếu bạn test cloud-native apps. Cross-functional skill. |
| **Certified Scrum Master (CSM)** | Muốn hiểu Agile sâu hơn | Giá trị cho communication + process improvement. Nice to have. |

**Quan điểm thẳng thắn:**
- Certification **giúp mở cửa** (lọt qua HR filter) nhưng **không giúp bạn giỏi hơn**
- 1 automation project trên GitHub **có giá trị hơn** 3 certificates trong interview
- Nếu phải chọn: **project portfolio > certification > khóa học**
- Exception: Outsource companies (FPT, KMS, TMA...) thường yêu cầu ISTQB → nên thi

---

## Câu Hỏi Phỏng Vấn Theo Level

### Junior — "Bạn hiểu nền tảng không?"

| Câu hỏi | Expected Answer Depth |
|---|---|
| "Viết test cases cho Login?" | 10-15 TCs: positive (valid credentials), negative (wrong password, empty fields, SQL injection, locked account), boundary (max length), UX (remember me, forgot password link) |
| "Bug lifecycle là gì?" | New → Assigned → Open → Fixed → Retest → Closed/Reopened. Giải thích mỗi stage + ai responsible. Bonus: Deferred, Duplicate, Not a Bug |
| "Smoke test vs Sanity test?" | Smoke = rộng-nông (test nhiều features, mỗi cái 1 chút — "nhà có cháy không?"). Sanity = hẹp-sâu (test 1 feature cụ thể kỹ — "cái này hoạt động đúng chưa?"). Cho ví dụ thực tế. |
| "Severity vs Priority?" | Severity = mức độ nghiêm trọng kỹ thuật. Priority = mức độ cần fix theo business. Ví dụ: Logo sai trên trang chủ = Low severity, High priority (ảnh hưởng brand) |
| "Bạn test gì cho 1 ô search?" | Functional (tìm đúng, sai, empty, special chars), UI (placeholder, clear button, auto-suggest), Performance (response time), Security (XSS, SQL injection), Usability (keyboard Enter, mobile) |

### Mid-level — "Bạn nghĩ như thế nào?"

| Câu hỏi | Expected Answer Depth |
|---|---|
| "Design test strategy cho feature X?" | Phân tích risks → Chọn test approach (manual vs auto) → Define scope → Prioritize (critical paths first) → Resource planning → Entry/Exit criteria. Không chỉ liệt kê TCs — mà giải thích WHY. |
| "Khi nào automate, khi nào manual?" | ROI analysis: automate khi stable + repeated + high-risk. Manual khi: exploratory, one-time, UI changing frequently. Decision matrix + real examples từ project cũ. |
| "Giải thích POM pattern?" | Page Object Model: mỗi page = 1 class. Tách locators + actions khỏi tests. Benefits: maintainable, reusable, readable. Bonus: vẽ diagram, cho code example. |
| "Bạn handle flaky test thế nào?" | Root causes: timing issues, test data dependencies, environment instability. Strategies: explicit waits (không hard-code sleep), independent test data, retry mechanism, quarantine flaky tests. Show experience thực. |

### Senior — "Bạn lead và quyết định thế nào?"

| Câu hỏi | Expected Answer Depth |
|---|---|
| "Build automation framework từ đầu?" | Architecture decisions: language choice (why TS not Java?), framework (why Playwright?), patterns (POM, fixtures, custom reporters), CI/CD integration, parallel execution, reporting strategy, maintenance plan. Discuss tradeoffs. |
| "Improve quality process cho team?" | Current state analysis (metrics: defect leakage, automation coverage, cycle time) → Identify gaps → Propose improvements (shift-left, automation roadmap, code review for tests) → Measure impact → Iterate. Show metrics-driven approach. |
| "Bạn track quality metrics nào?" | Test coverage (requirement + code), Pass rate (per sprint), Defect leakage rate (escaped bugs), Automation ROI, Mean time to detect/fix, Flaky test rate. **Quan trọng: giải thích mỗi metric NÓI LÊN ĐIỀU GÌ về quality.** |
| "Xây dựng team QA 5 người?" | Hiring criteria, onboarding plan, skills matrix, mentoring program, knowledge sharing (weekly sessions), tool standardization, career growth plan cho mỗi member. Show leadership thinking. |

---

## Portfolio Building — GitHub Profile Là CV Tốt Nhất

### Cấu trúc GitHub Portfolio lý tưởng:

```
github.com/your-name/
├── playwright-automation-project/     ← Main showcase
│   ├── tests/
│   │   ├── e2e/        (10+ end-to-end tests)
│   │   ├── api/        (10+ API tests)
│   │   └── visual/     (visual regression tests)
│   ├── pages/           (Page Object Model)
│   ├── fixtures/        (test data, custom fixtures)
│   ├── .github/workflows/  (CI/CD pipeline)
│   ├── playwright.config.ts
│   ├── package.json
│   └── README.md        (setup, run, results, architecture diagram)
│
├── api-test-collection/               ← API testing skills
│   ├── postman-collections/
│   ├── automated-api-tests/
│   └── README.md
│
├── performance-tests/                 ← Bonus: shows depth
│   ├── k6-scripts/
│   └── README.md
│
└── qa-learning-notes/                 ← Shows continuous learning
    ├── test-strategy-templates/
    ├── bug-report-templates/
    └── cheat-sheets/
```

### Tips cho GitHub Profile:

```
1. README.md chất lượng cao:
   - Mô tả project rõ ràng
   - Setup instructions (ai clone về cũng chạy được)
   - Screenshot/GIF of test running
   - Architecture diagram
   - Test results/reports link

2. CI/CD pipeline chạy được:
   - GitHub Actions badge (green ✅) trên README
   - Tests chạy tự động mỗi push
   - Test report published (GitHub Pages hoặc Allure)

3. Code quality:
   - Consistent naming conventions
   - Comments giải thích WHY (không phải WHAT)
   - Clean folder structure
   - No hardcoded values → use config/env

4. Activity:
   - Commit regularly (ít nhất 3-4 lần/tuần)
   - Green contribution graph → shows consistency
   - Star/Fork projects liên quan → shows interest
```

::: tip Aha Moment
Interviewer ấn tượng bởi **real working projects** hơn bất kỳ certificate nào. Khi bạn mở GitHub và show: "Đây là automation framework mình build, CI/CD chạy tự động, 95% pass rate, code coverage 80%" — bạn đã thắng 80% cuộc phỏng vấn. **Show, don't tell.**
:::

---

## Lời Kết — Sự Thật Về Career QA

```
Career QA không có đường tắt.

Không có "3 tháng thành Senior".
Không có "học 1 tool là đủ".
Không có "certification thay kinh nghiệm".

Nhưng nếu bạn:
  ✅ Học đều mỗi ngày (15-30 phút — consistency > intensity)
  ✅ Practice trên project thực tế (không chỉ xem tutorial)
  ✅ Build portfolio trên GitHub (show, don't tell)
  ✅ Rèn mindset + communication (đọc lại 2 bài trước)
  ✅ Tham gia community (hỏi, chia sẻ, network)

→ Bạn sẽ tiến nhanh hơn 90% người khác.

Knowledge base này là bước đầu tiên.
Bước tiếp theo là CỦA BẠN — hãy biến kiến thức thành hành động.
```

::: tip Aha Moment cuối cùng
Đừng so sánh mình với người khác. So sánh mình hôm nay với mình tuần trước. Nếu tuần này bạn biết thêm 1 SQL query, viết thêm 1 automation test, hoặc hiểu thêm 1 concept — bạn đang đi đúng đường. **Progress > Perfection.**
:::
