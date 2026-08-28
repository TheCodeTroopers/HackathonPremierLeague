import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'emerald' | 'blue' | 'purple' | 'coral' | 'paper' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'paper',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    gold: 'bg-hpl-yellow text-ink border-ink',
    emerald: 'bg-emerald-100 text-emerald-900 border-ink',
    blue: 'bg-blue-100 text-blue-900 border-ink',
    purple: 'bg-purple-100 text-purple-900 border-ink',
    coral: 'bg-rose-100 text-rose-900 border-ink',
    paper: 'bg-paper-dark text-ink border-ink',
    dark: 'bg-ink text-paper-light border-ink'
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs sm:text-sm px-3 py-1',
    lg: 'text-sm sm:text-base px-4 py-1.5 font-bold'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-bold uppercase rounded-full border-2 sketch-shadow-sm ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
};
