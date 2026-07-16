import React from 'react';

export const Card = ({ className = '', ...props }) => (
  <div className={`bg-white rounded-xl border border-slate-200/60 shadow-sm ${className}`} {...props} />
);

export const CardHeader = ({ className = '', ...props }) => (
  <div className={`p-5 flex flex-col space-y-1.5 ${className}`} {...props} />
);

export const CardTitle = ({ className = '', ...props }) => (
  <h3 className={`text-base font-bold text-slate-900 leading-none tracking-tight ${className}`} {...props} />
);

export const CardDescription = ({ className = '', ...props }) => (
  <p className={`text-xs text-slate-500 ${className}`} {...props} />
);

export const CardContent = ({ className = '', ...props }) => (
  <div className={`p-5 pt-0 text-sm ${className}`} {...props} />
);

export const CardFooter = ({ className = '', ...props }) => (
  <div className={`p-5 pt-0 flex items-center border-t border-slate-50 mt-4 ${className}`} {...props} />
);