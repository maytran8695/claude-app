import { useState, useMemo } from "react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Serif:ital@0;1&display=swap');
`;

const CONF = {
  high: { label: "Cao", color: "#3E6259", bg: "#E4EBE7" },
  mid: { label: "Trung bình", color: "#A6822F", bg: "#F1E9D6" },
  low: { label: "Thấp", color: "#8B7F6E", bg: "#EAE5DC" },
  struct: { label: "Quy tắc cố định", color: "#A13A2E", bg: "#F3E1DD" },
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
      <span style={{ color: "#A13A2E", fontFamily: "Inter, sans-serif" }}>→</span>
      <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600, color: "#22201C" }}>{py}</span>
      {note && <span style={{ color: "#8B7F6E", fontSize: "12px" }}>({note})</span>}
    </div>
  );
}

function RuleCard({ rule }) {
  return (
    <div style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "18px 20px", marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "17px", color: "#22201C" }}>
          {rule.from}
          <span style={{ color: "#A13A2E", margin: "0 8px" }}>→</span>
          {rule.to}
        </div>
        <ConfPill level={rule.conf} />
      </div>
      {rule.desc && (
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#5C5548", marginBottom: "12px", lineHeight: 1.5 }}>
          {rule.desc}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "6px 16px", borderTop: "1px dashed #D9CFBB", paddingTop: "10px" }}>
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
      <h2 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "19px", fontWeight: 700, color: "#22201C", margin: "0 0 4px", borderBottom: "2px solid #A13A2E", display: "inline-block", paddingBottom: "3px" }}>
        {title}
      </h2>
      {subtitle && <div style={{ fontSize: "12.5px", color: "#8B7F6E", marginTop: "4px" }}>{subtitle}</div>}
    </div>
  );
}

/* ---------- DATA: Hán Việt ↔ Quan Thoại (đã gộp) ---------- */

const toneRules = [
  { from: "Bình (ngang) — phụ âm đầu vô thanh", to: "Thanh 1 (阴平)", conf: "mid",
    desc: "Âm tiết có thanh ngang (không dấu) với phụ âm đầu vô thanh (t, th, x, s, ch, tr, h, ph, k/c...) có xu hướng rơi vào Thanh 1.",
    examples: [ { hv: "天 thiên", py: "tiān" }, { hv: "山 sơn", py: "shān" }, { hv: "心 tâm", py: "xīn" }, { hv: "三 tam", py: "sān" }, { hv: "春 xuân", py: "chūn" }, { hv: "初 sơ", py: "chū" }, { hv: "先 tiên", py: "xiān" }, { hv: "西 tây", py: "xī" }, { hv: "千 thiên", py: "qiān" }, { hv: "多 đa", py: "duō" } ] },
  { from: "Bình (huyền) — phụ âm đầu hữu thanh/vang", to: "Thanh 2 (阳平)", conf: "mid",
    desc: "Âm tiết có thanh huyền với phụ âm đầu hữu thanh hoặc âm vang (m, n, ng, nh, l, v, đ, d, gi...) có xu hướng rơi vào Thanh 2.",
    examples: [ { hv: "同 đồng", py: "tóng" }, { hv: "文 văn", py: "wén" }, { hv: "年 niên", py: "nián" }, { hv: "常 thường", py: "cháng" }, { hv: "田 điền", py: "tián" }, { hv: "龍 long", py: "lóng" }, { hv: "來 lai", py: "lái" }, { hv: "回 hồi", py: "huí" }, { hv: "何 hà", py: "hé" }, { hv: "麻 ma", py: "má" } ] },
  { from: "Hỏi / Ngã", to: "Thanh 3 hoặc Thanh 4", conf: "low",
    desc: "Đây là cặp thanh kém tin cậy nhất — chia gần như đôi, không có quy luật thực dụng. Đừng dựa vào đây để đoán, hãy tra từ điển.",
    examples: [ { hv: "語 ngữ", py: "yǔ", note: "T3" }, { hv: "使 sử", py: "shǐ", note: "T3" }, { hv: "是 thị", py: "shì", note: "T4" }, { hv: "跪 quỵ", py: "guì", note: "T4" }, { hv: "小 tiểu", py: "xiǎo", note: "T3" }, { hv: "老 lão", py: "lǎo", note: "T3" }, { hv: "似 tự", py: "sì", note: "T4" } ] },
  { from: "Sắc / Nặng (âm tiết mở)", to: "Thanh 4 (去声)", conf: "mid",
    desc: "Chỉ áp dụng cho âm tiết KHÔNG kết thúc bằng -p/-t/-c/-ch. Nếu có phụ âm cuối này, xem quy luật Nhập thanh bên dưới thay vì quy luật này.",
    examples: [ { hv: "意 ý", py: "yì" }, { hv: "志 chí", py: "zhì" }, { hv: "貴 quý", py: "guì" }, { hv: "愛 ái", py: "ài" }, { hv: "路 lộ", py: "lù" }, { hv: "在 tại", py: "zài" }, { hv: "自 tự", py: "zì" }, { hv: "見 kiến", py: "jiàn" } ] },
  { from: "Nhập thanh (kết thúc -p/-t/-c/-ch)", to: "Âm tiết mở, thanh không đoán được", conf: "struct",
    desc: "Quy luật CHẮC CHẮN nhất trong toàn bộ hệ thống: mọi âm Hán Việt kết thúc bằng -p, -t, -c, -ch đều tương ứng với âm tiết Quan Thoại không có phụ âm cuối.",
    examples: [ { hv: "一 nhất", py: "yī" }, { hv: "十 thập", py: "shí" }, { hv: "六 lục", py: "liù" }, { hv: "八 bát", py: "bā" }, { hv: "國 quốc", py: "guó" }, { hv: "學 học", py: "xué" }, { hv: "七 thất", py: "qī" }, { hv: "百 bách", py: "bǎi" }, { hv: "月 nguyệt", py: "yuè" }, { hv: "日 nhật", py: "rì" }, { hv: "北 bắc", py: "běi" }, { hv: "白 bạch", py: "bái" } ] },
];

const initialRules = [
  { from: "nh-", to: "r-", conf: "high", desc: "Một trong những quy luật đáng tin cậy nhất trong toàn bảng.",
    examples: [ { hv: "人 nhân", py: "rén" }, { hv: "日 nhật", py: "rì" }, { hv: "然 nhiên", py: "rán" }, { hv: "肉 nhục", py: "ròu" }, { hv: "熱 nhiệt", py: "rè" }, { hv: "軟 nhuyễn", py: "ruǎn" }, { hv: "讓 nhượng", py: "ràng" }, { hv: "認 nhận", py: "rèn" }, { hv: "如 như", py: "rú" }, { hv: "染 nhiễm", py: "rǎn" } ] },
  { from: "ng- / ngh-", to: "y- (hoặc câm)", conf: "high",
    examples: [ { hv: "元 nguyên", py: "yuán" }, { hv: "言 ngôn", py: "yán" }, { hv: "銀 ngân", py: "yín" }, { hv: "業 nghiệp", py: "yè" }, { hv: "硬 ngạnh", py: "yìng" }, { hv: "牛 ngưu", py: "niú" }, { hv: "魚 ngư", py: "yú" }, { hv: "藝 nghệ", py: "yì" }, { hv: "岸 ngạn", py: "àn" } ] },
  { from: "v-", to: "w-", conf: "high",
    examples: [ { hv: "文 văn", py: "wén" }, { hv: "問 vấn", py: "wèn" }, { hv: "萬 vạn", py: "wàn" }, { hv: "位 vị", py: "wèi" }, { hv: "忘 vong", py: "wàng" }, { hv: "王 vương", py: "wáng" }, { hv: "為 vi/vì", py: "wéi" }, { hv: "務 vụ", py: "wù" }, { hv: "武 vũ", py: "wǔ" } ] },
  { from: "h- (+ vần oa/oe)", to: "hu-", conf: "high", desc: "Kết hợp cả phụ âm đầu lẫn vần — độ tin cậy cao vì cả hai lớp cùng khớp.",
    examples: [ { hv: "花 hoa", py: "huā" }, { hv: "話 thoại", py: "huà" }, { hv: "火 hỏa", py: "huǒ" }, { hv: "化 hóa", py: "huà" }, { hv: "黃 hoàng", py: "huáng" }, { hv: "壞 hoại", py: "huài" }, { hv: "會 hội", py: "huì" }, { hv: "換 hoán", py: "huàn" } ] },
  { from: "c-/k- (trước i, e)", to: "j-", conf: "mid",
    examples: [ { hv: "金 kim", py: "jīn" }, { hv: "京 kinh", py: "jīng" }, { hv: "見 kiến", py: "jiàn" }, { hv: "記 ký", py: "jì" }, { hv: "己 kỷ", py: "jǐ" }, { hv: "計 kế", py: "jì" }, { hv: "教 giáo", py: "jiào" }, { hv: "家 gia", py: "jiā" } ] },
  { from: "c-/k- (trước a, o, u)", to: "g-", conf: "mid",
    examples: [ { hv: "公 công", py: "gōng" }, { hv: "光 quang", py: "guāng" }, { hv: "過 quá", py: "guò" }, { hv: "古 cổ", py: "gǔ" }, { hv: "高 cao", py: "gāo" }, { hv: "改 cải", py: "gǎi" }, { hv: "感 cảm", py: "gǎn" } ] },
  { from: "tr-", to: "zh-", conf: "mid",
    examples: [ { hv: "中 trung", py: "zhōng" }, { hv: "直 trực", py: "zhí" }, { hv: "重 trọng", py: "zhòng" }, { hv: "竹 trúc", py: "zhú" }, { hv: "住 trú", py: "zhù" }, { hv: "專 chuyên", py: "zhuān" }, { hv: "追 truy", py: "zhuī" } ] },
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
    examples: [ { hv: "母 mẫu", py: "mǔ" }, { hv: "木 mộc", py: "mù" }, { hv: "馬 mã", py: "mǎ" }, { hv: "米 mễ", py: "mǐ" }, { hv: "門 môn", py: "mén" }, { hv: "面 diện/mặt", py: "miàn" } ] },
  { from: "l-", to: "l-", conf: "high", desc: "Giữ nguyên phụ âm — ổn định.",
    examples: [ { hv: "老 lão", py: "lǎo" }, { hv: "力 lực", py: "lì" }, { hv: "六 lục", py: "liù" }, { hv: "路 lộ", py: "lù" }, { hv: "立 lập", py: "lì" }, { hv: "利 lợi", py: "lì" } ] },
  { from: "gi-", to: "j-", conf: "high",
    examples: [ { hv: "家 gia", py: "jiā" }, { hv: "教 giáo", py: "jiào" }, { hv: "界 giới", py: "jiè" }, { hv: "交 giao", py: "jiāo" }, { hv: "假 giả", py: "jiǎ" }, { hv: "解 giải", py: "jiě" } ] },
  { from: "qu-", to: "gu- / qu- / ju-", conf: "mid", desc: "Nhóm phụ âm mềm hóa môi hóa — phân nhánh theo vần đi sau.",
    examples: [ { hv: "光 quang", py: "guāng" }, { hv: "國 quốc", py: "guó" }, { hv: "官 quan", py: "guān" }, { hv: "權 quyền", py: "quán" }, { hv: "群 quần", py: "qún" }, { hv: "貴 quý", py: "guì" } ] },
];

const finalRules = [
  { from: "-inh / -ênh", to: "-ing", conf: "high",
    examples: [ { hv: "京 kinh", py: "jīng" }, { hv: "兵 binh", py: "bīng" }, { hv: "定 định", py: "dìng" }, { hv: "病 bệnh", py: "bìng" }, { hv: "聽 thính", py: "tīng" }, { hv: "命 mệnh", py: "mìng" }, { hv: "領 lĩnh", py: "lǐng" } ] },
  { from: "-ương / -ang", to: "-iang / -ang", conf: "high",
    examples: [ { hv: "江 giang", py: "jiāng" }, { hv: "方 phương", py: "fāng" }, { hv: "長 trường", py: "cháng" }, { hv: "香 hương", py: "xiāng" }, { hv: "想 tưởng", py: "xiǎng" }, { hv: "陽 dương", py: "yáng" }, { hv: "常 thường", py: "cháng" } ] },
  { from: "-oa / -óa / -ỏa", to: "-ua", conf: "high",
    examples: [ { hv: "花 hoa", py: "huā" }, { hv: "化 hóa", py: "huà" }, { hv: "火 hỏa", py: "huǒ" }, { hv: "過 quá", py: "guò" }, { hv: "果 quả", py: "guǒ" }, { hv: "課 khóa", py: "kè" } ] },
  { from: "-iên / -uyên", to: "-ian / -uan", conf: "high",
    examples: [ { hv: "天 thiên", py: "tiān" }, { hv: "年 niên", py: "nián" }, { hv: "見 kiến", py: "jiàn" }, { hv: "元 nguyên", py: "yuán" }, { hv: "圓 viên", py: "yuán" }, { hv: "面 diện", py: "miàn" }, { hv: "邊 biên", py: "biān" } ] },
  { from: "-am", to: "-an", conf: "mid",
    examples: [ { hv: "南 nam", py: "nán" }, { hv: "三 tam", py: "sān" }, { hv: "談 đàm", py: "tán" }, { hv: "藍 lam", py: "lán" }, { hv: "敢 cảm", py: "gǎn" }, { hv: "含 hàm", py: "hán" } ] },
  { from: "-âm / -im", to: "-in", conf: "mid",
    examples: [ { hv: "金 kim", py: "jīn" }, { hv: "心 tâm", py: "xīn" }, { hv: "音 âm", py: "yīn" }, { hv: "林 lâm", py: "lín" }, { hv: "深 thâm", py: "shēn" }, { hv: "沈 trầm", py: "chén" } ] },
  { from: "-ông / -ung", to: "-ong", conf: "high",
    examples: [ { hv: "東 đông", py: "dōng" }, { hv: "公 công", py: "gōng" }, { hv: "中 trung", py: "zhōng" }, { hv: "同 đồng", py: "tóng" }, { hv: "紅 hồng", py: "hóng" }, { hv: "工 công", py: "gōng" } ] },
  { from: "-an", to: "-an", conf: "high", desc: "Trường hợp giữ nguyên vần — dễ nhận diện nhất.",
    examples: [ { hv: "安 an", py: "ān" }, { hv: "半 bán", py: "bàn" }, { hv: "反 phản", py: "fǎn" }, { hv: "難 nan", py: "nán" }, { hv: "案 án", py: "àn" }, { hv: "看 khán", py: "kàn" } ] },
  { from: "-anh / -ăng", to: "-eng", conf: "mid",
    desc: "Khác với -inh/-ênh ở trên — nhóm này lệch sang -eng chứ không phải -ing, dễ nhầm nếu không phân biệt kỹ mặt chữ Hán Việt.",
    examples: [ { hv: "生 sinh", py: "shēng" }, { hv: "更 canh", py: "gēng" }, { hv: "猛 mãnh", py: "měng" }, { hv: "冷 lãnh", py: "lěng" }, { hv: "省 tỉnh", py: "shěng" } ] },
  { from: "-ôn / -uôn", to: "-un / -uan", conf: "mid",
    examples: [ { hv: "存 tồn", py: "cún" }, { hv: "尊 tôn", py: "zūn" }, { hv: "論 luận", py: "lùn" }, { hv: "村 thôn", py: "cūn" } ] },
  { from: "-at (nhập thanh)", to: "-a", conf: "high", desc: "Nhánh cụ thể của quy luật nhập thanh — dễ nhớ vì kết quả rất gọn.",
    examples: [ { hv: "八 bát", py: "bā" }, { hv: "達 đạt", py: "dá" }, { hv: "發 phát", py: "fā" }, { hv: "殺 sát", py: "shā" }, { hv: "法 phạt", py: "fá" } ] },
  { from: "-p / -t / -c / -ch", to: "âm tiết mở (không phụ âm cuối)", conf: "struct",
    desc: "Quy luật nền tảng nhất của toàn hệ thống — nếu chỉ nhớ một điều, hãy nhớ điều này.",
    examples: [ { hv: "國 quốc", py: "guó" }, { hv: "學 học", py: "xué" }, { hv: "十 thập", py: "shí" }, { hv: "一 nhất", py: "yī" }, { hv: "六 lục", py: "liù" }, { hv: "八 bát", py: "bā" }, { hv: "百 bách", py: "bǎi" }, { hv: "力 lực", py: "lì" }, { hv: "月 nguyệt", py: "yuè" }, { hv: "北 bắc", py: "běi" } ] },
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
];

/* ---------- DATA: Bộ biểu âm (phonetic components) ---------- */

const phoneticGroups = [
  { comp: "青", py: "qīng", meaning: "xanh (màu)", derived: [ { hv: "清 (thanh)", py: "qīng", meaning: "trong, sạch" }, { hv: "情 (tình)", py: "qíng", meaning: "tình cảm" }, { hv: "請 (thỉnh)", py: "qǐng", meaning: "mời, xin" }, { hv: "晴 (tình)", py: "qíng", meaning: "trời nắng" }, { hv: "精 (tinh)", py: "jīng", meaning: "tinh, tinh túy" } ] },
  { comp: "馬", py: "mǎ", meaning: "ngựa", derived: [ { hv: "媽 (ma)", py: "mā", meaning: "mẹ" }, { hv: "嗎 (ma)", py: "ma", meaning: "trợ từ hỏi" }, { hv: "罵 (mạ)", py: "mà", meaning: "mắng, chửi" }, { hv: "碼 (mã)", py: "mǎ", meaning: "mã số" } ] },
  { comp: "方", py: "fāng", meaning: "phương, vuông", derived: [ { hv: "放 (phóng)", py: "fàng", meaning: "thả, đặt" }, { hv: "房 (phòng)", py: "fáng", meaning: "phòng, nhà" }, { hv: "訪 (phóng)", py: "fǎng", meaning: "thăm hỏi" }, { hv: "芳 (phương)", py: "fāng", meaning: "thơm" } ] },
  { comp: "生", py: "shēng", meaning: "sinh, sống", derived: [ { hv: "星 (tinh)", py: "xīng", meaning: "sao" }, { hv: "姓 (tính)", py: "xìng", meaning: "họ tên" }, { hv: "勝 (thắng)", py: "shèng", meaning: "thắng" } ] },
  { comp: "令", py: "lìng", meaning: "lệnh, khiến", derived: [ { hv: "冷 (lãnh)", py: "lěng", meaning: "lạnh" }, { hv: "領 (lĩnh)", py: "lǐng", meaning: "dẫn, cổ áo" }, { hv: "鈴 (linh)", py: "líng", meaning: "cái chuông" } ] },
  { comp: "包", py: "bāo", meaning: "bao, gói", derived: [ { hv: "抱 (bão)", py: "bào", meaning: "ôm" }, { hv: "飽 (bão)", py: "bǎo", meaning: "no" }, { hv: "泡 (bào)", py: "pào", meaning: "ngâm, bọt" } ] },
  { comp: "交", py: "jiāo", meaning: "giao, trao đổi", derived: [ { hv: "較 (giác)", py: "jiào", meaning: "so sánh" }, { hv: "郊 (giao)", py: "jiāo", meaning: "vùng ngoại ô" }, { hv: "校 (giáo)", py: "xiào", meaning: "trường học" } ] },
  { comp: "京", py: "jīng", meaning: "kinh đô", derived: [ { hv: "鯨 (kình)", py: "jīng", meaning: "cá voi" }, { hv: "景 (cảnh)", py: "jǐng", meaning: "cảnh vật" } ] },
  { comp: "相", py: "xiāng", meaning: "tương, lẫn nhau", derived: [ { hv: "想 (tưởng)", py: "xiǎng", meaning: "nghĩ, tưởng" }, { hv: "箱 (tương)", py: "xiāng", meaning: "hộp, rương" } ] },
  { comp: "由", py: "yóu", meaning: "do, từ", derived: [ { hv: "油 (du)", py: "yóu", meaning: "dầu" }, { hv: "郵 (bưu)", py: "yóu", meaning: "bưu điện" }, { hv: "鈾 (du)", py: "yóu", meaning: "uranium" } ] },
];

/* ---------- DATA: Biến điệu (tone sandhi) ---------- */

const sandhiRules = [
  { from: "T3 + T3", to: "T2 + T3", conf: "struct", desc: "Quy tắc cứng, xảy ra 100% khi hai âm tiết thanh 3 đứng liền nhau — âm tiết đầu bắt buộc đổi sang thanh 2 khi nói (chữ viết vẫn giữ thanh 3).",
    examples: [ { hv: "你好 (viết)", py: "níhǎo (nói thật)" }, { hv: "很好 (viết)", py: "génhǎo (nói thật)" }, { hv: "可以 (viết)", py: "kéyǐ (nói thật)" } ] },
  { from: "不 bù + Thanh 4", to: "不 → Thanh 2 (bú)", conf: "struct", desc: "不 chỉ đổi thanh khi từ theo sau là Thanh 4. Với Thanh 1/2/3 thì 不 vẫn giữ Thanh 4 bình thường.",
    examples: [ { hv: "不是 (viết)", py: "búshì (nói thật)" }, { hv: "不對 (viết)", py: "búduì (nói thật)" }, { hv: "不好 (giữ nguyên)", py: "bùhǎo" }, { hv: "不來 (giữ nguyên)", py: "bùlái" } ] },
  { from: "一 yī + Thanh 4", to: "一 → Thanh 2 (yí)", conf: "struct",
    examples: [ { hv: "一定 (viết)", py: "yídìng (nói thật)" }, { hv: "一樣 (viết)", py: "yíyàng (nói thật)" } ] },
  { from: "一 yī + Thanh 1/2/3", to: "一 → Thanh 4 (yì)", conf: "struct", desc: "Ngược lại với trường hợp trên — trước T1/T2/T3, 一 chuyển thành Thanh 4.",
    examples: [ { hv: "一起 (viết)", py: "yìqǐ (nói thật)" }, { hv: "一直 (viết)", py: "yìzhí (nói thật)" }, { hv: "一天 (viết)", py: "yìtiān (nói thật)" } ] },
  { from: "一 yī độc lập / trong số đếm", to: "Giữ Thanh 1 (yī)", conf: "struct", desc: "Khi 一 đứng riêng, ở cuối câu, hoặc trong số đếm/số thứ tự thì KHÔNG đổi thanh.",
    examples: [ { hv: "第一 (giữ nguyên)", py: "dìyī" }, { hv: "十一 (giữ nguyên)", py: "shíyī" }, { hv: "星期一 (giữ nguyên)", py: "xīngqīyī" } ] },
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
];

/* ---------- DATA: Từ vựng tần suất (nhóm theo chức năng) ---------- */

const freqGroups = [
  { label: "Đại từ nhân xưng — dùng liên tục mỗi câu", words: ["我 wǒ (tôi)", "你 nǐ (bạn)", "他/她 tā (anh/cô ấy)", "我們 wǒmen (chúng tôi)", "他們 tāmen (họ)"] },
  { label: "Động từ lõi — xuất hiện trong hầu hết hội thoại", words: ["是 shì (là)", "有 yǒu (có)", "在 zài (ở, đang)", "要 yào (muốn, cần)", "去 qù (đi)", "來 lái (đến)", "說 shuō (nói)", "看 kàn (nhìn/xem)", "知道 zhīdào (biết)", "想 xiǎng (nghĩ/muốn)"] },
  { label: "Trợ từ, liên từ — khung câu", words: ["的 de (của)", "了 le (trợ từ hoàn thành)", "不 bù (không)", "就 jiù (thì, chính là)", "都 dōu (đều)", "也 yě (cũng)", "和 hé (và)", "但是 dànshì (nhưng)"] },
  { label: "Tính từ tần suất cao", words: ["好 hǎo (tốt)", "大 dà (to)", "小 xiǎo (nhỏ)", "多 duō (nhiều)", "少 shǎo (ít)", "很 hěn (rất)"] },
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
];

/* ---------- DATA: Thành ngữ (chengyu ↔ Hán Việt) ---------- */

const chengyuList = [
  { hanzi: "一舉兩得", py: "yī jǔ liǎng dé", hv: "nhất cử lưỡng tiện", meaning: "một hành động đạt được hai lợi ích" },
  { hanzi: "半途而廢", py: "bàn tú ér fèi", hv: "bán đồ nhi phế", meaning: "bỏ dở giữa đường, không hoàn thành" },
  { hanzi: "畫蛇添足", py: "huà shé tiān zú", hv: "hoạ xà thiêm túc", meaning: "vẽ rắn thêm chân — làm thừa, phản tác dụng" },
  { hanzi: "守株待兔", py: "shǒu zhū dài tù", hv: "thủ chu đãi thố", meaning: "ôm cây chờ thỏ — trông chờ vận may một cách thụ động" },
  { hanzi: "自相矛盾", py: "zì xiāng máo dùn", hv: "tự tương mâu thuẫn", meaning: "tự mâu thuẫn với chính mình — nguồn gốc của từ \"mâu thuẫn\" trong tiếng Việt" },
  { hanzi: "入鄉隨俗", py: "rù xiāng suí sú", hv: "nhập gia tùy tục", meaning: "đến đâu theo tục lệ ở đó" },
  { hanzi: "知己知彼", py: "zhī jǐ zhī bǐ", hv: "tri kỷ tri bỉ", meaning: "biết mình biết địch" },
  { hanzi: "有志者事竟成", py: "yǒu zhì zhě shì jìng chéng", hv: "hữu chí giả sự cánh thành", meaning: "có ý chí thì việc gì cũng thành" },
];

const TABS = [
  { id: "hv", label: "Hán Việt ↔ QT" },
  { id: "phonetic", label: "Bộ biểu âm" },
  { id: "sandhi", label: "Biến điệu" },
  { id: "measure", label: "Lượng từ" },
  { id: "freq", label: "Từ vựng tần suất" },
  { id: "minimal", label: "Cặp tối thiểu" },
  { id: "interleave", label: "Xen kẽ luyện tập" },
  { id: "chengyu", label: "Thành ngữ" },
];

function matchRule(rule, q) {
  if (!q) return true;
  const hay = [rule.from, rule.to, rule.desc || "", ...rule.examples.map((e) => `${e.hv} ${e.py} ${e.note || ""}`)].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
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
  const [tab, setTab] = useState("hv");
  const [query, setQuery] = useState("");

  const fTone = useMemo(() => toneRules.filter((r) => matchRule(r, query)), [query]);
  const fInitial = useMemo(() => initialRules.filter((r) => matchRule(r, query)), [query]);
  const fFinal = useMemo(() => finalRules.filter((r) => matchRule(r, query)), [query]);
  const fFriends = useMemo(() => falseFriends.filter((f) => matchFriend(f, query)), [query]);
  const fPhonetic = useMemo(() => phoneticGroups.filter((g) => matchPhonetic(g, query)), [query]);
  const fSandhi = useMemo(() => sandhiRules.filter((r) => matchRule(r, query)), [query]);
  const fMeasure = useMemo(() => measureWords.filter((m) => matchMeasure(m, query)), [query]);
  const fFreq = useMemo(() => freqGroups.filter((g) => matchFreqGroup(g, query)), [query]);
  const fPairs = useMemo(() => minimalPairs.filter((p) => matchPair(p, query)), [query]);
  const fChengyu = useMemo(() => chengyuList.filter((c) => matchChengyu(c, query)), [query]);

  const totalRules =
    toneRules.length + initialRules.length + finalRules.length + falseFriends.length +
    phoneticGroups.length + sandhiRules.length + measureWords.length + minimalPairs.length + chengyuList.length;

  return (
    <div style={{ background: "#EDE6D8", fontFamily: "Inter, sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      <div style={{ background: "#22201C", padding: "36px 24px 30px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30px", right: "-10px", fontFamily: "'Noto Serif SC', serif", fontSize: "180px", color: "rgba(255,255,255,0.03)", fontWeight: 700, lineHeight: 1, userSelect: "none" }}>
          解
        </div>
        <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#A13A2E", color: "#F6F1E7", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: "3px", marginBottom: "16px" }}>
            BẢNG GIẢI MÃ · 解碼表 · {totalRules} MỤC
          </div>
          <h1 style={{ fontFamily: "'Noto Serif SC', serif", color: "#F6F1E7", fontSize: "30px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.25 }}>
            Bộ công cụ học tiếng Trung
          </h1>
          <p style={{ color: "#B8AF9E", fontSize: "14.5px", lineHeight: 1.6, maxWidth: "660px", margin: 0 }}>
            Từ nền Hán Việt đến các đòn bẩy khác: bộ biểu âm, biến điệu, lượng từ,
            từ vựng tần suất, cặp tối thiểu và thành ngữ. Phần lớn là quy luật{" "}
            <b style={{ color: "#DCD4C4" }}>thống kê xu hướng</b> (trừ Biến điệu — đây
            là quy tắc cố định) — luôn kiểm tra lại bằng từ điển khi gặp từ mới.
          </p>
        </div>
      </div>

      <div style={{ background: "#22201C", borderTop: "1px solid #3A362F", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", overflowX: "auto" }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ background: "none", border: "none", padding: "14px 18px", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: tab === t.id ? "#F6F1E7" : "#8B8478", borderBottom: tab === t.id ? "2px solid #A13A2E" : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.15s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "18px 20px 0" }}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm chữ Hán, âm Hán Việt, hoặc pinyin…"
          style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #D9CFBB", background: "#F6F1E7", fontFamily: "'Noto Serif SC', serif", fontSize: "14px", color: "#22201C", outline: "none" }} />
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "16px 20px 60px" }}>
        {tab === "hv" && (
          <>
            <Intro text="Ba lớp quy luật đầu (thanh điệu/phụ âm/vần) mang tính thống kê xu hướng — riêng lớp Từ giả Hán Việt không phải quy luật âm mà là cạm bẫy ngữ nghĩa." />
            <SectionHeader title="1. Thanh điệu" subtitle="Độ tin cậy thấp nhất trong ba lớp — chỉ tham khảo" />
            {fTone.map((r, i) => <RuleCard key={i} rule={r} />)}
            <SectionHeader title="2. Phụ âm đầu" subtitle="nh-→r- và ng-→y- là hai quy luật mạnh nhất" />
            {fInitial.map((r, i) => <RuleCard key={i} rule={r} />)}
            <SectionHeader title="3. Vần / âm cuối" subtitle="Quy luật nhập thanh (-p/-t/-c/-ch) gần như tuyệt đối" />
            {fFinal.map((r, i) => <RuleCard key={i} rule={r} />)}
            <SectionHeader title="4. Từ giả Hán Việt" subtitle="Âm giống nhau nhưng nghĩa đã lệch qua nhiều thế kỷ" />
            {fFriends.map((f, i) => (
              <div key={i} style={{ background: "#F6F1E7", border: "1px solid #E0B8B0", borderLeft: "4px solid #A13A2E", borderRadius: "8px", padding: "16px 20px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "22px", fontWeight: 700, color: "#22201C" }}>{f.char}</span>
                  <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", color: "#A13A2E", fontSize: "15px" }}>{f.hv}</span>
                </div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#5C5548", marginBottom: "6px" }}><b style={{ color: "#8B7F6E" }}>VN nghĩ là:</b> {f.hvMeaning}</div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#5C5548", marginBottom: "6px" }}><b style={{ color: "#A13A2E" }}>Thực ra là:</b> {f.cnMeaning}</div>
                <div style={{ fontSize: "12.5px", lineHeight: 1.6, color: "#3E6259", fontStyle: "italic" }}>{f.correct}</div>
              </div>
            ))}
            {fTone.length + fInitial.length + fFinal.length + fFriends.length === 0 && <Empty />}
          </>
        )}

        {tab === "phonetic" && (
          <>
            <Intro text="~80% chữ Hán là hình thanh tự: nửa biểu nghĩa + nửa biểu âm. Học các bộ phận biểu âm phổ biến giúp đoán ÂM ĐỌC của chữ mới, không cần học thuộc riêng lẻ." />
            {fPhonetic.length === 0 && <Empty />}
            {fPhonetic.map((g, i) => (
              <div key={i} style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "18px 20px", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "26px", fontWeight: 700, color: "#A13A2E" }}>{g.comp}</span>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600, fontSize: "15px" }}>{g.py}</span>
                  <span style={{ fontSize: "12.5px", color: "#8B7F6E" }}>({g.meaning})</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px 16px", borderTop: "1px dashed #D9CFBB", paddingTop: "12px" }}>
                  {g.derived.map((d, j) => (
                    <div key={j} style={{ fontSize: "13.5px", lineHeight: 1.5 }}>
                      <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#22201C", fontWeight: 600 }}>{d.hv}</span>{" "}
                      <span style={{ color: "#A13A2E" }}>{d.py}</span>{" "}
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
            {fSandhi.length === 0 && <Empty />}
            {fSandhi.map((r, i) => <RuleCard key={i} rule={r} />)}
          </>
        )}

        {tab === "measure" && (
          <>
            <Intro text="Tiếng Việt có sẵn hệ thống loại từ (cái, con, quyển, chiếc...) — bạn chỉ cần map lại sang lượng từ tiếng Trung, không phải học khái niệm này từ đầu như người phương Tây." />
            {fMeasure.length === 0 && <Empty />}
            {fMeasure.map((m, i) => (
              <div key={i} style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "14px 20px", marginBottom: "10px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "20px", fontWeight: 700, color: "#22201C", minWidth: "70px" }}>{m.hanzi}</div>
                <div style={{ fontFamily: "'Noto Serif SC', serif", color: "#A13A2E", fontWeight: 600, minWidth: "50px" }}>{m.py}</div>
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
              <div key={i} style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
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
            {fPairs.length === 0 && <Empty />}
            {fPairs.map((p, i) => (
              <div key={i} style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: "14px", color: "#A13A2E", marginBottom: "10px", letterSpacing: "0.03em" }}>{p.base.toUpperCase()}</div>
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
            <div style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "20px 22px", marginBottom: "14px" }}>
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
            <div style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "20px 22px", marginBottom: "14px" }}>
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
                <div key={n} style={{ display: "flex", gap: "12px", alignItems: "baseline", padding: "8px 0", borderBottom: "1px dashed #D9CFBB" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: "#A13A2E", minWidth: "18px" }}>{n}</span>
                  <span style={{ fontSize: "13.5px", color: "#22201C", flex: 1 }}>{text}</span>
                  <span style={{ fontSize: "12px", color: "#8B7F6E" }}>{time}</span>
                </div>
              ))}
              <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "#8B7F6E", marginTop: "12px", fontStyle: "italic" }}>
                Điểm mấu chốt: cùng MỘT đoạn nội dung nhưng đi qua 5 kỹ năng khác nhau — không phải 5 nội dung khác nhau cho cùng 1 kỹ năng.
              </p>
            </div>
          </>
        )}

        {tab === "chengyu" && (
          <>
            <Intro text="Nhiều thành ngữ tiếng Việt là dịch/mượn trực tiếp từ chengyu (成语) cổ điển. Với nền Hán Việt, đây là lớp từ vựng 'sang trọng' có ROI cao hơn hẳn so với người học phương Tây." />
            {fChengyu.length === 0 && <Empty />}
            {fChengyu.map((c, i) => (
              <div key={i} style={{ background: "#F6F1E7", border: "1px solid #D9CFBB", borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "19px", fontWeight: 700, color: "#22201C" }}>{c.hanzi}</span>
                  <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#A13A2E", fontWeight: 600 }}>{c.py}</span>
                </div>
                <div style={{ fontSize: "13.5px", fontStyle: "italic", color: "#3E6259", marginBottom: "6px" }}>{c.hv}</div>
                <div style={{ fontSize: "13px", color: "#5C5548", lineHeight: 1.6 }}>{c.meaning}</div>
              </div>
            ))}
          </>
        )}
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
