# Communication Skills

## Tại sao Communication quan trọng? (WHY)

QA là **cầu nối** giữa nhiều bên: Dev, PM, Business, Design. Một QA giỏi kỹ thuật nhưng communication kém → bugs bị hiểu sai, priority bị đánh sai, team friction tăng.

> Kỹ năng #1 phân biệt Senior QA với Junior QA không phải technical skills — mà là **communication skills**.

---

## Giao tiếp với Developer

### Nguyên tắc vàng: Report Facts, Not Blame

```
❌ "Dev code sai rồi, bug này rõ ràng mà"
✅ "Khi thực hiện step 1-2-3, actual result là X, expected là Y.
    Đây là screenshot và console log."

❌ "Feature này toàn bug, code gì vậy?"
✅ "Mình tìm thấy 3 issues ở feature này, đã log trong Jira.
    Ưu tiên BUG-123 vì ảnh hưởng checkout flow."

❌ "Bug này mình report từ sprint trước mà chưa fix"
✅ "BUG-100 vẫn open từ Sprint 14, hiện block testing cho Story #50.
    Bạn có thể estimate khi nào fix được không?"
```

### Khi Dev nói "Not a Bug" / "Works as Designed"

```
1. Lắng nghe giải thích của dev → có thể mình hiểu sai requirement
2. Nếu không đồng ý → Hỏi PM/PO quyết định
3. Document decision (Jira comment) → Reference cho sau này
4. KHÔNG tranh cãi kéo dài → Escalate nếu cần

Template:
"Mình hiểu perspective của bạn. Tuy nhiên, từ góc nhìn user, hành vi này
có thể gây confuse vì [lý do]. Mình đề xuất hỏi PO để confirm expected behavior."
```

### Khi cần Dev fix urgent bug

```
Good approach:
1. Tag dev trong Jira + Slack message ngắn
2. Explain impact: "Bug này block 100% checkout flow trên production"
3. Provide all info: steps, screenshot, logs, environment
4. Suggest priority: "Recommend P1 vì ảnh hưởng revenue"
5. Offer help: "Mình có thể help reproduce hoặc verify fix"
```

---

## Giao tiếp với Product Manager (PM/PO)

### Nói ngôn ngữ Business

```
❌ Technical language:
"API /api/orders trả về status 500 khi payload có null value
trong field shipping_address.city"

✅ Business language:
"Customers không thể đặt hàng nếu bỏ trống trường Thành phố
trong địa chỉ giao hàng. Hệ thống hiện đang crash thay vì
hiển thị validation error. Ảnh hưởng: tất cả orders mới."
```

### Report Testing Status

```
❌ Vague:
"Test đang OK, còn vài bugs"

✅ Specific:
"Sprint 15 Testing Status (Day 7/10):
- Executed: 120/150 test cases (80%)
- Pass: 108 (90%)
- Fail: 12 (10%) — 8 bugs logged
- Blocked: 30 (waiting for API deployment)

Critical Issues:
1. BUG-200: Checkout crash (P1) — Dev fixing, ETA today
2. BUG-201: Wrong tax calculation (P2) — Under investigation

Recommendation: Cần fix BUG-200 trước khi release.
BUG-201 có workaround (manually correct in admin)."
```

### Escalation — Khi nào và cách nào

```
Escalate khi:
- Critical bug chưa fix gần deadline
- Thiếu test environment > 2 ngày
- Requirement conflict chưa resolve
- Quality concerns trước release

Cách escalate:
1. Nêu facts (không cảm xúc)
2. Explain impact (business impact)
3. Đề xuất options (không chỉ nêu vấn đề)
4. Để PM/lead quyết định

Template:
"Hiện có [vấn đề]. Impact: [ảnh hưởng].
Options: (A) [option 1, pros/cons], (B) [option 2, pros/cons].
Mình recommend option [X] vì [lý do]. Bạn nghĩ sao?"
```

---

## Giao tiếp trong Meetings

### Daily Standup (15 phút max)

```
Format: Yesterday → Today → Blockers

Good example:
"Yesterday: Completed testing Story #45 (Login redesign) — 15/15 TCs pass.
 Today: Start testing Story #46 (Profile page) + retest BUG-180.
 Blocker: Staging database was reset, need test data re-setup."

Bad example:
"Yesterday tôi test login, có mấy cái bug,
 hôm nay tiếp tục test, có gì sẽ báo sau..."
(Quá vague, không có specifics)
```

### Sprint Review / Demo

```
QA contribution:
1. Hỗ trợ demo (prepare test data, accounts)
2. Chia sẻ Quality Metrics:
   - "Sprint này: 95% pass rate, 12 bugs found, 10 fixed"
   - "So với Sprint trước: pass rate tăng 5%, bugs giảm 20%"
3. Highlight risks:
   - "2 open bugs deferred sang Sprint 16, cả 2 có workaround"
```

### Sprint Retro

```
QA nên chia sẻ:
What went well:
- "Automation save 2 ngày regression testing"
- "Dev fix bugs nhanh, avg fix time giảm từ 2 ngày xuống 1 ngày"

What to improve:
- "Requirements thiếu edge cases → propose QA join refinement sớm hơn"
- "Test env down 2 lần → request monitoring cho staging"

Action items:
- "QA sẽ tham gia Backlog Refinement từ Sprint 16"
- "DevOps sẽ setup alert cho staging env"
```

---

## Written Communication

### Bug Report (đã cover ở [Bug Reporting](/manual-testing/bug-reporting))

### Test Report Email

```
Subject: [Sprint 15] Test Summary Report — Ready for Release ✅

Hi team,

Sprint 15 testing completed. Summary:

📊 Metrics:
- Test cases: 150 executed / 150 total (100%)
- Pass rate: 95% (143 pass / 7 fail)
- Bugs: 15 found, 13 fixed, 2 deferred (minor)

🚨 Critical Issues: None (all resolved)

⚠️ Known Issues (deferred):
1. BUG-210: Minor UI alignment on Safari — Low impact
2. BUG-212: Tooltip text truncated on mobile — Cosmetic

✅ Recommendation: GO for release

Best regards,
QA Team
```

### Slack Communication

```
Good practices:
- Thread replies (không spam main channel)
- Tag người cần thiết (@dev-name không phải @here)
- Provide context (link Jira ticket, screenshot)
- Status emoji: 🔴 blocker, 🟡 in progress, 🟢 done

Example:
"🔴 @dev-minh BUG-200 (Checkout crash) đang block release testing.
Details: [link Jira]. Bạn có thể check today không?
Nếu cần reproduce → mình có thể pair lúc 2pm."
```

---

## Conflict Resolution

### Khi có disagreement về bug

```
Step 1: Listen → Hiểu perspective của đối phương
Step 2: Facts → Đưa ra evidence (screenshot, data, requirement)
Step 3: Escalate → Nếu không resolve → hỏi PO/PM
Step 4: Document → Ghi decision vào Jira
Step 5: Move on → Không giữ trong lòng

Key phrases:
- "Mình hiểu point của bạn. Từ góc nhìn user..."
- "Để mình check lại requirement và confirm..."
- "Chúng ta hỏi PO để có final decision nhé?"
- "OK, mình sẽ update Jira theo decision này."
```

---

## Tóm tắt chương

| Audience | Key Principle |
|---|---|
| **Developer** | Report facts, not blame. Provide evidence. |
| **PM/PO** | Speak business language. Report metrics + impact. |
| **Standup** | Yesterday → Today → Blockers (15 phút max) |
| **Written** | Clear, specific, actionable |
| **Conflict** | Listen → Facts → Escalate → Document → Move on |
