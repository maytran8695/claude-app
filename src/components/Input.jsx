import React from 'react';

export const Input = React.forwardRef(({ className = '', type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={`flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className}`}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className}`}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';