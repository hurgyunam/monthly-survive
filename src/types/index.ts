/** 설정 화면에서 선택 가능한 활동 */
export type ActivityId = 'gather' | 'build' | 'rest';

/** 로그 항목 */
export interface LogEntry {
  day: number;
  message: string;
}
