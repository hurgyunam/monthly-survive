import { useNavigate } from 'react-router-dom';
import { SafeAreaContainer, PrimaryButton, ResultCard } from '../components';
import { useGame } from '../context/GameContext';
import { ActivityId } from '../types';
import './ResultScreen.css';

export function ResultScreen() {
  const navigate = useNavigate();
  const { currentMonth, selectedActivity, resultValue, nextMonth } = useGame();

  const handleNextMonth = () => {
    nextMonth();
    navigate('/');
  };

  const activity = (selectedActivity ?? 'gather') as ActivityId;
  const value = resultValue ?? 0;

  return (
    <div className="app">
      <SafeAreaContainer>
        <header className="result-header">
          <h1 className="result-title">{currentMonth}월 결과</h1>
        </header>

        <div className="result-spacer" style={{ height: 32 }} />

        <ResultCard activity={activity} value={value} />

        <div className="result-spacer result-spacer--flex" />

        <PrimaryButton onClick={handleNextMonth}>다음 달 설정하기</PrimaryButton>
      </SafeAreaContainer>
    </div>
  );
}
