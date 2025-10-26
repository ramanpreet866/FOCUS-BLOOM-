import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, colorClass = 'bg-gradient-to-r from-leaf-green to-leaf-light' }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="w-full bg-forest-light/50 rounded-full h-4 overflow-hidden">
      <div
        className={`h-4 rounded-full transition-all duration-500 ease-out ${colorClass}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
