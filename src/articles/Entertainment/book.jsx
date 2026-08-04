import React, { useState, useMemo } from "react";

const ACCENT = "#B8562F";
const INK = "#2B2117";
const MUTE = "#9C8C7C";
const NOTE = "#7A6A5C";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#FBEEF3";
const CARD = "#FFFFFF";
const LINE = "#F0DCE3";

const INTRO = "Mỗi quyển sách là sự cô đặc chất xám mà thông qua đó ta có thể du hành tới những vùng đất khác, con người khác, triết lý khác, thế giới quan khác...";

/* ============================================================
   BOOKS
   ============================================================ */
const BOOKS = [
  {
    t: "I. Kinh điển",
    n: 62,
    items: [
      ["Đồi Thỏ", "Richard Adams", null, "Watership Down kể về hành trình của một nhóm thỏ rời bỏ hang ổ bị đe dọa phá hủy để tìm một nơi ở mới an toàn hơn. Trên đường đi chúng đối mặt hiểm nguy từ thiên nhiên, kẻ săn mồi và cả những xã hội thỏ khác có luật lệ hà khắc. Tác phẩm mang dáng dấp sử thi phiêu lưu dành cho thiếu nhi nhưng ẩn chứa suy tưởng sâu sắc về tự do, lãnh đạo và bản chất cộng đồng."],
      ["Người Đàn Ông Mỹ Cuối Cùng", "Elizabeth Gilbert"],
      ["Walden - Một Mình Ở Trong Rừng", "Henry David Thoreau"],
      ["Tôi, Charley Và Hành Trình Nước Mỹ", "John Steinbeck"],
      ["The Drifters - 6 Người Đi Khắp Thế Gian", "James A. Michener"],
      ["Thiền Và Nghệ Thuật Bảo Dưỡng Xe Máy", "Robert M. Pirsig"],
      ["Suối Nguồn", "Ayn Rand"],
      ["Forrest Gump", "Winston Groom"],
      ["Ba Gã Cùng Thuyền", "Jerome K. Jerome"],
      ["Anne Tóc Đỏ Dưới Chái Nhà Xanh", "L.M. Montgomery"],
      ["Những Kỳ Vọng Lớn Lao", "Charles Dickens"],
      ["Trên Đường", "Jack Kerouac"],
      ["Người Đua Diều", "Khaled Hosseini"],
      ["Little Women, Good Wives", "Louisa May Alcott"],
      ["Của Chuột Và Người", "John Steinbeck"],
      ["Bắt Trẻ Đồng Xanh", "J.D. Salinger"],
      ["Bay Trên Tổ Chim Cúc Cu", "Ken Kesey"],
      ["Chúa Ruồi", "William Golding"],
      ["Chiến Binh Cầu Vồng", "Andrea Hirata"],
      ["Chú Bé Mang Pyjama Sọc", "John Boyne"],
      ["Những Đứa Con Của Tự Do", "Marc Levy"],
      ["Vừa Nhắm Mắt Vừa Mở Cửa Sổ", "Nguyễn Ngọc Thuần"],
      ["Hoàng Tử Bé", "Antoine De Saint-Exupéry"],
      ["Khi Hơi Thở Hóa Thinh Không", "Paul Kalanithi"],
      ["Nơi Dòng Sông Chảy Qua", "Norman Maclean"],
      ["Tất Cả Các Dòng Sông Đều Chảy", "Nancy Cato"],
      ["Chùm Nho Phẫn Nộ", "John Steinbeck"],
      ["Trăm Năm Cô Đơn", "Gabriel García Márquez"],
      ["Con Đường Hồi Giáo", "Phương Mai Nguyễn"],
      ["Hành Trình Về Phương Đông", "Baird T. Spalding"],
      ["Hải Trình Kon-Tiki", "Thor Heyerdahl"],
      ["Vào Trong Hoang Dã", "Jon Krakauer"],
      ["Hương Rừng Cà Mau", "Sơn Nam"],
      ["Muôn Kiếp Nhân Sinh", "Nguyên Phong"],
      ["Cuộc Cách Mạng Một-Cọng-Rơm", "Masanobu Fukuoka"],
      ["Khởi Sinh Của Cô Độc", "Paul Auster"],
      ["Rừng Na Uy", "Haruki Murakami"],
      ["Thiên Táng", "Xinran"],
      ["Kiêu Hãnh Và Định Kiến", "Jane Austen"],
      ["Tiếng Chim Hót Trong Bụi Mận Gai", "Colleen McCullough"],
      ["Tội Ác Và Trừng Phạt", "Fyodor Dostoyevsky"],
      ["Phía Đông Vườn Địa Đàng", "John Steinbeck"],
      ["Giết Con Chim Nhại", "Harper Lee"],
      ["Brokeback Mountain", "Annie Proulx"],
      ["Người Khổng Lồ Nghiêng Vai", "Ayn Rand", "Chưa đọc"],
      ["Bố Già", "Mario Puzo"],
      ["Hãy Chăm Sóc Mẹ", "Shin Kyung-Sook"],
      ["Đại Gia Gatsby", "F. Scott Fitzgerald"],
      ["Ông Trăm Tuổi Trèo Qua Cửa Sổ Và Biến Mất", "Jonas Jonasson"],
      ["Cloud Atlas", "David Mitchell"],
      ["Nhà Giả Kim", "Paulo Coelho"],
      ["Lại Thằng Nhóc Emil!", "Astrid Lindgren"],
      ["Cánh Đồng Bất Tận", "Nguyễn Ngọc Tư"],
      ["Trại Súc Vật", "George Orwell"],
      ["1984", "George Orwell"],
      ["Chết Ở Venice", "Thomas Mann"],
      ["Diary Of A Wimpy Kid", "Jeff Kinney"],
      ["Lịch Sử Khẩn Hoang Miền Nam", "Sơn Nam"],
      ["The Hidden Life Of Trees", "Peter Wohlleben"],
      ["Educated", "Tara Westover"],
      ["Flow", "Mihaly Csikszentmihalyi"],
      ["A Man Called Ove", "Fredrik Backman"],
    ],
  },
  {
    t: "II. Thường thức",
    n: 57,
    sub: [
      {
        t: "Kinh tế",
        items: [
          ["Ứng Xử Với Trung Quốc", "Henry M. Paulson Jr."],
          ["Wealth, Poverty And Politics", "Thomas Sowell"],
          ["Những Ông Trùm Tài Chính", "Liaquat Ahamed"],
          ["Lịch Sử Bí Mật Đế Chế Hoa Kỳ", "John Perkins"],
          ["Thế Giới Phẳng", "Thomas L. Friedman"],
          ["Energy: A Human History", "Richard Rhodes"],
          ["Chiến Tranh Tiền Tệ", "Song Hongbing"],
          ["Lời Tự Thú Của Sát Thủ Kinh Tế", "John Perkins"],
          ["Kinh Tế Học Hài Hước", "Steven D. Levitt & Stephen J. Dubner"],
          ["Chiếc Lexus Và Cây Ô Liu", "Thomas L. Friedman"],
          ["Nhà Đầu Tư Thông Minh", "Benjamin Graham"],
          ["Thế Giới Rộng Lớn Và Có Nhiều Việc Phải Làm", "Kim Woo-Choong"],
          ["Thịnh Vượng Tài Chính Tuổi 30", "Go Deuk Seong"],
          ["Tiền Không Mua Được Gì?", "Michael J. Sandel"],
          ["Đừng Bao Giờ Đi Ăn Một Mình", "Keith Ferrazzi"],
          ["Chiến Lược Đại Dương Xanh", "W. Chan Kim"],
        ],
      },
      {
        t: "Vật lý",
        items: [
          ["Bản Thiết Kế Vĩ Đại", "Stephen Hawking"],
          ["Các Thế Giới Song Song", "Michio Kaku"],
          ["Thế Giới Lượng Tử Kỳ Bí", "Silvia Arroyo Camejo"],
          ["Vũ Trụ Trong Vỏ Hạt Dẻ", "Stephen Hawking"],
          ["Lược Sử Thời Gian", "Stephen Hawking"],
        ],
      },
      {
        t: "Lịch sử, Địa lý",
        items: [
          ["Sapiens: Lược Sử Loài Người", "Yuval Noah Harari"],
          ["Súng, Vi Trùng Và Thép", "Jared Diamond"],
          ["Lược Sử Vạn Vật", "Bill Bryson"],
          ["Lịch Sử Văn Minh Thế Giới", "Vũ Dương Ninh"],
          ["Tôi, Tương Lai & Thế Giới", "Nguyễn Phi Vân"],
          ["Lịch Sử Trung Đông 2.000 Năm Trở Lại Đây", "Bernard Lewis"],
          ["The Silk Road", "Peter Frankopan", "Chưa đọc"],
          ["Những Tù Nhân Của Địa Lý", "Tim Marshall", "Chưa đọc"],
          ["Sử Việt, 12 Khúc Tráng Ca", "Dũng Phan"],
        ],
      },
      {
        t: "Sinh học",
        items: [
          ["Dòng Sông Trôi Khuất Địa Đàng", "Richard Dawkins"],
          ["Đời Sống Bí Ẩn Của Cây", "Peter Wohlleben"],
          ["Nguồn Gốc Các Loài", "Charles Darwin"],
          ["Về Bản Tính Người", "Edward O. Wilson"],
        ],
      },
      {
        t: "Công nghệ",
        items: [
          ["Permanent Record", "Edward Snowden", "Chưa đọc"],
          ["The Big Nine", "Amy Webb"],
          ["Công Nghệ Blockchain", "Don Tapscott"],
        ],
      },
      {
        t: "Đời sống / Khác",
        items: [
          ["Năng Lượng Sống Từ Thảo Dược", "Rosalee De La Forêt"],
          ["Nhân Tố Enzyme", "Hiromi Shinya"],
          ["Ăn Sao Không Chết", "Michael Greger"],
          ["Ăn Gì Cho Không Độc Hại", "Pha Lê"],
          ["Chào Juice", "Trần Thanh Huyền"],
          ["Ý Tưởng Này Là Của Chúng Mình", "Huỳnh Vĩnh Sơn"],
          ["Thing Explainer", "Randall Munroe"],
          ["Cãi Gì Cũng Thắng", "Madsen Pirie"],
          ["Viết Gì Cũng Đúng", "Anthony Weston"],
          ["Phi Lý Trí", "Dan Ariely"],
          ["Tư Duy Nhanh Và Chậm", "Daniel Kahneman"],
          ["Điểm Bùng Phát", "Malcolm Gladwell"],
          ["Chờ Đến Mẫu Giáo Thì Đã Muộn", "Masaru Ibuka"],
          ["Cuốn Sách Hoàn Hảo Về Ngôn Ngữ Cơ Thể", "Allan Pease"],
          ["Bạn Không Thông Minh Lắm Đâu", "David McRaney"],
          ["Dám Bị Ghét", "Fumitake Koga"],
          ["Scrum Và XP Từ Các Chiến Hào", "Henrik Kniberg"],
          ["Don't Make Me Think", "Steve Krug"],
          ["Ngôn Ngữ Cơ Thể", "Allan & Barbara Pease"],
          ["100 Kĩ Năng Sinh Tồn", "Clint Emerson"],
        ],
      },
      {
        t: "Văn học",
        items: [["The Story Of English / Language Story", "David Crystal"]],
      },
    ],
  },
  {
    t: "III. Du ký",
    n: 13,
    items: [
      ["Mật Mã Tây Tạng", "Hà Mã"],
      ["Chân Đi Không Mỏi", "Hằng Đinh"],
      ["Từ Rừng Thẳm Amazon Đến Quê Hương Bolero", "Nguyễn Tập"],
      ["Mekong - Phù Sa Phiêu Bạt", "Khải Đơn"],
      ["Tiếng Gọi Nơi Hoang Dã", "Jack London"],
      ["Cuộc Đời Của Pi", "Yann Martel"],
      ["Dế Mèn Phiêu Lưu Ký", "Tô Hoài"],
      ["Gulliver Du Ký", "Jonathan Swift"],
      ["Hai Vạn Dặm Dưới Đáy Biển", "Jules Verne"],
      ["Kỳ Bí Dòng Sông Sôi Trong Lòng Amazon", "Andrés Ruzo"],
      ["Đột Nhiên Đến Tây Tạng", "Trần Khôn"],
      ["Bước Chân Việt Nam - 4 Cực 1 Đỉnh", "Ngô Huy Hòa"],
      ["Nhắm Mắt Thấy Paris", "Dương Thụy"],
    ],
  },
  {
    t: "IV. Triết",
    n: 15,
    items: [
      ["Tự Do Đầu Tiên Và Cuối Cùng", "Jiddu Krishnamurti"],
      ["Suy Nghĩ Vẩn Vơ Của Kẻ Nhàn Rỗi", "Jerome K. Jerome"],
      ["Nỗi Lo Âu Về Địa Vị", "Alain de Botton"],
      ["Luận Về Yêu", "Alain de Botton"],
      ["Suy Tưởng", "Marcus Aurelius"],
      ["Trò Chuyện Với Vĩ Nhân", "Osho"],
      ["Plato Và Con Thú Mỏ Vịt Bước Vào Quán Bar", "Thomas Cathcart"],
      ["Đạo Đức Kinh", "Lão Tử"],
      ["Lĩnh Nam Chích Quái", "Trần Thế Pháp"],
      ["Sổ Tay Nhà Thôi Miên", "Cao Minh"],
      ["Thiên Tài Bên Trái, Kẻ Điên Bên Phải", "Ming Gao"],
      ["Thiền: Tự Do Đầu Tiên Và Cuối Cùng", "Osho"],
      ["The Daily Stoic", "Ryan Holiday"],
      ["The Myth Of Sisyphus", "Albert Camus"],
      ["Love", "Osho"],
    ],
  },
  {
    t: "V. Tiểu sử",
    n: 6,
    items: [
      ["Angelina Jolie - Bản Sắc Một Huyền Thoại", "Kay"],
      ["Anne Frank", "Alicja Kaczyńska"],
      ["Bùi Kiến Thành - Người Mở Khóa Lãng Du", "Lê Xuân Khoa"],
      ["Madame Nhu - Quyền Lực Bà Rồng", "Monique Brinson Demery"],
      ["Nhật Ký Đặng Thùy Trâm", "Đặng Thùy Trâm"],
      ["Bắt Đầu Từ Một Kết Thúc", "Lý Minh Tùng"],
    ],
  },
  {
    t: "VI. Self-help",
    n: 14,
    items: [
      ["Happiness - A Philosopher's Guide", "Frédéric Lenoir"],
      ["Hygge - The Danish Art Of Happiness", "Marie Tourell Søderberg"],
      ["Lagom - The Swedish Art Of Balanced Living", "Linnea Dunne"],
      ["Sisu - Vượt Qua Tất Cả", "Katja Pantzar"],
      ["Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm", "Mark Manson"],
      ["Đi Tìm Lẽ Sống", "Viktor E. Frankl"],
      ["Tuổi Trẻ Đáng Giá Bao Nhiêu", "Rosie Nguyễn"],
      ["Mong Mọi Sự Gặp Gỡ Đều Đúng Thời Điểm", "DTT"],
      ["Mơ Những Giấc Mơ Mới", "Jai Pausch"],
      ["Ngày Thứ Ba Với Morrie", "Mitch Albom"],
      ["Sức Mạnh Của Hiện Tại", "Eckhart Tolle"],
      ["Nghĩ Giàu Làm Giàu", "Napoleon Hill"],
      ["999 Lá Thư Gửi Cho Chính Mình", "Miêu Công Tử"],
      ["1% Each Day", "Ngô Di Lân"],
    ],
  },
  {
    t: "VII. Việt Nam",
    n: 31,
    items: [
      ["Quảy Gánh Băng Đồng Ra Thế Giới", "Nguyễn Phi Vân"],
      ["Đừng Tháo Xuống Nụ Cười", "Khải Đơn"],
      ["Nỗi Buồn Chiến Tranh", "Bảo Ninh"],
      ["Tuổi Thơ Dữ Dội", "Phùng Quán"],
      ["Yêu Thương Là Tự Do", "Trần Lê Sơn Ý"],
      ["Quê Ngoại", "Hồ Dzếnh"],
      ["Trở Về Nơi Hoang Dã", "Trang Nguyễn"],
      ["Một Mình Ở Châu Âu", "Phan Việt"],
      ["Một Nghệ Thuật Sống", "Nguyễn Duy Cần"],
      ["Có Một Phố Vừa Đi Qua Phố", "Đinh Vũ Hoàng Nguyên"],
      ["Dăm Ba Cái Tuổi Trẻ", "Spiderum"],
      ["Hồn Bướm Mơ Tiên", "Khái Hưng"],
      ["Số Đỏ", "Vũ Trọng Phụng"],
      ["Vang Bóng Một Thời", "Nguyễn Tuân"],
      ["Một Cơn Gió Bụi", "Trần Trọng Kim"],
      ["Chuyến Tàu Một Chiều Không Trở Lại", "Kiên Trần"],
      ["Lập Trình Quỹ Đạo Cuộc Đời", "Kiên Trần"],
      ["Đừng Chạy Theo Đám Đông", "Kiên Trần"],
      ["Giang Hồ Chỉ Vừa Đủ Xài", "Trang Hạ"],
      ["Hai Mươi Bảy", "Đặng Huỳnh Mai Anh"],
      ["Người Tị Nạn", "Viet Thanh Nguyen"],
      ["Rèn Nghị Lực Để Lập Thân", "Nguyễn Hiến Lê"],
      ["Đàn Bà Ba Mươi", "Trang Hạ"],
      ["Chênh Vênh Hai Lăm", "Nguyễn Ngọc Thạch"],
      ["Tôi 20++", "Nick D."],
      ["Khóc Giữa Sài Gòn", "Nguyễn Ngọc Thạch"],
      ["Tớ Là Dâu", "Joe Ruelle"],
      ["Lỏng Và Tuột", "Trần Đức Tiến"],
      ["Bức Xúc Không Làm Ta Vô Can", "Đặng Hoàng Giang"],
      ["Một Đời Như Kẻ Tìm Đường", "Phan Văn Trường", "Đang đọc (30%)"],
      ["Hành Tinh Của Một Kẻ Nghĩ Nhiều", "Nguyễn Đoàn Minh Thư"],
    ],
  },
  {
    t: "VIII. Tiểu thuyết nước ngoài",
    n: 62,
    items: [
      ["Những Con Chim Ẩn Mình Chờ Chết", "Colleen McCullough"],
      ["Phía Nam Biên Giới, Phía Tây Mặt Trời", "Haruki Murakami"],
      ["Sự Im Lặng Của Bầy Cừu", "Thomas Harris"],
      ["Bức Tranh Dorian Gray", "Oscar Wilde"],
      ["The Perks Of Being A Wallflower", "Stephen Chbosky"],
      ["Sông Đông Êm Đềm", "Mikhail Sholokhov"],
      ["Ba Ơi, Mình Đi Đâu?", "Jean-Louis Fournier"],
      ["Cha Và Con", "Cormac McCarthy"],
      ["Con Đường Da Cam", "David Zierler"],
      ["Nỗi Cô Đơn Của Các Số Nguyên Tố", "Paolo Giordano"],
      ["Giáo Sư Và Công Thức Toán", "Yōko Ogawa"],
      ["Ngàn Mặt Trời Rực Rỡ", "Khaled Hosseini"],
      ["Cánh Cửa", "Magda Szabó"],
      ["Âm Thanh Và Cuồng Nộ", "William Faulkner"],
      ["Thiếu Nữ Đánh Cờ Vây", "Shan Sa"],
      ["Triệu Phú Khu Ổ Chuột", "Vikas Swarup"],
      ["Where Rainbows End", "Cecelia Ahern"],
      ["Nỗi Đau Của Chàng Werther", "Johann Wolfgang von Goethe"],
      ["Đo Thế Giới", "Daniel Kehlmann"],
      ["Hyperbole And A Half", "Allie Brosh"],
      ["Bí Kíp Quá Giang Vào Ngân Hà", "Douglas Adams"],
      ["Biên Niên Ký Chim Vặn Dây Cót", "Haruki Murakami"],
      ["Kafka Bên Bờ Biển", "Haruki Murakami"],
      ["Đồi Gió Hú", "Emily Brontë"],
      ["Sống Như Người Paris", "Anne Berest"],
      ["Trong Gia Đình", "Hector Malot"],
      ["Trại Trẻ Đặc Biệt Của Cô Peregrine", "Ransom Riggs"],
      ["Tình Yêu Thời Thổ Tả", "Gabriel García Márquez"],
      ["Túp Lều Bác Tom", "Harriet Beecher Stowe"],
      ["Utopia", "Thomas More"],
      ["Quần Đảo Ngục Tù", "Aleksandr Solzhenitsyn"],
      ["Ở Quán Cà Phê Của Tuổi Trẻ Lạc Lối", "Patrick Modiano"],
      ["Khi Lỗi Thuộc Về Những Vì Sao", "John Green"],
      ["Không Gia Đình", "Hector Malot"],
      ["Chai Thời Gian", "Prabhassorn Sevikul"],
      ["Ăn, Cầu Nguyện, Yêu", "Elizabeth Gilbert"],
      ["Tôi Nói Gì Khi Nói Về Chạy Bộ", "Haruki Murakami"],
      ["Lâu Đài Bay Của Pháp Sư Howl", "Diana Wynne Jones"],
      ["Lũ Trẻ Nhà Penderwicks", "Jeanne Birdsall"],
      ["Chuyến Phiêu Lưu Của Edward Tulane", "Kate DiCamillo"],
      ["Những Người Khốn Khổ", "Victor Hugo"],
      ["Trăng Lặn", "John Steinbeck"],
      ["Lolita", "Vladimir Nabokov"],
      ["Người Truyền Ký Ức", "Lois Lowry"],
      ["Oscar Và Bà Áo Hồng", "Éric-Emmanuel Schmitt"],
      ["Peter Pan", "J.M. Barrie"],
      ["Người Xa Lạ", "Albert Camus"],
      ["Thời Khắc", "Michael Cunningham"],
      ["Bí Ẩn Về Con Chó Lúc Nửa Đêm", "Mark Haddon"],
      ["Bố Là Bà Giúp Việc", "Anne Fine"],
      ["Chuyện Người Tùy Nữ", "Margaret Atwood"],
      ["Cô Gái Chơi Dương Cầm", "Elfriede Jelinek"],
      ["Hãy Đi Đặt Người Canh Gác", "Harper Lee"],
      ["Hồi Ức Của Một Geisha", "Arthur Golden"],
      ["Trường Hợp Kỳ Lạ Của Dr. Jekyll And Mr. Hyde", "Robert Louis Stevenson"],
      ["Kẻ Trộm Sách", "Markus Zusak"],
      ["Quả Chuông Ảo Mộng", "Sylvia Plath"],
      ["Xứ Con Người", "Antoine de Saint-Exupéry"],
      ["Châu Phi Nghìn Trùng", "Isak Dinesen"],
      ["The Martian", "Andy Weir"],
      ["Hiệu Sách Nhỏ Ở Paris", "Nina George"],
      ["Find Me (Call Me By Your Name)", "André Aciman"],
    ],
  },
  {
    t: "IX. Khác",
    n: 36,
    items: [
      ["Mùa Thu Của Cây Dương", "Kazumi Yumoto"],
      ["Little Men, Jo's Boys", "Louisa May Alcott"],
      ["Momo", "Michael Ende"],
      ["Máu Lạnh", "Truman Capote"],
      ["Mãi Yêu Con", "Robert Munsch"],
      ["Nanh Trắng", "Jack London"],
      ["Sherlock Holmes", "Arthur Conan Doyle"],
      ["Con Của Noé", "Éric-Emmanuel Schmitt"],
      ["Coraline", "Neil Gaiman"],
      ["Hóa Thân", "Franz Kafka"],
      ["Hẹn Em Ngày Đó", "Guillaume Musso"],
      ["Nghe Mùi Kết Thúc", "Julian Barnes"],
      ["Kira-Kira", "Cynthia Kadohata"],
      ["35 Ki Lô Hy Vọng", "Anna Gavalda"],
      ["Ami - Cậu Bé Vì Sao", "Enrique Barrios"],
      ["Ở Nhà Với Madame Chic", "Jennifer L. Scott"],
      ["Ba Sai Lầm Của Đời Tôi", "Chetan Bhagat"],
      ["Bob - Chú Mèo Đường Phố", "James Bowen"],
      ["Daring Greatly", "Brené Brown"],
      ["The Force - Sát Thủ Bán Hàng", "David Dorsey"],
      ["The Gifts Of Imperfection", "Brené Brown"],
      ["Khi Ta Mơ Quá Lâu", "Goh Poh Seng"],
      ["The Signature Of All Things", "Elizabeth Gilbert"],
      ["Gieo Trồng Trên Sa Mạc", "Masanobu Fukuoka"],
      ["Đấu Trường Sinh Tử", "Suzanne Collins"],
      ["Đỏ Trỗi Dậy", "Pierce Brown"],
      ["Tấm Vải Đỏ", "Hồng Nương Tử"],
      ["Nỗi Đau Của Đom Đóm", "QCN"],
      ["Kỳ Án Ánh Trăng", "QCN"],
      ["Luân Hồi: Đau Thương Đến Chết", "QCN"],
      ["Wonderful Life: The Burgess Shale And The Nature Of History", "Stephen Jay Gould"],
      ["The World Is What It Is (Biography Of V.S. Naipaul)", "Patrick French"],
      ["Làm Giàu Theo Cách Bá Đạo", "Jen Sincero"],
      ["How To Ace English", "Workman Publishing"],
      ["How To Live On 24 Hours A Day", "Arnold Bennett"],
      ["The Wisdom Of The Enneagram", "Don Richard Riso", "Đang đọc (50%)"],
    ],
  },
];

/* ============================================================
   RENDER HELPERS
   ============================================================ */
const SUMMARY_COLOR = "#4C6B80";

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
            <div style={{ fontFamily: SANS, fontSize: 12.2, color: SUMMARY_COLOR, lineHeight: 1.55, marginTop: 4 }}>
              {summary}
            </div>
          )}
          {note && (
            <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, lineHeight: 1.55, marginTop: 3, fontStyle: "italic" }}>
              {note}
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
          padding: "12px 16px", background: isOpen ? `${ACCENT}0F` : "transparent", border: "none",
          cursor: "pointer", fontFamily: SANS, textAlign: "left",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 13.3, color: INK }}>{group.t}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0, marginLeft: 10 }}>
          <span style={{ fontSize: 11, color: MUTE, fontWeight: 700, background: `${ACCENT}14`, padding: "2px 7px", borderRadius: 10 }}>
            {group.n}
          </span>
          <span style={{ display: "inline-block", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s", color: MUTE, fontSize: 11 }}>
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
export default function Book() {
  const [query, setQuery] = useState("");
  const [openMap, setOpenMap] = useState({ 0: true });

  const toggleGroup = (idx) => {
    setOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const flatMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const out = [];
    BOOKS.forEach((g) => {
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

  return (
    <div style={{ fontFamily: SERIF, background: PAPER, color: INK }}>
      <div style={{ padding: "26px 32px 60px", maxWidth: 1600, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 29, lineHeight: 1.16, margin: 0, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Book
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
          placeholder="Tìm sách, tác giả..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box", fontFamily: SANS, fontSize: 13.5,
            padding: "10px 14px", borderRadius: 8, border: `1px solid ${LINE}`, marginBottom: 20,
            outline: "none", background: CARD, color: INK,
          }}
        />

        {flatMatches ? (
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
                  <div style={{ fontFamily: SANS, fontSize: 12.2, color: SUMMARY_COLOR, marginTop: 4 }}>
                    {m.summary}
                  </div>
                )}
                {m.note && (
                  <div style={{ fontFamily: SANS, fontSize: 12.2, color: NOTE, fontStyle: "italic", marginTop: 3 }}>
                    {m.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {BOOKS.map((g, i) => (
              <GroupCard key={i} group={g} isOpen={!!openMap[i]} onToggle={() => toggleGroup(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
