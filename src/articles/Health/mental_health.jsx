import { useState, useEffect } from "react";
import { getSubTabFromUrl, syncSubTabToUrl } from "../../utils/subTabUrl";
import { Flag, Compass, Layers, Wind, LifeBuoy, Activity, RefreshCw, ChevronDown, X } from "lucide-react";

/* ============================================================
   CẨM NANG SỨC KHỎE TINH THẦN BỀN VỮNG
   Cá nhân hóa — người trưởng thành bận rộn, dễ căng thẳng/overthinking
   7 tab: Mở đầu · Nguyên lý · Chọn công cụ · Thực hành ·
          Khủng hoảng & Phục hồi · Theo dõi & Thích ứng · Duy trì
   ============================================================ */

const C = {
  teal:   { bg: "#E1F5EE", soft: "#F0FAF6", border: "#1D9E75", text: "#085041", mid: "#0F6E56" },
  blue:   { bg: "#E6F1FB", soft: "#F2F8FD", border: "#378ADD", text: "#0C447C", mid: "#185FA5" },
  amber:  { bg: "#FAEEDA", soft: "#FDF8EF", border: "#EF9F27", text: "#633806", mid: "#854F0B" },
  coral:  { bg: "#FAECE7", soft: "#FDF6F3", border: "#D85A30", text: "#712B13", mid: "#993C1D" },
  purple: { bg: "#EEEDFE", soft: "#F7F6FE", border: "#7F77DD", text: "#3C3489", mid: "#534AB7" },
  rose:   { bg: "#FBEAF0", soft: "#FEF5F8", border: "#D14D7C", text: "#6B1D3C", mid: "#9E2F58" },
  ink:    { bg: "#EDEEF0", soft: "#F6F7F8", border: "#3D4351", text: "#1C2027", mid: "#3D4351" },
};

/* ---------- style primitives ---------- */
const card = {
  background: "var(--color-background-primary)",
  border: "0.5px solid var(--color-border-tertiary)",
  borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 12,
};
const thesis = {
  fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.6,
  borderLeft: "3px solid var(--color-text-primary)", paddingLeft: "1rem", margin: "0 0 1.5rem",
};
const h2 = { fontSize: 18, fontWeight: 600, color: "var(--color-text-primary)", margin: "2rem 0 0.25rem", lineHeight: 1.3 };
const sectionNum = { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-tertiary)", marginTop: "2rem" };
const sectionNumInline = { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-text-tertiary)", marginRight: 8 };
const prose = { fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.72, marginBottom: "0.75rem" };
const subHead = {
  fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
  color: "var(--color-text-tertiary)", margin: "1.5rem 0 0.75rem", paddingBottom: 5,
  borderBottom: "0.5px solid var(--color-border-tertiary)",
};

/* ---------- components ---------- */
function Box({ tone = C.teal, title, children, icon }) {
  return (
    <div style={{ background: tone.bg, borderLeft: `3px solid ${tone.border}`, borderRadius: 8, padding: "0.9rem 1.1rem", marginBottom: 12 }}>
      {title && <div style={{ fontSize: 12, fontWeight: 700, color: tone.text, marginBottom: 5 }}>{icon ? icon + " " : ""}{title}</div>}
      <div style={{ fontSize: 13, color: tone.mid, lineHeight: 1.68 }}>{children}</div>
    </div>
  );
}

/* Callout: strong emphasis pull-quote */
function Callout({ tone = C.ink, children, kicker }) {
  return (
    <div style={{ background: tone.soft, border: `1px solid ${tone.bg}`, borderLeft: `4px solid ${tone.border}`, borderRadius: 10, padding: "1rem 1.15rem", marginBottom: 14 }}>
      {kicker && <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: tone.mid, marginBottom: 6 }}>{kicker}</div>}
      <div style={{ fontSize: 15, fontWeight: 600, color: tone.text, lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

/* Lens xuyên suốt tài liệu: ý nghĩa cụ thể với người bận rộn, dễ căng thẳng/overthinking */
function BusyLens({ children, title = "Lăng kính người bận rộn" }) {
  return <Box tone={C.rose} title={title} icon="⊙">{children}</Box>;
}

function MistakeBox({ items }) {
  return (
    <div style={{ background: C.coral.bg, borderRadius: 10, padding: "0.95rem 1.15rem", marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.coral.text, marginBottom: 9 }}>✗ Lỗi thường gặp</div>
      {items.map((m, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: i === items.length - 1 ? 0 : 8 }}>
          <span style={{ color: C.coral.border, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}.</span>
          <div style={{ fontSize: 13, color: C.coral.mid, lineHeight: 1.55 }}>
            <strong style={{ color: C.coral.text }}>{m.wrong}</strong> {m.fix}
          </div>
        </div>
      ))}
    </div>
  );
}

function Remember({ items }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "1rem 1.15rem", margin: "14px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 9 }}>Điều cần nhớ</div>
      {items.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: i === items.length - 1 ? 0 : 7 }}>
          <span style={{ color: C.teal.border, fontSize: 14, flexShrink: 0, lineHeight: 1.5 }}>▸</span>
          <span style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.55 }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

function Li({ tone = C.teal, children }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 7 }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: tone.border, flexShrink: 0, marginTop: 7 }} />
      <span style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.62 }}>{children}</span>
    </div>
  );
}

function StepBlock({ title, time, tone = C.teal, items, note }) {
  return (
    <div style={{ ...card, borderLeft: `3px solid ${tone.border}`, marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>{title}</span>
        {time && <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 20, background: tone.bg, color: tone.text, flexShrink: 0 }}>{time}</span>}
      </div>
      {items.map((it, i) => <Li key={i} tone={tone}>{it}</Li>)}
      {note && <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 6, lineHeight: 1.55, fontStyle: "italic" }}>{note}</div>}
    </div>
  );
}

function Row({ label, value, sub, tone }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", padding: "7px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", gap: 12 }}>
      <span style={{ fontSize: 13, color: "var(--color-text-secondary)", flex: "0 0 auto", width: "38%", maxWidth: 220 }}>{label}</span>
      <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: (tone && tone.mid) || "var(--color-text-primary)" }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Stat({ value, label, tone = C.teal }) {
  return (
    <div style={{ background: tone.soft, border: `1px solid ${tone.bg}`, borderRadius: 10, padding: "0.85rem", textAlign: "center" }}>
      <div style={{ fontSize: 19, fontWeight: 700, color: tone.mid, lineHeight: 1.15 }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 4, lineHeight: 1.35 }}>{label}</div>
    </div>
  );
}

/* ============================================================
   NAVIGATION — 7 tabs
   ============================================================ */
const PARTS = [
  { id: 0, num: "0",  short: "Mở đầu",       accent: C.ink,    icon: Flag },
  { id: 1, num: "I",  short: "Nguyên lý",    accent: C.blue,   icon: Compass },
  { id: 2, num: "II", short: "Chọn công cụ", accent: C.teal,   icon: Layers },
  { id: 3, num: "III",short: "Thực hành",    accent: C.amber,  icon: Wind },
  { id: 4, num: "IV", short: "Khủng hoảng & Phục hồi", accent: C.purple, icon: LifeBuoy },
  { id: 5, num: "V",  short: "Theo dõi",     accent: C.coral,  icon: Activity },
  { id: 6, num: "VI", short: "Duy trì",      accent: C.rose,   icon: RefreshCw },
];

export default function App() {
  const [part, setPart] = useState(() => {
    const fromUrl = getSubTabFromUrl();
    const n = fromUrl != null ? parseInt(fromUrl, 10) : NaN;
    return !isNaN(n) && PARTS.some((p) => p.id === n) ? n : 0;
  });
  useEffect(() => { syncSubTabToUrl(part); }, [part]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const current = PARTS.find((p) => p.id === part);

  const goToPart = (id) => {
    setPart(id);
    requestAnimationFrame(() => requestAnimationFrame(() => window.__scrollArticleToTop?.()));
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "18px 14px 104px" }}>
      <style>{`
        .mh-mobile-trigger, .mh-mobile-backdrop, .mh-mobile-drawer { display: none; }
        @media (max-width: 767px) {
          .mh-desktop-nav { display: none !important; }
          .mh-mobile-trigger {
            display: flex; width: 100%; align-items: center; gap: 9px;
            position: sticky; top: 0; z-index: 20;
            background: #fff; border-bottom: 1px solid #eee;
            padding: 9px 0; margin-bottom: 14px; border-left: none; border-right: none; border-top: none;
            cursor: pointer; text-align: left;
          }
          .mh-mt-box {
            flex: 1; min-width: 0; display: flex; align-items: center; gap: 9px;
            border: 1px solid #eee; border-radius: 10px; padding: 8px 11px; background: var(--color-background-primary);
          }
          .mh-mt-icon-box {
            width: 26px; height: 26px; border-radius: 7px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .mh-mt-text { flex: 1; min-width: 0; }
          .mh-mt-label { font-size: 12px; font-weight: 700; color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .mh-mt-chev { color: var(--color-text-tertiary); flex-shrink: 0; transition: transform .2s ease; }
          .mh-mobile-trigger.open .mh-mt-chev { transform: rotate(180deg); }
          .mh-mobile-backdrop {
            display: block; position: fixed; inset: 0; background: rgba(35,31,26,.42);
            z-index: 198; opacity: 0; pointer-events: none; transition: opacity .2s ease;
          }
          .mh-mobile-backdrop.show { opacity: 1; pointer-events: auto; }
          .mh-mobile-drawer {
            display: block; position: fixed; top: 0; bottom: 0; left: 0; width: 82%; max-width: 300px;
            background: var(--color-background-primary); border-right: 1px solid #eee; z-index: 199; overflow-y: auto;
            transform: translateX(-100%); transition: transform .25s cubic-bezier(.32,.72,0,1);
          }
          .mh-mobile-drawer.show { transform: translateX(0); }
          .mh-md-head { padding: 14px; border-bottom: 1px solid #eee; display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
          .mh-md-t1 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-tertiary); }
          .mh-md-t2 { font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin-top: 3px; }
          .mh-md-close { width: 26px; height: 26px; border-radius: 7px; border: 1px solid #eee; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--color-text-tertiary); flex-shrink: 0; }
          .mh-md-item {
            width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 14px;
            background: transparent; border: none; border-left: 3px solid transparent; cursor: pointer; text-align: left;
          }
          .mh-md-item-label { font-size: 12.5px; font-weight: 700; }
        }
      `}</style>

      <nav className="mh-desktop-nav mobile-static" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2rem", position: "sticky", top: 0, zIndex: 10, background: "#fff", padding: "10px 0", borderBottom: "1px solid #eee" }}>
        {PARTS.map((p) => {
          const active = part === p.id;
          const Icon = p.icon;
          return (
            <button key={p.id} onClick={() => goToPart(p.id)} style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "11px 19px", borderRadius: 12, cursor: "pointer",
              fontSize: 14, fontWeight: 700,
              background: active ? p.accent.border : p.accent.soft,
              color: active ? "#fff" : p.accent.text,
              border: `1.5px solid ${active ? p.accent.border : p.accent.bg}`,
              boxShadow: active ? `0 2px 8px ${p.accent.bg}` : "none",
              transition: "all 0.15s",
            }}>
              <Icon size={14} color={active ? "#fff" : p.accent.text} />
              {p.short}
            </button>
          );
        })}
      </nav>

      <button className={"mh-mobile-trigger" + (mobileNavOpen ? " open" : "")} onClick={() => setMobileNavOpen((v) => !v)}>
        <div className="mh-mt-box">
          <div className="mh-mt-icon-box" style={{ background: current.accent.bg }}>
            {current.icon && <current.icon size={13} color={current.accent.border} />}
          </div>
          <div className="mh-mt-text">
            <div className="mh-mt-label">{current.num}. {current.short}</div>
          </div>
          <ChevronDown size={15} className="mh-mt-chev" />
        </div>
      </button>
      <div className={"mh-mobile-backdrop" + (mobileNavOpen ? " show" : "")} onClick={() => setMobileNavOpen(false)} />
      <div className={"mh-mobile-drawer" + (mobileNavOpen ? " show" : "")}>
        <div className="mh-md-head">
          <div>
            <div className="mh-md-t1">{PARTS.length} phần</div>
            <div className="mh-md-t2">Chọn mục để xem</div>
          </div>
          <button className="mh-md-close" onClick={() => setMobileNavOpen(false)} aria-label="Đóng"><X size={13} /></button>
        </div>
        <div>
          {PARTS.map((p) => {
            const active = part === p.id;
            const Icon = p.icon;
            return (
              <button key={p.id} className="mh-md-item" style={{ background: active ? `${p.accent.border}14` : "transparent", borderLeftColor: active ? p.accent.border : "transparent" }} onClick={() => { setMobileNavOpen(false); goToPart(p.id); }}>
                <Icon size={14} color={active ? p.accent.border : "var(--color-text-tertiary)"} />
                <span className="mh-md-item-label" style={{ color: active ? p.accent.border : "var(--color-text-primary)" }}>{p.num}. {p.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {part === 0 && <Part0 />}
      {part === 1 && <PartI />}
      {part === 2 && <PartII />}
      {part === 3 && <PartIII />}
      {part === 4 && <PartIV />}
      {part === 5 && <PartV />}
      {part === 6 && <PartVI />}

      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: "2rem", paddingTop: "1rem", borderTop: "0.5px solid var(--color-border-tertiary)" }}>
        <button onClick={() => goToPart(Math.max(0, part - 1))} disabled={part === 0} style={{
          fontSize: 12, fontWeight: 600, padding: "9px 14px", borderRadius: 10,
          color: part === 0 ? "var(--color-text-tertiary)" : "var(--color-text-secondary)",
          background: "var(--color-background-primary)",
          border: `0.5px solid ${part === 0 ? "transparent" : "var(--color-border-tertiary)"}`,
          cursor: part === 0 ? "default" : "pointer", visibility: part === 0 ? "hidden" : "visible",
        }}>
          ← {part > 0 ? `${PARTS[part - 1].num}. ${PARTS[part - 1].short}` : ""}
        </button>
        <button onClick={() => goToPart(Math.min(6, part + 1))} disabled={part === 6} style={{
          fontSize: 12, fontWeight: 600, padding: "9px 14px", borderRadius: 10,
          color: part === 6 ? "var(--color-text-tertiary)" : "var(--color-text-secondary)",
          background: "var(--color-background-primary)",
          border: `0.5px solid ${part === 6 ? "transparent" : "var(--color-border-tertiary)"}`,
          cursor: part === 6 ? "default" : "pointer", visibility: part === 6 ? "hidden" : "visible",
        }}>
          {part < 6 ? `${PARTS[part + 1].num}. ${PARTS[part + 1].short}` : ""} →
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   TAB 0 — MỞ ĐẦU
   ============================================================ */
function Part0() {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 6 }}>Cẩm nang cá nhân hóa</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 8px", lineHeight: 1.25 }}>Sức khỏe tinh thần bền vững</h1>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
        Dành cho người trưởng thành bận rộn — nhiều trách nhiệm, dễ căng thẳng mạn tính, hay overthinking, đôi khi mất kết nối với chính cảm xúc của mình. Tài liệu xây khung tư duy dựa trên khoa học thần kinh và tâm lý học lâm sàng để tự hiểu, tự điều hòa và duy trì sức khỏe tinh thần — không thay thế chẩn đoán hay điều trị chuyên khoa khi cần.
      </p>

      <div style={sectionNum}>MỞ ĐẦU</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Đọc phần này một lần, trước tất cả</h2>
      <p style={prose}>
        Tài liệu này có sáu phần nội dung. Nhưng tất cả đứng trên một luận điểm và một mệnh lệnh duy nhất. Nắm hai điều dưới đây, mọi phần sau sẽ có chỗ đứng trong một bức tranh lớn thay vì là những mảnh rời rạc.
      </p>

      <Callout tone={C.ink} kicker="Luận điểm trung tâm">
        Sức khỏe tinh thần bền vững không đến từ việc loại bỏ cảm xúc tiêu cực hay "luôn tích cực", mà từ ba năng lực có thể rèn luyện: điều hòa hệ thần kinh khi bị kích hoạt, phục hồi đủ sau căng thẳng, và duy trì kết nối — với chính mình và với người khác — qua nhiều năm. Kỹ thuật cụ thể có thể thay đổi tùy người; nguyên lý tải trọng tâm lý–điều hòa–kết nối là bất biến.
      </Callout>

      <Callout tone={C.coral} kicker="Mệnh lệnh — quan trọng hơn mọi lý thuyết bên dưới">
        Mọi kiến thức trong tài liệu này chỉ có giá trị khi được thực hành. Đọc về hít thở điều hòa không làm hệ thần kinh bình tĩnh hơn; chỉ hít thở mới làm được điều đó. Não bộ chỉ thay đổi mạch thần kinh khi một phản ứng được lặp lại nhiều lần — đó là bản chất của neuroplasticity. Hãy bắt đầu nhỏ, làm hôm nay, và giữ đều. Đó là toàn bộ bí quyết; phần còn lại chỉ là chi tiết.
      </Callout>

      <p style={prose}>
        Tôi sẽ nhắc lại mệnh lệnh này ở cuối mỗi phần dưới một hình thức khác nhau — không phải để lặp, mà vì nó là điều duy nhất thực sự quyết định kết quả. Bạn có thể quên phần lớn chi tiết kỹ thuật và vẫn ổn nếu giữ được vài thói quen điều hòa đều đặn. Điều ngược lại không đúng: thuộc lòng mọi khái niệm mà không thực hành thì gần như vô ích.
      </p>

      <div style={sectionNum}>BẢN ĐỒ TÀI LIỆU</div>
      <h2 style={h2}>Sáu phần, một dòng chảy</h2>
      <div style={card}>
        <Row label="I · Nguyên lý" value="Hiểu để tự điều hòa" sub="Tải trọng tâm lý, vùng điều hòa, ba trụ cột" tone={C.blue} />
        <Row label="II · Chọn công cụ" value="Lắp bộ công cụ cá nhân" sub="Bản đồ các phương pháp, đọc qua cùng lăng kính" tone={C.teal} />
        <Row label="III · Thực hành" value="Làm từng ngày đúng cách" sub="Thở, viết, tái cấu trúc suy nghĩ, kiến trúc một ngày" tone={C.amber} />
        <Row label="IV · Khủng hoảng & Phục hồi" value="Khi hệ thần kinh vượt ngưỡng" sub="Hoảng loạn, sang chấn, kiệt sức, khi nào cần chuyên gia" tone={C.purple} />
        <Row label="V · Theo dõi" value="Đọc tín hiệu, điều chỉnh, xử lý gián đoạn" sub="Tự theo dõi tâm trạng, dấu hiệu cảnh báo, chu kỳ sống" tone={C.coral} />
        <Row label="VI · Duy trì" value="Vì sao đây mới là phần quyết định" sub="Ý nghĩa sống, mối quan hệ, phòng tái phát" tone={C.rose} />
      </div>

      <BusyLens title="Một lưu ý xuyên suốt">
        Tài liệu này viết cho người bận rộn: ít thời gian, nhiều đầu việc, thường trì hoãn việc chăm sóc tinh thần đến khi "rảnh hơn" — thời điểm đó hiếm khi tới. Mỗi phần có một hộp "Lăng kính người bận rộn" như thế này, chỉ ra cách áp dụng thực tế trong quỹ thời gian eo hẹp. Các khuyến nghị ở đây là khung tham khảo chung dựa trên tâm lý học lâm sàng và khoa học thần kinh — không thay thế đánh giá của bác sĩ tâm thần hoặc chuyên gia tâm lý cho từng tình trạng cụ thể, đặc biệt khi có dấu hiệu trầm cảm, lo âu nặng, sang chấn, hoặc ý nghĩ tự hại (xem Phần IV).
      </BusyLens>

      <Remember items={[
        "Một luận điểm: điều hòa–phục hồi–kết nối quan trọng hơn việc cố loại bỏ mọi cảm xúc khó chịu.",
        "Một mệnh lệnh: lý thuyết vô giá trị nếu không thực hành. Bắt đầu nhỏ, làm ngay, giữ đều.",
        "Sáu phần là một dòng chảy: hiểu → chọn công cụ → thực hành → vượt khủng hoảng → theo dõi → duy trì.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB I — NGUYÊN LÝ NỀN TẢNG
   ============================================================ */
function PartI() {
  return (
    <div>
      <div style={sectionNum}>PHẦN I</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Nguyên lý nền tảng</h2>
      <div style={thesis}>Năm nguyên lý dưới đây đúng cho mọi kỹ thuật và mọi trường phái trị liệu. Hiểu chúng một lần, bạn tự đánh giá được bất kỳ lời khuyên tâm lý nào thay vì phụ thuộc công thức rời rạc.</div>

      <h2 style={h2}><span style={sectionNumInline}>1.1</span>Cảm xúc khó chịu không phải kẻ thù — nó là tín hiệu</h2>
      <p style={prose}>
        Khi gặp một tác nhân gây stress, cơ thể kích hoạt trục HPA (hạ đồi–tuyến yên–thượng thận): hạch hạnh nhân (amygdala) phát tín hiệu báo động, vùng dưới đồi ra lệnh, tuyến thượng thận tiết cortisol và adrenaline. Đây không phải lỗi hệ thống — đó là cơ chế sinh tồn hàng triệu năm tuổi, đang làm đúng việc của nó: chuẩn bị cơ thể hành động. Vấn đề không nằm ở việc phản ứng này xảy ra, mà ở việc nó xảy ra <em>quá thường xuyên, quá mạnh, hoặc không tắt được</em> sau khi mối đe dọa đã qua.
      </p>
      <Callout tone={C.blue} kicker="Quy luật cần thuộc lòng — Yerkes-Dodson">
        Hiệu suất và mức độ kích hoạt (arousal) có quan hệ hình chữ U ngược: quá thấp (buồn chán, trì trệ) hoặc quá cao (hoảng loạn, quá tải) đều làm hiệu suất giảm. Có một vùng kích hoạt vừa đủ — "eustress" — nơi bạn tỉnh táo, tập trung, hiệu quả nhất. Mục tiêu không phải triệt tiêu stress, mà giữ nó trong vùng có ích và biết cách hạ nhiệt khi vượt ngưỡng.
      </Callout>

      <h2 style={h2}><span style={sectionNumInline}>1.2</span>Tải trọng tâm lý: biến số quan trọng nhất</h2>
      <p style={prose}>
        Nhà thần kinh học Bruce McEwen gọi tổng "hao mòn" tích lũy trên cơ thể do stress mạn tính là <strong>allostatic load</strong> (tải trọng thích nghi). Mỗi lần trục HPA kích hoạt rồi tắt đúng lúc, cơ thể phục hồi không dấu vết. Nhưng khi stress lặp lại liên tục, không đủ thời gian tắt giữa các đợt, hoặc kéo dài mà không có lối thoát — cortisol duy trì ở mức cao mạn tính, gây hại thực sự: rối loạn giấc ngủ, suy giảm trí nhớ, viêm mạn tính, tăng nguy cơ trầm cảm và lo âu lâm sàng. Đây là lý do "chỉ cần nghĩ tích cực lên" không hiệu quả — vấn đề là sinh lý, không chỉ là thái độ.
      </p>
      <MistakeBox items={[
        { wrong: "Gánh nhiều stressor cùng lúc mà không có buổi 'tắt máy' nào trong ngày.", fix: "Chèn ít nhất một khoảng phục hồi thực sự (không màn hình, không đa nhiệm) mỗi ngày — xem Phần III." },
        { wrong: "Coi mọi căng thẳng là xấu và cố tránh hoàn toàn.", fix: "Eustress (deadline vừa sức, thử thách mới) thúc đẩy phát triển. Vấn đề là distress kéo dài không lối thoát." },
        { wrong: "Chờ đến khi kiệt sức mới hành động.", fix: "Tải trọng tâm lý tích lũy âm thầm — can thiệp sớm dễ hơn nhiều so với phục hồi sau burnout (Phần IV)." },
      ]} />

      <h2 style={h2}><span style={sectionNumInline}>1.3</span>Vùng điều hòa: không phải cứ bình tĩnh là tốt</h2>
      <p style={prose}>
        Nhà tâm thần học Dan Siegel gọi vùng mà một người có thể tư duy rõ ràng, cảm nhận cảm xúc mà không bị nhấn chìm, và ra quyết định tốt là <strong>window of tolerance</strong> (vùng chịu đựng/điều hòa). Hai phía ngoài vùng này đều là rối loạn điều hòa — chỉ khác hướng.
      </p>
      <div style={card}>
        <Row label="Kích hoạt quá mức" value="Hyperarousal" sub="Lo âu, hoảng loạn, giận dữ bộc phát, suy nghĩ đua nhanh" tone={C.coral} />
        <Row label="Vùng điều hòa" value="Window of Tolerance" sub="Tỉnh táo, hiện diện, xử lý cảm xúc mà không bị cuốn đi" tone={C.teal} />
        <Row label="Ức chế quá mức" value="Hypoarousal" sub="Tê liệt cảm xúc, mất kết nối, kiệt sức, đông cứng" tone={C.blue} />
      </div>
      <p style={prose}>
        Khung liên quan — <strong>lý thuyết đa phế vị (polyvagal theory)</strong> của Stephen Porges — mô tả một "thang" ba trạng thái hệ thần kinh tự chủ: <em>ventral vagal</em> (an toàn, kết nối xã hội, đây là nơi window of tolerance nằm), <em>sympathetic</em> (chiến-hoặc-chạy, hyperarousal), và <em>dorsal vagal</em> (đông cứng/sập nguồn khi mối đe dọa cảm thấy không thể thoát, hypoarousal). Nhận diện mình đang ở nấc nào là bước đầu tiên để chọn đúng công cụ điều hòa — kỹ thuật hạ nhiệt hyperarousal (thở chậm) khác hoàn toàn kỹ thuật kích hoạt lại từ hypoarousal (vận động, cảm giác cơ thể).
      </p>
      <Box tone={C.ink} title="Lưu ý về độ tin cậy khoa học" icon="⚠">
        Window of tolerance và polyvagal theory là hai khung khái niệm rất hữu ích trong thực hành lâm sàng — chúng cho một ngôn ngữ đơn giản để mô tả trải nghiệm mà nhiều người thấy đúng với bản thân. Nhưng về mặt học thuật, polyvagal theory đang gây tranh cãi thực sự: một bài phản biện năm 2025 (Grossman và cộng sự, ký tên bởi 38 nhà nghiên cứu) cho rằng một số cơ chế sinh lý cụ thể của lý thuyết (đặc biệt vai trò của "dorsal vagal" trong phản ứng đông cứng ở người) chưa có bằng chứng thần kinh học vững chắc; Porges đã phản hồi lại. Cách dùng an toàn: coi đây là ẩn dụ hữu ích để tự quan sát trạng thái bản thân, không coi là sự thật sinh lý đã được chứng minh tuyệt đối.
      </Box>
      <Box tone={C.amber} title="Vì sao 'chỉ cần bình tĩnh lại' thường không có tác dụng?" icon="?">
        Yêu cầu bằng lời nói tác động lên vỏ não trước trán (prefrontal cortex) — nhưng khi hyperarousal, chính vùng này đang bị "offline" tạm thời để nhường quyền cho hệ viền (limbic) phản ứng nhanh. Cần tác động qua đường cơ thể trước (thở, cảm giác, vận động) để đưa hệ thần kinh về vùng điều hòa, rồi tư duy bằng lời mới hoạt động trở lại hiệu quả. Đây là lý do các kỹ thuật ở Phần III luôn bắt đầu từ cơ thể, không bắt đầu từ "cố nghĩ khác đi".
      </Box>

      <h2 style={h2}><span style={sectionNumInline}>1.4</span>Ba trụ cột của sức khỏe tinh thần dài hạn</h2>
      <p style={prose}>Sức khỏe tinh thần đứng trên ba chân — bỏ chân nào cũng khập khiễng. Hai chân đầu được nói nhiều; chân thứ ba thường bị bỏ quên nhưng có sức nặng ngang bằng, đặc biệt với người sống một mình hoặc làm việc từ xa.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div style={{ ...card, marginBottom: 0, padding: "0.85rem" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.blue.text, marginBottom: 5 }}>Nhận thức</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>Cách diễn giải sự kiện quyết định cảm xúc theo sau — không phải sự kiện tự nó.</div>
        </div>
        <div style={{ ...card, marginBottom: 0, padding: "0.85rem" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.purple.text, marginBottom: 5 }}>Điều hòa cảm xúc</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>Khả năng trải nghiệm cảm xúc mạnh mà không bị nó điều khiển hành vi.</div>
        </div>
        <div style={{ ...card, marginBottom: 0, padding: "0.85rem" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.teal.text, marginBottom: 5 }}>Kết nối xã hội</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>Chất lượng quan hệ gắn bó — bộ đệm sinh học chống lại stress.</div>
        </div>
      </div>
      <Box tone={C.teal} title="Trụ cột thứ ba bị đánh giá thấp: kết nối xã hội">
        Meta-phân tích của Julianne Holt-Lunstad (2015, tổng hợp 70 nghiên cứu, hơn 3,4 triệu người) cho thấy cô đơn làm tăng nguy cơ tử vong sớm khoảng 26%, cô lập xã hội khách quan khoảng 29% — độ lớn tác động được chính nhóm nghiên cứu đối chiếu là <em>xấp xỉ</em> mức độ hại của hút khoảng 15 điếu thuốc/ngày (một phép so sánh độ lớn hiệu ứng giữa các nghiên cứu, không phải một thử nghiệm đối chứng trực tiếp so sánh hai yếu tố). Dù con số chính xác cần đọc thận trọng, kết luận chung khá vững: thiếu kết nối xã hội gây hại sinh học thực sự, không chỉ là cảm giác khó chịu. Nghiên cứu Harvard Study of Adult Development, theo dõi hai nhóm người hơn 80 năm, củng cố thêm: chất lượng các mối quan hệ gắn bó là yếu tố dự đoán mạnh cho hạnh phúc và sức khỏe ở tuổi già. Kết nối xã hội không phải "điều tốt nên có" — nó là một nhu cầu sinh học, ngang hàng giấc ngủ hay dinh dưỡng.
      </Box>

      <h2 style={h2}><span style={sectionNumInline}>1.5</span>Đào sâu: vòng lặp suy nghĩ–cảm xúc–hành vi và cách não thay đổi</h2>
      <p style={prose}>
        Trụ cột nhận thức xứng đáng được hiểu kỹ hơn, vì nó là đòn bẩy dễ can thiệp nhất trong ba trụ cột — bạn không kiểm soát trực tiếp được cảm xúc nảy sinh, nhưng có thể quan sát và can thiệp vào suy nghĩ tạo ra nó.
      </p>

      <div style={subHead}>Tam giác nhận thức (CBT) — nền tảng của phần lớn liệu pháp hiện đại</div>
      <p style={prose}>
        Aaron Beck, cha đẻ liệu pháp nhận thức-hành vi (CBT), quan sát rằng <strong>tình huống → suy nghĩ tự động → cảm xúc → hành vi</strong> là một vòng lặp khép kín, và suy nghĩ tự động (automatic thought) — thường diễn ra trong tích tắc, gần như vô thức — là mắt xích quyết định cảm xúc theo sau, không phải bản thân tình huống. Hai người gặp cùng một sự kiện (bị sếp phê bình) có thể có suy nghĩ tự động khác nhau ("mình vô dụng" vs "lần này mình làm chưa tốt, sửa được") và do đó cảm xúc khác hẳn nhau (xấu hổ tê liệt vs hơi khó chịu rồi tiếp tục). Can thiệp vào mắt xích suy nghĩ là đòn bẩy hiệu quả nhất vì nó nằm giữa chuỗi và có thể quan sát, chất vấn được.
      </p>

      <div style={subHead}>Méo mó nhận thức thường gặp (cognitive distortions)</div>
      <div style={card}>
        <Li tone={C.coral}><strong>Tư duy tất-cả-hoặc-không:</strong> "Nếu không hoàn hảo thì coi như thất bại hoàn toàn."</Li>
        <Li tone={C.coral}><strong>Thảm họa hóa (catastrophizing):</strong> nhảy thẳng đến kịch bản tồi tệ nhất từ một dấu hiệu nhỏ.</Li>
        <Li tone={C.coral}><strong>Đọc suy nghĩ người khác:</strong> tin chắc mình biết người khác nghĩ gì về mình mà không kiểm chứng.</Li>
        <Li tone={C.coral}><strong>Khái quát hóa quá mức:</strong> từ một lần thất bại suy ra "lúc nào mình cũng vậy."</Li>
        <Li tone={C.coral}><strong>Lọc bỏ tích cực:</strong> chỉ ghi nhận điều tiêu cực, gạt bỏ bằng chứng ngược lại.</Li>
      </div>
      <p style={prose}>
        Nhận diện được các mẫu hình này (không cần nhớ hết tên) là bước đầu của kỹ thuật <em>tái cấu trúc nhận thức</em> ở Phần III — không phải để "nghĩ tích cực giả tạo", mà để thay một suy nghĩ tự động méo mó bằng một suy nghĩ chính xác và cân bằng hơn.
      </p>

      <div style={subHead}>Nghiền ngẫm (rumination) khác phản tư (reflection)</div>
      <p style={prose}>
        Nhà tâm lý học Susan Nolen-Hoeksema phân biệt hai kiểu "nghĩ về vấn đề" trông giống nhau nhưng hiệu quả trái ngược. <strong>Rumination</strong> là lặp đi lặp lại câu hỏi "tại sao mình lại thế này" mà không tiến tới hành động — càng nghĩ càng tệ hơn, và là yếu tố nguy cơ mạnh cho trầm cảm. <strong>Reflection</strong> là suy ngẫm có định hướng giải quyết vấn đề: "chuyện gì đã xảy ra, mình học được gì, bước tiếp theo là gì". Dấu hiệu phân biệt đơn giản: sau 10–15 phút, bạn cảm thấy rõ ràng hơn hay mắc kẹt hơn? Nếu mắc kẹt, đó là rumination — cần một hành động ngắt mạch (Phần III), không phải nghĩ thêm.
      </p>
      <Box tone={C.purple} title="Liệu pháp siêu nhận thức — vấn đề không phải nội dung lo âu, mà là niềm tin về việc lo âu">
        Nhà tâm lý học Adrian Wells lập luận: điều duy trì rumination/lo âu mạn tính không phải nội dung suy nghĩ cụ thể, mà là những <strong>niềm tin siêu nhận thức (metacognitive beliefs)</strong> về chính hành vi suy nghĩ đó — ví dụ "mình phải lo mới kiểm soát được tình huống" (niềm tin tích cực về lo âu) hoặc "mình không tài nào dừng nghĩ được" (niềm tin tiêu cực về mất kiểm soát). Can thiệp hiệu quả nhắm vào các niềm tin này và vào "kiểm soát chú ý" (khả năng chủ động dời sự chú ý), không phải tranh luận với từng suy nghĩ như CBT truyền thống. Kỹ thuật thực dụng nhất từ trường phái này: <strong>worry time</strong> — hẹn cố định 15 phút/ngày để lo; khi ý nghĩ lo âu nổi lên ngoài khung giờ đó, ghi lại một dòng rồi hoãn nó tới "giờ lo", thay vì xử lý ngay.
      </Box>

      <div style={subHead}>Emotional granularity — vốn từ cảm xúc càng chính xác, điều hòa càng tốt</div>
      <p style={prose}>
        Nhà tâm lý học thần kinh Lisa Feldman Barrett lập luận (thuyết "constructed emotion") rằng não bộ không "nhận diện" một cảm xúc có sẵn, mà <em>kiến tạo</em> nó theo thời gian thực từ tín hiệu nội cảm thụ (interoception — nhịp tim, hơi thở, độ căng cơ...) kết hợp với khái niệm ngôn ngữ đã học được. Hệ quả thực dụng: người có <strong>emotional granularity</strong> cao — phân biệt tinh vi được "bực" khác "thất vọng" khác "quá tải" khác "tủi thân", thay vì gộp chung "thấy tệ" — có xu hướng điều hòa cảm xúc tốt hơn, vì mỗi từ chính xác gợi ý một hướng ứng phó khác nhau. Đây là điểm còn tranh luận học thuật thật sự (thuyết "cảm xúc cơ bản phổ quát" của Paul Ekman vẫn có nhiều người ủng hộ, đối lập với hướng kiến tạo của Feldman Barrett) — nhưng ở mức ứng dụng, việc mở rộng vốn từ cảm xúc và luyện chú ý cảm giác cơ thể (một bài <em>body scan</em> ngắn 2–3 phút) là kỹ năng có ích bất kể lý thuyết nền nào đúng hơn.
      </p>

      <div style={subHead}>Tái định giá vượt trội hơn kìm nén</div>
      <p style={prose}>
        Nghiên cứu của James Gross so sánh hai chiến lược điều hòa cảm xúc: <strong>kìm nén</strong> (che giấu biểu hiện cảm xúc ra ngoài) và <strong>tái định giá</strong> (cognitive reappraisal — chủ động diễn giải lại ý nghĩa của tình huống). Kìm nén tốn nguồn lực nhận thức, không làm giảm cảm xúc bên trong, và về lâu dài liên quan tới nhiều lo âu, ít hài lòng trong quan hệ hơn. Tái định giá làm giảm thực sự cường độ cảm xúc tiêu cực và ít tốn nguồn lực hơn. Đây là lý do "cứ chịu đựng, đừng thể hiện ra" là lời khuyên tệ — công cụ đúng là thay đổi cách diễn giải, không phải che giấu phản ứng.
      </p>
      <Callout tone={C.purple} kicker="Cơ chế nền — neuroplasticity">
        Não bộ không cố định. Mỗi lần một phản ứng (thở chậm khi lo âu, tái định giá thay vì thảm họa hóa) được lặp lại, mạch thần kinh tương ứng được củng cố — nguyên lý "neurons that fire together, wire together". Đây là lý do một kỹ thuật chỉ thực sự đổi cuộc sống sau vài tuần đến vài tháng lặp lại đều đặn, không phải sau một lần đọc hay một lần thử. Kiên nhẫn với chính mình trong giai đoạn này là một phần của kỹ năng, không phải dấu hiệu thất bại.
      </Callout>

      <BusyLens>
        Ba trụ cột trên không đòi hỏi "có thêm thời gian" — chúng đòi hỏi <em>tái phân bổ chú ý</em> trong quỹ thời gian hiện có. Một người bận rộn thường đã dùng hết năng lượng nhận thức cho công việc, khiến trụ cột kết nối xã hội bị cắt đầu tiên ("để sau, giờ không rảnh") — nhưng đó chính là trụ cột rẻ nhất để bảo trì (một tin nhắn, một cuộc gọi 10 phút) và có tác động lớn nhất lên khả năng phục hồi khi gặp stress công việc. Đầu tư nhỏ, đều vào cả ba trụ cột hiệu quả hơn nhiều so với dồn toàn bộ nỗ lực vào một trụ cột rồi bỏ bê hai trụ còn lại.
      </BusyLens>

      <Remember items={[
        "Cảm xúc khó chịu là tín hiệu, không phải lỗi hệ thống — mục tiêu là điều hòa, không phải triệt tiêu.",
        "Rối loạn điều hòa có hai hướng: hyperarousal (quá kích) và hypoarousal (tê liệt) — cần công cụ khác nhau cho mỗi hướng.",
        "Suy nghĩ tự động là đòn bẩy dễ can thiệp nhất trong vòng lặp suy nghĩ-cảm xúc-hành vi.",
        "Không phải nội dung lo âu mà niềm tin về việc lo âu ('phải lo mới an toàn') mới là thứ duy trì nó — đó là điều metacognitive therapy nhắm tới.",
        "Vốn từ cảm xúc càng chính xác (bực ≠ thất vọng ≠ quá tải), điều hòa càng dễ — đây là kỹ năng luyện được.",
        "Kết nối xã hội là nhu cầu sinh học, không phải tùy chọn — và là trụ cột rẻ nhất, hiệu quả nhất để đầu tư khi bận rộn.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB II — CHỌN CÔNG CỤ
   ============================================================ */
function PartII() {
  return (
    <div>
      <div style={sectionNum}>PHẦN II</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Chọn công cụ</h2>
      <div style={thesis}>Không có một phương pháp "tốt nhất" cho mọi người. Phần này lập bản đồ các công cụ chính, đọc qua cùng một lăng kính: dùng khi nào, mất bao lâu để thấy hiệu quả, bằng chứng khoa học ra sao — để bạn tự lắp một bộ công cụ cá nhân thay vì theo trào lưu.</div>

      <h2 style={h2}><span style={sectionNumInline}>2.1</span>Bản đồ chín công cụ chính</h2>
      <p style={prose}>
        Các công cụ dưới đây không loại trừ nhau — phần lớn người dùng ổn định phối hợp 2–4 công cụ tùy giai đoạn cuộc sống, giống như phối hợp nhiều môn vận động thay vì chỉ tập một môn.
      </p>
      <div style={card}>
        <Row label="CBT" value="Tái cấu trúc suy nghĩ" sub="Lo âu, trầm cảm nhẹ-vừa; bằng chứng mạnh nhất, có cấu trúc rõ" tone={C.blue} />
        <Row label="ACT" value="Chấp nhận & hành động theo giá trị" sub="Khi cố 'chống lại' cảm xúc không hiệu quả; phù hợp lo âu mạn" tone={C.teal} />
        <Row label="DBT skills" value="Chịu đựng đau khổ + điều hòa cảm xúc" sub="Cảm xúc cường độ cao, dễ bộc phát, khủng hoảng cấp" tone={C.coral} />
        <Row label="Chánh niệm / MBSR" value="Quan sát không phán xét" sub="Stress mạn tính, phòng ngừa tái phát trầm cảm" tone={C.amber} />
        <Row label="Trò chuyện trị liệu" value="Psychodynamic, IFS" sub="Khám phá gốc rễ, mẫu hình quan hệ lặp lại, sang chấn" tone={C.purple} />
        <Row label="Vận động" value="Liệu pháp không cần kê đơn" sub="Hiệu quả ngang thuốc với trầm cảm nhẹ-vừa (xem 2.3)" tone={C.rose} />
        <Row label="Kết nối xã hội" value="Social prescribing" sub="Bộ đệm sinh học chống stress — thường bị bỏ quên nhất" tone={C.teal} />
        <Row label="Sáng tạo & dòng chảy" value="Flow state" sub="Phục hồi năng lượng tâm lý qua hoạt động cuốn hút" tone={C.blue} />
        <Row label="Thuốc tâm thần" value="SSRI và nhóm liên quan" sub="Trầm cảm/lo âu vừa-nặng; cần bác sĩ kê đơn (xem Phần IV)" tone={C.ink} />
      </div>

      <h2 style={h2}><span style={sectionNumInline}>2.2</span>Ba trường phái "nói chuyện với suy nghĩ" — khác nhau ở đâu</h2>
      <p style={prose}>
        CBT, ACT và DBT hay bị gộp chung là "liệu pháp nhận thức", nhưng triết lý nền khác nhau rõ rệt — chọn nhầm khiến người dùng thất vọng dù công cụ không hề sai, chỉ sai chỗ.
      </p>
      <Box tone={C.blue} title="CBT — thay đổi nội dung suy nghĩ">
        Giả định: suy nghĩ méo mó gây cảm xúc tiêu cực; sửa suy nghĩ cho chính xác hơn thì cảm xúc cải thiện. Công cụ chủ lực: thought record, chất vấn bằng chứng, thử nghiệm hành vi. Phù hợp nhất khi có mẫu hình suy nghĩ méo mó rõ ràng (thảm họa hóa, đọc suy nghĩ người khác) và bạn có xu hướng phân tích logic tốt.
      </Box>
      <Box tone={C.teal} title="ACT — thay đổi quan hệ với suy nghĩ, không phải nội dung">
        Giả định của Steven Hayes: cố loại bỏ hoặc sửa mọi suy nghĩ khó chịu là một cuộc chiến không thắng được và gây kiệt sức thêm. Thay vào đó: học cách quan sát suy nghĩ như "sự kiện tinh thần đi qua" (cognitive defusion) thay vì sự thật tuyệt đối, chấp nhận cảm xúc khó chịu tồn tại, và vẫn hành động theo giá trị bản thân dù cảm xúc đó chưa biến mất. Phù hợp khi lo âu/suy nghĩ tiêu cực đã mạn tính, "chống lại" chỉ khiến nó bám dai hơn.
      </Box>
      <Box tone={C.coral} title="DBT skills — khi cảm xúc quá mạnh để suy nghĩ trước">
        Marsha Linehan phát triển DBT ban đầu cho người có cảm xúc cường độ rất cao, dễ bộc phát. Bốn nhóm kỹ năng: chánh niệm, chịu đựng đau khổ cấp tính (distress tolerance — cho khoảnh khắc khủng hoảng, xem TIPP ở Phần IV), điều hòa cảm xúc, hiệu quả giữa các cá nhân. Khác CBT/ACT ở chỗ tập trung vào <em>kỹ năng hành động ngay</em> khi cảm xúc đã ở cường độ áp đảo — lúc mà "suy nghĩ lại cho hợp lý" chưa khả thi.
      </Box>

      <Box tone={C.ink} title="Điều quan trọng hơn cả việc chọn đúng trường phái">
        Meta-phân tích của Bruce Wampold (295 nghiên cứu, hơn 30.000 bệnh nhân) cho thấy <strong>liên minh trị liệu</strong> — mức độ tin cậy và hợp tác giữa bạn và nhà trị liệu — dự đoán kết quả điều trị mạnh và ổn định ngang nhau ở mọi trường phái (CBT, phân tâm, trải nghiệm...), có hay không dùng cẩm nang trị liệu. Đây là bằng chứng cho quan điểm "common factors": phần lớn hiệu quả trị liệu đến từ các yếu tố chung (mối quan hệ, kỳ vọng, một khung giải thích hợp lý, một quy trình nhất quán) hơn là từ kỹ thuật đặc thù của từng trường phái. Hệ quả thực dụng: nếu cân nhắc tìm chuyên gia, việc chọn được người bạn cảm thấy <em>hợp và tin tưởng được</em> quan trọng không kém — thậm chí hơn — việc chọn đúng "trường phái nghe có vẻ khoa học nhất".
      </Box>

      <h2 style={h2}><span style={sectionNumInline}>2.3</span>Vận động như liệu pháp — bằng chứng đáng chú ý</h2>
      <p style={prose}>
        Network meta-analysis lớn của Noetel và cộng sự (BMJ, 2024 — tổng hợp 218 thử nghiệm ngẫu nhiên có đối chứng, 14.170 người tham gia) kết luận: một số hình thức vận động — đặc biệt đi bộ/chạy nhanh, yoga, và tập kháng lực — nên được xem là <strong>lựa chọn điều trị cốt lõi cho trầm cảm ngang hàng liệu pháp tâm lý và thuốc</strong>, không chỉ là "hỗ trợ thêm". Yoga và tập kháng lực còn được dung nạp tốt hơn (ít tác dụng phụ, ít bỏ giữa chừng) so với nhiều hướng điều trị khác trong cùng phân tích. Cơ chế đề xuất: tăng BDNF (yếu tố dưỡng thần kinh, thúc đẩy tạo neuron mới ở hồi hải mã), điều hòa cortisol, tăng endorphin, và với thể thao nhóm — cộng thêm hiệu ứng kết nối xã hội. Đây là lý do Movement Manual (tài liệu song hành) không chỉ nói về thể chất — vận động là một trong những công cụ tâm lý có bằng chứng mạnh nhất, chi phí thấp nhất.
      </p>

      <h2 style={h2}><span style={sectionNumInline}>2.4</span>Sáng tạo & trạng thái dòng chảy (flow)</h2>
      <p style={prose}>
        Nhà tâm lý học Mihaly Csikszentmihalyi mô tả <strong>flow</strong> là trạng thái hoàn toàn cuốn vào một hoạt động — thử thách vừa đủ với kỹ năng hiện có, mất cảm giác thời gian, tự phê phán tạm ngừng. Trạng thái này khác nghỉ ngơi thụ động (lướt điện thoại) ở chỗ nó thực sự phục hồi năng lượng tâm lý, không chỉ làm tê liệt tạm thời. Hoạt động tạo flow rất cá nhân — nấu ăn, vẽ, chơi nhạc cụ, làm vườn, viết, chơi thể thao kỹ thuật — điểm chung là đủ thử thách để đòi hỏi tập trung nhưng không đến mức gây lo âu.
      </p>

      <h2 style={h2}><span style={sectionNumInline}>2.5</span>Thuốc tâm thần — khung tư duy đúng</h2>
      <Box tone={C.ink} title="Thuốc không phải 'đường tắt' hay 'thất bại' — nó là một công cụ y khoa">
        Với trầm cảm/lo âu mức vừa đến nặng, thuốc (thường là nhóm SSRI/SNRI) điều chỉnh lại hệ dẫn truyền thần kinh (serotonin, norepinephrine) đã mất cân bằng đến mức liệu pháp tâm lý đơn thuần khó phát huy — giống việc bó bột một xương gãy trước khi tập vật lý trị liệu. Bằng chứng tốt nhất cho thấy <strong>kết hợp thuốc + liệu pháp tâm lý</strong> hiệu quả hơn dùng riêng lẻ một trong hai với các trường hợp vừa-nặng. Quyết định dùng thuốc, liều lượng và thời điểm ngưng cần bác sĩ tâm thần — không tự ý bắt đầu hoặc ngưng đột ngột (xem Phần IV về hội chứng ngưng thuốc).
      </Box>

      <MistakeBox items={[
        { wrong: "Chỉ đọc self-help, không bao giờ thực hành kỹ thuật nào.", fix: "Chọn một công cụ, thực hành 2 tuần trước khi đánh giá và chuyển sang công cụ khác." },
        { wrong: "Nghĩ liệu pháp tâm lý chỉ dành cho người 'bệnh nặng'.", fix: "Phần lớn người đi trị liệu không có rối loạn tâm thần — họ dùng nó như huấn luyện viên cho kỹ năng sống, tương tự PT cho thể chất." },
        { wrong: "Thử một công cụ 3 ngày rồi kết luận 'không hợp'.", fix: "Neuroplasticity cần vài tuần lặp lại đều đặn mới thấy hiệu quả rõ — xem 1.5." },
        { wrong: "Chỉ dựa vào một công cụ duy nhất cho mọi tình huống.", fix: "Phối hợp: nhận thức cho lo âu về công việc, kết nối xã hội cho cô đơn, vận động cho tâm trạng chung." },
      ]} />

      <Box tone={C.amber} title="Kỹ năng meta: nhận diện giả khoa học trong thị trường 'chữa lành'" icon="⚠">
        Thị trường chăm sóc tinh thần thu hút không ít tuyên bố phóng đại hoặc chưa kiểm chứng — từ "chấn thương tế bào cần giải phóng bằng liệu pháp X" đến các bài test tính cách được quảng cáo "khoa học" nhưng thiếu độ tin cậy đo lường. Bốn câu hỏi lọc nhanh, áp dụng được cho bất kỳ tuyên bố nào trong lĩnh vực này: Tuyên bố có được hội chuyên môn uy tín (WHO, APA, hội tâm lý/tâm thần quốc gia) công nhận không? Có thử nghiệm đối chứng ngẫu nhiên (RCT) hay chỉ có lời chứng thực cá nhân? Có giải thích MỘT cơ chế cho MỌI vấn đề không (dấu hiệu cảnh báo phổ biến)? Có bán kèm sản phẩm/khóa học đắt tiền ngay sau khi đưa ra "chẩn đoán" không? Một tuyên bố hợp lý có thể sai một vài câu hỏi trên (ví dụ ACT khi mới ra đời cũng ít RCT), nhưng sai cả bốn là tín hiệu rủi ro rất cao.
      </Box>

      <BusyLens>
        Với quỹ thời gian hạn hẹp, thứ tự ưu tiên hợp lý: (1) vận động — vì bạn có thể đã tập rồi, chỉ cần nhận ra nó cũng là công cụ tâm lý; (2) một kỹ thuật thở/chánh niệm 5 phút mỗi ngày — chi phí thời gian thấp nhất trong mọi công cụ; (3) một cuộc trò chuyện chất lượng mỗi tuần với người thân thiết — kết nối xã hội không cần nhiều nhưng cần đều; (4) cân nhắc trị liệu chuyên nghiệp nếu có ngân sách — không phải vì "bệnh nặng" mà vì một chuyên gia rút ngắn đáng kể thời gian tự mò mẫm.
      </BusyLens>

      <Remember items={[
        "Chín công cụ chính không loại trừ nhau — phối hợp 2-4 công cụ tùy giai đoạn cuộc sống là bình thường.",
        "CBT sửa nội dung suy nghĩ, ACT thay đổi quan hệ với suy nghĩ, DBT skills xử lý khoảnh khắc cảm xúc quá mạnh.",
        "Liên minh trị liệu (mối quan hệ với chuyên gia) dự đoán kết quả mạnh ngang các kỹ thuật đặc thù — chọn người hợp quan trọng như chọn đúng trường phái.",
        "Vận động là công cụ tâm lý có bằng chứng mạnh, chi phí thấp — không chỉ là chuyện thể chất.",
        "Thuốc tâm thần là công cụ y khoa hợp lệ cho ca vừa-nặng, quyết định bởi bác sĩ, không phải 'đường tắt' đáng xấu hổ.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB III — THỰC HÀNH HẰNG NGÀY
   ============================================================ */
function PartIII() {
  return (
    <div>
      <div style={sectionNum}>PHẦN III</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Thực hành hằng ngày</h2>
      <div style={thesis}>Đây là phần "làm", không phải "hiểu". Mỗi kỹ thuật dưới đây có nguồn gốc nghiên cứu cụ thể, cách làm cụ thể, và thời lượng thực tế cho người bận rộn — 2 đến 20 phút.</div>

      <h2 style={h2}><span style={sectionNumInline}>3.1</span>Thở — công cụ điều hòa nhanh nhất, không cần chuẩn bị</h2>
      <p style={prose}>
        Thở là công cụ duy nhất trong hệ thần kinh tự chủ mà bạn vừa kiểm soát được có ý thức, vừa tác động ngược trực tiếp lên trạng thái kích hoạt — không kỹ thuật nào khác có "cửa sau" này.
      </p>
      <StepBlock title="Thở dài sinh lý (physiological sigh)" time="< 1 phút" tone={C.teal} items={[
        "Hít vào bằng mũi đến gần đầy phổi, rồi hít thêm một hơi ngắn thứ hai để mở nốt các phế nang còn xẹp.",
        "Thở ra chậm, dài, hoàn toàn bằng miệng — dài gấp đôi thời gian hít vào.",
        "Lặp lại 1–3 chu kỳ.",
      ]} note="Nghiên cứu của nhóm Stanford (Balban và cộng sự, 2023) cho thấy kỹ thuật này giảm lo âu và cải thiện tâm trạng nhanh hơn thiền định chánh niệm khi thực hành ngắn mỗi ngày. Dùng ngay trước một tình huống căng thẳng (họp, thi, xung đột)." />
      <StepBlock title="Thở hộp (box breathing)" time="2–4 phút" tone={C.blue} items={[
        "Hít vào 4 giây → giữ 4 giây → thở ra 4 giây → giữ (phổi rỗng) 4 giây.",
        "Lặp lại 4–8 chu kỳ, có thể nhắm mắt.",
      ]} note="Kỹ thuật được lực lượng đặc nhiệm dùng để giữ bình tĩnh dưới áp lực cao — nhịp đều đặn giúp não bộ có 'điểm neo' để tập trung, cắt vòng lặp suy nghĩ lo lắng." />
      <StepBlock title="Thở 4-7-8" time="2–3 phút" tone={C.purple} items={[
        "Hít vào mũi 4 giây → giữ 7 giây → thở ra miệng (có tiếng vù) 8 giây.",
        "Lặp lại 4 chu kỳ. Không nên lạm dụng quá nhiều lần/ngày lúc mới tập vì có thể gây choáng nhẹ.",
      ]} note="Bác sĩ Andrew Weil phổ biến kỹ thuật này cho mất ngủ và lo âu trước khi ngủ — tỷ lệ hít-giữ-thở dài kích hoạt mạnh hệ phó giao cảm." />

      <h2 style={h2}><span style={sectionNumInline}>3.2</span>Viết — công cụ xử lý cảm xúc rẻ nhất</h2>
      <div style={subHead}>Thought record (CBT) — khi có một suy nghĩ ám ảnh</div>
      <div style={card}>
        <Li tone={C.blue}><strong>1. Tình huống:</strong> điều gì thực sự xảy ra (sự kiện khách quan, không diễn giải).</Li>
        <Li tone={C.blue}><strong>2. Suy nghĩ tự động:</strong> điều gì lóe lên trong đầu ngay lúc đó.</Li>
        <Li tone={C.blue}><strong>3. Cảm xúc & cường độ:</strong> gọi tên cảm xúc, cho điểm 0–10.</Li>
        <Li tone={C.blue}><strong>4. Bằng chứng ủng hộ / phản bác:</strong> liệt kê cả hai phía một cách trung thực.</Li>
        <Li tone={C.blue}><strong>5. Suy nghĩ cân bằng hơn:</strong> không phải "nghĩ tích cực giả tạo", mà chính xác hơn dựa trên bằng chứng ở bước 4.</Li>
      </div>
      <Box tone={C.amber} title="Viết biểu cảm (expressive writing) — giao thức Pennebaker">
        Nhà tâm lý học James Pennebaker phát hiện: viết liên tục 15–20 phút mỗi ngày, trong 4 ngày liên tiếp, về một điều khó khăn/sang chấn (viết cho chính mình, không cần chỉnh sửa ngữ pháp, không ai đọc) cải thiện đáng kể cả sức khỏe tâm lý lẫn một số chỉ số miễn dịch trong các nghiên cứu theo dõi sau đó. Cơ chế được cho là: đưa trải nghiệm hỗn loạn thành một câu chuyện có cấu trúc giúp não bộ "đóng gói" và xử lý nó, giảm gánh nặng nghiền ngẫm lặp lại vô định.
      </Box>
      <Box tone={C.rose} title="Nhật ký biết ơn — 3 điều mỗi tối" icon="✓">
        Nghiên cứu của Robert Emmons và Michael McCullough cho thấy ghi lại đều đặn 3 điều biết ơn (cụ thể, không lặp lại) cải thiện tâm trạng và chất lượng giấc ngủ sau vài tuần. Điểm quan trọng: cụ thể hóa "vì sao" điều đó đáng biết ơn có tác dụng mạnh hơn liệt kê chung chung — "bạn A nhắn hỏi thăm đúng lúc mình mệt" mạnh hơn "có bạn tốt".
      </Box>

      <h2 style={h2}><span style={sectionNumInline}>3.3</span>Cognitive defusion (ACT) — tạo khoảng cách với suy nghĩ</h2>
      <p style={prose}>
        Thay vì chất vấn suy nghĩ (CBT), kỹ thuật này thay đổi quan hệ với nó. Ví dụ đơn giản: thay vì nghĩ <em>"mình là kẻ thất bại"</em>, chèn thêm một lớp quan sát: <em>"mình đang có suy nghĩ rằng mình là kẻ thất bại"</em> — hoặc xa hơn: <em>"mình nhận thấy mình đang có suy nghĩ rằng..."</em>. Câu chữ giống nhau nhưng vị trí quan sát thay đổi hoàn toàn: từ "hòa tan trong suy nghĩ" sang "quan sát suy nghĩ như một sự kiện tinh thần đi qua" — nó xuất hiện, không nhất thiết là sự thật, và sẽ trôi qua.
      </p>

      <h2 style={h2}><span style={sectionNumInline}>3.4</span>Worry time — gom lo âu lan man vào một khung giờ</h2>
      <p style={prose}>
        Kỹ thuật từ liệu pháp siêu nhận thức (1.5): chọn một khung 15 phút cố định mỗi ngày (không sát giờ ngủ) làm "giờ lo". Cả ngày, khi một ý nghĩ lo âu nổi lên ngoài khung giờ đó, chỉ ghi lại một dòng ngắn ("lo về deadline dự án Y") rồi tự nhắc "để dành cho giờ lo" và quay lại việc đang làm. Đến giờ lo, đọc lại danh sách và thực sự dành thời gian nghĩ về từng mục. Hiệu quả không đến từ việc "không lo nữa" mà từ việc <em>giới hạn phạm vi</em> — phần lớn người thực hành nhận ra khi đến giờ lo, nhiều mục trong danh sách không còn thấy cấp bách như lúc mới ghi.
      </p>

      <h2 style={h2}><span style={sectionNumInline}>3.5</span>Grounding 5-4-3-2-1 — khi suy nghĩ đua quá nhanh</h2>
      <div style={card}>
        <Li tone={C.coral}><strong>5</strong> điều bạn nhìn thấy — gọi tên thành lời.</Li>
        <Li tone={C.coral}><strong>4</strong> điều bạn chạm được/cảm nhận qua da.</Li>
        <Li tone={C.coral}><strong>3</strong> âm thanh bạn nghe thấy.</Li>
        <Li tone={C.coral}><strong>2</strong> mùi bạn ngửi thấy.</Li>
        <Li tone={C.coral}><strong>1</strong> vị bạn nếm được (hoặc uống một ngụm nước).</Li>
      </div>
      <p style={prose}>Kỹ thuật này kéo sự chú ý từ vòng lặp suy nghĩ (thường về quá khứ/tương lai) về giác quan hiện tại — cách nhanh nhất để thoát rumination hoặc lo âu leo thang mà không cần phân tích gì thêm.</p>

      <h2 style={h2}><span style={sectionNumInline}>3.6</span>Làm rõ giá trị bản thân (values clarification — ACT)</h2>
      <p style={prose}>
        Khác mục tiêu (có thể đạt được rồi xong), giá trị là <em>hướng đi liên tục</em> — ví dụ "trở thành người cha/mẹ hiện diện" là giá trị, "đưa con đi chơi cuối tuần này" là hành động cụ thể theo giá trị đó. Bài tập đơn giản: viết ra 3–5 lĩnh vực quan trọng nhất (quan hệ, sức khỏe, công việc, sáng tạo, cộng đồng...), với mỗi lĩnh vực tự hỏi "mình muốn là kiểu người thế nào ở đây" thay vì "mình muốn đạt được gì". Khi lo âu/trì hoãn kéo dài, quay lại danh sách này để chọn một hành động nhỏ theo đúng giá trị — đây là cách ACT "hành động dù cảm xúc chưa sẵn sàng".
      </p>

      <h2 style={h2}><span style={sectionNumInline}>3.7</span>Kiến trúc một ngày cân bằng tinh thần</h2>
      <StepBlock title="Buổi sáng — đặt nền" time="5–10 phút" tone={C.blue} items={[
        "Tránh chạm điện thoại/email trong 10–15 phút đầu sau khi thức — tránh kích hoạt hệ thần kinh giao cảm ngay lập tức.",
        "1–2 chu kỳ thở dài sinh lý hoặc 5 phút chánh niệm ngắn.",
        "Một câu hỏi định hướng: 'hôm nay điều gì quan trọng nhất theo đúng giá trị của mình?'",
      ]} />
      <StepBlock title="Giữa ngày — ngắt mạch chủ động" time="3–5 phút, 1–2 lần" tone={C.amber} items={[
        "Một khoảng nghỉ thực sự tách khỏi màn hình — đi bộ ngắn, ra ngoài trời nếu có thể.",
        "Nếu nhận thấy đang rumination: grounding 5-4-3-2-1 hoặc thở hộp.",
        "Một tin nhắn/cuộc gọi ngắn kết nối với người thân thiết — không cần dài, cần đều.",
      ]} />
      <StepBlock title="Buổi tối — đóng lại & phục hồi" time="10–15 phút" tone={C.purple} items={[
        "Viết 3 điều biết ơn hoặc thought record nếu có điều còn vướng.",
        "Tránh màn hình sáng xanh và nội dung kích thích cảm xúc mạnh (tin tức, tranh cãi) 30–60 phút trước ngủ.",
        "Thở 4-7-8 nếu khó vào giấc — chi tiết về giấc ngủ và phục hồi sâu hơn thuộc Movement Manual, Phần IV.",
      ]} />

      <MistakeBox items={[
        { wrong: "Cố làm tất cả kỹ thuật trong tài liệu cùng lúc.", fix: "Chọn 1–2 kỹ thuật phù hợp nhất với vấn đề hiện tại, thực hành đều 2 tuần trước khi thêm." },
        { wrong: "Chỉ dùng kỹ thuật lúc khủng hoảng, bỏ hoàn toàn lúc ổn.", fix: "Thực hành đều đặn lúc bình thường xây 'cơ bắp' để dùng hiệu quả lúc cần — giống tập thể lực trước khi thi đấu." },
        { wrong: "Viết nhật ký biết ơn qua loa, liệt kê chung chung.", fix: "Cụ thể hóa 'vì sao' — đây là phần tạo hiệu quả thực sự, không phải số lượng dòng viết." },
      ]} />

      <Remember items={[
        "Thở là công cụ nhanh nhất — không cần chuẩn bị, tác động trong dưới 1 phút.",
        "Viết (thought record, expressive writing, biết ơn) xử lý cảm xúc hiệu quả và rẻ.",
        "Grounding kéo chú ý về hiện tại khi suy nghĩ đua quá nhanh; defusion tạo khoảng cách với suy nghĩ ám ảnh.",
        "Một ngày có cấu trúc — mở đầu, ngắt mạch giữa ngày, đóng lại buổi tối — quan trọng hơn một kỹ thuật hoàn hảo dùng một lần.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB IV — KHỦNG HOẢNG & PHỤC HỒI SÂU
   ============================================================ */
function PartIV() {
  return (
    <div>
      <div style={sectionNum}>PHẦN IV</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Khủng hoảng & phục hồi sâu</h2>
      <div style={thesis}>Phần này khác các phần trước — không phải để tối ưu, mà để nhận diện đúng lúc hệ thần kinh vượt ngưỡng tự điều hòa và cần can thiệp mạnh hơn hoặc chuyên môn y tế.</div>

      <Callout tone={C.coral} kicker="Đọc trước khi đọc tiếp">
        Nội dung dưới đây mang tính giáo dục, không phải công cụ chẩn đoán hay điều trị. Nếu bạn hoặc người quen đang có ý nghĩ tự hại, hãy tìm hỗ trợ ngay: gọi cấp cứu <strong>115</strong>, đường dây nóng Tư vấn & Hỗ trợ tâm lý – phòng chống tự tử <strong>1900 6233</strong> (theo công bố của ngành y tế; nếu số không phản hồi, tìm kiếm "đường dây nóng sức khỏe tâm thần" để có số cập nhật, vì các dịch vụ này đôi khi thay đổi), hoặc đến trực tiếp khoa cấp cứu/cơ sở tâm thần gần nhất (ví dụ Viện Sức khỏe Tâm thần – Bệnh viện Bạch Mai, Bệnh viện Tâm thần Trung ương 1/2, Bệnh viện Tâm thần TP.HCM). Không ở một mình — gọi ngay cho người thân tin cậy trong lúc chờ hỗ trợ.
      </Callout>

      <h2 style={h2}><span style={sectionNumInline}>4.1</span>Cơn hoảng loạn (panic attack) — xử lý ngay trong khoảnh khắc</h2>
      <p style={prose}>
        Panic attack là hyperarousal đột ngột và dữ dội: tim đập nhanh, khó thở, cảm giác sắp chết hoặc mất kiểm soát — thường đạt đỉnh trong 10 phút rồi tự giảm. Hiểu đúng bản chất sinh lý (không nguy hiểm tính mạng, dù cảm giác như vậy) đã giảm bớt một phần nỗi sợ.
      </p>
      <Box tone={C.coral} title="TIPP — kỹ năng DBT hạ nhiệt sinh lý nhanh nhất khi cảm xúc quá tải">
        <strong>T</strong>emperature: dội nước lạnh lên mặt hoặc cầm đá lạnh vài giây — kích hoạt phản xạ lặn (dive reflex), hạ nhịp tim nhanh chóng qua đường sinh lý, không cần "nghĩ đúng" gì cả. <strong>I</strong>ntense exercise: vận động mạnh ngắn (nhảy tại chỗ, chạy cầu thang) để tiêu hao adrenaline dư thừa. <strong>P</strong>aced breathing: thở ra dài hơn hít vào (như 4-7-8 ở Phần III). <strong>P</strong>aired muscle relaxation: gồng rồi thả lỏng từng nhóm cơ. Bốn kỹ năng này tác động trực tiếp lên sinh lý — dùng khi cảm xúc đã quá mạnh để bất kỳ kỹ thuật "nghĩ lại" nào có tác dụng.
      </Box>

      <h2 style={h2}><span style={sectionNumInline}>4.2</span>Sang chấn (trauma) — hiểu cơ chế, không tự điều trị</h2>
      <p style={prose}>
        Sang chấn thu hẹp đáng kể window of tolerance (1.3) — một kích thích nhỏ, trung tính với người khác, có thể đẩy hệ thần kinh của người có sang chấn vượt ngưỡng ngay lập tức (hypervigilance) hoặc gây đông cứng/mất kết nối (dissociation). Đây không phải "yếu đuối" hay "phóng đại" — là hệ quả sinh lý thực sự của việc hệ thần kinh học được rằng thế giới không an toàn ở một mức độ sâu hơn lý trí. Xử lý sang chấn hiệu quả cần chuyên gia được đào tạo (các phương pháp như EMDR, liệu pháp tập trung vào sang chấn) — tài liệu tự học không thay thế được, và tự đào sâu vào ký ức sang chấn một mình đôi khi gây tổn thương thêm thay vì chữa lành.
      </p>

      <h2 style={h2}><span style={sectionNumInline}>4.3</span>Kiệt sức (burnout) — không giống trầm cảm dù dễ nhầm</h2>
      <p style={prose}>
        Nhà tâm lý học Christina Maslach định nghĩa burnout qua ba chiều: <strong>kiệt sức cảm xúc</strong> (cạn năng lượng), <strong>hoài nghi/mất kết nối</strong> (dửng dưng, cynicism với công việc/người xung quanh), và <strong>giảm cảm nhận hiệu quả cá nhân</strong> (thấy mình làm gì cũng không đủ tốt). Khác trầm cảm lâm sàng ở chỗ burnout thường gắn chặt với một bối cảnh cụ thể (công việc) và có thể cải thiện đáng kể khi bối cảnh đó thay đổi — nhưng nếu để kéo dài, burnout là yếu tố nguy cơ dẫn tới trầm cảm thực sự. Dấu hiệu sớm dễ bỏ qua: mất hứng thú với việc từng yêu thích, cần nhiều thời gian hơn để hồi sức sau một ngày làm việc bình thường, cáu gắt bất thường với người thân.
      </p>
      <Box tone={C.amber} title="Vì sao cùng khối lượng công việc, người kiệt sức người không — mô hình JD-R">
        Mô hình Job Demands–Resources (Demerouti, Bakker) giải thích burnout không đơn thuần bằng "làm nhiều giờ", mà bằng tỷ lệ giữa <strong>đòi hỏi công việc</strong> (áp lực thời gian, đòi hỏi cảm xúc, xung đột) và <strong>nguồn lực công việc</strong> (quyền tự chủ, hỗ trợ từ đồng nghiệp/quản lý, phản hồi rõ ràng, cơ hội phát triển). Đòi hỏi cao dự đoán mạnh nhất chiều kiệt sức cảm xúc; nguồn lực thấp dự đoán mạnh nhất chiều hoài nghi/mất kết nối. Hệ quả thực dụng: hai người cùng số giờ làm việc có thể có nguy cơ burnout rất khác nhau tùy mức tự chủ và hỗ trợ họ có — nghĩa là giải pháp không chỉ là "làm ít lại" mà còn có thể là "tăng nguồn lực" (xin thêm quyền quyết định, chủ động tìm hỗ trợ, phản hồi rõ hơn từ quản lý).
      </Box>

      <h2 style={h2}><span style={sectionNumInline}>4.4</span>Khi nào cần chuyên gia — dấu hiệu không nên tự xử lý một mình</h2>
      <div style={card}>
        <Row label="Thời gian" value="Kéo dài trên 2 tuần" sub="Buồn/lo âu/mất hứng thú gần như mỗi ngày, phần lớn thời gian trong ngày" tone={C.coral} />
        <Row label="Chức năng" value="Ảnh hưởng công việc, quan hệ, tự chăm sóc" sub="Khó hoàn thành việc thường ngày, bỏ bê vệ sinh cá nhân, né tránh người khác" tone={C.coral} />
        <Row label="Cơ thể" value="Rối loạn giấc ngủ/ăn uống rõ rệt" sub="Mất ngủ hoặc ngủ quá nhiều, chán ăn hoặc ăn mất kiểm soát, kéo dài" tone={C.coral} />
        <Row label="Ý nghĩ tự hại" value="Bất kỳ mức độ nào — cần hỗ trợ ngay" sub="Không chờ 'đủ nghiêm trọng' mới tìm giúp đỡ" tone={C.ink} />
      </div>
      <p style={prose}>
        Hai công cụ sàng lọc phổ biến trong lâm sàng — PHQ-9 (trầm cảm) và GAD-7 (lo âu) — có thể tìm thấy công khai để tự đánh giá sơ bộ mức độ, nhưng đây là công cụ sàng lọc, không phải chẩn đoán. Điểm cao trên các thang này là lý do đủ để đặt lịch với chuyên gia, không phải để tự kết luận và tự "kê đơn" bằng thông tin trên mạng.
      </p>

      <BusyLens title="Rào cản văn hóa — và cách vượt qua">
        Ở Việt Nam, tìm hỗ trợ tâm lý còn mang định kiến — "yếu đuối", "vẽ chuyện", nỗi sợ ảnh hưởng thể diện gia đình. Cách nhìn hữu ích hơn: gặp chuyên gia tâm lý khi khó khăn tâm lý cũng hợp lý như gặp bác sĩ khi gãy xương — không ai coi bó bột là dấu hiệu yếu đuối. Với người quá bận để "có thời gian trị liệu", nhiều nền tảng hiện cung cấp tư vấn trực tuyến 30–50 phút, linh hoạt hơn phòng khám truyền thống — rào cản thời gian không còn lớn như trước.
      </BusyLens>

      <MistakeBox items={[
        { wrong: "Tự ý ngưng thuốc tâm thần đột ngột vì 'thấy đỡ rồi'.", fix: "Một số nhóm thuốc gây hội chứng ngưng thuốc (discontinuation syndrome) nếu dừng đột ngột — luôn giảm liều theo hướng dẫn bác sĩ." },
        { wrong: "Chờ đến khi 'đủ tệ' mới tìm chuyên gia.", fix: "Can thiệp sớm luôn dễ và nhanh hơn — đừng lấy 'người khác còn khổ hơn' làm lý do trì hoãn." },
        { wrong: "Cố tự phân tích sang chấn sâu một mình qua đọc sách/video.", fix: "Sang chấn cần được xử lý cùng chuyên gia được đào tạo — tự đào sâu một mình có thể phản tác dụng." },
      ]} />

      <Remember items={[
        "TIPP (nhiệt độ, vận động mạnh, thở nhịp, giãn cơ) là bộ công cụ nhanh nhất cho khoảnh khắc quá tải cấp tính.",
        "Burnout khác trầm cảm — gắn với bối cảnh cụ thể, nhưng có thể tiến triển thành trầm cảm nếu bỏ qua.",
        "Burnout phụ thuộc tỷ lệ đòi hỏi/nguồn lực công việc (JD-R), không chỉ số giờ làm — tăng nguồn lực đôi khi hiệu quả hơn giảm việc.",
        "Ý nghĩ tự hại ở bất kỳ mức độ nào là lý do đủ để tìm hỗ trợ ngay — không cần chờ 'đủ nghiêm trọng'.",
        "Tìm chuyên gia tâm lý hợp lý như gặp bác sĩ cho bất kỳ vấn đề sức khỏe nào khác — không phải dấu hiệu yếu đuối.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB V — THEO DÕI & THÍCH ỨNG
   ============================================================ */
function PartV() {
  return (
    <div>
      <div style={sectionNum}>PHẦN V</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Theo dõi & thích ứng</h2>
      <div style={thesis}>Sức khỏe tinh thần không tuyến tính — nó dao động theo tuần, mùa, chu kỳ nội tiết và biến cố cuộc sống. Phần này là công cụ đọc tín hiệu sớm, thay vì chỉ phản ứng khi đã quá tải.</div>

      <h2 style={h2}><span style={sectionNumInline}>5.1</span>Tự theo dõi tâm trạng — đơn giản hơn cần thiết</h2>
      <p style={prose}>
        Không cần ứng dụng phức tạp. Một thang điểm 1–10 ghi mỗi tối (kèm 1 dòng ghi chú ngắn: điều gì ảnh hưởng nhiều nhất hôm đó) đã đủ để sau 2–3 tuần nhìn ra mẫu hình — ngày nào trong tuần thường tệ hơn, hoạt động nào kéo điểm lên/xuống rõ rệt, giấc ngủ đêm trước ảnh hưởng thế nào đến hôm sau. Mẫu hình quan trọng hơn từng điểm số riêng lẻ.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        <Stat value="1–3" label="Vùng cần chú ý — cân nhắc công cụ Phần III/IV" tone={C.coral} />
        <Stat value="4–6" label="Vùng dao động bình thường — theo dõi tiếp" tone={C.amber} />
        <Stat value="7–10" label="Vùng ổn định — ghi lại điều đang làm đúng" tone={C.teal} />
      </div>

      <h2 style={h2}><span style={sectionNumInline}>5.2</span>Thang leo thang cảnh báo</h2>
      <div style={card}>
        <Row label="Mức 1" value="Mệt mỏi nhẹ, dễ cáu" sub="Ngủ đủ hơn, giảm cam kết không thiết yếu vài ngày" tone={C.teal} />
        <Row label="Mức 2" value="Mất hứng thú, né tránh xã giao" sub="Chủ động dùng công cụ Phần III đều đặn, không chờ 'khỏe hơn rồi mới làm'" tone={C.amber} />
        <Row label="Mức 3" value="Ảnh hưởng rõ công việc/quan hệ" sub="Đặt lịch với chuyên gia — đừng tự xử lý thêm một mình" tone={C.coral} />
        <Row label="Mức 4" value="Ý nghĩ tự hại ở bất kỳ hình thức nào" sub="Hỗ trợ khẩn cấp ngay — xem Phần IV" tone={C.ink} />
      </div>
      <p style={prose}>Giá trị của thang này không nằm ở việc gọi tên chính xác mức mấy, mà ở việc <em>can thiệp sớm hơn một bậc</em> so với phản xạ tự nhiên là chờ đến khi không chịu nổi mới hành động.</p>

      <h2 style={h2}><span style={sectionNumInline}>5.3</span>Thích ứng theo chu kỳ sống</h2>
      <div style={subHead}>Chu kỳ nội tiết</div>
      <p style={prose}>
        Với người có chu kỳ kinh nguyệt, giai đoạn hoàng thể (khoảng 1–2 tuần trước kỳ kinh) đi kèm sụt giảm estrogen/progesterone có thể làm trầm trọng thêm lo âu, cáu gắt, mất ngủ — với một số người đạt mức PMDD (rối loạn khó chịu tiền kinh nguyệt) cần can thiệp y tế riêng. Theo dõi tâm trạng theo ngày trong chu kỳ (không chỉ theo tuần) giúp phân biệt "đây là dao động nội tiết dự đoán được" với "đây là vấn đề mới cần chú ý" — bản thân sự phân biệt này đã giảm bớt lo lắng.
      </p>
      <div style={subHead}>Chu kỳ mùa</div>
      <p style={prose}>
        Rối loạn cảm xúc theo mùa (SAD — seasonal affective disorder), liên quan giảm ánh sáng ban ngày, ảnh hưởng nhịp sinh học và serotonin. Với vùng có mùa đông thiếu nắng rõ rệt, tiếp xúc ánh sáng mạnh vào buổi sáng là can thiệp có bằng chứng tốt; với khí hậu nhiệt đới ít thay đổi theo mùa như phần lớn Việt Nam, yếu tố này ít nổi bật hơn nhưng đáng lưu ý với người làm việc trong nhà, ít ra ngoài trời ban ngày.
      </p>
      <div style={subHead}>Chuyển tiếp lớn trong đời</div>
      <p style={prose}>
        Kết hôn, sinh con, đổi việc, mất người thân, chuyển nơi ở — dù tích cực hay tiêu cực, mọi thay đổi lớn đều là stressor thực sự đòi hỏi tái phân bổ nguồn lực tâm lý. Kỳ vọng thực tế: giảm bớt (không cắt bỏ hoàn toàn) các thói quen chăm sóc tinh thần trong giai đoạn chuyển tiếp là hợp lý, miễn là quay lại đầy đủ khi ổn định — vấn đề chỉ nảy sinh khi việc "tạm giảm" trở thành "bỏ hẳn vĩnh viễn".
      </p>

      <h2 style={h2}><span style={sectionNumInline}>5.4</span>Khi cuộc sống phá kế hoạch chăm sóc tinh thần</h2>
      <MistakeBox items={[
        { wrong: "Bỏ lỡ vài ngày thực hành rồi bỏ luôn cả hệ thống vì thấy 'thất bại'.", fix: "Quay lại ở quy mô nhỏ nhất có thể (1 chu kỳ thở) ngay hôm sau — nhất quán quan trọng hơn hoàn hảo." },
        { wrong: "Đợi có '30 phút yên tĩnh hoàn hảo' mới bắt đầu lại.", fix: "Điều kiện lý tưởng hiếm khi xuất hiện — bản thân công cụ Phần III được thiết kế để dùng được trong khoảng hở 2-5 phút." },
        { wrong: "Coi giai đoạn khủng hoảng là lý do để không tìm hỗ trợ chuyên gia ('đang bận, để sau').", fix: "Giai đoạn khủng hoảng chính là lúc hỗ trợ chuyên gia có giá trị nhất, không phải lúc để hoãn lại." },
      ]} />

      <BusyLens>
        Với người bận rộn, việc theo dõi tinh vi thường phản tác dụng — thêm một việc phải làm, thêm một nguồn tự phê phán khi "quên ghi". Một dòng ghi chú buổi tối, dưới một phút, đủ tốt hơn nhiều so với hệ thống phức tạp bị bỏ dở sau một tuần.
      </BusyLens>

      <Remember items={[
        "Mẫu hình theo thời gian quan trọng hơn từng điểm tâm trạng riêng lẻ.",
        "Can thiệp sớm hơn một bậc trên thang leo thang — đừng chờ đến khi không chịu nổi.",
        "Chu kỳ nội tiết và mùa là yếu tố sinh lý thực sự ảnh hưởng tâm trạng, không phải 'cái cớ'.",
        "Giai đoạn khủng hoảng không phải lý do hoãn tìm hỗ trợ — đó chính là lúc cần nó nhất.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB VI — DUY TRÌ
   ============================================================ */
function PartVI() {
  return (
    <div>
      <div style={sectionNum}>PHẦN VI</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Duy trì</h2>
      <div style={thesis}>Kỹ thuật tốt nhất là kỹ thuật bạn còn dùng sau 10 năm. Câu hỏi quyết định không phải "công cụ nào mạnh nhất" mà "làm sao xây được một đời sống nội tâm đáng sống, bền vững" — đây là nơi khoa học ý nghĩa sống, mối quan hệ và hành vi học gặp nhau.</div>

      <h2 style={h2}><span style={sectionNumInline}>6.1</span>Ý nghĩa sống — trụ đỡ vượt qua nghịch cảnh</h2>
      <p style={prose}>
        Bác sĩ tâm thần Viktor Frankl, sau trải nghiệm trại tập trung, quan sát rằng người tìm được <em>ý nghĩa</em> trong hoàn cảnh khắc nghiệt nhất có khả năng chịu đựng cao hơn hẳn — không phải vì hoàn cảnh nhẹ hơn, mà vì có một "lý do để tiếp tục". Ông gọi đây là "will to meaning" — nhu cầu tìm ý nghĩa quan trọng ngang nhu cầu tìm khoái lạc hay quyền lực. Ý nghĩa không cần lớn lao (thay đổi thế giới) — có thể đến từ công việc được làm tốt, một mối quan hệ được chăm sóc, hoặc thái độ chọn lựa trước một hoàn cảnh không thể thay đổi.
      </p>
      <p style={prose}>
        Martin Seligman hệ thống hóa năm yếu tố của đời sống viên mãn trong mô hình <strong>PERMA</strong>: cảm xúc tích cực (Positive emotion), gắn kết/dòng chảy (Engagement), quan hệ (Relationships), ý nghĩa (Meaning), thành tựu (Accomplishment). Điểm quan trọng: cả năm yếu tố cần được nuôi dưỡng riêng biệt — thành tựu cao (sự nghiệp tốt) không tự động mang lại ý nghĩa hay quan hệ tốt; chúng là các trục độc lập, đầu tư lệch một trục kéo dài dễ dẫn đến cảm giác "trống rỗng dù mọi thứ đang ổn" quen thuộc ở người thành công nhưng cô đơn.
      </p>

      <h2 style={h2}><span style={sectionNumInline}>6.2</span>Mối quan hệ — khoản đầu tư sinh lời nhất</h2>
      <p style={prose}>
        Quay lại phát hiện then chốt ở 1.4: Harvard Study of Adult Development, nghiên cứu dọc dài nhất về hạnh phúc con người, kết luận sau hơn 80 năm theo dõi hai nhóm người rằng chất lượng (không phải số lượng) các mối quan hệ gắn bó dự đoán mạnh nhất cho sức khỏe thể chất và tinh thần ở tuổi già. "Chất lượng" ở đây nghĩa là mức độ tin cậy, có thể dựa vào nhau lúc khó khăn — không phải số bạn trên mạng xã hội hay tần suất gặp gỡ hời hợt.
      </p>
      <Box tone={C.teal} title="Duy trì quan hệ khi bận rộn — không cần nhiều thời gian, cần đều">
        Nghiên cứu về duy trì tình bạn cho thấy tần suất tiếp xúc (dù ngắn) quan trọng hơn độ dài mỗi lần gặp trong việc giữ cảm giác gắn kết. Một tin nhắn hỏi thăm 30 giây, đều đặn, có tác dụng bảo trì quan hệ tốt hơn một buổi gặp dài nhưng cách nhau sáu tháng. Với người bận rộn: chủ động lên lịch cố định (cà phê hàng tuần, gọi video hàng tháng với gia đình xa) loại bỏ rào cản "chờ có thời gian rảnh mới liên lạc" — thời điểm đó hiếm khi tự đến.
      </Box>

      <h2 style={h2}><span style={sectionNumInline}>6.3</span>Tự trắc ẩn (self-compassion) — thay thế lành mạnh cho tự phê phán</h2>
      <p style={prose}>
        Nhà nghiên cứu Kristin Neff định nghĩa self-compassion qua ba thành phần: <strong>tử tế với bản thân</strong> (thay vì tự phê phán khắc nghiệt khi thất bại), <strong>nhận ra tính phổ quát của con người</strong> (khó khăn/sai lầm là một phần trải nghiệm chung, không phải riêng mình kém cỏi), và <strong>chánh niệm</strong> (quan sát cảm xúc khó chịu mà không thổi phồng hay chối bỏ). Thí nghiệm của Juliana Breines và Serena Chen (2012, Đại học Berkeley) cho thấy một phát hiện phản trực giác: sau khi được hướng dẫn viết với giọng tự trắc ẩn về một thất bại/điểm yếu (so với viết trung lập hoặc tự nâng cao lòng tự trọng), người tham gia dành nhiều thời gian ôn bài hơn cho một bài kiểm tra khó sau đó và báo cáo động lực sửa đổi cao hơn — ngược với lo ngại phổ biến rằng "dễ dãi với bản thân sẽ làm mất động lực". Đây là một phát hiện đáng chú ý nhưng đến từ vài thí nghiệm quy mô vừa-nhỏ, nên nên hiểu là một hướng có cơ sở tốt hơn là quy luật tuyệt đối.
      </p>

      <h2 style={h2}><span style={sectionNumInline}>6.4</span>Phòng tái phát — giữ được điều đã xây</h2>
      <div style={card}>
        <Li tone={C.blue}><strong>Nhận diện tín hiệu cá nhân sớm:</strong> mỗi người có một "chuỗi cảnh báo" riêng lặp lại trước một đợt khó khăn — ghi lại từ Phần V để nhận ra sớm hơn ở lần sau.</Li>
        <Li tone={C.amber}><strong>Giữ công cụ nền dù đang ổn:</strong> ngừng hoàn toàn khi "thấy khỏe rồi" là nguyên nhân tái phát phổ biến nhất — duy trì ở cường độ thấp thay vì dừng hẳn.</Li>
        <Li tone={C.teal}><strong>Không cô lập khi khó khăn quay lại:</strong> xu hướng tự nhiên khi tệ đi là rút lui khỏi kết nối xã hội — đúng lúc cần nó nhất lại là lúc dễ bỏ nhất.</Li>
        <Li tone={C.purple}><strong>Coi mỗi đợt khó khăn là dữ liệu, không phải thất bại:</strong> post-traumatic growth (Tedeschi & Calhoun) cho thấy nhiều người vượt qua nghịch cảnh lớn báo cáo phát triển tâm lý thực sự sau đó — không phủ nhận đau khổ, nhưng đau khổ không phải điểm kết.</Li>
      </div>

      <h2 style={h2}><span style={sectionNumInline}>6.5</span>Tinh thần & thân thể — một hệ thống, không phải hai mảng tách rời</h2>
      <p style={prose}>
        Tài liệu này khép lại vòng tròn mở ra từ Phần I: giấc ngủ kém làm giảm khả năng điều hòa cảm xúc ngày hôm sau (hạch hạnh nhân phản ứng mạnh hơn ~60% với kích thích tiêu cực khi thiếu ngủ theo các nghiên cứu hình ảnh não); vận động đều đặn là một trong những công cụ chống trầm cảm có bằng chứng mạnh nhất (2.3); dinh dưỡng ảnh hưởng trực tiếp đến hệ vi sinh đường ruột, vốn giao tiếp hai chiều với não qua trục ruột-não. Vận động–giấc ngủ–dinh dưỡng–tinh thần là một hệ thống duy nhất; "tách rời tâm lý ra khỏi cơ thể" là một sự giản lược sai lầm, dù tiện lợi. Đọc tài liệu này cùng Movement Manual và Nutrition không phải trùng lặp — đó chính là cách nhìn đúng.
      </p>

      <Callout tone={C.coral} kicker="Mệnh lệnh cuối cùng — nhắc lại lần nữa">
        Không kỹ thuật nào trong sáu phần trên có tác dụng nếu chỉ nằm trên trang giấy. Chọn một công cụ nhỏ nhất có thể bắt đầu hôm nay — một chu kỳ thở dài sinh lý trước khi đọc tiếp trang khác, một tin nhắn hỏi thăm người bạn lâu không liên lạc. Sức khỏe tinh thần bền vững không phải đích đến một lần đạt được rồi thôi — nó là một tập hợp thói quen nhỏ, lặp lại, được bảo trì suốt đời.
      </Callout>

      <Remember items={[
        "Ý nghĩa sống là trụ đỡ khi mọi công cụ khác chưa đủ — không cần lớn lao, cần thật.",
        "Mối quan hệ chất lượng là khoản đầu tư sinh lời nhất cho sức khỏe tinh thần dài hạn, và cần được duy trì đều đặn dù nhỏ.",
        "Tự trắc ẩn — không phải tự phê phán hay tự dễ dãi — là nền tảng cho khả năng phục hồi thực sự.",
        "Vận động, giấc ngủ, dinh dưỡng và tinh thần là một hệ thống — chăm một phần mà bỏ các phần khác không bền vững.",
      ]} />
    </div>
  );
}
