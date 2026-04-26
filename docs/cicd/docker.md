# Docker cho QA

## Bản chất: Docker = "Container vận chuyển" cho code

Bạn đã thấy những **container sắt khổng lồ** trên tàu biển chưa? Không cần biết bên trong chứa gì -- điện tử, trái cây, quần áo -- container nào cũng cùng kích thước, cùng cách vận chuyển, **chạy được trên bất kỳ tàu nào**.

Docker làm đúng như vậy cho code:

> **Docker container = code của bạn + MỌI THỨ nó cần (thư viện, config, OS) -- đóng gói trong 1 "hộp" chạy GIỐNG HỆT NHAU trên bất kỳ máy tính nào.**

### Vấn đề kinh điển: "Works on my machine!"

| Không có Docker | Có Docker |
|---|---|
| "Trên máy tôi chạy được mà!" | Container chạy giống nhau trên MỌI máy |
| Cài đặt test env mất 2 tiếng | `docker-compose up` -- 1 lệnh là xong |
| Project A cần Node 18, Project B cần Node 20 -- conflict | Mỗi project có container riêng, không ảnh hưởng nhau |
| CI server khác máy local --> tests fail | Docker = CÙNG MỘT môi trường ở local và CI |

::: tip Aha moment
Trước Docker, "setup môi trường" là nỗi đau của mọi QA mới. "Tại sao tests chạy trên máy anh được mà máy tôi không được?" -- Docker xóa bỏ hoàn toàn vấn đề này.
:::

---

## Image vs Container = Khuôn bánh vs Cái bánh

Đây là 2 khái niệm quan trọng nhất của Docker:

- **Image** = **khuôn bánh** (cookie cutter) -- bạn thiết kế, không ăn được
- **Container** = **cái bánh** (cookie) -- tạo từ khuôn, chạy được, ăn được

```
Docker Image (khuôn)              Docker Containers (bánh)
+-------------------+
|  Ubuntu + Node 20 |  ------->   Container 1 (đang chạy tests)
|  + Playwright     |  ------->   Container 2 (đang chạy tests)
|  + Browsers       |  ------->   Container 3 (đang chạy tests)
+-------------------+
    1 image              -->  Có thể tạo NHIỀU containers từ 1 image
```

**Thêm ví dụ:**
- Image `postgres:16` = khuôn chứa PostgreSQL database
- Container = 1 database thật sự đang chạy từ image đó
- Bạn có thể tạo 5 containers từ cùng 1 image -- 5 databases riêng biệt

---

## Docker Commands cơ bản -- Giải thích từng lệnh

```bash
# Pull image = "tải khuôn bánh" từ Docker Hub (kho image online)
docker pull mcr.microsoft.com/playwright:v1.45.0-jammy
# ^^^ Tải image Playwright có sẵn Chromium, Firefox, WebKit

# Chạy container = "làm bánh từ khuôn"
docker run -it node:20 bash
# ^^^ Tạo 1 container từ image node:20, mở Terminal bên trong
# -it = interactive + terminal (để bạn gõ lệnh được)

# Xem containers đang chạy (giống "task manager")
docker ps

# Dừng container
docker stop <container-id>

# Xóa tất cả containers đã dừng (dọn dẹp)
docker container prune
```

---

## Docker cho Test Automation

### Chạy Playwright Tests trong Docker

```bash
# Chạy tests bằng Playwright Docker image (không cần cài gì trên máy)
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  mcr.microsoft.com/playwright:v1.45.0-jammy \
  bash -c "npm ci && npx playwright test"

# Giải thích từng phần:
# docker run         = tạo và chạy container
# --rm               = tự động xóa container sau khi chạy xong (dọn dẹp)
# -v $(pwd):/app     = "mount" thư mục hiện tại vào /app trong container
#                      (giống như "chia sẻ folder" giữa máy bạn và container)
# -w /app            = đặt working directory = /app
# mcr.microsoft.com/playwright:v1.45.0-jammy = tên image
# bash -c "..."      = lệnh chạy bên trong container
```

### Dockerfile = "Công thức" làm image riêng

```dockerfile
# Dockerfile -- file này mô tả CÁCH TẠO image của bạn

# Bắt đầu từ image Playwright có sẵn (có browsers rồi)
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package*.json trước (để Docker cache bước install)
COPY package*.json ./

# Cài dependencies
RUN npm ci

# Copy TOÀN BỘ test code vào
COPY . .

# Lệnh mặc định khi chạy container
CMD ["npx", "playwright", "test"]
```

```bash
# Build image từ Dockerfile (giống "làm khuôn bánh")
docker build -t my-tests .
# -t my-tests = đặt tên image là "my-tests"
# .           = Dockerfile nằm ở thư mục hiện tại

# Chạy tests (giống "làm bánh từ khuôn")
docker run my-tests
```

---

## Docker Compose = Nhạc trưởng chỉ huy nhiều containers

Khi app của bạn cần **nhiều thành phần** chạy cùng lúc (web app + database + API), Docker Compose là **nhạc trưởng** điều phối tất cả:

```yaml
# docker-compose.yml
version: '3.8'

services:
  # "Nhạc công" 1: App cần test
  app:
    build: ./app
    ports:
      - "3000:3000"
      # ^^^ Map port 3000 của container ra port 3000 của máy bạn
      # Để bạn truy cập http://localhost:3000
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/testdb
      # ^^^ App kết nối database -- "db" là tên service database bên dưới
    depends_on:
      - db
      # ^^^ "Đợi database khởi động trước rồi mới start app"

  # "Nhạc công" 2: Database
  db:
    image: postgres:16
    # ^^^ Dùng image PostgreSQL có sẵn, không cần build
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"

  # "Nhạc công" 3: Test runner
  tests:
    build:
      context: ./tests
      dockerfile: Dockerfile
    environment:
      - BASE_URL=http://app:3000
      # ^^^ Tests gọi API của app -- dùng tên service "app" làm hostname
    depends_on:
      - app
      # ^^^ "Đợi app khởi động trước rồi mới chạy tests"
```

```bash
# Khởi động TẤT CẢ services cùng lúc (1 lệnh thay vì cài từng cái)
docker-compose up -d
# -d = chạy ngầm (detached mode)

# Chạy tests
docker-compose run tests

# Dọn dẹp -- xóa tất cả containers và data
docker-compose down -v
# -v = xóa luôn volumes (database data)
```

::: tip Aha moment
Trước Docker Compose, để test một web app, bạn phải: (1) cài PostgreSQL, (2) tạo database, (3) cài app, (4) config connection, (5) chạy app, (6) rồi mới chạy tests. Với Docker Compose: `docker-compose up` -- XONG. Tất cả 6 bước gói gọn trong 1 file YAML.
:::

---

## Khi nào QA dùng Docker?

| Tình huống | Cách dùng |
|---|---|
| **CI/CD pipeline** | Tests chạy trong Docker container (môi trường nhất quán) |
| **Setup test env nhanh** | `docker-compose up` thay vì cài thủ công |
| **Test với database** | Tạo PostgreSQL/MySQL container trong vài giây |
| **Cross-browser** | Playwright Docker image có sẵn tất cả browsers |
| **Team mới join** | Clone repo + `docker-compose up` = sẵn sàng test |

### Khi nào KHÔNG cần Docker?

- Tests đơn giản chạy trên local --> `npx playwright test` là đủ
- Team nhỏ, mọi người dùng cùng OS và setup
- GitHub Actions runner đã cung cấp môi trường đầy đủ rồi

---

## Tóm tắt chương

| Concept | Ẩn dụ | Giải thích |
|---|---|---|
| **Docker** | Container vận chuyển | Đóng gói code + dependencies, chạy giống nhau mọi nơi |
| **Image** | Khuôn bánh | Template -- bạn thiết kế, có thể tạo nhiều containers |
| **Container** | Cái bánh | Instance đang chạy từ image |
| **Dockerfile** | Công thức làm bánh | File mô tả cách tạo image |
| **Docker Compose** | Nhạc trưởng | Điều phối nhiều containers chạy cùng lúc |
| **Volume mount** | Chia sẻ folder | Kết nối thư mục máy bạn với container |
