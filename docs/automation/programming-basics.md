# Lập trình cơ bản cho QA

## Trước khi bắt đầu: Tại sao bạn PHẢI đọc bài này?

Hãy nhìn vào con số thực tế trên thị trường Việt Nam (2024-2025):

| Vị trí | Mức lương/tháng | Yêu cầu chính |
|---|---|---|
| **Manual QA** (test tay) | 8 - 15 triệu | Không cần code |
| **Automation QA** (test tự động) | 20 - 40 triệu | Biết lập trình + framework |
| **SDET** (kỹ sư phát triển test) | 30 - 60 triệu | Code tốt như developer |

Chênh lệch **gấp 2-4 lần** chỉ vì một kỹ năng: **lập trình**.

Bạn không cần trở thành developer. Bạn chỉ cần hiểu đủ để:
- Viết automation test scripts
- Đọc hiểu code của developer (để biết test gì, ở đâu)
- Debug khi test fail (tìm nguyên nhân lỗi)
- Nói chuyện cùng "ngôn ngữ" với dev team

::: tip Aha moment
Sự khác biệt giữa Manual QA lương 10 triệu và Automation QA lương 35 triệu nằm ở khoảng **8 tuần học lập trình nghiêm túc**. Đó là khoản đầu tư có ROI (Return On Investment - tỷ suất lợi nhuận) cao nhất trong sự nghiệp QA.
:::

---

## 1. Lập trình là gì? -- "Viết công thức nấu ăn cho máy tính"

### Bản chất (Essence)

Hãy tưởng tượng bạn viết **công thức nấu phở** cho một người chưa biết nấu ăn:

```
Bước 1: Đun 2 lít nước sôi
Bước 2: Cho xương bò vào, ninh 2 tiếng
Bước 3: Vớt bọt, thêm hành nướng
Bước 4: Nêm nước mắm, muối, đường
Bước 5: Trụng bánh phở qua nước sôi
Bước 6: Xếp phở ra tô, chan nước dùng
```

Lập trình **y hệt vậy** -- nhưng thay vì viết cho người, bạn viết cho **máy tính**. Thay vì "đun nước", bạn viết "mở trình duyệt". Thay vì "cho gia vị", bạn viết "nhập email vào ô login".

```javascript
// Công thức "nấu" một bài test login
// (Đọc từ trên xuống, từng bước một, y như công thức nấu ăn)

// Bước 1: Mở trình duyệt, vào trang login
await page.goto('https://example.com/login');

// Bước 2: Nhập email vào ô email
await page.fill('#email', 'test@mail.com');

// Bước 3: Nhập password vào ô password
await page.fill('#password', 'Pass@123');

// Bước 4: Click nút Login
await page.click('#login-btn');

// Bước 5: Kiểm tra -- đã vào Dashboard chưa?
await expect(page).toHaveURL('/dashboard');
```

::: tip Aha moment
Lập trình không phải "toán học cao siêu". Lập trình là **viết hướng dẫn từng bước** cho một "đứa trẻ rất nhanh nhưng rất ngốc" (máy tính). Nó làm ĐÚNG những gì bạn viết -- không hơn, không kém. Viết sai? Nó làm sai. Viết đúng? Nó làm đúng, lặp lại 1000 lần không mệt.
:::

---

## 2. Ngôn ngữ lập trình -- "Phiên dịch viên giữa bạn và máy tính"

### Bản chất (Essence)

Bạn muốn nói chuyện với người Nhật nhưng bạn chỉ biết tiếng Việt. Bạn cần **phiên dịch viên**.

Máy tính cũng vậy. Nó chỉ hiểu **0 và 1** (gọi là mã nhị phân / binary). Bạn không thể viết "hãy click nút Login" bằng 0 và 1 được. Nên bạn cần **phiên dịch viên** -- đó chính là **ngôn ngữ lập trình** (programming language).

```
Bạn (con người)
    ↓ viết bằng ngôn ngữ lập trình (JavaScript, Python...)
Phiên dịch viên (compiler/interpreter)
    ↓ dịch sang mã máy (01001010...)
Máy tính (hiểu và thực hiện)
```

Có hàng trăm ngôn ngữ lập trình, giống như có hàng trăm ngôn ngữ trên thế giới. Nhưng QA chỉ cần quan tâm vài ngôn ngữ phổ biến: **JavaScript**, **Python**, **Java**.

### Compiled vs Interpreted -- Hai kiểu "phiên dịch"

Tưởng tượng bạn có một cuốn sách tiếng Anh và cần đọc bằng tiếng Việt:

**Compiled (biên dịch) = Dịch cả cuốn sách trước, rồi mới đọc**

```
Cuốn sách tiếng Anh (source code)
    ↓ Phiên dịch viên ngồi dịch hết cả cuốn (compiling)
    ↓ ... mất thời gian ...
Cuốn sách tiếng Việt hoàn chỉnh (executable)
    ↓ Bạn đọc rất nhanh, không cần chờ dịch nữa
```

Ví dụ: **Java, C, C++, Go**. Chạy nhanh, nhưng mỗi lần sửa code phải dịch lại cả cuốn.

**Interpreted (thông dịch) = Dịch từng trang khi bạn đọc**

```
Cuốn sách tiếng Anh (source code)
    ↓ Phiên dịch viên ngồi cạnh, dịch trang nào đọc trang đó
    ↓ Đọc ngay, không cần chờ dịch hết
    ↓ Muốn sửa trang nào? Sửa xong đọc lại ngay trang đó
```

Ví dụ: **JavaScript, Python, Ruby**. Chạy chậm hơn một chút, nhưng viết xong chạy ngay, sửa nhanh.

::: tip Aha moment
QA Automation chủ yếu dùng **interpreted languages** (JavaScript, Python) vì: viết test xong --> chạy thử ngay --> thấy lỗi --> sửa --> chạy lại. Vòng lặp này cần NHANH. Không ai muốn ngồi chờ compile 5 phút mỗi lần sửa 1 dòng test.
:::

### QA nên học ngôn ngữ nào?

| Ngôn ngữ | Framework test phổ biến | Khi nào chọn |
|---|---|---|
| **JavaScript/TypeScript** | Playwright, Cypress, WebdriverIO | Web testing, phổ biến nhất |
| **Python** | pytest, Selenium, Robot Framework | API testing, dự án data |
| **Java** | Selenium, TestNG, RestAssured | Dự án enterprise lớn |

**Recommendation:** Học **JavaScript** trước. Lý do:
1. Playwright (framework mạnh nhất hiện tại) dùng JS/TS
2. Frontend của mọi web app đều là JavaScript -- hiểu JS = hiểu code dev viết
3. Cộng đồng lớn nhất, tài liệu nhiều nhất
4. Sau khi vững JS, chuyển sang **TypeScript** (phiên bản nâng cấp, thêm type safety) chỉ mất 1 tuần

---

## 3. Variables -- "Hộp có dán nhãn"

### Bản chất (Essence)

Tưởng tượng bạn có **nhiều hộp carton**. Mỗi hộp bạn **dán nhãn** ở ngoài và **bỏ đồ vào** bên trong.

```
 ┌───────────┐    ┌───────────┐    ┌───────────┐
 │  "An"     │    │   25      │    │   true    │
 │           │    │           │    │           │
 └───────────┘    └───────────┘    └───────────┘
   name             age             isLoggedIn
   (nhãn)           (nhãn)          (nhãn)
```

- **Hộp** = vùng nhớ trong máy tính
- **Nhãn** = tên biến (variable name)
- **Đồ bên trong** = giá trị (value)

Khi cần dùng, bạn gọi tên nhãn: "Lấy hộp `name` ra" --> máy tính trả về `"An"`.

### Code thực tế

```javascript
// ===== KHAI BÁO BIẾN =====

// "let" = tạo hộp, CÓ THỂ thay đồ bên trong sau này
let userName = "Nguyen Van An";   // Tạo hộp "userName", bỏ "Nguyen Van An" vào

// "const" = tạo hộp, KHÔNG ĐƯỢC thay đồ (constant = hằng số)
const maxRetries = 3;             // Hộp "maxRetries" luôn chứa số 3, không đổi

// "let" cho giá trị thay đổi được
let isLoggedIn = false;           // Ban đầu chưa login --> false

// ===== SỬ DỤNG BIẾN =====

// Đọc giá trị: gọi tên nhãn
console.log(userName);            // In ra màn hình: "Nguyen Van An"

// Thay đổi giá trị (chỉ "let", không "const")
userName = "Tran Thi Binh";      // Đổi đồ trong hộp userName
isLoggedIn = true;                // User đã login --> đổi thành true

// Lỗi nếu thay đổi const
// maxRetries = 5;                // Lỗi! const không cho thay đổi
```

::: tip Aha moment
Khi nào dùng `let`, khi nào `const`? Quy tắc đơn giản: **mặc định dùng `const`**. Chỉ dùng `let` khi bạn BIẾT giá trị sẽ thay đổi. Trong automation test, hầu hết biến là `const` vì test data thường cố định.
:::

---

## 4. Data Types -- "Loại đồ trong hộp"

### Bản chất (Essence)

Quay lại ví dụ hộp carton. Mỗi hộp chứa **loại đồ khác nhau**: hộp chứa sách (chữ), hộp chứa bi (số), hộp chứa công tắc (bật/tắt). Data type (kiểu dữ liệu) cho máy tính biết **trong hộp là loại gì**.

| Loại đồ (Data Type) | Giải thích | Ví dụ |
|---|---|---|
| `string` (chuỗi) | Chữ, văn bản, đặt trong dấu ngoặc kép | `"Hello"`, `"test@mail.com"` |
| `number` (số) | Số nguyên hoặc số thập phân | `42`, `3.14`, `-10` |
| `boolean` (đúng/sai) | Chỉ có 2 giá trị: `true` hoặc `false` | `true`, `false` |
| `array` (mảng) | Danh sách nhiều thứ | `["Chrome", "Firefox"]` |
| `object` (đối tượng) | Nhóm nhiều thông tin liên quan | `{ name: "An", age: 25 }` |
| `null` | Hộp trống **có chủ đích** | `null` |
| `undefined` | Hộp chưa bỏ gì vào | `undefined` |

### Code thực tế

```javascript
// ===== STRING (chuỗi chữ) =====
const email = "test@mail.com";       // Chuỗi ký tự, đặt trong ""
const greeting = `Hello ${email}`;   // Template literal: chèn biến vào chuỗi
// greeting = "Hello test@mail.com"  // Dấu ` ` cho phép dùng ${} để chèn

// ===== NUMBER (số) =====
const price = 500000;                // Số nguyên
const discount = price * 0.2;        // Phép tính: 500000 * 0.2 = 100000
const finalPrice = price - discount; // 500000 - 100000 = 400000

// ===== BOOLEAN (đúng/sai) =====
const isVisible = true;              // Element đang hiển thị? Đúng
const hasError = false;              // Có lỗi không? Không
// Boolean dùng NHIỀU trong automation: kiểm tra element có hiện không,
// nút có enable không, checkbox có được tick không...

// ===== ARRAY (mảng -- danh sách) =====
const browsers = ["Chrome", "Firefox", "Safari"];
// Tưởng tượng: một hàng hộp đánh số từ 0
// browsers[0] = "Chrome"   (hộp số 0)
// browsers[1] = "Firefox"  (hộp số 1)
// browsers[2] = "Safari"   (hộp số 2)
// browsers.length = 3      (tổng cộng 3 hộp)

// ===== OBJECT (đối tượng -- nhóm thông tin) =====
const user = {
  name: "Nguyen Van An",     // thuộc tính name
  email: "an@mail.com",      // thuộc tính email
  age: 25,                   // thuộc tính age
  isVIP: true                // thuộc tính isVIP
};
// Truy cập: user.name --> "Nguyen Van An"
// Truy cập: user.email --> "an@mail.com"

// ===== NULL vs UNDEFINED =====
let result = null;            // Bạn CHỦ ĐÍCH để hộp trống (chưa có kết quả)
let something;                // Bạn tạo hộp nhưng QUÊN bỏ đồ vào --> undefined
```

::: tip Aha moment
Trong automation, bạn dùng `object` RẤT NHIỀU để tổ chức test data:
```javascript
const testData = {
  validUser: { email: "good@mail.com", password: "Pass@123" },
  invalidUser: { email: "bad", password: "" }
};
```
Gọn gàng, dễ đọc, dễ maintain hơn nhiều so với viết rải rác 4 biến riêng lẻ.
:::

---

## 5. Conditionals -- "Ngã rẽ trên đường đi"

### Bản chất (Essence)

Mỗi sáng bạn ra khỏi nhà và phải **quyết định**:

```
Trời mưa không?
    ├── Có mưa    --> Mang ô
    └── Không mưa --> Đeo kính mát
```

Đó là **conditional** (điều kiện). Máy tính cũng cần ra quyết định: **NẾU** điều kiện đúng **THÌ** làm A, **KHÔNG THÌ** làm B.

### Code thực tế

```javascript
// ===== IF...ELSE cơ bản =====
const age = 17;

if (age >= 18) {                   // NẾU tuổi >= 18
  console.log("Được phép đăng ký");  //   THÌ in "Được phép đăng ký"
} else {                           // KHÔNG THÌ
  console.log("Chưa đủ tuổi");      //   in "Chưa đủ tuổi"
}
// Kết quả: "Chưa đủ tuổi" (vì 17 < 18)

// ===== NHIỀU ĐIỀU KIỆN =====
const score = 85;

if (score >= 90) {                 // NẾU điểm >= 90
  console.log("Excellent");         //   THÌ xuất sắc
} else if (score >= 70) {          // KHÔNG THÌ NẾU >= 70
  console.log("Good");              //   THÌ tốt (dòng này chạy vì 85 >= 70)
} else if (score >= 50) {          // KHÔNG THÌ NẾU >= 50
  console.log("Average");           //   THÌ trung bình
} else {                           // TẤT CẢ KHÔNG THỎA
  console.log("Fail");              //   THÌ trượt
}
```

**Trong automation test:**

```javascript
// Ví dụ thực tế: đóng popup nếu nó hiện ra
// (Nhiều web hiện popup quảng cáo ngẫu nhiên, nếu không đóng thì test bị chặn)

if (await page.isVisible('#popup-close')) {  // NẾU nút đóng popup hiển thị
  await page.click('#popup-close');           //   THÌ click đóng nó đi
}
// Nếu popup không hiện? Không làm gì, test chạy tiếp bình thường
```

---

## 6. Loops -- "Làm đi làm lại, không cần viết lại"

### Bản chất (Essence)

Sếp bảo bạn: "Test cái form này trên Chrome, rồi test trên Firefox, rồi test trên Safari."

**Cách dở:** Viết 3 bài test riêng biệt, copy-paste, chỉ đổi tên trình duyệt.

**Cách hay:** Viết 1 bài test, rồi bảo máy tính: "**Lặp lại** bài này cho mỗi trình duyệt trong danh sách."

Đó là **loop** (vòng lặp) -- viết một lần, chạy nhiều lần.

### Code thực tế

```javascript
// ===== FOR...OF -- duyệt từng phần tử trong danh sách =====
const browsers = ["Chrome", "Firefox", "Safari"];

for (const browser of browsers) {       // VỚI MỖI browser trong danh sách
  console.log(`Testing on ${browser}`);  //   in ra "Testing on ..."
}
// Kết quả:
// Testing on Chrome
// Testing on Firefox
// Testing on Safari
// --> 3 dòng code thay vì 9 dòng nếu viết riêng từng cái!

// ===== FOR cổ điển -- khi cần biết đang ở lần lặp thứ mấy =====
for (let i = 0; i < 3; i++) {           // i chạy từ 0 đến 2 (tổng 3 lần)
  console.log(`Lần thử ${i + 1}`);      //   in "Lần thử 1", "Lần thử 2", "Lần thử 3"
}

// ===== WHILE -- lặp cho đến khi điều kiện sai =====
let retries = 0;                         // Đếm số lần thử
while (retries < 3) {                    // TRONG KHI số lần thử < 3
  console.log(`Attempt ${retries + 1}`); //   in ra lần thử hiện tại
  retries++;                             //   tăng đếm lên 1 (++ nghĩa là +1)
}
```

**Ứng dụng thực tế -- Data-driven testing:**

```javascript
// Thay vì viết 3 test riêng, dùng loop chạy 1 test với 3 bộ data
const testCases = [
  { email: "valid@mail.com", password: "Pass@123", shouldPass: true },
  { email: "invalid-email",  password: "Pass@123", shouldPass: false },
  { email: "",               password: "",          shouldPass: false },
];

for (const tc of testCases) {                // VỚI MỖI bộ test data
  test(`Login with ${tc.email}`, async () => { //   tạo 1 test case
    await page.fill('#email', tc.email);        //   nhập email từ data
    await page.fill('#password', tc.password);  //   nhập password từ data
    await page.click('#login-btn');             //   click login
    // Kiểm tra kết quả dựa trên shouldPass
  });
}
// Kết quả: 3 test cases từ 1 đoạn code. Thêm data? Thêm 1 dòng vào mảng.
```

::: tip Aha moment
Sức mạnh thực sự của loop: bạn có 100 bộ test data? Thêm 100 dòng vào mảng `testCases`, KHÔNG cần sửa logic test. Đây là lý do automation mạnh hơn test tay -- thêm data thì effort gần như bằng 0.
:::

---

## 7. Functions -- "Công thức viết một lần, nấu nhiều lần"

### Bản chất (Essence)

Bạn có **công thức pha cà phê sữa đá**. Mỗi sáng bạn không cần nghĩ lại từ đầu -- cứ theo công thức mà làm. Đổi loại cà phê? Đổi lượng sữa? Chỉ thay **nguyên liệu đầu vào**, các bước vẫn y nguyên.

Function (hàm) = **công thức** bạn viết một lần và "nấu" (gọi lại) bao nhiêu lần tùy ý.

```
Công thức phaCafe(loaiCafe, luongSua):
  Bước 1: Pha loaiCafe với nước nóng
  Bước 2: Thêm luongSua ml sữa
  Bước 3: Thêm đá
  Bước 4: Trả về ly cà phê

--> phaCafe("Robusta", 30)  = ly Robusta với 30ml sữa
--> phaCafe("Arabica", 50)  = ly Arabica với 50ml sữa
```

### Code thực tế

```javascript
// ===== KHAI BÁO FUNCTION =====

// "function" = từ khóa tạo công thức
// "calculateDiscount" = tên công thức
// "(price, percent)" = nguyên liệu đầu vào (parameters / tham số)
// "return" = kết quả trả ra (output)
function calculateDiscount(price, percent) {
  const discountAmount = price * percent / 100;  // Tính số tiền giảm
  return price - discountAmount;                  // Trả về giá sau giảm
}

// ===== GỌI FUNCTION =====
const result1 = calculateDiscount(500000, 20);  // Gọi với giá 500k, giảm 20%
console.log(result1);                            // 400000

const result2 = calculateDiscount(1000000, 10); // Gọi lại với data khác
console.log(result2);                            // 900000
// --> Viết 1 lần, dùng bao nhiêu lần cũng được!

// ===== ARROW FUNCTION (cú pháp ngắn, rất phổ biến) =====
// Dấu "=>" (mũi tên) thay cho từ "function"
const isAdult = (age) => age >= 18;
// Nghĩa: nhận "age", trả về kết quả "age >= 18" (true hoặc false)

console.log(isAdult(20));  // true  (20 >= 18 đúng)
console.log(isAdult(15));  // false (15 >= 18 sai)
```

**Ứng dụng trong automation -- Helper function:**

```javascript
// Viết công thức login MỘT LẦN
async function login(page, email, password) {
  await page.goto('/login');               // Bước 1: Mở trang login
  await page.fill('#email', email);        // Bước 2: Nhập email
  await page.fill('#password', password);  // Bước 3: Nhập password
  await page.click('#login-btn');          // Bước 4: Click nút Login
}

// Dùng trong mọi test -- không bao giờ phải viết lại 4 bước trên
test('Xem dashboard sau login', async ({ page }) => {
  await login(page, 'user1@mail.com', 'Pass@123');  // Gọi công thức
  await expect(page).toHaveURL('/dashboard');         // Kiểm tra kết quả
});

test('Xem profile sau login', async ({ page }) => {
  await login(page, 'user2@mail.com', 'Pass@456');  // Gọi lại, data khác
  await page.click('#profile-link');                  // Tiếp tục test
});
```

::: tip Aha moment
Nếu UI thay đổi (ví dụ: đổi `#login-btn` thành `#submit-btn`), bạn chỉ sửa **1 chỗ** trong function `login()`. Tất cả 50 tests dùng function đó tự động được cập nhật. Không có function? Sửa 50 chỗ. Đây gọi là nguyên tắc **DRY** -- Don't Repeat Yourself (đừng lặp lại chính mình).
:::

---

## 8. Async/Await -- CONCEPT QUAN TRỌNG NHẤT

### Bản chất (Essence) -- Đọc kỹ phần này!

Đây là phần **gây ra nhiều lỗi nhất** cho người mới. Hiểu được async/await = giảm 80% lỗi flaky test (test lúc pass lúc fail).

**Vấn đề:** Web pages RẤT CHẬM. Khi bạn click nút "Login", mọi thứ KHÔNG xảy ra tức thì:

```
Click "Login" --> Gửi request lên server --> Server xử lý --> Server trả kết quả
                  (mất 200ms)               (mất 500ms)      (mất 200ms)

Tổng: khoảng 1 giây. Trong thế giới máy tính, 1 giây = VÔ CỰC.
```

Nếu code chạy tuần tự bình thường (synchronous):

```javascript
// Code chạy ngay lập tức, KHÔNG ĐỢI
page.click('#login-btn');           // Gửi lệnh click (chưa xong)
page.textContent('#welcome');       // Lấy text NGAY --> trang chưa load --> LỖI!
```

Giống như bạn **ấn nút máy giặt rồi lấy quần áo ra phơi ngay** -- quần áo còn chưa giặt xong!

**Giải pháp: `await`** = "ĐỢI cho xong rồi mới làm tiếp"

```javascript
await page.click('#login-btn');     // ĐỢI click xong (trang bắt đầu load)
await page.textContent('#welcome'); // ĐỢI element xuất hiện --> lấy text
```

Giống như bạn **ấn nút máy giặt, ĐỢI máy giặt xong, RỒI MỚI lấy ra phơi**.

### `async` và `await` là gì?

```javascript
// "async" = đánh dấu: "function này CÓ CHỨA các bước cần đợi"
// (bắt buộc phải có async thì mới dùng được await bên trong)

// "await" = "ĐỢI dòng này hoàn thành rồi mới chạy dòng tiếp theo"

// Trong Playwright, MỌI test function đều là async
test('login test', async ({ page }) => {
  // async ở trên ^^^^^ cho phép dùng await bên dưới

  await page.goto('https://example.com');     // ĐỢI trang load xong
  await page.fill('#email', 'test@mail.com'); // ĐỢI điền email xong
  await page.fill('#password', 'Pass@123');   // ĐỢI điền password xong
  await page.click('#login');                  // ĐỢI click xong
  await expect(page).toHaveURL('/dashboard');  // ĐỢI URL thay đổi, rồi kiểm tra
});
```

### Lỗi kinh điển -- Quên `await`

::: danger Lỗi #1 của QA mới: quên await
```javascript
// SAI -- thiếu await --> test FLAKY (lúc pass lúc fail ngẫu nhiên)
page.click('#button');             // Gửi lệnh click nhưng KHÔNG ĐỢI
page.fill('#input', 'text');       // Fill ngay --> element chưa sẵn sàng --> FAIL

// ĐÚNG -- có await --> test ỔN ĐỊNH
await page.click('#button');       // ĐỢI click xong
await page.fill('#input', 'text'); // RỒI MỚI fill
```

Khi test lúc pass lúc fail mà bạn không hiểu tại sao? **Kiểm tra await đầu tiên.** 90% là thiếu await ở đâu đó.
:::

::: tip Aha moment
Tại sao không bắt máy tính tự đợi luôn, tại sao phải viết `await`? Vì đôi khi bạn MUỐN chạy nhiều việc cùng lúc (song song) để nhanh hơn. `await` cho bạn QUYỀN CHỌN: dòng nào cần đợi, dòng nào không. Nhưng trong automation test, **gần như mọi dòng tương tác với browser đều cần `await`**. Khi nghi ngờ? Thêm `await`.
:::

---

## 9. Classes & Objects -- "Bản vẽ thiết kế nhà"

### Bản chất (Essence)

Bạn muốn xây 10 căn nhà giống nhau trong khu đô thị. Bạn không vẽ thiết kế 10 lần. Bạn vẽ **1 bản thiết kế** (blueprint), rồi xây 10 căn từ bản thiết kế đó.

- **Class** = bản vẽ thiết kế (blueprint). Mô tả: nhà có gì (phòng ngủ, phòng khách = **thuộc tính/properties**) và nhà làm được gì (mở cửa, bật đèn = **hành vi/methods**).
- **Object** = căn nhà thật được xây từ bản vẽ. Mỗi căn có thể khác: căn sơn trắng, căn sơn xanh -- nhưng cùng cấu trúc.

```
Class House (bản vẽ):                Object myHouse (căn nhà thật):
  - color (màu sơn)                    - color = "trắng"
  - rooms (số phòng)                   - rooms = 3
  - openDoor() (mở cửa)               - openDoor() --> mở cửa căn nhà này
```

### Tại sao QA cần Classes?

Vì automation test dùng **Page Object Model** (POM) -- mỗi trang web là một class:

```typescript
// ===== CLASS = Bản thiết kế cho trang Login =====
class LoginPage {
  // ----- Thuộc tính: các element trên trang -----
  private page: Page;                     // Trang browser (Playwright Page object)
  readonly emailInput = '#email';         // CSS selector của ô email
  readonly passwordInput = '#password';   // CSS selector của ô password
  readonly loginButton = '#login-btn';    // CSS selector của nút Login
  readonly errorMsg = '.error-message';   // CSS selector của thông báo lỗi

  // ----- Constructor: chạy khi tạo object mới -----
  // (Giống như: khi xây nhà từ bản vẽ, bước đầu tiên là đổ móng)
  constructor(page: Page) {
    this.page = page;                     // Gán trang browser cho object này
  }

  // ----- Methods: các hành động trên trang -----

  // Method login: nhập email, password, click Login
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);       // Nhập email
    await this.page.fill(this.passwordInput, password); // Nhập password
    await this.page.click(this.loginButton);            // Click nút Login
  }

  // Method getErrorMessage: lấy nội dung thông báo lỗi
  async getErrorMessage(): Promise<string> {
    return await this.page.textContent(this.errorMsg) || '';
  }
}
```

**Sử dụng trong test:**

```typescript
test('Login thành công', async ({ page }) => {
  // Tạo object từ class (xây nhà từ bản vẽ)
  const loginPage = new LoginPage(page);

  // Gọi method (sử dụng nhà)
  await loginPage.login('user@mail.com', 'Pass@123');

  // Kiểm tra kết quả
  await expect(page).toHaveURL('/dashboard');
});

test('Login thất bại -- sai password', async ({ page }) => {
  const loginPage = new LoginPage(page);  // Tạo object mới cho test mới
  await loginPage.login('user@mail.com', 'wrong-password');

  // Lấy thông báo lỗi
  const error = await loginPage.getErrorMessage();
  expect(error).toBe('Invalid credentials');  // Kiểm tra nội dung lỗi
});
```

::: tip Aha moment
Lợi ích lớn nhất của POM: khi dev đổi UI (đổi `#login-btn` thành `#submit`), bạn chỉ sửa **1 dòng** trong class `LoginPage`. Tất cả tests dùng class đó tự động cập nhật. Không có POM? 50 tests, sửa 50 chỗ, sót 1 chỗ = 1 test fail ngẫu nhiên = mất hàng giờ debug.
:::

---

## 10. Ghép tất cả lại -- Automation test hoàn chỉnh

Bây giờ bạn đã hiểu từng khái niệm riêng lẻ. Hãy xem chúng **kết hợp** trong một dự án thực tế:

```
my-automation-project/
├── tests/                  # Các bài test (dùng functions, loops, async/await)
│   ├── login.spec.ts       # Test feature Login
│   └── cart.spec.ts        # Test feature Cart
├── pages/                  # Page Objects (dùng classes)
│   ├── LoginPage.ts        # Class cho trang Login
│   └── CartPage.ts         # Class cho trang Cart
├── fixtures/               # Test data (dùng objects, arrays)
│   └── users.json          # Data: danh sách users để test
├── utils/                  # Helper functions (dùng functions)
│   └── helpers.ts          # Các hàm dùng chung
├── playwright.config.ts    # Config: browsers, timeout, base URL
├── package.json            # Danh sách dependencies (thư viện cần cài)
└── tsconfig.json           # Config cho TypeScript
```

**Mỗi folder dùng concept nào:**
- `tests/` -- async/await (tương tác browser), conditionals (xử lý edge cases), loops (data-driven)
- `pages/` -- classes (Page Object Model), methods (hành động trên trang)
- `fixtures/` -- objects & arrays (tổ chức test data)
- `utils/` -- functions (code dùng chung, gọi lại nhiều lần)

---

## 11. Lộ trình học -- 8 tuần thay đổi sự nghiệp

```
Tuần 1-2: JavaScript cơ bản
  --> Variables, Data Types, Conditionals, Loops, Functions
  --> Thực hành: freeCodeCamp.org hoặc Codecademy (miễn phí)
  --> Mục tiêu: viết được chương trình nhỏ, đọc hiểu code

Tuần 3: Async/Await + TypeScript
  --> Hiểu Promise, async/await (phần 8 bài này)
  --> Học TypeScript basics: thêm type cho variables
  --> Mục tiêu: hiểu tại sao cần await, đọc được TypeScript

Tuần 4: Viết test đầu tiên
  --> Cài Playwright, viết test login trên trang demo
  --> Mục tiêu: chạy được 1 test tự động, thấy browser mở tự động

Tuần 5-6: Page Object Model
  --> Tổ chức code bằng classes (phần 9 bài này)
  --> Refactor tests đơn giản sang POM pattern
  --> Mục tiêu: hiểu tại sao POM tốt hơn viết thẳng

Tuần 7-8: Nâng cao + Portfolio
  --> Data-driven testing, CI/CD integration
  --> Tạo project demo trên GitHub
  --> Mục tiêu: có portfolio để đi phỏng vấn Automation QA
```

::: warning Lời khuyên quan trọng
**ĐỪNG** học hết lý thuyết rồi mới code. Mỗi concept mới, hãy: **Đọc --> Code ngay --> Gặp lỗi --> Debug --> Hiểu sâu hơn**. Vòng lặp (loop!) này giúp bạn học nhanh gấp 3 lần chỉ đọc sách.
:::

---

## Tóm tắt toàn bộ

| Concept | Giải thích 1 câu | QA dùng ở đâu |
|---|---|---|
| **Variables** | Hộp có dán nhãn, chứa dữ liệu | Lưu test data, kết quả, selectors |
| **Data Types** | Loại đồ trong hộp (chữ, số, đúng/sai...) | Hiểu data để verify đúng |
| **Conditionals** | Ngã rẽ -- nếu A thì làm X, không thì Y | Xử lý popup, edge cases |
| **Loops** | Lặp lại hành động nhiều lần | Data-driven testing, multi-browser |
| **Functions** | Công thức viết 1 lần, dùng nhiều lần | Helper functions, page actions |
| **Async/Await** | ĐỢI bước này xong mới làm bước tiếp | **MỌI** tương tác với browser |
| **Classes** | Bản vẽ thiết kế, tạo nhiều object | Page Object Model (POM) |

::: tip Con đường phía trước
Bạn vừa học xong **nền tảng** -- đủ để hiểu 80% code trong automation project. 20% còn lại bạn sẽ học dần qua thực hành. Bước tiếp theo: cài đặt môi trường và viết test đầu tiên với Playwright.

Nhớ: từ 8-15 triệu (Manual QA) lên 20-40 triệu (Automation QA) chỉ cách nhau **8 tuần quyết tâm**. Bắt đầu ngay hôm nay.
:::
