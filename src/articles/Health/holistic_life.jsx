import React, { useState, useEffect } from "react";
import { getSubTabFromUrl, syncSubTabToUrl } from "../../utils/subTabUrl";
import {
  Dumbbell,
  Brain,
  Fingerprint,
  Briefcase,
  Home,
  Landmark,
  Sparkles,
  Compass,
  ListChecks,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
--------------------------------------------------------------- */
const C = {
  bg: "#FAF9F6",
  panel: "#FFFFFF",
  panelAlt: "#F5F3EE",
  line: "#E4E1D8",
  ink: "#23231E",
  inkDim: "#6B6558",
  gold: "#B4863C",
  goldDim: "#8A6E3A",
  teal: "#2E8A80",
  violet: "#7C6BB0",
  green: "#2E9E5B",
  orange: "#C97F1F",
  red: "#C94040",
};
const serif = "'Source Serif 4', Georgia, serif";
const mono = "'IBM Plex Mono', ui-monospace, monospace";

function EvidenceBar({ level }) {
  const map = {
    strong: { fill: 3, color: C.green, label: "Bằng chứng mạnh" },
    moderate: { fill: 2, color: C.orange, label: "Bằng chứng vừa" },
    contested: { fill: 1, color: C.red, label: "Còn tranh cãi" },
  };
  const cfg = map[level] || map.moderate;
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="flex gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 5, height: 14, borderRadius: 1, background: i < cfg.fill ? cfg.color : C.line }} />
        ))}
      </div>
      <span style={{ fontFamily: mono, color: cfg.color, fontSize: 10, letterSpacing: "0.04em" }} className="uppercase whitespace-nowrap">
        {cfg.label}
      </span>
    </div>
  );
}

function LeverageBadge({ level }) {
  const color = level === "high" ? C.green : level === "moderate" ? C.orange : C.red;
  const label = level === "high" ? "Cao" : level === "moderate" ? "Vừa" : "Thấp";
  return (
    <span style={{ fontFamily: mono, fontSize: 9.5, color, border: `1px solid ${color}`, borderRadius: 3, padding: "1px 5px" }} className="uppercase shrink-0">
      {label}
    </span>
  );
}
/* ---------------------------------------------------------------
   SCHEMA note:
   - expertNote: tầng cơ chế/tinh vi thêm ở mức chuyên gia
   - application: mảng {domain, text} phủ nhiều khía cạnh đời sống
--------------------------------------------------------------- */
const PILLARS = [
  {
    id: "physical",
    num: "01",
    icon: Dumbbell,
    title: "Thể chất",
    subtitle: "Ăn, ngủ, vận động, thiên nhiên",
    groups: [
      {
        label: "Vận động",
        sections: [
          {
            heading: "mTOR/AMPK, interference effect & concurrent training",
            evidence: "strong",
            mechanism: "Kháng lực kích hoạt mTORC1 (tín hiệu cơ học + leucine) → tổng hợp protein cơ. Cardio kích hoạt AMPK → sinh mitochondria qua PGC-1α. AMPK hoạt hóa mạnh ức chế mTORC1 — cơ sở phân tử của giao thoa luyện tập.",
            expertNote: "Mức độ giao thoa phụ thuộc modality (đạp xe giao thoa ít hơn chạy vì ít tổn thương cơ ly tâm), cường độ (giao thoa từ cardio cường độ cao > Zone 2), và khoảng cách thời gian. AMPK còn hoạt hóa SIRT1 và điều biến autophagy — nên một liều 'stress chuyển hóa' vừa phải thực ra hỗ trợ chất lượng ty thể (mitophagy) chứ không thuần đối kháng cơ.",
            theory: "Hickson (1980) mô tả ở cấp hiệu suất; mô hình phân tử AMPK–mTOR làm rõ sau đó (Baar, Coffey & Hawley).",
            controversy: "Ngành fitness phóng đại 'mind-muscle connection' và các split phức tạp. Với người tập nghiệp dư (không phải VĐV elite), giao thoa thực tế nhỏ — tổng volume và độ đều đặn vẫn quyết định phần lớn kết quả.",
            application: [
              { domain: "Lịch tập", text: "Nếu ghép chung buổi: kháng lực trước, cardio sau; lý tưởng tách ≥6h hoặc khác ngày. Mẫu tuần cho lịch BA bận: T2/T5 kháng lực toàn thân, T3/T6 Zone 2, ≤1 buổi HIIT." },
              { domain: "Đo lường", text: "Đánh giá tiến bộ bằng log tải (kg×reps×sets) và tốc độ hồi phục nhịp tim, không bằng cảm giác 'đã mệt'." },
              { domain: "Du lịch/bận", text: "Tuần công tác: 2 buổi full-body 30 phút (bài compound) giữ được phần lớn khối cơ — 'minimum effective dose' quan trọng hơn hoàn hảo." },
              { domain: "Lão hóa khỏe mạnh", text: "Đặt mục tiêu dài hạn là 'healthspan': sức mạnh nắm tay và khối cơ đùi là hai chỉ báo độc lập cho độc lập chức năng khi già." },
            ],
          },
          {
            heading: "VO2max, Zone 2 & polarized training",
            evidence: "strong",
            mechanism: "VO2max phản ánh khả năng vận chuyển và sử dụng oxy tối đa. Yếu tố GIỚI HẠN chính ở đa số người là trung tâm — cung lượng tim/thể tích tống máu và khả năng vận chuyển oxy — hơn là mật độ mitochondria ngoại biên (yếu tố ngoại biên giới hạn rõ hơn ở vận động viên đã tối ưu tim mạch). VO2max/thể lực tim-hô hấp là MỘT TRONG những chỉ số dự báo tử vong mọi nguyên nhân mạnh nhất trong dịch tễ học dự phòng — nhưng bằng chứng chủ yếu là QUAN SÁT (người khỏe hơn khác người kém thể lực ở nhiều mặt), nên độ mạnh của liên hệ không đồng nghĩa toàn bộ là nhân quả.",
            expertNote: "Zone 2 (tối ưu sinh mitochondria và mật độ mao mạch mà không tích mệt mỏi thần kinh trung ương) định nghĩa sinh lý chính xác là cường độ ngay dưới ngưỡng lactate 1 (~2mmol/L) — nơi cơ thể còn oxy hóa mỡ chủ đạo và lactate được thanh thải kịp. Mô hình 'polarized' (80% Zone 2, 20% cường độ rất cao, tránh vùng giữa 'no man's land') vượt trội mô hình threshold cho cải thiện VO2max ở cả người nghiệp dư lẫn elite (Seiler). VO2max tăng chủ yếu qua thể tích tống máu (thích nghi trung tâm) ở giai đoạn đầu, rồi thích nghi ngoại biên (mitochondria) sau — nhất quán với việc trung tâm là yếu tố giới hạn chính.",
            theory: "Seiler (polarized training); San-Millán (chuyển hóa Zone 2 và độ linh hoạt chuyển hóa).",
            controversy: "HIIT tạo cảm giác 'hiệu quả/tiết kiệm thời gian' hơn nhưng không thay thế nền Zone 2; lạm dụng vùng cường độ trung bình tạo mệt mỏi mà lợi ích thấp.",
            application: [
              { domain: "Xác định vùng", text: "Talk test: Zone 2 là mức còn nói trọn câu nhưng hơi hụt hơi. Nếu có đo lactate/HR ngưỡng thì chính xác hơn." },
              { domain: "Tận dụng nền chạy bộ", text: "Chuyển ~80% km sang chạy chậm Zone 2, giữ tốc độ cao cho 1 buổi interval/tuần — nghịch lý: chạy chậm nhiều hơn để chạy nhanh hơn." },
              { domain: "Đo tiến bộ", text: "Cùng pace Zone 2, theo dõi HR giảm dần qua tuần = mitochondria cải thiện; đây là phản hồi khách quan rẻ tiền." },
              { domain: "Nhận thức/công việc", text: "Zone 2 buổi sáng tăng BDNF và tưới máu não — dùng như 'chất tăng cường nhận thức' trước ngày làm việc phân tích nặng." },
            ],
          },
          {
            heading: "Hormesis, mitohormesis & tín hiệu stress có lợi",
            evidence: "moderate",
            mechanism: "ROS tạm thời từ vận động kích hoạt Nrf2 → cơ thể tự tăng hệ chống oxy hóa nội sinh (mitohormesis). Đây là ví dụ của hormesis: liều stress thấp kích hoạt thích nghi vượt mức baseline.",
            expertNote: "Nguyên lý hormesis mở rộng ra nhiều stressor: nhiệt (sauna — protein sốc nhiệt HSP, bằng chứng quan sát tốt cho tim mạch ở dữ liệu Phần Lan), lạnh (kích hoạt mỡ nâu, bằng chứng cho tuyên bố phục hồi/tâm trạng còn yếu và dễ bị thổi phồng), nhịn ăn (autophagy). Điểm cốt lõi expert: hormesis là đường cong chữ U ngược — liều thấp có lợi, liều cao gây hại; nhiều xu hướng wellness bỏ qua vế thứ hai.",
            theory: "Ristow (mitohormesis); Mattson (hormesis thần kinh và nhịn ăn).",
            controversy: "Bổ sung chất chống oxy hóa liều cao quanh giờ tập chặn tín hiệu thích nghi. Tắm lạnh ngay sau kháng lực có thể giảm hypertrophy (chặn tín hiệu viêm cần thiết). Nhiều tuyên bố về tắm lạnh vượt xa bằng chứng.",
            application: [
              { domain: "Bổ sung", text: "Không uống vitamin C/E liều cao trong ±3h quanh tập; lấy chất chống oxy hóa từ thực phẩm ở bữa xa giờ tập." },
              { domain: "Phục hồi", text: "Nếu mục tiêu là hypertrophy, tránh tắm lạnh ngay sau buổi kháng lực; để dành tắm lạnh cho ngày nghỉ hoặc sau cardio." },
              { domain: "Tim mạch (thận trọng)", text: "Sauna đều đặn có dữ liệu quan sát tốt cho tim mạch; xem như bổ sung dễ chịu, không phải thuốc — và tránh nếu có chống chỉ định." },
              { domain: "Tư duy chung", text: "Áp nguyên lý hormesis chữ-U-ngược vào mọi 'stressor tốt' (tập, nhịn, học khó): liều vừa đủ kích thích thích nghi, quá liều gây tổn hại." },
            ],
          },
          {
            heading: "Mật độ xương, Wolff's Law & sức mạnh suốt đời",
            evidence: "strong",
            mechanism: "Xương tái cấu trúc theo tải cơ học qua osteocyte; lực tải/va chạm kích hoạt osteoblast. Cardio không chịu tải (bơi, đạp xe) tạo kích thích xương rất hạn chế.",
            expertNote: "Đỉnh khối lượng xương đạt quanh 25–30 tuổi; sau đó là bài toán giảm thiểu mất mát. Kích thích xương hiệu quả cần tải LỚN và tốc độ đặt tải NHANH (impact + tải nặng), không phải lặp lại nhẹ nhàng nhiều lần. Với phụ nữ, sụt estrogen quanh mãn kinh gây mất xương nhanh — 'ngân hàng xương' xây ở tuổi 30 quyết định khoảng cách tới ngưỡng gãy xương hàng chục năm sau. Cơ và xương giao tiếp nội tiết (myokine–osteokine), nên tập cơ và xương củng cố lẫn nhau.",
            theory: "Wolff's Law; nghiên cứu về đỉnh khối xương và loãng xương sau mãn kinh.",
            controversy: "Chạy bộ tạo va chạm vừa; kháng lực tải nặng tăng dần và các bài nhảy/plyometric nhắm mật độ xương trực tiếp hơn.",
            application: [
              { domain: "Chọn bài tập", text: "Ưu tiên tải trục dọc: squat, deadlift, overhead press, lunge — nhắm cột sống và cổ xương đùi (vị trí gãy nguy hiểm nhất)." },
              { domain: "Cửa sổ vàng (nữ ~30)", text: "Xem 5–10 năm tới là giai đoạn xây 'ngân hàng xương' trước khi đường cong đi xuống; tăng tải dần có kế hoạch." },
              { domain: "Baseline", text: "Cân nhắc đo DEXA một lần làm mốc; tái đo sau vài năm để thấy quỹ đạo thay vì đoán." },
              { domain: "Phòng ngã dài hạn", text: "Kèm luyện thăng bằng (đứng một chân, nhảy nhẹ) — gãy xương do ngã là tương tác của mật độ xương yếu VÀ thăng bằng kém." },
            ],
          },
        ],
      },
      {
        label: "Dinh dưỡng",
        sections: [
          {
            heading: "Viêm mạn tính, kháng insulin & linh hoạt chuyển hóa",
            evidence: "strong",
            mechanism: "Mỡ nội tạng tiết cytokine viêm (TNF-α, IL-6) can thiệp tín hiệu insulin ở cấp thụ thể — kháng insulin xảy ra TRƯỚC khi đường huyết đói tăng. Protein Leverage: cơ thể điều chỉnh tổng lượng ăn để đạt đủ protein tuyệt đối.",
            expertNote: "Khái niệm chuyên gia: 'metabolic flexibility' — khả năng chuyển đổi linh hoạt giữa đốt mỡ và đốt glucose tùy trạng thái. Người kháng insulin mất tính linh hoạt này (kẹt ở đốt glucose, khó huy động mỡ). Zone 2 cải thiện flexibility trực tiếp. Kiểu hình TOFI (gầy ngoài, mỡ tạng trong) phổ biến ở người châu Á khiến BMI bình thường vẫn có thể kháng insulin — cần nhìn vòng eo/tỷ lệ eo-hông và HOMA-IR, không chỉ cân nặng.",
            theory: "Simpson & Raubenheimer (protein leverage); Kelley (metabolic flexibility).",
            controversy: "IF: thử nghiệm isocaloric cho thấy KHÔNG lợi thế chuyển hóa vượt trội nếu tổng calo/protein bằng nhau — lợi ích chủ yếu là hành vi.",
            application: [
              { domain: "Cấu trúc bữa ăn", text: "Neo mỗi bữa quanh nguồn đạm rõ ràng trước rồi thêm phần còn lại — chống 'ăn loãng đạm' gây ăn quá nhiều." },
              { domain: "Ẩm thực Việt", text: "Cân lại tỷ lệ đĩa: tăng đạm tương đối, ăn rau trước tinh bột (thứ tự ăn ảnh hưởng đường huyết sau ăn), không cần bỏ cơm/bún." },
              { domain: "Linh hoạt chuyển hóa", text: "Kết hợp Zone 2 + đủ đạm + ngủ đủ để phục hồi metabolic flexibility, thay vì chỉ đếm calo." },
              { domain: "Theo dõi cá nhân", text: "Nếu tò mò, thử CGM (đo đường huyết liên tục) một đợt ngắn để thấy thực phẩm nào làm đường huyết mình vọt — phản ứng đường huyết mang tính cá thể cao." },
            ],
          },
          {
            heading: "Anabolic resistance, phân bổ protein & leucine threshold",
            evidence: "strong",
            mechanism: "Cơ có 'ngưỡng leucine' để kích hoạt tối đa tổng hợp protein cơ (MPS) mỗi bữa. Anabolic resistance — cần ngưỡng đạm/bữa CAO hơn cho cùng đáp ứng — rõ rệt ở người LỚN TUỔI (~0.4g/kg/bữa); ở người trẻ khỏe (~30 tuổi) ngưỡng thấp hơn, khoảng ~0.24–0.4g/kg/bữa. Đây là lý do phân bổ đạm đều các bữa (không dồn) hữu ích, và càng quan trọng theo tuổi.",
            expertNote: "MPS có 'refractory period' — sau khi kích hoạt bởi một liều đạm, cơ tạm 'trơ' vài giờ; nên rải đều 3–4 liều cách nhau ~3–4h tối ưu hơn dồn. Loại đạm quan trọng: whey (giàu leucine, hấp thu nhanh) kích hoạt MPS mạnh hơn đạm thực vật cùng lượng — người ăn thực vật cần tổng lượng cao hơn và đa dạng nguồn để đủ axit amin thiết yếu. Liều đạm trước ngủ (casein) hỗ trợ MPS ban đêm.",
            theory: "Phillips và cộng sự (ngưỡng leucine, phân bổ protein); nghiên cứu muscle full effect.",
            controversy: "Tranh luận tổng đạm/ngày vs phân bổ đều; phân bổ đều được ủng hộ rộng hơn cho duy trì cơ dài hạn, đặc biệt khi lớn tuổi.",
            application: [
              { domain: "Ví dụ cụ thể ~55kg", text: "Nhắm ~22g đạm mỗi bữa chính × 3 bữa, thay vì dồn phần lớn vào bữa tối." },
              { domain: "Bữa sáng", text: "Bữa sáng kiểu Việt thường thiếu đạm nhất — thêm trứng/sữa chua Hy Lạp/đậu để đạt ngưỡng ngay từ đầu ngày." },
              { domain: "Ăn thực vật", text: "Nếu giảm thịt: tăng tổng đạm, phối hợp nguồn (đậu + ngũ cốc) để đủ axit amin thiết yếu, cân nhắc bổ sung leucine/whey nếu tập nặng." },
              { domain: "Quanh giấc ngủ", text: "Một phần đạm chậm (sữa chua/casein) trước ngủ hỗ trợ phục hồi cơ ban đêm nếu tập buổi tối." },
            ],
          },
          {
            heading: "Thực phẩm nguyên bản vs siêu chế biến (UPF) — tách tín hiệu khỏi marketing",
            evidence: "moderate",
            mechanism: "Thực phẩm siêu chế biến (ultra-processed, phân loại NOVA) — công thức công nghiệp nhiều thành phần, ít nguyên bản — liên hệ với ăn quá nhiều và nhiều kết cục sức khỏe xấu. Cơ chế đề xuất: mật độ năng lượng cao, dễ ăn nhanh (hyper-palatable), ít chất xơ/độ no, phá tín hiệu no tự nhiên.",
            expertNote: "Thử nghiệm đối chứng nội trú của Kevin Hall (NIH): cùng lượng calo/macro sẵn có, người ăn chế độ UPF tự ăn thêm ~500 kcal/ngày so với chế độ nguyên bản — bằng chứng nhân quả hiếm hoi. NHƯNG cần chính xác: 'chế biến' là một PHỔ, không phải nhị phân — sữa chua, đậu phụ, bánh mì nguyên cám là chế biến nhẹ và tốt. Vấn đề là SIÊU chế biến. Đồng thời, 'superfood' (dừa, cacao, các loại quả mọng...) phần lớn là MARKETING — không món đơn lẻ nào là phép màu; dừa nhiều chất béo bão hòa (không phải 'health halo'). Trào lưu 'tránh dầu hạt/seed oils' phần lớn KHÔNG có cơ sở khoa học vững. Tín hiệu thật đơn giản đến mức nhàm: ăn chủ yếu đồ nguyên bản, nhiều thực vật đa dạng, giảm đường thêm và UPF — 'ăn thật, không quá nhiều, chủ yếu thực vật' (Pollan).",
            theory: "Monteiro (phân loại NOVA); Hall (RCT ultra-processed 2019); Pollan (heuristic ăn uống).",
            controversy: "'Superfood' và 'detox' là thuật ngữ marketing không có định nghĩa khoa học. Villain hóa/thần thánh hóa từng món (seed oils, dừa, một loại quả) đi ngược bằng chứng — tổng thể chế độ ăn quan trọng hơn món riêng lẻ. Ranh giới 'chế biến' vs 'siêu chế biến' đôi khi mờ.",
            application: [
              { domain: "Nguyên tắc gốc", text: "Ưu tiên đồ nguyên bản/chế biến nhẹ (rau củ, trái cây nguyên, đậu, ngũ cốc nguyên cám, cá, trứng, sữa chua không đường); giảm đồ siêu chế biến (snack đóng gói, nước ngọt, đồ ăn liền nhiều thành phần lạ)." },
              { domain: "Tránh bẫy marketing", text: "Đừng trả giá cao cho 'superfood' — cacao/quả mọng tốt nhưng không phép màu; đa dạng thực vật rẻ tiền (rau Việt theo mùa) giá trị hơn một món đắt được thổi phồng." },
              { domain: "Bối cảnh Việt", text: "Ẩm thực Việt vốn nhiều rau, cá, đồ tươi — lợi thế sẵn có; điểm cần canh là đường thêm (trà sữa, nước ngọt) và đồ ăn nhanh siêu chế biến khi bận." },
              { domain: "Đọc nhãn", text: "Quy tắc nhanh: danh sách thành phần càng ngắn và càng nhận ra tên nguyên liệu thật càng tốt; nhiều thành phần lạ = dấu hiệu siêu chế biến." },
              { domain: "Cân bằng, không cực đoan", text: "Mục tiêu ~80/20, không phải hoàn hảo — ăn uống cực đoan/tội lỗi hóa món ăn hại quan hệ với thức ăn hơn là giúp (xem mục kế)." },
            ],
          },
          {
            heading: "Mối quan hệ với thức ăn, nấu nướng & niềm vui ẩm thực",
            evidence: "moderate",
            mechanism: "Ăn uống không chỉ là dinh dưỡng mà là văn hóa, kết nối và khoái cảm. Ăn uống trực giác (intuitive eating) và ăn chánh niệm liên hệ với quan hệ lành mạnh hơn với thức ăn và ít rối loạn ăn uống hơn so với ăn kiêng hạn chế cứng nhắc.",
            expertNote: "Nghịch lý dinh dưỡng Pháp/Địa Trung Hải: các nền văn hóa coi ăn là niềm vui xã hội, ăn chậm, phần vừa, đồ tươi — thường có kết cục sức khỏe tốt hơn các nền văn hóa xem thức ăn qua lăng kính lo âu/kiểm soát/tội lỗi. Ăn kiêng hạn chế cứng nhắc dự báo ăn vô độ bù trừ (restraint → disinhibition). Nấu ăn tại nhà là đòn bẩy sức khỏe mạnh (kiểm soát thành phần, tự động giảm UPF) VÀ là hoạt động flow/sáng tạo/kết nối — nó thuộc cả trục sức khỏe lẫn trục tận hưởng. Ăn cùng người khác (commensality) là một trong các dự báo wellbeing bị đánh giá thấp.",
            theory: "Tribole & Resch (intuitive eating); nghiên cứu commensality và văn hóa ẩm thực.",
            controversy: "Ăn trực giác không hợp mọi người/mọi hoàn cảnh (vd một số tình trạng y tế cần cấu trúc); cân bằng giữa linh hoạt và mục tiêu sức khỏe là cá thể hóa. Nếu có dấu hiệu rối loạn ăn uống, cần chuyên gia, không tự áp.",
            application: [
              { domain: "Bận mà vẫn nguyên bản", text: "Batch cooking cuối tuần (nấu sẵn đạm + rau + ngũ cốc thành các phần); overnight oats/sữa chua + hạt cho bữa sáng; smoothie rau-quả-đạm (dùng quả nguyên thay nước ép để giữ chất xơ)." },
              { domain: "Nấu như flow/kết nối", text: "Coi nấu ăn cuối tuần là hoạt động thư giãn/sáng tạo (thuộc trục Tận hưởng), không chỉ 'việc phải làm' — và nấu/ăn cùng người thân để tăng commensality." },
              { domain: "Quan hệ lành mạnh với thức ăn", text: "Tránh nhị phân 'tốt/xấu', 'tội lỗi' hóa món ăn; ăn chậm, chú ý cảm giác no — quan hệ linh hoạt bền hơn kiểm soát cứng nhắc." },
              { domain: "Thưởng thức có chủ đích", text: "Với món mình yêu thích, ăn chánh niệm và tận hưởng trọn vẹn thay vì vừa ăn vừa làm việc — cùng calo, nhiều khoái cảm và no hơn." },
            ],
          },
        ],
      },
      {
        label: "Giấc ngủ",
        sections: [
          {
            heading: "Glymphatic, kiến trúc giấc ngủ & chronotype",
            evidence: "strong",
            mechanism: "Hệ glymphatic hoạt động mạnh nhất trong giấc ngủ sâu (N3), rửa trôi beta-amyloid/tau. Social jetlag (lệch chronotype vs lịch xã hội) liên hệ tăng nguy cơ chuyển hóa độc lập tổng giờ ngủ.",
            expertNote: "Hệ glymphatic (Nedergaard) là khoa học TƯƠNG ĐỐI MỚI và phần lớn bằng chứng cơ chế đến từ mô hình ĐỘNG VẬT; mức độ và ngay cả chiều của thanh thải amyloid khi ngủ ở NGƯỜI vẫn đang được nghiên cứu và có kết quả thách thức (một số nghiên cứu 2023–2024 đặt câu hỏi về giả định 'ngủ tăng thanh thải'). Hãy xem nó là giả thuyết cơ chế hấp dẫn, chưa đóng khung. Điều VỮNG hơn: thiếu ngủ mạn tính là yếu tố nguy cơ độc lập cho suy giảm nhận thức và nhiều kết cục sức khỏe, bất kể cơ chế glymphatic đúng đến đâu. Kiến trúc giấc ngủ theo chu kỳ ~90 phút: N3 (sâu) dồn nửa đầu đêm; REM dồn nửa sau. Hai quá trình: áp lực ngủ (adenosine, Process S) và nhịp sinh học (Process C). Caffeine chặn thụ thể adenosine — nửa đời ~5–6h. Chronotype phần lớn do gen.",
            theory: "Borbély (mô hình hai quá trình); Nedergaard (glymphatic); Roenneberg (chronotype/social jetlag).",
            controversy: "Melatonin liều cao (>1mg) không hiệu quả hơn liều thấp (0.3–0.5mg) cho điều chỉnh nhịp; thiết bị theo dõi giấc ngủ tiêu dùng đo giai đoạn ngủ kém chính xác — hữu ích cho xu hướng, không phải chẩn đoán.",
            application: [
              { domain: "Neo nhịp", text: "Cố định GIỜ THỨC trước (khó dời hơn giờ ngủ); ánh sáng mạnh/ra ngoài trời 30 phút đầu ngày — tín hiệu mạnh hơn melatonin nhiều." },
              { domain: "Caffeine", text: "Cắt caffeine ~8–10h trước ngủ (thường trước 14h); nếu nhạy, sớm hơn. Đây là đòn bẩy giấc ngủ bị đánh giá thấp nhất." },
              { domain: "Chronotype", text: "Nếu là 'cú đêm' bị ép giờ hành chính, đừng tự trách 'lười'; tối ưu trong ràng buộc — dồn việc sáng tạo/khó vào khung tỉnh táo cá nhân." },
              { domain: "Melatonin", text: "Chỉ dùng liều thấp 0.3–0.5mg, sớm buổi tối cho lệch múi giờ; không dùng liều 3–5mg phổ biến trên thị trường." },
              { domain: "Học tập", text: "Học kỹ năng vận động/ngôn ngữ trước giấc ngủ giàu REM (nửa sau đêm) — đừng hy sinh ngủ để nhồi, vì củng cố trí nhớ xảy ra trong khi ngủ." },
            ],
          },
          {
            heading: "Rượu, caffeine & các chất điều biến giấc ngủ",
            evidence: "strong",
            mechanism: "Rượu ức chế REM nửa đầu đêm qua GABA-A rồi gây phản ứng giao cảm dội ngược nửa sau đêm. Cảm giác 'dễ ngủ' che giấu chất lượng kém.",
            expertNote: "Rượu còn giãn cơ đường thở (tăng ngáy/ngưng thở khi ngủ) và lợi tiểu (gián đoạn). Điểm expert: đồ uống 'giúp ngủ' đều đánh đổi — chúng rút ngắn thời gian vào giấc nhưng làm hỏng kiến trúc. Ngược lại, hành vi (ánh sáng, nhiệt độ phòng ~18–19°C, tắm nước ấm trước ngủ giúp hạ nhiệt độ lõi) cải thiện giấc ngủ mà không đánh đổi.",
            theory: "Dược lý thần kinh ethanol trên GABAergic/giao cảm; điều hòa nhiệt độ lõi và khởi phát giấc ngủ.",
            controversy: "Nhiều người dùng rượu như 'thuốc ngủ' mà không nhận ra nó là nguyên nhân giấc ngủ kém của chính họ.",
            application: [
              { domain: "Nếu uống rượu", text: "Dừng ≥3–4h trước ngủ; đối chiếu tuần có/không uống trên HRV để thấy bằng chứng cá nhân." },
              { domain: "Môi trường ngủ", text: "Phòng mát (~18–19°C), tối hoàn toàn, tắm nước ấm 1–2h trước ngủ để kích hoạt hạ nhiệt độ lõi báo hiệu buồn ngủ." },
              { domain: "Lo âu về giấc ngủ", text: "Nếu mất ngủ mạn tính, CBT-I (CBT cho mất ngủ) là điều trị hàng đầu có bằng chứng — hơn thuốc ngủ về dài hạn." },
            ],
          },
        ],
      },
      {
        label: "Thiên nhiên & môi trường",
        sections: [
          {
            heading: "Attention Restoration Theory & liều thiên nhiên",
            evidence: "moderate",
            mechanism: "Chú ý có chủ đích (vỏ não trước trán) là nguồn hữu hạn, mệt qua tập trung liên tục. Môi trường tự nhiên kích hoạt 'soft fascination' (thu hút không nỗ lực) cho phép hệ chú ý phục hồi.",
            expertNote: "Cơ chế bổ sung: thiên nhiên hạ cortisol và chuyển hệ thần kinh tự chủ sang phó giao cảm (đo qua HRV); giả thuyết 'biophilia' (Wilson) cho rằng ưa thích thiên nhiên có gốc tiến hóa. Ánh sáng ngoài trời (kể cả ngày râm, ~10.000+ lux) mạnh hơn đèn trong nhà (~500 lux) hàng chục lần — vừa neo nhịp sinh học vừa hỗ trợ tâm trạng/thị lực. Phần lớn lợi ích quan sát khó tách khỏi yếu tố vận động và giảm màn hình đi kèm.",
            theory: "Kaplan (ART); Ulrich (nghiên cứu cửa sổ bệnh viện); Wilson (biophilia).",
            controversy: "Con số 'liều' (~120 phút/tuần) là tương quan, khó tách yếu tố gây nhiễu (thu nhập, thời gian rảnh, vận động).",
            application: [
              { domain: "Phục hồi nhận thức", text: "'Restoration break' ngoài trời không điện thoại sau phiên phân tích/code — đi bộ công viên 15–20 phút phục hồi hơn lướt điện thoại." },
              { domain: "Nhịp sinh học", text: "Kết hợp mục tiêu ~120 phút/tuần không gian xanh với phơi ánh sáng sáng sớm — 'một mũi tên hai đích' cho giấc ngủ và tâm trạng." },
              { domain: "Không gian làm việc", text: "Bàn nhìn ra cây xanh/cửa sổ nếu được; thêm cây trong phòng — hiệu ứng phục hồi thụ động suốt ngày." },
              { domain: "Sáng tạo/giải quyết vấn đề", text: "Đi bộ (đặc biệt ngoài trời) tăng tư duy phân kỳ — dùng cho brainstorm/gỡ bí, không chỉ để 'nghỉ'." },
            ],
          },
        ],
      },
      {
        label: "Chỉ số sinh học",
        sections: [
          {
            heading: "Panel chỉ số nâng cao & diễn giải theo quỹ đạo",
            evidence: "moderate",
            mechanism: "ApoB đo trực tiếp số hạt lipoprotein gây xơ vữa — chính xác hơn LDL-C, đặc biệt ở TOFI. hs-CRP đo viêm; HOMA-IR ước tính kháng insulin sớm.",
            expertNote: "Bộ chỉ số 'expert' theo dõi dài hạn: ApoB (xơ vữa), Lp(a) (đo một lần đời, chủ yếu do gen, nguy cơ tim mạch độc lập), hs-CRP (viêm), HbA1c + insulin đói (chuyển hóa glucose), ferritin/transferrin (sắt), vitamin D, TSH (giáp), và với phụ nữ theo dõi hormone theo giai đoạn. Nguyên tắc diễn giải chuyên gia: một điểm dữ liệu ít nghĩa; QUỸ ĐẠO qua thời gian và bối cảnh cá nhân mới là tín hiệu. 'Bình thường' theo khoảng tham chiếu dân số ≠ tối ưu cho cá nhân.",
            theory: "Y học dự phòng/'longevity medicine' (Attia và cộng sự) — nhấn mạnh phát hiện sớm quỹ đạo thay vì chờ ngưỡng bệnh.",
            controversy: "Nguy cơ 'over-testing' gây lo âu/can thiệp không cần thiết; cần diễn giải cùng bác sĩ, không tự chẩn đoán. Một số marker (như nhiều panel 'longevity' thương mại) thiếu bằng chứng thay đổi kết cục.",
            application: [
              { domain: "Khám định kỳ", text: "Chủ động yêu cầu thêm ApoB, hs-CRP, insulin đói, HbA1c, vitamin D — thường không có trong gói mặc định ở VN." },
              { domain: "Một lần đời", text: "Đo Lp(a) một lần: nếu cao (do gen), cần theo dõi tim mạch chủ động sớm hơn — thông tin thay đổi hành động." },
              { domain: "Quỹ đạo", text: "Lập bảng theo năm cho mỗi marker; xu hướng xấu dần trong khoảng 'bình thường' vẫn là tín hiệu hành động sớm." },
              { domain: "Ranh giới", text: "Dùng số liệu để thảo luận với bác sĩ và điều chỉnh lối sống, không tự kê đơn/tự chẩn đoán." },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "mental",
    num: "02",
    icon: Brain,
    title: "Tinh thần",
    subtitle: "Điều hòa cảm xúc, stress, ý nghĩa nội tâm",
    groups: [
      {
        label: "Điều hòa cảm xúc",
        sections: [
          {
            heading: "vmPFC–amygdala, affect labeling & reappraisal",
            evidence: "strong",
            mechanism: "vmPFC điều hòa GIẢM đáp ứng amygdala, nhưng phần lớn GIÁN TIẾP — qua các nơ-ron GABAergic xen kẽ (intercalated cells) trong chính amygdala, không phải synapse vỏ não ức chế trực tiếp; ở người, mối quan hệ này được SUY RA từ hình ảnh học và mô hình động vật, chưa được chứng minh nhân quả trực tiếp. fMRI: gọi tên cảm xúc bằng ngôn ngữ tương quan với giảm tín hiệu amygdala và tăng vmPFC. Lưu ý phương pháp: diễn giải 'kích hoạt vùng X = trạng thái tâm lý Y' vướng vấn đề suy luận ngược (reverse inference) — do đó HIỆU ỨNG HÀNH VI của affect labeling (giảm cường độ chủ quan, cải thiện điều hòa) đáng tin hơn CƠ CHẾ thần kinh cụ thể được gán cho nó.",
            expertNote: "Gross phân biệt các chiến lược điều hòa theo thời điểm can thiệp: 'antecedent-focused' (tái đánh giá/reappraisal — thay đổi diễn giải TRƯỚC khi cảm xúc bùng, hiệu quả và ít chi phí sinh lý) vs 'response-focused' (suppression — nén biểu hiện SAU khi cảm xúc đã bùng, tốn kém, tăng kích thích giao cảm, làm giảm trí nhớ và chất lượng quan hệ). Reappraisal + affect labeling là bộ đôi mạnh nhất. 'Distanced self-talk' (tự nói với mình ở ngôi thứ ba/gọi tên mình) tăng khoảng cách tâm lý, cải thiện điều hòa dưới áp lực (Kross).",
            theory: "Gross (mô hình quá trình điều hòa cảm xúc); Lieberman (affect labeling); Kross (self-distancing).",
            controversy: "Suppression phổ biến trong văn hóa 'giữ thể diện' nhưng tốn kém về dài hạn; 'suy nghĩ tích cực' ép buộc có thể phản tác dụng.",
            application: [
              { domain: "Tức thì", text: "Khi cảm xúc mạnh: gọi tên cụ thể ('tôi đang lo vì X') thay vì nén — labeling hạ cường độ mà không tốn kém như suppression." },
              { domain: "Trước sự kiện áp lực", text: "Reappraisal trước (phỏng vấn, thuyết trình): diễn giải hồi hộp là 'cơ thể đang sẵn sàng' thay vì 'mình sắp thất bại' — đổi ý nghĩa đổi phản ứng sinh lý." },
              { domain: "Khoảng cách tâm lý", text: "Tự nói ngôi thứ ba khi rối ('Mây đang thấy quá tải, điều cần làm là...') — tăng self-distancing, ra quyết định tỉnh hơn." },
              { domain: "Quan hệ", text: "Tránh suppression trong xung đột thân mật — nén cảm xúc làm giảm kết nối và trí nhớ về cuộc trò chuyện; thay bằng bày tỏ có cấu trúc." },
            ],
          },
          {
            heading: "Emotional granularity & interoception",
            evidence: "contested",
            mechanism: "Feldman Barrett: não kiến tạo cảm xúc từ tín hiệu nội cảm thụ (interoception) + khái niệm học được. Granularity cao (phân biệt tinh vi các trạng thái) tương quan điều hòa tốt hơn.",
            expertNote: "Interoception — khả năng cảm nhận tín hiệu cơ thể (nhịp tim, hơi thở, căng cơ) — là nền của cả cảm xúc lẫn trực giác. Độ chính xác interoception kém liên hệ với lo âu và alexithymia (khó gọi tên cảm xúc). Luyện chú ý cơ thể (body scan, thở có ý thức) cải thiện interoception, gián tiếp cải thiện điều hòa cảm xúc và ra quyết định trực giác. Đây là cầu nối cơ chế giữa 'thân' và 'tâm' thường bị nói mơ hồ.",
            theory: "Feldman Barrett (constructed emotion); Craig (interoception); Seth (predictive processing).",
            controversy: "Tranh luận Ekman (cảm xúc cơ bản phổ quát) vs Feldman Barrett (kiến tạo) chưa ngã ngũ.",
            application: [
              { domain: "Vốn từ cảm xúc", text: "Thay 'tôi thấy tệ' bằng từ chính xác (bực/thất vọng/quá tải/tủi) — mỗi từ gợi hành động ứng phó khác; dùng emotion wheel khi bí từ." },
              { domain: "Interoception", text: "Body scan ngắn 2–3 phút/ngày: quét cảm giác cơ thể không phán xét — luyện 'ăng-ten' nội cảm thụ nền tảng của điều hòa và trực giác." },
              { domain: "Ra quyết định", text: "Chú ý 'cảm giác ruột gan' như dữ liệu (không phải mệnh lệnh) — trực giác là interoception + kinh nghiệm nén; đối chiếu với phân tích." },
            ],
          },
          {
            heading: "Rumination, worry & metacognition",
            evidence: "strong",
            mechanism: "Rumination (nhai lại quá khứ) và worry (lo lắng tương lai) đều là suy nghĩ tiêu cực lặp lại, tương quan trầm cảm/lo âu. Khác reflection (phản tư hướng giải quyết, tò mò).",
            expertNote: "Mô hình metacognitive (Wells): vấn đề không phải nội dung suy nghĩ tiêu cực mà là NIỀM TIN META về nó ('mình phải lo mới kiểm soát được', 'mình không dừng nghĩ được'). Can thiệp hiệu quả nhắm vào niềm tin meta và 'attentional control' (khả năng chủ động dời chú ý), không phải tranh luận với từng suy nghĩ. 'Detached mindfulness' — quan sát suy nghĩ như sự kiện tinh thần thoáng qua, không dính vào — khác thiền tập trung. Lịch 'worry time' (dành 15 phút cố định để lo, hoãn lo ngoài khung đó) có bằng chứng thực tế.",
            theory: "Nolen-Hoeksema (rumination); Wells (metacognitive therapy).",
            controversy: "Khó tự phân biệt 'xử lý sâu' vs 'nhai lại' vì cảm giác chủ quan giống nhau.",
            application: [
              { domain: "Test nhanh", text: "Sau 5 phút suy nghĩ chưa ra insight/bước hành động nào → khả năng cao là nhai lại; chủ động ngắt." },
              { domain: "Chuyển câu hỏi", text: "Đổi 'tại sao chuyện này xảy ra với mình' (nuôi rumination) sang 'mình làm gì tiếp' (reflection hướng hành động)." },
              { domain: "Worry time", text: "Hẹn 15 phút cố định/ngày để lo; khi lo lắng nổi ngoài khung đó, ghi lại và hoãn tới 'giờ lo' — cắt lo lan man." },
              { domain: "Ngắt vòng vật lý", text: "Đứng dậy đổi không gian/hoạt động — đổi ngữ cảnh cắt vòng lặp hiệu quả hơn 'cố nghĩ tích cực'." },
            ],
          },
        ],
      },
      {
        label: "Stress & khả năng phục hồi",
        sections: [
          {
            heading: "Allostatic load & đo lường gián tiếp",
            evidence: "strong",
            mechanism: "Allostasis: cơ thể thay đổi điểm cân bằng để thích nghi stress lặp lại. Tổn hại tích lũy đa hệ cơ quan khi hệ thích nghi kích hoạt lặp lại/không tắt đúng lúc.",
            expertNote: "Allostatic load được thao tác hóa qua chỉ số tổng hợp (huyết áp, cortisol, DHEA-S, HbA1c, lipid, CRP, HRV...) — không marker đơn nào đủ. Điểm expert: 'stress' không xấu tự thân; vấn đề là thiếu PHỤC HỒI (recovery). Mô hình stressor–recovery giống tập luyện: tải + phục hồi = thích nghi; tải liên tục không phục hồi = quá tải. HRV là proxy thực dụng nhất cho trạng thái phục hồi tự chủ. 'Stress mindset' (McGonigal/Crum): tin stress có thể tăng cường (thay vì luôn gây hại) điều biến chính phản ứng sinh lý với stress.",
            theory: "McEwen (allostatic load); Crum (stress mindset).",
            controversy: "Mọi chỉ số 'bình thường' vẫn có thể đang tích lũy tổn hại; ngược lại, over-monitoring HRV gây lo âu ngược.",
            application: [
              { domain: "Dashboard cá nhân", text: "Theo dõi tuần: HRV, chất lượng ngủ, ốm vặt, năng lượng chủ quan (1–5); xu hướng giảm nhiều tuần = tín hiệu giảm tải TRƯỚC triệu chứng." },
              { domain: "Đa track (BA+CBAP+đầu tư+ngôn ngữ)", text: "Coi đây là chỉ số cảnh báo để chủ động cắt bớt một track khi cụm chỉ số xấu đi, thay vì ép tới kiệt sức." },
              { domain: "Thiết kế phục hồi", text: "Chèn phục hồi chủ đích (ngày nghỉ hoàn toàn, ngủ bù có kế hoạch, thời gian không lịch trình) như một phần của kế hoạch, không phải phần thừa." },
              { domain: "Khung tư duy", text: "Với stress không tránh được (deadline, sự kiện lớn), chủ động khung lại là 'cơ thể đang huy động nguồn lực' — stress mindset giảm tác hại sinh lý." },
            ],
          },
          {
            heading: "Post-traumatic growth & nghịch lý bền vững",
            evidence: "moderate",
            mechanism: "Sau nghịch cảnh nghiêm trọng, một tỷ lệ người báo cáo tăng trưởng ở 5 miền: trân trọng cuộc sống, quan hệ sâu hơn, sức mạnh cá nhân, khả năng mới, thay đổi tâm linh/triết lý.",
            expertNote: "Điểm expert quan trọng: PTG là CÓ THẬT nhưng thường bị lãng mạn hóa. Tăng trưởng và đau khổ CÙNG TỒN TẠI (không phải đau khổ biến thành tăng trưởng); một phần 'PTG tự báo cáo' có thể là illusion đối phó hơn là thay đổi thật. Không nên áp đặt kỳ vọng 'phải tăng trưởng' lên người đang khổ (gây thêm gánh nặng). Yếu tố dự báo PTG: xử lý nhận thức chủ động (deliberate rumination, khác intrusive), hỗ trợ xã hội, và tái xây dựng câu chuyện ý nghĩa. Khác 'resilience' (bật lại về baseline) — PTG là vượt baseline.",
            theory: "Tedeschi & Calhoun (post-traumatic growth).",
            controversy: "Đo lường PTG dựa tự báo cáo dễ thiên lệch; ranh giới giữa tăng trưởng thật và ảo tưởng đối phó chưa rõ. Không phổ quát — nhiều người chỉ phục hồi, không 'tăng trưởng', và điều đó bình thường.",
            application: [
              { domain: "Sau khủng hoảng cá nhân", text: "Cho phép đau khổ và ý nghĩa cùng tồn tại; đừng ép bản thân 'phải rút ra bài học' khi còn đang đau." },
              { domain: "Xử lý có chủ đích", text: "Viết phản tư có cấu trúc về trải nghiệm khó (deliberate, hướng ý nghĩa) khác với nhai lại xâm nhập — cái trước hỗ trợ tăng trưởng." },
              { domain: "Với người khác", text: "Không nói 'mọi thứ xảy ra đều có lý do' với người đang khổ — hỗ trợ sự hiện diện, để họ tự tìm ý nghĩa theo nhịp của họ." },
            ],
          },
          {
            heading: "'Adrenal fatigue' & phân biệt giả khoa học",
            evidence: "contested",
            mechanism: "Suy tuyến thượng thận thật (Addison) hiếm, đo được rõ. 'Adrenal fatigue' (wellness industry) KHÔNG được nội tiết học công nhận là chẩn đoán có cơ sở.",
            expertNote: "Rối loạn cortisol thật trong stress mạn tính là đường cong ngày bị làm phẳng/dịch pha (rối loạn nhịp), không phải 'cạn kiệt tuyến'. Kỹ năng expert ở đây là META: nhận diện dấu hiệu giả khoa học nói chung — thuật ngữ nghe khoa học nhưng không được cơ quan y khoa công nhận, giải thích 'một nguyên nhân cho mọi triệu chứng', bán sản phẩm kèm chẩn đoán, dựa lời chứng thực thay vì thử nghiệm đối chứng.",
            theory: "Đồng thuận nội tiết học phản bác khái niệm adrenal fatigue.",
            controversy: "Ngành TPCN khai thác mạnh để bán 'adrenal support'.",
            application: [
              { domain: "Mệt mỏi kéo dài", text: "Đi khám thật (giáp, thiếu máu, cortisol theo nhịp qua bác sĩ, tầm soát trầm cảm) thay vì mua 'adrenal support'." },
              { domain: "Kỹ năng lọc thông tin", text: "Áp checklist giả khoa học cho MỌI tuyên bố sức khỏe: có được cơ quan y khoa công nhận? có thử nghiệm đối chứng? có bán kèm sản phẩm không?" },
            ],
          },
        ],
      },
      {
        label: "Liệu pháp & can thiệp",
        sections: [
          {
            heading: "Bản đồ liệu pháp theo bằng chứng & cơ chế",
            evidence: "moderate",
            mechanism: "CBT: tái cấu trúc nhận thức. ACT: cognitive defusion + hành động theo giá trị. Mỗi liệu pháp nhắm cơ chế duy trì khác nhau.",
            expertNote: "Bản đồ expert: CBT (bằng chứng mạnh nhất, lo âu/trầm cảm nhẹ-vừa, tập trung nội dung suy nghĩ). ACT (tránh né trải nghiệm, đau mạn tính — không đổi nội dung mà đổi quan hệ với suy nghĩ). DBT (điều hòa cảm xúc cực đoan, gốc cho rối loạn nhân cách ranh giới — kỹ năng distress tolerance rất thực dụng cho mọi người). CFT/self-compassion (Gilbert/Neff — cho tự phê phán cao). IFS (nội tâm 'các phần' — phổ biến nhưng bằng chứng đang tích lũy). Điểm chung các liệu pháp hiệu quả: 'common factors' (liên minh trị liệu, kỳ vọng, cấu trúc) giải thích phần lớn hiệu quả, đôi khi hơn kỹ thuật đặc thù (Wampold).",
            theory: "Beck (CBT); Hayes (ACT); Linehan (DBT); Neff/Gilbert (self-compassion); Wampold (common factors).",
            controversy: "Mindfulness/MBSR bằng chứng khiêm tốn hơn độ phổ biến; positive psychology chịu replication crisis; tranh luận 'kỹ thuật đặc thù vs common factors'.",
            application: [
              { domain: "Chọn hướng", text: "Suy nghĩ méo mó cụ thể → CBT. Tránh né/khó chấp nhận cảm xúc → ACT. Cảm xúc cực đoan/bốc đồng → kỹ năng DBT. Tự phê phán gay gắt → self-compassion." },
              { domain: "Self-compassion (thực dụng)", text: "Thay giọng tự phê phán bằng giọng nói với bạn thân đang khổ; một số nghiên cứu (vd Breines & Chen) gợi ý self-compassion hỗ trợ động lực sửa sai TỐT HƠN tự phê phán — hiệu ứng có thật nhưng cỡ vừa, từ thí nghiệm nhỏ, nên xem là hướng đáng thử chứ không phải quy luật tuyệt đối." },
              { domain: "Distress tolerance (DBT)", text: "Kỹ năng TIPP cho khủng hoảng cảm xúc cấp (nhiệt độ lạnh lên mặt, vận động mạnh, thở, thư giãn cơ) — hạ kích thích nhanh khi quá tải." },
              { domain: "Ngưỡng chuyên gia", text: "Nếu ảnh hưởng chức năng sống >2 tuần, tìm chuyên gia; liên minh trị liệu tốt quan trọng hơn 'trường phái đúng' — chọn người bạn thấy hợp." },
            ],
          },
        ],
      },
    ],
  },
];
const IDENTITY_PILLAR = {
  id: "identity",
  num: "03",
  icon: Fingerprint,
  title: "Bản sắc cá nhân",
  subtitle: "Hiểu bên trong, hiệu suất nhận thức, kỹ năng cảm xúc, học hỏi, tự điều chỉnh",
  groups: [
    {
      label: "Hiểu bản thân",
      sections: [
        {
          heading: "Narrative identity & agency/communion",
          evidence: "moderate",
          mechanism: "Con người xây bản sắc qua câu chuyện đời sống nội tâm hóa, liên tục tiến hóa. Cấu trúc 'redemptive' (khó khăn → ý nghĩa) tương quan sức khỏe tâm lý tốt hơn.",
          expertNote: "McAdams xác định hai chủ đề motif dự báo wellbeing: agency (cảm giác làm chủ, ảnh hưởng, thành tựu) và communion (kết nối, tình yêu, thuộc về). Câu chuyện đời cân bằng cả hai lành mạnh hơn lệch một phía. 'Contamination sequences' (tốt → xấu) dự báo trầm cảm; 'redemption sequences' (xấu → tốt) dự báo generativity. Điểm expert: câu chuyện có thể VIẾT LẠI có chủ đích (narrative therapy) — cùng sự kiện, khung kể khác cho ý nghĩa khác, và điều này thay đổi hành vi tương lai thật.",
          theory: "McAdams (narrative identity, agency/communion); White & Epston (narrative therapy).",
          controversy: "Khó đo khách quan chất lượng câu chuyện; nghiên cứu dựa mã hóa định tính.",
          application: [
            { domain: "Chuyển đổi nghề", text: "Viết lại hành trình BA→pivot theo cấu trúc redemptive (khó khăn → điều học được → con người trở thành) — dùng cho CV, phỏng vấn, và chính động lực bản thân." },
            { domain: "Cân bằng chủ đề", text: "Kiểm tra câu chuyện đời mình có đủ cả agency (thành tựu/làm chủ) VÀ communion (kết nối) không — lệch quá về thành tựu dễ dẫn tới trống rỗng dù thành công." },
            { domain: "Vượt thất bại", text: "Khi gặp thất bại, chủ động đặt nó vào 'redemption sequence' đang diễn ra thay vì 'contamination' — không tô hồng mà tích hợp vào tăng trưởng." },
          ],
        },
        {
          heading: "Self-concept clarity & values clarification",
          evidence: "moderate",
          mechanism: "Mức độ niềm tin về bản thân rõ ràng, nhất quán, ổn định. Clarity thấp tương quan neuroticism cao, wellbeing thấp — độc lập nội dung niềm tin.",
          expertNote: "Clarity thấp khiến dễ bị 'cuốn' theo ý kiến/kỳ vọng người khác và khó ra quyết định lớn. Công cụ expert: values card sort (sắp xếp giá trị theo ưu tiên buộc đánh đổi tường minh) tạo clarity thực dụng hơn tự vấn mông lung. Phân biệt 'values' (hướng đi, vô hạn — vd 'học hỏi') với 'goals' (đích, hữu hạn — vd 'đạt CBAP'); ACT lập luận hành động theo values bền vững hơn chỉ theo goals vì goals đạt xong để lại khoảng trống.",
          theory: "Campbell (self-concept clarity); Hayes/ACT (values vs goals).",
          controversy: "Chiều nhân quả chưa rõ — có thể vòng lặp hai chiều với bất ổn cảm xúc.",
          application: [
            { domain: "Quyết định lớn", text: "Tách hai câu hỏi khi mông lung pivot: (a) thiếu THÔNG TIN về ngành → research; (b) thiếu rõ ràng GIÁ TRỊ nội tại → làm values card sort." },
            { domain: "Bộ lọc giá trị", text: "Viết 3–5 giá trị cốt lõi (đã sắp ưu tiên) và dùng làm bộ lọc cho lời mời/cơ hội — 'điều này phục vụ giá trị nào của mình?'" },
            { domain: "Chống bị cuốn", text: "Khi thấy dao động theo ý kiến người khác, quay về bản 'tuyên bố giá trị' đã viết lúc đầu óc tỉnh táo." },
          ],
        },
        {
          heading: "Introspection illusion & 3 tầng tự nhận thức",
          evidence: "strong",
          mechanism: "Phần lớn xử lý tâm trí không tiếp cận được bằng ý thức; con người confabulate lý do cho hành vi, tin chắc dù có thể sai.",
          expertNote: "Eurich phân biệt self-awareness NỘI (hiểu giá trị/cảm xúc/mẫu hình của mình) và NGOẠI (biết người khác nhìn mình thế nào) — hai cái độc lập, cần cả hai. Nghịch lý: người nội quan NHIỀU không tự động tự nhận thức tốt hơn — nội quan sai cách (hỏi 'tại sao' nuôi confabulation) tệ hơn hỏi 'cái gì' (What am I feeling? What are options?). Kết hợp nội quan + dữ liệu hành vi + phản hồi 360 là chuẩn expert.",
          theory: "Wilson (introspection illusion); Eurich (insight — nội/ngoại self-awareness).",
          controversy: "Nội quan không vô giá trị, nhưng cảm giác 'chắc chắn biết lý do' không đáng tin.",
          application: [
            { domain: "Hỏi đúng câu", text: "Thay 'tại sao mình thế này' (nuôi bịa lý do) bằng 'mình đang cảm gì / có lựa chọn nào' — câu hỏi 'cái gì' cho insight thật hơn." },
            { domain: "Dữ liệu hành vi", text: "Hiểu bản thân qua mình THỰC SỰ dành thời gian/tiền cho gì (xem lịch, sao kê), không chỉ mình NGHĨ mình ưu tiên gì." },
            { domain: "Self-awareness ngoại", text: "Xin phản hồi cụ thể từ vài người tin cậy về điểm mù của mình — góc nhìn ngoài bù điểm mù nội quan." },
            { domain: "Decision journal", text: "Ghi lý do + dự đoán TRƯỚC kết quả: vừa cải thiện đầu tư, vừa là dữ liệu khách quan về cách mình thực sự tư duy (chống confabulation hồi tố)." },
          ],
        },
        {
          heading: "Identity statuses & khủng hoảng bản sắc trưởng thành",
          evidence: "moderate",
          mechanism: "Bốn trạng thái theo trục khám phá/cam kết: diffusion, foreclosure (cam kết không khám phá), moratorium (khám phá chưa cam kết), achievement.",
          expertNote: "Ở người trưởng thành, chuyển đổi (nghề, vai trò, giai đoạn sống) tái mở bản sắc — Bridges phân biệt 3 pha: kết thúc (buông cái cũ), 'neutral zone' (khoảng giữa mơ hồ, khó chịu nhưng sáng tạo), khởi đầu mới. Đa số muốn nhảy cóc qua neutral zone nhưng đây là nơi tái cấu trúc bản sắc thật xảy ra. Foreclosure (chọn nghề theo kỳ vọng gia đình không qua khám phá) dễ dẫn khủng hoảng giữa đời.",
          theory: "Marcia (identity statuses); Bridges (transitions — 3 pha).",
          controversy: "Mô hình gốc tuyến tính; thực tế người lớn dao động qua lại nhiều lần.",
          application: [
            { domain: "Giai đoạn pivot", text: "Nhận diện đang ở 'moratorium/neutral zone' — mơ hồ, chưa cam kết — là pha phát triển lành mạnh và sáng tạo, không phải do dự cần vội thoát." },
            { domain: "Giới hạn thời gian", text: "Đặt thời hạn mềm cho khám phá (vd 6 tháng thử nghiệm có cấu trúc: học, phỏng vấn thông tin, dự án thử) để không mắc kẹt vô định." },
            { domain: "Kiểm tra foreclosure", text: "Hỏi: định hướng hiện tại là do MÌNH khám phá chọn, hay thừa hưởng kỳ vọng chưa từng chất vấn? — nền cho quyết định pivot tự chủ." },
          ],
        },
        {
          heading: "Trải nghiệm, 'time affluence' & mua thời gian",
          evidence: "strong",
          mechanism: "Trải nghiệm cho hạnh phúc bền hơn vật chất (ít bị so sánh xã hội, được ký ức làm đẹp). Chi tiêu mua lại thời gian rảnh tăng wellbeing.",
          expertNote: "Mở rộng expert: 'time affluence' (cảm giác dư dả thời gian) dự báo wellbeing mạnh, đôi khi hơn 'material affluence'. 'Time famine' (nghèo thời gian mạn tính) phổ biến ở người thu nhập tăng — nghịch lý vì thời gian trở nên 'đắt' hơn. Whillans: chi tiêu mua thời gian (thuê/ủy thác việc ghét) tăng hạnh phúc hơn mua vật chất, nhưng ít người làm vì thiên kiến. Trải nghiệm 'đỉnh + kết' (peak-end rule) định hình ký ức — thiết kế phần đỉnh và phần kết đẹp quan trọng hơn kéo dài.",
          theory: "Gilovich (experiential purchases); Whillans (buying time); Kahneman (peak-end rule).",
          controversy: "Hiệu ứng mạnh nhất khi trải nghiệm có yếu tố kết nối xã hội.",
          application: [
            { domain: "Chi tiêu tùy ý", text: "Ưu tiên trải nghiệm có kết nối (chuyến đi cùng người thân, lớp học nhóm) hơn vật chất; và ưu tiên 'mua thời gian' (thuê việc mình ghét) — đòn bẩy wellbeing bị bỏ quên." },
            { domain: "Thiết kế ký ức", text: "Với sự kiện quan trọng, đầu tư vào một 'đỉnh' đáng nhớ và một 'kết' đẹp (peak-end) hơn là kéo dài đều đều." },
            { domain: "Time famine", text: "Nếu thu nhập tăng nhưng thấy nghèo thời gian, chủ động 'mua lại' thời gian và bảo vệ khoảng trống không lịch trình như một khoản đầu tư wellbeing." },
          ],
        },
      ],
    },

    {
      label: "Hiệu suất nhận thức (IQ thực dụng)",
      note: "Điểm IQ cốt lõi ở người trưởng thành khá ổn định và phần lớn không 'tăng' được. Nhóm này tập trung vào phần THỰC SỰ cải thiện: kiến thức tinh thể, chất lượng tư duy, ra quyết định — thứ quyết định 'thông minh trong thực tế' hơn điểm IQ thô.",
      sections: [
        {
          heading: "Fluid vs crystallized & bảo vệ nhận thức",
          evidence: "strong",
          mechanism: "Fluid (suy luận trừu tượng, tốc độ) đạt đỉnh sớm rồi giảm. Crystallized (kiến thức, mô hình, kinh nghiệm) tăng đến trung niên và sau. Brain-games hứa tăng fluid: near transfer tốt, far transfer gần như không.",
          expertNote: "Cattell–Horn–Carroll là mô hình trí tuệ được ủng hộ nhất. 'Cognitive reserve' (Stern): giáo dục, nghề phức tạp, hoạt động trí óc/xã hội xây 'dự trữ' giúp não chịu đựng bệnh lý lâu hơn trước khi lộ suy giảm — không ngăn bệnh nhưng dời điểm biểu hiện. Yếu tố mạch máu (huyết áp, đường huyết, lipid) ảnh hưởng nhận thức tuổi già nhiều hơn game luyện não. 'What's good for the heart is good for the brain.'",
          theory: "Cattell–Horn–Carroll; Stern (cognitive reserve).",
          controversy: "Ngành brain-training bị FTC phạt vì phóng đại far transfer.",
          application: [
            { domain: "Đầu tư đúng chỗ", text: "Bỏ brain-games; xây crystallized intelligence — kho mental models và kiến thức chuyên sâu áp dụng được (khung định giá, phân tích ngành cho nghề BA/đầu tư)." },
            { domain: "Bảo vệ fluid", text: "Bảo vệ tốc độ xử lý gián tiếp qua thể chất: Zone 2, ngủ đủ, kiểm soát huyết áp/đường huyết — mạnh hơn game luyện não." },
            { domain: "Cognitive reserve dài hạn", text: "Duy trì học kỹ năng mới khó (ngôn ngữ), nghề phức tạp, kết nối xã hội — ba yếu tố xây dự trữ nhận thức chống suy giảm tuổi già." },
          ],
        },
        {
          heading: "Mental models, latticework & liên miền",
          evidence: "moderate",
          mechanism: "Chất lượng tư duy phụ thuộc sở hữu nhiều mô hình từ nhiều lĩnh vực và biết khi nào dùng cái nào — chống 'cầm búa thấy gì cũng là đinh'.",
          expertNote: "Các mô hình đòn bẩy cao vì áp dụng liên miền: second-order thinking (hệ quả của hệ quả), opportunity cost, inversion (giải ngược — 'làm sao để chắc chắn thất bại?'), base rates (xác suất nền), Pareto (80/20), compounding (lãi kép áp cho tiền, kỹ năng, quan hệ), map≠territory, circle of competence, Occam & Hanlon's razor. Kỹ năng expert không phải BIẾT mô hình mà là NHẬN RA tình huống nào gọi mô hình nào — luyện qua áp dụng lặp lại và phản tư.",
          theory: "Latticework of mental models (Munger); tư duy liên miền.",
          controversy: "Không phải lý thuyết thực nghiệm chặt — là heuristic hữu ích, dùng như công cụ.",
          application: [
            { domain: "Sổ mô hình", text: "Duy trì 'sổ mental models', mỗi mô hình kèm 1 ví dụ mình từng dùng — biến kiến thức rời rạc thành latticework truy xuất được." },
            { domain: "Chuyển giao", text: "Gặp khái niệm mạnh ở lĩnh vực này (vd 'margin of safety' trong đầu tư), thử áp sang lĩnh vực khác (quản lý thời gian, sức khỏe) — luyện chuyển giao liên miền." },
            { domain: "Compounding cuộc sống", text: "Áp lãi kép ngoài tiền: kỹ năng, quan hệ, sức khỏe, uy tín đều cộng gộp — ưu tiên hành động có đường cong cộng gộp dài hạn hơn phần thưởng tức thì." },
            { domain: "Inversion", text: "Trước dự án lớn, hỏi ngược 'làm gì để chắc chắn thất bại?' rồi tránh — thường lộ rủi ro mà tư duy thuận bỏ sót." },
          ],
        },
        {
          heading: "Bayesian updating, calibration & tư duy xác suất",
          evidence: "strong",
          mechanism: "Tư duy tốt là điều chỉnh mức tin (không nhị phân) theo bằng chứng, cân với tiên nghiệm. Superforecasters cập nhật từng bước nhỏ, tư duy xác suất — luyện được.",
          expertNote: "Tetlock: yếu tố dự báo giỏi gồm cập nhật gia tăng, chia câu hỏi lớn thành phần nhỏ ('Fermi-ize'), lấy 'góc nhìn ngoài' (base rate của các trường hợp tương tự) TRƯỚC 'góc nhìn trong' (chi tiết trường hợp này), và calibration (khi nói 70% thì đúng ~70% số lần). 'Brier score' đo độ chính xác dự báo. Phân biệt process vs outcome: quyết định tốt + kết quả xấu vẫn là quyết định tốt trong môi trường xác suất ('resulting' là lỗi đánh giá quyết định qua kết quả — Annie Duke).",
          theory: "Tetlock (superforecasting); Duke (process vs outcome, 'resulting').",
          controversy: "Con người chống lại tự nhiên (confirmation bias, neo); cần luyện chủ động ngược bản năng.",
          application: [
            { domain: "Định lượng niềm tin", text: "Diễn đạt bằng %: 'tôi 70% tin cổ phiếu này bị định giá thấp' thay vì nhị phân — buộc định lượng độ chắc chắn." },
            { domain: "Calibration", text: "Trong decision journal ghi xác suất dự đoán TRƯỚC; đối chiếu định kỳ để hiệu chỉnh độ tự tin — mục tiêu: khi nói 70% thì đúng ~70% số lần." },
            { domain: "Góc nhìn ngoài trước", text: "Trước dự báo, hỏi base rate ('các trường hợp tương tự thường kết thúc thế nào?') TRƯỚC khi chìm vào chi tiết đặc thù — chống lạc quan thái quá." },
            { domain: "Đánh giá quyết định", text: "Tách chất lượng quyết định khỏi kết quả; review quyết định qua QUY TRÌNH (thông tin có lúc đó, logic) không chỉ qua kết cục — chống 'resulting'." },
          ],
        },
        {
          heading: "Debiasing ở cấp quy trình",
          evidence: "moderate",
          mechanism: "Thiên kiến hệ thống (confirmation, anchoring, availability, sunk cost) làm méo phán đoán. Biết về bias KHÔNG đủ để tránh; can thiệp cấp quy trình (checklist, pre-mortem) hiệu quả hơn.",
          expertNote: "Bias khó sửa vì phần lớn là System 1 (tự động). Chiến lược expert: (1) thay đổi môi trường/quy trình thay vì cố 'nghĩ khách quan hơn'; (2) pre-mortem (Klein) huy động System 2 chống lạc quan; (3) 'consider the opposite' — ép sinh bằng chứng ngược; (4) checklist chuẩn hóa (Gawande) chống bỏ sót; (5) 'ulysses contract' — tự ràng buộc trước để chống bias tương lai; (6) 'red team' — cử người/mình đóng vai phản biện. Đặc biệt sunk cost: quyết định dựa chi phí TƯƠNG LAI và lợi ích còn lại, bỏ qua cái đã mất.",
          theory: "Kahneman; Klein (pre-mortem); Gawande (checklist).",
          controversy: "Chương trình 'dạy debiasing' hiệu quả yếu nếu chỉ dừng ở nhận thức.",
          application: [
            { domain: "Quyết định lớn", text: "Pre-mortem: 'giả sử một năm sau quyết định này đã thất bại — vì sao?' — ép não sinh góc phản chứng mà confirmation bias che." },
            { domain: "Luận điểm đầu tư/phân tích", text: "Steelman quan điểm đối lập (dựng bản mạnh nhất của phía ngược) TRƯỚC khi kết luận; đưa checklist chống bias vào quy trình (đã kiểm anchoring? đã tìm bằng chứng ngược?)." },
            { domain: "Sunk cost", text: "Trước khi tiếp tục dự án/quan hệ/khoản đầu tư đang lỗ, hỏi: 'nếu bắt đầu lại từ hôm nay với tình trạng này, mình có chọn nó không?' — bỏ qua cái đã mất." },
            { domain: "Ulysses contract", text: "Tự ràng buộc trước cho quyết định dễ bị cảm xúc chi phối (quy tắc bán định sẵn, chặn app, tự động hóa tiết kiệm) — chống bias của bản thân tương lai." },
          ],
        },
      ],
    },

    {
      label: "Kỹ năng cảm xúc & xã hội (EQ thực dụng)",
      note: "'EQ' như chỉ số đơn nhất còn tranh cãi về giá trị đo lường. Nhưng các KỸ NĂNG THÀNH PHẦN — nhận diện cảm xúc, đọc tín hiệu, điều hòa, quản lý quan hệ — luyện được và có bằng chứng tốt. Nhóm này tập trung vào đó.",
      sections: [
        {
          heading: "Bốn nhánh EQ (Mayer–Salovey) & mô hình khả năng",
          evidence: "moderate",
          mechanism: "Mô hình khả năng chia EQ 4 nhánh luyện được: nhận diện, dùng cảm xúc hỗ trợ tư duy, hiểu cảm xúc, quản lý — từ cơ bản đến phức tạp.",
          expertNote: "Mô hình 'ability-based' (đo như một năng lực, test MSCEIT) nghiêm ngặt hơn mô hình 'trait/mixed' thương mại (thường trùng lặp nhân cách, ít giá trị dự báo tăng thêm). Nhánh 'dùng cảm xúc hỗ trợ tư duy' bị bỏ qua nhất: các trạng thái cảm xúc khác nhau phù hợp việc khác nhau — tâm trạng tích cực nhẹ hỗ trợ brainstorm/sáng tạo; tâm trạng hơi tiêu cực/thận trọng hỗ trợ soát lỗi/phân tích phê phán. Điều tiết công việc theo trạng thái là kỹ năng expert.",
          theory: "Mayer & Salovey (mô hình khả năng); phê phán các mô hình trait.",
          controversy: "Nhiều test EQ thương mại đo lẫn nhân cách, ít giá trị dự báo.",
          application: [
            { domain: "Luyện theo thứ tự", text: "Bắt đầu từ nhận diện chính xác cảm xúc bản thân (nền tảng) trước khi kỳ vọng quản lý tốt." },
            { domain: "Nghề BA/nhiều bên", text: "Luyện nhánh 'hiểu cảm xúc': dự đoán một quyết định/thay đổi khiến các bên liên quan cảm thấy thế nào — kỹ năng quản lý stakeholder trực tiếp." },
            { domain: "Điều tiết theo trạng thái", text: "Xếp việc theo tâm trạng: brainstorm/sáng tạo khi tâm trạng tích cực nhẹ; soát lỗi/phân tích phê phán khi thận trọng — dùng cảm xúc làm công cụ." },
            { domain: "Bỏ qua test thương mại", text: "Đừng tốn tiền test 'đo chỉ số EQ'; tập trung luyện kỹ năng thành phần cụ thể." },
          ],
        },
        {
          heading: "Cognitive vs affective empathy & compassion bền vững",
          evidence: "strong",
          mechanism: "Đồng cảm nhận thức (hiểu trạng thái tinh thần người khác) và cảm xúc (cùng cảm nhận) là hai hệ thần kinh phần lớn tách biệt. Nhận thức luyện được, ít kiệt sức; cảm xúc quá mức không điều tiết dễ 'empathic distress' và burnout.",
          expertNote: "Singer: 'empathic distress' (chìm trong nỗi đau người khác) kích hoạt mạch đau, dẫn né tránh/kiệt sức; 'compassion' (quan tâm ấm áp + động lực giúp) kích hoạt mạch phần thưởng/gắn kết, bền vững — và luyện được qua thiền compassion. Với người làm nghề hỗ trợ hoặc có xu hướng 'thấm' cảm xúc người khác, chuyển từ distress sang compassion là kỹ năng chống burnout then chốt. Đồng cảm cũng có thiên kiến (thiên vị người giống mình, 'in-group') — nên đồng cảm nhận thức + nguyên tắc công bằng đáng tin hơn đồng cảm cảm xúc thuần cho quyết định đạo đức.",
          theory: "Singer (empathy vs compassion); Bloom ('Against Empathy' — phê phán đồng cảm cảm xúc trong quyết định đạo đức).",
          controversy: "Trực giác 'đồng cảm càng nhiều càng tốt' bỏ qua chi phí và thiên kiến của đồng cảm cảm xúc.",
          application: [
            { domain: "Giao tiếp/đàm phán", text: "Trước cuộc họp khó, viết ra 'bên kia đang lo/muốn/sợ gì' (đồng cảm nhận thức) — cải thiện kết quả mà không kiệt sức." },
            { domain: "Chống burnout cảm xúc", text: "Nếu dễ chìm vào cảm xúc người khác, chuyển 'cảm cùng nỗi đau' sang 'quan tâm và muốn giúp' (compassion có điều tiết) — bền vững hơn." },
            { domain: "Quyết định công bằng", text: "Với quyết định ảnh hưởng nhiều người, bổ sung nguyên tắc công bằng cho đồng cảm — đồng cảm cảm xúc thiên vị người giống mình/hiện diện trước mắt." },
          ],
        },
        {
          heading: "Active constructive responding & capitalization",
          evidence: "moderate",
          mechanism: "Cách phản ứng với TIN VUI của người khác dự báo chất lượng quan hệ mạnh hơn cách phản ứng với tin buồn. Chỉ kiểu chủ động-tích cực (hỏi han, cùng hân hoan) nuôi dưỡng quan hệ.",
          expertNote: "Gable: 'capitalization' — chia sẻ tin vui và được đáp ứng nhiệt tình — tăng cả sự hài lòng quan hệ lẫn wellbeing của người chia sẻ, một cơ chế xây quan hệ ít được chú ý (đa số dồn năng lượng vào an ủi lúc buồn). Bốn kiểu đáp: chủ động-tích cực (xây), thụ động-tích cực ('ừ hay'), chủ động-tiêu cực (dội nước lạnh/vạch rủi ro), thụ động-tiêu cực (lờ). Chủ động-tiêu cực đặc biệt hại dù ngụy trang là 'thực tế/lo cho bạn'.",
          theory: "Gable (capitalization, active constructive responding).",
          controversy: "Effect size vừa; nhưng là đòn bẩy quan hệ cụ thể, tần suất cao, dễ bỏ qua.",
          application: [
            { domain: "Quan hệ hằng ngày", text: "Khi người thân/đồng nghiệp báo tin vui, đáp chủ động-tích cực: câu hỏi mở, hào hứng thật, để họ kể chi tiết — thay vì 'ừ tốt đấy' rồi đổi chủ đề." },
            { domain: "Tránh dội nước lạnh", text: "Kìm phản xạ 'vạch rủi ro' ngay khi ai đó khoe kế hoạch — chủ động-tiêu cực hại quan hệ dù ngụy trang là 'góp ý thực tế'; hãy hân hoan trước, góp ý sau nếu được hỏi." },
            { domain: "Nuôi quan hệ ít tốn", text: "Đây là hành vi nhỏ tần suất cao — đòn bẩy quan hệ hiệu quả nhất trên mỗi đơn vị nỗ lực." },
          ],
        },
        {
          heading: "Giao tiếp phi bạo lực, lắng nghe & xung đột kiến tạo",
          evidence: "contested",
          mechanism: "NVC (Rosenberg) cấu trúc xung đột 4 bước: quan sát (không phán xét) → cảm xúc → nhu cầu → yêu cầu cụ thể — tách sự kiện khỏi diễn giải để giảm phòng thủ.",
          expertNote: "Bằng chứng thực nghiệm cho NVC còn hạn chế, nhưng các thành phần có nền vững hơn: 'I-statements' vs 'you-statements' (giảm phòng thủ), lắng nghe phản chiếu (active listening — diễn đạt lại để xác nhận hiểu, tăng cảm giác được nghe), và tách quan sát khỏi diễn giải. Kỹ năng expert bổ sung: phân biệt xung đột nhiệm vụ (về ý tưởng — có thể lành mạnh, cải thiện quyết định) vs xung đột quan hệ (công kích cá nhân — luôn hại); chuyển hóa cái sau thành cái trước. 'Steelmanning' đối phương trong tranh luận (diễn đạt lại quan điểm họ mạnh đến mức họ gật đầu) trước khi phản biện — xây lòng tin và tư duy tốt hơn.",
          theory: "Rosenberg (NVC); Gottman (I-statements); nghiên cứu task vs relationship conflict.",
          controversy: "Nền bằng chứng định lượng của NVC nguyên bản còn yếu so với độ phổ biến — dùng như cấu trúc thực hành, không phải phương pháp đã kiểm chứng nghiêm.",
          application: [
            { domain: "Xung đột thân mật", text: "Tách 'quan sát' khỏi 'diễn giải': 'Em thấy anh về muộn 3 lần tuần này' (quan sát) thay vì 'Anh chẳng bao giờ quan tâm' (phán xét); kết bằng yêu cầu CỤ THỂ khả thi." },
            { domain: "Lắng nghe", text: "Trước khi phản hồi, diễn đạt lại điều vừa nghe ('ý em là...?') để xác nhận hiểu — tăng cảm giác được nghe, giảm leo thang." },
            { domain: "Tranh luận công việc", text: "Steelman quan điểm đối phương trước khi phản biện; giữ xung đột ở mức NHIỆM VỤ (về ý tưởng), không để trượt sang QUAN HỆ (công kích cá nhân)." },
            { domain: "Cho–nhận phản hồi", text: "Tách hành vi cụ thể khỏi con người ('báo cáo này thiếu X' không phải 'bạn cẩu thả'); khi nhận phản hồi, tách giá trị bản thân khỏi nội dung để nghe được phần hữu ích." },
          ],
        },
      ],
    },

    {
      label: "Học hỏi & Trải nghiệm",
      sections: [
        {
          heading: "Testing effect, spacing & generation",
          evidence: "strong",
          mechanism: "Truy xuất chủ động (retrieval) tái cấu trúc mạng liên kết mạnh hơn đọc lại thụ động. 'Illusion of fluency' khiến đánh giá thấp tự đố.",
          expertNote: "Bộ ba nguyên lý mạnh nhất (Bjork, Dunlosky meta-analysis): retrieval practice, spaced practice (giãn cách, lặp tăng dần), interleaving. Bổ sung: 'generation effect' (tự tạo câu trả lời trước khi xem đáp án khắc sâu hơn được cho sẵn), 'elaborative interrogation' (tự hỏi 'tại sao điều này đúng'), 'self-explanation' (giải thích cho chính mình). Ngược lại: highlight và đọc lại — phổ biến nhất nhưng kém hiệu quả nhất. 'Desirable difficulty' là nguyên lý bao trùm: nỗ lực truy xuất càng khó (mà vẫn thành công) càng khắc sâu.",
          theory: "Roediger & Karpicke; Bjork; Dunlosky (meta-analysis kỹ thuật học).",
          controversy: "Cảm giác chủ quan lúc học thường đi ngược hiệu quả ghi nhớ thật.",
          application: [
            { domain: "CBAP/ngôn ngữ", text: "Sau mỗi phần, gấp tài liệu và tự viết lại điều nhớ được TRƯỚC khi xem lại (retrieval + generation); dùng Anki cho spaced repetition." },
            { domain: "Hiểu sâu", text: "Elaborative interrogation: với mỗi khái niệm mới hỏi 'tại sao điều này đúng/quan trọng'; tự giải thích lại bằng lời mình (Feynman technique)." },
            { domain: "Chấp nhận khó", text: "Cảm giác 'khó/không trôi chảy' khi tự đố là dấu hiệu đang học thật (desirable difficulty), không phải phương pháp sai." },
            { domain: "Bỏ thói quen kém", text: "Giảm highlight và đọc lại — phổ biến nhưng kém hiệu quả; chuyển thời gian đó sang tự kiểm tra." },
          ],
        },
        {
          heading: "Cognitive Load Theory & thiết kế học liệu",
          evidence: "strong",
          mechanism: "Working memory có dung lượng rất hạn chế — ước lượng hiện đại ~4 'khối' (Cowan), điều chỉnh từ con số '7±2' cổ điển của Miller; con số phụ thuộc mạnh vào việc CHUNKING (một chuyên gia gộp nhiều mẩu thành một khối) nên 'dung lượng' là tương đối, không phải hằng số cứng. Tài liệu áp 'extraneous load' (thiết kế kém) cạnh tranh với 'germane load' (xây schema).",
          expertNote: "Chuyên gia: schema hóa giải phóng working memory — chuyên gia 'chunk' thông tin thành đơn vị lớn (kiện tướng cờ nhớ thế cờ theo mẫu, không từng quân), nên có vẻ 'nhớ nhiều hơn' nhưng thực ra dùng ít working memory hơn nhờ schema. Hệ quả: người mới cần scaffolding (worked examples), chuyên gia cần bài toán mở (expertise reversal effect — cái tốt cho người mới có thể cản chuyên gia). Split-attention và redundancy (lặp thừa) đều tăng extraneous load.",
          theory: "Sweller (CLT); Chase & Simon (chunking chuyên gia); expertise reversal effect.",
          controversy: "Đo working memory và load còn gián tiếp.",
          application: [
            { domain: "Tự xây app/tài liệu", text: "Đặt hình + chú thích cạnh nhau (tránh split-attention); giới hạn số ý mới mỗi màn; dùng worked examples cho người mới." },
            { domain: "Học nhanh lĩnh vực mới", text: "Chủ động xây schema: tìm khung tổ chức tổng thể TRƯỚC khi nhồi chi tiết — chi tiết gắn vào schema dễ nhớ hơn chi tiết rời." },
            { domain: "Tùy trình độ", text: "Khi đã thành thạo, chuyển từ ví dụ mẫu sang bài toán mở/tự tạo — expertise reversal: scaffolding thừa cản người đã giỏi." },
          ],
        },
        {
          heading: "Interleaving, deliberate practice & phản hồi",
          evidence: "strong",
          mechanism: "Xen kẽ chủ đề tạo mạng liên kết linh hoạt hơn học khối. Deliberate practice: mục tiêu ngoài vùng thoải mái + phản hồi tức thì + lặp có chủ đích + nhắm điểm yếu.",
          expertNote: "Yếu tố khan hiếm nhất trong tự học là VÒNG PHẢN HỒI chất lượng — đa số 'luyện tập' thiếu phản hồi nên lặp lại lỗi. Với kỹ năng có đáp án đúng/sai rõ (toán, code, ngữ pháp) phản hồi dễ; với kỹ năng mở (viết, nói, lãnh đạo) cần thiết kế phản hồi (ghi âm tự đánh giá, mentor, rubric). 'Feedback' hiệu quả nhất là về QUÁ TRÌNH và hướng cải thiện cụ thể, không phải khen/chê chung. Hambrick: deliberate practice cần nhưng không đủ — năng khiếu ban đầu vẫn đóng vai trò ở đỉnh cao.",
          theory: "Bjork (interleaving); Ericsson (deliberate practice); Hattie (feedback).",
          controversy: "'10.000 giờ' đơn giản hóa quá mức; xen kẽ khó chịu hơn nên hay bị bỏ.",
          application: [
            { domain: "Ngôn ngữ (Trung/Anh)", text: "Xen kẽ hai ngôn ngữ/dạng bài trong cùng buổi; điều còn thiếu thường là phản hồi — ghi âm mình nói rồi nghe lại, hoặc nhờ người/AI sửa cụ thể." },
            { domain: "Nhắm điểm yếu", text: "Mỗi buổi tập trung 1 điểm yếu cụ thể (thanh điệu tiếng Trung, một cấu trúc hay sai) thay vì luyện dàn trải thoải mái." },
            { domain: "Kỹ năng mở", text: "Với viết/thuyết trình, tạo rubric hoặc dùng mentor/AI làm vòng phản hồi — không có phản hồi thì 'luyện nhiều' chỉ khắc sâu lỗi." },
          ],
        },
        {
          heading: "Metacognition, transfer & giới hạn brain-training",
          evidence: "moderate",
          mechanism: "Metacognition (nghĩ về cách mình nghĩ/học) điều phối chiến lược học. Transfer xa (áp kỹ năng sang bối cảnh mới) khó và hiếm; brain-training gần như không tạo far transfer.",
          expertNote: "Người học giỏi khác biệt chủ yếu ở metacognition: lập kế hoạch, tự giám sát ('mình có thực sự hiểu không?'), điều chỉnh chiến lược — không chỉ 'thông minh hơn'. 'Judgment of learning' (tự đánh giá đã học được chưa) thường sai lệch (illusion of fluency) — cần calibrate bằng tự kiểm tra thật. Transfer xa được hỗ trợ bởi học nguyên lý trừu tượng (không chỉ ví dụ bề mặt) và luyện đa dạng bối cảnh. Song ngữ: giá trị giao tiếp/nghề rõ ràng; 'lợi thế nhận thức tổng quát' thì tranh cãi — đừng dựa vào nó.",
          theory: "Flavell (metacognition); Barnett & Ceci (điều kiện transfer).",
          controversy: "Brain-training bị FTC phạt; 'bilingual advantage' tái lập hỗn hợp.",
          application: [
            { domain: "Metacognition", text: "Trước khi học: lập kế hoạch (mục tiêu, chiến lược). Trong khi học: tự giám sát ('mình giải thích lại được không?'). Sau: đánh giá và điều chỉnh chiến lược cho lần sau." },
            { domain: "Học để transfer", text: "Học nguyên lý trừu tượng dưới các ví dụ, và luyện áp dụng trong nhiều bối cảnh khác nhau — tăng khả năng transfer sang tình huống mới." },
            { domain: "Ưu tiên", text: "Chuyển thời gian 'game luyện não' sang kỹ năng thật (ngôn ngữ, phân tích) — cùng nỗ lực, giá trị chuyển giao cao hơn nhiều." },
          ],
        },
      ],
    },

    {
      label: "Tự điều chỉnh",
      sections: [
        {
          heading: "Habit loop, automaticity & thiết kế cue",
          evidence: "strong",
          mechanism: "Thói quen mã hóa ở basal ganglia như chuỗi cue→routine→reward; không cần vỏ não trước trán khi tự động hóa. Ý chí (vỏ não trước trán) là nguồn hữu hạn.",
          expertNote: "Con số '~43% hành vi là thói quen' (Wood, Quinn & Kashy 2002) hay bị trích sai — nghiên cứu gốc đo tỷ lệ hành vi được thực hiện 'gần như hằng ngày VÀ thường ở cùng địa điểm', một proxy cho tính thói quen, không phải phép đo trực tiếp 'tự động hóa'; hãy đọc nó như bậc độ lớn. '66 ngày trung bình để hình thành thói quen' (Lally) có biến thiên rất lớn (18–254 ngày) — chống lại huyền thoại '21 ngày'. Điều VỮNG: đòn bẩy mạnh nhất là CUE (ngữ cảnh) và giảm ma sát, không phải động lực (dao động). 'Habit stacking' và 'temptation bundling' tăng tuân thủ. Thay đổi bối cảnh lớn (chuyển nhà, đổi việc) là 'cửa sổ' vàng đổi thói quen vì cue cũ bị phá.",
          theory: "Wood & Neal; Lally (thời gian hình thành thói quen); Milkman (temptation bundling).",
          controversy: "Thay đổi dựa 'ý chí' kém bền hơn nhiều so với thay đổi cue.",
          application: [
            { domain: "Habit stacking", text: "Gắn thói quen mới vào cue có sẵn: 'sau khi pha cà phê sáng → mở tài liệu tiếng Trung 10 phút'." },
            { domain: "Thiết kế môi trường", text: "Cue vật lý: để đồ tập ra sẵn tối trước; tách không gian làm việc khỏi nghỉ dù ở nhà; tăng ma sát cho thói xấu (đăng xuất mạng xã hội)." },
            { domain: "Temptation bundling", text: "Ghép việc nên làm với việc thích: chỉ nghe podcast/nhạc yêu thích khi đang tập hoặc làm việc nhà chán." },
            { domain: "Cửa sổ thay đổi", text: "Tận dụng thay đổi bối cảnh lớn (chuyển nhà, đổi vai trò) để cài thói quen mới — cue cũ bị phá là lúc dễ đổi nhất." },
          ],
        },
        {
          heading: "Motivation, goals & hệ thống vs mục tiêu",
          evidence: "moderate",
          mechanism: "Động lực dao động và không đáng tin để dựa vào dài hạn. Mục tiêu (đích) khác hệ thống (quy trình lặp lại). Present bias khiến ưu tiên phần thưởng gần.",
          expertNote: "Phân biệt expert: mục tiêu cho hướng, HỆ THỐNG cho tiến bộ — người thành công tối ưu quy trình lặp lại hơn ám ảnh đích. Fogg Behavior Model: hành vi = động lực × khả năng × trigger; khi động lực thấp, giảm ĐỘ KHÓ (tiny habits) hiệu quả hơn cố tăng động lực. 'Goal gradient' (nỗ lực tăng khi gần đích) và 'fresh start effect' (mốc thời gian mới tăng động lực khởi động) là đòn bẩy thời điểm. Nguy cơ mục tiêu: 'arrival fallacy' (đạt xong thấy trống rỗng) và bỏ cuộc khi lệch — nên gắn danh tính ('mình là người tập đều') hơn kết quả ('giảm 5kg').",
          theory: "Fogg (behavior model, tiny habits); Clear (systems vs goals); Dai (fresh start effect).",
          controversy: "Ego depletion (ý chí cạn như cơ) không tái lập được — đừng thiết kế quanh giả định đó.",
          application: [
            { domain: "Hệ thống hóa", text: "Định nghĩa thành công theo quy trình lặp lại ('học 20 phút mỗi sáng') hơn đích ('đạt HSK 4') — quy trình bạn kiểm soát được, đích thì không hoàn toàn." },
            { domain: "Khi động lực thấp", text: "Thu nhỏ hành vi tới mức không thể từ chối (tiny habits: '1 câu tiếng Trung', '1 hiệp squat') thay vì cố ép động lực; nhỏ mà đều thắng lớn mà đứt." },
            { domain: "Danh tính", text: "Đóng khung theo danh tính ('mình là người đọc sách') hơn kết quả — mỗi hành động nhỏ là 'phiếu bầu' cho con người muốn trở thành." },
            { domain: "Fresh start", text: "Dùng mốc thời gian (đầu tháng, sinh nhật, năm mới) để khởi động thay đổi — hiệu ứng khởi đầu mới tăng động lực tự nhiên." },
          ],
        },
        {
          heading: "Choice architecture, defaults & commitment devices",
          evidence: "strong",
          mechanism: "Mặc định, đóng khung, thứ tự lựa chọn ảnh hưởng hệ thống đến quyết định — mặc định đặc biệt mạnh vì đòi hỏi nỗ lực để từ chối.",
          expertNote: "Áp cho môi trường CÁ NHÂN, bạn vừa là kiến trúc sư vừa là người chọn — 'self-nudging'. Commitment devices (Ulysses contracts) ràng buộc bản thân tương lai: tự động hóa tài chính, app chặn, đặt cược xã hội (hứa công khai/cược tiền), khóa cứng lựa chọn. Friction là công cụ hai chiều: giảm ma sát cho hành vi tốt, tăng ma sát cho xấu (mỗi bước thêm giảm mạnh tỷ lệ thực hiện). 'Bright-line rules' (quy tắc tuyệt đối không thương lượng — 'không rượu ngày thường') dễ giữ hơn quy tắc mờ ('uống điều độ') vì loại bỏ đàm phán nội tâm mỗi lần.",
          theory: "Thaler & Sunstein (nudge); Ariely (commitment); bright-line rules.",
          controversy: "Ranh giới nudge–thao túng tranh luận ở chính sách; với môi trường cá nhân ít gây tranh cãi.",
          application: [
            { domain: "Mặc định cá nhân", text: "Đặt hành vi tốt làm mặc định: khối lịch deep-work cố định; đồ ăn lành mạnh để tầm mắt, đồ vặt cất khuất; app học mở sẵn." },
            { domain: "Commitment devices", text: "Tự động hóa tiết kiệm/đầu tư ngày nhận lương; để điện thoại phòng khác khi làm sâu; hứa công khai/đặt cược cho mục tiêu quan trọng." },
            { domain: "Bright-line rules", text: "Với thói quen hay 'thương lượng lại', đặt quy tắc tuyệt đối ('không mạng xã hội trước 12h trưa') — dễ giữ hơn 'hạn chế' vì loại bỏ đàm phán nội tâm." },
            { domain: "Ma sát hai chiều", text: "Đếm số bước tới hành vi: rút ngắn đường tới việc tốt, kéo dài đường tới việc xấu — mỗi bước thêm/bớt thay đổi tỷ lệ thực hiện đáng kể." },
          ],
        },
        {
          heading: "Implementation intentions & attention management",
          evidence: "strong",
          mechanism: "Cấu trúc 'nếu X thì Y' tạo liên kết cue–response mạnh hơn mục tiêu chung, chuyển quyết định từ lúc hành động (ý chí thấp) sang lúc lập kế hoạch (ý chí cao).",
          expertNote: "Meta-analysis: một trong các can thiệp effect size lớn nhất. Mở rộng expert sang QUẢN LÝ CHÚ Ý (nguồn lực khan hiếm thật của thời đại, hơn cả thời gian): deep work (Newport) cần khối thời gian không gián đoạn cho việc nhận thức nặng; chi phí 'context switching' và 'attention residue' (dư âm chú ý khi chuyển task) làm giảm hiệu suất; đa nhiệm là ảo tưởng (thực chất chuyển đổi nhanh, tốn kém). 'Ulysses' cho gián đoạn: chặn thông báo theo mặc định, gom việc vụn thành batch, bảo vệ 1–2 khối deep-work/ngày.",
          theory: "Gollwitzer (implementation intentions); Newport (deep work); Leroy (attention residue).",
          controversy: "Hiệu quả giảm nếu cue không đủ cụ thể.",
          application: [
            { domain: "If-then cụ thể", text: "'Nếu 6h sáng thứ Hai, thì mặc đồ tập ngay khi ra khỏi giường'; chuẩn bị sẵn if-then cho trở ngại: 'nếu lỡ buổi sáng, thì bù 20 phút trưa'." },
            { domain: "Deep work", text: "Bảo vệ 1–2 khối thời gian không gián đoạn/ngày cho việc phân tích nặng; tắt thông báo mặc định; gom email/tin nhắn thành vài batch cố định." },
            { domain: "Attention residue", text: "Hoàn tất hoặc 'đóng vòng' (ghi lại điểm dừng) một task trước khi chuyển sang task khác — giảm dư âm chú ý kéo theo." },
            { domain: "Chống đa nhiệm", text: "Đơn nhiệm có chủ đích cho việc quan trọng; chấp nhận 'đa nhiệm' chỉ cho việc nhẹ (đi bộ + podcast), không cho việc nhận thức nặng." },
          ],
        },
      ],
    },
  ],
};
const REMAINING_PILLARS = [
  {
    id: "work",
    num: "04",
    icon: Briefcase,
    title: "Công việc & Thành tựu",
    subtitle: "Động lực, mastery, burnout, career capital, tài chính hành vi",
    groups: [
      {
        label: "Động lực & mục đích",
        sections: [
          {
            heading: "Self-Determination Theory & chất lượng động lực",
            evidence: "strong",
            mechanism: "Autonomy, Competence, Relatedness — ba nhu cầu tâm lý phổ quát. Đáp ứng → động lực nội tại và wellbeing; bị chặn → cạn kiệt, mất động lực.",
            expertNote: "SDT không nhị phân nội tại/ngoại tại mà là PHỔ nội hóa: từ external (ép buộc) → introjected (làm vì tội lỗi/thể diện) → identified (thấy giá trị cá nhân) → integrated (hợp với bản sắc). Mục tiêu là dịch động lực về phía tích hợp, không nhất thiết 'thuần nội tại'. Overjustification effect: thưởng ngoại tại làm xói động lực nội tại NẾU cảm nhận là kiểm soát, KHÔNG nếu cảm nhận là công nhận năng lực. 'Autonomy' không phải độc lập tuyệt đối mà là cảm giác đồng thuận nội tâm với hành động — có thể tự chủ ngay trong ràng buộc.",
            theory: "Deci & Ryan (SDT, phổ nội hóa).",
            controversy: "Overjustification tùy cách đóng khung thưởng (kiểm soát vs công nhận).",
            application: [
              { domain: "Đánh giá pivot", text: "Chấm mỗi lựa chọn trên autonomy/competence/relatedness (1–5), không chỉ lương; vai trò lương cao nhưng bóp nghẹt autonomy thường không bền vững." },
              { domain: "Dịch động lực", text: "Với việc 'phải làm' (CBAP), tìm lý do IDENTIFIED ('kỹ năng này mở cửa pivot mình muốn') thay vì INTROJECTED ('sợ tụt hậu') — nội hóa sâu hơn giúp bền hơn." },
              { domain: "Tự chủ trong ràng buộc", text: "Ngay trong công việc bị giao, tìm khoảng tự quyết (cách làm, thứ tự, góc tiếp cận) — autonomy là cảm giác đồng thuận, không cần tự do tuyệt đối." },
            ],
          },
          {
            heading: "Meaning vs happiness & mattering",
            evidence: "moderate",
            mechanism: "Hạnh phúc gắn NHẬN, ít stress, hiện tại. Ý nghĩa gắn CHO ĐI, tích hợp quá khứ-hiện tại-tương lai, thường NHIỀU stress hơn.",
            expertNote: "Ba trụ ý nghĩa (nghiên cứu tổng hợp): coherence (đời có mạch lạc, hiểu được), purpose (có mục tiêu/hướng), significance/mattering (đời mình có giá trị, quan trọng với ai đó). 'Mattering' — cảm giác mình quan trọng với người khác — là thành phần bị bỏ quên nhưng dự báo mạnh chống trầm cảm/tuyệt vọng. Ý nghĩa không cần 'vĩ đại': ý nghĩa hằng ngày (khoảnh khắc kết nối, hoàn thành, cái đẹp) tích lũy. Baumeister: theo đuổi hạnh phúc thuần có thể nghịch lý làm giảm nó ('paradox of hedonism'); theo đuổi ý nghĩa/mục tiêu ngoài bản thân thường kéo theo hạnh phúc.",
            theory: "Baumeister; Martela & Steger (coherence/purpose/significance); Prilleltensky (mattering).",
            controversy: "Tối ưu hạnh phúc và ý nghĩa có thể xung đột ngắn hạn.",
            application: [
              { domain: "Quyết định lớn", text: "Chấm riêng: 'việc này làm mình vui hơn hằng ngày?' và 'ý nghĩa hơn?' — đừng gộp; chấp nhận lựa chọn ý nghĩa (ngành mới khó) có thể giảm hạnh phúc ngắn hạn." },
              { domain: "Mattering", text: "Nuôi cảm giác 'mình quan trọng với ai đó' — mentoring, đóng góp cộng đồng, hiện diện cho người thân — thành phần ý nghĩa chống tuyệt vọng mạnh nhất." },
              { domain: "Ý nghĩa hằng ngày", text: "Không chờ 'sứ mệnh lớn'; để ý và tăng khoảnh khắc kết nối/hoàn thành/cái đẹp nhỏ mỗi ngày — ý nghĩa tích lũy từ đây." },
            ],
          },
          {
            heading: "Job crafting & thiết kế công việc",
            evidence: "moderate",
            mechanism: "Tái định hình ranh giới nhiệm vụ, quan hệ, khung nhận thức của công việc hiện có để tăng ý nghĩa mà không đổi chức danh.",
            expertNote: "Ba loại (Wrzesniewski): task (đổi phạm vi/cách làm nhiệm vụ), relational (đổi ai mình tương tác và sâu tới đâu), cognitive (đổi cách mình DIỄN GIẢI ý nghĩa công việc — vd người lao công bệnh viện thấy mình 'giúp bệnh nhân hồi phục' vs 'lau dọn'). Job Demands-Resources: crafting để tăng resources (tự chủ, hỗ trợ, cơ hội học) và 'challenge demands' (thử thách tốt), giảm 'hindrance demands' (cản trở vô nghĩa). Giới hạn: crafting không cứu được công việc xung đột căn bản với giá trị.",
            theory: "Wrzesniewski & Dutton (job crafting); Bakker (JD-R).",
            controversy: "Giới hạn khi cấu trúc tổ chức quá cứng.",
            application: [
              { domain: "Thử ngành mới rủi ro thấp", text: "Task crafting: xin dự án chạm fintech/capital markets/ESG trong vai trò BA hiện tại — tích lũy kinh nghiệm liên quan trước khi pivot hẳn." },
              { domain: "Relational crafting", text: "Chủ động kết nối với người trong ngành mục tiêu ngay từ vai trò hiện tại — thử nghiệm và xây cầu nối." },
              { domain: "Cognitive crafting", text: "Diễn giải lại công việc BA hiện tại theo giá trị lớn hơn nó phục vụ (giúp khách hàng ra quyết định tốt) — tăng ý nghĩa mà không đổi việc." },
            ],
          },
        ],
      },
      {
        label: "Thành tựu & hiệu suất",
        sections: [
          {
            heading: "Achievement goals, grit & giới hạn của nó",
            evidence: "moderate",
            mechanism: "Mastery goals (tiến bộ bản thân) → động lực nội tại, kiên trì. Performance-avoidance (tránh trông kém) → lo âu, giảm hiệu suất dưới áp lực.",
            expertNote: "Grit (Duckworth — kiên trì + đam mê dài hạn) phổ biến nhưng bằng chứng bị điều chỉnh: phần lớn giá trị dự báo của grit trùng lặp với conscientiousness (một đặc điểm Big Five), và effect size khiêm tốn hơn quảng bá ban đầu. Mặt tối của grit: kiên trì mù quáng với mục tiêu sai là 'sunk cost' được tôn vinh — đôi khi BỎ đúng lúc (strategic quitting — Godin/Duke) khôn hơn kiên trì. Kỹ năng expert: phân biệt 'kiên trì đáng giá' (đường cong học tập còn dốc) với 'ngoan cố' (đã bình nguyên/sai hướng).",
            theory: "Dweck/Elliot (achievement goals); Duckworth (grit); Duke (knowing when to quit).",
            controversy: "Grit trùng lặp conscientiousness; 'không bao giờ bỏ cuộc' bỏ qua giá trị của bỏ đúng lúc.",
            application: [
              { domain: "Khung mục tiêu", text: "Diễn đạt theo mastery ('thành thạo định giá DCF') thay vì so sánh ('không thua đồng nghiệp'); khi thấy lo âu so sánh, quay về 'mình tiến bộ gì so với tháng trước'." },
              { domain: "Quyết định bỏ/tiếp", text: "Định kỳ hỏi: đường cong học/lợi ích còn dốc (đáng kiên trì) hay đã bình nguyên/sai hướng (nên bỏ chiến lược)? — tránh tôn vinh sunk cost thành 'grit'." },
              { domain: "Đa track", text: "Với nhiều mục tiêu song song, chủ động bỏ bớt cái lợi ích cận biên đã cạn để dồn nguồn lực — bỏ chiến lược là kỹ năng, không phải thất bại." },
            ],
          },
          {
            heading: "Burnout, engagement & recovery",
            evidence: "strong",
            mechanism: "Burnout 3 chiều: kiệt sức cảm xúc, hoài nghi/tách rời, giảm hiệu quả cá nhân. JD-R: burnout khi demands vượt resources kéo dài.",
            expertNote: "Sáu nguồn mismatch gây burnout (Maslach): quá tải, thiếu kiểm soát, thiếu công nhận/thưởng, thiếu cộng đồng, thiếu công bằng, xung đột giá trị — burnout không chỉ do 'làm nhiều' mà do MẤT KHỚP ở các chiều này (xung đột giá trị và bất công đặc biệt độc). Recovery expert (Sonnentag): phục hồi cần 4 yếu tố — psychological detachment (thực sự ngắt khỏi công việc trong đầu), relaxation, mastery (hoạt động thử thách khác ngoài việc), control (tự chủ thời gian rảnh). 'Nghỉ' mà vẫn nghĩ về việc không phục hồi. Đối lập burnout không phải nghỉ ngơi mà là engagement (năng lượng + tận tâm + đắm chìm).",
            theory: "Maslach (6 mismatch); Sonnentag (recovery); Schaufeli (engagement).",
            controversy: "Không phải chẩn đoán y khoa chính thức (ICD-11 công nhận là hiện tượng nghề nghiệp).",
            application: [
              { domain: "Chẩn đoán sớm", text: "Tự chấm 3 chiều Maslach mỗi tháng (1–5); hoài nghi/tách rời thường tăng TRƯỚC kiệt sức — tín hiệu giảm tải sớm." },
              { domain: "Tìm đúng nguồn", text: "Khi burnout, dò 6 mismatch: không chỉ 'làm ít lại' mà kiểm xung đột giá trị/bất công/thiếu kiểm soát — thường là gốc thật hơn khối lượng." },
              { domain: "Phục hồi chất lượng", text: "Đảm bảo 4 yếu tố recovery: thực sự NGẮT khỏi việc trong đầu (không chỉ rời bàn), thư giãn, có hoạt động mastery khác (chạy, học nhạc), tự chủ giờ rảnh." },
              { domain: "Đa track", text: "Nếu điểm hoài nghi tăng, cắt bớt một track thay vì ép; tăng resources (tự chủ, hỗ trợ, kỹ năng) cũng chống burnout, không chỉ giảm tải." },
            ],
          },
          {
            heading: "Career capital, so-good & deliberate positioning",
            evidence: "moderate",
            mechanism: "Kỹ năng hiếm và có giá trị thị trường (career capital) là đòn bẩy chính để có công việc tự chủ/ý nghĩa — không phải 'theo đuổi đam mê' trước.",
            expertNote: "Newport: 'be so good they can't ignore you' — đam mê thường PHÁT TRIỂN sau khi đạt năng lực cao (khớp SDT: competence nuôi hứng thú). Mở rộng: 'skill stacking' (Adams) — kết hợp vài kỹ năng ở mức khá (không cần đỉnh cao ở một cái) tạo lợi thế hiếm ở giao điểm (vd BA + tài chính + hiểu ngành VN + tiếng Anh/Trung = tổ hợp hiếm). 'T-shaped' (sâu một lĩnh vực + rộng nhiều lĩnh vực). Trong thời AI, giá trị dịch về phán đoán, tích hợp liên miền, và kỹ năng con người khó tự động hóa — định vị career capital theo hướng đó.",
            theory: "Newport (career capital); Adams (skill stacking); T-shaped skills.",
            controversy: "Chủ yếu dựa quan sát/case study hơn thực nghiệm.",
            application: [
              { domain: "Định vị pivot", text: "Xác định 1–2 kỹ năng hiếm-có-giá-trị để xây có chủ đích (định giá + hiểu sâu một ngành VN) thay vì chờ 'tìm đam mê'." },
              { domain: "Skill stack", text: "Tận dụng tổ hợp sẵn có (BA + nền tài chính + song ngữ + hiểu thị trường VN) làm lợi thế hiếm ở giao điểm — pivot dựa vốn sẵn ít rủi ro hơn nhảy sang lĩnh vực trắng." },
              { domain: "Chống AI-disruption", text: "Đầu tư vào phán đoán, tích hợp liên miền, giao tiếp/quản lý bên liên quan — phần khó tự động hóa; dùng AI làm đòn bẩy, không cạnh tranh với nó ở việc nó giỏi." },
            ],
          },
          {
            heading: "Imposter phenomenon & Dunning-Kruger",
            evidence: "moderate",
            mechanism: "Imposter: cảm giác thành công là may mắn/lừa dối, sợ bị 'phát hiện', bất kể bằng chứng. Ngược cực: Dunning-Kruger — người kém kỹ năng đánh giá quá cao năng lực vì thiếu năng lực để nhận ra thiếu sót.",
            expertNote: "Hai hiện tượng vẽ một nghịch lý hữu ích: người GIỎI thường nghi ngờ bản thân (imposter, vì thấy được độ phức tạp và người giỏi hơn), người KÉM thường tự tin thái quá (D-K). Hệ quả expert: cảm giác nghi ngờ khi vào lĩnh vực mới có thể là DẤU HIỆU bạn đang thấy được độ sâu thật — không phải bằng chứng bất tài. 'Beginner's confidence' rồi 'valley of despair' (nhận ra mình chưa biết gì) là đường cong học tập bình thường. Lưu ý: D-K bị một số phê phán về hiện vật thống kê, nhưng lõi định tính (thiếu năng lực cản tự đánh giá) vẫn hữu ích.",
            theory: "Clance & Imes (imposter); Kruger & Dunning.",
            controversy: "Cả hai không phải phân loại lâm sàng; D-K có tranh luận thống kê.",
            application: [
              { domain: "Chuyển ngành", text: "Chuẩn bị: cảm giác 'imposter' gần như chắc chắn xuất hiện khi pivot; dự đoán trước để không diễn giải nó là bằng chứng thiếu năng lực." },
              { domain: "Evidence file", text: "Lưu thành tựu/phản hồi tích cực cụ thể để đối chiếu khi imposter nổi lên — dữ liệu khách quan chống cảm giác chủ quan." },
              { domain: "Đọc đường cong", text: "Khi vào lĩnh vực mới thấy 'mình chẳng biết gì' (valley of despair), hiểu đó là pha bình thường sau khi thấy được độ sâu thật — dấu hiệu tiến bộ, không phải bất tài." },
            ],
          },
        ],
      },
      {
        label: "Tài chính hành vi",
        sections: [
          {
            heading: "Prospect theory, loss aversion & behavior gap",
            evidence: "strong",
            mechanism: "Mất mát đau ~2–2.5 lần khoái cảm từ lợi tương đương. Behavior gap: lợi nhuận nhà đầu tư thực nhận thấp hơn lợi nhuận quỹ họ đầu tư — do timing cảm xúc.",
            expertNote: "Prospect theory sâu hơn loss aversion: con người đánh giá theo THAY ĐỔI so với điểm tham chiếu (không phải mức tuyệt đối), 'diminishing sensitivity' (chênh 100–200 cảm nhận mạnh hơn 1100–1200), và tìm kiếm rủi ro trong miền lỗ (giữ khoản lỗ hy vọng gỡ) nhưng né rủi ro trong miền lời (chốt lời sớm) — chính là 'disposition effect' phá vỡ 'cắt lỗ để lãi chạy'. Điểm tham chiếu điều khiển tất cả, và nó dịch chuyển (adaptation) — nên hạnh phúc tài chính là đường chạy (hedonic treadmill).",
            theory: "Kahneman & Tversky (prospect theory); Shefrin & Statman (disposition effect).",
            controversy: "Chênh lệch behavior gap gần như hoàn toàn do thời điểm cảm xúc, không do chọn sai tài sản. QUAN TRỌNG (phản biện gần đây): hệ số loss aversion ~2–2.5 (λ≈2.25) đến từ các paradigm cá cược cụ thể và KHÔNG phổ quát như thường được trình bày — Gal & Rucker (2018) và các tác giả khác cho thấy loss aversion phụ thuộc mạnh vào bối cảnh, cách đóng khung, và độ lớn khoản tiền; đôi khi biến mất hoặc đảo chiều với khoản nhỏ. Coi nó là một khuynh hướng phổ biến, không phải hằng số của bản chất con người.",
            application: [
              { domain: "Quy trình giao dịch", text: "Ghi vào decision journal luận điểm + xác suất + điều kiện thoát TRƯỚC mỗi giao dịch; viết quy tắc bán lúc đầu óc tỉnh táo, không quyết lúc thị trường biến động." },
              { domain: "Disposition effect", text: "Chống bản năng giữ khoản lỗ/chốt lời sớm: đánh giá mỗi vị thế bằng câu hỏi 'nếu chưa nắm giữ, mình có mua nó hôm nay ở giá này không?' — bỏ qua giá vốn." },
              { domain: "Điểm tham chiếu", text: "Nhận ra so sánh với 'giá mình đã mua' (điểm tham chiếu) làm méo quyết định — quyết định dựa giá trị tương lai kỳ vọng, không phải lời/lỗ so với giá vốn." },
            ],
          },
          {
            heading: "Mental accounting, framing & house money",
            evidence: "strong",
            mechanism: "Tiền được xử lý như không thay thế lẫn nhau tùy 'ngăn' tâm lý/nguồn gốc — hành vi rủi ro khác nhau theo ngăn.",
            expertNote: "Mental accounting có mặt HỮU ÍCH (envelope budgeting, tách quỹ khẩn cấp giúp kỷ luật) và mặt HẠI (house money — liều hơn với 'tiền lời'; bỏ qua tính thay thế khi tối ưu tổng thể). Framing rộng hơn: cùng lựa chọn đóng khung 'được' vs 'mất' đảo ngược quyết định; 'narrow framing' (nhìn từng khoản riêng lẻ) so với 'broad framing' (nhìn tổng danh mục) — nhìn hẹp khuếch đại loss aversion (kiểm tra danh mục quá thường xuyên gây bán tháo cảm xúc — 'myopic loss aversion').",
            theory: "Thaler (mental accounting); Benartzi & Thaler (myopic loss aversion).",
            controversy: "Cùng cơ chế vừa giúp kỷ luật vừa gây méo — cần dùng có ý thức.",
            application: [
              { domain: "Kỷ luật rủi ro", text: "Áp cùng khung quản trị rủi ro cho mọi 'ngăn' (tiền lời/thưởng/lương); cảnh giác nhất SAU chuỗi thắng — lúc house money dễ khiến vượt quy tắc." },
              { domain: "Chống myopic loss aversion", text: "Giảm tần suất kiểm tra danh mục (đầu tư dài hạn không cần xem hằng ngày); nhìn BROAD (tổng danh mục, khung thời gian dài) thay vì từng mã từng ngày." },
              { domain: "Dùng mặt tốt", text: "Vẫn tách quỹ (khẩn cấp, đầu tư, chi tiêu) để kỷ luật — chỉ cần ý thức khi tính thay thế bị bỏ qua trong tối ưu tổng thể." },
            ],
          },
          {
            heading: "Present bias, hyperbolic discounting & tự động hóa",
            evidence: "strong",
            mechanism: "Chiết khấu phần thưởng tương lai không đồng nhất — thiên 'nhỏ hơn nhưng sớm hơn' mạnh cho lựa chọn gần. Kế hoạch dài hạn dễ cam kết nhưng khó tuân thủ ở từng thời điểm.",
            expertNote: "'Present bias' tạo mâu thuẫn giữa 'bản thân hiện tại' và 'bản thân tương lai' — như hai người khác nhau. Giải pháp không phải ý chí (thất bại hệ thống) mà là commitment devices ràng buộc bản thân tương lai và tự động hóa loại bỏ điểm quyết định. 'Save More Tomorrow' (Thaler & Benartzi): cam kết TRƯỚC dành phần TĂNG lương tương lai cho tiết kiệm — né present bias vì chưa 'chạm tay' khoản đó. Tương tự áp cho mọi mục tiêu dài hạn (học, sức khỏe): loại bỏ quyết định lặp lại.",
            theory: "Laibson (hyperbolic discounting); Thaler & Benartzi (Save More Tomorrow).",
            controversy: "Ý chí đơn thuần thất bại vì đây là thiên kiến hệ thống.",
            application: [
              { domain: "Tự động hóa", text: "Lệnh chuyển đầu tư/tiết kiệm định kỳ ngay ngày nhận lương, trước khi tiền 'chạm tay' — biến present bias thành đồng minh." },
              { domain: "Save More Tomorrow", text: "Cam kết trước: mỗi lần tăng lương, tăng tỷ lệ đầu tư tự động — né cảm giác 'mất' vì chưa từng tiêu khoản đó." },
              { domain: "Áp cho phi tài chính", text: "Dùng cùng nguyên lý cho học/sức khỏe: đăng ký/trả trước lớp học, hẹn lịch cố định — loại bỏ điểm quyết định hằng ngày dễ bị present bias." },
            ],
          },
          {
            heading: "Sequence risk, ergodicity & quản trị rủi ro đuôi",
            evidence: "strong",
            mechanism: "Với dòng tiền rút đều, THỨ TỰ lãi/lỗ ảnh hưởng kết quả cuối hơn trung bình cộng — lỗ nặng giai đoạn đầu gây tổn hại khó phục hồi (% phục hồi tăng phi tuyến: lỗ 50% cần lãi 100%).",
            expertNote: "Khái niệm expert: phân biệt trung bình ENSEMBLE (nhiều người cùng lúc) với trung bình THỜI GIAN (một người qua thời gian) — 'ergodicity'. Nhiều quyết định có kỳ vọng dương theo ensemble nhưng âm theo thời gian nếu có rủi ro phá sản (một lần 'game over' xóa mọi lợi ích tích lũy). Hệ quả: TRÁNH RỦI RO ĐUÔI/phá sản quan trọng hơn tối đa hóa kỳ vọng; 'survive first, then optimize'. Kelly criterion (kích thước đặt cược tối ưu theo lợi thế) chính thức hóa việc không bao giờ đặt cược tới mức phá sản. Áp rộng: sức khỏe, danh tiếng cũng có rủi ro đuôi không hồi phục — bảo vệ trước.",
            theory: "Sequence risk (decumulation); Peters (ergodicity economics); Kelly criterion; Taleb (rủi ro đuôi).",
            controversy: "Ergodicity economics còn mới/tranh luận, nhưng trực giác 'tránh phá sản trước' vững.",
            application: [
              { domain: "Kế hoạch rút vốn", text: "Khi có dòng tiền ra đều (mua nhà trả góp, nghỉ hưu sớm), giữ đệm tiền mặt/tài sản ít biến động cho giai đoạn đầu để không buộc bán lúc thị trường xuống." },
              { domain: "Tránh phá sản", text: "Không bao giờ đặt cược/đòn bẩy tới mức một cú sốc có thể xóa sạch — 'sống sót trước, tối ưu sau'; kỳ vọng dương vô nghĩa nếu có nhánh 'game over'." },
              { domain: "Rủi ro đuôi ngoài tiền", text: "Áp tư duy này cho sức khỏe (tránh rủi ro thảm họa: tầm soát, an toàn giao thông) và danh tiếng — có những mất mát không hồi phục, bảo vệ trước là ưu tiên." },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "family",
    num: "05",
    icon: Home,
    title: "Gia đình & Mối quan hệ",
    subtitle: "Gắn kết thân mật, hệ thống gia đình, mạng lưới",
    groups: [
      {
        label: "Quan hệ thân thiết",
        sections: [
          {
            heading: "Gottman: bốn kỵ sĩ, bids & sửa chữa",
            evidence: "strong",
            mechanism: "4 hành vi dự báo đổ vỡ: chỉ trích, khinh miệt, phòng thủ, im lặng/né tránh — khinh miệt mạnh nhất. Cặp ổn định giữ tỷ lệ tích cực/tiêu cực ~5:1 trong xung đột.",
            expertNote: "Ngoài xung đột, Gottman nhấn mạnh 'bids for connection' (lời mời kết nối nhỏ hằng ngày — một câu, ánh nhìn) và tỷ lệ 'turning toward' (đáp lại) vs 'turning away' — cặp bền đáp ~86% bids, cặp ly hôn ~33%. 'Repair attempts' (nỗ lực hạ nhiệt trong xung đột — hài hước, xin lỗi, đề nghị nghỉ) và khả năng NHẬN repair quan trọng hơn tránh xung đột. 'Emotional bank account': tương tác tích cực nhỏ tích lũy 'số dư' cho phép quan hệ chịu được xung đột. Lưu ý: phương pháp DỰ BÁO ly hôn của Gottman bị nghi ngờ thống kê, nhưng cơ chế hành vi được ủng hộ rộng.",
            theory: "Gottman (four horsemen, bids, repair, 5:1 ratio).",
            controversy: "Con số 'dự báo chính xác 90%+' nên xem rất thận trọng — các nghiên cứu dự báo của Gottman dựa mẫu nhỏ, mô hình khớp HẬU NGHIỆM (post-hoc) rồi báo cáo độ chính xác trên chính mẫu đó, và ít được các nhóm độc lập tái lập (phê phán của Heyman, Stanley & cộng sự). Các tỷ lệ cụ thể (vd 86% vs 33% 'turning toward') đến từ 'Love Lab' cỡ mẫu hạn chế — hãy đọc chúng như minh họa xu hướng, không phải hằng số. CƠ CHẾ HÀNH VI (bốn kỵ sĩ, khinh miệt độc hại, giá trị của tương tác tích cực và sửa chữa) được ủng hộ rộng và vững hơn nhiều so với bộ máy DỰ BÁO định lượng.",
            application: [
              { domain: "Ưu tiên số một", text: "Nhận diện và loại khinh miệt (mỉa mai, đảo mắt, hạ thấp) khỏi xung đột — dấu hiệu nguy hiểm nhất." },
              { domain: "Bids hằng ngày", text: "Chú ý và ĐÁP lại lời mời kết nối nhỏ của người thân (turning toward) — tần suất đáp bids dự báo quan hệ mạnh hơn cách xử lý xung đột lớn." },
              { domain: "Sửa chữa", text: "Học đưa và NHẬN repair trong xung đột (hài hước, 'anh/em xin lỗi', đề nghị nghỉ 20 phút rồi quay lại) thay vì cố thắng hoặc tránh né." },
              { domain: "Số dư cảm xúc", text: "Chủ động tăng tương tác tích cực nhỏ (quan tâm, biết ơn) hằng ngày để giữ 'ngân hàng cảm xúc' dương trước khi xung đột xảy ra." },
            ],
          },
          {
            heading: "Attachment người lớn & earned security",
            evidence: "moderate",
            mechanism: "Trải nghiệm chăm sóc sớm hình thành 'internal working models' — kỳ vọng ngầm về giá trị bản thân và độ sẵn sàng của người khác — kích hoạt tự động dưới stress trong quan hệ trưởng thành.",
            expertNote: "Hai chiều: lo âu (sợ bị bỏ, cần trấn an) và né tránh (khó chịu với gần gũi/phụ thuộc). 'Protest behaviors' của kiểu lo âu (đòi hỏi, kiểm tra, rút lui trừng phạt) và 'deactivating strategies' của kiểu né tránh (tạo khoảng cách, đề cao tự lập) đều là chiến lược đối phó với cùng nhu cầu gắn bó bị đe dọa. QUAN TRỌNG: attachment KHÔNG cố định — 'earned secure attachment' đạt được qua quan hệ sửa chữa (bạn đời an toàn, trị liệu, tự nhận thức) là có thật và được ghi nhận. Hiểu kiểu gắn bó của mình và đối phương giải mã nhiều xung đột 'vô lý'.",
            theory: "Bowlby/Ainsworth → Hazan & Shaver (attachment người lớn); nghiên cứu earned security.",
            controversy: "Attachment style linh hoạt/phụ thuộc ngữ cảnh hơn lý thuyết gốc cho là cố định.",
            application: [
              { domain: "Giải mã phản ứng", text: "Nhận diện phản ứng do working model kích hoạt (vd hành vi 'phản đối' khi cảm nhận khoảng cách) như mô hình cũ được kích hoạt, không nhất thiết đọc đúng thực tại hiện tại." },
              { domain: "Hiểu đối phương", text: "Nếu đối phương né tránh khi bạn tìm gần gũi (hoặc ngược lại), hiểu đó là chiến lược đối phó với cùng nhu cầu gắn bó — giảm diễn giải thành 'không yêu'." },
              { domain: "Earned security", text: "Attachment thay đổi được: qua quan hệ an toàn ổn định, tự nhận thức, và trị liệu nếu cần — không bị khóa cứng bởi thời thơ ấu." },
            ],
          },
          {
            heading: "Differentiation of self (Bowen)",
            evidence: "moderate",
            mechanism: "Mức độ giữ được bản sắc/lý trí độc lập trong khi vẫn kết nối cảm xúc gần gũi, thay vì 'hòa tan' vào cảm xúc/kỳ vọng hệ thống gia đình dưới áp lực.",
            expertNote: "Bowen: gia đình là hệ thống cảm xúc; lo âu lan truyền qua hệ thống. Người ít biệt hóa dễ 'fusion' (mất mình trong quan hệ) hoặc 'cut-off' (cắt đứt cảm xúc để giữ mình — giả độc lập). Biệt hóa cao = giữ được cả 'togetherness' và 'individuality'. 'Triangulation' (kéo bên thứ ba vào giảm căng giữa hai người) là mẫu hệ thống phổ biến (vd phàn nàn về A với B thay vì nói thẳng A). Đặc biệt liên quan trong văn hóa gia đình gắn kết cao (VN) nơi kỳ vọng gia đình mạnh — biệt hóa không phải chối bỏ gia đình mà là yêu thương mà vẫn tự chủ.",
            theory: "Bowen (family systems, differentiation, triangulation).",
            controversy: "Khó đo định lượng; dựa đánh giá lâm sàng định tính.",
            application: [
              { domain: "Quyết định giao thoa gia đình", text: "Khi phản ứng mạnh với kỳ vọng gia đình (nghề, hôn nhân, tài chính), tạm dừng hỏi: đây là đánh giá độc lập của mình hiện tại, hay phản xạ với áp lực/vai trò cũ?" },
              { domain: "Giữ kết nối + tự chủ", text: "Luyện yêu thương gia đình VÀ giữ quyết định của mình — không phải fusion (nhượng bộ để yên) cũng không cut-off (cắt đứt để thoát)." },
              { domain: "Chống triangulation", text: "Nói thẳng vấn đề với người liên quan thay vì kéo bên thứ ba vào phàn nàn — giảm mẫu tam giác nuôi căng thẳng ngầm trong gia đình." },
            ],
          },
        ],
      },
      {
        label: "Mạng lưới rộng hơn",
        sections: [
          {
            heading: "Cô đơn, kết nối & chất lượng vs số lượng",
            evidence: "strong",
            mechanism: "Cô đơn mạn tính kích hoạt CTRA — tăng biểu hiện gene viêm, giảm gene kháng virus; liên hệ tăng nguy cơ tim mạch, suy giảm miễn dịch và tử vong. Meta-analysis (Holt-Lunstad) cho thấy cô lập/cô đơn liên hệ với tăng nguy cơ tử vong ở mức đáng kể; phép so 'tương đương hút X điếu thuốc' là một HEURISTIC truyền thông để hình dung độ lớn, không phải một tương đương sinh học chính xác — và dữ liệu là quan sát, có dị biệt (heterogeneity) lớn giữa các nghiên cứu.",
            expertNote: "Phân biệt cô đơn (chủ quan — chất lượng kết nối cảm nhận) với cô lập xã hội (khách quan — số lượng tiếp xúc) — hai cái tương quan không hoàn hảo, và CÔ ĐƠN chủ quan dự báo sức khỏe mạnh hơn. Cô đơn tạo vòng xoáy tự duy trì: tăng cảnh giác đe dọa xã hội → diễn giải tiêu cực tương tác → rút lui → cô đơn hơn (Cacioppo). Can thiệp hiệu quả nhất nhắm vào NHẬN THỨC lệch (diễn giải tiêu cực) hơn chỉ tăng số tiếp xúc. Harvard Study (80+ năm): chất lượng quan hệ ở tuổi 50 dự báo sức khỏe tuổi 80 mạnh hơn cholesterol.",
            theory: "Cacioppo (loneliness, CTRA); Holt-Lunstad (meta-analysis tử vong); Waldinger (Harvard Study).",
            controversy: "Cô đơn giữa nhiều 'bạn xã giao' vẫn hại tương đương cô lập thực sự.",
            application: [
              { domain: "Ưu tiên chiều sâu", text: "Lên lịch chủ động (định kỳ) cho vài quan hệ an toàn tâm lý thay vì chờ 'khi rảnh'; chất lượng dự báo sức khỏe hơn số lượng." },
              { domain: "Phá vòng xoáy", text: "Nếu thấy cô đơn, để ý xu hướng diễn giải tiêu cực tương tác (giả định bị từ chối) — kiểm chứng thay vì rút lui; can thiệp nhận thức mạnh hơn chỉ 'gặp nhiều người'." },
              { domain: "Làm việc màn hình nhiều", text: "Chủ đích tạo tương tác trực diện — kích hoạt kết nối mạnh hơn qua màn hình; đầu tư quan hệ tuổi 30 là 'lãi kép' cho sức khỏe tuổi già." },
            ],
          },
          {
            heading: "Weak ties, structural holes & networking thật",
            evidence: "strong",
            mechanism: "Quan hệ yếu mang thông tin/cơ hội MỚI hơn quan hệ thân (thân thiết chia sẻ thông tin trùng lặp). Người bắc cầu qua 'structural holes' (khoảng trống giữa các cụm) tiếp cận thông tin đa dạng, có lợi thế.",
            expertNote: "Granovetter + Burt (structural holes): giá trị không chỉ ở weak ties mà ở vị trí BẮC CẦU giữa các nhóm không kết nối — người môi giới thông tin giữa các cụm có lợi thế sáng tạo và cơ hội. 'Networking' hiệu quả không phải thu thập danh thiếp mà là CHO trước (Grant — 'givers' xây mạng bền hơn 'takers' và 'matchers' về dài hạn), và duy trì 'dormant ties' (quan hệ ngủ đông — kết nối lại người từng thân nhưng lâu không gặp thường cho giá trị cao bất ngờ vì họ tin tưởng sẵn nhưng đã có thông tin mới).",
            theory: "Granovetter (weak ties); Burt (structural holes); Grant (givers); dormant ties.",
            controversy: "Đầu tư sâu vào ít quan hệ và giá trị weak ties phục vụ chức năng khác nhau, không mâu thuẫn.",
            application: [
              { domain: "Pivot nghề", text: "Duy trì weak ties nghề nghiệp có hệ thống (tin nhắn ngắn mỗi vài tháng); kết nối lại 'dormant ties' (đồng nghiệp cũ lâu không gặp) — kênh cơ hội giá trị cao khi pivot." },
              { domain: "Bắc cầu", text: "Định vị mình ở giao điểm các nhóm (fintech + BA + đầu tư VN) — người môi giới thông tin giữa các cụm có lợi thế cơ hội và sáng tạo." },
              { domain: "Cho trước", text: "Networking bằng cách GIÚP trước (giới thiệu, chia sẻ hữu ích) không tính toán đối ứng ngay — 'givers' xây mạng bền hơn dài hạn." },
            ],
          },
          {
            heading: "Dunbar, social comparison & vệ sinh kỹ thuật số",
            evidence: "moderate",
            mechanism: "~150 quan hệ ổn định, cấu trúc phân tầng (~5 thân nhất, ~15 thân, ~50 tốt). Social comparison: đánh giá bản thân qua so sánh; mạng xã hội cung cấp so sánh tần suất cao, thiên lệch tích cực.",
            expertNote: "Phân tầng Dunbar (con số 150 tranh cãi, cấu trúc phân tầng vững hơn): năng lượng quan hệ hữu hạn, phân bổ theo tầng. Social comparison có hai hướng: 'upward' (so với người hơn — tạo động lực HOẶC tự ti tùy khung) và 'downward' (so với người kém — tạo an ủi HOẶC tự mãn). Mạng xã hội khuếch đại upward comparison với 'highlight reels' → tương quan giảm wellbeing, đặc biệt dùng thụ động (lướt) hơn chủ động (tương tác). 'Digital minimalism' (Newport): chọn có chủ đích công cụ phục vụ giá trị mình, mặc định loại bỏ phần còn lại.",
            theory: "Dunbar; Festinger (social comparison); Newport (digital minimalism); nghiên cứu passive vs active use.",
            controversy: "Con số 150 hiện bị bằng chứng thách thức nghiêm túc — Lindenfors và cộng sự (2021) tái phân tích cho thấy khoảng tin cậy của ước lượng rộng đến vô nghĩa (từ vài chục tới vài nghìn), nên '150' không nên xem là hằng số sinh học. Cấu trúc PHÂN TẦNG (vòng thân sơ khác nhau) là quan sát vững hơn nhiều so với con số tuyệt đối.",
            application: [
              { domain: "Phân bổ năng lượng", text: "Xác định vòng ~5 người cốt lõi và đầu tư thời gian tương xứng — đừng để năng lượng quan hệ pha loãng đều cho quá nhiều người." },
              { domain: "Vệ sinh so sánh", text: "Giới hạn lướt THỤ ĐỘNG (nhất là nội dung thành công/quan hệ người khác); chuyển sang tương tác chủ động; nhắc bản thân đang so với 'highlight reel', không phải thực tế." },
              { domain: "Digital minimalism", text: "Chọn có chủ đích công cụ số phục vụ giá trị mình, mặc định loại phần còn lại — thiết kế lại quan hệ với công nghệ thay vì để mặc định thu hút chú ý." },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "community",
    num: "06",
    icon: Landmark,
    title: "Cộng đồng",
    subtitle: "Vốn xã hội, không gian thứ ba, thuộc về, đóng góp",
    groups: [
      {
        label: "Vốn xã hội & sự thuộc về",
        sections: [
          {
            heading: "Social capital: bonding, bridging, linking",
            evidence: "strong",
            mechanism: "Bonding (gắn kết nhóm đồng nhất — hỗ trợ cảm xúc sâu), bridging (kết nối nhóm khác biệt — thông tin/cơ hội mới). Cộng đồng vốn xã hội cao tương quan sức khỏe, an toàn, cơ hội kinh tế tốt hơn.",
            expertNote: "Thêm tầng thứ ba: 'linking capital' (kết nối lên các thiết chế/người có quyền lực — tiếp cận nguồn lực thể chế). Ba loại phục vụ chức năng khác nhau; đa số người thiếu BRIDGING nhất (xu hướng homophily — kết bạn với người giống mình). Vốn xã hội vừa là tài sản cá nhân (mạng lưới của bạn) vừa là đặc tính tập thể (cộng đồng tin tưởng lẫn nhau — 'generalized trust' dự báo nhiều kết cục xã hội). Đóng góp vào vốn xã hội cộng đồng (không chỉ khai thác) là hành vi 'generative'.",
            theory: "Putnam (bonding/bridging); Woolcock (linking); Coleman (social capital).",
            controversy: "Luận điểm 'suy giảm' của Putnam bị phản biện là thiên lệch bởi cách đo (bỏ qua cộng đồng số).",
            application: [
              { domain: "Kiểm kê", text: "Mình mạnh bonding hay bridging? Đa số thiếu bridging — chủ đích tham gia cộng đồng nghề nghiệp/sở thích ngoài vòng thân quen." },
              { domain: "Pivot nghề", text: "Bridging capital (cộng đồng fintech/đầu tư/ESG) vừa cho cơ hội vừa cho cảm giác thuộc về ngành mới; linking (kết nối người dẫn dắt ngành) mở tiếp cận nguồn lực." },
              { domain: "Đóng góp", text: "Vừa khai thác vừa ĐÓNG GÓP vào cộng đồng (chia sẻ, kết nối người khác, xây lòng tin) — vốn xã hội tập thể nâng tất cả, và generosity xây uy tín dài hạn." },
            ],
          },
          {
            heading: "Third places & sự thuộc về đều đặn",
            evidence: "moderate",
            mechanism: "'Không gian thứ ba' (không phải nhà/công sở) — nơi tụ họp phi chính thức, duy trì quan hệ cộng đồng lỏng nhưng thường xuyên.",
            expertNote: "Đặc điểm third place (Oldenburg): trung lập, san bằng địa vị, hội thoại là hoạt động chính, dễ tiếp cận, có 'regulars', không khí vui vẻ, 'ngôi nhà thứ hai'. Cơ chế: 'mere exposure effect' (gặp lặp lại tăng thiện cảm) + 'familiar strangers' tạo cảm giác thuộc về nền tảng ít áp lực hơn quan hệ thân. Trong đô thị hóa/làm việc từ xa, third place suy giảm góp phần cô lập. Với người hướng nội hoặc bận, third place cho kết nối 'liều thấp đều đặn' không đòi hỏi năng lượng như duy trì tình bạn sâu.",
            theory: "Oldenburg (The Great Good Place); Zajonc (mere exposure).",
            controversy: "Mang tính mô tả/xã hội học hơn kiểm chứng định lượng chặt.",
            application: [
              { domain: "Xây third place", text: "Chọn có chủ đích 1–2 'third place' thật ngoài đời và đến ĐỀU ĐẶN (cùng giờ/nơi): quán quen, lớp học nhóm, câu lạc bộ chạy — lặp lại tạo quan hệ hơn cường độ." },
              { domain: "Cho người bận/hướng nội", text: "Dùng third place như kết nối 'liều thấp đều đặn' — mere exposure xây thuộc về mà không tốn năng lượng như duy trì tình bạn sâu." },
              { domain: "Kết hợp mục tiêu", text: "Ghép third place với mục tiêu sẵn có: nhóm chạy bộ (thể chất + cộng đồng), lớp tiếng Trung (học + cộng đồng) — một hành động nhiều đích." },
            ],
          },
          {
            heading: "Đóng góp, generativity & 'helper's high'",
            evidence: "moderate",
            mechanism: "Tham gia thiện nguyện/đóng góp cộng đồng tương quan tăng tuổi thọ và sức khỏe tâm lý trong nhiều nghiên cứu quan sát; cơ chế đề xuất: tăng purpose/relatedness/mattering.",
            expertNote: "Erikson: 'generativity' (quan tâm hướng dẫn thế hệ sau/đóng góp vượt bản thân) là nhiệm vụ phát triển trung niên, đối lập 'stagnation'; generativity dự báo wellbeing và ý nghĩa. 'Prosocial spending' (chi tiền cho người khác) tăng hạnh phúc hơn chi cho mình (Dunn) — hiệu ứng nhỏ nhưng nhất quán liên văn hóa. CẢNH BÁO nhân quả: selection effect mạnh (người khỏe/có nguồn lực dễ đóng góp hơn) — phần lớn dữ liệu quan sát, khó tách nhân quả. Nên đóng góp vì giá trị nội tại, không như 'liều thuốc' đảm bảo.",
            theory: "Erikson (generativity); Dunn (prosocial spending); Post (helper's high).",
            controversy: "Selection effect mạnh — nhân quả 'đóng góp → khỏe' chưa vững; đóng góp quá sức có thể gây kiệt sức (không phải vô điều kiện tốt).",
            application: [
              { domain: "Đóng góp có ý nghĩa", text: "Tham gia vì giá trị nội tại (đóng góp, kết nối, mattering), không phải như liều thuốc sức khỏe đảm bảo; chọn hoạt động khớp kỹ năng/giá trị (mentoring, dùng chuyên môn tài chính) — bền hơn tham gia gượng ép." },
              { domain: "Generativity", text: "Nuôi generativity qua mentoring người đi sau, chia sẻ kiến thức (như các công cụ bạn xây), đóng góp cộng đồng nghề — thành phần ý nghĩa trung niên." },
              { domain: "Ranh giới", text: "Đóng góp trong khả năng, không quá sức tới kiệt (over-giving gây burnout) — bền vững hơn bùng cháy ngắn hạn." },
            ],
          },
          {
            heading: "Social identity: thuộc về, ý nghĩa tập thể & mặt tối",
            evidence: "strong",
            mechanism: "Một phần lòng tự trọng đến từ thành viên nhóm xã hội, không chỉ thành tựu cá nhân. Phân loại 'trong/ngoài nhóm' xảy ra tự động, kể cả nhóm ngẫu nhiên tối thiểu.",
            expertNote: "Social identity là nguồn ý nghĩa, hỗ trợ và tự trọng mạnh ('social cure' — nhóm ý nghĩa hỗ trợ phục hồi sức khỏe tâm thần/thể chất, Haslam). Đa dạng bản sắc nhóm (nghề, sở thích, cộng đồng) tạo 'social identity complexity' — đệm chống mất mát nếu một bản sắc bị đe dọa (vd mất việc ít tàn phá hơn nếu danh tính không dồn hết vào nghề). MẶT TỐI cùng cơ chế: thiên kiến in-group/out-group, phân cực, mù quáng nhóm. Kỹ năng expert: hưởng lợi ích thuộc về mà giữ được cởi mở liên nhóm và tư duy độc lập trong nhóm.",
            theory: "Tajfel & Turner (social identity); Haslam (social cure, identity complexity).",
            controversy: "Cùng cơ chế tạo cả gắn kết lẫn thiên kiến/phân cực.",
            application: [
              { domain: "Đa dạng bản sắc", text: "Gia nhập nhiều cộng đồng bản sắc lành mạnh (nghề BA/fintech, học ngôn ngữ, chạy bộ) — đa dạng danh tính là đệm: một bản sắc bị đe dọa (mất việc) ít tàn phá nếu không dồn hết vào đó." },
              { domain: "Social cure", text: "Trong giai đoạn khó (pivot, stress), dựa vào nhóm ý nghĩa như nguồn hỗ trợ và tự trọng — thuộc về nhóm là 'liều thuốc xã hội' có bằng chứng." },
              { domain: "Giữ cởi mở", text: "Cảnh giác mặt tối khi gắn bó sâu một nhóm: thiên kiến 'nhóm mình vs họ', áp lực đồng thuận — giữ tư duy độc lập và cởi mở liên nhóm." },
            ],
          },
        ],
      },
    ],
  },
];
/* ---------------------------------------------------------------
   EXTRAS overlay: gắn theo heading
   - pitfalls: sai lầm phổ biến cần tránh khi áp dụng
   - micro: việc nhỏ ≤2 phút / đòn bẩy cao, hợp lịch rất bận
--------------------------------------------------------------- */
const EXTRAS = {
  "mTOR/AMPK, interference effect & concurrent training": {
    pitfalls: [
      "Nhồi cardio cường độ cao ngay trước buổi tạ 'để khởi động' — làm giảm chất lượng buổi tạ và khuếch đại giao thoa.",
      "Đổi giáo án liên tục vì 'chán' — mất tín hiệu progressive overload; tiến bộ đến từ lặp lại có tăng tải, không từ đa dạng.",
      "Đánh đồng đau nhức (DOMS) với hiệu quả — đau không đo được kích thích cơ; tải và độ gần thất bại mới đo được.",
    ],
    micro: [
      "Để sẵn bộ đồ tập + giày ngay cạnh giường tối hôm trước — xóa ma sát khởi động buổi sáng (10 giây, tăng tỷ lệ tập rõ rệt).",
      "Ngày quá bận: 1 hiệp squat/chống đẩy tới gần thất bại — giữ 'chuỗi' và phần lớn tín hiệu duy trì cơ chỉ trong 2 phút.",
    ],
  },
  "VO2max, Zone 2 & polarized training": {
    pitfalls: [
      "Chạy Zone 2 quá nhanh (trôi lên vùng giữa) — 'no man's land' tích mệt mà lợi ích thấp; đa số chạy Zone 2 nhanh hơn mức thật.",
      "Bỏ hẳn cường độ cao vì 'chỉ cần Zone 2' — thiếu 20% cường độ cao thì VO2max đỉnh chững lại.",
    ],
    micro: [
      "Biến việc di chuyển thành Zone 2: đi bộ nhanh nghe podcast học tiếng Trung — gộp cardio nền + học vào thời gian chết.",
      "Kiểm 10 giây bằng talk test giữa buổi: nói được trọn câu không? — hiệu chỉnh tại chỗ, không cần thiết bị.",
    ],
  },
  "Hormesis, mitohormesis & tín hiệu stress có lợi": {
    pitfalls: [
      "Tin 'càng nhiều stressor tốt càng tốt' — bỏ quên vế phải đường cong chữ U; tắm lạnh/nhịn/sauna quá liều gây hại.",
      "Uống viên chống oxy hóa liều cao 'để hồi phục' quanh giờ tập — chặn chính tín hiệu thích nghi bạn vừa tạo ra.",
    ],
    micro: [
      "Kết thúc tắm bằng 30 giây nước mát (nếu thích) — liều hormetic nhỏ, tỉnh táo, không cần nghi thức tắm đá cầu kỳ.",
    ],
  },
  "Mật độ xương, Wolff's Law & sức mạnh suốt đời": {
    pitfalls: [
      "Chỉ chạy/đạp xe và nghĩ đã đủ cho xương — cardio không chịu tải kích thích xương rất yếu.",
      "Tránh tạ nặng vì sợ 'to con' — nữ rất khó phì đại lớn; bỏ lỡ cửa sổ vàng xây mật độ xương tuổi 30.",
    ],
    micro: [
      "10–20 cú nhảy nhẹ (hoặc bật gót thả xuống) mỗi sáng khi đánh răng — kích thích va chạm cho xương hông, gần như 0 thời gian.",
    ],
  },
  "Viêm mạn tính, kháng insulin & linh hoạt chuyển hóa": {
    pitfalls: [
      "Tin BMI bình thường = chuyển hóa khỏe — kiểu TOFI (gầy ngoài mỡ tạng trong) phổ biến ở người châu Á vẫn kháng insulin.",
      "Đuổi theo 'siêu thực phẩm/detox' thay vì nền tảng (đủ đạm, chất xơ, vận động) — marketing lấn át cơ bản.",
    ],
    micro: [
      "Ăn rau/đạm trước tinh bột trong mỗi bữa — thứ tự ăn hạ đỉnh đường huyết sau ăn, không tốn công thêm.",
      "Đi bộ 10 phút sau bữa lớn nhất ngày — giảm đường huyết sau ăn rõ rệt; ghép với gọi điện/nghe podcast.",
    ],
  },
  "Anabolic resistance, phân bổ protein & leucine threshold": {
    pitfalls: [
      "Dồn phần lớn đạm vào bữa tối — vượt refractory period, lãng phí; nên rải đều 3 bữa.",
      "Bữa sáng chỉ tinh bột (bánh mì/xôi/phở ít thịt) — bỏ lỡ liều đạm kích hoạt MPS đầu ngày.",
    ],
    micro: [
      "Thủ sẵn nguồn đạm nhanh (trứng luộc, sữa chua Hy Lạp, sữa) — bù nhanh khi bữa lỡ thiếu đạm, 0 nấu nướng.",
    ],
  },
  "Glymphatic, kiến trúc giấc ngủ & chronotype": {
    pitfalls: [
      "Ngủ bù cuối tuần lệch nhiều giờ — social jetlag, phá nhịp còn hại hơn thiếu ngủ đều.",
      "Uống melatonin liều cao (3–5mg) như thuốc ngủ — không hiệu quả hơn 0.3–0.5mg và có thể rối feedback.",
      "Cà phê chiều 'để tỉnh' — adenosine bị chặn tới tận đêm, phá giấc sâu mà không nhận ra.",
    ],
    micro: [
      "Ra ban công/ngoài trời 2–5 phút ngay sau khi thức — liều ánh sáng neo nhịp mạnh nhất, gần như miễn phí.",
      "Đặt một báo thức 'giờ đi ngủ' (không chỉ giờ thức) — nhắc bắt đầu hạ nhiệt, chống trôi giờ ngủ.",
    ],
  },
  "Rượu, caffeine & các chất điều biến giấc ngủ": {
    pitfalls: [
      "Dùng rượu như 'thuốc dễ ngủ' — dễ vào giấc nhưng phá REM/nửa sau đêm; chính nó gây ngủ kém.",
      "Đánh giá giấc ngủ bằng cảm giác 'ngủ được' — cảm giác chủ quan che chất lượng thật; cần dữ liệu HRV.",
    ],
    micro: [
      "Hạ nhiệt phòng ~18–19°C hoặc tắm ấm nhanh trước ngủ — kích hoạt hạ nhiệt độ lõi báo buồn ngủ, không đánh đổi.",
    ],
  },
  "Attention Restoration Theory & liều thiên nhiên": {
    pitfalls: [
      "Dùng lướt điện thoại làm 'nghỉ' giữa các phiên nặng — không phục hồi chú ý có chủ đích, còn tiêu thêm.",
      "Chờ 'có thời gian đi công viên' — bỏ lỡ liều nhỏ hằng ngày cũng có tác dụng.",
    ],
    micro: [
      "Nhìn ra cây xanh/trời qua cửa sổ 40–60 giây giữa các task — micro-restoration đủ hạ tải chú ý.",
      "Đặt một cây nhỏ trong tầm mắt bàn làm việc — phục hồi thụ động cả ngày, một lần setup.",
    ],
  },
  "Panel chỉ số nâng cao & diễn giải theo quỹ đạo": {
    pitfalls: [
      "Đọc một điểm dữ liệu như phán quyết — thiếu quỹ đạo và bối cảnh dễ hoảng/chủ quan sai.",
      "Tự chẩn/tự mua TPCN theo kết quả — bỏ qua bác sĩ; over-testing gây lo âu và can thiệp thừa.",
    ],
    micro: [
      "Chụp lại mọi kết quả xét nghiệm vào một album/ghi chú duy nhất — dựng quỹ đạo nhiều năm mà không cần công sức về sau.",
    ],
  },

  "vmPFC–amygdala, affect labeling & reappraisal": {
    pitfalls: [
      "Ép 'nghĩ tích cực' đè lên cảm xúc gốc — thêm lớp phán xét, tăng đau khổ; labeling ≠ chối bỏ.",
      "Nén biểu hiện (suppression) để 'giữ thể diện' — tốn kém sinh lý, giảm trí nhớ và kết nối.",
    ],
    micro: [
      "Gõ một dòng gọi tên cảm xúc vào ghi chú điện thoại khi bị cuốn ('đang lo vì X') — 15 giây, hạ amygdala ngay.",
      "Trước cuộc họp căng: một câu reappraisal thầm ('hồi hộp = cơ thể sẵn sàng') — đổi sinh lý mà không tốn thời gian.",
    ],
  },
  "Emotional granularity & interoception": {
    pitfalls: [
      "Gọi mọi thứ là 'stress/mệt' — granularity thấp làm khó chọn cách ứng phó đúng.",
      "Coi 'cảm giác ruột gan' là mệnh lệnh tuyệt đối — trực giác là dữ liệu, cần đối chiếu, không phải chân lý.",
    ],
    micro: [
      "3 nhịp thở chú ý cảm giác cơ thể trước khi trả lời tin nhắn/quyết định nhỏ — reset interoception trong 20 giây.",
    ],
  },
  "Rumination, worry & metacognition": {
    pitfalls: [
      "Nhầm nhai lại (rumination) với 'đang xử lý sâu' — cùng cảm giác nhưng một cái kéo dài đau khổ.",
      "Cố dừng suy nghĩ bằng ý chí — càng đè càng bật; chuyển sang hành động/đổi ngữ cảnh hiệu quả hơn.",
    ],
    micro: [
      "Hẹn 'giờ lo' 10 phút cố định; khi lo nổi ngoài khung, gõ một dòng và hoãn — cắt lo lan man tức thì.",
      "Quy tắc 5 phút: chưa ra bước hành động → đứng dậy đổi phòng/rót nước — ngắt vòng bằng cơ thể.",
    ],
  },
  "Allostatic load & đo lường gián tiếp": {
    pitfalls: [
      "Chờ tới khi 'sập' mới nghỉ — allostatic load tích lũy âm thầm dù chỉ số đơn lẻ 'bình thường'.",
      "Theo dõi HRV ám ảnh từng ngày — over-monitoring gây lo âu ngược; nhìn xu hướng tuần.",
    ],
    micro: [
      "Chấm năng lượng 1–5 một lần mỗi tối (một chữ số) — dashboard tối giản, đủ thấy xu hướng giảm sớm.",
    ],
  },
  "Post-traumatic growth & nghịch lý bền vững": {
    pitfalls: [
      "Ép bản thân/người khác 'phải rút ra bài học' khi còn đang đau — thêm gánh nặng, không phải chữa lành.",
      "Kỳ vọng nghịch cảnh tự động thành tăng trưởng — nhiều người chỉ phục hồi, và điều đó bình thường.",
    ],
    micro: [
      "Sau ngày khó, viết 2–3 câu phản tư hướng ý nghĩa (không nhai lại) — deliberate reflection nhẹ, hỗ trợ tích hợp.",
    ],
  },
  "'Adrenal fatigue' & phân biệt giả khoa học": {
    pitfalls: [
      "Mua 'adrenal support' theo quảng cáo — khái niệm không được nội tiết học công nhận.",
      "Tự gán 'một nguyên nhân cho mọi triệu chứng' — dấu hiệu kinh điển của giả khoa học.",
    ],
    micro: [
      "Trước khi tin một tuyên bố sức khỏe: hỏi nhanh 'có bán kèm sản phẩm không?' — bộ lọc 5 giây loại phần lớn tin rác.",
    ],
  },
  "Bản đồ liệu pháp theo bằng chứng & cơ chế": {
    pitfalls: [
      "Chọn liệu pháp theo độ phổ biến truyền thông thay vì khớp vấn đề — mindfulness không phải thuốc cho mọi thứ.",
      "Coi tự lực thay được điều trị lâm sàng khi đã ảnh hưởng chức năng sống — trì hoãn tìm chuyên gia.",
    ],
    micro: [
      "Khi tự phê phán gay gắt: hỏi 'mình sẽ nói gì với bạn thân trong tình huống này?' — chuyển sang self-compassion tức thì.",
    ],
  },
};
Object.assign(EXTRAS, {
  "Narrative identity & agency/communion": {
    pitfalls: [
      "Kể chuyện đời theo mạch 'tốt → xấu' (contamination) — dự báo trầm cảm; chú ý khung kể, không chỉ sự kiện.",
      "Tô hồng/chối bỏ khó khăn thay vì tích hợp — 'redemptive' thật là thừa nhận đau rồi tìm ý nghĩa, không phủ nhận.",
    ],
    micro: [
      "Khi kể về giai đoạn khó (với người khác hoặc trong đầu), thêm một mệnh đề '...và điều đó dạy mình...' — luyện khung redemptive, 0 thời gian riêng.",
    ],
  },
  "Self-concept clarity & values clarification": {
    pitfalls: [
      "Nhầm 'thiếu thông tin' với 'thiếu rõ ràng giá trị' — giải sai bài toán (research mãi khi vấn đề là ưu tiên nội tại).",
      "Đổi 'giá trị' theo người mình đang nói chuyện — dấu hiệu clarity thấp, dễ bị cuốn.",
    ],
    micro: [
      "Lưu 3–5 giá trị cốt lõi ở màn hình khóa/ghi chú ghim — bộ lọc quyết định luôn trong tầm mắt, tra trong 3 giây.",
    ],
  },
  "Introspection illusion & 3 tầng tự nhận thức": {
    pitfalls: [
      "Hỏi 'tại sao mình thế này' — nuôi confabulation (bịa lý do); hỏi 'cái gì' cho insight thật hơn.",
      "Tin cảm giác 'chắc chắn biết lý do' là bằng chứng — nội quan có độ tin cậy thấp hơn ta tưởng.",
    ],
    micro: [
      "Mỗi tối gõ một dòng: quyết định đáng chú ý hôm nay + lý do (trước khi biết kết quả) — mini decision journal 30 giây.",
    ],
  },
  "Identity statuses & khủng hoảng bản sắc trưởng thành": {
    pitfalls: [
      "Vội thoát khỏi 'khoảng giữa mơ hồ' (neutral zone) — chính đây là nơi tái cấu trúc bản sắc; nhảy cóc = quyết định non.",
      "Giữ định hướng thừa hưởng từ kỳ vọng gia đình mà chưa từng chất vấn (foreclosure) — dễ khủng hoảng giữa đời.",
    ],
    micro: [
      "Đặt một 'ngày review pivot' lặp hằng tháng trong lịch — giữ khám phá có nhịp, chống mắc kẹt vô định.",
    ],
  },
  "Trải nghiệm, 'time affluence' & mua thời gian": {
    pitfalls: [
      "Ngại 'mua thời gian' (thuê việc mình ghét) vì thấy 'phí' — bỏ lỡ đòn bẩy wellbeing có bằng chứng tốt.",
      "Dồn tiền vào vật chất để 'gây ấn tượng' — hạnh phúc kém bền hơn trải nghiệm có kết nối.",
    ],
    micro: [
      "Trước khi mua đồ >1 mức giá tự đặt, hỏi 'đây là trải nghiệm hay vật chất, có kết nối không?' — một câu hỏi, chi tiêu khôn hơn.",
    ],
  },
  "Fluid vs crystallized & bảo vệ nhận thức": {
    pitfalls: [
      "Tốn thời gian brain-games hứa 'tăng IQ' — near transfer hẹp, không nâng trí thông minh tổng quát.",
      "Bỏ quên yếu tố mạch máu (huyết áp/đường huyết/ngủ) — ảnh hưởng nhận thức tuổi già hơn mọi app luyện não.",
    ],
    micro: [
      "Mỗi khái niệm nghề mới học xong, lưu 1 dòng vào 'sổ mô hình' kèm ví dụ — xây crystallized intelligence dần, 1 phút.",
    ],
  },
  "Mental models, latticework & liên miền": {
    pitfalls: [
      "'Cầm búa thấy gì cũng là đinh' — ép mọi vấn đề vào một khung quen; thiếu đa dạng mô hình.",
      "Sưu tầm mô hình như trang sức mà không áp dụng — biết ≠ dùng được; giá trị ở nhận ra khi nào dùng.",
    ],
    micro: [
      "Trước quyết định, hỏi một câu: 'khung nào khác áp được vào đây?' — phá góc nhìn đơn, 10 giây.",
    ],
  },
  "Bayesian updating, calibration & tư duy xác suất": {
    pitfalls: [
      "Phát biểu niềm tin nhị phân (đúng/sai) — mất thông tin về độ chắc; nên dùng %.",
      "Hoặc phớt lờ bằng chứng ngược, hoặc đảo 180 độ — cả hai đều lỗi; cập nhật từng bước nhỏ.",
    ],
    micro: [
      "Gắn một con số % vào mỗi dự đoán bạn nói ra hôm nay ('70% là...') — luyện calibration mà không cần công cụ.",
    ],
  },
  "Debiasing ở cấp quy trình": {
    pitfalls: [
      "Nghĩ 'biết về bias là đủ để tránh' — không; cần quy trình (pre-mortem, checklist), không phải cố khách quan.",
      "Tiếp tục vì đã đầu tư nhiều (sunk cost) — quyết định phải dựa lợi ích còn lại, bỏ qua cái đã mất.",
    ],
    micro: [
      "Trước quyết định lớn, hỏi một câu pre-mortem: 'nếu một năm sau việc này hỏng, vì sao?' — lộ rủi ro trong 30 giây.",
    ],
  },
  "Bốn nhánh EQ (Mayer–Salovey) & mô hình khả năng": {
    pitfalls: [
      "Tốn tiền/tin test EQ thương mại — nhiều bài đo lẫn nhân cách, ít giá trị dự báo.",
      "Nhảy sang 'quản lý cảm xúc' khi chưa nhận diện chính xác cảm xúc — bỏ qua nền tảng.",
    ],
    micro: [
      "Xếp việc theo trạng thái: brainstorm khi tâm trạng nhẹ nhõm, soát lỗi khi thận trọng — tận dụng cảm xúc, 0 chi phí.",
    ],
  },
  "Cognitive vs affective empathy & compassion bền vững": {
    pitfalls: [
      "Chìm vào cảm xúc người khác (empathic distress) — dẫn kiệt sức/né tránh; chuyển sang compassion có điều tiết.",
      "Tin 'đồng cảm càng nhiều càng tốt' cho quyết định công bằng — đồng cảm cảm xúc thiên vị người giống mình/trước mắt.",
    ],
    micro: [
      "Trước cuộc trò chuyện khó, viết một dòng 'họ đang lo/muốn/sợ gì' — đồng cảm nhận thức nhanh, cải thiện kết quả.",
    ],
  },
  "Active constructive responding & capitalization": {
    pitfalls: [
      "Phản xạ 'vạch rủi ro' khi ai khoe kế hoạch (chủ động-tiêu cực) — hại quan hệ dù ngụy trang 'góp ý thực tế'.",
      "Đáp qua loa 'ừ hay đấy' rồi đổi chủ đề (thụ động-tích cực) — bỏ lỡ cơ hội xây quan hệ.",
    ],
    micro: [
      "Khi người thân báo tin vui: hỏi một câu mở ('rồi sao nữa?') và để họ kể — 20 giây, đòn bẩy quan hệ cao nhất.",
    ],
  },
  "Giao tiếp phi bạo lực, lắng nghe & xung đột kiến tạo": {
    pitfalls: [
      "Trộn quan sát với diễn giải phán xét ('anh chẳng bao giờ...') — kích phòng thủ, leo thang.",
      "Để xung đột trượt từ NHIỆM VỤ (ý tưởng) sang QUAN HỆ (công kích cá nhân) — luôn hại.",
    ],
    micro: [
      "Trước khi phản hồi trong tranh luận, diễn đạt lại ý đối phương một câu ('ý anh là...?') — hạ nhiệt, tăng được nghe.",
    ],
  },
  "Testing effect, spacing & generation": {
    pitfalls: [
      "Đọc lại/highlight vì thấy 'trôi chảy' (illusion of fluency) — cảm giác dễ đi ngược ghi nhớ thật.",
      "Ôn dồn sát ngày thay vì giãn cách — mất phần lớn lợi ích của spacing.",
    ],
    micro: [
      "Sau mỗi bài học, gấp lại và tự nói to 3 ý chính (không nhìn) — retrieval + generation trong 60 giây.",
    ],
  },
  "Cognitive Load Theory & thiết kế học liệu": {
    pitfalls: [
      "Nhồi quá nhiều ý mới mỗi lần — quá tải working memory, không kịp xây schema.",
      "Nhảy vào chi tiết trước khi có khung tổng thể — chi tiết rời khó bám.",
    ],
    micro: [
      "Trước khi học chủ đề mới, đọc mục lục/sơ đồ tổng thể 1 phút — dựng schema để chi tiết bám vào.",
    ],
  },
  "Interleaving, deliberate practice & phản hồi": {
    pitfalls: [
      "'Luyện nhiều' mà không có vòng phản hồi — lặp lại lỗi, không tiến bộ.",
      "Luyện dàn trải thoải mái thay vì nhắm điểm yếu cụ thể — thoải mái ≠ hiệu quả.",
    ],
    micro: [
      "Ghi âm 30 giây mình nói tiếng Trung/Anh rồi nghe lại — vòng phản hồi tức thì gần như miễn phí.",
    ],
  },
  "Metacognition, transfer & giới hạn brain-training": {
    pitfalls: [
      "Tin 'judgment of learning' của mình (cảm giác đã hiểu) — thường sai; cần tự kiểm tra thật.",
      "Chỉ học ví dụ bề mặt — cản transfer; cần rút nguyên lý trừu tượng.",
    ],
    micro: [
      "Sau buổi học hỏi một câu: 'mình giải thích lại cho người khác được không?' — kiểm tra hiểu thật, 15 giây.",
    ],
  },
  "Habit loop, automaticity & thiết kế cue": {
    pitfalls: [
      "Dựa vào động lực/ý chí để đổi hành vi — dao động, kém bền; đổi CUE mới bền.",
      "Tin huyền thoại '21 ngày' — thực tế trung bình ~66 ngày, biến thiên lớn; bỏ cuộc sớm.",
    ],
    micro: [
      "Gắn một thói quen mới vào việc đã làm hằng ngày ('sau khi pha cà phê → 1 câu tiếng Trung') — habit stacking, 0 setup.",
    ],
  },
  "Motivation, goals & hệ thống vs mục tiêu": {
    pitfalls: [
      "Ám ảnh đích mà bỏ hệ thống — đích không kiểm soát hoàn toàn được; quy trình thì có.",
      "Khi động lực tụt, cố 'ép tinh thần' — hiệu quả hơn là thu nhỏ hành vi (tiny habit).",
    ],
    micro: [
      "Ngày kiệt sức, làm phiên bản '1 phút' của thói quen (1 câu, 1 hiệp) — giữ chuỗi và danh tính, chống đứt gãy.",
    ],
  },
  "Choice architecture, defaults & commitment devices": {
    pitfalls: [
      "Dựa quy tắc mờ ('dùng điện thoại điều độ') — đàm phán nội tâm mỗi lần; bright-line rõ hơn.",
      "Để hành vi tốt sau nhiều bước ma sát — mỗi bước thêm giảm mạnh tỷ lệ thực hiện.",
    ],
    micro: [
      "Để điện thoại ở phòng khác trong khối làm việc sâu — một hành động, tăng ma sát cho xao nhãng cả buổi.",
    ],
  },
  "Implementation intentions & attention management": {
    pitfalls: [
      "Đặt ý định mơ hồ ('sẽ tập nhiều hơn') — thiếu cue cụ thể thì hiệu quả tụt.",
      "Đa nhiệm việc nặng — thực chất chuyển đổi tốn kém (attention residue), giảm chất lượng.",
    ],
    micro: [
      "Viết một if-then cho trở ngại hay gặp nhất tuần này ('nếu lỡ buổi sáng → bù 20 phút trưa') — 30 giây, chống bỏ cuộc.",
    ],
  },
});
Object.assign(EXTRAS, {
  "Self-Determination Theory & chất lượng động lực": {
    pitfalls: [
      "Chọn nghề chỉ theo lương — bỏ qua autonomy/competence/relatedness dự báo bền vững hơn.",
      "Làm việc vì 'sợ tụt hậu' (introjected) kéo dài — nội hóa nông, dễ cạn kiệt.",
    ],
    micro: [
      "Với một việc 'phải làm' hôm nay, viết một dòng lý do IDENTIFIED ('việc này phục vụ mục tiêu X của mình') — nội hóa nhanh.",
    ],
  },
  "Meaning vs happiness & mattering": {
    pitfalls: [
      "Gộp 'vui hơn' và 'ý nghĩa hơn' làm một khi quyết định lớn — chúng có thể xung đột ngắn hạn.",
      "Chờ 'sứ mệnh vĩ đại' — bỏ lỡ ý nghĩa hằng ngày tích lũy (kết nối, hoàn thành, cái đẹp).",
    ],
    micro: [
      "Một tin nhắn quan tâm/cảm ơn tới một người mỗi ngày — nuôi 'mattering', 30 giây, chống tuyệt vọng mạnh.",
    ],
  },
  "Job crafting & thiết kế công việc": {
    pitfalls: [
      "Nhảy pivot hẳn khi chưa thử job crafting — bỏ qua cách rủi ro thấp nắm một phần lợi ích.",
      "Chờ tổ chức 'giao' ý nghĩa — cognitive crafting (tự diễn giải lại) nằm trong tay bạn.",
    ],
    micro: [
      "Xin tham gia một phần nhỏ dự án chạm fintech/ESG trong tuần này — task crafting cụ thể, cửa mở dần.",
    ],
  },
  "Achievement goals, grit & giới hạn của nó": {
    pitfalls: [
      "Tôn vinh kiên trì mù (sunk cost) thành 'grit' — đôi khi bỏ đúng lúc khôn hơn.",
      "Đặt mục tiêu kiểu so sánh ('không thua đồng nghiệp') — nuôi lo âu, giảm hiệu suất dưới áp lực.",
    ],
    micro: [
      "Định kỳ hỏi một câu về mỗi track: 'đường cong lợi ích còn dốc không?' — quyết định bỏ/tiếp tỉnh táo.",
    ],
  },
  "Burnout, engagement & recovery": {
    pitfalls: [
      "Chỉ 'làm ít lại' khi burnout — bỏ qua gốc thật (xung đột giá trị/bất công/thiếu kiểm soát).",
      "'Nghỉ' mà vẫn nghĩ về việc — thiếu psychological detachment thì không phục hồi.",
    ],
    micro: [
      "Nghi thức 'đóng ngày làm' 1 phút (ghi việc dang dở + tắt thông báo) — tạo detachment thật, chống mang việc vào đầu buổi tối.",
    ],
  },
  "Career capital, so-good & deliberate positioning": {
    pitfalls: [
      "Chờ 'tìm ra đam mê' trước khi hành động — đam mê thường đến SAU năng lực.",
      "Nhảy sang lĩnh vực trắng, bỏ vốn sẵn có — pivot dựa skill stack ít rủi ro hơn.",
    ],
    micro: [
      "Dành 25 phút/tuần cho một kỹ năng hiếm-có-giá-trị đã chọn (định giá, một mảng fintech) — cộng gộp career capital đều đặn.",
    ],
  },
  "Imposter phenomenon & Dunning-Kruger": {
    pitfalls: [
      "Diễn giải cảm giác 'imposter' khi vào ngành mới là bằng chứng bất tài — thường là dấu hiệu thấy được độ sâu thật.",
      "Chờ 'hết nghi ngờ' mới hành động — người giỏi thường luôn nghi ngờ; hành động song song với nghi ngờ.",
    ],
    micro: [
      "Lưu ngay phản hồi tích cực/thành tựu vào một 'evidence file' khi nhận được — đối chiếu khi imposter nổi lên.",
    ],
  },
  "Prospect theory, loss aversion & behavior gap": {
    pitfalls: [
      "Giữ khoản lỗ hy vọng gỡ, chốt lời sớm (disposition effect) — phá 'cắt lỗ để lãi chạy'.",
      "Quyết định theo giá vốn (điểm tham chiếu) thay vì giá trị tương lai kỳ vọng.",
    ],
    micro: [
      "Trước mỗi lệnh, gõ một dòng luận điểm + điều kiện thoát vào journal — 1 phút, chống quyết định cảm xúc.",
    ],
  },
  "Mental accounting, framing & house money": {
    pitfalls: [
      "Liều hơn với 'tiền lời/thưởng' (house money) — nhất là sau chuỗi thắng.",
      "Xem danh mục quá thường xuyên (narrow framing) — khuếch đại loss aversion, dễ bán tháo.",
    ],
    micro: [
      "Đặt lịch xem danh mục theo tuần/tháng, gỡ app khỏi màn hình chính — giảm narrow framing bằng ma sát.",
    ],
  },
  "Present bias, hyperbolic discounting & tự động hóa": {
    pitfalls: [
      "Dựa ý chí để tiết kiệm/đầu tư đều — thất bại hệ thống vì present bias.",
      "Để tiền 'chạm tay' rồi mới định đầu tư — khoản đó dễ bị tiêu.",
    ],
    micro: [
      "Cài một lệnh chuyển tự động vào ngày nhận lương (một lần setup) — loại bỏ quyết định lặp lại mãi mãi.",
    ],
  },
  "Sequence risk, ergodicity & quản trị rủi ro đuôi": {
    pitfalls: [
      "Tối đa hóa kỳ vọng mà bỏ qua rủi ro phá sản — một cú 'game over' xóa mọi lợi ích tích lũy.",
      "Dùng đòn bẩy tới mức một cú sốc có thể xóa sạch — sống sót phải trước tối ưu.",
    ],
    micro: [
      "Đặt một trần rủi ro tuyệt đối cho mỗi vị thế (bright-line) trước khi vào — chống rủi ro đuôi mà không cần tính toán mỗi lần.",
    ],
  },
  "Gottman: bốn kỵ sĩ, bids & sửa chữa": {
    pitfalls: [
      "Để khinh miệt (mỉa mai, đảo mắt) len vào xung đột — yếu tố dự báo đổ vỡ mạnh nhất.",
      "Bỏ qua lời mời kết nối nhỏ hằng ngày (turning away) — tần suất đáp bids dự báo quan hệ hơn xử lý xung đột lớn.",
    ],
    micro: [
      "Đáp lại một 'bid' nhỏ của người thân hôm nay bằng sự chú ý thật (ngẩng lên, hỏi tiếp) — xây số dư cảm xúc, vài giây.",
    ],
  },
  "Attachment người lớn & earned security": {
    pitfalls: [
      "Đọc phản ứng do working model cũ kích hoạt là 'sự thật hiện tại' — dễ hiểu lầm/leo thang.",
      "Diễn giải né tránh/lo âu của đối phương thành 'không yêu' — thực ra là chiến lược đối phó cùng nhu cầu gắn bó.",
    ],
    micro: [
      "Khi phản ứng mạnh trong quan hệ, tạm dừng hỏi: 'đây là hiện tại hay mô hình cũ đang kích hoạt?' — một câu, giảm phản xạ.",
    ],
  },
  "Differentiation of self (Bowen)": {
    pitfalls: [
      "Fusion (nhượng bộ để yên) hoặc cut-off (cắt đứt để thoát) — cả hai đều thiếu biệt hóa.",
      "Kéo bên thứ ba vào phàn nàn (triangulation) thay vì nói thẳng — nuôi căng thẳng ngầm.",
    ],
    micro: [
      "Trước khi phản ứng với kỳ vọng gia đình, hỏi: 'đây là đánh giá của mình hay áp lực hệ thống?' — giữ tự chủ, vài giây.",
    ],
  },
  "Cô đơn, kết nối & chất lượng vs số lượng": {
    pitfalls: [
      "Tăng số 'bạn xã giao' để bớt cô đơn — cô đơn chủ quan (chất lượng) mới dự báo sức khỏe, không phải số lượng.",
      "Rút lui khi cô đơn (do diễn giải bị từ chối) — nuôi vòng xoáy tự duy trì.",
    ],
    micro: [
      "Gửi một tin nhắn thật lòng tới một người trong vòng cốt lõi hôm nay — chống cô đơn hiệu quả, 30 giây.",
    ],
  },
  "Weak ties, structural holes & networking thật": {
    pitfalls: [
      "Chỉ networking khi cần việc — 'takers' xây mạng yếu; givers bền hơn dài hạn.",
      "Bỏ rơi 'dormant ties' (đồng nghiệp cũ) — đây thường là kênh cơ hội giá trị cao bất ngờ khi pivot.",
    ],
    micro: [
      "Nhắn hỏi thăm/chia sẻ một thứ hữu ích cho một weak/dormant tie mỗi tuần — giữ mạng ấm, 2 phút.",
    ],
  },
  "Dunbar, social comparison & vệ sinh kỹ thuật số": {
    pitfalls: [
      "Pha loãng năng lượng quan hệ đều cho quá nhiều người — vòng ~5 cốt lõi bị bỏ đói.",
      "Lướt thụ động nội dung so sánh (highlight reel) — tương quan giảm wellbeing rõ nhất.",
    ],
    micro: [
      "Bỏ theo dõi/ẩn vài tài khoản khiến bạn so sánh tiêu cực — một lần bấm, giảm liều so sánh mỗi ngày.",
    ],
  },
  "Social capital: bonding, bridging, linking": {
    pitfalls: [
      "Chỉ đầu tư bonding (người giống mình) — thiếu bridging, bỏ lỡ thông tin/cơ hội mới (homophily).",
      "Chỉ khai thác cộng đồng, không đóng góp — vốn xã hội tập thể cạn, uy tín không tích lũy.",
    ],
    micro: [
      "Tham gia một nhóm/cộng đồng ngoài vòng thân quen (fintech/ESG) tuần này — một hành động, mở bridging capital.",
    ],
  },
  "Third places & sự thuộc về đều đặn": {
    pitfalls: [
      "Coi tương tác online thay được third place thật — mere exposure trực diện mạnh hơn.",
      "Đổi địa điểm/nhóm liên tục — lặp lại ĐỀU ĐẶN mới tạo quan hệ, không phải cường độ.",
    ],
    micro: [
      "Ghép third place vào mục tiêu sẵn có: đăng ký một lớp/nhóm chạy cố định giờ — một hành động, nhiều đích.",
    ],
  },
  "Đóng góp, generativity & 'helper's high'": {
    pitfalls: [
      "Tham gia thiện nguyện như 'liều thuốc sức khỏe' đảm bảo — selection effect mạnh, nhân quả chưa vững.",
      "Over-giving tới kiệt sức — đóng góp quá sức phản tác dụng; giữ giới hạn.",
    ],
    micro: [
      "Trả lời một câu hỏi/chia sẻ một tài nguyên hữu ích cho người đi sau khi gặp dịp — generativity liều nhỏ, khớp lịch bận.",
    ],
  },
  "Social identity: thuộc về, ý nghĩa tập thể & mặt tối": {
    pitfalls: [
      "Dồn toàn bộ danh tính vào nghề — mất việc thành khủng hoảng bản sắc; cần đa dạng bản sắc làm đệm.",
      "Gắn bó sâu một nhóm tới mù quáng 'nhóm mình vs họ' — giữ cởi mở liên nhóm và tư duy độc lập.",
    ],
    micro: [
      "Duy trì tham gia tối thiểu một cộng đồng phi-công-việc (chạy bộ, ngôn ngữ) — giữ đa dạng bản sắc như bảo hiểm tâm lý.",
    ],
  },
});
const ENJOYMENT_PILLAR = {
  id: "enjoyment",
  num: "07",
  icon: Sparkles,
  title: "Tận hưởng & Vẻ đẹp",
  subtitle: "Niềm vui, dòng chảy, nghệ thuật, cái đẹp, vui chơi",
  groups: [
    {
      label: "Tận hưởng & cảm xúc tích cực",
      note: "File tới đây nghiêng nặng về tối ưu và vận hành. Nhóm này về phần đối trọng: niềm vui, cái đẹp, sự chơi đùa — không phải công cụ để làm việc tốt hơn, mà là giá trị tự thân của một đời đáng sống. Lưu ý trung thực: nhiều can thiệp 'tâm lý học tích cực' có effect size nhỏ hơn quảng bá ban đầu (chịu ảnh hưởng replication crisis) — nên xem là hướng đi có ích, không phải công thức đảm bảo.",
      sections: [
        {
          heading: "Savoring & broaden-and-build",
          evidence: "moderate",
          mechanism: "Cảm xúc tích cực không chỉ là 'kết quả' của đời tốt mà còn là ĐỘNG CƠ: chúng mở rộng nhận thức và xây nguồn lực lâu dài (thể chất, trí tuệ, xã hội) — 'broaden-and-build' (Fredrickson). Savoring — chủ động kéo dài và khuếch đại trải nghiệm tích cực — là kỹ năng luyện được, khác với chỉ 'có trải nghiệm vui'.",
          expertNote: "Bryant phân biệt các dạng savoring theo thời gian: trước (anticipating — mong đợi có chủ đích), trong (savoring the moment — chú ý trọn vẹn, chia sẻ, ghi khắc), sau (reminiscing — hồi tưởng). Kẻ thù của savoring: 'kill-joy thinking' (tự dập niềm vui bằng lo lắng/so sánh/nghĩ việc khác). Điểm trung thực: 'tỷ lệ tích cực/tiêu cực 3:1' của Fredrickson (Losada line) đã bị bác bỏ về mặt toán học — bỏ con số cụ thể, giữ nguyên lý cảm xúc tích cực có giá trị xây dựng. Hedonic adaptation làm mọi niềm vui phai; savoring và đa dạng hóa (variety) chống lại sự phai đó.",
          theory: "Fredrickson (broaden-and-build); Bryant & Veroff (savoring).",
          controversy: "Nhiều tuyên bố tâm lý học tích cực (positivity ratio, một số can thiệp) bị điều chỉnh xuống sau replication crisis. 'Ép tích cực' (toxic positivity) phản tác dụng — savoring không phải phủ nhận cảm xúc khó.",
          application: [
            { domain: "Tận hưởng khoảnh khắc", text: "Khi có trải nghiệm đẹp (bữa ăn ngon, hoàng hôn, một bản nhạc), dừng 20 giây chú ý trọn vẹn thay vì lướt qua/chụp ảnh vội — chú ý là chất khuếch đại niềm vui." },
            { domain: "Ba thì của niềm vui", text: "Mong đợi (lên kế hoạch cho việc mình háo hức), tận hưởng trong khoảnh khắc, và hồi tưởng (kể lại/xem lại) — một trải nghiệm cho niềm vui ba lần nếu savoring cả ba thì." },
            { domain: "Chống kill-joy", text: "Để ý thói tự dập niềm vui (lo việc chưa xong, so sánh, 'lẽ ra phải hơn') và chủ động quay lại hiện tại." },
            { domain: "Chia sẻ", text: "Kể trải nghiệm đẹp cho người thân (capitalization) — vừa khuếch đại niềm vui của mình vừa xây quan hệ." },
          ],
        },
        {
          heading: "Vui chơi, giải trí chủ động & 'autotelic'",
          evidence: "moderate",
          mechanism: "Vui chơi (play) — hoạt động làm vì chính nó, không vì kết quả — có vai trò trong sáng tạo, gắn kết và wellbeing ở cả người lớn, không chỉ trẻ em. Giải trí CHỦ ĐỘNG (tạo ra, tham gia) khác giải trí THỤ ĐỘNG (tiêu thụ) về giá trị wellbeing.",
          expertNote: "Nghịch lý giải trí: hoạt động thụ động dễ (lướt điện thoại, xem vô định) cho khoái cảm tức thì thấp và thường để lại cảm giác trống/tệ hơn; hoạt động chủ động khó khởi động hơn (nhạc cụ, thể thao, làm đồ, trò chơi thật) cho wellbeing cao hơn — 'activation energy' cao nên hay bị bỏ. Với người bận và kiệt sức nhận thức, cái bẫy là mặc định rơi vào giải trí thụ động vì nó dễ. Thiết kế môi trường để giải trí chủ động thành lựa chọn mặc định (nhạc cụ để sẵn, đồ chơi/dụng cụ trong tầm với).",
          theory: "Stuart Brown (play); Csikszentmihalyi (autotelic — hoạt động tự thân là mục đích); nghiên cứu active vs passive leisure.",
          controversy: "Ranh giới không cứng — xem một bộ phim hay có chủ đích có thể là chủ động về mặt tinh thần; vấn đề là tiêu thụ vô định/mặc định.",
          application: [
            { domain: "Chống mặc định thụ động", text: "Nhận diện khi rơi vào lướt vô định vì kiệt sức; đặt một lựa chọn chủ động dễ khởi động thay thế (một cuốn sách đang đọc dở để cạnh sofa, nhạc cụ ngoài bao)." },
            { domain: "Vui chơi người lớn", text: "Cho phép mình hoạt động 'không có mục đích năng suất' — vẽ, chơi board game, nhảy, nghịch — chống văn hóa tối ưu-hóa-mọi-thứ." },
            { domain: "Cho lịch bận", text: "Một 'liều vui chơi' nhỏ đều đặn (15 phút) hơn chờ 'khi rảnh mới chơi lớn' — vui chơi là dinh dưỡng, không phải phần thưởng cuối." },
          ],
        },
      ],
    },
    {
      label: "Dòng chảy & sự đắm mình",
      sections: [
        {
          heading: "Flow — trạng thái đắm mình tối ưu",
          evidence: "moderate",
          mechanism: "Flow: trạng thái đắm mình hoàn toàn vào hoạt động, mất ý thức về thời gian và bản thân, xảy ra khi thử thách khớp với kỹ năng ở mức hơi vượt vùng thoải mái. Flow tương quan với wellbeing và là một trong các nguồn 'ý nghĩa qua trải nghiệm' mạnh.",
          expertNote: "Điều kiện của flow (Csikszentmihalyi): mục tiêu rõ, phản hồi tức thì, cân bằng thử thách–kỹ năng. Quá dễ → chán; quá khó → lo âu; khớp → flow. Flow khác thư giãn thụ động — nó là nỗ lực có thưởng, không phải nghỉ ngơi. Nghịch lý: người ta báo cáo flow ở CÔNG VIỆC nhiều hơn ở giải trí, nhưng lại KHAO KHÁT giải trí hơn — vì giải trí thụ động dễ vào nhưng ít flow. Thiết kế đời sống để có nhiều hoạt động autotelic (tự thân đáng làm) là đòn bẩy wellbeing lớn. Cảnh báo: 'flow' cũng có thể gây nghiện lệch (game, mạng xã hội thiết kế để tạo pseudo-flow) — flow lành mạnh là hoạt động xây dựng năng lực/kết nối.",
          theory: "Csikszentmihalyi (flow).",
          controversy: "Đo flow chủ yếu dựa tự báo cáo; một số hoạt động tạo 'flow giả' (nghiện) không cho lợi ích thật.",
          application: [
            { domain: "Thiết kế hoạt động flow", text: "Chọn hoạt động khớp thử thách–kỹ năng: đủ khó để cuốn, đủ trong tầm để không nản; điều chỉnh độ khó khi kỹ năng lên (leo núi tiếng Trung, một môn thể thao, viết, làm đồ)." },
            { domain: "Bảo vệ điều kiện flow", text: "Flow cần không gián đoạn — bảo vệ khối thời gian không thông báo cho cả hoạt động sáng tạo lẫn sở thích, không chỉ công việc." },
            { domain: "Chuyển giải trí sang flow", text: "Ưu tiên sở thích tạo flow thật (chơi nhạc, vẽ, nấu, thể thao) hơn tiêu thụ tạo flow giả (lướt vô định); cùng thời gian, wellbeing khác hẳn." },
          ],
        },
        {
          heading: "Sở thích bổ ích & 'serious leisure'",
          evidence: "moderate",
          mechanism: "'Serious leisure' (Stebbins): theo đuổi một sở thích/hoạt động nghiệp dư một cách hệ thống, tích lũy kỹ năng và bản sắc — khác giải trí thoáng qua. Nó cho nhiều thứ cùng lúc: flow, mastery, cộng đồng, bản sắc, ý nghĩa.",
          expertNote: "Sở thích bổ ích là 'điểm giao' hiệu quả cao vì phủ nhiều trụ cột cùng lúc: một sở thích như leo núi/chạy bộ/học nhạc/làm gốm cho vận động HOẶC flow, cộng đồng (trụ 06), mastery (trụ 03/04), bản sắc đa dạng (đệm tâm lý, trụ 06), và niềm vui (trụ 07). Với người bận, chọn sở thích 'đa đích' cho ROI wellbeing cao nhất. Phân biệt sở thích tiêu dùng (mua đồ về ít dùng) với sở thích thực hành (thực sự làm). Sở thích cũng chống 'đơn văn hóa bản sắc' (chỉ là công việc) — quan trọng khi đang pivot nghề đầy bất định.",
          theory: "Stebbins (serious leisure).",
          controversy: "Ranh giới khi sở thích thành 'công việc thứ hai' áp lực (biến niềm vui thành KPI) — giữ tinh thần chơi.",
          application: [
            { domain: "Chọn sở thích đa đích", text: "Ưu tiên sở thích phủ nhiều trụ cột: nhóm chạy bộ (thể chất + cộng đồng + flow), học nhạc cụ (flow + mastery + niềm vui), làm gốm/vẽ (flow + sáng tạo + thư giãn)." },
            { domain: "Bản sắc ngoài công việc", text: "Nuôi ít nhất một sở thích cho bản sắc 'không phải nghề' — đệm tâm lý quan trọng khi nghề nghiệp bất định (pivot)." },
            { domain: "Giữ tinh thần chơi", text: "Đừng biến sở thích thành KPI/thành tích để khoe; giữ nó là nơi được dở mà vẫn vui — chống văn hóa tối ưu hóa mọi thứ." },
          ],
        },
      ],
    },
    {
      label: "Cái đẹp, kinh ngạc & nghệ thuật",
      sections: [
        {
          heading: "Kinh ngạc (awe) & 'small self'",
          evidence: "moderate",
          mechanism: "Kinh ngạc — cảm xúc trước điều vĩ đại vượt khung hiểu hiện tại (thiên nhiên hùng vĩ, âm nhạc, nghệ thuật, khoảnh khắc tâm linh, hành động đạo đức lớn) — thu nhỏ cảm giác về cái tôi ('small self'), tăng cảm giác kết nối, hào phóng và hài lòng cuộc sống, và làm thời gian cảm thấy dồi dào hơn.",
          expertNote: "Keltner: awe là cảm xúc bị bỏ quên nhưng có tác động lớn — giảm bận tâm về bản thân, tăng prosociality, hạ dấu ấn viêm (IL-6) trong một số nghiên cứu, và 'mở rộng nhận thức về thời gian' (giảm cảm giác vội vã). Awe dễ tiếp cận hơn ta nghĩ — không cần Grand Canyon; 'awe hằng ngày' (moral beauty của người khác, âm nhạc, bầu trời, một ý tưởng lớn) cũng hiệu quả. 'Awe walks' (đi bộ với chủ đích tìm điều đáng kinh ngạc) tăng cảm xúc tích cực trong nghiên cứu. Awe là cầu nối tới ý nghĩa/siêu việt (trụ 08).",
          theory: "Keltner & Haidt (awe); nghiên cứu awe walks.",
          controversy: "Nghiên cứu awe còn tương đối mới; một số hiệu ứng (như giảm viêm) cần tái lập thêm.",
          application: [
            { domain: "Awe hằng ngày", text: "Chủ đích tìm điều đáng kinh ngạc trong ngày thường: bầu trời, một bản nhạc lớn, một ý tưởng khoa học, lòng tốt của ai đó — awe không cần đi xa." },
            { domain: "Awe walk", text: "Thỉnh thoảng đi bộ với chủ đích chú ý cái rộng lớn/mới lạ (thiên nhiên, kiến trúc, chi tiết chưa từng để ý) — ghép với 'restoration break' của trụ Thể chất." },
            { domain: "Chống vội vã", text: "Awe làm thời gian cảm thấy dồi dào hơn — một liều đối trọng mạnh cho cảm giác 'nghèo thời gian' của lịch bận." },
            { domain: "Du lịch/khám phá", text: "Thiết kế chuyến đi quanh khoảnh khắc kinh ngạc (thiên nhiên, văn hóa, nghệ thuật) hơn là 'check-in' — awe là nguồn ký ức đẹp bền nhất." },
          ],
        },
        {
          heading: "Nghệ thuật, âm nhạc & văn chương như dưỡng chất",
          evidence: "moderate",
          mechanism: "Trải nghiệm nghệ thuật (nghe nhạc, xem phim, đọc văn, xem tranh, biểu diễn) khơi 'cảm xúc thẩm mỹ' và cho ý nghĩa, kết nối, và sự phong phú nội tâm khó thay thế. Âm nhạc có thể tạo 'chills/frisson' — phản ứng dopamine đo được. Đọc tiểu thuyết được cho là luyện 'theory of mind' (hiểu tâm trí người khác).",
          expertNote: "Nghệ thuật cho vài thứ riêng biệt: (1) cảm xúc thẩm mỹ tự thân (cái đẹp là giá trị, không cần biện minh công cụ); (2) 'aesthetic chills' — âm nhạc/khoảnh khắc nghệ thuật gây rùng mình, liên hệ dopamine và trải nghiệm siêu việt; (3) văn chương/phim mở rộng trải nghiệm sống gián tiếp — sống nhiều cuộc đời, nuôi đồng cảm; (4) nghệ thuật buồn/bi kịch cho 'nỗi buồn đẹp' có giá trị (paradox of tragedy). Trung thực: bằng chứng 'đọc fiction tăng empathy' (Kidd & Castano) tái lập hỗn hợp — nhưng giá trị nội tại của nghệ thuật không cần biện minh bằng lợi ích đo được. TẠO nghệ thuật (không chỉ tiêu thụ) còn cho thêm flow và tự biểu đạt.",
          theory: "Nghiên cứu aesthetic emotions/chills (Salimpoor — dopamine và âm nhạc); Kidd & Castano (fiction & theory of mind, tái lập hỗn hợp).",
          controversy: "Một số tuyên bố lợi ích công cụ của nghệ thuật (fiction → empathy) tái lập yếu; nhưng giá trị nội tại (cái đẹp, ý nghĩa) không phụ thuộc vào đó.",
          application: [
            { domain: "Nghệ thuật có chủ đích", text: "Lên lịch trải nghiệm nghệ thuật thật sự chú ý (một buổi hòa nhạc, một bộ phim không vừa xem vừa làm việc, đọc sâu một cuốn sách) — chất lượng chú ý quyết định giá trị." },
            { domain: "Tạo, không chỉ tiêu thụ", text: "Thử tự biểu đạt: viết, vẽ, chơi nhạc, nhiếp ảnh — tạo nghệ thuật cho thêm flow và tiếng nói nội tâm, dù 'không giỏi'." },
            { domain: "Đa dạng thẩm mỹ", text: "Chủ động mở rộng gu (thể loại nhạc/phim/sách mới) — cái đẹp mới chống hedonic adaptation, giữ đời tươi mới." },
            { domain: "Kết nối qua nghệ thuật", text: "Chia sẻ và bàn về nghệ thuật với người khác (câu lạc bộ sách, cùng xem/nghe) — kết hợp cái đẹp với kết nối (trụ 05/06)." },
          ],
        },
      ],
    },
  ],
};

const MEANING_PILLAR = {
  id: "meaning",
  num: "08",
  icon: Compass,
  title: "Ý nghĩa, Tinh thần & Sự trọn vẹn",
  subtitle: "Biết ơn, đủ đầy, siêu việt, hữu hạn, ước mơ, phẩm cách",
  groups: [
    {
      label: "Biết ơn & sự đủ đầy",
      note: "Cả file tới đây nghiêng về 'tối ưu, phấn đấu, thêm'. Nhóm này là đối trọng thiết yếu: lòng biết ơn, sự đủ đầy, và câu hỏi 'bao nhiêu là đủ' — nếu thiếu, mọi tối ưu chỉ nuôi một chiếc guồng quay không điểm dừng.",
      sections: [
        {
          heading: "Lòng biết ơn & chống hedonic adaptation",
          evidence: "moderate",
          mechanism: "Lòng biết ơn — chú ý và trân trọng điều tốt mình đang có/nhận được — tương quan với wellbeing, quan hệ tốt hơn và ít trầm cảm. Cơ chế: chống 'hedonic adaptation' (quen dần với cái tốt tới mức không còn thấy) và dịch chú ý từ thiếu sang đủ.",
          expertNote: "Emmons & McCullough: viết nhật ký biết ơn định kỳ cho hiệu ứng dương nhỏ-vừa. TRUNG THỰC: một số nghiên cứu biết ơn overclaim, và làm quá thường xuyên/máy móc giảm tác dụng (adaptation ngay cả với lòng biết ơn). Hiệu quả hơn khi: cụ thể (không chung chung), thỉnh thoảng (1–2 lần/tuần hơn hằng ngày), tập trung vào CON NGƯỜI (không chỉ vật/sự kiện), và có yếu tố bất ngờ/mới. 'Hedonic adaptation' là kẻ thù trung tâm của wellbeing — ta quen với mọi thứ tốt (lương mới, đồ mới, thành tựu) và trở lại baseline; biết ơn + đa dạng + savoring là ba lực chống lại. 'Negative visualization' (Stoic — tưởng tượng mất điều mình có) là biến thể mạnh của biết ơn.",
          theory: "Emmons & McCullough (gratitude); Brickman (hedonic adaptation/treadmill); Stoic negative visualization.",
          controversy: "Một số can thiệp biết ơn effect size khiêm tốn/overclaim; làm máy móc/ép buộc giảm tác dụng. Không phải liều thuốc cho trầm cảm lâm sàng.",
          application: [
            { domain: "Biết ơn hiệu quả", text: "1–2 lần/tuần (không hằng ngày máy móc), viết cụ thể vài điều — ưu tiên biết ơn về CON NGƯỜI và điều bất ngờ, hơn danh sách chung chung lặp lại." },
            { domain: "Negative visualization", text: "Thỉnh thoảng tưởng tượng nếu không có điều mình đang coi là hiển nhiên (sức khỏe, người thân) — làm sống lại giá trị của cái đang có, mạnh hơn biết ơn thường." },
            { domain: "Chống adaptation", text: "Nhận ra mình đang quen dần với thành tựu/tài sản mới (lương, nhà, cột mốc) — chủ động savoring và biết ơn để không trôi về baseline vô cảm." },
            { domain: "Nói ra", text: "Bày tỏ biết ơn trực tiếp với người (tin nhắn, lời nói) — 'gratitude letter/visit' cho hiệu ứng mạnh nhất, và nuôi cả quan hệ." },
          ],
        },
        {
          heading: "Sự đủ đầy, 'enough' & thoát guồng quay",
          evidence: "moderate",
          mechanism: "Con người trên 'hedonic treadmill' và 'satisfaction treadmill': đạt được điều mong muốn → thích nghi → đặt mục tiêu cao hơn → không bao giờ 'đủ'. 'Arrival fallacy' (Ben-Shahar): niềm tin sai rằng đạt mục tiêu sẽ mang hạnh phúc bền — thường hụt hẫng sau khi đạt.",
          expertNote: "Câu hỏi 'bao nhiêu là đủ' là một trong các câu hỏi wellbeing quan trọng nhất mà văn hóa tối ưu/phấn đấu né tránh. Nghiên cứu thu nhập–hạnh phúc: hạnh phúc tăng theo thu nhập nhưng với hiệu suất giảm dần (Kahneman-Killingsworth 2023 tinh chỉnh: tiếp tục tăng với đa số nhưng chậm dần, và một nhóm 'kém hạnh phúc' đạt ngưỡng). Điểm expert: xác định 'điểm đủ' (enough point) có chủ đích cho tiền/thành tựu, và chuyển năng lượng vượt điểm đó sang ý nghĩa/quan hệ/trải nghiệm — chống cả đời chạy theo cột mốc lùi dần. Đây KHÔNG phải chống tham vọng; là hướng tham vọng có ý thức thay vì để guồng quay mặc định điều khiển.",
          theory: "Brickman & Campbell (hedonic treadmill); Ben-Shahar (arrival fallacy); Kahneman-Killingsworth (income & wellbeing).",
          controversy: "Không phải cổ vũ tự mãn/dừng phấn đấu — mà phấn đấu có ý thức về 'đủ'. 'Điểm đủ' cá thể hóa cao, khó định lượng.",
          application: [
            { domain: "Định nghĩa 'đủ'", text: "Viết ra 'điểm đủ' có chủ đích cho tiền/thành tựu/vật chất — vượt điểm đó, chuyển năng lượng sang ý nghĩa/quan hệ/trải nghiệm thay vì tự động đặt cột mốc cao hơn." },
            { domain: "Chống arrival fallacy", text: "Trước khi theo đuổi một cột mốc lớn (pivot, tài chính), nhắc mình đạt được sẽ KHÔNG mang hạnh phúc bền như tưởng — tận hưởng hành trình, không đặt cược wellbeing vào đích." },
            { domain: "Tham vọng có ý thức", text: "Phân biệt tham vọng bạn THỰC SỰ chọn với tham vọng do so sánh xã hội/guồng quay áp đặt — hướng năng lượng vào cái đầu, buông bớt cái sau." },
          ],
        },
      ],
    },
    {
      label: "Siêu việt & sự kết nối lớn hơn",
      sections: [
        {
          heading: "Siêu việt, tâm linh & kết nối với cái lớn hơn",
          evidence: "moderate",
          mechanism: "Trải nghiệm tự-siêu-việt (self-transcendent) — cảm giác vượt khỏi cái tôi nhỏ hẹp, kết nối với điều lớn hơn (thiên nhiên, nhân loại, thiêng liêng, một lý tưởng) — liên hệ với wellbeing, ý nghĩa và giảm sợ chết. Có thể đến qua tôn giáo, thiền, thiên nhiên, awe, hoặc cống hiến cho điều vượt bản thân.",
          expertNote: "Tôn giáo/tâm linh tương quan với một số kết cục sức khỏe/wellbeing tốt hơn, nhưng phần lớn hiệu ứng đến từ THÀNH PHẦN XÃ HỘI (cộng đồng, hỗ trợ, ý nghĩa chung) và cấu trúc/nghi thức — không nhất thiết cần niềm tin siêu nhiên để hưởng phần lớn lợi ích. Với người thế tục, các nguồn siêu việt gồm: thiên nhiên, awe, thiền chánh niệm/từ bi, nghệ thuật, cống hiến, và cảm thức về sự liên kết của vạn vật. Thiền có bằng chứng vừa cho một số kết cục (giảm lo âu, chú ý) nhưng bị overclaim rộng rãi — lợi ích thật nhưng khiêm tốn hơn quảng bá. 'Peak experiences' (Maslow) và 'self-transcendent experiences' cho ý nghĩa sâu và đôi khi thay đổi lâu dài.",
          theory: "Maslow (self-transcendence, peak experiences); nghiên cứu religion/spirituality & health (thành phần xã hội); Yaden (self-transcendent experiences).",
          controversy: "Nhân quả tôn giáo→sức khỏe khó tách khỏi thành phần xã hội/lối sống. Thiền bị overclaim; không phải thuốc chữa bách bệnh và hiếm khi có tác dụng phụ được nói tới. Đây là vùng cá nhân sâu — không có 'đúng' phổ quát.",
          application: [
            { domain: "Tìm nguồn siêu việt của riêng mình", text: "Xác định điều cho bạn cảm giác kết nối với cái lớn hơn — thiên nhiên, thiền, nghệ thuật, tôn giáo, cống hiến, hoặc chiêm nghiệm vũ trụ/khoa học — và nuôi nó có chủ đích." },
            { domain: "Thực hành chiêm nghiệm", text: "Thử thiền chánh niệm/từ bi với kỳ vọng thực tế (lợi ích vừa phải, cần đều đặn) — hoặc các con đường khác (đi bộ thiên nhiên, cầu nguyện, chiêm ngưỡng) nếu hợp hơn." },
            { domain: "Astrology/Tử Vi như chiêm nghiệm", text: "Nếu các hệ như chiêm tinh/Tử Vi mang lại khung chiêm nghiệm bản thân và ý nghĩa cho bạn, có thể dùng như công cụ phản tư/kể chuyện — giữ ý thức về ranh giới bằng chứng (giá trị ở tự-phản-tư và ý nghĩa chủ quan, không phải dự báo)." },
            { domain: "Kết nối cộng đồng ý nghĩa", text: "Phần lớn lợi ích của con đường tâm linh đến từ cộng đồng chung ý nghĩa — kết hợp với trụ Cộng đồng (06)." },
          ],
        },
      ],
    },
    {
      label: "Hữu hạn & ước mơ",
      sections: [
        {
          heading: "Ý thức về cái hữu hạn & 'bốn nghìn tuần'",
          evidence: "moderate",
          mechanism: "Ý thức rằng thời gian sống là hữu hạn (một đời ~4000 tuần) tái định khung ưu tiên: điều gì thực sự quan trọng khi thời gian không vô hạn. Ý thức về cái chết, một cách nghịch lý, có thể làm sống động và tăng trân trọng hiện tại thay vì gây tê liệt.",
          expertNote: "Hai hướng nghiên cứu: Terror Management Theory (nhắc cái chết có thể gây phòng thủ/bám víu giá trị nhóm) VÀ hướng tích cực (Burkeman 'Four Thousand Weeks', Stoic memento mori, Yalom existential) — ý thức hữu hạn có chủ đích làm rõ ưu tiên và tăng trân trọng. Burkeman: chấp nhận KHÔNG thể làm hết mọi thứ là giải phóng — 'productivity' vô hạn là ảo tưởng; chọn cái gì bỏ dở là kỹ năng sống trung tâm. Nghiên cứu 'death reflection' (khác death anxiety) có thể tăng biết ơn, ưu tiên quan hệ, giảm theo đuổi ngoại tại. Với người tối ưu/tham vọng, đây là đối trọng: không phải làm nhiều hơn, mà chọn đúng ít thứ để làm với thời gian hữu hạn.",
          theory: "Burkeman (Four Thousand Weeks); Yalom (existential); Stoic memento mori; nghiên cứu death reflection vs terror management.",
          controversy: "Nhắc cái chết vô ý (mortality salience) có thể gây phòng thủ (TMT) — khác chiêm nghiệm hữu hạn có chủ đích. Vùng nhạy cảm, cá nhân sâu.",
          application: [
            { domain: "Làm rõ ưu tiên", text: "Thỉnh thoảng hỏi: 'nếu thời gian hữu hạn (nó có hạn), điều gì THỰC SỰ đáng dành 4000 tuần?' — dùng để cắt cái không quan trọng, không phải để hoảng." },
            { domain: "Chấp nhận bỏ dở", text: "Chấp nhận không thể làm hết mọi thứ (Burkeman) — chọn có ý thức cái gì để KHÔNG làm là kỹ năng sống, giải phóng khỏi ám ảnh năng suất vô hạn." },
            { domain: "Ưu tiên quan hệ/trải nghiệm", text: "Ý thức hữu hạn nghiêng cân về quan hệ và trải nghiệm (thứ không mua lại được thời gian) hơn tích lũy — dùng như la bàn cho quyết định lớn." },
            { domain: "Mùa của đời", text: "Nhận ra các giai đoạn đời có 'mùa' (một số việc chỉ làm được ở một giai đoạn) — ưu tiên việc nhạy-thời-điểm (sức khỏe tuổi 30, thời gian với người thân lớn tuổi)." },
          ],
        },
        {
          heading: "Ước mơ, hy vọng & thiết kế cuộc đời",
          evidence: "moderate",
          mechanism: "Hy vọng (hope) không phải cảm xúc thụ động mà là nhận thức có cấu trúc: 'agency' (tin mình có thể hành động) + 'pathways' (thấy được các con đường tới mục tiêu). 'Possible selves' — hình dung các phiên bản tương lai của mình — định hướng động lực và quyết định.",
          expertNote: "Snyder's Hope Theory: hy vọng cao = vừa có ý chí (agency) vừa có kế hoạch đa đường (pathways) — luyện được, không chỉ tính khí. Markus & Nurius (possible selves): hình dung 'con người mình có thể trở thành' (cả mong muốn lẫn sợ hãi) định hình hành vi hiện tại. 'Designing Your Life' (Burnett & Evans, Stanford): áp tư duy thiết kế vào đời — dựng nhiều 'odyssey plans' (vài phiên bản đời khả dĩ trong 5 năm tới), prototype (thử nghiệm nhỏ, rẻ trước khi cam kết lớn), và 'không có một đời đúng duy nhất'. Cực kỳ hợp giai đoạn pivot. Khác mơ mộng thụ động: nghiên cứu cho thấy chỉ tưởng tượng kết quả tốt (positive fantasizing) mà không có kế hoạch/trở ngại thực ra GIẢM động lực — cần 'mental contrasting' (đối chiếu mơ ước với thực tại/trở ngại) + implementation intentions (WOOP: Wish-Outcome-Obstacle-Plan, Oettingen).",
          theory: "Snyder (hope theory); Markus & Nurius (possible selves); Burnett & Evans (Designing Your Life); Oettingen (mental contrasting/WOOP).",
          controversy: "Mơ mộng tích cực thuần túy (vision boards, 'luật hấp dẫn') KHÔNG hiệu quả và có thể phản tác dụng — cần đối chiếu thực tại + kế hoạch. Hy vọng phi thực tế có thể gây hại.",
          application: [
            { domain: "WOOP thay vì mơ mộng", text: "Với một ước mơ, dùng WOOP: Wish (ước), Outcome (hình dung kết quả đẹp), Obstacle (trở ngại thật bên trong), Plan (if-then vượt trở ngại) — mạnh hơn nhiều so với chỉ 'hình dung tích cực'." },
            { domain: "Odyssey plans (cho pivot)", text: "Viết 3 phiên bản đời khả dĩ cho 5 năm tới (vd: tiếp tục BA nâng cao; pivot capital markets; hướng ESG/fintech) — không để chọn một, mà để thấy nhiều đường và thử nghiệm." },
            { domain: "Prototype rẻ", text: "Trước cam kết lớn, làm 'prototype' nhỏ rẻ: phỏng vấn người trong ngành, dự án thử, khóa học ngắn — giảm rủi ro của quyết định pivot lớn." },
            { domain: "Nuôi hy vọng có cấu trúc", text: "Khi thấy bế tắc, tách ra: mình thiếu AGENCY (tin mình làm được) hay PATHWAYS (thấy đường đi)? — mỗi cái cần can thiệp khác; hy vọng là kỹ năng luyện được." },
            { domain: "Khám phá trong & ngoài", text: "Cân bằng khám phá thế giới bên ngoài (du lịch, trải nghiệm, học) và bên trong (tự hiểu, chiêm nghiệm, sáng tạo) — cả hai nuôi khát vọng và sự sống động." },
          ],
        },
      ],
    },
    {
      label: "Phẩm cách & đức hạnh",
      sections: [
        {
          heading: "Điểm mạnh nhân cách, đức hạnh & sống chính trực",
          evidence: "moderate",
          mechanism: "Con người có các 'character strengths' (điểm mạnh nhân cách) tương đối bền — dùng 'signature strengths' (điểm mạnh nổi trội nhất) theo cách mới tương quan với tăng wellbeing và gắn kết. Sống theo giá trị/đức hạnh (eudaimonia, không chỉ khoái cảm) là con đường ý nghĩa sâu.",
          expertNote: "VIA Classification (Peterson & Seligman): 24 điểm mạnh nhân cách qua 6 nhóm đức hạnh (trí tuệ, can đảm, nhân ái, công bằng, tiết độ, siêu việt). Can thiệp 'dùng signature strength theo cách mới' có bằng chứng dương (dù effect size khiêm tốn, chịu ảnh hưởng replication crisis chung của tâm lý học tích cực). Aristotle: eudaimonia (sống tốt/nở hoa qua đức hạnh) khác hedonia (khoái cảm) — ý nghĩa sâu đến từ trở thành con người mình muốn trở thành, không chỉ cảm thấy tốt. Chính trực (integrity — hành động khớp giá trị) giảm bất hòa nội tâm và xây tự trọng nền tảng (khác tự trọng dựa thành tựu, mong manh hơn). 'Moral elevation' (cảm động trước đức hạnh của người khác) truyền cảm hứng hành vi tốt.",
          theory: "Peterson & Seligman (VIA character strengths); Aristotle (eudaimonia/virtue ethics); nghiên cứu integrity & self-esteem.",
          controversy: "Can thiệp điểm mạnh có effect size khiêm tốn (replication crisis). 'Đức hạnh' mang màu văn hóa — nhưng khung VIA được thiết kế để phổ quát liên văn hóa (có tranh luận).",
          application: [
            { domain: "Biết & dùng điểm mạnh", text: "Xác định 3–5 signature strengths của mình (khảo sát VIA miễn phí, hoặc tự phản tư) và tìm cách dùng chúng theo cách mới trong công việc/quan hệ hằng ngày." },
            { domain: "Sống chính trực", text: "Định kỳ kiểm: hành động của mình có khớp giá trị đã tuyên bố không? — khoảng cách giữa giá trị và hành vi tạo bất hòa; thu hẹp nó xây tự trọng nền tảng." },
            { domain: "Con người muốn trở thành", text: "Đóng khung quyết định không chỉ 'kết quả nào tốt' mà 'con người nào mình muốn trở thành khi làm việc này' — eudaimonia là trở thành, không chỉ đạt được." },
            { domain: "Nuôi bằng tấm gương", text: "Chủ động tiếp xúc với tấm gương đức hạnh (sách, người thật, câu chuyện) — 'moral elevation' truyền cảm hứng hành vi tốt hơn là ép buộc bản thân." },
          ],
        },
      ],
    },
  ],
};
Object.assign(EXTRAS, {
  "Thực phẩm nguyên bản vs siêu chế biến (UPF) — tách tín hiệu khỏi marketing": {
    pitfalls: [
      "Trả giá cao cho 'superfood' được thổi phồng — không món đơn lẻ nào là phép màu; đa dạng thực vật rẻ tiền giá trị hơn.",
      "Villain hóa/thần thánh hóa từng món (tránh seed oils, tôn thờ dừa) — đi ngược bằng chứng; tổng thể chế độ ăn mới quan trọng.",
      "Cực đoan/tội lỗi hóa món ăn — hại quan hệ với thức ăn và dễ gây ăn vô độ bù trừ.",
    ],
    micro: [
      "Quy tắc 5 giây khi mua đồ đóng gói: nhìn danh sách thành phần — ngắn và nhận ra tên nguyên liệu thật = ổn; nhiều tên lạ = siêu chế biến.",
      "Thủ sẵn 'đồ nguyên bản tiện' (trái cây, hạt, sữa chua không đường, trứng luộc) — chống rơi vào UPF khi đói và bận.",
    ],
  },
  "Mối quan hệ với thức ăn, nấu nướng & niềm vui ẩm thực": {
    pitfalls: [
      "Ăn kiêng hạn chế cứng nhắc — dự báo ăn vô độ bù trừ (restraint → disinhibition).",
      "Vừa ăn vừa làm việc/lướt điện thoại — mất khoái cảm lẫn tín hiệu no; ăn nhiều mà ít thỏa mãn.",
    ],
    micro: [
      "Batch cook một nồi đạm + rau cuối tuần — nền cho nhiều bữa nguyên bản trong tuần bận, một lần nấu.",
      "Một bữa/tuần ăn cùng người thân không màn hình — commensality là dự báo wellbeing bị đánh giá thấp.",
    ],
  },

  "Savoring & broaden-and-build": {
    pitfalls: [
      "Chụp ảnh vội rồi lướt tiếp thay vì thật sự ở trong khoảnh khắc — thu thập thay cho tận hưởng.",
      "'Kill-joy thinking': tự dập niềm vui bằng lo việc chưa xong/so sánh/'lẽ ra phải hơn'.",
      "Ép tích cực (toxic positivity) — phủ nhận cảm xúc khó không phải savoring.",
    ],
    micro: [
      "Khi có khoảnh khắc đẹp, dừng 20 giây chú ý trọn vẹn trước khi làm gì khác — chú ý là chất khuếch đại niềm vui, 0 chi phí.",
    ],
  },
  "Vui chơi, giải trí chủ động & 'autotelic'": {
    pitfalls: [
      "Mặc định rơi vào lướt vô định vì kiệt sức — khoái cảm thấp, thường để lại cảm giác tệ hơn.",
      "Coi vui chơi là 'phần thưởng cuối' chờ khi rảnh — nó là dinh dưỡng, không phải tráng miệng.",
    ],
    micro: [
      "Để một lựa chọn giải trí chủ động trong tầm với (sách đang đọc dở cạnh sofa, nhạc cụ ngoài bao) — giảm activation energy cho lựa chọn tốt.",
    ],
  },
  "Flow — trạng thái đắm mình tối ưu": {
    pitfalls: [
      "Chọn hoạt động quá dễ (chán) hoặc quá khó (lo âu) — flow cần khớp thử thách–kỹ năng.",
      "Nhầm 'flow giả' gây nghiện (lướt, game thiết kế để hút) với flow lành mạnh xây năng lực.",
    ],
    micro: [
      "Bảo vệ một khối không-thông-báo cho sở thích tạo flow (như đã làm cho công việc) — flow cần không gián đoạn.",
    ],
  },
  "Sở thích bổ ích & 'serious leisure'": {
    pitfalls: [
      "Sở thích tiêu dùng (mua đồ về ít dùng) thay vì thực hành — khoe thiết bị không phải làm.",
      "Biến sở thích thành KPI/thành tích áp lực — giết tinh thần chơi vốn là giá trị của nó.",
    ],
    micro: [
      "Chọn một sở thích 'đa đích' (nhóm chạy = thể chất+cộng đồng+flow) — ROI wellbeing cao nhất cho lịch bận.",
    ],
  },
  "Kinh ngạc (awe) & 'small self'": {
    pitfalls: [
      "Nghĩ awe cần cảnh hùng vĩ/đi xa — awe hằng ngày (bầu trời, nhạc, lòng tốt, ý tưởng lớn) cũng hiệu quả.",
      "Vội vã lướt qua điều đáng kinh ngạc — awe cần dừng lại và chú ý.",
    ],
    micro: [
      "Ngước nhìn bầu trời/chú ý một chi tiết đẹp 30 giây khi ra ngoài — liều awe nhỏ làm thời gian cảm thấy dồi dào hơn.",
    ],
  },
  "Nghệ thuật, âm nhạc & văn chương như dưỡng chất": {
    pitfalls: [
      "Vừa xem/nghe vừa làm việc khác — chú ý phân tán giết giá trị thẩm mỹ.",
      "Chỉ tiêu thụ, không bao giờ tạo — bỏ lỡ flow và tiếng nói nội tâm của tự biểu đạt.",
    ],
    micro: [
      "Một lần/tuần nghe trọn một album/xem một phim với sự chú ý đầy đủ (không đa nhiệm) — chất lượng chú ý quyết định giá trị.",
    ],
  },

  "Lòng biết ơn & chống hedonic adaptation": {
    pitfalls: [
      "Viết nhật ký biết ơn máy móc hằng ngày — adaptation làm nó mất tác dụng; 1–2 lần/tuần, cụ thể hiệu quả hơn.",
      "Coi biết ơn là liều thuốc cho trầm cảm lâm sàng — không phải; cần chuyên gia.",
    ],
    micro: [
      "Gửi một tin nhắn biết ơn cụ thể tới một người khi nghĩ tới họ — 'gratitude expression' cho hiệu ứng mạnh nhất, nuôi cả quan hệ.",
    ],
  },
  "Sự đủ đầy, 'enough' & thoát guồng quay": {
    pitfalls: [
      "Không bao giờ định nghĩa 'đủ' — guồng quay đặt cột mốc lùi dần mãi mãi.",
      "Đặt cược wellbeing vào việc đạt cột mốc (arrival fallacy) — thường hụt hẫng sau khi đạt.",
    ],
    micro: [
      "Khi thèm mua/đạt thêm, hỏi một câu: 'điều này phục vụ đời mình, hay phục vụ so sánh xã hội?' — tách tham vọng thật khỏi guồng quay.",
    ],
  },
  "Siêu việt, tâm linh & kết nối với cái lớn hơn": {
    pitfalls: [
      "Kỳ vọng thiền là thuốc chữa bách bệnh — lợi ích thật nhưng vừa phải, bị overclaim rộng rãi.",
      "Bỏ qua thành phần xã hội của con đường tâm linh — phần lớn lợi ích đến từ cộng đồng chung ý nghĩa.",
    ],
    micro: [
      "Dành 2–3 phút chiêm nghiệm/thiền/ở trong thiên nhiên với sự hiện diện đầy đủ — con đường siêu việt nào hợp bạn nhất.",
    ],
  },
  "Ý thức về cái hữu hạn & 'bốn nghìn tuần'": {
    pitfalls: [
      "Để nhắc-cái-chết vô ý gây hoảng/phòng thủ — khác chiêm nghiệm hữu hạn có chủ đích làm rõ ưu tiên.",
      "Ám ảnh làm hết mọi thứ — Burkeman: chấp nhận bỏ dở là kỹ năng sống, không phải thất bại.",
    ],
    micro: [
      "Thỉnh thoảng hỏi 'điều này có đáng một phần trong 4000 tuần của mình không?' — la bàn nhanh cắt cái không quan trọng.",
    ],
  },
  "Ước mơ, hy vọng & thiết kế cuộc đời": {
    pitfalls: [
      "Mơ mộng tích cực thuần (vision board, chỉ hình dung kết quả đẹp) — thực ra GIẢM động lực; cần đối chiếu trở ngại + kế hoạch.",
      "Tin phải chọn 'một đời đúng duy nhất' — thiết kế đời có nhiều phiên bản khả dĩ (odyssey plans).",
    ],
    micro: [
      "Với một ước mơ, chạy WOOP nhanh: Ước → Kết quả → Trở ngại thật → Kế hoạch if-then — biến mơ mộng thành động lực thật.",
    ],
  },
  "Điểm mạnh nhân cách, đức hạnh & sống chính trực": {
    pitfalls: [
      "Dồn sức 'sửa điểm yếu' mà bỏ quên dùng điểm mạnh — dùng signature strengths cho wellbeing cao hơn.",
      "Để khoảng cách giữa giá trị tuyên bố và hành vi thật nới rộng — bất hòa nội tâm bào mòn tự trọng.",
    ],
    micro: [
      "Chọn một signature strength và tìm một cách dùng nó mới trong hôm nay — can thiệp điểm mạnh đơn giản có bằng chứng.",
    ],
  },
});
/* ---------------------------------------------------------------
   MỞ RỘNG ĐỢT 2 — lấp các mảng còn thiếu
   Gắn trực tiếp vào các trụ cột đã có (theo tham chiếu object).
--------------------------------------------------------------- */

/* --- Trụ 01 Thể chất: sức khỏe phụ nữ + không gian sống --- */
PILLARS[0].groups.push(
  {
    label: "Sức khỏe phụ nữ & nội tiết",
    note: "Phần lớn nghiên cứu sinh lý thể thao/dinh dưỡng kinh điển làm trên nam giới; phụ nữ bị thiếu đại diện có hệ thống. Nhóm này nêu điều đã biết và thành thật về điều chưa chắc chắn.",
    sections: [
      {
        heading: "Chu kỳ kinh nguyệt, hormone & điều chỉnh tập luyện/dinh dưỡng",
        evidence: "contested",
        mechanism: "Chu kỳ có hai pha chính: nang trứng (follicular, estrogen tăng dần) và hoàng thể (luteal, progesterone cao). Estrogen có tác dụng đồng hóa/bảo vệ và ảnh hưởng chuyển hóa carb; progesterone tăng nhiệt độ lõi, tăng dị hóa nhẹ và ảnh hưởng điều nhiệt/giấc ngủ.",
        expertNote: "TRUNG THỰC QUAN TRỌNG: 'cycle syncing' (tập nặng pha nang, nhẹ pha hoàng thể) được truyền bá rộng nhưng bằng chứng CÒN YẾU và mâu thuẫn — review gần đây kết luận hiệu ứng của pha chu kỳ lên hiệu suất là nhỏ và biến thiên cá nhân lớn hơn nhiều so với biến thiên theo pha. Đừng để 'cycle syncing' thành lý do bỏ tập. Điều CÓ cơ sở hơn: (1) pha hoàng thể muộn/PMS có thể tăng nhiệt độ lõi, giảm chất lượng giấc ngủ, tăng thèm ăn và giảm cảm giác sẵn sàng — điều chỉnh theo CẢM GIÁC và dữ liệu cá nhân, không theo quy tắc cứng; (2) nhu cầu sắt cao hơn do mất máu kinh nguyệt — thiếu sắt/ferritin thấp phổ biến ở phụ nữ vận động và gây mệt mỏi/giảm hiệu suất, thường bị bỏ sót; (3) RED-S (thiếu hụt năng lượng tương đối) — ăn không đủ so với năng lượng tiêu hao gây mất kinh, mất xương, rối loạn nội tiết; đây là rủi ro thật ở phụ nữ vừa chạy vừa tập vừa ăn kiêng. Mất kinh KHÔNG bao giờ là dấu hiệu 'tập tốt'.",
        theory: "Nghiên cứu sinh lý chu kỳ và hiệu suất (kết quả hỗn hợp); RED-S/Female Athlete Triad (đồng thuận IOC).",
        controversy: "'Cycle syncing' bị thương mại hóa mạnh (app, khóa học) vượt xa bằng chứng. Ngược lại, phụ nữ cũng bị thiếu đại diện trong nghiên cứu — nên 'chưa có bằng chứng' không đồng nghĩa 'không có hiệu ứng'. Vùng cần khiêm tốn cả hai phía.",
        application: [
          { domain: "Theo dõi cá nhân hóa", text: "Ghi chu kỳ cùng với dữ liệu tập/ngủ/năng lượng vài tháng — tìm mẫu hình CỦA BẠN thay vì áp quy tắc chung từ app." },
          { domain: "Điều chỉnh mềm", text: "Không đổi giáo án theo pha một cách cứng nhắc; điều chỉnh theo cảm giác sẵn sàng ngày hôm đó (giữ tổng volume tuần)." },
          { domain: "Sắt — điểm mù phổ biến", text: "Kiểm ferritin (không chỉ hemoglobin) trong xét nghiệm định kỳ; thiếu sắt là nguyên nhân mệt mỏi hay bị bỏ sót ở phụ nữ vừa chạy vừa tập." },
          { domain: "Cảnh báo RED-S", text: "Kinh nguyệt không đều/mất kinh khi đang tập nhiều + ăn ít là DẤU HIỆU ĐỎ (thiếu hụt năng lượng), không phải thành tích — cần ăn đủ và đi khám, không phải tập thêm." },
          { domain: "PMS", text: "Nếu triệu chứng tiền kinh nguyệt ảnh hưởng chức năng sống rõ rệt, đó là điều đáng khám (PMDD có điều trị), không phải điều 'phải chịu đựng'." },
        ],
      },
      {
        heading: "Chuẩn bị dài hạn: tiền mãn kinh, xương & tim mạch",
        evidence: "strong",
        mechanism: "Estrogen bảo vệ xương (ức chế osteoclast) và có tác dụng thuận lợi lên lipid/mạch máu. Sụt estrogen quanh mãn kinh gây tăng tốc mất xương và thay đổi bất lợi hồ sơ tim mạch. Tiền mãn kinh (perimenopause) có thể bắt đầu từ giữa/cuối 30–40 tuổi và kéo dài nhiều năm.",
        expertNote: "Điểm expert cho phụ nữ 30 tuổi: những gì bạn xây BÂY GIỜ quyết định khoảng cách tới ngưỡng nguy hiểm hàng chục năm sau — khối cơ, mật độ xương, sức khỏe chuyển hóa và tim mạch. Đây là lý do trụ Thể chất nhấn mạnh tải nặng và Zone 2. Về HRT (liệu pháp hormone): sau nhiều năm bị hiểu sai do diễn giải quá đà nghiên cứu WHI ban đầu, đồng thuận hiện tại đã tinh chỉnh — với nhiều phụ nữ bắt đầu gần thời điểm mãn kinh, cân bằng lợi ích/rủi ro thuận lợi hơn nhiều so với nỗi sợ phổ biến; nhưng đây là quyết định CÁ THỂ HÓA với bác sĩ, không phải khuyến nghị chung. Triệu chứng tiền mãn kinh (rối loạn giấc ngủ, thay đổi tâm trạng, sương mù não) thường bị chẩn đoán nhầm là 'stress/trầm cảm' vì cả bệnh nhân lẫn bác sĩ ít nghĩ tới.",
        theory: "Sinh lý mãn kinh và mất xương; tái phân tích/tinh chỉnh WHI về HRT.",
        controversy: "HRT là vùng nhiều thông tin sai lệch cả hai chiều (sợ hãi quá mức và quảng bá quá mức trong wellness). Cần bác sĩ chuyên khoa, không phải internet.",
        application: [
          { domain: "Cửa sổ hành động (tuổi 30)", text: "Coi thập kỷ này là giai đoạn 'gửi tiết kiệm': tải nặng cho xương, xây khối cơ, giữ chuyển hóa/tim mạch tốt — lợi tức nhận ở tuổi 50–70." },
          { domain: "Baseline", text: "Có mốc DEXA và panel chỉ số (ApoB, HbA1c, ferritin, vitamin D) ở tuổi 30 để so sánh quỹ đạo về sau." },
          { domain: "Nhận diện sớm", text: "Nếu quanh cuối 30–40 xuất hiện rối loạn giấc ngủ/tâm trạng/chu kỳ bất thường, cân nhắc tiền mãn kinh như một khả năng — thường bị bỏ sót và quy nhầm cho 'stress'." },
          { domain: "Quyết định y tế", text: "Thảo luận HRT (nếu tới lúc) với bác sĩ chuyên khoa dựa hồ sơ cá nhân, không dựa nỗi sợ truyền miệng hay quảng cáo wellness." },
        ],
      },
    ],
  },
  {
    label: "Không gian sống",
    sections: [
      {
        heading: "Môi trường vật lý: nhà cửa, ánh sáng, tiếng ồn & trật tự",
        evidence: "moderate",
        mechanism: "Môi trường vật lý tác động liên tục và phần lớn vô thức lên tâm trạng, giấc ngủ và nhận thức. Tiếng ồn mạn tính (kể cả mức không gây điếc) liên hệ với stress, huyết áp và giấc ngủ kém. Ánh sáng điều khiển nhịp sinh học. Lộn xộn thị giác cạnh tranh nguồn lực chú ý.",
        expertNote: "Đây là ứng dụng của choice architecture vào KHÔNG GIAN: môi trường là 'mặc định' bạn sống trong đó mỗi ngày, nên chỉnh nó một lần cho lợi ích lặp lại mãi — đòn bẩy cao bất thường trên mỗi đơn vị nỗ lực. Ba đòn bẩy có bằng chứng tốt nhất: (1) ÁNH SÁNG — sáng và lạnh ban ngày, tối và ấm buổi tối; (2) TIẾNG ỒN — ô nhiễm tiếng ồn là yếu tố nguy cơ sức khỏe bị đánh giá thấp, đặc biệt ở đô thị VN; (3) TRẬT TỰ THỊ GIÁC — bề mặt gọn giảm tải chú ý (nghiên cứu về clutter và chú ý). Thêm: chất lượng không khí trong nhà (PM2.5) là vấn đề sức khỏe thật ở đô thị châu Á, thường bị bỏ qua hoàn toàn. Về thẩm mỹ: không gian đẹp/có ý nghĩa cá nhân nuôi cảm xúc thẩm mỹ hằng ngày (nối với trụ 07) — nhà không chỉ là nơi ở mà là môi trường nuôi tâm trí.",
        theory: "Nghiên cứu noise pollution & health; chronobiology ánh sáng; nghiên cứu clutter & attention; biophilic design.",
        controversy: "Nhiều tuyên bố 'phong thủy/thiết kế chữa lành' vượt bằng chứng. Các can thiệp có cơ sở khá bình thường: ánh sáng, tiếng ồn, không khí, cây xanh, trật tự.",
        application: [
          { domain: "Ánh sáng", text: "Ban ngày để nhiều ánh sáng tự nhiên nhất có thể; buổi tối chuyển đèn ấm/mờ — hai thay đổi này ảnh hưởng giấc ngủ hơn phần lớn 'mẹo ngủ'." },
          { domain: "Tiếng ồn", text: "Nếu ở đô thị ồn: rèm dày, nút tai/tiếng ồn trắng khi ngủ — tiếng ồn ban đêm phá giấc ngủ ngay cả khi bạn không thức giấc." },
          { domain: "Không khí", text: "Cân nhắc máy lọc không khí ở phòng ngủ nếu sống nơi PM2.5 cao — can thiệp một lần, lợi ích mỗi đêm." },
          { domain: "Không gian nuôi hành vi", text: "Thiết kế phòng để hành vi mong muốn thành mặc định: góc đọc sách có ánh sáng tốt, nhạc cụ ngoài bao, bàn làm việc nhìn ra cây xanh, điện thoại có 'nhà' ngoài phòng ngủ." },
          { domain: "Cái đẹp hằng ngày", text: "Đưa vào tầm mắt vài thứ có ý nghĩa/đẹp với bạn (cây, tranh, ảnh, đồ thủ công) — cảm xúc thẩm mỹ liều nhỏ mỗi ngày." },
        ],
      },
    ],
  }
);

/* --- Trụ 02 Tinh thần: xấu hổ, đau buồn, tĩnh lặng, bất định --- */
PILLARS[1].groups.push({
  label: "Xấu hổ, mất mát & sự tĩnh lặng",
  sections: [
    {
      heading: "Xấu hổ vs tội lỗi — phân biệt có sức chuyển hóa",
      evidence: "strong",
      mechanism: "Tội lỗi (guilt): 'TÔI ĐÃ LÀM một việc tệ' — hướng vào hành vi, thúc đẩy sửa chữa, xin lỗi, thay đổi. Xấu hổ (shame): 'TÔI LÀ người tệ' — hướng vào toàn bộ con người, thúc đẩy che giấu, phòng thủ, né tránh, và nghịch lý là tương quan với NHIỀU hành vi có hại hơn, không phải ít hơn.",
      expertNote: "Tangney: xấu hổ tương quan với trầm cảm, lo âu, hung hăng, và tái phạm cao hơn; tội lỗi thích ứng tương quan với hành vi sửa chữa và ít tái phạm (lưu ý: phần lớn là dữ liệu TƯƠNG QUAN, chiều nhân quả không chắc chắn tuyệt đối). Đây vẫn là một trong các phân biệt có ứng dụng mạnh nhất trong tâm lý học: phần lớn 'tự phê phán để thúc đẩy bản thân' mang màu xấu hổ và có xu hướng phản tác dụng. Self-compassion (Neff) không phải nuông chiều — bằng chứng (cỡ vừa) gợi ý nó hỗ trợ nhìn thẳng lỗi mà không sụp đổ bản sắc, nuôi trách nhiệm hơn là né tránh. Ba thành phần: tử tế với bản thân, nhân tính chung, chánh niệm. Brené Brown (định tính): xấu hổ sống nhờ bí mật/im lặng; nói ra với người an toàn làm nó teo lại.",
      theory: "Tangney & Dearing (shame vs guilt); Neff (self-compassion); Brown (shame resilience).",
      controversy: "Tự phê phán được văn hóa (kể cả văn hóa Á Đông và văn hóa hiệu suất cao) tôn vinh như 'kỷ luật' — nhưng bằng chứng đi ngược. Self-compassion đôi khi bị hiểu nhầm là buông thả.",
      application: [
        { domain: "Dịch xấu hổ sang tội lỗi", text: "Khi mắc lỗi, chủ động chuyển câu tự nói: từ 'mình tệ thật' (xấu hổ, tê liệt) sang 'mình đã làm sai việc X, mình sẽ sửa bằng Y' (tội lỗi thích ứng, dẫn tới hành động)." },
        { domain: "Hiệu suất cao", text: "Nếu bạn dùng tự phê phán làm động lực (rất phổ biến ở người giỏi), thử self-compassion trong một tháng và so sánh — bằng chứng nói nó thúc đẩy TỐT HƠN, không phải kém hơn." },
        { domain: "Nói ra", text: "Xấu hổ mạnh lên trong im lặng; kể với một người an toàn (không phải mọi người) làm giảm sức mạnh của nó." },
        { domain: "Nuôi dạy/lãnh đạo", text: "Phê bình hành vi cụ thể ('báo cáo thiếu X') chứ không con người ('bạn cẩu thả') — cùng nguyên lý, áp cho người khác." },
      ],
    },
    {
      heading: "Đau buồn & mất mát — mô hình kép, không phải 'năm giai đoạn'",
      evidence: "moderate",
      mechanism: "Đau buồn không đi theo trình tự tuyến tính. Mô hình 'quá trình kép' (Stroebe & Schut): người đau buồn dao động giữa định hướng MẤT MÁT (đối diện nỗi đau, nhớ, khóc) và định hướng PHỤC HỒI (thích nghi đời sống mới, vai trò mới) — dao động qua lại là lành mạnh, không phải né tránh.",
      expertNote: "'Năm giai đoạn đau buồn' (Kübler-Ross) — phủ nhận, giận, mặc cả, trầm cảm, chấp nhận — cực kỳ phổ biến trong văn hóa nhưng KHÔNG được nghiên cứu ủng hộ như một trình tự bắt buộc; nó vốn mô tả người ĐANG CHẾT, không phải người ở lại, và Kübler-Ross sau này cũng nói nó không phải giai đoạn tuyến tính. Áp nó lên người đau buồn gây hại (khiến họ nghĩ mình 'đau buồn sai cách'). Bằng chứng thực tế: đa số người có khả năng phục hồi tự nhiên (resilience là mẫu hình PHỔ BIẾN NHẤT — Bonanno), không phải suy sụp kéo dài. Một thiểu số phát triển 'prolonged grief disorder' (nay có trong ICD-11/DSM) cần can thiệp. 'Continuing bonds' — duy trì mối liên hệ tinh thần với người đã mất — hiện được xem là lành mạnh, ngược với quan niệm cũ phải 'buông bỏ để bước tiếp'.",
      theory: "Stroebe & Schut (dual process model); Bonanno (resilience trajectories); continuing bonds; phê phán mô hình 5 giai đoạn.",
      controversy: "Mô hình 5 giai đoạn vẫn thống trị văn hóa dù thiếu ủng hộ thực nghiệm. Không có 'cách đau buồn đúng'; áp lịch trình lên nỗi đau là có hại.",
      application: [
        { domain: "Cho chính mình", text: "Cho phép dao động: có ngày đối diện nỗi đau, có ngày tập trung vào đời sống — cả hai đều là một phần của phục hồi, không phải né tránh." },
        { domain: "Bỏ 'lịch trình'", text: "Không tự đánh giá mình 'đau buồn sai/quá lâu/quá nhanh' theo mô hình 5 giai đoạn — nó không có cơ sở; phục hồi tự nhiên là mẫu hình phổ biến nhất." },
        { domain: "Continuing bonds", text: "Giữ mối liên hệ tinh thần với người đã mất (kỷ vật, nghi thức, kể chuyện) là lành mạnh — không cần 'buông bỏ' để bước tiếp." },
        { domain: "Với người đang đau buồn", text: "Hiện diện và lắng nghe, đừng nói 'mọi thứ có lý do' hay 'phải mạnh mẽ lên'; đề nghị giúp cụ thể thay vì 'cần gì cứ nói'." },
        { domain: "Khi nào cần giúp đỡ", text: "Nếu nỗi đau dữ dội, không giảm và làm tê liệt chức năng sống sau nhiều tháng, đó là điều đáng tìm chuyên gia — không phải yếu đuối." },
      ],
    },
    {
      heading: "Solitude — cô độc chủ động khác cô đơn",
      evidence: "moderate",
      mechanism: "Solitude (ở một mình có chủ đích) và loneliness (cô đơn — đau khổ vì thiếu kết nối mong muốn) là hai trạng thái khác nhau. Solitude tự nguyện liên hệ với phục hồi, tự phản tư, sáng tạo và điều hòa cảm xúc; cô đơn thì gây hại.",
      expertNote: "Yếu tố quyết định là TỰ NGUYỆN và ý nghĩa gán cho nó: cùng một buổi tối ở một mình có thể là phục hồi hoặc đau khổ tùy nó được chọn hay bị áp. Nghiên cứu: người có khả năng tận hưởng solitude cũng có xu hướng quan hệ xã hội tốt hơn (không phải đánh đổi). Một hiện tượng expert đáng chú ý: nhiều người thà chịu sốc điện nhẹ còn hơn ngồi một mình với suy nghĩ 6–15 phút (Wilson 2014) — cho thấy năng lực ở một mình không suy nghĩ gì là kỹ năng đã teo đi ở thời đại kích thích liên tục. Solitude khác 'ở một mình nhưng lướt điện thoại' — cái sau là kích thích, không phải tĩnh lặng. Ý tưởng cốt lõi: cần solitude ĐỦ để nghe được tiếng nói bên trong, và kết nối ĐỦ để không cô đơn — hai nhu cầu khác nhau, không thay thế nhau.",
      theory: "Nghiên cứu solitude vs loneliness; Wilson (2014, 'just think' experiments); Storr (Solitude).",
      controversy: "Ranh giới mờ: rút lui xã hội do trầm cảm/né tránh có thể ngụy trang thành 'thích ở một mình' — cần trung thực về động cơ.",
      application: [
        { domain: "Solitude có chủ đích", text: "Lên lịch thời gian một mình KHÔNG kích thích (không podcast/điện thoại): đi bộ, ngồi với cà phê, viết — nơi tiếng nói nội tâm nghe được." },
        { domain: "Phân biệt", text: "Tự hỏi: mình đang CHỌN ở một mình (solitude, phục hồi) hay đang tránh né/thiếu kết nối (cô đơn)? — hai thứ cần đáp ứng khác nhau." },
        { domain: "Với người bận", text: "Solitude không cần dài: 10 phút không kích thích còn hơn 2 giờ 'ở một mình với điện thoại' — chất lượng tĩnh lặng hơn thời lượng." },
        { domain: "Nuôi sáng tạo", text: "Nhiều insight đến trong tĩnh lặng (default mode network) — bảo vệ khoảng trống không kích thích như một phần của công việc trí óc, không phải lãng phí." },
      ],
    },
    {
      heading: "Bất định, lo âu hiện sinh & khả năng chịu đựng cái không biết",
      evidence: "moderate",
      mechanism: "'Intolerance of uncertainty' (không chịu nổi sự bất định) là yếu tố duy trì xuyên chẩn đoán cho lo âu và lo lắng mạn tính. Lo lắng thường là nỗ lực (thất bại) để đạt sự chắc chắn về một tương lai vốn không thể biết chắc.",
      expertNote: "Điểm expert: mục tiêu điều trị không phải LÀM GIẢM bất định (bất khả) mà TĂNG KHẢ NĂNG CHỊU ĐỰNG nó — chuyển từ 'tôi cần biết chắc' sang 'tôi có thể hành động dù không biết chắc'. Đây chính là cầu nối giữa tư duy xác suất (trụ 03) và bình an tâm lý: người tư duy xác suất tốt vẫn có thể khổ nếu không chấp nhận được rằng xác suất ≠ chắc chắn. Lo âu hiện sinh (Yalom, bốn mối quan tâm tối hậu: cái chết, tự do/trách nhiệm, cô lập hiện sinh, vô nghĩa) không phải bệnh lý — là phản ứng bình thường của một sinh vật ý thức về thân phận mình; né tránh nó tốn năng lượng hơn đối diện. ACT: chấp nhận (không phải cam chịu) + hành động theo giá trị dù còn bất định.",
      theory: "Dugas (intolerance of uncertainty); Yalom (existential psychotherapy); Hayes (ACT — acceptance).",
      controversy: "Ranh giới giữa lo âu hiện sinh bình thường và rối loạn lo âu cần điều trị; 'chấp nhận' dễ bị hiểu nhầm thành thụ động/cam chịu.",
      application: [
        { domain: "Đổi mục tiêu", text: "Thay vì cố đạt chắc chắn trước khi hành động (bất khả, nuôi lo lắng), luyện 'hành động tốt nhất với thông tin hiện có' — quyết định tốt ≠ kết quả chắc chắn." },
        { domain: "Pivot nghề", text: "Chấp nhận rằng không có cách nào biết chắc pivot sẽ ổn — giảm rủi ro bằng prototype rẻ (trụ 08) rồi hành động, thay vì chờ sự chắc chắn không bao giờ tới." },
        { domain: "Lo âu hiện sinh", text: "Coi các câu hỏi lớn (cái chết, tự do, ý nghĩa) là phần của thân phận người đáng đối diện, không phải triệu chứng cần dập — đối diện có chủ đích tốn ít năng lượng hơn né tránh." },
        { domain: "Chấp nhận ≠ cam chịu", text: "Chấp nhận là thôi vật lộn với thực tại không đổi được, ĐỂ dồn năng lượng vào hành động theo giá trị ở nơi đổi được." },
      ],
    },
  ],
});

/* --- Trụ 05 Gia đình: tình yêu, tình dục, tha thứ, làm cha mẹ --- */
REMAINING_PILLARS[1].groups.push({
  label: "Tình yêu, tha thứ & lựa chọn đời",
  sections: [
    {
      heading: "Tình yêu lãng mạn: đam mê, gắn bó & sự mới mẻ",
      evidence: "moderate",
      mechanism: "Tình yêu có ít nhất hai hệ thống: passionate love (say đắm — kích thích cao, ám ảnh, mạch dopamine/phần thưởng, thường phai theo tháng-năm) và companionate love (gắn bó ấm áp, tin cậy, thân mật — liên hệ oxytocin/vasopressin, có thể tăng theo thời gian).",
      expertNote: "Sai lầm văn hóa lớn: coi sự phai của passionate love là dấu hiệu 'hết yêu' và là lý do rời bỏ. Thực tế đó là quy luật thần kinh bình thường (hedonic adaptation áp lên cả tình yêu). NHƯNG passionate love KHÔNG nhất thiết phải chết: nghiên cứu fMRI trên các cặp yêu nhau lâu năm cho thấy một số vẫn kích hoạt mạch phần thưởng như giai đoạn đầu — và điểm chung của họ là tiếp tục làm điều MỚI MẺ và thử thách CÙNG NHAU. Aron: 'self-expansion' — tình yêu phát triển khi mỗi người mở rộng bản thân qua người kia; các cặp làm hoạt động mới lạ/kích thích cùng nhau báo cáo hài lòng cao hơn (hiệu ứng misattribution of arousal cũng góp phần). Kết hợp với Gottman (số dư cảm xúc, bids) ta có công thức thực dụng: nền tảng an toàn + mới mẻ có chủ đích. Sự đơn điệu, không phải xung đột, thường là kẻ giết quan hệ thầm lặng.",
      theory: "Hatfield & Berscheid (passionate vs companionate); Aron (self-expansion model); nghiên cứu fMRI long-term intense love (Acevedo).",
      controversy: "Nhiều nghiên cứu là tương quan/tự báo cáo. Chuẩn mực về tình yêu khác nhau theo văn hóa; mô hình phương Tây không phổ quát.",
      application: [
        { domain: "Chống đơn điệu", text: "Chủ động làm điều MỚI và hơi thử thách cùng nhau (học kỹ năng mới, du lịch lạ, hoạt động kích thích) — self-expansion nuôi cả đam mê lẫn gắn bó; 'date night lặp lại y hệt' ít tác dụng hơn." },
        { domain: "Kỳ vọng thực tế", text: "Hiểu passion phai là quy luật thần kinh, không phải bằng chứng chọn sai người — nhưng cũng đừng chấp nhận đơn điệu như định mệnh." },
        { domain: "Hai hệ thống", text: "Nuôi cả hai: an toàn/tin cậy (bids, repair — trụ 05) VÀ mới mẻ/kích thích (self-expansion) — thiếu cái đầu thì bất an, thiếu cái sau thì buồn tẻ." },
      ],
    },
    {
      heading: "Thân mật & sức khỏe tình dục",
      evidence: "moderate",
      mechanism: "Sức khỏe tình dục là một phần của sức khỏe tổng thể (định nghĩa WHO), liên hệ với chất lượng quan hệ và wellbeing. Mô hình ham muốn tuyến tính cổ điển (ham muốn → kích thích → cực khoái) mô tả kém trải nghiệm của nhiều phụ nữ.",
      expertNote: "Basson: nhiều phụ nữ trải nghiệm ham muốn ĐÁP ỨNG (responsive desire) — ham muốn xuất hiện SAU khi kích thích/thân mật bắt đầu, chứ không phải tự phát trước đó. Hiểu sai điều này khiến nhiều người kết luận nhầm rằng 'mình có vấn đề' hoặc 'hết yêu'. Nagoski: mô hình 'kép' — hệ thống kích thích (ga) và hệ thống ức chế (phanh); với nhiều người, vấn đề không phải thiếu ga mà là quá nhiều phanh (stress, mệt, lo hình thể, xung đột chưa giải quyết, thiếu an toàn). Hệ quả thực dụng: giảm phanh (stress, quá tải, oán giận tồn đọng) thường hiệu quả hơn cố tăng ga. Thân mật rộng hơn tình dục (đụng chạm không tình dục, sự dễ tổn thương, được biết đến) và là nền của nó. Đây là vùng mà xấu hổ và im lặng gây hại nhiều — giao tiếp cởi mở là can thiệp mạnh nhất.",
      theory: "Basson (responsive desire); Nagoski (dual control model); WHO (định nghĩa sức khỏe tình dục).",
      controversy: "Vùng chịu ảnh hưởng nặng của chuẩn mực văn hóa và im lặng; nghiên cứu về ham muốn nữ giới còn thiếu so với nam. Bất kỳ vấn đề dai dẳng nào cũng nên thảo luận với chuyên gia y tế thay vì tự chẩn.",
      application: [
        { domain: "Hiểu ham muốn đáp ứng", text: "Nếu ham muốn không tự phát nhưng xuất hiện khi đã bắt đầu thân mật, đó là mẫu hình bình thường (responsive desire), không phải 'trục trặc'." },
        { domain: "Giảm 'phanh' trước", text: "Với người bận/căng thẳng: stress, kiệt sức, oán giận tồn đọng và thiếu ngủ là các 'phanh' lớn — xử lý chúng thường hiệu quả hơn cố 'tăng ham muốn'." },
        { domain: "Giao tiếp", text: "Nói thẳng và tử tế về mong muốn/ranh giới; im lặng và xấu hổ là nguyên nhân phổ biến hơn nhiều so với 'không hợp'." },
        { domain: "Thân mật rộng", text: "Đầu tư vào đụng chạm không tình dục, sự hiện diện, dễ tổn thương — nền tảng của thân mật tình dục, đặc biệt trong quan hệ dài hạn." },
        { domain: "Khi nào tìm chuyên gia", text: "Đau, thay đổi đột ngột, hoặc khó khăn dai dẳng gây khổ sở là lý do chính đáng để gặp bác sĩ/chuyên gia trị liệu tình dục — không phải điều phải chịu đựng trong im lặng." },
      ],
    },
    {
      heading: "Tha thứ, oán giận & hòa giải",
      evidence: "moderate",
      mechanism: "Tha thứ là quá trình giảm động cơ trả đũa/né tránh và (đôi khi) tăng thiện chí với người gây tổn thương. Oán giận mạn tính liên hệ với kích thích sinh lý kéo dài, trầm cảm, và chất lượng quan hệ kém.",
      expertNote: "Phân biệt then chốt: THA THỨ ≠ HÒA GIẢI ≠ BAO BIỆN. Tha thứ là quá trình NỘI TÂM, có thể xảy ra mà không cần gặp lại hay tin tưởng lại người kia; hòa giải là khôi phục quan hệ, đòi hỏi sự thay đổi và an toàn; bao biện là phủ nhận sai trái. Bạn có thể tha thứ và vẫn giữ ranh giới hoặc rời đi. Ngược lại, 'tha thứ vội' (ép mình tha thứ để tránh cảm xúc khó, hoặc do áp lực) không mang lại lợi ích và có thể duy trì tổn hại — đặc biệt nguy hiểm trong quan hệ lạm dụng, nơi 'tha thứ' bị dùng làm công cụ áp lực. Worthington (REACH): Recall (nhớ lại tổn thương một cách bình tĩnh), Empathize (thử hiểu góc nhìn kia), Altruistic gift (xem tha thứ như món quà), Commit, Hold. Tự tha thứ (self-forgiveness) là mảng riêng, cần kèm trách nhiệm và sửa chữa, nếu không sẽ thành bao biện.",
      theory: "Enright (process model); Worthington (REACH); nghiên cứu oán giận & sức khỏe.",
      controversy: "Áp lực tha thứ (từ gia đình, tôn giáo, văn hóa) có thể gây hại, nhất là với nạn nhân lạm dụng. Tha thứ nên là lựa chọn tự do, không nghĩa vụ. Lợi ích sức khỏe chủ yếu từ dữ liệu tương quan.",
      application: [
        { domain: "Tách ba khái niệm", text: "Bạn có thể THA THỨ (giải phóng mình khỏi oán giận) mà KHÔNG hòa giải (khôi phục quan hệ) và không bao biện (phủ nhận sai trái) — ba việc khác nhau." },
        { domain: "Không ép, không vội", text: "Tha thứ ép buộc/quá sớm không hiệu quả; nó là quá trình có nhịp riêng, và là lựa chọn của bạn, không phải nghĩa vụ với ai." },
        { domain: "Vì mình trước", text: "Khung lại tha thứ như giải phóng bản thân khỏi gánh nặng oán giận, không phải món quà cho người gây tổn thương — động cơ này bền hơn." },
        { domain: "Trong gia đình (bối cảnh VN)", text: "Với xung đột gia đình lâu năm, tha thứ nội tâm + ranh giới rõ ràng thường khả thi và lành mạnh hơn hòa giải gượng ép vì áp lực họ hàng." },
        { domain: "Tự tha thứ", text: "Tự tha thứ phải kèm nhận trách nhiệm và sửa chữa (nếu được) — nếu không, nó trượt thành bao biện; kết hợp với self-compassion (trụ 02)." },
      ],
    },
    {
      heading: "Quyết định làm cha mẹ (hoặc không)",
      evidence: "contested",
      mechanism: "Một trong các quyết định đời không thể đảo ngược và biến đổi bản sắc sâu nhất. Nghiên cứu wellbeing cho kết quả phức tạp: cha mẹ báo cáo NHIỀU Ý NGHĨA hơn nhưng thường KHÔNG nhiều hạnh phúc khoảnh khắc hơn (và trong nhiều nghiên cứu là ít hơn trong giai đoạn con nhỏ).",
      expertNote: "Đây là ví dụ sống động của phân tách meaning vs happiness (trụ 04). 'Parenthood happiness gap' phụ thuộc mạnh vào BỐI CẢNH: ở nơi có hỗ trợ (nghỉ thai sản, chăm sóc trẻ, chia sẻ việc nhà bình đẳng) khoảng cách nhỏ hoặc đảo chiều; nơi thiếu hỗ trợ, khoảng cách lớn — và gánh nặng rơi không cân xứng lên phụ nữ. Vấn đề triết học của Paul: đây là 'trải nghiệm biến đổi' (transformative experience) — bạn không thể biết trước cảm giác làm cha mẹ, và bản thân việc đó thay đổi chính CÁC GIÁ TRỊ dùng để quyết định. Nên phân tích chi phí-lợi ích thuần túy không giải quyết được; quyết định này là chọn TRỞ THÀNH AI, không chỉ chọn có gì. Người không có con (dù tự nguyện hay không) không hề thiếu ý nghĩa — generativity (trụ 06/08) có nhiều đường: mentoring, sáng tạo, đóng góp. Áp lực xã hội/gia đình (mạnh ở VN) là biến số cần tách ra khỏi mong muốn thật của chính mình (differentiation — trụ 05).",
      theory: "Nghiên cứu parenthood & wellbeing (Glass, Nelson); L.A. Paul (transformative experience); Erikson (generativity đa đường).",
      controversy: "Dữ liệu wellbeing về làm cha mẹ mâu thuẫn và phụ thuộc nặng vào chính sách/bối cảnh văn hóa. Không có câu trả lời đúng phổ quát; đây là quyết định giá trị cá nhân sâu sắc.",
      application: [
        { domain: "Tách áp lực khỏi mong muốn", text: "Phân biệt điều BẠN muốn với kỳ vọng gia đình/xã hội (differentiation) — quyết định này quá lớn để sống theo kịch bản của người khác." },
        { domain: "Hiểu bản chất quyết định", text: "Đây là 'trải nghiệm biến đổi': không thể biết trước, và nó thay đổi chính giá trị của bạn — nên phân tích lợi-hại thuần không đủ; hỏi 'mình muốn trở thành ai'." },
        { domain: "Nhìn thẳng bối cảnh", text: "Nếu chọn có con, khoảng cách hạnh phúc phụ thuộc mạnh vào hỗ trợ thực tế (chia sẻ việc nhà, chăm sóc trẻ, sự nghiệp) — đàm phán những điều này TRƯỚC, không sau." },
        { domain: "Ý nghĩa đa đường", text: "Nếu chọn không có con (hoặc không thể), generativity có nhiều con đường (mentoring, sáng tạo, đóng góp cộng đồng) — không có con không đồng nghĩa thiếu ý nghĩa." },
        { domain: "Yếu tố thời gian sinh học", text: "Với phụ nữ, khả năng sinh sản có yếu tố thời gian thật — biết thông tin y khoa (kể cả các lựa chọn như đông lạnh trứng) để quyết định bằng dữ liệu, không bằng hoảng loạn hay né tránh." },
      ],
    },
  ],
});

/* --- Trụ 07 Tận hưởng: hài hước --- */
ENJOYMENT_PILLAR.groups[0].sections.push({
  heading: "Hài hước, tiếng cười & sự nhẹ nhõm",
  evidence: "moderate",
  mechanism: "Hài hước là một chiến lược điều hòa cảm xúc và một chất bôi trơn xã hội. Tiếng cười chung tăng gắn kết (liên hệ endorphin). Hài hước như một 'điểm mạnh nhân cách' (VIA) tương quan với wellbeing và khả năng phục hồi.",
  expertNote: "Không phải mọi hài hước như nhau: nghiên cứu phân biệt bốn kiểu — affiliative (gắn kết, làm người khác thoải mái) và self-enhancing (giữ góc nhìn hài hước với nghịch cảnh) tương quan wellbeing tốt; aggressive (chế giễu người khác) và self-defeating (hạ thấp bản thân để mua vui) tương quan wellbeing kém. Vậy nên 'tự trào' không tự động lành mạnh — tùy nó là nhẹ nhõm hay là tự hạ thấp. Hài hước tự-nâng (self-enhancing) là dạng cognitive reappraisal (trụ 02): tìm được góc nhìn hài hước trong khó khăn là một kỹ năng điều hòa cảm xúc mạnh. Tiếng cười chung (không phải cười một mình) mới là thứ xây quan hệ — Gottman ghi nhận hài hước là một 'repair attempt' hiệu quả trong xung đột.",
  theory: "Martin (bốn kiểu hài hước); Dunbar (laughter & endorphin/bonding); VIA (humor as strength).",
  controversy: "Hài hước tự-hạ-thấp bị nhầm là khiêm tốn lành mạnh; hài hước công kích bị bào chữa là 'chỉ đùa'.",
  application: [
    { domain: "Chọn kiểu hài hước", text: "Nuôi hài hước gắn kết và tự-nâng; để ý và giảm hài hước công kích (chế giễu) và tự-hạ-thấp (mua vui bằng cách hạ mình)." },
    { domain: "Trong xung đột", text: "Hài hước nhẹ nhàng (không mỉa mai) là một 'repair attempt' hiệu quả để hạ nhiệt — nhưng chỉ khi đối phương cảm thấy được tôn trọng, không bị cười nhạo." },
    { domain: "Đối diện nghịch cảnh", text: "Tìm góc nhìn hài hước trong khó khăn là một dạng reappraisal — không phải phủ nhận nỗi đau mà là giữ khoảng cách tâm lý với nó." },
    { domain: "Cho lịch bận", text: "Tiếng cười CHUNG mới xây quan hệ — ưu tiên cười cùng người thật hơn xem hài một mình." },
  ],
});

/* --- Trụ 08 Ý nghĩa: di sản, lòng tốt --- */
MEANING_PILLAR.groups[3].sections.push(
  {
    heading: "Lòng tốt, hào phóng & prosocial",
    evidence: "moderate",
    mechanism: "Hành vi vì người khác (giúp đỡ, cho đi, tử tế) tương quan với wellbeing của chính người cho — 'prosocial spending' và hành động tử tế có hiệu ứng dương nhỏ nhưng khá nhất quán liên văn hóa.",
    expertNote: "Sắc thái expert: hiệu ứng mạnh hơn khi (1) TỰ NGUYỆN (không bị ép/nghĩa vụ), (2) thấy được TÁC ĐỘNG cụ thể lên người nhận, (3) có KẾT NỐI với người nhận. Cho tiền vô danh cho một tổ chức xa xôi cho ít lợi ích cảm xúc hơn giúp một người bạn thấy được — dù về mặt vị tha hiệu quả (effective altruism) khoản kia có thể tạo tác động lớn hơn. Đây là căng thẳng thật giữa 'lòng tốt cho wellbeing của mình' và 'lòng tốt tối đa hóa tác động' — cả hai đều chính đáng, phục vụ mục đích khác nhau. Cảnh báo: 'compassion fatigue'/over-giving có thật; lòng tốt bền vững cần ranh giới. Và lòng tốt với BẢN THÂN (self-compassion) tương quan với lòng tốt với người khác — không phải đánh đổi.",
    theory: "Dunn (prosocial spending); Aknin (liên văn hóa); effective altruism (Singer/MacAskill); compassion fatigue.",
    controversy: "Effect size khiêm tốn; selection effect trong dữ liệu quan sát. Căng thẳng giữa lòng tốt 'cảm thấy tốt' và lòng tốt 'tác động lớn' chưa có giải pháp hoàn hảo.",
    application: [
      { domain: "Lòng tốt gần", text: "Hành động tử tế cụ thể, thấy được tác động, với người bạn có kết nối — cho lợi ích wellbeing lớn nhất cho chính bạn." },
      { domain: "Lòng tốt hiệu quả", text: "Song song, một phần cho đi có thể hướng theo tác động (tổ chức hiệu quả) dù ít 'cảm giác' hơn — hai mục đích khác nhau, đừng gộp." },
      { domain: "Ranh giới", text: "Lòng tốt bền vững cần giới hạn; over-giving dẫn tới kiệt sức và oán giận ngầm — nói không là điều kiện của nói có thật lòng." },
      { domain: "Bắt đầu từ mình", text: "Self-compassion và lòng tốt với người khác đi cùng nhau, không đánh đổi — người tự hành hạ mình hiếm khi tử tế bền với người khác." },
    ],
  },
  {
    heading: "Di sản, generativity & điều còn lại sau mình",
    evidence: "moderate",
    mechanism: "Generativity — quan tâm tới việc nuôi dưỡng, hướng dẫn và đóng góp cho các thế hệ sau — là nhiệm vụ phát triển trung niên (Erikson), đối lập với 'stagnation'. Nó dự báo wellbeing, ý nghĩa và sự hài lòng khi nhìn lại đời.",
    expertNote: "Di sản không đòi hỏi danh tiếng hay quy mô. McAdams: người có generativity cao thường có 'commitment story' — câu chuyện đời trong đó họ được ban cho điều gì đó sớm, nhận ra nỗi đau của người khác, và cam kết đóng góp. Các dạng di sản: sinh học (con cái), sáng tạo (tác phẩm, ý tưởng, công cụ), văn hóa (truyền lại giá trị, mentoring), và di sản quan hệ (cách bạn khiến người khác cảm thấy — thứ được nhớ lâu nhất). Nghiên cứu 'end-of-life regrets' (Bronnie Ware và các nghiên cứu tương tự — mang tính giai thoại hơn thực nghiệm chặt, nhưng nhất quán đến mức đáng chú ý): tiếc nuối phổ biến nhất là đã sống theo kỳ vọng người khác, làm việc quá nhiều, không dám bày tỏ cảm xúc, không giữ liên lạc với bạn bè, và không cho phép mình hạnh phúc. Đáng chú ý: KHÔNG ai tiếc vì không tối ưu hóa đủ. Di sản là câu hỏi ngược soi sáng hiện tại: sống thế nào hôm nay để điều đó thành sự thật?",
    theory: "Erikson (generativity vs stagnation); McAdams (commitment story, redemptive self); văn liệu về end-of-life regrets (chủ yếu giai thoại/định tính).",
    controversy: "Nghiên cứu 'tiếc nuối cuối đời' chủ yếu định tính/giai thoại, không phải thực nghiệm chặt — dùng như gợi mở chiêm nghiệm, không phải dữ liệu cứng.",
    application: [
      { domain: "Di sản đa đường", text: "Di sản không cần con cái hay danh tiếng: tác phẩm/công cụ bạn tạo, người bạn mentoring, giá trị bạn truyền, và cách bạn khiến người khác cảm thấy." },
      { domain: "Câu hỏi ngược", text: "Thỉnh thoảng hỏi: 'điều gì mình muốn còn lại sau mình?' rồi hỏi tiếp 'hôm nay mình sống có nhất quán với điều đó không?' — di sản soi sáng hiện tại." },
      { domain: "Học từ tiếc nuối phổ biến", text: "Các tiếc nuối cuối đời nhất quán: sống theo kỳ vọng người khác, làm việc quá nhiều, không bày tỏ cảm xúc, mất liên lạc với bạn bè, không cho phép mình hạnh phúc — không ai tiếc vì tối ưu chưa đủ." },
      { domain: "Bắt đầu sớm", text: "Generativity không phải việc của tuổi 50 — mentoring, chia sẻ kiến thức, đóng góp cộng đồng có thể bắt đầu ngay bây giờ và nuôi ý nghĩa suốt đời." },
    ],
  }
);
/* ---------------------------------------------------------------
   MỞ RỘNG ĐỢT 3 — TÂM THÁI SỐNG
   Append vào trụ 03 (Bản sắc cá nhân) và trụ 07 (Tận hưởng).
--------------------------------------------------------------- */

IDENTITY_PILLAR.groups.push({
  label: "Tâm thái sống",
  note: "Các mục trước nói về KỸ NĂNG (nghĩ tốt hơn, điều hòa tốt hơn). Nhóm này về TÂM THÁI — thái độ nền tảng với cuộc đời: dám dấn thân, cởi mở khám phá, theo đuổi chiều sâu, và yêu đời cả trong phần khó. Tâm thái định hình việc kỹ năng được dùng để làm gì.",
  sections: [
    {
      heading: "Dấn thân, chấp nhận rủi ro & học từ thất bại",
      evidence: "moderate",
      mechanism: "Né tránh rủi ro/thất bại có vẻ an toàn nhưng tạo chi phí ẩn: cơ hội không nắm, năng lực không xây, và vòng lặp lo âu được củng cố (né tránh làm giảm lo âu ngắn hạn → củng cố né tránh → thu hẹp đời sống). Trong môi trường bất định, hành động có kiểm soát rủi ro tạo thông tin mà phân tích thuần không tạo được.",
      expertNote: "Ba khung bổ trợ nhau: (1) 'Antifragile' (Taleb) — phân biệt thứ bị hại bởi biến động (fragile), thứ chịu được (robust), và thứ HƯỞNG LỢI từ biến động (antifragile). Chiến lược antifragile là 'barbell': phần lớn nguồn lực rất an toàn + một phần nhỏ phơi nhiễm rủi ro có lợi thế bất đối xứng (mất ít, được nhiều). Áp cho nghề nghiệp: giữ nền ổn định (vai trò BA) đồng thời đặt nhiều 'cược nhỏ' vào hướng mới (dự án fintech, viết, đầu tư, học). (2) 'Little bets' (Sims): thử nghiệm nhiều, rẻ, nhanh thay vì một cược lớn — mỗi thất bại nhỏ là thông tin, không phải thảm họa. (3) Phân biệt thất bại THÔNG MINH với thất bại cẩu thả (Edmondson): thất bại thông minh xảy ra ở biên giới tri thức, có giả thuyết rõ, quy mô nhỏ nhất có thể, và được rút bài học — chỉ loại này đáng ăn mừng. Ràng buộc tuyệt đối: không bao giờ đặt cược tới mức phá sản (ergodicity, trụ 04). 'Không sợ thất bại' đúng nghĩa KHÔNG phải liều lĩnh; nó là cấu trúc rủi ro sao cho thất bại rẻ và bài học đắt.",
      theory: "Taleb (antifragility, barbell); Sims (little bets); Edmondson (intelligent failure); nghiên cứu avoidance & lo âu.",
      controversy: "Văn hóa 'tôn vinh thất bại' của giới khởi nghiệp dễ trượt thành lãng mạn hóa sự cẩu thả và bỏ qua survivorship bias (ta chỉ nghe chuyện người thất bại rồi thành công). Thất bại chỉ có giá trị nếu sống sót và rút được bài học.",
      application: [
        { domain: "Chiến lược barbell", text: "Giữ nền an toàn (thu nhập, sức khỏe, quan hệ) VÀ đồng thời đặt nhiều cược nhỏ vào bất định có lợi thế bất đối xứng — pivot, dự án, đầu tư, viết lách." },
        { domain: "Little bets cho pivot", text: "Thay một quyết định lớn 'nghỉ việc chuyển ngành', chạy nhiều thử nghiệm rẻ: một dự án nhỏ, một khóa học, một bài viết, một cuộc phỏng vấn thông tin — mỗi cái tạo thông tin thật." },
        { domain: "Thiết kế thất bại rẻ", text: "Trước khi thử điều gì, hỏi: 'nếu hỏng, mình mất gì?' — nếu mất mát chấp nhận được và bài học lớn, hãy làm; nếu có nhánh 'game over', đừng." },
        { domain: "Thất bại thông minh", text: "Chỉ ăn mừng thất bại có giả thuyết rõ, quy mô nhỏ, và bài học được rút — không lãng mạn hóa sự cẩu thả." },
        { domain: "Đầu tư/kinh doanh", text: "Áp cùng logic: kích thước vị thế sao cho một cú sai không xóa sạch; nhiều cược nhỏ bất đối xứng bền hơn một cược lớn 'chắc thắng'." },
        { domain: "Chống né tránh", text: "Nhận ra né tránh tạo nhẹ nhõm ngắn hạn nhưng thu hẹp đời sống dài hạn — hành động nhỏ theo hướng mình sợ (exposure) mở lại không gian sống." },
      ],
    },
    {
      heading: "Cởi mở trải nghiệm, khám phá & cân bằng explore–exploit",
      evidence: "strong",
      mechanism: "'Openness to experience' (một trong Big Five) — tò mò, ưa cái mới, nhạy cảm thẩm mỹ, giàu tưởng tượng — tương quan với sáng tạo, học tập suốt đời và trải nghiệm nội tâm phong phú. Mọi tác nhân sống trong đời phải giải bài toán explore–exploit: dành nguồn lực để KHÁM PHÁ cái mới (thông tin, có thể tốt hơn) hay KHAI THÁC cái đã biết là tốt (chắc chắn, hiệu quả).",
      expertNote: "Toán học của explore–exploit cho một hệ quả sâu về cuộc đời (Christian & Griffiths): tỷ lệ khám phá tối ưu phụ thuộc vào THỜI GIAN CÒN LẠI. Khi còn nhiều thời gian phía trước (tuổi trẻ, đầu một giai đoạn), khám phá có giá trị cao vì bạn còn nhiều lượt để khai thác điều tìm được. Khi thời gian ngắn lại, khai thác cái đã biết là tối ưu hợp lý — điều này giải thích vì sao người lớn tuổi thu hẹp mạng lưới xã hội về những người thân nhất (socioemotional selectivity theory, Carstensen) và đó là TỐI ƯU, không phải suy giảm. Hệ quả cho tuổi 30 giữa một pivot: bạn đang ở giai đoạn mà khám phá vẫn có giá trị kỳ vọng cao — chi phí thử là thấp so với lợi ích thông tin. Openness cũng là đặc điểm Big Five DỄ THAY ĐỔI nhất qua hành động có chủ đích (tiếp xúc cái mới có cấu trúc). Lưu ý sắc thái: openness cao không tự động tốt — cần kết hợp conscientiousness để biến khám phá thành thành quả, nếu không thành 'khám phá mãi không cam kết'.",
      theory: "Big Five (openness); Christian & Griffiths (explore/exploit và thời gian còn lại); Carstensen (socioemotional selectivity).",
      controversy: "Openness tương quan sáng tạo nhưng không đảm bảo sản phẩm; cần kỷ luật đi kèm. 'Luôn khám phá' có thể ngụy trang cho né tránh cam kết (foreclosure ngược).",
      application: [
        { domain: "Tuổi 30 = ưu tiên khám phá", text: "Với thời gian còn dài phía trước, chi phí thử nghiệm thấp so với giá trị thông tin — đây là giai đoạn hợp lý để khám phá nhiều (nghề, sở thích, nơi chốn, ý tưởng)." },
        { domain: "Khám phá có cấu trúc", text: "Đặt hạn ngạch khám phá (vd mỗi tháng một trải nghiệm/lĩnh vực/tác giả mới) — biến openness thành hành động, không chỉ thái độ." },
        { domain: "Đi sâu VÀ đi rộng", text: "Kết hợp T-shaped: đi rộng để tìm giao điểm hiếm, rồi đi sâu vào cái đáng đầu tư — khám phá không phải kẻ thù của chiều sâu, nó là cách tìm ra nên đào sâu ở đâu." },
        { domain: "Chống khám phá vô tận", text: "Đặt điểm chuyển: sau giai đoạn khám phá có thời hạn, chuyển sang khai thác/cam kết — nếu không, 'luôn mở' thành né tránh cam kết." },
        { domain: "Nuôi openness", text: "Openness tăng được qua tiếp xúc chủ đích: thể loại nghệ thuật mới, quan điểm đối lập, văn hóa khác, kỹ năng ngoài vùng chuyên môn." },
      ],
    },
    {
      heading: "Theo đuổi chiều sâu & tiêu chuẩn sống cao",
      evidence: "moderate",
      mechanism: "Trong môi trường thông tin dư thừa và giải trí tối ưu-hóa-sự-chú-ý, chiều sâu trở thành nguồn lực khan hiếm. 'Chiều sâu' ở đây là ba thứ riêng biệt: đọc/suy nghĩ sâu (đối lập tiêu thụ lướt), quan hệ sâu (đối lập kết nối rộng nông), và trải nghiệm sâu (chú ý trọn vẹn thay vì đa nhiệm).",
      expertNote: "Cơ chế thần kinh: đọc sâu và suy nghĩ liên tục xây các mạng liên kết dài; đọc lướt/quét liên tục củng cố mẫu hình chú ý phân mảnh (Maryanne Wolf gọi là nguy cơ mất 'deep reading circuit'). 'Tiêu chuẩn sống cao' theo nghĩa lành mạnh KHÔNG phải tiêu dùng đắt tiền mà là NÂNG CAO NGƯỠNG CHẤT LƯỢNG của những gì mình cho vào tâm trí và đời sống: sách thay vì lướt tin, một bản nhạc nghe trọn thay vì playlist nền, một bữa ăn có mặt trọn vẹn, một cuộc trò chuyện thật thay vì trao đổi thông tin. Hai cạm bẫy quan trọng: (1) chủ nghĩa hoàn hảo thẩm mỹ — biến 'sống đẹp' thành áp lực và phán xét, hủy chính sự nhẹ nhõm mình tìm; (2) 'chiều sâu' thành đấu trường địa vị (chê người khác nông cạn) — đó là snobbery, ngược với tinh thần sâu sắc thật, vốn khiêm nhường vì thấy được mình biết ít đến đâu. Chiều sâu thật thường đi kèm sự nhẹ nhàng, không nặng nề.",
      theory: "Maryanne Wolf (deep reading brain); Newport (digital minimalism, deep work); Schwartz (paradox of choice/satisficing vs maximizing).",
      controversy: "'Đời sống thanh cao' dễ trượt thành phán xét giai cấp/gu thẩm mỹ. Nghiên cứu về suy giảm khả năng đọc sâu do internet còn tranh luận về mức độ.",
      application: [
        { domain: "Nâng ngưỡng đầu vào", text: "Chọn kỹ thứ cho vào tâm trí: ít nguồn hơn nhưng chất lượng hơn (một cuốn sách sâu > mười bài lướt); chất lượng đầu vào định hình chất lượng tư duy." },
        { domain: "Đọc sâu có chủ đích", text: "Giữ một 'phiên đọc sâu' thường xuyên (giấy hoặc không thông báo), đọc liền mạch — bảo tồn mạch chú ý dài mà thói quen lướt bào mòn." },
        { domain: "Chiều sâu trong quan hệ", text: "Ưu tiên vài cuộc trò chuyện thật (dễ tổn thương, hỏi câu thật) hơn nhiều tương tác bề mặt — chiều sâu quan hệ dự báo sức khỏe (trụ 05)." },
        { domain: "Tiêu chuẩn ≠ đắt tiền", text: "Đời sống đẹp là chú ý và chọn lọc, không phải chi tiêu: một tách trà uống trọn vẹn, ánh sáng buổi sáng, bàn làm việc gọn — cái đẹp hằng ngày miễn phí." },
        { domain: "Tránh hai cạm bẫy", text: "Đừng biến 'sống sâu/đẹp' thành chủ nghĩa hoàn hảo tự phán xét, cũng đừng thành thái độ khinh thường người khác — chiều sâu thật đi cùng khiêm nhường và nhẹ nhõm." },
      ],
    },
    {
      heading: "Yêu đời sâu sắc: amor fati & ôm trọn mọi sắc màu",
      evidence: "contested",
      mechanism: "Thái độ nền tảng với cuộc đời — chấp nhận và thậm chí yêu cả phần khó của nó, thay vì chỉ mong phần dễ — tương quan với khả năng phục hồi và ý nghĩa. 'Chấp nhận nghịch lý': đón nhận cảm xúc khó thay vì né tránh có liên hệ với ít đau khổ hơn về lâu dài, trong khi theo đuổi hạnh phúc một cách gắng gượng lại nghịch lý làm giảm nó.",
      expertNote: "Ba nguồn hội tụ: (1) Stoic 'amor fati' (yêu số phận) và Nietzsche — không chỉ chịu đựng điều xảy ra mà khẳng định nó như một phần của đời mình; (2) Frankl (logotherapy): ngay cả trong đau khổ không tránh được vẫn còn tự do cuối cùng — chọn thái độ; ý nghĩa có thể tìm thấy qua sáng tạo, trải nghiệm, và thái độ trước khổ đau không thể tránh; (3) nghiên cứu tâm lý: 'experiential avoidance' (né tránh trải nghiệm nội tâm khó) là yếu tố duy trì xuyên chẩn đoán của nhiều rối loạn; ngược lại 'chấp nhận' (ACT) và 'emodiversity' (trải nghiệm phong phú NHIỀU loại cảm xúc — cả tích cực lẫn tiêu cực) tương quan với sức khỏe tốt hơn một đời sống cảm xúc đơn điệu, kể cả đơn điệu-tích-cực. CẢNH BÁO QUAN TRỌNG: 'amor fati' không được dùng để hợp lý hóa bất công, lạm dụng hay bệnh lý cần điều trị — chấp nhận thực tại không đổi được KHÁC với chấp nhận điều cần và có thể thay đổi. Ranh giới này là chỗ triết lý này hay bị lạm dụng.",
      theory: "Stoicism/Nietzsche (amor fati); Frankl (logotherapy, ý nghĩa qua khổ đau); Hayes (ACT, experiential avoidance); Quoidbach (emodiversity).",
      controversy: "Emodiversity là phát hiện tương quan, cần tái lập thêm. 'Yêu số phận' dễ bị lạm dụng thành cam chịu hoặc đổ lỗi nạn nhân — cần phân biệt rạch ròi điều đổi được và không đổi được.",
      application: [
        { domain: "Ôm trọn dải cảm xúc", text: "Đừng theo đuổi một đời chỉ toàn cảm xúc tích cực — buồn, tiếc, kinh ngạc, tiếc nuối đều là phần của đời sống phong phú; emodiversity liên hệ sức khỏe tốt hơn sự đơn điệu." },
        { domain: "Chấp nhận thay vì né", text: "Với cảm xúc khó, thực hành đón nhận (ACT) thay vì né tránh — né tránh trải nghiệm là yếu tố duy trì đau khổ mạnh nhất." },
        { domain: "Ranh giới đạo đức", text: "Amor fati áp cho điều KHÔNG đổi được (mất mát, quá khứ, hữu hạn). Với điều đổi được (bất công, quan hệ độc hại, bệnh cần chữa) — hành động, đừng 'yêu số phận'." },
        { domain: "Yêu đời qua giác quan", text: "Nuôi tình yêu đời sống bằng sự chú ý cụ thể: mùi cà phê, ánh sáng chiều, tiếng mưa — yêu đời không trừu tượng mà tích lũy từ hàng nghìn khoảnh khắc được thật sự nhận thấy." },
        { domain: "Ý nghĩa qua khổ đau", text: "Khi đau khổ không tránh được, Frankl: tự do cuối cùng là chọn thái độ trước nó — không lãng mạn hóa nỗi đau, nhưng không để nó thành vô nghĩa." },
      ],
    },
  ],
});

/* --- Trụ 07: tinh tế giác quan (thuộc nhóm cái đẹp) --- */
ENJOYMENT_PILLAR.groups[2].sections.push({
  heading: "Nuôi dưỡng giác quan & sự tinh tế thẩm mỹ",
  evidence: "moderate",
  mechanism: "Khả năng thưởng thức (aesthetic appreciation) không cố định — nó là kỹ năng tri giác luyện được. Chuyên gia trong một lĩnh vực cảm nhận (rượu, nhạc, trà, hương, hội họa) thực sự tri giác KHÁC người mới: họ phân biệt được nhiều sắc thái hơn vì đã xây schema tri giác và vốn từ để neo trải nghiệm.",
  expertNote: "Cơ chế: 'perceptual learning' — luyện tập có phản hồi làm tăng độ phân giải tri giác thật, không chỉ vốn từ. Và ngôn ngữ định hình tri giác: có từ để gọi tên một sắc thái giúp nhận ra nó lần sau (nối với emotional granularity, trụ 02 — cùng một cơ chế áp cho cảm xúc). Hệ quả đẹp: khả năng tận hưởng đời sống là thứ CÓ THỂ MỞ RỘNG — bạn có thể học cách cảm nhận nhiều hơn từ cùng một tách trà, cùng một bản nhạc, cùng một buổi chiều. Đây là một trong ít 'nguồn lực wellbeing' không bị giới hạn bởi tiền bạc hay thời gian. Cạm bẫy: sự tinh tế có thể trượt thành khó tính/snobbery (mất khả năng vui với cái bình thường) — chỉ dấu của tinh tế lành mạnh là thưởng thức được NHIỀU hơn, không phải ít hơn. Đồng thời, hedonic adaptation áp cả ở đây: đa dạng và sự chú ý mới giữ được sự tươi mới.",
  theory: "Perceptual learning; nghiên cứu chuyên gia cảm quan (wine/music expertise); Bryant (savoring); ngôn ngữ & tri giác.",
  controversy: "Một số nghiên cứu chuyên gia cảm quan (đặc biệt rượu) cho thấy sự tinh tế dễ bị ám thị/bối cảnh chi phối — độ phân giải tri giác thật có nhưng khiêm tốn hơn tuyên bố.",
  application: [
    { domain: "Luyện một giác quan", text: "Chọn một miền cảm giác để đào sâu có chủ đích (trà/cà phê, âm nhạc, hương, ánh sáng, ẩm thực) — chú ý, so sánh, đặt tên; khả năng thưởng thức tăng thật." },
    { domain: "Ngôn ngữ mở tri giác", text: "Học vốn từ mô tả (nốt hương, thể loại nhạc, chất liệu) — có từ để gọi tên giúp nhận ra sắc thái lần sau; cùng cơ chế với emotional granularity." },
    { domain: "Đơn nhiệm giác quan", text: "Thỉnh thoảng trải nghiệm một thứ với chú ý trọn vẹn, không đa nhiệm: nghe trọn một bản nhạc, uống trọn một tách trà — chú ý là điều kiện của tinh tế." },
    { domain: "Chống snobbery", text: "Chỉ dấu của tinh tế lành mạnh: bạn thưởng thức được NHIỀU thứ hơn, không phải khó tính hơn — nếu nó làm bạn khinh thường cái bình dị, đó là ngõ cụt." },
    { domain: "Giữ tươi mới", text: "Đa dạng hóa và chú ý mới chống hedonic adaptation — cùng một tách trà có thể mới lại nếu bạn thật sự có mặt." },
  ],
});
Object.assign(EXTRAS, {
  "Chu kỳ kinh nguyệt, hormone & điều chỉnh tập luyện/dinh dưỡng": {
    pitfalls: [
      "Dùng 'cycle syncing' làm lý do bỏ tập — bằng chứng cho hiệu ứng pha lên hiệu suất còn yếu; biến thiên cá nhân lớn hơn biến thiên theo pha.",
      "Coi mất kinh khi tập nhiều/ăn ít là dấu hiệu 'tập tốt' — đó là RED-S, dấu hiệu đỏ về thiếu hụt năng lượng.",
      "Chỉ đo hemoglobin mà bỏ ferritin — thiếu sắt là nguyên nhân mệt mỏi hay bị bỏ sót ở phụ nữ vận động.",
    ],
    micro: [
      "Ghi một ký tự đánh dấu pha chu kỳ cạnh log tập/ngủ — vài tháng sau có dữ liệu mẫu hình của CHÍNH BẠN, không cần app đắt tiền.",
    ],
  },
  "Chuẩn bị dài hạn: tiền mãn kinh, xương & tim mạch": {
    pitfalls: [
      "Nghĩ tiền mãn kinh là chuyện của tuổi 50 — có thể bắt đầu từ cuối 30/40 và bị chẩn đoán nhầm là 'stress'.",
      "Lấy thông tin về HRT từ internet/wellness — vùng nhiều thông tin sai lệch cả hai chiều; cần bác sĩ chuyên khoa.",
    ],
    micro: [
      "Đặt lịch một lần đo baseline (DEXA + panel) ở tuổi 30 — mốc so sánh quỹ đạo cho vài chục năm sau.",
    ],
  },
  "Môi trường vật lý: nhà cửa, ánh sáng, tiếng ồn & trật tự": {
    pitfalls: [
      "Đổ tiền vào 'thiết kế chữa lành/phong thủy' vượt bằng chứng, trong khi bỏ qua ba thứ có cơ sở: ánh sáng, tiếng ồn, không khí.",
      "Bỏ qua tiếng ồn ban đêm vì 'quen rồi' — nó vẫn phá giấc ngủ ngay cả khi bạn không thức giấc.",
    ],
    micro: [
      "Đổi đèn phòng ngủ sang ánh sáng ấm/mờ buổi tối — một lần chỉnh, lợi ích giấc ngủ mỗi đêm.",
      "Cho điện thoại một 'ngôi nhà' ngoài phòng ngủ — một quyết định, xóa hàng trăm lần cám dỗ.",
    ],
  },

  "Xấu hổ vs tội lỗi — phân biệt có sức chuyển hóa": {
    pitfalls: [
      "Dùng tự phê phán làm động lực — thực chất là xấu hổ, và bằng chứng cho thấy nó PHẢN tác dụng.",
      "Nhầm self-compassion với buông thả — nghiên cứu cho thấy nó tăng trách nhiệm và động lực sửa sai.",
      "Giữ xấu hổ trong im lặng — nó mạnh lên nhờ bí mật.",
    ],
    micro: [
      "Khi mắc lỗi, đổi một câu: từ 'mình tệ thật' sang 'mình đã làm sai X, sẽ sửa bằng Y' — chuyển xấu hổ thành tội lỗi thích ứng, 5 giây.",
    ],
  },
  "Đau buồn & mất mát — mô hình kép, không phải 'năm giai đoạn'": {
    pitfalls: [
      "Áp mô hình '5 giai đoạn' lên mình/người khác — không có cơ sở thực nghiệm, khiến người ta nghĩ mình 'đau buồn sai cách'.",
      "Ép 'buông bỏ để bước tiếp' — continuing bonds (giữ liên hệ tinh thần) hiện được xem là lành mạnh.",
      "Nói 'mọi thứ có lý do' với người đang đau buồn — vô ích và gây tổn thương.",
    ],
    micro: [
      "Với người đang đau buồn: đề nghị giúp CỤ THỂ ('mai anh mang cơm sang nhé') thay vì 'cần gì cứ nói' — người đau buồn hiếm khi hỏi.",
    ],
  },
  "Solitude — cô độc chủ động khác cô đơn": {
    pitfalls: [
      "Nhầm 'ở một mình với điện thoại' là solitude — đó là kích thích, không phải tĩnh lặng.",
      "Ngụy trang rút lui do trầm cảm/né tránh thành 'thích ở một mình' — cần trung thực về động cơ.",
    ],
    micro: [
      "10 phút đi bộ hoặc ngồi KHÔNG podcast/điện thoại — chất lượng tĩnh lặng quan trọng hơn thời lượng; hợp lịch bận.",
    ],
  },
  "Bất định, lo âu hiện sinh & khả năng chịu đựng cái không biết": {
    pitfalls: [
      "Cố đạt sự chắc chắn trước khi hành động — bất khả, và chính nỗ lực đó nuôi lo lắng mạn tính.",
      "Hiểu 'chấp nhận' thành cam chịu — chấp nhận là thôi vật lộn với cái không đổi được ĐỂ hành động ở nơi đổi được.",
    ],
    micro: [
      "Khi kẹt vì 'chưa chắc', hỏi: 'hành động tốt nhất với thông tin mình có NGAY BÂY GIỜ là gì?' — chuyển từ tìm chắc chắn sang hành động.",
    ],
  },

  "Tình yêu lãng mạn: đam mê, gắn bó & sự mới mẻ": {
    pitfalls: [
      "Coi sự phai của đam mê là bằng chứng 'chọn sai người' — đó là quy luật thần kinh (hedonic adaptation).",
      "Nhưng cũng đừng chấp nhận đơn điệu như định mệnh — sự đơn điệu, không phải xung đột, thường là kẻ giết quan hệ thầm lặng.",
      "'Date night' lặp lại y hệt — thiếu tính mới thì ít tác dụng self-expansion.",
    ],
    micro: [
      "Làm một việc MỚI và hơi thử thách cùng nhau mỗi tháng (không cần đắt) — self-expansion nuôi cả đam mê lẫn gắn bó.",
    ],
  },
  "Thân mật & sức khỏe tình dục": {
    pitfalls: [
      "Kết luận 'mình có vấn đề' khi ham muốn không tự phát — ham muốn đáp ứng (responsive desire) là mẫu hình bình thường.",
      "Cố 'tăng ga' trong khi vấn đề là quá nhiều 'phanh' (stress, kiệt sức, oán giận tồn đọng, thiếu ngủ).",
      "Im lặng vì xấu hổ — nguyên nhân phổ biến hơn nhiều so với 'không hợp'.",
    ],
    micro: [
      "Đụng chạm không tình dục, không kỳ vọng (ôm, nắm tay) mỗi ngày — nền của thân mật, gần như 0 chi phí.",
    ],
  },
  "Tha thứ, oán giận & hòa giải": {
    pitfalls: [
      "Nhầm tha thứ với hòa giải hoặc bao biện — bạn có thể tha thứ mà vẫn giữ ranh giới hoặc rời đi.",
      "Tha thứ vội do áp lực gia đình/văn hóa — không mang lại lợi ích và có thể duy trì tổn hại, đặc biệt nguy hiểm trong quan hệ lạm dụng.",
      "Tự tha thứ mà không nhận trách nhiệm — trượt thành bao biện.",
    ],
    micro: [
      "Khi oán giận trỗi dậy, nhắc: 'giữ nó đang tốn năng lượng của MÌNH' — khung lại tha thứ như giải phóng bản thân, không phải quà cho người kia.",
    ],
  },
  "Quyết định làm cha mẹ (hoặc không)": {
    pitfalls: [
      "Để kỳ vọng gia đình/xã hội quyết định thay mình — quyết định này quá lớn để sống theo kịch bản người khác.",
      "Nghĩ phân tích lợi-hại thuần sẽ giải quyết — đây là 'trải nghiệm biến đổi', nó thay đổi chính giá trị dùng để quyết định.",
      "Nếu chọn có con: không đàm phán trước về chia sẻ việc nhà/chăm sóc — gánh nặng rơi không cân xứng lên phụ nữ.",
    ],
    micro: [
      "Tách hai câu hỏi khi bị hỏi/áp lực: 'mình muốn gì?' và 'người khác muốn gì ở mình?' — nhận diện đâu là tiếng nói của ai.",
    ],
  },

  "Hài hước, tiếng cười & sự nhẹ nhõm": {
    pitfalls: [
      "Hài hước tự-hạ-thấp (mua vui bằng cách hạ mình) bị nhầm là khiêm tốn — tương quan wellbeing kém.",
      "Hài hước công kích/chế giễu được bào chữa là 'chỉ đùa' — hại quan hệ.",
      "Mỉa mai trong xung đột — không phải repair, mà là khinh miệt trá hình (kỵ sĩ nguy hiểm nhất).",
    ],
    micro: [
      "Ưu tiên cười CÙNG người thật hơn xem hài một mình — tiếng cười chung mới xây gắn kết.",
    ],
  },
  "Lòng tốt, hào phóng & prosocial": {
    pitfalls: [
      "Over-giving tới kiệt sức — dẫn tới compassion fatigue và oán giận ngầm.",
      "Gộp hai mục đích khác nhau: lòng tốt 'cảm thấy tốt' (gần, thấy tác động) và lòng tốt 'tác động lớn' (hiệu quả, xa) — cả hai chính đáng nhưng khác nhau.",
    ],
    micro: [
      "Một hành động tử tế cụ thể, thấy được tác động, với người bạn có kết nối — lợi ích wellbeing lớn nhất trên mỗi đơn vị nỗ lực.",
    ],
  },
  "Di sản, generativity & điều còn lại sau mình": {
    pitfalls: [
      "Nghĩ di sản đòi hỏi danh tiếng/quy mô hoặc con cái — di sản quan hệ (cách bạn khiến người khác cảm thấy) được nhớ lâu nhất.",
      "Hoãn generativity tới tuổi trung niên — nó nuôi ý nghĩa ngay từ bây giờ.",
      "Lưu ý: dữ liệu 'tiếc nuối cuối đời' là định tính/giai thoại — dùng để chiêm nghiệm, không phải bằng chứng cứng.",
    ],
    micro: [
      "Trả lời một câu hỏi/chia sẻ một tài nguyên cho người đi sau khi gặp dịp — generativity liều nhỏ, hợp lịch bận.",
    ],
  },

  "Dấn thân, chấp nhận rủi ro & học từ thất bại": {
    pitfalls: [
      "Lãng mạn hóa thất bại kiểu khởi nghiệp — survivorship bias; thất bại chỉ có giá trị nếu SỐNG SÓT và rút được bài học.",
      "Nhầm 'không sợ thất bại' với liều lĩnh — nguyên tắc bất di dịch: không bao giờ cược tới mức phá sản (ergodicity).",
      "Chờ phân tích đủ chắc mới hành động — trong bất định, hành động nhỏ tạo thông tin mà phân tích không tạo được.",
    ],
    micro: [
      "Trước khi thử điều gì, hỏi một câu: 'nếu hỏng, mình mất gì?' — nếu mất mát chấp nhận được, làm luôn; nếu có nhánh 'game over', dừng.",
      "Mỗi tháng đặt một 'cược nhỏ' (một bài viết, một cuộc phỏng vấn thông tin, một khoản thử nghiệm) — barbell trong thực tế.",
    ],
  },
  "Cởi mở trải nghiệm, khám phá & cân bằng explore–exploit": {
    pitfalls: [
      "'Luôn khám phá' ngụy trang cho né tránh cam kết — đặt điểm chuyển sang khai thác sau giai đoạn có thời hạn.",
      "Openness không kèm kỷ luật (conscientiousness) — thành khám phá mãi không ra thành quả.",
      "Nghĩ khám phá là kẻ thù của chiều sâu — thực ra nó là cách tìm ra NÊN đào sâu ở đâu.",
    ],
    micro: [
      "Mỗi tháng một 'cái mới' có chủ đích: một tác giả, một thể loại nhạc, một quán/khu phố, một quan điểm đối lập — biến openness thành hành động.",
    ],
  },
  "Theo đuổi chiều sâu & tiêu chuẩn sống cao": {
    pitfalls: [
      "Biến 'sống đẹp/sâu' thành chủ nghĩa hoàn hảo tự phán xét — hủy chính sự nhẹ nhõm mình tìm.",
      "Dùng chiều sâu làm đấu trường địa vị (chê người khác nông cạn) — snobbery, ngược tinh thần sâu sắc thật vốn khiêm nhường.",
      "Nhầm tiêu chuẩn cao với tiêu dùng đắt — đời sống đẹp là chú ý và chọn lọc, phần lớn miễn phí.",
    ],
    micro: [
      "Một 'phiên đọc sâu' 20 phút không thông báo, đọc liền mạch — bảo tồn mạch chú ý dài mà thói quen lướt bào mòn.",
      "Uống trọn một tách trà/cà phê không màn hình — tiêu chuẩn sống cao phiên bản 3 phút.",
    ],
  },
  "Yêu đời sâu sắc: amor fati & ôm trọn mọi sắc màu": {
    pitfalls: [
      "Dùng 'amor fati' để hợp lý hóa bất công, quan hệ độc hại, hay bệnh cần điều trị — chấp nhận cái KHÔNG đổi được, hành động ở cái đổi được.",
      "Theo đuổi một đời chỉ toàn cảm xúc tích cực — đơn điệu-tích-cực kém hơn emodiversity; và gắng gượng tìm hạnh phúc nghịch lý làm giảm nó.",
      "Lãng mạn hóa nỗi đau như thể nó tự động sinh ý nghĩa — ý nghĩa là điều ta KIẾN TẠO từ nó, không phải thuộc tính của nó.",
    ],
    micro: [
      "Mỗi ngày để ý và gọi tên một chi tiết giác quan cụ thể (mùi cà phê, ánh sáng chiều, tiếng mưa) — yêu đời tích lũy từ hàng nghìn khoảnh khắc được nhận thấy.",
    ],
  },
  "Nuôi dưỡng giác quan & sự tinh tế thẩm mỹ": {
    pitfalls: [
      "Để tinh tế trượt thành khó tính — chỉ dấu lành mạnh là thưởng thức được NHIỀU hơn, không phải ít hơn.",
      "Tin sự tinh tế cảm quan là tuyệt đối — nghiên cứu cho thấy nó dễ bị ám thị/bối cảnh chi phối (nhất là rượu).",
    ],
    micro: [
      "Nghe trọn một bản nhạc với chú ý đầy đủ, không làm gì khác — 4 phút, mở rộng khả năng tận hưởng (nguồn lực không giới hạn bởi tiền bạc).",
    ],
  },
});
/* ---------------------------------------------------------------
   MỞ RỘNG ĐỢT 4 — append vào trụ sẵn có
--------------------------------------------------------------- */

/* --- Trụ 01: phòng ngừa & cơ xương khớp --- */
PILLARS[0].groups.push({
  label: "Phòng ngừa & cơ xương khớp",
  sections: [
    {
      heading: "Phòng ngừa cấp 1 & 2: tầm soát, vaccine, sức khỏe răng miệng",
      evidence: "strong",
      mechanism: "Phòng ngừa cấp 1 ngăn bệnh xuất hiện (vaccine, lối sống); cấp 2 phát hiện sớm khi còn chữa được (tầm soát). Đây là nơi y học có tác động lớn nhất trên mỗi đơn vị nỗ lực — và cũng là nơi bị bỏ qua nhiều nhất vì lợi ích vô hình (bệnh không xảy ra thì không ai thấy).",
      expertNote: "Ba can thiệp có tỷ lệ lợi ích/chi phí cao nhất mà người trẻ khỏe hay bỏ: (1) HPV vaccine và tầm soát ung thư cổ tử cung (Pap/HPV test) — ung thư cổ tử cung là một trong số ít ung thư gần như PHÒNG NGỪA ĐƯỢC hoàn toàn; ở VN tỷ lệ tầm soát còn thấp. (2) Sức khỏe răng miệng — viêm nha chu mạn tính liên hệ với bệnh tim mạch và tiểu đường qua con đường viêm hệ thống; đây là ổ viêm mạn tính có thể xử lý được mà hầu như không ai đưa vào 'kế hoạch sức khỏe'. (3) Thính lực và thị lực — mất thính lực không điều chỉnh là một trong các yếu tố nguy cơ CÓ THỂ THAY ĐỔI lớn nhất cho sa sút trí tuệ (báo cáo Lancet Commission), qua giảm kích thích nhận thức và cô lập xã hội. Nguyên tắc expert: tầm soát KHÔNG phải càng nhiều càng tốt — over-screening gây dương tính giả, lo âu, thủ thuật thừa (overdiagnosis). Theo hướng dẫn dựa bằng chứng theo tuổi/nguy cơ, cùng bác sĩ.",
      theory: "Y học dự phòng (phân cấp phòng ngừa); Lancet Commission on dementia prevention; nghiên cứu nha chu & viêm hệ thống.",
      controversy: "Over-screening và overdiagnosis là vấn đề thật (một số tầm soát ung thư gây hại ròng ở nhóm nguy cơ thấp). 'Càng nhiều xét nghiệm càng tốt' là sai. Liên hệ nha chu–tim mạch là tương quan mạnh, nhân quả chưa hoàn toàn xác lập.",
      application: [
        { domain: "Nữ ~30 tuổi", text: "Đảm bảo đã tiêm HPV (vẫn có lợi ở người trưởng thành) và bắt đầu tầm soát cổ tử cung theo lịch khuyến nghị — một trong các can thiệp phòng ngừa hiệu quả nhất tồn tại." },
        { domain: "Răng miệng", text: "Lấy cao răng/khám nha khoa định kỳ và dùng chỉ nha khoa — coi đây là can thiệp CHỐNG VIÊM hệ thống, không chỉ thẩm mỹ." },
        { domain: "Thính lực dài hạn", text: "Bảo vệ thính lực từ bây giờ (giới hạn âm lượng tai nghe, nút tai ở nơi ồn) — mất thính lực là yếu tố nguy cơ sa sút trí tuệ thay đổi được." },
        { domain: "Không over-screening", text: "Theo hướng dẫn theo tuổi/nguy cơ cùng bác sĩ; nhiều xét nghiệm hơn không đồng nghĩa an toàn hơn — dương tính giả có chi phí thật." },
      ],
    },
    {
      heading: "Ngồi lâu, NEAT & sức khỏe cơ xương khớp cho dân văn phòng",
      evidence: "strong",
      mechanism: "Ngồi lâu liên tục có tác động chuyển hóa xấu (giảm hoạt tính lipoprotein lipase, giảm nhạy insulin) phần nào ĐỘC LẬP với việc có tập thể dục hay không. NEAT (năng lượng tiêu hao cho hoạt động không phải tập luyện — đi lại, đứng, cử động vặt) biến thiên rất lớn giữa các cá nhân và là thành phần đáng kể của tổng năng lượng tiêu hao.",
      expertNote: "Sắc thái expert: khẩu hiệu 'ngồi là thuốc lá mới' bị thổi phồng — phân tích gộp cho thấy vận động đầy đủ (~30–40 phút hoạt động vừa/ngày) phần lớn BÙ TRỪ được nguy cơ của ngồi nhiều. Nên thông điệp đúng không phải 'hoảng sợ vì ngồi' mà 'đảm bảo tổng vận động đủ + ngắt quãng ngồi'. Về đau lưng/cổ: bằng chứng cho thấy 'tư thế hoàn hảo' bị đề cao quá mức — tư thế TỐT NHẤT là tư thế TIẾP THEO (thay đổi thường xuyên); và đau lưng mạn tính thường liên quan tới yếu tố tâm lý-xã hội (stress, sợ vận động, niềm tin về tổn thương) nhiều hơn cấu trúc cột sống. Hình ảnh MRI bất thường (thoát vị đĩa đệm) rất phổ biến ở người KHÔNG đau. Điều trị hiệu quả nhất cho đau lưng không đặc hiệu: vận động và giáo dục, không phải nghỉ ngơi hay can thiệp.",
      theory: "Levine (NEAT); Ekelund (phân tích gộp ngồi lâu & vận động); mô hình sinh học-tâm lý-xã hội của đau lưng.",
      controversy: "'Ngồi là thuốc lá mới' phóng đại. Ngành ergonomics bán 'tư thế đúng'/ghế đắt vượt bằng chứng; đau lưng mạn tính ít tương quan với cấu trúc hơn ta tưởng.",
      application: [
        { domain: "Ưu tiên đúng thứ tự", text: "Đảm bảo tổng vận động đủ TRƯỚC (nó bù trừ phần lớn nguy cơ ngồi), rồi mới tối ưu việc ngắt quãng ngồi." },
        { domain: "Ngắt quãng", text: "Đứng dậy/di chuyển vài phút mỗi ~30–60 phút làm việc — ghép với 'restoration break' và nhịp deep-work sẵn có." },
        { domain: "Tư thế", text: "Đừng ám ảnh 'tư thế hoàn hảo'; thay đổi tư thế thường xuyên quan trọng hơn giữ một tư thế 'đúng'." },
        { domain: "Đau lưng/cổ", text: "Với đau không đặc hiệu: vận động, giảm sợ hãi về tổn thương, quản lý stress — hiệu quả hơn nghỉ ngơi; ảnh bất thường rất phổ biến ở người không đau." },
        { domain: "NEAT", text: "Tăng cử động vặt hằng ngày (đi cầu thang, đi bộ khi gọi điện, đỗ xe xa) — cộng dồn đáng kể mà không tốn 'thời gian tập'." },
      ],
    },
    {
      heading: "Thực phẩm bổ sung: cái gì có bằng chứng, cái gì là tiếp thị",
      evidence: "moderate",
      mechanism: "Phần lớn thực phẩm bổ sung ở người ăn uống đầy đủ không mang lại lợi ích đo được; ngành TPCN được quản lý lỏng lẻo hơn dược phẩm ở hầu hết quốc gia, nên tuyên bố hiệu quả thường vượt xa bằng chứng.",
      expertNote: "Danh sách ngắn có bằng chứng tương đối tốt: (1) creatine monohydrate — bổ sung được nghiên cứu nhiều nhất và an toàn nhất cho sức mạnh/khối cơ; ở phụ nữ còn có tín hiệu (chưa chắc chắn) về nhận thức và tâm trạng; (2) vitamin D nếu thiếu (phổ biến ở người ít ra nắng/dùng chống nắng nhiều) — bổ sung khi ĐO thấy thiếu, không bổ sung mù; (3) omega-3 (EPA/DHA) nếu ăn ít cá; (4) sắt nếu ferritin thấp (rất phổ biến ở phụ nữ vận động) — nhưng KHÔNG tự bổ sung sắt khi chưa xét nghiệm, vì thừa sắt độc; (5) caffeine (bổ sung được nghiên cứu tốt nhất cho hiệu suất); (6) protein bột — tiện lợi, không phép màu. Gần như mọi thứ khác (đa số vitamin tổng hợp ở người ăn đủ, 'detox', 'adrenal support', collagen cho da với bằng chứng yếu, phần lớn adaptogen) có bằng chứng yếu hoặc không. Nguyên tắc: bổ sung để lấp THIẾU HỤT đã xác định, không để 'tối ưu' mù.",
      theory: "Tổng quan bằng chứng về supplement; quy định lỏng lẻo ngành TPCN.",
      controversy: "Ngành TPCN có động cơ tài chính lớn để thổi phồng; đồng thời một số thiếu hụt (D, sắt, B12 ở người ăn chay) là thật và phổ biến. Bổ sung mù có thể gây hại (thừa sắt, vitamin A, chống oxy hóa liều cao quanh giờ tập).",
      application: [
        { domain: "Nguyên tắc gốc", text: "Xét nghiệm trước, bổ sung sau — lấp thiếu hụt đã xác định (D, sắt/ferritin, B12), không uống mù để 'tối ưu'." },
        { domain: "Có bằng chứng", text: "Creatine (sức mạnh/cơ, an toàn, và có tín hiệu cho phụ nữ), vitamin D nếu thiếu, omega-3 nếu ít ăn cá, caffeine cho hiệu suất." },
        { domain: "Cảnh giác", text: "Không tự bổ sung sắt khi chưa đo (thừa sắt độc); tránh chất chống oxy hóa liều cao quanh giờ tập; hoài nghi 'detox', adaptogen, phần lớn tuyên bố chống lão hóa." },
        { domain: "Tiết kiệm", text: "Tiền dành cho TPCN không bằng chứng nên chuyển sang thực phẩm nguyên bản, đồ tập, hoặc xét nghiệm định kỳ — ROI sức khỏe cao hơn nhiều." },
      ],
    },
  ],
});

/* --- Trụ 02: sức khỏe tâm thần thực dụng --- */
PILLARS[1].groups.push({
  label: "Sức khỏe tâm thần thực dụng",
  sections: [
    {
      heading: "Nhận biết trầm cảm, lo âu & ngưỡng cần giúp đỡ",
      evidence: "strong",
      mechanism: "Trầm cảm và rối loạn lo âu là các tình trạng y khoa có tiêu chuẩn chẩn đoán, cơ chế sinh học-tâm lý-xã hội, và điều trị hiệu quả — không phải 'yếu đuối' hay 'thiếu ý chí'. Chúng cũng khác với nỗi buồn hay căng thẳng thông thường về mức độ, thời gian và ảnh hưởng chức năng.",
      expertNote: "Hai dấu hiệu cốt lõi của trầm cảm (dùng trong sàng lọc PHQ-2): tâm trạng trầm buồn, và ANHEDONIA — mất hứng thú/niềm vui với những thứ trước đây thích. Anhedonia là dấu hiệu bị bỏ sót nhiều nhất vì người ta chỉ tìm 'nỗi buồn'. Ba trục để tự đánh giá: MỨC ĐỘ (có ảnh hưởng chức năng: làm việc, quan hệ, tự chăm sóc?), THỜI GIAN (kéo dài ≥2 tuần hầu hết các ngày?), và BỐI CẢNH (có tương xứng với hoàn cảnh?). Người hiệu suất cao thường trì hoãn tìm giúp đỡ vì vẫn 'chạy được' — 'high-functioning depression' che giấu bằng năng suất. Điều trị có bằng chứng: tâm lý trị liệu (CBT/ACT), thuốc, vận động (hiệu quả vừa cho trầm cảm nhẹ-vừa), và kết hợp thường tốt nhất. QUAN TRỌNG: nếu có ý nghĩ tự làm hại bản thân, đó là dấu hiệu cần tìm giúp đỡ khẩn cấp — không chờ, không tự đánh giá.",
      theory: "Tiêu chuẩn DSM-5/ICD-11; công cụ sàng lọc PHQ-9/GAD-7; bằng chứng về hiệu quả trị liệu và vận động.",
      controversy: "Vừa có under-diagnosis (kỳ thị, đặc biệt ở châu Á) vừa có nguy cơ bệnh lý hóa nỗi buồn bình thường. Thuốc chống trầm cảm hiệu quả rõ ở mức nặng, hiệu ứng khiêm tốn hơn ở mức nhẹ (và có tranh luận về publication bias) — quyết định cá thể hóa với bác sĩ. LƯU Ý CƠ CHẾ: mô hình 'mất cân bằng hóa chất/thiếu serotonin' như lời giải thích cho công chúng KHÔNG được bằng chứng ủng hộ (tổng quan ô của Moncrieff 2022) — điều này KHÔNG phủ nhận trầm cảm là tình trạng y khoa thật hay thuốc có tác dụng với nhiều người; nó chỉ nói ta CHƯA hiểu đầy đủ cơ chế, và hiệu quả điều trị không đòi hỏi một 'thiếu hụt hóa chất' làm tiền đề.",
      application: [
        { domain: "Ba câu hỏi tự kiểm", text: "Có mất hứng thú với thứ mình vốn thích (anhedonia)? Kéo dài ≥2 tuần hầu hết các ngày? Có ảnh hưởng chức năng sống? — nếu có, đó là lý do chính đáng để tìm chuyên gia." },
        { domain: "Bẫy của người hiệu suất cao", text: "Vẫn hoàn thành công việc KHÔNG có nghĩa là ổn — 'high-functioning depression' trì hoãn điều trị hàng năm." },
        { domain: "Điều trị có bằng chứng", text: "Tâm lý trị liệu, thuốc (khi phù hợp), vận động đều đặn — kết hợp thường hiệu quả nhất; đây là tình trạng y khoa, không phải khuyết điểm nhân cách." },
        { domain: "Khẩn cấp", text: "Ý nghĩ tự làm hại bản thân là tín hiệu cần tìm hỗ trợ ngay (chuyên gia, đường dây hỗ trợ, người tin cậy) — không tự đánh giá, không chờ." },
      ],
    },
    {
      heading: "Chủ nghĩa hoàn hảo: thích ứng vs bất thích ứng",
      evidence: "strong",
      mechanism: "Chủ nghĩa hoàn hảo có ít nhất hai chiều tách biệt: 'perfectionistic strivings' (đặt tiêu chuẩn cao cho bản thân — tương quan trung tính đến TÍCH CỰC với thành tựu và wellbeing) và 'perfectionistic concerns' (lo sợ mắc lỗi, tự phê phán khi không đạt, ám ảnh về đánh giá của người khác — tương quan mạnh với lo âu, trầm cảm, kiệt sức, trì hoãn).",
      expertNote: "Đây là phân biệt giải phóng: vấn đề KHÔNG phải tiêu chuẩn cao — mà là ĐIỀU GÌ XẢY RA KHI BẠN KHÔNG ĐẠT. Người có strivings cao + concerns thấp: tiêu chuẩn cao, thất bại thì học và tiếp tục (gần với mastery goals, trụ 04). Người có concerns cao: thất bại đe dọa giá trị bản thân → né tránh, trì hoãn (trì hoãn thường là triệu chứng của chủ nghĩa hoàn hảo, không phải lười), kiệt sức. Chủ nghĩa hoàn hảo đang TĂNG theo thời gian ở người trẻ (Curran & Hill, phân tích xu hướng), đặc biệt 'socially prescribed perfectionism' (tin rằng người khác đòi hỏi sự hoàn hảo ở mình) — dạng độc hại nhất, và mạng xã hội khuếch đại nó. Can thiệp không nhắm hạ tiêu chuẩn mà nhắm tách GIÁ TRỊ BẢN THÂN khỏi thành tích (self-compassion, trụ 02).",
      theory: "Stoeber & Otto (hai chiều); Curran & Hill (xu hướng tăng); Hewitt & Flett (socially prescribed perfectionism).",
      controversy: "Một số nhà nghiên cứu cho rằng 'perfectionism thích ứng' là tên gọi sai và mọi chủ nghĩa hoàn hảo đều có chi phí — tranh luận chưa ngã ngũ.",
      application: [
        { domain: "Chẩn đoán đúng", text: "Hỏi không phải 'tiêu chuẩn của mình có cao không' mà 'khi không đạt, mình học và tiếp tục hay sụp đổ và né tránh?' — vế sau mới là vấn đề." },
        { domain: "Trì hoãn", text: "Nếu bạn trì hoãn việc quan trọng, cân nhắc rằng đó có thể là sợ không hoàn hảo (không phải lười) — hạ ngưỡng khởi động ('bản nháp tệ trước') hiệu quả hơn tự trách." },
        { domain: "Giữ tiêu chuẩn, bỏ tự phê phán", text: "Không cần hạ tiêu chuẩn; cần tách giá trị bản thân khỏi kết quả — self-compassion là công cụ chính (bằng chứng: nó tăng chứ không giảm động lực)." },
        { domain: "Mạng xã hội", text: "'Socially prescribed perfectionism' (tin người khác đòi hỏi mình hoàn hảo) là dạng độc nhất và được mạng xã hội khuếch đại — giới hạn lướt thụ động là can thiệp trực tiếp." },
      ],
    },
    {
      heading: "Nghiện hành vi, dopamine & kinh tế học chú ý",
      evidence: "moderate",
      mechanism: "Dopamine mã hóa 'sai số dự đoán phần thưởng' và MONG MUỐN (wanting), không phải sự thích thú (liking) — đây là lý do người ta có thể khao khát mãnh liệt thứ mình không còn thực sự thích. Phần thưởng bất định, ngắt quãng (variable ratio) — cơ chế của máy đánh bạc, thông báo, feed vô tận — tạo mẫu hình theo đuổi bền bỉ nhất.",
      expertNote: "Berridge tách 'wanting' (dopamine, mesolimbic) khỏi 'liking' (opioid/endocannabinoid, hedonic hotspots) — nền tảng giải thích nghiện. Sản phẩm số được thiết kế có chủ đích khai thác điều này (variable reward, infinite scroll, social approval bất định). Lembke: tiêu thụ phần thưởng cường độ cao lặp lại đẩy 'cán cân khoái cảm–đau khổ' sang phía đau, khiến baseline tụt (cần nhiều hơn để cảm thấy bình thường) — cơ sở cho 'dopamine fasting' theo nghĩa NGHIÊM TÚC (giảm phơi nhiễm với siêu kích thích), khác hẳn phiên bản wellness bị chế giễu (không nói chuyện/không ăn). TRUNG THỰC: 'nghiện mạng xã hội/điện thoại' chưa phải chẩn đoán chính thức (chỉ nghiện cờ bạc và game được công nhận); nhiều tuyên bố 'dopamine detox' vượt bằng chứng. Nhưng cơ chế variable reward và tổn hại chú ý là thật. Đòn bẩy hiệu quả nhất không phải ý chí mà là MA SÁT và loại bỏ cue (trụ 03).",
      theory: "Berridge (wanting vs liking); Schultz (reward prediction error); Lembke (Dopamine Nation); thiết kế thuyết phục.",
      controversy: "'Dopamine detox' bị thương mại hóa và hiểu sai. Nghiện hành vi ngoài cờ bạc/game chưa được công nhận chính thức; tranh luận về mức độ tác hại của màn hình còn gay gắt.",
      application: [
        { domain: "Wanting ≠ liking", text: "Khi thấy khao khát mãnh liệt một hoạt động mà sau đó thấy trống rỗng, đó là dấu hiệu wanting bị kích hoạt mà không có liking — dữ liệu để thiết kế lại môi trường." },
        { domain: "Ma sát, không ý chí", text: "Xóa app khỏi màn hình chính, tắt thông báo, để điện thoại phòng khác — cắt CUE hiệu quả hơn nhiều so với 'cố kiểm soát'." },
        { domain: "Nghỉ có ý nghĩa", text: "Giảm phơi nhiễm siêu kích thích trong một khoảng (vài tuần) để baseline hồi phục — đây là ý nghĩa nghiêm túc của 'dopamine fasting', không phải nghi thức wellness." },
        { domain: "Thay thế, không chỉ cấm", text: "Điền vào chỗ trống bằng hoạt động chủ động tạo flow (trụ 07) — cấm mà không thay thế thường thất bại." },
      ],
    },
  ],
});

/* --- Trụ 03: sáng tạo, trực giác, trí tuệ --- */
IDENTITY_PILLAR.groups[1].sections.push(
  {
    heading: "Trực giác chuyên gia: khi nào nên tin nó",
    evidence: "strong",
    mechanism: "Trực giác là nhận dạng mẫu hình đã học được, xuất hiện trong ý thức mà không có bước suy luận rõ ràng. Nó đáng tin trong một số môi trường và cực kỳ không đáng tin trong những môi trường khác.",
    expertNote: "Đây là kết quả của một 'cộng tác đối kháng' hiếm hoi giữa Kahneman (hoài nghi trực giác) và Klein (ủng hộ trực giác chuyên gia) — họ đồng ý về điều kiện: trực giác chuyên gia đáng tin khi có (1) MÔI TRƯỜNG ĐỦ ĐỀU ĐẶN để có quy luật học được, và (2) CƠ HỘI HỌC quy luật đó qua phản hồi nhanh, rõ ràng, lặp lại. Lính cứu hỏa, cờ vua, gây mê: có. Dự báo thị trường chứng khoán dài hạn, tuyển dụng, dự đoán chính trị: KHÔNG — môi trường quá nhiễu, phản hồi chậm và mơ hồ, nên 'chuyên gia' ở đó có trực giác tự tin nhưng không chính xác. Hệ quả cực kỳ thực dụng: sự TỰ TIN của trực giác không phải chỉ báo về độ chính xác của nó. Trong môi trường nhiễu (đầu tư, tuyển dụng, dự báo), quy tắc/mô hình đơn giản thường vượt trội phán đoán chuyên gia (Meehl — nghiên cứu 60+ năm về dự đoán lâm sàng vs thống kê).",
    theory: "Kahneman & Klein (adversarial collaboration, 2009); Meehl (clinical vs statistical prediction).",
    controversy: "Chuyên gia thường phản đối mạnh phát hiện của Meehl; cảm giác chủ quan về chuyên môn rất thuyết phục ngay cả khi không chính xác.",
    application: [
      { domain: "Kiểm tra hai điều kiện", text: "Trước khi tin trực giác, hỏi: môi trường này có quy luật ổn định không? mình có nhận được phản hồi nhanh và rõ để học không? — nếu không cả hai, đừng tin trực giác dù nó rất tự tin." },
      { domain: "Đầu tư", text: "Thị trường là môi trường nhiễu, phản hồi chậm/mơ hồ — dùng quy tắc, checklist, decision journal thay vì 'cảm giác'; đây là lý do behavior gap tồn tại." },
      { domain: "Nghề BA/phân tích", text: "Trực giác về quy trình/công nghệ quen thuộc (nhiều lặp lại, phản hồi rõ) đáng tin hơn trực giác về kết quả kinh doanh dài hạn (nhiễu, phản hồi chậm)." },
      { domain: "Tuyển dụng/đánh giá người", text: "Phỏng vấn tự do có giá trị dự báo thấp đáng ngạc nhiên; cấu trúc hóa (câu hỏi chuẩn, thang điểm) vượt trội 'cảm nhận về ứng viên'." },
    ],
  },
  {
    heading: "Sáng tạo: tổ hợp, ấp ủ & sản lượng",
    evidence: "moderate",
    mechanism: "Sáng tạo hiếm khi là 'tia chớp từ hư không'. Nó chủ yếu là TỔ HỢP mới của các yếu tố đã có, đòi hỏi một kho nguyên liệu phong phú (chuyên môn + tiếp xúc đa dạng) cộng với quá trình cho phép các kết nối xa hình thành.",
    expertNote: "Ba phát hiện thực dụng: (1) SẢN LƯỢNG dự báo chất lượng — Simonton: các nhà sáng tạo lớn không có tỷ lệ thành công cao hơn, họ đơn giản TẠO RA NHIỀU HƠN ('equal-odds rule'); hệ quả: muốn có ý tưởng hay, hãy tạo nhiều ý tưởng, đừng chờ ý tưởng hay. (2) ẤP Ủ (incubation) có bằng chứng: rời khỏi vấn đề, đặc biệt làm việc nhẹ/đi bộ/ngủ, cải thiện giải quyết vấn đề sáng tạo — cơ chế liên quan default mode network và nới lỏng cố định (fixation); đây là lý do insight đến trong lúc tắm. (3) Ràng buộc THÚC ĐẨY sáng tạo thay vì cản trở — tự do vô hạn thường gây tê liệt; giới hạn có chủ đích (thời gian, hình thức, nguồn lực) buộc tìm giải pháp mới. Chống lại huyền thoại 'brainstorm nhóm': brainstorm nhóm truyền thống thực ra tạo ÍT ý tưởng hơn cùng số người làm việc riêng rồi gộp lại (production blocking, evaluation apprehension) — 'brainwriting' hiệu quả hơn.",
    theory: "Simonton (equal-odds rule); nghiên cứu incubation & DMN; phê phán brainstorming nhóm (Diehl & Stroebe).",
    controversy: "Đo lường sáng tạo khó; nhiều can thiệp 'dạy sáng tạo' hiệu quả yếu. Vai trò của ngủ/mơ trong insight còn tranh luận về cơ chế.",
    application: [
      { domain: "Tăng sản lượng", text: "Đặt hạn ngạch số lượng (10 ý tưởng, không phải 1 ý tưởng hay) — chất lượng nổi lên từ số lượng; đây là phát hiện phản trực giác quan trọng nhất." },
      { domain: "Ấp ủ có chủ đích", text: "Sau khi làm việc căng với một vấn đề, chủ động rời đi (đi bộ, ngủ, việc nhẹ) — insight cần khoảng trống, không phải cố ép thêm." },
      { domain: "Nguyên liệu đa dạng", text: "Sáng tạo là tổ hợp — đọc/trải nghiệm ngoài lĩnh vực của mình chính là nạp nguyên liệu (nối với openness và mental models)." },
      { domain: "Dùng ràng buộc", text: "Tự đặt giới hạn (viết trong 25 phút, chỉ 3 màu, chỉ một trang) — ràng buộc thúc đẩy sáng tạo, tự do vô hạn gây tê liệt." },
      { domain: "Nhóm", text: "Cho mọi người nghĩ RIÊNG trước rồi mới gộp (brainwriting) — brainstorm nhóm ngay từ đầu làm giảm số lượng và đa dạng ý tưởng." },
    ],
  },
  {
    heading: "Trí tuệ (wisdom) — khác thông minh",
    evidence: "moderate",
    mechanism: "Trí tuệ không phải IQ hay lượng kiến thức. Các định nghĩa hội tụ quanh: suy luận thực dụng về các vấn đề đời sống phức tạp, khiêm nhường tri thức (biết giới hạn hiểu biết của mình), nhận thức về sự thay đổi và bất định, cân nhắc nhiều góc nhìn, và tìm kiếm sự hòa giải/tổng hợp.",
    expertNote: "Phát hiện then chốt của Grossmann: 'nghịch lý Solomon' — con người suy luận KHÔN NGOAN HƠN đáng kể về vấn đề của NGƯỜI KHÁC so với vấn đề của chính mình. Nguyên nhân: gần gũi cảm xúc thu hẹp góc nhìn. Và điều này CHỮA ĐƯỢC bằng self-distancing (nghĩ về vấn đề của mình ở ngôi thứ ba, hoặc như thể tư vấn cho một người bạn) — trí tuệ do đó không phải đặc điểm cố định mà là TRẠNG THÁI có thể gọi ra. Thành phần được ủng hộ nhất: khiêm nhường tri thức (intellectual humility) — biết mình có thể sai — tương quan với học hỏi tốt hơn, ít phân cực, và quan hệ tốt hơn; và nó không đồng nghĩa thiếu tự tin. Trí tuệ cũng liên hệ với việc chuyển từ tư duy 'ai đúng' sang 'điều gì đúng' và chấp nhận rằng các giá trị chính đáng có thể xung đột.",
    theory: "Grossmann (wise reasoning, Solomon's paradox); Baltes (Berlin wisdom paradigm); nghiên cứu intellectual humility.",
    controversy: "Định nghĩa và đo lường trí tuệ còn tranh cãi; mang màu văn hóa. Tương quan tuổi–trí tuệ yếu hơn nhiều so với niềm tin phổ biến (tuổi tác không tự động mang trí tuệ).",
    application: [
      { domain: "Nghịch lý Solomon", text: "Với vấn đề của chính mình, tự hỏi 'mình sẽ khuyên một người bạn thân thế nào?' hoặc nghĩ về nó ở ngôi thứ ba — gọi ra suy luận khôn ngoan vốn có sẵn." },
      { domain: "Khiêm nhường tri thức", text: "Luyện nói 'mình có thể sai' và 'mình chưa biết' — tương quan học hỏi tốt hơn, ít phân cực; nó là dấu hiệu của sức mạnh, không phải yếu đuối." },
      { domain: "Từ 'ai đúng' sang 'điều gì đúng'", text: "Trong tranh luận, chuyển mục tiêu từ thắng sang hiểu — kết hợp steelmanning (trụ 03) và tư duy xác suất." },
      { domain: "Tuổi không tự mang trí tuệ", text: "Trí tuệ đến từ phản tư có chủ đích trên kinh nghiệm, không tự động từ số năm sống — thiết kế thói quen phản tư (decision journal, viết)." },
    ],
  }
);

/* --- Trụ 04: đàm phán + sở hữu/optionality --- */
REMAINING_PILLARS[0].groups[1].sections.push({
  heading: "Đàm phán & tự vận động cho bản thân",
  evidence: "moderate",
  mechanism: "Đàm phán là kỹ năng học được, không phải đặc điểm tính cách. Kết quả bị chi phối mạnh bởi việc chuẩn bị, neo (anchoring), và hiểu lợi ích thật (interests) đằng sau lập trường (positions) của các bên.",
  expertNote: "Ba đòn bẩy có bằng chứng: (1) BATNA (giải pháp thay thế tốt nhất nếu không thỏa thuận) quyết định quyền lực đàm phán nhiều hơn kỹ thuật nói năng — cải thiện BATNA (có lời mời khác, có tiết kiệm) là việc làm TRƯỚC bàn đàm phán; (2) neo đầu tiên có ảnh hưởng lớn (anchoring), nên chuẩn bị con số/khoảng có cơ sở; (3) chuyển từ lập trường sang lợi ích mở rộng chiếc bánh (integrative bargaining) thay vì chia nó. Sắc thái giới quan trọng và có bằng chứng: phụ nữ thường bị phạt xã hội (social backlash) khi đàm phán quyết liệt cho bản thân theo cách nam giới không bị — một bất công thật, không phải tưởng tượng. Chiến lược có bằng chứng giảm phạt (Bowles): đóng khung yêu cầu qua tiêu chuẩn khách quan và lợi ích chung ('theo dữ liệu thị trường, và điều này giúp tôi đóng góp X'), và 'đàm phán thay mặt người khác/nhóm' thường dễ hơn cho bản thân. Đây không phải khuyên phụ nữ nhẹ nhàng hơn — mà là công cụ điều hướng một sân chơi thực sự không bằng phẳng, đồng thời vẫn nên thay đổi sân chơi đó.",
  theory: "Fisher & Ury (getting to yes, interests vs positions, BATNA); Bowles (gender & negotiation backlash); anchoring.",
  controversy: "Nghiên cứu về phạt giới trong đàm phán có tranh luận về mức độ và bối cảnh, nhưng hiệu ứng được tái lập nhiều lần. Không nên dùng nó để đổ trách nhiệm thích nghi lên phụ nữ.",
  application: [
    { domain: "Trước bàn đàm phán", text: "Cải thiện BATNA trước (kỹ năng, lời mời khác, đệm tài chính) — quyền lực đàm phán đến từ đó nhiều hơn từ kỹ thuật nói." },
    { domain: "Chuẩn bị neo", text: "Vào với khoảng số có cơ sở dữ liệu thị trường; người neo trước thường định hình vùng thỏa thuận." },
    { domain: "Lợi ích, không lập trường", text: "Hỏi 'vì sao họ cần điều đó' — thường mở ra giải pháp làm lớn chiếc bánh (linh hoạt thời gian, đào tạo, chức danh) thay vì chỉ giằng co lương." },
    { domain: "Điều hướng phạt giới", text: "Đóng khung qua tiêu chuẩn khách quan và lợi ích chung; đàm phán 'thay mặt' vai trò/nhóm thường ít bị phạt hơn — công cụ thực dụng, không phải lời biện hộ cho sự bất công." },
    { domain: "Tự vận động hằng ngày", text: "Đàm phán không chỉ về lương: phạm vi công việc, dự án được giao (job crafting), thời gian — tập ở việc nhỏ để quen trước việc lớn." },
  ],
});

REMAINING_PILLARS[0].groups.push({
  label: "Sở hữu, dự án & optionality",
  sections: [
    {
      heading: "Sở hữu, đòn bẩy & xây tài sản tích lũy",
      evidence: "moderate",
      mechanism: "Thu nhập từ bán thời gian (lương) tuyến tính và có trần: bạn chỉ có ngần ấy giờ. Thu nhập từ tài sản có 'đòn bẩy' — mã nguồn, nội dung, sản phẩm, vốn, thương hiệu tiếp tục làm việc khi bạn ngủ. Sự khác biệt cấu trúc này, không phải nỗ lực, giải thích phần lớn khác biệt kết quả dài hạn.",
      expertNote: "Naval Ravikant phân loại ba dạng đòn bẩy: lao động (người khác — cổ điển, khó nhất), VỐN (tiền — cần được trao), và ĐÒN BẨY KHÔNG CẦN CẤP PHÉP (mã nguồn và truyền thông — nhân bản gần như miễn phí, ai cũng dùng được). Với người có kỹ năng phân tích và viết như một BA, dạng thứ ba là con đường khả thi nhất: công cụ, nội dung, sản phẩm số. Điểm expert bổ sung: phân biệt tài sản TÍCH LŨY (compounding — mỗi đơn vị công sức xây trên cái trước: kỹ năng, uy tín, danh mục, mã nguồn, khán giả) với công việc THAY THẾ (mỗi giờ độc lập, dừng là hết). Tối đa hóa tỷ trọng thời gian dành cho tài sản tích lũy là một trong các quyết định chiến lược đời người quan trọng nhất. Cảnh báo chống lãng mạn hóa: phần lớn dự án phụ thất bại; hầu hết 'thu nhập thụ động' không thụ động; survivorship bias khổng lồ trong nội dung về chủ đề này. Cách tiếp cận đúng là barbell (trụ 03): giữ nền lương ổn định + cược nhỏ vào tài sản tích lũy.",
      theory: "Naval (leverage, specific knowledge); phân biệt compounding vs replaceable work; cảnh báo survivorship bias.",
      controversy: "Không gian này đầy 'guru' bán khóa học với survivorship bias nặng. 'Thu nhập thụ động' hầu như luôn đòi hỏi lao động lớn phía trước và duy trì liên tục.",
      application: [
        { domain: "Kiểm kê thời gian", text: "Phân loại: bao nhiêu thời gian của mình xây TÀI SẢN TÍCH LŨY (kỹ năng hiếm, uy tín, danh mục, công cụ, mã nguồn) vs công việc thay thế được? Dịch chuyển tỷ trọng dần." },
        { domain: "Đòn bẩy khả thi nhất", text: "Với nền BA + tài chính + song ngữ: công cụ/nội dung/phân tích số hóa là đòn bẩy không cần xin phép ai — chi phí nhân bản gần bằng 0." },
        { domain: "Barbell, không nhảy vực", text: "Giữ thu nhập ổn định làm nền, đặt cược nhỏ vào dự án — không bỏ việc để 'all-in' vào một ý tưởng chưa kiểm chứng." },
        { domain: "Chống survivorship bias", text: "Với mỗi câu chuyện thành công bạn đọc, có hàng nghìn thất bại không được kể — kỳ vọng thực tế, quy mô cược nhỏ, học từ mỗi vòng." },
        { domain: "Uy tín tích lũy", text: "Làm việc công khai (viết, chia sẻ công cụ) — uy tín là tài sản cộng gộp mở ra cơ hội mà CV không mở được, đặc biệt khi pivot." },
      ],
    },
    {
      heading: "Optionality: giữ và tạo lựa chọn",
      evidence: "moderate",
      mechanism: "Trong môi trường bất định, giá trị nằm ở việc có QUYỀN nhưng không có NGHĨA VỤ hành động khi thông tin mới xuất hiện. Các vị thế có mặt trái giới hạn và mặt phải lớn (bất đối xứng lồi) tăng giá trị theo mức độ biến động — càng bất định, optionality càng đáng giá.",
      expertNote: "Áp dụng cho đời sống (Taleb): kỹ năng đa dạng, mạng lưới rộng, đệm tài chính, sức khỏe, và danh tiếng đều là 'quyền chọn' — chúng cho phép bạn nắm bắt cơ hội bất ngờ. Nhưng có hai cạm bẫy expert: (1) 'optionality vô tận' thành né tránh cam kết — quyền chọn chỉ có giá trị nếu cuối cùng bạn THỰC HIỆN nó; giữ mãi mọi cửa mở là cách đảm bảo không đi qua cửa nào (nghiên cứu của Ariely: người ta trả giá đắt để giữ những lựa chọn vô giá trị chỉ vì ghét đóng cửa). (2) Optionality có CHI PHÍ DUY TRÌ (thời gian, chú ý, phân tán) — quyền chọn không miễn phí. Với người đang pivot: xây optionality có mục đích (kỹ năng chuyển giao được, mạng lưới, đệm tài chính) trong một khung thời gian, rồi CAM KẾT.",
      theory: "Taleb (optionality, convexity); Ariely (chi phí của việc giữ cửa mở); lý thuyết quyền chọn thực (real options).",
      controversy: "Ngôn ngữ optionality dễ bị dùng để hợp lý hóa sự do dự mãn tính. Giá trị của quyền chọn phụ thuộc vào việc bạn có sẵn sàng thực hiện nó không.",
      application: [
        { domain: "Xây quyền chọn thật", text: "Đệm tài chính, kỹ năng chuyển giao được, mạng lưới rộng, sức khỏe — các quyền chọn cho phép nắm cơ hội bất ngờ khi nó tới." },
        { domain: "Đóng cửa có chủ đích", text: "Chủ động đóng các cửa bạn sẽ không bao giờ đi qua — giữ chúng mở tốn chú ý và làm loãng nỗ lực (chi phí duy trì quyền chọn là thật)." },
        { domain: "Có thời hạn", text: "Xây optionality trong một khung thời gian rồi CAM KẾT — quyền chọn không được thực hiện thì vô giá trị; đây là điểm chuyển explore→exploit." },
        { domain: "Bất đối xứng", text: "Ưu tiên hành động có mặt trái giới hạn, mặt phải lớn (viết công khai, học kỹ năng mới, kết nối) — chi phí thấp, đuôi phải dài." },
      ],
    },
  ],
});

/* --- Trụ 05: ranh giới, chăm sóc cha mẹ, kết bạn --- */
REMAINING_PILLARS[1].groups[0].sections.push(
  {
    heading: "Ranh giới & năng lực nói không",
    evidence: "moderate",
    mechanism: "Ranh giới là các giới hạn về điều bạn sẵn sàng làm, chấp nhận và cho đi. Thiếu ranh giới dẫn tới quá tải, oán giận ngầm và kiệt sức; nghịch lý là nó cũng làm hỏng quan hệ, vì sự đồng ý miễn cưỡng tích tụ thành oán giận.",
    expertNote: "Ranh giới KHÔNG phải kiểm soát người khác — chúng là tuyên bố về điều BẠN sẽ làm ('nếu X tiếp diễn, tôi sẽ rời khỏi cuộc trò chuyện'), không phải yêu cầu người khác thay đổi. Đây là phân biệt cốt lõi thường bị hiểu sai. Ranh giới cũng khác tối hậu thư ở chỗ động cơ là bảo vệ, không phải trừng phạt. Về mặt tâm lý, khó khăn khi nói không thường bắt nguồn từ nỗi sợ mất kết nối hoặc từ bản sắc 'người tốt/người có ích' (đặc biệt được xã hội hóa mạnh ở phụ nữ và trong văn hóa gia đình gắn kết). Cơ chế thực dụng: 'nói không' cụ thể và ngắn gọn hiệu quả hơn giải thích dài (giải thích mời gọi đàm phán lại); và một cái không rõ ràng bảo vệ những cái CÓ thật lòng. Người có ranh giới tốt thường được tôn trọng hơn, không phải ít hơn — dù có thể mất một số quan hệ vốn dựa trên sự khai thác.",
    theory: "Cloud & Townsend (boundaries); nghiên cứu assertiveness training; differentiation (Bowen, trụ 05).",
    controversy: "'Ranh giới' bị dùng sai trong văn hóa trị liệu phổ thông để hợp lý hóa việc né tránh trách nhiệm hoặc cắt đứt quan hệ vội vàng. Ranh giới lành mạnh giữ kết nối, không phá nó.",
    application: [
      { domain: "Định nghĩa đúng", text: "Ranh giới là điều BẠN sẽ làm, không phải yêu cầu người khác đổi ('tôi sẽ không thảo luận việc này khi bị quát' chứ không phải 'anh phải thôi quát')." },
      { domain: "Nói không gọn", text: "Từ chối ngắn, rõ, không giải thích dài — giải thích dài mời gọi đàm phán lại; 'mình không sắp xếp được, cảm ơn đã nghĩ đến mình' là đủ." },
      { domain: "Không để bảo vệ có", text: "Mỗi cái CÓ miễn cưỡng lấy đi năng lượng của một cái CÓ thật lòng — ranh giới bảo vệ chất lượng của những gì bạn thực sự cam kết." },
      { domain: "Bối cảnh gia đình VN", text: "Trong văn hóa gắn kết cao, ranh giới có thể bị đọc là bất hiếu — kết hợp với differentiation: giữ kết nối ấm áp VÀ giữ giới hạn, không cần chọn một." },
      { domain: "Ở nơi làm việc", text: "Nói không với dự án ngoài phạm vi cũng là bảo vệ chất lượng công việc chính — đóng khung qua ưu tiên chung, không qua sự sẵn sàng cá nhân." },
    ],
  },
  {
    heading: "Chăm sóc cha mẹ già & thế hệ kẹp",
    evidence: "moderate",
    mechanism: "'Thế hệ kẹp' (sandwich generation) — đồng thời chăm sóc con nhỏ và cha mẹ già trong khi vẫn đi làm — chịu tải chăm sóc cao, tương quan với căng thẳng, ảnh hưởng sức khỏe và sự nghiệp. Gánh nặng này rơi không cân xứng lên phụ nữ ở gần như mọi nền văn hóa.",
    expertNote: "Ba điều ít được nói: (1) 'Caregiver burden' là hiện tượng được nghiên cứu rõ, có công cụ đo, và người chăm sóc có nguy cơ trầm cảm/suy giảm sức khỏe cao hơn — chăm sóc bản thân người chăm sóc không phải ích kỷ mà là điều kiện để chăm sóc bền vững. (2) Ở văn hóa hiếu đạo (VN, Đông Á), kỳ vọng chăm sóc thường mặc định và không được thương lượng, dẫn tới oán giận ngầm giữa anh chị em — bàn bạc SỚM và tường minh về phân chia trách nhiệm (thời gian, tiền bạc, quyết định y tế) trước khủng hoảng là một trong các can thiệp giá trị nhất. (3) Các cuộc trò chuyện khó (mong muốn cuối đời, tài chính, giấy tờ, di nguyện) hiệu quả nhất khi diễn ra TRƯỚC khi cần — sau khủng hoảng thì mọi lựa chọn đều tệ và cảm xúc chi phối. Đảo ngược vai trò (con chăm cha mẹ) cũng là một mất mát cần được đau buồn (anticipatory grief), không chỉ một việc cần quản lý.",
    theory: "Nghiên cứu caregiver burden; sandwich generation; anticipatory grief.",
    controversy: "Cân bằng giữa nghĩa vụ hiếu đạo và giới hạn cá nhân là vấn đề giá trị, không có câu trả lời khoa học. Các chuẩn mực rất khác nhau theo văn hóa.",
    application: [
      { domain: "Bàn sớm, không chờ khủng hoảng", text: "Trò chuyện với cha mẹ và anh chị em về mong muốn, tài chính, giấy tờ, chăm sóc y tế TRƯỚC khi cần — sau khủng hoảng mọi lựa chọn đều tệ." },
      { domain: "Phân chia tường minh", text: "Làm rõ ai làm gì (thời gian, tiền, quyết định) — kỳ vọng mặc định là nguồn oán giận ngầm lớn nhất giữa anh chị em, và nó rơi vào con gái." },
      { domain: "Chăm sóc người chăm sóc", text: "Caregiver burden là nguy cơ sức khỏe thật — giữ ngủ, vận động, hỗ trợ xã hội và nghỉ ngơi không phải ích kỷ mà là điều kiện để bền." },
      { domain: "Cho phép đau buồn trước", text: "Chứng kiến cha mẹ suy giảm là một mất mát đang diễn ra (anticipatory grief) — cho phép mình buồn, không chỉ 'giải quyết vấn đề'." },
      { domain: "Kết hợp differentiation", text: "Yêu thương và chăm sóc mà vẫn giữ được bản thân (không fusion, không cut-off) — trụ 05 mục differentiation áp trực tiếp." },
    ],
  }
);

REMAINING_PILLARS[1].groups[1].sections.push({
  heading: "Kết bạn khi trưởng thành",
  evidence: "moderate",
  mechanism: "Tình bạn trưởng thành khó hình thành hơn vì thiếu ba điều kiện mà môi trường học đường cung cấp tự động (Rawlins): sự gần gũi lặp lại, tương tác không cấu trúc, và tính tự phát. Người trưởng thành phải TÁI TẠO các điều kiện này có chủ đích.",
  expertNote: "Ba cơ chế có bằng chứng: (1) 'mere exposure' + 'propinquity' — gặp lặp lại tình cờ trong cùng bối cảnh là yếu tố dự báo mạnh nhất của tình bạn hình thành (nối với third places, trụ 06); (2) tự bộc lộ ĐỐI ỨNG, tăng dần — Aron cho thấy các câu hỏi ngày càng sâu tạo cảm giác thân mật nhanh; nông quá thì không kết nối, sâu quá quá sớm thì đẩy người ta ra; (3) 'liking gap' (Boothby): sau một cuộc trò chuyện, người ta đánh giá THẤP mức độ đối phương thích mình một cách hệ thống — nghĩa là bạn được yêu mến hơn bạn nghĩ, và nỗi sợ 'làm phiền người khác' phần lớn không có cơ sở. Ước tính về thời gian: Hall cho rằng cần hàng chục tới hơn 200 giờ tương tác để đi từ người quen tới bạn thân — hàm ý quan trọng: tình bạn cần THỜI LƯỢNG và LẶP LẠI, và người bận thường không phân bổ nó, rồi kết luận nhầm rằng 'người lớn khó có bạn'.",
  theory: "Rawlins (điều kiện tình bạn); Aron (tự bộc lộ đối ứng); Boothby (liking gap); Hall (giờ để thành bạn).",
  controversy: "Con số 'giờ để thành bạn' của Hall là ước tính từ một mẫu hạn chế, nên xem là bậc độ lớn chứ không phải công thức.",
  application: [
    { domain: "Tái tạo điều kiện", text: "Tạo sự lặp lại có cấu trúc (nhóm chạy cố định, lớp học, buổi gặp định kỳ) — tình bạn nảy sinh từ gặp lặp lại, không từ ý định." },
    { domain: "Chủ động mời", text: "'Liking gap': bạn được yêu mến hơn bạn nghĩ, và người khác thường vui khi được mời — nỗi sợ làm phiền phần lớn là ảo tưởng nhận thức." },
    { domain: "Tự bộc lộ tăng dần", text: "Chia sẻ sâu dần và có đối ứng — trò chuyện chỉ về thông tin/công việc hiếm khi thành tình bạn." },
    { domain: "Phân bổ giờ thật", text: "Tình bạn cần thời lượng lặp lại (hàng chục giờ) — lên lịch định kỳ như một cam kết, đừng chờ 'khi rảnh'; đây là lý do người bận mất bạn." },
  ],
});

/* --- Trụ 06: bền vững & vòng tròn đạo đức --- */
REMAINING_PILLARS[2].groups[0].sections.push({
  heading: "Bền vững, vòng tròn đạo đức & hành động có ý nghĩa",
  evidence: "moderate",
  mechanism: "'Vòng tròn đạo đức' (moral circle) là phạm vi các thực thể mà ta coi là đáng được quan tâm về mặt đạo đức. Lịch sử cho thấy nó mở rộng dần (bộ tộc → quốc gia → nhân loại → động vật → thế hệ tương lai). Mở rộng vòng tròn có chủ đích là một hành động đạo đức và cũng là nguồn ý nghĩa.",
  expertNote: "Ba điểm thực dụng: (1) 'Eco-anxiety' (lo âu khí hậu) là phản ứng hợp lý với một vấn đề có thật, không phải bệnh lý — nhưng lo âu không hành động thì gây tê liệt; nghiên cứu cho thấy hành động tập thể (không phải chỉ hành vi cá nhân) vừa hiệu quả hơn vừa giảm lo âu tốt hơn. (2) Có khoảng cách lớn giữa hành động cá nhân được truyền thông nhấn mạnh (ống hút, tắt đèn) và các đòn bẩy thực sự lớn (ăn ít thịt đỏ hơn, bay ít hơn, lựa chọn nghề nghiệp, tiếng nói chính trị, và nơi tiền của bạn được đầu tư) — đây chính là chỗ ESG và tài chính bền vững có đòn bẩy thật, vượt xa hành vi tiêu dùng. (3) Chủ nghĩa vị tha hiệu quả (effective altruism) đóng góp một câu hỏi giá trị dù bản thân phong trào đã có tranh cãi nghiêm trọng: 'tác động trên mỗi đơn vị nguồn lực' đáng được hỏi, nhưng đừng để nó thay thế lòng tốt gần gũi hay biến đạo đức thành bài toán tối ưu lạnh lùng. Ý nghĩa qua đóng góp mạnh nhất khi khớp với kỹ năng và giá trị của bạn (trụ 08).",
  theory: "Singer (expanding circle); nghiên cứu eco-anxiety & collective action; phân tích đòn bẩy phát thải cá nhân; phê phán effective altruism.",
  controversy: "Trách nhiệm cá nhân vs hệ thống là tranh luận thật — nhấn mạnh hành vi cá nhân đôi khi được dùng để chuyển hướng khỏi trách nhiệm doanh nghiệp/chính sách. Effective altruism đã chịu chỉ trích nặng về quản trị và các giả định của nó.",
  application: [
    { domain: "Đòn bẩy thật", text: "Ưu tiên các lựa chọn có tác động lớn (chế độ ăn, đi lại, nơi tiền được đầu tư, lựa chọn nghề nghiệp) hơn các hành vi biểu tượng nhỏ." },
    { domain: "Nghề nghiệp là đòn bẩy", text: "Với hướng ESG/tài chính bền vững bạn đang cân nhắc: hướng chuyên môn phân tích vào phân bổ vốn có thể là đòn bẩy tác động lớn hơn nhiều so với hành vi tiêu dùng cá nhân." },
    { domain: "Hành động tập thể", text: "Lo âu khí hậu giảm khi hành động cùng người khác (không phải hành động cá nhân đơn lẻ) — kết hợp với trụ Cộng đồng." },
    { domain: "Giữ lòng tốt gần", text: "Hỏi 'tác động trên mỗi đơn vị nguồn lực' là hữu ích, nhưng đừng để đạo đức thành bài toán tối ưu lạnh — lòng tốt gần gũi có giá trị riêng." },
  ],
});

/* --- Trụ 07: du lịch, nghi thức --- */
ENJOYMENT_PILLAR.groups[0].sections.push(
  {
    heading: "Nghi thức, ăn mừng & đánh dấu thời gian",
    evidence: "moderate",
    mechanism: "Nghi thức (ritual) — chuỗi hành động có tính biểu tượng, lặp lại — có tác động đo được lên cảm xúc và ý nghĩa, ngay cả khi người thực hiện không tin vào 'sức mạnh' của nó. Nghi thức giảm lo âu trước sự kiện áp lực, tăng thưởng thức khi tiêu thụ, và tăng cảm giác gắn kết trong nhóm.",
    expertNote: "Norton & Gino: nghi thức giảm đau buồn và lo âu, một phần qua khôi phục cảm giác KIỂM SOÁT trong tình huống bất định. Nghi thức trước khi ăn tăng sự thưởng thức món ăn (chú ý + mong đợi). Nghi thức tập thể (lễ, đám cưới, tang lễ, thậm chí nghi thức nhóm nhỏ) đồng bộ hóa cảm xúc và củng cố bản sắc chung. Ý nghĩa sâu hơn: thời gian không được đánh dấu thì TRÔI VÀ BIẾN MẤT — hiện tượng tâm lý về nén thời gian (thời gian có vẻ trôi nhanh hơn khi các ngày giống nhau, vì trí nhớ mã hóa ít điểm mốc). Nghi thức và ăn mừng tạo các mốc, làm đời sống có cảm giác dài hơn và giàu hơn khi nhìn lại. Đây là một trong các can thiệp rẻ nhất chống lại cảm giác 'thời gian trôi vèo' của tuổi trưởng thành. Ăn mừng thành tựu cũng chống lại 'arrival fallacy' — nếu không dừng lại đánh dấu, bạn chỉ lao sang cột mốc kế tiếp.",
    theory: "Norton & Gino (rituals, grief & anxiety); Vohs (rituals & consumption); nghiên cứu nén thời gian và mã hóa trí nhớ.",
    controversy: "Cơ chế còn tranh luận (kiểm soát cảm nhận? chú ý? kỳ vọng?). Một số nghiên cứu nghi thức có cỡ mẫu nhỏ.",
    application: [
      { domain: "Đánh dấu thời gian", text: "Tạo nghi thức đánh dấu chu kỳ (đầu tháng, đổi mùa, sinh nhật, hoàn thành dự án) — ngày giống nhau thì trí nhớ nén lại và đời có vẻ trôi vèo." },
      { domain: "Ăn mừng thật sự", text: "Dừng lại đánh dấu thành tựu (kể cả nhỏ) trước khi lao sang cột mốc kế — chống arrival fallacy và cho phép savoring." },
      { domain: "Nghi thức trước áp lực", text: "Một chuỗi hành động cố định trước sự kiện căng (thuyết trình, thi) giảm lo âu qua khôi phục cảm giác kiểm soát — hiệu quả cả khi bạn biết nó 'chỉ là nghi thức'." },
      { domain: "Nghi thức chung", text: "Nghi thức gia đình/nhóm nhỏ (bữa ăn cố định, chuyến đi hằng năm) xây bản sắc chung và ký ức — rẻ và mạnh." },
    ],
  },
  {
    heading: "Du lịch, khám phá thế giới & trải nghiệm mới",
    evidence: "moderate",
    mechanism: "Trải nghiệm mới lạ tạo nhiều 'điểm mốc' trí nhớ, làm giai đoạn đó cảm thấy dài hơn khi nhìn lại (chống nén thời gian). Du lịch cũng cung cấp awe, tách bối cảnh (giúp tư duy trừu tượng và phản tư), và tiếp xúc với cách sống khác.",
    expertNote: "Sắc thái quan trọng, chống lãng mạn hóa: (1) sống ở nước ngoài (không phải du lịch lướt) tương quan với tăng self-concept clarity và sáng tạo — nhưng cơ chế là ĐỘ SÂU của tiếp xúc đa văn hóa, không phải số quốc gia đã đến; du lịch 'check-in' 20 nước có thể cho ít hơn một tháng sống thật ở một nơi. (2) Hạnh phúc của một chuyến đi phân bố không đều: MONG ĐỢI thường là phần hạnh phúc nhất (nghiên cứu về anticipation), và ký ức được định hình bởi peak-end chứ không phải tổng thời lượng — nên nhiều chuyến ngắn thường cho nhiều hạnh phúc hơn một chuyến dài, và lên kế hoạch sớm kéo dài phần mong đợi. (3) Du lịch không sửa được vấn đề nội tâm — 'geographic cure' là ảo tưởng; bạn mang chính mình theo. (4) Khám phá không cần hộ chiếu: sự mới lạ có chủ đích trong thành phố của mình (con đường mới, khu phố lạ, một cộng đồng khác) kích hoạt phần lớn cơ chế tương tự với chi phí gần bằng 0.",
    theory: "Nghiên cứu multicultural experience & creativity (Maddux & Galinsky); anticipation & vacation happiness (Nawijn); peak-end rule.",
    controversy: "Nhiều nghiên cứu là tương quan (người cởi mở/khá giả hơn vốn du lịch nhiều hơn). Lợi ích sáng tạo gắn với tiếp xúc SÂU, không phải du lịch bề mặt.",
    application: [
      { domain: "Sâu hơn rộng", text: "Ưu tiên ở lâu và sâu ở một nơi (ngôn ngữ, người địa phương, đời sống thường ngày) hơn gom số lượng quốc gia — lợi ích nhận thức đến từ độ sâu." },
      { domain: "Kéo dài mong đợi", text: "Đặt chuyến đi sớm và tận hưởng giai đoạn mong đợi — thường là phần hạnh phúc nhất; nhiều chuyến ngắn > một chuyến dài về tổng hạnh phúc." },
      { domain: "Thiết kế peak-end", text: "Đầu tư vào một khoảnh khắc đỉnh và một kết thúc đẹp — ký ức được mã hóa theo peak-end, không theo tổng thời lượng." },
      { domain: "Khám phá tại chỗ", text: "Sự mới lạ có chủ đích ngay trong thành phố mình (đường mới, khu lạ, cộng đồng khác) cho phần lớn lợi ích chống nén thời gian, chi phí gần 0." },
      { domain: "Không kỳ vọng 'geographic cure'", text: "Du lịch mở rộng góc nhìn nhưng không sửa vấn đề nội tâm — bạn mang chính mình theo; đừng dùng nó thay cho việc cần làm ở nhà." },
    ],
  }
);
Object.assign(EXTRAS, {
  "Phòng ngừa cấp 1 & 2: tầm soát, vaccine, sức khỏe răng miệng": {
    pitfalls: [
      "Bỏ qua răng miệng như chuyện thẩm mỹ — viêm nha chu là ổ viêm mạn tính liên hệ tim mạch/tiểu đường.",
      "Nghĩ 'càng nhiều xét nghiệm càng an toàn' — over-screening gây dương tính giả, lo âu, thủ thuật thừa.",
      "Trì hoãn tầm soát cổ tử cung vì thấy khỏe — đây là một trong số ít ung thư gần như phòng ngừa được hoàn toàn.",
    ],
    micro: [
      "Đặt lịch nha khoa định kỳ ngay hôm nay (một cuộc gọi) — can thiệp chống viêm hệ thống rẻ nhất mà hầu như ai cũng bỏ.",
      "Giảm âm lượng tai nghe xuống dưới ~60% — bảo vệ thính lực, yếu tố nguy cơ sa sút trí tuệ thay đổi được.",
    ],
  },
  "Ngồi lâu, NEAT & sức khỏe cơ xương khớp cho dân văn phòng": {
    pitfalls: [
      "Hoảng vì 'ngồi là thuốc lá mới' — bị thổi phồng; vận động đủ bù trừ phần lớn nguy cơ. Lo đúng thứ tự.",
      "Ám ảnh 'tư thế hoàn hảo' và ghế đắt — thay đổi tư thế thường xuyên quan trọng hơn giữ một tư thế 'đúng'.",
      "Nghỉ ngơi khi đau lưng không đặc hiệu — vận động và giảm sợ hãi hiệu quả hơn; ảnh MRI bất thường rất phổ biến ở người KHÔNG đau.",
    ],
    micro: [
      "Đứng dậy đi vài chục bước mỗi khi kết thúc một khối làm việc — ghép vào nhịp deep-work sẵn có, 0 thời gian thêm.",
      "Đi cầu thang thay thang máy / đi bộ khi gọi điện — NEAT cộng dồn đáng kể mà không cần 'thời gian tập'.",
    ],
  },
  "Thực phẩm bổ sung: cái gì có bằng chứng, cái gì là tiếp thị": {
    pitfalls: [
      "Bổ sung mù để 'tối ưu' thay vì lấp thiếu hụt đã xét nghiệm — lãng phí và đôi khi có hại.",
      "Tự bổ sung sắt khi chưa đo ferritin — thừa sắt độc.",
      "Tin collagen/adaptogen/detox — bằng chứng yếu hoặc không; ngành TPCN quản lý lỏng hơn dược phẩm.",
    ],
    micro: [
      "Chuyển tiền TPCN không bằng chứng sang một lần xét nghiệm định kỳ — ROI sức khỏe cao hơn nhiều.",
    ],
  },

  "Nhận biết trầm cảm, lo âu & ngưỡng cần giúp đỡ": {
    pitfalls: [
      "Chỉ tìm 'nỗi buồn' mà bỏ sót ANHEDONIA (mất hứng thú) — dấu hiệu cốt lõi hay bị bỏ qua nhất.",
      "'Vẫn làm việc được nên chắc ổn' — high-functioning depression trì hoãn điều trị hàng năm.",
      "Coi đây là khuyết điểm nhân cách thay vì tình trạng y khoa có điều trị hiệu quả.",
    ],
    micro: [
      "Tự hỏi hai câu PHQ-2 mỗi khi thấy kéo dài: tâm trạng trầm buồn? mất hứng thú với thứ mình vốn thích? — 10 giây, ngưỡng rõ ràng để tìm giúp đỡ.",
    ],
  },
  "Chủ nghĩa hoàn hảo: thích ứng vs bất thích ứng": {
    pitfalls: [
      "Nghĩ vấn đề là 'tiêu chuẩn quá cao' — vấn đề là điều xảy ra KHI KHÔNG ĐẠT (tự phê phán, né tránh).",
      "Gọi trì hoãn là lười — nó thường là triệu chứng của sợ không hoàn hảo.",
      "Hạ tiêu chuẩn để bớt khổ — không cần; cần tách giá trị bản thân khỏi thành tích.",
    ],
    micro: [
      "Khi kẹt không bắt đầu được, cho phép mình viết 'bản nháp tệ' — hạ ngưỡng khởi động phá vòng trì hoãn-hoàn hảo.",
    ],
  },
  "Nghiện hành vi, dopamine & kinh tế học chú ý": {
    pitfalls: [
      "Dựa vào ý chí để chống lại sản phẩm được thiết kế bởi hàng nghìn kỹ sư để giữ chú ý bạn — cắt CUE mới hiệu quả.",
      "Tin 'dopamine detox' phiên bản wellness (không nói chuyện/không ăn) — hiểu sai; ý nghĩa nghiêm túc là giảm phơi nhiễm siêu kích thích.",
      "Cấm mà không thay thế bằng hoạt động chủ động tạo flow — thường thất bại.",
    ],
    micro: [
      "Xóa app gây nghiện khỏi màn hình chính (vẫn giữ app) — một hành động, giảm mạnh lượt mở vô thức.",
    ],
  },

  "Trực giác chuyên gia: khi nào nên tin nó": {
    pitfalls: [
      "Dùng SỰ TỰ TIN của trực giác làm chỉ báo cho độ chính xác — hai thứ này gần như không liên quan trong môi trường nhiễu.",
      "Tin 'cảm giác thị trường' — môi trường nhiễu, phản hồi chậm, trực giác ở đây không đáng tin.",
      "Phỏng vấn tự do rồi tin 'cảm nhận về ứng viên' — giá trị dự báo thấp đáng ngạc nhiên.",
    ],
    micro: [
      "Trước khi theo trực giác, hỏi hai câu: môi trường có quy luật ổn định? mình có phản hồi nhanh và rõ để học? — nếu không, dùng checklist.",
    ],
  },
  "Sáng tạo: tổ hợp, ấp ủ & sản lượng": {
    pitfalls: [
      "Chờ 'ý tưởng hay' thay vì tạo nhiều ý tưởng — equal-odds rule: sản lượng dự báo chất lượng.",
      "Cố ép giải quyết liên tục mà không cho ấp ủ — insight cần khoảng trống (đi bộ, ngủ).",
      "Brainstorm nhóm ngay từ đầu — tạo ÍT ý tưởng hơn cùng số người nghĩ riêng rồi gộp.",
    ],
    micro: [
      "Đặt hạn ngạch 10 ý tưởng tệ trong 5 phút thay vì tìm 1 ý tưởng hay — số lượng mở đường cho chất lượng.",
    ],
  },
  "Trí tuệ (wisdom) — khác thông minh": {
    pitfalls: [
      "Nghĩ tuổi tác/kinh nghiệm tự mang lại trí tuệ — không; cần phản tư có chủ đích.",
      "Nghịch lý Solomon: khôn ngoan với vấn đề người khác nhưng mù với vấn đề của chính mình.",
      "Nhầm khiêm nhường tri thức với thiếu tự tin — nó là sức mạnh, tương quan học hỏi tốt hơn.",
    ],
    micro: [
      "Với vấn đề của mình, hỏi 'mình sẽ khuyên bạn thân thế nào?' — gọi ra suy luận khôn ngoan vốn có sẵn, 10 giây.",
    ],
  },

  "Đàm phán & tự vận động cho bản thân": {
    pitfalls: [
      "Nghĩ đàm phán là kỹ năng nói năng — BATNA (giải pháp thay thế) quyết định quyền lực nhiều hơn, và nó xây TRƯỚC bàn đàm phán.",
      "Giằng co lập trường thay vì tìm lợi ích thật — bỏ lỡ giải pháp làm lớn chiếc bánh.",
      "Bỏ qua thực tế phạt giới (backlash) với phụ nữ đàm phán — có thật; điều hướng nó bằng khung khách quan, nhưng đừng coi đó là lỗi của bạn.",
    ],
    micro: [
      "Tập nói không/đàm phán ở việc nhỏ hằng tuần (phạm vi công việc, deadline) — quen trước khi tới việc lớn.",
    ],
  },
  "Sở hữu, đòn bẩy & xây tài sản tích lũy": {
    pitfalls: [
      "Bỏ việc 'all-in' vào ý tưởng chưa kiểm chứng — dùng barbell: nền ổn định + cược nhỏ.",
      "Tin 'thu nhập thụ động' — hầu như luôn đòi hỏi lao động lớn phía trước và duy trì.",
      "Học từ người thành công mà bỏ qua hàng nghìn thất bại không được kể (survivorship bias).",
    ],
    micro: [
      "Mỗi tuần dành một khối cho tài sản TÍCH LŨY (viết công khai, xây công cụ, học kỹ năng hiếm) — cộng gộp, khác giờ làm thay thế được.",
    ],
  },
  "Optionality: giữ và tạo lựa chọn": {
    pitfalls: [
      "Giữ mọi cửa mở mãi — quyền chọn không thực hiện thì vô giá trị; đó là né tránh cam kết trá hình.",
      "Quên chi phí duy trì quyền chọn (chú ý, phân tán) — quyền chọn không miễn phí.",
    ],
    micro: [
      "Đóng chủ đích một cửa bạn biết sẽ không đi qua — giải phóng chú ý ngay lập tức.",
    ],
  },

  "Ranh giới & năng lực nói không": {
    pitfalls: [
      "Định nghĩa sai ranh giới thành yêu cầu người khác đổi — ranh giới là điều BẠN sẽ làm.",
      "Giải thích dài khi từ chối — mời gọi đàm phán lại; ngắn gọn hiệu quả hơn.",
      "Dùng 'ranh giới' để hợp lý hóa cắt đứt vội — ranh giới lành mạnh giữ kết nối, không phá nó.",
    ],
    micro: [
      "Một câu từ chối mẫu để sẵn: 'Mình không sắp xếp được, cảm ơn đã nghĩ đến mình.' — dùng lại, không giải thích thêm.",
    ],
  },
  "Chăm sóc cha mẹ già & thế hệ kẹp": {
    pitfalls: [
      "Chờ khủng hoảng mới bàn — sau đó mọi lựa chọn đều tệ và cảm xúc chi phối.",
      "Để kỳ vọng mặc định phân chia trách nhiệm — nguồn oán giận ngầm lớn nhất giữa anh chị em, và nó rơi vào con gái.",
      "Coi chăm sóc bản thân người chăm sóc là ích kỷ — caregiver burden là nguy cơ sức khỏe thật.",
    ],
    micro: [
      "Bắt đầu một cuộc trò chuyện nhỏ với cha mẹ về mong muốn/giấy tờ khi mọi thứ còn bình thường — dễ hơn nhiều so với lúc khẩn cấp.",
    ],
  },
  "Kết bạn khi trưởng thành": {
    pitfalls: [
      "Chờ tình bạn 'tự nhiên xảy ra' như hồi đi học — điều kiện (gặp lặp lại, phi cấu trúc) không còn tự động; phải tái tạo.",
      "Sợ làm phiền khi mời — 'liking gap': bạn được yêu mến hơn bạn nghĩ.",
      "Chỉ trò chuyện thông tin/công việc — thiếu tự bộc lộ đối ứng thì hiếm khi thành bạn.",
    ],
    micro: [
      "Nhắn mời một người đi cà phê tuần này — 30 giây; xác suất họ vui hơn bạn nghĩ.",
    ],
  },
  "Bền vững, vòng tròn đạo đức & hành động có ý nghĩa": {
    pitfalls: [
      "Dồn năng lượng vào hành vi biểu tượng nhỏ (ống hút) mà bỏ đòn bẩy lớn (ăn uống, đi lại, nơi tiền được đầu tư, nghề nghiệp).",
      "Lo âu khí hậu không hành động — gây tê liệt; hành động TẬP THỂ giảm lo âu tốt hơn hành động cá nhân đơn lẻ.",
      "Biến đạo đức thành bài toán tối ưu lạnh lùng — lòng tốt gần gũi có giá trị riêng.",
    ],
    micro: [
      "Kiểm tra nơi tiền tiết kiệm/đầu tư của bạn đang được dùng — một quyết định, đòn bẩy lớn hơn nhiều hành vi tiêu dùng.",
    ],
  },

  "Nghi thức, ăn mừng & đánh dấu thời gian": {
    pitfalls: [
      "Lao sang cột mốc kế mà không dừng lại ăn mừng — nuôi arrival fallacy, đời trôi vèo.",
      "Để các ngày giống hệt nhau — trí nhớ mã hóa ít mốc, thời gian cảm thấy trôi nhanh và trống.",
    ],
    micro: [
      "Đánh dấu một việc hoàn thành hôm nay bằng một hành động nhỏ có tính nghi thức (một tách trà ngon, ghi vào sổ) — tạo mốc trí nhớ, 2 phút.",
    ],
  },
  "Du lịch, khám phá thế giới & trải nghiệm mới": {
    pitfalls: [
      "Gom số lượng quốc gia (check-in) — lợi ích nhận thức đến từ ĐỘ SÂU tiếp xúc, không phải số nước.",
      "Kỳ vọng 'geographic cure' — du lịch không sửa vấn đề nội tâm; bạn mang chính mình theo.",
      "Một chuyến dài duy nhất mỗi năm — nhiều chuyến ngắn thường cho nhiều hạnh phúc hơn (mong đợi + peak-end).",
    ],
    micro: [
      "Đặt sớm một chuyến nhỏ để kéo dài giai đoạn MONG ĐỢI — thường là phần hạnh phúc nhất của chuyến đi.",
      "Đi một con đường/khu phố chưa từng đi trong thành phố mình — chống nén thời gian, chi phí gần 0.",
    ],
  },
});

/* ---------------------------------------------------------------
   ĐÀO SÂU THÊM — trụ 05 (Gia đình), 06 (Cộng đồng), 07 (Tận hưởng)
--------------------------------------------------------------- */

/* Trụ 05 — thêm vào nhóm "Quan hệ thân thiết" (groups[0]) */
REMAINING_PILLARS[1].groups[0].sections.push(
  {
    heading: "Lòng tin: xây, phá & tái thiết sau phản bội",
    evidence: "moderate",
    mechanism: "Lòng tin là kỳ vọng rằng người kia sẽ hành xử vì lợi ích chung ngay cả khi bạn dễ tổn thương. Nó xây chậm qua nhiều tương tác nhỏ nhất quán, nhưng có thể sụp nhanh sau một vi phạm — vì não gán trọng số cao bất thường cho bằng chứng về sự không đáng tin (thiên kiến tiêu cực).",
    expertNote: "Nghiên cứu về niềm tin (Rempel, Holmes) phân biệt ba tầng: khả đoán (predictability), khả tín (dependability), và đức tin (faith — tin cả trong bất định). Sau phản bội, tái thiết KHÔNG phải 'quay lại như cũ' mà là xây một cấu trúc mới. Điều then chốt (Gottman về 'atonement–attunement–attachment'): người vi phạm phải chịu trách nhiệm hoàn toàn không phòng thủ, thể hiện thấu hiểu tác động (không chỉ 'xin lỗi'), và minh bạch bền bỉ theo thời gian — trong khi người bị tổn thương cần được bày tỏ nỗi đau mà không bị vội vàng thúc 'cho qua'. 'Sự tha thứ' và 'tái lập niềm tin' là hai việc khác nhau: có thể tha thứ (giải phóng oán giận) mà chưa/không tái lập tin tưởng. Niềm tin mới được xây trên HÀNH VI nhất quán qua thời gian, không trên lời hứa. Cảnh báo: trong lạm dụng lặp lại, áp lực 'phải cho cơ hội' có thể nguy hiểm — tin tưởng phải được KIẾM LẠI, không phải nghĩa vụ trao đi.",
    theory: "Rempel & Holmes (ba tầng niềm tin); Gottman (mô hình tái thiết sau phản bội); nghiên cứu betrayal trauma (Freyd).",
    controversy: "Không phải mọi vi phạm đều nên/có thể tái thiết; ranh giới giữa 'cho cơ hội' và 'chịu đựng lặp lại' là phán đoán giá trị, không có công thức. Dữ liệu chủ yếu lâm sàng/tương quan.",
    application: [
      { domain: "Xây chủ động", text: "Niềm tin xây từ vô số tương tác nhỏ nhất quán (giữ lời hứa nhỏ, có mặt khi nói sẽ có mặt) — đầu tư vào độ tin cậy hằng ngày, không chỉ khoảnh khắc lớn." },
      { domain: "Nếu là người vi phạm", text: "Chịu trách nhiệm hoàn toàn không phòng thủ, chứng tỏ hiểu TÁC ĐỘNG (không chỉ nói 'xin lỗi'), và minh bạch bền bỉ — niềm tin tái lập qua hành vi theo thời gian, không qua lời hứa." },
      { domain: "Nếu bị tổn thương", text: "Cho phép mình bày tỏ nỗi đau và cần thời gian; tách 'tha thứ' (giải phóng oán giận, có thể làm cho mình) khỏi 'tái lập niềm tin' (đòi hỏi thay đổi và an toàn thật)." },
      { domain: "Ranh giới an toàn", text: "Niềm tin phải được KIẾM LẠI, không phải nghĩa vụ trao đi; với vi phạm lặp lại/lạm dụng, đừng để áp lực 'phải cho cơ hội' vượt qua an toàn của bạn." },
    ],
  },
  {
    heading: "Lao động cảm xúc & sự công bằng vô hình trong quan hệ",
    evidence: "moderate",
    mechanism: "Nhiều quan hệ và gia đình chứa 'công việc vô hình': lao động cảm xúc (quản lý cảm xúc, giữ hòa khí) và tải nhận thức (cognitive/mental load — nhớ, lên kế hoạch, điều phối việc nhà/con cái/quan hệ họ hàng). Vì nó vô hình và không được đặt tên, nó thường không được ghi nhận và phân bổ rất không đều.",
    expertNote: "Nghiên cứu (Hochschild đặt ra 'emotional labor'; Daminger về 'cognitive labor') cho thấy tải nhận thức — phần 'nghĩ và điều phối', khác phần 'thực thi' — rơi không cân xứng lên phụ nữ ngay cả trong các cặp tự nhận bình đẳng, và ngay cả khi việc tay chân được chia đều. Đây là nguồn kiệt sức và oán giận ngầm bị đánh giá thấp vì cả hai bên đều không THẤY nó. 'Bất công vô hình' đặc biệt mạnh trong bối cảnh văn hóa kỳ vọng phụ nữ là người 'giữ lửa' gia đình (rất liên quan ở VN). Điểm expert: giải pháp không phải 'giúp đỡ' (từ 'giúp' đã ngầm định chủ sở hữu công việc là một người) mà là chuyển QUYỀN SỞ HỮU trọn vẹn một mảng (bao gồm cả phần nghĩ/lập kế hoạch), và ĐẶT TÊN cho tải vô hình để nó thành thảo luận được. Công bằng cảm nhận (perceived fairness), không phải chia 50/50 tuyệt đối, mới dự báo hài lòng quan hệ.",
    theory: "Hochschild (emotional labor, 'second shift'); Daminger (cognitive labor); nghiên cứu perceived fairness & hài lòng hôn nhân.",
    controversy: "Đo lường tải vô hình khó và dựa tự báo cáo. Chuẩn mực giới khác nhau theo văn hóa; nguy cơ khái quát hóa. Nhưng mẫu hình phân bổ lệch được tái lập rộng.",
    application: [
      { domain: "Đặt tên cái vô hình", text: "Liệt kê ra CẢ phần 'nghĩ/nhớ/lên kế hoạch/điều phối' (không chỉ việc tay chân) để tải nhận thức trở nên nhìn thấy được và thảo luận được." },
      { domain: "Chuyển quyền sở hữu, không 'giúp'", text: "Giao trọn một mảng (gồm cả phần nghĩ và lập kế hoạch) cho một người, thay vì một người 'chủ' rồi người kia 'giúp' — 'giúp' vẫn để lại tải điều phối cho một phía." },
      { domain: "Nhắm công bằng cảm nhận", text: "Mục tiêu là cả hai thấy CÔNG BẰNG (theo nguồn lực và ràng buộc từng người), không phải chia 50/50 cứng — công bằng cảm nhận mới dự báo hài lòng." },
      { domain: "Bối cảnh VN", text: "Cảnh giác kỳ vọng văn hóa mặc định phụ nữ là 'người giữ lửa' — nhận diện nó là bước đầu để không tự động gánh toàn bộ tải vô hình mà không ai bàn tới." },
    ],
  },
  {
    heading: "Phụ thuộc lành mạnh vs đồng phụ thuộc (interdependence)",
    evidence: "contested",
    mechanism: "Có một phổ từ độc lập cứng nhắc (không cho ai vào, tự làm hết) → phụ thuộc lành mạnh (interdependence: dựa vào nhau mà vẫn giữ được bản thân) → đồng phụ thuộc (codependence: bản sắc và giá trị bản thân hòa tan vào việc chăm sóc/kiểm soát người kia, thường quanh một người có vấn đề).",
    expertNote: "Điểm trung tâm: mục tiêu KHÔNG phải độc lập tối đa (một huyền thoại văn hóa phương Tây) mà là interdependence — con người là sinh vật gắn bó, và dựa vào nhau là sức mạnh, không phải yếu đuối (khớp attachment và differentiation ở các mục khác). 'Codependence' là một khái niệm phổ biến trong văn hóa self-help nhưng có nền học thuật YẾU và định nghĩa lỏng lẻo — nên dùng nó như một mô tả gợi ý, không phải chẩn đoán. Dấu hiệu đáng chú ý của mẫu hình bất lành mạnh: giá trị bản thân phụ thuộc hoàn toàn vào việc được cần đến; không thể nói không; 'cứu' người khác một cách kinh niên trong khi bỏ bê nhu cầu của mình; lẫn lộn giữa yêu thương và kiểm soát/hy sinh. Phân biệt với chăm sóc lành mạnh: chăm sóc lành mạnh có ranh giới, không đòi hỏi mình phải cạn kiệt, và không cần người kia mãi 'có vấn đề' để mình có vai trò.",
    theory: "Lý thuyết interdependence; khái niệm codependence (nguồn gốc từ phong trào cai nghiện, nền học thuật hạn chế); differentiation (Bowen).",
    controversy: "'Codependence' thiếu định nghĩa nhất quán và bằng chứng thực nghiệm chặt; dễ bị lạm dụng để bệnh lý hóa lòng tốt/sự quan tâm bình thường (đặc biệt phán xét phụ nữ chăm sóc). Dùng thận trọng.",
    application: [
      { domain: "Mục tiêu là interdependence", text: "Không nhắm độc lập tối đa (dựa vào nhau là sức mạnh) cũng không hòa tan bản thân — giữ được cả kết nối sâu lẫn bản sắc riêng." },
      { domain: "Dấu hiệu tự kiểm", text: "Để ý nếu giá trị bản thân phụ thuộc hoàn toàn vào việc được cần đến, nếu bạn không thể nói không, hay nếu bạn kinh niên 'cứu' người khác trong khi bỏ bê chính mình." },
      { domain: "Chăm sóc lành mạnh", text: "Chăm sóc lành mạnh có ranh giới, không đòi bạn phải cạn kiệt, và không cần người kia mãi 'có vấn đề' để bạn có vai trò — phân biệt yêu thương với kiểm soát/hy sinh." },
      { domain: "Thận trọng với nhãn", text: "Đừng vội tự dán nhãn 'đồng phụ thuộc' (khái niệm nền học thuật yếu); dùng nó như gợi ý để tự phản tư, không phải chẩn đoán — nếu ảnh hưởng chức năng, gặp chuyên gia." },
    ],
  }
);

/* Trụ 06 — thêm vào nhóm "Vốn xã hội & sự thuộc về" (groups[0]) */
REMAINING_PILLARS[2].groups[0].sections.push(
  {
    heading: "Collective effervescence & nghi thức tập thể",
    evidence: "moderate",
    mechanism: "'Collective effervescence' (Durkheim) là trạng thái năng lượng và sự hòa làm một nảy sinh khi con người cùng làm một việc đồng bộ trong một nhóm — hát cùng, nhảy cùng, cổ vũ cùng, hành lễ cùng. Nó tạo cảm giác vượt lên bản thân và gắn kết nhóm mạnh mẽ.",
    expertNote: "Cơ chế đề xuất gồm đồng bộ hóa (synchrony — cử động/nhịp cùng nhau làm mờ ranh giới ta–người khác và tăng hợp tác, tin tưởng, thậm chí ngưỡng chịu đau qua endorphin) và sự chú ý chung. Đây là 'chất dinh dưỡng xã hội' mà đời sống hiện đại (làm việc từ xa, giải trí cá nhân hóa) cung cấp ngày càng ít, góp phần vào cảm giác cô lập và thiếu thuộc về dù vẫn 'kết nối' online. Các nguồn tiếp cận được: hòa nhạc/liveshow, thể thao đồng đội hoặc cổ vũ, lớp nhảy/hát tập thể, lễ hội, nghi lễ tôn giáo, chạy nhóm, thậm chí hát karaoke cùng bạn bè. Trải nghiệm này khác về chất với tương tác một-đối-một và không thay thế được bằng nội dung online. Nó cũng là nền của 'identity fusion' (hòa nhập bản sắc) — mạnh mẽ cho gắn kết nhưng cũng cần ý thức về mặt tối (cuồng nhiệt nhóm).",
    theory: "Durkheim (collective effervescence); nghiên cứu synchrony & bonding (Cohen, Tarr); identity fusion (Whitehouse).",
    controversy: "Khó đo trong phòng thí nghiệm; nhiều bằng chứng gián tiếp/tương quan. Cùng cơ chế gắn kết cũng có thể phục vụ cuồng nhiệt nhóm/thao túng đám đông.",
    application: [
      { domain: "Chủ đích tìm trải nghiệm đồng bộ", text: "Lên lịch định kỳ các hoạt động 'làm cùng nhau đồng bộ': hòa nhạc, chạy nhóm, lớp nhảy/hát, cổ vũ thể thao, lễ hội — 'chất dinh dưỡng xã hội' mà đời số hóa thiếu." },
      { domain: "Không thay bằng online", text: "Trải nghiệm tập thể trực tiếp khác về chất với xem/nghe một mình qua màn hình — ưu tiên có mặt thật sự, không chỉ 'tham gia' từ xa." },
      { domain: "Ghép với mục tiêu", text: "Chạy nhóm (thể chất + effervescence + cộng đồng), hợp xướng/lớp nhảy (kỹ năng + đồng bộ) — một hoạt động nhiều đích, hợp lịch bận." },
      { domain: "Ý thức mặt tối", text: "Tận hưởng sức mạnh gắn kết của nghi thức tập thể nhưng giữ tư duy độc lập — cùng cơ chế tạo thuộc về cũng có thể nuôi cuồng nhiệt nhóm." },
    ],
  },
  {
    heading: "Có đi có lại (reciprocity) & 'ngân hàng' thiện chí cộng đồng",
    evidence: "strong",
    mechanism: "Quy tắc 'có đi có lại' (reciprocity) là một trong các chuẩn mực xã hội phổ quát và mạnh nhất: khi ai đó làm điều tốt cho ta, ta cảm thấy thôi thúc đáp lại. Đây là nền của hợp tác, xây quan hệ và vốn xã hội — cho đi trước tạo ra một 'ngân hàng' thiện chí.",
    expertNote: "Phân biệt reciprocity 'trực tiếp' (A giúp B, B giúp lại A) với 'gián tiếp/tổng quát' (generalized — A giúp B, B giúp C, thiện chí lan trong mạng lưới và cuối cùng quay lại) — cộng đồng vốn xã hội cao chạy trên reciprocity tổng quát và 'lòng tin tổng quát'. Grant ('Give and Take'): 'givers' (cho đi không tính toán đối ứng ngay) xây mạng lưới và uy tín bền nhất VỀ DÀI HẠN, dù cần tránh bẫy kiệt sức (givers thiếu ranh giới dễ bị khai thác — 'otherish givers' vừa hào phóng vừa giữ lợi ích mình thì bền nhất). Reciprocity cũng có mặt bị lạm dụng: kỹ thuật thuyết phục khai thác nó (tặng quà nhỏ để tạo nghĩa vụ) — nên ý thức khi nào 'nợ' là thật và khi nào bị thao túng. Trong cộng đồng, người đóng góp vào 'ngân hàng thiện chí chung' (không chỉ rút ra) nâng vốn xã hội cho tất cả.",
    theory: "Cialdini (reciprocity); Putnam (generalized reciprocity & social capital); Grant (givers/takers/matchers, otherish giving).",
    controversy: "Reciprocity mạnh nhưng cường độ khác nhau theo văn hóa; đo 'lòng tin tổng quát' phụ thuộc khảo sát. Cho đi thiếu ranh giới có chi phí thật.",
    application: [
      { domain: "Cho trước, không tính đối ứng", text: "Chủ động giúp/giới thiệu/chia sẻ hữu ích mà không đòi đáp lại ngay — 'givers' xây uy tín và mạng lưới bền nhất dài hạn, và tạo 'ngân hàng thiện chí'." },
      { domain: "Otherish, không kiệt sức", text: "Hào phóng nhưng vẫn giữ ranh giới và lợi ích của mình ('otherish giving') — givers thiếu ranh giới dễ bị khai thác và kiệt sức." },
      { domain: "Reciprocity tổng quát", text: "Đóng góp vào cộng đồng ngay cả khi người nhận không thể đáp lại trực tiếp — thiện chí lan trong mạng lưới và nâng vốn xã hội chung." },
      { domain: "Nhận diện thao túng", text: "Ý thức khi một 'món quà/ưu ái' được dùng để tạo nghĩa vụ và thao túng bạn — reciprocity là bản năng mạnh, đôi khi bị khai thác." },
    ],
  },
  {
    heading: "Bám rễ nơi chốn & thuộc về một địa phương",
    evidence: "moderate",
    mechanism: "'Place attachment' (gắn bó nơi chốn) — mối liên hệ cảm xúc với một địa điểm và cộng đồng của nó — góp phần vào bản sắc, cảm giác an toàn, ý nghĩa và sức khỏe tâm lý. Nó xây qua thời gian, ký ức, quan hệ, và sự quen thuộc với một nơi.",
    expertNote: "Trong thời đại di động cao và đô thị hóa nhanh, nhiều người sống ở một nơi mà không thực sự 'thuộc về' nó — thiếu bám rễ liên hệ với cảm giác vô danh và cô lập. Place attachment có hai thành phần (Scannell & Gifford): 'place identity' (nơi chốn thành một phần của mình mình là ai) và 'place dependence' (nơi đáp ứng nhu cầu/mục tiêu). Bám rễ không đòi hỏi sống một chỗ cả đời — nó xây qua sự tham gia có chủ đích: biết hàng xóm, ủng hộ hàng quán địa phương, tham gia hoạt động khu phố, biết lịch sử và nhịp sống của nơi mình ở, có 'những nơi của riêng mình'. Điều này đặc biệt đáng chú ý cho người trẻ đô thị hay chuyển chỗ ở: một chút đầu tư vào bám rễ đổi lại cảm giác thuộc về và an toàn nền tảng. Nó cũng bổ trợ cho 'third places' và vốn xã hội địa phương.",
    theory: "Scannell & Gifford (place attachment framework); nghiên cứu rootedness, mobility & wellbeing.",
    controversy: "Chủ yếu tương quan; khó tách khỏi thời gian cư trú và yếu tố kinh tế. Bám rễ quá mức cũng có thể cản cơ hội (không dám rời đi) — cân bằng với optionality.",
    application: [
      { domain: "Đầu tư vào nơi mình sống", text: "Biết hàng xóm, ủng hộ hàng quán địa phương quen, tham gia hoạt động khu phố — bám rễ xây qua tham gia có chủ đích, không cần sống một chỗ cả đời." },
      { domain: "Tạo 'những nơi của mình'", text: "Có vài địa điểm quen thuộc mang ý nghĩa cá nhân (quán, công viên, đường đi bộ) — chúng neo cảm giác thuộc về và an toàn nền tảng." },
      { domain: "Cho người hay chuyển chỗ", text: "Nếu hay đổi nơi ở, chủ đích xây bám rễ nhanh ở nơi mới (khám phá, kết nối địa phương) thay vì sống như người quá cảnh — giảm cảm giác vô danh/cô lập." },
      { domain: "Cân bằng với optionality", text: "Bám rễ cho thuộc về, nhưng đừng để nó thành lý do không dám nắm cơ hội đáng giá ở nơi khác — giữ cân bằng với sự linh hoạt." },
    ],
  }
);

/* Trụ 07 — thêm sections vào các nhóm sẵn có */
ENJOYMENT_PILLAR.groups[0].sections.push(
  {
    heading: "Hoài niệm (nostalgia): nỗi buồn ngọt ngào có ý nghĩa",
    evidence: "moderate",
    mechanism: "Hoài niệm — cảm xúc bittersweet khi nhớ về quá khứ ý nghĩa — từng bị coi là bệnh lý nhưng nghiên cứu hiện đại cho thấy nó chủ yếu có chức năng tích cực: tăng cảm giác ý nghĩa, kết nối xã hội, tính liên tục của bản sắc, và thậm chí cảm giác ấm áp về thể chất.",
    expertNote: "Sedikides & Wildschut: hoài niệm thường được kích hoạt bởi tâm trạng tiêu cực/cô đơn và hoạt động như một cơ chế điều hòa — nó 'kéo' các ký ức về kết nối và ý nghĩa vào hiện tại, chống lại sự trống rỗng. Nó khác 'sống trong quá khứ' (rumination hoài cổ bế tắc): hoài niệm lành mạnh mang tính bittersweet — thừa nhận cả mất mát lẫn sự trân quý, và thường củng cố động lực hướng tới tương lai (vì nhắc ta điều gì đáng giá). Đây là ví dụ cho giá trị của cảm xúc 'tiêu cực đẹp' (nối với emodiversity và amor fati): nỗi buồn ngọt ngào không phải thứ cần tránh mà là một phần của đời sống cảm xúc phong phú. 'Anemoia' và các dạng hoài niệm cũng nuôi sáng tạo và sự trân trọng.",
    theory: "Sedikides & Wildschut (nostalgia research); nghiên cứu bittersweet & meaning (khác nostalgia bệnh lý cổ điển).",
    controversy: "Hoài niệm quá mức/né tránh hiện tại có thể bất lành; ranh giới giữa hoài niệm phục hồi và trốn vào quá khứ phụ thuộc bối cảnh. Nghiên cứu phần lớn trong phòng thí nghiệm.",
    application: [
      { domain: "Dùng hoài niệm có chủ đích", text: "Khi thấy cô đơn/trống rỗng, chủ động gợi ký ức ý nghĩa (ảnh cũ, nhạc, kể chuyện) — hoài niệm kéo cảm giác kết nối và ý nghĩa vào hiện tại." },
      { domain: "Trân quý cái bittersweet", text: "Cho phép nỗi buồn ngọt ngào tồn tại — nó thừa nhận cả mất mát lẫn giá trị, và là một phần của đời sống cảm xúc phong phú, không phải thứ cần dập." },
      { domain: "Hướng tới, không mắc kẹt", text: "Dùng hoài niệm để nhắc điều gì ĐÁNG GIÁ rồi mang nó vào tương lai — khác 'sống trong quá khứ' bế tắc; nếu thấy né tránh hiện tại thì đó là dấu hiệu mất cân bằng." },
    ],
  },
  {
    heading: "Tò mò & sự ngạc nhiên như thực hành hằng ngày",
    evidence: "moderate",
    mechanism: "Tò mò — thôi thúc tìm kiếm cái mới và lấp khoảng trống hiểu biết — liên hệ với wellbeing, học tập, sự sống động và quan hệ tốt hơn. Nó có nền thần kinh ở hệ phần thưởng (khoảng trống thông tin tạo một dạng 'ngứa' dễ chịu khi được lấp).",
    expertNote: "Kashdan phân biệt các dạng tò mò, trong đó 'joyous exploration' (khám phá vui thích) và 'stretching' (vươn tới cái mới) tương quan mạnh nhất với wellbeing. Điểm expert: tò mò là thứ có thể NUÔI như một thái độ hằng ngày, không chỉ một nét tính cách cố định — 'curiosity as a practice'. Nó cũng là một liều giải độc cho sự nhàm chán và tự động hóa (đời sống 'chạy trên autopilot' làm mờ trải nghiệm). Tò mò về NGƯỜI KHÁC (đặt câu hỏi thật, muốn hiểu) là một trong các đòn bẩy quan hệ mạnh và ít tốn nhất — nó làm người kia cảm thấy được quan tâm và làm chính bạn thấy người khác thú vị hơn. Tò mò còn là 'liều gan' cho học tập suốt đời và openness (nối trụ 03): nó biến việc học từ nghĩa vụ thành ham muốn.",
    theory: "Kashdan (curiosity dimensions); Loewenstein (information gap theory); Berlyne (novelty & arousal).",
    controversy: "Đo tò mò dựa tự báo cáo; nhân quả với wellbeing hai chiều (người khỏe mạnh tò mò hơn). Tò mò lành mạnh khác 'lăng xăng' phân tán.",
    application: [
      { domain: "Nuôi như thói quen", text: "Chủ đích đặt câu hỏi và tìm hiểu cái mới mỗi ngày (một chủ đề, một góc nhìn, một chi tiết chưa để ý) — tò mò là thái độ nuôi được, giải độc cho sự nhàm chán và 'autopilot'." },
      { domain: "Tò mò về người khác", text: "Đặt câu hỏi thật và muốn hiểu người đối diện — một trong các đòn bẩy quan hệ mạnh và ít tốn nhất, làm họ thấy được quan tâm và bạn thấy họ thú vị hơn." },
      { domain: "Biến học thành ham muốn", text: "Tiếp cận việc học (CBAP, ngôn ngữ) qua khoảng trống tò mò ('mình muốn biết vì sao...') thay vì nghĩa vụ — tò mò biến học từ ép buộc thành lôi cuốn." },
      { domain: "Chống tự động hóa", text: "Với việc quen thuộc, thỉnh thoảng hỏi 'có cách nào khác/điều gì mình chưa để ý?' — tò mò làm sống lại trải nghiệm bị nhàm hóa." },
    ],
  }
);
ENJOYMENT_PILLAR.groups[2].sections.push(
  {
    heading: "Khoái cảm thân thể & niềm vui giác quan",
    evidence: "moderate",
    mechanism: "Niềm vui thể chất trực tiếp — hơi ấm, đụng chạm dễ chịu, vận động khoan khoái, vị ngon, tắm nước ấm, nắng nhẹ, âm nhạc chạm cơ thể — là một nguồn wellbeing nền tảng, tức thời và ít bị 'quen nhàm' hơn nhiều loại khoái cảm khác (nhất là khi được chú ý).",
    expertNote: "Đây là đối trọng cho một khung nghiêng nặng về nhận thức/tối ưu: con người là sinh vật có THÂN THỂ, và nhiều wellbeing đến qua cơ thể chứ không qua đầu. 'Savoring' cơ thể (chú ý trọn vẹn tới cảm giác dễ chịu) khuếch đại nó. Đụng chạm dễ chịu (an toàn, được đồng thuận) kích hoạt hệ thần kinh C-tactile và giải phóng oxytocin, hạ cortisol — con người có nhu cầu chạm (touch hunger) thường bị bỏ đói ở đời sống hiện đại, đặc biệt người sống một mình. Vận động vì NIỀM VUI (nhảy, bơi, đi bộ trong thiên nhiên) khác vận động như nghĩa vụ tập luyện — nó là khoái cảm thể hiện (embodied joy), không chỉ phương tiện đạt mục tiêu sức khỏe. Warmth (cả nghĩa đen — hơi ấm — lẫn nghĩa xã hội) có liên hệ tâm lý sâu. Đây là những niềm vui rẻ, sẵn có, và bị đánh giá thấp vì chúng 'tầm thường'.",
    theory: "Nghiên cứu C-tactile afferents & affective touch (McGlone); embodied cognition; savoring (Bryant); touch & oxytocin.",
    controversy: "Nhiều nghiên cứu cơ chế nhỏ/sơ khởi; 'touch hunger' là khái niệm phổ biến hơn là được đo lường chặt. Chuẩn mực về đụng chạm rất khác theo văn hóa.",
    application: [
      { domain: "Savoring cơ thể", text: "Chú ý trọn vẹn tới các khoái cảm thể chất nhỏ (hơi ấm tách trà, nắng sáng, nước ấm, cơ thể sau vận động) — chú ý khuếch đại chúng, và chúng ít 'quen nhàm' hơn." },
      { domain: "Vận động vì niềm vui", text: "Thêm vận động làm-vì-thích (nhảy, bơi, đi bộ thiên nhiên) bên cạnh tập-vì-mục-tiêu — khoái cảm thể hiện là wellbeing tức thời, không chỉ phương tiện." },
      { domain: "Không bỏ đói nhu cầu chạm", text: "Đụng chạm an toàn, được đồng thuận (ôm người thân, thú cưng, massage) hạ cortisol và giải phóng oxytocin — 'touch hunger' hay bị bỏ quên, nhất là khi sống một mình." },
      { domain: "Trân trọng niềm vui 'tầm thường'", text: "Những khoái cảm giác quan rẻ và sẵn có bị đánh giá thấp vì quá đỗi bình thường — chúng là nền wellbeing cho một sinh vật có thân thể, đừng chỉ sống 'trong đầu'." },
    ],
  }
);

/* EXTRAS overlay cho các section mới của đợt đào sâu 5/6/7 */
Object.assign(EXTRAS, {
  "Lòng tin: xây, phá & tái thiết sau phản bội": {
    pitfalls: [
      "Nhầm tái thiết niềm tin với 'quay lại như cũ' — nó là xây cấu trúc mới trên hành vi nhất quán theo thời gian.",
      "Người vi phạm phòng thủ/chỉ nói 'xin lỗi' mà không chứng tỏ hiểu tác động — niềm tin không tái lập bằng lời hứa.",
      "Để áp lực 'phải cho cơ hội' vượt qua an toàn trong quan hệ lạm dụng lặp lại.",
    ],
    micro: [
      "Giữ một lời hứa nhỏ hôm nay đúng như đã nói — niềm tin xây từ vô số hành động nhất quán, không từ khoảnh khắc lớn.",
    ],
  },
  "Lao động cảm xúc & sự công bằng vô hình trong quan hệ": {
    pitfalls: [
      "Chỉ chia việc tay chân mà bỏ qua tải NHẬN THỨC (nhớ, lên kế hoạch, điều phối) — phần vô hình này rơi lệch và gây kiệt sức/oán giận ngầm.",
      "Một người 'chủ' rồi người kia 'giúp' — 'giúp' vẫn để lại toàn bộ tải điều phối cho một phía.",
      "Nhắm chia 50/50 cứng thay vì công bằng cảm nhận theo nguồn lực từng người.",
    ],
    micro: [
      "Viết ra một 'việc vô hình' bạn đang gánh mà chưa ai đặt tên (nhớ lịch, điều phối họ hàng) — đặt tên là bước đầu để bàn được.",
    ],
  },
  "Phụ thuộc lành mạnh vs đồng phụ thuộc (interdependence)": {
    pitfalls: [
      "Nhắm độc lập tối đa (huyền thoại văn hóa) — dựa vào nhau là sức mạnh, không phải yếu đuối.",
      "Để giá trị bản thân phụ thuộc hoàn toàn vào việc được cần đến / kinh niên 'cứu' người khác mà bỏ bê mình.",
      "Vội tự dán nhãn 'đồng phụ thuộc' — khái niệm nền học thuật yếu; dùng để tự phản tư, không phải chẩn đoán.",
    ],
    micro: [
      "Tự hỏi một câu: 'mình đang chăm sóc có ranh giới, hay đang hòa tan bản thân?' — chăm sóc lành mạnh không đòi bạn cạn kiệt.",
    ],
  },
  "Collective effervescence & nghi thức tập thể": {
    pitfalls: [
      "Thay trải nghiệm tập thể trực tiếp bằng xem/nghe một mình qua màn hình — khác về chất, thiếu đồng bộ và chú ý chung.",
      "Bỏ quên 'chất dinh dưỡng xã hội' này vì đời số hóa — góp phần cảm giác cô lập dù vẫn 'kết nối' online.",
    ],
    micro: [
      "Đăng ký một hoạt động 'làm cùng nhau đồng bộ' tuần này (chạy nhóm, lớp nhảy/hát, liveshow) — đồng bộ giải phóng endorphin và gắn kết.",
    ],
  },
  "Có đi có lại (reciprocity) & 'ngân hàng' thiện chí cộng đồng": {
    pitfalls: [
      "Cho đi thiếu ranh giới tới kiệt sức — 'otherish giving' (hào phóng mà vẫn giữ lợi ích mình) bền hơn.",
      "Không nhận ra khi một 'món quà/ưu ái' được dùng để tạo nghĩa vụ và thao túng mình.",
      "Chỉ rút ra khỏi cộng đồng mà không đóng góp — vốn xã hội chung cạn dần.",
    ],
    micro: [
      "Làm một việc tốt nhỏ cho ai đó mà không mong đáp lại hôm nay — gieo vào 'ngân hàng thiện chí'; givers xây mạng bền nhất.",
    ],
  },
  "Bám rễ nơi chốn & thuộc về một địa phương": {
    pitfalls: [
      "Sống ở một nơi như người quá cảnh (không biết hàng xóm, không tham gia) — thiếu bám rễ nuôi cảm giác vô danh/cô lập.",
      "Bám rễ quá mức thành lý do không dám nắm cơ hội đáng giá ở nơi khác — cân bằng với linh hoạt.",
    ],
    micro: [
      "Ghé và làm quen một hàng quán/không gian địa phương gần nhà, thành 'nơi quen' — bám rễ xây từ những nơi nhỏ của riêng mình.",
    ],
  },
  "Hoài niệm (nostalgia): nỗi buồn ngọt ngào có ý nghĩa": {
    pitfalls: [
      "Nhầm hoài niệm phục hồi với 'sống trong quá khứ' bế tắc — cái sau né tránh hiện tại, cái trước tiếp năng lượng cho tương lai.",
      "Cố dập nỗi buồn ngọt ngào vì nghĩ 'cảm xúc tiêu cực là xấu' — nó là phần của đời sống cảm xúc phong phú.",
    ],
    micro: [
      "Khi cô đơn/trống rỗng, mở một tấm ảnh cũ hoặc bản nhạc gắn ký ức ý nghĩa — hoài niệm kéo kết nối và ý nghĩa vào hiện tại.",
    ],
  },
  "Tò mò & sự ngạc nhiên như thực hành hằng ngày": {
    pitfalls: [
      "Để đời chạy trên 'autopilot' làm mờ trải nghiệm — thiếu tò mò khiến mọi thứ nhàm và tự động.",
      "Nhầm tò mò lành mạnh với 'lăng xăng' phân tán không đi tới đâu.",
    ],
    micro: [
      "Đặt một câu hỏi thật cho người bạn trò chuyện hôm nay và thực sự muốn nghe câu trả lời — đòn bẩy quan hệ mạnh, gần như 0 chi phí.",
    ],
  },
  "Khoái cảm thân thể & niềm vui giác quan": {
    pitfalls: [
      "Sống hoàn toàn 'trong đầu' (nhận thức/tối ưu) mà bỏ quên cơ thể — nhiều wellbeing đến qua thân thể, không qua tư duy.",
      "Bỏ đói nhu cầu chạm (touch hunger), nhất là khi sống một mình — đụng chạm an toàn hạ cortisol, giải phóng oxytocin.",
    ],
    micro: [
      "Dừng 20 giây tận hưởng trọn vẹn một khoái cảm thể chất nhỏ hôm nay (hơi ấm, nắng, nước ấm, cơ thể sau vận động) — rẻ, sẵn có, ít 'quen nhàm'.",
    ],
  },
});

/* Assemble */
PILLARS.push(IDENTITY_PILLAR, ...REMAINING_PILLARS, ENJOYMENT_PILLAR, MEANING_PILLAR);

/* Merge overlay (pitfalls + micro) into sections by heading,
   rồi SẮP XẾP mỗi nhóm theo độ mạnh bằng chứng: mạnh → vừa → tranh cãi */
const EV_RANK = { strong: 0, moderate: 1, contested: 2 };
PILLARS.forEach((p) => {
  p.groups.forEach((g) => {
    g.sections.forEach((s) => {
      const extra = EXTRAS[s.heading];
      if (extra) {
        s.pitfalls = extra.pitfalls;
        s.micro = extra.micro;
      }
    });
    g.sections.sort((a, b) => EV_RANK[a.evidence] - EV_RANK[b.evidence]);
  });
});

/* Sắp xếp Actionable theo đòn bẩy: cao → vừa → thấp */
const LEV_RANK = { high: 0, moderate: 1, low: 2 };

/* ---------------------------------------------------------------
   ACTIONABLE PRACTICES (mở rộng, đa khía cạnh)
--------------------------------------------------------------- */
const PRACTICES = [
  { pillar: "Thể chất", leverage: "high", text: "Kháng lực ≥2 buổi/tuần, tải trục dọc, progressive overload có log", why: "Tập tạ kích hoạt tín hiệu xây cơ (mTOR) và, qua lực tải lên xương, kích thích tăng mật độ xương (Wolff's Law). Đây là 'khoản gửi tiết kiệm' cho tuổi già: khối cơ và xương xây ở tuổi 30 quyết định khoảng cách tới ngưỡng gãy xương/mất chức năng hàng chục năm sau — đặc biệt quan trọng với phụ nữ vì estrogen sụt quanh mãn kinh làm mất xương nhanh. Ghi log tải (kg×reps×sets) để đảm bảo tăng tải dần, vì tiến bộ đến từ overload có kiểm soát chứ không từ cảm giác 'đã mệt'. Ưu tiên bài trục dọc (squat, deadlift, overhead press) nhắm cột sống và cổ xương đùi." },
  { pillar: "Thể chất", leverage: "high", text: "Zone 2 45–90 phút × 3–4/tuần (mô hình polarized 80/20)", why: "Zone 2 (cường độ còn nói được trọn câu nhưng hơi hụt hơi) là vùng xây nền thể lực tim-phổi tốt nhất mà không tích mệt mỏi thần kinh trung ương. Nó nâng VO2max — một trong những chỉ số dự báo tử vong mọi nguyên nhân mạnh nhất — qua cải thiện thể tích tống máu và mật độ ty thể. Mô hình polarized (80% nhẹ Zone 2 + 20% rất nặng, tránh vùng giữa) hiệu quả hơn tập đều đều cường độ trung bình. Với nền chạy bộ sẵn có: chuyển phần lớn km sang chạy chậm, giữ tốc độ cao cho một buổi/tuần — nghịch lý 'chạy chậm nhiều hơn để chạy nhanh hơn'." },
  { pillar: "Thể chất", leverage: "high", text: "Protein 1.6–2.2g/kg, phân bổ đều ~0.24–0.4g/kg mỗi bữa (3 bữa)", why: "Cơ chỉ được kích hoạt tối đa để xây/sửa khi mỗi bữa đạt 'ngưỡng leucine', và sau mỗi liều đạm cơ tạm 'trơ' vài giờ (refractory period). Nên rải đều đạm 3 bữa hiệu quả hơn dồn vào bữa tối. Bữa sáng kiểu Việt thường thiếu đạm nhất — thêm trứng/sữa chua Hy Lạp/đậu để đạt ngưỡng ngay đầu ngày. Với người ~55kg, nhắm khoảng ~22g đạm mỗi bữa chính; nhu cầu này tăng dần theo tuổi vì cơ giảm nhạy với đạm (anabolic resistance)." },
  { pillar: "Thể chất", leverage: "high", text: "Cố định giờ THỨC + ánh sáng sáng sớm + cắt caffeine ~8–10h trước ngủ", why: "Giờ thức khó dời hơn giờ ngủ, nên cố định nó trước rồi để ánh sáng buổi sáng neo đồng hồ sinh học — ánh sáng ngoài trời (kể cả ngày râm) mạnh hơn đèn trong nhà hàng chục lần và là tín hiệu mạnh hơn melatonin nhiều. Caffeine chặn adenosine (chất tạo áp lực buồn ngủ) với nửa đời ~5–6h, nên cà phê chiều còn tồn tới đêm và phá giấc sâu mà bạn không nhận ra. Đây là hai đòn bẩy giấc ngủ bị đánh giá thấp nhất. Tránh 'social jetlag' (ngủ bù lệch nhiều giờ cuối tuần) vì nó phá nhịp còn hại hơn thiếu ngủ đều." },
  { pillar: "Thể chất", leverage: "moderate", text: "Restoration break ngoài trời sau phiên deep-work", why: "Chú ý có chủ đích là nguồn hữu hạn, cạn dần qua tập trung liên tục; môi trường tự nhiên phục hồi nó qua 'thu hút không nỗ lực' (Attention Restoration Theory). Một quãng đi bộ công viên 15–20 phút không điện thoại phục hồi hơn nhiều so với lướt mạng — vốn tiêu thêm chú ý chứ không nạp lại. Đi bộ ngoài trời còn tăng tư duy phân kỳ, nên dùng nó để gỡ bí/brainstorm chứ không chỉ để 'nghỉ'. Ghép với ánh sáng ngoài trời thì được cả phục hồi chú ý lẫn neo nhịp sinh học." },
  { pillar: "Thể chất", leverage: "moderate", text: "Không chất chống oxy hóa liều cao ±3h quanh tập; tránh tắm lạnh ngay sau kháng lực", why: "Vận động tạo ra một lượng nhỏ 'gốc tự do' (ROS) chính là tín hiệu để cơ thể tự bật hệ phòng vệ và thích nghi mạnh lên (mitohormesis). Uống vitamin C/E liều cao hay tắm lạnh ngay sau buổi tạ sẽ dập chính tín hiệu viêm/thích nghi mà bạn vừa tạo ra, làm giảm hiệu quả xây cơ. Hãy lấy chất chống oxy hóa từ thực phẩm ở bữa xa giờ tập. Để dành tắm lạnh cho ngày nghỉ hoặc sau cardio nếu bạn thích, đừng dùng ngay sau kháng lực khi mục tiêu là tăng cơ." },
  { pillar: "Thể chất", leverage: "moderate", text: "Yêu cầu panel nâng cao khi khám: ApoB, hs-CRP, insulin đói, Lp(a) một lần", why: "Gói khám sức khỏe chuẩn ở Việt Nam thường bỏ sót các chỉ số phát hiện rủi ro sớm nhất. ApoB đếm trực tiếp số hạt mỡ gây xơ vữa (chính xác hơn LDL), hs-CRP đo viêm âm ỉ, insulin đói bắt kháng insulin trước khi đường huyết tăng, và Lp(a) — chủ yếu do gen — chỉ cần đo một lần trong đời. Một điểm dữ liệu ít nghĩa; giá trị nằm ở việc lập bảng theo năm để thấy QUỸ ĐẠO. Dùng số liệu để thảo luận với bác sĩ và điều chỉnh lối sống, không tự chẩn đoán." },

  { pillar: "Tinh thần", leverage: "high", text: "Affect labeling + reappraisal, tránh suppression", why: "Gọi tên cảm xúc thành lời ('mình đang lo vì X') tương quan với giảm cường độ cảm xúc ngay tức thì, mà không tốn kém như việc cố nén (suppression) — vốn tăng kích thích giao cảm và làm giảm cả trí nhớ lẫn chất lượng kết nối. Tái đánh giá TRƯỚC một sự kiện (diễn giải hồi hộp là 'cơ thể đang sẵn sàng' thay vì 'sắp thất bại') rẻ hơn và hiệu quả hơn xử lý cảm xúc SAU khi đã bùng. Đây là bộ đôi điều hòa cảm xúc mạnh nhất và gần như miễn phí. Đặc biệt tránh suppression trong xung đột thân mật vì nó làm mờ cả ký ức về cuộc trò chuyện." },
  { pillar: "Tinh thần", leverage: "high", text: "Dashboard tuần (HRV/ngủ/ốm vặt/năng lượng) + thiết kế recovery chủ đích", why: "Stress không xấu tự thân — vấn đề là thiếu phục hồi; cơ thể tích lũy 'hao mòn' (allostatic load) âm thầm ngay cả khi từng chỉ số đơn lẻ vẫn 'bình thường'. Theo dõi vài chỉ số đơn giản mỗi tuần (HRV, chất lượng ngủ, ốm vặt, năng lượng 1–5) cho tín hiệu sớm để giảm tải TRƯỚC khi kiệt sức. Quan trọng: phục hồi thật cần thực sự NGẮT khỏi công việc trong đầu (psychological detachment), không chỉ rời bàn làm việc. Với lịch đa nhiệm (BA + CBAP + đầu tư + ngôn ngữ), dùng cụm chỉ số này để chủ động cắt bớt một mảng khi chúng xấu đi, thay vì ép tới sập." },
  { pillar: "Tinh thần", leverage: "high", text: "Test 5 phút rumination; worry time; ngắt vòng bằng đổi ngữ cảnh", why: "Nhai lại (rumination) và xử lý sâu có cảm giác chủ quan giống nhau nhưng khác hẳn: nếu sau 5 phút suy nghĩ chưa ra insight hay bước hành động nào thì khả năng cao là đang nhai lại — hãy chủ động ngắt. Đổi câu hỏi từ 'tại sao chuyện này xảy ra với mình' (nuôi nhai lại) sang 'mình làm gì tiếp' (hướng hành động). Hẹn một 'giờ lo' cố định 10–15 phút/ngày và hoãn mọi lo lắng ngoài khung đó vào ghi chú, để cắt lo lan man. Ngắt vòng bằng cơ thể — đứng dậy đổi phòng/rót nước — hiệu quả hơn cố 'nghĩ tích cực'." },
  { pillar: "Tinh thần", leverage: "moderate", text: "Self-compassion thay tự phê phán; kỹ năng distress tolerance (DBT/TIPP)", why: "Tự phê phán gay gắt để 'thúc đẩy bản thân' phần lớn mang màu xấu hổ và có xu hướng phản tác dụng — nó khiến ta che giấu và né tránh lỗi thay vì sửa. Self-compassion (nói với mình như với một người bạn đang khổ) không phải nuông chiều; bằng chứng cỡ vừa gợi ý nó giúp nhìn thẳng lỗi mà không sụp đổ bản sắc, nhờ đó nuôi trách nhiệm nhiều hơn. Khi cảm xúc dâng cấp tính, bộ kỹ năng TIPP của DBT (nước lạnh lên mặt, vận động mạnh, thở chậm, thư giãn cơ) hạ kích thích sinh lý nhanh. Đây là công cụ cho những lúc quá tải, không phải thay thế cho việc xử lý gốc rễ." },
  { pillar: "Tinh thần", leverage: "moderate", text: "Body scan ngắn luyện interoception; distanced self-talk khi rối", why: "Khả năng cảm nhận tín hiệu bên trong cơ thể (interoception) là nền của cả điều hòa cảm xúc lẫn trực giác; luyện nó bằng body scan ngắn 2–3 phút/ngày (quét cảm giác cơ thể không phán xét). Khi rối, tự nói với mình ở ngôi thứ ba ('Mây đang thấy quá tải, điều cần làm là...') tạo khoảng cách tâm lý và cải thiện quyết định dưới áp lực. Hai kỹ thuật này rẻ, nhanh, và củng cố lẫn nhau. Coi 'cảm giác ruột gan' là dữ liệu để đối chiếu, không phải mệnh lệnh phải tuân theo." },
  { pillar: "Tinh thần", leverage: "low", text: "TPCN 'adrenal support' / chẩn đoán tự-wellness", why: "'Adrenal fatigue' (mệt mỏi tuyến thượng thận) không được nội tiết học công nhận là chẩn đoán có cơ sở — rối loạn cortisol thật trong stress mạn tính là nhịp ngày bị làm phẳng, không phải 'tuyến cạn kiệt'. Ngành thực phẩm chức năng khai thác mạnh khái niệm này để bán 'adrenal support'. Nếu mệt mỏi kéo dài, đi khám thật (giáp, thiếu máu, tầm soát trầm cảm) thay vì tự mua sản phẩm. Đây là ví dụ để luyện kỹ năng lọc giả khoa học nói chung: cảnh giác thứ bán kèm chẩn đoán và giải thích 'một nguyên nhân cho mọi triệu chứng'." },

  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Retrieval + spacing + interleaving + generation cho CBAP/ngôn ngữ", why: "Tự nhớ lại/tự đố (retrieval) khắc sâu mạnh hơn đọc lại thụ động rất nhiều, dù đọc lại cho cảm giác 'trôi chảy' dễ chịu (illusion of fluency) — cảm giác dễ thường đi ngược ghi nhớ thật. Học giãn cách (spacing) và xen kẽ chủ đề (interleaving) khó hơn nhưng nhớ lâu hơn. Sau mỗi phần CBAP/từ vựng, gấp tài liệu và tự viết lại điều nhớ được trước khi xem (generation effect). Cảm giác 'khó/không trôi' khi tự đố chính là dấu hiệu đang học thật, không phải phương pháp sai — dùng Anki cho lặp lại giãn cách." },
  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Xây sổ mental models + tư duy xác suất/Bayesian trong decision journal", why: "Điểm IQ cốt lõi ở người trưởng thành khó tăng, nhưng 'thông minh thực tế' thì tăng được: đó là kho mental models (mô hình tư duy liên miền) và khả năng tư duy xác suất. Duy trì một sổ mô hình, mỗi mô hình kèm một ví dụ mình từng dùng, để biến kiến thức rời rạc thành mạng lưới truy xuất được. Trong decision journal, diễn đạt niềm tin bằng phần trăm và ghi xác suất dự đoán TRƯỚC kết quả, rồi đối chiếu định kỳ để hiệu chỉnh độ tự tin (calibration). Mục tiêu: khi bạn nói '70%' thì đúng khoảng 70% số lần — kỹ năng này cải thiện cả đầu tư lẫn mọi quyết định lớn." },
  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Pre-mortem + steelman + inversion trước quyết định lớn", why: "Biết về thiên kiến KHÔNG đủ để tránh chúng; can thiệp ở cấp quy trình mới hiệu quả. Pre-mortem — tưởng tượng 'một năm sau quyết định này đã thất bại, vì sao?' — ép não sinh ra góc phản chứng mà thiên kiến xác nhận vốn che đi. Steelman (dựng phiên bản mạnh nhất của quan điểm đối lập) trước khi kết luận, và inversion ('làm gì để chắc chắn thất bại rồi tránh') lộ ra rủi ro mà tư duy thuận bỏ sót. Áp trực tiếp cho luận điểm đầu tư và quyết định pivot: đưa các bước này thành checklist cố định." },
  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Rèn đồng cảm nhận thức + active constructive responding", why: "Đồng cảm nhận thức (hiểu người khác đang lo/muốn/sợ gì) luyện được và ít gây kiệt sức, khác đồng cảm cảm xúc (thấm cảm xúc của họ) dễ dẫn tới burnout. Trước cuộc họp/đàm phán khó, viết ra góc nhìn của bên kia — cải thiện kết quả rõ rệt. 'Active constructive responding' — phản ứng hào hứng, hỏi han khi người khác báo TIN VUI — dự báo chất lượng quan hệ mạnh hơn cả cách xử lý tin buồn, và là hành vi tần suất cao nên đòn bẩy quan hệ trên mỗi đơn vị nỗ lực rất cao. Kìm phản xạ 'vạch rủi ro' ngay khi ai đó khoe kế hoạch." },
  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Habit stacking + if-then + bright-line rules + commitment devices", why: "Ý chí dao động và không đáng tin để dựa vào dài hạn; thiết kế cue (tín hiệu) và môi trường bền hơn nhiều. Gắn thói quen mới vào việc đã làm hằng ngày ('sau khi pha cà phê → 10 phút tiếng Trung') và chuẩn bị if-then cho trở ngại ('nếu lỡ buổi sáng → bù 20 phút trưa'). Quy tắc tuyệt đối (bright-line: 'không mạng xã hội trước 12h trưa') dễ giữ hơn quy tắc mờ ('hạn chế') vì loại bỏ đàm phán nội tâm mỗi lần. Dùng commitment devices — tự động hóa, để điện thoại phòng khác, hứa công khai — để ràng buộc bản thân tương lai." },
  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Bảo vệ 1–2 khối deep-work/ngày; đơn nhiệm việc nặng; batch việc vụn", why: "Chú ý, không phải thời gian, mới là nguồn lực khan hiếm thật của công việc trí óc. Chuyển đổi qua lại giữa các việc để lại 'dư âm chú ý' (attention residue) làm giảm chất lượng, và đa nhiệm việc nặng là ảo tưởng — thực chất là chuyển đổi nhanh và tốn kém. Bảo vệ 1–2 khối thời gian không thông báo mỗi ngày cho việc phân tích nặng, đơn nhiệm chúng, và gom email/tin nhắn thành vài đợt (batch) cố định. 'Đóng vòng' một việc (ghi lại điểm dừng) trước khi chuyển sang việc khác để giảm dư âm kéo theo." },
  { pillar: "Bản sắc cá nhân", leverage: "moderate", text: "Hỏi 'cái gì' thay 'tại sao'; đối chiếu nội quan với dữ liệu + phản hồi 360", why: "Cảm giác 'chắc chắn biết lý do' hành vi của mình phần lớn không đáng tin — tâm trí hay 'bịa lý do' (introspection illusion). Hỏi 'tại sao mình thế này' nuôi sự bịa đặt đó; hỏi 'mình đang cảm gì / có lựa chọn nào' cho insight thật hơn. Hiểu bản thân qua nơi mình THỰC SỰ dành thời gian và tiền (xem lịch, sao kê), không chỉ qua điều mình NGHĨ mình ưu tiên. Bổ sung bằng phản hồi cụ thể từ vài người tin cậy để bù điểm mù nội quan." },
  { pillar: "Bản sắc cá nhân", leverage: "moderate", text: "Values card sort; viết lại câu chuyện đời theo redemptive + agency/communion", why: "Khi mông lung về quyết định lớn, tách hai khả năng: thiếu THÔNG TIN (thì research) hay thiếu rõ ràng GIÁ TRỊ nội tại (thì làm values card sort — sắp xếp giá trị theo ưu tiên buộc đánh đổi tường minh). Viết lại câu chuyện đời theo cấu trúc 'khó khăn → điều học được → con người trở thành' (redemptive) định hình hành vi tương lai thật, và dùng được cho CV/phỏng vấn khi pivot. Kiểm tra câu chuyện có cân bằng cả agency (làm chủ/thành tựu) lẫn communion (kết nối) không — lệch quá về thành tựu dễ dẫn tới trống rỗng dù thành công. Giữ một bản 'tuyên bố giá trị' để quay về khi thấy dao động theo ý người khác." },
  { pillar: "Bản sắc cá nhân", leverage: "moderate", text: "Ưu tiên trải nghiệm-kết nối + 'mua thời gian'; thiết kế peak-end", why: "Trải nghiệm (nhất là có kết nối) cho hạnh phúc bền hơn vật chất vì ít bị so sánh xã hội và được ký ức làm đẹp. Chi tiền để 'mua lại thời gian' (thuê/ủy thác việc mình ghét) tăng hạnh phúc hơn mua đồ, nhưng ít người làm vì thấy 'phí' — đây là đòn bẩy wellbeing bị bỏ quên. Với sự kiện quan trọng, đầu tư vào một khoảnh khắc ĐỈNH đáng nhớ và một phần KẾT đẹp (peak-end rule) hơn là kéo dài đều đều, vì ký ức được mã hóa theo đỉnh và kết. Nếu thu nhập tăng mà thấy nghèo thời gian, hãy bảo vệ khoảng trống không lịch trình như một khoản đầu tư." },
  { pillar: "Bản sắc cá nhân", leverage: "low", text: "Brain games / kỳ vọng far transfer / lợi thế nhận thức song ngữ", why: "Các game 'luyện não' cải thiện chính game đó (near transfer) nhưng gần như không nâng trí thông minh tổng quát hay kỹ năng đời thực (far transfer) — ngành này từng bị FTC phạt vì phóng đại. Tương tự, 'lợi thế nhận thức tổng quát của song ngữ' tái lập yếu, nên đừng dựa vào nó (giá trị giao tiếp/nghề của ngoại ngữ thì rõ ràng và đủ để học). Chuyển thời gian và tiền từ đây sang kỹ năng thật (ngôn ngữ để dùng, phân tích, kiến thức chuyên sâu). Bảo vệ tốc độ xử lý tuổi già hiệu quả hơn qua thể chất (ngủ, Zone 2, kiểm soát huyết áp/đường huyết) so với mọi app luyện não." },

  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Chấm lựa chọn theo autonomy–competence–relatedness; nội hóa động lực về 'identified'", why: "Động lực bền vững cần ba nhu cầu tâm lý: tự chủ (autonomy), cảm giác giỏi lên (competence), và kết nối (relatedness) — chất lượng động lực dự báo bền vững hơn lương. Khi cân nhắc pivot, chấm mỗi lựa chọn trên ba chiều này (1–5), không chỉ nhìn lương: vai trò lương cao nhưng bóp nghẹt tự chủ thường không bền. Với việc 'phải làm' như CBAP, tìm lý do bên trong ('kỹ năng này mở cửa pivot mình muốn' — identified) thay vì lý do sợ hãi ('sợ tụt hậu' — introjected), vì nội hóa sâu hơn giúp duy trì lâu. Ngay trong việc bị giao, tìm khoảng tự quyết (cách làm, thứ tự) — tự chủ là cảm giác đồng thuận, không cần tự do tuyệt đối." },
  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Xây skill stack hiếm ở giao điểm; định vị chống AI-disruption", why: "Đam mê thường PHÁT TRIỂN sau khi đạt năng lực cao, không phải điều kiện có trước — nên xây 'vốn nghề nghiệp' (kỹ năng hiếm và giá trị) là con đường thực tế hơn 'đi tìm đam mê'. Kết hợp vài kỹ năng ở mức khá tạo lợi thế hiếm ở giao điểm: BA + nền tài chính + hiểu thị trường VN + song ngữ là một tổ hợp khó sao chép, và pivot dựa vốn sẵn ít rủi ro hơn nhảy sang lĩnh vực trắng. Trong thời AI, hướng giá trị về phán đoán, tích hợp liên miền, và kỹ năng con người khó tự động hóa — dùng AI làm đòn bẩy thay vì cạnh tranh với nó ở việc nó giỏi. Đây là định vị chiến lược, không phải một khóa học đơn lẻ." },
  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Tự chấm 3 chiều Maslach hằng tháng; dò 6 mismatch; recovery 4 yếu tố", why: "Burnout gồm ba chiều — kiệt sức, hoài nghi/tách rời, giảm cảm giác hiệu quả — và hoài nghi thường tăng TRƯỚC kiệt sức, nên tự chấm mỗi tháng (1–5) cho tín hiệu giảm tải sớm. Burnout không chỉ do 'làm nhiều' mà do mất khớp ở sáu nguồn (quá tải, thiếu kiểm soát, thiếu công nhận, thiếu cộng đồng, bất công, xung đột giá trị) — hai cái sau đặc biệt độc, nên khi burnout hãy dò đúng nguồn thay vì chỉ 'làm ít lại'. Phục hồi chất lượng cần bốn yếu tố: thực sự ngắt khỏi việc trong đầu, thư giãn, có hoạt động mastery khác (chạy, học nhạc), và tự chủ thời gian rảnh. Nếu điểm hoài nghi tăng, cắt bớt một mảng thay vì ép tới sập." },
  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Decision journal + quy tắc thoát 'nguội' + xác suất dự đoán", why: "Lợi nhuận nhà đầu tư thực nhận thường thấp hơn lợi nhuận của chính tài sản họ nắm (behavior gap), gần như hoàn toàn do thời điểm ra/vào theo cảm xúc. Ghi vào decision journal luận điểm, xác suất, và điều kiện thoát TRƯỚC mỗi giao dịch, và viết quy tắc bán lúc đầu óc tỉnh táo — đừng quyết định lúc thị trường đang biến động. Để chống bản năng giữ khoản lỗ và chốt lời sớm (disposition effect), đánh giá mỗi vị thế bằng câu hỏi 'nếu chưa nắm giữ, mình có mua nó hôm nay ở giá này không?', bỏ qua giá vốn. Ghi xác suất dự đoán còn là dữ liệu khách quan để hiệu chỉnh chính mình theo thời gian." },
  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Tự động hóa đầu tư ngày nhận lương; Save More Tomorrow", why: "Con người thiên vị phần thưởng trước mắt hơn tương lai (present bias), tạo mâu thuẫn giữa 'bản thân hiện tại' và 'bản thân tương lai' — nên dựa vào ý chí để tiết kiệm đều là thất bại hệ thống. Cài lệnh chuyển đầu tư/tiết kiệm tự động ngay ngày nhận lương, trước khi tiền 'chạm tay', biến present bias thành đồng minh và loại bỏ điểm quyết định lặp lại. 'Save More Tomorrow': cam kết trước rằng mỗi lần tăng lương sẽ tăng tỷ lệ đầu tư tự động — né cảm giác 'mất' vì bạn chưa từng tiêu khoản đó. Cùng nguyên lý áp được cho học/sức khỏe: trả trước lớp học, hẹn lịch cố định." },
  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Tránh rủi ro phá sản/đuôi trước khi tối ưu kỳ vọng (ergodicity)", why: "Một quyết định có thể có kỳ vọng dương khi tính trung bình trên nhiều người, nhưng vẫn dẫn tới thảm họa cho một người qua thời gian nếu có nhánh 'game over' — vì một lần phá sản xóa sạch mọi lợi ích tích lũy (ergodicity). Hệ quả: tránh rủi ro đuôi/phá sản quan trọng hơn tối đa hóa kỳ vọng — 'sống sót trước, tối ưu sau'. Không bao giờ đặt cược hay dùng đòn bẩy tới mức một cú sốc có thể xóa sạch. Áp cả cho sức khỏe (tránh rủi ro thảm họa, tầm soát, an toàn giao thông) và danh tiếng — có những mất mát không hồi phục, nên bảo vệ trước là ưu tiên." },
  { pillar: "Công việc & Thành tựu", leverage: "moderate", text: "Job crafting (task/relational/cognitive) sang fintech/ESG trước khi pivot", why: "Bạn có thể tái định hình công việc hiện có để tăng ý nghĩa mà không đổi chức danh, và dùng nó làm cầu thử nghiệm rủi ro thấp trước khi pivot hẳn. Task crafting: xin dự án chạm fintech/capital markets/ESG ngay trong vai trò BA để tích lũy kinh nghiệm liên quan. Relational crafting: chủ động kết nối với người trong ngành mục tiêu từ bây giờ. Cognitive crafting: diễn giải lại công việc hiện tại theo giá trị lớn hơn nó phục vụ (giúp khách hàng ra quyết định tốt) để tăng ý nghĩa ngay lập tức." },
  { pillar: "Công việc & Thành tựu", leverage: "moderate", text: "Đánh giá bỏ/tiếp theo đường cong lợi ích; evidence file chống imposter", why: "'Không bao giờ bỏ cuộc' bỏ qua giá trị của việc bỏ đúng lúc: định kỳ hỏi mỗi mảng 'đường cong học/lợi ích còn dốc (đáng kiên trì) hay đã bình nguyên/sai hướng (nên bỏ chiến lược)?' để tránh tôn vinh sunk cost thành 'grit'. Cảm giác 'imposter' gần như chắc chắn xuất hiện khi pivot vào lĩnh vực mới — thường là dấu hiệu bạn đang thấy được độ sâu thật, không phải bằng chứng bất tài. Lưu một 'evidence file' các thành tựu và phản hồi tích cực cụ thể để đối chiếu khi cảm giác đó nổi lên. Người giỏi thường tự nghi ngờ (thấy độ phức tạp), người kém thường tự tin thái quá — nên nghi ngờ không đồng nghĩa thiếu năng lực." },
  { pillar: "Công việc & Thành tựu", leverage: "moderate", text: "Giảm tần suất xem danh mục; nhìn broad framing; cùng khung rủi ro mọi 'ngăn' tiền", why: "Kiểm tra danh mục quá thường xuyên khuếch đại nỗi sợ mất (myopic loss aversion) và dẫn tới bán tháo cảm xúc — đầu tư dài hạn không cần xem hằng ngày. Nhìn tổng danh mục và khung thời gian dài (broad framing) thay vì từng mã từng ngày (narrow framing). Cảnh giác nhất SAU chuỗi thắng, khi 'tiền lời' dễ khiến liều hơn và vượt quy tắc (house money) — hãy áp cùng khung quản trị rủi ro cho mọi 'ngăn' tiền (lương/thưởng/tiền lời). Vẫn tách quỹ để kỷ luật, chỉ cần ý thức khi tính thay thế của tiền bị bỏ qua." },

  { pillar: "Gia đình & Mối quan hệ", leverage: "high", text: "Loại khinh miệt; đáp 'bids'; học đưa/nhận repair; giữ tỷ lệ tích cực 5:1", why: "Khinh miệt (mỉa mai, đảo mắt, hạ thấp) là hành vi dự báo đổ vỡ quan hệ mạnh nhất — nhận diện và loại nó khỏi xung đột là ưu tiên số một. Ngoài xung đột, việc ĐÁP lại những lời mời kết nối nhỏ hằng ngày (bids — một câu, một ánh nhìn) dự báo quan hệ bền hơn cả cách xử lý cãi vã lớn. Học cách đưa VÀ nhận 'sửa chữa' trong xung đột (hài hước nhẹ, xin lỗi, đề nghị nghỉ 20 phút rồi quay lại) thay vì cố thắng hoặc né tránh. Chủ động tăng tương tác tích cực nhỏ hằng ngày để giữ 'ngân hàng cảm xúc' dương trước khi xung đột xảy ra." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "high", text: "Đầu tư sâu định kỳ vào vòng ~5 cốt lõi; phá vòng xoáy diễn giải tiêu cực", why: "Chất lượng quan hệ ở tuổi 50 dự báo sức khỏe tuổi 80 mạnh hơn cả cholesterol; và cô đơn chủ quan (chất lượng kết nối cảm nhận) hại sức khỏe hơn số lượng tiếp xúc. Xác định vòng ~5 người cốt lõi và lên lịch chủ động định kỳ cho họ thay vì chờ 'khi rảnh' — năng lượng quan hệ hữu hạn, đừng pha loãng đều cho quá nhiều người. Cô đơn tự duy trì qua một vòng xoáy: tăng cảnh giác đe dọa xã hội → diễn giải tiêu cực tương tác → rút lui → cô đơn hơn; nên nếu thấy cô đơn, hãy để ý và kiểm chứng xu hướng giả định bị từ chối thay vì rút lui. Đầu tư quan hệ ở tuổi 30 là 'lãi kép' cho sức khỏe tuổi già." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "high", text: "Duy trì weak/dormant ties nghề; định vị bắc cầu; cho trước", why: "Quan hệ 'yếu' (người quen) mang thông tin và cơ hội MỚI hơn quan hệ thân (vốn chia sẻ thông tin trùng lặp), và kết nối lại 'dormant ties' (đồng nghiệp cũ lâu không gặp) thường cho giá trị cao bất ngờ vì họ đã tin tưởng sẵn nhưng có thông tin mới. Duy trì chúng có hệ thống bằng tin nhắn ngắn mỗi vài tháng — kênh cơ hội giá trị cao khi pivot. Định vị mình ở giao điểm các nhóm (fintech + BA + đầu tư VN) để làm người bắc cầu thông tin, vốn có lợi thế cơ hội và sáng tạo. Networking hiệu quả là CHO trước (giới thiệu, chia sẻ hữu ích) không tính toán đối ứng ngay — 'givers' xây mạng bền hơn về dài hạn." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "high", text: "Self-expansion: làm điều MỚI và hơi thử thách cùng nhau", why: "Sự say đắm phai đi là quy luật thần kinh bình thường (hedonic adaptation áp lên cả tình yêu), không phải bằng chứng 'chọn sai người' — nhưng sự đơn điệu, chứ không phải xung đột, mới thường là kẻ giết quan hệ thầm lặng. Nghiên cứu trên các cặp yêu nhau lâu vẫn giữ được cường độ cho thấy điểm chung là họ tiếp tục làm điều MỚI và hơi thử thách CÙNG NHAU (self-expansion). Chủ động lên lịch trải nghiệm mới lạ cùng nhau (học kỹ năng, đi nơi lạ, hoạt động kích thích) — 'date night lặp lại y hệt' ít tác dụng hơn nhiều. Nuôi cả nền tảng an toàn (bids, repair) lẫn sự mới mẻ: thiếu cái đầu thì bất an, thiếu cái sau thì buồn tẻ." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "high", text: "Ranh giới = điều BẠN sẽ làm; nói không gọn, không giải thích dài", why: "Ranh giới là tuyên bố về điều BẠN sẽ làm ('nếu bị quát, mình sẽ tạm dừng cuộc trò chuyện'), không phải yêu cầu người khác thay đổi — đây là phân biệt cốt lõi hay bị hiểu sai. Thiếu ranh giới dẫn tới quá tải và oán giận ngầm, và nghịch lý là làm hỏng quan hệ vì sự đồng ý miễn cưỡng tích tụ lại. Nói không nên ngắn gọn, rõ, không giải thích dài — vì giải thích dài mời gọi đàm phán lại ('mình không sắp xếp được, cảm ơn đã nghĩ đến mình' là đủ). Trong văn hóa gia đình gắn kết cao ở VN, kết hợp ranh giới với sự ấm áp: giữ kết nối VÀ giữ giới hạn, không cần chọn một." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "high", text: "Lên lịch định kỳ để kết bạn; chủ động mời (liking gap)", why: "Tình bạn trưởng thành khó hình thành vì thiếu ba điều kiện mà trường học cho tự động: gặp gần gũi lặp lại, tương tác phi cấu trúc, và sự tự phát — người lớn phải tái tạo chúng có chủ đích qua sự lặp lại có cấu trúc (nhóm chạy, lớp học, buổi gặp định kỳ). Tình bạn cần thời lượng lặp lại (hàng chục giờ), nên hãy lên lịch định kỳ như một cam kết thay vì chờ 'khi rảnh' — đây chính là lý do người bận mất bạn. Chủ động mời: nghiên cứu 'liking gap' cho thấy bạn được yêu mến hơn bạn nghĩ, và người khác thường vui khi được mời, nên nỗi sợ 'làm phiền' phần lớn là ảo tưởng. Chia sẻ sâu dần và có đối ứng, vì trò chuyện chỉ về thông tin/công việc hiếm khi thành tình bạn." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "moderate", text: "Giải mã kiểu attachment mình/đối phương; nhắm earned security", why: "Trải nghiệm chăm sóc sớm hình thành 'bản đồ ngầm' về quan hệ, tự động kích hoạt dưới stress; nhiều phản ứng có vẻ 'vô lý' trong quan hệ thực ra là mô hình cũ này bật lên, không nhất thiết đọc đúng thực tại hiện tại. Nếu đối phương né tránh khi bạn tìm gần gũi (hoặc ngược lại), hiểu đó là chiến lược đối phó với cùng một nhu cầu gắn bó bị đe dọa — giảm việc diễn giải thành 'không yêu'. Quan trọng: attachment KHÔNG cố định — 'earned secure attachment' đạt được qua quan hệ an toàn ổn định, tự nhận thức, và trị liệu nếu cần. Khi phản ứng mạnh, tạm dừng hỏi 'đây là hiện tại hay mô hình cũ đang kích hoạt?'." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "moderate", text: "Differentiation: tách phản ứng do áp lực hệ thống; chống triangulation", why: "Biệt hóa bản thân (differentiation) là giữ được quan điểm/bản sắc riêng trong khi vẫn gần gũi gia đình, thay vì bị 'hòa tan' (nhượng bộ để yên) hoặc phải cắt đứt. Khi phản ứng mạnh với kỳ vọng gia đình (nghề, hôn nhân, tài chính), tạm dừng hỏi: đây là đánh giá độc lập của mình hiện tại, hay phản xạ với áp lực/vai trò cũ? Nói thẳng vấn đề với người liên quan thay vì kéo bên thứ ba vào phàn nàn (triangulation), vốn nuôi căng thẳng ngầm trong gia đình. Đặc biệt liên quan trong văn hóa gia đình gắn kết cao ở VN: biệt hóa không phải chối bỏ gia đình mà là yêu thương mà vẫn tự chủ." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "moderate", text: "Giảm 'phanh' (stress, kiệt sức, oán giận) thay vì cố 'tăng ga'", why: "Ham muốn tình dục vận hành qua hai hệ: 'ga' (kích thích) và 'phanh' (ức chế); với nhiều người vấn đề không phải thiếu ga mà là quá nhiều phanh — stress, kiệt sức, lo hình thể, oán giận chưa giải quyết, thiếu ngủ. Nên xử lý các 'phanh' này thường hiệu quả hơn cố 'tăng ham muốn'. Ngoài ra, ham muốn đáp ứng (xuất hiện SAU khi thân mật bắt đầu, không tự phát trước) là mẫu hình bình thường, nhất là ở phụ nữ — hiểu điều này tránh kết luận nhầm 'mình có vấn đề'. Thân mật rộng hơn tình dục (đụng chạm không tình dục, sự hiện diện, dễ tổn thương) là nền của nó, và giao tiếp cởi mở là can thiệp mạnh nhất vì im lặng/xấu hổ là nguyên nhân phổ biến hơn 'không hợp'." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "moderate", text: "Tách tha thứ khỏi hòa giải và bao biện; không tha thứ vì áp lực", why: "Tha thứ (giải phóng mình khỏi oán giận — việc nội tâm), hòa giải (khôi phục quan hệ), và bao biện (phủ nhận sai trái) là ba việc khác nhau: bạn có thể tha thứ mà vẫn giữ ranh giới hoặc rời đi. Oán giận mạn tính liên hệ với kích thích sinh lý kéo dài và tâm trạng kém, nên khung lại tha thứ như giải phóng bản thân, không phải món quà cho người gây tổn thương — động cơ này bền hơn. Tha thứ ép buộc hay quá sớm (do áp lực gia đình/văn hóa) không mang lại lợi ích và có thể duy trì tổn hại, đặc biệt nguy hiểm trong quan hệ lạm dụng. Trong xung đột gia đình VN, tha thứ nội tâm cộng ranh giới rõ thường lành mạnh hơn hòa giải gượng ép vì áp lực họ hàng." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "moderate", text: "Bàn sớm với cha mẹ/anh chị em về chăm sóc, giấy tờ, mong muốn", why: "Các cuộc trò chuyện khó về chăm sóc cha mẹ già (mong muốn cuối đời, tài chính, giấy tờ, quyết định y tế) hiệu quả nhất khi diễn ra TRƯỚC khi cần — sau khủng hoảng thì mọi lựa chọn đều tệ và cảm xúc chi phối. Làm rõ ai làm gì (thời gian, tiền, quyết định) vì kỳ vọng mặc định là nguồn oán giận ngầm lớn nhất giữa anh chị em, và gánh nặng thường rơi không cân xứng lên con gái. Chăm sóc bản thân người chăm sóc (giữ ngủ, vận động, hỗ trợ xã hội) không phải ích kỷ mà là điều kiện để chăm sóc bền, vì 'caregiver burden' là nguy cơ sức khỏe thật. Cho phép mình đau buồn trước sự suy giảm của cha mẹ (anticipatory grief), không chỉ xem đó là việc cần quản lý." },
  { pillar: "Gia đình & Mối quan hệ", leverage: "moderate", text: "Digital minimalism; giới hạn lướt thụ động nội dung so sánh", why: "Dùng mạng xã hội THỤ ĐỘNG (lướt vô định) tương quan với giảm wellbeing nhiều hơn dùng CHỦ ĐỘNG (tương tác), và việc so sánh đi lên với 'highlight reel' (mặt đẹp người khác phô ra) khuếch đại sự tự ti. Giới hạn lướt thụ động, nhất là nội dung về thành công/quan hệ người khác, và tự nhắc mình đang so với bản trình diễn chứ không phải thực tế. 'Digital minimalism': chọn có chủ đích những công cụ số phục vụ giá trị của mình, mặc định loại bỏ phần còn lại, thay vì để mặc định thu hút chú ý. Bỏ theo dõi/ẩn vài tài khoản khiến bạn so sánh tiêu cực là một hành động nhỏ giảm liều so sánh mỗi ngày." },

  { pillar: "Cộng đồng", leverage: "high", text: "Xây 1–2 'third place' thật, đến ĐỀU ĐẶN (ghép mục tiêu sẵn có)", why: "'Không gian thứ ba' (nơi tụ họp phi chính thức ngoài nhà và công sở — quán quen, câu lạc bộ, nhóm chạy) nuôi cảm giác thuộc về nền tảng với ít áp lực hơn quan hệ thân. Cơ chế là 'mere exposure' (gặp lặp lại tăng thiện cảm), nên sự ĐỀU ĐẶN (cùng giờ, cùng nơi) tạo quan hệ hơn là cường độ. Với người bận hoặc hướng nội, đây là kết nối 'liều thấp đều đặn' không đòi hỏi năng lượng như duy trì tình bạn sâu. Ghép nó với mục tiêu sẵn có để một hành động phục vụ nhiều đích: nhóm chạy (thể chất + cộng đồng), lớp tiếng Trung (học + cộng đồng)." },
  { pillar: "Cộng đồng", leverage: "moderate", text: "Bổ sung bridging + linking capital (cộng đồng fintech/ESG, người dẫn ngành)", why: "Vốn xã hội có ba loại: bonding (nhóm thân giống mình — hỗ trợ cảm xúc), bridging (nối các nhóm khác biệt — thông tin/cơ hội mới), và linking (nối lên người/thiết chế có nguồn lực). Đa số người thiếu bridging nhất vì xu hướng kết bạn với người giống mình (homophily), nên chủ đích tham gia cộng đồng nghề nghiệp ngoài vòng thân quen. Với hướng pivot, bridging capital (cộng đồng fintech/đầu tư/ESG) vừa cho cơ hội vừa cho cảm giác thuộc về ngành mới, và linking (kết nối người dẫn dắt ngành) mở tiếp cận nguồn lực. Vừa khai thác vừa đóng góp vào cộng đồng để xây uy tín dài hạn." },
  { pillar: "Cộng đồng", leverage: "moderate", text: "Đa dạng bản sắc nhóm làm đệm; dùng 'social cure' lúc khó", why: "Một phần lòng tự trọng đến từ việc thuộc về các nhóm xã hội, không chỉ từ thành tựu cá nhân; và sự đa dạng bản sắc nhóm (nghề, sở thích, cộng đồng) tạo một tấm đệm tâm lý. Nếu một bản sắc bị đe dọa (ví dụ mất việc), thiệt hại ít tàn phá hơn khi danh tính của bạn không dồn hết vào đó. Trong giai đoạn khó (pivot, stress), dựa vào các nhóm ý nghĩa như nguồn hỗ trợ và tự trọng — thuộc về nhóm là 'liều thuốc xã hội' có bằng chứng. Đồng thời cảnh giác mặt tối khi gắn bó sâu một nhóm: thiên kiến 'nhóm mình vs họ' và áp lực đồng thuận — giữ tư duy độc lập và cởi mở liên nhóm." },
  { pillar: "Cộng đồng", leverage: "moderate", text: "Đóng góp/generativity khớp kỹ năng (mentoring), trong giới hạn", why: "Đóng góp cho người khác và cho thế hệ sau (generativity) tương quan với ý nghĩa và cảm giác 'mình quan trọng với ai đó' (mattering) — thành phần chống tuyệt vọng mạnh. Hiệu ứng lớn hơn khi hoạt động khớp với kỹ năng và giá trị của bạn (mentoring, dùng chuyên môn tài chính) thay vì tham gia gượng ép. Lưu ý selection effect: phần lớn dữ liệu là quan sát (người khỏe/có nguồn lực vốn dễ đóng góp hơn), nên hãy làm vì giá trị nội tại, không như một liều thuốc sức khỏe đảm bảo. Giữ trong giới hạn — đóng góp quá sức tới kiệt (over-giving) phản tác dụng và sinh oán giận ngầm." },
  { pillar: "Cộng đồng", leverage: "moderate", text: "Đòn bẩy thật (ăn uống, đi lại, nơi tiền đầu tư, nghề nghiệp) + hành động tập thể", why: "Có khoảng cách lớn giữa các hành vi biểu tượng được truyền thông nhấn mạnh (ống hút, tắt đèn) và các đòn bẩy thực sự lớn cho bền vững: chế độ ăn, cách đi lại, nơi tiền của bạn được đầu tư, và lựa chọn nghề nghiệp. Với hướng ESG/tài chính bền vững bạn đang cân nhắc, hướng chuyên môn phân tích vào phân bổ vốn có thể là đòn bẩy tác động lớn hơn nhiều so với hành vi tiêu dùng cá nhân. Lo âu khí hậu là phản ứng hợp lý nhưng nếu không hành động thì gây tê liệt; nghiên cứu cho thấy hành động TẬP THỂ vừa hiệu quả hơn vừa giảm lo âu tốt hơn hành động cá nhân đơn lẻ. Kiểm tra xem tiền tiết kiệm/đầu tư của bạn đang được dùng vào đâu là một quyết định có đòn bẩy lớn." },

  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "high", text: "Savoring 20 giây khi có khoảnh khắc đẹp; savoring cả 3 thì (mong đợi/trong/hồi tưởng)", why: "Cảm xúc tích cực không chỉ là 'kết quả' của đời tốt mà còn mở rộng nhận thức và xây nguồn lực lâu dài (broaden-and-build); và savoring — chủ động kéo dài, khuếch đại trải nghiệm tích cực — là kỹ năng luyện được. Khi có khoảnh khắc đẹp (bữa ăn ngon, hoàng hôn, một bản nhạc), dừng 20 giây chú ý trọn vẹn thay vì chụp ảnh vội rồi lướt tiếp — chú ý là chất khuếch đại niềm vui. Savoring cả ba thì cho một trải nghiệm niềm vui ba lần: mong đợi (lên kế hoạch cho điều mình háo hức), tận hưởng trong khoảnh khắc, và hồi tưởng (kể lại/xem lại). Để ý và ngắt thói 'tự dập niềm vui' (lo việc chưa xong, so sánh, 'lẽ ra phải hơn')." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "high", text: "Chọn sở thích 'đa đích' tạo flow (nhóm chạy, nhạc cụ, làm đồ)", why: "Flow — trạng thái đắm mình quên thời gian khi thử thách khớp vừa với kỹ năng — là một trong những nguồn 'ý nghĩa qua trải nghiệm' mạnh nhất, và một sở thích theo đuổi nghiêm túc cho nó cùng nhiều thứ khác. Chọn sở thích 'đa đích' phủ nhiều trụ cùng lúc cho ROI wellbeing cao nhất khi bận: nhóm chạy (thể chất + cộng đồng + flow), học nhạc cụ (flow + mastery + niềm vui), làm gốm/vẽ (flow + sáng tạo + thư giãn). Nuôi ít nhất một sở thích cho bản sắc 'không phải nghề' — đệm tâm lý quan trọng khi nghề nghiệp bất định lúc pivot. Giữ tinh thần chơi: đừng biến nó thành KPI/thành tích, hãy để nó là nơi được dở mà vẫn vui." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "high", text: "Thay giải trí thụ động (lướt vô định) bằng chủ động dễ khởi động", why: "Giải trí thụ động (lướt điện thoại, xem vô định) dễ khởi động nhưng cho khoái cảm thấp và thường để lại cảm giác trống rỗng; giải trí chủ động (nhạc cụ, thể thao, làm đồ, đọc, trò chơi thật) khó bắt đầu hơn nhưng cho wellbeing cao hơn. Với người bận và kiệt sức nhận thức, cái bẫy là mặc định rơi vào giải trí thụ động vì nó dễ nhất. Giảm 'năng lượng khởi động' cho lựa chọn tốt bằng cách để nó trong tầm với: sách đang đọc dở cạnh sofa, nhạc cụ để ngoài bao. Coi vui chơi là dinh dưỡng đều đặn, không phải phần thưởng cuối cùng chờ 'khi rảnh'." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "high", text: "Nghi thức đánh dấu thời gian + ăn mừng thành tựu trước khi lao tiếp", why: "Thời gian không được đánh dấu thì trôi và biến mất — trí nhớ mã hóa ít điểm mốc khi các ngày giống nhau, nên đời có cảm giác 'trôi vèo'. Nghi thức và ăn mừng tạo các mốc, làm đời sống có cảm giác dài hơn và giàu hơn khi nhìn lại — một trong những can thiệp rẻ nhất chống lại cảm giác thời gian trôi nhanh của tuổi trưởng thành. Dừng lại đánh dấu thành tựu (kể cả nhỏ) trước khi lao sang cột mốc kế tiếp cũng chống 'arrival fallacy' và cho phép savoring. Nghi thức trước một sự kiện áp lực (thuyết trình, thi) còn giảm lo âu qua khôi phục cảm giác kiểm soát, hiệu quả cả khi bạn biết nó 'chỉ là nghi thức'." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "moderate", text: "Awe hằng ngày + awe walk; nghệ thuật có chủ đích (không đa nhiệm)", why: "Kinh ngạc (awe) — cảm xúc trước điều vĩ đại vượt tầm hiểu — thu nhỏ cảm giác về cái tôi ('small self'), tăng kết nối và sự hào phóng, và làm thời gian cảm thấy dồi dào hơn (đối trọng mạnh cho cảm giác 'nghèo thời gian'). Awe dễ tiếp cận hơn ta nghĩ: không cần Grand Canyon, mà là bầu trời, một bản nhạc lớn, một ý tưởng khoa học, lòng tốt của ai đó. Thỉnh thoảng đi một 'awe walk' với chủ đích chú ý cái rộng lớn/mới lạ, ghép với restoration break. Với nghệ thuật, chú ý đầy đủ (không vừa xem vừa làm việc) vì chất lượng chú ý quyết định giá trị thẩm mỹ." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "moderate", text: "Tạo nghệ thuật, không chỉ tiêu thụ (viết/vẽ/nhạc/ảnh)", why: "Trải nghiệm nghệ thuật cho cái đẹp, ý nghĩa và sự phong phú nội tâm khó thay thế — và việc TẠO ra nghệ thuật (không chỉ tiêu thụ) cho thêm flow và một tiếng nói nội tâm, dù bạn 'không giỏi'. Thử tự biểu đạt: viết, vẽ, chơi nhạc, nhiếp ảnh — giá trị nằm ở quá trình, không phải sản phẩm hoàn hảo. Chủ động mở rộng gu (thể loại nhạc/phim/sách mới) vì cái đẹp mới chống lại sự quen nhàm (hedonic adaptation) và giữ đời tươi mới. Chia sẻ và bàn về nghệ thuật với người khác để kết hợp cái đẹp với kết nối." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "moderate", text: "Hài hước gắn kết & tự-nâng; bỏ hài hước công kích/tự-hạ-thấp", why: "Không phải mọi hài hước như nhau: kiểu gắn kết (làm người khác thoải mái) và tự-nâng (giữ góc nhìn hài hước với nghịch cảnh) tương quan wellbeing tốt, trong khi kiểu công kích (chế giễu người khác) và tự-hạ-thấp (mua vui bằng cách hạ mình) tương quan wellbeing kém. Nên 'tự trào' không tự động lành mạnh — tùy nó là nhẹ nhõm hay là tự hạ thấp. Tìm được góc nhìn hài hước trong khó khăn là một dạng tái đánh giá cảm xúc (không phủ nhận nỗi đau, mà giữ khoảng cách với nó). Ưu tiên cười CÙNG người thật hơn xem hài một mình, vì tiếng cười chung mới xây gắn kết." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "moderate", text: "Luyện một giác quan có chủ đích (trà, nhạc, hương) + vốn từ mô tả", why: "Khả năng thưởng thức không cố định — nó là kỹ năng tri giác luyện được: chuyên gia cảm quan thực sự tri giác nhiều sắc thái hơn người mới nhờ đã xây schema và vốn từ. Chọn một miền cảm giác để đào sâu có chủ đích (trà/cà phê, âm nhạc, hương) — chú ý, so sánh, đặt tên — và khả năng tận hưởng tăng thật. Học vốn từ mô tả giúp nhận ra sắc thái lần sau (cùng cơ chế với 'granularity' cảm xúc). Đây là một trong ít nguồn wellbeing không bị giới hạn bởi tiền bạc hay thời gian; chỉ dấu lành mạnh là bạn thưởng thức được NHIỀU thứ hơn, không phải khó tính hơn." },
  { pillar: "Tận hưởng & Vẻ đẹp", leverage: "moderate", text: "Nhiều chuyến ngắn > một chuyến dài; đặt sớm để kéo dài mong đợi; khám phá tại chỗ", why: "Hạnh phúc của một chuyến đi phân bố không đều: phần MONG ĐỢI thường là hạnh phúc nhất, và ký ức được định hình bởi peak-end chứ không phải tổng thời lượng — nên nhiều chuyến ngắn thường cho nhiều hạnh phúc hơn một chuyến dài, và đặt sớm kéo dài giai đoạn mong đợi. Lợi ích nhận thức của du lịch đến từ ĐỘ SÂU tiếp xúc đa văn hóa (ở lâu, gặp người địa phương), không phải số quốc gia 'check-in'. Khám phá không cần hộ chiếu: sự mới lạ có chủ đích ngay trong thành phố mình (con đường mới, khu phố lạ) kích hoạt phần lớn cơ chế chống 'nén thời gian' với chi phí gần bằng 0. Đừng kỳ vọng 'geographic cure' — du lịch mở rộng góc nhìn nhưng không sửa vấn đề nội tâm, vì bạn mang chính mình theo." },

  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "high", text: "Định nghĩa 'điểm đủ' cho tiền/thành tựu; hướng năng lượng vượt đó sang ý nghĩa", why: "Con người ở trên 'guồng quay khoái lạc': đạt được điều mong muốn → quen dần → đặt mục tiêu cao hơn → không bao giờ thấy 'đủ'. Xác định một 'điểm đủ' có chủ đích cho tiền/thành tựu/vật chất, và vượt điểm đó thì chuyển năng lượng sang ý nghĩa/quan hệ/trải nghiệm thay vì tự động đặt cột mốc cao hơn. Đây không phải chống tham vọng, mà là hướng tham vọng có ý thức thay vì để guồng quay mặc định điều khiển — phân biệt tham vọng bạn THỰC SỰ chọn với tham vọng do so sánh xã hội áp đặt. Cũng nhắc mình rằng đạt được một cột mốc sẽ KHÔNG mang hạnh phúc bền như tưởng (arrival fallacy), nên đừng đặt cược wellbeing vào đích." },
  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "high", text: "WOOP thay vì mơ mộng; viết 3 odyssey plans cho pivot; prototype rẻ", why: "Chỉ tưởng tượng kết quả tốt (mơ mộng tích cực, vision board) thực ra GIẢM động lực — cần đối chiếu ước mơ với trở ngại thật rồi lập kế hoạch. Dùng WOOP: Wish (ước) → Outcome (hình dung kết quả đẹp) → Obstacle (trở ngại thật bên trong) → Plan (kế hoạch nếu-thì vượt trở ngại). Với pivot, viết ba 'odyssey plans' (ba phiên bản đời khả dĩ cho 5 năm tới) — không phải để chọn ngay một, mà để thấy nhiều đường và bỏ niềm tin sai rằng có 'một đời đúng duy nhất'. Trước cam kết lớn, làm 'prototype' rẻ (phỏng vấn người trong ngành, dự án thử, khóa học ngắn) để giảm rủi ro." },
  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "high", text: "Ý thức hữu hạn: hỏi 'đáng một phần 4000 tuần?'; chấp nhận bỏ dở", why: "Ý thức rằng đời hữu hạn (~4000 tuần) tái định khung ưu tiên — không phải để hoảng, mà để làm rõ điều gì THỰC SỰ đáng dành thời gian. Chấp nhận rằng bạn KHÔNG thể làm hết mọi thứ là giải phóng: chọn có ý thức cái gì để KHÔNG làm là một kỹ năng sống trung tâm, thoát khỏi ám ảnh năng suất vô hạn. Ý thức hữu hạn nghiêng cân về quan hệ và trải nghiệm (thứ không mua lại được thời gian) hơn là tích lũy. Nhận ra các giai đoạn đời có 'mùa' — ưu tiên việc nhạy thời điểm như sức khỏe tuổi 30 và thời gian với người thân lớn tuổi." },
  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "moderate", text: "Biết ơn 1–2 lần/tuần cụ thể (về con người); gratitude expression trực tiếp", why: "Lòng biết ơn chống lại 'sự quen nhàm' (hedonic adaptation) bằng cách dịch chú ý từ cái thiếu sang cái đang có, nhưng làm quá thường xuyên/máy móc thì mất tác dụng. Hiệu quả hơn khi: 1–2 lần/tuần (không hằng ngày cơ học), cụ thể, và tập trung vào CON NGƯỜI hơn vật/sự kiện. Bày tỏ biết ơn trực tiếp với người (tin nhắn, lời nói, 'gratitude letter') cho hiệu ứng mạnh nhất và nuôi luôn cả quan hệ. Một biến thể mạnh là 'negative visualization' của Stoic: thỉnh thoảng tưởng tượng nếu không có điều mình đang coi là hiển nhiên, để làm sống lại giá trị của nó." },
  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "moderate", text: "Nuôi nguồn siêu việt của riêng mình (thiên nhiên/thiền/nghệ thuật/cống hiến)", why: "Trải nghiệm tự-siêu-việt (vượt khỏi cái tôi nhỏ hẹp, kết nối với điều lớn hơn) liên hệ với ý nghĩa, wellbeing và giảm sợ chết — và nó có thể đến qua nhiều con đường, không cần niềm tin siêu nhiên. Xác định điều cho BẠN cảm giác kết nối với cái lớn hơn: thiên nhiên, thiền, nghệ thuật, tôn giáo, cống hiến, hay chiêm nghiệm vũ trụ/khoa học — rồi nuôi nó có chủ đích. Nếu thử thiền, giữ kỳ vọng thực tế (lợi ích vừa phải, cần đều đặn) vì nó bị thổi phồng rộng rãi. Lưu ý phần lớn lợi ích của con đường tâm linh đến từ thành phần cộng đồng chung ý nghĩa, nên kết hợp với trụ Cộng đồng." },
  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "moderate", text: "Lòng tốt gần, cụ thể, thấy tác động — trong ranh giới (chống over-giving)", why: "Hành vi vì người khác tương quan với wellbeing của chính người cho, nhưng hiệu ứng mạnh hơn khi hành động tự nguyện, cụ thể, thấy được tác động, và có kết nối với người nhận. Một hành động tử tế bạn thấy được kết quả cho nhiều lợi ích cảm xúc hơn một khoản chuyển vô danh (dù về mặt tác động, khoản kia có thể lớn hơn — đó là hai mục đích khác nhau, đừng gộp). Giữ trong ranh giới: 'compassion fatigue' và over-giving có thật, dẫn tới kiệt sức và oán giận ngầm — nói không là điều kiện của nói có thật lòng. Lòng tốt với bản thân (self-compassion) và với người khác đi cùng nhau, không đánh đổi." },
  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "moderate", text: "Bắt đầu generativity ngay: mentoring, chia sẻ, đóng góp", why: "Generativity — quan tâm nuôi dưỡng và đóng góp cho thế hệ sau — là nhiệm vụ phát triển dự báo wellbeing và sự hài lòng khi nhìn lại đời, nhưng không cần chờ tới trung niên: mentoring, chia sẻ kiến thức, đóng góp cộng đồng có thể bắt đầu ngay và nuôi ý nghĩa suốt đời. Di sản không đòi hỏi danh tiếng hay quy mô — di sản quan hệ (cách bạn khiến người khác cảm thấy) là thứ được nhớ lâu nhất. Các tiếc nuối cuối đời nhất quán một cách đáng chú ý: sống theo kỳ vọng người khác, làm việc quá nhiều, không bày tỏ cảm xúc, mất liên lạc với bạn bè, không cho phép mình hạnh phúc — không ai tiếc vì 'tối ưu chưa đủ'. Thỉnh thoảng hỏi 'điều gì mình muốn còn lại sau mình?' rồi kiểm hôm nay có sống nhất quán với điều đó không." },
  { pillar: "Ý nghĩa & Sự trọn vẹn", leverage: "moderate", text: "Biết & dùng signature strengths cách mới; thu hẹp khoảng cách giá trị–hành vi", why: "Mỗi người có các 'điểm mạnh nhân cách' tương đối bền, và dùng điểm mạnh nổi trội (signature strengths) theo cách MỚI tương quan với tăng wellbeing — xác định 3–5 điểm mạnh của mình (khảo sát VIA miễn phí hoặc tự phản tư) và tìm cách dùng chúng mới trong công việc/quan hệ. Sống chính trực (hành động khớp giá trị đã tuyên bố) giảm bất hòa nội tâm và xây tự trọng nền tảng — vốn bền hơn tự trọng dựa thành tựu. Định kỳ kiểm khoảng cách giữa giá trị và hành vi rồi thu hẹp nó. Đóng khung quyết định không chỉ 'kết quả nào tốt' mà 'con người nào mình muốn trở thành' — ý nghĩa sâu là trở thành, không chỉ đạt được." },

  { pillar: "Thể chất", leverage: "high", text: "Khám nha khoa định kỳ + bảo vệ thính lực (phòng ngừa cấp 1/2)", why: "Phòng ngừa có tỷ lệ lợi ích/chi phí cao nhất trong y học, nhưng hay bị bỏ qua vì lợi ích vô hình (bệnh không xảy ra thì không ai thấy). Viêm nha chu mạn tính là một ổ viêm hệ thống liên hệ với bệnh tim mạch và tiểu đường — nên lấy cao răng/khám nha khoa định kỳ và dùng chỉ nha khoa là can thiệp chống viêm, không chỉ thẩm mỹ. Mất thính lực không điều chỉnh là một trong các yếu tố nguy cơ THAY ĐỔI ĐƯỢC lớn nhất cho sa sút trí tuệ (qua giảm kích thích nhận thức và cô lập xã hội), nên bảo vệ thính lực từ bây giờ (giới hạn âm lượng tai nghe, nút tai nơi ồn). Theo hướng dẫn tầm soát theo tuổi/nguy cơ cùng bác sĩ, tránh cả bỏ sót lẫn over-screening." },
  { pillar: "Thể chất", leverage: "high", text: "Kiểm ferritin (không chỉ hemoglobin); cảnh giác dấu hiệu RED-S", why: "Thiếu sắt (thể hiện qua ferritin thấp, không chỉ hemoglobin) là nguyên nhân mệt mỏi và giảm hiệu suất rất phổ biến ở phụ nữ vận động, nhưng thường bị bỏ sót vì xét nghiệm chuẩn chỉ nhìn hemoglobin. Yêu cầu đo ferritin trong panel định kỳ. Đồng thời cảnh giác RED-S (thiếu hụt năng lượng tương đối): ăn không đủ so với năng lượng tiêu hao gây mất kinh, mất xương, rối loạn nội tiết. Kinh nguyệt không đều/mất kinh khi đang tập nhiều và ăn ít là DẤU HIỆU ĐỎ, không phải thành tích — cần ăn đủ và đi khám, không phải tập thêm." },
  { pillar: "Thể chất", leverage: "moderate", text: "Chỉnh môi trường một lần: ánh sáng ấm buổi tối, chống ồn, lọc không khí phòng ngủ", why: "Môi trường vật lý tác động liên tục và phần lớn vô thức lên giấc ngủ, tâm trạng và nhận thức — và vì nó là 'mặc định' bạn sống trong đó mỗi ngày, chỉnh một lần cho lợi ích lặp lại mãi (đòn bẩy cao bất thường trên mỗi đơn vị nỗ lực). Ba can thiệp có cơ sở nhất: ánh sáng (sáng ban ngày, ấm/mờ buổi tối — ảnh hưởng giấc ngủ hơn phần lớn 'mẹo ngủ'), chống ồn (ô nhiễm tiếng ồn phá giấc ngủ ngay cả khi bạn không thức giấc), và chất lượng không khí (PM2.5 ở đô thị châu Á là vấn đề sức khỏe thật). Thiết kế phòng để hành vi tốt thành mặc định: góc đọc có ánh sáng tốt, nhạc cụ ngoài bao, điện thoại có 'nhà' ngoài phòng ngủ. Đưa vào tầm mắt vài thứ đẹp/có ý nghĩa để có cảm xúc thẩm mỹ liều nhỏ mỗi ngày." },
  { pillar: "Thể chất", leverage: "moderate", text: "Ngắt quãng ngồi + tăng NEAT (cầu thang, đi bộ khi gọi điện)", why: "Ngồi lâu liên tục có tác động chuyển hóa xấu phần nào độc lập với việc có tập hay không, nhưng khẩu hiệu 'ngồi là thuốc lá mới' bị thổi phồng — vận động đầy đủ bù trừ được phần lớn nguy cơ, nên hãy đảm bảo tổng vận động đủ TRƯỚC rồi mới tối ưu việc ngắt quãng ngồi. Đứng dậy/di chuyển vài phút mỗi 30–60 phút làm việc, ghép với nhịp deep-work và restoration break sẵn có. Tăng NEAT — năng lượng cho vận động lặt vặt (đi cầu thang, đi bộ khi gọi điện, đỗ xe xa) — cộng dồn đáng kể mà không tốn 'thời gian tập'. Với đau lưng/cổ không đặc hiệu, đừng ám ảnh 'tư thế hoàn hảo': thay đổi tư thế thường xuyên và vận động quan trọng hơn." },

  { pillar: "Tinh thần", leverage: "high", text: "Dịch xấu hổ ('mình tệ') sang tội lỗi thích ứng ('mình làm sai X, sẽ sửa bằng Y')", why: "Tội lỗi ('tôi ĐÃ LÀM một việc tệ') hướng vào hành vi và thúc đẩy sửa chữa; xấu hổ ('tôi LÀ người tệ') hướng vào toàn bộ con người và thúc đẩy che giấu, phòng thủ, né tránh — nghịch lý là tương quan với NHIỀU hành vi có hại hơn. Phần lớn 'tự phê phán để thúc đẩy bản thân' thực chất là xấu hổ và phản tác dụng. Khi mắc lỗi, chủ động chuyển câu tự nói từ 'mình tệ thật' (xấu hổ, tê liệt) sang 'mình đã làm sai việc X, mình sẽ sửa bằng Y' (tội lỗi thích ứng, dẫn tới hành động). Xấu hổ mạnh lên trong im lặng — kể với một người an toàn làm giảm sức mạnh của nó." },
  { pillar: "Tinh thần", leverage: "high", text: "Sàng lọc anhedonia + ảnh hưởng chức năng ≥2 tuần → tìm chuyên gia", why: "Trầm cảm là một tình trạng y khoa có tiêu chuẩn chẩn đoán và điều trị hiệu quả, không phải 'yếu đuối' — và dấu hiệu cốt lõi hay bị bỏ sót nhất là anhedonia (mất hứng thú/niềm vui với thứ trước đây thích), vì người ta chỉ tìm 'nỗi buồn'. Tự kiểm ba trục: có mất hứng thú không, có kéo dài ≥2 tuần hầu hết các ngày không, và có ảnh hưởng chức năng sống không — nếu có, đó là lý do chính đáng để tìm chuyên gia. Người hiệu suất cao thường trì hoãn tìm giúp đỡ vì vẫn 'chạy được' ('high-functioning depression' che giấu bằng năng suất). Nếu có ý nghĩ tự làm hại bản thân, đó là dấu hiệu cần tìm hỗ trợ ngay — không chờ, không tự đánh giá." },
  { pillar: "Tinh thần", leverage: "high", text: "Giữ tiêu chuẩn cao, bỏ tự phê phán khi không đạt", why: "Chủ nghĩa hoàn hảo có hai chiều tách biệt: 'strivings' (đặt tiêu chuẩn cao — thường trung tính đến tích cực) và 'concerns' (sợ mắc lỗi, tự phê phán khi không đạt — tương quan mạnh với lo âu, trầm cảm, kiệt sức, trì hoãn). Nên vấn đề KHÔNG phải tiêu chuẩn cao, mà là điều xảy ra KHI BẠN KHÔNG ĐẠT. Hỏi 'khi không đạt, mình học và tiếp tục hay sụp đổ và né tránh?' — vế sau mới là vấn đề. Không cần hạ tiêu chuẩn; cần tách giá trị bản thân khỏi kết quả (self-compassion), và nếu bạn trì hoãn việc quan trọng, cân nhắc rằng đó có thể là sợ không hoàn hảo chứ không phải lười — hạ ngưỡng khởi động ('bản nháp tệ trước') hiệu quả hơn tự trách." },
  { pillar: "Tinh thần", leverage: "moderate", text: "Solitude 10 phút không kích thích (không điện thoại/podcast)", why: "Solitude (ở một mình có chủ đích) khác hẳn cô đơn: nó liên hệ với phục hồi, tự phản tư, sáng tạo và điều hòa cảm xúc, miễn là tự nguyện. Nhưng 'ở một mình với điện thoại' là kích thích, không phải tĩnh lặng — hãy dành thời gian thật sự KHÔNG kích thích (đi bộ, ngồi với cà phê, viết), nơi tiếng nói nội tâm và insight xuất hiện (nhiều insight đến trong tĩnh lặng qua default mode network). Với người bận, chất lượng quan trọng hơn thời lượng: 10 phút không kích thích hơn 2 giờ 'ở một mình lướt điện thoại'. Tự hỏi: mình đang CHỌN ở một mình (solitude) hay đang tránh né/thiếu kết nối (cô đơn)? — hai thứ cần đáp ứng khác nhau." },
  { pillar: "Tinh thần", leverage: "moderate", text: "Chuyển 'cần biết chắc' sang 'hành động tốt nhất với thông tin hiện có'", why: "Không chịu nổi sự bất định là một yếu tố duy trì lo âu xuyên chẩn đoán, và lo lắng thường là nỗ lực (thất bại) để đạt sự chắc chắn về một tương lai vốn không thể biết chắc. Mục tiêu không phải LÀM GIẢM bất định (bất khả) mà TĂNG khả năng chịu đựng nó — chuyển từ 'tôi cần biết chắc' sang 'tôi có thể hành động dù không biết chắc'. Với pivot, chấp nhận rằng không có cách nào biết chắc nó sẽ ổn: giảm rủi ro bằng prototype rẻ rồi hành động, thay vì chờ sự chắc chắn không bao giờ tới. Chấp nhận không phải cam chịu — nó là thôi vật lộn với thực tại không đổi được để dồn năng lượng vào hành động ở nơi đổi được." },
  { pillar: "Tinh thần", leverage: "moderate", text: "Cắt cue của siêu kích thích (xóa app khỏi màn hình chính) + thay bằng flow", why: "Dopamine mã hóa MONG MUỐN (wanting), không phải sự thích thú (liking) — nên ta có thể khao khát mãnh liệt thứ mình không còn thực sự thích; và các sản phẩm số được thiết kế có chủ đích để khai thác điều này qua phần thưởng bất định (variable reward) và feed vô tận. Đòn bẩy hiệu quả nhất không phải ý chí (chống lại thứ do hàng nghìn kỹ sư thiết kế để giữ chú ý bạn) mà là MA SÁT: xóa app khỏi màn hình chính, tắt thông báo, để điện thoại phòng khác. Giảm phơi nhiễm siêu kích thích trong một khoảng để 'baseline' khoái cảm hồi phục — đây là ý nghĩa nghiêm túc của 'dopamine fasting'. Cấm mà không thay thế thường thất bại, nên điền vào chỗ trống bằng hoạt động chủ động tạo flow." },

  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Chiến lược barbell: nền an toàn + nhiều 'cược nhỏ' bất đối xứng", why: "Né tránh rủi ro có vẻ an toàn nhưng tạo chi phí ẩn (cơ hội không nắm, năng lực không xây, vòng lo âu được củng cố); trong bất định, hành động có kiểm soát rủi ro tạo thông tin mà phân tích thuần không tạo được. Chiến lược 'barbell': giữ nền rất an toàn (thu nhập, sức khỏe, quan hệ) đồng thời đặt nhiều 'cược nhỏ' bất đối xứng (mất ít, được nhiều) vào hướng mới — pivot, dự án, đầu tư, viết lách. 'Không sợ thất bại' đúng nghĩa KHÔNG phải liều lĩnh: đó là cấu trúc rủi ro sao cho thất bại rẻ và bài học đắt, với ràng buộc tuyệt đối là không bao giờ cược tới mức phá sản. Trước mỗi thử nghiệm, hỏi 'nếu hỏng mình mất gì?' — nếu chấp nhận được và bài học lớn thì làm; nếu có nhánh 'game over' thì đừng." },
  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Tuổi 30 ưu tiên khám phá có cấu trúc (explore), đặt điểm chuyển sang exploit", why: "Mọi cuộc đời phải giải bài toán explore–exploit: dành nguồn lực để KHÁM PHÁ cái mới hay KHAI THÁC cái đã biết là tốt. Toán học cho thấy tỷ lệ khám phá tối ưu phụ thuộc vào THỜI GIAN CÒN LẠI phía trước — ở tuổi 30 giữa một pivot, thời gian còn dài nên chi phí thử nghiệm thấp so với giá trị thông tin, khiến đây là giai đoạn hợp lý để khám phá nhiều (nghề, sở thích, nơi chốn, ý tưởng). Đặt hạn ngạch khám phá có cấu trúc (mỗi tháng một trải nghiệm/lĩnh vực mới) để biến openness thành hành động. Nhưng đặt sẵn một điểm chuyển: sau giai đoạn khám phá có thời hạn, chuyển sang khai thác/cam kết — 'luôn mở' mãi thành né tránh cam kết." },
  { pillar: "Bản sắc cá nhân", leverage: "high", text: "Kiểm hai điều kiện trước khi tin trực giác (quy luật ổn định? phản hồi rõ?)", why: "Trực giác là nhận dạng mẫu hình đã học, đáng tin trong một số môi trường và cực kỳ không đáng tin ở môi trường khác. Nó đáng tin khi có (1) môi trường đủ đều đặn để có quy luật, và (2) cơ hội học quy luật đó qua phản hồi nhanh, rõ, lặp lại — như cờ vua, gây mê. Thị trường, tuyển dụng, dự báo dài hạn thì KHÔNG (quá nhiễu, phản hồi chậm/mơ hồ), nên 'chuyên gia' ở đó có trực giác tự tin nhưng không chính xác. Điểm cốt lõi: sự TỰ TIN của trực giác không phải chỉ báo về độ chính xác — trong môi trường nhiễu (đầu tư, đánh giá người), dùng quy tắc/checklist/decision journal thay vì 'cảm giác'." },
  { pillar: "Bản sắc cá nhân", leverage: "moderate", text: "Nâng ngưỡng đầu vào + phiên đọc sâu liền mạch", why: "Trong môi trường thông tin dư thừa và giải trí tối ưu-hóa-sự-chú-ý, chiều sâu trở thành nguồn lực khan hiếm — và đọc lướt/quét liên tục củng cố mẫu hình chú ý phân mảnh, bào mòn khả năng đọc sâu. Nâng ngưỡng chất lượng những gì bạn cho vào tâm trí: ít nguồn hơn nhưng chất lượng hơn (một cuốn sách sâu hơn mười bài lướt), vì chất lượng đầu vào định hình chất lượng tư duy. Giữ một 'phiên đọc sâu' thường xuyên (giấy hoặc không thông báo), đọc liền mạch để bảo tồn mạch chú ý dài. Lưu ý 'tiêu chuẩn sống cao' lành mạnh là chú ý và chọn lọc (phần lớn miễn phí), không phải tiêu dùng đắt tiền — và đừng để nó trượt thành chủ nghĩa hoàn hảo tự phán xét hay thái độ khinh người." },
  { pillar: "Bản sắc cá nhân", leverage: "moderate", text: "Sáng tạo: hạn ngạch số lượng + ấp ủ + ràng buộc; nghĩ riêng trước khi gộp", why: "Sáng tạo chủ yếu là TỔ HỢP mới của các yếu tố đã có, và một phát hiện phản trực giác quan trọng: SẢN LƯỢNG dự báo chất lượng — các nhà sáng tạo lớn không có tỷ lệ thành công cao hơn, họ đơn giản tạo ra nhiều hơn. Nên đặt hạn ngạch số lượng (10 ý tưởng, không phải 1 ý tưởng hay). Cho phép 'ấp ủ': sau khi làm việc căng với một vấn đề, chủ động rời đi (đi bộ, ngủ, việc nhẹ) vì insight cần khoảng trống. Dùng ràng buộc có chủ đích (thời gian, hình thức) để thúc đẩy sáng tạo thay vì tê liệt vì tự do vô hạn. Trong nhóm, cho mọi người nghĩ RIÊNG trước rồi mới gộp, vì brainstorm nhóm ngay từ đầu tạo ít ý tưởng hơn." },
  { pillar: "Bản sắc cá nhân", leverage: "moderate", text: "Self-distancing cho vấn đề của mình; luyện khiêm nhường tri thức", why: "Trí tuệ (wisdom) khác thông minh: nó là suy luận thực dụng về vấn đề đời sống phức tạp, khiêm nhường tri thức, và cân nhắc nhiều góc nhìn. Một phát hiện then chốt là 'nghịch lý Solomon': ta suy luận KHÔN NGOAN HƠN đáng kể về vấn đề của NGƯỜI KHÁC so với của chính mình, vì gần gũi cảm xúc thu hẹp góc nhìn — và điều này chữa được bằng self-distancing (với vấn đề của mình, tự hỏi 'mình sẽ khuyên một người bạn thế nào?' hoặc nghĩ ở ngôi thứ ba). Luyện khiêm nhường tri thức (dám nói 'mình có thể sai', 'mình chưa biết') tương quan với học hỏi tốt hơn, ít phân cực, và không đồng nghĩa thiếu tự tin. Trí tuệ đến từ phản tư có chủ đích trên kinh nghiệm, không tự động từ số năm sống." },
  { pillar: "Bản sắc cá nhân", leverage: "moderate", text: "Ôm trọn dải cảm xúc (emodiversity); amor fati chỉ cho cái KHÔNG đổi được", why: "Né tránh trải nghiệm nội tâm khó (experiential avoidance) là một yếu tố duy trì đau khổ xuyên chẩn đoán; ngược lại, chấp nhận và trải nghiệm phong phú nhiều loại cảm xúc (emodiversity — cả tích cực lẫn tiêu cực) tương quan với sức khỏe tốt hơn một đời sống cảm xúc đơn điệu, kể cả đơn điệu-tích-cực. Nên đừng theo đuổi một đời chỉ toàn cảm xúc tích cực — buồn, tiếc, kinh ngạc đều là phần của đời sống phong phú, và theo đuổi hạnh phúc một cách gắng gượng nghịch lý làm giảm nó. 'Amor fati' (yêu cả phần khó của số phận) áp cho điều KHÔNG đổi được (mất mát, quá khứ, hữu hạn). Với điều đổi được (bất công, quan hệ độc hại, bệnh cần chữa) — hành động, đừng 'yêu số phận'." },

  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Xây BATNA trước bàn đàm phán; đàm phán theo lợi ích, không lập trường", why: "Đàm phán là kỹ năng học được, và kết quả bị chi phối mạnh bởi BATNA (giải pháp thay thế tốt nhất nếu không thỏa thuận) — cải thiện BATNA (có lời mời khác, có đệm tài chính) là việc làm TRƯỚC khi ngồi vào bàn, và nó quyết định quyền lực nhiều hơn kỹ thuật nói năng. Chuyển từ lập trường sang lợi ích thật ('vì sao họ cần điều đó') thường mở ra giải pháp làm lớn chiếc bánh (linh hoạt thời gian, đào tạo, chức danh) thay vì chỉ giằng co lương. Chuẩn bị 'neo' bằng khoảng số có cơ sở dữ liệu thị trường, vì người neo trước định hình vùng thỏa thuận. Phụ nữ thường bị phạt xã hội khi đàm phán quyết liệt cho bản thân — một bất công thật; đóng khung qua tiêu chuẩn khách quan và lợi ích chung giúp điều hướng, nhưng đừng coi đó là lỗi của bạn." },
  { pillar: "Công việc & Thành tựu", leverage: "high", text: "Dịch thời gian sang tài sản TÍCH LŨY (kỹ năng hiếm, uy tín, công cụ, mã nguồn)", why: "Thu nhập từ bán thời gian (lương) tuyến tính và có trần; thu nhập từ tài sản có 'đòn bẩy' — mã nguồn, nội dung, sản phẩm, vốn, uy tín tiếp tục làm việc khi bạn ngủ. Sự khác biệt cấu trúc này, không phải nỗ lực, giải thích phần lớn khác biệt kết quả dài hạn. Phân biệt tài sản TÍCH LŨY (compounding — mỗi đơn vị công sức xây trên cái trước: kỹ năng, uy tín, danh mục, khán giả) với công việc THAY THẾ (mỗi giờ độc lập, dừng là hết), và dịch dần tỷ trọng thời gian sang cái đầu. Với nền BA + tài chính + song ngữ, đòn bẩy khả thi nhất là công cụ/nội dung/phân tích số hóa (chi phí nhân bản gần 0, không cần xin phép ai). Cảnh giác survivorship bias trong nội dung 'thu nhập thụ động' — dùng barbell: giữ nền ổn định, đặt cược nhỏ." },
  { pillar: "Công việc & Thành tựu", leverage: "moderate", text: "Xây optionality có thời hạn rồi CAM KẾT; đóng cửa sẽ không đi qua", why: "Trong bất định, giá trị nằm ở việc có QUYỀN nhưng không NGHĨA VỤ hành động khi thông tin mới xuất hiện — kỹ năng đa dạng, mạng lưới rộng, đệm tài chính, sức khỏe đều là 'quyền chọn' cho phép nắm cơ hội bất ngờ. Nhưng có hai cạm bẫy: 'optionality vô tận' thành né tránh cam kết (quyền chọn chỉ có giá trị nếu cuối cùng bạn THỰC HIỆN nó — giữ mãi mọi cửa mở là cách đảm bảo không đi qua cửa nào), và quyền chọn có chi phí duy trì (chú ý, phân tán). Nên xây optionality có mục đích trong một khung thời gian rồi CAM KẾT. Chủ động đóng các cửa bạn biết sẽ không bao giờ đi qua, để giải phóng chú ý." },
];

/* ---------------------------------------------------------------
   UI
--------------------------------------------------------------- */
function SectionCard({ s }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md overflow-hidden" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="min-w-0" style={{ fontFamily: serif, color: C.ink, fontSize: 16 }}>{s.heading}</span>
        <div className="flex items-center gap-3 shrink-0">
          <EvidenceBar level={s.evidence} />
          {open ? <ChevronUp size={16} color={C.inkDim} /> : <ChevronDown size={16} color={C.inkDim} />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3" style={{ borderTop: `1px solid ${C.line}` }}>
          <Block label="Cơ chế" color={C.gold} text={s.mechanism} pt />
          {s.expertNote && <ExpertBlock text={s.expertNote} />}
          <Block label="Khung lý thuyết" color={C.teal} text={s.theory} />
          <Block label="Tranh cãi / giới hạn" color={C.red} text={s.controversy} />
          <Protocol steps={s.application} />
          {s.pitfalls && <Pitfalls items={s.pitfalls} />}
          {s.micro && <MicroActions items={s.micro} />}
        </div>
      )}
    </div>
  );
}

function Pitfalls({ items }) {
  return (
    <div className="rounded-md p-3" style={{ background: "rgba(241,101,101,0.07)", border: `1px solid ${C.red}` }}>
      <div style={{ fontFamily: mono, color: C.red, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-2">
        Sai lầm cần tránh
      </div>
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2.5">
            <span style={{ color: C.red, fontSize: 14, lineHeight: 1.5 }} className="shrink-0">✕</span>
            <p style={{ fontFamily: serif, color: C.ink, fontSize: 14, lineHeight: 1.55 }}>{it}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MicroActions({ items }) {
  return (
    <div className="rounded-md p-3" style={{ background: "rgba(67,184,174,0.08)", border: `1px solid ${C.teal}` }}>
      <div style={{ fontFamily: mono, color: C.teal, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-2">
        Việc nhỏ đòn bẩy cao · cho lịch bận
      </div>
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2.5">
            <span style={{ color: C.teal, fontSize: 13, lineHeight: 1.6 }} className="shrink-0">▸</span>
            <p style={{ fontFamily: serif, color: C.ink, fontSize: 14, lineHeight: 1.55 }}>{it}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Block({ label, color, text, pt }) {
  return (
    <div className={pt ? "pt-3" : ""}>
      <div style={{ fontFamily: mono, color, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-1">
        {label}
      </div>
      <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 14.5, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function ExpertBlock({ text }) {
  return (
    <div className="rounded-md p-3" style={{ background: "rgba(160,140,209,0.07)", border: `1px solid ${C.violet}` }}>
      <div style={{ fontFamily: mono, color: C.violet, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-1">
        Tầng chuyên gia
      </div>
      <p style={{ fontFamily: serif, color: C.ink, fontSize: 14, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function Protocol({ steps }) {
  const list = Array.isArray(steps) ? steps : [{ domain: "", text: steps }];
  return (
    <div className="rounded-md p-3" style={{ background: "rgba(214,166,76,0.06)", border: `1px solid ${C.goldDim}` }}>
      <div style={{ fontFamily: mono, color: C.gold, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-2">
        Ứng dụng · protocol đa khía cạnh
      </div>
      <div className="flex flex-col gap-2.5">
        {list.map((step, i) => {
          const item = typeof step === "string" ? { domain: "", text: step } : step;
          return (
            <div key={i} className="flex gap-2.5">
              <span style={{ fontFamily: mono, color: C.gold, fontSize: 12, lineHeight: 1.6 }} className="shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontFamily: serif, color: C.ink, fontSize: 14, lineHeight: 1.55 }}>
                {item.domain && (
                  <span style={{ fontFamily: mono, color: C.teal, fontSize: 11 }}>[{item.domain}] </span>
                )}
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GroupNote({ note }) {
  if (!note) return null;
  return (
    <div className="rounded-md p-3 mb-1" style={{ background: "rgba(67,184,174,0.06)", border: `1px solid ${C.line}` }}>
      <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>{note}</p>
    </div>
  );
}

/* ---------------------------------------------------------------
   TỪ ĐIỂN THUẬT NGỮ — giải thích ngắn gọn, dễ hiểu, theo từng tab
--------------------------------------------------------------- */
const GLOSSARY = {
  physical: [
    ["mTOR / mTORC1", "công tắc phân tử trong tế bào ra lệnh 'xây cơ'; được kích hoạt bởi tập tạ và chất đạm."],
    ["AMPK", "công tắc phân tử báo 'thiếu năng lượng, cần tạo thêm lò đốt'; được kích hoạt bởi cardio."],
    ["Mitochondria (ty thể)", "'nhà máy điện' của tế bào, nơi tạo ra năng lượng; càng nhiều và khỏe thì càng bền sức."],
    ["VO2max", "lượng oxy tối đa cơ thể dùng được khi gắng sức — thước đo thể lực tim-phổi, dự báo sức khỏe dài hạn."],
    ["Zone 2", "cường độ vận động vừa phải, còn nói được trọn câu nhưng hơi hụt hơi; vùng xây nền thể lực tốt nhất."],
    ["Lactate (axit lactic)", "chất sinh ra khi cơ hoạt động mạnh; đo nó giúp xác định các vùng cường độ tập."],
    ["Polarized training", "cách tập '80% nhẹ + 20% rất nặng', tránh vùng giữa — hiệu quả hơn tập đều đều cường độ trung bình."],
    ["Hormesis / mitohormesis", "nguyên lý 'liều nhỏ stress tốt': một chút áp lực (tập, nhịn, nóng/lạnh) kích cơ thể mạnh lên; quá liều thì hại."],
    ["ROS / Nrf2", "ROS là 'gốc tự do' sinh ra khi tập; Nrf2 là hệ phòng vệ cơ thể tự bật lên để đáp lại — nên đừng chặn nó bằng thuốc chống oxy hóa liều cao quanh giờ tập."],
    ["Wolff's Law", "quy luật: xương mạnh lên theo lực tải đặt lên nó — nên cần tập nặng/va chạm để xương chắc."],
    ["Osteoblast / osteoclast", "tế bào XÂY xương (blast) và tế bào PHÁ xương (clast); cân bằng giữa chúng quyết định mật độ xương."],
    ["DEXA", "phép chụp đo mật độ xương (và mỡ/cơ), dùng làm mốc theo dõi."],
    ["Kháng insulin", "khi tế bào 'lì' với insulin nên đường huyết khó vào tế bào — bước đầu dẫn tới tiểu đường type 2."],
    ["Metabolic flexibility (linh hoạt chuyển hóa)", "khả năng cơ thể chuyển linh hoạt giữa đốt mỡ và đốt đường tùy lúc; người khỏe chuyển hóa tốt có khả năng này."],
    ["TOFI", "'gầy ngoài, mỡ trong' — người trông thon nhưng nhiều mỡ nội tạng, vẫn có rủi ro chuyển hóa; phổ biến ở người châu Á."],
    ["Protein leverage", "giả thuyết: cơ thể ăn cho tới khi đủ ĐẠM, nên ăn loãng đạm khiến ăn quá nhiều tổng thể."],
    ["Anabolic resistance", "khi lớn tuổi, cơ 'kém nhạy' với đạm hơn nên cần lượng đạm mỗi bữa cao hơn để xây cơ."],
    ["Leucine", "một axit amin (thành phần của đạm) đóng vai 'công tắc' khởi động việc xây cơ."],
    ["MPS", "tổng hợp protein cơ — quá trình cơ thể dùng đạm để xây/sửa cơ."],
    ["Whey / casein", "hai loại đạm từ sữa: whey hấp thu nhanh, casein chậm (hợp trước khi ngủ)."],
    ["Glymphatic", "hệ 'dọn rác' của não, hoạt động mạnh khi ngủ sâu (còn đang được nghiên cứu ở người)."],
    ["N3 / REM", "N3 là giấc ngủ sâu (phục hồi thể chất); REM là giấc ngủ mơ (củng cố trí nhớ, cảm xúc)."],
    ["Adenosine", "chất tích tụ trong ngày tạo 'áp lực buồn ngủ'; caffeine chặn nó nên làm ta tỉnh."],
    ["Nhịp sinh học (circadian) / chronotype", "đồng hồ ~24h của cơ thể; chronotype là kiểu 'cú đêm' hay 'chim sớm' của mỗi người (phần lớn do gen)."],
    ["Melatonin", "hormone báo hiệu trời tối/đến giờ ngủ; liều thấp 0.3–0.5mg đủ cho việc chỉnh nhịp."],
    ["ApoB", "xét nghiệm đếm số 'hạt mỡ xấu' gây xơ vữa mạch — chính xác hơn chỉ đo cholesterol LDL."],
    ["hs-CRP", "xét nghiệm đo mức viêm âm ỉ trong cơ thể, liên quan nguy cơ tim mạch."],
    ["HOMA-IR / insulin đói", "cách ước lượng mức kháng insulin từ xét nghiệm máu lúc đói — phát hiện vấn đề sớm."],
    ["Lp(a)", "một loại hạt mỡ do gen quyết định; đo một lần trong đời để biết rủi ro tim mạch nền."],
    ["NEAT", "năng lượng tiêu hao cho vận động lặt vặt hằng ngày (đi lại, đứng, cử động) — cộng dồn đáng kể."],
    ["RED-S", "tình trạng ăn không đủ so với năng lượng tiêu hao, gây mất kinh, loãng xương, rối loạn nội tiết — dấu hiệu đỏ, không phải 'tập tốt'."],
    ["Ferritin", "chỉ số phản ánh dự trữ sắt; thấp gây mệt mỏi, hay bị bỏ sót ở phụ nữ vận động."],
    ["HRT", "liệu pháp hormone thay thế quanh mãn kinh — quyết định cá thể hóa với bác sĩ."],
    ["Creatine", "thực phẩm bổ sung được nghiên cứu kỹ và an toàn nhất cho sức mạnh/khối cơ."],
    ["UPF / NOVA", "thực phẩm 'siêu chế biến' (công thức công nghiệp nhiều thành phần lạ); NOVA là hệ phân loại mức chế biến."],
    ["CGM", "máy đo đường huyết liên tục, đeo trên da, giúp thấy thực phẩm nào làm đường huyết mình vọt."],
  ],
  mental: [
    ["vmPFC", "vùng vỏ não trước trán bụng-giữa, giúp 'phanh' phản ứng cảm xúc mạnh."],
    ["Amygdala (hạch hạnh nhân)", "vùng não phát tín hiệu báo động/đe dọa; hoạt động mạnh khi sợ hãi, lo lắng."],
    ["GABAergic", "liên quan tới GABA — chất dẫn truyền thần kinh có tác dụng 'làm dịu/ức chế'."],
    ["Affect labeling (gọi tên cảm xúc)", "việc diễn đạt cảm xúc thành lời ('mình đang lo vì...') giúp hạ cường độ của nó."],
    ["Reappraisal (tái đánh giá)", "đổi cách DIỄN GIẢI một tình huống để đổi cảm xúc (vd xem hồi hộp là 'sẵn sàng')."],
    ["Suppression (nén)", "cố giấu/dằn biểu hiện cảm xúc — tốn sức và thường phản tác dụng về lâu dài."],
    ["Self-distancing", "nhìn vấn đề của mình từ xa (như nghĩ về người khác) để bình tĩnh và sáng suốt hơn."],
    ["Interoception", "khả năng cảm nhận tín hiệu bên trong cơ thể (nhịp tim, hơi thở) — nền của cảm xúc và trực giác."],
    ["Emotional granularity", "khả năng phân biệt cảm xúc tinh tế (bực khác thất vọng khác tủi) — giúp điều hòa tốt hơn."],
    ["Rumination (nhai lại)", "vòng suy nghĩ tiêu cực lặp lại về quá khứ, không dẫn tới giải pháp — kéo dài đau khổ."],
    ["Metacognition", "'nghĩ về cách mình nghĩ' — quan sát và điều chỉnh chính suy nghĩ của mình."],
    ["Allostatic load", "'hao mòn tích lũy' của cơ thể do stress kéo dài không được phục hồi."],
    ["HRV", "biến thiên nhịp tim — chỉ số phản ánh mức độ cơ thể đang phục hồi hay căng thẳng."],
    ["Cortisol", "hormone stress; nhịp của nó trong ngày quan trọng hơn con số đơn lẻ."],
    ["CTRA", "kiểu biểu hiện gene do stress/cô đơn mạn tính gây ra: tăng viêm, giảm miễn dịch."],
    ["PTG (post-traumatic growth)", "sự trưởng thành sau nghịch cảnh — có thật nhưng hay bị lãng mạn hóa; đau khổ và tăng trưởng có thể cùng tồn tại."],
    ["CBT / ACT / DBT", "ba liệu pháp tâm lý: CBT (sửa suy nghĩ méo mó), ACT (chấp nhận + sống theo giá trị), DBT (kỹ năng chịu đựng cảm xúc mạnh)."],
    ["Self-compassion", "đối xử với mình như với một người bạn đang khổ — không phải nuông chiều, mà giúp sửa sai mà không sụp đổ."],
    ["TIPP", "bộ kỹ năng DBT hạ cảm xúc mạnh nhanh (nước lạnh lên mặt, vận động mạnh, thở, thư giãn cơ)."],
    ["Anhedonia", "mất hứng thú/niềm vui với thứ trước đây thích — dấu hiệu cốt lõi của trầm cảm, hay bị bỏ sót."],
    ["PHQ-2 / PHQ-9", "bộ câu hỏi ngắn dùng để sàng lọc trầm cảm."],
    ["Perfectionism: strivings vs concerns", "'strivings' = đặt tiêu chuẩn cao (thường ổn); 'concerns' = sợ mắc lỗi, tự phê phán khi không đạt (gây hại)."],
    ["Dopamine: wanting vs liking", "'wanting' (thèm muốn) và 'liking' (thực sự thích) là hai hệ khác nhau — nên ta có thể thèm thứ mình không còn thấy vui."],
    ["Variable reward (phần thưởng bất định)", "cơ chế 'thỉnh thoảng mới thắng' (máy đánh bạc, thông báo, feed) — gây nghiện mạnh nhất."],
  ],
  identity: [
    ["Narrative identity", "bản sắc như một 'câu chuyện đời' mình tự kể; kể theo hướng 'khó khăn → trưởng thành' thì lành mạnh hơn."],
    ["Agency / communion", "hai chủ đề của đời sống: agency = làm chủ/thành tựu; communion = kết nối/yêu thương. Cân bằng cả hai tốt hơn."],
    ["Self-concept clarity", "mức độ mình hiểu rõ và ổn định về con người mình; thấp thì dễ bị cuốn theo người khác."],
    ["Introspection illusion", "ảo tưởng rằng ta hiểu rõ lý do hành vi của mình — thực ra tự vấn dễ 'bịa lý do'."],
    ["Fluid vs crystallized intelligence", "trí thông minh 'linh hoạt' (suy luận nhanh, đỉnh sớm rồi giảm) và 'tinh thể' (kiến thức/kinh nghiệm, tăng tới trung niên)."],
    ["Cognitive reserve (dự trữ nhận thức)", "'vốn dự phòng' của não (từ học tập, nghề phức tạp, giao tiếp) giúp chống suy giảm khi già."],
    ["Mental models (mô hình tư duy)", "các khung tư duy từ nhiều lĩnh vực; có nhiều mô hình giúp nhìn vấn đề đa chiều, tránh 'cầm búa thấy gì cũng là đinh'."],
    ["Bayesian updating / calibration", "cập nhật niềm tin theo bằng chứng bằng phần trăm (thay vì đúng/sai); calibration = khi nói '70%' thì đúng ~70% số lần."],
    ["Base rate (xác suất nền)", "tỷ lệ chung của các trường hợp tương tự — nên xét trước khi chìm vào chi tiết một trường hợp."],
    ["Pre-mortem", "tưởng tượng trước 'quyết định này đã thất bại — vì sao?' để lộ rủi ro mà lạc quan che mất."],
    ["Steelman", "dựng phiên bản MẠNH NHẤT của quan điểm đối lập trước khi phản biện (ngược với 'bôi xấu' nó)."],
    ["Inversion (giải ngược)", "hỏi 'làm sao để CHẮC CHẮN thất bại?' rồi tránh — thường lộ rủi ro mà tư duy thuận bỏ sót."],
    ["Sunk cost (chi phí chìm)", "cái đã mất không lấy lại được; đừng để nó khiến ta cố đấm ăn xôi ('đã lỡ đầu tư rồi...')."],
    ["EQ (Mayer–Salovey)", "trí tuệ cảm xúc gồm 4 kỹ năng học được: nhận diện, dùng, hiểu, và quản lý cảm xúc."],
    ["Cognitive vs affective empathy", "đồng cảm 'nhận thức' (hiểu người khác nghĩ gì) và 'cảm xúc' (cảm cùng họ); cái đầu ít gây kiệt sức hơn."],
    ["Active constructive responding", "cách phản ứng hào hứng khi người khác báo TIN VUI — dự báo chất lượng quan hệ mạnh."],
    ["NVC (giao tiếp phi bạo lực)", "cách nói tách sự việc khỏi phán xét: quan sát → cảm xúc → nhu cầu → yêu cầu cụ thể."],
    ["Retrieval practice (truy xuất)", "tự nhớ lại/tự đố thay vì đọc lại — cách học khắc sâu nhất."],
    ["Spacing / interleaving", "học giãn cách theo thời gian (spacing) và xen kẽ nhiều chủ đề (interleaving) — khó hơn nhưng nhớ lâu hơn."],
    ["Generation effect", "tự tạo câu trả lời trước khi xem đáp án giúp nhớ sâu hơn được cho sẵn."],
    ["Desirable difficulty", "'khó khăn có lợi' — cảm giác khó khi học thường là dấu hiệu đang học thật, không phải sai cách."],
    ["Cognitive load / working memory", "'bộ nhớ làm việc' rất hạn chế (~4 khối); nhồi quá nhiều cùng lúc gây quá tải."],
    ["Schema / chunking", "schema = khung kiến thức có tổ chức; chunking = gộp nhiều mẩu thành một khối để nhớ dễ hơn."],
    ["Deliberate practice", "luyện tập có chủ đích: nhắm điểm yếu + có phản hồi + lặp lại, khác 'làm nhiều cho quen'."],
    ["Transfer (chuyển giao)", "khả năng áp dụng cái đã học sang bối cảnh mới — khó và hiếm; game luyện não gần như không chuyển giao."],
    ["Habit loop / cue", "vòng thói quen: tín hiệu (cue) → hành động → phần thưởng; đổi CUE hiệu quả hơn dựa ý chí."],
    ["Basal ganglia (hạch nền)", "vùng não lưu thói quen tự động, chạy mà không cần 'ý chí'."],
    ["Implementation intentions", "kế hoạch 'nếu X thì Y' cụ thể — biến ý định thành hành động mạnh hơn mục tiêu chung chung."],
    ["Deep work / attention residue", "làm việc sâu không gián đoạn; 'attention residue' = dư âm chú ý còn vương khi chuyển việc, làm giảm hiệu suất."],
    ["Explore–exploit", "cân bằng giữa KHÁM PHÁ cái mới và KHAI THÁC cái đã biết là tốt; tuổi trẻ nên nghiêng về khám phá."],
    ["Openness", "'cởi mở trải nghiệm' — một nét tính cách (tò mò, ưa cái mới); luyện được qua tiếp xúc có chủ đích."],
    ["Antifragile / barbell", "antifragile = hưởng lợi từ biến động; barbell = phần lớn an toàn + một phần nhỏ mạo hiểm có lợi thế lớn."],
    ["Amor fati", "'yêu số phận' — chấp nhận và ôm trọn cả phần khó của đời (chỉ áp cho cái KHÔNG đổi được)."],
    ["Emodiversity", "sự phong phú của đời sống cảm xúc (nhiều loại cảm xúc) — liên hệ sức khỏe tốt hơn đời sống cảm xúc đơn điệu."],
    ["Solomon's paradox", "ta suy luận khôn ngoan về vấn đề của người khác hơn của chính mình — chữa được bằng self-distancing."],
  ],
  work: [
    ["SDT (autonomy/competence/relatedness)", "thuyết tự quyết: động lực bền cần ba nhu cầu — tự chủ, cảm giác giỏi lên, và kết nối."],
    ["Nội tại vs ngoại tại", "động lực từ bên trong (thích, thấy ý nghĩa) vs từ bên ngoài (thưởng, phạt, thể diện)."],
    ["Meaning vs happiness", "ý nghĩa (cho đi, thường kèm stress) và hạnh phúc (nhận, ít stress) là hai trục khác nhau."],
    ["Mattering", "cảm giác 'mình quan trọng với ai đó' — thành phần ý nghĩa chống tuyệt vọng mạnh."],
    ["Job crafting", "tự tái định hình công việc hiện có (nhiệm vụ, quan hệ, cách nhìn) để tăng ý nghĩa mà không đổi chức danh."],
    ["Mastery vs performance goals", "mục tiêu 'giỏi lên' (mastery) bền hơn mục tiêu 'không thua người khác' (performance)."],
    ["Grit", "kiên trì + đam mê dài hạn; hữu ích nhưng đôi khi bỏ đúng lúc còn khôn hơn cố lì."],
    ["Burnout (Maslach)", "kiệt sức nghề nghiệp gồm 3 phần: kiệt sức, hoài nghi/tách rời, giảm cảm giác hiệu quả."],
    ["Recovery (phục hồi)", "nghỉ đúng cách cần thực sự NGẮT khỏi việc trong đầu, không chỉ rời bàn làm việc."],
    ["Career capital", "'vốn nghề nghiệp' — kỹ năng hiếm và giá trị; đam mê thường đến SAU khi giỏi, không phải trước."],
    ["Skill stacking", "kết hợp vài kỹ năng ở mức khá tạo lợi thế hiếm ở giao điểm (vd BA + tài chính + song ngữ)."],
    ["Imposter / Dunning-Kruger", "imposter = người giỏi tự nghi ngờ mình; Dunning-Kruger = người kém tự tin thái quá vì không đủ năng lực để thấy mình kém."],
    ["Prospect theory / loss aversion", "cách con người ra quyết định trước được/mất; 'sợ mất' thường mạnh hơn 'ham được' (nhưng không phổ quát như từng nghĩ)."],
    ["Disposition effect", "xu hướng giữ khoản lỗ (hy vọng gỡ) và chốt lời sớm — ngược với 'cắt lỗ, để lãi chạy'."],
    ["Mental accounting / house money", "coi tiền theo 'ngăn' tâm lý; 'house money' = liều hơn với tiền lời vừa kiếm."],
    ["Present bias / hyperbolic discounting", "thiên vị phần thưởng TRƯỚC MẮT hơn tương lai — lý do kế hoạch dài hạn khó tuân thủ."],
    ["Sequence risk", "rủi ro thứ tự lãi/lỗ: lỗ nặng giai đoạn ĐẦU (khi đang rút tiền đều) gây hại khó phục hồi."],
    ["Ergodicity", "phân biệt trung bình 'nhiều người cùng lúc' với trung bình 'một người qua thời gian'; hệ quả: tránh rủi ro phá sản trước đã."],
    ["BATNA", "'giải pháp thay thế tốt nhất nếu không thỏa thuận' — quyết định quyền lực đàm phán của bạn."],
    ["Anchoring (neo)", "con số/đề nghị đưa ra ĐẦU TIÊN có sức kéo mạnh lên toàn bộ cuộc thương lượng."],
    ["Optionality", "giá trị của việc GIỮ lựa chọn mở trong bất định — nhưng quyền chọn không dùng thì vô giá trị."],
    ["Leverage / compounding", "đòn bẩy = tài sản làm việc thay bạn (mã nguồn, nội dung, vốn); compounding = lãi kép (cả tiền, kỹ năng, quan hệ)."],
  ],
  family: [
    ["Bốn kỵ sĩ (four horsemen)", "4 hành vi báo hiệu đổ vỡ quan hệ: chỉ trích, khinh miệt, phòng thủ, im lặng né tránh — khinh miệt nguy nhất."],
    ["Bids (lời mời kết nối)", "những tín hiệu nhỏ xin kết nối hằng ngày; việc ĐÁP lại chúng dự báo quan hệ bền."],
    ["Repair (sửa chữa)", "nỗ lực hạ nhiệt trong xung đột (hài hước, xin lỗi, đề nghị nghỉ) — biết đưa VÀ nhận nó quan trọng hơn tránh cãi."],
    ["Attachment (gắn bó)", "kiểu kết nối hình thành từ nhỏ: an toàn, lo âu (sợ bị bỏ), hoặc né tránh (ngại gần gũi); thay đổi được."],
    ["Working models", "'bản đồ ngầm' về quan hệ hình thành từ thơ ấu, tự động kích hoạt dưới stress."],
    ["Earned security", "sự an toàn trong gắn bó 'đạt được' về sau qua quan hệ lành mạnh và tự nhận thức — chứng minh attachment không cố định."],
    ["Differentiation of self", "giữ được bản thân/quan điểm riêng mà vẫn gần gũi gia đình, thay vì bị 'hòa tan' hoặc phải cắt đứt."],
    ["Triangulation", "kéo người thứ ba vào giữa để giảm căng (vd phàn nàn về A với B thay vì nói thẳng A) — nuôi căng thẳng ngầm."],
    ["Loneliness vs isolation", "cô đơn (cảm giác thiếu kết nối) khác cô lập (ít tiếp xúc thực tế); cô đơn chủ quan hại sức khỏe hơn."],
    ["Weak ties / dormant ties", "quan hệ 'yếu' (người quen) và 'ngủ đông' (từng thân, lâu không gặp) — kênh cơ hội/thông tin mới bất ngờ."],
    ["Structural holes", "'khoảng trống' giữa các nhóm không quen nhau; người bắc cầu qua đó có lợi thế thông tin."],
    ["Social comparison", "thói so sánh bản thân với người khác; mạng xã hội khuếch đại nó bằng 'highlight reel' (mặt đẹp phô ra)."],
    ["Passionate vs companionate love", "tình yêu 'say đắm' (mãnh liệt, hay phai) và 'gắn bó' (ấm áp, bền) — hai hệ khác nhau, cần nuôi cả hai."],
    ["Self-expansion", "tình yêu lớn lên khi hai người cùng mở rộng bản thân qua trải nghiệm MỚI cùng nhau — chống đơn điệu."],
    ["Responsive desire", "ham muốn xuất hiện SAU khi thân mật bắt đầu (không tự phát trước) — mẫu hình bình thường, nhất là ở phụ nữ."],
    ["Tha thứ vs hòa giải", "tha thứ = tự giải phóng khỏi oán giận (việc nội tâm); hòa giải = nối lại quan hệ; có thể tha thứ mà vẫn giữ ranh giới."],
    ["Transformative experience", "trải nghiệm biến đổi (như làm cha mẹ) mà ta không thể biết trước cảm giác, và nó thay đổi chính giá trị của mình."],
    ["Lao động cảm xúc / tải nhận thức", "'công việc vô hình' trong quan hệ: quản lý cảm xúc, và phần nhớ/lên kế hoạch/điều phối — thường rơi lệch lên một người (hay là phụ nữ)."],
    ["Interdependence vs codependence", "phụ thuộc lành mạnh (dựa vào nhau mà vẫn giữ bản thân) khác đồng phụ thuộc (hòa tan bản sắc vào việc chăm sóc/kiểm soát người kia)."],
  ],
  community: [
    ["Social capital (vốn xã hội)", "giá trị đến từ mạng lưới quan hệ; bonding (nhóm thân giống mình), bridging (nối nhóm khác), linking (nối lên thiết chế/quyền lực)."],
    ["Third place (không gian thứ ba)", "nơi tụ họp phi chính thức ngoài nhà và công sở (quán quen, câu lạc bộ) — nuôi cảm giác thuộc về."],
    ["Mere exposure", "hiệu ứng 'gặp lặp lại tăng thiện cảm' — lý do sự đều đặn tạo quan hệ hơn cường độ."],
    ["Generativity", "quan tâm nuôi dưỡng/đóng góp cho thế hệ sau (mentoring, truyền lại) — nguồn ý nghĩa, bắt đầu được ngay."],
    ["Prosocial spending", "chi tiền/nguồn lực cho người khác — liên hệ với hạnh phúc của chính người cho."],
    ["Social identity", "một phần lòng tự trọng đến từ việc thuộc về một nhóm; đa dạng nhóm là 'đệm' tâm lý."],
    ["In-group / out-group", "'nhóm mình' và 'nhóm họ'; cùng cơ chế tạo cảm giác thuộc về cũng tạo thiên kiến/phân cực."],
    ["Moral circle (vòng tròn đạo đức)", "phạm vi những ai/cái gì ta thấy đáng quan tâm về đạo đức; nó mở rộng dần qua lịch sử."],
    ["Effective altruism", "phong trào hỏi 'làm điều tốt với tác động lớn nhất trên mỗi đơn vị nguồn lực' — hữu ích nhưng đã có tranh cãi."],
    ["Collective effervescence", "trạng thái năng lượng và hòa làm một khi cùng làm đồng bộ trong nhóm (hát, nhảy, cổ vũ, hành lễ) — 'chất dinh dưỡng xã hội'."],
    ["Reciprocity (có đi có lại)", "chuẩn mực: được giúp thì thấy thôi thúc đáp lại; nền của hợp tác. 'Tổng quát' = thiện chí lan trong mạng lưới rồi quay lại."],
    ["Place attachment (bám rễ nơi chốn)", "mối liên hệ cảm xúc với một nơi và cộng đồng của nó — góp phần bản sắc, an toàn và ý nghĩa."],
  ],
  enjoyment: [
    ["Savoring (tận hưởng có chủ đích)", "chủ động kéo dài/khuếch đại trải nghiệm tích cực (mong đợi, tận hưởng, hồi tưởng) — kỹ năng luyện được."],
    ["Broaden-and-build", "cảm xúc tích cực 'mở rộng' nhận thức và 'xây' nguồn lực lâu dài (thể chất, trí tuệ, xã hội)."],
    ["Flow (dòng chảy)", "trạng thái đắm mình quên thời gian, xảy ra khi thử thách khớp vừa với kỹ năng."],
    ["Autotelic", "hoạt động làm vì CHÍNH NÓ (tự thân đáng làm), không vì phần thưởng bên ngoài."],
    ["Serious leisure", "sở thích theo đuổi nghiêm túc, tích lũy kỹ năng và bản sắc — cho flow, cộng đồng và ý nghĩa cùng lúc."],
    ["Awe (kinh ngạc) / small self", "cảm xúc trước điều vĩ đại vượt tầm hiểu; nó thu nhỏ cái tôi ('small self'), tăng kết nối và làm thời gian thấy dồi dào."],
    ["Aesthetic chills (rùng mình thẩm mỹ)", "cảm giác 'nổi da gà' trước nhạc/nghệ thuật đẹp — liên quan phản ứng dopamine."],
    ["Hedonic adaptation", "'sự quen nhàm' — ta quen dần với mọi thứ tốt và trở lại mức baseline; savoring và đa dạng chống lại nó."],
    ["Peak-end rule", "ký ức về một trải nghiệm được định hình bởi khoảnh khắc ĐỈNH và phần KẾT, không phải tổng thời lượng."],
    ["Ritual (nghi thức)", "chuỗi hành động biểu tượng lặp lại; giảm lo âu, tăng thưởng thức, đánh dấu thời gian."],
    ["Perceptual learning", "luyện tập làm giác quan phân biệt tinh hơn thật — khả năng thưởng thức là kỹ năng mở rộng được."],
    ["Nostalgia (hoài niệm)", "nỗi buồn ngọt ngào khi nhớ quá khứ ý nghĩa — chủ yếu có ích: tăng ý nghĩa, kết nối, tính liên tục của bản sắc."],
    ["Curiosity as practice", "tò mò như một thói quen nuôi được hằng ngày (không chỉ nét tính cách) — giải độc cho nhàm chán và 'autopilot'."],
    ["Touch hunger / affective touch", "nhu cầu được chạm an toàn; đụng chạm dễ chịu hạ cortisol, giải phóng oxytocin — hay bị bỏ đói khi sống một mình."],
  ],
  meaning: [
    ["Lòng biết ơn", "chú ý và trân trọng điều đang có; hiệu quả hơn khi cụ thể, thỉnh thoảng, và về CON NGƯỜI."],
    ["Negative visualization", "kỹ thuật Stoic: tưởng tượng mất điều mình đang có, để làm sống lại giá trị của nó."],
    ["Hedonic treadmill (guồng quay khoái lạc)", "đạt được điều mong muốn → quen dần → lại muốn hơn; nên dễ chạy mãi không thấy 'đủ'."],
    ["Arrival fallacy", "ảo tưởng rằng ĐẠT được mục tiêu sẽ mang hạnh phúc bền — thường hụt hẫng sau khi đạt."],
    ["Self-transcendence (siêu việt)", "cảm giác vượt khỏi cái tôi nhỏ hẹp, kết nối với điều lớn hơn (thiên nhiên, nhân loại, thiêng liêng)."],
    ["Memento mori / bốn nghìn tuần", "ý thức đời hữu hạn (~4000 tuần) để làm rõ ưu tiên — không phải để hoảng, mà để chọn đúng ít điều quan trọng."],
    ["Amor fati", "'yêu số phận' — ôm trọn cả phần khó của đời (chỉ áp cho cái không đổi được, không phải để cam chịu bất công)."],
    ["Hope theory (agency + pathways)", "hy vọng = vừa tin mình HÀNH ĐỘNG được (agency) vừa thấy CÁC ĐƯỜNG tới mục tiêu (pathways); luyện được."],
    ["Possible selves", "hình dung các 'phiên bản tương lai' của mình — định hướng động lực và quyết định hiện tại."],
    ["WOOP / mental contrasting", "kỹ thuật biến mơ ước thành hành động: Wish (ước) → Outcome (kết quả) → Obstacle (trở ngại thật) → Plan (kế hoạch nếu-thì)."],
    ["VIA character strengths", "bảng 24 'điểm mạnh nhân cách'; dùng điểm mạnh nổi trội theo cách mới giúp tăng wellbeing."],
    ["Eudaimonia", "'sống tốt/nở hoa' qua đức hạnh và trở thành con người mình muốn — khác 'hedonia' (khoái cảm đơn thuần)."],
    ["Moral elevation", "cảm động khi thấy đức hạnh/lòng tốt của người khác — truyền cảm hứng hành vi tốt."],
  ],
};

function GlossarySection({ pillarId }) {
  const [open, setOpen] = useState(false);
  const terms = GLOSSARY[pillarId];
  if (!terms || !terms.length) return null;
  return (
    <div className="mt-4 rounded-md overflow-hidden" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
        <span style={{ fontFamily: mono, color: C.teal, fontSize: 12, letterSpacing: "0.04em" }} className="uppercase">
          Từ điển thuật ngữ · {terms.length} mục
        </span>
        {open ? <ChevronUp size={16} color={C.inkDim} /> : <ChevronDown size={16} color={C.inkDim} />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-2.5" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 12.5, fontStyle: "italic", marginTop: 8 }}>
            Giải thích ngắn gọn các thuật ngữ trong tab này. Bấm để đóng/mở.
          </p>
          {terms.map(([term, def], i) => (
            <div key={i} className="flex flex-col gap-0.5 pb-2" style={{ borderBottom: i < terms.length - 1 ? `1px solid ${C.line}` : "none" }}>
              <span style={{ fontFamily: mono, color: C.gold, fontSize: 12.5 }}>{term}</span>
              <span style={{ fontFamily: serif, color: C.ink, fontSize: 14, lineHeight: 1.5 }}>{def}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PillarView({ pillar }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <span style={{ fontFamily: mono, color: C.goldDim, fontSize: 13 }}>{pillar.num}</span>
        <h2 style={{ fontFamily: serif, color: C.ink, fontSize: 26, margin: 0 }}>{pillar.title}</h2>
        <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 12 }}>— {pillar.subtitle}</span>
      </div>
      {pillar.groups.map((g, gi) => (
        <div key={gi} className="flex flex-col gap-2">
          <div style={{ fontFamily: mono, color: C.inkDim, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mt-1">
            {g.label}
          </div>
          <GroupNote note={g.note} />
          {g.sections.map((s, i) => (
            <SectionCard key={i} s={s} />
          ))}
        </div>
      ))}
      <GlossarySection pillarId={pillar.id} />
    </div>
  );
}

function ActionableItem({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md overflow-hidden" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex gap-3 items-start px-4 py-3 text-left">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontFamily: serif, color: C.ink, fontSize: 14.5 }}>{p.text}</span>
            <LeverageBadge level={p.leverage} />
          </div>
        </div>
        {open ? <ChevronUp size={15} color={C.inkDim} className="shrink-0 mt-0.5" /> : <ChevronDown size={15} color={C.inkDim} className="shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="px-4 pb-3" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 12.5, marginTop: 8, lineHeight: 1.55 }}>{p.why}</p>
        </div>
      )}
    </div>
  );
}

function ActionableGroup({ pillarName, items }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-2 mt-2 py-1.5 px-1">
        <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 15, fontWeight: 700, letterSpacing: "0.06em" }} className="uppercase">
          {pillarName} <span style={{ opacity: 0.6 }}>· {items.length}</span>
        </span>
        {open ? <ChevronUp size={14} color={C.inkDim} /> : <ChevronDown size={14} color={C.inkDim} />}
      </button>
      {open && (
        <div className="flex flex-col gap-2">
          {items.map((p, i) => (
            <ActionableItem key={pillarName + i} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function ActionableView() {
  const groups = {};
  PRACTICES.forEach((p) => {
    if (!groups[p.pillar]) groups[p.pillar] = [];
    groups[p.pillar].push(p);
  });
  Object.values(groups).forEach((items) =>
    items.sort((a, b) => LEV_RANK[a.leverage] - LEV_RANK[b.leverage])
  );
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <span style={{ fontFamily: mono, color: C.goldDim, fontSize: 13 }}>00</span>
        <h2 style={{ fontFamily: serif, color: C.ink, fontSize: 26, margin: 0 }}>Actionable Practices</h2>
        <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 12 }}>— sắp theo đòn bẩy: cao → vừa → thấp</span>
      </div>
      <div className="rounded-md p-4" style={{ background: "rgba(214,166,76,0.08)", border: `1px solid ${C.gold}` }}>
        <div style={{ fontFamily: mono, color: C.gold, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mb-2">
          Điều quan trọng nhất trong cả khung này
        </div>
        <p style={{ fontFamily: serif, color: C.ink, fontSize: 15, lineHeight: 1.7 }}>
          <b>Mọi lý thuyết ở đây chỉ có giá trị khi được THỰC HÀNH.</b> Một trang được đọc mà không sống thì bằng không;
          một thói quen nhỏ được duy trì bền bỉ thì đổi cả một đời. Giá trị không nằm ở việc bạn HIỂU bao nhiêu mục,
          mà ở việc bạn CHỌN vài điều và LÀM chúng đều đặn đủ lâu để chúng thành con người bạn.
          Đừng đọc để biết thêm — chọn 3 việc bên dưới, làm trong một tháng, rồi mới quay lại thêm. Bền bỉ thắng cường độ; nhất quán thắng hoàn hảo.
        </p>
      </div>
      {Object.entries(groups).map(([pillarName, items]) => (
        <ActionableGroup key={pillarName} pillarName={pillarName} items={items} />
      ))}
      <div className="rounded-md p-4 mt-2" style={{ background: "rgba(160,140,209,0.07)", border: `1px solid ${C.violet}` }}>
        <div style={{ fontFamily: mono, color: C.violet, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-2">
          Ghi chú bình duyệt · áp cho toàn bộ khung
        </div>
        <p style={{ fontFamily: serif, color: C.ink, fontSize: 13.5, lineHeight: 1.65 }}>
          Năm cảnh báo hệ thống áp cho MỌI mục trong mọi tab, quan trọng hơn bất kỳ mục lẻ nào:
          (1) <b>Cỡ hiệu ứng</b> — phần lớn phát hiện tâm lý/hành vi có tác động NHỎ đến VỪA; "có tương quan" không đồng nghĩa "đổi đời". Đòn bẩy thể chất (vận động, ngủ, đạm) thường vững hơn can thiệp tâm lý tích cực.
          (2) <b>Mẫu WEIRD</b> — đa số nghiên cứu làm trên người phương Tây, có học vấn, khá giả (thường là sinh viên); khái quát sang Việt Nam / một cá nhân là GIẢ ĐỊNH, không phải điều đã chứng minh.
          (3) <b>Tương quan ≠ nhân quả</b> — nhiều tuyên bố "X liên hệ Y" là dữ liệu quan sát, có thể nhân quả ngược (người khỏe/khá giả vốn tập nhiều, ngủ tốt, giao thiệp rộng hơn).
          (4) <b>Khủng hoảng tái lập</b> — một số "phát hiện kinh điển" đã sụp đổ (ego depletion, tỷ lệ tích cực 3:1) hoặc bị thu hẹp mạnh (growth mindset, loss aversion); khung đánh dấu "còn tranh cãi" ở nơi đã biết.
          (5) <b>Trung bình ≠ cá nhân</b> — mọi hiệu ứng là trung bình quần thể; phản ứng cá nhân biến thiên lớn. Cách dùng đúng: coi mỗi mục là một GIẢ THUYẾT để tự kiểm trên chính mình (n=1) qua dữ liệu và trải nghiệm.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ROOT
--------------------------------------------------------------- */
export default function App() {
  const [active, setActive] = useState(() => {
    const fromUrl = getSubTabFromUrl();
    if (fromUrl === "actionable" || PILLARS.some((p) => p.id === fromUrl)) return fromUrl;
    return "actionable";
  });
  useEffect(() => { syncSubTabToUrl(active); }, [active]);
  const SHORT = {
    physical: "Thể chất",
    mental: "Tinh thần",
    identity: "Bản sắc",
    work: "Công việc",
    family: "Quan hệ",
    community: "Cộng đồng",
    enjoyment: "Tận hưởng",
    meaning: "Ý nghĩa",
  };
  const tabs = [
    { id: "actionable", num: "00", label: "ACTIONABLE", icon: ListChecks },
    ...PILLARS.map((p) => ({ id: p.id, num: p.num, label: SHORT[p.id] || p.title, icon: p.icon })),
  ];
  return (
    <div style={{ background: C.bg }} className="w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 3px; }
      `}</style>
      <div className="px-4 sm:px-6 py-8">
        <header className="mb-4">
          <h1 style={{ fontFamily: serif, color: C.ink, fontSize: 32, lineHeight: 1.15, margin: 0 }}>Khung Sống Lành Mạnh Toàn Diện</h1>
        </header>
        <nav className="flex flex-wrap gap-1.5 mb-4 mobile-static" style={{ position: "sticky", top: 0, zIndex: 10, background: C.bg, padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button key={t.id} onClick={() => { setActive(t.id); window.__scrollArticleToTop?.(); }} className="flex items-center gap-1.5 shrink-0 transition-all" style={{
                padding: "7px 10px",
                borderRadius: 9,
                background: isActive ? C.gold : C.panel,
                border: `1px solid ${isActive ? C.gold : C.line}`,
                boxShadow: isActive ? `0 2px 10px ${C.gold}33` : "none",
              }}>
                <Icon size={13} color={isActive ? "#FFFFFF" : C.inkDim} />
                <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: isActive ? "#FFFFFF" : C.ink, letterSpacing: "0.02em" }} className="whitespace-nowrap">
                  {t.label}
                </span>
              </button>
            );
          })}
        </nav>
        <main>{active === "actionable" ? <ActionableView /> : <PillarView pillar={PILLARS.find((p) => p.id === active)} />}</main>
        {(() => {
          const idx = tabs.findIndex((t) => t.id === active);
          const next = idx >= 0 && idx < tabs.length - 1 ? tabs[idx + 1] : null;
          if (!next) return null;
          return (
            <div className="flex justify-end mt-6 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
              <button
                onClick={() => { setActive(next.id); window.__scrollArticleToTop?.(); }}
                className="flex items-center gap-2"
                style={{ padding: "10px 16px", borderRadius: 10, border: `1px solid ${C.gold}66`, background: `${C.gold}18`, color: C.gold, fontFamily: mono, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
              >
                Tiếp: {next.label} →
              </button>
            </div>
          );
        })()}
        <footer className="mt-10 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 12, lineHeight: 1.6 }}>
            Ghi chú phương pháp luận: các cơ chế/khung phản ánh đồng thuận khoa học phổ biến ở thời điểm biên soạn; khoa học vẫn phát triển và một số mô hình đang được xét lại. Các trích dẫn tên nhà nghiên cứu là để định vị nguồn ý tưởng, không phải bảo chứng mọi tuyên bố phái sinh. Xem "Ghi chú bình duyệt" ở tab Actionable để hiểu giới hạn áp cho toàn bộ khung. Nội dung mang tính giáo dục, không thay thế tư vấn y tế/tâm lý/tài chính cá nhân.
          </p>
        </footer>
      </div>
    </div>
  );
}
