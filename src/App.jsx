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

// Định nghĩa màu sắc sinh động riêng biệt cho từng Chuyên mục lớn (Font to hơn)
const categoryThemes = {
  Finance: {
    text: 'text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-wide',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badge: 'bg-emerald-500',
    border: 'border-emerald-500/20',
    icon: '📊'
  },
  Language: {
    text: 'text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wide',
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    badge: 'bg-blue-500',
    border: 'border-blue-500/20',
    icon: '🌐'
  },
  Health: {
    text: 'text-rose-600 dark:text-rose-400 text-sm font-bold tracking-wide',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    badge: 'bg-rose-500',
    border: 'border-rose-500/20',
    icon: '❤️'
  },
  Default: {
    text: 'text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide',
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badge: 'bg-indigo-500',
    border: 'border-indigo-500/20',
    icon: '📂'
  }
};

const getTheme = (cat) => categoryThemes[cat] || categoryThemes.Default;

function App() {
  // NHÚNG FONT CHỮ ĐẸP TỰ ĐỘNG KHI KHỞI CHẠY APP (Không lo bị bẹp font)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    // Áp dụng font chữ chuẩn sang trọng cho toàn bộ body
    document.body.style.fontFamily = "'Be Vietnam Pro', 'Inter', sans-serif";
    document.body.style.letterSpacing = "-0.01em";
  }, []);

  // Mặc định hiển thị bài viết đầu tiên (BỎ HOÀN TOÀN TRANG CHỦ TỔNG QUAN)
  const [activeTab, setActiveTab] = useState(() => {
    return articles.length > 0 ? articles[0].id : '';
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* ==========================================
          SIDEBAR KÉO THẢ CHIỀU RỘNG
          ========================================== */}
      <div 
        style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '64px' }}
        className="relative shrink-0 bg-white border-r border-slate-200/80 flex flex-col h-full z-30 transition-shadow duration-200"
      >
        {/* Header Sidebar */}
        <div className="h-16 border-b border-slate-200/80 flex items-center justify-between px-4 shrink-0">
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
                placeholder="Tìm nhanh bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        )}

        {/* Menu & Danh mục bài viết */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {/* Các chuyên mục bài viết (Màu sắc sinh động, Font chữ to, đẹp hơn) */}
          {isSidebarOpen ? (
            Object.entries(groupedArticles).map(([category, items]) => {
              const theme = getTheme(category);
              return (
                <div key={category} className="space-y-2 pt-1">
                  <h3 className={`px-2 flex items-center gap-2 uppercase tracking-wide border-b border-slate-100 pb-1.5 ${theme.text}`}>
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
                        <span className="truncate pr-2 font-medium">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            /* Sidebar khi thu gọn */
            <div className="flex flex-col items-center gap-3">
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
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {activeArticle ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* ========================================================
                FREEZE (STICKY) TIÊU ĐỀ: Cố định tiêu đề trên đỉnh khi cuộn
                ======================================================== */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-8 py-5 z-20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 md:hidden"
                >
                  ☰
                </button>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800">
                  {activeArticle.title}
                </h1>
              </div>
              <span className={`text-xs px-3.5 py-1 rounded-full font-bold uppercase tracking-wider shrink-0 shadow-xs ${getTheme(activeArticle.category).bg}`}>
                {getTheme(activeArticle.category).icon} {activeArticle.category}
              </span>
            </div>

            {/* Khung nội dung tài liệu */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {/* ========================================================
                KỸ THUẬT SIÊU ĐÈ LỚP CON (Tailwind Custom Overrides):
                Ép tất cả các thẻ div, section, p, table bên trong các file JSX
                đáp ứng đúng tiêu chuẩn: Dàn trang full-width, căn lề trái hoàn toàn.
                ========================================================
              */}
              <div className="w-full text-left prose prose-slate max-w-none 
                [&_*]:text-left 
                [&_div]:max-w-none [&_div]:mx-0 [&_div]:w-full
                [&_section]:max-w-none [&_section]:mx-0 [&_section]:w-full
                [&_p]:max-w-none [&_p]:mx-0 [&_p]:w-full
                [&_img]:mx-0 [&_img]:max-w-full
                [&_table]:w-full [&_table]:mx-0
                [&_h1]:text-left [&_h2]:text-left [&_h3]:text-left"
              >
                <activeArticle.Component />
              </div>
            </div>
          </div>
        ) : (
          /* Trạng thái fallback khi không có bài viết nào */
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Không tìm thấy tài liệu phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;