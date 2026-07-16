import React from 'react';

export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
    primary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
    success: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    warning: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};