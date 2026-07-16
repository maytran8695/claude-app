import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  FolderKanban, 
  HelpCircle, 
  TrendingUp,
  LineChart
} from 'lucide-react';

export const Sidebar = ({ activeTab = 'dashboard', setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Tổng', icon: LayoutDashboard },
    { id: 'analytics', label: 'Phân Tích Kinh Tế', icon: BarChart3 },
    { id: 'risk', label: 'Quản Trị Rủi Ro', icon: TrendingUp },
    { id: 'projects', label: 'Quản Lý Dự Án', icon: FolderKanban },
    { id: 'settings', label: 'Cài Đặt', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800">
      {/* Tên thương hiệu ứng dụng */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-2.5">
        <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-md shadow-indigo-500/20">
          <LineChart className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-white font-bold text-sm tracking-wide leading-tight">M-ANALYTICS</h1>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Workspace Hub</p>
        </div>
      </div>

      {/* Menu các trang */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab && setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-150 group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Phần cuối Sidebar */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
          <HelpCircle className="w-5 h-5 text-slate-500" />
          <span>Hỗ Trợ & Tài Liệu</span>
        </div>
      </div>
    </aside>
  );
};