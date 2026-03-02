import { ActivityId } from '../types';
import { Leaf, Hammer, Wrench } from 'lucide-react';
import './ActivityCard.css';

const ACTIVITY_CONFIG: Record<
  ActivityId,
  { icon: React.ReactNode; label: string; sublabel: string; iconClass: string }
> = {
  gather: {
    icon: <Leaf size={28} />,
    label: '채집',
    sublabel: '자원 수집에 집중',
    iconClass: 'activity-card__icon--gather',
  },
  build: {
    icon: <Hammer size={28} />,
    label: '건축',
    sublabel: '시설 건설에 집중',
    iconClass: 'activity-card__icon--build',
  },
  craft: {
    icon: <Wrench size={28} />,
    label: '제작',
    sublabel: '도구·장비 제작에 집중',
    iconClass: 'activity-card__icon--craft',
  },
};

interface ActivityCardProps {
  id: ActivityId;
  selected: boolean;
  onSelect: () => void;
}

export function ActivityCard({ id, selected, onSelect }: ActivityCardProps) {
  const config = ACTIVITY_CONFIG[id];
  return (
    <button
      type="button"
      className={`activity-card ${selected ? 'activity-card--selected' : ''}`}
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      aria-label={`${config.label} 선택`}
    >
      <span className={`activity-card__icon ${config.iconClass}`}>{config.icon}</span>
      <div className="activity-card__text">
        <p className="activity-card__label">{config.label}</p>
        <p className="activity-card__sublabel">{config.sublabel}</p>
      </div>
    </button>
  );
}
