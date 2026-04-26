# SDLC & STLC

## SDLC - Software Development Life Cycle

SDLC là quy trình phát triển phần mềm từ ý tưởng đến khi sản phẩm được triển khai và bảo trì.

### Các giai đoạn SDLC

1. **Requirement Analysis** - Phân tích yêu cầu
2. **Planning** - Lập kế hoạch
3. **Design** - Thiết kế hệ thống
4. **Development** - Phát triển (coding)
5. **Testing** - Kiểm thử
6. **Deployment** - Triển khai
7. **Maintenance** - Bảo trì

### Các mô hình SDLC phổ biến

| Mô hình | Đặc điểm | Phù hợp với |
|---|---|---|
| **Waterfall** | Tuần tự, không quay lại | Dự án nhỏ, yêu cầu rõ ràng |
| **Agile** | Lặp lại, linh hoạt | Đa số dự án hiện đại |
| **Scrum** | Sprint 2-4 tuần | Team 5-9 người |
| **V-Model** | Testing song song với Development | Dự án cần chất lượng cao |

## STLC - Software Testing Life Cycle

STLC là quy trình kiểm thử phần mềm, nằm trong SDLC.

### Các giai đoạn STLC

1. **Requirement Analysis** - Phân tích yêu cầu test
2. **Test Planning** - Lập kế hoạch test
3. **Test Case Development** - Viết test case
4. **Environment Setup** - Chuẩn bị môi trường test
5. **Test Execution** - Thực thi test
6. **Test Cycle Closure** - Kết thúc và báo cáo

::: tip QA tham gia từ đầu
QA nên tham gia từ giai đoạn **Requirement Analysis** để phát hiện lỗi sớm nhất có thể (Shift-left approach).
:::

## Entry & Exit Criteria

### Entry Criteria (Điều kiện bắt đầu test)
- Requirement document đã được review
- Test plan đã được approve
- Test environment sẵn sàng
- Build đã được deploy thành công

### Exit Criteria (Điều kiện kết thúc test)
- Tất cả test case đã được execute
- Tỷ lệ pass đạt ngưỡng (vd: > 95%)
- Không còn Critical/Blocker bug
- Test summary report đã được tạo
