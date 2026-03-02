import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColonistCard, LogList } from '../components';
import { useGame } from '../context/GameContext';
import { ActivityId, LogEntry } from '../types';
import './SimulationScreen.css';

/** 활동별 결과 계산 (MVP-01-first-cycle 공식) */
function calculateResult(activity: ActivityId): number {
  switch (activity) {
    case 'gather':
      return 30 + Math.floor(Math.random() * 21);
    case 'build':
      return 25 + Math.floor(Math.random() * 16);
    case 'rest':
      return 20 + Math.floor(Math.random() * 11);
  }
}

/** 활동별 로그 메시지 생성 */
function generateLogMessage(activity: ActivityId, day: number): string {
  const messages: Record<ActivityId, string[]> = {
    gather: ['채집 중...', `채집 완료 +${10 + Math.floor(Math.random() * 6)}`],
    build: ['건축 중...', `건축 진행 ${20 + Math.floor(Math.random() * 60)}%`],
    rest: ['휴식 중...', `피로 회복 +${3 + Math.floor(Math.random() * 5)}`],
  };
  const opts = messages[activity];
  return opts[day % 2];
}

export function SimulationScreen() {
  const navigate = useNavigate();
  const { selectedActivity, setResult } = useGame();
  const [currentDay, setCurrentDay] = useState(1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const hasInitialized = useRef(false);

  const activity = selectedActivity ?? 'gather';

  useEffect(() => {
    if (!selectedActivity) {
      navigate('/');
      return;
    }

    const addLogForDay = (day: number) => {
      const message = generateLogMessage(activity, day);
      setLogs((prev) => {
        const next = [{ day, message }, ...prev];
        return next.slice(0, 5);
      });
    };

    // Strict Mode 대응: addLog(1)은 최초 1회만 실행 (ref는 cleanup 후에도 유지됨)
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      addLogForDay(1);
    }

    const id = setInterval(() => {
      setCurrentDay((d) => d + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [selectedActivity, navigate, activity]);

  // currentDay 변경 시 로그 추가 (side effect를 setState updater 밖으로 분리, Strict Mode 대응)
  useEffect(() => {
    if (currentDay >= 2 && currentDay <= 30) {
      const message = generateLogMessage(activity, currentDay);
      setLogs((prev) => {
        const next = [{ day: currentDay, message }, ...prev];
        return next.slice(0, 5);
      });
    }
  }, [currentDay, activity]);

  useEffect(() => {
    if (currentDay >= 30) {
      const result = calculateResult(activity);
      setResult(result);
      navigate('/result');
    }
  }, [currentDay, activity, setResult, navigate]);

  return (
    <div className="app">
      <div className="sim-container">
        <div className="sim-top-bar">
          <span className="day-indicator">Day {currentDay} / 30</span>
        </div>

        <div className="sim-spacer" style={{ height: 24 }} />

        <ColonistCard activity={activity} />

        <div className="sim-spacer" style={{ height: 24 }} />

        <section className="log-section">
          <p className="log-section__label">활동 로그</p>
          <div className="sim-spacer" style={{ height: 8 }} />
          <LogList logs={logs} />
        </section>

        <div className="sim-spacer sim-spacer--flex" />
      </div>
    </div>
  );
}
