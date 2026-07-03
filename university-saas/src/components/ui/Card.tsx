import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', padding = true, hover = false }) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${hover ? 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-100' : ''} ${padding ? 'p-6' : ''} ${className}`}>
    {children}
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color = 'blue' }) => {
  const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
    blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   ring: 'ring-blue-100' },
    green:  { bg: 'bg-emerald-50', icon: 'text-emerald-600', ring: 'ring-emerald-100' },
    purple: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'ring-violet-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', ring: 'ring-orange-100' },
    red:    { bg: 'bg-red-50',    icon: 'text-red-600',    ring: 'ring-red-100' },
  };

  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">{value}</p>
          {trend && (
            <p className={`text-xs mt-1.5 font-semibold ${trend.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% ce mois
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ring-4 ${c.bg} ${c.icon} ${c.ring}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
