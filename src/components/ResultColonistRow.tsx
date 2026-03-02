import { ActivityId } from '../types';
import './ResultColonistRow.css';

const ACTIVITY_LABELS: Record<ActivityId, string> = {
  gather: '채집',
  build: '건축',
  craft: '제작',
};

const ACTIVITY_ORDER: ActivityId[] = ['gather', 'build', 'craft'];

interface ResultColonistRowProps {
  name: string;
  results: Record<ActivityId, number>;
}

export function ResultColonistRow({ name, results }: ResultColonistRowProps) {
  const parts = ACTIVITY_ORDER.filter((a) => results[a] > 0).map(
    (a) => `${ACTIVITY_LABELS[a]}: ${results[a]}`
  );
  const text = parts.length > 0 ? `${name} ${parts.join(', ')}` : name;

  return (
    <div className="result-colonist-row">
      <span className="result-colonist-row__text">{text}</span>
    </div>
  );
}
