import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColonistCard, LogList } from '../components';
import { useGame } from '../context/GameContext';
import {
  ActivityId,
  Colonist,
  LogEntry,
  getPrimaryActivity,
  ActivityPriorities,
} from '../types';
import './SimulationScreen.css';

const ACTIVITIES: ActivityId[] = ['gather', 'build', 'craft'];

/** 활동별 결과 계산 (MVP-02-decisions: 채집 30+0~20, 건축 25+0~15, 제작 20+0~10) */
function calculateResult(activity: ActivityId): number {
  switch (activity) {
    case 'gather':
      return 30 + Math.floor(Math.random() * 21);
    case 'build':
      return 25 + Math.floor(Math.random() * 16);
    case 'craft':
      return 20 + Math.floor(Math.random() * 11);
  }
}

/** 우선순위 > 0인 활동 수 */
function countActivePriorities(priorities: ActivityPriorities): number {
  return ACTIVITIES.filter((a) => priorities[a] > 0).length;
}

/** 콜로니원 + 활동별 로그 메시지 생성 (MVP-02) */
function generateLogMessage(
  colonistName: string,
  activity: ActivityId,
  day: number
): string {
  const messages: Record<ActivityId, string[]> = {
    gather: ['채집 중...', `채집 완료 +${10 + Math.floor(Math.random() * 6)}`],
    build: ['건축 중...', `건축 진행 ${20 + Math.floor(Math.random() * 60)}%`],
    craft: ['제작 중...', `제작 완료 +${5 + Math.floor(Math.random() * 8)}`],
  };
  const opts = messages[activity];
  const msg = opts[day % 2];
  return `${colonistName} ${msg}`;
}

export function SimulationScreen() {
  const navigate = useNavigate();
  const { colonists, setResults } = useGame();
  const [currentDay, setCurrentDay] = useState(1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!colonists || colonists.length === 0) {
      navigate('/');
      return;
    }

    const addLogForDay = (day: number) => {
      const colonist = colonists[day % colonists.length];
      const activity = getPrimaryActivity(colonist.priorities);
      const message = generateLogMessage(colonist.name, activity, day);
      setLogs((prev) => {
        const next = [{ day, message }, ...prev];
        return next.slice(0, 5);
      });
    };

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      addLogForDay(1);
    }

    const id = setInterval(() => {
      setCurrentDay((d) => d + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [colonists, navigate]);

  useEffect(() => {
    if (currentDay >= 2 && currentDay <= 30) {
      const colonist = colonists[(currentDay - 1) % colonists.length];
      const activity = getPrimaryActivity(colonist.priorities);
      const message = generateLogMessage(colonist.name, activity, currentDay);
      setLogs((prev) => {
        const next = [{ day: currentDay, message }, ...prev];
        return next.slice(0, 5);
      });
    }
  }, [currentDay, colonists]);

  useEffect(() => {
    if (currentDay >= 30 && colonists.length > 0) {
      const results = colonists.map((c: Colonist) => {
        const activeCount = countActivePriorities(c.priorities) || 1;
        const activityResults: Record<ActivityId, number> = {
          gather: 0,
          build: 0,
          craft: 0,
        };
        for (const activity of ACTIVITIES) {
          if (c.priorities[activity] > 0) {
            activityResults[activity] = Math.floor(
              calculateResult(activity) / activeCount
            );
          }
        }
        return {
          colonistId: c.id,
          name: c.name,
          results: activityResults,
        };
      });
      setResults(results);
      navigate('/result');
    }
  }, [currentDay, colonists, setResults, navigate]);

  return (
    <div className="app">
      <div className="sim-container">
        <div className="sim-top-bar">
          <span className="day-indicator">Day {currentDay} / 30</span>
        </div>

        <div className="sim-spacer" style={{ height: 24 }} />

        <div className="colonist-cards-stack">
          {colonists.map((colonist) => (
            <ColonistCard
              key={colonist.id}
              name={colonist.name}
              activity={getPrimaryActivity(colonist.priorities)}
            />
          ))}
        </div>

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
