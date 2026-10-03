import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  action,
  icon: Icon,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  hover = false,
  badge
}) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 shadow-soft-card overflow-hidden transition-all duration-200 ${hover ? 'hover:shadow-elevated-card hover:border-sage-300' : ''} ${className}`}>
      {(title || Icon || action) && (
        <div className={`px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 ${headerClassName}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && (
              <div className="p-2 rounded-lg bg-botanical-soft text-botanical shrink-0">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-800 text-sm md:text-base truncate">{title}</h3>
                {badge}
              </div>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-500">
          {footer}
        </div>
      )}
    </div>
  );
};
