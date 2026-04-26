# Docker cho QA

## Docker là gì? (WHAT)

Docker là công cụ **đóng gói ứng dụng** cùng với tất cả dependencies vào một **container** — đảm bảo chạy giống nhau trên mọi máy.

### Tại sao QA cần Docker? (WHY)

| Vấn đề | Docker giải quyết |
|---|---|
| "Works on my machine" | Container chạy giống nhau trên mọi máy |
| Setup test env phức tạp | `docker-compose up` — 1 lệnh là xong |
| Env conflict giữa projects | Mỗi project có container riêng |
| CI/CD cần consistent env | Docker = same env local & CI |

---

## Concepts cốt lõi

```
Image = Bản thiết kế (template)
Container = Instance đang chạy từ Image

Ví dụ:
  Image "node:20" = Bản thiết kế máy có Node.js 20
  Container = 1 máy ảo đang chạy Node.js 20
  Có thể tạo nhiều containers từ 1 image
```

### Docker Commands cơ bản

```bash
# Pull image từ Docker Hub
docker pull mcr.microsoft.com/playwright:v1.45.0-jammy

# Chạy container
docker run -it node:20 bash

# Xem containers đang chạy
docker ps

# Dừng container
docker stop <container-id>

# Xóa tất cả containers đã dừng
docker container prune
```

---

## Docker cho Test Automation

### Chạy Playwright Tests trong Docker

```bash
# Chạy tests bằng official Playwright Docker image
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  mcr.microsoft.com/playwright:v1.45.0-jammy \
  bash -c "npm ci && npx playwright test"
```

### Dockerfile cho Automation Project

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy test code
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]
```

```bash
# Build và chạy
docker build -t my-tests .
docker run my-tests
```

---

## Docker Compose — Multi-container Environment

Khi cần test app + database + API cùng lúc:

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Application under test
  app:
    build: ./app
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/testdb
    depends_on:
      - db

  # Database
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"

  # Test runner
  tests:
    build:
      context: ./tests
      dockerfile: Dockerfile
    environment:
      - BASE_URL=http://app:3000
    depends_on:
      - app
```

```bash
# Khởi động tất cả services
docker-compose up -d

# Chạy tests
docker-compose run tests

# Dọn dẹp
docker-compose down -v
```

---

## Thực tế dự án

### Khi nào QA dùng Docker?

| Tình huống | Cách dùng |
|---|---|
| **CI/CD pipeline** | Tests chạy trong Docker container (consistent) |
| **Setup test env nhanh** | `docker-compose up` thay vì cài manual |
| **Test với database** | Spin up PostgreSQL/MySQL container |
| **Cross-browser** | Playwright Docker image có sẵn browsers |
| **Team mới join** | Clone repo + `docker-compose up` = ready to test |

### Khi nào KHÔNG cần Docker?

- Test trên local machine đơn giản → chạy `npx playwright test` là đủ
- Team nhỏ, mọi người dùng cùng OS
- CI/CD platform đã cung cấp environment (GitHub Actions runner)

---

## Tóm tắt chương

| Concept | QA dùng khi |
|---|---|
| **Docker Image** | Base environment cho tests |
| **Container** | Chạy tests trong isolated env |
| **Dockerfile** | Package automation project |
| **Docker Compose** | Setup multi-service test env |
| **Volumes** | Mount test code vào container |
