import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 border-b border-slate-200/60 bg-white flex items-center justify-between px-6">
      {/* Hộp tìm kiếm */}
      <div className="relative w-72">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </span>
        <input 
          type="text" 
          placeholder="Tìm kiếm báo cáo, chỉ số..." 
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Khu vực thông báo và thông tin cá nhân */}
      <div className="flex items-center gap-4">
        {/* Chuông báo động */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>

        <div className="w-[1px] h-6 bg-slate-200" />

        {/* Thông tin User */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100 shadow-sm">
            MT
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">May Tran</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Senior Business Analyst</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};