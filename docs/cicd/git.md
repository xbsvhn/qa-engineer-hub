# Git & Version Control

## Git là gì? (WHAT)

Git là hệ thống **quản lý phiên bản** (Version Control System) — theo dõi mọi thay đổi trong code. QA cần Git để:

- **Push automation code** lên repository
- **Collaborate** với team trên cùng codebase
- **Review changes** — biết dev thay đổi gì để test đúng chỗ
- **Rollback** — quay lại version trước nếu có lỗi

---

## Concepts cốt lõi

### Repository (Repo)

```
Repository = Thư mục project + Lịch sử thay đổi

Local Repo  ← Trên máy bạn
Remote Repo ← Trên GitHub/GitLab (cloud)
```

### Branch — Nhánh

```
main ──●──●──●──●──●──●──●──●── (production code)
              │              ▲
              │              │ Merge (Pull Request)
              ▼              │
feature/login ●──●──●──●──●─┘  (code mới, tách riêng)
```

**Tại sao cần branch?**
- Mỗi feature/bugfix làm trên **branch riêng**
- Không ảnh hưởng `main` cho đến khi code ready
- Cho phép **code review** trước khi merge

### Branching Strategy phổ biến

```
main          ← Production code (luôn stable)
  │
  ├── develop ← Integration branch
  │     │
  │     ├── feature/login-test    ← QA viết test mới
  │     ├── feature/cart-test     ← QA viết test mới
  │     └── bugfix/flaky-test     ← Fix test bị flaky
  │
  └── release/v2.0 ← Chuẩn bị release
```

---

## Commands thiết yếu cho QA

### Setup & Clone

```bash
# Clone repo về máy (lần đầu)
git clone https://github.com/company/automation-tests.git
cd automation-tests

# Cấu hình tên và email
git config --global user.name "Nguyen Van An"
git config --global user.email "an@company.com"
```

### Daily Workflow

```bash
# 1. Cập nhật code mới nhất từ remote
git pull origin main

# 2. Tạo branch mới cho công việc
git checkout -b feature/add-checkout-tests

# 3. Viết code... (viết test cases, fix tests...)

# 4. Xem thay đổi
git status                    # Files nào thay đổi?
git diff                      # Thay đổi cụ thể gì?

# 5. Stage files
git add tests/checkout.spec.ts    # Add file cụ thể
git add tests/                     # Add cả folder
git add .                          # Add tất cả (cẩn thận!)

# 6. Commit
git commit -m "Add checkout flow e2e tests"

# 7. Push lên remote
git push origin feature/add-checkout-tests

# 8. Tạo Pull Request trên GitHub → Team review → Merge
```

### Các lệnh hữu ích khác

```bash
# Xem lịch sử commits
git log --oneline -10

# Chuyển branch
git checkout main
git checkout feature/login-test

# Xem tất cả branches
git branch -a

# Xóa branch đã merge
git branch -d feature/old-branch

# Lấy changes mới nhất (không merge)
git fetch origin

# Undo thay đổi chưa commit
git checkout -- filename.ts     # 1 file
git stash                       # Tạm cất tất cả changes
git stash pop                   # Lấy lại changes đã cất
```

### Xử lý Merge Conflicts

```bash
# Khi pull/merge bị conflict:
git pull origin main
# CONFLICT in tests/login.spec.ts

# Mở file, tìm markers:
<<<<<<< HEAD
  await page.fill('#email', 'your-code');
=======
  await page.fill('[data-testid="email"]', 'their-code');
>>>>>>> main

# Chọn version đúng, xóa markers, save
  await page.fill('[data-testid="email"]', 'correct-code');

# Stage và commit
git add tests/login.spec.ts
git commit -m "Resolve merge conflict in login tests"
```

---

## Pull Request (PR) Workflow

### QA tạo PR

```
1. Push branch lên remote
2. Tạo Pull Request trên GitHub:
   - Title: "Add checkout e2e tests"
   - Description: What changed, why, how to review
   - Reviewers: Team lead, another QA
   - Labels: "automation", "tests"

3. CI pipeline tự động chạy tests

4. Reviewers approve → Merge vào main
```

### QA review PR của Dev

QA cũng nên **review code của dev** để:
- Biết dev thay đổi gì → test đúng chỗ
- Phát hiện potential issues sớm
- Suggest thêm unit tests nếu cần

```
Khi review dev PR, QA focus vào:
- Files nào thay đổi? → Module nào cần test?
- Logic nào mới? → Cần test cases gì?
- Có edge cases nào dev chưa handle?
- Unit tests có đủ cho code mới?
```

---

## .gitignore cho Automation Project

```gitignore
# Dependencies
node_modules/

# Test outputs
test-results/
playwright-report/
screenshots/
videos/

# Environment
.env
.env.local

# IDE
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Build
dist/
```

---

## Commit Message Convention

```
Format: <type>: <description>

Types:
  test:     Thêm hoặc sửa tests
  fix:      Fix bug trong test code
  feat:     Thêm feature mới (new page object, helper)
  refactor: Refactor code (không thay đổi behavior)
  ci:       Thay đổi CI/CD config
  docs:     Cập nhật documentation

Ví dụ:
  test: add checkout flow e2e tests
  fix: resolve flaky login test timeout
  refactor: extract common login helper
  ci: add parallel test execution
```

---

## Tóm tắt chương

| Concept | QA dùng khi |
|---|---|
| **Clone/Pull** | Lấy code mới nhất |
| **Branch** | Tạo nhánh cho test code mới |
| **Add/Commit/Push** | Lưu và đẩy code lên remote |
| **Pull Request** | Review code trước khi merge |
| **Merge Conflicts** | Xử lý khi 2 người sửa cùng file |
| **.gitignore** | Không push files không cần thiết |
