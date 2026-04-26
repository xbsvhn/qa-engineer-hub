# Docker cho QA

## Ban chat: Docker = "Container van chuyen" cho code

Ban da thay nhung **container sat khong lo** tren tau bien chua? Khong can biet ben trong chua gi -- dien tu, trai cay, quan ao -- container nao cung cung kich thuoc, cung cach van chuyen, **chay duoc tren bat ky tau nao**.

Docker lam dung nhu vay cho code:

> **Docker container = code cua ban + MOI THU no can (thu vien, config, OS) -- dong goi trong 1 "hop" chay GIONG HET NHAU tren bat ky may tinh nao.**

### Van de kinh dien: "Works on my machine!"

| Khong co Docker | Co Docker |
|---|---|
| "Tren may toi chay duoc ma!" | Container chay giong nhau tren MOI may |
| Cai dat test env mat 2 tieng | `docker-compose up` -- 1 lenh la xong |
| Project A can Node 18, Project B can Node 20 -- conflict | Moi project co container rieng, khong anh huong nhau |
| CI server khac may local --> tests fail | Docker = CUNG MOT moi truong o local va CI |

::: tip Aha moment
Truoc Docker, "setup moi truong" la noi dau cua moi QA moi. "Tai sao tests chay tren may anh duoc ma may toi khong duoc?" -- Docker xoa bo hoan toan van de nay.
:::

---

## Image vs Container = Khuon banh vs Cai banh

Day la 2 khai niem quan trong nhat cua Docker:

- **Image** = **khuon banh** (cookie cutter) -- ban thiet ke, khong an duoc
- **Container** = **cai banh** (cookie) -- tao tu khuon, chay duoc, an duoc

```
Docker Image (khuon)              Docker Containers (banh)
+-------------------+
|  Ubuntu + Node 20 |  ------->   Container 1 (dang chay tests)
|  + Playwright     |  ------->   Container 2 (dang chay tests)
|  + Browsers       |  ------->   Container 3 (dang chay tests)
+-------------------+
    1 image              -->  Co the tao NHIEU containers tu 1 image
```

**Them vi du:**
- Image `postgres:16` = khuon chua PostgreSQL database
- Container = 1 database that su dang chay tu image do
- Ban co the tao 5 containers tu cung 1 image -- 5 databases rieng biet

---

## Docker Commands co ban -- Giai thich tung lenh

```bash
# Pull image = "tai khuon banh" tu Docker Hub (kho image online)
docker pull mcr.microsoft.com/playwright:v1.45.0-jammy
# ^^^ Tai image Playwright co san Chromium, Firefox, WebKit

# Chay container = "lam banh tu khuon"
docker run -it node:20 bash
# ^^^ Tao 1 container tu image node:20, mo Terminal ben trong
# -it = interactive + terminal (de ban go lenh duoc)

# Xem containers dang chay (giong "task manager")
docker ps

# Dung container
docker stop <container-id>

# Xoa tat ca containers da dung (don dep)
docker container prune
```

---

## Docker cho Test Automation

### Chay Playwright Tests trong Docker

```bash
# Chay tests bang Playwright Docker image (khong can cai gi tren may)
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  mcr.microsoft.com/playwright:v1.45.0-jammy \
  bash -c "npm ci && npx playwright test"

# Giai thich tung phan:
# docker run         = tao va chay container
# --rm               = tu dong xoa container sau khi chay xong (don dep)
# -v $(pwd):/app     = "mount" thu muc hien tai vao /app trong container
#                      (giong nhu "chia se folder" giua may ban va container)
# -w /app            = dat working directory = /app
# mcr.microsoft.com/playwright:v1.45.0-jammy = ten image
# bash -c "..."      = lenh chay ben trong container
```

### Dockerfile = "Cong thuc" lam image rieng

```dockerfile
# Dockerfile -- file nay mo ta CACH TAO image cua ban

# Bat dau tu image Playwright co san (co browsers roi)
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Dat thu muc lam viec
WORKDIR /app

# Copy file package*.json truoc (de Docker cache buoc install)
COPY package*.json ./

# Cai dependencies
RUN npm ci

# Copy TOAN BO test code vao
COPY . .

# Lenh mac dinh khi chay container
CMD ["npx", "playwright", "test"]
```

```bash
# Build image tu Dockerfile (giong "lam khuon banh")
docker build -t my-tests .
# -t my-tests = dat ten image la "my-tests"
# .           = Dockerfile nam o thu muc hien tai

# Chay tests (giong "lam banh tu khuon")
docker run my-tests
```

---

## Docker Compose = Nhac truong chi huy nhieu containers

Khi app cua ban can **nhieu thanh phan** chay cung luc (web app + database + API), Docker Compose la **nhac truong** dieu phoi tat ca:

```yaml
# docker-compose.yml
version: '3.8'

services:
  # "Nhac cong" 1: App can test
  app:
    build: ./app
    ports:
      - "3000:3000"
      # ^^^ Map port 3000 cua container ra port 3000 cua may ban
      # De ban truy cap http://localhost:3000
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/testdb
      # ^^^ App ket noi database -- "db" la ten service database ben duoi
    depends_on:
      - db
      # ^^^ "Doi database khoi dong truoc roi moi start app"

  # "Nhac cong" 2: Database
  db:
    image: postgres:16
    # ^^^ Dung image PostgreSQL co san, khong can build
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"

  # "Nhac cong" 3: Test runner
  tests:
    build:
      context: ./tests
      dockerfile: Dockerfile
    environment:
      - BASE_URL=http://app:3000
      # ^^^ Tests goi API cua app -- dung ten service "app" lam hostname
    depends_on:
      - app
      # ^^^ "Doi app khoi dong truoc roi moi chay tests"
```

```bash
# Khoi dong TAT CA services cung luc (1 lenh thay vi cai tung cai)
docker-compose up -d
# -d = chay ngam (detached mode)

# Chay tests
docker-compose run tests

# Don dep -- xoa tat ca containers va data
docker-compose down -v
# -v = xoa luon volumes (database data)
```

::: tip Aha moment
Truoc Docker Compose, de test mot web app, ban phai: (1) cai PostgreSQL, (2) tao database, (3) cai app, (4) config connection, (5) chay app, (6) roi moi chay tests. Voi Docker Compose: `docker-compose up` -- XONG. Tat ca 6 buoc goi gon trong 1 file YAML.
:::

---

## Khi nao QA dung Docker?

| Tinh huong | Cach dung |
|---|---|
| **CI/CD pipeline** | Tests chay trong Docker container (moi truong nhat quan) |
| **Setup test env nhanh** | `docker-compose up` thay vi cai thu cong |
| **Test voi database** | Tao PostgreSQL/MySQL container trong vai giay |
| **Cross-browser** | Playwright Docker image co san tat ca browsers |
| **Team moi join** | Clone repo + `docker-compose up` = san sang test |

### Khi nao KHONG can Docker?

- Tests don gian chay tren local --> `npx playwright test` la du
- Team nho, moi nguoi dung cung OS va setup
- GitHub Actions runner da cung cap moi truong day du roi

---

## Tom tat chuong

| Concept | An du | Giai thich |
|---|---|---|
| **Docker** | Container van chuyen | Dong goi code + dependencies, chay giong nhau moi noi |
| **Image** | Khuon banh | Template -- ban thiet ke, co the tao nhieu containers |
| **Container** | Cai banh | Instance dang chay tu image |
| **Dockerfile** | Cong thuc lam banh | File mo ta cach tao image |
| **Docker Compose** | Nhac truong | Dieu phoi nhieu containers chay cung luc |
| **Volume mount** | Chia se folder | Ket noi thu muc may ban voi container |
