import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';

// =========================================================================
// 1. QUÉT ĐỘNG TOÀN BỘ FILE JSX TRONG THƯ MỤC ARTICLES (TỰ ĐỘNG)
// =========================================================================
const articleModules = import.meta.glob('./articles/**/*.jsx', { eager: true });

// Hàm chuẩn hóa chuỗi để so sánh chính xác không phân biệt hoa thường, dấu gạch
const normalizeKey = (str) => str.toLowerCase().replace(/[-_\s]/g, '');

// Bản đồ ánh xạ chính xác tiêu đề hiển thị theo yêu cầu của bạn
const exactTitleMap = {
  [normalizeKey('FinExpertNote')]: 'Fin Expert Note',
  [normalizeKey('FinFoundation')]: 'Fin Foundation',
  [normalizeKey('VietnamIndustryPrimers')]: 'Vietnam Industry Primers',
  [normalizeKey('StockDeepdive')]: 'Stock Deepdive',
  [normalizeKey('BigNations')]: 'Big Nations',
  [normalizeKey('MacroVnFramework')]: 'Macro-Vn-Framework',
  [normalizeKey('MacroQuarterlyReview')]: 'Macro-Quarterly-Review',
  [normalizeKey('HolisticLife')]: 'Holistic Life',
  [normalizeKey('MovementManual')]: 'Movement Manual',
  [normalizeKey('ChunkAtlasEN')]: 'Chunk Atlas E N',
  [normalizeKey('BestPracticesGuide')]: 'Best Practices Guide',
  [normalizeKey('ChineseTrick')]: 'Chinese Trick',
  [normalizeKey('Love')]: 'Love'
};

// Thứ tự sắp xếp các Danh mục lớn
const targetCategoryOrder = ['Finance', 'Health', 'Language', 'Psy'];

// Thứ tự sắp xếp các bài viết bên trong từng danh mục
const targetArticleOrder = {
  Finance: [
    normalizeKey('FinExpertNote'),
    normalizeKey('FinFoundation'),
    normalizeKey('VietnamIndustryPrimers'),
    normalizeKey('StockDeepdive'),
    normalizeKey('BigNations'),
    normalizeKey('MacroVnFramework'),
    normalizeKey('MacroQuarterlyReview')
  ],
  Health: [
    normalizeKey('HolisticLife'),
    normalizeKey('MovementManual')
  ],
  Language: [
    normalizeKey('ChunkAtlasEN'),
    normalizeKey('BestPracticesGuide'),
    normalizeKey('ChineseTrick')
  ],
  Psy: [
    normalizeKey('Love')
  ]
};

const rawArticles = Object.entries(articleModules).map(([path, module]) => {
  const fileNameWithExt = path.split('/').pop();
  const id = fileNameWithExt.replace('.jsx', '');

  // Xác định Category dựa trên thư mục cha
  const pathParts = path.split('/');
  const rawCategory = pathParts.length > 3 ? pathParts[pathParts.length - 2] : 'Chung';
  
  // Chuẩn hóa tên Category theo chuẩn đặt hàng
  let category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
  const lowerCat = category.toLowerCase();
  if (lowerCat === 'finance') category = 'Finance';
  else if (lowerCat === 'health') category = 'Health';
  else if (lowerCat === 'language') category = 'Language';
  else if (lowerCat === 'psy') category = 'Psy';

  // Lấy tiêu đề sạch đã chuẩn hóa
  const normalizedId = normalizeKey(id);
  const title = exactTitleMap[normalizedId] || id
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());

  const Component = module.default || Object.values(module).find(val => typeof val === 'function');

  return {
    id,
    title,
    category,
    Component
  };
}).filter(item => item.Component !== undefined);

// SẮP XẾP TOÀN BỘ DANH SÁCH BÀI VIẾT THEO ĐÚNG THỨ TỰ BẠN YÊU CẦU
const articles = [...rawArticles].sort((a, b) => {
  const catIndexA = targetCategoryOrder.indexOf(a.category);
  const catIndexB = targetCategoryOrder.indexOf(b.category);
  
  const actualCatA = catIndexA === -1 ? 999 : catIndexA;
  const actualCatB = catIndexB === -1 ? 999 : catIndexB;

  if (actualCatA !== actualCatB) {
    return actualCatA - actualCatB;
  }

  // Sắp xếp bài viết bên trong cùng một category
  const orderList = targetArticleOrder[a.category];
  if (orderList) {
    const normA = normalizeKey(a.id);
    const normB = normalizeKey(b.id);
    const indexA = orderList.indexOf(normA);
    const indexB = orderList.indexOf(normB);
    const actualIndexA = indexA === -1 ? 999 : indexA;
    const actualIndexB = indexB === -1 ? 999 : indexB;
    return actualIndexA - actualIndexB;
  }
  return 0;
});

// Định nghĩa màu sắc sinh động cho từng Chuyên mục lớn (Font chữ to, rõ ràng hơn)
const categoryThemes = {
  Finance: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: '📊'
  },
  Health: {
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: '❤️'
  },
  Language: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: '🌐'
  },
  Psy: {
    text: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: '📂'
  },
  Default: {
    text: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: '📂'
  }
};

const getTheme = (cat) => categoryThemes[cat] || categoryThemes.Default;

function App() {
  // NHÚNG FONT CHỮ CAO CẤP & SỬA LỖI FONT BẸP (Chạy duy nhất một lần)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `
      body {
        font-family: 'Plus Jakarta Sans', 'Inter', sans-serif !important;
        letter-spacing: -0.015em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        letter-spacing: -0.025em;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Mặc định tự động kích hoạt bài viết đầu tiên (Fin Expert Note)
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
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const resize = useCallback((e) => {
    if (!isResizing.current) return;
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

  // Lọc bài viết theo ô tìm kiếm nhanh
  const filteredArticles = useMemo(() => {
    return articles.filter(art => 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Nhóm các bài viết theo chuyên mục lớn để render Sidebar (Đã bảo toàn thứ tự sắp xếp)
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
    <div className="flex h-screen bg-white text-slate-900 overflow-hidden font-sans">
      
      {/* ==========================================
          SIDEBAR KÉO THẢ CHIỀU RỘNG
          ========================================== */}
      <div 
        style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '64px' }}
        className="relative shrink-0 bg-slate-50/50 border-r border-slate-200/80 flex flex-col h-full z-30"
      >
        {/* Header Sidebar */}
        <div className="h-16 border-b border-slate-200/80 flex items-center justify-between px-4 shrink-0">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                M
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-sm leading-none">Workspace</h1>
                <span className="text-[10px] text-slate-400 font-medium">Đồng bộ tự động</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xs mx-auto">
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

        {/* Tìm kiếm */}
        {isSidebarOpen && (
          <div className="p-3 border-b border-slate-200/50 shrink-0">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-xs">
                🔍
              </span>
              <input
                type="text"
                placeholder="Tìm nhanh bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        )}

        {/* Menu chứa các chuyên mục lớn */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          {isSidebarOpen ? (
            Object.entries(groupedArticles).map(([category, items]) => {
              const theme = getTheme(category);
              return (
                <div key={category} className="space-y-2">
                  {/* Tên Category: Màu sắc sinh động, Font chữ to hơn rõ rệt */}
                  <h3 className={`px-2 flex items-center gap-2 uppercase tracking-wider border-b border-slate-200/40 pb-1.5 text-[13px] font-extrabold ${theme.text}`}>
                    <span className="text-sm">{theme.icon}</span>
                    <span>{category}</span>
                  </h3>
                  {/* Danh sách bài viết */}
                  <div className="space-y-1">
                    {items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between group ${
                          activeTab === item.id
                            ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
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

        {/* Thanh gờ kéo giãn kích thước */}
        {isSidebarOpen && (
          <div 
            onMouseDown={startResizing}
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-indigo-500/30 active:bg-indigo-600/50 transition-colors z-40"
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
                FREEZE (STICKY) TIÊU ĐỀ: Chỉ giữ lại duy nhất Tiêu đề, đứng im khi cuộn
                ======================================================== */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-8 py-5 z-20 flex items-center justify-between shrink-0">
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
            </div>

            {/* Khung cuộn tài liệu */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {/* ========================================================
                SIÊU GHI ĐÈ BẰNG TAILWIND (Tailwind Custom Overrides):
                Ép tất cả mọi phần tử con (như ảnh, div, table, p...) dàn đều
                100% chiều rộng, gióng hàng lề trái thẳng tắp và đồng nhất.
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
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Không tìm thấy bài viết nào.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;