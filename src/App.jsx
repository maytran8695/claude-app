import React, { useState, useMemo } from 'react';

// =========================================================================
// 1. QUÉT ĐỘNG TOÀN BỘ FILE JSX TRONG THƯ MỤC ARTICLES (KHÔNG CẦN HARDCODE)
// =========================================================================
const articleModules = import.meta.glob('./articles/**/*.jsx', { eager: true });

// Tự động phân tích đường dẫn và nạp component thực tế từ thư mục của bạn
const articles = Object.entries(articleModules).map(([path, module]) => {
  const fileNameWithExt = path.split('/').pop();
  const id = fileNameWithExt.replace('.jsx', '');
  
  // Chuyển tên file thành Tiêu đề đẹp (ví dụ: "DongGiao_DGC" -> "Dong Giao DGC")
  const title = id
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());

  // Trích xuất component từ file (ưu tiên export default, nếu không có thì lấy export đầu tiên)
  const Component = module.default || Object.values(module).find(val => typeof val === 'function');

  // Xác định chuyên mục dựa trên thư mục con (ví dụ: articles/finance/DGC.jsx -> Chuyên mục "Finance")
  const pathParts = path.split('/');
  const category = pathParts.length > 3 ? pathParts[pathParts.length - 2] : 'Chung';

  return {
    id,
    title,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    path,
    Component
  };
}).filter(item => item.Component !== undefined); // Chỉ giữ lại các file có Component hợp lệ

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Bộ lọc tìm kiếm bài viết nhanh
  const filteredArticles = useMemo(() => {
    return articles.filter(art => 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Nhóm các bài viết theo Chuyên mục thư mục
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
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* ==========================================
          SIDEBAR DỰA TRÊN THƯ MỤC THỰC TẾ
          ========================================== */}
      <div 
        className={`${
          isSidebarOpen ? 'w-64 md:w-72' : 'w-0 md:w-16'
        } shrink-0 bg-white border-r border-slate-200 flex flex-col h-full transition-all duration-300 ease-in-out z-30`}
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
                <span className="text-[10px] text-slate-400 font-medium">maytran8695</span>
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

        {/* Thanh tìm kiếm bài viết */}
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

        {/* Danh sách Menu động */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {isSidebarOpen && (
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                🏠 Trang Chủ Tổng Quan
              </button>
            </div>
          )}

          {/* Hiển thị danh mục & bài viết thực tế quét được */}
          {isSidebarOpen ? (
            Object.entries(groupedArticles).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  📂 {category}
                </h3>
                <div className="space-y-0.5">
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                        activeTab === item.id
                          ? 'bg-indigo-600 text-white font-medium shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate max-w-[180px]">{item.title}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                        activeTab === item.id 
                          ? 'bg-indigo-700 text-indigo-100' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        JSX
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            /* Khi Sidebar thu nhỏ */
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
              {articles.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    activeTab === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-500'
                  }`}
                  title={item.title}
                >
                  {item.title.substring(0, 2)}
                </button>
              ))}
            </div>
          )}

          {isSidebarOpen && filteredArticles.length === 0 && (
            <div className="text-center py-6">
              <p className="text-[11px] text-slate-400">Không tìm thấy bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Footer Sidebar */}
        {isSidebarOpen && (
          <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-[10px] text-slate-400 flex justify-between items-center shrink-0">
            <span>Quét được: {articles.length} bài viết</span>
            <span className="font-mono text-emerald-500">● Đã đồng bộ</span>
          </div>
        )}
      </div>

      {/* ==========================================
          VÙNG HIỂN THỊ NỘI DUNG CHÍNH (MAIN AREA)
          ========================================== */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 md:hidden"
            >
              ☰
            </button>
            <h2 className="font-semibold text-slate-800 text-sm">
              {activeArticle ? activeArticle.title : 'Workspace Tài Liệu'}
            </h2>
          </div>
          
          <span className="text-[11px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-mono font-medium">
            Tải động hoạt động (Dynamic Import)
          </span>
        </header>

        {/* Khung nội dung */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {activeArticle ? (
            <div className="max-w-5xl mx-auto bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 md:p-8 min-h-full">
              {/* Thanh điều hướng nhanh của bài viết */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Vị trí file:</span>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono text-[10px]">
                    {activeArticle.path}
                  </span>
                </div>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  ← Về Dashboard chính
                </button>
              </div>

              {/* KHU VỰC HIỂN THỊ NỘI DUNG FILE JSX THỰC TẾ TỪ CLAUDE */}
              <div className="prose prose-slate max-w-none">
                <activeArticle.Component />
              </div>
            </div>
          ) : (
            /* TRANG TỔNG QUAN (DASHBOARD) KHI CHƯA CHỌN BÀI VIẾT */
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 md:p-8 text-white shadow-sm">
                <h1 className="text-xl md:text-2xl font-bold">Thư viện bài viết từ Claude 👋</h1>
                <p className="text-indigo-100 text-xs md:text-sm mt-1 max-w-xl">
                  Hệ thống tự động phát hiện mọi bài viết trong <code className="bg-indigo-700/50 px-1.5 py-0.5 rounded text-white font-mono text-xs">src/articles/</code> và kết xuất trực tiếp lên web.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full">
                    📂 {articles.length} bài viết thực tế sẵn có
                  </span>
                </div>
              </div>

              {/* Danh sách các bài viết thực tế dưới dạng thẻ grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Danh Sách Bài Viết Đang Có</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {articles.map(art => (
                    <div 
                      key={art.id} 
                      onClick={() => setActiveTab(art.id)}
                      className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 cursor-pointer transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wider">
                            {art.category}
                          </span>
                          <span className="text-xs opacity-0 group-hover:opacity-100 text-indigo-600 transition-all">
                            Đọc bài →
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono truncate">
                          File: {art.id}.jsx
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;