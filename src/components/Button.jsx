import React from 'react';

export const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-100 focus:ring-indigo-500',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 focus:ring-indigo-500',
    ghost: 'hover:bg-slate-50 text-slate-600 hover:text-slate-950 focus:ring-slate-200',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm focus:ring-rose-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';