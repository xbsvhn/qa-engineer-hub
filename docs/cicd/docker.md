# Docker cho QA

## Tại sao QA cần biết Docker?

- **Consistent environment** - "Works on my machine" không còn là vấn đề
- **Dễ setup** test environment
- **Isolated** - Không ảnh hưởng máy local
- **CI/CD** - Tests chạy trong containers

## Docker cơ bản

```bash
# Pull image
docker pull selenium/standalone-chrome

# Run container
docker run -d -p 4444:4444 selenium/standalone-chrome

# Docker Compose cho test environment
docker-compose up -d
```

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
