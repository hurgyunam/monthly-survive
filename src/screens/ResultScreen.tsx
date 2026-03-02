import { useNavigate } from 'react-router-dom';
import { SafeAreaContainer, PrimaryButton, ResultColonistRow } from '../components';
import { useGame } from '../context/GameContext';
import './ResultScreen.css';

export function ResultScreen() {
  const navigate = useNavigate();
  const { currentMonth, colonistResults, nextMonth } = useGame();

  const handleNextMonth = () => {
    nextMonth();
    navigate('/');
  };

  return (
    <div className="app">
      <SafeAreaContainer>
        <header className="result-header">
          <h1 className="result-title">{currentMonth}월 결과</h1>
        </header>

        <div className="result-spacer" style={{ height: 32 }} />

        <div className="result-colonist-list">
          {(colonistResults ?? []).map((r) => (
            <ResultColonistRow
              key={r.colonistId}
              name={r.name}
              results={r.results}
            />
          ))}
        </div>

        <div className="result-spacer result-spacer--flex" />

        <PrimaryButton onClick={handleNextMonth}>다음 달 설정하기</PrimaryButton>
      </SafeAreaContainer>
    </div>
  );
}
