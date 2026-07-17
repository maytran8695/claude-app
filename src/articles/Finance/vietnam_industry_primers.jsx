import { useState } from "react";

/* ═══════════════════════════════════════════════════
   VIETNAM INDUSTRY PRIMERS v2 — 6 SECTORS · DEEP EDITION
   Nâng cấp: + Định giá & Kịch bản Bull/Base/Bear per sector
             + Quy mô thị trường (TAM) + Liên kết liên ngành
             + Công thức tính cho KPI chủ chốt
             + Power dynamics trong chuỗi giá trị
   Sectors: Steel · FMCG · Pharma · Energy · Real-Estate · Brokerage
══════════════════════════════════════════════════ */

const SECTORS = [
  { id: "steel",   label: "Thép",         icon: "⚙️",  accent: "#B34040" },
  { id: "fmcg",    label: "FMCG",         icon: "🛒",  accent: "#D4820A" },
  { id: "pharma",  label: "Dược",         icon: "💊",  accent: "#1A7A5E" },
  { id: "energy",  label: "Năng lượng",   icon: "⚡",  accent: "#B87000" },
  { id: "restate", label: "Bất động sản", icon: "🏢", accent: "#A0522D" },
  { id: "broker",  label: "Chứng khoán",  icon: "📈", accent: "#5B3FA0" },
  { id: "logistics", label: "Logistics·Cảng", icon: "🚢", accent: "#0E7C86" },
  { id: "banking",   label: "Ngân hàng",     icon: "🏦", accent: "#1E5AA8" },
];

const DATA = {

// ════════════════════════════════════════════════
// THÉP
// ════════════════════════════════════════════════
steel: {
  tagline: "Ngành công nghiệp nặng chu kỳ — hiểu spread là hiểu lợi nhuận, hiểu pha là hiểu timing",
  type: "Cyclical · Capital-intensive",

  positioning: {
    marketSize: "Sản lượng VN ~25-30 triệu tấn/năm (top 2 ASEAN, top 12 thế giới). Tiêu thụ nội địa ~23-25 triệu tấn. Tiêu thụ thép/đầu người VN ~240kg — bằng TQ giai đoạn 2005-2008 → còn 10-15 năm runway tăng trưởng cấu trúc trước khi bão hòa như TQ hiện tại (~600kg đỉnh, đang giảm).",
    globalRole: "Thép là 'GDP vật chất hoá' — hệ số co giãn tiêu thụ thép/GDP của nước đang công nghiệp hoá là 1.2-1.5x. TQ chiếm 54% sản lượng thế giới nên là price-setter toàn cầu; mọi nước khác kể cả VN là price-taker, chỉ phòng thủ được bằng thuế CBPG.",
    vnPosition: "Trước 2024: VN nhập siêu HRC (~7-8 triệu tấn/năm từ TQ, Ấn Độ). Sau Dung Quất 2 + CBPG: HPG chiếm 60% nhu cầu HRC nội địa — đây là import-substitution story lớn nhất ngành công nghiệp VN thập kỷ này. Xuất khẩu tôn mạ (HSG/NKG) đang gặp rào cản thuế Mỹ 46.73%.",
    cyclePosition: "Mid-2026: Cuối pha đáy. Giá HRC ~475 USD/t (vùng thấp lịch sử 5 năm). HPG chạy 'volume bù margin' (+19% sản lượng Q1/26) — pattern kinh điển xuất hiện 6-12 tháng trước price recovery trong 3 chu kỳ gần nhất (2015, 2019, 2023).",
    linkages: "Đầu vào từ: quặng/than nhập khẩu (nhạy tỷ giá USD/VND). Đầu ra cho: BĐS (50-55% cầu), Xây dựng hạ tầng, Công nghiệp chế tạo. Nhạy cảm với: room tín dụng BĐS (ngành ngân hàng), giải ngân đầu tư công, chu kỳ BĐS TQ (giá thép TG). Thép hồi phục THƯỜNG đi sau BĐS 1-2 quý và đi cùng đầu tư công.",
    keyPlayers: ["HPG — thượng nguồn BF tích hợp, 38% thị phần xây dựng, 60% HRC nội địa", "Formosa — HRC, vốn Đài Loan, không niêm yết VN", "HSG — tôn mạ 27% thị phần, hạ nguồn", "NKG — tôn mạ 16%, xuất khẩu cao nhất (rủi ro thuế Mỹ)", "GDA — tôn mạ, thuế Mỹ gần 0%"],
  },

  valueChain: [
    { step: "Khai thác nguyên liệu (Power: nhà cung cấp toàn cầu)", desc: "Quặng sắt 62% Fe do 4 tập đoàn (Vale, Rio, BHP, FMG) kiểm soát ~70% seaborne supply → oligopoly quyền lực giá rất mạnh. Than cốc luyện kim tập trung ở Úc. VN gần như không có quyền đàm phán giá — chỉ HPG giảm được phần nào nhờ quặng Thạch Khê nội địa.", margin: "Miner EBITDA margin 40-60% — họ mới là người ăn dày nhất chuỗi" },
    { step: "Luyện gang-thép BF (Power: quy mô + tích hợp)", desc: "HPG/Formosa: lò cao BF tích hợp — chi phí biên thấp nhất nhưng capex $1-2B/lò và phải chạy liên tục (dừng lò = thiệt hại trăm tỷ). Đây là bước quyết định cost position của cả chuỗi. Ai có BF quy mô + cảng nước sâu + điện tự phát = ai thắng cuộc chiến chi phí.", margin: "Gross margin 15-20% chu kỳ tốt; 5-8% chu kỳ đáy" },
    { step: "Cán thép thành phẩm", desc: "Thép dài (thanh vằn — bán nội địa, cạnh tranh khu vực theo bán kính vận chuyển ~300-500km) vs thép dẹt HRC (chuẩn hoá toàn cầu, cạnh tranh quốc tế trực tiếp với TQ). Long steel có moat địa lý; HRC không có moat trừ chi phí.", margin: "Long: ổn định hơn. Flat: biến động theo giá TG" },
    { step: "Gia công hạ nguồn (Power: yếu nhất chuỗi)", desc: "HSG/NKG mua HRC → cán nguội → mạ. Bị kẹp giữa hai gọng kìm: giá đầu vào HRC do HPG/TQ quyết định, giá đầu ra tôn mạ do cạnh tranh xuất khẩu quyết định. Không kiểm soát được cả hai đầu — đây là lý do cấu trúc khiến hạ nguồn luôn biến động hơn thượng nguồn.", margin: "Gross margin 8-12% — mỏng và không ổn định" },
    { step: "Phân phối & Service Center", desc: "Đại lý cấp 1-2, trung tâm gia công cắt xẻ. Vai trò giữ tồn kho hộ nhà máy. Biên rất mỏng, sống nhờ volume và quan hệ. SMC từng lỗ nặng 2022-23 vì ôm tồn kho khi giá lao dốc — minh chứng rủi ro của mắt xích này.", margin: "Net margin 1-2%; rủi ro inventory cao" },
    { step: "Người dùng cuối (cấu trúc cầu)", desc: "Xây dựng & BĐS 50-55% · Công nghiệp chế tạo (ô tô, điện tử, cơ khí) 25-30% · Hạ tầng đầu tư công 15-20% · Xuất khẩu 10-15%. Cầu công nghiệp đang tăng tỷ trọng nhờ FDI — làm ngành bớt phụ thuộc BĐS hơn so với 10 năm trước.", margin: "— (demand mix quyết định độ nhạy chu kỳ)" },
  ],

  revenueModel: [
    { name: "Thép xây dựng (Long steel)", vi: "Thanh vằn, thép cây, thép hình", desc: "HPG ~38% thị phần. Moat địa lý: chi phí vận chuyển cao khiến cạnh tranh mang tính vùng miền. Driver kép: BĐS dân dụng (chậm) + đầu tư công (đang tăng tốc 8.3 triệu tỷ 2026-30). Giá bán nội địa ổn định hơn HRC.", driver: "BĐS khởi công mới · Giải ngân ĐT công · Giá phôi TQ", margin: "Gross 15-18% chu kỳ tốt; break-even chu kỳ đáy với DN nhỏ" },
    { name: "HRC — Thép cuộn cán nóng", vi: "Flat steel thượng nguồn", desc: "Import-substitution story: HPG từ 0% lên 60% thị phần HRC nội địa sau DQ2 + CBPG. Khách hàng: HSG/NKG (tôn mạ), ống thép, cơ khí, ô tô (VinFast, Thaco). Biên nhạy với spread quặng-HRC toàn cầu.", driver: "Giá HRC TG (SHFE) · CBPG duy trì · Ngành ô tô nội địa tăng trưởng", margin: "Gross 14-18% — phụ thuộc spread, hiện ~145-165 USD/t" },
    { name: "Tôn mạ / Ống thép", vi: "GI/PPGI/PPGL + Pipe", desc: "HSG 27%, NKG 16%, GDA 16% thị phần tôn mạ. Xuất khẩu 40-60% sản lượng → rủi ro thuế quan là rủi ro số 1 (Mỹ áp 46.73% với HPG/NKG; GDA/HSG gần 0%). Ống thép tăng trưởng tốt hơn nhờ KCN + hạ tầng kỹ thuật.", driver: "Xây dựng nhà xưởng KCN · Phán quyết thuế Mỹ cuối cùng · Spread HRC-tôn mạ", margin: "Gross 8-12% — mỏng nhất, nhạy cảm nhất" },
    { name: "Thép chất lượng cao & Ray (2027+)", vi: "Special steel — câu chuyện tương lai của HPG", desc: "Nhà máy ray Dung Quất vào vận hành 2027, đón đầu đường sắt cao tốc Bắc-Nam $67B + metro. Thép dự ứng lực, thép kỹ thuật ô tô đang phát triển. Đây là chiến lược thoát commodity: chuyển từ cạnh tranh giá sang cạnh tranh spec — biên cao hơn, ít đối thủ hơn.", driver: "Đường sắt cao tốc phê duyệt gói thầu · Nội địa hoá ô tô · Tiêu chuẩn kỹ thuật", margin: "Gross ước >20-25% — premium segment" },
  ],

  kpis: [
    { term: "Spread", full: "Chênh lệch giá bán − chi phí nguyên liệu", def: "KPI quan trọng nhất ngành. Công thức gần đúng cho BF: Spread = P(HRC) − [1.6 × P(quặng 62%) + 0.7 × P(than cốc)] − chi phí chuyển đổi (~80-100 USD/t). Lợi nhuận nhà máy = Spread × Sản lượng − Chi phí cố định.", howToRead: "Spread HRC tốt: >120-150 USD/t. Hòa vốn HPG (BF tích hợp): ~290-310 USD/t toàn chi phí — thấp hơn ngành ~30-40 USD nhờ tự chủ điện + cảng + một phần quặng. Theo dõi spread hàng tuần: SHFE (giá HRC TQ) + Platts (quặng, than). Spread mở rộng 2 tháng liên tiếp = tín hiệu sớm của pha phục hồi.", vnContext: "Mid-2026: HRC VN ~475 USD/t, quặng ~100-105 USD/t, than cốc ~180-200 USD/t → spread HPG ước ~145-165 USD/t. Đủ sống tốt nhưng chưa phải chu kỳ đỉnh (spread đỉnh 2021: >350 USD/t). Room upside còn rất lớn nếu giá HRC hồi phục." },
    { term: "Utilisation Rate", full: "Sản lượng thực tế / Công suất thiết kế", def: "Chi phí cố định ngành thép rất lớn (khấu hao lò, nhân sự) → utilisation quyết định chi phí/tấn. Công thức tác động: chi phí cố định/tấn = Tổng fixed cost / Sản lượng → utilisation giảm 20% có thể làm chi phí/tấn tăng 15-25%.", howToRead: "Util >80%: tối ưu. 70-80%: OK. <60%: nguy hiểm — fixed cost không được hấp thụ. Quan trọng: utilisation của HPG cao trong khi ngành dư cung = HPG đang lấy thị phần của kẻ yếu, không phải ngành đang tốt lên. Phân biệt hai điều này khi đọc số liệu.", vnContext: "HPG util ~85%+ nhờ DQ2 fill-up. Ngành VN: công suất ~30-35M tấn vs cầu ~25M tấn → dư cung cấu trúc ~20-30%. Trong ngành dư cung, cost leader (HPG) ăn thị phần; kẻ chi phí cao thoái lui dần. Đây là consolidation play kéo dài nhiều năm." },
    { term: "Peak P/E Trap", full: "Bẫy P/E ngành chu kỳ — khái niệm sống còn", def: "Nghịch lý định giá cyclicals: P/E THẤP NHẤT tại ĐỈNH chu kỳ (EPS đang đỉnh, sắp giảm) và CAO NHẤT/vô hạn tại ĐÁY (EPS đang đáy, sắp phục hồi). Nhà đầu tư mua vì 'P/E rẻ 5x' ở đỉnh chu kỳ 2021 đã lỗ 60-70% sau đó.", howToRead: "Quy tắc ngược đời cho cyclicals: MUA khi P/E cao/âm (EPS đáy) + P/B thấp; BÁN khi P/E thấp (EPS đỉnh) + P/B cao. Dùng P/B through-cycle làm neo chính: HPG dao động 0.8x (đáy 2022) — 2.5x+ (đỉnh 2021). Normalized earnings (EPS trung bình 5-7 năm) là cách thứ hai.", vnContext: "HPG hiện tại: P/B ~1.5-1.7x — vùng giữa. EPS Q1/26 tăng 270% từ nền thấp → P/E trailing đang co lại nhanh. Câu hỏi đúng không phải 'P/E bao nhiêu' mà 'EPS 2027-28 mid-cycle là bao nhiêu' → định giá trên con số đó." },
    { term: "Inventory Gain/Loss", full: "Lãi/lỗ tồn kho — nhiễu lớn nhất trong KQKD thép", def: "Nguyên liệu mua trước 30-60 ngày. Giá thành phẩm tăng nhanh → tồn kho giá thấp thành lợi nhuận 'ảo'. Giá giảm nhanh → trích lập giảm giá tồn kho ăn thẳng vào lợi nhuận. Quy mô: có thể ±20-40% lợi nhuận quý.", howToRead: "Khi đọc KQKD quý đột biến (tốt hoặc xấu): tách phần inventory effect ra trước khi kết luận về core operations. Cách tách nhanh: so sánh biến động giá HRC trong quý với biên gộp — nếu biên gộp tăng đúng lúc giá tăng mạnh cuối quý = một phần là inventory gain, sẽ không lặp lại.", vnContext: "HPG duy trì tồn kho nguyên liệu 60-70 ngày. Q1/2026 LNST +270%: phần lớn từ volume DQ2 (+40%) là thực chất; phần nhỏ từ giá quặng giảm trong quý. HSG lãi 119 tỷ (-42%): bị kẹp spread HRC-tôn mạ, không phải inventory issue — đây là structural, đáng lo hơn." },
    { term: "CBPG & Trade Policy", full: "Thuế chống bán phá giá — biến số chính sách hai chiều", def: "Chiều bảo hộ: VN áp CBPG HRC TQ/Ấn Độ (2024) → HPG chiếm thị phần. Chiều rủi ro: Mỹ áp thuế trợ cấp tôn mạ VN 46.73% (HPG/NKG) → xuất khẩu gặp khó. Trade policy giờ quan trọng ngang giá hàng hoá trong mô hình lợi nhuận ngành.", howToRead: "Đánh giá exposure từng DN: NKG 26% DT từ Mỹ-Mexico = bị ảnh hưởng nặng nhất. HPG xuất khẩu tôn mạ nhỏ so với tổng DT = ít ảnh hưởng dù thuế cao. GDA/HSG thuế ~0% = có thể chiếm thị phần xuất Mỹ từ NKG. Phán quyết cuối cùng (final determination) là catalyst cần theo dõi.", vnContext: "CBPG HRC hết hạn sẽ được review — nếu gia hạn = HPG tiếp tục hưởng lợi. Rủi ro mới: EU CBAM (thuế carbon biên giới) từ 2026+ đánh vào thép nhập khẩu phát thải cao — dài hạn buộc VN đầu tư giảm phát thải hoặc mất thị trường EU." },
    { term: "Net Debt / EBITDA", full: "Đòn bẩy — ai sống sót qua mùa đông", def: "Nợ ròng / EBITDA = số năm cần để trả hết nợ bằng dòng tiền hoạt động. Ngành thép: <2x an toàn, 2-3x theo dõi, >4x nguy hiểm trong downturn. Điểm chết: khi EBITDA giảm 50% trong downturn, ND/EBITDA tự động gấp đôi dù nợ không đổi.", howToRead: "Stress test đơn giản: lấy EBITDA đáy chu kỳ gần nhất (2022-23) chia nợ hiện tại — nếu >5x = DN sẽ gặp căng thẳng nếu chu kỳ lặp lại. HPG pass test này; HSG/NKG borderline. Đây là lý do cấu trúc chỉ nên giữ HPG qua trọn chu kỳ.", vnContext: "HPG sau capex DQ2: ND/EBITDA ~2.5-3x nhưng đang giảm nhanh khi DQ2 tạo EBITDA. Chu kỳ capex lớn của HPG đã qua đỉnh → 2026-2028 là giai đoạn hái quả: FCF chuyển dương mạnh, khả năng tăng cổ tức/mua lại." },
  ],

  economics: [
    { title: "Cost moat HPG — giải phẫu lợi thế 50-90 USD/tấn", body: `Cost position là moat duy nhất bền vững trong ngành commodity. HPG xây nó qua tích hợp dọc hoàn toàn:

Quặng: một phần tự chủ Thạch Khê + hợp đồng dài hạn Úc/Brazil.
Luyện: 8 lò cao (Hải Dương + Dung Quất) chạy liên tục, quy mô lớn nhất ĐNA.
Điện: nhà máy nhiệt điện tự phát ~70% nhu cầu (điện = 8-10% chi phí thép).
Logistics: cảng nước sâu Dung Quất riêng — nhập quặng tàu Capesize 200,000 DWT (rẻ hơn tàu nhỏ 15-20%/tấn), xuất thành phẩm trực tiếp.

Kết quả: chi phí HRC ~290-310 USD/t vs đối thủ nhập TQ sau CBPG ~360-400 USD/t.
→ Chênh 50-90 USD/t trên sản lượng 8-10 triệu tấn = 400-900 triệu USD lợi thế/năm.

Sao chép cần: $5B+ vốn, 15-20 năm, vị trí cảng nước sâu (hữu hạn), và giấy phép. Formosa có đủ nhưng không có động cơ đánh nội địa VN. → Moat này an toàn ít nhất 10 năm.` },
    { title: "Đọc chu kỳ thép bằng 3 tín hiệu dẫn dắt — thay vì đoán", body: `Không cần đoán đáy. Ba tín hiệu lịch sử xác nhận pha chuyển từ Đáy sang Phục hồi:

Tín hiệu 1 — Volume trước Price: Sản lượng tiêu thụ tăng mạnh trong khi giá còn thấp (HPG hiện tại: +19% Q1/26). Trong 3 chu kỳ gần nhất, pattern này đi trước price recovery 6-12 tháng.

Tín hiệu 2 — Spread ngừng thu hẹp: Spread đi ngang 2-3 tháng sau chuỗi giảm dài = cung cầu đang cân bằng lại. Theo dõi weekly SHFE.

Tín hiệu 3 — Policy inflection: CBPG được áp/gia hạn + đầu tư công tăng tốc + tín dụng BĐS nới. VN mid-2026: 2/3 điều kiện đã có (CBPG ✓, đầu tư công ✓, tín dụng BĐS đang siết ✗).

→ Khi cả 3 tín hiệu cùng xuất hiện: chuyển từ tích lũy thăm dò sang full position. Hiện tại: 2/3 — tích lũy dần là hợp lý, all-in là sớm.` },
    { title: "China factor — mô hình hoá rủi ro lớn nhất", body: `TQ = 54% sản lượng thép TG → mọi mô hình lợi nhuận thép VN phải có biến China.

Cơ chế truyền dẫn: BĐS TQ suy → cầu nội địa TQ giảm → nhà máy TQ xuất khẩu phá giá → giá HRC toàn cầu giảm → spread VN nén (dù cầu VN vẫn tốt).

Ba kịch bản China 2026-2028:
1. TQ cắt giảm công suất thật (supply-side reform 2.0): giá thép TG hồi mạnh → kịch bản tốt nhất cho HPG. Xác suất trung bình — Bắc Kinh đã nói nhiều lần nhưng thực thi chậm.
2. TQ duy trì hiện trạng: xuất khẩu ~100M tấn/năm, giá đi ngang vùng thấp → HPG sống bằng volume + cost moat. Kịch bản cơ sở.
3. TQ kích thích BĐS mạnh: cầu nội địa TQ hút lại thép → xuất khẩu giảm → giá tăng. Xác suất thấp hơn — Bắc Kinh tránh lặp lại bong bóng.

→ Hàm ý: đừng xây thesis HPG dựa trên giá thép tăng. Xây trên volume + cost moat + ray 2027 — giá tăng là upside option miễn phí.` },
  ],

  valuation: {
    method: "P/B through-cycle làm neo chính (HPG: 0.8x đáy 2022 → 2.5x+ đỉnh 2021). EV/EBITDA mid-cycle 5.5-7x làm kiểm chứng. TUYỆT ĐỐI tránh P/E tại đỉnh/đáy chu kỳ (Peak P/E Trap). Với HPG từ 2027: cộng thêm SOTP cho mảng ray/thép chất lượng cao (multiple cao hơn commodity) + BĐS KCN.",
    notes: [
      "Normalized EPS: dùng EPS trung bình 5-7 năm hoặc mid-cycle spread (~180-200 USD/t) × sản lượng dự phóng để tính EPS chuẩn hoá, rồi áp P/E 8-10x.",
      "Replacement cost check: vốn hoá HPG so với chi phí xây mới toàn bộ tài sản (~$7-9B cho DQ1+DQ2+Hải Dương). Mua dưới replacement cost = biên an toàn cứng.",
      "Câu hỏi định giá đúng: không phải 'P/E hiện tại bao nhiêu' mà 'EPS mid-cycle 2027-28 là bao nhiêu khi DQ2 full + ray vận hành'.",
    ],
    scenarios: {
      bull: "BĐS VN phục hồi rõ từ 2027 + TQ cắt công suất + giá HRC về 550-600 USD/t → spread HPG >220 USD/t + DQ2 full 5.6M tấn HRC → EPS gấp ~2x mid-2026. P/B re-rate 2.0-2.2x. Kèm ray 2027 chạy → thêm câu chuyện tăng trưởng mới.",
      base: "Giá HRC đi ngang 475-530 USD/t. Tăng trưởng đến từ volume DQ2 + đầu tư công. EPS tăng 20-35%/năm 2026-27 từ nền thấp. P/B giữ 1.5-1.8x. Return chủ yếu từ EPS growth, không phải re-rating.",
      bear: "TQ đẩy mạnh xuất khẩu phá giá + tín dụng BĐS VN tiếp tục siết + thuế Mỹ mở rộng sang thép khác → spread nén về 100-120 USD/t → EPS đi ngang. P/B về 1.1-1.3x. HSG/NKG lỗ; HPG vẫn lãi nhờ cost moat nhưng cổ phiếu điều chỉnh 25-35%.",
    },
  },

  watchList: [
    { metric: "Giá HRC SHFE + spread tính toán", source: "Bloomberg / SHFE / Platts", freq: "Hàng tuần", signal: "Spread ngừng thu hẹp 2-3 tháng = tín hiệu sớm phục hồi. Mở rộng = xác nhận." },
    { metric: "Sản lượng tiêu thụ HPG hàng tháng", source: "HPG công bố tháng", freq: "Hàng tháng", signal: "Volume tăng khi giá thấp = pattern tiền phục hồi. Volume giảm = cầu thực yếu." },
    { metric: "Sản lượng + xuất khẩu thép TQ (CISA)", source: "CISA / NBS", freq: "Hàng tháng", signal: "Xuất khẩu TQ >9M tấn/tháng = áp lực giá toàn cầu tiếp diễn." },
    { metric: "Giải ngân đầu tư công VN (% kế hoạch)", source: "Bộ Tài chính", freq: "Hàng tháng", signal: "Tăng tốc Q3-Q4 = cầu thép xây dựng + ray tương lai." },
    { metric: "Số dự án BĐS mới khởi công", source: "Bộ Xây dựng", freq: "Hàng quý", signal: "Leading 6-9 tháng cho cầu thép dài. Kết hợp tín dụng BĐS để đánh giá." },
    { metric: "Phán quyết thuế Mỹ + review CBPG VN", source: "DOC Mỹ / Bộ Công thương", freq: "Theo sự kiện", signal: "Final determination Mỹ = catalyst NKG/HSG. Gia hạn CBPG = catalyst HPG." },
  ],
},

// ════════════════════════════════════════════════
// FMCG
// ════════════════════════════════════════════════
fmcg: {
  tagline: "Ngành phòng thủ — thương hiệu là tài sản vô hình sinh lời cao nhất nền kinh tế",
  type: "Defensive · Brand-driven",

  positioning: {
    marketSize: "F&B VN ~$79.3B (2025), CAGR 5% thập kỷ qua — ổn định qua mọi cú sốc (COVID, lạm phát, thuế quan). Chi tiêu lương thực thực phẩm chiếm >2/3 giỏ tiêu dùng hộ gia đình VN — tỷ trọng cao gấp đôi nước phát triển → còn nhiều thập kỷ dịch chuyển cơ cấu (từ ăn no sang ăn ngon, từ chợ sang thương hiệu).",
    globalRole: "FMCG là ngành duy nhất mà tài sản chính (thương hiệu) không nằm trên bảng cân đối kế toán nhưng tạo ra ROIC cao nhất. Toàn cầu: Nestlé, Unilever, P&G duy trì ROIC 15-25% qua nhiều thập kỷ nhờ brand + distribution — mô hình mà MCH đang sao chép thành công tại VN.",
    vnPosition: "VN đang ở điểm uốn premiumisation: GDP/capita vượt $5,000 (2025) — ngưỡng lịch sử mà tại đó Thái Lan (2003), TQ (2011) đều chứng kiến FMCG premium tăng tốc 2-3x tốc độ mass segment trong thập kỷ tiếp theo. 101 triệu dân, median age 31 — golden window nhân khẩu học còn ~15 năm.",
    cyclePosition: "Non-cyclical về cầu nhưng có chu kỳ margin theo giá nguyên liệu (sữa bột, dầu cọ, ngô). Hiện tại: chi phí nguyên liệu ổn định, premiumisation tăng tốc, World Cup 2026 là catalyst ngắn hạn cho bia. MCH đang lấy thị phần (+11% DT vs ngành +5-6%).",
    linkages: "Đầu vào từ: nông sản toàn cầu (nhạy giá hàng hoá + tỷ giá). Đầu ra qua: bán lẻ (GT 65-70%, MT, e-commerce). Nhạy cảm với: thu nhập khả dụng (chính sách giảm thuế TNCN, tăng lương tối thiểu 2026 = tailwind), CPI thực phẩm. Ít liên kết với chu kỳ tín dụng — đây chính là giá trị đa dạng hoá của FMCG trong danh mục.",
    keyPlayers: ["MCH — gia vị + mì gói, net margin 26%, pricing power #1 VN", "VNM — sữa 40% thị phần, FCF machine, dividend yield ~9%", "SAB — bia ~45% thị phần, World Cup catalyst, secular headwind NĐ100", "MSN — holding: MCH + WinCommerce + MeatLife, flywheel play", "DBC/BAF — chăn nuôi, pig cycle play, hưởng lợi hậu ASF"],
  },

  valueChain: [
    { step: "Nguyên liệu nông sản (Power: thị trường hàng hoá TG)", desc: "Sữa bột (GDT auction NZ), dầu cọ (Bursa Malaysia), ngô/đậu tương (CBOT), lúa mì, đường. Chi phí NL 40-60% doanh thu. DN FMCG VN là price-taker hoàn toàn — không hedge được dài hạn, chỉ quản lý bằng tồn kho 3-6 tháng và pricing power đầu ra.", margin: "Biến động NL ±20%/năm là bình thường — đây là nguồn surprise margin chính" },
    { step: "R&D / NPD (Power: người tạo khác biệt)", desc: "New Product Development quyết định ai tăng ai giảm thị phần trong ngành đã bão hoà volume. MCH ra 40-60 SKU mới/năm; tỷ lệ thành công ~20-30% là tốt. DN không NPD = thị phần bị ăn mòn 1-2%/năm bởi người có NPD. Chi phí R&D VN thấp (1-3% DT) — lợi thế chi phí vs multinational.", margin: "NPD thành công = margin mở rộng qua premiumisation" },
    { step: "Sản xuất (Power: quy mô)", desc: "Economies of scale rõ rệt: nhà máy lớn chi phí/đơn vị thấp hơn 15-25% nhà máy nhỏ. Capex vừa phải (8-12% DT). Đây KHÔNG phải nơi tạo khác biệt — sản xuất tốt là điều kiện cần, thương hiệu + phân phối mới là điều kiện đủ.", margin: "COGS 50-60% DT — tối ưu được 2-3 điểm % qua scale" },
    { step: "Thương hiệu & Marketing (Power: người giữ giá trị)", desc: "Chi 5-15% DT/năm — đây là 'capex vô hình' tích lũy thành brand equity. Điểm mấu chốt: brand equity không thể mua nhanh bằng tiền — cần 10-20 năm nhất quán. Chin-su, Nam Ngư, Vinamilk là kết quả của 20-30 năm đầu tư liên tục. Đây là mắt xích giữ phần lớn giá trị chuỗi.", margin: "Brand mạnh = gross margin cao hơn peers 10-15 điểm %" },
    { step: "Phân phối GT + MT + E-com (Power: người gác cổng)", desc: "GT (chợ, tạp hoá) 65-70%: moat của người đi trước — VNM/MCH phủ 300-800K điểm, mất 10-20 năm xây. MT (siêu thị) 25-30%: quyền lực đang chuyển sang retailer (listing fee, slotting fee ép biên nhà sản xuất). E-com 8-10%: san bằng sân chơi — hàng TQ giá rẻ vào trực tiếp qua TikTok Shop = threat cấu trúc mới với mass segment.", margin: "GT margin tốt hơn MT 3-5 điểm % cho nhà sản xuất" },
    { step: "Người tiêu dùng cuối (cấu trúc cầu đang dịch chuyển)", desc: "3 xu hướng cùng lúc: premiumisation (upgrade sản phẩm), health consciousness (ít đường/muối, organic), convenience (ăn liền, giao nhanh). DN bắt được cả 3 (MCH với Omachi premium, VNM Green Farm) thắng kép; DN kẹt ở mass segment bị ép cả giá lẫn volume.", margin: "— (mix shift quyết định hướng margin 5 năm tới)" },
  ],

  revenueModel: [
    { name: "Gia vị & Thực phẩm tiện lợi", vi: "MCH — Chin-su, Nam Ngư, Omachi, Kokomi", desc: "Danh mục có pricing power cao nhất VN: sản phẩm dùng hàng ngày, giá trị đơn vị nhỏ (tăng giá 5-7% người dùng gần như không nhận ra), switching cost tâm lý cao (khẩu vị quen). Premium line chiếm 35% DT (từ 22% năm 2020) — premiumisation đang chạy đúng lộ trình.", driver: "Thu nhập hộ gia đình · Premiumisation · NPD pipeline", margin: "Gross 40-50% · Net ~26% — ngang ngành phần mềm" },
    { name: "Sữa & Đồ uống", vi: "VNM, SAB, BHN", desc: "Thị trường mature: sữa VN tăng 2-4%/năm, bia đỉnh 2019 chưa phục hồi (NĐ 100). Giá trị đầu tư nằm ở FCF + cổ tức, không phải tăng trưởng: VNM FCF 7-8 nghìn tỷ/năm, dividend yield ~9% — cao hơn lãi tiết kiệm → 'bond proxy' có quyền chọn tăng trưởng miễn phí nếu premiumisation sữa chạy.", driver: "GDT sữa bột (COGS) · World Cup 2026 (bia) · Premiumisation organic", margin: "Gross 30-40% · Net 10-15% · FCF yield 6-9%" },
    { name: "Chăn nuôi & TACN (3F model)", vi: "DBC, BAF, MSN MeatLife", desc: "Feed-Farm-Food tích hợp dọc. Pig cycle đang ở pha thuận lợi: ASF 2025 tiêu hủy 9.6% đàn → cung thiếu → giá heo cao H1/2026 → BAF DT +57% Q1/26. Nhưng nhớ: pig cycle ĐẢO CHIỀU sau 12-18 tháng khi tái đàn hoàn tất — đây là trade, không phải investment dài hạn.", driver: "Giá heo hơi · Giá ngô/đậu CBOT · Tiến độ tái đàn quốc gia", margin: "Gross 5-12% — mỏng, biến động theo pig cycle" },
    { name: "Bán lẻ FMCG hiện đại", vi: "WinCommerce (MSN), Bách Hoá Xanh (MWG)", desc: "WinMart 3,000+ điểm đã về break-even — mỗi điểm % EBITDA margin tăng thêm trên doanh thu ~35-40 nghìn tỷ = 350-400 tỷ lợi nhuận mới. Flywheel MSN: MCH đẩy SKU qua Win → biên gộp hệ thống cao hơn bán qua đại lý ngoài. BHX Bắc tiến 2026 = thử nghiệm quyết định thesis MWG.", driver: "SSSG · Mật độ đô thị · Chuyển dịch GT→MT", margin: "Break-even → mục tiêu EBITDA 3-5% khi đạt quy mô" },
  ],

  kpis: [
    { term: "Pricing Power Test", full: "Kiểm định khả năng chuyển giá — không có số liệu trực tiếp", def: "Pricing power = khả năng tăng giá mà volume không giảm tương ứng. Kiểm định gián tiếp: theo dõi gross margin qua chu kỳ giá nguyên liệu. Công thức đánh giá: nếu chi phí NL tăng X% mà gross margin chỉ giảm <0.3X điểm % → có pricing power; giảm >0.7X → không có.", howToRead: "MCH tăng giá Chin-su 5% (2022) → volume gần như không đổi = pass test. VNM 2024 không dám tăng giá khi sữa bột tăng → margin bị nén = pricing power hạn chế do cạnh tranh Abbott/TH. Xếp hạng ngành: MCH > SAB > VNM > chăn nuôi. Xếp hạng này quyết định P/E xứng đáng của từng DN.", vnContext: "P/E hợp lý theo pricing power: MCH 20-22x (pass), VNM/SAB 14-16x (trung bình), chăn nuôi 8-12x mid-cycle (không có). Trả P/E cao cho DN không có pricing power = lỗi định giá phổ biến nhất trong ngành này." },
    { term: "ASP vs Volume Decomposition", full: "Tách tăng trưởng: giá bán bình quân vs sản lượng", def: "DT growth = Volume growth + ASP growth + Mix shift. Phân rã này cho biết CHẤT LƯỢNG tăng trưởng: tăng nhờ volume (bền nếu thị phần tăng), nhờ ASP (bền nếu premiumisation, không bền nếu chỉ là pass-through lạm phát), hay nhờ mix (bền nhất — cấu trúc).", howToRead: "MCH DT +11% = ~4% volume + ~7% ASP/mix → tăng trưởng chất lượng cao (premiumisation thật). DN tăng DT thuần bằng ASP khi lạm phát cao = tăng trưởng ảo, sẽ mất khi lạm phát hạ. Yêu cầu công ty disclose split này tại ĐHĐCĐ — DN tốt luôn sẵn sàng chia sẻ.", vnContext: "Premium line MCH: 22% DT (2020) → 35% (2025) — mix shift ~2.5 điểm %/năm. Nếu duy trì, gross margin MCH còn mở rộng thêm 3-5 điểm % đến 2030 mà không cần volume tăng. Đây là con đường tăng trưởng ít rủi ro nhất trong toàn bộ TTCK VN." },
    { term: "SSSG", full: "Same-Store Sales Growth — chất lượng tăng trưởng bán lẻ", def: "Tăng trưởng DT từ điểm bán hoạt động >12 tháng — loại trừ hiệu ứng mở mới. SSSG dương = mô hình đang thắng; SSSG âm + vẫn mở điểm mới = 'tăng trưởng mua bằng capex', sẽ sụp khi hết tiền mở rộng (bài học Bách Hoá Xanh 2020-22 trước khi tái cấu trúc).", howToRead: "Ngưỡng: SSSG >5% tốt; 0-3% flat; âm = báo động. Kết hợp với payback period mỗi điểm mở mới (<24 tháng là tốt với minimart VN). WinMart SSSG dương từ H2/2024 + có lãi = mô hình đã được chứng minh → giai đoạn tiếp theo là scale.", vnContext: "WinCommerce: SSSG dương bền + break-even = catalyst chính MSN re-rating. BHX Bắc tiến Q2/2026: theo dõi SSSG cửa hàng Hà Nội trong 4 quý đầu — nếu đạt như miền Nam, MWG mở ra chương tăng trưởng mới; nếu không, chi phí logistics 2 miền sẽ ăn margin." },
    { term: "Pig Cycle Position", full: "Định vị pha chu kỳ giá heo — trade theo chu kỳ 2-3 năm", def: "Chu kỳ: giá cao → tái đàn → 12-18 tháng sau cung tăng → giá giảm → giảm đàn → cung thiếu → giá cao. Điểm vào tốt nhất: NGAY SAU cú sốc cung (dịch bệnh) khi giá bắt đầu tăng. Điểm ra: khi số liệu tái đàn quốc gia hoàn tất >95% mức trước dịch.", howToRead: "Giá heo <50K/kg: DN lỗ, gần đáy chu kỳ. 55-65K: hoà vốn. >65K: có lãi, giữa chu kỳ. >75K: đỉnh, chuẩn bị thoát. Hiện tại (mid-2026): hậu ASF, giá phục hồi, tái đàn đang diễn ra → còn 2-4 quý thuận lợi trước khi cung mới về.", vnContext: "ASF 2025 tiêu hủy 9.6% đàn — cú sốc cung lớn. BAF DT +57% Q1/26. DBC có thêm catalyst vaccine ASF (nếu thương mại hoá thành công = chuyển từ cyclical sang structural story). Kỷ luật: đây là TRADE 12-18 tháng, đặt sẵn mức thoát." },
    { term: "FCF Yield & Dividend Floor", full: "Định giá sàn bằng dòng tiền — riêng cho FMCG mature", def: "FCF = EBITDA − Capex − Δworking capital. Với VNM/SAB (mature, capex thấp): FCF yield và dividend yield tạo 'sàn định giá' — khi dividend yield vượt lãi suất tiết kiệm 2-3 điểm %, dòng tiền phòng thủ sẽ vào đỡ giá.", howToRead: "VNM: cổ tức 5,400đ, giá 58K → yield ~9.3% vs tiết kiệm ~5-6% → chênh 3-4 điểm = sàn rất cứng. Cách dùng: tính giá tại đó yield = lãi tiết kiệm + 2% → đó là mức 'sàn lý thuyết' để đặt lệnh chờ mua. Với VNM: sàn ~65-70K nếu lãi suất 6%.", vnContext: "VNM là bond proxy lớn nhất TTCK VN. Lưu ý: sàn chỉ cứng khi cổ tức bền — kiểm tra payout ratio (<80% NPAT) và FCF cover (FCF > cổ tức chi trả). VNM pass cả hai. SAB yield ~4-5% — sàn mỏng hơn." },
    { term: "E-commerce Disruption Index", full: "Mức độ đe doạ từ hàng nhập giá rẻ qua e-com", def: "TikTok Shop/Shopee cho hàng TQ vào thẳng người tiêu dùng VN không qua phân phối truyền thống — vô hiệu hoá distribution moat ở một số ngành hàng. Mức đe doạ theo ngành hàng: cao với đồ khô, snack, gia dụng nhỏ; thấp với hàng tươi, sữa, gia vị bản địa (khẩu vị đặc thù).", howToRead: "Đánh giá exposure từng DN: % danh mục thuộc ngành hàng dễ bị thay thế bởi hàng nhập. MCH exposure thấp (nước mắm, gia vị Việt — hàng TQ không thay được khẩu vị). Snack/bánh kẹo nội exposure cao. Đây là lens mới bắt buộc khi phân tích FMCG VN từ 2024+.", vnContext: "Chính sách thuế với hàng nhập giá trị nhỏ qua e-com đang được siết (bỏ miễn thuế đơn <1 triệu) — nếu thực thi nghiêm = giảm threat đáng kể. Theo dõi thực thi, không chỉ văn bản." },
  ],

  economics: [
    { title: "Giải phẫu margin MCH 26% — công thức nhân bản được không?", body: `MCH net margin ~26% đến từ phương trình: Pricing power × Distribution scale × Mix premium.

Tầng 1 — Category economics: Gia vị/mì là danh mục lý tưởng: mua lặp lại cao (nước mắm 2-3 tuần/lần), giá trị đơn vị nhỏ (không ai so giá kỹ chai nước mắm như so giá TV), khẩu vị bản địa (hàng ngoại không thay được).

Tầng 2 — Brand ladder: Nam Ngư (mass) → Chin-su (mainstream) → Chin-su cao cấp (premium). Cùng nhà máy, cùng phân phối, giá bán chênh 2-3x → mix shift 1 điểm % = margin tăng không tốn thêm chi phí cố định.

Tầng 3 — Distribution flywheel: 300K+ điểm GT + WinCommerce 3,000 điểm MT → SKU mới phủ toàn quốc trong 4-6 tuần (đối thủ mới cần 3-5 năm).

Nhân bản được không? Cần cả 3 tầng cùng lúc — VNM có tầng 3 nhưng yếu tầng 1 (sữa bị cạnh tranh ngoại); SAB có tầng 1,3 nhưng bia bị secular headwind. → MCH là unique asset, premium P/E 20-22x là hợp lý, không phải đắt.` },
    { title: "Premiumisation — đọc đúng điểm uốn $5,000 GDP/capita", body: `Bằng chứng lịch sử khu vực:
Thái Lan vượt $5,000 (2003) → FMCG premium tăng 12-15%/năm thập kỷ sau, mass chỉ 3-4%.
TQ vượt $5,000 (2011) → cùng pattern, kéo dài 12+ năm.
VN vượt $5,000 (2025) → cửa sổ đang mở.

Cơ chế kinh tế: dưới $5,000, tăng thu nhập → mua NHIỀU hơn (volume). Trên $5,000, nhu cầu cơ bản đã đủ → tăng thu nhập chuyển sang mua TỐT hơn (value/mix). Volume ngành đi ngang nhưng giá trị ngành vẫn tăng 6-8%/năm.

Hàm ý chọn cổ phiếu:
→ Thắng: DN có brand ladder sẵn (MCH), có dòng premium đã launch (VNM Green Farm, Organic).
→ Thua: DN kẹt ở mass không có đường lên premium (bị ép giữa premium brands và hàng TQ giá rẻ).
→ Đây là thập kỷ mà 'mua FMCG' phải đổi thành 'mua premiumisation winners'.` },
    { title: "GT → MT → E-com: ai giữ được margin khi kênh dịch chuyển?", body: `Cấu trúc kênh VN đang dịch chuyển chậm nhưng chắc: GT 65-70% hiện tại → dự báo ~55% vào 2030; MT lên ~35%; e-com 10-12%.

Tác động margin theo kênh (góc nhìn nhà sản xuất):
GT: margin tốt nhất — không listing fee, quan hệ đại lý lâu năm, nhưng chi phí phục vụ cao (giao nhỏ lẻ).
MT: retailer có quyền lực — listing fee, slotting fee, khuyến mãi ép biên 3-5 điểm %. Đổi lại volume lớn và data.
E-com: phí sàn 5-12% + logistics + khuyến mãi → margin mỏng nhất, nhưng là kênh bắt buộc cho NPD và tiếp cận Gen Z.

Chiến lược thắng: sở hữu một phần kênh phân phối để không bị ép cả hai đầu.
→ MSN đi xa nhất: MCH (sản xuất) + WinCommerce (bán lẻ) = giữ margin trong hệ sinh thái thay vì nhường cho retailer ngoài.
→ Đây là lý do cấu trúc để MSN được định giá như platform, không phải tổng các công ty con.` },
  ],

  valuation: {
    method: "P/E forward là neo chính, phân tầng theo pricing power: MCH 20-22x, VNM/SAB 14-16x, chăn nuôi 8-12x mid-cycle. VNM/SAB thêm lớp dividend yield floor (giá sàn tại yield = lãi tiết kiệm +2%). MSN dùng SOTP: MCH (P/E) + WinCommerce (EV/Sales 0.4-0.6x khi break-even, re-rate lên 0.8-1x khi EBITDA dương bền) + MeatLife + net debt holding.",
    notes: [
      "PEG kiểm chứng: MCH P/E 21x / growth 14% = PEG 1.5 — chấp nhận được cho chất lượng này; vượt 2.0 là đắt.",
      "Chăn nuôi (DBC/BAF): định giá trên EPS mid-cycle, KHÔNG dùng EPS đỉnh pig cycle (bẫy tương tự Peak P/E thép).",
      "Cross-check: EV/EBITDA MCH ~13-15x vs regional peers (Indofood, Mayora) 10-14x — premium nhỏ hợp lý nhờ growth + margin cao hơn.",
    ],
    scenarios: {
      bull: "Premiumisation tăng tốc + WinCommerce EBITDA dương bền + giảm thuế TNCN kích tiêu dùng → MCH EPS +16-18%/năm, MSN SOTP re-rate 25-35%. VNM hưởng sữa bột giảm giá → margin +2 điểm %.",
      base: "Tiêu dùng phục hồi từ từ, premiumisation đúng lộ trình 2-2.5 điểm %/năm mix shift → MCH EPS +12-14%/năm, VNM/SAB đi ngang + cổ tức. Return = EPS growth + yield, ít re-rating.",
      bear: "Sức mua yếu do lãi suất cao kéo dài + hàng TQ e-com chiếm mass segment nhanh hơn dự kiến → volume ngành âm, premiumisation chậm lại. MCH vẫn tăng nhưng chậm (8-10%); DN mass-heavy giảm EPS. Nhóm FMCG vẫn outperform thị trường chung trong kịch bản này — đó là ý nghĩa 'phòng thủ'.",
    },
  },

  watchList: [
    { metric: "GDT auction (giá sữa bột)", source: "GlobalDairyTrade.co.nz", freq: "2 tuần/lần", signal: "Giảm → COGS VNM giảm → margin surprise sau 1-2 quý (độ trễ tồn kho)." },
    { metric: "Giá dầu cọ CPO + ngô/đậu CBOT", source: "Bursa Malaysia / CME", freq: "Hàng tuần", signal: "CPO tăng → áp lực COGS MCH. Ngô/đậu giảm → biên chăn nuôi cải thiện." },
    { metric: "Giá heo hơi + số liệu tái đàn", source: "Hội Chăn nuôi VN / Cục Chăn nuôi", freq: "Hàng tuần", signal: "Heo >65K = pha lãi. Tái đàn >95% mức trước dịch = tín hiệu thoát trade." },
    { metric: "SSSG WinCommerce + BHX Hà Nội", source: "MSN/MWG công bố quý", freq: "Hàng quý", signal: "WinMart SSSG >5% bền = MSN re-rate. BHX Bắc SSSG 4 quý đầu = phán quyết thesis MWG." },
    { metric: "Doanh thu bán lẻ hàng hoá (GSO)", source: "Tổng cục Thống kê", freq: "Hàng tháng", signal: "Proxy sức mua tổng thể. Tăng thực (trừ lạm phát) >7% = môi trường thuận." },
    { metric: "Chính sách thuế e-com hàng nhập giá trị nhỏ", source: "Bộ Tài chính / Hải quan", freq: "Theo sự kiện", signal: "Thực thi nghiêm = giảm threat hàng TQ giá rẻ với mass segment nội địa." },
  ],
},

// ════════════════════════════════════════════════
// DƯỢC
// ════════════════════════════════════════════════
pharma: {
  tagline: "Ngành nhân khẩu học — già hoá dân số là dòng tiền chiết khấu được, không phải kỳ vọng",
  type: "Defensive · Demographic-driven",

  positioning: {
    marketSize: "Thị trường dược VN: $2.7B (2015) → $7B (2025) → dự báo $10B (2026-27), CAGR ~10%. Chi tiêu y tế/GDP VN ~6% vs Thái Lan 8%, Nhật 11% → runway dài. Generic VN tăng 9.7%/năm (KPMG, 2024-29). Chi tiêu thuốc/đầu người ~$70/năm vs Thái $180, TQ $150 → gap = tiềm năng.",
    globalRole: "Dược toàn cầu ~$1.5 nghìn tỷ, tăng 5-7%/năm bất kể chu kỳ. Chuỗi giá trị toàn cầu phân tầng: phát minh (US/EU/Nhật, margin 30-40%) → API (TQ/Ấn Độ, margin 15-25%) → generic hoàn thiện (phân tán, margin 10-25% tuỳ GMP). VN đang leo từ 'generic thường' lên 'generic chất lượng cao EU-GMP' — mỗi bậc thang là một lần re-rate biên lợi nhuận.",
    vnPosition: "VN già hoá nhanh nhất khu vực: 12% dân số >60 tuổi hiện tại → 20% vào 2040. Mỗi người >60 tuổi chi tiêu thuốc gấp 3-5 lần người 30 tuổi → TAM tăng tự nhiên ~3-4%/năm chỉ từ nhân khẩu học, chưa tính thu nhập. VN vẫn nhập 51% giá trị thuốc → chính sách ưu tiên thuốc nội trong đấu thầu = import-substitution runway giống thép HRC nhưng bền hơn (không có 'TQ dumping' tương đương).",
    cyclePosition: "Non-cyclical về cầu. Chu kỳ riêng theo policy: Luật Dược 2024 (hiệu lực 7/2025) rút SDK từ 24-36 tháng còn 6-12 tháng = supply-side unlock cho toàn ngành. Chu kỳ GMP-capex: DHG/IMP đã có EU-GMP (harvest); DCL vừa xong 2 nhà máy (LN kế hoạch +189% 2026); TRA đang xây (catalyst 2027-28).",
    linkages: "Đầu vào: API nhập 90% từ TQ/Ấn (nhạy tỷ giá + rủi ro gián đoạn chuỗi cung ứng). Đầu ra: BHYT (76.6% ngành qua ETC — thực chất là chi tiêu công), bán lẻ OTC (nhạy thu nhập nhẹ). Gần như KHÔNG liên kết với tín dụng, lãi suất, chu kỳ BĐS → tài sản đa dạng hoá tốt nhất danh mục cùng với FMCG. Liên kết mới: FRT (bán lẻ) hưởng lợi kép từ dược + tiêm chủng.",
    keyPlayers: ["DHG — đầu ngành sản xuất, EU+Japan GMP kép, Taisho (Nhật) 51.7%, net cash, cổ tức cao", "IMP — EU-GMP, SK (Hàn) ~50%, ETC-focused, đầu tư Cát Khánh 1,500 tỷ", "DBD — ETC miền Trung-Tây Nguyên, thuần nội địa (pure play VN)", "DCL — 2 nhà máy EU-GMP mới, KH lợi nhuận +189% 2026", "FRT — Long Châu 2,517 nhà thuốc + 228 trung tâm tiêm chủng"],
  },

  valueChain: [
    { step: "API — Nguyên liệu hoạt chất (Power: TQ + Ấn Độ)", desc: "VN nhập ~90% API. TQ kiểm soát ~40% API toàn cầu, Ấn Độ ~30% (nhưng Ấn Độ lại nhập 70% nguyên liệu trung gian từ TQ). Đây là single point of failure của cả ngành — COVID 2020 đã chứng minh khi giá API tăng 30-100% trong vài tháng. DN VN chỉ quản lý được bằng tồn kho 6-12 tháng cho hoạt chất chiến lược.", margin: "API = 30-40% COGS. Nhà sản xuất API margin 15-25%" },
    { step: "Nhà máy GMP (Power: người giữ tấm vé)", desc: "Thang GMP là rào cản pháp lý được nhà nước bảo chứng: WHO-GMP → PIC/S → EU-GMP/Japan-GMP. Xây nhà máy EU-GMP: 500-1,500 tỷ + 3-5 năm (xây + audit + cấp phép). Điểm mấu chốt: chứng nhận EU-GMP phải được EU audit trực tiếp — không thể 'chạy'. Đây là moat sạch nhất TTCK VN.", margin: "Capex một lần → quyền vào nhóm thầu biên cao 10-20 năm" },
    { step: "SDK — Số đăng ký lưu hành (Power: cơ quan quản lý DAV)", desc: "Mỗi SKU thuốc cần SDK. Danh mục SDK = tài sản vô hình cốt lõi không nằm trên bảng cân đối. Luật Dược 2024 rút thời gian cấp 50-70% → DN có pipeline R&D sẵn hưởng lợi trước. Rủi ro ngược: SDK hết hạn không kịp gia hạn = doanh thu biến mất đột ngột (đã xảy ra với vài DN 2018-2021 khi DAV backlog).", margin: "SDK nhóm ETC giá trị nhất — mỗi SDK trúng thầu lớn = 20-100 tỷ DT/năm" },
    { step: "Kênh ETC — Đấu thầu bệnh viện (Power: BHYT + tiêu chí GMP)", desc: "76.6% giá trị ngành. Cấu trúc đấu thầu 5 nhóm theo GMP quyết định ai được bán giá nào: Nhóm 1 (biệt dược gốc) giá 100% → Nhóm 2 (generic EU-GMP) giá 60-80% → Nhóm 3-5 giảm dần và cạnh tranh giá khốc liệt. Người mua thực sự là BHYT (chi tiêu công) → cầu không co giãn theo kinh tế nhưng co giãn theo NGÂN SÁCH — theo dõi cân đối quỹ BHYT hàng năm.", margin: "Nhóm 2: gross 45-55%. Nhóm 4-5: gross 25-35% và giảm dần" },
    { step: "Kênh OTC — Nhà thuốc & Chuỗi (Power: đang chuyển sang chuỗi)", desc: "23.4% ngành. Cấu trúc đang thay đổi nhanh: 60,000+ nhà thuốc nhỏ lẻ đang mất thị phần vào chuỗi (Long Châu 2,517 điểm, doanh thu TB 1.3 tỷ/tháng/điểm). Với nhà sản xuất: chuỗi lớn = volume lớn nhưng ép chiết khấu — quyền lực đang dịch từ nhà sản xuất sang nhà bán lẻ, giống hệt pattern FMCG với MT.", margin: "Nhà sản xuất gross 35-45% kênh OTC; chuỗi bán lẻ net margin 3-6%" },
    { step: "Dịch vụ y tế liền kề (Power: người sở hữu khách hàng)", desc: "Tiêm chủng (Long Châu 228 trung tâm), xét nghiệm, tư vấn. Mô hình một điểm chạm: nhà thuốc + tiêm chủng + xét nghiệm = own the patient relationship. Đây là bước chuyển từ 'bán sản phẩm' sang 'sở hữu khách hàng trọn đời' — recurring, data-rich, margin cao hơn bán thuốc thuần.", margin: "EBITDA 20-35%, asset-light, LTV khách hàng cao" },
  ],

  revenueModel: [
    { name: "ETC — Đấu thầu bệnh viện", vi: "Kênh 76.6% ngành, BHYT chi trả", desc: "Cầu không co giãn theo kinh tế (bệnh không chờ suy thoái qua). Cạnh tranh theo tầng GMP, không theo giá trong cùng nhóm. Chính sách ưu tiên thuốc nội đang đẩy generic VN thay thuốc nhập ở nhóm 2-3. DHG ETC ~65% DT và tăng; IMP mục tiêu >70% vào 2027.", driver: "Ngân sách BHYT · Tầng GMP · Danh mục SDK · Chính sách thuốc nội", margin: "Gross 45-55% (nhóm 2) — cao nhất và ổn định nhất ngành" },
    { name: "OTC — Bán lẻ nhà thuốc", vi: "Kênh 23.4%, cạnh tranh thương hiệu", desc: "Nhạy thu nhập nhẹ (giảm TPCN khi túi tiền eo hẹp, không giảm thuốc điều trị). Brand OTC mạnh (Panadol, Eugica, Berocca) có pricing power gần như FMCG. Threat mới: TPCN xách tay + hàng e-com không kiểm soát chất lượng cạnh tranh giá.", driver: "Thu nhập hộ gia đình · Brand awareness · Health consciousness", margin: "Gross 35-45% — cần chi marketing để duy trì" },
    { name: "Đông dược & TPCN", vi: "Traphaco, OPC — thảo dược có bằng chứng", desc: "Xu hướng 'phòng bệnh hơn chữa bệnh' của tầng lớp trung lưu. Moat = công thức độc quyền + vùng trồng dược liệu chuẩn hoá (TRA có vùng trồng riêng). Ranh giới với TPCN trôi nổi là chất lượng kiểm định — siết quản lý TPCN là tailwind cho DN bài bản.", driver: "Già hoá · Trung lưu hoá · Siết quản lý TPCN trôi nổi", margin: "Gross 30-40%" },
    { name: "Chuỗi bán lẻ dược + Tiêm chủng", vi: "Long Châu (FRT) — winner rõ nhất", desc: "Long Châu chiếm ~25-30% thị phần chuỗi nhà thuốc hiện đại và đang tăng. Kinh tế đơn vị: DT 1.3 tỷ/điểm/tháng, mục tiêu 1.5 tỷ qua cross-sell tiêm chủng (228 trung tâm) + xét nghiệm. Tiêm chủng là mảng biên cao hơn thuốc và tần suất khách quay lại đều đặn (lịch tiêm).", driver: "Tốc độ mở điểm · SSSG · Scale tiêm chủng · Chuyển dịch nhà thuốc lẻ → chuỗi", margin: "Nhà thuốc net 3-5%; tiêm chủng EBITDA 15-25%" },
  ],

  kpis: [
    { term: "GMP Tier Migration", full: "Sự dịch chuyển tầng GMP — catalyst tái định giá mạnh nhất ngành", def: "Thang: WHO-GMP → PIC/S → EU-GMP/Japan-GMP. Mỗi lần lên tầng = mở khoá nhóm đấu thầu cao hơn = biên gộp nhảy bậc (nhóm 4-5 gross ~25-35% → nhóm 2 gross ~45-55%). Đây là sự kiện tái định giá có thể dự báo trước bằng cách theo dõi tiến độ xây dựng + lịch audit.", howToRead: "Playbook: mua khi nhà máy đang xây (thị trường chưa price-in) → giữ qua giai đoạn audit → sự kiện cấp chứng nhận = re-rate. Pattern DCL: 2 nhà máy EU-GMP mới → KH lợi nhuận +189% (2026). Pattern tiếp theo: TRA đang xây EU-GMP → theo dõi tiến độ cho catalyst 2027-28.", vnContext: "Bản đồ hiện tại: DHG (EU+Japan kép — hiếm nhất), IMP (EU, đang mở rộng Cát Khánh 1,500 tỷ), DCL (2 EU-GMP vừa xong — đang harvest), DBD (WHO đang nâng), TRA (đang xây EU)." },
    { term: "ETC Mix %", full: "Tỷ trọng doanh thu kênh bệnh viện — proxy chất lượng lợi nhuận", def: "% DT từ ETC. Mix ETC tăng = chất lượng lợi nhuận tăng theo 3 chiều: biên cao hơn, cầu ổn định hơn (BHYT chi), ít chi phí marketing hơn (không cần quảng cáo cho thuốc kê đơn). Công thức tác động: ETC mix +5 điểm % ≈ gross margin +1.5-2.5 điểm %.", howToRead: "Theo dõi theo quý từ thuyết minh BCTC hoặc IR deck. DHG: ETC ~65% và tăng — LNST Q1/26 +19% dù DT chỉ tăng nhẹ chính là nhờ mix shift này. Cảnh giác chiều ngược: DN đẩy OTC bằng khuyến mãi để giữ DT = chất lượng lợi nhuận giảm dù DT đẹp.", vnContext: "IMP là pure play ETC nhất: chiến lược >70% ETC vào 2027, hưởng trọn chính sách ưu tiên thuốc nội. DHG cân bằng hơn nhờ brand OTC mạnh (Hapacol — paracetamol #1 VN)." },
    { term: "SDK Pipeline Health", full: "Sức khoẻ danh mục số đăng ký = doanh thu tương lai", def: "3 chỉ số con: (1) SDK mới cấp/năm vs SDK hết hạn — net phải dương; (2) % SDK sắp hết hạn trong 24 tháng đã nộp gia hạn; (3) số hồ sơ đang chờ DAV. Luật Dược 2024 rút thời gian cấp còn 6-12 tháng → tốc độ chuyển hoá pipeline thành doanh thu nhanh gấp 2-3 lần trước.", howToRead: "Hỏi trực tiếp tại ĐHĐCĐ: 'Bao nhiêu SDK mới dự kiến được cấp năm nay? Bao nhiêu thuộc nhóm ETC?' DN có sẵn câu trả lời chi tiết = quản trị pipeline tốt. Sự kiện SDK cho sản phẩm ETC lớn = mini-catalyst có thể định lượng (mỗi SDK trúng thầu tốt = 20-100 tỷ DT/năm).", vnContext: "Luật Dược 2024 là supply-side reform lớn nhất ngành 20 năm — nhưng lợi ích KHÔNG chia đều: DN có sẵn pipeline R&D + đội đăng ký mạnh (DHG, IMP) chuyển hoá nhanh; DN nhỏ không có pipeline thì luật nhanh cũng vô nghĩa." },
    { term: "Bidding Win Rate", full: "Tỷ lệ trúng thầu bệnh viện — thị phần ETC thực tế", def: "Kết quả đấu thầu tập trung (quốc gia + địa phương) công bố công khai trên Báo đấu thầu. Win rate + giá trúng thầu bình quân cho biết vị thế cạnh tranh thực của từng DN trong từng nhóm thuốc — dữ liệu này dẫn trước doanh thu ETC 2-4 quý.", howToRead: "Theo dõi các gói thầu lớn (>100 tỷ). DN trúng chuỗi gói lớn liên tiếp = doanh thu ETC được đảm bảo 1-2 năm. Giá trúng thầu giảm dần qua các kỳ = cạnh tranh trong nhóm tăng (ví dụ khi nhiều DN cùng đạt EU-GMP, nhóm 2 sẽ đông dần → biên giảm dần từ từ).", vnContext: "Rủi ro dài hạn của chính thesis GMP: khi 5-7 DN VN đều có EU-GMP (2028+), nhóm 2 sẽ cạnh tranh giá như nhóm 3 hiện nay. Lợi thế người đi trước (DHG, IMP) là 3-5 năm harvest trước khi nhóm đông lên — định giá phải tính vòng đời moat này." },
    { term: "Long Châu Unit Economics", full: "Kinh tế đơn vị chuỗi nhà thuốc — mô hình FRT", def: "Doanh thu/điểm/tháng (1.3 tỷ hiện tại → mục tiêu 1.5 tỷ) × biên gộp (~23-25%) − chi phí điểm (thuê, nhân sự, điện) = lợi nhuận/điểm. Payback period mỗi điểm mở mới ~18-24 tháng. Tiêm chủng: doanh thu/trung tâm thấp hơn nhưng biên gấp 3-4 lần bán thuốc.", howToRead: "Ba số phải theo dõi cùng nhau: tốc độ mở điểm (tăng trưởng ngang) + doanh thu/điểm (tăng trưởng sâu) + tỷ trọng tiêm chủng/dịch vụ (tăng trưởng biên). FRT tăng cả 3 = mô hình compound. Chỉ tăng số điểm mà DT/điểm giảm = pha loãng chất lượng.", vnContext: "Long Châu 2,517 điểm + 228 tiêm chủng (Q1/26). Thị trường nhà thuốc lẻ còn ~55,000 điểm chưa chuỗi hoá → runway mở điểm còn dài. Tiêm chủng cạnh tranh trực tiếp VNVC — theo dõi tốc độ mở tương quan." },
    { term: "API Cost Exposure", full: "Độ nhạy chi phí nguyên liệu nhập khẩu", def: "API = 30-40% COGS, nhập 90% từ TQ/Ấn. Hai lớp rủi ro: giá (API tăng khi TQ siết môi trường hoặc gián đoạn) và tỷ giá (thanh toán USD). DN ETC nhóm 1-2 chuyển giá được qua kỳ đấu thầu sau (độ trễ 6-12 tháng); DN OTC chuyển giá nhanh hơn nhưng ảnh hưởng volume.", howToRead: "Kiểm tra thuyết minh BCTC: tồn kho nguyên liệu bao nhiêu tháng (6-12 tháng cho hoạt chất chiến lược là chuẩn tốt). Giai đoạn API tăng giá: quý 1-2 đầu margin bị nén (dùng tồn kho giá mới) → hồi phục khi giá đấu thầu mới phản ánh. Đọc margin ngành dược phải nhớ độ trễ này.", vnContext: "Rủi ro đuôi (tail risk): TQ hạn chế xuất API vì lý do địa chính trị → cả ngành dược VN gián đoạn. Xác suất thấp nhưng tác động lớn. Chiến lược 'tự chủ API' của VN mới ở giai đoạn quy hoạch — chưa có giải pháp thực trong 5 năm tới." },
  ],

  economics: [
    { title: "Kinh tế học đấu thầu 5 nhóm — bản đồ lợi nhuận toàn ngành", body: `Toàn bộ cấu trúc lợi nhuận ngành dược VN nằm trong bảng phân nhóm đấu thầu:

Nhóm 1 — Biệt dược gốc (nhập khẩu): giá tham chiếu 100%, không có đối thủ generic trong nhóm. Đây là 51% giá trị thuốc VN đang chảy ra nước ngoài.
Nhóm 2 — Generic EU-GMP/Japan-GMP: giá 60-80% biệt dược. DHG, IMP, DCL. Ít đối thủ (5-7 DN VN đạt chuẩn) → cạnh tranh ôn hoà → gross 45-55%.
Nhóm 3 — Generic PIC/S: giá 40-60%. Đông hơn → cạnh tranh giá bắt đầu gắt.
Nhóm 4-5 — WHO-GMP trở xuống: giá 25-45%. Đấu giá thuần — ai rẻ nhất thắng → gross 25-35% và bị bào mòn dần.

Hai dòng chảy giá trị đang diễn ra đồng thời:
1. Import-substitution: chính sách ưu tiên thuốc nội đẩy generic VN nhóm 2 thay dần biệt dược nhóm 1 ở các hoạt chất hết patent → TAM nhóm 2 mở rộng.
2. Tier migration: DN VN leo từ nhóm 3-4 lên nhóm 2 → biên nhảy bậc.

→ Cả hai dòng cùng có lợi cho DN đã ở nhóm 2. Đây là lý do cấu trúc để DHG/IMP được định giá premium so với DN dược nhóm dưới — và premium này sẽ duy trì đến khi nhóm 2 trở nên đông đúc (~2028+).` },
    { title: "Định giá vòng đời moat GMP — khi nào premium biến mất?", body: `Moat GMP không vĩnh viễn — nó có vòng đời có thể ước lượng:

Giai đoạn 1 (hiện tại → 2028): 5-7 DN VN có EU-GMP. Nhóm 2 ít đối thủ, biên 45-55% được bảo vệ. DN trong nhóm harvest trọn.
Giai đoạn 2 (2028-2032): thêm 5-10 DN đạt EU-GMP (làn sóng đầu tư đang diễn ra). Nhóm 2 đông dần → cạnh tranh giá xuất hiện → biên giảm về 38-45%.
Giai đoạn 3 (sau 2032): nhóm 2 trở thành 'nhóm 3 mới'. Moat dịch lên tầng tiếp theo: biosimilar, thuốc đặc trị, xuất khẩu EU.

Hàm ý định giá: DCF cho DHG/IMP nên dùng biên cao trong 5-7 năm rồi fade dần — KHÔNG extrapolate biên hiện tại vĩnh viễn.

Ai thắng giai đoạn 3? DN đang đầu tư vượt lên trước hôm nay: IMP với Cát Khánh 1,500 tỷ nhắm xuất khẩu EU — nếu thành công, đó là tầng moat mới mà chưa DN VN nào chạm tới.` },
    { title: "FRT/Long Châu — đọc như platform, không phải nhà thuốc", body: `Sai lầm phổ biến: định giá Long Châu như chuỗi bán lẻ biên mỏng. Đúng hơn: đây là healthcare platform đang xây dựng.

Lớp 1 — Nhà thuốc (hiện tại): 2,517 điểm, DT 1.3 tỷ/điểm/tháng, net margin 3-5%. Đây là lớp acquisition — mua khách hàng bằng nhu cầu thuốc.
Lớp 2 — Tiêm chủng (đang scale): 228 trung tâm. Biên gấp 3-4 lần thuốc, khách quay lại theo lịch tiêm định kỳ = recurring có thể dự báo.
Lớp 3 — Dịch vụ y tế mở rộng (tương lai): xét nghiệm, tư vấn từ xa, quản lý bệnh mãn tính. Mỗi khách hàng mãn tính (tiểu đường, huyết áp) = LTV hàng chục triệu đồng/năm, kéo dài hàng chục năm.

Nhân khẩu học làm lớp 3 gần như chắc chắn: 12% → 20% dân số >60 tuổi (2040), bệnh mãn tính tăng theo — người mua thuốc huyết áp hàng tháng tại Long Châu hôm nay là khách hàng 20 năm.

→ Câu hỏi định giá đúng cho FRT: không phải 'P/E chuỗi nhà thuốc bao nhiêu' mà 'giá trị của 15-20 triệu mối quan hệ khách hàng y tế đang được xây là bao nhiêu'.` },
  ],

  valuation: {
    method: "P/E forward phân tầng theo GMP + ETC mix: nhóm EU-GMP ETC-heavy (DHG, IMP) 15-18x; nhóm đang chuyển tầng (DCL, TRA) 12-15x + option value sự kiện GMP; nhóm WHO-GMP thuần 8-12x. DCF phù hợp vì dòng tiền dự báo được — nhưng phải fade biên sau 2028 (vòng đời moat). FRT/Long Châu: EV/Sales 0.8-1.2x cho mảng nhà thuốc + định giá riêng tiêm chủng theo EV/EBITDA 12-15x.",
    notes: [
      "Sự kiện tái định giá mạnh nhất: cấp chứng nhận EU-GMP mới (playbook DCL +189% KH lợi nhuận). Mua trước sự kiện 12-18 tháng khi nhà máy đang xây.",
      "Net cash check: DHG gần như không nợ + tiền mặt lớn → P/E thực (trừ tiền) thấp hơn P/E danh nghĩa 2-3x. Điều chỉnh trước khi so sánh.",
      "Cẩn trọng ngoại hoá: DHG (Taisho 51.7%) và IMP (SK ~50%) — thanh khoản cổ phiếu thấp dần khi cổ đông chiến lược gom, và khả năng thoái niêm yết (delisting) là tail risk hai chiều với cổ đông nhỏ.",
    ],
    scenarios: {
      bull: "BHYT mở rộng danh mục + ưu tiên thuốc nội thực thi mạnh + Luật Dược tăng tốc SDK → DT ETC nhóm 2 tăng 15-20%/năm. DHG/IMP EPS +15-18%/năm, re-rate P/E lên 18-20x. FRT: tiêm chủng scale nhanh → re-rate như healthcare platform.",
      base: "Ngành tăng 10%/năm theo quán tính nhân khẩu học. DHG/IMP EPS +10-13%/năm, P/E giữ 15-17x. Return đến từ EPS growth + cổ tức 3-5% — ổn định, ít drama. Đây là 'sleep-well allocation' của danh mục.",
      bear: "Ngân sách BHYT căng thẳng → ép giá đấu thầu mạnh + nhiều DN cùng đạt EU-GMP sớm hơn dự kiến → biên nhóm 2 giảm nhanh. EPS đi ngang. Downside giá cổ phiếu hạn chế (-10-15%) nhờ cổ tức + net cash — đây là ngành có bear case 'nông' nhất trong 6 ngành.",
    },
  },

  watchList: [
    { metric: "Kết quả đấu thầu tập trung (gói >100 tỷ)", source: "Báo đấu thầu / Sở Y tế", freq: "Hàng quý", signal: "Trúng chuỗi gói lớn = DT ETC đảm bảo 1-2 năm. Giá trúng giảm dần = cạnh tranh nhóm tăng." },
    { metric: "Chứng nhận GMP mới được cấp / lịch audit EU", source: "DAV / công bố DN", freq: "Theo sự kiện", signal: "EU-GMP mới = catalyst tái định giá mạnh nhất ngành (playbook DCL)." },
    { metric: "SDK mới cấp theo quý (DAV)", source: "DAV bulletin", freq: "Hàng quý", signal: "Tốc độ cấp tăng sau Luật Dược 2024 = kiểm chứng supply-side reform đang chạy." },
    { metric: "Cân đối quỹ BHYT + danh mục thuốc BHYT", source: "BHXH VN / Bộ Y tế", freq: "Hàng năm", signal: "Quỹ thặng dư + danh mục mở rộng = TAM ETC tăng. Quỹ căng = rủi ro ép giá thầu." },
    { metric: "Số điểm Long Châu + trung tâm tiêm chủng mở mới", source: "FRT công bố tháng/quý", freq: "Hàng tháng", signal: "Tốc độ mở + DT/điểm + tỷ trọng tiêm chủng — 3 số đọc cùng nhau." },
    { metric: "Giá API + chính sách xuất khẩu API của TQ", source: "Market intel / tin ngành", freq: "Hàng quý", signal: "API tăng → margin nén 1-2 quý (độ trễ). TQ siết xuất = tail risk toàn ngành." },
  ],
},

// ════════════════════════════════════════════════
// NĂNG LƯỢNG
// ════════════════════════════════════════════════
energy: {
  tagline: "Ngành hạ tầng chính sách — $136B QHĐ8 là mandate quốc gia, DPPA là cuộc cách mạng doanh thu",
  type: "Infrastructure · Policy-driven",

  positioning: {
    marketSize: "QHĐ8Đ (QĐ 768, 4/2025): tổng đầu tư nguồn + lưới 2026-2030 = $136.3B (~$27B/năm — bằng 6% GDP mỗi năm). Mục tiêu NLTT 47% cơ cấu nguồn vào 2030. Nhu cầu điện tăng 12-15%/năm để nuôi GDP 10%. Vốn tư nhân chiếm 70% kế hoạch → đây là lần đầu tiên khu vực tư nhân được trao vai chính trong hạ tầng năng lượng quốc gia.",
    globalRole: "Chi phí điện mặt trời giảm >90% (2010-2025), điện gió >65%, pin BESS >85% — NLTT đã rẻ hơn nhiệt điện mới xây ở hầu hết thị trường. Transition toàn cầu không còn là câu chuyện chính sách mà là kinh tế thuần tuý. VN nằm trong vành đai bức xạ tốt (miền Trung-Nam) + gió ven biển mạnh → tài nguyên thuộc nhóm tốt nhất ĐNA.",
    vnPosition: "VN có bài học xương máu: thiếu điện miền Bắc 2023 (cắt điện luân phiên) làm mất ~$1.4B GDP theo World Bank → quyết tâm chính trị 'không lặp lại' là có thật. Đồng thời áp lực từ phía cầu: FDI thế hệ mới (bán dẫn, data center) yêu cầu điện sạch + ổn định tuyệt đối — thiếu điện sạch = mất FDI. Điện không còn là ngành tiện ích buồn tẻ mà là điều kiện cạnh tranh quốc gia.",
    cyclePosition: "Đầu chu kỳ đầu tư mới (build phase 2026-2030). DPPA vừa vận hành thực tế (GEG Đức Huệ 2 là dự án đầu tiên) — nếu IRR chứng minh được, cả ngành NLTT tư nhân sẽ re-rate. ENSO: La Niña thuận lợi cho thủy điện đang suy yếu, El Niño có thể quay H2/2026 → rotation nhiệt điện đang đến gần.",
    linkages: "Đầu vào: thiết bị NLTT nhập (pin mặt trời, turbine — nhạy tỷ giá + giá hàng hoá), vốn vay dài hạn (nhạy lãi suất NHẤT trong 6 ngành do D/E cao). Đầu ra: EVN (PPA) hoặc FDI/KCN (DPPA). Liên kết chéo: KCN cần điện sạch để hút FDI (RE100) → điện NLTT và BĐS KCN là cặp cộng sinh; PC1 hưởng lợi từ capex của chính các DN phát điện khác (EPC).",
    keyPlayers: ["REE — danh mục đa dạng (thủy+gió+mặt trời+nước+BĐS), D/E thấp nhất, phòng thủ", "GEG — NLTT thuần, pioneer DPPA+BESS (Đức Huệ 2), beta chính sách cao", "HDG — thủy điện + gió + KCN, cân bằng, quản trị tốt", "PC1 — EPC điện #1 + thủy điện nhỏ + BĐS KCN, backlog 8,000 tỷ", "POW/NT2 — nhiệt điện khí, hedge El Niño, NT2 là dividend play hậu khấu hao"],
  },

  valueChain: [
    { step: "Phát triển dự án (Power: người có quan hệ + đất)", desc: "Xin chấp thuận chủ trương, quy hoạch đấu nối, đánh giá tài nguyên. Mất 2-5 năm — bottleneck lớn nhất VN. Giá trị vô hình: pipeline dự án đã có chấp thuận là tài sản chưa được định giá đúng trên sổ sách. Khi khung giá tốt, pipeline này chuyển hoá thành NPV dương ngay lập tức.", margin: "Dự án được duyệt = option value; thị trường thường định giá bằng 0 cho đến khi khởi công" },
    { step: "EPC — Xây dựng (Power: người có năng lực thi công điện)", desc: "PC1, TV2 dẫn đầu. Rào cản: năng lực thi công đường dây 500kV, trạm biến áp, điện gió trên biển gần bờ — không nhiều nhà thầu VN làm được. Backlog PC1 8,000 tỷ = doanh thu nhìn thấy trước ~2 năm. EPC là cách chơi ngành điện KHÔNG chịu rủi ro giá điện, thủy văn, lãi suất dự án.", margin: "Net margin 6-10% — thấp nhưng ít rủi ro, quay vòng vốn nhanh" },
    { step: "Vận hành phát điện (Power: người nắm PPA/DPPA tốt)", desc: "Sau COD: doanh thu = sản lượng × giá hợp đồng. Chi phí vận hành NLTT rất thấp (5-15% DT) → EBITDA margin 60-70%. Chất lượng hợp đồng quyết định tất cả: FIT cũ ($0.085) > DPPA ($0.08-0.10) > khung giá mới > giá chuyển tiếp. Danh mục dự án FIT cũ là tài sản quý (giá khoá 20 năm).", margin: "EBITDA 60-70% · EPS bị nén bởi khấu hao + lãi vay giai đoạn đầu" },
    { step: "Truyền tải (Power: nhà nước — nút thắt vật lý)", desc: "EVNNPT độc quyền lưới. Nghẽn lưới khiến nhiều nhà máy NLTT miền Trung bị cắt giảm công suất (curtailment) 5-15% những năm cao điểm — rủi ro doanh thu nằm ngoài kiểm soát DN. QHĐ8 chi $3.6B/năm cho lưới; Luật Điện lực mới cho tư nhân tham gia truyền tải — theo dõi ai được làm thí điểm.", margin: "Curtailment = mất doanh thu trực tiếp; giảm dần khi lưới được đầu tư" },
    { step: "Bán điện — EVN vs DPPA (Power: đang dịch chuyển lịch sử)", desc: "Mô hình cũ: EVN độc quyền mua (single buyer) — rủi ro chậm thanh toán 6-12 tháng từng xảy ra với RE receivables. DPPA (2024+): bán thẳng FDI/KCN — giá cao hơn 40-80%, thanh toán nhanh hơn, tín nhiệm người mua tốt hơn. Đây là lần chuyển giao quyền lực lớn nhất lịch sử ngành điện VN: từ người mua độc quyền sang thị trường.", margin: "DPPA premium 40-80% vs PPA — thay đổi hẳn IRR dự án" },
    { step: "BESS + Thị trường điện cạnh tranh (Power: tương lai)", desc: "BESS biến NLTT gián đoạn thành nguồn 'firm' — mở khoá giá DPPA trần (~1,130đ/kWh nhóm mặt trời+lưu trữ). Giá pin LFP giảm về $120-150/kWh làm IRR BESS bắt đầu dương. CGM bán lẻ cạnh tranh (2028-30): tư nhân bán điện đến hộ tiêu dùng — toàn ngành sẽ được định giá lại như utilities thị trường tự do.", margin: "BESS: chuyển giá bán từ ~800đ lên ~1,130đ/kWh — game changer đơn vị kinh tế" },
  ],

  revenueModel: [
    { name: "Điện mặt trời + BESS (mô hình mới)", vi: "Solar PV + Battery — DPPA premium play", desc: "Solar thuần: giá thấp, bị curtail, phụ thuộc EVN. Solar+BESS+DPPA: bán FDI giá gần trần 1,130đ/kWh, cam kết sản lượng firm. GEG Đức Huệ 2 (49MWp, COD Q2/2026) là proof-of-concept quốc gia — IRR thực tế của dự án này sẽ quyết định tốc độ nhân rộng toàn ngành.", driver: "Giá pin BESS · Khung DPPA · FDI RE100 demand · Chi phí vốn", margin: "EBITDA 60-70% · IRR mục tiêu 12-15% với DPPA vs 8-10% PPA cũ" },
    { name: "Điện gió trên bờ & gần bờ", vi: "Onshore + Nearshore wind", desc: "Khung giá 2025 cao hơn giá chuyển tiếp 14-23% — đủ để tái khởi động đầu tư sau 3 năm đóng băng. CF gió VN 30-40% (tốt nhất miền Trung-Tây Nguyên + ven biển Nam Bộ). Gió bổ trợ mặt trời (gió mạnh ban đêm) → danh mục kết hợp mặt trời+gió+BESS = firm profile tốt nhất.", driver: "Khung giá gió 2025 · Đấu thầu chọn nhà đầu tư · Chi phí turbine", margin: "EBITDA 55-65% · Capex $1.2-1.5M/MW" },
    { name: "Thủy điện (tài sản đã khấu hao)", vi: "Hydro — cash cow theo ENSO", desc: "Không xây mới được nhiều (sông đã khai thác hết) → giá trị nằm ở danh mục hiện hữu đã khấu hao phần lớn: chi phí biên gần 0, EBITDA margin 70-80% khi nước tốt. REE nắm danh mục thủy điện tư nhân lớn nhất. Rủi ro duy nhất: ENSO — El Niño làm CF giảm 20-40%.", driver: "ENSO cycle · Giá thị trường điện cạnh tranh (CGM) giờ cao điểm", margin: "EBITDA 70-80% La Niña · giảm mạnh El Niño — biến động ±30% LNST" },
    { name: "EPC + hạ tầng điện", vi: "PC1, TV2 — bán cuốc xẻng trong cơn sốt vàng", desc: "PC1 2025: DT 13,085 tỷ (+30%), LNST 1,050 tỷ (163% KH), backlog 8,000 tỷ. QHĐ8 pipeline $27B/năm — PC1/TV2 chỉ cần 3-5% thị phần = tăng trưởng backlog nhiều năm. Không chịu rủi ro giá điện/thủy văn — đây là 'pick and shovel play' của ngành.", driver: "QHĐ8 giải ngân thực tế · Hợp đồng 500kV + điện gió · Cạnh tranh thầu", margin: "Net 6-10% · ROE cao nhờ quay vòng vốn nhanh" },
  ],

  kpis: [
    { term: "IRR dự án & Giá hợp đồng", full: "Internal Rate of Return — thước đo sống còn của từng dự án", def: "IRR dự án = suất sinh lời nội bộ trên vốn đầu tư, quyết định bởi: giá bán điện (quan trọng nhất) + CF thực tế + capex/MW + chi phí vốn. Ngưỡng đầu tư hợp lý: IRR ≥ chi phí vốn +3-4 điểm % (hiện tại: ≥12-14% với lãi vay ~9-10%).", howToRead: "So sánh IRR theo loại hợp đồng: FIT cũ ~15-18% (đã hết), giá chuyển tiếp ~7-9% (nhiều dự án dưới ngưỡng — lý do đóng băng đầu tư 2022-24), khung giá 2025 ~10-12%, DPPA+BESS mục tiêu 12-15%. DN công bố ký DPPA giá tốt = NPV dương ngay được nhìn thấy → mini re-rate.", vnContext: "GEG Đức Huệ 2 là benchmark IRR quốc gia cho mô hình DPPA+BESS. Nếu báo cáo sau 2-4 quý vận hành xác nhận IRR >12% → cả ngành có template nhân rộng → REE/HDG sẽ theo → sóng đầu tư mới 2027-2028." },
    { term: "COD Pipeline Value", full: "Giá trị pipeline dự án theo giai đoạn — nhìn EBITDA 3 năm trước", def: "Xếp dự án theo giai đoạn: đã COD (đang thu tiền) → đang xây (COD 1-2 năm) → đã duyệt chưa khởi công (option) → đang xin (giấc mơ). EBITDA tương lai = Σ [công suất × CF × giá hợp đồng × 8,760h] các dự án sắp COD. Đây là mô hình dự báo chính xác nhất cho DN phát điện.", howToRead: "Chỉ tính chắc chắn các dự án đang xây có hợp đồng bán điện đã ký. Dự án 'đã duyệt' định giá như option (30-50% giá trị đầy đủ). GEG: Đức Huệ 2 COD Q2/26. PC1: Bảo Lạc A + Thượng Hà (43MW) COD cuối 2026 = +25% công suất thủy điện.", vnContext: "Khác biệt then chốt với ngành khác: EBITDA ngành điện nhìn thấy trước 2-3 năm qua pipeline — ít bất định hơn nhiều so với dự báo EPS ngân hàng hay thép. Điều bất định là tiến độ (delay COD) chứ không phải cầu." },
    { term: "ENSO Rotation Signal", full: "El Niño/La Niña — chiến lược xoay vòng trong ngành", def: "La Niña: mưa nhiều → thủy điện CF cao → REE/GEG/HDG lãi lớn; nhiệt điện bị giảm huy động. El Niño: ngược lại — thủy điện hụt, EVN huy động nhiệt điện khí/than giá cao → POW/NT2/PGV hưởng lợi. NOAA dự báo trước 3-6 tháng với độ tin cậy khá.", howToRead: "Chiến lược rotation: NOAA xác nhận chuyển pha ENSO → xoay tỷ trọng trong nhóm điện trước 1-2 quý. Lịch sử 3 chu kỳ gần nhất: pattern này đúng ~70-80%. Hiện tại: La Niña suy yếu, El Niño có thể về H2/2026 → thời điểm cân nhắc tăng POW/NT2, giảm bớt tỷ trọng thủy điện thuần.", vnContext: "REE ít nhạy hơn GEG với ENSO nhờ danh mục đa dạng (thủy + gió + mặt trời + nước sạch + BĐS). NT2 có thêm câu chuyện riêng: hậu khấu hao → dividend yield >10% — giữ được qua cả hai pha ENSO." },
    { term: "D/E + DSCR + FX Exposure", full: "Bộ ba sức khoẻ tài chính — ngành nhạy lãi suất nhất", def: "D/E 2-3x là bình thường cho dự án điện (vay 70-80% capex, kỳ hạn 15-20 năm). DSCR = EBITDA/(gốc+lãi phải trả) ≥1.2x là an toàn. Lớp rủi ro thứ ba: vay USD (lãi thấp hơn nhưng lỗ tỷ giá khi VND mất giá) vs vay VND (lãi cao hơn nhưng không rủi ro FX).", howToRead: "Môi trường lãi suất tăng từ Q3/2025: mỗi +1 điểm % lãi vay ăn ~5-10% EPS của DN D/E cao. Xếp hạng an toàn hiện tại: REE > HDG > PC1 > GEG. Kiểm tra thuyết minh nợ vay: tỷ trọng lãi suất cố định vs thả nổi, VND vs USD — hai dòng này quyết định độ nhạy thực.", vnContext: "Nghịch lý đầu tư ngành điện 2026: người thắng chưa chắc là người có nhiều dự án nhất, mà là người có cấu trúc vốn sống sót qua chu kỳ lãi suất cao để còn đứng đó khi lãi suất giảm. REE là 'phòng thủ trong tấn công' vì lý do này." },
    { term: "EVN Receivables", full: "Khoản phải thu từ EVN — rủi ro dòng tiền đặc thù", def: "EVN là người mua duy nhất theo PPA cũ. Lịch sử: giai đoạn EVN lỗ lớn (2022-23), thanh toán cho nhà máy NLTT chậm 6-12 tháng → DN phát điện có lợi nhuận kế toán đẹp nhưng dòng tiền âm. Đọc 'phải thu khách hàng' trong BCTC quan trọng ngang đọc doanh thu.", howToRead: "Phải thu/doanh thu quý >150% và tăng dần = cảnh báo dòng tiền. Giảm dần = EVN đang trả nợ (tín hiệu tốt, thường đi cùng EVN được tăng giá điện bán lẻ). DPPA giải quyết tận gốc vấn đề này — thêm một lý do premium cho DN chuyển dịch DPPA sớm.", vnContext: "EVN được tăng giá điện bán lẻ các đợt 2023-2025 → tài chính cải thiện → RE receivables đang được thanh toán tốt hơn. Nhưng cấu trúc single-buyer vẫn là rủi ro hệ thống cho đến khi CGM bán lẻ vận hành đầy đủ (2028+)." },
    { term: "End-of-Depreciation Catalyst", full: "Cú nhảy EPS khi hết khấu hao — catalyst có thể tính trước", def: "Nhà máy điện khấu hao 15-25 năm. Khi khấu hao kết thúc (và nợ đã trả xong): chi phí kế toán giảm đột ngột → EPS nhảy vọt dù hoạt động không đổi → dividend capacity tăng mạnh. Đây là catalyst CÓ THỂ TÍNH TRƯỚC từ thuyết minh tài sản cố định.", howToRead: "Đọc thuyết minh BCTC: nguyên giá vs khấu hao lũy kế từng nhà máy → tính năm hết khấu hao. NT2 là ví dụ hoàn chỉnh: hết khấu hao + hết nợ → dividend yield >10%. Săn các nhà máy sắp đến điểm này 1-2 năm trước — thị trường thường chỉ nhận ra khi EPS đã nhảy.", vnContext: "Danh mục thủy điện REE nhiều nhà máy đã/sắp hết khấu hao — dòng tiền tự do thực của REE cao hơn đáng kể lợi nhuận kế toán thể hiện. Đây là hidden value kinh điển của ngành điện mà P/E screening không bao giờ bắt được." },
  ],

  economics: [
    { title: "DPPA — định lượng cuộc cách mạng: từ 8% lên 13% IRR", body: `So sánh đơn vị kinh tế một dự án solar 50MWp điển hình:

Mô hình cũ (PPA chuyển tiếp EVN):
Giá bán ~750đ/kWh · CF 19% · Doanh thu ~62 tỷ/năm
Rủi ro: curtailment + EVN chậm thanh toán → IRR ~7-9% — DƯỚI chi phí vốn → không ai đầu tư (đây chính là lý do ngành đóng băng 2022-24).

Mô hình mới (DPPA + BESS):
Giá bán ~1,130đ/kWh (trần nhóm có lưu trữ) · cam kết firm cho FDI
Doanh thu ~93 tỷ/năm (+50%) · trừ chi phí BESS tăng thêm
→ IRR ~12-15% — TRÊN chi phí vốn → đầu tư trở lại có lý.

Cầu DPPA là thật và cấu trúc: các tập đoàn RE100 (Apple, Samsung, Nike, LEGO) yêu cầu nhà cung cấp tại VN dùng điện tái tạo — không có điện sạch = mất đơn hàng. Đây là cầu không đàm phán được.

→ GEG Đức Huệ 2 vận hành Q2/2026 sẽ trả lời câu hỏi trị giá cả ngành: IRR thực tế có đạt như mô hình không. Theo dõi báo cáo 2-4 quý đầu của dự án này kỹ hơn bất kỳ số liệu nào khác trong ngành.` },
    { title: "Tại sao EPS ngành điện đánh lừa — và cách đọc xuyên qua nó", body: `Nhà máy điện $200M: khấu hao ~$8-10M/năm × 20 năm + lãi vay lớn giai đoạn đầu → EPS 5-7 năm đầu rất mỏng dù EBITDA margin 65%.

Hệ quả: P/E screening loại bỏ nhầm những DN điện tốt nhất (P/E trông cao) và chọn nhầm nhà máy già sắp hết đời (P/E trông thấp).

Cách đọc đúng — 3 lớp:
Lớp 1: EV/EBITDA thay P/E (chuẩn VN 7-10x, ASEAN 9-12x).
Lớp 2: Tuổi tài sản — nhà máy trẻ (EPS nén, giá trị thật cao) vs nhà máy già (EPS đẹp, sắp cần capex thay thế). Đọc từ thuyết minh khấu hao lũy kế/nguyên giá.
Lớp 3: Lịch hết khấu hao + hết nợ — điểm EPS nhảy vọt có thể tính trước (NT2 template).

→ Ngành điện là nơi hiếm hoi mà đọc kỹ thuyết minh BCTC tạo alpha thật so với người chỉ nhìn ratio màn hình.` },
    { title: "Phân bổ trong ngành điện — ma trận rủi ro × catalyst", body: `Không mua 'ngành điện' — mua đúng ô trong ma trận:

Ô 1 — Core defensive: REE. D/E thấp, danh mục đa dạng, thủy điện hết khấu hao. Giữ mọi pha. Tỷ trọng lớn nhất.
Ô 2 — Policy beta: GEG. Pioneer DPPA+BESS — nếu Đức Huệ 2 chứng minh IRR → re-rate mạnh nhất ngành; nếu không → D/E cao thành gánh nặng. High risk high reward, position nhỏ, tăng khi có bằng chứng IRR.
Ô 3 — Pick & shovel: PC1. Ăn theo capex toàn ngành qua EPC, không chịu rủi ro giá điện. Backlog là leading indicator riêng. Cách chơi QHĐ8 an toàn nhất.
Ô 4 — ENSO hedge: POW/NT2. Tăng tỷ trọng khi NOAA xác nhận El Niño (thủy điện hụt → khí được huy động). NT2 thêm dividend >10% làm đệm.
Ô 5 — Tránh: nhiệt điện than thuần (PPC...). Secular decline + carbon cost tương lai. Rẻ có lý do.

→ Danh mục điện mẫu: 40% Ô1 + 20% Ô2 + 25% Ô3 + 15% Ô4. Rebalance theo ENSO và bằng chứng DPPA.` },
  ],

  valuation: {
    method: "EV/EBITDA là neo chính (VN 7-10x, chiết khấu vs ASEAN 9-12x — gap thu hẹp khi DPPA chứng minh + CGM tiến triển). DCF cấp dự án (project-level) cộng SOTP cho DN đa dự án: mỗi nhà máy một DCF theo đời hợp đồng + giá trị pipeline như option. Nhiệt điện: P/B 0.8-1.5x. EPC (PC1): P/E 10-14x trên lợi nhuận EPC + SOTP mảng phát điện + KCN riêng.",
    notes: [
      "Không dùng P/E cho nhà phát điện trẻ — khấu hao làm nhiễu hoàn toàn (xem Kinh tế ngành).",
      "Hidden value scan: nhà máy sắp hết khấu hao (đọc thuyết minh TSCĐ) = EPS jump có thể tính trước 1-2 năm.",
      "Option value pipeline: dự án đã duyệt chưa xây định giá 30-50% NPV đầy đủ; chuyển thành 100% khi ký được DPPA/khởi công.",
    ],
    scenarios: {
      bull: "GEG Đức Huệ 2 xác nhận IRR >12% + lãi suất đạt đỉnh rồi hạ từ 2027 + CGM đúng lộ trình → sóng đầu tư NLTT mới, EV/EBITDA re-rate 9-11x (khép gap ASEAN). GEG tăng mạnh nhất; REE/HDG tăng chắc; PC1 backlog bùng nổ.",
      base: "QHĐ8 giải ngân từ từ, DPPA nhân rộng chậm nhưng chắc, lãi suất neo cao hết 2026 → EBITDA ngành tăng 10-15%/năm theo COD pipeline; định giá đi ngang. Return từ tăng trưởng EBITDA + cổ tức. PC1 và REE là hai vị thế tốt nhất kịch bản này.",
      bear: "Lãi suất cao kéo dài + VND mất giá (nợ USD phình) + El Niño gắt H2/2026 + DPPA vướng thực thi → DN D/E cao (GEG) bị nén EPS nặng; thủy điện hụt sản lượng. Trú ẩn: NT2 (dividend), PC1 (backlog vẫn chạy), REE (đa dạng + ít nợ).",
    },
  },

  watchList: [
    { metric: "KQKD 2-4 quý đầu của GEG Đức Huệ 2", source: "GEG công bố quý", freq: "Hàng quý", signal: "IRR thực tế của dự án DPPA+BESS đầu tiên = phán quyết cho cả thesis ngành." },
    { metric: "ENSO forecast (NOAA)", source: "NOAA Climate.gov", freq: "Hàng tháng", signal: "Chuyển pha El Niño được xác nhận → rotation thủy điện ↔ nhiệt điện trước 1-2 quý." },
    { metric: "DPPA contracts ký mới toàn ngành", source: "Bộ Công Thương / công bố DN", freq: "Theo sự kiện", signal: "Mỗi DPPA giá tốt được ký = NPV dương nhìn thấy được → mini re-rate DN ký." },
    { metric: "PC1/TV2 backlog ký mới theo quý", source: "BCTC / ĐHĐCĐ", freq: "Hàng quý", signal: "Ký mới > thực hiện = tăng trưởng; QHĐ8 giải ngân thật sẽ hiện ra ở đây trước tiên." },
    { metric: "Phải thu EVN trong BCTC DN phát điện", source: "BCTC quý", freq: "Hàng quý", signal: "Phải thu/DT quý >150% và tăng = cảnh báo dòng tiền; giảm = EVN khoẻ lên." },
    { metric: "Lãi suất vay dài hạn VND + tỷ giá USD/VND", source: "NHNN / thị trường", freq: "Hàng tháng", signal: "Ngành nhạy lãi suất nhất trong 6 ngành — mỗi +1 điểm % ăn 5-10% EPS nhóm D/E cao." },
  ],
},

// ════════════════════════════════════════════════
// BẤT ĐỘNG SẢN
// ════════════════════════════════════════════════
restate: {
  tagline: "Ngành định giá tài sản — RNAV là thước đo, pháp lý là moat, đòn bẩy là dao hai lưỡi",
  type: "Cyclical · Leveraged · Policy-sensitive",

  positioning: {
    marketSize: "Q1/2026: ~140,000 giao dịch BĐS/quý toàn quốc, 1,360 dự án đang triển khai (~654,000 căn). Dư nợ tín dụng BĐS 4.74 triệu tỷ đồng (25.53% tổng dư nợ hệ thống, +36.24% YoY) — BĐS là nơi hấp thụ vốn lớn nhất nền kinh tế. Giá sơ cấp: Hà Nội 128 triệu/m², HCM 112 triệu/m² — đã vượt khả năng chi trả của đại đa số lao động đô thị.",
    globalRole: "BĐS dân dụng ở nước đang đô thị hóa là 'cỗ máy chuyển hoá tiết kiệm thành tài sản cố định' — chiếm 15-25% GDP trực tiếp + gián tiếp (xây dựng, vật liệu, nội thất, tài chính). Bài học TQ 2021-2024 (Evergrande) là lời cảnh báo mà NHNN VN đang chủ động phòng ngừa bằng cách siết tín dụng BĐS TRƯỚC khi bong bóng hình thành — đau ngắn hạn, lành mạnh dài hạn.",
    vnPosition: "Đô thị hóa VN ~37% → mục tiêu 50% (2030): mỗi năm ~1-1.5 triệu người chuyển vào đô thị = cầu nhà ở thực khổng lồ. Nghịch lý hiện tại: cầu thực rất lớn nhưng lệch pha cung — 80% nguồn cung mới Hà Nội là phân khúc cao cấp trong khi cầu lớn nhất ở vừa túi tiền. NOXH (170,000 căn hoàn thành, 354,000 căn được duyệt) là nỗ lực sửa lệch pha bằng chính sách.",
    cyclePosition: "Đầu chu kỳ phục hồi CÓ CHỌN LỌC (2025-26): pháp lý tháo gỡ (tích cực) đối đầu lãi suất vay mua nhà tăng 3-4% (tiêu cực). Absorption rate suy giảm: 106% (2024) → 95% (2025) → ~50% dự án mở mới Q1/26. Không phải chu kỳ tăng đồng loạt như 2016-2018 — đây là chu kỳ của kẻ mạnh: pháp lý sạch + D/E thấp + quỹ đất giá vốn rẻ.",
    linkages: "Ngành trung tâm của mạng liên kết: hút 25.5% tín dụng hệ thống (số phận gắn với chính sách NHNN — xem primer Ngân hàng), tạo 50-55% cầu thép, kéo vật liệu xây dựng + nội thất + xây lắp. Hưởng lợi trực tiếp từ đầu tư công hạ tầng (8.3 triệu tỷ 2026-30: mỗi tuyến metro/vành đai làm tăng giá đất lân cận 10-15%/năm). NPL của ngành ngân hàng có gốc rễ lớn từ BĐS — hai ngành này phải phân tích cùng nhau.",
    keyPlayers: ["VHM — quy mô tuyệt đối #1, KH DT 250,000 tỷ 2026 (vượt cả tổng Top 6 còn lại), siêu dự án Green Paradise/Cần Giờ", "KDH — chuẩn mực chất lượng: D/E thấp nhất, biên gộp 35%, pháp lý sạch, LNST +103% Q1/26", "NLG — quỹ đất phía Nam tốt, đối tác Nhật (Hankyu, Nishi-Nippon) đồng đầu tư giảm rủi ro vốn", "DXG — hệ sinh thái phát triển + môi giới (DXS), 10 dự án chờ pháp lý cho chu kỳ 2027-31", "NVL — tái cấu trúc nợ (hoán đổi nợ-cổ phiếu), KH lợi nhuận 2026 gấp 3.26x — high risk turnaround"],
  },

  valueChain: [
    { step: "Tích lũy quỹ đất (Power: người có vốn rẻ + tầm nhìn chu kỳ)", desc: "Mua đất lúc thị trường đóng băng = nửa chiến thắng. KDH/VHM tích lũy quỹ đất giá vốn thấp từ 10-20 năm trước → biên gộp 35%+ hôm nay là phần thưởng của kỷ luật chu kỳ quá khứ. DN mua đất đỉnh chu kỳ bằng vốn vay = biên mỏng + rủi ro kép. Giá trị quỹ đất KHÔNG hiện trên sổ sách theo giá thị trường → đây là nguồn gốc của định giá RNAV.", margin: "Land cost 20-40% tổng chi phí; chênh lệch giá vốn cũ vs giá thị trường = hidden value" },
    { step: "Pháp lý dự án (Power: nhà nước — bottleneck lịch sử)", desc: "Chuỗi: QH 1/500 → chấp thuận chủ trương → định giá đất/tiền sử dụng đất → GPXD → sổ. Giai đoạn 2021-24: định giá đất là nút nghẽn số 1 (cán bộ sợ trách nhiệm). Luật Đất đai 2024 + NĐ hướng dẫn đang gỡ — nguồn cung HCM +155% YoY 2025 là bằng chứng. Dự án pháp lý sạch 100% được ngân hàng ưu tiên cho vay = moat kép.", margin: "Tiền sử dụng đất có thể chiếm 15-30% chi phí — biến số pháp lý lớn nhất" },
    { step: "Cấu trúc vốn dự án (Power: người cho vay quyết định nhịp thở)", desc: "Công thức chuẩn: vốn tự có 20-30% + vay ngân hàng 30-40% + TPDN 20-30% + presale 20-30%. Presale là vốn RẺ NHẤT (không lãi suất) → dự án bán tốt tự nuôi được mình; dự án bán chậm phải nuôi bằng nợ lãi cao → chết vì dòng tiền trước khi chết vì lỗ. NVL 2022 là case study: lợi nhuận kế toán vẫn dương khi khủng hoảng thanh khoản đã bắt đầu.", margin: "Chi phí vốn bình quân 8-12%/năm — mỗi năm dự án trễ ăn mòn 8-12% NPV" },
    { step: "Xây dựng & Bàn giao (Power: trung lập — nơi ghi nhận DT)", desc: "DT kế toán CHỈ ghi nhận khi bàn giao — không phải khi ký HĐMB hay nhận tiền. Tiền khách trả trước nằm ở 'người mua trả tiền trước' (customer advances) bên Nợ của bảng cân đối — đây là kho doanh thu tương lai đọc được trước 1-2 năm. Đọc BĐS mà bỏ qua dòng này = đọc P&L quá khứ.", margin: "Construction 40-50% chi phí; chậm bàn giao = chậm ghi nhận + phạt hợp đồng" },
    { step: "Bán hàng & Absorption (Power: người mua — đang mạnh lên)", desc: "Absorption rate = % căn bán được/căn mở bán — nhiệt kế cầu thực. Chu kỳ hiện tại: absorption giảm về ~50% cho dự án mở mới (từ 70%+) vì giá vượt khả năng chi trả + lãi vay tăng. Quyền lực đang chuyển sang người mua: chiết khấu, ân hạn gốc lãi, cam kết thuê lại xuất hiện trở lại = biên người bán bị bào.", margin: "Absorption <50% kéo dài → buộc giảm giá 5-15% hoặc trì hoãn mở bán" },
    { step: "Hậu mãi & Quản lý vận hành (Power: người giữ thương hiệu)", desc: "Quản lý toà nhà, dịch vụ cư dân — biên mỏng nhưng recurring và là bảo chứng thương hiệu cho dự án sau. VHM có hệ sinh thái dịch vụ hoàn chỉnh (trường, bệnh viện, TTTM trong đại đô thị) → bán 'phong cách sống', không chỉ bán căn hộ → premium giá 10-20% so với dự án đơn lẻ cùng vị trí.", margin: "EBITDA 15-25% recurring — nhỏ về lợi nhuận, lớn về brand equity" },
  ],

  revenueModel: [
    { name: "Căn hộ trung cấp — nhu cầu ở thực", vi: "KDH, NLG, HDC — phân khúc bền nhất", desc: "Người mua để ở, vay 50-70% giá trị. Cầu nền tảng từ đô thị hóa + hộ gia đình trẻ tách hộ. Ít đầu cơ → thanh khoản ổn định hơn qua chu kỳ. Đây là phân khúc NHNN muốn tín dụng chảy vào → được ưu ái chính sách.", driver: "Lãi suất vay mua nhà · Thu nhập đô thị · Nguồn cung vừa túi tiền (khan hiếm)", margin: "Gross 30-40% với DN đất rẻ; 18-25% với DN mua đất gần đây" },
    { name: "Cao cấp & Siêu dự án", vi: "VHM — đại đô thị, nghỉ dưỡng biển", desc: "VHM chơi cuộc chơi riêng: đại đô thị 300-1,300ha tự tạo hạ tầng + tiện ích → tự tạo giá trị đất thay vì chờ nhà nước. Người mua: tầng lớp giàu + nhà đầu tư dài hạn. KH 2026: DT 250,000 tỷ, LNST 50,000 tỷ — quy mô làm VHM là proxy của cả ngành trên sàn.", driver: "Tầng lớp giàu tăng · FTSE flows (VHM trong rổ) · Hạ tầng kết nối (Cần Giờ, vành đai)", margin: "Gross 40-55% nhờ tự tạo giá trị đất — cao nhất ngành" },
    { name: "Đất nền & Nhà phố tỉnh vệ tinh", vi: "Sóng dịch chuyển theo hạ tầng + sáp nhập tỉnh", desc: "Xu hướng cung 2026: dịch từ HCM cũ sang Bình Dương/Đồng Nai (30-35K căn nguồn cung mới phía Nam). Sáp nhập đơn vị hành chính + hạ tầng liên vùng = re-rating giá đất vùng ven. Rủi ro: đây là phân khúc đầu cơ nặng nhất — thanh khoản bốc hơi đầu tiên khi lãi suất tăng (đất nền HN đã giảm 4% Q1/26).", driver: "Tiến độ hạ tầng thực tế · Sáp nhập hành chính · Sentiment đầu cơ", margin: "Gross cao khi sóng lên, tồn kho chết vốn khi sóng xuống — high beta nhất ngành" },
    { name: "NOXH & Vừa túi tiền", vi: "Chính sách quốc gia — volume play biên thấp", desc: "170,000 căn hoàn thành, 134,000 đang xây, 354,000 được duyệt chủ trương. Biên gộp bị khống chế (~10-15%) nhưng đổi lại: đất được giao không đấu giá, tín dụng ưu đãi, cầu vô hạn ở giá này. Với DN lớn: NOXH là cách giữ bộ máy chạy + quan hệ chính quyền trong lúc chờ chu kỳ thương mại.", driver: "Gói tín dụng ưu đãi giải ngân thật · Quỹ đất 20% trong dự án thương mại · Mục tiêu 1 triệu căn", margin: "Gross 10-15% khống chế — volume và turnover là chìa khóa" },
  ],

  kpis: [
    { term: "RNAV & Discount to RNAV", full: "Revalued Net Asset Value — thước đo định giá chuẩn ngành", def: "RNAV = Σ [giá trị từng dự án theo giá thị trường hiện tại − chi phí còn lại để hoàn thành − thuế] + tài sản khác − nợ ròng. Khác P/B (dùng giá vốn sổ sách), RNAV định giá lại quỹ đất theo giá thị trường → phản ánh hidden value của đất mua rẻ 10-20 năm trước.", howToRead: "Cổ phiếu BĐS thường giao dịch ở discount so với RNAV vì rủi ro thực thi + pha loãng + chu kỳ. Khung tham chiếu VN: discount 20-30% = fair; 40-50% = vùng mua cho DN chất lượng; premium so RNAV = chỉ xảy ra đỉnh chu kỳ (bán). Lưu ý: RNAV của broker khác nhau vì giả định giá bán/tiến độ — tự xây khung giả định thận trọng hơn 10-15% so với broker.", vnContext: "P/B ngành ~1.25x được MSVN xem là điểm vào dài hạn hấp dẫn. Nhóm vốn hoá vừa (KDH, NLG, DIG, HDC) đang ở vùng chiết khấu RNAV sâu hơn nhóm lớn — phù hợp tầm nhìn 2-3 năm nếu chọn đúng DN pháp lý sạch." },
    { term: "Presale & Customer Advances", full: "Doanh số ký mới + Người mua trả tiền trước — nhìn DT trước 1-2 năm", def: "Hai chỉ số dẫn dắt cùng gốc: Presale (giá trị HĐMB ký mới trong kỳ — công bố bởi DN) và Customer Advances (số dư tiền khách đã nộp — trên bảng cân đối). Công thức dự báo thô: DT năm N+1 ≈ 50-70% customer advances cuối năm N + bàn giao dự án hoàn thành.", howToRead: "Ma trận 4 ô: Presale tăng + P&L xấu = đầu chu kỳ (MUA). Presale tăng + P&L đẹp = giữa chu kỳ (GIỮ). Presale giảm + P&L đẹp = cuối chu kỳ, đang ăn backlog cũ (CẢNH GIÁC — bẫy P/E rẻ). Presale giảm + P&L xấu = đáy (quan sát chờ đảo chiều). Đây là la bàn duy nhất đáng tin trong ngành này.", vnContext: "VHM: KH DT 250,000 tỷ 2026 dựa trên presale Green Paradise + các đại dự án — theo dõi tỷ lệ hấp thụ từng đợt mở bán để kiểm chứng. KDH: LNST +103% Q1/26 chính là bàn giao backlog presale 2024 — muốn biết KDH 2027, nhìn presale 2025-26 của họ." },
    { term: "D/E + Bond Wall", full: "Đòn bẩy + Lịch đáo hạn trái phiếu — bản đồ rủi ro thanh khoản", def: "D/E cao chưa chết ngay — chết khi nợ đáo hạn dồn cục vào lúc không đảo được (bond wall). Phân tích 2 lớp: (1) D/E tổng thể (<1x an toàn; >2x nguy hiểm); (2) lịch đáo hạn TPDN 12-24 tháng tới so với tiền mặt + dòng presale dự kiến.", howToRead: "Đọc thuyết minh nợ vay: bao nhiêu đáo hạn 2026-27? Nguồn trả từ đâu (presale dự án nào, đã bán chưa)? DN phải bán tài sản/phát hành pha loãng để trả nợ = red flag. TPDN BĐS phát hành trở lại sôi động = kênh đảo nợ đang mở — tốt cho DN yếu, nhưng theo dõi lãi suất coupon (>11-12% = thị trường vẫn đòi risk premium cao).", vnContext: "KDH: D/E thấp nhất ngành — miễn nhiễm bond wall. NVL: hoán đổi nợ-cổ phiếu = pha loãng cổ đông hiện hữu để sống — turnaround chỉ dành cho NĐT chấp nhận rủi ro cao có kỷ luật position sizing." },
    { term: "Absorption & Price/Income Gap", full: "Tỷ lệ hấp thụ + Chênh lệch giá nhà/thu nhập", def: "Absorption đo cầu ngắn hạn; Price-to-income ratio đo sức chịu đựng dài hạn. HN 128tr/m² nghĩa là căn 60m² ≈ 7.7 tỷ ≈ 25-30 năm thu nhập hộ trung vị đô thị — vượt xa ngưỡng bền vững quốc tế (5-8 năm). Gap này là trần cứng của giá: hoặc thu nhập bắt kịp (chậm), hoặc cung vừa túi tiền tăng (đang làm), hoặc thanh khoản teo (đang xảy ra).", howToRead: "Absorption <50% hai quý liên tiếp ở một phân khúc = phân khúc đó sắp phải điều chỉnh giá hoặc khuyến mãi sâu. Đọc kèm cơ cấu nguồn cung: 80% cung mới HN là cao cấp trong khi cầu ở vừa túi tiền → cao cấp sẽ ế trước. DN nào có sản phẩm đúng điểm cầu (KDH, NLG trung cấp) thoát hiểm tốt hơn.", vnContext: "Q1/26: HN 8,010 căn mở mới (cao nhất từ 2021) nhưng absorption ~50% — cung tăng đúng lúc cầu yếu vì lãi vay. Đất nền HN -4%, nhà HCM -2% so cuối 2025. Đây là giai đoạn sàng lọc: giá không sập nhưng cũng không có sóng đồng loạt." },
    { term: "Mortgage Rate Sensitivity", full: "Độ nhạy cầu với lãi suất vay mua nhà — biến số vĩ mô số 1", def: "Quy tắc ngón tay cái: lãi vay +1 điểm % → khoản trả góp hàng tháng +8-10% → sức mua giảm tương đương 8-10% giá nhà. VIS Rating dự báo lãi vay mua nhà 2026 +3-4 điểm % → sức mua danh nghĩa giảm ~25-35% — giải thích trọn vẹn absorption suy giảm dù pháp lý thuận lợi.", howToRead: "Theo dõi lãi suất vay thực tế của top 5 ngân hàng cho vay mua nhà (không phải lãi điều hành). Điểm đảo chiều của cả ngành = khi lãi vay mua nhà tạo đỉnh và giảm 2 quý liên tiếp — lịch sử 2013 và 2023 đều cho thấy cổ phiếu BĐS đáy TRƯỚC lãi suất đỉnh 1-2 quý (thị trường price-in trước).", vnContext: "Đây là biến số quyết định 2026-27: pháp lý đã gỡ (check), hạ tầng đang bơm (check), chỉ còn chờ chu kỳ lãi suất đảo. Khi NHNN có dư địa hạ lãi suất (lạm phát + tỷ giá cho phép) → BĐS là ngành hưởng lợi nhanh và mạnh nhất." },
    { term: "Landbank Quality Score", full: "Chấm điểm quỹ đất — tài sản thật đằng sau cổ phiếu", def: "3 chiều chấm: (1) Vị trí — bán kính hạ tầng hiện hữu/sắp hoàn thành; (2) Pháp lý — % quỹ đất đã nộp tiền sử dụng đất + có QH 1/500; (3) Giá vốn — chi phí đất/m² so giá thị trường hiện tại. Quỹ đất to nhưng pháp lý treo + xa hạ tầng = kho rủi ro, không phải kho giá trị.", howToRead: "Đối chiếu thuyết minh 'chi phí sản xuất kinh doanh dở dang' + 'tài sản dở dang dài hạn' với công bố dự án: dự án nào chiếm vốn lớn nhất, pháp lý đến đâu, bao giờ đủ điều kiện mở bán. DN có >70% giá trị tồn đọng ở 1-2 dự án pháp lý chưa xong = rủi ro tập trung cao.", vnContext: "Bài học sáp nhập tỉnh + hạ tầng: quỹ đất Bình Dương/Đồng Nai/Long An của VHM, NLG, KDH được re-rate khi vành đai 3 + metro nối dài. Đất 'ăn theo quy hoạch trên giấy' ở tỉnh xa không có dòng người thực = giá trị ảo — phân biệt bằng dữ liệu dân số di cư thực tế." },
  ],

  economics: [
    { title: "RNAV — dựng khung định giá 15 phút cho một DN BĐS", body: `Quy trình thực chiến (ví dụ khung cho một DN tầm trung):

Bước 1 — Liệt kê dự án: từ báo cáo thường niên + công bố. Mỗi dự án: diện tích sàn bán được (NSA) × giá bán dự kiến = tổng doanh số đời dự án.
Bước 2 — Trừ chi phí còn lại: xây dựng chưa chi + tiền sử dụng đất chưa nộp + lãi vay vốn hóa dự kiến.
Bước 3 — Trừ thuế TNDN 20% trên phần lãi.
Bước 4 — Chiết khấu về hiện tại theo tiến độ bàn giao (WACC 12-15% cho BĐS VN).
Bước 5 — Cộng tài sản khác (tiền, đầu tư) − nợ ròng = RNAV.

Sai số lớn nhất nằm ở: giả định GIÁ BÁN và TIẾN ĐỘ. Kỷ luật: dùng giá bán hiện tại (không giả định tăng giá) + tiến độ trễ hơn công bố DN 12 tháng. RNAV ra được với giả định thận trọng mà vẫn cao hơn vốn hóa 60-80% = biên an toàn thật.

Cạm bẫy: RNAV vô nghĩa với DN sắp khủng hoảng thanh khoản — tài sản không kịp chuyển thành tiền để trả nợ đáo hạn. Luôn check bond wall TRƯỚC khi tin RNAV.` },
    { title: "Chu kỳ BĐS VN 2008-2026 — nhận diện vị trí bằng lịch sử", body: `Bốn chu kỳ gần nhất và chữ ký của chúng:

2008-2013 (đóng băng dài): lãi suất 20%+, tồn kho chất núi, NPL ngân hàng đỉnh. Đáy 2013 khi gói 30,000 tỷ + lãi suất hạ mạnh.
2014-2019 (phục hồi → hưng phấn): tín dụng nới, cung bùng nổ, giá tăng đều. Đỉnh cung 2018-19.
2020-2021 (sốt cục bộ): tiền rẻ COVID + sốt đất nền tỉnh lẻ — chu kỳ đầu cơ thuần.
2022-2024 (khủng hoảng kép): siết TPDN (sự kiện Tân Hoàng Minh, Vạn Thịnh Phát) + lãi suất tăng + pháp lý tê liệt → NVL suýt đổ, cả ngành đóng băng.
2025-nay (phục hồi chọn lọc): pháp lý gỡ bằng 3 luật mới, nhưng lãi vay lại tăng → phục hồi không đồng loạt.

Điểm khác biệt cấu trúc của chu kỳ này so với 2014: NHNN chủ động siết TRƯỚC (trần tín dụng BĐS ≤ tăng trưởng chung 15%) → sẽ không có pha hưng phấn tín dụng như 2016-18 → kỳ vọng đúng là chu kỳ 'chậm mà dài', chọn cổ phiếu quan trọng hơn chọn thời điểm.` },
    { title: "Đọc bảng cân đối DN BĐS trong 5 dòng — bỏ qua P&L", body: `P&L của DN BĐS là quá khứ. Năm dòng bảng cân đối này mới là tương lai:

1. Người mua trả tiền trước (customer advances): kho DT 1-2 năm tới. Tăng = presale khỏe.
2. Hàng tồn kho + chi phí SXKD dở dang: dự án đang xây. Đối chiếu từng dự án lớn — cái nào sắp đủ điều kiện bàn giao?
3. Nợ vay + lịch đáo hạn (thuyết minh): bond wall 12-24 tháng tới vs nguồn trả.
4. Phải thu theo tiến độ HĐ: đã bàn giao chưa thu tiền — chất lượng người mua.
5. Tiền + tương đương: đệm thanh khoản qua mùa đông.

Công thức sức khỏe nhanh: (Tiền + Customer advances) / Nợ đáo hạn 12 tháng ≥ 1.5x = an toàn; <1x = phụ thuộc đảo nợ.

KDH pass mọi dòng — đó là lý do 'chậm mà chắc' của họ được thị trường trả premium. NVL fail dòng 3 năm 2022 dù P&L khi đó vẫn dương — bài học đắt nhất thập kỷ của NĐT BĐS Việt Nam.` },
  ],

  valuation: {
    method: "RNAV là neo chính: mua ở discount 40-50% cho DN chất lượng, fair ở 20-30%, thoát khi về gần RNAV/premium (đỉnh chu kỳ). P/B 1.25x ngành làm sanity check nhanh. TUYỆT ĐỐI không dùng P/E làm neo (kế toán trễ làm P/E vô nghĩa — DN bàn giao dồn năm nay P/E rẻ ảo, năm sau hết backlog). VHM thêm lớp SOTP: dân dụng + KCN (Vinhomes IZ) + hưởng lợi FTSE flows.",
    notes: [
      "Điều chỉnh RNAV theo chất lượng: pháp lý sạch 100% giữ nguyên; pháp lý dở dang chiết khấu thêm 20-40% giá trị dự án đó.",
      "Bond wall check trước RNAV: DN không qua được 18 tháng tới thì RNAV chỉ là con số trên giấy.",
      "Catalyst re-rating ngành: lãi suất vay mua nhà tạo đỉnh (lịch sử: cổ phiếu đáy trước lãi suất đỉnh 1-2 quý).",
    ],
    scenarios: {
      bull: "Lãi suất vay mua nhà đạt đỉnh cuối 2026 rồi hạ + pháp lý tiếp tục thông + FTSE flows vào VHM/KDH/DXG (trong danh sách FTSE) → absorption hồi về 70%+, discount RNAV thu hẹp từ 40-50% về 20-25% → upside 35-60% nhóm chất lượng. NVL turnaround thành công = gấp đôi từ nền thấp (xác suất thấp, không phải core position).",
      base: "Lãi suất neo cao hết 2026, phục hồi chọn lọc tiếp diễn → DN pháp lý sạch bàn giao đều (KDH, NLG, VHM tăng EPS 10-20%), DN yếu tiếp tục kẹt. Giá cổ phiếu nhóm mạnh +10-20%/năm theo EPS; nhóm yếu đi ngang/giảm. Stock-picking quyết định toàn bộ return.",
      bear: "Lãi vay tiếp tục tăng 2027 + NHNN siết mạnh hơn khi NPL BĐS lộ diện → absorption <40%, giá sơ cấp giảm 10-15%, TPDN BĐS căng lại → nhóm D/E cao gặp bond wall lần 2. KDH/VHM giảm 20-30% nhưng sống khỏe; nhóm yếu -50%+. Đây là ngành có bear case sâu nhất trong 6 ngành — position sizing phải phản ánh điều đó.",
    },
  },

  watchList: [
    { metric: "Lãi suất vay mua nhà top 5 ngân hàng", source: "Ngân hàng TM / VIS Rating", freq: "Hàng tháng", signal: "Tạo đỉnh + giảm 2 quý liên tiếp = tín hiệu đảo chiều cả ngành. Biến số số 1." },
    { metric: "Absorption rate theo phân khúc + thành phố", source: "CBRE / Savills / Bộ XD", freq: "Hàng quý", signal: "<50% hai quý liên tiếp ở một phân khúc = phân khúc đó sắp điều chỉnh giá." },
    { metric: "Presale + customer advances Top 6 DN", source: "BCTC quý + guidance", freq: "Hàng quý", signal: "Ma trận presale × P&L định vị pha chu kỳ từng DN (xem KPI)." },
    { metric: "Lịch đáo hạn TPDN BĐS + coupon phát hành mới", source: "HNX / VBMA", freq: "Hàng tháng", signal: "Coupon >11-12% = risk premium còn cao; bond wall dồn cục = soi DN liên quan." },
    { metric: "Tiến độ pháp lý các dự án lớn (tiền SDĐ, GPXD)", source: "Công bố DN / Sở địa phương", freq: "Theo sự kiện", signal: "Dự án lớn xong pháp lý = mở khóa RNAV — catalyst cấp cổ phiếu rõ nhất." },
    { metric: "Giải ngân hạ tầng trọng điểm (vành đai, metro, cao tốc)", source: "Bộ GTVT / Bộ Tài chính", freq: "Hàng quý", signal: "Tuyến hoàn thành = re-rate quỹ đất lân cận 10-15%/năm — map với landbank từng DN." },
  ],
},

// ════════════════════════════════════════════════
// CHỨNG KHOÁN
// ════════════════════════════════════════════════
broker: {
  tagline: "Ngành beta có đòn bẩy của cả thị trường — FTSE 21/9/2026 là catalyst thế hệ, tăng vốn là cuộc đua vũ trang",
  type: "High-beta · Market-correlated",

  positioning: {
    marketSize: "Thanh khoản HOSE duy trì >1 tỷ cổ phiếu/phiên. Dư nợ margin toàn thị trường hướng tới >450,000 tỷ 2026 (+15% YoY). Quy mô tăng vốn toàn ngành ~100,000 tỷ/năm — 4+ CTCK đã/sắp vượt vốn điều lệ 25,000 tỷ (ngang ngân hàng tầm trung). Nền tài khoản: ~9-10 triệu tài khoản, còn thấp so với dân số → runway phổ cập đầu tư còn dài.",
    globalRole: "CTCK là 'nhà cái thu phí' của thị trường vốn: không cần đoán đúng thị trường lên hay xuống trong dài hạn — chỉ cần thị trường LỚN LÊN và GIAO DỊCH NHIỀU. Ở thị trường mới nổi thành công (Đài Loan 1990s, TQ 2000s, Ấn Độ 2010s), vốn hóa/GDP tăng từ 30-50% lên 100%+ trong 10-15 năm — CTCK là ngành ăn trọn quá trình này qua phí + margin + IB.",
    vnPosition: "Sự kiện lịch sử đã CHÍNH THỨC: FTSE xác nhận (8/4/2026) nâng hạng VN lên Secondary Emerging Market, hiệu lực 21/9/2026. Dòng passive ~$1.3-1.5B (BSC), active 3-5B USD theo sau. VN vào cùng nhóm phân loại với TQ, Đài Loan, Ấn Độ, Brazil. Bước tiếp: MSCI Watch List 2027-28 → MSCI EM 2028-30. Vốn hóa/GDP VN ~60-70% → dư địa gấp rưỡi theo template khu vực.",
    cyclePosition: "2025 = năm lợi nhuận kỷ lục (thanh khoản đỉnh). 2026 = năm TĂNG VỐN — nhiều CTCK đặt KH lợi nhuận thận trọng (VIX -48%) vì ưu tiên xây năng lực đón chu kỳ sau nâng hạng. Nghĩa là: EPS 2026 bị pha loãng có chủ đích để ROE 2027-28 bùng nổ. Đọc sai nhịp này = bán đúng đáy của chu kỳ vốn.",
    linkages: "Beta 1.5-2x với VN-Index — CTCK là 'đòn bẩy có tổ chức' lên toàn thị trường: hưởng lợi từ MỌI ngành khác tăng (ngân hàng, BĐS, thép... tăng = volume tăng = CTCK ăn phí). Nhạy với: lãi suất (chi phí vốn margin book + dòng tiền vào/ra kênh chứng khoán), tỷ giá + Fed (dòng ngoại), pháp lý thị trường (KRX, CCP 2027, room ngoại). Đây là ngành duy nhất mà 'view vĩ mô thị trường' và 'view cổ phiếu' gần như là một.",
    keyPlayers: ["SSI — thị phần môi giới ~11.5% ổn định nhiều năm, margin book hướng 45-50K tỷ, hưởng lợi Fed hạ lãi (vay hợp vốn ngoại)", "VCI — Vietcap, mạnh IB + khách tổ chức ngoại, hưởng lợi trực tiếp dòng FTSE", "HCM — vừa tăng CSH 7,200 tỷ → room margin lớn nhất tức thời", "TCBS — vua TPDN + IB, chi phí vốn rẻ từ Techcombank, đang IPO 231M cp", "MBS/VPBankS — nhóm ngân hàng mẹ tăng thị phần nhanh nhờ vốn rẻ + cross-sell"],
  },

  valueChain: [
    { step: "Môi giới — cửa vào của khách hàng (Power: thương hiệu + công nghệ)", desc: "Zero-fee wars đã biến phí môi giới thành hàng hóa → môi giới giờ là CÔNG CỤ THU HÚT KHÁCH cho margin + wealth, không phải nguồn lợi nhuận chính. Thị phần môi giới = quy mô tệp khách để bán chéo. SSI ~11.5% ổn định; nhóm ngân hàng mẹ (TCBS, VPBankS, MBS) tăng dần nhờ cross-sell từ app ngân hàng.", margin: "Biên phí → 0; giá trị thật = customer acquisition cho margin/wealth" },
    { step: "Margin lending — cỗ máy lợi nhuận (Power: người có vốn rẻ + lớn)", desc: "Kinh tế học đơn giản: huy động 6-8% → cho vay 12-14% → spread 4-6% trên dư nợ. Trần quy định: margin ≤ 2x vốn CSH → tăng trưởng margin BẮT BUỘC đi qua tăng vốn. Đây là lý do cấu trúc của cuộc đua tăng vốn 2026: ai tăng vốn trước, người đó chiếm dư địa margin khi thanh khoản bùng sau nâng hạng.", margin: "Spread 4-6%/năm × dư nợ — nguồn LN ổn định và scale được duy nhất" },
    { step: "Tự doanh — con dao hai lưỡi (Power: kỹ năng + khẩu vị rủi ro)", desc: "Danh mục cổ phiếu/trái phiếu/CCQ của chính CTCK. Quý tốt đóng góp >30% LN; quý xấu ăn ngược vào vốn. Chất lượng tự doanh khác nhau lớn: tự doanh 'đầu tư giá trị có kỷ luật' (một phần SSI) vs 'trading theo sóng' (rủi ro cao). NĐT nên CHIẾT KHẤU lợi nhuận tự doanh khi định giá — nó không bền và không dự báo được.", margin: "Biến động vô hạn — P/E của dòng lợi nhuận này xứng đáng thấp hơn hẳn margin lending" },
    { step: "IB — tư vấn & bảo lãnh phát hành (Power: quan hệ + bảng cân đối)", desc: "IPO, phát hành thêm, bảo lãnh TPDN, M&A. Chu kỳ IB đang vào pha thuận: làn sóng IPO/chuyển sàn (Masan Consumer, TCBS, Kafi, HDBS...) + TPDN phục hồi. TCBS/VPBankS gần như duopoly mảng TPDN nhờ ngân hàng mẹ vừa phân phối vừa tạo lập. Deal lớn = 20-30% LN một quý — lumpy nhưng biên rất cao.", margin: "Biên >50% nhưng deal-dependent — định giá như dòng tiền không đều" },
    { step: "Wealth & Asset Management — tương lai của ngành (Power: người giữ AUM)", desc: "Tầng lớp trung lưu VN tích lũy tài sản → nhu cầu quản lý danh mục, quỹ mở, hưu trí tự nguyện. Fee trên AUM = recurring, không phụ thuộc volume giao dịch → dòng lợi nhuận CHẤT LƯỢNG CAO NHẤT ngành nhưng hiện còn nhỏ. CTCK nào xây được AUM lớn sẽ được re-rate từ 'môi giới chu kỳ' sang 'nền tảng tài chính' — theo template Charles Schwab.", margin: "Fee 0.5-2%/AUM recurring — P/E xứng đáng cao nhất trong các dòng doanh thu" },
    { step: "Hạ tầng thị trường — KRX, CCP, T0 (Power: nhà nước — tailwind chung)", desc: "KRX vận hành: T0 + giao dịch xuyên trưa → turnover tăng cấu trúc (VPBankS ước thanh khoản 2026 +15% từ nền cao). CCP 2027: giảm rủi ro thanh toán, gỡ nút prefunding cho NĐT ngoại — điều kiện tiến lên MSCI. Mỗi nâng cấp hạ tầng = volume tăng cho TẤT CẢ CTCK không tốn đồng capex nào của họ.", margin: "Free structural tailwind — hiếm ngành nào được nhà nước 'nâng cấp máy in tiền' hộ" },
  ],

  revenueModel: [
    { name: "Margin lending", vi: "Cho vay ký quỹ — trụ cột lợi nhuận", desc: "Toàn thị trường hướng >450,000 tỷ (+15%). Cầu mới lớn: các cổ phiếu niêm yết/chuyển sàn cuối 2025 (Masan Consumer, VIB...) đủ điều kiện cấp margin từ T4-5/2026 → nhu cầu vay mới bùng. Lợi thế nghiêng về nhóm ngân hàng mẹ (vốn rẻ, ít vướng trần nhờ cấu trúc tập đoàn).", driver: "Quy mô vốn CSH (trần 2x) · Thanh khoản thị trường · Chi phí vốn huy động", margin: "Spread 4-6% — dòng lợi nhuận đáng trả P/E cao nhất" },
    { name: "Môi giới + phí giao dịch", vi: "Brokerage — volume game thuần túy", desc: "DT ≈ thị phần × tổng giá trị GD × phí bình quân. Phí đã chạm đáy cạnh tranh → biến số duy nhất còn lại là VOLUME: KRX T0 + FTSE flows + tài khoản mới đều đẩy volume. SSI giữ ~11.5% thị phần là moat thương hiệu hiếm hoi trong ngành phí bằng 0.", driver: "GTGD bình quân/phiên · Thị phần · Tài khoản mở mới", margin: "Biên mỏng nhưng chi phí biên ~0 → volume tăng rơi thẳng xuống LN" },
    { name: "Ngân hàng đầu tư (IB)", vi: "IPO, TPDN, M&A advisory", desc: "Pha thuận chu kỳ: làn sóng IPO (TCBS 231M cp, Kafi, HDBS, OCBS) + TPDN hồi phục + nhu cầu huy động vốn của chính các CTCK khác (100,000 tỷ/năm) — CTCK làm IB cho nhau. TCBS/VPBankS duopoly TPDN; VCI mạnh deal cổ phiếu + khách ngoại.", driver: "Làn sóng IPO/niêm yết · TPDN phục hồi · Định giá thị trường đủ tốt để DN chịu phát hành", margin: "Biên >50%, lumpy — nguồn upside surprise theo quý" },
    { name: "Tự doanh + Treasury", vi: "Prop book — chiết khấu khi định giá", desc: "Danh mục tự doanh hưởng lợi beta khi VN-Index tăng vào chu kỳ nâng hạng — nhưng chính vì thế phải nhớ nó sẽ đảo chiều cùng thị trường. Kỷ luật phân tích: tách LN tự doanh khỏi LN core (margin + phí) khi so sánh CTCK — hai DN cùng LN nhưng cơ cấu khác nhau xứng đáng định giá khác nhau.", driver: "VN-Index · Lợi suất trái phiếu · Kỹ năng đội tự doanh", margin: "Không dự báo được — P/E dòng này phải thấp" },
  ],

  kpis: [
    { term: "Margin/Equity Headroom", full: "Dư địa margin so với trần 2x vốn CSH — nhiên liệu tăng trưởng", def: "Headroom = 2 × Vốn CSH − Dư nợ margin hiện tại. Đây là 'kho đạn' cho chu kỳ hậu nâng hạng: khi volume bùng, CTCK hết headroom chỉ biết đứng nhìn đối thủ cho vay. Công thức tác động LN: mỗi 10,000 tỷ margin mới × spread 5% = ~500 tỷ LN gộp thêm/năm.", howToRead: "Xếp hạng theo headroom sau đợt tăng vốn: HCM (+7,200 tỷ CSH mới) đang có dư địa tức thời lớn nhất; SSI/VPBankS xây hướng 45-50K tỷ margin. CTCK công bố kế hoạch tăng vốn = đọc là 'chuẩn bị kho đạn', không phải 'pha loãng xấu' — nhưng kiểm tra giá phát hành so thị giá để đo mức thiệt cổ đông hiện hữu.", vnContext: "2026: ≥4 CTCK vượt vốn điều lệ 25,000 tỷ. HSC huy động 5,600 tỷ; BSC mục tiêu gần nhân đôi vốn. Cuộc đua đã chuyển từ thị phần môi giới (phí = 0) sang QUY MÔ VỐN — ai nhiều vốn rẻ, người đó thắng thập kỷ tới." },
    { term: "Sensitivity: LN vs Thanh khoản", full: "Mô hình độ nhạy — định lượng beta thay vì cảm tính", def: "Ước lượng nhanh: thanh khoản +10% → phí môi giới +10% + margin book tăng theo (NĐT vay nhiều hơn khi GD nhiều) + tự doanh thuận chiều → LN core CTCK tăng ~15-25% (đòn bẩy hoạt động vì chi phí gần như cố định). Đây là gốc rễ toán học của beta 1.5-2x.", howToRead: "Xây bảng độ nhạy 3 kịch bản thanh khoản (GTGD/phiên 20K / 28K / 35K tỷ) cho từng CTCK → thấy ngay LN dao động ±40-60% giữa các kịch bản. Dùng bảng này thay vì tin KH lợi nhuận ĐHĐCĐ (vốn chỉ là một kịch bản thận trọng do DN chọn).", vnContext: "VPBankS Research: thanh khoản 2026 +15% từ nền cao 2025 nhờ KRX + nâng hạng. Nếu đúng → nhóm CTCK vượt KH lợi nhuận là gần chắc chắn — KH thận trọng (VIX -48%) tạo sẵn dư địa 'beat & re-rate' nửa cuối 2026." },
    { term: "FTSE Flow Mechanics", full: "Cơ chế 3 lớp dòng vốn nâng hạng — timeline cụ thể", def: "Lớp 1 passive ($1.3-1.5B): quỹ index BẮT BUỘC mua theo tỷ trọng, giải ngân quanh 21/9/2026 — cơ học, không phụ thuộc quan điểm. Lớp 2 active (3-5B USD): quỹ chủ động EM bắt đầu coverage VN, giải ngân 2-3 năm. Lớp 3 cấu trúc: minh bạch + hạ tầng cải thiện → MSCI Watch List 2027-28 → vòng lặp mới.", howToRead: "Timeline hành động: 21/8/2026 công bố danh sách chính thức + tỷ trọng → 21/9 hiệu lực. Cổ phiếu CTCK hưởng lợi KÉP: vừa nằm trong rổ (SSI, VCI, VND, VIX được mua trực tiếp) vừa ăn phí trên volume tăng. Cảnh giác 'sell the news' tuần quanh 21/9 — dòng passive là sự kiện đã biết trước, thị trường có thể price-in từ trước.", vnContext: "FTSE xác nhận chính thức 8/4/2026 sau khi Thông tư 08/2026 gỡ nút truy cập cho CTCK toàn cầu. Danh sách sơ bộ 23+ mã có SSI, VCI, VND, VIX. Bước tiếp theo giá trị hơn: MSCI Watch List kỳ đánh giá 6/2026-2027 — quy mô tiền active theo MSCI lớn hơn FTSE nhiều lần." },
    { term: "Earnings Quality Mix", full: "Cơ cấu lợi nhuận: core vs tự doanh — chất lượng quyết định P/E xứng đáng", def: "Tách LN thành: (1) Core = margin spread + phí môi giới + IB recurring — dự báo được, xứng đáng P/E 12-15x; (2) Prop = tự doanh — không dự báo được, xứng đáng P/E 5-7x. LN hợp nhất giống nhau nhưng mix khác nhau → giá trị khác nhau xa.", howToRead: "Đọc thuyết minh doanh thu hoạt động: lãi từ cho vay và phải thu (margin) + phí môi giới vs lãi từ tài sản tài chính FVTPL (tự doanh). CTCK có core >70% LN = chất lượng cao. CTCK mà tự doanh >50% LN trong năm thị trường tăng = LN sẽ bốc hơi khi thị trường đảo — chiết khấu mạnh khi so sánh P/E ngang hàng.", vnContext: "Đây là lens phân biệt SSI/HCM/VCI (core cao) với một số CTCK nhỏ lãi lớn 2025 chủ yếu nhờ tự doanh. P/B ngành 1.85x là con số trung bình che giấu sự phân hóa chất lượng này." },
    { term: "P/B vs ROE Regression", full: "Định giá tương quan — khung chuẩn cho ngành tài chính", def: "Nguyên tắc: P/B hợp lý ≈ (ROE bền vững − g) / (Cost of equity − g). Thực dụng hóa: CTCK ROE bền 15% đáng P/B ~1.5x; ROE 20% đáng ~2-2.2x (với COE ~13-14% VN). Vẽ scatter P/B vs ROE của các CTCK → mã nằm dưới đường hồi quy = rẻ tương đối, trên đường = đắt tương đối.", howToRead: "Bẫy cần tránh: dùng ROE năm đỉnh (2025) làm 'ROE bền vững' → mua đắt. Dùng ROE trung bình qua chu kỳ (2021-2025, gồm cả năm xấu 2022-23) làm chuẩn. Sau tăng vốn: ROE pha loãng tạm thời 1-2 năm rồi hồi khi margin book lấp đầy vốn mới — mô hình hóa độ trễ này thay vì hoảng khi ROE giảm ngay sau phát hành.", vnContext: "P/B ngành 1.85x hiện tại vs đỉnh 2021 ~3-4x. Nếu FTSE + KRX đưa thanh khoản lên mặt bằng mới bền vững → ROE bền của ngành nâng lên → P/B 2.2-2.5x là justify được. MBS chiết khấu 35-40% từ đỉnh dù KQKD cải thiện = ứng viên mean-reversion." },
    { term: "Dilution Math", full: "Toán pha loãng — đọc đợt tăng vốn cho đúng", def: "Phát hành thêm N% cổ phiếu ở giá P: EPS pha loãng ngay ~N% (chia cho nhiều cổ phiếu hơn) nhưng vốn mới × 2 = room margin mới × spread 5% = LN tương lai. Break-even thường 4-6 quý nếu thanh khoản thị trường hợp tác. Giá phát hành càng gần thị giá, cổ đông hiện hữu càng ít thiệt.", howToRead: "Checklist mỗi đợt phát hành: (1) giá phát hành / thị giá (≥85% là fair); (2) mục đích vốn có cụ thể là margin không (tốt) hay 'bổ sung vốn lưu động' mơ hồ; (3) cổ đông lớn có mua theo tỷ lệ không (skin in the game). Đợt phát hành pass cả 3 = mua vào ngày pha loãng khi giá điều chỉnh kỹ thuật.", vnContext: "2026 là năm dày đặc sự kiện phát hành (HSC 5,600 tỷ, BSC nhân đôi vốn, TCBS IPO...). Mỗi sự kiện tạo nhiễu giá ngắn hạn = cơ hội cho người hiểu dilution math đứng ngược đám đông đúng lúc." },
  ],

  economics: [
    { title: "Định lượng hiệu ứng khuếch đại — tại sao beta 1.5-2x là cấu trúc, không phải ngẫu nhiên", body: `Mô phỏng một CTCK điển hình khi thanh khoản thị trường +20%:

Phí môi giới: volume +20% × chi phí gần như cố định → LN mảng phí +35-40%.
Margin: NĐT vay nhiều hơn khi GD sôi động → dư nợ +15-25% → LN spread tăng tương ứng.
Tự doanh: VN-Index thường tăng cùng thanh khoản → mark-to-market dương.
IB: định giá tốt → DN đua phát hành → deal pipeline dày.

→ Tổng hợp: LN CTCK +40-60% khi thị trường +20% = beta lợi nhuận ~2-3x, beta giá cổ phiếu ~1.5-2x.

Chiều ngược cũng đúng y hệt — 2022 là minh chứng: thanh khoản -50%, LN nhiều CTCK -70-90%, giá cổ phiếu -60-75%.

Hàm ý chiến lược: KHÔNG mua-quên CTCK như FMCG. Đây là công cụ chu kỳ: vào khi có catalyst thanh khoản phía trước (hiện tại: FTSE + KRX + MSCI pipeline), kỷ luật thoát khi thanh khoản tạo đỉnh chu kỳ. Position sizing nhỏ hơn defensive, kỳ vọng return cao hơn, stop-loss thật.` },
    { title: "Cuộc đua tăng vốn 2026 — game theory của trần margin 2x", body: `Trần margin = 2x vốn CSH biến ngành thành trò chơi có cấu trúc:

Nếu KHÔNG tăng vốn: giữ EPS đẹp 2026, nhưng hết room margin khi volume bùng hậu nâng hạng → nhìn đối thủ chiếm khách 2027-28 → thua dài hạn.
Nếu TĂNG vốn: EPS pha loãng 2026 (KH lợi nhuận trông xấu), nhưng sở hữu kho đạn khi cầu margin bùng → thắng dài hạn.

→ Nash equilibrium: TẤT CẢ cùng tăng vốn (đúng như đang diễn ra — 100,000 tỷ/năm toàn ngành). Ai đứng ngoài cuộc đua là tự loại mình.

Lớp phân hóa thứ hai — chi phí vốn: nhóm ngân hàng mẹ (TCBS, VPBankS, MBS, VCBS) huy động rẻ hơn nhóm độc lập (SSI, VCI) 1-2 điểm % → spread margin dày hơn cấu trúc. Nhóm độc lập phản công bằng thương hiệu (SSI) + khách tổ chức ngoại (VCI — đúng mạch FTSE flows).

→ Đọc KH lợi nhuận 2026 thận trọng của ngành = đọc một cuộc đầu tư tập thể cho 2027-28, không phải suy thoái ngành. Ai bán CTCK vì 'KH lợi nhuận giảm' là bán đúng lúc ngành đang nạp đạn.` },
    { title: "Nâng hạng nhìn từ template Qatar/UAE/Saudi — kỳ vọng gì là thực tế?", body: `Lịch sử các thị trường được FTSE/MSCI nâng hạng cho khung kỳ vọng thực tế:

Trước hiệu lực 6-12 tháng: thị trường tăng mạnh nhất — dòng tiền đầu cơ đón đầu (VN đang ở pha này: VN-Index +50%+ từ đáy 4/2025).
Quanh ngày hiệu lực: biến động + có thể 'sell the news' ngắn (dòng passive là sự kiện đã biết).
Sau hiệu lực 1-3 năm: pha giá trị thật — dòng active vào từ từ, thanh khoản lên mặt bằng mới, định giá re-rate bền nếu vĩ mô hợp tác.

Điểm khác biệt của VN so với các case Trung Đông: quy mô kinh tế thực + tăng trưởng lợi nhuận DN 15-20%/năm làm nền — dòng vốn vào không chỉ vì 'được vào rổ' mà vì earnings thật. Đây là lý do pha 3 của VN có thể tốt hơn template.

Rủi ro cần tôn trọng: nâng hạng KHÔNG miễn nhiễm vĩ mô — nếu Fed giữ lãi cao + tỷ giá VND căng, dòng active sẽ chậm hơn kịch bản. Theo dõi DXY và chênh lệch lãi suất VND-USD như điều kiện biên của cả thesis.` },
  ],

  valuation: {
    method: "P/B vs ROE bền vững là neo chính (ROE trung bình chu kỳ 2021-25, KHÔNG dùng ROE năm đỉnh). Ngành 1.85x hiện tại; justify 2.2-2.5x nếu thanh khoản lên mặt bằng mới bền sau FTSE+KRX. Lớp hai: phân tách earnings quality — P/E 12-15x cho LN core (margin+phí), 5-7x cho LN tự doanh → sum-of-parts theo cơ cấu lợi nhuận từng CTCK. Lớp ba: điều chỉnh dilution — dùng vốn CSH + số cổ phiếu SAU các đợt phát hành đã công bố.",
    notes: [
      "So sánh ngang hàng phải cùng hệ quy chiếu: nhóm ngân hàng mẹ (chi phí vốn rẻ, ROE cấu trúc cao hơn) vs nhóm độc lập — không trộn chung một đường hồi quy P/B-ROE.",
      "Sự kiện 'sell the news' quanh 21/9/2026: kỷ luật chốt một phần vị thế đầu cơ trước sự kiện, giữ core position cho pha active flows 2027-28.",
      "MSCI Watch List (kỳ 6/2026-2027) là catalyst kế tiếp lớn hơn FTSE về quy mô tiền — theo dõi tiến độ gỡ tiêu chí room ngoại + tự do hóa ngoại hối.",
    ],
    scenarios: {
      bull: "FTSE flows đúng kỳ vọng + KRX đẩy thanh khoản lên 30-35K tỷ/phiên bền + MSCI Watch List được xác nhận 2027 → LN core toàn ngành +40-60%, ROE bền nâng lên → P/B re-rate 2.5x+. SSI/VCI/HCM tăng 60-100% trong 18-24 tháng. Đây là ngành có bull case mạnh nhất trong 6 ngành.",
      base: "Nâng hạng diễn ra suôn sẻ, thanh khoản +15% như VPBankS dự báo, active flows vào từ từ → nhóm CTCK vượt KH thận trọng, P/B giữ 1.8-2.1x → return 20-35% từ tăng trưởng LN, khiêm tốn re-rating. Phân hóa: nhóm tăng vốn thành công + core earnings cao outperform.",
      bear: "'Sell the news' + Fed giữ lãi suất cao + tỷ giá căng khiến active flows trì hoãn + thanh khoản nội teo do lãi suất tiết kiệm hấp dẫn → LN 2026-27 dưới cả KH thận trọng, P/B nén về 1.3-1.5x → giảm 25-40% từ đỉnh. Beta hai chiều: ngành giảm sâu hơn VN-Index đúng như nó tăng nhanh hơn. Stop-loss và position sizing là bắt buộc.",
    },
  },

  watchList: [
    { metric: "GTGD bình quân/phiên (tuần/tháng)", source: "HOSE / HNX", freq: "Hàng tuần", signal: "Biến số số 1 của cả ngành. Mặt bằng mới >28-30K tỷ/phiên bền = xác nhận bull case." },
    { metric: "Danh sách + tỷ trọng chính thức FTSE (21/8) và hiệu lực (21/9/2026)", source: "FTSE Russell / SSC", freq: "Theo sự kiện", signal: "Kiểm chứng mã nào vào rổ với tỷ trọng bao nhiêu; cảnh giác sell-the-news quanh 21/9." },
    { metric: "Tiến độ MSCI Watch List + tiêu chí room ngoại/ngoại hối", source: "MSCI / Mirae Asset review", freq: "Kỳ 6 & 12 hàng năm", signal: "Catalyst kế tiếp lớn hơn FTSE — mỗi tiến triển tiêu chí = tin tốt cấu trúc." },
    { metric: "Dư nợ margin toàn thị trường + theo từng CTCK", source: "UBCKNN / BCTC quý", freq: "Hàng quý", signal: "Tăng đều = khỏe; tăng vọt cuối chu kỳ = rủi ro hệ thống khi thị trường đảo." },
    { metric: "Lịch phát hành tăng vốn (giá, tỷ lệ, mục đích)", source: "ĐHĐCĐ / công bố thông tin", freq: "Theo sự kiện", signal: "Chấm điểm theo dilution math checklist — đợt phát hành tốt tạo điểm mua kỹ thuật." },
    { metric: "Fed policy + DXY + chênh lệch lãi suất VND-USD", source: "Fed / Bloomberg", freq: "Theo cuộc họp Fed", signal: "Điều kiện biên của dòng active flows — Fed hạ lãi = mở van; tỷ giá căng = trì hoãn." },
  ],
},


// ════════════════════════════════════════════════
// LOGISTICS & CẢNG BIỂN
// ════════════════════════════════════════════════
logistics: {
  tagline: "Ngành cửa khẩu của thương mại — cố định cao, biên tăng phi tuyến theo công suất, China+1 là gió thuận thập kỷ",
  type: "Structural growth · Infrastructure",

  positioning: {
    marketSize: "Sản lượng container cảng biển VN ~30+ triệu TEU/năm (top 20 thế giới), tăng trưởng 2 chữ số nhiều năm liền. Xuất khẩu 2025: $475.1B (+17%) — cảng là 'đồng hồ đo' trực tiếp của dòng chảy này. Cụm nước sâu Cái Mép-Thị Vải đã vào top 30 cảng container lớn nhất thế giới và top 7 hiệu quả nhất (World Bank CPPI).",
    globalRole: "Cảng biển là hạ tầng độc quyền tự nhiên: vị trí nước sâu là tài nguyên hữu hạn không sao chép được, giấy phép mất 5-10 năm, capex $200-600M/bến. Trong chuỗi thương mại toàn cầu, cảng đứng giữa hãng tàu (oligopoly 3 liên minh kiểm soát ~85% công suất tuyến chính) và chủ hàng — vị thế 'thu phí cầu đường' của globalization.",
    vnPosition: "VN là winner lớn nhất của China+1: FDI giải ngân kỷ lục $27.6B (2025), các nhà máy dịch chuyển từ TQ cần cảng xuất hàng đi Mỹ/EU. Gemalink (GMD) là cảng nước sâu tư nhân lớn nhất, đón được tàu mẹ 200,000+ DWT đi thẳng Mỹ/EU không cần trung chuyển qua Singapore — nâng cấp cấu trúc của cả chuỗi logistics VN.",
    cyclePosition: "Giữa chu kỳ tăng trưởng cấu trúc, nhưng 2026 có lớp sương mù thuế quan: thuế Mỹ ~20% lên hàng VN + 40% lên hàng transshipment khiến khách hàng front-load rồi chững. Q1/26 GMD vẫn +24.2% LNST — cầu thực vẫn chạy. Chu kỳ capex mới đang mở: Gemalink 2A (2027), Nam Đình Vũ 3 — sản lượng tương lai đã được 'đặt hàng' bằng capex hôm nay.",
    linkages: "Mắt xích giữa của bộ ba FDI → KCN → Cảng: KCN lấp đầy hôm nay = TEU tăng 2-3 năm sau. Nhạy với: chính sách thuế quan Mỹ (rủi ro số 1), giá cước vận tải biển thế giới (ảnh hưởng hãng tàu → phí bốc xếp), tỷ giá (doanh thu cảng phần lớn neo USD — hedge tự nhiên hiếm có của TTCK VN). Ít nhạy với lãi suất + tín dụng nội địa hơn hầu hết các ngành.",
    keyPlayers: ["GMD — hệ sinh thái cảng hoàn chỉnh nhất: Gemalink nước sâu + Nam Đình Vũ (Bắc) + logistics, CAGR PBT 38%/năm 2021-25", "SCS — độc quyền kép ga hàng hóa hàng không Tân Sơn Nhất, EBITDA margin ~80%, không nợ", "VSC — cảng Hải Phòng, đang M&A mở rộng", "HAH — vận tải container nội địa + feeder, beta giá cước cao", "PHP — cảng Hải Phòng quốc doanh, Lạch Huyện bến 3-4"],
  },

  valueChain: [
    { step: "Hãng tàu container (Power: mạnh nhất chuỗi — oligopoly toàn cầu)", desc: "3 liên minh (Gemini, Ocean Alliance, Premier) kiểm soát ~85% công suất tuyến chính. Họ quyết định ghé cảng nào — cảng mất một liên minh là mất 20-40% sản lượng qua đêm. Đàm phán phí bốc xếp nghiêng về hãng tàu, TRỪ khi cảng có vị trí không thể thay thế (nước sâu duy nhất trong vùng). Gemalink có MSC (hãng lớn nhất TG) vừa là cổ đông vừa là khách — khoá sản lượng dài hạn.", margin: "Hãng tàu: siêu chu kỳ (lãi kỷ lục 2021, lỗ 2023). Cảng không ăn chu kỳ này — cảng ăn VOLUME." },
    { step: "Cảng nước sâu (Power: độc quyền tự nhiên — trái tim chuỗi giá trị)", desc: "Đón tàu mẹ 14,000-24,000 TEU đi thẳng Mỹ/EU. VN chỉ có 2 cụm: Cái Mép (Nam — Gemalink, CMIT, TCIT) và Lạch Huyện (Bắc). Kinh tế học: chi phí cố định ~70%, chi phí biến đổi thấp → mỗi TEU tăng thêm sau điểm hòa vốn rơi 70-80% xuống EBITDA. Utilisation 60% = biên mỏng; 90%+ = máy in tiền + quyền tăng giá.", margin: "EBITDA margin 50-70% khi util cao — hàng đầu mọi loại tài sản hạ tầng" },
    { step: "Cảng feeder & sông (Power: trung bình — cạnh tranh nội vùng)", desc: "Cảng nhỏ hơn gom hàng cho tàu feeder trung chuyển. Hải Phòng khu thượng lưu: dư cung, cạnh tranh giá. Nam Đình Vũ (GMD) thắng nhờ vị trí hạ lưu (tàu lớn hơn vào được) + hệ sinh thái khép kín với Gemalink. Xu hướng: hàng dịch dần từ feeder lên nước sâu — cảng thượng lưu cũ sẽ teo dần.", margin: "EBITDA margin 30-45% — thấp hơn nước sâu, nhạy cạnh tranh giá hơn" },
    { step: "Ga hàng hóa hàng không (Power: độc quyền kép — niche quý nhất)", desc: "SCS là 1 trong 2 nhà khai thác ga hàng hóa Tân Sơn Nhất — hàng không giá trị cao (điện tử, linh kiện bán dẫn, dược) bắt buộc đi air. Barrier: giấy phép + đất trong sân bay = không thể có người chơi mới. E-commerce xuyên biên giới là lớp tăng trưởng mới. Rủi ro duy nhất: sân bay Long Thành phân lưu sau 2027-28.", margin: "EBITDA margin ~80%, gần như không nợ — đơn vị kinh tế đẹp nhất ngành logistics VN" },
    { step: "ICD, depot, vận tải & 3PL (Power: yếu — phân mảnh)", desc: "Kho bãi, trucking, khai báo hải quan, last-mile. Thị trường cực kỳ phân mảnh (hàng nghìn DN nhỏ), biên mỏng, cạnh tranh giá. Giá trị chỉ xuất hiện khi TÍCH HỢP vào chuỗi cảng (GMD bán combo cảng + logistics = giữ khách, tăng revenue/TEU tổng). Đứng riêng lẻ = không có moat.", margin: "Net margin 3-8% — đừng trả premium cho mảng này đứng độc lập" },
    { step: "Chủ hàng FDI & xuất nhập khẩu (cấu trúc cầu)", desc: "Điện tử (Samsung, Foxconn, LG) + dệt may, da giày + nội thất + nông thủy sản. Cầu container = hàm của sản xuất FDI và tiêu dùng Mỹ/EU. Cấu trúc đang nâng cấp: hàng điện tử giá trị cao tăng tỷ trọng → nhu cầu dịch vụ nhanh, đáng tin > giá rẻ → cảng chất lượng cao hưởng lợi.", margin: "— (theo dõi PMI VN + đơn hàng xuất khẩu làm leading indicator)" },
  ],

  revenueModel: [
    { name: "Khai thác cảng container", vi: "Bốc xếp, lưu bãi — core của GMD/VSC/PHP", desc: "Doanh thu = TEU × Revenue/TEU. Phí bốc xếp VN từng thấp nhất khu vực do trần giá + cạnh tranh; lộ trình tăng phí sàn (Thông tư điều chỉnh giá dịch vụ cảng) là re-rating âm thầm của cả ngành: giá tăng 10% rơi gần hết xuống lợi nhuận vì chi phí không đổi.", driver: "Sản lượng TEU (FDI, xuất khẩu) · Phí sàn bốc xếp · Utilisation", margin: "EBITDA 50-70% tại cảng nước sâu util cao" },
    { name: "Ga hàng hóa hàng không", vi: "SCS — air cargo terminal", desc: "Phí xử lý/kg hàng không. Sản lượng gắn với điện tử + e-commerce xuyên biên giới. Mô hình asset-light sau đầu tư ban đầu: tăng trưởng sản lượng gần như không cần capex mới → FCF conversion cực cao → cổ tức đều và lớn.", driver: "Xuất khẩu điện tử · E-commerce cross-border · Công suất TSN trước Long Thành", margin: "EBITDA ~80% — cao nhất ngành" },
    { name: "Logistics tích hợp & ICD", vi: "GMD ecosystem — combo giữ khách", desc: "Vận tải, depot, thủ tục — biên mỏng đứng riêng nhưng có giá trị chiến lược: khách dùng combo cảng+logistics có switching cost cao hơn, và GMD thu được nhiều hơn trên mỗi container xuyên suốt chuỗi.", driver: "Sản lượng qua cảng nhà · Tỷ lệ khách dùng combo", margin: "Net 3-8% — giá trị nằm ở retention, không phải margin" },
    { name: "Vận tải biển & cho thuê tàu", vi: "HAH — feeder + charter", desc: "Beta cao nhất ngành với giá cước thế giới: giá cước tăng → HAH lãi đột biến (charter tàu ra quốc tế); cước giảm → lợi nhuận co mạnh. Đây là mảng CHU KỲ trong ngành cấu trúc — định giá và kỳ vọng phải tách riêng khỏi cảng.", driver: "Giá cước container (Drewry WCI) · Cung-cầu tàu feeder nội Á", margin: "Biến động lớn theo cước — dùng P/E mid-cycle, không dùng đỉnh" },
  ],

  kpis: [
    { term: "TEU Throughput & Utilisation", full: "Sản lượng container + tỷ lệ lấp đầy công suất", def: "TEU (twenty-foot equivalent unit) là đơn vị sản lượng chuẩn. Doanh thu cảng = TEU × Revenue/TEU. Utilisation = TEU thực tế / công suất thiết kế. Do chi phí cố định ~70%, quan hệ util → lợi nhuận là PHI TUYẾN: từ 60% lên 90% util, EBITDA có thể tăng 2-2.5x chứ không phải 1.5x.", howToRead: "Util <60%: cảng đang 'đốt' chi phí cố định. 70-85%: vùng ngọt — biên nở nhanh. >90%: hết room → vừa là tin tốt (pricing power, quyền chọn khách giá cao) vừa là tín hiệu cần capex mở rộng. Đọc kèm: cảng full mà KHÔNG có kế hoạch mở rộng = tăng trưởng sắp hết; cảng full + capex đang xây = tăng trưởng được đặt trước.", vnContext: "Gemalink GĐ1 đã chạy gần full — đây chính là lý do GĐ2A (2027, +600K TEU) quan trọng: không có nó, GMD hết room tăng trưởng phía Nam. Nam Đình Vũ 3 tương tự cho phía Bắc. Câu chuyện GMD 2026-28 = câu chuyện chuyển capex thành TEU đúng tiến độ." },
    { term: "Revenue/TEU", full: "Doanh thu bình quân mỗi container — trục giá của phương trình", def: "Tổng doanh thu khai thác cảng / TEU. Gồm phí bốc xếp (chính) + lưu bãi + dịch vụ phụ trợ. VN từng có phí bốc xếp thấp nhất khu vực (~$52-57/container 20ft vs Singapore $111+, Thái ~$59) do trần giá cạnh tranh — nghĩa là dư địa TĂNG GIÁ là câu chuyện cấu trúc nhiều năm.", howToRead: "Revenue/TEU tăng đến từ 3 nguồn: (1) điều chỉnh phí sàn theo Thông tư — áp cho cả ngành, rơi thẳng xuống lợi nhuận; (2) mix hàng dịch lên nước sâu/tàu mẹ (phí cao hơn feeder); (3) dịch vụ giá trị gia tăng. Theo dõi Revenue/TEU từng quý của GMD: tăng bền + volume tăng = double engine hiếm có.", vnContext: "Lộ trình nâng phí sàn bốc xếp VN tiếp tục là catalyst ngành ít được chú ý: mỗi 10% tăng phí ≈ 7-9% tăng EBITDA cảng (chi phí gần như không đổi). Cái Mép vào top 7 hiệu quả thế giới (CPPI) củng cố lý lẽ 'phí VN quá rẻ so với chất lượng' khi đàm phán chính sách." },
    { term: "Capex Cycle → EPS Bridge", full: "Cầu nối từ chu kỳ đầu tư sang lợi nhuận — đọc trước 2-3 năm", def: "Cảng có chu kỳ: capex lớn (2-3 năm xây) → COD → ramp-up sản lượng (1-2 năm) → harvest (biên nở). Trong pha capex: nợ tăng, khấu hao + lãi vay nén EPS → cổ phiếu thường bị định giá thấp ĐÚNG LÚC giá trị đang được tạo ra. Đây là cửa sổ mua của ngành.", howToRead: "Lập bảng: dự án · công suất thêm · vốn đầu tư · năm COD · EBITDA ước khi full (dùng EBITDA/TEU hiện hữu × công suất mới × util giả định 70-80%). Gemalink 2A: +600K TEU × EBITDA/TEU Gemalink hiện tại → hình dung được lợi nhuận 2028 ngay hôm nay. So sánh với mức tăng vốn hóa cần thiết → biết thị trường đã price-in chưa.", vnContext: "GMD đang ở điểm chuyển pha đẹp: Nam Đình Vũ 2 vừa ramp-up xong (harvest), Gemalink 2A khởi động (capex mới). CAGR PBT 38%/năm 2021-25 chính là kết quả của chu kỳ capex trước — chu kỳ mới đang được xây cho 2027-30." },
    { term: "SOTP cho tập đoàn cảng", full: "Sum-of-the-parts — phương pháp bắt buộc cho GMD", def: "GMD không phải một cảng — là danh mục: Gemalink (sở hữu ~65%) + Nam Đình Vũ + cảng khác + logistics + tài sản không cốt lõi (cao su, BĐS liên doanh). Mỗi phần rủi ro và tăng trưởng khác nhau → cộng từng phần theo EV/EBITDA riêng, trừ nợ ròng, điều chỉnh sở hữu thiểu số.", howToRead: "Khung nhanh: cảng nước sâu tăng trưởng EV/EBITDA 10-12x; cảng feeder ổn định 7-9x; logistics 5-6x; tài sản không cốt lõi chiết khấu 30-50% giá trị sổ sách/định giá lại. Cộng lại so với EV hiện tại → biên an toàn. Lưu ý sở hữu Gemalink ~65%: chỉ cộng phần tương ứng, và nhớ lợi ích cổ đông thiểu số ăn bớt lợi nhuận hợp nhất.", vnContext: "Điểm hay của SOTP với GMD: các thương vụ bán cảng thật (GMD từng thoái Nam Hải Đình Vũ giá rất tốt) cung cấp mốc định giá thị trường thực cho từng loại tài sản — hiếm ngành nào có 'giá giao dịch tư nhân' để neo như vậy." },
    { term: "Tariff & Transshipment Risk", full: "Rủi ro thuế quan Mỹ — biến số vĩ mô số 1 của ngành 2026", def: "Thuế Mỹ ~20% hàng VN + 40% hàng bị xác định 'transshipment' (hàng TQ đội lốt). Rủi ro hai lớp: (1) trực tiếp — hàng xuất Mỹ giảm nếu thuế làm mất cạnh tranh; (2) gián tiếp nhưng nguy hiểm hơn — quy tắc xuất xứ siết chặt làm dòng FDI 'lách TQ' chậm lại, đánh vào gốc rễ China+1.", howToRead: "Theo dõi cơ cấu: hàng đi Mỹ chiếm ~28-30% xuất khẩu VN; phần còn lại (EU, nội Á, FTA khác) là đệm. Kịch bản xấu không phải TEU giảm tuyệt đối mà là TĂNG CHẬM LẠI (từ 15-20%/năm về 5-8%). Đọc kèm: tỷ lệ nội địa hóa FDI tăng = hàng 'made in VN thật' = miễn nhiễm dần với truy xuất transshipment.", vnContext: "Q1/26: sản lượng cảng vẫn tăng tốt — front-loading trước thuế + cầu thực. Trung hạn, hiệp định thương mại VN-Mỹ (đang đàm phán chi tiết thực thi) là sự kiện cần theo dõi sát nhất; mỗi vòng làm rõ quy tắc xuất xứ là một lần giảm/tăng risk premium cho cả ngành." },
    { term: "Hinterland Connectivity", full: "Kết nối hậu phương — yếu tố quyết định cảng nào thắng trong 10 năm", def: "Cảng chỉ mạnh bằng hệ thống đường/sông/sắt nối nó với vùng sản xuất (hinterland). Chi phí kéo container từ nhà máy ra cảng thường LỚN HƠN phí bốc xếp — chủ hàng chọn cảng theo tổng chi phí chuỗi, không theo phí cảng đơn lẻ.", howToRead: "Map các dự án hạ tầng vào cảng cụ thể: Vành đai 3 + cao tốc Biên Hòa-Vũng Tàu (2026+) giảm mạnh chi phí kéo hàng về Cái Mép → nới rộng hinterland của Gemalink sâu vào Bình Dương/Đồng Nai — vùng công nghiệp lớn nhất nước. Phía Bắc: Lạch Huyện + cao tốc ven biển làm điều tương tự cho Nam Đình Vũ.", vnContext: "Đầu tư công 8.3 triệu tỷ 2026-30 với trọng tâm giao thông = nhà nước đang trả tiền mở rộng 'vùng phục vụ' cho các cảng tư nhân. GMD là người hưởng lợi không phải trả tiền — dạng subsidy gián tiếp mà mô hình định giá thường bỏ sót." },
  ],

  economics: [
    { title: "Kinh tế học cảng nước sâu — tại sao đây là hạ tầng đáng sở hữu nhất", body: `Ba tầng kinh tế học xếp chồng tạo nên chất lượng tài sản hiếm có:

Tầng 1 — Độc quyền tự nhiên: vị trí nước sâu (-14m trở lên) là tài nguyên địa lý hữu hạn. VN chỉ có Cái Mép và Lạch Huyện đón được tàu mẹ. Giấy phép + đền bù + xây dựng = 7-10 năm. Không có 'startup cảng nước sâu'.

Tầng 2 — Đòn bẩy hoạt động: chi phí cố định ~70% (khấu hao cầu bến, cẩu, nhân sự vận hành ca kíp). Sau điểm hòa vốn, mỗi TEU thêm rơi 70-80% xuống EBITDA. Đây là lý do cùng một cảng có thể EBITDA margin 40% năm này và 65% ba năm sau mà không cần phép màu nào — chỉ cần volume.

Tầng 3 — Quyền chọn tăng giá: phí bốc xếp VN thuộc nhóm thấp nhất khu vực trong khi chất lượng vào top 7 thế giới (CPPI). Chênh lệch này là 'kho pricing power' được giải phóng dần qua điều chỉnh phí sàn — mỗi đợt là một lần re-rate lợi nhuận toàn ngành không tốn một đồng capex.

→ Volume tăng cấu trúc (China+1) × đòn bẩy hoạt động × giá còn rẻ so chuẩn khu vực = công thức compound của ngành cảng VN thập kỷ này.` },
    { title: "China+1 dưới bóng thuế quan — thesis còn nguyên hay đã gãy?", body: `Câu hỏi trị giá nhất của ngành 2026: thuế Mỹ 20%/40% có giết China+1 không?

Lập luận thesis còn nguyên:
→ Chênh lệch chi phí sản xuất VN vs TQ vẫn lớn; thuế lên hàng TQ trực tiếp còn cao hơn thuế lên VN — khoảng cách tương đối vẫn có lợi cho VN.
→ FDI giải ngân 2025 kỷ lục $27.6B — nhà máy đã và đang xây không quay đầu được; TEU của các nhà máy này sẽ ra cảng 2026-28 bất kể thuế.
→ Đa dạng hóa thị trường: 17 FTA của VN cho phép xoay trục sang EU, nội Á, Trung Đông khi Mỹ khó — cầu container tổng vẫn tăng, chỉ đổi tuyến.

Lập luận phải dè chừng:
→ Quy tắc xuất xứ siết (chống transshipment) làm dòng FDI 'lắp ráp nông' chậm lại — phần FDI này tạo nhiều TEU nhất trên mỗi đô la đầu tư.
→ Nếu kinh tế Mỹ giảm tốc do chính thuế quan → cầu tiêu dùng giảm → TEU toàn cầu giảm — không nước nào thoát.

Kết luận cân bằng: thesis China+1 bị GIẢM TỐC, không bị đảo ngược. Điều chỉnh kỳ vọng tăng trưởng TEU từ 15-20%/năm về 8-12%/năm là thận trọng hợp lý — và ở mức đó, với đòn bẩy hoạt động của cảng, lợi nhuận vẫn tăng 15-25%/năm. Thesis gãy thật chỉ khi FDI đăng ký mới giảm 2 năm liên tiếp — theo dõi con số đó làm kill-switch.` },
    { title: "Đọc GMD như một chuỗi quyền chọn thay vì một cổ phiếu cảng", body: `Cách sai: nhìn P/E GMD một con số rồi so với ngành. Cách đúng: GMD = tài sản đang harvest + chuỗi quyền chọn tăng trưởng có ngày đáo hạn cụ thể.

Lớp harvest (đang thu tiền): Nam Đình Vũ 1-2 + Gemalink GĐ1 gần full — dòng EBITDA nền vững, tăng theo phí sàn + mix.

Quyền chọn 1 — Gemalink 2A (đáo hạn 2027): +600K TEU. Xác suất thực hiện rất cao (đã khởi động). Giá trị = EBITDA/TEU hiện hữu × 600K × util ramp 3 năm.

Quyền chọn 2 — Nam Đình Vũ 3 + mở rộng phía Bắc: gắn với tăng trưởng FDI miền Bắc (điện tử). 

Quyền chọn 3 — Điều chỉnh phí sàn tiếp theo: mỗi đợt +10% phí ≈ +7-9% EBITDA toàn danh mục, zero capex.

Quyền chọn 4 — Thoái vốn tài sản không cốt lõi (cao su, liên doanh BĐS): lịch sử GMD thoái tài sản đều được giá tốt → mỗi thương vụ vừa mở khóa tiền vừa chứng minh NAV.

→ Định giá đúng = giá trị lớp harvest (EV/EBITDA 9-11x) + Σ quyền chọn × xác suất. Thị trường thường chỉ trả cho lớp harvest và quyền chọn gần nhất — các quyền chọn xa là biên an toàn miễn phí cho người cầm 3-5 năm.` },
  ],

  valuation: {
    method: "EV/EBITDA là neo chính: cảng nước sâu tăng trưởng 10-12x, cảng feeder 7-9x, logistics 5-6x (chuẩn khu vực: cảng ASEAN chất lượng giao dịch 10-14x). GMD bắt buộc dùng SOTP (xem KPI) — cộng từng cụm tài sản, trừ nợ ròng, điều chỉnh sở hữu Gemalink ~65%. SCS: DCF/dividend model phù hợp hơn (FCF đều, không nợ, tăng trưởng gắn TSN) + theo dõi rủi ro Long Thành phân lưu sau 2027-28. HAH: P/E mid-cycle theo giá cước, tách hẳn khỏi logic cảng.",
    notes: [
      "Cửa sổ mua của ngành là pha capex: nợ tăng + EPS nén đúng lúc giá trị đang được xây — Gemalink 2A 2026-27 là ví dụ sống.",
      "Neo định giá quý giá: các thương vụ M&A cảng thật (GMD thoái Nam Hải Đình Vũ...) cho giá thị trường tư nhân của tài sản — so với định giá sàn chứng khoán để thấy chiết khấu/premium.",
      "Doanh thu cảng neo USD = hedge tỷ giá tự nhiên — cộng điểm trong môi trường VND chịu áp lực, điều hiếm có trên TTCK VN.",
    ],
    scenarios: {
      bull: "Đàm phán thương mại VN-Mỹ ra khung xuất xứ rõ ràng, thuế thực thi mềm hơn lo ngại + FDI tiếp tục kỷ lục → TEU tăng 12-15%/năm, Gemalink 2A COD đúng hạn 2027, thêm đợt nâng phí sàn → GMD EPS CAGR 25-30% 2026-28, EV/EBITDA re-rate 11-12x. Upside 50-80% cho 2-3 năm.",
      base: "Thuế quan tạo ma sát, TEU tăng 8-10%/năm (giảm tốc nhưng dương) + phí sàn giữ lộ trình → GMD lợi nhuận tăng 15-20%/năm nhờ đòn bẩy hoạt động + ramp Gemalink. Định giá đi ngang → return 15-20%/năm theo tăng trưởng lợi nhuận. SCS đều đặn 10-12% + cổ tức.",
      bear: "Thuế Mỹ leo thang + quy tắc xuất xứ siết gắt làm FDI mới giảm 2 năm liên tiếp + kinh tế Mỹ suy → TEU đi ngang/giảm nhẹ, Gemalink 2A ramp chậm, đòn bẩy hoạt động chạy ngược (biên co nhanh hơn volume) → GMD EPS đi ngang, EV/EBITDA nén về 7-8x, giảm 25-35%. SCS phòng thủ tốt hơn nhờ hàng air giá trị cao + không nợ.",
    },
  },

  watchList: [
    { metric: "Sản lượng TEU hàng tháng (GMD, cụm Cái Mép, Hải Phòng)", source: "GMD công bố / Cục Hàng hải", freq: "Hàng tháng", signal: "Nhịp thở của thesis. Tăng chậm lại 2 quý liên tiếp = kiểm tra lại giả định China+1." },
    { metric: "Đàm phán thương mại VN-Mỹ + quy tắc xuất xứ", source: "Bộ Công thương / USTR", freq: "Theo sự kiện", signal: "Biến số vĩ mô số 1 của ngành 2026 — mỗi vòng làm rõ là một lần reprice risk premium." },
    { metric: "FDI đăng ký mới + giải ngân", source: "Bộ KH&ĐT (hàng tháng)", freq: "Hàng tháng", signal: "Kill-switch của thesis: đăng ký mới giảm 2 năm liên tiếp = cầu TEU tương lai gãy." },
    { metric: "Tiến độ Gemalink 2A + Nam Đình Vũ 3", source: "GMD IR / ĐHĐCĐ", freq: "Hàng quý", signal: "Quyền chọn tăng trưởng lớn nhất — trễ tiến độ 6 tháng+ = trừ thẳng vào định giá." },
    { metric: "Điều chỉnh khung phí dịch vụ cảng biển", source: "Bộ GTVT / Thông tư", freq: "Theo sự kiện", signal: "Mỗi 10% tăng phí sàn ≈ 7-9% EBITDA toàn ngành — catalyst zero-capex." },
    { metric: "Giá cước container thế giới (Drewry WCI)", source: "Drewry / Freightos", freq: "Hàng tuần", signal: "Ảnh hưởng trực tiếp HAH (charter); gián tiếp sức khỏe hãng tàu — đối tác đàm phán của cảng." },
  ],
},

// ════════════════════════════════════════════════
// NGÂN HÀNG
// ════════════════════════════════════════════════
banking: {
  tagline: "Huyết mạch nền kinh tế — ROE là hàm của NIM, chi phí tín dụng và cuộc chơi room; P/B chỉ rẻ khi hiểu chất lượng tài sản",
  type: "Cyclical-defensive · Rate-sensitive",

  positioning: {
    marketSize: "Tổng dư nợ hệ thống ~18-19 triệu tỷ đồng, tín dụng/GDP >130% — thuộc nhóm cao nhất các nền kinh tế đang phát triển (con dao hai lưỡi: động cơ tăng trưởng nhưng ít dư địa nới thêm). Room tín dụng 2026: 15% toàn hệ thống. Ngân hàng chiếm ~35-40% vốn hóa VN-Index — không có sóng VN-Index nào thiếu ngân hàng.",
    globalRole: "Ở nền kinh tế bank-based như VN (thị trường vốn còn nhỏ), ngân hàng là kênh phân bổ vốn gần như duy nhất — vị thế 'thu phí trên mọi hoạt động kinh tế'. Mô hình lợi nhuận phổ quát: ROE = f(NIM × đòn bẩy − chi phí tín dụng − chi phí vận hành). Ngân hàng VN có ROE 18-22% nhóm đầu — cao hơn hầu hết ngân hàng khu vực (Thái ~9-10%, Indo ~14-16%) nhờ tăng trưởng tín dụng cao + chi phí vận hành số hóa giảm dần.",
    vnPosition: "Đặc sản VN: cơ chế room tín dụng — NHNN cấp quota tăng trưởng cho từng ngân hàng. 2026 xuất hiện phân hóa lịch sử: nhóm nhận chuyển giao bắt buộc ngân hàng 0 đồng (VCB, MBB, VPB, HDB) được room ~35% vs mặt bằng 11-15% — lợi thế tăng trưởng gấp 2-3 lần đối thủ, kéo dài nhiều năm. Đây là biến số alpha lớn nhất ngành hiện tại.",
    cyclePosition: "NIM toàn ngành đang ở vùng đáy nhiều năm (cạnh tranh lãi suất cho vay + chi phí huy động tăng từ Q3/2025): quốc doanh NIM +23bps nhờ CASA, tư nhân -21bps. LDR hệ thống ~115% — thanh khoản căng, huy động là cuộc chiến. NPL cần theo dõi khi tín dụng BĐS 25.5% tổng dư nợ. Pha hiện tại: 'tăng trưởng tín dụng cao che NIM mỏng' — lợi nhuận vẫn tăng nhờ volume.",
    linkages: "Trung tâm của mọi liên kết: BĐS chiếm 25.53% dư nợ (cặp sinh tử — đọc 2 primer này cùng nhau), TPDN (ngân hàng vừa phát hành vừa nắm giữ), CTCK (cho vay margin gián tiếp qua repo/tiền gửi). Nhạy nhất với: lãi suất điều hành + trần room NHNN, chất lượng tài sản BĐS, Basel III/luật hóa Nghị quyết 42 (thu giữ tài sản đảm bảo). Ngân hàng tốt lên = cả thị trường tốt lên và ngược lại.",
    keyPlayers: ["VCB — chất lượng tài sản vô địch (LLR >200%), room 35%, premium P/B xứng đáng", "MBB — CASA ~40% nhóm đầu = chi phí vốn rẻ nhất, room 35%, PBT 2026E ~40.000 tỷ (+17%), P/B fw ~1.4x", "ACB — kỷ luật rủi ro nhất nhóm tư nhân: NPL ~1.0% thấp nhất ngành, không TPDN rủi ro, P/B ~1.2x", "CTG — quốc doanh chuyển mình, Q1/26 lợi nhuận +63%, câu chuyện hoàn nhập dự phòng", "TCB — hệ sinh thái Techcombank + TCBS, mạnh banca-TPDN-BĐS cao cấp"],
  },

  valueChain: [
    { step: "Huy động vốn (Power: người gửi tiền + cuộc chiến CASA)", desc: "Nguyên liệu của ngân hàng là tiền gửi. Hai loại: tiền gửi kỳ hạn (đắt — lãi 5-6%+) và CASA (không kỳ hạn — gần 0%). CASA cao = chi phí vốn thấp cấu trúc = NIM dày hơn với cùng lãi cho vay. CASA đến từ đâu? Tài khoản trả lương, app tiện, hệ sinh thái thanh toán — cuộc chiến công nghệ + trải nghiệm, không phải lãi suất. LDR hệ thống ~115% khiến huy động 2026 là mặt trận nóng nhất.", margin: "Mỗi 10 điểm % CASA cao hơn ≈ 40-60bps chi phí vốn rẻ hơn — MBB/TCB/VCB dẫn đầu" },
    { step: "Cho vay & phân bổ tài sản (Power: ngân hàng — nhưng bị NHNN quota)", desc: "Bán lẻ (mua nhà, tiêu dùng, hộ KD — NIM cao, rủi ro phân tán) vs bán buôn (doanh nghiệp lớn — NIM mỏng, volume lớn, rủi ro tập trung). Room tín dụng là trần cứng: ngân hàng không thể tăng trưởng vượt quota dù cầu có. Chiến lược thắng trong cơ chế room: dùng quota cho tài sản NIM cao nhất có rủi ro chấp nhận được + xin thêm room bằng 'điểm tốt' với NHNN (tham gia tái cơ cấu, hỗ trợ chính sách).", margin: "NIM ngành 3.0-3.5%; bán lẻ 4-5%+, bán buôn 2-2.5%" },
    { step: "Dịch vụ phi tín dụng (Power: người có tệp khách + hệ sinh thái)", desc: "Phí thanh toán, thẻ, bancassurance, FX, tư vấn phát hành. Đây là lợi nhuận KHÔNG ăn vốn (không cần room, không cần dự phòng) → mỗi đồng phí đáng giá hơn một đồng lãi. Banca từng là mỏ vàng rồi bị siết (bê bối ép mua bảo hiểm) — đang phục hồi có kỷ luật. Xu hướng lớn: phí từ hệ sinh thái đầu tư (liên kết CTCK, quỹ) khi tầng lớp trung lưu tích sản.", margin: "Thu nhập ngoài lãi 20-30% tổng thu nhập ở ngân hàng tốt — càng cao càng đáng premium" },
    { step: "Quản trị rủi ro & xử lý nợ (Power: khung pháp lý quyết định)", desc: "Chi phí tín dụng (credit cost) là biến số làm ROE khác nhau 5-10 điểm % giữa các ngân hàng cùng NIM. Luật hóa Nghị quyết 42 (quyền thu giữ tài sản bảo đảm) là nâng cấp cấu trúc: xử lý nợ xấu nhanh hơn = LGD thấp hơn = bớt dự phòng. Chu kỳ NPL: hình thành (formation) → trích lập → xử lý/hoàn nhập — ngân hàng trích lập thận trọng hôm nay 'giấu' lợi nhuận cho ngày mai.", margin: "Credit cost 0.5-1.5%/dư nợ tùy khẩu vị — chênh lệch này LÀ chênh lệch ROE" },
    { step: "Vốn & tuân thủ Basel (Power: NHNN — giấy phép tăng trưởng dài hạn)", desc: "CAR tối thiểu + lộ trình Basel III: tăng trưởng tài sản nhanh đòi hỏi bồi vốn liên tục (lợi nhuận giữ lại hoặc phát hành). Ngân hàng ROE cao tự nuôi được tăng trưởng không pha loãng; ROE thấp phải phát hành → vòng xoáy pha loãng. Câu chuyện tăng vốn quốc doanh (VCB, CTG, BID phát hành cho nước ngoài/chia cổ tức cổ phiếu) là nút thắt chính sách được tháo dần.", margin: "ROE > tăng trưởng tài sản mục tiêu = tự tài trợ; ngược lại = pha loãng định kỳ" },
    { step: "Người vay cuối & chu kỳ nền kinh tế (cấu trúc cầu)", desc: "Cầu tín dụng = đầu tư tư nhân + tiêu dùng + BĐS + đầu tư công lan tỏa. 2026: tín dụng hạ tầng + sản xuất FDI là động cơ mới bù cho BĐS bị siết chọn lọc. Chất lượng cầu quan trọng hơn lượng: tín dụng chảy vào sản xuất tạo dòng tiền trả nợ; chảy vào đầu cơ tài sản tạo NPL tương lai — đọc cơ cấu tín dụng theo ngành để đoán NPL 2-3 năm sau.", margin: "— (cơ cấu tín dụng hôm nay = bản đồ NPL 2028)" },
  ],

  revenueModel: [
    { name: "Thu nhập lãi thuần (NII)", vi: "Net Interest Income — 70-80% tổng thu nhập", desc: "NII = Tài sản sinh lãi × NIM. Hai động cơ: tăng trưởng tín dụng (bị room khống chế — nhóm 35% có lợi thế gấp đôi ngành) và NIM (đang đáy — quốc doanh cải thiện nhờ CASA, tư nhân còn chịu áp lực chi phí huy động). 2026 là năm 'volume bù margin' của ngành.", driver: "Room tín dụng · CASA & chi phí huy động · Mix bán lẻ/bán buôn", margin: "NIM 3.0-3.5% ngành; MBB/VCB/TCB nhóm trên nhờ CASA" },
    { name: "Thu nhập phí & dịch vụ", vi: "NFI — lợi nhuận không ăn vốn", desc: "Thanh toán, thẻ, banca (phục hồi sau siết), FX, tư vấn. Giá trị chiến lược: không cần room, không cần dự phòng, ROE biên gần vô hạn. Ngân hàng có hệ sinh thái (TCB với TCBS, MBB với MBS) hưởng thêm phí từ làn sóng thị trường vốn hậu nâng hạng FTSE.", driver: "Số hóa thanh toán · Banca hồi phục · Thị trường vốn sôi động", margin: "20-30% tổng thu nhập ở ngân hàng tốt — chất lượng cao nhất" },
    { name: "Hoàn nhập & thu hồi nợ đã xử lý", vi: "Recovery — mỏ lợi nhuận ẩn của chu kỳ này", desc: "Nợ đã xóa sổ (write-off) khi thu hồi được = lợi nhuận gộp 100%. Luật hóa NQ42 tăng tốc thu giữ tài sản đảm bảo (chủ yếu BĐS) — khi thị trường BĐS ấm lại, tài sản xiết nợ bán được giá → làn sóng hoàn nhập. CTG Q1/26 +63% một phần từ câu chuyện này.", driver: "Thanh khoản BĐS · Khung pháp lý thu giữ TSĐB · Kho nợ đã trích lập", margin: "Hoàn nhập = EPS thuần — ngân hàng LLR cao là 'kho lợi nhuận nén'" },
    { name: "Kinh doanh vốn & đầu tư", vi: "Treasury — TPCP, FX, phái sinh", desc: "Danh mục trái phiếu chính phủ + kinh doanh ngoại hối. Nhạy với chu kỳ lợi suất: lợi suất TPCP giảm = lãi đánh giá lại danh mục. Không phải động cơ chính nhưng tạo đệm thu nhập các quý tín dụng chậm.", driver: "Chu kỳ lợi suất TPCP · Biến động tỷ giá", margin: "Phụ trợ — không xây thesis trên dòng này" },
  ],

  kpis: [
    { term: "NIM Decomposition", full: "Phân rã biên lãi thuần — đọc đúng nguồn gốc NIM", def: "NIM = (Thu lãi − Chi lãi) / Tài sản sinh lãi bình quân. Phân rã: lợi suất tài sản (asset yield — phụ thuộc mix bán lẻ/bán buôn) − chi phí vốn (cost of funds — phụ thuộc CASA + lãi suất huy động). Hai ngân hàng cùng NIM 3.5% có thể khác hẳn nhau: một bên yield cao + vốn đắt (rủi ro hơn), một bên yield vừa + vốn rẻ (bền hơn).", howToRead: "NIM tăng do chi phí vốn giảm (CASA tăng) = chất lượng cao, bền. NIM tăng do yield tăng (đẩy mạnh cho vay rủi ro cao) = cần soi credit cost 2-4 quý sau. Bối cảnh 2026: quốc doanh NIM +23bps (CASA + tệp khách tốt) vs tư nhân −21bps (đua huy động) — phân hóa NIM đang nói lên phân hóa mô hình.", vnContext: "MBB CASA ~40% nhóm đầu hệ thống = mỗi đồng huy động rẻ hơn đối thủ 40-60bps → cùng cho vay một khách, MBB lãi dày hơn. Đây là moat cấu trúc khó đảo — CASA xây bằng hệ sinh thái (Viettel money flows, app) nhiều năm." },
    { term: "Asset Quality Trio: NPL + Nhóm 2 + LLR", full: "Bộ ba chất lượng tài sản — đọc cùng nhau, không tách rời", def: "NPL (nhóm 3-5): nợ xấu hiện hình. Nhóm 2 (quá hạn 10-90 ngày): NPL tương lai gần — leading indicator quan trọng hơn chính NPL. LLR (dự phòng/NPL): đệm hấp thụ — LLR >150% nghĩa là đã trích sẵn hơn cả nợ xấu hiện có. Công thức đọc: NPL thấp + nhóm 2 thấp + LLR cao = pháo đài; NPL thấp + nhóm 2 phình = bình yên giả tạo.", howToRead: "Theo dõi NPL formation (nợ xấu hình thành mới trong quý) thay vì chỉ số dư — số dư có thể 'đẹp' nhờ write-off mạnh. Bối cảnh tín dụng BĐS 25.5% hệ thống: soi kỹ tỷ trọng cho vay BĐS + trái phiếu BĐS từng ngân hàng; ngân hàng nào 'ít dây' với chủ đầu tư yếu sẽ đi qua chu kỳ êm hơn.", vnContext: "ACB NPL ~1.0% thấp nhất ngành + gần như không TPDN rủi ro — kỷ luật 'nói không' từ thời khủng hoảng 2012 thành văn hóa. VCB LLR >200%: mỗi đồng nợ xấu được che hơn 2 đồng dự phòng — kho lợi nhuận nén khi hoàn nhập. Đây là hai mô hình phòng thủ khác nhau cùng dẫn đến premium xứng đáng." },
    { term: "Room Game 35% vs 15%", full: "Cơ chế quota tín dụng — biến số alpha đặc sản Việt Nam", def: "NHNN cấp room tăng trưởng tín dụng từng ngân hàng. 2026: mặt bằng ~11-15%, riêng nhóm nhận chuyển giao bắt buộc ngân hàng 0 đồng (VCB nhận CBBank, MBB nhận OceanBank, VPB nhận GPBank, HDB nhận DongABank) được ~35%. Toán đơn giản: cùng NIM, ngân hàng room 35% tăng NII nhanh gấp 2-3 lần đối thủ — kéo dài suốt thời gian tái cơ cấu (5-10 năm).", howToRead: "Chi phí của deal: gánh lỗ lũy kế + vận hành ngân hàng yếu (đã được khoanh, hỗ trợ thanh khoản 0%). Lợi ích: room vượt trội + tài sản/mạng lưới giá rẻ + 'điểm chính trị' với NHNN. Net-net dương rõ cho MBB/VPB/HDB (ngân hàng nhận nhỏ so với quy mô mẹ). Theo dõi: room thực được cấp đầu năm + tốc độ dùng room qua từng quý.", vnContext: "Đây là lý do cấu trúc MBB PBT 2026E ~40.000 tỷ (+17%) khi ngành chỉ +8-12%: room 35% × CASA rẻ nhất = công thức compound NII mạnh nhất hệ thống. P/B fw ~1.4x cho ROE ~20% + tăng trưởng vượt ngành = định giá chưa phản ánh hết lợi thế room." },
    { term: "Credit Cost & Provision Buffer", full: "Chi phí tín dụng + kho dự phòng — nơi giấu và lộ lợi nhuận", def: "Credit cost = trích lập dự phòng ròng / dư nợ bình quân (0.5-1.5% tùy khẩu vị). Đây là biến số 'điều tiết được' trong ngắn hạn: ngân hàng thận trọng trích vượt yêu cầu (LLR cao) = giấu lợi nhuận; khi chu kỳ thuận, hoàn nhập = lợi nhuận 'tự nhiên' xuất hiện. ROE báo cáo của hai ngân hàng chỉ so được khi chuẩn hóa credit cost.", howToRead: "Chuẩn hóa: lấy PPOP (lợi nhuận trước dự phòng) làm thước so sức khỏe kinh doanh cốt lõi, rồi xét credit cost riêng. Ngân hàng PPOP tăng đều + credit cost cao bất thường = lợi nhuận tương lai đang được 'ướp'; PPOP đi ngang + credit cost thấp bất thường = lợi nhuận đang được 'vay mượn' từ tương lai. CTG Q1/26 +63% có phần hoàn nhập — kiểm tra PPOP để biết phần bền.", vnContext: "Chu kỳ 2026-27 của quốc doanh là câu chuyện hoàn nhập: kho dự phòng trích đậm 2020-2023 + BĐS ấm lại giúp xử lý TSĐB + luật hóa NQ42 tăng tốc thu giữ → dòng hoàn nhập nhiều quý. Ai cầm VCB/CTG/BID đang cầm 'trái phiếu chuyển đổi' trên sự phục hồi của thị trường tài sản." },
    { term: "LDR & Funding Stress", full: "Tỷ lệ cho vay/huy động — nhiệt kế thanh khoản hệ thống", def: "LDR = Dư nợ / Huy động. Hệ thống ~115% (cho vay nhiều hơn huy động — phần chênh bù bằng vốn liên ngân hàng, giấy tờ có giá). LDR càng căng, cuộc đua lãi suất huy động càng nóng → chi phí vốn tăng → NIM toàn ngành bị nén. Đây là lý do vĩ mô khiến NIM 2025-26 ở đáy dù tín dụng tăng mạnh.", howToRead: "LDR căng là chuyện HỆ THỐNG nhưng tác động PHÂN HÓA: ngân hàng CASA cao + thương hiệu huy động mạnh (VCB, MBB) ít phải đua lãi suất; ngân hàng nhỏ phụ thuộc tiền gửi kỳ hạn chịu chi phí biên cao nhất. Theo dõi lãi suất huy động 12 tháng của nhóm NHTM nhỏ làm 'nhiệt kế stress' — khi nhóm này hạ được lãi suất, chu kỳ NIM ngành tạo đáy.", vnContext: "Tín dụng 2025 tăng ~18% vs huy động tăng chậm hơn → LDR căng là di sản kéo sang 2026. Kịch bản NIM ngành phục hồi cần một trong hai: NHNN bơm thanh khoản mạnh hơn (phụ thuộc tỷ giá cho phép) hoặc tăng trưởng tín dụng tự giảm tốc về cân bằng huy động." },
    { term: "Justified P/B", full: "P/B hợp lý theo ROE — khung định giá chuẩn ngành tài chính", def: "Công thức: P/B hợp lý = (ROE − g) / (COE − g), với COE ~13-14% tại VN, g = tăng trưởng dài hạn 5-7%. Ví dụ: ROE bền 20%, g 6%, COE 13.5% → P/B hợp lý ≈ (20−6)/(13.5−6) ≈ 1.87x. ROE 16% → ≈ 1.33x. Chênh lệch vài điểm ROE bền vững = chênh lệch 40-50% định giá hợp lý.", howToRead: "Ba lỗi thường gặp: (1) dùng ROE năm đỉnh làm ROE bền; (2) so P/B ngang hàng mà quên chất lượng tài sản (P/B 1.2x của ACB với NPL 1% khác hẳn P/B 1.2x của ngân hàng NPL 3% LLR mỏng); (3) quên pha loãng từ kế hoạch tăng vốn. Vẽ scatter P/B vs ROE 12 ngân hàng niêm yết → mã dưới đường hồi quy + chất lượng tài sản tốt = ứng viên thật.", vnContext: "Ứng dụng nhanh: MBB ROE ~20%, P/B fw ~1.4x < justified ~1.8-1.9x → chiết khấu có thể do lo ngại tập trung tín dụng nhóm khách lớn — chiết khấu thu hẹp khi lo ngại không thành hiện thực. ACB ROE ~20%+, P/B ~1.2x — rẻ có hệ thống so với chất lượng, phù hợp người cần 'ngủ ngon'. VCB premium 2.5x+ là giá của pháo đài LLR >200% + room 35%." },
  ],

  economics: [
    { title: "DuPont ngân hàng — phân rã ROE để biết mua gì và tránh gì", body: `ROE ngân hàng = [NIM + Thu phí/tài sản − Chi phí vận hành/tài sản − Credit cost] × Đòn bẩy (tài sản/vốn ~10-12x)

Bốn con đường đến cùng ROE 20% — chất lượng hoàn toàn khác nhau:

Đường 1 — NIM dày nhờ vốn rẻ (MBB, TCB): CASA cao → bền, đáng premium.
Đường 2 — NIM dày nhờ cho vay rủi ro cao (một số NH tiêu dùng): yield cao hôm nay, credit cost cao ngày mai → ROE 'vay mượn thời gian'.
Đường 3 — Credit cost thấp nhờ kỷ luật thật (ACB): NPL 1% qua nhiều chu kỳ → bền, nhưng thị trường hay quên trả premium cho sự nhàm chán.
Đường 4 — Credit cost thấp nhờ trích thiếu: LLR mỏng + nhóm 2 phình → quả bom hẹn giờ.

Checklist 4 bước trước khi mua bất kỳ ngân hàng nào:
1. PPOP/tài sản có tăng đều không? (sức khỏe kinh doanh cốt lõi)
2. NIM đến từ vốn rẻ hay yield rủi ro?
3. LLR đủ dày cho cơ cấu cho vay hiện tại chưa? (đặc biệt exposure BĐS)
4. ROE có tự nuôi được tăng trưởng + Basel III không, hay sẽ pha loãng?

→ Ngân hàng pass cả 4 với P/B dưới justified = mua. Ngành ngân hàng không cần đoán vĩ mô giỏi — cần kỷ luật lọc chất lượng.` },
    { title: "Game lý thuyết của room 35% — tại sao đây là alpha ít được định giá đúng", body: `Cơ chế chuyển giao bắt buộc tạo ra thỏa thuận ngầm giữa NHNN và 4 ngân hàng khỏe:

NHNN được gì: xử lý êm 4 ngân hàng 0 đồng không tốn ngân sách, không gây hoảng loạn.
Ngân hàng nhận được gì: room ~35% (gấp 2-3 lần ngành) + vay tái cấp vốn lãi suất 0% + không hợp nhất báo cáo tài chính ngân hàng yếu (lỗ không chạm P&L mẹ) + tương lai: bán/IPO ngân hàng con sau tái cơ cấu.

Tại sao thị trường định giá chưa đủ:
1. Room là lợi thế TÁI DIỄN nhiều năm, không phải one-off — nhưng P/E/P/B hiện tại chỉ nhìn 1 năm.
2. Lợi thế kép: room cao × chi phí vốn rẻ (đều là MBB/VCB) = tăng trưởng NII kép trên đối thủ, khoảng cách NỚI DẦN theo thời gian — hàm mũ, không tuyến tính.
3. Rủi ro deal (gánh nặng vận hành ngân hàng yếu) được khoanh kỹ hơn thị trường sợ.

Phép tính minh họa: hai ngân hàng cùng quy mô, cùng ROE. Ngân hàng A room 35%, B room 12%. Sau 5 năm, dư nợ A gấp ~1.8 lần B. Cùng NIM → NII gấp 1.8 lần → khoảng cách vốn hóa hợp lý phải nới tương ứng. Thị trường đang trả cho A premium bao nhiêu? Thường chỉ 10-20% — phần còn lại là alpha cho người kiên nhẫn.` },
    { title: "Ngân hàng × BĐS — đọc cặp đôi sinh tử của chu kỳ 2026-2028", body: `25.53% dư nợ hệ thống nằm ở BĐS (4.74 triệu tỷ, +36% YoY) — số phận hai ngành khóa vào nhau:

Kênh truyền dẫn xuôi (BĐS → Ngân hàng):
→ BĐS ấm: presale chạy → chủ đầu tư trả nợ đúng hạn → NPL không hình thành + TSĐB (chủ yếu là BĐS) giữ giá → LGD thấp → hoàn nhập dự phòng.
→ BĐS lạnh kéo dài: bond wall chủ đầu tư → nợ nhóm 2 phình → NPL hiện hình sau 2-4 quý → credit cost ăn ROE.

Kênh truyền dẫn ngược (Ngân hàng → BĐS):
→ NHNN siết room BĐS ≤ 15% → chủ đầu tư yếu đói vốn → phân hóa BĐS gay gắt hơn → vòng lặp.

Hàm ý danh mục — ba cách chơi cặp đôi này:
1. Phòng thủ: ngân hàng ít exposure BĐS rủi ro + LLR dày (ACB, VCB) — thắng trong mọi kịch bản BĐS.
2. Đòn bẩy phục hồi: quốc doanh nhiều TSĐB chờ xử lý (CTG) — hoàn nhập lớn nếu BĐS thanh khoản trở lại.
3. Tránh: ngân hàng tập trung cho vay chủ đầu tư yếu/TPDN BĐS lớn mà LLR mỏng.

→ Trước khi mua bất kỳ cổ phiếu ngân hàng nào, câu hỏi bắt buộc: 'BĐS 2027 đóng băng lần nữa thì ngân hàng này mất bao nhiêu ROE?' Ngân hàng trả lời được câu này bằng số liệu công khai (thuyết minh exposure) là ngân hàng đáng tin.` },
  ],

  valuation: {
    method: "Justified P/B = (ROE bền − g)/(COE − g) là neo chính — dùng ROE chuẩn hóa qua chu kỳ (chuẩn hóa credit cost), KHÔNG dùng ROE năm đỉnh/đáy. Scatter P/B vs ROE 12 ngân hàng niêm yết tìm mã dưới đường hồi quy + pass checklist chất lượng tài sản. Lớp hai: P/PPOP (giá/lợi nhuận trước dự phòng) để so sức khỏe cốt lõi bỏ qua nhiễu trích lập. Điều chỉnh: kế hoạch tăng vốn (pha loãng), giá trị 'kho dự phòng' LLR vượt 100% như tài sản ẩn, và option value room 35% cho nhóm chuyển giao.",
    notes: [
      "Không so P/B ngang hàng khi chất lượng tài sản khác nhau — P/B 1.2x của ACB (NPL 1%) và P/B 1.2x của ngân hàng NPL 3% LLR mỏng là hai tài sản khác loài.",
      "Quốc doanh có lớp định giá riêng: câu chuyện tăng vốn (phát hành riêng lẻ cho nước ngoài) vừa là catalyst vừa là nguồn pha loãng — theo dõi tiến độ từng deal.",
      "Ngân hàng là proxy có đòn bẩy của VN-Index (35-40% vốn hóa): FTSE flows 21/9/2026 chảy vào rổ = ngân hàng nhận phần lớn nhất một cách cơ học.",
    ],
    scenarios: {
      bull: "NIM ngành tạo đáy rồi hồi khi lãi suất huy động hạ nhiệt + BĐS thanh khoản trở lại kích hoạt làn sóng hoàn nhập + FTSE flows vào rổ (ngân hàng chiếm tỷ trọng lớn nhất) → ROE nhóm đầu lên 21-23%, P/B re-rate: MBB về justified 1.8x+, ACB 1.5x, nhóm quốc doanh hoàn nhập lớn. Ngành tăng 40-60% trong 18-24 tháng.",
      base: "Tín dụng +14-16%, NIM đi ngang vùng đáy, NPL nhích nhẹ nhưng trong tầm LLR → lợi nhuận ngành +12-18% nhờ volume; nhóm room 35% +17-20%. Định giá giữ nguyên → return theo tăng trưởng lợi nhuận + cổ tức 2-4%. Phân hóa tiếp tục: chất lượng cao outperform.",
      bear: "BĐS đóng băng lần hai (lãi vay mua nhà tiếp tục tăng) → bond wall chủ đầu tư vỡ → NPL formation tăng mạnh từ H2/2027, credit cost ăn 3-5 điểm ROE toàn ngành → P/B nén về 1.0-1.1x trung bình ngành, giảm 25-35%. Trú ẩn: ACB/VCB (LLR dày, ít exposure rủi ro) giảm nông hơn và phục hồi trước — đúng vai trò 'cyclical-defensive'.",
    },
  },

  watchList: [
    { metric: "Tăng trưởng tín dụng toàn hệ thống + từng NH theo tháng/quý", source: "NHNN / BCTC quý", freq: "Hàng tháng", signal: "Tốc độ dùng room — nhóm 35% dùng nhanh = NII compound đúng kịch bản." },
    { metric: "NIM và chi phí huy động theo quý", source: "BCTC / thuyết minh", freq: "Hàng quý", signal: "Lãi suất huy động NHTM nhỏ hạ nhiệt = đáy NIM ngành xác nhận — tín hiệu vào mạnh." },
    { metric: "NPL formation + nợ nhóm 2 + LLR từng NH", source: "BCTC quý", freq: "Hàng quý", signal: "Nhóm 2 phình 2 quý liên tiếp = NPL tương lai — cảnh báo sớm hơn NPL chính thức." },
    { metric: "Thanh khoản BĐS + tiến độ xử lý TSĐB (luật hóa NQ42)", source: "Bộ XD / tin xử lý nợ", freq: "Hàng quý", signal: "BĐS ấm = mở van hoàn nhập cho nhóm LLR cao (VCB, CTG) — catalyst lợi nhuận ẩn." },
    { metric: "Tiến độ tăng vốn quốc doanh + deal phát hành nước ngoài", source: "Công bố thông tin / NHNN", freq: "Theo sự kiện", signal: "Deal thành công giá tốt = re-rate cả nhóm quốc doanh; trễ = nén tăng trưởng tài sản." },
    { metric: "Tỷ giá USD/VND + lãi suất điều hành NHNN", source: "NHNN / thị trường", freq: "Hàng tuần", signal: "Tỷ giá căng = NHNN không thể nới thanh khoản = NIM ngành tiếp tục bị nén — điều kiện biên của cả thesis." },
  ],
},

}; // end DATA

// ── UI COMPONENTS ─────────────────────────────────

function Tag({ label, color }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 500, color, border: "0.5px solid " + color, padding: "1px 6px", borderRadius: 3, background: color + "15" }}>{label}</span>
  );
}

function TermCard({ item, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ border: "1px solid " + (open ? accent : "var(--border)"), borderRadius: 8, overflow: "hidden", cursor: "pointer", background: open ? "var(--surface-1)" : "var(--surface-2)", marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 14px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13, color: accent }}>{item.term}</span>
          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{item.full}</span>
        </div>
        <span style={{ color: accent, fontSize: 16, flexShrink: 0, marginLeft: 6 }}>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 14px 14px", borderTop: "1px solid " + accent + "33" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, lineHeight: 1.6 }}>{item.def}</p>
          <div style={{ background: accent + "10", border: "0.5px solid " + accent + "44", borderRadius: 6, padding: "8px 10px", marginBottom: 6 }}>
            <div style={{ fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Cách đọc số liệu</div>
            <p style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>{item.howToRead}</p>
          </div>
          <div style={{ background: "var(--surface-0)", borderRadius: 6, padding: "8px 10px" }}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Bối cảnh VN (mid-2026)</div>
            <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{item.vnContext}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function EconCard({ item, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ border: "1px solid " + (open ? accent : "var(--border)"), borderRadius: 8, overflow: "hidden", cursor: "pointer", background: open ? "var(--surface-1)" : "var(--surface-2)", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-primary)" }}>{item.title}</span>
        <span style={{ color: accent, fontSize: 16, flexShrink: 0, marginLeft: 8 }}>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div style={{ padding: "0 14px 14px", borderTop: "1px solid " + accent + "33" }}>
          {item.body.split("\n").map((line, i) => (
            <p key={i} style={{ fontSize: 12, color: line.startsWith("→") ? accent : "var(--text-secondary)", lineHeight: 1.7, margin: "2px 0", fontWeight: line.startsWith("→") ? 500 : 400 }}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function ChainRow({ s, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 22, flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 13 }} />
        <div style={{ width: 2, flex: 1, background: accent + "44", minHeight: 8 }} />
      </div>
      <div style={{ flex: 1, padding: "8px 0 8px 10px", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: accent, marginBottom: 2 }}>{s.step}</div>
        <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 3px 0" }}>{s.desc}</p>
        {s.margin && <div style={{ fontSize: 10, color: accent, fontStyle: "italic" }}>▸ {s.margin}</div>}
      </div>
    </div>
  );
}

function RevenueCard({ item, accent }) {
  return (
    <div style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 8, padding: "12px 14px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: accent, marginBottom: 1 }}>{item.name}</div>
      <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 8 }}>{item.vi}</div>
      <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 8 }}>{item.desc}</p>
      <div style={{ fontSize: 11, color: "var(--text-primary)", marginBottom: 4 }}><span style={{ color: "var(--text-muted)" }}>Driver: </span>{item.driver}</div>
      <div style={{ background: accent + "18", borderRadius: 4, padding: "3px 8px", fontSize: 11, color: accent, fontWeight: 500 }}>{item.margin}</div>
    </div>
  );
}

function PositioningPanel({ p, accent }) {
  if (!p) return null;
  const rows = [
    ["Quy mô thị trường (TAM)", p.marketSize],
    ["Vai trò toàn cầu", p.globalRole],
    ["Vị thế Việt Nam", p.vnPosition],
    ["Pha chu kỳ hiện tại", p.cyclePosition],
    ["Liên kết liên ngành", p.linkages],
  ];
  return (
    <div style={{ background: "var(--surface-1)", border: "0.5px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
      {rows.map(([label, text], i) => (
        <div key={i} style={{ padding: "10px 14px", borderBottom: "0.5px solid var(--border)", background: i % 2 === 0 ? "var(--surface-2)" : "var(--surface-1)" }}>
          <div style={{ fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{label}</div>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{text}</p>
        </div>
      ))}
      <div style={{ padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Đại diện niêm yết chính</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {p.keyPlayers.map((pl, i) => (
            <div key={i} style={{ fontSize: 11, color: "var(--text-primary)", background: accent + "10", border: "0.5px solid " + accent + "33", padding: "5px 9px", borderRadius: 4 }}>{pl}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValuationPanel({ v, accent }) {
  if (!v) return null;
  const scen = [
    ["🟢 BULL", v.scenarios.bull, "#1D7A46"],
    ["🟡 BASE", v.scenarios.base, "#8A6D00"],
    ["🔴 BEAR", v.scenarios.bear, "#A33030"],
  ];
  return (
    <div>
      <div style={{ background: accent + "12", border: "0.5px solid " + accent + "55", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Phương pháp định giá chuẩn ngành</div>
        <p style={{ fontSize: 12, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>{v.method}</p>
      </div>
      <div style={{ background: "var(--surface-1)", border: "0.5px solid var(--border)", borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Lưu ý thực chiến</div>
        {v.notes.map((n, i) => (
          <p key={i} style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 5px 0" }}>• {n}</p>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Kịch bản 2026-2028</div>
      {scen.map(([label, text, color], i) => (
        <div key={i} style={{ border: "0.5px solid " + color + "66", borderLeft: "3px solid " + color, borderRadius: 6, padding: "9px 12px", marginBottom: 6, background: color + "0A" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color, marginBottom: 3 }}>{label}</div>
          <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function WatchRow({ item, accent }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2.5fr", padding: "8px 12px", gap: 8, borderTop: "0.5px solid var(--border)", alignItems: "start" }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-primary)" }}>{item.metric}</div>
        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{item.source}</div>
      </div>
      <div style={{ fontSize: 11, color: accent, fontWeight: 500 }}>{item.freq}</div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.signal}</div>
    </div>
  );
}

const INNER_TABS = ["Định vị ngành", "Chuỗi giá trị", "Mô hình DT", "KPI chuyên sâu", "Kinh tế ngành", "Định giá & Kịch bản", "Bảng theo dõi"];

function SectorView({ sid, accent }) {
  const [tab, setTab] = useState(0);
  const d = DATA[sid];
  if (!d) return <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Đang cập nhật...</p>;
  return (
    <div>
      <div style={{ background: accent + "14", border: "0.5px solid " + accent + "55", borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ marginBottom: 3 }}><Tag label={d.type} color={accent} /></div>
        <p style={{ fontSize: 12, color: "var(--text-secondary)", fontStyle: "italic", margin: 0 }}>{d.tagline}</p>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {INNER_TABS.map((t, i) => (
          <button key={i} onClick={() => { setTab(i); window.__scrollArticleToTop?.(); }} style={{ padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: tab === i ? 700 : 500, background: tab === i ? accent : "transparent", color: tab === i ? "#fff" : "var(--text-secondary)", border: "1px solid " + (tab === i ? accent : "var(--border)") }}>
            {t}
          </button>
        ))}
      </div>
      {tab === 0 && <PositioningPanel p={d.positioning} accent={accent} />}
      {tab === 1 && (
        <div style={{ background: "var(--surface-1)", border: "0.5px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10 }}>Dòng chảy giá trị + phân tích quyền lực (power dynamics) tại mỗi mắt xích.</div>
          {d.valueChain.map((s, i) => <ChainRow key={i} s={s} accent={accent} />)}
        </div>
      )}
      {tab === 2 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {d.revenueModel.map((item, i) => <RevenueCard key={i} item={item} accent={accent} />)}
        </div>
      )}
      {tab === 3 && (
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>Bấm mở rộng — định nghĩa + công thức · cách đọc · bối cảnh VN mid-2026.</div>
          {d.kpis.map((kpi, i) => <TermCard key={i} item={kpi} accent={accent} />)}
        </div>
      )}
      {tab === 4 && <div>{d.economics.map((item, i) => <EconCard key={i} item={item} accent={accent} />)}</div>}
      {tab === 5 && <ValuationPanel v={d.valuation} accent={accent} />}
      {tab === 6 && (
        <div style={{ border: "0.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2.5fr", background: accent + "18", padding: "8px 12px", fontSize: 10, color: accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>Chỉ số theo dõi</span><span>Tần suất</span><span>Tín hiệu đầu tư</span>
          </div>
          {d.watchList.map((item, i) => <WatchRow key={i} item={item} accent={accent} />)}
        </div>
      )}

      {tab < INNER_TABS.length - 1 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, paddingTop: 14, borderTop: "0.5px solid var(--border)" }}>
          <button
            onClick={() => { setTab(tab + 1); window.__scrollArticleToTop?.(); }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 15px", borderRadius: 8, border: "1px solid " + accent + "55", background: accent + "15", color: accent, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
          >
            Tiếp: {INNER_TABS[tab + 1]} →
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeSector, setActiveSector] = useState("steel");
  const current = SECTORS.find(s => s.id === activeSector);
  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "18px 14px 40px" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>Vietnam Industry Primers — Deep Edition</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>8 ngành · 7 lớp phân tích · Định giá + Kịch bản Bull/Base/Bear · Mid-2026</div>
      </div>
      <div className="mobile-static" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 16, position: "sticky", top: 0, zIndex: 10, background: "#fff", padding: "10px 0", borderBottom: "1px solid #eee" }}>
        {SECTORS.map(s => (
          <button key={s.id} onClick={() => { window.__scrollArticleToTop?.(); setActiveSector(s.id); }} style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500, textAlign: "center", background: activeSector === s.id ? s.accent : "var(--surface-1)", color: activeSector === s.id ? "#fff" : "var(--text-secondary)", border: "0.5px solid " + (activeSector === s.id ? s.accent : "var(--border)"), transition: "all 0.14s" }}>
            <span style={{ marginRight: 4 }}>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>
      {current && <SectorView sid={activeSector} accent={current.accent} />}
      <div style={{ marginTop: 18, background: "var(--surface-1)", border: "0.5px solid var(--border)", borderRadius: 8, padding: "10px 14px" }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 6 }}>Bản đồ phân loại nhanh — bấm để chuyển ngành</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
          {[
            { id: "steel", note: "Cuối đáy chu kỳ · P/B neo · HPG only" },
            { id: "fmcg", note: "Mọi lúc · P/E theo pricing power" },
            { id: "pharma", note: "GMP migration · Bear case nông nhất" },
            { id: "energy", note: "EV/EBITDA · Chờ IRR Đức Huệ 2" },
            { id: "restate", note: "RNAV discount · Chờ lãi vay đỉnh" },
            { id: "broker", note: "P/B-ROE · FTSE 21/9 · Beta 2x" },
            { id: "logistics", note: "SOTP · EV/EBITDA · China+1" },
            { id: "banking", note: "Justified P/B · Room 35% game" },
          ].map(({ id, note }) => {
            const s = SECTORS.find(x => x.id === id);
            return (
              <div key={id} onClick={() => { window.__scrollArticleToTop?.(); setActiveSector(id); }} style={{ background: "var(--surface-2)", borderRadius: 6, padding: "7px 9px", cursor: "pointer", border: "0.5px solid " + (activeSector === id ? s.accent : "var(--border)") }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: s.accent }}>{s.icon} {s.label}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>{note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
