import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'purple' | 'gold' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-hpl-coral text-white border-2 border-ink hover:bg-rose-700 shadow-sketch hover:shadow-sketch-lg',
    secondary: 'bg-paper-light text-ink border-2 border-ink hover:bg-paper-muted shadow-sketch hover:shadow-sketch-lg',
    purple: 'bg-hpl-purple text-white border-2 border-ink hover:bg-purple-800 shadow-sketch hover:shadow-sketch-lg',
    gold: 'bg-hpl-gold text-ink border-2 border-ink hover:bg-amber-400 shadow-sketch hover:shadow-sketch-lg font-bold',
    outline: 'bg-transparent text-ink border-2 border-ink hover:bg-paper-dark shadow-sketch-sm hover:shadow-sketch',
    danger: 'bg-hpl-red text-white border-2 border-ink hover:bg-red-700 shadow-sketch'
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm sm:text-base px-5 py-2.5 rounded-xl font-bold',
    lg: 'text-base sm:text-lg px-7 py-3.5 rounded-2xl font-extrabold uppercase tracking-wide'
  }[size];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 cursor-pointer font-sans transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-sketch-sm disabled:opacity-50 disabled:cursor-not-allowed select-none ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
