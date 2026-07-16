import React, { useState } from "react";
import {
  Flame,
  Zap,
  Moon,
  ListChecks,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS — giữ nguyên palette/font từ Khung Sống Lành Mạnh v2
   để hai file thuộc cùng một hệ sinh thái thị giác.
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
  if (!text) return null;
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
  if (!steps) return null;
  const list = Array.isArray(steps) ? steps : [{ domain: "", text: steps }];
  return (
    <div className="rounded-md p-3" style={{ background: "rgba(214,166,76,0.06)", border: `1px solid ${C.goldDim}` }}>
      <div style={{ fontFamily: mono, color: C.gold, fontSize: 10.5, letterSpacing: "0.06em" }} className="uppercase mb-2">
        Ứng dụng · protocol thực hành
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
                {item.domain && <span style={{ fontFamily: mono, color: C.teal, fontSize: 11 }}>[{item.domain}] </span>}
                {item.text}
              </p>
            </div>
          );
        })}
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

/* ---------------------------------------------------------------
   SECTION CARD — schema: Cơ chế → Nguyên nhân → Kết quả → Cách chữa → Góc nhìn chuyên gia
--------------------------------------------------------------- */
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
  gerd: [
    ["LES (Lower Esophageal Sphincter)", "cơ vòng thực quản dưới — 'van' ngăn dịch dạ dày trào ngược lên."],
    ["TLESR", "giãn cơ vòng thực quản dưới thoáng qua, không liên quan đến nuốt — cơ chế trào ngược chiếm ưu thế ở đa số bệnh nhân GERD."],
    ["Thoát vị khe hoành (Hiatal hernia)", "phần trên dạ dày trồi lên lồng ngực qua khe hoành, làm mất hỗ trợ cơ học cho LES."],
    ["NERD", "Non-Erosive Reflux Disease — trào ngược có triệu chứng nhưng nội soi không thấy tổn thương niêm mạc, chiếm ~70% ca GERD."],
    ["Reflux Hypersensitivity", "có trào ngược sinh lý bình thường nhưng ngưỡng cảm nhận của thực quản bị hạ thấp, gây triệu chứng."],
    ["Functional Heartburn", "ợ nóng không do trào ngược axit bất thường — cơ chế thuần túy là tăng nhạy cảm thần kinh trung ương."],
    ["Deprescribing", "quy trình giảm/ngưng thuốc có kiểm soát khi không còn chỉ định cần thiết — chính thức có trong ACG Guideline 2022."],
    ["CRH (Corticotropin-Releasing Hormone)", "hormone vùng dưới đồi tiết khi stress, có tác dụng trực tiếp làm tăng nhạy cảm nội tạng."],
    ["P-CAB", "Potassium-Competitive Acid Blocker — nhóm thuốc ức chế axit thế hệ mới (vonoprazan...), gắn hồi phục vào bơm proton, không cần acid hoạt hóa như PPI."],
    ["Nocturnal Acid Breakthrough", "hiện tượng axit 'đột phá' ban đêm dù đang dùng PPI đúng cách — gặp ở khoảng một nửa bệnh nhân, do PPI chỉ ức chế bơm proton đang hoạt động."],
    ["Baclofen / GABA-B agonist", "thuốc giãn cơ trung ương, dùng off-label trong GERD kháng trị vì ức chế trực tiếp phản xạ gây TLESR — khác cơ chế mọi thuốc kháng axit."],
    ["LPR (Laryngopharyngeal Reflux)", "trào ngược lên đến thanh quản/hầu, gây khàn tiếng/ho mạn tính, thường KHÔNG kèm ợ nóng điển hình ('silent reflux')."],
    ["Trào ngược mật (Bile reflux)", "dịch tá tràng chứa muối mật trào ngược, không phải axit — không đáp ứng PPI vì cơ chế tổn thương không phụ thuộc pH."],
  ],
  stress: [
    ["Allostatic Load", "'hao mòn' tích lũy của cơ thể do tiếp xúc lặp lại/mạn tính với stress — khung lý thuyết của McEwen & Stellar."],
    ["Trục HPA", "Hạ đồi–Tuyến yên–Thượng thận — trục nội tiết trung tâm điều phối phản ứng với stress, tiết cortisol."],
    ["ANS giao cảm/phó giao cảm", "hai nhánh hệ thần kinh tự chủ: giao cảm ('chiến hay chạy') và phó giao cảm ('nghỉ và tiêu hóa')."],
    ["HRV (Heart Rate Variability)", "biến thiên nhịp tim — chỉ số phản ánh cân bằng ANS; HRV thấp gợi ý giao cảm ưu thế."],
    ["Telomere", "đoạn DNA bảo vệ đầu nhiễm sắc thể; ngắn dần theo lão hóa tế bào, bị đẩy nhanh bởi stress mạn tính."],
    ["Challenge vs Threat (mô hình BPS)", "hai trạng thái đánh giá tình huống stress: 'thách thức' (đủ nguồn lực) cho hiệu suất tốt hơn 'đe dọa' (thiếu nguồn lực)."],
    ["Cyclic Sighing", "kỹ thuật thở: 2 hơi hít vào liên tiếp + thở ra kéo dài — có RCT Stanford xác nhận hiệu quả nhanh nhất trong các kỹ thuật thở ngắn."],
    ["Buffering Hypothesis", "giả thuyết hỗ trợ xã hội làm giảm nhẹ tác động tiêu cực của stress (Cohen & Wills, 1985) — bằng chứng có sắc thái, không tuyệt đối."],
    ["Somatic vs Psychic Anxiety", "lo âu 'cơ thể' (run, tim đập nhanh — propranolol nhắm vào đây) khác lo âu 'tâm trí' (cảm nhận/suy nghĩ lo lắng — CBT nhắm vào đây)."],
    ["Trait Anxiety", "mức độ lo âu nền có tính ổn định cá nhân theo thời gian, khác với 'state anxiety' (lo âu tình huống thoáng qua) — góp phần giải thích khác biệt đáp ứng cá nhân với cùng can thiệp."],
    ["Problem-focused vs Emotion-focused Coping", "khung lý thuyết Lazarus & Folkman: thay đổi trực tiếp nguồn gây stress (problem-focused) khác điều chỉnh phản ứng cảm xúc với nguồn stress không đổi được (emotion-focused) — cần cả hai, đúng lúc."],
    ["Expressive Writing (Pennebaker paradigm)", "viết tự do về suy nghĩ/cảm xúc sâu liên quan sự kiện gây stress — ý tưởng đúng hướng nhưng effect size đã co lại đáng kể qua các meta-analysis nghiêm ngặt hơn theo thời gian."],
    ["Job Demand–Control (Karasek)", "mô hình: căng thẳng cao nhất khi khối lượng việc cao ĐỒNG THỜI với quyền kiểm soát thấp ('high-strain job') — không phải chỉ do 'nhiều việc' đơn thuần."],
    ["Decision Latitude / Autonomy", "quyền tự chủ về thứ tự, nhịp độ, cách làm việc — yếu tố đệm quan trọng nhất chống kiệt sức do job demands, trên cả hỗ trợ xã hội."],
    ["Psychological Detachment (Stressor–Detachment Model)", "ngắt kết nối TÂM TRÍ khỏi công việc ngoài giờ (không chỉ rời văn phòng vật lý) — trải nghiệm phục hồi cốt lõi; thiếu nó dự báo kiệt sức cảm xúc."],
    ["Acceptance (ACT)", "chấp nhận có chủ đích với phần không kiểm soát được — khác hẳn 'bỏ cuộc'/phủ nhận; nguyên lý cốt lõi của Acceptance and Commitment Therapy."],
    ["Recovery Experience Questionnaire (Sonnentag & Fritz)", "khung 4 thành phần phục hồi ngoài giờ làm: Detachment (ngắt kết nối tâm trí), Relaxation (hoạt động dễ chịu cường độ thấp), Mastery (hoạt động có thử thách nhẹ tạo cảm giác làm chủ), Control (tự do chọn hoạt động rảnh)."],
  ],
  sleep: [
    ["SCN (Suprachiasmatic Nucleus)", "nhân trên chéo thị — đồng hồ sinh học trung tâm của não, nhận tín hiệu ánh sáng qua ipRGC."],
    ["ipRGC", "tế bào cảm quang đặc biệt ở võng mạc, nhạy ánh sáng xanh, gửi tín hiệu định giờ đến SCN."],
    ["CBT-I", "Cognitive Behavioral Therapy for Insomnia — điều trị chuẩn vàng cho mất ngủ mạn tính, hiệu quả bền hơn thuốc ngủ."],
    ["Sleep Restriction Therapy", "một thành phần CBT-I: giới hạn thời gian trên giường khớp với thời lượng ngủ thực tế."],
    ["Stimulus Control", "thành phần CBT-I: khôi phục giường là tín hiệu cho giấc ngủ, không phải nơi lo lắng/làm việc."],
    ["Social Jet Lag", "lệch nhịp sinh học do ngủ bù cuối tuần quá mức so với ngày thường."],
    ["Sleep Debt", "nợ giấc ngủ tích lũy khi ngủ ít hơn nhu cầu — phục hồi không tuyến tính, cần nhiều đêm liên tiếp chứ không chỉ 1 cuối tuần."],
    ["OSA (Obstructive Sleep Apnea)", "ngưng thở tắc nghẽn khi ngủ — gây vi thức giấc lặp lại hàng chục-hàng trăm lần/đêm, thường không được người bệnh nhớ, dễ bị nhầm với 'mất ngủ' đơn thuần."],
    ["COMISA", "Comorbid Insomnia and Sleep Apnea — tình trạng đồng mắc mất ngủ và OSA, tạo vòng xoắn hai chiều, cần điều trị kết hợp CPAP + CBT-I."],
    ["DORA (Dual Orexin Receptor Antagonist)", "nhóm thuốc ngủ thế hệ mới (suvorexant, lemborexant, daridorexant) — chặn tín hiệu thức tỉnh thay vì tăng cường ức chế GABA toàn diện như Z-drug/benzodiazepine."],
    ["AHI (Apnea-Hypopnea Index)", "chỉ số ngưng thở-giảm thở mỗi giờ khi ngủ, đo bằng đa ký giấc ngủ — dùng để chẩn đoán và phân độ nặng OSA."],
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
   PILLARS — 3 chủ đề: Trào ngược / Stress / Giấc ngủ
--------------------------------------------------------------- */
const PILLARS = [
  {
    id: "stress",
    num: "01",
    icon: Zap,
    title: "Stress",
    subtitle: "Gốc rễ stress công việc, allostatic load, can thiệp theo tầng",
    groups: [
      {
        label: "Khung lý thuyết nền",
        sections: [
          {
            heading: "Allostatic Load — vì sao stress hiếm khi chỉ gây một vấn đề",
            evidence: "strong",
            mechanism:
              "Allostatic load là 'sự hao mòn của cơ thể' tích lũy khi tiếp xúc với stress lặp lại/mạn tính (McEwen & Stellar, 1993). Các phản ứng thần kinh-nội tiết, tim mạch, và cảm xúc trở nên kích hoạt liên tục đến mức gây rối loạn lưu thông máu động mạch vành/não, tăng huyết áp, xơ vữa động mạch, rối loạn nhận thức, tâm trạng trầm uất.",
            causes:
              "Stress lặp lại/mạn tính từ bất kỳ nguồn nào (công việc, quan hệ, tài chính); được khuếch đại hai chiều bởi hành vi: ngủ kém, ăn uống kém, hút thuốc, ít vận động — nghĩa là stress phá vỡ thói quen bảo vệ sức khỏe, tạo vòng lặp gián tiếp có sức tàn phá tương đương tác động sinh lý trực tiếp.",
            outcomes:
              "Dưới tác động tích lũy, hormone stress rối loạn điều hòa, tạo 'hiệu ứng domino' liên kết các hệ sinh học phụ thuộc lẫn nhau — các dấu ấn sinh học lần lượt 'đổ sập và kéo theo nhau' hướng tới bệnh tật. Đây là lý do stress mạn tính thường biểu hiện như một CHÙM rối loạn xuất hiện gần cùng lúc (mất ngủ + trào ngược + đau đầu + ốm vặt) thay vì một triệu chứng đơn lẻ.",
            treatment:
              "Không có 'thuốc' cho allostatic load — chỉ có giảm tần suất/cường độ kích hoạt (can thiệp nguồn) và tăng khả năng phục hồi giữa các đợt (can thiệp năng lực, xem các tầng can thiệp trong tab này).",
            expertNote:
              "Hệ quả thực hành quan trọng nhất từ mô hình này: một phần lớn tác hại của stress không đến từ cortisol trực tiếp mà từ việc stress phá vỡ thói quen bảo vệ sức khỏe — đây là lý do can thiệp hành vi (vận động, giấc ngủ) thường hiệu quả ngang hoặc hơn can thiệp 'tâm lý thuần túy' khi xét trên quy mô dân số.",
            application: [
              { domain: "Tư duy hệ thống", text: "Khi thấy nhiều triệu chứng nhỏ xuất hiện cùng lúc (mất ngủ, trào ngược, hay quên, dễ cáu), xem đó là MỘT quá trình allostatic load chung, không xử lý từng triệu chứng tách rời." },
            ],
          },
          {
            heading: "Bản đồ tác động đa hệ cơ quan",
            evidence: "strong",
            mechanism:
              "Vỏ não trước trán: co rút nhánh gai tế bào hình tháp, giảm kết nối chức năng → giảm trí nhớ làm việc/linh hoạt nhận thức/kiểm soát xung động (tổn thương có tính khả hồi — một tháng nghỉ phép đã phục hồi cả kết nối lẫn chức năng trong một nghiên cứu PNAS). Tim mạch: giao cảm ưu thế mạn tính + viêm hệ thống (CRP, IL-6, TNF-α) → xơ vữa động mạch. Miễn dịch: đề kháng cortisol → viêm mất kiểm soát, ức chế miễn dịch thích ứng. Lão hóa tế bào: giảm hoạt tính telomerase → rút ngắn telomere tương đương ~1 thập kỷ lão hóa ở nhóm stress cao nhất (Epel et al., PNAS).",
            causes: "Stress mạn tính kéo dài đủ lâu để vượt quá khả năng phục hồi tự nhiên giữa các đợt.",
            outcomes:
              "Case-control: nguy cơ biến cố tim mạch cao hơn ở người có tiền sử stress công việc (OR 3.2) — cao hơn cả cô lập xã hội (OR 2.47) hay stress hôn nhân (OR 2.28). Cyclic hyperventilation, giao cảm ưu thế mạn tính dễ dẫn tới ốm vặt thường xuyên hơn do rối loạn điều phối miễn dịch.",
            treatment: "Xem các tầng can thiệp cụ thể trong tab này (Tầng 1–3, sơ cứu cấp tính, và xử lý gốc rễ công việc) — mỗi hệ cơ quan có mức độ đáp ứng khác nhau với từng loại can thiệp.",
            expertNote:
              "Có sự khác biệt quan trọng giữa stress cấp tính và mạn tính: cortisol tăng cấp tính trong tình huống ngắn hạn thực ra có thể CỦNG CỐ trí nhớ làm việc ở người trẻ — một chút áp lực deadline ngắn hạn đôi khi giúp tập trung tốt hơn (Yerkes-Dodson). Chỉ khi kéo dài, tác dụng mới đảo ngược hoàn toàn.",
            application: [
              { domain: "Nhận diện sớm", text: "Theo dõi vài chỉ số đơn giản mỗi tuần (HRV, chất lượng ngủ, ốm vặt, năng lượng 1–5) để phát hiện allostatic load đang tăng TRƯỚC khi kiệt sức, thay vì chỉ phản ứng khi đã có triệu chứng rõ." },
            ],
          },
        ],
      },
      {
        label: "★ Gốc rễ: xử lý stress CÔNG VIỆC — ưu tiên cao nhất trong bài toán này",
        note: "Đây là phần quan trọng nhất của cả khung. Trào ngược/mất ngủ ở đây phần lớn là HẬU QUẢ của stress công việc — nên chữa gốc (nguồn công việc + phục hồi đúng cách ngoài giờ) có đòn bẩy cao hơn hẳn mọi kỹ thuật làm dịu triệu chứng đơn thuần. Bao gồm cả xử lý nguồn (Demand-Control, ranh giới) LẪN phục hồi chủ động (detachment, relaxation, mastery, control) — thiếu vế nào cũng không đủ.",
        sections: [
          {
            heading: "Vì sao phải ưu tiên chữa nguồn công việc, không chỉ làm dịu triệu chứng",
            evidence: "strong",
            mechanism:
              "Lý thuyết coping kinh điển (Lazarus & Folkman) phân biệt 2 chiến lược: problem-focused coping (thay đổi trực tiếp nguồn gây stress) và emotion-focused coping (điều chỉnh phản ứng cảm xúc khi nguồn không đổi được). Gần như toàn bộ can thiệp còn lại trong tab này (thở, vận động, ánh sáng, viết, ngủ) đều là emotion-focused — làm dịu phản ứng sinh lý, KHÔNG chạm tới nguồn công việc đang phát sinh stress.",
            causes:
              "Sai lầm phổ biến nhất: dừng lại ở emotion-focused vì nó cho cảm giác dễ chịu nhanh và không cần đối đầu với vấn đề khó (nói chuyện với sếp, từ chối task, đàm phán deadline), trong khi nguồn thật (quá tải, deadline cháy, handover kém, áp lực cấp trên) vẫn nguyên và tiếp tục tái tạo cùng một phản ứng stress mỗi ngày.",
            outcomes:
              "Nếu chỉ dùng emotion-focused lặp đi lặp lại mà không đụng tới nguồn, allostatic load (đã nêu ở đầu tab) tiếp tục tích lũy — các kỹ thuật làm dịu chỉ làm CHẬM tốc độ tích lũy, không dừng được nó. Đây là lý do nhiều người 'chăm chỉ tập thở/tập gym' mà trào ngược/mất ngủ vẫn dai dẳng: họ đang chữa ngọn rất tốt nhưng chưa từng chạm vào gốc.",
            treatment:
              "Sau khi đã hạ nhiệt cấp tính đủ để suy nghĩ rõ ràng, bước bắt buộc: viết ra cụ thể nguồn stress công việc là gì, rồi phân loại từng cái vào 2 nhóm — NẰM TRONG khả năng tác động của mình (khối lượng nhận vào, cách sắp xếp ưu tiên, cách giao tiếp kỳ vọng) và NẰM NGOÀI (quyết định của sếp, deadline khách hàng đã chốt, năng lực người khác). Nhóm tác động được → problem-focused (kế hoạch hành động cụ thể). Nhóm không tác động được → chuyển sang chấp nhận có chủ đích (acceptance, nguyên lý cốt lõi của ACT) thay vì tiếp tục chống lại nó trong đầu — khác hẳn 'bỏ cuộc' hay phủ nhận.",
            expertNote:
              "Phân biệt 'chữa ngọn' (emotion-focused) và 'chữa gốc' (problem-focused + acceptance) là đúng theo lý thuyết coping đã kiểm chứng nhiều thập kỷ, không phải suy đoán. Giới hạn quan trọng: khi stress nhỏ đã tích lũy thành mạn tính/breakdown, chính khả năng tự phân tích gốc rễ bằng nội quan cũng giảm (não bị allostatic load ảnh hưởng) — lúc đó cần chuyên môn tâm lý hỗ trợ, không cố tự làm một mình.",
            application: [
              { domain: "Trình tự đúng", text: "Hạ nhiệt cấp tính TRƯỚC (thở/ra ngoài/ngủ đủ), sau đó mới viết ra gốc rễ và phân loại kiểm soát được/không — cố phân tích khi đang quá kích động thường ra quyết định tệ." },
              { domain: "Câu hỏi lọc", text: "Với mỗi nguồn stress: 'điều nhỏ nhất mình có thể tác động trong tuần này là gì?' — chuyển từ cảm giác bất lực toàn cục sang một hành động cụ thể khả thi." },
            ],
            pitfalls: ["Chỉ lặp lại kỹ thuật làm dịu (thở/gym/nghỉ) mà không bao giờ quay lại đụng vào nguồn công việc — dễ chịu tạm thời nhưng allostatic load vẫn tích lũy."],
          },
          {
            heading: "Mô hình Demand–Control: 'quá tải + mất kiểm soát' mới là công thức kiệt sức, không phải chỉ 'nhiều việc'",
            evidence: "strong",
            mechanism:
              "Mô hình Job Demand–Control (Karasek) và Job Demands–Resources (Bakker/Demerouti): mức căng thẳng (strain) cao nhất KHÔNG phải khi khối lượng việc cao đơn thuần, mà khi khối lượng cao ĐỒNG THỜI với quyền kiểm soát/tự chủ thấp — gọi là 'high-strain job'. Cùng một lượng việc, người có quyền quyết định thứ tự/nhịp độ/cách làm chịu strain thấp hơn hẳn người bị áp đặt toàn bộ.",
            causes:
              "Bối cảnh điển hình đúng công thức high-strain: bị allocate vào dự án quá gấp (không có tiếng nói trong quyết định), nhận handover kém từ người năng lực/tính khí không ổn (phải gánh hậu quả nhưng không kiểm soát được đầu vào), deadline khách hàng đã chốt cứng, áp lực cấp trên dồn xuống — tất cả đều là DEMAND cao + CONTROL thấp cùng lúc.",
            outcomes:
              "Nghiên cứu tổng quan cho thấy quyền tự chủ (autonomy/decision latitude) là yếu tố ĐỆM quan trọng nhất chống lại kiệt sức do job demands, đứng trên cả hỗ trợ xã hội và cơ hội phát triển. Nghĩa là: tăng được dù chỉ một chút quyền kiểm soát trong công việc có đòn bẩy giảm strain cao bất tương xứng so với công sức bỏ ra.",
            treatment:
              "Vì 'giảm demand' (ít việc đi) thường ngoài tầm, đòn bẩy thực tế cao nhất là TĂNG CONTROL ở những chỗ nhỏ còn giành được: chủ động đề xuất thứ tự ưu tiên thay vì chờ được giao (biến bị động thành có tiếng nói), hỏi rõ tiêu chí 'đủ tốt' để không tự nâng chuẩn vô hạn, khối lượng vượt ngưỡng thì chủ động đàm phán phạm vi/deadline sớm thay vì im lặng nhận hết rồi cháy. Mỗi hành động nhỏ giành lại quyền kiểm soát đều tác động đúng vào biến có đòn bẩy mạnh nhất theo mô hình.",
            expertNote:
              "Đây là điểm phản trực giác quan trọng: cảm giác 'quá nhiều việc' thường thực chất là cảm giác 'không kiểm soát được việc'. Hai người cùng khối lượng, người được tự chủ nhịp độ có thể ổn trong khi người bị áp đặt thì kiệt sức. Nên câu hỏi hữu ích không phải 'làm sao làm nhanh hơn' mà 'chỗ nào mình có thể giành lại một chút quyền quyết định'.",
            application: [
              { domain: "Tăng control", text: "Đầu tuần chủ động gửi thứ tự ưu tiên mình đề xuất cho sếp ('em định làm A trước B vì X, anh/chị thấy ổn không?') — biến mình từ người nhận lệnh bị động thành người có tiếng nói trong quyết định." },
              { domain: "Chặn quá tải sớm", text: "Khi thấy khối lượng sắp vượt ngưỡng, nêu SỚM với dữ kiện cụ thể ('với A, B, C đang có, nếu thêm D thì một trong số đó phải lùi — anh/chị muốn ưu tiên cái nào?') thay vì im lặng nhận hết rồi cháy deadline." },
            ],
          },
          {
            heading: "Tách biệt công việc & đời sống cá nhân — nghĩa đen lẫn nghĩa bóng",
            evidence: "strong",
            mechanism:
              "Mô hình Stressor–Detachment (Sonnentag & Fritz): phục hồi khỏi stress công việc đòi hỏi 'psychological detachment' — không chỉ rời khỏi văn phòng về mặt vật lý mà còn ngắt kết nối về TÂM TRÍ (ngừng suy nghĩ/lo về công việc trong thời gian ngoài giờ). Cơ chế: trục HPA và hệ giao cảm chỉ thật sự hạ xuống khi não ngừng diễn tập lại các stressor công việc; nếu cơ thể ở nhà nhưng đầu vẫn 'ở văn phòng', phản ứng stress sinh lý tiếp tục chạy, không có phục hồi thật.",
            causes:
              "Ranh giới bị xóa nhòa: đọc/trả lời tin nhắn công việc buổi tối, làm việc ngay trên giường/bàn ăn, nhai lại trong đầu cuộc họp căng suốt bữa tối — khiến 'mental fences' (hàng rào tâm trí) giữa công việc và đời sống không bao giờ dựng lên được.",
            outcomes:
              "Dữ liệu dọc (longitudinal) trên nhiều quần thể: người detach tâm trí tốt hơn có sức khỏe tinh thần tốt hơn, lo âu thấp hơn, hài lòng cuộc sống cao hơn ở thời điểm sau — và cải thiện khả năng detach theo thời gian dự đoán cải thiện phúc lợi. Ngược lại, thiếu detach là một trong các yếu tố dự báo mạnh của kiệt sức cảm xúc (emotional exhaustion). Lưu ý sắc thái: một số bằng chứng dài hạn còn hỗn hợp, và detach quá mức đến mức thờ ơ hoàn toàn không phải mục tiêu — mục tiêu là ranh giới rõ, không phải vô cảm với công việc.",
            treatment:
              "Dựng ranh giới ở cả 2 tầng. Nghĩa đen (vật lý/ranh giới cứng): tách không gian làm việc khỏi không gian nghỉ (không làm trên giường), tắt thông báo công việc sau giờ, có một 'nghi thức kết thúc ngày làm' (đóng laptop + đi bộ ngắn) để báo hiệu cho não chuyển chế độ. Nghĩa bóng (tâm trí): khi phát hiện đang nhai lại công việc ngoài giờ, viết nhanh việc đó ra giấy 'để mai xử lý' (đóng vòng lặp lo lắng) rồi chủ động chuyển chú ý sang hoạt động hút hết tâm trí (vận động, trò chuyện, việc cần tập trung tay chân).",
            expertNote:
              "Điểm khớp đúng với trực giác dân gian 'tách khỏi không gian bí bách': tách biệt về VẬT LÝ là cần nhưng chưa đủ — nếu về nhà mà đầu vẫn ở văn phòng thì cơ thể không phục hồi. Phần khó và quyết định là tách biệt về TÂM TRÍ, và đây là kỹ năng luyện được chứ không phải tính cách cố định.",
            application: [
              { domain: "Ranh giới cứng", text: "Chọn 1 mốc giờ tối làm 'giờ đóng cửa công việc' — sau mốc đó không mở email/chat công việc; nếu cần, để điện thoại công việc ở phòng khác (biến ý chí thành sự thật vật lý)." },
              { domain: "Nghi thức chuyển chế độ", text: "Tạo 1 hành động ngắn cố định đánh dấu hết giờ làm (đóng laptop → đi bộ 10 phút/tắm) — tín hiệu vật lý giúp não chuyển từ 'chế độ công việc' sang 'chế độ nghỉ'." },
              { domain: "Đóng vòng lặp lo", text: "Khi đầu cứ nhai lại việc ngoài giờ: viết nó ra 'để mai làm' kèm bước đầu tiên cụ thể — giải phóng não khỏi việc phải 'giữ' nó, dễ chuyển chú ý hơn." },
            ],
          },
          {
            heading: "Sở thích cá nhân & hoạt động dễ chịu — Relaxation, Mastery, Control: 3 mảnh ghép phục hồi còn lại",
            evidence: "strong",
            mechanism:
              "Detachment (mục trên) chỉ là 1 trong 4 'recovery experiences' theo khung lý thuyết REQ (Sonnentag & Fritz). Ba mảnh còn lại: Relaxation (hoạt động cường độ thấp, dễ chịu, ít đòi hỏi nỗ lực — nằm ườn, nghe nhạc, tắm nước ấm); Mastery (hoạt động có yếu tố học hỏi/thử thách nhẹ, tạo cảm giác làm chủ/tiến bộ — ca hát, nhảy múa, một môn thể thao/nhạc cụ đang tập); Control (tự do chọn mình làm gì trong thời gian rảnh, không ai ép — liên hệ trực tiếp Self-Determination Theory).",
            causes:
              "Ngộ nhận phổ biến: xem sở thích cá nhân là 'xa xỉ phẩm' hoặc phần thưởng phụ, trong khi nó là một CƠ CHẾ PHỤC HỒI riêng biệt, độc lập với detachment — có thể detach tốt (không nghĩ về việc) mà vẫn không phục hồi nếu thời gian rảnh chỉ trôi qua thụ động, vô vị, không có relaxation/mastery/control thật sự.",
            outcomes:
              "Meta-analysis quy mô lớn (k=316 nghiên cứu, N=99,329): Relaxation và Mastery dự đoán trực tiếp cảm xúc tích cực, hài lòng cuộc sống, và hiệu suất công việc — thực ra còn dự đoán TỐT HƠN Detachment cho các outcome tích cực (Detachment giỏi giảm cái tiêu cực nhưng không tạo thêm cái tích cực). Lưu ý quan trọng: hoạt động giải trí nặng nghĩa vụ/áp lực (tiệc bắt buộc, thi đấu căng) có liên hệ NGHỊCH với 3/4 yếu tố phục hồi — 'giải trí' không tự động phục hồi nếu vẫn có deadline/thành tích/kỳ vọng đi kèm.",
            treatment:
              "Chủ động sắp cả 2 loại hoạt động vào thời gian rảnh, không chỉ 1: loại RELAXATION (nằm ườn, nghe nhạc, tắm — không đòi hỏi gì) VÀ loại MASTERY (ca hát, nhảy múa, vẽ, chơi nhạc cụ, thể thao — có chút thử thách/tiến bộ nhưng tự chọn). Điều kiện bắt buộc để có hiệu quả: phải là CONTROL thật — tự mình chọn làm, không ai ép, không có áp lực thành tích/so sánh đi kèm (VD: hát karaoke một mình cho vui khác hẳn hát để được khen).",
            expertNote:
              "Đây là câu trả lời có cơ sở khoa học rõ ràng cho trực giác 'sở thích cá nhân giúp giảm stress' — không phải cảm tính, mà là 2 trong 4 cơ chế phục hồi đã được đo lường và kiểm chứng qua hàng trăm nghiên cứu. Điểm cần phân biệt: nếu sở thích bị biến thành 'phải giỏi', 'phải đăng lên mạng xã hội', hoặc 'phải hoàn thành X buổi/tuần', nó mất đi cả yếu tố Control lẫn phần lớn lợi ích Mastery — lúc đó vô tình biến giải trí thành một nguồn stress mới.",
            application: [
              { domain: "Cân bằng 2 loại", text: "Mỗi tuần có cả hoạt động 'không cần nghĩ' (nằm nghe nhạc, xem phim nhẹ) LẪN hoạt động 'có chút thử thách nhưng vui' (ca hát, nhảy, vẽ, thể thao) — chỉ một loại thường không đủ." },
              { domain: "Giữ đúng tinh thần Control", text: "Chọn hoạt động vì MÌNH muốn, không vì 'nên làm' hay để khoe — ngay khi thấy áp lực phải giỏi/phải đăng lên mạng xã hội xuất hiện, đó là dấu hiệu hoạt động đã mất tác dụng phục hồi." },
            ],
          },
          {
            heading: "Chiến thuật cho từng tình huống công việc cụ thể",
            evidence: "moderate",
            mechanism:
              "Đây là ứng dụng problem-focused coping vào đúng các tình huống bối cảnh cụ thể. Mức bằng chứng ở đây là 'thực hành lâm sàng/tổ chức hợp lý' suy ra từ mô hình Demand–Control, không phải RCT cho từng chiêu — nên coi là khung tư duy để thử, không phải công thức đảm bảo.",
            causes: "—",
            outcomes:
              "Nguyên tắc chung xuyên suốt: chuyển từ vị thế bị động (nhận mọi thứ dồn xuống) sang chủ động định hình kỳ vọng SỚM — vì chi phí nêu vấn đề sớm luôn thấp hơn chi phí cháy deadline rồi mới nói.",
            treatment: "Xem các tình huống cụ thể trong phần ứng dụng.",
            expertNote:
              "Điểm chung của mọi chiến thuật dưới đây đều là giành lại một phần CONTROL (biến có đòn bẩy mạnh nhất theo Karasek) và dựng RANH GIỚI kỳ vọng rõ ràng — thay vì cố gắng làm nhiều hơn/nhanh hơn trong im lặng cho đến khi gãy.",
            application: [
              { domain: "Dự án cháy deadline", text: "Ngay khi thấy nguy cơ trễ, nêu sớm với phương án kèm theo, không chỉ báo tin xấu: 'D có nguy cơ trễ 2 ngày; em đề xuất cắt phạm vi X hoặc lùi Y — anh/chị chọn hướng nào?' — giữ được thế chủ động và chia sẻ quyết định." },
              { domain: "Handover kém / người bàn giao không ổn", text: "Bảo vệ mình bằng tài liệu: yêu cầu bàn giao bằng văn bản, ghi lại các khoảng trống/giả định bạn buộc phải tự lấp, và thông báo minh bạch cho quản lý — để trách nhiệm về đầu vào kém không âm thầm dồn hết lên bạn." },
              { domain: "Bị allocate quá gấp", text: "Hỏi rõ ngay từ đầu về ưu tiên và tiêu chí 'đủ tốt' cho phạm vi gấp đó: 'trong thời gian này em nên tối ưu cái gì và chấp nhận đánh đổi cái gì?' — biến kỳ vọng mơ hồ thành thỏa thuận rõ." },
              { domain: "Áp lực cấp trên", text: "Tách phản hồi về CÔNG VIỆC khỏi giá trị BẢN THÂN (áp lực về kết quả ≠ đánh giá về con người bạn); đồng thời làm rõ kỳ vọng bằng câu hỏi cụ thể thay vì tự đoán rồi tự tăng áp lực lên chính mình." },
              { domain: "Áp lực dự án lớn kéo dài", text: "Chia horizon lớn thành các mốc nhỏ có thể hoàn thành trong tuần, để tạo cảm giác tiến triển và làm chủ (đối kháng trực tiếp cảm giác bất lực) — cảm giác tiến triển đều đặn là một trong các yếu tố bảo vệ mạnh nhất trước kiệt sức." },
            ],
          },
        ],
      },
      {
        label: "Tầng 1 — Can thiệp tức thời (giây–phút)",
        sections: [
          {
            heading: "Cyclic Sighing — kỹ thuật thở nhanh nhất có RCT",
            evidence: "strong",
            mechanism:
              "Hít vào bằng mũi đến khi phổi đầy thoải mái → hít thêm một hơi ngắn thứ hai, sâu hơn, để giãn phổi tối đa (làm phồng lại phế nang đã xẹp, tối đa hóa trao đổi khí) → thở ra rất chậm bằng miệng cho đến hết hơi (kích hoạt dây X, chuyển ANS từ giao cảm sang phó giao cảm).",
            causes: "—",
            outcomes:
              "RCT Stanford (Balban et al., Cell Reports Medicine 2023) so sánh 4 nhóm (cyclic sighing/box breathing/cyclic hyperventilation/thiền chánh niệm), 5 phút/ngày x 28 ngày: cyclic sighing cho cải thiện tâm trạng lớn nhất (p<0.05) và giảm nhịp thở nhiều nhất — vượt trội cả thiền chánh niệm.",
            treatment: "1–3 chu kỳ (30 giây – vài phút) khi cần hiệu quả tức thời; 5 phút/ngày cho hiệu quả tích lũy.",
            expertNote:
              "Điều bất ngờ về mặt nghiên cứu: kiểm soát trực tiếp hơi thở có thể 'mở khóa' phản ứng mạnh hơn thiền chánh niệm thông thường — trái với giả định phổ biến trước đây rằng thiền luôn là 'chuẩn vàng' cho stress cấp tính.",
            application: [
              { domain: "Tình huống áp dụng", text: "Ngay khi cảm nhận cơn stress cấp (tim đập nhanh, khó chịu bụng) — làm được tại bàn làm việc, không cần không gian riêng." },
            ],
          },
        ],
      },
      {
        label: "Tầng 2 — Xây năng lực nền (tuần–tháng)",
        sections: [
          {
            heading: "So sánh trực tiếp: Vận động vs Thiền vs HRV Biofeedback",
            evidence: "strong",
            mechanism:
              "Ba cơ chế khác nhau nhắm vào cùng hệ ANS/HPA: vận động thay đổi qua con đường chuyển hóa + endorphin; thiền chánh niệm qua tái cấu trúc chú ý/nhận thức; HRV biofeedback qua huấn luyện trực tiếp nhịp thở cộng hưởng baroreflex (~6 nhịp/phút) để tái lập trương lực phế vị.",
            causes: "—",
            outcomes:
              "RCT so sánh trực tiếp 3 phương pháp (126 người, 5 tuần tại nhà): mỗi nhóm cải thiện có ý nghĩa, không có 'người chiến thắng tuyệt đối'. Vận động aerobic: ES=−0.48 cho lo âu chủ quan (Level 1 Grade A). Yoga/khí công: SMD=−0.59 cho cortisol khách quan (hạng cao nhất network meta-analysis). MBSR: Cohen's d=0.74 cho stress tự báo cáo. HRV Biofeedback: Hedges' g=0.83 cho lo âu/stress cảm nhận.",
            treatment:
              "Vận động ≥3 lần/tuần, <60 phút/buổi, ~180 phút/tuần, phối hợp aerobic (giảm lo âu chủ quan) + yoga/thở chậm (giảm cortisol khách quan). MBSR 8 tuần cho ai cần chương trình có cấu trúc. HRV biofeedback cho ai muốn huấn luyện trực tiếp 'phần cứng' ANS.",
            expertNote:
              "Đây là dữ liệu hiếm và có giá trị cao vì so sánh trực tiếp trên CÙNG quần thể, loại bỏ nhiễu do khác nhóm nghiên cứu — kết luận thực tế là chọn theo sở thích/khả năng duy trì hơn là tìm 'phương pháp tối ưu tuyệt đối', vì tất cả đều hiệu quả nếu duy trì đều đặn.",
            application: [
              { domain: "Liều tối ưu vận động", text: "≥3 lần/tuần, mỗi buổi <60 phút, tổng ~180 phút/tuần — con số cụ thể có bằng chứng, khả thi với lịch bận (~25–30 phút/ngày)." },
              { domain: "Chọn loại hình", text: "Nếu ưu tiên cảm nhận chủ quan bớt lo âu: aerobic. Nếu muốn giảm cortisol khách quan: yoga/khí công. Nếu thích công cụ đo lường/phản hồi: HRV biofeedback." },
            ],
          },
        ],
      },
      {
        label: "Tầng 3 — Tái cấu trúc nhận thức & xã hội",
        sections: [
          {
            heading: "Challenge vs Threat — mô hình Biopsychosocial (Jamieson)",
            evidence: "strong",
            mechanism:
              "Cá nhân trải nghiệm trạng thái 'thách thức' khi đánh giá nguồn lực ứng phó vượt quá yêu cầu tình huống; 'đe dọa' khi yêu cầu cảm nhận vượt quá nguồn lực — dù mức kích hoạt giao cảm (nhịp tim, hồi hộp) có thể tương đương nhau ở cả hai trạng thái. Thách thức đi kèm giãn mạch, cải thiện hiệu suất tim mạch; đe dọa đi kèm co mạch, dự đoán kết quả nhận thức kém hơn.",
            causes: "Diễn giải nhận thức về cùng một mức kích hoạt sinh lý, không phải bản thân mức kích hoạt.",
            outcomes:
              "RCT trên 93 sinh viên: nhóm được dạy diễn giải lại 'kích hoạt stress là cơ thể đang huy động năng lượng phục vụ hiệu suất, không phải nguy hiểm' → giảm lo âu đánh giá, cải thiện điểm thi thực tế. Cơ chế trung gian: tăng nhận thức về khả năng ứng phó (resource appraisal).",
            treatment:
              "Chủ động tái diễn giải khi cảm nhận kích hoạt giao cảm trong tình huống hiệu suất (thuyết trình, deadline, phỏng vấn): coi tim đập nhanh/thở gấp là dấu hiệu cơ thể đang chuẩn bị, không phải dấu hiệu nguy hiểm.",
            expertNote:
              "Đây không phải 'tự lừa dối bản thân' mà là can thiệp có cơ chế sinh lý đo lường được (chuyển từ co mạch sang giãn mạch), đã chứng minh cải thiện hiệu suất thực tế trong RCT — khác biệt với 'tư duy tích cực' chung chung vì nó nhắm trực tiếp vào diễn giải của phản ứng sinh lý cụ thể.",
            application: [
              { domain: "Script cụ thể", text: "Khi cảm nhận tim đập nhanh trước deadline: 'đây là cơ thể đang bơm máu/oxy lên não phục vụ hiệu suất, không phải dấu hiệu nguy hiểm.'" },
            ],
          },
          {
            heading: "Hỗ trợ xã hội — hiệu quả thật nhưng không như tưởng tượng",
            evidence: "contested",
            mechanism:
              "Giả thuyết đệm xã hội (Cohen & Wills, 1985) cho rằng hỗ trợ xã hội làm giảm tác động tiêu cực của stress lên sức khỏe qua cơ chế nhận thức/hành vi ứng phó.",
            causes: "—",
            outcomes:
              "Một nghiên cứu trên 412 nhân viên văn phòng: trái với giả thuyết, cả hỗ trợ xã hội lẫn đánh giá thách thức đều KHÔNG dự đoán được mức độ stress cảm nhận trong dữ liệu này. Tuy nhiên hỗ trợ xã hội vẫn liên quan đến hài lòng cuộc sống cao hơn qua cơ chế gián tiếp (nhận diện xã hội, cảm giác thuộc về).",
            treatment:
              "Không nên kỳ vọng 'có người tâm sự' sẽ giảm stress cảm nhận NGAY LẬP TỨC trong khoảnh khắc cụ thể — nhưng vẫn nên duy trì kết nối xã hội như một khoản đầu tư phúc lợi dài hạn, không phải công cụ giảm stress cấp tính.",
            expertNote:
              "Đây là ví dụ tốt về việc một giả thuyết kinh điển, được trích dẫn rộng rãi, có bằng chứng thực nghiệm hiện đại không hoàn toàn nhất quán — không có nghĩa hỗ trợ xã hội vô giá trị, mà có nghĩa vai trò của nó tinh tế hơn nhiều so với hình dung phổ biến.",
            application: [
              { domain: "Kỳ vọng đúng", text: "Xem kết nối xã hội là nền tảng hài lòng cuộc sống dài hạn, dùng cyclic sighing/tái diễn giải nhận thức cho nhu cầu giảm stress tức thời." },
            ],
          },
        ],
      },
      {
        label: "Dược lý cấp tính & giới hạn cá nhân hóa — điều tài liệu phổ thông hay bỏ sót",
        note: "Phần lớn khung 'quản lý stress' phổ thông dừng ở hành vi/nhận thức, bỏ qua công cụ dược lý cho stress tình huống cấp tính và sự khác biệt cá nhân trong đáp ứng — cả hai đều quan trọng ở mức chuyên gia.",
        sections: [
          {
            heading: "Propranolol cho stress tình huống cấp tính — hiệu quả thật nhưng có giới hạn rõ",
            evidence: "contested",
            mechanism:
              "Propranolol (chẹn beta không chọn lọc) chặn thụ thể beta-adrenergic ngoại biên, cắt đứt các biểu hiện CƠ THỂ của phản ứng giao cảm (tim đập nhanh, run tay, đổ mồ hôi, giọng run) mà không tác động trực tiếp lên cảm nhận lo âu ở não — đây là 'somatic anxiety' (lo âu cơ thể), khác với 'psychic anxiety' (lo âu tâm trí/nhận thức).",
            causes:
              "Dùng phổ biến ngoài chỉ định chính thức (off-label) bởi nhạc công, người thuyết trình, người thi cử cho các tình huống stress tình huống có thể dự đoán trước (một bài thuyết trình, một kỳ thi) — không phải cho lo âu lan tỏa mạn tính.",
            outcomes:
              "Bằng chứng có sắc thái quan trọng: hiệu quả rõ với triệu chứng CƠ THỂ (giảm run, giảm nhịp tim, cải thiện biểu hiện quan sát được khi thuyết trình) nhưng kết quả về lo âu 'tâm trí' và hiệu suất nhận thức KHÔNG nhất quán — một nghiên cứu ghi nhận propranolol còn làm giảm khả năng nhớ lại các từ khó ở người lo âu. Review hệ thống 2016 và 2024 đều kết luận bằng chứng chưa đủ mạnh để khuyến cáo thường quy, dù kê đơn đã tăng đáng kể 2003–2018 mà thiếu hướng dẫn lâm sàng rõ ràng.",
            treatment:
              "Chỉ phù hợp cho lo âu TÌNH HUỐNG (public speaking, biểu diễn, phỏng vấn/thi cử) sau khi bác sĩ xác nhận đây không phải rối loạn lo âu lan tỏa/hoảng loạn cần điều trị khác, và đã sàng lọc chống chỉ định (hen suyễn, một số bệnh tim). Không phải công cụ tự ý mua dùng.",
            expertNote:
              "Đây là ví dụ tốt về 'bằng chứng lâm sàng thực hành vượt trước bằng chứng RCT quy mô lớn' — kinh nghiệm lâm sàng rộng rãi và một số RCT nhỏ ủng hộ hiệu quả cho lo âu tình huống, nhưng chưa từng có RCT quy mô lớn xác nhận dứt khoát, khác hẳn CBT (có nền tảng RCT vững hơn nhiều cho lo âu nói chung).",
            application: [
              { domain: "Khi nào cân nhắc hỏi bác sĩ", text: "Tình huống stress cụ thể, có thể dự đoán trước, biểu hiện cơ thể (run, tim đập nhanh) là vấn đề chính — không thay thế cho xử lý gốc rễ nếu lo âu là lan tỏa/thường xuyên." },
            ],
            pitfalls: ["Tự ý dùng thuốc chẹn beta không có chỉ định bác sĩ — cần sàng lọc chống chỉ định tim mạch/hô hấp trước."],
          },
          {
            heading: "Khác biệt cá nhân trong phản ứng stress — vì sao 'trung bình' không áp dụng y hệt cho mọi người",
            evidence: "moderate",
            mechanism:
              "Mọi effect size/RCT trình bày trong khung này đều là trung bình QUẦN THỂ — phản ứng cá nhân với cùng một stressor biến thiên lớn do khác biệt về phản ứng trục HPA nền (một số người có đáp ứng cortisol cao hơn với cùng stressor), độ nhạy cảm thụ thể glucocorticoid, và các yếu tố tâm lý như mức độ lo âu nội tại (trait anxiety) từ trước.",
            causes: "Biến thiên sinh học tự nhiên trong điều hòa trục HPA và hệ thần kinh tự chủ giữa các cá nhân.",
            outcomes:
              "Cùng một can thiệp (vận động, thở, MBSR) có thể hiệu quả rất khác nhau giữa người này và người khác — đây là lý do các RCT luôn báo cáo khoảng tin cậy (CI) rộng, phản ánh sự đa dạng đáp ứng thực tế, không phải sai số đo lường.",
            treatment:
              "Áp dụng nguyên tắc 'thử nghiệm cá nhân' (n=1): coi mỗi can thiệp là một giả thuyết, theo dõi phản ứng của chính mình qua vài tuần (HRV, chất lượng ngủ, cảm nhận chủ quan) thay vì kỳ vọng hiệu quả đúng như effect size trung bình trong nghiên cứu.",
            expertNote:
              "Đây là giới hạn nhận thức luận quan trọng nhất khi đọc bất kỳ tài liệu 'evidence-based' nào về stress: một effect size 'mạnh' ở cấp quần thể không đảm bảo hiệu quả mạnh ở một cá nhân cụ thể — ngược lại, một can thiệp có effect size khiêm tốn ở cấp quần thể vẫn có thể hiệu quả rất tốt cho một người cụ thể nếu khớp đúng cơ chế cá nhân của họ.",
            application: [
              { domain: "Thực hành", text: "Nếu một can thiệp 'chuẩn' (VD: MBSR) không hiệu quả rõ sau 4-6 tuần thử nghiêm túc, không có nghĩa 'phương pháp sai' — thử chuyển sang cơ chế khác (HRV biofeedback, vận động cường độ cao hơn) thay vì kết luận 'không có gì hiệu quả với mình'." },
            ],
          },
        ],
      },
      {
        label: "Sơ cứu cấp tính cho đợt stress nặng — 4 trụ cột 'thoát khỏi bí bách'",
        note: "Kiểm chứng lại một khung dân gian phổ biến ('nắng, cây xanh, viết, ngủ') — phần lớn khớp đúng với cơ chế sinh học đã biết, một phần bị phóng đại. Đây đều là biện pháp 'chữa ngọn' (làm dịu phản ứng cấp tính) — sau khi hạ nhiệt, phải quay lại group '★ Gốc rễ: xử lý stress công việc' để chữa gốc, nếu không allostatic load vẫn tích lũy.",
        sections: [
          {
            heading: "Ánh sáng mặt trời — cơ chế serotonin đã đo lường được trực tiếp, không phải suy đoán",
            evidence: "strong",
            mechanism:
              "Nghiên cứu đo trực tiếp tốc độ sản xuất serotonin não qua mẫu máu tĩnh mạch cảnh trong ở 101 người đàn ông khỏe mạnh: tốc độ sản xuất serotonin tương quan trực tiếp với số giờ nắng trong ngày đo được, tăng nhanh khi độ sáng tăng, và thấp nhất vào mùa đông — đây là bằng chứng sinh lý học trực tiếp trên người, không phải suy luận từ động vật.",
            causes: "Thiếu tiếp xúc ánh sáng cường độ cao ban ngày (làm việc trong nhà cả ngày, mùa đông, thời tiết âm u kéo dài).",
            outcomes:
              "Liệu pháp ánh sáng cường độ cao (bright light therapy) đã được chứng minh hiệu quả cho rối loạn cảm xúc theo mùa và có bằng chứng khởi phát tác dụng NHANH hơn một số thuốc chống trầm cảm (cải thiện tâm trạng có ý nghĩa chỉ sau 1 giờ trong một số nghiên cứu) — phản ánh đây là cơ chế sinh học nhanh, không chỉ 'cảm giác dễ chịu' chủ quan.",
            treatment:
              "Ưu tiên ánh sáng ngoài trời cường độ cao (kể cả trời râm vẫn mạnh hơn đèn trong nhà hàng chục lần) vào thời điểm đang stress cấp, không chỉ dành riêng cho mục đích neo nhịp sinh học buổi sáng đã nêu ở tab Giấc ngủ.",
            expertNote:
              "Điểm khớp đúng với khung dân gian: 'phơi nắng' không phải mẹo tâm lý mà có cơ chế sinh hóa đo lường được trực tiếp trên người — đây là một trong số ít can thiệp 'dân gian' có bằng chứng nền tảng vững chắc ngang các can thiệp y học chính thống (bright light therapy được dùng lâm sàng thật).",
            application: [
              { domain: "Khi stress cấp", text: "Ưu tiên ra ngoài trời có nắng (kể cả nắng nhẹ mùa đông) 15–30 phút thay vì chỉ ở trong phòng kín — đây là can thiệp có cơ chế nhanh, không cần đợi tích lũy nhiều tuần như vận động." },
            ],
          },
          {
            heading: "Vận động đổ mồ hôi trong không gian xanh — cộng hưởng 2 cơ chế đã xác nhận riêng lẻ",
            evidence: "strong",
            mechanism:
              "Đây là sự kết hợp của hai cơ chế đã xác nhận độc lập ở các mục khác: vận động cường độ đủ cao giảm cortisol/lo âu (đã nêu ở phần vận động), và riêng không gian xanh/rừng cũng giảm cortisol qua cơ chế phục hồi chú ý và giảm kích hoạt giao cảm khi tiếp xúc thiên nhiên.",
            causes: "—",
            outcomes:
              "Meta-analysis shinrin-yoku (tắm rừng): cortisol nước bọt thấp hơn có ý nghĩa ở nhóm đi bộ trong rừng so với nhóm đi bộ đô thị, cả trước lẫn sau can thiệp; hiệu quả rõ nhất với lo âu hơn trầm cảm/tức giận. Lưu ý về chất lượng bằng chứng: phần lớn nghiên cứu thực hiện ở châu Á, một số thiết kế crossover không có khoảng nghỉ đủ dài giữa 2 điều kiện, và một số nghiên cứu có sự tham gia của chính người sáng lập phương pháp — cần thận trọng vừa phải, không xem là bằng chứng hoàn hảo.",
            treatment:
              "Vận động đổ mồ hôi (nhảy dây, cầu lông, làm vườn cường độ cao...) tại không gian có cây xanh/thoáng đãng khi có thể, thay vì phòng gym kín — không bắt buộc phải là 'rừng' đúng nghĩa, công viên nhiều cây cũng có cơ chế tương tự dù cường độ hiệu ứng có thể thấp hơn.",
            expertNote:
              "Điểm khớp đúng: đây thực chất không phải một mẹo riêng mà là phép cộng hợp lý của 2 can thiệp đã xác nhận ở nơi khác trong tài liệu này — không cần xem đây là 'phát hiện mới', mà là cách kết hợp thông minh 2 đòn bẩy đã biết.",
            application: [
              { domain: "Khi stress cấp", text: "Nếu có lựa chọn giữa tập trong phòng kín và tập ngoài trời/công viên, ưu tiên ngoài trời khi đang trong đợt stress nặng — chi phí bằng không, lợi ích cộng dồn." },
            ],
          },
          {
            heading: "Viết tay giải tỏa (expressive writing) — ý tưởng đúng hướng, nhưng hiệu quả bị phóng đại theo thời gian",
            evidence: "contested",
            mechanism:
              "Paradigm Pennebaker: viết về suy nghĩ/cảm xúc sâu nhất liên quan một sự kiện gây stress trong vài phiên 15-20 phút. Giả thuyết cơ chế: bộc lộ cảm xúc bị kìm nén qua chữ viết giúp xử lý/tổ chức lại trải nghiệm, giảm gánh nặng 'ức chế cảm xúc' vốn có hại cho sức khỏe.",
            causes: "—",
            outcomes:
              "Đây là ví dụ rõ về khủng hoảng tái lập trong tâm lý học: meta-analysis đầu tiên (Smyth, 1998, 13 nghiên cứu) báo cáo effect size d=0.47 (mức vừa) cho các biến sức khỏe. Nhưng một meta-analysis nghiêm ngặt hơn sau này, CHỈ tính RCT chất lượng, không tìm thấy effect size có ý nghĩa thống kê nào cho cả biến tâm lý lẫn thể chất. Effect size tổng hợp qua hơn 100 nghiên cứu tích lũy đến nay chỉ còn khoảng d=0.16 — nhỏ, không phải 'vừa' như báo cáo ban đầu.",
            treatment:
              "Có thể thử vì chi phí gần bằng không và không có tác hại được ghi nhận, nhưng không nên kỳ vọng đây là can thiệp mạnh — không nên thay thế can thiệp có bằng chứng vững hơn (vận động, thở, CBT) bằng viết tay nếu chỉ có thời gian cho một trong hai.",
            expertNote:
              "Đây là lời nhắc quan trọng về cách đọc bằng chứng theo thời gian: một phát hiện ban đầu hấp dẫn (d=0.47) có thể co lại đáng kể (d=0.16, thậm chí không có ý nghĩa trong phân tích RCT nghiêm ngặt) khi càng nhiều nghiên cứu chất lượng cao được thêm vào — không có nghĩa ý tưởng gốc sai hoàn toàn, mà có nghĩa mức độ tin tưởng ban đầu đã bị đặt quá cao.",
            application: [
              { domain: "Nếu vẫn muốn thử", text: "Viết tự do 15–20 phút về đúng nguồn gốc gây stress (không phải nhật ký chung chung) — coi đây là công cụ bổ sung nhẹ, không phải trụ cột chính của kế hoạch quản lý stress." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "gerd",
    num: "02",
    icon: Flame,
    title: "Trào ngược dạ dày",
    subtitle: "GERD — cơ chế, điều trị, myth & trục não-ruột",
    groups: [
      {
        label: "Cơ chế nền & nguyên nhân thật",
        sections: [
          {
            heading: "LES, thoát vị hoành & TLESR — không phải bệnh 'dư axit'",
            evidence: "strong",
            mechanism:
              "GERD về bản chất là vấn đề cơ học của van chống trào ngược, không phải dư axit. Cấu trúc gồm 3 lớp: cơ vòng thực quản dưới (LES), trụ hoành, và góc His. Cơ chế chiếm ưu thế ở đa số bệnh nhân là giãn LES thoáng qua không phù hợp (TLESR) — dạ dày căng do ăn no kích hoạt phản xạ giãn LES không liên quan đến nuốt. Khi có thoát vị khe hoành, trụ hoành không còn hỗ trợ LES về cơ học, làm giảm áp lực nền, đặc biệt nguy hiểm cho trào ngược ban đêm.",
            causes:
              "Béo phì/thừa cân (tăng áp lực ổ bụng, liên hệ liều-đáp ứng rõ), thai kỳ (progesterone làm giãn LES), hút thuốc lá (giảm áp lực LES + giảm nước bọt trung hòa), thoát vị khe hoành, ăn tối muộn sát giờ ngủ (RCT xác nhận tăng acid exposure về đêm).",
            outcomes:
              "Ợ nóng, trào ngược, viêm thực quản (esophagitis) nếu tiếp xúc axit kéo dài; nếu không kiểm soát lâu dài có nguy cơ Barrett thực quản và hiếm hơn là ung thư biểu mô tuyến thực quản — đây là lý do dấu hiệu báo động (khó nuốt, sụt cân, xuất huyết) cần nội soi ngay, không trì hoãn.",
            treatment:
              "Theo ACG Guideline 2022: với triệu chứng điển hình không có dấu hiệu báo động, thử nghiệm PPI 8 tuần, uống trước bữa ăn. Nội soi chỉ cần khi có dấu hiệu báo động, nguy cơ Barrett, hoặc không đáp ứng PPI. Tiêu chuẩn vàng thật sự khi chẩn đoán không rõ là đo pH thực quản khi ngừng thuốc, không phải nội soi hay chỉ dựa triệu chứng.",
            expertNote:
              "Đa số bệnh nhân GERD có axit dạ dày bình thường hoặc thấp — chỉ khoảng 20% xét nghiệm có axit dư, 60% axit thấp, 20% bình thường. Vấn đề là VỊ TRÍ axit trào lên nơi không có lớp nhầy bảo vệ, không phải LƯỢNG axit tiết ra. Đây là lý do các cách tiếp cận 'trung hòa axit' bằng giấm táo/baking soda sai lệch ngay từ gốc cơ chế.",
            application: [
              { domain: "Chẩn đoán", text: "Nếu chưa từng nội soi và có dấu hiệu báo động (khó nuốt, sụt cân, xuất huyết, thiếu máu, khởi phát sau 60 tuổi), đi khám ngay, không tự điều trị kéo dài." },
              { domain: "Lifestyle có bằng chứng thật", text: "Chỉ 2 can thiệp có RCT vững: giảm cân (dù chỉ vài kg, kể cả BMI bình thường) và nâng đầu giường bằng khối kê chân giường 10–20cm (không phải gối cao)." },
              { domain: "Ăn uống", text: "Ăn tối cách giờ ngủ ≥2–3 giờ. Ghi nhật ký thực phẩm 2 tuần để tự xác định trigger cá nhân, thay vì kiêng khem cực đoan theo danh sách chung." },
            ],
            pitfalls: [
              "Kiêng tuyệt đối cà phê/socola/đồ cay/cam quýt theo danh sách chung — bằng chứng RCT không ủng hộ hiệu quả rõ ràng, chỉ nên cá thể hóa.",
              "Uống giấm táo/baking soda để 'trung hòa axit' — sai cơ chế vì vấn đề là van hở, không phải dư axit; giấm táo còn có thể tổn thương thêm niêm mạc viêm.",
              "Xét nghiệm H. pylori thường quy chỉ vì ợ nóng — không được khuyến cáo, và H. pylori có liên hệ NGHỊCH với GERD (xem phần về H. pylori).",
            ],
          },
          {
            heading: "H. pylori & giả thuyết 'axit thấp gây trào ngược' — ngộ nhận phổ biến nhất",
            evidence: "strong",
            mechanism:
              "H. pylori, đặc biệt chủng cagA+, thường gây viêm teo niêm mạc dạ dày (atrophic gastritis) → giảm tiết axit → giảm nguy cơ GERD, không phải tăng. Cơ chế bổ sung: H. pylori tiết urease làm tăng pH dạ dày qua sản xuất ammonia.",
            causes:
              "Ngộ nhận lan rộng do suy luận trực giác sai: 'vi khuẩn dạ dày → chắc gây thêm axit/viêm → chắc gây trào ngược', trong khi dữ liệu dịch tễ học đi ngược lại hoàn toàn.",
            outcomes:
              "Diệt trừ H. pylori ở bệnh nhân loét dạ dày tá tràng có thể làm TĂNG nguy cơ phát triển GERD so với người không điều trị, do phục hồi khả năng tiết axit bình thường sau khi hết viêm teo.",
            treatment:
              "Không xét nghiệm/điều trị H. pylori như một biện pháp chữa GERD. Chỉ điều trị H. pylori khi có chỉ định riêng (loét, nguy cơ ung thư dạ dày theo gia đình...), và cần biết trước khả năng triệu chứng trào ngược có thể xuất hiện/nặng hơn sau điều trị.",
            expertNote:
              "Đây là ví dụ kinh điển về việc trực giác y khoa dân gian có thể ngược hoàn toàn với dữ liệu dịch tễ học — dữ liệu dịch tễ học cho thấy mối quan hệ NGHỊCH giữa tần suất nhiễm H. pylori và tỷ lệ mắc GERD cùng các biến chứng như Barrett thực quản.",
            application: [
              { domain: "Nếu đã biết nhiễm H. pylori", text: "Không tự suy diễn đây là nguyên nhân gây trào ngược của mình; thảo luận với bác sĩ về chỉ định điều trị thực sự (thường không liên quan đến GERD)." },
            ],
          },
        ],
      },
      {
        label: "Điều trị dược lý & an toàn PPI",
        sections: [
          {
            heading: "PPI — hiệu quả thật và giới hạn an toàn cần phân biệt đúng-sai",
            evidence: "moderate",
            mechanism:
              "PPI ức chế bơm proton của tế bào thành dạ dày, cần được hoạt hóa bởi bơm đang hoạt động khi có thức ăn kích thích tiết axit — đây là lý do phải uống 30–60 phút TRƯỚC bữa ăn đầu ngày để đạt hiệu quả tối đa.",
            causes:
              "Overprescribing phổ biến: dùng liều cao, vô thời hạn không đánh giá lại — không phải do PPI 'vốn nguy hiểm' mà do cách sử dụng sai quy trình.",
            outcomes:
              "Nguy cơ THẬT có cơ chế sinh học hợp lý và bằng chứng tương đối nhất quán: gãy xương (giảm hấp thu canxi/B12, ức chế trực tiếp bơm proton của tế bào hủy xương), thiếu B12. Nguy cơ TỪNG gây hoảng loạn nhưng bằng chứng mới bác bỏ: sa sút trí tuệ — nghiên cứu tiến cứu 2023 và Mendelian randomization 2024 không tìm thấy liên hệ nhân quả, cho thấy liên hệ trước đây chỉ là tương quan do nhiễu (confounding by indication — người dùng PPI dài hạn thường già/bệnh nền nhiều hơn).",
            treatment:
              "Trial 8 tuần theo đúng chỉ định, tái đánh giá sau đó — không tự động gia hạn. Deprescribing (giảm liều từ từ, không ngưng đột ngột để tránh rebound acid hypersecretion) chính thức có trong ACG Guideline 2022 khi không còn chỉ định rõ ràng.",
            expertNote:
              "Bài học phương pháp luận quan trọng nhất: hầu hết nghiên cứu về tác hại PPI là QUAN SÁT, không phải RCT — PPI không được chỉ định ngẫu nhiên mà liên quan đến đặc điểm bệnh nhân (già hơn, nhiều bệnh nền hơn), tự nó đã làm tăng nguy cơ gãy xương/sa sút trí tuệ dù không dùng thuốc. Khi Mendelian randomization (công cụ mạnh loại bỏ nhiễu bằng biến thể gen ngẫu nhiên) phủ định một tín hiệu quan sát, đó là bằng chứng khá thuyết phục tín hiệu ban đầu là giả.",
            application: [
              { domain: "Thời điểm uống", text: "30–60 phút trước bữa ăn đầu ngày — sai thời điểm là lý do phổ biến nhất khiến PPI 'không hiệu quả'." },
              { domain: "Tái đánh giá", text: "Đặt lịch nhắc sau 8 tuần để quyết định tiếp tục/giảm liều/ngưng, không mặc định uống mãi." },
              { domain: "Nếu dùng dài hạn (>1 năm)", text: "Trao đổi bác sĩ về bổ sung canxi/vitamin D/B12 định kỳ, dùng liều thấp nhất có hiệu quả." },
            ],
            pitfalls: [
              "Ngưng PPI đột ngột sau dùng dài hạn — có thể gây tăng tiết axit dội ngược tạm thời; cần giảm liều từ từ.",
              "Hoảng loạn vì tin tức 'PPI gây sa sút trí tuệ' — bằng chứng mới (Mendelian randomization) không ủng hộ quan hệ nhân quả.",
            ],
          },
          {
            heading: "Lifestyle modification — tách bạch cái thật có bằng chứng khỏi lời khuyên dân gian",
            evidence: "strong",
            mechanism:
              "Trong tất cả thay đổi lối sống được khuyến cáo truyền thống, chỉ 2 yếu tố chứng minh hiệu quả trong RCT: giảm cân và nâng cao đầu giường (bằng khối kê chân giường, không phải gối).",
            causes: "—",
            outcomes:
              "Giảm cân: giảm thời gian tiếp xúc axit thực quản (từ 5.6% xuống 3.7%, và 8.0% xuống 5.5% trong 2 RCT), hiệu quả ngay cả ở BMI bình thường. Nâng đầu giường: giảm acid exposure khi nằm ngửa từ 21% xuống 15%.",
            treatment:
              "Ưu tiên 2 can thiệp có bằng chứng vững thay vì dàn trải nỗ lực vào danh sách kiêng khem dài (cà phê, socola, đồ cay, cam quýt...) vốn thiếu bằng chứng RCT chất lượng cao và dễ gây frustration/giảm chất lượng sống không tương xứng lợi ích.",
            expertNote:
              "Bác sĩ lâm sàng ghi nhận bệnh nhân cố tuân thủ toàn bộ danh sách kiêng khem truyền thống thường trở nên rất thất vọng vì GERD không cải thiện trong khi chất lượng cuộc sống bị ảnh hưởng nặng — đây là ví dụ về việc 'lời khuyên nghe hợp lý về mặt sinh lý học lý thuyết' không đồng nghĩa 'có bằng chứng lâm sàng hiệu quả'.",
            application: [
              { domain: "Ưu tiên hành động", text: "Nếu thừa cân, đặt mục tiêu giảm 5–10% cân nặng — đây là can thiệp lifestyle có ROI cao nhất theo bằng chứng." },
              { domain: "Kỹ thuật đúng", text: "Kê khối gỗ/gạch dưới 2 chân đầu giường 10–20cm, không chỉ thêm gối (gối chỉ gập cổ, không tạo độ nghiêng toàn thân)." },
            ],
          },
        ],
      },
      {
        label: "Trục não-ruột & stress — nguyên nhân hay bị bỏ sót",
        sections: [
          {
            heading: "CRH/HPA axis & tăng nhạy cảm thực quản — 2 cơ chế riêng biệt",
            evidence: "moderate",
            mechanism:
              "Stress tác động qua 2 con đường khác nhau, không phải 1: (1) Tăng nhạy cảm thực quản — bệnh nhân GERD khi bị stress cấp tính cảm nhận mức độ ợ nóng tăng lên do CÙNG một lượng axit khách quan, qua cơ chế CRH làm tăng nhạy cảm nội tạng đo được bằng thực nghiệm tiêm CRH tĩnh mạch. (2) Mất cân bằng ANS mạn tính — HRV thấp ở bệnh nhân GERD phản ánh giảm phó giao cảm/tăng giao cảm; CRF mạn tính làm giảm lưu lượng máu tiêu hóa, ức chế nhu động, tăng viêm, tạo vòng xoắn 'stress–mất cân bằng ANS–rối loạn tiêu hóa'.",
            causes:
              "Stress công việc chu kỳ (deadline, áp lực dự án) là mô hình stress cấp tính lặp lại — khớp với thiết kế nghiên cứu stress âm thanh cấp tính đã chứng minh làm tăng cảm nhận ợ nóng. Cortisol kéo dài từ stress mạn tính còn làm tổn thương hàng rào niêm mạc thực sự, không chỉ thay đổi cảm nhận.",
            outcomes:
              "Có thể biểu hiện dưới dạng Reflux Hypersensitivity (có trào ngược sinh lý bình thường nhưng ngưỡng cảm nhận thấp) hoặc Functional Heartburn (hoàn toàn không có trào ngược axit bất thường). Một nghiên cứu cho thấy các quá trình TÂM LÝ, không phải thông số SINH LÝ, mới là yếu tố dự đoán mạnh nhất cho mức độ nghiêm trọng triệu chứng ở bệnh nhân kháng trị.",
            treatment:
              "Nếu PPI đã dùng đúng cách (trước ăn, đủ 8 tuần) mà triệu chứng vẫn bám sát chu kỳ stress: cân nhắc GI-CBT (giảm tần suất triệu chứng, relative risk 0.70), thôi miên hướng thực quản (cải thiện triệu chứng + lo âu nội tạng sau 7 buổi), hoặc liều thấp thuốc điều biến thần kinh (SSRI/TCA liều thấp — không phải liều điều trị trầm cảm, nhắm cơ chế thần kinh ngoại biên).",
            expertNote:
              "Đây không phải 'tâm lý hóa bệnh nhân' — CRH/HPA là cơ chế thần kinh đo lường được, không phải suy diễn. Sai lầm phổ biến nhất khi gặp trường hợp này là tăng liều PPI hoặc đổi thuốc PPI khác một cách vô ích, vì PPI chỉ giảm LƯỢNG axit chứ không tác động lên NGƯỠNG CẢM NHẬN thần kinh — hai cơ chế hoàn toàn khác nhau.",
            application: [
              { domain: "Phân tầng chẩn đoán", text: "Nếu triệu chứng khớp chặt chu kỳ stress công việc hơn là yếu tố cơ học (ăn no, nằm sau ăn), trao đổi bác sĩ về khả năng đo pH-impedance để phân biệt GERD thật / reflux hypersensitivity / functional heartburn." },
              { domain: "Can thiệp cấp độ tổ chức", text: "Giảm tần suất các đợt kích hoạt giao cảm cấp tính (nghỉ giải lao có cấu trúc, tránh dồn task sát deadline) có đòn bẩy cao hơn xử lý từng triệu chứng đơn lẻ." },
            ],
            pitfalls: [
              "Tăng liều PPI hoặc đổi PPI liên tục khi triệu chứng kháng trị theo chu kỳ stress — sai cơ chế, nên xem xét GI-CBT/neuromodulator thay vì.",
            ],
          },
          {
            heading: "Thở cơ hoành — can thiệp trúng đích kép hiếm có",
            evidence: "strong",
            mechanism:
              "Cơ hoành là một phần cấu trúc của LES (crural diaphragm) nên luyện tập trực tiếp tăng trương lực van; đồng thời thở chậm sâu kích hoạt dây X, kéo cán cân ANS về phía phó giao cảm — đối kháng trực tiếp trạng thái giao cảm ưu thế do stress gây ra.",
            causes: "—",
            outcomes:
              "RCT Mayo Clinic: thở cơ hoành tăng áp lực LES đáng kể (42.2mmHg so với 23.1mmHg, p<.001), giảm đáng kể số đợt trào ngược sau ăn cả ở bệnh nhân (0.36 so với 2.6) lẫn người khỏe mạnh (0 so với 1.75). RCT khác xác nhận cải thiện đo bằng pH-metry, điểm chất lượng cuộc sống, và mức sử dụng PPI.",
            treatment:
              "10–15 phút/ngày, đặc biệt trước/trong giai đoạn cao điểm công việc — không tác dụng phụ, tác động đúng cả 2 cơ chế bệnh sinh (cơ học + thần kinh) liên quan trực tiếp đến trào ngược do stress.",
            expertNote:
              "Đây là hiếm hoi trường hợp một can thiệp phi dược lý đơn giản tác động đúng vào cả 2 tầng cơ chế bệnh sinh cùng lúc — hiếm có can thiệp nào khác trong toàn bộ y văn GERD đạt được điều này với chi phí gần như bằng không.",
            application: [
              { domain: "Thực hành", text: "10–15 phút/ngày, ưu tiên thực hiện ngay trước/trong các giai đoạn cao điểm dự án thay vì chỉ khi đã có triệu chứng." },
            ],
          },
        ],
      },
      {
        label: "Khi PPI không đủ — dược lý thế hệ mới & chẩn đoán phân biệt bị bỏ sót",
        note: "Đây là tầng nội dung dành cho trường hợp KHÔNG đáp ứng PPI chuẩn sau 8 tuần đúng cách — phần lớn tài liệu phổ thông dừng lại ở PPI/lifestyle, bỏ qua toàn bộ tầng này.",
        sections: [
          {
            heading: "P-CAB (Potassium-Competitive Acid Blocker) — thế hệ ức chế axit mạnh hơn PPI",
            evidence: "strong",
            mechanism:
              "Khác PPI (ức chế không hồi phục bơm proton dạng hoạt động, cần acid hóa để kích hoạt, phụ thuộc bữa ăn), P-CAB (vonoprazan, tegoprazan, keverprazan) gắn trực tiếp và có hồi phục vào vị trí gắn kali của bơm H+/K+-ATPase — không cần acid hoạt hóa, đạt ức chế axit nhanh, mạnh và kéo dài hơn, khắc phục được hiện tượng 'nocturnal acid breakthrough' (đột phá axit ban đêm) mà khoảng một nửa bệnh nhân dùng PPI gặp phải.",
            causes:
              "PPI có giới hạn nội tại: khởi phát tác dụng chậm, biến thiên hiệu quả giữa các cá nhân do chuyển hóa qua men gan CYP2C19, phụ thuộc bữa ăn, và giảm hiệu quả dần theo thời gian (giống 'dung nạp' nhưng thực chất do tăng gastrin bù trừ chứ không phải mất nhạy thụ thể).",
            outcomes:
              "Meta-analysis 11 RCT, 4108 bệnh nhân: P-CAB hiệu quả hơn PPI có ý nghĩa thống kê trong lành viêm thực quản ăn mòn (OR 1.67), đặc biệt vượt trội ở viêm thực quản độ nặng (Los Angeles Grade C/D) — nhóm bệnh nhân PPI thường đáp ứng kém nhất. Không khác biệt có ý nghĩa về biến cố bất lợi so với PPI trong ngắn-trung hạn; dữ liệu dài hạn 5 năm với vonoprazan cho thấy hypergastrinemia và tăng sản tế bào thành/tế bào lỗ nhưng chưa ghi nhận chuyển dạng ác tính.",
            treatment:
              "Cân nhắc P-CAB khi: viêm thực quản độ C/D không lành hoàn toàn với PPI, có triệu chứng đột phá ban đêm dù đã dùng PPI đúng cách, hoặc nghi ngờ chuyển hóa CYP2C19 nhanh làm giảm hiệu quả PPI. Đây là quyết định của bác sĩ chuyên khoa, không tự chuyển thuốc.",
            expertNote:
              "Phần lớn dữ liệu hiện có đến từ quần thể châu Á (nơi vonoprazan được cấp phép sớm) và một số thiết kế nghiên cứu nhãn mở — cần thận trọng khi ngoại suy sang quần thể khác. Đây là ví dụ tốt về 'công nghệ mới luôn tốt hơn' cần được kiểm chứng thêm bằng RCT toàn cầu trước khi thay thế hoàn toàn vai trò hàng đầu của PPI.",
            application: [
              { domain: "Khi nào hỏi bác sĩ", text: "Nếu đã dùng PPI đúng liều, đúng thời điểm, đủ 8 tuần mà nội soi vẫn cho thấy viêm thực quản độ C/D chưa lành, hoặc triệu chứng ban đêm vẫn đột phá — đây là tình huống nên hỏi cụ thể về P-CAB thay vì chỉ tăng liều PPI." },
            ],
          },
          {
            heading: "Baclofen — thuốc duy nhất nhắm đúng cơ chế TLESR thay vì chỉ giảm axit",
            evidence: "moderate",
            mechanism:
              "Baclofen là chất chủ vận thụ thể GABA-B, ức chế phản xạ vagovagal gây giãn LES thoáng qua (TLESR) — đây là cơ chế điều trị KHÁC HẲN về bản chất so với mọi thuốc kháng axit (PPI, H2RA, P-CAB đều chỉ giảm LƯỢNG axit, không sửa được VAN bị hở). Baclofen tác động trực tiếp lên chính cơ chế TLESR đã xác định là nguyên nhân của đa số đợt trào ngược.",
            causes: "—",
            outcomes:
              "Meta-analysis 9 RCT: baclofen giảm có ý nghĩa số đợt trào ngược, thời gian trung bình mỗi đợt, và tần suất TLESR trong ngắn hạn; hiệu quả kéo dài gần 24 giờ. Đã được đề xuất là điều trị bổ sung hàng đầu cho GERD kháng trị với PPI/H2RA. Tác dụng phụ đều nhẹ-trung bình (buồn ngủ, chóng mặt), dung nạp tốt, không ghi nhận biến cố nghiêm trọng trong các thử nghiệm.",
            treatment:
              "Dùng như liệu pháp BỔ SUNG (add-on) cho bệnh nhân GERD kháng trị PPI thực sự (đã xác nhận bằng pH-impedance khi đang dùng PPI), không phải điều trị hàng đầu vì cần theo dõi tác dụng an thần và chưa có dữ liệu dài hạn đủ lớn.",
            expertNote:
              "Đây là minh chứng rõ nhất cho khoảng trống trong tư duy điều trị GERD phổ thông: gần như mọi lời khuyên đại chúng (kể cả nhiều tài liệu 'toàn diện') chỉ xoay quanh giảm axit, trong khi cơ chế bệnh sinh cốt lõi — TLESR — có một thuốc nhắm trúng đích đã tồn tại hàng chục năm nhưng ít được biết đến ngoài giới chuyên khoa tiêu hóa. Arbaclofen placarbil (tiền chất baclofen tác dụng kéo dài, ít tác dụng phụ hơn) đã được thử nghiệm nhưng chưa thương mại hóa rộng rãi.",
            application: [
              { domain: "Ai nên biết đến", text: "Bệnh nhân đã xác nhận GERD kháng trị thực sự qua pH-impedance khi đang dùng PPI (không phải chỉ 'cảm thấy PPI không đỡ') — hỏi bác sĩ tiêu hóa về baclofen như lựa chọn bổ sung." },
            ],
          },
          {
            heading: "Trào ngược ngoài thực quản (LPR) & trào ngược mật — hai chẩn đoán phân biệt hay bị bỏ sót",
            evidence: "moderate",
            mechanism:
              "Laryngopharyngeal Reflux (LPR): dịch trào ngược lên đến thanh quản/hầu gây khàn tiếng, ho mạn tính, cảm giác vướng họng, viêm thanh quản — cơ chế tổn thương khác GERD thực quản vì niêm mạc thanh quản nhạy cảm với axit hơn nhiều lần, có thể tổn thương dù lượng trào ngược khách quan thấp hơn ngưỡng gây GERD thực quản điển hình. Trào ngược mật (bile reflux/non-acid reflux): dịch tá tràng chứa muối mật/enzyme tụy trào ngược, không phải axit — PPI không có tác dụng vì cơ chế tổn thương không phụ thuộc pH.",
            causes:
              "LPR thường không đi kèm ợ nóng điển hình (gọi là 'silent reflux'), khiến bệnh nhân đi khám tai-mũi-họng nhiều lần trước khi nghĩ đến nguyên nhân tiêu hóa. Trào ngược mật thường xảy ra sau phẫu thuật dạ dày hoặc kết hợp với GERD axit.",
            outcomes:
              "LPR không được nhận diện đúng dẫn đến điều trị sai hướng nhiều năm (kháng sinh cho 'viêm họng tái phát', thuốc ho...). Trào ngược mật không đáp ứng PPI khiến bệnh nhân/bác sĩ lầm tưởng 'PPI thất bại hoàn toàn' trong khi thực chất đang điều trị sai cơ chế.",
            treatment:
              "LPR: cần nghi ngờ khi có khàn tiếng/ho mạn tính/vướng họng mà không đáp ứng điều trị tai-mũi-họng thông thường — chẩn đoán bằng pH-impedance hầu họng chuyên biệt, điều trị vẫn dùng PPI liều cao hơn + lifestyle nghiêm ngặt hơn (đặc biệt tránh ăn muộn). Trào ngược mật: cần đo bilirubin trong thực quản (Bilitec) hoặc impedance để xác nhận; điều trị bằng thuốc gắn acid mật (cholestyramine) hoặc phẫu thuật chuyển dòng nếu nặng, KHÔNG đáp ứng PPI đơn thuần.",
            expertNote:
              "Sai lầm lâm sàng phổ biến nhất với 2 nhóm này là áp dụng nguyên xi phác đồ GERD điển hình rồi kết luận 'điều trị thất bại' khi thực chất chưa từng điều trị đúng cơ chế — đây là lý do bệnh nhân có triệu chứng dai dẳng, không điển hình, hoặc thực sự kháng trị nên được tầm soát các chẩn đoán phân biệt này thay vì tăng liều PPI liên tục.",
            application: [
              { domain: "Cờ đỏ gợi ý LPR", text: "Khàn tiếng buổi sáng, ho mạn tính không rõ nguyên nhân, cảm giác vướng/nghẹn ở họng mà KHÔNG có ợ nóng điển hình đi kèm — cần nghĩ đến LPR, không chỉ khám tai-mũi-họng đơn thuần." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sleep",
    num: "03",
    icon: Moon,
    title: "Giấc ngủ",
    subtitle: "Nhịp sinh học, CBT-I, ánh sáng/caffeine/melatonin, nợ ngủ",
    groups: [
      {
        label: "Nền tảng sinh học",
        sections: [
          {
            heading: "Nhịp sinh học & vòng lặp Cortisol–Giấc ngủ",
            evidence: "strong",
            mechanism:
              "Tế bào cảm quang ipRGC ở võng mạc, nhạy ánh sáng xanh, gửi tín hiệu đến SCN (đồng hồ sinh học trung tâm) xác nhận ngày đã bắt đầu. Tín hiệu này đặt bộ đếm giờ: khoảng 14–16 giờ sau, cơ thể bắt đầu tiết melatonin khởi động giấc ngủ. Giấc ngủ sóng chậm sâu có tác dụng ức chế lên trục HPA/cortisol; ngược lại thiếu ngủ kích hoạt trục HPA, làm suy yếu cơ chế phản hồi âm vốn tắt cortisol sau khi tác nhân stress qua đi.",
            causes:
              "Lệch giờ tiếp xúc ánh sáng buổi sáng, caffeine muộn, ánh sáng xanh buổi tối, lịch trình thức-ngủ không đều, stress mạn tính (xem tab Stress) — tất cả cùng phá vỡ tín hiệu định giờ cho SCN.",
            outcomes:
              "Vòng lặp tự khuếch đại không tự sửa nếu không can thiệp: thức dậy với phản ứng stress nhạy cảm hơn, những stress nhỏ hơn cũng kích hoạt phản ứng sinh lý lớn hơn — một nghiên cứu theo dõi 9 đêm liên tiếp ghi nhận mỗi đêm ngủ kém khuếch đại tình trạng tăng kích hoạt buổi sáng hôm sau. Kiểu hình đặc trưng: cortisol thấp buổi sáng (mệt mỏi, uể oải, thèm đồ mặn/ngọt) và cao ban đêm ('tỉnh táo bất thường', khó vào giấc) — 'mệt nhưng tỉnh' (wired but tired).",
            treatment:
              "Neo nhịp sinh học sớm trong ngày bằng ánh sáng buổi sáng thay vì để nó trôi tự do; cắt vòng lặp cortisol-ngủ bằng CBT-I nếu đã thành mất ngủ mạn tính (xem phần CBT-I).",
            expertNote:
              "Thời điểm tiếp xúc ánh sáng quan trọng hơn nhiều so với lượng ánh sáng — đây là đòn bẩy bị đánh giá thấp nhất trong quản lý giấc ngủ, thường bị bỏ qua để ưu tiên các biện pháp phức tạp hơn (thực phẩm chức năng, ứng dụng theo dõi giấc ngủ...).",
            application: [
              { domain: "Buổi sáng", text: "Ra ngoài trời hoặc gần cửa sổ sáng trong 30–60 phút đầu sau khi thức dậy để neo nhịp sinh học." },
            ],
          },
        ],
      },
      {
        label: "Điều trị chuẩn vàng",
        sections: [
          {
            heading: "CBT-I — không phải 'vệ sinh giấc ngủ' chung chung",
            evidence: "strong",
            mechanism:
              "CBT-I gồm 4 thành phần: Kiểm soát kích thích (khôi phục giường là tín hiệu cho giấc ngủ, không phải nơi lo lắng/làm việc), Hạn chế giấc ngủ (điều chỉnh giờ ngủ/thức khớp thời lượng ngủ thực tế), Trị liệu nhận thức (điều chỉnh niềm tin sai lệch về giấc ngủ), Giáo dục vệ sinh giấc ngủ (chỉ là MỘT phần, không phải toàn bộ).",
            causes: "Mất ngủ mạn tính thường được duy trì bởi chính các hành vi bù trừ sai (nằm lâu trên giường cố ngủ, ngủ bù thất thường) và niềm tin thảm họa hóa, không chỉ bởi nguyên nhân khởi phát ban đầu.",
            outcomes:
              "Meta-analysis 30 RCT: hiệu quả duy trì đến 12 tháng (Hedges' g=0.25–0.64 tùy chỉ số) — vượt trội và bền vững hơn thuốc ngủ về dài hạn, không nguy cơ lệ thuộc/dung nạp/mất ngủ dội ngược.",
            treatment:
              "CBT-I được các hiệp hội y khoa lớn (Hiệp hội Tâm lý học Hoa Kỳ, Trường Cao đẳng Bác sĩ Hoa Kỳ) khuyến cáo là điều trị hàng đầu cho mất ngủ mạn tính, nên thử trước khi dùng thuốc ngủ.",
            expertNote:
              "Phân biệt quan trọng: 'vệ sinh giấc ngủ' (sleep hygiene — danh sách mẹo như tránh caffeine, giữ phòng tối) chỉ là MỘT thành phần nhỏ của CBT-I, không phải điều trị đầy đủ — đây là lý do nhiều người áp dụng 'mẹo vệ sinh giấc ngủ' mà mất ngủ mạn tính không cải thiện, vì thiếu 2 thành phần hành vi cốt lõi (kiểm soát kích thích, hạn chế giấc ngủ).",
            application: [
              { domain: "Kiểm soát kích thích", text: "Chỉ lên giường khi buồn ngủ thật; nếu sau 15–20 phút chưa ngủ được, rời giường sang phòng khác đến khi buồn ngủ." },
              { domain: "Khi cần chuyên sâu", text: "Nếu mất ngủ đã mạn tính (>3 tháng, ≥3 đêm/tuần), tìm chuyên gia CBT-I thay vì chỉ tự áp dụng mẹo vệ sinh giấc ngủ." },
            ],
          },
        ],
      },
      {
        label: "Biến số kiểm soát được",
        sections: [
          {
            heading: "Ánh sáng, Caffeine, Melatonin — đánh giá trung thực",
            evidence: "moderate",
            mechanism:
              "Ánh sáng xanh (460nm) buổi tối ức chế melatonin mạnh nhất ở bước sóng ngắn nhất, nhưng nồng độ melatonin phục hồi khá nhanh (trong ~15 phút) sau khi ngừng tiếp xúc. Caffeine chặn thụ thể adenosine, thời gian bán hủy trung bình ~4 giờ; caffeine buổi tối/đêm còn làm chậm khởi phát tiết melatonin và giảm nồng độ melatonin ban đêm (tác động lên nhịp sinh học, không chỉ gây khó ngủ đơn thuần).",
            causes:
              "Dùng caffeine muộn (sau 14h vẫn còn đáng kể trong máu vào giờ ngủ), tiếp xúc màn hình sáng ngay sát giờ ngủ, kỳ vọng sai về hiệu quả của melatonin bổ sung.",
            outcomes:
              "Network meta-analysis: melatonin hiệu quả cải thiện ĐỘ TRỄ giấc ngủ (đặc biệt khi đo bằng đa ký giấc ngủ) nhưng KHÔNG cải thiện chất lượng giấc ngủ tổng thể, mức độ nghiêm trọng cảm nhận, hay số lần thức giấc ban đêm.",
            treatment:
              "Cắt caffeine trước 14h (với người nhạy cảm, có thể cần sớm hơn). Giảm ánh sáng xanh/màn hình sáng chỉ cần 30–60 phút cuối trước ngủ là đủ (không cần kiêng cả buổi chiều, vì melatonin phục hồi nhanh sau khi ngừng tiếp xúc). Melatonin nên dùng đúng vai trò — điều chỉnh nhịp (lệch múi giờ, rối loạn nhịp trì hoãn) — hơn là kỳ vọng nó là 'thuốc ngủ mạnh'.",
            expertNote:
              "Melatonin là ví dụ điển hình về khoảng cách giữa kỳ vọng phổ biến và bằng chứng thực: được bán/dùng rộng rãi như 'thuốc ngủ tự nhiên an toàn', nhưng bằng chứng chỉ ủng hộ vai trò hẹp hơn nhiều (điều chỉnh thời điểm/độ trễ giấc ngủ), không phải cải thiện chất lượng giấc ngủ nói chung.",
            application: [
              { domain: "Caffeine", text: "Cắt trước 14h nếu ngủ lúc 22–23h, dựa trên thời gian bán hủy ~4 giờ và tác động lên tiết melatonin, không chỉ cảm giác chủ quan 'tỉnh hay không'." },
              { domain: "Màn hình buổi tối", text: "Chỉ cần giảm ánh sáng xanh 30–60 phút cuối trước ngủ, không cần lo lắng thái quá về dùng điện thoại buổi chiều." },
              { domain: "Melatonin", text: "Chỉ kỳ vọng hiệu quả cho việc RÚT NGẮN thời gian vào giấc, không kỳ vọng cải thiện chất lượng ngủ tổng thể hay giảm thức giấc giữa đêm." },
            ],
            pitfalls: ["Kỳ vọng melatonin là 'thuốc ngủ mạnh' thay thế CBT-I hoặc xử lý mất ngủ mạn tính — bằng chứng không ủng hộ vai trò này."],
          },
        ],
      },
      {
        label: "Nợ giấc ngủ",
        sections: [
          {
            heading: "Ngủ bù cuối tuần: phục hồi được bao nhiêu?",
            evidence: "moderate",
            mechanism:
              "Nợ giấc ngủ tích lũy không tuyến tính — mức độ suy giảm hiệu suất nhận thức tăng nhanh hơn tỷ lệ với thời gian thiếu ngủ, và người bị ảnh hưởng thường không nhận thức được mức độ suy giảm của chính mình.",
            causes: "Thiếu ngủ mạn tính do lịch làm việc/lối sống, cố gắng bù bằng ngủ nhiều vào cuối tuần.",
            outcomes:
              "Sau 10 ngày hạn chế ngủ 6 giờ/đêm, cần 7 đêm liên tiếp ngủ đủ 8+ giờ để phục hồi hiệu suất nhận thức về mức nền — 2 ngày cuối tuần KHÔNG đủ. Sau 2 tuần ngủ 6 giờ/đêm, hiệu suất nhận thức giảm tương đương mức say rượu hợp pháp (BAC 0.10%). Ngủ bù cuối tuần cung cấp phục hồi ngắn hạn MỘT PHẦN (tâm trạng, mệt mỏi, một phần nhận thức), nhưng ngủ bù kéo dài/không đều đặn có thể gây social jet lag — làm rối loạn nhịp sinh học và suy giảm điều hòa chuyển hóa.",
            treatment:
              "Nếu chỉ mất 1–2 đêm ngủ lẻ tẻ, một cuối tuần phục hồi có ý nghĩa. Nếu thiếu ngủ đã mạn tính kéo dài hàng tuần/tháng, cần nhiều đêm liên tiếp ngủ đủ (không chỉ 2 ngày) — và quan trọng hơn là xử lý RÀO CẢN CẤU TRÚC gây thiếu ngủ (giờ làm việc, lịch trình, thời gian màn hình buổi tối) thay vì chỉ tối ưu cách ngủ bù.",
            expertNote:
              "Chợp mắt 10–30 phút phục hồi tạm thời sự tỉnh táo và một phần hiệu suất, nhưng trong khảo sát dân số lớn (>12.000 người trưởng thành), cả ngủ bù cuối tuần lẫn chợp mắt đều KHÔNG bù đắp đầy đủ cho tình trạng thiếu ngủ mạn tính ở cấp độ quần thể — đây là lý do 'tối ưu hóa ngủ bù' có đòn bẩy thấp hơn nhiều so với giải quyết nguyên nhân gốc gây thiếu ngủ.",
            application: [
              { domain: "Kỳ vọng thực tế", text: "Đặt kỳ vọng đúng: một cuối tuần đủ cho 1–2 đêm mất ngủ lẻ tẻ, nhưng không đủ cho thiếu ngủ tích lũy nhiều ngày liên tục." },
              { domain: "Ưu tiên chiến lược", text: "Nếu thiếu ngủ lặp lại do công việc, ưu tiên xử lý rào cản cấu trúc (giờ làm, deadline dồn cuối) hơn tìm cách 'ngủ bù tối ưu'." },
            ],
          },
        ],
      },
      {
        label: "Khi 'ngủ kém' không chỉ là mất ngủ — chẩn đoán phân biệt & dược lý thế hệ mới",
        note: "Đây là tầng nội dung hay bị bỏ sót nhất trong các khung 'cải thiện giấc ngủ' phổ thông: một tỷ lệ đáng kể người tự nhận 'mất ngủ' thực chất có một bệnh lý hô hấp khi ngủ chưa được chẩn đoán, khiến mọi can thiệp hành vi (CBT-I, vệ sinh giấc ngủ) chỉ có hiệu quả một phần.",
        sections: [
          {
            heading: "COMISA (Comorbid Insomnia & Sleep Apnea) — chẩn đoán phân biệt quan trọng nhất bị bỏ sót",
            evidence: "strong",
            mechanism:
              "Ngưng thở tắc nghẽn khi ngủ (OSA) gây vi thức giấc lặp lại hàng chục-hàng trăm lần/đêm do tắc nghẽn đường thở, phá vỡ kiến trúc giấc ngủ mà người bệnh thường KHÔNG nhớ được các lần thức giấc này — chỉ cảm nhận hậu quả là 'ngủ không sâu/mất ngủ'. OSA và mất ngủ không loại trừ nhau: tỷ lệ đồng mắc cao và tạo vòng xoắn hai chiều (OSA gây phân mảnh giấc ngủ → tăng nguy cơ mất ngủ; lo âu về mất ngủ → tăng căng cơ đường thở → nặng thêm OSA).",
            causes:
              "Béo phì, cấu trúc hàm/đường thở hẹp, tuổi tác, uống rượu buổi tối (giãn cơ đường thở) — nhiều yếu tố nguy cơ trùng lặp với các yếu tố gây GERD (béo phì) đã nêu ở tab Trào ngược, và bản thân OSA cũng là yếu tố nguy cơ độc lập làm nặng thêm GERD ban đêm qua thay đổi áp lực trong lồng ngực khi ngưng thở.",
            outcomes:
              "Tỷ lệ triệu chứng mất ngủ ở bệnh nhân OSA: 39–58%; ngược lại 29–67% bệnh nhân mất ngủ có chỉ số ngưng thở-giảm thở (AHI) >5 khi đo đa ký giấc ngủ — nghĩa là gần 1/3 đến 2/3 người tự nhận 'mất ngủ' có thể đang mắc OSA chưa chẩn đoán. COMISA liên quan đến mức độ suy giảm chức năng ban ngày, nguy cơ tim mạch-chuyển hóa, và tỷ lệ tử vong cao hơn so với chỉ mắc một trong hai bệnh.",
            treatment:
              "Nếu áp dụng đúng CBT-I mà không cải thiện, hoặc có các dấu hiệu gợi ý OSA (ngáy to, người khác chứng kiến ngưng thở, thức dậy nghẹt thở/khô miệng, buồn ngủ ban ngày quá mức dù 'ngủ đủ giờ', béo phì/cổ to), cần tầm soát bằng bảng câu hỏi sàng lọc (STOP-Bang) và đo đa ký giấc ngủ. Điều trị kết hợp CPAP (áp lực dương liên tục) + CBT-I cho kết quả tốt hơn điều trị đơn lẻ một trong hai.",
            expertNote:
              "Đây là sai lầm chẩn đoán phổ biến và tốn kém thời gian nhất trong quản lý giấc ngủ: áp dụng toàn bộ protocol CBT-I/vệ sinh giấc ngủ hàng tháng trời cho một người thực chất mắc OSA — các can thiệp hành vi có thể cải thiện nhẹ triệu chứng chủ quan nhưng không giải quyết được nguyên nhân gốc là tắc nghẽn đường thở, dẫn đến 'CBT-I thất bại' giả tạo trong khi vấn đề thật chưa từng được chẩn đoán.",
            application: [
              { domain: "Cờ đỏ cần tầm soát", text: "Ngáy to, buồn ngủ ban ngày quá mức dù đã ngủ đủ giờ theo protocol, thức dậy đau đầu/khô miệng, hoặc CBT-I đã áp dụng đúng 6-8 tuần mà không cải thiện — nên hỏi bác sĩ về tầm soát OSA trước khi tiếp tục các can thiệp hành vi." },
            ],
            pitfalls: ["Kiên trì áp dụng CBT-I/vệ sinh giấc ngủ hàng tháng mà không cải thiện, không tầm soát OSA — đặc biệt nguy hiểm nếu có yếu tố nguy cơ (béo phì, ngáy to)."],
          },
          {
            heading: "Thuốc ngủ thế hệ mới (DORA) — khác biệt cơ chế so với Z-drug/benzodiazepine",
            evidence: "strong",
            mechanism:
              "Nhóm thuốc benzodiazepine và Z-drug (zolpidem...) tác động qua thụ thể GABA-A, tăng cường ức chế thần kinh toàn diện. Nhóm đối kháng thụ thể orexin kép (DORA: suvorexant, lemborexant, daridorexant) hoạt động qua cơ chế khác hẳn — chặn thụ thể orexin, chất dẫn truyền thần kinh thúc đẩy tỉnh táo, thay vì tăng cường ức chế; về mặt sinh lý học gần với việc 'tắt tín hiệu thức tỉnh' hơn là 'gây mê ép ngủ'.",
            causes:
              "GABA-A agonist (đặc biệt dùng kéo dài) có khoảng 50% người dùng dài hạn phát triển dung nạp, lệ thuộc, hoặc hội chứng cai — đây là động lực phát triển nhóm thuốc thế hệ mới với cơ chế khác.",
            outcomes:
              "Meta-analysis: DORA rút ngắn thời gian vào giấc nhiều hơn benzodiazepine/Z-drug khoảng 15 phút (khác biệt trung bình), hiệu quả duy trì 6-12 tháng KHÔNG có bằng chứng dung nạp/hội chứng cai — khác biệt lớn so với nhóm GABA-A. Hồ sơ an toàn thuận lợi hơn rõ rệt: nguy cơ buồn ngủ ngày hôm sau thấp hơn (RR 0.1), suy giảm nhận thức thấp hơn (RR 0.65), nguy cơ lệ thuộc thấp hơn (RR 0.38) so với nhóm GABA-A.",
            treatment:
              "CBT-I vẫn là lựa chọn hàng đầu theo mọi guideline. Khi cần dược lý (mất ngủ cấp/bắc cầu trong lúc chờ hiệu quả CBT-I, hoặc mất ngủ mạn không đáp ứng đủ với CBT-I), DORA là lựa chọn có hồ sơ an toàn dài hạn thuận lợi hơn GABA-A agonist truyền thống — quyết định cụ thể (loại thuốc, liều) cần bác sĩ chuyên khoa dựa trên tuổi, bệnh nền, và đặc điểm mất ngủ (khó vào giấc vs khó duy trì giấc).",
            expertNote:
              "Đây là một trong những thay đổi thực sự quan trọng trong dược lý học giấc ngủ thập kỷ qua nhưng ít được biết đến ngoài giới chuyên khoa — công chúng vẫn mặc định 'thuốc ngủ' đồng nghĩa với nhóm benzodiazepine/Z-drug cũ và nỗi lo lệ thuộc đi kèm, trong khi nhóm DORA đại diện một cơ chế dược lý khác về bản chất với hồ sơ an toàn dài hạn khác biệt rõ rệt.",
            application: [
              { domain: "Khi thảo luận với bác sĩ", text: "Nếu cân nhắc dùng thuốc ngủ, hỏi cụ thể về nhóm DORA (suvorexant/lemborexant/daridorexant) như một lựa chọn thay thế nhóm Z-drug/benzodiazepine truyền thống, đặc biệt nếu cần dùng hơn vài tuần." },
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
  // Trào ngược
  { pillar: "Trào ngược dạ dày", leverage: "high", text: "Nếu thừa cân: giảm 5–10% cân nặng cơ thể", why: "Đây là can thiệp lifestyle có ROI cao nhất theo bằng chứng RCT — giảm thời gian tiếp xúc axit thực quản rõ rệt, hiệu quả ngay cả ở BMI bình thường." },
  { pillar: "Trào ngược dạ dày", leverage: "high", text: "Nâng đầu giường 10–20cm bằng khối kê chân giường (không dùng gối cao)", why: "Một trong hai can thiệp lifestyle duy nhất có bằng chứng RCT vững; gối cao chỉ gập cổ, không tạo được độ nghiêng toàn thân cần thiết." },
  { pillar: "Trào ngược dạ dày", leverage: "high", text: "Uống PPI 30–60 phút trước bữa ăn đầu ngày, tái đánh giá sau 8 tuần", why: "Sai thời điểm uống là lý do phổ biến nhất khiến PPI 'không hiệu quả'; PPI cần bơm proton đang hoạt động để phát huy tác dụng. Không tự động gia hạn vô thời hạn." },
  { pillar: "Trào ngược dạ dày", leverage: "moderate", text: "Thở cơ hoành 10–15 phút/ngày, đặc biệt trước giai đoạn cao điểm công việc", why: "Tác động kép hiếm có: tăng trực tiếp áp lực LES (cơ học) đồng thời kéo ANS về phía phó giao cảm (thần kinh) — RCT cho thấy giảm rõ rệt số đợt trào ngược sau ăn." },
  { pillar: "Trào ngược dạ dày", leverage: "moderate", text: "Ăn tối cách giờ ngủ ≥2–3 giờ; ghi nhật ký thực phẩm 2 tuần thay vì kiêng khem chung", why: "Ăn muộn có RCT xác nhận tăng acid exposure về đêm. Danh sách kiêng cà phê/socola/cay chung thiếu bằng chứng RCT mạnh — cá thể hóa hiệu quả hơn." },
  { pillar: "Trào ngược dạ dày", leverage: "low", text: "Xét nghiệm/điều trị H. pylori với hy vọng chữa GERD, hoặc dùng giấm táo/baking soda 'trung hòa axit'", why: "H. pylori có liên hệ NGHỊCH với GERD — diệt trừ có thể làm triệu chứng nặng hơn. Giấm táo sai cơ chế vì đa số bệnh nhân GERD không dư axit, và có thể tổn thương thêm niêm mạc viêm." },
  { pillar: "Trào ngược dạ dày", leverage: "high", text: "Nếu PPI đúng cách 8 tuần vẫn không đáp ứng: hỏi bác sĩ về pH-impedance thay vì tự tăng liều/đổi thuốc", why: "Kháng trị thực sự cần phân biệt GERD axit (có thể cần P-CAB/baclofen), trào ngược mật (không đáp ứng PPI), LPR, hay functional heartburn — mỗi loại cần hướng điều trị khác hẳn nhau." },
  { pillar: "Trào ngược dạ dày", leverage: "moderate", text: "Nếu có khàn tiếng/ho mạn tính/vướng họng không rõ nguyên nhân, không đáp ứng điều trị tai-mũi-họng: nghĩ đến LPR (silent reflux)", why: "LPR thường không đi kèm ợ nóng điển hình, khiến bệnh nhân bị điều trị sai hướng (kháng sinh, thuốc ho) nhiều năm trước khi nghĩ đến nguyên nhân tiêu hóa." },

  // Stress
  { pillar: "Stress", leverage: "high", text: "Vận động ≥3 lần/tuần, <60 phút/buổi, phối hợp aerobic + yoga/khí công", why: "Bằng chứng Level 1 Grade A cho lo âu chủ quan (aerobic) và cortisol khách quan (yoga/khí công) — đây là can thiệp xây năng lực nền quan trọng nhất, cần tích lũy trước khi cao điểm ập đến." },
  { pillar: "Stress", leverage: "high", text: "Cyclic sighing 1–3 chu kỳ ngay khi cảm nhận cơn stress cấp", why: "RCT Stanford: hiệu quả cải thiện tâm trạng nhanh nhất trong các kỹ thuật thở ngắn, vượt cả thiền chánh niệm — cơ chế kép qua tái mở phế nang và kích hoạt dây X." },
  { pillar: "Stress", leverage: "high", text: "Tái diễn giải kích hoạt sinh lý là 'thách thức' thay vì 'đe dọa' trước tình huống hiệu suất", why: "RCT chứng minh cải thiện điểm thi thực tế qua cơ chế tăng nhận thức về khả năng ứng phó — chuyển từ co mạch (đe dọa) sang giãn mạch (thách thức), không phải 'tư duy tích cực' chung chung." },
  { pillar: "Stress", leverage: "moderate", text: "Dashboard tuần theo dõi HRV/ngủ/ốm vặt/năng lượng để bắt allostatic load sớm", why: "Stress tích lũy âm thầm ngay cả khi từng chỉ số đơn lẻ 'bình thường' — theo dõi cho tín hiệu sớm để chủ động giảm tải trước khi kiệt sức." },
  { pillar: "Stress", leverage: "moderate", text: "Nghỉ phục hồi thật sự (không kiểm tra công việc) sau đợt cao điểm", why: "Nghiên cứu PNAS ghi nhận nghỉ đủ dài phục hồi cả kết nối vỏ não trước trán lẫn chức năng nhận thức bị suy giảm do stress — không cần cả tháng, nhưng cần đủ dài và liên tục." },
  { pillar: "Stress", leverage: "low", text: "Kỳ vọng 'có người tâm sự' sẽ giảm ngay mức stress cảm nhận trong khoảnh khắc cụ thể", why: "Một nghiên cứu trên 412 nhân viên văn phòng không tìm thấy hỗ trợ xã hội dự đoán được mức stress cảm nhận — vai trò thật của nó là hài lòng cuộc sống dài hạn, không phải giảm stress cấp tính." },
  { pillar: "Stress", leverage: "moderate", text: "Với stress tình huống cụ thể (thuyết trình, phỏng vấn), hỏi bác sĩ về propranolol thay vì chịu đựng run/tim đập nhanh", why: "Hiệu quả rõ với triệu chứng cơ thể (run, nhịp tim) nhưng không thay thế CBT cho lo âu lan tỏa — cần bác sĩ sàng lọc chống chỉ định tim mạch/hô hấp trước, không tự dùng." },
  { pillar: "Stress", leverage: "high", text: "Nếu một can thiệp 'chuẩn' không hiệu quả sau 4-6 tuần thử nghiêm túc, đổi cơ chế thay vì kết luận 'không có gì hiệu quả'", why: "Mọi effect size là trung bình quần thể — phản ứng cá nhân biến thiên lớn do khác biệt sinh học trục HPA; coi mỗi can thiệp là giả thuyết cần tự kiểm (n=1), không phải công thức áp dụng cứng." },
  { pillar: "Stress", leverage: "high", text: "Khi stress cấp tính: ra ngoài trời có nắng 15-30 phút, ưu tiên nơi có cây xanh nếu có thể", why: "Cơ chế serotonin đo được trực tiếp (nghiên cứu Lambert 2002) — tác động nhanh hơn nhiều can thiệp khác; không gian xanh cộng thêm hiệu ứng giảm cortisol đã xác nhận qua meta-analysis." },
  { pillar: "Stress", leverage: "high", text: "Sau khi đã hạ nhiệt cấp tính, viết ra rõ: nguồn gây stress là gì, phần nào kiểm soát được, phần nào không", why: "Đây là phần 'chữa gốc' theo lý thuyết coping đã kiểm chứng (Lazarus & Folkman) — mọi kỹ thuật làm dịu (thở/vận động/nắng/ngủ) chỉ là 'chữa ngọn', không dừng được tích lũy allostatic load nếu không quay lại xử lý nguồn công việc." },
  { pillar: "Stress", leverage: "high", text: "Giành lại một chút quyền kiểm soát công việc: đầu tuần chủ động đề xuất thứ tự ưu tiên cho sếp thay vì chờ được giao", why: "Theo mô hình Karasek, kiệt sức cao nhất khi 'quá tải + mất kiểm soát' — quyền tự chủ là yếu tố đệm mạnh nhất chống kiệt sức, nên tăng dù chỉ chút control có đòn bẩy cao bất tương xứng." },
  { pillar: "Stress", leverage: "high", text: "Dựng ranh giới công việc/đời sống ở cả 2 tầng: giờ 'đóng cửa công việc' cố định (nghĩa đen) + đóng vòng lặp nhai lại trong đầu (nghĩa bóng)", why: "Phục hồi thật đòi hỏi psychological detachment (Sonnentag) — không chỉ rời văn phòng vật lý mà ngắt kết nối tâm trí; nếu đầu vẫn 'ở văn phòng', trục HPA/giao cảm tiếp tục chạy, không có phục hồi." },
  { pillar: "Stress", leverage: "high", text: "Mỗi tuần có cả hoạt động 'không cần nghĩ' (nằm nghe nhạc, xem phim nhẹ) LẪN hoạt động có chút thử thách nhưng vui (ca hát, nhảy, vẽ, thể thao) — tự chọn, không vì nghĩa vụ", why: "Đây là 2 trong 4 'recovery experiences' đã kiểm chứng qua meta-analysis N=99,329 (Sonnentag & Fritz) — Relaxation và Mastery dự đoán cảm xúc tích cực/hài lòng cuộc sống, thực ra còn tốt hơn cả detachment cho các outcome tích cực." },
  { pillar: "Stress", leverage: "moderate", text: "Chặn quá tải SỚM bằng dữ kiện cụ thể ('thêm D thì A/B/C phải lùi một cái — ưu tiên cái nào?') thay vì im lặng nhận hết rồi cháy deadline", why: "Chi phí nêu vấn đề sớm luôn thấp hơn cháy deadline; chuyển từ vị thế bị động sang chủ động định hình kỳ vọng, đồng thời giành lại control (biến có đòn bẩy mạnh nhất)." },
  { pillar: "Stress", leverage: "low", text: "Kỳ vọng viết tự do 15-20 phút (expressive writing) là công cụ chính, thay thế vận động/thở", why: "Effect size ban đầu (d=0.47) đã co lại còn rất nhỏ (~0.16) qua các meta-analysis nghiêm ngặt hơn — có thể thử vì không hại, nhưng không nên là trụ cột chính của kế hoạch." },

  // Giấc ngủ
  { pillar: "Giấc ngủ", leverage: "high", text: "Ánh sáng tự nhiên trong 30–60 phút đầu sau khi thức dậy", why: "Thời điểm tiếp xúc ánh sáng quan trọng hơn lượng ánh sáng — đặt 'bộ đếm giờ' melatonin cho ~14–16 giờ sau, neo nhịp sinh học sớm trong ngày." },
  { pillar: "Giấc ngủ", leverage: "high", text: "Cắt caffeine trước 14h (nếu ngủ lúc 22–23h)", why: "Thời gian bán hủy ~4 giờ nghĩa là caffeine sau 14h vẫn còn đáng kể vào giờ ngủ, và còn làm chậm/giảm tiết melatonin ban đêm — tác động lên nhịp sinh học, không chỉ 'khó ngủ' đơn thuần." },
  { pillar: "Giấc ngủ", leverage: "high", text: "Áp dụng kiểm soát kích thích: chỉ lên giường khi buồn ngủ, rời giường nếu không ngủ được sau 15–20 phút", why: "Thành phần cốt lõi của CBT-I (điều trị chuẩn vàng, hiệu quả bền hơn thuốc ngủ) — khôi phục giường là tín hiệu cho giấc ngủ, không phải nơi lo lắng/tỉnh táo." },
  { pillar: "Giấc ngủ", leverage: "moderate", text: "Giảm ánh sáng xanh/màn hình 30–60 phút cuối trước ngủ (không cần kiêng cả buổi chiều)", why: "Melatonin phục hồi trong ~15 phút sau khi ngừng tiếp xúc ánh sáng xanh — chỉ cần tắt màn hình sát giờ ngủ là đủ, không cần lo lắng thái quá về dùng điện thoại ban ngày/chiều." },
  { pillar: "Giấc ngủ", leverage: "moderate", text: "Đặt kỳ vọng đúng cho ngủ bù cuối tuần: đủ cho 1–2 đêm mất ngủ lẻ tẻ, không đủ cho thiếu ngủ mạn tính", why: "Sau 10 ngày hạn chế ngủ, cần 7 đêm liên tiếp ngủ đủ để phục hồi — 2 ngày cuối tuần không đủ; ưu tiên xử lý rào cản cấu trúc gây thiếu ngủ thay vì chỉ tối ưu cách ngủ bù." },
  { pillar: "Giấc ngủ", leverage: "low", text: "Dùng melatonin liều cao kỳ vọng nó là 'thuốc ngủ mạnh' cải thiện chất lượng giấc ngủ tổng thể", why: "Bằng chứng chỉ ủng hộ melatonin cho việc rút ngắn ĐỘ TRỄ vào giấc, KHÔNG cải thiện chất lượng ngủ tổng thể, mức nghiêm trọng cảm nhận, hay số lần thức giấc." },
  { pillar: "Giấc ngủ", leverage: "high", text: "Nếu ngáy to/buồn ngủ ban ngày quá mức dù ngủ đủ giờ, hoặc CBT-I 6-8 tuần không cải thiện: tầm soát ngưng thở khi ngủ (OSA)", why: "29–67% người tự nhận 'mất ngủ' có chỉ số ngưng thở-giảm thở bất thường khi đo — áp dụng CBT-I/vệ sinh giấc ngủ cho người thực chất mắc OSA chỉ cải thiện một phần vì không giải quyết nguyên nhân gốc." },
  { pillar: "Giấc ngủ", leverage: "moderate", text: "Nếu cần dùng thuốc ngủ hơn vài tuần, hỏi bác sĩ về nhóm DORA (suvorexant/lemborexant) thay vì mặc định Z-drug/benzodiazepine", why: "DORA có cơ chế khác hẳn (chặn tín hiệu thức tỉnh thay vì tăng cường ức chế toàn diện), hồ sơ an toàn dài hạn thuận lợi hơn rõ rệt: ít buồn ngủ ngày hôm sau, ít suy giảm nhận thức, ít nguy cơ lệ thuộc." },
];

/* ---------------------------------------------------------------
   PILLAR / ACTIONABLE VIEWS
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
            Trào ngược + khó ngủ do stress công việc — lộ trình theo thứ tự ưu tiên
          </span>
        </div>
        {open ? <ChevronUp size={18} color={C.teal} className="shrink-0" /> : <ChevronDown size={18} color={C.teal} className="shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 13, lineHeight: 1.6, fontStyle: "italic", marginTop: 10 }}>
            Áp dụng khi trào ngược VÀ khó ngủ cùng tăng nặng theo đúng chu kỳ deadline/áp lực công việc — dấu hiệu cho thấy cả hai cùng xuất phát từ một gốc rễ chung (giao cảm ưu thế + CRH/HPA), không phải hai vấn đề độc lập.
          </p>

          <CaseStage num="1" title="Nhận diện đúng gốc rễ trước khi điều trị từng triệu chứng riêng lẻ">
            <CaseBullet>Nếu cả trào ngược lẫn khó ngủ đều nặng hơn rõ rệt vào mùa deadline và nhẹ đi khi công việc thư thả, đây là tín hiệu mạnh cho thấy nguyên nhân nền là allostatic load / kích hoạt giao cảm, không phải hai bệnh lý tách biệt.</CaseBullet>
            <CaseBullet>Chỉ uống PPI hoặc chỉ uống melatonin mà bỏ qua gốc rễ này thường chỉ giảm nhẹ tạm thời — triệu chứng quay lại ngay khi hết thuốc hoặc vào đợt deadline kế tiếp.</CaseBullet>
          </CaseStage>

          <CaseStage num="2" title="Can thiệp 'trúng đích kép' — ưu tiên hàng đầu vì tác động cả 2 vấn đề cùng lúc">
            <CaseBullet><b style={{ color: C.ink }}>Thở cơ hoành 10–15 phút/ngày:</b> vừa tăng áp lực LES (giảm trào ngược) vừa kéo ANS về phó giao cảm (dễ ngủ hơn buổi tối).</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Cyclic sighing khi cảm nhận cơn stress cấp trong ngày:</b> cắt kích hoạt giao cảm trước khi nó tích lũy đến tối — giảm tải cho cả dạ dày lẫn giấc ngủ cùng lúc.</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Vận động đều đặn, ưu tiên yoga/khí công buổi chiều:</b> giảm cortisol nền, tác động gián tiếp lên cả hai vấn đề thay vì chỉ một.</CaseBullet>
          </CaseStage>

          <CaseStage num="3" title="Điều chỉnh đúng nguyên tắc từng chủ đề — không lấy biện pháp bên này 'chữa' bên kia">
            <CaseBullet><b style={{ color: C.ink }}>Trào ngược:</b> PPI đúng giờ trước ăn (nếu cần), nâng đầu giường 10–20cm, ăn tối cách giờ ngủ ≥2–3 giờ.</CaseBullet>
            <CaseBullet><b style={{ color: C.ink }}>Giấc ngủ:</b> ánh sáng tự nhiên buổi sáng, cắt caffeine trước 14h, kiểm soát kích thích (không nằm cố ngủ quá 15–20 phút).</CaseBullet>
            <CaseBullet>Lưu ý: melatonin không giúp trào ngược; PPI không giúp mất ngủ — nhầm lẫn công cụ giữa hai chủ đề là sai lầm thường gặp khi tự xử lý cả hai cùng lúc.</CaseBullet>
          </CaseStage>

          <CaseStage num="4" title="Khi nào cần chuyên môn y tế — không tự xử lý tiếp">
            <CaseBullet>Trào ngược không đáp ứng PPI đúng cách sau 8 tuần.</CaseBullet>
            <CaseBullet>Mất ngủ kéo dài trên 3 tháng, từ 3 đêm/tuần trở lên — đặc biệt nếu kèm ngáy to hoặc buồn ngủ ban ngày quá mức dù đã ngủ đủ giờ.</CaseBullet>
            <CaseBullet>Stress công việc đã ảnh hưởng rõ đến chức năng hàng ngày (tâm trạng, khả năng tập trung) kéo dài, không chỉ dừng ở trào ngược/mất ngủ.</CaseBullet>
            <MedicalNote
              items={[
                "Trào ngược kháng trị → hỏi bác sĩ tiêu hóa về đo pH-impedance, P-CAB, hoặc baclofen — không tự tăng liều/đổi thuốc PPI.",
                "Mất ngủ mạn tính → tìm chuyên gia CBT-I; nếu có ngáy to/buồn ngủ ngày quá mức, cần tầm soát ngưng thở khi ngủ (OSA) trước khi tiếp tục các biện pháp hành vi.",
                "Ảnh hưởng chức năng kéo dài → cân nhắc gặp chuyên gia tâm lý (GI-CBT hoặc đánh giá tổng thể), không chỉ tự áp dụng kỹ thuật thở tại nhà.",
                "Propranolol, thuốc ngủ nhóm DORA, hoặc bất kỳ thuốc nào khác chỉ dùng khi bác sĩ đã thăm khám, sàng lọc chống chỉ định và kê đơn cụ thể — không tự mua/tự dùng theo thông tin trong tài liệu này.",
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
              { topic: "Ngủ", text: "Bật chế độ lọc ánh sáng xanh tự động theo giờ hoàng hôn (Night Shift/Night Light) trên điện thoại và máy tính — cài một lần, không cần tự nhớ bật/tắt mỗi tối." },
              { topic: "Ngủ", text: "Đặt báo thức 'giờ cắt caffeine' cố định là 12h trưa (mốc tròn dễ nhớ hơn '14h') — mỗi lần chuông reo là dấu hiệu chuyển sang trà thảo mộc/nước lọc." },
              { topic: "Trào ngược", text: "Kê sẵn 2 cuốn sách dày hoặc hộp gỗ dưới 2 chân đầu giường ngay hôm nay — không cần chờ mua khối kê chuyên dụng, hiệu quả cơ học tương đương." },
              { topic: "Stress", text: "Đặt lịch nhắc lặp lại hàng tuần (không cần nhớ) để tự hỏi 1 câu: 'tuần này ngủ/ốm vặt/năng lượng thế nào?' — thay cho dashboard chi tiết cần ghi chép mỗi ngày." },
              { topic: "Stress", text: "Đặt 1 lịch cố định (calendar block) 'ra ngoài trời' vào khung giờ nắng nhẹ mỗi ngày (VD 16h) — không cần chờ 'cảm thấy cần' mới đi, vì lúc stress cao nhất lại là lúc dễ quên nhất." },
            ]}
          />

          <LazyGroup
            title="Gắn vào thói quen có sẵn — không tạo hoạt động mới"
            sub="habit stacking: móc vào việc đã làm tự động mỗi ngày"
            color={C.teal}
            items={[
              { topic: "Trào ngược", text: "Để hộp thuốc PPI cạnh ấm đun nước/bình pha cà phê buổi sáng — nhìn thấy thuốc đúng lúc chuẩn bị bữa sáng, không cần đặt báo thức riêng." },
              { topic: "Ngủ", text: "Đứng ở ban công/gần cửa sổ trong lúc uống ly cà phê/trà đầu tiên buổi sáng — không cần dành riêng '30-60 phút đi bộ ngoài trời', chỉ cần đổi vị trí uống cà phê." },
              { topic: "Stress", text: "Làm 1 chu kỳ cyclic sighing mỗi lần đứng dậy lấy nước hoặc mỗi lần mở ứng dụng chat công việc — gắn vào hành động đã lặp lại tự nhiên nhiều lần/ngày, không cần nhớ 'giờ tập thở'." },
              { topic: "Ngủ", text: "Để điện thoại sạc ở phòng khác, ngoài tầm với từ giường — biến 'không dùng điện thoại trước ngủ' từ quyết định ý chí mỗi tối thành một sự thật vật lý không cần chống lại cám dỗ." },
              { topic: "Stress", text: "Họp thoại/nghe điện thoại (không cần nhìn màn hình) thì đứng ra ban công/sân có nắng thay vì ngồi bàn — gộp 'phơi nắng' vào việc đã làm sẵn, không tốn thêm phút nào." },
              { topic: "Stress", text: "Ăn trưa xong, đi vòng quanh khu có cây xanh gần nhất 10 phút thay vì ngồi lướt điện thoại tại bàn — gộp vận động nhẹ + không gian xanh vào giờ nghỉ đã có sẵn, không cần xin thêm thời gian." },
            ]}
          />

          <LazyGroup
            title="Phiên bản tối thiểu — làm ít còn hơn không làm"
            sub="khi không đủ thời gian/năng lượng cho phiên bản đầy đủ"
            color={C.green}
            items={[
              { topic: "Stress", text: "Không có 25-30 phút vận động? 3 phút leo cầu thang bộ thay thang máy hoặc đứng dậy đi lại khi nghe điện thoại vẫn tốt hơn ngồi yên cả ngày — không cần 'đủ chuẩn' mới đáng làm." },
              { topic: "Trào ngược", text: "Không nhớ nổi nhật ký thực phẩm 2 tuần? Chỉ cần để ý 1 câu hỏi sau mỗi bữa ăn gây khó chịu: 'mình vừa ăn gì trong 2 giờ qua' — không cần ghi chép hình thức." },
              { topic: "Ngủ", text: "Không kiểm soát được giờ ngủ cố định cả tuần? Ưu tiên giữ GIỜ THỨC dậy cố định trước — đây là đòn bẩy mạnh hơn giờ đi ngủ và dễ giữ hơn vì không phụ thuộc cảm giác buồn ngủ tối hôm trước." },
              { topic: "Stress", text: "Không có 5 phút yên tĩnh để cyclic sighing? 1 hơi thở sâu-thở ra chậm duy nhất trước khi trả lời một email/tin nhắn gây stress vẫn có tác dụng tức thời, dù nhỏ hơn phiên bản đầy đủ." },
              { topic: "Stress", text: "Không có 15-20 phút viết expressive writing đúng chuẩn? Chỉ cần 3 gạch đầu dòng: 'gốc rễ stress là gì / phần nào kiểm soát được / phần nào không' — giữ được lợi ích cốt lõi (phân loại để hành động hoặc chấp nhận) mà không cần viết dài." },
            ]}
          />
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
          Ba điểm giao thoa quan trọng nhất
        </div>
        <p style={{ fontFamily: serif, color: C.ink, fontSize: 15, lineHeight: 1.7 }}>
          Ba chủ đề này không độc lập: <b>thở cơ hoành</b> tác động cả trào ngược lẫn stress; <b>vòng lặp cortisol–giấc ngủ</b> khuếch đại cả stress lẫn trào ngược (qua CRH/HPA); và <b>allostatic load</b> là nguyên nhân nền chung. Xử lý một chủ đề đơn lẻ mà bỏ qua hai chủ đề còn lại thường chỉ giảm triệu chứng tạm thời — đòn bẩy cao nhất nằm ở các mục tác động chồng lấn nhiều hệ cùng lúc.
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
          Cả khung này vô dụng nếu chỉ đọc mà không làm. Hiểu biết không làm dịu được cơn trào ngược hay giúp bạn ngủ — hành động mới làm được. Nghiên cứu về "ý định vs hành động" (intention–action gap) rất rõ: biết phải làm gì gần như không dự đoán được có làm hay không. Với người bận/hay quên/lười, quy tắc sống còn là: <b>làm phiên bản tệ nhất còn hơn không làm</b>.
        </p>
        <div className="mt-3 flex flex-col gap-1.5">
          <p style={{ fontFamily: mono, color: C.green, fontSize: 12.5, lineHeight: 1.5 }}>→ Trước khi đóng tab này, chọn đúng 1 mục "đòn bẩy cao" ở trên và làm ngay trong 2 phút tới.</p>
          <p style={{ fontFamily: mono, color: C.inkDim, fontSize: 12, lineHeight: 1.5 }}>Gợi ý dễ nhất: 1 hơi thở dài · ra chỗ có nắng · rót ly nước · bật 1 bài hát thích và hát theo.</p>
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
          <h1 style={{ fontFamily: serif, color: C.ink, fontSize: 32, lineHeight: 1.15 }}>Trào ngược · Stress · Giấc ngủ</h1>
          <p style={{ fontFamily: serif, color: C.inkDim, fontSize: 14.5, marginTop: 6 }}>
            Mỗi chủ đề con: Cơ chế → Nguyên nhân → Kết quả/hậu quả → Cách chữa → Góc nhìn chuyên gia. Cùng hệ thiết kế với Khung Sống Lành Mạnh — có thể merge vào đó sau nếu phù hợp.
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
            Ghi chú phương pháp luận: tổng hợp từ ACG Clinical Guideline 2022, các meta-analysis/RCT về PPI/P-CAB/baclofen, CBT-I/DORA/OSA, MBSR/HRV biofeedback/propranolol, vận động, cyclic sighing, và mô hình allostatic load/biopsychosocial. Mỗi tab bao gồm cả tầng điều trị hàng đầu lẫn tầng "khi điều trị chuẩn không đủ" (kháng trị, chẩn đoán phân biệt, dược lý thế hệ mới) — dành cho người muốn hiểu sâu hơn mức khuyến cáo phổ thông. Nội dung mang tính giáo dục, không thay thế tư vấn y tế/tâm lý chuyên môn cho tình trạng cá nhân — đặc biệt với dấu hiệu báo động (khó nuốt, sụt cân, xuất huyết) cần đi khám ngay, không tự điều trị.
          </p>
        </footer>
      </div>
    </div>
  );
}
