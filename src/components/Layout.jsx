import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen w-screen bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Sidebar cố định bên trái */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Cột chính bên phải */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header trên cùng */}
        <Header />
        
        {/* Vùng nội dung cuộn được độc lập */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};