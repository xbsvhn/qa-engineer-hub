# Git & Version Control

## Git cơ bản cho QA

### Các lệnh thường dùng

```bash
# Clone repo
git clone <url>

# Tạo branch mới
git checkout -b feature/add-tests

# Xem thay đổi
git status
git diff

# Commit changes
git add .
git commit -m "Add login test cases"

# Push to remote
git push origin feature/add-tests

# Pull latest changes
git pull origin main
```

### Git Workflow

```
main → develop → feature/xxx → Pull Request → Code Review → Merge
```

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
