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

const SECTIONS = [
  { label: "Phương pháp luận", body: `# PHƯƠNG PHÁP LUẬN ĐỌC LÁ SỐ TỬ VI ĐẨU SỐ
*(Chương mở đầu — nên đọc trước khi tra cứu chi tiết 14 chính tinh)*

## I. Tổng quan

Tử Vi Đẩu Số (紫微斗數 — zǐwēi dǒushù) dựa trên nguyên lý "Thiên Nhân hợp nhất" (天人合一 — tiānrén héyī). Các sao là ký hiệu biểu tượng (象徵符號), không phải thiên thể vật lý — nguyên tắc "hư tinh hư dụng" (虛星虛用 — xūxīng xūyòng): mượn tên thiên văn cổ nhưng xây dựng hệ thống ký hiệu riêng, không còn ràng buộc bầu trời thật.

Nguồn gốc: đạo sĩ Trần Đoàn (陳摶, tự Đồ Nam) đời Bắc Tống. Hai trường phái: Nam phái (lấy tam hợp Mệnh-Tài-Quan làm gốc, dùng Thái Tuế/thần sát luận theo năm) và Bắc phái (tinh giản 18 sao, coi trọng Tứ Hóa và "phi tinh").

**Nguyên tắc tối quan trọng:** đọc theo "tạo mệnh luận" (造命論 — zàomìng lùn), không phải "túc mệnh luận" (宿命論 — sùmìng lùn). Lá số cho biết khuynh hướng/tiềm năng, không phải định mệnh cố định.

## II. Ba khái niệm nền tảng

### 1. Đồng cung > Đối cung > Tam hợp > Giáp cung
- Đồng cung (同宮): ảnh hưởng trực tiếp, mạnh nhất
- Đối cung/Xung chiếu (對宮): mạnh thứ nhì; bắt buộc dùng khi cung là Vô Chính Diệu (無正曜 - "mượn sao đối cung" 借對宮星曜)
- Tam hợp/Hội chiếu (三合/會照): ảnh hưởng từ môi trường bên ngoài
- Giáp cung (夾宮): áp lực/hậu thuẫn ngầm (暗的影響) — như "Tài Ấm giáp Ấn" của Thiên Tướng

### 2. Tam Phương Tứ Chính (三方四正) — khung bắt buộc mọi cung
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
Tổ hợp lý tưởng: "nhất cương nhất nhu" (一剛一柔) giữa Mệnh-Thân.

### Bước 2 — Xác định nhóm hành vi tại Mệnh
- Sát Phá Liêm Tham (殺破廉貪): nhanh-cứng-sớm-ẩn (快剛早陰) — khai phá biến động; nên tránh việc lặp lại tù túng
- Cơ Nguyệt Đồng Lương (機月同梁): chậm-mềm-muộn-hiện (慢柔晚陽) — ổn định tham mưu; "忌煞也善三分" dù gặp sát vẫn giữ 3 phần thiện; hợp môi trường có hệ thống/quy trình
- Tử Phủ Liêm Vũ Tướng (紫府廉武相): quản lý tài nguyên, quyền lực; giỏi vận hành/duy trì hệ thống có sẵn hơn là khởi xướng

QUAN TRỌNG: Thái Dương, Thái Âm KHÔNG thuộc nhóm nào trong 3 nhóm này — vì đây là phân loại "Cách Cục hành vi" (格局) khác với phân loại "Tinh Hệ" (星系, theo thuật toán an sao: Tử Vi tinh hệ 6 sao gồm cả Thái Dương; Thiên Phủ tinh hệ 8 sao gồm cả Thái Âm). Thái Dương/Thái Âm là "Trung Thiên tinh" (中天星) vì bản chất cốt lõi của chúng DAO ĐỘNG theo điều kiện bên ngoài (ngày/đêm sinh, miếu/hãm theo địa chi) — khác 12 sao kia có tính cách tương đối cố định bất kể hoàn cảnh.

### Bước 3 — Phân tích Tam Phương Tứ Chính
Quy trình: (1) liệt kê toàn bộ sao tại cả 4 cung, (2) đếm tỷ lệ cát/hung — "độ sạch cách cục" (格局清濁), (3) đối chiếu cách cục có tên riêng, (4) nếu không khớp cách cục cụ thể, luận theo nguyên tắc tổng quát tỷ lệ cát/hung.

### Bước 4 — Tứ Hóa 3 tầng
- Sinh niên Tứ Hóa (生年四化): xu hướng cốt lõi cả đời
- Đại vận Tứ Hóa (大限四化): trọng tâm biến động 10 năm
- Lưu niên Tứ Hóa (流年四化): sự kiện thiết thân trong năm
Ẩn dụ: nền đất (lá số gốc) → công trình (Đại Vận) → cánh cửa mở ra (Lưu Niên).
Nguyên tắc "Trùng điệp" (疊併 - diébìng): Hóa Kỵ 3 tầng cùng rơi vào 1 cung/cung xung chiếu nhau → biến cố lớn, bước ngoặt.

### Bước 5 — Nhận diện cách cục
Luôn kiểm tra điều kiện "phá cách" (破格) song song: gặp Địa Không/Địa Kiếp tại vị trí tạo cách, Hóa Kỵ vào đúng sao chủ đạo, hoặc quá nhiều sát tinh vô chế áp đảo.

### Bước 6 — Tổng hợp theo lĩnh vực
- Tính cách: Mệnh chủ tinh + Tứ Hóa tại Mệnh + vị trí Thân
- Sự nghiệp: Quan Lộc chủ tinh + cách cục lớn tại Mệnh + sao chủ Quan Lộc
- Tài vận: Tài Bạch (kiếm) + Phúc Đức (giữ/tiêu) + Điền Trạch (tích lũy) — KHÔNG được gộp chung 3 cung này
- Tình cảm: Phu Thê chủ tinh + Thái Tuế nhập cung đối phương

## IV. Năm nguyên tắc phán đoán nâng cao

**1. Sao chủ cung (宮位主星系統):** mỗi cung có "sao chủ" cố định bất kể lá số — Huynh Đệ=Thiên Cơ, Tài Bạch=Vũ Khúc, Điền Trạch=Thái Âm, Phúc Đức/Tật Ách=Thiên Đồng, Giao Hữu=Cự Môn, Quan Lộc=Liêm Trinh/Vũ Khúc, Phụ Mẫu=Thái Dương... — cần xem cả vị trí/cát hung của sao chủ cung này ở nơi khác trong lá số để điều chỉnh then chốt (關鍵性修正). Lưu ý: bảng này có dị biệt nhỏ giữa các phái.

**2. Thái Tuế nhập cung (太歲入宮法):** luận quan hệ với người cụ thể phải kết hợp thêm cung ứng với Chi năm sinh (Thái Tuế) của ĐỐI PHƯƠNG trên chính lá số của MÌNH.

**3. Vô Chính Diệu:** cung không chính tinh luôn "yếu" (弱), phải mượn đối cung nhưng lực nhẹ hơn tọa thủ trực tiếp.

**4. Sát tinh hữu chế (煞星有制):** Kình Đà Hỏa Linh không mặc định xấu — gặp cát tinh/cát hóa hoặc chính tinh miếu vượng kiềm chế thì hung tính giảm, có thể thành động lực đặc biệt (Hỏa Tham, Mã đầu đới tiễn). Vô chế thì hung tính bộc lộ tối đa.

**5. Tổng thể cách cục ưu tiên:** không kết luận từ 1 cung/1 sao đơn lẻ — luôn cần phối hợp Tam Phương Tứ Chính và tỷ lệ cát/hung tổng thể.

## V. Sáu lỗi phổ biến nhất

**1. Nhầm lẫn tên cung:** "Nô Bộc cung" (奴僕宮 - quan hệ cấp trên/dưới, chủ/nhân viên) bị gọi nhầm "Giao Hữu cung" rồi hiểu lầm bao gồm cả bạn bè ngang hàng (thực ra gần Huynh Đệ cung mở rộng hơn). "Cung tướng mạo" gán cho Phụ Mẫu cung là thêm thắt vô căn cứ — Phụ Mẫu cung chỉ phản ánh cảm nhận chủ quan về quan hệ tình cảm, không đoán ngoại hình.

**2. Hiểu sai chức năng cung:** Tật Ách cung = "nền tảng thể chất tổng quát", KHÔNG phải bản đồ chẩn đoán bệnh cụ thể (12 cung không thể mã hóa hàng ngàn loại bệnh). Quan Lộc cung = thái độ/phong cách làm việc, KHÔNG trực tiếp chỉ ra nghề nghiệp cụ thể.

**3. Chỉ nhìn một sao đơn lẻ:** VD sai "Mệnh có Thiên Đồng → chắc chắn lười" — cần xem đồng cung sao gì, có Hóa Quyền không, có Mã đầu đới tiễn không, Đại Vận hiện tại ra sao.

**4. Diễn giải quá mức sát tinh:** cùng Kình Dương nhưng với Thiên Đồng/Thái Âm tại Ngọ (đủ điều kiện năm sinh) → Mã đầu đới tiễn (cát); với Cự Môn hãm không Thái Dương giải ám → hung. Kết quả trái ngược tùy chính tinh đi cùng.

**5. Bỏ qua yếu tố thời gian:** lá số gốc = kịch bản đã viết (劇本); Đại Vận/Lưu Niên = đang chiếu cảnh nào (演到哪一幕). Chỉ đọc kịch bản mà không biết đang ở cảnh nào thì không dự đoán được hiện tại.

**6. Tư duy định mệnh cứng nhắc:** VD 2 người cùng Cự Môn Hóa Kỵ tại Mệnh (dễ khẩu nghiệp) — một chọn bán hàng (liên tục xung đột), một học luật (thành luật sư giỏi tranh biện). Cùng khuynh hướng bẩm sinh, khác cách vận dụng hậu thiên → kết quả đối lập.

## VI. Tâm pháp tổng kết (5 nguyên tắc thứ tự tư duy)

1. **Từ tổng thể đến cục bộ** — tránh "kiến thụ bất kiến lâm" (見樹不見林 - thấy cây không thấy rừng)
2. **Từ tĩnh đến động** — lá số gốc trước, Đại Vận/Lưu Niên sau
3. **Từ chính đến phụ** — 14 chính tinh quyết định khung ~70-80%, phụ tinh chỉ tinh chỉnh
4. **Từ trong ra ngoài** — hiểu lõi (Mệnh) trước khi mở rộng vành ngoài
5. **Khách quan trung lập** — cát hung đan xen là trạng thái bình thường; mục tiêu là giúp người xem nhận diện khuynh hướng để chủ động điều chỉnh, không phải phán quyết số phận đóng đinh` },
  { label: "Thái Dương", body: `# Thái Dương (太陽 — *tài yáng* — the Sun)

## 1. Bản chất

**Thái Dương** (太陽 — *tài yáng* — Hán Việt: Thái = to lớn/tối thượng, Dương = khí dương, đối lập với Âm 陰 *yīn* — tiếng Anh: **the Sun**)

- Ngũ hành: Dương Hỏa (陽火 — *yáng huǒ*)
- Hóa khí (化氣 — *huàqì* — "khí mà sao này biến hóa ra") viết là **"Quý"** (貴 — *guì* — cao quý, quyền quý — tiếng Anh: **nobility/status**)
- Thuộc nhóm: **Trung Thiên đẩu chủ tinh** (中天斗主星 — sao chủ của tầng trời giữa), là **Quan Lộc chủ** (官祿主 — *guānlù zhǔ* — sao chủ quản công danh, sự nghiệp). Thái Dương chủ về "quý" (danh vọng, địa vị) chứ không chủ về "phú" (tiền của).
- Đối tinh tự nhiên: **Thái Âm** (太陰 — *tài yīn* — Mặt Trăng)
- Điển tích: trong Phong Thần Bảng (封神榜), Thái Dương được gán cho **Tỷ Can** (比干 — *bǐ gān*), trung thần bị moi tim vì can gián — nên ngoài quang minh, bác ái, Thái Dương còn mang dư vị "trung nghĩa mà chịu thiệt", dễ vướng thị phi/kiện tụng khi phối sát tinh.
- Đại diện nhân sự: nam mệnh → cha, con trai; nữ mệnh → cha, chồng (夫星), con trai.
- Đặc tính riêng: độ sáng (miếu 廟 *miào* / hãm 陷 *xiàn*) biến đổi theo giờ sinh — miếu tại Mão, Thìn, Tị, Ngọ; hãm (thất huy 失輝) tại Tuất, Hợi, Tý, Sửu.

### Nguyên lý nền khi luận Thái Dương
1. **Miếu/Hãm quyết định "lượng" chứ không đổi "chất"**: dù miếu hay hãm, bản chất chủ động — cống hiến của Thái Dương không đổi; cái đổi là mức độ được ghi nhận, đền đáp.
2. **Đọc theo Tam Phương Tứ Chính** (三方四正 — *sān fāng sì zhèng*): luôn xem thêm đối cung và hai cung tam hợp.
3. Hai cách cục kinh điển: **"Nhật Nguyệt tịnh minh"** (日月並明 — Nhật Nguyệt đều miếu, đồng hội) = phú quý song toàn; **"Nhật Nguyệt phản bối"** (日月反背 — cả hai hãm) = vất vả, công không tương xứng.

### Tứ Hóa (四化) của Thái Dương
- **Hóa Lộc** (năm Canh 庚)
- **Hóa Quyền** (năm Tân 辛)
- **Hóa Kỵ** (năm Giáp 甲)
- (Không có Hóa Khoa trong hệ thống truyền thống)

---

## 2. Luận theo 12 cung

### Cung Mệnh (命宮)
Thái Dương thủ Mệnh tại Mão hình thành cách **"Nhật xuất Phù Tang"** (日出扶桑) — khởi đầu rực rỡ, thành danh sớm (đặc biệt nam mệnh sinh ban ngày). Tại Ngọ hình thành **"Nhật lệ trung thiên"** (日麗中天) — vượng khí nhất, đại phú đại quý, nhưng cần Tứ Hóa/Tả Hữu/Xương Khúc hội hợp mới trọn vẹn, nếu không dễ "hữu danh vô thực" (有名無實).

Cơ chế tâm lý: Thái Dương là sao duy nhất trong 14 chính tinh mang tính "cho đi" thuần túy (khác Thiên Lương thiên về "phù trợ, đỡ đần"; Thái Dương thiên về "chiếu rọi, dẫn dắt"). Người Mệnh Thái Dương vô thức tìm vai trò trung tâm vì bản năng cần "có việc để tỏa nhiệt" — Thái Dương hãm mà không có việc để làm thường trầm uất nhanh hơn các sao khác.

Đồng cung Cự Môn (Dần/Thân — cách "Dương Cự"): khẩu tài xuất sắc, hợp luật sư/giáo dục/truyền thông, dễ thị phi. Đồng cung Thiên Lương (Mão/Dậu — cách "Dương Lương"), gặp Xương Khúc Lộc Tồn → "Dương Lương Xương Lộc" — quý hiển học thuật.

### Cung Huynh Đệ (兄弟宮)
Anh chị em có xu hướng là người dẫn đầu trong quan hệ xã hội của chính họ — hữu ích làm cầu nối (牽線 — *qiānxiàn*) nhưng tình ruột thịt không đậm đà bằng các sao chủ tình cảm.

### Cung Phu Thê (夫妻宮)
Phối ngẫu chính họ mang bản chất Thái Dương — chủ động, có sự nghiệp riêng. Nam dễ cưới vợ sự nghiệp nổi bật; cần đủ rộng lượng (寬宏 — *kuānhóng*) để không mặc cảm. Nữ mệnh Thái Dương hãm tại Phu Thê là tổ hợp cần lưu ý nhất — nên kết hôn muộn hoặc chọn đối tác đủ tự tin để không cạnh tranh ngầm.

### Cung Tử Tức (子女宮)
Con cái hoạt bát, hướng ngoại; cha mẹ có phong cách giáo dục "mở", ít kiểm soát chi tiết — tốt cho con hướng ngoại nhưng có thể khiến trẻ nhạy cảm cảm thấy thiếu quan tâm sát sao.

### Cung Tài Bạch (財帛宮)
Tài vận luôn đi kèm danh tiếng — tiền đến từ việc được biết đến/tin tưởng, không phải tài lộc âm thầm kiểu Vũ Khúc/Thiên Phủ. Dòng tiền ra vào nhanh (財來財去) nếu gặp Địa Không Địa Kiếp vì thích phô trương.

### Cung Tật Ách (疾厄宮)
Chủ về đầu, mắt, hệ tuần hoàn (Hỏa vượng → khí bốc lên trên). Đây là suy luận biểu tượng học truyền thống, không phải chẩn đoán y khoa — chỉ nên xem là gợi ý lưu tâm, không thay thế thăm khám thực tế.

### Cung Thiên Di (遷移宮)
Đối cung của Mệnh → Mệnh Vô Chính Diệu, phải "mượn" ánh sáng từ môi trường ngoài để định hình bản thân. Dễ tỏa sáng khi ra ngoài, gặp quý nhân hơn ở nhà; nhưng nội tâm thiếu trục quy chiếu chắc chắn, thường "biết mình là ai" qua phản hồi từ bên ngoài.

### Cung Giao Hữu / Nô Bộc (交友宮)
Vòng bạn bè/đồng nghiệp có địa vị cao hoặc phong cách hào phóng (海派 — *hǎipài*). Thái Dương thường "cho đi" nhiều hơn nhận trong tình bạn — dễ đứng ra chi trả, tổ chức — nên dễ ảnh hưởng tài chính cá nhân nếu không tiết chế.

### Cung Quan Lộc (官祿宮)
Cung đắc vị nhất vì trùng vai trò gốc Quan Lộc chủ. Miếu vượng tại Ngọ độc tọa: có thể "lãnh đạo quần luân" (領導群倫). Hợp: chính trị, ngoại giao, giáo dục, truyền thông, luật, năng lượng.

### Cung Điền Trạch (田宅宮)
Điền Trạch là "kho chứa" còn Thái Dương bản chất "phát tán" — xung khắc nhẹ, giải thích mẫu hình tổ nghiệp ban đầu hưng vượng nhưng dễ hao tán về sau; cần chủ động vun đắp thêm.

### Cung Phúc Đức (福德宮)
Hạnh phúc gắn với được hoạt động/cống hiến, không phải nghỉ ngơi tĩnh tại — "an nhàn trong bận rộn". Nữ mệnh Thái Dương miếu vượng tại đây là một trong những cách cục đời sống nội tâm viên mãn nhất trong 14 chính tinh.

### Cung Phụ Mẫu (父母宮)
Ý nghĩa nhân đôi vì Thái Dương vốn là "phụ tinh". Miếu vượng: quan hệ cha con thân cận (親近), cha có uy tín xã hội. Hãm/Hóa Kỵ: duyên cha mỏng, khoảng cách thế hệ, cha vắng nhà nhiều vì công việc.

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

---

## 4. Bảng từ vựng (tính từ trọng tâm)

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

---

---

## Thái Dương — bổ sung
- Cơ chế lục thân mở rộng: gốc Bát Quái (Càn=cha/Khôn=mẹ); Thái Dương là "quan sát viên" cho mọi quan hệ nam giới mở rộng (cấp trên, khách hàng nam).
- "Nhật Nguyệt phản bối" chi tiết: cả 2 sao hãm → cần "gấp đôi nỗ lực" (加倍努力), không nản lòng (灰心), cần kiên trì (堅持).
- Phân biệt "Quý" (貴 - địa vị chính thức) vs "Danh" (名 - tiếng tăm nói chung, rộng hơn) — Thái Dương hợp hệ thống có cấp bậc rõ ràng hơn con đường tự do.` },
  { label: "Thái Âm", body: `# THÁI ÂM (太陰 — tài yīn — the Moon)

## 1. Bản chất
- Ngũ hành: Âm Thủy (陰水 — yīn shuǐ, Quý Thủy 癸水)
- Hóa khí: "Phú" (富 — fù — giàu có, sung túc)
- Là Điền Trạch chủ (田宅主 — tiánzhái zhǔ)
- Đối tinh: Thái Dương
- Điển tích: Giả phu nhân (賈夫人), vợ Hoàng Phi Hổ trong Phong Thần Bảng
- Đại diện: mẹ, vợ, con gái
- Miếu vượng: Dậu, Tuất, Hợi, Tý, Sửu (đêm); Hãm: Mão, Thìn, Tị, Ngọ, Mùi (ngày) — đối pha với Thái Dương

## Nguyên lý nền
Thái Âm vận hành ngược Thái Dương: thu vào, lắng đọng, nuôi dưỡng âm thầm — là sao duy trì tính liên tục của của cải qua thời gian, nên kiêm vai trò Điền Trạch chủ.

## 2. Luận theo 12 cung
- Mệnh: thanh tú, ôn hòa (溫和 — wēnhé), yêu cái đẹp; dễ "đào tị hiện thực" (逃避現實 — táobì xiànshí — escapism), tự làm tổn thương mình vì kỳ vọng lãng mạn hóa cuộc sống.
- Huynh Đệ: duyên sâu đậm, có người giỏi văn chương/nghệ thuật.
- Phu Thê: phối ngẫu nội hướng (內向 — nèixiàng); vị trí tốt cho hôn nhân hơn Thái Dương.
- Tử Tức: con chín chắn sớm (練達成熟 — liàndá chéngshú), nhạy cảm nghệ thuật nhưng hơi "thần kinh chất" (神經質 — shénjīngzhì).
- Tài Bạch: tốt cho người sinh đêm; tài vận âm thầm mà bền.
- Tật Ách: đau bụng/lưng, ù tai, hồi hộp, rối loạn nội tiết (biểu tượng học, không phải chẩn đoán y khoa).
- Thiên Di: được nữ giới giúp, hợp sinh hoạt đêm.
- Giao Hữu: đông bạn, hợp bạn khác giới, bạn thường lớn tuổi hơn.
- Quan Lộc: hợp nghề sáng tạo/nội tâm (văn, thơ, diễn xuất) hoặc trí tuệ (luật, lập trình, biên tập) nếu tại Tý.
- Điền Trạch: cung đắc vị nhất — nhiều bất động sản nếu miếu vượng.
- Phúc Đức: lãng mạn, an nhàn tĩnh lặng kiểu "chậm mà chắc".
- Phụ Mẫu: ảnh hưởng sâu từ mẹ, gia đình ấm áp nếu miếu vượng.

## 3. Tứ Hóa (Lộc: Đinh 丁 | Quyền: Mậu 戊 | Khoa: Canh 庚 | Kỵ: Ất 乙)
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
| Phụ Mẫu | Duyên mẹ sâu đậm | — | Tình cảm mẹ sâu sắc | Duyên mẹ mỏng |

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Ôn hòa | 溫和 | wēnhé | Ôn (ấm) + Hòa (hài hòa) | gentle, mild |
| Đào tị hiện thực | 逃避現實 | táobì xiànshí | trốn tránh + thực tại | escapism |
| Nội hướng | 內向 | nèixiàng | bên trong + hướng về | introverted |
| Luyện đạt thành thục | 練達成熟 | liàndá chéngshú | rèn giũa thông suốt + chín muồi | mature |
| Thần kinh chất | 神經質 | shénjīngzhì | thần kinh + tính chất | high-strung |

---

---

## Thái Âm — bổ sung
**"Nguyệt lãng thiên môn"** (月朗天門格): Thái Âm độc tọa Hợi — kéo theo "Nhật chiếu Lôi Môn" (Quan Lộc: Thái Dương+Thiên Lương tại Mão) và "Minh châu xuất hải" (Tài Bạch tại Mùi). Điều kiện tiên quyết: phải sinh BAN ĐÊM mới thực sự vượng, sinh ngày thì giảm cách dù cùng cung Hợi.

Cơ chế: Thái Âm là sao duy nhất mà cả GIỚI TÍNH người sinh và THỜI ĐIỂM sinh (ngày/đêm) cùng quyết định độ vượng theo 2 trục riêng biệt — nữ mệnh + sinh đêm = "vượng kép".

Liên hệ: "Nguyệt lãng thiên môn" (Hợi) là ảnh phản chiếu của "Nhật xuất Phù Tang" (Mão) của Thái Dương — khi xuất hiện cùng lúc trong tam hợp/xung chiếu chính là hiện thân của "Nhật Nguyệt tịnh minh".

---

## Thái Âm — bổ sung
- Cơ chế Điền Trạch chủ: Thủy "nhu mà thấm sâu" (柔而滲透), tích tụ ở chỗ thấp (低處匯聚) — khác Hỏa bốc tỏa.
- "Thủy trừng quế ngạc" (水澄桂萼格): Thái Âm+Thiên Đồng tại Tý, cát tinh hội — thiên về thanh khiết/học vấn (清秀，優雅，學問過人) hơn phú quý vật chất.
- So sánh Thái Dương-Thái Âm về "chủ": chỉ là thiên hướng ưu tiên (傾向性優先), không phải giới hạn tuyệt đối.` },
  { label: "Tử Vi", body: `# TỬ VI (紫微 — zǐwēi — Emperor Star)

## 1. Bản chất
- Ngũ hành: Âm Thổ (己土)
- Hóa khí: "Tôn" (尊 — zūn — tôn quý)
- Bắc Đẩu chủ tinh, Đế tinh (帝星), kiêm Quan Lộc chủ
- Điển tích: Bá Ấp Khảo (伯邑考), con trưởng Chu Văn Vương
- Đặc điểm riêng: KHÔNG BAO GIỜ Hóa Lộc, KHÔNG BAO GIỜ Hóa Kỵ — chỉ Hóa Quyền (Nhâm 壬) và Hóa Khoa (Ất 乙)

## Nguyên lý nền
"Quần thần khánh hội" (群臣慶會) — cần Tả Hữu Xương Khúc Khôi Việt Phủ Tướng phò tá mới phát huy sức mạnh; đơn thủ gọi là "cô quân" (孤君 — gū jūn). Có khả năng "chế sát" (制煞 — zhì shà) — giảm nhẹ hung tính của sát tinh đồng cung.

## 2. Luận theo 12 cung
- Mệnh: đôn hậu, thanh nhã, giỏi quản lý; nhược điểm "nhĩ căn tử nhuyễn" (耳根子軟 — dễ bị nịnh). Đồng cung Thiên Phủ: sung túc vật chất, nguyên tắc. Đồng cung Thất Sát: ngoài tĩnh trong cương. Đồng cung Phá Quân: bá khí, độc lập.
- Huynh Đệ: có người đáng nương tựa.
- Phu Thê: nam vợ hiền; nữ "lấy chồng làm vinh"; nên kết hôn muộn.
- Tử Tức: con xuất sắc, nhạy bén.
- Tài Bạch: cả đời không lo cơm áo.
- Tật Ách: ít bệnh nặng.
- Thiên Di: được quý nhân giúp, phong thái thuyết phục.
- Giao Hữu: bạn bè đông, địa vị cao.
- Quan Lộc: cung đắc vị nhất — quản lý cấp cao.
- Điền Trạch: sản nghiệp lớn, hợp đất cao.
- Phúc Đức: chăm chỉ, tu dưỡng, phúc dày.
- Phụ Mẫu: hòa hợp, cha mẹ địa vị cao — có thể cản trở tính độc lập.

## 3. Tứ Hóa (chỉ Quyền: Nhâm 壬 | Khoa: Ất 乙)
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
| Phụ Mẫu | Cha mẹ địa vị cao, ảnh hưởng tính độc lập | Tình cảm cha mẹ tốt |

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Nhĩ căn tử nhuyễn | 耳根子軟 | ěrgēnzi ruǎn | gốc tai + mềm | easily swayed by flattery |
| Đôn hậu | 敦厚 | dūnhòu | dày dặn chân thành + hậu hĩnh | sincere, warm |
| Thanh nhã | 高雅 | gāoyǎ | cao sang + tao nhã | elegant |
| Cô quân | 孤君 | gū jūn | đơn độc + vua | isolated ruler |
| Chế sát | 制煞 | zhì shà | khống chế + hung sát | subduing malefics |

---

---

## Tử Vi — bổ sung
**"Tử Phủ triều viên"** (紫府朝垣格): khác "Tử Phủ đồng cung" — đây là Tử Vi và Thiên Phủ không đồng cung nhưng cùng hội chiếu Mệnh qua tam hợp (VD: Vũ Tướng thủ Mệnh Dần/Thân, tam hợp có Tử Vi + Thiên Phủ). Cổ ngữ: "Tử Phủ triều viên, thực lộc vạn chung" — 1 trong 4 biến thể cách phú quý cao nhất.

Tử Vi tại Ngọ (nhập miếu) LUÔN tốt hơn tại Tý (chỉ bình hòa) dù cùng "độc tọa" — "độc tọa" ≠ "cô quân yếu" nếu có "Song Lộc triều viên" (雙祿朝垣 — 2 nguồn Lộc cùng chầu).

Đặc điểm định danh: Tử Vi (giống Thiên Phủ) gần như KHÔNG CÓ vị trí hãm địa thực sự — chỉ dao động miếu/vượng ↔ bình hòa, không bao giờ "hãm" như Thái Dương/Thái Âm/Cự Môn. Nhất quán với việc không có Hóa Lộc/Kỵ — cả vị trí lẫn tứ hóa đều "không chạm đáy".

---

## Tử Vi — bổ sung
- Nguồn gốc thiên văn: Tam Viên (三垣) - Tử Vi Viên (紫微垣) bao quanh Bắc Cực tinh (北極星), 15 sao xếp tường thành, gốc của "Tử Cấm Thành".
- Cơ chế quần thần từ Nho giáo: "vô vi nhi trị" (無為而治) - vua giỏi biết trọng dụng (重用) hiền tài, không độc đoán (獨裁).
- "Tôn" (địa vị bẩm sinh 與生俱來) khác "Quý" của Thái Dương (địa vị đạt được qua tích lũy 累積).` },
  { label: "Thiên Phủ", body: `# THIÊN PHỦ (天府 — tiān fǔ — the Treasury Star)

## 1. Bản chất
- Ngũ hành: Dương Thổ (戊土)
- Hóa khí: "Lệnh" (令 — lìng)
- Nam Đẩu chủ tinh, kiêm cả Tài Bạch chủ và Điền Trạch chủ — "Lộc khố" (祿庫)
- Vai trò: tể tướng/phụ chính của Tử Vi. Cách "Phủ Tướng triều viên" (府相朝垣) là cách cục ổn định phú quý bậc cao.
- Điển tích: Khương Hoàng Hậu (姜皇后) — Phong Thần Bảng
- Kỵ nhất: Địa Không, Địa Kiếp (đặc biệt Địa Kiếp)

## Nguyên lý nền
Thiên Phủ là chính tinh DUY NHẤT không có Tứ Hóa nào (không Lộc/Quyền/Khoa/Kỵ) — triết lý "kho không tự biến động". Nguyên tắc "Khố cần có Lộc" (庫須有祿): Thiên Phủ không tự sinh tài, chỉ cất giữ tài các sao khác tạo ra. Không có Lộc Tồn/Hóa Lộc lân cận → "không khố" (空庫 — kōng kù) — có danh không có thực.

## 2. Luận theo 12 cung
- Mệnh: ôn hòa nho nhã (溫文儒雅), đa tài; nhược điểm "đãi đọa" (怠惰 — dàiduò — trì trệ). Đồng cung Vũ Khúc (Tý/Ngọ — "Vũ Phủ"): giỏi kinh doanh, thiên vật chất. Đồng cung Liêm Trinh (Sửu/Mùi — "Liêm Phủ"): giỏi giao tiếp nhưng dễ hẹp hòi. Đồng cung Tử Vi (Dần/Thân — "Tử Phủ"): sung túc vật chất, nội tâm dễ trống rỗng.
- Huynh Đệ: đông anh em, khí độ rộng rãi.
- Phu Thê: dịu dàng, gắn bó, coi tinh thần hơn vật chất.
- Tử Tức: con tài năng, hiếu thảo.
- Tài Bạch: cung đắc vị — kể cả gặp Không Kiếp vẫn giữ nền tảng phú túc cơ bản.
- Tật Ách: ít bệnh nặng.
- Thiên Di: ra ngoài được phúc, người lớn tuổi nâng đỡ.
- Giao Hữu: bạn đông, xuất thân tốt.
- Quan Lộc: hợp công chức/kinh doanh ổn định hơn mạo hiểm lớn.
- Điền Trạch: nên phát triển dưới sự dẫn dắt người khác hơn tự đầu tư độc lập quy mô lớn.
- Phúc Đức: đa tài, an vui, phúc thọ song toàn.
- Phụ Mẫu: gia đình khá giả, cha mẹ ôn hòa công bằng.

## 3. Tứ Hóa: Không có (đặc điểm định danh của sao này)

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Văn nhã lịch thiệp | 溫文儒雅 | wēnwén rúyǎ | mềm mại có học thức + từng trải khéo léo | gentle & cultured |
| Đãi đọa | 怠惰 | dàiduò | lười biếng + sa sút | inert, lazy |
| Không khố | 空庫 | kōng kù | rỗng + kho | empty treasury |

---

---

## Thiên Phủ — bổ sung
**"Lộ khố"** (露庫 — lù kù): Thiên Phủ gặp Không/Kiếp mà KHÔNG có Lộc đi kèm → của cải phô ra ngoài, dễ hao tán bởi ngoại cảnh (khác "không khố" là chưa từng có gì).

Đặc điểm: Thiên Phủ (giống Tử Vi) gần như không có hãm địa hoàn toàn — điểm yếu không nằm ở "kho ở đâu" mà ở "kho có được nạp Lộc hay không".

Thiên Phủ tại Mão/Dậu (đối cung luôn là Thất Sát) — vị trí kém vững chãi nhất vì bị "chiến tướng" xung chiếu trực tiếp.

---

## Thiên Phủ — bổ sung
- Phân biệt Bắc Đẩu (mệnh 命 - thừa hưởng 承受) và Nam Đẩu (thân 身 - tự tạo dựng 自行創造).
- "Khố" (庫 - kho có cấu trúc, minh bạch) khác "Tàng" (藏 - cất giấu mơ hồ) — Thiên Phủ là "Khố" nên hợp con đường chính quy (正途).
- Quan hệ Phủ-Tướng như Hộ Bộ (戶部) và quan giữ ấn trong triều đình.` },
  { label: "Vũ Khúc", body: `# VŨ KHÚC (武曲 — wǔ qū — the Wealth/Military Star)

## 1. Bản chất
- Ngũ hành: Âm Kim (辛金)
- Hóa khí: "Tài" (財 — cái)
- Bắc Đẩu đệ lục tinh, Tài Bạch chủ — "tài chủ động" (khác Thiên Phủ "tài tĩnh", Thái Âm "tài tích lũy")
- Điển tích: Chu Vũ Vương (周武王)
- Đặc điểm: thuộc nhóm "quả tú" (寡宿), tính "cô khắc" (孤剋) — cổ ngữ "Vũ Khúc nhập Mệnh, nghi vãn hôn"

## Nguyên lý nền
Vũ Khúc và Thiên Phủ đại diện 2 triết lý làm giàu đối lập: Phủ = tài tĩnh, sẵn có, cần giữ; Vũ Khúc = tài động, phải giành lấy bằng quyết đoán/rủi ro. Tính "cương liệt" (剛烈) + "cấp táo" (急躁) cần thiết để giành tài lại chính là nguyên nhân gây cô khắc quan hệ — cơ chế hợp lý, không phải lời nguyền huyền bí.

Tổ hợp đồng cung kinh điển tại Mệnh: Vũ Phủ (Tý/Ngọ) phú quý song toàn; Vũ Tham (Sửu/Mùi — "Tiên bần hậu phú"); Vũ Tướng (Dần/Thân) ổn định; Vũ Sát (Mão/Dậu) cương liệt cực độ, cần nghề chuyên môn; Vũ Phá (Tị/Hợi) mạo hiểm, hao tài, thất thường.

## 2. Luận theo 12 cung
- Mệnh: tài vận cả đời nhưng cô khắc, "nghi nam bất nghi nữ"; đại khí vãn thành (thành công lớn nhưng muộn).
- Huynh Đệ: ít anh em, khó đoàn kết.
- Phu Thê: dễ cãi vã, nên kết hôn muộn cả nam lẫn nữ.
- Tử Tức: con cá tính mạnh, cố chấp; số con ít.
- Tài Bạch: cung đắc vị nhất — tiềm năng lớn trong tài chính/thực nghiệp.
- Tật Ách: thời thơ ấu dễ bệnh/thương tích; về sau vấn đề xương khớp, hô hấp.
- Thiên Di: đối ngoại mạnh, chủ động nhưng vất vả.
- Giao Hữu: bạn đa dạng.
- Quan Lộc: nam hợp DN/tài chính; nữ là "phụ nữ sự nghiệp" chính hiệu.
- Điền Trạch: tự tạo sản nghiệp, hình thức tài sản có thể thay đổi nhưng giữ được nền tảng.
- Phúc Đức: vị trí kém thuận lợi nhất — nóng vội, cố chấp, làm nhiều hưởng ít.
- Phụ Mẫu: cha mẹ nghiêm khắc, cố chấp, kỳ vọng cao; quan hệ êm đềm nhưng thiếu cởi mở.

## 3. Tứ Hóa (Lộc: Kỷ 己 | Quyền: Canh 庚 | Khoa: Giáp 甲 | Kỵ: Nhâm 壬)
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
| Phụ Mẫu | Cha mẹ giỏi kiếm tiền | Cha mẹ nắm quyền tài chính | Cha mẹ để lại tài sản | Cha mẹ nóng tính |

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Cương liệt | 剛烈 | gāngliè | cứng rắn + mãnh liệt | fierce |
| Cấp táo | 急躁 | jízào | gấp gáp + nóng nảy | impatient |
| Cô khắc | 孤剋 | gū kè | đơn độc + khắc chế | isolating |
| Quả tú | 寡宿 | guǎsù | góa/cô đơn + chòm sao | star of solitude |

---

---

## Vũ Khúc — bổ sung
**"Vũ Khúc nhập khố"** (武曲入庫): Vũ Khúc (Kim) tọa Thìn/Tuất/Sửu/Mùi ("tứ mộ khố") = vị trí vững chãi, tích lũy tốt nhất — nghịch lý: sao "động" khi vào đúng vị trí "kho" lại vừa kiếm được vừa giữ được, lý tưởng cho kinh doanh dài hạn.

Cơ chế Ngũ Hành: Kim ứng mùa Thu, tính "túc sát" (肅殺 — nghiêm khắc, thu liễm) — gốc rễ của tính "quyết đoán lạnh lùng", khác hẳn Thổ (Phủ/Tử Vi) mang tính bao dung ổn định.

Phân biệt Vũ Sát (Mão/Dậu — cương liệt CÓ kiểm soát, cần 1 kỹ năng chuyên môn để trút năng lượng, có thể thành công lớn) vs Vũ Phá (Tị/Hợi — cương liệt KHÔNG kiểm soát vì Phá Quân phá cách, quyết đoán biến thành bốc đồng) — cổ thư đánh giá Vũ Sát cao hơn Vũ Phá dù cả hai đều "cương liệt".

---

---

## Vũ Khúc — bổ sung
- Phân biệt "Chính Tài" (正財星 - chính đáng) và "Thiên Tài" (偏財星 - đầu cơ/may rủi, như Tham Lang).
- Giải thích lại "quả tú": không phải lạnh lùng vô tình mà vì chữ "Lợi" (利) luôn ưu tiên hơn tình cảm.
- Điển tích mở rộng: Quan Vũ (關羽), Địch Thanh (狄青) — nhân vật trung dũng văn võ song toàn.` },
  { label: "Thiên Tướng", body: `# THIÊN TƯỚNG (天相 — tiān xiàng — the Minister/Seal Star)

## 1. Bản chất
- Ngũ hành: Dương Thủy (壬水)
- Hóa khí: "Ấn" (印 — yìn)
- Nam Đẩu tinh, "chưởng ấn quan" (掌印官) — thực thi chứ không tự quyết định
- Điển tích: Văn Thái Sư (聞太師)
- KHÔNG có Tứ Hóa (giống Thiên Phủ) — "sao ít cá tính riêng nhất trong 14 chính tinh"

## Nguyên lý nền
Thiên Tướng LUÔN bị kẹp giữa Cự Môn và Thiên Lương (quy luật an sao cố định, không đổi theo lá số):
- Cự Môn Hóa Lộc → "Tài Ấm giáp Ấn" (財蔭夾印) — đại cát, được cả Tài lẫn Ấm bao bọc
- Cự Môn Hóa Kỵ → "Hình Kỵ giáp Ấn" (刑忌夾印) — Thiên Lương biến "Hình" — dễ vướng pháp lý, tổn hại
→ Minh chứng rõ nhất cho khái niệm "sao thụ động hoàn toàn phụ thuộc môi trường xung quanh".

## 2. Luận theo 12 cung
- Mệnh: đôn hậu (敦厚), ôn hòa, chính nghĩa; "cát nhi kém xung" — tốt nhưng thiếu đột phá. Vũ Tướng (Dần/Thân) ổn định; Liêm Tướng (Tý/Ngọ) khéo giao tế, bảo thủ. Đối cung luôn là Phá Quân.
- Huynh Đệ: tình cảm sâu đậm, hỗ trợ nhau.
- Phu Thê: duyên qua bạn học/đồng nghiệp/mai mối, phối ngẫu đoan trang trách nhiệm.
- Tử Tức: con thật thà, coi trọng thể diện.
- Tài Bạch: tài vận hanh thông, giỏi quản lý; vượng nếu có "Tài Ấm giáp Ấn".
- Tật Ách: ít bệnh nặng, chủ yếu ngoài da/huyết áp nhẹ.
- Thiên Di: do dự (優柔寡斷) khi quyết định lớn dù đã chuẩn bị kỹ — nên dứt khoát khi đã sẵn sàng.
- Giao Hữu: trung niên mới thực sự được bạn giúp gây dựng cơ nghiệp.
- Quan Lộc: hợp nghề điều phối/trung gian: bảo hiểm, tư vấn, môi giới.
- Điền Trạch: tích lũy nhờ chăm chỉ, không sẵn có nhưng bền.
- Phúc Đức: phúc vận mạnh, sống thọ, an nhàn.
- Phụ Mẫu: cha mẹ sáng suốt, hướng dẫn khôn ngoan.

## 3. Tứ Hóa: Không có — luận qua Tứ Hóa của Cự Môn/Thiên Lương lân cận.

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Đôn hậu | 敦厚 | dūnhòu | dày dặn chân thành + hậu hĩnh | sincere, warm |
| Ưu nhu quả đoán | 優柔寡斷 | yōuróu guǎduàn | mềm yếu + thiếu quyết đoán | indecisive |

---

---

## Thiên Tướng — bổ sung
- "Chuyên tư y thực" (專司衣食) — quan giữ ấn còn phụ trách hậu cần cơ bản.
- "Phùng Tướng khán Phủ" (逢相看府) — luận Thiên Tướng phải xem cả Thiên Phủ trong tam hợp.
- Thành ngữ "cường đạo thổ phỉ, dã hữu hảo bằng hữu" (強盜土匪，也有好朋友) minh họa tính "lưỡng diện, tiêu chuẩn tự đặt".` },
  { label: "Cự Môn", body: `# CỰ MÔN (巨門 — jù mén — the "Great Gate"/Shadow Star)

## 1. Bản chất
- Ngũ hành: Âm Thủy pha Thổ (癸水, lược hàm Thổ tính)
- Hóa khí: "Ám" (暗 — àn — u ám)
- Bắc Đẩu đệ nhị tinh — sao "chất vấn", thị phi, hoài nghi, phân tích
- Điển tích: Mã Thiên Kim (馬千金), vợ Khương Tử Nha — "thần thị phi"
- Lục thân duyên mỏng nói chung, không đại diện riêng vai vế cụ thể

## Nguyên lý nền
Cự Môn không tự phát sáng — cần Thái Dương chiếu vào để "giải Ám": cách "Minh Nhật củng chiếu" (明日拱照) khi đồng cung/tam hợp Thái Dương vượng (Dần tốt hơn Thân) → hoài nghi thành phân tích sắc bén, thị phi thành hùng biện.

**"Thạch trung ẩn ngọc"** (石中隱玉格): Cự Môn độc tọa Tý (đẹp hơn Ngọ vì tam hợp Thái Dương tại Thìn vượng hơn Tuất) — ngọc ẩn trong đá, cần mài giũa (vất vả trẻ) mới sáng (thành công trung niên). Đặc biệt: đạt đỉnh cao thì KHÔNG nên phô trương — càng giữ kín càng bền, vì bản chất "Ám" vẫn tiềm ẩn, phô trương dễ thành mục tiêu công kích.

## 2. Luận theo 12 cung
- Mệnh: ăn nói sắc sảo (能言善道), dễ mất lòng khi trẻ nhưng lời nói có logic/chiều sâu thật sự. Đồng cung Thiên Cơ (Mão/Dậu): khéo tranh luận, tình cảm phức tạp. Đồng cung Thái Dương (Dần/Thân — "Dương Cự"): Dần tốt hơn Thân. Đồng cung Thiên Đồng (Sửu/Mùi — "hạ cách" theo cổ ngữ nếu thiếu Lộc).
- Huynh Đệ: không thuận, khó nhận hỗ trợ thực chất.
- Phu Thê: sở hữu dục mạnh, dễ ghen, cãi vã; nữ nên lấy chồng lớn tuổi hơn nhiều.
- Tử Tức: con hay bộc lộ bất mãn bằng lời nói nhưng giỏi biện luận.
- Tài Bạch: ham vật chất, muốn tự kiếm; đường tài vất vả, không đặt mục tiêu quá cao.
- Tật Ách: tiêu hóa — viêm dạ dày/ruột, sa dạ dày, táo bón.
- Thiên Di: thích tranh luận, hùng biện giỏi nhưng lời sắc bén bất lợi lâu dài.
- Giao Hữu: quan hệ tốt nhưng dễ khẩu chiến.
- Quan Lộc: nghề "dùng miệng": giáo sư, luật sư, chính trị gia (nam); giáo viên, chăm sóc trẻ (nữ).
- Điền Trạch: đề phòng thị phi liên quan bất động sản.
- Phúc Đức: vất vả mà thu hoạch không tương xứng — vị trí kém thuận lợi nhất.
- Phụ Mẫu: cha mẹ coi trọng vật chất, khắt khe, áp lực lớn.

## 3. Tứ Hóa (Lộc: Tân 辛 | Quyền: Quý 癸 | Kỵ: Đinh 丁 — không Khoa)
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
| Phụ Mẫu | Hợp chuyện với cha mẹ | Cha mẹ hay khẩu thiệt | Khoảng cách thế hệ |

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Năng ngôn thiện đạo | 能言善道 | néng yán shàn dào | giỏi nói + khéo diễn đạt | eloquent |

---

---

## Cự Môn — bổ sung
- Triết lý Đạo giáo "Nam Đẩu chủ sinh, Bắc Đẩu chủ tử" (南斗主生，北斗主死) — Cự Môn thuộc Bắc Đẩu nên sắc bén, chức năng vạch trần sự thật.
- Cơ chế cấu trúc: Phúc Đức cung của Cự Môn LUÔN LÀ Thiên Lương → tiềm thức luôn hướng thiện dù lời nói dễ gây hiểu lầm.
- Ẩn dụ "hố đen" (黑洞): sao đồng cung bị Cự Môn hút vào và che khuất đặc tính.` },
  { label: "Thiên Đồng", body: `# THIÊN ĐỒNG (天同 — tiān tóng — the Blessing Star)

## Thiên Đồng — bổ sung
- Danh hiệu đầy đủ "Ích Phúc Bảo Sinh" (益福保生) — chức năng phòng ngừa hơn chữa trị.
- Triết lý Đạo gia "phản giả đạo chi động" (反者道之動, Đạo Đức Kinh) — phúc không bao giờ dễ dàng mà đến.
- Vị trí tối ưu là Phúc Đức cung (không phải Mệnh) — tại Mệnh tính lười cản trở hành động; tại Phúc Đức thì "như cá gặp nước" (如魚得水).` },
  { label: "Thiên Lương", body: `# THIÊN LƯƠNG (天梁 — tiān liáng — the Elder Star)

## Thiên Lương — bổ sung
- Danh xưng "Y Dược tinh" (醫藥星) — chức năng cứu chữa sau sự cố, không phải ngăn ngừa từ đầu.
- Chỉnh điển tích: chính xác là Lý Tĩnh (李靖) / "Thác Tháp Thiên Vương" (托塔天王).
- Nghịch lý đạo đức: "nghiêm dĩ luật nhân, khoan dĩ đãi kỷ" (嚴以律人，寬以待己) — đảo ngược chuẩn Nho gia thông thường.
- "Đồng Lương" cách (同梁格) tại Dần/Thân: "Phúc Ấm tụ hội" (福蔭聚), hai sao bổ khuyết hoàn hảo.` },
  { label: "Liêm Trinh", body: `# LIÊM TRINH (廉貞 — lián zhēn — the Chastity Star)

## Liêm Trinh — bổ sung
- "Liêm Trinh Thanh Bạch cách" (廉貞清白格) khi Hóa Lộc: tự chế ước (自我約束) cao nhất, quang minh lỗi lạc (光明磊落).
- "Lộ Biên Mai Thi cách" (路邊埋屍格): tên đáng sợ nhưng chỉ mô tả tính "nguyên tắc cao, thích kiểm soát", không phải nghĩa đen.
- Liêm Trinh Hóa Lộc khác nhau theo địa chi: Dậu (vui vẻ), Thân (thăng quan phát tài), Tuất (tiên bần hậu phú), Hợi (không cát dù Hóa Lộc).` },
  { label: "Tham Lang", body: `# THAM LANG (貪狼 — tān láng — the Greedy Wolf Star)

## Tham Lang — bổ sung
- Cơ chế song trùng nhân cách: "ngoại thuộc Giáp Mộc, nội căn Quý Thủy" (外屬甲木，內裡屬陰水) — vỏ ngoài chính trực, gốc rễ phù đãng.
- So sánh với Thiên Cơ: Tham Lang là "cây" (樹木, Dương Mộc), Thiên Cơ là "hoa cỏ" (花卉, Âm Mộc).
- Nhân vật lịch sử dân gian: Thạch Sùng (石崇), Quách Tử Nghi (郭子儀) — phú quý cực thịnh khi đắc cách.` },
  { label: "Thiên Cơ", body: `# THIÊN CƠ (天機 — tiān jī — the Strategist Star)

## 1. Bản chất
- Ngũ hành: Âm Mộc (乙木)
- Hóa khí: "Thiện" (善 — shàn)
- Nam Đẩu đệ tam tinh, Huynh Đệ chủ — "mưu thần" (謀臣)
- Điển tích: Khương Tử Nha (姜子牙)

## Nguyên lý nền
Thiên Cơ và Tham Lang là 2 sao trí tuệ nhất nhưng khác bản chất: Tham Lang trí tuệ hướng ngoại (giành lấy); Thiên Cơ trí tuệ hướng nội (tính toán, hoạch định). Hóa Kỵ được mô tả trực tiếp "đầu óc hỏng" (頭殼壞了) — năng lực phân tích thành nhược điểm: đa nghi, cố chấp, "toàn ngưu giác tiêm" (鑽牛角尖 — suy nghĩ luẩn quẩn).

Thuộc nhóm "Cơ Nguyệt Đồng Lương" nhưng là thành viên "kém ổn định nhất" vì bản chất biến động/sáng tạo xung khắc nhẹ với tinh thần ổn định chung của nhóm.

## 2. Luận theo 12 cung
- Mệnh: thích động não, ôn hòa, dễ gần nhưng dễ "khôn vặt". Đồng cung Thái Âm (Dần/Thân — "Cơ Nguyệt"): linh hoạt, văn nhã, nhu nhược. Đồng cung Cự Môn (Mão/Dậu): giỏi tranh luận. Đồng cung Thiên Lương (Thìn/Tuất — "Thiện Ấm triều cương"): lương thiện, phẩm học song toàn.
- Huynh Đệ: không đông nhưng có người thành đạt học thuật.
- Phu Thê: kết hôn sớm; nam nên tìm vợ cá tính mạnh; nữ hợp chồng lớn tuổi thành đạt học thuật.
- Tử Tức: con thông minh, không hợp giáo dục rập khuôn.
- Tài Bạch: tiền từ nỗ lực thực chất.
- Tật Ách: sức khỏe kém lúc nhỏ; chú ý đầu/thần kinh, tránh thức khuya.
- Thiên Di: nhanh nhạy, hợp phát triển ở đất khách.
- Giao Hữu: bạn tài năng xuất chúng.
- Quan Lộc: hợp nghiên cứu, biên tập, nghệ thuật.
- Điền Trạch: không dựa tổ nghiệp, tự gây dựng qua nhiều lần mua bán.
- Phúc Đức: ham hiểu biết, tuổi trẻ bất ổn, trung niên trở đi an nhàn.
- Phụ Mẫu: cha mẹ hòa nhã nhưng con độc lập nên dễ xem nhẹ sự quan tâm.

## 3. Tứ Hóa (Lộc: Ất 乙 | Quyền: Bính 丙 | Khoa: Đinh 丁 | Kỵ: Mậu 戊)
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
| Phụ Mẫu | Duyên trưởng bối nam giới | Cha mẹ nhanh nhạy | Cha mẹ sáng suốt | Bất đồng quan điểm |

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Toàn ngưu giác tiêm | 鑽牛角尖 | zuān niújiǎo jiān | chui vào + đầu nhọn sừng trâu | overthinking |
| Quỷ kế đa đoan | 鬼計多端 | guǐjì duōduān | mưu kế xảo quyệt + nhiều mối | full of tricks |

---

---

## Thiên Cơ — bổ sung
- Tính "dễ uốn" (可塑性高): ví "gió xuân thổi cỏ lại mọc" (春風吹又生); giấu kín (隱藏) tự tin sau thử thách, nhạy cảm (敏感) khi bị nghi ngờ (質疑).
- Nguyên tắc dùng người: cần thể hiện năng lực khiến tâm phục (心服), hoặc cùng nỗ lực (努力) chia sẻ (分享) thành quả — Thiên Cơ bài xích (排斥) kẻ "bất lao nhi hoạch" (不勞而獲).
- Cơ Lương gặp Không Kiếp → duyên với huyền học (與玄學有緣).
- ĐÍNH CHÍNH: Thiên Cơ là Nam Đẩu đệ tam tinh (không phải Bắc Đẩu như nhầm lẫn trước đó).` },
  { label: "Thất Sát", body: `# THẤT SÁT (七殺 — qī shā — the General Star)

## 1. Bản chất
- Ngũ hành: Âm Kim pha Hỏa (辛金, hỏa hóa chi kim)
- Hóa khí: "Tướng" (將 — jiàng)
- Nam Đẩu đệ lục tinh, sao "Tướng quân"
- Điển tích: Hoàng Phi Hổ (黃飛虎)

## Nguyên lý nền
Thuộc nhóm "Sát Phá Liêm Tham". KHÔNG có Tứ Hóa (giống Thiên Phủ, Thiên Tướng) — vì bản chất "tướng lĩnh chỉ thực thi mệnh lệnh vua, không tự quyết".

**"Thất Sát triều đẩu"** (七殺朝斗格): độc tọa Dần/Thân, tam hợp Tử Vi/Thiên Phủ — điều động trăm vạn hùng binh. Đặc biệt: tại Thìn/Tuất ("Thiên La Địa Võng") lại có lợi cho riêng Thất Sát — sát khí mãnh liệt cần khuôn khổ mạnh để chế ngự và phát huy đúng chỗ.

## 2. Luận theo 12 cung
- Mệnh: độc lập mạnh mẽ, tự tôn cao, cảm xúc thất thường (喜怒無常) nhưng sức bền phi thường, "bại trung cầu thắng" (敗中求勝). Đồng cung Liêm Trinh (Sửu/Mùi): cứng rắn, đa tài. Đồng cung Vũ Khúc (Mão/Dậu — "Vũ Sát"): cương liệt cực độ. Đồng cung Tử Vi (Tị/Hợi): ngoài tĩnh trong cương.
- Huynh Đệ: duyên mỏng.
- Phu Thê: nhiều trắc trở, nên kết hôn muộn.
- Tử Tức: cá tính mạnh, khó dạy.
- Tài Bạch: tốt nhưng thích mạo hiểm, biến động lớn.
- Tật Ách: sức khỏe kém từ nhỏ, dễ mắc trĩ khi lớn.
- Thiên Di: năng động, kiên định.
- Giao Hữu: bạn mang phiền toái nhiều hơn lợi ích.
- Quan Lộc: hợp vận động viên, cảnh sát, quân đội.
- Điền Trạch: biến động, được ít mất nhiều.
- Phúc Đức: tại Thân/Dậu đắc lợi; nếu không thì vất vả, khắt khe với bản thân.
- Phụ Mẫu: cha mẹ cố chấp, độc đoán, xa cách.

## 3. Tứ Hóa: Không có

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Hỉ nộ vô thường | 喜怒無常 | xǐnù wúcháng | vui giận + không cố định | moody |
| Bại trung cầu thắng | 敗中求勝 | bàizhōng qiúshèng | giữa thất bại + tìm thắng | snatching victory from defeat |

---

---

## Thất Sát — bổ sung
- Ẩn dụ "như bão hổ nhi miên" (如抱虎而眠) — sức mạnh và hiểm họa song hành.
- "Nhất sơn bất dung nhị hổ" (一山不容二虎) — giải thích tính khó hòa hợp dù gặp người cùng cá tính mạnh.
- Phân biệt vai trò "Chủ Soái" (主帥, lao tâm, độc lập tác chiến) vs "Tiên Phong" (先鋒, lao lực, chịu mệnh lệnh) của Phá Quân.` },
  { label: "Phá Quân", body: `# PHÁ QUÂN (破軍 — pò jūn — the "Destroyer"/Pioneer Star)

## 1. Bản chất
- Ngũ hành: Âm Thủy (癸水)
- Hóa khí: "Hao" (耗 — hào)
- Bắc Đẩu đệ thất tinh, "chiến tướng" thấp hơn Thất Sát 1 bậc
- Điển tích: Trụ Vương (紂王) sau khi tự thiêu

## Nguyên lý nền
Thất Sát = tướng phục tùng; Phá Quân = tướng phá cách, hành động theo ý riêng — Tử Vi–Phá Quân "cách cách bất nhập" (格格不入) nếu thiếu phò tá làm vùng đệm.

**"Anh Tinh nhập miếu"** (英星入廟格): độc tọa Tý/Ngọ — phú quý song toàn, hợp võ nghiệp/kinh thương, dễ bộc phát sau khi rời quê. Cần Lộc Tồn/Hóa Lộc mới phát huy, không thì chỉ là "tiêu hao chiến" (消耗戰).

Nguyên tắc "phải rời xa gốc rễ mới thành công" — chính tinh nhấn mạnh rõ nhất việc cần đổi môi trường để phát triển.

## 2. Luận theo 12 cung
- Mệnh: quyết liệt, giang hồ, hào sảng, dễ mất lòng người mà không biết. Đồng cung Liêm Trinh (Mão/Dậu): khai phá, cải cách. Đồng cung Vũ Khúc (Tị/Hợi — "Vũ Phá"): mạo hiểm, hao tài. Đồng cung Tử Vi (Tý/Ngọ): bá khí, độc lập.
- Huynh Đệ: duyên mỏng, thành công phải xa quê.
- Phu Thê: không có quan niệm hôn nhân truyền thống, nên kết hôn muộn.
- Tử Tức: con hiếu động, "có con như không".
- Tài Bạch: hoạch định độc lập, tư duy khác biệt.
- Tật Ách: khí huyết; nữ dễ bệnh phụ khoa; có thể liên quan tiểu đường.
- Thiên Di: đối cung Thiên Tướng thiếu quyết đoán → "thành sự bất túc, bại sự hữu dư".
- Giao Hữu: bạn phần lớn có thực lực.
- Quan Lộc: nam hợp trị an/quân đội; nữ có tố chất lãnh đạo.
- Điền Trạch: biến động liên tục, khó giữ ổn định.
- Phúc Đức: vất vả cả đời, khó cảm nhận thành quả.
- Phụ Mẫu: cha mẹ bất hòa, thiếu ấm áp.

## 3. Tứ Hóa: chỉ Lộc (Quý 癸) và Quyền (Giáp 甲) — không Khoa/Kỵ
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
| Phụ Mẫu | Cha mẹ tự cho mình trung tâm | Được chăm sóc kỹ, cha mẹ mạnh mẽ |

## 4. Từ vựng
| Từ | Hán | Pinyin | Hán Việt (giải nghĩa) | English |
|---|---|---|---|---|
| Hào sảng giang hồ | 江湖味濃 | jiānghú wèi nóng | phóng khoáng tự do + đậm chất | free-spirited |
| Cách cách bất nhập | 格格不入 | gégé bùrù | khuôn khổ + không hòa vào | incompatible |

---

---

## Phá Quân — bổ sung
- Quan hệ Ngũ Hành với Thất Sát: Kim sinh Thủy (七殺生破軍) — Thất Sát "nuôi dưỡng" Phá Quân, liên đới chặt chẽ hơn vẻ ngoài đối lập.
- Điển cố "ngã bất sát Bá Nhân, Bá Nhân khước nhân ngã nhi tử" (我不殺伯仁，伯仁卻因我而死) — vô tình gây hại mà không tự biết.
- Phá Quân dù đồng cung Tử Vi vẫn giữ phần dè dặt (受制而多顧忌) — khác Thất Sát "vô sở cố kỵ" khi gặp Tử Vi — thấp hơn Thất Sát 1 bậc trong hệ phân cấp.` },
  { label: "Lá Số Mẫu", body: `# LÁ SỐ MẪU — Bài Tập Áp Dụng Phương Pháp Luận

*(Lá số minh họa lấy từ một lá số thật, đã ẩn danh: đã bỏ họ tên, ngày/giờ/năm sinh cụ thể và các mốc tuổi. Chỉ giữ lại các dữ kiện cấu trúc lá số — Cục, ngũ hành bản Mệnh, giới tính âm dương, và vị trí 14 chính tinh tại 12 cung — để dùng làm ví dụ thực hành đọc lá số theo khung lý thuyết ở tab "Phương pháp luận".)*

## 1. Thông tin cấu trúc lá số

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

## 4. Lưu ý phương pháp

Phần phân tích trên chỉ minh họa cách vận dụng khung "Sáu bước đọc lá số" và các cách cục đã học ở những tab trước — **không phải một kết luận đầy đủ**. Một lá số thật cần thêm: vị trí các sao phụ/sát tinh chi tiết tại từng cung, Tứ Hóa Sinh Niên gắn với từng chính tinh cụ thể trên lá số, và quan trọng nhất là Đại Vận/Lưu Niên tại thời điểm xem — đúng như nguyên tắc *"tạo mệnh luận, không phải túc mệnh luận"* đã nhấn mạnh xuyên suốt tài liệu này: đây là bức tranh khuynh hướng để chủ động điều chỉnh, không phải một phán quyết số phận đóng đinh.` }
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

function renderInline(text) {
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
      return <h1 className="tv-h1">{renderInline(b.text)}</h1>;
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
    case "table":
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
                  {row.map((c, ci) => (
                    <td key={ci}>{renderInline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
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

        {active < SECTIONS.length - 1 && (
          <div className="tv-next-wrap">
            <button className="tv-next-btn" onClick={() => setActive(active + 1)}>
              {"Tiếp: " + SECTIONS[active + 1].label + " \u2192"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------
   CSS — phong cách "giấy ấm" đồng bộ với các tab Language khác
--------------------------------------------------------------- */
const CSS = `
* { box-sizing: border-box; }
.tv-root {
  --ink:${INK}; --paper:${PAPER}; --panel:${PANEL}; --rule:${RULE}; --muted:${MUTED}; --accent:${ACCENT};
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
.tv-p { margin: 0 0 12px; font-size: 14.5px; line-height: 1.65; color: #2A2E36; }
.tv-p em { color: var(--muted); font-style: italic; }

.tv-ul { margin: 0 0 14px; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.tv-ul li { position: relative; padding-left: 16px; font-size: 14px; line-height: 1.58; color: #2A2E36; }
.tv-ul li::before { content: ""; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

.tv-ol { margin: 0 0 14px; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
.tv-ol li { font-size: 14px; line-height: 1.6; color: #2A2E36; padding-left: 4px; }
.tv-ol li::marker { font-family: Georgia, serif; font-weight: 700; color: var(--accent); }

.tv-table-wrap { overflow-x: auto; margin: 8px 0 20px; border: 1px solid var(--rule); border-radius: 6px; }
.tv-table { border-collapse: collapse; width: 100%; font-size: 13px; }
.tv-table th, .tv-table td { border-bottom: 1px solid var(--rule); border-right: 1px solid var(--rule); padding: 9px 12px; text-align: left; vertical-align: top; line-height: 1.5; }
.tv-table th:last-child, .tv-table td:last-child { border-right: none; }
.tv-table thead th { background: var(--panel); font-family: Georgia, serif; font-weight: 600; color: var(--ink); white-space: nowrap; }
.tv-table tbody tr:last-child td { border-bottom: none; }
.tv-table tbody tr:hover td { background: rgba(107,79,160,.05); }

.tv-next-wrap { display: flex; justify-content: flex-end; margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--rule); }
.tv-next-btn { display: flex; align-items: center; gap: 6px; padding: 9px 15px; border-radius: 8px; border: 1px solid #ccc; background: transparent; color: var(--ink); font-size: 13px; font-weight: 500; cursor: pointer; }
.tv-next-btn:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 780px) {
  .tv-hd { padding: 10px 14px; }
  .tv-crumb { padding: 8px 12px; }
  .tv-stage { padding: 20px 18px 60px; }
  .tv-h1 { font-size: 24px; }
  .tv-table { font-size: 12px; }
}
`;
