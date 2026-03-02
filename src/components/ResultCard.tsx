import { ActivityId } from '../types';
import './ResultCard.css';

const ACTIVITY_LABELS: Record<ActivityId, string> = {
  gather: '채집 성과',
  build: '건축 성과',
  rest: '휴식 성과',
};

interface ResultCardProps {
  activity: ActivityId;
  value: number;
}

export function ResultCard({ activity, value }: ResultCardProps) {
  return (
    <div className="result-card">
      <p className="result-card__label">{ACTIVITY_LABELS[activity]}</p>
      <p className="result-card__value">{value}</p>
    </div>
  );
}
