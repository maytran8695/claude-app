import { useState, useMemo } from "react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Serif:ital@0;1&display=swap');
`;

const CONF = {
  high: { label: "Cao", color: "#3E6259", bg: "#E4EBE7" },
  mid: { label: "Trung bình", color: "#A6822F", bg: "#F1E9D6" },
  low: { label: "Thấp", color: "#8B7F6E", bg: "#EAE5DC" },
  struct: { label: "Quy tắc cố định", color: "#2B3A55", bg: "rgba(43,58,85,0.12)" },
};

function ConfPill({ level }) {
  const c = CONF[level];
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        padding: "2px 9px",
        borderRadius: "20px",
        color: c.color,
        background: c.bg,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {c.label}
    </span>
  );
}

function Example({ hv, py, note }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", fontSize: "13.5px", lineHeight: 1.5 }}>
      <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#22201C" }}>{hv}</span>
      <span style={{ color: "#2B3A55", fontFamily: "Inter, sans-serif" }}>→</span>
      <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600, color: "#22201C" }}>{py}</span>
      {note && <span style={{ color: "#8B7F6E", fontSize: "12px" }}>({note})</span>}
    </div>
  );
}

function RuleCard({ rule }) {
  return (
    <div style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "18px 20px", marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "17px", color: "#22201C" }}>
          {rule.from}
          <span style={{ color: "#2B3A55", margin: "0 8px" }}>→</span>
          {rule.to}
        </div>
        <ConfPill level={rule.conf} />
      </div>
      {rule.desc && (
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#5C5548", marginBottom: "12px", lineHeight: 1.5 }}>
          {rule.desc}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "6px 16px", borderTop: "1px dashed rgba(43,58,85,0.25)", paddingTop: "10px" }}>
        {rule.examples.map((ex, i) => (
          <Example key={i} {...ex} />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ margin: "26px 0 12px" }}>
      <h2 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "19px", fontWeight: 700, color: "#22201C", margin: "0 0 4px", borderBottom: "2px solid #2B3A55", display: "inline-block", paddingBottom: "3px" }}>
        {title}
      </h2>
      {subtitle && <div style={{ fontSize: "12.5px", color: "#8B7F6E", marginTop: "4px" }}>{subtitle}</div>}
    </div>
  );
}

/* ---------- Tầng chuyên gia & phản biện ----------
   Cùng vai trò với ExpertBlock / Block("Tranh cãi · giới hạn") trong
   holistic_life.jsx: tách phần "giải thích vì sao quy luật đúng" và phần
   "chỗ tài liệu phổ thông hay nói sai" ra khỏi bảng tra cứu, để bảng tra
   vẫn gọn mà người đọc kỹ vẫn thấy được nền ngữ âm học lịch sử bên dưới. */

const PLUM = "#6B4670";
const RUST = "#A34A3C";

function ProfNote({ title, children }) {
  return (
    <div style={{ background: "rgba(107,70,112,0.06)", border: `1px solid rgba(107,70,112,0.32)`, borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: PLUM, marginBottom: "7px" }}>
        Tầng chuyên gia · 音韻學註
      </div>
      {title && (
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "14.5px", color: "#22201C", marginBottom: "7px", lineHeight: 1.45 }}>
          {title}
        </div>
      )}
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.68, color: "#5C5548" }}>
        {children}
      </div>
    </div>
  );
}

function Pitfall({ title, children }) {
  return (
    <div style={{ background: "rgba(163,74,60,0.05)", border: `1px solid rgba(163,74,60,0.3)`, borderLeft: `4px solid ${RUST}`, borderRadius: "8px", padding: "14px 18px", marginBottom: "14px" }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: RUST, marginBottom: "6px" }}>
        Lỗi thường gặp · phản biện
      </div>
      {title && (
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "14px", color: "#22201C", marginBottom: "6px", lineHeight: 1.45 }}>
          {title}
        </div>
      )}
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.68, color: "#5C5548" }}>
        {children}
      </div>
    </div>
  );
}

/* Chữ Hán chèn giữa dòng văn xuôi của ghi chú — cần font Noto Serif SC để
   không bị rơi về font hệ thống (dễ hiện dạng chữ Nhật trên máy không có
   font Trung). */
function Z({ children }) {
  return <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600, color: "#22201C" }}>{children}</span>;
}

/* ---------- DATA: Hán Việt ↔ Quan Thoại (đã gộp) ---------- */

const toneRules = [
  { from: "Bình (ngang) — phụ âm đầu vô thanh", to: "Thanh 1 (阴平)", conf: "high",
    desc: "Hệ quả trực tiếp của luật 平分陰陽: bình thanh trung cổ tách đôi theo thanh tính của phụ âm đầu, nhánh vô thanh cho Thanh 1. Dấu NGANG của Hán Việt chính là nhánh đó, nên tương ứng rất đều. Ngoại lệ rải rác tồn tại (một số chữ vay ở lớp khác), nhưng không đủ để hạ độ tin cậy.",
    examples: [ { hv: "天 thiên", py: "tiān" }, { hv: "山 sơn", py: "shān" }, { hv: "心 tâm", py: "xīn" }, { hv: "三 tam", py: "sān" }, { hv: "春 xuân", py: "chūn" }, { hv: "初 sơ", py: "chū" }, { hv: "先 tiên", py: "xiān" }, { hv: "西 tây", py: "xī" }, { hv: "千 thiên", py: "qiān" }, { hv: "多 đa", py: "duō" } ] },
  { from: "Bình (huyền) — phụ âm đầu hữu thanh/vang", to: "Thanh 2 (阳平)", conf: "high",
    desc: "Nhánh còn lại của 平分陰陽: bình thanh với phụ âm đầu hữu thanh cho Thanh 2. Dấu HUYỀN đồng thời là tín hiệu báo phụ âm Quan Thoại sẽ BẬT HƠI nếu đó là âm tắc — xem ghi chú chuyên gia ở mục Phụ âm đầu.",
    examples: [ { hv: "同 đồng", py: "tóng" }, { hv: "文 văn", py: "wén" }, { hv: "年 niên", py: "nián" }, { hv: "常 thường", py: "cháng" }, { hv: "田 điền", py: "tián" }, { hv: "龍 long", py: "lóng" }, { hv: "來 lai", py: "lái" }, { hv: "回 hồi", py: "huí" }, { hv: "何 hà", py: "hé" }, { hv: "麻 ma", py: "má" }, { hv: "期 kỳ", py: "qī", note: "T1 ngoại lệ" } ] },
  { from: "Hỏi / Ngã", to: "Thanh 3 (上声)", conf: "high",
    desc: "Cả hai dấu này đều đi từ THƯỢNG THANH (上聲) của Hán ngữ trung cổ, mà thượng thanh vào Quan Thoại giữ nguyên thành Thanh 3 ở đại đa số trường hợp — dấu hỏi gần như tuyệt đối, dấu ngã đa số. Thiểu số rơi sang Thanh 4 nằm gọn trong một nhóm có quy luật riêng (濁上變去), xem ghi chú chuyên gia bên dưới.",
    examples: [ { hv: "好 hảo", py: "hǎo", note: "T3" }, { hv: "小 tiểu", py: "xiǎo", note: "T3" }, { hv: "水 thủy", py: "shuǐ", note: "T3" }, { hv: "反 phản", py: "fǎn", note: "T3" }, { hv: "短 đoản", py: "duǎn", note: "T3" }, { hv: "我 ngã", py: "wǒ", note: "T3" }, { hv: "五 ngũ", py: "wǔ", note: "T3" }, { hv: "有 hữu", py: "yǒu", note: "T3" }, { hv: "馬 mã", py: "mǎ", note: "T3" }, { hv: "老 lão", py: "lǎo", note: "T3" }, { hv: "語 ngữ", py: "yǔ", note: "T3" }, { hv: "技 kỹ", py: "jì", note: "T4 ngoại lệ" }, { hv: "士 sĩ", py: "shì", note: "T4 ngoại lệ" } ] },
  { from: "Sắc / Nặng (âm tiết mở)", to: "Thanh 4 (去声)", conf: "high",
    desc: "KHỨ THANH (去聲) là thanh duy nhất trong bốn thanh trung cổ KHÔNG tách đôi khi đi vào Quan Thoại, nên tương ứng gần như một-một. Chỉ áp dụng cho âm tiết KHÔNG kết thúc bằng -p/-t/-c/-ch; nếu có phụ âm cuối này, xem quy luật Nhập thanh bên dưới thay vì quy luật này.",
    examples: [ { hv: "意 ý", py: "yì" }, { hv: "志 chí", py: "zhì" }, { hv: "貴 quý", py: "guì" }, { hv: "愛 ái", py: "ài" }, { hv: "路 lộ", py: "lù" }, { hv: "在 tại", py: "zài" }, { hv: "自 tự", py: "zì" }, { hv: "見 kiến", py: "jiàn" } ] },
  { from: "Nhập thanh (kết thúc -p/-t/-c/-ch)", to: "Âm tiết mở, thanh không đoán được", conf: "struct",
    desc: "Quy luật CHẮC CHẮN nhất trong toàn bộ hệ thống: mọi âm Hán Việt kết thúc bằng -p, -t, -c, -ch đều tương ứng với âm tiết Quan Thoại không có phụ âm cuối.",
    examples: [ { hv: "一 nhất", py: "yī" }, { hv: "十 thập", py: "shí" }, { hv: "六 lục", py: "liù" }, { hv: "八 bát", py: "bā" }, { hv: "國 quốc", py: "guó" }, { hv: "學 học", py: "xué" }, { hv: "七 thất", py: "qī" }, { hv: "百 bách", py: "bǎi" }, { hv: "月 nguyệt", py: "yuè" }, { hv: "日 nhật", py: "rì" }, { hv: "北 bắc", py: "běi" }, { hv: "白 bạch", py: "bái" } ] },
];

const initialRules = [
  { from: "nh-", to: "r-", conf: "high", desc: "Một trong những quy luật đáng tin cậy nhất trong toàn bảng.",
    examples: [ { hv: "人 nhân", py: "rén" }, { hv: "日 nhật", py: "rì" }, { hv: "然 nhiên", py: "rán" }, { hv: "肉 nhục", py: "ròu" }, { hv: "熱 nhiệt", py: "rè" }, { hv: "軟 nhuyễn", py: "ruǎn" }, { hv: "讓 nhượng", py: "ràng" }, { hv: "認 nhận", py: "rèn" }, { hv: "如 như", py: "rú" }, { hv: "染 nhiễm", py: "rǎn" } ] },
  { from: "ng- / ngh-", to: "y- (hoặc câm)", conf: "high",
    examples: [ { hv: "元 nguyên", py: "yuán" }, { hv: "言 ngôn", py: "yán" }, { hv: "銀 ngân", py: "yín" }, { hv: "業 nghiệp", py: "yè" }, { hv: "硬 ngạnh", py: "yìng" }, { hv: "魚 ngư", py: "yú" }, { hv: "藝 nghệ", py: "yì" }, { hv: "岸 ngạn", py: "àn" } ] },
  { from: "v-", to: "w-", conf: "high",
    examples: [ { hv: "文 văn", py: "wén" }, { hv: "問 vấn", py: "wèn" }, { hv: "萬 vạn", py: "wàn" }, { hv: "位 vị", py: "wèi" }, { hv: "忘 vong", py: "wàng" }, { hv: "王 vương", py: "wáng" }, { hv: "為 vi/vì", py: "wéi" }, { hv: "務 vụ", py: "wù" }, { hv: "武 vũ", py: "wǔ" } ] },
  { from: "h- (+ vần oa/oe)", to: "hu-", conf: "high", desc: "Kết hợp cả phụ âm đầu lẫn vần — độ tin cậy cao vì cả hai lớp cùng khớp.",
    examples: [ { hv: "花 hoa", py: "huā" }, { hv: "火 hỏa", py: "huǒ" }, { hv: "化 hóa", py: "huà" }, { hv: "黃 hoàng", py: "huáng" }, { hv: "壞 hoại", py: "huài" }, { hv: "會 hội", py: "huì" }, { hv: "換 hoán", py: "huàn" } ] },
  { from: "c-/k- (trước i, e)", to: "j-", conf: "mid",
    examples: [ { hv: "金 kim", py: "jīn" }, { hv: "京 kinh", py: "jīng" }, { hv: "見 kiến", py: "jiàn" }, { hv: "記 ký", py: "jì" }, { hv: "己 kỷ", py: "jǐ" }, { hv: "計 kế", py: "jì" } ] },
  { from: "c-/k- (trước a, o, u)", to: "g-", conf: "mid",
    examples: [ { hv: "公 công", py: "gōng" }, { hv: "古 cổ", py: "gǔ" }, { hv: "高 cao", py: "gāo" }, { hv: "改 cải", py: "gǎi" }, { hv: "感 cảm", py: "gǎn" } ] },
  { from: "tr-", to: "zh-", conf: "mid",
    examples: [ { hv: "中 trung", py: "zhōng" }, { hv: "直 trực", py: "zhí" }, { hv: "重 trọng", py: "zhòng" }, { hv: "竹 trúc", py: "zhú" }, { hv: "住 trú", py: "zhù" }, { hv: "追 truy", py: "zhuī" } ] },
  { from: "đ-", to: "d-", conf: "mid",
    examples: [ { hv: "東 đông", py: "dōng" }, { hv: "道 đạo", py: "dào" }, { hv: "大 đại", py: "dà" }, { hv: "地 địa", py: "dì" }, { hv: "動 động", py: "dòng" }, { hv: "當 đương", py: "dāng" }, { hv: "到 đáo", py: "dào" }, { hv: "都 đô", py: "dōu" } ] },
  { from: "t- / th-", to: "biến thiên (t-, sh-, q-…)", conf: "low",
    desc: "Nhóm này gộp nhiều dòng phụ âm cổ khác nhau nên không tách được quy luật thực dụng — cần tra từng từ, đừng đoán.",
    examples: [ { hv: "天 thiên", py: "tiān" }, { hv: "上 thượng", py: "shàng" }, { hv: "清 thanh", py: "qīng" } ] },
  { from: "ph-", to: "f-", conf: "high", desc: "Nhóm phụ âm môi-răng cổ, chuyển đổi rất đều đặn.",
    examples: [ { hv: "法 pháp", py: "fǎ" }, { hv: "反 phản", py: "fǎn" }, { hv: "分 phân", py: "fēn" }, { hv: "風 phong", py: "fēng" }, { hv: "富 phú", py: "fù" }, { hv: "飯 phạn", py: "fàn" }, { hv: "方 phương", py: "fāng" } ] },
  { from: "b-", to: "b-", conf: "high", desc: "Giữ nguyên phụ âm — nhóm ổn định nhất trong toàn bảng.",
    examples: [ { hv: "本 bản", py: "běn" }, { hv: "白 bạch", py: "bái" }, { hv: "北 bắc", py: "běi" }, { hv: "半 bán", py: "bàn" }, { hv: "布 bố", py: "bù" }, { hv: "報 báo", py: "bào" } ] },
  { from: "m-", to: "m-", conf: "high", desc: "Giữ nguyên phụ âm mũi môi.",
    examples: [ { hv: "母 mẫu", py: "mǔ" }, { hv: "木 mộc", py: "mù" }, { hv: "馬 mã", py: "mǎ" }, { hv: "米 mễ", py: "mǐ" }, { hv: "門 môn", py: "mén" } ] },
  { from: "l-", to: "l-", conf: "high", desc: "Giữ nguyên phụ âm — ổn định.",
    examples: [ { hv: "老 lão", py: "lǎo" }, { hv: "力 lực", py: "lì" }, { hv: "六 lục", py: "liù" }, { hv: "路 lộ", py: "lù" }, { hv: "立 lập", py: "lì" }, { hv: "利 lợi", py: "lì" } ] },
  { from: "gi-", to: "j-", conf: "high",
    examples: [ { hv: "家 gia", py: "jiā" }, { hv: "教 giáo", py: "jiào" }, { hv: "界 giới", py: "jiè" }, { hv: "交 giao", py: "jiāo" }, { hv: "假 giả", py: "jiǎ" }, { hv: "解 giải", py: "jiě" } ] },
  { from: "qu-", to: "gu- / qu- / ju-", conf: "mid", desc: "Nhóm phụ âm mềm hóa môi hóa — phân nhánh theo vần đi sau.",
    examples: [ { hv: "光 quang", py: "guāng" }, { hv: "國 quốc", py: "guó" }, { hv: "官 quan", py: "guān" }, { hv: "權 quyền", py: "quán" }, { hv: "群 quần", py: "qún" }, { hv: "貴 quý", py: "guì" } ] },
  { from: "x-", to: "biến thiên (sh-, ch-…)", conf: "low",
    desc: "Chữ Hán Việt bắt đầu bằng x- vốn đã hiếm, và những từ tồn tại lại rơi vào nhiều dòng phụ âm cổ khác nhau — không đủ số lượng để rút ra quy luật, luôn tra riêng từng từ.",
    examples: [ { hv: "社 xã", py: "shè" }, { hv: "廠 xưởng", py: "chǎng" }, { hv: "處 xử", py: "chǔ" } ] },
];

const finalRules = [
  { from: "-inh / -ênh", to: "-ing", conf: "high",
    examples: [ { hv: "京 kinh", py: "jīng" }, { hv: "兵 binh", py: "bīng" }, { hv: "定 định", py: "dìng" }, { hv: "病 bệnh", py: "bìng" }, { hv: "聽 thính", py: "tīng" }, { hv: "命 mệnh", py: "mìng" }, { hv: "領 lĩnh", py: "lǐng" } ] },
  { from: "-ương / -ang", to: "-iang / -ang", conf: "high",
    examples: [ { hv: "江 giang", py: "jiāng" }, { hv: "方 phương", py: "fāng" }, { hv: "長 trường", py: "cháng" }, { hv: "香 hương", py: "xiāng" }, { hv: "想 tưởng", py: "xiǎng" }, { hv: "陽 dương", py: "yáng" }, { hv: "常 thường", py: "cháng" } ] },
  { from: "-oa / -óa / -ỏa", to: "-ua HOẶC -uo", conf: "high",
    desc: "Phải tách hai nhánh, đừng đoán bừa một bên: chữ thuộc GIẢ NHIẾP (假攝) cho -ua, chữ thuộc QUẢ NHIẾP (果攝) cho -uo. Cùng vần Hán Việt nhưng khác nguồn trung cổ nên khác kết quả.",
    examples: [ { hv: "花 hoa", py: "huā", note: "-ua" }, { hv: "化 hóa", py: "huà", note: "-ua" }, { hv: "華 hoa", py: "huá", note: "-ua" }, { hv: "火 hỏa", py: "huǒ", note: "-uo" }, { hv: "過 quá", py: "guò", note: "-uo" }, { hv: "果 quả", py: "guǒ", note: "-uo" }, { hv: "禍 họa", py: "huò", note: "-uo" } ] },
  { from: "-iên / -uyên", to: "-ian / -uan", conf: "high",
    examples: [ { hv: "天 thiên", py: "tiān" }, { hv: "年 niên", py: "nián" }, { hv: "見 kiến", py: "jiàn" }, { hv: "元 nguyên", py: "yuán" }, { hv: "面 diện", py: "miàn" }, { hv: "邊 biên", py: "biān" } ] },
  { from: "-am / -ăm", to: "-an", conf: "struct",
    desc: "Quan Thoại đã mất SẠCH phụ âm cuối -m (nhập hết vào -n) từ khoảng đời Minh, nên không tồn tại một âm tiết Quan Thoại nào kết thúc bằng -m. Đây là quy luật tuyệt đối thứ hai của bảng, sau quy luật nhập thanh.",
    examples: [ { hv: "南 nam", py: "nán" }, { hv: "三 tam", py: "sān" }, { hv: "談 đàm", py: "tán" }, { hv: "藍 lam", py: "lán" }, { hv: "敢 cảm", py: "gǎn" }, { hv: "含 hàm", py: "hán" } ] },
  { from: "-âm / -im", to: "-in", conf: "struct",
    desc: "Cùng một hiện tượng mất -m như trên, chỉ khác vần chính. Tiếng Việt còn giữ nguyên -m nên người Việt rất dễ đọc thừa phụ âm cuối này khi nói tiếng Trung.",
    examples: [ { hv: "金 kim", py: "jīn" }, { hv: "心 tâm", py: "xīn" }, { hv: "音 âm", py: "yīn" }, { hv: "林 lâm", py: "lín" }, { hv: "今 kim", py: "jīn" }, { hv: "飲 ẩm", py: "yǐn" } ] },
  { from: "-ông / -ung", to: "-ong", conf: "high",
    examples: [ { hv: "東 đông", py: "dōng" }, { hv: "公 công", py: "gōng" }, { hv: "中 trung", py: "zhōng" }, { hv: "同 đồng", py: "tóng" }, { hv: "紅 hồng", py: "hóng" }, { hv: "工 công", py: "gōng" } ] },
  { from: "-an", to: "-an", conf: "high", desc: "Trường hợp giữ nguyên vần — dễ nhận diện nhất.",
    examples: [ { hv: "安 an", py: "ān" }, { hv: "半 bán", py: "bàn" }, { hv: "反 phản", py: "fǎn" }, { hv: "難 nan", py: "nán" }, { hv: "案 án", py: "àn" }, { hv: "看 khán", py: "kàn" } ] },
  { from: "-anh / -ăng (và một vài từ -inh ngoại lệ)", to: "-eng", conf: "mid",
    desc: "Khác với -inh/-ênh ở trên — nhóm này lệch sang -eng chứ không phải -ing, dễ nhầm nếu không phân biệt kỹ mặt chữ Hán Việt.",
    examples: [ { hv: "生 sinh", py: "shēng" }, { hv: "更 canh", py: "gēng" }, { hv: "猛 mãnh", py: "měng" }, { hv: "冷 lãnh", py: "lěng" }, { hv: "省 tỉnh", py: "shěng" } ] },
  { from: "-ôn / -uôn", to: "-un / -uan", conf: "mid",
    examples: [ { hv: "存 tồn", py: "cún" }, { hv: "尊 tôn", py: "zūn" }, { hv: "論 luận", py: "lùn" }, { hv: "村 thôn", py: "cūn" } ] },
  { from: "-at (nhập thanh)", to: "-a", conf: "high", desc: "Nhánh cụ thể của quy luật nhập thanh — dễ nhớ vì kết quả rất gọn.",
    examples: [ { hv: "八 bát", py: "bā" }, { hv: "達 đạt", py: "dá" }, { hv: "發 phát", py: "fā" }, { hv: "殺 sát", py: "shā" }, { hv: "罰 phạt", py: "fá" } ] },
  { from: "-p / -t / -c / -ch", to: "âm tiết mở (không phụ âm cuối)", conf: "struct",
    desc: "Quy luật nền tảng nhất của toàn hệ thống — nếu chỉ nhớ một điều, hãy nhớ điều này.",
    examples: [ { hv: "國 quốc", py: "guó" }, { hv: "學 học", py: "xué" }, { hv: "十 thập", py: "shí" }, { hv: "一 nhất", py: "yī" }, { hv: "六 lục", py: "liù" }, { hv: "八 bát", py: "bā" }, { hv: "百 bách", py: "bǎi" }, { hv: "力 lực", py: "lì" }, { hv: "月 nguyệt", py: "yuè" }, { hv: "北 bắc", py: "běi" } ] },
  { from: "-ê / -ây", to: "-i", conf: "high",
    examples: [ { hv: "西 tây", py: "xī" }, { hv: "米 mễ", py: "mǐ" }, { hv: "底 để", py: "dǐ" } ] },
];

const falseFriends = [
  { char: "博士", hv: "bác sĩ", hvMeaning: "Nghĩa mà người Việt mặc định: bác sĩ y khoa", cnMeaning: "Nghĩa thật trong tiếng Trung: tiến sĩ / học vị PhD", correct: "Bác sĩ y khoa trong tiếng Trung là 医生 (yīshēng) hoặc 大夫 (dàifu)" },
  { char: "仔细", hv: "tử tế", hvMeaning: "Nghĩa tiếng Việt: tốt bụng, đối xử tử tế", cnMeaning: "Nghĩa thật trong tiếng Trung: cẩn thận, tỉ mỉ (仔细 zǐxì)", correct: "Tốt bụng/tử tế trong tiếng Trung là 好心 hoặc 善良 (shànliáng)" },
  { char: "东西", hv: "đông tây", hvMeaning: "Nghĩa tiếng Việt: hai hướng Đông và Tây", cnMeaning: "Nghĩa thứ hai cực kỳ phổ biến: 东西 (dōngxi) = \"đồ vật, thứ\"", correct: "Cùng hai chữ, khác nghĩa hoàn toàn tùy ngữ cảnh — bẫy phổ biến nhất với người mới học." },
  { char: "方便", hv: "phương tiện", hvMeaning: "Nghĩa tiếng Việt: công cụ/vật để di chuyển (phương tiện giao thông)", cnMeaning: "Nghĩa thật trong tiếng Trung: \"tiện lợi, thuận tiện\" (tính từ) — fāngbiàn", correct: "Phương tiện (vehicle) trong tiếng Trung là 工具 hoặc 交通工具" },
  { char: "走", hv: "tẩu", hvMeaning: "Sắc thái Hán Việt (đào tẩu): chạy trốn, bỏ chạy", cnMeaning: "Nghĩa trung tính trong tiếng Trung hiện đại: đơn giản là \"đi/rời đi\" — zǒu", correct: "Chạy (thể thao) là 跑 (pǎo); 走 chỉ là đi bộ/rời đi bình thường." },
  { char: "小心", hv: "tiểu tâm", hvMeaning: "Nếu dùng trong tiếng Việt (hiếm): nhỏ nhen, hẹp hòi", cnMeaning: "Nghĩa thật: \"cẩn thận, coi chừng\" — cụm cảnh báo cực kỳ thông dụng, xiǎoxīn", correct: "Nghe 小心! trên biển báo đừng hiểu nhầm là ai đó chê ai nhỏ nhen." },
  { char: "意思", hv: "ý tứ", hvMeaning: "Nghĩa tiếng Việt: sự khéo léo, kín đáo, cẩn trọng trong lời nói", cnMeaning: "Nghĩa thật: đơn giản là \"nghĩa/ý nghĩa\" (yìsi) — khẩu ngữ còn có nghĩa \"thú vị\" (有意思)", correct: "Hỏi 这是什么意思 chỉ là \"cái này nghĩa là gì\", không liên quan sự tế nhị." },
  { char: "小姐", hv: "tiểu thư", hvMeaning: "Nghĩa tiếng Việt: con gái nhà quyền quý, trang trọng, tích cực", cnMeaning: "Ở đại lục, xiǎojiě trong khẩu ngữ hiện đại có thể mang hàm ý tiêu cực tùy vùng miền/ngữ cảnh", correct: "Gọi phụ nữ trẻ lịch sự ở đại lục nên dùng 女士 (nǚshì); 小姐 vẫn dùng bình thường ở Đài Loan/HK." },
  { char: "便宜", hv: "tiện nghi", hvMeaning: "Nghĩa tiếng Việt: sự thuận tiện, đầy đủ tiện ích", cnMeaning: "Nghĩa thật hiện đại: \"rẻ, giá thấp\" — piányi, từ cực kỳ thông dụng khi mặc cả", correct: "Tiếng Việt giữ nghĩa cổ \"thuận tiện\", tiếng Trung hiện đại đã lệch sang \"rẻ\"." },
  { char: "風流", hv: "phong lưu", hvMeaning: "Nghĩa truyền thống VN: sung túc, nhàn nhã, có phong cách", cnMeaning: "Nghĩa thật hiện đại: đa tình, trăng hoa, lăng nhăng (thường tiêu cực)", correct: "Khen ai \"phong lưu\" kiểu Việt mà dịch thẳng sang 风流 sẽ gây hiểu lầm khá lớn." },
  { char: "丈夫", hv: "trượng phu", hvMeaning: "Nghĩa tiếng Việt: một người đàn ông đích thực, khí phách (\"làm trai cho đáng nên trai... trượng phu\")", cnMeaning: "Nghĩa thật trong tiếng Trung hiện đại: đơn giản là \"chồng\" — zhàngfu", correct: "Gọi ai đó \"trượng phu\" bằng tiếng Việt là khen khí chất; nói 丈夫 trong câu tiếng Trung chỉ đang nhắc đến người chồng của ai đó." },
  { char: "手段", hv: "thủ đoạn", hvMeaning: "Nghĩa tiếng Việt: mưu mẹo xấu, cách làm gian trá, luôn mang sắc thái tiêu cực", cnMeaning: "Nghĩa thật trong tiếng Trung: đơn giản là \"biện pháp, cách thức\" (trung tính) — shǒuduàn", correct: "这个手段很有效 (phương pháp này rất hiệu quả) không hàm ý gian trá gì cả — khác hẳn sắc thái nặng nề của \"thủ đoạn\" tiếng Việt." },
  { char: "認真", hv: "nhận chân", hvMeaning: "Nghĩa tiếng Việt: nhận ra bản chất thật của việc gì đó (\"nhận chân giá trị\", \"nhận chân sự thật\")", cnMeaning: "Nghĩa thật trong tiếng Trung: \"nghiêm túc, cẩn thận, chăm chỉ\" (tính từ/trạng từ chỉ thái độ) — rènzhēn", correct: "认真工作 nghĩa là \"làm việc nghiêm túc/chăm chỉ\", không liên quan đến việc nhận ra bản chất sự vật như trong tiếng Việt." },
];

/* ---------- DATA: Bộ biểu âm (phonetic components) ---------- */

const phoneticGroups = [
  { comp: "青", py: "qīng", meaning: "xanh (màu)", derived: [ { hv: "清 (thanh)", py: "qīng", meaning: "trong, sạch" }, { hv: "情 (tình)", py: "qíng", meaning: "tình cảm" }, { hv: "請 (thỉnh)", py: "qǐng", meaning: "mời, xin" }, { hv: "晴 (tình)", py: "qíng", meaning: "trời nắng" }, { hv: "精 (tinh)", py: "jīng", meaning: "tinh, tinh túy" } ] },
  { comp: "馬", py: "mǎ", meaning: "ngựa", derived: [ { hv: "媽 (ma)", py: "mā", meaning: "mẹ" }, { hv: "嗎 (ma)", py: "ma", meaning: "trợ từ hỏi" }, { hv: "罵 (mạ)", py: "mà", meaning: "mắng, chửi" }, { hv: "碼 (mã)", py: "mǎ", meaning: "mã số" } ] },
  { comp: "方", py: "fāng", meaning: "phương, vuông", derived: [ { hv: "放 (phóng)", py: "fàng", meaning: "thả, đặt" }, { hv: "房 (phòng)", py: "fáng", meaning: "phòng, nhà" }, { hv: "訪 (phỏng)", py: "fǎng", meaning: "thăm hỏi" }, { hv: "芳 (phương)", py: "fāng", meaning: "thơm" } ] },
  { comp: "生", py: "shēng", meaning: "sinh, sống", derived: [ { hv: "星 (tinh)", py: "xīng", meaning: "sao" }, { hv: "姓 (tính)", py: "xìng", meaning: "họ tên" } ] },
  { comp: "令", py: "lìng", meaning: "lệnh, khiến", derived: [ { hv: "冷 (lãnh)", py: "lěng", meaning: "lạnh" }, { hv: "領 (lĩnh)", py: "lǐng", meaning: "dẫn, cổ áo" }, { hv: "鈴 (linh)", py: "líng", meaning: "cái chuông" } ] },
  { comp: "包", py: "bāo", meaning: "bao, gói", derived: [ { hv: "抱 (bão)", py: "bào", meaning: "ôm" }, { hv: "飽 (bão)", py: "bǎo", meaning: "no" }, { hv: "泡 (bào)", py: "pào", meaning: "ngâm, bọt" } ] },
  { comp: "交", py: "jiāo", meaning: "giao, trao đổi", derived: [ { hv: "較 (giảo)", py: "jiào", meaning: "so sánh" }, { hv: "郊 (giao)", py: "jiāo", meaning: "vùng ngoại ô" }, { hv: "校 (hiệu)", py: "xiào", meaning: "trường học" } ] },
  { comp: "京", py: "jīng", meaning: "kinh đô", derived: [ { hv: "鯨 (kình)", py: "jīng", meaning: "cá voi" }, { hv: "景 (cảnh)", py: "jǐng", meaning: "cảnh vật" } ] },
  { comp: "相", py: "xiāng", meaning: "tương, lẫn nhau", derived: [ { hv: "想 (tưởng)", py: "xiǎng", meaning: "nghĩ, tưởng" }, { hv: "箱 (tương)", py: "xiāng", meaning: "hộp, rương" } ] },
  { comp: "由", py: "yóu", meaning: "do, từ", derived: [ { hv: "油 (du)", py: "yóu", meaning: "dầu" }, { hv: "鈾 (du)", py: "yóu", meaning: "uranium" }, { hv: "邮 (bưu)", py: "yóu", meaning: "bưu điện — CHỈ bản giản thể mới là hình thanh; bản phồn thể 郵 là hội ý (垂+邑), không chứa 由" }, { hv: "宙 (trụ)", py: "zhòu", meaning: "vũ trụ — cùng bộ 由 nhưng âm đã lệch hẳn" } ] },
  { comp: "反", py: "fǎn", meaning: "phản, trái lại", derived: [ { hv: "飯 (phạn)", py: "fàn", meaning: "cơm" }, { hv: "板 (bản)", py: "bǎn", meaning: "tấm ván (mộc bản)" }, { hv: "版 (bản)", py: "bǎn", meaning: "bản in, ấn bản" } ] },
  { comp: "寺", py: "sì", meaning: "chùa, tự", derived: [ { hv: "詩 (thi)", py: "shī", meaning: "thơ" }, { hv: "侍 (thị)", py: "shì", meaning: "hầu hạ, phụng sự" }, { hv: "時 (thời)", py: "shí", meaning: "thời gian" }, { hv: "特 (đặc)", py: "tè", meaning: "đặc biệt" } ] },
  { comp: "古", py: "gǔ", meaning: "xưa, cổ", derived: [ { hv: "姑 (cô)", py: "gū", meaning: "cô, cô gái" }, { hv: "故 (cố)", py: "gù", meaning: "lý do, cố ý" }, { hv: "苦 (khổ)", py: "kǔ", meaning: "khổ, đắng" }, { hv: "固 (cố)", py: "gù", meaning: "kiên cố, vững chắc" } ] },
  { comp: "每", py: "měi", meaning: "mỗi", derived: [ { hv: "海 (hải)", py: "hǎi", meaning: "biển" }, { hv: "梅 (mai)", py: "méi", meaning: "hoa mai" }, { hv: "悔 (hối)", py: "huǐ", meaning: "hối hận" } ] },
  { comp: "少", py: "shǎo", meaning: "thiếu, ít", derived: [ { hv: "沙 (sa)", py: "shā", meaning: "cát" }, { hv: "妙 (diệu)", py: "miào", meaning: "kỳ diệu" }, { hv: "抄 (sao)", py: "chāo", meaning: "sao chép" } ] },
];

/* ---------- DATA: Biến điệu (tone sandhi) ---------- */

const sandhiRules = [
  { from: "T3 + T3", to: "T2 + T3", conf: "struct", desc: "Quy tắc cứng, xảy ra 100% khi hai âm tiết thanh 3 đứng liền nhau — âm tiết đầu bắt buộc đổi sang thanh 2 khi nói (chữ viết vẫn giữ thanh 3).",
    examples: [ { hv: "你好 (viết)", py: "níhǎo (nói thật)" }, { hv: "很好 (viết)", py: "hénhǎo (nói thật)" }, { hv: "可以 (viết)", py: "kéyǐ (nói thật)" } ] },
  { from: "T3 + T1/T2/T4/thanh nhẹ", to: "BÁN TAM THANH (半三聲) — chỉ xuống, KHÔNG lên", conf: "struct",
    desc: "Quy tắc bị bỏ sót nhiều nhất, nhưng lại chi phối ĐA SỐ lần Thanh 3 xuất hiện: Thanh 3 chỉ đọc đầy đủ đường cong xuống-rồi-lên khi đứng một mình hoặc ở cuối câu. Trong mọi vị trí khác (trước T1/T2/T4/thanh nhẹ) nó chỉ còn nửa đầu — hạ thấp giọng rồi dừng, không vống lên. Người Việt học tiếng Trung thường cố \"lên\" ở mọi Thanh 3, đây là nguyên nhân số một khiến câu nói nghe nặng và chậm bất thường.",
    examples: [ { hv: "老師 (T3+T1)", py: "lǎo đọc nửa — chỉ hạ giọng" }, { hv: "好人 (T3+T2)", py: "hǎo đọc nửa" }, { hv: "很大 (T3+T4)", py: "hěn đọc nửa" }, { hv: "我的 (T3+nhẹ)", py: "wǒ đọc nửa" }, { hv: "很好 (T3+T3)", py: "→ đổi hẳn sang T2, xem quy tắc trên" }, { hv: "你好嗎? 好。(đứng cuối)", py: "hǎo đọc ĐẦY ĐỦ xuống-lên" } ] },
  { from: "不 bù + Thanh 4", to: "不 → Thanh 2 (bú)", conf: "struct", desc: "不 chỉ đổi thanh khi từ theo sau là Thanh 4. Với Thanh 1/2/3 thì 不 vẫn giữ Thanh 4 bình thường.",
    examples: [ { hv: "不是 (viết)", py: "búshì (nói thật)" }, { hv: "不對 (viết)", py: "búduì (nói thật)" }, { hv: "不好 (giữ nguyên)", py: "bùhǎo" }, { hv: "不來 (giữ nguyên)", py: "bùlái" } ] },
  { from: "一 yī + Thanh 4", to: "一 → Thanh 2 (yí)", conf: "struct",
    examples: [ { hv: "一定 (viết)", py: "yídìng (nói thật)" }, { hv: "一樣 (viết)", py: "yíyàng (nói thật)" } ] },
  { from: "一 yī + Thanh 1/2/3", to: "一 → Thanh 4 (yì)", conf: "struct", desc: "Ngược lại với trường hợp trên — trước T1/T2/T3, 一 chuyển thành Thanh 4.",
    examples: [ { hv: "一起 (viết)", py: "yìqǐ (nói thật)" }, { hv: "一直 (viết)", py: "yìzhí (nói thật)" }, { hv: "一天 (viết)", py: "yìtiān (nói thật)" } ] },
  { from: "一 yī độc lập / trong số đếm", to: "Giữ Thanh 1 (yī)", conf: "struct", desc: "Khi 一 đứng riêng, ở cuối câu, hoặc trong số đếm/số thứ tự thì KHÔNG đổi thanh.",
    examples: [ { hv: "第一 (giữ nguyên)", py: "dìyī" }, { hv: "十一 (giữ nguyên)", py: "shíyī" }, { hv: "星期一 (giữ nguyên)", py: "xīngqīyī" } ] },
  { from: "3 âm tiết Thanh 3 liền nhau", to: "Phụ thuộc cách ghép từ: 1+2 hoặc 2+1", conf: "high",
    desc: "Khi có 3 âm tiết Thanh 3 liên tiếp, quy tắc T3+T3→T2+T3 áp dụng theo CẶP gắn kết chặt hơn về nghĩa/ngữ pháp trước, rồi lan tiếp nếu còn cặp Thanh 3 mới xuất hiện.",
    examples: [ { hv: "我很好 (viết, cấu trúc 1+2: 我 / 很好)", py: "wǒ hénhǎo (nói thật — chỉ cặp 2 sau đổi)" }, { hv: "展覽館 (viết, cấu trúc 2+1: 展覽 / 館)", py: "zhánlánguǎn (nói thật — cả 2 âm đầu đều đổi)" } ] },
  { from: "不 / 一 kẹp giữa (V-不-V, V-一-V)", to: "Rơi xuống thanh nhẹ", conf: "struct",
    desc: "Khi 不 hoặc 一 bị kẹp giữa hai thành phần lặp lại của cùng một động từ/tính từ, nó mất hẳn thanh điệu và đọc lướt — không áp quy tắc bú/yí/yì ở trên nữa. Đây là chỗ quy tắc 不+T4→bú bị hiểu máy móc thành sai.",
    examples: [ { hv: "對不起", py: "duìbuqǐ — KHÔNG phải duìbúqǐ" }, { hv: "看不見", py: "kànbujiàn" }, { hv: "好不好", py: "hǎobuhǎo" }, { hv: "看一看", py: "kànyikàn" } ] },
  { from: "Thanh nhẹ (輕聲) ở hư từ", to: "Mất trọng âm + thanh gốc, đọc lướt nhẹ", conf: "struct",
    desc: "Một nhóm hư từ ngữ pháp cố định luôn đọc thanh nhẹ (không dấu, ngắn, nhẹ hơn hẳn âm trước nó), bất kể thanh gốc trên chữ viết là gì — không có ngoại lệ với nhóm này.",
    examples: [ { hv: "的 de (trợ từ sở hữu)", py: "thanh nhẹ" }, { hv: "了 le (trợ từ hoàn thành)", py: "thanh nhẹ" }, { hv: "嗎 ma (trợ từ hỏi)", py: "thanh nhẹ" }, { hv: "呢 ne (trợ từ hỏi)", py: "thanh nhẹ" }, { hv: "們 men (số nhiều)", py: "thanh nhẹ" }, { hv: "著 zhe (trợ từ tiếp diễn)", py: "thanh nhẹ" } ] },
];

/* ---------- DATA: Lượng từ (measure words ↔ loại từ Việt) ---------- */

const measureWords = [
  { hanzi: "個 / 个", py: "gè", loaiTu: "cái (mặc định, dùng khi không chắc)", example: "一個人 (một người)" },
  { hanzi: "隻 / 只", py: "zhī", loaiTu: "con (động vật, vật nhỏ)", example: "一隻貓 (một con mèo)" },
  { hanzi: "本", py: "běn", loaiTu: "quyển / cuốn (sách)", example: "一本書 (một quyển sách)" },
  { hanzi: "張 / 张", py: "zhāng", loaiTu: "tấm / tờ (vật dẹt, mặt phẳng)", example: "一張紙 (một tờ giấy)" },
  { hanzi: "輛 / 辆", py: "liàng", loaiTu: "chiếc (xe cộ)", example: "一輛車 (một chiếc xe)" },
  { hanzi: "條 / 条", py: "tiáo", loaiTu: "con / dải (vật dài, hẹp)", example: "一條魚 (một con cá)" },
  { hanzi: "杯", py: "bēi", loaiTu: "cốc / ly (chất lỏng đựng trong cốc)", example: "一杯水 (một cốc nước)" },
  { hanzi: "件", py: "jiàn", loaiTu: "cái / việc (áo, sự việc)", example: "一件事 (một việc)" },
  { hanzi: "座", py: "zuò", loaiTu: "tòa / ngọn (kết cấu lớn, cố định)", example: "一座山 (một ngọn núi)" },
  { hanzi: "朵", py: "duǒ", loaiTu: "bông (hoa, mây)", example: "一朵花 (một bông hoa)" },
  { hanzi: "位", py: "wèi", loaiTu: "vị (người, thể hiện lịch sự/tôn kính)", example: "一位客人 (một vị khách)" },
  { hanzi: "部", py: "bù", loaiTu: "bộ (phim, sách bộ, máy móc)", example: "一部電影 (một bộ phim)" },
  { hanzi: "家", py: "jiā", loaiTu: "nhà, tiệm (cơ sở kinh doanh)", example: "一家餐廳 (một nhà hàng)" },
  { hanzi: "顆 / 颗", py: "kē", loaiTu: "hạt, viên (vật nhỏ, tròn)", example: "一顆星 (một vì sao)" },
  { hanzi: "支", py: "zhī", loaiTu: "cây, điếu (vật dài, thon, cầm tay)", example: "一支筆 (một cây bút)" },
  { hanzi: "雙 / 双", py: "shuāng", loaiTu: "đôi (hai vật đi cùng nhau)", example: "一雙鞋 (một đôi giày)" },
  { hanzi: "次", py: "cì", loaiTu: "lần (số lần thực hiện hành động)", example: "一次機會 (một lần cơ hội)" },
  { hanzi: "種 / 种", py: "zhǒng", loaiTu: "loại, thứ (phân loại chung)", example: "一種方法 (một loại phương pháp)" },
  { hanzi: "場 / 场", py: "chǎng", loaiTu: "trận, buổi (sự kiện, trận đấu, buổi chiếu)", example: "一場比賽 (một trận thi đấu)" },
  { hanzi: "塊 / 块", py: "kuài", loaiTu: "khối, miếng (vật dạng cục); khẩu ngữ còn dùng đếm tiền", example: "一塊蛋糕 (một miếng bánh)" },
  { hanzi: "群", py: "qún", loaiTu: "đàn, bầy, nhóm (tập hợp đông)", example: "一群人 (một nhóm người)" },
];

/* ---------- DATA: Từ vựng tần suất (nhóm theo chức năng) ---------- */

const freqGroups = [
  { label: "Đại từ nhân xưng — dùng liên tục mỗi câu", words: ["我 wǒ (tôi)", "你 nǐ (bạn)", "他/她 tā (anh/cô ấy)", "我們 wǒmen (chúng tôi)", "他們 tāmen (họ)"] },
  { label: "Động từ lõi — xuất hiện trong hầu hết hội thoại", words: ["是 shì (là)", "有 yǒu (có)", "在 zài (ở, đang)", "要 yào (muốn, cần)", "去 qù (đi)", "來 lái (đến)", "說 shuō (nói)", "看 kàn (nhìn/xem)", "知道 zhīdào (biết)", "想 xiǎng (nghĩ/muốn)"] },
  { label: "Trợ từ, liên từ — khung câu", words: ["的 de (của)", "了 le (trợ từ hoàn thành)", "不 bù (không)", "就 jiù (thì, chính là)", "都 dōu (đều)", "也 yě (cũng)", "和 hé (và)", "但是 dànshì (nhưng)"] },
  { label: "Tính từ tần suất cao", words: ["好 hǎo (tốt)", "大 dà (to)", "小 xiǎo (nhỏ)", "多 duō (nhiều)", "少 shǎo (ít)", "很 hěn (rất)"] },
  { label: "Từ để hỏi — khung mọi câu hỏi", words: ["什麼 shénme (gì)", "誰 shéi (ai)", "哪裡 nǎlǐ (đâu)", "為什麼 wèishénme (tại sao)", "怎麼 zěnme (như thế nào)", "什麼時候 shénme shíhou (khi nào)", "多少 duōshao (bao nhiêu)", "幾 jǐ (mấy)"] },
  { label: "Từ chỉ thời gian — mốc thời gian dùng liên tục", words: ["現在 xiànzài (bây giờ)", "今天 jīntiān (hôm nay)", "昨天 zuótiān (hôm qua)", "明天 míngtiān (ngày mai)", "以後 yǐhòu (sau này)", "以前 yǐqián (trước đây)", "已經 yǐjīng (đã)", "還 hái (còn/vẫn)"] },
  { label: "Giới từ & động từ năng nguyện — khung ngữ pháp câu phức", words: ["從 cóng (từ)", "到 dào (đến)", "對 duì (đối với)", "跟 gēn (với/cùng)", "給 gěi (cho)", "可以 kěyǐ (có thể)", "應該 yīnggāi (nên)", "會 huì (sẽ/biết)", "能 néng (có thể/năng lực)"] },
  { label: "Từ chỉ số lượng & mức độ — bổ nghĩa tính từ, động từ", words: ["一點兒 yìdiǎnr (một chút)", "一些 yìxiē (một vài)", "太 tài (quá)", "非常 fēicháng (cực kỳ)", "比較 bǐjiào (tương đối/khá)", "最 zuì (nhất)"] },
];

/* ---------- DATA: Cặp tối thiểu (minimal tone pairs) ---------- */

const minimalPairs = [
  { base: "ma", forms: [ { hanzi: "媽", py: "mā", meaning: "mẹ" }, { hanzi: "麻", py: "má", meaning: "cây gai/vải lanh" }, { hanzi: "馬", py: "mǎ", meaning: "ngựa" }, { hanzi: "罵", py: "mà", meaning: "mắng" } ] },
  { base: "mai", forms: [ { hanzi: "買", py: "mǎi", meaning: "mua" }, { hanzi: "賣", py: "mài", meaning: "bán" } ] },
  { base: "tang", forms: [ { hanzi: "湯", py: "tāng", meaning: "canh, súp" }, { hanzi: "糖", py: "táng", meaning: "đường, kẹo" }, { hanzi: "躺", py: "tǎng", meaning: "nằm" }, { hanzi: "燙", py: "tàng", meaning: "nóng bỏng" } ] },
  { base: "qi", forms: [ { hanzi: "七", py: "qī", meaning: "số bảy" }, { hanzi: "其", py: "qí", meaning: "của nó" }, { hanzi: "起", py: "qǐ", meaning: "dậy, bắt đầu" }, { hanzi: "氣", py: "qì", meaning: "khí, hơi" } ] },
  { base: "wen", forms: [ { hanzi: "問", py: "wèn", meaning: "hỏi" }, { hanzi: "吻", py: "wěn", meaning: "hôn" } ] },
  { base: "ting", forms: [ { hanzi: "聽", py: "tīng", meaning: "nghe" }, { hanzi: "挺", py: "tǐng", meaning: "khá, khá là" } ] },
  { base: "shui", forms: [ { hanzi: "睡", py: "shuì", meaning: "ngủ" }, { hanzi: "水", py: "shuǐ", meaning: "nước" } ] },
  { base: "lei", forms: [ { hanzi: "累", py: "lèi", meaning: "mệt" }, { hanzi: "雷", py: "léi", meaning: "sấm" } ] },
  { base: "ba", forms: [ { hanzi: "八", py: "bā", meaning: "số tám" }, { hanzi: "拔", py: "bá", meaning: "nhổ" }, { hanzi: "把", py: "bǎ", meaning: "cầm, nắm" }, { hanzi: "爸", py: "bà", meaning: "bố" } ] },
  { base: "fan", forms: [ { hanzi: "翻", py: "fān", meaning: "lật, dịch" }, { hanzi: "煩", py: "fán", meaning: "phiền toái" }, { hanzi: "反", py: "fǎn", meaning: "ngược lại" }, { hanzi: "飯", py: "fàn", meaning: "cơm" } ] },
  { base: "shu", forms: [ { hanzi: "書", py: "shū", meaning: "sách" }, { hanzi: "熟", py: "shú", meaning: "chín, quen" }, { hanzi: "鼠", py: "shǔ", meaning: "con chuột" }, { hanzi: "樹", py: "shù", meaning: "cây" } ] },
  { base: "zhu", forms: [ { hanzi: "豬", py: "zhū", meaning: "con lợn" }, { hanzi: "竹", py: "zhú", meaning: "tre" }, { hanzi: "主", py: "zhǔ", meaning: "chủ" }, { hanzi: "住", py: "zhù", meaning: "ở, sống" } ] },
  { base: "wu", forms: [ { hanzi: "污", py: "wū", meaning: "dơ bẩn" }, { hanzi: "無", py: "wú", meaning: "không có" }, { hanzi: "五", py: "wǔ", meaning: "số năm" }, { hanzi: "務", py: "wù", meaning: "nhiệm vụ" } ] },
  { base: "yi", forms: [ { hanzi: "衣", py: "yī", meaning: "áo, quần áo" }, { hanzi: "姨", py: "yí", meaning: "dì, mợ" }, { hanzi: "已", py: "yǐ", meaning: "đã" }, { hanzi: "意", py: "yì", meaning: "ý nghĩa" } ] },
];

/* ---------- DATA: Thành ngữ (chengyu ↔ Hán Việt) ---------- */

const chengyuList = [
  { hanzi: "一舉兩得", py: "yī jǔ liǎng dé", hv: "nhất cử lưỡng tiện", meaning: "một hành động đạt được hai lợi ích" },
  { hanzi: "半途而廢", py: "bàn tú ér fèi", hv: "bán đồ nhi phế", meaning: "bỏ dở giữa đường, không hoàn thành" },
  { hanzi: "畫蛇添足", py: "huà shé tiān zú", hv: "hoạ xà thiêm túc", meaning: "vẽ rắn thêm chân — làm thừa, phản tác dụng" },
  { hanzi: "守株待兔", py: "shǒu zhū dài tù", hv: "thủ chu đãi thố", meaning: "ôm cây chờ thỏ — trông chờ vận may một cách thụ động" },
  { hanzi: "自相矛盾", py: "zì xiāng máo dùn", hv: "tự tương mâu thuẫn", meaning: "tự mâu thuẫn với chính mình — nguồn gốc của từ \"mâu thuẫn\" trong tiếng Việt" },
  { hanzi: "入鄉隨俗", py: "rù xiāng suí sú", hv: "nhập hương tùy tục", meaning: "đến đâu theo tục lệ ở đó — tục ngữ Việt quen dùng hơn ở dạng \"nhập gia tùy tục\" (thay 鄉/hương bằng 家/gia)" },
  { hanzi: "知己知彼", py: "zhī jǐ zhī bǐ", hv: "tri kỷ tri bỉ", meaning: "biết mình biết địch" },
  { hanzi: "有志者事竟成", py: "yǒu zhì zhě shì jìng chéng", hv: "hữu chí giả sự cánh thành", meaning: "có ý chí thì việc gì cũng thành" },
  { hanzi: "塞翁失馬", py: "sài wēng shī mǎ", hv: "tái ông thất mã", meaning: "trong họa có phúc, chưa biết được là may hay rủi — điển tích tái ông mất ngựa" },
  { hanzi: "刻舟求劍", py: "kè zhōu qiú jiàn", hv: "khắc chu cầu kiếm", meaning: "khắc dấu trên thuyền để tìm kiếm rơi — tư duy máy móc, không chịu thích ứng với thay đổi" },
  { hanzi: "狐假虎威", py: "hú jiǎ hǔ wēi", hv: "hồ giả hổ uy", meaning: "cáo mượn oai hùm — dựa hơi kẻ khác để bắt nạt người" },
  { hanzi: "掩耳盜鈴", py: "yǎn ěr dào líng", hv: "yểm nhĩ đạo linh", meaning: "bịt tai đi trộm chuông — tự lừa dối chính mình" },
  { hanzi: "亡羊補牢", py: "wáng yáng bǔ láo", hv: "vong dương bổ lao", meaning: "mất cừu rồi mới sửa chuồng — muộn còn hơn không" },
  { hanzi: "井底之蛙", py: "jǐng dǐ zhī wā", hv: "tỉnh để chi oa", meaning: "ếch ngồi đáy giếng — tầm nhìn hạn hẹp, tự cho mình biết hết" },
  { hanzi: "對牛彈琴", py: "duì niú tán qín", hv: "đối ngưu đàn cầm", meaning: "đàn gảy tai trâu — nói với người không hiểu/không muốn hiểu, phí công vô ích" },
  { hanzi: "杯弓蛇影", py: "bēi gōng shé yǐng", hv: "bôi cung xà ảnh", meaning: "bóng cung trong chén tưởng nhầm là rắn — nghi ngờ, sợ hãi vô căn cứ, tự dọa mình" },
  { hanzi: "望梅止渴", py: "wàng méi zhǐ kě", hv: "vọng mai chỉ khát", meaning: "nhìn mơ mà đỡ khát — tự an ủi bằng hy vọng hão, giải pháp tinh thần không thực chất" },
  { hanzi: "杯水車薪", py: "bēi shuǐ chē xīn", hv: "bôi thủy xa tân", meaning: "một chén nước cho cả xe củi đang cháy — sự giúp đỡ quá nhỏ so với vấn đề, muối bỏ biển" },
];

/* ---------- DATA: Hướng dẫn sử dụng (guide subtab) ---------- */

const TABS_GUIDE = [
  { n: "1", label: "Hán Việt", hanzi: "漢越音鑰匙",
    use: "Suy đoán pinyin/âm Hán Việt của một chữ mới dựa trên 3 lớp quy luật ngữ âm (thanh điệu → phụ âm đầu → vần) và tra cạm bẫy nghĩa (từ giả Hán Việt).",
    when: "Gặp một chữ Hán chưa học nhưng đã biết âm Hán Việt của nó, và muốn đoán nhanh cách đọc Quan Thoại trước khi tra từ điển; hoặc khi dùng một từ mượn Hán Việt và nghi ngờ nghĩa tiếng Trung hiện đại đã lệch.",
    tip: "Luôn đọc cột \"độ tin cậy\" trước khi tin. Hai nhãn \"Quy tắc cố định\" (mất nhập thanh và mất phụ âm cuối -m) là tuyệt đối, dùng được ngay. Hai nhóm còn nhãn \"Thấp\" (t-/th- và x-) mới là nhóm bắt buộc tra từ điển. Đọc kèm các khối \"Tầng chuyên gia\" trong tab — chúng chỉ ra cách tách các dòng \"Trung bình\" thành quy luật chắc chắn bằng dấu thanh." },
  { n: "2", label: "Biểu âm", hanzi: "諧聲部件",
    use: "Nhận diện các \"bộ phận biểu âm\" (phonetic components) xuất hiện lặp lại trong nhiều chữ Hán, để đoán âm đọc của chữ mới mà không cần học thuộc từng chữ riêng lẻ.",
    when: "Đang học chữ Hán mới và nhận ra nó có một bộ phận quen mắt (vd. 青, 交, 生...) — kiểm tra xem các chữ cùng bộ phận đó có phát âm gần giống nhau không.",
    tip: "~80% chữ Hán là hình thanh tự (nửa biểu nghĩa + nửa biểu âm) — nhưng biểu âm chỉ gợi ý âm gần đúng (thường cùng vần, khác thanh hoặc khác phụ âm), không phải công thức chính xác 100%; luôn xác nhận lại bằng pinyin thật." },
  { n: "3", label: "Biến điệu", hanzi: "變調",
    use: "Tra các quy tắc biến đổi thanh điệu bắt buộc khi nói (chữ viết vẫn giữ thanh gốc) — thanh 3 liền thanh 3, và các biến thể của 不/一.",
    when: "Trước khi luyện nói hoặc thu âm shadowing — đây là quy tắc phải thuộc lòng, không phải tra cứu từng lần, vì sai chỗ này nghe rất \"ngoại quốc\".",
    tip: "Khác hẳn tab Hán Việt (chỉ là xu hướng thống kê), biến điệu là quy tắc cố định 100% — học một lần, áp dụng suốt đời, không có ngoại lệ cần tra." },
  { n: "4", label: "Lượng từ", hanzi: "量詞",
    use: "Map nhanh loại từ tiếng Việt quen thuộc (cái, con, quyển, chiếc...) sang lượng từ tiếng Trung tương ứng.",
    when: "Đang ghép câu có số đếm + danh từ (vd. \"một ___ sách\") và phân vân dùng lượng từ nào.",
    tip: "Người Việt có lợi thế so với người phương Tây vì đã có sẵn tư duy loại từ — chỉ cần học lại nhãn, không cần học khái niệm từ đầu. Khi không chắc, dùng 個/个 (gè) làm phương án an toàn mặc định." },
  { n: "5", label: "Tần suất", hanzi: "頻率詞彙",
    use: "Ưu tiên học nhóm từ vựng lõi (đại từ, động từ, trợ từ, tính từ) xuất hiện nhiều nhất trong hội thoại hằng ngày.",
    when: "Mới bắt đầu học hoặc muốn ôn lại nền tảng nhanh — nên học nhóm này trước, thay vì học tuần tự theo thứ tự giáo trình/HSK.",
    tip: "HSK không xếp theo tần suất sử dụng thực tế; ưu tiên các từ trong tab này (phủ hơn 90% hội thoại thường ngày) sẽ tạo hiệu quả giao tiếp nhanh hơn nhiều so với học dàn trải." },
  { n: "6", label: "Cặp âm", hanzi: "最小對立體",
    use: "Luyện tai phân biệt các chữ chỉ khác nhau ở thanh điệu (cùng phụ âm + vần, khác thanh) — ví dụ mā/má/mǎ/mà.",
    when: "Trước khi luyện nói đúng thanh điệu — nên luyện nghe/nhận diện tách biệt từng thanh trước, rồi mới luyện phát âm; cũng dùng để tự kiểm tra khi nghe không rõ ai đó vừa nói thanh mấy.",
    tip: "Nghe từng cặp theo thứ tự 1-2-3-4 nhiều lần để tai quen sự khác biệt, sau đó nghe ngẫu nhiên (xáo trộn thứ tự) để kiểm tra thật sự đã phân biệt được hay chỉ đang đoán theo trình tự." },
  { n: "7", label: "Thành ngữ", hanzi: "成語",
    use: "Tra các chengyu (thành ngữ 4 chữ) phổ biến cùng âm Hán Việt và nghĩa — nhiều thành ngữ Việt là dịch/mượn trực tiếp từ đây.",
    when: "Muốn nâng cấp văn viết/nói lên mức trang trọng hơn, hoặc muốn hiểu gốc gác một thành ngữ Việt quen thuộc (vd. \"tự tương mâu thuẫn\" → nguồn gốc từ \"mâu thuẫn\" trong tiếng Việt).",
    tip: "Với nền Hán Việt, đây là lớp từ vựng có ROI cao hơn hẳn so với người học phương Tây — nhưng nhớ rằng không phải thành ngữ Việt nào cũng dịch chữ-đối-chữ chính xác từ chengyu gốc (đôi khi một chữ đã bị thay khi truyền vào tiếng Việt), nên vẫn cần đối chiếu cẩn thận." },
  { n: "8", label: "Xen kẽ", hanzi: "交錯學習",
    use: "Không phải bảng tra cứu — đây là hướng dẫn phương pháp học: vì sao xen kẽ nhiều kỹ năng (nghe/nói/đọc/viết) trong 1 buổi hiệu quả hơn học khối, kèm mẫu lịch học 25 phút.",
    when: "Khi lên kế hoạch cho một buổi tự học — dùng mẫu 5 bước (nghe → nhại lại → đọc → viết lại → nói tự do) áp dụng cho MỘT đoạn hội thoại duy nhất.",
    tip: "Điểm dễ hiểu lầm nhất: xen kẽ nghĩa là cùng MỘT nội dung đi qua nhiều kỹ năng khác nhau, không phải học nhiều chủ đề khác nhau cho cùng một kỹ năng." },
];

function GuideTabCard({ n, hanzi, label, use, when, tip }) {
  return (
    <div style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "18px 20px", marginBottom: "14px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "13px", color: "#2B3A55", background: "rgba(43,58,85,0.1)", borderRadius: "5px", padding: "2px 7px" }}>{n}</span>
        <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "17px", color: "#22201C" }}>{label}</span>
        <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#8B7F6E", fontSize: "14px" }}>{hanzi}</span>
      </div>
      <div style={{ fontSize: "13px", lineHeight: 1.65, color: "#5C5548", marginBottom: "6px" }}>
        <b style={{ color: "#2B3A55" }}>Dùng để:</b> {use}
      </div>
      <div style={{ fontSize: "13px", lineHeight: 1.65, color: "#5C5548", marginBottom: "6px" }}>
        <b style={{ color: "#3E6259" }}>Dùng khi nào:</b> {when}
      </div>
      <div style={{ fontSize: "12.5px", lineHeight: 1.6, color: "#8B7F6E", fontStyle: "italic", borderTop: "1px dashed rgba(43,58,85,0.25)", paddingTop: "8px", marginTop: "8px" }}>
        Mẹo: {tip}
      </div>
    </div>
  );
}

const TABS = [
  { id: "guide", label: "Hướng dẫn" },
  { id: "hv", label: "Hán Việt" },
  { id: "phonetic", label: "Biểu âm" },
  { id: "sandhi", label: "Biến điệu" },
  { id: "measure", label: "Lượng từ" },
  { id: "freq", label: "Tần suất" },
  { id: "minimal", label: "Cặp âm" },
  { id: "chengyu", label: "Thành ngữ" },
  { id: "interleave", label: "Xen kẽ" },
];

function matchRule(rule, q) {
  if (!q) return true;
  const hay = [rule.from, rule.to, rule.desc || "", ...rule.examples.map((e) => `${e.hv} ${e.py} ${e.note || ""}`)].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}
const CONF_ORDER = { struct: 0, high: 1, mid: 2, low: 3 };
function byConfDesc(rules) {
  return rules.slice().sort((a, b) => CONF_ORDER[a.conf] - CONF_ORDER[b.conf]);
}
function matchFriend(f, q) {
  if (!q) return true;
  return [f.char, f.hv, f.hvMeaning, f.cnMeaning, f.correct].join(" ").toLowerCase().includes(q.toLowerCase());
}
function matchPhonetic(g, q) {
  if (!q) return true;
  const hay = [g.comp, g.py, g.meaning, ...g.derived.map((d) => `${d.hv} ${d.py} ${d.meaning}`)].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}
function matchMeasure(m, q) {
  if (!q) return true;
  return [m.hanzi, m.py, m.loaiTu, m.example].join(" ").toLowerCase().includes(q.toLowerCase());
}
function matchFreqGroup(g, q) {
  if (!q) return true;
  return [g.label, ...g.words].join(" ").toLowerCase().includes(q.toLowerCase());
}
function matchPair(p, q) {
  if (!q) return true;
  const hay = [p.base, ...p.forms.map((f) => `${f.hanzi} ${f.py} ${f.meaning}`)].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}
function matchChengyu(c, q) {
  if (!q) return true;
  return [c.hanzi, c.py, c.hv, c.meaning].join(" ").toLowerCase().includes(q.toLowerCase());
}

export default function HanVietKey() {
  const [tab, setTab] = useState("guide");
  const goToTab = (id) => {
    setTab(id);
    // Đợi nội dung tab mới thực sự render xong (2 rAF, qua khỏi lần paint kế
    // tiếp) rồi mới cuộn — gọi cuộn ngay trong onClick đôi khi chạy trên
    // chiều cao nội dung CŨ và bị trình duyệt hủy animation giữa chừng khi
    // nội dung mới (ngắn/dài hơn) vừa thay layout.
    requestAnimationFrame(() => requestAnimationFrame(() => window.__scrollArticleToTop?.()));
  };
  const [query, setQuery] = useState("");

  const fTone = useMemo(() => byConfDesc(toneRules.filter((r) => matchRule(r, query))), [query]);
  const fInitial = useMemo(() => byConfDesc(initialRules.filter((r) => matchRule(r, query))), [query]);
  const fFinal = useMemo(() => byConfDesc(finalRules.filter((r) => matchRule(r, query))), [query]);
  const fFriends = useMemo(() => falseFriends.filter((f) => matchFriend(f, query)), [query]);
  const fPhonetic = useMemo(() => phoneticGroups.filter((g) => matchPhonetic(g, query)), [query]);
  const fSandhi = useMemo(() => byConfDesc(sandhiRules.filter((r) => matchRule(r, query))), [query]);
  const fMeasure = useMemo(() => measureWords.filter((m) => matchMeasure(m, query)), [query]);
  const fFreq = useMemo(() => freqGroups.filter((g) => matchFreqGroup(g, query)), [query]);
  const fPairs = useMemo(() => minimalPairs.filter((p) => matchPair(p, query)), [query]);
  const fChengyu = useMemo(() => chengyuList.filter((c) => matchChengyu(c, query)), [query]);

  const totalRules =
    toneRules.length + initialRules.length + finalRules.length + falseFriends.length +
    phoneticGroups.length + sandhiRules.length + measureWords.length + freqGroups.length +
    minimalPairs.length + chengyuList.length;

  return (
    <div style={{ background: "#F7F6F2", fontFamily: "Inter, sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      {/* Header — đồng bộ .hd của ChunkAtlas_EN.jsx / BestPracticesGuide.jsx */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 20px", borderBottom: "1px solid #E4E1D8", background: "#FCFBF8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #2B3A55", color: "#2B3A55", borderRadius: 3, fontSize: 20, fontWeight: 700, fontFamily: "'Noto Serif SC', serif" }}>
            解
          </div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", color: "#23231E" }}>BẢNG GIẢI MÃ · 解碼表</div>
            <div style={{ fontSize: 11, color: "#6B6558", marginTop: 1 }}>Tiếng Trung · {totalRules} mục · từ nền Hán Việt đến thành ngữ</div>
          </div>
        </div>
      </div>

      {/* Breadcrumb — đồng bộ .crumb-pill của ChunkAtlas_EN.jsx */}
      <nav className="mobile-static" style={{ position: "sticky", top: 0, zIndex: 10, background: "#FCFBF8", borderBottom: "1px solid #E4E1D8" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "9px 20px" }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => goToTab(t.id)}
              style={{
                border: "1px solid " + (tab === t.id ? "#2B3A55" : "#E4E1D8"),
                background: tab === t.id ? "#2B3A55" : "#fff",
                color: tab === t.id ? "#fff" : "#6B6558",
                borderRadius: 20, padding: "7px 13px", cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600,
                whiteSpace: "nowrap", transition: "all .12s"
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ padding: "18px 20px 0" }}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm chữ Hán, âm Hán Việt, hoặc pinyin…"
          style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #D9CFBB", background: "#F6F1E7", fontFamily: "'Noto Serif SC', serif", fontSize: "14px", color: "#22201C", outline: "none" }} />
      </div>

      <div style={{ padding: "16px 20px 60px" }}>
        {tab === "guide" && (
          <>
            <Intro text='"Bảng giải mã" không phải một bài học tuyến tính — đây là 8 tab tra cứu dữ liệu độc lập (chưa tính tab Hướng dẫn này), mỗi tab phục vụ một mục đích khác nhau. Tab này tóm tắt tab nào dùng cho việc gì, khi nào nên mở nó ra, và cách đọc nhãn độ tin cậy.' />

            <SectionHeader title="Cách đọc nhãn độ tin cậy" subtitle="Mỗi quy luật trong tab Hán Việt và Biến điệu đều gắn một nhãn màu — đọc đúng nhãn quan trọng hơn nhớ ví dụ" />
            <div style={{ display: "grid", gridTemplateColumns: "134px 1fr", rowGap: 12, columnGap: 16, alignItems: "center", background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
              <ConfPill level="struct" /><span style={{ fontSize: 13, color: "#5C5548" }}>Xảy ra 100% — học thuộc, áp dụng luôn không cần tra (nhập thanh, biến điệu).</span>
              <ConfPill level="high" /><span style={{ fontSize: 13, color: "#5C5548" }}>Đúng phần lớn — dùng để đoán nhanh, nhưng vẫn có ngoại lệ rải rác.</span>
              <ConfPill level="mid" /><span style={{ fontSize: 13, color: "#5C5548" }}>Đúng khoảng một nửa — chỉ nên dùng làm gợi ý đầu tiên, không thay thế tra cứu.</span>
              <ConfPill level="low" /><span style={{ fontSize: 13, color: "#5C5548" }}>Gần như ngẫu nhiên — bắt buộc tra từ điển, đừng đoán rồi dùng luôn.</span>
            </div>

            <SectionHeader title="8 tab — dùng cho việc gì, khi nào" />
            {TABS_GUIDE.map((t) => <GuideTabCard key={t.n} {...t} />)}

            <SectionHeader title="Thứ tự gợi ý khi mới bắt đầu" />
            <div style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "18px 20px", marginBottom: "14px" }}>
              <ol style={{ margin: 0, paddingLeft: 18, fontSize: "13.5px", lineHeight: 1.9, color: "#22201C" }}>
                <li><b>Tần suất</b> — nắm khung từ vựng lõi trước khi đi vào chi tiết ngữ âm.</li>
                <li><b>Biến điệu</b> — học ngay từ đầu vì đây là quy tắc bắt buộc, sai sớm sẽ thành thói quen khó sửa.</li>
                <li><b>Hán Việt</b> — dùng nền Hán Việt sẵn có để tăng tốc đoán từ mới (đọc kỹ mục 4 "Từ giả Hán Việt" để tránh hiểu sai nghĩa).</li>
                <li><b>Cặp âm</b> — chêm vào các buổi luyện nghe ngắn để rèn tai phân biệt thanh điệu song song.</li>
                <li><b>Biểu âm</b> và <b>Lượng từ</b> — tra cứu khi cần, không cần học thuộc trước.</li>
                <li><b>Thành ngữ</b> — thêm vào khi vốn từ đã ổn định, để nâng văn phong.</li>
                <li><b>Xen kẽ</b> — tham khảo phương pháp này để tự thiết kế lịch học một khi đã quen các tab dữ liệu ở trên.</li>
              </ol>
            </div>

            <SectionHeader title="Ô tìm kiếm" />
            <div style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#5C5548", marginBottom: "14px" }}>
              Mỗi tab dữ liệu (trừ "Xen kẽ" và tab Hướng dẫn này) đều có chung một ô tìm kiếm ở đầu trang — gõ chữ Hán, âm Hán Việt, hoặc pinyin để lọc ngay trong tab đang mở. Ô tìm kiếm không lọc chéo giữa các tab, nên khi đổi tab hãy kiểm tra lại từ khóa vẫn còn phù hợp.
            </div>

            <SectionHeader title="Ghi chú bình duyệt" subtitle="Kết quả đợt thẩm định nội dung theo ngữ âm học lịch sử Hán ngữ — áp cho toàn bộ tab" />

            <div style={{ background: "rgba(107,70,112,0.06)", border: "1px solid rgba(107,70,112,0.32)", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: PLUM, marginBottom: "9px" }}>
                A · Những chỗ đã được đính chính
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.7, color: "#5C5548" }}>
                <div style={{ marginBottom: 6 }}><b>1. Quy luật Hỏi/Ngã bị đánh giá sai nghiêm trọng.</b> Bản trước ghi “chia gần như đôi giữa T3 và T4, không có quy luật thực dụng”, nhãn <i>Thấp</i>. Điều này không đúng: hỏi/ngã đều từ <Z>上聲</Z> và cho <b>Thanh 3</b> ở đại đa số trường hợp. Đã đổi nhãn sang <i>Cao</i>, viết lại mô tả và thay ví dụ để phản ánh đúng tỷ lệ; nhóm ngoại lệ T4 được giải thích bằng luật <Z>濁上變去</Z>.</div>
                <div style={{ marginBottom: 6 }}><b>2. Cả lớp thanh điệu bị đánh giá thấp hơn thực tế.</b> Bản trước mô tả thanh điệu là “lớp kém tin cậy nhất trong ba lớp”. Kết luận thẩm định ngược lại: đây là lớp CÓ HỆ THỐNG NHẤT, vì bốn dấu Hán Việt ánh xạ gần một-một vào bốn thanh trung cổ, và cả ba biến đổi thanh điệu của Quan Thoại đều đã được mô tả đầy đủ trong ngữ âm học lịch sử. Lớp thật sự lộn xộn là lớp <i>phụ âm đầu</i> (t-/th- và x-). Đã nâng Sắc/Nặng và hai quy luật bình thanh từ <i>Trung bình</i> lên <i>Cao</i>.</div>
                <div style={{ marginBottom: 6 }}><b>3. Hai quy luật vần -m bị xếp nhầm hạng.</b> Quan Thoại mất sạch phụ âm cuối -m, không tồn tại ngoại lệ. Đã nâng <i>-am</i> và <i>-âm/-im</i> từ <i>Trung bình</i> lên <i>Quy tắc cố định</i>.</div>
                <div style={{ marginBottom: 6 }}><b>4. Vần -oa mô tả thiếu một nhánh.</b> Bản trước ghi “-oa → -ua” nhưng ba trên năm ví dụ của chính nó lại cho -uo (<Z>火 huǒ · 過 guò · 果 guǒ</Z>). Đã tách thành hai nhánh theo nhiếp (假攝 → -ua, 果攝 → -uo).</div>
                <div style={{ marginBottom: 6 }}><b>5. Gán sai mặt chữ.</b> Mục “-at → -a” ghi <Z>法 phạt / fá</Z>; thực tế 法 đọc <i>pháp/fǎ</i>, còn chữ cho âm <i>phạt/fá</i> là <Z>罰</Z>. Đã sửa.</div>
                <div style={{ marginBottom: 6 }}><b>6. Sai về tự nguyên.</b> Mục biểu âm <Z>由</Z> liệt kê <Z>郵</Z> phồn thể là chữ phái sinh; nhưng 郵 là chữ hội ý (垂+邑), không chứa 由 — chỉ bản giản thể <Z>邮</Z> mới là hình thanh. Đã thay và chú thích.</div>
                <div><b>7. Thiếu quy tắc biến điệu quan trọng nhất.</b> Bảng biến điệu không có <b>bán tam thanh</b> (半三聲), trong khi đây mới là dạng đọc của đa số Thanh 3 trong dòng nói. Đã bổ sung, cùng quy tắc 不/一 rơi thanh nhẹ khi kẹp giữa (<Z>對不起</Z> duìbuqǐ).</div>
              </div>
            </div>

            <div style={{ background: "rgba(163,74,60,0.05)", border: "1px solid rgba(163,74,60,0.3)", borderLeft: `4px solid ${RUST}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: RUST, marginBottom: "9px" }}>
                B · Giới hạn còn lại — đọc trước khi tin bảng
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.7, color: "#5C5548" }}>
                <div style={{ marginBottom: 6 }}><b>(1) Đây là quy luật THỐNG KÊ, trừ hai mục có nhãn “Quy tắc cố định”.</b> Nhãn Cao ≈ đúng phần lớn nhưng vẫn có ngoại lệ rải rác; Trung bình ≈ chỉ nên dùng làm phỏng đoán đầu tiên. Không mục nào ở đây thay thế được từ điển khi bạn cần độ chính xác cho văn bản chính thức.</div>
                <div style={{ marginBottom: 6 }}><b>(2) Chiều suy luận chỉ đi một chiều an toàn.</b> Bảng dùng để đi từ <i>âm Hán Việt đã biết</i> → đoán âm Quan Thoại. Đi ngược lại (nghe tiếng Trung rồi suy ra chữ Hán/âm Hán Việt) kém tin cậy hơn nhiều, vì Quan Thoại đã mất nhiều đối lập mà tiếng Việt còn giữ — rất nhiều chữ khác nhau nay trùng âm hoàn toàn.</div>
                <div style={{ marginBottom: 6 }}><b>(3) Chữ đa âm không được xử lý.</b> Bảng ngầm giả định mỗi chữ một âm. Thực tế nhiều chữ thông dụng có nhiều âm đọc theo nghĩa (<Z>行 xíng/háng · 長 cháng/zhǎng · 重 zhòng/chóng · 樂 lè/yuè</Z>), và âm Hán Việt cũng vậy (hành/hàng, trường/trưởng, trọng/trùng, lạc/nhạc). Khi một chữ có vẻ “phá quy luật”, khả năng cao là bạn đang đối chiếu nhầm cặp âm.</div>
                <div style={{ marginBottom: 6 }}><b>(4) Nguồn vay không thuần nhất.</b> Ngoài lớp Hán Việt tiêu chuẩn (thế kỷ 8–10), tiếng Việt còn có lớp Hán cổ vay sớm hơn (mùa/vụ, buồng/phòng, gần/cận) và lớp Hán Việt Việt hoá muộn. Bảng chỉ áp cho lớp tiêu chuẩn; áp vào từ thuần Việt gốc Hán cổ sẽ ra kết quả sai.</div>
                <div><b>(5) Chuẩn tham chiếu là Phổ thông thoại đại lục.</b> Thanh điệu, biến điệu và một số âm đọc có khác biệt hệ thống với chuẩn Đài Loan (國語) — ví dụ <Z>期</Z> đọc qī ở đại lục nhưng qí ở Đài Loan, <Z>星期</Z> cũng khác. Nếu bạn học theo giáo trình Đài Loan, đối chiếu lại thanh điệu trước khi dùng.</div>
              </div>
            </div>

            <div style={{ fontSize: "12.5px", lineHeight: 1.7, color: "#8B7F6E", background: "#EDE6D8", borderRadius: "8px", padding: "13px 18px", fontStyle: "italic" }}>
              Phương pháp thẩm định: đối chiếu từng quy luật với hệ thống thanh mẫu/vận mẫu Hán trung cổ (theo khung Thiết vận) và ba biến đổi lớn của Quan Thoại (平分陰陽 · 濁上變去 · 入派三聲), rồi kiểm chứng lại bằng chính tập ví dụ mà bảng đưa ra — nhiều lỗi phát hiện ở trên lộ ra chính vì ví dụ tự mâu thuẫn với quy luật được phát biểu. Các con số thống kê về chữ hình thanh trích từ Chu Hữu Quang (周有光, 1978). Tài liệu này phục vụ mục đích học tập; với nghiên cứu học thuật cần tra cứu trực tiếp vận thư và từ điển chuyên ngành.
            </div>
          </>
        )}

        {tab === "hv" && (
          <>
            <Intro text="Ba lớp quy luật đầu (thanh điệu/phụ âm/vần) không phải mẹo ghi nhớ tuỳ tiện, mà là hệ quả có thể chứng minh của việc tiếng Việt và Quan Thoại cùng thừa kế một hệ thống mẹ — Hán ngữ trung cổ. Riêng lớp Từ giả Hán Việt không phải quy luật âm mà là cạm bẫy ngữ nghĩa." />

            {!query && (
              <ProfNote title="Vì sao bảng này hoạt động: bốn dấu Hán Việt CHÍNH LÀ bốn thanh Hán trung cổ">
                Âm Hán Việt là một lớp vay mượn có hệ thống từ Hán ngữ trung cổ (khoảng thế kỷ 8–10), và nó bảo tồn hệ bốn thanh <Z>平·上·去·入</Z> gần như nguyên vẹn:{" "}
                <b>ngang/huyền</b> = bình thanh, <b>hỏi/ngã</b> = thượng thanh, <b>sắc/nặng ở âm tiết mở</b> = khứ thanh, <b>sắc/nặng ở âm tiết đóng (-p/-t/-c/-ch)</b> = nhập thanh.
                Trong mỗi cặp, dấu thứ nhất ứng với phụ âm đầu VÔ THANH, dấu thứ hai ứng với phụ âm đầu HỮU THANH của tiếng Hán cổ.
                {" "}Quan Thoại sau đó chỉ làm đúng ba việc với hệ đó: <Z>平分陰陽</Z> (bình thanh tách đôi theo thanh tính phụ âm → T1/T2),{" "}
                <Z>濁上變去</Z> (thượng thanh có phụ âm hữu thanh tắc chuyển sang khứ thanh → T4), và <Z>入派三聲</Z> (nhập thanh mất phụ âm cuối rồi phân tán).
                {" "}Vì vậy suy từ dấu Hán Việt sang thanh Quan Thoại là một phép SUY DẪN có căn cứ, không phải trùng hợp — và cũng vì vậy mà chỗ nào Quan Thoại đã biến đổi thì chỗ đó mới sinh ngoại lệ.
              </ProfNote>
            )}

            <SectionHeader title="1. Thanh điệu" subtitle="Đã hiệu chỉnh: lớp này tin cậy hơn nhiều so với cách trình bày phổ thông" />
            {fTone.map((r, i) => <RuleCard key={i} rule={r} />)}

            {!query && (
              <>
                <Pitfall title="Đính chính: “Hỏi/Ngã chia gần như đôi giữa T3 và T4” là một tuyên bố SAI">
                  Đây là chỗ nhiều tài liệu mẹo tiếng Trung cho người Việt nói sai, và bản trước của bảng này cũng mắc.
                  Sự thật: hỏi và ngã đều từ <Z>上聲</Z>, mà thượng thanh vào Quan Thoại phần lớn GIỮ NGUYÊN thành Thanh 3.
                  Kiểm chứng nhanh bằng chính các chữ thông dụng nhất: <Z>好 hǎo · 小 xiǎo · 水 shuǐ · 手 shǒu · 火 huǒ · 我 wǒ · 五 wǔ · 有 yǒu · 馬 mǎ · 買 mǎi · 老 lǎo · 女 nǚ · 米 mǐ · 語 yǔ · 兩 liǎng</Z> — toàn bộ đều T3.
                  {" "}Nhóm rơi sang T4 là <i>thiểu số có quy luật</i>, không phải ngẫu nhiên: đó là các chữ mà phụ âm đầu tiếng Hán cổ là âm TẮC HỮU THANH, bị luật <Z>濁上變去</Z> đẩy sang khứ thanh —{" "}
                  <Z>技 jì · 士 shì · 舅 jiù · 抱 bào · 悌 tì</Z>. Cách dùng đúng: mặc định đoán T3; chỉ nghi ngờ T4 khi chữ đó mang dấu ngã VÀ phụ âm đầu Quan Thoại là âm tắc không bật hơi (b/d/g/j/zh/z).
                </Pitfall>

                <ProfNote title="Nhập thanh KHÔNG hoàn toàn bất khả đoán — khoảng hai phần ba số chữ vẫn suy được">
                  Bảng ghi “thanh không đoán được” là đúng với <i>một phần</i> nhập thanh thôi. Thực tế Quan Thoại phân phối nhập thanh theo thanh tính của phụ âm đầu cổ, và dấu Hán Việt để lộ chính thông tin đó:
                  <div style={{ marginTop: 8, paddingLeft: 2 }}>
                    <div style={{ marginBottom: 5 }}>▸ <b>Dấu NẶNG + phụ âm vang (m, n, ng, nh, l, v, d)</b> → gần như luôn <b>Thanh 4</b>:{" "}
                      <Z>月 yuè · 日 rì · 六 liù · 力 lì · 木 mù · 肉 ròu · 物 wù · 落 luò · 業 yè · 熱 rè · 立 lì · 玉 yù</Z>.</div>
                    <div style={{ marginBottom: 5 }}>▸ <b>Dấu NẶNG + phụ âm tắc/xát (b, đ, t, th, tr, c, h, ph, x)</b> → gần như luôn <b>Thanh 2</b>:{" "}
                      <Z>十 shí · 學 xué · 白 bái · 直 zhí · 讀 dú · 集 jí · 習 xí · 服 fú · 食 shí · 石 shí · 別 bié · 局 jú</Z>.</div>
                    <div>▸ <b>Dấu SẮC</b> (phụ âm đầu cổ vô thanh) → đây mới là nhóm thật sự phân tán đủ bốn thanh:{" "}
                      <Z>一 yī</Z>(T1) · <Z>國 guó</Z>(T2) · <Z>百 bǎi</Z>(T3) · <Z>各 gè</Z>(T4). Nhóm này bắt buộc tra.</div>
                  </div>
                  <div style={{ marginTop: 8 }}>Nói cách khác: gặp âm nhập thanh mang dấu nặng thì bạn đã biết thanh Quan Thoại rồi; chỉ dấu sắc mới cần từ điển.</div>
                </ProfNote>
              </>
            )}

            <SectionHeader title="2. Phụ âm đầu" subtitle="nh-→r-, ng-→zero, v-→w-, ph-→f- là bốn quy luật mạnh nhất" />
            {fInitial.map((r, i) => <RuleCard key={i} rule={r} />)}

            {!query && (
              <>
                <ProfNote title="Một quy luật duy nhất giải thích cùng lúc năm dòng phụ âm đang bị xếp “Trung bình”">
                  Các mục b-, đ-, tr-, c/k-, qu-, t- bị đánh giá “Trung bình” không phải vì chúng hỗn loạn, mà vì bảng đang gộp hai nhóm nguồn khác nhau vào một dòng.
                  Tách ra bằng <b>dấu thanh</b> là hết mơ hồ. Quy luật gốc là <Z>濁音清化</Z> kèm nguyên tắc <Z>平送仄不送</Z>: các phụ âm tắc HỮU THANH của tiếng Hán cổ đều mất tính hữu thanh, nhưng ở BÌNH THANH thì hoá thành âm BẬT HƠI, ở các thanh còn lại thì thành âm không bật hơi.
                  Mà bình thanh + phụ âm hữu thanh trong tiếng Việt chính là <b>dấu huyền</b>. Do đó:
                  <div style={{ marginTop: 8, paddingLeft: 2 }}>
                    <div style={{ marginBottom: 4 }}>▸ <b>b- + huyền → p-</b>: <Z>平 píng · 皮 pí · 朋 péng · 盤 pán</Z> (còn <Z>白 bái · 北 běi · 半 bàn</Z> giữ b-)</div>
                    <div style={{ marginBottom: 4 }}>▸ <b>đ- + huyền → t-</b>: <Z>同 tóng · 頭 tóu · 田 tián · 堂 táng</Z> (còn <Z>東 dōng · 道 dào · 大 dà</Z> giữ d-)</div>
                    <div style={{ marginBottom: 4 }}>▸ <b>tr- + huyền → ch-</b>: <Z>長 cháng · 茶 chá · 陳 chén · 蟲 chóng · 池 chí</Z> (còn <Z>中 zhōng · 竹 zhú · 重 zhòng</Z> giữ zh-)</div>
                    <div style={{ marginBottom: 4 }}>▸ <b>c/k/qu- + huyền → k-/q-</b>: <Z>求 qiú · 期 qī · 強 qiáng · 權 quán · 群 qún · 狂 kuáng</Z> (còn <Z>金 jīn · 公 gōng · 光 guāng</Z> giữ j-/g-)</div>
                    <div>▸ <b>t- + huyền → c-/q-</b>: <Z>才 cái · 財 cái · 從 cóng · 錢 qián · 前 qián</Z> (còn <Z>在 zài · 自 zì · 走 zǒu</Z> giữ z-)</div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    Học một câu là đủ dùng cho cả năm dòng: <b>“Dấu huyền trên phụ âm tắc ⇒ Quan Thoại bật hơi.”</b> Đây là lượng thông tin lớn nhất mà một người Việt có thể rút ra từ vốn Hán Việt sẵn có.
                  </div>
                </ProfNote>

                <Pitfall title="Ba chỗ mô tả phụ âm đầu trong bảng còn chưa đủ chính xác">
                  <div style={{ marginBottom: 6 }}>
                    <b>1. “ng- → y-” chỉ đúng một nửa.</b> Bản chất là phụ âm <Z>疑</Z> (ng-) BIẾN MẤT hoàn toàn, để lại âm tiết không phụ âm đầu. Chữ cái <i>y</i> và <i>w</i> trong pinyin chỉ là quy ước CHÍNH TẢ để viết âm tiết bắt đầu bằng i-/u-, không phải hai phụ âm khác nhau. Vì thế ng- cho ra <i>y-</i> trước i/ü (<Z>言 yán · 魚 yú · 業 yè</Z>) nhưng cho ra <i>w-</i> trước u/o/a (<Z>我 wǒ · 五 wǔ · 外 wài</Z>), và cho ra zero thật sự trước a (<Z>岸 àn</Z>).
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <b>2. “v- → w-” có một nhóm trừ.</b> Nhóm <Z>微</Z> chuyển đều sang w- (<Z>文 wén · 問 wèn · 萬 wàn · 武 wǔ · 務 wù</Z>), nhưng nhóm <Z>云</Z> lại cho y-: <Z>雲 yún · 遠 yuǎn · 永 yǒng · 越 yuè</Z>. Cùng viết v- trong Hán Việt, khác kết quả.
                  </div>
                  <div>
                    <b>3. “nh- → r-” trừ một nhóm nhỏ rất thông dụng.</b> Phụ âm <Z>日</Z> đứng trước vần <i>-i</i> cổ không cho r- mà cho <b>er</b>: <Z>二 èr · 兒 ér · 耳 ěr</Z>. Ba chữ này nằm trong nhóm tần suất cao nhất nên đáng nhớ riêng.
                  </div>
                </Pitfall>
              </>
            )}

            <SectionHeader title="3. Vần / âm cuối" subtitle="Hai quy luật tuyệt đối: mất nhập thanh (-p/-t/-c/-ch) và mất -m" />
            {fFinal.map((r, i) => <RuleCard key={i} rule={r} />)}

            {!query && (
              <ProfNote title="Cách kiểm tra nhanh một suy đoán vần: Quan Thoại chỉ còn đúng hai phụ âm cuối">
                Toàn bộ hệ phụ âm cuối phong phú của Hán trung cổ (-p, -t, -k, -m, -n, -ng) vào Quan Thoại hiện đại chỉ còn lại <b>-n</b> và <b>-ng</b>.
                Hệ quả kiểm tra chéo rất mạnh: nếu bạn suy ra một âm tiết Quan Thoại kết thúc bằng -m, -p, -t, -c thì <i>chắc chắn</i> đã suy sai, không cần tra cũng biết.
                {" "}Tiếng Việt ngược lại giữ gần như trọn vẹn hệ đó, nên người Việt có lợi thế đọc thơ Đường đúng vần hơn người bản ngữ Bắc Kinh — nhưng lại rất dễ mang thói quen đóng âm tiết (-m, -p, -t) vào tiếng Trung khi nói.
                Đây là lỗi phát âm dai dẳng nhất của người Việt và nên được sửa sớm: âm tiết Quan Thoại hoặc mở, hoặc kết bằng -n/-ng, không có lựa chọn thứ ba.
              </ProfNote>
            )}

            <SectionHeader title="4. Từ giả Hán Việt" subtitle="Âm giống nhau nhưng nghĩa đã lệch qua nhiều thế kỷ" />
            {fFriends.map((f, i) => (
              <div key={i} style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderLeft: "4px solid #2B3A55", borderRadius: "8px", padding: "16px 20px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "22px", fontWeight: 700, color: "#22201C" }}>{f.char}</span>
                  <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", color: "#2B3A55", fontSize: "15px" }}>{f.hv}</span>
                </div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#5C5548", marginBottom: "6px" }}><b style={{ color: "#8B7F6E" }}>VN nghĩ là:</b> {f.hvMeaning}</div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#5C5548", marginBottom: "6px" }}><b style={{ color: "#2B3A55" }}>Thực ra là:</b> {f.cnMeaning}</div>
                <div style={{ fontSize: "12.5px", lineHeight: 1.6, color: "#3E6259", fontStyle: "italic" }}>{f.correct}</div>
              </div>
            ))}
            {!query && (
              <ProfNote title="Vì sao nghĩa lệch: người Việt không mượn sai, mà mượn ĐÚNG một tiếng Trung đã không còn tồn tại">
                Gần như mọi mục ở trên đều không phải lỗi dịch, mà là hệ quả của việc hai ngôn ngữ tách nhau rồi biến đổi độc lập.
                Tiếng Việt vay mượn và <b>đóng băng</b> nghĩa của thời điểm vay (thường là văn ngôn đời Đường–Tống), trong khi tiếng Trung tiếp tục trôi.
                {" "}<Z>便宜</Z> vốn nghĩa “thuận tiện” đúng như tiếng Việt hiểu, rồi mới trượt sang “rẻ” trong Quan Thoại hiện đại.{" "}
                <Z>丈夫</Z> vốn là “người đàn ông trưởng thành, đấng nam nhi”, tiếng Việt giữ nghĩa đó, tiếng Trung thu hẹp lại thành “chồng”.{" "}
                <Z>手段</Z> vốn trung tính là “cách làm”, tiếng Việt mới là bên thêm sắc thái xấu vào.
                <div style={{ marginTop: 8 }}>
                  Hệ quả thực dụng cho người học: khi một từ Hán Việt và từ Trung hiện đại lệch nhau, <b>đừng mặc định bên nào sai</b> — hãy giả định tiếng Việt đang giữ nghĩa CỔ hơn và tiếng Trung đã chuyên biệt hoá. Cách đoán này đúng ở đa số trường hợp và giúp nhớ cặp nghĩa lâu hơn nhiều so với học thuộc từng cặp rời rạc.
                </div>
              </ProfNote>
            )}
            {fTone.length + fInitial.length + fFinal.length + fFriends.length === 0 && <Empty />}
          </>
        )}

        {tab === "phonetic" && (
          <>
            <Intro text="~80% chữ Hán là hình thanh tự: nửa biểu nghĩa + nửa biểu âm. Học các bộ phận biểu âm phổ biến giúp thu hẹp phỏng đoán ÂM ĐỌC của chữ mới, không cần học thuộc riêng lẻ." />

            {!query && (
              <Pitfall title="Con số “80% là hình thanh” đúng, nhưng suy ra “đoán được 80% âm đọc” thì SAI">
                Hai con số này thường bị gộp làm một và đó là hiểu lầm phổ biến nhất về chữ Hán.
                Đúng là khoảng 80–82% chữ Hán có cấu tạo hình thanh, nhưng thống kê kinh điển của Chu Hữu Quang (周有光, 1978) trên chữ Hán hiện đại cho thấy chỉ khoảng <b>39%</b> chữ hình thanh có bộ biểu âm cho ra đúng âm đọc hiện đại <i>kể cả thanh điệu</i>; nới lỏng điều kiện (bỏ qua thanh điệu, chấp nhận âm gần) thì mới lên khoảng hai phần ba.
                <div style={{ marginTop: 8 }}>
                  Lý do có tính lịch sử chứ không phải do chữ viết kém: bộ biểu âm được chọn để ghi âm đọc của <b>tiếng Hán thượng cổ/trung cổ</b>, rồi ngữ âm trôi suốt hai nghìn năm trong khi mặt chữ đứng yên. Cặp <Z>江 jiāng</Z> và bộ biểu âm <Z>工 gōng</Z> từng vần với nhau, nay thì không.
                </div>
                <div style={{ marginTop: 8 }}>
                  <b>Cách dùng đúng</b>: coi bộ biểu âm là công cụ THU HẸP và MÓC NHỚ, không phải công cụ dự đoán. Gặp chữ lạ có bộ <Z>青</Z>, kết luận hợp lý là “nhiều khả năng vần -ing, phụ âm đầu q- hoặc j-, thanh chưa rõ” — đủ để nhớ nhanh và tra đúng, nhưng chưa đủ để phát âm ngay.
                </div>
              </Pitfall>
            )}

            {!query && (
              <ProfNote title="Ba dấu hiệu cho biết một bộ biểu âm có đáng tin hay không">
                <div style={{ marginBottom: 5 }}>▸ <b>Vị trí.</b> Bộ biểu âm nằm bên PHẢI hoặc BÊN DƯỚI thì độ tin cậy cao hơn hẳn (<Z>清 qīng · 情 qíng · 請 qǐng</Z>), vì đó là bố cục hình thanh chuẩn. Khi phần biểu âm nằm bên trái thì thường chữ đó có cấu tạo bất thường và nên nghi ngờ.</div>
                <div style={{ marginBottom: 5 }}>▸ <b>Độ phức tạp.</b> Bộ biểu âm càng nhiều nét, khả năng nó thật sự là biểu âm càng cao — các thành phần đơn giản (<Z>口 · 日 · 一</Z>) thường là bộ biểu NGHĨA.</div>
                <div style={{ marginBottom: 8 }}>▸ <b>Bản giản thể vs phồn thể.</b> Đợt giản hoá 1956 đôi khi TẠO RA tính biểu âm mà bản phồn thể không có: <Z>郵</Z> (hội ý, không chứa 由) được giản hoá thành <Z>邮</Z> = 由 + 阝, lúc này 由 mới thành biểu âm thật. Ngược lại cũng có trường hợp giản hoá phá mất manh mối âm. Vì vậy khi phân tích tự dạng, phải nói rõ đang nói về bản nào.</div>
                <div>
                  Ghi chú thẩm định: mục <Z>由</Z> trong bảng dưới đây đã được sửa theo đúng điểm thứ ba — bản trước liệt kê <Z>郵</Z> phồn thể là chữ phái sinh của 由, điều này không đúng về mặt tự nguyên.
                </div>
              </ProfNote>
            )}
            {fPhonetic.length === 0 && <Empty />}
            {fPhonetic.map((g, i) => (
              <div key={i} style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "18px 20px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "26px", fontWeight: 700, color: "#2B3A55" }}>{g.comp}</span>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600, fontSize: "15px" }}>{g.py}</span>
                  <span style={{ fontSize: "12.5px", color: "#8B7F6E" }}>({g.meaning})</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px 16px", borderTop: "1px dashed rgba(43,58,85,0.25)", paddingTop: "12px" }}>
                  {g.derived.map((d, j) => (
                    <div key={j} style={{ fontSize: "13.5px", lineHeight: 1.5 }}>
                      <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#22201C", fontWeight: 600 }}>{d.hv}</span>{" "}
                      <span style={{ color: "#2B3A55" }}>{d.py}</span>{" "}
                      <span style={{ color: "#8B7F6E", fontSize: "12px" }}>— {d.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "sandhi" && (
          <>
            <Intro text="Khác với các quy luật thống kê ở tab đầu — biến điệu là QUY TẮC CỐ ĐỊNH, xảy ra 100% mỗi lần. Học một lần, dùng suốt đời." />

            {!query && (
              <Pitfall title="Quy tắc quan trọng nhất của Thanh 3 lại là quy tắc hay bị bỏ sót nhất">
                Hầu hết tài liệu chỉ dạy “T3 + T3 → T2 + T3” rồi dừng, khiến người học tưởng mọi Thanh 3 còn lại đều đọc đầy đủ đường cong xuống-rồi-lên.
                Thực tế ngược lại: <b>Thanh 3 đầy đủ là trường hợp HIẾM</b>, chỉ xuất hiện khi chữ đứng một mình hoặc ở cuối ngữ đoạn.
                Trong dòng nói bình thường, đa số Thanh 3 được đọc dưới dạng <b>bán tam thanh</b> (半三聲) — chỉ hạ giọng xuống thấp rồi dừng, bỏ hẳn phần vống lên.
                <div style={{ marginTop: 8 }}>
                  Đây là lỗi phát âm khiến người Việt nghe “nặng” và chậm nhất, hơn cả lỗi phụ âm. Quy tắc bán tam thanh đã được bổ sung vào bảng bên dưới sau đợt thẩm định này.
                </div>
              </Pitfall>
            )}

            {fSandhi.length === 0 && <Empty />}
            {fSandhi.map((r, i) => <RuleCard key={i} rule={r} />)}

            {!query && (
              <ProfNote title="Biến điệu là quy tắc của LỜI NÓI, không phải của chữ viết — và không ghi vào pinyin chuẩn">
                Một hiểu lầm hay gặp: học viên thấy ghi “níhǎo” rồi tưởng cách viết pinyin chuẩn của <Z>你好</Z> là như vậy.
                Không phải. Quy phạm chính tả pinyin (<i>GB/T 16159</i>) yêu cầu ghi <b>thanh gốc</b>: <Z>你好</Z> luôn viết là <i>nǐ hǎo</i>, <Z>不是</Z> luôn viết là <i>bù shì</i>.
                Các dạng níhǎo/búshì trong bảng này là ký hiệu MÔ TẢ cách đọc, dùng để luyện miệng, không dùng khi viết bài hay gõ văn bản.
                <div style={{ marginTop: 8 }}>
                  Hai ngoại lệ được quy phạm cho phép ghi theo thanh đã biến: <Z>一</Z> và <Z>不</Z> trong nhiều từ điển giáo khoa vẫn được chú theo âm thực tế (yí dìng, bú shì) để tiện dạy — nên nếu bạn thấy tài liệu ghi khác nhau ở đúng hai chữ này thì cả hai đều không sai.
                </div>
              </ProfNote>
            )}
          </>
        )}

        {tab === "measure" && (
          <>
            <Intro text="Tiếng Việt có sẵn hệ thống loại từ (cái, con, quyển, chiếc...) — bạn chỉ cần map lại sang lượng từ tiếng Trung, không phải học khái niệm này từ đầu như người phương Tây." />

            {!query && (
              <Pitfall title="Hai lỗi ngữ pháp lượng từ mà bảng tra một cột không cảnh báo được">
                <div style={{ marginBottom: 7 }}>
                  <b>1. “Hai” trước lượng từ phải là <Z>兩</Z>, không phải <Z>二</Z>.</b> Đây là lỗi gần như 100% người mới học mắc.
                  Dùng <Z>兩</Z> khi ĐẾM vật: <Z>兩個人 · 兩本書 · 兩杯水</Z>. Dùng <Z>二</Z> khi đọc SỐ, số thứ tự, và trong số nhiều chữ số:{" "}
                  <Z>十二 · 第二 · 二十 · 二零二五年</Z>. Nói <Z>二個人</Z> là sai ngữ pháp, không phải chỉ “nghe lạ”.
                </div>
                <div>
                  <b>2. Lượng từ kéo theo biến điệu của <Z>一</Z>.</b> Vì <Z>一</Z> đổi thanh theo thanh của âm ĐI SAU, mà âm đi sau ở đây chính là lượng từ, nên cùng chữ <Z>一</Z> sẽ đọc khác nhau tuỳ lượng từ:{" "}
                  <Z>一個</Z> → yí gè (個 là T4), <Z>一本</Z> → yì běn (本 là T3), <Z>一杯</Z> → yì bēi (杯 là T1). Học lượng từ mà không gắn kèm biến điệu thì nói ra vẫn sai.
                </div>
              </Pitfall>
            )}

            {!query && (
              <ProfNote title="Lợi thế của người Việt ở đây là thật, nhưng có một chỗ không map được">
                Tiếng Việt và tiếng Trung cùng thuộc vùng ngôn ngữ có hệ loại từ bắt buộc, nên trực giác “phải có một từ giữa số và danh từ” đã có sẵn — đây là lợi thế thật so với người học nói tiếng Anh.
                Nhưng có một điểm bất đối xứng cần biết: tiếng Trung dùng lượng từ cả cho <b>ĐỘNG TỪ</b> (動量詞), điều tiếng Việt không có tương ứng chặt chẽ.{" "}
                <Z>次 · 遍 · 下 · 趟</Z> đếm số LẦN của hành động và đứng SAU động từ: <Z>看一次</Z> (xem một lần), <Z>說一遍</Z> (nói lại một lượt trọn vẹn), <Z>等一下</Z> (chờ một chút).
                <div style={{ marginTop: 8 }}>
                  Phân biệt tinh: <Z>次</Z> đếm lần lặp lại nói chung, còn <Z>遍</Z> nhấn mạnh “trọn vẹn từ đầu đến cuối” — <Z>看了三次</Z> là xem ba lần (có thể xem dở), <Z>看了三遍</Z> là xem trọn ba lượt. Đây là chỗ người Việt hay dùng lẫn vì tiếng Việt gộp cả hai vào chữ “lần”.
                </div>
              </ProfNote>
            )}
            {fMeasure.length === 0 && <Empty />}
            {fMeasure.map((m, i) => (
              <div key={i} style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "14px 20px", marginBottom: "10px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "20px", fontWeight: 700, color: "#22201C", minWidth: "70px" }}>{m.hanzi}</div>
                <div style={{ fontFamily: "'Noto Serif SC', serif", color: "#2B3A55", fontWeight: 600, minWidth: "50px" }}>{m.py}</div>
                <div style={{ fontSize: "13px", color: "#5C5548", flex: "1 1 200px" }}><b style={{ color: "#3E6259" }}>≈ {m.loaiTu}</b></div>
                <div style={{ fontSize: "12.5px", color: "#8B7F6E", fontStyle: "italic" }}>{m.example}</div>
              </div>
            ))}
          </>
        )}

        {tab === "freq" && (
          <>
            <Intro text="HSK không xếp theo tần suất sử dụng thực tế. ~1000-2500 từ tần suất cao nhất phủ hơn 90% văn bản/hội thoại hằng ngày — ưu tiên nhóm này trước khi học tuần tự theo giáo trình." />
            {fFreq.length === 0 && <Empty />}
            {fFreq.map((g, i) => (
              <div key={i} style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "15px", color: "#22201C", marginBottom: "10px" }}>{g.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {g.words.map((w, j) => (
                    <span key={j} style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "13px", background: "#EDE6D8", padding: "4px 10px", borderRadius: "6px", color: "#22201C" }}>{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "minimal" && (
          <>
            <Intro text="Trước khi luyện nói đúng thanh điệu, hãy luyện tai NHẬN DIỆN riêng biệt các thanh — dùng các bộ cặp tối thiểu (chỉ khác thanh điệu) này để tự kiểm tra." />

            {!query && (
              <ProfNote title="Vì sao người Việt nghe thanh điệu tiếng Trung khó hơn dự đoán, dù tiếng Việt cũng có thanh">
                Trực giác thông thường cho rằng người có tiếng mẹ đẻ nhiều thanh sẽ học thanh tiếng Trung dễ. Điều này chỉ đúng một phần, và phần không đúng mới là phần gây lỗi dai dẳng.
                Tiếng Việt phân biệt thanh chủ yếu bằng <b>chất giọng</b> (thanh hầu, hơi thở, giọng kẹt — như ở hỏi/ngã/nặng), còn Quan Thoại phân biệt gần như thuần bằng <b>đường nét cao độ</b> (contour).
                Người Việt do đó có xu hướng nghe/tái tạo thanh Trung qua bộ lọc chất giọng của mình: Thanh 3 bị đọc thành giọng kẹt kiểu dấu ngã, Thanh 4 bị đọc gằn như dấu nặng.
                <div style={{ marginTop: 8 }}>
                  <b>Hệ quả luyện tập</b>: đừng chỉ nghe rồi nhại. Hãy luyện theo cặp có tương phản gây nhầm nhất với người Việt — <b>T2 vs T3</b> (cả hai đều “đi lên” ở tai người Việt) và <b>T1 vs T4</b> (cả hai đều không có chất giọng đặc trưng để bám). Các bộ <Z>mā/má/mǎ/mà</Z> và <Z>shū/shú/shǔ/shù</Z> bên dưới nên được nghe xáo trộn thứ tự, vì nghe theo đúng thứ tự 1-2-3-4 sẽ tạo ảo giác phân biệt được trong khi thực chất đang đếm.
                </div>
              </ProfNote>
            )}
            {fPairs.length === 0 && <Empty />}
            {fPairs.map((p, i) => (
              <div key={i} style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "14px", color: "#2B3A55", marginBottom: "10px", letterSpacing: "0.03em" }}>{p.base.toUpperCase()}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                  {p.forms.map((f, j) => (
                    <div key={j} style={{ fontSize: "13.5px", lineHeight: 1.5 }}>
                      <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "17px", fontWeight: 700, color: "#22201C" }}>{f.hanzi}</span>{" "}
                      <span style={{ color: "#3E6259", fontWeight: 600 }}>{f.py}</span>
                      <div style={{ color: "#8B7F6E", fontSize: "12px" }}>{f.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "interleave" && (
          <>
            <Intro text="Interleaving (xen kẽ) — trộn nhiều kỹ năng trong cùng một buổi học hiệu quả hơn học khối (block practice), theo nghiên cứu của Robert Bjork về 'desirable difficulty'." />
            <div style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "20px 22px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "16px", color: "#22201C", marginBottom: "10px" }}>
                Vì sao xen kẽ hiệu quả hơn học khối?
              </div>
              <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#5C5548", margin: "0 0 10px" }}>
                Học khối (20 phút chỉ nghe, rồi 20 phút chỉ từ vựng) tạo cảm giác "trôi chảy"
                khi học nhưng lại KÉM lưu giữ lâu dài. Xen kẽ tạo ra một chút khó khăn ngay
                lúc học — não phải liên tục chuyển đổi ngữ cảnh — nhưng chính sự khó khăn đó
                buộc trí nhớ mã hóa sâu hơn, giữ được lâu hơn.
              </p>
            </div>
            <div style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "20px 22px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "16px", color: "#22201C", marginBottom: "12px" }}>
                Mẫu xen kẽ trong 1 buổi 25 phút (vi-interleaving)
              </div>
              {[
                ["1", "Nghe đoạn hội thoại ngắn (không nhìn chữ)", "5 phút"],
                ["2", "Shadowing — nhại lại ngay từng câu", "5 phút"],
                ["3", "Đọc lại cùng đoạn đó (nhìn chữ + pinyin)", "5 phút"],
                ["4", "Viết lại 3-5 câu từ trí nhớ (active recall)", "5 phút"],
                ["5", "Nói lại toàn bộ đoạn theo cách của mình", "5 phút"],
              ].map(([n, text, time]) => (
                <div key={n} style={{ display: "flex", gap: "12px", alignItems: "baseline", padding: "8px 0", borderBottom: "1px dashed rgba(43,58,85,0.25)" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: "#2B3A55", minWidth: "18px" }}>{n}</span>
                  <span style={{ fontSize: "13.5px", color: "#22201C", flex: 1 }}>{text}</span>
                  <span style={{ fontSize: "12px", color: "#8B7F6E" }}>{time}</span>
                </div>
              ))}
              <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "#8B7F6E", marginTop: "12px", fontStyle: "italic" }}>
                Điểm mấu chốt: cùng MỘT đoạn nội dung nhưng đi qua 5 kỹ năng khác nhau — không phải 5 nội dung khác nhau cho cùng 1 kỹ năng.
              </p>
            </div>

            <div style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "20px 22px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "16px", color: "#22201C", marginBottom: "10px" }}>
                Kết hợp với lặp lại ngắt quãng (spaced repetition)
              </div>
              <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#5C5548", margin: "0 0 10px" }}>
                Xen kẽ giải quyết việc học SÂU trong một buổi; lặp lại ngắt quãng giải quyết việc GIỮ LÂU
                qua nhiều ngày. Theo đường cong quên lãng của Ebbinghaus, kiến thức mới rơi rụng nhanh nhất
                trong 24 giờ đầu — nên việc ôn lại đúng lúc quan trọng hơn ôn nhiều lần dồn dập một buổi.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {[
                  ["Ngày 1", "Học nội dung mới (theo mẫu xen kẽ ở trên)"],
                  ["Ngày 2", "Ôn nhanh 5-10 phút (chỉ active recall, không xem lại tài liệu trước)"],
                  ["Ngày 4", "Ôn lại lần 2"],
                  ["Ngày 7", "Ôn lại lần 3"],
                  ["Ngày 15-30", "Ôn lại lần cuối — nếu vẫn nhớ tốt, coi như đã chuyển vào trí nhớ dài hạn"],
                ].map(([d, text]) => (
                  <div key={d} style={{ background: "#fff", border: "1px solid rgba(43,58,85,0.2)", borderRadius: "8px", padding: "10px 14px", flex: "1 1 150px" }}>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "12.5px", color: "#2B3A55", marginBottom: "4px" }}>{d}</div>
                    <div style={{ fontSize: "12.5px", color: "#5C5548", lineHeight: 1.5 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "20px 22px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "16px", color: "#22201C", marginBottom: "12px" }}>
                3 sai lầm thường gặp khi tự áp dụng xen kẽ
              </div>
              {[
                ["Xen kẽ chủ đề thay vì kỹ năng", "Học từ vựng chủ đề A, rồi chuyển sang ngữ pháp chủ đề B, rồi nghe chủ đề C — đây là học khối trá hình, không phải xen kẽ thật. Xen kẽ đúng nghĩa là GIỮ NGUYÊN một nội dung, đổi CÁCH tương tác với nó."],
                ["Đổi kỹ năng quá nhanh, chưa kịp căng não", "Xen kẽ có ích vì tạo độ khó vừa đủ — nếu đổi bước sau 30 giây thì chưa kịp thử sức đã bỏ cuộc, không có \"desirable difficulty\" nào để não ghi nhớ sâu hơn."],
                ["Nhầm cảm giác trôi chảy lúc học với việc đã nhớ lâu", "Học khối (chỉ nghe 30 phút liên tục) luôn cảm thấy dễ và tự tin hơn trong lúc học, nhưng đó là ảo giác — hiệu quả thật chỉ đo được sau vài ngày, khi thử nhớ lại mà không nhìn tài liệu."],
              ].map(([title, text], i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < 2 ? "1px dashed rgba(43,58,85,0.25)" : "none" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#2B3A55", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "13px", color: "#5C5548", lineHeight: 1.6 }}>{text}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "chengyu" && (
          <>
            <Intro text="Nhiều thành ngữ tiếng Việt là dịch/mượn trực tiếp từ chengyu (成语) cổ điển. Với nền Hán Việt, đây là lớp từ vựng 'sang trọng' có ROI cao hơn hẳn so với người học phương Tây." />

            {!query && (
              <Pitfall title="Lợi thế Hán Việt ở đây có mặt trái: nó tạo ra ba kiểu lỗi mà người phương Tây không mắc">
                <div style={{ marginBottom: 6 }}>
                  <b>1. Suy ngược từ âm Hán Việt ra chữ Hán sai.</b> Biết “nhập gia tùy tục” không cho phép suy ra chữ Hán, vì bản Trung là <Z>入鄉隨俗</Z> (鄉/hương) chứ không phải 家/gia. Tương tự, nhiều thành ngữ Việt đã thay chữ, đảo chữ hoặc rút gọn so với bản gốc. Âm Hán Việt giúp HIỂU, không đủ để VIẾT.
                </div>
                <div style={{ marginBottom: 6 }}>
                  <b>2. Dùng đúng nghĩa nhưng sai ngữ vực.</b> Chengyu trong tiếng Trung hiện đại thuộc văn phong trang trọng/văn viết. Người Việt do quen dùng thành ngữ trong khẩu ngữ hằng ngày nên hay chèn chengyu vào hội thoại thường, tạo cảm giác lên gân hoặc sách vở. Nói chuyện phiếm mà dùng <Z>杯水車薪</Z> thì nghe như đang đọc xã luận.
                </div>
                <div>
                  <b>3. Dùng đúng ngữ vực nhưng sai chức năng ngữ pháp.</b> Chengyu không phải khối bất động — mỗi cái có vai trò cú pháp cố định (làm vị ngữ, định ngữ, trạng ngữ...). <Z>自相矛盾</Z> làm vị ngữ (<Z>他的話自相矛盾</Z>), không thể bê nguyên vào vị trí danh từ. Học chengyu nên học kèm một câu mẫu, đừng học rời.
                </div>
              </Pitfall>
            )}
            {fChengyu.length === 0 && <Empty />}
            {fChengyu.map((c, i) => (
              <div key={i} style={{ background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "19px", fontWeight: 700, color: "#22201C" }}>{c.hanzi}</span>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#2B3A55", fontWeight: 600 }}>{c.py}</span>
                </div>
                <div style={{ fontSize: "13.5px", fontStyle: "italic", color: "#3E6259", marginBottom: "6px" }}>{c.hv}</div>
                <div style={{ fontSize: "13px", color: "#5C5548", lineHeight: 1.6 }}>{c.meaning}</div>
              </div>
            ))}
          </>
        )}

        {(() => {
          const idx = TABS.findIndex((t) => t.id === tab);
          const prev = idx > 0 ? TABS[idx - 1] : null;
          const next = idx >= 0 && idx < TABS.length - 1 ? TABS[idx + 1] : null;
          if (!prev && !next) return null;
          return (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 22, paddingTop: 14, borderTop: "1px solid rgba(43,58,85,0.25)" }}>
              {prev ? (
                <button
                  onClick={() => goToTab(prev.id)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 15px", borderRadius: 8, border: "1px solid #2B3A55", background: "rgba(43,58,85,0.06)", color: "#2B3A55", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                  ← Trước: {prev.label}
                </button>
              ) : <span />}
              {next && (
                <button
                  onClick={() => goToTab(next.id)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 15px", borderRadius: 8, border: "1px solid #2B3A55", background: "rgba(43,58,85,0.06)", color: "#2B3A55", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                  Tiếp: {next.label} →
                </button>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function Intro({ text }) {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13.5px", lineHeight: 1.6, color: "#5C5548", background: "#E4DECE", borderRadius: "8px", padding: "14px 18px", marginBottom: "18px" }}>
      {text}
    </div>
  );
}

function Empty() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#8B7F6E", textAlign: "center", padding: "30px 0" }}>
      Không tìm thấy kết quả khớp với từ khóa.
    </div>
  );
}
