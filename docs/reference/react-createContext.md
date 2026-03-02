# React createContext

React에서 **컴포넌트 트리 아래로 값을 전달**할 때, props를 매 단계마다 넘기지 않고 한 번에 "공급"할 수 있게 해주는 API.  
[공식 문서 (Context)](https://react.dev/reference/react/createContext)

---

## 왜 쓰나요?

- **Props Drilling 방지:** 깊은 자식 컴포넌트에 값을 쓰려면 중간 컴포넌트들이 그 값을 받아서 다시 넘겨야 함. Context를 쓰면 Provider로 감싼 **아무 깊이의 자식**에서 바로 값을 읽을 수 있음.
- **전역/공유 상태:** 테마, 로그인 정보, 게임 상태처럼 여러 화면·컴포넌트가 공유하는 값을 한 곳에서 관리할 때 유용함.

---

## 기본 사용 흐름

1. **Context 만들기** — `createContext(기본값)` 으로 Context 객체 생성
2. **Provider로 감싸기** — 값을 주입할 범위를 `<Context.Provider value={...}>` 로 감싼다
3. **값 읽기** — 그 범위 안의 컴포넌트에서 `useContext(Context)` 로 값을 사용

---

## createContext 문법

```ts
const MyContext = createContext<ValueType>(defaultValue);
```

- **ValueType:** 이 Context가 담을 값의 타입 (TypeScript)
- **defaultValue:** Provider **밖**에서 `useContext`를 쓸 때 반환되는 값. 보통 `null`로 두고, Provider 안에서만 사용하도록 강제하는 패턴을 많이 씀.

---

## 이 프로젝트 예시 (GameContext)

`src/context/GameContext.tsx` 에서 사용하는 방식:

```ts
// 1. Context가 제공할 값의 타입 정의
interface GameContextValue extends GameState {
  setColonistPriority: (...) => void;
  startMonth: (...) => void;
  // ...
}

// 2. Context 생성 — 기본값 null → Provider 밖에서 쓰면 에러 처리 가능
const GameContext = createContext<GameContextValue | null>(null);

// 3. Provider 컴포넌트에서 실제 value 주입
export function GameProvider({ children }) {
  const [state, setState] = useState<GameState>(...);
  // ...
  return (
    <GameContext.Provider value={{ ...state, setColonistPriority, ... }}>
      {children}
    </GameContext.Provider>
  );
}

// 4. 커스텀 훅으로 안전하게 사용 — Provider 밖이면 에러 throw
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
```

- **`GameContext`:** "게임 상태 + 액션"을 담는 Context **상자**만 만든 것. 이 시점에는 아무 값도 들어 있지 않고, 기본값 `null`만 지정됨.
- **`GameProvider`:** 실제 state와 함수들을 구해서 `value`로 넣어 주는 역할. `GameProvider`로 감싼 트리 안에서만 게임 상태를 쓸 수 있음.
- **`useGame()`:** `useContext(GameContext)`를 감싼 훅. Provider 밖에서 호출되면 `null`이므로 에러를 던져서 잘못된 사용을 막음.

---

## 정리

| 항목 | 설명 |
|:---|:---|
| **createContext** | "어떤 타입의 값을 나중에 Provider로 채울 수 있는 Context"를 **정의**하는 함수 |
| **Provider** | 실제 값을 채워 넣고, 그 아래 트리에 "공급"하는 컴포넌트 |
| **useContext** | 현재 트리에서 가장 가까운 같은 Context의 Provider가 준 값을 **읽는** 훅 |

즉, `createContext`는 "이름 붙인 공유 저장소"를 만드는 것이고, 실제 데이터는 항상 **Provider의 value**에서 옵니다.
