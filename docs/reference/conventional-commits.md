# Conventional Commits

커밋 메시지에 **의미를 부여**해 사람과 도구 모두가 이해하기 쉽게 하는 컨벤션.  
[공식 스펙](https://www.conventionalcommits.org/) · [한국어](https://www.conventionalcommits.org/ko/v1.0.0/)

---

## 기본 형식

```
<타입>[선택: 범위]: <설명>

[선택: 본문]

[선택: 꼬리말]
```

- **타입:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build` 등
- **범위:** 변경이 적용된 영역(예: `parser`, `auth`)
- **설명:** 제목은 72자 이내, 명령형(예: "add" not "added")

---

## 자주 쓰는 타입

| 타입 | 의미 | SemVer |
|:---|:---|:---|
| **feat** | 새 기능 | MINOR |
| **fix** | 버그 수정 | PATCH |
| **docs** | 문서만 변경 | - |
| **style** | 포맷, 세미콜론 등 (동작 변경 없음) | - |
| **refactor** | 리팩터 (기능/버그 수정 아님) | - |
| **perf** | 성능 개선 | - |
| **test** | 테스트 추가/수정 | - |
| **chore** | 빌드, 설정, 기타 잡일 | - |

---

## 예시

```text
feat: add settings screen for activity choice
fix(auth): prevent redirect loop on token expiry
docs: add Conventional Commits to reference folder
refactor(SimulationScreen): extract day progress into hook
```

### Breaking change 표시

```text
feat!: change API response shape

BREAKING CHANGE: `data` is now nested under `payload`.
```

또는 타입/범위 뒤에 `!`:

```text
feat(api)!: send email on order shipped
```

---

## 이 프로젝트에서

- 커밋 메시지는 **영어**로 작성 (`.cursor/rules/commit-message.mdc`)
- 제안·작성 시 위 형식을 따름
