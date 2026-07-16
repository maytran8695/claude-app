import React, { useState } from "react";

/* ================= DESIGN TOKENS ================= */
const PAPER = "#F7F6F2";
const CARD = "#FFFFFF";
const INK = "#22252A";
const MUTE = "#7B8087";
const LINE = "#E3E2DB";
const ACCENT = "#2E4C5A";
const BRASS = "#A87A32";
const GREEN = "#3F6B4F";
const RUST = "#A34838";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', Georgia, 'Times New Roman', serif";

/* ================= THE MODEL: 5 LAYERS ================= */
const LAYERS = [
  { k: "L1", n: 1, name: "Điều hoà", en: "Regulation", color: "#8A4A55",
    dev: "Học trước tiên: giữ được hệ thần kinh trong cửa sổ chịu đựng.",
    ops: "Can thiệp trước tiên: nếu ai đó mất điều hoà, không tầng nào bên trên chạy được." },
  { k: "L2", n: 2, name: "Nội tâm", en: "Self", color: "#8A5A3A",
    dev: "Nền không phòng thủ: giá trị bản thân, khác biệt hoá, giả định khoá hành vi.",
    ops: "Kiểm tra: tôi đang phản ứng từ vết thương của mình hay từ thực tại?" },
  { k: "L3", n: 3, name: "Cặp đôi", en: "Dyad", color: "#5B4C74",
    dev: "Bộ kỹ năng tương tác cốt lõi: nghe, thấu cảm, hiện diện, diễn đạt.",
    ops: "Tầng quan hệ: người này thấy được coi trọng, hay thấy bị đe doạ?" },
  { k: "L4", n: 4, name: "Ma sát", en: "Friction", color: "#2E4C5A",
    dev: "Xử lý bất đồng, phản hồi, ranh giới, và các vòng lặp mắc kẹt.",
    ops: "Tầng khung: cuộc này thực chất là về cái gì? Ai định nghĩa luật chơi?" },
  { k: "L5", n: 5, name: "Hệ thống", en: "System", color: "#2E6A62",
    dev: "Tạo kết quả qua người khác: ảnh hưởng, lãnh đạo, văn hoá.",
    ops: "Tầng nội dung và bối cảnh rộng: lợi ích, quyền lực, chuẩn mực nào đang vận hành?" },
];
const lc = (k) => (LAYERS.find((l) => l.k === k) || {}).color;

/* ================= 18 UNITS — ONE SCHEMA ================= */
const UNITS = [
  /* ---------- L1 ---------- */
  {
    L: "L1", id: "1.1", name: "Điều hoà hệ thần kinh",
    claim: "Mọi kỹ năng xã hội sụp đổ khi hệ thần kinh ra khỏi cửa sổ chịu đựng. Điều hoà không phải bước chuẩn bị — nó là điều kiện tồn tại của mọi kỹ năng còn lại.",
    mech: "Neuroception (Porges): hệ thần kinh quét ‘an toàn hay nguy hiểm’ dưới ngưỡng ý thức. Khi phát hiện đe doạ, hệ giao cảm chiếm quyền và vỏ não trước — nơi ra quyết định khôn ngoan — bị giảm chức năng. Đây là lý do người ‘biết phải làm gì’ vẫn hỏng lúc quan trọng: không phải thiếu kiến thức, mà là bộ phận dùng kiến thức đã tạm ngừng. Hai kiểu ra khỏi cửa sổ (Siegel): quá kích hoạt (lo âu, phòng thủ, muốn phản pháo) và sụp dưới ngưỡng (tê liệt, xấu hổ, muốn biến mất). Quan trọng nhất: hệ thần kinh ĐỒNG BỘ với nhau (co-regulation) — trạng thái của bạn điều hoà hoặc kích động người đối diện.",
    behav: [
      "Nhận ra tín hiệu cơ thể sớm: tim đập, nóng mặt, nghẹn cổ, thở nông.",
      "Thở ra dài hơn thở vào (~5–6 nhịp/phút) — thở ra dài kích hoạt phó giao cảm.",
      "Tạo ‘khoảng dừng ba giây’ trước khi phản hồi khi bị kích hoạt.",
      "Xin tạm dừng có thời hạn khi quá tải — và quay lại đúng hẹn.",
    ],
    ladder: [
      ["Nhận biết tín hiệu cơ thể của mình 3 lần/ngày, ghi lại.", "Bắt được kích hoạt trước khi nó lớn."],
      ["Thở ra dài 3 nhịp mỗi khi nhận thấy kích hoạt.", "Nhịp tim và giọng nói ổn định lại."],
      ["Chèn khoảng dừng 2–3 giây trước khi đáp trong hội thoại thật.", "Phản hồi bớt bốc đồng."],
      ["Ở lại trong một cuộc trò chuyện căng mà không phản pháo hay bỏ chạy.", "Giữ được tới cuối, còn suy nghĩ rõ."],
      ["Giữ điều hoà khi bị khiêu khích trực tiếp; và sự bình tĩnh của bạn hạ nhiệt người kia.", "Bạn làm ‘mỏ neo an toàn’ cho hệ thần kinh của họ."],
    ],
    fail: [
      "Nhảy thẳng vào kỹ thuật giao tiếp mà bỏ qua tầng này — kỹ thuật sẽ sụp đúng lúc cần nhất.",
      "Nhầm sự đóng băng/rút lui với ‘bình tĩnh’. Mặt lạnh không phải điều hoà.",
      "Dùng ‘tôi cần bình tĩnh đã’ để trốn một cuộc nói chuyện khó. Kiểm tra: bạn CÓ quay lại đúng hẹn không?",
    ],
    mastery: "Tự kéo mình về cửa sổ chịu đựng trong vòng một phút, và giữ được sự hiện diện trong tình huống bị khiêu khích.",
    ev: "vững",
  },
  {
    L: "L1", id: "1.2", name: "Tự nhận thức cảm xúc",
    claim: "Bạn không thể điều tiết thứ bạn không gọi được tên. Độ phân giải cảm xúc là điều kiện tiên quyết của mọi EQ, không phải một kỹ năng phụ.",
    mech: "Emotional granularity (Barrett): người phân biệt cảm xúc tinh vi điều tiết tốt hơn, vì mỗi nhãn cụ thể gợi ra một hành động phù hợp khác nhau — ‘bực’ không chỉ ra phải làm gì, nhưng ‘bị coi thường’ thì có. Nội cảm (interoception) là năng lực đọc tín hiệu cơ thể, và nó rèn được. ‘Đặt tên để thuần hoá’ (name it to tame it): gọi tên cảm xúc làm giảm hoạt động hạch hạnh nhân.",
    behav: [
      "Gọi tên cảm xúc cụ thể, không dừng ở ‘ổn/tệ/bực’.",
      "Định vị cảm xúc trong cơ thể: nó đang ở đâu, cảm giác thế nào?",
      "Truy tác nhân: điều gì ngay trước đó đã kích hoạt nó?",
      "Quan sát cảm xúc thay vì phán xét nó (‘mình không nên thấy thế này’).",
    ],
    ladder: [
      ["Ghi nhật ký cảm xúc 3 lần/ngày: nhãn + tín hiệu cơ thể + tác nhân.", "Duy trì được 7 ngày liên tục."],
      ["Thay mỗi nhãn thô bằng nhãn tinh: ‘bực’ → chán nản / bị coi thường / quá tải.", "Vốn từ cảm xúc mở rộng rõ."],
      ["Gọi tên cảm xúc trong lúc nó đang diễn ra, không phải sau đó.", "Nhận diện theo thời gian thực."],
      ["Nhận ra cảm xúc phức hợp (vừa giận vừa xấu hổ) và cả hai lớp.", "Thấy được lớp bên dưới lớp bề mặt."],
      ["Đọc được cảm xúc của mình đủ sớm để chọn phản ứng, trước khi nó chọn hộ bạn.", "Có khoảng cách giữa kích thích và phản ứng."],
    ],
    fail: [
      "Dừng ở nhãn thô — thiếu độ phân giải thì không điều tiết được.",
      "Phán xét cảm xúc thay vì quan sát nó, tạo thêm một lớp khổ thứ hai.",
      "Nhầm ‘phân tích cảm xúc’ (nghĩ về nó) với ‘cảm nhận cảm xúc’ (ở trong cơ thể).",
    ],
    mastery: "Gọi tên chính xác cảm xúc phức hợp theo thời gian thực và nhận ra tác nhân, thay vì chỉ biết mình ‘khó chịu’.",
    ev: "vững",
  },
  {
    L: "L1", id: "1.3", name: "Tự điều chỉnh & tái định giá",
    claim: "Kìm nén cảm xúc tốn kém và rò rỉ ra ngoài. Tái định giá — thay đổi cách bạn hiểu tình huống — mới là công cụ điều tiết bền vững.",
    mech: "Mô hình điều tiết cảm xúc của Gross: tái định giá nhận thức (reappraisal) can thiệp SỚM trong chuỗi phát sinh cảm xúc, nên rẻ về mặt nhận thức; kìm nén (suppression) can thiệp MUỘN, tốn tải nhận thức, vẫn rò rỉ ra phi ngôn ngữ, và làm người đối diện cảm thấy khó chịu dù không biết vì sao. Tái định giá hưng phấn (Brooks): ‘hồi hộp’ và ‘hào hứng’ có cùng sinh lý — gọi tên nó là hào hứng cải thiện màn trình diễn thật.",
    behav: [
      "Khi bị kích hoạt, hỏi: ‘cách diễn giải nào khác cũng khớp với sự thật?’",
      "Diễn giải kích hoạt cơ thể là năng lượng sẵn sàng, không phải bằng chứng bất lực.",
      "Quy tắc trì hoãn: với tin nhắn/email nóng, soạn nhưng gửi sau 30 phút.",
      "Tách sự kiện khỏi câu chuyện bạn kể về sự kiện.",
    ],
    ladder: [
      ["Sau một tình huống kích hoạt, viết ra hai cách diễn giải khác cũng khớp dữ liệu.", "Thấy được nhiều hơn một câu chuyện."],
      ["Áp dụng quy tắc trì hoãn 30 phút cho mọi phản hồi lúc nóng.", "Không gửi thứ mình hối tiếc."],
      ["Tái định giá TRONG lúc bị kích hoạt, không phải sau đó.", "Cường độ cảm xúc hạ tại chỗ."],
      ["Trước tình huống áp lực, tái định giá hồi hộp thành hào hứng.", "Trình diễn tốt hơn, không bị lo âu chi phối."],
      ["Giữ được lựa chọn giữa kích thích và phản ứng ngay cả khi bị khiêu khích mạnh.", "Phản hồi từ chủ đích, không từ phản xạ."],
    ],
    fail: [
      "Kìm nén thay vì điều tiết — mặt lạnh nhưng cơ thể vẫn phát tín hiệu căng, và người kia cảm nhận được.",
      "Dùng ‘tái định giá’ để phủ nhận một vấn đề có thật (tích cực độc hại). Tái định giá là nhìn thẳng, không phải nhìn tránh.",
      "Điều tiết để né mọi cảm xúc khó, thành ra vô cảm và mất kết nối.",
    ],
    mastery: "Chọn được phản ứng thay vì bị cảm xúc điều khiển, và làm được điều đó ngay trong lúc căng thẳng.",
    ev: "vững",
  },

  /* ---------- L2 ---------- */
  {
    L: "L2", id: "2.1", name: "Giá trị bản thân & tự trắc ẩn",
    claim: "Bạn không thể giao tiếp không phòng thủ khi giá trị bản thân bị đặt cược trong mỗi tương tác. Nền của mọi kỹ năng xã hội là không cần sự chấp thuận để thấy ổn.",
    mech: "Self-esteem CAO nhưng MONG MANH — bất ổn, có điều kiện, phải bảo vệ — mới là gốc của phòng thủ và hung hăng, không phải self-esteem thấp (Kernis). Crocker: neo giá trị vào các ‘lĩnh vực điều kiện’ (thành tích, ngoại hình, sự tán thành) khiến mỗi đe doạ ở đó kích hoạt phòng thủ. Neff: self-compassion (tử tế với mình + nhân tính chung + chánh niệm) ổn định hơn vì không cần hơn ai. Và bằng chứng phản trực giác (Breines & Chen): tự trắc ẩn LÀM TĂNG động lực cải thiện và trách nhiệm cá nhân sau thất bại — vì khi không bị nỗi sợ xấu hổ nhấn chìm, người ta nhìn thẳng lỗi của mình rõ hơn.",
    behav: [
      "Đón nhận lời khen bằng ‘cảm ơn’, không gạt đi.",
      "Nói ‘tôi không biết’ hoặc nhận lỗi cụ thể một cách bình thản.",
      "Tách con người khỏi kết quả: ‘việc này chưa thành’, không phải ‘tôi là kẻ thất bại’.",
      "Không dò xét phản ứng sau mỗi câu; không cười lấp để xin chấp thuận.",
    ],
    ladder: [
      ["Ghi nhật ký bằng chứng: 1–3 việc làm được mỗi ngày.", "Chống được thiên kiến lọc bỏ tích cực."],
      ["Đón một lời khen mà không hạ thấp bản thân.", "Nói ‘cảm ơn’ và dừng ở đó."],
      ["Sau một thất bại, tự nói với mình như nói với bạn thân.", "Giọng nội tâm dịu hơn, học được bài học."],
      ["Nhận một lời phê bình mà không phòng thủ cũng không sụp đổ.", "Lấy được phần đúng, giữ được sự vững."],
      ["Giữ vững phong độ khi bị từ chối hoặc chê trách công khai.", "Giá trị bản thân không dao động theo phản ứng người khác."],
    ],
    fail: [
      "Cố ‘tỏ ra tự tin’ mà không xây nền — lớp vỏ sụp ngay khi bị thử thách thật.",
      "Nhầm tự trắc ẩn với tự nuông chiều hoặc né trách nhiệm. Tự trắc ẩn thật bao gồm cả sự quyết liệt bảo vệ mình và cả tự chịu trách nhiệm.",
      "Affirmation trống rỗng: với người tự trọng thấp, lặp ‘tôi tuyệt vời’ có thể phản tác dụng (Wood 2009). Dùng bằng chứng hành động, không dùng thần chú.",
    ],
    mastery: "Bước vào tương tác mà không cần được chấp thuận; phục hồi sau một thất bại xã hội trong vài giờ với một bài học cụ thể.",
    ev: "vững",
  },
  {
    L: "L2", id: "2.2", name: "Khác biệt hoá & hiện diện không lo âu",
    claim: "Trưởng thành xã hội không phải hoà hợp với mọi người, mà là giữ được lập trường và tự điều hoà TRONG KHI vẫn kết nối gần gũi.",
    mech: "Khác biệt hoá (Bowen): năng lực giữ bản sắc và tự điều hoà trong hệ thống cảm xúc. Hai thái cực chưa trưởng thành: HOÀ TAN (fusion — phải có sự đồng thuận mới thấy ổn) và CẮT ĐỨT (cutoff — phải giữ khoảng cách mới thấy an toàn); cả hai đều là phụ thuộc, chỉ khác hướng. Trong mọi hệ thống — gia đình, đội nhóm — lo âu lan truyền như dòng điện. ‘Hiện diện không lo âu’ (Friedman): một người giữ được bình tĩnh trong hệ thống đang hoảng loạn có tác dụng điều hoà cả hệ. Bạn là bộ điều nhiệt, không phải nhiệt kế.",
    behav: [
      "Nói ‘tôi nghĩ khác, và điều đó không có nghĩa mình không tôn trọng nhau’.",
      "Tự trấn an trước, rồi mới quay lại đối thoại — không cần người kia dỗ mới bình tĩnh.",
      "Không bị cuốn theo lo âu hoặc cơn giận của tập thể.",
      "Giữ kết nối với người bất đồng với mình, thay vì cắt đứt hoặc đầu hàng.",
    ],
    ladder: [
      ["Nêu một ý kiến thật (không a dua) trong một nhóm, mỗi ngày một lần.", "Nói ra dù hơi ngại."],
      ["Giữ được quan điểm khi bị phản đối, mà không nâng giọng hay rút lui.", "Không hoà tan cũng không cắt đứt."],
      ["Trong một tình huống nhóm căng thẳng, giữ giọng và nhịp thở ổn định.", "Người khác bắt đầu hạ nhiệt theo."],
      ["Bất đồng với người có quyền lực hơn, bình thản, rồi tôn trọng kết quả.", "Không phòng thủ, không phục tùng."],
      ["Là điểm neo bình tĩnh trong một cuộc khủng hoảng của nhóm.", "Sự vững vàng của bạn tạo không gian cho người khác suy nghĩ lại."],
    ],
    fail: [
      "Nhầm khác biệt hoá với lạnh lùng hoặc bất cần — nó đòi hỏi GẦN GŨI đồng thời với giữ mình.",
      "Cắt đứt (nghỉ chơi, ghosting, im lặng trừng phạt) và gọi đó là ‘ranh giới’.",
      "Trở thành ‘nhiệt kế’: hấp thụ và khuếch đại lo âu của nhóm rồi lan tiếp.",
    ],
    mastery: "Giữ được bản thân trong hệ thống cảm xúc căng thẳng, và sự hiện diện của bạn hạ nhiệt cả nhóm.",
    ev: "khiêm tốn",
  },
  {
    L: "L2", id: "2.3", name: "Giả định lớn khoá hành vi",
    claim: "Thay đổi hành vi xã hội thất bại thường KHÔNG vì thiếu ý chí hay kỹ thuật, mà vì một cam kết ngầm đang bảo vệ bạn khỏi điều bạn sợ hơn.",
    mech: "‘Miễn dịch với thay đổi’ (Kegan & Lahey): song song mục tiêu công khai (‘quyết đoán hơn’) tồn tại một CAM KẾT CẠNH TRANH ngầm (‘không được làm ai phật lòng’), được khoá bởi một GIẢ ĐỊNH LỚN (‘nếu mình quyết đoán, mình sẽ bị ghét và bị bỏ rơi’). Hệ miễn dịch này hoạt động hoàn hảo — nó đang bảo vệ bạn. Vì thế thêm kỹ thuật hay thêm quyết tâm đều vô ích: bạn đang đạp ga và phanh cùng lúc. Chỉ khi phơi bày và KIỂM CHỨNG giả định lớn, hệ miễn dịch mới nới ra. Đây là lý do đào tạo kỹ năng bề mặt thường không dính.",
    behav: [
      "Khi né một hành vi, hỏi: ‘mình sợ điều gì sẽ xảy ra nếu mình làm?’",
      "Phân biệt ‘mình chưa biết cách’ với ‘mình biết cách nhưng có gì đó ngăn mình’.",
      "Thiết kế ‘thí nghiệm an toàn’ để kiểm chứng nỗi sợ thay vì tin nó.",
      "Coi giả định lớn là giả thuyết cũ chưa được kiểm tra, không phải sự thật.",
    ],
    ladder: [
      ["Liệt kê 3 hành vi xã hội bạn muốn làm nhưng vẫn né.", "Nhận ra khoảng cách nói-làm."],
      ["Với mỗi hành vi, viết cam kết cạnh tranh ngầm đang bảo vệ bạn.", "Thấy được ‘phanh’ đang đạp."],
      ["Truy tới giả định lớn: ‘nếu mình làm X, điều tồi tệ Y sẽ xảy ra’.", "Phát biểu được giả định thành lời."],
      ["Thiết kế và chạy một thí nghiệm nhỏ, rủi ro thấp, để kiểm chứng Y.", "Thu được dữ liệu thật, không phải tưởng tượng."],
      ["Sửa lại giả định dựa trên bằng chứng, và hành vi mới bắt đầu tự nhiên hơn.", "Thay đổi ở tầng nhận thức, không chỉ tầng hành vi."],
    ],
    fail: [
      "Thêm kỹ thuật và quyết tâm lên trên một hệ miễn dịch chưa được xử lý — thất bại lặp lại, rồi tự trách.",
      "Coi giả định lớn là sự thật hiển nhiên nên không bao giờ kiểm chứng.",
      "Chạy ‘thí nghiệm’ quá lớn ngay lần đầu, thất bại, và củng cố nỗi sợ.",
    ],
    mastery: "Nhận ra và kiểm chứng được giả định đang khoá một hành vi, thay vì chỉ cố gắng nhiều hơn.",
    ev: "khiêm tốn",
  },

  /* ---------- L3 ---------- */
  {
    L: "L3", id: "3.1", name: "Lắng nghe & steelman",
    claim: "Lắng nghe là kỹ năng đòn bẩy cao nhất trong toàn bộ tài liệu này. Nếu chỉ luyện được một thứ, luyện thứ này.",
    mech: "Lắng nghe thấu cảm (Rogers): người được nghe thật sẽ tự tổ chức lại suy nghĩ của họ — bạn không cần khuyên. Ba cấp độ lắng nghe: nghe tiếng nói nội tâm của MÌNH (đang soạn câu đáp) / nghe tập trung vào HỌ / nghe toàn cảnh gồm cả phi ngôn ngữ, nhịp và điều chưa nói ra. ‘Steelman’ là dạng mạnh nhất: tóm tắt lập trường đối phương tốt đến mức họ nói ‘đúng, chính xác’ — trước khi bạn phản biện. Nếu chưa làm được điều đó, bạn đang cãi với một hình nộm do mình dựng lên.",
    behav: [
      "Diễn giải lại trước khi đáp: ‘nếu mình hiểu đúng thì bạn đang nói…’",
      "Để người kia nói hết hẳn, dừng hai giây, rồi mới đáp.",
      "Hỏi tiếp nối sâu (‘điều gì khiến bạn…?’) thay vì chuyển sang chuyện của mình.",
      "Không đưa giải pháp khi họ chỉ cần được nghe. Hỏi trước: ‘bạn muốn mình nghe, hay muốn mình gợi ý?’",
    ],
    ladder: [
      ["Diễn giải lại ý người kia đúng một lần mỗi cuộc trò chuyện.", "Họ gật hoặc nói ‘đúng rồi’."],
      ["Không cắt lời một lần nào trong cả một cuộc trò chuyện.", "Đếm được: không lần nào."],
      ["Đặt ba câu hỏi tiếp nối sâu trước khi kể về mình.", "Tỉ lệ nghe:nói khoảng 2:1."],
      ["Gọi tên cảm xúc ẩn của họ và kiểm chứng (‘nghe có vẻ bạn khá thất vọng?’).", "Họ xác nhận và mở lòng hơn."],
      ["Trong một cuộc bất đồng, steelman lập trường họ tới khi họ nói ‘đúng, chính xác’.", "Chỉ khi đó bạn mới phản biện."],
    ],
    fail: [
      "Nghe để phản hồi thay vì nghe để hiểu — đang soạn câu đáp trong đầu.",
      "‘Cướp’ câu chuyện (‘ồ mình cũng từng…’) làm mất tiêu điểm khỏi người kia.",
      "Diễn giải lại một cách máy móc như đọc thoại — người ta nhận ra ngay và thấy bị kỹ thuật hoá.",
    ],
    mastery: "Người trò chuyện thường xuyên nói ‘bạn thật sự hiểu mình’, và họ nói nhiều hơn bạn.",
    ev: "vững",
  },
  {
    L: "L3", id: "3.2", name: "Thấu cảm & đọc người",
    claim: "Thấu cảm không phải cảm cùng người khác cho tới kiệt sức, mà là hiểu chính xác họ rồi hành động vì lợi ích của họ.",
    mech: "Ba loại (Singer, Zaki): thấu cảm NHẬN THỨC (hiểu họ nghĩ gì — Theory of Mind, dùng mạng mentalizing: mPFC, TPJ), thấu cảm CẢM XÚC (cảm cùng họ — có thể dẫn tới kiệt sức thấu cảm), và thấu cảm TỪ BI (muốn giúp — bền vững, không kiệt sức). Kỹ năng đích là cân bằng cả ba, với từ bi làm điểm đến. Về đọc người: tín hiệu phải đọc theo CỤM (tư thế + mắt + tay + nhịp + bối cảnh), không suy diễn từ một dấu hiệu lẻ — ‘khoanh tay = phòng thủ’ là mê tín phổ biến.",
    behav: [
      "Trước cuộc gặp khó, viết ra: người kia đang lo gì, cần gì, chịu áp lực gì?",
      "Gọi tên cảm xúc của họ để kiểm chứng, không để khẳng định.",
      "Nhìn xuống dưới hành vi: cơn giận thường là lớp vỏ của tổn thương hoặc sợ hãi.",
      "Đọc theo cụm tín hiệu và bối cảnh, không đọc vị từ một cử chỉ.",
    ],
    ladder: [
      ["Trước một cuộc gặp, viết ba dự đoán về trạng thái và mối lo của họ.", "Có thói quen đặt mình vào vị trí họ."],
      ["Sau cuộc gặp, đối chiếu dự đoán với thực tế.", "Biết mình lệch ở đâu."],
      ["Gọi tên cảm xúc ẩn của họ và được xác nhận.", "Họ thấy được nhìn thấy."],
      ["Xem một cuộc trò chuyện không tiếng, đoán trạng thái theo cụm, rồi kiểm chứng.", "Độ chính xác tăng qua thời gian."],
      ["Đọc đúng trạng thái người khác kể cả khi họ không nói ra, và đáp lại bằng thấu cảm từ bi.", "Họ thấy được thấu hiểu, bạn không kiệt sức."],
    ],
    fail: [
      "Thấu cảm cảm xúc quá mức → kiệt sức thấu cảm (empathic distress) và né tránh người đau khổ. Chuyển sang thấu cảm từ bi.",
      "Giả định mình biết họ cảm thấy gì thay vì kiểm chứng — phóng chiếu, không phải thấu cảm.",
      "Nhầm thấu cảm với đồng ý. Hiểu trọn vẹn không có nghĩa chấp nhận mọi thứ.",
      "‘Đọc vị’ tự tin từ một tín hiệu đơn lẻ. Đây là nguồn sai lầm lớn và tự tin thái quá.",
    ],
    mastery: "Đọc chính xác trạng thái người khác, đáp lại khiến họ thấy được thấu hiểu, mà không đánh mất bản thân.",
    ev: "vững",
    note: "Cảnh báo: thấu cảm là năng lực trung tính về đạo đức. ‘Thấu cảm đen’ (dark empathy) dùng chính năng lực đọc người để khai thác. Xem đơn vị 5.1.",
  },
  {
    L: "L3", id: "3.3", name: "Hiện diện: cơ thể, giọng, địa vị",
    claim: "Sự tự tin được người khác đọc qua HÀNH VI trước khi qua nội dung. Hành vi tự tin là thứ luyện được — và nó tạo vòng phản hồi nuôi tự tin thật.",
    mech: "Vòng bánh đà: năng lực → bằng chứng (làm được thật) → hành vi tự tin → phản hồi tích cực → cảm giác tự tin → dám làm nhiều hơn. Mắt xích khởi động nhanh nhất là HÀNH VI: không cần đợi cảm thấy tự tin mới hành xử tự tin. Nhưng bánh đà chỉ quay bền khi có bằng chứng thật — diễn xuất suông sẽ sụp. Về địa vị (Johnstone): mọi tương tác có ‘giao dịch địa vị’. Hành vi địa vị-cao: cử động chậm và ít, đầu yên, dám im lặng. Địa vị-thấp: cử động nhiều, tự chạm mặt, cười lấp, né mắt. Then chốt: sức nặng nằm ở DẢI linh hoạt (biết lên và xuống), không phải luôn ở mức cao. Về giọng: bốn đòn bẩy — cao độ, tốc độ, khoảng lặng, lực. Ngữ điệu đi XUỐNG cuối câu báo chắc chắn; đi lên (uptalk) biến khẳng định thành như câu hỏi.",
    behav: [
      "Cử động chậm lại, có chủ đích; giữ đầu tương đối yên khi nói.",
      "Cho phép khoảng lặng tồn tại thay vì lấp bằng ‘à, ừm’. Im lặng là quyền lực.",
      "Kết câu khẳng định bằng ngữ điệu đi xuống.",
      "Mắt: khoảng 50% khi mình nói, 70% khi nghe — không nhìn chằm, không né.",
      "Điều chỉnh linh hoạt: hạ địa vị (ấm, tự trào nhẹ) để gần gũi; nâng (điềm tĩnh, dứt khoát) khi cần uy tín.",
    ],
    ladder: [
      ["Ghi âm mình nói 1 phút mỗi ngày; nghe lại bắt uptalk và từ đệm.", "Nhận ra thói quen giọng của mình."],
      ["Neo hai chân, nói một câu quan trọng mà không fidget.", "Video cho thấy ít cử động thừa."],
      ["Giữ khoảng lặng ba giây sau một ý quan trọng, không lấp.", "Khoảng lặng làm ý nổi bật, bạn không bồn chồn."],
      ["Duy trì tỉ lệ mắt 50/70 suốt một cuộc trò chuyện.", "Tự nhiên, không nhìn chằm cũng không né."],
      ["Trong một tuần, chủ động hạ địa vị một lần và nâng địa vị một lần; quan sát phản ứng.", "Mở rộng được DẢI, dùng đúng lúc."],
    ],
    fail: [
      "Cử chỉ thừa (gãi, xoay bút, chạm mặt) rút uy tín mà mình không nhận ra — chỉ ghi hình mới thấy.",
      "Luôn chơi địa vị cao → xa cách, đáng sợ. Luôn thấp → bị coi nhẹ.",
      "Diễn tự tin một cách giả tạo. Cảm xúc giả rò rỉ ra phi ngôn ngữ. Cách đúng là ‘hành xử vào trong’, có bằng chứng thật làm nền.",
    ],
    mastery: "Tín hiệu phi ngôn ngữ và giọng nói nhất quán với thông điệp; bạn toát ra sự vững vàng không cầu cạnh.",
    ev: "hỗn hợp",
    note: "Chất lượng bằng chứng: giao tiếp mắt, khoảng lặng, ngữ điệu — nền vững. ‘Power posing’ làm thay đổi hormone: nghiên cứu gốc THẤT BẠI NHÂN RỘNG và chính tác giả thứ nhất đã rút lại; hiệu ứng còn lại (nếu có) chỉ là cảm giác chủ quan. Con số ‘7% lời nói’ của Mehrabian bị trích sai — nó chỉ áp dụng cho thông điệp cảm xúc mơ hồ.",
  },
  {
    L: "L3", id: "3.4", name: "Diễn đạt & đóng khung",
    claim: "Cùng một sự thật, cách trình bày khác nhau tạo ra quyết định khác nhau. Rõ ràng là phép lịch sự; đóng khung là năng lực.",
    mech: "Nguyên lý Kim tự tháp (Minto): kết luận trước, rồi lý do — người bận mất kiên nhẫn với tường thuật theo trình tự thời gian. Đóng khung (Kahneman & Tversky): ‘tỉ lệ sống 90%’ và ‘tỉ lệ chết 10%’ là cùng một dữ kiện nhưng dẫn tới lựa chọn khác nhau. Tu từ học đầy đủ: ethos (uy tín) + pathos (cảm xúc) + logos (lập luận) + KAIROS (đúng thời điểm) — và kairos thường quyết định hơn cả ba cái đầu. Chuyển tải qua tường thuật (narrative transportation) ăn sâu hơn dữ liệu trần.",
    behav: [
      "Mọi cập nhật bắt đầu bằng câu kết luận một dòng (BLUF).",
      "Báo hiệu cấu trúc: ‘có ba điểm…’ để người nghe biết đường đi.",
      "Đóng khung ích lợi quanh điều NGƯỜI NGHE quan tâm, không quanh điều bạn quan tâm.",
      "Chọn thời điểm: biết khi nào nói và khi nào im còn quan trọng hơn nói gì.",
    ],
    ladder: [
      ["Luyện ‘headline first’: bắt đầu mọi báo cáo bằng kết luận.", "Người nghe nắm ngay điểm chính."],
      ["Giải thích một ý phức tạp trong 30 giây.", "Không mất nghĩa, không lan man."],
      ["Viết một đoạn rồi rút gọn 30% mà không mất nghĩa.", "Bỏ được từ thừa và rào đón."],
      ["Trình bày cùng một ý cho ba đối tượng khác nhau (chuyên gia, sếp, người mới).", "Mỗi bản khớp mối quan tâm của họ."],
      ["Đóng khung một đề xuất khó quanh lợi ích của người nghe, và chọn đúng thời điểm nêu.", "Được tiếp nhận thay vì bị phản kháng."],
    ],
    fail: [
      "Kể lể theo trình tự thời gian thay vì đưa kết luận trước.",
      "Rào đón, xin lỗi, biệt ngữ — cả ba đều làm loãng thông điệp và giảm uy tín.",
      "Đóng khung trượt sang đánh lừa: chọn cách trình bày để che giấu sự thật bất lợi. Đây là ranh giới đạo đức, xem 5.1.",
    ],
    mastery: "Trình bày một vấn đề phức tạp ngắn gọn, có cấu trúc, đóng khung đúng mối quan tâm người nghe, đúng thời điểm.",
    ev: "vững",
  },
  {
    L: "L3", id: "3.5", name: "Ấn tượng & sự dễ mến",
    claim: "Người ta thích người làm họ cảm thấy tốt về CHÍNH HỌ — không phải người gây được ấn tượng về bản thân mình.",
    mech: "Hai chiều phán xét phổ quát (Fiske & Cuddy): người này ẤM ÁP hay đe doạ? và CÓ NĂNG LỰC không? Ấm áp được đọc TRƯỚC và nặng ký hơn — người giỏi mà lạnh bị đọc là nguy hiểm. Ấn tượng đầu hình thành trong mili-giây (thin-slicing) và tạo hiệu ứng hào quang định hình mọi diễn giải về sau. Goffman: quản lý ấn tượng lành mạnh không phải giả tạo, mà là chọn phiên bản chân thật, phù hợp bối cảnh, để trình hiện — và giữ nhất quán qua thời gian, vì danh tiếng là tổng của hành vi nhất quán, không phải của quảng bá.",
    behav: [
      "30 giây đầu chiếu ẤM ÁP trước (mắt ấm, nụ cười thật, dùng tên họ), rồi mới đến năng lực.",
      "Đặt ‘đèn sân khấu’ lên người kia: hỏi, nghe, quan tâm thật.",
      "Nhớ và dùng tên; ghi nhớ một chi tiết cá nhân để nhắc lại lần sau.",
      "Làm người khác ‘trông tốt’ trước mặt người thứ ba; công nhận đóng góp cụ thể.",
    ],
    ladder: [
      ["Nhớ tên một người mới và dùng lại trong cuộc trò chuyện.", "Nhớ tới cuối buổi."],
      ["Trong 30 giây đầu gặp người lạ, ưu tiên ấm áp trước năng lực.", "Họ thả lỏng và cởi mở hơn."],
      ["Mỗi cuộc trò chuyện, đặt một câu hỏi khiến họ nói về điều họ quan tâm.", "Họ tươi lên, nói nhiều hơn."],
      ["Khen cụ thể và chân thành một điều bạn thật sự trân trọng.", "Không sáo rỗng, họ nhận ra là thật."],
      ["Người khác rời cuộc trò chuyện với bạn thấy tốt hơn về chính họ — và họ nhớ bạn.", "Được chủ động liên hệ lại."],
    ],
    fail: [
      "Dồn hết vào chứng minh năng lực mà quên ấm áp → bị đọc là kiêu hoặc lạnh.",
      "Cố gây ấn tượng về bản thân → phản tác dụng. Người dễ mến làm người khác thấy mình quan trọng.",
      "Xây hình ảnh lệch xa con người thật → sớm muộn lộ, và mất nhiều hơn được.",
      "Khen chung chung, sáo rỗng → mất giá trị, thậm chí bị đọc là nịnh.",
    ],
    mastery: "Trong 30 giây đầu, người mới gặp cảm thấy bạn vừa dễ mến vừa đáng tin — và ấn tượng đó đọng lại.",
    ev: "vững",
  },

  /* ---------- L4 ---------- */
  {
    L: "L4", id: "4.1", name: "Quyết đoán & ranh giới",
    claim: "Quyết đoán là chế độ thứ ba, không phải điểm giữa của thụ động và hung hăng. Nó chỉ khả thi khi giá trị bản thân không bị đặt cược.",
    mech: "Ba chế độ: THỤ ĐỘNG (sụp, từ hệ đe doạ), HUNG HĂNG (phản pháo, cũng từ hệ đe doạ), QUYẾT ĐOÁN (vững mà tôn trọng, từ hệ an toàn). Chỉ chế độ ba đến từ giá trị bản thân vững — đây là lý do L2 phải đi trước L4. Khung DESC (Describe–Express–Specify–Consequences) và câu ‘tôi’. Về ranh giới (Cloud & Townsend): ranh giới nói về điều MÌNH sẽ làm (‘khi X, mình sẽ Y’), không phải mệnh lệnh cho người khác (‘cấm bạn…’). Fierce self-compassion (Neff): tử tế với mình đôi khi là bảo vệ mình.",
    behav: [
      "Chuyển câu ‘bạn’ (đổ lỗi) thành câu ‘tôi’ (cảm xúc + nhu cầu).",
      "Nói ‘không’ rõ ràng, tử tế, không kèm một tràng biện minh.",
      "Công thức ranh giới: ‘Khi [tình huống], mình sẽ [điều mình làm]’ — nói bằng giọng bình thản.",
      "Giữ vững một thông điệp bình tĩnh khi bị gây áp lực (broken record).",
    ],
    ladder: [
      ["Nêu một ý kiến cá nhân thật mỗi ngày.", "Nói ra dù hơi ngại."],
      ["Nói ‘không’ với một yêu cầu nhỏ, gọn, không biện minh dài.", "Từ chối được mà vẫn giữ quan hệ."],
      ["Dùng câu ‘tôi’ nêu một khó chịu nhỏ với ai đó.", "Nêu được mà không đổ lỗi hay bùng nổ."],
      ["Đặt một ranh giới bạn vẫn né lâu nay.", "Nói ra bình thản, không như tối hậu thư."],
      ["Giữ ranh giới đó khi gặp phản kháng.", "Không đầu hàng, không leo thang."],
    ],
    fail: [
      "Nhầm quyết đoán với hung hăng — áp đặt, không tôn trọng người kia.",
      "Chỉ quyết đoán khi đã dồn nén tới mức bùng nổ. Quyết đoán sớm và nhỏ, đừng chờ.",
      "Đặt ranh giới như trừng phạt hoặc tối hậu thư.",
      "Đầu hàng ngay khi gặp phản kháng — dạy người kia rằng ranh giới của bạn không thật.",
    ],
    mastery: "Nêu được nhu cầu và bất đồng đúng lúc, bình thản, giữ được cả ranh giới lẫn quan hệ.",
    ev: "vững",
  },
  {
    L: "L4", id: "4.2", name: "Phản hồi: cho & nhận",
    claim: "Phản hồi vào CON NGƯỜI kích hoạt phòng thủ và không sửa được gì. Phản hồi vào HÀNH VI cụ thể là thứ duy nhất dùng được.",
    mech: "SBI (Situation–Behavior–Impact): nêu tình huống, hành vi quan sát được, và tác động — không dán nhãn. Radical Candor (Scott): hai trục độc lập — quan tâm cá nhân × thách thức trực tiếp. Thiếu quan tâm thì thẳng thắn thành tàn nhẫn; thiếu thách thức thì quan tâm thành ‘đồng cảm phá hoại’. Về NHẬN phản hồi: phản xạ tự nhiên là biện minh; kỹ năng là tạm nén nó để tìm phần đúng. Điều then chốt: nếu bạn phòng thủ một lần, người ta sẽ ngừng nói thật với bạn mãi mãi — và bạn mất nguồn dữ liệu quan trọng nhất về điểm mù của mình.",
    behav: [
      "Dùng SBI: tình huống + hành vi cụ thể + tác động. Không dán nhãn con người.",
      "Khi nhận phản hồi: tìm 5% đúng trước khi cân nhắc 95% còn lại; nói ‘cảm ơn’ trước khi giải thích.",
      "Chủ động xin phản hồi CỤ THỂ: ‘một điều em nên cải thiện có tác động nhất là gì?’",
      "Ghi nhận công khai, góp ý riêng tư.",
    ],
    ladder: [
      ["Xin một phản hồi cụ thể từ một người tin cậy.", "Nhận được câu trả lời rõ, không chung chung."],
      ["Nhận một lời chê mà không biện minh tại chỗ.", "Nói cảm ơn, hỏi làm rõ."],
      ["Đưa một góp ý nhỏ bằng SBI.", "Người nhận không phòng thủ."],
      ["Đưa một góp ý khó cho người ngang hàng hoặc cấp trên.", "Họ thấy được tôn trọng và tiếp nhận."],
      ["Xây được thói quen xin phản hồi định kỳ và hành động theo nó.", "Người ta sẵn lòng nói thật với bạn."],
    ],
    fail: [
      "‘Bánh sandwich khen–chê–khen’ máy móc: người nhận học cách chờ đợi cú chê và mất tin vào lời khen.",
      "Phản hồi vào con người (‘cậu cẩu thả’) thay vì hành vi (‘báo cáo thiếu mục X’).",
      "Phòng thủ khi nhận phản hồi → nguồn phản hồi cạn kiệt vĩnh viễn.",
      "Né phản hồi khó vì sợ mất lòng — đó là ‘đồng cảm phá hoại’, không phải tử tế.",
    ],
    mastery: "Đưa được phản hồi khó mà người nhận vẫn thấy được tôn trọng; và tiếp nhận chê trách mà không sụp hay phản pháo.",
    ev: "vững",
  },
  {
    L: "L4", id: "4.3", name: "Trò chuyện khó & xung đột",
    claim: "Bạn không thể giải quyết nội dung trước khi tạo được an toàn. Vào thẳng vấn đề gai góc là cách chắc chắn nhất để không giải quyết được nó.",
    mech: "Crucial Conversations (Patterson): khi người ta thấy không an toàn, họ chuyển sang im lặng hoặc bạo lực (lời nói). Phải khôi phục an toàn TRƯỚC khi tiếp tục nội dung. Difficult Conversations (Stone & Heen): mỗi cuộc trò chuyện khó thực ra là BA cuộc — cuộc về SỰ VIỆC (chuyện gì đã xảy ra), cuộc về CẢM XÚC, và cuộc về BẢN SẮC (điều này nói gì về con người tôi?). Hầu hết bế tắc nằm ở cuộc thứ ba. NVC (Rosenberg): tách quan sát khỏi đánh giá — ‘báo cáo trễ hai ngày’ (quan sát) so với ‘anh vô trách nhiệm’ (đánh giá).",
    behav: [
      "Mở bằng an toàn: khẳng định thiện chí chung trước khi vào vấn đề.",
      "Tách quan sát khỏi đánh giá; mô tả sự việc, không kết tội.",
      "Chuẩn bị ‘ba cuộc trò chuyện’ trước khi vào: sự việc, cảm xúc, bản sắc.",
      "Steelman lập trường họ trước khi phản biện (xem 3.1).",
    ],
    ladder: [
      ["Viết ra một sự việc khó chịu mà không dùng nhãn phán xét.", "Câu mô tả trung tính, kiểm chứng được."],
      ["Mở một trao đổi khó bằng câu tạo an toàn.", "Đối phương bớt phòng thủ ngay từ đầu."],
      ["Trong xung đột, diễn giải lập trường họ tới khi họ thấy được hiểu.", "Họ hạ nhiệt và lắng nghe lại."],
      ["Giữ điều hoà suốt một cuộc trò chuyện căng, dùng khoảng dừng khi cần.", "Ở lại tới cuối, không phản pháo hay rút lui."],
      ["Dẫn một cuộc trò chuyện khó thật tới một bước tiếp theo cụ thể mà cả hai đồng thuận.", "Có kết quả hành động, quan hệ còn nguyên."],
    ],
    fail: [
      "Vào thẳng nội dung khi chưa tạo an toàn — người kia lập tức phòng thủ và mọi thứ hỏng từ đó.",
      "Rơi vào tranh đúng–sai thay vì tìm hiểu và giải quyết.",
      "Né tránh hoàn toàn để dồn nén, rồi bùng nổ. Cả hai cực đều hỏng.",
      "Bỏ qua cuộc trò chuyện về BẢN SẮC — đó thường là nơi bế tắc thật nằm.",
    ],
    mastery: "Dẫn được một cuộc trò chuyện căng thẳng tới chỗ cả hai hiểu nhau hơn và có bước tiếp theo cụ thể.",
    ev: "vững",
  },
  {
    L: "L4", id: "4.4", name: "Đọc tầng & tháo vòng lặp",
    claim: "Thất bại phổ biến nhất của người ĐÃ KHÁ không phải thiếu kỹ thuật, mà là dùng đúng kỹ thuật ở SAI TẦNG. Đây là đơn vị trung tâm của tài liệu này.",
    mech: "Bốn tiên đề vận hành. (1) Watzlawick: ‘không thể KHÔNG giao tiếp’ — im lặng, phớt lờ đều là thông điệp; và mọi thông điệp có tầng NỘI DUNG và tầng QUAN HỆ. Phần lớn xung đột diễn ra ở tầng quan hệ (‘anh có coi trọng tôi không’) dù bề mặt cãi về nội dung. (2) ‘Chấm câu’ (punctuation): mỗi bên tự thấy mình chỉ ĐANG PHẢN ỨNG lại bên kia — ‘tôi rút lui vì em cằn nhằn’ đối lại ‘tôi cằn nhằn vì anh rút lui’ — một vòng luẩn quẩn sinh ra từ cách mỗi người ‘chấm’ chuỗi sự kiện. (3) Thang suy diễn (Argyris): từ dữ liệu → chọn lọc → gán nghĩa → giả định → kết luận → hành động; ta leo cả thang trong tích tắc rồi tưởng kết luận là sự thật hiển nhiên. (4) Tam giác kịch (Karpman): Nạn Nhân / Kẻ Bức Hại / Người Cứu — ba vai vô thức, người ta xoay vai ngay trong một cuộc; lối thoát là chuyển sang Người Kiến Tạo / Người Thách Thức / Người Huấn Luyện (Emerald). Công cụ tháo gỡ chung: META-GIAO TIẾP — nói VỀ chính kiểu tương tác đang diễn ra, thay vì tiếp tục ở trong nó.",
    behav: [
      "Quét tầng trước khi hành động: hệ thần kinh → quan hệ → khung → nội dung.",
      "Làm suy luận của mình minh bạch: ‘mình thấy X, mình đang hiểu là Y — có đúng không?’",
      "Khi mắc kẹt, leo lên meta: ‘mình để ý mình đã vòng lại điểm này ba lần…’",
      "Từ chối nhận vai trong tam giác kịch: không làm Nạn Nhân, Kẻ Bức Hại, hay Người Cứu.",
    ],
    ladder: [
      ["Sau mỗi xung đột, hỏi: bề mặt là về X, nhưng tầng quan hệ là về gì?", "Thấy được tầng dưới, dù là sau đó."],
      ["Nhận ra khi mình đã leo thang suy diễn và tự hỏi: mình bỏ sót dữ liệu nào?", "Bắt được giả định chưa kiểm chứng."],
      ["Phát biểu suy luận của mình ra thành lời và mời kiểm chứng.", "Người kia sửa lại hoặc xác nhận, không phòng thủ."],
      ["Nhận diện tam giác kịch đang hình thành và từ chối nhận vai.", "Chuyển câu chuyện sang kết quả và trách nhiệm."],
      ["Dùng meta-giao tiếp để tháo một vòng lặp đã kéo dài nhiều tháng.", "Vòng lặp được gọi tên và thay đổi."],
    ],
    fail: [
      "Cãi ở tầng nội dung khi vấn đề nằm ở tầng quan hệ — càng cãi càng hỏng.",
      "Dùng khung để CHẨN ĐOÁN người khác: nói ‘anh đang làm Nạn Nhân đấy’ là bạn vừa bước vào vai Kẻ Bức Hại. Khung để soi mình.",
      "Meta-giao tiếp quá tay — liên tục ‘nói về cuộc trò chuyện’ khiến người kia thấy bị phân tích và kiệt sức. Dùng khi mắc kẹt, không dùng thường xuyên.",
      "Trình bày kết luận của mình như sự thật hiển nhiên thay vì như một suy luận có thể sai.",
    ],
    mastery: "Nhận ra tầng nào đang có vấn đề TRONG LÚC tương tác, và can thiệp đúng tầng đó.",
    ev: "khiêm tốn",
  },

  /* ---------- L5 ---------- */
  {
    L: "L5", id: "5.1", name: "Ảnh hưởng, đàm phán & liêm chính",
    claim: "Năng lực ảnh hưởng là công cụ trung tính về đạo đức. Tách khỏi liêm chính, nó không phải kỹ năng cao cấp — nó là thao túng.",
    mech: "Cialdini: có đi có lại, cam kết/nhất quán, bằng chứng xã hội, thẩm quyền, thiện cảm, khan hiếm; và ‘tiền thuyết phục’ (pre-suasion) — khoảnh khắc NGAY TRƯỚC thông điệp định hình cách nó được tiếp nhận. Đàm phán (Fisher & Ury): tập trung vào LỢI ÍCH (interests) không phải LẬP TRƯỜNG (positions); biết BATNA của mình. Voss: gọi tên cảm xúc đối phương (labeling), câu hỏi hiệu chỉnh (‘làm thế nào mình có thể…?’). Mặt tối: ‘thấu cảm đen’ và bộ ba đen tối (Machiavellianism, ái kỷ, thái nhân cách) dùng chính năng lực đọc người để khai thác. Lằn ranh phân định: ẢNH HƯỞNG phục vụ lợi ích chung và minh bạch về ý định; THAO TÚNG phục vụ tư lợi qua đánh lừa hoặc giấu ý định.",
    behav: [
      "Trước khi đề xuất, tìm lợi ích thật của họ và đóng khung quanh đó.",
      "Xác định BATNA của mình trước mọi đàm phán — không có nó, bạn nhượng bộ từ thế yếu.",
      "Gọi tên mối lo của đối phương để hạ căng: ‘có vẻ anh lo về…’",
      "Chạy bài kiểm tra liêm chính trước mỗi kỹ thuật ảnh hưởng (xem dưới).",
    ],
    ladder: [
      ["Trước một đề xuất, viết ra lợi ích thật của người nghe (không phải của bạn).", "Đề xuất được đóng khung đúng."],
      ["Xác định BATNA trước một cuộc thương lượng thật.", "Biết mình sẵn sàng đi tới đâu."],
      ["Dùng câu hỏi hiệu chỉnh thay vì yêu cầu cứng.", "Đối phương tham gia giải bài toán cùng bạn."],
      ["Mở rộng chiếc bánh: tìm một thoả thuận đáp ứng lợi ích cốt lõi cả hai.", "Không phải chia đôi, mà là cùng được nhiều hơn."],
      ["Đạt thoả thuận tốt và đối phương vẫn muốn làm việc với bạn lần sau.", "Thắng mà không đốt quan hệ."],
    ],
    fail: [
      "Mặc cả trên lập trường (chia đôi) thay vì mở rộng qua lợi ích.",
      "Chỉ dùng lập luận logic, bỏ quên uy tín và cảm xúc — và bỏ quên KAIROS, thời điểm.",
      "Đẩy quá mạnh tạo phản kháng (reactance) thay vì thuyết phục.",
      "Trượt sang thao túng: dùng kỹ thuật để phục vụ tư lợi qua việc giấu ý định.",
    ],
    mastery: "Đưa được người khác tới quyết định có lợi cho cả hai, họ thấy đó là lựa chọn của chính họ, và bài kiểm tra liêm chính luôn qua.",
    ev: "hỗn hợp",
    note: "BÀI KIỂM TRA LIÊM CHÍNH — áp cho mọi kỹ thuật ảnh hưởng: ‘Nếu người kia biết chính xác mình đang làm gì và vì sao, họ có còn thấy ổn không?’ Nếu không, đừng làm. Đây là ranh giới duy nhất, và nó không thương lượng được.",
  },
  {
    L: "L5", id: "5.2", name: "Nhóm, lãnh đạo & làm chủ phòng",
    claim: "Lãnh đạo không phải là người thông minh nhất phòng, mà là người tạo được an toàn tâm lý để những người khác dám nói thật.",
    mech: "An toàn tâm lý (Edmondson): dự báo mạnh nhất của hiệu quả đội nhóm — là niềm tin rằng nói lên một ý tưởng, câu hỏi hoặc sai sót sẽ không bị trừng phạt. Nó được tạo bởi hành vi của người dẫn dắt: thừa nhận mình không biết, mời gọi ý kiến, phản ứng học hỏi với tin xấu. Charisma (Cabane) = Hiện diện × Ấm áp × Quyền lực — cả ba là hành vi luyện được. Về làm chủ phòng: kỹ năng vào và rời một cuộc trò chuyện, và làm ‘người kết nối’ giới thiệu hai người với nhau.",
    behav: [
      "Nói ‘tôi không biết’ và ‘tôi đã sai’ trước nhóm — đây là hành vi tạo an toàn mạnh nhất.",
      "Mời người ít nói phát biểu; kiểm soát người nói lấn một cách nhã nhặn.",
      "Nhận trách nhiệm trước bên ngoài, xử lý vấn đề nội bộ theo hướng học hỏi.",
      "Giao cả trách nhiệm lẫn quyền quyết định, rồi lùi lại.",
      "Ghi nhận công lao cụ thể, công khai; không giành công của team.",
    ],
    ladder: [
      ["Phát biểu một câu trong 5 phút đầu mỗi cuộc họp.", "Lên tiếng sớm, không chờ tới cuối."],
      ["Điều phối một cuộc họp: mở bằng mục tiêu, chốt bằng ai-làm-gì-khi-nào.", "Cuộc họp ra được quyết định."],
      ["Nói ‘tôi không biết’ trước nhóm một cách bình thản.", "Uy tín tăng, không giảm."],
      ["Giao một việc quan trọng kèm quyền quyết định, và không micromanage.", "Người kia trưởng thành, việc vẫn chạy."],
      ["Truyền đạt một tin không vui: nói thẳng, thừa nhận tác động, ở lại trả lời.", "Nhóm vẫn tin tưởng bạn sau đó."],
    ],
    fail: [
      "Micromanage vì lo âu và gọi đó là ‘tiêu chuẩn cao’.",
      "Chỉ báo tin tốt, giấu rủi ro tới khi muộn — phá niềm tin không sửa được.",
      "Lệch về quyền lực → đáng nể nhưng lạnh; lệch về ấm áp → dễ mến nhưng nhẹ ký.",
      "Đổ lỗi cho cấp dưới trước bên ngoài. Một lần là đủ để mất lòng trung thành vĩnh viễn.",
    ],
    mastery: "Người trong nhóm dám nói lên sai sót và ý tưởng chưa chín trước mặt bạn.",
    ev: "vững",
  },
  {
    L: "L5", id: "5.3", name: "Văn hoá & bối cảnh",
    claim: "Không có phong cách giao tiếp ‘chuẩn’. Vị trí của bạn trên mọi thang đo là TƯƠNG ĐỐI so với người đối diện — và giả định mình là chuẩn phổ quát là sai lầm đắt giá nhất.",
    mech: "The Culture Map (Meyer) — 8 thang: giao tiếp (trực tiếp/hàm ý), phản hồi tiêu cực (thẳng/gián tiếp), thuyết phục (nguyên lý-trước/ứng dụng-trước), lãnh đạo (bình đẳng/thứ bậc), ra quyết định (đồng thuận/top-down), tin cậy (dựa-việc/dựa-quan hệ), bất đồng (đối đầu/tránh), lịch trình (tuyến tính/linh hoạt). High/low context (Hall). Face-negotiation (Ting-Toomey): văn hoá tập thể ưu tiên giữ thể diện và xử lý bất đồng gián tiếp. Markus & Kitayama: tự-cấu-trúc ĐỘC LẬP (giá trị từ sự độc đáo và thành tựu cá nhân) so với PHỤ THUỘC LẪN NHAU (giá trị từ hoà hợp, bổn phận, thuộc về) — nhiều lời khuyên ‘kỹ năng mềm’ ngầm giả định cái thứ nhất.",
    behav: [
      "Trước khi làm việc với một văn hoá mới, định vị cả mình lẫn họ trên từng thang.",
      "Hiệu chỉnh mức trực tiếp: văn hoá hàm ý cần đọc giữa các dòng.",
      "Cẩn trọng nhất ở thang phản hồi tiêu cực và bất đồng — nơi hiểu lầm đắt giá nhất.",
      "Kiểm chứng giả định thay vì áp khung của mình, và tránh rập khuôn cứng nhắc.",
    ],
    ladder: [
      ["Định vị chính mình trên 8 thang của Meyer.", "Biết mặc định của mình là gì."],
      ["Định vị một đối tác/khách hàng khác văn hoá trên cùng 8 thang.", "Thấy khoảng cách tương đối."],
      ["Điều chỉnh một hành vi cụ thể (cách góp ý, cách bất đồng) cho phù hợp.", "Giảm ma sát rõ rệt."],
      ["Nhận ra một hiểu lầm xuyên văn hoá đang xảy ra và gọi tên nó nhẹ nhàng.", "Tháo được hiểu lầm sớm."],
      ["Làm việc hiệu quả xuyên nhiều văn hoá mà vẫn chân thành, không giả tạo.", "Thích ứng mà không đánh mất mình."],
    ],
    fail: [
      "Giả định phong cách của mình là chuẩn phổ quát.",
      "Nhầm sự lịch sự/gián tiếp của văn hoá khác là đồng ý, hoặc là thiếu quyết đoán.",
      "Rập khuôn văn hoá cứng nhắc, bỏ qua khác biệt cá nhân — biến thang đo thành định kiến.",
      "Áp mô hình ‘yêu bản thân / đặt ranh giới’ kiểu cá nhân chủ nghĩa vào bối cảnh phụ thuộc lẫn nhau mà không hiệu chỉnh.",
    ],
    mastery: "Hiệu chỉnh phong cách theo bối cảnh văn hoá mà vẫn là chính mình, và tránh được các hiểu lầm tốn kém.",
    ev: "khiêm tốn",
  },
];

/* ================= EVIDENCE GRADES ================= */
const EV_GRADES = [
  ["vững", GREEN, "Nhiều nghiên cứu độc lập, nhân rộng được, cơ chế rõ. Có thể dựa vào."],
  ["khiêm tốn", BRASS, "Bằng chứng ủng hộ nhưng hạn chế: mẫu nhỏ, phần lớn tương quan, hoặc chủ yếu từ thực hành lâm sàng. Hữu dụng, nhưng giữ sự khiêm tốn."],
  ["hỗn hợp", "#8A5A3A", "Một số thành phần vững, một số bị bác bỏ hoặc thổi phồng. Đọc kỹ ghi chú của đơn vị."],
];
const EV_DEBUNK = [
  ["‘Power posing’ thay đổi hormone", "Nghiên cứu gốc (Carney, Cuddy & Yap 2010) THẤT BẠI NHÂN RỘNG; chính tác giả thứ nhất công khai rút lại. Hiệu ứng còn lại — nếu có — chỉ là cảm giác chủ quan, không phải nội tiết. Đừng xây gì lên trên nó."],
  ["‘Giao tiếp 93% là phi ngôn ngữ’ (7-38-55)", "Trích sai Mehrabian. Con số chỉ áp dụng cho tình huống rất hẹp: khi thông điệp cảm xúc MƠ HỒ và lời nói mâu thuẫn với giọng/nét mặt. Không phải quy luật chung của giao tiếp."],
  ["‘Khoanh tay = phòng thủ’ và các kiểu đọc vị dấu hiệu lẻ", "Không có cơ sở. Tín hiệu phi ngôn ngữ chỉ đọc được theo CỤM và trong BỐI CẢNH. Tự tin đọc vị từ một cử chỉ là nguồn sai lầm lớn."],
  ["‘Cứ tự nhủ tôi tuyệt vời thì sẽ tự tin’", "Với người tự trọng thấp, affirmation mâu thuẫn niềm tin cốt lõi có thể phản tác dụng (Wood 2009). Tự tin xây bằng bằng chứng hành động (Bandura), không bằng thần chú."],
  ["‘EQ quan trọng hơn IQ, quyết định 80% thành công’", "Tuyên bố phổ biến nhưng không được nghiên cứu ủng hộ ở mức đó. EQ đo theo NĂNG LỰC có giá trị gia tăng khiêm tốn nhưng thật, rõ nhất ở công việc đòi hỏi cảm xúc cao. Thang tự báo cáo trùng lắp nhiều với tính cách."],
  ["‘10.000 giờ là đủ’", "Ericsson bị hiểu sai. Quyết định là CHẤT LƯỢNG thực hành có chủ đích kèm phản hồi, không phải số giờ tích luỹ thụ động."],
];

/* ================= DIAGNOSTIC ================= */
const DIAG = [
  ["L1", "Khi bị phê bình hoặc căng thẳng, tôi mất bình tĩnh, nói năng lộn xộn, hoặc đóng băng — dù sau đó biết đáng lẽ nên làm gì."],
  ["L2", "Tôi giữ được bình tĩnh, nhưng tôi cần người khác chấp thuận mới thấy ổn; tôi phòng thủ khi bị chê, hoặc né tránh mọi rủi ro xã hội."],
  ["L3", "Tôi ổn định và không quá cần chấp thuận, nhưng tôi vụng trong tương tác một-một: khó bắt chuyện, người ta không thấy được lắng nghe, tôi trình bày lan man."],
  ["L4", "Tôi giao tiếp tốt trong tình huống bình thường, nhưng né tránh bất đồng, không đặt được ranh giới, hoặc mắc kẹt trong các vòng lặp xung đột lặp lại."],
  ["L5", "Tôi xử lý được ma sát, nhưng chưa tạo được kết quả qua người khác: thuyết phục yếu, chưa dẫn dắt được nhóm, hoặc vấp khi làm việc xuyên văn hoá."],
];

/* ================= METHOD ================= */
const METHOD = [
  ["Kỹ năng KHÁC kiến thức — ‘khoảng cách làm’", "Đọc về lắng nghe không làm bạn lắng nghe giỏi, như đọc về bơi không làm bạn biết bơi. Đây là sai lầm nền tảng nhất và là lý do phần lớn người đọc sách kỹ năng mềm không thay đổi gì. Kỹ năng xã hội chỉ hình thành qua thực hành có phản hồi."],
  ["Bài toán phản hồi bị giấu", "Khác thể thao, phản hồi xã hội bị TRỄ, MƠ HỒ, và thường bị GIẤU — người ta không nói thẳng bạn vụng chỗ nào. Không có phản hồi thì luyện tập chỉ củng cố lỗi. Bạn PHẢI tự thiết kế vòng phản hồi: ghi hình/ghi âm, một người quan sát tin cậy, và chủ động xin phản hồi cụ thể."],
  ["Thực hành có chủ đích (Ericsson)", "Bốn thành tố: mục tiêu cụ thể cho từng buổi; phản hồi tức thì; lặp lại nhiều lần; ở rìa vùng năng lực. Tập ‘chung chung’ không cải thiện — phải nhắm một kỹ năng con cụ thể mỗi lần. Đây là lý do mỗi đơn vị trong tài liệu này có thang 5 bậc."],
  ["Chế tạo reps", "Tiến bộ tỉ lệ với số reps. Tạo đấu trường rủi ro thấp: bắt chuyện người lạ giao dịch hằng ngày, Toastmasters, tình nguyện, nhận vai điều phối nhỏ, cộng đồng sở thích."],
  ["Phơi nhiễm tăng dần", "Với lo âu xã hội: chào và cười → hỏi một câu thông tin → khen một câu → trò chuyện 30 giây → nêu ý kiến trong nhóm → giữ hội thoại 2 phút với người mới → nêu bất đồng hoặc nói trước nhóm. Ở mỗi bậc tới khi lo âu giảm rõ rồi mới lên bậc sau. Lặp lại bậc, không nhảy vọt."],
  ["Nguyên tắc khó chịu", "Tăng trưởng nằm ở rìa vùng thoải mái. Nếu không thấy hơi ngượng, bạn đang tập trong vùng an toàn và không tiến bộ. Đếm số ‘cringe reps’ như một chỉ số."],
  ["Phản tư có cấu trúc (AAR)", "Sau tương tác quan trọng: mình định làm gì / thực tế xảy ra gì / khoảng cách do đâu / lần sau làm khác MỘT điều nào. Viết ra. Kinh nghiệm không phản tư chỉ lặp lại lỗi cũ."],
  ["Phân bổ 70-20-10", "Khoảng 70% học qua trải nghiệm thực tế, 20% qua người khác (quan sát, cố vấn, phản hồi), 10% qua học chính quy. Sai lầm phổ biến là đảo ngược: 90% lý thuyết, gần như không thực hành."],
];

const WEEKS = [
  ["Tuần 1–2", "L1 — Nền điều hoà", "Đơn vị 1.1–1.2, bậc 1–3. Mục tiêu: bắt được kích hoạt và tạo khoảng dừng ba giây."],
  ["Tuần 3–5", "L3 — Lắng nghe (đòn bẩy cao nhất)", "Đơn vị 3.1, bậc 1–4. Mỗi cuộc trò chuyện: một lần diễn giải lại. Mục tiêu: người khác thấy được lắng nghe."],
  ["Tuần 6–7", "L3 — Hiện diện & giọng nói", "Đơn vị 3.3, bậc 1–4. Ghi âm mỗi ngày. Mục tiêu: bỏ cử chỉ thừa, sửa uptalk."],
  ["Tuần 8–9", "L3 — Ấn tượng & bắt chuyện", "Đơn vị 3.5 + thang phơi nhiễm. Một cringe rep mỗi ngày. Mục tiêu: bắt và giữ hội thoại với người lạ."],
  ["Tuần 10–11", "L4 — Quyết đoán & ranh giới", "Đơn vị 4.1, bậc 1–4. Một ý kiến thật mỗi ngày; một lần nói không. Mục tiêu: nêu nhu cầu bình thản."],
  ["Tuần 12", "Tích hợp", "Một tình huống thật cấp cao (trình bày, hoặc một cuộc trò chuyện khó đã hoãn lâu) + AAR toàn chương trình. Chấm lại rubric. Chọn trọng tâm quý sau."],
];

/* ================= CLINIC ================= */
const PROTOCOL = [
  { h: "TRƯỚC — 5 đến 10 phút", col: "#2E6A62", items: [
    "Xác định telos: kết quả tôi thật sự muốn là gì? (không phải ‘thắng’, mà là kết quả cụ thể + quan hệ nào sau đó)",
    "Chuẩn bị ba cuộc trò chuyện: sự việc — cảm xúc — bản sắc (điều gì của tôi/họ đang bị đụng chạm?)",
    "Suy luận ngược thang: tôi đang giả định gì mà chưa kiểm chứng? Dữ liệu nào tôi đã bỏ qua?",
    "Đọc lợi ích thật của họ, không phải lập trường: họ cần gì, sợ gì, chịu áp lực gì?",
    "Điều hoà: thở ra dài, vào phòng từ trạng thái an toàn — không từ hệ đe doạ.",
  ]},
  { h: "TRONG — thời gian thực", col: "#2E4C5A", items: [
    "Mở bằng an toàn và khung chung, trước khi vào nội dung gai góc.",
    "Chạy vòng lặp: quan sát → gọi tên → kiểm chứng. ‘Tôi thấy… tôi đang hiểu là… có đúng không?’",
    "Theo dõi tín hiệu mất điều hoà — của HỌ và của MÌNH. Thấy là dừng lại điều hoà trước.",
    "Steelman lập trường họ tới khi họ nói ‘đúng, chính xác’, TRƯỚC khi phản biện.",
    "Khi mắc kẹt: leo lên tầng meta. Nói VỀ cuộc trò chuyện thay vì tiếp tục trong nó.",
    "Từ chối nhận vai trong tam giác kịch.",
  ]},
  { h: "SAU — 10 phút, trong 24 giờ", col: "#8A5A3A", items: [
    "AAR: định làm gì / xảy ra gì / khoảng cách do đâu / một điều làm khác lần sau.",
    "Tách hai câu hỏi: ‘kết quả có tốt không?’ và ‘quy trình của tôi có tốt không?’ Quy trình tốt vẫn có thể ra kết quả xấu. Chỉ học từ quy trình.",
    "Kiểm tra tầng: tôi có cãi nội dung khi vấn đề nằm ở quan hệ không?",
    "Ghi lại một quan sát về NGƯỜI KIA — xây dần biểu tượng tinh thần về họ.",
    "Tự trắc ẩn: một vụng về không hạ giá trị của bạn. Tự sỉ nhục kéo bạn về hệ đe doạ và giết động lực tập tiếp.",
  ]},
];

const TREE = [
  ["Họ phòng thủ, biện minh, phản pháo", "Bạn đã kích hoạt hệ đe doạ, hoặc chạm tầng bản sắc.", "Dừng nội dung. Tạo an toàn: khẳng định thiện chí + tách hành vi khỏi con người. ‘Mình không nói bạn cẩu thả — mình lo về mốc bàn giao.’"],
  ["Họ im lặng, rút lui, ‘không sao đâu’", "Mất điều hoà kiểu đóng băng, hoặc thấy không an toàn để nói thật.", "Không truy đuổi gặng hỏi. Cho không gian, giữ cửa mở: ‘mình cảm giác có điều gì chưa nói được — mình sẵn sàng nghe, giờ hay lúc khác đều được.’"],
  ["Cãi vòng tròn, cùng một lập luận lặp lại", "Vấn đề ở tầng quan hệ hoặc tầng khung, không phải nội dung.", "Leo lên meta: ‘mình để ý mình đã vòng lại điểm này ba lần. Có lẽ điều thật sự gây khó không phải X. Bạn thấy sao?’"],
  ["Bạn thấy tim đập, muốn phản pháo hoặc bỏ đi", "CHÍNH BẠN đang mất điều hoà. Vỏ não trước đang offline.", "Đừng cố ‘khôn ngoan’ lúc này. Xin tạm dừng có thời hạn: ‘mình cần 20 phút để nghĩ cho rõ, mình quay lại lúc [giờ].’ Và quay lại thật."],
  ["Bạn bị kéo vào vai Người Cứu / Nạn Nhân / Kẻ Bức Hại", "Tam giác kịch đang hình thành.", "Từ chối vai. Chuyển sang câu hỏi trao quyền: ‘bạn muốn kết quả gì? bạn định làm gì trước?’ thay vì làm hộ hoặc quy lỗi."],
  ["Họ đồng ý ngoài miệng nhưng không đổi hành vi", "Miễn dịch với thay đổi, hoặc chưa có cam kết nội tại.", "Đừng thêm áp lực. Truy giả định lớn: ‘điều gì khiến việc này khó hơn nó có vẻ?’ Tìm cam kết cạnh tranh đang khoá họ."],
  ["Bạn nói đúng nhưng bị ghét", "Bạn thắng tầng nội dung, thua tầng quan hệ.", "Kiểm tra tỉ lệ thách thức/quan tâm. Đúng mà thiếu ấm áp bị đọc là công kích. Thêm ‘tôi ở phía bạn’ trước khi thêm ‘tôi không đồng ý’."],
];

const CASES = [
  {
    id: "c1", name: "Ca 1 — Bị chê gay gắt trước mặt cả nhóm",
    setup: "Trong họp, một quản lý cấp cao nói: ‘Bản phân tích này quá hời hợt. Anh có thật sự hiểu vấn đề không?’ Cả phòng im lặng nhìn bạn.",
    weak: "“Ơ… dạ, em xin lỗi ạ, em nghĩ là em đã… tại vì dữ liệu bên kia gửi muộn nên…”",
    weakWhy: "Ba lỗi: (1) xin lỗi phản xạ trước khi biết mình có sai không — nhận tội ở tầng bản sắc; (2) đổ lỗi hoàn cảnh — phòng thủ; (3) giọng lắp bắp — mất điều hoà, và điều này rút uy tín mạnh hơn cả nội dung.",
    strong: "(Một nhịp thở. Giọng chậm, đều.) “Anh có thể chỉ cụ thể phần nào chưa đủ sâu không ạ? Em muốn hiểu đúng kỳ vọng.” (nghe) “Được — phần độ nhạy của giả định thì anh nói đúng, em thiếu. Em bổ sung và gửi anh trước trưa mai. Còn phần phạm vi thì em có căn cứ, để em trình bày riêng với anh.”",
    strongWhy: "L1: khoảng dừng để giữ điều hoà — chính sự điềm tĩnh này khôi phục uy tín trước cả phòng, trước khi một chữ nào về nội dung được nói. L3 (tầng quan hệ): câu hỏi làm rõ chuyển từ ‘bị tấn công’ sang ‘cùng giải quyết’. L4 (tầng khung): đặt lại khung từ ‘anh có hiểu vấn đề không’ (bản sắc — không sửa được) sang ‘phần nào chưa đủ sâu’ (hành vi — sửa được). Cuối cùng mới tới nội dung: tách phần nhận và phần bảo lưu, và dời tranh luận sang không gian riêng nơi không ai phải giữ thể diện.",
    units: "1.1 · 2.1 · 4.4",
  },
  {
    id: "c2", name: "Ca 2 — Đồng nghiệp liên tục trễ hạn, ảnh hưởng công việc của bạn",
    setup: "Lần thứ ba trong tháng. Bạn đã bực, và cũng ngại làm mất lòng.",
    weak: "“Sao lần nào bạn cũng trễ vậy? Mình lúc nào cũng phải chờ, bạn không tôn trọng thời gian của người khác gì cả.”",
    weakWhy: "‘Lần nào cũng’, ‘lúc nào cũng’ = ngôn ngữ tuyệt đối. ‘Không tôn trọng’ = dán nhãn con người (tầng bản sắc) → chắc chắn kích hoạt phòng thủ. Bạn đã leo hết thang suy diễn và trình bày kết luận như sự thật hiển nhiên.",
    strong: "“Mình muốn nói một chuyện vì mình muốn mình phối hợp tốt hơn, không phải để trách bạn. [tạo an toàn] Ba lần gần đây bản của bạn về sau hạn một, hai ngày. [quan sát, không nhãn] Hệ quả là mình phải làm gấp phần mình và chất lượng bị ảnh hưởng. [tác động] Mình đang đoán có gì đó đang cản trở bên bạn — mình đoán đúng không? [kiểm chứng giả định] … Mình cần thống nhất: nếu sắp trễ, bạn báo mình trước một ngày. Được không?” [đề nghị cụ thể]",
    strongWhy: "SBI + NVC chạy đúng thứ tự: tạo an toàn trước (hạ hệ đe doạ) → quan sát bằng con số, không nhãn → tác động thật, không kịch → hạ thang suy diễn bằng cách KIỂM CHỨNG giả định thay vì kết tội → đề nghị hành vi cụ thể, khả thi. Đây là chế độ quyết đoán: không thụ động (chịu đựng tiếp), không hung hăng (dán nhãn).",
    units: "4.1 · 4.2 · 4.4",
  },
  {
    id: "c3", name: "Ca 3 — Sếp bác ý tưởng của bạn bằng một câu, không giải thích",
    setup: "‘Không, cách đó không chạy được đâu.’ Rồi chuyển chủ đề.",
    weak: "(Im lặng, gật đầu, ấm ức.) hoặc “Nhưng em nghĩ là nó chạy được mà anh, tại vì…” (nói to hơn, nhanh hơn)",
    weakWhy: "Cách một: rút lui — dạy sếp rằng ý của bạn có thể bị gạt mà không cần lý do, và bạn mất cơ hội học. Cách hai: leo thang ở tầng nội dung trong khi vấn đề là bạn chưa hiểu KHUNG của sếp — càng đẩy càng sinh phản kháng, lại làm trong phòng đông người nơi sếp phải giữ thể diện.",
    strong: "“Em hiểu ạ. Em muốn học từ chỗ này — điều gì khiến anh thấy nó không chạy được? Em đang thiếu dữ kiện nào?” (nghe) … (nếu vẫn thấy có giá trị) “Rõ rồi ạ. Cho em xin năm phút riêng sau họp — em có một dữ liệu có thể đổi bức tranh, nếu vẫn không thì em theo hướng của anh hoàn toàn.”",
    strongWhy: "Không đấu ở tầng nội dung trong phòng đông người. Câu hỏi ‘em đang thiếu dữ kiện nào’ vừa cầu thị vừa mở ra mô hình tư duy của sếp — bạn đang xây biểu tượng tinh thần về cách ông ấy quyết định, tài sản dùng được mãi. Chuyển tranh luận sang không gian riêng nơi tầng quan hệ an toàn hơn. Và tuyên bố trước sự cam kết (‘nếu vẫn không thì em theo hướng của anh’) — disagree and commit — làm giảm phòng thủ của sếp trước khi bạn trình bày.",
    units: "3.1 · 4.4 · 5.2",
  },
];

const CALIB = [
  ["Dự đoán trước — kiểm chứng sau", "Trước một cuộc gặp, viết ba dự đoán: họ sẽ phản ứng thế nào, mối lo thật của họ là gì, điểm nào sẽ căng. Sau đó đối chiếu. Sai ở đâu là biểu tượng tinh thần của bạn lệch ở đó. Đây là vòng phản hồi mạnh nhất cho khả năng đọc người — và hầu như không ai làm."],
  ["Steelman bắt buộc", "Với một quan điểm bạn không đồng ý, viết bản bảo vệ nó mạnh đến mức người tin nó phải nói ‘đúng, chính xác’. Nếu không viết nổi, bạn chưa hiểu họ — bạn đang cãi với một hình nộm."],
  ["Truy tầng: ‘chuyện này thực chất là về cái gì?’", "Sau mỗi xung đột: bề mặt là về X, nhưng tầng quan hệ là về gì? (được coi trọng? bị kiểm soát? sợ mất năng lực?) Luyện tới khi bạn thấy tầng dưới NGAY LÚC đang ở trong cuộc."],
  ["Đọc theo cụm, không theo dấu hiệu lẻ", "Xem một cuộc phỏng vấn không tiếng. Đoán trạng thái từng người theo CỤM tín hiệu (tư thế + mắt + tay + nhịp). Rồi bật tiếng kiểm chứng. Chống lại thói đọc vị từ một cử chỉ."],
  ["Nhật ký giả định lớn", "Mỗi khi né một hành vi, viết: mình sợ điều gì sẽ xảy ra? Rồi thiết kế một thí nghiệm an toàn để kiểm chứng nỗi sợ đó. Đây là đơn vị 2.3 áp dụng thực."],
  ["Ghi âm và mã hoá", "Ghi âm một cuộc trò chuyện thật (có xin phép). Nghe lại và đánh dấu: chỗ nào mình cắt lời, chỗ nào leo thang suy diễn, chỗ nào bỏ lỡ tín hiệu của họ, chỗ nào can thiệp sai tầng. Đây là supervision tự làm."],
];

/* ================= MEASURE ================= */
const RUBRIC = [
  ["Sơ cấp", "Chưa nhận thức được vấn đề, hoặc biết nhưng chưa làm được. Hành vi cũ tự động chiếm quyền dưới áp lực.", "#B0483F"],
  ["Đang phát triển", "Làm được khi có ý thức và điều kiện thuận lợi, nhưng chưa ổn định; trượt lại khi căng thẳng.", "#B07A2E"],
  ["Thành thạo", "Làm được nhất quán trong hầu hết tình huống thường gặp, kể cả khi có áp lực vừa phải.", "#4A6E5A"],
  ["Thuần thục", "Làm tốt cả trong tình huống khó, linh hoạt theo bối cảnh, ít cần nỗ lực có ý thức.", "#2E6A62"],
  ["Tinh thông", "Phản xạ tự nhiên, tuỳ biến được và dạy lại được cho người khác.", "#2E4C5A"],
];

const MEASURE = [
  ["Vấn đề Dunning-Kruger", "Tự nhận thức về kỹ năng xã hội lệch có hệ thống, và người yếu nhất thường tự đánh giá cao nhất. Vì thế tự đánh giá MỘT MÌNH là vô dụng. Phản hồi 360 — hỏi nhiều người xung quanh — là bắt buộc, không phải tuỳ chọn."],
  ["Đo bằng hành vi, không bằng cảm giác", "Đừng đo ‘mình thấy tự tin hơn’. Đo hành vi quan sát được: tần suất bắt chuyện, tỉ lệ nói/nghe, số lần đặt ranh giới thành công, đánh giá của người khác. Cảm giác dễ đánh lừa, nhất là ngay sau khi đọc xong một tài liệu như thế này."],
  ["Chỉ số dẫn dắt và chỉ số kết quả", "DẪN DẮT (ghi hằng tuần, bạn kiểm soát được): số reps của kỹ năng trọng tâm, số cringe reps, tần suất hành vi mục tiêu. KẾT QUẢ (mỗi quý, đến sau): rubric, phản hồi 360, kết quả thực tế. Theo dõi cả hai — nếu chỉ nhìn chỉ số kết quả, bạn sẽ bỏ cuộc trước khi nó kịp động đậy."],
  ["Cổng tiến độ", "Không lên tầng khi chưa đạt tiêu chí thành thạo của tầng dưới. Lao vào ‘xử lý xung đột’ (L4) khi chưa điều hoà được (L1) và chưa lắng nghe được (L3) sẽ thất bại — và thất bại đó sẽ dạy bạn một bài học sai: rằng bạn không có khiếu."],
  ["Công cụ chuẩn hoá và caveat", "MSCEIT đo EQ theo NĂNG LỰC (làm bài, có đáp án); EQ-i 2.0 là tự báo cáo. Thang tự báo cáo phản ánh sự tự nhận thức hơn là năng lực thật, và trùng lắp đáng kể với các nét tính cách Big Five. Nếu dùng, hãy đối chiếu với đánh giá hành vi từ người khác."],
  ["Tái đánh giá định kỳ", "Mỗi quý: chấm lại rubric và xin lại phản hồi 360 từ CÙNG nhóm người. So sánh theo thời gian để thấy quỹ đạo thật, tách khỏi cảm giác nhất thời."],
];

const FAILMODES = [
  ["Cấp 1 — Người mới", "Nhầm ‘biết’ với ‘làm được’", "Thu thập framework, đọc sách, xem video — không có reps thực tế. Nếu bạn đọc hết tài liệu này và không đổi hành vi nào trong tuần này, bạn vừa mắc lỗi số một."],
  ["Cấp 1 — Người mới", "Không có vòng phản hồi", "Luyện mà không có phản hồi = luyện sai và củng cố lỗi. Vì phản hồi xã hội bị giấu, bạn phải chủ động thiết kế nó."],
  ["Cấp 1 — Người mới", "Sửa mọi thứ cùng lúc", "18 đơn vị cùng lúc = không cái nào tiến. Một trọng tâm mỗi tuần, tuần tự theo tầng."],
  ["Cấp 1 — Người mới", "Nhầm tính cách với kỹ năng", "Hướng nội, ít nói, thích yên tĩnh KHÔNG phải thiếu kỹ năng xã hội. Mục tiêu không phải biến thành người hướng ngoại, mà là kết nối hiệu quả theo cách của mình."],
  ["Cấp 2 — Đã khá", "Can thiệp đúng kỹ thuật ở sai tầng", "Cãi lý khi vấn đề nằm ở tầng quan hệ. Đây là thất bại đặc trưng của người đã có kỹ năng — xem đơn vị 4.4."],
  ["Cấp 2 — Đã khá", "Thắng nội dung, thua quan hệ", "Chứng minh mình đúng trong khi làm người kia thấy nhỏ bé. Câu hỏi kiểm tra: sau cuộc này, họ có muốn nói chuyện với bạn lần nữa không?"],
  ["Cấp 2 — Đã khá", "Kỹ thuật hoá tới mức mất chân thành", "Người ta cảm nhận được khi bạn đang ‘chạy quy trình’ lên họ. Nếu người kia thấy mình là ĐỐI TƯỢNG của một kỹ thuật, bạn đã thua tầng quan hệ rồi."],
  ["Cấp 2 — Đã khá", "Nhầm sự thoải mái với sự thành thạo", "Bạn giỏi với kiểu người và bối cảnh quen thuộc rồi dừng lại. Kỹ năng xã hội bám bối cảnh — chuyển giao KHÔNG tự động. Luyện ở nơi bạn thấy khó nhất."],
  ["Cấp 3 — Chuyên gia", "Dùng khung để chẩn đoán người khác", "Nói ‘anh đang làm Nạn Nhân đấy’ là một nước đi trong tam giác kịch — bạn vừa thành Kẻ Bức Hại. Khung để soi MÌNH, không phải để dán nhãn."],
  ["Cấp 3 — Chuyên gia", "Điều hoà thành né tránh", "‘Mình cần bình tĩnh trước đã’ có thể là điều hoà thật, cũng có thể là trốn. Kiểm tra: bạn CÓ quay lại đúng hẹn không?"],
  ["Cấp 3 — Chuyên gia", "Năng lực tách khỏi liêm chính", "Đọc người và gây ảnh hưởng là công cụ trung tính. Tách khỏi thiện chí, nó thành thao túng — và đó không phải cấp độ cao hơn của kỹ năng, mà là một thứ khác hẳn."],
];

/* ================= UI ================= */
const TABS = [
  { id: "thesis", vi: "1 · Luận đề" },
  { id: "model", vi: "2 · Mô hình & Chẩn đoán" },
  { id: "curriculum", vi: "3 · Giáo trình" },
  { id: "method", vi: "4 · Phương pháp" },
  { id: "clinic", vi: "5 · Vận hành & Ca" },
  { id: "measure", vi: "6 · Đo lường" },
];

const Eyebrow = ({ children, color = ACCENT }) => (
  <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.09em", textTransform: "uppercase", color, fontWeight: 700, marginBottom: 6 }}>{children}</div>
);
const evColor = (e) => (e === "vững" ? GREEN : e === "khiêm tốn" ? BRASS : "#8A5A3A");

export default function Manual() {
  const [tab, setTab] = useState("thesis");
  const [openUnit, setOpenUnit] = useState("3.1");
  const [layerFilter, setLayerFilter] = useState("all");
  const [openCase, setOpenCase] = useState("c1");

  return (
    <div style={{ fontFamily: SERIF, background: PAPER, minHeight: "100vh", color: INK }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 16px 64px" }}>
        {/* HERO */}
        <div style={{ marginBottom: 18 }}>
          <Eyebrow color={MUTE}>Sổ tay hành nghề · Tự luyện · Kỹ năng xã hội và EQ</Eyebrow>
          <h1 style={{ fontSize: 29, lineHeight: 1.16, margin: 0, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Năng lực xã hội<br />dưới áp lực
          </h1>
          <p style={{ fontFamily: SANS, fontSize: 13.4, color: "#4C5157", marginTop: 11, maxWidth: 700, lineHeight: 1.65 }}>
            Sáu phần · Năm tầng · Mười tám đơn vị. Dành cho người trưởng thành có năng lực nhận thức cao nhưng yếu kỹ năng xã hội, tự đào tạo mình tới cấp chuyên nghiệp.
          </p>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22, borderBottom: `1px solid ${LINE}`, paddingBottom: 14 }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                fontFamily: SANS, fontSize: 12.4, padding: "7px 13px", borderRadius: 3, cursor: "pointer",
                border: `1px solid ${tab === t.id ? ACCENT : LINE}`,
                background: tab === t.id ? ACCENT : CARD,
                color: tab === t.id ? "#fff" : "#4C5157",
                fontWeight: tab === t.id ? 700 : 500,
              }}>
              {t.vi}
            </button>
          ))}
        </div>

        {/* ========== 1 · THESIS ========== */}
        {tab === "thesis" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${BRASS}`, borderRadius: 4, padding: "18px 22px", background: CARD }}>
              <Eyebrow color={BRASS}>Luận đề</Eyebrow>
              <div style={{ fontSize: 16, lineHeight: 1.72 }}>
                Kỹ năng xã hội <b>không phải</b> kho kiến thức về con người, mà là <b>năng lực giữ được điều hoà, đọc chính xác, và hành động có liêm chính dưới áp lực quan hệ</b>.
                <br /><br />
                Từ đó rút ra ba hệ quả chi phối toàn bộ tài liệu này:
                <br /><br />
                <b>Một.</b> Nó được xây <b>từ dưới lên</b> — hệ thần kinh trước bản thân, bản thân trước cặp đôi, cặp đôi trước nhóm. Học sai thứ tự thì tầng trên sụp mỗi khi có áp lực.
                <br /><br />
                <b>Hai.</b> Nó chỉ hình thành qua <b>thực hành có phản hồi</b>, không qua đọc hiểu. Đọc xong tài liệu này mà không đổi hành vi nào thì bạn không tiến bộ chút nào — bạn chỉ biết nhiều hơn về sự tiến bộ.
                <br /><br />
                <b>Ba.</b> Thất bại phổ biến nhất của người <i>đã khá</i> không phải thiếu kỹ thuật, mà là <b>can thiệp đúng kỹ thuật ở sai tầng</b>.
              </div>
            </div>

            <div>
              <Eyebrow>Tài liệu này KHÔNG phải gì</Eyebrow>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  ["Không phải bách khoa toàn thư", "Đã cắt tàn nhẫn từ ~48 xuống 18 đơn vị. Cái gì không phục vụ một người tự luyện thì đã bị loại."],
                  ["Không phải tập hợp mẹo", "Mỗi đơn vị có một luận điểm có thể sai, một cơ chế, và một tiêu chí thành thạo kiểm chứng được. Nếu một ý không đáp ứng được ba thứ đó, nó không có mặt ở đây."],
                  ["Không phải trung lập về đạo đức", "Năng lực đọc người và gây ảnh hưởng có thể dùng để khai thác. Tài liệu này từ chối tách kỹ năng khỏi liêm chính — xem bài kiểm tra ở đơn vị 5.1."],
                  ["Không thay thế trị liệu", "Nếu lo âu xã hội, sang chấn, hoặc trầm cảm đang chi phối, hãy làm việc với chuyên gia. Sổ tay này giả định một nền tảng sức khoẻ tâm thần đủ ổn để luyện tập."],
                ].map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                    <div style={{ fontSize: 14.6, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                    <div style={{ fontFamily: SANS, fontSize: 13.3, lineHeight: 1.6, color: "#41464C" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Phân loại chất lượng bằng chứng</Eyebrow>
              <p style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, margin: "0 0 10px", lineHeight: 1.55 }}>
                Một tài liệu chuyên nghiệp phải nói rõ nó tin cái gì và tin tới đâu. Mỗi đơn vị được gắn một nhãn.
              </p>
              <div style={{ display: "grid", gap: 7, marginBottom: 14 }}>
                {EV_GRADES.map(([g, c, d], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ background: c, color: "#fff", fontFamily: SANS, fontSize: 12, fontWeight: 700, padding: "10px 14px", display: "flex", alignItems: "center", minWidth: 96 }}>{g}</div>
                    <div style={{ fontSize: 13.4, lineHeight: 1.55, padding: "10px 14px 10px 0", alignSelf: "center" }}>{d}</div>
                  </div>
                ))}
              </div>
              <Eyebrow color={RUST}>Những điều được lặp lại rộng rãi nhưng SAI</Eyebrow>
              <div style={{ display: "grid", gap: 8 }}>
                {EV_DEBUNK.map(([h, d], i) => (
                  <div key={i} style={{ border: "1px solid #EAD2C7", background: "#FBF4F1", borderRadius: 4, padding: "11px 14px" }}>
                    <div style={{ fontSize: 14.2, fontWeight: 600, color: "#8A4838", marginBottom: 3 }}>{h}</div>
                    <div style={{ fontFamily: SANS, fontSize: 13.2, lineHeight: 1.6, color: "#3E3A37" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, lineHeight: 1.65, borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              <b>Cách dùng:</b> Đọc <b>2 · Mô hình</b> và làm bộ chẩn đoán để biết bạn nên bắt đầu ở tầng nào. Vào <b>3 · Giáo trình</b>, chọn đúng một đơn vị. Dùng <b>4 · Phương pháp</b> để luyện nó trong 2–3 tuần. Khi gặp tình huống thật, mở <b>5 · Vận hành</b>. Mỗi quý, mở <b>6 · Đo lường</b> để chấm lại. Đừng đọc tuần tự hết một lượt rồi thôi — đó chính là chế độ hỏng số một.
            </div>
          </div>
        )}

        {/* ========== 2 · MODEL ========== */}
        {tab === "model" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ background: "#1F2A2E", color: "#E5EBE9", borderRadius: 5, padding: "16px 20px" }}>
              <Eyebrow color="#7FBFB2">Một mô hình, hai mặt</Eyebrow>
              <div style={{ fontSize: 14.4, lineHeight: 1.7 }}>
                Năm tầng này vừa là <b>trình tự học</b> (xây từ dưới lên) vừa là <b>trình tự can thiệp</b> (chẩn đoán từ dưới lên khi một tương tác đang hỏng). Đây là cùng một mô hình nhìn từ hai phía — và chính vì thế, hiểu nó một lần thì dùng được cả đời.
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #35443F", fontFamily: SANS, fontSize: 13.2, lineHeight: 1.6 }}>
                  <b style={{ color: "#7FBFB2" }}>Quy tắc vàng: </b>Điều hoà trước quan hệ. Quan hệ trước khung. Khung trước nội dung. Bậc thầy hầu như không bao giờ bắt đầu ở tầng nội dung.
                </div>
              </div>
            </div>

            {LAYERS.map((l) => {
              const us = UNITS.filter((u) => u.L === l.k);
              return (
                <div key={l.k} style={{ border: `1px solid ${LINE}`, borderRadius: 5, overflow: "hidden", background: CARD }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: l.color }}>
                    <div style={{ fontFamily: SANS, fontSize: 21, fontWeight: 800, color: "#fff", opacity: 0.5, lineHeight: 1 }}>{l.n}</div>
                    <div>
                      <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: "#fff" }}>Tầng {l.n} — {l.name}</div>
                      <div style={{ fontFamily: SANS, fontSize: 11.5, color: "rgba(255,255,255,0.8)" }}>{l.en}</div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 16px 14px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginBottom: 11 }}>
                      <div style={{ fontFamily: SANS, fontSize: 12.8, lineHeight: 1.55 }}>
                        <b style={{ color: l.color }}>Mặt phát triển · </b>{l.dev}
                      </div>
                      <div style={{ fontFamily: SANS, fontSize: 12.8, lineHeight: 1.55 }}>
                        <b style={{ color: l.color }}>Mặt vận hành · </b>{l.ops}
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 7 }}>
                      {us.map((u) => (
                        <button key={u.id} onClick={() => { setTab("curriculum"); setOpenUnit(u.id); setLayerFilter("all"); }}
                          style={{ textAlign: "left", cursor: "pointer", border: `1px solid ${LINE}`, borderRadius: 4, padding: "8px 11px", background: PAPER }}>
                          <div style={{ fontFamily: SANS, fontSize: 10.8, color: l.color, fontWeight: 700 }}>{u.id}</div>
                          <div style={{ fontSize: 13.3, lineHeight: 1.35, marginTop: 2 }}>{u.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <div>
              <Eyebrow>Chẩn đoán đầu vào — bạn nên bắt đầu ở tầng nào?</Eyebrow>
              <p style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, margin: "0 0 10px", lineHeight: 1.55 }}>
                Đọc từ trên xuống. Dừng lại ở mô tả ĐẦU TIÊN khớp với bạn — đó là tầng bạn bắt đầu. Đừng bỏ qua nó để nhảy tới tầng nghe hấp dẫn hơn.
              </p>
              <div style={{ display: "grid", gap: 7 }}>
                {DIAG.map(([k, d], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ width: 7, background: lc(k) }} />
                    <div style={{ padding: "11px 14px" }}>
                      <div style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 700, color: lc(k), marginBottom: 2 }}>Bắt đầu ở Tầng {k.slice(1)}</div>
                      <div style={{ fontSize: 13.9, lineHeight: 1.55 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== 3 · CURRICULUM ========== */}
        {tab === "curriculum" && (
          <div style={{ display: "grid", gap: 11 }}>
            <div style={{ fontFamily: SANS, fontSize: 12.6, color: "#4C5157", lineHeight: 1.6, background: CARD, border: `1px solid ${LINE}`, borderRadius: 4, padding: "11px 14px" }}>
              Mỗi đơn vị có cùng một lược đồ: <b>Luận điểm</b> (một khẳng định có thể sai) → <b>Cơ chế</b> (vì sao) → <b>Hành vi</b> (trông như thế nào) → <b>Thang 5 bậc</b> (luyện thế nào, kèm dấu hiệu ✓) → <b>Chế độ hỏng</b> → <b>Tiêu chí thành thạo</b>. Chọn <b>một</b> đơn vị. Không phải mười.
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button onClick={() => setLayerFilter("all")} style={{ fontFamily: SANS, fontSize: 11.5, padding: "5px 11px", borderRadius: 20, cursor: "pointer", border: `1px solid ${layerFilter === "all" ? INK : LINE}`, background: layerFilter === "all" ? INK : CARD, color: layerFilter === "all" ? "#fff" : "#4C5157", fontWeight: 600 }}>Tất cả 18</button>
              {LAYERS.map((l) => (
                <button key={l.k} onClick={() => setLayerFilter(l.k)} style={{ fontFamily: SANS, fontSize: 11.5, padding: "5px 11px", borderRadius: 20, cursor: "pointer", border: `1px solid ${layerFilter === l.k ? l.color : LINE}`, background: layerFilter === l.k ? l.color : CARD, color: layerFilter === l.k ? "#fff" : "#4C5157", fontWeight: 600 }}>{l.k} · {l.name}</button>
              ))}
            </div>

            {UNITS.filter((u) => layerFilter === "all" || u.L === layerFilter).map((u) => {
              const open = openUnit === u.id;
              const col = lc(u.L);
              return (
                <div key={u.id} style={{ border: `1px solid ${open ? col : LINE}`, borderRadius: 5, overflow: "hidden", background: CARD }}>
                  <button onClick={() => setOpenUnit(open ? null : u.id)}
                    style={{ width: "100%", textAlign: "left", cursor: "pointer", border: "none", background: open ? PAPER : CARD, padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 11, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: SANS, fontSize: 11.8, fontWeight: 800, color: col, minWidth: 26 }}>{u.id}</span>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{u.name}</span>
                      <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: "#fff", background: evColor(u.ev), padding: "2px 6px", borderRadius: 2, letterSpacing: "0.04em" }}>{u.ev}</span>
                    </div>
                    <span style={{ fontFamily: SANS, fontSize: 17, color: col }}>{open ? "−" : "+"}</span>
                  </button>

                  {open && (
                    <div style={{ padding: "2px 16px 18px" }}>
                      <div style={{ background: PAPER, borderLeft: `3px solid ${col}`, borderRadius: "0 4px 4px 0", padding: "12px 15px", marginBottom: 14 }}>
                        <Eyebrow color={col}>Luận điểm</Eyebrow>
                        <div style={{ fontSize: 15.2, lineHeight: 1.65, fontWeight: 500 }}>{u.claim}</div>
                      </div>

                      <div style={{ borderLeft: `2px solid ${LINE}`, paddingLeft: 13, marginBottom: 14 }}>
                        <Eyebrow color={MUTE}>Cơ chế</Eyebrow>
                        <div style={{ fontSize: 14.3, lineHeight: 1.68 }}>{u.mech}</div>
                      </div>

                      {u.note && (
                        <div style={{ fontFamily: SANS, fontSize: 12.8, lineHeight: 1.6, color: "#8A4838", background: "#FBF4F1", border: "1px solid #EAD2C7", borderRadius: 4, padding: "10px 13px", marginBottom: 14 }}>{u.note}</div>
                      )}

                      <div style={{ borderLeft: `2px solid ${col}`, paddingLeft: 13, marginBottom: 14 }}>
                        <Eyebrow color={col}>Hành vi quan sát được</Eyebrow>
                        <ul style={{ margin: 0, paddingLeft: 17, fontSize: 13.9, lineHeight: 1.62 }}>
                          {u.behav.map((b, i) => <li key={i} style={{ marginBottom: 3 }}>{b}</li>)}
                        </ul>
                      </div>

                      <div style={{ background: "#F2F5F2", border: "1px solid #DCE4D9", borderRadius: 4, padding: "11px 14px", marginBottom: 12 }}>
                        <Eyebrow color={GREEN}>Thang luyện tập — leo từng bậc</Eyebrow>
                        {u.ladder.map((r, i) => (
                          <div key={i} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 10, padding: "8px 0", borderTop: i > 0 ? "1px solid #E2E9E0" : "none" }}>
                            <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 800, color: BRASS }}>L{i + 1}</div>
                            <div>
                              <div style={{ fontSize: 13.8, lineHeight: 1.55 }}>{r[0]}</div>
                              <div style={{ fontFamily: SANS, fontSize: 12.2, lineHeight: 1.5, color: GREEN, marginTop: 2 }}>✓ {r[1]}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: "#FBEEEA", border: "1px solid #EAD2C7", borderRadius: 4, padding: "11px 14px", marginBottom: 12 }}>
                        <Eyebrow color={RUST}>Chế độ hỏng</Eyebrow>
                        <ul style={{ margin: 0, paddingLeft: 17, fontSize: 13.8, lineHeight: 1.6 }}>
                          {u.fail.map((f, i) => <li key={i} style={{ marginBottom: 3 }}>{f}</li>)}
                        </ul>
                      </div>

                      <div style={{ background: PAPER, borderRadius: 4, padding: "11px 14px", borderLeft: `2px solid ${BRASS}` }}>
                        <Eyebrow color={BRASS}>Tiêu chí thành thạo</Eyebrow>
                        <div style={{ fontSize: 14, lineHeight: 1.6 }}>{u.mastery}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ========== 4 · METHOD ========== */}
        {tab === "method" && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ background: "#1F2A2E", color: "#E5EBE9", borderRadius: 5, padding: "16px 20px" }}>
              <Eyebrow color="#7FBFB2">Vì sao phần này quyết định thành bại</Eyebrow>
              <div style={{ fontSize: 14.4, lineHeight: 1.7 }}>
                Phần lớn nỗ lực học kỹ năng mềm thất bại KHÔNG vì thiếu nội dung mà vì thiếu <b>phương pháp luyện đúng</b>. Nội dung ở khắp nơi; điều hiếm là một hệ thống thực hành có reps và có phản hồi. Nếu bạn chỉ đọc một tab, đọc tab này.
              </div>
            </div>

            {METHOD.map(([h, d], i) => (
              <div key={i} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 14 }}>
                <div style={{ fontSize: 15.4, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                <div style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.64, color: "#3D4249" }}>{d}</div>
              </div>
            ))}

            <div>
              <Eyebrow>Hệ điều hành hằng tuần</Eyebrow>
              <div style={{ display: "grid", gap: 7 }}>
                {[
                  ["Chủ nhật · 10 phút", "Chọn MỘT đơn vị và MỘT bậc thang. Đặt chỉ tiêu reps cụ thể cho tuần."],
                  ["Mỗi ngày · trong lúc sống", "1–2 reps trong tương tác thật. Cuối ngày log 30 giây: mấy reps, xảy ra gì."],
                  ["3 lần/tuần", "Một stretch rep — hơi khó hơn mức thoải mái."],
                  ["1 lần/tuần", "Xin một phản hồi cụ thể, hoặc ghi âm/quay một tương tác để tự soi."],
                  ["Cuối tuần · 15 phút", "AAR. Rút một bài học. Chọn trọng tâm tuần sau."],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(130px, 28%) 1fr", gap: 12, border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "10px 14px" }}>
                    <div style={{ fontFamily: SANS, fontSize: 12.3, fontWeight: 700, color: ACCENT }}>{k}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Chương trình khởi động 12 tuần</Eyebrow>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, margin: "0 0 10px", lineHeight: 1.55 }}>
                Thời lượng linh hoạt. Điều bất biến là <b>thứ tự</b>: điều hoà → lắng nghe → hiện diện → ấn tượng → quyết đoán.
              </p>
              <div style={{ display: "grid", gap: 7 }}>
                {WEEKS.map(([w, t, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "baseline" }}>
                      <span style={{ fontFamily: SANS, fontSize: 11.4, fontWeight: 700, color: BRASS, minWidth: 70 }}>{w}</span>
                      <span style={{ fontSize: 14.4, fontWeight: 600 }}>{t}</span>
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 12.9, lineHeight: 1.55, color: "#4C5157", marginTop: 4 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== 5 · CLINIC ========== */}
        {tab === "clinic" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ background: "#231E2E", color: "#EBE6F0", borderRadius: 5, padding: "16px 20px" }}>
              <Eyebrow color="#B79BD6">Vận hành dưới áp lực</Eyebrow>
              <div style={{ fontSize: 14.4, lineHeight: 1.7 }}>
                Người mới hỏi <i>‘tôi nên nói gì?’</i>. Người thành thạo hỏi <i>‘tôi đang ở tầng nào, và tầng nào cần can thiệp?’</i> Phần này là giao thức, cây chẩn đoán, và ca có chú giải — thứ biến kiến thức thành phản xạ khi bạn không còn thời gian để nghĩ.
              </div>
            </div>

            <div>
              <Eyebrow>Giao thức trước — trong — sau</Eyebrow>
              <div style={{ display: "grid", gap: 10 }}>
                {PROTOCOL.map((p, i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 5, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "10px 15px", background: p.col }}>
                      <div style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>{p.h}</div>
                    </div>
                    <ul style={{ margin: 0, padding: "11px 15px 12px 32px", fontSize: 13.6, lineHeight: 1.62 }}>
                      {p.items.map((it, j) => <li key={j} style={{ marginBottom: 4 }}>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow color={RUST}>Cây chẩn đoán — khi tương tác đang hỏng</Eyebrow>
              <div style={{ display: "grid", gap: 8 }}>
                {TREE.map(([sig, diag, act], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ padding: "9px 14px", background: "#FBF4F1", borderBottom: `1px solid ${LINE}` }}>
                      <span style={{ fontFamily: SANS, fontSize: 10.3, fontWeight: 700, color: RUST, letterSpacing: "0.05em" }}>TÍN HIỆU · </span>
                      <span style={{ fontSize: 13.8, fontWeight: 600 }}>{sig}</span>
                    </div>
                    <div style={{ padding: "10px 14px" }}>
                      <div style={{ fontSize: 13.4, lineHeight: 1.55, marginBottom: 6 }}>
                        <span style={{ fontFamily: SANS, fontSize: 10.3, fontWeight: 700, color: ACCENT, letterSpacing: "0.05em" }}>CHẨN ĐOÁN · </span>{diag}
                      </div>
                      <div style={{ background: "#F2F5F2", borderLeft: `2px solid ${GREEN}`, borderRadius: "0 4px 4px 0", padding: "8px 12px", fontSize: 13.5, lineHeight: 1.6 }}>
                        <span style={{ fontFamily: SANS, fontSize: 10.3, fontWeight: 700, color: GREEN, letterSpacing: "0.05em" }}>CAN THIỆP · </span>{act}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Ca có chú giải — đọc như một buổi supervision</Eyebrow>
              <p style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, margin: "0 0 10px", lineHeight: 1.55 }}>
                Cùng một tình huống, hai cách xử lý. Phần chú giải là thứ đang chạy trong đầu người thành thạo — quan trọng hơn câu chữ họ nói.
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                {CASES.map((c) => {
                  const open = openCase === c.id;
                  return (
                    <div key={c.id} style={{ border: `1px solid ${open ? "#5B4C74" : LINE}`, borderRadius: 5, overflow: "hidden", background: CARD }}>
                      <button onClick={() => setOpenCase(open ? null : c.id)}
                        style={{ width: "100%", textAlign: "left", cursor: "pointer", border: "none", background: open ? "#F3F0F7" : CARD, padding: "12px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <span style={{ fontSize: 15.4, fontWeight: 600 }}>{c.name}</span>
                        <span style={{ fontFamily: SANS, fontSize: 16, color: "#5B4C74" }}>{open ? "−" : "+"}</span>
                      </button>
                      {open && (
                        <div style={{ padding: "10px 15px 16px" }}>
                          <div style={{ fontFamily: SANS, fontSize: 12.9, lineHeight: 1.6, color: "#4C5157", fontStyle: "italic", marginBottom: 12 }}>{c.setup}</div>
                          <div style={{ background: "#FBEEEA", border: "1px solid #EAD2C7", borderRadius: 4, padding: "10px 13px", marginBottom: 6 }}>
                            <Eyebrow color={RUST}>Cách xử lý yếu</Eyebrow>
                            <div style={{ fontSize: 13.8, lineHeight: 1.6 }}>{c.weak}</div>
                          </div>
                          <div style={{ fontFamily: SANS, fontSize: 12.7, lineHeight: 1.6, color: "#8A4838", paddingLeft: 12, borderLeft: "2px solid #EAD2C7", marginBottom: 14 }}>
                            <b>Vì sao hỏng: </b>{c.weakWhy}
                          </div>
                          <div style={{ background: "#F2F5F2", border: "1px solid #D6E2DA", borderRadius: 4, padding: "10px 13px", marginBottom: 6 }}>
                            <Eyebrow color={GREEN}>Cách xử lý thành thạo</Eyebrow>
                            <div style={{ fontSize: 13.8, lineHeight: 1.62 }}>{c.strong}</div>
                          </div>
                          <div style={{ fontFamily: SANS, fontSize: 12.7, lineHeight: 1.62, color: "#2E5A44", paddingLeft: 12, borderLeft: "2px solid #D6E2DA", marginBottom: 10 }}>
                            <b>Chú giải tầng sâu: </b>{c.strongWhy}
                          </div>
                          <div style={{ fontFamily: SANS, fontSize: 11.8, color: MUTE }}>Đơn vị liên quan: {c.units}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <Eyebrow>Bài tập hiệu chỉnh — rèn độ phân giải, không rèn hành vi</Eyebrow>
              <p style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, margin: "0 0 10px", lineHeight: 1.55 }}>
                Điều phân biệt người thành thạo: họ ‘nhìn thấy’ tình huống ở độ phân giải cao hơn (Ericsson gọi là biểu tượng tinh thần). Các bài này rèn thứ đó.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {CALIB.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, background: CARD, padding: "11px 14px" }}>
                    <div style={{ fontSize: 14.4, fontWeight: 600, marginBottom: 3 }}>{h}</div>
                    <div style={{ fontFamily: SANS, fontSize: 13.3, lineHeight: 1.62, color: "#3D4249" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== 6 · MEASURE ========== */}
        {tab === "measure" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div>
              <Eyebrow>Rubric hành vi — năm nấc, áp cho mọi đơn vị</Eyebrow>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: MUTE, margin: "0 0 10px", lineHeight: 1.55 }}>
                Chấm theo mô tả hành vi quan sát được, không theo cảm giác. Dùng chung cho tự chấm và phản hồi 360.
              </p>
              <div style={{ display: "grid", gap: 7 }}>
                {RUBRIC.map(([lvl, desc, col], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden", background: CARD }}>
                    <div style={{ background: col, color: "#fff", fontFamily: SANS, fontSize: 12.3, fontWeight: 700, padding: "10px 14px", display: "flex", alignItems: "center", minWidth: 112 }}>{i + 1} · {lvl}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.55, padding: "10px 14px 10px 0", alignSelf: "center" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Nguyên tắc đo lường</Eyebrow>
              <div style={{ display: "grid", gap: 9 }}>
                {MEASURE.map(([h, d], i) => (
                  <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: "11px 14px", background: CARD }}>
                    <div style={{ fontSize: 14.7, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                    <div style={{ fontFamily: SANS, fontSize: 13.3, lineHeight: 1.6, color: "#3D4249" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow color={RUST}>Chế độ hỏng của cả hành trình — phân theo trình độ</Eyebrow>
              <p style={{ fontFamily: SANS, fontSize: 12.6, color: MUTE, margin: "0 0 10px", lineHeight: 1.55 }}>
                Mỗi đơn vị đã có chế độ hỏng riêng. Đây là những thất bại ở cấp toàn bộ hành trình — và chúng khác nhau tuỳ bạn đang ở đâu.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {FAILMODES.map(([lvl, h, d], i) => {
                  const c = lvl.startsWith("Cấp 1") ? "#B0483F" : lvl.startsWith("Cấp 2") ? "#B07A2E" : "#5B4C74";
                  return (
                    <div key={i} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${c}`, background: CARD, borderRadius: 4, padding: "11px 14px" }}>
                      <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: c, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 3 }}>{lvl}</div>
                      <div style={{ fontSize: 14.4, fontWeight: 600, marginBottom: 2 }}>{h}</div>
                      <div style={{ fontFamily: SANS, fontSize: 13.2, lineHeight: 1.6, color: "#3D4249" }}>{d}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: "#EEF2F0", border: `1px solid ${LINE}`, borderRadius: 5, padding: "17px 20px" }}>
              <Eyebrow color={GREEN}>Kết — ba việc lặp lại suốt đời</Eyebrow>
              <div style={{ fontSize: 14.4, lineHeight: 1.75 }}>
                Toàn bộ sổ tay này quy về ba việc, làm đi làm lại:
                <br /><br />
                <b>Điều hoà.</b> Giữ được mình trong cửa sổ chịu đựng. Không có điều này thì không có gì cả — và bạn không thể dẫn ai tới trạng thái bình tĩnh mà bạn không đang ở đó.
                <br /><br />
                <b>Reps và phản hồi.</b> Luyện có chủ đích ở rìa vùng thoải mái, với một vòng phản hồi bạn tự thiết kế. Không có cách nào khác. Kiến thức không chuyển hoá thành kỹ năng, chỉ có thực hành mới làm được.
                <br /><br />
                <b>Liêm chính.</b> Kỹ thuật phục vụ sự quan tâm thật đến con người. Bài kiểm tra duy nhất: <i>nếu họ biết chính xác bạn đang làm gì và vì sao, họ có còn thấy ổn không?</i> Nếu không, đó không phải kỹ năng cao cấp. Đó là thao túng.
                <br /><br />
                Thiếu bất kỳ chân nào, hệ thống sụp.
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ fontFamily: SANS, fontSize: 11.4, color: MUTE, lineHeight: 1.7, borderTop: `1px solid ${LINE}`, paddingTop: 16, marginTop: 30 }}>
          <b>Nguồn nền:</b> Porges (polyvagal) · Siegel (window of tolerance) · Barrett (emotional granularity) · Gross (điều tiết cảm xúc) · Neff, Kernis, Crocker (self-worth) · Bowen, Friedman (differentiation) · Kegan &amp; Lahey (immunity to change) · Rogers (empathic listening) · Singer, Zaki (empathy types) · Johnstone (status) · Fiske &amp; Cuddy (warmth × competence) · Goffman (impression management) · Minto (Pyramid) · Kahneman &amp; Tversky (framing) · Scott (Radical Candor) · Patterson (Crucial Conversations) · Stone &amp; Heen (Difficult Conversations) · Rosenberg (NVC) · Watzlawick (systemic communication) · Argyris (ladder of inference) · Karpman, Emerald (drama triangle, TED) · Cialdini (influence, pre-suasion) · Fisher &amp; Ury, Voss (negotiation) · Edmondson (psychological safety) · Cabane (charisma) · Meyer, Hall, Ting-Toomey, Markus &amp; Kitayama (culture) · Ericsson (deliberate practice) · Bandura (self-efficacy).
          <br /><br />
          <i>Diễn giải theo tinh thần nguyên tác. Tài liệu giáo dục để tự luyện; không thay thế trị liệu chuyên môn.</i>
        </div>
      </div>
    </div>
  );
}
