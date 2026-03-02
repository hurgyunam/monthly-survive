import { ActivityId, ActivityPriorities, ActivityPriority } from '../types';
import { User, Leaf, Hammer, Wrench } from 'lucide-react';
import './ColonistRoleCard.css';

const ACTIVITY_CONFIG: Record<
  ActivityId,
  { icon: React.ReactNode; label: string; iconClass: string }
> = {
  gather: { icon: <Leaf size={18} />, label: '채집', iconClass: 'colonist-role-card__icon--gather' },
  build: { icon: <Hammer size={18} />, label: '건축', iconClass: 'colonist-role-card__icon--build' },
  craft: { icon: <Wrench size={18} />, label: '제작', iconClass: 'colonist-role-card__icon--craft' },
};

const ACTIVITIES: ActivityId[] = ['gather', 'build', 'craft'];

interface ColonistRoleCardProps {
  name: string;
  priorities: ActivityPriorities;
  onPriorityChange: (activity: ActivityId, value: ActivityPriority) => void;
}

export function ColonistRoleCard({
  name,
  priorities,
  onPriorityChange,
}: ColonistRoleCardProps) {
  const handleClick = (activity: ActivityId, isRight: boolean) => (e: React.MouseEvent) => {
    if (isRight) e.preventDefault();
    const current = priorities[activity];
    const next: ActivityPriority = isRight
      ? (Math.min(4, current + 1) as ActivityPriority)
      : current === 0
        ? 4
        : (Math.max(0, current - 1) as ActivityPriority);
    onPriorityChange(activity, next);
  };

  return (
    <div className="colonist-role-card">
      <div className="colonist-role-card__top">
        <div className="colonist-role-card__avatar">
          <User size={24} strokeWidth={2} />
        </div>
        <span className="colonist-role-card__name">{name}</span>
      </div>
      <div className="colonist-role-card__table-wrap">
        <table className="colonist-role-card__table">
          <thead>
            <tr>
              <th className="colonist-role-card__th colonist-role-card__th--empty" />
              {ACTIVITIES.map((id) => (
                <th key={id} className="colonist-role-card__th">
                  <span className={`colonist-role-card__icon ${ACTIVITY_CONFIG[id].iconClass}`}>
                    {ACTIVITY_CONFIG[id].icon}
                  </span>
                  <span className="colonist-role-card__th-label">{ACTIVITY_CONFIG[id].label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="colonist-role-card__td colonist-role-card__td--empty" />
              {ACTIVITIES.map((id) => (
                <td key={id} className="colonist-role-card__td">
                  <button
                    type="button"
                    className="colonist-role-card__cell"
                    onClick={handleClick(id, false)}
                    onContextMenu={handleClick(id, true)}
                    aria-label={`${ACTIVITY_CONFIG[id].label} 우선순위 ${priorities[id] || '빈칸'}, 좌클릭 감소 우클릭 증가`}
                  >
                    {priorities[id] === 0 ? '—' : priorities[id]}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
