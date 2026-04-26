# Career Path

## QA Career Landscape

Ngành QA có **nhiều hướng phát triển**, không chỉ "test mãi". Hiểu rõ career path giúp bạn **plan learning** đúng hướng và **negotiate salary** tốt hơn.

```
                        ┌── QA Manager ──── Director of QA
                        │
Junior QA ── QA Engineer ── Senior QA ──┤
                                        ├── QA Lead / Tech Lead
                                        │
                                        ├── SDET (Software Dev Engineer in Test)
                                        │
                                        ├── QA Architect
                                        │
                                        └── Performance Engineer
                                             Security Engineer
                                             DevOps Engineer (chuyển ngành)
```

---

## Skills theo Level

### Junior QA (0-2 năm) — Xây nền tảng

**Focus:** Làm đúng, làm đủ

| Category | Skills cần có |
|---|---|
| **Testing** | Test case design, bug reporting, STLC, test types |
| **Tools** | Jira, Postman, Browser DevTools |
| **Technical** | Basic SQL, basic API testing |
| **Soft skills** | Communication, attention to detail |
| **Mindset** | Learn fast, ask questions, be proactive |

**Mục tiêu hàng ngày:**
- Viết test cases rõ ràng, execute independently
- Report bugs đầy đủ thông tin, dev không cần hỏi lại
- Tham gia Sprint ceremonies, đóng góp ý kiến

**Salary range (VN):** 8-15 triệu/tháng

---

### QA Engineer (2-4 năm) — Bắt đầu Automation

**Focus:** Automation skills + test strategy thinking

| Category | Skills cần có |
|---|---|
| **Automation** | Playwright/Cypress, POM pattern, CI/CD basic |
| **API Testing** | Postman advanced, API automation |
| **Technical** | JavaScript/TypeScript, SQL intermediate, Git |
| **Testing** | Test strategy, risk-based testing, exploratory |
| **Soft skills** | Mentoring juniors, cross-team communication |

**Mục tiêu:**
- Build và maintain automation test suite
- API testing proficient (manual + automation)
- Contribute vào test strategy decisions
- Mentor 1-2 junior QAs

**Salary range (VN):** 15-30 triệu/tháng

---

### Senior QA (4-7 năm) — Technical Leadership

**Focus:** Architecture, strategy, influence

| Category | Skills cần có |
|---|---|
| **Architecture** | Automation framework design, tool selection |
| **Strategy** | Test strategy cho full product, risk assessment |
| **Technical** | Performance testing, security basics, Docker/K8s |
| **Leadership** | Lead testing for project/team, process improvement |
| **Soft skills** | Stakeholder management, presenting to leadership |

**Mục tiêu:**
- Design automation framework từ scratch
- Own test strategy cho product/team
- Lead quality initiatives, improve processes
- Influence team decisions (tool, process, standards)

**Salary range (VN):** 25-45 triệu/tháng

---

### Specialized Paths

#### SDET (Software Development Engineer in Test)

**Focus:** Heavy coding, framework development, infrastructure

```
SDET vs QA Engineer:
- SDET: 70% coding, 30% testing
- QA:   30% coding, 70% testing

SDET thường:
- Build automation frameworks from scratch
- Develop test infrastructure (CI/CD, test environments)
- Write tools cho team (test data generators, mock servers)
- Review production code (không chỉ test code)
```

**Skills:** Strong programming (TypeScript/Python/Java), system design, DevOps

**Salary range (VN):** 30-55 triệu/tháng

#### QA Lead / QA Manager

**Focus:** People management, strategy, process

```
QA Lead:
- Manage 3-8 QA engineers
- Sprint/Release planning
- Quality metrics và reporting
- Hiring, training, performance reviews
- Process improvement

QA Manager:
- Manage multiple teams/projects
- Budget planning
- Organization-level quality strategy
- Stakeholder management (C-level)
```

**Salary range (VN):** 35-60 triệu/tháng

#### QA Architect

**Focus:** Technical vision, enterprise-level testing

```
QA Architect:
- Define testing architecture cho toàn organization
- Tool selection và standardization
- Cross-team automation strategy
- Performance/Security testing strategy
- Evaluate và adopt new technologies
```

**Salary range (VN):** 40-70 triệu/tháng

---

## Lộ trình học tập thực tế

### Năm 1-2: Foundation

```
Tháng 1-3: Testing Fundamentals
  ├── ISTQB concepts
  ├── Test case design techniques
  ├── Bug reporting
  └── Agile/Scrum

Tháng 4-6: Tools & API
  ├── Jira workflow
  ├── Postman
  ├── SQL basics
  └── API testing concepts

Tháng 7-9: Automation Basics
  ├── JavaScript/TypeScript
  ├── Playwright (first tests)
  └── Git basics

Tháng 10-12: Build & Practice
  ├── Page Object Model
  ├── CI/CD basics (GitHub Actions)
  └── Build personal automation project
```

### Năm 3-4: Growth

```
├── Automation framework design
├── API automation (Playwright)
├── Performance testing basics (K6)
├── Docker basics
├── TypeScript advanced
└── Start mentoring juniors
```

### Năm 5+: Specialization

```
Choose your path:
├── SDET → Deep programming, framework dev, infrastructure
├── QA Lead → People management, strategy, process
├── QA Architect → Enterprise testing, tool evaluation
└── Pivot → DevOps, Security, Product Management
```

---

## Certifications (Có cần không?)

| Cert | Giá trị | Recommend |
|---|---|---|
| **ISTQB Foundation** | Kiến thức nền tảng, phổ biến nhất | ✅ Nên có (năm 1-2) |
| **ISTQB Advanced** | Chuyên sâu Test Management / Test Automation | ⚡ Optional (năm 3+) |
| **AWS/Azure Cert** | Cloud testing, DevOps knowledge | ⚡ Nếu work với cloud |
| **CSSLP** | Security testing | ⚡ Nếu focus security |

**Quan điểm thực tế:** Certification **không bắt buộc** nhưng giúp:
- Structure learning (có lộ trình rõ ràng)
- Resume boost (đặc biệt khi ít kinh nghiệm)
- Common language với team
- Một số công ty yêu cầu (đặc biệt outsource)

---

## Tips phát triển Career

### 1. Build Portfolio

```
GitHub profile với:
├── Automation project (Playwright + TypeScript)
├── API test collection
├── Performance test scripts (K6)
└── README rõ ràng, well-documented

Đây là bằng chứng tốt hơn mọi certification.
```

### 2. Learn from Production Bugs

```
Mỗi bug trên production → Hỏi:
- Tại sao QA không tìm được bug này?
- Test case nào thiếu?
- Process nào cần improve?
- Automation có thể catch bug này không?

→ Đây là cách học nhanh nhất từ thực tế.
```

### 3. Stay Updated

```
Resources:
- Ministry of Testing (community)
- Test Automation University (free courses)
- Playwright docs (luôn cập nhật)
- QA subreddits (r/QualityAssurance)
- Tech blogs (các công ty lớn)
```

### 4. Network

```
- Tham gia QA communities (Discord, Slack, Facebook groups)
- Attend meetups / conferences (online hoặc offline)
- Share knowledge (blog, presentation)
- Help others → Build reputation
```

---

## Câu hỏi phỏng vấn theo Level

### Junior

| Câu hỏi | Expect |
|---|---|
| "Test case cho Login?" | 10-15 test cases, positive + negative |
| "Bug lifecycle?" | New → Open → Fixed → Retest → Closed |
| "Smoke vs Sanity?" | Rộng-nông vs Hẹp-sâu |
| "Severity vs Priority?" | Technical vs Business, ví dụ |

### Mid-level

| Câu hỏi | Expect |
|---|---|
| "Design test strategy cho feature X?" | Approach, tools, priorities, risks |
| "Khi nào automate, khi nào manual?" | ROI, stability, frequency, complexity |
| "Explain POM pattern?" | Code example, why use, benefits |
| "How to test API?" | Methods, status codes, auth, tools |

### Senior

| Câu hỏi | Expect |
|---|---|
| "Build automation framework từ đầu?" | Architecture decisions, tradeoffs |
| "Improve test process cho team?" | Metrics, analysis, proposals |
| "Handle flaky tests?" | Root causes, strategies, prevention |
| "Quality metrics bạn track?" | Coverage, pass rate, defect leakage, ROI |

---

## Tóm tắt chương

| Level | Focus | Timeline |
|---|---|---|
| **Junior** | Fundamentals, tools, manual testing | 0-2 năm |
| **QA Engineer** | Automation, API, strategy basics | 2-4 năm |
| **Senior** | Architecture, leadership, specialization | 4-7 năm |
| **SDET/Lead/Architect** | Deep specialization | 7+ năm |

::: tip Lời cuối
Career QA không có đường tắt. Nhưng nếu bạn **học đều mỗi ngày**, **practice trên project thực tế**, và **build portfolio**, bạn sẽ tiến nhanh hơn 90% người khác. Knowledge base này là bước đầu tiên — hãy biến nó thành hành động.
:::
