import { useNavigate } from 'react-router-dom';
import {
  SafeAreaContainer,
  PrimaryButton,
  ActivityCard,
} from '../components';
import { useGame } from '../context/GameContext';
import { ActivityId } from '../types';
import './SetupScreen.css';

export function SetupScreen() {
  const navigate = useNavigate();
  const { currentMonth, selectedActivity, setSelectedActivity, startMonth } = useGame();

  const handleStart = () => {
    if (selectedActivity) {
      startMonth(selectedActivity);
      navigate('/sim');
    }
  };

  const activities: ActivityId[] = ['gather', 'build', 'rest'];

  return (
    <div className="app">
      <SafeAreaContainer>
        <header className="setup-header">
          <h1 className="setup-title">{currentMonth}월 설정</h1>
        </header>

        <div className="setup-spacer" style={{ height: 32 }} />

        <div className="question-block">
          <p className="question-text">이번 달에 집중할 활동을 선택하세요</p>
        </div>

        <div className="setup-spacer" style={{ height: 16 }} />

        <div className="activity-select-stack">
          {activities.map((id) => (
            <ActivityCard
              key={id}
              id={id}
              selected={selectedActivity === id}
              onSelect={() => setSelectedActivity(id)}
            />
          ))}
        </div>

        <div className="setup-spacer setup-spacer--flex" />

        <PrimaryButton disabled={!selectedActivity} onClick={handleStart}>
          이달 시작
        </PrimaryButton>
      </SafeAreaContainer>
    </div>
  );
}
