import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SafeAreaContainer,
  PrimaryButton,
  ColonistRoleCard,
} from '../components';
import { useGame } from '../context/GameContext';
import './SetupScreen.css';

export function SetupScreen() {
  const navigate = useNavigate();
  const {
    currentMonth,
    colonists,
    setColonistPriority,
    startMonth,
    initColonists,
  } = useGame();

  useEffect(() => {
    if (colonists.length === 0) initColonists();
  }, [colonists.length, initColonists]);

  const handleStart = () => {
    if (colonists.length > 0) {
      startMonth(colonists);
      navigate('/sim');
    }
  };

  return (
    <div className="app">
      <SafeAreaContainer>
        <header className="setup-header">
          <h1 className="setup-title">{currentMonth}월 설정</h1>
        </header>

        <div className="setup-spacer" style={{ height: 32 }} />

        <div className="question-block">
          <p className="question-text">각 콜로니원의 역할을 선택하세요</p>
        </div>

        <div className="setup-spacer" style={{ height: 16 }} />

        <div className="colonist-role-stack">
          {colonists.map((colonist) => (
            <ColonistRoleCard
              key={colonist.id}
              name={colonist.name}
              priorities={colonist.priorities}
              onPriorityChange={(activity, value) =>
                setColonistPriority(colonist.id, activity, value)
              }
            />
          ))}
        </div>

        <div className="setup-spacer setup-spacer--flex" />

        <PrimaryButton disabled={colonists.length === 0} onClick={handleStart}>
          이달 시작
        </PrimaryButton>
      </SafeAreaContainer>
    </div>
  );
}
