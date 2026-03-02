import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ActivityId } from '../types';

interface GameState {
  currentMonth: number;
  selectedActivity: ActivityId | null;
  resultValue: number | null;
}

interface GameContextValue extends GameState {
  setSelectedActivity: (activity: ActivityId) => void;
  startMonth: (activity: ActivityId) => void;
  setResult: (value: number) => void;
  nextMonth: () => void;
  resetForNewMonth: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    currentMonth: 1,
    selectedActivity: null,
    resultValue: null,
  });

  const setSelectedActivity = useCallback((activity: ActivityId) => {
    setState((s) => ({ ...s, selectedActivity: activity }));
  }, []);

  const startMonth = useCallback((activity: ActivityId) => {
    setState((s) => ({ ...s, selectedActivity: activity }));
  }, []);

  const setResult = useCallback((value: number) => {
    setState((s) => ({ ...s, resultValue: value }));
  }, []);

  const nextMonth = useCallback(() => {
    setState((s) => ({
      currentMonth: s.currentMonth + 1,
      selectedActivity: null,
      resultValue: null,
    }));
  }, []);

  const resetForNewMonth = useCallback(() => {
    setState((s) => ({ ...s, selectedActivity: null, resultValue: null }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        setSelectedActivity,
        startMonth,
        setResult,
        nextMonth,
        resetForNewMonth,
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
