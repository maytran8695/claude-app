import React, { useState, useMemo } from "react";

const ACCENT = "#3E5C8A";
const INK = "#211F1D";
const MUTE = "#8B8378";
const NOTE = "#7A7268";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#FFFFFF";
const CARD = "#FFFFFF";
const LINE = "#E2E1DA";

const INTRO = "Mỗi bức tranh là sự cô đặc chất xám, cả về màu sắc, bố cục, ánh sáng — mà thông qua đó ta có thể du hành tới những vùng đất khác, con người khác, triết lý khác, thế giới quan khác...";

// Link "xem tranh" tự sinh từ tên tác phẩm (Wikipedia) thay vì gán tay từng
// URL — luôn hợp lệ, không sợ link chết/sai khi danh sách được mở rộng sau này.
// Với tên đề chính xác, MediaWiki tự nhảy thẳng vào đúng bài viết (go=Go);
// tên mơ hồ thì rơi về trang kết quả tìm kiếm, vẫn hữu ích.
const wikiLink = (title) =>
  `https://en.wikipedia.org/w/index.php?title=Special:Search&search=${encodeURIComponent(title)}&go=Go`;

/* ============================================================
   PAINTINGS
   ============================================================ */
const PAINTINGS = [
  {
    t: "I. Phục Hưng & Baroque",
    n: 13,
    items: [
      ["Mona Lisa", "Leonardo da Vinci · ~1503–1519", undefined, "Chân dung một phụ nữ với nụ cười khó đoán, được vẽ bằng kỹ thuật sfumato — chuyển sắc mờ dần không có đường viền rõ rệt — tạo cảm giác sống động, mơ hồ. Hiện trưng bày tại bảo tàng Louvre (Paris), đây là bức tranh nổi tiếng nhất thế giới, được canh giữ và bảo vệ nghiêm ngặt bậc nhất."],
      ["The Last Supper", "Leonardo da Vinci · 1495–1498", undefined, "Bích họa mô tả khoảnh khắc Chúa Jesus thông báo với các môn đồ rằng một trong số họ sẽ phản bội Ngài, vẽ trên tường phòng ăn tu viện Santa Maria delle Grazie ở Milan. Bố cục đối xứng quanh Chúa Jesus ở trung tâm, với các nhóm ba môn đồ thể hiện phản ứng cảm xúc khác nhau, là mẫu mực về phối cảnh tuyến tính thời Phục Hưng."],
      ["The Creation of Adam", "Michelangelo · ~1512", undefined, "Một trong chín cảnh từ Sách Sáng Thế trên trần nhà nguyện Sistine (Vatican), khắc họa khoảnh khắc Chúa trời trao sự sống cho Adam qua hai ngón tay gần chạm nhau. Hình ảnh hai bàn tay này trở thành một trong những biểu tượng được nhận diện rộng rãi nhất của nghệ thuật phương Tây."],
      ["Girl with a Pearl Earring", "Johannes Vermeer · ~1665", undefined, "Chân dung một cô gái quay đầu nhìn về phía người xem, đeo khăn turban xanh và một chiếc hoa tai ngọc trai lớn. Không phải chân dung theo đơn đặt hàng mà là một \"tronie\" (tranh nghiên cứu biểu cảm/trang phục), tác phẩm được mệnh danh là \"Mona Lisa của phương Bắc\" nhờ ánh nhìn và ánh sáng huyền ảo."],
      ["The Night Watch", "Rembrandt · 1642", undefined, "Bức tranh nhóm khắc họa một đội dân quân thành phố Amsterdam đang chuẩn bị hành quân, phá vỡ quy ước chân dung nhóm tĩnh lặng đương thời bằng bố cục đầy chuyển động và tương phản sáng-tối kịch tính. Tên gọi \"Night Watch\" (Tuần Đêm) xuất phát từ lớp vecni cũ ố tối khiến người xem thế kỷ 18-19 lầm tưởng cảnh diễn ra ban đêm."],
      ["The Birth of Venus", "Sandro Botticelli · ~1485", undefined, "Nữ thần Venus trưởng thành bước ra từ biển cả trên một vỏ sò lớn, được thần gió thổi vào bờ. Lấy cảm hứng từ thần thoại Hy Lạp và tư tưởng nhân văn thời Phục Hưng, tác phẩm là một trong những bức tranh khỏa thân thế tục đầu tiên kể từ thời cổ đại, đánh dấu sự hồi sinh của chủ đề ngoại giáo trong hội họa châu Âu."],
      ["The School of Athens", "Raphael · 1509–1511", undefined, "Bích họa tập hợp các triết gia và nhà khoa học vĩ đại của Hy Lạp cổ đại — Plato và Aristotle ở trung tâm, cùng Pythagoras, Euclid, Socrates... — trong một không gian kiến trúc hùng vĩ. Vẽ cho phòng làm việc của Giáo hoàng tại Vatican, tác phẩm tôn vinh tri thức và triết học cổ điển giữa thời kỳ Phục Hưng."],
      ["Las Meninas", "Diego Velázquez · 1656", undefined, "Cảnh trong cung điện hoàng gia Tây Ban Nha với công chúa nhỏ Margarita cùng các thị nữ, trong khi chính họa sĩ Velázquez xuất hiện đang vẽ tranh và nhà vua, hoàng hậu phản chiếu mờ trong tấm gương phía sau. Bố cục nhiều lớp không gian và câu hỏi về ai đang nhìn ai khiến đây là một trong những tác phẩm được phân tích nhiều nhất lịch sử hội họa."],
      ["The Arnolfini Portrait", "Jan van Eyck · 1434", undefined, "Chân dung đôi vợ chồng thương gia Ý tại Bruges, nổi tiếng với chi tiết tấm gương lồi phía sau phản chiếu cả căn phòng và hai hình người đứng ở ngưỡng cửa — có thể là chính họa sĩ. Độ chi tiết tỉ mỉ đến từng nếp vải, ánh sáng là đỉnh cao kỹ thuật sơn dầu của hội họa Phục Hưng phương Bắc."],
      ["Primavera", "Sandro Botticelli · ~1480", undefined, "Bức tranh phúng dụ mùa xuân với chín nhân vật thần thoại đứng trong một khu vườn cam trĩu quả, trong đó có nữ thần Venus, ba nữ thần Duyên Dáng và thần Mercury. Cùng với \"The Birth of Venus\", đây là một trong hai kiệt tác song hành nổi tiếng nhất của Botticelli, treo tại phòng trưng bày Uffizi, Florence."],
      ["Judith Beheading Holofernes", "Artemisia Gentileschi · ~1620", undefined, "Cảnh nữ anh hùng Kinh Thánh Judith cùng người hầu chặt đầu tướng địch Holofernes, được vẽ với độ chân thực bạo liệt hiếm thấy đương thời. Là một trong số ít nữ họa sĩ Baroque thành danh, Gentileschi thường được xem là đưa trải nghiệm cá nhân về bạo lực giới vào cách bà khắc họa các nhân vật nữ mạnh mẽ."],
      ["The Anatomy Lesson of Dr. Nicolaes Tulp", "Rembrandt · 1632", undefined, "Chân dung nhóm khắc họa bác sĩ phẫu thuật Nicolaes Tulp đang giảng giải cấu trúc cánh tay trên một tử thi trước các đồng nghiệp. Bố cục ánh sáng tập trung vào phần thi thể và khuôn mặt người xem giúp Rembrandt, khi đó mới 26 tuổi, nhanh chóng nổi danh tại Amsterdam."],
      ["The Garden of Earthly Delights", "Hieronymus Bosch · ~1490–1510", undefined, "Bức tam liên họa kỳ ảo với ba cảnh Vườn Địa Đàng, lạc thú trần gian và địa ngục, chi chít những sinh vật lai kỳ dị và hình ảnh siêu thực đi trước thời đại hàng thế kỷ. Ý nghĩa biểu tượng đầy bí ẩn của tác phẩm vẫn còn gây tranh cãi giữa các nhà nghiên cứu nghệ thuật cho đến ngày nay."],
    ],
  },
  {
    t: "II. Ấn tượng & Hậu ấn tượng",
    n: 12,
    items: [
      ["The Starry Night", "Vincent van Gogh · 1889", undefined, "Van Gogh vẽ bức tranh này khi đang điều trị tại bệnh viện tâm thần Saint-Rémy-de-Provence, dựa trên khung cảnh nhìn từ cửa sổ phòng bệnh kết hợp trí tưởng tượng. Những vệt xoáy bầu trời đêm và ánh sao rực rỡ thể hiện bút pháp biểu hiện mạnh mẽ, khác hẳn lối vẽ tả thực trước đó của ông — hiện trưng bày tại MoMA, New York."],
      ["Water Lilies (loạt tranh)", "Claude Monet · 1896–1926", undefined, "Loạt khoảng 250 bức tranh Monet vẽ hoa súng trong khu vườn nước của chính ông tại Giverny, Pháp, trong ba thập kỷ cuối đời. Ánh sáng, màu sắc và sự phản chiếu mặt nước được ưu tiên hơn hình khối rõ ràng, dần tiến gần đến trừu tượng và trở thành đỉnh cao sự nghiệp của trường phái Ấn tượng."],
      ["Impression, Sunrise", "Claude Monet · 1872", undefined, "Cảnh bình minh mờ sương tại cảng Le Havre, vẽ nhanh với những nét cọ lỏng và màu cam nổi bật trên nền xám xanh. Chính tựa đề bức tranh này đã khiến nhà phê bình Louis Leroy chế giễu gọi cả nhóm họa sĩ là \"những người theo trường phái Ấn tượng\" (Impressionists) — cái tên ban đầu mang tính mỉa mai sau trở thành tên chính thức của phong trào."],
      ["A Sunday Afternoon on the Island of La Grande Jatte", "Georges Seurat · 1884–1886", undefined, "Cảnh người dân Paris thư giãn bên bờ sông Seine, được vẽ hoàn toàn bằng vô số chấm màu nhỏ riêng biệt (kỹ thuật pointillism) mà mắt người tự hòa trộn khi nhìn từ xa. Seurat mất hơn hai năm hoàn thành tác phẩm, hiện trưng bày tại Viện Nghệ thuật Chicago."],
      ["The Scream", "Edvard Munch · 1893", undefined, "Một hình người với khuôn mặt biến dạng đang ôm đầu thét gào trên cây cầu, giữa bầu trời đỏ cam xoáy cuộn dữ dội. Munch mô tả nó lấy cảm hứng từ một cơn hoảng loạn có thật ông trải qua, và tác phẩm trở thành biểu tượng cho sự lo âu hiện sinh của con người hiện đại, mở đường cho trường phái Biểu hiện (Expressionism)."],
      ["Sunflowers", "Vincent van Gogh · 1888", undefined, "Loạt tranh tĩnh vật hoa hướng dương trong bình, vẽ để trang trí phòng ngủ dành cho bạn họa sĩ Paul Gauguin tại Arles, Pháp. Van Gogh dùng nhiều sắc độ vàng khác nhau để tạo chiều sâu mà không cần tương phản màu, một thử nghiệm táo bạo về màu đơn sắc."],
      ["Café Terrace at Night", "Vincent van Gogh · 1888", undefined, "Cảnh một quán cà phê ngoài trời ở Arles về đêm, với ánh đèn vàng ấm tương phản cùng bầu trời đầy sao xanh thẫm. Đây là một trong những bức tranh hiếm hoi Van Gogh vẽ trực tiếp cảnh đêm ngoài trời, không dùng màu đen mà vẫn diễn tả được bóng tối."],
      ["The Card Players", "Paul Cézanne · thập niên 1890", undefined, "Loạt khoảng năm bức tranh khắc họa nông dân vùng Provence chơi bài, với bố cục hình học chặt chẽ và khối màu phẳng đặc trưng của Cézanne. Loạt tranh này ảnh hưởng trực tiếp đến sự ra đời của trường phái Lập thể (Cubism) đầu thế kỷ 20."],
      ["Bal du moulin de la Galette", "Pierre-Auguste Renoir · 1876", undefined, "Cảnh một buổi khiêu vũ ngoài trời đông đúc, rộn ràng tại khu Montmartre, Paris, với ánh nắng lốm đốm xuyên qua tán cây rơi trên trang phục và khuôn mặt người dự tiệc. Tác phẩm được xem là một trong những bức tranh tiêu biểu nhất thể hiện tinh thần vui tươi, phóng khoáng của trường phái Ấn tượng."],
      ["The Bedroom", "Vincent van Gogh · 1888", undefined, "Van Gogh vẽ căn phòng ngủ giản dị của chính mình tại \"Ngôi nhà vàng\" ở Arles, dùng những mảng màu tương phản mạnh (vàng, xanh lam, đỏ) mà ông mô tả là nhằm gợi cảm giác nghỉ ngơi tuyệt đối. Ông vẽ lại chủ đề này ba lần với bố cục gần như giống hệt nhau."],
      ["Luncheon of the Boating Party", "Pierre-Auguste Renoir · 1881", undefined, "Cảnh một nhóm bạn bè, trong đó có người vợ tương lai của Renoir, dùng bữa trưa thư thái bên ban công nhìn ra sông Seine sau một buổi chèo thuyền. Với sự kết hợp giữa chân dung nhóm và phong cảnh, tác phẩm là một trong những bức tranh phức tạp và tham vọng nhất của Renoir."],
      ["Mont Sainte-Victoire (loạt tranh)", "Paul Cézanne · thập niên 1880–1906", undefined, "Loạt hơn 30 bức tranh và ký họa Cézanne vẽ đi vẽ lại ngọn núi gần nhà ông ở miền nam nước Pháp, phân tách phong cảnh thành các mảng hình học màu sắc. Cách tiếp cận cấu trúc này của Cézanne được xem là cầu nối trực tiếp dẫn đến trường phái Lập thể của Picasso và Braque."],
    ],
  },
  {
    t: "III. Hiện đại & Siêu thực",
    n: 11,
    items: [
      ["Guernica", "Pablo Picasso · 1937", undefined, "Bức tranh khổ lớn đen-trắng-xám phản đối vụ ném bom thị trấn Guernica (Tây Ban Nha) trong Nội chiến Tây Ban Nha, với những hình người và động vật biến dạng đau đớn. Được vẽ trong vài tuần cho Hội chợ Thế giới Paris, tác phẩm trở thành biểu tượng phản chiến nổi tiếng nhất lịch sử nghệ thuật hiện đại."],
      ["Les Demoiselles d'Avignon", "Pablo Picasso · 1907", undefined, "Năm hình người phụ nữ với khuôn mặt góc cạnh chịu ảnh hưởng từ mặt nạ châu Phi, được vẽ bằng những mảng hình học vỡ vụn thay vì phối cảnh truyền thống. Tác phẩm đánh dấu bước đột phá dẫn tới sự ra đời của trường phái Lập thể mà Picasso cùng Georges Braque phát triển sau đó."],
      ["The Persistence of Memory", "Salvador Dalí · 1931", undefined, "Những chiếc đồng hồ mềm rũ như tan chảy trên một phong cảnh khô cằn, thể hiện quan niệm siêu thực về thời gian không cố định, chảy trôi phi lý. Bức tranh nhỏ (chỉ 24x33cm) nhưng trở thành hình ảnh đại diện tiêu biểu nhất cho trường phái Siêu thực (Surrealism), hiện trưng bày tại MoMA."],
      ["The Son of Man", "René Magritte · 1964", undefined, "Chân dung tự họa một người đàn ông mặc vest, đội mũ quả dưa, với khuôn mặt bị một quả táo xanh che khuất gần hết. Magritte giải thích tác phẩm nói về xung đột giữa những gì hiện diện trước mắt và những gì bị che giấu — mọi thứ ta thấy đều ẩn giấu một thứ khác ta muốn thấy."],
      ["Composition VIII", "Wassily Kandinsky · 1923", undefined, "Một bố cục hoàn toàn trừu tượng gồm các hình tròn, tam giác, đường thẳng và màu sắc tương tác với nhau, không mô tả bất kỳ vật thể nào trong thế giới thực. Kandinsky, một trong những người tiên phong của nghệ thuật trừu tượng, ví các yếu tố hình học này như nốt nhạc trong một bản giao hưởng thị giác."],
      ["American Gothic", "Grant Wood · 1930", undefined, "Chân dung một người đàn ông cầm chĩa ba đứng cạnh một phụ nữ trước ngôi nhà kiểu Gothic vùng nông thôn Iowa, thường bị hiểu lầm là vợ chồng dù thực chất người mẫu là cha con. Tác phẩm trở thành hình ảnh mang tính biểu tượng — vừa trân trọng vừa châm biếm nhẹ — về giá trị và tính cách vùng Trung Tây nước Mỹ."],
      ["The Kiss", "Gustav Klimt · 1907–1908", undefined, "Một đôi tình nhân ôm nhau trong lớp áo choàng phủ đầy họa tiết hình học dát vàng lá, đứng trên một thảm hoa rực rỡ. Thuộc \"thời kỳ vàng\" của Klimt chịu ảnh hưởng nghệ thuật khảm Byzantine, tác phẩm là biểu tượng nổi bật của phong trào Ly khai Vienna (Vienna Secession)."],
      ["Nighthawks", "Edward Hopper · 1942", undefined, "Cảnh vài vị khách lặng lẽ trong một quán ăn đêm khuya ở góc phố Mỹ vắng vẻ, ánh đèn huỳnh quang lạnh lẽo hắt qua lớp kính lớn ra vỉa hè tối. Tác phẩm trở thành biểu tượng cho sự cô đơn đô thị hiện đại, được nhại lại vô số lần trong văn hóa đại chúng."],
      ["Campbell's Soup Cans", "Andy Warhol · 1962", undefined, "32 bức tranh khổ nhỏ giống hệt nhau, mỗi bức vẽ một lon súp Campbell's khác hương vị, dùng kỹ thuật in lụa công nghiệp thay vì bút pháp cá nhân. Tác phẩm thách thức ranh giới giữa nghệ thuật cao cấp và sản phẩm tiêu dùng đại chúng, trở thành biểu tượng khai sinh trường phái Nghệ thuật Đại chúng (Pop Art)."],
      ["Composition with Red, Blue and Yellow", "Piet Mondrian · 1930", undefined, "Bố cục trừu tượng gồm các ô hình chữ nhật màu đỏ, xanh lam, vàng ngăn cách bởi lưới đường kẻ đen dày trên nền trắng. Mondrian tin rằng chỉ đường thẳng và ba màu cơ bản mới diễn tả được sự hài hòa phổ quát thuần khiết, đặt nền móng cho phong trào De Stijl và ảnh hưởng sâu rộng đến thiết kế đồ họa hiện đại."],
      ["The Weeping Woman", "Pablo Picasso · 1937", undefined, "Chân dung một phụ nữ khóc với khuôn mặt bị phân mảnh, nước mắt biến thành những hình dạng sắc cạnh kỳ dị, vẽ ngay sau khi hoàn thành \"Guernica\" và lấy cùng chủ đề đau thương chiến tranh. Người mẫu là Dora Maar, nhiếp ảnh gia và bạn đời của Picasso thời kỳ đó."],
    ],
  },
  {
    t: "IV. Á Đông & Việt Nam",
    n: 7,
    items: [
      ["Thiếu Nữ Bên Hoa Huệ", "Tô Ngọc Vân · 1943", undefined, "Chân dung một thiếu nữ mặc áo dài trắng ngồi nghiêng bên bình hoa huệ, được vẽ bằng sơn dầu với gam màu trắng-xanh tinh tế. Đây là một trong những tác phẩm hội họa Việt Nam hiện đại nổi tiếng nhất, tiêu biểu cho vẻ đẹp thiếu nữ Hà Nội thời kỳ trước 1945."],
      ["Em Thúy", "Trần Văn Cẩn · 1943", undefined, "Chân dung cô bé Thúy — cháu gái họa sĩ — ngồi trên ghế mây trong bộ váy trắng, ánh mắt trong trẻo nhìn thẳng người xem. Tác phẩm được công nhận là Bảo vật quốc gia Việt Nam, tiêu biểu cho kỹ thuật vẽ chân dung sơn dầu điêu luyện của mỹ thuật Đông Dương."],
      ["Kết Nạp Đảng Ở Điện Biên Phủ", "Nguyễn Sáng · 1963", undefined, "Tranh sơn mài khắc họa lễ kết nạp Đảng cho một chiến sĩ ngay giữa chiến hào Điện Biên Phủ, gương mặt các nhân vật khắc khổ nhưng kiên định. Tác phẩm là Bảo vật quốc gia, tiêu biểu cho dòng tranh sơn mài hiện thực cách mạng Việt Nam."],
      ["The Great Wave off Kanagawa", "Katsushika Hokusai · ~1831", undefined, "Bản khắc gỗ ukiyo-e nổi tiếng nhất Nhật Bản, khắc họa một con sóng khổng lồ chuẩn bị nhấn chìm ba con thuyền nhỏ, với núi Phú Sĩ nhỏ bé phía xa. Thuộc loạt \"Ba mươi sáu cảnh núi Phú Sĩ\", tác phẩm ảnh hưởng sâu rộng đến hội họa phương Tây cuối thế kỷ 19 (trong đó có Van Gogh và Monet)."],
      ["Thanh Minh Thượng Hà Đồ", "Trương Trạch Đoan · thời Bắc Tống (~thế kỷ 12)", undefined, "Bức tranh cuộn dài khắc họa chi tiết đời sống thường nhật của kinh đô Biện Kinh (nay là Khai Phong) vào dịp Tết Thanh Minh — chợ búa, thuyền bè, phố xá, hàng trăm nhân vật sinh động. Được xem là một trong những kiệt tác hội họa cổ điển Trung Hoa, hiện lưu giữ tại Bảo tàng Cố Cung, Bắc Kinh."],
      ["Phú Xuân Sơn Cư Đồ", "Hoàng Công Vọng (Huang Gongwang) · 1350", undefined, "Bức tranh cuộn thủy mặc khắc họa phong cảnh núi non vùng sông Phú Xuân, được xem là kiệt tác tiêu biểu nhất của hội họa văn nhân đời Nguyên. Tác phẩm từng bị đốt cháy làm đôi vào thế kỷ 17, khiến hai phần hiện được lưu giữ tách biệt tại Bảo tàng Chiết Giang và Bảo tàng Cố Cung Đài Bắc."],
      ["Phong Thần Lôi Thần Đồ", "Tawaraya Sōtatsu · đầu thế kỷ 17", undefined, "Cặp bình phong gấp khắc họa Thần Gió và Thần Sấm trong thần thoại Nhật Bản, mỗi vị thần chiếm một tấm bình phong với nền vàng lá rực rỡ và dáng vẻ dữ dội, hài hước. Được công nhận là Quốc bảo Nhật Bản, tác phẩm ảnh hưởng sâu rộng đến nhiều thế hệ họa sĩ trường phái Rinpa sau này."],
    ],
  },
];

const MOODS = [
  { id: "sad", icon: "😢", label: "Buồn" },
  { id: "heartbreak", icon: "💔", label: "Thất tình" },
  { id: "romance", icon: "💘", label: "Lãng mạn" },
  { id: "cozy", icon: "☕", label: "Nhẹ nhàng" },
  { id: "motivate", icon: "🔥", label: "Cần động lực" },
  { id: "solitude", icon: "🌙", label: "Cô đơn, tĩnh lặng" },
  { id: "fun", icon: "😄", label: "Vui, hài hước" },
  { id: "mindbend", icon: "🤯", label: "Não to" },
  { id: "thrill", icon: "😱", label: "Hồi hộp, kịch tính" },
  { id: "heartwarming", icon: "🥹", label: "Ấm lòng, tình thân" },
  { id: "adventure", icon: "🌍", label: "Phiêu lưu, khám phá" },
  { id: "eerie", icon: "👻", label: "Rùng rợn, kỳ bí" },
  { id: "culture", icon: "🏛️", label: "Lịch sử, văn hoá" },
  { id: "heal", icon: "🧘", label: "Chữa lành, ý nghĩa sống" },
];

// title -> [moodId, ...] — every painting in PAINTINGS has at least one entry here.
const MOOD_TAGS = {
  "Mona Lisa": ["culture", "mindbend"],
  "The Last Supper": ["culture", "sad"],
  "The Creation of Adam": ["culture", "heal"],
  "Girl with a Pearl Earring": ["romance", "solitude"],
  "The Night Watch": ["culture", "thrill"],
  "The Birth of Venus": ["romance", "culture"],
  "The School of Athens": ["culture", "mindbend"],
  "Las Meninas": ["mindbend", "culture"],
  "The Arnolfini Portrait": ["culture", "mindbend"],
  "Primavera": ["romance", "culture"],
  "Judith Beheading Holofernes": ["thrill", "culture"],
  "The Anatomy Lesson of Dr. Nicolaes Tulp": ["culture", "mindbend"],
  "The Garden of Earthly Delights": ["eerie", "mindbend"],
  "The Starry Night": ["solitude", "eerie"],
  "Water Lilies (loạt tranh)": ["cozy", "heal"],
  "Impression, Sunrise": ["cozy", "culture"],
  "A Sunday Afternoon on the Island of La Grande Jatte": ["cozy", "culture"],
  "The Scream": ["eerie", "sad"],
  "Sunflowers": ["heartwarming", "cozy"],
  "Café Terrace at Night": ["cozy", "solitude"],
  "The Card Players": ["culture", "cozy"],
  "Bal du moulin de la Galette": ["fun", "cozy"],
  "The Bedroom": ["cozy", "solitude"],
  "Luncheon of the Boating Party": ["heartwarming", "cozy"],
  "Mont Sainte-Victoire (loạt tranh)": ["solitude", "heal"],
  "Guernica": ["sad", "culture"],
  "Les Demoiselles d'Avignon": ["mindbend", "culture"],
  "The Persistence of Memory": ["mindbend", "eerie"],
  "The Son of Man": ["mindbend", "eerie"],
  "Composition VIII": ["mindbend", "solitude"],
  "American Gothic": ["culture", "fun"],
  "The Kiss": ["romance", "culture"],
  "Nighthawks": ["solitude", "eerie"],
  "Campbell's Soup Cans": ["fun", "mindbend"],
  "Composition with Red, Blue and Yellow": ["mindbend", "cozy"],
  "The Weeping Woman": ["sad", "culture"],
  "Thiếu Nữ Bên Hoa Huệ": ["culture", "cozy"],
  "Em Thúy": ["culture", "heartwarming"],
  "Kết Nạp Đảng Ở Điện Biên Phủ": ["culture", "motivate"],
  "The Great Wave off Kanagawa": ["adventure", "culture"],
  "Thanh Minh Thượng Hà Đồ": ["culture", "adventure"],
  "Phú Xuân Sơn Cư Đồ": ["heal", "culture"],
  "Phong Thần Lôi Thần Đồ": ["culture", "thrill"],
};

/* ============================================================
   RENDER HELPERS
   ============================================================ */
function renderItems(items) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr", gap: 9 }}>
      {items.map(([title, meta, note, summary], i) => (
        <li key={i} style={{ borderLeft: `2px solid ${LINE}`, paddingLeft: 11 }}>
          <div style={{ fontSize: 14.3, lineHeight: 1.42 }}>
            <span style={{ fontWeight: 600 }}>{title}</span>{" "}
            <a href={wikiLink(title)} target="_blank" rel="noopener noreferrer" title="Xem trên Wikipedia" style={{ fontSize: 11, color: ACCENT, textDecoration: "none", fontWeight: 700 }}>
              ↗
            </a>
            {meta && (
              <span style={{ color: MUTE, fontFamily: SANS, fontSize: 12.3 }}> · {meta}</span>
            )}
          </div>
          {summary && (
            <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, lineHeight: 1.55, marginTop: 4, fontStyle: "italic" }}>
              {summary}
            </div>
          )}
          {note && (
            <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, lineHeight: 1.55, marginTop: 3, fontStyle: "italic" }}>
              “{note}”
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function GroupCard({ group, isOpen, onToggle }) {
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 8, background: CARD, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", background: isOpen ? ACCENT : "transparent", border: "none",
          cursor: "pointer", fontFamily: SANS, textAlign: "left",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 13.3, color: isOpen ? "#fff" : INK }}>{group.t}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0, marginLeft: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 10,
            color: isOpen ? "#fff" : MUTE,
            background: isOpen ? "rgba(255,255,255,.28)" : `${ACCENT}14`,
          }}>
            {group.n}
          </span>
          <span style={{ display: "inline-block", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s", color: isOpen ? "#fff" : MUTE, fontSize: 11 }}>
            ▾
          </span>
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: "6px 16px 16px" }}>
          {group.sub ? (
            <div style={{ display: "grid", gap: 16 }}>
              {group.sub.map((s, i) => (
                <div key={i}>
                  {s.t && (
                    <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: 8 }}>
                      {s.t}
                    </div>
                  )}
                  {renderItems(s.items)}
                </div>
              ))}
            </div>
          ) : (
            renderItems(group.items)
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */
export default function Painting() {
  const [query, setQuery] = useState("");
  const [activeMood, setActiveMood] = useState(null);
  const [openMap, setOpenMap] = useState({ 0: true });

  const toggleGroup = (idx) => {
    setOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const flatMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const out = [];
    PAINTINGS.forEach((g) => {
      const pushFrom = (items, subLabel) => {
        items.forEach(([title, meta, note, summary]) => {
          const hay = `${title} ${meta || ""} ${note || ""} ${summary || ""}`.toLowerCase();
          if (hay.includes(q)) out.push({ title, meta, note, summary, group: g.t, sub: subLabel });
        });
      };
      if (g.sub) g.sub.forEach((s) => pushFrom(s.items, s.t));
      else pushFrom(g.items, null);
    });
    return out;
  }, [query]);

  const moodMatches = useMemo(() => {
    if (!activeMood) return null;
    const out = [];
    PAINTINGS.forEach((g) => {
      const collect = (items, subLabel) => {
        items.forEach(([title, meta, note, summary]) => {
          if ((MOOD_TAGS[title] || []).includes(activeMood.id)) {
            out.push({ title, meta, note, summary, group: g.t, sub: subLabel });
          }
        });
      };
      if (g.sub) g.sub.forEach((s) => collect(s.items, s.t));
      else collect(g.items, null);
    });
    return out;
  }, [activeMood]);

  const selectMood = (mood) => {
    setQuery("");
    setActiveMood((prev) => (prev?.id === mood.id ? null : mood));
  };

  return (
    <div style={{ fontFamily: SERIF, background: PAPER, color: INK }}>
      <div style={{ padding: "26px 32px 60px", maxWidth: 1600, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 29, lineHeight: 1.16, margin: 0, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Painting
          </h1>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontStyle: "italic", fontSize: 14.8, lineHeight: 1.62, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 14 }}>
            {INTRO}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 12.3, color: MUTE, marginTop: 9 }}>
            “Every artist dips his brush in his own soul, and paints his own nature into his pictures.” — Henry Ward Beecher
          </div>
        </div>

        <input
          type="text"
          placeholder="Tìm tranh, tác giả, mô tả..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveMood(null); }}
          style={{
            width: "100%", boxSizing: "border-box", fontFamily: SANS, fontSize: 13.5,
            padding: "10px 14px", borderRadius: 8, border: `1px solid ${LINE}`, marginBottom: 12,
            outline: "none", background: CARD, color: INK,
          }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {MOODS.map((mood) => {
            const isActive = activeMood?.id === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => selectMood(mood)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, fontFamily: SANS, fontSize: 12.5,
                  padding: "6px 12px", borderRadius: 20, cursor: "pointer",
                  border: `1px solid ${isActive ? ACCENT : LINE}`,
                  background: isActive ? ACCENT : CARD,
                  color: isActive ? "#fff" : INK,
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                <span>{mood.icon}</span>
                {mood.label}
              </button>
            );
          })}
        </div>

        {activeMood ? (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: MUTE }}>
              {activeMood.icon} {activeMood.label} · {moodMatches.length} tranh
            </div>
            {moodMatches.map((m, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 11 }}>
                <div style={{ fontFamily: SANS, fontSize: 10.3, color: MUTE, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {m.group}
                  {m.sub ? ` · ${m.sub}` : ""}
                </div>
                <div style={{ fontSize: 14.3 }}>
                  <span style={{ fontWeight: 600 }}>{m.title}</span>{" "}
                  <a href={wikiLink(m.title)} target="_blank" rel="noopener noreferrer" title="Xem trên Wikipedia" style={{ fontSize: 11, color: ACCENT, textDecoration: "none", fontWeight: 700 }}>↗</a>
                  {m.meta && <span style={{ color: MUTE, fontFamily: SANS, fontSize: 12.3 }}> · {m.meta}</span>}
                </div>
                {m.summary && (
                  <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, fontStyle: "italic", marginTop: 4 }}>
                    {m.summary}
                  </div>
                )}
                {m.note && (
                  <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, fontStyle: "italic", marginTop: 3 }}>
                    “{m.note}”
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : flatMatches ? (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: MUTE }}>{flatMatches.length} kết quả</div>
            {flatMatches.map((m, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 11 }}>
                <div style={{ fontFamily: SANS, fontSize: 10.3, color: MUTE, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {m.group}
                  {m.sub ? ` · ${m.sub}` : ""}
                </div>
                <div style={{ fontSize: 14.3 }}>
                  <span style={{ fontWeight: 600 }}>{m.title}</span>{" "}
                  <a href={wikiLink(m.title)} target="_blank" rel="noopener noreferrer" title="Xem trên Wikipedia" style={{ fontSize: 11, color: ACCENT, textDecoration: "none", fontWeight: 700 }}>↗</a>
                  {m.meta && <span style={{ color: MUTE, fontFamily: SANS, fontSize: 12.3 }}> · {m.meta}</span>}
                </div>
                {m.summary && (
                  <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, fontStyle: "italic", marginTop: 4 }}>
                    {m.summary}
                  </div>
                )}
                {m.note && (
                  <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, fontStyle: "italic", marginTop: 3 }}>
                    “{m.note}”
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {PAINTINGS.map((g, i) => (
              <GroupCard key={i} group={g} isOpen={!!openMap[i]} onToggle={() => toggleGroup(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
