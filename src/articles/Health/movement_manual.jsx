import { useState } from "react";

/* ============================================================
   CẨM NANG VẬN ĐỘNG & SỨC KHỎE THỂ CHẤT DÀI HẠN
   Cá nhân hóa — người trưởng thành bận rộn, thoát vị đĩa đệm
   7 tab: Mở đầu · Nguyên lý · Chọn môn · Thực hành ·
          Phục hồi & Giấc ngủ · Theo dõi & Thích ứng · Duy trì
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

function SpineBox({ children, title = "Lăng kính cột sống" }) {
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "7px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", gap: 12 }}>
      <span style={{ fontSize: 13, color: "var(--color-text-secondary)", flex: 1 }}>{label}</span>
      <div style={{ textAlign: "right", flexShrink: 0, maxWidth: "56%" }}>
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
  { id: 0, num: "0",  short: "Mở đầu",    accent: C.ink },
  { id: 1, num: "I",  short: "Nguyên lý", accent: C.blue },
  { id: 2, num: "II", short: "Chọn môn",  accent: C.teal },
  { id: 3, num: "III",short: "Thực hành", accent: C.amber },
  { id: 4, num: "IV", short: "Phục hồi & Ngủ", accent: C.purple },
  { id: 5, num: "V",  short: "Theo dõi",  accent: C.coral },
  { id: 6, num: "VI", short: "Duy trì",   accent: C.rose },
];

export default function App() {
  const [part, setPart] = useState(0);

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "1.5rem 0", maxWidth: 680 }}>
      {/* ===== TAB BREADCRUMB — colored boxes at very top ===== */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: "1.5rem" }}>
        {PARTS.map((p) => {
          const active = part === p.id;
          return (
            <button key={p.id} onClick={() => setPart(p.id)} style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "8px 13px", borderRadius: 10, cursor: "pointer",
              fontSize: 12.5, fontWeight: 600,
              background: active ? p.accent.border : p.accent.soft,
              color: active ? "#fff" : p.accent.text,
              border: `1px solid ${active ? p.accent.border : p.accent.bg}`,
              boxShadow: active ? `0 1px 3px ${p.accent.bg}` : "none",
              transition: "all 0.15s",
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minWidth: 20, height: 20, borderRadius: 6, fontSize: 11, fontWeight: 700,
                background: active ? "rgba(255,255,255,0.25)" : p.accent.bg,
                color: active ? "#fff" : p.accent.mid,
              }}>{p.num}</span>
              {p.short}
            </button>
          );
        })}
      </div>

      {part === 0 && <Part0 />}
      {part === 1 && <PartI />}
      {part === 2 && <PartII />}
      {part === 3 && <PartIII />}
      {part === 4 && <PartIV />}
      {part === 5 && <PartV />}
      {part === 6 && <PartVI />}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1rem", borderTop: "0.5px solid var(--color-border-tertiary)" }}>
        <button onClick={() => setPart(Math.max(0, part - 1))} disabled={part === 0} style={{ fontSize: 12, color: part === 0 ? "var(--color-text-tertiary)" : "var(--color-text-secondary)", background: "none", border: "none", cursor: part === 0 ? "default" : "pointer" }}>
          {part > 0 ? `← ${PARTS[part - 1].num}. ${PARTS[part - 1].short}` : ""}
        </button>
        <button onClick={() => setPart(Math.min(6, part + 1))} disabled={part === 6} style={{ fontSize: 12, color: part === 6 ? "var(--color-text-tertiary)" : "var(--color-text-secondary)", background: "none", border: "none", cursor: part === 6 ? "default" : "pointer" }}>
          {part < 6 ? `${PARTS[part + 1].num}. ${PARTS[part + 1].short} →` : ""}
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
      {/* Masthead — only on intro tab */}
      <div style={{ fontSize: 11, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 6 }}>Cẩm nang cá nhân hóa</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8, lineHeight: 1.25 }}>Vận động & sức khỏe thể chất dài hạn</h1>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65, marginBottom: "1.75rem" }}>
        Dành cho người trưởng thành bận rộn, với các khuyến nghị điều chỉnh cho người bị thoát vị đĩa đệm thắt lưng. Tài liệu xây khung tư duy để tự thiết kế và duy trì một đời sống vận động bền vững — bất kể chọn chạy bộ, cầu lông, bơi, tai chi hay tập kháng lực.
      </p>

      <div style={sectionNum}>MỞ ĐẦU</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Đọc phần này một lần, trước tất cả</h2>
      <p style={prose}>
        Tài liệu này có sáu phần nội dung. Nhưng tất cả đứng trên một luận điểm và một mệnh lệnh duy nhất. Nắm hai điều dưới đây, mọi phần sau sẽ có chỗ đứng trong một bức tranh lớn thay vì là những mảnh rời rạc.
      </p>

      <Callout tone={C.ink} kicker="Luận điểm trung tâm">
        Vận động bền vững cả đời không đến từ việc chọn đúng môn hay tập nhiều nhất, mà từ quản lý tải trọng thông minh, phục hồi đủ, và thiết kế thói quen duy trì được qua nhiều năm. Môn tập là phương tiện có thể thay thế; nguyên lý tải trọng–phục hồi–duy trì là bất biến.
      </Callout>

      <Callout tone={C.coral} kicker="Mệnh lệnh — quan trọng hơn mọi lý thuyết bên dưới">
        Mọi kiến thức trong tài liệu này chỉ có giá trị khi được thực hành. Một trang giấy đọc kỹ không làm khỏe thêm một tế bào nào. Cơ thể chỉ đáp lại hành động lặp lại — không đáp lại sự hiểu biết. Hãy bắt đầu nhỏ, làm hôm nay, và duy trì bền bỉ. Đó là toàn bộ bí quyết; phần còn lại chỉ là chi tiết.
      </Callout>

      <p style={prose}>
        Tôi sẽ nhắc lại mệnh lệnh này ở cuối mỗi phần dưới một hình thức khác nhau — không phải để lặp, mà vì nó là điều duy nhất thực sự quyết định kết quả. Bạn có thể quên 90% chi tiết kỹ thuật và vẫn khỏe mạnh nếu giữ được thói quen vận động đều đặn. Điều ngược lại không đúng: thuộc lòng mọi chi tiết mà không thực hành thì vô ích.
      </p>

      <div style={sectionNum}>BẢN ĐỒ TÀI LIỆU</div>
      <h2 style={h2}>Sáu phần, một dòng chảy</h2>
      <div style={card}>
        <Row label="I · Nguyên lý" value="Hiểu để tự quyết định" sub="Tải trọng, phục hồi, vùng cường độ, hai trụ cột" tone={C.blue} />
        <Row label="II · Chọn môn" value="Lắp thực đơn vận động" sub="9 môn ngang hàng, đọc qua cùng lăng kính" tone={C.teal} />
        <Row label="III · Thực hành" value="Làm từng buổi đúng cách" sub="Kiến trúc buổi tập, dinh dưỡng, mobility" tone={C.amber} />
        <Row label="IV · Phục hồi & Ngủ" value="Nơi cơ thể thực sự khỏe lên" sub="Giấc ngủ chuyên sâu cho người khó ngủ" tone={C.purple} />
        <Row label="V · Theo dõi" value="Đọc tín hiệu, điều chỉnh, xử lý gián đoạn" sub="HRV, quá tải, khi cuộc sống phá kế hoạch" tone={C.coral} />
        <Row label="VI · Duy trì" value="Vì sao đây mới là phần quyết định" sub="Tuổi thọ, hành vi học, sức khỏe tinh thần" tone={C.rose} />
      </div>

      <SpineBox title="Một lưu ý xuyên suốt">
        Tài liệu này có xu hướng điều chỉnh các khuyến nghị cho người bị thoát vị đĩa đệm thắt lưng (lumbar disc herniation, viết tắt LDH trong các phần sau). Mỗi phần có một hộp "Lăng kính cột sống" như thế này, chỉ ra ý nghĩa cụ thể với đĩa đệm. Các khuyến nghị ở đây là khung tham khảo chung — không thay thế đánh giá của bác sĩ chuyên khoa cột sống cho từng tình trạng cụ thể, vốn phụ thuộc vị trí, mức độ thoát vị và triệu chứng thần kinh của mỗi người.
      </SpineBox>

      <Remember items={[
        "Một luận điểm: quản lý tải trọng–phục hồi–duy trì quan trọng hơn chọn môn hay tập nhiều.",
        "Một mệnh lệnh: lý thuyết vô giá trị nếu không thực hành. Bắt đầu nhỏ, làm ngay, giữ đều.",
        "Sáu phần là một dòng chảy: hiểu → chọn → làm → phục hồi → theo dõi → duy trì.",
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
      <div style={thesis}>Năm nguyên lý dưới đây đúng cho mọi môn. Hiểu chúng một lần, bạn tự đánh giá được bất kỳ hoạt động nào thay vì phụ thuộc lời khuyên rời rạc.</div>

      <div style={sectionNum}>1.1</div>
      <h2 style={h2}>Cơ thể mạnh lên khi phục hồi, không phải khi gắng sức</h2>
      <p style={prose}>
        Buổi tập không làm bạn khỏe hơn — nó tạo một <em>tổn thương có kiểm soát</em> và một tín hiệu. Sự khỏe lên thực sự diễn ra sau đó, khi cơ thể sửa chữa và bù đắp vượt mức ban đầu — gọi là <strong>siêu bù (supercompensation)</strong>. Tập liên tục không đủ phục hồi giữ bạn mãi trong trạng thái tổn thương chưa lành: chững lại, mệt mạn tính, tăng chấn thương.
      </p>
      <Callout tone={C.blue} kicker="Chu trình cần thuộc lòng">
        Kích thích → Mệt mỏi → Phục hồi → Thích nghi. Bỏ bước Phục hồi, bước Thích nghi không xảy ra. Tập nhiều hơn không phải lúc nào cũng tốt hơn; đúng liều rồi phục hồi đủ mới tốt hơn.
      </Callout>

      <div style={sectionNum}>1.2</div>
      <h2 style={h2}>Tải trọng tập luyện: biến số quan trọng nhất</h2>
      <p style={prose}>
        "Tải trọng" (training load) là tổng stress một buổi/tuần đặt lên cơ thể — kết hợp <strong>khối lượng</strong> (bao lâu, bao xa) và <strong>cường độ</strong> (mạnh đến đâu). Đây là yếu tố dự đoán chấn thương mạnh nhất, hơn cả kỹ thuật hay giày dép. Nguyên tắc vàng: <strong>không tăng quá ~10% mỗi tuần</strong>. Gân, dây chằng, đĩa đệm thích nghi chậm hơn cơ và tim — tăng nhanh nghĩa là cơ "chịu được" nhưng mô liên kết chưa theo kịp, và đó là lúc chấn thương xảy ra.
      </p>
      <MistakeBox items={[
        { wrong: "Nghỉ dài rồi quay lại mức cũ.", fix: "Sau 2+ tuần nghỉ, mô liên kết mất thích nghi. Quay lại từ 50–60%, tăng dần." },
        { wrong: "Chỉ đếm thời gian, bỏ qua cường độ.", fix: "30 phút chạy nhanh tải cao hơn nhiều 30 phút đi bộ. Tính cả hai chiều." },
        { wrong: "Tăng đồng thời khối lượng lẫn cường độ.", fix: "Chỉ tăng một biến mỗi lần." },
      ]} />

      <div style={sectionNum}>1.3</div>
      <h2 style={h2}>Vùng cường độ: không phải cứ mệt hơn là tốt hơn</h2>
      <div style={card}>
        <Row label="Zone 1 — Phục hồi" value="50–60% HRmax (~100 bpm)" sub="Đi bộ, tai chi nhẹ" tone={C.teal} />
        <Row label="Zone 2 — Nền tảng aerobic" value="60–70% HRmax (~130–145 bpm)" sub="Nói chuyện được cả câu" tone={C.blue} />
        <Row label="Zone 3–5 — Cường độ cao" value="70–100% HRmax" sub="Interval, HIIT, thi đấu" tone={C.coral} />
      </div>
      <p style={prose}>
        Vùng bị hiểu lầm nhiều nhất là <strong>Zone 2</strong> — đủ thấp để nói chuyện, đủ cao để tạo thích nghi. Đây là nơi xây "động cơ aerobic": mật độ ty thể, khả năng đốt mỡ, mạng mao mạch. Mô hình 80/20 (Seiler) cho thấy nền tảng bền vững đến từ <em>khối lượng lớn cường độ thấp</em> cộng <em>lượng nhỏ cường độ cao</em> — không phải từ việc luôn tập mức trung bình-nặng.
      </p>
      <Box tone={C.amber} title="Zone 1 có thay được Zone 2 không?" icon="?">
        Được, nhưng khác chức năng. Zone 1 (đi bộ, HR ~100, cadence 110–120) là phục hồi chủ động — gần như không tích mệt, dùng hàng ngày. Nhưng <em>không đủ kích thích</em> để xây nền tảng aerobic như Zone 2. Điểm ít người biết: Zone 2 vẫn tạo tải lên hệ giao cảm và tích mệt nếu lặp mỗi ngày — nó không phải "vùng nghỉ". Với người bận rộn: Zone 1 hàng ngày để duy trì, xen vài buổi Zone 2/tuần để thực sự tiến bộ.
      </Box>

      <div style={sectionNum}>1.4</div>
      <h2 style={h2}>Ba trụ cột của sức khỏe thể chất dài hạn</h2>
      <p style={prose}>Sức khỏe thể chất đứng trên ba chân — bỏ chân nào cũng khập khiễng. Hai chân đầu được nói nhiều; chân thứ ba thường bị bỏ quên nhưng quan trọng ngang bằng, đặc biệt với tuổi tác và cột sống tổn thương.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div style={{ ...card, marginBottom: 0, padding: "0.85rem" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.blue.text, marginBottom: 5 }}>Tim–hô hấp</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>VO2max — chỉ số dự đoán tử vong mạnh nhất. Xây bằng aerobic.</div>
        </div>
        <div style={{ ...card, marginBottom: 0, padding: "0.85rem" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.purple.text, marginBottom: 5 }}>Sức mạnh</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>Chống sarcopenia (mất cơ từ ~30 tuổi). Bảo vệ cột sống.</div>
        </div>
        <div style={{ ...card, marginBottom: 0, padding: "0.85rem" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.teal.text, marginBottom: 5 }}>Kiểm soát thần kinh-cơ</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>Proprioception, thăng bằng, phối hợp. Phòng ngã, bảo vệ khớp & cột sống.</div>
        </div>
      </div>
      <Box tone={C.teal} title="Trụ cột thứ ba bị đánh giá thấp: kiểm soát thần kinh-cơ">
        Đây là năng lực cơ thể cảm nhận vị trí của chính nó trong không gian (proprioception) và điều phối cơ để phản ứng kịp thời — nền tảng của thăng bằng, phối hợp, và phản xạ giữ thăng bằng khi mất đà. Nó tích hợp tín hiệu từ cơ-khớp, tai trong (tiền đình), và thị giác; tất cả suy giảm theo tuổi nếu không được thử thách. Một bài <em>test</em> đơn giản phản ánh năng lực này: khả năng đứng một chân — nghiên cứu cho thấy người trung niên trở lên không giữ được thăng bằng một chân 10 giây có nguy cơ tử vong cao hơn rõ rệt trong các năm theo dõi tiếp theo (đứng một chân là thước đo, không phải bản thân mục tiêu). Mục 1.5 đào sâu cách rèn năng lực này.
      </Box>

      <div style={sectionNum}>1.5</div>
      <h2 style={h2}>Đào sâu: hệ thần kinh-cơ hoạt động và suy giảm thế nào</h2>
      <p style={prose}>
        Trụ cột thứ ba xứng đáng được hiểu kỹ hơn, vì nó là trụ cột bị bỏ quên nhiều nhất và cũng là trụ cột quyết định bạn có giữ được sự độc lập về vận động khi già hay không. "Kiểm soát thần kinh-cơ" không phải một năng lực đơn lẻ — nó là cả một chuỗi xử lý, và mỗi mắt xích có thể rèn được.
      </p>

      <div style={subHead}>Chuỗi xử lý: từ cảm nhận đến phản ứng</div>
      <p style={prose}>
        Mỗi lần bạn giữ thăng bằng, cơ thể chạy một vòng lặp trong tích tắc: <strong>cảm nhận</strong> (mechanoreceptor ở cơ, gân, bao khớp báo vị trí; tai trong báo gia tốc; mắt báo tương quan không gian) → <strong>tích hợp</strong> (tiểu não và thân não gộp ba nguồn tín hiệu) → <strong>phản ứng</strong> (ra lệnh co cơ đúng lúc, đúng lực để giữ trọng tâm). Suy giảm ở bất kỳ mắt xích nào — receptor kém nhạy theo tuổi, tích hợp chậm, cơ phản ứng yếu — đều làm cả hệ thống kém đi. Tin tốt: cả ba mắt xích đều đáp ứng với luyện tập chuyên biệt.
      </p>

      <div style={subHead}>Bốn loại thăng bằng — cần rèn cả bốn</div>
      <div style={card}>
        <Row label="Tĩnh (static)" value="Giữ yên một tư thế" sub="Đứng một chân, tư thế yoga giữ" tone={C.teal} />
        <Row label="Động (dynamic)" value="Giữ ổn định khi di chuyển" sub="Đi trên đường hẹp, bước qua vật" tone={C.blue} />
        <Row label="Chủ động (proactive)" value="Điều chỉnh trước khi mất đà" sub="Với lấy vật, cúi nhặt — anticipatory" tone={C.amber} />
        <Row label="Phản ứng (reactive)" value="Phục hồi sau khi bị mất đà đột ngột" sub="Bước cứu khi trượt chân — quan trọng nhất chống ngã" tone={C.coral} />
      </div>
      <Box tone={C.coral} title="Thăng bằng phản ứng — loại quan trọng nhất và bị bỏ quên nhất">
        Hầu hết người tập thăng bằng chỉ tập loại tĩnh (đứng một chân) và bỏ qua loại <em>phản ứng</em> — khả năng phục hồi sau khi bị mất đà đột ngột. Nhưng chính loại phản ứng mới quyết định bạn có ngã thật hay không khi trượt chân ngoài đời. Nghiên cứu về "perturbation-based balance training" (tập với nhiễu loạn có chủ đích) cho thấy hiệu quả giảm ngã ấn tượng — tới 50–75% trong điều kiện thí nghiệm — vượt xa tập thăng bằng tĩnh thông thường. Cách rèn tại nhà an toàn: tập bước phản ứng có kiểm soát (nhờ người nhẹ đẩy vai từ nhiều hướng, tập bước cứu), đi trên bề mặt không ổn định (thảm mềm), thay đổi hướng đột ngột khi đi bộ.
      </Box>

      <div style={subHead}>Power & tốc độ sinh lực — mảng suy giảm nhanh nhất theo tuổi</div>
      <p style={prose}>
        Đây là điểm ít người biết nhưng cực kỳ quan trọng. Có ba năng lực cơ khác nhau: <strong>sức mạnh tối đa</strong> (nâng được bao nặng), <strong>power</strong> (sinh lực nhanh — lực × tốc độ), và <strong>tốc độ sinh lực</strong> (rate of force development — sinh lực nhanh cỡ nào trong 50–200 mili-giây đầu). Nghiên cứu cho thấy power và tốc độ sinh lực <em>suy giảm nhanh hơn hẳn</em> sức mạnh tối đa theo tuổi — hiện tượng gọi là "dynapenia".
      </p>
      <Callout tone={C.purple} kicker="Vì sao điều này quyết định sự độc lập khi già">
        Khi bạn trượt chân, cơ thể có khoảng 200 mili-giây để sinh đủ lực bước cứu. Không phải sức mạnh tối đa cứu bạn — mà là khả năng sinh lực <em>đủ nhanh</em>. Đây là lý do một người cao tuổi vẫn "khỏe" (nâng được vật nặng) vẫn có thể ngã: họ mất tốc độ sinh lực, không phải sức mạnh. Rèn năng lực này cần các động tác có yếu tố tốc độ/bùng nổ có kiểm soát, không chỉ nâng tạ chậm.
      </Callout>
      <Box tone={C.amber} title="Power giữ được cả khi bất động — bằng chứng đáng chú ý">
        Một RCT cho thấy: sau 2 tháng nằm bất động hoàn toàn, nhóm chứng mất 31–35% power và tới 53% tốc độ sinh lực; nhưng nhóm chỉ tập nhảy (plyometric) ngắn mỗi ngày <em>không mất gì</em>. Bài học: một lượng nhỏ bài tập có yếu tố power bảo vệ mạnh mẽ năng lực thần kinh-cơ ngay cả trong hoàn cảnh bất lợi nhất.
      </Box>

      <div style={subHead}>Cách rèn — tích hợp vào tuần tập</div>
      <div style={card}>
        <Li tone={C.teal}><strong>Thăng bằng tĩnh & động:</strong> đứng một chân (tiến tới nhắm mắt, đứng trên mặt mềm), đi nối gót, tai chi. 5–10 phút, vài lần/tuần. Tận dụng khe hở: đứng một chân khi đánh răng.</Li>
        <Li tone={C.coral}><strong>Thăng bằng phản ứng:</strong> đổi hướng đột ngột khi đi, bước qua vật bất ngờ, tập bước cứu. An toàn là ưu tiên — có điểm bám gần.</Li>
        <Li tone={C.purple}><strong>Power (có kiểm soát):</strong> đứng lên ngồi xuống ghế NHANH (phần đứng lên bùng nổ, ngồi xuống chậm), bước lên bậc nhanh, ném-bắt bóng nặng nhẹ. Với người khỏe: nhảy nhẹ có tiếp đất mềm.</Li>
        <Li tone={C.blue}><strong>Tích hợp sẵn:</strong> nhiều môn đã rèn trụ cột này — tai chi (thăng bằng động + chủ động), cầu lông (phản ứng + power), tập một chân (Bulgarian split squat). Không phải lúc nào cũng cần buổi riêng.</Li>
      </div>
      <SpineBox>
        Với LDH, trụ cột thần kinh-cơ có vai trò kép đặc biệt. Thứ nhất, kiểm soát tốt giúp cột sống <em>tránh chuyển động bất ngờ nguy hiểm</em> — khi cơ core và cơ ổn định phản ứng đủ nhanh, chúng "khóa" cột sống trung tính trước khi một cú trượt hay vấp kịp tạo lực gập-xoay có hại. Thứ hai, người có đau lưng mạn thường có proprioception vùng thắt lưng bị suy giảm (não "mất bản đồ" chính xác về vị trí cột sống) — rèn kiểm soát thần kinh-cơ giúp khôi phục phần nào bản đồ này. Nhưng chọn bài an toàn: ưu tiên bài một chân giữ cột sống trung tính (single-leg balance, bird-dog), tránh bài power có gập/xoay hoặc tiếp đất mạnh (nhảy nặng, xoay bùng nổ) khi cột sống chưa vững.
      </SpineBox>

      <SpineBox title="Lăng kính cột sống — nền tảng toàn tài liệu">
        Đĩa đệm không có mạch máu; nó lấy dinh dưỡng qua cơ chế "bơm" — tải nhịp nhàng vừa phải ép dịch ra vào, mang oxy vào. Nghĩa là <strong>vận động đúng cách nuôi đĩa đệm</strong>, bất động khiến nó thoái hóa nhanh hơn. Nhưng cùng cơ chế: tải quá cao hoặc sai hướng (gập + xoay dưới lực) ép nhân nhầy qua vết rách, gây viêm rễ thần kinh. Toàn bộ tài liệu tìm "liều tải" nằm trong vùng nuôi dưỡng, tránh vùng gây tổn thương — vùng an toàn này hẹp hơn ở người thoát vị đĩa đệm.
      </SpineBox>

      <Callout tone={C.coral} kicker="Nhắc lại mệnh lệnh">
        Bốn nguyên lý này chỉ thành sức khỏe khi bạn áp dụng vào một buổi tập thật, hôm nay. Hiểu "siêu bù" không làm cơ khỏe lên — tập rồi ngủ đủ mới làm.
      </Callout>

      <Remember items={[
        "Thích nghi xảy ra khi phục hồi. Tập là kích thích, không phải kết quả.",
        "Tải trọng (khối lượng × cường độ) là biến số quan trọng nhất — quy tắc 10%/tuần.",
        "Zone 2 xây nền tảng; Zone 1 duy trì; cường độ cao dùng liều nhỏ.",
        "Ba trụ cột: tim mạch, sức mạnh, VÀ kiểm soát thần kinh-cơ — chạm cả ba.",
        "Thần kinh-cơ gồm cả thăng bằng phản ứng và power/tốc độ sinh lực — hai thứ suy giảm nhanh nhất và bị bỏ quên nhất theo tuổi.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB II — CHỌN MÔN VẬN ĐỘNG
   ============================================================ */
function SportCard({ name, tags, cardio, strength, spine, spineTone, forWho, caution, start }) {
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>{name}</span>
        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: spineTone.bg, color: spineTone.text, flexShrink: 0 }}>{spine}</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {tags.map((t, i) => <span key={i} style={{ fontSize: 10.5, padding: "1px 8px", borderRadius: 20, background: "var(--color-background-secondary)", color: "var(--color-text-tertiary)" }}>{t}</span>)}
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
        <div><span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Tim mạch </span><span style={{ fontSize: 12, fontWeight: 700, color: C.blue.mid }}>{cardio}</span></div>
        <div><span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Sức mạnh </span><span style={{ fontSize: 12, fontWeight: 700, color: C.purple.mid }}>{strength}</span></div>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.55, marginBottom: 6 }}><strong style={{ color: "var(--color-text-primary)" }}>Phù hợp:</strong> {forWho}</div>
      <div style={{ fontSize: 12.5, color: C.coral.mid, lineHeight: 1.55, marginBottom: 6 }}><strong style={{ color: C.coral.text }}>Cảnh báo LDH:</strong> {caution}</div>
      <div style={{ fontSize: 12.5, color: C.teal.mid, lineHeight: 1.55 }}><strong style={{ color: C.teal.text }}>Bắt đầu đúng:</strong> {start}</div>
    </div>
  );
}

function PartII() {
  return (
    <div>
      <div style={sectionNum}>PHẦN II</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Chọn môn vận động</h2>
      <div style={thesis}>Không có môn "tốt nhất" — chỉ có môn phù hợp nhất với cơ thể, lịch trình và cột sống của bạn. Đọc mỗi môn qua cùng một lăng kính để tự lắp "thực đơn" của riêng mình.</div>

      <div style={sectionNum}>2.1</div>
      <h2 style={h2}>Cách đọc một môn vận động</h2>
      <p style={prose}>
        Thay vì hỏi "môn này tốt không", đánh giá trên năm trục: <strong>lợi ích tim mạch, lợi ích sức mạnh, tải trọng lên cột sống, rào cản thời gian/thiết bị,</strong> và <strong>độ phù hợp với thoát vị đĩa đệm</strong>. Một môn tuyệt vời cho người này có thể sai cho người khác — khác biệt nằm ở năm trục đó.
      </p>
      <SpineBox title="Trục quyết định với LDH">
        Với thoát vị đĩa đệm, trục "tải trọng cột sống" được ưu tiên cao. Hai loại chuyển động cần đặc biệt thận trọng: <strong>tải dồn nén dọc trục lặp lại</strong> (nhảy, chạy nền cứng) và <strong>gập/xoay cột sống dưới lực</strong> (xoay người mạnh, cúi nâng nặng). Xếp hạng cột sống dưới đây chủ yếu theo hai yếu tố này.
      </SpineBox>

      <div style={sectionNum}>2.2</div>
      <h2 style={h2}>Hồ sơ từng môn</h2>
      <p style={{ ...prose, marginBottom: "1.25rem" }}>Xếp từ thân thiện cột sống nhất đến cần thận trọng nhất. Nhãn góc phải là mức tải trọng lên cột sống.</p>

      <SportCard name="Đi bộ nhanh / Zone 1" tags={["Không thiết bị", "Mọi nơi", "Nền tảng NEAT"]}
        cardio="Thấp–TB" strength="Thấp" spine="Tải rất thấp" spineTone={C.teal}
        forWho="Mọi người, mọi cấp độ. Nền tảng không thể thiếu cho người bận rộn — tích vào mọi khe hở trong ngày."
        caution="Gần như không có. Nền bằng phẳng, tránh dốc xuống dài. An toàn nhất trong giai đoạn phục hồi cấp."
        start="Cadence 110–120, thân thẳng. 20–30 phút, tăng thời lượng trước khi tăng tốc." />

      <SportCard name="Bơi" tags={["Cần bể", "Toàn thân", "Không tác động"]}
        cardio="Cao" strength="TB" spine="Tải thấp*" spineTone={C.teal}
        forWho="Người muốn cardio mạnh không có lực tác động. Lực đẩy nước giảm tải dọc trục gần như hoàn toàn."
        caution="Không phải 'phép màu' như thường nghe. Sải bướm và ếch tạo ưỡn/xoay lặp lại — tránh. Sải ngửa và sải sấp giữ trung tính là an toàn nhất. Cẩn thận ưỡn cổ khi thở."
        start="Sải ngửa hoặc sải sấp với thở nghiêng. Giữ core nhẹ tránh võng lưng." />

      <SportCard name="Đạp xe" tags={["Cần xe", "Không tác động", "Dễ đo tải"]}
        cardio="Cao" strength="TB (chân)" spine="Tải thấp–TB" spineTone={C.teal}
        forWho="Người muốn cardio bền không tác động. Xe tại chỗ kiểm soát cường độ chính xác, tốt cho Zone 2 và HIIT."
        caution="Tư thế cúi dài (xe đua) gập cột sống kéo dài — chọn tư thế thẳng lưng. Chỉnh yên/ghi-đông giữ lưng trung tính."
        start="Xe tại chỗ tư thế thẳng, yên đúng chiều cao. 20–30 phút Zone 2, thân trên thả lỏng." />

      <SportCard name="Tai chi / Yoga phục hồi" tags={["Không thiết bị", "Nhẹ nhàng", "Thăng bằng + core"]}
        cardio="Thấp" strength="Thấp–TB" spine="Tải thấp*" spineTone={C.teal}
        forWho="Người muốn vận động nhẹ, cải thiện thăng bằng, mobility, kiểm soát cơ sâu. Bằng chứng tốt cho lo âu/trầm cảm và low back pain mạn."
        caution="Yoga có tư thế gập sâu và xoắn vặn — nguy hiểm nếu sai. Cần người hướng dẫn biết tình trạng LDH; tránh forward fold sâu, deep twist. Tai chi nhìn chung an toàn hơn yoga về khoản này."
        start="Tai chi: lớp cơ bản, chậm. Yoga: chọn restorative, báo trước tình trạng cột sống, tránh mọi tư thế gây đau." />

      <SportCard name="Khiêu vũ (dancing)" tags={["Nghệ thuật + vận động", "Vui, xã hội", "Thần kinh-cơ mạnh"]}
        cardio="TB–cao" strength="TB" spine="Tải thấp–TB*" spineTone={C.teal}
        forWho="Người muốn vận động mang tính nghệ thuật, nhịp điệu, xã hội — adherence rất cao vì vui và có âm nhạc. Bằng chứng mạnh: giảm tử vong tim mạch (một số nghiên cứu cho thấy mạnh hơn cả đi bộ), cải thiện thăng bằng, và tác động lên não/nhận thức (neuroplasticity) vượt các bài tập lặp lại đơn điệu. Phối hợp nhịp điệu + trí nhớ động tác rèn trực tiếp trụ cột thần kinh-cơ."
        caution="Rủi ro rất khác nhau tùy phong cách. Các điệu có xoay người mạnh, ưỡn lưng sâu, nhảy-tiếp đất (một số latin, ballet, breakdance) tạo tải gập-xoay-dồn nén cần thận trọng với LDH. Các điệu mượt, ít va đập (ballroom chậm, một số social dance) an toàn hơn nhiều. Giày và sàn phù hợp giảm tải khớp."
        start="Chọn phong cách ít va đập, nhịp vừa. Báo người dạy về tình trạng cột sống. Bắt đầu buổi ngắn, giữ thân trên kiểm soát, tránh xoay-ưỡn tối đa cho tới khi core vững." />

      <SportCard name="Nghệ thuật chuyển động / võ đạo biểu diễn" tags={["Nghệ thuật + vận động", "Toàn thân", "Phối hợp cao"]}
        cardio="Cao" strength="TB–cao" spine="Tải TB–cao†" spineTone={C.amber}
        forWho="Người muốn kết hợp biểu đạt nghệ thuật với vận động cường độ cao và kỹ năng — như capoeira, wushu biểu diễn, múa đương đại, hoặc thể dục nghệ thuật. Rèn đồng thời sức mạnh, power, phối hợp, nhịp điệu và trí nhớ chuỗi động tác. Giống khiêu vũ ở tính nghệ thuật nhưng đòi hỏi thể lực và kỹ thuật cao hơn, nên cũng thử thách hơn."
        caution="Chứa nhiều động tác rủi ro cho LDH: xoay bùng nổ, đá cao (ưỡn), nhảy-tiếp đất mạnh, chống ngược. Cần nền tảng core và kiểm soát thần kinh-cơ vững trước khi bắt đầu. Không phải môn để khởi đầu khi cột sống chưa ổn định."
        start="Chỉ khi core khỏe và LDH ổn định. Học cơ bản chậm với người dạy biết tình trạng cột sống, tách riêng và làm chủ từng động tác trước khi ghép chuỗi tốc độ cao. Bỏ qua động tác chống ngược/nhảy mạnh giai đoạn đầu." />

      <SportCard name="Tập kháng lực (tạ/bodyweight)" tags={["Thiết bị tùy chọn", "Trụ cột sức mạnh", "Chống sarcopenia"]}
        cardio="Thấp" strength="Cao" spine="Tải TB–cao†" spineTone={C.amber}
        forWho="Bắt buộc với mọi người sau 30 để chống mất cơ. Với LDH, vừa là rủi ro vừa là liệu pháp — cơ mạnh bảo vệ cột sống."
        caution="Deadlift nặng, squat sâu, leg press, mọi động tác gập/xoay dưới tải làm tăng mạnh áp lực nội đĩa. Nhóm cần kỹ thuật đúng nhất. Giữ cột sống trung tính tuyệt đối."
        start="Bắt đầu bodyweight và anti-rotation (bird-dog, side plank, hip hinge không tạ). Thêm tải rất chậm, kỹ thuật trước khối lượng." />

      <SportCard name="Chạy bộ" tags={["Ít thiết bị", "Hiệu quả thời gian", "VO2max mạnh"]}
        cardio="Rất cao" strength="Thấp–TB" spine="Tải TB–cao†" spineTone={C.amber}
        forWho="Người muốn cardio hiệu quả nhất theo thời gian, thích mục tiêu tiến bộ đo được (5km, 10km, half marathon)."
        caution="Mỗi bước 1.6–3.6× trọng lượng cơ thể lên cột sống. Chống chỉ định giai đoạn cấp/còn triệu chứng thần kinh. Chỉ chạy khi đĩa đệm ổn định và core đủ mạnh. Nền mềm, cadence cao (170–180), thân thẳng."
        start="Chỉ sau khi đi bộ 30 phút không đau. Walk-run trên nền mềm. Xem Phần III cho protocol." />

      <SportCard name="Cầu lông" tags={["Cần sân + bạn chơi", "Vui, xã hội", "Cardio ngắt quãng"]}
        cardio="Cao" strength="TB" spine="Tải cao‡" spineTone={C.coral}
        forWho="Người thích thể thao giải trí, xã hội, động lực tự nhiên cao (dễ duy trì vì vui). Cardio kiểu interval tự nhiên."
        caution="Cần thận trọng nhất với LDH. Chuyển hướng đột ngột, với người xoay cột sống, smash trên cao (ưỡn), dừng-bật nhanh — tạo tải phối hợp gập-xoay-dồn nén, chính xác kiểu rủi ro nhất. Không phải môn để bắt đầu khi cột sống chưa vững."
        start="Chỉ khi core rất khỏe và LDH ổn định lâu dài. Khởi động kỹ, chơi đôi cường độ thấp, tránh với người xoắn và smash tối đa." />

      <div style={{ fontSize: 11.5, color: "var(--color-text-tertiary)", lineHeight: 1.6, marginTop: 4, marginBottom: 12 }}>
        * Tải thấp <em>khi đúng kỹ thuật</em> — sai kỹ thuật đẩy tải lên cao. &nbsp;† Trung bình–cao nhưng <em>kiểm soát được</em>. &nbsp;‡ Cao và <em>khó kiểm soát</em> vì chuyển động phản xạ.
      </div>

      <div style={sectionNum}>2.3</div>
      <h2 style={h2}>Cách lắp "thực đơn" của bạn</h2>
      <p style={prose}>Một tuần tốt không phải một môn lặp lại mà là kết hợp chạm cả ba trụ cột, tôn trọng giới hạn cột sống, vừa lịch trình:</p>
      <div style={card}>
        <Li tone={C.blue}><strong>Một nền cardio ít tải</strong> làm xương sống của tuần: đi bộ Zone 1 hàng ngày + 2–3 buổi Zone 2 (bơi, đạp xe, hoặc chạy nếu đủ điều kiện).</Li>
        <Li tone={C.purple}><strong>Hai buổi sức mạnh</strong> không thể thiếu — bodyweight/anti-rotation là tối thiểu, hệ bảo vệ cột sống.</Li>
        <Li tone={C.teal}><strong>Một hoạt động "vui"</strong> để duy trì động lực (khiêu vũ, cầu lông nếu LDH cho phép, leo núi cuối tuần) — enjoyment quyết định bạn có bền được không (Phần VI). Các hoạt động nghệ thuật-vận động như khiêu vũ đặc biệt tốt ở đây: chúng có adherence cao vì vui, đồng thời rèn thần kinh-cơ mạnh.</Li>
        <Li tone={C.amber}><strong>Ít nhất một ngày phục hồi hoàn toàn</strong> hoặc chỉ Zone 1 — không thương lượng.</Li>
      </div>

      <MistakeBox items={[
        { wrong: "Chọn môn theo trào lưu, không theo cột sống.", fix: "Cầu lông vui nhưng nếu LDH chưa ổn định, nó là môn rủi ro nhất danh sách. Chọn theo cơ thể bạn." },
        { wrong: "Chỉ tập một môn duy nhất.", fix: "Đơn điệu tải lên cùng nhóm mô, tăng chấn thương do lặp lại. Đa dạng phân tán tải và chạm nhiều trục lợi ích." },
        { wrong: "Bỏ sức mạnh vì 'sợ hại lưng'.", fix: "Ngược lại — cơ yếu là nguyên nhân chấn thương lớn. Vấn đề là kỹ thuật, không phải bản thân tập tạ." },
        { wrong: "Coi bơi là 'chữa lành' đĩa đệm.", fix: "Bơi giảm tải và an toàn, nhưng không sửa vòng sợi rách và không thay tập sức mạnh giữ cột sống trung tính khi đứng." },
      ]} />

      <Callout tone={C.coral} kicker="Nhắc lại mệnh lệnh">
        Bảng so sánh này vô dụng nếu bạn không chọn lấy một môn và bắt đầu tuần này. Môn "hoàn hảo" bạn trì hoãn thua xa môn "tạm được" bạn làm đều.
      </Callout>

      <Remember items={[
        "Đánh giá mỗi môn trên 5 trục, không hỏi 'tốt hay không' chung chung.",
        "Với LDH, ưu tiên trục tải cột sống: tránh dồn nén lặp lại và gập/xoay dưới lực.",
        "Lắp thực đơn: nền cardio ít tải + 2 buổi sức mạnh + 1 hoạt động vui + ngày nghỉ.",
        "Đa dạng môn tốt hơn một môn lặp lại — cả an toàn lẫn lợi ích.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB III — THỰC HÀNH TỪNG BUỔI
   ============================================================ */
function PartIII() {
  return (
    <div>
      <div style={sectionNum}>PHẦN III</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Thực hành từng buổi</h2>
      <div style={thesis}>Bất kể môn nào, một buổi tập tốt có cùng kiến trúc. Phần này là phần tra cứu — mở ra khi cần dùng.</div>

      <div style={sectionNum}>3.1</div>
      <h2 style={h2}>Kiến trúc một buổi tập (mọi môn)</h2>
      <p style={prose}>Năm bước áp dụng cho chạy, bơi, cầu lông, tạ — chỉ thay chi tiết phần chính. Với LDH, bước "kích hoạt" không phải tùy chọn: nó bật cơ giữ cột sống trung tính <em>trước khi</em> tải đến.</p>

      <StepBlock title="1. Warmup động" time="5–10 phút" tone={C.teal} items={[
        "3–5 phút vận động nhẹ tăng dần (đi bộ nhanh, jog chậm, đạp nhẹ) — tăng nhiệt độ cơ, lưu lượng máu.",
        "Dynamic stretching: leg swing trước-sau và ngang, hip circle, high knee, butt kick, lateral lunge — mỗi động tác 10–15 nhịp.",
        "Chuyển động có kiểm soát, không giữ tĩnh."
      ]} note="Dynamic stretching cải thiện hiệu suất; static kéo dài trước tập có thể tạm giảm hiệu suất." />

      <StepBlock title="2. Kích hoạt cột sống (cho LDH)" time="3–5 phút" tone={C.rose} items={[
        "Glute bridge 15 nhịp — bật glute.",
        "Clam shell 12 nhịp/bên — gluteus medius, kiểm soát xoay hông.",
        "Dead bug 8 nhịp — transversus abdominis, cơ giữ cột sống sâu nhất.",
        "Bird-dog 8 nhịp/bên — multifidus dọc cột sống."
      ]} note="'Bảo hiểm' cho cột sống. Cơ đã bật sẽ tự giữ trung tính khi tải đến, thay vì phản ứng chậm." />

      <StepBlock title="3. Phần chính" time="tùy môn" tone={C.blue} items={[
        "Nội dung đặc thù từng môn — chạy Zone 2, bơi, interval, tập tạ.",
        "Giữ đúng vùng cường độ dự định, không trôi lên cao vô thức.",
        "Với LDH: ý thức cột sống trung tính suốt buổi, dừng ngay nếu có tín hiệu thần kinh (đau/tê lan chân)."
      ]} />

      <StepBlock title="4. Cooldown" time="5–8 phút" tone={C.teal} items={[
        "Giảm cường độ dần vài phút cuối — không dừng đột ngột.",
        "Static stretching lúc này mới dùng: calf, quad, hamstring, hip flexor, glute — mỗi nhóm 30–45 giây.",
        "Cat-cow nhẹ cho cột sống thắt lưng."
      ]} />

      <StepBlock title="5. Giải nén cột sống (cho LDH)" time="2–3 phút" tone={C.rose} items={[
        "Dead hang treo xà 20–30 giây × 2–3 lần — lực kéo giãn tự nhiên.",
        "Child's pose 60 giây.",
        "Supine knee-to-chest 30 giây/bên."
      ]} note="Bước riêng biệt mà hầu hết guide bỏ qua — giảm áp lực tích lũy lên đĩa đệm." />

      <div style={sectionNum}>3.2</div>
      <h2 style={h2}>Mobility cho người ngồi nhiều — vấn đề cơ-xương đặc trưng</h2>
      <p style={prose}>
        Ngồi 8+ tiếng/ngày tạo một hồ sơ cơ-xương rất đặc trưng, và nó tương tác trực tiếp với thoát vị đĩa đệm. Ba vấn đề chính cần xử lý chủ động, vì chúng làm cột sống chịu tải sai ngay cả khi không tập:
      </p>
      <div style={card}>
        <Li tone={C.amber}><strong>Hip flexor co rút:</strong> ngồi lâu giữ cơ gấp hông ở vị trí ngắn. Khi đứng dậy, chúng kéo khung chậu nghiêng trước, tăng ưỡn thắt lưng — dồn áp lực lên đúng vùng đĩa đệm thắt lưng dưới. Giải: hip flexor stretch (lunge) 30 giây/bên, 2–3 lần/ngày.</Li>
        <Li tone={C.coral}><strong>"Dead butt" (glute ức chế):</strong> ngồi lâu khiến glute ngừng hoạt động đúng cách. Glute yếu buộc lưng dưới bù tải — nguyên nhân đau lưng phổ biến. Giải: glute bridge, clam shell hàng ngày (đã có ở bước kích hoạt).</Li>
        <Li tone={C.blue}><strong>Cổ-vai-gáy do màn hình:</strong> đầu chúi trước tạo tải lên cột sống cổ và căng cơ thang trên. Giải: chin tuck 10 nhịp, doorway chest stretch 30 giây, mỗi 2–3 giờ ngồi.</Li>
      </div>
      <Box tone={C.teal} title="Vi-nghỉ (micro-break) — đòn bẩy rẻ nhất cho người ngồi nhiều">
        Không cần bài tập dài. Đứng dậy đi lại 1–2 phút mỗi 30–45 phút ngồi có tác động lớn hơn nhiều so với một buổi tập bù vào cuối ngày — vì nó ngắt chuỗi tải tĩnh liên tục lên đĩa đệm. Đặt báo nhắc; đây là "exercise snacking" cho cột sống (chi tiết Phần VI).
      </Box>

      <div style={sectionNum}>3.3</div>
      <h2 style={h2}>Dinh dưỡng — nền tảng và quanh buổi tập</h2>
      <div style={subHead}>Nền dinh dưỡng cả ngày (quan trọng hơn timing quanh buổi)</div>
      <div style={card}>
        <Row label="Protein tổng ngày" value="1.6–2.0 g/kg" sub="Rải đều 3–4 bữa, mỗi bữa 20–40g" tone={C.purple} />
        <Row label="Đủ năng lượng" value="Không thiếu hụt mạn" sub="Thiếu calo kéo dài làm hại phục hồi + giấc ngủ" tone={C.amber} />
        <Row label="Thực phẩm chống viêm" value="Rau, cá béo, quả mọng" sub="Hỗ trợ phục hồi mô, giảm viêm nền" tone={C.teal} />
        <Row label="Vi chất liên quan giấc ngủ" value="Magie, vitamin D" sub="Thiếu hụt liên hệ với giấc ngủ kém — kiểm tra nếu nghi ngờ" tone={C.blue} />
        <Row label="Hydrat nền" value="Nước tiểu vàng nhạt" sub="Mất nước nhẹ mạn ảnh hưởng năng lượng + đĩa đệm" tone={C.coral} />
      </div>
      <div style={subHead}>Quanh buổi tập</div>
      <div style={card}>
        <Row label="Trước — buổi dài (>90')" value="Bữa chính 2–3h trước" sub="Carb + đạm nạc, ít xơ/béo" tone={C.amber} />
        <Row label="Trong — buổi <60'" value="Chỉ nước" sub="" tone={C.blue} />
        <Row label="Trong — buổi >90'" value="40–60g carb/giờ + điện giải" sub="Gel/nước đường mỗi 30–45'" tone={C.coral} />
        <Row label="Sau — cửa sổ phục hồi" value="~2 giờ (không phải 30')" sub="Tổng ngày quan trọng hơn timing" tone={C.teal} />
        <Row label="Sau — thành phần" value="1–1.2g/kg carb + 20–25g đạm" sub="Cơm/khoai + trứng/cá/sữa" tone={C.purple} />
      </div>

      <MistakeBox items={[
        { wrong: "Static stretch dài trước khi tập.", fix: "Không giảm chấn thương, có thể giảm hiệu suất. Để static cho cooldown; dùng dynamic trước tập." },
        { wrong: "Bỏ warmup vì 'thiếu thời gian'.", fix: "5 phút warmup rẻ hơn nhiều vài tuần chấn thương. Với LDH, bước kích hoạt không thương lượng." },
        { wrong: "Ám ảnh 'cửa sổ 30 phút' sau tập.", fix: "Cửa sổ thực ~2 giờ; tổng protein/carb cả ngày mới là yếu tố chính. Chỉ gấp nếu tập lại trong 24h." },
        { wrong: "Coi dinh dưỡng chỉ là chuyện quanh buổi tập.", fix: "Nền cả ngày (protein tổng, đủ calo, đủ nước) quan trọng hơn. Người thiếu protein nền không phục hồi nổi dù ăn đúng sau tập." },
        { wrong: "Ngồi liên tục rồi 'bù' bằng 1 buổi tập.", fix: "Buổi tập không xóa được 8h tải tĩnh lên đĩa đệm. Vi-nghỉ mỗi 30–45 phút mới giải quyết gốc." },
      ]} />

      <SpineBox>
        Với buổi dài, tải tích lũy lên đĩa đệm là mối lo thực. Ba điều chỉnh: (1) chọn môn ít tải cho buổi dài — đạp xe/bơi dài an toàn hơn chạy dài; (2) nếu chạy dài, xen quãng đi bộ giảm tải liên tục; (3) sau buổi dài, ưu tiên giải nén và theo dõi 24h — đau lan chân hoặc tê mới xuất hiện là tín hiệu dừng, không phải "đau cơ bình thường".
      </SpineBox>

      <Callout tone={C.coral} kicker="Nhắc lại mệnh lệnh">
        Kiến trúc buổi tập này chỉ có giá trị khi bạn thực sự bước ra và làm nó. Đọc về warmup không làm nóng cơ nào cả.
      </Callout>

      <Remember items={[
        "Mọi buổi theo kiến trúc 5 bước; kích hoạt cột sống là bước riêng cho LDH.",
        "Dynamic trước tập, static sau tập — không đảo ngược.",
        "Người ngồi nhiều: xử lý hip flexor, glute, cổ-vai + vi-nghỉ mỗi 30–45 phút.",
        "Nền dinh dưỡng cả ngày (protein 1.6–2.0g/kg, đủ calo, đủ nước) quan trọng hơn timing.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB IV — PHỤC HỒI & GIẤC NGỦ  (trọng tâm chuyên sâu)
   ============================================================ */
function PartIV() {
  return (
    <div>
      <div style={sectionNum}>PHẦN IV</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Phục hồi & Giấc ngủ</h2>
      <div style={thesis}>Đây là phần chứng minh luận điểm trung tâm: phục hồi không phải "thời gian chết" giữa các buổi tập — nó là nơi mọi thích nghi thực sự diễn ra. Và trong phục hồi, giấc ngủ là công cụ mạnh nhất. Phần này đào sâu giấc ngủ, đặc biệt cho kiểu khó đi vào giấc ngủ do đầu óc quá tải.</div>

      {/* ---- SLEEP FUNDAMENTALS (condensed) ---- */}
      <div style={sectionNum}>4.1</div>
      <h2 style={h2}>Hai hệ thống điều khiển giấc ngủ</h2>
      <p style={prose}>
        Hiểu hai hệ thống này là chìa khóa để hiểu <em>vì sao</em> bạn khó ngủ — và mọi kỹ thuật hiệu quả đều tác động vào một trong hai:
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div style={{ ...card, marginBottom: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.blue.text, marginBottom: 6 }}>Áp lực ngủ (homeostatic)</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Adenosine tích tụ càng lâu bạn thức càng nhiều, tạo "sức nặng" buồn ngủ. Ngủ trưa dài hoặc caffeine làm giảm áp lực này — khiến khó ngủ tối.</div>
        </div>
        <div style={{ ...card, marginBottom: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.amber.text, marginBottom: 6 }}>Nhịp sinh học (circadian)</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Đồng hồ 24h điều melatonin và nhiệt độ cơ thể. Ánh sáng sáng khóa nó đúng giờ; ánh sáng xanh tối đẩy lùi giờ buồn ngủ.</div>
        </div>
      </div>
      <Callout tone={C.coral} kicker="Vấn đề cốt lõi với người bận rộn — hệ thống thứ ba xen vào">
        Với người làm việc cường độ cao, thường không phải áp lực ngủ hay nhịp sinh học bị hỏng — mà là một lực thứ ba lấn át cả hai: <strong>tăng kích hoạt (hyperarousal)</strong>. Cơ thể mệt (áp lực ngủ cao), đến giờ ngủ (nhịp sinh học đúng), nhưng hệ thần kinh <em>từ chối tắt</em>. Đây là trạng thái "wired but tired" — mệt rã rời mà đầu óc vẫn chạy.
      </Callout>

      {/* ---- HYPERAROUSAL DEEP DIVE ---- */}
      <div style={sectionNum}>4.2</div>
      <h2 style={h2}>Hiểu đúng vấn đề: tăng kích hoạt (hyperarousal)</h2>
      <p style={prose}>
        Đây là mô hình được mọi lý thuyết hiện đại về mất ngủ công nhận là cơ chế cốt lõi. Ở người làm việc nhiều mảng, đầu óc luôn ở "chế độ phân tích cảnh giác", hệ trục stress HPA tiết cortisol cao kéo dài thay vì hạ xuống buổi tối. Kết quả: bạn nằm xuống nhưng não vẫn xử lý công việc, lập kế hoạch, lo lắng — không phải vì bạn muốn, mà vì hệ thần kinh chưa chuyển khỏi trạng thái kích hoạt ban ngày.
      </p>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8 }}>Tăng kích hoạt có ba tầng — cần can thiệp đúng tầng</div>
        <Li tone={C.purple}><strong>Nhận thức (cognitive):</strong> suy nghĩ dồn dập, lập kế hoạch, lo lắng, "não không tắt". → cần công cụ nhận thức.</Li>
        <Li tone={C.blue}><strong>Cơ thể (somatic):</strong> tim đập nhanh, căng cơ, nghiến răng, thở nông. → cần công cụ sinh lý.</Li>
        <Li tone={C.coral}><strong>Điều kiện hóa (conditioned):</strong> chính chiếc giường trở thành tín hiệu tỉnh táo do liên kết lặp lại "giường = vật lộn". → cần tái điều kiện hóa.</Li>
      </div>
      <Box tone={C.amber} title="Vì sao 'cố thư giãn' không hiệu quả">
        Điểm mấu chốt các chuyên gia nhấn mạnh: nhiều người cùng lúc bị cả ba tầng, nên can thiệp một tầng chỉ đạt hiệu quả một phần. Và bản thân việc "cố ép mình ngủ" hoặc "cố thư giãn" là một nỗ lực nhận thức — nó <em>tăng</em> kích hoạt thay vì giảm. Một dấu hiệu kinh điển: bạn ngủ gật dễ trên ghế sofa nhưng tỉnh như sáo khi lên giường "chính thức đi ngủ" — đó là điều kiện hóa, không phải thiếu buồn ngủ.
      </Box>

      {/* ---- CBT-I TOOLKIT ---- */}
      <div style={sectionNum}>4.3</div>
      <h2 style={h2}>Bộ công cụ CBT-I — theo từng tầng</h2>
      <p style={prose}>
        CBT-I là liệu pháp hàng đầu cho mất ngủ mạn, được mọi hướng dẫn lâm sàng khuyến cáo trên thuốc vì hiệu quả bền vững không lệ thuộc. Nó không phải "một mẹo" mà là bộ công cụ nhắm từng tầng kích hoạt. Dưới đây là các thành phần có bằng chứng mạnh nhất, sắp theo tầng chúng nhắm tới.
      </p>

      <div style={subHead}>Tầng điều kiện hóa — mạnh nhất về bằng chứng</div>
      <StepBlock title="Kiểm soát kích thích (Stimulus Control)" tone={C.coral} items={[
        "Chỉ lên giường khi thực sự buồn ngủ — không phải 'đến giờ'.",
        "Nằm quá 15–20 phút không ngủ được: RỜI giường, sang phòng khác làm việc nhàm chán dưới ánh sáng dịu (không điện thoại), quay lại khi buồn ngủ.",
        "Không làm việc/xem TV/lo lắng/ăn trên giường — giường chỉ để ngủ.",
        "Giờ DẬY cố định bất kể đêm ngủ được bao nhiêu."
      ]} note="Phản trực giác nhưng là kỹ thuật bằng chứng mạnh nhất — dạy lại não rằng giường = ngủ, không phải giường = vật lộn." />
      <StepBlock title="Hạn chế giấc ngủ (Sleep Restriction) — mạnh nhất theo meta-analysis" tone={C.purple} items={[
        "Nghịch lý: tạm thời GIẢM thời gian nằm giường xuống gần bằng thời gian ngủ thực (vd chỉ ngủ 6h thì chỉ nằm giường ~6h).",
        "Điều này tăng áp lực ngủ, khiến bạn ngủ nhanh và sâu hơn — nâng 'hiệu suất giấc ngủ'.",
        "Khi ngủ ngon và liền mạch (hiệu suất >90%), nới thời gian nằm giường thêm 15–20 phút mỗi tuần.",
        "Bước khó nhất của CBT-I, nhưng phân tích tổng hợp cho thấy đây là thành phần hiệu quả nhất (d≈−0.45)."
      ]} note="Nên làm có hướng dẫn của chuyên gia nếu triệu chứng nặng — thực hiện sai (cắt quá nhiều) gây buồn ngủ ban ngày nguy hiểm." />

      <div style={subHead}>Tầng nhận thức — cho 'não không tắt'</div>
      <StepBlock title="Lo lắng có cấu trúc (Constructive Worry)" tone={C.amber} items={[
        "Khác brain dump đơn thuần: không chỉ liệt kê lo lắng mà VIẾT LUÔN bước hành động kế tiếp cho mỗi mục.",
        "Làm vào đầu buổi tối (không phải trước ngủ), 15 phút, trên giấy.",
        "Nghiên cứu (Carney & Waters): nhóm 'constructive worry' giảm kích hoạt nhận thức trước ngủ và thức ít hơn so với nhóm chỉ liệt kê lo lắng.",
        "Cơ chế: não giữ 'vòng lặp nhắc nhở' cho việc chưa có hướng giải quyết — viết bước kế tiếp là cách đóng vòng lặp đó."
      ]} note="Với người làm nhiều mảng: đây là công cụ trúng đích nhất. Đầu óc chạy đêm thường vì nhiều việc chưa 'được giao một bước tiếp theo'." />
      <StepBlock title="Cognitive Shuffle — khi suy nghĩ nhảy loạn xạ" tone={C.purple} items={[
        "Chọn một từ bất kỳ (vd 'GIƯỜNG'); với mỗi chữ cái nghĩ ra loạt từ ngẫu nhiên và hình dung từng cái.",
        "Hết từ hoặc chán một chữ, chuyển chữ khác.",
        "Chiếm working memory đủ để cắt vòng suy nghĩ, nhưng đủ nhẹ để không giữ não tỉnh giải quyết vấn đề — mô phỏng cách não tự trôi vào giấc ngủ."
      ]} note="Phân biệt: rumination (lặp quanh MỘT vấn đề) → constructive worry; racing thoughts (nhảy giữa NHIỀU chủ đề) → cognitive shuffle." />

      <div style={subHead}>Tầng cơ thể — hạ kích hoạt sinh lý</div>
      <StepBlock title="Thở & giãn cơ" tone={C.blue} items={[
        "Thở chậm kéo dài thì thở ra (vd hít 4 – thở ra 6–8): kích hoạt phó giao cảm, hạ nhịp tim.",
        "Giãn cơ tuần tiến (progressive muscle relaxation): căng rồi thả từng nhóm cơ, dạy cơ thể nhận biết và buông căng thẳng.",
        "Cả hai có bằng chứng RCT giảm kích hoạt cơ thể trước ngủ."
      ]} note="Làm như một phần wind-down, không phải 'vũ khí cuối cùng' khi đã bực vì không ngủ được." />

      {/* ---- BUFFER ZONE / OVERWORK ---- */}
      <div style={sectionNum}>4.4</div>
      <h2 style={h2}>Chuyên sâu cho người quá tải công việc: vùng đệm</h2>
      <p style={prose}>
        Vấn đề thực tế nhất với người bận rộn không phải "không biết cách ngủ" mà là cửa sổ ngủ bị nén bởi công việc kéo đến khuya — cơ thể vẫn ở trạng thái kích hoạt giao cảm cao khi cố lên giường ngay sau khi đóng laptop. Não không có "công tắc tắt tức thì".
      </p>
      <Callout tone={C.purple} kicker="Nguyên tắc vùng đệm (buffer zone)">
        Tạo một khoảng bắt buộc 30–60 phút giữa lúc dừng làm việc và lúc lên giường, dành cho hoạt động chuyển trạng thái — không phải xa xỉ mà là điều kiện sinh lý để hệ thần kinh hạ kích hoạt. Bỏ vùng đệm là lý do phổ biến nhất khiến người bận rộn "lên giường mà não vẫn họp".
      </Callout>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8 }}>Thiết kế vùng đệm 45–60 phút</div>
        <Row label="Ngay khi đóng việc" value="Constructive worry 15'" sub="Đóng gói mọi việc dang dở + bước kế tiếp" tone={C.amber} />
        <Row label="Giảm ánh sáng" value="Chuyển sang đèn vàng ấm" sub="Báo hiệu nhịp sinh học sắp ngủ" tone={C.blue} />
        <Row label="Hạ nhiệt cơ thể" value="Tắm ấm 1–2h trước ngủ" sub="Giãn mạch → thoát nhiệt → hạ nhiệt lõi" tone={C.teal} />
        <Row label="Hoạt động 'nhàm' dễ chịu" value="Đọc sách giấy, nghe nhạc nhẹ" sub="Không màn hình, không kích thích nhận thức" tone={C.purple} />
        <Row label="Cắt input công việc" value="Tắt thông báo theo khung giờ" sub="Chỉ tắt thông báo đã cải thiện detachment rõ rệt" tone={C.coral} />
      </div>
      <Box tone={C.rose} title="Insight sâu: 'work-recovery guilt'">
        Nghiên cứu tổ chức học phát hiện: ở môi trường văn hóa làm việc quá giờ, người ta phát triển cảm giác tội lỗi khi cho phép bản thân nghỉ — và chính cảm giác đó, không phải khối lượng công việc, giữ hệ thần kinh kích hoạt buổi tối. Bạn có thể đã dừng làm việc nhưng não vẫn "thấy sai" khi nghỉ. Nhận diện và đặt tên cảm giác này là bước đầu để tách nó khỏi phản ứng tự động. (Khả năng "tách rời tâm lý" khỏi công việc — psychological detachment — được đào sâu ở Phần VI.)
      </Box>

      {/* ---- SLEEP DEBT + ARCHITECTURE (condensed) ---- */}
      <div style={sectionNum}>4.5</div>
      <h2 style={h2}>Hai sự thật về nợ ngủ và kiến trúc giấc ngủ</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
        <Stat value="90'" label="một chu kỳ ngủ" tone={C.teal} />
        <Stat value="~17%" label="người có nợ ngủ bù được bằng cuối tuần" tone={C.coral} />
        <Stat value="7 đêm" label="để hồi phục sau 10 đêm thiếu ngủ" tone={C.amber} />
      </div>
      <Li tone={C.blue}><strong>Kiến trúc:</strong> ngủ sâu (phục hồi thể chất, đỉnh growth hormone) tập trung đầu đêm; REM (phục hồi nhận thức, cảm xúc) tập trung cuối đêm. Ngủ muộn cắt ngủ sâu; dậy sớm cắt REM — hai kiểu thiếu ngủ khác nhau, không bù nhau.</Li>
      <Li tone={C.coral}><strong>Nợ ngủ:</strong> không trả được một cục cuối tuần. Sau 2 tuần ngủ 6h/đêm, hiệu suất nhận thức giảm tương đương say rượu — và bạn <em>không nhận ra</em> mức suy giảm của mình. Trả góp mỗi đêm (ngủ sớm hơn 30–60 phút), giữ giờ dậy đều.</Li>

      <MistakeBox items={[
        { wrong: "Cố nằm im ép bản thân ngủ.", fix: "Nỗ lực ép ngủ là hoạt động nhận thức làm TĂNG kích hoạt. Rời giường nếu quá 20 phút." },
        { wrong: "Lên giường ngay sau khi đóng laptop.", fix: "Não không có công tắc tắt tức thì. Vùng đệm 30–60 phút là điều kiện sinh lý, không phải xa xỉ." },
        { wrong: "Ngủ bù cuối tuần để 'trả nợ'.", fix: "Không hiệu quả + gây social jet lag. Trả góp mỗi đêm, giữ giờ dậy đều." },
        { wrong: "Rượu để dễ ngủ.", fix: "Ngủ nhanh hơn nhưng phá REM nửa sau đêm. 'Ngủ được' không bằng 'ngủ chất lượng'." },
        { wrong: "Nằm giường lâu để 'bù' cho đêm mất ngủ.", fix: "Nằm giường lâu mà không ngủ làm giảm hiệu suất giấc ngủ và củng cố điều kiện hóa xấu. Ngược với sleep restriction." },
      ]} />

      <SpineBox>
        Giấc ngủ với LDH có hai lớp. Thứ nhất, đây là thời gian đĩa đệm tái hydrat hóa — thiếu ngủ làm quá trình này kém hiệu quả. Thứ hai, tư thế ngủ là một phần điều trị: nằm nghiêng gối kẹp giữa hai gối giữ cột sống trung tính; tránh nằm sấp (ưỡn thắt lưng + xoay cổ kéo dài); nệm không quá mềm. Buổi sáng đĩa đệm căng nước và cứng hơn — dậy bằng cách lăn nghiêng rồi chống tay ngồi lên, tránh gập bụng thẳng dậy đột ngột.
      </SpineBox>

      <Box tone={C.coral} title="Khi nào cần chuyên gia">
        Nếu khó ngủ kéo dài trên 3 tháng, ≥3 đêm/tuần, ảnh hưởng rõ chức năng ban ngày — đây là ngưỡng mất ngủ mạn tính, không còn là stress tạm thời. CBT-I với chuyên gia được đào tạo hiệu quả hơn tự áp dụng, và cũng là lúc loại trừ nguyên nhân khác (ngưng thở khi ngủ, rối loạn nhịp sinh học). Đây là chủ đề đáng đầu tư đúng mức vì giấc ngủ chi phối mọi thứ khác.
      </Box>

      <Callout tone={C.coral} kicker="Nhắc lại mệnh lệnh">
        Các kỹ thuật này chỉ hiệu quả khi làm đều đặn nhiều đêm, không phải thử một lần rồi bỏ. Tái điều kiện hóa giấc ngủ mất 2–6 tuần thực hành nhất quán — như tập cơ, hệ thần kinh cần lặp lại để thay đổi.
      </Callout>

      <Remember items={[
        "Với người bận rộn, vấn đề thường là hyperarousal — não không tắt, không phải thiếu buồn ngủ.",
        "Nhắm đúng tầng: điều kiện hóa (stimulus control, sleep restriction), nhận thức (constructive worry, cognitive shuffle), cơ thể (thở, giãn cơ).",
        "Vùng đệm 30–60 phút giữa công việc và giường là bắt buộc, không xa xỉ.",
        "Trả nợ ngủ góp mỗi đêm; giữ giờ dậy cố định là đòn bẩy chính. Kiên trì 2–6 tuần.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB V — THEO DÕI & THÍCH ỨNG  (mảng mới)
   ============================================================ */
function PartV() {
  return (
    <div>
      <div style={sectionNum}>PHẦN V</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Theo dõi & Thích ứng</h2>
      <div style={thesis}>Người bận rộn không có thời gian để thử-sai. Biết đọc tín hiệu cơ thể — đang tiến bộ hay đang quá tải — và biết cách xoay xở khi cuộc sống phá kế hoạch là kỹ năng quyết định duy trì. Đây là phần biến lý thuyết thành khả năng tự điều chỉnh.</div>

      <div style={sectionNum}>5.1</div>
      <h2 style={h2}>Đọc tín hiệu quá tải trước khi thành chấn thương</h2>
      <p style={prose}>
        Overtraining hiếm khi đến đột ngột — nó tích tụ qua các dấu hiệu bị bỏ qua. Với người vừa làm việc căng vừa tập, ranh giới giữa "mệt do tập" và "mệt do cuộc sống" mờ đi, và cơ thể không phân biệt hai loại stress. Dưới đây là các tín hiệu đọc được mà không cần thiết bị:
      </p>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8 }}>Dấu hiệu chủ quan — theo dõi hàng ngày</div>
        <Li tone={C.coral}>Nhịp tim nghỉ buổi sáng cao hơn bình thường 5–10 nhịp trong nhiều ngày.</Li>
        <Li tone={C.coral}>Giấc ngủ xấu đi dù mệt (dấu hiệu giao cảm quá hoạt).</Li>
        <Li tone={C.coral}>Động lực tập giảm rõ, cáu gắt, tâm trạng đi xuống.</Li>
        <Li tone={C.coral}>Hiệu suất chững hoặc giảm dù vẫn tập đều.</Li>
        <Li tone={C.coral}>Đau nhức kéo dài, dễ ốm vặt hơn (miễn dịch suy).</Li>
      </div>
      <Box tone={C.amber} title="Overreaching vs Overtraining — phân biệt quan trọng">
        Một đợt tập nặng ngắn gây giảm hiệu suất tạm thời rồi bật lên sau khi phục hồi — gọi là "functional overreaching", đó là bình thường và có lợi. Vấn đề là khi không phục hồi đủ, nó trượt thành "non-functional overreaching" rồi overtraining thực sự — có thể mất hàng tháng để hồi phục. Ranh giới nằm ở phục hồi, không ở khối lượng tập. Đây chính là luận điểm trung tâm của tài liệu, biểu hiện ở cấp độ tuần.
      </Box>

      <div style={sectionNum}>5.2</div>
      <h2 style={h2}>HRV — công cụ định lượng cho ai muốn dữ liệu</h2>
      <p style={prose}>
        Biến thiên nhịp tim (HRV) đo khoảng cách giữa các nhịp tim — phản ánh cân bằng hệ thần kinh tự chủ. HRV cao nghĩa là cơ thể đáp ứng linh hoạt, phục hồi tốt; HRV thấp cho thấy hệ giao cảm đang trội (stress, mệt, mất nước). Quan trọng: HRV phản ánh <em>cả stress tinh thần</em>, không chỉ stress tập luyện — rất phù hợp cho người vừa làm việc căng vừa tập.
      </p>
      <div style={card}>
        <Row label="Cách đo" value="Sáng, ngay khi thức, nằm yên" sub="App điện thoại (rMSSD) đủ dùng cho cá nhân" tone={C.blue} />
        <Row label="Đọc thế nào" value="Xu hướng, không phải con số đơn lẻ" sub="So với baseline của chính bạn, không so người khác" tone={C.teal} />
        <Row label="HRV thấp nhiều ngày" value="Tín hiệu giảm tải" sub="Chuyển sang Zone 1 hoặc nghỉ" tone={C.coral} />
        <Row label="Giá trị y khoa" value="HRV thấp mạn liên hệ tăng nguy cơ tử vong" sub="Phân tích 38.000 người: nhóm thấp nhất +56%" tone={C.purple} />
      </div>
      <Box tone={C.amber} title="Giữ HRV đúng vị trí — đừng thành nô lệ dữ liệu">
        HRV hữu ích nhưng không hoàn hảo: nó dao động do nhiều yếu tố (rượu, thiếu ngủ, bệnh), và bằng chứng về khả năng dự đoán overreaching còn nhiều tranh cãi về phương pháp. Dùng nó như <em>một</em> tín hiệu bên cạnh cảm nhận chủ quan, không phải mệnh lệnh tuyệt đối. Người không muốn dùng thiết bị vẫn theo dõi tốt bằng nhịp tim nghỉ buổi sáng và các dấu hiệu chủ quan ở mục 5.1.
      </Box>

      <div style={sectionNum}>5.3</div>
      <h2 style={h2}>Đo tiến bộ: bạn có đang đi đúng hướng?</h2>
      <p style={prose}>Theo dõi quá tải là một nửa; nửa kia là xác nhận bạn đang tiến bộ. Vài chỉ số đơn giản, đo định kỳ (vài tuần một lần):</p>
      <div style={card}>
        <Row label="Nhịp tim nghỉ" value="Giảm dần theo tháng" sub="Dấu hiệu tim khỏe lên" tone={C.teal} />
        <Row label="Cùng pace, HR thấp hơn" value="Aerobic base cải thiện" sub="Hoặc cùng HR đi được xa hơn" tone={C.blue} />
        <Row label="Đứng một chân (mắt nhắm)" value="Giữ lâu hơn" sub="Thăng bằng — trụ cột thứ ba" tone={C.purple} />
        <Row label="Sức mạnh (số rep/tạ)" value="Tăng dần" sub="Chống sarcopenia đang hiệu quả" tone={C.amber} />
        <Row label="Phục hồi nhanh hơn" value="Ít đau, khỏe lại sớm" sub="Dấu hiệu thể lực nền tốt lên" tone={C.coral} />
      </div>

      <div style={sectionNum}>5.4</div>
      <h2 style={h2}>Tuần nhẹ có chủ đích (deload): lùi một bước để tiến hai</h2>
      <p style={prose}>
        Đây là nguyên tắc chuyên nghiệp mà người tập nghiệp dư hầu như luôn bỏ qua: tiến bộ không tuyến tính. Nếu cứ tăng tải đều đặn mãi, bạn sẽ chạm trần rồi trượt vào quá tải. Vận động viên giải quyết bằng cách chủ động xen <strong>tuần nhẹ (deload)</strong> — cứ 3–4 tuần tăng tải thì có một tuần giảm 30–50% khối lượng — để cơ thể "bắt kịp" và siêu bù. Đây chính là luận điểm trung tâm (thích nghi xảy ra khi phục hồi) áp dụng ở cấp độ nhiều tuần.
      </p>
      <div style={card}>
        <Li tone={C.teal}><strong>Chu kỳ điển hình:</strong> 3 tuần tăng dần → 1 tuần deload (giảm khối lượng, giữ nhẹ cường độ để không mất cảm giác).</Li>
        <Li tone={C.blue}><strong>Deload không phải nghỉ hẳn:</strong> vẫn vận động, chỉ giảm tải. Mục tiêu là phục hồi chủ động, không phải mất thói quen.</Li>
        <Li tone={C.amber}><strong>Dấu hiệu cần deload sớm hơn lịch:</strong> nếu các tín hiệu quá tải ở mục 5.1 xuất hiện, đừng đợi hết chu kỳ — deload ngay.</Li>
        <Li tone={C.purple}><strong>Nghịch lý người bận rộn:</strong> tuần công việc căng thẳng nhất chính là tuần cơ thể ít khả năng chịu tải tập nhất — vì stress công việc và stress tập cộng dồn. Dùng tuần đó làm deload tự nhiên thay vì cố ép cả hai.</Li>
      </div>
      <Callout tone={C.teal} kicker="Điểm mấu chốt">
        Deload không phải phần thưởng cho sự lười biếng — nó là công cụ để tiến bộ nhanh hơn về dài hạn. Người bỏ deload không tiến nhanh hơn; họ chỉ chạm trần và chấn thương sớm hơn.
      </Callout>

      <div style={sectionNum}>5.5</div>
      <h2 style={h2}>Khi cuộc sống phá kế hoạch: nghệ thuật thích ứng</h2>
      <p style={prose}>
        Đây là phần thực tế nhất và bị mọi giáo án bỏ qua. Kế hoạch tập nào rồi cũng bị deadline, công tác, ốm, hoặc con cái phá vỡ. Người duy trì được cả đời không phải người không bao giờ gián đoạn — mà người biết <em>xoay xở khi gián đoạn</em> mà không bỏ cuộc hoàn toàn.
      </p>
      <Callout tone={C.rose} kicker="Nguyên tắc vàng khi bị gián đoạn">
        Đừng để "hoàn hảo" thành kẻ thù của "đủ tốt". Một tuần bận rộn không phải lý do bỏ cả tháng — nó là lúc thu nhỏ về liều tối thiểu để giữ thói quen sống, rồi mở rộng lại khi ổn. Giữ được sợi dây thói quen quan trọng hơn khối lượng của tuần đó.
      </Callout>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8 }}>Kịch bản & cách xử lý</div>
        <Li tone={C.amber}><strong>Tuần deadline khủng khiếp:</strong> hạ về "liều duy trì" — 2 buổi 15–20 phút hoặc chỉ đi bộ + vài lần exercise snacking. Mục tiêu là không đứt thói quen, không phải tiến bộ.</Li>
        <Li tone={C.blue}><strong>Đi công tác:</strong> bodyweight circuit trong phòng khách sạn, đi bộ nhanh, cầu thang bộ. Không cần phòng gym. Chuẩn bị sẵn một "bài không thiết bị" thuộc lòng.</Li>
        <Li tone={C.coral}><strong>Ốm:</strong> quy tắc "trên cổ / dưới cổ" — triệu chứng chỉ ở mũi họng (trên cổ) có thể tập nhẹ; triệu chứng toàn thân/sốt/ngực (dưới cổ) thì nghỉ hoàn toàn. Đừng "tập cho ra mồ hôi khỏi bệnh".</Li>
        <Li tone={C.purple}><strong>Trở lại sau gián đoạn dài:</strong> quy tắc 10% và bắt đầu từ 50–60% mức cũ (Phần I). Đừng cố "bù" ngay — đó là công thức chấn thương.</Li>
      </div>
      <SpineBox>
        Với LDH, gián đoạn có một rủi ro riêng: cơ core yếu đi nhanh khi ngừng tập, làm mất lớp bảo vệ cột sống. Trong bất kỳ tuần bận rộn nào, <strong>ưu tiên giữ 2 bài core</strong> (dead bug, bird-dog — 5 phút) hơn cả buổi cardio. Đây là liều tối thiểu tuyệt đối không bỏ, vì mất nó nghĩa là cột sống mất phòng vệ ngay khi bạn quay lại vận động.
      </SpineBox>

      <MistakeBox items={[
        { wrong: "Bỏ cả tháng vì lỡ một tuần.", fix: "Tư duy 'tất cả hoặc không gì' là kẻ giết thói quen số một. Thu nhỏ về liều tối thiểu, giữ sợi dây." },
        { wrong: "'Bù' khối lượng đã mất khi quay lại.", fix: "Mô liên kết đã mất thích nghi. Bắt đầu 50–60%, tăng dần theo 10%." },
        { wrong: "Tập nặng để 'đổ mồ hôi khỏi ốm'.", fix: "Tập khi sốt/bệnh toàn thân kéo dài bệnh và có rủi ro tim. Quy tắc trên/dưới cổ." },
        { wrong: "Chỉ nhìn con số đơn lẻ (một ngày HRV thấp).", fix: "Đọc xu hướng nhiều ngày kết hợp cảm nhận chủ quan. Một ngày xấu không phải tín hiệu." },
      ]} />

      <Callout tone={C.coral} kicker="Nhắc lại mệnh lệnh">
        Theo dõi và thích ứng chỉ có ý nghĩa nếu bạn đang thực sự tập để mà theo dõi. Và nghịch lý đẹp: chính khả năng thích ứng khi gián đoạn — thay vì bỏ cuộc — mới là điều giữ bạn thực hành được cả đời.
      </Callout>

      <Remember items={[
        "Đọc tín hiệu quá tải sớm: nhịp tim nghỉ, giấc ngủ, động lực, hiệu suất — trước khi thành chấn thương.",
        "HRV là công cụ tốt cho ai thích dữ liệu, nhưng đọc xu hướng, đừng thành nô lệ con số.",
        "Khi cuộc sống phá kế hoạch: thu nhỏ về liều tối thiểu, giữ sợi dây thói quen — đừng bỏ hẳn.",
        "Với LDH, 2 bài core 5 phút là liều tối thiểu tuyệt đối trong mọi tuần bận rộn.",
      ]} />
    </div>
  );
}

/* ============================================================
   TAB VI — DUY TRÌ CẢ ĐỜI
   ============================================================ */
function PartVI() {
  return (
    <div>
      <div style={sectionNum}>PHẦN VI</div>
      <h2 style={{ ...h2, marginTop: 4 }}>Duy trì cả đời</h2>
      <div style={thesis}>Kế hoạch tốt nhất là kế hoạch bạn còn làm sau 10 năm. Câu hỏi quyết định không phải "tập gì" mà "làm sao không bỏ cuộc" — đặc biệt khi bạn đã quá tải với nhiều mảng phải suy nghĩ. Đây là nơi khoa học tuổi thọ, hành vi học và sức khỏe tinh thần gặp nhau.</div>

      <div style={sectionNum}>6.1</div>
      <h2 style={h2}>Vì sao duy trì quan trọng hơn cường độ</h2>
      <Callout tone={C.ink}>
        Lợi ích sức khỏe của vận động đến từ tích lũy qua nhiều năm, không từ vài tháng tập cật lực rồi bỏ. Một kế hoạch "kém hoàn hảo" làm đều 10 năm thắng xa một kế hoạch hoàn hảo bỏ sau 3 tháng.
      </Callout>

      <div style={sectionNum}>6.2</div>
      <h2 style={h2}>Khoa học tuổi thọ: ba con số đáng nhớ</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        <Stat value="VO2max" label="chỉ số dự đoán tử vong mạnh nhất" tone={C.blue} />
        <Stat value="Grip" label="sức mạnh cơ dự đoán tử vong hơn cả huyết áp cao" tone={C.purple} />
        <Stat value="10 giây" label="đứng một chân — dự đoán sống còn tuổi trung niên+" tone={C.teal} />
      </div>
      <Li tone={C.blue}><strong>Tim–hô hấp:</strong> tổng quan trên hơn 20 triệu quan sát xác nhận cardiorespiratory fitness là yếu tố dự đoán bệnh tật và tử vong mạnh, nhất quán nhất ở người trưởng thành.</Li>
      <Li tone={C.purple}><strong>Sức mạnh cơ:</strong> grip strength (proxy cho sức mạnh toàn thân và sarcopenia) dự đoán độc lập tử vong tim mạch, ung thư, hô hấp trên nửa triệu người (UK Biobank).</Li>
      <Li tone={C.teal}><strong>Kiểm soát thần kinh-cơ:</strong> đo qua thăng bằng — không giữ được đứng một chân 10 giây ở tuổi trung niên+ liên hệ nguy cơ tử vong cao hơn rõ rệt. Trụ cột thứ ba, dễ tập, dễ bỏ quên.</Li>
      <Box tone={C.amber} title="Về 'tập quá nhiều gây hại'">
        Giả thuyết đường cong chữ U đang bị bằng chứng gần đây thách thức; với người tập giải trí, ngưỡng gây hại — nếu có — cao hơn nhiều khối lượng thực tế của họ. Với bạn, mối lo thực tế là <em>chấn thương cột sống do tải sai</em>, không phải "tập quá nhiều làm giảm tuổi thọ".
      </Box>

      <div style={sectionNum}>6.3</div>
      <h2 style={h2}>Hành vi học: thiết kế hệ thống thay vì dựa ý chí</h2>
      <p style={prose}>
        Động lực dao động thất thường — không thể dựa vào nó để duy trì dài hạn. Người thành công không có ý chí mạnh hơn; họ thiết kế môi trường sao cho hành vi đúng thành lựa chọn dễ nhất. Bốn cơ chế có bằng chứng:
      </p>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 4 }}>NEAT — vận động ngoài buổi tập</div>
        <div style={{ ...prose, marginBottom: 0 }}>Hai người cùng cân có thể chênh 2000 kcal/ngày chỉ vì mức vận động ngoài tập. Buổi 30 phút không "bù" 8 tiếng ngồi. Leo thang bộ, đi bộ giữa giờ, đứng khi gọi điện — cộng dồn thành biến số lớn.</div>
      </div>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 4 }}>Exercise snacking — chia nhỏ vận động</div>
        <div style={{ ...prose, marginBottom: 0 }}>Bùng nổ ngắn ≤5 phút, lặp nhiều lần/ngày (nghiên cứu 2025) cải thiện thể lực với độ tuân thủ rất cao. Rào cản tâm lý để "bắt đầu" gần như không phụ thuộc độ dài — chia nhỏ giảm số lần phải vượt "ngưỡng khởi động" tốn kém nhất.</div>
      </div>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 4 }}>Temptation bundling — ghép vận động với thứ bạn thích</div>
        <div style={{ ...prose, marginBottom: 0 }}>Chỉ cho phép làm điều bạn thích khi đang vận động: nghe podcast yêu thích chỉ khi đi bộ/chạy; leo núi cuối tuần thành buổi đi chơi. Não mã hóa nó là phần thưởng, không phải chi phí — bạn háo hức thay vì ép buộc.</div>
      </div>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 4 }}>Tiny habits & danh tính</div>
        <div style={{ ...prose, marginBottom: 0 }}>Mục tiêu cực nhỏ ("chỉ xỏ giày") — một khi đã xỏ, bối cảnh đổi và "không tập" tốn công hơn "tập luôn". Gắn hành vi với danh tính ("tôi là người luôn vận động") thay vì kết quả ("cần giảm cân") — danh tính không có điểm kết thúc nên bền hơn, và cho phép một ngày chỉ 5 phút vẫn "tính".</div>
      </div>

      <div style={sectionNum}>6.4</div>
      <h2 style={h2}>Chuyên sâu cho người đa nhiệm, quá tải</h2>
      <p style={prose}>
        Bạn không chỉ bận — bạn quản lý nhiều mảng cùng lúc, mỗi mảng đòi hỏi suy nghĩ và quyết định. Điều này tạo một loại kiệt sức đặc thù mà khối lượng công việc thô không nắm bắt được: <strong>quá tải nhận thức và quá tải quyết định</strong>. Nó ảnh hưởng trực tiếp đến khả năng duy trì vận động.
      </p>
      <Box tone={C.purple} title="Decision fatigue — vì sao 'sẽ quyết sau' là bẫy">
        Mỗi quyết định rút một ít khỏi bể ý chí hữu hạn trong ngày. Người quản lý nhiều mảng cạn bể này sớm — và đến cuối ngày (thường là lúc dự định tập), không còn đủ ý chí để quyết định "có tập không, tập gì". Giải pháp không phải "cố gắng hơn" mà là <strong>loại bỏ quyết định</strong>: lịch tập cố định từ đầu tuần, đồ tập để sẵn, bài tập mặc định thuộc lòng. Biến vận động thành mặc định không cần quyết, giống như đánh răng.
      </Box>
      <Callout tone={C.rose} kicker="Nguyên tắc cho người quá tải">
        Khi tâm trí đã đầy, thứ cuối cùng bạn cần là một kế hoạch tập phức tạp đòi hỏi thêm quyết định. Đơn giản hóa đến mức không cần suy nghĩ. Một lịch cố định "kém tối ưu" mà bạn tự động làm thắng xa một lịch "khoa học" đòi hỏi bạn phải cân nhắc mỗi ngày.
      </Callout>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8 }}>Chiến lược giảm tải nhận thức cho vận động</div>
        <Li tone={C.blue}><strong>Quyết một lần cho cả tuần:</strong> chủ nhật lên lịch cố định, không quyết lại từng ngày.</Li>
        <Li tone={C.teal}><strong>Vận động như nghi thức chuyển trạng thái:</strong> đặt buổi tập ngay ranh giới công việc–nghỉ (tan làm), để nó "đóng vòng lặp" ngày làm việc thay vì là một task thêm.</Li>
        <Li tone={C.amber}><strong>Ghép với constructive worry:</strong> 10 phút "đóng gói" công việc (Phần IV) ngay trước khi đổi giày — để đầu óc không mang việc vào buổi tập.</Li>
        <Li tone={C.purple}><strong>Bài mặc định thuộc lòng:</strong> một circuit không thiết bị bạn có thể làm không cần nghĩ, cho ngày não đã cạn.</Li>
      </div>

      <div style={sectionNum}>6.5</div>
      <h2 style={h2}>Vận động & sức khỏe tinh thần</h2>
      <p style={prose}>
        Vận động có hiệu quả điều trị thực với trầm cảm và lo âu — tổng quan lớn (~80.000 người) cho SMD −0.61 với trầm cảm và −0.47 với lo âu, tương đương hoặc hơn một số thuốc trong so sánh trực tiếp, dù cơ chế khác. Cơ chế: kích thích BDNF (tạo neuron ở hồi hải mã), điều hòa trục stress HPA, giảm viêm thần kinh.
      </p>
      <Box tone={C.coral} title="Nghịch lý cần thành thật">
        Chính triệu chứng trầm cảm (mất động lực, anhedonia) làm giảm khả năng bắt đầu vận động — thứ được kỳ vọng điều trị nó. Đây không phải "lười". Với trầm cảm nhẹ-vừa, vận động là can thiệp hiệu quả; với trầm cảm nặng, thường cần ổn định bằng điều trị khác trước để có đủ năng lượng nền. Vận động là công cụ hỗ trợ mạnh, không thay thế điều trị khi triệu chứng ở mức lâm sàng.
      </Box>
      <div style={subHead}>Psychological detachment — mấu chốt cho người đa nhiệm</div>
      <p style={prose}>
        Với người làm nhiều mảng, chất lượng phục hồi tinh thần phụ thuộc vào khả năng "tách rời tâm lý" khỏi công việc — không chỉ ngừng làm, mà thực sự ngừng nghĩ. Mô hình Stressor-Detachment (Sonnentag) cho thấy đây là yếu tố dự đoán sức khỏe tinh thần mạnh hơn cả tổng số giờ nghỉ. Hai người cùng áp lực, cùng giờ làm, nhưng người "tắt" được tâm lý tốt hơn có kết quả khác hẳn — và điều này liên kết trực tiếp với giấc ngủ ở Phần IV.
      </p>
      <Box tone={C.teal} title="Vận động như công cụ tách rời">
        Một buổi tập sau giờ làm đóng vai trò ranh giới tâm lý giúp não chuyển từ "chế độ công việc" sang "chế độ phục hồi" — có thể hiệu quả tâm lý hơn cùng buổi đó tập sáng hôm sau, vì nó đóng vòng lặp ngày làm việc. Nhưng lưu ý: một buổi chạy mà đầu óc vẫn họp hành trong tâm trí mang lại ít lợi ích hơn nhiều buổi chạy thực sự "có mặt". Đây là lý do vận động, giấc ngủ và sức khỏe tinh thần trong tài liệu này là một hệ thống liên kết, không phải ba chủ đề rời.
      </Box>
      <Box tone={C.coral} title="Khi nào cần chuyên gia — không phải 'cố tập nhiều hơn'">
        Nếu kéo dài trên 2 tuần và ảnh hưởng rõ chức năng sống: mất hứng thú với hầu hết hoạt động từng thích, thay đổi rõ giấc ngủ/khẩu vị, khó tập trung, cảm giác vô vọng/vô giá trị dai dẳng, hoặc bất kỳ ý nghĩ nào về việc không muốn tồn tại — đây là lúc nói chuyện với chuyên gia sức khỏe tâm thần. Nếu bạn đang trải qua điều này, mình có thể giúp tìm nguồn hỗ trợ phù hợp.
      </Box>

      <Callout tone={C.coral} kicker="Mệnh lệnh — lần cuối, và quan trọng nhất">
        Toàn bộ sáu phần của tài liệu này quy về một hành động: bắt đầu, và tiếp tục. Không có kiến thức nào ở đây thay được việc bạn thực sự đứng dậy và vận động, hôm nay và ngày mai và tuần sau. Hãy chọn liều nhỏ nhất bạn chắc chắn làm được, làm nó đều đặn, và để sự bền bỉ — không phải sự hoàn hảo — tạo ra kết quả. Đó là toàn bộ giá trị của tài liệu này, và nó chỉ hiện ra khi bạn thực hành.
      </Callout>

      <Remember items={[
        "Kế hoạch tốt nhất là kế hoạch bạn còn làm sau 10 năm — duy trì thắng cường độ.",
        "Ba trụ cột tuổi thọ: VO2max, sức mạnh cơ, kiểm soát thần kinh-cơ — chạm cả ba.",
        "Người quá tải: loại bỏ quyết định. Lịch cố định, đồ để sẵn, bài mặc định thuộc lòng.",
        "Vận động–giấc ngủ–tinh thần là một hệ thống; 'tách rời tâm lý' quyết định chất lượng phục hồi.",
      ]} />
    </div>
  );
}
