import { ButtonHTMLAttributes } from 'react';
import './PrimaryButton.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ children, disabled, ...props }: PrimaryButtonProps) {
  return (
    <button type="button" className="primary-button" disabled={disabled} {...props}>
      {children}
    </button>
  );
}
