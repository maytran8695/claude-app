import React, { useState, useMemo } from "react";

const ACCENT = "#B4863C";
const INK = "#211F1D";
const MUTE = "#8B8378";
const NOTE = "#7A7268";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#FFFFFF";
const CARD = "#FFFFFF";
const LINE = "#E2E1DA";

const INTRO = "Mỗi bộ phim là sự cô đặc chất xám, cả về nội dung, màu sắc, hình ảnh, âm thanh — mà thông qua đó ta có thể du hành tới những vùng đất khác, con người khác, triết lý khác, thế giới quan khác...";

/* ============================================================
   FILMS
   ============================================================ */
const FILMS = [
{
    t: "I. Kinh điển",
    n: 55,
    sub: [
      {
        t: null,
        items: [
          ["Watership Down", "1978", "Mình thích thì mình bỏ vô list kinh điển nha :v Sách thì bị chôm rồi :v, sau ni đẻ thì mua lại đọc cho con =))) Với 30’ đọc mỗi tối cộng với kiểu siêu tưởng tượng, siêu hỏi nhiều của con nít thì mình sẽ đọc từ lúc nó chút éc tới khi nó vô lớp 1 là vừa hết sách = ))))", "Watership Down là phim hoạt hình kể về hành trình một nhóm thỏ hoang rời bỏ nơi ở an toàn sau linh cảm về thảm họa sắp xảy ra, đi tìm vùng đất mới để sinh sống. Trên đường đi chúng đối mặt hiểm nguy từ thiên nhiên, những kẻ săn mồi và cả một xã hội thỏ độc tài do tên đầu đàn hung bạo General Woundwort cai trị. Bộ phim nổi tiếng vì phong cách hoạt hình u ám, bạo lực bất ngờ so với hình dung thông thường về phim hoạt hình, cùng thông điệp sâu sắc về tự do và lãnh đạo."],
          ["Forrest Gump", "1994", "Cuộc đời đáng ngưỡng mộ của một chàng ngốc. “Life is like a box of chocolates, you never know what you’re gonna get.”", "Forrest Gump là một người đàn ông có chỉ số IQ thấp nhưng trái tim trong sáng, vô tình chứng kiến và góp mặt trong hàng loạt sự kiện lớn của nước Mỹ nửa sau thế kỷ 20. Xuyên suốt phim là hành trình theo đuổi tình yêu dành cho Jenny — người bạn thời thơ ấu — cùng lòng trung thành tuyệt đối với gia đình, bạn bè và đất nước. Phim giành 6 giải Oscar năm 1995, trong đó có Phim hay nhất và Nam diễn viên chính xuất sắc nhất cho Tom Hanks."],
          ["12 Years A Slave", "2013", "Ám ảnh. Lịch sử về chế độ nô lệ một thời (là nguyên nhân, là cái giá mà Mỹ đang phải chịu cả về mặt kinh tế xã hội lẫn chính trị bây giờ chăng :)))", "Solomon Northup, một người đàn ông da đen tự do sống ở New York, bị bắt cóc và bán làm nô lệ tại miền Nam nước Mỹ trước Nội chiến. Suốt mười hai năm, anh phải chịu đựng sự đối xử tàn bạo dưới tay nhiều chủ nô khác nhau, trong đó có gã chủ đồn điền độc ác Edwin Epps, trong khi cố gắng sống sót và giữ vững nhân phẩm. Dựa trên hồi ký năm 1853 của Northup, phim kết thúc bằng cuộc giải cứu và đoàn tụ với gia đình anh."],
          ["12 Angry Men", "1957", "Nội dung, góc quay lẫn bố cục làm nên một tác phẩm đỉnh cao. 12 nét tính cách, cả xã hội thu nhỏ vừa bằng một bộ phim :)))", "Mười hai bồi thẩm đoàn thảo luận để quyết định số phận một thanh niên bị buộc tội giết cha, với bản án có tội đồng nghĩa với án tử hình. Ban đầu mười một người bỏ phiếu có tội, nhưng Bồi thẩm số 8 đặt nghi vấn về các bằng chứng và dần thuyết phục từng người xem xét lại. Diễn ra gần như trọn vẹn trong một căn phòng nghị án, phim khai thác định kiến, sự nghi ngờ và áp lực của tâm lý đám đông."],
          ["Girl Interrupted", "1999", "Lại là Angie :)) Bonus thêm phim Gia (1998).", "Chuyển thể từ hồi ký của Susanna Kaysen, phim kể về một cô gái trẻ tự nguyện nhập viện tâm thần vào cuối thập niên 1960 sau một lần tự tử bất thành. Tại đây, cô hình thành mối gắn kết mãnh liệt với một bệnh nhân khác đầy cuốn hút nhưng cũng nguy hiểm và thao túng tên Lisa. Qua thời gian ở viện, cô đối diện với những câu hỏi về sự tỉnh táo, bản sắc cá nhân và ý nghĩa thực sự của việc hồi phục."],
          ["One Flew Over The Cuckoo's Nest", "1975", "Ẵm tận ba giải Oscar thì phải, miễn bình luận. Sách siêu hay.", "Randle McMurphy, một tù nhân nổi loạn, giả vờ mắc bệnh tâm thần để được thụ án tại bệnh viện tâm thần thay vì nhà tù. Tại đó, anh xung đột với Y tá trưởng Ratched độc đoán và truyền cảm hứng cho các bệnh nhân khác giành lại cảm giác tự do và giá trị bản thân. Chuyển thể từ tiểu thuyết của Ken Kesey, phim thắng trọn năm hạng mục Oscar quan trọng nhất."],
          ["Pulp Fiction", "1994", "Phim của bạn Quentin, y cái tên, hết sức tào lao nhưng cực kì cuốn hút, thích kiểu thoại lúc nào cũng loằng ngoằng của bản. 1 ngụ ý rất thích trong phim: cái gì cũng vừa vừa thôi, túi may mắn của mỗi người không phải lúc nào cũng đầy không vơi. Cứ ỷ y thì banh xác đừng hỏi :))) (mỗi lần mình kéo ga lên 80 đều luôn lẩm nhẩm mấy lời ni, cơ mà có vẻ cũng không hiệu nghiệm lắm :3)", "Phim của Quentin Tarantino đan xen nhiều câu chuyện tội phạm có liên quan tại Los Angeles, gồm hai tay sát thủ đi làm nhiệm vụ, một võ sĩ quyền anh lật lọng ông trùm băng đảng, và vợ của một tay giang hồ trong một đêm chơi bời đầy rủi ro. Được kể theo cấu trúc phi tuyến tính, phim pha trộn bạo lực, hài đen và những đoạn thoại đậm chất văn hóa đại chúng. Tác phẩm được xem là đã góp phần hồi sinh dòng phim độc lập của Hollywood thập niên 1990."],
          ["The Shawshank Redemption", "1994", "Hành trình phá xích đi tới tự do. 9.2 IMDb :)))", "Andy Dufresne, một chủ ngân hàng bị kết án oan tội giết vợ, phải thụ án chung thân tại nhà tù Shawshank. Qua nhiều năm, anh hình thành tình bạn sâu sắc với bạn tù Red và dùng kiến thức tài chính của mình để lấy lòng cai ngục. Chuyển thể từ truyện vừa của Stephen King, phim dẫn đến kế hoạch vượt ngục được tính toán tỉ mỉ của Andy trên hành trình đi tìm tự do."],
          ["Mùa Len Trâu", "2004", "Cuộc sống và con người Nam Bộ, mùa nước nổi, mùa len trâu. Cuộc sống của những người đàn ông không kiểm soát được điều gì, ngay cả những con trâu của họ. Miền sông nước mộc mạc và chân thực, rất đời và tình người. Câu chuyện về hành trình trưởng thành từ cậu bé chăn trâu đến người đàn ông mạnh mẽ. Tính nhân văn giữa con người với con người và cả con vật.", "Phim lấy bối cảnh vùng Đồng Tháp Mười vào mùa nước nổi đầu thế kỷ 20, xoay quanh cậu bé Kìm cùng cha đi chăn thả đàn trâu qua những cánh đồng ngập nước. Sau khi cha mất, Kìm phải trưởng thành qua những thử thách khắc nghiệt của cuộc sống du mục, tình yêu và mất mát. Chuyển thể từ truyện ngắn của nhà văn Sơn Nam, phim khắc họa chân thực đời sống sông nước miền Nam Bộ."],
        ],
      },
      {
        t: "Về lịch sử một chút — những thứ trần trụi về Do Thái, phát xít Đức, chế độ nô lệ, sự bất bình đẳng",
        items: [
          ["Life Is Beautiful", "1997", undefined, "Guido, một người Do Thái gốc Ý vui tính, chinh phục và kết hôn với Dora, sau đó họ có một cậu con trai tên Giosuè trước thềm Thế chiến II. Khi cả gia đình bị đưa vào trại tập trung của Đức Quốc xã, Guido cố che giấu sự thật khủng khiếp với con bằng cách biến tất cả thành một trò chơi có tính điểm, phần thưởng là một chiếc xe tăng thật. Phim kết hợp hài hước và bi kịch để khắc họa tình yêu và sự hy sinh của người cha giữa thảm họa diệt chủng."],
          ["It's A Wonderful Life", "1946", undefined, "George Bailey, người đàn ông cả đời hy sinh ước mơ riêng để giúp đỡ thị trấn quê hương, rơi vào tuyệt vọng và định tự tử vào đêm Giáng sinh sau một biến cố tài chính đe dọa công ty gia đình. Một thiên thần tên Clarence xuất hiện, cho George thấy thị trấn sẽ ra sao nếu anh chưa từng được sinh ra. Nhận ra giá trị cuộc đời mình, George trở về nhà và được cả cộng đồng chung tay giúp đỡ vượt qua khó khăn."],
          ["Schindler's List", "1993", undefined, "Oskar Schindler, một doanh nhân người Đức và đảng viên Quốc xã, ban đầu chỉ muốn trục lợi từ nguồn lao động Do Thái giá rẻ tại Ba Lan bị chiếm đóng trong Thế chiến II. Khi chứng kiến sự tàn bạo ngày càng leo thang của cuộc diệt chủng, ông dần dùng nhà máy và tài sản của mình để cứu hơn một nghìn công nhân Do Thái khỏi bị đưa đến trại hủy diệt. Dựa trên câu chuyện có thật, phim được quay chủ yếu bằng đen trắng và giành 7 giải Oscar, trong đó có Phim hay nhất."],
          ["The Pianist", "2002", "Khi nghệ thuật vượt lên tất cả.", "Phim theo chân Władysław Szpilman, một nghệ sĩ dương cầm gốc Do Thái, trong hành trình sống sót qua cuộc chiếm đóng của Đức Quốc xã và sự hủy diệt khu ổ chuột Do Thái ở Warsaw. Bị chia cắt khỏi gia đình bị đưa đến trại tử thần, ông ẩn náu trong đống đổ nát của thành phố, nhờ sự giúp đỡ của những người xa lạ tốt bụng. Dựa trên hồi ký của Szpilman, phim giành 3 giải Oscar, trong đó có Đạo diễn xuất sắc nhất cho Roman Polanski."],
          ["The Intouchables", "2011", "Nghệ thuật, cuộc sống và tình bạn.", "Philippe, một quý tộc giàu có bị liệt tứ chi, thuê Driss, một chàng trai đến từ khu ngoại ô Paris không có kinh nghiệm chăm sóc người bệnh, làm trợ lý sống cùng nhà. Dù xuất thân hoàn toàn khác biệt, hai người dần hình thành một tình bạn sâu sắc và hiếm có, gắn kết bởi sự hài hước và chân thành. Dựa trên câu chuyện có thật, phim khai thác chủ đề giai cấp, khuyết tật và sự kết nối giữa con người."],
          ["Django Unchained", "2012", undefined, "Lấy bối cảnh miền Nam nước Mỹ trước Nội chiến, phim kể về Django, một nô lệ được giải phóng, hợp tác cùng thợ săn tiền thưởng người Đức Dr. King Schultz để truy lùng tội phạm kiếm tiền. Django đồng ý giúp Schultz để đổi lấy sự trợ giúp giải cứu vợ mình, Broomhilda, khỏi tay chủ đồn điền tàn bạo Calvin Candie. Phim viễn Tây mang phong cách xét lại lịch sử của Quentin Tarantino pha trộn bạo lực và hài đen trong khi đối diện trực diện với sự tàn khốc của chế độ nô lệ Mỹ."],
          ["The Help", "2011", undefined, "Lấy bối cảnh Jackson, Mississippi thập niên 1960, phim kể về Skeeter, một nhà văn trẻ da trắng, quyết định phỏng vấn những người giúp việc da đen về trải nghiệm làm việc cho các gia đình da trắng. Hai người giúp việc, Aibileen và Minny, chấp nhận rủi ro để chia sẻ câu chuyện của mình bất chấp nguy hiểm dưới chế độ phân biệt chủng tộc. Cuốn sách ra đời từ những cuộc phỏng vấn đó phơi bày sự kỳ thị ăn sâu trong cộng đồng và thay đổi cuộc sống của những người phụ nữ liên quan."],
          ["Slumdog Millionaire", "2008", undefined, "Jamal Malik, một chàng trai trẻ lớn lên trong khu ổ chuột Mumbai, tham gia phiên bản Ấn Độ của chương trình \"Ai Là Triệu Phú\" và bị nghi ngờ gian lận sau khi trả lời đúng mọi câu hỏi. Trong quá trình bị thẩm vấn, các đoạn hồi tưởng lần lượt hé lộ mỗi câu hỏi gắn liền với một sự kiện đầy biến động, thường là đau thương, trong tuổi thơ nghèo khó của anh. Câu chuyện đan xen giữa hành trình trên gameshow và tình yêu của Jamal dành cho người bạn thời thơ ấu, Latika."],
          ["The Kite Runner", "2007", undefined, "Phim kể về Amir, một cậu bé lớn lên ở Kabul, và tình bạn của cậu với Hassan, con trai người giúp việc của gia đình, trước khi Liên Xô xâm lược Afghanistan. Một sự phản bội đau đớn của Amir đối với Hassan ám ảnh anh suốt nhiều năm sau khi gia đình phải di tản sang Mỹ tị nạn. Nhiều năm sau, khi đã trưởng thành, Amir trở về Afghanistan dưới sự kiểm soát của Taliban để tìm cách chuộc lại lỗi lầm thời thơ ấu."],
          ["To Kill A Mocking Bird", "1962", undefined, "Lấy bối cảnh một thị trấn nhỏ ở Alabama thời kỳ Đại suy thoái, câu chuyện được kể qua góc nhìn của cô bé Scout Finch, có cha là luật sư Atticus Finch nhận bào chữa cho một người đàn ông da đen bị buộc tội oan hãm hiếp một phụ nữ da trắng. Trong suốt phiên tòa, Scout và anh trai Jem chứng kiến sự kỳ thị chủng tộc sâu sắc trong cộng đồng mình. Chuyển thể từ tiểu thuyết của Harper Lee, phim cũng là câu chuyện trưởng thành về lòng dũng cảm đạo đức."],
          ["The Book Thief", "2014", undefined, "Liesel, một cô bé sống ở Đức Quốc xã, được gửi đến sống cùng cha mẹ nuôi và phát triển tình yêu với sách cùng thói quen ăn cắp sách ngay cả khi chế độ đang thiêu hủy chúng. Gia đình cô bí mật che giấu một người đàn ông Do Thái tên Max trong tầng hầm, hình thành mối gắn kết định hình cách Liesel nhìn nhận về lòng nhân đạo giữa chiến tranh. Được dẫn chuyện bởi Thần Chết, phim khắc họa những hành động tử tế và can đảm nhỏ bé giữa một đất nước chìm trong chủ nghĩa phát xít."],
          ["Unbroken", "2014", "Angie đạo diễn :))) Nhớ cái cảnh nam chính vác khúc thép hay gì đó, nín cả thở. Hơi bị ám ảnh với mấy phim có phát xít Nhật.", "Phim kể câu chuyện có thật về Louis Zamperini, một vận động viên điền kinh Olympic trở thành xạ thủ ném bom trong Thế chiến II, người sống sót sau khi máy bay rơi xuống Thái Bình Dương. Anh trôi dạt trên biển suốt 47 ngày trước khi bị hải quân Nhật bắt giữ và giam trong các trại tù binh chiến tranh tàn khốc. Đạo diễn bởi Angelina Jolie, phim tập trung khắc họa sức chịu đựng phi thường và tinh thần bất khuất của Zamperini trước sự tra tấn."],
          ["Platoon", "1986", "Về chiến tranh Việt Nam.", "Phim theo chân Chris Taylor, một binh sĩ Mỹ trẻ tuổi tình nguyện tham chiến tại Việt Nam. Bị giằng xé giữa hai vị trung sĩ đối lập nhau — một tàn bạo và một nhân hậu — anh chứng kiến sự suy đồi đạo đức của đơn vị mình giữa sự khốc liệt của chiến tranh rừng rậm. Đạo diễn bởi Oliver Stone, một cựu binh từng tham chiến tại Việt Nam, phim được xem là một trong những tác phẩm chân thực nhất về cuộc chiến."],
          ["The Green Mile", "1999", "Tom Hanks :))))", "Lấy bối cảnh khu biệt giam tử tù tại một nhà tù ở Louisiana thập niên 1930, phim kể về quản giáo Paul Edgecomb và một tù nhân mới, John Coffey, người đàn ông to lớn nhưng hiền lành bị kết án giết hai bé gái. Khi Paul phát hiện Coffey sở hữu khả năng chữa lành kỳ diệu, ông dần tin rằng người đàn ông này vô tội. Chuyển thể từ tiểu thuyết của Stephen King, phim suy ngẫm về công lý, đức tin và sự tàn nhẫn."],
          ["The Godfather", "1972", "Đỉnh cao của vùng Sicily.", "Phim kể về gia tộc Corleone, một băng đảng tội phạm quyền lực ở New York do trùm gia tộc Vito Corleone đứng đầu, và sự biến đổi của người con trai út Michael từ một thanh niên miễn cưỡng thành một ông trùm mafia tàn nhẫn. Sau vụ ám sát hụt nhắm vào Vito, Michael ngày càng lún sâu vào đế chế tội phạm và những cuộc tranh giành quyền lực đẫm máu của gia đình. Chuyển thể từ tiểu thuyết của Mario Puzo, phim được xem là một trong những tác phẩm điện ảnh vĩ đại nhất mọi thời đại."],
          ["Jojo Rabbit", "2019", undefined, "Lấy bối cảnh nước Đức Quốc xã, phim kể về Jojo, một cậu bé mười tuổi cô đơn trong đội Thanh niên Hitler, có người bạn tưởng tượng là một phiên bản Adolf Hitler ngờ nghệch và trào phúng. Thế giới quan của cậu bị đảo lộn khi phát hiện mẹ mình đang bí mật che giấu một cô bé Do Thái tên Elsa trên gác mái. Khi dần thân thiết với Elsa, phim châm biếm chủ nghĩa phát xít trong khi khám phá chủ đề khoan dung và sự trưởng thành."],
          ["All Quiet In Western Front", "2022", undefined, "Chuyển thể từ tiểu thuyết của Erich Maria Remarque, phim kể về Paul Bäumer, một binh sĩ trẻ người Đức nhập ngũ trong Thế chiến I với lòng nhiệt huyết yêu nước. Anh cùng bạn bè nhanh chóng đối mặt với hiện thực tàn khốc của chiến tranh chiến hào, sự vỡ mộng và cái chết hàng loạt trên Mặt trận phía Tây. Bản chuyển thể tiếng Đức giành 4 giải Oscar, trong đó có Phim quốc tế hay nhất."],
          ["Oppenheimer", "2023", undefined, "Phim khắc họa cuộc đời nhà vật lý J. Robert Oppenheimer, người dẫn dắt Dự án Manhattan chế tạo quả bom nguyên tử đầu tiên trong Thế chiến II. Bên cạnh thành công của vụ thử Trinity, phim khắc họa sự dằn vặt của ông trước sức hủy diệt khủng khiếp mà mình tạo ra, cùng cuộc truy bức chính trị ông phải chịu thời hậu chiến khi bị các đối thủ nghi ngờ lòng trung thành. Đạo diễn bởi Christopher Nolan, phim giành 7 giải Oscar, trong đó có Phim hay nhất."],
        ],
      },
      {
        t: "Về tâm lý, xã hội, văn hóa",
        items: [
          ["Parasite", "2019", undefined, "Gia đình nhà Kim nghèo khó sống trong một căn hầm bán ngầm dần dần thâm nhập vào cuộc sống của gia đình giàu có nhà Park bằng cách giả mạo danh tính để làm việc cho họ. Khi ranh giới giữa hai tầng lớp bị xóa nhòa, một bí mật bất ngờ trong căn biệt thự đẩy câu chuyện vào những tình huống bạo lực và bi kịch. Phim của đạo diễn Bong Joon-ho là tác phẩm nước ngoài đầu tiên giành giải Oscar Phim hay nhất."],
          ["Us", "2019", undefined, "Gia đình Wilson trở về nghỉ dưỡng tại thị trấn ven biển nơi người mẹ Adelaide từng có một trải nghiệm ám ảnh thời thơ ấu. Một đêm nọ, gia đình họ bị tấn công bởi những kẻ song trùng đáng sợ giống hệt mình, được gọi là \"Tethered\". Bộ phim kinh dị của Jordan Peele dần hé lộ bí mật đen tối đằng sau những kẻ song trùng và mối liên hệ của chúng với xã hội bên trên mặt đất."],
          ["The Hunt", "2012", undefined, "Lucas, một giáo viên mẫu giáo tốt bụng ở một thị trấn nhỏ Đan Mạch, bị buộc tội oan sai là lạm dụng tình dục một bé gái sau một lời nói dối vô tình của cô bé. Dù không có bằng chứng xác thực, cộng đồng nhanh chóng quay lưng và cô lập anh một cách tàn nhẫn. Phim khắc họa cách một lời buộc tội sai có thể hủy hoại cuộc đời một con người vô tội."],
          ["A Few Good Men", "1992", undefined, "Hai lính thủy đánh bộ Mỹ bị buộc tội giết một đồng đội tại căn cứ Guantanamo, và luật sư quân đội trẻ tuổi Daniel Kaffee được giao bào chữa cho họ. Trong quá trình điều tra, Kaffee cùng đồng nghiệp phát hiện vụ việc liên quan đến một mệnh lệnh trừng phạt bí mật gọi là \"Code Red\". Phiên tòa cao trào khi Kaffee đối chất với vị chỉ huy quyền lực, Đại tá Nathan Jessup."],
          ["Old Boy", "2003", undefined, "Oh Dae-su bị giam giữ bí ẩn trong một căn phòng suốt 15 năm mà không rõ lý do, rồi bất ngờ được thả ra. Anh lao vào cuộc truy tìm kẻ đã giam cầm mình và lý do đằng sau, đồng thời nảy sinh tình cảm với một đầu bếp trẻ tên Mi-do. Bộ phim Hàn Quốc dẫn đến một sự thật gây sốc và bi kịch về sự trả thù."],
          ["The Platform", "2020", "Hiện thực xã hội.", "Bộ phim lấy bối cảnh một nhà tù thẳng đứng nhiều tầng, nơi thức ăn được đưa xuống từ trên cao qua một cái bệ, tầng trên luôn được ăn no trước khi phần còn lại rơi xuống các tầng dưới. Nhân vật chính Goreng tự nguyện vào đây và dần nhận ra sự tàn khốc của hệ thống khi thức ăn cạn kiệt ở những tầng thấp. Phim là một ẩn dụ sắc bén về bất bình đẳng xã hội và bản chất con người dưới áp lực sinh tồn."],
          ["Se7en", "1995", undefined, "Hai thám tử, một sắp nghỉ hưu và một mới chuyển đến, cùng điều tra một loạt vụ giết người tàn bạo được dàn dựng theo bảy tội lỗi chết người. Manh mối từ mỗi vụ án dẫn họ đến gần hơn với một kẻ sát nhân có kế hoạch tỉ mỉ và động cơ tôn giáo cực đoan. Phim kết thúc bằng một cái kết gây sốc, được xem là một trong những cái kết ám ảnh nhất lịch sử điện ảnh."],
          ["Black Swan", "2010", undefined, "Nina, một vũ công ba lê cầu toàn, giành được vai chính trong vở \"Hồ Thiên Nga\" nhưng phải vật lộn để thể hiện cả sự trong sáng của Bạch Thiên Nga lẫn sự quyến rũ nguy hiểm của Hắc Thiên Nga. Áp lực từ đạo diễn, người mẹ kiểm soát và một đối thủ mới đến khiến tâm lý Nina dần rạn nứt. Ranh giới giữa thực tế và ảo giác trở nên mờ nhạt khi cô đắm chìm vào vai diễn."],
          ["Little Women", "2019", "Dàn cast lung linh (search mới biết nguyên tác văn học được viết năm 1868, trong thời kì Thoreau — Walden 1854 :)))", "Phim kể về bốn chị em nhà March — Jo, Meg, Beth và Amy — lớn lên ở New England thời Nội chiến Mỹ, mỗi người theo đuổi những ước mơ và con đường riêng. Trọng tâm là Jo, một cô gái độc lập khao khát trở thành nhà văn trong một xã hội có nhiều ràng buộc với phụ nữ. Chuyển thể từ tiểu thuyết của Louisa May Alcott, phim đan xen giữa quá khứ và hiện tại qua các đoạn hồi tưởng."],
          ["The Good, The Bad And The Ugly", "1966", "Nghệ thuật miền viễn Tây.", "Ba tay súng miền Viễn Tây — Blondie tốt bụng, Angel Eyes tàn nhẫn và Tuco lươn lẹo — cùng lao vào cuộc truy tìm một kho vàng bị chôn giấu trong thời Nội chiến Mỹ. Mỗi người chỉ nắm giữ một phần thông tin về vị trí kho báu, buộc họ phải vừa hợp tác vừa đối đầu nhau. Phim của đạo diễn Sergio Leone là tác phẩm tiêu biểu của dòng phim \"spaghetti western\"."],
          ["The Curious Case Of Benjamin Button", "2008", "Cảm giác khi nhìn từng người yêu thương qua đời sẽ đáng sợ đến thế nào?", "Benjamin Button sinh ra với cơ thể của một cụ già rồi trẻ dần theo thời gian, ngược lại với quy luật tự nhiên. Xuyên suốt cuộc đời kỳ lạ của mình, anh trải qua tình yêu với Daisy, người mà tuổi tác của họ chỉ trùng khớp trong một giai đoạn ngắn ngủi. Chuyển thể từ truyện ngắn của F. Scott Fitzgerald, phim suy ngẫm về thời gian, tình yêu và sự mất mát."],
          ["Rain Man", "1988", "Buồn man mác.", "Charlie Babbitt, một người kinh doanh xe hơi ích kỷ, phát hiện ra người anh trai mắc chứng tự kỷ tên Raymond mà mình chưa từng biết đến sau khi cha qua đời. Charlie đưa Raymond đi cùng trong một chuyến xuyên nước Mỹ, ban đầu vì muốn đòi phần thừa kế, nhưng dần hình thành tình cảm anh em thực sự. Phim giành 4 giải Oscar, trong đó Dustin Hoffman đoạt giải Nam diễn viên chính xuất sắc nhất."],
          ["Spring, Summer, Fall, Winter... And Spring", "2003", "Nhẹ nhàng sâu sắc, về nhân quả.", "Phim kể về cuộc đời một nhà sư sống trong một ngôi chùa nổi trên hồ, được chia theo bốn mùa tượng trưng cho các giai đoạn khác nhau của đời người. Từ một cậu bé học đạo, nhân vật chính trải qua dục vọng, tội lỗi, sám hối và giác ngộ khi trưởng thành. Đạo diễn Kim Ki-duk sử dụng hình ảnh thiên nhiên để truyền tải triết lý Phật giáo về nhân quả và luân hồi."],
          ["Cloud Atlas", "2012", "Lại về nhân quả, Tom Hanks :’)))) Phim hay, truyện hay, và nhạc phim siêu đỉnh. Bản lục tấu kì bí :’))))", "Phim đan xen sáu câu chuyện diễn ra ở các thời đại khác nhau, từ thế kỷ 19 đến tương lai xa, với cùng một nhóm diễn viên đóng nhiều vai trong mỗi câu chuyện. Các mạch truyện — từ một chuyến hải trình, một vụ bê bối âm nhạc, đến một xã hội loạn lạc tương lai — được kết nối bởi các chủ đề tái sinh và nhân quả xuyên thời gian. Chuyển thể từ tiểu thuyết của David Mitchell, phim khám phá cách hành động của một cá nhân có thể vang vọng qua nhiều thế hệ."],
          ["The Man From Earth", "2007", "Ngồi nghe chém gió tào lao mà hài lòng hết sức :)))", "Trong buổi tiệc chia tay đồng nghiệp, giáo sư John Oldman bất ngờ tiết lộ với bạn bè rằng anh thực chất là một người tiền sử đã sống hơn 14.000 năm nhờ khả năng không lão hóa. Suốt buổi tối, anh kể lại những sự kiện lịch sử mình đã trải qua, khiến những người bạn học giả vừa hoài nghi vừa bị cuốn hút. Bộ phim gần như chỉ diễn ra trong một căn phòng, xoay quanh các cuộc tranh luận triết học, tôn giáo và khoa học."],
          ["Room", "2015", "Ám ảnh.", "Joy và con trai nhỏ Jack bị giam cầm suốt nhiều năm trong một căn phòng nhỏ bởi kẻ đã bắt cóc cô. Đối với Jack, căn phòng là cả thế giới mà cậu biết, cho đến khi mẹ tìm cách giúp cả hai trốn thoát. Sau khi được tự do, cả hai phải học cách thích nghi với thế giới rộng lớn cùng những tổn thương tâm lý để lại."],
          ["Whiplash", "2014", "Trống và Jazz, coi nhớ thở nhé.", "Andrew, một tay trống trẻ đầy tham vọng tại một nhạc viện danh tiếng, lọt vào mắt xanh của Terence Fletcher, một nhạc trưởng khắc nghiệt và tàn nhẫn. Fletcher liên tục đẩy Andrew đến giới hạn thể chất và tinh thần bằng những phương pháp huấn luyện cực đoan nhằm tìm kiếm sự hoàn hảo. Mối quan hệ thầy trò đầy ám ảnh này đẩy Andrew vào cuộc đấu tranh giữa đam mê âm nhạc và sự hủy hoại bản thân."],
          ["The Pursuit Of Happyness", "2006", "Cha con nhà Will Smith :)))", "Chris Gardner, một người cha đơn thân, rơi vào cảnh vô gia cư cùng con trai nhỏ sau khi khoản đầu tư vào máy đo mật độ xương thất bại. Trong lúc chật vật mưu sinh, anh tham gia một chương trình thực tập không lương tại một công ty môi giới chứng khoán với hy vọng đổi đời. Dựa trên câu chuyện có thật, phim khắc họa nghị lực phi thường của một người cha vì tương lai con mình."],
          ["Philadelphia", "1993", "AIDS và đồng tính.", "Andrew Beckett, một luật sư tài năng mắc bệnh AIDS, bị sa thải khỏi công ty luật danh tiếng với lý do ngụy tạo sau khi đồng nghiệp phát hiện tình trạng bệnh và xu hướng tính dục của anh. Anh thuê Joe Miller, một luật sư ban đầu kỳ thị người đồng tính, để kiện công ty cũ vì phân biệt đối xử. Phim là một trong những tác phẩm điện ảnh lớn đầu tiên của Hollywood đề cập trực diện đến HIV/AIDS và định kiến xã hội."],
          ["Catch Me If You Can", "2002", "Nể với độ thông minh, cười vì độ hài hước, buồn vì sự thật ẩn sau, mà trên hết coi vì 2 nam chính :)))", "Frank Abagnale Jr. là một thiếu niên tài năng giả mạo hàng loạt danh tính — từ phi công, bác sĩ đến luật sư — để lừa đảo hàng triệu đô la bằng séc giả khắp nước Mỹ. Đặc vụ FBI Carl Hanratty kiên trì truy đuổi Frank suốt nhiều năm, dần hình thành mối quan hệ đặc biệt giữa hai người. Dựa trên câu chuyện có thật, phim kết hợp hài hước, hồi hộp và những góc khuất tâm lý của nhân vật chính."],
          ["The Big Short", "2015", "Hiểu hơn về khủng hoảng tài chính.", "Phim kể về một nhóm nhà đầu tư và nhà phân tích tài chính khác nhau, những người nhận ra bong bóng thị trường nhà đất Mỹ sắp vỡ trước cuộc khủng hoảng tài chính năm 2008. Họ đặt cược chống lại thị trường bất động sản bằng các công cụ tài chính phức tạp, bất chấp sự hoài nghi của toàn ngành. Phim sử dụng lối kể chuyện phá vỡ bức tường thứ tư để giải thích các khái niệm tài chính phức tạp cho khán giả phổ thông."],
          ["Citizen Kane", "1941", "Đế chế báo chí.", "Sau cái chết của trùm truyền thông Charles Foster Kane, một nhà báo cố gắng tìm hiểu ý nghĩa của từ cuối cùng ông thốt ra — \"Rosebud\" — bằng cách phỏng vấn những người từng biết ông. Qua các hồi tưởng, cuộc đời Kane được tái hiện từ một cậu bé nghèo trở thành ông trùm báo chí quyền lực nhưng cô đơn. Phim của Orson Welles nổi tiếng với kỹ thuật quay phim và kể chuyện phi tuyến tính đột phá, thường được xem là một trong những phim vĩ đại nhất lịch sử điện ảnh."],
          ["Everything Everywhere All At Once", "2022", undefined, "Evelyn, một người phụ nữ Mỹ gốc Hoa đang chật vật với tiệm giặt ủi và mối quan hệ gia đình rạn nứt, bất ngờ phát hiện mình có khả năng kết nối ý thức với vô số phiên bản khác của chính mình trong đa vũ trụ. Cô phải học cách nhảy giữa các vũ trụ để ngăn chặn một thế lực hỗn loạn đang đe dọa hủy diệt tất cả. Xuyên suốt hành trình kỳ ảo, phim cũng là câu chuyện cảm động về tình mẹ con và sự chấp nhận giữa các thế hệ."],
          ["Past Lives", "2023", undefined, "Nora và Hae Sung là bạn thân thời thơ ấu ở Hàn Quốc trước khi Nora cùng gia đình di cư sang Bắc Mỹ. Hai người mất liên lạc rồi tái ngộ qua mạng nhiều năm sau, và cuối cùng gặp lại nhau trực tiếp tại New York khi Nora đã lập gia đình. Phim nhẹ nhàng khám phá khái niệm \"in-yun\" (nhân duyên) của người Hàn và những con đường cuộc đời có thể đã rẽ khác."],
          ["Killers Of The Flower Moon", "2023", undefined, "Phim dựa trên sự kiện có thật về loạt vụ sát hại người Osage giàu có nhờ dầu mỏ ở Oklahoma vào thập niên 1920. Ernest Burkhart cưới Mollie, một phụ nữ Osage, trong khi âm mưu cùng người chú William Hale từng bước sát hại các thành viên trong gia đình cô để chiếm đoạt quyền khai thác dầu. Cuộc điều tra của cơ quan tiền thân FBI dần phanh phui âm mưu tàn bạo đằng sau những cái chết."],
          ["Taxi Driver", "1976", undefined, "Travis Bickle, một cựu binh Việt Nam mất ngủ triền miên, làm nghề lái taxi ban đêm ở New York và ngày càng chán ghét sự suy đồi đạo đức mà anh chứng kiến trên đường phố. Anh phát triển nỗi ám ảnh với một cô gái điếm vị thành niên tên Iris và quyết tâm giải cứu cô khỏi cuộc sống đó. Sự cô lập và bất ổn tâm lý của Travis dần đẩy anh đến những hành động bạo lực cực đoan."],
          ["Won't You Be My Neighbor", "2018", undefined, "Bộ phim tài liệu kể về cuộc đời và sự nghiệp của Fred Rogers, người dẫn chương trình thiếu nhi \"Mister Rogers' Neighborhood\" trong hơn ba thập kỷ. Phim khắc họa triết lý giáo dục nhân văn của ông, luôn đề cao sự tử tế, cảm xúc chân thật và tôn trọng trẻ em. Qua các đoạn phỏng vấn và tư liệu lưu trữ, phim cho thấy ảnh hưởng sâu rộng của Rogers đến nhiều thế hệ khán giả Mỹ."],
          ["Three Billboards Outside Ebbing, Missouri", "2017", undefined, "Mildred Hayes, một người mẹ đau khổ vì con gái bị hãm hiếp và sát hại mà vụ án vẫn chưa được phá, thuê ba tấm biển quảng cáo lớn để công khai chỉ trích cảnh sát trưởng địa phương vì sự chậm trễ. Hành động của cô châm ngòi cho một loạt xung đột dữ dội với cảnh sát trưởng Willoughby và viên cảnh sát nóng nảy Dixon. Phim pha trộn bi kịch và hài đen, khám phá nỗi đau, sự giận dữ và khả năng cứu chuộc của con người."],
        ],
      },
    ],
  },
  {
    t: "II. Phía trên thì nặng não, còn dưới này là hại não",
    n: 19,
    items: [
      ["Split", "2017", undefined, "Kevin là một người đàn ông mắc chứng rối loạn đa nhân cách với 23 tính cách khác nhau tồn tại trong cơ thể anh. Anh bắt cóc ba cô gái tuổi teen và giam giữ họ trong một căn hầm bí mật. Khi nhân cách thứ 24 đầy nguy hiểm mang tên \"The Beast\" dần trỗi dậy, các cô gái phải tìm cách sống sót và trốn thoát."],
      ["Shutter Island", "2010", undefined, "Năm 1954, cảnh sát liên bang Teddy Daniels cùng cộng sự được cử đến đảo Shutter để điều tra vụ một bệnh nhân tâm thần mất tích bí ẩn khỏi bệnh viện. Trong quá trình điều tra, Teddy dần phát hiện những bí mật đáng sợ ẩn giấu sau bức tường bệnh viện và bắt đầu nghi ngờ chính thực tại của mình. Bộ phim dẫn dắt khán giả qua một loạt ảo giác và ký ức chấn thương trước khi hé lộ sự thật gây sốc ở cuối phim."],
      ["Fight Club", "1999", undefined, "Một nhân viên văn phòng mất ngủ triền miên tình cờ gặp Tyler Durden, một người bán xà phòng phóng khoáng và nổi loạn. Hai người cùng nhau lập ra \"câu lạc bộ đấu\" bí mật, nơi đàn ông giải tỏa sự bức bối bằng những trận ẩu đả tay đôi, và tổ chức này dần phát triển thành một phong trào vô chính phủ quy mô lớn. Bộ phim kết thúc bằng một cú twist gây chấn động về danh tính thực sự của Tyler Durden."],
      ["Inception", "2010", undefined, "Dom Cobb là một tên trộm chuyên đánh cắp bí mật từ tiềm thức người khác thông qua công nghệ chia sẻ giấc mơ. Anh được thuê thực hiện nhiệm vụ ngược lại - \"cấy\" một ý tưởng vào đầu người thừa kế một tập đoàn lớn, một nhiệm vụ gần như bất khả thi gọi là inception. Đội của Cobb phải xâm nhập qua nhiều tầng giấc mơ lồng nhau, trong khi chính anh vẫn bị ám ảnh bởi ký ức về người vợ đã mất."],
      ["Gone Girl", "2014", undefined, "Nick Dunne trở thành nghi phạm chính khi vợ anh, Amy, đột ngột mất tích vào đúng ngày kỷ niệm cưới của họ. Truyền thông và cảnh sát dần dồn ép Nick khi các bằng chứng bất lợi liên tục xuất hiện. Bộ phim tiết lộ dần sự thật đằng sau cuộc hôn nhân tưởng chừng hoàn hảo, với một bước ngoặt lớn về động cơ thực sự của Amy."],
      ["Triangle", "2009", undefined, "Sally cùng nhóm bạn ra khơi trên một chiếc du thuyền thì gặp phải một cơn bão bất thường. Họ buộc phải chuyển sang một con tàu viễn dương bỏ hoang mang tên Aeolus để trú ẩn, nơi Sally nhận ra mình đang mắc kẹt trong một vòng lặp thời gian kỳ lạ. Càng cố gắng thoát ra, cô càng bị cuốn sâu hơn vào chuỗi sự kiện lặp đi lặp lại đầy chết chóc."],
      ["Interstellar", "2014", undefined, "Trong tương lai khi Trái Đất dần trở nên không thể sinh sống, cựu phi công Cooper được tuyển chọn tham gia sứ mệnh du hành qua một hố sâu vũ trụ gần Sao Thổ để tìm hành tinh mới cho loài người. Anh phải rời xa các con, đặc biệt là cô con gái Murph, trong một chuyến đi mà thời gian trôi khác nhau giữa các hành tinh. Bộ phim kết hợp giữa khoa học vũ trụ và tình cảm gia đình xuyên suốt hành trình sinh tồn của nhân loại."],
      ["The Martian", "2015", undefined, "Trong một sứ mệnh lên Sao Hỏa, phi hành gia Mark Watney bị bỏ lại một mình sau khi đồng đội tưởng anh đã chết trong cơn bão cát. Anh phải vận dụng kiến thức khoa học để trồng trọt, tạo nước và duy trì sự sống trên hành tinh đỏ trong khi chờ đợi giải cứu. Đồng thời, NASA và các đồng đội cũ nỗ lực tìm cách đưa anh trở về Trái Đất an toàn."],
      ["Gravity", "2013", undefined, "Bác sĩ y khoa Ryan Stone cùng phi hành gia kỳ cựu Matt Kowalski đang thực hiện nhiệm vụ ngoài không gian thì một trận mưa mảnh vỡ vệ tinh phá hủy tàu con thoi của họ. Bị mắc kẹt trong không gian với nguồn oxy hạn hẹp, Stone phải tự mình tìm cách di chuyển giữa các trạm vũ trụ để sống sót. Bộ phim tập trung vào cuộc chiến sinh tồn đơn độc và ý chí trở về Trái Đất của cô."],
      ["Mystic River", "2003", undefined, "Ba người bạn thân thời thơ ấu - Jimmy, Sean và Dave - từng bị chia cắt bởi một biến cố đau thương khi Dave bị bắt cóc và lạm dụng lúc còn nhỏ. Nhiều năm sau, họ tình cờ gặp lại nhau khi con gái của Jimmy bị sát hại, và Dave trở thành nghi phạm chính vì hành vi bất thường. Bộ phim khám phá cách những tổn thương quá khứ tiếp tục ám ảnh và hủy hoại cuộc sống của cả ba người ở hiện tại."],
      ["The Prestige", "2006", undefined, "Hai ảo thuật gia Robert Angier và Alfred Borden vốn là bạn diễn thân thiết nhưng trở thành kình địch sau một tai nạn sân khấu chết người. Cả hai lao vào cuộc đua tìm ra ảo thuật biến mất - xuất hiện hoàn hảo nhất, sẵn sàng đánh đổi mọi thứ kể cả đạo đức và tính mạng để vượt mặt đối thủ. Bộ phim dần hé lộ những bí mật đen tối đằng sau các màn ảo thuật của cả hai người."],
      ["The Silence Of The Lambs", "1991", undefined, "Clarice Starling, một học viên FBI, được giao nhiệm vụ phỏng vấn bác sĩ tâm thần kiêm kẻ giết người hàng loạt Hannibal Lecter đang bị giam giữ. Cô hy vọng những hiểu biết của Lecter có thể giúp lần ra dấu vết của một kẻ giết người khác đang lột da nạn nhân, biệt danh Buffalo Bill. Mối quan hệ căng thẳng và đầy toan tính giữa Clarice và Lecter dần trở thành chìa khóa để phá án."],
      ["Memento", "2000", undefined, "Leonard Shelby mắc chứng mất trí nhớ ngắn hạn sau một vụ tấn công khiến vợ anh bị sát hại, khiến anh không thể lưu giữ ký ức mới quá vài phút. Anh dùng ảnh chụp, ghi chú và hình xăm trên cơ thể để ghi lại manh mối trong hành trình truy tìm kẻ giết vợ mình. Bộ phim được kể theo trình tự đảo ngược, khiến khán giả trải nghiệm sự hoang mang tương tự như nhân vật chính."],
      ["The Wolf Of Wall Street", "2013", undefined, "Dựa trên câu chuyện có thật, phim kể về Jordan Belfort, một nhà môi giới chứng khoán trẻ tuổi nhanh chóng làm giàu nhờ các thủ đoạn lừa đảo tài chính. Anh cùng đồng bọn xây dựng công ty môi giới Stratton Oakmont và sống một cuộc đời xa hoa, trụy lạc với tiền bạc, ma túy và tiệc tùng. Cuối cùng, những hành vi phi pháp của Belfort thu hút sự chú ý của FBI, dẫn đến sự sụp đổ của đế chế mà anh xây dựng."],
      ["Inglourious Basterds", "2009", undefined, "Trong Thế chiến II, một nhóm biệt kích Do Thái người Mỹ do trung úy Aldo Raine chỉ huy chuyên đi săn và giết hại binh lính Đức Quốc xã. Song song đó, Shosanna, một cô gái Do Thái sống sót sau vụ thảm sát gia đình, lên kế hoạch trả thù bằng cách thiêu rụi rạp chiếu phim của mình trong một buổi công chiếu có sự tham dự của giới lãnh đạo Đức Quốc xã. Hai tuyến truyện dần hội tụ trong một âm mưu ám sát táo bạo nhắm vào Hitler."],
      ["Glass", "2019", undefined, "Phần kết của bộ ba phim gồm Unbreakable và Split, tác phẩm đưa ba nhân vật David Dunn (người có sức mạnh siêu nhiên), Kevin Wendell Crumb (kẻ mang 24 nhân cách) và Elijah Price/Mr. Glass (thiên tài mưu mô với xương giòn) vào cùng một bệnh viện tâm thần. Tại đây, một bác sĩ tâm lý cố gắng thuyết phục cả ba rằng khả năng đặc biệt của họ chỉ là ảo tưởng. Mr. Glass âm mưu dàn dựng một cuộc đối đầu để chứng minh cho thế giới thấy siêu năng lực là có thật."],
      ["I'm Thinking Of Ending Things", "2020", undefined, "Một cô gái trẻ đang cân nhắc chia tay bạn trai Jake cùng anh thực hiện chuyến đi đến thăm bố mẹ anh tại một trang trại hẻo lánh. Trong suốt chuyến đi, những cuộc trò chuyện và sự kiện dần trở nên kỳ lạ, phi thực tế và đáng lo ngại. Bộ phim đan xen giữa hiện tại và những đoạn hồi tưởng mơ hồ, dẫn đến một cái kết đầy tính biểu tượng và gây tranh cãi."],
      ["Synecdoche, New York", "2008", undefined, "Phim kể về Caden Cotard, một đạo diễn sân khấu ám ảnh với cái chết và sự nghiệp dang dở, quyết định dựng một vở kịch tái hiện chính cuộc đời mình với quy mô ngày càng khổng lồ. Ranh giới giữa vở kịch và thực tế dần biến mất khi ông xây cả một thành phố thu nhỏ bên trong nhà kho để mô phỏng cuộc sống của chính mình. Tác phẩm của Charlie Kaufman là một mê cung siêu thực về thời gian, nghệ thuật và nỗi sợ hãi sự hữu hạn của đời người."],
      ["Requiem For A Dream", "2000", undefined, "Bộ phim theo chân bốn nhân vật ở Brooklyn — Harry, bạn gái Marion, bạn thân Tyrone và mẹ của Harry, Sara — khi mỗi người dần trượt sâu vào vòng xoáy nghiện ngập theo những cách khác nhau. Đạo diễn Darren Aronofsky sử dụng kỹ thuật dựng phim dồn dập, ám ảnh để tái hiện quá trình tha hóa không thể cứu vãn của họ. Đây là một trong những bộ phim khắc họa chân thực và tàn khốc nhất về nghiện ngập trong lịch sử điện ảnh."],
    ],
  },
  {
    t: "III. Xem xong muốn vác xe đi ngay",
    n: 12,
    items: [
      ["The Motorcycle Diaries", "2004", "Nhật kí của huyền thoại Nam Mỹ Che.", "Dựa trên nhật ký có thật, phim kể về chuyến hành trình xuyên Nam Mỹ bằng xe máy của chàng sinh viên y khoa trẻ tuổi Ernesto \"Che\" Guevara cùng người bạn thân Alberto Granado vào năm 1952. Trên đường đi qua Argentina, Chile, Peru và Venezuela, họ chứng kiến cảnh nghèo đói, bất công xã hội và cuộc sống khốn khó của người dân bản địa. Chuyến đi này đã góp phần hình thành nên tư tưởng cách mạng sau này của Che Guevara."],
      ["Secret Life Of Walter Mitty", "2013", undefined, "Walter Mitty là một nhân viên biên tập ảnh nhút nhát tại tạp chí Life, thường xuyên chìm đắm trong những giấc mơ phiêu lưu để trốn tránh cuộc sống tẻ nhạt. Khi làm mất tấm phim quan trọng cho số báo cuối cùng của tạp chí, anh buộc phải rời khỏi vùng an toàn để đi tìm nhiếp ảnh gia bí ẩn Sean O'Connell trên khắp thế giới. Hành trình thực tế đưa Walter đến Greenland, Iceland và Himalaya, biến những giấc mơ tưởng tượng của anh thành trải nghiệm có thật."],
      ["Tracks", "2013", undefined, "Dựa trên câu chuyện có thật, phim kể về Robyn Davidson, một phụ nữ trẻ người Úc quyết định thực hiện chuyến đi bộ đơn độc dài gần 2.700km xuyên sa mạc Úc để đến Ấn Độ Dương. Cô chuẩn bị cho hành trình bằng cách huấn luyện bốn con lạc đà để mang đồ tiếp tế, đồng hành cùng chú chó của mình. Trên đường đi, cô đối mặt với điều kiện khắc nghiệt của sa mạc cũng như những giằng xé nội tâm về sự cô độc và tự do."],
      ["Into The Wild", "2007", undefined, "Dựa trên câu chuyện có thật, phim kể về Christopher McCandless, một chàng trai trẻ tốt nghiệp đại học với thành tích xuất sắc nhưng quyết định từ bỏ tài sản, đốt hết tiền bạc và cắt đứt liên lạc với gia đình. Anh lang thang khắp nước Mỹ, gặp gỡ nhiều người trên đường đi, trước khi tiến vào vùng hoang dã Alaska để sống tách biệt hoàn toàn với văn minh. Cuộc sống đơn độc giữa thiên nhiên khắc nghiệt cuối cùng dẫn đến bi kịch khi Christopher không thể tìm đường trở về."],
      ["Wild", "2014", undefined, "Dựa trên hồi ký của Cheryl Strayed, phim kể về hành trình cô một mình đi bộ đường dài hơn 1.700km trên cung đường Pacific Crest Trail từ sa mạc Mojave đến biên giới Oregon-Washington. Chuyến đi diễn ra sau khi cuộc đời cô rơi vào khủng hoảng vì cái chết của mẹ, cuộc hôn nhân đổ vỡ và quãng thời gian sa vào ma túy. Qua từng chặng đường gian khổ, Cheryl dần đối diện với quá khứ và tìm lại sự bình yên trong chính mình."],
      ["Up", "2009", undefined, "Carl Fredricksen là một cụ già góa vợ quyết định buộc hàng ngàn quả bóng bay vào ngôi nhà của mình để bay đến thác Paradise ở Nam Mỹ, thực hiện lời hứa với người vợ quá cố. Trong chuyến đi, ông vô tình phát hiện có một cậu bé hướng đạo sinh tên Russell đang trốn trên hiên nhà mình. Hai người cùng nhau trải qua một cuộc phiêu lưu bất ngờ, gặp gỡ một nhà thám hiểm bí ẩn và một chú chó biết nói."],
      ["The Bucket List", "2007", undefined, "Edward Cole, một tỷ phú giàu có, và Carter Chambers, một thợ máy hiền lành, tình cờ trở thành bạn cùng phòng bệnh khi cả hai được chẩn đoán mắc bệnh ung thư giai đoạn cuối. Họ cùng nhau lập ra một danh sách những điều muốn làm trước khi qua đời, gọi là \"bucket list\", rồi lên đường thực hiện chúng bất chấp sự khác biệt về tính cách và hoàn cảnh sống. Chuyến hành trình đưa họ đi khắp thế giới và giúp cả hai tìm lại ý nghĩa thực sự của cuộc sống."],
      ["Cast Away", "2000", undefined, "Chuck Noland là một nhân viên FedEx sống theo giờ giấc khắt khe, gặp tai nạn máy bay và trở thành người sống sót duy nhất, dạt vào một hòn đảo hoang giữa Thái Bình Dương. Anh phải học cách tự tạo lửa, kiếm ăn và sinh tồn suốt bốn năm trời với vật bất ly thân là một quả bóng đá mang tên Wilson. Cuối cùng, Chuck tìm cách chế tạo bè để rời đảo và trở về với cuộc sống đã thay đổi hoàn toàn phía sau anh."],
      ["Life Of Pi", "2012", undefined, "Pi Patel, con trai của một chủ vườn thú Ấn Độ, cùng gia đình di cư sang Canada bằng tàu chở theo các loài động vật trong vườn thú. Con tàu gặp bão và chìm giữa đại dương, chỉ còn Pi sống sót trên một chiếc xuồng cứu sinh cùng với một con hổ Bengal tên Richard Parker. Suốt hơn hai trăm ngày lênh đênh trên biển, Pi phải tìm cách vừa sinh tồn vừa chung sống với con hổ dữ trong không gian chật hẹp."],
      ["Everest", "2015", undefined, "Dựa trên thảm họa có thật năm 1996, phim kể về hai đoàn thám hiểm thương mại do Rob Hall và Scott Fischer dẫn dắt trong nỗ lực chinh phục đỉnh Everest. Khi gần đến đỉnh núi, một cơn bão tuyết dữ dội bất ngờ ập đến, khiến các đoàn leo núi mắc kẹt trong điều kiện thời tiết khắc nghiệt và thiếu oxy. Bộ phim tái hiện cuộc chiến sinh tồn tuyệt vọng của các nhà leo núi giữa bão tuyết và độ cao chết người."],
      ["The Odyssey", "2026", undefined, "Bộ phim chuyển thể sử thi Hy Lạp cổ đại của Homer, kể về hành trình gian nan của người anh hùng Odysseus trở về quê nhà Ithaca sau cuộc chiến thành Troy. Trên đường đi, ông phải đối mặt với quái vật, thần linh và vô số thử thách đe dọa tính mạng trước khi đoàn tụ với vợ con. Đạo diễn Christopher Nolan hứa hẹn mang đến một sử thi phiêu lưu hoành tráng trên màn ảnh rộng."],
      ["Ford V Ferrari", "2019", undefined, "Phim kể về cuộc đối đầu giữa hãng xe Ford và Ferrari tại giải đua Le Mans 24 giờ năm 1966, qua góc nhìn của kỹ sư Carroll Shelby và tay đua Ken Miles. Hai người đàn ông phải vượt qua áp lực từ ban lãnh đạo tập đoàn để theo đuổi chiếc xe đua hoàn hảo theo đúng tầm nhìn của họ. Bộ phim tôn vinh tình bạn, đam mê tốc độ và tinh thần theo đuổi sự xuất sắc bất chấp rào cản."],
    ],
  },
  {
    t: "IV. Kiểu cuộc đời của mấy thiên tài",
    n: 10,
    items: [
      ["Gifted", "2017", undefined, "Frank Adler là một người đàn ông độc thân đang nuôi dưỡng cháu gái Mary, một cô bé sở hữu năng khiếu toán học thiên tài. Khi tài năng của Mary bị phát hiện ở trường, bà ngoại của cô bé xuất hiện và muốn giành quyền nuôi dưỡng để đào tạo Mary thành một nhà toán học chuyên nghiệp. Cuộc tranh chấp quyền nuôi con đặt ra câu hỏi về việc nên để một đứa trẻ thiên tài có tuổi thơ bình thường hay phát triển tối đa tài năng của mình."],
      ["Good Will Hunting", "1997", "Matt Damon :)))", "Will Hunting là một chàng trai trẻ làm công việc lao công tại MIT nhưng sở hữu trí tuệ toán học thiên tài, thường giấu kín khả năng của mình. Sau khi giải được một bài toán khó trên bảng và bị bắt vì đánh nhau, anh buộc phải gặp gỡ nhà trị liệu tâm lý Sean Maguire để tránh ngồi tù. Qua các buổi trị liệu, Will dần đối diện với những tổn thương thời thơ ấu và học cách mở lòng với cuộc sống, tình yêu và tương lai của chính mình."],
      ["Amadeus", "1984", undefined, "Antonio Salieri, nhạc sĩ cung đình được trọng vọng tại Vienna, kể lại câu chuyện cuộc đời mình khi đối mặt với sự xuất hiện của thiên tài âm nhạc trẻ tuổi Wolfgang Amadeus Mozart. Dù ngưỡng mộ tài năng của Mozart, Salieri dần bị lòng ghen tị gặm nhấm khi nhận ra mình mãi mãi không thể sánh bằng thiên phú của đối thủ. Sự đố kỵ đẩy Salieri vào âm mưu ngấm ngầm hãm hại Mozart, góp phần dẫn đến cái chết bi thảm của thiên tài âm nhạc này."],
      ["The Imitation Game", "2014", undefined, "Trong Thế chiến II, nhà toán học Alan Turing được chính phủ Anh tuyển vào đội ngũ bí mật tại Bletchley Park để giải mã hệ thống mật mã Enigma của Đức Quốc xã. Turing chế tạo một cỗ máy tính toán đặc biệt, tiền thân của máy tính hiện đại, để phá giải mật mã tưởng chừng bất khả xâm phạm này. Sau chiến tranh, dù có công lớn giúp rút ngắn cuộc chiến, Turing lại bị truy tố và trừng phạt vì xu hướng tính dục đồng giới của mình theo luật pháp Anh thời bấy giờ."],
      ["X+Y (A Brilliant Young Mind)", "2015", undefined, "Nathan là một cậu bé mắc chứng tự kỷ nhưng sở hữu tài năng toán học xuất chúng, gặp khó khăn trong việc kết nối cảm xúc với những người xung quanh kể từ sau cái chết của cha mình. Cậu được chọn vào đội tuyển Anh tham dự kỳ thi Olympic Toán học Quốc tế và bắt đầu được huấn luyện bởi một giáo viên có hoàn cảnh đặc biệt. Trong quá trình luyện tập và thi đấu tại Đài Loan, Nathan dần học cách mở lòng, kết bạn và đối diện với cảm xúc của chính mình."],
      ["The Theory Of Everything", "2014", undefined, "Phim kể về cuộc đời nhà vật lý học Stephen Hawking từ thời còn là nghiên cứu sinh tại Cambridge, nơi ông gặp và yêu Jane Wilde. Ngay sau đó, Hawking được chẩn đoán mắc bệnh thần kinh vận động ALS và được cho biết chỉ còn sống được vài năm, nhưng ông vẫn tiếp tục nghiên cứu khoa học và kết hôn với Jane. Bộ phim theo chân hành trình Hawking vượt qua giới hạn cơ thể để trở thành một trong những nhà vật lý lý thuyết vĩ đại nhất, đồng thời khắc họa những thăng trầm trong cuộc hôn nhân của ông."],
      ["A Beautiful Mind", "2001", undefined, "John Nash là một nhà toán học tài năng tại Đại học Princeton, người phát triển những lý thuyết đột phá về game lý thuyết ngay từ khi còn trẻ. Sự nghiệp của ông dần bị xáo trộn khi các triệu chứng của bệnh tâm thần phân liệt xuất hiện, khiến ông không thể phân biệt giữa thực tại và ảo giác do chính tâm trí tạo ra. Với sự hỗ trợ của vợ mình, Alicia, Nash dần học cách sống chung với căn bệnh và tiếp tục sự nghiệp nghiên cứu, cuối cùng được trao giải Nobel."],
      ["August Rush", "2008", undefined, "Evan là một cậu bé mồ côi sở hữu năng khiếu âm nhạc thiên bẩm, tin rằng mình có thể tìm lại cha mẹ ruột thông qua âm nhạc. Cậu trốn khỏi trại trẻ mồ côi để đến New York, nơi cậu được một người đàn ông bí ẩn nhận nuôi và đặt nghệ danh August Rush, đồng thời phát triển tài năng âm nhạc của mình. Song song đó, cha và mẹ ruột của Evan, hai nhạc sĩ từng yêu nhau nhưng bị chia cắt, cũng đang trên hành trình tìm lại nhau và đứa con họ tưởng đã mất."],
      ["The Talented Mr Ripley", "1999", undefined, "Tom Ripley, một chàng trai trẻ nghèo khó nhưng khéo léo giả mạo thân phận, được một triệu phú thuê sang Ý để thuyết phục con trai ông, Dickie Greenleaf, trở về Mỹ. Tom dần bị cuốn hút bởi cuộc sống xa hoa của Dickie và nảy sinh khao khát chiếm đoạt danh tính cũng như cuộc sống của anh ta. Khi mối quan hệ giữa hai người rạn nứt, Tom sa vào một chuỗi lừa dối và tội ác để che giấu bí mật của mình."],
      ["The King's Speech", "2010", undefined, "Phim kể về Hoàng tử Albert, sau này là Vua George VI của Anh, người phải vật lộn với chứng nói lắp nghiêm trọng ngay khi đất nước cần một vị vua có thể truyền cảm hứng qua radio trước Thế chiến II. Ông tìm đến Lionel Logue, một chuyên gia trị liệu ngôn ngữ khác thường, để học cách vượt qua nỗi sợ hãi và tìm lại giọng nói của mình. Bộ phim là câu chuyện cảm động về tình bạn, lòng can đảm và trách nhiệm."],
    ],
  },
  {
    t: "V. Phim đẹp",
    n: 13,
    items: [
      ["Amélie", "2001", "Chuyển cảnh, bố cục, màu sắc và sự độc đáo phá cách đã làm nên một Paris tuyệt diệu. Biết qua bản nhạc phim, siêu siêu peaceful.", "Amélie Poulain là một cô gái trẻ nhút nhát sống tại Montmartre, Paris, người tự tạo cho mình một thế giới riêng đầy tưởng tượng sau tuổi thơ cô đơn. Sau khi tình cờ tìm thấy một hộp kỷ vật cũ trong căn hộ của mình, cô quyết định dành thời gian âm thầm làm những điều tốt đẹp để thay đổi cuộc sống của những người xung quanh. Trong quá trình đó, Amélie dần học cách vượt qua sự rụt rè của bản thân để theo đuổi tình yêu của chính mình."],
      ["Moonrise Kingdom", "2012", "Dải vàng ấm áp trẻ trung trong bảng màu của bạn Wes Anderson.", "Sam, một hướng đạo sinh mồ côi, và Suzy, một cô bé sống trong gia đình không hạnh phúc, bí mật lên kế hoạch bỏ trốn cùng nhau trên một hòn đảo nhỏ ở New England vào năm 1965. Cuộc trốn chạy của hai đứa trẻ khiến cả cộng đồng đảo, bao gồm cha mẹ Suzy, đội trưởng hướng đạo và cảnh sát trưởng, đổ xô đi tìm kiếm chúng. Trong lúc đó, một cơn bão lớn đang tiến đến hòn đảo, đe dọa làm thay đổi mọi kế hoạch của cả người lớn lẫn trẻ con."],
      ["The Grand Budapest Hotel", "2014", "Dải hồng giả tạo hay dải tím quý phái?", "Gustave H. là quản lý lịch lãm của khách sạn Grand Budapest danh tiếng tại một quốc gia châu Âu hư cấu, nổi tiếng với việc chăm sóc chu đáo cho các vị khách quý tộc lớn tuổi. Khi một trong những vị khách giàu có qua đời và để lại cho ông một bức tranh vô giá, Gustave bị gia đình người quá cố vu cho tội giết người và phải bỏ trốn cùng cậu bé phục vụ Zero. Hai người trải qua một chuỗi phiêu lưu ly kỳ xoay quanh bức tranh, một vụ vượt ngục và cuộc rượt đuổi xuyên châu Âu giữa thời chiến tranh cận kề."],
      ["Song Of The Sea", "2014", "Mãn nhãn với màu biển.", "Ben và em gái Saoirse sống cùng cha tại một ngọn hải đăng sau khi mẹ các em biến mất bí ẩn từ nhiều năm trước. Saoirse thực chất là một selkie, sinh vật huyền thoại nửa người nửa hải cẩu, sở hữu khả năng đặc biệt để giải cứu các linh hồn thần tiên đang dần hóa đá. Hai anh em cùng nhau thực hiện một hành trình phiêu lưu qua thế giới thần thoại Ireland để tìm lại chiếc áo khoác phép thuật và cứu lấy thế giới các nàng tiên."],
      ["Me And Earl And The Dying Girl", "2015", undefined, "Greg là một học sinh trung học luôn cố gắng giữ khoảng cách với mọi người, chỉ có một người bạn thân duy nhất là Earl, cùng nhau làm những bộ phim nhại nghiệp dư. Khi mẹ ép Greg kết bạn với Rachel, một bạn học vừa được chẩn đoán mắc bệnh bạch cầu, cậu miễn cưỡng bắt đầu dành thời gian cho cô. Qua thời gian, tình bạn giữa ba người dần trở nên sâu sắc khi Greg và Earl quyết định làm một bộ phim đặc biệt dành riêng cho Rachel."],
      ["American Beauty", "1999", undefined, "Lester Burnham là một người đàn ông trung niên chán nản với cuộc hôn nhân tẻ nhạt và công việc nhàm chán, sống cùng vợ đầy tham vọng và cô con gái tuổi teen xa cách. Khi gặp gỡ Angela, bạn thân của con gái mình, Lester nảy sinh sự say mê khiến anh quyết định thay đổi hoàn toàn lối sống, từ bỏ công việc và bắt đầu tập thể hình. Bộ phim khắc họa sự rạn nứt bên trong một gia đình ngoại ô Mỹ tưởng chừng hoàn hảo, dẫn đến một kết cục bi kịch bất ngờ."],
      ["Léon: The Professional", "1994", undefined, "Léon là một sát thủ chuyên nghiệp sống ẩn dật, đơn độc tại New York, ít giao tiếp với thế giới bên ngoài. Khi cô bé hàng xóm Mathilda có cả gia đình bị một nhân viên DEA tham nhũng sát hại, Léon miễn cưỡng cho cô bé trú ẩn trong căn hộ của mình. Dần dần, Léon trở thành người bảo hộ và dạy Mathilda nghề sát thủ, trong khi cô bé khao khát trả thù cho gia đình đã mất."],
      ["Frozen II", "2019", "Nhạc phim hay, đồ họa đẹp.", "Ba năm sau các sự kiện ở phần phim đầu, Elsa bắt đầu nghe thấy một giọng hát bí ẩn vang vọng từ xa, thôi thúc nữ hoàng rời khỏi Arendelle để tìm hiểu nguồn gốc sức mạnh của mình. Cùng với Anna, Kristoff, Sven và Olaf, Elsa lên đường đến khu rừng bị nguyền của các nguyên tố, nơi ẩn giấu bí mật về quá khứ của vương quốc Arendelle. Hành trình khám phá này buộc Elsa phải đối mặt với sự thật về nguồn gốc sức mạnh của mình và cái giá phải trả để bảo vệ vương quốc."],
      ["Little Forest", "2014", undefined, "Phim kể về một cô gái trẻ rời bỏ cuộc sống bận rộn và áp lực ở thành phố để trở về ngôi làng nhỏ nơi cô lớn lên. Tại đó, cô tự trồng trọt, thu hoạch và nấu những món ăn theo mùa bằng nguyên liệu do chính tay mình làm ra. Qua từng bữa ăn giản dị gắn với ký ức về người mẹ đã rời đi, cô dần tìm lại sự cân bằng và ý nghĩa cho cuộc sống của mình."],
      ["Midnight In Paris", "2011", undefined, "Gil Pender là một nhà biên kịch Hollywood đang loay hoay viết cuốn tiểu thuyết đầu tay, cùng vị hôn thê đi du lịch Paris. Mỗi đêm vào lúc nửa đêm, khi lang thang một mình trên đường phố, Gil bất ngờ được đưa ngược về Paris thập niên 1920, nơi anh gặp gỡ những nhân vật văn học và nghệ thuật nổi tiếng như Hemingway, Fitzgerald và Picasso. Trải nghiệm kỳ diệu này khiến Gil phải suy ngẫm lại về khái niệm hoài niệm, tình yêu và những gì anh thực sự mong muốn cho cuộc sống của mình."],
      ["Boy, Mole, Fox, Horse", "2022", undefined, "Dựa trên cuốn sách minh họa nổi tiếng của Charlie Mackesy, phim kể về hành trình của một cậu bé lạc trong khu rừng tuyết, tình cờ gặp gỡ ba người bạn đồng hành là chú chuột chũi tham ăn, con cáo từng bị tổn thương và chú ngựa hiền lành, thông thái. Bốn nhân vật cùng nhau bước đi qua khu rừng, chia sẻ những suy nghĩ giản dị nhưng sâu sắc về lòng tốt, sự sợ hãi, tình bạn và giá trị của việc được yêu thương. Hành trình của họ dần trở thành một câu chuyện ẩn dụ đầy cảm xúc về việc chấp nhận bản thân và tìm kiếm sự chữa lành."],
      ["The Taste Of Things", "2023", undefined, "Bối cảnh nước Pháp cuối thế kỷ 19, phim kể về mối quan hệ giữa đầu bếp tài hoa Dodin và Eugénie, người phụ nữ đã nấu ăn cùng ông suốt hai mươi năm và trở thành tri kỷ không chính thức của ông. Qua những cảnh nấu nướng tỉ mỉ, đầy chất thơ, bộ phim tôn vinh nghệ thuật ẩm thực Pháp như một ngôn ngữ của tình yêu. Đây là một bản tình ca chậm rãi, tinh tế về sự gắn kết được nuôi dưỡng qua từng bữa ăn."],
      ["Flow", "2024", undefined, "Bộ phim hoạt hình không lời kể về một chú mèo đen phải học cách sinh tồn và hợp tác với các loài động vật khác — chó, vượn cáo, capybara, chim — trên một chiếc thuyền nhỏ giữa trận đại hồng thủy nhấn chìm thế giới. Không có lời thoại, phim kể chuyện hoàn toàn qua hình ảnh, âm thanh và hành động của các nhân vật động vật. Tác phẩm hoạt hình Latvia này gây ấn tượng mạnh với hình ảnh đẹp mê hoặc và thông điệp về sự đoàn kết vượt qua nghịch cảnh."],
    ],
  },
  {
    t: "VI. LGBT",
    n: 14,
    items: [
      ["Moonlight", "2017", undefined, "Phim kể về hành trình trưởng thành của Chiron, một cậu bé da đen lớn lên ở khu ổ chuột Miami, được chia thành ba giai đoạn: thời thơ ấu, tuổi thiếu niên và tuổi trưởng thành. Xuyên suốt phim, Chiron phải đối mặt với bạo lực, sự kỳ thị và quá trình khám phá bản dạng giới tính cũng như tình yêu đồng giới của bản thân. Phim giành giải Oscar cho Phim hay nhất tại lễ trao giải năm 2017."],
      ["Brokeback Mountain", "2005", undefined, "Phim kể về mối tình bí mật kéo dài nhiều thập kỷ giữa hai chàng cao bồi Ennis Del Mar và Jack Twist, bắt đầu từ mùa hè họ cùng chăn cừu trên núi Brokeback ở Wyoming. Dù cả hai đều lập gia đình và có con riêng, họ vẫn lén lút gặp nhau qua nhiều năm vì không thể công khai tình cảm trong xã hội bảo thủ thời bấy giờ. Câu chuyện kết thúc bi kịch khi Jack qua đời, để lại Ennis sống với nỗi mất mát và hối tiếc."],
      ["Call Me By Your Name", "2017", "Chất Ý miên man.", "Phim lấy bối cảnh mùa hè năm 1983 tại miền quê nước Ý, kể về mối tình đầu giữa Elio, cậu thiếu niên mười bảy tuổi, và Oliver, một nghiên cứu sinh người Mỹ đến ở cùng gia đình Elio. Qua những ngày hè chậm rãi, hai người dần nảy sinh tình cảm và trải qua một mùa hè đầy cảm xúc bên nhau. Khi mùa hè kết thúc, Oliver phải trở về Mỹ, để lại Elio với nỗi đau của mối tình đầu."],
      ["Manchester By The Sea", "2016", undefined, "Phim kể về Lee Chandler, một người đàn ông sống khép kín và cô độc, buộc phải trở về quê nhà Manchester-by-the-Sea sau khi anh trai qua đời đột ngột. Tại đây anh phát hiện mình được chỉ định làm người giám hộ cho cháu trai tuổi teen Patrick, dù bản thân vẫn đang vật lộn với một bi kịch trong quá khứ từng hủy hoại cuộc hôn nhân của mình. Phim khắc họa hành trình đau đớn của Lee khi phải đối diện lại với quá khứ và cố gắng xây dựng mối quan hệ với cháu trai."],
      ["Blue Is The Warmest Colour", "2013", undefined, "Phim kể về Adèle, một nữ sinh trung học Pháp, và hành trình khám phá tình yêu, tình dục và bản dạng của cô sau khi gặp gỡ Emma, một nữ họa sĩ tóc xanh. Mối quan hệ giữa hai người phát triển sâu sắc qua nhiều năm, từ những rung động đầu đời cho đến những xung đột và chia ly. Phim theo dõi quá trình trưởng thành của Adèle cả về mặt cảm xúc lẫn nghề nghiệp."],
      ["Chinese Botanist's Daughters", "2006", undefined, "Phim kể về An, một nữ sinh viên đến sống và học việc tại khu vườn thực vật biệt lập của một nhà thực vật học nghiêm khắc trên một hòn đảo ở Trung Quốc. Tại đây cô gặp và dần nảy sinh tình cảm với Min, con gái của nhà thực vật học, dẫn đến một mối tình đồng giới bí mật giữa hai người. Vì xã hội và gia đình không chấp nhận, mối quan hệ của họ phải đối mặt với nhiều rào cản và kết thúc đầy bi kịch."],
      ["Portrait Of A Lady On Fire", "2019", "Đẹp và buồn.", "Phim lấy bối cảnh nước Pháp cuối thế kỷ 18, kể về Marianne, một nữ họa sĩ được thuê để vẽ chân dung Héloïse, một tiểu thư chuẩn bị kết hôn theo sắp đặt mà không hề hay biết mình đang được vẽ tranh cưới. Trong quá trình quan sát và tiếp xúc, hai người phụ nữ dần nảy sinh tình cảm sâu đậm với nhau. Câu chuyện tình yêu ngắn ngủi nhưng mãnh liệt của họ diễn ra trong bí mật trước khi Héloïse phải bước vào cuộc hôn nhân đã định."],
      ["Ammonite", "2020", undefined, "Phim lấy cảm hứng từ cuộc đời nhà cổ sinh vật học Mary Anning, người sống một mình tại vùng biển Lyme Regis nước Anh và kiếm sống bằng việc tìm kiếm hóa thạch. Cuộc sống của bà thay đổi khi Charlotte Murchison, vợ của một nhà địa chất học, được gửi đến ở cùng bà để hồi phục sức khỏe. Qua thời gian gần gũi, giữa hai người phụ nữ dần nảy sinh một mối tình sâu sắc."],
      ["Carol", "2017", undefined, "Phim lấy bối cảnh New York thập niên 1950, kể về mối tình giữa Carol, một người phụ nữ trung niên đang trải qua cuộc ly hôn, và Therese, một cô gái trẻ làm nhân viên bán hàng. Mối quan hệ của họ nảy nở qua những lần gặp gỡ tình cờ tại cửa hàng bách hóa và một chuyến đi cùng nhau. Tuy nhiên, tình yêu của họ vấp phải rào cản từ định kiến xã hội và cuộc chiến giành quyền nuôi con của Carol."],
      ["Secret Love", "2020", undefined, "A Secret Love là phim tài liệu của Netflix kể về chuyện tình có thật giữa Pat Henschel và Terry Donahue, hai người phụ nữ yêu nhau từ năm 1947 khi Terry còn là cầu thủ trong giải bóng chày nữ chuyên nghiệp Mỹ. Suốt gần bảy thập kỷ, họ phải giữ kín mối quan hệ đồng giới của mình trước gia đình và xã hội vì định kiến thời bấy giờ, chỉ được biết đến như những người bạn cùng sống. Phim theo chân những năm tháng cuối đời của cặp đôi khi họ quyết định công khai tình yêu thật sự và đối diện với phản ứng của người thân sau gần trọn đời gắn bó."],
      ["Love, Simon", "2018", undefined, "Phim kể về Simon Spier, một nam sinh trung học đang giấu kín việc mình là người đồng tính, và mối liên lạc bí mật qua email với một bạn học giấu tên cũng đang trong quá trình come out. Khi một người bạn cùng lớp phát hiện email và đe dọa tiết lộ bí mật, Simon buộc phải đối mặt với áp lực và nỗi sợ bị lộ danh tính. Phim theo chân hành trình Simon dần chấp nhận bản thân và công khai giới tính thật của mình với gia đình, bạn bè."],
      ["Disobedience", "2011", undefined, "Phim kể về Ronit, một phụ nữ Do Thái Chính thống giáo đã rời bỏ cộng đồng để sống ở New York, trở về London dự đám tang cha sau nhiều năm xa cách. Tại đây cô gặp lại Esti, người bạn thời thơ ấu mà cô từng có mối tình đồng giới, nay đã kết hôn với một giáo sĩ trong cộng đồng. Sự trở về của Ronit khơi lại những cảm xúc cũ giữa hai người, buộc cả hai phải đối mặt với xung đột giữa tình yêu và những quy tắc nghiêm ngặt của cộng đồng tôn giáo."],
      ["All Of Us Strangers", "2023", undefined, "Adam, một biên kịch sống cô độc tại London, bất ngờ gặp lại cha mẹ mình dù họ đã qua đời từ khi anh còn nhỏ, tại chính ngôi nhà thời thơ ấu. Cùng lúc đó, anh bắt đầu một mối quan hệ tình cảm với Harry, người hàng xóm bí ẩn sống trong cùng tòa chung cư gần như trống rỗng. Bộ phim đan xen giữa thực và ảo, khai thác nỗi cô đơn, ký ức và khao khát được thấu hiểu của một người đồng tính."],
      ["The Power Of The Dog", "2021", undefined, "Phil Burbank, một chủ trại gia súc khắc nghiệt và nam tính ở Montana thập niên 1920, tỏ ra khinh miệt khi anh trai mình cưới Rose, một góa phụ, và con trai bà. Sự căng thẳng gia tăng khi Phil dần có mối quan hệ phức tạp, khó lường với cậu con trai nhạy cảm của Rose. Bộ phim của Jane Campion từ từ hé lộ những bí mật và ham muốn bị kìm nén đằng sau vẻ ngoài cứng rắn của Phil."],
    ],
  },
  {
    t: "VII. Phim tình cảm",
    n: 30,
    items: [
      ["Pride & Prejudice", "2005", "Xem đi xem lại hoài không chán. Keira.", "Phim chuyển thể từ tiểu thuyết cùng tên của Jane Austen, kể về Elizabeth Bennet, một cô gái thông minh, sắc sảo trong gia đình có năm chị em gái ở vùng nông thôn nước Anh. Mối quan hệ giữa cô và Mr. Darcy, một quý ông giàu có nhưng kiêu ngạo, trải qua nhiều hiểu lầm và định kiến trước khi hai người nhận ra tình cảm thật sự dành cho nhau. Phim khắc họa các chuẩn mực hôn nhân và giai cấp trong xã hội Anh thế kỷ 19."],
      ["Becoming Jane", "2007", "True love in reality. McAvoy với Anne Hathaway :))", "Phim lấy cảm hứng từ giai đoạn đầu đời của nữ văn sĩ Jane Austen, kể về mối tình giữa bà và Tom Lefroy, một luật sư trẻ người Ireland. Dù tình cảm giữa hai người sâu đậm, sự chênh lệch về gia thế và hoàn cảnh kinh tế khiến họ không thể đến với nhau. Mối tình dang dở này được cho là nguồn cảm hứng cho những tác phẩm văn học nổi tiếng sau này của Jane Austen."],
      ["Marriage Story", "2019", "ScarJo với Adam Driver diễn chất quá.", "Phim kể về quá trình ly hôn đầy đau đớn giữa Charlie, một đạo diễn sân khấu, và Nicole, một diễn viên, khi cả hai từng có một cuộc hôn nhân hạnh phúc. Qua quá trình tranh chấp quyền nuôi con và phân chia tài sản, phim khắc họa những mâu thuẫn, tổn thương và cả tình cảm còn sót lại giữa hai người. Bộ phim cho thấy sự phức tạp của tình yêu và gia đình khi một cuộc hôn nhân tan vỡ."],
      ["Love, Rosie", "2014", "Niềm tin về tình yêu, anh giai Sam với chị gái Lily đẹp quá trời đất. Sách hay.", "Phim kể về Rosie và Alex, hai người bạn thân từ thuở nhỏ luôn có tình cảm với nhau nhưng liên tục bỏ lỡ cơ hội để bên nhau vì hoàn cảnh và những quyết định sai thời điểm. Qua nhiều năm, cả hai đều trải qua các mối quan hệ khác, có con cái và cuộc sống riêng, nhưng vẫn giữ liên lạc qua thư từ và email. Cuối cùng, sau nhiều biến cố, họ nhận ra tình cảm dành cho nhau chưa bao giờ phai nhạt."],
      ["Me Before You", "2016", "Emilia Clarke vs Sam Claflin ♥", "Phim kể về Louisa Clark, một cô gái vui vẻ, được thuê làm người chăm sóc cho Will Traynor, một cựu doanh nhân thành đạt bị liệt tứ chi sau tai nạn xe máy. Ban đầu Will tỏ ra lạnh lùng và bi quan về cuộc sống, nhưng qua thời gian ở bên Louisa, anh dần cởi mở và giữa hai người nảy sinh tình cảm. Tuy nhiên, quyết định của Will về việc kết thúc cuộc sống của mình đặt ra thử thách lớn cho mối quan hệ của họ."],
      ["The Notebook", "2004", "Sưng mắt.", "Phim kể về mối tình giữa Noah, một chàng trai nhà nghèo, và Allie, một tiểu thư nhà giàu, vào những năm 1940. Dù yêu nhau say đắm, họ bị gia đình Allie ngăn cản và phải chia lìa nhiều năm trước khi có cơ hội gặp lại. Câu chuyện được kể lại bởi một ông lão đọc cho một bà cụ mắc chứng mất trí nhớ nghe, dần hé lộ đó chính là câu chuyện tình yêu của chính họ."],
      ["Eternal Sunshine Of The Spotless Mind", "2004", undefined, "Phim kể về Joel, người phát hiện bạn gái cũ Clementine đã xóa toàn bộ ký ức về mối quan hệ của họ bằng một liệu pháp y khoa đặc biệt sau khi chia tay. Trong cơn đau khổ, Joel quyết định thực hiện thủ thuật tương tự để xóa ký ức về Clementine, nhưng trong quá trình xóa nhớ, anh nhận ra mình vẫn còn yêu cô và cố gắng giữ lại những kỷ niệm. Phim đan xen giữa hiện tại và những mảnh ký ức được tua ngược, khám phá ý nghĩa của tình yêu và mất mát."],
      ["500 Days Of Summer", "2009", "Hành trình lớn não của một thanh niên ất ơ.", "Phim kể về Tom, một chàng trai lãng mạn tin vào định mệnh, và mối quan hệ 500 ngày đầy thăng trầm của anh với Summer, một cô gái không tin vào tình yêu vĩnh cửu. Câu chuyện được kể theo trình tự phi tuyến tính, xen kẽ giữa những ngày hạnh phúc và những ngày đau khổ trong mối quan hệ của họ. Qua đó, phim khắc họa sự khác biệt trong quan niệm về tình yêu giữa hai người và quá trình Tom trưởng thành sau cuộc tình tan vỡ."],
      ["Before Sunrise", "1995", undefined, "Phim kể về Jesse, một chàng trai người Mỹ, và Céline, một cô gái người Pháp, tình cờ gặp nhau trên chuyến tàu xuyên châu Âu và cùng nhau xuống Vienna dạo chơi trong một đêm trước khi Jesse phải bay về Mỹ. Suốt đêm đó, hai người đi bộ khắp thành phố, trò chuyện về cuộc sống, tình yêu và những suy nghĩ sâu kín của bản thân. Trước khi chia tay vào sáng hôm sau, họ hẹn sẽ gặp lại nhau tại chính nơi đó sau sáu tháng."],
      ["Before Sunset", "2004", undefined, "Phim diễn ra chín năm sau sự kiện ở Vienna, khi Jesse, nay đã là một nhà văn, gặp lại Céline tại một hiệu sách ở Paris trong buổi ra mắt cuốn sách anh viết về đêm hôm đó. Với chỉ vài giờ trước khi Jesse phải ra sân bay, hai người cùng nhau dạo quanh Paris, ôn lại những gì đã xảy ra trong chín năm qua và nhận ra tình cảm giữa họ vẫn còn nguyên vẹn. Phim kết thúc mở, để lại câu hỏi liệu Jesse có kịp chuyến bay hay ở lại bên Céline."],
      ["Before Midnight", "2013", undefined, "Phim diễn ra chín năm sau Before Sunset, khi Jesse và Céline giờ đã là một cặp đôi với hai con gái sinh đôi, đang có kỳ nghỉ tại Hy Lạp. Qua một ngày dài trò chuyện cùng bạn bè và sau đó là một đêm riêng tư tại khách sạn, những căng thẳng, bất mãn tích tụ trong mối quan hệ dài hạn của họ dần bộc lộ. Phim khắc họa thực tế của tình yêu khi bước qua giai đoạn lãng mạn ban đầu để đối mặt với những va chạm của cuộc sống hôn nhân."],
      ["Stuck In Love", "2012", undefined, "Phim kể về gia đình nhà văn Borgens, gồm người cha Bill vẫn còn vương vấn vợ cũ dù cô đã có gia đình mới, cùng hai con Samantha và Rusty đang trải qua những mối tình đầu đời của riêng mình. Mỗi thành viên trong gia đình đều đang vật lộn với các vấn đề tình cảm và cố gắng tìm cách viết nên câu chuyện của chính mình. Phim đan xen các tuyến truyện tình yêu của ba cha con qua khoảng thời gian một năm, xoay quanh chủ đề viết lách và các mối quan hệ."],
      ["5 Centimeters Per Second", "2007", undefined, "Phim hoạt hình Nhật Bản kể về Takaki và Akari, hai người bạn thân từ thời tiểu học, nhưng dần bị chia cách bởi khoảng cách địa lý khi gia đình họ chuyển đi các nơi khác nhau. Phim được chia thành ba phần, theo dõi mối quan hệ của họ qua nhiều năm, từ tuổi thơ đến khi trưởng thành, khi tình cảm dần phai nhạt bởi thời gian và khoảng cách. Tựa phim lấy từ tốc độ rơi của những cánh hoa anh đào, ẩn dụ cho sự trôi qua chậm rãi nhưng không thể ngăn cản của thời gian và các mối quan hệ."],
      ["Begin Again", "2014", undefined, "Phim kể về Gretta, một nhạc sĩ trẻ vừa chia tay bạn trai, và Dan, một nhà sản xuất âm nhạc đang gặp khủng hoảng sự nghiệp và hôn nhân, tình cờ gặp nhau tại một quán bar ở New York. Bị ấn tượng bởi tài năng của Gretta, Dan đề nghị hợp tác sản xuất một album được thu âm ngay trên đường phố thành phố. Qua quá trình làm việc cùng nhau, cả hai dần tìm lại niềm đam mê âm nhạc và giúp nhau vượt qua những tổn thương cá nhân."],
      ["One Day", "2011", undefined, "Phim kể về Emma và Dexter, hai người quen nhau vào đêm tốt nghiệp đại học năm 1988, và theo dõi mối quan hệ của họ qua cùng một ngày 15 tháng 7 mỗi năm trong suốt hai mươi năm sau đó. Qua từng năm, cả hai trải qua những thăng trầm riêng trong sự nghiệp và tình yêu, có lúc gần gũi, có lúc xa cách nhau. Phim khắc họa hành trình dài để hai người bạn thân cuối cùng nhận ra tình yêu thực sự dành cho nhau."],
      ["If I Stay", "2014", undefined, "Phim kể về Mia, một nữ sinh tài năng chơi cello, rơi vào tình trạng hôn mê sau một vụ tai nạn xe hơi khiến cha mẹ cô thiệt mạng. Trong trạng thái xuất hồn, Mia chứng kiến gia đình và bạn bè, đặc biệt là bạn trai Adam, túc trực bên giường bệnh và hồi tưởng lại những kỷ niệm đã qua. Cô phải đưa ra lựa chọn giữa việc tiếp tục chiến đấu để sống hay buông xuôi theo sau những người thân đã mất."],
      ["Flipped", "2010", undefined, "Phim kể về Bryce và Juli, hai đứa trẻ hàng xóm với quan điểm trái ngược nhau kể từ ngày gặp gỡ năm lớp hai, khi Juli lập tức có cảm tình với Bryce còn cậu lại cố tránh xa cô. Qua nhiều năm trưởng thành, cảm xúc của cả hai dần thay đổi và đảo ngược vị trí cho nhau. Phim được kể qua góc nhìn luân phiên của cả Bryce và Juli, khắc họa quá trình họ dần hiểu và trân trọng nhau hơn."],
      ["The Fault In Our Stars", "2014", undefined, "Phim kể về Hazel, một cô gái mắc bệnh ung thư tuyến giáp di căn phổi, gặp gỡ Augustus, một chàng trai từng bị ung thư xương, tại một nhóm hỗ trợ bệnh nhân ung thư. Hai người nhanh chóng nảy sinh tình cảm và cùng nhau thực hiện chuyến đi đến Amsterdam để gặp tác giả cuốn sách yêu thích của Hazel. Mối tình của họ đối mặt với thử thách lớn khi bệnh tình của Augustus tái phát nghiêm trọng."],
      ["The Longest Ride", "2015", undefined, "Phim kể về hai câu chuyện tình yêu đan xen: một bên là Sophie, một sinh viên nghệ thuật, và Luke, một tay đua bò tót chuyên nghiệp, gặp nhau vào thời hiện đại; bên kia là câu chuyện tình yêu quá khứ của Ira và Ruth được kể lại qua những lá thư. Sophie và Luke tình cờ cứu Ira, một cụ ông sống sót sau tai nạn xe, và qua những lá thư của ông, họ tìm hiểu về mối tình đầy biến cố giữa ông và người vợ quá cố. Câu chuyện của Ira và Ruth trở thành nguồn cảm hứng giúp Sophie và Luke vượt qua những khác biệt trong mối quan hệ của chính họ."],
      ["The Spectacular Now", "2013", undefined, "Phim kể về Sutter, một nam sinh trung học sống buông thả và thường xuyên uống rượu, tình cờ gặp Aimee, một cô gái hiền lành, ít bạn bè, sau một đêm say xỉn. Mối quan hệ giữa hai người dần phát triển, với Aimee giúp Sutter nhìn nhận lại cuộc sống trong khi bản thân cô cũng trở nên tự tin hơn dưới ảnh hưởng của anh. Phim khắc họa những mặt tối trong tính cách của Sutter và tác động của nó đến mối quan hệ giữa hai người."],
      ["50 First Dates", "2004", undefined, "Phim kể về Henry, một bác sĩ thú y có tiếng là người sợ cam kết, gặp gỡ Lucy, người mắc chứng mất trí nhớ ngắn hạn khiến cô quên hết mọi chuyện xảy ra sau mỗi giấc ngủ. Vì Lucy không thể nhớ được Henry vào ngày hôm sau, anh phải tìm cách khiến cô yêu mình lại từ đầu mỗi ngày. Phim theo chân nỗ lực kiên trì của Henry để xây dựng một mối quan hệ lâu dài dù Lucy không thể lưu giữ ký ức."],
      ["The Great Gatsby", "2013", undefined, "Phim chuyển thể từ tiểu thuyết của F. Scott Fitzgerald, kể về Nick Carraway, người chuyển đến sống cạnh biệt thự của Jay Gatsby, một triệu phú bí ẩn nổi tiếng với những bữa tiệc xa hoa. Nick dần khám phá ra Gatsby vẫn còn say đắm Daisy Buchanan, người yêu cũ của anh nay đã kết hôn với Tom Buchanan, và toàn bộ khối tài sản của Gatsby được xây dựng nhằm giành lại tình yêu của cô. Câu chuyện dẫn đến bi kịch khi mối tình tay ba giữa Gatsby, Daisy và Tom vượt khỏi tầm kiểm soát."],
      ["Love Actually", "2003", undefined, "Phim đan xen nhiều câu chuyện tình yêu khác nhau diễn ra tại London trong khoảng thời gian trước Giáng sinh, với các nhân vật đa dạng từ thủ tướng nước Anh đến những người bình thường. Mỗi tuyến truyện khai thác một khía cạnh khác nhau của tình yêu, từ tình yêu lãng mạn, tình bạn cho đến tình cảm gia đình. Các câu chuyện dần hội tụ và kết thúc vào đêm Giáng sinh, mang đến một bức tranh tổng thể về tình yêu trong cuộc sống."],
      ["About Time", "2013", undefined, "Phim kể về Tim, một chàng trai phát hiện khả năng du hành thời gian được truyền lại từ những người đàn ông trong gia đình mình, và anh quyết định sử dụng khả năng này để tìm kiếm tình yêu. Tim gặp và theo đuổi Mary, dùng khả năng quay ngược thời gian để hoàn thiện những khoảnh khắc bên cô. Qua thời gian, Tim nhận ra dù có thể thay đổi quá khứ, điều quan trọng nhất vẫn là trân trọng những khoảnh khắc hiện tại bên gia đình và người mình yêu."],
      ["Lost In Translation", "2003", "Nợ vài dòng với phim này :)))", "Phim kể về Bob, một diễn viên gạo cội người Mỹ đến Tokyo quay quảng cáo, và Charlotte, một cô gái trẻ mới tốt nghiệp đại học đi cùng chồng đang làm việc tại Nhật. Cả hai đều cảm thấy lạc lõng và cô đơn nơi đất khách, họ tình cờ gặp nhau tại khách sạn và dần trở nên thân thiết. Qua những đêm cùng nhau khám phá Tokyo, giữa họ nảy sinh một mối liên kết tình cảm sâu sắc nhưng không rõ ràng trước khi phải chia xa."],
      ["Tro Tàn Rực Rỡ", "2022", "Chỉ còn tro rực rỡ thôi.", "Phim chuyển thể từ truyện ngắn của nhà văn Nguyễn Ngọc Tư, lấy bối cảnh một xóm nhỏ miền Tây sông nước, xoay quanh cuộc sống của hai cặp vợ chồng hàng xóm. Nhân vật Nhàn sống bên người chồng luôn ám ảnh bởi lửa sau một biến cố trong quá khứ, trong khi người hàng xóm Hậu âm thầm chịu đựng nỗi đau khi chồng mình vẫn còn vương vấn mối tình đầu. Phim khắc họa những nỗi cô đơn, chịu đựng âm thầm của người phụ nữ trong tình yêu và hôn nhân."],
      ["Marry My Dead Body", "2023", undefined, "Phim Đài Loan kể về một cảnh sát nam tính tình nóng nảy, vô tình nhặt được phong bao đỏ trong một đám cưới ma và bị ràng buộc phải kết hôn với hồn ma của một chàng trai đồng tính vừa qua đời. Sau khi kết hôn, anh phải hợp tác cùng linh hồn người chồng ma để tìm ra nguyên nhân cái chết của anh ta, đồng thời giúp linh hồn được siêu thoát. Qua quá trình đó, viên cảnh sát dần thay đổi định kiến và học cách thấu hiểu, chấp nhận cộng đồng LGBT."],
      ["A Sun", "2019", undefined, "Phim Đài Loan kể về một gia đình trung lưu với hai người con trai: A-Hao, người anh cả gương mẫu, và A-Ho, người em từng vào trại giáo dưỡng vì gây thương tích cho người khác. Bi kịch gia đình xảy ra liên tiếp khi A-Hao đột ngột qua đời, để lại người cha phải đối mặt với mối quan hệ rạn nứt với đứa con trai còn lại. Phim khắc họa hành trình hàn gắn đầy đau đớn của một gia đình sau những mất mát và bí mật chôn giấu."],
      ["Silver Linings Playbook", "2012", undefined, "Pat, một người đàn ông vừa xuất viện tâm thần sau khi hôn nhân đổ vỡ, trở về sống với cha mẹ và cố gắng giành lại vợ cũ. Anh gặp Tiffany, một góa phụ trẻ cũng đang vật lộn với những tổn thương tâm lý riêng, và giữa họ nảy sinh một mối liên kết bất ngờ qua các buổi tập khiêu vũ. Bộ phim là câu chuyện tình yêu ấm áp, hài hước về việc chữa lành và chấp nhận sự không hoàn hảo của nhau."],
      ["Meet Joe Black", "1998", undefined, "Thần Chết hóa thân vào cơ thể một chàng trai trẻ tên Joe Black để trải nghiệm cuộc sống con người, và được ông trùm truyền thông Bill Parrish đồng ý làm hướng dẫn viên đổi lấy thêm thời gian sống. Trong quá trình đó, Joe Black đem lòng yêu Susan, con gái của Bill, mà không biết cô cũng dần yêu lại anh. Bộ phim là câu chuyện tình lãng mạn, triết lý về tình yêu, cái chết và ý nghĩa của cuộc sống."],
    ],
  },
{
    t: "VIII. Hơi lộn xộn, nhưng hay",
    n: 64,
    items: [
      ["Grave Of The Fireflies", "1988", undefined, "Bộ phim hoạt hình Nhật Bản kể về hai anh em Seita và Setsuko cố gắng sinh tồn trong những ngày cuối Thế chiến II sau khi mẹ họ qua đời vì trận không kích. Bị người thân ruồng bỏ, hai đứa trẻ phải tự lo cho nhau giữa cảnh đói khát và tàn phá của chiến tranh. Phim khắc họa bi kịch chiến tranh qua góc nhìn trẻ thơ với cái kết đầy đau xót."],
      ["A Man Called Ove", "2015", undefined, "Ove là một người đàn ông góa vợ, khó tính và sống khép kín, nhiều lần tìm cách tự tử nhưng đều bị gián đoạn bởi những người hàng xóm mới chuyển đến. Cặp vợ chồng trẻ Parvaneh cùng gia đình dần bước vào cuộc sống của ông, khơi lại những kỷ niệm về người vợ đã khuất qua các đoạn hồi tưởng. Qua đó, bộ phim hé lộ quá khứ và lý do khiến Ove trở nên cô độc như hiện tại."],
      ["Big Fish", "2003", undefined, "Edward Bloom là người cha thích kể những câu chuyện phóng đại, kỳ ảo về cuộc đời mình cho con trai Will nghe từ nhỏ. Khi trưởng thành, Will hoài nghi và tìm cách khám phá sự thật đằng sau những câu chuyện ấy, nhất là khi cha mình đang hấp hối. Bộ phim đan xen giữa hiện thực và huyền thoại để khắc họa mối quan hệ cha con và ý nghĩa của việc kể chuyện."],
      ["Minari", "2021", "Phim đẹp.", "Một gia đình người Mỹ gốc Hàn chuyển đến sống tại một nông trại ở Arkansas để theo đuổi giấc mơ của người cha, Jacob, là trồng rau củ Hàn Quốc. Bà ngoại Soon-ja từ Hàn Quốc sang sống cùng gia đình, tạo nên mối quan hệ đặc biệt với cậu cháu trai nhỏ David. Phim khắc họa những khó khăn, mâu thuẫn và hy vọng của một gia đình nhập cư trên hành trình gây dựng cuộc sống mới."],
      ["Birdman", "2014", "Phim đẹp mà ngột ngạt với hành trình đi vào nội tâm và chiến đấu với bản ngã.", "Riggan Thomson, một diễn viên từng nổi tiếng với vai siêu anh hùng Birdman, cố gắng lấy lại danh tiếng bằng việc dàn dựng một vở kịch trên sân khấu Broadway. Trong quá trình đó, ông phải đối mặt với cái tôi, nỗi sợ thất bại và giọng nói ảo tưởng của nhân vật Birdman trong đầu mình. Phim được quay theo phong cách giả lập một cú máy liên tục, tạo cảm giác căng thẳng xuyên suốt."],
      ["Beautiful Boy", "2018", undefined, "Dựa trên hồi ký có thật, phim kể về David Sheff và hành trình đầy đau đớn khi chứng kiến con trai Nic nghiện methamphetamine. Nic nhiều lần cai nghiện rồi tái nghiện, đẩy mối quan hệ cha con vào vòng xoáy hy vọng rồi tuyệt vọng. Bộ phim khắc họa góc nhìn của cả người nghiện lẫn gia đình trong cuộc chiến với ma túy."],
      ["Her", "2013", undefined, "Theodore Twombly là một người đàn ông cô đơn, làm nghề viết thư thuê, đang trải qua giai đoạn hậu ly hôn. Anh cài đặt một hệ điều hành trí tuệ nhân tạo tên Samantha và dần nảy sinh tình cảm với \"cô\". Bộ phim đặt ra câu hỏi về bản chất của tình yêu, sự kết nối và cô đơn trong thời đại công nghệ."],
      ["The Usual Suspects", "1995", undefined, "Roger \"Verbal\" Kint, kẻ sống sót duy nhất sau một vụ nổ trên tàu, kể lại cho thám tử về chuỗi sự kiện dẫn đến thảm kịch. Câu chuyện xoay quanh một nhóm tội phạm bị ép buộc thực hiện phi vụ cho một trùm tội phạm bí ẩn tên Keyser Söze. Phim nổi tiếng với cái kết bất ngờ lật ngược toàn bộ những gì khán giả vừa chứng kiến."],
      ["First Cow", "2019", "Cứ nghĩ tới Của Chuột Và Người.", "Câu chuyện lấy bối cảnh vùng biên giới Oregon thế kỷ 19, xoay quanh tình bạn giữa đầu bếp hiền lành Cookie và người nhập cư gốc Hoa King-Lu. Hai người nảy ra ý tưởng kinh doanh bánh ngọt bằng cách lén vắt sữa từ con bò duy nhất, thuộc sở hữu của một người giàu có trong vùng. Công việc làm ăn mang lại thành công ban đầu nhưng cũng kéo theo rủi ro khi bị phát hiện."],
      ["The Favourite", "2018", undefined, "Bối cảnh nước Anh đầu thế kỷ 18, dưới triều đại Nữ hoàng Anne, người có sức khỏe yếu và tính khí thất thường. Lady Sarah, người bạn thân đồng thời là cố vấn quyền lực của nữ hoàng, phải cạnh tranh ảnh hưởng khi Abigail, một người hầu sa cơ, dần lấy lòng nữ hoàng. Bộ phim khắc họa cuộc đấu tranh quyền lực đầy mưu mô trong cung đình."],
      ["Pan's Labyrinth", "2006", "Dark fairytale, đẹp và buồn.", "Bối cảnh Tây Ban Nha thời hậu nội chiến, cô bé Ofelia theo mẹ đến sống cùng người cha dượng là một sĩ quan quân đội tàn bạo. Để trốn tránh thực tại khắc nghiệt, Ofelia bước vào một mê cung huyền bí và gặp gỡ các sinh vật thần thoại, được giao những thử thách để chứng minh mình là công chúa của vương quốc ngầm. Phim đan xen giữa thế giới cổ tích u tối và hiện thực chiến tranh tàn khốc."],
      ["The Lobster", "2015", "Lộn hết cả não.", "Trong một xã hội giả tưởng, những người độc thân bị đưa vào một khách sạn và phải tìm được bạn đời trong vòng 45 ngày, nếu không sẽ bị biến thành một loài động vật theo lựa chọn của họ. David, nhân vật chính, phải tìm cách thích nghi với luật lệ kỳ quặc này sau khi vừa ly hôn. Bộ phim châm biếm các chuẩn mực xã hội về tình yêu và hôn nhân qua lăng kính phi lý, u ám."],
      ["Điều Kỳ Diệu Ở Phòng Giam Số 7", "2013", undefined, "Lee Yong-gu, một người cha thiểu năng trí tuệ, bị kết án oan tội giết hại con gái một quan chức cảnh sát. Trong tù, các bạn tù ở phòng giam số 7 cảm thông với hoàn cảnh của anh và bí mật giúp đưa con gái nhỏ Ye-seung vào thăm cha. Bộ phim là câu chuyện cảm động về tình phụ tử và sự bất công của hệ thống pháp luật."],
      ["Changeling", "2008", undefined, "Dựa trên câu chuyện có thật những năm 1920, Christine Collins, một bà mẹ đơn thân ở Los Angeles, báo cảnh sát về việc con trai mất tích. Khi cảnh sát trả về một cậu bé không phải con mình, cô kiên quyết phản đối và bị chính quyền coi là mất trí, thậm chí bị đưa vào bệnh viện tâm thần. Bộ phim phơi bày sự tha hóa của cảnh sát Los Angeles thời đó qua hành trình đấu tranh đòi công lý của người mẹ."],
      ["Boyhood", "2014", "Nhẹ nhàng, bình yên.", "Bộ phim được quay trong suốt 12 năm với cùng một dàn diễn viên, ghi lại quá trình trưởng thành của cậu bé Mason từ sáu tuổi đến khi vào đại học. Song song đó là những biến động trong gia đình có bố mẹ ly hôn, các cuộc hôn nhân mới của mẹ và những lần chuyển nhà, chuyển trường. Phim khắc họa chân thực dòng chảy thời gian và sự trưởng thành qua những chi tiết đời thường."],
      ["A River Runs Through It", "1992", undefined, "Bối cảnh bang Montana đầu thế kỷ 20, phim kể về hai anh em Norman và Paul Maclean, con trai một mục sư, lớn lên gắn bó với môn câu cá bằng ruồi (fly fishing). Norman là người điềm đạm, chọn con đường học vấn ổn định, trong khi Paul phóng khoáng, ham mê cờ bạc và dần lún sâu vào rắc rối. Bộ phim là hồi tưởng về tình anh em, gia đình và mất mát qua dòng sông quê hương."],
      ["Malèna", "2000", undefined, "Bối cảnh một thị trấn nhỏ ở Sicily trong Thế chiến II, cậu bé Renato say mê ngắm nhìn Malèna, người phụ nữ xinh đẹp có chồng đang ra trận. Trong lúc chồng vắng mặt, Malèna trở thành mục tiêu dị nghị, ghen ghét của dân làng, đặc biệt là những người phụ nữ trong thị trấn. Bộ phim khắc họa sự tàn nhẫn của định kiến xã hội đối với một người phụ nữ đơn độc, qua góc nhìn ngây thơ của cậu bé đang lớn."],
      ["Salt", "2010", undefined, "Evelyn Salt là một điệp viên CIA bị một người đào tẩu Nga tố cáo là điệp viên nằm vùng, được cài vào để ám sát tổng thống Nga. Bị đồng đội truy đuổi, cô buộc phải bỏ trốn để tìm cách chứng minh mình vô tội và bảo vệ người chồng của mình. Bộ phim hành động gián điệp dẫn dắt khán giả qua nhiều pha phản chuyển bất ngờ về thân phận thật của Salt."],
      ["Loving Vincent", "2017", undefined, "Đây là bộ phim hoạt hình đầu tiên trên thế giới được vẽ hoàn toàn bằng sơn dầu, mô phỏng phong cách tranh của Vincent van Gogh. Nhân vật chính Armand Roulin được giao nhiệm vụ trao một lá thư cuối cùng của Van Gogh, từ đó anh bắt đầu điều tra về cái chết bí ẩn của danh họa. Bộ phim vừa là lời tri ân nghệ thuật, vừa đặt ra nghi vấn về nguyên nhân thực sự khiến Van Gogh qua đời."],
      ["A Star Is Born", "2018", undefined, "Jackson Maine, một ngôi sao nhạc đồng quê đang trên đà sa sút vì rượu và ma túy, tình cờ phát hiện tài năng của ca sĩ trẻ Ally tại một quán bar. Anh đưa cô bước vào sự nghiệp âm nhạc, hai người nảy sinh tình yêu trong khi sự nghiệp của Ally thăng hoa còn của Jackson tiếp tục lao dốc. Bộ phim kết thúc bi kịch khi Jackson không vượt qua được cuộc chiến với chứng nghiện và trầm cảm."],
      ["The Breakfast Club", "1985", undefined, "Năm học sinh trung học thuộc các nhóm bạn hoàn toàn khác nhau — mọt sách, vận động viên, công chúa, kẻ nổi loạn và người lập dị — cùng bị phạt ở lại trường vào một ngày thứ Bảy. Ban đầu xa cách và định kiến về nhau, họ dần cởi mở chia sẻ những vấn đề cá nhân và áp lực gia đình trong suốt buổi phạt. Bộ phim trở thành biểu tượng của dòng phim tuổi teen Mỹ thập niên 1980."],
      ["A League Of Their Own", "1992", undefined, "Bối cảnh Thế chiến II, khi nhiều cầu thủ bóng chày nam nhập ngũ, một giải bóng chày nữ chuyên nghiệp được thành lập tại Mỹ. Hai chị em Dottie và Kit cùng gia nhập giải đấu nhưng lại chơi cho hai đội đối thủ, dẫn đến sự cạnh tranh trong chính gia đình. Huấn luyện viên Jimmy Dugan, một cựu cầu thủ sa sút vì rượu, dần tìm lại động lực khi dẫn dắt đội bóng nữ."],
      ["The Perks Of Being A Wallflower", "2012", "Phim sách gì cũng hay. Nên đọc lúc khủng hoảng tuổi 17 ấy :)))", "Charlie là một cậu học sinh năm nhất trung học nhút nhát, mang trong mình những tổn thương tâm lý từ quá khứ. Cậu kết bạn với hai anh chị năm cuối là Sam và Patrick, những người giúp cậu mở lòng và trải nghiệm tuổi trẻ theo cách chân thật hơn. Bộ phim là câu chuyện trưởng thành pha lẫn nỗi đau, tình bạn và quá trình chữa lành."],
      ["The Tree Of Life", "2011", undefined, "Bộ phim theo dòng hồi tưởng của Jack, một người đàn ông trung niên, về tuổi thơ của mình trong một gia đình ở Texas thập niên 1950 với người cha nghiêm khắc và người mẹ dịu dàng. Đan xen với câu chuyện gia đình là những hình ảnh mang tính vũ trụ về sự hình thành sự sống và thế giới. Phim mang phong cách suy tưởng, ít thoại, đặt ra những câu hỏi triết học về sự sống, cái chết và đức tin."],
      ["The Handmaiden", "2016", undefined, "Bối cảnh Triều Tiên dưới thời Nhật thuộc, Sook-hee được một tên lừa đảo thuê làm hầu gái cho tiểu thư giàu có Hideko nhằm giúp hắn cưới và chiếm đoạt tài sản của cô. Trong quá trình sống gần nhau, Sook-hee và Hideko dần nảy sinh tình cảm vượt ra ngoài kế hoạch ban đầu. Bộ phim có cấu trúc nhiều lớp với các cú twist bất ngờ, phơi bày âm mưu và sự phản bội giữa các nhân vật."],
      ["Dunkirk", "2017", undefined, "Bộ phim tái hiện cuộc di tản của quân đội Đồng minh khỏi bãi biển Dunkirk, Pháp, khi bị quân Đức bao vây trong Thế chiến II. Câu chuyện được kể qua ba tuyến thời gian song song trên bộ, trên biển và trên không, hội tụ vào cùng một sự kiện. Phim tập trung vào cảm giác căng thẳng, sinh tồn hơn là những màn đối thoại hay phát triển nhân vật truyền thống."],
      ["Lucy", "2014", "Kind of fun fiction story. Thích cái ý 10% used brain dù nó không hẳn đúng. Khi hiểu kiểu ẩn dụ: khi ta tăng mức nhận biết thế giới, ta cảm thụ nhiều hơn — giống đạo Phật, khi ta càng quay vào sâu bên trong, cái vô minh dần bị xóa, ta minh triết hơn và cảm thụ nhiều hơn.", "Lucy, một cô gái người Mỹ ở Đài Loan, vô tình bị ép trở thành người vận chuyển một loại ma túy tổng hợp mới. Khi túi ma túy trong bụng bị vỡ, chất này khiến não bộ của cô được kích hoạt vượt xa giới hạn bình thường, mang lại những khả năng phi thường. Bộ phim hành động khoa học viễn tưởng xây dựng trên giả thuyết (không có cơ sở khoa học) rằng con người chỉ sử dụng 10% năng lực não bộ."],
      ["Emma", "2020", "Góc máy rộng, phim đẹp, do mình hay ưu ái kiểu cổ trang Anh này nọ :v", "Chuyển thể từ tiểu thuyết của Jane Austen, phim kể về Emma Woodhouse, một tiểu thư trẻ tuổi, thông minh nhưng có phần kiêu ngạo, tự cho mình tài mai mối. Những kế hoạch se duyên của cô cho bạn bè liên tục gây ra hiểu lầm và rắc rối trong thị trấn nhỏ nước Anh thời Nhiếp chính. Cuối cùng, chính Emma cũng nhận ra tình cảm thật của mình dành cho người bạn lâu năm, ông Knightley."],
      ["Lady Macbeth", "2016", "F. Pugh diễn xuất thần thiệt sự.", "Bối cảnh nước Anh thế kỷ 19, Katherine bị gả vào một cuộc hôn nhân không tình yêu với một người đàn ông lớn tuổi và gia đình chồng hà khắc. Khi chồng vắng nhà, cô nảy sinh mối quan hệ với một người làm công trong trang trại, và dần trở nên tàn nhẫn để bảo vệ tự do mới tìm được. Bộ phim khắc họa sự biến chuyển đáng sợ của một người phụ nữ bị áp bức thành kẻ sẵn sàng gây tội ác."],
      ["Mary Queen Of Scots", "2018", "Saoirse.", "Bộ phim kể về cuộc đối đầu giữa Mary Stuart, Nữ hoàng Scotland, và người chị em họ Elizabeth I, Nữ hoàng Anh, trong cuộc tranh giành ngai vàng nước Anh. Mary trở về Scotland sau khi chồng qua đời và phải đối mặt với âm mưu chính trị từ giới quý tộc lẫn từ chính Elizabeth. Bộ phim khai thác góc nhìn về quyền lực, giới tính và số phận bi kịch của hai nữ hoàng."],
      ["Mulholland Drive", "2001", undefined, "Bộ phim mở đầu với Rita, một phụ nữ mất trí nhớ sau vụ tai nạn xe hơi trên đường Mulholland Drive, được Betty, một diễn viên trẻ đầy tham vọng mới đến Hollywood, giúp đỡ. Hai người cùng nhau điều tra để tìm lại danh tính thật của Rita, trong khi câu chuyện dần trở nên siêu thực và khó nắm bắt. Bộ phim nổi tiếng với cấu trúc phi tuyến tính, đầy ẩn dụ, đặt ra nhiều cách diễn giải khác nhau về ranh giới giữa giấc mơ và thực tại."],
      ["The Worst Person In The World", "2021", undefined, "Bộ phim Na Uy theo chân Julie, một phụ nữ ở độ tuổi gần 30 loay hoay tìm kiếm bản thân giữa sự nghiệp, tình yêu và những kỳ vọng xã hội. Cô trải qua mối quan hệ với Aksel, một họa sĩ truyện tranh lớn tuổi hơn, rồi đến Eivind, một chàng trai trẻ hơn, mỗi mối quan hệ phản chiếu một giai đoạn khác nhau trong quá trình trưởng thành của cô. Phim được kể theo cấu trúc các chương, khắc họa chân thực những băn khoăn của thế hệ trẻ hiện đại."],
      ["Drive My Car", "2021", undefined, "Dựa trên truyện ngắn của Haruki Murakami, phim kể về Yusuke Kafuku, một đạo diễn kiêm diễn viên sân khấu đang chịu nỗi đau mất vợ với nhiều bí mật chưa được giải tỏa. Khi đến Hiroshima dàn dựng vở kịch Uncle Vanya, ông được giao một tài xế riêng là cô gái trẻ Misaki, người dần trở thành người đồng hành giúp ông đối diện với quá khứ. Bộ phim chậm rãi khai thác chủ đề mất mát, sự tha thứ và kết nối giữa con người."],
      ["The Place Beyond The Pines", "2012", undefined, "Luke, một tay đua mô tô lưu diễn, phát hiện mình có con trai với người tình cũ và quyết định cướp ngân hàng để có tiền chu cấp cho gia đình. Trong một vụ cướp, anh chạm trán với Avery, một cảnh sát trẻ mới vào nghề, dẫn đến hậu quả nghiêm trọng thay đổi cuộc đời cả hai. Bộ phim chia làm ba phần, mở rộng câu chuyện sang thế hệ con cái của hai người đàn ông nhiều năm sau đó."],
      ["Palm Springs", "2020", undefined, "Nyles và Sarah gặp nhau trong một đám cưới ở Palm Springs, nhưng cả hai vô tình bị mắc kẹt trong một vòng lặp thời gian, phải sống đi sống lại cùng một ngày. Ban đầu Nyles đã quen với vòng lặp và sống buông thả, nhưng khi Sarah cũng bị cuốn vào, hai người cùng nhau tìm cách thoát ra. Bộ phim hài lãng mạn pha khoa học viễn tưởng khai thác chủ đề về sự trốn tránh và chấp nhận cuộc sống."],
      ["Never Rarely Sometimes Always", "2020", undefined, "Autumn, một nữ sinh trung học ở vùng nông thôn Pennsylvania, phát hiện mình mang thai ngoài ý muốn. Vì không thể phá thai hợp pháp ở quê nhà nếu không có sự đồng ý của phụ huynh, cô cùng người chị họ Skylar bí mật đến New York để tìm sự trợ giúp y tế. Bộ phim khắc họa chân thực, lặng lẽ những khó khăn mà các cô gái trẻ phải đối mặt khi tiếp cận dịch vụ chăm sóc sức khỏe sinh sản."],
      ["The World To Come", "2020", undefined, "Bối cảnh vùng nông thôn nước Mỹ thế kỷ 19, Abigail, một người vợ nông dân đang chịu nỗi đau mất con, kết bạn với Tallie, người hàng xóm mới chuyển đến. Mối quan hệ giữa hai người phụ nữ dần trở nên thân mật và sâu sắc, được kể lại qua những trang nhật ký của Abigail. Bộ phim khắc họa đời sống khắc nghiệt, cô lập của phụ nữ nông thôn thời kỳ đó và tình cảm bị kìm nén giữa họ."],
      ["My Octopus Teacher", "2020", undefined, "Bộ phim tài liệu ghi lại hành trình của nhà làm phim Craig Foster khi ông lặn biển hằng ngày trong rừng tảo bẹ ở Nam Phi và tình cờ gặp một con bạch tuộc hoang dã. Trong suốt một năm, ông dần xây dựng mối quan hệ gắn bó đặc biệt với con bạch tuộc, quan sát tập tính và cuộc sống của nó. Bộ phim là câu chuyện cảm động về mối liên kết giữa con người và thiên nhiên."],
      ["Somewhere", "2010", undefined, "Johnny Marco là một nam diễn viên nổi tiếng sống cuộc đời buông thả, trống rỗng tại khách sạn Chateau Marmont ở Los Angeles. Khi con gái Cleo bất ngờ đến ở cùng anh một thời gian, Johnny dần nhìn lại lối sống của mình qua những khoảnh khắc bên con. Bộ phim có nhịp điệu chậm rãi, ít thoại, khắc họa sự cô đơn phía sau ánh hào quang của giới nghệ sĩ."],
      ["I Am Sam", "2001", undefined, "Sam Dawson là một người cha thiểu năng trí tuệ, một mình nuôi dưỡng con gái Lucy từ khi cô bé mới sinh. Khi Lucy lớn dần và có nguy cơ vượt qua khả năng nhận thức của cha, các cơ quan chức năng tìm cách tước quyền nuôi con của anh. Sam được nữ luật sư Rita nhận bào chữa miễn phí, cùng anh đấu tranh pháp lý để giữ quyền làm cha."],
      ["Under The Skin", "2013", undefined, "Một sinh vật ngoài hành tinh mang hình dạng người phụ nữ (Scarlett Johansson thủ vai) lái xe khắp vùng Scotland để dụ dỗ những người đàn ông cô đơn. Những người đàn ông này bị đưa đến một không gian siêu thực và biến mất không dấu vết, phục vụ một mục đích bí ẩn chưa được giải thích rõ ràng. Bộ phim khoa học viễn tưởng mang phong cách nghệ thuật, ít thoại, khai thác góc nhìn xa lạ về loài người qua con mắt của kẻ ngoài hành tinh."],
      ["CODA", "2021", undefined, "Ruby là thành viên nghe được duy nhất trong một gia đình có cha mẹ và anh trai đều là người khiếm thính, làm nghề đánh cá. Cô phát hiện niềm đam mê ca hát và được thầy giáo khuyến khích thi vào trường âm nhạc, nhưng gia đình lại phụ thuộc vào cô để làm phiên dịch trong công việc đánh bắt cá. Bộ phim khai thác sự giằng xé giữa ước mơ cá nhân và trách nhiệm với gia đình của Ruby."],
      ["Still Alice", "2014", undefined, "Alice Howland là một giáo sư ngôn ngữ học thành đạt, bất ngờ được chẩn đoán mắc bệnh Alzheimer khởi phát sớm ở tuổi 50. Bộ phim theo dõi quá trình suy giảm trí nhớ và nhận thức của Alice, cùng những tác động lên mối quan hệ với chồng và các con. Phim khắc họa chân thực sự mất mát dần dần về bản sắc cá nhân khi đối mặt với căn bệnh."],
      ["When Harry Met Sally", "1989", undefined, "Harry và Sally gặp nhau lần đầu khi cùng đi chung xe đến New York sau khi tốt nghiệp đại học, và không có thiện cảm với nhau. Qua nhiều năm, họ tình cờ gặp lại nhiều lần, dần trở thành bạn thân trong khi vẫn tranh luận liệu nam và nữ có thể chỉ là bạn bè hay không. Bộ phim hài lãng mạn kinh điển kết thúc khi tình bạn giữa họ chuyển thành tình yêu."],
      ["Collateral Beauty", "2016", undefined, "Howard, một giám đốc quảng cáo thành đạt, rơi vào khủng hoảng và sống thu mình sau khi con gái qua đời. Để giúp anh vượt qua, các đồng nghiệp thuê ba diễn viên đóng giả thành Tình Yêu, Thời Gian và Cái Chết — những khái niệm Howard từng viết thư chất vấn — để đối thoại trực tiếp với anh. Bộ phim pha trộn giữa kịch tính cảm xúc và yếu tố siêu thực để nói về quá trình chữa lành nỗi đau mất mát."],
      ["Coco", "2017", undefined, "Miguel là một cậu bé người Mexico đam mê âm nhạc, nhưng gia đình cậu đã cấm nhạc suốt nhiều thế hệ vì một biến cố trong quá khứ. Trong đêm lễ hội Día de los Muertos, cậu vô tình lạc vào Xứ sở người chết và phải tìm ra bí mật thật sự về người tổ tiên đã lập ra ban nhạc gia đình. Bộ phim hoạt hình của Pixar tôn vinh văn hóa Mexico và giá trị của tình thân, ký ức."],
      ["The Secret Life Of Pets", "2016", undefined, "Bộ phim hoạt hình kể về cuộc sống bí mật của các thú cưng trong một chung cư ở New York khi chủ nhân của chúng đi vắng. Max, chú chó cưng của Katie, phải học cách chấp nhận Duke, một chú chó lớn mới được nhận nuôi, và hai chú vô tình lạc vào cuộc phiêu lưu ngoài đường phố. Bộ phim mang màu sắc hài hước, gia đình, xoay quanh tình bạn và sự chấp nhận khác biệt."],
      ["Closer", "2004", undefined, "Bộ phim xoay quanh bốn nhân vật ở London — nhà văn Dan, người mẫu Alice, nhiếp ảnh gia Anna và bác sĩ Larry — với các mối quan hệ tình cảm đan xen và phản bội lẫn nhau. Qua nhiều năm, các cặp đôi hình thành, tan vỡ rồi hoán đổi, phơi bày sự dối trá và tổn thương ẩn sau tình yêu. Bộ phim nổi bật với các đoạn đối thoại sắc bén, trần trụi về bản chất của các mối quan hệ hiện đại."],
      ["No Country For Old Men", "2007", undefined, "Llewelyn Moss tình cờ phát hiện một vụ mua bán ma túy thất bại và lấy đi số tiền lớn còn sót lại tại hiện trường. Hành động này khiến anh bị Anton Chigurh, một sát thủ máu lạnh, truy đuổi ráo riết trên khắp vùng biên giới Texas. Song song đó là góc nhìn của cảnh sát trưởng già Ed Tom Bell, người bất lực chứng kiến sự tàn bạo ngày càng leo thang của tội ác."],
      ["BlacKkKlansman", "2018", undefined, "Dựa trên câu chuyện có thật, Ron Stallworth là sĩ quan cảnh sát da đen đầu tiên của sở cảnh sát Colorado Springs, quyết định thâm nhập tổ chức Ku Klux Klan qua điện thoại. Vì không thể trực tiếp gặp mặt, anh nhờ đồng nghiệp da trắng Flip Zimmerman đóng giả làm \"Ron\" để tiếp xúc trực tiếp với các thành viên KKK. Bộ phim của Spike Lee kết hợp yếu tố hài, giật gân để phơi bày nạn phân biệt chủng tộc tại Mỹ."],
      ["The Shape Of Water", "2018", undefined, "Elisa là một phụ nữ câm làm lao công tại một cơ sở nghiên cứu bí mật của chính phủ Mỹ trong thời Chiến tranh Lạnh. Cô phát hiện một sinh vật lưỡng cư kỳ lạ đang bị giam giữ và thí nghiệm tại đây, rồi dần nảy sinh tình cảm với sinh vật này. Elisa cùng vài người bạn lên kế hoạch giải cứu sinh vật trước khi nó bị các nhà khoa học quân đội sát hại."],
      ["Blade Runner 2049", "2017", undefined, "K là một blade runner thuộc thế hệ replicant mới, có nhiệm vụ săn lùng và loại bỏ những replicant cũ còn sót lại. Trong một nhiệm vụ, anh phát hiện một bí mật chấn động có thể làm đảo lộn trật tự xã hội giữa con người và replicant. Cuộc điều tra đưa anh đến việc tìm kiếm Rick Deckard, cựu blade runner đã mất tích suốt nhiều thập kỷ."],
      ["Ocean's 8", "2018", undefined, "Debbie Ocean, em gái của tên trộm huyền thoại Danny Ocean, vừa ra tù và lên kế hoạch cho một phi vụ trộm cắp táo bạo. Cô tập hợp một đội ngũ toàn nữ giới với các chuyên môn khác nhau nhằm đánh cắp một chiếc vòng cổ kim cương trị giá hàng triệu đô tại sự kiện Met Gala. Bộ phim là câu chuyện hành động hài hước về một phi vụ trộm cắp được lên kế hoạch tỉ mỉ."],
      ["Joker", "2019", undefined, "Arthur Fleck là một diễn viên hài thất bại, sống cùng mẹ già và mắc chứng rối loạn khiến anh bật cười không kiểm soát trong những tình huống không phù hợp. Bị xã hội Gotham ruồng bỏ, bắt nạt và ngày càng cô lập, Arthur dần trượt vào con đường bạo lực và mất kiểm soát tâm lý. Bộ phim khắc họa quá trình biến chuyển của Arthur thành gã hề tội phạm khét tiếng Joker."],
      ["Tár", "2022", undefined, "Lydia Tár là nữ nhạc trưởng đầu tiên của một dàn nhạc giao hưởng danh tiếng ở Đức, đang ở đỉnh cao sự nghiệp và chuẩn bị thu âm bản giao hưởng quan trọng. Những cáo buộc về việc lạm dụng quyền lực với các nhạc công trẻ trong quá khứ dần lộ diện và đe dọa phá hủy danh tiếng của bà. Bộ phim khắc họa sự sụp đổ của một nhân vật quyền lực khi đối mặt với hậu quả từ những hành vi trong quá khứ."],
      ["The Irishman", "2019", undefined, "Bộ phim theo chân Frank Sheeran, một tài xế xe tải trở thành sát thủ cho tổ chức mafia, người có mối quan hệ thân thiết với thủ lĩnh nghiệp đoàn Jimmy Hoffa. Qua nhiều thập kỷ, Frank phải đối mặt với những lựa chọn đạo đức khắc nghiệt khi lòng trung thành với tổ chức xung đột với tình bạn của ông. Phim của Martin Scorsese là bản tổng kết suy tư về cái giá của bạo lực, quyền lực và sự cô đơn tuổi già."],
      ["Under The Silver Lake", "2018", undefined, "Sam, một gã thanh niên thất nghiệp, lang thang khắp Los Angeles để tìm kiếm cô hàng xóm xinh đẹp bỗng dưng biến mất không dấu vết. Hành trình truy tìm đưa anh vào một mạng lưới âm mưu kỳ quái, những biểu tượng ẩn giấu và các nhân vật bí ẩn của thành phố. Bộ phim pha trộn giữa trinh thám noir và giấc mơ hoang tưởng, khắc họa nỗi ám ảnh của một thế hệ trẻ lạc lối giữa văn hóa đại chúng."],
      ["The Banshees Of Inisherin", "2022", undefined, "Pádraic và Colm là đôi bạn thân lâu năm sống trên một hòn đảo hẻo lánh ở Ireland, cho đến một ngày Colm đột ngột tuyên bố chấm dứt tình bạn mà không rõ lý do. Khi Pádraic cố gắng hàn gắn, Colm đưa ra một lời đe dọa cực đoan để buộc anh phải từ bỏ. Bộ phim là câu chuyện hài kịch đen pha bi kịch về tình bạn tan vỡ, sự cô đơn và cái giá của lòng tự trọng."],
      ["Vertigo", "1958", undefined, "Scottie, một cựu thám tử cảnh sát mắc chứng sợ độ cao, được thuê để theo dõi Madeleine, người vợ có hành vi kỳ lạ của một người bạn cũ. Anh dần đem lòng yêu Madeleine, nhưng một bi kịch bất ngờ xảy ra khiến Scottie rơi vào ám ảnh khi gặp một phụ nữ khác trông giống hệt cô. Kiệt tác của Alfred Hitchcock là câu chuyện trinh thám tâm lý đầy ám ảnh về tình yêu, sự ám ảnh và bản dạng."],
      ["Magnolia", "1999", undefined, "Bộ phim đan xen nhiều câu chuyện của các nhân vật khác nhau tại thung lũng San Fernando, California, cùng chịu đựng nỗi cô đơn, mặc cảm tội lỗi và những vết thương gia đình chưa lành. Các tuyến truyện tưởng chừng rời rạc dần hé lộ những mối liên kết bất ngờ giữa các nhân vật qua một ngày định mệnh. Đạo diễn Paul Thomas Anderson kết hợp nhiều mảnh đời riêng lẻ thành một bức tranh sử thi đầy cảm xúc về sự tha thứ và trùng hợp của số phận."],
      ["Poor Things", "2023", undefined, "Bella Baxter, một phụ nữ trẻ được nhà khoa học kỳ lạ Godwin Baxter hồi sinh bằng cách cấy ghép não của đứa trẻ cô đang mang thai vào chính mình, bắt đầu khám phá thế giới với tâm trí ngây thơ như một đứa trẻ. Bella lên đường phiêu lưu khắp châu Âu, trải nghiệm tự do, dục vọng và tư duy độc lập ngoài mọi ràng buộc xã hội. Bộ phim của Yorgos Lanthimos là một câu chuyện kỳ ảo, táo bạo về sự giải phóng bản thân và nữ quyền."],
      ["The Matrix", "1999", undefined, "Neo, một lập trình viên máy tính, phát hiện ra rằng thế giới thực anh đang sống chỉ là một mô phỏng máy tính khổng lồ do trí tuệ nhân tạo tạo ra để kiểm soát loài người. Anh gia nhập một nhóm nổi dậy do Morpheus dẫn dắt để chiến đấu chống lại hệ thống Ma Trận và giải phóng nhân loại. Bộ phim cách mạng hóa kỹ xảo hành động điện ảnh và đặt ra những câu hỏi triết học sâu sắc về thực tại và tự do ý chí."],
      ["F1", "2025", undefined, "Sonny Hayes, một cựu tay đua Công thức 1 đầy tài năng nhưng dang dở sự nghiệp, được mời trở lại đường đua để giúp đỡ một đội đua đang gặp khó khăn cùng tay đua trẻ đầy tham vọng. Cùng nhau, họ phải vượt qua khác biệt thế hệ và áp lực để đưa đội đua trở lại đỉnh cao. Bộ phim với sự tham gia của Brad Pitt mang đến những cảnh đua xe tốc độ cao chân thực và kịch tính."],
      ["The Aviator", "2005", undefined, "Phim tái hiện cuộc đời Howard Hughes, nhà làm phim kiêm doanh nhân hàng không triệu phú nước Mỹ đầu thế kỷ 20. Ông theo đuổi tham vọng chinh phục cả ngành điện ảnh Hollywood lẫn ngành hàng không, đạt được nhiều thành tựu đột phá. Song song đó, phim cũng khắc họa cuộc chiến nội tâm của Hughes với chứng rối loạn ám ảnh cưỡng chế ngày càng trầm trọng."],
    ],
  },
{
    t: "IX. Không biết xếp vô list gì nữa :3 (2)",
    n: 66,
    items: [
      ["Harry Potter / Friends / Big Bang Theory / Hunger Games / GoT...", "series", undefined, "Đây là danh sách gộp những tác phẩm giải trí yêu thích không thuộc riêng một thể loại nào, gồm loạt phim phù thủy Harry Potter, sitcom kinh điển của Mỹ Friends, sitcom hài hước xoay quanh nhóm bạn mọt vật lý The Big Bang Theory, loạt phim giả tưởng phản địa đàng The Hunger Games và series sử thi giả tưởng Game of Thrones. Các tác phẩm này trải dài từ điện ảnh đến truyền hình, từ phép thuật, hài kịch đời thường cho đến những cuộc chiến sinh tồn và tranh giành quyền lực. Điểm chung là đều mang lại cảm giác giải trí, gắn bó lâu dài với người xem qua nhiều mùa hoặc nhiều phần phim."],
      ["Mr & Mrs Smith / Maleficent / The Tourist / By The Sea...", "misc", undefined, "Đây là nhóm phim được gộp chung vì đều có yếu tố ngôi sao và thể loại giải trí hấp dẫn, gồm Mr & Mrs Smith – phim hành động hài về cặp vợ chồng cùng là sát thủ giấu nghề, Maleficent – phim giả tưởng kể lại câu chuyện từ góc nhìn phản diện kinh điển của Disney, The Tourist – phim ly kỳ tình báo pha lãng mạn giữa hai nhân vật xa lạ bị cuốn vào âm mưu nguy hiểm, và By The Sea – phim tâm lý tình cảm mang màu sắc nghệ thuật độc lập. Cả bốn phim đều có sự góp mặt của các minh tinh hạng A và khai thác mối quan hệ đôi lứa dưới nhiều lăng kính khác nhau. Danh sách phản ánh gu xem phim đa dạng, từ hành động giải trí đến chính kịch tâm lý sâu lắng."],
      ["Soul", "2020", "\"A spark isn't a soul's purpose — it's just a sign that you're ready to live life on earth.\" \"Best part of living isn't chasing ambition or catching hold of a fleeting dream — it's just living.\"", "Joe Gardner là một nhạc công jazz vừa có cơ hội biểu diễn trong đời thì gặp tai nạn và linh hồn anh bị tách khỏi thể xác, rơi vào Vùng Trước Khi Sinh. Ở đó anh gặp 22, một linh hồn chưa từng muốn đến Trái Đất vì không tìm được điều gì hứng thú với cuộc sống. Hành trình giúp 22 tìm ra tia lửa của mình khiến Joe nhận ra ý nghĩa thực sự của việc sống, chứ không chỉ là theo đuổi đam mê hay mục đích lớn lao."],
      ["Seven Years In Tibet", "1997", "Mong cái cảm giác như khi đọc Mật Mã Tây Tạng hay Thiên Táng... mà có vẻ xem khi bị bão hòa nên không đúng ý.", "Phim kể về Heinrich Harrer, nhà leo núi người Áo, bị bắt làm tù binh chiến tranh tại Ấn Độ trong Thế chiến II và sau đó trốn thoát cùng một người bạn. Ông tìm đường đến Lhasa, Tây Tạng, nơi ông dần trở thành bạn và gia sư của Đạt Lai Lạt Ma khi ngài còn nhỏ tuổi. Câu chuyện diễn ra trên nền biến động lịch sử khi quân đội Trung Quốc tiến vào Tây Tạng, buộc Harrer phải rời đi và thay đổi cách nhìn về cuộc đời mình."],
      ["Chef", "2014", undefined, "Carl Casper là một đầu bếp tài năng nhưng bị gò bó trong thực đơn cứng nhắc của nhà hàng, dẫn đến xung đột công khai với một nhà phê bình ẩm thực có ảnh hưởng. Sau khi mất việc, anh quyết định mua lại một chiếc xe tải cũ và biến nó thành xe bán đồ ăn di động. Cùng con trai và một người bạn thân, anh lái xe xuyên nước Mỹ, vừa hàn gắn quan hệ gia đình vừa tìm lại niềm đam mê nấu ăn."],
      ["Emily In Paris", "2020", undefined, "Emily Cooper là một chuyên viên marketing trẻ người Mỹ đến từ Chicago, được công ty cử sang Paris làm việc tại một agency Pháp mới được mua lại. Cô phải thích nghi với văn hóa, ngôn ngữ và phong cách làm việc hoàn toàn khác biệt, đồng thời đối mặt với sự hoài nghi của đồng nghiệp người Pháp. Bên cạnh công việc, series còn theo chân các mối quan hệ tình cảm và tình bạn của Emily giữa khung cảnh thời trang và ẩm thực Paris."],
      ["Captain Phillips", "2013", undefined, "Phim dựa trên sự kiện có thật năm 2009, kể về thuyền trưởng Richard Phillips điều khiển tàu container Maersk Alabama trên vùng biển gần Somalia. Con tàu bị một nhóm cướp biển Somalia tấn công và chiếm giữ, buộc Phillips phải tìm cách bảo vệ thủy thủ đoàn. Tình huống leo thang thành một cuộc đối đầu căng thẳng trên biển, kết thúc bằng sự can thiệp của lực lượng Hải quân Mỹ."],
      ["Deadpool", "2016", undefined, "Wade Wilson là một cựu lính đánh thuê mắc bệnh ung thư giai đoạn cuối, chấp nhận tham gia một thí nghiệm bí mật hứa hẹn chữa khỏi bệnh. Thí nghiệm khiến cơ thể anh biến dạng nhưng cũng cho anh khả năng tự chữa lành gần như bất tử. Mang danh tính mới Deadpool, anh lên đường trả thù kẻ đã biến mình thành như vậy, với phong cách hài hước, bạo lực và phá vỡ bức tường thứ tư đặc trưng."],
      ["Dogtooth", "2009", undefined, "Phim kể về một gia đình Hy Lạp trong đó cha mẹ giữ ba người con đã trưởng thành hoàn toàn cách ly với thế giới bên ngoài trong khuôn viên nhà mình. Họ dạy con những định nghĩa sai lệch về từ ngữ và thế giới, kiểm soát mọi thông tin để duy trì quyền lực tuyệt đối. Trật tự khép kín ấy dần rạn nứt khi một trong những đứa con bắt đầu khao khát và tìm cách tiếp xúc với thế giới thực bên ngoài."],
      ["3 Idiots", "2009", undefined, "Phim xoay quanh ba sinh viên kỹ thuật thân thiết tại một trường đại học danh tiếng ở Ấn Độ, trong đó Rancho nổi bật với tư duy khác biệt, phản đối lối học nhồi nhét và chạy theo điểm số. Câu chuyện được kể qua hồi tưởng của hai người bạn khi họ tìm kiếm Rancho nhiều năm sau khi tốt nghiệp. Qua đó phim phê phán áp lực học đường và định kiến xã hội, đồng thời đề cao việc theo đuổi đam mê thực sự."],
      ["All Is Lost", "2013", undefined, "Phim theo chân một người đàn ông lớn tuổi, được biết đến chỉ là Our Man, đi thuyền một mình trên Ấn Độ Dương khi con thuyền bị va vào một container trôi dạt và bắt đầu ngập nước. Gần như không có lời thoại, phim tập trung vào cuộc chiến sinh tồn của ông khi liên tiếp đối mặt với bão tố, hỏng hóc thiết bị và nguồn lực cạn kiệt. Ông phải dùng mọi kỹ năng và ý chí để cố gắng sống sót giữa biển khơi mênh mông."],
      ["The King", "2019", undefined, "Phim lấy bối cảnh nước Anh thời trung cổ, kể về Hal, người sau đó lên ngôi trở thành vua Henry V sau cái chết của cha mình. Ban đầu miễn cưỡng và hoài nghi về chiến tranh, Hal dần buộc phải đảm nhận trách nhiệm trị vì và đối mặt với âm mưu chính trị trong triều đình. Đỉnh điểm phim là cuộc chiến với Pháp, dẫn đến trận Agincourt nổi tiếng, nơi ông khẳng định vị thế của mình như một vị vua."],
      ["Brooklyn", "2015", undefined, "Eilis Lacey là một cô gái trẻ người Ireland rời quê hương sang Brooklyn, New York vào thập niên 1950 để tìm kiếm cơ hội mới. Tại đây cô dần thích nghi với cuộc sống mới, đi làm, đi học và nảy sinh tình cảm với một chàng trai người Ý. Khi phải trở về Ireland vì việc gia đình, Eilis đứng trước lựa chọn khó khăn giữa cuộc sống cũ nơi quê nhà và tương lai mới ở nước Mỹ."],
      ["Little Miss Sunshine", "2006", undefined, "Phim kể về một gia đình lộn xộn, mâu thuẫn cùng nhau thực hiện chuyến đi bằng chiếc xe van cũ để đưa cô con gái nhỏ Olive đến tham dự cuộc thi sắc đẹp thiếu nhi ở California. Trên đường đi, những thành viên với tính cách và vấn đề riêng biệt dần bộc lộ và va chạm với nhau. Chuyến đi trở thành hành trình giúp cả gia đình gắn kết và chấp nhận nhau hơn dù đầy trục trặc."],
      ["Last Christmas", "2019", undefined, "Kate là một cô gái trẻ gốc Nam Tư sống ở London, làm việc tại một cửa hàng đồ Giáng sinh trong khi cuộc sống cá nhân rối ren sau một cuộc phẫu thuật lớn. Cô gặp Tom, một chàng trai bí ẩn, lạc quan, người dần giúp cô nhìn nhận lại cuộc sống và các mối quan hệ xung quanh mình. Câu chuyện tình cảm nhẹ nhàng trên nền nhạc của George Michael dẫn đến một bất ngờ cảm động về danh tính thực sự của Tom."],
      ["Eddie The Eagle", "2016", undefined, "Phim dựa trên câu chuyện có thật về Eddie Edwards, một vận động viên người Anh không có tài năng thiên bẩm nhưng quyết tâm theo đuổi giấc mơ tham dự Thế vận hội. Không được đào tạo bài bản, anh chuyển sang môn nhảy trượt tuyết vì đó là hạng mục duy nhất nước Anh chưa từng có đại diện. Với sự giúp đỡ của một huấn luyện viên từng sa sút, Eddie vượt qua nhiều rào cản để có mặt tại Olympic mùa đông 1988."],
      ["Monty Python And The Holy Grail", "1975", undefined, "Phim là một bộ phim hài giễu nhại về truyền thuyết vua Arthur và các hiệp sĩ bàn tròn. Arthur cùng đoàn tùy tùng của mình lên đường tìm kiếm Chén Thánh theo lệnh của Thượng đế. Trên hành trình, họ gặp hàng loạt tình huống phi lý, các nhân vật kỳ quặc và thử thách vô nghĩa, tạo nên phong cách hài hước đặc trưng của nhóm Monty Python."],
      ["Up In The Air", "2009", undefined, "Ryan Bingham là một người đàn ông làm nghề đi khắp nước Mỹ để sa thải nhân viên thay cho các công ty khác, sống một cuộc đời độc thân, gắn bó với việc di chuyển liên tục và không ràng buộc. Anh tự hào về lối sống tối giản, không vướng bận của mình cho đến khi gặp một phụ nữ có cùng lối sống và một đồng nghiệp trẻ muốn thay đổi cách làm việc của công ty. Những biến cố này dần khiến Ryan phải nhìn lại giá trị thực sự của các mối quan hệ và sự gắn kết trong cuộc sống."],
      ["The Proposal", "2009", undefined, "Margaret là một nữ tổng biên tập người Canada làm việc tại New York, đứng trước nguy cơ bị trục xuất vì vấn đề visa. Để tránh việc này, cô ép buộc trợ lý của mình là Andrew phải giả vờ đính hôn và kết hôn với cô. Cặp đôi cùng nhau về thăm gia đình Andrew ở Alaska để thuyết phục mọi người tin vào mối quan hệ giả, và dần nảy sinh tình cảm thật giữa hai người."],
      ["The Words", "2012", undefined, "Rory Jansen là một nhà văn trẻ gặp khó khăn trong việc xuất bản tác phẩm của chính mình. Khi tình cờ tìm thấy một bản thảo cũ trong chiếc cặp mua ở Paris, anh chép lại và xuất bản nó dưới tên mình, nhanh chóng gặt hái thành công vang dội. Bí mật của anh bị đe dọa khi tác giả thực sự của bản thảo, một ông lão bí ẩn, xuất hiện và đối chất với anh."],
      ["IT", "2017", undefined, "Phim dựa trên tiểu thuyết của Stephen King, kể về một nhóm trẻ em ở thị trấn Derry, bang Maine, những người tự gọi mình là Câu Lạc Bộ Những Kẻ Thua Cuộc. Họ phát hiện những vụ mất tích bí ẩn của trẻ em trong thị trấn có liên quan đến một thực thể siêu nhiên mang hình dạng chú hề Pennywise. Cả nhóm cùng nhau đối mặt với nỗi sợ hãi sâu kín nhất của bản thân để chiến đấu và ngăn chặn con quái vật này."],
      ["Noah", "2014", undefined, "Phim tái hiện câu chuyện Kinh Thánh về Noah, người được Đấng Tạo Hóa mách bảo về một trận đại hồng thủy sắp nhấn chìm thế giới vì tội lỗi của loài người. Ông cùng gia đình đóng một con tàu khổng lồ để cứu các loài động vật và bảo tồn sự sống. Trong quá trình đó, Noah phải đối mặt với những mâu thuẫn nội tâm và xung đột với những người muốn xâm chiếm con tàu."],
      ["Home Alone", "1990", undefined, "Kevin McCallister là một cậu bé bị gia đình vô tình bỏ quên ở nhà khi cả nhà vội vã đi nghỉ lễ Giáng sinh ở nước ngoài. Ban đầu thích thú với sự tự do một mình, cậu sớm phải đối mặt với hai tên trộm nhắm vào ngôi nhà của gia đình mình. Kevin dùng trí thông minh và sự sáng tạo để dựng lên hàng loạt bẫy nhằm bảo vệ ngôi nhà khỏi hai kẻ trộm vụng về."],
      ["Lady Bird", "2017", "Lại là tuổi nổi loạn.", "Christine \"Lady Bird\" McPherson là một nữ sinh trung học ở Sacramento trải qua năm cuối cấp đầy biến động trước khi rời nhà đi học đại học. Cô loay hoay giữa tình bạn, mối tình đầu, ước mơ thoát khỏi thành phố quê nhà và mối quan hệ căng thẳng nhưng sâu sắc với mẹ. Phim khắc họa chân thực giai đoạn trưởng thành đầy mâu thuẫn giữa khao khát độc lập và tình cảm gia đình."],
      ["Mr Popper's Penguins", "2011", undefined, "Tom Popper là một doanh nhân thành đạt nhưng bận rộn, xa cách với gia đình, bất ngờ thừa hưởng sáu chú chim cánh cụt từ người cha vừa qua đời. Sự xuất hiện của đàn chim cánh cụt trong căn hộ ở New York gây ra hàng loạt tình huống hỗn loạn nhưng cũng hài hước. Qua quá trình chăm sóc chúng, Popper dần thay đổi cách sống và hàn gắn lại quan hệ với các con và vợ cũ."],
      ["This Is The End", "2013", "Emmaaaa.", "Seth Rogen, James Franco, Jonah Hill và một nhóm ngôi sao Hollywood khác thủ vai chính bản thân họ, tụ họp tại bữa tiệc ở nhà James Franco thì ngày tận thế bất ngờ ập đến bên ngoài. Nhóm bạn phải cố thủ trong ngôi nhà để tránh những hiện tượng siêu nhiên và quái vật đang tàn phá Los Angeles. Giữa hoàn cảnh sinh tồn hài hước và bạo lực, họ buộc phải đối mặt với những mâu thuẫn cá nhân và bản chất thật của chính mình."],
      ["Hugo", "2011", undefined, "Hugo Cabret là một cậu bé mồ côi sống bí mật trong các bức tường của một nhà ga xe lửa ở Paris, chăm sóc đồng hồ và cố gắng sửa một automaton mà cha để lại. Hành trình sửa cỗ máy dẫn cậu đến người chủ một quầy đồ chơi bí ẩn trong ga và cô cháu gái của ông. Từ đó, Hugo khám phá ra mối liên hệ bất ngờ giữa automaton và một trong những nhà làm phim tiên phong đầu thế kỷ 20, Georges Méliès."],
      ["Dumb And Dumber", "1994", undefined, "Lloyd và Harry là hai người bạn thân có trí tuệ không mấy nhanh nhạy nhưng luôn tràn đầy nhiệt huyết. Khi Lloyd tình cờ có cơ hội trả lại một chiếc vali bị bỏ quên cho một phụ nữ xinh đẹp, hai người quyết định lái xe xuyên nước Mỹ để đến gặp cô. Trên đường đi, họ gặp hàng loạt tình huống dở khóc dở cười, không hề biết rằng chiếc vali thực chất chứa đầy tiền chuộc của một vụ bắt cóc."],
      ["How To Train Your Dragon", "2010", undefined, "Hiccup là một cậu bé Viking gầy gò, không phù hợp với truyền thống săn rồng của bộ tộc mình. Khi bắt được một con rồng Night Fury nhưng không nỡ giết nó, cậu bí mật kết bạn và huấn luyện nó, đặt tên là Toothless. Qua quá trình gắn bó với Toothless, Hiccup dần thay đổi cách nhìn của cả bộ tộc về loài rồng, từ kẻ thù trở thành bạn đồng hành."],
      ["Tangled", "2010", undefined, "Rapunzel là một công chúa bị mụ phù thủy Gothel giam giữ trong một tòa tháp từ nhỏ vì mái tóc dài có phép thuật chữa lành và trẻ hóa của cô. Vào đúng dịp sinh nhật, tên trộm Flynn Rider tình cờ trốn vào tháp của cô, và Rapunzel thuyết phục anh đưa mình ra ngoài để xem lễ hội đèn lồng mà cô vẫn hằng mơ ước. Chuyến phiêu lưu giúp Rapunzel khám phá thế giới bên ngoài và dần hé lộ sự thật về thân thế thực sự của mình."],
      ["Brave", "2012", undefined, "Merida là công chúa xứ Scotland có cá tính mạnh mẽ, không muốn tuân theo truyền thống chọn chồng do hoàng gia sắp đặt. Sau cuộc cãi vã với mẹ, cô tìm đến một phù thủy để xin một phép thuật thay đổi số phận, nhưng vô tình biến mẹ mình thành một con gấu. Merida phải tìm cách hóa giải lời nguyền trước khi quá muộn, đồng thời hàn gắn lại mối quan hệ với mẹ."],
      ["Moana", "2016", undefined, "Moana là con gái của tộc trưởng trên một hòn đảo Polynesia, luôn khao khát được ra khơi dù bị cấm đoán vì truyền thống của đảo. Khi vùng biển và cây cối trên đảo bắt đầu suy tàn, cô lên đường vượt đại dương để tìm bán thần Maui, người duy nhất có thể giúp trả lại trái tim của nữ thần Te Fiti đã bị đánh cắp. Hành trình giúp Moana khám phá sức mạnh bản thân và nguồn gốc thực sự của dân tộc mình."],
      ["Despicable Me", "2010", undefined, "Gru là một kẻ phản diện đầy tham vọng, lên kế hoạch thực hiện vụ trộm lớn nhất trong lịch sử: đánh cắp mặt trăng. Để thực hiện âm mưu, hắn nhận nuôi ba chị em mồ côi làm bình phong nhằm tiếp cận một thiết bị cần thiết từ đối thủ. Qua thời gian sống cùng nhau, Gru dần nảy sinh tình cảm cha con thực sự với ba cô bé, khiến hắn phải lựa chọn giữa kế hoạch tội ác và gia đình mới của mình."],
      ["Ice Age", "2002", undefined, "Bộ ba gồm voi ma mút Manny, lười đất Sid và hổ răng kiếm Diego tình cờ gặp nhau trong thời kỳ băng hà và cùng nhận nhiệm vụ đưa một em bé loài người thất lạc trở về với bộ tộc của mình. Trên đường đi, giữa họ ban đầu có nhiều nghi kỵ và mâu thuẫn về mục đích thực sự của mỗi người. Hành trình gian nan giúp cả ba dần trở thành một gia đình gắn bó bất chấp sự khác biệt."],
      ["Big Hero 6", "2014", undefined, "Hiro Hamada là một thiếu niên thiên tài công nghệ sống tại thành phố San Fransokyo, đau buồn sau cái chết của anh trai Tadashi trong một vụ hỏa hoạn bí ẩn. Cậu vô tình kích hoạt Baymax, robot chăm sóc sức khỏe do chính Tadashi tạo ra, và cùng nhóm bạn của anh trai chế tạo thêm trang bị cho Baymax để điều tra sự thật. Cả nhóm trở thành đội siêu anh hùng nghiệp dư nhằm ngăn chặn một kẻ đeo mặt nạ đang lạm dụng công nghệ do Hiro phát minh."],
      ["Hotel Transylvania", "2012", undefined, "Bá tước Dracula điều hành một khách sạn sang trọng dành riêng cho các quái vật, nơi họ có thể tránh xa và ẩn náu khỏi con người. Nhân dịp sinh nhật thứ 118 của con gái Mavis, một chàng trai người bình thường tên Jonathan vô tình lạc vào khách sạn. Dracula phải tìm mọi cách che giấu thân phận thật của Jonathan trong khi Mavis và Jonathan dần nảy sinh tình cảm với nhau."],
      ["Mamma Mia!", "2008", undefined, "Sophie sắp kết hôn trên hòn đảo Hy Lạp nơi cô lớn lên cùng mẹ đơn thân Donna, nhưng cô chưa từng biết cha ruột của mình là ai. Sau khi đọc nhật ký của mẹ, Sophie phát hiện có ba người đàn ông có thể là cha mình và bí mật mời cả ba đến dự đám cưới mà không cho mẹ biết. Sự xuất hiện bất ngờ của cả ba người đàn ông khuấy động lại quá khứ của Donna, xen lẫn những bản nhạc nổi tiếng của ban nhạc ABBA."],
      ["Bambi", "1942", undefined, "Bambi là một chú nai con sinh ra trong khu rừng, được mệnh danh là hoàng tử tương lai của rừng già. Cậu lớn lên cùng những người bạn thú rừng, trải qua nhiều mùa và học cách sinh tồn, nhưng phải chịu mất mát lớn khi mẹ bị thợ săn giết hại. Bambi trưởng thành qua những biến cố đó, cuối cùng kế thừa vị trí của cha mình để dẫn dắt và bảo vệ khu rừng."],
      ["Inside Out", "2015", undefined, "Riley là một cô bé 11 tuổi phải chuyển nhà từ Minnesota đến San Francisco cùng gia đình, gây xáo trộn lớn trong cuộc sống của em. Bên trong tâm trí Riley, năm cảm xúc Vui Vẻ, Buồn Bã, Sợ Hãi, Giận Dữ và Chán Ghét cùng điều khiển hành vi của em, trong đó Vui Vẻ luôn cố gắng giữ vai trò chủ đạo. Khi Vui Vẻ và Buồn Bã vô tình bị cuốn ra khỏi trung tâm điều khiển, Riley dần mất kết nối cảm xúc, buộc hai cảm xúc này phải tìm đường trở về và nhận ra vai trò cần thiết của cả nỗi buồn trong cuộc sống."],
      ["Alice In Wonderland", "2010", undefined, "Alice, nay đã 19 tuổi, tình cờ rơi trở lại vùng đất kỳ ảo Underland mà cô từng đến khi còn nhỏ nhưng đã quên hầu hết ký ức. Tại đây cô gặp lại những nhân vật quen thuộc như Thỏ Trắng, Mèo Cheshire và Thợ Làm Mũ Điên, những người tin rằng Alice chính là người được tiên tri sẽ giải cứu vùng đất khỏi ách thống trị của Nữ hoàng Đỏ độc ác. Alice phải chấp nhận vận mệnh của mình, đối đầu với quái vật Jabberwocky để khôi phục lại hòa bình cho Underland."],
      ["Spirited Away", "2001", undefined, "Chihiro, một cô bé mười tuổi, cùng cha mẹ vô tình lạc vào một thế giới linh hồn bí ẩn khi gia đình đang chuyển nhà. Cha mẹ cô bị biến thành lợn sau khi ăn vụng đồ ăn của các vị thần, buộc Chihiro phải tìm việc làm tại nhà tắm dành cho các linh hồn để sinh tồn và tìm cách cứu cha mẹ. Trong quá trình đó, cô kết bạn với nhiều nhân vật kỳ lạ và dần trưởng thành, khám phá lòng dũng cảm và bản lĩnh của chính mình."],
      ["Tomorrow I Will Date With Yesterday You", "2016", undefined, "Takatoshi là một sinh viên đại học tình cờ gặp và đem lòng yêu Emi, một cô gái bí ẩn mà cậu chỉ có thể gặp vào những dịp hiếm hoi. Về sau cậu phát hiện ra sự thật gây sốc: Emi đang sống ngược dòng thời gian so với cậu, ký ức của cô về những lần gặp gỡ dần lùi về quá khứ trong khi của cậu tiến về tương lai. Biết rằng thời gian bên nhau là hữu hạn và ký ức sẽ phai nhạt, hai người vẫn chọn trân trọng từng khoảnh khắc được ở bên nhau."],
      ["Thor: Love And Thunder", "2022", undefined, "Thor cùng người bạn cũ Valkyrie và ban nhạc Guardians of the Galaxy phải đối đầu với Gorr, kẻ săn thần đang tàn sát các vị thần khắp vũ trụ sau khi mất niềm tin vào họ. Trong hành trình đó, Thor bất ngờ tái ngộ người yêu cũ Jane Foster, người giờ đây đã trở thành Mighty Thor sau khi cầm được búa Mjolnir và đang chống chọi với bệnh ung thư. Cả hai cùng nhau chiến đấu để cứu những đứa trẻ bị Gorr bắt cóc và ngăn chặn âm mưu hủy diệt các vị thần của hắn."],
      ["Turning Red", "2022", undefined, "Mei Lee là một nữ sinh 13 tuổi gốc Hoa sống tại Toronto, tự tin và luôn cố gắng làm hài lòng người mẹ nghiêm khắc của mình. Khi cảm xúc dâng trào mạnh mẽ, cô bất ngờ biến thành một con gấu trúc đỏ khổng lồ, một khả năng gia truyền của dòng họ. Mei phải học cách kiểm soát sự biến hình này trong khi cân bằng giữa tình bạn, sở thích cá nhân và kỳ vọng của gia đình."],
      ["Minions: The Rise Of Gru", "2022", undefined, "Phim lấy bối cảnh thập niên 1970, khi Gru còn là một cậu bé mười một tuổi mơ ước trở thành siêu ác nhân vĩ đại nhất thế giới. Cậu tìm cách gia nhập nhóm siêu phản diện khét tiếng Vicious 6 nhưng vô tình dính líu đến một viên đá quý quyền năng mà cả nhóm đang truy lùng. Với sự trợ giúp của đàn Minions trung thành, Gru phải đối đầu với nhóm tội phạm nguy hiểm để bảo vệ bản thân và hiện thực hóa giấc mơ trở thành ác nhân của mình."],
      ["The Intern", "2015", undefined, "Ben Whittaker là một góa phụ 70 tuổi đã nghỉ hưu, cảm thấy cuộc sống nhàm chán nên quyết định ứng tuyển vào chương trình thực tập sinh cao tuổi tại một công ty thời trang trực tuyến đang phát triển nhanh. Ông được phân công làm trợ lý cho Jules Ostin, nữ CEO trẻ tuổi đầy áp lực và bận rộn của công ty. Qua thời gian làm việc cùng nhau, kinh nghiệm sống và sự chân thành của Ben dần giúp Jules cân bằng giữa công việc và cuộc sống cá nhân."],
      ["Where The Crawdads Sing", "2022", undefined, "Kya Clark là một cô gái bị gia đình bỏ rơi từ nhỏ, phải một mình lớn lên và sinh tồn giữa vùng đầm lầy hẻo lánh ở North Carolina, bị dân làng gọi khinh miệt là cô gái đầm lầy. Khi một thanh niên trong thị trấn được phát hiện đã chết, Kya nhanh chóng trở thành nghi phạm chính của vụ án vì mối quan hệ trong quá khứ giữa hai người. Câu chuyện đan xen giữa phiên tòa xét xử Kya và những hồi tưởng về tuổi thơ cô đơn, tình yêu và sự trưởng thành của cô giữa thiên nhiên hoang dã."],
      ["Enola Holmes", "2020–2022", undefined, "Enola Holmes là em gái út của hai anh trai nổi tiếng Sherlock và Mycroft Holmes, được mẹ nuôi dạy độc lập và thông minh không kém các anh. Khi mẹ cô đột ngột biến mất, Enola một mình lên đường đến London để tìm kiếm bà, đồng thời né tránh sự giám sát của các anh trai muốn đưa cô vào trường nữ sinh khuôn phép. Trên hành trình, cô vướng vào một vụ án bí ẩn khác và dần khẳng định khả năng phá án của riêng mình, tách biệt khỏi cái bóng của Sherlock."],
      ["Nu Family", "2023", undefined, "Nhà Bà Nữ (còn được biết đến với tên tiếng Anh Mrs. Nu Family) là phim điện ảnh Việt Nam do Trấn Thành đạo diễn, công chiếu dịp Tết 2023. Phim xoay quanh bà Ngọc Nữ (Lê Giang), chủ một quán bánh canh cua trong khu chung cư cũ, người quản lý gia đình ba thế hệ với sự nghiêm khắc tuyệt đối. Khi con gái út Nhi (Uyển Ân) muốn thoát khỏi sự kiểm soát của mẹ để đến với người yêu John (Song Luân), những mâu thuẫn âm ỉ giữa các thế hệ trong nhà bùng nổ, buộc mọi người phải đối diện và thấu hiểu nhau hơn."],
      ["The Truth About Ikea", "2023"],
      ["The Gray Man", "2022", undefined, "Sáu (Six) là một cựu tù nhân được CIA tuyển dụng và huấn luyện trở thành sát thủ bí mật cho chương trình Sierra. Khi vô tình phát hiện ra bí mật đen tối trong nội bộ cơ quan trong một nhiệm vụ, anh trở thành mục tiêu bị truy sát khắp thế giới bởi Lloyd Hansen, một cựu điệp viên CIA tàn nhẫn được thuê để tiêu diệt anh. Cuộc rượt đuổi trải dài qua nhiều quốc gia, buộc Sáu phải tìm cách sống sót và vạch trần âm mưu phía sau."],
      ["Guardians Of The Galaxy Vol. 3", "2023", undefined, "Nhóm Guardians of the Galaxy đang cố gắng ổn định cuộc sống mới tại Knowhere thì Rocket bất ngờ bị thương nặng trong một trận chiến với Adam Warlock. Để cứu sống Rocket, cả nhóm buộc phải tìm ra công tắc ngắt hệ thống cấy ghép trong cơ thể cậu, dẫn đến việc khám phá quá khứ đau buồn của Rocket dưới tay High Evolutionary, kẻ đã tạo ra cậu. Cuộc hành trình biến thành cuộc đối đầu với High Evolutionary nhằm ngăn chặn tham vọng tạo ra một xã hội hoàn hảo bằng thí nghiệm trên các sinh vật khác."],
      ["Đất Rừng Phương Nam", "2023", undefined, "Phim lấy bối cảnh miền Tây Nam Bộ đầu thế kỷ 20 dưới thời Pháp thuộc, chuyển thể từ tiểu thuyết cùng tên của nhà văn Đoàn Giỏi. Nhân vật chính là cậu bé An, sau khi gia đình ly tán đã lưu lạc khắp vùng sông nước, gặp gỡ nhiều con người và trải qua nhiều biến cố trên hành trình tìm lại người thân. Qua đó phim tái hiện đời sống, thiên nhiên và con người vùng sông nước Nam Bộ trong giai đoạn lịch sử nhiều biến động."],
      ["Wonka", "2023", undefined, "Phim kể về những ngày đầu của Willy Wonka khi anh đặt chân đến một thành phố châu Âu với ước mơ mở một cửa hàng sô-cô-la của riêng mình. Anh nhanh chóng vấp phải sự cản trở của một liên minh các nhà sản xuất sô-cô-la độc quyền tìm cách triệt hạ mọi đối thủ cạnh tranh. Với sự giúp đỡ của những người bạn mới quen, trong đó có một Oompa Loompa, Wonka tìm cách vượt qua khó khăn để hiện thực hóa giấc mơ của mình."],
      ["Kramer Vs. Kramer", "1979", undefined, "Phim kể về Ted Kramer, một người cha phải học cách một mình nuôi dạy con trai sau khi vợ anh, Joanna, đột ngột rời bỏ gia đình. Khi Ted dần xây dựng mối quan hệ gắn bó với con, Joanna quay lại đòi quyền nuôi con, dẫn đến một cuộc chiến pháp lý căng thẳng. Bộ phim khắc họa chân thực sự thay đổi vai trò giới trong gia đình và nỗi đau của cả hai phía trong một cuộc ly hôn."],
      ["One Battle After Another", "2025", undefined, "Bộ phim của Paul Thomas Anderson, chuyển thể lỏng lẻo từ tiểu thuyết \"Vineland\" của Thomas Pynchon, theo chân một cựu chiến binh cách mạng buộc phải hành động trở lại khi quá khứ tìm đến gia đình anh. Câu chuyện đan xen giữa chính trị, gia đình và di sản của phong trào phản kháng nhiều thập kỷ trước. Phim quy tụ dàn diễn viên gồm Leonardo DiCaprio trong một tác phẩm được kỳ vọng là sử thi hành động giàu chất suy tưởng."],
      ["The Glass Castle", "2017", undefined, "Phim dựa trên hồi ký của Jeannette Walls, kể về tuổi thơ đầy biến động của cô cùng ba anh chị em dưới sự nuôi dạy của cha mẹ theo lối sống du mục, tự do nhưng vô trách nhiệm. Khi trưởng thành và có sự nghiệp ổn định tại New York, Jeannette phải đối diện lại với quá khứ khi cha mẹ cô chuyển đến sống ngay gần cô. Bộ phim khắc họa mối quan hệ phức tạp giữa tình yêu gia đình và những tổn thương khó quên từ thời thơ ấu."],
      ["A Brighter Summer Day", "1991", undefined, "Bộ phim lấy bối cảnh Đài Loan đầu thập niên 1960, xoay quanh Tứ, một cậu học sinh trung học dần bị cuốn vào thế giới băng đảng đường phố giữa bối cảnh xã hội đầy bất an của những người Hoa lục di cư. Qua hành trình trưởng thành đầy bạo lực của Tứ, phim phản ánh sự bất ổn chính trị và văn hóa của Đài Loan thời kỳ hậu chiến. Tác phẩm của Edward Yang được xem là một trong những kiệt tác điện ảnh châu Á, khắc họa tinh tế tuổi trẻ lạc lối giữa thời cuộc hỗn loạn."],
      ["Sound Of Metal", "2019", undefined, "Ruben, một tay trống nhạc metal, bất ngờ mất thính lực và phải đối mặt với việc từ bỏ bản dạng nghệ sĩ gắn liền với âm thanh cả đời mình. Anh gia nhập một cộng đồng người khiếm thính để học cách sống với sự im lặng, dù trong lòng vẫn khao khát tìm lại thính giác qua phẫu thuật cấy ốc tai. Bộ phim là hành trình đầy xúc động về việc chấp nhận bản thân và tìm kiếm bình yên trong mất mát."],
      ["The Squid And The Whale", "2005", undefined, "Phim kể về hai anh em tuổi teen phải đối mặt với cuộc ly hôn của cha mẹ, hai nhà văn trí thức tại Brooklyn, và bị cuốn vào những mâu thuẫn tình cảm phức tạp giữa hai bên. Mỗi đứa trẻ chọn đứng về một phía cha hoặc mẹ, phản ánh qua đó những tổn thương và sự trưởng thành sớm của chúng. Đạo diễn Noah Baumbach khắc họa sắc sảo, hài hước chua chát về sự tan vỡ của một gia đình trí thức."],
      ["Hamnet", "2025", undefined, "Bộ phim chuyển thể từ tiểu thuyết cùng tên của Maggie O'Farrell, tưởng tượng về cuộc sống gia đình của William Shakespeare và người vợ Agnes, đặc biệt là nỗi đau mất đi cậu con trai Hamnet vì bệnh dịch. Câu chuyện khám phá cách nỗi đau mất mát ấy có thể đã truyền cảm hứng cho vở kịch \"Hamlet\" nổi tiếng của ông. Phim của đạo diễn Chloé Zhao tập trung vào góc nhìn của người vợ, khắc họa nỗi đau và sự chữa lành qua nghệ thuật."],
      ["Sentimental Value", "2025", undefined, "Bộ phim kể về hai chị em có cha là một đạo diễn nổi tiếng nhưng xa cách, người bất ngờ quay lại cuộc sống của họ với lời đề nghị đóng vai chính trong bộ phim mới của ông. Qua đó, những vết rạn nứt cũ trong gia đình dần được khơi lại và đối diện. Đạo diễn Joachim Trier tiếp tục khai thác chủ đề ký ức, nghệ thuật và các mối quan hệ gia đình phức tạp."],
      ["The Outrun", "2024", undefined, "Rona, một phụ nữ trẻ đang vật lộn với chứng nghiện rượu, trở về quần đảo Orkney hoang sơ ở Scotland để cai nghiện và tìm lại chính mình. Giữa thiên nhiên khắc nghiệt và tĩnh lặng của quê nhà, cô dần đối diện với quá khứ và học cách xây dựng lại cuộc sống. Bộ phim dựa trên hồi ký của Amy Liptrot, khắc họa chân thực hành trình phục hồi đầy gian nan nhưng đầy hy vọng."],
      ["The Sunset Limited", "2011", undefined, "Bộ phim chuyển thể từ vở kịch của Cormac McCarthy, xoay quanh cuộc đối thoại căng thẳng giữa hai người đàn ông sau khi một người ngăn người kia tự tử bằng cách nhảy vào tàu điện. Suốt bộ phim, họ tranh luận sâu sắc về đức tin, ý nghĩa cuộc sống và sự tuyệt vọng. Với chỉ hai diễn viên Samuel L. Jackson và Tommy Lee Jones, phim là một cuộc đối thoại triết học căng thẳng, giàu chất suy tưởng."],
      ["The Whale", "2022", undefined, "Charlie, một giáo viên tiếng Anh mắc chứng béo phì bệnh lý sống ẩn dật, cố gắng hàn gắn mối quan hệ với cô con gái tuổi teen xa cách trong những ngày cuối đời. Qua các cuộc gặp gỡ đầy cảm xúc, phim hé lộ nỗi đau mất mát và cảm giác tội lỗi đã khiến Charlie tự cô lập bản thân suốt nhiều năm. Bộ phim là câu chuyện đầy ám ảnh về sự tha thứ, tình phụ tử và khao khát được kết nối trước khi quá muộn."],
      ["Chị Dâu", "2024", undefined, "Bộ phim Việt Nam kể về những mâu thuẫn và hiểu lầm giữa bốn chị em dâu trong một gia đình sau khi người anh cả qua đời, xoay quanh vấn đề chia tài sản và trách nhiệm chăm sóc mẹ chồng. Qua những tình huống hài hước lẫn cảm động, phim khắc họa chân thực mối quan hệ phức tạp giữa các nàng dâu trong văn hóa gia đình Việt Nam. Bộ phim gây chú ý với những màn đối thoại sắc sảo và thông điệp về sự thấu hiểu, bao dung giữa những người phụ nữ trong gia đình."],
    ],
  },
{
    t: "X. Watchlist",
    n: 32,
    items: [
      ["Remember The Titans", "2000", undefined, "Remember The Titans dựa trên câu chuyện có thật về đội bóng bầu dục trung học T.C. Williams ở Virginia năm 1971, nơi HLV da đen Herman Boone được bổ nhiệm dẫn dắt một đội hình vừa sáp nhập giữa cầu thủ da trắng và da đen giữa thời kỳ căng thẳng chủng tộc. Ban đầu đầy xung đột và định kiến, các cầu thủ dần học cách tôn trọng và đoàn kết với nhau qua quá trình luyện tập khắc nghiệt. Phim trở thành biểu tượng về thể thao như cầu nối hàn gắn chia rẽ chủng tộc và xây dựng tình đồng đội."],
      ["Everybody Wants Some!!", "2016", undefined, "Everybody Wants Some!! là phim hài của đạo diễn Richard Linklater, lấy bối cảnh ba ngày cuối tuần trước khi năm học mới bắt đầu tại một trường đại học Texas năm 1980. Nhân vật chính là một tân sinh viên vừa gia nhập đội bóng chày, làm quen với các đồng đội trong ký túc xá đầy cá tính. Phim mang tinh thần phóng khoáng, hoài niệm về tuổi trẻ, tình bạn và văn hóa đại học Mỹ thời kỳ đó."],
      ["Psycho", "1960", undefined, "Psycho của Alfred Hitchcock kể về Marion Crane, một phụ nữ trốn chạy sau khi lấy trộm tiền công ty, dừng chân tại nhà nghỉ Bates Motel hẻo lánh do Norman Bates cùng người mẹ bí ẩn quản lý. Sau một vụ án mạng gây chấn động ngay giữa phim, câu chuyện dần hé lộ bí mật rùng rợn đằng sau Norman và mối quan hệ với mẹ mình. Phim được xem là tác phẩm kinh điển của thể loại kinh dị tâm lý, nổi tiếng với cảnh phòng tắm huyền thoại và cú twist gây sốc."],
      ["City Lights", "1931", undefined, "City Lights là phim câm hài-lãng mạn của Charlie Chaplin, kể về Kẻ Lang Thang (Tramp) đem lòng yêu một cô gái bán hoa mù trên phố, người lầm tưởng anh là một triệu phú. Anh tìm đủ mọi cách xoay xở kiếm tiền giúp cô chữa mắt, kể cả kết bạn với một triệu phú say xỉn thất thường. Phim kết thúc bằng một trong những cảnh đoàn tụ cảm động nhất lịch sử điện ảnh, khi cô gái nhận ra ân nhân thực sự của mình."],
      ["Princess Mononoke", "1997", undefined, "Princess Mononoke của Hayao Miyazaki kể về hoàng tử Ashitaka, người trúng lời nguyền từ một vị thần rừng hóa quỷ và lên đường tìm cách hóa giải. Hành trình đưa anh đến giữa cuộc chiến giữa con người ở thị trấn khai thác quặng Iron Town và các vị thần rừng, trong đó có cô gái hoang dã San (Công chúa Mononoke) được sói nuôi lớn. Phim là câu chuyện sử thi giàu chất thiền về xung đột giữa văn minh công nghiệp và thiên nhiên, không phân định rạch ròi thiện ác."],
      ["Once Upon A Time In The West", "1968", undefined, "Once Upon a Time in the West của đạo diễn Sergio Leone là phim viễn tây sử thi xoay quanh cuộc đối đầu giữa một tay súng bí ẩn báo thù và tên sát thủ tàn bạo Frank làm thuê cho một trùm đường sắt. Câu chuyện đan xen với góa phụ Jill McBain, người thừa kế mảnh đất quan trọng nằm trên tuyến đường sắt sắp được xây dựng. Phim nổi tiếng với nhịp điệu chậm rãi đầy căng thẳng, những cảnh đối đầu kéo dài và phần nhạc phim kinh điển của Ennio Morricone."],
      ["Once Upon A Time In America", "1984", undefined, "Bộ phim theo chân Noodles, một tay giang hồ Do Thái ở New York, qua nhiều thập niên từ thời niên thiếu đến tuổi già. Cùng với nhóm bạn thân, anh dấn thân vào thế giới tội phạm, buôn lậu rượu thời cấm rượu và dần lún sâu vào bạo lực, phản bội. Câu chuyện đan xen giữa quá khứ và hiện tại, khắc họa tình bạn, tình yêu và những hối tiếc dai dẳng của một đời người."],
      ["American Psycho", "2000", undefined, "Phim xoay quanh Patrick Bateman, một chủ ngân hàng đầu tư giàu có ở New York những năm 1980, sống cuộc đời hào nhoáng bề ngoài. Đằng sau vẻ ngoài hoàn hảo, Bateman ẩn giấu bản chất sát nhân máu lạnh, thực hiện hàng loạt vụ giết người tàn bạo trong bí mật. Bộ phim châm biếm sâu cay lối sống vật chất, ích kỷ và sự trống rỗng của giới thượng lưu Phố Wall."],
      ["Bohemian Rhapsody", "2018", undefined, "Phim kể lại hành trình hình thành và phát triển của ban nhạc Queen, tập trung vào giọng ca chính Freddie Mercury. Từ những ngày đầu khó khăn, ban nhạc dần vươn lên trở thành một trong những nhóm nhạc rock vĩ đại nhất lịch sử. Phim khắc họa cả sự nghiệp âm nhạc lẫn đời sống cá nhân đầy giằng xé của Mercury, khép lại bằng màn trình diễn huyền thoại tại Live Aid năm 1985."],
      ["The Boy In The Striped Pajamas", "2008", undefined, "Bruno là cậu bé tám tuổi con trai một sĩ quan chỉ huy trại tập trung Đức Quốc xã trong Thế chiến II. Khi gia đình chuyển đến sống gần trại, Bruno vô tình kết bạn với Shmuel, một cậu bé Do Thái bị giam giữ bên trong, qua hàng rào dây thép gai. Tình bạn ngây thơ giữa hai đứa trẻ dẫn đến một kết cục bi thảm, phơi bày sự tàn khốc của nạn diệt chủng qua góc nhìn trẻ thơ."],
      ["Phantom Thread", "2017", undefined, "Phim lấy bối cảnh London thập niên 1950, xoay quanh Reynolds Woodcock, một nhà thiết kế thời trang danh tiếng và cầu toàn. Cuộc sống của ông thay đổi khi gặp Alma, một cô hầu bàn trẻ trở thành người tình kiêm nàng thơ. Mối quan hệ giữa hai người dần biến thành một cuộc đấu tranh quyền lực đầy ám ảnh và kỳ lạ."],
      ["The Killing Of A Sacred Deer", "2017", undefined, "Steven là một bác sĩ phẫu thuật tim thành đạt, có mối quan hệ thân thiết bất thường với Martin, một cậu thiếu niên mồ côi cha. Dần dần, Martin tiết lộ cha mình đã chết trên bàn mổ của Steven và đưa ra lời nguyền buộc Steven phải chọn giết một thành viên trong gia đình để chuộc tội. Gia đình Steven lần lượt gặp phải những triệu chứng bí ẩn, đẩy câu chuyện vào bầu không khí căng thẳng, ám ảnh."],
      ["1917", "2019", undefined, "Phim lấy bối cảnh Thế chiến I, kể về hai người lính Anh trẻ tuổi được giao nhiệm vụ băng qua chiến tuyến địch để chuyển một mệnh lệnh khẩn cấp. Bức điện phải đến kịp thời nhằm ngăn một cuộc tấn công sẽ dẫn hàng ngàn binh sĩ vào bẫy của quân Đức. Hành trình của họ đầy hiểm nguy, được thể hiện bằng kỹ thuật quay như một cú máy liên tục."],
      ["The Wild Pear Tree", "2018", undefined, "Phim theo chân Sinan, một chàng trai trẻ vừa tốt nghiệp đại học trở về quê nhà ở vùng nông thôn Thổ Nhĩ Kỳ với hoài bão xuất bản cuốn sách mình viết. Anh phải đối mặt với thực tế khó khăn về tài chính, mối quan hệ căng thẳng với người cha nghiện cờ bạc và không khí trì trệ của thị trấn nhỏ. Bộ phim là hành trình chiêm nghiệm dài về tuổi trẻ, gia đình và khát vọng nghệ thuật."],
      ["Bicycle Thieves", "1948", undefined, "Phim kể về Antonio, một người đàn ông nghèo ở Rome thời hậu chiến, vừa tìm được công việc dán áp phích cần có xe đạp. Khi chiếc xe đạp bị đánh cắp ngay ngày đầu đi làm, anh cùng cậu con trai nhỏ Bruno lang thang khắp thành phố để tìm lại nó. Hành trình tuyệt vọng ấy phơi bày cảnh nghèo khó và phẩm giá con người trong xã hội Ý thời hậu chiến."],
      ["A Clockwork Orange", "1971", undefined, "Phim xoay quanh Alex, thủ lĩnh một băng nhóm thanh niên ở nước Anh tương lai gần, chuyên gây ra các vụ bạo lực và cướp bóc. Sau khi bị bắt vì giết người, Alex bị chính quyền dùng làm đối tượng thử nghiệm một liệu pháp cải tạo tâm lý cực đoan mang tên kỹ thuật Ludovico. Phim đặt ra câu hỏi gây tranh cãi về bản chất của tự do ý chí, đạo đức và sự kiểm soát của nhà nước."],
      ["White Oleander", "2002", undefined, "Phim kể về Astrid, một thiếu nữ phải sống qua nhiều gia đình nhận nuôi khác nhau sau khi mẹ ruột, Ingrid, bị kết án tù vì tội giết người tình cũ. Qua mỗi mái ấm tạm bợ, Astrid trải nghiệm những mối quan hệ phức tạp và tổn thương, dần định hình bản sắc của riêng mình. Xuyên suốt phim là mối quan hệ mẹ con đầy ám ảnh giữa Astrid và Ingrid qua những lá thư từ trong tù."],
      ["Inside Llewyn Davis", "2014", undefined, "Phim lấy bối cảnh khu Greenwich Village, New York năm 1961, xoay quanh Llewyn Davis, một ca sĩ nhạc dân gian tài năng nhưng chật vật mưu sinh. Sau cái chết của người bạn diễn cũ, anh lang bạt qua nhiều thành phố, gặp gỡ nhiều nhân vật, cố gắng tìm chỗ đứng cho sự nghiệp âm nhạc của mình. Bộ phim khắc họa vòng lặp bế tắc và cô đơn của một nghệ sĩ chưa gặp thời."],
      ["Goodfellas", "1990", undefined, "Phim kể về Henry Hill, một người đàn ông gốc Ý-Ailen lớn lên và gia nhập giới mafia ở New York từ khi còn nhỏ. Cùng với Jimmy Conway và Tommy DeVito, Henry tham gia vào các phi vụ trộm cắp, buôn lậu và bạo lực trong suốt nhiều thập niên. Cuộc sống hào nhoáng của hắn dần sụp đổ khi nghiện ngập và sự nghi kỵ trong băng đảng đẩy hắn đến bờ vực phản bội."],
      ["The Greatest Showman", "2017", undefined, "Phim lấy cảm hứng từ cuộc đời P.T. Barnum, người đàn ông từ tay trắng gây dựng nên một gánh xiếc quy tụ những nghệ sĩ bị xã hội xa lánh. Ông biến đoàn xiếc thành hiện tượng giải trí nổi tiếng, mang đến ánh hào quang cho những con người từng bị coi là dị biệt. Bộ phim ca nhạc kết hợp giữa tham vọng, tình yêu gia đình và thông điệp về việc chấp nhận sự khác biệt."],
      ["Cold War", "2018", undefined, "Phim kể về mối tình đầy trắc trở giữa Wiktor, một nhạc trưởng, và Zula, nữ ca sĩ trẻ trong một đoàn nghệ thuật dân gian thời Ba Lan cộng sản. Trải qua nhiều năm, hai người gặp gỡ rồi chia lìa nhiều lần giữa hai bên bức màn sắt Đông và Tây Âu. Câu chuyện tình yêu định mệnh của họ phản chiếu bối cảnh chính trị căng thẳng thời Chiến tranh Lạnh."],
      ["Sylvia", "2003", undefined, "Phim kể về cuộc đời nữ thi sĩ Sylvia Plath, từ khi gặp gỡ và kết hôn với nhà thơ Ted Hughes cho đến những năm tháng cuối đời đầy giông bão. Mối quan hệ giữa hai người dần rạn nứt vì sự phản bội và áp lực từ sự nghiệp sáng tác của cả hai. Phim khắc họa những đấu tranh nội tâm và chứng trầm cảm đã dẫn Sylvia đến bi kịch tự kết liễu đời mình."],
      ["Fargo", undefined, undefined, "Phim kể về Jerry Lundegaard, một nhân viên bán xe ở Minnesota đang ngập trong nợ nần, thuê hai tên tội phạm bắt cóc chính vợ mình để đòi tiền chuộc từ bố vợ giàu có. Kế hoạch nhanh chóng đổ vỡ khi vụ bắt cóc dẫn đến một loạt vụ giết người đẫm máu. Marge Gunderson, nữ cảnh sát trưởng đang mang thai, vào cuộc điều tra và dần lần ra sự thật đằng sau chuỗi tội ác này."],
      ["Molly's Game", undefined, undefined, "Phim dựa trên câu chuyện có thật về Molly Bloom, cựu vận động viên trượt tuyết chuyển sang tổ chức các sòng bạc poker bí mật cho giới nhà giàu và người nổi tiếng. Từ Los Angeles đến New York, đường dây cờ bạc của cô ngày càng lớn mạnh và thu hút sự chú ý của cả giới tội phạm lẫn FBI. Molly cuối cùng bị bắt giữ và phải đấu tranh pháp lý để bảo vệ bản thân cũng như những người liên quan."],
      ["Tenet", undefined, undefined, "Phim theo chân một điệp viên bí ẩn được gọi là Protagonist, người được tuyển vào một tổ chức tình báo tối mật mang tên Tenet. Anh khám phá ra công nghệ đảo ngược thời gian entropy, cho phép các vật thể và con người di chuyển ngược dòng thời gian. Protagonist phải ngăn chặn một âm mưu sử dụng công nghệ này để hủy diệt cả thế giới hiện tại và tương lai."],
      ["Dances With Wolves", undefined, undefined, "Phim kể về trung úy John Dunbar, một sĩ quan quân đội Liên bang trong thời Nội chiến Mỹ, được cử đến đồn trú tại một tiền đồn hẻo lánh ở miền Tây. Qua thời gian, anh dần kết thân và hòa nhập với bộ lạc người da đỏ Sioux sống gần đó, học ngôn ngữ và văn hóa của họ. Khi mâu thuẫn giữa quân đội Mỹ và người bản địa leo thang, Dunbar phải đối mặt với sự lựa chọn giữa lòng trung thành cũ và cuộc sống mới mà anh đã chọn."],
      ["Let Him Go", undefined, undefined, "Phim kể về George và Margaret Blackledge, cặp vợ chồng lớn tuổi ở Montana, sau khi con trai qua đời thì con dâu tái hôn và mang cháu trai của họ đi cùng gia đình chồng mới. Lo sợ cho sự an toàn của cháu, hai ông bà lên đường tìm đến gia đình Weboy để đưa cháu trở về. Họ dần phát hiện gia đình này ẩn chứa bản chất nguy hiểm và bạo lực, đẩy họ vào một cuộc đối đầu sinh tử."],
      ["Yellowstone", "series", undefined, "Phim truyền hình xoay quanh gia đình Dutton, chủ sở hữu trang trại chăn nuôi rộng lớn nhất nước Mỹ liền kề Công viên Quốc gia Yellowstone. Gia trưởng John Dutton cùng các con phải liên tục đấu tranh để bảo vệ vùng đất tổ tiên trước sự dòm ngó của các nhà phát triển bất động sản, khu bảo tồn của người bản địa và chính quyền địa phương. Loạt phim khắc họa những mâu thuẫn quyền lực, gia đình và bạo lực gắn liền với vùng đất miền Tây nước Mỹ hiện đại."],
      ["A Life On Our Planet", "2020", undefined, "Đây là bộ phim tài liệu do nhà tự nhiên học David Attenborough dẫn dắt, nhìn lại toàn cảnh sự suy thoái của thiên nhiên trên Trái Đất qua gần một thế kỷ ông chứng kiến. Phim trình bày những con số đáng báo động về mất đa dạng sinh học, biến đổi khí hậu và sự tàn phá môi trường sống do con người gây ra. Cuối phim, Attenborough đưa ra tầm nhìn và giải pháp để phục hồi hành tinh cho các thế hệ tương lai."],
      ["Kiss The Ground", undefined, undefined, "Đây là bộ phim tài liệu do Woody Harrelson dẫn chuyện, tập trung vào vai trò của đất đai và nông nghiệp tái sinh trong việc chống lại biến đổi khí hậu. Phim chỉ ra rằng các phương pháp canh tác công nghiệp đang làm suy thoái đất, trong khi nông nghiệp tái sinh có thể giúp phục hồi đất và hấp thụ lượng lớn carbon. Thông qua các chuyên gia và nông dân, phim đưa ra thông điệp lạc quan rằng đất khỏe mạnh có thể là chìa khóa cứu vãn khí hậu Trái Đất."],
      ["Babette's Feast", "1987", "Cuisine.", "Phim lấy bối cảnh một ngôi làng nhỏ hẻo lánh ở Đan Mạch, nơi hai chị em độc thân sống mộ đạo giản dị cùng cộng đồng theo giáo phái khắc kỷ. Babette, một phụ nữ Pháp tị nạn, đến ở cùng họ và làm người giúp việc trong nhiều năm trước khi bất ngờ trúng số. Cô dùng toàn bộ số tiền để chuẩn bị một bữa tiệc thịnh soạn kiểu Pháp cho dân làng, qua đó hé lộ sức mạnh chữa lành của nghệ thuật ẩm thực và lòng hào phóng."],
      ["Invictus", "2009", "Matt Damon, Morgan Freeman.", "Phim tái hiện giai đoạn Nelson Mandela mới trở thành Tổng thống Nam Phi sau khi chế độ phân biệt chủng tộc apartheid sụp đổ, đất nước còn chia rẽ sâu sắc. Mandela nhìn thấy cơ hội đoàn kết dân tộc qua đội tuyển bóng bầu dục quốc gia Springboks, khi đó chuẩn bị đăng cai và tham dự Giải vô địch Thế giới Rugby 1995. Ông hợp tác với đội trưởng Francois Pienaar để biến hành trình của đội tuyển thành biểu tượng hòa giải giữa các cộng đồng người Nam Phi."],
    ],
  },
];

/* ============================================================
   MOODS — every film below is tagged with 1-3 of these via MOOD_TAGS
   ============================================================ */
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

// title -> [moodId, ...] — every film in FILMS has at least one entry here.
const MOOD_TAGS = {
  "1917": ["thrill","culture"],
  "Watership Down": ["adventure","sad"],
  "Forrest Gump": ["heartwarming","motivate"],
  "12 Years A Slave": ["sad","culture"],
  "12 Angry Men": ["mindbend","thrill"],
  "Girl Interrupted": ["sad","solitude"],
  "One Flew Over The Cuckoo's Nest": ["motivate","sad"],
  "Pulp Fiction": ["fun","mindbend"],
  "The Shawshank Redemption": ["motivate","heartwarming"],
  "Mùa Len Trâu": ["culture","sad"],
  "Life Is Beautiful": ["sad","heartwarming","culture"],
  "It's A Wonderful Life": ["heartwarming","motivate"],
  "Schindler's List": ["sad","culture"],
  "The Pianist": ["sad","culture"],
  "The Intouchables": ["heartwarming","fun"],
  "Django Unchained": ["thrill","culture"],
  "The Help": ["culture","heartwarming"],
  "Slumdog Millionaire": ["motivate","romance"],
  "The Kite Runner": ["sad","heal"],
  "To Kill A Mocking Bird": ["culture","motivate"],
  "The Book Thief": ["sad","culture"],
  "Unbroken": ["motivate","culture"],
  "Platoon": ["culture","thrill"],
  "The Green Mile": ["sad","heal"],
  "The Godfather": ["thrill","culture"],
  "Jojo Rabbit": ["fun","culture","heartwarming"],
  "All Quiet In Western Front": ["culture","sad"],
  "Oppenheimer": ["mindbend","culture"],
  "Parasite": ["thrill","mindbend"],
  "Us": ["eerie","thrill"],
  "The Hunt": ["sad","thrill"],
  "A Few Good Men": ["thrill","mindbend"],
  "Old Boy": ["eerie","thrill"],
  "The Platform": ["eerie","mindbend"],
  "Se7en": ["eerie","thrill"],
  "Black Swan": ["eerie","mindbend"],
  "Little Women": ["heartwarming","motivate"],
  "The Good, The Bad And The Ugly": ["adventure","thrill"],
  "The Curious Case Of Benjamin Button": ["sad","romance"],
  "Rain Man": ["sad","heartwarming"],
  "Spring, Summer, Fall, Winter... And Spring": ["heal","solitude"],
  "Cloud Atlas": ["mindbend","culture"],
  "The Man From Earth": ["mindbend","solitude"],
  "Room": ["sad","heal"],
  "Whiplash": ["motivate","thrill"],
  "The Pursuit Of Happyness": ["motivate","heartwarming"],
  "Philadelphia": ["sad","culture"],
  "Catch Me If You Can": ["fun","thrill"],
  "The Big Short": ["mindbend","culture"],
  "Citizen Kane": ["mindbend","solitude"],
  "Everything Everywhere All At Once": ["mindbend","heartwarming"],
  "Past Lives": ["heartbreak","romance"],
  "Killers Of The Flower Moon": ["culture","thrill"],
  "Taxi Driver": ["solitude","eerie"],
  "Won't You Be My Neighbor": ["heartwarming","heal"],
  "Three Billboards Outside Ebbing, Missouri": ["sad","thrill"],
  "Split": ["thrill","eerie","mindbend"],
  "Shutter Island": ["mindbend","eerie","thrill"],
  "Fight Club": ["mindbend","thrill"],
  "Inception": ["mindbend","adventure"],
  "Gone Girl": ["thrill","mindbend"],
  "Triangle": ["eerie","mindbend","thrill"],
  "Interstellar": ["mindbend","adventure"],
  "The Martian": ["motivate","adventure"],
  "Gravity": ["thrill","solitude"],
  "Mystic River": ["sad","thrill"],
  "The Prestige": ["mindbend","thrill"],
  "The Silence Of The Lambs": ["thrill","eerie"],
  "Memento": ["mindbend","thrill"],
  "The Wolf Of Wall Street": ["fun","culture"],
  "Inglourious Basterds": ["thrill","culture"],
  "Glass": ["thrill","mindbend"],
  "I'm Thinking Of Ending Things": ["mindbend","eerie"],
  "The Motorcycle Diaries": ["adventure","culture","motivate"],
  "Secret Life Of Walter Mitty": ["adventure","motivate"],
  "Tracks": ["adventure","solitude"],
  "Into The Wild": ["adventure","solitude","sad"],
  "Wild": ["adventure","heal","solitude"],
  "Up": ["heartwarming","adventure"],
  "The Bucket List": ["heartwarming","motivate","heal"],
  "Cast Away": ["solitude","motivate"],
  "Life Of Pi": ["adventure","solitude","heal"],
  "Everest": ["thrill","adventure"],
  "Gifted": ["heartwarming","motivate"],
  "Good Will Hunting": ["motivate","heal"],
  "Amadeus": ["culture","sad"],
  "The Imitation Game": ["motivate","sad","culture"],
  "X+Y (A Brilliant Young Mind)": ["motivate","heartwarming"],
  "The Theory Of Everything": ["motivate","romance","sad"],
  "A Beautiful Mind": ["motivate","mindbend"],
  "August Rush": ["heartwarming","romance"],
  "The Talented Mr Ripley": ["mindbend","thrill"],
  "Amélie": ["cozy","romance","heartwarming"],
  "Moonrise Kingdom": ["romance","cozy"],
  "The Grand Budapest Hotel": ["fun","adventure"],
  "Song Of The Sea": ["adventure","culture"],
  "Me And Earl And The Dying Girl": ["sad","heartwarming"],
  "American Beauty": ["sad","mindbend"],
  "Léon: The Professional": ["heartwarming","thrill"],
  "Frozen II": ["adventure","heartwarming"],
  "Little Forest": ["cozy","heal"],
  "Midnight In Paris": ["romance","culture","cozy"],
  "Boy, Mole, Fox, Horse": ["heal","heartwarming"],
  "Moonlight": ["sad","solitude"],
  "Brokeback Mountain": ["heartbreak","sad"],
  "Call Me By Your Name": ["romance","heartbreak"],
  "Manchester By The Sea": ["sad","solitude"],
  "Blue Is The Warmest Colour": ["romance","heartbreak"],
  "Chinese Botanist's Daughters": ["heartbreak","sad"],
  "Portrait Of A Lady On Fire": ["romance","heartbreak"],
  "Ammonite": ["romance"],
  "Carol": ["romance","heartbreak"],
  "Secret Love": ["romance","heartbreak"],
  "Love, Simon": ["heartwarming","motivate"],
  "Disobedience": ["heartbreak","romance"],
  "Pride & Prejudice": ["romance","cozy"],
  "Becoming Jane": ["heartbreak","romance"],
  "Marriage Story": ["heartbreak","sad"],
  "Love, Rosie": ["romance"],
  "Me Before You": ["heartbreak","sad"],
  "The Notebook": ["romance","sad"],
  "Eternal Sunshine Of The Spotless Mind": ["heartbreak","mindbend"],
  "500 Days Of Summer": ["heartbreak"],
  "Before Sunrise": ["romance"],
  "Before Sunset": ["romance"],
  "Before Midnight": ["romance"],
  "Stuck In Love": ["romance"],
  "5 Centimeters Per Second": ["heartbreak","sad"],
  "Begin Again": ["heal","motivate"],
  "One Day": ["romance","heartbreak"],
  "If I Stay": ["sad","heartbreak"],
  "Flipped": ["cozy","romance"],
  "The Fault In Our Stars": ["sad","heartbreak"],
  "The Longest Ride": ["romance"],
  "The Spectacular Now": ["romance"],
  "50 First Dates": ["fun","romance"],
  "The Great Gatsby": ["heartbreak","culture"],
  "Love Actually": ["romance","fun","heartwarming"],
  "About Time": ["heartwarming","romance"],
  "Lost In Translation": ["solitude","heartbreak"],
  "Tro Tàn Rực Rỡ": ["sad","solitude"],
  "Marry My Dead Body": ["fun","heartwarming"],
  "A Sun": ["sad","heal"],
  "Her": ["solitude","romance"],
  "The Usual Suspects": ["mindbend","thrill"],
  "First Cow": ["heartwarming","cozy"],
  "The Favourite": ["culture","mindbend"],
  "Pan's Labyrinth": ["sad","eerie","culture"],
  "The Lobster": ["mindbend","fun"],
  "Điều Kỳ Diệu Ở Phòng Giam Số 7": ["sad","heartwarming"],
  "Changeling": ["sad","motivate"],
  "Boyhood": ["cozy","solitude"],
  "A River Runs Through It": ["sad","solitude"],
  "Malèna": ["sad","culture"],
  "Salt": ["thrill","mindbend"],
  "Loving Vincent": ["culture","mindbend"],
  "A Star Is Born": ["heartbreak","sad"],
  "The Breakfast Club": ["fun","heartwarming"],
  "A League Of Their Own": ["motivate","heartwarming"],
  "The Perks Of Being A Wallflower": ["heal","sad","heartwarming"],
  "The Tree Of Life": ["solitude","mindbend"],
  "The Handmaiden": ["mindbend","romance","thrill"],
  "Dunkirk": ["thrill","culture"],
  "Lucy": ["fun","mindbend"],
  "Emma": ["romance","cozy"],
  "Lady Macbeth": ["sad","thrill"],
  "Mary Queen Of Scots": ["culture","sad"],
  "Mulholland Drive": ["mindbend","eerie"],
  "The Worst Person In The World": ["heal","romance"],
  "Drive My Car": ["sad","heal"],
  "The Place Beyond The Pines": ["sad","thrill"],
  "Palm Springs": ["fun","romance","mindbend"],
  "Never Rarely Sometimes Always": ["sad","solitude"],
  "The World To Come": ["sad","romance"],
  "My Octopus Teacher": ["heal","heartwarming"],
  "Somewhere": ["solitude","sad"],
  "I Am Sam": ["sad","heartwarming","motivate"],
  "Under The Skin": ["eerie","mindbend"],
  "CODA": ["heartwarming","motivate"],
  "Still Alice": ["sad"],
  "When Harry Met Sally": ["romance","fun"],
  "Collateral Beauty": ["sad","heal"],
  "Coco": ["heartwarming","culture"],
  "The Secret Life Of Pets": ["fun","heartwarming"],
  "Closer": ["heartbreak","sad"],
  "No Country For Old Men": ["thrill","eerie"],
  "BlacKkKlansman": ["culture","thrill"],
  "The Shape Of Water": ["romance","culture"],
  "Blade Runner 2049": ["mindbend","thrill"],
  "Ocean's 8": ["fun","thrill"],
  "Joker": ["sad","eerie","solitude"],
  "Tár": ["mindbend","sad"],
  "Soul": ["heal","heartwarming"],
  "Seven Years In Tibet": ["culture","heal"],
  "Chef": ["cozy","heartwarming"],
  "Harry Potter / Friends / Big Bang Theory / Hunger Games / GoT...": ["fun","adventure"],
  "Mr & Mrs Smith / Maleficent / The Tourist / By The Sea...": ["thrill","fun"],
  "Emily In Paris": ["fun","romance"],
  "Captain Phillips": ["thrill"],
  "Deadpool": ["fun","thrill"],
  "Dogtooth": ["eerie","mindbend"],
  "3 Idiots": ["motivate","heartwarming"],
  "All Is Lost": ["solitude","thrill"],
  "The King": ["culture","thrill"],
  "Brooklyn": ["romance","cozy"],
  "Little Miss Sunshine": ["heartwarming","fun"],
  "Last Christmas": ["romance","heartwarming"],
  "Eddie The Eagle": ["motivate","heartwarming"],
  "Monty Python And The Holy Grail": ["fun"],
  "Up In The Air": ["solitude","heal"],
  "The Proposal": ["romance","fun"],
  "The Words": ["mindbend","heal"],
  "IT": ["eerie","thrill"],
  "Noah": ["culture","thrill"],
  "Home Alone": ["fun","heartwarming"],
  "Lady Bird": ["heartwarming","heal"],
  "Mr Popper's Penguins": ["fun","heartwarming"],
  "This Is The End": ["fun"],
  "Hugo": ["adventure","heartwarming"],
  "Dumb And Dumber": ["fun"],
  "How To Train Your Dragon": ["adventure","heartwarming"],
  "Tangled": ["adventure","romance"],
  "Brave": ["adventure","heartwarming"],
  "Moana": ["adventure","motivate"],
  "Despicable Me": ["fun","heartwarming"],
  "Ice Age": ["adventure","fun"],
  "Big Hero 6": ["heartwarming","adventure"],
  "Hotel Transylvania": ["fun"],
  "Mamma Mia!": ["fun","romance"],
  "Bambi": ["sad","heartwarming"],
  "Inside Out": ["heal","heartwarming"],
  "Alice In Wonderland": ["adventure","mindbend"],
  "Spirited Away": ["adventure","mindbend"],
  "Tomorrow I Will Date With Yesterday You": ["romance","sad"],
  "Thor: Love And Thunder": ["adventure","fun"],
  "Turning Red": ["heartwarming","fun"],
  "Minions: The Rise Of Gru": ["fun","adventure"],
  "The Intern": ["heartwarming","cozy"],
  "Where The Crawdads Sing": ["solitude","sad","thrill"],
  "Enola Holmes": ["adventure","fun"],
  "Nu Family": ["heartwarming","fun"],
  "The Truth About Ikea": ["culture"],
  "The Gray Man": ["thrill"],
  "Guardians Of The Galaxy Vol. 3": ["adventure","heartwarming"],
  "Đất Rừng Phương Nam": ["culture","adventure"],
  "Wonka": ["fun","adventure"],
  "Remember The Titans": ["motivate","heartwarming","culture"],
  "Everybody Wants Some!!": ["fun","cozy"],
  "Psycho": ["eerie","thrill","mindbend"],
  "City Lights": ["romance","heartwarming","cozy"],
  "Princess Mononoke": ["adventure","heal"],
  "Once Upon A Time In The West": ["thrill","adventure"],
  "Once Upon A Time In America": ["sad","culture"],
  "American Psycho": ["eerie","mindbend"],
  "Bohemian Rhapsody": ["motivate","heartwarming"],
  "The Boy In The Striped Pajamas": ["sad","culture"],
  "Phantom Thread": ["mindbend","solitude"],
  "The Killing Of A Sacred Deer": ["eerie","mindbend","thrill"],
  "The Wild Pear Tree": ["solitude","heal"],
  "Bicycle Thieves": ["sad","culture"],
  "A Clockwork Orange": ["mindbend","eerie"],
  "White Oleander": ["sad","heal"],
  "Inside Llewyn Davis": ["sad","solitude"],
  "Goodfellas": ["thrill","culture"],
  "The Greatest Showman": ["motivate","fun","heartwarming"],
  "Cold War": ["heartbreak","romance","culture"],
  "The Aviator": ["motivate","mindbend"],
  "Sylvia": ["sad","heartbreak"],
  "Fargo": ["thrill","fun"],
  "Molly's Game": ["motivate","thrill"],
  "Tenet": ["mindbend","thrill"],
  "Dances With Wolves": ["adventure","culture"],
  "Let Him Go": ["thrill","eerie"],
  "Yellowstone": ["thrill","culture"],
  "A Life On Our Planet": ["motivate","culture"],
  "Kiss The Ground": ["motivate","culture"],
  "Babette's Feast": ["heartwarming","heal","cozy"],
  "Invictus": ["motivate","culture","heartwarming"],
  "Grave Of The Fireflies": ["sad","culture"],
  "A Man Called Ove": ["heartwarming","heal"],
  "Big Fish": ["heartwarming","adventure"],
  "Minari": ["culture","heartwarming"],
  "Birdman": ["mindbend","solitude"],
  "Beautiful Boy": ["sad","heartwarming"],
  "The Irishman": ["culture","sad","solitude"],
  "Under The Silver Lake": ["mindbend","eerie"],
  "The Banshees Of Inisherin": ["sad","fun"],
  "Vertigo": ["mindbend","eerie","romance"],
  "Magnolia": ["sad","mindbend"],
  "Poor Things": ["adventure","mindbend","fun"],
  "The Matrix": ["mindbend","thrill"],
  "F1": ["thrill","motivate"],
  "Synecdoche, New York": ["mindbend","solitude"],
  "Requiem For A Dream": ["eerie","sad"],
  "The Odyssey": ["adventure","thrill"],
  "Ford V Ferrari": ["motivate","thrill","adventure"],
  "The King's Speech": ["motivate","heartwarming"],
  "The Taste Of Things": ["romance","cozy"],
  "Flow": ["adventure","heartwarming"],
  "All Of Us Strangers": ["sad","romance","solitude"],
  "The Power Of The Dog": ["mindbend","eerie"],
  "Silver Linings Playbook": ["romance","heal"],
  "Meet Joe Black": ["romance","mindbend"],
  "Kramer Vs. Kramer": ["sad","heartwarming"],
  "One Battle After Another": ["thrill","culture"],
  "The Glass Castle": ["sad","heartwarming"],
  "A Brighter Summer Day": ["culture","sad"],
  "Sound Of Metal": ["heal","sad"],
  "The Squid And The Whale": ["sad","culture"],
  "Hamnet": ["sad","heal"],
  "Sentimental Value": ["sad","culture"],
  "The Outrun": ["heal","solitude"],
  "The Sunset Limited": ["mindbend","heal"],
  "The Whale": ["sad","heartwarming"],
  "Chị Dâu": ["culture","heartwarming","fun"],
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
            <span style={{ fontWeight: 600 }}>{title}</span>
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
export default function Film() {
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
    FILMS.forEach((g) => {
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
    FILMS.forEach((g) => {
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
            Film
          </h1>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontStyle: "italic", fontSize: 14.8, lineHeight: 1.62, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 14 }}>
            {INTRO}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 12.3, color: MUTE, marginTop: 9 }}>
            “All that we love deeply becomes part of us.” — Helen Keller
          </div>
        </div>

        <input
          type="text"
          placeholder="Tìm phim, đạo diễn, ghi chú..."
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
              {activeMood.icon} {activeMood.label} · {moodMatches.length} phim
            </div>
            {moodMatches.map((m, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 11 }}>
                <div style={{ fontFamily: SANS, fontSize: 10.3, color: MUTE, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {m.group}
                  {m.sub ? ` · ${m.sub}` : ""}
                </div>
                <div style={{ fontSize: 14.3 }}>
                  <span style={{ fontWeight: 600 }}>{m.title}</span>
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
                  <span style={{ fontWeight: 600 }}>{m.title}</span>
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
            {FILMS.map((g, i) => (
              <GroupCard key={i} group={g} isOpen={!!openMap[i]} onToggle={() => toggleGroup(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
