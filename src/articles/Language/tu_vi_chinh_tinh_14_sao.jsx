import React, { useState, useRef, useEffect } from "react";

/* ---------------------------------------------------------------
   TOKENS (đồng bộ phong cách với BestPracticesGuide.jsx / ChunkAtlas_EN.jsx)
--------------------------------------------------------------- */
const INK = "#23231E";
const PAPER = "#F7F6F2";
const PANEL = "#FBFAF6";
const RULE = "#E4E1D8";
const MUTED = "#6B6558";
const ACCENT = "#6B4FA0";
const HAN_COLOR = "#B3261E";
const PINYIN_COLOR = "#1F7A5C";

const SECTIONS = [
  { label: "Phương pháp luận", body: `# PHƯƠNG PHÁP LUẬN ĐỌC LÁ SỐ TỬ VI ĐẨU SỐ
*(Chương mở đầu — nên đọc trước khi tra cứu chi tiết 14 chính tinh)*

## I. Tổng quan

Tử Vi Đẩu Số (紫微斗數 — *zǐwēi dǒushù*) dựa trên nguyên lý "Thiên Nhân hợp nhất" (天人合一 — *tiānrén héyī*). Các sao là ký hiệu biểu tượng (象徵符號 — *xiàngzhēng fúhào*), không phải thiên thể vật lý — nguyên tắc "hư tinh hư dụng" (虛星虛用 — *xūxīng xūyòng*): mượn tên thiên văn cổ nhưng xây dựng hệ thống ký hiệu riêng, không còn ràng buộc bầu trời thật.

Nguồn gốc: đạo sĩ Trần Đoàn (陳摶, tự Đồ Nam) đời Bắc Tống. Hai trường phái: Nam phái (lấy tam hợp Mệnh-Tài-Quan làm gốc, dùng Thái Tuế/thần sát luận theo năm) và Bắc phái (tinh giản 18 sao, coi trọng Tứ Hóa và "phi tinh").

**Nguyên tắc tối quan trọng:** đọc theo "tạo mệnh luận" (造命論 — *zàomìng lùn*), không phải "túc mệnh luận" (宿命論 — *sùmìng lùn*). Lá số cho biết khuynh hướng/tiềm năng, không phải định mệnh cố định.

## II. Ba khái niệm nền tảng

### 1. Đồng cung > Đối cung > Tam hợp > Giáp cung
- Đồng cung (同宮 — *tónggōng*): ảnh hưởng trực tiếp, mạnh nhất
- Đối cung/Xung chiếu (對宮 — *duìgōng*): mạnh thứ nhì; bắt buộc dùng khi cung là Vô Chính Diệu (無正曜 — *wú zhèngyào* - "mượn sao đối cung" 借對宮星曜 — *jiè duìgōng xīngyào*)
- Tam hợp/Hội chiếu (三合 — *sānhé*/會照 — *huìzhào*): ảnh hưởng từ môi trường bên ngoài
- Giáp cung (夾宮 — *jiágōng*): áp lực/hậu thuẫn ngầm (暗的影響 — *àn de yǐngxiǎng*) — như "Tài Ấm giáp Ấn" của Thiên Tướng

### 2. Tam Phương Tứ Chính (三方四正 — *sānfāng sìzhèng*) — khung bắt buộc mọi cung
- Tam phương: bản cung + 2 cung tam hợp
- Tứ chính: tam phương + đối cung
- Với Mệnh: Tam Phương Tứ Chính = Mệnh + Tài Bạch + Quan Lộc + Thiên Di (cố định, không đổi theo địa chi Mệnh nằm ở đâu)
- Logic triết học: nội lực (Mệnh) → hành động xã hội (Quan Lộc) → giá trị vật chất tạo ra (Tài Bạch) → hình ảnh phản chiếu ra ngoài (Thiên Di) — vòng khép kín, thiếu 1 góc là khuyết bức tranh

### 3. Miếu – Vượng – Đắc/Lợi/Bình – Hãm
Thang 7 bậc (Toàn Thư): Miếu > Vượng > Đắc Địa > Lợi Ích > Bình Hòa > Bất Đắc Địa > Hãm. Nam phái rút gọn 6 bậc.
Lưu ý cốt lõi: đây là thang đo CƯỜNG ĐỘ NĂNG LƯỢNG, không phải tốt/xấu tuyệt đối. Cát tinh hãm → tiềm năng khó phát huy, dễ lệch tiêu cực. Sát tinh miếu → hung tính vẫn còn, chỉ được chế ngự phần nào.

## III. Sáu bước đọc lá số

### Bước 1 — Định vị Mệnh–Thân
Mệnh cung: đếm từ Dần theo tháng sinh âm lịch + điều chỉnh giờ sinh (đòi hỏi giờ sinh chính xác cao hơn Bát Tự).
Thân cung: LUÔN trùng 1 trong 6 cung — Mệnh, Phu Thê, Tài Bạch, Thiên Di, Quan Lộc, Phúc Đức (không bao giờ rơi vào 6 cung còn lại). Ý nghĩa từng vị trí Thân quyết định "trọng tâm hậu vận dịch chuyển về đâu".
Tổ hợp lý tưởng: "nhất cương nhất nhu" (一剛一柔 — *yī gāng yī róu*) giữa Mệnh-Thân.

### Bước 2 — Xác định nhóm hành vi tại Mệnh
- Sát Phá Liêm Tham (殺破廉貪 — *shā pò lián tān*): nhanh-cứng-sớm-ẩn (快剛早陰 — *kuài gāng zǎo yīn*) — khai phá biến động; nên tránh việc lặp lại tù túng
- Cơ Nguyệt Đồng Lương (機月同梁 — *jī yuè tóng liáng*): chậm-mềm-muộn-hiện (慢柔晚陽 — *màn róu wǎn yáng*) — ổn định tham mưu; "忌煞也善三分 — *jì shà yě shàn sān fēn*" dù gặp sát vẫn giữ 3 phần thiện; hợp môi trường có hệ thống/quy trình
- Tử Phủ Liêm Vũ Tướng (紫府廉武相 — *zǐ fǔ lián wǔ xiàng*): quản lý tài nguyên, quyền lực; giỏi vận hành/duy trì hệ thống có sẵn hơn là khởi xướng

QUAN TRỌNG: Thái Dương, Thái Âm KHÔNG thuộc nhóm nào trong 3 nhóm này — vì đây là phân loại "Cách Cục hành vi" (格局 — *géjú*) khác với phân loại "Tinh Hệ" (星系, theo thuật toán an sao: Tử Vi tinh hệ 6 sao gồm cả Thái Dương; Thiên Phủ tinh hệ 8 sao gồm cả Thái Âm). Thái Dương/Thái Âm là "Trung Thiên tinh" (中天星 — *zhōngtiān xīng*) vì bản chất cốt lõi của chúng DAO ĐỘNG theo điều kiện bên ngoài (ngày/đêm sinh, miếu/hãm theo địa chi) — khác 12 sao kia có tính cách tương đối cố định bất kể hoàn cảnh.

### Bước 3 — Phân tích Tam Phương Tứ Chính
Quy trình: (1) liệt kê toàn bộ sao tại cả 4 cung, (2) đếm tỷ lệ cát/hung — "độ sạch cách cục" (格局清濁 — *géjú qīngzhuó*), (3) đối chiếu cách cục có tên riêng, (4) nếu không khớp cách cục cụ thể, luận theo nguyên tắc tổng quát tỷ lệ cát/hung.

### Bước 4 — Tứ Hóa 3 tầng
- Sinh niên Tứ Hóa (生年四化 — *shēngnián sìhuà*): xu hướng cốt lõi cả đời
- Đại vận Tứ Hóa (大限四化 — *dàxiàn sìhuà*): trọng tâm biến động 10 năm
- Lưu niên Tứ Hóa (流年四化 — *liúnián sìhuà*): sự kiện thiết thân trong năm
Ẩn dụ: nền đất (lá số gốc) → công trình (Đại Vận) → cánh cửa mở ra (Lưu Niên).
Nguyên tắc "Trùng điệp" (疊併 - diébìng): Hóa Kỵ 3 tầng cùng rơi vào 1 cung/cung xung chiếu nhau → biến cố lớn, bước ngoặt.

### Bước 5 — Nhận diện cách cục
Luôn kiểm tra điều kiện "phá cách" (破格 — *pògé*) song song: gặp Địa Không/Địa Kiếp tại vị trí tạo cách, Hóa Kỵ vào đúng sao chủ đạo, hoặc quá nhiều sát tinh vô chế áp đảo.

### Bước 6 — Tổng hợp theo lĩnh vực
- Tính cách: Mệnh chủ tinh + Tứ Hóa tại Mệnh + vị trí Thân
- Sự nghiệp: Quan Lộc chủ tinh + cách cục lớn tại Mệnh + sao chủ Quan Lộc
- Tài vận: Tài Bạch (kiếm) + Phúc Đức (giữ/tiêu) + Điền Trạch (tích lũy) — KHÔNG được gộp chung 3 cung này
- Tình cảm: Phu Thê chủ tinh + Thái Tuế nhập cung đối phương

## IV. Năm nguyên tắc phán đoán nâng cao

**1. Sao chủ cung (宮位主星系統 — *gōngwèi zhǔxīng xìtǒng*):** mỗi cung có "sao chủ" cố định bất kể lá số — Huynh Đệ=Thiên Cơ, Tài Bạch=Vũ Khúc, Điền Trạch=Thái Âm, Phúc Đức/Tật Ách=Thiên Đồng, Giao Hữu=Cự Môn, Quan Lộc=Liêm Trinh/Vũ Khúc, Phụ Mẫu=Thái Dương... — cần xem cả vị trí/cát hung của sao chủ cung này ở nơi khác trong lá số để điều chỉnh then chốt (關鍵性修正 — *guānjiànxìng xiūzhèng*). Lưu ý: bảng này có dị biệt nhỏ giữa các phái.

**2. Thái Tuế nhập cung (太歲入宮法 — *tàisuì rùgōng fǎ*):** luận quan hệ với người cụ thể phải kết hợp thêm cung ứng với Chi năm sinh (Thái Tuế) của ĐỐI PHƯƠNG trên chính lá số của MÌNH.

**3. Vô Chính Diệu:** cung không chính tinh luôn "yếu" (弱 — *ruò*), phải mượn đối cung nhưng lực nhẹ hơn tọa thủ trực tiếp.

**4. Sát tinh hữu chế (煞星有制 — *shàxīng yǒu zhì*):** Kình Đà Hỏa Linh không mặc định xấu — gặp cát tinh/cát hóa hoặc chính tinh miếu vượng kiềm chế thì hung tính giảm, có thể thành động lực đặc biệt (Hỏa Tham, Mã đầu đới tiễn). Vô chế thì hung tính bộc lộ tối đa.

**5. Tổng thể cách cục ưu tiên:** không kết luận từ 1 cung/1 sao đơn lẻ — luôn cần phối hợp Tam Phương Tứ Chính và tỷ lệ cát/hung tổng thể.

## V. Sáu lỗi phổ biến nhất

**1. Nhầm lẫn tên cung:** "Nô Bộc cung" (奴僕宮 - quan hệ cấp trên/dưới, chủ/nhân viên) bị gọi nhầm "Giao Hữu cung" rồi hiểu lầm bao gồm cả bạn bè ngang hàng (thực ra gần Huynh Đệ cung mở rộng hơn). "Cung tướng mạo" gán cho Phụ Mẫu cung là thêm thắt vô căn cứ — Phụ Mẫu cung chỉ phản ánh cảm nhận chủ quan về quan hệ tình cảm, không đoán ngoại hình.

**2. Hiểu sai chức năng cung:** Tật Ách cung = "nền tảng thể chất tổng quát", KHÔNG phải bản đồ chẩn đoán bệnh cụ thể (12 cung không thể mã hóa hàng ngàn loại bệnh). Quan Lộc cung = thái độ/phong cách làm việc, KHÔNG trực tiếp chỉ ra nghề nghiệp cụ thể.

**3. Chỉ nhìn một sao đơn lẻ:** VD sai "Mệnh có Thiên Đồng → chắc chắn lười" — cần xem đồng cung sao gì, có Hóa Quyền không, có Mã đầu đới tiễn không, Đại Vận hiện tại ra sao.

**4. Diễn giải quá mức sát tinh:** cùng Kình Dương nhưng với Thiên Đồng/Thái Âm tại Ngọ (đủ điều kiện năm sinh) → Mã đầu đới tiễn (cát); với Cự Môn hãm không Thái Dương giải ám → hung. Kết quả trái ngược tùy chính tinh đi cùng.

**5. Bỏ qua yếu tố thời gian:** lá số gốc = kịch bản đã viết (劇本 — *jùběn*); Đại Vận/Lưu Niên = đang chiếu cảnh nào (演到哪一幕 — *yǎn dào nǎ yī mù*). Chỉ đọc kịch bản mà không biết đang ở cảnh nào thì không dự đoán được hiện tại.

**6. Tư duy định mệnh cứng nhắc:** VD 2 người cùng Cự Môn Hóa Kỵ tại Mệnh (dễ khẩu nghiệp) — một chọn bán hàng (liên tục xung đột), một học luật (thành luật sư giỏi tranh biện). Cùng khuynh hướng bẩm sinh, khác cách vận dụng hậu thiên → kết quả đối lập.

## VI. Tâm pháp tổng kết (5 nguyên tắc thứ tự tư duy)

1. **Từ tổng thể đến cục bộ** — tránh "kiến thụ bất kiến lâm" (見樹不見林 - thấy cây không thấy rừng)
2. **Từ tĩnh đến động** — lá số gốc trước, Đại Vận/Lưu Niên sau
3. **Từ chính đến phụ** — 14 chính tinh quyết định khung ~70-80%, phụ tinh chỉ tinh chỉnh
4. **Từ trong ra ngoài** — hiểu lõi (Mệnh) trước khi mở rộng vành ngoài
5. **Khách quan trung lập** — cát hung đan xen là trạng thái bình thường; mục tiêu là giúp người xem nhận diện khuynh hướng để chủ động điều chỉnh, không phải phán quyết số phận đóng đinh` },
  { label: "Thái Dương", body: `# Thái Dương (太陽 — *tài yáng* — the Sun)

## Từ vựng

| Từ vựng | Chữ Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Thái Dương | 太陽 | tài yáng | **Thái** (to lớn) + **Dương** (khí dương) → "vầng dương tối thượng" | the Sun |
| Khai lãng | 開朗 | kāilǎng | **Khai** (mở ra) + **Lãng** (sáng sủa) → mở ra sự sáng sủa | cheerful, open |
| Nhiệt tình | 熱情 | rèqíng | **Nhiệt** (nóng, sôi nổi) + **Tình** (tình cảm) → tình cảm nồng ấm | warm, enthusiastic |
| Hào sảng | 豪爽 | háoshuǎng | **Hào** (phóng khoáng) + **Sảng** (dứt khoát) → phóng khoáng, thẳng thắn | forthright, generous |
| Tự phụ | 自負 | zìfù | **Tự** (bản thân) + **Phụ** (tự cho mình gánh) → tự đề cao mình quá mức | conceited |
| Hiếu diện tử | 好面子 | hào miànzi | **Hiếu** (ham thích) + **Diện** (thể diện) + **Tử** (hậu tố) → ham giữ thể diện | vain, face-conscious |
| Hoạt bát | 活潑 | huópō | **Hoạt** (sống động) + **Bát** (mạnh mẽ) → tràn đầy sức sống | lively, energetic |
| Hữu tài cán | 有才幹 | yǒu cáigàn | **Hữu** (có) + **Tài** + **Cán** (năng lực xử lý việc) → có năng lực thực tế | capable |
| Chuyên chế | 專制 | zhuānzhì | **Chuyên** (độc chiếm) + **Chế** (kiểm soát) → độc chiếm quyền kiểm soát | domineering |
| Tài hoa | 才華 | cáihuá | **Tài** + **Hoa** (rực rỡ) → tài năng biểu lộ rực rỡ | talented |
| Quả quyết | 果決 | guǒjué | **Quả** (dứt khoát) + **Quyết** (quyết định) → quyết định dứt khoát | decisive |
| Trực suất | 直率 | zhíshuài | **Trực** (thẳng) + **Suất** (theo bản chất tự nhiên) → thẳng theo bản chất | straightforward |
| Cao độ cạnh tranh tính | 高度競爭性 | gāodù jìngzhēngxìng | mức độ ganh đua cao | highly competitive |
| Hưng vượng | 興旺 | xīngwàng | **Hưng** (khởi phát) + **Vượng** (thịnh) → khởi phát thịnh vượng | thriving |
| Tích cực | 積極 | jījí | **Tích** (dồn góp) + **Cực** (tột cùng) → dồn sức tột cùng | proactive |
| Lạc quan | 樂觀 | lèguān | **Lạc** (vui) + **Quan** (nhìn nhận) → nhìn nhận theo hướng vui vẻ | optimistic |
| Hạnh phúc mỹ mãn | 幸福美滿 | xìngfú měimǎn | may mắn, phúc lành, đẹp đẽ trọn vẹn | happily fulfilling |
| Thân cận | 親近 | qīnjìn | **Thân** (gần tình cảm) + **Cận** (gần khoảng cách) | close-knit |

## 1. Bản chất

**Thái Dương** (太陽 — *tài yáng* — Hán Việt: Thái = to lớn/tối thượng, Dương = khí dương, đối lập với Âm 陰 — *yīn* *yīn* — tiếng Anh: **the Sun**)

- Ngũ hành: Dương Hỏa (陽火 — *yáng huǒ*)
- Hóa khí (化氣 — *huàqì* — "khí mà sao này biến hóa ra") viết là **"Quý"** (貴 — *guì* — cao quý, quyền quý — tiếng Anh: **nobility/status**)
- Thuộc nhóm: **Trung Thiên đẩu chủ tinh** (中天斗主星 — sao chủ của tầng trời giữa), là **Quan Lộc chủ** (官祿主 — *guānlù zhǔ* — sao chủ quản công danh, sự nghiệp). Thái Dương chủ về "quý" (danh vọng, địa vị) chứ không chủ về "phú" (tiền của).
- Đối tinh tự nhiên: **Thái Âm** (太陰 — *tài yīn* — Mặt Trăng)
- Điển tích: trong Phong Thần Bảng (封神榜 — *fēngshén bǎng*), Thái Dương được gán cho **Tỷ Can** (比干 — *bǐ gān*), trung thần bị moi tim vì can gián — nên ngoài quang minh, bác ái, Thái Dương còn mang dư vị "trung nghĩa mà chịu thiệt", dễ vướng thị phi/kiện tụng khi phối sát tinh.
- Đại diện nhân sự: nam mệnh → cha, con trai; nữ mệnh → cha, chồng (夫星 — *fūxīng*), con trai.
- Đặc tính riêng: độ sáng (miếu 廟 *miào* / hãm 陷 *xiàn*) biến đổi theo giờ sinh — miếu tại Mão, Thìn, Tị, Ngọ; hãm (thất huy 失輝 — *shīhuī*) tại Tuất, Hợi, Tý, Sửu.


Trong vũ trụ luận Đạo giáo cổ, Thái Dương gắn với tín ngưỡng Nhật Thần (日神信仰 — *rì shén xìnyǎng*) — vầng sáng duy nhất tự phát quang thay vì phản chiếu như Thái Âm. Về mặt biểu tượng, đây là lý do Thái Dương luôn được xếp vào nhóm "Trung Thiên tinh" tách biệt: nó không thuộc về một hệ thống hành vi cố định (Sát Phá Liêm Tham hay Cơ Nguyệt Đồng Lương) mà là một trục đối lập Âm-Dương độc lập, xuyên suốt cả 12 cung theo cặp tam hợp/xung chiếu với Thái Âm. Bản chất "quý bất phú" của Thái Dương — chủ danh vọng chứ không chủ tiền của — cũng phản ánh đúng vai trò của mặt trời trong văn hóa nông nghiệp cổ: nguồn sáng nuôi dưỡng vạn vật nhưng tự thân không tích trữ gì cho riêng mình.
### Nguyên lý nền khi luận Thái Dương
1. **Miếu/Hãm quyết định "lượng" chứ không đổi "chất"**: dù miếu hay hãm, bản chất chủ động — cống hiến của Thái Dương không đổi; cái đổi là mức độ được ghi nhận, đền đáp.
2. **Đọc theo Tam Phương Tứ Chính** (三方四正 — *sān fāng sì zhèng*): luôn xem thêm đối cung và hai cung tam hợp.
3. Hai cách cục kinh điển: **"Nhật Nguyệt tịnh minh"** (日月並明 — Nhật Nguyệt đều miếu, đồng hội) = phú quý song toàn; **"Nhật Nguyệt phản bối"** (日月反背 — cả hai hãm) = vất vả, công không tương xứng.


- Cơ chế lục thân mở rộng: gốc Bát Quái (Càn=cha/Khôn=mẹ); Thái Dương là "quan sát viên" cho mọi quan hệ nam giới mở rộng (cấp trên, khách hàng nam).
- "Nhật Nguyệt phản bối" chi tiết: cả 2 sao hãm → cần "gấp đôi nỗ lực" (加倍努力 — *jiābèi nǔlì*), không nản lòng (灰心 — *huīxīn*), cần kiên trì (堅持 — *jiānchí*).
- Phân biệt "Quý" (貴 — *guì* - địa vị chính thức) vs "Danh" (名 - tiếng tăm nói chung, rộng hơn) — Thái Dương hợp hệ thống có cấp bậc rõ ràng hơn con đường tự do.
### Tứ Hóa (四化 — *sìhuà*) của Thái Dương
- **Hóa Lộc** (năm Canh 庚 — *gēng*)
- **Hóa Quyền** (năm Tân 辛 — *xīn*)
- **Hóa Kỵ** (năm Giáp 甲 — *jiǎ*)
- (Không có Hóa Khoa trong hệ thống truyền thống)

---

## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thái Dương thủ Mệnh tại Mão hình thành cách **"Nhật xuất Phù Tang"** (日出扶桑 — *rì chū fú sāng*) — khởi đầu rực rỡ, thành danh sớm (đặc biệt nam mệnh sinh ban ngày). Tại Ngọ hình thành **"Nhật lệ trung thiên"** (日麗中天 — *rì lì zhōngtiān*) — vượng khí nhất, đại phú đại quý, nhưng cần Tứ Hóa/Tả Hữu/Xương Khúc hội hợp mới trọn vẹn, nếu không dễ "hữu danh vô thực" (有名無實 — *yǒumíng wúshí*).

Cơ chế tâm lý: Thái Dương là sao duy nhất trong 14 chính tinh mang tính "cho đi" thuần túy (khác Thiên Lương thiên về "phù trợ, đỡ đần"; Thái Dương thiên về "chiếu rọi, dẫn dắt"). Người Mệnh Thái Dương vô thức tìm vai trò trung tâm vì bản năng cần "có việc để tỏa nhiệt" — Thái Dương hãm mà không có việc để làm thường trầm uất nhanh hơn các sao khác.

Đồng cung Cự Môn (Dần/Thân — cách "Dương Cự"): khẩu tài xuất sắc, hợp luật sư/giáo dục/truyền thông, dễ thị phi. Đồng cung Thiên Lương (Mão/Dậu — cách "Dương Lương"), gặp Xương Khúc Lộc Tồn → "Dương Lương Xương Lộc" — quý hiển học thuật.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Anh chị em có xu hướng là người dẫn đầu trong quan hệ xã hội của chính họ — hữu ích làm cầu nối (牽線 — *qiānxiàn*) nhưng tình ruột thịt không đậm đà bằng các sao chủ tình cảm.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Phối ngẫu chính họ mang bản chất Thái Dương — chủ động, có sự nghiệp riêng. Nam dễ cưới vợ sự nghiệp nổi bật; cần đủ rộng lượng (寬宏 — *kuānhóng*) để không mặc cảm. Nữ mệnh Thái Dương hãm tại Phu Thê là tổ hợp cần lưu ý nhất — nên kết hôn muộn hoặc chọn đối tác đủ tự tin để không cạnh tranh ngầm.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cái hoạt bát, hướng ngoại; cha mẹ có phong cách giáo dục "mở", ít kiểm soát chi tiết — tốt cho con hướng ngoại nhưng có thể khiến trẻ nhạy cảm cảm thấy thiếu quan tâm sát sao.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tài vận luôn đi kèm danh tiếng — tiền đến từ việc được biết đến/tin tưởng, không phải tài lộc âm thầm kiểu Vũ Khúc/Thiên Phủ. Dòng tiền ra vào nhanh (財來財去 — *cái lái cái qù*) nếu gặp Địa Không Địa Kiếp vì thích phô trương.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Chủ về đầu, mắt, hệ tuần hoàn (Hỏa vượng → khí bốc lên trên). Đây là suy luận biểu tượng học truyền thống, không phải chẩn đoán y khoa — chỉ nên xem là gợi ý lưu tâm, không thay thế thăm khám thực tế.

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Đối cung của Mệnh → Mệnh Vô Chính Diệu, phải "mượn" ánh sáng từ môi trường ngoài để định hình bản thân. Dễ tỏa sáng khi ra ngoài, gặp quý nhân hơn ở nhà; nhưng nội tâm thiếu trục quy chiếu chắc chắn, thường "biết mình là ai" qua phản hồi từ bên ngoài.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Vòng bạn bè/đồng nghiệp có địa vị cao hoặc phong cách hào phóng (海派 — *hǎipài*). Thái Dương thường "cho đi" nhiều hơn nhận trong tình bạn — dễ đứng ra chi trả, tổ chức — nên dễ ảnh hưởng tài chính cá nhân nếu không tiết chế.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Cung đắc vị nhất vì trùng vai trò gốc Quan Lộc chủ. Miếu vượng tại Ngọ độc tọa: có thể "lãnh đạo quần luân" (領導群倫 — *lǐngdǎo qúnlún*). Hợp: chính trị, ngoại giao, giáo dục, truyền thông, luật, năng lượng.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Điền Trạch là "kho chứa" còn Thái Dương bản chất "phát tán" — xung khắc nhẹ, giải thích mẫu hình tổ nghiệp ban đầu hưng vượng nhưng dễ hao tán về sau; cần chủ động vun đắp thêm.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Hạnh phúc gắn với được hoạt động/cống hiến, không phải nghỉ ngơi tĩnh tại — "an nhàn trong bận rộn". Nữ mệnh Thái Dương miếu vượng tại đây là một trong những cách cục đời sống nội tâm viên mãn nhất trong 14 chính tinh.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Ý nghĩa nhân đôi vì Thái Dương vốn là "phụ tinh". Miếu vượng: quan hệ cha con thân cận (親近 — *qīnjìn*), cha có uy tín xã hội. Hãm/Hóa Kỵ: duyên cha mỏng, khoảng cách thế hệ, cha vắng nhà nhiều vì công việc.

---

## 3. Tứ Hóa theo 12 cung

| Cung | Hóa Lộc (Canh) | Hóa Quyền (Tân) | Hóa Kỵ (Giáp) |
|---|---|---|---|
| Mệnh | Cách "ông chủ", giỏi quản trị | Cương quyết, khởi nghiệp, nhưng cố chấp | Lao lục, đa sự, nóng tính, mất lòng người |
| Huynh Đệ | Hợp tác với anh em thì không nắm thực quyền | Anh em thích nổi bật, dẫn đầu | Anh em tổn hại/nợ nần, không ứng chị em gái |
| Phu Thê | Nam được vợ trợ giúp sự nghiệp; nữ dễ thành "bà chủ" | Phối ngẫu nắm quyền; nam cần tránh bất đồng ý kiến | Nữ bất lợi hôn nhân; nam cản trở khởi nghiệp |
| Tử Tức | Con cái hỗ trợ sự nghiệp cha mẹ | Con cái thành trợ thủ đắc lực | Vất vả vì con trai |
| Tài Bạch | Kiếm tiền lớn nhưng tiêu hào phóng, cần liệu cơm gắp mắm | Nam khởi nghiệp thuận lợi, phát triển nhanh | Nam bất lợi khởi nghiệp; nữ "phu tinh ảm đạm" |
| Tật Ách | Tâm địa quang minh, ít so đo | Không hợp cung này — dễ vấn đề vùng cổ | Nội tâm nóng nảy, chú ý huyết áp |
| Thiên Di | Chuộng hư danh, giỏi giao tế | Nam khởi nghiệp có thực quyền; nữ nhờ đối tác nam | Ở ngoài vất vả, xung Mệnh, dễ thị phi |
| Giao Hữu | "Cách ông chủ", làm thuê vẫn lên quản lý | Khí chất thủ lĩnh, hào phóng; nữ có chí như nam | Nam bất lợi khởi nghiệp, bị cấp trên nam gây khó |
| Quan Lộc | Thực quyền + lợi ích thiết thực | Quyết đoán, dễ cố chấp | Nam bất lợi sự nghiệp; nữ bị cấp trên nam gây khó |
| Điền Trạch | An gia trước, lập nghiệp sau; hợp Thái Âm đồng cung | Thích nhà đông khách | Nam chủ vất vả; chú ý ánh sáng nơi ở |
| Phúc Đức | Về già lạc quan, an ổn tinh thần | Về già ưa giao thiệp | Về già dễ nóng tính |
| Phụ Mẫu | Được cha/trưởng bối yêu thương, hưởng ân trạch | Cha có địa vị nhưng quản lý nghiêm | Duyên cha mỏng, trắc trở giấy tờ/học vấn |

---` },
  { label: "Thái Âm", body: `# THÁI ÂM (太陰 — tài yīn — the Moon)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Ôn hòa | 溫和 | wēnhé | **Ôn** (ấm áp) + **Hòa** (hòa nhã) → "ôn hòa, điềm đạm" | gentle, mild |
| Đào tị hiện thực | 逃避現實 | táobì xiànshí | **Đào** (chạy trốn) + **Tị** (né tránh) + **Hiện** (hiện tại) + **Thực** (thực tế) → "trốn tránh thực tại" | escapism |
| Nội hướng | 內向 | nèixiàng | **Nội** (bên trong) + **Hướng** (hướng về) → "hướng vào bên trong, sống nội tâm" | introverted |
| Luyện đạt thành thục | 練達成熟 | liàndá chéngshú | **Luyện** (rèn luyện) + **Đạt** (thông suốt) + **Thành** (trở thành) + **Thục** (chín muồi) → "từng trải, chín chắn" | mature |
| Thần kinh chất | 神經質 | shénjīngzhì | **Thần** (thần) + **Kinh** (mạch) + **Chất** (tính chất) → "tính khí nhạy cảm, dễ căng thẳng" | high-strung |
| Thanh tú | 清秀 | qīngxiù | **Thanh** (trong trẻo) + **Tú** (xinh đẹp) → "thanh tú, xinh đẹp nhẹ nhàng" | delicate, refined |
| Học vấn hơn người | 學問過人 | xuéwèn guòrén | **Học** (học tập) + **Vấn** (tri thức) + **Quá** (vượt) + **Nhân** (người) → "học vấn vượt trội hơn người" | exceptionally learned |

## 1. Bản chất
- Ngũ hành: Âm Thủy (陰水 — *yīn shuǐ*, Quý Thủy 癸水 — *guǐ shuǐ*)
- Hóa khí: "Phú" (富 — *fù* — giàu có, sung túc)
- Là Điền Trạch chủ (田宅主 — *tiánzhái zhǔ*)
- Đối tinh: Thái Dương
- Điển tích: Giả phu nhân (賈夫人 — *jiǎ fūrén*), vợ Hoàng Phi Hổ trong Phong Thần Bảng
- Đại diện: mẹ, vợ, con gái
- Miếu vượng: Dậu, Tuất, Hợi, Tý, Sửu (đêm); Hãm: Mão, Thìn, Tị, Ngọ, Mùi (ngày) — đối pha với Thái Dương


Nếu Thái Dương là "phát", Thái Âm là "thu" — cơ chế âm dương bổ sung này giải thích vì sao Thái Âm luôn được xét kèm giới tính và thời điểm sinh (ngày/đêm) theo hai trục độc lập, khác hẳn 12 chính tinh còn lại vốn có tính cách tương đối cố định bất kể hoàn cảnh. Vai trò Điền Trạch chủ của Thái Âm không phải ngẫu nhiên: trong tư duy nông nghiệp cổ, mặt trăng gắn với thủy triều, mùa vụ, chu kỳ tích lũy — một dạng "của cải chảy chậm nhưng bền", đối lập hẳn với "của cải đi kèm danh tiếng" của Thái Dương.
## Nguyên lý nền
Thái Âm vận hành ngược Thái Dương: thu vào, lắng đọng, nuôi dưỡng âm thầm — là sao duy trì tính liên tục của của cải qua thời gian, nên kiêm vai trò Điền Trạch chủ.


**"Nguyệt lãng thiên môn"** (月朗天門格 — *yuè lǎng tiānmén gé*): Thái Âm độc tọa Hợi — kéo theo "Nhật chiếu Lôi Môn" (Quan Lộc: Thái Dương+Thiên Lương tại Mão) và "Minh châu xuất hải" (Tài Bạch tại Mùi). Điều kiện tiên quyết: phải sinh BAN ĐÊM mới thực sự vượng, sinh ngày thì giảm cách dù cùng cung Hợi.

Cơ chế: Thái Âm là sao duy nhất mà cả GIỚI TÍNH người sinh và THỜI ĐIỂM sinh (ngày/đêm) cùng quyết định độ vượng theo 2 trục riêng biệt — nữ mệnh + sinh đêm = "vượng kép".

Liên hệ: "Nguyệt lãng thiên môn" (Hợi) là ảnh phản chiếu của "Nhật xuất Phù Tang" (Mão) của Thái Dương — khi xuất hiện cùng lúc trong tam hợp/xung chiếu chính là hiện thân của "Nhật Nguyệt tịnh minh".

- Cơ chế Điền Trạch chủ: Thủy "nhu mà thấm sâu" (柔而滲透 — *róu ér shèntòu*), tích tụ ở chỗ thấp (低處匯聚 — *dīchù huìjù*) — khác Hỏa bốc tỏa.
- "Thủy trừng quế ngạc" (水澄桂萼格 — *shuǐ chéng guì è gé*): Thái Âm+Thiên Đồng tại Tý, cát tinh hội — thiên về thanh khiết/học vấn (清秀 — *qīngxiù*，優雅 — *yōuyǎ*，學問過人 — *xuéwèn guòrén*) hơn phú quý vật chất.
- So sánh Thái Dương-Thái Âm về "chủ": chỉ là thiên hướng ưu tiên (傾向性優先 — *qīngxiàngxìng yōuxiān*), không phải giới hạn tuyệt đối.
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thái Âm thủ Mệnh cho dáng vẻ thanh tú, ôn hòa (溫和 — *wēnhé*), yêu cái đẹp và đời sống nội tâm phong phú. Cơ chế tâm lý đối lập hẳn Thái Dương: nếu Thái Dương tìm giá trị qua việc được nhìn thấy, Thái Âm tìm giá trị qua việc cảm nhận sâu — dễ dẫn tới "đào tị hiện thực" (逃避現實 — *táobì xiànshí* — escapism), tự làm tổn thương mình vì kỳ vọng lãng mạn hóa cuộc sống hơn là đối diện thực tế trần trụi. Nữ mệnh sinh đêm miếu vượng thường có đời sống nội tâm viên mãn nhất trong 14 chính tinh; nam mệnh cần bổ sung thêm chất "Dương" (Thái Dương/Vũ Khúc/Liêm Trinh hội chiếu) để tránh nhu nhược quá mức.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Anh chị em duyên sâu đậm, quan hệ mang tính chăm sóc, dễ có người theo đuổi văn chương/nghệ thuật/thẩm mỹ — phản chiếu đúng bản chất "thu, dưỡng" của Thái Âm. Nếu miếu vượng, đây là nguồn hỗ trợ tinh thần bền bỉ hơn là hỗ trợ vật chất trực tiếp.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Đây là vị trí đắc ý hơn hẳn so với Thái Dương cùng cách: phối ngẫu nội hướng (內向 — *nèixiàng*), dịu dàng, đời sống hôn nhân thiên về chiều sâu cảm xúc. Nam mệnh Thái Âm tại Phu Thê thường được vợ chăm sóc chu đáo; nữ mệnh dễ tìm được người chồng tinh tế, biết lắng nghe — nhưng cần cảnh giác việc lãng mạn hóa hôn nhân quá mức khiến thất vọng khi đối diện thực tế đời sống chung.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cái chín chắn sớm (練達成熟 — *liàndá chéngshú*), nhạy cảm nghệ thuật, giàu trực giác nhưng hơi "thần kinh chất" (神經質 — *shénjīngzhì*) — cần cha mẹ tạo môi trường ổn định, ít biến động để cảm xúc con trẻ không quá dao động theo ngoại cảnh.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tài vận âm thầm mà bền — đúng bản chất "tài tích lũy" đã nêu ở Nguyên lý nền, khác hẳn kiểu "tài đi kèm danh tiếng" của Thái Dương. Tốt nhất cho người sinh đêm: dòng tiền đến từ tích lũy dài hạn, đầu tư thận trọng, bất động sản hoặc tài sản có giá trị tăng theo thời gian hơn là đầu cơ ngắn hạn.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Chủ về đau bụng/lưng, ù tai, hồi hộp, rối loạn nội tiết — ứng với hành Thủy chủ về dịch thể và chu kỳ (biểu tượng học truyền thống, không phải chẩn đoán y khoa, chỉ nên xem là gợi ý lưu tâm).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Ra ngoài được nữ giới giúp đỡ, hợp sinh hoạt về đêm hoặc môi trường cần sự tinh tế/thẩm mỹ. Đối cung luôn là Thái Dương — nghĩa là "cách nhìn về bản thân" của người Thiên Di Thái Âm luôn được định hình qua tấm gương phản chiếu của một Thái Dương ở Mệnh, tạo thế lưỡng cực Âm-Dương xuyên suốt cả lá số.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Đông bạn, đặc biệt hợp bạn khác giới, bạn bè thường lớn tuổi hoặc từng trải hơn — đóng vai trò như người dẫn dắt/che chở trong các mối quan hệ xã hội hơn là bạn đồng trang lứa thuần túy.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp nghề sáng tạo/nội tâm (văn chương, thơ ca, diễn xuất, thiết kế) hoặc nghề đòi hỏi trí tuệ tĩnh lặng (luật, lập trình, biên tập, phân tích tài chính) nếu tọa thủ tại Tý — cách "Thủy trừng quế ngạc" đã nêu ở Nguyên lý nền. Nhìn chung Thái Âm tại Quan Lộc thành công hơn khi làm việc độc lập/từ xa hơn là môi trường tập thể ồn ào.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Cung đắc vị nhất của Thái Âm — đúng vai trò Điền Trạch chủ đã nêu ở Bản chất. Miếu vượng thường tích lũy nhiều bất động sản, nhà cửa mang phong cách ấm cúng, riêng tư, chú trọng không gian sống hơn là phô trương quy mô.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Lãng mạn, an nhàn tĩnh lặng kiểu "chậm mà chắc" — đời sống nội tâm phong phú, thích hưởng thụ tinh thần (nghệ thuật, thiên nhiên, không gian riêng tư) hơn hoạt động sôi nổi. Đây là một trong những vị trí phúc hậu, ít lo âu nhất nếu Thái Âm miếu vượng.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Ảnh hưởng sâu từ mẹ, gia đình ấm áp nếu miếu vượng — quan hệ mẹ-con thường là trục tình cảm chủ đạo định hình tính cách. Hãm địa/Hóa Kỵ thì ngược lại, duyên mẹ mỏng, cần chủ động hàn gắn khoảng cách thế hệ.
## 3. Tứ Hóa (Lộc: Đinh 丁 — *dīng* | Quyền: Mậu 戊 — *wù* | Khoa: Canh 庚 — *gēng* | Kỵ: Ất 乙 — *yǐ*)
| Cung | Lộc | Quyền | Khoa | Kỵ |
|---|---|---|---|---|
| Mệnh | An nhàn, sung túc, sức chịu áp lực kém | Nam hưởng thụ; nữ giỏi giao tế | Thanh tú, văn tài | Bất lợi nữ mệnh, làm nhiều được ít |
| Huynh Đệ | Chị em duyên sâu | Chị em nắm quyền | Chị em thân thiết | Tổn hại/nợ nần với bạn nữ |
| Phu Thê | Nam vợ hiền; nữ chồng quý | Phối ngẫu tích cực lập nghiệp | Phối ngẫu dịu dàng | Nam bất lợi hôn nhân; nữ khó lập nghiệp |
| Tử Tức | Con có duyên, cơ hội mua BĐS | Con gái chịu khó | Để lại di sản cho con | Vất vả vì con gái |
| Tài Bạch | Tiền từ xa, nhờ khác giới | Nam nhờ nữ; nữ tự lập nghiệp | Kiếm tiền từ khách nữ | Nữ khó lập nghiệp, đầu tư dễ thất bại |
| Tật Ách | Tâm địa quang minh | Trầm uất vì quá coi trọng danh tiết | Bạn nữ quan tâm sức khỏe | Nam: thận; nữ: phụ khoa |
| Thiên Di | Thích du lịch, gần thiên nhiên | Được nữ giới giúp | Dễ gặp duyên khi đi xa | Dễ gặp tiểu nhân nữ |
| Giao Hữu | Kết giao tri kỷ khác giới | Được bạn khác giới giúp, chủ kiến mạnh | Được bạn khác giới giúp | Cẩn trọng bạn nữ |
| Quan Lộc | Được vợ/quý nhân khác giới giúp | Nữ tự lập; nam nhờ nữ lập nghiệp | Phối ngẫu giỏi giữ của | Không nên KD bất động sản |
| Điền Trạch | Nhiều BĐS, hợp Thái Dương | Phụ nữ trong nhà nắm quyền | Không gian sống lãng mạn | Nữ chủ vất vả |
| Phúc Đức | Tích lũy của cải | Về già đào hoa | Về già đào hoa | Về già cô độc |
| Phụ Mẫu | Duyên mẹ sâu đậm | — | Tình cảm mẹ sâu sắc | Duyên mẹ mỏng |` },
  { label: "Tử Vi", body: `# TỬ VI (紫微 — zǐwēi — Emperor Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Nhĩ căn tử nhuyễn | 耳根子軟 | ěrgēnzi ruǎn | **Nhĩ** (tai) + **Căn** (gốc rễ) + **Tử** (hậu tố danh từ) + **Nhuyễn** (mềm) → "tai mềm, dễ bị lung lay bởi lời nịnh" | easily swayed by flattery |
| Đôn hậu | 敦厚 | dūnhòu | **Đôn** (chân thành, đầy đặn) + **Hậu** (nhân hậu) → "chân thành, nhân hậu" | sincere, warm |
| Thanh nhã | 高雅 | gāoyǎ | **Cao** (cao sang) + **Nhã** (tao nhã) → "cao nhã, thanh lịch" | elegant |
| Cô quân | 孤君 | gū jūn | **Cô** (đơn độc) + **Quân** (vua) → "vị vua cô độc" | isolated ruler |
| Chế sát | 制煞 | zhì shà | **Chế** (khống chế) + **Sát** (hung sát) → "khống chế hung khí" | subduing malefics |
| Đế tinh | 帝星 | dìxīng | **Đế** (vua) + **Tinh** (sao) → "sao của bậc đế vương" | Emperor Star |
| Quần thần khánh hội | 群臣慶會 | qúnchén qìnghuì | **Quần** (đông đảo) + **Thần** (bề tôi) + **Khánh** (chúc mừng) + **Hội** (tụ họp) → "trăm quan tụ hội chúc mừng" | ministers gathered in celebration |

## 1. Bản chất
- Ngũ hành: Âm Thổ (己土 — *jǐ tǔ*)
- Hóa khí: "Tôn" (尊 — *zūn* — tôn quý)
- Bắc Đẩu chủ tinh, Đế tinh (帝星 — *dìxīng*), kiêm Quan Lộc chủ
- Điển tích: Bá Ấp Khảo (伯邑考 — *bó yì kǎo*), con trưởng Chu Văn Vương
- Đặc điểm riêng: KHÔNG BAO GIỜ Hóa Lộc, KHÔNG BAO GIỜ Hóa Kỵ — chỉ Hóa Quyền (Nhâm 壬 — *rén*) và Hóa Khoa (Ất 乙 — *yǐ*)


Vai trò "Đế tinh" của Tử Vi bắt nguồn trực tiếp từ thiên văn học cổ: Tử Vi Viên (紫微垣 — *zǐwēi yuán*) là một trong Tam Viên bao quanh Bắc Cực tinh — điểm gần như đứng yên duy nhất trên bầu trời trong khi mọi chòm sao khác xoay quanh nó. Ẩn dụ này giải thích triệt để lý do Tử Vi không tự tạo Hóa Lộc lẫn Hóa Kỵ: một vị vua lý tưởng theo Nho giáo không tự mình lao vào kiếm lợi (Lộc) hay gây họa (Kỵ), mà VẬN HÀNH qua việc trọng dụng bề tôi — cơ chế "vô vi nhi trị" (無為而治 — *wúwéi ér zhì*). Đây cũng là lý do sức mạnh thực sự của Tử Vi phụ thuộc gần như hoàn toàn vào việc có "quần thần khánh hội" hay không.
## Nguyên lý nền
"Quần thần khánh hội" (群臣慶會 — *qúnchén qìnghuì*) — cần Tả Hữu Xương Khúc Khôi Việt Phủ Tướng phò tá mới phát huy sức mạnh; đơn thủ gọi là "cô quân" (孤君 — *gū jūn*). Có khả năng "chế sát" (制煞 — *zhì shà*) — giảm nhẹ hung tính của sát tinh đồng cung.


**"Tử Phủ triều viên"** (紫府朝垣格 — *zǐ fǔ cháo yuán gé*): khác "Tử Phủ đồng cung" — đây là Tử Vi và Thiên Phủ không đồng cung nhưng cùng hội chiếu Mệnh qua tam hợp (VD: Vũ Tướng thủ Mệnh Dần/Thân, tam hợp có Tử Vi + Thiên Phủ). Cổ ngữ: "Tử Phủ triều viên, thực lộc vạn chung" — 1 trong 4 biến thể cách phú quý cao nhất.

Tử Vi tại Ngọ (nhập miếu) LUÔN tốt hơn tại Tý (chỉ bình hòa) dù cùng "độc tọa" — "độc tọa" ≠ "cô quân yếu" nếu có "Song Lộc triều viên" (雙祿朝垣 — *shuāng lù cháo yuán* — 2 nguồn Lộc cùng chầu).

Đặc điểm định danh: Tử Vi (giống Thiên Phủ) gần như KHÔNG CÓ vị trí hãm địa thực sự — chỉ dao động miếu/vượng ↔ bình hòa, không bao giờ "hãm" như Thái Dương/Thái Âm/Cự Môn. Nhất quán với việc không có Hóa Lộc/Kỵ — cả vị trí lẫn tứ hóa đều "không chạm đáy".

- Nguồn gốc thiên văn: Tam Viên (三垣 — *sān yuán*) - Tử Vi Viên (紫微垣 — *zǐwēi yuán*) bao quanh Bắc Cực tinh (北極星 — *běijí xīng*), 15 sao xếp tường thành, gốc của "Tử Cấm Thành".
- Cơ chế quần thần từ Nho giáo: "vô vi nhi trị" (無為而治 — *wúwéi ér zhì*) - vua giỏi biết trọng dụng (重用 — *zhòngyòng*) hiền tài, không độc đoán (獨裁 — *dúcái*).
- "Tôn" (địa vị bẩm sinh 與生俱來 — *yǔ shēng jù lái*) khác "Quý" của Thái Dương (địa vị đạt được qua tích lũy 累積 — *lěijī*).
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Tử Vi thủ Mệnh cho dáng dấp đôn hậu, thanh nhã, giỏi quản lý — nhược điểm kinh điển là "nhĩ căn tử nhuyễn" (耳根子軟 — tai mềm, dễ bị nịnh), hệ quả trực tiếp từ việc quen được tôn trọng nên dễ mất cảnh giác trước lời tâng bốc. Đồng cung Thiên Phủ (Dần/Thân — "Tử Phủ"): sung túc vật chất, làm việc có nguyên tắc, đúng cặp đôi "vua-tôi" đã nêu ở Bản chất. Đồng cung Thất Sát (Tị/Hợi): ngoài tĩnh trong cương, uy quyền trầm lặng. Đồng cung Phá Quân (Tý/Ngọ): bá khí, độc lập, dễ phá cách nếu thiếu phò tá. Dù tổ hợp nào, sức mạnh thật sự luôn phụ thuộc vào việc có đủ "quần thần khánh hội" (Tả Hữu Xương Khúc Khôi Việt) hay không — độc thủ vô phụ tá dễ thành "cô quân" hữu danh vô thực.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Có người đáng nương tựa, đóng vai trò thủ lĩnh không chính thức trong quan hệ anh em — nhưng vì bản chất Tử Vi thiên về chỉ đạo hơn là đồng hành, quan hệ này đôi khi mang tính thứ bậc hơn là bình đẳng thân mật.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Nam mệnh thường được vợ hiền hỗ trợ; nữ mệnh theo cổ ngữ "lấy chồng làm vinh" — hôn nhân gắn liền với địa vị/thể diện. Cả hai giới nên kết hôn muộn để tránh việc bản chất "muốn làm chủ" của Tử Vi áp đảo phối ngẫu khi còn quá trẻ, chưa đủ độ chín để dung hòa.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cái xuất sắc, nhạy bén, thường có tố chất lãnh đạo bẩm sinh — cha mẹ cần tránh áp đặt khuôn mẫu cứng nhắc vì con dễ phản kháng nếu cảm thấy không được tôn trọng như một cá thể độc lập.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Cả đời không lo cơm áo — tài vận ổn định nhờ vị thế/uy tín hơn là liều lĩnh đầu cơ. Tuy nhiên do Tử Vi không tự HÓA Lộc, dòng tiền thực chất phụ thuộc vào các sao đồng hành (đặc biệt Thiên Phủ, Vũ Khúc); Tử Vi đơn thuần cung cấp "vị thế" để thu hút tài lộc chứ không trực tiếp tạo ra nó.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Ít bệnh nặng, thể trạng thường bền — nhưng cần chú ý các bệnh liên quan đến áp lực/căng thẳng do thói quen ôm đồm trách nhiệm quản lý quá nhiều việc cùng lúc (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Được quý nhân giúp đỡ, phong thái thuyết phục tự nhiên khi ra ngoài — môi trường xa nhà thường là nơi Tử Vi phát huy vai trò lãnh đạo rõ rệt nhất, vì không bị ràng buộc bởi vai vế gia đình.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn bè đông, địa vị cao — nhưng bản chất "Đế tinh" khiến quan hệ bạn bè dễ nghiêng về mô hình "người dẫn dắt — người theo sau" hơn là ngang hàng thực sự; cần chủ động hạ mình để có tình bạn chân thành thay vì chỉ có người phục tùng.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Cung đắc vị nhất sau Mệnh — quản lý cấp cao, hợp vai trò đứng đầu tổ chức/doanh nghiệp/cơ quan. Đây là nơi triết lý "vô vi nhi trị" phát huy rõ nhất: thành công đến từ khả năng trọng dụng đúng người, không phải tự mình ôm hết việc.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Sản nghiệp lớn, hợp đất cao/vị trí trung tâm, thường sở hữu bất động sản có giá trị biểu tượng địa vị chứ không đơn thuần để ở. Xu hướng tích lũy tài sản theo quy mô lớn, ít khi nhỏ lẻ.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Chăm chỉ, tu dưỡng, phúc dày — đời sống nội tâm gắn với cảm giác được tôn trọng/công nhận hơn là hưởng thụ vật chất đơn thuần. Cần học cách buông bớt trách nhiệm để thực sự thư thái, vì bản năng "cai quản" của Tử Vi hiếm khi cho phép nghỉ ngơi trọn vẹn.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Gia đình hòa hợp, cha mẹ địa vị cao — nhưng chính uy quyền đó đôi khi cản trở tính độc lập của bản thân, đặc biệt trong giai đoạn trưởng thành cần khẳng định bản sắc riêng tách khỏi cái bóng của cha mẹ.
## 3. Tứ Hóa (chỉ Quyền: Nhâm 壬 — *rén* | Khoa: Ất 乙 — *yǐ*)
| Cung | Quyền | Khoa |
|---|---|---|
| Mệnh | Năng lực mạnh, nắm quyền lớn | Quý nhân giúp, hóa giải tai ách |
| Huynh Đệ | Anh em uy quyền | Anh em chăm sóc mình |
| Phu Thê | Gia đình tốt, phối ngẫu thực quyền | Gia đình tốt, phối ngẫu chu đáo |
| Tử Tức | Con thích nắm quyền | Sinh quý tử |
| Tài Bạch | Quản lý tài chính có phương pháp | Quý nhân giúp tài chính |
| Tật Ách | Quá nhạy cảm sức khỏe, ảnh hưởng công việc | Sức khỏe tốt, có nạn có quý nhân cứu |
| Thiên Di | Được nâng đỡ, danh lợi song toàn | Được giúp nhưng thiên về hư danh |
| Giao Hữu | Kết giao giới công chức/quân đội | Kết giao giới quan trường |
| Quan Lộc | Thực quyền, thăng tiến lớn | Hợp công chức nhà nước |
| Điền Trạch | Nhà cửa thanh tịnh | Nhà cửa sang trọng |
| Phúc Đức | Về già thanh cao | Về già con cháu quây quần |
| Phụ Mẫu | Cha mẹ địa vị cao, ảnh hưởng tính độc lập | Tình cảm cha mẹ tốt |` },
  { label: "Thiên Phủ", body: `# THIÊN PHỦ (天府 — tiān fǔ — the Treasury Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Văn nhã lịch thiệp | 溫文儒雅 | wēnwén rúyǎ | **Ôn** (ôn hòa) + **Văn** (có văn hóa) + **Nho** (học thức) + **Nhã** (thanh nhã) → "mềm mỏng có học thức, từng trải khéo léo" | gentle & cultured |
| Đãi đọa | 怠惰 | dàiduò | **Đãi** (lười biếng) + **Đọa** (sa sút, trễ nải) → "trì trệ, lười biếng" | inert, lazy |
| Không khố | 空庫 | kōng kù | **Không** (trống rỗng) + **Khố** (kho) → "kho trống rỗng, có danh không thực" | empty treasury |
| Lộc khố | 祿庫 | lù kù | **Lộc** (bổng lộc) + **Khố** (kho) → "kho chứa bổng lộc" | treasury of prosperity |
| Chính đồ | 正途 | zhèngtú | **Chính** (ngay thẳng) + **Đồ** (con đường) → "con đường chính quy, đúng đắn" | the proper/legitimate path |
| Hộ Bộ | 戶部 | hùbù | **Hộ** (dân hộ, thuế khóa) + **Bộ** (bộ, cơ quan) → "cơ quan quản lý tài chính triều đình" | Ministry of Revenue |

## 1. Bản chất
- Ngũ hành: Dương Thổ (戊土 — *wù tǔ*)
- Hóa khí: "Lệnh" (令 — *lìng*)
- Nam Đẩu chủ tinh, kiêm cả Tài Bạch chủ và Điền Trạch chủ — "Lộc khố" (祿庫 — *lù kù*)
- Vai trò: tể tướng/phụ chính của Tử Vi. Cách "Phủ Tướng triều viên" (府相朝垣 — *fǔ xiàng cháo yuán*) là cách cục ổn định phú quý bậc cao.
- Điển tích: Khương Hoàng Hậu (姜皇后 — *jiāng huánghòu*) — Phong Thần Bảng
- Kỵ nhất: Địa Không, Địa Kiếp (đặc biệt Địa Kiếp)


Thiên Phủ và Tử Vi tạo thành cặp đôi "vua – tôi" kinh điển trong hệ 14 chính tinh: nếu Tử Vi là Đế tinh ngồi yên chỉ đạo, Thiên Phủ là Tể tướng quán xuyến kho tàng quốc gia. Việc Thiên Phủ hoàn toàn không có Tứ Hóa (giống Tử Vi) không phải ngẫu nhiên trùng lặp, mà phản ánh cùng một triết lý: một kho tàng đáng tin cậy không được phép tự ý biến động theo cảm hứng, nó chỉ nên PHẢN ÁNH trung thực những gì các sao khác mang lại. Đây là gốc rễ tâm lý của sự an toàn mà người Mệnh Thiên Phủ thường tìm kiếm — không phải sợ rủi ro, mà là bản năng gìn giữ giá trị đã tích lũy.
## Nguyên lý nền
Thiên Phủ là chính tinh DUY NHẤT không có Tứ Hóa nào (không Lộc/Quyền/Khoa/Kỵ) — triết lý "kho không tự biến động". Nguyên tắc "Khố cần có Lộc" (庫須有祿 — *kù xū yǒu lù*): Thiên Phủ không tự sinh tài, chỉ cất giữ tài các sao khác tạo ra. Không có Lộc Tồn/Hóa Lộc lân cận → "không khố" (空庫 — *kōng kù*) — có danh không có thực.


**"Lộ khố"** (露庫 — *lù kù*): Thiên Phủ gặp Không/Kiếp mà KHÔNG có Lộc đi kèm → của cải phô ra ngoài, dễ hao tán bởi ngoại cảnh (khác "không khố" là chưa từng có gì).

Đặc điểm: Thiên Phủ (giống Tử Vi) gần như không có hãm địa hoàn toàn — điểm yếu không nằm ở "kho ở đâu" mà ở "kho có được nạp Lộc hay không".

Thiên Phủ tại Mão/Dậu (đối cung luôn là Thất Sát) — vị trí kém vững chãi nhất vì bị "chiến tướng" xung chiếu trực tiếp.

- Phân biệt Bắc Đẩu (mệnh 命 - thừa hưởng 承受 — *chéngshòu*) và Nam Đẩu (thân 身 - tự tạo dựng 自行創造 — *zìxíng chuàngzào*).
- "Khố" (庫 - kho có cấu trúc, minh bạch) khác "Tàng" (藏 - cất giấu mơ hồ) — Thiên Phủ là "Khố" nên hợp con đường chính quy (正途 — *zhèngtú*).
- Quan hệ Phủ-Tướng như Hộ Bộ (戶部 — *hùbù*) và quan giữ ấn trong triều đình.
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thiên Phủ thủ Mệnh cho phong thái ôn hòa nho nhã (溫文儒雅 — *wēnwén rúyǎ*), đa tài, giỏi quán xuyến — nhược điểm là "đãi đọa" (怠惰 — *dàiduò* — trì trệ) nếu quá an toàn, thiếu động lực bứt phá. Đồng cung Vũ Khúc (Tý/Ngọ — "Vũ Phủ"): giỏi kinh doanh, thiên vật chất, kết hợp "tài tĩnh" và "tài động" thành cách cục tài phú song toàn. Đồng cung Liêm Trinh (Sửu/Mùi — "Liêm Phủ"): giỏi giao tiếp nhưng dễ hẹp hòi nếu thiếu cát tinh điều hòa. Đồng cung Tử Vi (Dần/Thân — "Tử Phủ"): sung túc vật chất nhưng nội tâm dễ trống rỗng — có tất cả về hình thức mà thiếu mục đích sống rõ ràng. Điều kiện tiên quyết để Thiên Phủ phát huy trọn vẹn là có Lộc Tồn/Hóa Lộc lân cận ("Khố cần có Lộc"), nếu không dễ rơi vào "không khố" — có danh mà không có thực.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Đông anh em, khí độ rộng rãi, đóng vai trò người gìn giữ hòa khí trong gia đình — thường là điểm tựa tài chính/tinh thần đáng tin cậy cho các thành viên khác.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Phối ngẫu dịu dàng, gắn bó, coi trọng tinh thần hơn vật chất — hôn nhân ổn định, ít sóng gió lớn, nhưng cần cảnh giác sự an toàn quá mức khiến quan hệ thiếu đam mê, dễ nhạt nhòa theo thời gian nếu không chủ động vun đắp.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con tài năng, hiếu thảo, được nuôi dạy trong môi trường đề cao kỷ cương và vật chất đầy đủ — cha mẹ nên chú ý không biến sự chu cấp thành nuông chiều khiến con thiếu ý chí tự lập.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Cung đắc vị — kể cả gặp Địa Không/Địa Kiếp vẫn giữ được nền tảng phú túc cơ bản nhờ bản chất "kho chứa" bền vững. Tài vận đến từ tích lũy có hệ thống, quản lý tài chính cẩn trọng hơn là mạo hiểm; đây là một trong những vị trí tài chính an toàn nhất trong 14 chính tinh.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Ít bệnh nặng — thể trạng thường sung túc, ổn định nhờ lối sống điều độ, ít cực đoan (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Ra ngoài được phúc, thường có người lớn tuổi/quý nhân nâng đỡ — môi trường xa nhà mang lại cảm giác an toàn tương tự ở nhà, ít khi gặp biến cố lớn.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn đông, xuất thân tốt — quan hệ bạn bè thường mang tính "cùng đẳng cấp", hữu ích cho việc mở rộng mạng lưới xã hội có chất lượng hơn là số lượng thuần túy.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp công chức/kinh doanh ổn định hơn mạo hiểm khởi nghiệp lớn — Thiên Phủ tại Quan Lộc phát huy tốt nhất trong vai trò quản lý/vận hành hệ thống có sẵn, đúng bản chất "tể tướng" chứ không phải người khai phá tiên phong.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Nên phát triển sản nghiệp dưới sự dẫn dắt hoặc trong khuôn khổ có sẵn (thừa kế, hợp tác) hơn là tự đầu tư độc lập quy mô lớn — phù hợp với vai trò "Nam Đẩu: thân — tự tạo dựng" nhưng vẫn cần nền tảng ban đầu vững chắc để phát huy.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Đa tài, an vui, phúc thọ song toàn — một trong những vị trí có đời sống nội tâm viên mãn nhất, ít lo âu, biết tận hưởng thành quả đã tích lũy được.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Gia đình khá giả, cha mẹ ôn hòa công bằng — nền tảng giáo dục vững chắc, cha mẹ thường là tấm gương về sự chừng mực và trách nhiệm.
## 3. Tứ Hóa: Không có (đặc điểm định danh của sao này)` },
  { label: "Vũ Khúc", body: `# VŨ KHÚC (武曲 — wǔ qū — the Wealth/Military Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Cương liệt | 剛烈 | gāngliè | **Cương** (cứng rắn) + **Liệt** (mãnh liệt) → "cứng rắn, mãnh liệt" | fierce |
| Cấp táo | 急躁 | jízào | **Cấp** (gấp gáp) + **Táo** (nóng nảy) → "gấp gáp, nóng nảy" | impatient |
| Cô khắc | 孤剋 | gū kè | **Cô** (đơn độc) + **Khắc** (khắc chế) → "đơn độc, khắc chế người thân" | isolating |
| Quả tú | 寡宿 | guǎsù | **Quả** (góa, cô đơn) + **Tú** (chòm sao) → "sao của sự cô đơn" | star of solitude |
| Tân Kim | 辛金 | xīn jīn | **Tân** (can Tân) + **Kim** (hành Kim) → "Kim âm, ngũ hành của Vũ Khúc" | Yin Metal |
| Thiên Tài | 偏財星 | piāncái xīng | **Thiên** (lệch, phụ) + **Tài** (tài lộc) + **Tinh** (sao) → "sao tài lộc bất ngờ, đầu cơ" | speculative wealth star |

## 1. Bản chất
- Ngũ hành: Âm Kim (辛金 — *xīn jīn*)
- Hóa khí: "Tài" (財 — *cái*)
- Bắc Đẩu đệ lục tinh, Tài Bạch chủ — "tài chủ động" (khác Thiên Phủ "tài tĩnh", Thái Âm "tài tích lũy")
- Điển tích: Chu Vũ Vương (周武王 — *zhōu wǔ wáng*)
- Đặc điểm: thuộc nhóm "quả tú" (寡宿 — *guǎ sù*), tính "cô khắc" (孤剋 — *gū kè*) — cổ ngữ "Vũ Khúc nhập Mệnh, nghi vãn hôn"


Vũ Khúc là chính tinh duy nhất mà tên gọi trực tiếp mang nghĩa "võ" (武 — *wǔ*) — phản ánh nguồn gốc kép của sao này: vừa là tướng lĩnh, vừa là biểu tượng tài chính chủ động. Sự kết hợp tưởng chừng mâu thuẫn giữa "quân sự" và "tài phú" thực ra rất nhất quán về mặt cơ chế: trong xã hội cổ, chinh chiến và tích lũy của cải đều đòi hỏi cùng một phẩm chất — quyết đoán, dám chấp nhận rủi ro, sẵn sàng đối đầu trực diện thay vì né tránh. Đây là lý do "tài động" của Vũ Khúc luôn đi kèm cái giá là tính "cô khắc" trong quan hệ: thứ gì phải giành giật mà có thì hiếm khi đến cùng sự êm ả.
## Nguyên lý nền
Vũ Khúc và Thiên Phủ đại diện 2 triết lý làm giàu đối lập: Phủ = tài tĩnh, sẵn có, cần giữ; Vũ Khúc = tài động, phải giành lấy bằng quyết đoán/rủi ro. Tính "cương liệt" (剛烈 — *gāngliè*) + "cấp táo" (急躁 — *jízào*) cần thiết để giành tài lại chính là nguyên nhân gây cô khắc quan hệ — cơ chế hợp lý, không phải lời nguyền huyền bí.

Tổ hợp đồng cung kinh điển tại Mệnh: Vũ Phủ (Tý/Ngọ) phú quý song toàn; Vũ Tham (Sửu/Mùi — "Tiên bần hậu phú"); Vũ Tướng (Dần/Thân) ổn định; Vũ Sát (Mão/Dậu) cương liệt cực độ, cần nghề chuyên môn; Vũ Phá (Tị/Hợi) mạo hiểm, hao tài, thất thường.


**"Vũ Khúc nhập khố"** (武曲入庫 — *wǔqū rù kù*): Vũ Khúc (Kim) tọa Thìn/Tuất/Sửu/Mùi ("tứ mộ khố") = vị trí vững chãi, tích lũy tốt nhất — nghịch lý: sao "động" khi vào đúng vị trí "kho" lại vừa kiếm được vừa giữ được, lý tưởng cho kinh doanh dài hạn.

Cơ chế Ngũ Hành: Kim ứng mùa Thu, tính "túc sát" (肅殺 — nghiêm khắc, thu liễm) — gốc rễ của tính "quyết đoán lạnh lùng", khác hẳn Thổ (Phủ/Tử Vi) mang tính bao dung ổn định.

Phân biệt Vũ Sát (Mão/Dậu — cương liệt CÓ kiểm soát, cần 1 kỹ năng chuyên môn để trút năng lượng, có thể thành công lớn) vs Vũ Phá (Tị/Hợi — cương liệt KHÔNG kiểm soát vì Phá Quân phá cách, quyết đoán biến thành bốc đồng) — cổ thư đánh giá Vũ Sát cao hơn Vũ Phá dù cả hai đều "cương liệt".

- Phân biệt "Chính Tài" (正財星 - chính đáng) và "Thiên Tài" (偏財星 — *piāncái xīng* - đầu cơ/may rủi, như Tham Lang).
- Giải thích lại "quả tú": không phải lạnh lùng vô tình mà vì chữ "Lợi" (利 — *lì*) luôn ưu tiên hơn tình cảm.
- Điển tích mở rộng: Quan Vũ (關羽 — *guān yǔ*), Địch Thanh (狄青 — *dí qīng*) — nhân vật trung dũng văn võ song toàn.
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Vũ Khúc thủ Mệnh cho tài vận cả đời nhưng đi kèm cái giá "cô khắc" — cổ ngữ "nghi nam bất nghi nữ" (hợp nam hơn nữ) vì tính cương liệt/cấp táo dễ tạo cạnh tranh ngầm trong quan hệ nếu là nữ mệnh. Đặc điểm "đại khí vãn thành" — thành công lớn nhưng đến muộn, đúng quy luật phải tích lũy quyết đoán qua va vấp mới trọn vẹn. Tổ hợp đồng cung quyết định rất nhiều: Vũ Phủ (Tý/Ngọ) phú quý song toàn; Vũ Tham (Sửu/Mùi — "Tiên bần hậu phú") nghèo trước giàu sau; Vũ Tướng (Dần/Thân) ổn định điều hòa bớt cương liệt; Vũ Sát (Mão/Dậu) cương liệt cực độ, cần một nghề chuyên môn để trút năng lượng; Vũ Phá (Tị/Hợi) mạo hiểm, hao tài, thất thường nhất trong 5 tổ hợp.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Ít anh em, khó đoàn kết — tính "cô khắc" của Vũ Khúc thể hiện rõ ở cung này, quan hệ anh em thiên về nghĩa vụ hơn là gắn bó tự nhiên; cần chủ động vun đắp nếu muốn duy trì tình cảm lâu dài.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Dễ cãi vã, nên kết hôn muộn cả nam lẫn nữ để có đủ độ chín xử lý xung đột. Vì Vũ Khúc "tài động" đặt "Lợi" lên hàng đầu, hôn nhân cần cả hai bên ý thức rõ ràng về vai trò tài chính để tránh xung đột quyền lực trong nhà.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cá tính mạnh, cố chấp, số con thường ít — cha mẹ nên tôn trọng tính độc lập của con thay vì áp đặt, vì con cái Vũ Khúc thường phản kháng mạnh trước sự kiểm soát quá mức.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Cung đắc vị nhất của Vũ Khúc — tiềm năng lớn trong tài chính/thực nghiệp đúng vai trò "tài chủ động". Đây là vị trí lý tưởng để phát huy bản chất "phải giành lấy bằng quyết đoán": đầu tư, kinh doanh, hoặc bất kỳ lĩnh vực đòi hỏi ra quyết định tài chính dứt khoát.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Thời thơ ấu dễ bệnh/thương tích; về sau vấn đề xương khớp, hô hấp — ứng với hành Kim "túc sát" (nghiêm khắc, thu liễm) tác động lên cấu trúc cứng của cơ thể (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Đối ngoại mạnh, chủ động nhưng vất vả — ra ngoài luôn ở thế phải giành lấy cơ hội chứ không tự nhiên đến, đòi hỏi nỗ lực liên tục nhưng đổi lại thành quả xứng đáng nếu kiên trì.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn bè đa dạng — nhưng do bản chất đặt "Lợi" trên tình cảm, quan hệ bạn bè dễ mang tính hợp tác/trao đổi lợi ích hơn là thâm giao thuần túy; cần phân biệt rõ bạn làm ăn và bạn tri kỷ.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Nam giới hợp doanh nghiệp/tài chính; nữ giới là "phụ nữ sự nghiệp" chính hiệu, sẵn sàng cạnh tranh trực diện trong môi trường nhiều thử thách. Đây là một trong hai cung Vũ Khúc làm sao chủ (cùng Liêm Trinh), nên tọa thủ tại đây luôn mang lại thực quyền đáng kể.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Tự tạo sản nghiệp bằng chính sức mình, hình thức tài sản có thể thay đổi (mua bán, tái đầu tư) nhưng luôn giữ được nền tảng — phản ánh đúng tinh thần "tài động" áp dụng vào lĩnh vực bất động sản.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Vị trí kém thuận lợi nhất của Vũ Khúc — nóng vội, cố chấp, làm nhiều hưởng ít vì tâm trí luôn hướng ra ngoài để giành lấy thay vì dừng lại tận hưởng. Đây là bài học lớn nhất của người Mệnh Vũ Khúc: học cách dừng lại đúng lúc.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ nghiêm khắc, cố chấp, kỳ vọng cao; quan hệ êm đềm về bề mặt nhưng thiếu sự cởi mở tình cảm sâu — mô hình giáo dục thiên về kỷ luật/thành tích hơn là đồng cảm.
## 3. Tứ Hóa (Lộc: Kỷ 己 — *jǐ* | Quyền: Canh 庚 — *gēng* | Khoa: Giáp 甲 — *jiǎ* | Kỵ: Nhâm 壬 — *rén*)
| Cung | Lộc | Quyền | Khoa | Kỵ |
|---|---|---|---|---|
| Mệnh | Chính trực, giỏi kiếm tiền | Thực lực, tài chính rộng mở | Học vấn/nghệ thuật tốt, tính mềm hơn | Nhiều trắc trở tài chính |
| Huynh Đệ | Anh em giỏi kiếm tiền | Anh em thích nắm quyền | Được anh em giúp | Tổn hại, hoặc duyên tôn giáo |
| Phu Thê | Phối ngẫu năng lực cao | Phối ngẫu mạnh, nam sợ vợ | Phối ngẫu năng lực, chu đáo | Cô khắc nặng nhất — muộn/không hôn nhân |
| Tử Tức | Con thông minh, có đầu óc KD | Con chính trực, cương nghị | Con có ý thức tài chính | Khó thụ thai, đề phòng sảy thai |
| Tài Bạch | Không thiếu tiền | Nắm quyền tài chính | Được tiền lẫn danh | Phá tài |
| Tật Ách | Kiềm chế nóng tính | Thể chất kém | Sức khỏe điều dưỡng tốt | Thể chất kém, đặc biệt phổi |
| Thiên Di | Giỏi đàm phán | Ít trợ lực, tự lực | Gặp khách nơi giao tế | Ít giúp đỡ, hao tài |
| Giao Hữu | Giỏi kết giao tiệc rượu | Kết bạn giới tài chính | Kết bạn qua tiệc tùng | Cẩn trọng bạn nóng tính |
| Quan Lộc | Thuận lợi việc tài chính | Thực quyền tài chính | Hợp võ chức/tài chính | Vốn khó xoay, thất thoát |
| Điền Trạch | Giữ cơ nghiệp | Thích đồ bền chắc | Thích sống khô ráo sạch sẽ | Bất hòa vì tiền |
| Phúc Đức | Về già không thiếu tiền | Về già nắm tài chính, keo kiệt | Về già biết chăm con cháu | Về già đa nghi |
| Phụ Mẫu | Cha mẹ giỏi kiếm tiền | Cha mẹ nắm quyền tài chính | Cha mẹ để lại tài sản | Cha mẹ nóng tính |` },
  { label: "Thiên Tướng", body: `# THIÊN TƯỚNG (天相 — tiān xiàng — the Minister/Seal Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Đôn hậu | 敦厚 | dūnhòu | **Đôn** (chân thành, đầy đặn) + **Hậu** (nhân hậu) → "chân thành, nhân hậu" | sincere, warm |
| Ưu nhu quả đoán | 優柔寡斷 | yōuróu guǎduàn | **Ưu** (chần chừ) + **Nhu** (mềm yếu) + **Quả** (ít) + **Đoán** (quyết đoán) → "mềm yếu, thiếu quyết đoán" | indecisive |
| Chưởng ấn quan | 掌印官 | zhǎng yìn guān | **Chưởng** (nắm giữ) + **Ấn** (con dấu) + **Quan** (quan chức) → "quan giữ ấn tín" | seal-bearing official |
| Tài Ấm giáp Ấn | 財蔭夾印 | cái yìn jiā yìn | **Tài** (tài lộc) + **Ấm** (che chở) + **Giáp** (kẹp giữa) + **Ấn** (con dấu) → "Tài và Ấm cùng kẹp bảo vệ Ấn" | wealth & shelter flanking the Seal |
| Hình Kỵ giáp Ấn | 刑忌夾印 | xíng jì jiā yìn | **Hình** (hình phạt) + **Kỵ** (Hóa Kỵ) + **Giáp** (kẹp giữa) + **Ấn** (con dấu) → "Hình và Kỵ cùng kẹp gây hại Ấn" | punishment & taboo flanking the Seal |
| Chuyên tư y thực | 專司衣食 | zhuān sī yīshí | **Chuyên** (chuyên trách) + **Tư** (coi sóc) + **Y** (áo mặc) + **Thực** (ăn uống) → "chuyên lo việc ăn mặc, hậu cần" | in charge of food and clothing |

## 1. Bản chất
- Ngũ hành: Dương Thủy (壬水 — *rén shuǐ*)
- Hóa khí: "Ấn" (印 — *yìn*)
- Nam Đẩu tinh, "chưởng ấn quan" (掌印官 — *zhǎng yìn guān*) — thực thi chứ không tự quyết định
- Điển tích: Văn Thái Sư (聞太師 — *wén tàishī*)
- KHÔNG có Tứ Hóa (giống Thiên Phủ) — "sao ít cá tính riêng nhất trong 14 chính tinh"


Thiên Tướng là hình mẫu điển hình của "người thứ hai xuất sắc" trong hệ 14 chính tinh — một "chưởng ấn quan" tận tụy thực thi chứ không tự đề xuất. Việc hoàn toàn không có Tứ Hóa, cộng với vị trí bị kẹp cố định giữa Cự Môn và Thiên Lương, khiến Thiên Tướng trở thành minh chứng rõ nhất cho nguyên lý: một số nhân cách được định hình chủ yếu bởi MÔI TRƯỜNG xung quanh hơn là bởi nội lực riêng. Đây không phải điểm yếu — trong đúng bối cảnh (được phò tá tốt), khả năng "trung hòa và thực thi hoàn hảo" của Thiên Tướng chính là thứ giữ cho cả một hệ thống lớn không sụp đổ.
## Nguyên lý nền
Thiên Tướng LUÔN bị kẹp giữa Cự Môn và Thiên Lương (quy luật an sao cố định, không đổi theo lá số):
- Cự Môn Hóa Lộc → "Tài Ấm giáp Ấn" (財蔭夾印 — *cái yìn jiā yìn*) — đại cát, được cả Tài lẫn Ấm bao bọc
- Cự Môn Hóa Kỵ → "Hình Kỵ giáp Ấn" (刑忌夾印 — *xíng jì jiā yìn*) — Thiên Lương biến "Hình" — dễ vướng pháp lý, tổn hại
→ Minh chứng rõ nhất cho khái niệm "sao thụ động hoàn toàn phụ thuộc môi trường xung quanh".


- "Chuyên tư y thực" (專司衣食 — *zhuān sī yīshí*) — quan giữ ấn còn phụ trách hậu cần cơ bản.
- "Phùng Tướng khán Phủ" (逢相看府 — *féng xiàng kàn fǔ*) — luận Thiên Tướng phải xem cả Thiên Phủ trong tam hợp.
- Thành ngữ "cường đạo thổ phỉ, dã hữu hảo bằng hữu" (強盜土匪 — *qiángdào tǔfěi*，也有好朋友 — *yě yǒu hǎo péngyǒu*) minh họa tính "lưỡng diện, tiêu chuẩn tự đặt".
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thiên Tướng thủ Mệnh cho phong thái đôn hậu (敦厚 — *dūnhòu*), ôn hòa, chính nghĩa — nhưng đúng như cổ ngữ "cát nhi kém xung" (吉而缺沖 — *jí ér quē chōng*), tốt mà thiếu đột phá vì bản chất "chưởng ấn quan" thiên về thực thi hơn tự quyết. Vũ Tướng (Dần/Thân) ổn định, cân bằng giữa quyết đoán và điều hòa; Liêm Tướng (Tý/Ngọ) khéo giao tế nhưng bảo thủ hơn. Đối cung luôn là Phá Quân — nghĩa là "cái tôi" của Thiên Tướng luôn phải soi vào một hình ảnh đối lập hoàn toàn (phá cách, bốc đồng) để tự định vị mình, giải thích vì sao người Mệnh Thiên Tướng thường rất cẩn trọng, như thể đang tự kiềm chế phần "Phá Quân tiềm ẩn" bên trong.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Tình cảm sâu đậm, hỗ trợ nhau thực chất — Thiên Tướng tại đây phát huy đúng vai trò "chưởng ấn": đáng tin cậy, sẵn sàng đứng ra gánh vác trách nhiệm chung của anh em.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Duyên đến qua bạn học/đồng nghiệp/mai mối hơn là tình cờ gặp gỡ ngẫu nhiên — phối ngẫu đoan trang, có trách nhiệm, phù hợp với người tìm kiếm sự ổn định lâu dài hơn là cảm giác mạnh.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con thật thà, coi trọng thể diện — được nuôi dạy trong khuôn khổ nguyên tắc rõ ràng, ít khi nổi loạn công khai nhưng cần được khích lệ thể hiện chính kiến nhiều hơn.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tài vận hanh thông, giỏi quản lý — đặc biệt vượng nếu hội đủ cách "Tài Ấm giáp Ấn" (Cự Môn Hóa Lộc + Thiên Lương giáp cung), khi đó tài chính vừa dồi dào vừa được che chở an toàn, hiếm khi lâm cảnh túng thiếu.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Ít bệnh nặng, chủ yếu các vấn đề ngoài da hoặc huyết áp nhẹ — thể trạng nhìn chung ổn định nhờ lối sống điều độ, ít cực đoan (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Do dự (優柔寡斷 — *yōuróu guǎduàn*) khi phải ra quyết định lớn dù đã chuẩn bị kỹ lưỡng — bài học lớn nhất khi ở xa nhà là cần dứt khoát đúng lúc thay vì chờ đợi sự hoàn hảo tuyệt đối trước khi hành động.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Phải đến trung niên mới thực sự được bạn bè giúp gây dựng cơ nghiệp — quan hệ xã hội của Thiên Tướng cần thời gian tích lũy uy tín mới sinh lợi ích thiết thực, không có kiểu "quý nhân đến sớm".

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp nghề điều phối/trung gian: bảo hiểm, tư vấn, môi giới, quản lý vận hành — bất kỳ vai trò nào cần đứng giữa để kết nối và thực thi đều phù hợp với bản chất "chưởng ấn quan" của Thiên Tướng hơn là vai trò khởi xướng độc lập.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Tích lũy nhờ chăm chỉ, không sẵn có nhưng bền — sản nghiệp xây dựng từng bước theo thời gian, phù hợp tư duy "tiết kiệm rồi mới đầu tư" hơn là mạo hiểm vay mượn lớn.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Phúc vận mạnh, sống thọ, an nhàn — một trong những vị trí nội tâm bình yên nhất trong 14 chính tinh, ít xung đột nội tại nhờ bản chất trung dung, không cực đoan về bất cứ hướng nào.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ sáng suốt, hướng dẫn khôn ngoan — mô hình giáo dục cân bằng giữa kỷ luật và thấu hiểu, tạo nền tảng tâm lý ổn định cho con cái từ nhỏ.
## 3. Tứ Hóa: Không có — luận qua Tứ Hóa của Cự Môn/Thiên Lương lân cận.` },
  { label: "Cự Môn", body: `# CỰ MÔN (巨門 — jù mén — the "Great Gate"/Shadow Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Năng ngôn thiện đạo | 能言善道 | néng yán shàn dào | **Năng** (giỏi) + **Ngôn** (nói) + **Thiện** (khéo) + **Đạo** (diễn đạt) → "giỏi ăn nói, khéo diễn đạt" | eloquent |
| Minh Nhật củng chiếu | 明日拱照 | míng rì gǒngzhào | **Minh** (sáng) + **Nhật** (mặt trời) + **Củng** (chầu về) + **Chiếu** (chiếu rọi) → "được vầng dương sáng chiếu tới" | bright sun shining in support |
| Thạch trung ẩn ngọc | 石中隱玉格 | shí zhōng yǐn yù gé | **Thạch** (đá) + **Trung** (trong) + **Ẩn** (ẩn giấu) + **Ngọc** (ngọc quý) → "viên ngọc ẩn trong đá" | jade hidden within stone |
| Nam Đẩu chủ sinh | 南斗主生 | nándǒu zhǔ shēng | **Nam** (phương nam) + **Đẩu** (chòm sao) + **Chủ** (cai quản) + **Sinh** (sự sống) → "chòm Nam Đẩu cai quản sự sinh" | Southern Dipper governs life |
| Bắc Đẩu chủ tử | 北斗主死 | běidǒu zhǔ sǐ | **Bắc** (phương bắc) + **Đẩu** (chòm sao) + **Chủ** (cai quản) + **Tử** (cái chết) → "chòm Bắc Đẩu cai quản sự chết" | Northern Dipper governs death |
| Hắc động | 黑洞 | hēidòng | **Hắc** (đen) + **Động** (hang, lỗ) → "hố đen, hút và che khuất mọi thứ" | black hole |

## 1. Bản chất
- Ngũ hành: Âm Thủy pha Thổ (癸水, lược hàm Thổ tính)
- Hóa khí: "Ám" (暗 — *àn* — u ám)
- Bắc Đẩu đệ nhị tinh — sao "chất vấn", thị phi, hoài nghi, phân tích
- Điển tích: Mã Thiên Kim (馬千金 — *mǎ qiānjīn*), vợ Khương Tử Nha — "thần thị phi"
- Lục thân duyên mỏng nói chung, không đại diện riêng vai vế cụ thể


Hóa khí "Ám" của Cự Môn không đơn thuần là "xấu" — trong nguyên nghĩa, Ám là trạng thái CHƯA ĐƯỢC CHIẾU SÁNG, tức tiềm năng phân tích/hoài nghi chưa được dẫn dắt đúng hướng. Đây là lý do toàn bộ vận mệnh của Cự Môn xoay quanh một câu hỏi duy nhất: sao này có được Thái Dương chiếu vào hay không. Có — hoài nghi biến thành phân tích sắc bén, thị phi biến thành hùng biện thuyết phục. Không — cùng một năng lực đó quay ngược lại phá hoại chính người sở hữu nó dưới dạng đa nghi, cãi vã, thị phi không hồi kết. Ít có chính tinh nào mà toàn bộ "chất" phụ thuộc gắt gao vào một điều kiện bên ngoài như vậy.
## Nguyên lý nền
Cự Môn không tự phát sáng — cần Thái Dương chiếu vào để "giải Ám": cách "Minh Nhật củng chiếu" (明日拱照 — *míng rì gǒngzhào*) khi đồng cung/tam hợp Thái Dương vượng (Dần tốt hơn Thân) → hoài nghi thành phân tích sắc bén, thị phi thành hùng biện.

**"Thạch trung ẩn ngọc"** (石中隱玉格 — *shí zhōng yǐn yù gé*): Cự Môn độc tọa Tý (đẹp hơn Ngọ vì tam hợp Thái Dương tại Thìn vượng hơn Tuất) — ngọc ẩn trong đá, cần mài giũa (vất vả trẻ) mới sáng (thành công trung niên). Đặc biệt: đạt đỉnh cao thì KHÔNG nên phô trương — càng giữ kín càng bền, vì bản chất "Ám" vẫn tiềm ẩn, phô trương dễ thành mục tiêu công kích.


- Triết lý Đạo giáo "Nam Đẩu chủ sinh, Bắc Đẩu chủ tử" (南斗主生 — *nándǒu zhǔ shēng*，北斗主死 — *běidǒu zhǔ sǐ*) — Cự Môn thuộc Bắc Đẩu nên sắc bén, chức năng vạch trần sự thật.
- Cơ chế cấu trúc: Phúc Đức cung của Cự Môn LUÔN LÀ Thiên Lương → tiềm thức luôn hướng thiện dù lời nói dễ gây hiểu lầm.
- Ẩn dụ "hố đen" (黑洞 — *hēidòng*): sao đồng cung bị Cự Môn hút vào và che khuất đặc tính.
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Cự Môn thủ Mệnh cho khả năng ăn nói sắc sảo (能言善道 — *néng yán shàn dào*), dễ mất lòng khi còn trẻ nhưng lời nói luôn có logic/chiều sâu thật sự chứ không phải nói suông. Đồng cung Thiên Cơ (Mão/Dậu): khéo tranh luận, tư duy nhanh nhưng tình cảm phức tạp vì cả hai đều thiên về phân tích hơn cảm xúc. Đồng cung Thái Dương (Dần/Thân — "Dương Cự"): Dần tốt hơn Thân vì Thái Dương tại Dần vượng hơn, giúp giải Ám hiệu quả hơn. Đồng cung Thiên Đồng (Sửu/Mùi): cổ ngữ gọi là "hạ cách" nếu thiếu Lộc đi kèm, vì Ám gặp một sao quá hiền hòa dễ thiếu động lực chuyển hóa hoài nghi thành hành động. Toàn bộ vận mệnh của Mệnh Cự Môn xoay quanh câu hỏi: có Thái Dương đủ vượng hội chiếu để giải Ám hay không.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Không thuận, khó nhận hỗ trợ thực chất từ anh em — quan hệ dễ có hiểu lầm do lời ăn tiếng nói thẳng thắn của Cự Môn dễ bị hiểu nhầm thành công kích, dù bản ý không phải vậy.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Sở hữu dục mạnh, dễ ghen, cãi vã — nữ mệnh nên lấy chồng lớn tuổi hơn nhiều để cân bằng sự sắc sảo bằng độ chín chắn của đối phương. Hôn nhân Cự Môn cần cả hai bên học cách "cãi nhau đúng cách" — tranh luận để hiểu nhau thay vì để thắng thua.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con hay bộc lộ bất mãn bằng lời nói nhưng giỏi biện luận — cha mẹ nên hướng năng lực ngôn ngữ này vào các hoạt động tranh biện/học thuật có tổ chức thay vì để nó chỉ dừng ở cãi vã trong gia đình.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Ham vật chất, muốn tự kiếm bằng chính năng lực bản thân; đường tài vất vả, không nên đặt mục tiêu quá cao ngay từ đầu mà cần tích lũy dần qua uy tín chuyên môn — đặc biệt các nghề "dùng miệng" mang lại tài lộc bền vững hơn kinh doanh hàng hóa hữu hình.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Hệ tiêu hóa — viêm dạ dày/ruột, sa dạ dày, táo bón — ứng với hành Thủy pha Thổ và tính "u uất" tích tụ nếu lời nói/cảm xúc không được giải tỏa đúng cách (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Thích tranh luận, hùng biện giỏi khi ra ngoài nhưng lời sắc bén dễ bất lợi lâu dài nếu không biết tiết chế — đây là cung cần đặc biệt cẩn trọng vì Cự Môn xung chiếu thẳng vào Mệnh, dễ khiến thị phi từ bên ngoài quay ngược ảnh hưởng bản thân.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Quan hệ tốt về nội dung nhưng dễ khẩu chiến về hình thức — bạn bè đánh giá cao sự thẳng thắn của Cự Môn nhưng đôi khi khó chịu với cách diễn đạt quá trực diện, cần khéo léo hơn trong cách truyền đạt.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Nghề "dùng miệng" phát huy tối đa: giáo sư, luật sư, chính trị gia (nam); giáo viên, chăm sóc trẻ, tư vấn (nữ) — bất kỳ nghề nghiệp nào biến năng lực phân tích/hoài nghi thành giá trị thuyết phục người khác đều là mảnh đất lý tưởng cho Cự Môn tại Quan Lộc.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Đề phòng thị phi liên quan bất động sản — tranh chấp giấy tờ, ranh giới, hàng xóm dễ xảy ra hơn các chính tinh khác; nên minh bạch hợp đồng ngay từ đầu để tránh rắc rối pháp lý về sau.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Vất vả mà thu hoạch không tương xứng — vị trí kém thuận lợi nhất của Cự Môn, vì đầu óc luôn hoạt động phân tích/hoài nghi khiến tâm trí khó thực sự nghỉ ngơi. Cần chủ động luyện tập buông bỏ (thiền, viết nhật ký) để cân bằng.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ coi trọng vật chất, khắt khe, áp lực lớn — mô hình giáo dục thiên về kỷ luật và kỳ vọng thành tích, đôi khi khiến con cái cảm thấy tình yêu thương gắn liền với điều kiện phải đạt được.
## 3. Tứ Hóa (Lộc: Tân 辛 — *xīn* | Quyền: Quý 癸 — *guǐ* | Kỵ: Đinh 丁 — không Khoa)
| Cung | Lộc | Quyền | Kỵ |
|---|---|---|---|
| Mệnh | Kinh doanh giỏi, ăn nói khéo | Quản lý tốt, khéo nói | Phản nghịch, khẩu thiệt, tai họa vô cớ |
| Huynh Đệ | Thích kết giao | Anh em giỏi ăn nói, đừng tranh cãi | Dễ khẩu chiến với anh em |
| Phu Thê | Hợp làm người yêu hơn vợ/chồng | Phối ngẫu sắc sảo, cần nhường | Bất đồng, xung khắc sự nghiệp |
| Tử Tức | Con ăn nói giỏi | Con giỏi tranh biện | Khoảng cách thế hệ |
| Tài Bạch | Cần giao tế mới có tài | Lấy miệng làm nghề | Xung đột vì tiền |
| Tật Ách | Có khẩu phúc | Không nên uống rượu | Không hợp rượu, dễ mất kiểm soát |
| Thiên Di | Thích giao tế ẩm thực | Lấy miệng làm nghề, dễ mất lòng | Đề phòng thị phi |
| Giao Hữu | Có khẩu phúc | Bạn ăn nói sắc bén | Dễ mất lòng bạn |
| Quan Lộc | Nghề "miệng" có sức cạnh tranh | Lời có trọng lượng, hợp luật/thẩm phán | Nhiều thị phi công việc |
| Điền Trạch | Nhà có bếp lớn | Thích thể hiện ý kiến | Chú ý hòa thuận gia đình |
| Phúc Đức | Có khẩu phúc | Về già khó buông danh lợi | Về già không khẩu phúc |
| Phụ Mẫu | Hợp chuyện với cha mẹ | Cha mẹ hay khẩu thiệt | Khoảng cách thế hệ |` },
  { label: "Thiên Đồng", body: `# THIÊN ĐỒNG (天同 — tiān tóng — the Blessing Star)

## Từ vựng

| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Ích Phúc Bảo Sinh | 益福保生 | yì fú bǎo shēng | **Ích** (tăng thêm) + **Phúc** (phúc lộc) + **Bảo** (bảo vệ) + **Sinh** (sự sống) → "tăng phúc, bảo vệ sự sống" | blessing & protection of life |
| An phận | 安分 | ān fèn | **An** (yên) + **Phận** (bổn phận, phần mình) → "yên với phận mình" | contentment |
| Khoan hòa | 寬和 | kuān hé | **Khoan** (rộng lượng) + **Hòa** (hòa nhã) → "rộng lượng, hòa nhã" | gentle, tolerant |
| Thích nghi | 適應 | shìyìng | **Thích** (thích hợp) + **Ứng** (đáp ứng) → "thích hợp, đáp ứng hoàn cảnh" | adaptable |
| Phản giả đạo chi động | 反者道之動 | fǎn zhě dào zhī dòng | **Phản** (đảo ngược) + **Giả** (điều mà) + **Đạo** (Đạo) + **Chi** (của) + **Động** (vận động) → "cái ngược lại là sự vận động của Đạo" (Đạo Đức Kinh) | reversal is the movement of the Dao |
| Như ngư đắc thủy | 如魚得水 | rú yú dé shuǐ | **Như** (như là) + **Ngư** (cá) + **Đắc** (được) + **Thủy** (nước) → "như cá gặp nước" | like a fish finding water |

## 1. Bản chất

- Ngũ hành: Dương Thủy (壬水 — *rén shuǐ*)
- Hóa khí (化氣 — *huàqì*): **"Phúc"** (福 — *fú* — phúc phần, phúc lộc, hưởng thụ tự nhiên — tiếng Anh: **blessing**)
- Nam Đẩu đệ tứ tinh (南斗第四星 — *nándǒu dì sì xīng*); là sao chủ của cung Phúc Đức/Tật Ách (theo bảng "sao chủ cung" ở tab Phương pháp luận)
- Đồng minh tự nhiên: thường đồng cung hoặc hội cùng Thiên Lương, tạo cách "Đồng Lương" nổi tiếng (xem mục Nguyên lý nền)
- Điển tích: theo một số nguồn phổ biến, hình tượng Thiên Đồng được liên hệ với bậc trưởng thượng khoan hòa trong Phong Thần Diễn Nghĩa; tuy vậy các trường phái không thống nhất tuyệt đối về nhân vật cụ thể, khác với các sao như Tử Vi (Bá Ấp Khảo) hay Thiên Lương (Lý Tĩnh) vốn có điển tích rõ ràng hơn.
- Đại diện nhân sự: trẻ nhỏ, con cái; người có tính cách hiền hòa, dễ mến trong gia đạo.
- Đặc tính riêng: độ sáng của Thiên Đồng biến đổi gần như "ngược đời" so với trực giác thông thường — tuổi trẻ chủ về Phúc (hưởng nhàn), tuổi già lại chủ về Thọ (sống lâu, an nhàn thực sự). Miếu tại Dần, Thân; Vượng tại Tý; phần lớn các cung còn lại (Thìn, Tuất, Sửu, Mùi, Ngọ, Dậu) ở mức Hãm — đây là một trong những chính tinh có biên độ miếu/hãm rộng và bất đối xứng nhất trong 14 chính tinh.

## Nguyên lý nền

Thiên Đồng là sao "hưởng phúc" thuần túy — khác về bản chất với các sao tạo giá trị bằng hành động chủ động (Thái Dương "chiếu rọi"), quyết đoán giành lấy (Vũ Khúc "tài động") hay mưu lược tính toán (Thiên Cơ). Thiên Đồng tạo giá trị bằng năng lực AN được với hoàn cảnh — một dạng trí tuệ buông bỏ tranh đấu không cần thiết, không phải sự thụ động tiêu cực. Đây chính là lý do Thiên Đồng dễ bị đọc sai thành "lười biếng" (xem lỗi phổ biến #3 ở tab Phương pháp luận: *"Mệnh có Thiên Đồng → chắc chắn lười"* là một kết luận vội vàng, bỏ qua đồng cung/Hóa Quyền/Đại Vận).

- Danh hiệu đầy đủ **"Ích Phúc Bảo Sinh"** (益福保生 — *yì fú bǎo shēng*) — chức năng phòng ngừa hơn chữa trị.
- Triết lý Đạo gia **"phản giả đạo chi động"** (反者道之動 — *fǎn zhě dào zhī dòng*, Đạo Đức Kinh) — phúc không bao giờ dễ dàng mà đến; đây cũng là lời giải thích vì sao Thiên Đồng phần lớn cung là Hãm địa (phúc phải qua thử thách mới bền), chỉ một vài vị trí thực sự Miếu/Vượng.
- Vị trí tối ưu là cung **Phúc Đức** (không phải Mệnh) — tại Mệnh tính lười cản trở hành động; tại Phúc Đức thì **"như cá gặp nước"** (如魚得水 — *rú yú dé shuǐ*).

## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thiên Đồng thủ Mệnh cho tính cách hiền hòa, dễ thích nghi, thiên về hưởng thụ tinh thần hơn vật chất. Nhược điểm kinh điển là thiếu động lực bứt phá nếu không có Hóa Quyền hoặc sát tinh hữu chế đi kèm để tạo áp lực hành động — đúng như lỗi phổ biến #3 ở tab Phương pháp luận đã cảnh báo, "Mệnh có Thiên Đồng → chắc chắn lười" là kết luận vội vàng nếu bỏ qua các yếu tố đi cùng. Đồng cung với Thái Âm (Tý) tạo cách "Thủy trừng quế ngạc" thiên về thanh khiết/học vấn; đồng cung Cự Môn (Sửu/Mùi) hoặc Thiên Lương (Dần/Thân — "Đồng Lương") mỗi tổ hợp mang một sắc thái khác biệt, nhưng điểm chung là Thiên Đồng luôn cần một sao "có góc cạnh" đi kèm để cân bằng sự mềm mỏng bẩm sinh.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Anh chị em hòa thuận, ít xung đột — quan hệ nhẹ nhàng, dựa trên thiện cảm tự nhiên nhưng không nhất thiết sâu đậm về mặt gắn kết lâu dài, dễ nhạt dần nếu không chủ động duy trì liên lạc.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Phối ngẫu dịu dàng, biết chăm sóc — đời sống hôn nhân thiên về ổn định êm ả hơn là nồng nhiệt. Đây là một trong những vị trí hôn nhân "an toàn" nhất trong 14 chính tinh, nhưng cần bổ sung thêm sự chủ động/lãng mạn để tránh cuộc sống chung trở nên tẻ nhạt theo thời gian.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cái ngoan hiền, quan hệ cha mẹ - con cái ấm áp, ít áp lực kỷ luật — môi trường nuôi dạy khoan dung, tạo cảm giác an toàn cho trẻ nhưng cần bổ sung thêm tính kỷ luật để trẻ phát triển ý chí.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tài vận đến từ từ, ổn định, không đột biến — hợp tích lũy dài hạn hơn đầu tư mạo hiểm. Đây là kiểu tài vận "chậm mà chắc" đúng bản chất "Phúc" — tiền đến như một hệ quả tự nhiên của sự an ổn, không phải từ tranh đấu quyết liệt.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Hệ tiêu hóa/nội tiết cần lưu tâm khi hãm địa; nhìn chung sức khỏe cải thiện dần theo tuổi — đúng quy luật "tuổi trẻ chủ Phúc, tuổi già chủ Thọ" đã nêu ở Bản chất (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Ra ngoài dễ được giúp đỡ nhẹ nhàng — môi trường xa nhà thường khiến Thiên Đồng thoải mái hơn ở nhà, vì thoát khỏi những ràng buộc quen thuộc và có cơ hội "làm mới" bản thân trong hoàn cảnh mới.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn bè hiền lành, quan hệ dựa trên thiện cảm tự nhiên hơn là lợi ích — dễ kết bạn nhưng cũng dễ bị lợi dụng lòng tốt nếu không đủ tỉnh táo phân biệt bạn thật và người chỉ muốn nhờ vả.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp môi trường ổn định, ít cạnh tranh khốc liệt; cần Hóa Quyền hoặc sao động lực khác để không bị trì trệ sự nghiệp. Thiên Đồng tại Quan Lộc phát huy tốt trong các tổ chức có hệ thống rõ ràng, nơi không đòi hỏi phải liên tục tranh đấu để tồn tại.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
An cư từ tốn, không vội vàng nhưng bền — nhà cửa thiên về ấm cúng hơn phô trương, phản ánh đúng gu thẩm mỹ giản dị, ưu tiên sự thoải mái hơn hình thức.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Vị trí đắc nhất của Thiên Đồng — đời sống nội tâm an nhàn, ít lo âu, phúc thọ song toàn nếu miếu vượng, đúng như "như cá gặp nước" đã nêu ở Nguyên lý nền. Đây là một trong những cách cục hạnh phúc nội tâm viên mãn nhất trong toàn bộ 14 chính tinh.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Quan hệ cha mẹ - con cái nhẹ nhàng, cha mẹ có xu hướng nuông chiều hơn nghiêm khắc — môi trường lớn lên thoải mái nhưng đôi khi thiếu định hướng kỷ luật cần thiết cho giai đoạn trưởng thành.
## 3. Tứ Hóa (Lộc: Bính 丙 — *bǐng* | Quyền: Đinh 丁 — *dīng* | Kỵ: Canh 庚 — *gēng* — không Khoa)

| Cung | Lộc | Quyền | Kỵ |
|---|---|---|---|
| Mệnh | Hưởng phúc tự nhiên, tính tình dễ chịu | Có động lực hành động hơn, bớt an phận | Nội tâm bất an, dễ đổi ý, thành quả không bền |
| Huynh Đệ | Anh em hòa thuận, hỗ trợ nhẹ nhàng | Anh em có người nổi bật hơn | Anh em ít gắn bó, dễ hiểu lầm |
| Phu Thê | Hôn nhân êm ấm | Phối ngẫu chủ động hơn trong quan hệ | Đời sống hôn nhân dễ nhạt, cần vun đắp |
| Tử Tức | Con cái ngoan, duyên lành | Con có chủ kiến riêng | Duyên con cái mỏng hơn, cần kiên nhẫn |
| Tài Bạch | Tài lộc đến nhẹ nhàng, đều đặn | Quản lý tài chính chủ động hơn | Tài vận bấp bênh, hao hụt vặt |
| Tật Ách | Sức khỏe ổn định, ít bệnh nặng | Cần chú ý vận động, tránh trì trệ | Cần lưu tâm tiêu hóa/nội tiết |
| Thiên Di | Ra ngoài thuận lợi, gặp thiện duyên | Chủ động hơn khi ở xa nhà | Ra ngoài dễ gặp trắc trở nhỏ |
| Giao Hữu | Bạn bè giúp đỡ nhẹ nhàng | Có bạn giữ vai trò dẫn dắt | Quan hệ bạn bè dễ nông cạn |
| Quan Lộc | Công việc ổn định, ít căng thẳng | Có cơ hội thăng tiến rõ hơn | Sự nghiệp dễ trì trệ, thiếu đột phá |
| Điền Trạch | An cư thuận lợi | Chủ động sửa sang, mở rộng nhà cửa | Bất động sản biến động, cần thận trọng |
| Phúc Đức | Đời sống an nhàn, phúc thọ | Tinh thần chủ động, lạc quan | Nội tâm dễ lo âu vặt vãnh |
| Phụ Mẫu | Cha mẹ hiền hòa, quan hệ ấm áp | Cha mẹ có chủ kiến, quản lý con cái nhiều hơn | Duyên cha mẹ - con cái nhạt hơn |` },
  { label: "Thiên Lương", body: `# THIÊN LƯƠNG (天梁 — tiān liáng — the Elder Star)

## Từ vựng

| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Y Dược tinh | 醫藥星 | yī yào xīng | **Y** (chữa bệnh) + **Dược** (thuốc) + **Tinh** (sao) → "sao thầy thuốc, chuyên cứu chữa" | the Healer Star |
| Nghiêm dĩ luật nhân, khoan dĩ đãi kỷ | 嚴以律人，寬以待己 | yán yǐ lǜ rén, kuān yǐ dài jǐ | **Nghiêm** (nghiêm khắc) + **Dĩ** (dùng để) + **Luật** (ràng buộc) + **Nhân** (người khác), **Khoan** (khoan dung) + **Dĩ** (dùng để) + **Đãi** (đối đãi) + **Kỷ** (bản thân) → "nghiêm với người, khoan với mình" | strict on others, lenient on self |
| Ân trạch | 恩澤 | ēn zé | **Ân** (ơn huệ) + **Trạch** (nhuần thấm) → "ơn huệ ban phát rộng khắp" | grace, favor bestowed |
| Cố vấn | 顧問 | gùwèn | **Cố** (trông nom, xem xét) + **Vấn** (hỏi han) → "người tư vấn, chỉ dẫn" | advisor, counselor |
| Thác Tháp Thiên Vương | 托塔天王 | tuō tǎ tiānwáng | **Thác** (nâng đỡ) + **Tháp** (bảo tháp) + **Thiên** (trời) + **Vương** (vua) → "Thiên Vương nâng bảo tháp" (tên hiệu Lý Tĩnh) | Pagoda-Bearing Heavenly King |
| Phúc Ấm tụ | 福蔭聚 | fú yìn jù | **Phúc** (phúc lành) + **Ấm** (che chở) + **Tụ** (hội tụ) → "phúc lành và che chở cùng hội tụ" | blessing and shelter converging |

## 1. Bản chất

- Ngũ hành: Dương Thổ (戊土 — *wù tǔ*)
- Hóa khí (化氣 — *huàqì*): **"Ấm"** (蔭 — *yìn* — che chở, ân trạch của bậc trên dành cho kẻ dưới — tiếng Anh: **shelter/protection**)
- Nam Đẩu đệ nhị tinh (南斗第二星 — *nándǒu dì èr xīng*); doc gọi là **"Y Dược tinh"** (醫藥星 — *yīyào xīng*) vì chức năng cứu chữa sau sự cố, không phải phòng ngừa từ đầu (khác Thiên Đồng "Ích Phúc" thiên về phòng ngừa).
- Điển tích: chính xác là **Lý Tĩnh** (李靖 — *lǐ jìng*) — tức **"Thác Tháp Thiên Vương"** (托塔天王 — *tuō tǎ tiānwáng*), vị tướng có ba con trai Kim Tra, Mộc Tra, Na Tra trong Phong Thần Diễn Nghĩa; hình tượng một bậc trưởng bối uy nghiêm nhưng che chở.
- Đại diện nhân sự: người lớn tuổi, cấp trên đáng kính, quý nhân cứu giúp lúc hoạn nạn.
- Đặc tính riêng: Miếu tại Thìn, Ngọ, Tuất (theo cách gọi dân gian "Long — Mã — Cẩu"); vượng/đắc rải rác các cung còn lại — nhìn chung Thiên Lương ít khi hãm nặng như Thái Dương/Thái Âm, phản ánh đúng bản chất "che chở" ít khi hoàn toàn mất tác dụng.

## Nguyên lý nền

Thiên Lương mang nghịch lý đạo đức đặc trưng: **"nghiêm dĩ luật nhân, khoan dĩ đãi kỷ"** (嚴以律人 — *yán yǐ lǜ rén*，寬以待己 — *kuān yǐ dài jǐ*) — nghiêm khắc với người, nhưng lại dễ dãi với bản thân — đảo ngược chuẩn mực Nho gia thông thường (vốn đề cao "nghiêm dĩ luật kỷ, khoan dĩ đãi nhân"). Đây là hệ quả trực tiếp của việc đóng vai "người phân xử/che chở" quá lâu: đứng trên cao để phán xét người khác dễ khiến bản thân quên tự soi lại mình. Vì vậy, Thiên Lương tuy là sao cát tường bậc nhất về mặt cứu giải tai ách, nhưng cũng là sao dễ sinh tính cô độc, khó gần nếu không được tiết chế bởi các sao mềm mại đi kèm.

- **"Đồng Lương" cách** (同梁格 — *tóng liáng gé*) tại Dần/Thân: **"Phúc Ấm tụ hội"** (福蔭聚 — *fú yìn jù*), hai sao Thiên Đồng + Thiên Lương bổ khuyết hoàn hảo cho nhau — Thiên Đồng lo hưởng phúc, Thiên Lương lo che chở/xử lý sự cố, kết hợp tạo ra một cách cục ổn định, ít cực đoan.
- Thiên Lương giữ vai trò một trong hai "gọng kìm" của cách **"Tài Ấm giáp Ấn" / "Hình Kỵ giáp Ấn"** — vì theo quy luật an sao cố định, Thiên Tướng luôn tọa lạc kẹp giữa Cự Môn và Thiên Lương (xem chi tiết cơ chế này ở tab Thiên Tướng). Khi Cự Môn Hóa Lộc, Thiên Lương cùng Cự Môn tạo thế giáp cát cho Thiên Tướng; khi Cự Môn Hóa Kỵ, chính Thiên Lương lại là bên "biến Hình" khiến Thiên Tướng dễ vướng pháp lý.
- Đặc biệt: Thiên Lương là một trong số ít chính tinh **KHÔNG BAO GIỜ mang Hóa Kỵ** trong hệ thống Tứ Hóa truyền thống (xem bảng bên dưới) — nhất quán với bản chất "cứu giải", một sao chuyên đi gỡ rối thì hiếm khi tự nó là nguồn gốc của rắc rối.

## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thiên Lương thủ Mệnh cho phong thái điềm đạm, nguyên tắc, có uy với người xung quanh — thích đóng vai trò cố vấn/phân xử hơn là người trực tiếp thực thi. Nhược điểm là dễ cô độc, khó thân cận vì tiêu chuẩn đặt ra cho người khác thường cao hơn cho chính bản thân — đúng nghịch lý "nghiêm dĩ luật nhân, khoan dĩ đãi kỷ" đã nêu ở Nguyên lý nền. Cách "Đồng Lương" (Dần/Thân, đồng cung Thiên Đồng) là tổ hợp lý tưởng nhất, cân bằng giữa hưởng phúc và che chở; độc tọa tại Thìn/Tuất/Ngọ (miếu) thường cho khí chất uy nghiêm rõ rệt hơn.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Anh chị em có người đóng vai trò "anh cả/chị cả" che chở cho cả nhà — thường là người đứng ra dàn xếp mâu thuẫn, được các thành viên khác tin tưởng giao phó trách nhiệm quan trọng.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Phối ngẫu chững chạc, đáng tin cậy, thường lớn tuổi hơn hoặc chín chắn hơn so với tuổi thực — hôn nhân mang tính "nương tựa" rõ rệt, một trong hai người thường đóng vai trò che chở, dẫn dắt người còn lại.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cái được dạy dỗ nghiêm khắc, coi trọng nguyên tắc, có thể hơi xa cách tình cảm — cha mẹ Thiên Lương nên chủ động thể hiện tình thương bằng lời nói, không chỉ qua hành động che chở âm thầm.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tài vận đến từ uy tín/chuyên môn được công nhận (y dược, tư vấn, phân xử) hơn là kinh doanh mạo hiểm — dòng tiền đi liền với danh tiếng cá nhân, càng làm lâu càng ổn định vì được tín nhiệm ngày một nhiều.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Theo đúng "Y Dược tinh", cung này thường phản ánh khả năng phục hồi tốt sau bệnh tật/sự cố — dù gặp vấn đề sức khỏe, Thiên Lương tại Tật Ách thường có "quý nhân y tế" hoặc khả năng tự chữa lành đáng chú ý (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Ra ngoài dễ gặp quý nhân lớn tuổi cứu giúp lúc khó khăn, hợp vai trò cố vấn ở đất khách — đây là một trong những vị trí "được che chở" mạnh nhất khi xa nhà trong toàn bộ 14 chính tinh.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn bè phần lớn là người đáng tin cậy, có thể nhờ cậy lúc hoạn nạn dù số lượng không nhiều — Thiên Lương chọn bạn theo chất lượng, không chạy theo số đông hời hợt.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp nghề y dược, luật, thanh tra/kiểm toán, cố vấn, tôn giáo — bất kỳ nghề nào cần đứng ra phân xử, cứu giúp, hoặc giám sát đạo đức nghề nghiệp đều là mảnh đất phát huy tối đa năng lực Thiên Lương.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Sản nghiệp có được từ uy tín cá nhân, thường bền vì được xây dựng cẩn trọng từng bước — ít khi liều lĩnh đầu tư ngoài khả năng, ưu tiên an toàn hơn tốc độ tăng trưởng.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
An nhàn, được kính trọng lúc về già, đời sống tinh thần có chiều sâu đạo lý — đây là hình ảnh "bậc trưởng bối khả kính" thu nhỏ trong chính đời sống nội tâm, ít hối tiếc vì luôn sống đúng nguyên tắc bản thân đặt ra.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ nghiêm khắc nhưng che chở thật lòng; quan hệ có thể thiếu sự gần gũi bộc lộ nhưng luôn đầy trách nhiệm — tình thương thể hiện qua hành động bảo vệ hơn là lời nói ngọt ngào.
## 3. Tứ Hóa (Lộc: Nhâm 壬 — *rén* | Quyền: Ất 乙 — *yǐ* | Khoa: Kỷ 己 — không bao giờ Hóa Kỵ)

| Cung | Lộc | Quyền | Khoa |
|---|---|---|---|
| Mệnh | Uy tín tự nhiên, được kính trọng | Quyết đoán trong vai trò phân xử/cố vấn | Danh tiếng gắn với đạo đức, học vấn |
| Huynh Đệ | Anh em được nhờ cậy, có uy tín | Anh em có người giữ vai trò dẫn dắt | Anh em được nể trọng |
| Phu Thê | Phối ngẫu đáng tin cậy, hôn nhân bền | Phối ngẫu có chính kiến, chững chạc | Phối ngẫu được nể trọng, hôn nhân êm đềm |
| Tử Tức | Con cái được nhờ cậy về sau | Con có nguyên tắc, chững chạc sớm | Con cái học vấn tốt |
| Tài Bạch | Tài lộc từ uy tín/chuyên môn | Quản lý tài chính có nguyên tắc | Tài chính minh bạch, được tin tưởng |
| Tật Ách | Khả năng hồi phục tốt | Cẩn trọng quá mức có thể gây căng thẳng | Gặp nạn có quý nhân/thầy thuốc cứu giúp |
| Thiên Di | Ra ngoài được quý nhân giúp | Có tiếng nói, được nể trọng nơi xa | Ra ngoài gặp duyên lành, quý nhân |
| Giao Hữu | Bạn bè tin cậy, giúp đỡ lẫn nhau | Có bạn giữ vai trò cố vấn cho mình | Bạn bè đáng kính trọng |
| Quan Lộc | Sự nghiệp gắn với uy tín, chuyên môn | Có thực quyền trong vai trò phân xử | Hợp công việc học thuật, y dược, luật |
| Điền Trạch | Sản nghiệp bền, xây dựng từ uy tín | Chủ động quản lý, mở rộng cơ nghiệp | Nhà cửa được xây dựng cẩn trọng, có tiếng |
| Phúc Đức | An nhàn, phúc thọ nhờ đức độ | Chủ động sắp xếp đời sống tinh thần | Được kính trọng, đời sống có chiều sâu |
| Phụ Mẫu | Cha mẹ được kính trọng, che chở tốt | Cha mẹ có uy, quản lý nghiêm | Quan hệ cha mẹ - con cái được nể trọng |` },
  { label: "Liêm Trinh", body: `# LIÊM TRINH (廉貞 — lián zhēn — the Chastity Star)

## Từ vựng

| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Thanh Bạch | 清白 | qīngbái | **Thanh** (trong sạch) + **Bạch** (trắng) → "trong sạch, liêm khiết" | incorruptible |
| Tự chế ước | 自我約束 | zìwǒ yuēshù | **Tự** (tự mình) + **Ngã** (bản thân) + **Ước** (ràng buộc) + **Thúc** (thúc ép) → "tự ràng buộc bản thân" | self-discipline |
| Quang minh lỗi lạc | 光明磊落 | guāngmíng lěiluò | **Quang** (sáng) + **Minh** (sáng rõ) + **Lỗi lạc** (ngay thẳng) → "ngay thẳng, quang minh" | open and aboveboard |
| Chấp pháp | 執法 | zhífǎ | **Chấp** (nắm giữ) + **Pháp** (pháp luật) → "thực thi pháp luật" | law enforcement |
| Liêm Trinh Thanh Bạch cách | 廉貞清白格 | lián zhēn qīngbái gé | **Liêm** (liêm khiết) + **Trinh** (chính trực) + **Thanh** (trong sạch) + **Bạch** (trắng) + **Cách** (cách cục) → "cách cục liêm khiết trong sạch" | Chastity Star's Pure & Upright pattern |
| Lộ Biên Mai Thi cách | 路邊埋屍格 | lù biān mái shī gé | **Lộ** (đường) + **Biên** (bên) + **Mai** (chôn) + **Thi** (xác) + **Cách** (cách cục) → "cách cục 'chôn xác bên đường' (tên gọi tượng trưng)" | "corpse buried roadside" pattern (symbolic name) |

## 1. Bản chất

- Ngũ hành: Âm Hỏa (丁火 — *dīng huǒ*)
- Hóa khí (化氣 — *huàqì*): **"Tù"** (囚 — *qiú* — giam cầm, hình pháp, kỷ luật — tiếng Anh: **the Prisoner/warden**)
- Bắc Đẩu đệ ngũ tinh (北斗第五星 — *běidǒu dì wǔ xīng*), đồng thời là một trong hai sao chủ Quan Lộc (Quan Lộc = Liêm Trinh/Vũ Khúc, theo bảng "sao chủ cung" ở tab Phương pháp luận).
- Thuộc nhóm "sao đào hoa thứ" (bên cạnh Tham Lang là "đào hoa chính") — mang tính hai mặt rõ rệt nhất trong 14 chính tinh: vừa có thể là hình quan chấp pháp nghiêm minh, vừa có thể là kẻ phóng túng, tùy vị trí miếu/hãm và tổ hợp đi cùng.
- Đại diện nhân sự: không có vai vế cố định rõ ràng như Thái Dương (cha) hay Thái Âm (mẹ) — Liêm Trinh chủ yếu phản ánh khía cạnh "quyền lực có tính cưỡng chế" trong các mối quan hệ (cấp trên nghiêm khắc, cơ quan công quyền).
- Đặc tính riêng: Miếu tại Dần, Mùi, Thân; Hãm tại Tị, Hợi — biên độ hẹp, phần lớn các cung còn lại ở mức Đắc/Bình, khiến Liêm Trinh hiếm khi cực đoan tuyệt đối theo một chiều duy nhất.

## Nguyên lý nền

Liêm Trinh là sao duy nhất trong 14 chính tinh mà hóa khí "Tù" vừa mang nghĩa đen (giam cầm, hình pháp) vừa mang nghĩa bóng (tự giam cầm chính mình trong nguyên tắc, kỷ luật). Chính vì vậy Liêm Trinh biểu hiện theo hai thái cực tùy vào việc kỷ luật đó hướng RA NGOÀI (chấp pháp người khác — dễ thành hình quan, thanh tra) hay hướng VÀO TRONG (tự kỷ luật bản thân — dễ thành người "Thanh Bạch" chính trực).

- **"Liêm Trinh Thanh Bạch cách"** (廉貞清白格 — *lián zhēn qīngbái gé*) khi Hóa Lộc: tự chế ước (自我約束 — *zìwǒ yuēshù*) cao nhất, quang minh lỗi lạc (光明磊落 — *guāngmíng lěiluò*) — đây là biểu hiện tốt nhất của Liêm Trinh, kỷ luật hướng vào bên trong.
- **"Lộ Biên Mai Thi cách"** (路邊埋屍格 — *lù biān mái shī gé*): tên gọi đáng sợ nhưng chỉ mô tả tính "nguyên tắc cao, thích kiểm soát" khi Liêm Trinh hãm và vô chế — không nên hiểu theo nghĩa đen.
- Liêm Trinh Hóa Lộc khác nhau đáng kể theo địa chi: Dậu (vui vẻ), Thân (thăng quan phát tài), Tuất (tiên bần hậu phú), Hợi (không cát dù Hóa Lộc) — minh chứng rõ nét cho nguyên tắc "Tam Phương Tứ Chính quyết định, không chỉ một sao đơn lẻ" ở tab Phương pháp luận.
- Vì đồng thời là một trong hai sao chủ Quan Lộc, Liêm Trinh khi tốt (miếu/vượng, có Hóa Lộc) rất hợp con đường công quyền, quân đội, luật pháp — nhưng khi xấu (hãm, Hóa Kỵ, sát tinh vô chế) lại dễ trở thành đối tượng BỊ chính hệ thống đó trừng phạt.

## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Liêm Trinh thủ Mệnh cho cá tính mạnh, quyết đoán, có khả năng lãnh đạo/chấp pháp — nhị nguyên rõ rệt giữa "chính trực nghiêm minh" và "cực đoan cố chấp" tùy vào miếu/hãm và sao đi cùng, đúng bản chất song trùng của hóa khí "Tù". Nếu đắc "Liêm Trinh Thanh Bạch cách" (có Hóa Lộc, tự chế ước cao), đây là một trong những cách cục chính trực đáng nể nhất; nếu hãm vô chế, dễ rơi vào cực đoan, cố chấp, dễ vướng thị phi/pháp lý.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Quan hệ anh em có thể căng thẳng nếu Liêm Trinh hãm, do tính cách nguyên tắc dễ va chạm với những khác biệt quan điểm trong gia đình — cần học cách phân biệt giữa "đúng nguyên tắc" và "cứng nhắc không cần thiết".

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Hôn nhân dễ có giai đoạn sóng gió, cần cả hai bên biết nhường nhịn; phối ngẫu thường có cá tính mạnh không kém, tạo ra động lực phát triển nhưng cũng dễ xung đột nếu cả hai đều không chịu lùi bước.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cái cá tính mạnh, cần phương pháp giáo dục kỷ luật nhưng không áp đặt cứng nhắc — nếu cha mẹ biết dẫn dắt đúng cách, năng lượng cương liệt của con sẽ chuyển hóa thành ý chí kiên định thay vì phản kháng.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tài vận có thể lớn nhưng đi kèm rủi ro pháp lý/tranh chấp nếu Liêm Trinh hãm hoặc Hóa Kỵ — nên đặc biệt cẩn trọng với hợp đồng, giấy tờ, và các khoản đầu tư liên quan đến quy định pháp luật phức tạp.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Liên quan tim mạch, huyết áp, hệ thần kinh — ứng với bản chất Hỏa "cương liệt" dễ tích tụ căng thẳng nội tại (biểu tượng học, không phải chẩn đoán y khoa); nên chú trọng các hoạt động thư giãn chủ động.

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Ra ngoài dễ gặp môi trường có tính cạnh tranh/kỷ luật cao; thành công nếu biết tận dụng khả năng chấp pháp/tổ chức — đây là môi trường Liêm Trinh phát huy bản lĩnh rõ rệt nhất, miễn là giữ được sự tự chế ước.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn bè có thể là người quyền lực nhưng quan hệ dễ căng thẳng nếu không khéo léo — nên chọn lọc kỹ những mối quan hệ có tính chất chính đáng, tránh vướng vào các nhóm dễ gây tranh chấp.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Cung đắc vị vì trùng vai trò sao chủ Quan Lộc — hợp công quyền, luật pháp, quân đội, quản lý cấp cao. Đây là vị trí Liêm Trinh phát huy tối đa: uy quyền chính đáng đi kèm khả năng chấp pháp nghiêm minh.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Sản nghiệp có thể biến động do liên quan đến tranh chấp/pháp lý nếu Liêm Trinh xấu cách — nên minh bạch giấy tờ, hợp đồng ngay từ đầu để tránh những rắc rối kéo dài về sau.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Nội tâm dễ căng thẳng, khó thư giãn hoàn toàn nếu Liêm Trinh hãm; cần học cách buông kỷ luật đúng lúc — đây là bài học cốt lõi: biết khi nào nên nghiêm khắc và khi nào nên cho phép bản thân nghỉ ngơi.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ nghiêm khắc, coi trọng quy tắc, quan hệ có thể thiếu sự mềm mại — mô hình giáo dục thiên về kỷ luật rõ ràng, tạo nền tảng vững chắc nhưng đôi khi thiếu không gian cho sự tự do cảm xúc.
## 3. Tứ Hóa (chỉ Lộc: Giáp 甲 — *jiǎ* | Kỵ: Bính 丙 — không Quyền/Khoa)

| Cung | Lộc | Kỵ |
|---|---|---|
| Mệnh | Chính trực, có uy, "Thanh Bạch cách" nếu đắc địa | Dễ vướng thị phi/pháp lý, cực đoan trong nguyên tắc |
| Huynh Đệ | Anh em hỗ trợ trong công việc chính đáng | Anh em dễ xung đột vì nguyên tắc |
| Phu Thê | Phối ngẫu có địa vị, hôn nhân khởi sắc | Hôn nhân dễ căng thẳng, cần kiên nhẫn |
| Tử Tức | Con cái có chí hướng công danh | Con cái cứng đầu, khó dạy bảo |
| Tài Bạch | Tài lộc từ con đường chính đáng, công quyền | Tài chính dễ vướng tranh chấp/pháp lý |
| Tật Ách | Thể chất cải thiện khi kỷ luật đúng mực | Cần chú ý tim mạch, huyết áp |
| Thiên Di | Ra ngoài thuận lợi trong môi trường có tổ chức | Ra ngoài dễ vướng thị phi |
| Giao Hữu | Bạn bè có địa vị, hỗ trợ chính đáng | Bạn bè dễ gây rắc rối pháp lý |
| Quan Lộc | Thăng tiến trong con đường công quyền/luật pháp | Sự nghiệp dễ vướng kỷ luật, tranh chấp |
| Điền Trạch | Sản nghiệp vững nhờ con đường chính đáng | Bất động sản dễ vướng tranh chấp |
| Phúc Đức | An tâm khi sống đúng nguyên tắc bản thân | Nội tâm căng thẳng, khó buông bỏ |
| Phụ Mẫu | Cha mẹ có địa vị, quan hệ đúng mực | Quan hệ cha mẹ - con cái căng thẳng |` },
  { label: "Tham Lang", body: `# THAM LANG (貪狼 — tān láng — the Greedy Wolf Star)

## Từ vựng

| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Đào Hoa | 桃花 | táohuā | **Đào** (cây đào) + **Hoa** (hoa) → "hoa đào, biểu tượng sức hút và duyên tình" | peach blossom (desire/charm) |
| Song trùng nhân cách | 雙重人格 | shuāngchóng réngé | **Song** (đôi) + **Trùng** (lớp, tầng) + **Nhân** (con người) + **Cách** (tính cách) → "hai lớp tính cách trong cùng một người" | dual personality |
| Thông minh hóa lụy | 聰明反被聰明誤 | cōngmíng fǎn bèi cōngmíng wù | **Thông minh** (khôn ngoan) + **Phản** (ngược lại) + **Bị** (bị) + **Thông minh** (khôn ngoan) + **Ngộ** (làm hại) → "khôn ngoan quay lại hại chính mình" | too clever for one's own good |
| Hưởng lạc | 享樂 | xiǎnglè | **Hưởng** (hưởng thụ) + **Lạc** (niềm vui) → "hưởng thụ khoái lạc" | hedonism |
| Hoa hủy | 花卉 | huāhuì | **Hoa** (hoa) + **Hủy** (cây cỏ) → "hoa cỏ — biểu tượng của Thiên Cơ, đối lập cây gỗ của Tham Lang" | flowers and grasses |
| Thạch Sùng | 石崇 | shí chóng | **Thạch** (họ Thạch) + **Sùng** (tên) → "đại phú gia thời Tây Tấn" | wealthy noble of the Western Jin |

## 1. Bản chất

- Ngũ hành: song trùng — ngoại thuộc Dương Mộc (甲木 — *jiǎ mù*), nội căn Âm Thủy (癸水 — *guǐ shuǐ*)
- Hóa khí (化氣 — *huàqì*): **"Đào Hoa"** (桃花 — *táo huā* — dục vọng, sức hút, ham muốn — tiếng Anh: **desire/peach blossom**)
- Bắc Đẩu đệ nhất tinh (北斗第一星 — *běidǒu dì yī xīng*) — sao đứng đầu chòm Bắc Đẩu Thất Tinh (Tham Lang, Cự Môn, Lộc Tồn, Văn Khúc, Liêm Trinh, Vũ Khúc, Phá Quân theo đúng thứ tự Bắc Đẩu cổ điển).
- Đối chiếu gần: cùng với Thiên Cơ là hai sao trí tuệ nhất trong 14 chính tinh, nhưng khác hướng — Tham Lang trí tuệ hướng ngoại (giành lấy, mở rộng), Thiên Cơ trí tuệ hướng nội (tính toán, hoạch định).
- Điển tích: theo một số nguồn, hình tượng Tham Lang gắn với đàn sói dữ canh giữ cổng miếu Đát Kỷ trong Phong Thần Diễn Nghĩa — biểu tượng cho bản năng nguyên thủy, vừa cảnh giác vừa hung hãn.
- Đại diện nhân sự: không có vai vế cố định; Tham Lang phản ánh khía cạnh ham muốn/dục vọng/tham vọng trong mọi mối quan hệ hơn là một vai trò gia đình cụ thể.
- Đặc tính riêng: Miếu tại Sửu, Mùi; Vượng tại Thìn, Tuất; Đắc tại Dần, Thân; Hãm tại Tị, Hợi, Tý, Ngọ, Mão, Dậu — Tham Lang có SỐ CUNG HÃM NHIỀU NHẤT trong 14 chính tinh (6/12 cung), phản ánh đúng bản chất "dục vọng khó được thỏa mãn trọn vẹn ở phần lớn hoàn cảnh".

## Nguyên lý nền

Tham Lang mang cơ chế song trùng nhân cách: **"ngoại thuộc Giáp Mộc, nội căn Quý Thủy"** (外屬甲木 — *wài shǔ jiǎ mù*，內裡屬癸水 — *nèilǐ shǔ guǐ shuǐ*) — vỏ ngoài chính trực, quang minh như cây gỗ vươn thẳng (Dương Mộc), nhưng gốc rễ lại phù đãng, biến ảo như dòng nước ngầm (Âm Thủy). Đây là gốc rễ của tính "song trùng đạo đức" nổi tiếng của Tham Lang: cùng một người có thể vừa rất nguyên tắc trong công việc, vừa rất buông thả trong ham muốn cá nhân — không phải giả dối, mà là hai tầng bản chất cùng tồn tại thật.

- So sánh với Thiên Cơ: Tham Lang là **"cây"** (樹木, Dương Mộc — vươn ra chiếm lĩnh không gian), Thiên Cơ là **"hoa cỏ"** (花卉 — *huāhuì*, Âm Mộc — mềm mại, thích nghi). Cả hai đều "trí tuệ" nhưng một bên chủ động bành trướng, một bên chủ động thích nghi.
- Vì gốc thuộc Thủy nên năng lượng chuyển hóa của Tham Lang là Đào Hoa, khiến sao này có xu hướng thiên về hưởng lạc, ưa cạnh tranh, nhiều tham vọng, và đôi khi "quá khôn khéo" đến mức phản tác dụng (thông minh hóa lụy).
- Nhân vật lịch sử dân gian thường được liên hệ: Thạch Sùng (石崇 — *shí chóng*), Quách Tử Nghi (郭子儀 — *guō zǐyí*) — đại diện cho trạng thái Tham Lang đắc cách: phú quý cực thịnh nhờ biết chuyển hóa dục vọng/tham vọng thành động lực chính đáng thay vì buông thả.
- Vì là sao "đào hoa chính" (khác Liêm Trinh "đào hoa thứ"), Tham Lang khi gặp Hỏa/Linh tinh đắc cách có thể tạo "Hỏa Tham"/"Linh Tham" — cát cách bộc phát nhanh, một trong những trường hợp hiếm hoi sát tinh đồng hành lại trở thành động lực tích cực (xem nguyên tắc "Sát tinh hữu chế" ở tab Phương pháp luận).

## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Tham Lang thủ Mệnh cho sự thông minh, đa tài, giỏi giao tế, nhiều tham vọng — nhược điểm là dễ phân tán năng lượng vào quá nhiều mục tiêu/ham muốn cùng lúc, thiếu kiên định nếu không có sao ổn định đi kèm. Cơ chế "ngoại thuộc Giáp Mộc, nội căn Quý Thủy" khiến người Mệnh Tham Lang thường có hai lớp tính cách: vẻ ngoài chính trực, quyết đoán nhưng nội tâm lại linh hoạt, dễ bị cám dỗ. Gặp Hỏa/Linh tinh đắc cách có thể tạo "Hỏa Tham"/"Linh Tham" — bộc phát nhanh, một trong những cách cục thành công đột biến nổi tiếng nhất.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Quan hệ anh em phức tạp, nhiều cảm xúc đan xen, không đơn giản — tình cảm dễ thay đổi theo hoàn cảnh, cần chủ động duy trì sự ổn định thay vì để cảm xúc nhất thời chi phối mối quan hệ ruột thịt.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Đời sống tình cảm phong phú, nhiều rung động; hôn nhân cần học cách chung thủy chủ động vì bản chất Đào Hoa dễ bị cám dỗ. Đây là cung cần ý thức rõ ràng nhất về ranh giới đạo đức trong toàn bộ 14 chính tinh.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con cái thông minh, cá tính đa dạng, nhiều năng khiếu nhưng cần định hướng rõ để không tản mạn — cha mẹ nên giúp con tập trung phát triển 1-2 sở trường thay vì để năng lượng phân tán khắp nơi.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Giỏi kiếm tiền qua giao tế, kinh doanh linh hoạt, đầu tư đa dạng; cần kỷ luật để không tiêu xài theo cảm hứng — tài vận đến nhanh nhưng cũng có thể đi nhanh nếu thiếu kế hoạch quản lý rõ ràng.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Liên quan gan, thận, hệ sinh dục — ứng với bản chất Thủy/dục vọng, dễ chịu ảnh hưởng bởi lối sống hưởng thụ quá độ (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Ra ngoài giỏi giao tế, tạo quan hệ nhanh, hợp môi trường nhiều cơ hội/cạnh tranh — Tham Lang phát huy tối đa sức hút cá nhân khi ở trong môi trường đa dạng, nhiều tương tác xã hội.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn bè đông, đa dạng, quan hệ xã giao rộng nhưng không phải lúc nào cũng sâu — cần phân biệt rõ giữa quan hệ giao tế bề mặt và tình bạn thực sự đáng tin cậy.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp nghề giao tế, kinh doanh, giải trí, nghệ thuật, hoặc bất kỳ lĩnh vực cần sức hút cá nhân và khả năng thích nghi nhanh — đây là nơi "trí tuệ hướng ngoại" của Tham Lang chuyển hóa thành thành tựu sự nghiệp rõ rệt nhất.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Sản nghiệp biến động nhiều theo cơ hội, cần tỉnh táo trước cám dỗ đầu cơ — nên đặt ra giới hạn rõ ràng cho các quyết định đầu tư bất động sản để tránh chạy theo cảm hứng nhất thời.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Nội tâm nhiều ham muốn, khó tĩnh tại; hạnh phúc thực sự đến khi học được cách tiết chế dục vọng thay vì chạy theo vô tận — đây là bài học cốt lõi nhất của Tham Lang: biết đủ mới thực sự an vui.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Quan hệ cha mẹ - con cái có thể phức tạp, nhiều cảm xúc, ít đơn giản một chiều — cần cả hai bên chủ động giao tiếp cởi mở để tránh những hiểu lầm tích tụ theo thời gian.
## 3. Tứ Hóa (Lộc: Mậu 戊 — *wù* | Quyền: Kỷ 己 — *jǐ* | Kỵ: Quý 癸 — không Khoa)

| Cung | Lộc | Quyền | Kỵ |
|---|---|---|---|
| Mệnh | Đa tài, giỏi giao tế, nhiều cơ hội | Tham vọng lớn, quyết đoán giành lấy | Dục vọng khó kiểm soát, dễ sa đà |
| Huynh Đệ | Anh em quan hệ rộng, nhiều giao thiệp | Anh em có người mạnh mẽ, áp đảo | Anh em dễ ganh đua, xung khắc |
| Phu Thê | Tình cảm phong phú, đời sống thú vị | Phối ngẫu mạnh mẽ, chủ động | Dễ ngoại tình/cám dỗ, cần chung thủy chủ động |
| Tử Tức | Con cái nhiều năng khiếu | Con có tham vọng, cá tính mạnh | Con cái khó kiểm soát, ham chơi |
| Tài Bạch | Tài lộc dồi dào từ giao tế/kinh doanh | Chủ động kiếm tiền, quyết đoán đầu tư | Tài chính dễ hao tán vì hưởng thụ |
| Tật Ách | Sức sống mạnh mẽ | Cẩn trọng vì hoạt động quá độ | Chú ý gan, thận, hệ sinh dục |
| Thiên Di | Ra ngoài nhiều cơ hội, giao tế tốt | Chủ động tạo dựng quan hệ nơi xa | Ra ngoài dễ sa đà hưởng thụ |
| Giao Hữu | Bạn bè đông đảo, quan hệ rộng | Có bạn giữ vai trò thủ lĩnh nhóm | Bạn bè dễ lôi kéo vào thói xấu |
| Quan Lộc | Sự nghiệp thuận lợi nhờ sức hút cá nhân | Thăng tiến nhờ quyết đoán, tham vọng | Sự nghiệp dễ vướng scandal, thị phi |
| Điền Trạch | Sản nghiệp mở rộng qua cơ hội | Chủ động đầu tư, mở rộng | Bất động sản dễ đầu cơ thất bại |
| Phúc Đức | Đời sống hưởng thụ, nhiều trải nghiệm | Chủ động theo đuổi đam mê | Nội tâm bất an vì ham muốn không dứt |
| Phụ Mẫu | Quan hệ cha mẹ - con cái sôi động | Cha mẹ có cá tính mạnh, ảnh hưởng lớn | Quan hệ phức tạp, nhiều mâu thuẫn |` },
  { label: "Thiên Cơ", body: `# THIÊN CƠ (天機 — tiān jī — the Strategist Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Toàn ngưu giác tiêm | 鑽牛角尖 | zuān niújiǎo jiān | **Toản** (khoan, chui vào) + **Ngưu** (trâu) + **Giác** (sừng) + **Tiêm** (nhọn) → "chui vào đầu nhọn sừng trâu — suy nghĩ luẩn quẩn" | overthinking |
| Quỷ kế đa đoan | 鬼計多端 | guǐjì duōduān | **Quỷ** (ma quỷ) + **Kế** (mưu kế) + **Đa** (nhiều) + **Đoan** (mối, đầu mối) → "mưu kế xảo quyệt, nhiều thủ đoạn" | full of tricks |
| Mưu thần | 謀臣 | móuchén | **Mưu** (mưu lược) + **Thần** (bề tôi) → "bề tôi giỏi mưu lược" | strategist minister |
| Đầu xác hoại liễu | 頭殼壞了 | tóuké huàile | **Đầu** (đầu) + **Xác** (hộp sọ) + **Hoại** (hỏng) + **Liễu** (trợ từ hoàn thành) → "đầu óc hỏng — suy nghĩ luẩn quẩn quá mức" | "brain gone bad" (overthinking) |
| Khả tố tính cao | 可塑性高 | kě sùxìng gāo | **Khả** (có thể) + **Tố** (nhào nặn) + **Tính** (tính chất) + **Cao** (cao) → "khả năng thích ứng, uốn nắn cao" | highly adaptable/malleable |
| Ẩn tàng | 隱藏 | yǐncáng | **Ẩn** (ẩn giấu) + **Tàng** (cất giấu) → "che giấu, không bộc lộ" | hidden, concealed |

## 1. Bản chất
- Ngũ hành: Âm Mộc (乙木 — *yǐ mù*)
- Hóa khí: "Thiện" (善 — *shàn*)
- Nam Đẩu đệ tam tinh, Huynh Đệ chủ — "mưu thần" (謀臣 — *móuchén*)
- Điển tích: Khương Tử Nha (姜子牙 — *jiāng zǐyá*)


Thiên Cơ là sao duy nhất trong 14 chính tinh mà bản chất "động" (biến hóa, xoay chuyển liên tục) được xem là một phẩm chất TÍCH CỰC thay vì bất ổn — miễn là nó phục vụ cho việc hoạch định thay vì phản ứng bốc đồng. Điều này lý giải vì sao Thiên Cơ, dù thuộc nhóm "Cơ Nguyệt Đồng Lương" vốn đề cao ổn định, lại là thành viên bất ổn nhất trong nhóm: trí tuệ hướng nội của Thiên Cơ cần liên tục có "bài toán mới" để giải, một môi trường quá tĩnh lặng thực chất khiến sao này khó chịu hơn là an tâm — khác hẳn Thiên Đồng hay Thiên Tướng cùng nhóm.
## Nguyên lý nền
Thiên Cơ và Tham Lang là 2 sao trí tuệ nhất nhưng khác bản chất: Tham Lang trí tuệ hướng ngoại (giành lấy); Thiên Cơ trí tuệ hướng nội (tính toán, hoạch định). Hóa Kỵ được mô tả trực tiếp "đầu óc hỏng" (頭殼壞了 — *tóuké huàile*) — năng lực phân tích thành nhược điểm: đa nghi, cố chấp, "toàn ngưu giác tiêm" (鑽牛角尖 — suy nghĩ luẩn quẩn).

Thuộc nhóm "Cơ Nguyệt Đồng Lương" nhưng là thành viên "kém ổn định nhất" vì bản chất biến động/sáng tạo xung khắc nhẹ với tinh thần ổn định chung của nhóm.


- Tính "dễ uốn" (可塑性高 — *kě sùxìng gāo*): ví "gió xuân thổi cỏ lại mọc" (春風吹又生 — *chūnfēng chuī yòu shēng*); giấu kín (隱藏 — *yǐncáng*) tự tin sau thử thách, nhạy cảm (敏感 — *mǐngǎn*) khi bị nghi ngờ (質疑 — *zhíyí*).
- Nguyên tắc dùng người: cần thể hiện năng lực khiến tâm phục (心服 — *xīnfú*), hoặc cùng nỗ lực (努力 — *nǔlì*) chia sẻ (分享 — *fēnxiǎng*) thành quả — Thiên Cơ bài xích (排斥 — *páichì*) kẻ "bất lao nhi hoạch" (不勞而獲 — *bù láo ér huò*).
- Cơ Lương gặp Không Kiếp → duyên với huyền học (與玄學有緣 — *yǔ xuánxué yǒuyuán*).
- ĐÍNH CHÍNH: Thiên Cơ là Nam Đẩu đệ tam tinh (không phải Bắc Đẩu như nhầm lẫn trước đó).
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thiên Cơ thủ Mệnh cho tính cách thích động não, ôn hòa, dễ gần nhưng dễ "khôn vặt" nếu trí tuệ không được dẫn dắt đúng hướng. Đồng cung Thái Âm (Dần/Thân — "Cơ Nguyệt"): linh hoạt, văn nhã, nhu nhược. Đồng cung Cự Môn (Mão/Dậu): giỏi tranh luận, tư duy sắc bén. Đồng cung Thiên Lương (Thìn/Tuất — "Thiện Ấm triều cương"): lương thiện, phẩm học song toàn, đây là tổ hợp cát tường nhất trong ba. Điểm mấu chốt: Hóa Kỵ tại Mệnh dễ biến trí tuệ thành "đầu óc hỏng" (đa nghi, cố chấp, suy nghĩ luẩn quẩn) — ranh giới giữa mưu trí và khôn vặt phụ thuộc hoàn toàn vào việc năng lực đó phục vụ hoạch định hay chỉ để tính toán vụn vặt.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Không đông nhưng có người thành đạt học thuật — quan hệ anh em thiên về trao đổi trí tuệ hơn là gắn bó tình cảm thuần túy, phù hợp với những gia đình coi trọng học vấn.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Kết hôn sớm; nam nên tìm vợ cá tính mạnh để cân bằng sự linh hoạt đôi khi thiếu quyết đoán của mình; nữ hợp chồng lớn tuổi thành đạt học thuật, người có thể làm điểm tựa vững chắc cho tư duy luôn biến động của Thiên Cơ.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con thông minh, không hợp giáo dục rập khuôn — trẻ cần môi trường học tập linh hoạt, khuyến khích tư duy phản biện thay vì học thuộc lòng máy móc.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tiền từ nỗ lực thực chất — Thiên Cơ không có kiểu tài lộc từ trên trời rơi xuống, mọi thành quả tài chính đều gắn liền với chất xám và công sức hoạch định bỏ ra.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Sức khỏe kém lúc nhỏ; chú ý đầu/thần kinh, tránh thức khuya — đầu óc hoạt động liên tục là con dao hai lưỡi, cần cân bằng giữa tư duy và nghỉ ngơi (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Nhanh nhạy, hợp phát triển ở đất khách — môi trường mới kích thích khả năng thích ứng và tính toán linh hoạt của Thiên Cơ tốt hơn hẳn so với ở lại một chỗ quen thuộc quá lâu.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn tài năng xuất chúng — quan hệ bạn bè thường xoay quanh việc trao đổi ý tưởng, học hỏi lẫn nhau hơn là chỉ đơn thuần vui chơi giải trí.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp nghiên cứu, biên tập, nghệ thuật, hoặc bất kỳ lĩnh vực cần liên tục xử lý thông tin mới — Thiên Cơ tại Quan Lộc phát huy tốt nhất trong công việc luôn thay đổi, không lặp lại đơn điệu.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Không dựa tổ nghiệp, tự gây dựng qua nhiều lần mua bán — sản nghiệp hình thành từ tính toán và tái cấu trúc liên tục hơn là tích lũy tuyến tính đơn giản.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Ham hiểu biết, tuổi trẻ bất ổn, trung niên trở đi an nhàn — quy luật chung của Thiên Cơ là càng lớn tuổi, tư duy biến động càng được tinh luyện thành trí tuệ ổn định.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ hòa nhã nhưng con độc lập nên dễ xem nhẹ sự quan tâm — cần chủ động giữ liên lạc, tránh để tính tự lập biến thành xa cách tình cảm gia đình theo thời gian.
## 3. Tứ Hóa (Lộc: Ất 乙 — *yǐ* | Quyền: Bính 丙 — *bǐng* | Khoa: Đinh 丁 — *dīng* | Kỵ: Mậu 戊 — *wù*)
| Cung | Lộc | Quyền | Khoa | Kỵ |
|---|---|---|---|---|
| Mệnh | Thông minh, yêu tôn giáo | Mưu lược, tính toán giỏi | Trí tuệ, giỏi hoạch định | Suy nghĩ luẩn quẩn, cố chấp |
| Huynh Đệ | Anh em thông minh | Anh em dễ biến động | Anh em có thể chỉ dạy | Duyên anh em mỏng |
| Phu Thê | Được đồng nghiệp khác giới giúp | — | Được đồng nghiệp ưu ái | Tình cảm khúc mắc |
| Tử Tức | Con hoạt bát | Con nhạy bén | Con ăn nói giỏi, hợp giáo | Con hiếu động, đề phòng tai nạn |
| Tài Bạch | Dòng tiền lớn, biến động | Giỏi hoạch định tài chính | Hợp quản lý tiền | Hao tâm vì tiền |
| Tật Ách | Đầu óc minh mẫn | Yêu văn học, chú ý gan | Chú ý nghỉ ngơi | Đau đầu, tránh thức khuya |
| Thiên Di | Hợp đi xa, di cư | Hợp xuất ngoại có kế hoạch | Cơ hội du lịch nước ngoài | Đề phòng tai nạn giao thông |
| Giao Hữu | Kết giao người tài | Bạn mưu lược, thâm trầm | Bạn lãng mạn, tốt đẹp | Đề phòng bạn nhiều mưu kế |
| Quan Lộc | Kiếm tiền bằng trí tuệ | Khởi nghiệp bằng trí tuệ | Hợp công việc trí óc | Không hợp cơ khí, dễ thất bại |
| Điền Trạch | Nhà ngày càng lớn | Chú trọng bài trí | Tâm huyết trang trí | Đau đầu vì sửa nhà |
| Phúc Đức | Biết sắp xếp tuổi già | Ham hiểu biết tôn giáo/huyền học | Có cơ duyên tôn giáo | Về già dễ trầm uất |
| Phụ Mẫu | Duyên trưởng bối nam giới | Cha mẹ nhanh nhạy | Cha mẹ sáng suốt | Bất đồng quan điểm |` },
  { label: "Thất Sát", body: `# THẤT SÁT (七殺 — qī shā — the General Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Hỉ nộ vô thường | 喜怒無常 | xǐnù wúcháng | **Hỉ** (vui) + **Nộ** (giận) + **Vô** (không) + **Thường** (cố định) → "vui giận thất thường" | moody |
| Bại trung cầu thắng | 敗中求勝 | bàizhōng qiúshèng | **Bại** (thất bại) + **Trung** (giữa) + **Cầu** (tìm kiếm) + **Thắng** (chiến thắng) → "tìm chiến thắng giữa thất bại" | snatching victory from defeat |
| Tướng | 將 | jiàng | **Tướng** (tướng lĩnh) → "vị tướng cầm quân" | general |
| Thất Sát triều đẩu | 七殺朝斗格 | qī shā cháo dǒu gé | **Thất** (bảy) + **Sát** (sát khí) + **Triều** (chầu về) + **Đẩu** (chòm sao) → "Thất Sát chầu về chòm Đẩu" | Seven Killings paying court to the Dipper |
| Như bão hổ nhi miên | 如抱虎而眠 | rú bào hǔ ér mián | **Như** (như là) + **Bão** (ôm) + **Hổ** (hổ) + **Nhi** (mà) + **Miên** (ngủ) → "như ôm hổ mà ngủ — sức mạnh kề hiểm họa" | like sleeping while embracing a tiger |
| Nhất sơn bất dung nhị hổ | 一山不容二虎 | yī shān bù róng èr hǔ | **Nhất** (một) + **Sơn** (núi) + **Bất** (không) + **Dung** (chứa) + **Nhị** (hai) + **Hổ** (hổ) → "một núi không chứa nổi hai hổ" | one mountain cannot hold two tigers |

## 1. Bản chất
- Ngũ hành: Âm Kim pha Hỏa (辛金, hỏa hóa chi kim)
- Hóa khí: "Tướng" (將 — *jiàng*)
- Nam Đẩu đệ lục tinh, sao "Tướng quân"
- Điển tích: Hoàng Phi Hổ (黃飛虎 — *huáng fēihǔ*)


Thất Sát mang hình tượng "tướng quân xông pha trận tiền" rõ rệt nhất trong 14 chính tinh — hoàn toàn không có Tứ Hóa vì bản chất một tướng lĩnh là THI HÀNH mệnh lệnh chứ không tự quyết định chiến lược lớn (khác Phá Quân, người "phá cách" theo ý riêng). Vị trí đặc biệt tại Thìn/Tuất ("Thiên La Địa Võng") cho thấy một nguyên lý sâu hơn về sát tinh nói chung: năng lượng mãnh liệt không nguy hiểm vì bản thân nó, mà nguy hiểm khi THIẾU KHUÔN KHỔ để trút vào — cũng chính khuôn khổ đó, khi đủ mạnh, lại là thứ giúp sát khí phát huy tối đa thay vì tự hủy hoại.
## Nguyên lý nền
Thuộc nhóm "Sát Phá Liêm Tham". KHÔNG có Tứ Hóa (giống Thiên Phủ, Thiên Tướng) — vì bản chất "tướng lĩnh chỉ thực thi mệnh lệnh vua, không tự quyết".

**"Thất Sát triều đẩu"** (七殺朝斗格 — *qī shā cháo dǒu gé*): độc tọa Dần/Thân, tam hợp Tử Vi/Thiên Phủ — điều động trăm vạn hùng binh. Đặc biệt: tại Thìn/Tuất ("Thiên La Địa Võng") lại có lợi cho riêng Thất Sát — sát khí mãnh liệt cần khuôn khổ mạnh để chế ngự và phát huy đúng chỗ.


- Ẩn dụ "như bão hổ nhi miên" (如抱虎而眠 — *rú bào hǔ ér mián*) — sức mạnh và hiểm họa song hành.
- "Nhất sơn bất dung nhị hổ" (一山不容二虎 — *yī shān bù róng èr hǔ*) — giải thích tính khó hòa hợp dù gặp người cùng cá tính mạnh.
- Phân biệt vai trò "Chủ Soái" (主帥, lao tâm, độc lập tác chiến) vs "Tiên Phong" (先鋒, lao lực, chịu mệnh lệnh) của Phá Quân.
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Thất Sát thủ Mệnh cho tính độc lập mạnh mẽ, tự tôn cao, cảm xúc thất thường (喜怒無常 — *xǐnù wúcháng*) nhưng sức bền phi thường, đúng tinh thần "bại trung cầu thắng" (敗中求勝 — *bàizhōng qiúshèng*). Đồng cung Liêm Trinh (Sửu/Mùi): cứng rắn, đa tài. Đồng cung Vũ Khúc (Mão/Dậu — "Vũ Sát"): cương liệt cực độ, cần một nghề chuyên môn để trút năng lượng. Đồng cung Tử Vi (Tị/Hợi): ngoài tĩnh trong cương, uy quyền được kiềm chế bởi sự hiện diện của Đế tinh. Đặc biệt tại Thìn/Tuất ("Thiên La Địa Võng") lại có lợi riêng cho Thất Sát — sát khí mãnh liệt cần khuôn khổ mạnh để chế ngự và phát huy đúng chỗ, một nghịch lý chỉ đúng với sao này.

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Duyên mỏng — quan hệ anh em thường không gần gũi, mỗi người có xu hướng độc lập phát triển con đường riêng, ít khi nương tựa vào nhau.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Nhiều trắc trở, nên kết hôn muộn — bản chất "tướng quân" của Thất Sát khiến quan hệ hôn nhân sớm dễ va chạm vì cả hai bên chưa đủ độ chín để dung hòa cái tôi mạnh mẽ.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Cá tính mạnh, khó dạy — con cái Thất Sát thường có ý chí độc lập từ nhỏ, cha mẹ nên định hướng bằng sự tôn trọng thay vì áp đặt cứng nhắc để tránh xung đột kéo dài.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Tốt nhưng thích mạo hiểm, biến động lớn — dòng tiền lên xuống theo chu kỳ rõ rệt, phù hợp người có bản lĩnh chấp nhận rủi ro để đổi lấy thành quả lớn.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Sức khỏe kém từ nhỏ, dễ mắc trĩ khi lớn — ứng với bản chất sát khí mãnh liệt tác động lên hệ tuần hoàn/khí huyết (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Năng động, kiên định — ra ngoài là môi trường Thất Sát phát huy tốt nhất, tựa như "tướng quân xông pha trận tiền", càng thử thách càng bộc lộ rõ bản lĩnh.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn mang phiền toái nhiều hơn lợi ích — cần chọn lọc kỹ quan hệ xã hội, tránh bị cuốn vào những mối quan hệ tiêu tốn năng lượng mà không mang lại giá trị tương xứng.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Hợp vận động viên, cảnh sát, quân đội — bất kỳ nghề nghiệp nào đòi hỏi kỷ luật, đối mặt trực diện với thử thách đều phù hợp với bản chất tướng lĩnh của Thất Sát.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Biến động, được ít mất nhiều — sản nghiệp không ổn định, cần thận trọng trong các quyết định lớn liên quan đến bất động sản, tránh đầu tư theo cảm tính nhất thời.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Tại Thân/Dậu đắc lợi; nếu không thì vất vả, khắt khe với bản thân — Thất Sát hiếm khi cho phép mình nghỉ ngơi trọn vẹn, luôn cảm thấy cần phải chứng minh điều gì đó.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ cố chấp, độc đoán, xa cách — mô hình giáo dục nghiêm khắc, ít biểu lộ tình cảm, tạo tính cách độc lập sớm nhưng cũng để lại khoảng cách tâm lý cần chủ động hàn gắn khi trưởng thành.
## 3. Tứ Hóa: Không có` },
  { label: "Phá Quân", body: `# PHÁ QUÂN (破軍 — pò jūn — the "Destroyer"/Pioneer Star)

## Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Hào sảng giang hồ | 江湖味濃 | jiānghú wèi nóng | **Giang** (sông) + **Hồ** (hồ) + **Vị** (mùi vị, chất) + **Nùng** (đậm đặc) → "đậm chất giang hồ, phóng khoáng tự do" | free-spirited |
| Cách cách bất nhập | 格格不入 | gégé bùrù | **Cách cách** (khuôn khổ, lặp nhấn mạnh) + **Bất** (không) + **Nhập** (hòa vào) → "không hòa nhập được vào khuôn khổ" | incompatible |
| Trụ Vương | 紂王 | zhòu wáng | **Trụ** (tên) + **Vương** (vua) → "vị vua cuối nhà Thương" | King Zhou (last Shang emperor) |
| Thất Sát sinh Phá Quân | 七殺生破軍 | qī shā shēng pò jūn | **Thất Sát** (sao Thất Sát) + **Sinh** (sinh ra) + **Phá Quân** (sao Phá Quân) → "Thất Sát sinh dưỡng Phá Quân theo Ngũ Hành" | Seven Killings generates Army Destroyer |
| Anh Tinh nhập miếu | 英星入廟格 | yīng xīng rù miào gé | **Anh** (kiệt xuất) + **Tinh** (sao) + **Nhập** (vào) + **Miếu** (vị trí vượng) → "sao anh hùng an tại miếu vượng" | heroic star entering its temple |
| Tiêu hao chiến | 消耗戰 | xiāohào zhàn | **Tiêu** (tiêu hao) + **Hao** (hao tổn) + **Chiến** (chiến đấu) → "cuộc chiến hao mòn, không dứt điểm" | war of attrition |

## 1. Bản chất
- Ngũ hành: Âm Thủy (癸水 — *guǐ shuǐ*)
- Hóa khí: "Hao" (耗 — *hào*)
- Bắc Đẩu đệ thất tinh, "chiến tướng" thấp hơn Thất Sát 1 bậc
- Điển tích: Trụ Vương (紂王 — *zhòu wáng*) sau khi tự thiêu


Nếu Thất Sát là "phá để thắng trong khuôn khổ", Phá Quân là "phá để làm lại từ đầu ngoài khuôn khổ" — đây là chính tinh mà tài liệu này nhấn mạnh rõ nhất nguyên tắc "phải rời xa gốc rễ mới thành công". Về mặt Ngũ Hành, quan hệ Kim sinh Thủy giữa Thất Sát và Phá Quân (七殺生破軍 — *qī shā shēng pò jūn*) cho thấy hai sao này không đối lập như vẻ ngoài, mà là một chuỗi tiếp nối: Thất Sát tích lũy sát khí trong khuôn khổ, Phá Quân là điểm giải phóng sát khí đó ra ngoài mọi khuôn khổ. Đây là lý do Phá Quân luôn đi kèm cảm giác "phải đập bỏ cái cũ trước khi xây cái mới", dù bản thân người sở hữu không chủ ý phá hoại.
## Nguyên lý nền
Thất Sát = tướng phục tùng; Phá Quân = tướng phá cách, hành động theo ý riêng — Tử Vi–Phá Quân "cách cách bất nhập" (格格不入 — *gégé bùrù*) nếu thiếu phò tá làm vùng đệm.

**"Anh Tinh nhập miếu"** (英星入廟格 — *yīng xīng rù miào gé*): độc tọa Tý/Ngọ — phú quý song toàn, hợp võ nghiệp/kinh thương, dễ bộc phát sau khi rời quê. Cần Lộc Tồn/Hóa Lộc mới phát huy, không thì chỉ là "tiêu hao chiến" (消耗戰 — *xiāohào zhàn*).

Nguyên tắc "phải rời xa gốc rễ mới thành công" — chính tinh nhấn mạnh rõ nhất việc cần đổi môi trường để phát triển.


- Quan hệ Ngũ Hành với Thất Sát: Kim sinh Thủy (七殺生破軍 — *qī shā shēng pò jūn*) — Thất Sát "nuôi dưỡng" Phá Quân, liên đới chặt chẽ hơn vẻ ngoài đối lập.
- Điển cố "ngã bất sát Bá Nhân, Bá Nhân khước nhân ngã nhi tử" (我不殺伯仁 — *wǒ bù shā bó rén*，伯仁卻因我而死 — *bó rén què yīn wǒ ér sǐ*) — vô tình gây hại mà không tự biết.
- Phá Quân dù đồng cung Tử Vi vẫn giữ phần dè dặt (受制而多顧忌 — *shòuzhì ér duō gùjì*) — khác Thất Sát "vô sở cố kỵ" khi gặp Tử Vi — thấp hơn Thất Sát 1 bậc trong hệ phân cấp.
## 2. Luận theo 12 cung

### Cung Mệnh (命宮 — *mìnggōng*)
Phá Quân thủ Mệnh cho tính quyết liệt, giang hồ, hào sảng, dễ mất lòng người mà không hề hay biết vì bản chất "phá cách theo ý riêng" khiến hành động thường đi trước sự cân nhắc hậu quả. Đồng cung Liêm Trinh (Mão/Dậu): khai phá, cải cách, dám đi con đường chưa ai đi. Đồng cung Vũ Khúc (Tị/Hợi — "Vũ Phá"): mạo hiểm, hao tài, biến động tài chính lớn nhất trong các tổ hợp Phá Quân. Đồng cung Tử Vi (Tý/Ngọ): bá khí, độc lập, đây là tổ hợp mạnh nhất nhưng cũng dễ "cách cách bất nhập" nếu thiếu phò tá làm vùng đệm giữa hai bản chất đối lập (một bên cai trị, một bên phá cách).

### Cung Huynh Đệ (兄弟宮 — *xiōngdì gōng*)
Duyên mỏng, thành công phải xa quê — quan hệ anh em ít gắn bó lâu dài, mỗi người thường phải tự lập nghiệp ở một nơi khác để phát huy hết tiềm năng.

### Cung Phu Thê (夫妻宮 — *fūqī gōng*)
Không có quan niệm hôn nhân truyền thống, nên kết hôn muộn — Phá Quân cần thời gian để định hình được điều mình thực sự muốn trong một mối quan hệ lâu dài trước khi cam kết.

### Cung Tử Tức (子女宮 — *zǐnǚ gōng*)
Con hiếu động, "có con như không" — quan hệ cha mẹ con cái thường lỏng lẻo về mặt hình thức nhưng không thiếu tình cảm thực chất; con cái Phá Quân thường sớm độc lập.

### Cung Tài Bạch (財帛宮 — *cáibó gōng*)
Hoạch định độc lập, tư duy khác biệt — cách kiếm tiền của Phá Quân thường không theo lối mòn, sẵn sàng phá bỏ mô hình cũ để thử nghiệm hướng đi mới, rủi ro cao nhưng tiềm năng đột phá cũng lớn.

### Cung Tật Ách (疾厄宮 — *jí'è gōng*)
Khí huyết; nữ dễ bệnh phụ khoa; có thể liên quan tiểu đường — ứng với bản chất hao tổn năng lượng liên tục của "Hao" (biểu tượng học, không phải chẩn đoán y khoa).

### Cung Thiên Di (遷移宮 — *qiānyí gōng*)
Đối cung luôn là Thiên Tướng thiếu quyết đoán → "thành sự bất túc, bại sự hữu dư" (thành công thì không đủ, thất bại thì có thừa) — cảnh báo rằng ra ngoài cần có kế hoạch rõ ràng hơn là chỉ dựa vào bản năng xông pha.

### Cung Giao Hữu / Nô Bộc (交友宮 — *jiāoyǒu gōng*)
Bạn phần lớn có thực lực — Phá Quân thu hút những người có bản lĩnh tương đương, ít khi kết giao với người yếu đuối hoặc thụ động.

### Cung Quan Lộc (官祿宮 — *guānlù gōng*)
Nam hợp trị an/quân đội; nữ có tố chất lãnh đạo — sự nghiệp Phá Quân luôn gắn với việc phá bỏ cái cũ để xây dựng cái mới, phù hợp các ngành đòi hỏi cải cách, khởi nghiệp, hoặc chuyển đổi mô hình.

### Cung Điền Trạch (田宅宮 — *tiánzhái gōng*)
Biến động liên tục, khó giữ ổn định — sản nghiệp thay đổi nhiều lần trong đời, nên chấp nhận đây là đặc tính tự nhiên thay vì cố gắng ép mình vào khuôn mẫu "an cư lạc nghiệp" cứng nhắc.

### Cung Phúc Đức (福德宮 — *fúdé gōng*)
Vất vả cả đời, khó cảm nhận thành quả — Phá Quân luôn hướng tới mục tiêu tiếp theo ngay khi vừa đạt được một cột mốc, khiến cảm giác mãn nguyện hiếm khi kéo dài; cần học cách dừng lại ăn mừng thành tựu.

### Cung Phụ Mẫu (父母宮 — *fùmǔ gōng*)
Cha mẹ bất hòa, thiếu ấm áp — môi trường gia đình gốc thường có nhiều biến động hoặc căng thẳng, góp phần hình thành tính cách độc lập sớm và ít phụ thuộc cảm xúc của Phá Quân.
## 3. Tứ Hóa: chỉ Lộc (Quý 癸 — *guǐ*) và Quyền (Giáp 甲 — *jiǎ*) — không Khoa/Kỵ
| Cung | Lộc | Quyền |
|---|---|---|
| Mệnh | Biến động nhưng tài vận/tình cảm như ý | Khai phá, năng lực phát huy tối đa |
| Huynh Đệ | Tương trợ tốt | Có người thích chỉ huy |
| Phu Thê | Tình cảm đặc sắc, nên kết hôn muộn | Phối ngẫu vất vả vì sự nghiệp |
| Tử Tức | Con hướng ngoại, đề phòng scandal | Con có ích cho gia đình |
| Tài Bạch | Của cải bất ngờ, dễ vay lớn | Muộn phát, trước mất sau được |
| Tật Ách | Thích hưởng thụ xa hoa | Lo lắng vì công việc, nóng nảy |
| Thiên Di | Duyên rộng, bạn khắp nơi | Chủ dịch mã, bôn ba |
| Giao Hữu | Được bạn trợ lực | Cơ hội nắm quyền trong nhóm |
| Quan Lộc | Thắng thế cạnh tranh | Sự nghiệp biến động lớn |
| Điền Trạch | Dễ có nhà lớn, chú ý ngân sách | Có ý sửa sang nhà |
| Phúc Đức | Thích hưởng thụ | Thích sống xa hoa |
| Phụ Mẫu | Cha mẹ tự cho mình trung tâm | Được chăm sóc kỹ, cha mẹ mạnh mẽ |` },
  { label: "Lá Số Mẫu", body: `## 1. Thông tin cấu trúc lá số

- Âm Dương: **Âm Nữ**
- Bản Mệnh: **Sơn Đầu Hỏa**
- Cục: **Thổ Ngũ Cục**
- Quan hệ Mệnh–Cục: **Mệnh sinh Cục** (Hỏa sinh Thổ — bản Mệnh "cấp năng lượng" cho Cục, một trong ba tương quan Mệnh/Cục cổ điển bên cạnh "Cục sinh Mệnh" và "Mệnh Cục bình hòa")
- Chủ Mệnh: **Lộc Tồn**
- Chủ Thân: **Thiên Cơ**
- Thân cư: **Quan Lộc**

## 2. Bảng 12 cung (chính tinh + Miếu/Vượng/Đắc/Bình/Hãm)

| Cung | Địa chi | Chính tinh tọa thủ |
|---|---|---|
| Mệnh | Tuất | Thái Dương (Hãm) |
| Phụ Mẫu | Hợi | *(Vô Chính Diệu)* |
| Phúc Đức | Tý | Thiên Cơ (Đắc) |
| Điền Trạch | Sửu | Tử Vi (Đắc) + Phá Quân (Vượng) |
| Quan Lộc *(= Thân)* | Dần | *(Vô Chính Diệu)* |
| Nô Bộc | Mão | Thiên Phủ (Bình) |
| Thiên Di | Thìn | Thái Âm (Hãm) |
| Tật Ách | Tị | Liêm Trinh (Hãm) + Tham Lang (Hãm) |
| Tài Bạch | Ngọ | Cự Môn (Vượng) |
| Tử Tức | Mùi | Thiên Tướng (Đắc) |
| Phu Thê | Thân | Thiên Đồng (Miếu) + Thiên Lương (Vượng) |
| Huynh Đệ | Dậu | Vũ Khúc (Đắc) + Thất Sát (Hãm) |

*(Bảng trên chỉ liệt kê chính tinh để phục vụ bước phân tích cách cục lớn; phụ tinh/sát tinh chi tiết của từng cung không đưa vào đây vì nằm ngoài phạm vi 14 chính tinh của tài liệu này.)*

## 3. Áp dụng Sáu Bước Đọc Lá Số

### Bước 1 — Định vị Mệnh–Thân
Mệnh tọa Tuất. Thân cư Quan Lộc — một trong 6 vị trí hợp lệ của Thân theo nguyên tắc ở tab Phương pháp luận. Ý nghĩa: trọng tâm hậu vận của lá số này lệch hẳn về phía sự nghiệp/công danh (Quan Lộc) thay vì gia đạo (Phu Thê), tài sản (Điền Trạch) hay đời sống nội tâm (Phúc Đức) — ba vị trí Thân khác cũng hợp lệ nhưng không rơi vào đây.

### Bước 2 — Nhóm hành vi tại Mệnh
Chính tinh tại Mệnh là **Thái Dương** — theo đúng lưu ý ở tab Phương pháp luận, Thái Dương/Thái Âm KHÔNG thuộc bất kỳ nhóm nào trong ba nhóm hành vi (Sát Phá Liêm Tham / Cơ Nguyệt Đồng Lương / Tử Phủ Liêm Vũ Tướng), vì đây là "Trung Thiên tinh" dao động theo ngày/đêm sinh và giới tính chứ không có khung hành vi cố định như 12 sao còn lại. Với lá số Âm Nữ này, cần đọc Thái Dương như một sao "chủ về quý/danh vọng chiếu rọi ra ngoài" hơn là xếp vào một nhóm tính cách có sẵn.

### Bước 3 — Tam Phương Tứ Chính của Mệnh
Tam hợp của Tuất là Dần–Ngọ–Tuất; đối cung của Tuất là Thìn. Vậy Tứ Chính của Mệnh gồm:

- **Mệnh (Tuất):** Thái Dương (Hãm)
- **Tài Bạch (Ngọ):** Cự Môn (Vượng)
- **Quan Lộc (Dần):** Vô Chính Diệu — theo nguyên tắc "mượn sao đối cung", phải mượn ánh sáng từ đối cung Dần là Thân, tức mượn bộ **Thiên Đồng + Thiên Lương**
- **Thiên Di (Thìn):** Thái Âm (Hãm)

### Bước 5 — Nhận diện cách cục
- **"Nhật Nguyệt phản bối"**: Thái Dương tại Mệnh hãm, Thái Âm tại Thiên Di cũng hãm — đúng cách cục "cả hai hãm" mà tab Thái Dương mô tả: *"vất vả, công không tương xứng"*. Phần bổ sung của Thái Dương ghi rõ hướng xử lý: *"cần gấp đôi nỗ lực, không nản lòng, cần kiên trì"* — đây là điểm cốt lõi của lá số này, không phải một câu phán xấu cố định mà là một khuynh hướng cần chủ động bù đắp.
- **Quan Lộc mượn cách "Đồng Lương"**: vì Thân cư đúng vào Quan Lộc và cung này Vô Chính Diệu tại Dần, toàn bộ sức nặng sự nghiệp dồn vào bộ Thiên Đồng+Thiên Lương mượn từ đối cung. Theo phần bổ sung của Thiên Lương: *"Đồng Lương cách tại Dần/Thân: Phúc Ấm tụ hội, hai sao bổ khuyết hoàn hảo"* — đây là một điểm tựa tốt hiếm hoi bù lại cho việc Quan Lộc trống chính tinh.
- **Cự Môn tại Tài Bạch được hội chiếu**: Cự Môn (Ngọ) nằm cùng tam hợp Dần–Ngọ–Tuất với Thái Dương (Tuất) — đúng cơ chế "Minh Nhật củng chiếu" mà tab Cự Môn mô tả (Cự Môn cần Thái Dương chiếu để giải Ám). Tuy nhiên vì Thái Dương ở đây hãm chứ không vượng, tác dụng "giải Ám" chỉ ở mức một phần, không trọn vẹn như trường hợp Thái Dương miếu vượng hội chiếu.

### Bước 6 — Tổng hợp sơ bộ theo lĩnh vực
- **Tính cách (Mệnh):** nền tảng "cho đi, chiếu rọi, dẫn dắt" của Thái Dương vẫn còn nguyên bản chất dù hãm — theo đúng nguyên lý *"Miếu/Hãm quyết định lượng chứ không đổi chất"* ở tab Thái Dương; cái thiếu là mức độ được ghi nhận/đền đáp tương xứng, không phải thiếu nội lực.
- **Sự nghiệp (Quan Lộc = Thân):** trọng tâm cả đời dồn vào công danh, được nâng đỡ phần nào nhờ cách Đồng Lương mượn chiếu — phù hợp môi trường có hệ thống, cố vấn/tham mưu hơn là xông pha khai phá một mình (đúng bản chất "chậm-mềm-muộn-hiện" của nhóm Cơ Nguyệt Đồng Lương mà Thiên Đồng/Thiên Lương thuộc về).
- **Tài vận:** cần đọc riêng ba cung Tài Bạch (Cự Môn vượng — tài đến từ giao tế/ăn nói/chuyên môn có tiếng nói), Phúc Đức (Thiên Cơ đắc — biết hoạch định, tích lũy có suy tính), Điền Trạch (Tử Vi + Phá Quân — sản nghiệp biến động nhưng có nền tảng vững vì đắc cách) theo đúng nguyên tắc *"không được gộp chung 3 cung này"* ở tab Phương pháp luận.

## 4. Luận giải chuyên sâu

Phần 3 đã áp dụng khung "Sáu bước đọc lá số" ở mức tổng quát (Mệnh-Thân, Tam Phương Tứ Chính, cách cục lớn). Phần này đào sâu thêm bốn lớp phân tích mà một người đọc lá số ở trình độ chuyên gia sẽ không bỏ qua: sao chủ Mệnh/Thân, tam giác hôn nhân, tam giác tài chính đầy đủ, và các cung "âm thầm" nhưng có sức nặng riêng.

### Lớp 1 — Chủ Mệnh Lộc Tồn, Chủ Thân Thiên Cơ: một trục xuyên suốt bị bỏ sót nếu chỉ nhìn chính tinh
Ngoài chính tinh tọa thủ, mỗi lá số còn có "Mệnh chủ" và "Thân chủ" — hai điểm quy chiếu phụ, xác định theo Cục và Địa chi, thường bị người mới học bỏ qua vì không tọa thủ trực tiếp tại cung nào cụ thể. Ở lá số này, **Mệnh chủ là Lộc Tồn** — sao tượng trưng cho tài lộc tự thân, ổn định, tích lũy từ từ chứ không bộc phát. Đặt cạnh cách "Nhật Nguyệt phản bối" đã nhận diện ở Bước 5 (cả Thái Dương lẫn Thái Âm đều hãm), Lộc Tồn làm Mệnh chủ củng cố thêm một lớp ý nghĩa: đây là một lá số mà thành quả đến từ *tích lũy kiên trì*, không phải may mắn đột biến — hai tín hiệu độc lập (chính tinh và Mệnh chủ) cùng chỉ về một hướng diễn giải, làm tăng độ tin cậy của kết luận thay vì chỉ dựa vào một dữ kiện đơn lẻ.

**Thân chủ là Thiên Cơ** — trùng khớp một cách đáng chú ý với việc cung Quan Lộc (=Thân) phải mượn ánh sáng Đồng Lương từ đối cung, và cung Phúc Đức lại có chính Thiên Cơ đắc địa tọa thủ (xem Lớp 3). Ba tín hiệu — Thân chủ, ngôi sao thực tọa tại Phúc Đức, và bản chất "trí tuệ hướng nội, cần bài toán để giải" của Thiên Cơ — cùng hội tụ, cho thấy trục tư duy chiến lược/tính toán không chỉ là một nét tính cách nhất thời mà là **cơ chế vận hành xuyên suốt cả hậu vận** của lá số này.

### Lớp 2 — Phu Thê: hôn nhân dưới ánh sáng "Đồng Lương"
Cung Phu Thê tại Thân có Thiên Đồng (Miếu) + Thiên Lương (Vượng) đồng cung — chính là cặp đôi đã tạo nên cách "Đồng Lương" được nhắc đến nhiều lần ở Bước 5 khi phân tích Quan Lộc. Điều thú vị là cùng một cặp sao vừa đóng vai trò "ánh sáng mượn" cho sự nghiệp (qua Thân cư Quan Lộc, đối cung của Phu Thê), vừa là cách cục tọa thủ trực tiếp tại chính cung Phu Thê — nói cách khác, **con đường sự nghiệp và đời sống hôn nhân của lá số này về bản chất cùng chia sẻ một nguồn năng lượng**. Theo hồ sơ riêng của hai sao này: Thiên Đồng tại Phu Thê cho phối ngẫu dịu dàng, biết chăm sóc, hôn nhân thiên về ổn định êm ả; Thiên Lương tại Phu Thê cho phối ngẫu chững chạc, đáng tin cậy, thường chín chắn hơn tuổi. Cả hai đặc tính cộng hưởng theo đúng tinh thần "Phúc Ấm tụ hội" — phối ngẫu vừa mang lại cảm giác an toàn (Đồng) vừa đóng vai trò che chở/cố vấn (Lương). Đây là một trong những vị trí hôn nhân thuận lợi nhất trong lá số, phần nào bù đắp cho sự vất vả đã nhận diện ở cung Mệnh.

### Lớp 3 — Tài Bạch, Điền Trạch, Phúc Đức: tam giác tài chính đầy đủ
Đúng theo nguyên tắc "không được gộp chung 3 cung này" ở tab Phương pháp luận, cần tách bạch:
- **Tài Bạch (Ngọ) — Cự Môn (Vượng):** tài đến từ giao tế/ăn nói/chuyên môn có tiếng nói — đúng hồ sơ Cự Môn tại Tài Bạch: "ham vật chất, muốn tự kiếm; đường tài vất vả, không đặt mục tiêu quá cao ngay từ đầu mà cần tích lũy dần qua uy tín chuyên môn". Vì Cự Môn tại đây vượng (không hãm), đây là điểm sáng tài chính rõ rệt nhất trong ba cung, đặc biệt nếu công việc gắn với "nghề dùng miệng" đã nêu ở Quan Lộc của chính Cự Môn.
- **Điền Trạch (Sửu) — Tử Vi (Đắc) + Phá Quân (Vượng):** sản nghiệp biến động nhưng có nền tảng vững vì đắc cách. Hồ sơ Tử Vi tại Điền Trạch cho "sản nghiệp lớn, hợp đất cao"; hồ sơ Phá Quân tại Điền Trạch lại cảnh báo "biến động liên tục, khó giữ ổn định". Tổ hợp Tử Phá tại Điền Trạch là kiểu tài sản "lớn nhưng không yên" — quy mô có thể đáng kể nhưng đòi hỏi liên tục tái cơ cấu, không nên kỳ vọng một tài sản "mua rồi để đó" mà cần chủ động quản lý.
- **Phúc Đức (Tý) — Thiên Cơ (Đắc):** đời sống nội tâm hiếu tri thức, "trung niên trở đi an nhàn" theo đúng hồ sơ riêng của Thiên Cơ tại Phúc Đức. Đáng chú ý đây cũng là cung mà Thân chủ Thiên Cơ "về đúng nhà" của chính nó — một sự cộng hưởng hiếm gặp, củng cố thêm cho nhận định ở Lớp 1 rằng trí tuệ/tính toán là trục ổn định nhất của cả lá số.

Tổng hợp: tài vận **kiếm được** nhờ chuyên môn/ăn nói (Cự Môn), tài sản **tích lũy được** ở quy mô lớn nhưng cần quản lý chủ động (Tử Phá), và sự **an yên nội tâm** về tài chính đến từ trí tuệ biết tính toán hơn là từ việc sở hữu (Thiên Cơ) — ba lớp không mâu thuẫn mà bổ sung cho nhau thành một bức tranh tài chính tương đối đầy đủ.

### Lớp 4 — Tật Ách và Huynh Đệ: hai cung ít được chú ý nhưng đáng lưu tâm
- **Tật Ách (Tị) — Liêm Trinh (Hãm) + Tham Lang (Hãm):** đây là cung DUY NHẤT trong lá số có hai chính tinh cùng hãm địa — đáng chú ý vì Liêm Trinh và Tham Lang vốn là hai "sao đào hoa" (đào hoa chính và đào hoa thứ) của toàn bộ 14 chính tinh, cả hai cùng hãm tại một cung. Theo hồ sơ riêng: Liêm Trinh hãm tại Tật Ách gợi ý cần lưu tâm tim mạch/huyết áp/thần kinh; Tham Lang hãm tại Tật Ách gợi ý cần lưu tâm gan/thận (biểu tượng học truyền thống, không phải chẩn đoán y khoa). Về mặt tính khí, tổ hợp này cũng gợi ý một vùng "nội lực dục vọng/tham vọng" tồn tại nhưng bị dồn nén (hãm) chứ không bộc lộ công khai như ở Mệnh — một góc khuất đáng để chủ nhân lá số tự quan sát thêm, không nhất thiết là điều xấu, chỉ là năng lượng chưa có lối thoát rõ ràng.
- **Huynh Đệ (Dậu) — Vũ Khúc (Đắc) + Thất Sát (Hãm):** tổ hợp "Vũ Sát" — theo hồ sơ Vũ Khúc, đây là tổ hợp "cương liệt cực độ, cần một nghề chuyên môn để trút năng lượng"; nhưng ở đây Thất Sát lại hãm (không phải vị trí Vũ Sát kinh điển tại Mão/Dậu miếu vượng như thường thấy) — cần đọc thận trọng, có thể tính "Vũ Sát" bị giảm bớt sắc bén. Ứng vào cung Huynh Đệ, tổ hợp này gợi ý anh chị em (nếu có) hoặc quan hệ đồng trang lứa nói chung có xu hướng cá tính mạnh, ít khi đơn giản, đòi hỏi cả hai bên đều phải trưởng thành đủ để duy trì hòa khí lâu dài.

### Kết luận của phần luận giải chuyên sâu
Xâu chuỗi cả bốn lớp, lá số này cho thấy một mẫu hình khá nhất quán: **thành quả đến từ tích lũy trí tuệ và uy tín theo thời gian** (Mệnh chủ Lộc Tồn, Thân chủ + Phúc Đức đều là Thiên Cơ, Tài Bạch nhờ chuyên môn) hơn là may mắn tự nhiên hay quan hệ rộng hời hợt; **đời sống tình cảm là điểm tựa an toàn** rõ rệt (Phu Thê đắc cách Đồng Lương) bù đắp cho phần vất vả ở Mệnh; còn **Tật Ách và Huynh Đệ** là hai vùng cần chủ động quan sát thêm vì mang tính chất "ẩn" (hãm địa) hơn là bộc lộ. Đây vẫn chỉ là lớp phân tích dựa trên lá số gốc — như đã nhấn mạnh ở tab Phương pháp luận, bức tranh đầy đủ còn cần thêm Đại Vận/Lưu Niên tại thời điểm cụ thể, vốn đã được lược bỏ khỏi bản mẫu này vì lý do ẩn danh.` }
];

/* ---------------------------------------------------------------
   MARKDOWN-LITE PARSER — chỉ hỗ trợ đúng tập cú pháp dùng trong tài liệu:
   #/##/### heading, ---, bảng |...|, danh sách -, danh sách 1., **đậm**, *nghiêng*
--------------------------------------------------------------- */
function parseBlocks(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l);
  const isSeparatorRow = (l) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(l);
  const isHr = (l) => /^-{3,}$/.test(l.trim());
  const isBullet = (l) => /^-\s+/.test(l);
  const isOrdered = (l) => /^\d+\.\s+/.test(l);
  const isHeading = (l) => /^#{1,3}\s+/.test(l);

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") { i++; continue; }

    if (isHr(line)) { blocks.push({ type: "hr" }); i++; continue; }

    if (isHeading(line)) {
      const m = line.match(/^(#{1,3})\s+(.*)$/);
      blocks.push({ type: "h" + m[1].length, text: m[2] });
      i++; continue;
    }

    if (isTableRow(line)) {
      const rawRows = [];
      while (i < lines.length && isTableRow(lines[i])) {
        if (!isSeparatorRow(lines[i])) {
          const cells = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
          rawRows.push(cells);
        }
        i++;
      }
      blocks.push({ type: "table", header: rawRows[0] || [], rows: rawRows.slice(1) });
      continue;
    }

    if (isBullet(line)) {
      const items = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (isOrdered(line)) {
      const items = [];
      while (i < lines.length && isOrdered(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const buf = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isHr(lines[i]) &&
      !isHeading(lines[i]) &&
      !isTableRow(lines[i]) &&
      !isBullet(lines[i]) &&
      !isOrdered(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: buf.join(" ") });
  }
  return blocks;
}

const HAN_RE = /([㐀-䶿一-鿿豈-﫿]+)/;
// Ký tự chỉ xuất hiện trong tiếng Việt, không bao giờ xuất hiện trong pinyin —
// dùng để phân biệt "*ghi chú tiếng Việt in nghiêng*" với "*pinyin*".
const VN_ONLY_RE = /[ăâđêôơưĂÂĐÊÔƠƯảãạẻẽẹỉĩịỏõọủũụỷỹỵẢÃẠẺẼẸỈĨỊỎÕỌỦŨỤỶỸỴ]/;

// Tách các đoạn chữ Hán ra khỏi một đoạn text thường, bọc riêng để tô màu.
function renderHanRuns(text, keyPrefix) {
  if (!HAN_RE.test(text)) return text;
  const parts = text.split(new RegExp(HAN_RE, "g"));
  return parts.map((part, i) =>
    HAN_RE.test(part) ? (
      <span className="tv-han" key={keyPrefix + "-h" + i}>{part}</span>
    ) : (
      part
    )
  );
}

// renderInline: dùng cho toàn bộ nội dung THÂN bài (không phải H1) — tô màu
// chữ Hán (đỏ) và pinyin (xanh ngọc), giữ ghi chú tiếng Việt in nghiêng màu xám.
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return <strong key={idx}>{renderHanRuns(part.slice(2, -2), "b" + idx)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      const inner = part.slice(1, -1);
      const isPinyin = !VN_ONLY_RE.test(inner);
      return (
        <em className={isPinyin ? "tv-pinyin" : "tv-note"} key={idx}>
          {inner}
        </em>
      );
    }
    return <React.Fragment key={idx}>{renderHanRuns(part, "p" + idx)}</React.Fragment>;
  });
}

// renderInlinePlain: dùng riêng cho H1 — chỉ xử lý **đậm**/*nghiêng*, KHÔNG tô
// màu chữ Hán/pinyin (tiêu đề đã đủ to/nổi bật, thêm màu sẽ rối mắt).
function renderInlinePlain(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function Block({ b }) {
  switch (b.type) {
    case "h1":
      return <h1 className="tv-h1">{renderInlinePlain(b.text)}</h1>;
    case "h2":
      return <h2 className="tv-h2">{renderInline(b.text)}</h2>;
    case "h3":
      return <h3 className="tv-h3">{renderInline(b.text)}</h3>;
    case "hr":
      return <hr className="tv-hr" />;
    case "p":
      return <p className="tv-p">{renderInline(b.text)}</p>;
    case "ul":
      return (
        <ul className="tv-ul">
          {b.items.map((it, ii) => (
            <li key={ii}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="tv-ol">
          {b.items.map((it, ii) => (
            <li key={ii}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    case "table": {
      // Bảng "Từ vựng" có cột riêng "Chữ Hán"/"Hán" và "Pinyin" — nội dung 2 cột
      // này là chữ thuần (không có dấu * markdown) nên tô màu theo TÊN CỘT thay
      // vì dựa vào renderInline (chỉ bắt được *…* /Hán lẫn trong câu văn).
      const hanColIdx = b.header.findIndex((h) => /^(chữ )?hán$/i.test(h.trim()));
      const pinyinColIdx = b.header.findIndex((h) => /^pinyin$/i.test(h.trim()));
      return (
        <div className="tv-table-wrap">
          <table className="tv-table">
            <thead>
              <tr>
                {b.header.map((c, ci) => (
                  <th key={ci}>{renderInline(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((c, ci) => {
                    if (ci === hanColIdx) return <td className="tv-han" key={ci}>{c}</td>;
                    if (ci === pinyinColIdx) return <td className="tv-pinyin" key={ci}>{c}</td>;
                    return <td key={ci}>{renderInline(c)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return null;
  }
}

export default function TuViChinhTinh14Sao() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    window.__scrollArticleToTop?.();
  }, [active]);

  const blocks = parseBlocks(SECTIONS[active].body);
  const hasPrev = active > 0;
  const hasNext = active < SECTIONS.length - 1;

  return (
    <div className="tv-root">
      <style>{CSS}</style>

      <header className="tv-hd">
        <div className="tv-brand">
          <div className="tv-brand-mark">紫</div>
          <div>
            <div className="tv-brand-t">TỬ VI ĐẨU SỐ</div>
            <div className="tv-brand-s">Phương pháp luận đọc lá số &amp; 14 chính tinh</div>
          </div>
        </div>
      </header>

      <nav className="tv-crumb-wrap mobile-static">
        <div className="tv-crumb">
          {SECTIONS.map((s, idx) => (
            <button
              key={idx}
              className={"tv-crumb-pill" + (idx === active ? " on" : "")}
              onClick={() => setActive(idx)}
            >
              <span className="tv-crumb-n">{String(idx).padStart(2, "0")}</span>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="tv-stage" ref={scrollRef}>
        <div className="tv-prose">
          {blocks.map((b, i) => (
            <Block b={b} key={i} />
          ))}
        </div>

        {(hasPrev || hasNext) && (
          <div className="tv-nav-wrap">
            {hasPrev ? (
              <button className="tv-nav-btn tv-prev-btn" onClick={() => setActive(active - 1)}>
                {"\u2190 Quay lại: " + SECTIONS[active - 1].label}
              </button>
            ) : <span />}
            {hasNext && (
              <button className="tv-nav-btn tv-next-btn" onClick={() => setActive(active + 1)}>
                {"Tiếp: " + SECTIONS[active + 1].label + " \u2192"}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------
   CSS — phong cách "giấy ấm" đồng bộ với các tab Language khác.
   Lưu ý: App.jsx có style toàn cục ".article-content ul/ol/li/table/th/td"
   dùng !important với specificity (0,1,1) — để không bị ghi đè (gây hiện
   tượng "2 chấm bullet" chồng lên nhau), mọi selector list/table dưới đây
   đều bọc thêm ".tv-root" để nâng specificity lên (0,2,x) và cũng dùng
   !important.
--------------------------------------------------------------- */
const CSS = `
* { box-sizing: border-box; }
.tv-root {
  --ink:${INK}; --paper:${PAPER}; --panel:${PANEL}; --rule:${RULE}; --muted:${MUTED}; --accent:${ACCENT};
  --han:${HAN_COLOR}; --pinyin:${PINYIN_COLOR};
  display: flex; flex-direction: column;
  background: var(--paper); color: var(--ink);
  font-family: ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif;
  font-size: 15px; line-height: 1.55;
}

.tv-hd { display: flex; align-items: center; gap: 18px; padding: 14px 20px; border-bottom: 1px solid var(--rule); background: #FCFBF8; }
.tv-brand { display: flex; gap: 10px; align-items: center; }
.tv-brand-mark {
  width: 36px; height: 36px; flex-shrink: 0;
  border: 1.5px solid var(--accent); color: var(--accent);
  font-family: Georgia, serif; font-size: 20px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; border-radius: 3px;
}
.tv-brand-t { font-family: Georgia, serif; font-weight: 700; font-size: 15px; letter-spacing: 0.04em; color: var(--ink); }
.tv-brand-s { font-size: 11px; color: var(--muted); margin-top: 1px; }

.tv-crumb-wrap { position: sticky; top: 0; z-index: 15; background: #FCFBF8; border-bottom: 1px solid var(--rule); }
.tv-crumb { display: flex; gap: 6px; flex-wrap: wrap; padding: 9px 20px; }
.tv-crumb-pill {
  display: flex; align-items: center; gap: 6px;
  border: 1px solid var(--rule); background: #fff; border-radius: 20px;
  padding: 7px 13px; cursor: pointer; font-size: 12.5px; font-weight: 600;
  color: var(--muted); white-space: nowrap; transition: all .12s;
}
.tv-crumb-pill:hover { border-color: var(--accent); color: var(--ink); }
.tv-crumb-pill.on { background: var(--accent); border-color: var(--accent); color: #fff; }
.tv-crumb-n {
  font-family: Georgia, serif; font-weight: 700; font-size: 10.5px;
  width: 16px; height: 16px; border-radius: 3px;
  background: rgba(107,79,160,.14); color: var(--accent);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.tv-crumb-pill.on .tv-crumb-n { background: rgba(255,255,255,.28); color: #fff; }

.tv-stage { padding: 24px 40px 80px; }
.tv-prose { max-width: 880px; }

.tv-h1 { font-family: Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.18; margin: 6px 0 18px; letter-spacing: -0.01em; }
.tv-h2 { font-family: Georgia, serif; font-weight: 600; font-size: 20px; margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 1px solid var(--rule); }
.tv-h3 { font-family: ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif; font-weight: 600; font-size: 14px; color: var(--accent); margin: 18px 0 6px; letter-spacing: 0.02em; }
.tv-hr { border: none; border-top: 1px solid var(--rule); margin: 26px 0; }
.tv-p { margin: 0 0 12px; font-size: 14.5px; line-height: 1.65; color: var(--ink); }

/* Chữ Hán (đỏ son), Pinyin (xanh ngọc), ghi chú tiếng Việt in nghiêng (xám) —
   dùng thống nhất ở mọi nơi: đoạn văn, bullet, heading phụ, ô bảng. KHÔNG áp
   dụng cho H1 (xem renderInlinePlain). */
.tv-han { color: var(--han); font-weight: 600; }
.tv-pinyin { color: var(--pinyin); font-style: italic; font-weight: 500; }
.tv-note { color: var(--muted); font-style: italic; }

.tv-root .tv-ul { list-style: none !important; margin: 0 0 14px !important; padding: 0 !important; display: flex; flex-direction: column; gap: 7px; }
.tv-root .tv-ul li { list-style: none !important; position: relative; padding-left: 16px; margin: 0 !important; font-size: 14px; line-height: 1.58; color: var(--ink); }
.tv-root .tv-ul li::marker { content: "" !important; }
.tv-root .tv-ul li::before { content: ""; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--ink); }

.tv-root .tv-ol { list-style: none !important; counter-reset: tv-ol; margin: 0 0 14px !important; padding: 0 !important; display: flex; flex-direction: column; gap: 8px; }
.tv-root .tv-ol li { list-style: none !important; counter-increment: tv-ol; position: relative; padding-left: 26px; margin: 0 !important; font-size: 14px; line-height: 1.6; color: var(--ink); }
.tv-root .tv-ol li::marker { content: "" !important; }
.tv-root .tv-ol li::before {
  content: counter(tv-ol) "."; position: absolute; left: 0; top: 0;
  font-family: Georgia, serif; font-weight: 700; color: var(--ink);
}

.tv-root .tv-table-wrap { overflow-x: auto; margin: 8px 0 20px; border: 1px solid var(--rule); border-radius: 6px; }
.tv-root .tv-table { border-collapse: collapse !important; width: 100% !important; max-width: 100% !important; font-size: 13px !important; margin: 0 !important; border: none !important; border-radius: 0 !important; }
.tv-root .tv-table th, .tv-root .tv-table td { border-bottom: 1px solid var(--rule) !important; border-right: 1px solid var(--rule) !important; padding: 9px 12px !important; text-align: left !important; vertical-align: top !important; line-height: 1.5 !important; color: var(--ink) !important; }
.tv-root .tv-table td.tv-han { color: var(--han) !important; font-weight: 600; }
.tv-root .tv-table td.tv-pinyin { color: var(--pinyin) !important; font-style: italic; font-weight: 500; }
.tv-root .tv-table th:last-child, .tv-root .tv-table td:last-child { border-right: none !important; }
.tv-root .tv-table thead th {
  background: var(--panel) !important; font-family: Georgia, serif !important; font-weight: 600 !important;
  color: var(--ink) !important; white-space: nowrap; text-transform: none !important; font-size: 13px !important; letter-spacing: 0 !important;
}
.tv-root .tv-table tbody tr:last-child td { border-bottom: none !important; }
.tv-root .tv-table tbody tr:hover td { background: rgba(107,79,160,.05) !important; }

.tv-nav-wrap { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--rule); }
.tv-nav-btn { display: flex; align-items: center; gap: 6px; padding: 9px 15px; border-radius: 8px; border: 1px solid #ccc; background: transparent; color: var(--ink); font-size: 13px; font-weight: 500; cursor: pointer; }
.tv-nav-btn:hover { border-color: var(--accent); color: var(--accent); }
.tv-next-btn { margin-left: auto; }

@media (max-width: 780px) {
  .tv-hd { padding: 10px 14px; }
  .tv-crumb { padding: 8px 12px; }
  .tv-stage { padding: 20px 18px 60px; }
  .tv-h1 { font-size: 24px; }
  .tv-table { font-size: 12px; }
  .tv-nav-wrap { flex-direction: column; align-items: stretch; }
  .tv-next-btn { margin-left: 0; }
}
`;
