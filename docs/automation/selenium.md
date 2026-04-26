# Selenium

## Selenium là gì?

Selenium là bộ công cụ open-source phổ biến nhất cho web browser automation.

## Selenium Components

| Component | Mô tả |
|---|---|
| **Selenium WebDriver** | API để điều khiển browser |
| **Selenium IDE** | Record & playback plugin |
| **Selenium Grid** | Chạy test parallel trên nhiều machines |

## Locators

Cách tìm elements trên web page:

| Locator | Ví dụ | Ưu tiên |
|---|---|---|
| **ID** | `#login-btn` | Tốt nhất |
| **CSS Selector** | `.btn.primary` | Recommended |
| **XPath** | `//div[@class='header']` | Flexible nhất |
| **Name** | `name="email"` | OK |
| **Link Text** | `Sign In` | Cho links |

## Waits

### Implicit Wait
```java
driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
```

### Explicit Wait
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("btn")));
```

### Fluent Wait
Custom polling interval và ignore exceptions.

::: warning
Tránh dùng `Thread.sleep()` - luôn dùng explicit wait thay thế.
:::

::: info
Nội dung chi tiết sẽ được bổ sung sau.
:::
