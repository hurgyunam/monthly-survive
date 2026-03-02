import { ActivityId } from '../types';
import { User } from 'lucide-react';
import './ColonistCard.css';

const ACTIVITY_LABELS: Record<ActivityId, string> = {
  gather: '채집 중...',
  build: '건축 중...',
  rest: '휴식 중...',
};

interface ColonistCardProps {
  activity: ActivityId;
  name?: string;
}

export function ColonistCard({ activity, name = '콜로니원' }: ColonistCardProps) {
  return (
    <div className="colonist-card">
      <div className="colonist-card__avatar">
        <User size={28} strokeWidth={2} />
      </div>
      <div className="colonist-card__text">
        <p className="colonist-card__name">{name}</p>
        <p className="colonist-card__activity">{ACTIVITY_LABELS[activity]}</p>
      </div>
    </div>
  );
}
