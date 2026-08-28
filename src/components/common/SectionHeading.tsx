import React from 'react';
import { SparkleDoodle } from '../illustrations/MicroDoodles';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  className = ''
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  }[align];

  return (
    <div className={`flex flex-col ${alignClasses} max-w-3xl mb-10 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paper-dark sketch-border text-xs font-bold font-mono text-ink uppercase tracking-wider mb-3 shadow-sketch-sm">
          <SparkleDoodle className="w-3.5 h-3.5 text-hpl-gold" />
          {badge}
          <SparkleDoodle className="w-3.5 h-3.5 text-hpl-gold" />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-ink uppercase leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-ink-muted font-normal max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
