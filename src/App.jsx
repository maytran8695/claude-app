import React, { useState, useMemo, useCallback, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { TrendingUp, HeartPulse, Languages, Brain, Award, Film, Sun, Moon, Search, ChevronDown, PanelLeftClose, PanelLeftOpen, ArrowUp, ArrowDown, Menu } from 'lucide-react';
import TextAnnotationLayer from './components/TextAnnotationLayer';
import AllNotesModal from './components/AllNotesModal';
import { authedFetch, isVerified } from './hooks/notesAuth';

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
  [normalizeKey('VietnamIndustryPrimers')]: 'Industry Primers',
  [normalizeKey('StockDeepdive')]: 'Stock Deepdive',
  [normalizeKey('BigNations')]: 'Big Nations',
  [normalizeKey('MacroVnFramework')]: 'Macro Framework',
  [normalizeKey('MacroQuarterlyReview')]: 'Macro Quarterly Review',
  [normalizeKey('WealthManagement')]: 'Wealth Management',
  [normalizeKey('HolisticLife')]: 'Holistic Life',
  [normalizeKey('MovementManual')]: 'Movement Manual',
  [normalizeKey('Nutrition')]: 'Nutrition',
  [normalizeKey('ChunkAtlasEN')]: 'Chunk Atlas - EN',
  [normalizeKey('ChunkAtlasCn')]: 'Chunk Atlas - CHI',
  [normalizeKey('HskLearningMethod')]: 'Chinese Learning',
  [normalizeKey('ChineseTrick')]: 'Chinese Trick',
  [normalizeKey('TuViChinhTinh14Sao')]: 'Purple Star Astrology',
  [normalizeKey('Love')]: 'Love',
  [normalizeKey('CBAP')]: 'CBAP Quiz',
  [normalizeKey('ChunkQuiz')]: 'Chunk Quiz - EN',
  [normalizeKey('ChunkQuizChi')]: 'Chunk Quiz - CHI',
  [normalizeKey('SelfWorthDeep')]: 'Self Worth',
  [normalizeKey('Film')]: 'Film',
  [normalizeKey('Book')]: 'Book',
  [normalizeKey('Painting')]: 'Painting',
  [normalizeKey('Music')]: 'Music'
};

// Thứ tự sắp xếp các Danh mục lớn
const targetCategoryOrder = ['Health', 'Finance', 'Language', 'Cert', 'Psy', 'Entertainment'];

// Thứ tự sắp xếp các bài viết bên trong từng danh mục
const targetArticleOrder = {
  Finance: [
    normalizeKey('FinExpertNote'),
    normalizeKey('FinFoundation'),
    normalizeKey('VietnamIndustryPrimers'),
    normalizeKey('StockDeepdive'),
    normalizeKey('BigNations'),
    normalizeKey('MacroVnFramework'),
    normalizeKey('MacroQuarterlyReview'),
    normalizeKey('WealthManagement')
  ],
  Health: [
    normalizeKey('HolisticLife'),
    normalizeKey('MovementManual'),
    normalizeKey('Nutrition')
  ],
  Language: [
    normalizeKey('ChunkAtlasEN'),
    normalizeKey('ChunkAtlasCn'),
    normalizeKey('TuViChinhTinh14Sao'),
    normalizeKey('HskLearningMethod'),
    normalizeKey('ChineseTrick')
  ],
  Psy: [
    normalizeKey('Love')
  ],
  Entertainment: [
    normalizeKey('Film'),
    normalizeKey('Book'),
    normalizeKey('Painting'),
    normalizeKey('Music')
  ],
  Cert: [
    normalizeKey('CBAP'),
    normalizeKey('ChunkQuiz'),
    normalizeKey('ChunkQuizChi')
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
  else if (lowerCat === 'entertainment') category = 'Entertainment';

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

// id -> {title, category} cho AllNotesModal (bảng "tất cả ghi chú" cần tên
// bài đọc được thay vì slug thô như "fin_expert_note").
const articleMeta = Object.fromEntries(articles.map(a => [a.id, { title: a.title, category: a.category }]));

// Định nghĩa màu sắc + icon riêng theo từng Chuyên mục (Accent Themes)
// Mỗi category có 1 màu accent riêng cho light mode và 1 bản sáng hơn cho dark mode
// (giữ đúng tông màu gốc, chỉ tăng độ sáng để đủ tương phản trên nền tối).
const categoryThemes = {
  Finance: {
    // Đỏ — trùng màu tab "Thép" trong vietnam_industry_primers.jsx
    light: '#B34040',
    dark: '#E0776E',
    Icon: TrendingUp
  },
  Health: {
    // Vàng — trùng màu tab "Actionable" trong holistic_life.jsx
    light: '#B4863C',
    dark: '#E0B366',
    Icon: HeartPulse
  },
  Language: {
    // Xanh navy/cobalt
    light: '#22436B',
    dark: '#7DA2D1',
    Icon: Languages
  },
  Psy: {
    // Xanh teal — trùng màu tab "Bản chất" trong love.jsx
    light: '#356158',
    dark: '#6FB0A0',
    Icon: Brain
  },
  Cert: {
    // Tím trầm — đại diện cho chứng chỉ/thành tựu, tách biệt với 4 màu còn lại
    light: '#6B4FA0',
    dark: '#B7A3DE',
    Icon: Award
  },
  Entertainment: {
    // Cam đất/terracotta — ấm áp, tách biệt với các màu còn lại
    light: '#B8562F',
    dark: '#E0916A',
    Icon: Film
  },
  Default: {
    light: '#4F46E5',
    dark: '#818CF8',
    Icon: TrendingUp
  }
};

const getTheme = (cat) => categoryThemes[cat] || categoryThemes.Default;

// Per-article sidebar accent override — Film/Book each carry their own page
// theme (see film.jsx/book.jsx ACCENT), so their tab buttons use a softer
// tint of that same hue instead of sharing the generic Entertainment color.
const articleAccentOverrides = {
  film: '#D8B583',
  book: '#7FA89F',
};

// =========================================================================
// ĐỊNH TUYẾN THEO QUERY PARAM (?a=<id-bài-viết>) — mỗi tab/bài viết có URL
// riêng để chia sẻ trực tiếp, không cần route path (an toàn với mọi kiểu
// static hosting vì request luôn về "/", không cần cấu hình SPA fallback).
// =========================================================================
const ARTICLE_URL_PARAM = 'a';
// Tính năng bôi đen + ghi chú (lưu qua Cloudflare D1) — đã kiểm chứng ổn
// trên production (pilot: fin_expert_note), giờ bật cho toàn bộ bài viết.
// Cơ chế gắn 1 lần ở App.jsx (không đụng từng file bài viết) nên áp dụng
// đồng loạt được; mọi bài trong src/articles đều render text JSX thuần
// (đã kiểm tra không có dangerouslySetInnerHTML), phù hợp với cách neo vị
// trí quote hiện tại.
const getArticleIdFromUrl = () => {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(ARTICLE_URL_PARAM);
};
const findArticleByUrlId = (urlId) => {
  if (!urlId) return null;
  return (
    articles.find((a) => a.id === urlId) ||
    articles.find((a) => normalizeKey(a.id) === normalizeKey(urlId)) ||
    null
  );
};

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

      /* Bọc :where() để đưa độ đặc thù (specificity) của các rule fallback này về 0 —
         chỉ áp dụng khi bài viết KHÔNG tự định nghĩa style riêng cho heading của nó.
         Trước đây các rule này dùng "element + class" (vd ".article-content h2") có
         độ đặc thù cao hơn nhiều class riêng của từng bài (vd ".p-t", ".stage-title"),
         nên vô tình đè mất margin/màu mà từng file đã tự căn chỉnh, gây khoảng cách
         quá lớn phía trên tiêu đề ở nhiều bài viết. */
      :where(.article-content h1, .article-content h2, .article-content h3) {
        color: #0f172a; /* slate-900 */
        font-weight: 700;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
      }

      :where(.article-content h1) { font-size: 1.875rem; }
      :where(.article-content h2) {
        font-size: 1.35rem;
        padding-bottom: 0.5rem;
      }
      :where(.article-content h3) { font-size: 1.15rem; }
      :where(.article-content p) { margin-bottom: 1.25rem; }

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

  // Tự động kích hoạt bài viết đầu tiên làm mặc định — trừ khi URL đã có sẵn
  // ?a=<id> (mở từ một link chia sẻ trực tiếp tới một tab cụ thể).
  const [activeTab, setActiveTab] = useState(() => {
    const fromUrl = findArticleByUrlId(getArticleIdFromUrl());
    if (fromUrl) return fromUrl.id;
    return articles.length > 0 ? articles[0].id : '';
  });

  // Đồng bộ activeTab <-> URL: mỗi lần đổi tab, cập nhật ?a=<id> lên address
  // bar để có thể copy/chia sẻ link thẳng tới đúng tab đó. Lần đồng bộ đầu
  // tiên (lúc mới load trang) dùng replaceState để không tạo history rác;
  // các lần đổi tab sau đó dùng pushState để nút Back/Forward hoạt động.
  const isFirstUrlSyncRef = useRef(true);
  useEffect(() => {
    if (typeof window === 'undefined' || !activeTab) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get(ARTICLE_URL_PARAM) === activeTab) {
      isFirstUrlSyncRef.current = false;
      return;
    }
    params.set(ARTICLE_URL_PARAM, activeTab);
    // Đổi sang bài viết khác thì bỏ luôn ?s= cũ (sub-tab đó thuộc bài viết
    // trước, không còn ý nghĩa ở bài mới) — trừ lần đồng bộ đầu tiên lúc mở
    // trang, vì đó có thể là link chia sẻ trực tiếp dạng ?a=...&s=... .
    if (!isFirstUrlSyncRef.current) params.delete('s');
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    if (isFirstUrlSyncRef.current) {
      window.history.replaceState({ [ARTICLE_URL_PARAM]: activeTab }, '', newUrl);
    } else {
      window.history.pushState({ [ARTICLE_URL_PARAM]: activeTab }, '', newUrl);
    }
    isFirstUrlSyncRef.current = false;
  }, [activeTab]);

  // Hỗ trợ nút Back/Forward của trình duyệt: khi URL đổi do điều hướng lịch
  // sử (không phải do người dùng bấm sidebar), đồng bộ ngược lại activeTab.
  useEffect(() => {
    const onPopState = () => {
      const match = findArticleByUrlId(getArticleIdFromUrl());
      if (match) setActiveTab(match.id);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  
  const [searchTerm, setSearchTerm] = useState('');

  // =========================================================================
  // DARK MODE: chỉ áp dụng cho khung app (sidebar + thanh header nội dung),
  // KHÔNG áp dụng vào bên trong từng bài viết (mỗi file article tự style riêng).
  // Ghi nhớ lựa chọn của người dùng vào localStorage, mặc định theo hệ điều hành.
  // =========================================================================
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('mws-dark-mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(() => {
    localStorage.setItem('mws-dark-mode', String(darkMode));
  }, [darkMode]);

  // Trạng thái mở/đóng của từng nhóm Chuyên mục trong sidebar (mặc định mở hết)
  const [openGroups, setOpenGroups] = useState({ Health: true, Finance: true, Language: true, Cert: true, Psy: true, Entertainment: true });
  const toggleGroup = useCallback((cat) => {
    setOpenGroups(prev => ({ ...prev, [cat]: !prev[cat] }));
  }, []);

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
  // Hover-peek: khi sidebar đang thu gọn trên desktop, di chuột vào sẽ "lộ" tạm thời
  // toàn bộ nội dung (kiểu Dock macOS) mà không đẩy layout nội dung chính.
  const [isHoverPeek, setIsHoverPeek] = useState(false);
  const isPeeking = !isMobile && !isSidebarOpen && isHoverPeek;
  const isSidebarExpanded = isSidebarOpen || isPeeking;
  const contentScrollRef = useRef(null);
  const annotationContainerRef = useRef(null);
  const [allNotesOpen, setAllNotesOpen] = useState(false);
  const [jumpToNote, setJumpToNote] = useState(null);
  // Bumped whenever AllNotesModal deletes a note — AllNotesModal keeps its
  // own independent fetch/state (it lists every article), so a delete
  // there wouldn't otherwise reach the per-article panel/highlights if
  // that note's article happens to be the one currently open.
  const [notesRefreshSignal, setNotesRefreshSignal] = useState(0);
  // Toàn bộ tính năng ghi chú (nút, panel, modal) chỉ hiện khi trình duyệt
  // này đã "được nhận diện" (đã nhập đúng mật khẩu ít nhất 1 lần, lưu lâu
  // dài trong localStorage) — người lạ có link cũng không thấy nút nào cả,
  // không biết tính năng này tồn tại. Gõ 6 ký tự "ghichu" ở bất kỳ đâu
  // ngoài ô nhập liệu để hiện prompt nhập mật khẩu lần đầu trên máy mới.
  const [notesUnlocked, setNotesUnlocked] = useState(() => isVerified());

  const attemptNotesUnlock = useCallback(async () => {
    const res = await authedFetch('/api/notes');
    if (res.status !== 401) {
      setNotesUnlocked(true);
    } else {
      window.alert('Sai mật khẩu.');
    }
  }, []);

  useEffect(() => {
    if (notesUnlocked) return;
    let buffer = '';
    const TARGET = 'ghichu';
    function onKeyDown(e) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-TARGET.length);
      if (buffer === TARGET) {
        buffer = '';
        attemptNotesUnlock();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [notesUnlocked, attemptNotesUnlock]);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showBackToBottom, setShowBackToBottom] = useState(false);
  // Mờ 2 nút cuộn khi người dùng ĐANG KHÔNG cuộn — trước đây 2 nút này luôn
  // hiện rõ 100% một khi đủ điều kiện, che mất chữ ở góc dưới-phải nếu người
  // dùng dừng lại đọc lâu. Giờ chỉ hiện rõ trong lúc cuộn + một nhịp ngắn sau
  // đó, rồi tự mờ dần (vẫn bấm được, chỉ giảm độ chắn tầm nhìn); hover/focus
  // luôn kéo về rõ hẳn để không mất khả năng bấm khi cần.
  const [scrollIdle, setScrollIdle] = useState(true);
  const scrollIdleTimerRef = useRef(null);

  // Cuộn về đầu trang mỗi khi đổi bài viết (useLayoutEffect + overflow-anchor:none
  // trên vùng cuộn để trình duyệt không tự "bù" lại vị trí cuộn cũ khi nội dung mới nạp)
  useLayoutEffect(() => {
    if (contentScrollRef.current) contentScrollRef.current.scrollTop = 0;
    setShowBackToTop(false);
  }, [activeTab]);

  // Hiện nút "Về đầu trang" / "Xuống cuối trang" tùy vị trí cuộn hiện tại trong
  // vùng cuộn nội dung — đồng thời theo dõi cả thay đổi chiều cao nội dung (do
  // bài viết lazy-load xong sau khi Suspense fallback biến mất) qua ResizeObserver.
  useEffect(() => {
    const el = contentScrollRef.current;
    if (!el) return;
    const checkScrollPosition = () => {
      setShowBackToTop(el.scrollTop > 400);
      const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowBackToBottom(distanceToBottom > 400);
    };
    // Riêng cho sự kiện scroll thật (không phải ResizeObserver do lazy-load
    // xong): đánh dấu "đang cuộn" rồi hẹn giờ quay lại "idle" (mờ đi) sau một
    // nhịp ngừng tay — mỗi lần cuộn tiếp lại hủy hẹn giờ cũ, đặt lại từ đầu.
    const onScroll = () => {
      checkScrollPosition();
      setScrollIdle(false);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = setTimeout(() => setScrollIdle(true), 1200);
    };
    checkScrollPosition();
    el.addEventListener('scroll', onScroll, { passive: true });
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    };
  }, [activeTab]);

  const scrollContentToTop = useCallback(() => {
    if (contentScrollRef.current) contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollContentToBottom = useCallback(() => {
    if (contentScrollRef.current) {
      const el = contentScrollRef.current;
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
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

  // Bấm 1 dòng trong AllNotesModal: đóng modal, chuyển sang đúng bài (nếu
  // đang ở bài khác) rồi báo cho TextAnnotationLayer của bài đó tự tìm/mở/
  // cuộn tới ghi chú — xem effect "jumpToNote" trong TextAnnotationLayer.
  const handleJumpToNote = useCallback((note) => {
    setAllNotesOpen(false);
    selectArticle(note.article_id);
    setJumpToNote(note);
  }, [selectArticle]);

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

  // Bộ token màu cho khung app (sidebar + header nội dung) — light/dark.
  const T = darkMode ? {
    appBg: 'bg-[#15171B] text-[#F5F4F1]',
    surface: 'bg-[#1B1E24]',
    surface2: 'bg-[#20242B]',
    surfaceHover: 'hover:bg-[#262B33]',
    border: 'border-[#2B2F38]',
    borderStrong: 'border-[#383E49]',
    ink: 'text-[#F5F4F1]',
    muted: 'text-[#C7C4BB]',
    muted2: 'text-[#9B988E]',
    headerBg: 'bg-[#1B1E24]/85',
    contentBg: 'bg-[#15171B]',
    ring: '#EDEDE9',
    placeholder: 'placeholder:text-[#9B988E]',
    hoverInk: 'hover:text-[#F5F4F1]'
  } : {
    appBg: 'bg-[#FAF9F6] text-[#1C1D1B]',
    surface: 'bg-white',
    surface2: 'bg-[#F4F2ED]',
    surfaceHover: 'hover:bg-[#F4F2ED]',
    border: 'border-[#E7E3DB]',
    borderStrong: 'border-[#D9D4C8]',
    ink: 'text-[#1C1D1B]',
    muted: 'text-[#736F65]',
    muted2: 'text-[#9A968A]',
    headerBg: 'bg-white/85',
    contentBg: 'bg-[#FAF9F6]',
    ring: '#22262B',
    placeholder: 'placeholder:text-[#9A968A]',
    hoverInk: 'hover:text-[#1C1D1B]'
  };

  return (
    <div className={`relative flex h-dvh overflow-hidden font-sans ${T.appBg}`}>

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
          Khi thu gọn trên desktop: hover vào sẽ "lộ" tạm thời (kiểu Dock macOS),
          dùng position:absolute nên không đẩy layout nội dung chính.
          ========================================== */}
      {/* Spacer giữ chỗ 68px trong flex layout CHỈ khi đang hover-peek — lúc đó sidebar
          thật chuyển sang absolute (rời khỏi flow) nên cần spacer thế chỗ để nội dung
          chính không bị xô lệch. Lúc không peek, sidebar tự nằm trong flow, không cần spacer. */}
      {isPeeking && <div className="shrink-0" style={{ width: '68px' }} />}
      <div
        onMouseEnter={() => !isMobile && !isSidebarOpen && setIsHoverPeek(true)}
        onMouseLeave={() => setIsHoverPeek(false)}
        style={!isMobile ? { width: isSidebarExpanded ? `${sidebarWidth}px` : '68px' } : undefined}
        className={`${T.surface} border-r ${T.border} flex flex-col h-full transition-all duration-200 ease-out
          fixed inset-y-0 left-0 z-40 md:z-30 w-[82vw] max-w-[300px] md:w-auto md:shrink-0
          ${isPeeking ? 'md:absolute md:shadow-2xl' : 'md:relative'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Header Sidebar */}
        <div className={`h-16 border-b ${T.border} flex items-center gap-2.5 px-4 shrink-0 ${!isSidebarExpanded ? 'justify-center px-0' : ''}`}>
          <div
            className="rounded-[9px] flex items-center justify-center text-white font-extrabold text-sm shadow-sm shrink-0"
            style={{ background: 'linear-gradient(135deg, #E85D9C 0%, #7C5CFC 100%)', width: 34, height: 34 }}
          >
            M
          </div>
          {isSidebarExpanded && (
            <>
              <div className="min-w-0">
                <h1 className={`font-bold text-sm leading-none truncate ${T.ink}`}>MayWorkSpace</h1>
                <span className={`text-[10px] font-semibold tracking-wide ${T.muted2}`}>STUDY HUB</span>
              </div>
              <div className="flex-1" />
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-1.5 rounded-lg ${T.surfaceHover} ${T.muted} hidden md:flex items-center justify-center shrink-0`}
                title="Thu gọn sidebar"
              >
                <PanelLeftClose size={16} />
              </button>
            </>
          )}
        </div>

        {/* Ô Tìm Kiếm */}
        {isSidebarExpanded && (
          <div className={`p-3 border-b ${T.border} shrink-0`}>
            <div className={`flex items-center gap-2 rounded-full border ${T.border} ${T.surface2} px-3 py-2`}>
              <Search size={14} className={`shrink-0 ${T.muted2}`} />
              <input
                type="text"
                placeholder="Tìm nhanh bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-transparent text-xs outline-none ${T.placeholder} ${T.ink}`}
              />
            </div>
          </div>
        )}

        {/* Danh Sách Menu Các Chuyên Mục */}
        <div className="flex-1 overflow-y-auto p-2.5">
          {isSidebarExpanded ? (
            Object.entries(groupedArticles).map(([category, items]) => {
              const theme = getTheme(category);
              const Icon = theme.Icon;
              const accent = darkMode ? theme.dark : theme.light;
              const isOpen = openGroups[category] !== false;
              return (
                <div key={category} className="mb-1">
                  <button
                    onClick={() => toggleGroup(category)}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left ${T.surfaceHover}`}
                  >
                    <span
                      className="rounded-[7px] flex items-center justify-center shrink-0"
                      style={{ width: 26, height: 26, background: `${accent}1F` }}
                    >
                      <Icon size={14} style={{ color: accent }} />
                    </span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider flex-1 ${T.ink}`}>{category}</span>
                    <span className={`text-[10px] font-bold rounded-full px-1.5 py-px min-w-[20px] text-center ${T.surface2} ${T.muted2}`}>
                      {items.length}
                    </span>
                    <ChevronDown size={13} className={`shrink-0 ${T.muted2} transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
                  </button>

                  {isOpen && (
                    <div className="flex flex-col gap-0.5 pl-[30px] pr-1 pt-0.5 pb-1.5">
                      {items.map(item => {
                        const isSelected = activeTab === item.id;
                        const itemAccent = articleAccentOverrides[item.id] || accent;
                        return (
                          <button
                            key={item.id}
                            onClick={() => selectArticle(item.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                              isSelected ? 'font-semibold' : `font-medium ${T.muted} ${T.hoverInk} ${T.surfaceHover}`
                            }`}
                            style={isSelected ? { background: `${itemAccent}17`, color: itemAccent } : undefined}
                          >
                            <span className="truncate block">{item.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* Khi Sidebar ở trạng thái Thu Gọn: chỉ hiện 4 icon Chuyên mục — hover vào
               sidebar sẽ "lộ" (peek) đầy đủ để chọn bài viết cụ thể */
            <div className="flex flex-col items-center gap-2 pt-1">
              {Object.keys(groupedArticles).map(category => {
                const theme = getTheme(category);
                const Icon = theme.Icon;
                const accent = darkMode ? theme.dark : theme.light;
                const isActiveCat = activeArticle && activeArticle.category === category;
                return (
                  <button
                    key={category}
                    onClick={() => { setIsSidebarOpen(true); setOpenGroups(prev => ({ ...prev, [category]: true })); }}
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-transform active:scale-95"
                    style={{ background: isActiveCat ? accent : `${accent}1F` }}
                    title={category}
                  >
                    <Icon size={16} style={{ color: isActiveCat ? '#fff' : accent }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Chuyển đổi Sáng / Tối */}
        <div className={`p-2.5 border-t ${T.border} shrink-0`}>
          <button
            onClick={() => setDarkMode(d => !d)}
            className={`w-full flex items-center gap-2 rounded-full border ${T.border} ${T.surface2} ${isSidebarExpanded ? 'px-2.5 py-1.5' : 'p-1.5 justify-center'}`}
            title={darkMode ? 'Chế độ Tối' : 'Chế độ Sáng'}
          >
            {darkMode ? <Moon size={13} className={T.muted} /> : <Sun size={13} className={T.muted} />}
            {isSidebarExpanded && (
              <>
                <span className={`text-[11px] font-semibold ${T.muted} flex-1 text-left`}>
                  {darkMode ? 'Chế độ Tối' : 'Chế độ Sáng'}
                </span>
                <span
                  className="w-[30px] h-[17px] rounded-full relative shrink-0 transition-colors"
                  style={{ background: darkMode ? T.ring : '#D9D4C8' }}
                >
                  <span
                    className={`absolute top-0.5 w-3.5 h-3.5 rounded-full ${T.surface} shadow-sm transition-transform`}
                    style={{ transform: darkMode ? 'translateX(15px)' : 'translateX(2px)' }}
                  />
                </span>
              </>
            )}
          </button>
        </div>

        {/* "Tất cả ghi chú" — chỉ hiện khi trình duyệt này đã được nhận diện
            (notesUnlocked), người lạ mở link sẽ không thấy nút này tồn tại. */}
        {notesUnlocked && (
          <div className={`p-2.5 border-t ${T.border} shrink-0`}>
            <button
              onClick={() => setAllNotesOpen(true)}
              className={`w-full flex items-center gap-2 rounded-full border ${T.border} ${T.surface2} ${isSidebarExpanded ? 'px-2.5 py-1.5' : 'p-1.5 justify-center'}`}
              title="Xem tất cả ghi chú"
            >
              <span>🗂️</span>
              {isSidebarExpanded && (
                <span className={`text-[11px] font-semibold ${T.muted} flex-1 text-left`}>Tất cả ghi chú</span>
              )}
            </button>
          </div>
        )}

        {/* Thanh gờ kéo giãn kích thước Sidebar */}
        {isSidebarOpen && (
          <div
            onMouseDown={startResizing}
            className={`hidden md:block absolute top-0 right-0 w-1 h-full cursor-col-resize transition-colors z-40 ${darkMode ? 'hover:bg-[#383E49] active:bg-[#4A4E58]' : 'hover:bg-slate-300 active:bg-slate-400/80'}`}
          />
        )}
      </div>

      {/* ==========================================
          2. VÙNG HIỂN THỊ NỘI DUNG CHÍNH (CARD LAYOUT)
          ========================================== */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${T.contentBg}`}>
        {activeArticle ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">

            {/* Header dính phía trên */}
            <div className={`sticky top-0 h-16 ${T.headerBg} backdrop-blur-md border-b ${T.border} px-8 z-20 flex items-center justify-between shrink-0`}>
              <button
                onClick={() => { if (isMobile) setIsSidebarOpen(!isSidebarOpen); }}
                className="flex items-center gap-3 bg-transparent border-0 p-0 text-left md:cursor-default"
              >
                <span className={`p-1.5 rounded-lg ${T.surfaceHover} ${T.muted} md:hidden`}>
                  <Menu size={18} />
                </span>
                <h1 className={`text-xl md:text-2xl font-extrabold tracking-tight ${T.ink}`}>
                  {activeArticle.title}
                </h1>
              </button>
            </div>

            {/* Vùng Cuộn Duy Nhất Chứa Nội Dung Bài Viết (full-bleed, không card) —
                Bên trong Suspense là vùng nội dung bài viết, luôn giữ theme sáng
                riêng của từng file, KHÔNG bị ảnh hưởng bởi dark mode của khung app. */}
            {/* bg-slate-50 phải là màu ĐẶC (không dùng /opacity) để chặn hoàn toàn màu nền tối
                của khung app phía sau lộ ra qua — đảm bảo dark mode không ảnh hưởng nội dung bài viết */}
            <div ref={contentScrollRef} className="flex-1 overflow-y-auto bg-slate-50 text-slate-800" style={{ overflowAnchor: 'none' }}>
              {/* Ép layout và áp dụng CSS Custom Overrides */}
              <div ref={annotationContainerRef} className="w-full h-full text-left article-content max-w-none
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
            {/* Render NGOÀI div article-content (annotationContainerRef) một cách cố ý:
                lớp UI này (nút nổi, popup, panel danh sách ghi chú) hiển thị lại chính
                text của quote trong mỗi note — nếu nằm bên TRONG containerRef, việc mở
                panel sẽ khiến hook tự "tìm thấy" quote trong DOM của chính panel thay vì
                trong bài viết thật, làm sai lệch vị trí highlight. */}
            {activeArticle && notesUnlocked && (
              <TextAnnotationLayer
                articleId={activeArticle.id}
                containerRef={annotationContainerRef}
                enabled={true}
                jumpToNote={jumpToNote && jumpToNote.article_id === activeArticle.id ? jumpToNote : null}
                onJumpHandled={() => setJumpToNote(null)}
                refreshSignal={notesRefreshSignal}
                scrollIdle={scrollIdle}
              />
            )}

            <AllNotesModal
              open={allNotesOpen}
              onClose={() => setAllNotesOpen(false)}
              articleMeta={articleMeta}
              onJumpToNote={handleJumpToNote}
              onNoteDeleted={() => setNotesRefreshSignal((v) => v + 1)}
            />

            {/* Cụm nút nổi "Về đầu trang" / "Xuống cuối trang" — mỗi nút chỉ hiện khi
                còn chỗ để cuộn theo hướng tương ứng, xếp chồng góc dưới phải */}
            {(showBackToTop || showBackToBottom) && (
              <div
                className={`fixed bottom-6 right-5 md:bottom-8 md:right-8 z-30 flex flex-col gap-2.5 transition-opacity duration-300 ${scrollIdle ? 'opacity-40 hover:opacity-100 focus-within:opacity-100' : 'opacity-100'}`}
              >
                {showBackToTop && (
                  <button
                    onClick={scrollContentToTop}
                    aria-label="Về đầu trang"
                    title="Về đầu trang"
                    className="w-11 h-11 rounded-full bg-slate-900/85 text-white shadow-lg backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform hover:bg-slate-900"
                  >
                    <ArrowUp size={18} />
                  </button>
                )}
                {showBackToBottom && (
                  <button
                    onClick={scrollContentToBottom}
                    aria-label="Xuống cuối trang"
                    title="Xuống cuối trang"
                    className="w-11 h-11 rounded-full bg-slate-900/85 text-white shadow-lg backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform hover:bg-slate-900"
                  >
                    <ArrowDown size={18} />
                  </button>
                )}
              </div>
            )}

          </div>
        ) : (
          <div className={`flex-1 flex items-center justify-center text-sm ${T.muted2}`}>
            Không tìm thấy bài viết nào.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;