import React, { useState } from "react";

const ACCENT = "#2D6A62";
const INK = "#232725";
const MUTE = "#82877F";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#FAFBF9";
const CARD = "#FFFFFF";
const LINE = "#E1E5DF";

const Sec = ({ label, children, color = ACCENT }) => (
  <div style={{ borderLeft: `2px solid ${color}`, paddingLeft: 13 }}>
    <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color, fontWeight: 700, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 14.5, lineHeight: 1.68, color: INK }}>{children}</div>
  </div>
);

const Quote = ({ text, by }) => (
  <div style={{ background: "#EEF3F1", borderRadius: 4, padding: "13px 16px", fontStyle: "italic", fontSize: 14.5, lineHeight: 1.65 }}>
    "{text}"
    <div style={{ fontFamily: SANS, fontStyle: "normal", fontSize: 11.5, color: MUTE, marginTop: 6 }}>— {by}</div>
  </div>
);


const PRIMARY = [
  { id: "foundations", vi: "Nền tảng lý thuyết", subs: [
      { id: "f-define", vi: "Định nghĩa" },
      { id: "f-psy", vi: "Tâm lý học" },
      { id: "f-east", vi: "Đông phương" },
      { id: "f-soc", vi: "Xã hội & Văn hoá" },
      { id: "f-deep", vi: "Chuyên sâu" },
  ]},
  { id: "diagnose", vi: "Nhận diện", subs: [
      { id: "g-identify", vi: "Fragile vs Secure" },
      { id: "g-dark", vi: "Mặt tối" },
  ]},
  { id: "confidence", vi: "★ Tự Tin", subs: [
      { id: "c-core", vi: "Nền tảng" },
      { id: "c-playbook", vi: "Playbook bối cảnh" },
      { id: "c-expert", vi: "Chuyên gia" },
  ]},
  { id: "situations", vi: "★ Tình huống", subs: [
      { id: "s-work", vi: "Công việc" },
      { id: "s-lead", vi: "Lãnh đạo & quản lý" },
      { id: "s-conflict", vi: "Xung đột" },
      { id: "s-social", vi: "Xã hội & cá nhân" },
  ]},
  { id: "practice", vi: "★ Thực hành", subs: [
      { id: "p-start", vi: "Bắt đầu" },
      { id: "p-core", vi: "Bài tập lõi" },
      { id: "p-clinical", vi: "Kỹ thuật nâng cao" },
      { id: "p-roadmap", vi: "Lộ trình & Đo lường" },
  ]},
];

export default function SelfWorthDeep() {
  const [primary, setPrimary] = useState("foundations");
  const [sub, setSub] = useState("f-define");

  const current = PRIMARY.find((p) => p.id === primary);

  return (
    <div style={{ fontFamily: SERIF, background: PAPER, color: INK }}>
      <div style={{ padding: "26px 16px 60px" }}>
        <div style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 27, lineHeight: 1.2, margin: 0, fontWeight: 600 }}>Self-Worth · Self-Love · Self-Confidence</h1>
        </div>

        {/* PRIMARY NAV */}
        <div className="mobile-static" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10, borderBottom: `1px solid ${LINE}`, paddingTop: 10, paddingBottom: 14, position: "sticky", top: 0, zIndex: 10, background: PAPER }}>
          {PRIMARY.map((p) => (
            <button key={p.id} onClick={() => { setPrimary(p.id); setSub(p.subs[0].id); window.__scrollArticleToTop?.(); }}
              style={{
                fontFamily: SANS, fontSize: 12.8, padding: "8px 15px", borderRadius: 20, cursor: "pointer",
                border: `1px solid ${primary === p.id ? ACCENT : LINE}`,
                background: primary === p.id ? ACCENT : CARD,
                color: primary === p.id ? "#fff" : "#3A403C",
                fontWeight: primary === p.id ? 700 : 600,
              }}>
              {p.vi}
            </button>
          ))}
        </div>

        {/* SUB NAV */}
        {current.subs.length > 1 && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 22 }}>
            {current.subs.map((sb) => (
              <button key={sb.id} onClick={() => { setSub(sb.id); window.__scrollArticleToTop?.(); }}
                style={{
                  fontFamily: SANS, fontSize: 11.8, padding: "5px 12px", borderRadius: 4, cursor: "pointer",
                  border: `1px solid ${sub === sb.id ? ACCENT : LINE}`,
                  background: sub === sb.id ? "#EEF3F1" : "transparent",
                  color: sub === sb.id ? ACCENT : MUTE,
                  fontWeight: sub === sb.id ? 700 : 500,
                }}>
                {sb.vi}
              </button>
            ))}
          </div>
        )}


        {sub === "f-define" && (
          <div style={{ display: "grid", gap: 18 }}>

            <p style={{ fontFamily: SANS, fontSize: 13, color: "#57605A", lineHeight: 1.65, margin: 0 }}>
              Bốn khái niệm thường bị gộp làm một nhưng khác nhau căn bản. Nhầm lẫn chúng là gốc của rất nhiều lời khuyên sai.
            </p>
            <div style={{ display: "grid", gap: 11 }}>
              {[
                ["Self-esteem — Lòng tự trọng / tự đánh giá", "Mức độ mình ĐÁNH GIÁ bản thân tích cực hay tiêu cực (Rosenberg). Vấn đề cốt lõi: nó dựa trên phán xét, nên luôn cần 'bằng chứng' để duy trì — và có thể sụp khi thất bại. Điểm yếu chết người: self-esteem cao thường đòi hỏi thấy mình 'trên trung bình', mà không phải ai cũng có thể trên trung bình."],
                ["Self-worth — Giá trị bản thân nội tại", "Cảm nhận mình CÓ GIÁ TRỊ chỉ vì mình tồn tại như một con người — không cần điều kiện, không cần thành tích. Khác self-esteem ở chỗ: không phụ thuộc vào so sánh hay kết quả. Đây là nền móng vững nhất, nhưng cũng khó xây nhất vì văn hoá dạy ta ngược lại."],
                ["Self-confidence — Sự tự tin", "Niềm tin vào KHẢ NĂNG của mình làm được một việc cụ thể. Mang tính tình huống: có thể tự tin nấu ăn nhưng thiếu tự tin nói trước đám đông. Gần với self-efficacy của Bandura. Điểm quan trọng: tự tin đến TỪ hành động, không phải có trước hành động."],
                ["Self-compassion — Lòng tự trắc ẩn", "Cách mình ĐỐI XỬ với bản thân khi thất bại/đau khổ (Neff). Đây là thứ khoa học cho thấy mạnh và bền hơn self-esteem: không cần thấy mình giỏi, chỉ cần đối xử tử tế với mình như với một người bạn. Không phụ thuộc thành công nên không sụp khi thất bại."],
              ].map(([h, d], i) => (
                <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "13px 16px", background: CARD }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                  <div style={{ fontSize: 14.2, lineHeight: 1.62 }}>{d}</div>
                </div>
              ))}
            </div>
            <Sec label="Vì sao phân biệt lại quan trọng đến thế">
              Phần lớn ngành công nghiệp "self-esteem" thất bại vì nhắm sai mục tiêu. Nghiên cứu của Baumeister (2003) gây chấn động khi cho thấy: self-esteem cao <b>không</b> tạo ra thành công, sức khoẻ hay hành vi tốt — nhiều khi tương quan còn ngược. Neff đề xuất thay thế cả dự án: đừng cố nâng self-esteem (mong manh, cần so sánh, dễ trượt sang ái kỷ), hãy xây <b>self-compassion</b> (ổn định, không cần hơn ai, không sụp khi thất bại). Đây là chuyển dịch nền tảng của cả tài liệu này.
            </Sec>
            <Quote text="Self-esteem asks 'Am I good enough?' Self-compassion says 'I'm human, and that's enough to deserve kindness.'" by="Diễn giải theo Kristin Neff" />
          
</div>
        )}

        {sub === "f-psy" && (
          <div style={{ display: "grid", gap: 18 }}>

            <Sec label="Kristin Neff — 3 thành tố của Self-Compassion">
              (1) <b>Tử tế với mình</b> (self-kindness) thay vì tự phán xét khắc nghiệt. (2) <b>Nhân tính chung</b> (common humanity) — hiểu rằng thất bại và khiếm khuyết là một phần của việc làm người, mình không đơn độc và không 'hỏng hóc' đặc biệt. (3) <b>Chánh niệm</b> (mindfulness) — nhìn nỗi đau của mình một cách cân bằng, không phóng đại cũng không chối bỏ. Điểm mấu chốt: cả ba chống lại ba phản ứng tự huỷ tương ứng — tự phán xét, cô lập, và đồng hoá quá mức với cảm xúc.
            </Sec>
            <Sec label="Nathaniel Branden — 6 Trụ cột của Self-Esteem">
              Branden lập luận self-esteem lành mạnh không phải cảm giác 'tôi tuyệt vời' mà là <b>tin mình có năng lực sống và xứng đáng hạnh phúc</b>, xây từ 6 thực hành: sống có ý thức (living consciously), tự chấp nhận, tự chịu trách nhiệm, tự khẳng định (self-assertiveness), sống có mục đích, và chính trực cá nhân. Điểm khác biệt then chốt so với 'self-esteem movement': với Branden, tự trọng là <b>hệ quả của hành động đúng đắn</b>, không phải thứ có thể 'tặng' cho ai bằng lời khen suông.
            </Sec>
            <Sec label="Albert Bandura — Self-Efficacy (niềm tin vào năng lực)">
              Bốn nguồn xây self-efficacy, xếp theo sức mạnh: (1) <b>Trải nghiệm làm chủ</b> (mastery experiences) — tự mình làm được, mạnh nhất; (2) <b>Học qua quan sát</b> (thấy người giống mình làm được); (3) <b>Thuyết phục xã hội</b> (được người khác tin tưởng); (4) <b>Trạng thái cơ thể/cảm xúc</b> (diễn giải hồi hộp là 'sẵn sàng' thay vì 'bất lực'). Hàm ý thực hành cực mạnh: tự tin không đến từ suy nghĩ tích cực, mà từ <b>bằng chứng hành động tích luỹ</b>.
            </Sec>
            <Sec label="Jennifer Crocker — Self-worth 'có điều kiện' (contingent)">
              Crocker chỉ ra: hầu hết mọi người neo giá trị bản thân vào các 'lĩnh vực điều kiện' — ngoại hình, thành tích học tập/công việc, sự tán thành của người khác, tình yêu. Vấn đề: mỗi lần lĩnh vực đó bị đe doạ, giá trị bản thân dao động dữ dội. Người neo self-worth vào thành tích sẽ sống trong lo âu vĩnh viễn vì thành tích không bao giờ đủ. Giải pháp không phải neo vào lĩnh vực 'tốt hơn' mà là <b>giảm sự phụ thuộc vào điều kiện</b> nói chung.
            </Sec>
            <Sec label="Aaron Beck & CBT — Niềm tin cốt lõi và 'nhà phê bình nội tâm'">
              Cảm giác vô giá trị thường bắt nguồn từ các <b>core beliefs</b> (niềm tin cốt lõi) hình thành sớm: 'tôi không đủ tốt', 'tôi không đáng được yêu', 'tôi là gánh nặng'. Những niềm tin này chạy tự động, bóp méo cách diễn giải mọi sự kiện (một lời góp ý thành 'thấy chưa, mình vô dụng'). CBT không phủ nhận cảm xúc mà thách thức tính CHÍNH XÁC của niềm tin: 'Đâu là bằng chứng cho và chống lại niềm tin này?' Nhà phê bình nội tâm không phải sự thật — nó là một giọng nói cũ được ghi âm từ lâu.
            </Sec>
            <Sec label="Winnicott — 'Con người thật' vs 'Con người giả'">
              Nếu thời thơ ấu chỉ được yêu khi đáp ứng kỳ vọng người khác, đứa trẻ xây một <b>'false self'</b> (con người giả) để được chấp nhận, chôn giấu con người thật. Người trưởng thành với false self thống trị thường thành công bề ngoài nhưng thấy trống rỗng, không biết 'mình thật sự là ai/muốn gì'. Winnicott cũng cho ý niệm giải phóng: <b>'good enough'</b> — không cần hoàn hảo, chỉ cần đủ tốt. Cha mẹ đủ tốt, và cả bản thân đủ tốt.
            </Sec>
            <Sec label="Sociometer Theory (Mark Leary) — vì sao ta quan tâm đến giá trị bản thân">
              Một góc nhìn tiến hoá gây ngạc nhiên: self-esteem không phải mục đích tự thân mà là <b>chiếc đồng hồ đo</b> mức độ mình được cộng đồng chấp nhận. Tổ tiên bị nhóm ruồng bỏ thì chết, nên não tiến hoá một 'máy đo xã hội' — cảm giác vô giá trị thực chất là báo động 'nguy cơ bị loại trừ'. Hàm ý an ủi: khi thấy mình vô giá trị, đó thường là hệ thống cảnh báo cổ xưa đang kêu, KHÔNG phải sự thật về giá trị của bạn. Hiểu cơ chế giúp không tin nó một cách mù quáng.
            </Sec>
            <Sec label="Carol Dweck — Growth Mindset và giá trị bản thân">
              Người có 'fixed mindset' xem năng lực là cố định, nên mỗi thất bại là bằng chứng về giá trị con người ('mình dốt'). Người có 'growth mindset' xem năng lực có thể phát triển, nên thất bại chỉ là thông tin ('mình chưa giỏi — yet'). Chuyển dịch này tách <b>giá trị con người</b> khỏi <b>kết quả một lần</b> — nền tảng để thất bại không còn đánh sập giá trị bản thân.
            </Sec>
            <Sec label="IFS (Internal Family Systems) — bạn không phải nhà phê bình của mình">
              Richard Schwartz đề xuất: tâm trí gồm nhiều 'phần' (parts) — kể cả phần phê bình khắc nghiệt. Nhưng nhà phê bình nội tâm thường là một 'phần bảo vệ' hiểu lầm: nó chỉ trích bạn để cố ngăn bạn bị người khác từ chối trước (một chiến lược phòng vệ vụng về). Bên dưới mọi phần là <b>'Self'</b> — trung tâm bình tĩnh, trắc ẩn, không hư hỏng. Mục tiêu không phải tiêu diệt nhà phê bình mà hiểu nó đang sợ gì, và dẫn dắt từ Self.
            </Sec>
          
</div>
        )}

        {sub === "f-east" && (
          <div style={{ display: "grid", gap: 18 }}>

            <Sec label="Phật giáo — Nghịch lý 'vô ngã' và tự trắc ẩn">
              Phật giáo đặt một câu hỏi triệt để: nếu không có một 'cái tôi' cố định (anatta/vô ngã), thì toàn bộ dự án 'nâng cao giá trị bản thân' có đặt sai chỗ không? Cái tôi mà ta ra sức bảo vệ và đánh giá chỉ là một dòng chảy các hiện tượng, không phải một thực thể cố định cần chứng minh. Nghịch lý giải thoát: <b>bớt bám vào 'tôi' thì bớt khổ vì 'tôi chưa đủ tốt'</b>. Đồng thời, chính từ truyền thống này (metta — từ tâm) mà Neff rút ra self-compassion: đối xử với mình bằng lòng từ như với mọi chúng sinh.
            </Sec>
            <Sec label="Tự trắc ẩn vs tự nâng — điểm khác biệt Đông/Tây tinh tế">
              Văn hoá phương Tây có xu hướng xây giá trị bằng cách thấy mình ĐẶC BIỆT, NỔI BẬT (self-enhancement). Truyền thống Á Đông thiên về self-compassion qua sự KHIÊM NHƯỜNG và thuộc về (belonging). Neff lưu ý: self-compassion không đòi hỏi thấy mình hơn ai — nó dựa trên 'nhân tính chung', tức thấy mình GIỐNG mọi người trong khổ đau, không phải khác biệt. Đây là lý do self-compassion 'hợp' với tâm thức Á Đông hơn là mô hình self-esteem cạnh tranh.
            </Sec>
            <Sec label="Đạo giáo — Giá trị của cái 'vô dụng' và tự nhiên">
              Trang Tử kể về cái cây 'vô dụng' sống thọ chính vì không bị đốn — phê phán việc định giá mọi thứ bằng công dụng. Ứng dụng: giá trị bản thân không cần đến từ 'hữu ích/năng suất'. Nguyên lý <b>tự nhiên</b> (ziran) gợi ý: bớt gồng để 'trở thành ai đó', trở về với bản tính vốn có. Đối lập trực diện với văn hoá tối ưu hoá bản thân không ngừng nghỉ.
            </Sec>
            <Sec label="Thích Nhất Hạnh — Trở về nương tựa chính mình">
              "Con đã về, con đã tới" — thực hành trở về với giây phút hiện tại và với chính mình như một ngôi nhà. Thiền sư dạy 'thương thân' không phải nuông chiều bản ngã mà là chăm sóc thân tâm bằng chánh niệm, ôm ấp nỗi khổ của mình như mẹ ôm con đang khóc. Giá trị bản thân ở đây không phải điều cần chứng minh mà điều cần <b>tiếp xúc lại</b> — nó vốn đã ở đó, chỉ bị che lấp.
            </Sec>
            <Sec label="Điểm mù cần lưu ý khi mượn Đông phương">
              Cần trung thực: một số bối cảnh Á Đông truyền thống, dưới danh nghĩa 'khiêm nhường' và 'hy sinh vì tập thể', có thể vô tình dạy người ta — đặc biệt phụ nữ — tự xoá mình, đặt giá trị bản thân sau nghĩa vụ với người khác. Self-compassion đích thực KHÔNG phải tự xoá: nó bao gồm cả 'fierce self-compassion' (Neff) — bảo vệ mình, đặt ranh giới, nói KHÔNG khi cần. Lòng từ với mình và sự quyết đoán không mâu thuẫn.
            </Sec>
          
</div>
        )}

        {sub === "f-soc" && (
          <div style={{ display: "grid", gap: 18 }}>

            <Sec label="Festinger — Lý thuyết so sánh xã hội">
              Con người đánh giá bản thân bằng cách so với người khác — một cơ chế tâm lý cơ bản không tắt được. Vấn đề: ta thường so sánh LÊN (với người hơn mình) ở đúng lĩnh vực mình yếu, tạo ra cảm giác thiếu hụt kinh niên. Hiểu điều này giúp nhận ra: cảm giác 'kém cỏi' thường là <b>sản phẩm của việc chọn sai đối tượng so sánh</b>, không phải sự thật khách quan về mình.
            </Sec>
            <Sec label="Mạng xã hội — cỗ máy so sánh công nghiệp hoá">
              Nghiên cứu nhất quán cho thấy tương quan giữa sử dụng mạng xã hội thụ động (lướt xem đời người khác) và giảm tự đánh giá bản thân. Cơ chế: ta so sánh đời thực 'hậu trường' của mình với 'highlight reel' đã lọc kỹ của người khác — một so sánh không công bằng về mặt cấu trúc. Đây không phải yếu đuối cá nhân mà là <b>thiết kế của nền tảng</b>: chúng kiếm tiền từ sự bất mãn của bạn.
            </Sec>
            <Sec label="Phê phán 'chủ nghĩa tân tự do về bản thân' (neoliberal self)">
              Các nhà xã hội học (như Byung-Chul Han trong <i>The Burnout Society</i>) phê phán: xã hội hiện đại biến con người thành 'doanh nghiệp của chính mình' — phải liên tục tối ưu, nâng cấp, thể hiện. 'Self-improvement' vô tận trở thành một dạng bóc lột tự nguyện. Hàm ý sâu: một phần cảm giác 'chưa đủ tốt' không phải vấn đề tâm lý cá nhân mà là <b>được cấy vào bởi một hệ thống cần bạn luôn thấy thiếu</b> để tiếp tục tiêu thụ và sản xuất.
            </Sec>
            <Sec label="Brené Brown — Xấu hổ (shame) và 'sự xứng đáng'">
              Brown phân biệt guilt ('tôi đã làm điều tệ') với shame ('tôi là kẻ tệ') — shame ăn mòn giá trị bản thân tận gốc. Nghiên cứu của bà cho thấy người có 'ý thức mạnh về sự xứng đáng' (worthiness) không phải người ít khiếm khuyết, mà là người <b>tin mình xứng đáng thuộc về DÙ có khiếm khuyết</b>. Chìa khoá là 'vulnerability' — dám để người khác thấy con người thật của mình, và 'shame resilience' — nói ra sự xấu hổ thay vì giấu nó (shame sống nhờ bí mật và im lặng).
            </Sec>
            <Sec label="Văn hoá & ngôn ngữ về giá trị bản thân">
              Cách một nền văn hoá nói về 'yêu bản thân' định hình cách trải nghiệm nó. Ở nhiều bối cảnh Á Đông, 'yêu bản thân' từng bị hiểu lệch thành 'ích kỷ', khiến việc chăm sóc bản thân mang mặc cảm tội lỗi. Việc phân biệt rõ (self-compassion ≠ self-indulgence ≠ selfishness) không chỉ là chuyện học thuật mà giải phóng người ta khỏi mặc cảm khi bắt đầu tử tế với chính mình.
            </Sec>
          
</div>
        )}

        {sub === "f-deep" && (
          <div style={{ display: "grid", gap: 18 }}>

            <p style={{ fontFamily: SANS, fontSize: 13, color: "#57605A", lineHeight: 1.65, margin: 0 }}>
              Tầng chuyên sâu — các mô hình lâm sàng và bằng chứng nghiên cứu vượt ra ngoài "lời khuyên phổ biến". Đây là khung mà một nhà trị liệu hoặc nghiên cứu thực thụ dùng để hiểu và can thiệp vào giá trị bản thân.
            </p>

            <Sec label="Paul Gilbert — CFT và ba hệ điều hoà cảm xúc">
              Nền tảng của Compassion-Focused Therapy: não có ba hệ điều hoà cảm xúc, và vấn đề giá trị bản thân là vấn đề MẤT CÂN BẰNG giữa chúng. (1) <b>Hệ đe doạ</b> (threat) — hạch hạnh nhân, cortisol/adrenaline; nhiệm vụ là bảo vệ, phát hiện nguy hiểm. Điều then chốt: tự phê bình kích hoạt chính hệ này — khi bạn tự đánh mình, não xử lý như thể ĐANG BỊ TẤN CÔNG, dù kẻ tấn công là chính bạn. (2) <b>Hệ thúc đẩy</b> (drive) — dopamine; đuổi theo mục tiêu, thành tựu, phần thưởng. Contingent self-worth sống ở đây: chạy mãi không dừng. (3) <b>Hệ xoa dịu/gắn kết</b> (soothing/affiliation) — oxytocin, cảm giác an toàn (safeness), được kết nối. Self-compassion kích hoạt hệ này. Luận điểm cốt lõi: <b>bạn KHÔNG THỂ xây giá trị bản thân từ hệ đe doạ hay hệ thúc đẩy</b> — vì cả hai đều dựa trên sợ hãi hoặc thiếu hụt. Đời sống hiện đại phát triển quá mức threat + drive và teo tóp soothing. Trị liệu = chủ động rèn hệ xoa dịu (đây là lý do affirmation thường thất bại: chúng thuộc hệ drive, không phải soothing).
            </Sec>

            <Sec label="Michael Kernis — Self-esteem 'mong manh' vs 'tối ưu': tại sao CAO không đủ">
              Kernis chỉ ra self-esteem phải được mô tả bằng BỐN chiều, không chỉ cao/thấp: <b>mức độ</b> (level), <b>độ ổn định</b> (stability — có dao động theo ngày không), <b>tính điều kiện</b> (contingency — có phụ thuộc kết quả không), và <b>tính đồng nhất</b> (congruence — self-esteem hiển ngôn có khớp với tiềm ẩn/implicit không). Phát hiện quan trọng: <b>self-esteem cao nhưng MONG MANH</b> (bất ổn, có điều kiện, phòng thủ, hoặc cao ngoài mặt nhưng thấp ở tầng tiềm ẩn) mới là gốc của ái kỷ, phòng thủ, hung hăng — KHÔNG phải self-esteem thấp. Nghiên cứu: sự BẤT ỔN của self-esteem dự báo trầm cảm tốt hơn cả mức độ; self-esteem có điều kiện dự báo lo âu. 'Self-esteem tối ưu' của Kernis là loại VỮNG (secure), ổn định, chân thật, không-điều-kiện — và dấu hiệu nhận biết nghịch lý: nó KHÔNG cần được bảo vệ. Người phải phòng thủ dữ dội cho hình ảnh bản thân chính là người có self-esteem mong manh nhất.
            </Sec>

            <Sec label="Schema Therapy (Jeffrey Young) — các 'lược đồ' cốt lõi và chế độ nội tâm">
              Mô hình lâm sàng sâu về gốc rễ cảm giác vô giá trị. Các <b>Lược đồ Lệch lạc Sớm</b> (Early Maladaptive Schemas) liên quan trực tiếp: <i>Khiếm khuyết/Xấu hổ</i> ('có gì đó sai và đáng xấu hổ ở tôi'), <i>Thất bại</i> ('tôi kém cỏi về bản chất'), <i>Tiêu chuẩn Khắt khe/Hà khắc</i> (perfectionism không ngừng), <i>Phục tùng</i> (đặt nhu cầu mình sau người khác), <i>Tìm kiếm Công nhận</i> (giá trị phụ thuộc sự tán thành). Young mô tả các <b>chế độ</b> (modes) vận hành trong tâm trí: <i>Đứa trẻ Tổn thương</i> (mang nỗi đau gốc), <i>Cha mẹ Trừng phạt/Đòi hỏi</i> (nhà phê bình nội tâm — giọng nói được nội hoá từ môi trường sớm), và <i>Người lớn Lành mạnh</i> (phần cần được củng cố). Ba <b>kiểu ứng phó</b> với lược đồ: đầu hàng (surrender — tin nó là thật), né tránh (avoidance — trốn tình huống kích hoạt), và bù trừ quá mức (overcompensation — ví dụ che lược đồ Khiếm khuyết bằng cầu toàn hoặc vĩ đại hoá). Mục tiêu trị liệu: nuôi dưỡng lại (limited reparenting) Đứa trẻ Tổn thương, chống lại Cha mẹ Trừng phạt, và làm mạnh Người lớn Lành mạnh — sâu và cấu trúc hơn nhiều so với 'suy nghĩ tích cực'.
            </Sec>

            <Sec label="Crocker — 'Cái giá của việc theo đuổi self-esteem' (nghiên cứu đầy đủ)">
              Vượt xa 'giá trị có điều kiện', Crocker và Park (2004) chứng minh rằng chính HÀNH ĐỘNG theo đuổi self-esteem mang chi phí đo được. Bảy 'lĩnh vực điều kiện' phổ biến: sự tán thành của người khác, ngoại hình, cạnh tranh/thắng thua, năng lực học tập-công việc, hỗ trợ gia đình, đức hạnh, và tình yêu của Thượng đế. Điểm tinh vi: các điều kiện <b>bên ngoài</b> (tán thành, ngoại hình, cạnh tranh) tốn kém hơn nhiều so với điều kiện <b>bên trong</b> (đức hạnh, giá trị sống). Khi giá trị bản thân bị treo vào một lĩnh vực, mỗi mối đe doạ ở đó kích hoạt phòng thủ, và cái giá trải khắp: tự chủ giảm (autonomy), quan hệ tổn hại (vì người khác thành công cụ hoặc mối đe doạ), việc học bị cản (né thử thách vì sợ lộ kém), và tự điều chỉnh suy yếu (kiệt sức vì bảo vệ cái tôi). Hàm ý sắc bén: giải pháp không phải 'neo vào lĩnh vực tốt hơn' mà là chuyển từ <b>mục tiêu-cái-tôi</b> (ego goals — chứng minh giá trị) sang <b>mục tiêu-phát-triển/từ-bi</b> (growth/compassionate goals — học hỏi và đóng góp).
            </Sec>

            <Sec label="Thần kinh học và 'cái tôi được kiến tạo'">
              Xử lý tự quy chiếu (self-referential processing) tập trung ở vỏ não trước trán giữa (medial prefrontal cortex) và mạng lưới mặc định (default mode network) — 'cái tôi' mà ta ra sức đánh giá phần lớn là một <b>câu chuyện do não dựng lên</b>, không phải một thực thể cố định (điểm hội tụ đáng chú ý với vô ngã của Phật giáo). Phân biệt 'cái tôi tường thuật' (narrative self) với 'cái tôi trải nghiệm' (experiencing self). Về xấu hổ: đây là một cảm xúc riêng biệt với sinh lý đặc trưng — thu mình, tránh ánh mắt, cảm giác 'nhỏ lại', kèm phản ứng phó giao cảm (parasympathetic) — tiến hoá như tín hiệu xoa dịu/quy phục trong thứ bậc xã hội. Phân biệt xấu hổ lành mạnh (thoáng qua, điều chỉnh hành vi) với xấu hổ mạn tính độc hại (thấm vào bản sắc). Nối với thuyết sociometer: cảm giác vô giá trị là não đọc 'nguy cơ bị loại khỏi nhóm' — một tín hiệu về vị thế xã hội được TRI GIÁC, không phải phép đo giá trị thật của bạn.
            </Sec>

            <Sec label="Tâm lý học văn hoá — 'giá trị bản thân' nghĩa là gì tuỳ nền văn hoá (Markus và Kitayama)">
              Điểm cực kỳ quan trọng với người Việt và thường bị lời khuyên phương Tây bỏ qua. Markus và Kitayama phân biệt <b>tự-cấu-trúc độc lập</b> (independent self-construal — cái tôi là một thực thể tách biệt, giá trị đến từ sự độc đáo và thành tựu cá nhân) với <b>tự-cấu-trúc phụ thuộc lẫn nhau</b> (interdependent — cái tôi được định nghĩa trong các mối quan hệ và vai trò, giá trị đến từ sự hoà hợp, chu toàn bổn phận, thuộc về). Trong văn hoá phụ thuộc lẫn nhau, các thang đo 'self-esteem' kiểu phương Tây thậm chí không dịch tốt — vì bản thân khái niệm được cấu trúc khác. Thêm chiều 'văn hoá thể diện' (face) so với 'văn hoá phẩm giá' (dignity). Hàm ý thực tiễn: lời khuyên 'yêu bản thân / đặt ranh giới' kiểu cá nhân chủ nghĩa có thể va chạm giá trị phụ thuộc lẫn nhau nếu áp dụng thô. Sự tích hợp trưởng thành KHÔNG phải là vứt bỏ tính phụ thuộc để theo chủ nghĩa cá nhân — mà là fierce self-compassion BÊN TRONG mạng lưới quan hệ: chăm sóc mình một cách bền vững để có thể chu toàn với người khác lâu dài, thay vì tự xoá mình đến kiệt quệ.
            </Sec>

            <Sec label="Bằng chứng: Self-compassion vs Self-esteem (nghiên cứu head-to-head)">
              Không phải quan điểm — đây là dữ liệu. Neff và Vonk (2009): so với self-esteem, self-compassion gắn với cảm giác giá trị bản thân <b>ỔN ĐỊNH hơn</b> qua thời gian, ÍT phụ thuộc điều kiện hơn, ÍT so sánh xã hội, ÍT tức giận và ÍT tự-ý-thức phòng thủ hơn. Câu hỏi phản biện quan trọng nhất — 'tự trắc ẩn có làm mình lười/tự mãn không?' — đã được kiểm chứng: Breines và Chen (2012) cho thấy self-compassion THỰC RA làm TĂNG động lực cải thiện, tăng trách nhiệm cá nhân, và tăng nỗ lực sau thất bại — ngược hẳn nỗi sợ thông thường. Cơ chế: khi không bị nỗi sợ xấu hổ nhấn chìm, người ta nhìn thẳng lỗi của mình rõ hơn và sửa được. Về sinh lý: self-compassion làm tăng biến thiên nhịp tim (HRV — dấu hiệu hệ thần kinh linh hoạt) và giảm cortisol. Kết luận chuyên môn: dịch chuyển từ theo đuổi self-esteem sang xây self-compassion không phải lời khuyên 'mềm' — nó có nền tảng thực chứng vững hơn cả mô hình self-esteem truyền thống.
            </Sec>

            <div style={{ background: "#EEF3F1", borderRadius: 6, padding: "16px 20px", border: "1px solid " + LINE }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 8 }}>
                Tổng hợp tầng chuyên sâu
              </div>
              <div style={{ fontSize: 14.4, lineHeight: 1.72 }}>
                Bốn dịch chuyển mà mọi khung chuyên sâu ở trên đều hội tụ về: (1) từ <b>hệ đe doạ/thúc đẩy</b> sang <b>hệ xoa dịu</b> (Gilbert); (2) từ self-esteem <b>cao</b> sang self-esteem <b>vững</b> — ổn định, không điều kiện (Kernis); (3) từ <b>mục tiêu-cái-tôi</b> sang <b>mục tiêu-phát-triển</b> (Crocker); (4) từ tự phê bình sang tự trắc ẩn — với bằng chứng thực chứng rằng điều này làm tăng, chứ không giảm, động lực (Neff, Breines). Và một lưu ý văn hoá bao trùm: với người trong nền văn hoá phụ thuộc lẫn nhau, đích đến không phải chủ nghĩa cá nhân phương Tây, mà là chăm sóc bản thân bền vững đủ để duy trì các mối quan hệ mình trân trọng.
              </div>
            </div>
          
</div>
        )}


        {sub === "g-identify" && (
          <div style={{ display: "grid", gap: 18 }}>

            <div>
              <h2 style={{ fontSize: 19, fontWeight: 600, margin: "0 0 4px" }}>Self-worth vững vs. mong manh (fragile)</h2>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, marginTop: 0, marginBottom: 12 }}>Nhiều người 'có vẻ tự tin' nhưng là tự tin mong manh — cuộn ngang để xem</p>
              <div style={{ overflowX: "auto", border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 640, fontSize: 13, fontFamily: SANS }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "9px 11px", background: "#F1F5F3", borderBottom: `1px solid ${LINE}` }}>Tiêu chí</th>
                      <th style={{ textAlign: "left", padding: "9px 11px", background: "#EEF5F1", borderBottom: `1px solid ${LINE}`, color: ACCENT, fontWeight: 700 }}>Vững (secure)</th>
                      <th style={{ textAlign: "left", padding: "9px 11px", background: "#F1F5F3", borderBottom: `1px solid ${LINE}` }}>Mong manh (fragile)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Khi bị phê bình", "Cân nhắc, lấy phần đúng, không sụp đổ", "Phòng thủ dữ dội hoặc suy sụp hoàn toàn"],
                      ["Khi người khác thành công", "Vui được, không thấy bị đe doạ", "Thấy nhỏ bé đi, ghen tị, phải hạ thấp họ"],
                      ["Nguồn giá trị", "Nội tại — 'tôi có giá trị vì tôi là người'", "Điều kiện — thành tích, ngoại hình, sự tán thành"],
                      ["Cần sự công nhận", "Trân trọng nhưng không lệ thuộc", "Khao khát liên tục, trống rỗng khi thiếu"],
                      ["Với khuyết điểm của mình", "Chấp nhận, coi là phần của làm người", "Chối bỏ, che giấu, hoặc tự dằn vặt"],
                      ["Khi thất bại", "'Tôi thất bại lần này' (hành vi)", "'Tôi là kẻ thất bại' (con người)"],
                      ["Nói về bản thân", "Không cần khoe cũng không cần dìm", "Hoặc khoang trương, hoặc tự hạ thấp quá mức"],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: "9px 11px", fontWeight: 600, borderBottom: i < 6 ? "1px solid #EBEEE9" : "none" }}>{row[0]}</td>
                        <td style={{ padding: "9px 11px", borderBottom: i < 6 ? "1px solid #EBEEE9" : "none", lineHeight: 1.5, background: "#F7FAF8", color: "#274A44" }}>{row[1]}</td>
                        <td style={{ padding: "9px 11px", borderBottom: i < 6 ? "1px solid #EBEEE9" : "none", lineHeight: 1.5, color: "#7A5A3A" }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Sec label="Dấu hiệu nhà phê bình nội tâm đang cầm lái">
              Ngôn ngữ tuyệt đối ('luôn luôn', 'chẳng bao giờ', 'ai cũng...') • Đọc suy nghĩ người khác theo hướng tệ nhất về mình • Gán nhãn con người thay vì mô tả hành vi • So sánh liên tục • 'Should' và 'phải' dày đặc • Cảm giác không việc gì mình làm là đủ. Nhận ra giọng nói này KHÔNG phải bạn — đó là bước đầu tiên để không tin nó tự động.
            </Sec>
            <Sec label="Tự tin thật vs. tự tin trình diễn">
              Tự tin thật thường lặng lẽ: không cần chứng minh, thoải mái nói 'tôi không biết', dám để lộ điểm yếu. Tự tin trình diễn ồn ào hơn: cần được thấy, khó thừa nhận sai, phòng thủ khi bị thách thức. Nghịch lý: người càng phải KHOE sự tự tin thường càng thiếu nó ở tầng sâu — sự chắc chắn thật không cần khuếch đại.
            </Sec>
          
</div>
        )}

        {sub === "g-dark" && (
          <div style={{ display: "grid", gap: 18 }}>

            <p style={{ fontFamily: SANS, fontSize: 13, color: "#57605A", lineHeight: 1.65, margin: 0 }}>
              'Yêu bản thân' cũng có những phiên bản lỗi và những cái bẫy. Hiểu chúng để không rơi vào.
            </p>
            <Sec label="Ái kỷ (narcissism) — không phải quá nhiều self-love, mà quá ít" color="#8A5A3A">
              Ngược với trực giác: narcissism thường KHÔNG phải self-love dư thừa, mà là self-esteem cực kỳ mong manh được che bằng lớp vỏ vĩ đại. Người ái kỷ cần liên tục được ngưỡng mộ vì bên trong trống rỗng và sợ hãi. Self-compassion thật (chấp nhận mình bình thường, giống mọi người) là thuốc GIẢI cho ái kỷ, không phải nguồn của nó — vì nó không cần thấy mình đặc biệt hơn ai.
            </Sec>
            <Sec label="Tích cực độc hại (toxic positivity)" color="#8A5A3A">
              'Yêu bản thân' bị bóp méo thành ép mình phải luôn vui, luôn 'tốt vibes', chối bỏ mọi cảm xúc tiêu cực. Đây là phản đề của self-compassion — vốn đòi hỏi CHÁNH NIỆM, tức nhìn thẳng nỗi đau chứ không phủ lên nó lớp sơn tích cực. Ép mình 'phải ổn' thực ra là một dạng tự phán xét mới: 'sao mình vẫn buồn, mình đang làm sai'.
            </Sec>
            <Sec label="Affirmation phản tác dụng" color="#8A5A3A">
              Nghiên cứu (Wood, 2009) cho thấy: với người tự trọng thấp, lặp lại 'tôi là người đáng yêu' có thể khiến họ thấy TỆ HƠN — vì nó mâu thuẫn quá mạnh với niềm tin cốt lõi, kích hoạt phản kháng. Điều hiệu quả hơn không phải khẳng định trống rỗng mà là <b>câu hỏi</b> ('có bằng chứng nào cho thấy mình có giá trị?') và <b>bằng chứng hành động</b>. Tự tin xây bằng việc làm, không bằng thần chú.
            </Sec>
            <Sec label="'Self-love' như cái cớ né trách nhiệm" color="#8A5A3A">
              Phiên bản lỗi phổ biến thời nay: dùng 'tôi phải yêu bản thân / bảo vệ năng lượng của tôi' để biện minh cho việc né mọi phản hồi khó nghe, cắt đứt người khác thay vì đối thoại, hoặc không bao giờ tự vấn. Self-compassion thật bao gồm cả <b>tự chịu trách nhiệm</b> (một trụ cột của Branden) — tử tế với mình KHÔNG có nghĩa miễn cho mình khỏi trưởng thành.
            </Sec>
            <Sec label="Giá trị bản thân neo vào 'chữa lành' và phát triển" color="#8A5A3A">
              Một cái bẫy tinh vi: biến chính hành trình 'self-improvement' thành một điều kiện mới của giá trị bản thân ('tôi chỉ ổn nếu tôi đang tiến bộ, đang chữa lành, đang tối ưu'). Đây là contingent self-worth đội lốt lành mạnh. Dấu hiệu: thấy tội lỗi khi nghỉ ngơi, khi không 'làm việc với bản thân'. Giá trị bản thân thật KHÔNG cần bạn phải liên tục cải thiện để tồn tại.
            </Sec>
            <Sec label="So sánh xuống cũng là bẫy" color="#8A5A3A">
              Nâng mình lên bằng cách thấy mình hơn người khác ('ít ra tôi không tệ như họ') tạo self-esteem tạm thời nhưng mong manh và phụ thuộc — vẫn là neo giá trị vào so sánh. Nó cũng nuôi sự phán xét và ngăn kết nối thật. Nền vững duy nhất là giá trị KHÔNG so sánh: mình có giá trị mà không cần ai kém hơn để chứng minh.
            </Sec>
          
</div>
        )}


        {sub === "c-core" && (
          <div style={{ display: "grid", gap: 18 }}>

            <div style={{ background: "#EEF3F1", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 8 }}>Khác self-worth như thế nào</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.68 }}>
                <b>Self-worth</b> (giá trị bản thân) là niềm tin nền tảng "tôi xứng đáng tồn tại và được yêu" — vô điều kiện, không phụ thuộc thành tích. <b>Self-confidence</b> (tự tin) là niềm tin "tôi làm được việc CỤ THỂ này" — mang tính tình huống, xây bằng bằng chứng, và <b>là một kỹ năng luyện được</b>, không phải một đặc điểm bẩm sinh. Một người có thể có giá trị bản thân vững mà vẫn thiếu tự tin thuyết trình; và một người có thể rất tự tin trong công việc mà giá trị bản thân mong manh. Tab này tách riêng để đào sâu đúng cơ chế xây dựng NĂNG LỰC này — độc lập với (dù được nâng đỡ bởi) nền tự trọng ở các tab khác.
              </div>
            </div>

            <Sec label="Albert Bandura — Self-Efficacy: nền lý thuyết trung tâm">
              Self-efficacy là <b>niềm tin vào khả năng thực hiện thành công một nhiệm vụ cụ thể</b> — khác self-esteem (cảm giác chung về giá trị bản thân) ở tính CỤ THỂ và ĐO ĐƯỢC. Bằng chứng cho thấy self-efficacy dự báo thành tích thực tế mạnh hơn self-esteem: tin "tôi là người có giá trị" không giúp bạn giải một bài toán, nhưng tin "tôi giải được dạng bài này" thì có, vì nó ảnh hưởng trực tiếp đến việc bạn có bắt tay vào làm, kiên trì bao lâu, và phục hồi thế nào sau thất bại. Bandura gọi đây là cơ chế trung gian giữa kiến thức/kỹ năng và hành vi thực tế — hai người cùng năng lực nhưng khác self-efficacy sẽ hành động khác hẳn nhau.
            </Sec>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>Bốn nguồn xây Self-Efficacy — xếp theo sức mạnh</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["1 · Trải nghiệm làm chủ (mastery experiences)", "Mạnh nhất — chiếm phần lớn ảnh hưởng", "Tự mình làm được một việc, đặc biệt sau khi đã nỗ lực vượt qua khó khăn (không phải thành công dễ dàng). Thất bại xử lý đúng cách (rút bài học, thử lại) thực ra CỦNG CỐ self-efficacy dài hạn hơn một chuỗi thành công không tốn sức — vì nó dạy rằng bạn có thể phục hồi. Đây là lý do 'thang mastery' (chia nhỏ, leo dần) là công cụ mạnh nhất trong toàn bộ tài liệu này."],
                  ["2 · Học qua quan sát (vicarious experience)", "Mạnh khi người mẫu 'giống mình'", "Thấy một người mà bạn cảm nhận tương đồng với mình (không phải một thiên tài xa vời) vượt qua thử thách tương tự — não suy luận 'nếu họ làm được, mình cũng có thể'. Hiệu quả giảm mạnh nếu người mẫu quá khác biệt (giới, tuổi, xuất phát điểm) — đây là lý do đại diện và hình mẫu gần gũi quan trọng hơn hình mẫu 'hoàn hảo xa vời'."],
                  ["3 · Thuyết phục xã hội (verbal persuasion)", "Yếu hơn hai nguồn trên, dễ mất tác dụng", "Được người đáng tin cậy khẳng định bạn có khả năng. Hiệu quả chỉ thật khi đến từ nguồn CÓ THẨM QUYỀN và ĐÚNG LÚC (ngay trước một nỗ lực, không phải lời khen chung chung). Rủi ro: nếu sau đó thất bại ngay, thuyết phục xã hội sụp nhanh hơn hai nguồn trên — vì nó chưa có bằng chứng hành vi đỡ lưng."],
                  ["4 · Trạng thái sinh lý & cảm xúc", "Yếu nhất nhưng dễ can thiệp nhất tức thời", "Cách bạn DIỄN GIẢI tín hiệu cơ thể (tim đập, tay ra mồ hôi) quyết định nó tiếp thêm hay phá huỷ tự tin. Diễn giải là 'lo sợ/bất lực' → tự tin sụp. Diễn giải là 'cơ thể đang huy động năng lượng, sẵn sàng hành động' → tự tin được giữ. Đây là nguồn duy nhất có thể can thiệp NGAY LẬP TỨC, ngay trước một thử thách — xem mục tái định giá bên dưới."],
                ].map(([h, tag, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "9px 15px", background: "#F3F6F3", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
                      <span style={{ fontSize: 14.6, fontWeight: 600 }}>{h}</span>
                      <span style={{ fontFamily: SANS, fontSize: 11, color: MUTE, fontStyle: "italic" }}>{tag}</span>
                    </div>
                    <div style={{ padding: "10px 15px", fontSize: 14, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <Sec label="Vấn đề chuyển giao — vì sao tự tin không tự động lan sang lĩnh vực khác">
              Self-efficacy về bản chất mang tính <b>đặc thù theo lĩnh vực</b> (domain-specific): giỏi và tự tin trong phân tích tài chính không tự động chuyển thành tự tin nói trước đám đông — hai bộ bằng chứng hành động khác nhau, não không tự suy luận từ cái này sang cái khác. Đây là lý do nhiều người thành đạt trong công việc vẫn rụt rè trong giao tiếp xã hội. Có một lớp "self-efficacy tổng quát" (generalized self-efficacy) hình thành từ việc tích luỹ thành công XUYÊN nhiều lĩnh vực khác nhau theo thời gian — nhưng nó xây chậm và cần chủ động tạo bằng chứng ở CHÍNH lĩnh vực bạn muốn tự tin, không thể vay mượn từ lĩnh vực khác.
            </Sec>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>Tự tin thật vs. tự tin trình diễn — đào sâu</div>
              <div style={{ overflowX: "auto", border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 600, fontSize: 13.5, fontFamily: SANS }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "9px 11px", background: "#F3F6F3", borderBottom: `1px solid ${LINE}`, width: "26%" }}></th>
                      <th style={{ textAlign: "left", padding: "9px 11px", background: "#EEF3F1", borderBottom: `1px solid ${LINE}`, color: "#274A44" }}>Tự tin thật (secure)</th>
                      <th style={{ textAlign: "left", padding: "9px 11px", background: "#FBF3EE", borderBottom: `1px solid ${LINE}`, color: "#7A5A3A" }}>Tự tin trình diễn (brittle)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Nguồn gốc", "Bằng chứng hành động tích luỹ", "Nhu cầu được nhìn nhận, che giấu nghi ngờ"],
                      ["Khi bị thách thức", "Cân nhắc, có thể đổi ý", "Phòng thủ, phản pháo"],
                      ["Nói 'tôi không biết'", "Dễ dàng, không đe doạ", "Rất khó, cảm giác lộ điểm yếu"],
                      ["Âm lượng xã hội", "Thường lặng lẽ, không cần chứng minh", "Ồn ào, cần được thấy, hay khoe"],
                      ["Thất bại", "Xử lý như dữ liệu để học", "Đe doạ bản sắc, dễ đổ lỗi ngoài"],
                      ["Đứng cạnh người giỏi hơn", "Thoải mái, tò mò học hỏi", "Bị đe doạ, hạ thấp hoặc tránh né"],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: "8px 11px", fontWeight: 600, borderBottom: i < 5 ? "1px solid #EBEEE9" : "none" }}>{row[0]}</td>
                        <td style={{ padding: "8px 11px", borderBottom: i < 5 ? "1px solid #EBEEE9" : "none", lineHeight: 1.5, background: "#F7FAF8", color: "#274A44" }}>{row[1]}</td>
                        <td style={{ padding: "8px 11px", borderBottom: i < 5 ? "1px solid #EBEEE9" : "none", lineHeight: 1.5, color: "#7A5A3A" }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.65, marginTop: 10 }}>
                Khái niệm liên quan: <b>"insecure overachiever"</b> — người thành tích cao nhưng động cơ là chứng minh giá trị bản thân (chạy trốn cảm giác không đủ) chứ không phải từ hứng thú hay bằng chứng nội tại. Bề ngoài trông giống tự tin thật (thành tích thật, năng lực thật) nhưng bên trong vận hành như tự tin trình diễn — mỗi thành tích chỉ mua được sự yên tâm tạm thời rồi thanh chuẩn lại nâng lên. Phân biệt bằng câu hỏi: nếu ngừng đạt thành tích mới trong một năm, giá trị bản thân có sụp không?
              </div>
            </div>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>Hiệu chỉnh (calibration) — tự tin phải bám theo năng lực thật</div>
              <div style={{ display: "grid", gap: 10 }}>
                <Sec label="Hiệu ứng Dunning-Kruger — cả hai đầu đều méo">
                  Người có năng lực THẤP nhất trong một lĩnh vực thường đánh giá QUÁ CAO khả năng của mình — vì chính sự thiếu kỹ năng khiến họ không nhận ra được sự thiếu kỹ năng đó (thiếu năng lực nhận ra mình thiếu năng lực). Ngược lại, người có năng lực CAO đôi khi đánh giá THẤP mình vì giả định việc dễ với họ cũng dễ với người khác ("hiệu ứng gánh nặng tri thức" — curse of knowledge). Hệ quả: tự tin và năng lực có thể LỆCH pha ở cả hai đầu của phổ năng lực — mục tiêu không phải "tự tin hơn" một cách chung chung, mà là tự tin ĐÚNG với năng lực thật.
                </Sec>
                <Sec label="Cái giá của lệch hiệu chỉnh">
                  Tự tin THÁI QUÁ so với năng lực dẫn tới nhận rủi ro sai chỗ, mù trước phản hồi cảnh báo, và mất uy tín khi thực tế lộ ra. Tự tin THIẾU so với năng lực dẫn tới bỏ lỡ cơ hội xứng đáng, tự giới hạn không cần thiết, và mệt mỏi vì phải nỗ lực chứng minh những gì mình đã đủ khả năng. Cả hai lệch đều tốn kém — hiệu chỉnh đúng, không phải "tự tin tối đa", mới là mục tiêu.
                </Sec>
                <Sec label="Cách hiệu chỉnh: theo dõi và đối chiếu">
                  Trước một nhiệm vụ, viết dự đoán cụ thể về khả năng thành công của mình (ví dụ: "70% khả năng bài thuyết trình này suôn sẻ"). Sau đó đối chiếu với thực tế. Lặp lại nhiều lần và theo dõi: dự đoán của bạn có xu hướng thiên cao hay thiên thấp so với thực tế? Đây là kỹ thuật "hiệu chỉnh dự báo" dùng trong các lĩnh vực đòi hỏi độ chính xác cao (dự báo, y khoa, tình báo) — áp dụng được cho tự đánh giá năng lực cá nhân.
                </Sec>
              </div>
            </div>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>Sinh lý học của tự tin</div>
              <div style={{ display: "grid", gap: 10 }}>
                <Sec label="Tái định giá kích hoạt (Alison Wood Brooks)">
                  Hồi hộp và hào hứng có cùng chữ ký sinh lý: tim đập nhanh, cơ thể tỉnh táo, adrenaline tăng. Sự khác biệt duy nhất là NHÃN NHẬN THỨC bạn gán cho nó. Nghiên cứu của Brooks cho thấy nói to (hoặc nghĩ) "tôi đang hào hứng" thay vì "tôi đang lo lắng" ngay trước một thử thách (thuyết trình, phỏng vấn, đàm phán) cải thiện hiệu suất đo được — vì "hào hứng" giữ bạn ở trạng thái tiếp cận (approach), còn "bình tĩnh lại" (cố dập kích hoạt) thường khó và kéo bạn vào trạng thái né tránh (avoidance) nhiều hơn.
                </Sec>
                <Sec label="Tư thế cơ thể — điều gì có bằng chứng, điều gì không">
                  Cần trung thực về bằng chứng: nghiên cứu gốc về "power posing" (đứng tư thế mở rộng làm thay đổi hormone testosterone/cortisol) đã KHÔNG được nhân rộng thành công trong các nghiên cứu sau đó, và một tác giả gốc đã công khai rút lại phần kết luận về thay đổi hormone. Điều CÓ bằng chứng vững hơn: tư thế cơ thể ảnh hưởng đến CẢM GIÁC chủ quan về sự tự tin và cách người khác NHÌN NHẬN bạn (qua ngôn ngữ cơ thể), dù không chứng minh được thay đổi hormone. Kết luận thận trọng: đứng thẳng, vai mở, hơi thở sâu là công cụ điều tiết cảm giác hợp lý — nhưng đừng kỳ vọng nó thay thế được bằng chứng năng lực thật.
                </Sec>
                <Sec label="Hơi thở như đòn bẩy nhanh nhất">
                  Thở chậm và sâu (kéo dài hơi thở ra) kích hoạt hệ thần kinh phó giao cảm, hạ nhịp tim trực tiếp — đây là công cụ sinh lý DUY NHẤT trong danh sách này có cơ chế thần kinh rõ ràng và tức thời. Trước một tình huống cần tự tin: 3-4 nhịp thở chậm, hít vào 4 giây, thở ra 6-8 giây, đủ để hạ kích hoạt xuống mức có thể tái định giá.
                </Sec>
              </div>
            </div>

            <Sec label="Tự tin dưới áp lực cao — nguyên tắc chung">
              Ba tình huống áp lực cao nhất (nói trước đám đông, đàm phán, nhận phê bình trực tiếp) đều vận hành theo cùng một cơ chế: hệ thần kinh diễn giải sự chú ý/đánh giá từ người khác như một mối đe doạ sinh tồn (dấu vết tiến hoá từ nỗi sợ bị loại khỏi bộ tộc). Ba đòn bẩy dùng chung: (1) chuyển tiêu điểm từ "mình trông thế nào" sang "tôi mang lại giá trị gì cho người nghe/đối phương" — nghiên cứu cho thấy tiêu điểm hướng ngoại giảm lo âu hiệu quả hơn cố kiểm soát tiêu điểm hướng nội; (2) tái định giá kích hoạt cơ thể như hào hứng (xem trên); (3) chuẩn bị bằng mastery nhỏ trước — một buổi tập dượt thật, không chỉ tưởng tượng, tạo bằng chứng cơ thể có thể tin. Các kịch bản cụ thể theo tình huống (thuyết trình, xin tăng lương, nhận phê bình...) có ở tab ★ Tình huống.
            </Sec>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: "#7A5A3A", fontWeight: 700, marginBottom: 10 }}>Huyền thoại & cạm bẫy</div>
              <div style={{ display: "grid", gap: 9 }}>
                {[
                  ["\"Fake it till you make it\" — đúng một nửa", "Có bằng chứng cho phần HÀNH VI (tư thế, giọng nói, ngôn ngữ cơ thể tự tin có thể luyện tập trước khi cảm thấy tự tin thật, và hành vi đó ảnh hưởng ngược lại cảm giác). KHÔNG có bằng chứng cho phần NĂNG LỰC — giả vờ giỏi một việc mình chưa giỏi không làm mình giỏi lên; nó chỉ trì hoãn việc xây bằng chứng thật, và rủi ro lộ ra khi bị kiểm chứng thực tế."],
                  ["Nhầm tự tin với sự áp đảo", "Tự tin thật không cần hạ thấp người khác để nổi bật, không cần nói to hơn hay chiếm nhiều không gian hơn để chứng minh giá trị. Hành vi áp đảo (interrupt liên tục, không nhường chỗ cho ý kiến khác) thường là bù trừ cho sự bất an, không phải biểu hiện của tự tin vững."],
                  ["Tưởng tự tin là cảm giác không còn sợ", "Tự tin thật không phải là hết sợ — là hành động DÙ đang sợ, vì đã có đủ bằng chứng rằng mình xử lý được ngay cả khi kết quả không hoàn hảo. Chờ đến khi 'cảm thấy sẵn sàng' mới hành động là một cái bẫy — cảm giác sẵn sàng thường đến SAU hành động, không phải trước."],
                  ["Impostor syndrome — khi thành tích thật vẫn không đủ", "Một số người tích luỹ rất nhiều bằng chứng năng lực thật (mastery experiences dồi dào) nhưng vẫn cảm thấy mình 'lừa gạt' mọi người. Đây thường là dấu hiệu vấn đề nằm ở tầng self-worth (niềm tin nền 'tôi không đủ tốt' đang lọc bỏ mọi bằng chứng ngược lại), không phải thiếu self-efficacy — quay lại các tab Tâm lý học và Chuyên sâu để xử lý đúng tầng."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: "1px solid #F0DFC8", background: "#FBF6EE", borderRadius: 4, padding: "11px 15px" }}>
                    <div style={{ fontSize: 14.4, fontWeight: 600, color: "#7A5A3A", marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>Thực hành — biến lý thuyết thành bằng chứng</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["1 · Xây thang mastery", "Chọn MỘT lĩnh vực cụ thể muốn tự tin (không phải 'tự tin nói chung'). Viết 5-7 bậc từ dễ đến khó, mỗi bậc 'hơi khó nhưng làm được'. Ví dụ cho nói trước đám đông: nói trong nhóm nhỏ quen thuộc → nói có chuẩn bị trước 5 người → hỏi một câu trong cuộc họp lớn → thuyết trình 5 phút có chuẩn bị → thuyết trình ứng biến. Leo từng bậc, không nhảy cóc. Chỉ lên bậc tiếp khi bậc hiện tại đã thấy 'bình thường'."],
                  ["2 · Nhật ký bằng chứng có cấu trúc", "Mỗi tối ghi 1-3 việc đã làm được, theo công thức: [Việc đã làm] → [Kỹ năng nó chứng minh]. Không viết chung chung ('hôm nay ổn') mà cụ thể ('trình bày ý kiến trái chiều trong họp mà không né tránh → chứng minh khả năng quyết đoán dưới áp lực xã hội'). Não có thiên kiến lọc bỏ bằng chứng tích cực; ghi chép có cấu trúc chống lại thiên kiến này một cách chủ động."],
                  ["3 · Bài tập hiệu chỉnh dự báo", "Trước 5 tình huống sắp tới, viết % tin tưởng thành công. Sau mỗi tình huống, ghi lại kết quả thật. Sau 5 lần, nhìn lại: dự đoán của bạn thiên cao hay thiên thấp? Đây là cách phát hiện lệch hiệu chỉnh của chính mình một cách khách quan, thay vì đoán."],
                  ["4 · Tái định giá kích hoạt — luyện trước khi cần", "Chọn một cụm từ ngắn ('tôi đang hào hứng', 'cơ thể đang sẵn sàng') và LUYỆN nói nó thành tiếng ngay khi thấy tim đập nhanh trong các tình huống áp lực thấp trước (một cuộc gọi nhỏ, một câu hỏi trong họp). Khi phản xạ đã hình thành ở mức áp lực thấp, nó sẽ tự động xuất hiện ở mức áp lực cao."],
                  ["5 · Buổi tập dượt thật, không chỉ tưởng tượng", "Trước một sự kiện áp lực cao, tạo ít nhất MỘT lần tập dượt có điều kiện gần giống thật nhất có thể (nói to, đứng lên, có người nghe) — không chỉ nhẩm trong đầu. Bằng chứng cơ thể từ tập dượt thật mạnh hơn nhiều so với hình dung, vì nó kích hoạt đúng các mạch vận động và cảm xúc sẽ dùng trong tình huống thật."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            
<Quote text="Self-efficacy is not a fixed trait but a belief system that operates through cognitive, motivational, affective, and selection processes — and it is built, not born." by="Diễn giải từ Albert Bandura — self-efficacy là hệ niềm tin được xây, không phải đặc điểm bẩm sinh" />
</div>
        )}

        {sub === "c-playbook" && (
          <div style={{ display: "grid", gap: 18 }}>
<div style={{ background: "#2A3B37", color: "#EAF1EE", borderRadius: 6, padding: "18px 22px" }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#9CC9BC", fontWeight: 700, marginBottom: 9 }}>Playbook theo bối cảnh cụ thể</div>
              <div style={{ fontSize: 14.4, lineHeight: 1.7 }}>
                Lý thuyết ở trên là nền chung; nhưng tự tin "chung chung" không tồn tại — nó luôn biểu hiện trong một bối cảnh cụ thể, mỗi bối cảnh có rào cản tâm lý riêng. Sáu playbook dưới đây áp cơ chế self-efficacy vào sáu tình huống hay gặp nhất, kèm phương pháp và kịch bản dùng ngay.
              </div>
            </div>

            {/* 1. Work */}
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>1 · Tự tin trong công việc</div>
              <div style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, lineHeight: 1.55, marginBottom: 10 }}>Rào cản đặc thù: sợ bị đánh giá năng lực trước người có quyền quyết định (sếp, khách hàng) — mức đe doạ cao hơn giao tiếp xã hội thường vì gắn với sinh kế.</div>
              <div style={{ display: "grid", gap: 9 }}>
                {[
                  ["Tách 'chưa biết việc này' khỏi 'không có năng lực'", "Người mới hoặc mới nhận việc khó thường nhầm 'tôi chưa có kinh nghiệm ở việc CỤ THỂ này' thành 'tôi không đủ giỏi'. Đây là lỗi quy kết — thiếu kinh nghiệm là trạng thái tạm thời và sửa được bằng mastery experience; 'không đủ giỏi' là nhãn cố định và làm tê liệt hành động. Khi thấy hụt hẫng trong công việc, tự hỏi: 'đây là thiếu SKILL cụ thể (học được) hay tôi đang tự dán nhãn TRAIT cố định?'"],
                  ["Xây uy tín bằng 'thắng lợi nhỏ có thể thấy được'", "Uy tín trong công việc không xây bằng lời nói mà bằng chuỗi kết quả nhỏ, nhất quán, người khác quan sát được. Chọn 1-2 việc nhỏ mỗi tuần làm TỐT HƠN mức kỳ vọng và chủ động thông báo kết quả (không phải khoe, mà là cập nhật rõ ràng) — đây chính là 'mastery experience' công khai, vừa xây self-efficacy cá nhân vừa xây uy tín xã hội cùng lúc."],
                  ["Ra quyết định dưới sự không chắc chắn", "Sợ ra quyết định sai thường đến từ kỳ vọng phi thực tế rằng người có năng lực luôn chắc chắn. Thực tế: người tự tin trong công việc không phải người luôn chắc, mà là người có QUY TRÌNH xử lý khi không chắc — nêu rõ giả định, xin dữ liệu còn thiếu nếu có thời gian, quyết định với thông tin sẵn có, và chuẩn bị điều chỉnh nếu sai. Tự tin nằm ở quy trình, không ở việc luôn đúng."],
                  ["Chủ động xin phản hồi trước khi bị đánh giá bị động", "Người thiếu tự tin trong công việc thường né phản hồi vì sợ nghe điều tệ. Nghịch lý: chủ động hỏi 'điều gì em có thể làm tốt hơn' TRƯỚC khi bị đánh giá chính thức làm giảm lo âu (vì lấy lại quyền kiểm soát thời điểm và khung phản hồi) và tạo ấn tượng về sự tự tin thật — chỉ người không sợ nghe sự thật mới chủ động đi tìm nó."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Life */}
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>2 · Tự tin trong đời sống cá nhân &amp; xã hội</div>
              <div style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, lineHeight: 1.55, marginBottom: 10 }}>Rào cản đặc thù: không có "thước đo" rõ ràng như công việc (không lương thưởng, không đánh giá hiệu suất) nên bằng chứng năng lực khó tích luỹ có ý thức — người ta hiếm khi 'luyện' tự tin xã hội một cách chủ đích như luyện kỹ năng nghề.</div>
              <div style={{ display: "grid", gap: 9 }}>
                {[
                  ["Coi tương tác xã hội là 'reps' có thể luyện, không phải phép thử định mệnh", "Một cuộc trò chuyện không suôn sẻ không phải bằng chứng 'mình kém giao tiếp' — nó là MỘT lần lặp trong hàng nghìn lần lặp cần để xây kỹ năng, giống một cú đánh trong tennis. Người tự tin xã hội không phải người chưa từng có cuộc trò chuyện gượng gạo — là người không để một lần gượng gạo định nghĩa toàn bộ năng lực của mình."],
                  ["Chủ động tạo 'sân chơi rủi ro thấp' để tích luỹ bằng chứng", "Không đợi tình huống áp lực cao (buổi hẹn quan trọng, sự kiện lớn) mới thực hành — chủ động tạo các tương tác nhỏ, rủi ro thấp: hỏi đường một người lạ, bắt chuyện với nhân viên quán quen, chủ động chào người mới trong nhóm. Mỗi lần thành công dù nhỏ là một viên gạch mastery experience, tích luỹ trước khi cần dùng ở tình huống quan trọng."],
                  ["Định nghĩa lại 'thành công xã hội'", "Nhiều người thiếu tự tin xã hội vì đặt tiêu chuẩn sai: 'thành công' = người khác thích mình / cuộc trò chuyện phải suôn sẻ hoàn hảo. Định nghĩa thực tế hơn: thành công = mình đã HÀNH ĐỘNG theo đúng giá trị của mình (chủ động, chân thành, tôn trọng) — bất kể phản ứng của người kia, vì phản ứng của người khác không nằm trong tầm kiểm soát của mình."],
                  ["Tự tin không cần tính cách hướng ngoại", "Rào cản niềm tin phổ biến: 'người hướng nội không thể tự tin xã hội'. Sai — hướng nội/hướng ngoại là về nguồn năng lượng (một mình hay giữa đám đông phục hồi năng lượng), không phải về năng lực xã hội. Người hướng nội tự tin vẫn tương tác tốt, chỉ cần nhiều thời gian một mình để nạp lại hơn. Đừng nhầm sở thích với năng lực."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Expressing needs */}
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>3 · Tự tin nói ra nhu cầu và mong muốn</div>
              <div style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, lineHeight: 1.55, marginBottom: 10 }}>Rào cản đặc thù: niềm tin ngầm "nhu cầu của mình là gánh nặng cho người khác" hoặc "nói ra là ích kỷ" — thường học từ môi trường phải nhường nhịn hoặc đoán ý người khác thay vì được dạy nói thẳng.</div>
              <div style={{ display: "grid", gap: 9 }}>
                <Sec label="Gốc rễ nhận thức cần sửa trước">
                  Trước khi luyện KỸ THUẬT nói ra nhu cầu, cần sửa một niềm tin nền: nói ra nhu cầu không phải ích kỷ — <b>che giấu nhu cầu rồi âm thầm oán giận khi không được đáp ứng mới là điều gây hại cho quan hệ</b>. Người khác không đọc được suy nghĩ; im lặng không phải sự hy sinh cao thượng, nó tước đi của người kia cơ hội đáp ứng bạn.
                </Sec>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "13px 16px", background: CARD }}>
                  <div style={{ fontSize: 14.8, fontWeight: 600, marginBottom: 6 }}>Công thức DESC — nói nhu cầu không cần xin lỗi rối rít</div>
                  <div style={{ fontSize: 13.9, lineHeight: 1.65 }}>
                    <b>D</b>escribe — mô tả tình huống cụ thể, không phán xét. <b>E</b>xpress — nói cảm xúc/tác động bằng câu "tôi". <b>S</b>pecify — nêu rõ điều mình muốn (cụ thể, khả thi). <b>C</b>onsequence — nêu lợi ích nếu được đáp ứng (không phải đe doạ).
                  </div>
                  <div style={{ marginTop: 10, background: "#EEF3F1", borderRadius: 4, padding: "10px 13px", fontSize: 13.6, lineHeight: 1.6, fontStyle: "italic" }}>
                    "Tuần này em nhận ba việc gấp cùng lúc (D). Em thấy khó ưu tiên và lo sẽ trễ deadline (E). Em muốn mình cùng xếp lại thứ tự ưu tiên trong 15 phút (S) — như vậy em có thể đảm bảo chất lượng cho việc quan trọng nhất (C)."
                  </div>
                </div>
                {[
                  ["Bỏ 'lời đệm xin lỗi' trước yêu cầu", "'Xin lỗi làm phiền nhưng...', 'em biết là hơi quá đáng nhưng...' — những cụm mở đầu này ngầm khẳng định nhu cầu của mình là sai trái trước khi người nghe kịp phản ứng. Thay bằng câu vào thẳng: 'Mình cần...', 'Mình muốn đề nghị...'. Tôn trọng người nghe (giọng điệu lịch sự) không cần đi kèm hạ thấp giá trị yêu cầu của mình."],
                  ["Tách 'nói ra nhu cầu' khỏi 'được đáp ứng'", "Rào cản tâm lý lớn nhất là sợ nói ra mà bị từ chối. Tách hai việc: quyền được NÓI RA nhu cầu là của mình, luôn có; việc người kia có ĐÁP ỨNG hay không là của họ, không kiểm soát được. Thành công = đã nói rõ ràng, không phải = được đồng ý. Định nghĩa lại 'thành công' theo cách này giảm rất nhiều áp lực khi mở lời."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Talking about achievements */}
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>4 · Tự tin nói về thành tích của mình</div>
              <div style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, lineHeight: 1.55, marginBottom: 10 }}>Rào cản đặc thù: văn hoá Á Đông thường coi khiêm tốn là đức tính hàng đầu, khiến việc nói về thành tích bị gán nhãn "khoe khoang" — dẫn tới thành tích thật bị vô hình hoá, kể cả trong đánh giá công việc nơi im lặng đồng nghĩa bị bỏ qua.</div>
              <div style={{ display: "grid", gap: 9 }}>
                <Sec label="Phân biệt 'khoe' và 'báo cáo' — ranh giới nằm ở Ý ĐỊNH và KHUNG, không ở nội dung">
                  Cùng một sự thật ("tôi đã tăng doanh số 20%") có thể là khoe hay là báo cáo, tuỳ CÁCH đóng khung. Khoe: nói để CHỨNG MINH bản thân giỏi hơn người khác, thường không được hỏi, kèm so sánh ngầm. Báo cáo: nói để CUNG CẤP THÔNG TIN người nghe cần biết (để đánh giá đúng, để ra quyết định, để học hỏi), có bối cảnh và số liệu cụ thể, không so sánh hạ thấp người khác. Học cách đóng khung thành tích như báo cáo giải quyết được rào cản văn hoá về khiêm tốn — vì bạn không "khoe", bạn đang cung cấp thông tin cần thiết để được đánh giá công bằng.
                </Sec>
                {[
                  ["Công thức: Bối cảnh — Hành động — Kết quả đo được", "Khi cần nói về thành tích (đánh giá hiệu suất, phỏng vấn, cập nhật với sếp), dùng cấu trúc: bối cảnh khó khăn ban đầu → hành động cụ thể mình làm → kết quả đo được. 'Dự án X ban đầu trễ tiến độ 2 tuần (bối cảnh) → tôi tổ chức lại quy trình review hàng ngày (hành động) → chúng tôi bắt kịp tiến độ và giao trước hạn 3 ngày (kết quả)'. Cấu trúc này khiến việc nói về thành tích giống PHÂN TÍCH khách quan hơn là tự đánh giá chủ quan."],
                  ["Ghi lại thành tích NGAY khi xảy ra, không đợi lúc cần trình bày", "Não người có xu hướng quên nhanh các đóng góp nhỏ theo thời gian, đặc biệt nếu đã có thói quen 'không để ý' thành tích của mình. Giữ một file/ghi chú cập nhật liên tục ('nhật ký thành tích') — mỗi khi hoàn thành việc gì có kết quả rõ, ghi một dòng ngay. Khi cần trình bày (đánh giá cuối năm, phỏng vấn), bạn có sẵn dữ liệu thay vì phải nhớ lại và có xu hướng đánh giá thấp bản thân do thiên kiến hồi tưởng."],
                  ["Cho phép công nhận vai trò của người khác KHÔNG làm giảm phần đóng góp của mình", "Nỗi sợ phổ biến: nói về thành tích của mình sẽ phủ nhận công sức đội nhóm. Thực tế hai điều không loại trừ nhau — có thể vừa công nhận đóng góp của người khác VỪA nêu rõ phần việc cụ thể của mình ('Cả nhóm đã nỗ lực, và phần tôi phụ trách là X, đã giúp Y'). Đây không phải khiêm tốn giả tạo hay ích kỷ — là một mô tả chính xác, công bằng cho tất cả mọi người."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Boldness in team, not afraid of mistakes */}
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>5 · Mạnh dạn hơn trong team — không ngại sai sót</div>
              <div style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, lineHeight: 1.55, marginBottom: 10 }}>Rào cản đặc thù: sợ bị đánh giá trước NHIỀU người cùng lúc (không chỉ một người) khiến rủi ro cảm nhận nhân lên; và văn hoá tổ chức thứ bậc cao càng khuếch đại nỗi sợ phát biểu sai trước người có vị trí cao hơn.</div>
              <div style={{ display: "grid", gap: 9 }}>
                <Sec label="An toàn tâm lý (Amy Edmondson) — team quyết định nhiều, nhưng bạn tự tạo được một phần">
                  Nghiên cứu về các đội nhóm hiệu suất cao (Google's Project Aristotle) tìm thấy yếu tố dự báo mạnh nhất KHÔNG phải năng lực cá nhân mà là <b>an toàn tâm lý</b> — niềm tin rằng phát biểu, đặt câu hỏi, hoặc nhận lỗi sẽ không bị trừng phạt. Phần lớn an toàn tâm lý đến từ văn hoá team và người lãnh đạo — nhưng cá nhân cũng có thể tự tạo một phần: người ĐẦU TIÊN dám nói "tôi không chắc" hoặc đặt câu hỏi "ngu ngơ" thường mở khoá cho người khác làm theo, vì họ chứng minh rằng làm vậy an toàn.
                </Sec>
                {[
                  ["Tách 'phát biểu sai' khỏi 'là người kém'", "Trong một cuộc họp, một ý kiến sai không có nghĩa người nói kém năng lực — nó có nghĩa MỘT Ý KIẾN, trong nhiều ý kiến được cân nhắc, không phải phương án tối ưu. Người mạnh dạn hiểu: giá trị của việc phát biểu không nằm ở việc luôn đúng, mà ở việc đóng góp vào quá trình tư duy chung — kể cả ý kiến sai cũng giúp loại trừ một hướng đi và làm rõ vấn đề hơn."],
                  ["Dùng ngôn ngữ hạ mức rủi ro cảm nhận khi đề xuất ý tưởng chưa chắc chắn", "Thay vì im lặng vì sợ ý tưởng chưa hoàn thiện, dùng khung ngôn ngữ 'ý tưởng thô' để báo hiệu mức độ chắc chắn: 'Đây là một hướng em đang nghĩ, chưa chắc đúng, nhưng...' hoặc 'Em muốn nghĩ to một chút, mọi người phản biện giúp em'. Cách đóng khung này hạ kỳ vọng về sự hoàn hảo, giảm rủi ro cảm nhận khi phát biểu, và thường được đội nhóm đón nhận tốt vì thể hiện sự cởi mở."],
                  ["Chuẩn bị một 'lần thất bại kể được' — giảm nỗi sợ bằng cách khử thiêng nó", "Nỗi sợ sai sót thường phóng đại hậu quả tưởng tượng. Bài tập: nhớ lại một lần bạn (hoặc ai đó) từng sai trong công việc — hậu quả THẬT sự nghiêm trọng đến mức nào so với nỗi sợ ban đầu? Với hầu hết trường hợp không phải sai lầm nghiêm trọng về đạo đức/an toàn, hậu quả thực tế thường nhỏ hơn nhiều so với tưởng tượng, và có thể sửa được. Việc này không xoá nỗi sợ nhưng hiệu chỉnh lại mức độ của nó."],
                  ["Định vị mình là người ham học, không phải người phải hoàn hảo", "Growth mindset (Dweck) áp dụng trực tiếp: nếu tự nhận diện mình đang 'học và thử', sai sót là dữ liệu bình thường của quá trình học. Nếu tự nhận diện mình 'phải chứng minh mình giỏi', mỗi sai sót thành mối đe doạ bản sắc. Trước một tình huống rủi ro sai trong team, tự nhắc: 'mình đang ở đây để học và đóng góp, không phải để diễn hoàn hảo'."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Accepting shortcomings */}
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>6 · Tự tin chấp nhận sự thiếu sót của mình</div>
              <div style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, lineHeight: 1.55, marginBottom: 10 }}>Đây là mặt còn lại của tự tin, ít được nói tới nhưng quan trọng ngang phần "dám hành động": khả năng thừa nhận giới hạn, điểm yếu, sai sót MÀ KHÔNG sụp đổ giá trị bản thân. Nghịch lý: người chấp nhận được thiếu sót của mình thường TỰ TIN hơn người cố che giấu chúng.</div>
              <div style={{ display: "grid", gap: 9 }}>
                <Sec label="Vì sao chấp nhận thiếu sót lại LÀ một biểu hiện của tự tin, không phải đối lập với nó">
                  Trực giác sai phổ biến: tự tin = không có điểm yếu, hoặc không để lộ điểm yếu. Thực tế ngược lại — khả năng nói "tôi chưa giỏi việc này" hoặc "tôi đã sai" mà không hoảng loạn CHỈ có thể xảy ra khi giá trị bản thân không phụ thuộc vào việc luôn hoàn hảo. Che giấu thiếu sót bằng mọi giá là dấu hiệu của tự tin trình diễn (brittle) — vì nó ngầm thừa nhận rằng một thiếu sót bị lộ ra sẽ phá huỷ toàn bộ giá trị con người mình.
                </Sec>
                {[
                  ["Tách 'tôi có điểm yếu này' khỏi 'tôi là người kém cỏi'", "Đây là ứng dụng trực tiếp của việc tách hành vi/kỹ năng khỏi bản sắc (Dweck, Beck). Viết cụ thể: thay vì 'tôi dở giao tiếp' (nhãn cố định, toàn bộ con người), nói 'tôi chưa tự tin khi phải ứng biến trong tình huống bất ngờ' (kỹ năng cụ thể, có thể cải thiện). Cách diễn đạt thứ hai vừa chính xác hơn vừa mở đường cho việc luyện tập."],
                  ["Chủ động nói ra điểm yếu ĐÚNG LÚC, thay vì để bị phát hiện", "Trong công việc, chủ động nói trước về giới hạn của mình ('mảng này em chưa có kinh nghiệm, em sẽ cần hỗ trợ/thời gian học') khi bắt đầu một việc mới thường được đánh giá là CHUYÊN NGHIỆP và đáng tin cậy hơn — vì nó cho thấy khả năng tự đánh giá chính xác (self-awareness), một dạng năng lực bậc cao. Ngược lại, giả vờ biết rồi bị lộ ra giữa chừng gây mất uy tín nhiều hơn."],
                  ["Phân biệt CHẤP NHẬN thiếu sót với TỰ MÃN dừng phát triển", "Ranh giới quan trọng: chấp nhận thiếu sót nghĩa là không để nó phá huỷ giá trị bản thân trong khi VẪN chủ động cải thiện nếu muốn — không phải dùng 'chấp nhận bản thân' như cái cớ để ngừng cố gắng. Câu hỏi kiểm tra: 'mình chấp nhận thiếu sót này vì đã bình an với nó và có kế hoạch (hoặc đã quyết định không cần cải thiện), hay mình đang né tránh nhìn thẳng vào nó?' Hai trạng thái trông giống nhau ở bên ngoài nhưng khác nhau hoàn toàn ở động cơ."],
                  ["Thực hành: viết 'bản đồ thiếu sót' không phán xét", "Liệt kê 3-5 điểm yếu/thiếu sót thật của mình, với giọng điệu MÔ TẢ như một nhà quan sát khách quan (không phải lời buộc tội của nhà phê bình nội tâm). Với mỗi điểm, ghi thêm: đây là điều mình MUỐN cải thiện, hay điều mình CHỌN chấp nhận vì không đáng để dồn năng lượng vào? Bài tập này tách rạch ròi phán xét đạo đức khỏi việc lập kế hoạch thực tế."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, lineHeight: 1.6, fontStyle: "italic", borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              Sáu bối cảnh trên đều quy về cùng một cơ chế lõi ở đầu tab: bằng chứng hành động tích luỹ (mastery), diễn giải đúng tín hiệu cơ thể, và tách bản sắc khỏi kết quả cụ thể. Khác biệt chỉ là RÀO CẢN NIỀM TIN đặc thù của từng bối cảnh — nhận đúng rào cản của mình trước khi áp phương pháp sẽ hiệu quả hơn nhiều so với công thức chung chung.
            </div>

            
</div>
        )}

        {sub === "c-expert" && (
          <div style={{ display: "grid", gap: 18 }}>
<div style={{ background: "#1F2E2A", color: "#E8F1ED", borderRadius: 6, padding: "18px 22px", marginTop: 4 }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#8FCBB8", fontWeight: 700, marginBottom: 9 }}>Tầng chuyên gia — vượt khỏi Bandura</div>
              <div style={{ fontSize: 14.4, lineHeight: 1.7 }}>
                Lý thuyết self-efficacy là nền chuẩn nhưng chưa đủ ở cấp chuyên gia — nó không giải thích được vì sao "xây bằng chứng" đôi khi KHÔNG hiệu quả, không phân biệt được tự tin thật với ảo tưởng tự tin, và không nói gì về vai trò của môi trường/xã hội. Sáu phần dưới đây bổ khuyết đúng những khoảng trống đó.
              </div>
            </div>

            <Sec label="Threat vs. Challenge — sinh lý học chính xác của tự tin dưới áp lực (Blascovich)" color="#2D6A62">
              Mô hình biopsychosocial của Blascovich đo được HAI kiểu phản ứng tim mạch khi đối mặt thử thách, phân biệt rõ hơn nhiều so với "hồi hộp = hào hứng" đơn giản. <b>Trạng thái Đe doạ (threat)</b>: mạch máu ngoại vi co lại (tăng kháng trở mạch máu), tim phải bơm mạnh hơn để đẩy máu — cơ thể chuẩn bị để "chịu đòn". <b>Trạng thái Thách thức (challenge)</b>: mạch máu giãn ra, tim bơm nhiều máu hơn mỗi nhịp (tăng cung lượng tim), cơ thể chuẩn bị để "hành động hiệu quả". Hai trạng thái này KHÔNG chỉ khác về cảm giác chủ quan — chúng là hai chương trình sinh lý khác nhau, và trạng thái Thách thức đo được liên quan tới hiệu suất tốt hơn rõ rệt trong các nhiệm vụ đòi hỏi nhận thức và vận động.
              <div style={{ marginTop: 10, background: "#EEF3F1", borderRadius: 4, padding: "11px 14px", fontSize: 13.6, lineHeight: 1.62 }}>
                <b>Yếu tố quyết định bạn rơi vào trạng thái nào:</b> tỉ lệ giữa NGUỒN LỰC cảm nhận (kỹ năng, kinh nghiệm, sự chuẩn bị, hỗ trợ xã hội) và YÊU CẦU cảm nhận (độ khó, mức rủi ro, áp lực thời gian) của tình huống. Nguồn lực ≥ yêu cầu → Thách thức. Yêu cầu &gt; nguồn lực → Đe doạ. Đây là lý do "xây bằng chứng" (mastery) hoạt động ở TẦNG SINH LÝ chứ không chỉ tầng nhận thức: mỗi mastery experience thực sự làm tăng nguồn lực cảm nhận, dịch chuyển tỉ lệ này theo hướng Thách thức một cách khách quan, không chỉ "nghĩ tích cực".
              </div>
            </Sec>

            <Sec label="Self-Verification Theory (William Swann) — vì sao 'xây bằng chứng' đôi khi thất bại" color="#5B4C74">
              Đây là biến chứng quan trọng nhất mà lý thuyết self-efficacy bỏ sót. Swann chỉ ra: con người có động lực sâu xa muốn được NGƯỜI KHÁC XÁC NHẬN ĐÚNG hình ảnh bản thân hiện có của mình — <b>kể cả khi hình ảnh đó tiêu cực</b> — vì sự xác nhận tạo cảm giác thế giới có thể dự đoán được và mạch lạc. Hệ quả gây sốc trong nhiều thí nghiệm: người có self-view thấp đôi khi vô thức tìm kiếm hoặc tin tưởng hơn vào phản hồi TIÊU CỰC, và cảm thấy KHÓ CHỊU (không phải vui) trước lời khen không khớp với hình ảnh họ tin về bản thân — vì lời khen tạo ra sự bất hoà nhận thức.
              <div style={{ marginTop: 10, background: "#F1ECF6", borderRadius: 4, padding: "11px 14px", fontSize: 13.6, lineHeight: 1.62 }}>
                <b>Hàm ý thực hành then chốt:</b> nếu ai đó (kể cả chính bạn) có self-view tiêu cực ăn sâu, việc dội bằng chứng tích cực dồn dập một cách đột ngột thường bị GẠT BỎ hoặc gây khó chịu ngầm, không được tiếp nhận. Chiến lược hiệu quả hơn: xây bằng chứng CHẬM, TĂNG DẦN theo bậc nhỏ (đúng như thang mastery đã nêu — không phải ngẫu nhiên mà kỹ thuật này hiệu quả), để mỗi bước chỉ lệch nhẹ so với self-view hiện có, không tạo cú sốc bất hoà nhận thức khiến não từ chối tiếp nhận.
              </div>
            </Sec>

            <Sec label="Đe doạ định kiến (Stereotype Threat — Claude Steele) — khi môi trường phá tự tin độc lập với năng lực thật" color="#8A5A3A">
              Steele và cộng sự chứng minh: khi một người biết mình thuộc một nhóm bị gán định kiến tiêu cực về năng lực trong một lĩnh vực cụ thể (ví dụ định kiến giới về toán học, định kiến tuổi tác về công nghệ), CHỈ VIỆC được nhắc nhở ngầm về nhóm đó trước một bài kiểm tra đã đủ làm giảm hiệu suất thật — thông qua cơ chế lo âu chiếm dụng tài nguyên nhận thức (working memory) đáng lẽ dùng cho nhiệm vụ. Đây là bằng chứng mạnh cho thấy tự tin và hiệu suất không chỉ là "vấn đề cá nhân" — MÔI TRƯỜNG có thể phá huỷ tự tin của người hoàn toàn đủ năng lực, độc lập với self-efficacy họ đã xây được.
              <div style={{ marginTop: 10, fontFamily: SANS, fontSize: 12.6, color: MUTE, lineHeight: 1.58, fontStyle: "italic" }}>
                Trung thực về bằng chứng: một số nghiên cứu nhân rộng gần đây cho hiệu ứng nhỏ hơn nghiên cứu gốc, và độ lớn hiệu ứng gây tranh cãi trong giới nghiên cứu. Cơ chế (lo âu chiếm working memory dưới nhận diện định kiến) vẫn được ủng hộ rộng rãi; điều cần thận trọng là mức độ ảnh hưởng thực tế trong đời sống hằng ngày, không nên coi đây là lời giải thích cho MỌI khoảng cách hiệu suất.
              </div>
              <div style={{ marginTop: 10, background: "#FBF6EE", borderRadius: 4, padding: "11px 14px", fontSize: 13.6, lineHeight: 1.62 }}>
                <b>Cách tự bảo vệ:</b> nhận diện khi lo âu về "đại diện cho cả nhóm" đang chiếm sự tập trung khỏi nhiệm vụ thật; tự nhắc "đây là MỘT nhiệm vụ cụ thể, không phải bài kiểm tra về giá trị của cả nhóm mình thuộc về"; tìm hình mẫu (vicarious experience) là người giống mình đã thành công trong chính lĩnh vực đó — đây là công cụ hiệu quả nhất được nghiên cứu xác nhận để giảm đe doạ định kiến.
              </div>
            </Sec>

            <Sec label="Core Self-Evaluations (Judge & Bono) — cấu trúc bậc cao gộp bốn niềm tin nền" color={ACCENT}>
              Nghiên cứu tổ chức học tìm ra một cấu trúc bậc cao gọi là <b>core self-evaluations</b> — sự kết hợp của bốn niềm tin nền: self-esteem (giá trị bản thân), self-efficacy tổng quát (tin mình có năng lực nói chung), locus of control nội tại (tin kết quả đời mình do hành động của mình quyết định, không phải may rủi), và ổn định cảm xúc (ít lo âu/trầm cảm nền). Bốn niềm tin này tương quan chặt với nhau và cùng dự báo sự hài lòng công việc/cuộc sống mạnh hơn bất kỳ niềm tin đơn lẻ nào — gợi ý rằng can thiệp hiệu quả nhất không nhắm vào MỘT niềm tin riêng lẻ mà xây đồng thời cả bốn, vì chúng củng cố lẫn nhau.
            </Sec>

            <Sec label="Self-Determination Theory (Deci & Ryan) — vì sao khen thưởng đôi khi phá huỷ tự tin nội tại" color="#3E5C76">
              Lý thuyết Tự quyết định xác định NĂNG LỰC (competence) là một trong ba nhu cầu tâm lý cơ bản của con người (cùng với TỰ CHỦ — autonomy, và LIÊN KẾT — relatedness). Điểm tinh vi quan trọng: cảm giác năng lực chỉ nuôi dưỡng động lực và tự tin BỀN VỮNG khi nó đi kèm cảm giác TỰ CHỦ — tức là thành công đến từ lựa chọn và nỗ lực của chính mình, không phải để lấy phần thưởng ngoài hoặc làm hài lòng người khác. Bằng chứng về "hiệu ứng lấn át" (overjustification effect): khi một hoạt động vốn có động lực nội tại (làm vì thấy có năng lực và thích thú) bị gắn với phần thưởng ngoài quá mức (tiền, điểm số, lời khen công khai liên tục), động lực nội tại có thể GIẢM sau khi phần thưởng ngừng — vì não diễn giải lại hành vi là "làm vì phần thưởng" thay vì "làm vì mình giỏi và thích".
              <div style={{ marginTop: 10, background: "#EEF2F6", borderRadius: 4, padding: "11px 14px", fontSize: 13.6, lineHeight: 1.62 }}>
                <b>Hàm ý cho nhật ký bằng chứng và tự khen:</b> khi ghi nhận thành tích của mình, gắn nó với cảm giác TỰ CHỦ ("mình chọn làm việc này theo cách này, và nó hiệu quả") thay vì chỉ với kết quả ngoài ("mình được khen/được thưởng") — điều này xây self-efficacy bền vững hơn, không phụ thuộc vào việc luôn có người công nhận.
              </div>
            </Sec>

            <div style={{ border: `2px solid ${ACCENT}`, borderRadius: 6, padding: "18px 20px", background: "#F7FAF8" }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 9 }}>Khái niệm tích hợp: Tự tin khiêm tốn (Confident Humility)</div>
              <div style={{ fontSize: 14.6, lineHeight: 1.7 }}>
                Adam Grant và nghiên cứu về intellectual humility hội tụ vào một phát hiện phản trực giác: những người ra quyết định TỐT NHẤT dưới sự không chắc chắn không phải người tự tin nhất cũng không phải người khiêm tốn nhất — mà là người giữ được <b>cả hai đồng thời ở hai đối tượng khác nhau</b>: tự tin cao vào NĂNG LỰC HỌC HỎI VÀ THÍCH ỨNG của mình ("tôi tin mình sẽ tìm ra cách xử lý"), kết hợp với khiêm tốn cao về TRI THỨC HIỆN TẠI ("quan điểm tôi đang có lúc này có thể sai, tôi cần dữ liệu để kiểm chứng"). Đây là cách giải quyết triệt để nghịch lý giữa "phải tự tin" và "phải khiêm tốn" tưởng như mâu thuẫn xuyên suốt tài liệu này — chúng không mâu thuẫn khi được áp vào hai đối tượng khác nhau.
              </div>
              <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.62 }}>
                Người tự tin khiêm tốn: cập nhật quan điểm nhanh khi có bằng chứng mới (không coi đổi ý là thất bại); ra quyết định dứt khoát dù chưa có đủ thông tin hoàn hảo (không tê liệt vì cầu toàn); nói "tôi không biết, để tôi tìm hiểu" mà không thấy đe doạ; và tách rạch ròi "tôi tin mình sẽ ổn" khỏi "tôi tin mình luôn đúng" — đây là ranh giới chính xác nhất phân biệt tự tin trưởng thành với ảo tưởng tự tin (overconfidence).
              </div>
            </div>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>Hai kỹ thuật lâm sàng nâng cao</div>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "14px 17px", background: CARD }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Thang phơi nhiễm có đo lường (SUDS) — nâng cấp từ "thang mastery"</div>
                  <div style={{ fontSize: 14, lineHeight: 1.65 }}>
                    Kỹ thuật gốc từ trị liệu phơi nhiễm (exposure therapy) chính xác hơn thang mastery đơn giản đã nêu. Trước khi bắt đầu, chấm điểm mỗi tình huống trên thang <b>SUDS (Subjective Units of Distress) từ 0-100</b> — 0 là hoàn toàn thoải mái, 100 là hoảng loạn tột độ. Xây danh sách 8-10 tình huống trải đều từ SUDS ~20 đến ~90. Với mỗi tình huống, ở lại trong đó (không né tránh, không rời sớm) cho tới khi mức đau khổ chủ quan TỰ GIẢM ít nhất 50% — đây gọi là "quen dần" (habituation), một hiện tượng thần kinh có thật, không phải chỉ là "cố chịu đựng". Chỉ chuyển sang tình huống SUDS cao hơn khi tình huống hiện tại đã quen (SUDS giảm rõ khi lặp lại). Khác biệt cốt lõi so với thang mastery đơn giản: đo lường CHỦ QUAN được định lượng, và tiêu chí chuyển bậc là mức quen thực đo, không phải cảm giác mơ hồ "thấy ổn hơn".
                  </div>
                </div>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "14px 17px", background: CARD }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Thought Record (CBT) — giải cấu trúc catastrophizing về tự tin</div>
                  <div style={{ fontSize: 14, lineHeight: 1.65 }}>
                    Khi một suy nghĩ thảm hoạ hoá xuất hiện trước tình huống cần tự tin ("nếu mình nói sai, cả team sẽ nghĩ mình kém năng lực mãi mãi"), viết ra 5 cột: (1) <b>Tình huống</b> cụ thể; (2) <b>Suy nghĩ tự động</b> nguyên văn; (3) <b>Bằng chứng ỦNG HỘ</b> suy nghĩ đó là đúng; (4) <b>Bằng chứng CHỐNG LẠI</b> nó (thường dài hơn cột 3 nhiều — não thảm hoạ hoá luôn bỏ qua bằng chứng ngược); (5) <b>Suy nghĩ cân bằng hơn</b> dựa trên cả hai cột bằng chứng. Kỹ thuật này không nhằm "nghĩ tích cực" ép buộc — nó buộc não xử lý đầy đủ dữ liệu thay vì chỉ chạy theo nhánh thảm hoạ hoá tự động, vốn là lỗi nhận thức phổ biến nhất đứng sau nỗi sợ mất tự tin.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, lineHeight: 1.6, fontStyle: "italic", borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              Đường dây xuyên suốt tầng chuyên gia: tự tin không vận hành trong chân không cá nhân — nó là giao điểm của SINH LÝ (threat/challenge), NHẬN THỨC (self-verification, thought patterns), và MÔI TRƯỜNG (stereotype threat, tự chủ vs kiểm soát ngoài). Can thiệp chỉ ở một tầng (ví dụ chỉ "nghĩ tích cực" mà bỏ qua sinh lý và môi trường) thường thất bại hoặc không bền — đây là lý do nhiều nỗ lực "xây tự tin" hời hợt không hiệu quả dù đúng hướng lý thuyết cơ bản.
            </div>

            
</div>
        )}


        {primary === "situations" && (
          <div style={{ display: "grid", gap: 18 }}>

            <div style={{ background: "#20302D", color: "#E8F0ED", borderRadius: 6, padding: "18px 20px" }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#7FC9BC", fontWeight: 700, marginBottom: 7 }}>
                Kịch bản tình huống — người tự tin làm gì, nói gì
              </div>
              <div style={{ fontSize: 14.5, lineHeight: 1.68 }}>
                Tự tin không phải cảm giác trước khi hành động — nó là CÁCH hành động. Mỗi tình huống có ba lớp: tư duy &amp; hành động của người vững, các bước cụ thể, và câu thoại mẫu. Bốn nhóm: Công việc, Lãnh đạo, Xung đột, và Xã hội &amp; cá nhân. Đây là mẫu để luyện phản xạ — điều chỉnh theo giọng của bạn, chân thành quan trọng hơn câu chữ hoàn hảo.
              </div>
            </div>
            {/* Operating principles — advanced framing */}
            <div style={{ border: "1px solid " + LINE, borderRadius: 6, padding: "16px 20px", background: CARD }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>
                Nguyên tắc vận hành — kỹ năng nền sinh ra mọi câu thoại
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.8, color: "#57605A", margin: "0 0 12px", lineHeight: 1.6 }}>
                Các câu thoại bên dưới chỉ là bề mặt. Điều thật sự tạo ra sự điềm tĩnh là năm nguyên tắc nền này — nắm chúng thì tự sinh ra câu đúng cho tình huống bất kỳ, kể cả tình huống không có trong danh sách.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["Điều hoà TRƯỚC, phản hồi SAU", "Khi bị kích hoạt (đe doạ, chỉ trích, bất công), vỏ não trước — nơi ra quyết định khôn ngoan — bị 'offline', hệ đe doạ chiếm quyền. Không thể phản hồi sáng suốt từ trạng thái này. Người vững tạo một khoảng dừng để hệ thần kinh trở về cửa sổ chịu đựng TRƯỚC khi mở miệng. Đây là kỹ năng gốc; mọi thứ khác đứng trên nó."],
                  ["Tách giá trị bản thân khỏi kết quả tình huống", "Bí quyết thật của sự điềm tĩnh: giá trị con người bạn KHÔNG nằm trong việc thắng cuộc trao đổi này, được duyệt ý tưởng này, hay được người kia hài lòng. Khi giá trị không bị đặt cược, bạn phản hồi tự do và rõ ràng thay vì phòng thủ để cứu cái tôi."],
                  ["Tách quan sát khỏi đánh giá (NVC)", "Mô tả hành vi/sự kiện cụ thể, không dán nhãn con người — của họ lẫn của mình. 'Báo cáo trễ hai ngày' (quan sát) thay vì 'anh vô trách nhiệm' (đánh giá). Điều này hạ hệ đe doạ của cả hai bên và giữ cuộc trao đổi ở chỗ giải quyết được."],
                  ["Phản hồi từ hệ an toàn, không từ hệ đe doạ", "Có ba chế độ: hung hăng (từ hệ đe doạ — phản pháo), phục tùng (sụp — chịu đựng), và quyết đoán (từ hệ an toàn — vững mà tôn trọng). Chỉ chế độ thứ ba đến từ giá trị bản thân thật. Giọng bình thản không phải kìm nén cơn giận — nó là dấu hiệu của cảm giác an toàn nội tại."],
                  ["Phân biệt 'nội dung' và 'quy trình'", "Đôi khi vấn đề không phải điều đang bàn (nội dung) mà là CÁCH đang bàn (quy trình — lớn tiếng, cắt lời, thiếu tôn trọng). Người vững biết đặt ranh giới về quy trình TRƯỚC khi giải quyết nội dung: 'Em sẵn sàng bàn việc này, và mình sẽ hiệu quả hơn nếu giữ cách nói chuyện tôn trọng.'"],
                ].map((r, i) => (
                  <div key={i} style={{ borderLeft: "2px solid " + ACCENT, paddingLeft: 13 }}>
                    <div style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: ACCENT, marginBottom: 3 }}>{i + 1} · {r[0]}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.62 }}>{r[1]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-the-moment regulation protocol — advanced */}
            <div style={{ background: "#20302D", color: "#E8F0ED", borderRadius: 6, padding: "18px 20px" }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#7FC9BC", fontWeight: 700, marginBottom: 8 }}>
                Giao thức điều hoà trong khoảnh khắc (khi bị kích hoạt ngay lúc đó)
              </div>
              <div style={{ fontSize: 14.2, lineHeight: 1.7 }}>
                Khi một tình huống khó ập đến và bạn cảm thấy 'nóng lên', chạy giao thức 4 bước này trước khi phản hồi:
                <div style={{ marginTop: 10, display: "grid", gap: 7 }}>
                  <div><b style={{ color: "#7FC9BC" }}>1 · Nhận biết</b> — bắt tín hiệu cơ thể (tim đập, nóng mặt, nghẹn cổ, muốn phản pháo hoặc muốn biến mất). Đó là hệ đe doạ vừa bật, không phải sự thật về giá trị của bạn.</div>
                  <div><b style={{ color: "#7FC9BC" }}>2 · Tạo khoảng dừng</b> — một hơi thở ra dài, chậm. Nếu cần, câu giờ hợp lệ: "Để em suy nghĩ một chút" / "Cho mình một giây." Khoảng dừng ba giây là đủ để vỏ não trước quay lại.</div>
                  <div><b style={{ color: "#7FC9BC" }}>3 · Neo</b> — cảm nhận chân chạm đất, và một câu neo thầm: "Cách họ cư xử nói về họ, không định nghĩa mình" hoặc "Giá trị của mình không nằm trong khoảnh khắc này."</div>
                  <div><b style={{ color: "#7FC9BC" }}>4 · Chọn chế độ quyết đoán</b> — phản hồi vào vấn đề, HOẶC đặt ranh giới về quy trình, HOẶC xin tạm dừng. Từ hệ an toàn, không từ hệ đe doạ.</div>
                </div>
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #3A4A45", fontSize: 13.6, lineHeight: 1.62 }}>
                  Và sau đó: <b>phục hồi</b>, không tự dằn vặt. Xử lý một tình huống khó chưa hoàn hảo không hạ giá trị của bạn — nó là dữ liệu để lần sau vững hơn. Tự trách sau va chạm chỉ kéo bạn lại vào hệ đe doạ.
                </div>
              </div>
            </div>

            
</div>
        )}

        {sub === "s-work" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>
                A · Công việc — người tự tin làm gì, nói gì
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.8, color: "#57605A", margin: "0 0 12px", lineHeight: 1.6 }}>
                Tự tin không phải cảm giác trước khi hành động — nó là CÁCH hành động. Đây là kịch bản cụ thể: người có giá trị bản thân vững sẽ tư duy, hành xử và nói năng thế nào trong từng tình huống.
              </p>
              <div style={{ display: "grid", gap: 11 }}>
                {[
                  {
                    sit: "Được giao một dự án mới, muốn tạo ấn tượng mạnh với sếp và team",
                    mind: "Không cố tỏ ra biết tuốt. Người tự tin biết ấn tượng đến từ sự CHỦ ĐỘNG và RÕ RÀNG, không phải từ việc giả vờ giỏi. Ưu tiên hiểu bối cảnh trước, cam kết sau. Đặt câu hỏi thông minh là dấu hiệu của năng lực, không phải yếu kém.",
                    plan: [
                      "Tuần đầu — HIỂU trước khi làm: gặp riêng sếp hỏi rõ 'Với dự án này, thành công trông như thế nào? Điều gì quan trọng nhất với anh/chị?' Xác định tiêu chí thành công và các bên liên quan (stakeholders) chính.",
                      "Lập bản đồ: ai nắm thông tin gì, rủi ro lớn nhất ở đâu, deadline thật là gì. Chủ động vẽ ra bức tranh thay vì chờ được giao từng việc.",
                      "Đưa ra một 'kế hoạch tiếp cận' ngắn gửi sếp trong vài ngày đầu — thể hiện tư duy có cấu trúc, ngay cả khi chưa có kết quả.",
                      "Giao tiếp chủ động: cập nhật tiến độ đều đặn, nêu rủi ro sớm thay vì giấu đến khi muộn. Sếp tin người báo tin xấu sớm hơn người luôn 'mọi thứ ổn'.",
                      "Kết thúc từng chặng bằng việc hỏi phản hồi: 'Có điều gì em/anh nên làm khác đi không?' — cầu thị là dấu hiệu của người vững, không phải người yếu.",
                    ],
                    say: [
                      "“Trước khi triển khai, em muốn thống nhất với anh/chị về định nghĩa thành công của dự án và các ràng buộc chính — để em ưu tiên đúng ngay từ đầu.”",
                      "“Em sẽ gửi anh/chị một bản khung tiếp cận cùng các mốc chính trong 48 giờ tới, để mình căn chỉnh kỳ vọng trước khi đi vào chi tiết.”",
                      "“Em đã nhận diện một rủi ro sớm ở khâu X và phác hai phương án xử lý — em muốn trao đổi để chọn hướng phù hợp trước khi nó phát sinh.”",
                    ],
                  },
                  {
                    sit: "Bị hỏi một câu trong cuộc họp mà mình không biết câu trả lời",
                    mind: "Người thiếu tự tin bịa hoặc ấp úng xin lỗi rối rít. Người tự tin thừa nhận thẳng thắn và chuyển thành hành động — vì họ biết 'không biết một việc' không đe doạ giá trị con người họ. Thừa nhận không biết một cách bình thản thực ra làm TĂNG uy tín.",
                    plan: [
                      "Thừa nhận gọn, không tự hạ thấp, không xin lỗi thái quá.",
                      "Chuyển ngay sang cam kết hành động cụ thể, có thời hạn.",
                      "Nếu biết một phần, nói phần mình biết trước rồi khoanh vùng phần chưa chắc.",
                    ],
                    say: [
                      "“Em chưa có số liệu chắc chắn cho câu này nên em sẽ không phỏng đoán. Em xác nhận và gửi lại anh/chị trước cuối ngày.”",
                      "“Phần em nắm chắc là A và B; riêng phần C em cần kiểm tra lại nguồn dữ liệu trước khi khẳng định.”",
                    ],
                  },
                  {
                    sit: "Bị phê bình, nhất là trước mặt người khác",
                    mind: "Tách CON NGƯỜI khỏi HÀNH VI bị chê. Họ chê một việc, không phủ nhận toàn bộ giá trị của bạn (Dweck). Người tự tin không phòng thủ cũng không sụp đổ — họ tiếp nhận, tìm phần đúng, và giữ được sự điềm tĩnh vì giá trị bản thân họ không nằm trong lời phê bình đó.",
                    plan: [
                      "Hít thở, không phản pháo ngay. Tìm 5% đúng trước khi cân nhắc 95% còn lại.",
                      "Tiếp nhận công khai một cách điềm tĩnh; nếu cần trao đổi sâu/riêng tư thì hẹn nói riêng.",
                      "Không tự dằn vặt sau đó — chuyển lời phê bình thành một điều chỉnh cụ thể.",
                    ],
                    say: [
                      "“Cảm ơn góp ý — đây là điểm hợp lý. Em sẽ điều chỉnh ở phần cụ thể và cập nhật lại kết quả.”",
                      "(Nếu cần đào sâu) “Em muốn nắm rõ kỳ vọng để làm đúng hơn — mình trao đổi chi tiết ngay sau buổi này nhé.”",
                      "(Nếu chưa chính xác) “Em ghi nhận góc nhìn của anh/chị. Ở điểm này em có dữ liệu hơi khác, để em chia sẻ riêng cho rõ ràng.”",
                    ],
                  },
                  {
                    sit: "Ý tưởng của mình bị bác bỏ trong cuộc họp",
                    mind: "Giá trị bản thân không dính vào việc ý tưởng được chấp nhận hay không. Người tự tin có thể bảo vệ ý tưởng bằng lập luận mà không thấy bị tấn công cá nhân, và cũng biết buông khi lập luận phía kia mạnh hơn — 'disagree and commit'.",
                    plan: [
                      "Hỏi để hiểu lý do bị bác, thay vì phòng thủ.",
                      "Bảo vệ bằng dữ liệu/lập luận một lần, rõ ràng, không cảm tính.",
                      "Nếu vẫn không được chọn, cam kết theo quyết định chung một cách chuyên nghiệp — điều này ghi điểm về sự trưởng thành.",
                    ],
                    say: [
                      "“Em muốn hiểu tiêu chí nào khiến phương án kia được ưu tiên — có thể em đang thiếu một dữ kiện quan trọng.”",
                      "“Em vẫn thấy hướng của em có lợi thế ở X, nhưng nếu quyết định là phương án kia thì em ủng hộ hoàn toàn và triển khai hết mình.”",
                    ],
                  },
                  {
                    sit: "Bất đồng với sếp / cấp trên",
                    mind: "Tôn trọng không có nghĩa là im lặng. Người tự tin nêu quan điểm khác một cách tôn trọng, tập trung vào vấn đề chứ không vào 'ai đúng', và tách việc bất đồng khỏi nỗi sợ bị đánh giá. Họ biết một bất đồng được trình bày tốt làm tăng uy tín, không giảm.",
                    plan: [
                      "Chọn đúng lúc, đúng nơi (thường là riêng tư).",
                      "Đóng khung là cùng mục tiêu, khác con đường — không phải chống đối.",
                      "Trình bày bằng dữ liệu và rủi ro, rồi để quyết định cho sếp; đã nói thì tôn trọng kết quả.",
                    ],
                    say: [
                      "“Em chia sẻ hoàn toàn mục tiêu này. Em có một góc nhìn khác về cách đạt được nó mà em nghĩ đáng cân nhắc — anh/chị cho em vài phút nhé.”",
                      "“Mối lo của em nằm ở rủi ro X; em đề xuất Y. Dù vậy, quyết định cuối cùng thuộc về anh/chị và em sẽ theo sát để nó chạy tốt.”",
                    ],
                  },
                  {
                    sit: "Được khen / được ghi nhận công lao",
                    mind: "Người thiếu tự tin gạt phăng ('ồ không có gì đâu') vì thấy mình không xứng — vô tình phủ nhận cả thiện chí người khen. Người tự tin đón nhận lời khen một cách nhẹ nhàng và thật lòng, vì họ cho phép mình xứng đáng.",
                    plan: [
                      "Nhận lời khen bằng một câu cảm ơn chân thành, không gạt đi, không khoe thêm.",
                      "Có thể chia sẻ công lao nếu là việc chung — nhưng không phủ nhận phần đóng góp của mình.",
                    ],
                    say: [
                      "“Cảm ơn anh/chị — em rất vui khi nỗ lực đó tạo ra khác biệt.”",
                      "(Việc chung) “Cảm ơn ạ. Kết quả này có phần đóng góp lớn của [tên] ở khâu X; và em cũng tự hào về phần mình phụ trách.”",
                    ],
                  },
                  {
                    sit: "Mắc một lỗi đáng kể trong công việc",
                    mind: "Giá trị bản thân vững cho phép nhận lỗi mà không sụp đổ. 'Tôi mắc một lỗi' (hành vi) ≠ 'Tôi là kẻ vô dụng' (con người). Người tự tin nhận trách nhiệm nhanh, tập trung vào khắc phục thay vì tự dằn vặt hay đổ lỗi.",
                    plan: [
                      "Báo sớm, không giấu — người trưởng thành báo lỗi trước khi nó lớn hơn.",
                      "Nhận trách nhiệm rõ ràng, không viện cớ, không đổ lỗi.",
                      "Đưa ngay phương án khắc phục + cách ngăn tái diễn. Đây là phần biến khủng hoảng thành cơ hội ghi điểm.",
                    ],
                    say: [
                      "“Em cần báo anh/chị một sai sót em vừa phát hiện: [nêu gọn, đúng sự thật]. Đây là tác động, đây là hướng khắc phục em đang triển khai, và đây là điều chỉnh để nó không tái diễn.”",
                      "(Tránh) đổ lỗi hoàn cảnh hay xin lỗi kéo dài — điều làm sếp yên tâm là bạn đang kiểm soát tình huống, không phải sự áy náy của bạn.",
                    ],
                  },
                  {
                    sit: "Bị đồng nghiệp nói lấn / cướp lời trong họp",
                    mind: "Người tự tin giữ được chỗ đứng của mình một cách điềm tĩnh, không hung hăng cũng không rút lui. Họ tin lời mình đáng được nghe hết.",
                    plan: [
                      "Đòi lại lượt nói một cách bình thản, không xin lỗi vì đã nói.",
                      "Nếu bị cướp công, làm rõ đóng góp của mình một cách sự thật, không cay cú.",
                    ],
                    say: [
                      "“Cho mình hoàn thành ý này đã, mình gần xong rồi.”",
                      "“Bổ sung cho điểm mình nêu lúc nãy về X…” — nhẹ nhàng gắn lại quyền sở hữu ý tưởng mà không cần đối đầu.",
                    ],
                  },
                  {
                    sit: "Đề nghị tăng lương / thăng tiến",
                    mind: "Người tự tin tin mình xứng đáng được trả công đúng giá trị, và tách việc 'đòi hỏi' khỏi nỗi sợ bị đánh giá là tham lam. Họ đến với dữ liệu, không với lời xin lỗi.",
                    plan: [
                      "Chuẩn bị bằng chứng: đóng góp cụ thể, kết quả đo được, so sánh thị trường.",
                      "Đóng khung quanh giá trị đã tạo ra, không quanh nhu cầu cá nhân.",
                      "Nói con số rõ ràng, rồi im lặng chờ — không lấp đầy khoảng lặng bằng sự rút lui.",
                    ],
                    say: [
                      "“Trong [khoảng thời gian] qua em đã đảm nhận [phạm vi mở rộng] và tạo ra [kết quả đo được]. Trên cơ sở đó và mặt bằng thị trường, em đề xuất điều chỉnh mức lương lên [con số].”",
                      "(Sau khi nêu con số) giữ im lặng và để đối phương phản hồi — đừng tự làm nhẹ đề xuất của mình bằng một câu rút lui.",
                    ],
                  },
                  {
                    sit: "Phải thuyết trình / nói trước đám đông",
                    mind: "Người tự tin không cố xoá cảm giác hồi hộp — họ diễn giải nó là năng lượng chứ không phải mối đe doạ (Bandura). Họ tập trung vào GIÁ TRỊ mình mang cho khán giả thay vì lo mình bị đánh giá. Chuyển tiêu điểm từ 'mình trông thế nào' sang 'người nghe nhận được gì'.",
                    plan: [
                      "Chuẩn bị kỹ phần mở đầu và 3 ý chính — không cần thuộc lòng từng chữ.",
                      "Đến sớm, làm quen không gian, thở sâu để hạ nhịp tim trước khi bắt đầu.",
                      "Nếu vấp, dừng một nhịp rồi tiếp — im lặng ngắn tạo cảm giác điềm tĩnh, không phải lỗi.",
                    ],
                    say: [
                      "(Mở đầu) “Hôm nay em tập trung vào ba điểm quyết định đến [kết quả kinh doanh], và dành phần cuối cho câu hỏi.”",
                      "(Khi vấp) “Để em làm rõ ý này hơn…” — điềm tĩnh đi tiếp, không xin lỗi hay tự đính chính rối rít.",
                    ],
                  },
                  {
                    sit: "Được giao việc vượt quá năng lực hiện tại",
                    mind: "Người có growth mindset xem đây là cơ hội mở rộng, không phải cái bẫy. Họ trung thực về khoảng cách năng lực NHƯNG không tự loại mình — họ hỏi về hỗ trợ và thời gian học, thay vì hoặc giả vờ giỏi hoặc từ chối vì sợ.",
                    plan: [
                      "Nhận việc với sự trung thực về điều mình cần để làm tốt.",
                      "Xác định mình cần học/hỗ trợ gì, hỏi thẳng.",
                      "Chia nhỏ để có 'thắng lợi sớm' xây đà tự tin.",
                    ],
                    say: [
                      "“Đây là một thử thách mới và em sẵn sàng nhận. Để đảm bảo chất lượng, em cần [nguồn lực/thời gian/cố vấn cụ thể] — mình sắp xếp được chứ ạ?”",
                      "“Em sẽ chia nhỏ và bàn giao một kết quả sớm để mình kiểm chứng hướng đi trước khi đầu tư sâu hơn.”",
                    ],
                  },
                  {
                    sit: "Onboarding — ngày đầu ở công ty/vị trí mới",
                    mind: "Người tự tin biết giai đoạn đầu là để HỌC và XÂY QUAN HỆ, không phải để chứng minh ngay. Họ đặt câu hỏi nhiều, ghi chép, và không giả vờ đã hiểu hết. Sự cầu thị chân thành tạo thiện cảm nhanh hơn việc tỏ ra thông minh.",
                    plan: [
                      "Chủ động giới thiệu bản thân với các thành viên chủ chốt, hỏi về vai trò của họ.",
                      "Hỏi về 'luật bất thành văn' và kỳ vọng, không chỉ quy trình chính thức.",
                      "Ghi lại và lặp lại tên người, ưu tiên hiểu bức tranh lớn trong 2 tuần đầu.",
                    ],
                    say: [
                      "“Trong 30 ngày đầu, nếu em ưu tiên đúng một việc thì việc nào tạo giá trị lớn nhất cho team?”",
                      "“Ngoài quy trình chính thức, có ‘luật bất thành văn’ nào em nên nắm sớm để phối hợp hiệu quả không?”",
                    ],
                  },
                  {
                    sit: "Xin phản hồi (feedback) về hiệu suất của mình",
                    mind: "Người vững chủ động tìm phản hồi vì họ coi đó là dữ liệu để phát triển, không phải bản án. Họ hỏi cụ thể, và tiếp nhận cả điều khó nghe mà không phòng thủ — chính điều này khiến người khác sẵn lòng nói thật.",
                    plan: [
                      "Hỏi cụ thể thay vì chung chung ('em làm ổn không' → 'em có thể cải thiện gì ở phần X').",
                      "Cảm ơn phản hồi kể cả khi khó nghe, không biện minh ngay tại chỗ.",
                      "Chọn 1-2 điểm để hành động, quay lại báo tiến bộ sau.",
                    ],
                    say: [
                      "“Em đang muốn nâng năng lực ở [kỹ năng cụ thể]. Nếu chọn một điều để em cải thiện có tác động nhất, anh/chị nghĩ là gì?”",
                      "“Cảm ơn phản hồi thẳng thắn — em sẽ hành động ở điểm cụ thể và cập nhật lại tiến bộ sau vài tuần.”",
                    ],
                  },
                  {
                    sit: "Dẫn dắt một cuộc họp / điều phối nhóm",
                    mind: "Người tự tin điều phối không cần là người thông minh nhất phòng — họ tạo không gian cho người khác đóng góp, giữ cuộc họp đi đúng hướng, và ra quyết định rõ ràng. Quyền lực đến từ sự rõ ràng và điềm tĩnh, không phải áp đảo.",
                    plan: [
                      "Mở đầu bằng mục tiêu rõ: 'Cuối buổi mình cần quyết được gì.'",
                      "Chủ động mời người ít nói phát biểu; kiểm soát người nói lấn một cách nhã nhặn.",
                      "Kết thúc bằng tóm tắt quyết định + ai làm gì + hạn nào.",
                    ],
                    say: [
                      "(Mở) “Mục tiêu buổi này là chốt được [quyết định cụ thể] trong [thời lượng]. Em đề xuất mình đi qua ba mục sau.”",
                      "(Chốt) “Tóm lại: quyết định là X, [tên] phụ trách, hoàn thành trước [ngày]. Có ai thấy cần điều chỉnh không?”",
                      "(Mời người im lặng) “[Tên], mình muốn nghe góc nhìn của bạn về điểm này.”",
                    ],
                  },
                  {
                    sit: "Phản hồi/góp ý cho người khác (nhất là cấp dưới hoặc đồng nghiệp)",
                    mind: "Người vững góp ý thẳng thắn mà vẫn tôn trọng, vì họ tách hành vi khỏi con người và thật sự muốn người kia tốt lên. Họ không né tránh vì sợ mất lòng, cũng không dùng góp ý để hạ người khác.",
                    plan: [
                      "Góp ý riêng, kịp thời, cụ thể về hành vi — không phán xét tính cách.",
                      "Nêu tác động, rồi cùng tìm hướng cải thiện.",
                      "Cân bằng: ghi nhận điểm tốt thật lòng, không chỉ nói điều tiêu cực.",
                    ],
                    say: [
                      "“Mình có một góp ý để phần việc của bạn mạnh hơn. Ở [tình huống cụ thể], mình quan sát thấy [tác động]. Nếu điều chỉnh theo hướng [đề xuất], mình nghĩ kết quả sẽ tốt hơn — bạn thấy sao?”",
                    ],
                  },
                  {
                    sit: "Bị giao quá nhiều việc (quá tải)",
                    mind: "Người có ranh giới lành mạnh không im lặng gánh hết rồi kiệt sức. Họ minh bạch về năng lực và đề nghị ưu tiên — điều này thể hiện tư duy quản lý, không phải sự lười hay yếu.",
                    plan: [
                      "Không gật đầu tất cả rồi âm thầm vỡ trận.",
                      "Đưa ra bức tranh khối lượng hiện tại và đề nghị sếp cùng ưu tiên.",
                      "Đề xuất giải pháp (dời hạn, thêm người, cắt phạm vi), không chỉ than.",
                    ],
                    say: [
                      "“Danh mục hiện tại của em gồm A, B, C với các mốc này. Để tiếp nhận D mà vẫn giữ chất lượng, em cần mình cùng xác định lại thứ tự ưu tiên, hoặc điều chỉnh mốc của một hạng mục.”",
                    ],
                  },
                  {
                    sit: "Đồng nghiệp/khách hàng nói năng thiếu tôn trọng, lớn tiếng",
                    mind: "Người có giá trị bản thân vững không đáp trả bằng sự hung hăng, cũng không co rúm chịu đựng. Họ giữ điềm tĩnh, đặt ranh giới về cách được đối xử, và không để hành vi của người khác định nghĩa giá trị mình.",
                    plan: [
                      "Giữ giọng bình thản, không leo thang.",
                      "Đặt ranh giới về cách giao tiếp, không về nội dung công việc.",
                      "Nếu cần, tạm dừng và quay lại khi không khí ổn hơn.",
                    ],
                    say: [
                      "“Em thực sự muốn giải quyết việc này cùng anh/chị, và mình sẽ hiệu quả hơn khi trao đổi trên tinh thần tôn trọng. Mình cùng hạ nhiệt một chút rồi tiếp tục nhé.”",
                      "“Em luôn sẵn sàng lắng nghe về công việc; điều em mong là cách trao đổi giữ được sự tôn trọng hai chiều.”",
                    ],
                  },
                  {
                    sit: "Trình bày với khách hàng/cấp cao hơn nhiều bậc",
                    mind: "Người tự tin nhớ rằng mình được mời vào phòng vì mình có giá trị để đóng góp. Họ nói ngắn gọn, đi thẳng vào điều quan trọng với người nghe, và không để sự chênh lệch cấp bậc làm mình lu mờ hay lắp bắp.",
                    plan: [
                      "Bắt đầu bằng kết luận/khuyến nghị, rồi mới đến chi tiết (người bận muốn nghe điểm chính trước).",
                      "Gắn nội dung với điều họ quan tâm (rủi ro, chi phí, kết quả kinh doanh).",
                      "Tự tin nói 'em sẽ xác nhận lại' nếu chưa chắc, thay vì đoán bừa.",
                    ],
                    say: [
                      "(Mở, top-down) “Khuyến nghị của em là X. Ba lý do chính, và tác động đến [rủi ro/chi phí/kết quả] như sau…”",
                      "(Khi bị hỏi khó) “Đây là câu hỏi quan trọng — em muốn trả lời chính xác nên sẽ xác nhận số liệu và gửi lại trong hôm nay.”",
                    ],
                  },
                ].map((s, i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "11px 15px", background: "#E8F0ED" }}>
                      <div style={{ fontFamily: SANS, fontSize: 13.8, fontWeight: 700, color: ACCENT, lineHeight: 1.4 }}>{s.sit}</div>
                    </div>
                    <div style={{ padding: "12px 15px" }}>
                      <div style={{ fontSize: 13.9, lineHeight: 1.62, marginBottom: 10 }}>
                        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>TƯ DUY &amp; HÀNH ĐỘNG · </span>
                        {s.mind}
                      </div>
                      <ul style={{ margin: "0 0 10px", paddingLeft: 18, fontSize: 13.7, lineHeight: 1.6 }}>
                        {s.plan.map((p, j) => <li key={j} style={{ marginBottom: 4 }}>{p}</li>)}
                      </ul>
                      <div style={{ background: "#EEF3F1", borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 4px 4px 0", padding: "9px 13px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em", marginBottom: 5 }}>NÓI THẾ NÀY</div>
                        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13.7, lineHeight: 1.62 }}>
                          {s.say.map((q, j) => <li key={j} style={{ marginBottom: 4 }}>{q}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
</div>
        )}

        {sub === "s-lead" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>
                B · Lãnh đạo &amp; quản lý
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.8, color: "#57605A", margin: "0 0 12px", lineHeight: 1.6 }}>
                Khi bước lên vai trò dẫn dắt, giá trị bản thân vững cho phép bạn trao quyền, nhận trách nhiệm và ra quyết định mà không cần chứng minh mình là người giỏi nhất phòng.
              </p>
              <div style={{ display: "grid", gap: 11 }}>
                {[
                  {
                    sit: "Lần đầu quản lý những người từng là đồng nghiệp ngang hàng",
                    mind: "Người lãnh đạo vững không giả vờ mình đột nhiên 'trên cơ', cũng không xin lỗi vì được thăng chức. Họ thừa nhận sự thay đổi một cách cởi mở, tôn trọng quá khứ chung, và định hình vai trò mới quanh việc phục vụ team, không phải quyền lực.",
                    plan: [
                      "Nói chuyện thẳng thắn về sự chuyển đổi thay vì giả vờ không có gì thay đổi.",
                      "Giữ sự tôn trọng cũ, nhưng rõ ràng về kỳ vọng mới.",
                      "Chứng minh giá trị bằng việc gỡ rào cản cho team, không bằng việc ra oai.",
                    ],
                    say: [
                      "“Vai trò của mình thay đổi, nhưng sự tôn trọng và tin cậy giữa chúng ta thì không. Mục tiêu của mình là giúp cả nhóm làm tốt hơn — và mình rất cần sự thẳng thắn từ các bạn.”",
                      "(Trong 1:1) “Mình muốn nghe: điều gì đang chạy tốt, và mình có thể hỗ trợ hoặc gỡ vướng gì cho bạn?”",
                    ],
                  },
                  {
                    sit: "Phải giao việc (delegate) thay vì ôm hết tự làm",
                    mind: "Người thiếu tự tin ôm việc vì sợ người khác làm không tốt bằng, hoặc sợ mất giá trị nếu không tự tay làm. Người lãnh đạo vững hiểu giá trị của mình nằm ở việc phát triển người khác và nhân rộng năng lực, không ở việc tự làm mọi thứ.",
                    plan: [
                      "Giao cả trách nhiệm lẫn quyền quyết định, không chỉ giao việc vặt.",
                      "Nói rõ kết quả mong đợi, rồi để họ tự chọn cách làm.",
                      "Chấp nhận họ làm khác cách mình — miễn đạt kết quả.",
                    ],
                    say: [
                      "“Mình tin bạn xử lý được việc này. Kết quả mình cần là X trước [mốc]; cách làm mình để bạn chủ động. Có điểm nào cần mình hỗ trợ hoặc ra quyết định, cứ trao đổi sớm.”",
                    ],
                  },
                  {
                    sit: "Nhận trách nhiệm khi team mắc lỗi (thay vì đổ cho cấp dưới)",
                    mind: "Người lãnh đạo vững đứng ra chắn cho team trước cấp trên và bên ngoài, rồi giải quyết vấn đề nội bộ một cách xây dựng. Giá trị bản thân đủ mạnh để nhận trách nhiệm mà không thấy bị đe doạ — đây chính là điều tạo ra lòng trung thành của team.",
                    plan: [
                      "Trước bên ngoài: nhận trách nhiệm với tư cách người dẫn dắt.",
                      "Nội bộ: xử lý vấn đề riêng, tập trung học hỏi thay vì trừng phạt.",
                      "Không bao giờ hạ uy tín thành viên trước mặt người khác.",
                    ],
                    say: [
                      "(Với cấp trên) “Đây là trách nhiệm của em với tư cách người phụ trách. Em đã nắm nguyên nhân gốc, và đây là kế hoạch khắc phục cùng biện pháp phòng ngừa.”",
                      "(Với team, riêng) “Mình cùng rút kinh nghiệm để lần sau chắc hơn — trọng tâm là cải thiện hệ thống, không phải quy lỗi cá nhân.”",
                    ],
                  },
                  {
                    sit: "Xử lý một thành viên có hiệu suất kém",
                    mind: "Người lãnh đạo vững không né tránh cuộc trò chuyện khó vì sợ mất lòng, cũng không tấn công con người họ. Họ thẳng thắn về vấn đề, tò mò về nguyên nhân, và tập trung vào con đường cải thiện cụ thể.",
                    plan: [
                      "Nói riêng, sớm, dựa trên dữ liệu cụ thể chứ không cảm tính.",
                      "Hỏi để hiểu nguyên nhân (năng lực? động lực? hoàn cảnh?).",
                      "Thống nhất kỳ vọng rõ ràng và mốc kiểm tra tiến bộ.",
                    ],
                    say: [
                      "“Mình muốn trao đổi thẳng thắn vì mình đầu tư vào sự phát triển của bạn. Ở [khía cạnh cụ thể], kết quả chưa đạt kỳ vọng [dẫn chứng]. Mình muốn hiểu điều gì đang cản trở, và cùng thống nhất một kế hoạch cải thiện với mốc rõ ràng.”",
                    ],
                  },
                  {
                    sit: "Truyền đạt tin không vui cho team (thay đổi, cắt giảm, hoãn)",
                    mind: "Người lãnh đạo vững không né tránh hay bọc đường sự thật, cũng không lạnh lùng. Họ nói thẳng, thừa nhận tác động cảm xúc, và ở lại để trả lời câu hỏi thay vì thông báo rồi biến mất.",
                    plan: [
                      "Nói thẳng và sớm, không để tin đồn dẫn trước.",
                      "Thừa nhận tác động lên mọi người, không giả vờ 'mọi thứ ổn'.",
                      "Ở lại lắng nghe, minh bạch về điều mình biết và chưa biết.",
                    ],
                    say: [
                      "“Mình có một thông tin khó và mình muốn chia sẻ trực tiếp, minh bạch: [tin]. Mình hiểu điều này ảnh hưởng đến mọi người. Đây là những gì mình biết, những gì chưa chắc chắn, và mình ở đây để trả lời mọi câu hỏi.”",
                    ],
                  },
                  {
                    sit: "Nói 'tôi không biết' với tư cách người lãnh đạo",
                    mind: "Lãnh đạo vững không đánh đồng uy quyền với sự toàn tri. Thừa nhận điều mình chưa biết một cách bình thản thực ra xây dựng lòng tin — team tin người trung thực hơn người luôn phải tỏ ra biết hết.",
                    plan: [
                      "Thừa nhận thẳng, rồi cam kết tìm hiểu hoặc mời người có chuyên môn.",
                      "Biến nó thành cơ hội trao quyền: hỏi ý kiến team.",
                    ],
                    say: [
                      "“Mình chưa có câu trả lời cho việc này và mình sẽ không phỏng đoán. Mình sẽ tìm hiểu — và mình cũng muốn nghe cách các bạn nhìn nhận.”",
                    ],
                  },
                  {
                    sit: "Ghi nhận &amp; khen ngợi team đúng cách",
                    mind: "Người lãnh đạo vững không sợ ánh sáng chiếu vào người khác sẽ làm lu mờ mình. Họ ghi nhận công lao cụ thể, công khai, và không giành công của team về mình.",
                    plan: [
                      "Khen cụ thể (việc gì, tác động ra sao), không chung chung.",
                      "Ghi nhận công khai, góp ý riêng tư.",
                      "Chuyển công lao lên cấp trên cho đúng người đã làm.",
                    ],
                    say: [
                      "“Kết quả này có được nhờ [tên] đã [đóng góp cụ thể] — mình muốn cả team và [cấp trên] biết rõ điều đó.”",
                    ],
                  },
                  {
                    sit: "Trao quyền quyết định cho team thay vì kiểm soát mọi thứ (micromanage)",
                    mind: "Nhu cầu kiểm soát mọi chi tiết thường bắt nguồn từ lo âu, không phải tiêu chuẩn cao. Người lãnh đạo vững tin tưởng và trao quyền, chấp nhận rủi ro có kiểm soát — đây là cách team trưởng thành và chính mình cũng nhẹ gánh.",
                    plan: [
                      "Xác định việc nào cần mình duyệt, việc nào team tự quyết.",
                      "Trao quyền trong một khung rõ ràng, rồi lùi lại.",
                      "Chấp nhận sai sót nhỏ là chi phí của việc phát triển người khác.",
                    ],
                    say: [
                      "“Việc này thuộc quyền quyết định của bạn — mình tin bạn. Chỉ cần báo mình khi chạm đến [ngưỡng/ranh giới cụ thể], còn lại bạn cứ chủ động.”",
                    ],
                  },
                ].map((s, i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "11px 15px", background: "#E4EDEA" }}>
                      <div style={{ fontFamily: SANS, fontSize: 13.8, fontWeight: 700, color: ACCENT, lineHeight: 1.4 }}>{s.sit}</div>
                    </div>
                    <div style={{ padding: "12px 15px" }}>
                      <div style={{ fontSize: 13.9, lineHeight: 1.62, marginBottom: 10 }}>
                        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>TƯ DUY &amp; HÀNH ĐỘNG · </span>
                        {s.mind}
                      </div>
                      <ul style={{ margin: "0 0 10px", paddingLeft: 18, fontSize: 13.7, lineHeight: 1.6 }}>
                        {s.plan.map((p, j) => <li key={j} style={{ marginBottom: 4 }}>{p}</li>)}
                      </ul>
                      <div style={{ background: "#EEF3F1", borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 4px 4px 0", padding: "9px 13px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em", marginBottom: 5 }}>NÓI THẾ NÀY</div>
                        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13.7, lineHeight: 1.62 }}>
                          {s.say.map((q, j) => <li key={j} style={{ marginBottom: 4 }}>{q}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
</div>
        )}

        {sub === "s-conflict" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: "#8A5A3A", fontWeight: 700, marginBottom: 4 }}>
                C · Xung đột &amp; tình huống khó
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.8, color: "#57605A", margin: "0 0 12px", lineHeight: 1.6 }}>
                Đây là nơi giá trị bản thân bị thử thách mạnh nhất. Người vững giữ được sự điềm tĩnh và lòng tự trọng ngay cả khi bị khiêu khích, đổ lỗi, hay áp lực dồn nén.
              </p>
              <div style={{ display: "grid", gap: 11 }}>
                {[
                  {
                    sit: "Dự án đang trễ hạn / khủng hoảng, phải báo cáo cấp trên",
                    mind: "Người vững không giấu tin xấu vì sợ bị đánh giá, cũng không hoảng loạn. Họ báo sớm, trung thực về tình hình, và đến kèm giải pháp — biến khủng hoảng thành cơ hội thể hiện bản lĩnh.",
                    plan: [
                      "Báo sớm, không chờ đến phút chót.",
                      "Trình bày: tình hình thật + nguyên nhân + phương án + điều cần hỗ trợ.",
                      "Giữ giọng bình tĩnh, tập trung giải pháp thay vì đổ lỗi.",
                    ],
                    say: [
                      "“Em cần báo anh/chị một rủi ro tiến độ và em muốn nêu sớm. Hiện trạng là X, nguyên nhân gốc là Y. Em đã chuẩn bị hai phương án với đánh đổi rõ ràng, và điều em cần từ anh/chị là [quyết định/nguồn lực Z].”",
                    ],
                  },
                  {
                    sit: "Khách hàng giận dữ / phàn nàn gay gắt",
                    mind: "Người vững không nhận cơn giận của khách vào giá trị con người mình, cũng không phòng thủ. Họ lắng nghe để hiểu, thừa nhận cảm xúc của khách, rồi chuyển sang giải quyết — sự điềm tĩnh của họ thường tự nó hạ nhiệt tình huống.",
                    plan: [
                      "Để khách nói hết, lắng nghe thật, không cắt lời hay biện minh sớm.",
                      "Thừa nhận cảm xúc và tác động trước khi nói về giải pháp.",
                      "Chuyển sang bước tiếp theo cụ thể, có cam kết rõ.",
                    ],
                    say: [
                      "“Em hiểu vì sao điều này khiến anh/chị không hài lòng, và em xin lỗi về trải nghiệm đó. Để em nắm chính xác vấn đề: [tóm tắt lại]. Đây là bước em xử lý ngay, và đây là mốc em cam kết phản hồi.”",
                      "(Tránh) phòng thủ ‘đó không phải lỗi bên em’ khi khách đang nóng — xử lý cảm xúc trước, phân định trách nhiệm sau.",
                    ],
                  },
                  {
                    sit: "Hai bên liên quan (stakeholder) bất đồng, mình kẹt ở giữa",
                    mind: "Người vững không né bằng cách làm hài lòng cả hai một cách mơ hồ. Họ đóng vai người điều phối trung lập, quy chiếu về mục tiêu chung và dữ liệu, và dám đưa ra khuyến nghị rõ ràng.",
                    plan: [
                      "Làm rõ lợi ích và mối lo thật sự của mỗi bên.",
                      "Quy chiếu về mục tiêu/tiêu chí chung để có căn cứ chung.",
                      "Đề xuất hướng đi dựa trên dữ liệu, không chọn phe theo cảm tính.",
                    ],
                    say: [
                      "“Cả hai phía đều hướng tới [mục tiêu chung]. Khác biệt nằm ở X và Y. Dựa trên [tiêu chí/dữ liệu đã thống nhất], em khuyến nghị hướng Z, vì nó tối ưu [đánh đổi cụ thể].”",
                      "“Em đề xuất mình quyết trên một tiêu chí chung, để tránh biến việc này thành chuyện thắng–thua giữa hai bên.”",
                    ],
                  },
                  {
                    sit: "Bị đổ lỗi oan cho việc không phải trách nhiệm của mình",
                    mind: "Người có giá trị bản thân vững không im lặng chịu oan vì sợ xung đột, cũng không nổi nóng phòng thủ. Họ làm rõ sự thật một cách bình tĩnh, dựa trên bằng chứng, tập trung vào giải quyết vấn đề chứ không vào việc 'ai có tội'.",
                    plan: [
                      "Giữ bình tĩnh, không để bị cuốn vào công kích cá nhân.",
                      "Làm rõ sự thật bằng dữ liệu/bằng chứng, không cảm tính.",
                      "Chuyển hướng về giải pháp; nếu cần, trao đổi riêng để không làm to chuyện.",
                    ],
                    say: [
                      "“Em nghĩ điều quan trọng lúc này là làm rõ chuyện gì đã thực sự xảy ra. Theo ghi nhận và dữ liệu em có: [sự thật]. Em đề xuất mình tập trung vào hướng khắc phục thay vì quy trách nhiệm.”",
                      "(Nếu cần) “Em muốn trao đổi riêng để làm rõ điểm này, tránh làm loãng cuộc họp.”",
                    ],
                  },
                  {
                    sit: "Bất đồng gay gắt leo thang trong cuộc họp",
                    mind: "Người vững nhận ra khi cảm xúc đã lấn át và chủ động hạ nhiệt thay vì thắng bằng mọi giá. Họ đủ tự tin để đề nghị tạm dừng — điều này thể hiện sự trưởng thành, không phải yếu thế.",
                    plan: [
                      "Nhận diện khi tranh luận thành công kích và chủ động ngắt vòng xoáy.",
                      "Đề nghị quay về dữ liệu/mục tiêu, hoặc tạm dừng để hạ nhiệt.",
                      "Không ghi điểm cá nhân bằng cách hạ bệ người khác.",
                    ],
                    say: [
                      "“Em thấy cuộc trao đổi đang căng lên. Em đề xuất mình tạm dừng điểm này, cùng rà lại dữ liệu, rồi quay lại với cái nhìn bình tĩnh hơn.”",
                      "“Mình đang cùng một mục tiêu — quay về tiêu chí chung sẽ giúp mình quyết nhanh và bớt cảm tính hơn.”",
                    ],
                  },
                  {
                    sit: "Phải từ chối một yêu cầu vô lý của khách hàng/sếp",
                    mind: "Người vững từ chối được điều bất khả thi mà vẫn giữ quan hệ, vì họ tách 'nói không với yêu cầu' khỏi 'làm người khó chịu'. Họ nói không kèm lý do và phương án thay thế, không kèm sự sợ hãi.",
                    plan: [
                      "Thừa nhận nhu cầu phía sau yêu cầu.",
                      "Nói rõ vì sao không khả thi (thời gian, nguồn lực, rủi ro).",
                      "Đưa phương án thay thế thay vì chỉ từ chối.",
                    ],
                    say: [
                      "“Em hiểu điều anh/chị cần đạt được. Với nguồn lực và thời gian hiện có, làm đúng như vậy sẽ ảnh hưởng đến [chất lượng/cam kết khác]. Thay vào đó, em đề xuất [phương án khả thi] để vẫn đạt mục tiêu.”",
                    ],
                  },
                  {
                    sit: "Đối mặt với người liên tục phòng thủ, không chịu nhận sai",
                    mind: "Người vững không cố 'thắng' để chứng minh mình đúng. Họ hạ thấp mối đe doạ để người kia bớt phòng thủ, tập trung vào vấn đề và tương lai thay vì phán xét quá khứ.",
                    plan: [
                      "Giảm tính công kích: nói về vấn đề, không về con người.",
                      "Tìm điểm đồng thuận trước, rồi mới đến điểm khác biệt.",
                      "Tập trung vào 'lần sau làm thế nào' thay vì 'lần này ai sai'.",
                    ],
                    say: [
                      "“Mình không tìm ai để quy lỗi — mục tiêu của mình là lần tới cả hai làm tốt hơn. Mình thử cùng nhìn vào cách cải thiện quy trình nhé?”",
                    ],
                  },
                  {
                    sit: "Giữ bình tĩnh khi bị khiêu khích / công kích cá nhân",
                    mind: "Đây là bài kiểm tra cao nhất của giá trị bản thân: khi ai đó cố chọc giận hay hạ thấp bạn, giá trị nội tại đủ vững để bạn không cần phản ứng theo. Bạn phản hồi từ sự điềm tĩnh, không từ sự tổn thương.",
                    plan: [
                      "Tạo một khoảng dừng (hít thở) trước khi phản hồi — không phản ứng bốc đồng.",
                      "Không nhận lời công kích vào giá trị con người mình.",
                      "Phản hồi vào vấn đề, hoặc đặt ranh giới bình tĩnh; rút lui nếu cần.",
                    ],
                    say: [
                      "“Em sẵn sàng trao đổi về vấn đề, và em mong mình giữ được cách nói chuyện tôn trọng nhau.”",
                      "(Với chính mình) “Cách họ cư xử phản ánh trạng thái của họ, không định nghĩa giá trị của mình.”",
                    ],
                  },
                ].map((s, i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "11px 15px", background: "#F0E9E4" }}>
                      <div style={{ fontFamily: SANS, fontSize: 13.8, fontWeight: 700, color: "#8A5A3A", lineHeight: 1.4 }}>{s.sit}</div>
                    </div>
                    <div style={{ padding: "12px 15px" }}>
                      <div style={{ fontSize: 13.9, lineHeight: 1.62, marginBottom: 10 }}>
                        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: "#8A5A3A", letterSpacing: "0.04em" }}>TƯ DUY &amp; HÀNH ĐỘNG · </span>
                        {s.mind}
                      </div>
                      <ul style={{ margin: "0 0 10px", paddingLeft: 18, fontSize: 13.7, lineHeight: 1.6 }}>
                        {s.plan.map((p, j) => <li key={j} style={{ marginBottom: 4 }}>{p}</li>)}
                      </ul>
                      <div style={{ background: "#EEF3F1", borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 4px 4px 0", padding: "9px 13px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em", marginBottom: 5 }}>NÓI THẾ NÀY</div>
                        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13.7, lineHeight: 1.62 }}>
                          {s.say.map((q, j) => <li key={j} style={{ marginBottom: 4 }}>{q}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
</div>
        )}

        {sub === "s-social" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                D · Xã hội &amp; cá nhân
              </div>
              <div style={{ display: "grid", gap: 11 }}>
                {[
                  {
                    sit: "Phải nói KHÔNG với một yêu cầu (mà không thấy tội lỗi)",
                    mind: "Người có giá trị bản thân vững biết thời gian và năng lượng của mình có giá trị, và nói không không làm mình thành người xấu. Họ từ chối rõ ràng mà vẫn ấm áp, không cần một tràng biện minh.",
                    say: [
                      "\"Cảm ơn đã nghĩ đến mình, nhưng lần này mình không tham gia được.\" (không cần giải thích dài).",
                      "\"Mình rất muốn giúp nhưng hiện đang quá tải, nên mình phải từ chối để làm tốt những việc đã nhận.\"",
                      "(Tránh) một tràng xin lỗi và lý do — 'không' rõ ràng, tử tế là đủ.",
                    ],
                  },
                  {
                    sit: "Bị từ chối (tình cảm, cơ hội, lời mời)",
                    mind: "Người tự tin không diễn giải một lời từ chối thành phán xét về toàn bộ giá trị con người mình. Một 'không' là về sự phù hợp của tình huống, không phải bằng chứng mình 'không đủ'. Họ cho phép mình buồn mà không sụp đổ.",
                    say: [
                      "(Với người khác) \"Cảm ơn đã thẳng thắn với mình, mình trân trọng điều đó.\"",
                      "(Với chính mình) \"Việc này không thành không có nghĩa mình không đủ. Nó chỉ là không phù hợp lần này.\"",
                    ],
                  },
                  {
                    sit: "Bị đem ra so sánh với người khác (\"sao không giỏi như...\")",
                    mind: "Người vững nhớ rằng mình đang so hậu trường của mình với highlight của người khác, và giá trị của mình không cần ai kém hơn để chứng minh. Họ không để lời so sánh định nghĩa mình.",
                    say: [
                      "(Với chính mình) \"Hành trình của mình khác. Mình đo mình bằng tiến bộ của chính mình, không bằng người khác.\"",
                      "(Đáp lại người so sánh, nhẹ nhàng) \"Mỗi người một thế mạnh khác nhau. Đây là điều em đang tập trung phát triển.\"",
                    ],
                  },
                  {
                    sit: "Bước vào một phòng đầy người lạ (sự kiện, networking)",
                    mind: "Người tự tin không cần phải là người nổi bật nhất phòng. Họ tập trung vào việc TÒ MÒ về người khác thay vì lo mình bị đánh giá — chuyển tiêu điểm từ 'mình trông thế nào' sang 'mình học được gì từ họ' làm lo âu giảm mạnh.",
                    say: [
                      "\"Chào, mình chưa gặp bạn — bạn liên quan thế nào đến sự kiện này?\" (câu mở đơn giản, chân thành).",
                      "\"Điều gì đưa bạn đến đây?\" / \"Bạn đang làm về mảng gì?\" — hỏi và lắng nghe thật là kỹ năng xã hội mạnh nhất.",
                    ],
                  },
                  {
                    sit: "Nhận lời khen về ngoại hình hoặc con người mình",
                    mind: "Cho phép mình đón nhận thay vì gạt đi. Gạt lời khen ('đâu có, mình xấu lắm') là một dạng tự phủ nhận đã thành thói quen.",
                    say: [
                      "\"Cảm ơn bạn, mình vui khi nghe vậy!\" (đơn giản, đủ).",
                      "(Tránh) \"Ôi không đâu...\" hay ngay lập tức khen lại vì lúng túng.",
                    ],
                  },
                  {
                    sit: "Đặt ranh giới với người thân/bạn bè lấn ranh giới của mình",
                    mind: "Fierce self-compassion: tử tế với mình đôi khi là bảo vệ mình. Ranh giới nói về điều MÌNH sẽ làm, không phải mệnh lệnh cho người kia, và không cần một cuộc chiến để thiết lập.",
                    say: [
                      "\"Mình yêu quý bạn, và mình cũng cần bạn tôn trọng việc mình không thoải mái với chuyện này.\"",
                      "\"Mình sẽ không tham gia vào chủ đề đó. Mình mong bạn hiểu cho.\"",
                    ],
                  },
                  {
                    sit: "Bị chỉ trích/phán xét về lựa chọn sống của mình (công việc, tình yêu, lối sống)",
                    mind: "Người có giá trị bản thân vững không cần cả thế giới đồng ý với lựa chọn của mình. Họ lắng nghe có chọn lọc, giữ vững điều mình tin, và không để sự phán xét của người khác lung lay quyết định thuộc về đời mình.",
                    say: [
                      "\"Em hiểu anh/chị lo cho em, cảm ơn ạ. Đây là lựa chọn em đã suy nghĩ kỹ và em thấy phù hợp với mình.\"",
                      "(Với chính mình) \"Đây là đời mình. Mình được phép chọn dù người khác chưa hiểu.\"",
                    ],
                  },
                  {
                    sit: "Mắc lỗi/làm phiền ai đó và cần xin lỗi",
                    mind: "Người vững xin lỗi được mà không tự sỉ nhục. Một lời xin lỗi tốt nhận trách nhiệm rõ ràng rồi dừng lại — không kéo theo một tràng tự dằn vặt khiến người kia phải quay ra an ủi mình.",
                    say: [
                      "\"Mình xin lỗi vì [việc cụ thể]. Mình hiểu điều đó ảnh hưởng đến bạn thế nào, và lần sau mình sẽ [thay đổi].\"",
                      "(Tránh) \"Mình đúng là tệ thật, mình lúc nào cũng làm hỏng mọi thứ...\" — biến lời xin lỗi thành màn tự thương.",
                    ],
                  },
                  {
                    sit: "Cảm thấy mình là 'kẻ mạo danh' (imposter syndrome) khi đạt thành tựu",
                    mind: "Người vững nhận ra cảm giác 'mình không xứng, sẽ bị phát hiện' là một hiện tượng phổ biến — nhất là ở người giỏi — chứ không phải sự thật. Họ ghi nhận bằng chứng thực về năng lực thay vì tin vào giọng nghi ngờ.",
                    say: [
                      "(Với chính mình) \"Mình ở đây vì mình đã làm được những điều cụ thể, không phải nhờ may mắn. Cảm giác này rất người, nhưng nó không phải sự thật.\"",
                      "\"Mình không cần biết mọi thứ để xứng đáng ở vị trí này. Mình đang học và đóng góp — thế là đủ.\"",
                    ],
                  },
                  {
                    sit: "Ở trong nhóm bạn mà mình thấy 'lép vế' hơn (kém thành đạt/kém nổi bật hơn)",
                    mind: "Người có giá trị bản thân nội tại không đo mình bằng thứ bậc trong nhóm. Họ tham gia bằng con người thật, đóng góp điều mình có, và không thu mình lại vì thấy người khác 'hơn'.",
                    say: [
                      "(Với chính mình) \"Giá trị của mình không phụ thuộc vào việc mình xếp thứ mấy ở đây. Mình có điều riêng để mang đến.\"",
                      "(Tham gia thật) chia sẻ góc nhìn của mình thay vì im lặng vì sợ 'kém sâu sắc'.",
                    ],
                  },
                  {
                    sit: "Muốn bày tỏ nhu cầu/cảm xúc trong một mối quan hệ",
                    mind: "Người vững tin nhu cầu của mình chính đáng và đáng được nói ra. Họ không giấu đi vì sợ 'làm phiền' hay 'bị coi là đòi hỏi' — nói thẳng cho người kia cơ hội đáp lại đúng cách.",
                    say: [
                      "\"Mình có một điều muốn chia sẻ vì nó quan trọng với mình. Mình cảm thấy... và mình cần...\"",
                      "(Tránh) im lặng chịu đựng rồi mong người kia tự đoán — nhu cầu không nói ra thì không ai đáp được.",
                    ],
                  },
                  {
                    sit: "Rời khỏi một tình huống/mối quan hệ gây hại cho mình",
                    mind: "Đây là fierce self-compassion ở mức cao nhất: chọn bản thân khi ở lại là tự làm hại mình. Người vững không coi việc rời đi là thất bại hay ích kỷ — mà là hành động tôn trọng chính mình.",
                    say: [
                      "(Với chính mình) \"Mình xứng đáng được đối xử tử tế. Rời khỏi nơi làm mình tổn thương không phải bỏ cuộc — đó là tự bảo vệ.\"",
                      "\"Mình đã cân nhắc kỹ, và mình cần dừng lại ở đây vì sức khoẻ tinh thần của mình.\"",
                    ],
                  },
                  {
                    sit: "Tự thưởng/tự chăm sóc mà không thấy tội lỗi",
                    mind: "Người có giá trị bản thân vững cho phép mình nghỉ ngơi, tận hưởng, chăm sóc bản thân mà không cần 'kiếm được' nó qua năng suất. Chăm sóc bản thân là quyền cơ bản, không phải phần thưởng có điều kiện.",
                    say: [
                      "(Với chính mình) \"Mình không cần làm việc đến kiệt sức mới xứng đáng được nghỉ. Chăm sóc mình là việc cần thiết, không phải xa xỉ.\"",
                    ],
                  },
                  {
                    sit: "Theo đuổi điều mình muốn dù có nguy cơ thất bại/bị cười",
                    mind: "Người vững hành động dù sợ, vì họ tách giá trị con người khỏi kết quả. Thất bại không hạ thấp họ; không dám thử mới là điều họ tiếc. Họ cho phép mình bắt đầu khi chưa 'sẵn sàng hoàn hảo'.",
                    say: [
                      "(Với chính mình) \"Mình được phép thử và được phép chưa giỏi lúc đầu. Giá trị của mình không nằm ở việc thành công ngay.\"",
                      "\"Điều tệ nhất không phải thất bại — mà là không bao giờ dám thử.\"",
                    ],
                  },
                ].map((s, i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "11px 15px", background: "#F0EDE8" }}>
                      <div style={{ fontFamily: SANS, fontSize: 13.8, fontWeight: 700, color: "#6B5A3A", lineHeight: 1.4 }}>{s.sit}</div>
                    </div>
                    <div style={{ padding: "12px 15px" }}>
                      <div style={{ fontSize: 13.9, lineHeight: 1.62, marginBottom: 10 }}>
                        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: "#6B5A3A", letterSpacing: "0.04em" }}>TƯ DUY · </span>
                        {s.mind}
                      </div>
                      <div style={{ background: "#EEF3F1", borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 4px 4px 0", padding: "9px 13px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em", marginBottom: 5 }}>NÓI THẾ NÀY</div>
                        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13.7, lineHeight: 1.62 }}>
                          {s.say.map((q, j) => <li key={j} style={{ marginBottom: 4 }}>{q}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: MUTE, lineHeight: 1.55, marginTop: 10, fontStyle: "italic" }}>
                Lưu ý: đây là kịch bản mẫu để luyện phản xạ, không phải câu thoại học thuộc cứng nhắc. Điều chỉnh theo giọng và bối cảnh của bạn — sự chân thành quan trọng hơn câu chữ hoàn hảo.
              </div>
            </div>
</div>
        )}


        {primary === "practice" && (
          <div style={{ display: "grid", gap: 18 }}>

            <div style={{ background: "#20302D", color: "#E8F0ED", borderRadius: 6, padding: "18px 20px" }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#7FC9BC", fontWeight: 700, marginBottom: 7 }}>
                Góc nhìn chuyên gia — Từ lý thuyết đến hành động
              </div>
              <div style={{ fontSize: 14.5, lineHeight: 1.68 }}>
                Giá trị bản thân không xây bằng suy nghĩ tích cực mà bằng <b>đối xử mới với chính mình, lặp lại đủ nhiều để thành đường mòn thần kinh</b>.
                Nguyên tắc: chọn 1-2 bài cộng hưởng nhất, làm 30 ngày, rồi mới thêm. Đọc hết rồi không làm gì thì không đổi được điều gì.
              </div>
            </div>

            {/* Mechanism map — advanced framing */}
            <div style={{ border: "1px solid " + LINE, borderRadius: 6, padding: "16px 20px", background: CARD }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>
                Cơ chế — mỗi bài tập tác động vào đâu
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: "#57605A", margin: "0 0 12px", lineHeight: 1.55 }}>
                Điều phân biệt thực hành chuyên nghiệp với "mẹo tự giúp": biết CHÍNH XÁC mỗi bài tập tác động vào hệ nào (nối trực tiếp với tab Chuyên sâu). Không nhắm đúng cơ chế thì bài tập thành nghi thức trống rỗng.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  ["Self-compassion break · giọng từ bi · thở nhịp xoa dịu", "Kích hoạt HỆ XOA DỊU (Gilbert), hạ hệ đe doạ — nơi DUY NHẤT giá trị bản thân có thể được xây. Đây là nền sinh lý cho mọi thay đổi nhận thức."],
                  ["Nhật ký bằng chứng · thang mastery", "Xây self-efficacy (Bandura) và làm mạnh chế độ NGƯỜI LỚN LÀNH MẠNH (Schema Therapy) — phần đối trọng với nhà phê bình."],
                  ["Làm việc với nhà phê bình · chair work", "Nhận diện và tách khỏi chế độ CHA MẸ TRỪNG PHẠT; bảo vệ và nuôi dưỡng lại ĐỨA TRẺ TỔN THƯƠNG (Schema modes)."],
                  ["Gỡ khỏi điều kiện · sống theo giá trị (ACT)", "Chuyển MỤC TIÊU-CÁI-TÔI sang MỤC TIÊU-PHÁT-TRIỂN (Crocker); hướng tới self-esteem KHÔNG-ĐIỀU-KIỆN và ổn định (Kernis)."],
                  ["Fierce self-compassion · đặt ranh giới", "Cân bằng lại hệ thúc đẩy/đe doạ đang quá tải; duy trì chăm sóc bản thân bền vững BÊN TRONG mạng lưới quan hệ (tâm lý học văn hoá)."],
                ].map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(140px, 34%) 1fr", gap: 12, borderTop: i > 0 ? "1px solid #EFF2ED" : "none", paddingTop: i > 0 ? 8 : 0 }}>
                    <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 700, color: ACCENT, lineHeight: 1.45 }}>{r[0]}</div>
                    <div style={{ fontSize: 13.4, lineHeight: 1.55 }}>{r[1]}</div>
                  </div>
                ))}
              </div>
            </div>

            
</div>
        )}

        {sub === "p-start" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                A · Tự chẩn đoán (làm trước)
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {[
                  ["\"Giá trị của mình hiện đang neo vào điều gì?\"", "Crocker. Liệt kê thật: thành tích? ngoại hình? sự tán thành? Mỗi cái là một điểm dễ tổn thương. Mục tiêu dài hạn là giảm phụ thuộc, không phải đổi sang neo 'tốt hơn'."],
                  ["\"Mình nói với mình khi thất bại như thế nào — có dám nói y hệt với bạn thân không?\"", "Neff. Nếu giọng nội tâm khắc nghiệt đến mức không bao giờ dám dùng với người mình thương, đó là tín hiệu thiếu self-compassion rõ nhất."],
                  ["\"Nhà phê bình nội tâm của mình đang thật sự sợ điều gì?\"", "IFS. Giọng chỉ trích thường cố bảo vệ mình khỏi bị từ chối. Hỏi nó sợ gì thường mở ra lòng trắc ẩn thay vì chiến đấu với nó."],
                  ["\"Tự tin của mình đến từ bằng chứng hành động, hay từ việc cố nghĩ tích cực?\"", "Bandura. Nếu chỉ dựa vào 'nghĩ tích cực', nó sẽ sụp khi gặp thực tế. Tự tin bền cần mastery experiences — việc làm được thật."],
                  ["\"Cảm giác 'chưa đủ tốt' của mình có bao nhiêu phần là của mình, bao nhiêu phần được xã hội cấy vào?\"", "Byung-Chul Han/xã hội học. Tách phần nào là tiếng nói thật của mình khỏi áp lực tối ưu hoá bên ngoài."],
                ].map(([q, tag], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.8, lineHeight: 1.55, fontWeight: 600, marginBottom: 5 }}>{i + 1}. {q}</div>
                    <div style={{ fontFamily: SANS, fontSize: 12.5, color: "#666B63", lineHeight: 1.55 }}>{tag}</div>
                  </div>
                ))}
              </div>
            </div>
</div>
        )}

        {sub === "p-core" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                B · Bài tập lõi Self-Compassion (Neff)
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["Self-compassion break (3 bước, 1 phút)", "Khi đang đau khổ, đặt tay lên ngực và nói với mình: (1) 'Đây là một khoảnh khắc khổ đau' [chánh niệm]; (2) 'Khổ đau là một phần của làm người, mình không đơn độc' [nhân tính chung]; (3) 'Mong mình được tử tế với chính mình lúc này' [tự tử tế]. Dùng ngay khi cảm xúc khó ập đến."],
                  ["Đối xử như với một người bạn", "Viết ra tình huống bạn đang tự trách. Rồi tự hỏi: 'Nếu người bạn thân nhất gặp đúng chuyện này và nói y hệt, mình sẽ nói gì với họ?' Viết câu trả lời đó ra — và đọc lại cho chính mình. Khoảng cách giữa hai giọng nói chính là khoảng cần thu hẹp."],
                  ["Thư gửi chính mình từ một người thương vô điều kiện", "Tưởng tượng một người (thật hoặc hình dung) yêu thương bạn vô điều kiện, thấy hết khiếm khuyết mà vẫn chấp nhận. Viết một lá thư từ góc nhìn của họ gửi cho bạn về điều bạn đang vật lộn. Bài này chạm được tầng cảm xúc mà lý trí không tới."],
                  ["Fierce self-compassion — lòng từ quyết liệt", "Self-compassion không chỉ dịu dàng. Đôi khi tử tế với mình nghĩa là NÓI KHÔNG, đặt ranh giới, rời khỏi nơi làm hại mình, đòi điều mình xứng đáng. Hỏi: 'Điều tử tế nhất với mình lúc này là an ủi, hay là hành động bảo vệ?'"],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                C · Làm việc với nhà phê bình nội tâm
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {[
                  ["1 · Tách nó ra khỏi mình (naming)", "Đặt tên cho giọng nói đó ('à, ông thẩm phán lại xuất hiện'). Việc gọi tên tạo khoảng cách: bạn có một nhà phê bình, bạn KHÔNG phải nhà phê bình. Đây là bước IFS và chánh niệm đều nhấn mạnh."],
                  ["2 · Hỏi nó đang sợ gì", "Thay vì cãi hay đầu hàng, hỏi: 'Bạn đang cố bảo vệ mình khỏi điều gì?' Nhà phê bình thường sợ mình bị từ chối, bị bẽ mặt. Hiểu ý định (dù vụng về) làm dịu nó."],
                  ["3 · Kiểm chứng như CBT", "Với niềm tin 'mình vô dụng': viết cột 'bằng chứng CHO' và cột 'bằng chứng CHỐNG'. Gần như luôn có bằng chứng chống bị bỏ qua. Niềm tin cốt lõi cảm thấy như sự thật nhưng thường là giả thuyết cũ chưa được kiểm tra."],
                  ["4 · Viết lại giọng nói", "Chuyển 'mày lúc nào cũng làm hỏng mọi thứ' thành 'lần này chưa được, mình học được gì?' Không phải nói dối tích cực — mà là nói SỰ THẬT một cách công bằng, không phóng đại về phía tiêu cực."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 13 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                E · Gỡ giá trị bản thân khỏi điều kiện
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {[
                  ["Sống theo giá trị, không theo thành tích (ACT)", "Thay vì đo mình bằng kết quả (thắng/thua), đo bằng việc mình có sống đúng giá trị của mình không (tử tế, trung thực, can đảm). Giá trị thì luôn 'làm được' bất kể kết quả — một nguồn tự trọng không thể bị lấy đi."],
                  ["Tách con người khỏi kết quả (Dweck)", "Luyện câu: 'Việc này chưa thành' thay vì 'Mình là kẻ thất bại'. Thêm chữ 'chưa' (yet) vào mọi phán xét về năng lực. Thất bại là dữ liệu, không phải bản án về con người."],
                  ["Danh sách giá trị không-điều-kiện", "Viết ra những điều đúng về bạn mà KHÔNG phụ thuộc thành tích hay người khác công nhận (mình biết quan tâm, mình cố gắng, mình tồn tại như một con người). Đọc lại khi self-worth dao động vì một thất bại cụ thể."],
                  ["Thực hành 'đủ' (enough-ness)", "Chống lại văn hoá tối ưu vô tận: mỗi tuần một lần, chủ động dừng lại và công nhận 'hôm nay thế này là đủ'. Nghỉ ngơi mà không thấy tội lỗi là một bài tập giá trị bản thân, không phải lười biếng."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 13 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                F · Sổ tay tự-đối-thoại (đổi giọng hỏng → giọng lành)
              </div>
              <div style={{ overflowX: "auto", border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 600, fontSize: 13.3, fontFamily: SANS }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "9px 12px", background: "#F6ECE4", borderBottom: `1px solid ${LINE}`, color: "#8A5A3A", width: "46%" }}>⚠ Nhà phê bình nói</th>
                      <th style={{ textAlign: "left", padding: "9px 12px", background: "#EEF5F1", borderBottom: `1px solid ${LINE}`, color: ACCENT }}>✓ Giọng công bằng &amp; trắc ẩn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["\"Mình lúc nào cũng làm hỏng mọi thứ.\"", "\"Lần này chưa được. Mình đã làm được nhiều việc khác. Học được gì đây?\""],
                      ["\"Mình là kẻ thất bại.\"", "\"Mình vừa thất bại ở một việc. Điều đó không định nghĩa toàn bộ con người mình.\""],
                      ["\"Ai cũng giỏi hơn mình.\"", "\"Mình đang so sánh hậu trường của mình với highlight của người khác.\""],
                      ["\"Mình phải hoàn hảo thì mới đủ.\"", "\"Đủ tốt là đủ. Sự hoàn hảo không tồn tại và không phải điều kiện để có giá trị.\""],
                      ["\"Mình không xứng đáng được nghỉ ngơi.\"", "\"Giá trị của mình không đến từ năng suất. Nghỉ ngơi là chăm sóc, không phải lười.\""],
                      ["\"Mình không nên cảm thấy thế này.\"", "\"Cảm xúc này là một phần của làm người. Mình được phép thấy khó.\""],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: "9px 12px", borderBottom: i < 5 ? "1px solid #EBEEE9" : "none", lineHeight: 1.5, color: "#7A5A3A" }}>{row[0]}</td>
                        <td style={{ padding: "9px 12px", borderBottom: i < 5 ? "1px solid #EBEEE9" : "none", lineHeight: 1.5, color: "#274A44" }}>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
</div>
        )}

        {sub === "p-clinical" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>
                G · Kỹ thuật chuyên sâu (cấp độ lâm sàng)
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.8, color: "#57605A", margin: "0 0 12px", lineHeight: 1.6 }}>
                Những kỹ thuật thực sự dùng trong trị liệu (CFT, Schema Therapy, ACT). Sâu hơn "suy nghĩ tích cực" — chúng tác động vào hệ thần kinh và cấu trúc nội tâm, không chỉ vào nội dung suy nghĩ.
              </p>
              <div style={{ display: "grid", gap: 11 }}>
                {[
                  {
                    h: "1 · Thở nhịp xoa dịu + hình dung Con người Từ bi (CFT)",
                    b: "Trước khi làm bất kỳ việc nhận thức nào, tạo trạng thái sinh lý an toàn. Thở chậm ~5-6 nhịp/phút, thì thở RA dài hơn thở vào (thở ra dài kích hoạt hệ phó giao cảm). Rồi hình dung một phiên bản của chính mình — hoặc một hiện thân — mang ba phẩm chất: ấm áp, vững vàng (không phán xét), và khôn ngoan. Nhìn khó khăn hiện tại của mình QUA đôi mắt đó. Đây không phải tưởng tượng suông: nó rèn hệ xoa dịu như rèn cơ.",
                  },
                  {
                    h: "2 · Xây giọng Người lớn Lành mạnh đối lại Cha mẹ Trừng phạt (Schema)",
                    b: "Khi nhà phê bình nội tâm lên tiếng, đừng cãi bằng logic khô khan cũng đừng đầu hàng. Đáp bằng một giọng VỪA ẤM VỪA CỨNG: công nhận nỗi sợ bên dưới lời chỉ trích, nhưng dứt khoát không đồng ý với sự sỉ nhục. Bài tập: viết sẵn một 'kịch bản Người lớn Lành mạnh' cho 3-4 câu phê bình bạn hay tự nói. Ví dụ, với 'mày vô dụng': 'Mình hiểu bạn đang sợ mình bị chê. Nhưng sỉ nhục mình không giúp gì. Mình đã làm được X, và mình đang học phần còn lại.'",
                  },
                  {
                    h: "3 · Chair work — đối thoại hai ghế",
                    b: "Kỹ thuật externalize mạnh. Đặt nhà phê bình vào một ghế, đứa trẻ tổn thương (phần nhận đòn) vào ghế khác, và để Người lớn Lành mạnh làm trung gian. Ngồi vào từng ghế và nói ra tiếng. Việc TÁCH các phần ra không gian vật lý giúp thấy rõ nhà phê bình chỉ là MỘT phần, không phải toàn bộ mình — và thường lộ ra rằng bên dưới sự hà khắc là một nỗi sợ đang cố bảo vệ mình một cách vụng về.",
                  },
                  {
                    h: "4 · Phân biệt và xử lý xấu hổ (shame) khác tội lỗi (guilt)",
                    b: "Xấu hổ = 'tôi tệ' (ăn mòn bản sắc); tội lỗi = 'tôi đã làm điều tệ' (còn sửa được). Chuyển câu tự nói từ 'tôi là...' sang 'tôi đã làm...' đưa bạn từ xấu hổ độc hại về tội lỗi lành mạnh — nơi có thể hành động. Shame resilience (Brené Brown): xấu hổ SỐNG NHỜ bí mật, im lặng và phán xét; nói ra điều xấu hổ với một người an toàn làm nó teo lại. Và kiểm chứng: câu chuyện xấu hổ ('ai cũng thấy mình thảm hại') gần như luôn phóng đại.",
                  },
                  {
                    h: "5 · ACT — làm rõ giá trị + tách khỏi suy nghĩ (defusion)",
                    b: "(a) Values sort: xác định 3-5 giá trị sống cốt lõi (ví dụ tử tế, can đảm, chính trực, học hỏi). Đo mình bằng việc CÓ SỐNG THEO chúng không, thay vì bằng kết quả — một nguồn giá trị không ai lấy đi được. (b) Cognitive defusion: chuyển 'Tôi vô dụng' thành 'Tôi đang CÓ ý nghĩ rằng mình vô dụng.' Câu sau tạo khoảng cách: bạn là người QUAN SÁT ý nghĩ (self-as-context), không phải bản thân ý nghĩ. Ý nghĩ không phải sự thật, cũng không phải mệnh lệnh.",
                  },
                  {
                    h: "6 · Điều hoà hệ thần kinh — cửa sổ chịu đựng (window of tolerance)",
                    b: "Giá trị bản thân KHÔNG THỂ được xây khi hệ thần kinh nằm ngoài 'cửa sổ chịu đựng'. Nhận biết hai kiểu ra khỏi cửa sổ: quá kích hoạt (lo âu, phòng thủ, tim đập) và sụp dưới ngưỡng (tê liệt, xấu hổ, muốn biến mất). Kỹ thuật kéo về cửa sổ: nối đất 5-4-3-2-1 (kể tên 5 thứ nhìn thấy, 4 nghe thấy...), thở ra dài, vận động cơ thể, nước lạnh. Chỉ khi trong cửa sổ, mọi bài tập nhận thức ở trên mới có tác dụng.",
                  },
                ].map((x, i) => (
                  <div key={i} style={{ border: "1px solid " + LINE, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.8, fontWeight: 600, marginBottom: 4 }}>{x.h}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.64 }}>{x.b}</div>
                  </div>
                ))}
              </div>
            </div>
</div>
        )}

        {sub === "p-roadmap" && (
          <div style={{ display: "grid", gap: 18 }}>
<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 4 }}>
                H · Chương trình 90 ngày (tiến theo tầng)
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.8, color: "#57605A", margin: "0 0 12px", lineHeight: 1.6 }}>
                Mỗi tháng một trọng tâm. Đừng nhảy cóc — nền phải chắc trước khi xây tiếp.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["Tháng 1 — NGƯNG TẤN CÔNG BẢN THÂN", "#2D6A62", "Mục tiêu: giảm tự phán xét, dựng self-compassion nền.", ["Tuần 1: nhận diện nhà phê bình — đặt tên, ghi lại mỗi khi nó xuất hiện.", "Tuần 2-4: dùng self-compassion break mỗi khi khó (mục B).", "Mỗi ngày: bài 'đối xử như với người bạn'.", "Chưa cần cố 'thấy mình tuyệt vời' — chỉ cần ngừng đánh mình."]],
                  ["Tháng 2 — XÂY BẰNG CHỨNG", "#3E7A6E", "Mục tiêu: tự tin từ hành động, tự trọng từ chính trực.", ["Nhật ký bằng chứng mỗi ngày (mục D).", "Chọn một thang mastery — leo từng bậc nhỏ.", "Sentence completion buổi sáng (Branden).", "Thực hành một trụ cột Branden: tự chịu trách nhiệm hoặc tự khẳng định."]],
                  ["Tháng 3 — GỠ KHỎI ĐIỀU KIỆN", "#4A6FA5", "Mục tiêu: giá trị bản thân không phụ thuộc kết quả/người khác.", ["Xác định giá trị sống của mình, đo mình bằng chúng thay vì thành tích (ACT).", "Thực hành 'đủ' — nghỉ không tội lỗi mỗi tuần.", "Fierce self-compassion: đặt một ranh giới mình vẫn né lâu nay.", "Giảm nguồn so sánh độc hại (mạng xã hội)."]],
                ].map(([title, color, goal, items], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "10px 15px", background: color, color: "#fff" }}>
                      <div style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700 }}>{title}</div>
                      <div style={{ fontFamily: SANS, fontSize: 12, opacity: 0.9, marginTop: 2 }}>{goal}</div>
                    </div>
                    <ul style={{ margin: 0, padding: "11px 15px 11px 32px", fontSize: 13.8, lineHeight: 1.6 }}>
                      {items.map((it, j) => <li key={j} style={{ marginBottom: 4 }}>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                I · Nhịp thực hành
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["Mỗi ngày", "#2D6A62", "Một self-compassion break khi cần • Ghi 1-3 bằng chứng vào nhật ký • Bắt được nhà phê bình một lần và viết lại giọng nói của nó."],
                  ["Mỗi tuần", "#3E7A6E", "Bài 'đối xử như với bạn' cho tình huống khó nhất tuần • Leo một bậc mastery mới • Một lần nghỉ ngơi không tội lỗi (thực hành 'đủ')."],
                  ["Mỗi tháng", "#4A6FA5", "Rà lại: giá trị mình đang neo vào đâu? • Một hành động fierce self-compassion (ranh giới, nói không) • Kiểm tra 'liều lượng' mạng xã hội và so sánh."],
                  ["Mỗi quý", "#6B5A8A", "Chấm bảng tự đánh giá (mục J) • Nhìn lại: giọng nội tâm đã dịu hơn chưa? • Chọn lại 1-2 trọng tâm cho quý tới."],
                ].map(([when, color, what], i) => (
                  <div key={i} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, paddingTop: 2, paddingBottom: 2 }}>
                    <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{when}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.62 }}>{what}</div>
                  </div>
                ))}
              </div>
            </div>

<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                J · Bảng tự chấm (mỗi quý)
              </div>
              <p style={{ fontFamily: SANS, fontSize: 12.8, color: "#57605A", margin: "0 0 12px", lineHeight: 1.6 }}>
                Chấm 1-5 mỗi mục. Không để phán xét — để thấy nên luyện gì tiếp.
              </p>
              <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, overflow: "hidden" }}>
                {[
                  ["Khi thất bại, tôi nói 'lần này chưa được' thay vì 'tôi là kẻ thất bại'", "Dweck"],
                  ["Tôi đối xử với mình khi khó khăn tử tế như với bạn thân", "Neff"],
                  ["Giá trị bản thân tôi không sụp khi bị phê bình hay thất bại", "Crocker"],
                  ["Tôi nhận ra nhà phê bình nội tâm và không tin nó tự động", "IFS/CBT"],
                  ["Tự tin của tôi dựa trên bằng chứng hành động, không phải thần chú", "Bandura"],
                  ["Tôi vui được khi người khác thành công, không thấy bị đe doạ", "self-worth vững"],
                  ["Tôi nghỉ ngơi được mà không thấy tội lỗi", "chống neoliberal self"],
                  ["Tôi đặt được ranh giới và nói không khi cần (fierce self-compassion)", "Neff"],
                  ["Tôi phân biệt được tự trắc ẩn với tự nuông chiều / né trách nhiệm", "Branden"],
                  ["Tôi thấy mình có giá trị mà không cần hơn ai để chứng minh", "nền không so sánh"],
                ].map(([q, tag], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "10px 15px", borderBottom: i < 9 ? "1px solid #EBEEE9" : "none", background: i % 2 ? "#FBFCFB" : "#fff" }}>
                    <div style={{ fontSize: 13.8, lineHeight: 1.45 }}>
                      {q} <span style={{ fontFamily: SANS, fontSize: 11, color: MUTE, fontStyle: "italic" }}>· {tag}</span>
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 13, color: "#B8C2BD", letterSpacing: "0.15em", flexShrink: 0 }}>1 2 3 4 5</div>
                  </div>
                ))}
              </div>
            </div>

<div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 10 }}>
                K · Những cái bẫy khi thực hành
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {[
                  ["Biến 'chữa lành' thành điều kiện mới", "Nếu bạn chỉ thấy mình ổn khi đang 'làm việc với bản thân', bạn vừa tạo một contingent self-worth mới. Giá trị bản thân không đòi hỏi bạn phải liên tục tiến bộ mới tồn tại."],
                  ["Nhầm affirmation trống với self-worth", "Lặp 'tôi tuyệt vời' khi không tin sẽ phản tác dụng (Wood 2009). Dùng câu hỏi và bằng chứng, không phải thần chú mâu thuẫn với niềm tin cốt lõi."],
                  ["Dùng self-love để né trách nhiệm", "Tự trắc ẩn thật bao gồm tự chịu trách nhiệm. 'Yêu bản thân' không phải lá chắn khỏi mọi phản hồi hay tự vấn."],
                  ["Toxic positivity đội lốt self-love", "Ép mình 'phải luôn ổn' là tự phán xét mới. Self-compassion cần nhìn thẳng nỗi đau, không phủ sơn tích cực lên nó."],
                  ["Kỳ vọng đổi nhanh", "Niềm tin cốt lõi hình thành qua nhiều năm. Tiến bộ theo xoắn ốc, có lúc trượt lại. Kiên nhẫn với chính quá trình cũng là self-compassion."],
                  ["Tự trắc ẩn ≠ tự thương hại", "Self-compassion nhìn nỗi đau với sự cân bằng và nhân tính chung, rồi hành động. Tự thương hại phóng đại nỗi đau và mắc kẹt trong 'chỉ mình mình khổ'. Ranh giới là chánh niệm và common humanity."],
                ].map(([title, body], i) => (
                  <div key={i} style={{ border: "1px solid #E6D2C2", background: "#FBF5EF", borderRadius: 4, padding: "11px 15px" }}>
                    <div style={{ fontSize: 14.3, fontWeight: 600, color: "#8A5A3A", marginBottom: 3 }}>⚠ {title}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.6, color: "#3A362F" }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>

<div style={{ background: "#EEF3F1", borderRadius: 6, padding: "18px 20px", border: `1px solid ${LINE}` }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 8 }}>
                L · Nếu chỉ nhớ được một trang
              </div>
              <div style={{ fontSize: 14.6, lineHeight: 1.78 }}>
                Đừng cố nâng self-esteem (thấy mình giỏi hơn) — nó mong manh và cần so sánh. Hãy xây <b>self-compassion</b> (đối xử tử tế với mình bất kể giỏi hay dở). Ba trụ cột thực hành:
                <br /><br />
                <b>1. Ngừng đánh mình</b> — nhận ra nhà phê bình nội tâm không phải sự thật, đối xử với mình như với người bạn thương (Neff/IFS). Đây là nền, làm trước mọi thứ khác.
                <br /><br />
                <b>2. Xây bằng chứng, không xây thần chú</b> — tự tin đến từ việc làm được thật, tích luỹ qua các bậc nhỏ (Bandura). Ghi lại bằng chứng vì não tự trọng thấp sẽ lọc bỏ nó.
                <br /><br />
                <b>3. Gỡ giá trị khỏi điều kiện</b> — bạn có giá trị vì bạn là con người, không phải vì thành tích, ngoại hình, hay sự tán thành. Đo mình bằng giá trị sống, không bằng kết quả (Crocker/ACT).
                <br /><br />
                Và điều quan trọng nhất, dễ quên nhất: <b>tử tế với mình KHÔNG phải nuông chiều hay né trách nhiệm</b> — nó bao gồm cả sự quyết liệt để bảo vệ mình, đặt ranh giới, và trưởng thành. Lòng từ và trách nhiệm đi cùng nhau.
              </div>
            </div>
</div>
        )}

        {(() => {
          const flat = PRIMARY.flatMap((p) => p.subs.map((sb) => ({ primaryId: p.id, subId: sb.id, primaryVi: p.vi, subVi: sb.vi })));
          const idx = flat.findIndex((x) => x.primaryId === primary && x.subId === sub);
          const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
          if (!next) return null;
          return (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
              <button
                onClick={() => { setPrimary(next.primaryId); setSub(next.subId); window.__scrollArticleToTop?.(); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 15px", borderRadius: 6, border: `1px solid ${ACCENT}`, background: "#EEF3F1", color: ACCENT, fontFamily: SANS, fontSize: 12.8, fontWeight: 700, cursor: "pointer" }}
              >
                Tiếp: {next.primaryId !== primary ? `${next.primaryVi} · ` : ""}{next.subVi} →
              </button>
            </div>
          );
        })()}

<div style={{ fontFamily: SANS, fontSize: 12, color: MUTE, lineHeight: 1.7, borderTop: `1px solid ${LINE}`, paddingTop: 16, marginTop: 28 }}>
          <b>Nguồn chính:</b> Kristin Neff (Self-Compassion) · Nathaniel Branden (The Six Pillars of Self-Esteem) · Albert Bandura (Self-Efficacy) ·
          Jennifer Crocker (Contingent Self-Worth) · Aaron Beck / CBT · D.W. Winnicott (true/false self) · Mark Leary (Sociometer Theory) ·
          Carol Dweck (Mindset) · Richard Schwartz (IFS) · Brené Brown (shame &amp; worthiness) · Roy Baumeister (self-esteem review, 2003) ·
          Byung-Chul Han (The Burnout Society) · ACT (Acceptance & Commitment Therapy). Các trích dẫn được diễn giải theo tinh thần nguyên tác.
          <br /><br />
          <i>Lưu ý:</i> Đây là tài liệu tham khảo giáo dục, không thay thế trị liệu chuyên môn. Nếu cảm giác vô giá trị đi kèm trầm cảm kéo dài hoặc ý nghĩ tự làm hại, việc gặp chuyên gia sức khoẻ tâm thần là bước quan trọng và xứng đáng.
        </div>
      </div>
    </div>
  );
}

