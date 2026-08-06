import { useState, useEffect } from "react";
import { getSubTabFromUrl, syncSubTabToUrl } from "../../utils/subTabUrl";
import { Coffee, GlassWater, Bean, Brain, Thermometer, Shuffle, Apple, ChevronDown, X } from "lucide-react";

/* ============================================================
   DINH DƯỠNG THÔNG MINH CHO NGƯỜI BẬN RỘN
   Thực đơn cá nhân duy trì >5 năm — 1 phút mỗi sáng, đủ đường-đạm-béo,
   hạn chế tối đa hoá chất, tối ưu cho công việc cường độ cao/dễ stress
   7 tab: Mở đầu · Thực đơn ngày · Cacao chuyên sâu · Đường & Não bộ ·
          Nhiệt-Ánh sáng-Oxy hoá · Kết hợp thực phẩm · Snack bổ trợ
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

function Callout({ tone = C.ink, children, kicker }) {
  return (
    <div style={{ background: tone.soft, border: `1px solid ${tone.bg}`, borderLeft: `4px solid ${tone.border}`, borderRadius: 10, padding: "1rem 1.15rem", marginBottom: 14 }}>
      {kicker && <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: tone.mid, marginBottom: 6 }}>{kicker}</div>}
      <div style={{ fontSize: 15, fontWeight: 600, color: tone.text, lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

function CautionBox({ title = "Lưu ý khi kết hợp", items }) {
  return (
    <div style={{ background: C.coral.bg, borderRadius: 10, padding: "0.95rem 1.15rem", marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.coral.text, marginBottom: 9 }}>⚠ {title}</div>
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

function Remember({ items, title = "Điều cần nhớ" }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "1rem 1.15rem", margin: "14px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 9 }}>{title}</div>
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

/* Recipe: công thức có định lượng — tương đương StepBlock của Movement Manual */
function Recipe({ title, time, tone = C.teal, items, note }) {
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

/* Bảng so sánh cách chế biến — dùng riêng cho tab Nhiệt-Ánh sáng-Oxy hoá */
function CompareTable({ rows }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 12 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border-tertiary)" }}>
            <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--color-text-tertiary)", fontWeight: 700 }}>Dưỡng chất</th>
            <th style={{ textAlign: "left", padding: "6px 8px", color: C.teal.text, fontWeight: 700 }}>Ép chậm (40–50°C)</th>
            <th style={{ textAlign: "left", padding: "6px 8px", color: C.coral.text, fontWeight: 700 }}>Ép ly tâm (70–80°C)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
              <td style={{ padding: "6px 8px", color: "var(--color-text-primary)", fontWeight: 600 }}>{r.name}</td>
              <td style={{ padding: "6px 8px", color: "var(--color-text-secondary)" }}>{r.slow}</td>
              <td style={{ padding: "6px 8px", color: "var(--color-text-secondary)" }}>{r.fast}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
   NAVIGATION — 7 tabs
   ============================================================ */
const PARTS = [
  { id: 0, num: "0",  short: "Mở đầu",         accent: C.ink,    icon: Coffee },
  { id: 1, num: "I",  short: "Thực đơn ngày",  accent: C.teal,   icon: GlassWater },
  { id: 2, num: "II", short: "Cacao chuyên sâu", accent: C.amber, icon: Bean },
  { id: 3, num: "III",short: "Đường & Não bộ", accent: C.purple, icon: Brain },
  { id: 4, num: "IV", short: "Nhiệt · Sáng · Oxy", accent: C.coral, icon: Thermometer },
  { id: 5, num: "V",  short: "Kết hợp thực phẩm", accent: C.blue, icon: Shuffle },
  { id: 6, num: "VI", short: "Snack bổ trợ",   accent: C.rose,   icon: Apple },
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

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "18px 14px 104px" }}>
      {/* ===== TAB BREADCRUMB — cùng khuôn với holistic_life.jsx / movement_manual.jsx:
          dải pill màu trên desktop, thu gọn thành 1 thanh "đang xem" + drawer trượt
          từ trái trên mobile (dưới 768px). ===== */}
      <style>{`
        .nt-mobile-trigger, .nt-mobile-backdrop, .nt-mobile-drawer { display: none; }
        @media (max-width: 767px) {
          .nt-desktop-nav { display: none !important; }
          .nt-mobile-trigger {
            display: flex; width: 100%; align-items: center; gap: 9px;
            position: sticky; top: 0; z-index: 20;
            background: #fff; border-bottom: 1px solid #eee;
            padding: 9px 0; margin-bottom: 14px; border-left: none; border-right: none; border-top: none;
            cursor: pointer; text-align: left;
          }
          .nt-mt-box {
            flex: 1; min-width: 0; display: flex; align-items: center; gap: 9px;
            border: 1px solid #eee; border-radius: 10px; padding: 8px 11px; background: var(--color-background-primary);
          }
          .nt-mt-icon-box {
            width: 26px; height: 26px; border-radius: 7px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .nt-mt-text { flex: 1; min-width: 0; }
          .nt-mt-label { font-size: 12px; font-weight: 700; color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .nt-mt-chev { color: var(--color-text-tertiary); flex-shrink: 0; transition: transform .2s ease; }
          .nt-mobile-trigger.open .nt-mt-chev { transform: rotate(180deg); }
          .nt-mobile-backdrop {
            display: block; position: fixed; inset: 0; background: rgba(35,31,26,.42);
            z-index: 198; opacity: 0; pointer-events: none; transition: opacity .2s ease;
          }
          .nt-mobile-backdrop.show { opacity: 1; pointer-events: auto; }
          .nt-mobile-drawer {
            display: block; position: fixed; top: 0; bottom: 0; left: 0; width: 82%; max-width: 300px;
            background: var(--color-background-primary); border-right: 1px solid #eee; z-index: 199; overflow-y: auto;
            transform: translateX(-100%); transition: transform .25s cubic-bezier(.32,.72,0,1);
          }
          .nt-mobile-drawer.show { transform: translateX(0); }
          .nt-md-head { padding: 14px; border-bottom: 1px solid #eee; display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
          .nt-md-t1 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-tertiary); }
          .nt-md-t2 { font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin-top: 3px; }
          .nt-md-close { width: 26px; height: 26px; border-radius: 7px; border: 1px solid #eee; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--color-text-tertiary); flex-shrink: 0; }
          .nt-md-item {
            width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 14px;
            background: transparent; border: none; border-left: 3px solid transparent; cursor: pointer; text-align: left;
          }
          .nt-md-item-label { font-size: 12.5px; font-weight: 700; }
        }
      `}</style>

      <nav className="nt-desktop-nav mobile-static" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2rem", position: "sticky", top: 0, zIndex: 10, background: "#fff", padding: "10px 0", borderBottom: "1px solid #eee" }}>
        {PARTS.map((p) => {
          const active = part === p.id;
          const Icon = p.icon;
          return (
            <button key={p.id} onClick={() => { setPart(p.id); window.__scrollArticleToTop?.(); }} style={{
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

      <button className={"nt-mobile-trigger" + (mobileNavOpen ? " open" : "")} onClick={() => setMobileNavOpen((v) => !v)}>
        <div className="nt-mt-box">
          <div className="nt-mt-icon-box" style={{ background: current.accent.bg }}>
            {current.icon && <current.icon size={13} color={current.accent.border} />}
          </div>
          <div className="nt-mt-text">
            <div className="nt-mt-label">{current.num}. {current.short}</div>
          </div>
          <ChevronDown size={15} className="nt-mt-chev" />
        </div>
      </button>
      <div className={"nt-mobile-backdrop" + (mobileNavOpen ? " show" : "")} onClick={() => setMobileNavOpen(false)} />
      <div className={"nt-mobile-drawer" + (mobileNavOpen ? " show" : "")}>
        <div className="nt-md-head">
          <div>
            <div className="nt-md-t1">{PARTS.length} phần</div>
            <div className="nt-md-t2">Chọn mục để xem</div>
          </div>
          <button className="nt-md-close" onClick={() => setMobileNavOpen(false)} aria-label="Đóng"><X size={13} /></button>
        </div>
        <div>
          {PARTS.map((p) => {
            const active = part === p.id;
            const Icon = p.icon;
            return (
              <button key={p.id} className="nt-md-item" style={{ background: active ? `${p.accent.border}14` : "transparent", borderLeftColor: active ? p.accent.border : "transparent" }} onClick={() => { setPart(p.id); setMobileNavOpen(false); window.__scrollArticleToTop?.(); }}>
                <Icon size={14} color={active ? p.accent.border : "var(--color-text-tertiary)"} />
                <span className="nt-md-item-label" style={{ color: active ? p.accent.border : "var(--color-text-primary)" }}>{p.num}. {p.short}</span>
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
        <button onClick={() => { setPart(Math.max(0, part - 1)); window.__scrollArticleToTop?.(); }} disabled={part === 0} style={{
          fontSize: 12, fontWeight: 600, padding: "9px 14px", borderRadius: 10,
          color: part === 0 ? "var(--color-text-tertiary)" : "var(--color-text-secondary)",
          background: "var(--color-background-primary)",
          border: `0.5px solid ${part === 0 ? "transparent" : "var(--color-border-tertiary)"}`,
          cursor: part === 0 ? "default" : "pointer", visibility: part === 0 ? "hidden" : "visible",
        }}>
          ← {part > 0 ? `${PARTS[part - 1].num}. ${PARTS[part - 1].short}` : ""}
        </button>
        <button onClick={() => { setPart(Math.min(6, part + 1)); window.__scrollArticleToTop?.(); }} disabled={part === 6} style={{
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
      <div style={{ fontSize: 11, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 6 }}>Cẩm nang cá nhân hoá</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 8px", lineHeight: 1.25 }}>Dinh dưỡng thông minh cho người bận rộn</h1>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
        Thực đơn cá nhân đã duy trì hơn 5 năm, cho người công việc cường độ cao, dễ stress, khó ngủ, không có nhiều thời gian chuẩn bị. Mục tiêu: nạp đủ dinh dưỡng đa chất theo khuyến nghị, hạn chế tối đa hoá chất (phân thuốc, chất bảo quản), và tốn ít nhất thời gian chuẩn bị mỗi ngày — lý tưởng là chỉ 1 phút.
      </p>

      <div style={sectionNum}>MỞ ĐẦU</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Đọc phần này một lần, trước tất cả</h2>
      <p style={prose}>
        Ai cũng muốn ăn xanh-lành-ngon, nhưng đó là kịch bản lý tưởng. Vì nhiều điều kiện khách quan lẫn chủ quan, việc có được vài món nhanh-gọn-bổ-phù hợp nhất có thể là câu chuyện phải đánh đổi. Nghiên cứu để cân đối giữa các giới hạn đó cũng là một nỗ lực lớn để duy trì sức khoẻ trong hoàn cảnh cho phép — mọi hành động đều đi kèm kết quả, nên hiểu rõ cái mình đánh đổi quan trọng hơn là cố chạy theo một chuẩn hoàn hảo không thực tế.
      </p>

      <Callout tone={C.ink} kicker="Nguyên tắc trung tâm — CÂN BẰNG">
        Không quá nhiều, không quá ít. Một nguyên liệu tốt dùng liên tục mỗi ngày vẫn có thể gây hại (dùng liên tục cacao-gừng-quế nhiều sẽ thấy người nóng, nổi mụn — đó là hậu quả bên ngoài của việc đã quá liều). Ngược lại, thói quen là "lãi kép": một ly nước tốn một phút mỗi sáng, duy trì đều suốt nhiều năm, tích luỹ thành khác biệt lớn. Vì vậy: dùng nguyên liệu "không khuyến nghị liên tục" thì cách ngày, dừng vài ngày–vài tuần, hoặc giảm liều — tự cảm nhận cơ thể là thước đo cuối cùng, không có công thức chung cho tất cả mọi người.
      </Callout>

      <p style={prose}>
        Mỗi người có thể trạng, cường độ vận động và nhu cầu năng lượng khác nhau — nội dung trong tài liệu này dựa trên các nguyên lý dinh dưỡng cơ bản, cần tự điều chỉnh (tailor) theo nhu cầu thật của cơ thể mình. Người dùng ít năng lượng hơn nên cân nhắc lại tỷ trọng khẩu phần, nếu không sẽ dễ đầy bụng khó tiêu.
      </p>

      <div style={sectionNum}>BẢN ĐỒ TÀI LIỆU</div>
      <h2 style={h2}>Bảy phần, một dòng chảy</h2>
      <div style={card}>
        <Row label="I · Thực đơn ngày" value="Công thức 2 ly + dừa + granola" sub="Toàn bộ thực đơn sáng-trưa-chiều, 1 phút chuẩn bị" tone={C.teal} />
        <Row label="II · Cacao chuyên sâu" value="Daily Drink, liều lượng, trữ đông" sub="Công thức gốc, cách pha trữ đông cả tuần, myth thường gặp" tone={C.amber} />
        <Row label="III · Đường & Não bộ" value="Vì sao và bao nhiêu là đủ" sub="Glucose, carb phức, chống đường huyết dao động" tone={C.purple} />
        <Row label="IV · Nhiệt · Ánh sáng · Oxy hoá" value="Kẻ thù thầm lặng của dinh dưỡng" sub="Ép chậm vs ly tâm, dầu ăn ôi, bảo quản đúng cách" tone={C.coral} />
        <Row label="V · Kết hợp thực phẩm" value="Cặp đôi nên và không nên" sub="Canxi-oxalate, vitamin C-sắt, cacao-sữa" tone={C.blue} />
        <Row label="VI · Snack bổ trợ" value="Khi cần một lựa chọn khác" sub="5 nhóm snack & đồ uống tốt cho não" tone={C.rose} />
      </div>

      <Box tone={C.teal} title="Vận động đi kèm" icon="✓">
        Song song với ăn uống: ~1.5 lít nước/ngày, đi bộ 2km chia 3 đợt (sáng/chiều/tối), duy trì cầu lông. Tạm dừng leo núi và đạp xe trong giai đoạn chưa sắp xếp được thời gian. (Thực đơn vận động chi tiết sẽ ở một tài liệu riêng.)
      </Box>

      <Remember items={[
        "Nguyên tắc duy nhất cần nhớ: CÂN BẰNG — không nguyên liệu nào nên dùng liên tục vô hạn định, kể cả nguyên liệu tốt.",
        "Thói quen nhỏ (1 phút/ngày) duy trì đều đặn nhiều năm quan trọng hơn một chế độ ăn hoàn hảo nhưng không bền được.",
        "Không có công thức chung cho mọi cơ thể — tài liệu này là khung tham khảo, tự điều chỉnh theo cảm nhận và cường độ vận động của bản thân.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB I — THỰC ĐƠN NGÀY
   ============================================================ */
function PartI() {
  return (
    <div>
      <div style={sectionNum}>PHẦN I</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Thực đơn ngày — hai ly, một phút mỗi ly</h2>
      <div style={thesis}>Cốt lõi của thực đơn là hai ly uống rải trong ngày: một ly buổi sáng giàu năng lượng để cày việc, một ly buổi trưa/chiều nhẹ nhàng giàu vitamin C. Chuẩn bị mỗi ly chỉ mất khoảng 1 phút: xúc nguyên liệu vào ly, mang theo, pha nước ấm khi tới nơi.</div>

      <Recipe title="Ly 1 — buổi sáng, để đủ sức cày task" tone={C.teal} time="~1 phút chuẩn bị" items={[
        "30g ngũ cốc (đậu xanh, đậu đỏ, đậu đen, mè đen — tự rang, tự xay)",
        "10g bột chuối xanh (đang cân nhắc chuyển sang ly chiều)",
        "10g bột cacao",
        "10g bột gai dầu / óc chó",
        "5g kỷ tử",
        "1g quế",
        "15g bột đường mía thô",
        "10ml mật chuối ủ",
      ]} note="Quy đổi: 10g ≈ 1 muỗng canh (table spoon) = 15ml. Xúc nguyên liệu vào ly, mang theo, tới nơi pha nước ấm, ngâm một lúc, khoảng 1 giờ sau thì uống." />

      <Box tone={C.teal} title="Ly 1 chứa gì và vì sao no lâu">
        Đủ đường–đạm–béo dạng thực vật, hạn chế tối thiểu hoá chất (trừ sâu, bảo quản, chế biến nhiều lớp) nhờ ngũ cốc tự trồng tự rang tự xay, các thành phần còn lại mua từ nơi canh tác/chế biến hữu cơ uy tín. Công việc trí óc cường độ cao và vận động đều mỗi ngày cần lượng năng lượng không nhỏ — ly này thay thế bữa sáng dạng tinh bột nhanh (bún, mỳ, bánh mỳ) vốn chỉ no được khoảng 1 giờ. Người dùng ít năng lượng hơn nên giảm tỷ trọng để tránh đầy bụng khó tiêu.
      </Box>

      <Recipe title="Ly 2 — buổi trưa/chiều, giàu vitamin C dễ phân huỷ" tone={C.blue} time="~1 phút chuẩn bị" items={[
        "Quất nguyên quả (nhà trồng)",
        "Đường mía thô",
        "Một xíu quế / kỷ tử / gừng",
        "Mật chuối ủ (nếu ly buổi sáng không có)",
      ]} note="Mùa nào có khế thì có thể thay quất. Lưu ý nếu ngâm khế với đường: ngâm đúng cách mới tốt, ngâm sai dễ mốc và tích luỹ độc chất — nguyên liệu tươi vẫn là lựa chọn an toàn hơn khi chưa chắc chắn về cách ngâm." />

      <div style={subHead}>Luân phiên & bổ trợ</div>
      <Recipe title="Dừa xiêm nguyên trái" tone={C.amber} items={[
        "3 quả/tuần, cách ngày, uống ngay kèm cơm dừa vừa chặt",
        "Mùa hè dùng đều; mùa đông giảm tần suất vì dễ lạnh bụng",
      ]} note="Một trong số ít loại quả mua ngoài mà gần như không lo phân thuốc, trong khi chất lượng dinh dưỡng rất cao." />

      <Recipe title="Nước ép/nước mía bổ trợ" tone={C.purple} items={[
        "2 ly/tuần: thơm, cóc, cà chua, cà rốt — nhóm quả/củ ít bị phun thuốc nhất",
        "Vitamin C trong cóc giúp tăng hấp thu các chất trong ly cacao buổi sáng",
        "Cà chua cho thêm tiền vitamin A; thơm có chất chống oxy hoá, chống viêm",
      ]} />

      <Recipe title="Granola tự làm — bữa thay thế khi cần" tone={C.rose} items={[
        "Yến mạch, hạt chia, gừng, quế, đường mía, các loại hạt giàu béo",
        "Chỉ dùng khi thật sự cần một bữa thay thế, không dùng làm chính vì kết cấu khô",
      ]} />

      <div style={card}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Stat value="1.5L" label="nước lọc mỗi ngày" tone={C.blue} />
          <Stat value="2km × 3" label="đi bộ sáng-chiều-tối" tone={C.teal} />
        </div>
      </div>

      <Callout tone={C.coral} kicker="Bối cảnh thực tế — thực đơn không tĩnh">
        Thực đơn này đã duy trì hơn 5 năm, nhưng không cố định tuyệt đối — có giai đoạn chủ yếu chỉ nấu sữa hạt, có giai đoạn ép rau củ quả đa dạng, có giai đoạn gần như chỉ dùng granola. Vì cường độ công việc cao dễ khiến lơi lỏng kế hoạch, mục tiêu thực tế là duy trì trên 50% kế hoạch đề ra chứ không phải 100% mọi ngày — và khi phải ăn ngoài nhiều, stress, thiếu ngủ kéo dài, cơ thể sẽ báo hiệu rõ (nóng trong, nổi mụn) để biết đường điều chỉnh lại.
      </Callout>

      <Remember items={[
        "Hai ly mỗi ngày là xương sống: ly sáng giàu năng lượng (ngũ cốc-cacao-mật chuối), ly trưa/chiều giàu vitamin C (quất-đường mía).",
        "Dừa xiêm và nước ép rau củ quả là lựa chọn luân phiên, không phải bắt buộc mỗi ngày.",
        "Granola là phương án dự phòng khi cần một bữa thay thế nhanh, không phải bữa ăn chính.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB II — CACAO CHUYÊN SÂU
   ============================================================ */
function PartII() {
  return (
    <div>
      <div style={sectionNum}>PHẦN II</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Cacao chuyên sâu — Daily Drink</h2>
      <div style={thesis}>Sau dừa xiêm và sữa hạt, đây là thức uống dùng nhiều nhất: một ly cacao gừng quế kỷ tử đường mía ngũ cốc, hỗ trợ chống lão hoá, thần kinh và tim mạch. Yêu cầu: nhanh cho người bận, đơn giản cho người lười, nhưng vẫn đủ dinh dưỡng đa chất và hạn chế tối đa hoá chất.</div>

      <Recipe title="Daily Drink — công thức gốc" tone={C.amber} items={[
        "Cacao 10g — dùng loại 100% nguyên chất, không trộn thêm đường, chưa tách kiệt bơ cacao (loại đã tách bơ mất phần lớn dưỡng chất)",
        "Quế Ceylon + gừng — một xíu, dùng ít và cách quãng nếu thấy nóng trong, cũng để tránh hại gan thận khi nạp liên tục lượng nhiều",
        "Đường mía thô — vài cục nhỏ, cân nhắc liều nếu đang có vấn đề đường huyết",
        "Kỷ tử 10g — nhiều lợi ích nhưng cũng nhiều rủi ro tồn dư thuốc trừ sâu, có thể cân nhắc bỏ qua nếu không tìm được nguồn tin cậy",
        "Hạt chia — một nhúm nhỏ, bổ sung chất xơ cho khẩu phần",
        "Ngũ cốc 5 loại đậu — 2–3 muỗng canh, lượng tuỳ khẩu vị vì mùi ngũ cốc đậm sẽ lấn vị ngon của ly nước",
      ]} note="Cacao là chất chống oxy hoá mạnh (polyphenol/flavonoid), giàu magie — khoáng an thần tự nhiên nhiều nhất trong thực vật — và giàu chất béo tốt." />

      <Box tone={C.amber} title="Ngũ cốc tự làm — ba điểm cần để ý">
        Ngâm hoặc rang trước khi xay để phá lớp vỏ hạt, tránh lớp vỏ cản trở hấp thu dinh dưỡng. Bảo quản trong hũ thuỷ tinh đậy kín, tránh ánh sáng UV — vì hạt đã xay thành bột nên diện tích tiếp xúc với oxy tăng lên nhiều, dễ oxy hoá và mối mọt hơn dạng hạt nguyên. Có thể chỉnh tỷ lệ từng loại đậu theo nhu cầu thể trạng hoặc điều kiện sinh hoạt từng giai đoạn — ví dụ nhiều đậu xanh hơn để mát người, hoặc thêm hạt sen để dễ ngủ hơn.
      </Box>

      <div style={subHead}>Linh hoạt thay thế</div>
      <p style={prose}>
        Có thể đổi từng thành phần bằng một nguyên liệu cùng nhóm — táo đỏ, hạt lanh, matcha, bơ hạt tự làm, nghệ... — miễn kiểm tra ba điều: nguyên liệu thay thế có cản trở hấp thu nhóm vi chất nào đang có sẵn trong ly không, mức độ dễ tồn dư thuốc bảo vệ thực vật của nguyên liệu đó, và mức độ dưỡng chất bị phân huỷ trong điều kiện ly nước sẽ được dùng (mang đi xa, để tới trưa mới uống...).
      </p>
      <p style={prose}>
        Có thể uống kèm ly nước ép/sinh tố thơm–cóc–cà chua: vitamin C trong cóc đẩy mạnh hấp thu các chất trong ly cacao, đồng thời bổ sung chất chống oxy hoá–chống viêm từ thơm và tiền vitamin A từ cà chua. Đây cũng là nhóm quả/củ ít bị phun thuốc hơn so với nhiều loại rau củ khác.
      </p>

      <div style={subHead}>Liều lượng & cách pha trữ đông cả tuần</div>
      <p style={prose}>
        Tốt nhất là pha tươi dùng ngay để tránh dưỡng chất bị phá huỷ và độc chất sinh ra trong quá trình để bên ngoài rồi cấp đông. Nhưng nếu có lý do khách quan, có thể pha sẵn và trữ đông theo cách sau, dùng trong tuần.
      </p>
      <div style={card}>
        <Row label="RDA cacao" value="5–10g bột/ngày" tone={C.amber} />
        <Row label="Định lượng dụng cụ" value="1 muỗng 30ml (gạt ngang, không nén) ≈ 10g bột" tone={C.amber} />
        <Row label="Khay đá" value="400ml nước ≈ 12 ngăn khay đá cỡ Inochi" tone={C.amber} />
      </div>
      <Recipe title="Cách pha trữ đông" tone={C.amber} items={[
        "Khuấy 400ml nước + 6 muỗng bột (muỗng 30ml) → đổ vừa khuôn 12 ngăn, mỗi viên ≈5g cacao",
        "Muốn đậm vị đắng hơn: tăng lên 10 muỗng bột — mức này tương đương 10g cacao/ngày, là mức tối đa khuyến nghị nên hạn chế dùng liên tục ở liều này vì dễ hại gan thận",
        "Mỗi ngày lấy 1 viên, bỏ kèm 2 cục đá nhỏ, uống như cà phê đá",
      ]} note="Có thể tuỳ chỉnh thêm chút gừng quế — các nguyên liệu này không xung đột nhau. Mùa đông thêm gia vị ấm này khá hợp, nhất là sau khi ra ngoài trời lạnh về." />

      <div style={subHead}>Chống chỉ định & một vài myth thường gặp</div>
      <CautionBox title="Ba điểm cần biết trước khi pha" items={[
        { wrong: "\"Cacao + sữa bò giảm 50% hoạt tính chống oxy hoá của flavonol, nên tránh nhau 2 tiếng.\"", fix: "Vẫn còn tranh luận trong nghiên cứu — có nghiên cứu khác cho thấy kết hợp lại làm tăng hoạt tính lên khoảng rưỡi. Không cần né tuyệt đối." },
        { wrong: "Dùng nước sôi 100°C để pha.", fix: "Nên dùng nước khoảng 70°C, vì nước sôi dễ làm biến tính vitamin C và polyphenol nhiều hơn. Đựng trong ly giữ nhiệt để vừa giữ ấm vừa hạn chế biến chất do nhiệt, ánh sáng, oxy." },
        { wrong: "\"Cho mật ong/đường mía khi còn nóng sẽ phá huỷ enzyme, nên để nguội dưới 50°C mới cho vào.\"", fix: "Enzyme từ thực phẩm ngoài gần như luôn bị phân huỷ khi vào ruột do pH thấp ở đó — cơ thể tự sinh enzyme để dùng, không hấp thu enzyme từ thức ăn. Điều thật sự đáng quan tâm khi nấu là vitamin, vi chất, polyphenol và chất xơ — những thứ thực sự bị ảnh hưởng bởi nhiệt, ánh sáng, oxy." },
      ]} />

      <Remember items={[
        "RDA cacao 5–10g/ngày — 10g là mức trần, không nên duy trì liên tục ở mức này.",
        "Nước pha lý tưởng ~70°C, không dùng nước sôi 100°C.",
        "Enzyme từ thực phẩm không phải thứ cần bảo toàn khi nấu — vitamin, vi chất, polyphenol và chất xơ mới là thứ cần chú ý.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB III — ĐƯỜNG & NÃO BỘ
   ============================================================ */
function PartIII() {
  return (
    <div>
      <div style={sectionNum}>PHẦN III</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Đường mía thô và não bộ</h2>
      <div style={thesis}>Não cần glucose để hoạt động, nhưng "cần glucose" không đồng nghĩa với "cần ăn đường". Hiểu đúng cơ chế giúp chọn nguồn năng lượng cho não hợp lý hơn, thay vì phụ thuộc đường tinh luyện.</div>

      <div style={subHead}>Lợi ích của đường — và giới hạn của lợi ích đó</div>
      <p style={prose}>
        Glucose là nhiên liệu chính của não, nhưng glucose không nhất thiết phải lấy trực tiếp từ đường mía — cơ thể tự phân giải carbohydrate phức (ngũ cốc, cơm, khoai, trái cây...) thành glucose, và nguồn này lành mạnh hơn hẳn đường tinh luyện. Nhu cầu năng lượng của não khá ổn định: khoảng <strong>120g glucose/ngày</strong> cho người trưởng thành. Dù làm việc trí óc cường độ cao, não cũng không tăng gấp đôi nhu cầu glucose mà chỉ tăng nhẹ. Một bát cơm (~150g) cho khoảng 40–45g glucose sau khi tiêu hoá.
      </p>

      <CautionBox title="Chống chỉ định của đường hấp thu nhanh" items={[
        { wrong: "Đường hấp thu nhanh → tăng đường huyết đột ngột.", fix: "Cơ thể tiết insulin để điều chỉnh, khiến đường huyết tụt nhanh sau đó — dao động mạnh về glucose dễ gây mệt, uể oải, khó tập trung." },
        { wrong: "Ăn nhiều đường mỗi ngày, kéo dài.", fix: "Làm tăng nguy cơ kháng insulin, tiểu đường type 2, béo bụng, sâu răng." },
      ]} />

      <div style={subHead}>Tác động của nhiệt độ lên đường khi nấu</div>
      <div style={card}>
        <Row label="Đường (sucrose)" value="Ổn định dưới 160°C" sub="Nấu nước sôi 100°C không phá huỷ — chỉ phân huỷ (caramel hoá) khi nấu lâu ở nhiệt cao hơn" tone={C.amber} />
        <Row label="Khoáng chất (Ca, Mg, K, Fe...)" value="Không bị phá huỷ bởi nhiệt" sub="Là nguyên tố vô cơ — nấu chè lâu, khoáng chất vẫn còn nguyên" tone={C.teal} />
        <Row label="Vitamin nhóm B" value="Giảm dần khi nấu lâu, nhiệt cao" sub="Nhưng lượng vitamin trong đường vốn đã rất ít, nên phần mất đi không đáng kể" tone={C.coral} />
      </div>

      <div style={subHead}>Cách nuôi não tốt hơn</div>
      <div style={card}>
        <Li tone={C.teal}><strong>Carb phức:</strong> cơm gạo lứt, yến mạch, khoai, ngũ cốc nguyên hạt — giải phóng glucose ổn định, không gây dao động đường huyết.</Li>
        <Li tone={C.amber}><strong>Trái cây:</strong> cung cấp glucose + fructose + vitamin C + chất xơ — năng lượng "sạch", không tăng/giảm đột ngột.</Li>
        <Li tone={C.purple}><strong>Chất béo tốt (omega-3):</strong> cá hồi, hạt lanh, óc chó — giúp neuron và màng tế bào thần kinh khoẻ.</Li>
        <Li tone={C.blue}><strong>Uống đủ nước:</strong> não rất nhạy với mất nước — chỉ cần thiếu 2% nước cũng đã giảm khả năng tập trung.</Li>
      </div>

      <div style={subHead}>Snack & đồ uống tốt cho não khi cần thêm năng lượng</div>
      <Recipe title="1. Nguồn carb phức — giữ đường huyết ổn định" tone={C.teal} items={[
        "Yến mạch ngâm qua đêm (overnight oats) + sữa hạt",
        "Khoai lang hấp/nướng lò — no lâu, không gây buồn ngủ",
        "Bánh ngũ cốc nguyên hạt ít đường, phết bơ hạt",
      ]} />
      <Recipe title="2. Chất béo tốt (omega-3, MCT)" tone={C.purple} items={[
        "Hạt óc chó, hạnh nhân, hạt điều — một nắm nhỏ (~20–30g)",
        "Hạt lanh/chia ngâm nước, trộn cùng sữa chua hoặc overnight oats",
        "Dừa tươi hoặc dầu dừa (MCT) — cho vào cà phê hoặc sinh tố",
      ]} />
      <Recipe title="3. Protein nhẹ — chống đói, duy trì tỉnh táo" tone={C.amber} items={[
        "Sữa chua Hy Lạp + trái cây tươi",
        "Trứng luộc — dễ ăn, tiện mang đi",
        "Đậu nành rang / edamame",
      ]} />
      <Recipe title="4. Trái cây giàu vitamin & chất chống oxy hoá" tone={C.rose} items={[
        "Việt quất, dâu tây, nho tím — tốt cho trí nhớ, chống stress oxy hoá",
        "Cam, quýt, kỷ tử — vitamin C hỗ trợ hấp thu sắt, tăng đề kháng",
        "Chuối — đường tự nhiên + kali, hỗ trợ thần kinh cơ",
      ]} note="Tốt nhất ăn kèm protein/hạt để giảm tốc độ tăng đường huyết." />
      <Recipe title="5. Đồ uống tỉnh táo vừa đủ" tone={C.blue} items={[
        "Trà xanh/Matcha — caffeine + L-theanine cho tỉnh táo êm, không bồn chồn",
        "Cà phê đen + MCT/collagen — năng lượng kéo dài hơn",
        "Sinh tố xanh (rau + trái cây + hạt lanh) — mát và nhiều vi chất",
      ]} />

      <Remember items={[
        "Não cần ~120g glucose/ngày, ổn định — không cần và không nên lấy phần lớn từ đường tinh luyện.",
        "Ưu tiên carb phức và trái cây nguyên chất để tránh dao động đường huyết gây mệt, mất tập trung.",
        "Nhiệt độ nấu không phá huỷ giá trị năng lượng của đường hay khoáng chất, chỉ ảnh hưởng nhẹ đến vitamin nhóm B.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB IV — NHIỆT · ÁNH SÁNG · OXY HOÁ
   ============================================================ */
function PartIV() {
  return (
    <div>
      <div style={sectionNum}>PHẦN IV</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Nhiệt độ, ánh sáng, oxy hoá — kẻ thù thầm lặng của dinh dưỡng</h2>
      <div style={thesis}>Phần lớn dưỡng chất không mất đi vì "hết hạn", mà vì bị phá huỷ dần bởi ba tác nhân: nhiệt độ, ánh sáng, và oxy. Hiểu ngưỡng chịu đựng của từng nhóm dưỡng chất giúp chọn đúng dụng cụ chế biến và cách bảo quản.</div>

      <div style={subHead}>Nhiệt độ phá huỷ dinh dưỡng trong hạt ở mức nào?</div>
      <div style={card}>
        <Row label="Vitamin E, polyphenol" value="Giảm rõ từ ~60–70°C" sub="Trong hạnh nhân, mè — nhạy cảm nhất với nhiệt" tone={C.coral} />
        <Row label="Vitamin nhóm B" value="Dễ giảm khi >80°C" sub="Trong đậu phộng, hạt điều" tone={C.amber} />
        <Row label="Khoáng chất (Ca, Mg, Zn, Fe)" value="Gần như không bị ảnh hưởng bởi nhiệt" tone={C.teal} />
        <Row label="Chất béo chưa bão hoà (omega-3, omega-6)" value="Dễ oxy hoá khi >100°C lâu" sub="Đặc biệt nếu tiếp xúc với không khí" tone={C.purple} />
      </div>

      <div style={subHead}>Máy ép chậm vs máy ép ly tâm — bảng so sánh giữ dưỡng chất</div>
      <CompareTable rows={[
        { name: "Vitamin C (rất nhạy nhiệt & oxy)", slow: "Mất ~20–30%", fast: "Mất ~40–60%" },
        { name: "Vitamin A / beta-carotene", slow: "Giữ 90–95%", fast: "Giữ 80–90%" },
        { name: "Vitamin E (nhạy oxy & ánh sáng)", slow: "Giữ 85–90%", fast: "Giữ 70–80%" },
        { name: "Vitamin K (ổn định)", slow: "Gần như giữ nguyên", fast: "Gần như giữ nguyên" },
        { name: "Vitamin B (B1, B2, B6, folate)", slow: "Mất 10–20%", fast: "Mất 20–40%" },
        { name: "Khoáng chất (Ca, Mg, K, Fe, Zn)", slow: "Giữ ~100%", fast: "Giữ ~100%" },
        { name: "Chất xơ", slow: "Giữ lại rất ít (bỏ cùng bã)", fast: "Giữ lại rất ít" },
        { name: "Polyphenol, flavonoid", slow: "Giữ 70–80%", fast: "Giữ 50–70%" },
        { name: "Enzyme tự nhiên (rất nhạy nhiệt/oxy)", slow: "Giữ ~40–60%", fast: "Mất phần lớn ~70–90%" },
      ]} />

      <Box tone={C.blue} title="Máy xay sinh tố thì sao?">
        Máy xay sinh nhiệt nhưng hiếm khi vượt quá 50–55°C nếu xay ngắt quãng — gần như không lo mất dinh dưỡng đáng kể. Vấn đề chính không phải nhiệt, mà là dầu trong nguyên liệu dễ bị oxy hoá sau khi xay do diện tích tiếp xúc không khí tăng lên.
      </Box>

      <div style={subHead}>Xếp hạng bốn cách chế biến rau củ quả</div>
      <div style={card}>
        <Row label="Ăn nguyên" value="Tối ưu nhất" sub="Giữ nguyên enzyme, vitamin, chất xơ" tone={C.teal} />
        <Row label="Sinh tố (blender)" value="Cân bằng tốt" sub="Giữ chất xơ + phần lớn vitamin, enzyme giảm nhẹ" tone={C.blue} />
        <Row label="Nước ép chậm" value="Ngon, còn khá nhiều vitamin" sub="Enzyme giảm 40–60%, mất chất xơ" tone={C.amber} />
        <Row label="Nước ép ly tâm" value="Mất nhiều nhất" sub="Mất nhiều vitamin C, enzyme, chất chống oxy hoá, không xơ" tone={C.coral} />
      </div>

      <div style={subHead}>Oxy hoá chất béo — ba giai đoạn, ba tác nhân</div>
      <p style={prose}>
        Quá trình ôi thiu của chất béo diễn ra theo ba giai đoạn: khởi phát, lan truyền, và kết thúc — tạo ra các hợp chất gây hại. Ba yếu tố chính đẩy nhanh quá trình này là <strong>nhiệt độ, oxy, và ánh sáng</strong>.
      </p>

      <div style={subHead}>Tác động của ánh sáng</div>
      <div style={card}>
        <Row label="Ánh sáng mặt trời (UV)" value="Tác nhân gây hại mạnh nhất" sub="Phá huỷ vitamin và lipid" tone={C.coral} />
        <Row label="Ánh sáng huỳnh quang" value="Có khả năng gây oxy hoá đáng kể" sub="Với dầu ăn nếu tiếp xúc lâu ngày" tone={C.amber} />
        <Row label="Ánh sáng LED" value="Được đánh giá vô hại" sub="Với dinh dưỡng thực phẩm" tone={C.teal} />
      </div>

      <div style={subHead}>Bơ hạt tự làm và cách bảo quản</div>
      <p style={prose}>
        Quá trình xay không làm mất dinh dưỡng cơ bản, nhưng làm tăng nguy cơ oxy hoá chất béo do diện tích tiếp xúc không khí lớn hơn nhiều so với hạt nguyên. Bổ sung dầu có tính ổn định (dầu dừa) hoặc giàu chất chống oxy hoá (dầu mè ép lạnh, dầu ô liu) là chiến lược hiệu quả để kéo dài thời gian bảo quản.
      </p>
      <Box tone={C.amber} title="Dầu mè ép lạnh có ngăn được ôi thiu hoàn toàn không?">
        Dầu mè ép lạnh giàu sesamol, sesamin, sesamolin — các chất chống oxy hoá tự nhiên, làm chậm quá trình oxy hoá chất béo. Nhưng không ngăn hoàn toàn việc ôi — tốc độ hư hỏng còn phụ thuộc nhiệt độ bảo quản (ngoài trời và tủ lạnh khác nhau rõ), độ kín không khí (lọ thuỷ tinh kín tốt hơn lọ nhựa hở), và ánh sáng (tia UV thúc đẩy oxy hoá nhanh hơn). Thêm dầu mè ép lạnh là bước tốt, giúp kéo dài bảo quản, nhưng vẫn nên giữ trong ngăn mát.
      </Box>
      <Callout tone={C.teal} kicker="Nguyên tắc vàng bảo quản bơ hạt">
        Lọ thuỷ tinh tối màu, đậy kín, bảo quản trong ngăn mát tủ lạnh — dùng trong 1–2 tháng.
      </Callout>

      <div style={subHead}>Thực phẩm lên men tự làm</div>
      <CautionBox title="Rủi ro cần lưu ý" items={[
        { wrong: "Tự lên men tại nhà, đặc biệt trong môi trường không được kiểm soát như văn phòng.", fix: "Tiềm ẩn rủi ro cao về an toàn vi sinh vật — nhiễm khuẩn, nấm mốc. Cần tuân thủ quy tắc vệ sinh nghiêm ngặt nếu muốn tự làm; sản phẩm công nghiệp thường an toàn hơn nhờ quy trình kiểm soát chặt chẽ." },
      ]} />

      <Remember items={[
        "Ba tác nhân phá huỷ dinh dưỡng cần kiểm soát: nhiệt độ, oxy, ánh sáng — nhất là với chất béo và vitamin nhạy cảm.",
        "Xếp hạng cách chế biến rau củ quả theo độ giữ dưỡng chất: ăn nguyên > sinh tố > ép chậm > ép ly tâm.",
        "Bảo quản dầu/bơ hạt: lọ thuỷ tinh tối màu, đậy kín, ngăn mát, dùng trong 1–2 tháng.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB V — KẾT HỢP THỰC PHẨM
   ============================================================ */
function PartV() {
  return (
    <div>
      <div style={sectionNum}>PHẦN V</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Kết hợp thực phẩm — nên và không nên</h2>
      <div style={thesis}>Một số cặp thực phẩm bổ trợ hấp thu lẫn nhau, một số cặp lại cản trở nhau. Biết trước giúp sắp xếp bữa ăn/ly uống hợp lý hơn mà không cần loại bỏ hẳn nguyên liệu nào.</div>

      <div style={subHead}>Các cặp bổ trợ hoặc trung tính</div>
      <div style={card}>
        <Row label="Cacao & Vitamin C" value="Bổ trợ nhau" sub="Hai chất chống oxy hoá không cạnh tranh, cùng tăng cường khả năng bảo vệ cơ thể" tone={C.teal} />
        <Row label="Cacao & Sữa" value="Không nhất thiết giảm tác dụng" sub="Tương tác giữa protein sữa và polyphenol cacao rất phức tạp; một số nghiên cứu cho thấy có thể tăng cường đặc tính chống viêm" tone={C.teal} />
        <Row label="Vitamin C & Sắt" value="Vitamin C tăng cường hấp thu sắt" sub="Đặc biệt là sắt từ nguồn thực vật" tone={C.teal} />
        <Row label="Đường & Nhiệt độ" value="Không mất giá trị năng lượng" sub="Nhưng làm hao hụt đáng kể chất chống oxy hoá và vitamin nhạy nhiệt đi kèm" tone={C.amber} />
      </div>

      <div style={subHead}>Các cặp cần lưu ý khi kết hợp</div>
      <CautionBox title="Cản trở hấp thu" items={[
        { wrong: "Canxi liều cao & Sắt.", fix: "Canxi có thể cản trở hấp thu sắt, nhưng tác động này thường chỉ đáng kể ở liều lượng cao — không cần tránh hoàn toàn ở liều bình thường." },
        { wrong: "Nguồn canxi (hạt, chùm ngây, kale) & rau họ cải hoặc cacao dùng gần thời gian nhau.", fix: "Oxalate trong rau họ cải và cacao sẽ làm giảm hấp thụ canxi — nên tách thời điểm dùng ra một chút thay vì ăn/uống cùng lúc." },
      ]} />

      <div style={subHead}>Nguồn bổ sung canxi thực vật</div>
      <Recipe title="Nhóm thực phẩm giàu canxi" tone={C.blue} items={[
        "Các loại hạt: hạnh nhân, chia, mè đen, hạt bí — ăn vặt dạng đã rang, hoặc nấu chín thành sữa hạt",
        "Bột chùm ngây, cải kale",
      ]} note="Tránh dùng gần thời gian với rau họ cải và cacao (xem lưu ý oxalate ở trên) để không làm giảm hấp thu canxi." />

      <Remember items={[
        "Cacao + vitamin C, cacao + sữa: bổ trợ hoặc trung tính, không cần tránh nhau.",
        "Vitamin C giúp tăng hấp thu sắt thực vật — kết hợp cóc/cam/quýt với bữa giàu sắt là hợp lý.",
        "Oxalate trong rau họ cải và cacao cản trở hấp thu canxi — tách thời điểm dùng với nguồn canxi (hạt, chùm ngây, kale).",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB VI — SNACK BỔ TRỢ
   ============================================================ */
function PartVI() {
  return (
    <div>
      <div style={sectionNum}>PHẦN VI</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Snack & lựa chọn bổ trợ khác</h2>
      <div style={thesis}>Khi hai ly chính và granola không đủ hoặc không phù hợp thời điểm, đây là các lựa chọn bổ trợ đã dùng qua nhiều năm — không phải để thay thế thực đơn chính, mà để có phương án khi hoàn cảnh thay đổi.</div>

      <Box tone={C.rose} title="Triết lý chọn snack">
        Mọi lựa chọn dưới đây đều nhắm mô phỏng đủ nhóm chất cần thiết: đường cho não, đạm–béo cho cơ thể, chất chống oxy hoá để hạn chế cơ thể "oxy hoá rỉ sắt". Tốt nhất vẫn là một bữa ăn đàng hoàng, đầy đủ — nhưng khi điều kiện không cho phép, một lựa chọn nhanh-gọn-đủ chất vẫn tốt hơn nhiều so với bỏ bữa hoặc ăn đồ chế biến sẵn tuỳ tiện.
      </Box>

      <div style={subHead}>Ghi chú thực tế khi hoàn cảnh thay đổi</div>
      <p style={prose}>
        Thực đơn cần linh hoạt theo điều kiện sống thực tế. Có giai đoạn chỉ có 15 phút buổi sáng cho toàn bộ việc chuẩn bị (đánh răng, mặc đồ, di chuyển) — khi đó, việc rút gọn còn hai ly pha nhanh (không cần dừa hay nước ép) vẫn duy trì được vì mỗi ly chỉ tốn khoảng 1 phút chuẩn bị. Đây là lý do thực đơn được thiết kế quanh các món "trữ sẵn nguyên liệu, pha nhanh" thay vì các món cần sơ chế mỗi lần.
      </p>

      <CautionBox title="Nhắc lại: đừng dùng bất kỳ nhóm nào liên tục không kiểm soát" items={[
        { wrong: "Cacao – quế – gừng – các loại đậu dùng liên tục lượng lớn mỗi ngày.", fix: "Không tốt cho gan thận về lâu dài, và một số thành phần cản trở hấp thu chất khác (sắt, khoáng chất). Dùng một thứ liên tục mỗi ngày tạo ra \"lãi kép\" — cả tích cực lẫn tiêu cực — nên cần tự hỏi thứ mình dùng mỗi ngày có thực sự nên dùng mỗi ngày không." },
      ]} />

      <div style={subHead}>Hành trình điều chỉnh — vì sao chuyển dần sang dạng hạt/bột</div>
      <p style={prose}>
        Hành trình ăn uống lành mạnh bắt đầu từ nhiều năm trước với sinh tố/nước ép rau củ tươi, granola và sữa hạt nấu thủ công. Sau khi nhận thấy mức độ tồn dư thuốc bảo vệ thực vật đáng lo ngại ở nhiều loại rau củ quả (kể cả mua tại siêu thị), máy ép dần ít được dùng hơn. Sữa hạt vẫn duy trì, nhưng từ khi tối ưu được công thức ba ly chỉ tốn khoảng 1 phút chuẩn bị, tần suất nấu sữa hạt giảm dần. Việc chuyển trọ nhiều lần khiến lịch sinh hoạt thay đổi liên tục, nên giữ được một công thức tối giản, pha nhanh, ổn định qua mọi hoàn cảnh sống là yếu tố giúp duy trì thói quen này nhiều năm liền — quan trọng hơn việc lựa chọn nguyên liệu "lý tưởng nhất" trên lý thuyết.
      </p>

      <Callout tone={C.ink} kicker="Giới hạn cần thừa nhận">
        Các nguyên liệu mua ngoài trong thực đơn này chưa phải 100% an toàn tuyệt đối, dù chọn từ nguồn uy tín — đó là niềm tin dựa trên uy tín người bán, không phải kiểm định trực tiếp. Nhưng trong điều kiện sống ở thành phố, đây là mức tối ưu thực tế có thể làm được. Đánh đổi và ưu tiên là điều không tránh khỏi — quan trọng là biết mình đang đánh đổi gì, và hành động nào cũng có kết quả kèm theo.
      </Callout>

      <Remember items={[
        "Snack bổ trợ dùng khi cần một lựa chọn khác — không thay thế hai ly chính của thực đơn ngày.",
        "Ưu tiên công thức pha nhanh, ổn định qua nhiều hoàn cảnh sống hơn là công thức lý tưởng nhưng khó duy trì.",
        "Không có thực đơn nào an toàn tuyệt đối 100% — mục tiêu thực tế là tối ưu trong giới hạn cho phép, và tự nhận biết giới hạn đó.",
      ]} />
    </div>
  );
}
