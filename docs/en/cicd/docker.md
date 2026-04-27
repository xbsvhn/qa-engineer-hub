# Docker for QA

## The essence: Docker = "Shipping container" for code

Have you ever seen those **massive steel containers** on cargo ships? No matter what's inside -- electronics, fruit, clothing -- every container is the same size, shipped the same way, and **runs on any ship**.

Docker does exactly the same thing for code:

> **Docker container = your code + EVERYTHING it needs (libraries, config, OS) -- packaged in one "box" that runs IDENTICALLY on any computer.**

### The classic problem: "Works on my machine!"

| Without Docker | With Docker |
|---|---|
| "It works on my machine!" | Containers run identically on EVERY machine |
| Setting up the test env takes 2 hours | `docker-compose up` -- one command and done |
| Project A needs Node 18, Project B needs Node 20 -- conflict | Each project has its own container, no interference |
| CI server differs from local --> tests fail | Docker = the SAME environment locally and in CI |

::: tip Aha moment
Before Docker, "setting up the environment" was every new QA's nightmare. "Why do tests pass on your machine but not on mine?" -- Docker eliminates this problem entirely.
:::

---

## Image vs Container = Cookie cutter vs Cookie

These are the two most important Docker concepts:

- **Image** = **cookie cutter** -- you design it, but you can't eat it
- **Container** = **cookie** -- made from the cutter, it runs, you can eat it

```
Docker Image (cutter)              Docker Containers (cookies)
+-------------------+
|  Ubuntu + Node 20 |  ------->   Container 1 (running tests)
|  + Playwright     |  ------->   Container 2 (running tests)
|  + Browsers       |  ------->   Container 3 (running tests)
+-------------------+
    1 image              -->  You can create MANY containers from 1 image
```

**More examples:**
- Image `postgres:16` = a template containing a PostgreSQL database
- Container = an actual running database created from that image
- You can create 5 containers from the same image -- 5 separate databases

---

## Basic Docker Commands -- Each command explained

```bash
# Pull image = "download a cookie cutter" from Docker Hub (online image registry)
docker pull mcr.microsoft.com/playwright:v1.45.0-jammy
# ^^^ Download the Playwright image with Chromium, Firefox, WebKit pre-installed

# Run container = "make a cookie from the cutter"
docker run -it node:20 bash
# ^^^ Create 1 container from the node:20 image, open a Terminal inside
# -it = interactive + terminal (so you can type commands)

# View running containers (like "task manager")
docker ps

# Stop a container
docker stop <container-id>

# Remove all stopped containers (cleanup)
docker container prune
```

---

## Docker for Test Automation

### Running Playwright Tests in Docker

```bash
# Run tests using the Playwright Docker image (no local installation needed)
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  mcr.microsoft.com/playwright:v1.45.0-jammy \
  bash -c "npm ci && npx playwright test"

# Explanation of each part:
# docker run         = create and run a container
# --rm               = automatically delete the container after it finishes (cleanup)
# -v $(pwd):/app     = "mount" the current directory into /app inside the container
#                      (like "sharing a folder" between your machine and the container)
# -w /app            = set the working directory to /app
# mcr.microsoft.com/playwright:v1.45.0-jammy = image name
# bash -c "..."      = command to run inside the container
```

### Dockerfile = "Recipe" for building your own image

```dockerfile
# Dockerfile -- this file describes HOW TO BUILD your image

# Start from the pre-built Playwright image (browsers already included)
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Set the working directory
WORKDIR /app

# Copy package*.json first (so Docker caches the install step)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy ALL the test code in
COPY . .

# Default command when the container runs
CMD ["npx", "playwright", "test"]
```

```bash
# Build an image from the Dockerfile (like "making the cookie cutter")
docker build -t my-tests .
# -t my-tests = name the image "my-tests"
# .           = the Dockerfile is in the current directory

# Run tests (like "making cookies from the cutter")
docker run my-tests
```

---

## Docker Compose = Conductor orchestrating multiple containers

When your app needs **multiple components** running at the same time (web app + database + API), Docker Compose is the **conductor** that coordinates them all:

```yaml
# docker-compose.yml
version: '3.8'

services:
  # "Musician" 1: The app under test
  app:
    build: ./app
    ports:
      - "3000:3000"
      # ^^^ Map port 3000 of the container to port 3000 on your machine
      # So you can access http://localhost:3000
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/testdb
      # ^^^ The app connects to the database -- "db" is the name of the database service below
    depends_on:
      - db
      # ^^^ "Wait for the database to start before launching the app"

  # "Musician" 2: Database
  db:
    image: postgres:16
    # ^^^ Use the pre-built PostgreSQL image, no build needed
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"

  # "Musician" 3: Test runner
  tests:
    build:
      context: ./tests
      dockerfile: Dockerfile
    environment:
      - BASE_URL=http://app:3000
      # ^^^ Tests call the app's API -- use the service name "app" as hostname
    depends_on:
      - app
      # ^^^ "Wait for the app to start before running tests"
```

```bash
# Start ALL services at once (1 command instead of installing each one manually)
docker-compose up -d
# -d = run in background (detached mode)

# Run tests
docker-compose run tests

# Cleanup -- remove all containers and data
docker-compose down -v
# -v = also remove volumes (database data)
```

::: tip Aha moment
Before Docker Compose, to test a web app you had to: (1) install PostgreSQL, (2) create a database, (3) install the app, (4) configure the connection, (5) start the app, (6) then finally run tests. With Docker Compose: `docker-compose up` -- DONE. All 6 steps wrapped up in a single YAML file.
:::

---

## When does QA use Docker?

| Scenario | How to use it |
|---|---|
| **CI/CD pipeline** | Tests run inside Docker containers (consistent environment) |
| **Quick test env setup** | `docker-compose up` instead of manual installation |
| **Testing with a database** | Spin up a PostgreSQL/MySQL container in seconds |
| **Cross-browser testing** | Playwright Docker image has all browsers pre-installed |
| **New team member onboarding** | Clone repo + `docker-compose up` = ready to test |

### When do you NOT need Docker?

- Simple tests running locally --> `npx playwright test` is enough
- Small team, everyone uses the same OS and setup
- GitHub Actions runner already provides a complete environment

---

## Chapter summary

| Concept | Analogy | Explanation |
|---|---|---|
| **Docker** | Shipping container | Packages code + dependencies, runs identically everywhere |
| **Image** | Cookie cutter | Template -- you design it, can create many containers from it |
| **Container** | Cookie | A running instance created from an image |
| **Dockerfile** | Cookie recipe | File describing how to build an image |
| **Docker Compose** | Conductor | Orchestrates multiple containers running at the same time |
| **Volume mount** | Shared folder | Connects a directory on your machine to the container |
