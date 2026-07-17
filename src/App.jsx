import React, { useState, useMemo, useCallback, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';

// =========================================================================
// 1. QUÉT ĐỘNG TOÀN BỘ FILE JSX TRONG THƯ MỤC ARTICLES (lazy-load từng bài)
// =========================================================================
const articleModules = import.meta.glob('./articles/**/*.jsx');

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
const targetCategoryOrder = ['Health', 'Finance', 'Language', 'Psy'];

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

const rawArticles = Object.entries(articleModules).map(([path, loader]) => {
  const fileNameWithExt = path.split('/').pop();
  const id = fileNameWithExt.replace('.jsx', '');

  // Xác định Category dựa trên thư mục cha
  const pathParts = path.split('/');
  const rawCategory = pathParts.length > 3 ? pathParts[pathParts.length - 2] : 'Chung';
  
  // Chuẩn hóa tên Category theo chuẩn
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

  const Component = lazy(() =>
    loader().then((module) => ({
      default: module.default || Object.values(module).find(val => typeof val === 'function')
    }))
  );

  return {
    id,
    title,
    category,
    Component
  };
});

// SẮP XẾP TOÀN BỘ DANH SÁCH BÀI VIẾT THEO ĐÚNG THỨ TỰ YÊU CẦU
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

// Định nghĩa màu sắc sinh động động theo từng Chuyên mục (Accent Themes)
const categoryThemes = {
  Finance: {
    // Đỏ — trùng màu tab "Thép" trong vietnam_industry_primers.jsx (#B34040)
    text: 'text-[#B34040]',
    bg: 'bg-[#B34040]/10 text-[#8A3232] border-[#B34040]/30',
    bgActive: 'bg-[#B34040] text-white shadow-md shadow-[#B34040]/20',
    icon: '📊'
  },
  Health: {
    // Vàng — trùng màu tab "Actionable" trong holistic_life.jsx (C.gold = #B4863C)
    text: 'text-[#B4863C]',
    bg: 'bg-[#B4863C]/10 text-[#8A6B2F] border-[#B4863C]/30',
    bgActive: 'bg-[#B4863C] text-white shadow-md shadow-[#B4863C]/20',
    icon: '❤️'
  },
  Language: {
    // Xanh navy/cobalt — sang hơn xanh dương mặc định
    text: 'text-[#22436B]',
    bg: 'bg-[#22436B]/10 text-[#22436B] border-[#22436B]/30',
    bgActive: 'bg-[#22436B] text-white shadow-md shadow-[#22436B]/20',
    icon: '🌐'
  },
  Psy: {
    // Xanh teal — trùng màu tab "Bản chất" trong love.jsx (TAB_ACCENT = #356158)
    text: 'text-[#356158]',
    bg: 'bg-[#356158]/10 text-[#356158] border-[#356158]/30',
    bgActive: 'bg-[#356158] text-white shadow-md shadow-[#356158]/20',
    icon: '📂'
  },
  Default: {
    text: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    bgActive: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15',
    icon: '📂'
  }
};

const getTheme = (cat) => categoryThemes[cat] || categoryThemes.Default;

function App() {
  // NHÚNG FONT CHỮ CAO CẤP & GLOBAL CSS OVERRIDES CHO BÀI VIẾT
  useEffect(() => {
    // Nhúng Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);

    // Nhúng CSS overrides đồng bộ hiển thị nội dung (Table, lists, typography)
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
      
      /* Reset & Format cấu trúc bài viết con */
      .article-content {
        font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        color: #334155; /* slate-700 */
        line-height: 1.75;
      }
      
      .article-content h1, 
      .article-content h2, 
      .article-content h3 {
        color: #0f172a; /* slate-900 */
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }

      .article-content h1 { font-size: 1.875rem; }
      .article-content h2 { 
        font-size: 1.35rem; 
        border-b: 1px solid #f1f5f9; 
        padding-bottom: 0.5rem; 
        margin-top: 2.5rem;
      }
      .article-content h3 { font-size: 1.15rem; }
      .article-content p { margin-bottom: 1.25rem; }

      /* Định dạng bảng biểu Tài chính / Ngoại ngữ đồng đều cực đẹp */
      .article-content table {
        width: 100% !important;
        max-width: 100% !important;
        border-collapse: collapse !important;
        margin: 1.5rem 0 !important;
        text-align: left !important;
        font-size: 0.825rem !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 8px !important;
        overflow: hidden !important;
      }

      .article-content th {
        background-color: #f8fafc !important; /* slate-50 */
        color: #475569 !important; /* slate-600 */
        font-weight: 700 !important;
        padding: 0.85rem 1rem !important;
        border-bottom: 2px solid #e2e8f0 !important;
        text-transform: uppercase !important;
        font-size: 0.7rem !important;
        letter-spacing: 0.05em !important;
      }

      .article-content td {
        padding: 0.85rem 1rem !important;
        border-bottom: 1px solid #f1f5f9 !important;
        color: #334155 !important;
        vertical-align: top !important;
        line-height: 1.6 !important;
      }

      .article-content tr:last-child td {
        border-bottom: none !important;
      }

      .article-content tr:hover td {
        background-color: #f8fafc/50 !important;
      }

      /* Định dạng danh sách List */
      .article-content ul {
        list-style-type: disc !important;
        padding-left: 1.5rem !important;
        margin-bottom: 1.25rem !important;
      }

      .article-content ol {
        list-style-type: decimal !important;
        padding-left: 1.5rem !important;
        margin-bottom: 1.25rem !important;
      }

      .article-content li {
        margin-bottom: 0.5rem !important;
        color: #475569 !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Tự động kích hoạt bài viết đầu tiên làm mặc định
  const [activeTab, setActiveTab] = useState(() => {
    return articles.length > 0 ? articles[0].id : '';
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  // =========================================================================
  // RESPONSIVE: trên mobile, sidebar là overlay (drawer) đóng mặc định;
  // trên desktop, sidebar nằm cố định trong layout, mở mặc định.
  // =========================================================================
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !(typeof window !== 'undefined' && window.innerWidth < 768));
  const contentScrollRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Cuộn về đầu trang mỗi khi đổi bài viết (useLayoutEffect + overflow-anchor:none
  // trên vùng cuộn để trình duyệt không tự "bù" lại vị trí cuộn cũ khi nội dung mới nạp)
  useLayoutEffect(() => {
    if (contentScrollRef.current) contentScrollRef.current.scrollTop = 0;
    setShowBackToTop(false);
  }, [activeTab]);

  // Hiện nút "Về đầu trang" khi cuộn xuống đủ sâu trong vùng cuộn nội dung
  useEffect(() => {
    const el = contentScrollRef.current;
    if (!el) return;
    const onScroll = () => setShowBackToTop(el.scrollTop > 400);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollContentToTop = useCallback(() => {
    if (contentScrollRef.current) contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Expose ra window để các article component (không nhận prop từ App.jsx)
  // có thể tự cuộn vùng nội dung về đầu khi bấm nút "subtab tiếp theo"
  useEffect(() => {
    window.__scrollArticleToTop = scrollContentToTop;
    return () => { delete window.__scrollArticleToTop; };
  }, [scrollContentToTop]);

  // Chọn bài viết: cuộn về đầu NGAY tại thời điểm click (không đợi effect chạy
  // sau khi lazy-load xong, tránh trường hợp bị "giữ" vị trí cuộn cũ), và trên
  // mobile tự đóng drawer để lộ nội dung ngay.
  const selectArticle = useCallback((id) => {
    if (contentScrollRef.current) contentScrollRef.current.scrollTop = 0;
    setActiveTab(id);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  }, []);

  // =========================================================================
  // LOGIC KÉO THẢ CHIỀU RỘNG SIDEBAR (RESIZABLE SIDEBAR)
  // =========================================================================
  const [sidebarWidth, setSidebarWidth] = useState(280); 
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
    if (e.clientX >= 220 && e.clientX <= 480) {
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

  // Lọc bài viết theo thanh tìm kiếm nhanh
  const filteredArticles = useMemo(() => {
    return articles.filter(art => 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Nhóm các bài viết theo chuyên mục lớn
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
  const activeTheme = activeArticle ? getTheme(activeArticle.category) : categoryThemes.Default;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* Lớp phủ mờ phía sau sidebar khi mở dạng overlay trên mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ==========================================
          1. SIDEBAR SANG XỊN MỊN (DRAG TO RESIZE)
          Mobile: overlay trượt vào từ trái. Desktop: nằm trong layout, kéo giãn được.
          ========================================== */}
      <div
        style={!isMobile ? { width: isSidebarOpen ? `${sidebarWidth}px` : '68px' } : undefined}
        className={`bg-white border-r border-slate-200/60 flex flex-col h-full transition-transform md:transition-[width] duration-200 ease-out
          fixed md:relative inset-y-0 left-0 z-40 md:z-30 w-[82vw] max-w-[300px] md:w-auto md:shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Header Sidebar */}
        <div className="h-16 border-b border-slate-200/60 flex items-center justify-between px-4 shrink-0">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                M
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-sm leading-none">MayWorkSpace</h1>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide">STUDY HUB</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold text-xs mx-auto">
              M
            </div>
          )}
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500 hidden md:block"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Ô Tìm Kiếm */}
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
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/50 rounded-lg text-xs outline-none focus:ring-2 focus:ring-slate-900/10 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        )}

        {/* Danh Sách Menu Các Chuyên Mục */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          {isSidebarOpen ? (
            Object.entries(groupedArticles).map(([category, items]) => {
              const theme = getTheme(category);
              return (
                <div key={category} className="space-y-2">
                  {/* Tên Chuyên mục với Icon sinh động */}
                  <h3 className={`px-2 flex items-center gap-2 uppercase tracking-wider border-b border-slate-100 pb-1.5 text-[11px] font-extrabold ${theme.text}`}>
                    <span className="text-xs">{theme.icon}</span>
                    <span>{category}</span>
                  </h3>
                  
                  {/* Danh sách các Tab con */}
                  <div className="space-y-0.5">
                    {items.map(item => {
                      const isSelected = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => selectArticle(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group font-medium ${
                            isSelected
                              ? `${theme.bgActive} font-semibold` // Đổi màu Active động theo Chuyên mục
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                          }`}
                        >
                          <span className="truncate pr-2">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            /* Khi Sidebar ở trạng thái Thu Gọn */
            <div className="flex flex-col items-center gap-2">
              {articles.map(item => {
                const theme = getTheme(item.category);
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                      isSelected 
                        ? `${theme.bgActive}` 
                        : 'hover:bg-slate-100 text-slate-500'
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

        {/* Thanh gờ kéo giãn kích thước Sidebar */}
        {isSidebarOpen && (
          <div 
            onMouseDown={startResizing}
            className="hidden md:block absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-slate-300 active:bg-slate-400/80 transition-colors z-40"
          />
        )}
      </div>

      {/* ==========================================
          2. VÙNG HIỂN THỊ NỘI DUNG CHÍNH (CARD LAYOUT)
          ========================================== */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50">
        {activeArticle ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Header dính phía trên */}
            <div className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/40 px-8 z-20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 md:hidden"
                >
                  ☰
                </button>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
                  {activeArticle.title}
                </h1>
              </div>
            </div>

            {/* Vùng Cuộn Duy Nhất Chứa Nội Dung Bài Viết (full-bleed, không card) */}
            <div ref={contentScrollRef} className="flex-1 overflow-y-auto" style={{ overflowAnchor: 'none' }}>
              {/* Ép layout và áp dụng CSS Custom Overrides */}
              <div className="w-full h-full text-left article-content max-w-none
                [&_*]:text-left
                [&_div]:max-w-none [&_div]:mx-0
                [&_section]:max-w-none [&_section]:mx-0 [&_section]:w-full
                [&_p]:max-w-none [&_p]:mx-0 [&_p]:w-full
                [&_img]:mx-0 [&_img]:max-w-full
                [&_table]:w-full [&_table]:mx-0
                [&_h1]:text-left [&_h2]:text-left [&_h3]:text-left"
              >
                <Suspense fallback={<div className="flex items-center justify-center py-24 text-slate-400 text-sm">Đang tải bài viết...</div>}>
                  <activeArticle.Component />
                </Suspense>
              </div>
            </div>

            {/* Nút nổi "Về đầu trang" — chỉ hiện khi đã cuộn xuống đủ sâu */}
            {showBackToTop && (
              <button
                onClick={scrollContentToTop}
                aria-label="Về đầu trang"
                title="Về đầu trang"
                className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-30 w-11 h-11 rounded-full bg-slate-900/85 text-white shadow-lg backdrop-blur-md flex items-center justify-center text-lg active:scale-95 transition-transform hover:bg-slate-900"
              >
                ↑
              </button>
            )}

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