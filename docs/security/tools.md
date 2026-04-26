# Security Testing Tools

## Ban chat: SAST vs DAST = Kiem tra ban ve vs Kiem tra nha that

Truoc khi hieu cac tools, ban can hieu 2 cach tiep can bao mat:

| | SAST (Static) | DAST (Dynamic) |
|---|---|---|
| **An du** | **Kiem tra ban ve** nha truoc khi xay | **Kiem tra nha da xay** xong (thu pha cua) |
| **Khi nao** | Scan source code (truoc khi chay) | Scan app DANG CHAY |
| **Input** | Source code, dependencies | URL cua app |
| **Tim duoc** | Code vulnerabilities, insecure patterns | Runtime vulnerabilities, config issues |
| **Uu diem** | Phat hien SOM, trong CI/CD | Tim REAL vulnerabilities |
| **Nhuoc diem** | False positives nhieu (bao dong gia) | Can app dang chay |
| **Tools** | SonarQube, Snyk, ESLint Security | OWASP ZAP, Burp Suite |

```
Development Pipeline:
Code --> SAST scan --> Build --> Deploy --> DAST scan --> Release
         (Snyk)                            (OWASP ZAP)

SAST = "xem ban ve tim loi"      (phat hien som, re)
DAST = "dao vao nha thu pha"     (phat hien muon hon, nhung chinh xac hon)
```

::: tip Aha moment
SAST va DAST **bo sung cho nhau**, khong thay the nhau. SAST tim loi trong code (nhu "o day khong co khoa"), DAST verify loi that (nhu "toi thuc su mo duoc cua"). Dung CA HAI de bao mat tot nhat.
:::

---

## OWASP ZAP -- Mien phi, manh me

### ZAP la gi?

**OWASP ZAP** (Zed Attack Proxy) la tool **MIEN PHI** de tim security vulnerabilities trong web applications. No hoat dong nhu mot **"nguoi trung gian"** giua browser va server -- nghe len moi request/response va tim lo hong.

An du: ZAP giong nhu **may soi chieu** o san bay. Moi "hanh ly" (request) di qua, no soi va tim "do cam" (vulnerabilities).

### Cach dung co ban

```
1. Automated Scan (nhanh, de):
   - Mo ZAP --> Nhap URL target --> Click "Attack"
   - ZAP tu dong:
     a. Crawl toan bo website (tim tat ca cac trang)
     b. Gui payloads doc hai vao moi input (SQL injection, XSS...)
     c. Phan tich responses
     d. Bao cao vulnerabilities tim duoc
   - Thoi gian: 5-30 phut tuy do lon website

2. Manual Explore (qua proxy -- chinh xac hon):
   - Set browser proxy --> ZAP (ZAP nghe moi request)
   - Browse website BINH THUONG (login, click, dien form...)
   - ZAP capture va analyze MOI request/response
   - ZAP highlight cac van de tiem an
   - Sau do chay "Active Scan" tren cac URLs da capture

3. Active Scan (tan cong thu):
   - Sau khi explore, chon URLs can scan sau
   - ZAP thu inject payloads (SQL, XSS, path traversal...)
   - Report vulnerabilities voi do nghiem trong
```

### ZAP Alerts -- Doc ket qua

| Risk Level | Mau | Vi du | Action |
|---|---|---|---|
| **High** | Do | SQL Injection, Remote Code Execution | Fix NGAY |
| **Medium** | Cam | XSS, Missing Security Headers | Fix trong sprint nay |
| **Low** | Vang | Cookie without HttpOnly flag | Plan fix |
| **Informational** | Xanh | Server version disclosure | Nice to fix |

### CI/CD Integration -- Chay ZAP tu dong

```yaml
# GitHub Actions -- ZAP Scan moi dem
- name: ZAP Full Scan
  uses: zaproxy/action-full-scan@v0.10.0
  with:
    target: 'https://staging.example.com'
    # ^^^ Scan tren STAGING, khong phai production!
    rules_file_name: '.zap/rules.tsv'
    # ^^^ File config: alert nao bo qua, alert nao bao
    cmd_options: '-a'
    # ^^^ -a = include alpha rules (nhieu checks hon)
```

---

## Burp Suite -- "Dao Thuy Si" cua security testing

### Burp Suite la gi?

**Burp Suite** la tool **pho bien nhat** cho penetration testing. Giong nhu "dao Thuy Si" -- nhieu cong cu trong 1.

- **Community Edition**: Mien phi (du cho QA)
- **Professional Edition**: Tra phi (cho security engineers)

### QA dung Burp Suite de:

| Feature | An du | Muc dich |
|---|---|---|
| **Proxy** | May nghe len | Bat va xem MOI request/response |
| **Repeater** | May fax | Gui lai 1 request, sua truoc khi gui |
| **Intruder** | May bom thu | Tu dong gui hang ngan requests (brute force, fuzzing) |
| **Scanner** | May soi chieu (Pro) | Tu dong tim vulnerabilities |

### Vi du: Test IDOR voi Burp

```
1. Login as User A
2. Bat Burp Proxy --> capture tat ca requests
3. Tim request: GET /api/orders/123  (order cua User A)
4. Click phai --> "Send to Repeater"
5. Trong Repeater, doi ID: GET /api/orders/124  (order cua User B?)
6. Click "Send" --> Xem response
7. Neu tra ve data order 124 --> BUG: IDOR vulnerability!
   (User A KHONG nen xem duoc order cua User B)
```

::: tip Aha moment
Burp Repeater la "vu khi" manh nhat cua QA khi test security. Ban bat 1 request, sua bat ky gi (ID, token, params), gui lai, va xem server phan ung sao. Don gian nhung CUNG HIEU QUA.
:::

---

## Snyk -- Bao ve cua truoc (Dependency Security)

### Snyk la gi?

**Snyk** scan **dependencies** (npm packages, Python packages...) de tim lo hong DA BIET. Giong nhu kiem tra xem o khoa ban dang dung co nam trong "danh sach o khoa bi be" khong.

```bash
# Cai dat
npm install -g snyk

# Scan project
snyk test

# Output vi du:
# x  High severity vulnerability found in lodash
#    Description: Prototype Pollution
#    Introduced through: lodash@4.17.20
#    Fixed in: lodash@4.17.21        <-- Chi can update len version nay!
#    Path: myapp > lodash
```

### CI/CD Integration

```yaml
# GitHub Actions -- Chay moi PR
- name: Snyk Security Check
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  # Neu tim thay lo hong High/Critical --> pipeline FAIL
  # --> Dev PHAI fix truoc khi merge
```

---

## Cac tools khac

| Tool | Loai | Mo ta | An du | Cost |
|---|---|---|---|---|
| **SonarQube** | SAST | Scan code quality + security | "Giao vien cham bai" | Free (Community) |
| **ESLint Security** | SAST | Security rules cho JavaScript | "Spell checker cho security" | Free |
| **npm audit** | SCA | Check npm dependencies | "Kiem tra danh sach thu hoi" | Free (built-in) |
| **Dependabot** | SCA | Tu dong tao PR khi co lo hong | "Bao ve tu dong" | Free (GitHub) |
| **Lighthouse** | Audit | Security + Performance audit | "Kiem tra suc khoe tong quat" | Free (Chrome) |

**SCA** = Software Composition Analysis -- kiem tra thu vien ban dang dung co an toan khong.

---

## Security Testing Workflow cho QA

```
Hang ngay:
  +-- Khi test feature moi --> thu basic SQL/XSS injection
      (mat 2 phut, nhung co the tim duoc lo hong nghiem trong)

Moi Sprint:
  +-- npm audit --> fix critical vulnerabilities
  +-- OWASP ZAP quick scan tren staging
      (chay automated scan, doc report, log bugs)

Moi Release:
  +-- OWASP ZAP full scan
  +-- Review security headers
  +-- Test authentication flows (login, logout, token, session)
  +-- IDOR checks tren API endpoints moi

CI/CD Pipeline (tu dong):
  +-- Snyk --> check dependencies (moi PR)
  +-- SonarQube --> SAST scan (moi PR)
  +-- ZAP --> DAST scan (hang dem tren staging)
```

::: tip Aha moment
Security testing khong phai lam 1 lan roi xong. No la **quy trinh lien tuc** -- moi feature moi co the tao lo hong moi. Nhung chi can **2 phut** thu SQL/XSS tren moi form moi la ban da lam duoc 80% cong viec.
:::

---

## Tom tat chuong

| Tool | An du | Loai | QA dung khi | Cost |
|---|---|---|---|---|
| **OWASP ZAP** | May soi chieu san bay | DAST | Scan web app tim lo hong | Free |
| **Burp Suite** | Dao Thuy Si | Proxy/DAST | Bat request, test IDOR | Free (Community) |
| **Snyk** | Kiem tra danh sach thu hoi | SCA | Check vulnerable dependencies | Free tier |
| **npm audit** | Kiem tra nhanh | SCA | Quick dependency check | Free |
| **SonarQube** | Giao vien cham bai | SAST | Code quality + security | Free (Community) |
| **SAST** | Kiem tra ban ve | Static | Tim loi trong code | -- |
| **DAST** | Thu pha cua nha that | Dynamic | Tim loi khi app chay | -- |
