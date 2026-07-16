import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';

// VÍ DỤ IMPORT CÁC FILE JSX TỪ CLAUDE BẰNG CÁCH KHAI BÁO DƯỚI ĐÂY:
// import AnalyticsPage from './pages/Analytics'; // Khi bạn có file Analytics tải từ Claude

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
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
                Bây giờ, bạn có thể dễ dàng tải các file JSX từ Claude về, mở file đó ra, bóc phần nội dung chính bỏ vào các tệp tương ứng để chuyển trang qua Sidebar mà không lo bị lỗi phông chữ hoặc hệ màu sắc lộn xộn nữa.
              </p>
              <div className="flex gap-2 pt-2">
                <Button variant="primary" size="sm">Cấu hình luồng n8n mới</Button>
                <Button variant="outline" size="sm">Xem tài liệu</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: PHÂN TÍCH KINH TẾ (Khi cần, chỉ cần thế code file Claude của bạn vào đây) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h1 className="text-xl font-bold text-slate-900">Phân Tích Kinh Tế & Thị Trường</h1>
          <p className="text-slate-500 text-xs">Hãy mở file JSX Phân tích tải từ Claude, copy phần nội dung chính của trang đó dán vào đây.</p>
          {/* <AnalyticsPage /> */}
        </div>
      )}

      {/* TAB 3: QUẢN TRỊ RỦI RO */}
      {activeTab === 'risk' && (
        <div className="space-y-6">
          <h1 className="text-xl font-bold text-slate-900">Quản Trị Rủi Ro Tài Chính</h1>
          <p className="text-slate-500 text-xs">Hãy dán file JSX Rủi ro của bạn vào đây.</p>
        </div>
      )}

      {/* TAB 4: QUẢN LÝ DỰ ÁN */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <h1 className="text-xl font-bold text-slate-900">Quản Lý & Theo Dõi Tiến Độ Dự Án</h1>
          <p className="text-slate-500 text-xs">Hãy dán file JSX quản lý công việc hoặc workflow n8n vào đây.</p>
        </div>
      )}

      {/* TAB 5: CÀI ĐẶT */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h1 className="text-xl font-bold text-slate-900">Cài Đặt Hệ Thống</h1>
          <p className="text-slate-500 text-xs">Cấu hình các API Keys, Đường dẫn Google Sheets và cấu hình kết nối.</p>
        </div>
      )}
    </MainLayout>
  );
}

export default App;