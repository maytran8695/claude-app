import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';

// =========================================================================
// 1. QUÉT ĐỘNG TOÀN BỘ FILE JSX TRONG THƯ MỤC ARTICLES (TỰ ĐỘNG)
// =========================================================================
const articleModules = import.meta.glob('./articles/**/*.jsx', { eager: true });

const articles = Object.entries(articleModules).map(([path, module]) => {
  const fileNameWithExt = path.split('/').pop();
  const id = fileNameWithExt.replace('.jsx', '');
  
  // Format lại tiêu đề cho đẹp mắt
  const title = id
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());

  const Component = module.default || Object.values(module).find(val => typeof val === 'function');

  // Lấy tên thư mục con làm Chuyên mục (mặc định là 'Chung')
  const pathParts = path.split('/');
  const rawCategory = pathParts.length > 3 ? pathParts[pathParts.length - 2] : 'Chung';
  
  // Chuẩn hóa tên Category
  let category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
  if (category.toLowerCase() === 'finance') category = 'Finance';
  if (category.toLowerCase() === 'language') category = 'Language';
  if (category.toLowerCase() === 'health') category = 'Health';

  return {
    id,
    title,
    category,
    Component
  };
}).filter(item => item.Component !== undefined);

// Định nghĩa màu sắc sinh động riêng biệt cho từng Chuyên mục lớn
const categoryThemes = {
  Finance: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badge: 'bg-emerald-500',
    border: 'border-emerald-500/20',
    icon: '📊'
  },
  Language: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    badge: 'bg-blue-500',
    border: 'border-blue-500/20',
    icon: '🌐'
  },
  Health: {
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    badge: 'bg-rose-500',
    border: 'border-rose-500/20',
    icon: '❤️'
  },
  Default: {
    text: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badge: 'bg-indigo-500',
    border: 'border-indigo-500/20',
    icon: '📂'
  }
};

const getTheme = (cat) => categoryThemes[cat] || categoryThemes.Default;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Tab được chọn trên Dashboard chính (All, Finance, Language,...)
  const [activeDashboardTab, setActiveDashboardTab] = useState('All');

  // =========================================================================
  // LOGIC KÉO THẢ CHIỀU RỘNG SIDEBAR (RESIZABLE SIDEBAR)
  // =========================================================================
  const [sidebarWidth, setSidebarWidth] = useState(280); // Mặc định 280px
  const isResizing = useRef(false);

  const startResizing = useCallback((e) => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Tránh bôi đen chữ khi kéo
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const resize = useCallback((e) => {
    if (!isResizing.current) return;
    // Giới hạn chiều rộng sidebar từ 200px đến 500px
    if (e.clientX >= 200 && e.clientX <= 500) {
      setSidebarWidth(e.clientX);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  // Lọc bài viết theo ô tìm kiếm
  const filteredArticles = useMemo(() => {
    return articles.filter(art => 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Lấy danh sách các categories duy nhất hiện có
  const uniqueCategories = useMemo(() => {
    const cats = new Set(articles.map(art => art.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Nhóm các bài viết theo chuyên mục để hiển thị sidebar
  const groupedArticles = useMemo(() => {
    const groups = {};
    filteredArticles.forEach(art => {
      if (!groups[art.category]) {
        groups[art.category] = [];
      }
      groups[art.category].push(art);
    });
    return groups;
  }, [filteredArticles]);

  const activeArticle = articles.find(art => art.id === activeTab);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* ==========================================
          SIDEBAR KÉO THẢ CHIỀU RỘNG
          ========================================== */}
      <div 
        style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '64px' }}
        className="relative shrink-0 bg-white border-r border-slate-200 flex flex-col h-full z-30 transition-shadow duration-200"
      >
        {/* Header Sidebar */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-sm leading-none">Workspace</h1>
                <span className="text-[10px] text-slate-400 font-medium">Đồng bộ tự động</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm mx-auto">
              M
            </div>
          )}
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hidden md:block"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Thanh tìm kiếm */}
        {isSidebarOpen && (
          <div className="p-3 border-b border-slate-100 shrink-0">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-xs">
                🔍
              </span>
              <input
                type="text"
                placeholder="Tìm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border border-transparent rounded-lg text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* Menu & Danh mục bài viết */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {isSidebarOpen && (
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                🏠 Trang Chủ Tổng Quan
              </button>
            </div>
          )}

          {/* Các chuyên mục bài viết (Màu sắc sinh động, Font chữ to hơn) */}
          {isSidebarOpen ? (
            Object.entries(groupedArticles).map(([category, items]) => {
              const theme = getTheme(category);
              return (
                <div key={category} className="space-y-2 pt-2">
                  <h3 className={`px-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${theme.text}`}>
                    <span>{theme.icon}</span>
                    <span>{category}</span>
                  </h3>
                  <div className="space-y-1">
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between group ${
                          activeTab === item.id
                            ? 'bg-indigo-600 text-white font-medium shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate pr-2">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            /* Sidebar khi thu gọn */
            <div className="flex flex-col items-center gap-3">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-100 text-slate-600'
                }`}
                title="Trang Chủ"
              >
                🏠
              </button>
              <div className="w-8 border-b border-slate-200" />
              {articles.map(item => {
                const theme = getTheme(item.category);
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                      activeTab === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-500'
                    }`}
                    title={item.title}
                  >
                    {theme.icon}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Thanh cầm kéo giãn kích thước (Gờ kéo thả) */}
        {isSidebarOpen && (
          <div 
            onMouseDown={startResizing}
            className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-indigo-500/30 active:bg-indigo-600/50 transition-colors z-40"
          />
        )}
      </div>

      {/* ==========================================
          VÙNG HIỂN THỊ CHÍNH (RESPONSIVE FULL-SIZE)
          ========================================== */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar đầu trang */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 md:hidden"
            >
              ☰
            </button>
            <h2 className="font-bold text-slate-800 text-sm">
              {activeArticle ? activeArticle.title : 'Workspace Tài Liệu'}
            </h2>
          </div>
        </header>

        {/* Khung nội dung */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {activeArticle ? (
            /* TRANG NỘI DUNG (FULL WIDTH RESPONSIVE THEO SIDEBAR) */
            <div className="w-full bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 md:p-8 min-h-full transition-all">
              {/* Header bài viết đã được lược bỏ thông tin file thừa */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${getTheme(activeArticle.category).bg}`}>
                  {getTheme(activeArticle.category).icon} {activeArticle.category}
                </span>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  ← Về Dashboard chính
                </button>
              </div>

              {/* Tải Component thực tế từ Claude */}
              <div className="prose prose-slate max-w-none w-full">
                <activeArticle.Component />
              </div>
            </div>
          ) : (
            /* ==========================================
                TRANG TỔNG QUAN (DASHBOARD) THEO CÁC TAB LỚN
                ========================================== */
            <div className="w-full space-y-6 transition-all">
              {/* Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 md:p-8 text-white shadow-sm">
                <h1 className="text-xl md:text-2xl font-bold">Thư viện bài viết tích hợp 📝</h1>
                <p className="text-indigo-100 text-xs md:text-sm mt-1 max-w-xl">
                  Giao diện đồng bộ tự động toàn bộ cấu trúc bài viết của bạn. Chọn theo các chuyên mục bên dưới để đọc nhanh.
                </p>
              </div>

              {/* Bộ điều khiển Tab chính trên Dashboard */}
              <div className="border-b border-slate-200 flex items-center gap-1 overflow-x-auto pb-1 shrink-0">
                {uniqueCategories.map(cat => {
                  const theme = getTheme(cat);
                  const isSelected = activeDashboardTab === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveDashboardTab(cat)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        isSelected 
                          ? `${theme.bg} shadow-sm border` 
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      <span>{theme.icon}</span>
                      <span>{cat === 'All' ? 'Tất cả bài viết' : cat}</span>
                    </button>
                  );
                })}
              </div>

              {/* Danh sách các bài viết đã được lọc theo Tab (Không lộ file hay định dạng) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles
                  .filter(art => activeDashboardTab === 'All' || art.category === activeDashboardTab)
                  .map(art => {
                    const theme = getTheme(art.category);
                    return (
                      <div 
                        key={art.id} 
                        onClick={() => setActiveTab(art.id)}
                        className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${theme.bg}`}>
                              {theme.icon} {art.category}
                            </span>
                            <span className="text-xs opacity-0 group-hover:opacity-100 text-indigo-600 transition-all font-medium">
                              Đọc bài →
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {art.title}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {articles.filter(art => activeDashboardTab === 'All' || art.category === activeDashboardTab).length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-400">Không tìm thấy bài viết nào trong chuyên mục này.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;