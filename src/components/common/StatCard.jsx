import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive,
  colorScheme = 'sage',
  onClick
}) => {
  const schemes = {
    sage: {
      bg: 'bg-white',
      iconBg: 'bg-botanical-soft text-botanical',
      border: 'border-slate-200/80',
      valueColor: 'text-slate-800'
    },
    emerald: {
      bg: 'bg-white',
      iconBg: 'bg-emerald-50 text-emerald-700',
      border: 'border-emerald-100',
      valueColor: 'text-emerald-950'
    },
    amber: {
      bg: 'bg-white',
      iconBg: 'bg-amber-50 text-amber-700',
      border: 'border-amber-100',
      valueColor: 'text-amber-950'
    },
    rose: {
      bg: 'bg-white',
      iconBg: 'bg-rose-50 text-rose-700',
      border: 'border-rose-100',
      valueColor: 'text-rose-950'
    },
    sky: {
      bg: 'bg-white',
      iconBg: 'bg-sky-50 text-sky-700',
      border: 'border-sky-100',
      valueColor: 'text-sky-950'
    }
  };

  const scheme = schemes[colorScheme] || schemes.sage;

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl border shadow-soft-card ${scheme.bg} ${scheme.border} transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-elevated-card hover:border-sage-300' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-bold tracking-tight ${scheme.valueColor}`}>{value}</span>
            {trend && (
              <span className={`text-xs font-semibold ${trendPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
                {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${scheme.iconBg} shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
