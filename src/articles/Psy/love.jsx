import React, { useState, useEffect } from "react";
import { getSubTabFromUrl, syncSubTabToUrl } from "../../utils/subTabUrl";

const ACCENT = "#4A7C74";
const TAB_ACCENT = "#356158"; // đậm hơn ACCENT một tone để breadcrumb không chìm vào nền PAPER
const INK = "#25302E";
const MUTE = "#8AA09A";
const GREEN = "#3E7C6A";
const RUST = "#B06A80";
const GOLD = "#6FA5A0";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#F6FAF8";
const CARD = "#FFFFFF";
const LINE = "#DCE8E2";

const Sec = ({ label, children, color = ACCENT }) => (
  <div>
    <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color, fontWeight: 700, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 14.4, lineHeight: 1.68 }}>{children}</div>
  </div>
);

const Quote = ({ text, by }) => (
  <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 15, margin: "2px 0" }}>
    <div style={{ fontStyle: "italic", fontSize: 15.5, lineHeight: 1.55 }}>{text}</div>
    <div style={{ fontFamily: SANS, fontSize: 12, color: MUTE, marginTop: 5 }}>{by}</div>
  </div>
);

const Eyebrow = ({ children, color = ACCENT, mb = 10 }) => (
  <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color, fontWeight: 700, marginBottom: mb }}>{children}</div>
);

const TABS = [
  { id: "nature", vi: "1 · Bản chất" },
  { id: "mechanics", vi: "2 · Cơ chế" },
  { id: "longhaul", vi: "3 · Đường dài" },
  { id: "broken", vi: "4 · Khi hỏng" },
  { id: "practice", vi: "5 · ★ Thực hành" },
];

/* ============ PERSPECTIVE DATA (4 lenses merged) ============ */
const LENSES = [
  {
    key: "phil", title: "Triết học", color: "#4A7C74",
    items: [
      ["Plato — Yêu là khao khát cái mình thiếu", <>Trong <i>Symposium</i>, Eros bắt đầu từ sự thiếu hụt: ta yêu vì chưa hoàn thiện. Huyền thoại Aristophanes kể con người vốn là sinh vật kép bị chẻ đôi — yêu là đi tìm nửa kia. Nhưng Plato (qua Diotima) vượt lên: tình yêu đích thực là chiếc thang — từ yêu một cơ thể đẹp, leo lên yêu tâm hồn đẹp, rồi yêu cái Đẹp tự thân. Hàm ý: <b>người mình yêu không phải đích đến, mà là cánh cửa mở ra điều lớn hơn cả hai người.</b></>],
      ["Aristotle — Ba loại tình yêu", <>Tình yêu dựa trên tiện ích hoặc khoái lạc sẽ tan khi tiện ích/khoái lạc hết. Chỉ tình yêu dựa trên <b>đức hạnh</b> — yêu con người của nhau vì chính con người đó — mới bền. Người yêu đích thực muốn điều tốt cho nhau <i>vì lợi ích của người kia</i>. Đây là bài kiểm tra vẫn sắc bén sau 2300 năm: mình yêu người này, hay yêu những gì người này mang lại cho mình?</>],
      ["Kierkegaard — Yêu là bổn phận, và chính vì thế mới tự do", <>Tình yêu chỉ dựa trên cảm xúc thì mong manh — cảm xúc đến rồi đi. Khi tình yêu thành <b>cam kết đạo đức</b> (‘you shall love’), nó được giải phóng khỏi sự thất thường của cảm hứng. Tình yêu-bổn phận không lạnh hơn tình yêu-cảm xúc; nó <i>đáng tin cậy hơn</i> — và sự đáng tin đó là món quà lớn nhất một người có thể trao.</>],
      ["Sartre & de Beauvoir — Yêu mà không chiếm hữu", <>Sartre chỉ nghịch lý: ta muốn sở hữu tự do của người kia, nhưng nếu chiếm hữu được thì thứ ta có không còn là tự do, và tình yêu bị ép mất giá trị. De Beauvoir đi xa hơn: phê phán mô hình người phụ nữ ‘tan biến’ vào người yêu — tình yêu đích thực đòi hỏi <b>hai chủ thể tự do công nhận nhau</b>. Yêu như hai kẻ đồng hành cùng hướng về thế giới, không phải hai kẻ nhìn chằm vào nhau.</>],
      ["bell hooks — Tình yêu là động từ", <>Trong <i>All About Love</i>: yêu là ‘ý chí mở rộng bản thân để nuôi dưỡng sự phát triển tinh thần của mình hoặc người khác’. Hệ quả logic: <b>lạm dụng và tình yêu không thể cùng tồn tại</b> — ‘yêu mà làm tổn thương’ là mâu thuẫn từ trong định nghĩa. Người ta hay nhầm sự gắn bó, sự quan tâm, hay đầu tư cảm xúc với tình yêu; có thể gắn bó sâu với người mình đang làm hại — đó không phải yêu.</>],
      ["Iris Murdoch — Yêu là nhìn thấy người kia đúng như họ là", <>‘Love is the extremely difficult realisation that something other than oneself is real.’ Yêu là kỷ luật của sự <b>chú ý</b> — nỗ lực nhìn người kia không qua lớp sương mù của nhu cầu và phóng chiếu của mình. Phần lớn cái ta gọi là yêu thực ra là yêu phiên bản người kia mà ta tự dựng. Tình yêu trưởng thành bắt đầu khi phiên bản tưởng tượng sụp đổ mà mình vẫn ở lại với con người thật.</>],
      ["Alain de Botton — Chủ nghĩa lãng mạn là kẻ phá hoại", <>Chính Chủ nghĩa Lãng mạn đã cài vào ta những kỳ vọng độc hại: có ‘người định mệnh’ duy nhất, yêu thật thì không cần nói cũng hiểu, đam mê phải kéo dài mãi, tình yêu thật không cần cố gắng. Ông đề xuất cái nhìn hậu lãng mạn: <b>mọi người ta cưới đều là ‘người sai’ ở khía cạnh nào đó</b> — câu hỏi đúng không phải ‘người này có hoàn hảo không’ mà ‘mình sẵn sàng thương lượng với bộ khiếm khuyết nào’.</>],
      ["Harry Frankfurt — Yêu KIẾN TẠO giá trị, không đáp lại giá trị", <>Trực giác thông thường: ta yêu người kia <i>vì</i> họ đáng yêu. Frankfurt lật ngược: chính hành vi yêu mới <b>ban giá trị</b> cho người được yêu — cha mẹ không yêu con vì đứa con xuất sắc hơn đứa khác, mà đứa con trở nên vô giá <i>vì</i> được yêu. Hàm ý sâu: đừng chờ tìm được ‘người đủ xứng đáng’ mới yêu hết lòng; sự tận tâm mới là thứ tạo ra tính không thể thay thế của người kia.</>],
      ["Robert Nozick — Tình yêu là tạo ra một cái ‘chúng ta’", <>Yêu là hình thành một bản sắc mới, một ‘we’ — nơi phúc lợi của người kia gắn với phúc lợi của mình, và ranh giới cái tôi được mở rộng một cách tự nguyện để bao gồm cả họ. Điều này giải thích vì sao mất người yêu giống như mất một phần cơ thể: một phần bản thể mình đã thật sự được cấu tạo từ mối quan hệ đó. Khác chiếm hữu: trong ‘we’, không ai nuốt ai — hai người cùng góp phần tạo một thực thể thứ ba.</>],
      ["Stendhal — Sự ‘kết tinh’", <>Trong <i>De l’Amour</i>, Stendhal ví tình yêu với một cành cây khô ném xuống hầm muối: vài tuần sau nó phủ đầy tinh thể lấp lánh. Tâm trí người đang yêu ‘kết tinh’ — phủ lên đối tượng vô số phẩm chất tưởng tượng cho tới khi không còn thấy con người thật. Hiểu điều này giúp giữ một chút tỉnh táo giữa cơn say, và nhận ra vỡ mộng chỉ là các tinh thể rơi xuống, để lộ cành cây vốn có.</>],
      ["Simone Weil — Sự chú ý là hình thức hiếm và tinh khiết nhất của lòng quảng đại", <>Với Weil, chú ý thật sự tới một người — buông hết mọi bận tâm về bản thân để đón nhận họ nguyên vẹn — gần như là một hành vi thiêng liêng. ‘Con có đang đau khổ ra sao?’ là câu hỏi của tình yêu đích thực. Hội tụ với Murdoch (chú ý) và Thích Nhất Hạnh (hiểu): ba nhà tư tưởng độc lập cùng đặt <b>khả năng chú ý</b> làm hạt nhân đạo đức của tình yêu.</>],
      ["Hegel & Honneth — Yêu là sự công nhận lẫn nhau", <>Hegel: bản ngã chỉ trở nên trọn vẹn khi được một bản ngã tự do khác <b>công nhận</b> — ‘được là chính mình ở trong một người khác’. Axel Honneth phát triển thành lý thuyết công nhận: tình yêu là tầng nền (dưới sự tôn trọng pháp lý và quý trọng xã hội), nơi ta học được rằng nhu cầu và sự tồn tại của mình là chính đáng. Hàm ý sắc: yêu ai là công nhận họ như một chủ thể tự do ngang hàng — đối lập tận gốc với mọi hình thức chiếm hữu, và nối thẳng với de Beauvoir.</>],
      ["C.S. Lewis — Bốn tình yêu", <>Lewis phân biệt bốn loại theo tiếng Hy Lạp: <b>storge</b> (thương mến ruột thịt, quen thuộc), <b>philia</b> (tình bạn — cùng nhìn về một hướng), <b>eros</b> (tình yêu đôi lứa, khao khát được ‘ở trong nhau’), và <b>agape</b> (tình yêu ban tặng vô điều kiện, không do đối tượng đáng yêu mà do người yêu chọn yêu). Điểm sâu: ba loại đầu là ‘tình yêu-nhu cầu’ tự nhiên nhưng hư hỏng khi bị tôn lên thành thần tượng; agape là ‘tình yêu-ban tặng’ phải học. Một mối quan hệ bền thường cần cả bốn cùng có mặt.</>],
    ],
    quote: ["Compatibility is an achievement of love; it must not be its precondition.", "Alain de Botton — sự tương thích là thành quả của tình yêu, không phải điều kiện tiên quyết"],
  },
  {
    key: "east", title: "Đông phương", color: "#5B8A82",
    items: [
      ["Phật giáo — Tứ Vô Lượng Tâm thay cho ‘ái’", <>Phật giáo phân biệt sắc bén <b>ái</b> (yêu-bám-víu, gốc của khổ) và tình thương đích thực gồm: <b>Từ</b> (mong người kia hạnh phúc), <b>Bi</b> (muốn làm vơi khổ của họ), <b>Hỷ</b> (vui với niềm vui của họ, kể cả niềm vui không liên quan đến mình), <b>Xả</b> (bao dung, không chiếm hữu). Bài kiểm tra tinh tế nhất là Hỷ: mình có thật vui khi người ấy hạnh phúc <i>mà không cần mình</i> không? Nếu niềm vui của họ ngoài mình làm mình bất an — đó là ái, không phải thương.</>],
      ["Thích Nhất Hạnh — Hiểu là tên gọi khác của Thương", <>‘Không hiểu thì không thể thương’ — tình thương không phải cảm xúc mà là <b>năng lực hiểu nỗi khổ của người kia</b>. Câu hỏi thực hành: ‘Người thương ơi, anh/em có nghĩ mình đã hiểu người đủ chưa?’ Yêu mà không hiểu có thể làm người kia ngạt thở — như nhốt con chim mình yêu vào lồng vì sợ mất.</>],
      ["Đạo giáo — Vô vi trong tình yêu", <>Nguyên lý <i>wu wei</i> (không cưỡng cầu): tình yêu vận hành tốt nhất khi không bị nắm chặt. Nước mềm mà thắng đá cứng — sự hiện diện bền bỉ, không áp đặt, thường giữ được người hơn là kiểm soát. Càng dụng công thao túng để ‘giữ người yêu’, càng đi ngược đạo của sự gắn kết tự nhiên.</>],
      ["Nho giáo — Tình yêu trong mạng lưới luân thường", <>Khác phương Tây đặt cặp đôi lãng mạn ở trung tâm, Nho giáo đặt tình vợ chồng trong <b>ngũ luân</b> — một trong nhiều mối quan hệ có bổn phận qua lại. Điểm mạnh: tình yêu được nâng đỡ bởi cấu trúc gia đình và cộng đồng, không dồn toàn bộ gánh nặng ý nghĩa lên một người. Điểm yếu (nhìn từ hiện đại): dễ hy sinh hạnh phúc cá nhân, nhất là của phụ nữ, cho sự ổn định cấu trúc.</>],
      ["Nghĩa — khái niệm Việt không dịch được", <>Văn hoá Việt có cặp <b>tình</b> và <b>nghĩa</b>: tình là cảm xúc yêu đương; nghĩa là ơn nghĩa, sự gắn bó đạo lý tích luỹ qua năm tháng cùng vượt gian khó. ‘Một ngày nên nghĩa’ — khi tình phai, nghĩa giữ hai người ở lại; và nghĩa không phải cam chịu mà là một <i>dạng tình yêu chín</i> — gần companionate love của Sternberg nhưng mang thêm chiều đạo lý và biết ơn mà khung phương Tây không có từ tương đương.</>],
      ["Sufi (Rumi) — Người yêu như tấm gương của cái Tuyệt đối", <>Trong truyền thống Sufi, tình yêu con người là bậc thang dẫn đến tình yêu Thiêng liêng — người mình yêu phản chiếu cái đẹp của Tồn tại. Rumi mô tả tình yêu như lực làm tan rã bản ngã: không phải ‘tôi yêu em’ mà là cái tôi tan ra để chỉ còn tình yêu. Hội tụ thú vị với Plato (chiếc thang) và Phật giáo (buông ngã chấp) dù từ ba nền văn minh khác nhau.</>],
      ["Ấn Độ giáo — Prema (tình yêu thuần) vượt trên Kama (dục vọng)", <>Truyền thống Bhakti phân biệt <b>kama</b> (yêu vì thoả mãn bản thân) và <b>prema</b> (tình yêu vô vị lợi, cho đi mà không đòi). Con đường Bhakti dùng chính tình yêu đôi lứa làm phép ẩn dụ và bậc thang tới tình yêu thiêng liêng — yêu người trở thành cách luyện tập yêu vô điều kiện. Cùng mạch với Sufi và Plato: tình yêu con người là trường học của một tình yêu lớn hơn.</>],
      ["Amae (Doi Takeo) — Sự phụ thuộc ngọt ngào mà phương Tây không có từ", <>Nhà phân tâm Nhật Doi Takeo đặt tên <b>amae</b>: nhu cầu được nương tựa, được nuông chiều, được người kia bao dung với sự phụ thuộc của mình — như đứa trẻ với mẹ, nhưng ở người lớn. Văn hoá phương Tây thường bệnh lý hoá điều này (‘lệ thuộc’), nhưng amae chỉ ra một chiều lành mạnh của gắn bó: được phép cần nhau, được phép ‘làm nũng’, là một phần của thân mật sâu — miễn là qua lại.</>],
      ["Nho giáo — Nhân (仁) và tình yêu có thứ bậc", <>Khổng–Mạnh: <b>nhân</b> (lòng người, thương người) là đức gốc, nhưng tình thương có <i>thứ bậc và mở rộng dần</i> — yêu người thân trước, rồi lan ra. Khác agape Kitô giáo (yêu mọi người như nhau), đây là tình yêu ‘phân tầng’ đặt nền trên gia đình. Điểm mạnh thực tế: tình yêu đôi lứa được neo trong một mạng bổn phận rộng, bền hơn; điểm yếu: cá nhân, nhất là phụ nữ, dễ bị hy sinh cho cấu trúc.</>],
    ],
  },
  {
    key: "psy", title: "Phân tâm & Lâm sàng", color: "#5E8A86",
    items: [
      ["Freud — Yêu là tìm lại (refinding)", <>Mọi tình yêu trưởng thành đều là sự ‘tìm lại’ khuôn mẫu yêu thương đầu đời — ta không yêu một người xa lạ, ta nhận ra một điều quen thuộc. Chuyển di (transference) không chỉ xảy ra trong phòng trị liệu: ta liên tục phóng chiếu những nhân vật quá khứ lên người yêu hiện tại. Giá trị thực hành: khi phản ứng cảm xúc <i>mạnh bất thường so với tình huống</i>, rất có thể mình đang phản ứng với một ai đó khác trong quá khứ.</>],
      ["Jung — Yêu là gặp Anima/Animus của chính mình", <>‘Tiếng sét ái tình’ phần lớn là <b>phóng chiếu</b>: ta gặp một người mang phẩm chất mình chưa tích hợp được (anima/animus) và trút hình ảnh nội tâm đó lên họ. Giai đoạn ‘vỡ mộng’ là lúc phóng chiếu rút về — không phải cái chết của tình yêu mà là <b>cơ hội đầu tiên để yêu con người thật</b>. Người mình bị hút mãnh liệt nhất thường tiết lộ phần mình còn thiếu.</>],
      ["Object Relations (Winnicott, Fairbairn) — Ta yêu theo bản đồ nội tâm", <>Ta mang trong mình các ‘mô hình quan hệ nội tâm hoá’ từ thơ ấu — và vô thức <b>tuyển chọn</b> đối tác khớp với mô hình đó, kể cả khi nó gây đau khổ. Đây là lời giải cho ‘tại sao mình cứ yêu đúng một kiểu người làm mình khổ?’: không phải xui rủi, mà là sự quen thuộc được vô thức ưu tiên hơn sự lành mạnh. Repetition compulsion — lặp lại để hy vọng lần này kết cục sẽ khác.</>],
      ["Esther Perel — Nghịch lý Tình yêu vs. Ham muốn", <>Tình yêu và ham muốn nuôi bằng hai nguồn <b>đối nghịch</b>. Tình yêu cần gần gũi, an toàn, quen thuộc. Ham muốn cần khoảng cách, bí ẩn, mới lạ. Vì thế các cặp càng ‘hoà làm một’ càng dễ mất lửa — không phải hết yêu mà vì <b>không còn khoảng cách để khao khát băng qua</b>. Câu trả lời phổ biến cho ‘khi nào bạn thấy bị hút về partner nhất?’: khi thấy họ từ xa, tự tin, làm điều họ giỏi — tức khi họ <i>tạm thời không thuộc về mình</i>.</>],
      ["Dorothy Tennov — Limerence: gọi đúng tên cơn say", <>Tennov tách trạng thái si mê ám ảnh ra khỏi tình yêu: suy nghĩ xâm lấn về đối tượng, nhu cầu được đáp lại mãnh liệt, tâm trạng phụ thuộc hoàn toàn vào tín hiệu của họ, lý tưởng hoá tối đa. Mấu chốt: limerence <b>mạnh nhất khi có sự bất định</b> — được đáp lại hoàn toàn hoặc bị từ chối dứt khoát đều làm nó tắt. Thứ nuôi limerence không phải người kia, mà là <i>sự không chắc chắn về người kia</i>. Cơ chế giải thích vì sao ‘người khó nắm bắt’ gây nghiện hơn người sẵn lòng.</>],
      ["Self-Expansion (Arthur & Elaine Aron)", <>Con người có động lực nền tảng là <b>mở rộng bản thân</b> — và tình yêu là con đường nhanh nhất: khi yêu, ta ‘sáp nhập’ tài nguyên, góc nhìn, bản sắc của người kia vào chính mình. Giải thích hai hiện tượng: (1) cảm giác ‘phê’ giai đoạn đầu = tốc độ mở rộng cực nhanh; (2) nhàm chán về sau = tốc độ chậm lại, không phải tình yêu giảm. Liều thuốc thực chứng: làm điều <b>mới và thử thách cùng nhau</b> khôi phục cảm giác yêu, vì nó khởi động lại quá trình mở rộng.</>],
      ["Bowlby & Ainsworth — Lý thuyết Gắn bó: nền tảng của tình yêu người lớn", <>Bowlby: con người sinh ra với một <b>hệ thống gắn bó</b> tiến hoá để tìm sự gần gũi với người chăm sóc khi thấy đe doạ. Ainsworth đo được các ‘kiểu’ gắn bó ở trẻ (an toàn / lo âu / né tránh). Hazan & Shaver (1987) chứng minh <b>tình yêu người lớn cũng là một quá trình gắn bó</b> — partner trở thành ‘bến an toàn’ và ‘cơ sở an toàn’. Đây có lẽ là khung thực dụng nhất trong cả tài liệu; nó được trải chi tiết ở tab hành trình.</>],
      ["Sternberg — Tam giác Tình yêu", <>Robert Sternberg: mọi tình yêu là tổ hợp của ba thành tố — <b>Thân mật</b> (gần gũi, gắn kết), <b>Đam mê</b> (hấp dẫn, khao khát), <b>Cam kết</b> (quyết định duy trì). Các tổ hợp khác nhau tạo ra các <i>loại</i> tình yêu khác nhau (say mê, bạn đời, trọn vẹn…). Giá trị lớn nhất: cho ta ngôn ngữ để hỏi ‘mối quan hệ này đang mạnh/yếu ở thành tố nào?’ thay vì phán xét nhị phân ‘còn yêu / hết yêu’.</>],
      ["Barbara Fredrickson — Tình yêu là những ‘vi khoảnh khắc’ cộng hưởng", <>Fredrickson đề xuất một định nghĩa khoa học gây tranh cãi nhưng gợi mở: tình yêu không phải một trạng thái bền vững với một người, mà là những <b>vi khoảnh khắc cộng hưởng tích cực</b> (positivity resonance) — khoảnh khắc hai người cùng chia sẻ một cảm xúc tốt, đồng bộ sinh lý và quan tâm lẫn nhau. Hàm ý cấp tiến: tình yêu được ‘bồi đắp’ hay ‘bỏ đói’ từng khoảnh khắc nhỏ trong ngày, không phải được ‘sở hữu’ một lần.</>],
    ],
  },
  {
    key: "soc", title: "Xã hội học", color: "#5C86A0",
    items: [
      ["Giddens — ‘Quan hệ thuần khiết’", <>Xã hội truyền thống neo hôn nhân bằng kinh tế, dòng họ, tôn giáo. Hiện đại hoá tước dần các neo đó, để lại <b>pure relationship</b>: chỉ tồn tại chừng nào cả hai còn thấy nó thoả mãn. Được: tự do, bình đẳng chưa từng có. Mất: mối quan hệ trở nên <b>bất định cấu trúc</b> — luôn có thể bị chấm dứt, nên luôn phải ‘chứng minh giá trị’, tạo một dạng lo âu hiện sinh mới mà ông bà ta không biết đến.</>],
      ["Eva Illouz — Tình yêu trong chủ nghĩa tư bản cảm xúc", <>Illouz phân tích tình yêu hiện đại như một <b>thị trường</b>: dating apps biến con người thành hồ sơ so sánh được, tạo ‘nền kinh tế dư thừa lựa chọn’ — khi luôn có thể có người ‘tốt hơn’ sau một cú vuốt, cam kết thành quyết định phi lý về mặt thị trường. Bà chỉ ra sự bất cân xứng: khả năng <i>không ràng buộc</i> (detachment) trở thành vị thế quyền lực. Nỗi đau tình yêu hiện đại không phải thất bại cá nhân mà là <b>sản phẩm cấu trúc</b> của cách xã hội tổ chức sự lựa chọn.</>],
      ["Zygmunt Bauman — ‘Tình yêu lỏng’", <>Con người hiện đại mắc kẹt giữa hai nỗi sợ: sợ cô đơn và sợ bị ràng buộc. Kết quả là các ‘quan hệ bỏ túi’ — đủ gần để không cô đơn, đủ lỏng để rút ra bất kỳ lúc nào. Cảnh báo: kỹ năng yêu — vốn cần học qua việc <i>ở lại</i> khi khó khăn — đang teo dần vì ta được huấn luyện thay thế (replace) thay vì sửa chữa (repair), với quan hệ cũng như với đồ vật.</>],
      ["Nhân học — Tình yêu lãng mạn: phổ quát nhưng được văn hoá định hình", <>Jankowiak & Fischer (1992) trên 166 nền văn hoá tìm thấy tình yêu lãng mạn ở ~89% — bác bỏ quan điểm nó là ‘phát minh của phương Tây’. Cái được văn hoá quyết định là <b>vai trò</b> của nó: nền tảng hôn nhân, thứ đến <i>sau</i> hôn nhân, hay thứ nguy hiểm cần kiểm soát. Dữ liệu thú vị: một số nghiên cứu về hôn nhân sắp đặt cho thấy mức hài lòng dài hạn không thua hôn nhân tình yêu — gợi ý cam kết và kỹ năng vun đắp có thể quan trọng ngang việc ‘chọn đúng người’.</>],
      ["Ngôn ngữ — Ta chỉ cảm được thứ ta gọi tên được (một phần)", <>Tiếng Hy Lạp cổ có 6-7 từ cho tình yêu (eros, philia, storge, agape, ludus, pragma, philautia); tiếng Việt phân biệt thương/yêu/tình/nghĩa. Người nói tiếng Việt hiểu ngay ‘thương’ khác ‘yêu’ (thương trầm hơn, bao dung hơn, ít chiếm hữu hơn) — sắc thái tiếng Anh phải diễn giải dài dòng. Bài học: nghèo từ vựng cảm xúc làm nghèo chính trải nghiệm yêu; giàu từ vựng giúp nhận diện và giao tiếp cảm xúc tinh vi hơn.</>],
      ["Beck & Beck-Gernsheim — ‘Sự hỗn loạn bình thường của tình yêu’", <>Trong xã hội cá nhân hoá, khi tôn giáo và truyền thống mất quyền định nghĩa, tình yêu bị đẩy lên thành <b>nguồn ý nghĩa và ‘tôn giáo thế tục’ mới</b> — ta trút lên bạn đời kỳ vọng mà xưa cả cộng đồng và đức tin gánh. Kết quả tất yếu là căng thẳng: một người không thể là tất cả. Nỗi bất ổn của tình yêu hiện đại không phải do ta kém cỏi, mà do gánh nặng ý nghĩa đặt lên nó lớn chưa từng có.</>],
      ["Arlie Hochschild — Lao động cảm xúc và sự thương mại hoá thân mật", <>Hochschild chỉ ra ‘lao động cảm xúc’: công sức vô hình để quản lý cảm xúc (của mình và người kia) trong quan hệ — thường do phụ nữ gánh và ít được nhìn nhận. Bà cũng cảnh báo xu hướng thị trường xâm nhập đời sống thân mật (thuê ngoài chăm sóc, coaching hẹn hò, tối ưu hoá quan hệ như dự án). Bài học thực hành: nhận diện và chia sẻ công bằng lao động cảm xúc là một phần của công bằng trong tình yêu.</>],
      ["Lauren Berlant — ‘Lạc quan tàn nhẫn’", <>Berlant đặt tên <b>cruel optimism</b>: khi chính đối tượng ta bám vào để hạnh phúc lại là thứ cản trở ta phát triển — ví dụ bám vào một hình mẫu tình yêu lãng mạn ‘mãi mãi hạnh phúc’ khiến ta chịu đựng những quan hệ thật đang bào mòn mình. Nhận diện điều này giúp phân biệt hy vọng nuôi dưỡng với hy vọng giam cầm.</>],
    ],
  },
  {
    key: "bio", title: "Thần kinh & Tiến hoá", color: "#C0839C",
    items: [
      ["Helen Fisher — Ba hệ thống não độc lập", <>Fisher (fMRI) chỉ ra tình yêu không phải một thứ mà là <b>ba hệ thống não tách biệt, tiến hoá cho ba việc khác nhau</b>: (1) <b>Ham muốn</b> — thúc đẩy tìm bạn tình nói chung; (2) <b>Hấp dẫn lãng mạn</b> — dồn năng lượng vào một người cụ thể; (3) <b>Gắn bó</b> — giữ hai người ở bên nhau đủ lâu để nuôi con. Ba hệ này <i>không luôn đồng bộ</i> — có thể gắn bó sâu với người này mà ham muốn người khác. Hiểu điều đó giải thoát ta khỏi ảo tưởng ‘một người phải thắp mọi ngọn lửa mãi mãi’.</>],
      ["Hoá học của cơn say vs. hoá học của sự bền", <>Giai đoạn say: <b>dopamine</b> cao (khoái cảm, tập trung ám ảnh, động lực), <b>norepinephrine</b> (tim đập, mất ngủ, chán ăn), và <b>serotonin THẤP</b> — giống trạng thái ám ảnh cưỡng chế, nên ta không ngừng nghĩ về người kia. Giai đoạn gắn bó: <b>oxytocin</b> (‘hormone ôm ấp’, tin cậy) và <b>vasopressin</b> (chung thuỷ, bảo vệ) — bình lặng hơn nhưng bền. Chìa khoá: hai bộ hoá học này khác nhau về bản chất — mất ‘cơn phê’ không phải mất tình yêu, mà là sinh học chuyển chế độ.</>],
      ["Vì sao con người kết đôi (và vì sao khó chung thuỷ)", <>Tiến hoá: con người non nớt rất lâu sau khi sinh, nên chọn lọc ưu ái các cặp ở bên nhau đủ để cùng nuôi con — pair bonding là một chiến lược sinh tồn, không phải quy luật đạo đức trời ban. Nhưng cùng bộ gen cũng mang ‘hiệu ứng Coolidge’: dopamine sụt với sự quen thuộc và tăng vọt với cái mới — cơ sở <b>sinh học</b> của nghịch lý Perel (ham muốn cần mới lạ). Sinh học giải thích cám dỗ; nó không quyết định lựa chọn.</>],
      ["Gắn bó là một hệ thống sinh tồn, không phải sự yếu đuối", <>Bowlby: nhu cầu gần gũi khi thấy đe doạ là một cơ chế tiến hoá cổ, chung với các loài có vú. Vì thế cảm giác hoảng loạn khi bị người yêu phớt lờ <b>không phải ‘làm quá’</b> — đó là hệ báo động sinh tồn đang chạy. Và ‘co-regulation’: hệ thần kinh của hai người yêu nhau thật sự điều hoà lẫn nhau — nhịp tim, hormone căng thẳng đồng bộ. Một cái ôm an toàn hạ cortisol đo được. Tình yêu, ở tầng sâu nhất, là hai hệ thần kinh trở thành nơi trú an toàn cho nhau.</>],
      ["Giới hạn của lăng kính sinh học", <>Quan trọng: giải thích được <i>cơ chế</i> không phải giải thích được <i>ý nghĩa</i>. Biết dopamine gây say không làm cơn say kém thật; biết oxytocin tạo gắn bó không làm sự chung thuỷ kém đáng quý. Sinh học cho ta <b>bản đồ địa hình</b> — vì sao dễ trượt chỗ này, vì sao dốc chỗ kia — nhưng việc đi đường nào vẫn là lựa chọn của con người, nơi triết học và đạo đức lên tiếng. Đừng dùng ‘tại hoá học’ để chối bỏ trách nhiệm.</>],
    ],
    quote: ["The main problems in a relationship are often problems of brain chemistry meeting free will.", "Phỏng theo Helen Fisher — phần lớn vấn đề trong tình yêu là nơi hoá học não gặp ý chí tự do"],
  },
];

/* essence synthesis */
const ESSENCE = [
  ["Yêu là một cách NHÌN, trước khi là một cảm giác", "Murdoch (chú ý), Thích Nhất Hạnh (hiểu), Fromm (knowledge), Phật giáo (buông ngã chấp) — bốn truyền thống độc lập hội tụ về một điểm: hành vi cốt lõi của tình yêu là thấy người kia như một thực thể riêng, thật, không phải màn hình chiếu nhu cầu của mình. Kẻ thù chung của tình yêu, theo cả bốn, là cái tôi phóng chiếu."],
  ["Yêu trưởng thành là cho, không phải lấy", "Aristotle (muốn điều tốt vì lợi ích của người kia), Fromm (‘cần vì yêu’, không ‘yêu vì cần’), bell hooks (mở rộng bản thân để nuôi dưỡng người khác). Tình yêu chưa trưởng thành hỏi ‘người này cho tôi gì?’; tình yêu chín hỏi ‘tôi có thể nuôi dưỡng sự sống của người này thế nào?’ Cùng một cảm xúc, hai cấu trúc quyền lực đảo ngược."],
  ["Yêu cần khoảng cách để tồn tại", "Rilke (hai sự cô đơn bảo vệ nhau), Perel (ham muốn cần khoảng cách), Sartre & de Beauvoir (hai chủ thể tự do), Đạo giáo (vô vi). Nghịch lý trung tâm: hoà tan hoàn toàn thì không còn ‘hai người’ để yêu nhau. Sự tách biệt không phải thất bại của gần gũi — nó là điều kiện của gần gũi."],
  ["Yêu là một thực hành, không phải một trạng thái", "Fromm (nghệ thuật cần kỷ luật), Kierkegaard (yêu là bổn phận bền hơn cảm hứng), hooks (động từ), ‘nghĩa’ của người Việt (xây qua năm tháng). Cảm giác đến rồi đi; điều giữ tình yêu sống là hành động lặp lại có chủ đích. Đây là cầu nối tới tab Thực hành."],
  ["Yêu ôm lấy sự hữu hạn", "Xả của Phật giáo, mono no aware của Nhật, trị liệu hiện sinh (Yalom): mọi tình yêu đều kết thúc bằng chia ly hoặc cái chết. Nhìn thẳng điều đó không làm tình yêu u ám mà làm nó sắc nét. Chính tính hữu hạn tạo ra sự quý giá — và năng lực buông tay tử tế cũng là một phần của yêu."],
];

/* ============ JOURNEY TAB ============ */
const PARADOX = [
  ["An toàn ↔ Ham muốn", "Tình yêu cần quen thuộc; ham muốn cần bí ẩn (Perel). Ôm chặt quá thì lửa tắt, buông lỏng quá thì mất kết nối. Không có điểm cân bằng cố định — chỉ có sự điều chỉnh liên tục."],
  ["Tự do ↔ Ràng buộc", "Cam kết tước đi một số tự do — nhưng chính giới hạn đó tạo chiều sâu mà tự do vô hạn không đạt được (như thơ hay hơn nhờ luật thơ). Người từ chối mọi ràng buộc để ‘giữ tự do’ thường chỉ tự do ở bề mặt của mọi thứ."],
  ["Hoà nhập ↔ Bản sắc riêng", "Yêu là muốn hoà làm một; nhưng hoà tan hoàn toàn thì không còn ‘hai người’ để yêu nhau. Rilke: tình yêu trưởng thành là ‘hai sự cô đơn bảo vệ, giáp ranh và chào đón nhau’."],
  ["Biết rõ ↔ Còn bí ẩn", "Ta muốn được thấu hiểu hoàn toàn — nhưng cảm giác ‘đã biết hết về nhau’ giết chết sự tò mò. Sự thật giải thoát: không ai biết hết một con người, kể cả sau 50 năm — ‘đã biết hết’ luôn là ảo tưởng của sự lười tò mò."],
  ["Vô điều kiện ↔ Có ranh giới", "Tình thương có thể vô điều kiện, nhưng mối quan hệ luôn có điều kiện (tôn trọng, an toàn, chung thuỷ). Nhầm hai tầng này sinh bi kịch: chịu đựng lạm dụng nhân danh ‘yêu vô điều kiện’. Có thể thương một người vô điều kiện VÀ rời bỏ mối quan hệ với họ."],
  ["Lựa chọn ↔ Số phận", "Cảm giác ‘định mệnh’ làm tình yêu thiêng liêng; nhưng tin hoàn toàn vào định mệnh làm ta thụ động. Nghiên cứu implicit theories (Knee): người tin ‘destiny belief’ bỏ cuộc nhanh khi trục trặc; người tin ‘growth belief’ — tình yêu được xây — bền hơn đáng kể."],
  ["Yêu người kia ↔ Yêu chính mình", "Không phải trade-off: người tự trắc ẩn tốt hơn cũng là partner tốt hơn. Nhưng dùng ‘self-love’ làm lá chắn để né mọi hy sinh cũng là một dạng nghèo nàn. Fromm giải nghịch lý: yêu mình và yêu người là cùng MỘT năng lực — ai không yêu nổi mình thì cái ‘yêu người’ của họ thường là nhu cầu đội lốt."],
];

const FROMM4 = [
  ["Care — Chăm sóc", "Quan tâm chủ động đến sự sống và phát triển của người mình yêu. Yêu mà không hành động chăm sóc thì chỉ là cảm xúc suông — ‘yêu hoa mà quên tưới nước’."],
  ["Responsibility — Trách nhiệm", "Không phải nghĩa vụ áp đặt từ ngoài, mà là sự sẵn sàng đáp lại nhu cầu — nhất là nhu cầu tâm lý — của người kia. Yêu là tự nguyện trở thành người ‘có thể được gọi đến’."],
  ["Respect — Tôn trọng", "Từ gốc Latin respicere = ‘nhìn’. Năng lực nhìn người kia như họ là, và muốn họ phát triển theo cách của họ — vì chính họ, không phải để phục vụ mình. Không có tôn trọng, trách nhiệm biến thành kiểm soát."],
  ["Knowledge — Hiểu biết", "Hiểu vượt bề mặt: thấy cơn giận là nỗi lo âu bên dưới, thấy im lặng là tổn thương chưa nói được. Knowledge nuôi 3 yếu tố còn lại — không hiểu thì care, responsibility, respect đều bắn trượt."],
];

const DARK = [
  ["Yêu như sự trốn chạy chính mình", "Fromm cảnh báo tình yêu như ‘thoát khỏi cô đơn không chịu nổi’ — hai người dùng nhau làm nơi trốn thay vì làm bạn đồng hành. Dấu hiệu: không chịu được một mình dù một tối; lấp mọi khoảng lặng bằng người kia. Kiểm tra: nếu bình yên chỉ tồn tại khi có mặt người kia, đó là phụ thuộc hoá trang, chưa phải yêu."],
  ["Yêu như dự án cải tạo", "‘Mình sẽ thay đổi được họ’ — yêu tiềm năng thay vì con người hiện tại. Bản chất: một dạng không tôn trọng được lãng mạn hoá. Người kia cảm nhận được mình là công trình dở dang trong mắt bạn — và không ai thấy được yêu khi bị nhìn như bản nháp."],
  ["‘Nguyên tắc quan tâm ít nhất’", "Waller (1938): trong mọi mối quan hệ, người quan tâm ít hơn nắm quyền nhiều hơn. Khi một bên cố tình duy trì sự hờ hững như chiến lược quyền lực (giữ người kia bất an để dễ kiểm soát), đó là thao túng, không phải ‘cá tính lạnh lùng’. Cũng để tự soi: mình có đang vô thức dùng sự thờ ơ làm vũ khí không?"],
  ["Love bombing → Devaluation → Discard", "Chu trình thao túng: dội bom yêu thương (quà, lời hứa, ‘em là định mệnh’ sau 2 tuần) → hạ giá trị dần → vứt bỏ hoặc đe doạ vứt bỏ. Điểm hiểm: giai đoạn đầu tạo ‘liều dopamine chuẩn’ mà nạn nhân đuổi theo suốt (intermittent reinforcement — gây nghiện như máy đánh bạc). Nhận diện quan trọng nhất: tốc độ và cường độ bất thường ngay từ đầu là cờ đỏ, không phải cờ hồng."],
  ["Ghen tuông — tín hiệu kép", "Tiến hoá học (Buss): ghen là cơ chế bảo vệ có từ xa xưa — một mức độ là bình thường, thậm chí báo hiệu đầu tư. Ranh giới nằm ở hành vi nó sinh ra: ghen được nói ra và xử lý cùng nhau = lành mạnh; ghen chuyển thành giám sát, kiểm soát, cô lập = đã sang lãnh thổ chiếm hữu. ‘Ghen vì yêu’ — nhưng hooks đã trả lời: hành vi làm tổn thương và tình yêu không cùng tồn tại trong một hành động."],
  ["Khi rời đi là hành động yêu thương", "Đôi khi buông tay là biểu hiện cao nhất của tình thương — với người kia (không giữ họ trong mối quan hệ mình không còn hiện diện thật) và với chính mình (Xả của Phật giáo, self-respect hiện sinh). Văn hoá tôn vinh ‘chiến đấu đến cùng’ nhưng im lặng về trí tuệ nhận ra khi cuộc chiến đó đang phá huỷ cả hai. Tình yêu trưởng thành gồm cả năng lực kết thúc tử tế."],
];

/* ============ PRACTICE — clean 5-part structure ============ */
const DIAG_Q = [
  ["‘Mình yêu con người này, hay yêu những gì họ mang lại cho mình?’", "Aristotle. Nếu bỏ đi tiện ích/khoái lạc họ đem lại, tình cảm còn không?"],
  ["‘Mình có thật vui khi họ hạnh phúc mà niềm vui đó không liên quan đến mình không?’", "Mudita. Nếu niềm vui riêng của họ làm bạn bất an — đó là ái-bám-víu cần xử lý, không phải thương."],
  ["‘Phản ứng cảm xúc của mình có tương xứng với tình huống thật không?’", "Freud/transference. Khi phản ứng mạnh bất thường, hỏi: ‘điều này làm mình nhớ đến ai trong quá khứ?’"],
  ["‘Mình đang yêu con người thật của họ, hay phiên bản mình muốn họ trở thành?’", "Jung + Murdoch + de Botton. Nếu hay nghĩ ‘giá mà họ…’, bạn đang yêu bản nháp."],
  ["‘Sự bình yên của mình có tồn tại được khi họ vắng mặt không?’", "Fromm/Schnarch. Nếu bình yên chỉ có khi có họ — đó là phụ thuộc hoá trang."],
  ["‘Cường độ tình cảm đang được nuôi bằng kết nối thật, hay bằng sự bất định?’", "Tennov. Nếu cảm xúc bùng lên khi họ khó nắm bắt và nguội khi họ ổn định rõ ràng — bạn nghiện bất định, không yêu người đó."],
];

const T2A = [
  ["Murdoch / Fromm / Phật giáo — kẻ thù của yêu là cái tôi phóng chiếu", "Mỗi tối hỏi ‘hôm nay mình học được điều gì MỚI về người này?’ Nhiều ngày không có câu trả lời = bạn đã ngừng nhìn họ. Tuần này: hỏi họ một câu bạn chưa từng hỏi."],
  ["Perel — tình yêu cần gần, ham muốn cần khoảng cách", "Đừng theo dõi nhau 24/7. Chủ động có đời sống riêng — không phải để ‘giữ giá’ mà vì khoảng cách tạo ra thứ để khao khát băng qua."],
  ["Gottman — tỷ lệ 5:1, bids for connection", "Đếm trong 1 ngày: mình đáp lại hay phớt lờ những tín hiệu nhỏ của họ? Mỗi lời tiêu cực cần ~5 tương tác tích cực để cân bằng. Một lời trân trọng cụ thể mỗi ngày — nói ra, không nghĩ thầm."],
  ["Fromm — Care / Responsibility / Respect / Knowledge", "Chọn 1 trong 4 yếu tố bạn yếu nhất tháng này. Yếu Knowledge? → mỗi tuần một câu hỏi sâu về nội tâm họ. Biến trừu tượng thành 1 hành vi/tuần."],
  ["de Botton — yêu ‘người sai phù hợp’", "Ngừng hỏi ‘người này có đúng không’. Hỏi ‘mình sẵn sàng thương lượng với bộ khiếm khuyết NÀO của họ?’ và ‘bộ khiếm khuyết của MÌNH mà họ phải chịu là gì?’ Chia sẻ với nhau."],
  ["Aron — làm điều mới cùng nhau", "Lịch ‘điều mới mỗi tháng’: một hoạt động cả hai chưa từng làm và hơi thử thách. Chính sự mới + thử thách khôi phục cảm giác yêu, không phải quà cáp."],
];

const REPAIR = [
  ["Bước 0 · Nhận diện ‘flooding’ (quá tải)", "Gottman", "Khi tim đập nhanh, não chuyển sang chế độ sinh tồn — không còn khả năng đối thoại lý trí. Dấu hiệu: nghẹn cổ, muốn hét hoặc bỏ đi, đầu trắng xoá.", "‘Em/anh đang quá tải, cần 20 phút để bình tĩnh, mình nói tiếp sau nhé.’ — rồi THỰC SỰ quay lại đúng hẹn (khác biệt giữa tự làm dịu lành mạnh và stonewalling né tránh)."],
  ["Bước 1 · Khởi đầu mềm", "Gottman", "Cách mở màn quyết định phần lớn kết cục. Công thức: Cảm xúc + Tình huống cụ thể + Nhu cầu tích cực. Không ‘anh lúc nào cũng…’, không ‘em chẳng bao giờ…’.", "‘Em thấy cô đơn khi tối qua anh xem điện thoại suốt bữa ăn. Em cần mình có 20 phút không màn hình khi ăn cùng nhau.’"],
  ["Bước 2 · Nhìn xuống dưới cơn giận của họ", "Thích Nhất Hạnh + object relations", "Cơn giận gần như luôn là lớp vỏ của một tổn thương hoặc nỗi sợ. Thay vì phản pháo lớp vỏ, hỏi về lớp dưới.", "‘Anh nghe thấy em đang rất bực. Bên dưới cơn bực đó, em đang sợ hay tổn thương điều gì vậy?’ — câu này gần như luôn hạ nhiệt."],
  ["Bước 3 · Nhận trách nhiệm phần mình", "Gottman", "Không cần nhận 100% lỗi — chỉ cần tìm 1 phần thật là của mình và thừa nhận. Điều này phá vỡ vòng xoáy phòng thủ ngay lập tức.", "‘Em hiểu vì sao anh khó chịu. Phần em cắt lời anh giữa chừng là em sai, em xin lỗi.’"],
  ["Bước 4 · Sửa lỗi & kết nối lại", "Gottman", "Một mối quan hệ khoẻ không phải không cãi nhau, mà là biết quay lại với nhau sau đó. Repair có thể bằng lời, một cử chỉ, hoặc chút hài hước đã thoả thuận trước.", "‘Mình vừa hơi căng. Em vẫn ở phía anh nhé. Mình thử lại từ đầu được không?’"],
];

const INNER = [
  ["Bản đồ phóng chiếu", "Jung", "Viết 3 điều làm bạn khó chịu nhất ở partner. Với mỗi điều, hỏi: ‘phẩm chất này có tồn tại ở mình dưới dạng nào không — kể cả dạng mình chối bỏ?’ Điều ta phản ứng mạnh nhất ở người khác thường là phần bị chối bỏ ở chính mình."],
  ["Cây phả hệ tình yêu", "Object relations", "Vẽ cách bố mẹ/người nuôi bạn thể hiện tình yêu, xử lý xung đột, gần gũi. Rồi hỏi: ‘mình đang lặp lại điều gì? Đang phản kháng lại điều gì một cách cực đoan?’ Cả hai đều là bị quá khứ điều khiển, chỉ khác chiều."],
  ["Kiểm kê nhu cầu chưa được đáp ứng", "Fromm/attachment", "Liệt kê: ‘mình đang mong partner lấp đầy nhu cầu nào mà đúng ra là việc của mình?’ (giá trị bản thân, ý nghĩa sống, sự bình yên). Mỗi nhu cầu bạn tự đáp ứng được là một gánh nặng gỡ khỏi vai mối quan hệ."],
  ["Ngồi với cô đơn", "Fromm/Rilke", "Mỗi tuần một buổi tối hoàn toàn một mình, không lấp bằng màn hình hay gọi ai. Mục tiêu không phải chịu đựng mà là xây năng lực ‘ở với chính mình’ — nền để yêu mà không bám víu. Nếu thấy hoảng, đó chính là thông tin quan trọng."],
];

const PHRASES = [
  ["‘Anh lúc nào cũng vô tâm.’", "‘Em thấy tủi thân khi lời nhắn của em không được trả lời cả ngày.’"],
  ["‘Sao em không bao giờ hiểu anh?’", "‘Anh đang thấy khó nói ra điều này. Em nghe anh một chút nhé?’"],
  ["‘Tuỳ anh.’ / ‘Không sao đâu.’ (khi thật ra có sao)", "‘Em thật sự có mong muốn về việc này, để em nói rõ nhé.’"],
  ["‘Nếu yêu em thì anh phải tự biết.’", "‘Em biết anh không đọc được suy nghĩ của em, nên em nói thẳng: em cần…’"],
  ["‘Em ổn.’ (rồi rút lui im lặng)", "‘Em chưa ổn, em cần chút thời gian rồi mình nói tiếp, không phải em bỏ cuộc.’"],
  ["‘Người yêu cũ của anh chẳng bao giờ làm thế.’", "(bỏ hoàn toàn — so sánh là một dạng khinh miệt, cờ đỏ mạnh nhất của Gottman)"],
];

const TRAPS = [
  ["Biến lý thuyết thành vũ khí", "Dùng kiến thức để ‘chẩn đoán’ và dán nhãn partner (‘anh đúng kiểu né tránh’, ‘em bị trauma bonding đấy’). Đây là khinh miệt đội lốt hiểu biết. Kiến thức là để soi MÌNH trước."],
  ["Kỳ vọng thay đổi tức thì", "Bản đồ nội tâm hình thành qua nhiều năm, không đổi trong một tuần. Tiến bộ theo đường xoắn ốc, không thẳng — sẽ có lúc trượt lại pattern cũ, đó là bình thường."],
  ["Nhầm ‘làm việc nội tâm’ với tự trách", "Soi chiếu bản thân ≠ tự đánh mình. Nếu bài tập nội tâm khiến bạn thấy tồi tệ thay vì hiểu và bao dung hơn, bạn đang làm sai tinh thần của nó."],
  ["Áp dụng một chiều", "Nếu chỉ một người nỗ lực, kỹ thuật giao tiếp có giới hạn. Bạn kiểm soát được nửa của mình; nếu nỗ lực chân thành kéo dài mà nửa kia không đáp lại, đó cũng là thông tin cần lắng nghe."],
  ["Dùng ‘self-love/ranh giới’ để né mọi hy sinh", "Vế ngược của bám víu. Yêu trưởng thành vẫn gồm nhường nhịn, hy sinh đúng lúc. ‘Bảo vệ năng lượng của tôi’ dùng sai chỗ chỉ là ích kỷ có học."],
  ["Tưởng cường độ là chiều sâu", "Sau khi hiểu limerence, dễ rơi vào cực ngược: nghi mọi cảm xúc mạnh là ‘không lành mạnh’. Phân biệt: cường độ nuôi bằng bất định (đáng ngờ) vs. cường độ trên nền hiểu biết và nhất quán (lành mạnh)."],
];

/* maturity synthesis signs */
const MATURE_SIGNS = "Yêu con người thật, không phải phóng chiếu (Jung, Murdoch) • Nhu cầu là hệ quả của yêu, không phải nguyên nhân (Fromm) • Vui được với hạnh phúc của người kia kể cả khi không có mình (mudita) • Giữ được bản sắc riêng trong sự gần gũi (Schnarch, Rilke, de Beauvoir) • Coi bất đồng là thông tin, không phải đe doạ (Gottman) • Hiểu ham muốn cần khoảng cách và chủ động nuôi khoảng cách đó (Perel) • Biết tình yêu là thực hành hằng ngày, không phải trạng thái đạt một lần (hooks, Fromm) • Chấp nhận ‘người sai phù hợp’ thay vì tìm người hoàn hảo (de Botton) • Có năng lực kết thúc tử tế khi cần — và biết đó cũng là yêu.";

/* NEW: love & trauma */
const TRAUMA = [
  ["Vì sao trauma định hình cách ta yêu", "Sang chấn gắn bó thời thơ ấu (bị bỏ rơi, không nhất quán, xâm phạm) tạo ra ‘mô hình vận hành nội tâm’ về việc gần gũi có an toàn không. Hệ thần kinh học được rằng thân mật đi kèm nguy hiểm — nên ngay giữa một mối quan hệ an toàn, cơ thể vẫn có thể báo động. Đây không phải ‘làm quá’; đó là hệ thần kinh đang chạy một bản đồ cũ."],
  ["Hai hướng phòng vệ", "Hyperactivation (lo âu): bám riết, dò xét, cần trấn an liên tục — ‘nếu mình đủ cảnh giác thì sẽ không bị bỏ rơi’. Deactivation (né tránh): rút lui khi quá gần, coi nhẹ nhu cầu, tự lập cực đoan — ‘nếu mình không cần ai thì không ai làm mình đau’. Cả hai là chiến lược sống sót từng hợp lý, giờ vận hành sai chỗ."],
  ["Trauma bonding — vì sao khó rời", "Chu kỳ tổn thương–xoa dịu lặp lại tạo ra một gắn kết sinh hoá mạnh (intermittent reinforcement). Não gắn sự nhẹ nhõm sau mỗi lần làm lành với chính người gây đau — nên càng đau càng dính. Nhận ra điều này giúp tách ‘cường độ của gắn kết’ khỏi ‘chất lượng của mối quan hệ’: mạnh không có nghĩa là lành."],
  ["Người yêu KHÔNG phải nhà trị liệu", "Một partner có thể là môi trường chữa lành (‘earned secure’ — an toàn có được nhờ trải nghiệm sửa chữa), nhưng không thể là người điều trị trauma cho bạn. Kỳ vọng người kia ‘chữa’ mình đặt lên họ gánh nặng không thể mang, và thường tái hiện chính động lực cũ. Trauma sâu cần công việc riêng (trị liệu), song song với mối quan hệ."],
];

const TRAUMA_REPAIR = [
  ["Đặt tên cho bản đồ cũ", "Khi bị kích hoạt, tập nói (với chính mình trước): ‘đây là vết thương cũ đang lên tiếng, không phải toàn bộ sự thật về lúc này’. Tách phản ứng khỏi hiện thực là bước đầu — không dập tắt cảm xúc, mà thêm một người quan sát bên cạnh nó."],
  ["Cửa sổ chịu đựng & tự điều hoà", "Học nhận ra sớm dấu hiệu cơ thể rời khỏi vùng bình tĩnh (tim đập, tê, muốn bỏ chạy). Có sẵn cách kéo mình về: thở ra dài, nối đất, tạm dừng có thời hạn. Không thể xử lý quan hệ khi hệ thần kinh đang báo động."],
  ["Nói ra vết thương thay vì diễn nó ra", "Thay vì hành động từ nỗi sợ (bám hoặc rút), tập nói thành lời: ‘khi anh im lặng, một phần trong em sợ bị bỏ rơi — em biết có thể không đúng, nhưng em cần nói ra’. Đây là chuyển từ tái hiện (reenactment) sang giao tiếp."],
  ["Sửa chữa nhỏ, lặp lại, đúng hẹn", "Chữa lành gắn bó xảy ra qua hàng trăm trải nghiệm nhỏ: một lần được trấn an thật, một lần được quay lại sau xung đột, một lời hứa được giữ. Lòng tin không xây bằng một cuộc nói chuyện lớn mà bằng sự nhất quán qua thời gian."],
  ["Biết khi nào cần chuyên gia", "Nếu các cơn kích hoạt áp đảo, nếu có tiền sử sang chấn nặng, hoặc nếu mối quan hệ liên tục tái hiện tổn thương cũ — trị liệu (cá nhân hoặc cặp đôi) không phải dấu hiệu thất bại mà là công cụ đúng cho một vết thương sâu. Nếu có yếu tố lạm dụng, an toàn của bạn đứng trên việc ‘cứu’ mối quan hệ."],
];

/* NEW: love & marriage */
const MARRIAGE = [
  ["Từ đam mê sang cam kết — và vì sao không phải sa sút", "Mọi mối quan hệ dài đều đi qua sự chuyển hoá từ tình yêu-đam mê (passionate) sang tình yêu-bạn đời (companionate). Đây không phải tình yêu giảm mà là tình yêu đổi dạng — dopamine của giai đoạn đầu nhường chỗ cho oxytocin của sự gắn bó sâu. ‘Nghĩa’ của người Việt gọi tên đúng giai đoạn này: một dạng tình yêu chín, mang chiều đạo lý và biết ơn."],
  ["Hôn nhân như cỗ máy trưởng thành (Schnarch)", "Schnarch: hôn nhân vốn được ‘thiết kế’ để tạo bế tắc (gridlock) — hai người khác biệt buộc phải va vào giới hạn của nhau. Chính các bế tắc đó là cỗ máy ép cả hai trưởng thành, nếu họ chọn tự nâng cấp mình thay vì đòi người kia thay đổi. Khác biệt hoá (differentiation) là kỹ năng trung tâm: giữ được mình trong khi vẫn gần gũi sâu."],
  ["Bảo trì định kỳ thay vì sửa khi hỏng", "Các cặp bền vững không chờ vấn đề tích tụ thành khủng hoảng — họ có ‘bảo trì định kỳ’ (xem mục 4 tab Thực hành). Giống sức khoẻ răng miệng: khám đều rẻ hơn và ít đau hơn nhổ răng. Nghe khô khan nhưng đây là điều phân biệt hôn nhân bền với hôn nhân trôi dạt."],
  ["Nuôi khoảng cách trong sự gần gũi tối đa", "Nghịch lý Perel gắt nhất trong hôn nhân — nơi hai người chia sẻ mọi thứ. Sự quen thuộc toàn phần giết ham muốn. Giữ đời sống riêng, dự án riêng, và cho nhau được là một con người độc lập (không chỉ là ‘vợ/chồng’) là cách nuôi lại khoảng cách để khao khát băng qua."],
  ["Bất đồng vĩnh viễn là bình thường", "Gottman: khoảng 69% xung đột của các cặp là ‘vấn đề vĩnh viễn’ — khác biệt cơ bản không bao giờ ‘giải quyết’ xong. Mục tiêu không phải xoá bất đồng mà là đối thoại về nó mà không bế tắc, với hài hước và tôn trọng. Cặp bền không phải cặp hợp nhau hơn, mà là cặp xử lý bất hợp tốt hơn."],
];

/* NEW: love & life */
const LIFE = [
  ["Tình yêu không phải toàn bộ ý nghĩa cuộc đời", "Chủ nghĩa lãng mạn hiện đại đặt lên một người bạn đời trọng trách mà xưa cả một ngôi làng gánh: tri kỷ, người tình, đồng đội, chỗ dựa tài chính, nguồn ý nghĩa. Không một người nào mang nổi tất cả. Nho giáo và mô hình cộng đồng nhắc: tình yêu đôi lứa là MỘT nguồn ý nghĩa quan trọng, không phải nguồn duy nhất. Có bạn bè, công việc, cộng đồng, lý tưởng riêng làm tình yêu nhẹ gánh và bền hơn."],
  ["Yêu như chất xúc tác trưởng thành, không phải nơi trú ẩn", "Rilke: yêu là cơ hội để mỗi người ‘trở thành thế giới cho chính mình vì người kia’. Tình yêu lành mạnh làm cả hai lớn lên và mở ra thế giới, không co lại và khép kín. Câu hỏi định kỳ: ở bên nhau, cả hai đang trở nên rộng hơn hay hẹp hơn?"],
  ["Yêu và cái chết — chiều hiện sinh cuối cùng", "Mọi tình yêu đều kết thúc — bằng chia ly hoặc cái chết. Nhìn thẳng vào điều này không làm tình yêu u ám mà làm nó sắc nét hơn: chính tính hữu hạn tạo sự quý giá (mono no aware — cái đẹp của điều sẽ tàn). Yalom: người đối diện được với cái chết thường yêu hiện diện hơn, ít trì hoãn hơn, ít lãng phí thời gian vào những cuộc chiến vặt. ‘Một ngày nào đó sẽ là lần cuối mình nắm tay nhau’ không phải ý nghĩ bệnh hoạn — nó là công thức của sự trân trọng."],
  ["Yêu chính mình như nền của mọi tình yêu", "Fromm: yêu mình và yêu người là cùng MỘT năng lực, không đối nghịch. Người không xây được quan hệ tử tế với chính mình thường mang vào tình yêu một cái hố cần được lấp — và biến người kia thành công cụ lấp hố. Chăm nền tảng này (giá trị bản thân, sự bình yên nội tâm, đời sống có ý nghĩa riêng) là điều kiện để cho đi mà không cạn kiệt, và để nhận mà không bám víu."],
];


/* ===== attachment styles ===== */
const ATTACH = [
  ["An toàn", "#3E7C6A", "~50-55%", "Thoải mái với cả gần gũi lẫn tự chủ; tin người kia sẵn có mặt; nói nhu cầu trực tiếp; điều tiết cảm xúc tốt; xung đột không thành thảm hoạ.", "Ít bẫy — nhưng có thể đánh giá thấp mức khó của người kiểu khác, hoặc vì quá lạc quan mà chọn nhầm người chưa an toàn."],
  ["Lo âu (bám víu)", "#8A6FA8", "~20%", "Khao khát gần gũi tối đa, sợ bị bỏ rơi; cực nhạy với dấu hiệu xa cách; cần trấn an liên tục; dễ ‘protest behavior’ (giận dỗi, đòi hỏi, kiểm tra) khi thấy khoảng cách.", "Hệ thần kinh báo động khi partner cần không gian; đọc khoảng cách trung tính thành từ chối; càng bám càng đẩy người kia ra — lời tiên tri tự ứng nghiệm."],
  ["Né tránh (xa cách)", "#5C86A0", "~25%", "Đề cao tự chủ, thấy ngạt khi quá gần; coi nhẹ nhu cầu gắn bó (‘không cần ai’); rút lui khi thân mật tăng; xem độc lập là giá trị cao nhất.", "‘Deactivation’ — tự dập nhu cầu gắn bó của chính mình; vô thức tìm lỗi ở partner để tạo khoảng cách; rời đi về mặt cảm xúc đúng lúc người kia muốn lại gần."],
  ["Vừa lo vừa né (hỗn loạn)", "#9A6FA0", "~5-10%", "Vừa khao khát vừa sợ gần gũi — ‘lại đây / đi đi’; thường gốc từ sang chấn; quan hệ dễ hỗn loạn, cường độ cao, kéo-đẩy dữ dội.", "Bản đồ gắn bó tự mâu thuẫn; kích hoạt rất mạnh và khó tự điều tiết; dễ vào chu kỳ thân mật–hoảng sợ–đẩy ra lặp lại."],
];

/* ===== Sternberg ===== */
const STERN_COMP = [
  ["Thân mật", "#3E7C6A", "Hơi ấm — gần gũi, gắn kết, chia sẻ, tin cậy, thấu hiểu."],
  ["Đam mê", "#C0839C", "Ngọn lửa — hấp dẫn thể xác, khao khát, hưng phấn. Bốc nhanh, khó giữ."],
  ["Cam kết", "#5C86A0", "Cấu trúc — quyết định yêu và duy trì qua thời gian, kể cả khi khó."],
];
const STERN_TYPES = [
  ["Thích / bạn bè", "Chỉ Thân mật", "Gần gũi ấm áp nhưng không đam mê, không cam kết lãng mạn. Tình bạn đẹp."],
  ["Say mê", "Chỉ Đam mê", "‘Tiếng sét’, cuốn hút mãnh liệt mà chưa có gắn kết hay cam kết. Dễ bùng, dễ tắt."],
  ["Trống rỗng", "Chỉ Cam kết", "Ở lại vì nghĩa vụ/thói quen khi tình và lửa đã cạn. Nhiều hôn nhân giai đoạn cuối."],
  ["Lãng mạn", "Thân mật + Đam mê", "Gắn bó và cuốn hút nhưng chưa quyết định về tương lai. Nhiều mối tình đầu."],
  ["Bạn đời", "Thân mật + Cam kết", "Gần gũi sâu và bền, đam mê nhạt dần. ‘Nghĩa’ của người Việt. Bền vững của hôn nhân lâu năm."],
  ["Phù phiếm", "Đam mê + Cam kết", "Cưới vội sau vài tuần dựa trên lửa, chưa có thân mật thật. Rủi ro cao."],
  ["Trọn vẹn", "Cả ba thành tố", "Đích đến lý tưởng. Nhưng ‘khó DUY TRÌ hơn khó đạt’ — cần vun đắp không ngừng."],
];

/* ===== neurochemical arc ===== */
const NEUROCHEM = [
  ["1 · Ham muốn", "#C0839C", "Testosterone, estrogen", "Thúc đẩy tìm kiếm bạn tình nói chung. Không nhắm một người cụ thể.", "Nền, luôn hiện diện"],
  ["2 · Say đắm (hấp dẫn lãng mạn)", "#B0637E", "Dopamine ↑, norepinephrine ↑, serotonin ↓", "Dồn toàn bộ vào một người: khoái cảm, tập trung ám ảnh, tim đập, mất ngủ, chán ăn. Serotonin thấp gây suy nghĩ xâm lấn kiểu ám ảnh cưỡng chế.", "~6 tháng đến 2 năm"],
  ["3 · Gắn bó", "#3E7C6A", "Oxytocin, vasopressin", "Bình lặng, ấm áp, tin cậy, chung thuỷ, an toàn. Được củng cố bởi tiếp xúc, gần gũi, cùng vượt khó. Nền của tình yêu dài hạn.", "Vô thời hạn nếu được nuôi"],
];

/* ===== conflict vs abuse ===== */
const CVA = [
  ["Mục tiêu", "Hiểu nhau và giải quyết vấn đề", "Giành và giữ quyền kiểm soát"],
  ["Tiếng nói", "Cả hai đều có tiếng nói, đều ảnh hưởng được kết quả", "Một bên áp đặt; bên kia bị bịt miệng dần"],
  ["Sau xung đột", "Sửa chữa, kết nối lại, cả hai điều chỉnh", "Cô lập, hạ giá, trừng phạt; nạn nhân co lại"],
  ["Trạng thái nền", "An toàn dù bất đồng; ai cũng có thể sai", "Sợ hãi; ‘bước trên vỏ trứng’; một bên luôn ‘đúng’"],
  ["Theo thời gian", "Cả hai lớn lên, tự do mở rộng", "Thế giới của nạn nhân co lại; lệ thuộc tăng"],
];

/* ===== four horsemen ===== */
const HORSEMEN = [
  ["Chỉ trích", "Tấn công nhân cách (‘anh ích kỷ, anh vô tâm’) thay vì nêu một hành vi cụ thể.", "Khởi đầu mềm: ‘em cảm thấy… về việc cụ thể… em cần…’ — nói về mình và hành vi, không dán nhãn con người."],
  ["Khinh miệt", "Mỉa mai, chế giễu, đảo mắt, coi thường. Dự báo ly hôn MẠNH NHẤT trong mọi dấu hiệu.", "Chủ động xây văn hoá trân trọng: thường xuyên nói ra điều mình biết ơn và ngưỡng mộ ở người kia."],
  ["Phòng thủ", "Phản pháo hoặc đóng vai nạn nhân (‘tại em chứ đâu phải anh’) thay vì lắng nghe.", "Nhận phần trách nhiệm của mình, dù chỉ 10%. Một câu nhận lỗi thật phá vỡ vòng xoáy ngay."],
  ["Xây tường (phớt lờ)", "Rút lui, im lặng, đóng băng, quay mặt đi — thường vì đang quá tải (flooding).", "Tự làm dịu: xin tạm dừng có thời hạn (‘cho anh 20 phút’), thật sự bình tĩnh lại, rồi QUAY LẠI."],
];

/* ===== heartbreak ===== */
const HEARTBREAK = [
  ["Não xử lý chia ly như cai nghiện", "fMRI (Fisher): sau chia ly, vùng thèm khát gắn với dopamine vẫn hoạt động mạnh — gây ‘vật vã’ thật về sinh lý, thôi thúc liên lạc lại như người nghiện tìm liều. Đây là hoá học, không phải bạn yếu đuối."],
  ["‘Đau lòng’ không phải ẩn dụ", "Eisenberger: đau xã hội dùng chung mạch thần kinh với đau thể xác. Bị từ chối kích hoạt cùng vùng não như bị thương. Và stress cấp có thể làm tim yếu thật (hội chứng ‘trái tim tan vỡ’ — takotsubo)."],
  ["Mất người yêu là mất một phần bản thể", "Aron: khi yêu, ta sáp nhập người kia vào ‘cái tôi’. Chia ly xé toạc phần bản sắc đã hợp nhất đó — nên cảm giác ‘không biết mình là ai nữa’ là có thật, không phải làm quá."],
  ["Phục hồi có cấu trúc", "Không tiếp xúc (no contact) để ‘cai’ nhanh hơn — mỗi lần liên lạc reset cơn thèm. Viết ra để tạo ý nghĩa (Pennebaker). Chủ động tái thiết bản sắc riêng (sở thích, bạn bè, dự án ‘của mình’). Grief theo đợt, không tuyến tính — có ngày tưởng ổn rồi lại sụp, đó là bình thường."],
];


/* ===== EFT (Sue Johnson) ===== */
const EFT = [
  ["Tìm ‘vũ điệu quỷ’ (vòng lặp tiêu cực)", "Nhận diện khuôn mẫu lặp đi lặp lại mỗi khi căng thẳng. Gần như luôn là biến thể của ĐUỔI–RÚT: một người phản đối/truy đuổi, một người rút lui/im lặng. Vẽ nó ra: ‘Khi em thấy… em làm…, thì anh…, rồi em lại…’ — nó tự xoáy."],
  ["Đặt tên vòng lặp là KẺ THÙ CHUNG", "Chuyển từ ‘anh là vấn đề’ sang ‘cái vòng này đang chia rẽ mình’. Cả hai đứng cùng phía chống lại vòng lặp, thay vì đối đầu nhau. Đây là bước ngoặt của EFT."],
  ["Chạm cảm xúc nguyên phát dưới cảm xúc thứ phát", "Dưới cơn giận (thứ phát) gần như luôn là nỗi sợ nguyên phát: sợ bị bỏ rơi, sợ mình không đủ, sợ không quan trọng với người kia. Nói cái nguyên phát: ‘Khi anh im lặng, em sợ mình không quan trọng với anh’ — mềm hơn và thật hơn ‘anh vô tâm’."],
  ["A.R.E. — ba câu hỏi gắn bó", "Dưới mọi xung đột là cùng một câu hỏi: ‘anh có ở đó với em không?’ Ba chiều: Accessible (em có với tới được anh không?), Responsive (anh có đáp lại nhu cầu của em không?), Engaged (mình có thật sự gắn kết không?). Hỏi và trao cho nhau cả ba."],
  ["‘Ôm em thật chặt’ — biến vòng xấu thành vòng an toàn", "Khi cả hai nói được nhu cầu gắn bó sâu và đáp lại nhau, vòng xoáy tiêu cực đảo thành vòng xoáy an toàn: dễ tổn thương → được đáp lại → tin tưởng hơn → dễ tổn thương hơn. Đây là ‘phản ứng dây chuyền’ lành mà EFT hướng tới."],
];

/* ===== working with attachment ===== */
const ATTACH_DO = [
  ["Nếu bạn thiên LO ÂU", "#8A6FA8", "Khi hoảng vì thấy khoảng cách, DỪNG và hỏi ‘đây là nỗi sợ cũ hay bằng chứng thật?’ Tự trấn an trước (thở, nối đất). Nói nhu cầu bằng lời — ‘em cần chút trấn an’ — thay vì test, giận dỗi, hay im lặng trừng phạt. Chọn partner nhất quán, không phải người khó nắm bắt (dễ nhầm bất định với hoá học)."],
  ["Nếu bạn thiên NÉ TRÁNH", "#5C86A0", "Khi thấy muốn rút hoặc bắt đầu tìm lỗi ở partner, nhận ra đó là ‘deactivation’ — cơ chế phòng vệ, không phải sự thật về họ. Tập ở lại thêm 10 phút thay vì đóng cửa. Cho partner an toàn: ‘anh cần chút không gian VÀ anh vẫn ở đây, không phải bỏ đi’ — câu này tạo khác biệt lớn."],
  ["Nếu PARTNER lo âu", "#8A6FA8", "Cho sự nhất quán và trấn an CHỦ ĐỘNG (nhắn tin đều, báo trước khi vắng, nói rõ mình vẫn ở đây). Rẻ với bạn, vô giá với họ. Đừng phạt sự bám víu bằng cách rút thêm — điều đó đổ dầu vào lửa."],
  ["Nếu PARTNER né tránh", "#5C86A0", "ĐỪNG đuổi khi họ rút — đuổi làm họ rút sâu hơn. Cho không gian VÀ giữ kết nối nhẹ. Hiểu nhu cầu tự chủ của họ không phải là từ chối bạn. Khi họ quay lại, đón nhận không trách móc để việc quay lại thành an toàn."],
  ["Cặp lo âu – né tránh (rất phổ biến)", "#9A6FA0", "Cùng nhận diện vòng đuổi–rút và đặt tên nó là kẻ thù chung. Thoả thuận tín hiệu tạm dừng. Người rút CAM KẾT quay lại đúng hẹn; người đuổi CAM KẾT cho không gian. Phá vòng cần cả hai — không ai phá được một mình."],
];

/* ===== solo / single ===== */
const SOLO = [
  ["Chữa gắn bó khi đang độc thân", "Bạn KHÔNG cần một mối quan hệ để tiến tới an toàn hơn. Tình bạn an toàn, trị liệu, tự điều hoà, và các trải nghiệm sửa chữa nhỏ đều xây được ‘earned security’. Vào mối quan hệ mới với nền vững hơn tốt hơn nhiều so với dùng nó làm liều thuốc."],
  ["Hẹn hò có ý thức", "Chú ý cảm giác CƠ THỂ bên một người — an toàn hay báo động ngầm? Để ý tốc độ và cường độ (love bombing quá sớm là cờ đỏ, không phải cờ hồng). Kiểm tra sự nhất quán giữa lời nói và hành động qua thời gian. Cờ đỏ sớm hiếm khi tự biến mất."],
  ["Chọn đúng người > cố sửa người sai", "Đặc điểm dự báo hạnh phúc dài hạn (theo nghiên cứu): tử tế nhất quán, điều tiết cảm xúc tốt, có bạn bè lâu năm, biết nhận trách nhiệm, đáp lại được nhu cầu của bạn. Sức hút MÃNH LIỆT ngay từ đầu không dự báo hạnh phúc — thường là dấu hiệu của bất định hoặc pattern cũ (xem limerence)."],
  ["Xây một cuộc đời trọn vẹn trước", "Tình yêu nên THÊM vào một cuộc sống đã đầy, không LẤP một cuộc sống trống. Người đến với tình yêu từ sự trọn vẹn chọn lựa sáng suốt hơn và ít bám víu hơn người đến từ sự thiếu thốn. Đây là cách ‘yêu mình’ trở thành nền của yêu người, rất cụ thể."],
];

/* ===== breakup recovery ===== */
const BREAKUP = [
  ["Không tiếp xúc để ‘cai’", "Não xử lý chia ly như cai nghiện — mỗi lần liên lạc lại reset cơn thèm và kéo dài đau khổ. Cắt tiếp xúc (kể cả theo dõi mạng xã hội) giúp hệ thần kinh nguôi dần. Không phải trả thù hay lạnh lùng — là chăm sóc vết thương."],
  ["Cho phép grief theo đợt", "Nỗi buồn không tuyến tính: sẽ có ngày tưởng đã ổn rồi lại sụp bất ngờ. Đó là bình thường, không phải thụt lùi. Đừng đặt lịch cho trái tim."],
  ["Viết ra để tạo ý nghĩa", "Pennebaker: viết tự do 15–20 phút trong vài ngày về trải nghiệm VÀ ý nghĩa của nó làm giảm đau đo được. Không phải để nhai lại, mà để chuyển hỗn loạn thành một câu chuyện có thể mang theo."],
  ["Tái thiết bản sắc riêng", "Chia ly làm mờ ‘cái tôi’ đã sáp nhập với người kia (Aron) — nên cảm giác trống rỗng, lạc lối. Chủ động nối lại sở thích, bạn bè, dự án ‘của riêng mình’ để dựng lại đường viền bản thân."],
  ["Rút bài học, không đổ hết lỗi", "Tránh cả hai cực: đổ hết lỗi cho họ (mất cơ hội học) và đổ hết lỗi cho mình (tự huỷ). Hỏi: ‘mình học được gì về nhu cầu, ranh giới, và lựa chọn của mình?’ Biến mất mát thành trưởng thành."],
  ["Biết khi nào cần giúp đỡ", "Nếu tê liệt kéo dài, có dấu hiệu trầm cảm, hoặc đây là chia ly khỏi một quan hệ lạm dụng — tìm hỗ trợ chuyên môn không phải yếu đuối mà là khôn ngoan."],
];


/* ===== love languages (with caveat) ===== */
const LOVE_LANG = [
  ["Lời khẳng định", "Khen ngợi, biết ơn, động viên nói ra thành lời."],
  ["Thời gian chất lượng", "Sự chú ý trọn vẹn, không màn hình, cùng hiện diện."],
  ["Quà tặng", "Vật mang tính biểu tượng — ‘em có nghĩ đến anh’."],
  ["Hành động phục vụ", "Làm giúp việc gì đó — hành động thay lời nói."],
  ["Chạm thân thể", "Ôm, nắm tay, gần gũi thể xác."],
];

/* ===== desire (Nagoski) ===== */
const DESIRE = [
  ["Mô hình kiểm soát kép: chân ga & chân phanh", "#C0839C", "Ham muốn tình dục có ‘chân ga’ (mọi thứ gợi kích thích) và ‘chân phanh’ (mọi thứ ức chế: stress, mệt, lo, giận, oán, mất an toàn, hình ảnh cơ thể). Rất nhiều vấn đề ham muốn KHÔNG phải thiếu ga, mà là quá nhiều phanh. Muốn tăng ham muốn, thường phải gỡ phanh trước, không phải đạp ga mạnh hơn."],
  ["Ham muốn tự phát vs đáp ứng", "#B0637E", "TỰ PHÁT: hứng bùng lên tự nhiên trước khi có kích thích (phổ biến giai đoạn đầu). ĐÁP ỨNG: hứng chỉ đến SAU khi đã bắt đầu gần gũi/kích thích — rất phổ biến, nhất là trong quan hệ dài. Hiểu lầm tai hại: nghĩ ‘hết hứng tự phát = hết yêu/hết hấp dẫn’. Thực ra chỉ là kiểu ham muốn đổi dạng, hoàn toàn bình thường."],
  ["Bối cảnh quyết định nhiều hơn ta tưởng", "#9A6FA0", "Cùng một đụng chạm có thể gợi cảm hay khó chịu tuỳ trạng thái tâm trí và bối cảnh. Ham muốn không phải một cái công tắc trong người kia mà là kết quả của cả một môi trường: mức căng thẳng, sự an toàn cảm xúc, oán giận tồn đọng, sự mệt mỏi. Chăm bối cảnh chính là chăm ham muốn."],
];

/* ===== betrayal repair ===== */
const BETRAYAL = [
  ["Phản bội phá vỡ giả định nền của an toàn", "Không chỉ ngoại tình — cả dối trá kéo dài, bỏ rơi lúc cần nhất, phản bội lòng tin tài chính. Nó đập vỡ ‘giả định thế giới an toàn’ trong mối quan hệ, gây một dạng sang chấn thật (xâm nhập, cảnh giác quá mức, mất phương hướng)."],
  ["Có thể hàn gắn — nhưng là xây một mối quan hệ MỚI", "Nhiều cặp sống sót qua phản bội, và một số còn sâu sắc hơn (Perel: khủng hoảng có thể là cửa). Nhưng không bao giờ ‘quay lại như cũ’ — mối quan hệ cũ đã chết; phải cùng chọn xây một cái mới. Điều này KHÔNG áp dụng cho quan hệ lạm dụng/kiểm soát."],
  ["Ba giai đoạn (Gottman): Atone → Attune → Attach", "ATONE: người gây tổn thương nhận trách nhiệm hoàn toàn, không biện minh, minh bạch, và kiên nhẫn với cơn đau lặp lại của người kia. ATTUNE: xây lại kết nối cảm xúc, học lắng nghe tổn thương mà không phòng thủ. ATTACH: xây lại thân mật và tin cậy, gồm cả tình dục. Bỏ qua giai đoạn nào cũng khiến việc hàn gắn giả tạo."],
  ["Điều kiện tiên quyết", "Người phản bội chấm dứt HOÀN TOÀN hành vi và minh bạch; người bị phản bội đi tới vì tự nguyện, không bị ép hay bị thúc ‘cho qua nhanh’. Đây là địa hình quá khó để tự đi — trị liệu cặp đôi thường là cần thiết, không phải xa xỉ."],
];

/* ===== the mundane ===== */
const MUNDANE = [
  ["Tiền bạc", "#5C86A0", "Nguồn xung đột hàng đầu của các cặp — nhưng hiếm khi thật sự về số tiền. Nó về Ý NGHĨA gắn với tiền: an toàn, tự do, địa vị, quyền lực, tình thương. Hai người thường mang hai ‘kịch bản tiền’ khác nhau từ gia đình gốc. Giải pháp không phải một người thắng, mà là minh bạch, hiểu kịch bản của nhau, và thoả thuận rõ ràng."],
  ["Việc nhà & phân công", "#5E8A86", "Bất bình đẳng việc nhà không phải chuyện nhỏ: nó xói mòn ham muốn và sự hài lòng một cách đo được (oán giận là ‘chân phanh’ lớn của ham muốn). Cảm giác ‘mình có một người bạn đời hay thêm một đứa con cần quản’ giết chết sự hấp dẫn."],
  ["Gánh nặng tinh thần (mental load)", "#9A6FA0", "Công việc VÔ HÌNH của việc ghi nhớ, lên kế hoạch, điều phối — ‘quản lý dự án’ của cả gia đình, không chỉ thực thi. Thường dồn lên một người (hay là phụ nữ) và ít được nhìn nhận vì nó không hiện ra. Chia đều việc nhìn thấy được là chưa đủ; phải chia cả việc ‘nghĩ và nhớ và điều phối’ — đây mới là phần nặng thật."],
];

/* ===== desire practice ===== */
const DESIRE_DO = [
  ["Gỡ ‘chân phanh’ trước khi đạp ‘chân ga’", "Xử lý stress, mệt, và nhất là oán giận tồn đọng — ham muốn hiếm khi đến trên nền căng thẳng và bất mãn. Một cuộc trò chuyện dọn sạch ấm ức thường ‘mở khoá’ nhiều hơn bất kỳ kỹ thuật nào."],
  ["Chấp nhận ham muốn đáp ứng — đừng chờ ‘hứng tự nhiên’", "Nếu bạn hoặc partner thiên về ham muốn đáp ứng, chờ hứng tự bùng sẽ chờ mãi. Đôi khi bắt đầu gần gũi (không áp lực đi tới đâu) rồi hứng mới tới. Chủ động tạo bối cảnh — kể cả lên lịch — KHÔNG kém lãng mạn; nó là cách nghiêm túc chăm ham muốn đáp ứng."],
  ["Nuôi khoảng cách & mới lạ", "Perel + Aron: thấy nhau trong vai trò độc lập (làm điều mình giỏi, có đời sống riêng), và làm điều mới + hơi thử thách cùng nhau. Cả hai khởi động lại sự khao khát và mở rộng."],
  ["Tách trình diễn khỏi kết nối", "Mục tiêu là gần gũi và khoái cảm chung, không phải ‘đạt chuẩn’ nào. Áp lực trình diễn là một trong những ‘chân phanh’ mạnh nhất. Bỏ mục tiêu, giữ kết nối."],
  ["Nói về tình dục NGOÀI giường", "Chủ đề khó nhất cần bối cảnh an toàn nhất: khi cả hai bình tĩnh, mặc quần áo, không phải giữa lúc thất vọng. Nói về điều mình thích, điều mình ngại, điều mình muốn thử — như hai người cùng phía, tò mò về nhau."],
];

/* ===== relationship scorecard ===== */
const SCORECARD = [
  "An toàn — mình có dám nói thật và để mình dễ tổn thương không?",
  "Trân trọng — tỉ lệ tương tác tích cực có áp đảo tiêu cực không?",
  "Được lắng nghe — mình có thấy được hiểu khi nói không?",
  "Thân mật & ham muốn — kết nối thể xác/cảm xúc còn sống không?",
  "Chia sẻ công bằng — việc nhà và gánh nặng tinh thần có được chia không?",
  "Cùng trưởng thành — ở bên nhau, mình đang rộng ra hay hẹp lại?",
  "Sửa chữa — sau xung đột, mình có quay lại được với nhau không?",
  "Tự chủ — mình còn giữ được là chính mình không?",
  "Tin cậy — mình có tin vào lời và hành động của người kia không?",
  "Cùng hướng — mình có đang nhìn về một tương lai chung không?",
];

/* ===== rebuild trust ===== */
const REBUILD = [
  ["Chấm dứt hoàn toàn & minh bạch", "Người phản bội", "Cắt đứt dứt khoát hành vi gây tổn thương; chủ động minh bạch (không chờ bị hỏi mới khai); mở lòng với sự kiểm chứng mà không phòng thủ. Bí mật, dù nhỏ, tái mở vết thương."],
  ["Nhận trách nhiệm không kèm ‘nhưng’", "Người phản bội", "Không đổ lỗi hoàn cảnh hay cho người kia; nghe nỗi đau lặp đi lặp lại mà không sốt ruột ‘sao chưa qua’. Cơn đau quay lại nhiều lần là bình thường, không phải người kia ‘làm quá’."],
  ["Cho phép mình đau theo đợt — nhưng không trừng phạt vô tận", "Người bị phản bội", "Được quyền đau, được hỏi điều cần biết. Nhưng giám sát và trừng phạt vô thời hạn cũng ăn mòn chính mình. Ở một điểm, phải chọn: xây lại, hoặc rời đi — sống lơ lửng giữa hai là địa ngục cho cả hai."],
  ["Xây lại bằng độ tin cậy lặp lại", "Cả hai", "Lòng tin không phục hồi bằng một lời hứa lớn mà bằng hàng trăm hành động nhỏ nhất quán qua thời gian dài. Mỗi cam kết được giữ là một viên gạch. Không có đường tắt cho phần này."],
  ["Chọn xây một mối quan hệ MỚI", "Cả hai", "Đừng cố ‘quay lại như trước’ — cái cũ đã mất. Cùng quyết định một cách có ý thức rằng mình đang tạo một mối quan hệ khác, tốt hơn. Cân nhắc trị liệu cặp đôi; đây là địa hình quá khó để tự đi một mình."],
];

/* ===== forgiveness (REACH) ===== */
const FORGIVE_IS = ["Buông bỏ oán hận — cho CHÍNH MÌNH, để không bị quá khứ giam cầm.", "Một quá trình NỘI TÂM, có thể xảy ra kể cả khi không hoà giải, kể cả khi người kia không xin lỗi."];
const FORGIVE_ISNT = ["Không phải quên, bào chữa, hay nói ‘không sao’.", "Không phải hoà giải bắt buộc — có thể tha thứ mà vẫn không quay lại.", "Không phải bỏ ranh giới hay chịu đựng tiếp tổn thương."];
const REACH = [
  ["R — Recall (Nhớ lại)", "Nhớ lại tổn thương một cách trung thực, không kìm nén cũng không phóng đại. Không thể tha thứ điều mình chưa dám nhìn."],
  ["E — Empathize (Thấu hiểu)", "Thử hiểu — KHÔNG phải bào chữa — điều gì có thể đã khiến người kia hành xử vậy. Hiểu không xoá trách nhiệm, nhưng nới lỏng gọng kìm của oán hận."],
  ["A — Altruistic gift (Món quà)", "Nhớ lần mình từng được tha thứ và cảm giác nhẹ nhõm đó. Chọn trao sự tha thứ như một món quà — cho họ, và nhiều hơn, cho mình."],
  ["C — Commit (Cam kết)", "Cam kết tha thứ một cách cụ thể — viết ra, nói với một người tin cậy. Biến một cảm giác thoáng qua thành một quyết định."],
  ["H — Hold (Giữ)", "Giữ sự tha thứ khi oán hận quay lại — và nó SẼ quay lại. Tha thứ không phải một sự kiện mà là một thực hành phải lặp lại. Nhắc mình: mình đã chọn buông rồi."],
];


/* ===== love across life stages ===== */
const STAGES = [
  ["Tuổi 20 — Yêu để tìm ra mình là ai", "#C0839C",
   "Bản sắc còn đang hình thành (Erikson: Thân mật vs Cô lập — nhưng thân mật thật cần một cái tôi đã có hình hài). Ta thường yêu để trả lời ‘tôi là ai’ qua ánh mắt người khác. Cường độ cao, kỹ năng thấp, self-expansion (Aron) chạy hết công suất — nên cảm giác ‘phê’ mãnh liệt nhất đời.",
   "Sai lầm đặc trưng: nhầm cường độ với sự hợp; chọn người dựa trên hoá học và pattern gia đình gốc; hoà tan bản sắc vào người kia rồi mất phương hướng khi chia tay. Việc cần làm: xây một cái tôi đủ hình hài để CÓ THỂ thân mật, thay vì dùng người kia làm bản sắc."],
  ["Tuổi 30 — Yêu dưới áp lực cấu trúc", "#B0637E",
   "Tình yêu va vào thực tế: sự nghiệp, tiền, đồng hồ sinh học, kỳ vọng gia đình, quyết định cưới/không cưới/có con. Câu hỏi đổi từ ‘mình có yêu người này không’ sang ‘mình có xây được một cuộc đời với người này không’. Đây là lúc ‘nghĩa’ bắt đầu thành hình.",
   "Sai lầm đặc trưng: cưới vì áp lực thời gian chứ không vì người; hoặc bỏ một người tốt vì thiếu ‘tia lửa’ mà không hiểu sinh học giai đoạn 2→3. Việc cần làm: phân biệt áp lực bên ngoài với mong muốn thật, và đánh giá bằng chất lượng đồng hành, không bằng cường độ."],
  ["Có con nhỏ — Cú sốc bị đánh giá thấp nhất", "#8A6FA8",
   "Nghiên cứu nhất quán: hài lòng hôn nhân SỤT rõ rệt sau khi có con đầu lòng, và thường không hồi phục hoàn toàn cho tới khi con lớn. Không phải vì hết yêu — mà vì thiếu ngủ, thiếu thời gian, gánh nặng tinh thần tăng vọt, và cặp đôi bị đẩy xuống hàng ưu tiên cuối. Perel: ham muốn cần khoảng cách và năng lượng — cả hai đều cạn.",
   "Sai lầm đặc trưng: coi mọi thứ là ‘tạm thời rồi sẽ ổn’ và để cặp đôi tự trôi nhiều năm; oán giận tích tụ từ phân công không công bằng. Việc cần làm: bảo vệ có chủ đích thời gian cho cặp đôi (dù nhỏ); chia GÁNH NẶNG TINH THẦN không chỉ việc nhà; chấp nhận đây là giai đoạn khó và cần bảo trì tích cực, không phải bằng chứng của thất bại."],
  ["Tuổi trung niên — Hai ngã rẽ", "#5C86A0",
   "Con lớn dần, sự nghiệp ổn định, và câu hỏi hiện sinh trỗi lên: ‘đây là tất cả sao?’. Hai lối: cùng tái tạo mối quan hệ (Schnarch: bế tắc là cỗ máy trưởng thành), hoặc ‘ly hôn xám’ — xu hướng ly hôn tuổi trung niên tăng ở nhiều nước, thường khi con rời nhà và cặp đôi phát hiện họ đã thành hai người lạ cùng nhà.",
   "Sai lầm đặc trưng: nhầm khủng hoảng hiện sinh của MÌNH với vấn đề của MỐI QUAN HỆ (rồi đổ lên người kia hoặc tìm người mới để né việc trưởng thành). Việc cần làm: nhận ra khủng hoảng là của mình, làm việc nội tâm; và tái khám phá người kia như một người lạ đáng tò mò — họ đã đổi, bạn có biết không?"],
  ["Tuổi già — Yêu trước sự hữu hạn", "#3E7C6A",
   "Nghiên cứu (Carstensen — lý thuyết chọn lọc cảm xúc-xã hội): khi thời gian còn lại co lại, con người ưu tiên chiều sâu cảm xúc hơn chiều rộng — quan hệ ít hơn nhưng sâu hơn, và xung đột thường giảm. Nhiều cặp già báo cáo hài lòng cao trở lại. Nhưng đây cũng là giai đoạn của mất mát: bệnh tật, chăm sóc, và cái chết của một người.",
   "Sai lầm đặc trưng: để sự quen thuộc thành vô hình — hàng chục năm chung nhà mà không còn thật sự nhìn nhau. Việc cần làm: mono no aware ở dạng thực hành — biết đây là hữu hạn nên hiện diện; và chuẩn bị cho vai trò chăm sóc, một trong những biểu hiện sâu nhất của ‘nghĩa’."],
];

/* ===== relationship configurations ===== */
const CONFIGS = [
  ["Yêu xa", "#5C86A0",
   "Nghiên cứu gây bất ngờ: các cặp yêu xa KHÔNG kém hài lòng hay kém bền hơn cặp gần một cách hệ thống — nhiều cặp còn giao tiếp sâu hơn và lý tưởng hoá nhau nhiều hơn. Rủi ro thật nằm ở giai đoạn TÁI HỢP: khi phải sống chung lại, các khác biệt đời thường (vốn được khoảng cách che giấu) ập đến cùng lúc.",
   "Cần: một mốc kết thúc rõ ràng (‘xa đến bao giờ’) — không có nó, hy vọng thành lạc quan tàn nhẫn. Chất lượng giao tiếp hơn tần suất. Và chuẩn bị TRƯỚC cho cú sốc tái hợp, đừng tưởng về gần là xong."],
  ["Tái hôn & con riêng", "#8A6FA8",
   "Cấu hình phức tạp nhất về mặt hệ thống: tỉ lệ đổ vỡ của tái hôn có con riêng cao hơn hôn nhân đầu. Lý do cấu trúc, không phải do người: gia đình mới ra đời từ một mất mát trước đó; lòng trung thành của con bị giằng xé; không có ‘tuần trăng mật’ để xây nền vì con cái đã có mặt từ ngày một.",
   "Cần: cha/mẹ ruột giữ vai kỷ luật chính trong giai đoạn đầu — người mới xây quan hệ trước, quyền uy sau (đảo thứ tự là lỗi kinh điển). Kỳ vọng thời gian thực tế: nghiên cứu gợi ý cần nhiều năm để một gia đình ghép ổn định. Đừng ép trẻ ‘phải yêu’ người mới; cho phép chúng trung thành với cả hai bên."],
  ["Quan hệ LGBTQ+", "#C0839C",
   "Bằng chứng nhất quán: chất lượng và độ bền của quan hệ đồng giới tương đương quan hệ dị tính; các động lực cốt lõi (gắn bó, Bốn kỵ sĩ, sửa chữa) áp dụng như nhau. Một số nghiên cứu (Gottman) còn thấy cặp đồng giới xử lý xung đột ít thù địch hơn, có lẽ vì ít bị áp khuôn vai trò giới.",
   "Khác biệt thật nằm ở áp lực NGOÀI, không phải bên trong: ‘minority stress’ (Meyer) — kỳ thị, giấu giếm, thiếu chấp nhận từ gia đình — là gánh nặng cộng thêm bào mòn quan hệ. Cần: xây ‘gia đình chọn lấy’ (chosen family) làm mạng nâng đỡ; và cặp đôi cùng nhận diện áp lực ngoài là kẻ thù chung, không đổ nó lên nhau."],
  ["Đa ái / phi độc quyền có đồng thuận", "#9A6FA0",
   "Cần tách bạch: đây KHÔNG phải ‘lừa dối được cho phép’ — đặc trưng phân định là sự ĐỒNG THUẬN đầy đủ và minh bạch của tất cả các bên. Nghiên cứu sơ bộ (Conley, Moors) cho thấy mức hài lòng và tin cậy có thể tương đương quan hệ độc quyền; nhưng bằng chứng còn mỏng và mẫu thường tự chọn.",
   "Cần rất nhiều thứ: năng lực giao tiếp cao hơn hẳn mức trung bình, sự trung thực triệt để, và một nền gắn bó tương đối an toàn. Cảnh báo: cấu hình này KHÔNG sửa được một mối quan hệ đang hỏng và không phù hợp khi một bên đồng ý vì sợ mất người kia — đó là cưỡng ép mềm, không phải đồng thuận."],
  ["Độc thân — một cấu hình chính đáng", "#3E7C6A",
   "Cần nói thẳng vì cả tài liệu này dễ ngầm giả định ‘có đôi là đích’: độc thân không phải phòng chờ. DePaulo chỉ ra ‘singlism’ — định kiến xã hội với người độc thân — và bằng chứng cho thấy người độc thân có mạng lưới bạn bè, họ hàng, cộng đồng thường phong phú hơn người có đôi.",
   "Cái quyết định hạnh phúc không phải TRẠNG THÁI quan hệ mà là CHẤT LƯỢNG của các mối liên kết trong đời. Một người độc thân giàu tình bạn và ý nghĩa sống khoẻ mạnh hơn một người trong hôn nhân cô đơn — điều này có bằng chứng vững."],
];


/* ===== integrative model (5 layers) ===== */
const METAMODEL = [
  ["Một xung năng sinh học", "#C0839C", "drive (Fisher) — ham muốn, say đắm, gắn bó chạy trên hoá học não. Giải thích vì sao dễ trượt chỗ này, dốc chỗ kia."],
  ["Một cách nhìn / sự chú ý", "#4A7C74", "Murdoch, Weil, Thích Nhất Hạnh — năng lực thấy người kia như một thực thể thật, không phải phóng chiếu."],
  ["Một hệ thống gắn bó", "#8A6FA8", "Bowlby — nhu cầu về bến an toàn; phản ứng của ta khi thấy đe doạ được lập trình từ thơ ấu."],
  ["Một thực hành được chọn", "#5C86A0", "Fromm, Kierkegaard, hooks — yêu là động từ, một nghệ thuật cần kỷ luật và duy trì, không phải trạng thái tự có."],
  ["Một kịch bản văn hoá", "#5E8A86", "Giddens, Illouz, Beck — ta thừa hưởng những khuôn mẫu và kỳ vọng về tình yêu mà thường tưởng là ‘tự nhiên’."],
];

/* ===== where traditions disagree ===== */
const DISAGREE = [
  ["Buông bỏ hay bám rễ?", "Phật giáo / Sufi / Xả dạy yêu là buông chấp, không nắm giữ. Kierkegaard và ‘nghĩa’ của người Việt dạy yêu là giữ lời, bám rễ, cam kết bất chấp cảm xúc đổi thay. Buông tay hay giữ chặt — cùng một tình huống, hai trí tuệ trái ngược."],
  ["Hướng tới người này, hay hướng qua người này?", "Plato và Sufi coi người yêu là bậc thang, cửa sổ tới cái Đẹp / cái Tuyệt đối lớn hơn. Murdoch, Aristotle, chủ nghĩa nhân vị coi chính con người cụ thể, bất khả thay thế này mới là đích. Người kia là phương tiện tới điều siêu việt, hay là cứu cánh tự thân?"],
  ["Nuôi lửa hay vượt lửa?", "Chủ nghĩa lãng mạn hiện đại đặt đam mê làm trung tâm. Nhiều truyền thống cổ — và cả khoa học thần kinh — coi cơn say là phù du, thậm chí nguy hiểm, cần được vượt qua để tới tình yêu chín. Ta nên tốn công giữ ngọn lửa, hay tốn công trưởng thành khỏi nhu cầu về nó?"],
  ["Giữ mình hay tan vào ‘chúng ta’?", "De Beauvoir, Schnarch và truyền thống phương Tây đề cao khác biệt hoá — giữ bản sắc trong gần gũi. Nho giáo và các văn hoá tập thể đề cao hoà nhập, phụ thuộc lẫn nhau, hoà vào một ‘chúng ta’ lớn hơn cái tôi. Ranh giới giữa gắn bó lành mạnh và đánh mất mình nằm ở đâu — và ai vẽ nó?"],
];

/* ===== maintenance rhythm ===== */
const RHYTHM = [
  ["Mỗi ngày", GREEN, "Một lời trân trọng cụ thể nói ra thành tiếng • đáp lại ít nhất một tín hiệu kết nối một cách trọn vẹn (bỏ điện thoại xuống) • 10 phút hiện diện hoàn toàn, không màn hình."],
  ["Mỗi tuần", ACCENT, "Một câu hỏi sâu chưa từng hỏi họ (chống phóng chiếu) • một hành động chăm sóc chủ động không được yêu cầu • kiểm tra tỷ lệ tích cực:tiêu cực tuần này."],
  ["Mỗi tháng", "#5C86A0", "Một trải nghiệm mới và hơi thử thách cùng nhau (self-expansion) • một cuộc trò chuyện ‘trạng thái mối quan hệ’: điều gì đang tốt, điều gì mình cần • tự soi: mình có giữ được bản sắc riêng không."],
  ["Mỗi quý / năm", "#9A6FA0", "Nhìn lại: mình đã trưởng thành hơn trong năng lực yêu chưa, hay đang lặp pattern cũ? • cả hai còn đang phát triển khi ở bên nhau không, hay đang co lại? • nếu là nghĩa/companionate — nó đang sâu thêm hay chỉ là quán tính?"],
];

/* ===== weekly check-in ===== */
const CHECKIN = [
  ["Trân trọng", "Mỗi người nói một điều mình biết ơn ở người kia tuần qua. LUÔN bắt đầu bằng phần này — nó mở cửa cho phần còn lại."],
  ["Điều đang tốt", "Điều gì trong mối quan hệ tuần này khiến bạn thấy được kết nối?"],
  ["Một điều cần điều chỉnh", "Mỗi người nêu MỘT điều (không phải danh sách), dùng khởi đầu mềm. Người kia lắng nghe, không phòng thủ."],
  ["Nhu cầu tuần tới", "‘Tuần sau em cần… để thấy được yêu/được hỗ trợ.’ — cụ thể và khả thi."],
  ["Điều mong chờ cùng nhau", "Lên kế hoạch một việc nhỏ để cùng trông đợi — giữ self-expansion sống động."],
];

/* ===== 90-day program ===== */
const PROGRAM90 = [
  ["Tháng 1 — NHÌN CHO RÕ", GREEN, "Gỡ phóng chiếu, thấy con người thật.", ["Tuần 1: làm bài ‘bản đồ phóng chiếu’ + ‘cây phả hệ tình yêu’ (nhóm D).", "Tuần 2–4: mỗi ngày hỏi ‘hôm nay mình học được gì mới về người này/về chính mình?’", "Mỗi tuần: một câu hỏi sâu chưa từng hỏi họ."]],
  ["Tháng 2 — GIỮ ĐƯỢC MÌNH", ACCENT, "Differentiation — gần mà không tan biến.", ["Tuần 1: bài ‘ngồi với cô đơn’ + ‘kiểm kê nhu cầu chưa đáp ứng’ (nhóm D).", "Tuần 2–4: khôi phục một đời sống riêng đã bỏ bê.", "Khi bất đồng: tập nói ‘mình nghĩ khác, và điều đó ổn’ mà không hoảng."]],
  ["Tháng 3 — LÀM MỖI NGÀY", "#5C86A0", "Biến yêu thành động từ, thành thói quen bền.", ["Áp dụng nhịp ngày/tuần/tháng (nhóm B) một cách nhất quán.", "Học thuộc giao thức sửa lỗi 5 bước (nhóm C) — diễn tập cả khi không cãi nhau.", "Một trải nghiệm mới + thử thách cùng nhau; cuối tháng: check-in đầy đủ."]],
];

/* ===== practice groups ===== */
const PGROUPS = [
  ["A", "Bắt đầu từ đâu", "#4A7C74"],
  ["B", "Nuôi hằng ngày", GREEN],
  ["C", "Khi căng thẳng", "#B0637E"],
  ["D", "Làm một mình", "#5C86A0"],
  ["E", "Chữa lành", "#8A6FA8"],
  ["F", "Lộ trình & cạm bẫy", "#9A6FA0"],
];
/* ================= COMPONENT ================= */

const Block = ({ n, title, intro, color = ACCENT, children }) => (
  <div>
    <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color, fontWeight: 700, marginBottom: intro ? 7 : 10 }}>{n} · {title}</div>
    {intro && <p style={{ fontFamily: SANS, fontSize: 12.6, color: "#5A6B66", lineHeight: 1.6, margin: "0 0 11px" }}>{intro}</p>}
    {children}
  </div>
);

const Thesis = ({ children }) => (
  <p style={{ fontFamily: SANS, fontSize: 13, color: "#5A6B66", lineHeight: 1.65, margin: 0, paddingBottom: 2 }}>{children}</p>
);

export default function LovePhilosophyDeep() {
  const [tab, setTab] = useState(() => {
    const fromUrl = getSubTabFromUrl();
    return TABS.some((t) => t.id === fromUrl) ? fromUrl : "nature";
  });
  useEffect(() => { syncSubTabToUrl(tab); }, [tab]);
  const [lens, setLens] = useState("phil");
  const [pg, setPg] = useState("all");

  const showP = (g) => pg === "all" || pg === g;

  return (
    <div style={{ fontFamily: SERIF, background: PAPER, color: INK }}>
      <div style={{ padding: "26px 16px 60px" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 29, lineHeight: 1.16, margin: 0, fontWeight: 600, letterSpacing: "-0.01em" }}>Tình yêu Trong Triết học - Tâm lý - Thực hành</h1>
        </div>

        <div className="mobile-static" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28, position: "sticky", top: 0, zIndex: 10, background: PAPER, padding: "10px 0", borderBottom: `1px solid ${LINE}` }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); window.__scrollArticleToTop?.(); }}
              style={{ fontFamily: SANS, fontSize: 14, padding: "11px 20px", borderRadius: 9, cursor: "pointer",
                border: `1.5px solid ${tab === t.id ? TAB_ACCENT : LINE}`, background: tab === t.id ? TAB_ACCENT : CARD,
                color: tab === t.id ? "#fff" : "#5A6B66", fontWeight: tab === t.id ? 700 : 600,
                boxShadow: tab === t.id ? `0 2px 10px ${TAB_ACCENT}33` : "none" }}>
              {t.vi}
            </button>
          ))}
        </div>

        {/* ============ 1 · NATURE ============ */}
        {tab === "nature" && (
          <div style={{ display: "grid", gap: 20 }}>
            <Thesis>Tình yêu <b>LÀ</b> gì? Năm lăng kính soi vào cùng một hiện tượng — rồi bản chất chung hiện ra từ chỗ chúng hội tụ, và một mô hình để dùng.</Thesis>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {LENSES.map((l) => (
                <button key={l.key} onClick={() => setLens(l.key)}
                  style={{ fontFamily: SANS, fontSize: 12, padding: "6px 13px", borderRadius: 20, cursor: "pointer",
                    border: `1px solid ${lens === l.key ? l.color : LINE}`, background: lens === l.key ? l.color : CARD,
                    color: lens === l.key ? "#fff" : "#5A6B66", fontWeight: 600 }}>
                  {l.title}
                </button>
              ))}
            </div>

            {LENSES.filter((l) => l.key === lens).map((l) => (
              <div key={l.key} style={{ display: "grid", gap: 12 }}>
                {l.items.map(([label, body], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${l.color}`, borderRadius: 6, background: CARD, padding: "14px 16px" }}>
                    <Sec label={label} color={l.color}>{body}</Sec>
                  </div>
                ))}
                {l.quote && <Quote text={l.quote[0]} by={l.quote[1]} />}
              </div>
            ))}

            <div style={{ background: "#26403C", color: "#EAF3EF", borderRadius: 6, padding: "20px 22px", marginTop: 6 }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#9FD4C6", fontWeight: 700, marginBottom: 10 }}>Bản chất chung — nơi mọi lăng kính hội tụ</div>
              <div style={{ fontSize: 14.6, lineHeight: 1.7 }}>
                Các truyền thống xuất phát từ những tiền đề rất khác nhau, nhưng khi đặt cạnh nhau, năm luận điểm cứ trở đi trở lại. Đây là phần lõi — thứ đáng mang theo dù bạn quên hết chi tiết bên trên.
              </div>
            </div>
            <div style={{ display: "grid", gap: 11 }}>
              {ESSENCE.map(([h, d], i) => (
                <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${GOLD}`, borderRadius: 4, background: CARD, padding: "13px 16px" }}>
                  <div style={{ display: "flex", gap: 11, alignItems: "baseline" }}>
                    <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 800, color: GOLD }}>{i + 1}</span>
                    <div>
                      <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                      <div style={{ fontFamily: SANS, fontSize: 13.3, lineHeight: 1.62, color: "#4C5C57" }}>{d}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Block n="Mô hình" title="Ghép năm lăng kính thành năm tầng" color="#C0839C"
              intro="Năm lăng kính không cạnh tranh nhau — chúng mô tả năm TẦNG cùng vận hành trong mỗi khoảnh khắc yêu. Biết vấn đề của mình nằm ở tầng nào giúp can thiệp đúng chỗ.">
              <div style={{ display: "grid", gap: 8 }}>
                {METAMODEL.map(([h, c, d], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 11, border: `1px solid ${LINE}`, borderLeft: `3px solid ${c}`, borderRadius: 4, background: CARD, padding: "10px 14px", alignItems: "baseline" }}>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 800, color: c }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 14.4, fontWeight: 600 }}>{h}</div>
                      <div style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.58, color: "#4C5C57", marginTop: 1 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12.8, color: "#4C5C57", lineHeight: 1.62, background: "#E6F3EC", border: "1px solid #C4E2D2", borderRadius: 4, padding: "11px 15px", marginTop: 9 }}>
                <b>Cách dùng chẩn đoán:</b> một cơn chán ở tầng SINH HỌC (quen thuộc làm giảm dopamine) cần cái mới lạ — khác với một cơn hoảng ở tầng GẮN BÓ (sợ bị bỏ rơi) cần sự trấn an, và khác với một kỳ vọng độc hại ở tầng VĂN HOÁ (‘phải luôn mãnh liệt’) cần được đặt câu hỏi. Chẩn đoán sai tầng là lý do nhiều nỗ lực sửa chữa bắn trượt.
              </div>
            </Block>

            <Block n="Bất đồng" title="Nơi các truyền thống KHÔNG đồng ý" color="#C0839C"
              intro="Một tài liệu chín không xoá bất đồng để tạo sự hài hoà giả. Bốn căng thẳng dưới đây là thật — mỗi người phải tự định vị mình.">
              <div style={{ display: "grid", gap: 9 }}>
                {DISAGREE.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: "3px solid #C0839C", borderRadius: 4, background: CARD, padding: "12px 15px" }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontFamily: SANS, fontSize: 13.3, lineHeight: 1.62, color: "#4C5C57" }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <div style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, lineHeight: 1.6, fontStyle: "italic", borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              Bản lề của cả tài liệu là luận điểm số 4 — <b>yêu là một thực hành</b>. Bốn tab còn lại tồn tại để dẫn tới đúng chỗ đó: hiểu để làm, không phải hiểu để biết.
            </div>
          </div>
        )}

        {/* ============ 2 · MECHANICS ============ */}
        {tab === "mechanics" && (
          <div style={{ display: "grid", gap: 22 }}>
            <Thesis>Tình yêu <b>VẬN HÀNH</b> thế nào? Phần mô tả — các hệ thống thật sự đang chạy bên dưới cảm xúc. Hiểu cơ chế trước khi cố sửa.</Thesis>

            <Block n="2.1" title="Phong cách gắn bó — khung thực dụng nhất" color="#8A6FA8"
              intro="Cách bạn yêu người lớn phần lớn định hình bởi ‘hệ thống gắn bó’ hình thành từ thơ ấu (Bowlby, Ainsworth, Hazan & Shaver). Không phải nhãn để dán — là bản đồ để hiểu. Phong cách CÓ THỂ đổi.">
              <div style={{ display: "grid", gap: 9 }}>
                {ATTACH.map(([name, color, pct, love, trap], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "8px 15px", background: color, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: SANS, fontSize: 13.3, fontWeight: 700, color: "#fff" }}>{name}</span>
                      <span style={{ fontFamily: SANS, fontSize: 11.5, color: "rgba(255,255,255,0.85)" }}>{pct}</span>
                    </div>
                    <div style={{ padding: "11px 15px", display: "grid", gap: 7 }}>
                      <div style={{ fontSize: 13.8, lineHeight: 1.58 }}><span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color, letterSpacing: "0.04em" }}>CÁCH YÊU · </span>{love}</div>
                      <div style={{ fontSize: 13.8, lineHeight: 1.58 }}><span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: RUST, letterSpacing: "0.04em" }}>BẪY KHI CĂNG · </span>{trap}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#F1ECF6", border: "1px solid #DDD2EA", borderRadius: 4, padding: "12px 15px", marginTop: 10 }}>
                <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: "#8A6FA8", marginBottom: 4 }}>Cái bẫy lo âu – né tránh</div>
                <div style={{ fontSize: 13.7, lineHeight: 1.62 }}>
                  Người lo âu và người né tránh <b>hút nhau</b> một cách oái oăm — mỗi người xác nhận nỗi sợ tệ nhất của người kia. Người lo âu đuổi càng gắt khi thấy xa cách; người né tránh rút càng xa khi thấy bị đuổi. Vòng <b>đuổi–rút</b> này là một trong những động lực phá hoại phổ biến nhất. Phá vòng cần cả hai thấy nó như KẺ THÙ CHUNG, không phải lỗi của nhau (xem EFT, nhóm C tab Thực hành).
                </div>
              </div>
              <div style={{ background: "#E6F3EC", border: "1px solid #C4E2D2", borderRadius: 4, padding: "12px 15px", marginTop: 8 }}>
                <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: GREEN, marginBottom: 4 }}>An toàn ‘có được’ (earned security)</div>
                <div style={{ fontSize: 13.7, lineHeight: 1.62 }}>
                  Tin tốt lớn nhất của lý thuyết gắn bó: phong cách <b>không cố định</b>. Qua một mối quan hệ an toàn nhất quán, qua trị liệu, qua tình bạn lành mạnh và tự điều hoà, một người lớn lên trong bất an vẫn có thể trở nên an toàn. Bản đồ cũ có thể được viết lại — chậm, qua trải nghiệm sửa chữa lặp lại.
                </div>
              </div>
            </Block>

            <Block n="2.2" title="Ba thành tố &amp; các loại tình yêu (Sternberg)"
              intro="Thay vì hỏi nhị phân ‘còn yêu hay hết yêu’, tam giác Sternberg cho ta hỏi tinh hơn: mối quan hệ này đang mạnh/yếu ở thành tố nào?">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 11 }}>
                {STERN_COMP.map(([n, c, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${c}`, borderRadius: 4, background: CARD, padding: "10px 13px" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: c }}>{n}</div>
                    <div style={{ fontFamily: SANS, fontSize: 12.6, lineHeight: 1.5, marginTop: 3 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {STERN_TYPES.map(([name, formula, desc], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(96px, 22%) minmax(120px, 30%) 1fr", gap: 10, border: `1px solid ${LINE}`, borderRadius: 4, background: i === 6 ? "#E6F3EC" : CARD, padding: "9px 13px", alignItems: "center" }}>
                    <div style={{ fontSize: 13.8, fontWeight: 700, color: i === 6 ? GREEN : INK }}>{name}</div>
                    <div style={{ fontFamily: SANS, fontSize: 11.8, color: ACCENT, fontWeight: 600 }}>{formula}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.5, color: "#4C5C57" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="2.3" title="Vòng đời sinh hoá của tình yêu" color="#C0839C"
              intro="Ba hệ thống não (Fisher) chạy trên ba bộ hoá học khác nhau, theo một cung thời gian. Hiểu cung này giải phóng ta khỏi nỗi sợ ‘hết yêu’ khi cơn say lắng xuống.">
              <div style={{ display: "grid", gap: 8 }}>
                {NEUROCHEM.map(([stage, color, chem, what, time], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${color}`, borderRadius: 4, background: CARD, padding: "11px 15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", alignItems: "baseline", marginBottom: 3 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{stage}</span>
                      <span style={{ fontFamily: SANS, fontSize: 11, color: MUTE }}>{time}</span>
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 11.8, color, fontWeight: 700, marginBottom: 3 }}>{chem}</div>
                    <div style={{ fontSize: 13.6, lineHeight: 1.58 }}>{what}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12.8, color: "#4C5C57", lineHeight: 1.6, background: "#F1ECF6", border: "1px solid #DDD2EA", borderRadius: 4, padding: "11px 14px", marginTop: 9 }}>
                <b>Điểm mấu chốt:</b> sự chuyển từ giai đoạn 2 sang 3 (thường quanh 18–36 tháng) hay bị hiểu nhầm là ‘hết yêu’ — thực ra là sinh học chuyển chế độ từ say sang bền. ‘Hiệu ứng Coolidge’ (dopamine sụt với quen thuộc, vọt với mới lạ) là cơ sở sinh học của nghịch lý Perel.
              </div>
            </Block>

            <Block n="2.4" title="Ham muốn: tự phát hay đáp ứng (Nagoski)" color="#C0839C"
              intro="Một trong những hiểu lầm gây khổ nhất trong quan hệ dài là về bản chất của ham muốn.">
              <div style={{ display: "grid", gap: 8 }}>
                {DESIRE.map(([h, color, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${color}`, borderRadius: 4, background: CARD, padding: "12px 15px" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="2.5" title="Ngôn ngữ tình yêu — ẩn dụ hữu ích, không phải khoa học"
              intro="Chapman đề xuất 5 ‘kênh’ cho và nhận yêu thương. Ý tưởng lõi hữu ích: ta thường cho theo kênh CỦA MÌNH thay vì kênh của người kia — nên tình yêu thật vẫn có thể ‘không tới nơi’.">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 10 }}>
                {LOVE_LANG.map(([n, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "10px 13px" }}>
                    <div style={{ fontSize: 13.9, fontWeight: 600, color: ACCENT }}>{n}</div>
                    <div style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.5, marginTop: 2 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#FDF4F8", border: "1px solid #E7CBD8", borderRadius: 4, padding: "11px 15px" }}>
                <div style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 700, color: RUST, marginBottom: 4, letterSpacing: "0.04em" }}>TRUNG THỰC VỀ BẰNG CHỨNG</div>
                <div style={{ fontSize: 13.4, lineHeight: 1.6 }}>
                  Nghiên cứu KHÔNG ủng hộ mạnh mô hình 5 loại rời rạc: các phân tích không tìm thấy cấu trúc 5 nhân tố sạch, và ‘khớp ngôn ngữ’ dự báo hài lòng rất yếu. Hãy dùng nó như một <b>ẩn dụ để chú ý tới khác biệt sở thích</b>, không phải một phân loại khoa học. Cái lõi thật — <i>quan sát người kia cảm nhận được yêu qua kênh nào, rồi cho theo kênh đó</i> — vẫn quý giá.
                </div>
              </div>
            </Block>
          </div>
        )}

        {/* ============ 3 · LONG HAUL ============ */}
        {tab === "longhaul" && (
          <div style={{ display: "grid", gap: 22 }}>
            <Thesis><b>SỐNG</b> với tình yêu ra sao? Các căng thẳng phải mang, năng lực phải học, và những chặng đường thật: hôn nhân, đời thường, các giai đoạn đời, và chỗ của tình yêu trong một cuộc đời.</Thesis>

            <Block n="3.1" title="Những nghịch lý phải sống cùng (không phải để giải)"
              intro="Đây là các căng thẳng nội tại không thể ‘giải quyết’ — chỉ có thể sống cùng một cách có ý thức. Nhận diện được nghịch lý giúp ngừng tìm lời giải sai cho vấn đề vốn không phải để giải.">
              <div style={{ display: "grid", gap: 9 }}>
                {PARADOX.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontFamily: SANS, fontSize: 13.3, fontWeight: 700, color: ACCENT, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="3.2" title="Yêu như một năng lực (Fromm — ‘Nghệ thuật Yêu’)"
              intro="Xã hội dạy ta ám ảnh với việc được yêu và tìm đúng người, mà bỏ qua NĂNG LỰC yêu — như thể vẽ đẹp chỉ là chuyện tìm đúng phong cảnh chứ không phải học vẽ.">
              <div style={{ display: "grid", gap: 9 }}>
                {FROMM4.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{i + 1}. {h}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <Quote text="Immature love says: ‘I love you because I need you.’ Mature love says: ‘I need you because I love you.’" by="Erich Fromm — yêu chưa trưởng thành: ‘cần nên yêu’; yêu trưởng thành: ‘yêu nên cần’" />
              </div>
            </Block>

            <Block n="3.3" title="Tình yêu và hôn nhân — đường dài" color="#5C86A0"
              intro="Hôn nhân (hay bất kỳ cam kết dài hạn nào) đặt tình yêu vào một bài kiểm tra khác hẳn: không phải cường độ, mà là độ bền và khả năng cùng trưởng thành.">
              <div style={{ display: "grid", gap: 9 }}>
                {MARRIAGE.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: "3px solid #5C86A0", borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="3.4" title="Đời thường: tiền bạc, việc nhà, gánh nặng tinh thần" color="#5C86A0"
              intro="Tình yêu sống hay chết phần lớn ở đời thường, không ở những khoảnh khắc lớn. Ba mặt trận âm thầm bào mòn nhiều mối quan hệ nhất.">
              <div style={{ display: "grid", gap: 8 }}>
                {MUNDANE.map(([h, color, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${color}`, borderRadius: 4, background: CARD, padding: "12px 15px" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="3.5" title="Tình yêu qua các giai đoạn đời" color="#B0637E"
              intro="Cùng một người, cùng một tình yêu — nhưng bài toán đổi hoàn toàn theo từng chặng. Rất nhiều đau khổ đến từ việc dùng thước đo của chặng này cho chặng khác.">
              <div style={{ display: "grid", gap: 9 }}>
                {STAGES.map(([h, color, what, todo], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "9px 15px", background: color }}>
                      <span style={{ fontFamily: SANS, fontSize: 13.2, fontWeight: 700, color: "#fff" }}>{h}</span>
                    </div>
                    <div style={{ padding: "11px 15px", display: "grid", gap: 7 }}>
                      <div style={{ fontSize: 13.8, lineHeight: 1.62 }}>{what}</div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.6, background: "#E8F2EE", borderLeft: `2px solid ${color}`, borderRadius: "0 3px 3px 0", padding: "8px 12px" }}>{todo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="3.6" title="Các cấu hình quan hệ khác nhau" color="#5C86A0"
              intro="Phần lớn lời khuyên về tình yêu ngầm giả định một khuôn duy nhất: cặp đôi trẻ, dị tính, sống chung, chưa con. Nguyên lý gắn bó và sửa chữa vẫn đúng cho tất cả; cái khác là bối cảnh và áp lực.">
              <div style={{ display: "grid", gap: 9 }}>
                {CONFIGS.map(([h, color, what, need], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${color}`, borderRadius: 4, background: CARD, padding: "12px 15px" }}>
                    <div style={{ fontFamily: SANS, fontSize: 13.2, fontWeight: 700, color, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.62, marginBottom: 7 }}>{what}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.6, background: "#E8F2EE", borderRadius: 3, padding: "8px 12px" }}>
                      <span style={{ fontFamily: SANS, fontSize: 10.3, fontWeight: 700, color, letterSpacing: "0.04em" }}>ĐỊA HÌNH RIÊNG · </span>{need}
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="3.7" title="Tình yêu và cuộc đời — đặt yêu vào đúng chỗ" color={GREEN}
              intro="Tình yêu đôi lứa không tồn tại trong chân không — nó là một phần của một cuộc đời rộng hơn. Đặt nó đúng chỗ làm nó nhẹ gánh và bền hơn.">
              <div style={{ display: "grid", gap: 9 }}>
                {LIFE.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${GREEN}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="3.8" title="Dấu hiệu của tình yêu trưởng thành">
              <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "14px 18px", background: CARD, fontSize: 14.2, lineHeight: 1.85 }}>
                {MATURE_SIGNS}
              </div>
            </Block>
          </div>
        )}

        {/* ============ 4 · BROKEN ============ */}
        {tab === "broken" && (
          <div style={{ display: "grid", gap: 22 }}>
            <Thesis>Khi tình yêu <b>HỎNG</b>. Những gì đội lốt tình yêu, ranh giới sống còn với lạm dụng, các vết thương mang theo, sự phản bội, và chia ly. Phần này để nhận diện — không phải để chẩn đoán người khác.</Thesis>

            <Block n="4.1" title="Mặt tối — những gì đội lốt tình yêu" color={RUST}>
              <div style={{ display: "grid", gap: 9 }}>
                {DARK.map(([h, d], i) => (
                  <div key={i} style={{ border: "1px solid #E7CBD8", background: "#FDF4F8", borderRadius: 4, padding: "12px 15px" }}>
                    <div style={{ fontFamily: SANS, fontSize: 13.3, fontWeight: 700, color: RUST, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="4.2" title="Ranh giới sống còn: XUNG ĐỘT khác LẠM DỤNG" color={RUST}
              intro="Xung đột nhiều KHÔNG đồng nghĩa lạm dụng; và lạm dụng có thể diễn ra rất êm, ít cãi vã (kiểm soát cưỡng chế — Evan Stark). Dấu hiệu phân định không phải tần suất cãi, mà là SỢ HÃI và QUYỀN LỰC.">
              <div style={{ overflowX: "auto", border: `1px solid ${LINE}`, borderRadius: 4 }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 520, fontSize: 12.8, fontFamily: SANS }}>
                  <thead><tr>
                    <th style={{ textAlign: "left", padding: "8px 11px", background: "#EEF5EF", borderBottom: `1px solid ${LINE}`, width: "22%" }}></th>
                    <th style={{ textAlign: "left", padding: "8px 11px", background: "#E6F3EC", borderBottom: `1px solid ${LINE}`, color: GREEN }}>Xung đột lành mạnh</th>
                    <th style={{ textAlign: "left", padding: "8px 11px", background: "#FDF4F8", borderBottom: `1px solid ${LINE}`, color: RUST }}>Lạm dụng / kiểm soát</th>
                  </tr></thead>
                  <tbody>
                    {CVA.map((r, i) => (
                      <tr key={i}>
                        <td style={{ padding: "8px 11px", borderBottom: i < CVA.length - 1 ? "1px solid #DFEAE5" : "none", fontWeight: 700, color: MUTE }}>{r[0]}</td>
                        <td style={{ padding: "8px 11px", borderBottom: i < CVA.length - 1 ? "1px solid #DFEAE5" : "none", lineHeight: 1.5, color: "#2E5A4A" }}>{r[1]}</td>
                        <td style={{ padding: "8px 11px", borderBottom: i < CVA.length - 1 ? "1px solid #DFEAE5" : "none", lineHeight: 1.5, color: "#9A5A70" }}>{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12.6, color: "#3A4A45", lineHeight: 1.6, marginTop: 8, background: "#FDF4F8", border: "1px solid #E7CBD8", borderRadius: 4, padding: "10px 13px" }}>
                <b>DARVO</b> — một dấu hiệu cảnh báo: khi bị chất vấn, kẻ gây hại thường <b>D</b>eny (chối), <b>A</b>ttack (tấn công người vạch trần), rồi <b>R</b>everse <b>V</b>ictim &amp; <b>O</b>ffender (đảo vai — ‘chính anh/tôi mới là nạn nhân’). Nhận ra khuôn mẫu này giúp không bị lung lay khỏi thực tại. Nếu có sợ hãi thường trực, an toàn của bạn đứng trên việc ‘cứu’ mối quan hệ.
              </div>
            </Block>

            <Block n="4.3" title="Bốn ‘kỵ sĩ’ báo hiệu đổ vỡ (Gottman) &amp; thuốc giải" color={RUST}>
              <div style={{ display: "grid", gap: 7 }}>
                {HORSEMEN.map(([h, what, anti], i) => (
                  <div key={i} style={{ border: "1px solid #E7CBD8", background: "#FDF4F8", borderRadius: 4, padding: "10px 14px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: RUST, marginBottom: 2 }}>{i + 1}. {h}</div>
                    <div style={{ fontSize: 13.4, lineHeight: 1.55, marginBottom: 5 }}>{what}</div>
                    <div style={{ fontSize: 13.2, lineHeight: 1.55, background: "#E6F3EC", borderLeft: `2px solid ${GREEN}`, borderRadius: "0 3px 3px 0", padding: "6px 11px" }}>
                      <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: GREEN, letterSpacing: "0.04em" }}>THUỐC GIẢI · </span>{anti}
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="4.4" title="Tình yêu của người mang tổn thương — và cách chữa lành" color="#8A6FA8"
              intro="Rất nhiều khó khăn trong tình yêu không đến từ ‘sai người’ mà từ những vết thương gắn bó cũ đang chạy một bản đồ lỗi thời. Hiểu điều này chuyển từ tự trách sang tự chữa.">
              <div style={{ display: "grid", gap: 9, marginBottom: 14 }}>
                {TRAUMA.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: "3px solid #8A6FA8", borderRadius: 4, padding: "12px 15px", background: CARD }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#F1ECF6", border: "1px solid #DDD2EA", borderRadius: 4, padding: "13px 16px" }}>
                <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: "#8A6FA8", fontWeight: 700, marginBottom: 8 }}>Cách sửa chữa — từng bước nhỏ, bền bỉ</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {TRAUMA_REPAIR.map(([h, d], i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 9 }}>
                      <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 800, color: "#8A6FA8" }}>{i + 1}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{h}</div>
                        <div style={{ fontSize: 13.6, lineHeight: 1.58, marginTop: 1 }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Block>

            <Block n="4.5" title="Hàn gắn sau phản bội" color={RUST}
              intro="Phản bội là một trong những thử thách nặng nhất của tình yêu. Nó khác với tổn thương thông thường và cần một lộ trình riêng — với điều kiện rõ ràng.">
              <div style={{ display: "grid", gap: 8 }}>
                {BETRAYAL.map(([h, d], i) => (
                  <div key={i} style={{ border: "1px solid #E7CBD8", background: "#FDF4F8", borderRadius: 4, padding: "12px 15px" }}>
                    <div style={{ fontSize: 14.4, fontWeight: 600, color: "#9A5A70", marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.8, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block n="4.6" title="Khi tình yêu tan vỡ — khoa học của chia ly" color="#9A6FA0"
              intro="Chia ly là một phần của hành trình yêu, và nó có sinh học riêng. Hiểu điều gì đang xảy ra trong não và cơ thể giúp bạn tử tế với chính mình (thực hành ở nhóm E tab kế).">
              <div style={{ display: "grid", gap: 8 }}>
                {HEARTBREAK.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: "3px solid #9A6FA0", borderRadius: 4, background: CARD, padding: "12px 15px" }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontSize: 13.9, lineHeight: 1.62 }}>{d}</div>
                  </div>
                ))}
              </div>
            </Block>
          </div>
        )}

        {/* ============ 5 · PRACTICE ============ */}
        {tab === "practice" && (
          <div style={{ display: "grid", gap: 20 }}>
            <div style={{ background: "#26403C", color: "#EAF3EF", borderRadius: 6, padding: "20px 22px" }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#9FD4C6", fontWeight: 700, marginBottom: 9 }}>Điều quan trọng nhất của cả tài liệu</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.72, fontWeight: 500 }}>
                Mọi lý thuyết ở bốn tab trước <b>chỉ có giá trị khi được thực hành</b>. Hiểu về tình yêu mà không đổi hành vi thì cũng như đọc hết sách về bơi mà chưa từng xuống nước — bạn không biết bơi, bạn chỉ biết nhiều hơn về bơi.
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: "1px solid #365650", color: "#CDE0DA" }}>
                Và thực hành một lần không đủ. Tình yêu là một <b>thực hành được duy trì bền bỉ</b> — hàng nghìn hành động nhỏ lặp lại, không phải một quyết tâm lớn. Giá trị đến từ sự kiên trì, không từ cường độ nhất thời. Nguyên tắc nền: <b>đừng cố áp dụng tất cả cùng lúc</b>. Chọn 1–2 điểm cộng hưởng nhất, thực hành đều trong 30 ngày, rồi mới thêm.
              </div>
            </div>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 11.5, color: MUTE, marginBottom: 7, fontWeight: 600 }}>Lọc theo nhóm — 17 mục trong 6 nhóm</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button onClick={() => setPg("all")}
                  style={{ fontFamily: SANS, fontSize: 11.8, padding: "6px 12px", borderRadius: 20, cursor: "pointer", border: `1px solid ${pg === "all" ? INK : LINE}`, background: pg === "all" ? INK : CARD, color: pg === "all" ? "#fff" : "#5A6B66", fontWeight: 600 }}>Tất cả</button>
                {PGROUPS.map(([k, name, c]) => (
                  <button key={k} onClick={() => setPg(k)}
                    style={{ fontFamily: SANS, fontSize: 11.8, padding: "6px 12px", borderRadius: 20, cursor: "pointer", border: `1px solid ${pg === k ? c : LINE}`, background: pg === k ? c : CARD, color: pg === k ? "#fff" : "#5A6B66", fontWeight: 600 }}>{k} · {name}</button>
                ))}
              </div>
            </div>

            {/* ---- A · BẮT ĐẦU ---- */}
            {showP("A") && (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: 9 }}>
                  <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: ACCENT }}>A · Bắt đầu từ đâu</div>
                  <div style={{ fontFamily: SANS, fontSize: 12.4, color: MUTE, marginTop: 2 }}>Làm hai mục này trước khi làm bất cứ gì khác.</div>
                </div>

                <Block n="A1" title="Tự chẩn đoán" intro="Lấy giấy bút, trả lời thật. Mỗi câu gắn với một dòng lý thuyết và chỉ ra bạn cần tập trung vào đâu.">
                  <div style={{ display: "grid", gap: 8 }}>
                    {DIAG_Q.map(([q, tag], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "11px 15px", background: CARD }}>
                        <div style={{ fontSize: 14.6, lineHeight: 1.5, fontWeight: 600, marginBottom: 4 }}>{i + 1}. {q}</div>
                        <div style={{ fontFamily: SANS, fontSize: 12.3, color: "#6E7F79", lineHeight: 1.5 }}>{tag}</div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="A2" title="Tự chấm sức khoẻ mối quan hệ (mỗi quý)" color={GREEN}
                  intro="Chấm mỗi mục 1–5 cho CHÍNH MÌNH (không phải chấm điểm người kia). Công cụ tự soi và mở đối thoại — không phải bản án.">
                  <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, overflow: "hidden" }}>
                    {SCORECARD.map((q, i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "26px 1fr auto", gap: 10, padding: "10px 14px", borderTop: i > 0 ? "1px solid #DFEAE5" : "none", alignItems: "center" }}>
                        <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 800, color: GREEN }}>{i + 1}</div>
                        <div style={{ fontSize: 13.7, lineHeight: 1.5 }}>{q}</div>
                        <div style={{ fontFamily: SANS, fontSize: 11.5, color: MUTE, letterSpacing: "0.14em" }}>1 2 3 4 5</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 12.5, color: "#4C5C57", lineHeight: 1.6, background: "#E8F2EE", border: `1px solid ${LINE}`, borderRadius: 4, padding: "10px 14px", marginTop: 8 }}>
                    <b>Cách đọc:</b> đừng nhìn tổng điểm. Nhìn mục THẤP NHẤT — đó là nơi cần làm việc quý này. Nếu ‘An toàn’ hoặc ‘Tin cậy’ thấp kéo dài, đó là tín hiệu nghiêm trọng cần xử lý trước mọi thứ khác.
                  </div>
                </Block>
              </div>
            )}

            {/* ---- B · HẰNG NGÀY ---- */}
            {showP("B") && (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ borderTop: `2px solid ${GREEN}`, paddingTop: 9 }}>
                  <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: GREEN }}>B · Nuôi hằng ngày</div>
                  <div style={{ fontFamily: SANS, fontSize: 12.4, color: MUTE, marginTop: 2 }}>Phần hiện thân của thông điệp ‘duy trì bền bỉ’ — làm ít, đều đặn.</div>
                </div>

                <Block n="B1" title="Biến lý thuyết thành thói quen hằng ngày" color={GREEN}
                  intro="Mỗi dòng tư tưởng lớn được ‘dịch’ thành một hành vi cụ thể, đủ nhỏ để làm mỗi ngày. Đây là cầu nối trực tiếp từ hiểu sang làm.">
                  <div style={{ display: "grid", gap: 9 }}>
                    {T2A.map(([theory, action], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                        <div style={{ padding: "8px 15px", background: "#E8F2EE", fontFamily: SANS, fontSize: 12.3, fontWeight: 700, color: ACCENT, lineHeight: 1.45 }}>{theory}</div>
                        <div style={{ padding: "10px 15px", fontSize: 13.9, lineHeight: 1.6 }}>
                          <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: GREEN, letterSpacing: "0.04em" }}>→ LÀM: </span>{action}
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="B2" title="Nhịp duy trì (làm đều mới có giá trị)" color={GREEN}
                  intro="Không phải làm nhiều một lần, mà làm ít một cách đều đặn theo bốn nhịp.">
                  <div style={{ display: "grid", gap: 10 }}>
                    {RHYTHM.map(([when, color, what], i) => (
                      <div key={i} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14 }}>
                        <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{when}</div>
                        <div style={{ fontSize: 13.9, lineHeight: 1.62 }}>{what}</div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="B3" title="Sổ tay câu chữ (đổi câu hỏng → câu lành)" color={GREEN}>
                  <div style={{ overflowX: "auto", border: `1px solid ${LINE}`, borderRadius: 4 }}>
                    <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 580, fontSize: 13.2, fontFamily: SANS }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "9px 12px", background: "#FBEEF3", borderBottom: `1px solid ${LINE}`, color: "#B0637E", width: "46%" }}>Thay vì nói</th>
                          <th style={{ textAlign: "left", padding: "9px 12px", background: "#E6F3EC", borderBottom: `1px solid ${LINE}`, color: GREEN }}>Hãy thử</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PHRASES.map((row, i) => (
                          <tr key={i}>
                            <td style={{ padding: "9px 12px", borderBottom: i < PHRASES.length - 1 ? "1px solid #DFEAE5" : "none", lineHeight: 1.5, color: "#9A5A70" }}>{row[0]}</td>
                            <td style={{ padding: "9px 12px", borderBottom: i < PHRASES.length - 1 ? "1px solid #DFEAE5" : "none", lineHeight: 1.5, color: "#2E5A4A" }}>{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Block>

                <Block n="B4" title="Mẫu ‘check-in’ định kỳ (bảo trì, không phải toà án)" color={GREEN}
                  intro="Các cặp bền không chờ vấn đề tích tụ thành khủng hoảng — họ bảo trì định kỳ. 20–30 phút mỗi tuần, cùng một cấu trúc.">
                  <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "14px 18px" }}>
                    <div style={{ display: "grid", gap: 10 }}>
                      {CHECKIN.map(([h, d], i) => (
                        <div key={i} style={{ display: "flex", gap: 12 }}>
                          <div style={{ fontFamily: SANS, fontWeight: 800, color: ACCENT, fontSize: 14, flexShrink: 0, width: 16 }}>{i + 1}</div>
                          <div>
                            <div style={{ fontSize: 14.2, fontWeight: 600 }}>{h}</div>
                            <div style={{ fontSize: 13.7, lineHeight: 1.55, color: "#4C5C57", marginTop: 2 }}>{d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${LINE}`, fontFamily: SANS, fontSize: 12.3, color: MUTE, lineHeight: 1.55 }}>
                      Quy tắc: không dùng buổi check-in để ‘phục kích’ nhau. Nếu một chủ đề quá nóng, ghi lại và hẹn nói riêng khi đã bình tĩnh. Mục tiêu là bảo trì.
                    </div>
                  </div>
                </Block>

                <Block n="B5" title="Nuôi ham muốn" color="#C0839C"
                  intro="Nguyên tắc lõi: gỡ phanh trước khi đạp ga — và ngừng chờ ‘hứng tự nhiên’ nếu bạn thiên về ham muốn đáp ứng.">
                  <div style={{ display: "grid", gap: 8 }}>
                    {DESIRE_DO.map(([h, d], i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 10, border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, color: "#C0839C" }}>{i + 1}</div>
                        <div>
                          <div style={{ fontSize: 14.2, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                          <div style={{ fontSize: 13.7, lineHeight: 1.6 }}>{d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>
            )}

            {/* ---- C · KHI CĂNG THẲNG ---- */}
            {showP("C") && (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ borderTop: `2px solid #B0637E`, paddingTop: 9 }}>
                  <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: "#B0637E" }}>C · Khi căng thẳng</div>
                  <div style={{ fontFamily: SANS, fontSize: 12.4, color: MUTE, marginTop: 2 }}>Lúc đang giận, mọi lý thuyết bay hết. Học thuộc như học lái xe — lặp đủ nhiều thì thành phản xạ.</div>
                </div>

                <Block n="C1" title="Giao thức sửa lỗi xung đột (kèm câu chữ thật)" color="#B0637E">
                  <div style={{ display: "grid", gap: 9 }}>
                    {REPAIR.map(([step, theory, body, say], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                        <div style={{ padding: "8px 15px", background: "#DFEDE8", display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 700, color: ACCENT }}>{step}</span>
                          <span style={{ fontFamily: SANS, fontSize: 11, color: MUTE, fontStyle: "italic" }}>{theory}</span>
                        </div>
                        <div style={{ padding: "10px 15px" }}>
                          <div style={{ fontSize: 13.7, lineHeight: 1.6, marginBottom: 8 }}>{body}</div>
                          <div style={{ background: "#E6F3EC", borderLeft: `3px solid ${GREEN}`, borderRadius: "0 4px 4px 0", padding: "8px 12px", fontSize: 13.7, lineHeight: 1.6 }}>
                            <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: GREEN, letterSpacing: "0.04em", display: "block", marginBottom: 3 }}>NÓI THẾ NÀY</span>{say}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="C2" title="Tháo ‘vòng lặp quỷ’ (EFT — Sue Johnson)" color={GREEN}
                  intro="Liệu pháp cặp đôi có bằng chứng mạnh nhất, dựa trên lý thuyết gắn bó. Dưới hầu hết xung đột lặp lại, cả hai đang hỏi cùng một câu — ‘anh/em có ở đó với em/anh không?’">
                  <div style={{ display: "grid", gap: 8 }}>
                    {EFT.map(([h, d], i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 10, border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, color: GREEN }}>{i + 1}</div>
                        <div>
                          <div style={{ fontSize: 14.4, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                          <div style={{ fontSize: 13.7, lineHeight: 1.6 }}>{d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="C3" title="Làm việc với phong cách gắn bó (của mình và của họ)" color="#8A6FA8"
                  intro="Biết phong cách gắn bó (tab 2) chỉ có giá trị khi thành hành động. Đây là việc cụ thể cho từng tình huống.">
                  <div style={{ display: "grid", gap: 8 }}>
                    {ATTACH_DO.map(([h, color, d], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${color}`, borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 12.3, fontWeight: 700, color, marginBottom: 3 }}>{h}</div>
                        <div style={{ fontSize: 13.7, lineHeight: 1.6 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>
            )}

            {/* ---- D · MỘT MÌNH ---- */}
            {showP("D") && (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ borderTop: `2px solid #5C86A0`, paddingTop: 9 }}>
                  <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: "#5C86A0" }}>D · Làm một mình</div>
                  <div style={{ fontFamily: SANS, fontSize: 12.4, color: MUTE, marginTop: 2 }}>Phần lớn vấn đề trong tình yêu không sửa được bằng kỹ thuật giao tiếp — gốc nằm ở bản đồ nội tâm của chính mình.</div>
                </div>

                <Block n="D1" title="Việc nội tâm (gốc rễ của mọi thứ)" color="#5C86A0">
                  <div style={{ display: "grid", gap: 9 }}>
                    {INNER.map(([title, tag, body], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "12px 15px", background: CARD }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                          <span style={{ fontSize: 14.8, fontWeight: 600 }}>{title}</span>
                          <span style={{ fontFamily: SANS, fontSize: 11, color: MUTE, fontStyle: "italic" }}>{tag}</span>
                        </div>
                        <div style={{ fontSize: 13.9, lineHeight: 1.62 }}>{body}</div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="D2" title="Thực hành khi độc thân" color="#5C86A0"
                  intro="Phần lớn ‘công việc của tình yêu’ làm được — và nên làm — khi chưa có ai. Chuẩn bị nền tảng quan trọng hơn tìm kiếm.">
                  <div style={{ display: "grid", gap: 8 }}>
                    {SOLO.map(([h, d], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                        <div style={{ fontSize: 14.4, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                        <div style={{ fontSize: 13.7, lineHeight: 1.6 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>
            )}

            {/* ---- E · CHỮA LÀNH ---- */}
            {showP("E") && (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ borderTop: `2px solid #8A6FA8`, paddingTop: 9 }}>
                  <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: "#8A6FA8" }}>E · Chữa lành</div>
                  <div style={{ fontFamily: SANS, fontSize: 12.4, color: MUTE, marginTop: 2 }}>Sau phản bội, và sau mất mát. Ứng với tab 4 · Khi hỏng.</div>
                </div>

                <Block n="E1" title="Xây lại lòng tin sau phản bội" color={RUST}
                  intro="Mỗi bước ghi rõ việc đó thuộc về AI — vì phân vai sai là lý do nhiều nỗ lực hàn gắn thất bại.">
                  <div style={{ display: "grid", gap: 8 }}>
                    {REBUILD.map(([h, who, d], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                        <div style={{ padding: "8px 14px", background: "#FDF4F8", display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontFamily: SANS, fontSize: 12.6, fontWeight: 700, color: "#9A5A70" }}>{i + 1}. {h}</span>
                          <span style={{ fontFamily: SANS, fontSize: 10.5, color: "#fff", background: RUST, padding: "2px 8px", borderRadius: 2, letterSpacing: "0.04em", alignSelf: "center" }}>{who}</span>
                        </div>
                        <div style={{ padding: "10px 14px", fontSize: 13.7, lineHeight: 1.6 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="E2" title="Tha thứ — cho chính mình (REACH)" color="#8A6FA8">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 8, marginBottom: 11 }}>
                    <div style={{ background: "#E6F3EC", border: "1px solid #C4E2D2", borderRadius: 4, padding: "11px 14px" }}>
                      <div style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 700, color: GREEN, marginBottom: 5, letterSpacing: "0.04em" }}>THA THỨ LÀ</div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13.4, lineHeight: 1.6 }}>
                        {FORGIVE_IS.map((x, i) => <li key={i} style={{ marginBottom: 3 }}>{x}</li>)}
                      </ul>
                    </div>
                    <div style={{ background: "#FDF4F8", border: "1px solid #E7CBD8", borderRadius: 4, padding: "11px 14px" }}>
                      <div style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 700, color: RUST, marginBottom: 5, letterSpacing: "0.04em" }}>THA THỨ KHÔNG PHẢI</div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13.4, lineHeight: 1.6 }}>
                        {FORGIVE_ISNT.map((x, i) => <li key={i} style={{ marginBottom: 3 }}>{x}</li>)}
                      </ul>
                    </div>
                  </div>
                  <p style={{ fontFamily: SANS, fontSize: 12.6, color: "#5A6B66", lineHeight: 1.6, margin: "0 0 9px" }}>
                    Mô hình REACH (Everett Worthington) — quy trình có bằng chứng, và bản thân Worthington đã dùng nó sau khi mẹ ông bị sát hại. Đây không phải sự yếu đuối; nó là một trong những việc khó nhất con người làm được.
                  </p>
                  <div style={{ display: "grid", gap: 7 }}>
                    {REACH.map(([h, d], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: "3px solid #8A6FA8", borderRadius: 4, background: CARD, padding: "10px 14px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 12.6, fontWeight: 700, color: "#8A6FA8", marginBottom: 2 }}>{h}</div>
                        <div style={{ fontSize: 13.6, lineHeight: 1.6 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="E3" title="Phục hồi sau chia ly" color="#9A6FA0"
                  intro="Ứng với mục 4.6. Sáu việc cụ thể để đi qua mất mát và trưởng thành từ nó.">
                  <div style={{ display: "grid", gap: 8 }}>
                    {BREAKUP.map(([h, d], i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 10, border: `1px solid ${LINE}`, borderLeft: "3px solid #9A6FA0", borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, color: "#9A6FA0" }}>{i + 1}</div>
                        <div>
                          <div style={{ fontSize: 14.2, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                          <div style={{ fontSize: 13.7, lineHeight: 1.6 }}>{d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>
            )}

            {/* ---- F · LỘ TRÌNH ---- */}
            {showP("F") && (
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ borderTop: `2px solid #9A6FA0`, paddingTop: 9 }}>
                  <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: "#9A6FA0" }}>F · Lộ trình &amp; cạm bẫy</div>
                  <div style={{ fontFamily: SANS, fontSize: 12.4, color: MUTE, marginTop: 2 }}>Nếu không biết bắt đầu thế nào — bắt đầu ở đây.</div>
                </div>

                <Block n="F1" title="Chương trình 90 ngày (làm ít mà sâu, mỗi tháng một trụ cột)" color="#9A6FA0">
                  <div style={{ display: "grid", gap: 9 }}>
                    {PROGRAM90.map(([title, color, goal, items], i) => (
                      <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                        <div style={{ padding: "10px 15px", background: color, color: "#fff" }}>
                          <div style={{ fontFamily: SANS, fontSize: 13.3, fontWeight: 700 }}>{title}</div>
                          <div style={{ fontFamily: SANS, fontSize: 11.8, opacity: 0.9, marginTop: 2 }}>{goal}</div>
                        </div>
                        <ul style={{ margin: 0, padding: "11px 15px 11px 32px", fontSize: 13.7, lineHeight: 1.6 }}>
                          {items.map((it, j) => <li key={j} style={{ marginBottom: 4 }}>{it}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block n="F2" title="Cạm bẫy khi áp dụng (đọc kỹ phần này)" color={RUST}>
                  <div style={{ display: "grid", gap: 8 }}>
                    {TRAPS.map(([h, d], i) => (
                      <div key={i} style={{ border: "1px solid #EEC9D6", background: "#FDF2F6", borderRadius: 4, padding: "11px 15px" }}>
                        <div style={{ fontSize: 14.2, fontWeight: 600, color: RUST, marginBottom: 3 }}>{h}</div>
                        <div style={{ fontSize: 13.7, lineHeight: 1.6, color: "#3A4A45" }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>
            )}

            <div style={{ background: "#E8F2EE", borderRadius: 6, padding: "19px 22px", border: `1px solid ${LINE}` }}>
              <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.07em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 8 }}>Nếu chỉ nhớ được một trang</div>
              <div style={{ fontSize: 14.6, lineHeight: 1.78 }}>
                Tình yêu trưởng thành không phải cảm giác bạn <i>rơi vào</i> mà là năng lực bạn <i>xây dựng</i> — và duy trì. Ba trụ cột:
                <br /><br />
                <b>1. Nhìn cho rõ</b> — luyện chú ý để yêu con người thật, không phải hình ảnh mình dựng (Murdoch/Jung/Fromm). Kẻ thù không phải người kia, mà là cái tôi phóng chiếu.
                <br /><br />
                <b>2. Giữ được mình</b> — gần gũi sâu mà không tan biến; tự trấn an được khi một mình; có đời sống riêng (Schnarch/Rilke/Perel).
                <br /><br />
                <b>3. Làm mỗi ngày, và làm mãi</b> — yêu là động từ ở thì tiếp diễn. Trân trọng nói thành lời, chăm sóc chủ động, hiện diện không màn hình, hỏi câu mới, thử điều mới (hooks/Gottman/Aron). Một mối quan hệ tuyệt vời là hàng nghìn hành động nhỏ được lặp lại bền bỉ, không phải một quyết định lớn.
                <br /><br />
                Và trụ cột thứ tư ít ai nói: <b>biết khi nào buông là yêu</b> — thương một người vô điều kiện không có nghĩa ở lại một mối quan hệ vô điều kiện.
                <br /><br />
                <span style={{ fontFamily: SANS, fontSize: 13, color: ACCENT, fontWeight: 600 }}>Lý thuyết ở đây chỉ là bản đồ. Giá trị nằm ở việc bạn thật sự bước đi — mỗi ngày, và duy trì.</span>
              </div>
            </div>
          </div>
        )}

        {(() => {
          const idx = TABS.findIndex((t) => t.id === tab);
          const next = idx >= 0 && idx < TABS.length - 1 ? TABS[idx + 1] : null;
          if (!next) return null;
          return (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
              <button
                onClick={() => { setTab(next.id); window.__scrollArticleToTop?.(); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 15px", borderRadius: 6, border: `1.5px solid ${TAB_ACCENT}`, background: `${TAB_ACCENT}15`, color: TAB_ACCENT, fontFamily: SANS, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Tiếp: {next.vi} →
              </button>
            </div>
          );
        })()}

        <div style={{ fontFamily: SANS, fontSize: 11.8, color: MUTE, lineHeight: 1.7, borderTop: `1px solid ${LINE}`, paddingTop: 16, marginTop: 28 }}>
          <b>Nguồn tư tưởng chính:</b> Plato · Aristotle · Kierkegaard · Hegel &amp; Honneth · Sartre · de Beauvoir · Frankfurt · Nozick · Stendhal · Simone Weil · Iris Murdoch · C.S. Lewis · Fromm · Rilke · bell hooks · de Botton · Thích Nhất Hạnh · Phật giáo (Tứ Vô Lượng Tâm) · Bhakti (prema/kama) · Doi Takeo (amae) · Nho giáo (nhân) · Rumi · Freud · Jung · Winnicott &amp; Fairbairn · Bowlby &amp; Ainsworth · Hazan &amp; Shaver · Sternberg · Fredrickson · Perel · Tennov · Aron · Sue Johnson (EFT) · Nagoski · Worthington (REACH) · Giddens · Illouz · Bauman · Beck &amp; Beck-Gernsheim · Hochschild · Berlant · Jankowiak &amp; Fischer · Helen Fisher · Eisenberger · Pennebaker · Schnarch · Bowen · Gottman · Evan Stark · Chapman (có dè dặt) · Erikson · Carstensen · Meyer (minority stress) · DePaulo · Conley &amp; Moors · Waller · Buss · Knee · Yalom. Các trích dẫn được diễn giải lại theo tinh thần nguyên tác. Nơi bằng chứng còn yếu hoặc gây tranh cãi, tài liệu ghi rõ. Tài liệu mang tính giáo dục, không thay thế trị liệu chuyên môn khi cần.
        </div>
      </div>
    </div>
  );
}
