import React, { useState } from "react";
import {
  Bone,
  Move,
  Dumbbell,
  TrendingDown,
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
  diadem: [
    ["Vòng sợi (Annulus fibrosus)", "lớp mô sợi dai bao quanh đĩa đệm, giữ nhân nhầy bên trong — thoát vị xảy ra khi lớp này bị rách."],
    ["Nhân nhầy (Nucleus pulposus)", "phần gel ở trung tâm đĩa đệm, trồi ra ngoài qua chỗ rách vòng sợi khi thoát vị."],
    ["Đau thần kinh tọa (Sciatica)", "đau lan xuống chân theo đường đi dây thần kinh tọa — dấu hiệu rễ thần kinh bị chèn ép, khác đau lưng cơ học đơn thuần."],
    ["Tự tiêu (Spontaneous resorption)", "hiện tượng khối thoát vị tự co lại/biến mất theo thời gian qua phản ứng viêm-miễn dịch tự nhiên, không cần can thiệp."],
    ["Hội chứng chùm đuôi ngựa (Cauda equina syndrome)", "chèn ép nặng nhiều rễ thần kinh vùng thấp tủy sống — cấp cứu ngoại khoa thật sự, hiếm nhưng khẩn cấp."],
    ["Vi phẫu lấy nhân đệm (Microdiscectomy)", "phẫu thuật ít xâm lấn lấy phần đĩa đệm thoát vị đang chèn ép rễ thần kinh."],
    ["Tiêm ngoài màng cứng (Epidural Steroid Injection)", "tiêm corticosteroid trực tiếp vào khoang ngoài màng cứng gần rễ thần kinh — giảm đau ngắn hạn có bằng chứng, dài hạn không khác biệt so với đối chứng."],
    ["Gabapentinoid", "nhóm thuốc chống động kinh (gabapentin, pregabalin) thường được kê off-label cho đau thần kinh tọa dù bằng chứng RCT không ủng hộ hiệu quả cho chỉ định này."],
  ],
  tuthe: [
    ["Tư thế trung tính (Neutral posture)", "khái niệm tư thế 'chuẩn' được dạy phổ biến — bằng chứng hiện đại không ủng hộ đây là yếu tố bảo vệ cột sống bắt buộc."],
    ["Squat lift / Stoop lift", "hai kỹ thuật nâng đồ: squat (khuỵu gối, giữ lưng thẳng) và stoop (cúi gập lưng, chân thẳng) — bằng chứng không ủng hộ squat an toàn hơn."],
    ["Kinesiophobia", "nỗi sợ vận động vì tin rằng vận động sẽ gây tổn thương thêm — bản thân nỗi sợ này dự đoán tiên lượng xấu hơn."],
    ["Fear-avoidance model", "mô hình vòng xoắn: đau → thảm họa hóa → sợ vận động → né tránh → yếu cơ/tăng nhạy cảm đau → đau kéo dài hơn."],
    ["Central sensitization", "hệ thần kinh trung ương trở nên nhạy cảm quá mức với tín hiệu đau sau thời gian dài, khiến đau kéo dài dù tổn thương mô ban đầu đã lành."],
    ["Sedentary behaviour (Hành vi tĩnh tại)", "thuật ngữ nghiên cứu bao quát mọi hình thức ít vận động (ngồi văn phòng, lái xe, xem TV) — bằng chứng về liên hệ với đau lưng mâu thuẫn giữa các loại hành vi khác nhau, không nên gộp chung."],
  ],
  vandong: [
    ["Core stability exercise", "bài tập nhắm vào cơ sâu cột sống (transversus abdominis, multifidus) để cải thiện kiểm soát vận động cột sống."],
    ["Motor control exercise (MCE)", "bài tập huấn luyện lại kiểu vận động/phối hợp cơ, không chỉ tăng sức mạnh đơn thuần."],
    ["Progressive loading", "nguyên tắc tăng dần tải trọng/cường độ tập luyện theo thời gian để xây khả năng chịu tải, thay vì né tránh tải hoàn toàn."],
    ["Thoái hóa khớp (Osteoarthritis)", "tình trạng hao mòn sụn khớp theo thời gian — vận động có kiểm soát là điều trị nền tảng, không phải bất động."],
    ["SYSADOA", "Symptomatic Slow-Acting Drugs for OsteoArthritis — nhóm thuốc/thực phẩm chức năng tác dụng chậm cho thoái hóa khớp (glucosamine, chondroitin) — hiệu quả khiêm tốn và không nhất quán giữa các nghiên cứu."],
  ],
  huyetapthap: [
    ["Hạ huyết áp tư thế (Orthostatic Hypotension)", "huyết áp tâm thu giảm ≥20mmHg hoặc tâm trương giảm ≥10mmHg trong vòng 3 phút sau khi đứng dậy — loại có bằng chứng nguy cơ tim mạch rõ ràng nhất trong 3 loại hạ huyết áp."],
    ["Hạ huyết áp sau ăn (Postprandial Hypotension)", "huyết áp tụt ≥20mmHg trong vòng 2 giờ sau bữa ăn — phổ biến ở người lớn tuổi nhưng thường bị bỏ sót, không nhận diện đúng nguyên nhân gây chóng mặt/té ngã."],
    ["Huyết áp thấp thể trạng (Constitutional Hypotension)", "huyết áp thấp mạn tính, ổn định, không rõ nguyên nhân bệnh lý — ý nghĩa lâm sàng còn tranh cãi thật sự trong y văn quốc tế."],
    ["Baroreceptor (Thụ thể áp lực)", "cảm biến ở thành mạch máu phát hiện thay đổi huyết áp, kích hoạt phản xạ co mạch/tăng nhịp tim bù trừ khi đứng dậy — suy yếu phản xạ này là cơ chế nền của hạ huyết áp tư thế."],
    ["Đai ép bụng (Abdominal binder)", "dụng cụ hỗ trợ ép vùng bụng-tạng (nơi chứa lượng tĩnh mạch lớn nhất cơ thể) — hiệu quả hơn tất ép chân đơn thuần trong cải thiện hạ huyết áp tư thế."],
    ["Đa gen (Polygenic)", "đặc điểm chịu ảnh hưởng bởi hàng trăm gen tác động nhỏ lẻ cộng dồn, không phải một gen đơn lẻ — huyết áp là ví dụ điển hình, tương tự chiều cao."],
    ["Ngất do phản xạ thần kinh tim mạch (Vasovagal/Neurally Mediated Syncope)", "ngất do hệ thần kinh tự chủ 'tăng nhạy cảm', phản ứng thái quá với kích thích (đứng lâu, đau, xúc động) gây chậm nhịp tim + giãn mạch cùng lúc — khác cơ chế hạ huyết áp tư thế đơn thuần."],
    ["Nghiệm pháp bàn nghiêng (Tilt-table test)", "xét nghiệm đưa bệnh nhân từ nằm sang gần như đứng trên bàn nghiêng có kiểm soát, dùng để xác nhận chẩn đoán ngất do phản xạ thần kinh tim mạch."],
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
   PILLARS — Thoát vị đĩa đệm / Tư thế & Cơ sinh học / Vận động & Bảo vệ khớp
--------------------------------------------------------------- */
const PILLARS = [
  {
    id: "diadem",
    num: "01",
    icon: Bone,
    title: "Thoát vị đĩa đệm",
    subtitle: "Cơ chế, sự thật về tự nhiên bệnh sử, điều trị đúng chuẩn",
    groups: [
      {
        label: "Cơ chế & sự thật về tự nhiên bệnh sử",
        note: "Phần lớn nỗi sợ về thoát vị đĩa đệm đến từ hiểu sai bệnh sử tự nhiên — đọc kỹ nhóm này trước khi hoảng loạn vì kết quả MRI.",
        sections: [
          {
            heading: "Đĩa đệm hoạt động thế nào — và 'thoát vị' thực sự nghĩa là gì",
            evidence: "strong",
            mechanism:
              "Mỗi đĩa đệm gồm vòng sợi (annulus fibrosus) — lớp mô sợi dai nhiều tầng — bao quanh nhân nhầy (nucleus pulposus) dạng gel ở trung tâm. Thoát vị xảy ra khi vòng sợi bị rách, cho phép nhân nhầy trồi ra ngoài. Chỉ khi khối thoát vị chèn ép trực tiếp lên rễ thần kinh mới gây đau lan/tê/yếu theo đường đi dây thần kinh (đau thần kinh tọa) — khác hẳn đau lưng cơ học đơn thuần do căng cơ/dây chằng.",
            causes:
              "Đĩa đệm mất nước và giảm độ đàn hồi dần theo tuổi (bắt đầu từ khoảng tuổi 20, là quá trình lão hóa tự nhiên, không phải 'bệnh'); chấn thương cấp tính (tai nạn, nâng vật quá nặng sai tư thế đột ngột); tải trọng lặp lại theo thời gian.",
            outcomes:
              "Phần lớn thoát vị nhỏ không gây triệu chứng gì. Khi có triệu chứng, mức độ và vị trí (đau/tê/yếu chân theo rễ thần kinh cụ thể) phản ánh vị trí và mức độ chèn ép, không nhất thiết tỷ lệ thuận với kích thước khối thoát vị trên phim.",
            treatment: "—",
            expertNote:
              "Từ 'thoát vị' (herniation) trong tiếng Việt lẫn tiếng Anh dễ gợi cảm giác 'vỡ/hỏng nghiêm trọng', nhưng về bản chất sinh học đây thường là một quá trình có thể tự giới hạn và tự hồi phục — xem 2 mục tiếp theo.",
            application: null,
          },
          {
            heading: "Đa số thoát vị tự tiêu — không phải 'hỏng vĩnh viễn cần mổ'",
            evidence: "strong",
            mechanism:
              "Sau khi thoát vị, đại thực bào (macrophage) xâm nhập vào khối mô thoát vị, kích hoạt phản ứng viêm-miễn dịch giúp phân hủy và dọn dẹp dần mảnh mô lạc chỗ, kèm theo hiện tượng tân tạo mạch máu hỗ trợ quá trình này — cơ thể có cơ chế tự sửa chữa built-in cho tình trạng này.",
            causes: "—",
            outcomes:
              "Tỷ lệ tự tiêu (spontaneous resorption) ghi nhận qua nhiều nghiên cứu theo dõi bằng MRI: lên đến 96% với thoát vị dạng mảnh rời (sequestration), 70% với thoát vị lồi hẳn ra (extrusion), 41% với thoát vị dạng lồi (protrusion), 13% với phình nhẹ (bulging). Hướng dẫn lâm sàng dựa trên bằng chứng của Hiệp hội Cột sống Bắc Mỹ (NASS) xác nhận đa số đĩa đệm thoát vị tự co lại hoặc thoái triển theo tiến trình tự nhiên.",
            treatment:
              "Điều trị bảo tồn (không phẫu thuật) là hướng ưu tiên khi không có dấu hiệu báo động (xem mục Dấu hiệu báo động), vì cơ thể có khả năng tự giải quyết phần lớn trường hợp trong vòng vài tháng.",
            expertNote:
              "Điểm phản trực giác quan trọng: khối thoát vị càng LỚN (extrusion, sequestration) lại có xu hướng tự tiêu NHANH và với tỷ lệ CAO hơn khối nhỏ (protrusion, bulging) — vì khối lớn tiếp xúc nhiều hơn với hệ tuần hoàn/miễn dịch, kích hoạt mạnh hơn phản ứng dọn dẹp. Điều này ngược hẳn trực giác thông thường 'thoát vị càng to càng nguy hiểm càng cần mổ'.",
            application: [
              { domain: "Tâm lý khi mới chẩn đoán", text: "Nếu mới phát hiện thoát vị và không có dấu hiệu báo động, biết rằng đa số trường hợp cải thiện đáng kể trong vài tháng qua điều trị bảo tồn — không cần hoảng loạn nghĩ phải mổ ngay." },
            ],
          },
          {
            heading: "MRI dương tính không đồng nghĩa đó là nguồn gây đau",
            evidence: "strong",
            mechanism:
              "MRI cực kỳ nhạy trong việc phát hiện bất thường cấu trúc, nhưng độ nhạy cao này đồng thời phát hiện rất nhiều bất thường KHÔNG liên quan gì đến triệu chứng — vì các thay đổi này phổ biến ở người hoàn toàn không đau như một phần của lão hóa bình thường.",
            causes: "—",
            outcomes:
              "Nghiên cứu hệ thống trên hơn 3.000 người không đau: phình đĩa đệm (bulge) gặp ở 30% người 20 tuổi, tăng lên 84% ở người 80 tuổi; lồi đĩa đệm (protrusion) gặp ở 29% người 20 tuổi, tăng lên 43% ở người 80 tuổi — tất cả đều là người KHÔNG có triệu chứng gì. Đồng thời, đúng là các bất thường này gặp nhiều hơn có ý nghĩa thống kê ở nhóm có đau so với không đau (OR 2.65–7.54 tùy loại tổn thương) — nghĩa là có liên hệ thật, nhưng không phải liên hệ tuyệt đối 1-1 như nhiều người hiểu nhầm.",
            treatment:
              "Kết quả hình ảnh học luôn cần đọc cùng với khám lâm sàng (phân bố đau/tê theo đúng rễ thần kinh, test thần kinh) — không tự chẩn đoán hay hoảng loạn chỉ dựa vào các chữ chuyên môn trong phim MRI.",
            expertNote:
              "Đây là lý do các hướng dẫn lâm sàng hiện đại không khuyến cáo chụp MRI thường quy cho đau lưng không có dấu hiệu báo động. Kết quả MRI dễ tạo ra một 'nhãn dán' tâm lý ('cột sống tôi hỏng rồi') làm tăng sợ hãi và né tránh vận động — và chính sự né tránh này (xem tab Tư thế) lại là yếu tố tiên lượng xấu hơn bản thân bất thường trên phim.",
            application: [
              { domain: "Đọc kết quả MRI đúng cách", text: "Nếu bác sĩ nói có 'phình/lồi đĩa đệm' nhưng không có tê/yếu chân theo đúng rễ thần kinh cụ thể khi khám, hỏi rõ liệu phát hiện này có thực sự tương ứng với triệu chứng hay là một phát hiện tình cờ thường gặp theo tuổi." },
            ],
          },
        ],
      },
      {
        label: "Điều trị đúng chuẩn — thứ tự ưu tiên",
        sections: [
          {
            heading: "Giai đoạn cấp: vận động sớm thắng nằm nghỉ",
            evidence: "strong",
            mechanism:
              "Nằm nghỉ kéo dài làm yếu cơ nhanh chóng, giảm lưu thông máu nuôi mô, và có thể kéo dài quá trình hồi phục. Vận động nhẹ nhàng sớm giúp duy trì tuần hoàn, ngăn ngừa yếu cơ thứ phát, và tránh vòng xoắn 'đau → bất động → yếu cơ → đau nhiều hơn khi cử động trở lại'.",
            causes: "—",
            outcomes:
              "Cochrane review tổng hợp 10 RCT: với đau lưng cấp, khuyên vận động cho cải thiện đau và chức năng tốt hơn có ý nghĩa thống kê so với khuyên nằm nghỉ (SMD 0.22–0.29 nghiêng về vận động). Với đau thần kinh tọa cụ thể, 2 cách cho kết quả gần như không khác biệt — nhưng không có bằng chứng nào cho thấy nằm nghỉ tốt hơn, trong khi nằm nghỉ kéo dài có tác hại tiềm tàng đã biết (yếu cơ, nguy cơ huyết khối, ảnh hưởng tâm trạng).",
            treatment:
              "Có thể nghỉ ngơi ở tư thế thoải mái trong 1–2 ngày đầu nếu đau dữ dội, nhưng nên chủ động vận động nhẹ nhàng trở lại càng sớm càng tốt — không đợi hết đau hoàn toàn mới bắt đầu cử động.",
            expertNote:
              "Khuyến cáo 'nằm nghỉ tuyệt đối' từng phổ biến hàng thập kỷ trong thực hành y khoa trước khi các RCT hiện đại đảo ngược kết luận này — một ví dụ khác (giống 'nâng bằng chân không bằng lưng' ở tab Tư thế) về khoảng cách giữa thực hành truyền thống lâu đời và bằng chứng khi được kiểm chứng nghiêm ngặt.",
            application: [
              { domain: "Ngày đầu đau cấp", text: "Cho phép nghỉ ở tư thế thoải mái 1–2 ngày nếu đau dữ dội, nhưng chủ động đứng dậy đi lại nhẹ nhàng nhiều lần trong ngày thay vì nằm bất động cả ngày." },
            ],
          },
          {
            heading: "Dấu hiệu báo động cần cấp cứu ngay — không trì hoãn",
            evidence: "strong",
            mechanism:
              "Hội chứng chùm đuôi ngựa (cauda equina syndrome) xảy ra khi khối thoát vị chèn ép nặng nhiều rễ thần kinh cùng lúc ở vùng thấp của tủy sống — đây là cấp cứu ngoại khoa thật sự, dù hiếm gặp nhưng khẩn cấp.",
            causes: "—",
            outcomes:
              "Nếu không phẫu thuật giải chèn ép kịp thời (thường trong vòng 24–48 giờ từ khi khởi phát), có nguy cơ tổn thương thần kinh vĩnh viễn: mất kiểm soát tiểu tiện/đại tiện, tê vĩnh viễn, yếu liệt chân.",
            treatment:
              "Cần đến cấp cứu ngay (không chờ đặt lịch khám thông thường) nếu xuất hiện: mất hoặc rối loạn kiểm soát tiểu tiện/đại tiện, tê vùng 'yên ngựa' (mông trong, bộ phận sinh dục, quanh hậu môn), yếu cơ hai chân tiến triển nhanh, hoặc đau không đáp ứng với thuốc giảm đau mạnh.",
            expertNote:
              "Đây là một trong rất ít tình huống của toàn bộ chủ đề thoát vị đĩa đệm cần cấp cứu thực sự. Phân biệt rõ tình huống này với đau lưng/tê chân thông thường (dù khó chịu, thường không nguy hiểm đến tính mạng hay để lại tổn thương thần kinh vĩnh viễn) giúp tránh cả 2 sai lầm: hoảng loạn không cần thiết với đau lưng thông thường, VÀ trì hoãn nguy hiểm khi thực sự cần cấp cứu.",
            application: [
              { domain: "Cấp cứu ngay", text: "Nếu xuất hiện mất kiểm soát tiểu/đại tiện, tê vùng yên ngựa, hoặc yếu chân tiến triển nhanh — đến cấp cứu trong vài giờ, không trì hoãn." },
            ],
          },
          {
            heading: "Khi nào cân nhắc phẫu thuật (ngoài tình huống cấp cứu)",
            evidence: "moderate",
            mechanism:
              "Phẫu thuật (thường là vi phẫu lấy nhân đệm — microdiscectomy) giải chèn ép cơ học trực tiếp, giúp giảm đau chân nhanh hơn điều trị bảo tồn trong ngắn hạn.",
            causes: "—",
            outcomes:
              "Các nghiên cứu so sánh dài hạn (theo dõi 1–2 năm) cho thấy kết quả giữa nhóm phẫu thuật và nhóm điều trị bảo tồn có xu hướng hội tụ về mức tương đương ở phần lớn bệnh nhân không thuộc diện cấp cứu — phẫu thuật giúp giảm đau nhanh hơn rõ rệt trong vài tuần-tháng đầu, nhưng không phải luôn tốt hơn về lâu dài.",
            treatment:
              "Có thể cân nhắc phẫu thuật khi: đã điều trị bảo tồn đúng cách (vật lý trị liệu + thuốc + vận động có kiểm soát) trong 6–12 tuần mà không cải thiện đủ, đau/tê ảnh hưởng nghiêm trọng đến chức năng sống hàng ngày, hoặc có yếu cơ tiến triển (không thuộc diện cấp cứu nhưng đáng lo ngại).",
            expertNote:
              "Quyết định phẫu thuật không cấp cứu nên dựa trên mức độ ảnh hưởng đến chất lượng sống và sở thích cá nhân sau khi hiểu rõ đánh đổi (giảm đau nhanh hơn nhưng có rủi ro phẫu thuật, và không chắc chắn tốt hơn về lâu dài) — nên thảo luận kỹ với bác sĩ chuyên khoa cột sống, không phải quyết định chỉ dựa trên kích thước khối thoát vị trên MRI.",
            application: null,
          },
        ],
      },
      {
        label: "Khi đau kéo dài — dược lý & thủ thuật cần biết",
        note: "Đây là tầng nội dung hay bị bỏ sót nhất trong tài liệu phổ thông: các lựa chọn khi bảo tồn cơ bản (nghỉ ngơi + thuốc giảm đau thường quy) chưa đủ, nhưng chưa đến mức phẫu thuật.",
        sections: [
          {
            heading: "Tiêm ngoài màng cứng (Epidural Steroid Injection) — giảm đau thật nhưng chỉ ngắn hạn",
            evidence: "moderate",
            mechanism:
              "Corticosteroid được tiêm trực tiếp vào khoang ngoài màng cứng gần rễ thần kinh đang viêm/bị chèn ép, nhằm giảm phản ứng viêm tại chỗ — khác thuốc uống vì đưa thuốc trực tiếp đến vị trí tổn thương với nồng độ cao hơn.",
            causes: "—",
            outcomes:
              "Review NNT tổng hợp 23 RCT có đối chứng giả dược (>2.000 người): giảm đau chân ngắn hạn (2 tuần–3 tháng) có ý nghĩa thống kê nhưng effect size NHỎ — chỉ khoảng 6 điểm/100 trên thang đau chân, dưới ngưỡng thay đổi có ý nghĩa lâm sàng tối thiểu (cần 10–30 điểm). Nhiều meta-analysis khác cho kết quả tích cực hơn về giảm đau/chức năng ở 6 tuần–6 tháng — dữ liệu giữa các nghiên cứu KHÔNG hoàn toàn nhất quán. Hầu hết đồng thuận: không có khác biệt dài hạn (>6 tháng–1 năm) so với đối chứng.",
            treatment:
              "Có thể cân nhắc như biện pháp 'bắc cầu' (bridge therapy) tạm thời giảm đau đủ để tham gia vật lý trị liệu tích cực hơn, không phải giải pháp chữa khỏi. Không nên kỳ vọng hiệu quả kéo dài hoặc lặp lại tiêm nhiều lần không giới hạn.",
            expertNote:
              "Sự thiếu nhất quán giữa các meta-analysis (một số cho kết quả 'hiệu quả rõ', một số cho 'dưới ngưỡng ý nghĩa lâm sàng') phản ánh khác biệt về kỹ thuật tiêm (caudal/interlaminar/transforaminal), tiêu chí chọn bệnh nhân, và định nghĩa 'thành công' giữa các nghiên cứu — nên hiểu đây là công cụ có tác dụng khiêm tốn và thật, không phải 'phép màu' lẫn 'hoàn toàn vô dụng'.",
            application: [
              { domain: "Kỳ vọng đúng", text: "Nếu cân nhắc tiêm ngoài màng cứng, hiểu đây là biện pháp bắc cầu tạm thời (vài tuần đến vài tháng) để tạo điều kiện tập vật lý trị liệu tốt hơn, không phải giải pháp chữa khỏi vĩnh viễn." },
            ],
          },
          {
            heading: "Gabapentin/Pregabalin cho đau thần kinh tọa — kê đơn phổ biến nhưng bằng chứng không ủng hộ",
            evidence: "contested",
            mechanism:
              "Nhóm thuốc chống động kinh gabapentinoid, về lý thuyết nhắm vào cơ chế đau thần kinh (neuropathic pain) qua điều biến kênh canxi ở tế bào thần kinh — nghe hợp lý vì đau thần kinh tọa có thành phần tổn thương/kích thích rễ thần kinh.",
            causes:
              "Kê đơn ngoài chỉ định chính thức (off-label) tăng nhanh trong thực hành lâm sàng dựa trên suy luận cơ chế hợp lý, dù thiếu bằng chứng lâm sàng trực tiếp ủng hộ cho chỉ định cụ thể này.",
            outcomes:
              "RCT lớn tại Úc (209 bệnh nhân, công bố trên NEJM): cải thiện đau chân ở nhóm GIẢ DƯỢC thực ra nhỉnh hơn nhóm dùng pregabalin ở tuần thứ 8 — không ghi nhận lợi ích. Systematic review 8 RCT (747 người) kết luận rõ ràng: thiếu hiệu quả của cả gabapentin lẫn pregabalin cho đau thần kinh tọa, không ủng hộ sử dụng thường quy trong lâm sàng.",
            treatment:
              "Không nên là lựa chọn đầu tay cho đau thần kinh tọa dù đây là 'đau kiểu thần kinh' về mặt lý thuyết — nên cân nhắc kỹ với bác sĩ về lợi ích thực tế so với tác dụng phụ (chóng mặt, buồn ngủ, phù) trước khi dùng, đặc biệt nếu đang được kê như điều trị chính thay vì bổ sung.",
            expertNote:
              "Đây là ví dụ rõ về khoảng cách giữa 'hợp lý về mặt cơ chế lý thuyết' và 'có bằng chứng lâm sàng hiệu quả khi kiểm chứng' — tương tự trường hợp danh sách kiêng khem GERD hay kỹ thuật squat lifting ở tab Tư thế: cơ chế nghe hợp lý không đảm bảo hiệu quả thực tế khi kiểm chứng bằng RCT.",
            application: [
              { domain: "Khi bác sĩ đề xuất", text: "Nếu được kê gabapentin/pregabalin cho đau thần kinh tọa, có thể hỏi bác sĩ về bằng chứng hạn chế của nhóm thuốc này cho chỉ định cụ thể này, và cân nhắc các lựa chọn khác (vận động có kiểm soát, vật lý trị liệu, NSAID) trước." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tuthe",
    num: "02",
    icon: Move,
    title: "Tư thế & Cơ sinh học",
    subtitle: "Kiểm chứng lại các huyền thoại về tư thế và kỹ thuật nâng",
    groups: [
      {
        label: "Huyền thoại 'ngồi/đứng thẳng lưng'",
        sections: [
          {
            heading: "'Ngồi/đứng thẳng lưng' không ngăn được đau lưng — bằng chứng không ủng hộ tư thế 'chuẩn'",
            evidence: "strong",
            mechanism:
              "Không có một tư thế 'tối ưu' duy nhất được xác định qua nghiên cứu — cơ thể người có biến thiên tự nhiên đáng kể về độ cong cột sống, và cơ chế gây đau không đơn giản theo kiểu 'tư thế lệch → đau'.",
            causes:
              "Quan niệm 'tư thế xấu gây đau lưng' phổ biến qua truyền miệng, áp lực xã hội, và các áp phích/hướng dẫn ergonomic tại nơi làm việc — không xuất phát từ nền tảng bằng chứng khoa học vững.",
            outcomes:
              "Các review hệ thống không tìm thấy khác biệt nhất quán về tư thế ngồi/đứng giữa nhóm có và không có đau lưng. Nghiên cứu theo dõi trên số lượng lớn thanh thiếu niên không thấy tư thế 'gù lưng/lệch' dự đoán được đau lưng trong tương lai. Các can thiệp huấn luyện tư thế 'chuẩn' cho công nhân trong nhiều review hệ thống không giảm được đau lưng liên quan công việc. Ngược lại, ép giữ tư thế 'thẳng cứng' có thể làm TĂNG căng cơ vì không cho phép cơ được thư giãn tự nhiên.",
            treatment:
              "Thay vì tìm một tư thế 'đúng' để giữ cả ngày, nên ưu tiên THAY ĐỔI tư thế thường xuyên — yếu tố thật sự liên quan đến khó chịu là sự TĨNH TẠI kéo dài (giữ nguyên bất kỳ tư thế nào quá lâu), không phải bản thân tư thế cụ thể nào.",
            expertNote:
              "Một câu tổng kết thường được trích trong y văn vật lý trị liệu hiện đại: 'tư thế tốt nhất là tư thế TIẾP THEO' — nghĩa là sự đa dạng/thay đổi mới là chìa khóa, không phải cố định giữ một dáng 'chuẩn' suốt nhiều giờ.",
            application: [
              { domain: "Thực hành", text: "Đổi tư thế ngồi/đứng mỗi 20–30 phút (ngả người, đổi chân bắt chéo, đứng dậy vươn vai) thay vì cố giữ 'lưng thẳng' suốt buổi — sự thay đổi quan trọng hơn tư thế cụ thể nào." },
            ],
            pitfalls: ["Ép bản thân hoặc con cái ngồi 'thẳng lưng cứng nhắc' cả ngày vì tin đây là cách phòng ngừa duy nhất — có thể phản tác dụng, tăng căng cơ thay vì bảo vệ cột sống."],
          },
        ],
      },
      {
        label: "Huyền thoại 'nâng bằng chân, không bằng lưng'",
        sections: [
          {
            heading: "Kỹ thuật squat (khuỵu gối, giữ lưng thẳng) có thực sự an toàn hơn cúi lưng?",
            evidence: "strong",
            mechanism:
              "Kỹ thuật squat (khuỵu gối sâu, giữ lưng thẳng đứng) và stoop (cúi gập lưng, chân thẳng) tạo ra các dạng lực nén/lực cắt khác nhau lên cột sống về mặt cơ sinh học, nhưng cả hai đều nằm trong ngưỡng có thể gây tổn thương nếu tải trọng đủ nặng — không có kỹ thuật nào 'miễn nhiễm' với chấn thương khi tải vượt ngưỡng.",
            causes: "—",
            outcomes:
              "Review cơ sinh học hệ thống kết luận tài liệu không ủng hộ khuyến nghị kỹ thuật squat như biện pháp phòng ngừa đau lưng. Các nghiên cứu can thiệp huấn luyện kỹ thuật squat không cho thấy giảm đau lưng trong thực tế công việc. Một meta-analysis xác nhận độ gập cột sống thắt lưng khi nâng KHÔNG phải yếu tố nguy cơ cho khởi phát/duy trì đau lưng, và không phân biệt được người có với không có đau lưng. Dù vậy, 75% chuyên viên vật lý trị liệu được khảo sát vẫn tin squat an toàn hơn — cho thấy khoảng cách lớn giữa thực hành phổ biến và bằng chứng.",
            treatment:
              "Yếu tố THẬT sự liên quan đến nguy cơ đau lưng khi nâng đồ là: TẦN SUẤT nâng (nâng lặp lại nhiều lần là yếu tố nguy cơ đã xác nhận), TRỌNG LƯỢNG vật, và KHOẢNG CÁCH giữa vật với cơ thể (giữ vật gần người luôn tốt hơn, bất kể dùng kỹ thuật nào) — không phải việc gập lưng hay khuỵu gối.",
            expertNote:
              "Điều này không có nghĩa 'nâng thế nào cũng được' — nâng vẫn là yếu tố nguy cơ đã xác nhận cho đau lưng, chỉ là biến số kỹ thuật CỤ THỂ (squat vs stoop) không phải yếu tố quyết định như vẫn được dạy phổ biến. Cách tiếp cận hợp lý hơn theo bằng chứng hiện tại là xây dựng sức mạnh/khả năng chịu tải qua tập luyện tăng dần (progressive loading), thay vì chỉ ám ảnh 'đúng dáng'.",
            application: [
              { domain: "Khi nâng đồ nặng", text: "Giữ vật CÀNG GẦN cơ thể càng tốt (yếu tố quan trọng nhất, không phải tư thế lưng/gối), tránh xoay người đột ngột khi đang mang tải, và nếu phải nâng lặp lại nhiều lần, chia nhỏ/nghỉ giữa chừng thay vì chỉ cố giữ kỹ thuật 'chuẩn'." },
            ],
          },
        ],
      },
      {
        label: "Nỗi sợ vận động — chính nó cũng là một yếu tố nguy cơ",
        sections: [
          {
            heading: "Càng sợ càng né tránh, càng né tránh càng tệ hơn — vòng xoắn fear-avoidance",
            evidence: "strong",
            mechanism:
              "Mô hình fear-avoidance: đau ban đầu → diễn giải thảm họa hóa ('cột sống tôi hỏng rồi') → sợ vận động (kinesiophobia) → né tránh hoạt động → yếu cơ, giảm chức năng, tăng nhạy cảm đau (central sensitization) → đau kéo dài hơn dù tổn thương mô ban đầu có thể đã lành từ lâu.",
            causes:
              "Nhãn chẩn đoán gây sợ hãi (ví dụ 'thoát vị', 'thoái hóa') kết hợp với lời khuyên quá thận trọng từ người xung quanh hoặc một số nguồn thông tin ('phải cẩn thận cột sống', 'không được vận động mạnh'), cùng truyền thông đại chúng thường nhấn mạnh hình ảnh đáng sợ về 'cột sống hỏng'.",
            outcomes:
              "Mức độ sợ hãi và niềm tin tự đánh giá thấp về khả năng vận động (low self-efficacy) liên quan đến kiểu di chuyển 'phòng thủ' quá mức — bản thân yếu tố tâm lý này dự đoán tiên lượng xấu hơn, ĐỘC LẬP với mức độ tổn thương mô thực tế trên hình ảnh.",
            treatment:
              "Giáo dục đúng về bệnh sử tự nhiên (đa số tự cải thiện, MRI không phải 'bản án' — xem tab Thoát vị đĩa đệm), khuyến khích trở lại vận động bình thường dần dần theo mức độ tăng tiến thay vì né tránh tuyệt đối.",
            expertNote:
              "Đây có lẽ là điểm can thiệp có đòn bẩy cao nhất và ít tốn kém nhất trong toàn bộ chủ đề này. Thay đổi cách hiểu về bệnh — từ 'tôi bị hỏng, phải bảo vệ tuyệt đối' sang 'cột sống tôi khỏe mạnh, đang hồi phục, an toàn để vận động dần' — có thể tác động đến tiên lượng ngang hoặc hơn nhiều can thiệp vật lý khác.",
            application: [
              { domain: "Thực hành", text: "Nếu đau đã được bác sĩ xác nhận không có dấu hiệu báo động, chủ động quay lại các hoạt động bình thường theo mức độ tăng dần thay vì né tránh hoàn toàn — 'bảo vệ' quá mức bằng bất động kéo dài thường có hại hơn có lợi." },
            ],
          },
        ],
      },
      {
        label: "Ngồi lâu — tách bạch cái có bằng chứng khỏi cái không",
        note: "Khác với 'tư thế xấu' (đã debunk ở trên), câu hỏi 'ngồi lâu có hại không' thực ra phức tạp hơn nhiều so với cả 2 phe cực đoan ('ngồi lâu là sát thủ' và 'ngồi lâu vô hại') vẫn thường nghe.",
        sections: [
          {
            heading: "Ngồi lâu có thực sự là yếu tố nguy cơ độc lập? — bằng chứng mâu thuẫn giữa các review",
            evidence: "contested",
            mechanism:
              "Giả thuyết cơ chế: ngồi lâu tăng áp lực tĩnh lên cột sống thắt lưng, gây mỏi cơ nâng đỡ, và giảm lưu thông máu tại chỗ — về lý thuyết có thể góp phần gây khó chịu/đau.",
            causes: "—",
            outcomes:
              "Bức tranh bằng chứng thực sự lẫn lộn: một review hệ thống các review hệ thống (41 review) kết luận có ĐỒNG THUẬN về việc KHÔNG có liên hệ giữa ngồi lâu do công việc và đau lưng. Một review khác trên công nhân xây dựng/văn phòng cũng không tìm thấy liên hệ nhất quán. Ngược lại, một số nghiên cứu đo lường trực tiếp (accelerometer) cho thấy ngồi lâu làm TĂNG cảm nhận đau tức thời trong ngày (dù chưa rõ có dẫn đến một đợt đau lưng lâm sàng hay không), và một meta-analysis khác trên 27 nghiên cứu tìm thấy sedentary lifestyle có liên hệ yếu-vừa với đau lưng (OR 1.24), với THỜI GIAN LÁI XE cho liên hệ mạnh nhất trong tất cả (OR 2.03).",
            treatment:
              "Không nên xem 'ngồi lâu' như một khối đồng nhất — ngồi văn phòng thông thường có bằng chứng yếu/mâu thuẫn về nguy cơ, trong khi ngồi lái xe kéo dài (kết hợp cả tĩnh tại LẪN rung xóc toàn thân, xem thêm tab Vận động) có bằng chứng nguy cơ rõ ràng hơn hẳn.",
            expertNote:
              "Lời giải thích hợp lý nhất cho sự mâu thuẫn: 'ngồi lâu' trong các nghiên cứu khác nhau đo những thứ rất khác nhau — ngồi văn phòng có thể đứng dậy tùy ý khác hẳn ngồi lái xe bị 'khóa' tư thế + rung xóc liên tục. Gộp chung tất cả thành một biến 'ngồi lâu' duy nhất có thể là lý do chính khiến bằng chứng tổng thể không nhất quán, chứ không hẳn 'ngồi lâu vô hại' hay 'ngồi lâu luôn có hại'.",
            application: [
              { domain: "Thực hành", text: "Với công việc văn phòng thông thường, nguyên tắc 'đổi tư thế mỗi 20–30 phút' (đã nêu ở mục trên) vẫn là lựa chọn an toàn hợp lý dù bằng chứng về ngồi lâu nói chung còn mâu thuẫn. Với nghề lái xe/vận hành máy rung xóc nhiều, đây là nhóm nguy cơ rõ ràng hơn cần ưu tiên giải pháp giảm rung xóc + nghỉ giải lao thường xuyên." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "vandong",
    num: "03",
    icon: Dumbbell,
    title: "Vận động & Bảo vệ khớp",
    subtitle: "Core stability, thoái hóa khớp, yếu tố nguy cơ thật",
    groups: [
      {
        label: "Core stability & motor control — bằng chứng thật",
        sections: [
          {
            heading: "Tập 'core' có thực sự tốt hơn tập thể dục chung chung?",
            evidence: "strong",
            mechanism:
              "Core stability exercise nhắm vào các cơ sâu của cột sống (transversus abdominis, multifidus) để cải thiện kiểm soát vận động và ổn định cột sống qua phản hồi cảm thụ bản thể (proprioceptive feedback), khác với tập sức mạnh cơ bề mặt thông thường.",
            causes: "—",
            outcomes:
              "Meta-analysis: bài tập ổn định cột sống có giám sát cho hiệu quả giảm đau (SMD −0.88) và cải thiện chức năng (SMD −0.85) rõ rệt nhất khi tập đủ 8–12 tuần. Tuy nhiên, so sánh trực tiếp core stability với tập thể dục chung chung (aerobic, sức mạnh tổng quát) cho kết quả TƯƠNG ĐƯƠNG NHAU về lâu dài trong nhiều nghiên cứu, dù core stability có ưu thế nhẹ về chức năng trong 3 tháng đầu.",
            treatment:
              "Bất kỳ chương trình vận động nào được thực hiện ĐỀU ĐẶN, có hướng dẫn đúng kỹ thuật ban đầu, và kéo dài đủ 8–12 tuần đều mang lại lợi ích — không cần ám ảnh phải là bài tập 'core' chuyên biệt nếu không có điều kiện tiếp cận huấn luyện viên/vật lý trị liệu.",
            expertNote:
              "Nguyên tắc thực dụng nhất rút ra từ y văn: 'bài tập tốt nhất là bài tập bạn sẽ THỰC SỰ DUY TRÌ' — khác biệt hiệu quả giữa các loại bài tập nhỏ hơn nhiều so với khác biệt giữa việc tập đều đặn và không tập gì cả.",
            application: [
              { domain: "Bắt đầu", text: "Nếu chưa quen, học vài động tác core cơ bản (plank, bird-dog, dead bug) với hướng dẫn đúng kỹ thuật ban đầu (video uy tín/buổi với PT), sau đó duy trì đều đặn 2–3 lần/tuần ít nhất 8 tuần trước khi đánh giá hiệu quả." },
            ],
          },
        ],
      },
      {
        label: "Bảo vệ khớp nói chung — ngoài cột sống",
        sections: [
          {
            heading: "Vận động là điều trị hàng đầu cho thoái hóa khớp — ngược với trực giác 'để khớp nghỉ'",
            evidence: "strong",
            mechanism:
              "Sụn khớp không có mạch máu riêng, được nuôi dưỡng chủ yếu qua khuếch tán từ dịch khớp — quá trình khuếch tán này được 'bơm' hiệu quả hơn khi khớp vận động chịu tải theo chu kỳ. Bất động kéo dài làm giảm nuôi dưỡng sụn và gây teo cơ quanh khớp, khiến khớp mất ổn định hơn.",
            causes:
              "Quan niệm dân gian phổ biến 'khớp yếu/đau phải để nghỉ, tránh vận động' — trực giác hợp lý bề ngoài nhưng đi ngược cơ chế sinh lý thật của sụn khớp.",
            outcomes:
              "Các hướng dẫn lâm sàng về thoái hóa khớp (gối, háng) xếp vận động/tập luyện là điều trị NỀN TẢNG hàng đầu, ngang hoặc trên cả thuốc giảm đau — tập luyện tăng sức mạnh cơ quanh khớp giúp giảm tải trực tiếp lên khớp, cải thiện đau và chức năng dài hạn tốt hơn nghỉ ngơi thụ động.",
            treatment:
              "Với khớp đau do thoái hóa (không phải chấn thương cấp/viêm cấp), ưu tiên vận động có kiểm soát cường độ phù hợp (bơi, đạp xe, tập sức mạnh nhẹ) hơn là bất động. Chỉ khi đau tăng RÕ RỆT và kéo dài sau vận động (không phải khó chịu nhẹ thoáng qua) mới cần giảm cường độ.",
            expertNote:
              "Đây là mẫu số chung xuyên suốt cả 3 nhóm chủ đề trong file này: cơ thể (đĩa đệm, cột sống, khớp) đều được thiết kế để CHỊU TẢI VÀ THÍCH NGHI qua vận động, không phải để 'bảo vệ' bằng cách bất động — bất động gần như luôn có hại hơn có lợi, trừ giai đoạn cấp tính rất ngắn ngay sau chấn thương.",
            application: [
              { domain: "Nguyên tắc chung", text: "Với đau khớp mạn tính (không phải chấn thương cấp), coi vận động là điều trị, không phải điều cần tránh — bắt đầu nhẹ nhàng, tăng dần, theo dõi phản ứng cơ thể thay vì bất động chờ hết đau hẳn mới vận động lại." },
            ],
          },
        ],
      },
      {
        label: "Yếu tố nguy cơ thật cần kiểm soát",
        sections: [
          {
            heading: "Hút thuốc, cân nặng, rung xóc nghề nghiệp — nhóm yếu tố có bằng chứng dịch tễ thật",
            evidence: "moderate",
            mechanism:
              "Nicotine gây co mạch máu nuôi vùng lân cận đĩa đệm (đĩa đệm người trưởng thành gần như không có mạch máu trực tiếp, phụ thuộc khuếch tán dinh dưỡng từ mạch máu lân cận) → giảm dinh dưỡng, đẩy nhanh thoái hóa đĩa đệm. Thừa cân tăng tải trọng cơ học trực tiếp lên đĩa đệm/khớp mỗi ngày. Rung xóc toàn thân kéo dài (lái xe tải, vận hành máy nặng) tạo vi chấn thương lặp lại lên cột sống theo thời gian.",
            causes: "—",
            outcomes:
              "Hút thuốc lá có liên hệ nhất quán với tăng nguy cơ thoái hóa/thoát vị đĩa đệm qua nhiều nghiên cứu dịch tễ học. Thừa cân liên quan đến tăng nguy cơ đau lưng mạn tính. Phơi nhiễm rung xóc nghề nghiệp (lái xe chuyên nghiệp, vận hành máy nặng) là yếu tố nguy cơ nghề nghiệp đã được ghi nhận cho thoát vị đĩa đệm.",
            treatment:
              "Đây là nhóm yếu tố nguy cơ có nền tảng bằng chứng dịch tễ học thật (khác với các huyền thoại về tư thế/kỹ thuật nâng ở tab Tư thế) — ngừng hút thuốc, duy trì cân nặng hợp lý, và nếu công việc phơi nhiễm rung xóc nhiều thì cân nhắc ghế/xe giảm chấn hoặc nghỉ giải lao thường xuyên hơn.",
            expertNote:
              "Điểm đối chiếu đáng chú ý: xã hội tập trung rất nhiều sự chú ý vào tư thế/kỹ thuật nâng (bằng chứng yếu, xem tab Tư thế) trong khi 3 yếu tố này — có nền tảng bằng chứng dịch tễ học nhất quán hơn — lại ít được nhấn mạnh trong nhận thức phổ biến. Một ví dụ khác về khoảng cách giữa những gì được lan truyền rộng rãi và những gì bằng chứng thực sự chỉ ra.",
            application: [
              { domain: "Ưu tiên thật", text: "Nếu phải chọn ưu tiên hành động, cai thuốc lá và kiểm soát cân nặng có nền tảng bằng chứng dịch tễ vững hơn nhiều so với việc ám ảnh 'tư thế chuẩn' hay 'kỹ thuật nâng đúng'." },
            ],
          },
        ],
      },
      {
        label: "Thực phẩm chức năng cho khớp — sự thật đằng sau glucosamine/chondroitin",
        sections: [
          {
            heading: "Glucosamine, Chondroitin — hiệu quả có thật nhưng khiêm tốn và không đồng đều",
            evidence: "contested",
            mechanism:
              "Glucosamine là một amino-monosaccharide có tự nhiên trong sụn khớp; chondroitin là thành phần cấu trúc của sụn. Giả thuyết bổ sung đường uống nhằm cung cấp 'nguyên liệu' hỗ trợ tái tạo sụn — dù sinh khả dụng đường uống thực sự đến được sụn khớp với lượng đáng kể vẫn còn tranh cãi về mặt dược động học.",
            causes: "—",
            outcomes:
              "Meta-analysis 30 thử nghiệm: chondroitin (dùng riêng) cho hiệu quả giảm đau và cải thiện chức năng có ý nghĩa so với giả dược; glucosamine (dùng riêng) chỉ có hiệu quả có ý nghĩa lên độ CỨNG khớp (stiffness), không rõ ràng cho đau/chức năng; kết hợp cả hai không đủ bằng chứng vượt trội hơn giả dược. Một số network meta-analysis khác lại cho kết quả tích cực hơn khi kết hợp glucosamine với omega-3 hoặc ibuprofen. American College of Rheumatology hiện khuyến cáo có điều kiện KHÔNG dùng glucosamine/chondroitin cho thoái hóa khớp gối.",
            treatment:
              "Không nên xem đây là điều trị chính hay thay thế cho vận động/kiểm soát cân nặng (nhóm can thiệp có bằng chứng vững hơn nhiều, xem 2 mục trên). Nếu muốn thử, chondroitin đơn độc có nền tảng bằng chứng nhỉnh hơn glucosamine đơn độc cho đau/chức năng — nhưng cả hai đều là lựa chọn bổ sung, không phải nền tảng điều trị.",
            expertNote:
              "Đây là một trong những nhóm thực phẩm chức năng gây tranh cãi nhất trong y văn thoái hóa khớp suốt hơn 20 năm — kết quả dao động mạnh giữa các meta-analysis do khác biệt về liều lượng, dạng bào chế (sulfate vs hydrochloride), và tài trợ nghiên cứu (một số phân tích ghi nhận nghiên cứu tài trợ bởi hãng dược có xu hướng cho kết quả tích cực hơn). Mức độ an toàn cao (ít tác dụng phụ nghiêm trọng) là lý do chính khiến nhiều bác sĩ vẫn không phản đối nếu bệnh nhân muốn thử, dù không chủ động khuyến khích.",
            application: [
              { domain: "Nếu cân nhắc dùng", text: "Không kỳ vọng đây thay thế được vận động/kiểm soát cân nặng — coi là lựa chọn bổ sung có rủi ro thấp, hiệu quả không chắc chắn và khiêm tốn nếu có, không phải giải pháp chính." },
            ],
            pitfalls: ["Dừng vận động/vật lý trị liệu vì tin uống glucosamine/chondroitin là đủ để 'bảo vệ khớp' — đây là 2 nhóm can thiệp không thể thay thế nhau, và vận động có nền tảng bằng chứng vững hơn nhiều."],
          },
        ],
      },
    ],
  },
  {
    id: "huyetapthap",
    num: "04",
    icon: TrendingDown,
    title: "Huyết áp thấp",
    subtitle: "Ba loại khác nhau, xử lý đúng chuẩn, và khi nào là gán ghép sai",
    groups: [
      {
        label: "Cơ chế & phân loại — ba loại khác nhau, không phải một bệnh",
        note: "'Huyết áp thấp' trong ngôn ngữ thông thường gộp chung nhiều tình trạng có cơ chế và mức độ nguy hiểm rất khác nhau — phân biệt đúng loại là bước đầu tiên trước khi xử lý.",
        sections: [
          {
            heading: "Hạ huyết áp tư thế (Orthostatic Hypotension) — loại có bằng chứng nguy cơ rõ ràng nhất",
            evidence: "strong",
            mechanism:
              "Khi đứng dậy đột ngột, 500-700ml máu (có thể đến 1.5 lít) dồn xuống tĩnh mạch phần dưới cơ thể do trọng lực, làm giảm lượng máu về tim và giảm cung lượng tim. Ở người khỏe mạnh, phản xạ baroreceptor kích hoạt co mạch/tăng nhịp tim bù trừ gần như tức thời. Hạ huyết áp tư thế xảy ra khi cơ chế bù trừ này bị suy yếu — chẩn đoán khi huyết áp tâm thu giảm ≥20mmHg hoặc tâm trương giảm ≥10mmHg trong vòng 3 phút sau khi đứng.",
            causes:
              "Rối loạn hệ thần kinh tự chủ (bệnh thần kinh do tiểu đường, Parkinson), thuốc (đặc biệt thuốc hạ áp, lợi tiểu), mất nước, nằm bất động lâu ngày, tuổi cao, mang thai.",
            outcomes:
              "Không chỉ gây chóng mặt/ngất khi đứng dậy — dữ liệu dịch tễ học cho thấy hạ huyết áp tư thế liên quan tăng nguy cơ té ngã/gãy xương, và ĐÁNG CHÚ Ý là tăng nguy cơ tim mạch (đột quỵ, bệnh mạch vành, suy tim, rung nhĩ) NGAY CẢ Ở NGƯỜI HOÀN TOÀN KHÔNG CÓ TRIỆU CHỨNG — nghĩa là đây không phải tình trạng chỉ đáng lo khi có biểu hiện rõ.",
            treatment: "Xem nhóm 'Xử lý đúng chuẩn' bên dưới.",
            expertNote:
              "Đây là loại 'huyết áp thấp' duy nhất trong 3 loại có bằng chứng nguy cơ tim mạch dài hạn rõ ràng ngay cả khi không triệu chứng — khác hẳn 2 loại còn lại, nên không nên xem nhẹ chỉ vì 'không thấy chóng mặt gì'.",
            application: [
              { domain: "Tự kiểm tra", text: "Đo huyết áp ở tư thế nằm, sau đó đo lại sau 1 và 3 phút đứng dậy — nếu giảm ≥20/10mmHg kèm hoặc không kèm triệu chứng, nên trao đổi với bác sĩ, đặc biệt nếu đang dùng thuốc hạ áp/lợi tiểu." },
            ],
          },
          {
            heading: "Hạ huyết áp sau ăn (Postprandial Hypotension) — 'kẻ giấu mặt' bị bỏ sót ở người lớn tuổi",
            evidence: "strong",
            mechanism:
              "Sau khi ăn, máu dồn về hệ tiêu hóa (splanchnic) để hỗ trợ tiêu hóa/hấp thu, đòi hỏi cơ thể phải co mạch ngoại biên bù trừ để giữ huyết áp ổn định. Ở người lớn tuổi, phản xạ bù trừ này (đặc biệt đáp ứng nhịp tim) bị suy giảm theo tuổi, khiến huyết áp tụt rõ rệt trong vòng 2 giờ sau ăn.",
            causes:
              "Tuổi cao, bệnh Parkinson, rối loạn thần kinh tự chủ; bữa ăn nhiều carbohydrate làm nặng thêm mức độ tụt huyết áp rõ rệt hơn bữa ăn ít carb (một nghiên cứu: tụt trung bình 40mmHg với bữa nhiều carb so với 28mmHg với bữa ít carb).",
            outcomes:
              "Khoảng 2/3 người lớn tuổi tại khoa lão khoa được ghi nhận có hạ huyết áp sau ăn khi tầm soát chủ động — nhưng đây là nguyên nhân gây ngất/té ngã bị NHẬN DIỆN THIẾU đáng kể trong thực hành thông thường, vì triệu chứng (chóng mặt, mệt sau ăn) dễ bị cho là 'bình thường, chỉ là buồn ngủ sau ăn'. Có liên quan đến té ngã, ngất, và được ghi nhận là yếu tố dự báo biến cố tim mạch mới.",
            treatment:
              "Uống khoảng 500ml nước TRƯỚC bữa ăn (không phải trong/sau) đã được chứng minh làm giảm mức độ tụt huyết áp sau ăn; chia nhỏ bữa ăn (6 bữa nhỏ thay vì 3 bữa lớn); giảm tỷ lệ carbohydrate trong bữa ăn nếu tụt huyết áp nặng; nằm/ngồi nghỉ sau ăn thay vì đứng dậy vận động ngay.",
            expertNote:
              "Đây có lẽ là loại hạ huyết áp ít được biết đến nhất trong 3 loại dù mức độ phổ biến ở người lớn tuổi khá cao — nhiều trường hợp té ngã/ngất ở người già được quy cho 'tuổi tác' hoặc nguyên nhân khác trong khi thực chất là hạ huyết áp sau ăn chưa từng được tầm soát.",
            application: [
              { domain: "Thực hành", text: "Nếu người lớn tuổi trong nhà hay chóng mặt/mệt sau bữa ăn chính, thử uống 1 ly nước lớn (~500ml) khoảng 15-20 phút trước khi ăn, và khuyến khích ngồi nghỉ 20-30 phút sau ăn thay vì đứng dậy làm việc ngay." },
            ],
          },
          {
            heading: "Huyết áp thấp mạn tính/thể trạng (Constitutional Hypotension) — ý nghĩa lâm sàng còn tranh cãi thật sự",
            evidence: "contested",
            mechanism:
              "Huyết áp thấp kéo dài, ổn định (không liên quan tư thế hay bữa ăn), thường định nghĩa là tâm thu dưới 105mmHg (nữ) hoặc 110mmHg (nam), không có nguyên nhân bệnh lý rõ ràng xác định được — nhiều khả năng liên quan yếu tố thể trạng/di truyền cá nhân.",
            causes: "Phần lớn không rõ nguyên nhân cụ thể (idiopathic), gặp nhiều hơn ở người trẻ, thể trạng gầy.",
            outcomes:
              "Đây là điểm khác biệt lớn giữa y học phương Tây và nhận thức phổ biến ở một số nơi (bao gồm Việt Nam): phần lớn bác sĩ phương Tây không xem đây là bệnh lý thực sự cần điều trị nếu không triệu chứng. Tuy nhiên, một số nghiên cứu cho thấy dấu hiệu đáng chú ý: giảm tưới máu não đo được và suy giảm nhẹ về tốc độ xử lý nhận thức, trí nhớ, sự chú ý ở người có huyết áp thấp mạn tính NGAY CẢ KHI KHÔNG CÓ TRIỆU CHỨNG CHỦ QUAN — nghĩa là bằng chứng không hoàn toàn ủng hộ quan điểm 'vô hại tuyệt đối', nhưng cũng chưa đủ mạnh để xem là bệnh lý cần điều trị tích cực thường quy.",
            treatment:
              "Nếu hoàn toàn không triệu chứng: theo dõi, không cần điều trị. Nếu có triệu chứng (mệt mỏi, khó tập trung), cần khám loại trừ các nguyên nhân khác gây triệu chứng tương tự trước khi quy hết cho huyết áp thấp (xem nhóm dưới).",
            expertNote:
              "Đây là mục 'contested' thật sự trong y văn quốc tế, không phải do thiếu nghiên cứu — dữ liệu cho cả 2 hướng: có bằng chứng sinh lý học về ảnh hưởng nhận thức đo được, nhưng ý nghĩa lâm sàng thực tế (có cần can thiệp hay không) vẫn là câu hỏi mở, khác hẳn 2 loại hạ huyết áp trên có bằng chứng nguy cơ rõ ràng hơn nhiều.",
            application: [
              { domain: "Cách tiếp cận hợp lý", text: "Nếu huyết áp thấp mạn tính mà không triệu chứng gì, không cần lo lắng hay tìm cách 'điều trị' nó — chỉ cần quan tâm khi có triệu chứng cụ thể, và khi đó nên khám tìm nguyên nhân khác trước khi mặc định là do huyết áp thấp." },
            ],
          },
        ],
      },
      {
        label: "Xử lý đúng chuẩn — không chỉ 'ăn mặn hơn'",
        sections: [
          {
            heading: "Muối và nước — hiệu quả thật nhưng cần giám sát, không phải 'ăn mặn thoải mái'",
            evidence: "moderate",
            mechanism:
              "Tăng lượng muối và nước uống vào làm tăng thể tích tuần hoàn máu, trực tiếp cải thiện khả năng chịu đựng khi thay đổi tư thế — cơ chế đơn giản nhưng hiệu quả với hạ huyết áp tư thế.",
            causes: "—",
            outcomes:
              "Khuyến cáo truyền thống cho hạ huyết áp tư thế: 8-10g muối/ngày, 2-3 lít nước/ngày, có cải thiện khả năng chịu đựng tư thế đứng ghi nhận qua nhiều nghiên cứu nhỏ. Tuy nhiên, đây không phải khuyến cáo áp dụng vô hạn — tăng muối quá mức có thể đẩy huyết áp lên vượt ngưỡng an toàn, đặc biệt nguy hiểm nếu có tăng huyết áp nằm kèm theo (hiện tượng khá phổ biến: huyết áp bình thường/cao khi nằm nhưng tụt khi đứng).",
            treatment:
              "Tăng muối/nước CÓ GIÁM SÁT y tế, không tự ý tăng liều lượng lớn không kiểm soát — đặc biệt cần thận trọng ở người có bệnh tim/thận hoặc có xu hướng tăng huyết áp khi nằm.",
            expertNote:
              "Đây là ví dụ khác về nguyên tắc 'liều lượng tạo nên độc tính' — muối không phải 'tốt' hay 'xấu' tuyệt đối cho huyết áp, mà cần đúng liều cho đúng người, đúng tình trạng, có theo dõi.",
            application: [
              { domain: "Thực hành an toàn", text: "Nếu bác sĩ khuyến nghị tăng muối/nước cho hạ huyết áp tư thế, theo đúng liều lượng cụ thể được hướng dẫn và theo dõi cân nặng hàng ngày (dấu hiệu giữ nước quá mức) thay vì tự ý 'ăn mặn hơn' không có chừng mực." },
            ],
            pitfalls: ["Tự ý ăn mặn nhiều vô hạn vì nghĩ 'huyết áp thấp thì ăn mặn bù lại' — có thể gây hại nếu có tăng huyết áp nằm kèm theo hoặc bệnh tim/thận nền."],
          },
          {
            heading: "Vị trí ép tĩnh mạch — bụng hiệu quả hơn chân, phát hiện phản trực giác",
            evidence: "moderate",
            mechanism:
              "Vùng chứa tĩnh mạch lớn nhất cơ thể là khoang bụng-tạng (splanchnic-mesenteric), không phải chân — do đó ép vùng bụng giảm ứ đọng máu tĩnh mạch hiệu quả hơn nhiều so với chỉ ép chân, dù trực giác thông thường nghĩ ngược lại (vì cảm giác nặng/tê thường ở chân khi đứng lâu).",
            causes: "—",
            outcomes:
              "Nghiên cứu so sánh trực tiếp xác nhận ép vùng bụng cải thiện huyết áp tư thế đứng rõ rệt hơn ép chân đơn thuần. Tất-cao-đùi truyền thống chỉ có tác dụng khiêm tốn và nhiều người thấy khó mặc/bất tiện khi dùng thường xuyên.",
            treatment:
              "Ưu tiên đai/băng ép vùng bụng (abdominal binder) làm lựa chọn chính, có thể kết hợp thêm tất ép chân nếu cần thêm hỗ trợ — thực tế hơn nhiều so với chỉ dựa vào tất ép chân cao đùi vốn bất tiện.",
            expertNote:
              "Đây là kiến thức phản trực giác nhưng có bằng chứng vững — hầu hết sản phẩm/lời khuyên phổ thông về 'tất chống tụt huyết áp' chỉ tập trung vào chân, trong khi vị trí có đòn bẩy sinh lý học cao hơn lại là vùng bụng.",
            application: [
              { domain: "Lựa chọn sản phẩm", text: "Nếu cân nhắc dùng đồ hỗ trợ áp lực cho hạ huyết áp tư thế, ưu tiên đai ép bụng (dễ mặc hơn) trước khi đầu tư vào tất ép chân cao đùi phức tạp." },
            ],
          },
          {
            heading: "Động tác đối áp & uống nước nhanh — miễn phí, tác dụng gần như tức thời",
            evidence: "strong",
            mechanism:
              "Động tác đối áp vật lý (bắt chéo chân và gồng cơ, ngồi xổm, gồng cơ mông) trước/trong khi đứng dậy kích hoạt co cơ chủ động, ép tĩnh mạch chi dưới đẩy máu về tim ngay lập tức — cơ chế cơ học thuần túy, không cần thuốc. Uống nhanh khoảng 500ml nước lạnh kích hoạt phản xạ thần kinh giao cảm (chưa hoàn toàn rõ cơ chế), tăng huyết áp tâm thu đứng khoảng 20mmHg trong 1-2 giờ.",
            causes: "—",
            outcomes:
              "Cả 2 biện pháp đều có bằng chứng RCT/sinh lý học hỗ trợ, tác dụng nhanh (phút đến khoảng 1-2 giờ với nước), không tốn chi phí, không tác dụng phụ đáng kể — hiếm có can thiệp y học nào đạt được tỷ lệ lợi ích/chi phí tốt như vậy.",
            treatment:
              "Trước khi đứng dậy từ tư thế nằm/ngồi lâu: bắt chéo chân và gồng cơ vài giây, hoặc ngồi ở mép giường 30 giây trước khi đứng hẳn. Nếu biết trước tình huống dễ tụt huyết áp (đứng lâu, trời nóng), uống nhanh 1 ly nước lớn 15-20 phút trước.",
            expertNote:
              "Đây là nhóm can thiệp có tỷ lệ chi phí/lợi ích tốt nhất trong toàn bộ mục hạ huyết áp — nên là bước ĐẦU TIÊN thử trước khi nghĩ đến thuốc, dù ít được phổ biến rộng rãi bằng các lời khuyên về ăn mặn/uống nước chung chung.",
            application: [
              { domain: "Thói quen hàng ngày", text: "Tập thói quen ngồi ở mép giường 30 giây trước khi đứng dậy hẳn vào buổi sáng (thời điểm dễ tụt huyết áp tư thế nhất do mất nước qua đêm) — thói quen đơn giản, miễn phí, hiệu quả gần như ngay lập tức." },
            ],
          },
        ],
      },
      {
        label: "Khi nào cần lo thật — và khi nào chỉ là gán ghép sai",
        sections: [
          {
            heading: "Đừng đổ mọi triệu chứng mơ hồ cho 'huyết áp thấp' trước khi loại trừ nguyên nhân khác",
            evidence: "moderate",
            mechanism:
              "Khi phát hiện huyết áp thấp tình cờ ở người có triệu chứng mơ hồ (mệt mỏi, mất năng lượng, tâm trạng kém), có xu hướng tự động quy nguyên nhân cho huyết áp thấp — nhưng mối quan hệ nhân quả này KHÔNG PHẢI lúc nào cũng được xác lập chắc chắn về mặt y khoa.",
            causes:
              "Xu hướng tìm một lời giải thích đơn giản, dễ hiểu (một con số đo được) cho triệu chứng mơ hồ, thay vì tiếp tục tìm kiếm nguyên nhân thực sự phức tạp hơn (thiếu máu, rối loạn tuyến giáp, trầm cảm, thiếu ngủ, tác dụng phụ thuốc...).",
            outcomes:
              "Y văn ghi nhận rõ: nếu triệu chứng như mệt mỏi/mất năng lượng/giảm chất lượng cuộc sống xuất hiện ở người có huyết áp thấp mạn tính, cần tìm một GIẢI THÍCH KHÁC ngoài huyết áp thấp — bỏ sót nguyên nhân thật (có thể điều trị được) trong khi chỉ tập trung 'điều trị huyết áp thấp' là sai lầm lâm sàng đã được ghi nhận.",
            treatment:
              "Nếu có triệu chứng mơ hồ VÀ tình cờ phát hiện huyết áp thấp, không nên dừng lại ở kết luận 'do huyết áp thấp' — nên khám tổng quát tìm các nguyên nhân phổ biến khác trước (công thức máu, chức năng tuyến giáp, đánh giá giấc ngủ/tâm trạng).",
            expertNote:
              "Đây là mẫu số chung với nhiều chủ đề khác trong loạt tài liệu này (MRI dương tính không đồng nghĩa là nguồn gây đau ở tab Thoát vị đĩa đệm; hở van tim nhẹ không đồng nghĩa nguyên nhân mọi triệu chứng): một chỉ số đo được bất thường KHÔNG tự động là lời giải thích đúng cho mọi triệu chứng đi kèm — cần xác lập mối liên hệ thật, không chỉ dựa vào sự trùng hợp thời điểm.",
            application: [
              { domain: "Cách tiếp cận đúng", text: "Nếu mệt mỏi kéo dài và tình cờ biết mình huyết áp thấp, đừng dừng lại ở đó — hỏi bác sĩ về việc tầm soát thêm các nguyên nhân phổ biến khác (thiếu máu, tuyến giáp, giấc ngủ) trước khi mặc định 'do huyết áp thấp'." },
            ],
          },
          {
            heading: "Ngược lại: đừng chủ quan bỏ qua hạ huyết áp tư thế chỉ vì 'không thấy gì'",
            evidence: "strong",
            mechanism:
              "Như đã nêu ở mục cơ chế, hạ huyết áp tư thế có liên hệ với tăng nguy cơ tim mạch dài hạn ngay cả khi không có triệu chứng chủ quan — đây là điểm cân bằng cần thiết với mục trên, tránh đi từ thái cực 'huyết áp thấp không quan trọng' sang bỏ qua hoàn toàn.",
            causes: "—",
            outcomes:
              "Nghiên cứu dân số lớn (ARIC) ghi nhận tăng tỷ lệ đột quỵ và bệnh mạch vành ở người có hạ huyết áp tư thế qua các nhóm tuổi, bao gồm cả nhóm không triệu chứng — đây là lý do hạ huyết áp tư thế xứng đáng được xem là một chỉ số sức khỏe tim mạch cần theo dõi, không chỉ là 'phiền toái nhỏ khi đứng dậy'.",
            treatment:
              "Nếu đo được hạ huyết áp tư thế đạt tiêu chí (≥20/10mmHg) dù không có cảm giác chóng mặt, vẫn nên báo bác sĩ để đánh giá nguyên nhân (đặc biệt rà soát lại thuốc đang dùng) và tầm soát nguy cơ tim mạch liên quan, không chỉ bỏ qua vì 'không thấy triệu chứng gì'.",
            expertNote:
              "Cân bằng 2 mục cuối cùng của tab này chính là tinh thần cốt lõi xuyên suốt: không hoảng loạn với con số đơn lẻ (mục trên), nhưng cũng không chủ quan bỏ qua dấu hiệu khách quan có bằng chứng nguy cơ thật (mục này) — cả 2 sai lầm đều phổ biến ở 2 thái cực khác nhau.",
            application: [
              { domain: "Tầm soát định kỳ", text: "Nếu trên 65 tuổi hoặc đang dùng thuốc hạ áp/lợi tiểu, cân nhắc đo huyết áp tư thế định kỳ (nằm rồi đứng) ngay cả khi không có triệu chứng — đây là xét nghiệm đơn giản, miễn phí, làm được tại nhà." },
            ],
          },
        ],
      },
      {
        label: "Ba nguyên nhân/dạng đặc biệt hay bị nhầm lẫn",
        note: "Ba chủ đề người dùng hay thắc mắc nhất về huyết áp thấp — mỗi cái có cơ chế và ý nghĩa hoàn toàn khác nhau, dễ gây nhầm lẫn nếu gộp chung.",
        sections: [
          {
            heading: "'Huyết áp thấp bẩm sinh' — thực chất là một đặc điểm di truyền liên tục, không phải một bệnh riêng biệt",
            evidence: "strong",
            mechanism:
              "Huyết áp (cả cao lẫn thấp) là một đặc điểm số liệu liên tục chịu ảnh hưởng bởi hàng trăm gen tác động nhỏ lẻ (polygenic) cộng với môi trường — không có 'gen huyết áp thấp' đơn lẻ nào gây ra tình trạng này giống các bệnh di truyền đơn gen. Ai cũng nằm đâu đó trên một phổ liên tục, và người có huyết áp thấp bẩm sinh đơn giản là nằm ở đầu thấp của phân bố đó do tổ hợp gen thừa hưởng từ cha mẹ.",
            causes:
              "Di truyền từ cha/mẹ — nghiên cứu cặp song sinh ước tính khoảng 30-60% sự biến thiên huyết áp giữa các cá nhân là do yếu tố di truyền, phần còn lại do môi trường (chế độ ăn, cân nặng, vận động, stress).",
            outcomes:
              "Nếu đây là kiểu 'huyết áp thấp thể trạng' như đã nêu ở nhóm Cơ chế & phân loại phía trên (ổn định, không triệu chứng, không liên quan bệnh lý), yếu tố di truyền chỉ đơn thuần giải thích TẠI SAO một người có xu hướng này — không tự nó là dấu hiệu bệnh lý cần lo lắng.",
            treatment:
              "Không có 'điều trị' cho một đặc điểm di truyền bình thường — chỉ cần theo dõi như nhóm Cơ chế & phân loại đã nêu: quan tâm khi có triệu chứng cụ thể, không phải vì con số đo được nằm ở đầu thấp của phổ phân bố dân số.",
            expertNote:
              "Cách hiểu hữu ích: hỏi 'huyết áp thấp bẩm sinh là bệnh gì' cũng tương tự hỏi 'người thấp bẩm sinh là bệnh gì' — chiều cao và huyết áp đều là đặc điểm liên tục do đa gen quyết định, có người ở đầu cao/thấp của phổ phân bố một cách hoàn toàn bình thường, không phải bệnh lý.",
            application: [
              { domain: "Cách hiểu đúng", text: "Nếu trong gia đình có nhiều người huyết áp thấp và bản thân không triệu chứng gì, xem đây là đặc điểm di truyền gia đình bình thường, không cần tìm cách 'chữa' hay lo lắng riêng vì yếu tố di truyền này." },
            ],
          },
          {
            heading: "Thiếu máu — khác hẳn huyết áp thấp dù hay bị gộp chung trong cách nói thông thường",
            evidence: "strong",
            mechanism:
              "Huyết áp thấp (hypotension) là vấn đề về ÁP LỰC dòng máu trong mạch; thiếu máu (anemia) là vấn đề về SỐ LƯỢNG hồng cầu/hemoglobin — hai đại lượng vật lý hoàn toàn khác nhau, đo bằng 2 xét nghiệm khác nhau (huyết áp kế vs xét nghiệm công thức máu). Tên gọi dân gian 'thiếu máu' dễ khiến người nghe liên tưởng đến 'máu ít/loãng' kiểu huyết áp thấp, dù bản chất là thiếu tế bào hồng cầu mang oxy.",
            causes:
              "Nhầm lẫn phổ biến vì cả hai đều có thể gây triệu chứng chồng lấp (chóng mặt, mệt mỏi, hoa mắt) khiến người bệnh khó tự phân biệt nếu chỉ dựa vào cảm giác chủ quan.",
            outcomes:
              "Thiếu máu MẠN TÍNH nhẹ-vừa (ví dụ thiếu sắt từ từ) thường KHÔNG trực tiếp gây huyết áp thấp — cơ thể có cơ chế bù trừ (tăng nhịp tim) khá hiệu quả; triệu chứng chủ yếu đến từ thiếu oxy mô, không phải từ áp lực mạch máu thấp. Ngược lại, thiếu máu do MẤT MÁU CẤP (chảy máu nhanh) có thể gây tụt huyết áp thật sự do giảm thể tích tuần hoàn — đây là tình huống cấp cứu khác hẳn về bản chất và mức độ khẩn cấp so với thiếu máu mạn tính từ từ.",
            treatment:
              "Chẩn đoán thiếu máu cần xét nghiệm công thức máu (đo hemoglobin/hồng cầu), KHÔNG thể chẩn đoán chỉ bằng đo huyết áp. Nếu có triệu chứng mệt mỏi/chóng mặt, nên làm cả 2 xét nghiệm (đo huyết áp VÀ xét nghiệm máu) thay vì mặc định là một trong hai.",
            expertNote:
              "Đây là một trong những nhầm lẫn phổ biến nhất trong nhận thức sức khỏe đại chúng ở Việt Nam — thói quen gọi cả 2 tình trạng bằng ngôn ngữ có chữ 'máu' (huyết áp thấp/thiếu máu) vô tình khiến người ta nghĩ chúng là cùng một vấn đề ở các mức độ khác nhau, trong khi thực chất là 2 xét nghiệm, 2 cơ chế, 2 hướng điều trị hoàn toàn khác nhau.",
            application: [
              { domain: "Phân biệt khi có triệu chứng", text: "Nếu chóng mặt/mệt mỏi kéo dài, yêu cầu bác sĩ làm CẢ hai: đo huyết áp (kể cả tư thế) VÀ xét nghiệm công thức máu — không giả định trước là 'chắc do huyết áp thấp' hay 'chắc do thiếu máu' chỉ dựa vào cảm giác." },
            ],
            pitfalls: ["Tự uống thuốc bổ máu/sắt vì nghĩ 'huyết áp thấp chắc do thiếu máu' mà chưa xét nghiệm xác nhận — nếu không thực sự thiếu sắt, bổ sung sắt không cần thiết có thể gây hại (quá tải sắt) mà không giải quyết được nguyên nhân thật."],
          },
          {
            heading: "Hệ thần kinh 'quá nhạy' — ngất do phản xạ thần kinh tim mạch (Vasovagal Syncope), cơ chế khác hẳn hạ huyết áp tư thế",
            evidence: "strong",
            mechanism:
              "Đây là tình trạng được chính y văn mô tả là 'tăng nhạy cảm' (hypersensitivity) của hệ thần kinh tự chủ, phản ứng THÁI QUÁ với các kích thích bình thường (đứng lâu, nóng, đau, xúc động mạnh, thấy máu, thậm chí đi tiểu/ho mạnh). Khác với hạ huyết áp tư thế đơn thuần (chỉ là cơ chế bù trừ yếu đi), ở đây phản xạ baroreceptor bị 'đảo ngược' — thay vì tăng nhịp tim bù trừ khi huyết áp giảm, cơ thể lại tăng hoạt động phó giao cảm (dây X) gây CHẬM nhịp tim và giãn mạch CÙNG LÚC, khiến huyết áp tụt nhanh và mạnh hơn nhiều.",
            causes:
              "Yếu tố kích hoạt rất đa dạng và mang tính cá nhân: đứng lâu trong môi trường nóng/đông người, đau đột ngột, xúc động mạnh/sợ hãi, nhìn thấy máu/kim tiêm, đi tiểu, ho mạnh — thường không xác định được rõ ràng ở nhiều người.",
            outcomes:
              "Đây là nguyên nhân phổ biến NHẤT gây ngất ở cả trẻ em lẫn người lớn (phổ biến hơn nhiều bệnh lý tim mạch nghiêm trọng) — thường có dấu hiệu báo trước đặc trưng (buồn nôn, hoa mắt, cảm giác nóng bừng, tái mặt, vã mồ hôi) vài giây đến vài chục giây trước khi ngất, khác với ngất do nguyên nhân tim mạch nghiêm trọng thường xảy ra đột ngột không báo trước.",
            treatment:
              "Nhận diện sớm dấu hiệu báo trước để kịp ngồi/nằm xuống trước khi ngất hẳn (tránh chấn thương do té ngã). Tránh các yếu tố kích hoạt đã biết của bản thân. Động tác đối áp vật lý (đã nêu ở nhóm Xử lý đúng chuẩn) đặc biệt hiệu quả ngay khi thấy dấu hiệu báo trước. Nếu ngất tái phát nhiều lần không rõ nguyên nhân, cần bác sĩ tim mạch đánh giá bằng nghiệm pháp bàn nghiêng (tilt-table test) để xác nhận chẩn đoán và loại trừ nguyên nhân tim mạch nguy hiểm hơn.",
            expertNote:
              "Điểm quan trọng nhất cần phân biệt: ngất kiểu này (có dấu hiệu báo trước rõ, xảy ra khi đứng lâu/xúc động/đau, hồi phục nhanh hoàn toàn) khác về bản chất với ngất do rối loạn nhịp tim nguy hiểm (thường đột ngột, không báo trước, có thể xảy ra cả khi đang ngồi/nằm, đặc biệt đáng lo nếu có tiền sử bệnh tim hoặc ngất khi đang gắng sức) — sự khác biệt này quyết định mức độ khẩn cấp cần đi khám.",
            application: [
              { domain: "Khi có dấu hiệu báo trước", text: "Ngay khi cảm thấy buồn nôn/hoa mắt/nóng bừng trước khi ngất, lập tức ngồi/nằm xuống và gác chân cao — đừng cố đứng vững hay đi tìm chỗ ngồi xa, nguy cơ té ngã chấn thương khi ngất đứng cao hơn nhiều so với ngồi/nằm sẵn." },
            ],
            pitfalls: ["Ngất khi đang gắng sức (không phải khi đứng lâu/xúc động) hoặc ngất đột ngột không có dấu hiệu báo trước — đây là cờ đỏ cần loại trừ nguyên nhân tim mạch nguy hiểm, không nên mặc định là vasovagal syncope thông thường."],
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
  // Thoát vị đĩa đệm
  { pillar: "Thoát vị đĩa đệm", leverage: "high", text: "Nếu mới chẩn đoán thoát vị, không hoảng loạn — đa số tự tiêu/cải thiện qua điều trị bảo tồn trong vài tháng", why: "Tỷ lệ tự tiêu 41–96% tùy loại thoát vị; NASS Guideline xác nhận đa số đĩa đệm tự co lại theo tiến trình tự nhiên." },
  { pillar: "Thoát vị đĩa đệm", leverage: "high", text: "Giai đoạn đau cấp: vận động nhẹ nhàng sớm, không nằm bất động cả ngày", why: "Cochrane review (10 RCT) xác nhận khuyên vận động cho cải thiện đau/chức năng tốt hơn khuyên nằm nghỉ." },
  { pillar: "Thoát vị đĩa đệm", leverage: "high", text: "Học thuộc dấu hiệu báo động cấp cứu: mất kiểm soát tiểu/đại tiện, tê vùng yên ngựa, yếu chân tiến triển nhanh", why: "Hội chứng chùm đuôi ngựa cần mổ giải chèn ép trong 24–48h để tránh tổn thương thần kinh vĩnh viễn." },
  { pillar: "Thoát vị đĩa đệm", leverage: "moderate", text: "Nếu bác sĩ nói 'phình/lồi đĩa đệm' trên MRI nhưng không tê yếu chân theo rễ cụ thể, hỏi rõ có tương ứng triệu chứng không", why: "Bất thường MRI cực phổ biến ở người không đau (30–84% tùy tuổi) — không phải mọi phát hiện đều là nguồn gây đau." },
  { pillar: "Thoát vị đĩa đệm", leverage: "low", text: "Đòi mổ ngay khi mới chẩn đoán mà chưa thử đủ điều trị bảo tồn 6–12 tuần", why: "Kết quả phẫu thuật và bảo tồn hội tụ tương đương ở phần lớn ca không cấp cứu khi theo dõi dài hạn." },
  { pillar: "Thoát vị đĩa đệm", leverage: "moderate", text: "Nếu cân nhắc tiêm ngoài màng cứng, hiểu đây là biện pháp 'bắc cầu' tạm thời, không phải giải pháp chữa khỏi vĩnh viễn", why: "Effect size ngắn hạn có ý nghĩa thống kê nhưng nhỏ (dưới ngưỡng ý nghĩa lâm sàng tối thiểu theo 1 review), không khác biệt dài hạn so với đối chứng theo nhiều meta-analysis." },
  { pillar: "Thoát vị đĩa đệm", leverage: "low", text: "Kỳ vọng gabapentin/pregabalin là giải pháp cho đau thần kinh tọa chỉ vì nghe hợp lý về cơ chế 'đau thần kinh'", why: "RCT lớn (NEJM) và systematic review 8 RCT đều cho thấy KHÔNG có lợi ích rõ so với giả dược — kê đơn phổ biến vượt xa bằng chứng ủng hộ." },

  // Tư thế
  { pillar: "Tư thế & Cơ sinh học", leverage: "high", text: "Đổi tư thế ngồi/đứng mỗi 20–30 phút thay vì cố giữ 'lưng thẳng' cả ngày", why: "Sự TĨNH TẠI kéo dài mới là vấn đề thật đã được xác nhận, không phải tư thế cụ thể nào — review hệ thống không tìm thấy khác biệt tư thế giữa người có/không đau lưng." },
  { pillar: "Tư thế & Cơ sinh học", leverage: "high", text: "Khi nâng đồ nặng, giữ vật CÀNG GẦN cơ thể càng tốt — quan trọng hơn việc khuỵu gối hay cúi lưng", why: "Review cơ sinh học hệ thống không ủng hộ squat an toàn hơn stoop; khoảng cách vật-cơ thể mới là biến số có bằng chứng." },
  { pillar: "Tư thế & Cơ sinh học", leverage: "high", text: "Nếu đau đã được bác sĩ xác nhận an toàn, quay lại vận động bình thường dần thay vì né tránh tuyệt đối", why: "Fear-avoidance/kinesiophobia tự nó dự đoán tiên lượng xấu hơn, độc lập với mức độ tổn thương mô thực tế trên phim." },
  { pillar: "Tư thế & Cơ sinh học", leverage: "low", text: "Ép bản thân/người nhà ngồi thẳng lưng cứng nhắc cả ngày vì tin đây là cách phòng ngừa duy nhất", why: "Không có bằng chứng ủng hộ; ép giữ tư thế cứng có thể tăng căng cơ thay vì bảo vệ." },
  { pillar: "Tư thế & Cơ sinh học", leverage: "moderate", text: "Nếu công việc yêu cầu lái xe/vận hành máy rung xóc nhiều, ưu tiên giải pháp giảm rung xóc + nghỉ giải lao hơn là chỉ chỉnh tư thế ngồi", why: "Thời gian lái xe cho liên hệ mạnh nhất với đau lưng trong các yếu tố 'ngồi lâu' (OR 2.03) — vì kết hợp cả tĩnh tại lẫn rung xóc, khác hẳn ngồi văn phòng thông thường (bằng chứng yếu/mâu thuẫn)." },

  // Vận động
  { pillar: "Vận động & Bảo vệ khớp", leverage: "high", text: "Học vài động tác core cơ bản (plank, bird-dog, dead bug) đúng kỹ thuật, duy trì đều 2–3 lần/tuần ≥8 tuần", why: "Meta-analysis xác nhận hiệu quả giảm đau/cải thiện chức năng rõ nhất khi tập đều 8–12 tuần." },
  { pillar: "Vận động & Bảo vệ khớp", leverage: "high", text: "Với đau khớp mạn tính, coi vận động là điều trị chứ không phải điều cần tránh", why: "Guideline thoái hóa khớp xếp vận động là điều trị nền tảng hàng đầu — sụn khớp cần vận động chịu tải theo chu kỳ để được nuôi dưỡng qua khuếch tán." },
  { pillar: "Vận động & Bảo vệ khớp", leverage: "moderate", text: "Nếu hút thuốc, ưu tiên cai thuốc trên cả việc chỉnh tư thế/kỹ thuật nâng", why: "Nicotine co mạch nuôi đĩa đệm — có bằng chứng dịch tễ nhất quán hơn nhiều so với các yếu tố tư thế." },
  { pillar: "Vận động & Bảo vệ khớp", leverage: "moderate", text: "Duy trì cân nặng hợp lý — giảm tải cơ học trực tiếp lên đĩa đệm/khớp mỗi ngày", why: "Thừa cân liên quan tăng nguy cơ đau lưng mạn tính qua nhiều nghiên cứu dịch tễ." },
  { pillar: "Vận động & Bảo vệ khớp", leverage: "low", text: "Dừng vận động/vật lý trị liệu vì tin uống glucosamine/chondroitin là đủ để 'bảo vệ khớp'", why: "Hiệu quả glucosamine/chondroitin khiêm tốn và không nhất quán giữa các meta-analysis (ACR khuyến cáo có điều kiện KHÔNG dùng) — không thể thay thế vận động, nhóm can thiệp có bằng chứng vững hơn nhiều." },

  // Huyết áp thấp
  { pillar: "Huyết áp thấp", leverage: "high", text: "Tập thói quen ngồi ở mép giường 30 giây trước khi đứng dậy hẳn, đặc biệt buổi sáng", why: "Động tác đối áp có bằng chứng RCT/sinh lý học, tác dụng gần như tức thời, miễn phí — nên là bước đầu tiên thử trước khi nghĩ đến thuốc." },
  { pillar: "Huyết áp thấp", leverage: "high", text: "Nếu người lớn tuổi trong nhà hay chóng mặt/mệt sau bữa ăn, thử uống ~500ml nước 15-20 phút trước khi ăn", why: "Hạ huyết áp sau ăn là 'kẻ giấu mặt' bị bỏ sót ở người già (2/3 người tại khoa lão khoa có tình trạng này) — uống nước trước ăn đã được chứng minh giảm mức độ tụt." },
  { pillar: "Huyết áp thấp", leverage: "moderate", text: "Nếu trên 65 tuổi hoặc dùng thuốc hạ áp/lợi tiểu, đo huyết áp tư thế định kỳ (nằm rồi đứng) dù không có triệu chứng", why: "Hạ huyết áp tư thế liên quan tăng nguy cơ đột quỵ/bệnh mạch vành NGAY CẢ khi không triệu chứng — không nên chủ quan chỉ vì 'không thấy chóng mặt'." },
  { pillar: "Huyết áp thấp", leverage: "moderate", text: "Nếu mệt mỏi kéo dài và tình cờ biết mình huyết áp thấp, hỏi bác sĩ tầm soát thêm nguyên nhân khác trước khi mặc định 'do huyết áp thấp'", why: "Mối quan hệ nhân quả giữa huyết áp thấp mạn tính và triệu chứng mơ hồ không phải lúc nào cũng được xác lập chắc chắn — dễ bỏ sót nguyên nhân thật (thiếu máu, tuyến giáp, giấc ngủ)." },
  { pillar: "Huyết áp thấp", leverage: "low", text: "Tự ý ăn mặn nhiều vô hạn vì nghĩ 'huyết áp thấp thì ăn mặn bù lại', không có giám sát y tế", why: "Có thể gây hại nếu có tăng huyết áp nằm kèm theo hoặc bệnh tim/thận nền — muối cần đúng liều cho đúng người, không phải 'càng nhiều càng tốt'." },
  { pillar: "Huyết áp thấp", leverage: "high", text: "Nếu chóng mặt/mệt mỏi kéo dài, yêu cầu bác sĩ làm CẢ đo huyết áp LẪN xét nghiệm công thức máu, không giả định trước là do cái nào", why: "Huyết áp thấp và thiếu máu là 2 xét nghiệm, 2 cơ chế khác nhau hoàn toàn dù hay bị gộp chung trong cách nói — thiếu máu mạn tính nhẹ thường KHÔNG trực tiếp gây huyết áp thấp." },
  { pillar: "Huyết áp thấp", leverage: "high", text: "Ngay khi thấy dấu hiệu báo trước (buồn nôn, hoa mắt, nóng bừng), lập tức ngồi/nằm xuống và gác chân cao thay vì cố đứng vững", why: "Ngất do phản xạ thần kinh tim mạch (vasovagal) là nguyên nhân ngất phổ biến nhất — nhận diện sớm dấu hiệu báo trước giúp tránh chấn thương do té ngã." },
  { pillar: "Huyết áp thấp", leverage: "moderate", text: "Nếu gia đình có nhiều người huyết áp thấp và bản thân không triệu chứng gì, xem là đặc điểm di truyền bình thường, không cần tìm cách 'chữa'", why: "Huyết áp là đặc điểm đa gen liên tục (30-60% do di truyền theo nghiên cứu song sinh) — tương tự chiều cao, có người ở đầu thấp của phổ phân bố một cách hoàn toàn bình thường." },
  { pillar: "Huyết áp thấp", leverage: "low", text: "Tự uống thuốc bổ máu/sắt vì nghĩ 'huyết áp thấp chắc do thiếu máu' mà chưa xét nghiệm xác nhận", why: "Nếu không thực sự thiếu sắt, bổ sung không cần thiết có thể gây hại (quá tải sắt) mà không giải quyết được nguyên nhân thật gây triệu chứng." },
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
            Case thực hành
          </div>
          <span style={{ fontFamily: serif, color: C.ink, fontSize: 16.5, fontWeight: 600 }}>
            Dân văn phòng, mới phát hiện thoát vị nhẹ qua MRI, đang sợ vận động
          </span>
        </div>
        {open ? <ChevronUp size={18} color={C.teal} className="shrink-0" /> : <ChevronDown size={18} color={C.teal} className="shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13, lineHeight: 1.6, fontStyle: "italic", marginTop: 10 }}>
            Tình huống rất phổ biến: đi khám vì đau lưng nhẹ, chụp MRI thấy 'thoát vị/lồi đĩa đệm', rồi mang tâm lý sợ hãi né tránh vận động từ đó — dù thực ra đây thường là tình huống có thể xử lý tốt.
          </p>

          <CaseStage num="1" title="Hiểu đúng bản chất trước khi hành động">
            <CaseBullet>Kết quả MRI 'thoát vị/lồi đĩa đệm' không phải bản án — bất thường này gặp ở 30–84% người HOÀN TOÀN KHÔNG ĐAU tùy tuổi. Chỉ có giá trị khi khớp với triệu chứng khám lâm sàng (đau/tê/yếu theo đúng rễ thần kinh).</CaseBullet>
            <CaseBullet>Đa số thoát vị tự tiêu theo thời gian (41–96% tùy loại) qua cơ chế tự nhiên của cơ thể — không cần hoảng loạn nghĩ phải mổ ngay.</CaseBullet>
          </CaseStage>

          <CaseStage num="2" title="Nếu đang đau cấp: vận động nhẹ sớm, biết dấu hiệu báo động">
            <CaseBullet><b style={{ color: C.ink }}>Không nằm bất động cả ngày</b> — Cochrane xác nhận khuyên vận động cho kết quả tốt hơn khuyên nằm nghỉ. Nghỉ tư thế thoải mái 1–2 ngày nếu đau nhiều, sau đó chủ động đi lại nhẹ nhàng.</CaseBullet>
            <CaseBullet>Ghi nhớ dấu hiệu báo động cần cấp cứu: mất kiểm soát tiểu/đại tiện, tê vùng yên ngựa, yếu chân tiến triển nhanh — đây là trường hợp hiếm nhưng cần biết để phân biệt với đau lưng thông thường.</CaseBullet>
          </CaseStage>

          <CaseStage num="3" title="Xây dựng lại: vận động + giảm yếu tố nguy cơ thật">
            <CaseBullet><b style={{ color: C.ink }}>Core stability 2–3 lần/tuần, ≥8 tuần:</b> plank, bird-dog, dead bug — đều đặn quan trọng hơn loại bài tập cụ thể.</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Đổi tư thế mỗi 20–30 phút</b> thay vì ám ảnh giữ 'lưng thẳng' — tĩnh tại kéo dài mới là vấn đề thật, không phải tư thế cụ thể.</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Nếu hút thuốc/thừa cân:</b> đây là 2 yếu tố nguy cơ có bằng chứng dịch tễ thật — ưu tiên xử lý trên cả việc chỉnh tư thế.</CaseBullet>
          </CaseStage>

          <CaseStage num="4" title="Khi nào cần chuyên môn y tế — không tự xử lý tiếp">
            <CaseBullet>Đau không cải thiện sau 6–12 tuần điều trị bảo tồn đúng cách (vật lý trị liệu + thuốc + vận động có kiểm soát).</CaseBullet>
            <CaseBullet>Yếu cơ tiến triển hoặc đau ảnh hưởng nghiêm trọng chức năng sống hàng ngày.</CaseBullet>
            <MedicalNote
              items={[
                "Dấu hiệu chùm đuôi ngựa (mất kiểm soát tiểu/đại tiện, tê vùng yên ngựa, yếu chân tiến triển nhanh) → cấp cứu ngay trong vài giờ, không trì hoãn.",
                "Đau không đáp ứng bảo tồn 6–12 tuần → hỏi bác sĩ chuyên khoa cột sống về đánh giá phẫu thuật (microdiscectomy) — quyết định dựa trên ảnh hưởng chức năng, không chỉ kích thước thoát vị trên MRI.",
                "Bắt đầu chương trình tập core/vận động mới, đặc biệt nếu có bệnh nền hoặc từng chấn thương cột sống → tham khảo bác sĩ/vật lý trị liệu để được hướng dẫn đúng kỹ thuật ban đầu, tránh tự tập sai cách.",
                "Thuốc giảm đau/giãn cơ bất kỳ loại nào → chỉ dùng khi bác sĩ đã thăm khám và kê đơn cụ thể, không tự mua/tự dùng kéo dài.",
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
              { topic: "Tư thế", text: "Đặt lịch nhắc (app/đồng hồ) 'đứng dậy đi lại' mỗi 30 phút — không cần tự nhớ, chuông reo là dấu hiệu." },
              { topic: "Đĩa đệm", text: "Chuyển vật nặng thường dùng (túi gạo, thùng nước, đồ trong bếp) lên kệ ngang thắt lưng một lần — giảm vĩnh viễn số lần phải cúi nâng từ sàn thấp." },
              { topic: "Vận động", text: "Đặt sẵn thảm tập ở nơi dễ thấy (cạnh giường/TV) — giảm rào cản 'phải lấy đồ' mỗi lần định tập." },
            ]}
          />

          <LazyGroup
            title="Gắn vào thói quen có sẵn — không tạo hoạt động mới"
            sub="habit stacking: móc vào việc đã làm tự động mỗi ngày"
            color={C.teal}
            items={[
              { topic: "Vận động", text: "Làm 1 hiệp plank hoặc bird-dog ngay sau khi đánh răng buổi sáng — gắn vào hành động đã tự động, không cần nhớ 'giờ tập'." },
              { topic: "Tư thế", text: "Đứng dậy vươn vai mỗi lần đứng dậy rót nước/pha cà phê — không tốn thêm thời gian riêng." },
              { topic: "Tư thế", text: "Nghe điện thoại (không cần nhìn màn hình) thì đứng dậy đi lại quanh phòng thay vì ngồi yên tại bàn." },
            ]}
          />

          <LazyGroup
            title="Phiên bản tối thiểu — làm ít còn hơn không làm"
            sub="khi không đủ thời gian/năng lượng cho phiên bản đầy đủ"
            color={C.green}
            items={[
              { topic: "Vận động", text: "Không có 20–30 phút tập core? 5 phút plank + bird-dog ngắn vẫn tốt hơn không làm gì — đều đặn quan trọng hơn thời lượng mỗi buổi." },
              { topic: "Tư thế", text: "Không nhớ đổi tư thế mỗi 20–30 phút? Chỉ cần đứng dậy mỗi lần nghe điện thoại hoặc mỗi lần chuyển việc — vẫn phá được sự tĩnh tại kéo dài." },
              { topic: "Đĩa đệm", text: "Không có thời gian tập cả bài? Riêng việc giữ vật gần cơ thể khi nâng bất kỳ thứ gì (túi đồ, con, thùng hàng) đã là hành động đơn lẻ có đòn bẩy cao nhất, làm được mọi lúc." },
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
      <div className="rounded-md p-5" style={{ background: "rgba(62,203,132,0.09)", border: `1.5px solid ${C.green}` }}>
        <div style={{ fontFamily: mono, color: C.green, fontSize: 11, letterSpacing: "0.06em" }} className="uppercase mb-2">
          Thần chú
        </div>
        <p style={{ fontFamily: serif, color: C.ink, fontSize: 17, lineHeight: 1.6, fontWeight: 600 }}>
          Đọc xong, nhất định phải biến nó thành hành động. 🚀
        </p>
        <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13.5, lineHeight: 1.65, marginTop: 8 }}>
          Cả khung này vô dụng nếu chỉ đọc mà không làm. Hiểu biết không tự làm mạnh cơ core hay giảm nỗi sợ vận động — hành động mới làm được. Với người bận/hay quên/lười, quy tắc sống còn là: <b>làm phiên bản tệ nhất còn hơn không làm</b>.
        </p>
        <div className="mt-3 flex flex-col gap-1.5">
          <p style={{ fontFamily: mono, color: C.green, fontSize: 12.5, lineHeight: 1.5 }}>→ Trước khi đóng tab này, chọn đúng 1 mục "đòn bẩy cao" ở trên và làm ngay trong 2 phút tới.</p>
          <p style={{ fontFamily: mono, color: C.inkDim, fontSize: 12, lineHeight: 1.5 }}>Gợi ý dễ nhất: đứng dậy đi lại 1 vòng · 1 hiệp plank ngắn · đổi tư thế ngồi ngay bây giờ.</p>
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
            Hồ sơ nghiên cứu · cấp chuyên gia · Actionable + 4 chủ đề
          </div>
          <h1 style={{ fontFamily: serif, color: C.ink, fontSize: 32, lineHeight: 1.15 }}>Thoát vị đĩa đệm & Bảo vệ cơ xương khớp</h1>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 14.5, marginTop: 6 }}>
            Cơ chế → Nguyên nhân → Kết quả/hậu quả → Cách chữa → Góc nhìn chuyên gia cho mỗi chủ đề con. Nhiều mục kiểm chứng lại các huyền thoại phổ biến (tư thế, kỹ thuật nâng, huyết áp thấp) bằng bằng chứng hiện đại.
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
            Ghi chú phương pháp luận: tổng hợp từ Cochrane Review (bed rest vs stay active, epidural steroid injection), NASS Guideline, các meta-analysis về core stability/motor control exercise, gabapentinoid cho đau thần kinh tọa, glucosamine/chondroitin, review cơ sinh học về kỹ thuật nâng, review hệ thống về ngồi lâu, nghiên cứu MRI trên quần thể không triệu chứng (Brinjikji et al.), các nghiên cứu về hạ huyết áp tư thế/sau ăn/thể trạng (bao gồm dữ liệu ARIC, meta-analysis postprandial hypotension), nghiên cứu di truyền học huyết áp (twin/family studies), cơ chế thiếu máu-huyết áp, và y văn về ngất do phản xạ thần kinh tim mạch (vasovagal/neurally mediated syncope). Nội dung mang tính giáo dục, không thay thế tư vấn y tế chuyên môn — đặc biệt với dấu hiệu báo động (mất kiểm soát tiểu/đại tiện, tê vùng yên ngựa, yếu chân tiến triển, ngất đột ngột không báo trước hoặc khi đang gắng sức) cần đi khám/cấp cứu ngay, không tự điều trị.
          </p>
        </footer>
      </div>
    </div>
  );
}
