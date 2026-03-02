/** 설정 화면에서 선택 가능한 활동 */
export type ActivityId = 'gather' | 'build' | 'craft';

/** 활동별 우선순위 (0 = 빈칸/하지 않음, 1~4 = 우선순위. 활동별로 각각 배정 가능) */
export type ActivityPriority = 0 | 1 | 2 | 3 | 4;

/** 활동별 우선순위 맵 (림월드 스타일) */
export type ActivityPriorities = Record<ActivityId, ActivityPriority>;

/** 1순위(주요) 활동 반환. 없으면 gather */
export function getPrimaryActivity(priorities: ActivityPriorities): ActivityId {
  const ACTIVITIES: ActivityId[] = ['gather', 'build', 'craft'];
  const first = ACTIVITIES.find((a) => priorities[a] === 1);
  return first ?? 'gather';
}

/** 로그 항목 */
export interface LogEntry {
  day: number;
  message: string;
}

/** 콜로니원 (MVP-02: 이름 + 활동 우선순위) */
export interface Colonist {
  id: number;
  name: string;
  priorities: ActivityPriorities;
}

/** 콜로니원별 시뮬 결과 (MVP-02, 다중 우선순위) */
export interface ColonistResult {
  colonistId: number;
  name: string;
  /** 활동별 성과 수치 (우선순위 > 0인 활동만 포함) */
  results: Record<ActivityId, number>;
}
