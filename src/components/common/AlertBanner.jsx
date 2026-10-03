import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export const AlertBanner = ({
  variant = 'warning',
  title,
  children,
  action,
  onDismiss,
  className = ''
}) => {
  const styles = {
    warning: {
      bg: 'bg-amber-50/90 border-amber-200 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600'
    },
    danger: {
      bg: 'bg-rose-50/90 border-rose-200 text-rose-900',
      icon: AlertCircle,
      iconColor: 'text-rose-600'
    },
    info: {
      bg: 'bg-sky-50/90 border-sky-200 text-sky-900',
      icon: Info,
      iconColor: 'text-sky-600'
    },
    success: {
      bg: 'bg-emerald-50/90 border-emerald-200 text-emerald-900',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600'
    },
    botanical: {
      bg: 'bg-botanical-soft border-botanical-border text-sage-900',
      icon: Info,
      iconColor: 'text-botanical'
    }
  };

  const current = styles[variant] || styles.warning;
  const Icon = current.icon;

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${current.bg} ${className}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-semibold mb-0.5">{title}</h4>}
        <div className="text-xs md:text-sm leading-relaxed">{children}</div>
      </div>
      {action && <div className="shrink-0 ml-2">{action}</div>}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
