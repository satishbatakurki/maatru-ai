import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-botanical hover:bg-botanical-light text-white shadow-sm focus:ring-sage-400 active:scale-[0.98]",
    secondary: "bg-white hover:bg-sage-50 text-slate-700 border border-slate-200 shadow-sm focus:ring-sage-300",
    outline: "bg-transparent hover:bg-sage-100 text-botanical border border-sage-300 focus:ring-sage-300",
    ghost: "bg-transparent hover:bg-sage-100 text-slate-600 focus:ring-sage-200",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-300",
    warning: "bg-amber-600 hover:bg-amber-700 text-white shadow-sm focus:ring-amber-300"
  };

  const sizes = {
    xs: "text-xs px-2.5 py-1.5 gap-1",
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};
