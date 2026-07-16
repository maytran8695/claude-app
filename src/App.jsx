import React, { useState } from 'react';
// Import các component UI cơ bản
import { MainLayout } from './components/Layout'; 
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/Card'; 
import { Button } from './components/Button'; 
import { Badge } from './components/Badge'; 

// 1. KẾT NỐI LẠI VỚI REGISTRY VÀ ARTICLE PAGE WRAPPER
import * as registryModule from './articleRegistry';
import ArticlePage from './components/ArticlePage'; // Nếu bị báo lỗi import này, bạn thử đổi thành: import { ArticlePage } from './components/ArticlePage';

// Tự động nhận diện biến export chứa danh sách bài viết từ registry của bạn
const articlesRegistry = registryModule.articles || registryModule.articleRegistry || registryModule.default || registryModule;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // 2. BỘ QUÉT THÔNG MINH (SMART LOOKUP)
  // Hàm tìm kiếm Component bài viết và Tiêu đề dựa vào activeTab từ Sidebar gửi sang
  const getActiveArticle = (tabId) => {
    if (!articlesRegistry) return null;

    // Trường hợp 1: Registry là Object phẳng { [id]: Component }
    if (articlesRegistry[tabId]) {
      return {
        Component: articlesRegistry[tabId],
        title: tabId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      };
    }

    // Trường hợp 2: Registry là Mảng các danh mục [{ id, name, items: [{ id, title, component }] }]
    if (Array.isArray(articlesRegistry)) {
      for (const category of articlesRegistry) {
        if (category.items && Array.isArray(category.items)) {
          const found = category.items.find(item => item.id === tabId);
          if (found) {
            return {
              Component: found.component || found.Component,
              title: found.title || found.name || tabId
            };
          }
        }
      }
    }

    // Trường hợp 3: Registry là Object chứa các danh mục { finance: { items: [...] } }
    if (typeof articlesRegistry === 'object') {
      for (const key in articlesRegistry) {
        const cat = articlesRegistry[key];
        if (cat && cat.items && Array.isArray(cat.items)) {
          const found = cat.items.find(item => item.id === tabId);
          if (found) {
            return {
              Component: found.component || found.Component,
              title: found.title || found.name || tabId
            };
          }
        }
      }
    }

    return null;
  };

  const activeArticle = getActiveArticle(activeTab);

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      
      {/* A. NẾU CLICK VÀO CÁC FILE JSX TỪ CLAUDE -> HIỂN THỊ NỘI DUNG BÀI VIẾT ĐÓ */}
      {activeArticle ? (
        <ArticlePage title={activeArticle.title}>
          <activeArticle.Component />
        </ArticlePage>
      ) : (
        /* B. NẾU KHÔNG PHẢI LÀ BÀI VIẾT -> HIỂN THỊ CÁC TAB MẶC ĐỊNH */
        <>
          {/* TAB 1: DASHBOARD CHÍNH */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header trong trang */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tổng Quan Workspace</h1>
                  <p className="text-slate-500 text-xs mt-0.5">Báo cáo cập nhật và hệ thống phân tích tích hợp.</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="success">Hệ thống: Live</Badge>
                  <Badge variant="primary">n8n: Hoạt động</Badge>
                </div>
              </div>

              {/* Các thẻ chỉ số nhanh */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Chỉ số Vàng (SJC)</CardTitle>
                    <CardDescription>Cập nhật tự động (ImportXML)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-slate-900">86.40 <span className="text-xs font-normal text-slate-400">Trđ / lượng</span></p>
                    <span className="text-xs text-emerald-600 font-semibold mt-1 block">▲ Tăng 0.4% hôm nay</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>VNINDEX</CardTitle>
                    <CardDescription>Cập nhật thực tế</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-slate-900">1,280.50</p>
                    <span className="text-xs text-rose-500 font-semibold mt-1 block">▼ Giảm 0.12% hôm nay</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Kế hoạch Dự án</CardTitle>
                    <CardDescription>Các workflow n8n</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-slate-900">14 Workflows</p>
                    <span className="text-xs text-indigo-600 font-semibold mt-1 block">● 100% Hoàn thành</span>
                  </CardContent>
                </Card>
              </div>

              {/* Thẻ chào mừng tích hợp */}
              <Card>
                <CardHeader>
                  <CardTitle>Chào mừng trở lại, May Tran!</CardTitle>
                  <CardDescription>Hệ thống UI đồng bộ hóa toàn bộ ứng dụng của bạn đã sẵn sàng.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-slate-600 text-xs leading-relaxed max-w-2xl">
                    Bây giờ, bạn có thể dễ dàng tải các file JSX từ Claude về, lưu vào các thư mục tương ứng trong dự án và đăng ký chúng trong <strong>articleRegistry.js</strong> để mở trực tiếp từ Sidebar một cách mượt mà.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="primary" size="sm">Cấu hình luồng n8n mới</Button>
                    <Button variant="outline" size="sm">Xem tài liệu</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: CÀI ĐẶT HỆ THỐNG */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-xl font-bold text-slate-900">Cài Đặt Hệ Thống</h1>
              <p className="text-slate-500 text-xs">Cấu hình các API Keys, Đường dẫn Google Sheets và cấu hình kết nối.</p>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}

export default App;