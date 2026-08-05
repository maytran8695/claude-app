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
        display: "inline-block", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600,
        padding: "2px 9px", borderRadius: "20px", color: c.color, background: c.bg,
        letterSpacing: "0.02em", whiteSpace: "nowrap",
      }}
    >
      {c.label}
    </span>
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

function TabCard({ n, hanzi, label, use, when, tip }) {
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

const TABS_GUIDE = [
  { n: "1", label: "Hán Việt", hanzi: "漢越音鑰匙",
    use: "Suy đoán pinyin/âm Hán Việt của một chữ mới dựa trên 3 lớp quy luật ngữ âm (thanh điệu → phụ âm đầu → vần) và tra cạm bẫy nghĩa (từ giả Hán Việt).",
    when: "Gặp một chữ Hán chưa học nhưng đã biết âm Hán Việt của nó, và muốn đoán nhanh cách đọc Quan Thoại trước khi tra từ điển; hoặc khi dùng một từ mượn Hán Việt và nghi ngờ nghĩa tiếng Trung hiện đại đã lệch.",
    tip: "Luôn đọc cột \"độ tin cậy\" trước khi tin: quy luật Nhập thanh và biến điệu (nhãn \"Quy tắc cố định\") gần như tuyệt đối, còn thanh điệu Hỏi/Ngã (\"Thấp\") chỉ mang tính tham khảo — với nhóm này bắt buộc tra từ điển, đừng đoán rồi dùng luôn." },
  { n: "2", label: "Biểu âm", hanzi: "諧聲部件",
    use: "Nhận diện các \"bộ phận biểu âm\" (phonetic components) xuất hiện lặp lại trong nhiều chữ Hán, để đoán âm đọc của chữ mới mà không cần học thuộc từng chữ riêng lẻ.",
    when: "Đang học chữ Hán mới và nhận ra nó có một bộ phận quen mắt (vd. 青, 交, 生...) — kiểm tra xem các chữ cùng bộ phận đó có phát âm gần giống nhau không.",
    tip: "~80% chữ Hán là hình thanh tự (nửa biểu nghĩa + nửa biểu âm) — nhưng biểu âm chỉ gợi ý âm gần đúng (thường cùng vần, khác thanh hoặc khác phụ âm), không phải công thức chính xác 100%; luôn xác nhận lại bằng pinyin thật." },
  { n: "3", label: "Biến điệu", hanzi: "變調",
    use: "Tra các quy tắc biến đổi thanh điệu bắt buộc khi nói (chữ viết vẫn giữ thanh gốc) — thanh 3 liền thanh 3, và các biến thể của 不/一.",
    when: "Trước khi luyện nói hoặc thu âm shadowing — đây là quy tắc phải thuộc lòng, không phải tra cứu từng lần, vì sai chỗ này nghe rất \"ngoại quốc\".",
    tip: "Khác hẳn 2 tab đầu (chỉ là xu hướng thống kê), biến điệu là quy tắc cố định 100% — học một lần, áp dụng suốt đời, không có ngoại lệ cần tra." },
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
  { n: "7", label: "Xen kẽ", hanzi: "交錯學習",
    use: "Không phải bảng tra cứu — đây là hướng dẫn phương pháp học: vì sao xen kẽ nhiều kỹ năng (nghe/nói/đọc/viết) trong 1 buổi hiệu quả hơn học khối, kèm mẫu lịch học 25 phút.",
    when: "Khi lên kế hoạch cho một buổi tự học — dùng mẫu 5 bước (nghe → nhại lại → đọc → viết lại → nói tự do) áp dụng cho MỘT đoạn hội thoại duy nhất.",
    tip: "Điểm dễ hiểu lầm nhất: xen kẽ nghĩa là cùng MỘT nội dung đi qua nhiều kỹ năng khác nhau, không phải học nhiều chủ đề khác nhau cho cùng một kỹ năng." },
  { n: "8", label: "Thành ngữ", hanzi: "成語",
    use: "Tra các chengyu (thành ngữ 4 chữ) phổ biến cùng âm Hán Việt và nghĩa — nhiều thành ngữ Việt là dịch/mượn trực tiếp từ đây.",
    when: "Muốn nâng cấp văn viết/nói lên mức trang trọng hơn, hoặc muốn hiểu gốc gác một thành ngữ Việt quen thuộc (vd. \"tự tương mâu thuẫn\" → nguồn gốc từ \"mâu thuẫn\" trong tiếng Việt).",
    tip: "Với nền Hán Việt, đây là lớp từ vựng có ROI cao hơn hẳn so với người học phương Tây — nhưng nhớ rằng không phải thành ngữ Việt nào cũng dịch chữ-đối-chữ chính xác từ chengyu gốc (đôi khi một chữ đã bị thay khi truyền vào tiếng Việt), nên vẫn cần đối chiếu cẩn thận." },
];

export default function ChineseTrickSummary() {
  return (
    <div style={{ background: "#F7F6F2", fontFamily: "Inter, sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 20px", borderBottom: "1px solid #E4E1D8", background: "#FCFBF8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #2B3A55", color: "#2B3A55", borderRadius: 3, fontSize: 20, fontWeight: 700, fontFamily: "'Noto Serif SC', serif" }}>
            導
          </div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", color: "#23231E" }}>HƯỚNG DẪN SỬ DỤNG · 使用指南</div>
            <div style={{ fontSize: 11, color: "#6B6558", marginTop: 1 }}>Cách khai thác 8 tab trong "Bảng giải mã · 解碼表" (chinese_trick)</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "18px 20px 60px" }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13.5px", lineHeight: 1.6, color: "#5C5548", background: "#E4DECE", borderRadius: "8px", padding: "14px 18px", marginBottom: "10px" }}>
          "Bảng giải mã" không phải một bài học tuyến tính — đó là 8 công cụ tra cứu độc lập, mỗi tab phục vụ một mục đích khác nhau. Trang này tóm tắt <b>tab nào dùng cho việc gì</b>, <b>khi nào nên mở nó ra</b>, và những lưu ý để không hiểu nhầm mức độ tin cậy của dữ liệu.
        </div>

        <SectionHeader title="Cách đọc nhãn độ tin cậy" subtitle="Mỗi quy luật trong tab Hán Việt và Biến điệu đều gắn một nhãn màu — đọc đúng nhãn quan trọng hơn nhớ ví dụ" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", background: "rgba(43,58,85,0.06)", border: "1px solid rgba(43,58,85,0.25)", borderRadius: "10px", padding: "16px 20px", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><ConfPill level="struct" /><span style={{ fontSize: 13, color: "#5C5548" }}>Xảy ra 100% — học thuộc, áp dụng luôn không cần tra (nhập thanh, biến điệu).</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><ConfPill level="high" /><span style={{ fontSize: 13, color: "#5C5548" }}>Đúng phần lớn — dùng để đoán nhanh, nhưng vẫn có ngoại lệ rải rác.</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><ConfPill level="mid" /><span style={{ fontSize: 13, color: "#5C5548" }}>Đúng khoảng một nửa — chỉ nên dùng làm gợi ý đầu tiên, không thay thế tra cứu.</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><ConfPill level="low" /><span style={{ fontSize: 13, color: "#5C5548" }}>Gần như ngẫu nhiên — bắt buộc tra từ điển, đừng đoán rồi dùng luôn.</span></div>
        </div>

        <SectionHeader title="8 tab — dùng cho việc gì, khi nào" />
        {TABS_GUIDE.map((t) => <TabCard key={t.n} {...t} />)}

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
          Mỗi tab dữ liệu (trừ "Xen kẽ") đều có chung một ô tìm kiếm ở đầu trang — gõ chữ Hán, âm Hán Việt, hoặc pinyin để lọc ngay trong tab đang mở. Ô tìm kiếm không lọc chéo giữa các tab, nên khi đổi tab hãy kiểm tra lại từ khóa vẫn còn phù hợp.
        </div>

        <SectionHeader title="Lưu ý về độ chính xác nội dung" />
        <div style={{ fontSize: "13px", lineHeight: 1.7, color: "#5C5548", background: "#EDE6D8", borderRadius: "8px", padding: "14px 18px" }}>
          Nội dung trong tab Chinese Trick đã được rà soát theo ngữ âm học lịch sử tiếng Hán và từ vựng Hán Việt: đã sửa một số ví dụ bị xếp sai nhóm quy luật (âm tiết nhập thanh bị gán nhầm cùng nhóm hỏi/ngã, "qu-"/"gi-" bị gán nhầm vào nhóm "c-/k-"...), một vài âm Hán Việt bị ghi sai (較 = giảo chứ không phải giác trong nghĩa "so sánh"; 校 = hiệu chứ không phải giáo trong nghĩa "trường học"; 訪 = phỏng chứ không phải phóng), và một lỗi hiển thị khiến tổng số mục ở đầu trang bị đếm thiếu. Dù vậy, đây vẫn là bảng quy luật thống kê — với các nhãn "Trung bình"/"Thấp", luôn đối chiếu từ điển trước khi dùng trong văn bản chính thức.
        </div>
      </div>
    </div>
  );
}
