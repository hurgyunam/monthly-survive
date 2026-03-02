import { LogEntry } from '../types';
import './LogItem.css';

interface LogListProps {
  logs: LogEntry[];
}

export function LogList({ logs }: LogListProps) {
  return (
    <div className="log-list">
      {logs.map((entry, i) => (
        <p key={`${entry.day}-${i}`} className="log-item">
          Day {entry.day}: {entry.message}
        </p>
      ))}
    </div>
  );
}
