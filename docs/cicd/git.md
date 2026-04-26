# Git & Version Control

## Ban chat: Git = "Save Game" cho code

Ban choi game RPG. Truoc khi danh boss, ban **save game**. Neu chet, ban **load lai** tu diem save. Git lam dung nhu vay cho code:

- Moi lan **commit** = ban **save game** tai thoi diem do
- Neu code hong, ban **quay lai** bat ky "save point" nao truoc do
- Nhieu nguoi cung **choi chung** mot game ma khong de len nhau

::: tip Aha moment
Khong co Git, viec "quay lai code hom qua" nghia la ban phai NHO ban da sua gi. Voi Git, ban chi can goi mot lenh la code quay ve dung thoi diem ban muon -- giong nhu may du hanh thoi gian cho code.
:::

---

## Cac khai niem cot loi -- Giai thich bang hinh anh

### Repository (Repo) = Thu muc du an co "tri nho"

```
Repository = Thu muc project + Toan bo lich su thay doi

Local Repo  <-- Tren may tinh cua ban (ban lam viec o day)
Remote Repo <-- Tren GitHub/GitLab (cloud -- noi moi nguoi thay code cua ban)
```

Tuong tuong: Local repo = ban ve tren giay nhap. Remote repo = ban chup lai va dang len Google Drive de ca team xem.

### Branch = Vu tru song song

```
main ──●──●──●──●──●──●──●──●── (code chinh, luon chay tot)
              |              ^
              |              | Merge (gop code lai)
              v              |
feature/login ●──●──●──●──●─┘  (ban thu nghiem o day)
```

**Tai sao can branch?** Tuong tuong ban viet bao cao nhom. Neu 3 nguoi cung sua TRUC TIEP tren 1 file Google Docs -- loan! Thay vao do:
- Moi nguoi **copy ra ban rieng** (tao branch)
- Lam xong thi **gop lai** (merge)
- Neu ai lam hong thi chi hong ban copy, **ban goc van an toan**

### Branching Strategy trong du an thuc te

```
main          <-- Production code (code dang chay cho user that)
  |
  +-- develop <-- Integration branch (gop code truoc khi len main)
  |     |
  |     +-- feature/login-test    <-- QA viet test moi
  |     +-- feature/cart-test     <-- QA viet test moi
  |     +-- bugfix/flaky-test     <-- Fix test bi flaky
  |
  +-- release/v2.0 <-- Chuan bi release
```

### Commit = "Screenshot" code tai thoi diem nay

Moi commit luu lai:
- **AI** thay doi? (tac gia)
- **CAI GI** thay doi? (file nao, dong nao)
- **KHI NAO** thay doi? (timestamp)
- **TAI SAO** thay doi? (commit message ban viet)

### Push / Pull = Upload / Download

```
May ban (Local)          GitHub (Remote)
     |                        |
     |--- git push --------->|   (Upload code len cloud)
     |                        |
     |<--- git pull ---------|   (Download code moi tu cloud)
```

Giong nhu Google Drive: push = upload file len, pull = download file moi nhat ve.

### Merge Conflict = Hai nguoi sua cung mot cau

Tuong tuong ban va dong nghiep **cung sua dong 5** cua file `login.spec.ts`:
- Ban doi email thanh `test@gmail.com`
- Dong nghiep doi email thanh `admin@company.com`

Git khong biet chon cai nao -- nen no **bao conflict** va yeu cau ban CHON:

```bash
# Git danh dau conflict trong file nhu nay:
<<<<<<< HEAD
  await page.fill('#email', 'test@gmail.com');      // Code cua ban
=======
  await page.fill('#email', 'admin@company.com');   // Code cua dong nghiep
>>>>>>> main

# Ban phai: chon 1 version, xoa cac markers (<<<<, ====, >>>>), save file
  await page.fill('#email', 'admin@company.com');   // Chon version dung
```

::: warning
Merge conflict KHONG phai loi nghiem trong. No chi la Git noi: "Toi khong biet chon version nao, ban quyet dinh giup toi." Binh tinh doc va chon version dung la xong.
:::

---

## Git Commands -- Hoc theo workflow hang ngay

### Lan dau: Clone repo ve may

```bash
# Clone = "download toan bo du an ve may lan dau"
git clone https://github.com/company/automation-tests.git
cd automation-tests

# Cau hinh ten va email (Git can biet ban la ai)
git config --global user.name "Nguyen Van An"
git config --global user.email "an@company.com"
```

### Workflow hang ngay (QA dung NHIEU NHAT)

```bash
# Buoc 1: Lay code moi nhat tu cloud (giong "sync" Google Drive)
git pull origin main

# Buoc 2: Tao branch moi cho cong viec hom nay
# (tao "vu tru song song" de lam viec ma khong anh huong main)
git checkout -b feature/add-checkout-tests

# Buoc 3: Viet code... (viet test cases, fix tests...)
# ... ban code binh thuong o day ...

# Buoc 4: Xem minh da thay doi gi
git status          # Hien thi file nao da thay doi (giong "xem danh sach file")
git diff            # Hien thi cu the dong nao thay doi (giong "so sanh 2 ban")

# Buoc 5: "Chon file" de save (stage)
git add tests/checkout.spec.ts    # Chon 1 file cu the
git add tests/                     # Chon ca thu muc
git add .                          # Chon TAT CA (can than -- co the add nham file!)

# Buoc 6: "Save game" (commit)
git commit -m "Add checkout flow e2e tests"

# Buoc 7: Upload len cloud (push)
git push origin feature/add-checkout-tests

# Buoc 8: Tao Pull Request tren GitHub --> Team review --> Merge vao main
```

::: tip Aha moment
`git add` giong nhu ban **bo hang vao gio** (stage). `git commit` giong nhu ban **ra quay tinh tien** (save). Ban co the bo nhieu mon vao gio truoc khi tinh tien -- tuong tu, ban co the `add` nhieu file roi moi `commit` mot lan.
:::

### Cac lenh bo sung huu ich

```bash
# Xem lich su "save game" (commits)
git log --oneline -10       # 10 commits gan nhat, moi dong 1 commit

# Chuyen sang branch khac (giong "load save game" khac)
git checkout main
git checkout feature/login-test

# Xem tat ca branches
git branch -a

# Xoa branch da merge (don dep sau khi xong viec)
git branch -d feature/old-branch

# Lay thong tin moi tu cloud NHUNG CHUA merge (chi "nhin" thoi)
git fetch origin

# "Undo" thay doi chua commit
git checkout -- filename.ts     # Undo 1 file
git stash                       # Tam cat TAT CA thay doi (giong "cat vao ngan keo")
git stash pop                   # Lay lai tu "ngan keo"
```

---

## Pull Request (PR) = "Xin phep" truoc khi gop code

### PR la gi?

Tuong tuong ban viet bai luan. Truoc khi nop, ban **nho ban be doc va gop y**. Pull Request la quy trinh tuong tu cho code:

1. Ban **push branch** len GitHub
2. Ban **tao Pull Request**: "Hey team, toi viet xong tests nay, review giup toi"
3. Team **doc code**, **gop y**, **approve**
4. CI pipeline **tu dong chay tests**
5. Tat ca OK --> **Merge vao main**

### QA tao PR

```
1. Push branch len remote
2. Tao Pull Request tren GitHub:
   - Title: "Add checkout e2e tests"
   - Description: Thay doi gi, tai sao, cach review
   - Reviewers: Team lead, QA khac
   - Labels: "automation", "tests"
3. CI pipeline tu dong chay tests
4. Reviewers approve --> Merge vao main
```

### QA review PR cua Dev

Day la "vu khi bi mat" cua QA gioi -- **doc code dev thay doi** de:

```
Khi review dev PR, QA focus vao:
- Files nao thay doi?  --> Module nao can test lai?
- Logic nao moi?       --> Can test cases gi?
- Co edge cases nao dev chua handle?
- Unit tests co du cho code moi?
```

::: tip Aha moment
QA review PR cua dev = **shift-left testing**. Ban tim bug TRUOC KHI code duoc merge, thay vi doi den luc test tren staging. Nhanh hon, re hon, hieu qua hon.
:::

---

## .gitignore -- "Danh sach cam" khong push len cloud

Co nhung file **khong nen** push len GitHub (file tam, file mat khau, file qua nang):

```gitignore
# Dependencies (qua nang, ai can thi tu install)
node_modules/

# Test outputs (sinh ra moi lan chay, khong can luu)
test-results/
playwright-report/
screenshots/
videos/

# Environment (chua mat khau, tokens -- TUYET DOI khong push!)
.env
.env.local

# IDE settings (cua rieng moi nguoi)
.vscode/settings.json
.idea/

# OS files (file rac cua he dieu hanh)
.DS_Store
Thumbs.db

# Build output
dist/
```

---

## Commit Message Convention -- "Nhat ky" ro rang

```
Format: <type>: <mo ta ngan gon>

Types:
  test:     Them hoac sua tests
  fix:      Fix bug trong test code
  feat:     Them feature moi (page object, helper)
  refactor: Refactor code (khong doi behavior)
  ci:       Thay doi CI/CD config
  docs:     Cap nhat documentation

Vi du:
  test: add checkout flow e2e tests
  fix: resolve flaky login test timeout
  refactor: extract common login helper
  ci: add parallel test execution
```

::: tip
Commit message tot = doc 1 dong la biet code thay doi gi va TAI SAO. Commit message te = "fix bug", "update code" -- doc xong van khong hieu gi.
:::

---

## Tom tat chuong

| Concept | An du | QA dung khi |
|---|---|---|
| **Git** | "Save game" cho code | Moi ngay lam viec |
| **Branch** | Vu tru song song | Tao nhanh lam feature moi |
| **Commit** | Screenshot code | Luu tien do cong viec |
| **Push/Pull** | Upload/Download | Dong bo code voi team |
| **Merge Conflict** | 2 nguoi sua cung cau | Giai quyet khi merge |
| **Pull Request** | Xin phep gop code | Review truoc khi merge |
| **.gitignore** | Danh sach cam | Khong push file khong can thiet |
