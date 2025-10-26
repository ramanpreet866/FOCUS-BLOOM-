import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-forest-dark/50 backdrop-blur-sm border border-forest-light/20 rounded-2xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};
