import React, { useState } from "react";
import {
  Droplet,
  Filter,
  HeartPulse,
  ListChecks,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS — giữ nguyên palette/font từ hệ sinh thái Khung Sống Lành Mạnh
--------------------------------------------------------------- */
const C = {
  bg: "#12161C",
  panel: "#1B222C",
  panelAlt: "#212A36",
  line: "#313B48",
  ink: "#EDEAE1",
  inkDim: "#A7AFBC",
  gold: "#D6A64C",
  goldDim: "#8A6E3A",
  teal: "#43B8AE",
  violet: "#A08CD1",
  green: "#3ECB84",
  orange: "#F5A54A",
  red: "#F16565",
};
const serif = "'Source Serif 4', Georgia, serif";
const mono = "'IBM Plex Mono', ui-monospace, monospace";

/* ---------------------------------------------------------------
   PRIMITIVES
--------------------------------------------------------------- */
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

function Legend({ kind }) {
  const items =
    kind === "leverage"
      ? [
          { c: C.green, t: "Đòn bẩy cao" },
          { c: C.orange, t: "Vừa" },
          { c: C.red, t: "Thấp / nên tránh" },
        ]
      : [
          { c: C.green, t: "Bằng chứng mạnh" },
          { c: C.orange, t: "Vừa" },
          { c: C.red, t: "Còn tranh cãi" },
        ];
  return (
    <div className="flex items-center gap-4 flex-wrap px-3 py-2 rounded-md" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
      <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 10, letterSpacing: "0.06em" }} className="uppercase">
        Sắp xếp theo
      </span>
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span style={{ width: 8, height: 8, borderRadius: 2, background: it.c }} />
          <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 10.5 }}>{it.t}</span>
        </div>
      ))}
    </div>
  );
}

function Block({ label, color, text, pt }) {
  if (!text || text === "—") return null;
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
  if (!text) return null;
  return (
    <div className="rounded-md p-3" style={{ background: "rgba(160,140,209,0.07)", border: `1px solid ${C.violet}` }}>
      <div style={{ fontFamily: mono, color: C.violet, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-1">
        Góc nhìn chuyên gia
      </div>
      <p style={{ fontFamily: serif, color: C.ink, fontSize: 14, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function Protocol({ steps }) {
  if (!steps || !steps.length) return null;
  return (
    <div className="rounded-md p-3" style={{ background: "rgba(214,166,76,0.06)", border: `1px solid ${C.goldDim}` }}>
      <div style={{ fontFamily: mono, color: C.gold, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-2">
        Ứng dụng · protocol thực hành
      </div>
      <div className="flex flex-col gap-2.5">
        {steps.map((item, i) => (
          <div key={i} className="flex gap-2.5">
            <span style={{ fontFamily: mono, color: C.gold, fontSize: 12, lineHeight: 1.6 }} className="shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p style={{ fontFamily: serif, color: C.ink, fontSize: 14, lineHeight: 1.55 }}>
              {item.domain && <span style={{ fontFamily: mono, color: C.teal, fontSize: 11 }}>[{item.domain}] </span>}
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pitfalls({ items }) {
  if (!items) return null;
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

function GroupNote({ note }) {
  if (!note) return null;
  return (
    <div className="rounded-md p-3 mb-1" style={{ background: "rgba(67,184,174,0.06)", border: `1px solid ${C.line}` }}>
      <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>{note}</p>
    </div>
  );
}

function SectionCard({ s }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md overflow-hidden" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
        <span style={{ fontFamily: serif, color: C.ink, fontSize: 16 }}>{s.heading}</span>
        <div className="flex items-center gap-3 shrink-0">
          <EvidenceBar level={s.evidence} />
          {open ? <ChevronUp size={16} color={C.inkDim} /> : <ChevronDown size={16} color={C.inkDim} />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3" style={{ borderTop: `1px solid ${C.line}` }}>
          <Block label="Cơ chế" color={C.gold} text={s.mechanism} pt />
          <Block label="Nguyên nhân" color={C.orange} text={s.causes} />
          <Block label="Kết quả / hậu quả" color={C.red} text={s.outcomes} />
          <Block label="Cách chữa" color={C.teal} text={s.treatment} />
          <ExpertBlock text={s.expertNote} />
          <Protocol steps={s.application} />
          {s.pitfalls && <Pitfalls items={s.pitfalls} />}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   GLOSSARY
--------------------------------------------------------------- */
const GLOSSARY = {
  tieuduong: [
    ["Kháng insulin (Insulin resistance)", "tế bào giảm đáp ứng với insulin, buộc tuyến tụy tiết nhiều insulin hơn để duy trì đường huyết bình thường — cơ chế nền của tiểu đường type 2."],
    ["HbA1c", "chỉ số phản ánh mức đường huyết trung bình 2-3 tháng qua, dùng chẩn đoán và theo dõi điều trị tiểu đường."],
    ["Thuyên giảm (Remission)", "trạng thái HbA1c trở về mức không tiểu đường (<48 mmol/mol hoặc <6.5%) mà không cần thuốc hạ đường huyết, duy trì ít nhất 3 tháng."],
    ["Cơ chế 'hai chu trình' (Twin-cycle)", "giả thuyết mỡ tích tụ bất thường ở gan và tụy (không phải mỡ toàn thân) là động lực chính gây tiểu đường type 2 ở người dễ mắc — và có thể đảo ngược qua giảm cân."],
    ["SGLT2 (Sodium-Glucose Cotransporter 2)", "kênh vận chuyển ở ống thận tái hấp thu glucose; thuốc ức chế SGLT2 khiến glucose bị thải qua nước tiểu, đồng thời có lợi ích bảo vệ tim-thận độc lập với việc hạ đường huyết."],
    ["GLP-1 (Glucagon-Like Peptide-1)", "hormone đường ruột kích thích tiết insulin, làm chậm rỗng dạ dày, tạo cảm giác no — nền tảng cơ chế của nhóm thuốc GLP-1 receptor agonist."],
    ["Nhiễm toan lactic (Lactic acidosis)", "biến chứng hiếm gặp (<0.01%) của metformin, chỉ đáng lo khi có yếu tố nguy cơ rõ (suy thận/gan nặng, thiếu oxy mô cấp) — thường bị lo sợ quá mức so với rủi ro thật."],
  ],
  suythan: [
    ["eGFR (estimated Glomerular Filtration Rate)", "mức lọc cầu thận ước tính — chỉ số chính đánh giá chức năng thận, dùng để phân giai đoạn bệnh thận mạn."],
    ["Albumin niệu / Protein niệu", "sự hiện diện của albumin/protein trong nước tiểu — dấu hiệu sớm của tổn thương thận, có thể xuất hiện trước khi eGFR giảm."],
    ["Bệnh thận đái tháo đường (Diabetic nephropathy)", "tổn thương thận do tiểu đường kéo dài không kiểm soát tốt — nguyên nhân hàng đầu gây suy thận giai đoạn cuối trên toàn cầu."],
    ["Tăng lọc cầu thận (Hyperfiltration)", "giai đoạn sớm của bệnh thận đái tháo đường, khi cầu thận lọc quá mức do đường huyết cao — nghịch lý là eGFR ban đầu có thể TĂNG trước khi giảm dần."],
    ["RAAS (Renin-Angiotensin-Aldosterone System)", "hệ thống nội tiết điều hòa huyết áp và cân bằng dịch — thuốc ức chế hệ này (ACEi/ARB) là nền tảng bảo vệ thận."],
    ["Bệnh thận mạn (CKD - Chronic Kidney Disease)", "tổn thương thận hoặc giảm chức năng thận kéo dài ≥3 tháng, phân theo 5 giai đoạn dựa trên eGFR."],
    ["NSAID (Nonsteroidal Anti-Inflammatory Drug)", "nhóm thuốc giảm đau/kháng viêm không steroid (ibuprofen, diclofenac...) — nhóm thuốc số một cần tránh ở người bệnh thận mạn theo KDIGO."],
    ["Tổn thương thận cấp do cản quang (Contrast-Associated AKI)", "suy giảm chức năng thận cấp tính sau khi tiêm thuốc cản quang chứa iod trong CT/chụp mạch, nguy cơ tăng rõ khi eGFR dưới 30."],
  ],
  hovantim: [
    ["Hở van (Regurgitation)", "van tim đóng không kín, khiến máu trào ngược lại buồng tim phía trước thay vì chỉ chảy một chiều."],
    ["Van hai lá (Mitral valve) / Van động mạch chủ (Aortic valve)", "hai van tim thường gặp nhất trong các bệnh lý hở van ở người trưởng thành."],
    ["Theo dõi chủ động (Watchful waiting)", "chiến lược theo dõi định kỳ bằng siêu âm tim thay vì phẫu thuật ngay khi chưa có triệu chứng/tiêu chí đủ nặng."],
    ["Phân suất tống máu (Ejection Fraction - EF)", "tỷ lệ phần trăm máu được tim bơm ra mỗi nhịp — chỉ số quan trọng đánh giá chức năng tim và thời điểm cần can thiệp."],
    ["Viêm nội tâm mạc nhiễm khuẩn (Infective Endocarditis)", "nhiễm trùng lớp lót trong tim/van tim, hiếm nhưng nghiêm trọng — từng được cho là cần kháng sinh dự phòng rộng rãi trước thủ thuật nha khoa."],
    ["Thấp tim (Rheumatic Heart Disease)", "hậu quả muộn của sốt thấp khớp sau nhiễm liên cầu khuẩn họng không điều trị đủ — nguyên nhân hở van vẫn phổ biến ở Đông Nam Á, có thể phòng ngừa hoàn toàn bằng kháng sinh đúng cách."],
    ["TEER (Transcatheter Edge-to-Edge Repair)", "kỹ thuật kẹp van hai lá qua ống thông (phổ biến nhất: MitraClip) không cần mổ mở — dành cho người hở van nặng có triệu chứng nhưng nguy cơ phẫu thuật quá cao."],
    ["Hở van nguyên phát vs chức năng", "hở van nguyên phát do bất thường tại chính cấu trúc van; hở van chức năng do giãn buồng tim từ nguyên nhân khác kéo lệch van — hai loại có tiên lượng và đáp ứng điều trị khác nhau."],
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

/* ---------------------------------------------------------------
   PILLARS — Tiểu đường / Suy thận / Hở van tim
--------------------------------------------------------------- */
const PILLARS = [
  {
    id: "tieuduong",
    num: "01",
    icon: Droplet,
    title: "Tiểu đường",
    subtitle: "Cơ chế, sự thật về khả năng thuyên giảm, thuốc thế hệ mới",
    groups: [
      {
        label: "Cơ chế & sự thật bị đảo ngược",
        note: "Điểm quan trọng nhất của cả tab: tiểu đường type 2 KHÔNG còn được xem là bệnh vĩnh viễn tất yếu như trước — đọc kỹ mục thứ 2 trước khi mặc định 'phải sống chung cả đời'.",
        sections: [
          {
            heading: "Kháng insulin — cơ chế nền, không đơn giản là 'ăn nhiều đường'",
            evidence: "strong",
            mechanism:
              "Tiểu đường type 2 khởi phát từ kháng insulin: tế bào cơ, gan, mỡ giảm đáp ứng với insulin, buộc tuyến tụy tiết ngày càng nhiều insulin để duy trì đường huyết bình thường. Khi tụy dần kiệt sức không bù đắp nổi, đường huyết bắt đầu tăng — đây là quá trình diễn ra âm thầm nhiều năm trước khi được chẩn đoán.",
            causes:
              "Yếu tố di truyền (mức độ nhạy cảm cá nhân khác nhau rõ rệt), thừa cân/béo phì (đặc biệt mỡ nội tạng), ít vận động, và theo giả thuyết 'hai chu trình' (twin-cycle) — mỡ tích tụ bất thường tại GAN và TỤY (không phải mỡ toàn thân nói chung) là động lực chính ở người dễ mắc bệnh.",
            outcomes:
              "Đường huyết cao kéo dài gây tổn thương mạch máu nhỏ (võng mạc, thận, thần kinh ngoại biên) và mạch máu lớn (tim mạch, đột quỵ) — mức độ tổn thương tỷ lệ với thời gian và mức độ đường huyết không kiểm soát, không phải một sự kiện tức thời.",
            treatment: "—",
            expertNote:
              "Vì cơ chế nền là mỡ tích tụ tại gan/tụy chứ không chỉ là 'lượng đường ăn vào', đây là lý do một số người thừa cân vẫn không mắc tiểu đường trong khi người khác ở cân nặng tương tự lại mắc — sự khác biệt nằm ở mức độ nhạy cảm cá nhân với tích mỡ tại các cơ quan này, không chỉ ở lượng calo/đường tiêu thụ.",
            application: null,
          },
          {
            heading: "Thuyên giảm (Remission) — tiểu đường type 2 không còn là bản án vĩnh viễn",
            evidence: "strong",
            mechanism:
              "Nếu giảm đủ mỡ tích tụ tại gan và tụy (thường cần giảm 10–15% trọng lượng cơ thể), chức năng tiết insulin của tụy có thể phục hồi đáng kể ở người mới mắc bệnh — đảo ngược cơ chế bệnh sinh thay vì chỉ kiểm soát triệu chứng bằng thuốc.",
            causes: "—",
            outcomes:
              "Thử nghiệm DiRECT (Anh, đăng trên Lancet): chương trình giảm cân có cấu trúc (thay thế bữa ăn năng lượng thấp 12 tuần + duy trì) giúp 46% người tham gia đạt thuyên giảm (HbA1c về mức không tiểu đường, không cần thuốc) sau 1 năm; ở nhóm giảm được ≥15kg, tỷ lệ thuyên giảm lên đến 86%. Theo dõi mở rộng 5 năm: một số người vẫn duy trì thuyên giảm, dù tỷ lệ giảm dần theo thời gian (46% ở năm 1 xuống còn khoảng 10% ở năm 5) — phần lớn do tăng cân trở lại, không phải do 'bệnh không thể đảo ngược'. Kết quả được nhân rộng ở thử nghiệm DIADEM-I (Trung Đông/Bắc Phi).",
            treatment:
              "Thuyên giảm khả thi nhất khi bệnh mới được chẩn đoán trong vòng 6 năm (chức năng tụy chưa suy kiệt hoàn toàn), thông qua chương trình giảm cân có cấu trúc, có hỗ trợ hành vi — không phải chỉ 'ăn kiêng tự phát'.",
            expertNote:
              "Đây là thay đổi nhận thức quan trọng nhất trong y văn tiểu đường thập kỷ qua: hướng dẫn lâm sàng truyền thống tập trung vào thuốc hạ đường huyết và xem tiểu đường là bệnh tiến triển tất yếu, trong khi bằng chứng RCT hiện đại cho thấy thuyên giảm nên là MỤC TIÊU ĐIỀU TRỊ HÀNG ĐẦU ngay từ lúc chẩn đoán đối với người phù hợp — không phải kỳ vọng viển vông.",
            application: [
              { domain: "Nếu mới chẩn đoán", text: "Hỏi bác sĩ về khả năng tham gia chương trình giảm cân có cấu trúc nhắm mục tiêu thuyên giảm, đặc biệt nếu chẩn đoán trong vòng vài năm gần đây và có thừa cân — đây có thể là lựa chọn thay đổi hoàn toàn quỹ đạo bệnh, không chỉ 'uống thuốc suốt đời'." },
            ],
          },
        ],
      },
      {
        label: "Kiểm soát đường huyết đúng chuẩn",
        sections: [
          {
            heading: "Mục tiêu HbA1c cá nhân hóa — không có một con số 'đúng' cho tất cả",
            evidence: "strong",
            mechanism:
              "Mục tiêu HbA1c cần cân bằng giữa lợi ích giảm biến chứng lâu dài và nguy cơ hạ đường huyết (đặc biệt ở người lớn tuổi, nhiều bệnh nền) — kiểm soát càng chặt không đồng nghĩa càng tốt cho mọi đối tượng.",
            causes: "—",
            outcomes:
              "Các thử nghiệm lớn (ACCORD) từng cho thấy kiểm soát đường huyết CỰC KỲ chặt ở người tiểu đường lâu năm, nhiều bệnh nền tim mạch thực sự làm TĂNG tử vong so với kiểm soát vừa phải — do nguy cơ hạ đường huyết nặng. Ngược lại, người mới chẩn đoán, ít bệnh nền hưởng lợi rõ rệt từ kiểm soát chặt trong việc phòng ngừa biến chứng vi mạch dài hạn.",
            treatment:
              "Mục tiêu HbA1c nên cá nhân hóa: chặt hơn (gần bình thường) cho người trẻ, mới mắc bệnh, ít bệnh nền; nới lỏng hơn cho người lớn tuổi, nhiều bệnh nền, tiền sử hạ đường huyết nặng — không áp một con số cứng cho tất cả.",
            expertNote:
              "Đây là ví dụ về việc 'căng thẳng càng chặt càng tốt' không phải lúc nào cũng đúng trong y học — kiểm soát đường huyết là trường hợp kinh điển cho thấy lợi ích và nguy cơ cần cân bằng theo từng cá nhân, không phải tối đa hóa một chỉ số đơn lẻ.",
            application: [
              { domain: "Thảo luận với bác sĩ", text: "Hỏi rõ mục tiêu HbA1c cụ thể của bản thân và lý do (dựa trên tuổi, thời gian mắc bệnh, bệnh nền đi kèm) thay vì mặc định một con số chung cho mọi người." },
            ],
          },
          {
            heading: "'Kiêng đường' bị đơn giản hóa quá mức — vấn đề là tổng thể chuyển hóa, không phải một loại thực phẩm",
            evidence: "moderate",
            mechanism:
              "Đường huyết sau ăn phụ thuộc vào tổng lượng carbohydrate, chỉ số đường huyết của thực phẩm, thành phần đi kèm (chất xơ, đạm, béo làm chậm hấp thu), và mức độ kháng insulin nền — không phải chỉ do 'đường' như một loại thực phẩm đơn lẻ.",
            causes:
              "Quan niệm dân gian đơn giản hóa 'tiểu đường là do ăn ngọt' phổ biến vì dễ hiểu, dù cơ chế bệnh sinh thực tế phức tạp hơn nhiều (xem mục Kháng insulin).",
            outcomes:
              "Kiêng khem cực đoan, cứng nhắc dễ dẫn đến bỏ cuộc dài hạn hơn là điều chỉnh chế độ ăn có tính bền vững; đồng thời nỗi sợ hãi quá mức với 'đường' có thể khiến người bệnh bỏ qua các đòn bẩy quan trọng hơn (tổng calo, vận động, giảm cân) trong khi ám ảnh vào chi tiết nhỏ.",
            treatment:
              "Ưu tiên theo thứ tự: tổng lượng calo/giảm cân (đòn bẩy lớn nhất, xem mục Thuyên giảm) > chất lượng carbohydrate (ưu tiên carb phức hợp, nhiều chất xơ) > né tránh hoàn toàn một loại thực phẩm cụ thể.",
            expertNote:
              "Không có nghĩa 'ăn đường thoải mái không sao' — mà là nếu chỉ tập trung kiêng đường trong khi bỏ qua tổng calo và cân nặng, đây là chiến lược có đòn bẩy thấp hơn nhiều so với những gì được kỳ vọng phổ biến.",
            application: [
              { domain: "Ưu tiên thực hành", text: "Nếu phải chọn một thay đổi để bắt đầu, ưu tiên giảm tổng lượng calo/hướng tới giảm cân trước khi ám ảnh loại bỏ hoàn toàn một nhóm thực phẩm cụ thể." },
            ],
          },
        ],
      },
      {
        label: "Thuốc thế hệ mới — vượt xa kiểm soát đường huyết đơn thuần",
        sections: [
          {
            heading: "SGLT2 & GLP-1 — lợi ích bảo vệ tim-thận độc lập với hạ đường huyết",
            evidence: "strong",
            mechanism:
              "Thuốc ức chế SGLT2 khiến glucose bị thải qua nước tiểu (giảm tái hấp thu ở ống thận); GLP-1 receptor agonist kích thích tiết insulin phụ thuộc glucose và làm chậm rỗng dạ dày. Cả hai nhóm ban đầu được phát triển để hạ đường huyết, nhưng các thử nghiệm tim mạch sau đó phát hiện lợi ích bảo vệ tim/thận vượt xa mức có thể giải thích chỉ bằng việc hạ đường huyết.",
            causes: "—",
            outcomes:
              "Các thử nghiệm tim mạch lớn xác nhận SGLT2 giảm biến cố tim mạch và làm chậm tiến triển bệnh thận mạn — hiệu quả này được ghi nhận NGAY CẢ Ở NGƯỜI KHÔNG BỊ TIỂU ĐƯỜNG có bệnh thận mạn (xem thêm tab Suy thận), cho thấy cơ chế bảo vệ không chỉ qua đường huyết.",
            treatment:
              "Với người tiểu đường có thêm bệnh tim mạch hoặc bệnh thận mạn, các hướng dẫn hiện đại khuyến cáo ưu tiên SGLT2/GLP-1 sớm trong phác đồ (không chỉ dùng khi metformin không đủ) vì lợi ích kép ngoài hạ đường huyết.",
            expertNote:
              "Đây là một trong những thay đổi thực sự lớn của y học nội tiết-tim mạch-thận học thập kỷ qua: ranh giới giữa 'thuốc tiểu đường', 'thuốc tim mạch', và 'thuốc thận' đã mờ đi đáng kể — cùng một loại thuốc giờ được kê bởi cả 3 chuyên khoa cho các chỉ định chồng lấn nhau.",
            application: [
              { domain: "Nếu có bệnh tim/thận kèm theo", text: "Nếu đang có tiểu đường VÀ bệnh tim mạch hoặc dấu hiệu bệnh thận, hỏi bác sĩ cụ thể về việc thêm SGLT2/GLP-1 sớm, không chỉ chờ khi metformin đơn thuần không đủ kiểm soát đường huyết." },
            ],
          },
        ],
      },
      {
        label: "Metformin — tách bạch rủi ro thật khỏi nỗi sợ bị phóng đại",
        note: "Metformin là thuốc hàng đầu, dùng cho hàng trăm triệu người — nhưng có 2 nỗi lo phổ biến cần hiểu đúng mức độ: một cái bị phóng đại quá mức, một cái bị xem nhẹ.",
        sections: [
          {
            heading: "Nhiễm toan lactic — nỗi sợ bị phóng đại quá mức so với rủi ro thật",
            evidence: "strong",
            mechanism:
              "Metformin về lý thuyết có thể làm tăng tích lũy lactate nếu đào thải qua thận bị suy giảm nặng hoặc có tình trạng thiếu oxy mô nặng đi kèm (nhiễm trùng nặng, suy gan/thận nặng, giảm tưới máu mô).",
            causes:
              "Nỗi sợ này phổ biến trong dân gian và thậm chí một số nhân viên y tế do tên gọi đáng sợ và cảnh báo đóng khung (boxed warning) trên nhãn thuốc — dù tỷ lệ thực tế cực kỳ hiếm.",
            outcomes:
              "Tỷ lệ nhiễm toan lactic liên quan metformin trong thực hành lâm sàng thực tế dưới 0.01% — cực kỳ hiếm, và hầu như chỉ xảy ra khi có các yếu tố nguy cơ rõ ràng đi kèm (suy thận nặng, suy gan, tình trạng thiếu oxy mô cấp) chứ không phải do dùng metformin đơn thuần ở người chức năng thận bình thường-nhẹ.",
            treatment:
              "Không cần hoảng sợ khi được kê metformin nếu chức năng thận còn tốt/giảm nhẹ — chỉ cần tạm ngừng thuốc trong các tình huống nguy cơ cao tạm thời cụ thể: trước chụp cản quang có tiêm thuốc cản quang, phẫu thuật lớn, hoặc khi có bệnh cấp tính nặng gây mất nước/thiếu oxy mô.",
            expertNote:
              "Đây là ví dụ về việc một cảnh báo an toàn chính thức (boxed warning) — có lý do chính đáng để tồn tại cho nhóm nguy cơ cao — bị hiểu sai thành 'nguy hiểm chung cho tất cả mọi người dùng thuốc', trong khi rủi ro thực tế cho người dùng thông thường gần như không đáng kể.",
            application: [
              { domain: "Khi nào cần tạm ngừng", text: "Tạm ngừng metformin theo đúng hướng dẫn bác sĩ trước khi chụp CT/chụp mạch có thuốc cản quang, trước phẫu thuật lớn, hoặc khi đang sốt cao/nhiễm trùng nặng/tiêu chảy mất nước nhiều — đây là các tình huống nguy cơ thật, không phải lo lắng thường trực khi dùng thuốc bình thường." },
            ],
          },
          {
            heading: "Thiếu vitamin B12 — rủi ro thật, ít được biết đến hơn nhiều so với nỗi sợ nhiễm toan lactic",
            evidence: "moderate",
            mechanism:
              "Metformin làm giảm hấp thu vitamin B12 tại ruột non qua cơ chế liên quan canxi/thụ thể hấp thu — hiệu ứng này có thể xuất hiện sớm từ tháng thứ 3 sử dụng, không cần dùng liều cao hay thời gian rất dài.",
            causes: "Sử dụng metformin kéo dài (đặc biệt >1 năm), liều cao, người lớn tuổi có sẵn hấp thu B12 kém hơn.",
            outcomes:
              "Khoảng 7% người dùng metformin trong các thử nghiệm lâm sàng có giảm B12 xuống dưới ngưỡng bình thường sau 29 tuần. Thiếu B12 kéo dài không được phát hiện có thể gây thiếu máu và — đáng chú ý — bệnh lý thần kinh ngoại biên, dễ bị NHẦM LẪN với chính biến chứng thần kinh ngoại biên do tiểu đường, khiến nguyên nhân thật (thiếu B12 có thể điều trị được) bị bỏ sót.",
            treatment:
              "Nhãn thuốc chính thức khuyến cáo đo B12 định kỳ mỗi 2–3 năm cho người dùng metformin dài hạn (một số hướng dẫn khuyến cáo hàng năm nếu có yếu tố nguy cơ) — bổ sung B12 nếu thiếu, không cần ngừng metformin vì đây không phải chống chỉ định.",
            expertNote:
              "Đây là rủi ro CÓ THẬT và tương đối phổ biến (7%) nhưng lại ít được biết đến/tầm soát hơn nhiều so với nỗi sợ nhiễm toan lactic (rủi ro <0.01%) — một sự đảo ngược thú vị giữa mức độ đáng sợ được cảm nhận và mức độ rủi ro thực tế cần quan tâm.",
            application: [
              { domain: "Tầm soát định kỳ", text: "Nếu dùng metformin trên 1 năm, hỏi bác sĩ về xét nghiệm B12 định kỳ — đặc biệt quan trọng nếu xuất hiện tê bì/dị cảm tay chân mới, để phân biệt với biến chứng thần kinh do tiểu đường." },
            ],
            pitfalls: ["Cho rằng tê bì chân tay mới xuất hiện chắc chắn là biến chứng thần kinh do tiểu đường mà không tầm soát thiếu B12 — nguyên nhân do B12 có thể điều trị được hoàn toàn nếu phát hiện kịp thời."],
          },
        ],
      },
    ],
  },
  {
    id: "suythan",
    num: "02",
    icon: Filter,
    title: "Suy thận",
    subtitle: "Bệnh thận mạn, mối liên hệ với tiểu đường, điều trị đúng chuẩn",
    groups: [
      {
        label: "Cơ chế & mối liên hệ với tiểu đường",
        note: "Bệnh thận đái tháo đường là nguyên nhân hàng đầu gây suy thận giai đoạn cuối toàn cầu — kiểm soát tốt tiểu đường (tab 01) chính là biện pháp phòng ngừa thận gốc rễ mạnh nhất.",
        sections: [
          {
            heading: "Tăng lọc cầu thận — giai đoạn sớm nghịch lý dễ bị bỏ sót",
            evidence: "strong",
            mechanism:
              "Đường huyết cao kéo dài làm giãn tiểu động mạch đến cầu thận nhiều hơn tiểu động mạch đi, gây tăng áp lực và tăng LỌC cầu thận (hyperfiltration) — nghịch lý là chỉ số eGFR ở giai đoạn này có thể TĂNG (trông có vẻ tốt) trước khi bắt đầu giảm dần khi tổn thương cấu trúc tích lũy.",
            causes: "Đường huyết không kiểm soát tốt kéo dài, thường phối hợp với tăng huyết áp cùng lúc.",
            outcomes:
              "Albumin niệu (protein rò rỉ vào nước tiểu) thường xuất hiện SỚM hơn suy giảm eGFR rõ rệt — đây là dấu hiệu cảnh báo sớm quan trọng nhất, dễ bị bỏ qua nếu chỉ theo dõi eGFR/creatinine đơn thuần.",
            treatment:
              "Xét nghiệm tầm soát albumin niệu (không chỉ creatinine/eGFR) định kỳ hàng năm cho người tiểu đường, ngay cả khi chưa có triệu chứng gì — đây là xét nghiệm rẻ, đơn giản nhưng phát hiện sớm nhất.",
            expertNote:
              "Sai lầm phổ biến là chỉ yên tâm khi thấy 'eGFR bình thường' mà bỏ qua albumin niệu — ở giai đoạn sớm của bệnh thận đái tháo đường, chính albumin niệu mới là tín hiệu cảnh báo, trong khi eGFR có thể vẫn bình thường hoặc thậm chí tăng nhẹ.",
            application: [
              { domain: "Tầm soát định kỳ", text: "Nếu có tiểu đường, đảm bảo xét nghiệm albumin niệu (không chỉ creatinine máu) được thực hiện hàng năm — hỏi rõ bác sĩ nếu xét nghiệm định kỳ chưa bao gồm mục này." },
            ],
          },
          {
            heading: "Phân giai đoạn bệnh thận mạn (CKD) — hiểu đúng ý nghĩa từng mốc",
            evidence: "strong",
            mechanism:
              "Bệnh thận mạn được phân 5 giai đoạn dựa trên eGFR (từ G1: eGFR≥90 đến G5: eGFR<15, cần điều trị thay thế thận), kết hợp với mức albumin niệu (A1-A3) — hai trục này cùng quyết định nguy cơ tiến triển, không chỉ riêng eGFR.",
            causes: "—",
            outcomes:
              "Nguy cơ tiến triển đến suy thận giai đoạn cuối khác nhau rất nhiều tùy tổ hợp eGFR + albumin niệu, ngay cả ở cùng một giai đoạn eGFR danh nghĩa — người có albumin niệu cao ở cùng mức eGFR có nguy cơ tiến triển nhanh hơn nhiều so với người albumin niệu thấp/bình thường.",
            treatment: "—",
            expertNote:
              "'Suy thận' trong ngôn ngữ thông thường thường bị hiểu là một tình trạng duy nhất, trong khi thực tế là một chuỗi liên tục 5 giai đoạn — phần lớn người ở giai đoạn G1-G3a có thể sống nhiều năm ổn định nếu kiểm soát tốt các yếu tố nguy cơ, không phải tất cả đều tiến triển đến lọc máu.",
            application: null,
          },
        ],
      },
      {
        label: "Điều trị đúng chuẩn — thứ tự ưu tiên",
        sections: [
          {
            heading: "SGLT2 inhibitor — 'thay đổi cuộc chơi' trong bảo vệ thận, kể cả không có tiểu đường",
            evidence: "strong",
            mechanism:
              "Ngoài cơ chế hạ đường huyết, SGLT2 inhibitor điều biến phản hồi ống-cầu thận (tubuloglomerular feedback) làm giảm áp lực trong cầu thận, đồng thời tác động lên hệ RAAS — các cơ chế này bảo vệ cầu thận độc lập với việc có tiểu đường hay không.",
            causes: "—",
            outcomes:
              "Thử nghiệm DAPA-CKD: giảm 44% nguy cơ biến cố kết hợp (giảm eGFR bền vững, suy thận giai đoạn cuối, hoặc tử vong do thận/tim mạch) ở người bệnh thận mạn — bao gồm CẢ người KHÔNG có tiểu đường. Thử nghiệm EMPA-KIDNEY xác nhận kết quả tương tự. Đây được đánh giá là bước tiến quan trọng nhất trong điều trị bệnh thận mạn kể từ khi thuốc ức chế RAAS (ACEi/ARB) ra đời.",
            treatment:
              "Hướng dẫn KDIGO hiện khuyến cáo SGLT2 inhibitor cho bệnh thận mạn đáp ứng tiêu chí eGFR/albumin niệu phù hợp, bất kể có tiểu đường hay không — đây không còn chỉ là 'thuốc tiểu đường'.",
            expertNote:
              "Mức độ hiệu quả bảo vệ thận độc lập với tiểu đường là điều bất ngờ với chính giới chuyên môn khi dữ liệu đầu tiên công bố — gợi ý con đường SGLT2 tham gia vào cơ chế bệnh sinh chung của tổn thương thận, không chỉ riêng đường huyết cao.",
            application: [
              { domain: "Nếu có bệnh thận mạn", text: "Dù có hay không có tiểu đường, nếu được chẩn đoán bệnh thận mạn ở mức eGFR/albumin niệu phù hợp, hỏi bác sĩ cụ thể về SGLT2 inhibitor như một phần điều trị chuẩn hiện đại, không chỉ ACEi/ARB đơn thuần." },
            ],
          },
          {
            heading: "Kiểm soát huyết áp qua ức chế RAAS — nền tảng bảo vệ thận đã xác lập lâu dài",
            evidence: "strong",
            mechanism:
              "Thuốc ức chế men chuyển (ACEi) hoặc ức chế thụ thể angiotensin (ARB) làm giãn tiểu động mạch đi của cầu thận nhiều hơn tiểu động mạch đến, giảm áp lực lọc trong cầu thận — cơ chế bảo vệ trực tiếp, không chỉ nhờ hạ huyết áp toàn thân.",
            causes: "—",
            outcomes:
              "Nhóm thuốc này giảm albumin niệu và làm chậm tiến triển bệnh thận mạn qua nhiều thập kỷ bằng chứng, đặc biệt rõ rệt ở người có albumin niệu — là nền tảng điều trị đã xác lập trước cả SGLT2 inhibitor.",
            treatment:
              "Vẫn là thuốc nền tảng hàng đầu cho bệnh thận mạn có albumin niệu, thường phối hợp với SGLT2 inhibitor (2 cơ chế bổ sung nhau) thay vì thay thế lẫn nhau.",
            expertNote: "—",
            application: null,
          },
        ],
      },
      {
        label: "Chế độ ăn — sự thật gây tranh cãi",
        sections: [
          {
            heading: "Chế độ ăn ít đạm — hiệu quả có thật nhưng vẫn còn tranh cãi về mức độ",
            evidence: "contested",
            mechanism:
              "Giảm lượng đạm ăn vào làm giảm gánh nặng lọc chất thải nitơ cho thận, có thể giảm áp lực trong cầu thận — về lý thuyết làm chậm tiến triển tổn thương.",
            causes: "—",
            outcomes:
              "Bằng chứng thực sự lẫn lộn: nghiên cứu MDRD (thử nghiệm lớn nhất) không tìm thấy khác biệt rõ giữa nhóm ăn ít đạm và ăn đạm thường trong tốc độ giảm eGFR trung bình, nhưng một số nghiên cứu quan sát dài hạn khác lại thấy liên hệ giữa lượng đạm ăn vào cao hơn và nguy cơ cần điều trị thay thế thận tăng. Một review 2025 kết luận bằng chứng vẫn 'hạn chế và gây tranh cãi' dù có lý do sinh lý học hợp lý.",
            treatment:
              "Hướng dẫn KDIGO hiện khuyến cáo mức đạm khoảng 0.8g/kg/ngày cho người bệnh thận mạn chưa lọc máu (không phải ăn kiêng cực đoan <0.6g/kg như một số phác đồ cũ) — cần có chuyên gia dinh dưỡng theo dõi để tránh suy dinh dưỡng, đặc biệt ở người lớn tuổi.",
            expertNote:
              "Đây là lĩnh vực mà 'hợp lý về mặt cơ chế' và 'bằng chứng RCT rõ ràng' KHÔNG hoàn toàn khớp nhau — nguy cơ lớn nhất của việc ăn kiêng đạm quá mức không dưới sự giám sát là suy dinh dưỡng, một yếu tố tự nó cũng làm xấu tiên lượng bệnh thận mạn, nên tự ý cắt giảm đạm mạnh mà không có hướng dẫn chuyên môn có thể gây hại nhiều hơn lợi.",
            application: [
              { domain: "Thực hành an toàn", text: "Không tự ý cắt giảm đạm mạnh khi chưa có hướng dẫn từ bác sĩ/chuyên gia dinh dưỡng — mức giảm nhẹ (khoảng 0.8g/kg/ngày) có cơ sở hợp lý hơn mức cắt giảm cực đoan tự phát." },
            ],
            pitfalls: ["Tự ý ăn kiêng đạm cực đoan (theo lời truyền miệng) mà không có giám sát dinh dưỡng — nguy cơ suy dinh dưỡng có thể lớn hơn lợi ích bảo vệ thận không chắc chắn."],
          },
          {
            heading: "Thực phẩm chức năng/thuốc nam 'thải độc thận' — rủi ro thực sự, không phải chỉ 'vô hại nếu không hiệu quả'",
            evidence: "strong",
            mechanism:
              "Nhiều sản phẩm quảng cáo 'detox/bổ thận' không được kiểm định chất lượng, có thể chứa kim loại nặng, hoặc bản thân dược liệu có thể gây độc trực tiếp lên ống thận (một số loại thảo dược truyền thống đã được xác nhận gây bệnh thận do độc chất - ví dụ nhóm axit aristolochic).",
            causes: "Tâm lý muốn tìm giải pháp 'tự nhiên, an toàn' khi đối mặt chẩn đoán bệnh thận, cộng với quảng cáo thổi phồng hiệu quả.",
            outcomes:
              "Với thận đã suy giảm chức năng, khả năng đào thải độc chất/chuyển hóa thuốc kém hơn người bình thường — nghĩa là RỦI RO từ các sản phẩm không kiểm định còn CAO HƠN ở chính nhóm người có ý định dùng để 'bổ thận'.",
            treatment:
              "Luôn thông báo cho bác sĩ điều trị về BẤT KỲ thực phẩm chức năng/thuốc nam nào đang dùng hoặc định dùng, kể cả sản phẩm được quảng cáo 'thảo dược tự nhiên an toàn'.",
            expertNote:
              "Đây không phải trường hợp 'không hiệu quả nhưng vô hại' như nhiều thực phẩm chức năng khác (ví dụ glucosamine ở chủ đề khớp) — với thận đã tổn thương, đây là nhóm sản phẩm có khả năng gây hại thực sự và tương đối phổ biến trong thực hành lâm sàng thận học.",
            application: [
              { domain: "Nguyên tắc an toàn", text: "Không tự ý dùng bất kỳ thực phẩm chức năng/thuốc nam 'bổ thận, thải độc' nào mà không hỏi ý kiến bác sĩ thận học trước — đặc biệt nguy hiểm nếu đã có bệnh thận mạn từ trước." },
            ],
          },
        ],
      },
      {
        label: "Thuốc cần tránh/thận trọng — danh sách thực tế, không phải lý thuyết",
        note: "Đây là tầng nội dung có giá trị thực hành cao nhất trong toàn tab: biết TRÁNH cái gì cụ thể quan trọng không kém biết DÙNG thuốc gì.",
        sections: [
          {
            heading: "NSAID — nhóm thuốc giảm đau cần tránh hàng đầu, kể cả dùng không thường xuyên",
            evidence: "strong",
            mechanism:
              "NSAID (ibuprofen, diclofenac, meloxicam...) ức chế prostaglandin — chất có vai trò giãn tiểu động mạch đến cầu thận để duy trì lưu lượng máu thận, đặc biệt quan trọng khi thận đã tổn thương/thể tích tuần hoàn giảm. Mất cơ chế bù trừ này có thể gây giảm tưới máu thận cấp tính.",
            causes:
              "NSAID không kê đơn (mua tự do tại nhà thuốc) rất phổ biến cho đau đầu, đau cơ xương khớp — người dùng thường không biết mình có bệnh thận mạn tiềm ẩn hoặc không nhận thức được mức độ rủi ro của một nhóm thuốc tưởng chừng 'thông thường'.",
            outcomes:
              "KDIGO khuyến cáo tránh NSAID (trừ aspirin liều thấp) cho phần lớn người bệnh thận mạn. Ngay cả dùng KHÔNG THƯỜNG XUYÊN cũng có thể gây hại ở người đã có CKD — đây được xem là nhóm thuốc số một cần tránh trong danh sách thuốc gây hại thận.",
            treatment:
              "Dùng paracetamol/acetaminophen liều thấp nhất có hiệu quả thay cho NSAID để giảm đau thông thường. Nếu thực sự cần NSAID (đau do viêm rõ rệt không đáp ứng paracetamol), phải hỏi ý kiến bác sĩ trước, không tự mua dùng.",
            expertNote:
              "Một phát hiện thú vị gần đây: SGLT2 inhibitor (đã nêu ở mục điều trị chuẩn) có liên quan đến giảm nguy cơ tổn thương thận cấp do NSAID gây ra so với nhóm thuốc tiểu đường khác — thêm một lý do ủng hộ vai trò bảo vệ đa chiều của nhóm thuốc này, dù đây không có nghĩa là 'có SGLT2 thì dùng NSAID thoải mái'.",
            application: [
              { domain: "Quy tắc đơn giản", text: "Nếu có bệnh thận mạn, mặc định KHÔNG tự mua NSAID (ibuprofen, diclofenac...) tại nhà thuốc — dùng paracetamol cho đau thông thường, hỏi bác sĩ nếu cần thuốc giảm đau mạnh hơn." },
            ],
          },
          {
            heading: "Thuốc cản quang khi chụp CT/chụp mạch — cần báo trước cho bác sĩ chẩn đoán hình ảnh",
            evidence: "moderate",
            mechanism:
              "Thuốc cản quang chứa iod dùng trong CT/chụp mạch có thể gây độc trực tiếp lên tế bào ống thận và ảnh hưởng huyết động học thận, đặc biệt ở người có eGFR đã giảm (nguy cơ tăng rõ khi eGFR dưới 30).",
            causes: "—",
            outcomes:
              "Tổn thương thận cấp liên quan thuốc cản quang là nguyên nhân gây suy thận cấp trong bệnh viện được ghi nhận rõ, đặc biệt ở người có sẵn bệnh thận mạn, đái tháo đường, hoặc mất nước.",
            treatment:
              "Luôn thông báo cho bác sĩ chẩn đoán hình ảnh/bác sĩ điều trị về tình trạng bệnh thận TRƯỚC khi chụp có cản quang — có thể cần bù đủ dịch trước/sau thủ thuật, chọn loại thuốc cản quang ít độc hơn, hoặc cân nhắc phương pháp chẩn đoán hình ảnh thay thế không cần cản quang nếu có thể. Metformin thường cần tạm ngừng quanh thời điểm chụp cản quang (xem tab Tiểu đường).",
            expertNote: "—",
            application: [
              { domain: "Trước khi chụp", text: "Chủ động báo cho kỹ thuật viên/bác sĩ chẩn đoán hình ảnh về tình trạng bệnh thận mạn hoặc tiểu đường của mình trước khi chụp CT/chụp mạch có tiêm thuốc cản quang, ngay cả khi không được hỏi." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hovantim",
    num: "03",
    icon: HeartPulse,
    title: "Hở van tim",
    subtitle: "Cơ chế, thời điểm can thiệp, vận động an toàn",
    groups: [
      {
        label: "Cơ chế & phân loại",
        sections: [
          {
            heading: "Hở van tim là gì — và vì sao mức độ nặng-nhẹ quan trọng hơn tên bệnh",
            evidence: "strong",
            mechanism:
              "Van tim (thường gặp nhất: van hai lá, van động mạch chủ) đóng không kín khiến một phần máu trào ngược lại buồng tim phía trước thay vì chảy một chiều theo đúng chu trình — tim phải bơm nhiều hơn để bù, dần dần gây giãn buồng tim nếu hở nặng kéo dài.",
            causes:
              "Thoái hóa theo tuổi (nguyên nhân phổ biến nhất ở nước phát triển), sa van hai lá bẩm sinh, thấp tim (từng phổ biến, vẫn còn ở một số khu vực), hoặc hở van 'chức năng' thứ phát sau giãn buồng tim do nguyên nhân khác (ví dụ suy tim).",
            outcomes:
              "Hơn 70% người trên 65 tuổi có MỘT DẠNG bất thường van tim nào đó khi siêu âm tầm soát — phần lớn là NHẸ và không có ý nghĩa lâm sàng. Chỉ hở van mức độ vừa-nặng mới cần theo dõi/can thiệp tích cực.",
            treatment: "—",
            expertNote:
              "Nghe chẩn đoán 'hở van tim' dễ gây hoảng sợ, nhưng cần phân biệt rõ mức độ (nhẹ/vừa/nặng) trước khi lo lắng — tương tự tinh thần 'MRI dương tính không đồng nghĩa nghiêm trọng' ở chủ đề thoát vị đĩa đệm, chẩn đoán hình ảnh phát hiện nhiều bất thường không có ý nghĩa lâm sàng.",
            application: [
              { domain: "Đọc kết quả siêu âm tim", text: "Hỏi rõ bác sĩ mức độ hở van cụ thể (nhẹ/vừa/nặng) và chức năng tim đi kèm (phân suất tống máu, kích thước buồng tim) thay vì chỉ dừng ở việc biết 'có hở van'." },
            ],
          },
        ],
      },
      {
        label: "Theo dõi vs can thiệp — thời điểm phẫu thuật",
        sections: [
          {
            heading: "Theo dõi chủ động (Watchful waiting) cho hở van nặng chưa triệu chứng — vẫn còn tranh cãi về thời điểm tối ưu",
            evidence: "contested",
            mechanism:
              "Với hở van nặng nhưng CHƯA có triệu chứng và chức năng tim còn tốt, có 2 chiến lược cạnh tranh: theo dõi định kỳ bằng siêu âm tim, chỉ mổ khi đạt tiêu chí cụ thể (triệu chứng xuất hiện, buồng tim giãn quá ngưỡng, chức năng tim giảm) — VS. mổ sớm chủ động trước khi đạt các ngưỡng đó, đặc biệt nếu khả năng sửa van (thay vì thay van) cao.",
            causes: "—",
            outcomes:
              "Nghiên cứu theo dõi chủ động cho thấy chiến lược này AN TOÀN — sống còn không khác biệt so với kỳ vọng dân số chung nếu tuân thủ đúng lịch tái khám và tiêu chí chuyển mổ. Tuy nhiên, một số meta-analysis quan sát khác lại cho thấy mổ sớm chủ động liên quan đến sống còn dài hạn và tỷ lệ sửa van thành công cao hơn — dù dữ liệu chủ yếu từ nghiên cứu quan sát (không phải RCT), nên có thể bị nhiễu bởi việc trung tâm mổ sớm thường là trung tâm chuyên sâu có kỹ năng phẫu thuật tốt hơn.",
            treatment:
              "Quyết định phụ thuộc nhiều vào chất lượng trung tâm phẫu thuật (khả năng sửa van thành công cao hay chỉ có thể thay van) — đây là lý do hướng dẫn hiện đại nhấn mạnh vai trò của 'Heart Team' và trung tâm có kinh nghiệm khi cân nhắc mổ sớm.",
            expertNote:
              "Cả 2 chiến lược đều có dữ liệu ủng hộ hợp lý — đây thực sự là vùng xám của y học tim mạch hiện đại, không phải trường hợp có một câu trả lời đúng duy nhất. Quyết định cá nhân hóa dựa trên tuổi, chất lượng trung tâm phẫu thuật, và mức độ chấp nhận rủi ro của từng người là hợp lý hơn một quy tắc cứng áp dụng chung.",
            application: [
              { domain: "Nếu được chẩn đoán hở van nặng chưa triệu chứng", text: "Hỏi cụ thể về tỷ lệ thành công sửa van (không chỉ thay van) tại trung tâm đang theo dõi — đây là yếu tố quan trọng ảnh hưởng đến quyết định mổ sớm hay theo dõi tiếp." },
            ],
          },
          {
            heading: "Nghiệm pháp gắng sức định kỳ — công cụ phát hiện sớm thời điểm cần can thiệp",
            evidence: "moderate",
            mechanism:
              "Với người hở van nặng chưa triệu chứng khi nghỉ, nghiệm pháp gắng sức (đi bộ trên thảm lăn có theo dõi) có thể bộc lộ triệu chứng ẩn hoặc đáp ứng huyết áp bất thường chưa biểu hiện lúc nghỉ ngơi — cung cấp tín hiệu sớm hơn để cân nhắc can thiệp.",
            causes: "—",
            outcomes:
              "Nghiên cứu tiến cứu trên người hẹp van động mạch chủ nặng chưa triệu chứng: nghiệm pháp gắng sức hàng năm phát hiện an toàn thời điểm khởi phát triệu chứng hoặc đáp ứng huyết áp bất thường, giúp chuyển kịp thời sang phẫu thuật mà không ghi nhận trường hợp đột tử nào trong quá trình theo dõi bằng phương pháp này.",
            treatment:
              "Có thể đề xuất nghiệm pháp gắng sức định kỳ (thường hàng năm) như một phần chiến lược theo dõi chủ động, đặc biệt hữu ích để phát hiện 'triệu chứng ẩn' mà người bệnh có thể đã vô thức điều chỉnh lối sống để né tránh (giảm hoạt động dần mà không nhận ra).",
            expertNote:
              "Nhiều người tự điều chỉnh giảm hoạt động thể chất dần dần theo thời gian mà không ý thức được đó là do bệnh tim tiến triển ('tôi vẫn ổn, chỉ là dạo này lười vận động hơn') — nghiệm pháp gắng sức khách quan hóa điều này, tránh phụ thuộc hoàn toàn vào cảm nhận chủ quan vốn có thể bị đánh lừa bởi sự thích nghi từ từ.",
            application: [
              { domain: "Thảo luận với bác sĩ tim mạch", text: "Nếu đang trong giai đoạn theo dõi chủ động hở van nặng chưa triệu chứng, hỏi về việc đưa nghiệm pháp gắng sức vào lịch tái khám định kỳ hàng năm." },
            ],
          },
        ],
      },
      {
        label: "Vận động & phòng ngừa biến chứng",
        sections: [
          {
            heading: "Vận động với hở van tim — an toàn hơn nhiều người nghĩ, nếu đúng mức độ",
            evidence: "moderate",
            mechanism:
              "Với hở van nhẹ-vừa và chức năng tim còn bảo tồn, vận động thể lực cường độ phù hợp không đẩy nhanh tiến triển bệnh và mang lại lợi ích tim mạch-thể chất chung như ở người không có bệnh van tim — cơ thể có khả năng thích nghi hoạt động ở cường độ vừa phải.",
            causes:
              "Tâm lý sợ hãi phổ biến 'có bệnh tim phải kiêng vận động hoàn toàn' — hợp lý về trực giác nhưng không khớp với khuyến cáo y học hiện đại cho phần lớn trường hợp hở van nhẹ-vừa.",
            outcomes:
              "Hạn chế vận động quá mức không cần thiết dẫn đến hậu quả tương tự kinh điển ở các bệnh mạn tính khác (xem tab Thoát vị đĩa đệm/Khớp): giảm thể lực, tăng cân, mất khối cơ — tự nó lại làm tăng gánh nặng cho tim khi phải hoạt động.",
            treatment:
              "Với hở van nhẹ-vừa, chức năng tim bảo tồn: vận động cường độ vừa phải nói chung an toàn, nên tham vấn bác sĩ tim mạch để biết giới hạn cụ thể cá nhân (không phải để bị cấm vận động hoàn toàn). Với hở van nặng có triệu chứng hoặc chức năng tim giảm, cần đánh giá cá nhân hóa kỹ hơn, có thể cần giới hạn cường độ cao/thi đấu.",
            expertNote:
              "Nguyên tắc chung xuyên suốt 3 chủ đề của file này (giống mẫu số chung ở file Thoát vị đĩa đệm): cơ thể được thiết kế để vận động và thích nghi; sợ hãi quá mức dẫn đến bất động thường gây hại nhiều hơn bản thân bệnh lý nền, miễn là đã được đánh giá đúng mức độ nặng-nhẹ trước.",
            application: [
              { domain: "Thực hành", text: "Không tự ý ngừng hoàn toàn vận động chỉ vì biết mình có hở van — hỏi bác sĩ tim mạch về mức độ/loại vận động phù hợp cụ thể với tình trạng của mình, thay vì mặc định phải kiêng cữ tuyệt đối." },
            ],
          },
          {
            heading: "Kháng sinh dự phòng viêm nội tâm mạc trước thủ thuật nha khoa — hướng dẫn đã thay đổi, và vẫn đang gây tranh cãi",
            evidence: "contested",
            mechanism:
              "Giả thuyết truyền thống: vi khuẩn từ khoang miệng vào máu trong lúc thủ thuật nha khoa có thể bám vào van tim bất thường, gây viêm nội tâm mạc nhiễm khuẩn — kháng sinh dự phòng nhằm ngăn vi khuẩn bám dính.",
            causes:
              "Hướng dẫn từ 2007 (AHA) trở đi đã THU HẸP đáng kể chỉ định dùng kháng sinh dự phòng, chỉ còn áp dụng cho nhóm nguy cơ CAO NHẤT (van nhân tạo, tiền sử viêm nội tâm mạc, một số bệnh tim bẩm sinh) — hở van hai lá/động mạch chủ thông thường (không phải van nhân tạo) KHÔNG còn thuộc diện cần dự phòng thường quy, do bằng chứng hiệu quả yếu và lo ngại kháng kháng sinh.",
            outcomes:
              "Đây là chủ đề còn tranh cãi thực sự: một số nghiên cứu dịch tễ sau khi hướng dẫn thu hẹp chỉ định ghi nhận TĂNG nhẹ tỷ lệ viêm nội tâm mạc do liên cầu khoang miệng ở nhóm nguy cơ trung bình (không còn được dự phòng), nhưng nghiên cứu khác lại không tìm thấy mối liên hệ nhân quả rõ ràng với thay đổi hướng dẫn, và nguyên nhân có thể đến từ nhiều yếu tố khác (dân số già hóa, tăng thủ thuật xâm lấn tim mạch...).",
            treatment:
              "Tuân theo hướng dẫn hiện hành của bác sĩ tim mạch/nha khoa về việc có cần kháng sinh dự phòng hay không dựa trên loại bệnh van tim cụ thể — không tự ý yêu cầu hoặc từ chối kháng sinh dựa trên thông tin cũ hoặc truyền miệng.",
            expertNote:
              "Đây là ví dụ hiếm hoi trong y học nơi một hướng dẫn thay đổi lớn (thu hẹp chỉ định) vẫn đang được đánh giá lại nhiều năm sau vì dữ liệu dịch tễ học hậu-thay-đổi gây tranh cãi — khác với các trường hợp debunk dứt khoát khác trong loạt tài liệu này (như squat lifting hay tư thế ngồi), đây vẫn là câu hỏi mở thực sự trong y văn hiện tại.",
            application: [
              { domain: "Trước khi đi nha khoa", text: "Nếu có hở van tim, hỏi rõ bác sĩ tim mạch xem tình trạng cụ thể của mình có thuộc nhóm cần kháng sinh dự phòng trước thủ thuật nha khoa hay không — đừng tự suy đoán dựa trên thông tin cũ hoặc lời khuyên truyền miệng." },
            ],
          },
        ],
      },
      {
        label: "Nguồn gốc hay bị bỏ qua & công nghệ can thiệp mới",
        note: "Ở các nước đang phát triển như Việt Nam, một nguyên nhân gây hở van tim vẫn còn phổ biến hơn nhiều so với ở phương Tây — và công nghệ điều trị cũng đã có thêm lựa chọn ngoài mổ mở truyền thống.",
        sections: [
          {
            heading: "Thấp tim (Rheumatic Heart Disease) — nguyên nhân có thể phòng ngừa hoàn toàn, vẫn còn phổ biến ở khu vực Đông Nam Á",
            evidence: "strong",
            mechanism:
              "Thấp tim là hậu quả muộn của sốt thấp khớp cấp (acute rheumatic fever) — phản ứng miễn dịch bất thường sau nhiễm liên cầu khuẩn nhóm A ở họng (viêm họng liên cầu) không được điều trị đầy đủ, khiến hệ miễn dịch tấn công nhầm vào mô van tim (chủ yếu van hai lá) do có cấu trúc phân tử tương tự vi khuẩn.",
            causes:
              "Viêm họng do liên cầu khuẩn không được chẩn đoán/điều trị kháng sinh đầy đủ, thường ở trẻ em/thanh thiếu niên; các yếu tố nguy cơ xã hội như nhà ở chật chội, tiếp cận y tế hạn chế làm tăng nguy cơ.",
            outcomes:
              "Đông Nam Á vẫn là khu vực có gánh nặng thấp tim đáng kể dù xu hướng đang giảm dần nhờ cải thiện chẩn đoán/điều trị — khác biệt rõ với các nước phát triển nơi nguyên nhân hở van chủ yếu là thoái hóa theo tuổi. Đây là lý do bệnh nhân hở van tim ở Việt Nam có thể trẻ tuổi hơn đáng kể so với hình dung 'bệnh người già' phổ biến ở tài liệu y khoa phương Tây.",
            treatment:
              "Phòng ngừa hoàn toàn được bằng cách điều trị đúng kháng sinh (thường là penicillin) cho viêm họng do liên cầu khuẩn ở trẻ em. Người đã có thấp tim cần dự phòng thứ phát bằng kháng sinh dài hạn (tiêm hoặc uống định kỳ) để ngăn tái phát đợt sốt thấp khớp mới gây tổn thương van thêm.",
            expertNote:
              "Đây là một trong số ít bệnh van tim có thể PHÒNG NGỪA HOÀN TOÀN ở gốc rễ (khác hẳn thoái hóa van do tuổi tác — không thể ngăn) — chương trình phòng ngừa có tổ chức (như mô hình đã triển khai thành công ở Cuba) đã chứng minh giảm đáng kể tỷ lệ mắc mới trong vòng một thập kỷ.",
            application: [
              { domain: "Phòng ngừa ở trẻ em", text: "Đưa trẻ đi khám và điều trị đầy đủ kháng sinh khi có viêm họng nghi do liên cầu khuẩn (sốt, đau họng, amidan sưng đỏ có mủ) — không tự ý ngừng kháng sinh giữa chừng dù trẻ đã hết sốt." },
              { domain: "Nếu đã có thấp tim", text: "Tuân thủ nghiêm ngặt lịch dự phòng thứ phát bằng kháng sinh dài hạn theo chỉ định bác sĩ — đây là biện pháp hiệu quả nhất ngăn tổn thương van tiến triển nặng thêm." },
            ],
          },
          {
            heading: "Can thiệp qua da (TEER/MitraClip) — lựa chọn mới cho người không đủ điều kiện mổ mở",
            evidence: "moderate",
            mechanism:
              "Kỹ thuật TEER (Transcatheter Edge-to-Edge Repair, phổ biến nhất là hệ thống MitraClip) đưa một kẹp nhỏ qua ống thông từ tĩnh mạch đùi đến van hai lá, kẹp hai mép lá van lại gần nhau tại điểm hở nhiều nhất — dựa trên nguyên lý phẫu thuật Alfieri nhưng thực hiện qua da, không cần mở lồng ngực.",
            causes: "—",
            outcomes:
              "Kết quả khác nhau tùy loại hở van: với hở van 'chức năng' (do giãn tim từ nguyên nhân khác, không phải bệnh tại van), thử nghiệm COAPT (Mỹ) cho kết quả tích cực rõ — giảm nhập viện vì suy tim và cải thiện sống còn ở người đã được điều trị nội khoa tối ưu. Ngược lại, thử nghiệm MITRA-FR (Pháp) trên nhóm bệnh nhân hở van chức năng tương tự lại KHÔNG cho thấy lợi ích rõ rệt — sự khác biệt được cho là do khác nhau về mức độ hở van tương đối so với kích thước buồng tim và mức độ điều trị nội khoa nền trước khi can thiệp.",
            treatment:
              "TEER được chỉ định chủ yếu cho người hở van nặng có triệu chứng nhưng nguy cơ phẫu thuật mổ mở quá cao (tuổi cao, nhiều bệnh nền, thể trạng yếu) — không phải lựa chọn thay thế mổ mở cho người đủ điều kiện phẫu thuật với hở van nguyên phát do bất thường cấu trúc van, nơi mổ sửa van vẫn là tiêu chuẩn vàng.",
            expertNote:
              "Sự khác biệt kết quả giữa COAPT và MITRA-FR là một trong những bài học phương pháp luận quan trọng của tim mạch học can thiệp thập kỷ qua: cùng một kỹ thuật, cùng một nhóm bệnh (hở van chức năng), nhưng tiêu chí chọn bệnh nhân khác nhau (mức độ hở van so với kích thước tim, mức tối ưu hóa điều trị nội khoa trước can thiệp) dẫn đến kết luận trái ngược — nhấn mạnh rằng lựa chọn đúng bệnh nhân quan trọng ngang hoặc hơn bản thân kỹ thuật.",
            application: [
              { domain: "Nếu được đề xuất TEER/MitraClip", text: "Hỏi rõ bác sĩ tim mạch mình thuộc nhóm hở van nguyên phát (do bất thường tại van) hay chức năng (do giãn tim), và liệu đã được tối ưu hóa điều trị nội khoa trước khi cân nhắc thủ thuật này hay chưa — đây là yếu tố quyết định khả năng thành công theo dữ liệu COAPT/MITRA-FR." },
            ],
          },
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------------
   PRACTICES — Actionable, flat list gộp 3 chủ đề
--------------------------------------------------------------- */
const LEV_RANK = { high: 0, moderate: 1, low: 2 };
const EVID_RANK = { strong: 0, moderate: 1, contested: 2 };

const PRACTICES = [
  // Tiểu đường
  { pillar: "Tiểu đường", leverage: "high", text: "Nếu mới chẩn đoán (trong vòng vài năm) và thừa cân, hỏi bác sĩ về chương trình giảm cân có cấu trúc nhắm mục tiêu thuyên giảm", why: "Thử nghiệm DiRECT: 46% đạt thuyên giảm (không cần thuốc) sau 1 năm; 86% ở nhóm giảm được ≥15kg — tiểu đường type 2 không còn được xem là bản án vĩnh viễn ở giai đoạn sớm." },
  { pillar: "Tiểu đường", leverage: "high", text: "Ưu tiên giảm tổng calo/hướng tới giảm cân trước khi ám ảnh loại bỏ hoàn toàn 'đường' như một nhóm thực phẩm", why: "Cơ chế nền là mỡ tích tụ tại gan/tụy, không chỉ do lượng đường ăn vào — kiêng khem cực đoan dễ bỏ cuộc và có đòn bẩy thấp hơn giảm cân tổng thể." },
  { pillar: "Tiểu đường", leverage: "high", text: "Nếu có tiểu đường kèm bệnh tim mạch/dấu hiệu bệnh thận, hỏi bác sĩ về việc thêm SGLT2/GLP-1 sớm, không chỉ chờ metformin không đủ", why: "Các thuốc này có lợi ích bảo vệ tim-thận độc lập với hạ đường huyết, xác nhận qua nhiều thử nghiệm tim mạch/thận lớn." },
  { pillar: "Tiểu đường", leverage: "moderate", text: "Hỏi rõ mục tiêu HbA1c cá nhân của mình và lý do, thay vì mặc định một con số chung", why: "Kiểm soát quá chặt ở người lớn tuổi/nhiều bệnh nền từng cho thấy tăng tử vong (ACCORD) do nguy cơ hạ đường huyết — mục tiêu cần cá nhân hóa." },
  { pillar: "Tiểu đường", leverage: "moderate", text: "Nếu dùng metformin >1 năm, hỏi bác sĩ về xét nghiệm B12 định kỳ, đặc biệt nếu có tê bì tay chân mới", why: "~7% người dùng metformin dài hạn giảm B12 dưới ngưỡng bình thường — dễ bị nhầm với biến chứng thần kinh do tiểu đường, trong khi thiếu B12 điều trị được hoàn toàn." },
  { pillar: "Tiểu đường", leverage: "low", text: "Hoảng sợ/tự ý ngừng metformin vì lo nhiễm toan lactic khi chức năng thận vẫn còn tốt/giảm nhẹ", why: "Tỷ lệ thực tế <0.01%, hầu như chỉ xảy ra khi có yếu tố nguy cơ rõ (suy thận nặng, thiếu oxy mô cấp) — chỉ cần tạm ngừng đúng lúc (chụp cản quang, phẫu thuật lớn, bệnh cấp nặng), không cần lo lắng thường trực." },

  // Suy thận
  { pillar: "Suy thận & tiểu đường", leverage: "high", text: "Nếu có tiểu đường, đảm bảo xét nghiệm albumin niệu (không chỉ creatinine) được làm hàng năm", why: "Albumin niệu thường xuất hiện SỚM hơn suy giảm eGFR rõ rệt — dấu hiệu cảnh báo sớm nhất của bệnh thận đái tháo đường, dễ bị bỏ sót nếu chỉ theo dõi eGFR." },
  { pillar: "Suy thận & tiểu đường", leverage: "high", text: "Nếu được chẩn đoán bệnh thận mạn (có hay không có tiểu đường), hỏi bác sĩ về SGLT2 inhibitor như một phần điều trị chuẩn hiện đại", why: "DAPA-CKD: giảm 44% nguy cơ biến cố kết hợp (kể cả ở người KHÔNG tiểu đường) — đánh giá là bước tiến quan trọng nhất trong điều trị CKD kể từ ACEi/ARB." },
  { pillar: "Suy thận & tiểu đường", leverage: "moderate", text: "Không tự ý ăn kiêng đạm cực đoan khi chưa có hướng dẫn từ bác sĩ/chuyên gia dinh dưỡng", why: "Bằng chứng hiệu quả của ăn ít đạm còn tranh cãi (MDRD không thấy khác biệt rõ); nguy cơ suy dinh dưỡng từ cắt giảm cực đoan có thể lớn hơn lợi ích không chắc chắn." },
  { pillar: "Suy thận & tiểu đường", leverage: "low", text: "Tự ý dùng thực phẩm chức năng/thuốc nam quảng cáo 'thải độc/bổ thận' mà không hỏi bác sĩ", why: "Thận đã suy giảm chức năng đào thải kém hơn — rủi ro từ sản phẩm không kiểm định (kim loại nặng, độc chất trực tiếp lên ống thận) cao hơn ở chính nhóm người có ý định dùng." },
  { pillar: "Suy thận & tiểu đường", leverage: "high", text: "Nếu có bệnh thận mạn, mặc định KHÔNG tự mua NSAID (ibuprofen, diclofenac...) tại nhà thuốc — dùng paracetamol thay thế", why: "KDIGO xếp NSAID là nhóm thuốc số một cần tránh cho CKD; ngay cả dùng không thường xuyên cũng có thể gây tổn thương thận cấp do mất cơ chế bù trừ tưới máu cầu thận." },
  { pillar: "Suy thận & tiểu đường", leverage: "moderate", text: "Chủ động báo cho bác sĩ chẩn đoán hình ảnh về bệnh thận mạn/tiểu đường TRƯỚC khi chụp CT/chụp mạch có thuốc cản quang", why: "Thuốc cản quang là nguyên nhân gây suy thận cấp trong bệnh viện được ghi nhận rõ, đặc biệt khi eGFR dưới 30 — cần bù dịch/điều chỉnh trước thủ thuật." },

  // Hở van tim
  { pillar: "Hở van tim", leverage: "high", text: "Khi có kết quả siêu âm tim 'hở van', hỏi rõ mức độ cụ thể (nhẹ/vừa/nặng) và chức năng tim đi kèm thay vì chỉ biết 'có hở van'", why: "Hơn 70% người trên 65 tuổi có bất thường van tim khi tầm soát — phần lớn nhẹ, không có ý nghĩa lâm sàng; hoảng loạn không cần thiết nếu không phân biệt mức độ." },
  { pillar: "Hở van tim", leverage: "high", text: "Không tự ý ngừng hoàn toàn vận động chỉ vì biết mình có hở van — hỏi bác sĩ tim mạch mức độ/loại vận động phù hợp cụ thể", why: "Với hở van nhẹ-vừa, chức năng tim bảo tồn, vận động cường độ phù hợp an toàn và có lợi; bất động quá mức gây hại tương tự các bệnh mạn tính khác." },
  { pillar: "Hở van tim", leverage: "moderate", text: "Nếu đang theo dõi chủ động hở van nặng chưa triệu chứng, hỏi về nghiệm pháp gắng sức định kỳ hàng năm", why: "Giúp phát hiện triệu chứng ẩn/đáp ứng huyết áp bất thường mà bản thân có thể đã vô thức thích nghi bằng cách giảm hoạt động dần." },
  { pillar: "Hở van tim", leverage: "moderate", text: "Trước thủ thuật nha khoa, hỏi bác sĩ tim mạch xem tình trạng van tim cụ thể có cần kháng sinh dự phòng hay không", why: "Hướng dẫn đã thu hẹp đáng kể từ 2007, chỉ nhóm nguy cơ cao nhất (van nhân tạo, tiền sử viêm nội tâm mạc) mới cần — nhưng vẫn là chủ đề tranh cãi, không tự suy đoán theo thông tin cũ." },
  { pillar: "Hở van tim", leverage: "high", text: "Đưa trẻ đi khám và điều trị đầy đủ kháng sinh khi có viêm họng nghi do liên cầu khuẩn, không tự ý ngừng giữa chừng dù đã hết sốt", why: "Thấp tim (nguyên nhân hở van vẫn phổ biến ở Đông Nam Á, khác thoái hóa theo tuổi ở phương Tây) là một trong số ít bệnh van tim phòng ngừa HOÀN TOÀN được ở gốc rễ." },
  { pillar: "Hở van tim", leverage: "moderate", text: "Nếu được đề xuất TEER/MitraClip, hỏi rõ mình thuộc nhóm hở van nguyên phát hay chức năng, và đã tối ưu điều trị nội khoa trước đó chưa", why: "Khác biệt COAPT (tích cực) vs MITRA-FR (không rõ lợi ích) cho cùng kỹ thuật trên hở van chức năng — lựa chọn đúng bệnh nhân quan trọng ngang hoặc hơn bản thân kỹ thuật." },
];

/* ---------------------------------------------------------------
   PILLAR VIEW
--------------------------------------------------------------- */
function PillarView({ pillar }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <span style={{ fontFamily: mono, color: C.goldDim, fontSize: 13 }}>{pillar.num}</span>
        <h2 style={{ fontFamily: serif, color: C.ink, fontSize: 26 }}>{pillar.title}</h2>
        <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 12 }}>— {pillar.subtitle}</span>
      </div>
      <Legend kind="evidence" />
      {pillar.groups.map((g, gi) => (
        <div key={gi} className="flex flex-col gap-2">
          <div style={{ fontFamily: mono, color: C.inkDim, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mt-1">
            {g.label}
          </div>
          <GroupNote note={g.note} />
          {[...g.sections]
            .map((s, idx) => ({ s, idx }))
            .sort((a, b) => (EVID_RANK[a.s.evidence] - EVID_RANK[b.s.evidence]) || (a.idx - b.idx))
            .map(({ s }, i) => (
              <SectionCard key={i} s={s} />
            ))}
        </div>
      ))}
      <GlossarySection pillarId={pillar.id} />
    </div>
  );
}

/* ---------------------------------------------------------------
   ACTIONABLE — CaseBox, LazyBox, groups, ThanChu
--------------------------------------------------------------- */
function MedicalNote({ items }) {
  return (
    <div className="flex flex-col gap-2.5 mt-2 p-3 rounded-md" style={{ background: "rgba(241,101,101,0.08)", border: `1px solid ${C.red}` }}>
      <div className="flex items-center gap-2">
        <span style={{ color: C.red, fontSize: 14 }}>⚕</span>
        <span style={{ fontFamily: mono, color: C.red, fontSize: 11, letterSpacing: "0.05em" }} className="uppercase">
          Cần đi khám / tham khảo bác sĩ trước
        </span>
      </div>
      <div className="flex flex-col gap-2 pl-1">
        {items.map((text, i) => (
          <div key={i} className="flex gap-2">
            <span style={{ color: C.red, fontSize: 12 }} className="shrink-0 mt-0.5">•</span>
            <p style={{ fontFamily: serif, color: C.ink, fontSize: 12.5, lineHeight: 1.55 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStage({ num, title, children }) {
  return (
    <div className="flex flex-col gap-2 pb-4 mb-1" style={{ borderBottom: `1px solid ${C.line}` }}>
      <div className="flex items-baseline gap-2">
        <span style={{ fontFamily: mono, color: C.teal, fontSize: 11.5 }}>GIAI ĐOẠN {num}</span>
        <span style={{ fontFamily: serif, color: C.ink, fontSize: 15, fontWeight: 600 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function CaseBullet({ children }) {
  return (
    <div className="flex gap-2">
      <span style={{ color: C.teal, fontSize: 13, lineHeight: 1.6 }} className="shrink-0">▸</span>
      <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13.5, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

function CaseBox() {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-md overflow-hidden" style={{ background: "rgba(67,184,174,0.06)", border: `1px solid ${C.teal}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left">
        <div>
          <div style={{ fontFamily: mono, color: C.teal, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mb-1">
            Case thực hành · xuyên 3 chủ đề
          </div>
          <span style={{ fontFamily: serif, color: C.ink, fontSize: 16.5, fontWeight: 600 }}>
            Mới chẩn đoán tiểu đường type 2, có protein niệu nhẹ, phát hiện tình cờ hở van hai lá nhẹ
          </span>
        </div>
        {open ? <ChevronUp size={18} color={C.teal} className="shrink-0" /> : <ChevronDown size={18} color={C.teal} className="shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13, lineHeight: 1.6, fontStyle: "italic", marginTop: 10 }}>
            Tình huống rất phổ biến ở người trung niên: khám sức khỏe định kỳ phát hiện cùng lúc nhiều chỉ số bất thường — dễ hoảng loạn nếu không hiểu chúng liên kết với nhau thế nào.
          </p>

          <CaseStage num="1" title="Hiểu đúng gốc rễ chung trước khi hoảng loạn từng chỉ số riêng lẻ">
            <CaseBullet>Tiểu đường không kiểm soát tốt là NGUYÊN NHÂN gốc rễ có thể gây ra cả protein niệu (bệnh thận đái tháo đường giai đoạn sớm) — kiểm soát tốt đường huyết từ bây giờ là biện pháp phòng ngừa thận mạnh nhất, không chỉ 'chuyện của thận'.</CaseBullet>
            <CaseBullet>Hở van hai lá NHẸ phát hiện tình cờ ở người trung niên rất phổ biến (hơn 70% người trên 65 tuổi có bất thường van tim nào đó) — phần lớn không liên quan trực tiếp đến tiểu đường và không cần can thiệp, chỉ cần biết để theo dõi định kỳ.</CaseBullet>
          </CaseStage>

          <CaseStage num="2" title="Ưu tiên hành động cao nhất: nhắm mục tiêu thuyên giảm tiểu đường">
            <CaseBullet><b style={{ color: C.ink }}>Nếu mới chẩn đoán và thừa cân:</b> hỏi bác sĩ về chương trình giảm cân có cấu trúc nhắm thuyên giảm — đây là can thiệp có đòn bẩy cao nhất, tác động tích cực đồng thời lên cả nguy cơ thận VÀ tim mạch, không chỉ đường huyết.</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Ưu tiên tổng calo/giảm cân</b> trước khi ám ảnh kiêng 'đường' như một nhóm thực phẩm đơn lẻ.</CaseBullet>
          </CaseStage>

          <CaseStage num="3" title="Xây dựng lại: theo dõi đúng chỉ số, đúng chu kỳ">
            <CaseBullet><b style={{ color: C.ink }}>Thận:</b> đảm bảo albumin niệu (không chỉ creatinine) được xét nghiệm hàng năm — đây là dấu hiệu cảnh báo sớm nhất, xuất hiện trước khi eGFR giảm rõ.</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Tim:</b> siêu âm tim định kỳ theo lịch bác sĩ hẹn (thường 1–2 năm/lần cho hở van nhẹ) — không cần lo lắng giữa các lần khám nếu mức độ vẫn nhẹ.</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Vận động:</b> không cần kiêng cữ vì hở van nhẹ — vận động đều đặn còn có lợi cho cả kiểm soát đường huyết lẫn sức khỏe tim mạch tổng thể.</CaseBullet>
          </CaseStage>

          <CaseStage num="4" title="Khi nào cần chuyên môn sâu hơn — không tự xử lý tiếp">
            <CaseBullet>Protein niệu tăng dần qua các lần xét nghiệm, hoặc eGFR bắt đầu giảm rõ rệt.</CaseBullet>
            <CaseBullet>Hở van từ nhẹ chuyển sang vừa/nặng qua các lần siêu âm theo dõi, hoặc xuất hiện triệu chứng (khó thở, mệt khi gắng sức trước đây không có).</CaseBullet>
            <MedicalNote
              items={[
                "Protein niệu tăng dần hoặc eGFR giảm rõ → hỏi bác sĩ thận học về SGLT2 inhibitor và tối ưu kiểm soát huyết áp (ACEi/ARB) — không tự ý dùng thực phẩm chức năng 'bổ thận'.",
                "Có tiểu đường kèm dấu hiệu tim mạch/thận → hỏi bác sĩ về việc thêm SGLT2/GLP-1 sớm trong phác đồ, không chỉ chờ metformin không đủ.",
                "Hở van chuyển độ nặng hơn hoặc có triệu chứng mới → cần bác sĩ tim mạch đánh giá lại thời điểm can thiệp, không tự theo dõi tại nhà.",
                "Trước bất kỳ thủ thuật nha khoa/xâm lấn nào → hỏi bác sĩ tim mạch xem có cần kháng sinh dự phòng viêm nội tâm mạc dựa trên tình trạng van cụ thể hay không.",
              ]}
            />
          </CaseStage>
        </div>
      )}
    </div>
  );
}

function LazyGroup({ title, sub, color, items }) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span style={{ fontFamily: mono, color, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase">{title}</span>
        <span style={{ fontFamily: serif, color: C.inkDim, fontSize: 12.5, fontStyle: "italic" }}> — {sub}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              style={{
                fontFamily: mono,
                color,
                fontSize: 10,
                border: `1px solid ${color}`,
                borderRadius: 3,
                padding: "2px 0",
                width: 76,
                textAlign: "center",
              }}
              className="uppercase shrink-0 mt-0.5"
            >
              {it.topic}
            </span>
            <p style={{ fontFamily: serif, color: C.ink, fontSize: 13.5, lineHeight: 1.55, flex: 1 }}>{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LazyBox() {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-md overflow-hidden" style={{ background: "rgba(245,165,74,0.06)", border: `1px solid ${C.orange}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left">
        <div>
          <div style={{ fontFamily: mono, color: C.orange, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mb-1">
            Biện pháp tranh thủ
          </div>
          <span style={{ fontFamily: serif, color: C.ink, fontSize: 16.5, fontWeight: 600 }}>
            Cho người bận, hay quên, lười — không cần ý chí, không cần nhớ
          </span>
        </div>
        {open ? <ChevronUp size={18} color={C.orange} className="shrink-0" /> : <ChevronDown size={18} color={C.orange} className="shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-5" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13, lineHeight: 1.6, fontStyle: "italic", marginTop: 10 }}>
            Nguyên tắc chung: ý chí không đáng tin để dựa vào dài hạn. Ba chiến lược dưới đây không cần "nhớ" hay "cố gắng" — chỉ cần làm một lần rồi hệ thống tự chạy.
          </p>

          <LazyGroup
            title="Tự động hóa — làm một lần, khỏi nhớ lại"
            sub="cài đặt 1 lần, hệ thống tự lo phần còn lại"
            color={C.orange}
            items={[
              { topic: "Thận", text: "Đặt lịch nhắc (calendar) 'xét nghiệm albumin niệu' lặp lại hàng năm vào đúng tháng sinh nhật — dễ nhớ, không phụ thuộc bác sĩ có nhắc hay không." },
              { topic: "Tim", text: "Đặt lịch nhắc tái khám siêu âm tim theo đúng chu kỳ bác sĩ hẹn ngay khi rời phòng khám — đừng đợi 'nhớ ra' vài tháng sau." },
              { topic: "Tiểu đường", text: "Đặt sẵn thuốc/dụng cụ đo đường huyết ở nơi nhìn thấy đầu tiên mỗi sáng (cạnh bàn chải đánh răng) — giảm rào cản quên uống thuốc/đo đường." },
            ]}
          />

          <LazyGroup
            title="Gắn vào thói quen có sẵn — không tạo hoạt động mới"
            sub="habit stacking: móc vào việc đã làm tự động mỗi ngày"
            color={C.teal}
            items={[
              { topic: "Tiểu đường", text: "Đi bộ 10 phút ngay sau bữa ăn chính (thay vì ngồi/nằm ngay) — gắn vào thời điểm đã cố định mỗi ngày, giúp giảm đỉnh đường huyết sau ăn." },
              { topic: "Tim/Thận", text: "Đo huyết áp tại nhà vào đúng lúc pha cà phê/trà buổi sáng — hai việc làm cùng lúc, không tốn thêm thời gian riêng." },
            ]}
          />

          <LazyGroup
            title="Phiên bản tối thiểu — làm ít còn hơn không làm"
            sub="khi không đủ thời gian/năng lượng cho phiên bản đầy đủ"
            color={C.green}
            items={[
              { topic: "Tiểu đường", text: "Không có thời gian nấu ăn kiểm soát khẩu phần kỹ? Chỉ cần nguyên tắc đơn giản: một nửa đĩa là rau, không cần tính toán calo chi tiết mỗi bữa." },
              { topic: "Tim", text: "Không nhớ nổi giới hạn vận động cụ thể bác sĩ dặn? Nguyên tắc tối thiểu an toàn: vận động đến mức vẫn nói chuyện được thoải mái, dừng lại nếu thấy khó thở bất thường." },
              { topic: "Thận", text: "Không nhớ hết các loại thực phẩm chức năng cần tránh? Quy tắc tối thiểu: bất kỳ sản phẩm nào quảng cáo 'thải độc/bổ thận' đều hỏi bác sĩ trước, không cần nhớ danh sách cụ thể." },
            ]}
          />
        </div>
      )}
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
        <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase">
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
  Object.values(groups).forEach((items) => items.sort((a, b) => LEV_RANK[a.leverage] - LEV_RANK[b.leverage]));
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <span style={{ fontFamily: mono, color: C.goldDim, fontSize: 13 }}>00</span>
        <h2 style={{ fontFamily: serif, color: C.ink, fontSize: 26 }}>Actionable Practices</h2>
        <span style={{ fontFamily: mono, color: C.inkDim, fontSize: 12 }}>— sắp theo đòn bẩy: cao → vừa → thấp</span>
      </div>
      <Legend kind="leverage" />
      <CaseBox />
      <LazyBox />
      {Object.entries(groups).map(([pillarName, items]) => (
        <ActionableGroup key={pillarName} pillarName={pillarName} items={items} />
      ))}
      <div className="rounded-md p-4" style={{ background: "rgba(214,166,76,0.08)", border: `1px solid ${C.gold}` }}>
        <div style={{ fontFamily: mono, color: C.gold, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mb-2">
          Điểm giao thoa quan trọng nhất
        </div>
        <p style={{ fontFamily: serif, color: C.ink, fontSize: 15, lineHeight: 1.7 }}>
          Ba chủ đề này không độc lập: <b>tiểu đường không kiểm soát tốt</b> là nguyên nhân hàng đầu gây <b>bệnh thận mạn</b> (bệnh thận đái tháo đường), và cả hai đều làm tăng gánh nặng lên tim mạch. <b>SGLT2 inhibitor</b> giờ đây có lợi ích được xác nhận trên cả 3 mặt trận (đường huyết, thận, tim) — minh chứng rõ nhất cho việc 3 hệ cơ quan này liên kết chặt hơn nhiều so với việc điều trị tách rời từng chuyên khoa riêng lẻ.
        </p>
      </div>
      <div className="rounded-md p-5" style={{ background: "rgba(62,203,132,0.09)", border: `1.5px solid ${C.green}` }}>
        <div style={{ fontFamily: mono, color: C.green, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mb-2">
          Thần chú
        </div>
        <p style={{ fontFamily: serif, color: C.ink, fontSize: 17, lineHeight: 1.6, fontWeight: 600 }}>
          Đọc xong, nhất định phải biến nó thành hành động. 🚀
        </p>
        <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13.5, lineHeight: 1.65, marginTop: 8 }}>
          Cả khung này vô dụng nếu chỉ đọc mà không làm. Hiểu biết không tự làm giảm đường huyết hay bảo vệ thận — hành động mới làm được. Với người bận/hay quên/lười, quy tắc sống còn là: <b>làm phiên bản tệ nhất còn hơn không làm</b>.
        </p>
        <div className="mt-3 flex flex-col gap-1.5">
          <p style={{ fontFamily: mono, color: C.green, fontSize: 12.5, lineHeight: 1.5 }}>→ Trước khi đóng tab này, chọn đúng 1 mục "đòn bẩy cao" ở trên và làm ngay trong 2 phút tới.</p>
          <p style={{ fontFamily: mono, color: C.inkDim, fontSize: 12, lineHeight: 1.5 }}>Gợi ý dễ nhất: đặt lịch nhắc xét nghiệm albumin niệu · đi bộ 10 phút sau bữa ăn tới · ghi câu hỏi cho bác sĩ vào điện thoại ngay bây giờ.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ROOT
--------------------------------------------------------------- */
export default function App() {
  const [active, setActive] = useState("actionable");
  const tabs = [
    { id: "actionable", num: "00", label: "Actionable", icon: ListChecks },
    ...PILLARS.map((p) => ({ id: p.id, num: p.num, label: p.title, icon: p.icon })),
  ];
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }} className="w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 3px; }
      `}</style>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-6">
          <div style={{ fontFamily: mono, color: C.goldDim, fontSize: 11, letterSpacing: "0.12em" }} className="uppercase mb-2">
            Hồ sơ nghiên cứu · cấp chuyên gia · Actionable + 3 chủ đề
          </div>
          <h1 style={{ fontFamily: serif, color: C.ink, fontSize: 32, lineHeight: 1.15 }}>Tiểu đường · Suy thận · Hở van tim</h1>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 14.5, marginTop: 6 }}>
            Cơ chế → Nguyên nhân → Kết quả/hậu quả → Cách chữa → Góc nhìn chuyên gia cho mỗi chủ đề con. Ba bệnh lý liên kết chặt qua trục chuyển hóa-thận-tim mạch — xem box "Điểm giao thoa" ở tab Actionable.
          </p>
        </header>
        <nav className="flex gap-1 overflow-x-auto mb-6 pb-1" style={{ borderBottom: `1px solid ${C.line}` }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button key={t.id} onClick={() => setActive(t.id)} className="flex items-center gap-1.5 px-3 py-2 shrink-0 transition-colors" style={{ borderBottom: `2px solid ${isActive ? C.gold : "transparent"}`, marginBottom: -1 }}>
                <Icon size={13} color={isActive ? C.gold : C.inkDim} />
                <span style={{ fontFamily: mono, fontSize: 11.5, color: isActive ? C.gold : C.inkDim, letterSpacing: "0.02em" }} className="whitespace-nowrap">
                  {t.num} · {t.label}
                </span>
              </button>
            );
          })}
        </nav>
        <main>{active === "actionable" ? <ActionableView /> : <PillarView pillar={PILLARS.find((p) => p.id === active)} />}</main>
        <footer className="mt-10 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 12, lineHeight: 1.6 }}>
            Ghi chú phương pháp luận: tổng hợp từ thử nghiệm DiRECT/DIADEM-I (thuyên giảm tiểu đường type 2), DAPA-CKD/EMPA-KIDNEY (SGLT2 và bảo vệ thận), nghiên cứu MDRD (protein và CKD), dữ liệu an toàn metformin (B12/nhiễm toan lactic), khuyến cáo KDIGO về thuốc gây hại thận, dữ liệu dịch tễ thấp tim khu vực Đông Nam Á, thử nghiệm COAPT/MITRA-FR (TEER), dữ liệu theo dõi chủ động hở van tim (watchful waiting), và các thay đổi hướng dẫn dự phòng viêm nội tâm mạc từ 2007. Mỗi tab bao gồm cả tầng điều trị/khuyến cáo hàng đầu lẫn tầng "khi cần biết sâu hơn" (an toàn thuốc, danh sách thực hành, nguồn gốc bị bỏ qua, công nghệ mới). Nội dung mang tính giáo dục, không thay thế tư vấn y tế chuyên môn cho tình trạng cá nhân — đặc biệt với các bệnh lý đa cơ quan như trong tài liệu này, luôn cần bác sĩ chuyên khoa đánh giá tổng thể, không tự điều chỉnh thuốc/chế độ ăn dựa trên thông tin ở đây.
          </p>
        </footer>
      </div>
    </div>
  );
}
