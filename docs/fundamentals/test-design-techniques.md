# Test Design Techniques

## Tại sao cần kỹ thuật thiết kế Test Case? (WHY)

### Bài toán thực tế mà ai cũng gặp

Hãy tưởng tượng bạn là QA và được giao test một form đăng ký với 5 fields:

- **Họ tên:** chấp nhận 1-50 ký tự
- **Email:** phải đúng format email
- **Tuổi:** chấp nhận 18-65
- **Password:** 8-20 ký tự, phải có chữ hoa, số, ký tự đặc biệt
- **Số điện thoại:** 10-11 chữ số

Bạn nghĩ cần bao nhiêu test case?

Nếu mỗi field có khoảng **10 giá trị đáng test** (valid, invalid, empty, quá dài, quá ngắn, ký tự đặc biệt...), thì tổng tổ hợp là:

```
10 x 10 x 10 x 10 x 10 = 100,000 tổ hợp
```

Giả sử mỗi test case mất 2 phút để chạy manual. Bạn cần **200,000 phút = 138 ngày làm việc liên tục** chỉ để test 1 form. Deadline là tuần sau. Bạn làm gì?

Đây chính là lý do ISTQB Principle #2 tồn tại: **"Exhaustive testing is impossible"** (test toàn bộ là bất khả thi). Câu hỏi không phải "test bao nhiêu?" mà là **"test CÁI GÌ cho đúng?"**

### Test Design Techniques = Bản đồ chỉ đường

Hãy nghĩ thế này: bạn đi du lịch một thành phố mới. Bạn có 2 lựa chọn:
- **Cách 1:** Đi lang thang ngẫu nhiên, may thì gặp chỗ đẹp, không may thì đi lạc
- **Cách 2:** Dùng bản đồ, đánh dấu các điểm quan trọng, lên lộ trình

Test Design Techniques chính là **bản đồ** của QA. Nó giúp bạn:

1. **Giảm số lượng** test case từ hàng trăm nghìn xuống vài chục, nhưng vẫn đạt coverage (độ phủ) cao
2. **Tìm đúng chỗ** mà bug hay trốn - vì bug không trốn ngẫu nhiên, chúng có "ổ" riêng
3. **Có hệ thống** - không phải "test random" hay "test theo cảm tính"
4. **Giải trình được** - khi PM hỏi "tại sao test những case này?", bạn trả lời được logic chứ không phải "em cảm thấy nên test cái này"

---

## Phân loại

Trước khi đi vào chi tiết, hãy nhìn bức tranh tổng thể. Test Design Techniques chia thành 3 nhóm lớn dựa trên **mức độ bạn biết về bên trong hệ thống**:

```
Test Design Techniques
├── Black-box (không cần biết code)
│   ├── Equivalence Partitioning
│   ├── Boundary Value Analysis
│   ├── Decision Table
│   ├── State Transition
│   └── Use Case / User Story Testing
├── White-box (cần biết code)
│   ├── Statement Coverage
│   ├── Branch Coverage
│   └── Path Coverage
└── Experience-based
    ├── Error Guessing
    ├── Exploratory Testing
    └── Checklist-based Testing
```

- **Black-box** (hộp đen): bạn chỉ nhìn từ bên ngoài - đưa input vào, kiểm tra output ra. Giống như bạn test máy ATM: bỏ thẻ vào, nhấn rút tiền, kiểm tra tiền có ra không. Bạn không cần biết bên trong máy chạy phần mềm gì.
- **White-box** (hộp trắng): bạn mở nắp ra nhìn code bên trong. Giống như thợ sửa máy ATM: mở máy ra kiểm tra từng bo mạch.
- **Experience-based** (dựa kinh nghiệm): bạn dùng trực giác và kinh nghiệm thực chiến. Giống như thợ sửa máy lâu năm: nghe tiếng máy kêu là biết hỏng chỗ nào.

---

## Black-box Techniques

**Black-box** = bạn test mà **không cần biết code bên trong** hoạt động ra sao. Bạn chỉ cần 2 thứ: **requirements** (yêu cầu) và **input/output** (đầu vào/đầu ra).

> Tưởng tượng bạn test một cái máy bán nước tự động. Bạn bỏ tiền vào, nhấn nút Coca, kiểm tra có ra lon Coca không. Bạn không cần biết bên trong máy có mấy cái motor, dây điện nối kiểu gì. Bạn chỉ quan tâm: **bỏ đúng tiền + nhấn đúng nút = ra đúng nước**.

### 1. Equivalence Partitioning (EP) — Phân lớp tương đương

#### Hiểu bản chất qua ví dụ đời thường

Hãy tưởng tượng bạn đang chia một chiếc **pizza** thành các miếng. Mỗi miếng pizza đại diện cho một "nhóm" giá trị. Điều quan trọng là: **mỗi miếng trong cùng một nhóm có vị giống nhau** - bạn chỉ cần nếm 1 miếng là biết vị của cả nhóm đó.

Đó chính là ý tưởng của **Equivalence Partitioning** (EP):
- **Equivalence** = tương đương, giống nhau
- **Partitioning** = phân chia thành nhóm
- **Ý nghĩa:** Chia dữ liệu đầu vào thành **các nhóm** (gọi là partition), sao cho mọi giá trị trong cùng một nhóm sẽ **cho ra cùng một kết quả**. Rồi bạn chỉ cần test **1 giá trị đại diện** cho mỗi nhóm.

#### Tại sao nó hiệu quả? (Khoảnh khắc "Aha!")

Hãy nghĩ về cách hệ thống xử lý. Khi developer viết code kiểm tra tuổi:

```javascript
// Code developer viết để kiểm tra tuổi
if (age >= 18 && age <= 65) {
    // Chấp nhận - mọi số từ 18 đến 65 đều chạy ĐÚNG DÒNG CODE NÀY
    return "Accepted";
} else {
    // Từ chối - mọi số ngoài khoảng 18-65 đều chạy ĐÚNG DÒNG CODE NÀY
    return "Rejected";
}
```

Bạn thấy không? Nếu `age = 25` chạy đúng, thì `age = 30`, `age = 40`, `age = 50` cũng sẽ chạy đúng vì chúng **đi qua cùng một nhánh code**. Test thêm 30, 40, 50 là **lãng phí thời gian** - bạn đang nếm lại miếng pizza cùng vị.

Ngược lại, `age = 10` sẽ đi vào nhánh khác. Nên `10` thuộc **nhóm khác** và cần được test riêng.

#### Cách áp dụng chi tiết

**Ví dụ: Field "Tuổi" chấp nhận 18-65**

Bước 1 - Xác định các partition (nhóm):

| Partition | Range | Tại sao là 1 nhóm riêng? |
|---|---|---|
| Invalid thấp | Số < 18 | Hệ thống reject vì quá nhỏ |
| **Valid** | **18 - 65** | **Hệ thống accept** |
| Invalid cao | Số > 65 | Hệ thống reject vì quá lớn |
| Không phải số | abc, @#$, emoji | Hệ thống reject vì sai kiểu dữ liệu |
| Trống (empty) | (để trống) | Hệ thống reject vì thiếu dữ liệu |
| Số âm | -1, -100 | Hệ thống reject (tuổi không thể âm) |

Bước 2 - Chọn **1 đại diện** cho mỗi nhóm:

| Partition | Giá trị đại diện | Expected Result |
|---|---|---|
| Invalid thấp | `10` | Error: "Tuổi phải từ 18-65" |
| **Valid** | **`30`** | **Accept** |
| Invalid cao | `70` | Error: "Tuổi phải từ 18-65" |
| Không phải số | `"abc"` | Error: "Vui lòng nhập số" |
| Trống | `""` | Error: "Trường bắt buộc" |
| Số âm | `-5` | Error: "Tuổi phải từ 18-65" |

**Kết quả: 6 test cases** thay vì phải test từng số từ 1 đến 100+. Bạn vừa giảm hàng trăm test case xuống còn 6, mà vẫn cover được mọi "loại" input.

#### Mẹo thực tế

Khi gặp bất kỳ field nào, hãy tự hỏi 3 câu:
1. Có bao nhiêu **valid partition** (nhóm hợp lệ)?
2. Có bao nhiêu **invalid partition** (nhóm không hợp lệ)? Nghĩ đến: empty, sai kiểu, quá nhỏ, quá lớn, ký tự đặc biệt...
3. Chọn **1 giá trị "giữa giữa"** đại diện cho mỗi nhóm - đừng chọn giá trị ở ranh giới (để dành cho BVA)

---

### 2. Boundary Value Analysis (BVA) — Phân tích giá trị biên

#### Hiểu bản chất: Tại sao bug hay "trốn" ở ranh giới?

Hãy tưởng tượng bạn đang lái xe trên đường cao tốc. Chỗ nào hay xảy ra tai nạn nhất? **Chỗ giao nhau giữa các làn đường** - nơi ranh giới giữa làn này và làn kia. Không phải ở giữa làn.

Trong phần mềm cũng vậy. Bug không trốn ở giá trị "giữa giữa" (như tuổi 30 hay 40). Bug trốn ở **ranh giới** - nơi hệ thống phải quyết định "accept hay reject?", "đúng hay sai?".

**Boundary** (biên) = ranh giới, điểm phân cách giữa valid và invalid. **BVA** là kỹ thuật test tập trung vào chính xác những điểm ranh giới này.

#### Khoảnh khắc "Aha!": Bug kinh điển của developer

Hãy nhìn lỗi mà developer mắc phải **hàng ngày**:

```javascript
// ===== TÌNH HUỐNG: Field tuổi chấp nhận 18 đến 65 =====

// Developer viết SAI (lỗi rất phổ biến):
if (age > 18 && age < 65) {
    return "Accepted";
}
// Dòng trên dùng > thay vì >= và < thay vì <=
// Kết quả: người 18 tuổi bị REJECT (sai!)
// Kết quả: người 65 tuổi bị REJECT (sai!)
// Nhưng người 30 tuổi vẫn ACCEPT (đúng)
// => Nếu bạn chỉ test tuổi 30, bạn KHÔNG phát hiện bug này!

// Developer viết ĐÚNG:
if (age >= 18 && age <= 65) {
    return "Accepted";
}
// Dòng trên dùng >= và <= (có dấu bằng)
// Kết quả: người 18 tuổi được ACCEPT (đúng!)
// Kết quả: người 65 tuổi được ACCEPT (đúng!)
```

Bạn thấy không? Chỉ thiếu **một dấu `=`** mà hệ thống sai. Và lỗi này **chỉ xảy ra ở giá trị biên** (18 và 65). Nếu bạn test tuổi 30, mọi thứ đều ổn, bạn nghĩ hệ thống đúng. Nhưng thực tế, khách hàng 18 tuổi và 65 tuổi sẽ bị từ chối oan.

**BVA được sinh ra để bắt chính xác loại bug này.**

#### Cách áp dụng chi tiết

**Ví dụ: Field "Tuổi" chấp nhận 18-65**

Nguyên tắc BVA: test **ngay tại biên**, **ngay trên biên** và **ngay dưới biên**.

```
       INVALID        │         VALID          │       INVALID
   ◄─────────────────►│◄──────────────────────►│◄──────────────────►
                       │                        │
   ...  16   17  [18]  19  20  ...  63  64  [65]  66   67  ...
              ↑    ↑    ↑                   ↑    ↑    ↑
           dưới  BIÊN  trên              dưới  BIÊN  trên
           biên  DƯỚI  biên              biên  TRÊN  biên
```

Giải thích sơ đồ trên:
- `[18]` và `[65]` là 2 **điểm biên** (boundary) - ranh giới giữa valid và invalid
- `17` là giá trị **ngay dưới biên dưới** - nằm ở phía invalid
- `19` là giá trị **ngay trên biên dưới** - nằm ở phía valid
- `64` là giá trị **ngay dưới biên trên** - nằm ở phía valid
- `66` là giá trị **ngay trên biên trên** - nằm ở phía invalid

| Giá trị test | Expected | Lý do test | Bug nó bắt được |
|---|---|---|---|
| `17` | Invalid | Ngay dưới biên dưới | Kiểm tra biên dưới có chặn đúng không |
| `18` | **Valid** | **Biên dưới** | Bắt lỗi `> 18` thay vì `>= 18` |
| `19` | Valid | Ngay trên biên dưới | Xác nhận vùng valid hoạt động |
| `64` | Valid | Ngay dưới biên trên | Xác nhận vùng valid hoạt động |
| `65` | **Valid** | **Biên trên** | Bắt lỗi `< 65` thay vì `<= 65` |
| `66` | Invalid | Ngay trên biên trên | Kiểm tra biên trên có chặn đúng không |

**6 test cases** - mỗi cái đều "nhắm bắn" vào đúng chỗ bug hay trốn nhất.

#### EP + BVA = Combo mạnh nhất

Trong thực tế, **luôn kết hợp EP và BVA** như hai vũ khí bổ sung cho nhau:

- **EP** trả lời câu hỏi: "Test **những NHÓM nào**?" (valid, invalid thấp, invalid cao, sai kiểu...)
- **BVA** trả lời câu hỏi: "Test **GIÁ TRỊ NÀO** trong mỗi nhóm?" (giá trị biên, ngay trên biên, ngay dưới biên)

Nếu EP là bản đồ vùng miền, thì BVA là kính lúp soi vào đường biên giới.

---

### 3. Decision Table — Bảng quyết định

#### Hiểu bản chất: Menu combo nhà hàng

Bạn vào nhà hàng, menu có:
- Đồ uống: Pepsi hoặc Nước suối
- Món chính: Gà hoặc Cá
- Tráng miệng: Có hoặc Không

Hỏi: có bao nhiêu combo có thể xảy ra? Bạn liệt kê tất cả:

| Combo | Đồ uống | Món chính | Tráng miệng |
|---|---|---|---|
| 1 | Pepsi | Gà | Có |
| 2 | Pepsi | Gà | Không |
| 3 | Pepsi | Cá | Có |
| 4 | Pepsi | Cá | Không |
| 5 | Nước suối | Gà | Có |
| 6 | Nước suối | Gà | Không |
| 7 | Nước suối | Cá | Có |
| 8 | Nước suối | Cá | Không |

Tổng: 2 x 2 x 2 = **8 combo**. Bạn vừa tạo một **Decision Table** mà không biết!

**Decision Table** (bảng quyết định) là kỹ thuật liệt kê **tất cả tổ hợp** của các điều kiện (conditions), rồi xác định **hành động** (actions) tương ứng cho mỗi tổ hợp. Nó đảm bảo bạn **không bỏ sót** bất kỳ trường hợp nào.

#### Khi nào dùng?

Dùng khi business logic (quy tắc nghiệp vụ) có **nhiều điều kiện kết hợp** với nhau bằng AND/OR để tạo ra kết quả khác nhau. Ví dụ:
- Chính sách giảm giá phụ thuộc nhiều yếu tố
- Quyền truy cập phụ thuộc vai trò + cấp độ + phòng ban
- Phí vận chuyển phụ thuộc khu vực + cân nặng + loại hàng

#### Cách áp dụng chi tiết

**Ví dụ: Chính sách giảm giá e-commerce**

Quy tắc:
- Khách VIP được giảm 20%
- Đơn hàng > 500K được giảm thêm 10%
- Khách mới (first order) được giảm 15%

Bước 1 - Liệt kê tất cả conditions (điều kiện). Ở đây có 3 conditions, mỗi cái có 2 giá trị (Yes/No), nên tổng tổ hợp = 2^3 = **8 rules**:

| | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|---|---|---|---|---|---|---|---|---|
| **Conditions** | | | | | | | | |
| Khách VIP? | Y | Y | Y | Y | N | N | N | N |
| Đơn > 500K? | Y | Y | N | N | Y | Y | N | N |
| First order? | Y | N | Y | N | Y | N | Y | N |
| **Actions** | | | | | | | | |
| Giảm VIP 20% | x | x | x | x | | | | |
| Giảm đơn lớn 10% | x | x | | | x | x | | |
| Giảm first order 15% | x | | x | | x | | x | |
| **Tổng giảm** | 45% | 30% | 35% | 20% | 25% | 10% | 15% | 0% |

Bước 2 - Mỗi cột (Rule) = **1 test case**. Bạn kiểm tra hệ thống tính giảm giá đúng cho từng tổ hợp.

Ví dụ test case cho R1: Khách VIP, đặt đơn 600K, lần đầu mua hàng. Expected: giảm 45%.

#### Mẹo thực tế

- **Công thức:** Số rules = 2^n (n = số conditions). 3 conditions = 8 rules, 4 conditions = 16 rules
- Nếu **quá nhiều conditions** (5+) dẫn đến 32+ rules, hãy nhóm các conditions độc lập lại hoặc loại bỏ các tổ hợp bất khả thi (ví dụ: "khách mới" + "khách VIP" có thể không tồn tại đồng thời)
- Dùng **Excel hoặc Google Sheet** để tạo nhanh - đỡ nhầm hơn viết tay

---

### 4. State Transition — Chuyển trạng thái

#### Hiểu bản chất: Đèn giao thông

Hãy nhìn đèn giao thông ngoài đường:

```
   [Đỏ] ──hết 60 giây──► [Xanh] ──hết 30 giây──► [Vàng] ──hết 3 giây──► [Đỏ]
```

Đèn giao thông có:
- **States** (trạng thái): Đỏ, Xanh, Vàng - tại mỗi thời điểm, đèn CHỈ ở 1 trạng thái
- **Events** (sự kiện): hết giờ đếm ngược - sự kiện kích hoạt việc chuyển trạng thái
- **Transitions** (chuyển đổi): Đỏ → Xanh, Xanh → Vàng, Vàng → Đỏ - quy tắc chuyển từ trạng thái này sang trạng thái khác

**State Transition Testing** = vẽ ra tất cả trạng thái của hệ thống, tất cả sự kiện có thể xảy ra, và kiểm tra mọi đường chuyển đổi có hoạt động đúng không.

#### Khi nào dùng?

Mỗi khi hệ thống có **nhiều trạng thái** và chuyển đổi giữa chúng theo quy tắc:
- **Login flow:** Start → Attempt 1 → Attempt 2 → Locked
- **Order status:** Pending → Processing → Shipped → Delivered (hoặc Cancelled)
- **Workflow approval:** Draft → Submitted → Approved / Rejected
- **Subscription:** Trial → Active → Expired → Renewed

#### Cách áp dụng chi tiết

**Ví dụ: Login với giới hạn 3 lần sai password**

Bước 1 - Vẽ sơ đồ chuyển trạng thái:

```
                    ┌──── Correct password ────► [Logged In]
                    │
[Start] ──► [Attempt 1] ── Wrong password ──► [Attempt 2]
                                                    │
                    ┌──── Correct password ────►    │
                    │                               │
              [Logged In]  ◄── Correct password ── [Attempt 3]
                                                    │
                                              Wrong password
                                                    │
                                                    ▼
                                               [Locked]
```

Giải thích sơ đồ: khi user bắt đầu login, hệ thống ở trạng thái Attempt 1. Nếu nhập đúng password, chuyển sang Logged In. Nếu sai, chuyển sang Attempt 2. Sai 3 lần liên tiếp sẽ chuyển sang Locked (khóa tài khoản).

Bước 2 - Tạo State Transition Table (mỗi row = 1 test case):

| Current State | Event | Next State | Action |
|---|---|---|---|
| Start | Nhập credentials | Attempt 1 | Hiển thị form login |
| Attempt 1 | Correct password | Logged In | Chuyển đến dashboard |
| Attempt 1 | Wrong password | Attempt 2 | Hiển thị "Sai mật khẩu. Còn 2 lần" |
| Attempt 2 | Correct password | Logged In | Chuyển đến dashboard |
| Attempt 2 | Wrong password | Attempt 3 | Hiển thị "Sai mật khẩu. Còn 1 lần" |
| Attempt 3 | Correct password | Logged In | Chuyển đến dashboard |
| Attempt 3 | Wrong password | Locked | Hiển thị "Tài khoản đã bị khóa" |
| Locked | Bất kỳ input nào | Locked | Hiển thị "Liên hệ admin" |

**8 test cases** - cover hết mọi transition. Bạn đảm bảo rằng:
- Đúng password luôn cho vào, bất kể đang ở attempt nào
- Sai password 3 lần thì khóa
- Sau khi khóa, không thể đăng nhập nữa

#### Tip quan trọng

Ngoài test các transition **hợp lệ**, hãy nghĩ đến các transition **không hợp lệ** (invalid transitions). Ví dụ: từ trạng thái Locked, user có thể gọi API trực tiếp để bypass và login được không? Đây là loại bug bảo mật nghiêm trọng.

---

### 5. Use Case / User Story Testing

#### Hiểu bản chất: Test như người dùng thật

Các kỹ thuật trên đều tập trung vào **từng field** hoặc **từng logic** riêng lẻ. Nhưng user thật không dùng app theo kiểu "test field tuổi" rồi "test field email". User thật sẽ **đi qua một hành trình**: mở app → tìm sản phẩm → thêm vào giỏ → thanh toán → nhận hàng.

**Use Case Testing** = test theo **hành trình thực tế** của user, từ đầu đến cuối (end-to-end).

Một Use Case gồm:
- **Actor:** ai thực hiện? (customer, admin, system)
- **Precondition:** điều kiện trước khi bắt đầu (đã đăng nhập, có hàng trong giỏ...)
- **Main flow:** hành trình chính - mọi thứ đều suôn sẻ (happy path)
- **Alternative flows:** các nhánh rẽ khác (user thay đổi ý định, chọn phương thức khác...)
- **Exception flows:** khi có lỗi xảy ra (hết hàng, thanh toán thất bại...)

#### Cách áp dụng chi tiết

**Ví dụ: User Story "Thanh toán đơn hàng"**

```
User Story: As a customer, I want to checkout my cart
            so that I can receive my order.

Acceptance Criteria:
- Cart phải có ít nhất 1 item
- Shipping address là bắt buộc
- Payment method phải hợp lệ
- Gửi email xác nhận sau khi thanh toán thành công
```

Test scenarios - bao gồm cả happy path, alternative và exception:

| # | Loại | Scenario | Expected |
|---|---|---|---|
| 1 | Happy path | Thêm hàng → Checkout → Điền địa chỉ → Thanh toán thành công | Đơn hàng tạo, email gửi |
| 2 | Exception | Giỏ hàng trống → Nhấn Checkout | Hiển thị "Giỏ hàng trống" |
| 3 | Exception | Checkout → Bỏ trống địa chỉ → Nhấn Tiếp | Validation error trên địa chỉ |
| 4 | Exception | Thanh toán bằng thẻ hết hạn | Thông báo thẻ bị từ chối |
| 5 | Exception | Thanh toán → Mạng bị ngắt giữa chừng | Hiển thị nút thử lại, không charge 2 lần |
| 6 | Alternative | Áp mã giảm giá → Thanh toán | Giá giảm đúng theo mã |
| 7 | Alternative | Thêm hàng → Xóa hết → Nhấn Checkout | Hiển thị "Giỏ hàng trống" |

Điểm mạnh của Use Case Testing: nó phát hiện các bug **tích hợp** - bug chỉ xuất hiện khi nhiều bước kết hợp với nhau mà test đơn lẻ từng field không phát hiện được.

---

## White-box Techniques

**White-box** = bạn **mở nắp hộp ra, nhìn thấy code bên trong**. Thường do developer hoặc SDET (Software Development Engineer in Test) thực hiện.

### Tại sao QA cần biết?

Dù bạn không trực tiếp viết white-box test, bạn **cần hiểu** vì:
- Khi dev nói "unit test coverage 80%", bạn phải hiểu con số đó nghĩa là gì
- Bạn cần biết **phần nào chưa được cover** để tập trung test thêm ở đó
- Trong cuộc họp, bạn có thể hỏi "Branch coverage hay statement coverage?" - câu hỏi này cho thấy bạn hiểu sâu

### Code Coverage là gì?

**Code coverage** (độ phủ code) = **phần trăm code đã được chạy qua** khi test. Giống như bạn đi thăm một tòa nhà: coverage 80% nghĩa là bạn đã vào 80% số phòng. Còn 20% phòng chưa ai kiểm tra - bug có thể trốn ở đó.

Có 3 mức coverage từ yếu đến mạnh:

### 1. Statement Coverage — Độ phủ câu lệnh

**Mục tiêu:** Mỗi **dòng code** (statement) được chạy ít nhất 1 lần.

```javascript
function calculateDiscount(price, isVIP) {
    let discount = 0;           // Dòng 1: khởi tạo biến discount = 0
    if (isVIP) {                // Dòng 2: kiểm tra có phải VIP không
        discount = price * 0.2; // Dòng 3: nếu VIP thì giảm 20%
    }
    return price - discount;    // Dòng 4: trả về giá sau giảm
}
```

Test 1 case: `calculateDiscount(100, true)` - chạy qua Dòng 1 → 2 → 3 → 4. Tất cả 4 dòng đều được chạy → **100% statement coverage**.

**Nhưng có vấn đề:** bạn chưa bao giờ test trường hợp `isVIP = false`! Nếu developer viết sai logic cho nhánh false, bạn không biết. Statement coverage 100% nhưng vẫn có bug. Đây là lý do statement coverage được coi là **mức yếu nhất**.

### 2. Branch Coverage — Độ phủ nhánh

**Mục tiêu:** Mỗi **nhánh** (branch) của mọi câu lệnh điều kiện đều được chạy ít nhất 1 lần. Nhánh nghĩa là: nhánh `if = true` VÀ nhánh `if = false`.

```javascript
function calculateDiscount(price, isVIP) {
    let discount = 0;
    if (isVIP) {                // 2 nhánh: true VÀ false
        discount = price * 0.2;
    }
    return price - discount;
}
```

Cần **2 test cases**:
1. `calculateDiscount(100, true)` → nhánh `isVIP = true` được chạy
2. `calculateDiscount(100, false)` → nhánh `isVIP = false` được chạy

Cả 2 nhánh đều covered → **100% branch coverage**. Branch coverage **mạnh hơn** statement coverage vì nó buộc bạn phải test cả 2 phía của mỗi điều kiện.

### 3. Path Coverage — Độ phủ đường đi

**Mục tiêu:** Mỗi **đường đi** (path) xuyên qua code được chạy ít nhất 1 lần.

Khi code có nhiều câu lệnh if, số đường đi tăng theo cấp số nhân:
- 1 if → 2 paths
- 2 if → 4 paths
- 3 if → 8 paths
- n if → 2^n paths

Với code thực tế có 10 câu if, cần 1,024 test cases. **Path coverage 100% gần như bất khả thi** với code phức tạp.

### Coverage trong thực tế

| Metric | Target phổ biến | Ý nghĩa |
|---|---|---|
| Statement | >= 80% | Mức tối thiểu chấp nhận được |
| Branch | >= 80% | Mức khuyến nghị cho hầu hết dự án |
| Path | Không đặt target | Quá khó để đạt 100% |

::: warning Cẩn thận với "100% coverage"
100% code coverage **KHÔNG có nghĩa là không có bug**. Coverage chỉ đo **"code nào đã được chạy qua"**, không đo **"code chạy đúng hay sai"**. Một test chạy qua mọi dòng code nhưng không có assertion (câu kiểm tra kết quả) nào thì vẫn vô nghĩa - giống như bạn vào mọi phòng trong tòa nhà nhưng không kiểm tra gì cả.
:::

---

## Experience-based Techniques

Hai kỹ thuật trước (Black-box và White-box) đều dựa vào **quy tắc rõ ràng**. Nhưng trong thực tế, có những bug mà không quy tắc nào bắt được - bạn cần **kinh nghiệm** và **trực giác** của người đã test nhiều.

Giống như bác sĩ lâu năm: đôi khi nhìn bệnh nhân là biết bệnh gì, không cần đợi kết quả xét nghiệm. Không phải vì họ giỏi đoán, mà vì họ **đã thấy pattern này hàng trăm lần**.

### 1. Error Guessing — Đoán lỗi

**Error Guessing** = dựa vào kinh nghiệm để đoán **"chỗ nào hay lỗi?"**. Không có công thức cụ thể - bạn xây dựng kỹ năng này qua thời gian.

Dưới đây là danh sách các "ổ bug" phổ biến mà QA kinh nghiệm luôn kiểm tra:

**Giá trị đặc biệt:**
- **Null / Empty:** để trống field, submit form rỗng
- **Số 0:** nhiều developer quên xử lý trường hợp chia cho 0, số lượng = 0
- **Số âm:** tuổi -1, giá tiền -100, số lượng -5
- **Số rất lớn:** nhập 999999999999 vào field giá tiền

**Ký tự nguy hiểm:**
- **Script injection:** nhập `<script>alert('hack')</script>` vào field tên
- **SQL injection:** nhập `' OR 1=1 --` vào field login
- **Emoji:** nhập tên chứa emoji, nhiều hệ thống crash vì không hỗ trợ Unicode đầy đủ
- **Chuỗi siêu dài:** paste 10,000 ký tự vào field có max length

**Tình huống bất ngờ:**
- **Concurrent actions:** 2 user cùng sửa 1 record cùng lúc - ai thắng?
- **Double submit:** nhấn nút Submit 2 lần liên tiếp thật nhanh - tạo 2 đơn hàng?
- **Back button:** nhấn nút Back của browser sau khi thanh toán - charge 2 lần?
- **Timezone:** user ở Việt Nam (UTC+7) đặt hàng, server ở Mỹ (UTC-5) - ngày giờ hiển thị sai?

### 2. Checklist-based Testing

**Checklist-based Testing** = dùng danh sách kiểm tra có sẵn, được xây dựng từ kinh nghiệm của cả team qua nhiều dự án. Giống như pilot kiểm tra máy bay trước khi cất cánh - không phải vì họ không biết, mà vì checklist đảm bảo **không quên bất kỳ điều gì**.

**Ví dụ: Checklist cho Form Input**

- [ ] Required fields (trường bắt buộc) có hiển thị dấu * không?
- [ ] Validation message (thông báo lỗi) có rõ ràng, cụ thể không?
- [ ] Tab order (thứ tự nhấn Tab) có đúng từ trên xuống dưới không?
- [ ] Copy/Paste có hoạt động bình thường không?
- [ ] Autofill (tự điền) của browser có hoạt động không?
- [ ] Nhấn Enter có submit form không?
- [ ] Double-click nút Submit có tạo ra 2 bản ghi trùng không?
- [ ] Nhấn Back button có mất dữ liệu đã nhập không?
- [ ] Resize browser nhỏ lại, form có bị vỡ layout không?
- [ ] Tắt JavaScript, form có fallback (xử lý thay thế) hợp lý không?

Khác biệt giữa Error Guessing và Checklist: Error Guessing phụ thuộc **cá nhân** (mỗi người đoán khác nhau), còn Checklist là **tài sản chung** của team (ai cũng dùng được).

---

## Khi nào dùng kỹ thuật nào?

Đây là câu hỏi thực tế nhất. Không có kỹ thuật nào "tốt nhất" - chỉ có kỹ thuật **phù hợp nhất** cho từng tình huống:

| Tình huống | Kỹ thuật phù hợp | Lý do |
|---|---|---|
| Input field có range cụ thể (tuổi 18-65, giá 0-10M) | **EP + BVA** | Giảm số test case, tập trung vào ranh giới |
| Business logic phức tạp, nhiều điều kiện AND/OR | **Decision Table** | Liệt kê mọi tổ hợp, không bỏ sót |
| Hệ thống có workflow, trạng thái thay đổi | **State Transition** | Cover mọi đường chuyển đổi |
| Test end-to-end một tính năng hoàn chỉnh | **Use Case Testing** | Test như user thật sử dụng |
| Dev yêu cầu code coverage | **White-box** | Statement → Branch → Path |
| Không có requirement rõ ràng, feature mới | **Error Guessing + Exploratory** | Dùng kinh nghiệm để tìm bug |
| Regression test (test lại feature cũ) | **Checklist-based** | Đảm bảo không quên case nào |

**Pro tip:** Trong thực tế, bạn **luôn kết hợp nhiều kỹ thuật**. Ví dụ cho một Login form:
- EP + BVA cho các field input (email, password)
- State Transition cho flow login (attempt 1 → 2 → 3 → locked)
- Error Guessing cho các tình huống bất ngờ (SQL injection, double submit)
- Checklist cho các tiêu chuẩn UI/UX chung

---

## Tóm tắt chương

| Technique | Dùng khi | Key idea | Dễ nhớ |
|---|---|---|---|
| **EP** | Input có range/groups | 1 đại diện per group | Pizza: nếm 1 miếng biết cả nhóm |
| **BVA** | Input có boundaries | Test ở ranh giới | Bug trốn ở biên giới |
| **Decision Table** | Nhiều conditions kết hợp | Liệt kê mọi tổ hợp | Menu combo nhà hàng |
| **State Transition** | Hệ thống có states | Test mọi transitions | Đèn giao thông |
| **Use Case** | End-to-end flows | Test như user thật | Hành trình khách hàng |
| **White-box** | Code coverage | Statement → Branch → Path | Mở nắp hộp, nhìn code |
| **Error Guessing** | Kinh nghiệm | Đoán chỗ hay lỗi | Bác sĩ lâu năm |
| **Checklist** | Regression, tiêu chuẩn | Danh sách không quên | Pilot trước khi bay |
