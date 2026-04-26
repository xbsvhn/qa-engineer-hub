# REST API Testing

## REST API Basics

### HTTP Methods

| Method | Mục đích | Idempotent |
|---|---|---|
| **GET** | Lấy dữ liệu | Yes |
| **POST** | Tạo mới | No |
| **PUT** | Cập nhật toàn bộ | Yes |
| **PATCH** | Cập nhật một phần | No |
| **DELETE** | Xóa | Yes |

### HTTP Status Codes

| Range | Ý nghĩa | Ví dụ |
|---|---|---|
| **2xx** | Success | 200 OK, 201 Created, 204 No Content |
| **3xx** | Redirect | 301 Moved, 304 Not Modified |
| **4xx** | Client Error | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| **5xx** | Server Error | 500 Internal Error, 503 Service Unavailable |

## Checklist API Testing

### Functional
- [ ] Correct status code
- [ ] Response body structure
- [ ] Response data accuracy
- [ ] Error handling & messages
- [ ] Pagination
- [ ] Sorting & filtering

### Security
- [ ] Authentication (token, API key)
- [ ] Authorization (role-based access)
- [ ] Input validation
- [ ] SQL injection
- [ ] Rate limiting

### Performance
- [ ] Response time
- [ ] Payload size
- [ ] Concurrent requests

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
