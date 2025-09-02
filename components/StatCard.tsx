
import React from 'react';

interface StatCardProps {
  title: string;
  percentage: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, percentage }) => {
  const getBorderColor = (p: number) => {
    if (p >= 80) return 'border-brand-success';
    if (p >= 50) return 'border-yellow-500';
    return 'border-brand-danger';
  };

  return (
    <div className={`bg-brand-surface p-5 rounded-xl border-l-4 ${getBorderColor(percentage)} shadow-lg`}>
      <p className="text-brand-text-secondary font-medium">{title}</p>
      <p className="text-4xl font-bold text-slate-100 mt-2">{percentage}%</p>
      <p className="text-brand-text-secondary text-sm mt-1">inbox placement</p>
    </div>
  );
};

export default StatCard;
