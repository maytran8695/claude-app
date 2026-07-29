import { useState } from "react";

// KHUNG TƯ DUY VĨ MÔ VIỆT NAM — BẢN CHUYÊN SÂU (Expert Edition)
// 5 lớp: Bản chất → Cơ chế → Sai lầm → Tín hiệu → Dữ liệu. Số liệu tới 07/2026.

const DATA = {
  realEconomy: {
    id: "realEconomy", label: 'Kinh tế "Thực"', sublabel: "Real Economy",
    desc: "Sản xuất và trao đổi hàng hoá — dịch vụ",
    color: "#dc2626", lightBg: "#fef2f2", border: "#fca5a5",
    sections: [
      {
        id: "demand", title: "Tổng cầu (C + I + G + X − M)", tag: "lagging · confirming", tagColor: "#64748b",
        def: "Đây là ĐỒNG NHẤT THỨC KẾ TOÁN, không phải mô hình nhân quả. GDP = C + I + G + (X − M) đúng theo định nghĩa — nó không nói cái gì gây ra cái gì. Sai lầm kinh điển: đọc như 'tăng G sẽ tăng GDP' mà quên G được tài trợ bằng thuế hoặc nợ; và tưởng 'nhập khẩu làm giảm GDP' trong khi M bị trừ chỉ vì đã được cộng nhầm vào C/I/G ở trên.",
        children: [
          { id: "domestic_demand", label: "Cầu nội địa (C + I + G)", color: "#6366f1", tabs: {
            def: "C ≈ 63–66% GDP, I ≈ 30–33%, G ≈ 6–7%. Tỷ trọng khác nhau tuỳ cách bóc tách của GSO — luôn kiểm tra định nghĩa trước khi so sánh chuỗi thời gian.",
            deep: [
              { title: "Tiêu dùng: đọc bằng cấu trúc, không bằng tổng số", body: "Tổng mức bán lẻ (GSO) là proxy phổ biến nhưng có ba khuyết tật: (1) tính theo giá hiện hành — phải khử lạm phát mới ra khối lượng thực; (2) bao gồm doanh thu du lịch, làm méo chuỗi so sánh hậu COVID; (3) không tách được tiêu dùng bằng thu nhập với tiêu dùng bằng tín dụng. Dấu hiệu chất lượng: bán lẻ THỰC tăng chậm hơn tín dụng tiêu dùng nhiều quý = tiêu dùng đang được bơm bằng nợ, không bền vững." },
              { title: "Đầu tư: FDI đăng ký ≠ giải ngân ≠ hình thành vốn cố định", body: "FDI đăng ký là cam kết, có thể không bao giờ thực hiện. FDI giải ngân là tiền thực chảy vào — nhưng gồm cả góp vốn mua cổ phần (M&A), vốn không tạo năng lực sản xuất mới. Chỉ số sát nhất với năng lực sản xuất tương lai: nhập khẩu máy móc thiết bị + vốn đầu tư thực hiện của khu vực FDI." },
              { title: "Đầu tư công: tính mùa vụ là cơ chế, không phải nhiễu", body: "Giải ngân đầu tư công VN dồn về nửa cuối năm một cách hệ thống (Q1 rất thấp, Q4 tăng vọt). Hệ quả không chỉ là kích cầu: khi Kho bạc giải ngân, tiền chảy từ tài khoản KBNN — vốn gửi tại NGÂN HÀNG THƯƠNG MẠI — ra nền kinh tế, tác động trực tiếp lên thanh khoản hệ thống. Đây là kênh liên kết tài khoá–tiền tệ đặc thù VN mà hầu hết phân tích bỏ qua." },
            ],
            pitfalls: [
              "Coi 'giải ngân đầu tư công cao' là tin tốt vô điều kiện. Hệ số ICOR (~6) quyết định GDP tăng bao nhiêu trên mỗi đồng vốn — kém hiệu quả so với khu vực.",
              "Dùng bán lẻ danh nghĩa để kết luận 'tiêu dùng mạnh' khi lạm phát đang cao. Phải khử lạm phát trước.",
              "Cộng FDI đăng ký vào dự báo tăng trưởng. Đăng ký chỉ là ý định, không phải tiền.",
            ],
            signals: [
              { label: "Bán lẻ thực ↑ trong khi tín dụng tiêu dùng đi ngang", type: "bull", text: "Tiêu dùng nuôi bằng thu nhập → bền vững. Tích cực cho bán lẻ, F&B, ngân hàng bán lẻ." },
              { label: "NK máy móc thiết bị ↑ mạnh 2 quý liên tiếp", type: "bull", text: "CAPEX thực → năng lực sản xuất tăng sau 12–18 tháng. Dẫn trước chu kỳ công nghiệp. Hưởng lợi: KCN, điện, logistics." },
              { label: "Giải ngân ĐTC cao nhưng ICOR tăng", type: "neutral", text: "Bơm vốn nhiều, hiệu quả giảm. Kích cầu ngắn hạn (thép, xi măng) vẫn có, nhưng đừng ngoại suy thành tăng trưởng dài hạn." },
            ],
            vnContext: "GSO công bố bán lẻ, IIP, vốn đầu tư thực hiện ngày 25–29 hàng tháng. Bộ Tài chính công bố tỷ lệ giải ngân ĐTC hàng tháng. FDI: luôn đọc cột 'vốn thực hiện'. Lưu ý: GDP quý của VN là YoY, KHÔNG phải QoQ annualized như Mỹ.",
          }},
          { id: "export", label: "Xuất khẩu — và bẫy giá trị gia tăng", color: "#6366f1", tabs: {
            def: "Kim ngạch xuất khẩu VN xấp xỉ 85–95% GDP. Con số này gây hiểu nhầm nghiêm trọng: xuất khẩu đo bằng giá trị GỘP, còn GDP đo GIÁ TRỊ GIA TĂNG. Phần lớn hàng xuất khẩu VN là gia công/lắp ráp từ linh kiện nhập khẩu.",
            deep: [
              { title: "DVA — chỉ số thật sự quan trọng", body: "Theo dữ liệu TiVA (OECD), tỷ lệ giá trị gia tăng nội địa trong xuất khẩu của VN vào khoảng 55% và có xu hướng giảm khi cơ cấu dịch sang điện tử. Với một chiếc điện thoại xuất khẩu, VN chủ yếu đóng góp lắp ráp và nhân công; linh kiện chính nhập từ Hàn Quốc, Trung Quốc, Đài Loan. Hệ quả: xuất khẩu tăng 20% không có nghĩa GDP tăng tương ứng. Muốn đo sức khoẻ thật, xem cán cân thương mại RÒNG và xuất khẩu của khu vực TRONG NƯỚC." },
              { title: "Rủi ro tập trung cấp quốc gia", body: "Khu vực FDI chiếm khoảng 72–74% kim ngạch xuất khẩu VN. Nhóm điện tử — điện thoại chiếm tỷ trọng chi phối, và trong đó một số ít tập đoàn quyết định biến động lớn. Một quyết định tái cấu trúc chuỗi cung ứng của công ty mẹ có thể làm lệch cả cán cân thương mại VN. Khi đọc số xuất khẩu, hãy tách 'xuất khẩu không kể điện thoại/điện tử' để thấy nội lực thật." },
              { title: "Chỉ báo dẫn trước cho xuất khẩu VN", body: "Theo thứ tự hữu dụng: (1) PMI đơn hàng xuất khẩu mới; (2) PMI sản xuất Mỹ và EU; (3) chu kỳ bán dẫn toàn cầu; (4) tồn kho nhà bán lẻ Mỹ. Độ trễ điển hình từ tín hiệu tới số xuất khẩu VN: 1–2 quý." },
            ],
            pitfalls: [
              "Kết luận 'VN mở cửa 200% GDP nên cực rủi ro' từ tỷ lệ (X+M)/GDP. Tỷ lệ này bị thổi phồng bởi gia công.",
              "Xem thặng dư thương mại là chỉ báo mạnh cho VND. Thặng dư hàng hoá bị bù trừ bởi thâm hụt dịch vụ và chuyển lợi nhuận FDI ra nước ngoài. CÁN CÂN VÃNG LAI mới là con số đúng.",
              "Coi thuế quan chỉ ảnh hưởng qua kênh giá. Kênh lớn hơn là quyết định tái phân bổ chuỗi cung ứng của các tập đoàn đa quốc gia.",
            ],
            signals: [
              { label: "PMI đơn hàng XK mới > 50 và tăng 2 tháng", type: "bull", text: "Dẫn trước kim ngạch XK 1–2 quý. Vào sớm: KCN, cảng-logistics, điện." },
              { label: "XK không kể điện tử ↑ trong khi tổng XK đi ngang", type: "bull", text: "Nội lực cải thiện, bớt phụ thuộc FDI điện tử. Chất lượng tăng trưởng tốt hơn con số tổng." },
              { label: "Thặng dư thương mại lớn nhưng CA thu hẹp", type: "bear", text: "Chuyển lợi nhuận FDI và thâm hụt dịch vụ đang ăn hết thặng dư hàng hoá → nguồn cung USD thực yếu hơn vẻ ngoài → áp lực VND âm ỉ. HSBC đã hạ dự báo thặng dư CA 2026 xuống ~2,2% GDP." },
            ],
            vnContext: "Hải quan VN công bố sơ bộ nửa đầu tháng và cả tháng. Xem theo nhóm hàng, khu vực (FDI vs trong nước), thị trường. Cán cân vãng lai: SBV/IMF theo quý, trễ. TiVA của OECD cập nhật vài năm/lần.",
          }},
        ],
      },
      {
        id: "price", title: "Giá cả & Lạm phát",
        def: "VN KHÔNG áp dụng lạm phát mục tiêu chính thức. Ngưỡng CPI ~4–4,5% là chỉ tiêu Quốc hội giao hàng năm, không phải mandate độc lập của SBV. Luật NHNN giao SBV nhiều mục tiêu cùng lúc — đây là lý do phản ứng chính sách của SBV khó dự đoán hơn Fed hay ECB.",
        children: [
          { id: "cpi", label: "CPI — và giới hạn đo lường", color: "#dc2626", tabs: {
            def: "CPI đo thay đổi giá của một rổ hàng hoá cố định. Rổ CPI VN có trọng số lương thực–thực phẩm rất lớn (~33–36%) so với các nước phát triển (~10–15%), khiến CPI VN nhạy với giá thịt heo và gạo hơn là với cầu nội địa.",
            deep: [
              { title: "Vì sao CPI 'thấp' mà người thành thị vẫn thấy đắt đỏ", body: "Ba nguyên nhân: (1) Chi phí nhà ở trong rổ đo chủ yếu qua giá THUÊ và vật liệu xây dựng, không phải giá NHÀ; (2) trọng số cố định giữa các kỳ cập nhật rổ; (3) giá dịch vụ do Nhà nước quản lý (y tế, giáo dục, điện) điều chỉnh theo lộ trình hành chính, làm phẳng CPI ngắn hạn nhưng dồn cú sốc vào tháng điều chỉnh. Kết luận: CPI là biến CHÍNH SÁCH, không phải thước đo chi phí sinh hoạt thật của bạn." },
              { title: "CPI lõi vs CPI tổng: dùng cái nào để dự báo SBV", body: "CPI lõi (loại lương thực–thực phẩm, năng lượng, mặt hàng Nhà nước quản lý giá) đo áp lực CẦU KÉO. CPI tổng đo cái người dân cảm nhận và cái Quốc hội chấm điểm. SBV nhìn CPI lõi; Chính phủ nhìn CPI tổng. Khi hai cái phân kỳ (tổng vọt vì giá xăng, lõi vẫn thấp) → SBV thường KHÔNG tăng lãi suất, chỉ dùng công cụ hành chính về giá. Đây là điểm dự báo sai phổ biến nhất." },
              { title: "Hiệu ứng nền (base effect)", body: "CPI YoY tháng này là hàm của cả giá tháng này VÀ giá cùng kỳ năm trước. Khi tháng gốc thấp bất thường, CPI YoY vọt lên dù giá hiện tại không đổi. Cách xử lý chuyên nghiệp: theo dõi CPI MoM đã điều chỉnh mùa vụ, và tính lạm phát 3 tháng annualized (3m/3m SAAR). Đừng phản ứng với một con số YoY đơn lẻ." },
            ],
            pitfalls: [
              "Dự báo SBV tăng lãi suất khi CPI tổng vượt 4% mà CPI lõi vẫn dưới 3%. SBV chịu đựng cost-push, chỉ phản ứng với demand-pull và áp lực tỷ giá.",
              "So CPI VN với CPI Mỹ để kết luận lãi suất thực. Rổ hàng, phương pháp, độ tin cậy khác nhau.",
              "Bỏ qua giá thịt heo. Với trọng số thực phẩm cao, một chu kỳ dịch tả lợn châu Phi có thể một mình đẩy CPI VN vượt chỉ tiêu.",
            ],
            signals: [
              { label: "CPI lõi 3m/3m SAAR vượt 4%", type: "bear", text: "Tín hiệu lạm phát cầu kéo thật. SBV sẽ phải phản ứng. Giảm tài sản duration dài: TPCP dài hạn, cổ phiếu tăng trưởng P/E cao." },
              { label: "CPI tổng vọt vì xăng/thực phẩm, lõi đi ngang", type: "neutral", text: "Cost-push. SBV nhiều khả năng giữ nguyên lãi suất. Đừng bán tháo tài sản nhạy lãi suất chỉ vì con số CPI tổng." },
              { label: "CPI lõi giảm dưới 2,5% khi tín dụng yếu", type: "bull", text: "Cầu nội địa yếu → dư địa nới lỏng lớn. NHƯNG kiểm tra ràng buộc tỷ giá trước — tỷ giá thường trói buộc hơn lạm phát ở VN." },
            ],
            vnContext: "GSO công bố CPI ngày 29. Lấy cả CPI MoM, CPI lõi, CPI bình quân so cùng kỳ. Tự tính 3m/3m SAAR từ chuỗi MoM. Tháng 1–2 luôn nhiễu vì Tết.",
          }},
          { id: "passthrough", label: "Giá đầu vào, biên lợi nhuận & pass-through tỷ giá", color: "#dc2626", tabs: {
            def: "Ở VN, PPI công bố theo quý và ít dùng. Chỉ báo thay thế tốt hơn cho áp lực chi phí là sub-index 'giá đầu vào' và 'giá đầu ra' trong VN PMI, công bố hàng tháng.",
            deep: [
              { title: "Spread giá đầu vào − đầu ra = biên lợi nhuận doanh nghiệp", body: "Trong PMI, nếu chỉ số giá đầu vào cao hơn đáng kể chỉ số giá đầu ra → doanh nghiệp đang bị ép biên. Điều này báo trước suy giảm lợi nhuận toàn thị trường 1–2 quý, thường TRƯỚC khi báo cáo tài chính phản ánh. Khi spread đảo chiều (đầu ra tăng nhanh hơn đầu vào) → chu kỳ mở rộng biên lợi nhuận bắt đầu. Đây là một trong những tín hiệu mua cổ phiếu chu kỳ tốt nhất mà ít người dùng." },
              { title: "Kênh truyền dẫn tỷ giá vào giá (pass-through)", body: "VND mất giá 1% KHÔNG đẩy CPI lên 1%. Hệ số pass-through của VN ước tính trong khoảng 0,1–0,25 sau 12 tháng — nghĩa là VND mất giá 10% đóng góp khoảng 1–2,5 điểm phần trăm vào CPI, phân bổ theo độ trễ. Con số này quyết định SBV có thể để VND trượt bao nhiêu trước khi lạm phát vượt chỉ tiêu — nó là tham số trung tâm của bài toán chính sách." },
            ],
            pitfalls: [
              "Giả định pass-through bằng 1 (VND mất giá 5% → CPI +5%). Sai và dẫn đến hoảng loạn không cần thiết.",
              "Bỏ qua độ trễ. Cú sốc tỷ giá hôm nay hiện lên CPI sau 2–4 quý, không phải tháng sau.",
            ],
            signals: [
              { label: "PMI giá đầu vào ↑ mạnh, giá đầu ra đi ngang", type: "bear", text: "Margin squeeze. Tránh ngành thâm dụng nguyên liệu: thép, nhựa, hoá chất, dệt may gia công." },
              { label: "Spread đầu ra − đầu vào chuyển dương", type: "bull", text: "Pricing power quay lại. Mở rộng biên lợi nhuận sắp tới. Tín hiệu mua cổ phiếu chu kỳ TRƯỚC khi EPS xác nhận." },
            ],
            vnContext: "VN PMI (S&P Global) công bố ngày làm việc đầu tiên mỗi tháng, có sub-index giá đầu vào/đầu ra. Đối chiếu với giá hàng hoá toàn cầu: Brent, thép HRC, hạt nhựa, phân bón.",
          }},
        ],
      },
      {
        id: "supply", title: "Phía cung & Năng lực sản xuất", tag: "PMI = leading, nhưng phải đọc đúng", tagColor: "#16a34a",
        def: "Phía cung quyết định tăng trưởng tiềm năng dài hạn (lao động × vốn × TFP). Ngắn hạn, output gap quyết định áp lực lạm phát. VN không công bố ước lượng output gap chính thức — bạn phải tự suy đoán từ PMI, IIP và CPI lõi.",
        children: [
          { id: "pmi", label: "PMI — hiểu đúng một diffusion index", color: "#16a34a", tabs: {
            def: "PMI là DIFFUSION INDEX: nó đo TỶ LỆ doanh nghiệp báo cáo cải thiện, không đo ĐỘ LỚN của cải thiện. PMI = 55 không có nghĩa 'tăng trưởng 5%'. Nó có nghĩa: đa số doanh nghiệp trong mẫu thấy tốt hơn tháng trước.",
            deep: [
              { title: "Cấu trúc và trọng số", body: "VN PMI (S&P Global) tổng hợp từ khảo sát khoảng 400 doanh nghiệp sản xuất. Trọng số: Đơn hàng mới 30%, Sản lượng 25%, Việc làm 20%, Thời gian giao hàng nhà cung cấp 15% (đảo dấu), Tồn kho hàng mua 10%. Lưu ý: thời gian giao hàng KÉO DÀI làm TĂNG PMI vì thường phản ánh cầu mạnh — nhưng trong khủng hoảng chuỗi cung ứng, nó kéo dài vì đứt gãy NGUỒN CUNG. Đây là lý do PMI 2020–2021 gây nhiễu tín hiệu nghiêm trọng." },
              { title: "Ba giới hạn nghiêm trọng của VN PMI", body: "(1) CHỈ CÓ MANUFACTURING — VN không có Services PMI, trong khi dịch vụ chiếm hơn 40% GDP. (2) MẪU LỆCH VỀ FDI VÀ XUẤT KHẨU. (3) DIFFUSION KHÔNG ĐO ĐỘ LỚN — 51 và 57 đều là 'mở rộng' nhưng động lượng khác hẳn. Khắc phục: theo dõi thêm IIP (đo khối lượng) và sản lượng điện thương phẩm (proxy hoạt động công nghiệp thời gian thực, khó làm đẹp)." },
              { title: "Đơn hàng mới − Tồn kho: chỉ báo dẫn trong chỉ báo dẫn", body: "Hiệu số (New Orders − Inventories) là một trong những chỉ báo chu kỳ tốt nhất. Đơn hàng mới cao + tồn kho thấp = restocking cycle sắp bùng nổ. Đơn hàng mới thấp + tồn kho cao = destocking. Ở VN, hiệu số này thường dẫn trước IIP khoảng 2–3 tháng và dẫn trước lợi nhuận nhóm vật liệu cơ bản khoảng 1–2 quý." },
            ],
            pitfalls: [
              "Diễn giải PMI như tốc độ tăng trưởng. Nó đo BỀ RỘNG, không đo ĐỘ LỚN.",
              "Coi PMI VN đại diện cho cả nền kinh tế. Nó chỉ đo sản xuất, và lệch về FDI/xuất khẩu.",
              "Mừng khi 'thời gian giao hàng kéo dài' đẩy PMI lên trong giai đoạn đứt gãy chuỗi cung ứng — đó là tín hiệu xấu bị mã hoá thành số đẹp.",
            ],
            signals: [
              { label: "(Đơn hàng mới − Tồn kho) chuyển dương mạnh", type: "bull", text: "Restocking cycle. Dẫn trước IIP ~2–3 tháng, lợi nhuận vật liệu ~1–2 quý. Vào sớm: thép, hoá chất, logistics." },
              { label: "PMI > 50 nhưng IIP và sản lượng điện đi ngang", type: "neutral", text: "Phân kỳ. PMI đang bắt tâm lý, chưa bắt khối lượng. Chờ IIP xác nhận trước khi tăng vị thế." },
              { label: "PMI dưới 50 với sub-index việc làm giảm mạnh", type: "bear", text: "Doanh nghiệp cắt lao động = họ tin suy giảm kéo dài. Tín hiệu nghiêm túc hơn PMI tổng nhiều." },
            ],
            vnContext: "VN PMI: S&P Global, ngày làm việc đầu tiên mỗi tháng. IIP: GSO, 25–29 hàng tháng. Sản lượng điện thương phẩm: EVN công bố tháng — proxy tốt nhất cho hoạt động công nghiệp thực.",
          }},
          { id: "potential", label: "Tăng trưởng tiềm năng & Output gap", color: "#16a34a", tabs: {
            def: "Tăng trưởng tiềm năng = tốc độ nền kinh tế có thể tăng mà không gây lạm phát. Y = A · K^α · L^(1−α), với A là TFP. Ước tính đồng thuận cho VN: khoảng 6,5–7%. Tăng trưởng vượt tiềm năng bền vững → output gap dương → lạm phát cầu kéo.",
            deep: [
              { title: "Ba nguồn tăng trưởng và cái nào đang cạn", body: "(1) LAO ĐỘNG: VN đã qua đỉnh lợi tức dân số. Dân số già hoá nhanh hơn Trung Quốc ở cùng mức thu nhập bình quân. Đóng góp của lao động đang giảm và sẽ chuyển âm. (2) VỐN: vẫn dồi dào nhưng hiệu quả giảm — ICOR tăng. (3) TFP: nguồn duy nhất còn dư địa lớn, nhưng phụ thuộc thể chế, giáo dục và nâng cấp chuỗi giá trị. Kết luận: câu chuyện tăng trưởng dài hạn của VN phụ thuộc vào TFP, không phải bơm thêm vốn hay lao động." },
              { title: "Bẫy thu nhập trung bình — điều kiện chứ không phải định mệnh", body: "Bẫy xảy ra khi nước đang phát triển mất lợi thế chi phí lao động nhưng chưa có năng lực đổi mới. Chỉ báo cảnh báo cho VN: DVA trong xuất khẩu không tăng; chi R&D/GDP thấp; tỷ lệ doanh nghiệp nội địa tham gia chuỗi cung ứng FDI thấp. Khi thấy DVA tăng và số nhà cung cấp cấp 1 nội địa cho các tập đoàn FDI tăng → đó là bằng chứng nâng cấp thật." },
            ],
            pitfalls: [
              "Ngoại suy tăng trưởng 7% mãi mãi. Lợi tức dân số đã qua đỉnh; duy trì 7% đòi hỏi TFP tăng tốc, không tự động xảy ra.",
              "Coi ICOR cao chỉ là vấn đề kỹ thuật. Nó là triệu chứng của phân bổ vốn kém — có ý nghĩa trực tiếp với chất lượng tăng trưởng tín dụng và nợ xấu tương lai.",
            ],
            signals: [
              { label: "GDP > 7,5% nhiều quý + CPI lõi tăng", type: "bear", text: "Output gap dương → kinh tế chạy quá nóng → SBV sẽ phải thắt chặt. Chuẩn bị cho chu kỳ tăng lãi suất." },
              { label: "DVA trong XK tăng, doanh nghiệp nội tham gia chuỗi FDI nhiều hơn", type: "bull", text: "Nâng cấp cấu trúc thật. Luận điểm dài hạn cho cổ phiếu VN mạnh lên. Tín hiệu 5–10 năm." },
            ],
            vnContext: "GDP quý: GSO (YoY). ICOR = (Vốn đầu tư/GDP) ÷ (tốc độ tăng GDP). Chi R&D/GDP: World Bank. DVA: OECD TiVA. Không có output gap chính thức của VN — dùng lọc HP trên chuỗi GDP.",
          }},
        ],
      },
    ],
  },

  financial: {
    id: "financial", label: 'Kinh tế "Tài chính"', sublabel: "Financial Economy",
    desc: "Thanh khoản, kỳ hạn, rủi ro và giá của tiền",
    color: "#16a34a", lightBg: "#f0fdf4", border: "#86efac",
    sections: [
      {
        id: "credit_creation", title: "Tạo tiền tín dụng — nền tảng của mọi thứ", tag: "endogenous money", tagColor: "#7c3aed",
        def: "Nếu bạn chỉ hiểu đúng MỘT thứ trong toàn bộ khung này, hãy để nó là đây. Ngân hàng thương mại KHÔNG cho vay tiền gửi. Ngân hàng thương mại TẠO RA tiền gửi khi cho vay. Ngân hàng Trung ương Anh đã chính thức bác bỏ mô hình số nhân tiền trong bài 'Money creation in the modern economy' (2014). Phần lớn sách giáo khoa tiếng Việt vẫn dạy sai điều này.",
        children: [
          { id: "how", label: "Cơ chế tạo tiền thật sự", color: "#7c3aed", tabs: {
            def: "Khi ngân hàng phê duyệt khoản vay 1 tỷ, họ đồng thời ghi TÀI SẢN 'cho vay khách hàng +1 tỷ' và NỢ PHẢI TRẢ 'tiền gửi khách hàng +1 tỷ'. Bảng cân đối nở ra ở cả hai bên. Tiền gửi 1 tỷ đó là tiền MỚI, chưa từng tồn tại. Không ai bị rút tiền để cho bạn vay.",
            deep: [
              { title: "Vì sao mô hình số nhân tiền là sai", body: "Mô hình cũ: ngân hàng nhận tiền gửi → giữ dự trữ bắt buộc → cho vay phần còn lại → lặp lại. Sai ở đâu: thực tế ngân hàng cho vay TRƯỚC, rồi mới đi tìm dự trữ sau. NHTW không thể từ chối cung cấp dự trữ mà không làm sập chính lãi suất mục tiêu của mình — NHTW đặt GIÁ (lãi suất), thị trường quyết định LƯỢNG. Dự trữ bắt buộc (VN ~3% với tiền gửi VND dưới 12 tháng) là một khoản thuế, không phải ràng buộc số lượng." },
              { title: "Ba ràng buộc THẬT của tạo tín dụng", body: "(1) VỐN TỰ CÓ / CAR: mỗi khoản vay tiêu tốn vốn theo hệ số rủi ro (RWA). Cho vay BĐS thương mại có hệ số rủi ro cao; cho vay có TPCP thế chấp gần bằng 0. Đây là ràng buộc trói buộc nhất. (2) TỶ LỆ AN TOÀN THANH KHOẢN: LDR tối đa 85%, tỷ lệ vốn ngắn hạn cho vay trung–dài hạn, LCR, NSFR. (3) CẦU VAY ĐỦ ĐIỀU KIỆN: không có người vay tốt thì ngân hàng không tạo được tiền, dù thanh khoản ngập. Đây chính là bẫy thanh khoản — SBV bơm M0 nhưng M2 không nở." },
              { title: "Hệ quả: tiền bị HUỶ khi trả nợ", body: "Khi bạn trả 1 tỷ nợ gốc, tài sản 'cho vay' và nợ 'tiền gửi' cùng biến mất khỏi bảng cân đối. Tiền bị tiêu huỷ. Điều này giải thích vì sao deleveraging trên diện rộng gây giảm phát: khi cả nền kinh tế cùng trả nợ, cung tiền co lại — vòng xoáy nợ–giảm phát mà Irving Fisher mô tả năm 1933." },
            ],
            pitfalls: [
              "Tin rằng 'SBV in tiền' là nguồn gốc chính của cung tiền. Ở VN, ~80–85% M2 do ngân hàng thương mại tạo ra qua cho vay.",
              "Dùng số nhân tiền (1 chia dự trữ bắt buộc) để dự báo M2. Vô nghĩa trong hệ thống tiền nội sinh.",
              "Coi hạ dự trữ bắt buộc là công cụ nới lỏng mạnh. Nó chỉ giảm chi phí thuế cho ngân hàng, không mở khoá tín dụng nếu CAR hoặc cầu vay đang là ràng buộc.",
            ],
            signals: [
              { label: "M0 tăng nhưng M2 không tăng tương ứng", type: "neutral", text: "Bẫy thanh khoản. Chính sách tiền tệ đang mất hiệu lực. Kích thích tài khoá hiệu quả hơn. Nghiêng về TPCP thay vì cổ phiếu ngân hàng." },
              { label: "M2 và tín dụng cùng tăng tốc", type: "bull", text: "Cỗ máy tạo tiền đang chạy. Thanh khoản chảy vào tài sản với độ trễ 1–2 quý. Tích cực cho cổ phiếu, BĐS." },
              { label: "Tín dụng tăng trưởng âm nhiều tháng", type: "bear", text: "Tiền đang bị huỷ nhanh hơn tạo ra. Rủi ro vòng xoáy nợ–giảm phát. Ưu tiên TPCP dài hạn, tiền mặt, vàng." },
            ],
            vnContext: "M2 và tăng trưởng tín dụng: SBV công bố hàng tháng (trễ). Tiền gửi dân cư đạt trên 10,38 triệu tỷ đồng tính đến tháng 1/2026 — mức cao kỷ lục. Theo dõi chênh lệch tốc độ tăng tín dụng so với tăng huy động: khi tín dụng chạy nhanh hơn huy động kéo dài, hệ thống đang căng thanh khoản cấu trúc.",
          }},
          { id: "quota", label: "Room tín dụng — và quá trình khai tử nó", color: "#7c3aed", tabs: {
            def: "Room tín dụng là hạn mức tăng trưởng dư nợ SBV giao cho từng ngân hàng. Công cụ hành chính, áp dụng từ 2011 sau giai đoạn tín dụng tăng trên 30%/năm giai đoạn 2009–2010 gây lạm phát cao và bất ổn vĩ mô. Rất ít quốc gia còn dùng công cụ này.",
            deep: [
              { title: "Vì sao room tồn tại và vì sao nó méo mó", body: "Room kiểm soát TRỰC TIẾP lượng tín dụng thay vì gián tiếp qua giá. Ưu điểm: hiệu quả tức thì khi cần hạ nhiệt. Nhược điểm: (1) biến thành cơ chế phân chia thị phần — ngân hàng hết room không còn động lực cạnh tranh lãi suất; (2) doanh nghiệp có khoản vay đến hạn không được gia hạn vì 'hết room', gây gián đoạn dòng vốn phi kinh tế; (3) tạo cơ chế xin–cho." },
              { title: "Lộ trình chuyển đổi 2025–2026: từ mệnh lệnh sang rủi ro", body: "Thủ tướng đã yêu cầu SBV xây dựng lộ trình gỡ bỏ room (Công điện 104 ngày 6/7/2025 và Công điện 128 ngày 6/8/2025). Nền tảng thay thế là Thông tư 14/2025/TT-NHNN (30/6/2025) quy định tỷ lệ an toàn vốn với các bộ đệm theo hướng Basel III: bộ đệm bảo toàn vốn, bộ đệm vốn PHẢN CHU KỲ, và bộ đệm cho ngân hàng có tầm quan trọng hệ thống (D-SIB). Ý tưởng: để năng lực vốn và quản trị rủi ro quyết định thay vì SBV giao chỉ tiêu." },
              { title: "Thực trạng 2026: room chưa chết, chỉ đổi hình", body: "SBV vẫn kiểm soát tín dụng trong 2026 qua văn bản định hướng (Công văn 11686/NHNN-CSTT ngày 31/12/2025), yêu cầu tốc độ tăng tín dụng bất động sản không vượt tốc độ tăng tín dụng chung. Song song, SBV nới CÓ CHỌN LỌC: Công văn 4551/NHNN-CSTT cho phép 25 ngân hàng không tính phần dư nợ tăng thêm cho nhà ở xã hội và KCN/KCX vào giới hạn tín dụng BĐS năm 2026. Đây là TÁI PHÂN BỔ CÓ ĐỊNH HƯỚNG, không phải nới lỏng toàn diện." },
              { title: "Nới lỏng macroprudential đáng chú ý nhất 2026", body: "(1) Thông tư 08/2026/TT-NHNN (5/2026) cho phép tính 20% tiền gửi có kỳ hạn của Kho bạc Nhà nước vào nguồn vốn khi tính LDR. (2) Thông tư 25 (22/6/2026) nâng trần tỷ lệ vốn ngắn hạn cho vay trung–dài hạn từ 30% lên 40%. Cú nới này cho phép ngân hàng dùng vốn ngắn hạn rẻ tài trợ tài sản dài hạn, nới NIM NHƯNG đồng thời tăng rủi ro chênh lệch kỳ hạn (IRRBB). Đọc: tích cực cho lợi nhuận ngân hàng và BĐS trong 12–24 tháng, tăng độ giòn hệ thống dài hạn." },
            ],
            pitfalls: [
              "Nghĩ 'bỏ room = tín dụng tự do'. Không. Bộ đệm Basel III, LDR, tỷ lệ vốn ngắn hạn cho vay dài hạn vẫn ràng buộc — theo cách tinh vi hơn.",
              "Coi việc nới trần vốn ngắn hạn cho vay dài hạn (30%→40%) thuần tuý là tin tốt. Nó chất thêm rủi ro kỳ hạn — chính là loại rủi ro đã hạ gục Silicon Valley Bank năm 2023.",
              "Bỏ qua tính chọn lọc: nới cho nhà ở xã hội và KCN không đồng nghĩa nới cho BĐS thương mại/đầu cơ, vốn vẫn bị siết.",
            ],
            signals: [
              { label: "SBV nới room / nới tỷ lệ an toàn cho nhóm ngân hàng khoẻ", type: "bull", text: "Catalyst trực tiếp cho cổ phiếu ngân hàng có CAR cao và NPL thấp. Nhóm này giành thị phần khi cơ chế chuyển sang dựa trên năng lực vốn." },
              { label: "Ngân hàng có CAR sát ngưỡng tối thiểu", type: "bear", text: "Sẽ phải phát hành tăng vốn (pha loãng) hoặc giảm tốc tín dụng. Trong cơ chế mới, ngân hàng mỏng vốn thua rõ rệt." },
              { label: "Tín dụng BĐS tăng nhanh hơn tín dụng chung", type: "bear", text: "SBV đã tuyên bố sẽ giảm trừ chỉ tiêu. Rủi ro chính sách với ngân hàng nặng BĐS." },
            ],
            vnContext: "Theo dõi: công văn định hướng tín dụng đầu năm của SBV. Thông tư 14/2025/TT-NHNN về CAR và bộ đệm vốn. CAR và hệ số RWA từng ngân hàng trong BCTC quý. Danh sách ngân hàng được nới có chọn lọc — cập nhật từ CTCK.",
          }},
          { id: "nim", label: "NIM — bóc tách đúng cách", color: "#7c3aed", tabs: {
            def: "NIM = (Thu nhập lãi − Chi phí lãi) ÷ Tài sản sinh lãi bình quân. Đây KHÔNG phải chênh lệch giữa lãi suất cho vay và lãi suất huy động niêm yết. Rất nhiều nhà đầu tư VN nhầm hai khái niệm này.",
            deep: [
              { title: "Bốn động lực của NIM, tách rõ", body: "(1) LỢI SUẤT TÀI SẢN: phụ thuộc cơ cấu — cho vay bán lẻ/tiêu dùng lợi suất cao nhất, doanh nghiệp lớn thấp hơn, TPCP thấp nhất. (2) CHI PHÍ VỐN: hàm của tỷ lệ CASA và lãi suất tiền gửi có kỳ hạn. (3) ĐÒN BẨY BẢNG CÂN ĐỐI: LDR càng cao, tỷ trọng tài sản sinh lãi càng lớn. (4) CHÊNH LỆCH KỲ HẠN: vay ngắn cho vay dài để hưởng độ dốc đường cong lợi suất. Chính vì vậy Thông tư 25/2026 nâng trần 30%→40% là cú hích NIM trực tiếp." },
              { title: "CASA: lợi thế thật nhưng bị hiểu sai chiều nhân quả", body: "CASA rẻ vì lãi suất gần 0. CASA cao → chi phí vốn thấp → NIM cao. Nhưng CASA là KẾT QUẢ của hệ sinh thái giao dịch (tài khoản lương, thanh toán), không phải nguyên nhân mua được bằng khuyến mãi. Điểm ít ai nhận ra: khi lãi suất tăng, CASA bị rút sang tiền gửi có kỳ hạn — NIM của ngân hàng CASA cao co lại NHANH HƠN, không phải chậm hơn." },
              { title: "NIM cao chưa chắc tốt: phải trừ chi phí tín dụng", body: "Chỉ số đúng để so sánh ngân hàng là NIM − Credit Cost (chi phí trích lập dự phòng chia dư nợ bình quân), tức 'risk-adjusted NIM'. Một ngân hàng NIM 5% với credit cost 2,5% kém hơn ngân hàng NIM 3,5% với credit cost 0,5%. Cho vay tiêu dùng không tài sản đảm bảo cho NIM rất cao và credit cost rất cao — mô hình chỉ hoạt động khi kinh tế tốt." },
            ],
            pitfalls: [
              "So NIM giữa các ngân hàng mà không điều chỉnh chi phí tín dụng và cơ cấu cho vay.",
              "Giả định CASA cao luôn bảo vệ NIM khi lãi suất tăng. Ngược lại — CASA chảy sang term deposit nhanh nhất khi lãi suất lên.",
              "Đọc 'lãi suất cho vay − lãi suất huy động' niêm yết như NIM. Bỏ sót tài sản không sinh lãi, TPCP, và cơ cấu kỳ hạn.",
            ],
            signals: [
              { label: "Trần vốn ngắn hạn cho vay dài hạn nới 30%→40%", type: "bull", text: "Cú hích NIM trực tiếp toàn ngành, đặc biệt ngân hàng có nền tảng cho vay dài hạn. Nhưng theo dõi IRRBB — rủi ro dồn về sau." },
              { label: "NIM tăng do dịch chuyển sang cho vay tiêu dùng", type: "neutral", text: "Chất lượng thấp. Kiểm tra credit cost và nợ nhóm 2 trước khi mừng." },
              { label: "Risk-adjusted NIM ổn định qua chu kỳ + CASA bền", type: "bull", text: "Dấu hiệu lợi thế cạnh tranh thật. Loại ngân hàng nên nắm dài hạn." },
            ],
            vnContext: "NIM và credit cost: tính từ BCTC quý. CASA ratio: thuyết minh tiền gửi khách hàng. So sánh chuỗi 8–12 quý để loại nhiễu. Quan sát biến động CASA khi lãi suất tiền gửi thay đổi.",
          }},
          { id: "npl", label: "Nợ xấu — con số công bố và con số thật", color: "#7c3aed", tabs: {
            def: "NPL công bố (nhóm 3–5) là phần nổi. Bức tranh đầy đủ cần cộng thêm: nợ nhóm 2, nợ đã cơ cấu lại thời hạn, trái phiếu VAMC chưa xử lý, và nợ tại công ty con tài chính tiêu dùng.",
            deep: [
              { title: "Công thức NPL mở rộng", body: "NPL mở rộng ≈ Nợ nhóm 3–5 + Nợ nhóm 2 + Dư nợ đã cơ cấu lại còn dư + Mệnh giá trái phiếu VAMC chưa trích lập hết. Con số này thường cao hơn NPL công bố đáng kể. Nợ nhóm 2 là nợ quá hạn 10–90 ngày — phần lớn sẽ trượt xuống nhóm 3 nếu kinh tế không cải thiện. TỐC ĐỘ TĂNG NHÓM 2 là chỉ báo dẫn trước NPL khoảng 2 quý." },
              { title: "Cơ cấu lại nợ: hoãn ghi nhận, không xoá rủi ro", body: "Các quy định cho phép cơ cấu lại thời hạn trả nợ mà giữ nguyên nhóm nợ giúp tránh cú sốc tín dụng đột ngột, nhưng KHÔNG làm rủi ro biến mất — chỉ dời về tương lai. Khi chính sách cơ cấu hết hiệu lực, NPL công bố thường nhảy vọt. Nghị định 86/2024/NĐ-CP đã thống nhất mức trích lập toàn hệ thống, và cơ quan quản lý đang siết hiện tượng 'đôn phân loại nợ'." },
              { title: "Vòng xoáy CAR–NPL (financial accelerator)", body: "NPL tăng → trích lập dự phòng tăng → lợi nhuận giảm → vốn giảm → CAR giảm → ngân hàng thu hẹp tài sản rủi ro → kinh tế yếu hơn → NPL tăng thêm. Kênh khuếch đại tài chính này giải thích vì sao khủng hoảng ngân hàng luôn sâu hơn dự báo tuyến tính. Điểm gãy: khi CAR chạm ngưỡng tối thiểu, ngân hàng phải chọn giữa tăng vốn (pha loãng, khó khi giá cổ phiếu thấp) hoặc co bảng cân đối." },
            ],
            pitfalls: [
              "Đọc NPL công bố như sự thật. Luôn cộng nhóm 2 và nợ cơ cấu.",
              "Coi tỷ lệ bao phủ nợ xấu (LLR) cao là an toàn tuyệt đối. LLR tính trên NPL công bố — nếu mẫu số bị hiểu thấp thì tỷ lệ bị thổi phồng.",
              "Bỏ qua tập trung tín dụng BĐS. Khi BĐS chiếm tỷ trọng lớn dư nợ VÀ tài sản đảm bảo, NPL và giá trị tài sản đảm bảo tương quan dương — dự phòng bị đánh giá thấp đúng lúc cần nhất.",
            ],
            signals: [
              { label: "Nợ nhóm 2 tăng mạnh trong khi NPL công bố ổn định", type: "bear", text: "Chỉ báo dẫn trước NPL ~2 quý. Chất lượng tài sản xấu đi trước khi số liệu chính thức thừa nhận. Giảm tỷ trọng ngân hàng." },
              { label: "Chính sách cơ cấu nợ hết hiệu lực", type: "bear", text: "NPL công bố sẽ nhảy vọt do hiệu ứng kỹ thuật. Thị trường thường phản ứng thái quá — có thể tạo cơ hội mua cho ngân hàng thực sự khoẻ." },
              { label: "LLR cao + nhóm 2 giảm + CAR đệm dày", type: "bull", text: "Chất lượng tài sản thật sự tốt. Ngân hàng có khả năng tăng trưởng khi chu kỳ quay lại." },
            ],
            vnContext: "BCTC quý ngân hàng: thuyết minh phân loại nợ (nhóm 1–5), dự phòng, trái phiếu VAMC. Nghị định 86/2024. Luật Bảo hiểm tiền gửi 111/2025/QH15 có hiệu lực 1/5/2026, hạn mức 125 triệu đồng/khách hàng — bảo vệ trên 92% người gửi tiền về SỐ LƯỢNG, nhưng tỷ lệ theo GIÁ TRỊ thấp hơn nhiều.",
          }},
        ],
      },
      {
        id: "rates", title: "Hệ thống lãi suất & Truyền dẫn", tag: "VN không có corridor chuẩn", tagColor: "#f59e0b",
        def: "Fed và ECB vận hành hành lang lãi suất rõ ràng. VN thì không. SBV có nhiều lãi suất công bố nhưng lãi suất VẬN HÀNH thực tế là lãi suất OMO và lãi suất tín phiếu. Hiểu sai điều này dẫn đến dự báo sai chính sách.",
        children: [
          { id: "stack", label: "Chồng lãi suất và cái nào thật sự quan trọng", color: "#f59e0b", tabs: {
            def: "SBV công bố: lãi suất tái cấp vốn, tái chiết khấu, trần lãi suất tiền gửi ngắn hạn, trần lãi suất cho vay lĩnh vực ưu tiên. Nhưng lãi suất thực sự điều tiết thanh khoản hàng ngày là lãi suất mua kỳ hạn giấy tờ có giá trên OMO và lãi suất tín phiếu SBV.",
            deep: [
              { title: "Cơ chế hai chiều: OMO là trần mềm, tín phiếu là sàn mềm", body: "Khi hệ thống thiếu thanh khoản, ngân hàng vay SBV qua OMO → lãi suất OMO thành TRẦN thực tế cho lãi suất liên ngân hàng. Khi hệ thống thừa tiền, SBV phát hành tín phiếu để hút → lãi suất tín phiếu thành SÀN mềm. Đọc tín hiệu: SBV chuyển từ bơm OMO sang phát hành tín phiếu = xoay trục sang thắt chặt, và thường vì áp lực TỶ GIÁ chứ không vì lạm phát." },
              { title: "Vì sao truyền dẫn xuống lãi suất cho vay rất chậm ở VN", body: "Chuỗi: policy rate → liên ngân hàng (nhanh, vài ngày) → lãi suất tiền gửi (chậm, 1–3 tháng) → lãi suất cho vay (rất chậm, 3–9 tháng). Nút thắt: ngân hàng VN huy động chủ yếu bằng tiền gửi có kỳ hạn 6–12 tháng đã cam kết lãi suất. Hợp đồng cho vay thường thả nổi theo 'lãi suất tiết kiệm 12/13 tháng + biên độ', tái định giá kỳ 3–6 tháng. Kết luận: đừng kỳ vọng doanh nghiệp cảm nhận việc SBV hạ lãi suất trong cùng quý." },
              { title: "Trạng thái vận hành hiện tại (giữa 2026)", body: "SBV đã ngừng phát hành tín phiếu từ tháng 3/2025 và chuyển sang bơm ròng qua OMO, giữ lãi suất OMO quanh 4%/năm — tín hiệu rõ ràng ưu tiên giữ mặt bằng lãi suất thấp. Đến cuối tháng 6/2026, lãi suất qua đêm liên ngân hàng quanh 3,2%/năm sau khi SBV đảo chiều bơm ròng trở lại. NGƯỠNG CẦN THEO DÕI: khi qua đêm vượt lãi suất OMO một cách bền vững, hệ thống đang thiếu thanh khoản CẤU TRÚC chứ không phải nhiễu." },
            ],
            pitfalls: [
              "Chờ 'SBV cắt lãi suất điều hành' như tín hiệu duy nhất. SBV có thể nới lỏng thực chất qua OMO, dừng tín phiếu, nới tỷ lệ an toàn — mà không đụng lãi suất công bố.",
              "Dùng VNIBOR như benchmark chuẩn. VNIBOR dựa trên báo giá, thị trường mỏng ở kỳ hạn dài — không tương đương SOFR hay EURIBOR. Chỉ tin số qua đêm và 1 tuần.",
              "Áp mô hình corridor của Fed lên VN. SBV không cam kết giữ lãi suất liên ngân hàng trong một dải, và thường ưu tiên tỷ giá hơn lãi suất.",
            ],
            signals: [
              { label: "SBV chuyển từ bơm OMO sang phát hành tín phiếu", type: "bear", text: "Xoay trục thắt chặt, gần như luôn vì áp lực tỷ giá. Tín hiệu sớm hơn nhiều so với việc tăng lãi suất điều hành. Giảm duration và đòn bẩy." },
              { label: "Qua đêm liên ngân hàng vượt lãi suất OMO bền vững", type: "bear", text: "Thiếu thanh khoản cấu trúc, không phải nhiễu. Ngân hàng nhỏ chịu áp lực nhất." },
              { label: "SBV bơm ròng OMO + qua đêm giảm dưới 3%", type: "bull", text: "Thanh khoản dồi dào chủ động. Lãi suất tiền gửi sẽ giảm sau 1–3 tháng. Tích cực cho TPCP và cổ phiếu." },
            ],
            vnContext: "Bảng OMO và tín phiếu: SBV công bố hàng phiên. Lãi suất liên ngân hàng qua đêm/1W/2W: SBV, hàng ngày. Theo dõi bơm/hút RÒNG theo tuần — barometer tốt hơn nhiều lãi suất điều hành.",
          }},
          { id: "curve", label: "Đường cong TPCP — đừng đọc như ở Mỹ", color: "#f59e0b", tabs: {
            def: "Ở Mỹ, đường cong lợi suất đảo ngược (2Y > 10Y) là chỉ báo suy thoái đáng tin cậy. Ở VN, đường cong TPCP phản ánh chủ yếu CẤU TRÚC CẦU của ngân hàng thương mại, không phải kỳ vọng vĩ mô.",
            deep: [
              { title: "Ai mua TPCP VN và vì sao điều đó làm méo đường cong", body: "Người mua chi phối là ngân hàng thương mại, mua vì ba lý do PHI KỲ VỌNG: (1) TPCP có hệ số rủi ro thấp trong tính RWA → tiết kiệm vốn; (2) đủ điều kiện làm tài sản thế chấp cho OMO; (3) đáp ứng tỷ lệ dự trữ thanh khoản. Nhà đầu tư nước ngoài nắm tỷ trọng rất nhỏ. Hệ quả: lợi suất 10Y VN không chứa nhiều thông tin về kỳ vọng lạm phát hay tăng trưởng dài hạn." },
              { title: "Cái đường cong VN THẬT SỰ nói cho bạn", body: "Nó phản ánh: (a) trạng thái thanh khoản hệ thống ngân hàng — đầu ngắn; (b) kế hoạch phát hành của Kho bạc — phía cung; (c) nhu cầu vốn của ngân hàng cho tính toán an toàn — phía cầu. Khi Kho bạc đấu thầu ế nhiều phiên → cung vượt cầu → lợi suất bị đẩy lên. Nhưng 'đường cong đảo ngược = suy thoái' thì KHÔNG áp dụng cho VN." },
              { title: "TPCP vẫn là mỏ neo định giá, dù thị trường mỏng", body: "Lợi suất TPCP vẫn là lãi suất phi rủi ro trong công thức chiết khấu: P = Σ CF/(1+r)^t với r = rf + ERP. Khi rf tăng 100bps, cổ phiếu có dòng tiền ở XA (tăng trưởng, P/E cao) mất giá nhiều hơn cổ phiếu dòng tiền GẦN (giá trị, P/E thấp), vì duration của dòng tiền dài hơn. Đây là lý do CƠ HỌC khiến cổ phiếu tăng trưởng bị đập mạnh khi lãi suất lên — không phải vì tâm lý." },
            ],
            pitfalls: [
              "Áp tín hiệu 'yield curve inversion → recession' của Mỹ vào VN. Cấu trúc người mua khác hoàn toàn.",
              "Coi lợi suất 10Y VN là kỳ vọng lạm phát dài hạn. Nó chủ yếu là hàm của cầu ngân hàng và cung phát hành.",
              "Bỏ qua đấu thầu TPCP hàng tuần. Tỷ lệ trúng thầu/gọi thầu là chỉ báo thanh khoản và khẩu vị rủi ro tốt mà ít ai theo dõi.",
            ],
            signals: [
              { label: "Đấu thầu TPCP ế nhiều phiên liên tiếp", type: "bear", text: "Thị trường không chấp nhận mức lợi suất Kho bạc chào. Lợi suất sẽ bị đẩy lên → chi phí vốn dài hạn tăng → áp lực định giá cổ phiếu tăng trưởng và BĐS." },
              { label: "Lợi suất 10Y giảm cùng lúc thanh khoản dồi dào", type: "bull", text: "Ngân hàng thừa tiền, mua TPCP. Môi trường chiết khấu thuận lợi. Cổ phiếu duration dài hưởng lợi nhất." },
              { label: "Lợi suất tăng khi Kho bạc đẩy mạnh phát hành cuối năm", type: "neutral", text: "Cung kỹ thuật, không phải tín hiệu vĩ mô. Thường đảo ngược sau khi kế hoạch phát hành hoàn thành." },
            ],
            vnContext: "Kết quả đấu thầu TPCP: HNX công bố hàng tuần — xem khối lượng gọi thầu, trúng thầu, lợi suất trúng thầu theo kỳ hạn. Đường cong thứ cấp: HNX hàng ngày.",
          }},
          { id: "treasury", label: "Kho bạc & thanh khoản — kênh bị bỏ quên", color: "#f59e0b", tabs: {
            def: "Ở Mỹ, tài khoản Kho bạc (TGA) nằm TẠI Fed — khi TGA tăng, dự trữ ngân hàng giảm tương ứng. Ở VN, tiền gửi Kho bạc Nhà nước nằm phần lớn TẠI NGÂN HÀNG THƯƠNG MẠI. Khác biệt cấu trúc này có hệ quả lớn và hầu như không được phân tích.",
            deep: [
              { title: "Vì sao vị trí đặt tiền của Kho bạc lại quan trọng", body: "Khi tiền Kho bạc gửi tại NHTM, nó là NGUỒN VỐN của ngân hàng. Khi Kho bạc rút ra để giải ngân đầu tư công, ngân hàng mất nguồn vốn đột ngột → phải bù bằng vay liên ngân hàng → VNIBOR tăng. Ngược lại, khi thu ngân sách dồn về, tiền chảy vào tài khoản Kho bạc tại ngân hàng → thanh khoản nới ra. Kết quả: thanh khoản ngân hàng VN có nhịp MÙA VỤ mạnh theo lịch thu–chi ngân sách, ĐỘC LẬP với hành động của SBV." },
              { title: "Thay đổi quy định 2026 và ý nghĩa", body: "Thông tư 08/2026/TT-NHNN (5/2026) cho phép tính 20% tiền gửi có kỳ hạn của Kho bạc Nhà nước vào nguồn vốn khi tính LDR; Thông tư 25 (22/6/2026) bổ sung trường hợp đặc biệt cho phép một phần tiền gửi Kho bạc tính trong LDR ở mức cao hơn. Ý nghĩa: nguồn vốn Kho bạc nay được công nhận một phần → ngân hàng có thêm dư địa cho vay mà không cần huy động thêm từ dân cư. Đây là NỚI LỎNG THANH KHOẢN KHÔNG CẦN HẠ LÃI SUẤT." },
              { title: "Cách khai thác thông tin này", body: "Lịch giải ngân đầu tư công và lịch nộp thuế là hai biến số DỰ BÁO ĐƯỢC. Q4 thường là giai đoạn Kho bạc giải ngân mạnh → thanh khoản được bổ sung → VNIBOR dịu → hỗ trợ chứng khoán tháng 11–12. Kết hợp lịch này với bảng OMO để dự đoán trạng thái thanh khoản 4–8 tuần tới — edge mà rất ít nhà đầu tư cá nhân khai thác." },
            ],
            pitfalls: [
              "Áp mô hình TGA của Fed vào VN. Cơ chế NGƯỢC CHIỀU: ở Mỹ TGA tăng hút dự trữ; ở VN tiền Kho bạc gửi tại NHTM là nguồn vốn cho ngân hàng.",
              "Giải thích mọi biến động VNIBOR bằng chính sách SBV. Một phần lớn đến từ nhịp thu–chi ngân sách.",
              "Coi việc cho tính tiền gửi Kho bạc vào LDR là trung tính. Nó nới năng lực cho vay ngay lập tức, tương đương một đợt nới lỏng ẩn.",
            ],
            signals: [
              { label: "Q4: giải ngân ĐTC tăng tốc + Kho bạc chi mạnh", type: "bull", text: "Thanh khoản hệ thống được bơm từ kênh tài khoá. VNIBOR dịu. Thường hỗ trợ chứng khoán cuối năm." },
              { label: "VNIBOR tăng nhưng SBV vẫn bơm ròng OMO", type: "neutral", text: "Nguyên nhân không nằm ở SBV — nhiều khả năng Kho bạc rút tiền hoặc nhu cầu ngoại tệ. Tìm nguồn gốc trước khi kết luận thắt chặt." },
            ],
            vnContext: "Số dư tiền gửi Kho bạc ít được công bố đều đặn — theo dõi gián tiếp qua thuyết minh 'tiền gửi của Kho bạc Nhà nước' trong BCTC quý các ngân hàng lớn (Vietcombank, BIDV, VietinBank). Tỷ lệ giải ngân ĐTC: Bộ Tài chính hàng tháng.",
          }},
        ],
      },
      {
        id: "plumbing", title: "Ba tầng hệ thống tiền tệ", tag: "money plumbing", tagColor: "#0891b2",
        def: "Tiền không phải một thứ đồng nhất. Nó có PHÂN TẦNG theo chất lượng và người phát hành. Khủng hoảng tài chính hầu như luôn bắt đầu ở tầng ngoài cùng, nơi không có người cho vay cuối cùng.",
        children: [
          { id: "layers", label: "M0 / M2 / Shadow money", color: "#0891b2", tabs: {
            def: "Tầng 1 — Tiền cơ sở (M0): tiền mặt lưu thông + dự trữ của NHTM tại SBV. Chỉ SBV tạo được. Tầng 2 — Tiền ngân hàng (M2): tiền gửi do NHTM tạo khi cho vay, chiếm ~80–85% cung tiền. Tầng 3 — Tiền bóng: repo, TPDN, chứng chỉ tiền gửi liên ngân hàng, uỷ thác đầu tư.",
            deep: [
              { title: "Thứ bậc chất lượng và điều gì xảy ra khi khủng hoảng", body: "Bình thường, ba tầng trao đổi ngang giá. Trong khủng hoảng, thứ bậc lộ ra: người ta chạy từ tầng 3 về tầng 2, rồi từ tầng 2 về tầng 1 — chính là bank run và fire sale. Perry Mehrling gọi đây là 'hierarchy of money'. Chỉ tầng 1 có người phát hành không thể vỡ nợ bằng nội tệ. Tầng 3 không có bảo hiểm tiền gửi, không có cửa sổ chiết khấu." },
              { title: "Tầng 3 ở Việt Nam: TPDN là ví dụ giáo khoa", body: "Giai đoạn 2020–2021, TPDN bùng nổ như một dạng shadow money: doanh nghiệp BĐS phát hành, nhà đầu tư cá nhân mua vì lợi suất cao, tiền được coi như 'gần tiền'. Khi niềm tin sụp đổ năm 2022, tầng 3 bốc hơi: không ai mua trái phiếu mới, doanh nghiệp không đảo được nợ. Cú sốc lan sang tầng 2 vì ngân hàng nắm giữ TPDN và cho vay chính các doanh nghiệp đó. Bài học: theo dõi SPREAD lợi suất TPDN so với TPCP — nới rộng đột ngột là báo động đỏ sớm nhất." },
              { title: "Bẫy thanh khoản dưới góc nhìn ba tầng", body: "SBV có thể bơm tầng 1 gần như vô hạn. Nhưng tầng 2 chỉ nở khi ngân hàng MUỐN cho vay và người vay MUỐN vay. Nếu ngân hàng lo NPL và doanh nghiệp đang deleveraging, M0 tăng mà M2 đứng yên. Đây là lý do 'bơm tiền' không tự động tạo lạm phát hay tăng giá tài sản. Chỉ số theo dõi: tốc độ tăng M2 chia tốc độ tăng M0." },
            ],
            pitfalls: [
              "Nói 'SBV bơm tiền nên lạm phát sẽ tăng' mà không kiểm tra M2 có nở không. QE ở Mỹ và Nhật đã bơm M0 khổng lồ mà lạm phát không đến trong hơn một thập kỷ.",
              "Bỏ qua tầng 3. Nhìn vào M2 mà bỏ qua TPDN và repo là bỏ qua chính nơi khủng hoảng khởi phát.",
              "Coi bảo hiểm tiền gửi là lá chắn đủ. Hạn mức 125 triệu đồng bảo vệ đa số người gửi về SỐ LƯỢNG nhưng tỷ lệ theo GIÁ TRỊ thấp hơn nhiều.",
            ],
            signals: [
              { label: "Spread TPDN − TPCP nới rộng đột ngột", type: "bear", text: "Tầng 3 đang co. Chỉ báo sớm nhất của stress hệ thống. Giảm rủi ro trước khi lan sang tầng 2." },
              { label: "M2/M0 tăng (số nhân thực tế nở)", type: "bull", text: "Truyền dẫn tín dụng đang hoạt động. Thanh khoản chảy vào nền kinh tế thực và tài sản." },
              { label: "M0 tăng mạnh, M2 đứng yên", type: "neutral", text: "Bẫy thanh khoản. Kỳ vọng lạm phát từ 'bơm tiền' là sai. Chính sách tài khoá mới là đòn bẩy hiệu quả." },
            ],
            vnContext: "M0, M2: SBV công bố hàng tháng, độ trễ. Dư nợ TPDN và lịch đáo hạn: FiinRatings, VBMA. Spread TPDN khó lấy vì thị trường thứ cấp mỏng — dùng lợi suất phát hành sơ cấp cùng nhóm xếp hạng so với TPCP cùng kỳ hạn làm proxy.",
          }},
        ],
      },
    ],
  },

  exchange: {
    id: "exchange", label: "Tỷ giá & Cán cân đối ngoại", sublabel: "FX & External Balance",
    color: "#5B3FA0", lightBg: "#faf5ff", border: "#c4b5fd",
    def: "Tỷ giá là ràng buộc TRÓI BUỘC NHẤT của chính sách tiền tệ VN — trói buộc hơn lạm phát. Nếu phải chọn MỘT biến để dự báo hành động của SBV, hãy chọn tỷ giá và dự trữ ngoại hối, không phải CPI. Đây là điểm phân biệt người phân tích VN chuyên nghiệp với người áp mô hình phương Tây.",
    points: [
      { title: "Cơ chế tỷ giá trung tâm: managed float với neo mềm", body: "Từ 4/1/2016, SBV công bố tỷ giá trung tâm hàng ngày, tham chiếu rổ tiền tệ của các đối tác thương mại chính, diễn biến cung cầu trong nước và cân đối vĩ mô. Ngân hàng thương mại giao dịch trong biên độ quanh tỷ giá trung tâm; biên độ đã nới lên ±5% từ tháng 10/2022. Bản chất: neo mềm có thể điều chỉnh, không phải thả nổi. Nó mua được ổn định danh nghĩa nhưng đánh đổi bằng độc lập tiền tệ và dự trữ." },
      { title: "⚠ Dự trữ ngoại hối: mỏng hơn nhiều so với cảm nhận phổ biến", body: "Dự trữ ngoại hối VN đạt đỉnh khoảng 111,8 tỷ USD tháng 1/2022, giảm về 86,7 tỷ USD cuối 2022 do can thiệp bảo vệ tỷ giá, và ở mức gần 87,6 tỷ USD tính đến 18/6/2026. Con số tuyệt đối nghe lớn, nhưng thước đo đúng là SỐ THÁNG NHẬP KHẨU: tháng 7/2025, dự trữ khoảng 80,3 tỷ USD chỉ tương đương 2,2 tháng nhập khẩu — DƯỚI ngưỡng tối thiểu 3 tháng mà IMF khuyến nghị. Lý do: nhập khẩu tăng nhanh trong khi dự trữ đi ngang suốt bốn năm. Hệ quả: dư địa can thiệp của SBV hạn chế hơn nhiều so với con số tuyệt đối gợi ý. Đây là ràng buộc CỨNG NHẤT của CSTT VN hiện nay." },
      { title: "Can thiệp 'mềm': bán ngoại tệ kỳ hạn có huỷ ngang", body: "Thay vì bán USD giao ngay (hao dự trữ ngay), SBV dùng hợp đồng bán ngoại tệ kỳ hạn có huỷ ngang: cam kết bán USD ở tương lai với quyền huỷ, trấn an thị trường và dồn nhu cầu ngoại tệ về các tháng cuối năm — khi nguồn cung cải thiện nhờ kiều hối và triển vọng Fed nới lỏng. Ưu điểm: bảo toàn dự trữ giao ngay nếu áp lực chỉ ngắn hạn. Rủi ro: nếu áp lực dai dẳng, nghĩa vụ kỳ hạn tích tụ thành 'dự trữ âm ẩn'. Chính vì vậy IMF yêu cầu công bố VỊ THẾ KỲ HẠN, không chỉ dự trữ gộp." },
      { title: "Minh bạch hoá dữ liệu: bước ngoặt từ 2027", body: "SBV và Bộ Tài chính Hoa Kỳ đã ra tuyên bố chung, trong đó VN cam kết công bố dữ liệu mua ngoại tệ và dự trữ ngoại hối theo chuẩn IMF từ năm 2027. Hiện tại việc SBV hiếm khi công bố dự trữ là nguồn bất định lớn — lần công bố mức 87,6 tỷ USD (6/2026) là hiếm hoi. Từ 2027, bạn sẽ thấy cả vị thế kỳ hạn, tức biết SBV đã 'bán trước' bao nhiêu." },
      { title: "Bộ ba bất khả thi → và vì sao Rey nói nó thực ra là 'nhị nan'", body: "Mundell–Fleming: không thể đồng thời có (1) dòng vốn tự do, (2) tỷ giá cố định, (3) chính sách tiền tệ độc lập. VN hy sinh một phần (1) bằng kiểm soát vốn và một phần (2) bằng biên độ, để giữ một phần (3). Nhưng Hélène Rey (2015): với chu kỳ tài chính toàn cầu do Fed và khẩu vị rủi ro quốc tế chi phối, ngay cả nước thả nổi tỷ giá cũng KHÔNG có độc lập tiền tệ thật — chỉ kiểm soát vốn mới mua được nó. Điều này giải thích vì sao SBV bị Fed dắt mũi nhiều hơn lý thuyết cho phép." },
      { title: "Cán cân vãng lai: nơi sự thật về nguồn cung USD nằm", body: "Thặng dư thương mại hàng hoá của VN lớn, nhưng cán cân vãng lai (CA) nhỏ hơn nhiều vì bị bào mòn bởi: (a) thâm hụt dịch vụ — vận tải biển, bảo hiểm, du lịch outbound; (b) thâm hụt thu nhập sơ cấp — chuyển lợi nhuận về nước của khối FDI, hàng chục tỷ USD mỗi năm; (c) bù lại một phần bởi kiều hối, khoảng 17–19 tỷ USD/năm. HSBC đã hạ dự báo thặng dư CA của VN năm 2026 xuống khoảng 2,2% GDP. Kết luận: đừng dùng thặng dư thương mại để kết luận VND an toàn. Dùng CA, và cộng thêm dòng vốn ròng." },
      { title: "Nghịch lý 2025–2026: DXY yếu nhưng VND vẫn chịu áp lực", body: "Năm 2025, chỉ số DXY giảm mạnh nhưng USD/VND vẫn tăng — bác bỏ mô hình đơn giản 'DXY yếu thì VND khoẻ'. Nguyên nhân NỘI SINH: lượng VND tăng nhanh (tín dụng chạy nhanh hơn huy động) trong khi nguồn cung USD không tăng tương ứng; chênh lệch lãi suất VND–USD thu hẹp khiến động cơ nắm giữ VND yếu đi. Fed cắt lãi suất lần đầu ngày 18/9/2025 giúp nới lại chênh lệch. Cuối tháng 6/2026, tỷ giá trung tâm quanh 25.197 đồng, tăng bảy tuần liên tiếp nhưng chỉ khoảng +0,3% từ đầu năm — SBV đang cho phép trượt có kiểm soát. Bài học: luôn phân tách áp lực tỷ giá thành ngoại sinh (DXY, Fed) và nội sinh (cung tiền VND, chênh lệch lãi suất, CA)." },
      { title: "Đánh đổi cốt lõi mà SBV phải giải mỗi ngày", body: "Muốn hỗ trợ tăng trưởng → hạ lãi suất VND → chênh lệch lãi suất VND–USD thu hẹp → giảm động cơ nắm giữ VND → áp lực tỷ giá → phải bán USD can thiệp → hút VND khỏi hệ thống → lãi suất liên ngân hàng tăng → triệt tiêu chính nới lỏng ban đầu. Vòng lặp này là lý do SBV thường chọn công cụ ẩn (OMO, tỷ lệ an toàn, room) thay vì lãi suất công bố. Khi bạn thấy SBV nới bằng công cụ macroprudential — như nâng trần vốn ngắn hạn cho vay dài hạn từ 30% lên 40% tháng 6/2026 — thay vì hạ lãi suất, đó chính là vì ràng buộc tỷ giá đang căng." },
    ],
    pitfalls: [
      "Dùng 'tháng nhập khẩu' của những năm cũ. Dự trữ VN hiện chỉ khoảng 2,2–2,5 tháng nhập khẩu, DƯỚI ngưỡng IMF — nhiều tài liệu vẫn ghi 3,5–4 tháng, đó là số liệu lỗi thời.",
      "Cho rằng dự trữ gộp là toàn bộ đạn dược. Vị thế bán kỳ hạn chưa được công bố; dự trữ khả dụng có thể thấp hơn con số công bố.",
      "Giả định 'Fed hạ lãi suất → VND tự động ổn'. Yếu tố nội sinh (tăng trưởng cung tiền VND, CA thu hẹp) có thể áp đảo, như đã xảy ra năm 2025.",
      "Đọc tỷ giá trung tâm như tỷ giá thị trường. Tỷ giá giao dịch tại NHTM có thể áp sát trần biên độ trong khi tỷ giá trung tâm tăng rất chậm.",
    ],
    signals: [
      { label: "SBV chuyển từ bơm OMO sang phát hành tín phiếu", type: "bear", text: "Gần như luôn là phản ứng với áp lực tỷ giá. Tín hiệu sớm hơn mọi thứ khác. Giảm duration, giảm đòn bẩy." },
      { label: "Dự trữ giảm nhanh + tỷ giá NHTM áp trần biên độ", type: "bear", text: "SBV đang cạn dư địa. Rủi ro điều chỉnh tỷ giá bước ngoặt. Ưu tiên tài sản USD, vàng, cổ phiếu xuất khẩu có doanh thu USD." },
      { label: "CA thặng dư mở rộng + kiều hối mùa Tết + Fed nới lỏng", type: "bull", text: "Ba nguồn cung USD cùng cải thiện. SBV có thể mua bổ sung dự trữ VÀ hạ lãi suất mà không lo tỷ giá. Môi trường tốt nhất cho tài sản VND." },
      { label: "Tín dụng tăng nhanh hơn huy động kéo dài", type: "bear", text: "Cung VND nở nhanh hơn cung USD → áp lực tỷ giá nội sinh, độc lập với DXY. Cơ chế này đã chi phối 2025–2026." },
    ],
    vnContext: "Tỷ giá trung tâm: SBV công bố mỗi sáng. Tỷ giá NHTM: Vietcombank là tham chiếu. Dự trữ ngoại hối: SBV công bố hiếm; từ 2027 theo chuẩn IMF gồm cả vị thế kỳ hạn. Cán cân thanh toán: SBV/IMF theo quý, trễ. DXY và kỳ vọng Fed: CME FedWatch. Kiều hối: World Bank, NHNN cuối năm.",
  },
};

const ACTORS = [
  { name: "NGÂN HÀNG NHÀ NƯỚC (SBV)", color: "#B34040", bg: "#fef2f2", border: "#fca5a5",
    goal: "Đa mục tiêu theo Luật NHNN — không có mandate lạm phát đơn nhất như Fed",
    tools: ["Lãi suất OMO & tín phiếu (công cụ vận hành thật sự)", "Lãi suất điều hành (tín hiệu, thay đổi hiếm)", "Tỷ giá trung tâm + can thiệp giao ngay và kỳ hạn có huỷ ngang", "Công cụ an toàn vĩ mô: LDR, trần vốn ngắn hạn cho vay dài hạn, bộ đệm vốn", "Định hướng tín dụng (room, đang chuyển sang dựa trên rủi ro)"],
    tension: "Ràng buộc trói buộc nhất là TỶ GIÁ, không phải lạm phát. Dự trữ chỉ ~2,2–2,5 tháng nhập khẩu → dư địa can thiệp mỏng → phải nới lỏng bằng công cụ ẩn thay vì hạ lãi suất công khai.",
    tell: "Khi SBV nới bằng macroprudential (nâng trần LDR, nâng trần vốn ngắn hạn cho vay dài hạn) thay vì hạ lãi suất → tỷ giá đang là ràng buộc. Khi SBV phát hành tín phiếu trở lại → đã chuyển sang phòng thủ tỷ giá." },
  { name: "KHO BẠC NHÀ NƯỚC", color: "#1A7A5E", bg: "#f0fdf4", border: "#86efac",
    goal: "Tài trợ ngân sách với chi phí thấp, đảm bảo giải ngân theo kế hoạch",
    tools: ["Phát hành TPCP qua đấu thầu tại HNX", "Quản lý số dư tiền gửi tại ngân hàng thương mại (khác Mỹ: không gửi tại NHTW)", "Lịch giải ngân đầu tư công (dồn về cuối năm)"],
    tension: "Tiền Kho bạc gửi tại NHTM là nguồn vốn ngân hàng. Khi Kho bạc rút để giải ngân, thanh khoản ngân hàng biến động — tạo nhịp mùa vụ độc lập với SBV. Phát hành TPCP nhiều → crowding out tín dụng tư nhân.",
    tell: "Đấu thầu TPCP ế nhiều phiên = thị trường không chấp nhận lợi suất chào → lợi suất sẽ bị đẩy lên. Giải ngân ĐTC tăng tốc Q4 = thanh khoản được bơm từ kênh tài khoá." },
  { name: "NGÂN HÀNG THƯƠNG MẠI", color: "#1E5AA8", bg: "#eff6ff", border: "#93c5fd",
    goal: "Tối đa ROE trong ràng buộc CAR, LDR và định hướng tín dụng",
    tools: ["Tạo tiền qua cho vay (không phải trung gian tiền gửi)", "Điều chỉnh cơ cấu cho vay để tối ưu RWA và NIM", "Nắm giữ TPCP (tiết kiệm vốn + tài sản thế chấp OMO)", "Phát hành trái phiếu, tăng vốn cấp 2"],
    tension: "NIM cao đòi hỏi cho vay rủi ro cao và chênh lệch kỳ hạn lớn — cả hai đều làm tăng credit cost và IRRBB. Trần vốn ngắn hạn cho vay dài hạn nới lên 40% (6/2026) cho phép ăn dày hơn, nhưng chất thêm rủi ro kỳ hạn kiểu SVB.",
    tell: "Nợ nhóm 2 tăng trong khi NPL công bố ổn định = chất lượng đang xấu, sẽ lộ sau ~2 quý. CASA sụt khi lãi suất tăng = NIM sắp bị ép." },
  { name: "HỘ GIA ĐÌNH / NGƯỜI GỬI TIỀN", color: "#A0522D", bg: "#f0fdff", border: "#a5f3fc",
    goal: "Lợi suất thực dương, an toàn vốn, thanh khoản",
    tools: ["Chuyển dịch giữa tiền gửi, vàng, USD, BĐS, chứng khoán", "Lựa chọn kỳ hạn (CASA vs tiền gửi có kỳ hạn)"],
    tension: "Khi lãi suất thực âm, dòng tiền chạy khỏi ngân hàng sang tài sản → đẩy giá tài sản, làm khó SBV. Khi lãi suất tiết kiệm hấp dẫn, tiền rút khỏi chứng khoán → thanh khoản thị trường cạn. Tiền gửi dân cư đạt kỷ lục trên 10,38 triệu tỷ đồng (1/2026) — phản ánh tâm lý phòng thủ.",
    tell: "Tiền gửi dân cư tăng kỷ lục khi lãi suất thấp = e ngại rủi ro, chưa sẵn sàng vào tài sản. Đây là 'thuốc súng khô' — có thể chảy vào chứng khoán khi niềm tin quay lại." },
  { name: "KHỐI NGOẠI (FDI + FII)", color: "#B87000", bg: "#fffbeb", border: "#fcd34d",
    goal: "Lợi suất điều chỉnh rủi ro, gồm rủi ro tỷ giá và khả năng chuyển vốn về",
    tools: ["FDI: quyết định đặt nhà máy, quy mô giải ngân, chuyển lợi nhuận về nước", "FII: mua bán trên HOSE/HNX qua ngân hàng lưu ký", "Carry trade: vay USD rẻ, nắm tài sản VND lợi suất cao"],
    tension: "FDI ổn định nhưng lợi nhuận chuyển về nước bào mòn cán cân vãng lai. FII biến động theo chu kỳ tài chính toàn cầu (DXY, VIX) hơn là theo yếu tố cơ bản VN. Carry trade bất đối xứng: lãi chậm, lỗ nhanh — unwind gây sụp tỷ giá.",
    tell: "Khối ngoại bán ròng khi DXY tăng = risk-off toàn cầu, không phải đánh giá về VN. Ngược lại, mua ròng bền vững khi DXY đi ngang = niềm tin thật vào cơ bản." },
];

const ADVANCED_TOPICS = [
  { id: "ftse", icon: "🚀", color: "#B34040", bg: "#f0fdf4", border: "#86efac",
    title: "Nâng hạng FTSE — cơ chế dòng vốn thật, không phải câu chuyện",
    subtitle: "Hiệu lực 21/9/2026 · Sự kiện lớn nhất của TTCK VN trong thập kỷ",
    overview: "FTSE Russell công bố nâng hạng VN từ Cận biên lên Mới nổi Thứ cấp ngày 7/10/2025, xác nhận giữ nguyên lộ trình sau kỳ rà soát giữa kỳ tháng 3/2026. Cổ phiếu VN chính thức vào các rổ chỉ số FTSE từ thứ Hai 21/9/2026, triển khai nhiều giai đoạn tới 2027. VN-Index tăng hơn 4% trong phiên 8/4/2026 khi tin xác nhận công bố. Điều quan trọng: phần lớn phân tích phổ thông đang phóng đại quy mô dòng vốn thụ động và bỏ qua dòng bán ra từ quỹ cận biên.",
    sections: [
      { title: "Cơ chế định lượng dòng vốn thụ động — làm phép tính đúng", body: "Dòng tiền thụ động = (Tỷ trọng VN trong chỉ số) × (Tổng AUM các quỹ mô phỏng). VN được ước tính chiếm khoảng 0,227% trong FTSE Emerging Index và 0,35% trong FTSE Emerging All Cap. SSI Research ước tính dòng vốn thụ động khoảng 1,7 tỷ USD, giải ngân rải trong 3–5 quý chứ không dồn một đợt — tương tự Ả-rập Xê-út năm 2019. Con số 6–8 tỷ USD một số nơi nêu bao gồm cả dòng vốn CHỦ ĐỘNG, vốn không bắt buộc và phụ thuộc hoàn toàn vào định giá cùng chất lượng doanh nghiệp.", type: "concept" },
      { title: "⚠ Mặt trái ít được nói: dòng bán ra từ quỹ cận biên", body: "Trước nâng hạng, VN chiếm tỷ trọng rất lớn trong FTSE Frontier Index — khoảng 32%, đóng vai trò đầu tàu trong rổ của các quỹ chuyên đầu tư thị trường cận biên. Khi VN rời nhóm cận biên, các quỹ frontier BUỘC PHẢI BÁN toàn bộ vị thế VN. Dòng bán này bắt buộc và diễn ra quanh ngày hiệu lực, trong khi dòng mua thụ động EM rải ra nhiều quý. Hệ quả: dòng ròng ngắn hạn có thể nhỏ hơn nhiều so với con số headline, thậm chí âm trong một số giai đoạn. Đây là lý do các thị trường thường tích cực TRƯỚC thông tin nâng hạng và điều chỉnh trong 3–6 tháng SAU đó.", type: "warning" },
      { title: "Từ cá lớn ao nhỏ thành cá nhỏ ao lớn", body: "Trong rổ cận biên, VN được ưu tiên tự động do tỷ trọng áp đảo. Trong rổ mới nổi, VN cạnh tranh trực tiếp với Trung Quốc, Ấn Độ, Brazil, Indonesia — tỷ trọng chỉ khoảng 0,2–0,35%. Nhà quản lý quỹ EM chủ động không có nghĩa vụ nào phải nắm VN. Họ chỉ nắm nếu tăng trưởng lợi nhuận, quản trị và thanh khoản thuyết phục. Kết luận: nâng hạng mở CỬA cho dòng vốn, nhưng không tự động mang tiền vào. Yếu tố quyết định trung hạn vẫn là cơ bản doanh nghiệp và vĩ mô.", type: "concept" },
      { title: "Điều kiện kỹ thuật đã được đáp ứng thế nào", body: "Hai tiêu chí VN từng vướng là 'Chu kỳ thanh toán (DvP)' và 'chi phí phát sinh khi giao dịch lỗi thanh toán', đều xuất phát từ quy định ký quỹ trước giao dịch. Tháng 11/2024 VN triển khai cơ chế Non Pre-funding cho nhà đầu tư tổ chức nước ngoài. Thông tư 08/2026/TT-BTC thiết lập khuôn khổ pháp lý cho mô hình công ty chứng khoán toàn cầu (global broker) — mảnh ghép cuối FTSE yêu cầu. Hệ thống KRX cũng đã vận hành. Danh sách chính thức cổ phiếu vào rổ sẽ công bố tại kỳ rà soát bán niên ngày 21/8/2026; FTSE dự kiến khoảng 32 cổ phiếu VN đủ điều kiện.", type: "concept" },
      { title: "Rủi ro méo mó chỉ số (index distortion)", body: "Dòng vốn thụ động phân bổ theo vốn hoá điều chỉnh free-float, nên tập trung vào một số ít cổ phiếu dẫn dắt. Với VN — Nhà nước nắm tỷ lệ lớn ở nhiều doanh nghiệp lớn và room ngoại vẫn giới hạn ở ngân hàng — free float thực tế thấp hơn vốn hoá danh nghĩa nhiều. Kết quả: một lượng tiền không quá lớn có thể đẩy giá vài mã lên mạnh, tạo ảo giác về sức mạnh toàn thị trường. Cách kiểm chứng: theo dõi ĐỘ RỘNG thị trường (advance/decline, % cổ phiếu trên MA200), không chỉ chỉ số.", type: "warning" },
    ],
    signals: [
      { label: "Trước 21/8/2026 — công bố danh sách cổ phiếu vào rổ", type: "bull", text: "Giai đoạn định vị. Các mã trong danh sách dự kiến thường được gom trước. Rủi ro: 'buy the rumour, sell the news'." },
      { label: "Quanh 21/9/2026 — ngày hiệu lực", type: "neutral", text: "Dòng bán bắt buộc từ quỹ frontier gặp dòng mua thụ động EM. Biến động cao, hướng đi không chắc chắn. Đừng đặt cược một chiều vào 'nâng hạng = tăng'." },
      { label: "Sau nâng hạng: độ rộng thị trường hẹp, chỉ vài mã kéo index", type: "bear", text: "Méo mó chỉ số, không phải sức khoẻ thật. Kiểm tra advance/decline line và % cổ phiếu trên MA200 trước khi tăng vị thế." },
      { label: "Dòng vốn chủ động vào bền vững sau 2–3 quý", type: "bull", text: "Đây mới là xác nhận thật. Quỹ EM chủ động thấy VN đáng nắm dựa trên cơ bản, không chỉ vì chỉ số bắt buộc." },
    ],
    vnContext: "Mốc theo dõi: 21/8/2026 công bố danh sách cổ phiếu vào rổ; 21/9/2026 hiệu lực giai đoạn 1; hoàn tất dự kiến trong 2027. Theo dõi tỷ trọng VN trong FTSE Emerging (~0,227%), khối ngoại mua/bán ròng hàng ngày (HOSE), và quan trọng nhất — ĐỘ RỘNG thị trường để phân biệt dòng tiền thật với méo mó chỉ số." },
  { id: "regime", icon: "🧭", color: "#D4820A", bg: "#eff6ff", border: "#93c5fd",
    title: "Macro Regime — nhận diện bằng z-score, không bằng mức tuyệt đối",
    subtitle: "Regime là phân phối, không phải điểm. Đây là chỗ nghiệp dư hay sai nhất.",
    overview: "Regime không phải 'GDP > 6% thì tốt'. Regime là trạng thái mà trong đó QUAN HỆ giữa các biến số thay đổi — cùng một tin tức tạo phản ứng giá khác nhau ở regime khác nhau. Nhận diện regime đòi hỏi so sánh biến số với chính lịch sử của nó (z-score), không phải với ngưỡng cố định.",
    sections: [
      { title: "Vì sao ngưỡng cố định thất bại và z-score thắng", body: "PMI 51 ở nền kinh tế có PMI trung bình 5 năm là 50 mang thông tin khác hẳn PMI 51 ở nơi trung bình là 54. CPI 4% ở VN (trung bình lịch sử ~3%) là cảnh báo; CPI 4% ở Thổ Nhĩ Kỳ là thiên đường. Phương pháp: z = (x − μ) ÷ σ, với μ và σ tính trên cửa sổ cuộn 3–5 năm. Regime Tăng trưởng = trung bình z-score của {PMI, IIP, bán lẻ thực, XK}. Regime Lạm phát = trung bình z-score của {CPI lõi 3m SAAR, PMI giá đầu vào, giá hàng hoá}. Hai trục này tạo ma trận 2×2.", type: "concept" },
      { title: "Bốn regime và cơ chế vì sao mỗi tài sản hoạt động khác nhau", body: "GOLDILOCKS (tăng trưởng ↑, lạm phát ↓): tử số EPS tăng, mẫu số chiết khấu ổn → cổ phiếu ăn cả hai. TĂNG TRƯỞNG NÓNG (↑,↑): EPS tăng nhưng r tăng → P/E bị nén; cổ phiếu giá trị thắng cổ phiếu tăng trưởng; hàng hoá thắng. ĐÌNH LẠM (↓,↑): EPS giảm VÀ r tăng → tệ cho cả cổ phiếu lẫn trái phiếu; chỉ vàng và hàng hoá sống sót; regime duy nhất mà danh mục 60/40 thất bại hoàn toàn. GIẢM PHÁT/SUY THOÁI (↓,↓): EPS giảm nhưng r giảm mạnh hơn → TPCP dài hạn là tài sản tốt nhất; cổ phiếu chạm đáy TRƯỚC khi EPS chạm đáy.", type: "concept" },
      { title: "⚠ Policy regime có thể ngược chiều macro regime", body: "Ở các nước có mandate lạm phát rõ ràng, chính sách thường đồng pha với chu kỳ. Ở VN thì KHÔNG đảm bảo: kinh tế có thể yếu ĐỒNG THỜI tỷ giá căng → SBV không thể nới, thậm chí phải thắt. Đây là 'kẹp hai đầu' — regime tệ nhất cho nhà đầu tư và chính là kịch bản 2022. Quy tắc thực chiến: luôn kiểm tra ràng buộc tỷ giá và dự trữ TRƯỚC khi giả định SBV sẽ phản ứng với tăng trưởng yếu.", type: "warning" },
      { title: "Chuyển pha: tín hiệu nào đến trước", body: "Thứ tự thời gian điển hình khi thoát đáy: (1) Credit impulse chuyển dương; (2) Sub-index đơn hàng mới của PMI đảo chiều; (3) SBV nới lỏng hoặc dừng thắt; (4) Cổ phiếu chu kỳ tạo đáy; (5) PMI tổng vượt 50; (6) EPS đảo chiều; (7) GDP xác nhận. Nhà đầu tư nghiệp dư chờ bước (7). Nhà đầu tư chuyên nghiệp hành động ở (1)–(3). Chi phí của việc sớm là chịu drawdown thêm vài tháng; chi phí của việc muộn là mất phần lớn cú tăng.", type: "signal" },
    ],
    signals: [
      { label: "Growth z > 0, Inflation z < 0, ràng buộc tỷ giá lỏng", type: "bull", text: "Goldilocks thật. Tối đa hoá tỷ trọng cổ phiếu, ưu tiên cyclicals và financials. Giảm TPCP dài hạn." },
      { label: "Growth z < 0 và Inflation z > 0 đồng thời", type: "bear", text: "Đình lạm. Danh mục 60/40 sẽ thất bại. Chuyển sang vàng, hàng hoá, tiền mặt. Bảo toàn vốn là ưu tiên tuyệt đối." },
      { label: "Growth z < 0 nhưng SBV KHÔNG thể nới vì tỷ giá", type: "bear", text: "Kẹp hai đầu — regime nguy hiểm nhất và đặc thù VN. Không có tài sản VND nào an toàn. Cân nhắc tài sản định giá USD." },
      { label: "Credit impulse đảo dương + đơn hàng mới PMI đảo chiều", type: "bull", text: "Tín hiệu sớm nhất của chuyển pha sang phục hồi. Bắt đầu xây vị thế cyclicals 1–2 quý trước khi GDP xác nhận." },
    ],
    vnContext: "Tự dựng z-score trong Google Sheet: lấy chuỗi 5 năm của PMI, CPI lõi, tăng trưởng tín dụng, IIP; tính μ và σ cuộn 36–60 tháng; z = (giá trị hiện tại − μ)/σ. Regime score = trung bình z của nhóm. Cập nhật hàng quý. Đây là cách các quỹ macro thực sự làm." },
  { id: "reflexivity", icon: "🔄", color: "#1A7A5E", bg: "#faf5ff", border: "#c4b5fd",
    title: "Reflexivity — và cách đo đòn bẩy ĐÚNG ở thị trường VN",
    subtitle: "Soros, Minsky, và lỗi mẫu số mà gần như mọi báo cáo VN đều mắc",
    overview: "Lý thuyết cổ điển: giá phản ánh giá trị. Soros: giá TẠO RA giá trị, vì giá ảnh hưởng đến tài sản thế chấp, chi phí vốn và hành vi. Vòng phản hồi này khiến bong bóng kéo dài lâu hơn logic cho phép và vỡ nhanh hơn mô hình dự báo. Ở VN, việc đo đòn bẩy sai mẫu số khiến người ta liên tục đánh giá thấp mức độ căng của thị trường.",
    sections: [
      { title: "⚠ Lỗi mẫu số: margin phải chia FREE FLOAT, không phải vốn hoá", body: "Hầu hết báo cáo VN tính tỷ lệ dư nợ margin chia tổng vốn hoá thị trường rồi kết luận 'vẫn thấp, an toàn'. Sai lầm: phần lớn vốn hoá VN bị KHOÁ — Nhà nước nắm tỷ lệ chi phối ở nhiều doanh nghiệp lớn, cổ đông chiến lược và nội bộ nắm thêm, room ngoại giới hạn ở ngân hàng. Số cổ phiếu thực sự lưu hành tự do nhỏ hơn vốn hoá rất nhiều. Margin được vay để mua chính phần free float đó. Vì vậy margin/free-float mới là thước đo đòn bẩy đúng — và nó cao hơn đáng kể con số margin/vốn hoá thường được trích dẫn. Đây là lý do thị trường VN có thể sụp nhanh hơn nhiều so với dự đoán từ chỉ số 'an toàn' truyền thống.", type: "warning" },
      { title: "Chu kỳ boom–bust năm giai đoạn của Soros", body: "(1) XU HƯỚNG NGẦM: cơ bản cải thiện thật, ít người nhận ra. (2) TĂNG TỐC: thị trường nhận ra, giá tăng, thiên kiến hình thành. (3) KIỂM TRA: điều chỉnh; nếu vượt qua, niềm tin củng cố mạnh hơn. (4) HƯNG PHẤN: giá tách khỏi cơ bản, narrative thay thế phân tích, đòn bẩy đạt đỉnh. (5) VỠ: một trigger nhỏ → margin call → bán bắt buộc → giá giảm → thêm margin call. Điểm mấu chốt: giai đoạn 5 luôn nhanh hơn 2–4 cộng lại, vì bán bắt buộc không quan tâm đến định giá.", type: "concept" },
      { title: "Vòng phản hồi tài sản thế chấp — cơ chế vật lý của bong bóng BĐS", body: "Giá BĐS tăng → giá trị tài sản thế chấp tại ngân hàng tăng → hạn mức tín dụng của người vay tăng → tiền chảy thêm vào BĐS → giá tăng tiếp. Đồng thời, RWA của khoản vay giảm khi LTV giảm → ngân hàng thấy mình an toàn hơn → cho vay thêm. Toàn bộ hệ thống trở nên AN TOÀN HƠN TRÊN SỔ SÁCH đúng lúc nó RỦI RO HƠN TRONG THỰC TẾ. Đây là nghịch lý Minsky: ổn định sinh ra bất ổn. Khi giá đảo chiều, mọi khâu chạy ngược với tốc độ lớn hơn.", type: "warning" },
      { title: "Danh sách kiểm tra giai đoạn hưng phấn (cần ≥3 dấu hiệu)", body: "① Margin/free-float ở vùng cao lịch sử. ② Tỷ trọng nhà đầu tư cá nhân trong thanh khoản vượt 85–90%. ③ P/E thị trường cao TRONG KHI lợi suất TPCP cũng cao. ④ Narrative thay thế số liệu: 'lần này khác', 'BĐS VN không bao giờ giảm'. ⑤ Số tài khoản mở mới tăng vọt. ⑥ Cổ phiếu đầu cơ, vốn hoá nhỏ, không lợi nhuận tăng mạnh hơn bluechip. ⑦ Đòn bẩy ngoài hệ thống (vay nóng, hợp tác đầu tư) nở rộ. Khi đủ 3+, giảm vị thế dần — đừng cố đoán chính xác đỉnh.", type: "signal" },
    ],
    signals: [
      { label: "Margin/free-float vùng cao lịch sử + retail > 85% thanh khoản", type: "bear", text: "Hưng phấn. Rủi ro bán bắt buộc rất cao nếu có cú sốc. Giảm đòn bẩy cá nhân TRƯỚC, giảm vị thế SAU." },
      { label: "Giá giảm 30–40% từ đỉnh, margin đã giải phóng, tâm lý sợ hãi", type: "bull", text: "Giai đoạn bust gần hoàn tất. Bắt đầu tích luỹ theo từng phần (DCA). Không cố bắt đáy chính xác — bạn sẽ sai." },
      { label: "Giá BĐS tăng + tín dụng BĐS vượt tín dụng chung", type: "bear", text: "Vòng phản hồi tài sản thế chấp đang chạy. Rủi ro tích luỹ trong khi chỉ số an toàn trên sổ sách trông đẹp. SBV thường can thiệp ở giai đoạn này." },
      { label: "Narrative mới xuất hiện sau bust, cơ bản cải thiện thật", type: "bull", text: "Có thể là giai đoạn 1 của chu kỳ mới — thời điểm rủi ro/lợi nhuận tốt nhất. Nâng hạng FTSE có thể đóng vai trò này nếu đi kèm cải thiện lợi nhuận doanh nghiệp." },
    ],
    vnContext: "Dư nợ margin: tổng hợp từ BCTC quý các CTCK. Free float: ước tính từ tỷ lệ sở hữu Nhà nước + cổ đông lớn + room ngoại đã dùng. Tỷ trọng retail: ước tính từ báo cáo VCSC/SSI. Số tài khoản mở mới: VSD công bố hàng tháng." },
  { id: "systemrisk", icon: "⚡", color: "#B87000", bg: "#fef2f2", border: "#fca5a5",
    title: "Rollover, CAR, Nợ bền vững & Neo tỷ giá — bốn ràng buộc và điểm gãy",
    subtitle: "Khủng hoảng không xảy ra khi một ràng buộc căng. Nó xảy ra khi bốn cái căng cùng lúc.",
    overview: "Từng ràng buộc riêng lẻ đều quản lý được. Nguy hiểm nằm ở TƯƠNG QUAN: khi tỷ giá căng buộc SBV thắt, lãi suất tăng làm rollover khó hơn, vỡ nợ đẩy NPL lên, NPL ăn vào CAR, CAR thấp buộc ngân hàng co tín dụng, kinh tế yếu làm thu ngân sách giảm, thâm hụt tài khoá tăng, phát hành TPCP nhiều hơn, lãi suất tăng thêm. Vòng lặp khép kín.",
    sections: [
      { title: "Rollover risk: Ponzi hợp pháp và vách đáo hạn", body: "Minsky phân loại ba trạng thái: HEDGE (dòng tiền đủ trả cả gốc lẫn lãi), SPECULATIVE (đủ trả lãi, phải đảo nợ gốc), PONZI (không đủ trả cả lãi, phải vay thêm để trả lãi). Nền kinh tế TRÔI từ hedge sang ponzi trong thời kỳ ổn định kéo dài. Rollover risk là rủi ro của trạng thái speculative và ponzi: bạn sống được chừng nào thị trường còn cho vay mới. Chỉ báo: tỷ lệ nợ đáo hạn trong 12 tháng chia tổng dư nợ. Khi vượt khoảng 40% và thị trường vốn đang thắt → vách đáo hạn. Khủng hoảng TPDN VN 2022 là ví dụ chuẩn giáo khoa.", type: "warning" },
      { title: "CAR: cơ chế khuếch đại, không phải chỉ số tĩnh", body: "CAR = Vốn tự có ÷ Tài sản có rủi ro (RWA). Hai kênh làm CAR xấu đi trong khủng hoảng, cộng hưởng nhau: (a) TỬ SỐ giảm vì trích lập dự phòng ăn vào lợi nhuận và vốn; (b) MẪU SỐ tăng vì khi khoản vay xuống hạng, hệ số rủi ro của nó tăng vọt. Ngân hàng bị ép từ cả hai phía cùng lúc. Lựa chọn: tăng vốn (pha loãng, giá cổ phiếu thấp nhất đúng lúc cần phát hành nhất) hoặc co bảng cân đối. Thông tư 14/2025/TT-NHNN bổ sung bộ đệm vốn phản chu kỳ — thiết kế đúng là tích luỹ đệm khi tốt để xả khi xấu.", type: "concept" },
      { title: "Nợ công bền vững: phương trình r − g quyết định tất cả", body: "Động lực nợ: Δ(Nợ/GDP) = (r − g) × (Nợ/GDP) − Thặng dư cơ bản/GDP. Trong đó r = lãi suất thực bình quân trên nợ, g = tăng trưởng GDP thực. Khi g > r (trường hợp VN gần đây), tỷ lệ nợ/GDP tự động giảm ngay cả khi có thâm hụt cơ bản vừa phải — 'tăng trưởng vượt lãi suất' là món quà. Rủi ro: nếu g tụt xuống dưới r, động lực ĐẢO CHIỀU và nợ bùng nổ phi tuyến. Điểm mù: nghĩa vụ NGOÀI BẢNG — nợ của doanh nghiệp nhà nước, bảo lãnh chính phủ, nghĩa vụ PPP. Chúng không nằm trong nợ công công bố nhưng sẽ trở thành nợ công khi có sự cố.", type: "concept" },
      { title: "Neo tỷ giá: hoạt động nhờ niềm tin, sụp khi niềm tin đi", body: "Mọi neo tỷ giá đều là lời hứa được bảo chứng bằng dự trữ. Khủng hoảng tiền tệ thế hệ 1 (Krugman): nếu chính sách trong nước không nhất quán với neo, dự trữ cạn dần và điểm sụp có thể tính toán được — nhà đầu cơ tấn công TRƯỚC khi dự trữ về 0. Thế hệ 2 (Obstfeld): khủng hoảng có thể TỰ ỨNG NGHIỆM — nếu đủ nhiều người tin sẽ phá giá, chi phí bảo vệ neo tăng đến mức chính phủ bỏ cuộc, dù nền tảng vẫn ổn. Với dự trữ VN chỉ khoảng 2,2–2,5 tháng nhập khẩu và vị thế bán kỳ hạn chưa minh bạch, không gian cho kịch bản thế hệ 2 lớn hơn nhiều người nghĩ.", type: "warning" },
      { title: "Bão hoàn hảo: bốn ràng buộc căng đồng thời", body: "Kịch bản: (1) Fed tăng lãi suất hoặc DXY mạnh → áp lực tỷ giá; (2) SBV buộc phải thắt để bảo vệ VND → chi phí vốn tăng; (3) doanh nghiệp không đảo được nợ TPDN đến hạn → vỡ nợ dây chuyền; (4) NPL nhảy vọt → CAR ngân hàng bị ép từ hai phía → tín dụng co; (5) kinh tế suy yếu → thu ngân sách giảm → thâm hụt tăng → Kho bạc phát hành nhiều hơn → lợi suất TPCP tăng → quay lại (2). Mỗi bước hợp lý riêng lẻ; hợp lại thành khủng hoảng. Dấu hiệu cảnh báo sớm nhất, theo thứ tự: spread TPDN nới rộng → SBV chuyển sang hút tiền → VNIBOR vượt lãi suất OMO → nợ nhóm 2 tăng.", type: "warning" },
    ],
    signals: [
      { label: "Trên 40% dư nợ TPDN đáo hạn trong 12 tháng + thị trường vốn thắt", type: "bear", text: "Vách đáo hạn. Tránh doanh nghiệp đòn bẩy cao và ngân hàng nắm nhiều TPDN. Kênh lây lan nhanh nhất." },
      { label: "CAR đệm dày + nợ nhóm 2 giảm + LLR cao", type: "bull", text: "Ngân hàng thật sự khoẻ, có dư địa giành thị phần khi cơ chế room chuyển sang dựa trên năng lực vốn." },
      { label: "g tụt dưới r trong khi thâm hụt cơ bản duy trì", type: "bear", text: "Động lực nợ đảo chiều. Theo dõi xếp hạng tín nhiệm quốc gia — downgrade làm chi phí vay ngoại tệ tăng, khép vòng lặp với tỷ giá." },
      { label: "Dự trữ dưới 2,5 tháng NK + tỷ giá NHTM áp trần biên độ", type: "bear", text: "Không gian cho khủng hoảng tự ứng nghiệm (thế hệ 2). Cần vị thế phòng thủ nghiêm túc: vàng, USD, giảm đòn bẩy VND." },
    ],
    vnContext: "Lịch đáo hạn TPDN: VBMA, FiinRatings tổng hợp theo quý. CAR và nợ nhóm 2: BCTC quý ngân hàng. Nợ công: Bộ Tài chính, và báo cáo Article IV của IMF. Xếp hạng tín nhiệm quốc gia: Moody's, S&P, Fitch — theo dõi cả TRIỂN VỌNG (outlook), không chỉ bậc xếp hạng." },
  { id: "carry", icon: "🌊", color: "#A0522D", bg: "#f0fdff", border: "#a5f3fc",
    title: "Carry trade & Dòng vốn — bất đối xứng và cơ chế unwind",
    subtitle: "Lợi nhuận nhỏ giọt, thua lỗ ập đến. Hiểu cấu trúc payoff trước khi hiểu dòng tiền.",
    overview: "Carry trade là chiến lược vay đồng tiền lãi suất thấp, đầu tư đồng tiền lãi suất cao, ăn chênh lệch. Nó hoạt động miễn là tỷ giá không phá vỡ giả định. Cấu trúc payoff giống BÁN QUYỀN CHỌN: thu phí đều đặn, chịu rủi ro đuôi lớn. Ở VN, carry trade quy mô nhỏ hơn Thổ Nhĩ Kỳ hay Brazil vì kiểm soát vốn, nhưng cơ chế và bài học vẫn áp dụng cho FII và tiền gửi ngoại tệ.",
    sections: [
      { title: "Ngang giá lãi suất và vì sao carry vẫn tồn tại", body: "Ngang giá lãi suất không phòng hộ (UIP) nói rằng chênh lệch lãi suất phải bằng kỳ vọng mất giá của đồng tiền lãi cao — nghĩa là carry trade không nên có lợi nhuận kỳ vọng. Thực nghiệm bác bỏ UIP một cách hệ thống ('forward premium puzzle'). Lý do: PHẦN BÙ RỦI RO. Carry trader được trả tiền để gánh rủi ro đuôi — rủi ro đồng tiền lãi cao sụp đột ngột. Không có bữa trưa miễn phí; có bữa trưa được trả tiền để ngồi cạnh cửa thoát hiểm hẹp.", type: "concept" },
      { title: "Cơ chế unwind: vì sao nó luôn nhanh", body: "Điều kiện kích hoạt: VIX tăng vọt, Fed hawkish bất ngờ, hoặc đồng tiền mục tiêu mất giá vượt ngưỡng chịu đựng. Chuỗi phản ứng: carry trader đóng vị thế → bán VND mua USD → VND mất giá thêm → kích hoạt cắt lỗ của trader khác → bán thêm. Vòng xoáy này chạy nhanh hơn nhiều so với quá trình tích luỹ vị thế, vì tích luỹ là TỰ NGUYỆN còn thoát là BẮT BUỘC. Đây cũng chính là cấu trúc của margin call trên thị trường chứng khoán — cùng một vật lý.", type: "warning" },
      { title: "Áp lực nội sinh vs ngoại sinh: bài học 2025–2026 của VN", body: "Mô hình ngây thơ: DXY yếu → VND khoẻ. Thực tế 2025: DXY giảm mạnh mà USD/VND vẫn tăng. Nguyên nhân nội sinh: cung VND nở nhanh (tín dụng chạy nhanh hơn huy động) trong khi cung USD không tăng tương ứng; chênh lệch lãi suất VND–USD thu hẹp làm giảm động cơ nắm giữ VND. Khi Fed bắt đầu cắt lãi suất (lần đầu ngày 18/9/2025), chênh lệch được nới ra, giảm bớt áp lực. Kết luận phương pháp: luôn phân tách áp lực tỷ giá thành hai thành phần và hỏi 'cái nào đang chi phối?' trước khi dự báo.", type: "signal" },
      { title: "Phân loại dòng vốn theo độ dính (stickiness)", body: "Xếp theo mức độ khó rút, từ dính nhất: (1) FDI vốn cố định — nhà máy không di chuyển được; (2) Kiều hối — quyết định cá nhân, phi chu kỳ, khoảng 17–19 tỷ USD/năm; (3) FDI dạng M&A — có thể thoái nhưng chậm; (4) FII cổ phiếu — rút trong ngày; (5) Tiền nóng/carry — rút trong giờ. Sức khoẻ cán cân thanh toán phụ thuộc vào TỶ LỆ giữa các loại này, không chỉ tổng số. Một nước có thặng dư nhờ tiền nóng mong manh hơn nhiều so với nước thâm hụt nhẹ nhưng được tài trợ bằng FDI.", type: "concept" },
    ],
    signals: [
      { label: "VIX < 15 + DXY đi ngang + chênh lệch lãi suất VND-USD rộng", type: "bull", text: "Môi trường lý tưởng cho dòng vốn vào EM. FII mua ròng, VND được hỗ trợ tự nhiên, SBV có thể mua bổ sung dự trữ." },
      { label: "VIX vọt trên 30 + DXY tăng mạnh", type: "bear", text: "Risk-off toàn cầu, carry unwind. Khối ngoại bán ròng bất kể cơ bản VN. Áp lực tỷ giá. Đây là lúc dự trữ mỏng trở thành vấn đề." },
      { label: "Tín dụng tăng nhanh hơn huy động nhiều quý liên tiếp", type: "bear", text: "Áp lực tỷ giá NỘI SINH đang tích luỹ, độc lập với Fed và DXY. Cơ chế này đã chi phối 2025. Đừng chờ DXY tăng mới lo." },
      { label: "Cơ cấu dòng vốn dịch sang FDI và kiều hối", type: "bull", text: "Cán cân thanh toán bền vững hơn ở cùng mức thặng dư. Giảm rủi ro sudden stop." },
    ],
    vnContext: "Khối ngoại mua/bán ròng: HOSE, HNX hàng ngày. FDI giải ngân: Bộ Tài chính hàng tháng — đọc cột 'vốn thực hiện'. Kiều hối: World Bank, NHNN. Chênh lệch lãi suất VND–USD: so lãi suất tiền gửi 12M VND với Fed Funds. VIX và DXY: theo dõi hàng ngày như chỉ báo dẫn cho FII." },
];


// ══════════════ UI COMPONENTS ══════════════
// Tái cấu trúc điều hướng: bỏ kiểu accordion lồng nhau (Khối > Mục > Mục con
// > tab chi tiết — 4 cấp bấm mở), thay bằng breadcrumb 2 cấp phẳng:
// Tab chính (section) → Tab phụ (subsection) → nội dung chi tiết (vẫn giữ
// nguyên cụm tab Bản chất/Cơ chế/Sai lầm/Tín hiệu/Dữ liệu ở tầng lá, vì đó
// là 1 hàng tab phẳng chứ không phải một lớp accordion nữa).

function TagBadge({ label, color }) {
  return <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.3, padding: "2px 8px", borderRadius: 20, background: color + "15", color, border: `1px solid ${color}35` }}>{label}</span>;
}

// Sai lầm/Tín hiệu/Dữ liệu — trước đây mỗi mục con bọc riêng 1 box màu, nhiều
// box nhỏ chồng lên nhau nhìn rối mắt. Giờ viết plain text, chỉ giữ icon/màu
// chữ để phân biệt loại (bull/bear/neutral...), khung box chung đã có ở
// section cha (xem NumberedSection) nên không cần bọc thêm ở đây.
function SignalItem({ s }) {
  const c = {
    bull: { label: "#15803d", icon: "▲" },
    bear: { label: "#dc2626", icon: "▼" },
    neutral: { label: "#64748b", icon: "■" },
  }[s.type] || { label: "#64748b", icon: "■" };
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 3 }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: c.label, marginTop: 2 }}>{c.icon}</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: c.label, lineHeight: 1.35 }}>{s.label}</span>
      </div>
      <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, paddingLeft: 15 }}>{s.text}</div>
    </div>
  );
}

function PitfallList({ items }) {
  return (
    <div>
      {items.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: "#b45309", marginTop: 2, flexShrink: 0 }}>✕</span>
          <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{p}</span>
        </div>
      ))}
    </div>
  );
}

function DataBox({ text }) {
  return <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7 }}>{text}</div>;
}

// Box đánh số dùng cho SECTION (ví dụ: từng mục con trong 1 tab chính, từng
// chủ thể trong tab Chủ thể) — KHÔNG dùng cho subsection bên trong 1 section
// (Bản chất/Cơ chế/Sai lầm/Tín hiệu/Dữ liệu... — những cái đó chỉ là nhãn
// chữ, không đánh số, không bọc box, xem FlatDetail bên dưới).
function NumberedSection({ n, label, color, children }) {
  return (
    <div style={{ border: `1.5px solid ${color}30`, borderRadius: 12, padding: "14px 15px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: color, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color, lineHeight: 1.3 }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

// Bản chất/Cơ chế/Sai lầm/Tín hiệu/Dữ liệu — trước đây là 1 hàng tab phải bấm
// chuyển qua lại; giờ viết thẳng thành subsection nối tiếp nhau (chỉ có nhãn
// chữ màu, KHÔNG đánh số, KHÔNG bọc box — số + box chỉ dành cho section cha
// bọc ngoài, xem nơi gọi FlatDetail), đọc lướt hết một mạch không cần bấm.
function FlatDetail({ tabs, color }) {
  const list = [
    { id: "def", label: "Bản chất" }, { id: "deep", label: "Cơ chế" }, { id: "pitfalls", label: "Sai lầm" },
    { id: "signals", label: "Tín hiệu" }, { id: "vnContext", label: "Dữ liệu" },
  ].filter(t => tabs[t.id]);
  return (
    <div>
      {list.map((t, i) => (
        <div key={t.id} style={{ marginTop: i > 0 ? 16 : 0 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>{t.label}</div>
          {t.id === "def" && <p style={{ margin: 0, fontSize: 12.5, color: "#374151", lineHeight: 1.75 }}>{tabs.def}</p>}
          {t.id === "deep" && tabs.deep.map((d, i2) => (
            <div key={i2} style={{ marginBottom: 13 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 4, lineHeight: 1.4 }}>{d.title}</div>
              <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.75 }}>{d.body}</div>
            </div>
          ))}
          {t.id === "pitfalls" && <PitfallList items={tabs.pitfalls} />}
          {t.id === "signals" && tabs.signals.map((s, i2) => <SignalItem key={i2} s={s} />)}
          {t.id === "vnContext" && <DataBox text={tabs.vnContext} />}
        </div>
      ))}
    </div>
  );
}

// Nội dung tab "Tỷ giá & Cán cân" — không có tab phụ (subsection), vì bản
// thân nó là 1 khối duy nhất, hiển thị trực tiếp qua 4 tab lá.
// Trước đây "Cơ chế/Sai lầm/Tín hiệu/Dữ liệu" là 1 hàng tab riêng (level 3
// bên trong Tổng quan → Tỷ giá & Cán cân) — giờ viết thẳng thành section
// đánh số nối tiếp nhau, giống hệt cách 6 tab chính (FlatDetail) đã làm.
function ExchangeDetail({ data }) {
  const list = [
    { id: "def", label: "Bản chất" }, { id: "points", label: "Cơ chế" },
    { id: "pitfalls", label: "Sai lầm" }, { id: "signals", label: "Tín hiệu" }, { id: "data", label: "Dữ liệu" },
  ];
  return (
    <div>
      {list.map((t, i) => (
        <div key={t.id} style={{ marginTop: i > 0 ? 16 : 0 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: data.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>{t.label}</div>
          {t.id === "def" && <p style={{ margin: 0, fontSize: 12.5, color: "#374151", lineHeight: 1.75 }}>{data.def}</p>}
          {t.id === "points" && data.points.map((p, j) => {
            const warn = p.title.startsWith("⚠");
            return (
              <div key={j} style={{ marginBottom: 11 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: warn ? "#dc2626" : data.color, marginBottom: 4, lineHeight: 1.4 }}>{p.title}</div>
                <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.75 }}>{p.body}</div>
              </div>
            );
          })}
          {t.id === "pitfalls" && <PitfallList items={data.pitfalls} />}
          {t.id === "signals" && data.signals.map((s, j) => <SignalItem key={j} s={s} />)}
          {t.id === "data" && <DataBox text={data.vnContext} />}
        </div>
      ))}
    </div>
  );
}

// Nội dung 1 "chủ thể" đã chọn ở tab phụ — hiển thị phẳng, không còn bọc
// trong accordion riêng như ActorCard cũ.
// Tên chủ thể giờ là nhãn của NumberedSection bọc ngoài (xem nơi gọi), nên
// ở đây không lặp lại nữa. ĐÁNH ĐỔI CỐT LÕI / CÁCH ĐỌC HÀNH ĐỘNG CỦA HỌ
// trước đây mỗi cái bọc 1 box màu riêng — giờ là subsection chữ thường,
// không bọc box, đồng bộ với CÔNG CỤ ở trên.
function ActorDetail({ a }) {
  return (
    <div>
      <div style={{ fontSize: 12.5, color: "#64748b", marginBottom: 13, lineHeight: 1.55 }}>{a.goal}</div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", marginBottom: 7 }}>CÔNG CỤ</div>
      {a.tools.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} />
          <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.6 }}>{t}</div>
        </div>
      ))}
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", marginTop: 14, marginBottom: 7 }}>⚡ ĐÁNH ĐỔI CỐT LÕI</div>
      <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.65 }}>{a.tension}</div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", marginTop: 14, marginBottom: 7 }}>🔍 CÁCH ĐỌC HÀNH ĐỘNG CỦA HỌ</div>
      <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.65 }}>{a.tell}</div>
    </div>
  );
}

// Nội dung 1 chuyên đề nâng cao đã chọn — hiển thị phẳng, không còn bọc
// trong accordion riêng như AdvancedSection cũ. Trước đây "Cơ chế/Tín hiệu/
// Dữ liệu" là 1 hàng tab riêng (khiến tổng chiều sâu điều hướng thành 4 cấp:
// Tổng quan → Chuyên đề nâng cao → [chuyên đề] → tab này) — giờ gộp lại
// thành các section nối tiếp, mỗi mục đánh dấu bằng tiêu đề màu/chữ đậm.
function AdvancedDetail({ topic }) {
  const ts = {
    concept: { bg: "#eff6ff", border: "#93c5fd", label: "#1d4ed8", icon: "📐" },
    warning: { bg: "#fef2f2", border: "#fca5a5", label: "#dc2626", icon: "⚠️" },
    signal: { bg: "#f0fdf4", border: "#86efac", label: "#15803d", icon: "📡" },
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 12 }}>
        <span style={{ fontSize: 19, lineHeight: 1.2 }}>{topic.icon}</span>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: topic.color, lineHeight: 1.3 }}>{topic.title}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, lineHeight: 1.45 }}>{topic.subtitle}</div>
        </div>
      </div>

      <div style={{ fontSize: 10.5, fontWeight: 700, color: topic.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>Tổng quan</div>
      <p style={{ margin: 0, fontSize: 12.5, color: "#374151", lineHeight: 1.75 }}>{topic.overview}</p>

      <div style={{ fontSize: 10.5, fontWeight: 700, color: topic.color, textTransform: "uppercase", letterSpacing: 1, margin: "16px 0 7px" }}>Cơ chế</div>
      {topic.sections.map((s, i) => {
        const st = ts[s.type] || ts.concept;
        return (
          <div key={i} style={{ marginBottom: 11 }}>
            <div style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ fontSize: 12, marginTop: 1 }}>{st.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: st.label, lineHeight: 1.45 }}>{s.title}</span>
            </div>
            <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.75, paddingLeft: 19 }}>{s.body}</div>
          </div>
        );
      })}

      <div style={{ fontSize: 10.5, fontWeight: 700, color: topic.color, textTransform: "uppercase", letterSpacing: 1, margin: "16px 0 7px" }}>Tín hiệu</div>
      {topic.signals.map((s, i) => <SignalItem key={i} s={s} />)}

      <div style={{ fontSize: 10.5, fontWeight: 700, color: topic.color, textTransform: "uppercase", letterSpacing: 1, margin: "16px 0 7px" }}>Dữ liệu</div>
      <DataBox text={topic.vnContext} />
    </div>
  );
}

// Hàng breadcrumb dùng chung cho cả cấp 1 (tab chính) và cấp 2 (tab phụ).
function Breadcrumb({ items, activeId, onSelect, size = "md", ghost = false }) {
  const sm = size === "sm";
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: sm ? 14 : 16 }}>
      {items.map(it => {
        const active = it.id === activeId;
        return (
          <button key={it.id} onClick={() => onSelect(it.id)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: ghost ? "6px 13px" : sm ? "6px 12px" : "8px 15px",
            // Level 1 (size mặc định) bo tròn hết cỡ dạng viên thuốc; level 2
            // (size="sm") bo góc vuông vắn hơn hẳn — phân biệt 2 cấp bằng mắt
            // ngay cả khi không nhìn màu/độ đậm.
            borderRadius: sm ? 8 : 20, cursor: "pointer",
            // fontWeight CỐ ĐỊNH (không đổi theo active) — chữ đậm hơn chiếm nhiều
            // bề ngang hơn, nếu đổi theo trạng thái sẽ làm nút tự đổi kích thước
            // và đẩy các nút bên cạnh dịch chuyển mỗi lần bấm, nhìn như bị "nháy".
            fontSize: sm ? 11.5 : ghost ? 12 : 12.5, fontWeight: 600,
            background: active ? it.color : (ghost ? "transparent" : "#fff"),
            color: active ? "#fff" : (ghost ? "#94a3b8" : "#475569"),
            border: `1px solid ${active ? it.color : "#e2e8f0"}`,
            transition: "background .15s, color .15s, border-color .15s", whiteSpace: "nowrap",
          }}>
            {it.icon && <span>{it.icon}</span>}{it.label}
          </button>
        );
      })}
    </div>
  );
}

// ══════════════ ĐIỀU HƯỚNG CHÍNH — 1 HÀNG TAB CHÍNH, TỐI ĐA 3 CẤP ══════════════
// Mỗi "tab chính" trước đây là 1 Khối/Mục phải bấm mở accordion mới thấy;
// giờ là 1 nút bấm chọn thẳng. "Mục con" trước đây phải bấm mở thêm 1 lớp
// accordion (ChildPanel) nữa mới đọc được; giờ là "tab phụ" — chọn thẳng,
// nội dung hiện ngay bên dưới.
// "Tổng quan" gộp chung: Ba luận điểm cốt lõi, Tỷ giá & Cán cân, Chủ thể,
// Chuyên đề nâng cao, Thay đổi quan trọng 2025–2026, Về số liệu — tất cả
// từng là box/tab rời rạc, giờ gom vào 1 tab duy nhất, đứng chung 1 hàng
// breadcrumb với 6 tab chính còn lại, giữ sticky ở đầu trang.
// Đúng 2 cấp tab: TOP_TABS (cấp 1) → subs của từng tab (cấp 2, xem subListOf).
// Dưới cấp 2 không còn tab nào nữa — chỉ còn subsection chữ thường (FlatDetail)
// hoặc section đánh số xếp chồng (Chủ thể trong Tổng quan).
// "Chuyên đề nâng cao" trước đây nằm trong Tổng quan, giờ tách thành 1 tab
// cấp 1 riêng, đứng cuối hàng, viết hoa toàn bộ để phân biệt với 6 tab gốc.
// Bảng màu mượn từ vietnam_industry_primers.jsx (tông trầm, sang trọng hơn
// hẳn màu sáng/rực mặc định) — mỗi tab 1 màu riêng, không trùng.
const TOP_TABS = [
  { id: "overview", label: "Tổng quan", color: "#1E5AA8", kind: "overview" },
  { id: "demand", label: "Tổng cầu", color: "#B34040", kind: "section", section: DATA.realEconomy.sections[0] },
  { id: "price", label: "Giá cả & Lạm phát", color: "#D4820A", kind: "section", section: DATA.realEconomy.sections[1] },
  { id: "supply", label: "Cung & Sản xuất", color: "#1A7A5E", kind: "section", section: DATA.realEconomy.sections[2] },
  { id: "credit_creation", label: "Tạo tiền tín dụng", color: "#B87000", kind: "section", section: DATA.financial.sections[0] },
  { id: "rates", label: "Lãi suất & Truyền dẫn", color: "#A0522D", kind: "section", section: DATA.financial.sections[1] },
  { id: "plumbing", label: "Money Plumbing", color: "#5B3FA0", kind: "section", section: DATA.financial.sections[2] },
  { id: "advanced", label: "CHUYÊN ĐỀ NÂNG CAO", color: "#0E7C86", kind: "advanced" },
];
// "Ba luận điểm cốt lõi" và "Thay đổi quan trọng 2025–2026" trước đây luôn
// hiện cùng lúc trên mọi tab phụ — giờ gộp chung 1 tab phụ, chỉ hiện khi
// chọn đúng tab phụ đó, không lẫn vào "Tỷ giá & Cán cân" / "Chủ thể".
const OVERVIEW_SUBS = [
  { id: "thesis", label: "Ba luận điểm cốt lõi & Thay đổi 2025–2026", color: "#1E5AA8" },
  { id: "exchange", label: "Tỷ giá & Cán cân", color: DATA.exchange.color },
  { id: "actors", label: "Chủ thể", color: "#0E7C86" },
];

// Tab con (cấp 2) luôn dùng ĐÚNG màu của tab cha (cấp 1) — bỏ qua màu riêng
// (nếu có) trong dữ liệu, để cả cụm tab cha-con nhìn liền một khối màu.
function subListOf(tab) {
  if (tab.kind === "section") return tab.section.children.map(c => ({ id: c.id, label: c.label, color: tab.color }));
  if (tab.kind === "overview") return OVERVIEW_SUBS.map(s => ({ ...s, color: tab.color }));
  if (tab.kind === "advanced") return ADVANCED_TOPICS.map(t => ({ id: t.id, label: t.title.split(" — ")[0], color: tab.color, icon: t.icon }));
  return null;
}

// ══════════════ MAIN COMPONENT ══════════════

export default function MacroVNFrameworkExpert() {
  const [topId, setTopId] = useState("demand");
  const [subId, setSubId] = useState(DATA.realEconomy.sections[0].children[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const top = TOP_TABS.find(t => t.id === topId);
  const subs = subListOf(top);

  const selectTop = (id) => {
    setTopId(id);
    const t = TOP_TABS.find(x => x.id === id);
    if (t.kind === "overview") {
      setSubId("thesis");
    } else {
      const list = subListOf(t);
      setSubId(list ? list[0].id : null);
    }
    window.__scrollArticleToTop?.();
  };
  const selectSub = (id) => {
    setSubId(id);
    window.__scrollArticleToTop?.();
  };

  const UPDATES = [
    { t: "Nâng hạng FTSE hiệu lực 21/9/2026", d: "Công bố 7/10/2025, xác nhận sau rà soát tháng 3/2026. Đưa vào rổ theo nhiều giai đoạn tới 2027. Danh sách cổ phiếu công bố 21/8/2026.", c: "#16a34a" },
    { t: "Trần vốn ngắn hạn cho vay trung–dài hạn: 30% → 40%", d: "Thông tư 25 (22/6/2026). Nới NIM ngân hàng, đồng thời tăng rủi ro chênh lệch kỳ hạn toàn hệ thống.", c: "#f59e0b" },
    { t: "20% tiền gửi Kho bạc được tính vào LDR", d: "Thông tư 08/2026/TT-NHNN (5/2026). Nới lỏng thanh khoản mà không cần hạ lãi suất.", c: "#f59e0b" },
    { t: "Room tín dụng đang được thay bằng Basel III", d: "Thông tư 14/2025/TT-NHNN đưa bộ đệm vốn phản chu kỳ và D-SIB. Nhưng SBV vẫn kiểm soát định hướng qua công văn.", c: "#7c3aed" },
    { t: "Dự trữ ngoại hối ~87,6 tỷ USD (18/6/2026)", d: "Nhưng chỉ ~2,2–2,5 tháng nhập khẩu — DƯỚI ngưỡng IMF. Tài liệu cũ ghi 3,5–4 tháng là sai.", c: "#dc2626" },
    { t: "Công bố dự trữ theo chuẩn IMF từ 2027", d: "Cam kết trong tuyên bố chung SBV – Bộ Tài chính Hoa Kỳ. Sẽ lộ cả vị thế bán kỳ hạn.", c: "#0891b2" },
  ];

  const CORE = [
    { n: "1", t: "Ngân hàng TẠO tiền khi cho vay", d: "không phải trung gian tiền gửi. Ràng buộc thật là vốn (CAR) và cầu vay, không phải dự trữ bắt buộc." },
    { n: "2", t: "TỶ GIÁ trói buộc SBV hơn lạm phát", d: "dự trữ chỉ ~2,2–2,5 tháng nhập khẩu, dưới ngưỡng IMF. Muốn dự báo SBV, hãy nhìn tỷ giá trước CPI." },
    { n: "3", t: "Giá TẠO RA thực tại, không chỉ phản ánh", d: "vòng phản hồi tài sản thế chấp làm hệ thống trông an toàn nhất đúng lúc nó rủi ro nhất." },
  ];

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", background: "#f1f5f9", padding: "18px 13px 40px", color: "#1e293b" }}>

      <div style={{ background: "#fff", borderRadius: 16, padding: "16px 18px", marginBottom: 12, border: "1.5px solid #e2e8f0" }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 3, color: "#94a3b8", textTransform: "uppercase" }}>Macro Framework · Vietnam · Expert Edition</div>
        <h1 style={{ fontSize: 20, fontWeight: 900, margin: "5px 0 3px", color: "#0f172a", lineHeight: 1.2 }}>Khung tư duy vĩ mô Việt Nam</h1>
        <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.5 }}>Mỗi mục có 5 lớp: <strong>Bản chất → Cơ chế → Sai lầm → Tín hiệu → Dữ liệu</strong>. Tab "Sai lầm" là nơi chứa giá trị lớn nhất.</p>
      </div>

      <style>{`
        /* 8 tab chính wrap thành nhiều hàng trên màn hình hẹp — dưới 768px
           thay bằng 1 thanh "đang xem" gọn + drawer trượt từ trái. */
        .mvf-mobile-trigger, .mvf-mobile-backdrop, .mvf-mobile-drawer { display: none; }
        @media (max-width: 767px) {
          .mvf-desktop-top-nav { display: none !important; }
          .mvf-mobile-trigger {
            display: flex; width: 100%; align-items: center; gap: 9px;
            cursor: pointer; text-align: left; border: none;
            padding: 6px 0 8px;
            position: sticky; top: 0; z-index: 21; background: #f1f5f9;
          }
          .mvf-mt-box { flex: 1; min-width: 0; display: flex; align-items: center; gap: 9px; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 8px 11px; background: #fff; }
          .mvf-mt-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
          .mvf-mt-label { flex: 1; min-width: 0; font-size: 12.5px; font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .mvf-mt-chev { color: #94a3b8; flex-shrink: 0; transition: transform .2s ease; }
          .mvf-mobile-trigger.open .mvf-mt-chev { transform: rotate(180deg); }
          .mvf-mobile-backdrop { display: block; position: fixed; inset: 0; background: rgba(15,23,42,.42); z-index: 198; opacity: 0; pointer-events: none; transition: opacity .2s ease; }
          .mvf-mobile-backdrop.show { opacity: 1; pointer-events: auto; }
          .mvf-mobile-drawer { display: block; position: fixed; top: 0; bottom: 0; left: 0; width: 82%; max-width: 300px; background: #fff; border-right: 1.5px solid #e2e8f0; z-index: 199; overflow-y: auto; transform: translateX(-100%); transition: transform .25s cubic-bezier(.32,.72,0,1); }
          .mvf-mobile-drawer.show { transform: translateX(0); }
          .mvf-md-head { padding: 14px; border-bottom: 1.5px solid #e2e8f0; display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
          .mvf-md-t1 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; }
          .mvf-md-t2 { font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 3px; }
          .mvf-md-close { width: 26px; height: 26px; border-radius: 7px; border: 1.5px solid #e2e8f0; background: #f1f5f9; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; flex-shrink: 0; }
          .mvf-md-item { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: transparent; border: none; border-left: 3px solid transparent; cursor: pointer; text-align: left; }
        }
      `}</style>

      {/* Mobile-only: thanh "đang xem" gọn + drawer trượt — đặt NGOÀI khối
          breadcrumb sticky (chỉ cao ~1 hàng) để position:sticky bám theo
          toàn bộ chiều cao trang, không bị "hết khung chứa" rồi tuột theo
          khi cuộn qua khỏi khối breadcrumb nhỏ đó. */}
      <button className={"mvf-mobile-trigger" + (mobileNavOpen ? " open" : "")} onClick={() => setMobileNavOpen((v) => !v)}>
        <div className="mvf-mt-box">
          <span className="mvf-mt-dot" style={{ background: top.color }} />
          <span className="mvf-mt-label">{top.label}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mvf-mt-chev"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </button>
      <div className={"mvf-mobile-backdrop" + (mobileNavOpen ? " show" : "")} onClick={() => setMobileNavOpen(false)} />
      <div className={"mvf-mobile-drawer" + (mobileNavOpen ? " show" : "")}>
        <div className="mvf-md-head">
          <div>
            <div className="mvf-md-t1">{TOP_TABS.length} tab</div>
            <div className="mvf-md-t2">Chọn mục để xem</div>
          </div>
          <button className="mvf-md-close" onClick={() => setMobileNavOpen(false)} aria-label="Đóng">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div>
          {TOP_TABS.map((t) => (
            <button key={t.id} className="mvf-md-item" style={{ borderLeftColor: topId === t.id ? t.color : "transparent" }} onClick={() => { selectTop(t.id); setMobileNavOpen(false); }}>
              <span className="mvf-mt-dot" style={{ background: t.color }} />
              <span style={{ fontSize: 12.5, fontWeight: topId === t.id ? 700 : 500, color: topId === t.id ? t.color : "#0f172a" }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB CHÍNH (cấp 1) + TAB PHỤ (cấp 2) — cả 2 hàng đứng ngay trên nền trang,
          KHÔNG bọc trong box nội dung, giống cách ChunkAtlas_EN.jsx đang làm. */}
      <div className="mobile-static" style={{ position: "sticky", top: 0, zIndex: 20, background: "#f1f5f9", paddingTop: 4, paddingBottom: 4 }}>
        <div className="mvf-desktop-top-nav">
          <Breadcrumb items={TOP_TABS} activeId={topId} onSelect={selectTop} />
        </div>

        {subs && subs.length > 1 && (
          <Breadcrumb items={subs} activeId={subId} onSelect={selectSub} size="sm" />
        )}
      </div>

      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: "16px 16px 14px" }}>
        {top.kind === "section" && (() => {
          const child = top.section.children.find(c => c.id === subId) || top.section.children[0];
          return (
            <div>
              <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "#475569", lineHeight: 1.75 }}>{top.section.def}</p>
              {top.section.tag && <div style={{ marginBottom: 14 }}><TagBadge label={top.section.tag} color={top.section.tagColor || top.color} /></div>}
              <FlatDetail tabs={child.tabs} color={top.color} />
            </div>
          );
        })()}

        {top.kind === "overview" && (
          <div>
            {subId === "thesis" && (
              <div>
                {CORE.map((x, i) => (
                  <div key={x.n} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 14 : 0 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 800, color: "#fbbf24", flexShrink: 0, marginTop: 1 }}>{x.n}</div>
                    <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.65 }}><strong style={{ color: "#0f172a" }}>{x.t}</strong> — {x.d}</div>
                  </div>
                ))}

                <div style={{ border: "1.5px solid #86efac", borderRadius: 12, overflow: "hidden", background: "#fff", marginTop: 20 }}>
                  <div style={{ padding: "11px 14px", background: "#f0fdf4" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: "#15803d" }}>📌 Thay đổi quan trọng 2025–2026</div>
                    <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 2 }}>Những thứ làm lỗi thời phần lớn tài liệu macro VN hiện có</div>
                  </div>
                  <div style={{ padding: "11px 14px 8px", borderTop: "1px solid #86efac" }}>
                    {UPDATES.map((u, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "7px 0", borderBottom: i < UPDATES.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: u.c, marginTop: 6, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1e293b", lineHeight: 1.4 }}>{u.t}</div>
                          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, lineHeight: 1.55 }}>{u.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {subId === "exchange" && <ExchangeDetail data={{ ...DATA.exchange, color: top.color }} />}

            {/* 5 chủ thể — mỗi chủ thể là 1 section đánh số riêng, không bọc tab
                vì mỗi hồ sơ khá ngắn, đọc lướt hết cả 5 tiện hơn phải bấm. */}
            {subId === "actors" && ACTORS.map((a, i) => (
              <div key={a.name} style={{ marginTop: i > 0 ? 14 : 0 }}>
                <NumberedSection n={i + 1} label={a.name} color={a.color}>
                  <ActorDetail a={a} />
                </NumberedSection>
              </div>
            ))}
          </div>
        )}

        {top.kind === "advanced" && (() => {
          const topic = ADVANCED_TOPICS.find(t => t.id === subId) || ADVANCED_TOPICS[0];
          return <AdvancedDetail topic={{ ...topic, color: top.color }} />;
        })()}
      </div>

      <div style={{ textAlign: "center", fontSize: 10, color: "#94a3b8", lineHeight: 1.6, marginTop: 14 }}>
        Map 1 · Cơ chế vận hành macro VN<br />Dùng kèm Map 2 (chu kỳ) và công cụ review định kỳ
      </div>
    </div>
  );
}
