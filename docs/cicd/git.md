# Git & Version Control

## Bản chất: Git = "Save Game" cho code

Bạn chơi game RPG. Trước khi đánh boss, bạn **save game**. Nếu chết, bạn **load lại** từ điểm save. Git làm đúng như vậy cho code:

- Mỗi lần **commit** = bạn **save game** tại thời điểm đó
- Nếu code hỏng, bạn **quay lại** bất kỳ "save point" nào trước đó
- Nhiều người cùng **chơi chung** một game mà không đè lên nhau

::: tip Aha moment
Không có Git, việc "quay lại code hôm qua" nghĩa là bạn phải NHỚ bạn đã sửa gì. Với Git, bạn chỉ cần gọi một lệnh là code quay về đúng thời điểm bạn muốn -- giống như máy du hành thời gian cho code.
:::

---

## Các khái niệm cốt lõi -- Giải thích bằng hình ảnh

### Repository (Repo) = Thư mục dự án có "trí nhớ"

```
Repository = Thư mục project + Toàn bộ lịch sử thay đổi

Local Repo  <-- Trên máy tính của bạn (bạn làm việc ở đây)
Remote Repo <-- Trên GitHub/GitLab (cloud -- nơi mọi người thấy code của bạn)
```

Tưởng tượng: Local repo = bạn vẽ trên giấy nháp. Remote repo = bạn chụp lại và đăng lên Google Drive để cả team xem.

### Branch = Vũ trụ song song

```
main ──●──●──●──●──●──●──●──●── (code chính, luôn chạy tốt)
              |              ^
              |              | Merge (gộp code lại)
              v              |
feature/login ●──●──●──●──●─┘  (bạn thử nghiệm ở đây)
```

**Tại sao cần branch?** Tưởng tượng bạn viết báo cáo nhóm. Nếu 3 người cùng sửa TRỰC TIẾP trên 1 file Google Docs -- loạn! Thay vào đó:
- Mỗi người **copy ra bản riêng** (tạo branch)
- Làm xong thì **gộp lại** (merge)
- Nếu ai làm hỏng thì chỉ hỏng bản copy, **bản gốc vẫn an toàn**

### Branching Strategy trong dự án thực tế

```
main          <-- Production code (code đang chạy cho user thật)
  |
  +-- develop <-- Integration branch (gộp code trước khi lên main)
  |     |
  |     +-- feature/login-test    <-- QA viết test mới
  |     +-- feature/cart-test     <-- QA viết test mới
  |     +-- bugfix/flaky-test     <-- Fix test bị flaky
  |
  +-- release/v2.0 <-- Chuẩn bị release
```

### Commit = "Screenshot" code tại thời điểm này

Mỗi commit lưu lại:
- **AI** thay đổi? (tác giả)
- **CÁI GÌ** thay đổi? (file nào, dòng nào)
- **KHI NÀO** thay đổi? (timestamp)
- **TẠI SAO** thay đổi? (commit message bạn viết)

### Push / Pull = Upload / Download

```
Máy bạn (Local)          GitHub (Remote)
     |                        |
     |--- git push --------->|   (Upload code lên cloud)
     |                        |
     |<--- git pull ---------|   (Download code mới từ cloud)
```

Giống như Google Drive: push = upload file lên, pull = download file mới nhất về.

### Merge Conflict = Hai người sửa cùng một câu

Tưởng tượng bạn và đồng nghiệp **cùng sửa dòng 5** của file `login.spec.ts`:
- Bạn đổi email thành `test@gmail.com`
- Đồng nghiệp đổi email thành `admin@company.com`

Git không biết chọn cái nào -- nên nó **báo conflict** và yêu cầu bạn CHỌN:

```bash
# Git đánh dấu conflict trong file như này:
<<<<<<< HEAD
  await page.fill('#email', 'test@gmail.com');      // Code của bạn
=======
  await page.fill('#email', 'admin@company.com');   // Code của đồng nghiệp
>>>>>>> main

# Bạn phải: chọn 1 version, xóa các markers (<<<<, ====, >>>>), save file
  await page.fill('#email', 'admin@company.com');   // Chọn version đúng
```

::: warning
Merge conflict KHÔNG phải lỗi nghiêm trọng. Nó chỉ là Git nói: "Tôi không biết chọn version nào, bạn quyết định giúp tôi." Bình tĩnh đọc và chọn version đúng là xong.
:::

---

## Git Commands -- Học theo workflow hàng ngày

### Lần đầu: Clone repo về máy

```bash
# Clone = "download toàn bộ dự án về máy lần đầu"
git clone https://github.com/company/automation-tests.git
cd automation-tests

# Cấu hình tên và email (Git cần biết bạn là ai)
git config --global user.name "Nguyen Van An"
git config --global user.email "an@company.com"
```

### Workflow hàng ngày (QA dùng NHIỀU NHẤT)

```bash
# Bước 1: Lấy code mới nhất từ cloud (giống "sync" Google Drive)
git pull origin main

# Bước 2: Tạo branch mới cho công việc hôm nay
# (tạo "vũ trụ song song" để làm việc mà không ảnh hưởng main)
git checkout -b feature/add-checkout-tests

# Bước 3: Viết code... (viết test cases, fix tests...)
# ... bạn code bình thường ở đây ...

# Bước 4: Xem mình đã thay đổi gì
git status          # Hiển thị file nào đã thay đổi (giống "xem danh sách file")
git diff            # Hiển thị cụ thể dòng nào thay đổi (giống "so sánh 2 bản")

# Bước 5: "Chọn file" để save (stage)
git add tests/checkout.spec.ts    # Chọn 1 file cụ thể
git add tests/                     # Chọn cả thư mục
git add .                          # Chọn TẤT CẢ (cẩn thận -- có thể add nhầm file!)

# Bước 6: "Save game" (commit)
git commit -m "Add checkout flow e2e tests"

# Bước 7: Upload lên cloud (push)
git push origin feature/add-checkout-tests

# Bước 8: Tạo Pull Request trên GitHub --> Team review --> Merge vào main
```

::: tip Aha moment
`git add` giống như bạn **bỏ hàng vào giỏ** (stage). `git commit` giống như bạn **ra quầy tính tiền** (save). Bạn có thể bỏ nhiều món vào giỏ trước khi tính tiền -- tương tự, bạn có thể `add` nhiều file rồi mới `commit` một lần.
:::

### Các lệnh bổ sung hữu ích

```bash
# Xem lịch sử "save game" (commits)
git log --oneline -10       # 10 commits gần nhất, mỗi dòng 1 commit

# Chuyển sang branch khác (giống "load save game" khác)
git checkout main
git checkout feature/login-test

# Xem tất cả branches
git branch -a

# Xóa branch đã merge (dọn dẹp sau khi xong việc)
git branch -d feature/old-branch

# Lấy thông tin mới từ cloud NHƯNG CHƯA merge (chỉ "nhìn" thôi)
git fetch origin

# "Undo" thay đổi chưa commit
git checkout -- filename.ts     # Undo 1 file
git stash                       # Tạm cất TẤT CẢ thay đổi (giống "cất vào ngăn kéo")
git stash pop                   # Lấy lại từ "ngăn kéo"
```

---

## Pull Request (PR) = "Xin phép" trước khi gộp code

### PR là gì?

Tưởng tượng bạn viết bài luận. Trước khi nộp, bạn **nhờ bạn bè đọc và góp ý**. Pull Request là quy trình tương tự cho code:

1. Bạn **push branch** lên GitHub
2. Bạn **tạo Pull Request**: "Hey team, tôi viết xong tests này, review giúp tôi"
3. Team **đọc code**, **góp ý**, **approve**
4. CI pipeline **tự động chạy tests**
5. Tất cả OK --> **Merge vào main**

### QA tạo PR

```
1. Push branch lên remote
2. Tạo Pull Request trên GitHub:
   - Title: "Add checkout e2e tests"
   - Description: Thay đổi gì, tại sao, cách review
   - Reviewers: Team lead, QA khác
   - Labels: "automation", "tests"
3. CI pipeline tự động chạy tests
4. Reviewers approve --> Merge vào main
```

### QA review PR của Dev

Đây là "vũ khí bí mật" của QA giỏi -- **đọc code dev thay đổi** để:

```
Khi review dev PR, QA focus vào:
- Files nào thay đổi?  --> Module nào cần test lại?
- Logic nào mới?       --> Cần test cases gì?
- Có edge cases nào dev chưa handle?
- Unit tests có đủ cho code mới?
```

::: tip Aha moment
QA review PR của dev = **shift-left testing**. Bạn tìm bug TRƯỚC KHI code được merge, thay vì đợi đến lúc test trên staging. Nhanh hơn, rẻ hơn, hiệu quả hơn.
:::

---

## .gitignore -- "Danh sách cấm" không push lên cloud

Có những file **không nên** push lên GitHub (file tạm, file mật khẩu, file quá nặng):

```gitignore
# Dependencies (quá nặng, ai cần thì tự install)
node_modules/

# Test outputs (sinh ra mỗi lần chạy, không cần lưu)
test-results/
playwright-report/
screenshots/
videos/

# Environment (chứa mật khẩu, tokens -- TUYỆT ĐỐI không push!)
.env
.env.local

# IDE settings (của riêng mỗi người)
.vscode/settings.json
.idea/

# OS files (file rác của hệ điều hành)
.DS_Store
Thumbs.db

# Build output
dist/
```

---

## Commit Message Convention -- "Nhật ký" rõ ràng

```
Format: <type>: <mô tả ngắn gọn>

Types:
  test:     Thêm hoặc sửa tests
  fix:      Fix bug trong test code
  feat:     Thêm feature mới (page object, helper)
  refactor: Refactor code (không đổi behavior)
  ci:       Thay đổi CI/CD config
  docs:     Cập nhật documentation

Ví dụ:
  test: add checkout flow e2e tests
  fix: resolve flaky login test timeout
  refactor: extract common login helper
  ci: add parallel test execution
```

::: tip
Commit message tốt = đọc 1 dòng là biết code thay đổi gì và TẠI SAO. Commit message tệ = "fix bug", "update code" -- đọc xong vẫn không hiểu gì.
:::

---

## Tóm tắt chương

| Concept | Ẩn dụ | QA dùng khi |
|---|---|---|
| **Git** | "Save game" cho code | Mỗi ngày làm việc |
| **Branch** | Vũ trụ song song | Tạo nhánh làm feature mới |
| **Commit** | Screenshot code | Lưu tiến độ công việc |
| **Push/Pull** | Upload/Download | Đồng bộ code với team |
| **Merge Conflict** | 2 người sửa cùng câu | Giải quyết khi merge |
| **Pull Request** | Xin phép gộp code | Review trước khi merge |
| **.gitignore** | Danh sách cấm | Không push file không cần thiết |
