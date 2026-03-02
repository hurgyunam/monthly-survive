import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ActivityId, ActivityPriorities, ActivityPriority, Colonist, ColonistResult } from '../types';
import { pickRandomNames } from '../data/colonistNames';

const COLONIST_COUNT = 3;

const DEFAULT_PRIORITIES: ActivityPriorities[] = [
  { gather: 1, build: 0, craft: 0 },
  { gather: 0, build: 1, craft: 0 },
  { gather: 0, build: 0, craft: 1 },
];

interface GameState {
  currentMonth: number;
  colonists: Colonist[];
  colonistResults: ColonistResult[] | null;
}

interface GameContextValue extends GameState {
  setColonistPriority: (colonistId: number, activity: ActivityId, value: ActivityPriority) => void;
  startMonth: (colonists: Colonist[]) => void;
  setResults: (results: ColonistResult[]) => void;
  nextMonth: () => void;
  resetForNewMonth: () => void;
  initColonists: () => void;
}

const createInitialColonists = (): Colonist[] => {
  const names = pickRandomNames(COLONIST_COUNT);
  return names.map((name, i) => ({
    id: i + 1,
    name,
    priorities: { ...DEFAULT_PRIORITIES[i % DEFAULT_PRIORITIES.length] },
  }));
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    currentMonth: 1,
    colonists: [],
    colonistResults: null,
  });

  const initColonists = useCallback(() => {
    setState((s) => ({ ...s, colonists: createInitialColonists() }));
  }, []);

  /** 우선순위 1~4는 활동별로 각각 배정 가능. 해당 활동 셀만 변경 */
  const setColonistPriority = useCallback(
    (colonistId: number, activity: ActivityId, value: ActivityPriority) => {
      setState((s) => ({
        ...s,
        colonists: s.colonists.map((c) => {
          if (c.id !== colonistId) return c;
          return {
            ...c,
            priorities: { ...c.priorities, [activity]: value },
          };
        }),
      }));
    },
    []
  );

  const startMonth = useCallback((colonists: Colonist[]) => {
    setState((s) => ({ ...s, colonists, colonistResults: null }));
  }, []);

  const setResults = useCallback((results: ColonistResult[]) => {
    setState((s) => ({ ...s, colonistResults: results }));
  }, []);

  const nextMonth = useCallback(() => {
    setState((s) => ({
      currentMonth: s.currentMonth + 1,
      colonists: createInitialColonists(),
      colonistResults: null,
    }));
  }, []);

  const resetForNewMonth = useCallback(() => {
    setState((s) => ({
      ...s,
      colonists: createInitialColonists(),
      colonistResults: null,
    }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        setColonistPriority,
        startMonth,
        setResults,
        nextMonth,
        resetForNewMonth,
        initColonists,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
