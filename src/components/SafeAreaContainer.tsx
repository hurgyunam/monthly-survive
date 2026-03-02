import { ReactNode } from 'react';
import './SafeAreaContainer.css';

interface SafeAreaContainerProps {
  children: ReactNode;
  variant?: 'default' | 'sim';
}

export function SafeAreaContainer({ children, variant = 'default' }: SafeAreaContainerProps) {
  return (
    <div className={`safe-area-container ${variant === 'sim' ? 'safe-area-container--sim' : ''}`}>
      {children}
    </div>
  );
}
