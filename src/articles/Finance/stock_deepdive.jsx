import { useState } from "react";

/* ═══════════════════════════════════════════════════
   STOCK DEEP-DIVE — BỘ 8 MÃ + PHÂN TÍCH ĐỐI THỦ CẠNH TRANH
   HPG (Thép — P/B chu kỳ) · ACB (Ngân hàng — Justified P/B)
   GMD (Cảng — SOTP chuỗi quyền chọn) · MSN (Holding — SOTP 3 động cơ)
   DHG (Dược — Dividend model + quyền chọn sự kiện) · REE (Năng lượng — SOTP 5 mảnh)
   + BMP (Vật liệu XD — P/E + Dividend floor) · DBC (Chăn nuôi — Pig cycle trade)
   GMD và DHG có thêm sub-tab "Đối thủ cạnh tranh" (VGR/HAH và DBD/TRA/IMP)
   Dữ liệu: KQKD Q1-5T/2026 · báo cáo CTCK T3-7/2026
══════════════════════════════════════════════════ */

const STOCKS = {


hpg: {
  ticker: "HPG", name: "Tập đoàn Hòa Phát", sector: "Thép", accent: "#B34040", icon: "⚙️",
  rating: "MUA (tích lũy)", horizon: "12-24 tháng",
  snapshot: [
    ["Giá (01/07/2026)", "23,300đ"], ["52 tuần", "20,132 – 27,542đ"],
    ["Số CP (sau cổ tức 10%)", "~8.46 tỷ"], ["Vốn hóa", "~197 nghìn tỷ (~$7.7B)"],
    ["P/E fwd 2026 (core)", "8.2–10.4x vs TB 10 năm 10.5x"], ["P/B", "~1.24x (BVPS 18,867đ)"],
    ["ROE 2025 → đỉnh 2021", "10.7% → 33.5%"], ["Cổ tức 2025", "15% (5% tiền + 10% CP) · yield ~2.1%"],
  ],
  thesis: [
    { t: "Trụ 1 — Đòn bẩy quy mô lịch sử: Dung Quất 2 chạy trọn năm đầu tiên", d: "2026 là năm ĐẦU TIÊN DQ2 (5.6 triệu tấn HRC, vốn 85,000 tỷ) vận hành cả năm → tổng công suất thép thô 16 triệu tấn, công suất HRC 9 triệu tấn. Sản lượng 2026E: 15.2 triệu tấn (+28%). BVSC ước DQ2 full mang thêm ~$3.2B doanh thu/năm. Đây không phải kỳ vọng — dây chuyền đã lắp đặt xong, đang ramp-up, thép xây dựng tháng 5/2026 đã +32% YoY." },
    { t: "Trụ 2 — Bảo hộ kép: CBPG là quà chính sách hiếm có", d: "Thuế CBPG HRC Trung Quốc 19.38–27.83% (hiệu lực 21/2/2025) — 2026 là năm đầu áp trọn năm. Đang mở rộng điều tra sang HRC khổ rộng (chặn đường lách). Kết quả: HPG hấp thụ được sản lượng DQ2 vào thị trường nội địa thay hàng nhập, giữ được giá bán khi giá TQ biến động. Kết hợp tồn kho nguyên liệu giá rẻ (quặng, than giảm 5-7%) → biên gộp 2026E lên 17.3% (từ 15.7%)." },
    { t: "Trụ 3 — Chuỗi quyền chọn tăng trưởng chưa được định giá", d: "(1) Nhà máy ray & thép đặc biệt 700K tấn/năm (2027) gắn trực tiếp đường sắt cao tốc Bắc-Nam $67B — VN chưa ai sản xuất được; (2) DQSC2-HQWR +500K tấn thép dây cuộn chất lượng cao (Q2/2028), nâng DQ2 lên 6.1 triệu tấn; (3) Thoái vốn BĐS đã hiện thực hóa một phần Q1/26 (lãi one-off); (4) KCN Hòa Phát hưởng sóng FDI. Tại P/E fwd 8-10x, thị trường gần như trả 0 đồng cho các quyền chọn này — DCF ngược cho thấy giá 23.3K chỉ ngụ ý FCFF tăng ~5%/năm." },
  ],
  business: [
    { seg: "Thép xây dựng (long steel)", mix: "~35-40% DT", note: "Thị phần #1 (~38%). Miền Bắc chiếm ~50% sản lượng — hưởng trực tiếp đầu tư công + BĐS phía Bắc hồi phục. 2025: 4.9 triệu tấn (+9%), hiệu suất 83%. Tháng 5/2026: +32% YoY. Mảng ổn định nhất, moat địa lý." },
    { seg: "HRC — thép cuộn cán nóng", mix: "~35-40% DT (tăng nhanh)", note: "Động cơ tăng trưởng chính. 2025: 5 triệu tấn (+72%), đáp ứng 38% nhu cầu VN (Vietstock ước; hướng lên 60%+ khi DQ2 full). Giá HRC T4/26: $528.5/t (+18.9% YoY, đỉnh từ 7/2024) rồi điều chỉnh T6 — biến số theo dõi số 1. Khách hàng: HSG/NKG, ống thép, ô tô, container." },
    { seg: "Sản phẩm hạ nguồn & khác", mix: "~15-20% DT", note: "Ống thép + tôn mạ (#1 ống thép VN), thép dự ứng lực, container (500K TEU/năm thiết kế — dùng chính HRC SPA-H của DQ), nội thất, điện lạnh. Vai trò: hấp thụ HRC nội bộ, tăng giá trị/tấn." },
    { seg: "Nông nghiệp + BĐS/KCN", mix: "~5-10% DT nhưng tạo one-off lớn", note: "Chăn nuôi (heo, bò, trứng — top thị phần trứng miền Bắc), TACN. BĐS/KCN: lãi thoái vốn Q1/2026 là one-off đẩy LNST quý lên 9,056 tỷ (+170%) — khi định giá PHẢI tách phần này khỏi core." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025 (thực hiện)", "2026 KH công ty", "2026E consensus CTCK"],
    rows: [
      ["Doanh thu", "156–158K tỷ (+12%)", "210K tỷ", "204–222K tỷ (+29–42%)"],
      ["LNST báo cáo", "15.45K tỷ (+29%)", "22K tỷ", "25.9–28.5K tỷ (+68–85%, gồm one-off BĐS)"],
      ["LNST core (loại one-off)", "~15.4K tỷ", "—", "~21.9–22K tỷ (+42%)"],
      ["Sản lượng thép", "11.9M tấn", "—", "15.2M tấn (+28%)"],
      ["Biên gộp", "15.7%", "—", "17.3% (+2đ%)"],
      ["EPS fwd (8.46 tỷ CP sau pha loãng)", "~1,830đ", "~2,600đ", "~2,600đ core / ~3,100–3,375đ báo cáo"],
    ],
    drivers: "Ba biến số quyết định chất lượng lợi nhuận 2026: (1) Sản lượng HRC từng quý — thước đo ramp-up DQ2; (2) Biên gộp thép — kiểm chứng spread thuận lợi (giá bán ổn nhờ CBPG + nguyên liệu rẻ nhờ tồn kho trễ); (3) Giá HRC TQ — T6/2026 đã đảo chiều giảm do oversupply nội địa TQ, nếu kéo dài sẽ ép giá VN dù có thuế. Lưu ý pha loãng: 767.5 triệu CP mới từ cổ tức 10% — mọi so sánh EPS phải trên nền 8.46 tỷ CP.",
  },
  valuation: {
    methods: [
      "P/B through-cycle (neo chính): HPG dao động 0.8x (đáy 2022) → 2.5x+ (đỉnh 2021). Hiện ~1.24x — vùng giữa-thấp trong khi lợi nhuận đang ở pha PHỤC HỒI (không phải đỉnh) → hồ sơ rủi ro/lợi nhuận nghiêng thuận.",
      "P/E trên EPS core: 23,300 / 2,600 ≈ 9.0x fwd — dưới TB 10 năm (10.5x) cho năm ĐẦU của chu kỳ tăng trưởng mới với CAGR lợi nhuận core 2025-28 dự kiến ~29% (Vietcap) và 23% giai đoạn 2026-30 (Vietstock). PEG < 0.4 — hiếm.",
      "Kiểm chứng chéo EV/EBITDA ~6-7x fwd vs mục tiêu lịch sử 8x của SSI. DCF ngược: giá hiện tại chỉ ngụ ý FCFF +5%/năm — bỏ qua hoàn toàn DQ2 ramp + ray 2027.",
      "Lưu ý phương pháp: KHÔNG mua/bán theo P/E đơn thuần với cyclical (Peak P/E Trap) — nhưng hiện tại là pha ĐẦU phục hồi (EPS đang lên từ đáy), P/E thấp lúc này khác bản chất với P/E thấp ở đỉnh 2021.",
    ],
    brokers: [
      ["Vietcap (5/2026)", "MUA", "38,900đ", "Nâng dự phóng 2026-30; gồm lãi thoái vốn BĐS; total return 45.9%"],
      ["BSC (5/2026)", "MUA", "40,800đ", "LNST 28.5K tỷ (+85%); sản lượng 15.2M tấn; GPM 17.3%; chu kỳ HRC tăng từ Q2/26"],
      ["SSI (3/2026)", "MUA", "35,000đ", "Năm đầu DQ2 full-year + năm đầu CBPG trọn năm; DT/LNST +33%/+35%"],
      ["Vietstock/FCFF+P/B", "—", "33,200đ", "50:50 FCFF và P/B; CAGR lợi nhuận 23% giai đoạn 2026-2030"],
      ["Consensus (10 CTCK)", "Strong Buy 10/0", "~33,600đ", "Upside ~44% từ 23,300đ"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~30%", target: "37,000–41,000đ (+59–76%)", d: "TQ cắt sản lượng thật (chính sách chống 'nội quyển') + BĐS VN hồi rõ 2027 → giá HRC lên $560-600/t, spread mở rộng → LNST core 2027 ~30-33K tỷ, EPS ~3,700đ × P/E 10.5-11x. Ray 2027 COD đúng hạn thêm câu chuyện mới. Khớp vùng target Vietcap/BSC." },
    { label: "🟡 BASE — xác suất ~50%", target: "31,000–34,000đ (+33–46%)", d: "Giá HRC đi ngang $500-530/t, DQ2 ramp đúng tiến độ, sản lượng 15.2M tấn → LNST core ~22K tỷ 2026, ~26K tỷ 2027. EPS core 2027 ~3,050đ × P/E 10.5x ≈ 32K. Return chủ yếu từ tăng trưởng lợi nhuận, re-rating nhẹ. Khớp consensus 33.6K." },
    { label: "🔴 BEAR — xác suất ~20%", target: "19,000–21,500đ (−8–18%)", d: "TQ xuất khẩu phá giá mạnh hơn (oversupply T6/26 kéo dài) + BĐS VN không hồi + thuế Mỹ lan rộng → GPM về 13-14%, LNST core đi ngang ~16-17K tỷ → P/B nén về 1.0-1.1x BVPS ~19K. Cost moat giữ HPG có lãi nhưng cổ phiếu điều chỉnh. Downside hạn chế bởi P/B đáy lịch sử 0.8x = ~15K (kịch bản khủng hoảng 2022 lặp lại — xác suất thấp)." },
  ],
  risks: [
    "Giá HRC TQ giảm sâu kéo dài (oversupply TQ) — ép giá VN bất chấp CBPG; theo dõi SHFE hàng tuần",
    "Lợi nhuận Q1/26 có one-off thoái vốn BĐS — các quý sau nếu core không gánh được sẽ gây thất vọng kỳ vọng (rủi ro 'đọc nhầm' của thị trường)",
    "Pha loãng 10% cổ tức CP — EPS bị chia loãng nếu lợi nhuận không tăng tương ứng",
    "Nguyên liệu: quặng/than tăng đột biến làm nghịch đảo lợi thế tồn kho hiện tại (lag 1-2 quý)",
    "Chu kỳ BĐS nội địa hồi chậm hơn kỳ vọng — thép xây dựng mất động lực chính",
  ],
  catalysts: [
    ["Q3/2026", "KQKD Q2 (công bố ~cuối T7): kiểm chứng lợi nhuận CORE hậu one-off — sự kiện quan trọng nhất năm"],
    ["Q3-Q4/2026", "Kết luận điều tra CBPG mở rộng HRC khổ rộng — nếu áp = đóng nốt đường lách hàng TQ"],
    ["21/9/2026", "FTSE hiệu lực — HPG vốn hóa top đầu, nhận dòng passive lớn nhất nhóm vật liệu"],
    ["Q4/2026-2027", "Tiến độ nhà máy ray 700K tấn + gói thầu đường sắt cao tốc — mở định giá SOTP mảng thép đặc biệt"],
    ["Q2/2028", "DQSC2-HQWR +500K tấn thép dây chất lượng cao — tổng DQ2 lên 6.1M tấn"],
  ],
  checklist: [
    "Sản lượng HRC + thép XD hàng tháng (HPG công bố): ramp DQ2 đúng nhịp? Thép XD giữ được đà +30%?",
    "Biên gộp từng quý: giữ trên 16-17% = spread thuận; tụt về 14% = cảnh báo",
    "Giá HRC SHFE + giá HRC VN: hồi lại trên $530 = xác nhận bull; thủng $480 kéo dài = chuyển phòng thủ",
    "Tồn kho nguyên liệu (thuyết minh BCTC): 60-70 ngày là chuẩn; phình bất thường = rủi ro inventory loss",
    "Tiến độ ray + phê duyệt gói thầu đường sắt cao tốc: quyền chọn lớn nhất chưa được định giá",
  ],

  expert: {
    variant: "Consensus dồn toàn bộ tranh luận vào GIÁ THÉP — biến số không ai kiểm soát được. Variant perception: câu chuyện thật là EARNINGS POWER MID-CYCLE đã dịch lên vĩnh viễn một bậc. HPG 2026 khác HPG 2021 về cấu trúc: thêm 5.6M tấn HRC có CBPG bảo hộ + tự chủ 60% thị trường nội địa + pipeline thép đặc biệt biên cao. Nghĩa là ngay cả khi giá thép chỉ đi ngang, EPS chuẩn hóa đã cao hơn chu kỳ trước 40-60%. Ai chờ giá thép tăng mới mua là đang chờ tín hiệu SAI — tín hiệu đúng là volume và biên gộp từng quý.",
    strengths: [
      { h: "Kinh tế học kẻ-sống-sót-cuối-cùng (last man standing)", d: "Chi phí thấp nhất ĐNA nghĩa là ở ĐÁY chu kỳ HPG vẫn dương dòng tiền khi HSG/NKG và các lò EAF nhỏ lỗ. Mỗi downturn là một vòng consolidation: kẻ yếu đóng lò, HPG chiếm thị phần vĩnh viễn. Đây là compounder ngụy trang trong áo cyclical — thị phần thép dài đi từ ~25% (2018) lên ~38% qua đúng cơ chế này." },
      { h: "Track record phân bổ vốn 3/3 — hiếm nhất ngành nặng vốn", d: "Hải Dương, Dung Quất 1, Dung Quất 2: cả ba chu kỳ capex lớn đều đúng tiến độ, trong ngân sách, và tạo ROIC vượt WACC sau ramp. Xác suất tiên nghiệm cho dự án ray 2027 vì thế cao hơn hẳn mức thị trường đang gán. Chu kỳ capex vừa qua đỉnh → 2026-28 là pha FCF inflection: nợ giảm nhanh, dư địa tăng cổ tức tiền." },
      { h: "Chất lượng tăng trưởng 2026: volume-driven, không phải price-driven", d: "Tăng trưởng từ sản lượng (DQ2 ramp +28%) bền và ít đảo chiều hơn tăng trưởng từ giá. Phần one-off BĐS đã được nhận diện tách bạch — nghĩa là kỳ vọng có thể kiểm chứng từng quý bằng hai con số công khai: tấn tiêu thụ và biên gộp." },
      { h: "Định giá đang trả 0 đồng cho hai quyền chọn lớn", d: "DCF ngược tại 23.3K chỉ ngụ ý FCFF +5%/năm. Ray đường sắt cao tốc (thị trường độc quyền, gói thầu $67B) và thép đặc biệt HQWR đều chưa nằm trong giá. Với cyclical, mua khi quyền chọn miễn phí là cách duy nhất có margin of safety thật." },
    ],
    weaknesses: [
      { h: "Moat CHÍNH SÁCH chứ không phải moat SỞ HỮU", d: "CBPG là quà có điều kiện: phải qua review định kỳ, có thể thành quân bài mặc cả trong đàm phán thương mại. Nếu CBPG bị dỡ giữa lúc TQ dư cung, spread HPG nén ngay 30-50 USD/tấn. Cost moat là thật; policy moat là thuê — đừng nhầm hai thứ khi tính terminal value." },
      { h: "Beta và drawdown không dành cho tay yếu", d: "2021-22 HPG rơi ~70% từ đỉnh dù công ty không hề khủng hoảng. Với cổ phiếu chu kỳ vốn hóa lớn có tỷ lệ NĐT cá nhân cao, giá chạy trước và chạy quá cơ bản cả hai chiều. Position sizing phải giả định chịu được -30% mà không buộc bán." },
      { h: "Key-man risk chưa có lời giải công khai", d: "Các quyết định capex hàng tỷ đô tập trung vào Chủ tịch sáng lập; kế hoạch chuyển giao thế hệ chưa rõ ràng với thị trường. Đây là rủi ro đuôi ít được nhắc nhưng các quỹ tổ chức đều chiết khấu vào multiple." },
      { h: "Thói quen pha loãng đều đặn", d: "Cổ tức cổ phiếu ~10%/năm nghĩa là EPS phải tăng >10%/năm chỉ để đứng yên trên mỗi cổ phần. Trong pha tăng của chu kỳ điều này vô hại; trong pha đi ngang nó âm thầm bào mòn total return — lý do HPG dở tệ trong danh mục buy-and-hold xuyên chu kỳ nếu mua sai điểm." },
    ],
    verdict: "Vị thế: core cyclical 2-3 năm, vào từng phần (1/2 hiện tại, thêm khi biên gộp Q2 xác nhận >16.5% hoặc spread SHFE mở rộng 2 tháng liên tiếp). Size: chịu được -30%. Kỷ luật thoát: P/B chạm 2.0-2.2x hoặc xuất hiện đồng thời (P/E thấp + tất cả CTCK đồng thuận nâng target + capacity mới được công bố ồ ạt) — đó là chữ ký của đỉnh chu kỳ.",
  },
},

acb: {
  ticker: "ACB", name: "Ngân hàng TMCP Á Châu", sector: "Ngân hàng", accent: "#1E5AA8", icon: "🏦",
  rating: "MUA (tích lũy — phòng thủ có upside)", horizon: "12-24 tháng",
  snapshot: [
    ["Giá tham chiếu (cuối T6/2026)", "~22,800đ"], ["P/B fwd 2026", "~1.0–1.2x — rẻ như đáy 2022"],
    ["P/E fwd", "~6.0x — thấp hơn hẳn TB 5 năm"], ["NPL", "0.97% — thấp nhất ngành, thấp nhất của ACB từ 2023"],
    ["LLR", "~114% · Credit cost chỉ 0.4%"], ["CIR", "<33% — nhóm hiệu quả nhất hệ thống"],
    ["Room ngoại", "Hở 4.7% — hàng hiếm với NĐT ngoại"], ["Cổ tức 2025", "20% (tiền + CP), chia ngay Q2/2026"],
  ],
  thesis: [
    { t: "Trụ 1 — 'Kho lợi nhuận nén': 2025 trích lập đậm là nạp đạn, không phải suy yếu", d: "LNTT 2025 đạt 19.5K tỷ, chỉ 85% kế hoạch — lần đầu 'lỡ hẹn' sau hơn một thập kỷ. Nhưng đọc kỹ: nguyên nhân là CHỦ ĐỘNG hạ lãi suất cạnh tranh giành khách + tăng mạnh trích lập dự phòng, trong khi NPL lại GIẢM về 0.97% (thấp nhất từ 2023). Chủ tịch nói thẳng tại ĐHĐCĐ: 'bộ đệm đã đủ dày, sẽ hỗ trợ khả năng sinh lời 2026 khi thu hồi nợ hiệu quả'. Đây là pattern kinh điển của DuPont ngân hàng: PPOP khỏe + credit cost tạm cao = lợi nhuận được ướp cho tương lai. 2026: chi phí tín dụng chỉ còn 0.4% → mỗi đồng hoàn nhập rơi thẳng vào EPS." },
    { t: "Trụ 2 — Chất lượng tài sản là biên an toàn định giá, không chỉ là đức tính", d: "NPL 0.97% + LLR 114% + phần lớn danh mục có TSĐB + gần như không TPDN rủi ro (kỷ luật từ 2012 thành văn hóa). Trong kịch bản BĐS đóng băng lần 2 (bear case ngành), ACB là ngân hàng mất ít ROE nhất — downside nông nhất nhóm tư nhân. Với P/B ~1.0-1.2x (vùng đáy lịch sử 2022 — thời điểm khủng hoảng thật), thị trường đang định giá ACB như thể sắp có khủng hoảng, trong khi bảng cân đối nói điều ngược lại. Chênh lệch giữa giá và chất lượng = biên an toàn." },
    { t: "Trụ 3 — Ba mũi tăng tốc 2026: tín dụng 16% + hệ sinh thái + câu chuyện cổ đông", d: "(1) KH 2026: tín dụng +16%, LNTT 22.3K tỷ (+14%) — Q1 đã đạt 5.4K tỷ (+17%), đúng nhịp; (2) Mở công ty bảo hiểm phi nhân thọ bán trên nền tảng ACB + ACBS chưa IPO (quyền chọn ẩn khi làn sóng CTCK IPO đang nóng — TCBS vừa IPO thành công); (3) Hở room ngoại 4.7% + tin đồn tái cấu trúc cổ đông lớn (Capital Group–VinaCapital) — dòng FTSE sau 21/9 tìm ngân hàng chất lượng còn room sẽ gặp ACB đầu danh sách." },
  ],
  business: [
    { seg: "Cho vay bán lẻ & SME", mix: "~65% danh mục — DNA của ACB", note: "Ngân hàng bán lẻ thuần nhất hệ thống: cá nhân (mua nhà, hộ KD) + SME, rủi ro phân tán, phần lớn có TSĐB. Điểm yếu chu kỳ này: bán lẻ phục hồi chậm khi lãi vay cao — nhưng đây chính là mảng bật mạnh nhất khi lãi suất hạ. Beta thuận với chu kỳ tiêu dùng đang ở đáy." },
    { seg: "Thu nhập lãi thuần (NII)", mix: "~75-80% tổng thu nhập", note: "NIM ~2.8% — dưới trung bình nhóm tư nhân top (MBB/TCB 3.5%+) do khẩu vị an toàn + chủ động hạ lãi suất giành khách 2025. Đòn bẩy 2026: nếu CASA cải thiện + lãi suất huy động hạ nhiệt → NIM hồi 10-20bps = hàng nghìn tỷ NII thêm với danh mục ~600K+ tỷ." },
    { seg: "Thu nhập ngoài lãi", mix: "~20-25% và tăng dần", note: "Phí dịch vụ + FX là động lực mới (CIR <33% cho thấy vận hành số hóa tốt). Sắp thêm: bảo hiểm phi nhân thọ tự phân phối (thay vì chỉ hưởng hoa hồng banca) — mô hình tập đoàn tài chính 2025-2030." },
    { seg: "ACBS + hệ sinh thái", mix: "Quyền chọn chưa định giá", note: "Công ty chứng khoán con hưởng trọn chu kỳ thanh khoản hậu nâng hạng. Chưa IPO (ĐHĐCĐ xác nhận chưa vội) — nhưng mỗi thương vụ IPO CTCK thành công của đối thủ (TCBS) đều nâng mốc định giá tham chiếu cho ACBS trong SOTP." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025 (thực hiện)", "KH 2026", "Ghi chú"],
    rows: [
      ["LNTT", "19.5K tỷ (85% KH)", ">22.3K tỷ (+14%)", "Q1/26: 5.4K tỷ (+17%) — chạy trước kế hoạch"],
      ["Tăng trưởng tín dụng", "~16-18%", "16%", "Q1 đã +3.2% — đúng nhịp mùa vụ"],
      ["NIM", "~2.8% (đáy)", "ổn định → hồi nhẹ", "MBS giả định ~2.8%; upside nếu chi phí vốn hạ"],
      ["NPL / LLR", "0.97% / ~114%", "duy trì <1.1%", "Nợ nhóm 2 là chỉ số theo dõi sớm"],
      ["Credit cost", "cao (trích chủ động)", "~0.4%", "Nguồn 'hoàn lực' cho ROE 2026-27"],
      ["ROE", "~15-16% (bị nén bởi trích lập)", "hồi về 17-18%", "Mốc tái định giá: ROE về 20% → P/B xứng đáng 1.6x+"],
    ],
    drivers: "Ba câu hỏi quyết định năm 2026 (theo đúng khung TheLEADER đặt ra): (1) CASA có cải thiện không — quyết định NIM hồi hay tiếp tục đáy; (2) Lợi nhuận tăng đúng KH mà KHÔNG hạ chuẩn tín dụng — kiểm chứng qua yield danh mục vs NPL formation; (3) Nợ nhóm 2 không chuyển hóa thành nợ xấu — leading indicator quan trọng nhất. Trả lời tốt cả 3 → P/B thoát vùng đáy; trả lời xấu 1 trong 3 → định giá neo tại chỗ.",
  },
  valuation: {
    methods: [
      "Justified P/B (neo chính): ROE bền ~17-18% hiện tại → P/B hợp lý = (17.5−6)/(13.5−6) ≈ 1.53x. Nếu ROE hồi về 20% (mức lịch sử của chính ACB): ≈ 1.87x. Thị giá đang 1.0-1.2x → chiết khấu 25-45% so với giá trị hợp lý theo chính công thức chuẩn ngành.",
      "P/E fwd ~6.0x — thấp bất thường cho ngân hàng NPL <1%: thị trường đang trả giá 'ngân hàng trung bình' cho bảng cân đối tốt nhất nhóm tư nhân.",
      "So sánh tương quan (scatter P/B vs ROE 27 ngân hàng): ACB nằm DƯỚI đường hồi quy — ROE cao hơn trung bình ngành nhưng P/B không premium. MBS: kỳ vọng định giá về ngang MBB/TCB/VPB khi tín dụng bán lẻ phục hồi.",
      "Residual Income (Casin/KBSV đều dùng bổ trợ): cho kết quả tương đương vùng 32-33K nhờ vốn chủ dày + chi phí vốn thấp.",
    ],
    brokers: [
      ["MBS (2/6/2026)", "KHẢ QUAN", "33,700đ", "P/B mục tiêu 1.6x trên BV blend 2026/27 (25/75); NIM ~2.8%; credit cost 0.4%"],
      ["Casin (5/2026)", "—", "32,500đ", "P/B mục tiêu 1.5x; tăng trưởng LN 15-18%; Residual Income cho kết quả tương đương"],
      ["BSC (5/2026)", "MUA (nâng hạng KN)", "27,100đ", "Thận trọng hơn; nhấn mạnh định giá rẻ như 2022, hở room ngoại 4.7%"],
      ["Khoảng target", "—", "27,100–33,700đ", "Upside 19–48% từ ~22,800đ — cả dải đều dương"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~30%", target: "31,000–34,000đ (+36–49%)", d: "Bán lẻ phục hồi khi lãi suất hạ từ 2027 + CASA cải thiện + hoàn nhập từ bộ đệm 2025 + FTSE flows tìm ngân hàng hở room → ROE hồi 19-20%, thị trường trả justified P/B 1.5-1.6x trên BVPS fwd ~21-22K. Câu chuyện cổ đông chiến lược ngoại (nếu thành sự thật) là booster thêm. Khớp target MBS/Casin." },
    { label: "🟡 BASE — xác suất ~50%", target: "27,000–29,000đ (+18–27%)", d: "LNTT đạt KH 22.3K tỷ (+14%), NIM đi ngang 2.8%, NPL giữ ~1% → ROE 17-18%, P/B re-rate một phần về 1.3x. Return = tăng BVPS ~15%/năm + thu hẹp chiết khấu nhẹ + cổ tức. Đây là kịch bản 'ngân hàng nhàm chán làm đúng việc' — khớp BSC 27.1K." },
    { label: "🔴 BEAR — xác suất ~20%", target: "19,500–21,000đ (−8–14%)", d: "Bán lẻ tiếp tục yếu (lãi vay cao kéo dài) + nợ nhóm 2 chuyển hóa xấu + NIM nén tiếp → LNTT chỉ +5-8%, ROE kẹt 15% → P/B giữ đáy 0.95-1.0x. Lưu ý: đây là bear case NÔNG nhất trong các cổ phiếu ngân hàng — chính vì điểm khởi hành đã là định giá khủng hoảng trong khi bảng cân đối là pháo đài. Bất đối xứng thuận: bear −10% vs bull +40%." },
  ],
  risks: [
    "Bán lẻ phục hồi chậm hơn kỳ vọng — ACB là proxy tiêu dùng, lãi vay mua nhà +3-4% năm 2026 đè trực tiếp",
    "NIM 2.8% có thể nén thêm nếu cuộc đua huy động gay gắt (LDR hệ thống ~115%)",
    "Tin đồn thay đổi cổ đông lớn hai mặt: kỳ vọng tạo sóng nhưng bất định quản trị nếu diễn biến xấu",
    "Không có room 35% như MBB/VCB/VPB/HDB — tăng trưởng tín dụng bị neo 16%, thua nhóm chuyển giao về volume",
    "ROE 15-16% hiện tại nếu KHÔNG hồi về 18-20% thì luận điểm justified P/B 1.5x mất chân đứng",
  ],
  catalysts: [
    ["Q2/2026 (đang diễn ra)", "Chia cổ tức 20% (tiền + CP) — đã chốt tại ĐHĐCĐ, thực hiện ngay Q2"],
    ["T7-8/2026", "KQKD Q2: kiểm chứng 3 câu hỏi (CASA, chuẩn tín dụng, nợ nhóm 2) — định hướng cả năm"],
    ["21/9/2026", "FTSE hiệu lực — ngân hàng nhận tỷ trọng lớn nhất rổ; ACB hở room 4.7% là điểm đến tự nhiên của dòng ngoại"],
    ["Q4/2026-2027", "Ra mắt công ty bảo hiểm phi nhân thọ — mảnh ghép tập đoàn tài chính, nguồn phí mới"],
    ["2027+", "Quyền chọn IPO ACBS khi định giá CTCK thuận (mỗi IPO CTCK thành công nâng mốc tham chiếu)"],
  ],
  checklist: [
    "Nợ nhóm 2 từng quý: KHÔNG phình 2 quý liên tiếp — kill-switch của thesis chất lượng tài sản",
    "CASA + chi phí huy động: cải thiện = NIM tạo đáy = tín hiệu vào thêm",
    "Tốc độ dùng room 16%: đều đặn ~4%/quý là lành mạnh; dồn cục cuối năm = ép chỉ tiêu",
    "Hoàn nhập/thu hồi nợ đã xử lý: dòng 'lợi nhuận ướp' 2025 bắt đầu chảy ra chưa?",
    "Diễn biến cơ cấu cổ đông + tỷ lệ sở hữu ngoại: xác nhận hay bác bỏ câu chuyện chiến lược",
  ],

  expert: {
    variant: "Consensus: ACB tốt nhưng nhàm chán, thiếu câu chuyện room 35%, thiếu hệ sinh thái — nên xứng đáng P/B thấp. Variant perception: chính SỰ VẮNG MẶT CỦA RỦI RO là tài sản đang được định giá bằng 0. Chu kỳ NPL ngành nhiều khả năng xấu dần từ 2027 (di chứng tín dụng BĐS +36%/năm); khi đó thị trường sẽ trả premium cho ngân hàng duy nhất đã được kiểm toán bởi hai cuộc khủng hoảng (2012, 2022-23) mà không gãy. Mua ACB hôm nay là mua bảo hiểm chu kỳ được TRẢ TIỀN để giữ — với P/E 6x và bất đối xứng bear -10% vs bull +40%.",
    strengths: [
      { h: "Văn hóa thẩm định là moat không sao chép được bằng tiền", d: "NPL 0.97% qua nhiều chu kỳ không phải may mắn — là hệ quả của danh mục retail/SME phân tán, có TSĐB, và văn hóa nói-không với TPDN rủi ro từ sau 2012. Ngân hàng khác cần 10 năm và một cuộc khủng hoảng để xây được điều này." },
      { h: "Kho lợi nhuận nén nhìn thấy được bằng số", d: "Trích lập vượt yêu cầu 2025 trong khi NPL giảm = dự phòng thừa sẽ quay lại P&L dưới dạng hoàn nhập khi chu kỳ thuận. PPOP vẫn tăng đều — sức khỏe kinh doanh cốt lõi chưa bao giờ suy giảm, chỉ có kế toán thận trọng che nó đi." },
      { h: "Ba quyền chọn miễn phí trên một nền định giá đáy", d: "ACBS IPO (mỗi thương vụ IPO CTCK thành công nâng mốc tham chiếu), công ty bảo hiểm phi nhân thọ mới, và 4.7% room ngoại hở — hàng hiếm khi dòng FTSE cần mua ngân hàng chất lượng. Tại P/B 1.0-1.2x, cả ba đều chưa nằm trong giá." },
      { h: "Toán bất đối xứng hiếm có trong nhóm bank", d: "Justified P/B tại ROE 17.5% là 1.53x; tại ROE 20% (mức lịch sử của chính ACB) là 1.87x. Thị giá 1.0-1.2x nghĩa là kịch bản cơ sở đã cho upside 25-45%, trong khi bear case chỉ -10% nhờ chất lượng tài sản. Ít cổ phiếu ngân hàng nào có tỷ lệ thưởng/phạt như vậy." },
    ],
    weaknesses: [
      { h: "Khuyết tật tăng trưởng cấu trúc — và nó là vĩnh viễn trong cơ chế room", d: "Không nhận ngân hàng 0 đồng nghĩa là không bao giờ có room 35%. Trong ngành mà lợi nhuận = f(tăng trưởng tín dụng kép), ACB bị khóa ở 16% khi MBB/VPB chạy 30%+. Sau 5 năm, khoảng cách quy mô nới theo hàm mũ — ACB thắng về chất nhưng thua về lượng, và thị trường VN thường trả giá cho lượng." },
      { h: "NIM 2.8% là mặt trái của chính sự an toàn", d: "Danh mục rủi ro thấp = lợi suất thấp; CASA không thuộc top đầu = chi phí vốn không có moat. Nếu cuộc đua huy động kéo dài (LDR hệ thống 115%), NIM ACB bị nén trước và hồi sau so với MBB/VCB." },
      { h: "Thesis phụ thuộc một biến vĩ mô ngoài kiểm soát", d: "ACB là proxy tiêu dùng-bán lẻ: luận điểm cần lãi suất tạo đỉnh và bán lẻ hồi. Nếu lãi vay cao kéo dài hết 2027, ROE kẹt 15-16% và justified P/B mất chân đứng — cổ phiếu rẻ có thể rẻ thêm 2 năm nữa (value trap tạm thời)." },
      { h: "Chuyển giao quyền lực cổ đông là ẩn số quản trị thật", d: "Tin đồn thay máu cổ đông lớn hai mặt: nếu diễn ra êm với đối tác chất lượng là catalyst; nếu kéo dài hoặc tranh chấp là chiết khấu quản trị. Cổ đông nhỏ không có thông tin lợi thế ở biến số này — phải chấp nhận nó như noise." },
    ],
    verdict: "Vị thế: mỏ neo phòng thủ của sleeve ngân hàng — size lớn được chính vì drawdown nông. Kỳ vọng ĐÚNG: 18-27% total return/năm ở base case, không phải gấp đôi. Kỷ luật: mua thêm nếu về P/B 1.0x mà nợ nhóm 2 vẫn sạch; thoát một phần tại P/B 1.5x+; kill-switch duy nhất là nhóm 2 phình 2 quý liên tiếp.",
  },
},



gmd: {
  ticker: "GMD", name: "CTCP Gemadept", sector: "Logistics · Cảng biển", accent: "#0E7C86", icon: "🚢",
  rating: "MUA (tích lũy 2-3 năm)", horizon: "24-36 tháng",
  snapshot: [
    ["Giá (23/06/2026)", "76,400đ (pre-dilution)"], ["KH 2026", "DT 6,800 tỷ · LNTT 3,000 tỷ (+19%)"],
    ["Q1/2026", "LNST 650 tỷ (+27%) — vượt kỳ vọng"], ["Gemalink", "~45% LN thuần · chạy vượt 128% công suất thiết kế"],
    ["P/E fwd 2026", "~13–16x vs trượt 18.2x"], ["EV/EBITDA", "10.6x vs cảng ASEAN 12.6x — chiết khấu ~16%"],
    ["Cổ tức 2025", "Tiền 2,200đ + thưởng CP 2:1 (50%!)"], ["Mục tiêu 2030", "10 triệu TEU (gấp đôi) · CAGR LN 20%"],
  ],
  thesis: [
    { t: "Trụ 1 — Gemalink đầy tràn: quyền chọn GĐ2 đã được kích hoạt, đáo hạn 2027", d: "Gemalink 2026 đặt mục tiêu 2,015,000 TEU — vượt 128% công suất thiết kế GĐ1 (1.5M TEU), tức cảng đang chạy quá tải theo nghĩa đen. Q1/26: lãi từ liên doanh (chủ yếu Gemalink) +71.2% YoY. Khi util >100%, mỗi TEU thêm gần như rơi thẳng xuống EBITDA (chi phí cố định đã hấp thụ hết) — đây chính là kinh tế học phi tuyến của cảng nước sâu trong primer. GĐ2 đã khởi công T4/2026 ($200-300M, +1M TEU, COD cuối 2027), GĐ3 +1M TEU cuối 2028 → tổng 4M TEU. Kèm quy hoạch thêm 360m cầu bến đón tàu 250,000 DWT — duy nhất VN đón được tàu lớn nhất thế giới. Tăng trưởng 2027-2029 đã được 'đặt hàng' bằng capex hôm nay." },
    { t: "Trụ 2 — Pricing power đang được giải phóng: phí sàn +10% là re-rate zero-capex", d: "Khung giá bốc dỡ nước sâu (Cái Mép + Lạch Huyện) tăng 10% từ 1/2/2026; GMD chủ động tăng giá dịch vụ 5-10% từ đầu năm. Theo khung primer: mỗi 10% tăng phí ≈ 7-9% EBITDA vì chi phí gần như không đổi. Phí bốc xếp VN ($52-57/cont) vẫn chỉ bằng nửa Singapore ($111) trong khi Cái Mép vào top 7 hiệu quả thế giới — 'kho pricing power' còn nhiều đợt giải phóng nữa. Cộng thêm: doanh thu cảng neo USD = hedge tỷ giá tự nhiên hiếm có khi VND chịu áp lực." },
    { t: "Trụ 3 — SOTP chiết khấu vs khu vực + bản đồ 2030 rõ ràng nhất ngành", d: "EV/EBITDA 10.6x vs ASEAN ports 12.6x dù tăng trưởng cao hơn (CAGR PBT 2021-25: 38%/năm). Ban lãnh đạo công bố mục tiêu 2030: 10 triệu TEU (gấp đôi hiện tại), lợi nhuận CAGR 20%/năm, đội tàu 4→10 chiếc, cộng hai siêu dự án tiềm năng FTZ Hải Phòng 6,000ha + Cái Mép Hạ 3,800ha. Lịch sử GMD thoái vốn tài sản (Nam Hải Đình Vũ) đều được giá cao hơn định giá sàn — mỗi thương vụ vừa chứng minh NAV vừa mở khóa tiền cho capex mới." },
  ],
  business: [
    { seg: "Cụm Gemalink (Cái Mép — nước sâu)", mix: "~45% LN thuần", note: "Cảng nước sâu tư nhân lớn nhất VN, đón tàu mẹ đi thẳng Mỹ/EU. MSC (hãng tàu #1 thế giới) vừa là cổ đông vừa là khách — khóa sản lượng dài hạn. Đang chạy vượt 128% thiết kế → GĐ2 (+1M TEU, cuối 2027) là bắt buộc, không phải lựa chọn. Đây là tài sản định giá cao nhất trong SOTP." },
    { seg: "Cụm Nam Đình Vũ (Hải Phòng)", mix: "~30-35% LN cảng", note: "GĐ3 vận hành 10/2025 → tổng 2M TEU, cụm cảng sông lớn nhất miền Bắc (~20% thị phần khu vực). Q1/26 sản lượng đi ngang (Tết + cạnh tranh Lạch Huyện bến mới). Điểm cộng: nạo vét luồng Hà Nam xuống -9.5m cho tàu 50,000 DWT — thu hẹp khoảng cách với Lạch Huyện trong khi phí rẻ hơn 2-3 lần. Mảng cần theo dõi sát nhất." },
    { seg: "Logistics + Vận tải biển", mix: "~15-20% DT", note: "Đội tàu container 4 chiếc → kế hoạch 10 chiếc (2030), ICD, depot, vận tải. Vai trò chiến lược: combo cảng + logistics giữ khách, tăng revenue/container xuyên chuỗi. Đứng riêng biên mỏng — giá trị nằm ở hệ sinh thái." },
    { seg: "Tài sản chờ mở khóa", mix: "Quyền chọn SOTP", note: "Cao su (đã có kế hoạch thoái), liên doanh BĐS, và hai siêu dự án nghiên cứu: FTZ Hải Phòng 6,000ha + Cái Mép Hạ 3,800ha. Lịch sử thoái vốn được giá tốt = mốc neo định giá thị trường thực cho NAV." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025 (thực hiện)", "KH 2026", "CTCK 2026E"],
    rows: [
      ["Doanh thu", "5,946 tỷ", "6,800 tỷ (+14%)", "6,700–7,000 tỷ"],
      ["LNTT", "~2,520 tỷ", "3,000 tỷ (+19%)", "2,800–3,000 tỷ"],
      ["LNST-CĐM", "~1,750 tỷ", "—", "1,890–2,234 tỷ (+8–27%)"],
      ["Sản lượng Gemalink", "~1.65M TEU", "2,015,000 TEU (+22%)", "Q1 đã đạt >25% kế hoạch"],
      ["EPS fwd (pre-dilution)", "~4,100đ", "—", "~4,400–5,247đ (VDSC)"],
      ["Lưu ý pha loãng", "—", "Thưởng CP 2:1", "Sau chia: số CP ~430M → ~650M, giá & EPS tự điều chỉnh ×2/3"],
    ],
    drivers: "Ba biến số 2026: (1) Sản lượng Gemalink từng quý — Q1 đã chạy >25% KH năm là nhịp tốt; util càng vượt thiết kế, EBITDA biên càng dày; (2) Nam Đình Vũ vs Lạch Huyện — theo dõi thị phần Hải Phòng, nếu NĐV giữ được ~20% sau khi Lạch Huyện bến 3-4 chạy đủ = pass bài kiểm tra; (3) Thuế quan Mỹ — hàng đi Mỹ ~28-30% xuất khẩu VN; front-loading đã xong, cầu thực H2/2026 là phép thử. Mức thuế điều chỉnh tạm 10-15% trong 150 ngày đàm phán là biến số mở.",
  },
  valuation: {
    methods: [
      "SOTP (bắt buộc cho GMD): Gemalink EV/EBITDA 11-12x (nước sâu tăng trưởng, ×65% sở hữu) + Nam Đình Vũ 8-9x (feeder ổn định) + logistics 5-6x + tài sản chờ thoái theo NAV chiết khấu 30% − nợ ròng. Các thương vụ thoái vốn lịch sử là mốc neo giá thị trường thực.",
      "EV/EBITDA hợp nhất 10.6x vs ASEAN 12.6x: chiết khấu ~16% cho DN có CAGR lợi nhuận cao hơn peers — gap này là biên an toàn, khép lại khi FTSE flows nâng thanh khoản + Gemalink GĐ2 rõ hình hài.",
      "Khung 'chuỗi quyền chọn' (primer Logistics): lớp harvest (Gemalink GĐ1 + NĐV) đáng ~70-75K/cp; quyền chọn GĐ2 2027 + phí sàn đợt tiếp + FTZ/Cái Mép Hạ + thoái cao su = phần thị trường đang trả gần 0.",
      "Lưu ý kỹ thuật: mọi con số giá/EPS/target ở đây là PRE-DILUTION. Sau khi thưởng CP 2:1 thực hiện, giá tham chiếu và target đều nhân 2/3 — giá trị doanh nghiệp không đổi, đừng nhầm 'cổ phiếu rẻ đi'.",
    ],
    brokers: [
      ["HSC (5/2026)", "Tăng tỷ trọng", "94,000đ", "LN thuần 2026E 2,075 tỷ (+24%); Gemalink là cỗ máy kéo chính"],
      ["VDSC (6/2026)", "Tích lũy", "90,300đ", "LNST-CĐM 2,234 tỷ (+27%); EPS 5,247đ; đánh giá cao pipeline GĐ2"],
      ["Mirae Asset", "Nắm giữ", "78,800đ", "Thận trọng hơn về cạnh tranh Hải Phòng; LNST 1,890 tỷ"],
      ["ACBS / SSI", "Trung lập / Khả quan", "77,100 / 75,000đ", "Nhóm thận trọng: chờ bằng chứng thuế Mỹ + NĐV giữ thị phần"],
      ["Dải target", "Trái chiều", "75,000–95,300đ", "Upside −2% đến +25% — phân hóa quan điểm về thuế quan"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~30%", target: "90,000–95,000đ pre-dil (+18–24%)", d: "Đàm phán VN-Mỹ ra khung xuất xứ rõ, thuế thực thi mềm + Gemalink vượt kế hoạch TEU + thêm đợt điều chỉnh phí sàn → LNTT 2026 vượt 3,000 tỷ, 2027 thêm GĐ2 COD → EV/EBITDA khép gap về 12x ASEAN. Khớp HSC/VDSC. FTZ Hải Phòng có tiến triển pháp lý = kicker thêm." },
    { label: "🟡 BASE — xác suất ~50%", target: "82,000–88,000đ pre-dil (+7–15%)", d: "TEU tăng 8-12%, phí sàn giữ lộ trình, NĐV giữ ~20% thị phần Bắc → LNTT đạt KH 3,000 tỷ, EPS fwd ~4,600-5,000đ × P/E 17-18x (bằng trung bình trượt). Return vừa phải năm nay, tăng tốc 2027-28 khi GĐ2 vào — đây là cổ phiếu của người kiên nhẫn 2-3 năm." },
    { label: "🔴 BEAR — xác suất ~20%", target: "62,000–68,000đ pre-dil (−11–19%)", d: "Thuế Mỹ leo thang sau 150 ngày + quy tắc xuất xứ siết gắt → TEU đi ngang, front-loading hụt hơi H2 + Lạch Huyện ép NĐV mất thị phần → LN 2026 chỉ đạt ~85-90% KH, P/E nén về 13-14x. Kill-switch dài hạn: FDI đăng ký mới giảm 2 năm liên tiếp — chưa xảy ra." },
  ],
  risks: [
    "Thuế quan Mỹ + truy xuất transshipment — biến số vĩ mô số 1; mức điều chỉnh tạm 10-15% có thể thay đổi sau 150 ngày đàm phán",
    "Cạnh tranh Lạch Huyện bến 3-4 tại Hải Phòng — NĐV Q1 sản lượng đã đi ngang, cần kiểm chứng 2-3 quý tới",
    "Pha loãng 50% từ thưởng CP 2:1 — không làm mất giá trị nhưng gây nhiễu giá/EPS, dễ đọc nhầm",
    "Capex GĐ2 $200-300M — rủi ro đội vốn/trễ tiến độ; lãi vay USD nếu tỷ giá căng",
    "Giá cước biển thế giới giảm sâu → sức khỏe hãng tàu yếu → áp lực đàm phán phí bốc xếp",
  ],
  catalysts: [
    ["Q3/2026", "Chốt quyền cổ tức tiền 2,200đ + thưởng CP 2:1 — sự kiện kỹ thuật lớn, thanh khoản tăng sau chia"],
    ["T7-8/2026", "KQKD Q2 + sản lượng Gemalink lũy kế — kiểm chứng nhịp >25%/quý của kế hoạch 2M TEU"],
    ["Cuối 150 ngày đàm phán", "Kết quả khung thuế VN-Mỹ chính thức — gỡ hoặc siết risk premium cả ngành"],
    ["21/9/2026", "FTSE hiệu lực — thanh khoản toàn thị trường tăng; GMD hưởng gián tiếp qua dòng tiền vào mid-cap chất lượng"],
    ["2027", "Gemalink GĐ2 COD (+1M TEU) — quyền chọn lớn nhất đáo hạn; mỗi milestone xây dựng là mini re-rate"],
  ],
  checklist: [
    "Sản lượng TEU Gemalink + NĐV hàng tháng: Gemalink giữ nhịp ≥500K TEU/quý; NĐV không mất thị phần về dưới 18%",
    "Revenue/TEU từng quý: xác nhận phí tăng 5-10% đã vào giá — biên gộp cảng phải nở tương ứng",
    "Tiến độ Gemalink GĐ2: mốc xây dựng đúng hạn cho COD cuối 2027",
    "FDI đăng ký mới + xuất khẩu đi Mỹ hàng tháng: kill-switch thesis nếu FDI giảm 2 năm liên tiếp",
    "Động thái thoái vốn cao su / cập nhật FTZ, Cái Mép Hạ: mỗi bước là mốc neo NAV mới",
  ],
  competitors: [
    {
      ticker: "VGR", name: "CTCP Cảng Xanh VIP", potential: "THẤP — không đủ điều kiện so sánh nghiêm túc",
      color: "#A33030",
      d: "Cảng nhỏ tại Đình Vũ-Cát Hải, Hải Phòng, sức chứa thiết kế chỉ ~12,000 TEU — quy mô bằng một phần rất nhỏ của Gemalink. Cổ đông sáng lập gồm Container Việt Nam (Viconship) và Vipco; niêm yết UPCOM từ 2018. Đối tác chiến lược Evergreen (Đài Loan) từng mua cổ phần nhưng vai trò trong tăng trưởng dài hạn chưa rõ ràng qua công bố công khai gần đây.",
      strengths: "Vị trí có lợi thế tương đối trong khu vực Hải Phòng; trang thiết bị đầu tư từ Nhật/Đức/Hà Lan tương đối hiện đại so với quy mô.",
      weaknesses: "Thanh khoản UPCOM rất thấp, gần như không có coverage CTCK, không công bố định kỳ đầy đủ số liệu tài chính chi tiết như các mã HOSE. Quy mô nhỏ khiến không có đòn bẩy hoạt động kiểu Gemalink (không hưởng lợi rõ rệt từ pricing power khu vực nước sâu). Rủi ro thanh khoản khi cần thoát vị thế lớn.",
      verdict: "Không đưa vào danh mục nghiêm túc trừ khi có thông tin nội bộ đặc biệt (ví dụ kế hoạch M&A/thoái vốn cụ thể). Đây là cổ phiếu đầu cơ nhỏ lẻ, không phải khoản đầu tư có thể phân tích bằng khung SOTP hay so sánh trực tiếp với GMD.",
    },
    {
      ticker: "HAH", name: "CTCP Vận tải và Xếp dỡ Hải An", potential: "TRUNG BÌNH — tiềm năng thật nhưng đang ở khúc quanh khó, 2028+ mới trổ quả",
      color: "#8A6D00",
      d: "Sở hữu đội tàu 20 chiếc (~33,100 TEU), ~30% thị phần vận tải container nội địa. Mô hình khác GMD: HAH là chủ tàu + khai thác cảng nhỏ, ăn theo giá cước vận tải/cho thuê tàu — beta cao với chu kỳ giá cước thế giới, khác hẳn GMD (thu phí bốc xếp cảng nước sâu, ổn định hơn nhiều).",
      strengths: "Q1/2026 LNST 300-351 tỷ (+28.6% YoY) nhờ duy trì nền giá cho thuê định hạn cao ký từ 2025 + tăng giá dịch vụ cảng (nâng hạ +20%, lưu kho +17%). Đội tàu khai thác 90-95% công suất — nền tảng tốt cho tăng trưởng sản lượng. Chiến lược đầu tư xuyên chu kỳ táo bạo: đặt đóng 8 tàu mới (4 tàu 3,000 TEU + 4 siêu tàu 7,100 TEU, tổng $552 triệu, giao 2027-2029) — 2 siêu tàu có giá cho thuê kỳ vọng GẤP 3 LẦN trung bình đội tàu hiện tại, mở chương tăng trưởng hoàn toàn mới từ 2028. Liên doanh Hải An Green Shipping Line với Viconship (VSC) hướng tới đội tàu 22,000 TEU vào 2028 — mở rộng hệ sinh thái vận tải-cảng-logistics khép kín.",
      weaknesses: "Ban lãnh đạo TỰ NHẬN kế hoạch 2026 thận trọng: DT đi ngang (~5,140 tỷ, +0.9%), LNST giảm 11% (~1,250 tỷ) so với 2025 — gọi thẳng đây là 'năm bản lề'. Nguyên nhân: giá cước vận tải + cho thuê tàu dự báo giảm 5%/10% khi nguồn cung tàu mới tiếp tục tăng nhanh hơn cầu — MBS/HSC đồng thuận áp lực dư cung kéo dài đến 2029. Đòn bẩy tài chính tăng mạnh (D/E từ 50:50 lên 65:35) để tài trợ đóng tàu mới, cộng phát hành trái phiếu kèm chứng quyền ~1,900 tỷ — rủi ro pha loãng kép (cổ phiếu ESOP + chứng quyền chuyển đổi) đúng lúc ngành dư cung. Nhạy cảm với chi phí nhiên liệu và biến động địa chính trị (Biển Đỏ, kênh đào Suez) hơn nhiều so với GMD.",
      verdict: "Không phải mã 'mua ngay' — đây là câu chuyện đầu tư 2028+ trong khi 2026-2027 là vùng trũng lợi nhuận có chủ đích (ban lãnh đạo chấp nhận giảm lãi ngắn hạn để xây năng lực dài hạn). Hợp lý làm vị thế NHỎ, tích lũy dần khi giá điều chỉnh sâu (đã giảm ~27.5% từ đỉnh 71,000đ về vùng 51,500-54,000đ), với kỷ luật chờ xác nhận 2 siêu tàu COD đúng tiến độ 2028 trước khi tăng tỷ trọng. So với GMD: GMD là core holding kiên nhẫn 2-3 năm với nền tảng ổn định hơn nhiều (cảng nước sâu độc quyền); HAH là vệ tinh biến động cao, thời điểm vào quan trọng hơn hẳn so với GMD.",
    },
  ],

  expert: {
    variant: "Consensus nhìn GMD như cảng-tốt-tăng-đều rồi sa lầy vào tranh cãi thuế quan. Variant perception: GMD là công ty CAPITAL RECYCLING hiếm hoi của TTCK VN — chu trình lặp: xây tài sản cảng → vận hành đến trưởng thành → bán cho nhà đầu tư chiến lược ở giá private cao hơn giá sàn → tái đầu tư vào nước sâu ROIC cao hơn. NAV compounding kiểu này không hiện ra trong P/E screening (lợi nhuận thoái vốn bị coi là one-off) nhưng chính nó tạo ra CAGR PBT 38%/năm suốt 2021-25. Ai định giá GMD bằng P/E đang đo nhầm cỗ máy.",
    strengths: [
      { h: "Tài sản địa lý không thể sao chép + liên minh hãng tàu số 1 thế giới", d: "Gemalink là cảng duy nhất VN quy hoạch đón tàu 250,000 DWT; MSC vừa là cổ đông vừa là khách neo sản lượng. Vị trí nước sâu là tài nguyên hữu hạn — đối thủ mới cần 7-10 năm giấy phép + $500M+ và vẫn không có được vị trí tương đương." },
      { h: "Chứng minh NAV bằng tiền thật, nhiều lần", d: "Các thương vụ thoái vốn cảng lịch sử đều chốt giá cao hơn định giá sổ sách và giá sàn ngụ ý — nghĩa là SOTP của GMD có mốc neo giao dịch tư nhân thật, không phải giả định của analyst. Đây là điều gần như không mã hạ tầng nào khác trên HOSE có." },
      { h: "Đòn bẩy hoạt động đang vào điểm ngọt nhất", d: "Gemalink chạy vượt 128% thiết kế: mỗi TEU thêm từ đây rơi 70-80% xuống EBITDA vì chi phí cố định đã hấp thụ hết. Cộng phí sàn +10% (rơi ~7-9% vào EBITDA, zero capex) — hai lực cùng chiều lên biên trong 2026." },
      { h: "Doanh thu neo USD — hedge tỷ giá tự nhiên", d: "Trong kịch bản VND chịu áp lực (rủi ro vĩ mô hiện hữu 2026-27), GMD là một trong số ít cổ phiếu hưởng lợi thay vì chịu trận. Thuộc tính danh mục này thường bị định giá 0 cho đến khi tỷ giá thực sự căng." },
    ],
    weaknesses: [
      { h: "Con tin của biến số không model được: chính sách thương mại Mỹ", d: "28-30% hàng xuất VN đi Mỹ; quy tắc xuất xứ + thuế transshipment quyết định tốc độ TEU 2 năm tới nhưng nằm ngoài mọi mô hình tài chính. Kịch bản xấu không giết GMD nhưng biến câu chuyện tăng trưởng 15%/năm thành 5%/năm — và multiple co theo." },
      { h: "Rò rỉ lợi ích thiểu số ở chính tài sản đẹp nhất", d: "Sở hữu Gemalink ~65%: 35% của dòng lợi nhuận tốt nhất chảy ra cổ đông thiểu số (gồm MSC/CMA-CGM). LN hợp nhất vì thế trông nhỏ hơn chất lượng tài sản thật — nhưng cũng nghĩa là NĐT chỉ thực nhận 65% của tăng trưởng Gemalink. SOTP phải chiết khấu đúng phần này, nhiều model quên." },
      { h: "Vòng xoáy capex không có điểm dừng", d: "Tăng trưởng cảng đòi capex liên tục: GĐ2 $200-300M, rồi GĐ3, rồi Nam Đình Vũ mở rộng. FCF bị nén đúng những năm câu chuyện đẹp nhất; nếu tài trợ bằng nợ USD trong chu kỳ tỷ giá căng, chi phí vốn thật cao hơn mô hình. Cổ đông cần chấp nhận: đây là cỗ máy tái đầu tư, không phải máy trả cổ tức." },
      { h: "Mặt trận phía Bắc đang bị bao vây cấu trúc", d: "Lạch Huyện bến mới với lợi thế nước sâu đang hút hàng khỏi khu sông Hải Phòng. NĐV Q1 đi ngang có thể không phải nhiễu Tết mà là khởi đầu của mất thị phần cấu trúc. Nếu xu hướng xác nhận 2-3 quý, khoảng 30% giá trị SOTP phía Bắc phải được định giá lại thấp hơn." },
    ],
    verdict: "Vị thế: satellite tăng trưởng 2-3 năm, KHÔNG phải trade 2026 — return thật nằm ở 2027-28 khi GĐ2 vào. Vào từng phần, cân nhắc thêm sau sự kiện chia thưởng 2:1 (giá điều chỉnh kỹ thuật thường tạo điểm vào). Kill-switch: FDI đăng ký giảm 2 năm liên tiếp hoặc NĐV mất thị phần dưới 18% trong 3 quý. Theo dõi thuế quan như theo dõi thời tiết: không dự báo được, chỉ chuẩn bị được.",
  },
},

msn: {
  ticker: "MSN", name: "Tập đoàn Masan", sector: "Tiêu dùng — Bán lẻ (Holding)", accent: "#7B2D43", icon: "🛒",
  rating: "MUA (SOTP re-rating)", horizon: "12-24 tháng",
  snapshot: [
    ["Giá tham chiếu (T5-6/2026)", "~79,000–85,000đ"], ["Target VCBS / HSC", "114,320đ / 114,200đ — MUA"],
    ["2026E (VCBS)", "DT 115,656 tỷ (+42%) · LNST 10,508 tỷ (+55%)"], ["HSC 2026E", "LN gần GẤP ĐÔI 2025"],
    ["WinCommerce 5T/2026", "DT 18,911 tỷ (+28.7%) — vượt KH năm"], ["MCH 5T/2026", "DT 12,732 tỷ (+12.9%) · net margin ~26%"],
    ["Cửa hàng mở ròng 5T", "+464 · >98% cửa hàng mới EBITDA dương"], ["CEO tại ĐHĐCĐ", "'Cổ phiếu đang dưới 60% giá trị thực'"],
  ],
  thesis: [
    { t: "Trụ 1 — WinCommerce đổi pha: từ đốt tiền sang in tiền, đúng điểm uốn", d: "Chu kỳ 1 (2020-2024): mua lại VinCommerce lỗ nặng, tái cấu trúc 4 năm. Chu kỳ 2 (2025+): 'hái quả' — 5T/2026 doanh thu 18,911 tỷ (+28.7%, VƯỢT kế hoạch tăng trưởng cả năm), LFL hai chữ số, mở ròng 464 cửa hàng mà >98% cửa hàng mới đạt EBITDA dương ngay. Ban lãnh đạo cam kết mốc 1,000 tỷ lợi nhuận và 'trả lại 3,000 tỷ cho cổ đông'. Với doanh thu chạy ~45-48K tỷ/năm, mỗi 1 điểm % EBITDA margin cải thiện = ~450-480 tỷ lợi nhuận mới — đòn bẩy hoạt động bán lẻ đúng nghĩa. Đây là mảnh ghép từng bị định giá ÂM trong SOTP, giờ chuyển thành tài sản dương." },
    { t: "Trụ 2 — Flywheel MCH × Win: hệ điều hành tiêu dùng là moat cấu trúc", d: "MCH 5T/2026: 12,732 tỷ (+12.9%), đúng lộ trình 11-15%/năm, net margin ~26% (ngang phần mềm — xem primer FMCG). Chương trình Retail Supreme đóng góp 30-40% tăng trưởng: phủ 490,000 điểm bán, SKU/đơn hàng +47% — nghĩa là tăng trưởng đến từ HIỆU QUẢ phân phối, không phải đốt khuyến mãi. Kết nối MCH (sản xuất) × WinCommerce (3,000+ điểm bán lẻ) qua dữ liệu + logistics = giữ margin trong hệ sinh thái thay vì nhường retailer ngoài. MCH vừa chuyển sàn HOSE và chính thức được cấp margin (30/6/2026) — thanh khoản + định giá tham chiếu cho SOTP ngày càng rõ." },
    { t: "Trụ 3 — MSR: quyền chọn vonfram bất ngờ trở thành động cơ chính 2026-27", d: "HSC đánh giá MSR (Masan High-Tech Materials) là ĐỘNG LỰC ĐÓNG GÓP LỚN NHẤT vào tăng trưởng lợi nhuận MSN giai đoạn 2026-2027 — điều gần như không ai định giá 2 năm trước. Cơ chế: giá vonfram/APT neo cao theo chu kỳ vật liệu chiến lược (tái cấu trúc chuỗi cung ứng toàn cầu, TQ siết xuất khẩu vật liệu lưỡng dụng), MSR sở hữu mỏ Núi Pháo + công nghệ chế biến từ Đức. Từ 'tài sản gánh nợ' → 'tài sản chiến lược'. Cộng dồn: ba động cơ (tiêu dùng + bán lẻ + vật liệu) lần đầu tiên TĂNG ĐỒNG PHA — VCBS dự Q2/26 LNST +62%." },
  ],
  business: [
    { seg: "Masan Consumer (MCH)", mix: "Trái tim lợi nhuận — sở hữu ~68-72%", note: "Gia vị + mì + đồ uống, net margin ~26%, pricing power #1 VN (primer FMCG xếp Bậc 1). Premiumisation đúng lộ trình, Retail Supreme mở rộng phủ 490K điểm. Vừa lên HOSE + được margin → mốc định giá thị trường minh bạch cho SOTP. Đây là phần 'đắt cũng xứng đáng' của tập đoàn." },
    { seg: "WinCommerce (WCM)", mix: "Động cơ tăng trưởng mới", note: "~4,000+ điểm bán, doanh thu chạy ~45-48K tỷ/năm. 5T/2026 +28.7%, LFL 2 chữ số, 98% cửa hàng mới EBITDA dương. Cam kết 1,000 tỷ LN. Trong SOTP: từng bị trừ điểm vì lỗ → giờ là nguồn re-rating chính khi EV/Sales được nâng từ ~0.4x lên 0.6-0.8x chuẩn bán lẻ có lãi." },
    { seg: "Masan MEATLife + Phúc Long", mix: "Mảnh ghép hệ sinh thái", note: "MML hưởng chu kỳ giá heo thuận (hậu ASF — xem primer FMCG pig cycle); Phúc Long tái cấu trúc cửa hàng. Không phải driver chính nhưng đều đã qua đáy — không còn kéo lùi consolidated." },
    { seg: "MSR (vonfram) + TCB ~19.9%", mix: "Hai tài sản 'ẩn' của SOTP", note: "MSR: chu kỳ APT/vonfram cao — HSC gọi là động lực #1 2026-27; option thoái vốn/đối tác chiến lược luôn mở. TCB stake ~19.9%: mark-to-market theo giá TCB trên sàn — riêng khoản này đáng vài chục nghìn tỷ, thị trường thường 'quên' khi tính holding discount." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025", "2026E (VCBS)", "Ghi chú"],
    rows: [
      ["Doanh thu hợp nhất", "~81.5K tỷ", "115,656 tỷ (+42%)", "KH công ty ~100K tỷ — CTCK dự vượt"],
      ["LNST", "~6,780 tỷ", "10,508 tỷ (+55%)", "HSC: gần gấp đôi 2025"],
      ["Q2/2026E", "—", "DT 28,914 tỷ (+57%) · LNST 2,627 tỷ (+62%)", "Công bố ~cuối T7 — catalyst gần nhất"],
      ["WinCommerce", "Break-even → có lãi", "Mốc 1,000 tỷ LN", "5T đã vượt KH tăng trưởng năm"],
      ["MCH", "DT +11%", "+11–15%", "Retail Supreme đóng 30-40% tăng trưởng"],
      ["MSR", "Cải thiện mạnh", "Động lực LN #1 (HSC)", "Giá APT/vonfram neo cao — theo dõi hàng tháng"],
    ],
    drivers: "Ba đồng hồ đo 2026: (1) LFL WinCommerce — còn 2 chữ số là flywheel còn quay; (2) Biên EBITDA WCM tiến về mốc 1,000 tỷ LN — mỗi điểm % margin = ~450-480 tỷ; (3) Giá APT vonfram — biến số ngoại sinh quyết định phần 'surprise' của HSC forecast. Rủi ro đọc nhầm: LN 2026 tăng 55-100% có phần từ nền thấp + chu kỳ MSR — tách phần cấu trúc (tiêu dùng-bán lẻ) khỏi phần chu kỳ (vonfram) khi extrapolate sang 2027-28.",
  },
  valuation: {
    methods: [
      "SOTP là phương pháp duy nhất đúng cho holding: MCH theo giá HOSE × sở hữu (P/E 20-22x xứng đáng theo primer FMCG) + WCM theo EV/Sales 0.6-0.8x (chuẩn bán lẻ có lãi; từng chỉ được 0.3-0.4x khi lỗ) + MML/Phúc Long + MSR theo EV/EBITDA chu kỳ + TCB 19.9% mark-to-market − nợ ròng holding − holding discount 15-20%.",
      "CEO công bố tại ĐHĐCĐ: thị giá đang dưới 60% giá trị thực — trùng hướng với SOTP các CTCK (VCBS/HSC ~114K vs thị giá ~80-85K = discount ~26-30% chưa tính holding discount chuẩn).",
      "Điểm mấu chốt của re-rating: KHÔNG cần các mảnh tăng định giá — chỉ cần holding discount thu hẹp khi (a) MCH có giá tham chiếu HOSE minh bạch + margin, (b) WCM có lãi chứng minh được, (c) nợ holding giảm. Cả ba đang diễn ra cùng lúc.",
      "Kiểm chứng kỹ thuật: BSC (5/2026) từng đặt mục tiêu kỹ thuật 94,000đ khi giá 79,100đ — sóng cơ bản và kỹ thuật đang cùng hướng.",
    ],
    brokers: [
      ["VCBS (6/2026)", "MUA", "114,320đ", "DT 2026 115.7K tỷ (+42%), LNST 10.5K tỷ (+55%); hệ sinh thái tích hợp là moat"],
      ["HSC (6/2026)", "MUA (nâng)", "114,200đ", "Nâng mạnh dự báo 2026-27; LN 2026 gần gấp đôi; MSR động lực #1"],
      ["BSC (5/2026)", "Kỹ thuật", "94,000đ", "Mục tiêu sóng kỹ thuật; breakout kênh giá + hệ MA đồng thuận"],
      ["Đồng thuận", "Tích cực đồng loạt", "94,000–114,320đ", "Upside ~15–40% tùy mốc giá vào — hiếm khi VCBS & HSC hội tụ sát nhau vậy"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~30%", target: "110,000–120,000đ (+33–45%)", d: "WCM cán mốc 1,000 tỷ LN + APT vonfram giữ đỉnh + FTSE flows (MSN TRONG danh sách rổ) + MCH re-rate trên HOSE → SOTP full value, holding discount co về 10% → khớp VCBS/HSC 114K. Kicker: thoái một phần MSR cho đối tác chiến lược giá tốt = chứng minh NAV bằng tiền thật." },
    { label: "🟡 BASE — xác suất ~50%", target: "95,000–105,000đ (+15–27%)", d: "Tiêu dùng phục hồi từ từ, WCM có lãi nhưng chưa chạm 1,000 tỷ, MSR đóng góp tốt nhưng APT hạ nhiệt dần → LNST ~9-10K tỷ (+35-45%), discount thu hẹp một phần. Return từ tăng trưởng lợi nhuận là chính, re-rating là phụ." },
    { label: "🔴 BEAR — xác suất ~20%", target: "68,000–75,000đ (−8–15%)", d: "Sức mua yếu kéo dài (lãi suất cao đè tiêu dùng) làm LFL WCM về 1 chữ số + giá vonfram đảo chiều mạnh + lãi suất ăn chi phí tài chính holding → LN 2026 chỉ +20-25%, thị trường quay lại áp holding discount 25-30%. Đáy được đỡ bởi giá trị MCH + TCB stake — hai tài sản thanh khoản định giá được ngay." },
  ],
  risks: [
    "Đòn bẩy holding: nợ ròng tập đoàn nhạy với lãi suất tăng — chi phí tài chính là 'thuế' lên mọi mảng; theo dõi nợ ròng/EBITDA từng quý",
    "Phần lợi nhuận MSR là CHU KỲ (giá vonfram/APT) — extrapolate sang 2027+ như cấu trúc là sai phương pháp",
    "Sức mua nội địa yếu hơn kỳ vọng: WCM LFL và MCH volume cùng chịu trận — hai động cơ trúng đòn một lúc",
    "Holding discount có thể dai dẳng bất chấp fundamentals — bài học nhiều năm của chính MSN trước 2024",
    "Cấu trúc phức tạp nhiều tầng sở hữu — mỗi đợt tái cấu trúc/phát hành ở công ty con đều có thể gây nhiễu quyền lợi cổ đông mẹ",
  ],
  catalysts: [
    ["Cuối T7/2026", "KQKD Q2: VCBS dự LNST 2,627 tỷ (+62%) — kiểm chứng ba động cơ đồng pha"],
    ["T7-9/2026", "Dòng tiền margin mới vào MCH (vừa được cấp margin 30/6) — thanh khoản hệ sinh thái Masan tăng"],
    ["21/9/2026", "FTSE hiệu lực — MSN nằm TRONG danh sách rổ: nhận dòng passive trực tiếp, không chỉ gián tiếp"],
    ["Q4/2026", "WCM tiến về mốc 1,000 tỷ LN + kế hoạch 'trả lại 3,000 tỷ cho cổ đông' có lộ trình cụ thể"],
    ["2027", "Option MSR: thoái vốn/đối tác chiến lược trong chu kỳ vật liệu — nếu xảy ra là sự kiện chứng minh NAV lớn nhất"],
  ],
  checklist: [
    "LFL WinCommerce từng quý: giữ 2 chữ số = flywheel quay; về 1 chữ số 2 quý liên tiếp = hạ kỳ vọng",
    "Số cửa hàng mở ròng + % EBITDA dương của cửa hàng mới: chất lượng mở rộng, không chỉ tốc độ",
    "Biên net margin MCH giữ ≥25% + tăng trưởng 11-15%: kiểm chứng premiumisation không đổi bằng khuyến mãi",
    "Giá APT/vonfram hàng tháng: driver phần lợi nhuận chu kỳ — đặt cảnh báo khi giảm >15% từ đỉnh",
    "Nợ ròng holding + chi phí tài chính từng quý: deleveraging tiếp diễn = discount có lý do thu hẹp",
  ],

  expert: {
    variant: "Consensus coi MSN là holding phức tạp xứng đáng discount vĩnh viễn — quan điểm được củng cố bởi chính một thập kỷ discount 20-40%. Variant perception: cấu trúc đang ĐƠN GIẢN HÓA lần đầu trong lịch sử công ty, và discount là hàm của độ mù mờ (opacity), không phải hàm của cấu trúc. Ba nguồn mù mờ lớn nhất đang được xóa cùng lúc: MCH có giá HOSE minh bạch + margin, WCM chuyển từ hố đen thành mảng có lãi kiểm chứng được, MSR có giá hàng hóa công khai. Khi từng mảnh mark-to-market được, discount mất lý do tồn tại — mean reversion có catalyst, không phải hy vọng suông.",
    strengths: [
      { h: "Nền tảng tiêu dùng tích hợp duy nhất VN — moat mạng lưới thật", d: "MCH margin 26% + 490K điểm bán + WCM ~4,000 cửa hàng + dữ liệu xuyên chuỗi: không đối thủ nào sao chép được flywheel sản xuất-phân phối-dữ liệu này. Unilever có brand nhưng không có retail; MWG có retail nhưng không có brand. MSN có cả hai — đó là lý do cấu trúc để tổng thể đáng giá HƠN tổng các phần, ngược với holding discount." },
      { h: "Toán đòn bẩy chạy thuận: deleveraging là động cơ tăng equity phi tuyến", d: "Với holding có nợ, mỗi đồng nợ giảm chuyển thẳng thành equity value; đồng thời chi phí tài chính giảm nâng EPS. Hai hiệu ứng cộng hưởng khiến equity tăng nhanh hơn EBITDA trong pha deleveraging — đúng pha MSN đang ở, và là phần ít được model nhất trong các báo cáo." },
      { h: "SOTP với mốc giá THẬT, không phải giả định", d: "MCH có giá đóng cửa HOSE hằng ngày; TCB stake ~19.9% mark-to-market theo bảng điện. Hai mảnh lớn nhất của SOTP không còn chỗ cho tranh cãi định giá — hiếm holding nào ở VN được như vậy. Phần còn lại (WCM, MSR, MML) là quyền chọn cộng thêm trên một nền đã kiểm chứng." },
      { h: "Ba động cơ đồng pha lần đầu tiên", d: "Lịch sử MSN luôn có một mảng kéo lùi (WCM lỗ, MSR gánh nợ, Phúc Long loay hoay). 2026 là năm đầu cả ba trục cùng dương: tiêu dùng cấu trúc (MCH), bán lẻ turnaround (WCM), hàng hóa chu kỳ (MSR). VCBS/HSC hội tụ target ~114K không phải ngẫu nhiên — mô hình nào cũng ra số đẹp khi không còn mảng âm." },
    ],
    weaknesses: [
      { h: "Discount là bệnh mãn tính có tiền sử tái phát", d: "MSN từng có những đợt discount thu hẹp (2019, 2021) rồi mở lại khi xuất hiện thương vụ phức tạp mới. Ban lãnh đạo có lịch sử ưu tiên tầm nhìn tập đoàn hơn sự đơn giản cho cổ đông thiểu số. Mean reversion cần được NUÔI bằng kỷ luật minh bạch liên tục — một thương vụ M&A phức tạp mới có thể xóa cả năm tiến bộ." },
      { h: "Rủi ro quản trị nhiều tầng là chi phí thường trực", d: "Mỗi đợt phát hành/tái cấu trúc ở công ty con là một lần cổ đông công ty mẹ phải tự hỏi mình đứng đâu trong thứ tự ưu tiên. Với 4-5 tầng sở hữu, việc giám sát vượt khả năng của NĐT cá nhân — phải chấp nhận đây là chi phí niềm tin, và nó chính đáng nằm trong discount 10-15% ngay cả ở kịch bản tốt." },
      { h: "Cấu phần MSR là chu kỳ đội lốt tăng trưởng", d: "HSC gọi MSR là động lực số 1 của 2026-27 — chính xác nhưng nguy hiểm: lợi nhuận từ giá vonfram/APT cao là CHU KỲ, sẽ đảo khi cung toàn cầu phản ứng. Extrapolate nó vào 2028+ như tăng trưởng cấu trúc là lỗi định giá kinh điển. Kỷ luật: tách P/E cho phần tiêu dùng (cao) và phần khai khoáng (thấp) — blended P/E một con số là vô nghĩa với MSN." },
      { h: "Cộng hưởng lãi suất hai đầu — không phải hedge nội bộ", d: "Nợ holding nhạy lãi suất (chi phí tài chính) VÀ tiêu dùng nhạy lãi suất (sức mua) — hai rủi ro cùng chiều, không triệt tiêu nhau. Kịch bản lãi suất cao kéo dài đánh MSN kép: EPS bị chi phí vốn ăn trong khi doanh thu bị sức mua ghìm. Đây là lý do MSN không bao giờ nên là vị thế phòng thủ trong danh mục." },
    ],
    verdict: "Vị thế: re-rating trade CÓ THỜI HẠN, không phải compounder giữ mãi (compounder thật là MCH — cân nhắc nắm trực tiếp nếu muốn giữ 5 năm+). Vào theo catalyst: trước KQKD Q2 (cuối T7) và trước FTSE 21/9; chốt từng phần khi discount SOTP thu hẹp về 10-15% hoặc giá vào vùng 108-115K. Theo dõi giá APT hàng tháng như đồng hồ đếm ngược của một phần ba thesis.",
  },
},


dhg: {
  ticker: "DHG", name: "CTCP Dược Hậu Giang", sector: "Dược phẩm", accent: "#1A7A5E", icon: "💊",
  rating: "NẮM GIỮ / MUA khi điều chỉnh — bond proxy + quyền chọn sự kiện", horizon: "12-36 tháng",
  snapshot: [
    ["Giá (05/05/2026)", "101,100đ"], ["Vốn hóa", "~13,600 tỷ — DN dược lớn nhất sàn"],
    ["Số CP lưu hành", "130.7 triệu"], ["Free float", "CHỈ 5.68% — Taisho 51.01% + SCIC 43.31%"],
    ["KH 2026", "DT 5,530 tỷ (+5%) · LNST 1,007 tỷ (+18%)"], ["Q1/2026", "LNST 315-319 tỷ (+16-19%) — đạt 34.5% KH năm"],
    ["P/E fwd 2026", "~13.1x (EPS KH ~7,700đ)"], ["Cổ tức", "2025: 100% tiền (yield ~9.9%) · KH 2026: 7,000đ (~6.9%)"],
  ],
  thesis: [
    { t: "Trụ 1 — Cỗ máy cổ tức được bảo chứng bằng cấu trúc: net cash + capex tối thiểu + hai cổ đông lớn cùng muốn tiền", d: "DHG trả cổ tức 100% tiền mặt (10,000đ/cp = 1,307 tỷ) hai năm liên tiếp, hai đợt T5 + T9/2026; kế hoạch 2026 tối thiểu 7,000đ. Ban lãnh đạo nói thẳng tại ĐHĐCĐ: đầu tư chỉ 300-400 tỷ/năm, KHÔNG mở rộng nhà máy lớn trong tương lai gần. Cấu trúc cổ đông củng cố chính sách này: Taisho (51.01%) nhận ~667 tỷ/năm, SCIC (43.31%) nhận ~566 tỷ — cả hai đều có động cơ duy trì payout cao. Tại giá 101K: yield 2025 ~9.9%, fwd ~6.9-9.9% — cao hơn lãi tiết kiệm 3-4 điểm %. Đây là bond proxy đúng nghĩa của ngành dược, với 'coupon' được bảo vệ bởi demand không chu kỳ (primer: bear case dược nông nhất 8 ngành)." },
    { t: "Trụ 2 — Chất lượng tăng trưởng: quay lại mốc nghìn tỷ bằng mix shift, không phải đốt chi phí", d: "KH 2026: LNST 1,007 tỷ (+18%) — trở lại 'thời hoàng kim' 2023. Q1 đã chạy trước: LNST +16-19% dù doanh thu chỉ đi ngang (~1,198 tỷ) — đúng pattern DHG trong primer Dược: biên gộp cải thiện nhờ tái cơ cấu sang thành phẩm tự sản xuất (biên ~55%) thay vì hàng phân phối (biên 15-20%), cộng chi phí tài chính giảm. Nền tảng cứng: nhà máy Japan-GMP (từ 2020) + PIC/s — tấm vé thầu nhóm cao; đang cùng Taisho nâng cấp dây chuyền Betalactam để tăng thắng thầu ETC và mở xuất khẩu (Nga, Moldova). Chính sách ưu tiên thuốc nội + Luật Dược 2024 (rút SDK còn 6-12 tháng) là gió thuận cấu trúc mà DHG — vua generic nội địa — hưởng trọn." },
    { t: "Trụ 3 — Quyền chọn sự kiện: bài toán free float 5.68% BẮT BUỘC phải có lời giải trong 2026-27", d: "Sự kiện đặc biệt nhất của mã này: chốt danh sách 23/3/2026, DHG chỉ còn 5.68% cổ phần ngoài hai cổ đông lớn → KHÔNG còn đáp ứng điều kiện công ty đại chúng (luật yêu cầu ≥10%). Công ty xác nhận đang 'trao đổi với hai cổ đông lớn để xây dựng phương án'. Chỉ có vài lời giải, và hầu hết đều là catalyst: (a) SCIC thoái một phần — câu chuyện thoái vốn nhà nước kinh điển, thường kèm đấu giá công khai định giá lại toàn bộ công ty; (b) Taisho mua nốt + hủy niêm yết — kịch bản tender offer, thông lệ có premium so thị giá; (c) phát hành tăng free float. Người cầm cổ phiếu đang giữ một quyền chọn sự kiện mà thời hạn do LUẬT ép, không phải do thiện chí doanh nghiệp." },
  ],
  business: [
    { seg: "Thành phẩm tự sản xuất (core)", mix: "Tỷ trọng lớn nhất, đang tăng", note: "Kháng sinh, giảm đau hạ sốt (Hapacol — paracetamol #1 VN), hô hấp, tiêu hóa... Năng lực 7.5 tỷ đơn vị sản phẩm/năm — lớn nhất ngành dược nội. Biên gộp ~55%. Đây là phần tạo ra toàn bộ câu chuyện margin expansion: mỗi điểm % mix dịch từ hàng phân phối sang tự sản xuất = biên gộp hợp nhất nở thêm." },
    { seg: "Kênh ETC (đấu thầu bệnh viện)", mix: "Đang đẩy mạnh — trọng tâm chiến lược", note: "Japan-GMP + PIC/s = vào nhóm thầu cao, ít cạnh tranh giá. Dự án nâng cấp Betalactam cùng Taisho nhắm trực tiếp tăng tỷ lệ thắng thầu. Hưởng trọn chính sách ưu tiên thuốc nội. Theo primer: ETC mix +5 điểm % ≈ gross margin +1.5-2.5 điểm % — đây là con đường tăng trưởng ít rủi ro nhất." },
    { seg: "Kênh OTC (nhà thuốc)", mix: "Nền tảng thương hiệu 50 năm", note: "Mạng phân phối sâu nhất ngành dược nội (thừa hưởng vị thế #2 kênh thương mại). Brand Hapacol, Klamentin, NattoEnzym... Nhạy nhẹ với sức mua nhưng thuốc điều trị cơ bản gần như miễn nhiễm chu kỳ. Threat dài hạn: chuỗi Long Châu ép chiết khấu — theo dõi biên kênh này." },
    { seg: "Xuất khẩu + hợp lực Taisho", mix: "Nhỏ nhưng là option 2027+", note: "Taisho chuyển giao công nghệ + tiêu chuẩn Japan-GMP; mục tiêu xuất khẩu Nga, Moldova và thị trường Taisho có sẵn. Chiều ngược: phân phối sản phẩm không phải dược của đối tác trên mạng lưới DHG. Chưa trọng yếu trong số liệu — nhưng là hướng thoát trần tăng trưởng nội địa duy nhất." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025 (kiểm toán)", "KH 2026", "Nhịp Q1/2026"],
    rows: [
      ["Doanh thu thuần", "5,267 tỷ (+8%, 101% KH)", "5,530 tỷ (+5%)", "1,198 tỷ — 21.7% KH (Tết, mùa thấp)"],
      ["LNST", "852 tỷ (−5%, 105% KH)*", "1,007 tỷ (+18%)", "315-319 tỷ (+16-19%) — 34.5% KH"],
      ["EPS", "6,308đ", "~7,700đ", "Q1 đã ~2,400đ"],
      ["Biên gộp", "Cải thiện dần", "Tiếp tục nở (mix shift)", "Xác nhận cải thiện + CP tài chính giảm"],
      ["Cổ tức tiền", "10,000đ (2 đợt T5+T9/26)", "≥7,000đ", "Đợt 1 (5,000đ) đã chốt quyền 12/5"],
      ["Capex", "—", "300-400 tỷ/năm, không nhà máy lớn", "Chế độ harvest — FCF gần như trả hết cổ đông"],
    ],
    drivers: "(*) LNST 2025 giảm 45 tỷ sau kiểm toán do trích bổ sung hoàn nguyên môi trường + thuế tối thiểu toàn cầu (Pillar 2 — hệ quả có cổ đông mẹ Nhật) — one-off kế toán, không phải suy giảm vận hành. Ba biến số 2026: (1) Tỷ lệ thắng thầu ETC sau nâng cấp Betalactam — leading indicator doanh thu 2027; (2) Mix thành phẩm tự sản xuất tiếp tục tăng — kiểm chứng qua biên gộp từng quý; (3) Giá API (nhập 90% từ TQ/Ấn) + tỷ giá — biến số chi phí duy nhất đáng kể, có độ trễ 1-2 quý qua tồn kho.",
  },
  valuation: {
    methods: [
      "Dividend model (neo chính cho hồ sơ này): cổ tức bền 7,000-10,000đ với payout được cả Taisho lẫn SCIC hậu thuẫn. Giá sàn lý thuyết tại yield = lãi tiết kiệm +2% (≈8%): 7,000/8% ≈ 87-88K. Giá hợp lý tại yield 6.5-7%: 100-108K. Thị giá 101K đang nằm đúng vùng hợp lý — không rẻ, không đắt, trả đúng giá cho sự chắc chắn.",
      "P/E band: fwd 13.1x trên EPS KH 7,700đ — giữa dải lịch sử 12-17x của chính DHG và hợp lý với tier Japan-GMP theo primer (nhóm EU/Japan-GMP xứng 15-18x; DHG chiết khấu nhẹ vì tăng trưởng DT chỉ 5% và free float cạn kiệt thanh khoản).",
      "DCF fade biên (kỷ luật primer Dược): duy trì biên cao 5-7 năm rồi fade khi nhóm thầu cao đông dần (DCL, TRA vào EU-GMP) — KHÔNG extrapolate biên hiện tại vĩnh viễn. Với capex 300-400 tỷ và FCF conversion cao, DCF ra vùng 105-115K — đồng thuận với hai phương pháp trên.",
      "Định giá sự kiện (lớp riêng): nếu kịch bản tender offer Taisho xảy ra, thông lệ M&A dược VN (chính Taisho chào mua DHG 2018-2019) có premium 15-30% so thị giá. Nếu SCIC đấu giá thoái vốn: giá khởi điểm thường không thấp hơn thị giá + định giá lại tài sản. Cả hai đường đều bất lợi cho người ĐỨNG NGOÀI hơn là người đang cầm.",
    ],
    brokers: [
      ["Coverage CTCK", "Rất mỏng", "—", "Free float 5.68% khiến hầu hết CTCK không theo dõi chính thức — thiếu target công khai là ĐẶC ĐIỂM, không phải khiếm khuyết của mã này"],
      ["Khung tự xây — Dividend", "Vùng hợp lý", "100,000–108,000đ", "Yield 6.5-7% trên cổ tức bền 7,000đ"],
      ["Khung tự xây — DCF fade", "Vùng hợp lý", "105,000–115,000đ", "Biên cao 5-7 năm rồi fade; capex harvest mode"],
      ["Khung sự kiện", "Option", "116,000–131,000đ", "Tender premium 15-30% nếu kịch bản Taisho mua nốt xảy ra"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~25%", target: "118,000–130,000đ (+17–29%)", d: "Sự kiện cơ cấu cổ đông kích hoạt theo hướng có lợi: SCIC công bố lộ trình thoái (đấu giá định giá lại toàn công ty) HOẶC Taisho tender offer với premium thông lệ 15-30%. Nền cơ bản hỗ trợ: LNST vượt 1,050 tỷ nhờ thắng thầu Betalactam mới. Lưu ý: bull case của DHG là bull case SỰ KIỆN, không phải bull case chu kỳ — xác suất phụ thuộc quyết định 2 cổ đông lớn, không phụ thuộc thị trường." },
    { label: "🟡 BASE — xác suất ~55%", target: "103,000–112,000đ (+2–11%) + cổ tức ~7-10%", d: "Đạt KH LNST 1,007 tỷ, cổ tức 7,000-10,000đ đều đặn, bài toán free float xử lý theo hướng kỹ thuật (tăng float nhẹ) không tạo sóng. Total return 9-20%/năm trong đó cổ tức chiếm quá nửa — đúng vai 'trái phiếu doanh nghiệp có quyền chọn tăng trưởng' trong danh mục. Đây là mã để NGỦ NGON, không phải để giàu nhanh." },
    { label: "🔴 BEAR — xác suất ~20%", target: "82,000–90,000đ (−11–19%)", d: "Đấu thầu ETC ép giá mạnh (ngân sách BHYT căng) + API tăng giá kéo dài → LNST kẹt 850-900 tỷ, cổ tức hạ về 6,000đ → giá tìm về sàn yield 8% ≈ 82-88K. Downside được đỡ bởi chính cơ chế yield — mỗi 5% giá giảm, yield tăng ~0.5 điểm % lại hút dòng tiền phòng thủ. Kịch bản tồi nhất riêng có: giải pháp free float là HỦY niêm yết với giá tender không hấp dẫn — xác suất thấp (SCIC khó chấp nhận giá rẻ) nhưng cần biết nó tồn tại." },
  ],
  risks: [
    "Rủi ro đặc thù #1 — thanh khoản: free float 5.68%, khối lượng giao dịch rất mỏng; vào/ra vị thế lớn đều khó, bid-ask rộng — position sizing phải nhỏ hơn các mã Batch 1-2",
    "Kết cục bài toán công ty đại chúng là hai chiều: tender/thoái vốn giá tốt (bull) nhưng cũng có thể là hủy niêm yết kém hấp dẫn (tail risk)",
    "Ngân sách BHYT căng → ép giá trúng thầu ETC — đây là bear case chung của cả ngành (primer Dược)",
    "API nhập 90% TQ/Ấn: giá tăng hoặc gián đoạn địa chính trị ăn vào biên với độ trễ 1-2 quý",
    "Tăng trưởng doanh thu chỉ ~5%/năm — không có câu chuyện volume; mọi tăng trưởng LN đến từ mix/margin, sẽ tới trần sau 3-5 năm nếu xuất khẩu không mở được",
    "Long Châu và các chuỗi ép chiết khấu kênh OTC — quyền lực đang dịch về nhà bán lẻ",
  ],
  catalysts: [
    ["T9/2026", "Cổ tức đợt 2/2025 (5,000đ) — dòng tiền hiện hữu, chốt quyền dự kiến trong quý"],
    ["2026 (deadline luật ép)", "Phương án xử lý free float <10% — sự kiện định giá lớn nhất của mã, bắt buộc phải có lời giải"],
    ["Từng quý 2026", "KQKD: giữ nhịp ~250 tỷ LNST/quý các quý còn lại là đủ cán mốc nghìn tỷ — mỗi lần xác nhận là một lần củng cố yield floor"],
    ["2026-2027", "Hoàn tất nâng cấp Betalactam (Taisho) → tỷ lệ thắng thầu ETC + đơn hàng xuất khẩu Nga/Moldova đầu tiên"],
    ["2027+", "Nếu SCIC vào danh mục thoái vốn nhà nước công bố — sóng định giá lại như các thương vụ SCIC lịch sử"],
  ],
  checklist: [
    "Thông báo phương án free float: theo dõi mọi công bố thông tin bất thường — đây là biến số lớn nhất, đọc trước mọi thứ khác",
    "LNST từng quý ≥250 tỷ: nhịp cần thiết cho mốc 1,007 tỷ — Q1 đã 315 tỷ là dư",
    "Biên gộp: tiếp tục nở = mix shift còn chạy; đi ngang 2 quý = câu chuyện margin đã hết đà",
    "Kết quả các gói thầu ETC lớn sau nâng cấp Betalactam (Báo đấu thầu) — leading indicator 2027",
    "Giá API + tỷ giá USD/VND: cảnh báo sớm chi phí; tồn kho 6-12 tháng cho độ trễ phản ứng",
    "Duy trì cổ tức ≥7,000đ tại ĐHĐCĐ 2027: nền tảng của toàn bộ luận điểm yield floor",
  ],
  competitors: [
    {
      ticker: "DBD", name: "CTCP Dược - Trang thiết bị Y tế Bình Định (Bidiphar)", potential: "CAO — tăng trưởng ETC thật, ứng viên tốt nhất trong nhóm so sánh",
      color: "#1D7A46",
      d: "Vị thế độc tôn phân khúc thuốc ung thư (thị phần #1 VN) + thuốc tiêm đặc trị + thứ 2 về dịch thận — phân hóa rõ với DHG (giảm đau hạ sốt) và TRA (đông dược), giúp DBD ít cạnh tranh giá trực tiếp trong đấu thầu phổ thông. Công nghệ đông khô tiên tiến + hệ nhà máy EU-GMP thuộc nhóm dẫn đầu, cho phép vào gói thầu nhóm 1-2 với giá bán tốt hơn. Cơ cấu cổ đông: Nhà nước (Quỹ Đầu tư Phát triển Bình Định) 13.34% + quỹ ngoại chuyên y tế Thụy Sĩ KWE Beteiligungen >10% (từng đầu tư thành công tại IMP) — kết hợp ổn định + kỳ vọng M&A.",
      strengths: "ETC dự báo CAGR 17.3%/năm giai đoạn 2026-2030 nhờ nhà máy Nhơn Hội mở khóa gói thầu nhóm 1-2. ROE ổn định 15-20%, ngang nhóm đầu ngành (DHG, IMP). Free float rất cao (90%) — thanh khoản tốt hơn hẳn DHG (5.68%), dễ vào/ra vị thế. Giá cổ phiếu 2026 đã tăng ~11% từ đầu năm — dòng tiền thị trường đang ưu tiên DBD hơn IMP/DHG chính vì câu chuyện tăng trưởng rõ ràng hơn tính phòng thủ thuần túy. Xuất khẩu đã có tại Lào, Yemen, Mongolia, Myanmar — tuy nhỏ nhưng là hướng mở rộng dài hạn.",
      weaknesses: "Q1/2026 LNST đi ngang (80 tỷ, giảm chưa tới 1%) dù lãi gộp giảm 11% — biên lợi nhuận đang chịu áp lực từ giá vốn và chi phí bán hàng tăng, cần theo dõi 2-3 quý tới để xác nhận đây là nhiễu ngắn hạn hay xu hướng. Rủi ro API: chi phí nguyên liệu nhập khẩu chiếm tới 42.6% giá vốn — biến động giá API thế giới ảnh hưởng trực tiếp biên lợi nhuận, tương tự rủi ro cấu trúc toàn ngành đã nêu ở primer Dược. Quy mô vốn hóa (~5,000+ tỷ) nhỏ hơn DHG, thanh khoản dù cao hơn DHG nhưng vẫn chưa bằng các bluechip lớn.",
      verdict: "Ứng viên hàng đầu để bổ sung bên cạnh hoặc thay thế một phần vị thế DHG cho khung 2-3 năm, nếu ưu tiên TĂNG TRƯỞNG thật hơn là YIELD phòng thủ thuần túy. Khác với DHG (bond proxy + event option), DBD là compounder ETC đang chạy đúng lộ trình — theo dõi biên gộp Q2-Q3/2026 để xác nhận trước khi tăng tỷ trọng mạnh.",
    },
    {
      ticker: "TRA", name: "CTCP Traphaco", potential: "TRUNG BÌNH — turnaround đang diễn ra, cần thêm thời gian xác nhận",
      color: "#8A6D00",
      d: "Thế mạnh truyền thống ở đông dược (thảo dược có bằng chứng, vùng trồng riêng — theo primer Dược) nhưng đang chuyển mình sang tân dược chất lượng cao qua dự án nhà máy EU-GMP tại Hưng Yên, nhắm kênh ETC. Ban lãnh đạo thẳng thắn thừa nhận tại họp cổ đông: cơ hội thị trường lớn nhưng nếu không chuyển đổi nhanh sẽ mất thị phần vào tay đối thủ linh hoạt hơn — một mức độ tự nhận thức rủi ro hiếm thấy trong ngành.",
      strengths: "Đà phục hồi lợi nhuận rất mạnh trong các quý gần đây: Q1/2026 lãi ròng 62-68 tỷ (+43-48% YoY) trên doanh thu +14%, đến từ TÁI CƠ CẤU DANH MỤC SẢN PHẨM thật (chuyển dịch sang mặt hàng biên cao hơn) chứ không phải yếu tố tài chính một lần — giá vốn trong kỳ thậm chí giảm, chất lượng tăng trưởng tốt. Giá cổ phiếu TRA tăng ~8% từ đầu năm 2026, hiệu suất tốt hơn nhiều mã dược khác.",
      weaknesses: "Lịch sử gần đây có giai đoạn xấu: một kỳ báo cáo lợi nhuận giảm hơn 33% dù doanh thu vẫn tăng nhẹ — cho thấy TRA từng trải qua giai đoạn chi phí kém kiểm soát trước khi tái cơ cấu. Nhà máy EU-GMP Hưng Yên còn đang XÂY — theo đúng khung 'GMP Tier Migration' của primer Dược, TRA đang ở giai đoạn SỚM của chu kỳ tái định giá (mua trước sự kiện), nghĩa là rủi ro thực thi (trễ tiến độ, đội vốn) còn cao hơn DBD hay DHG đã có sẵn EU-GMP vận hành. Cần ít nhất 2-4 quý nữa để xác nhận đà tăng trưởng lợi nhuận Q1/2026 là bền vững, không phải hồi phục kỹ thuật sau đáy.",
      verdict: "Đáng theo dõi như một 'quyền chọn tái cơ cấu' — nếu đà cải thiện biên gộp + tiến độ nhà máy Hưng Yên tiếp tục xác nhận qua 2-3 quý tới, TRA có thể chuyển từ 'turnaround' sang 'compounder' giống DBD hôm nay. Hiện tại: vị thế thăm dò nhỏ, chưa đủ bằng chứng để tin tưởng như DBD.",
    },
    {
      ticker: "IMP", name: "CTCP Dược phẩm Imexpharm", potential: "THẤP cho NĐT độc lập — game đã đổi sau M&A, không còn là cổ phiếu tăng trưởng thuần Việt Nam",
      color: "#A33030",
      d: "SỰ KIỆN QUAN TRỌNG NHẤT: Lian SGP Pte. Ltd — pháp nhân liên quan Tập đoàn dược phẩm Livzon (Trung Quốc) — đã HOÀN TẤT chào mua công khai hơn 104.5 triệu cổ phiếu IMP (67.87% vốn) với giá 57,400đ/cổ phiếu, quy mô thương vụ hơn 6,000 tỷ đồng, đưa Lian SGP trở thành công ty mẹ chi phối của Imexpharm. Đây không còn là câu chuyện 'DN dược Việt Nam tăng trưởng độc lập' — mà là một mắt xích trong chiến lược mở rộng khu vực Đông Nam Á của Livzon.",
      strengths: "Trước M&A, nền tảng kinh doanh vẫn tốt: EU-GMP, đang mở rộng Tổ hợp Nhà máy Cát Khánh, Q1/2026 lãi ròng 82 tỷ (+10%) hướng tới kỷ lục lợi nhuận năm thứ 5 liên tiếp. Về mặt chiến lược, sáp nhập vào Livzon có thể mở ra cơ hội tiếp cận công nghệ + kênh xuất khẩu khu vực mà IMP độc lập khó có được — nếu Livzon thực thi tốt, đây có thể là câu chuyện tích cực DÀI HẠN (5-10 năm) cho giá trị doanh nghiệp.",
      weaknesses: "Với cổ đông nhỏ lẻ, hậu M&A mang nhiều bất định hơn cơ hội trong ngắn-trung hạn: (1) Định giá nên neo gần giá tender 57,400đ hơn là theo tăng trưởng nội tại độc lập — phần lớn 'upside tăng trưởng' đã được Livzon trả trong thương vụ; (2) Thanh khoản giao dịch tự do co hẹp đáng kể khi 67.87% đã về tay một cổ đông kiểm soát; (3) Chiến lược tương lai (cổ tức, tái đầu tư, niêm yết) phụ thuộc hoàn toàn vào quyết định của Livzon — cổ đông nhỏ không có tiếng nói; (4) Q1/2026 lợi nhuận +10% đến từ CẮT GIẢM chi phí bán hàng (-10%) và quản lý (-5%) chứ không phải tăng trưởng doanh thu thực — chất lượng tăng trưởng thấp hơn DBD hay TRA cùng kỳ; (5) Rủi ro địa chính trị: một DN dược chiến lược của VN nay thuộc sở hữu TQ có thể đối mặt giám sát chính sách chặt hơn trong tương lai.",
      verdict: "Loại khỏi danh sách cân nhắc độc lập cho khung 2-3 năm tới. Đây không còn là quyết định 'phân tích ngành dược Việt Nam' mà là 'đặt cược vào chiến lược M&A của một tập đoàn Trung Quốc' — một loại rủi ro hoàn toàn khác, đòi hỏi nghiên cứu về Livzon chứ không phải về ngành dược VN. Nếu đã nắm giữ IMP từ trước, cân nhắc chốt lời quanh vùng giá tender hoặc theo dõi sát các động thái đầu tiên của cổ đông mới về chính sách cổ tức/tái đầu tư trước khi quyết định tiếp.",
    },
  ],

  expert: {
    variant: "Thị trường dán nhãn DHG là cổ-phiếu-cổ-tức-buồn-tẻ đã hết tăng trưởng. Variant perception: đây là SPECIAL SITUATION đội lốt bond proxy. Luật Chứng khoán (yêu cầu free float ≥10%) đang ÉP hai cổ đông lớn phải hành động trong 12-24 tháng — không hành động không phải là lựa chọn hợp pháp. Người mua hôm nay được trả yield 7-10%/năm để CHỜ một sự kiện gần như chắc chắn xảy ra mà mọi hướng giải quyết chính (SCIC đấu giá thoái vốn, Taisho tender offer) đều có tiền lệ giá cao hơn thị giá. Rất hiếm khi thị trường trả tiền cho người nắm quyền chọn.",
    strengths: [
      { h: "Downside bị khóa kép: yield floor + động cơ của chính người trong cuộc", d: "Sàn thứ nhất: yield 8% tại ~87K hút dòng tiền phòng thủ một cách cơ học. Sàn thứ hai tinh vi hơn: SCIC không thể thoái dưới giá trị sổ sách + định giá lại (quy định vốn nhà nước), Taisho muốn mua nốt phải trả giá SCIC chấp nhận — nghĩa là cả hai người chơi lớn đều có động cơ CHỐNG giá thấp. Cổ đông nhỏ được che chắn bởi chính xung đột lợi ích của hai gã khổng lồ." },
      { h: "Chất lượng lợi nhuận thuộc nhóm cao nhất sàn", d: "Net cash, không đòn bẩy, cầu không chu kỳ (thuốc điều trị cơ bản), biên nở bằng mix shift chứ không bằng cắt chi phí. LNST 2025 giảm 5% hoàn toàn do hai khoản one-off kế toán (hoàn nguyên môi trường + thuế tối thiểu toàn cầu Pillar 2) — vận hành cốt lõi chưa từng suy giảm. Đây là loại earnings có thể chiết khấu về hiện tại với độ tin cậy cao nhất." },
      { h: "Moat tier được bảo trì bởi cổ đông chiến lược có động cơ dài hạn", d: "Japan-GMP kép + nâng cấp Betalactam bằng công nghệ Taisho: moat đấu thầu nhóm cao không tự phai vì có người bỏ tiền bảo trì nó. Khác các DN dược nội tự lực, DHG có backstop công nghệ — kéo dài vòng đời moat thêm nhiều năm so với đường fade chuẩn của primer." },
      { h: "Quyền chọn sự kiện đang được cho không", d: "Thị giá 101K nằm đúng vùng fair value của dividend model (100-108K) — nghĩa là toàn bộ optionality của sự kiện cơ cấu cổ đông (tender premium 15-30% theo thông lệ) chưa được tính một đồng nào vào giá. Cấu trúc risk/reward: trả giá hợp lý cho phần chắc chắn, nhận miễn phí phần bất định dương." },
    ],
    weaknesses: [
      { h: "Bẫy thanh khoản là rủi ro số 1 — trước cả mọi rủi ro kinh doanh", d: "Free float 5.68% nghĩa là khối lượng giao dịch ngày rất mỏng: vào dễ hơn ra, bid-ask rộng, impact cost 2-5% mỗi vòng cho vị thế lớn. Trong kịch bản cần tiền gấp hoặc thesis gãy, người bán là người trả giá. Sizing phải nhỏ và tiền phải là tiền nhàn rỗi thật sự — đây là ràng buộc cứng, không phải khuyến nghị." },
      { h: "Trần tăng trưởng nhìn thấy được bằng mắt thường", d: "Doanh thu +5%/năm, tuyên bố không xây nhà máy mới: toàn bộ tăng trưởng LN đến từ mix/margin — nguồn sẽ cạn sau 3-5 năm khi mix shift hoàn tất. Sau 2028, nhóm thầu cao đông dần (DCL, TRA vào EU-GMP) ép biên đúng như đường fade của primer. Nếu xuất khẩu qua Taisho không mở được, DHG 2030 là công ty tăng trưởng 3-5% trả cổ tức — định giá phải phản ánh điều đó ngay hôm nay." },
      { h: "Xung đột lợi ích trong chính kịch bản bull: minority không có ghế đàm phán", d: "Kịch bản tender: Taisho muốn mua RẺ, minority muốn bán ĐẮT — và minority không được ngồi vào bàn. Đồng minh bất đắc dĩ duy nhất là SCIC (cũng muốn giá cao), nhưng nếu hai bên thỏa thuận theo cách bất lợi cho cổ đông nhỏ (ví dụ hủy đại chúng với giá tender sát thị giá), lựa chọn còn lại chỉ là bán theo hoặc kẹt với cổ phiếu không niêm yết. Xác suất thấp nhưng hậu quả nặng — đúng định nghĩa tail risk." },
      { h: "Chi phí cơ hội của sự chờ đợi", d: "Nếu sự kiện kéo dài 3-4 năm (đàm phán nhà nước không có deadline mềm), return chỉ là yield 7-10% — thua xa các mã tăng trưởng trong một thị trường bull hậu nâng hạng. DHG là hedge chống thị trường xấu, đồng nghĩa nó tụt hậu khi thị trường tốt. Phải định vị nó đúng vai: thay thế trái phiếu, không thay thế cổ phiếu tăng trưởng." },
    ],
    verdict: "Vị thế: satellite phòng thủ thay thế trái phiếu trong sleeve an toàn — sizing NHỎ (ràng buộc thanh khoản), mua ở yield ≥7% (giá ≤100K với cổ tức 7,000đ), tuyệt đối không đuổi giá. Nắm giữ với hai đồng hồ: đồng hồ cổ tức (T5 + T9 hằng năm) và đồng hồ sự kiện (mọi công bố về phương án free float). Thoát khi: sự kiện chốt ở giá tốt (chốt lời), hoặc cổ tức bị cắt dưới 6,000đ (thesis gãy), hoặc xuất hiện phương án hủy niêm yết giá thấp (chạy trước đám đông).",
  },
},


ree: {
  ticker: "REE", name: "CTCP Cơ Điện Lạnh", sector: "Năng lượng — Đa ngành (Điện · M&E · Văn phòng · Nước)", accent: "#B87000", icon: "⚡",
  rating: "MUA (core defensive — Ô 1 trong ma trận điện)", horizon: "18-30 tháng",
  snapshot: [
    ["Giá (08/06/2026, đã điều chỉnh)", "~50,200đ (sau cổ tức CP 15%, 18/5/2026)"], ["P/B", "~1.5x — đáy 2 năm"],
    ["KH LNST-CĐM 2026", ">2,800 tỷ (công ty đặt) · KQ Q1: 714 tỷ (+17%, ~25% KH)"], ["Doanh thu KH 2026", ">12,000 tỷ — kỷ lục lịch sử (Chủ tịch công bố)"],
    ["Cổ tức", "15% bằng CP (18/5/2026) — duy trì truyền thống chia đều"], ["Điện gió Duyên Hải 1", "48MW COD tháng 3/2026 — bù đắp El Niño"],
    ["M&E hợp đồng mới Q1", "4,865 tỷ — VƯỢT cả năm 2025"], ["Cho thuê VP E.Town 6", "Lấp đầy 68%→85% (2026→2027)"],
  ],
  thesis: [
    { t: "Trụ 1 — Danh mục đa dạng nhất ngành điện là bảo hiểm ENSO có định lượng được", d: "REE là DN điện duy nhất trên sàn có đủ 5 mảnh: thủy điện (nhiều nhà máy gần/đã hết khấu hao) + điện gió (Duyên Hải, Trà Vinh — mới COD 48MW T3/2026, thêm 176MW trong năm) + điện mặt trời + nước sạch + M&E + BĐS văn phòng (E.Town). Khi La Niña chuyển sang trung tính/El Niño giữa 2026 (VDSC, KBSV đều cảnh báo), thủy điện REE giảm nhưng gió MỚI COD và M&E đang bùng nổ hấp thụ phần lớn cú sốc — ACBS gọi thẳng: điện gió Duyên Hải 1 'bù đắp hiệu quả' cho sụt giảm thủy điện. Đây chính là ma trận '5 ô' trong primer Năng lượng vận hành thực tế trên một cổ phiếu duy nhất, không phải lý thuyết." },
    { t: "Trụ 2 — M&E: động cơ tăng trưởng bị thị trường bỏ quên đang bùng nổ đúng lúc thủy điện chững", d: "Giá trị hợp đồng M&E ký mới Q1/2026 đạt 4,865 tỷ — VƯỢT XA tổng cả năm 2025 chỉ trong một quý, nhờ trúng các dự án lớn như Trung tâm dữ liệu An Khánh và Nhà hát Ngọc Trai. KBSV nâng dự phóng doanh thu M&E 2026-27 thêm 23%/21% so với dự báo trước; ACBS dự M&E DT tăng vọt 34% lên 4,721 tỷ nhờ làn sóng đầu tư công vào hạ tầng năng lượng + NLTT — chính REE hưởng lợi kép vừa là chủ đầu tư điện vừa là nhà thầu M&E cho các dự án điện khác trên cả nước. Đây là mảng asset-light, ROIC cao, ít vốn — đối trọng hoàn hảo cho mảng điện thâm dụng vốn." },
    { t: "Trụ 3 — Định giá P/B 1.5x đáy 2 năm trong khi ba động cơ tăng trưởng đang chạy đồng thời", d: "P/B về vùng đáy 2 năm trong khi: (a) E.Town 6 lấp đầy tăng 68%→85% (2026→2027) nhờ TP.HCM định hướng trung tâm tài chính quốc tế + hạ tầng giao thông cải thiện + giá thuê cạnh tranh hạng B; (b) 176MW điện gió mới trong năm; (c) M&E bùng nổ backlog. Bốn CTCK đều khuyến nghị MUA/Tăng tỷ trọng dù khác biệt rõ về mức độ lạc quan (60,800 – 80,900đ) — độ phân tán target chính là bằng chứng thị trường chưa đồng thuận về tốc độ các động cơ mới, tạo biên an toàn cho người hiểu đúng bức tranh tổng." },
  ],
  business: [
    { seg: "Thủy điện", mix: "Cột trụ lợi nhuận lớn nhất — đang vào pha chu kỳ khó", note: "Nhiều nhà máy đã/gần hết khấu hao (hidden value kinh điển — FCF thực > lợi nhuận kế toán, xem primer Năng lượng). Q1/2026 hưởng lợi cuối chu kỳ La Niña thuận lợi. VDSC/KBSV đồng thuận: chuyển pha sang trung tính/El Niño giữa 2026 sẽ ép doanh thu mảng này -6% đến -3% trong 2026-27 — đây là RỦI RO ĐƯỢC BIẾT TRƯỚC, không phải bất ngờ, và đã nằm trong hầu hết dự phóng CTCK." },
    { seg: "Điện gió", mix: "Động cơ bù đắp — đang mở rộng nhanh nhất", note: "Duyên Hải 1 (48MW) COD tháng 3/2026, cộng dự án Duyên Hải V1-4 mới, kế hoạch mở rộng +176MW trong năm 2026. Tốc độ gió cải thiện tại Vĩnh Long. Đây là mảnh ghép được thiết kế CÓ CHỦ ĐÍCH để hedge đúng lúc thủy điện suy yếu theo ENSO — không phải trùng hợp mà là chiến lược phân bổ vốn nhất quán nhiều năm của REE." },
    { seg: "M&E (Cơ điện công trình)", mix: "Bùng nổ backlog — asset-light, ROIC cao", note: "Mảng kinh doanh gốc của REE (tên công ty), tái sinh mạnh nhờ làn sóng đầu tư công + hạ tầng năng lượng + trung tâm dữ liệu. Hợp đồng mới Q1 vượt cả năm 2025. LNST mảng dự báo 274-284 tỷ nhờ doanh thu tăng + giảm trích lập nợ xấu (chất lượng thi công tốt). Vai trò danh mục: đối trọng chu kỳ ngắn hạn cho mảng điện thâm dụng vốn, ROIC cao hơn hẳn." },
    { seg: "Cho thuê văn phòng (E.Town) + Nước sạch", mix: "Ổn định, đang tăng tốc nhờ E.Town 6", note: "E.Town 6 (hạng B) hưởng lợi định hướng TP.HCM thành trung tâm tài chính quốc tế + hạ tầng giao thông cải thiện + giá thuê cạnh tranh khi phân khúc hạng A chậm lại — REE bắt đúng ngách thay thế. DT dự 1,316 tỷ (2026) → 1,397 tỷ (2027), lấp đầy 68%→85%. Nước sạch: dòng tiền đều, ít biến động, vai trò neo ổn định trong danh mục." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025", "KH 2026 (công ty)", "Dải dự phóng CTCK 2026E"],
    rows: [
      ["Doanh thu hợp nhất", "~10,000 tỷ", ">12,000 tỷ (kỷ lục)", "10,774–11,574 tỷ (+7.6% đến +16%)"],
      ["LNST-CĐM", "~2,530 tỷ", ">2,800 tỷ", "2,403–3,120 tỷ (−5% đến +23%) — dải RẤT rộng"],
      ["M&E doanh thu", "—", "—", "4,721 tỷ (ACBS, +34%) nhờ đầu tư công hạ tầng năng lượng"],
      ["Văn phòng cho thuê DT", "—", "—", "1,263–1,316 tỷ · lấp đầy E.Town 6: 68%→85%"],
      ["Thủy điện DT", "—", "—", "2,774–2,874 tỷ (−6% đến −3% YoY do chuyển pha ENSO)"],
      ["Công suất điện gió mới", "—", "+176 MW trong năm", "Duyên Hải 1 (48MW) đã COD T3/2026"],
    ],
    drivers: "Dải dự phóng LNST 2026 rộng bất thường (−5% đến +23%) chính là điểm cần hiểu: khác biệt nằm ở GIẢ ĐỊNH TỐC ĐỘ ENSO chứ không phải chất lượng kinh doanh. VDSC thận trọng nhất (giảm 5%) vì đặt nặng rủi ro El Niño đến sớm; KBSV/SHS/HSC lạc quan hơn vì tin M&E + văn phòng bù đắp đủ. Ba biến số theo dõi: (1) Tốc độ chuyển pha ENSO thực tế (NOAA) — nếu El Niño đến CHẬM hơn dự báo, cả nhóm CTCK thận trọng sẽ phải nâng dự phóng; (2) Tỷ lệ chuyển hoá backlog M&E 4,865 tỷ thành doanh thu ghi nhận — độ trễ thường 2-4 quý; (3) Tốc độ lấp đầy E.Town 6 thực tế so với lộ trình 68%→85%.",
  },
  valuation: {
    methods: [
      "SOTP theo từng mảng (bắt buộc — đúng khung 'chuỗi giá trị nghịch cyclical' của primer Năng lượng): thủy điện EV/EBITDA 6-8x (mature, một phần hết khấu hao — hidden value); điện gió 8-10x (tăng trưởng, giai đoạn ramp-up); M&E P/E 10-13x (asset-light, ROIC cao, nhưng lumpy theo backlog); văn phòng cho thuê định giá theo NOI/cap rate 8-9%; nước sạch EV/EBITDA 7-8x (utility ổn định).",
      "P/B 1.5x là điểm neo nhanh: đáy 2 năm trong khi ROE vẫn ổn định quanh 12-14% — không phải P/B thấp vì công ty xấu đi, mà vì thị trường đang chiết khấu rủi ro El Niño nặng hơn mức hợp lý khi CHƯA tính đủ phần bù đắp từ gió + M&E + văn phòng.",
      "Kiểm chứng qua độ phân tán target 4 CTCK (60,800 – 80,900đ, đã điều chỉnh cổ tức): khoảng cách phản ánh đúng sự bất định ENSO thật, không phải sai số mô hình — đây là tín hiệu NÊN mua theo phương pháp trung bình có trọng số theo xác suất kịch bản thời tiết, không nên chọn một con số neo cứng.",
      "Tuyệt đối không dùng P/E đơn thuần cho mảng thủy điện (khấu hao làm nhiễu — xem Kinh tế ngành primer Năng lượng); P/E chỉ hợp lý áp cho mảng M&E và văn phòng.",
    ],
    brokers: [
      ["VDSC (T5/2026)", "MUA", "67,500đ", "Thận trọng nhất về LNST 2026 (−5%) nhưng vẫn MUA nhờ 176MW gió mới + giá trị nội tại bền vững, không đổi bởi biến động thời tiết ngắn hạn"],
      ["SHS (14/5/2026)", "Tăng tỷ trọng", "70,348đ (đã điều chỉnh)", "Nhấn mạnh triển vọng mở rộng điện gió; có lưu ý rủi ro El Niño"],
      ["HSC (12/5/2026)", "Tăng tỷ trọng", "69,130đ (đã điều chỉnh)", "Tập trung yếu tố định giá tài chính; cập nhật tích cực thủy điện Thác Bà"],
      ["ACBS (T6/2026)", "MUA", "61,400đ (đã điều chỉnh)", "M&E +34% là động lực cốt lõi; điện gió Duyên Hải 1 bù đắp hiệu quả El Niño"],
      ["KBSV (8/6/2026)", "MUA", "60,800đ", "Định giá hấp dẫn nhờ M&E + văn phòng; LNST 2026F 2,813 tỷ (+11%)"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~25%", target: "68,000–72,000đ (+35–43%)", d: "El Niño đến chậm/nhẹ hơn dự báo (thủy điện chỉ giảm nhẹ) + M&E chuyển hoá backlog nhanh thành doanh thu ghi nhận + E.Town 6 lấp đầy vượt tiến độ 85% sớm hơn 2027 → LNST vượt 3,100 tỷ, P/B re-rate về 1.9-2.0x (trung vị lịch sử). Khớp vùng target VDSC/SHS/HSC." },
    { label: "🟡 BASE — xác suất ~50%", target: "58,000–63,000đ (+15–25%)", d: "ENSO chuyển pha đúng lịch trình dự báo, thủy điện giảm 3-6% như KBSV/VDSC ước tính nhưng gió + M&E + văn phòng bù đắp đủ để LNST-CĐM đạt hoặc vượt nhẹ KH >2,800 tỷ → P/B hồi về 1.6-1.7x. Khớp vùng target ACBS/KBSV — đây là kịch bản có xác suất cao nhất vì phần lớn CTCK đã đồng thuận về hướng đi, chỉ khác biên độ." },
    { label: "🔴 BEAR — xác suất ~25%", target: "44,000–48,000đ (−12–19%)", d: "El Niño đến sớm và gắt hơn dự báo (lặp lại 2023) + backlog M&E chuyển hoá chậm (dự án lớn luôn có rủi ro trễ tiến độ) + văn phòng hạng B cạnh tranh gay gắt hơn khi hạng A giảm giá theo → LNST chỉ đạt ~2,300-2,400 tỷ (khớp kịch bản thận trọng nhất của VDSC), P/B về lại 1.3-1.4x. Downside được đỡ một phần bởi hidden value thủy điện hết khấu hao (FCF thực vẫn dương ngay cả khi lợi nhuận kế toán giảm)." },
  ],
  risks: [
    "El Niño là rủi ro trung tâm — mức độ và tốc độ chuyển pha quyết định toàn bộ khoảng dự phóng LNST 2026 (−5% đến +23% giữa các CTCK); đây là biến số thời tiết, không kiểm soát được",
    "Backlog M&E 4,865 tỷ là GIÁ TRỊ HỢP ĐỒNG KÝ, không phải doanh thu đã ghi nhận — rủi ro trễ tiến độ hoặc thay đổi phạm vi dự án luôn hiện hữu ở ngành xây lắp",
    "Cạnh tranh văn phòng cho thuê: nếu hạng A giảm giá mạnh để cạnh tranh, E.Town 6 hạng B có thể bị ép giá thuê dù chiến lược định vị khác phân khúc",
    "SOTP phức tạp 5 mảnh khiến định giá kém minh bạch hơn cổ phiếu điện thuần — một phần lý do độ phân tán target CTCK lớn",
    "Đòn bẩy tài chính cho các dự án gió mới (176MW) nhạy với môi trường lãi suất tăng — dù REE có D/E thấp nhất nhóm điện theo primer, chi phí vốn biên vẫn tăng theo mặt bằng chung",
  ],
  catalysts: [
    ["T7-8/2026", "KQKD Q2: kiểm chứng tốc độ chuyển pha ENSO thực tế đã ảnh hưởng thủy điện đến đâu — dữ liệu quyết định ai đúng giữa VDSC (thận trọng) và ACBS/KBSV (lạc quan)"],
    ["Nửa cuối 2026", "Tiến độ chuyển hoá backlog M&E 4,865 tỷ thành doanh thu ghi nhận — theo dõi tiến độ thi công Trung tâm dữ liệu An Khánh + Nhà hát Ngọc Trai"],
    ["2026 (trong năm)", "Hoàn tất +176MW điện gió mới — mỗi MW COD là bù đắp trực tiếp cho rủi ro El Niño, có thể tính toán ngay"],
    ["21/9/2026", "FTSE hiệu lực — REE thuộc nhóm mid-cap chất lượng, hưởng gián tiếp qua thanh khoản chung dù không nằm trong rổ chính"],
    ["2027", "Tỷ lệ lấp đầy E.Town 6 đạt 85% theo lộ trình — xác nhận chiến lược 'thay thế hạng A bằng hạng B giá cạnh tranh' đúng đắn"],
  ],
  checklist: [
    "Dự báo NOAA về tốc độ chuyển pha ENSO hàng tháng — biến số trung tâm quyết định toàn bộ thesis ngắn hạn",
    "Sản lượng thủy điện + điện gió hàng tháng/quý so với cùng kỳ: xác nhận gió đang bù đắp đủ cho thủy điện suy giảm",
    "Giá trị hợp đồng M&E ký mới từng quý + tỷ lệ chuyển hoá thành doanh thu: backlog phải tiếp tục dày và chuyển hoá đúng nhịp",
    "Tỷ lệ lấp đầy E.Town 6 theo quý: đúng lộ trình 68%→85% hay chậm hơn",
    "P/B so với dải lịch sử 1.3-2.2x: dưới 1.5x là vùng tích lũy hấp dẫn; trên 2.0x cân nhắc chốt lời một phần",
  ],
  expert: {
    variant: "Thị trường đang chiết khấu REE như một cổ phiếu thủy điện thuần chịu rủi ro El Niño toàn phần — chính vì vậy 4 CTCK cho target chênh nhau tới 33% (60,800 vs 80,900đ), một mức phân tán bất thường cho một large-cap đã niêm yết hơn 25 năm. Variant perception: REE không còn là cổ phiếu thủy điện từ nhiều năm nay — đó là một MINI-HOLDING NĂNG LƯỢNG-HẠ TẦNG được thiết kế có chủ đích để mỗi mảnh bù đắp cho mảnh kia đúng lúc ENSO đảo chiều. Nhìn đúng bản chất danh mục, biên độ dao động LNST theo El Niño phải hẹp hơn nhiều so với một DN thủy điện thuần túy — và đó chính là khoảng chênh lệch định giá đang bị bỏ ngỏ.",
    strengths: [
      { h: "Kỹ thuật phân bổ vốn chống chu kỳ hiếm có trên sàn", d: "Rất ít DN Việt Nam chủ động xây danh mục tài sản có tương quan ÂM với nhau theo chu kỳ thời tiết (thủy điện thắng La Niña, gió + tốc độ gió Vĩnh Long ổn định hơn) và theo chu kỳ kinh tế (M&E asset-light bùng nổ khi đầu tư công tăng, văn phòng ổn định dài hạn theo tăng trưởng đô thị). Đây là tư duy portfolio construction ở cấp độ công ty — công ty đã làm sẵn phần lớn việc đa dạng hoá đó thay vì để nhà đầu tư tự làm SOTP." },
      { h: "Hidden value thủy điện chưa từng được thị trường định giá đủ", d: "Nhiều nhà máy trong danh mục đã hoặc gần hết khấu hao — theo đúng cơ chế 'End-of-Depreciation Catalyst' của primer Năng lượng: chi phí kế toán giảm đột ngột trong khi dòng tiền vận hành không đổi, làm FCF thực > lợi nhuận kế toán báo cáo. Định giá theo P/E hoặc P/B sổ sách vì thế luôn đánh giá THẤP giá trị thực của cụm tài sản này — đây là biên an toàn không nằm trong bất kỳ báo cáo CTCK nào ở trên vì phải đọc trực tiếp thuyết minh tài sản cố định." },
      { h: "M&E là optionality miễn phí bị thị trường đọc nhầm thành 'mảng phụ'", d: "Vì tên công ty gắn với 'Cơ Điện Lạnh', M&E thường bị coi là di sản lịch sử thay vì động cơ tăng trưởng thật. Nhưng backlog Q1/2026 vượt cả năm 2025 chứng minh đây là mảng đang tái sinh mạnh, ăn theo đúng làn sóng đầu tư công + hạ tầng năng lượng quốc gia mà primer Năng lượng đã chỉ ra ($136B QHĐ8). REE vừa là chủ đầu tư điện hưởng lợi trực tiếp từ QHĐ8, vừa là nhà thầu M&E hưởng lợi gián tiếp khi các DN điện khác cũng đầu tư — một dạng đòn bẩy kép hiếm thấy." },
      { h: "Ban lãnh đạo có track record dự báo đúng và truyền thông minh bạch", d: "Chủ tịch công khai mục tiêu doanh thu kỷ lục >12,000 tỷ ngay từ đầu năm và các nhà máy điện 'đang chạy hết công suất' — kiểu công bố cụ thể, có thể kiểm chứng theo quý, khác hẳn văn hóa mơ hồ của nhiều DN vốn nhà nước cùng ngành. Cổ tức cổ phiếu 15% đều đặn cũng cho thấy kỷ luật phân phối vốn nhất quán qua nhiều năm, kể cả năm khó khăn." },
    ],
    weaknesses: [
      { h: "SOTP 5 mảnh là con dao hai lưỡi — minh bạch thấp hơn cổ phiếu điện thuần", d: "Đúng là REE hưởng lợi từ đa dạng hoá, nhưng đổi lại nhà đầu tư phải tự dựng mô hình 5 lớp để hiểu công ty thay vì đọc một P/E đơn giản. Độ phức tạp này khiến REE khó được các quỹ index-hoá hoặc quỹ theo dõi thụ động ưu ái so với cổ phiếu điện 'thuần' dễ phân loại — một dạng discount cấu trúc khó biến mất ngay cả khi từng mảnh đều tốt." },
      { h: "Không mảnh nào đủ lớn để trở thành câu chuyện tăng trưởng độc lập hấp dẫn dòng tiền lớn", d: "So với GEG (thuần NLTT, câu chuyện DPPA rõ ràng) hay PC1 (thuần EPC, backlog dễ đọc), REE không có MỘT động cơ đủ mạnh để thu hút dòng tiền theo chủ đề (thematic flows). Trong các đợt sóng ngành có chủ đề rõ (ví dụ sóng NLTT thuần), REE thường tăng chậm hơn các cổ phiếu 'pure-play' vì tỷ trọng gió chỉ là một phần danh mục." },
      { h: "Thủy điện vẫn là cột trụ lợi nhuận LỚN NHẤT — đa dạng hoá giảm nhưng không xoá rủi ro ENSO", d: "Dù có gió và M&E bù đắp, dải dự phóng LNST 2026 giữa các CTCK vẫn rộng tới 28 điểm % (−5% đến +23%) — chứng tỏ ENSO vẫn là biến số chi phối chính, không phải biến số phụ đã được trung hoà hoàn toàn. Nhà đầu tư kỳ vọng REE 'miễn nhiễm' El Niño là kỳ vọng sai; đúng hơn là REE 'ít tổn thương hơn' các công ty thủy điện thuần — một khác biệt về mức độ, không phải về bản chất." },
      { h: "Backlog M&E là cam kết trên giấy — độ trễ và rủi ro thực thi là thật", d: "4,865 tỷ giá trị ký mới là con số ấn tượng nhưng ngành xây lắp/M&E kinh điển có rủi ro trễ tiến độ, phát sinh chi phí, tranh chấp thanh toán với chủ đầu tư. Dự báo LNST mảng M&E dựa một phần vào giả định 'giảm trích lập nợ xấu' — nếu một dự án lớn gặp vấn đề pháp lý hoặc tài chính từ phía chủ đầu tư, phần lợi nhuận kỳ vọng này có thể không về đúng hẹn." },
    ],
    verdict: "Vị thế: core holding phòng thủ-tăng trưởng cân bằng trong sleeve năng lượng — đúng vai 'Ô 1' của ma trận primer (D/E thấp nhất, danh mục đa dạng nhất, giữ mọi pha ENSO). Sizing: trung bình-lớn, phù hợp làm nền tảng thay vì vệ tinh vì biến động thấp hơn GEG/PC1 đáng kể. Kỷ luật vào: ưu tiên tích lũy khi P/B về dưới 1.5x (vùng đáy 2 năm hiện tại) hoặc khi tin tức El Niño tiêu cực gây phản ứng thái quá ngắn hạn. Theo dõi sát: dữ liệu ENSO hàng tháng + tốc độ chuyển hoá backlog M&E. Chốt lời một phần: P/B vượt 2.0x hoặc khi cả 4 CTCK đồng loạt nâng target sau một quý.",
  },
},


bmp: {
  ticker: "BMP", name: "CTCP Nhựa Bình Minh", sector: "Vật liệu xây dựng — Nhựa (Ống PVC/HDPE)", accent: "#2E6B8A", icon: "🔧",
  rating: "MUA (core holding — yield + tăng trưởng chu kỳ nguyên liệu)", horizon: "18-30 tháng",
  snapshot: [
    ["Giá (25/06/2026)", "~136,000–151,000đ"], ["P/E fwd 2026", "~10.1x (Vietcap) — ngang TB lịch sử"],
    ["KH LNST 2026", "Kỷ lục mới — Vietcap dự 1,413 tỷ"], ["Q1/2026", "DT 1,457 tỷ (+5.4%) · LNST 304 tỷ (+6%), biên gộp 47% (từ 42%)"],
    ["Cổ tức 2025", "14,860đ (99% LNST) · 2026F: 17,000đ (Vietcap, yield ~9.8%)"], ["Chủ sở hữu", "Nawaplastic (SCG Thái Lan) 54.99%"],
    ["Đòn bẩy", "Nợ vay chỉ ~2% tổng tài sản — gần như không vay"], ["Thị phần", "~28% thị trường ống nhựa cả nước"],
  ],
  thesis: [
    { t: "Trụ 1 — Hưởng lợi kép: giá PVC thấp lịch sử + cầu xây dựng hồi phục cùng lúc", d: "Giá PVC Trung Quốc đã giảm ~26% từ đỉnh đầu năm 2026, tồn kho thương mại TQ ở mức cao lịch sử trong khi công suất toàn ngành +9% và cầu xây dựng nội địa TQ giảm 3 năm liên tiếp — Vietcap duy trì quan điểm kém tích cực với giá PVC dài hạn, đúng hướng có lợi cho biên gộp BMP. Đồng thời BMP đã chủ động tăng giá bán 20% từ T4/2026 (song song NTP tăng 25%) để phòng ngừa biến động — hai lực cộng hưởng (giá vốn giảm + giá bán ổn định/tăng) đẩy biên gộp Q1/2026 lên 47% từ 42% cùng kỳ. Đây là công thức lợi nhuận đơn giản, dễ theo dõi hơn nhiều so với các ngành phức tạp khác đã phân tích." },
    { t: "Trụ 2 — Cỗ máy cổ tức được bảo chứng bởi chủ sở hữu chiến lược chuyên nghiệp", d: "Nawaplastic (thuộc SCG — tập đoàn công nghiệp hàng đầu Thái Lan) sở hữu 54.99%, mang lại kỷ luật quản trị và phân bổ vốn nhất quán: BMP duy trì payout 98-100% LNST bằng tiền mặt liên tục từ 2019-2024, và Phó Chủ tịch HĐQT khẳng định tại ĐHĐCĐ 2026 'không nhiều doanh nghiệp có khả năng chia cổ tức tốt như BMP' ngay cả khi 'tình hình chung rất phức tạp'. Nợ vay chỉ ~2% tổng tài sản — gần như miễn nhiễm rủi ro lãi suất, khác biệt hoàn toàn với các ngành thâm dụng vốn (điện, cảng, BĐS) đã phân tích trước đó. Dòng tiền hoạt động dự phóng ổn định 1,500-1,600 tỷ/năm đảm bảo cổ tức bền vững." },
    { t: "Trụ 3 — Hưởng lợi trực tiếp từ chính sách NOXH + đầu tư công — đúng thesis primer BĐS", d: "Nhu cầu ống nhựa xây dựng tăng nhờ làn sóng NOXH (701,000/1 triệu căn mục tiêu 2030, tương đương 70.1% — theo đúng số liệu primer BĐS) cộng các dự án trọng điểm đầu tư công. Đây là kênh hưởng lợi GIÁN TIẾP nhưng chắc chắn từ chu kỳ phục hồi BĐS-hạ tầng 2026-2028 mà không chịu rủi ro trực tiếp của ngành BĐS (không có bond wall, không đòn bẩy dự án, không rủi ro pháp lý đất đai) — một cách 'chơi' chu kỳ xây dựng an toàn hơn nhiều so với cổ phiếu BĐS/thép thuần." },
  ],
  business: [
    { seg: "Ống nhựa PVC cứng (uPVC)", mix: "Cột trụ doanh thu lớn nhất", note: "Sản phẩm truyền thống chủ lực từ 1977, dùng cho cấp thoát nước, xây dựng dân dụng. Nhạy trực tiếp với giá PVC nguyên liệu (nhập chủ yếu từ TQ) — biên gộp co giãn mạnh theo chu kỳ giá hàng hóa toàn cầu." },
    { seg: "Ống HDPE, PEHD (gân + trơn)", mix: "Tăng trưởng nhanh hơn PVC truyền thống", note: "Ứng dụng rộng hơn trong hạ tầng kỹ thuật, cấp nước quy mô lớn, ít cạnh tranh giá gay gắt hơn phân khúc PVC phổ thông. Hưởng lợi trực tiếp từ đầu tư công hạ tầng kỹ thuật đô thị." },
    { seg: "Phụ tùng ống + sản phẩm nhựa kỹ thuật khác", mix: "Bổ trợ, biên cao hơn", note: "Phụ kiện đi kèm hệ ống chính, bình phun thuốc trừ sâu, nón bảo hộ lao động — đa dạng hóa nhỏ giúp tối ưu hóa công suất 4 nhà máy (TP.HCM, Bình Dương, Long An, Hưng Yên, tổng công suất 150,000 tấn/năm)." },
    { seg: "Kênh phân phối & thương hiệu", mix: "Moat chính — 28% thị phần cả nước", note: "Thương hiệu lâu đời nhất ngành ống nhựa VN (thành lập 1977), mạng lưới phân phối rộng khắp miền Nam là chính. Thách thức hàng giả/hàng nhái được công ty xem là rủi ro thương hiệu cần quản lý liên tục — một dạng 'thuế vô hình' của việc là thương hiệu dẫn đầu." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025", "2026E (Vietcap)", "Nhịp Q1/2026"],
    rows: [
      ["Doanh thu", "~5,400-5,600 tỷ (ước)", "Tăng nhờ SL +10%", "1,457 tỷ (+5.4%)"],
      ["LNST", "~1,216 tỷ (chia cổ tức 99%)", "1,413 tỷ (kỷ lục)", "304 tỷ (+6%), đạt 24% KH năm"],
      ["Biên gộp", "~46.5% (từ 43.1% năm trước)", "Tiếp tục mở rộng +3.5 điểm%/năm", "47% (từ 42% cùng kỳ)"],
      ["Sản lượng tiêu thụ", "Nền cao", "+~10% nhờ cầu xây dựng", "23,820 tấn (+8% so quý trước)"],
      ["Cổ tức tiền mặt", "14,860đ (99%)", "17,000đ dự phóng (~98-100%)", "Đợt cuối 8,360đ đã chi 10/6/2026"],
      ["Đòn bẩy tài chính", "Nợ vay ~2% tổng tài sản", "Duy trì tối thiểu", "Không đổi — chính sách nhất quán"],
    ],
    drivers: "Ba biến số 2026: (1) Giá PVC Trung Quốc — Vietcap giữ quan điểm giá đi ngang/giảm nhờ tồn kho cao + cầu BĐS TQ yếu, nhưng cần theo dõi rủi ro địa chính trị (xung đột Trung Đông từng đẩy giá PVC/HDPE/PPR tăng đột biến 65-100% trong một đợt ngắn hạn Q1/2026 — rủi ro đuôi có thật dù đã hạ nhiệt); (2) Hiệu quả chuyển giá bán mới (+20% từ T4/2026) vào doanh thu thực tế mà không mất thị phần — theo dõi sản lượng quý tới; (3) Tốc độ giải ngân NOXH + đầu tư công thực tế — leading indicator cho cầu ống nhựa 2027-28.",
  },
  valuation: {
    methods: [
      "DCF kết hợp P/E là phương pháp chuẩn (Vietcap dùng tỷ trọng DCF 70% + P/E 30%): P/E fwd 10.1x ngang trung bình lịch sử 5-10 năm (9.2-11.3x) — không đắt, không rẻ bất thường, phản ánh đúng bản chất DN ổn định trưởng thành hơn là tăng trưởng đột biến.",
      "Dividend yield floor: cổ tức 2026F 17,000đ tại giá ~151K = yield 9.8% — cao hơn lãi tiết kiệm 3-4 điểm%, tạo sàn định giá cứng tương tự cơ chế đã phân tích ở VNM/DHG trong các primer trước. Payout 98-100% bền vững nhờ nợ vay gần như bằng 0 và dòng tiền hoạt động ổn định >1,500 tỷ/năm.",
      "So sánh ngang hàng với NTP: BMP xứng đáng premium nhẹ nhờ đòn bẩy thấp hơn hẳn (2% vs NTP có vay dù dư tiền mặt) và không có rủi ro quản trị (NTP vừa có thành viên HĐQT bị khởi tố T5/2026).",
      "Cross-check replacement cost: 4 nhà máy công suất 150,000 tấn/năm + thương hiệu 47 năm — vốn hóa hiện tại không phản ánh premium thương hiệu dẫn đầu ngành so với chi phí xây mới toàn bộ hệ thống phân phối.",
    ],
    brokers: [
      ["Vietcap (T6/2026)", "MUA", "192,500đ", "DCF 70% + P/E 30%; nâng 24% so lần trước; LNST 2026 kỷ lục 1,413 tỷ; cổ tức 17,000đ"],
      ["AGR (T7/2026)", "Tích cực", "178,000đ", "PVC giảm 26% từ đỉnh trong khi giá bán tăng 15% từ T4 → biên gộp mở rộng các quý tới"],
      ["HSC (T4/2026, thận trọng hơn)", "THEO DÕI", "63K→ điều chỉnh theo giai đoạn", "Lưu ý bất ổn địa chính trị ngắn hạn (giá PVC tăng đột biến do xung đột Trung Đông); khuyến nghị kiên nhẫn chờ tín hiệu rõ ràng hơn trước khi tích lũy thêm"],
      ["Đồng thuận", "MUA nghiêng trội", "178,000–192,500đ", "Upside 18-42% tùy mốc giá vào, cộng yield 9-10%/năm — tổng return kỳ vọng hấp dẫn nhất nhóm vừa phân tích"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~30%", target: "185,000–195,000đ (+22–29%) + yield ~10%", d: "Giá PVC tiếp tục ở vùng thấp lịch sử (tồn kho TQ không giải phóng nhanh) + NOXH giải ngân đúng tiến độ 2026-27 + đầu tư công tăng tốc → biên gộp duy trì trên 47%, LNST vượt 1,450 tỷ, P/E re-rate nhẹ lên 11-12x. Khớp target Vietcap/AGR." },
    { label: "🟡 BASE — xác suất ~50%", target: "160,000–175,000đ (+6–16%) + yield ~9-10%", d: "Giá PVC đi ngang quanh 800-850 USD/tấn, sản lượng +8-10% theo cầu xây dựng ổn định, biên gộp giữ 45-46% → LNST đạt hoặc gần đạt KH kỷ lục Vietcap, P/E giữ 10-11x. Return chủ yếu từ cổ tức + tăng trưởng lợi nhuận vừa phải — đúng vai trò 'ngủ ngon, ăn đều' trong danh mục." },
    { label: "🔴 BEAR — xác suất ~20%", target: "115,000–125,000đ (−15–24%) nhưng yield tăng bù đắp", d: "Địa chính trị leo thang khiến giá PVC/HDPE/PPR tăng đột biến trở lại (như đợt xung đột Trung Đông đầu 2026 từng đẩy giá +65-100%) mà BMP không kịp chuyển hết vào giá bán → biên gộp co về 38-40%, LNST giảm 10-15% so KH → P/E nén về 8-9x. Downside được đỡ một phần bởi yield tăng lên ~11-12% ở vùng giá thấp — cơ chế sàn định giá tương tự các bond-proxy khác trong bộ phân tích.", },
  ],
  risks: [
    "Giá PVC/nguyên liệu nhựa có thể đảo chiều đột ngột do địa chính trị (đã xảy ra thật Q1/2026 với xung đột Trung Đông, giá tăng 65-100% trong thời gian ngắn) — đây là rủi ro đuôi khó dự báo dù xác suất nền thấp",
    "Cạnh tranh giá từ NTP và các DN nhựa nhỏ hơn ở phân khúc phổ thông, đặc biệt khi cả hai cùng phải tăng giá bán để bù chi phí — nguy cơ chiến tranh giá nếu một bên phá giá để giữ thị phần",
    "Phụ thuộc thị trường xây dựng dân dụng + hạ tầng nội địa — nếu chu kỳ BĐS-đầu tư công chậm lại hơn dự kiến (theo primer BĐS: lãi vay mua nhà +3-4 điểm% năm 2026 là rủi ro thật), cầu ống nhựa tăng chậm hơn kỳ vọng",
    "Hàng giả/hàng nhái ăn theo thương hiệu — rủi ro dài hạn cho biên lợi nhuận và uy tín nếu không kiểm soát tốt",
    "Payout 98-100% nghĩa là hầu như không giữ lại lợi nhuận tái đầu tư mở rộng công suất — tăng trưởng dài hạn (>3-5 năm) phụ thuộc vào tăng trưởng ngành tự nhiên hơn là M&A/mở rộng chủ động",
  ],
  catalysts: [
    ["T7-8/2026", "KQKD Q2: kiểm chứng hiệu quả đợt tăng giá bán +20% (từ T4) đã phản ánh đầy đủ vào doanh thu mà không mất sản lượng"],
    ["Nửa cuối 2026", "Diễn biến giá PVC Trung Quốc + tồn kho thương mại — theo dõi hàng tuần để dự báo biên gộp quý tới"],
    ["Cuối 2026", "Tạm ứng cổ tức đợt 1/2026 — xác nhận tiếp nối chính sách payout cao dù 'tình hình phức tạp'"],
    ["Định kỳ hàng quý", "Tiến độ giải ngân NOXH toàn quốc (701K/1 triệu căn) + đầu tư công hạ tầng — leading indicator cầu ống nhựa 2027-28"],
    ["2027+", "Khả năng SCG/Nawaplastic mở rộng đầu tư công suất hoặc M&A trong khu vực nếu chu kỳ ngành thuận lợi kéo dài — hiện chưa có kế hoạch công bố cụ thể"],
  ],
  checklist: [
    "Giá PVC/HDPE/PPR Trung Quốc hàng tuần: xu hướng giảm/đi ngang bền vững = xác nhận thesis biên gộp; tăng đột biến = cảnh báo sớm",
    "Biên gộp từng quý so với 45-47% hiện tại: duy trì hoặc mở rộng = tốt; co lại 2 quý liên tiếp = cần đánh giá lại",
    "Sản lượng tiêu thụ theo quý: tăng trưởng đi cùng giá bán mới (không giảm để giữ sản lượng) = pricing power thật",
    "Tỷ lệ hoàn thành KH NOXH quốc gia + giải ngân đầu tư công hạ tầng: theo dõi hàng quý làm proxy cầu ngành",
    "Chính sách cổ tức mỗi kỳ ĐHĐCĐ: duy trì payout 95-100% = tín hiệu sức khỏe tài chính + niềm tin ban lãnh đạo không đổi",
  ],
  expert: {
    variant: "Thị trường đánh giá BMP như một cổ phiếu 'phòng thủ nhàm chán trả cổ tức cao' — điều này đúng nhưng chưa đủ. Variant perception: BMP đang ở ĐIỂM GIAO CỦA HAI CHU KỲ THUẬN LỢI CÙNG LÚC hiếm khi xảy ra đồng thời — chu kỳ nguyên liệu (PVC giá thấp lịch sử do dư cung TQ) và chu kỳ cầu (BĐS-NOXH-đầu tư công hồi phục theo đúng thesis primer BĐS). Phần lớn nhà đầu tư định giá BMP bằng P/E tĩnh mà bỏ qua rằng biên gộp đang MỞ RỘNG CẤU TRÚC (42%→47% trong 1 năm) — nếu duy trì, đây không chỉ là 'cổ phiếu cổ tức' mà là câu chuyện tăng trưởng lợi nhuận hai chữ số với rủi ro thấp hơn hẳn tăng trưởng nhờ đòn bẩy hay M&A.",
    strengths: [
      { h: "Công thức lợi nhuận đơn giản nhất trong toàn bộ danh mục đã phân tích", d: "So với GMD (SOTP 3 tầng), MSN (SOTP holding 3 động cơ), hay REE (SOTP 5 mảnh), BMP chỉ có MỘT biến số chính cần theo dõi: chênh lệch giá bán − giá PVC nguyên liệu. Sự đơn giản này không phải là điểm yếu — với nhà đầu tư cá nhân, đây là cổ phiếu DỄ THEO DÕI NHẤT để tự tin nắm giữ dài hạn mà không cần cập nhật liên tục nhiều biến số phức tạp." },
      { h: "Chủ sở hữu chiến lược SCG là bảo chứng quản trị hiếm có trên sàn VN", d: "Khác với nhiều DN Việt Nam có chủ sở hữu nhà nước (dễ có xung đột lợi ích chính sách) hoặc gia đình trị (rủi ro quản trị tập trung), Nawaplastic/SCG là tập đoàn công nghiệp Thái Lan chuyên nghiệp với văn hóa quản trị minh bạch, phân bổ vốn kỷ luật — thể hiện qua chính sách cổ tức payout gần 100% duy trì liên tục nhiều năm bất kể biến động ngắn hạn." },
      { h: "Đòn bẩy tài chính gần bằng 0 là tấm khiên hiếm có trong môi trường lãi suất tăng", d: "Trong bối cảnh primer Năng lượng/BĐS/Ngân hàng đều nhấn mạnh rủi ro lãi suất tăng 2026 ăn mòn EPS các DN đòn bẩy cao, BMP với nợ vay chỉ ~2% tổng tài sản gần như MIỄN NHIỄM hoàn toàn với rủi ro này — một trong rất ít cổ phiếu trên sàn có thể nói vậy với bằng chứng số liệu rõ ràng." },
      { h: "Yield 9-10% tạo sàn định giá cứng đồng thời cho phép 'chờ' mà không tốn chi phí cơ hội", d: "Khác với REE hay GMD (return chủ yếu chờ catalyst 2027-28), BMP trả nhà đầu tư ngay bằng tiền mặt trong lúc chờ chu kỳ ngành tiếp diễn — giảm áp lực phải đoán đúng thời điểm vào lệnh, một lợi thế tâm lý quan trọng cho nhà đầu tư không theo dõi thị trường liên tục." },
    ],
    weaknesses: [
      { h: "Payout gần 100% đồng nghĩa tăng trưởng dài hạn (>5 năm) bị giới hạn cấu trúc", d: "Không giữ lại lợi nhuận để mở rộng công suất hay M&A nghĩa là BMP về bản chất là một 'utility trả cổ tức' hơn là compounder tăng trưởng — phù hợp nhà đầu tư ưu tiên thu nhập ổn định, nhưng sẽ khiến người kỳ vọng tăng trưởng vốn mạnh (kiểu HPG hay MSN) thất vọng nếu đặt sai kỳ vọng." },
      { h: "Thesis phụ thuộc hoàn toàn vào một biến số ngoại sinh khó kiểm soát: giá PVC toàn cầu", d: "Dù hiện tại thuận lợi, giá PVC là hàng hóa toàn cầu chịu ảnh hưởng bởi cung-cầu Trung Quốc + địa chính trị (đã chứng minh bằng biến động +65-100% do xung đột Trung Đông chỉ trong một quý) — đây là rủi ro NGOÀI TẦM KIỂM SOÁT của ban lãnh đạo BMP dù họ quản lý tốt đến đâu. Khác với DBD hay REE (rủi ro có thể quản lý bằng chiến lược nội tại), BMP về cơ bản là một 'bet' vào chu kỳ hàng hóa PVC thuận lợi tiếp tục." },
      { h: "Thiếu động lực tăng trưởng ngoài chu kỳ giá nguyên liệu và cầu xây dựng tự nhiên", d: "Không có câu chuyện 'quyền chọn miễn phí' như ray đường sắt của HPG, MSR của MSN, hay Gemalink GĐ2 của GMD — upside của BMP về cơ bản bị giới hạn trong biên độ chu kỳ nguyên liệu + tăng trưởng ngành xây dựng hữu cơ (~8-10%/năm). Đây là lý do P/E fwd 10x là hợp lý chứ khó vượt xa trung bình lịch sử trừ khi có thay đổi cấu trúc lớn (M&A, mở rộng quốc tế) mà hiện chưa có dấu hiệu." },
      { h: "Cạnh tranh giá với NTP có thể leo thang nếu một bên chọn phá giá giữ thị phần", d: "Cả BMP và NTP cùng tăng giá bán ~20-25% đồng thời (T4/2026) — hành động phối hợp ngầm này tốt cho biên gộp ngành hiện tại, nhưng nếu một bên (đặc biệt NTP đang gặp scandal quản trị, có thể cần 'gây tiếng vang' bằng tăng trưởng thị phần) quyết định phá giá để giành thị trường, biên gộp cả ngành có thể bị ép ngược trở lại." },
    ],
    verdict: "Vị thế: core holding phòng thủ-thu nhập trong sleeve vật liệu xây dựng — đúng như gợi ý ban đầu, đây là mã có hồ sơ risk/reward rõ ràng và đơn giản nhất trong toàn bộ 7 mã đã phân tích. Sizing: trung bình-lớn, phù hợp làm nền tảng ổn định bù trừ cho các vị thế biến động cao hơn (HPG, GMD, MSN) trong danh mục. Kỷ luật vào: tích lũy đều đặn (dollar-cost average) thay vì chờ thời điểm hoàn hảo, vì đây không phải cổ phiếu có catalyst rời rạc rõ ràng mà là câu chuyện chu kỳ dần dần. Theo dõi sát: giá PVC Trung Quốc hàng tuần là chỉ báo sớm quan trọng nhất. Chốt lời một phần: nếu P/E vượt 13-14x (trên đỉnh dải lịch sử) mà không có yếu tố cấu trúc mới hỗ trợ.",
  },
},


dbc: {
  ticker: "DBC", name: "CTCP Tập đoàn Dabaco Việt Nam", sector: "Nông nghiệp — Chăn nuôi (3F: Feed-Farm-Food)", accent: "#C2410C", icon: "🐷",
  rating: "THEO DÕI/TÍCH LŨY THĂM DÒ — trade theo pig cycle, không phải buy-and-hold", horizon: "12-18 tháng (theo chu kỳ giá heo)",
  snapshot: [
    ["Giá (22/05/2026)", "~21,700–22,600đ"], ["Vốn hóa", "~8,350–8,580 tỷ"],
    ["Đã giảm từ đỉnh (4/2 → 29/4/2026)", "−23% (từ 29,000đ) — dưới MA200"], ["KH LNST 2026", "1,007-1,117 tỷ (giảm 26% so thực hiện 2025 — hai nguồn số liệu công ty hơi lệch)"],
    ["Q1/2026", "DT 4,124 tỷ (+14.3%) · LNST 374 tỷ (−26.4% YoY, đạt 33.5% KH năm)"], ["Biên gộp Q1", "16.8% (từ 22.6% cùng kỳ) — co mạnh"],
    ["Đàn hiện tại", "~60,000 nái + 1.2-1.4 triệu heo thịt tự nuôi (+ liên kết 14,000 nái/100,000 thịt)"], ["Nợ vay/Vốn CSH", "63.9% — đòn bẩy đáng kể, giảm nhẹ so đầu năm"],
  ],
  thesis: [
    { t: "Trụ 1 — Đã qua đỉnh chu kỳ heo 2025, đang ở pha điều chỉnh được dự báo trước — không phải bất ngờ xấu", d: "2025 là năm đỉnh lịch sử của DBC: giá heo phục hồi mạnh, có lúc chạm 80,000đ/kg, trung bình cả năm 68,000đ/kg, đàn nái tăng 27.6%. Q1/2026 giá heo thấp hơn cùng kỳ khiến LNST giảm 26.4% — đây là hệ quả TỰ NHIÊN của pig cycle (giá cao → tái đàn → cung tăng → giá giảm) đã nêu trong primer FMCG, không phải sự cố bất thường của riêng DBC. Quan trọng: kế hoạch 2026 công ty đặt RẤT THẬN TRỌNG (giảm 26% so thực hiện 2025) ngay từ đầu năm — nghĩa là kỳ vọng thị trường đã phần nào phản ánh trước, giảm rủi ro 'thất vọng kép'." },
    { t: "Trụ 2 — Mô hình 3F khép kín + quy mô đàn lớn là lợi thế cấu trúc so với hộ chăn nuôi nhỏ lẻ", d: "Chủ tịch HĐQT phát biểu thẳng tại ĐHĐCĐ: 'trong vòng 5 năm nữa, nông dân không nuôi heo nữa chỉ còn các công ty, hợp tác xã nuôi vì họ không thể cạnh tranh được về năng suất, dịch bệnh, chi phí' — đúng xu hướng chuyển dịch cơ cấu ngành đã nêu trong primer FMCG (quy định chặt chẽ hơn về môi trường, an toàn sinh học thu hẹp hộ nhỏ lẻ). DBC đang chủ động RÚT DẦN liên kết với nông dân, dồn về mô hình tự nuôi tại trang trại công nghệ cao — hướng tới 80,000 nái + hơn 2 triệu heo thịt/năm trước 2028. Feed (TĂCN) − Farm (chăn nuôi) − Food (chế biến) − Future (mở rộng) tạo lợi thế kiểm soát chi phí toàn chuỗi mà hộ nhỏ lẻ không có được." },
    { t: "Trụ 3 — Định giá đã chiết khấu đáng kể, nhưng đây là 'rẻ theo P/E đỉnh chu kỳ' — cần đọc đúng bằng khung Peak P/E Trap", d: "Cổ phiếu đã giảm ~30% từ đỉnh tháng 7/2025, P/E hiện tại theo một số CTCK khoảng 5.5 lần — nhìn thoáng qua rất rẻ. NHƯNG theo đúng nguyên tắc primer FMCG (Pig Cycle Position) và primer Thép (Peak P/E Trap): P/E thấp của cổ phiếu chu kỳ ngay sau năm lợi nhuận đỉnh là TÍN HIỆU CẦN CẢNH GIÁC chứ không phải tín hiệu mua rẻ — EPS 2025 là EPS đỉnh chu kỳ, sẽ giảm tiếp trong 2026 theo đúng kế hoạch công ty tự đặt. Định giá đúng phải dựa trên EPS mid-cycle (trung bình nhiều năm qua cả pha lên và xuống), không phải EPS 2025 hay P/E trailing hiện tại." },
  ],
  business: [
    { seg: "Chăn nuôi heo (Farm) — heo nái + heo thịt", mix: "Động cơ lợi nhuận chính, biến động nhất", note: "~60,000 heo nái + 1.2-1.4 triệu heo thịt tự nuôi, cộng mô hình liên kết đang thu hẹp dần (14,000 nái + 100,000 thịt qua hộ gia công). Lợi nhuận mảng này nhạy trực tiếp với giá heo hơi thị trường — quý IV/2025 riêng mảng này giảm 76.4 tỷ do giá heo giảm so cùng kỳ, minh chứng độ nhạy cao." },
    { seg: "Thức ăn chăn nuôi (Feed — TĂCN)", mix: "Nền tảng ổn định hơn chăn nuôi", note: "Sản lượng tiêu thụ Q1/2026 vẫn tăng, nhưng lợi nhuận mảng giảm do cơ cấu sản phẩm thay đổi + giá nguyên liệu nhập khẩu (ngô, đậu tương) và tỷ giá tăng — đúng rủi ro 'API cost exposure' tương tự ngành dược nhưng áp dụng cho nông sản. Vai trò: cung cấp đầu vào nội bộ cho mảng Farm, giảm phụ thuộc nhà cung cấp ngoài." },
    { seg: "Chế biến thực phẩm (Food) + Dầu thực vật (dự án mới)", mix: "Đang mở rộng — hướng đi giảm biến động", note: "Dự án nhà máy ép và tinh luyện dầu đậu nành Dabaco (đầu tư từ vốn phát hành ESOP/chào bán ~1,330 tỷ) là bước đa dạng hóa ra khỏi chu kỳ giá heo thuần túy, hướng tới chuỗi giá trị nông sản rộng hơn — tương tự logic đa dạng hóa mà REE áp dụng cho ngành điện." },
    { seg: "Bất động sản & hạ tầng logistics (phi cốt lõi)", mix: "Nhỏ, không phải trọng tâm", note: "Khu đô thị Dabaco Vạn An, tòa nhà hỗn hợp Dabaco Lý Thái Tổ, cụm công nghiệp Lạc Vệ (45ha, 628 tỷ, hoàn thành cuối 2027), cảng ICD. Đây là tài sản đa dạng hóa nhưng KHÔNG nên kỳ vọng là động cơ tăng trưởng chính — rủi ro dàn trải nguồn lực khỏi mảng cốt lõi cần lưu ý." },
  ],
  forecast: {
    header: ["Chỉ tiêu", "2025 (thực hiện)", "KH 2026 (công ty)", "Nhịp Q1/2026"],
    rows: [
      ["Doanh thu (gồm nội bộ)", "~24,000 tỷ", "29,311 tỷ (+22%)", "4,124 tỷ (+14.3%)"],
      ["LNST", "Đỉnh lịch sử ~1,350-1,510 tỷ (ước theo % giảm)", "1,007-1,117 tỷ (−26%)", "374 tỷ (−26.4% YoY), đạt 33.5% KH"],
      ["Biên gộp", "22.6% (Q1/2025 cùng kỳ)", "Dự kiến co lại", "16.8% Q1/2026 — giảm mạnh 5.8 điểm%"],
      ["Đàn nái", "Tăng 27.6% trong năm 2025", "Hướng tới 80,000 nái trước 2028", "~60,000 nái hiện tại"],
      ["Giá heo hơi bình quân", "68,000đ/kg (TB năm, đỉnh 80,000đ)", "Dự báo biến động trái chiều", "Thấp hơn cùng kỳ 2025"],
      ["Nợ vay/Vốn CSH", "—", "—", "63.9% (giảm nhẹ từ đầu năm, tổng nợ vay 5,393 tỷ)"],
    ],
    drivers: "Ba biến số quyết định 2026, đúng khung 'Pig Cycle Position' của primer FMCG: (1) Giá heo hơi — dự báo neo 60,000đ/kg nhờ tái đàn chậm (theo nhận định chính DBC cuối 2025) nhưng diễn biến thực tế Q1/2026 cho thấy giá THẤP HƠN kỳ vọng này, cần theo dõi sát; (2) Giá nguyên liệu TĂCN (ngô, đậu tương) — chịu áp lực tăng từ căng thẳng địa chính trị (xung đột Mỹ-Iran đẩy giá dầu Brent, tác động dây chuyền lên giá năng lượng-nhiên liệu sinh học-ngô) đúng như rủi ro đã nêu ở nhiều primer khác cho nông sản nhập khẩu; (3) Tiến độ tái đàn toàn ngành — nếu tái đàn nhanh hơn dự kiến, cung heo 2026-27 tăng mạnh ép giá xuống sâu hơn kế hoạch thận trọng của DBC.",
  },
  valuation: {
    methods: [
      "TUYỆT ĐỐI không dùng P/E trailing/EPS đỉnh chu kỳ 2025 làm neo định giá — đây chính là Peak P/E Trap kinh điển (xem primer Thép + FMCG): P/E 'rẻ' 5.5x hiện tại đang tính trên EPS SẮP GIẢM theo đúng kế hoạch công ty, không phải EPS bền vững.",
      "Phương pháp đúng: EPS mid-cycle (trung bình 5-7 năm qua đủ pha ASF/dịch bệnh/tái đàn/giá cao-thấp) làm neo, sau đó áp P/E hợp lý cho ngành chăn nuyên chu kỳ (8-12x mid-cycle theo khung primer FMCG) — không áp P/E của năm đỉnh hay đáy.",
      "P/B kiểm chứng: với tài sản cố định lớn (5,369 tỷ, 34.2% tổng tài sản — chủ yếu trang trại CNC), P/B qua các chu kỳ trước là điểm neo bổ trợ hữu ích hơn P/E trong giai đoạn biến động lợi nhuận mạnh.",
      "SOTP nhẹ cho mảng phi cốt lõi (BĐS, logistics, dầu thực vật mới) — không định giá chung một multiple với mảng chăn nuôi core vì hồ sơ rủi ro khác hẳn nhau; giá trị các mảng này hiện nhỏ so với tổng nhưng cần tách bạch khi mô hình hóa.",
    ],
    brokers: [
      ["Một CTCK (T4/2026)", "Trung lập/Thận trọng", "P/E ~5.5x hiện tại", "Đánh giá vùng định giá 'khá rẻ' nhưng đồng thời dự phóng LNST 2026 chỉ ~1,100 tỷ, doanh thu thuần ~16,400 tỷ (loại doanh thu nội bộ) — thấp hơn cả KH công ty"],
      ["Nhận định thị trường chung", "Phân hóa", "Không đồng thuận rõ", "Một số xem đây là 'chiết khấu về đáy thuế quan' đủ hấp dẫn để tích lũy; số khác cảnh báo 2026 'có thể ghi nhận nhiều khó khăn' do biến động giá heo trái chiều + chi phí TĂCN tăng do địa chính trị"],
      ["Coverage tổng thể", "Mỏng hơn nhóm bluechip", "—", "DBC không có coverage dày đặc như HPG/ACB — phần lớn phân tích đến từ các công ty chứng khoán nhỏ/vừa, độ tin cậy dự phóng cần kiểm chứng chéo nhiều nguồn hơn"],
    ],
  },
  scenarios: [
    { label: "🟢 BULL — xác suất ~20%", target: "27,000–30,000đ (+19–32%)", d: "Tái đàn toàn ngành chậm hơn dự kiến (thiếu hụt nái kéo dài) + giá heo hồi phục về 65,000-70,000đ/kg nửa cuối 2026 + giá nguyên liệu TĂCN hạ nhiệt khi căng thẳng địa chính trị dịu bớt → LNST vượt KH thận trọng 1,117 tỷ, có thể đạt 1,300-1,400 tỷ → P/E re-rate nhẹ. Đây là kịch bản 'công ty đặt KH quá thận trọng, thực tế tốt hơn' — từng xảy ra với DBC nhiều năm trước (hoàn thành 101-150% KH)." },
    { label: "🟡 BASE — xác suất ~45%", target: "20,000–23,000đ (đi ngang ±5%) + cổ tức ~15%", d: "Giá heo tiếp tục biến động trái chiều quanh 55,000-65,000đ/kg, chi phí TĂCN neo cao vừa phải → LNST đạt sát KH 1,007-1,117 tỷ, biên gộp cải thiện dần từ đáy Q1 (16.8%) nhưng chưa về mức đỉnh 2025 (22.6%). Cổ phiếu đi ngang trong biên độ, cổ tức 15% (3% tiền + 12% CP) là phần bù đắp chính cho nhà đầu tư nắm giữ qua giai đoạn điều chỉnh." },
    { label: "🔴 BEAR — xác suất ~35%", target: "16,000–18,500đ (−15–26%)", d: "Tái đàn toàn ngành diễn ra nhanh (nhiều DN cùng mở rộng theo đà 2025) đẩy cung heo 2026-27 tăng mạnh, giá heo giảm sâu hơn dự báo về dưới 50,000đ/kg + giá TĂCN tiếp tục tăng do địa chính trị leo thang (giá dầu Brent >100 USD/thùng kéo dài) → biên gộp co về dưới 15%, LNST hụt xa KH, có thể về dưới 700-800 tỷ. Đòn bẩy 63.9% nợ/vốn CSH khiến áp lực tài chính tăng lên trong kịch bản lợi nhuận yếu — cần theo dõi khả năng trả nợ nếu kịch bản này kéo dài quá 2-3 quý." },
  ],
  risks: [
    "Pig cycle là rủi ro trung tâm — giá heo hơi biến động ngoài tầm kiểm soát công ty, quyết định phần lớn biến động lợi nhuận quý; đây là bản chất KHÔNG THỂ LOẠI BỎ của ngành, chỉ có thể quản lý bằng đa dạng hóa (3F, dầu thực vật, BĐS)",
    "Giá nguyên liệu TĂCN (ngô, đậu tương) nhập khẩu nhạy với địa chính trị toàn cầu (căng thẳng Mỹ-Iran, giá dầu, logistics) — rủi ro ngoại sinh khó dự báo, ăn trực tiếp vào biên gộp cả mảng Feed lẫn Farm",
    "Đòn bẩy tài chính 63.9% nợ/vốn CSH là mức đáng kể — trong kịch bản lợi nhuận yếu kéo dài, chi phí tài chính có thể ăn sâu hơn vào lợi nhuận ròng so với các mã ít đòn bẩy khác trong bộ phân tích (ví dụ BMP chỉ ~2%)",
    "Từng bị Thanh tra UBCKNN xử phạt 390 triệu đồng vi phạm hành chính về chứng khoán — dấu hiệu cần lưu ý về tuân thủ, dù mức phạt không lớn nhưng là điểm trừ về mặt quản trị/minh bạch cần theo dõi thêm",
    "Dàn trải nguồn lực sang BĐS, logistics, dầu thực vật có thể pha loãng tập trung vào mảng cốt lõi (chăn nuôi) nếu không quản lý vốn kỷ luật — rủi ro 'phân tán quá mức' của các tập đoàn đa ngành",
    "Xu hướng thoái vốn nội bộ: có ghi nhận giao dịch thành viên HĐQT đăng ký bán cổ phiếu giảm sở hữu — cần theo dõi thêm các giao dịch nội bộ để đánh giá tín hiệu niềm tin ban lãnh đạo",
  ],
  catalysts: [
    ["T6/2026", "Chốt quyền cổ tức 2025: 3% tiền + 12% cổ phiếu (8/6/2026) — sự kiện kỹ thuật, tăng vốn điều lệ lên ~4,310 tỷ"],
    ["T7-8/2026", "KQKD Q2/2026: kiểm chứng liệu biên gộp có phục hồi từ đáy 16.8% Q1 hay tiếp tục co — chỉ báo sớm quan trọng nhất cho cả năm"],
    ["Nửa cuối 2026", "Diễn biến giá heo hơi thực tế so với kỳ vọng neo 60,000đ/kg — theo dõi hàng tuần qua hiệp hội chăn nuôi"],
    ["Cuối 2027", "Cụm công nghiệp Lạc Vệ hoàn thành — mở rộng năng lực phi chăn nuôi cốt lõi"],
    ["Trước 2028", "Mục tiêu 80,000 nái + hơn 2 triệu heo thịt/năm — nếu đạt đúng lộ trình, DBC củng cố vị thế đầu ngành chăn nuôi công nghiệp hóa dài hạn bất kể biến động giá ngắn hạn"],
  ],
  checklist: [
    "Giá heo hơi bình quân toàn quốc hàng tuần (Hiệp hội Chăn nuôi VN): dưới 50,000đ/kg kéo dài = cảnh báo mạnh; trên 60,000đ/kg = vùng thuận lợi",
    "Biên gộp từng quý so với đáy 16.8% Q1/2026: phục hồi 2 quý liên tiếp = tín hiệu tích cực; tiếp tục co = cần hạ kỳ vọng cả năm",
    "Tốc độ tái đàn toàn ngành (không chỉ riêng DBC) — nguồn tin hiệp hội/Bộ NN: tái đàn nhanh = cảnh báo cung tăng, giá heo sắp giảm thêm",
    "Giá ngô/đậu tương CBOT + diễn biến địa chính trị ảnh hưởng logistics nông sản: theo dõi hàng tuần làm chỉ báo sớm chi phí TĂCN",
    "Nợ vay/Vốn CSH và chi phí tài chính mỗi quý: đòn bẩy 63.9% cần giữ ổn định hoặc giảm dần, không nên tăng thêm trong giai đoạn lợi nhuận yếu",
    "Giao dịch nội bộ (HĐQT, cổ đông lớn mua/bán): tín hiệu niềm tin ban lãnh đạo vào triển vọng ngắn-trung hạn",
  ],
  expert: {
    variant: "Thị trường đang phân hóa rõ rệt giữa hai phe: bên xem P/E 5.5x là 'chiết khấu hấp dẫn đáng mua', bên xem 2026 là 'năm nhiều khó khăn' cần tránh. Variant perception: cả hai phe đều đang tranh luận sai câu hỏi. Câu hỏi đúng không phải 'DBC có rẻ không' mà là 'chúng ta đang ở đâu trong pig cycle, và kỷ luật giao dịch chu kỳ có được tôn trọng không'. DBC không phải một compounder để mua-và-quên như BMP hay DHG — nó là một CÔNG CỤ TRADE CHU KỲ có thể sinh lời tốt NẾU vào đúng pha (ngay sau đáy, trước khi giá heo hồi) và ra đúng pha (khi giá heo đạt đỉnh, tái đàn bắt đầu mạnh) — bất kể P/E hiển thị trên bảng giá lúc đó là bao nhiêu.",
    strengths: [
      { h: "Vị thế đầu ngành công nghiệp hóa đúng xu hướng cấu trúc dài hạn", d: "Phát biểu của Chủ tịch về việc hộ chăn nuôi nhỏ lẻ sẽ biến mất trong 5 năm không phải lời PR — đây là xu hướng đã được primer FMCG xác nhận qua số liệu quy định môi trường/an toàn sinh học ngày càng chặt. DBC với quy mô đàn lớn, mô hình 3F khép kín, đang tự định vị làm một trong số ít 'người thắng' của quá trình công nghiệp hóa ngành chăn nuôi VN — một moat cấu trúc dài hạn tách biệt khỏi biến động giá heo ngắn hạn." },
      { h: "Kế hoạch 2026 cực kỳ thận trọng tạo biên an toàn kỳ vọng", d: "Việc ban lãnh đạo tự đặt KH lợi nhuận giảm 26% ngay từ đầu năm — thay vì lạc quan thái quá rồi thất vọng như nhiều DN chu kỳ khác — là dấu hiệu quản trị kỳ vọng có trách nhiệm. Lịch sử DBC từng nhiều lần hoàn thành 101-150% KH năm chỉ sau 6 tháng khi đặt mục tiêu thận trọng — nếu pattern này lặp lại, 2026 có thể là năm 'thất vọng trên giấy, ngạc nhiên trong thực tế'." },
      { h: "Đa dạng hóa dòng tiền qua BĐS, logistics, dầu thực vật giảm phụ thuộc thuần túy vào giá heo", d: "Dù các mảng này còn nhỏ, xu hướng đầu tư (cụm công nghiệp Lạc Vệ, dự án dầu đậu nành, BĐS Vạn An) cho thấy ban lãnh đạo đang chủ động xây đệm thu nhập ngoài chu kỳ heo — nếu thực thi tốt trong 3-5 năm tới, DBC có thể giảm biên độ biến động lợi nhuận so với các đối thủ chăn nuôi thuần túy (BAF, HAG mảng chăn nuôi)." },
      { h: "Thanh khoản giao dịch tốt + được khối ngoại quan tâm định kỳ", d: "Từng ghi nhận khối ngoại mua ròng lớn (top 2 thị trường một số phiên) — cho thấy đây là cổ phiếu đủ thanh khoản và được các quỹ theo dõi, khác hẳn VGR hay các mã UPCOM nhỏ đã phân tích trước đó. Điều này quan trọng cho khả năng vào/ra vị thế linh hoạt theo đúng chiến lược trade chu kỳ." },
    ],
    weaknesses: [
      { h: "P/E thấp là bẫy kinh điển, không phải cơ hội — nếu người mua không hiểu bản chất chu kỳ", d: "Đây là điểm quan trọng nhất cần nhắc lại: mua DBC vì 'P/E rẻ 5.5x' ngay sau năm lợi nhuận đỉnh lịch sử là chính xác sai lầm mà primer Thép đã cảnh báo với HPG 2021 — kết quả lịch sử cho các cổ phiếu chu kỳ mua ở P/E thấp đỉnh chu kỳ thường là lỗ 30-50% khi EPS tiếp tục giảm về đáy. Nhà đầu tư PHẢI tự hỏi 'EPS mid-cycle thực sự của DBC là bao nhiêu' trước khi tin vào con số P/E hiển thị." },
      { h: "Đòn bẩy tài chính 63.9% là điểm yếu cấu trúc so với các mã phòng thủ khác trong bộ phân tích", d: "So với BMP (nợ chỉ ~2% tài sản) hay ACB/DHG (net cash), DBC vận hành với đòn bẩy đáng kể để tài trợ mở rộng trang trại công nghệ cao. Trong pha lợi nhuận yếu của chu kỳ (như hiện tại), chi phí tài chính trở thành gánh nặng kép cùng lúc với biên gộp co lại — hai lực cùng chiều xấu, khuếch đại mức độ giảm lợi nhuận ròng so với giảm lợi nhuận gộp." },
      { h: "Không có 'quyền chọn miễn phí' rõ ràng như các mã khác trong bộ phân tích", d: "Khác với HPG (ray đường sắt), MSN (MSR vonfram), GMD (Gemalink GĐ2), hay REE (M&E bùng nổ), DBC hiện chưa có một catalyst cấu trúc rõ ràng nào có thể định lượng và theo dõi tiến độ cụ thể — tăng trưởng dài hạn phụ thuộc hoàn toàn vào 'thực thi tốt kế hoạch mở rộng đàn' và 'giá heo thuận lợi', cả hai đều khó dự báo chính xác hơn nhiều so với tiến độ xây một nhà máy hay ký một hợp đồng thầu." },
      { h: "Quản trị có vết gợn cần theo dõi thêm", d: "Việc bị UBCKNN xử phạt vi phạm hành chính chứng khoán, cộng giao dịch nội bộ bán ra của một số thành viên HĐQT trong giai đoạn giá cổ phiếu điều chỉnh, là những tín hiệu nhỏ nhưng đáng lưu ý về chất lượng quản trị — không nghiêm trọng như trường hợp NTP (thành viên HĐQT bị khởi tố hình sự) nhưng vẫn là điểm trừ khi so sánh với DHG, ACB hay BMP có hồ sơ quản trị sạch hơn rõ rệt." },
    ],
    verdict: "Vị thế: KHÔNG phải core holding — đây là vị thế trade chu kỳ, chỉ phù hợp nhà đầu tư sẵn sàng theo dõi sát giá heo hơi hàng tuần và có kỷ luật vào/ra rõ ràng. Sizing: NHỎ, tối đa vệ tinh trong danh mục, không nên xem như khoản đầu tư dài hạn kiểu BMP/DHG. Kỷ luật vào: tích lũy thăm dò khi có bằng chứng RÕ RÀNG giá heo đã tạo đáy chu kỳ (không phải khi P/E 'trông rẻ') — theo dõi số liệu tái đàn toàn ngành chững lại là tín hiệu tốt hơn bất kỳ chỉ số định giá nào. Kỷ luật ra: chốt lời khi giá heo tiến gần vùng đỉnh chu kỳ trước (70,000-80,000đ/kg) và số liệu tái đàn toàn ngành bắt đầu tăng tốc mạnh — đó là tín hiệu chu kỳ sắp đảo chiều, không phải chờ 'tin xấu' xuất hiện trên báo chí mới bán.",
  },
},

};

// ── UI (đồng bộ Batch 1) ──────────────────────────

function Snapshot({ items, accent }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
      {items.map(([k, v], i) => (
        <div key={i} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 6, padding: "7px 10px" }}>
          <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: accent, marginTop: 1 }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function ThesisCard({ item, accent }) {
  const [open, setOpen] = useState(true);
  return (
    <div onClick={() => setOpen(!open)} style={{ border: "1px solid " + (open ? accent : "var(--border)"), borderLeft: "3px solid " + accent, borderRadius: 8, cursor: "pointer", background: "var(--surface-1)", marginBottom: 8, padding: "11px 14px" }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.t}</div>
      {open && <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.65, margin: "7px 0 0" }}>{item.d}</p>}
    </div>
  );
}

function BizTable({ rows, accent }) {
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 8, padding: "10px 13px", marginBottom: 7 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: accent }}>{r.seg}</span>
            <span style={{ fontSize: 10.5, color: "var(--text-muted)", fontStyle: "italic" }}>{r.mix}</span>
          </div>
          <p style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{r.note}</p>
        </div>
      ))}
    </div>
  );
}

function ForecastTable({ f, accent }) {
  return (
    <div>
      <div style={{ border: "0.5px solid var(--border)", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1.2fr 1.3fr", background: accent + "18", padding: "7px 10px", fontSize: 9.5, color: accent, fontWeight: 600, textTransform: "uppercase" }}>
          {f.header.map((h, i) => <span key={i}>{h}</span>)}
        </div>
        {f.rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1.2fr 1.3fr", padding: "7px 10px", gap: 6, borderTop: "0.5px solid var(--border)", background: i % 2 === 0 ? "var(--surface-2)" : "transparent" }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-primary)" }}>{r[0]}</span>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{r[1]}</span>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{r[2]}</span>
            <span style={{ fontSize: 11, color: accent }}>{r[3]}</span>
          </div>
        ))}
      </div>
      <div style={{ background: accent + "0E", border: "0.5px solid " + accent + "44", borderRadius: 8, padding: "10px 13px" }}>
        <div style={{ fontSize: 9.5, color: accent, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Biến số dẫn dắt</div>
        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{f.drivers}</p>
      </div>
    </div>
  );
}

function ValuationView({ v, accent }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, color: accent, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Khung định giá</div>
      {v.methods.map((m, i) => (
        <p key={i} style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.65, margin: "0 0 7px", paddingLeft: 12, borderLeft: "2px solid " + accent + "55" }}>{m}</p>
      ))}
      <div style={{ fontSize: 9.5, color: accent, textTransform: "uppercase", letterSpacing: "0.05em", margin: "12px 0 6px" }}>Giá mục tiêu các CTCK</div>
      <div style={{ border: "0.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
        {v.brokers.map((b, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr 0.9fr 2fr", padding: "7px 10px", gap: 6, borderTop: i > 0 ? "0.5px solid var(--border)" : "none", background: i % 2 === 0 ? "var(--surface-2)" : "transparent", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-primary)" }}>{b[0]}</span>
            <span style={{ fontSize: 10.5, color: accent, fontWeight: 600 }}>{b[1]}</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: accent }}>{b[2]}</span>
            <span style={{ fontSize: 10.5, color: "var(--text-secondary)", lineHeight: 1.4 }}>{b[3]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenarioView({ list }) {
  const colors = { "🟢": "#1D7A46", "🟡": "#8A6D00", "🔴": "#A33030" };
  return (
    <div>
      {list.map((s, i) => {
        const c = colors[s.label.slice(0, 2)] || "#666";
        return (
          <div key={i} style={{ border: "0.5px solid " + c + "66", borderLeft: "3px solid " + c, borderRadius: 8, padding: "10px 13px", marginBottom: 8, background: c + "0A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 5 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: c }}>{s.label}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: c }}>{s.target}</span>
            </div>
            <p style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{s.d}</p>
          </div>
        );
      })}
    </div>
  );
}

function RiskCatalyst({ risks, catalysts, accent }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, color: "#A33030", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Rủi ro chính</div>
      {risks.map((r, i) => (
        <p key={i} style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.55, margin: "0 0 6px", paddingLeft: 12, borderLeft: "2px solid #A3303055" }}>{r}</p>
      ))}
      <div style={{ fontSize: 9.5, color: accent, textTransform: "uppercase", letterSpacing: "0.05em", margin: "12px 0 6px" }}>Catalyst timeline</div>
      <div style={{ border: "0.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
        {catalysts.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 3fr", padding: "8px 10px", gap: 8, borderTop: i > 0 ? "0.5px solid var(--border)" : "none", background: i % 2 === 0 ? "var(--surface-2)" : "transparent" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: accent }}>{c[0]}</span>
            <span style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5 }}>{c[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Checklist({ items, accent }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>Theo dõi định kỳ hàng quý — mỗi mục là một câu hỏi kiểm chứng thesis.</div>
      {items.map((c, i) => (
        <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 7, padding: "9px 12px", marginBottom: 6 }}>
          <span style={{ color: accent, fontWeight: 700, fontSize: 12 }}>☐</span>
          <span style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>{c}</span>
        </div>
      ))}
    </div>
  );
}



function CompetitorsView({ list, accent }) {
  if (!list || list.length === 0) {
    return <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>Không có dữ liệu đối thủ cạnh tranh chi tiết cho mã này.</p>;
  }
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10, lineHeight: 1.5 }}>Các mã cùng ngành đã được phân tích so sánh — mức tiềm năng đầu tư đánh giá theo cùng khung phương pháp với mã chính.</div>
      {list.map((co, i) => (
        <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ background: co.color + "15", borderBottom: "1px solid " + co.color + "44", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: co.color }}>{co.ticker}</span>
              <span style={{ fontSize: 11, color: "var(--text-secondary)", marginLeft: 8 }}>{co.name}</span>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: co.color, border: "0.5px solid " + co.color, borderRadius: 4, padding: "2px 8px" }}>{co.potential}</span>
          </div>
          <div style={{ padding: "11px 14px" }}>
            <p style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 8px" }}>{co.d}</p>
            <div style={{ background: "#1D7A460A", border: "0.5px solid #1D7A4640", borderRadius: 6, padding: "8px 10px", marginBottom: 6 }}>
              <div style={{ fontSize: 9.5, color: "#1D7A46", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Điểm mạnh</div>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>{co.strengths}</p>
            </div>
            <div style={{ background: "#A330300A", border: "0.5px solid #A3303040", borderRadius: 6, padding: "8px 10px", marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, color: "#A33030", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Điểm yếu</div>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>{co.weaknesses}</p>
            </div>
            <div style={{ borderLeft: "3px solid " + co.color, background: "var(--surface-2)", borderRadius: "0 6px 6px 0", padding: "8px 12px" }}>
              <div style={{ fontSize: 9.5, color: co.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Kết luận</div>
              <p style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.55, margin: 0 }}>{co.verdict}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpertView({ e, accent }) {
  if (!e) return null;
  return (
    <div>
      <div style={{ background: accent + "12", border: "0.5px solid " + accent + "66", borderLeft: "3px solid " + accent, borderRadius: 8, padding: "11px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 9.5, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Variant perception — điều thị trường đang định giá sai</div>
        <p style={{ fontSize: 11.5, color: "var(--text-primary)", lineHeight: 1.65, margin: 0 }}>{e.variant}</p>
      </div>
      <div style={{ fontSize: 9.5, color: "#1D7A46", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Điểm mạnh — tầng phân tích sâu</div>
      {e.strengths.map((s, i) => (
        <div key={i} style={{ border: "0.5px solid #1D7A4655", borderLeft: "3px solid #1D7A46", borderRadius: 7, padding: "9px 12px", marginBottom: 6, background: "#1D7A460A" }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: "#1D7A46", marginBottom: 3 }}>{s.h}</div>
          <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{s.d}</p>
        </div>
      ))}
      <div style={{ fontSize: 9.5, color: "#A33030", textTransform: "uppercase", letterSpacing: "0.06em", margin: "12px 0 6px" }}>Điểm yếu — những gì có thể phá thesis</div>
      {e.weaknesses.map((w, i) => (
        <div key={i} style={{ border: "0.5px solid #A3303055", borderLeft: "3px solid #A33030", borderRadius: 7, padding: "9px 12px", marginBottom: 6, background: "#A330300A" }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: "#A33030", marginBottom: 3 }}>{w.h}</div>
          <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{w.d}</p>
        </div>
      ))}
      <div style={{ border: "1px solid " + accent, borderRadius: 8, padding: "11px 14px", marginTop: 12, background: "var(--surface-1)" }}>
        <div style={{ fontSize: 9.5, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Verdict — vị thế, sizing & kỷ luật</div>
        <p style={{ fontSize: 11.5, color: "var(--text-primary)", lineHeight: 1.65, margin: 0 }}>{e.verdict}</p>
      </div>
    </div>
  );
}

const BASE_TABS = ["Thesis", "Mô hình KD", "Dự phóng", "Định giá", "Kịch bản & Giá mục tiêu", "Rủi ro & Catalyst", "Góc chuyên gia", "Checklist"];
function getTabs(d) {
  if (d.competitors && d.competitors.length > 0) {
    return [...BASE_TABS.slice(0, 6), "Đối thủ cạnh tranh", ...BASE_TABS.slice(6)];
  }
  return BASE_TABS;
}

function StockView({ sid }) {
  const [tab, setTab] = useState(0);
  const d = STOCKS[sid];
  const accent = d.accent;
  const tabs = getTabs(d);
  const hasCompetitors = d.competitors && d.competitors.length > 0;
  return (
    <div>
      <div style={{ background: accent + "12", border: "0.5px solid " + accent + "55", borderRadius: 10, padding: "12px 15px", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6 }}>
          <div>
            <span style={{ fontSize: 17, fontWeight: 700, color: accent }}>{d.ticker}</span>
            <span style={{ fontSize: 12, color: "var(--text-secondary)", marginLeft: 8 }}>{d.name} · {d.sector}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: accent }}>{d.rating}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Khung thời gian: {d.horizon}</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: tab === i ? 700 : 500, background: tab === i ? accent : "transparent", color: tab === i ? "#fff" : "var(--text-secondary)", border: "1px solid " + (tab === i ? accent : "var(--border)") }}>{t}</button>
        ))}
      </div>
      {tab === 0 && (<div><Snapshot items={d.snapshot} accent={accent} />{d.thesis.map((t, i) => <ThesisCard key={i} item={t} accent={accent} />)}</div>)}
      {tab === 1 && <BizTable rows={d.business} accent={accent} />}
      {tab === 2 && <ForecastTable f={d.forecast} accent={accent} />}
      {tab === 3 && <ValuationView v={d.valuation} accent={accent} />}
      {tab === 4 && <ScenarioView list={d.scenarios} />}
      {tab === 5 && <RiskCatalyst risks={d.risks} catalysts={d.catalysts} accent={accent} />}
      {hasCompetitors && tab === 6 && <CompetitorsView list={d.competitors} accent={accent} />}
      {tab === (hasCompetitors ? 7 : 6) && <ExpertView e={d.expert} accent={accent} />}
      {tab === (hasCompetitors ? 8 : 7) && <Checklist items={d.checklist} accent={accent} />}

      {tab < tabs.length - 1 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, paddingTop: 14, borderTop: "0.5px solid var(--border)" }}>
          <button
            onClick={() => { setTab(tab + 1); window.__scrollArticleToTop?.(); }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 15px", borderRadius: 8, border: "1px solid " + accent + "55", background: accent + "15", color: accent, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
          >
            Tiếp: {tabs[tab + 1]} →
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [stock, setStock] = useState("hpg");
  const order = ["hpg", "acb", "gmd", "msn", "dhg", "ree", "bmp", "dbc"];
  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "18px 14px 40px" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Stock Deep-Dive · Bộ 8 mã + đối thủ cạnh tranh</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Thép · Ngân hàng · Cảng · Holding · Dược · Năng lượng · VLXD · Chăn nuôi — GMD & DHG có sub-tab đối thủ</div>
      </div>
      <div className="mobile-static" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5, marginBottom: 14, position: "sticky", top: 0, zIndex: 10, background: "#fff", padding: "10px 0", borderBottom: "1px solid #eee" }}>
        {order.map(id => {
          const s = STOCKS[id];
          return (
            <button key={id} onClick={() => setStock(id)} style={{ padding: "8px 4px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, background: stock === id ? s.accent : "var(--surface-1)", color: stock === id ? "#fff" : "var(--text-secondary)", border: "0.5px solid " + (stock === id ? s.accent : "var(--border)") }}>
              {s.icon} {s.ticker}
            </button>
          );
        })}
      </div>
      <StockView sid={stock} />
      <div style={{ marginTop: 16, background: "var(--surface-1)", border: "0.5px solid var(--border)", borderRadius: 8, padding: "10px 13px" }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 6 }}>Bản đồ nhanh — phương pháp định giá & vai trò danh mục</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 5 }}>
          {[
            ["hpg", "P/B chu kỳ + EPS core · Cyclical beta — đặt cược chu kỳ thép + DQ2 ramp · Base 31-34K"],
            ["acb", "Justified P/B (ROE−g)/(COE−g) · Phòng thủ định giá rẻ, bear nông nhất · Base 27-29K"],
            ["gmd", "SOTP chuỗi quyền chọn · Kiên nhẫn 2-3 năm chờ Gemalink GĐ2 · Base 82-88K pre-dil"],
            ["msn", "SOTP holding 3 động cơ · Re-rating khi discount thu hẹp · Base 95-105K"],
            ["dhg", "Dividend model + event option · Bond proxy yield 7-10%, free float 5.68% · Base 103-112K"],
            ["ree", "SOTP 5 mảnh · Core defensive năng lượng, hedge ENSO nội tại · Base 58-63K"],
            ["bmp", "P/E + Dividend floor · Core VLXD, công thức đơn giản nhất · Base 160-175K"],
            ["dbc", "Pig cycle trade · KHÔNG phải P/E rẻ = mua · Base đi ngang 20-23K"],
          ].map(([id, note]) => {
            const s = STOCKS[id];
            return (
              <div key={id} onClick={() => setStock(id)} style={{ display: "flex", gap: 8, alignItems: "baseline", background: "var(--surface-2)", borderRadius: 6, padding: "6px 9px", cursor: "pointer", border: "0.5px solid " + (stock === id ? s.accent : "var(--border)") }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: s.accent, minWidth: 38 }}>{s.ticker}</span>
                <span style={{ fontSize: 10.5, color: "var(--text-secondary)", lineHeight: 1.45 }}>{note}</span>
              </div>
            );
          })}
        </div>
      </div>
      <p style={{ fontSize: 9.5, color: "var(--text-muted)", marginTop: 12, lineHeight: 1.5, fontStyle: "italic" }}>Tài liệu học tập & nghiên cứu cá nhân, không phải khuyến nghị đầu tư. GMD: mốc giá pre-dilution (trước thưởng CP 2:1). MSN/DHG: giá tham chiếu T4-6/2026 — kiểm tra bảng giá hiện tại trước khi so target. DHG free float 5.68%: thanh khoản là rủi ro số 1.</p>
    </div>
  );
}
