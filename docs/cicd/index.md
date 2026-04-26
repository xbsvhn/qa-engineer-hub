# CI/CD

## CI/CD la gi? -- Hieu ban chat truoc

Tuong tuong ban la mot dau bep trong nha hang. Moi ngay ban nau mon moi (code moi). Truoc khi phuc vu khach, ban phai:

1. **Kiem tra nguyen lieu** (build -- code co compile duoc khong?)
2. **Nem thu** (test -- code co chay dung khong?)
3. **Bung ra ban** (deploy -- dua code len server cho user dung)

**CI/CD** la **robot lam 3 buoc nay tu dong** moi khi ban thay doi code. Ban chi viec nau (code), robot lo phan con lai.

- **CI** (Continuous Integration) = tu dong build + test moi khi ai do push code
- **CD** (Continuous Delivery) = tu dong deploy len server sau khi tests pass

## Pipeline = day chuyen san xuat

```
Developer push code
       |
       v
+----------------------------------------------------------+
|                    CI/CD Pipeline                          |
|                                                           |
|  Build --> Unit Tests --> API Tests --> Deploy Staging     |
|                                            |              |
|                                            v              |
|                            E2E Tests --> Smoke Test        |
|                                            |              |
|                                   Tests pass? ---+        |
|                                    |             |        |
|                                   Yes           No        |
|                                    |             |        |
|                              Deploy Prod    Notify QA     |
|                                             + Block       |
+----------------------------------------------------------+
```

> **Aha moment:** Automation tests chi THUC SU co gia tri khi chay trong CI/CD pipeline. Viet 1000 test cases ma phai chay bang tay = lang phi. Dat chung vao pipeline = moi lan dev push code, tests tu dong chay va bao ket qua.

## Noi dung section nay

| # | Chu de | Mo ta |
|---|---|---|
| 1 | [Git & Version Control](./git) | "Save game" cho code, branching, Pull Request |
| 2 | [GitHub Actions](./github-actions) | May tinh GitHub cho muon mien phi de chay tests |
| 3 | [Docker cho QA](./docker) | Dong goi code vao "container" chay giong nhau moi noi |
