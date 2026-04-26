# CI/CD

CI/CD (Continuous Integration / Continuous Delivery) là quy trình **tự động hóa** build, test, và deploy phần mềm. Đây là kỹ năng **bắt buộc** cho QA hiện đại — automation tests chỉ có giá trị thực sự khi tích hợp vào CI/CD pipeline.

## Nội dung

| # | Chủ đề | Mô tả |
|---|---|---|
| 1 | [Git & Version Control](./git) | Git workflow, branching, commands thiết yếu, Pull Request flow |
| 2 | [GitHub Actions](./github-actions) | CI/CD pipeline, workflows cho test automation, artifacts, secrets |
| 3 | [Docker cho QA](./docker) | Containers, test environments, Docker Compose cho testing |

## CI/CD Pipeline cho QA

```
Developer push code
    │
    ▼
┌─────────────────────────────────────────────────────────┐
│                    CI/CD Pipeline                        │
│                                                         │
│  Build ──► Unit Tests ──► API Tests ──► Deploy Staging  │
│                                              │          │
│                                              ▼          │
│                              E2E Tests ──► Smoke Test   │
│                                              │          │
│                                    Pass? ────┤          │
│                                    │         │          │
│                                   Yes        No         │
│                                    │         │          │
│                              Deploy Prod   Notify QA    │
│                                           + Block deploy│
└─────────────────────────────────────────────────────────┘
```

**QA trong CI/CD:**
- Viết automation tests chạy trong pipeline
- Configure test stages (smoke, regression, E2E)
- Monitor test results, fix flaky tests
- Gate deployment: tests fail → deploy bị block
