# MVP-01 UI 상세 기획서

> **목적:** AI/개발자가 이 문서만 보고 UI를 구현할 수 있을 정도로 구체화  
> **플랫폼:** 모바일 퍼스트 (기준 해상도 390 x 844 pt, Safe Area 반영)

---

## 1. 디자인 토큰

### 1.1 색상
| 토큰 | 용도 | HEX |
|:---|:---|:---|
| `--bg-primary` | 화면 배경 | `#1A1B26` |
| `--bg-card` | 카드/패널 배경 | `#26283B` |
| `--bg-card-selected` | 선택된 카드 배경 | `#3B3F5C` |
| `--text-primary` | 본문 텍스트 | `#E8E9ED` |
| `--text-secondary` | 보조 텍스트 | `#9A9CAE` |
| `--accent` | 버튼, 강조 | `#7C9CBF` |
| `--accent-hover` | 버튼 호버/프레스 | `#6A8AAD` |
| `--border` | 구분선, 테두리 | `#3B3F5C` |
| `--success` | 성과, 긍정 | `#6BCB8E` |
| `--icon-gather` | 채집 아이콘 색 | `#8B9E6B` |
| `--icon-build` | 건축 아이콘 색 | `#B8864E` |
| `--icon-rest` | 휴식 아이콘 색 | `#6B8E9E` |

### 1.2 타포그래피
| 토큰 | 크기 | 굵기 | 용도 |
|:---|:---:|:---:|:---|
| `--font-title` | 22pt | 700 | 화면 제목 |
| `--font-section` | 16pt | 600 | 섹션 제목 |
| `--font-body` | 15pt | 400 | 본문 |
| `--font-caption` | 13pt | 400 | 캡션, 로그 |
| `--font-button` | 16pt | 600 | 버튼 텍스트 |

### 1.3 간격(Spacing)
| 토큰 | 값 | 용도 |
|:---|:---:|:---|
| `--space-xs` | 4pt | 컴포넌트 내부 |
| `--space-sm` | 8pt | 관련 요소 간 |
| `--space-md` | 16pt | 섹션 간 |
| `--space-lg` | 24pt | 블록 간 |
| `--space-xl` | 32pt | 화면 상하 마진 |
| `--radius-sm` | 8pt | 버튼, 작은 카드 |
| `--radius-md` | 12pt | 카드, 패널 |
| `--radius-lg` | 16pt | 큰 카드 |

---

## 2. 화면별 상세 스펙

---

## 2.1 화면 A: 월 초 설정 화면 (SetupScreen)

### 2.1.1 레이아웃 구조

```
┌─────────────────────────────────────┐
│ SafeArea Top (status bar)            │
├─────────────────────────────────────┤
│  [헤더 영역]           H: 56pt       │
│  - 좌: "N월 설정"                    │
│  - 우: (비어있음)                    │
├─────────────────────────────────────┤
│  [본문 영역]                          │
│  - 질문 텍스트                       │
│  - 선택 카드 3개 (세로 스택)         │
│  - 하단 버튼                         │
├─────────────────────────────────────┤
│ SafeArea Bottom                      │
└─────────────────────────────────────┘
```

### 2.1.2 컴포넌트 트리

```
SetupScreen
├── SafeAreaContainer (padding: top/bottom 24, left/right 20)
│   ├── Header (height: 56, align: space-between)
│   │   └── Text: "{currentMonth}월 설정"  // 예: "1월 설정"
│   │       - font: --font-title
│   │       - color: --text-primary
│   │
│   ├── Spacer (height: 32)
│   │
│   ├── QuestionBlock
│   │   └── Text: "이번 달에 집중할 활동을 선택하세요"
│   │       - font: --font-section
│   │       - color: --text-primary
│   │
│   ├── Spacer (height: 16)
│   │
│   ├── ActivitySelectStack (gap: 12)
│   │   ├── ActivityCard (id: gather)
│   │   ├── ActivityCard (id: build)
│   │   └── ActivityCard (id: rest)
│   │
│   ├── Spacer (flex: 1)  // 가용 공간 채움
│   │
│   └── PrimaryButton
│       └── Text: "이달 시작"
```

### 2.1.3 ActivityCard 상세

| 속성 | 값 |
|:---|:---|
| 높이 | 72pt |
| 패딩 | 16pt (모든 방향) |
| 배경 | `--bg-card` (미선택) / `--bg-card-selected` (선택) |
| 테두리 | 2pt solid `--border` (미선택) / 2pt solid `--accent` (선택) |
| border-radius | `--radius-md` (12pt) |
| 좌측 여백 | 0, 우측 여백 | 0, 상하 카드 간격 | 12pt |

**내부 구조 (가로 배치, align: center):**
```
[아이콘 40x40]  [간격 16]  [텍스트 블록]
```

| 카드 ID | 아이콘 | 라벨 텍스트 | 서브텍스트 |
|:---|:---|:---|:---|
| gather | 🌿 (또는 채집 아이콘, color: --icon-gather) | "채집" | "자원 수집에 집중" |
| build | 🏗️ (또는 건축 아이콘, color: --icon-build) | "건축" | "시설 건설에 집중" |
| rest | 😌 (또는 휴식 아이콘, color: --icon-rest) | "휴식" | "피로 회복에 집중" |

**상태:**
- `default`: 배경 --bg-card, 테두리 --border
- `selected`: 배경 --bg-card-selected, 테두리 --accent
- `pressed`: selected 상태 + opacity 0.9

**인터랙션:** 탭 시 해당 카드만 selected, 나머지 unselected. 단일 선택.

### 2.1.4 PrimaryButton 상세

| 속성 | 값 |
|:---|:---|
| 높이 | 52pt |
| 배경 | `--accent` |
| border-radius | `--radius-sm` |
| 텍스트 | "이달 시작" |
| font | --font-button, color: #FFFFFF |
| 상태 | `disabled`: 배경 #4A4A4A, 클릭 불가 (선택 없을 때) |
| 상태 | `pressed`: 배경 --accent-hover |

**인터랙션:** 선택이 있을 때만 활성화. 탭 시 시뮬 화면(B)으로 전환.

### 2.1.5 전체 여백
- 좌우: 20pt
- 상단(헤더 아래): 32pt
- 하단(버튼 위): 24pt

---

## 2.2 화면 B: 월 중 시뮬레이션 화면 (SimulationScreen)

### 2.2.1 레이아웃 구조

```
┌─────────────────────────────────────┐
│  [상단 바] H: 52pt                   │
│  - Day N/30, 속도 조절 (선택)        │
├─────────────────────────────────────┤
│  [콜로니원 카드] H: ~100pt            │
│  - 아바타 + 이름 + 현재 활동          │
├─────────────────────────────────────┤
│  [로그 영역]                         │
│  - 최근 5줄 로그 (스크롤)            │
├─────────────────────────────────────┤
│  [하단 안내] (선택)                  │
└─────────────────────────────────────┘
```

### 2.2.2 컴포넌트 트리

```
SimulationScreen
├── SafeAreaContainer (padding: 20)
│   ├── TopBar (height: 52, row, space-between, align: center)
│   │   ├── DayIndicator
│   │   │   └── Text: "Day {currentDay} / 30"
│   │   │       - font: --font-section
│   │   │       - color: --text-primary
│   │   └── SpeedControl (선택 구현)
│   │       └── SegmentedControl: "1x" | "2x" | "4x"
│   │
│   ├── Spacer (height: 24)
│   │
│   ├── ColonistCard (height: 100, padding: 16)
│   │   ├── [아바타 48x48]  [간격 16]  [텍스트 블록]
│   │   │   - 이름: "콜로니원" (고정 또는 설정값)
│   │   │   - 활동: "{activity} 중..." (채집/건축/휴식)
│   │   └── ProgressBar (선택): 0~100% (날짜 진행률)
│   │
│   ├── Spacer (height: 24)
│   │
│   ├── LogSection
│   │   ├── Label: "활동 로그"
│   │   │   - font: --font-caption, color: --text-secondary
│   │   ├── Spacer (height: 8)
│   │   └── LogList (max 5 items, scroll if needed)
│   │       └── LogItem (각 줄)
│   │
│   └── Spacer (flex: 1)
```

### 2.2.3 DayIndicator

- 텍스트: `"Day {currentDay} / 30"`
- `currentDay`: 1~30 정수
- 실시간 갱신 (예: 1초당 1일 진행 시 1초마다 업데이트)

### 2.2.4 ColonistCard

| 속성 | 값 |
|:---|:---|
| 배경 | --bg-card |
| border-radius | --radius-md |
| 패딩 | 16pt |

**활동 텍스트 매핑:**
| 선택값 | 표시 텍스트 |
|:---|:---|
| 채집 | "채집 중..." |
| 건축 | "건축 중..." |
| 휴식 | "휴식 중..." |

### 2.2.5 LogItem 상세

| 속성 | 값 |
|:---|:---|
| font | --font-caption (13pt) |
| color | --text-secondary |
| 한 줄당 높이 | 24pt |
| 예시 형식 | `"Day {d}: {message}"` |

**메시지 예시 (활동별):**
- 채집: "채집 중...", "채집 완료 +10", "채집 완료 +15"
- 건축: "건축 중...", "건축 진행 50%"
- 휴식: "휴식 중...", "피로 회복 +5"

최신 로그가 **위**에 오도록 (LIFO). 최대 5줄 표시, 초과 시 스크롤 또는 하단 추가 시 상단 삭제.

### 2.2.6 전환
- Day 30 도달 시 자동으로 결과 화면(C)로 전환
- 뒤로가기/ESC 등은 이 MVP에서 미구현 (선택 시 추가)

---

## 2.3 화면 C: 월 말 결과 화면 (ResultScreen)

### 2.3.1 레이아웃 구조

```
┌─────────────────────────────────────┐
│  [헤더] H: 56pt                      │
│  - "N월 결과"                        │
├─────────────────────────────────────┤
│  [결과 카드]                          │
│  - 활동명 + 성과 수치                 │
├─────────────────────────────────────┤
│  [하단 버튼]                          │
│  - "다음 달 설정하기"                 │
└─────────────────────────────────────┘
```

### 2.3.2 컴포넌트 트리

```
ResultScreen
├── SafeAreaContainer (padding: 20)
│   ├── Header (height: 56)
│   │   └── Text: "{currentMonth}월 결과"
│   │       - font: --font-title
│   │       - color: --text-primary
│   │
│   ├── Spacer (height: 32)
│   │
│   ├── ResultCard (padding: 24, minHeight: 120)
│   │   ├── ActivityLabel
│   │   │   └── Text: "{activity} 성과"  // 채집/건축/휴식
│   │   │       - font: --font-caption
│   │   │       - color: --text-secondary
│   │   ├── Spacer (height: 8)
│   │   └── ResultValue
│   │       └── Text: "{value}"  // 예: 50
│   │           - font: 36pt, weight 700
│   │           - color: --success
│   │
│   ├── Spacer (flex: 1)
│   │
│   └── PrimaryButton
│       └── Text: "다음 달 설정하기"
```

### 2.3.3 ResultCard 상세

| 속성 | 값 |
|:---|:---|
| 배경 | --bg-card |
| border-radius | --radius-lg |
| 패딩 | 24pt |

**표시 규칙:**
| 이번 달 선택 | ActivityLabel | ResultValue |
|:---|:---|:---|
| 채집 | "채집 성과" | 30~50 (랜덤) |
| 건축 | "건축 성과" | 25~40 (랜덤) |
| 휴식 | "휴식 성과" | 20~30 (랜덤) |

### 2.3.4 PrimaryButton

- 텍스트: "다음 달 설정하기"
- 탭 시: `currentMonth` 1 증가 → 설정 화면(A)으로 전환
- 스타일: 화면 A의 PrimaryButton과 동일 (disabled 상태 없음)

---

## 3. 화면 전환 플로우

```
[SetupScreen] ──(이달 시작)──► [SimulationScreen]
                                    │
                                    │ (Day 30 도달)
                                    ▼
[SetupScreen] ◄──(다음 달 설정하기)── [ResultScreen]
```

| 전환 | 트리거 | 애니메이션 (권장) |
|:---|:---|:---|
| A → B | "이달 시작" 버튼 탭 | 슬라이드 Left 또는 Fade |
| B → C | Day 30 도달 | Fade |
| C → A | "다음 달 설정하기" 탭 | Fade 또는 슬라이드 Right |

---

## 4. 컴포넌트 재사용 요약

| 컴포넌트 | 화면 | 속성 |
|:---|:---|:---|
| PrimaryButton | A, C | 높이 52, 배경 --accent, radius 8 |
| ActivityCard | A | 높이 72, selected 상태 지원 |
| ColonistCard | B | 높이 100, 패딩 16 |
| LogItem | B | 높이 24, 캡션 폰트 |
| ResultCard | C | 패딩 24, radius 16 |

---

## 5. 택스트(복사용) 정리

| ID | 화면 | 텍스트 |
|:---|:---|:---|
| T01 | A | "{N}월 설정" |
| T02 | A | "이번 달에 집중할 활동을 선택하세요" |
| T03 | A | "채집" |
| T04 | A | "자원 수집에 집중" |
| T05 | A | "건축" |
| T06 | A | "시설 건설에 집중" |
| T07 | A | "휴식" |
| T08 | A | "피로 회복에 집중" |
| T09 | A | "이달 시작" |
| T10 | B | "Day {n} / 30" |
| T11 | B | "콜로니원" |
| T12 | B | "채집 중..." |
| T13 | B | "건축 중..." |
| T14 | B | "휴식 중..." |
| T15 | B | "활동 로그" |
| T16 | C | "{N}월 결과" |
| T17 | C | "채집 성과" |
| T18 | C | "건축 성과" |
| T19 | C | "휴식 성과" |
| T20 | C | "다음 달 설정하기" |

---

## 6. 반응형 / 화면 크기

- 기준: 390 x 844 pt (iPhone 14 등)
- 최소 너비: 320pt
- 최대 너비: 428pt (넓은 기기에서도 좌우 패딩 유지)
- Safe Area: 상하좌우 노치/홈 인디케이터 영역 제외

---

## 7. 접근성 (선택)

- 버튼 최소 터치 영역: 44 x 44 pt
- 선택된 ActivityCard에 `aria-selected="true"` 또는 role="radio"
- 중요한 텍스트 대비율 4.5:1 이상 권장
