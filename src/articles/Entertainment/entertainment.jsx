import React, { useState, useEffect, useMemo } from "react";
import { getSubTabFromUrl, syncSubTabToUrl } from "../../utils/subTabUrl";

const ACCENT = "#B8562F";
const INK = "#2B2117";
const MUTE = "#9C8C7C";
const NOTE = "#7A6A5C";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#FAF6F1";
const CARD = "#FFFFFF";
const LINE = "#EAE1D4";

const SUBTABS = [
  { id: "film", label: "Film" },
  { id: "books", label: "Books" },
];

const INTRO = {
  film: "Mỗi bộ phim là sự cô đặc chất xám, cả về nội dung, màu sắc, hình ảnh, âm thanh — mà thông qua đó ta có thể du hành tới những vùng đất khác, con người khác, triết lý khác, thế giới quan khác...",
  books: "Mỗi quyển sách là sự cô đặc chất xám mà thông qua đó ta có thể du hành tới những vùng đất khác, con người khác, triết lý khác, thế giới quan khác...",
};

/* ============================================================
   FILMS
   ============================================================ */
const FILMS = [
  {
    t: "I. Kinh điển",
    n: 54,
    sub: [
      {
        t: null,
        items: [
          ["Watership Down", "1978", "Mình thích thì mình bỏ vô list kinh điển nha :v Sách thì bị chôm rồi :v, sau ni đẻ thì mua lại đọc cho con =))) Với 30’ đọc mỗi tối cộng với kiểu siêu tưởng tượng, siêu hỏi nhiều của con nít thì mình sẽ đọc từ lúc nó chút éc tới khi nó vô lớp 1 là vừa hết sách = ))))"],
          ["Forrest Gump", "1994", "Cuộc đời đáng ngưỡng mộ của một chàng ngốc. “Life is like a box of chocolates, you never know what you’re gonna get.”"],
          ["12 Years A Slave", "2013", "Ám ảnh. Lịch sử về chế độ nô lệ một thời (là nguyên nhân, là cái giá mà Mỹ đang phải chịu cả về mặt kinh tế xã hội lẫn chính trị bây giờ chăng :)))"],
          ["12 Angry Men", "1957", "Nội dung, góc quay lẫn bố cục làm nên một tác phẩm đỉnh cao. 12 nét tính cách, cả xã hội thu nhỏ vừa bằng một bộ phim :)))"],
          ["Girl Interrupted", "1999", "Lại là Angie :)) Bonus thêm phim Gia (1998)."],
          ["One Flew Over The Cuckoo's Nest", "1975", "Ẵm tận ba giải Oscar thì phải, miễn bình luận. Sách siêu hay."],
          ["Pulp Fiction", "1994", "Phim của bạn Quentin, y cái tên, hết sức tào lao nhưng cực kì cuốn hút, thích kiểu thoại lúc nào cũng loằng ngoằng của bản. 1 ngụ ý rất thích trong phim: cái gì cũng vừa vừa thôi, túi may mắn của mỗi người không phải lúc nào cũng đầy không vơi. Cứ ỷ y thì banh xác đừng hỏi :))) (mỗi lần mình kéo ga lên 80 đều luôn lẩm nhẩm mấy lời ni, cơ mà có vẻ cũng không hiệu nghiệm lắm :3)"],
          ["The Shawshank Redemption", "1994", "Hành trình phá xích đi tới tự do. 9.2 IMDb :)))"],
          ["Mùa Len Trâu", "2004", "Cuộc sống và con người Nam Bộ, mùa nước nổi, mùa len trâu. Cuộc sống của những người đàn ông không kiểm soát được điều gì, ngay cả những con trâu của họ. Miền sông nước mộc mạc và chân thực, rất đời và tình người. Câu chuyện về hành trình trưởng thành từ cậu bé chăn trâu đến người đàn ông mạnh mẽ. Tính nhân văn giữa con người với con người và cả con vật."],
        ],
      },
      {
        t: "Về lịch sử một chút — những thứ trần trụi về Do Thái, phát xít Đức, chế độ nô lệ, sự bất bình đẳng",
        items: [
          ["Life Is Beautiful", "1997"],
          ["It's A Wonderful Life", "1946"],
          ["Schindler's List", "1993"],
          ["The Pianist", "2002", "Khi nghệ thuật vượt lên tất cả."],
          ["The Intouchables", "2011", "Nghệ thuật, cuộc sống và tình bạn."],
          ["Django Unchained", "2012"],
          ["The Help", "2011"],
          ["Slumdog Millionaire", "2008"],
          ["The Kite Runner", "2007"],
          ["To Kill A Mocking Bird", "1962"],
          ["The Book Thief", "2014"],
          ["Unbroken", "2014", "Angie đạo diễn :))) Nhớ cái cảnh nam chính vác khúc thép hay gì đó, nín cả thở. Hơi bị ám ảnh với mấy phim có phát xít Nhật."],
          ["Platoon", "1986", "Về chiến tranh Việt Nam."],
          ["The Green Mile", "1999", "Tom Hanks :))))"],
          ["The Godfather", "1972", "Đỉnh cao của vùng Sicily."],
          ["Jojo Rabbit", "2019"],
          ["All Quiet In Western Front", "2022"],
          ["Oppenheimer", "2023"],
        ],
      },
      {
        t: "Về tâm lý, xã hội, văn hóa",
        items: [
          ["Parasite", "2019"],
          ["Us", "2019"],
          ["The Hunt", "2012"],
          ["A Few Good Men", "1992"],
          ["Old Boy", "2003"],
          ["The Platform", "2020", "Hiện thực xã hội."],
          ["Se7en", "1995"],
          ["Black Swan", "2010"],
          ["Little Women", "2019", "Dàn cast lung linh (search mới biết nguyên tác văn học được viết năm 1868, trong thời kì Thoreau — Walden 1854 :)))"],
          ["The Good, The Bad And The Ugly", "1966", "Nghệ thuật miền viễn Tây."],
          ["The Curious Case Of Benjamin Button", "2008", "Cảm giác khi nhìn từng người yêu thương qua đời sẽ đáng sợ đến thế nào?"],
          ["Rain Man", "1988", "Buồn man mác."],
          ["Spring, Summer, Fall, Winter... And Spring", "2003", "Nhẹ nhàng sâu sắc, về nhân quả."],
          ["Cloud Atlas", "2012", "Lại về nhân quả, Tom Hanks :’)))) Phim hay, truyện hay, và nhạc phim siêu đỉnh. Bản lục tấu kì bí :’))))"],
          ["The Man From Earth", "2007", "Ngồi nghe chém gió tào lao mà hài lòng hết sức :)))"],
          ["Room", "2015", "Ám ảnh."],
          ["Whiplash", "2014", "Trống và Jazz, coi nhớ thở nhé."],
          ["The Pursuit Of Happyness", "2006", "Cha con nhà Will Smith :)))"],
          ["Philadelphia", "1993", "AIDS và đồng tính."],
          ["Catch Me If You Can", "2002", "Nể với độ thông minh, cười vì độ hài hước, buồn vì sự thật ẩn sau, mà trên hết coi vì 2 nam chính :)))"],
          ["The Big Short", "2015", "Hiểu hơn về khủng hoảng tài chính."],
          ["Citizen Kane", "1941", "Đế chế báo chí."],
          ["Everything Everywhere All At Once", "2022"],
          ["Past Lives", "2023"],
          ["Killers Of The Flower Moon", "2023"],
          ["Taxi Driver", "1976"],
          ["Won't You Be My Neighbor", "2018"],
          ["Three Billboards Outside Ebbing, Missouri", "2017"],
        ],
      },
    ],
  },
  {
    t: "II. Phía trên thì nặng não, còn dưới này là hại não",
    n: 19,
    items: [
      ["Split", "2017"],
      ["Shutter Island", "2010"],
      ["Fight Club", "1999"],
      ["Inception", "2010"],
      ["Gone Girl", "2014"],
      ["Triangle", "2009"],
      ["Interstellar", "2014"],
      ["The Martian", "2015"],
      ["Gravity", "2013"],
      ["Mystic River", "2003"],
      ["The Prestige", "2006"],
      ["The Silence Of The Lambs", "1991"],
      ["Memento", "2000"],
      ["The Wolf Of Wall Street", "2013"],
      ["Inglourious Basterds", "2009"],
      ["Glass", "2019"],
      ["I'm Thinking Of Ending Things", "2020"],
    ],
  },
  {
    t: "III. Xem xong muốn vác xe đi ngay",
    n: 10,
    items: [
      ["The Motorcycle Diaries", "2004", "Nhật kí của huyền thoại Nam Mỹ Che."],
      ["Secret Life Of Walter Mitty", "2013"],
      ["Tracks", "2013"],
      ["Into The Wild", "2007"],
      ["Wild", "2014"],
      ["Up", "2009"],
      ["The Bucket List", "2007"],
      ["Cast Away", "2000"],
      ["Life Of Pi", "2012"],
      ["Everest", "2015"],
    ],
  },
  {
    t: "IV. Kiểu cuộc đời của mấy thiên tài",
    n: 9,
    items: [
      ["Gifted", "2017"],
      ["Good Will Hunting", "1997", "Matt Damon :)))"],
      ["Amadeus", "1984"],
      ["The Imitation Game", "2014"],
      ["X+Y (A Brilliant Young Mind)", "2015"],
      ["The Theory Of Everything", "2014"],
      ["A Beautiful Mind", "2001"],
      ["August Rush", "2008"],
      ["The Talented Mr Ripley", "1999"],
    ],
  },
  {
    t: "V. Phim đẹp",
    n: 11,
    items: [
      ["Amélie", "2001", "Chuyển cảnh, bố cục, màu sắc và sự độc đáo phá cách đã làm nên một Paris tuyệt diệu. Biết qua bản nhạc phim, siêu siêu peaceful."],
      ["Moonrise Kingdom", "2012", "Dải vàng ấm áp trẻ trung trong bảng màu của bạn Wes Anderson."],
      ["The Grand Budapest Hotel", "2014", "Dải hồng giả tạo hay dải tím quý phái?"],
      ["Song Of The Sea", "2014", "Mãn nhãn với màu biển."],
      ["Me And Earl And The Dying Girl", "2015"],
      ["American Beauty", "1999"],
      ["Léon: The Professional", "1994"],
      ["Frozen II", "2019", "Nhạc phim hay, đồ họa đẹp."],
      ["Little Forest", "2014"],
      ["Midnight In Paris", "2011"],
      ["Boy, Mole, Fox, Horse", "2022"],
    ],
  },
  {
    t: "VI. LGBT",
    n: 12,
    items: [
      ["Moonlight", "2017"],
      ["Brokeback Mountain", "2005"],
      ["Call Me By Your Name", "2017", "Chất Ý miên man."],
      ["Manchester By The Sea", "2016"],
      ["Blue Is The Warmest Colour", "2013"],
      ["Chinese Botanist's Daughters", "2006"],
      ["Portrait Of A Lady On Fire", "2019", "Đẹp và buồn."],
      ["Ammonite", "2020"],
      ["Carol", "2017"],
      ["Secret Love", "2020"],
      ["Love, Simon", "2018"],
      ["Disobedience", "2011"],
    ],
  },
  {
    t: "VII. Phim tình cảm",
    n: 28,
    items: [
      ["Pride & Prejudice", "2005", "Xem đi xem lại hoài không chán. Keira."],
      ["Becoming Jane", "2007", "True love in reality. McAvoy với Anne Hathaway :))"],
      ["Marriage Story", "2019", "ScarJo với Adam Driver diễn chất quá."],
      ["Love, Rosie", "2014", "Niềm tin về tình yêu, anh giai Sam với chị gái Lily đẹp quá trời đất. Sách hay."],
      ["Me Before You", "2016", "Emilia Clarke vs Sam Claflin ♥"],
      ["The Notebook", "2004", "Sưng mắt."],
      ["Eternal Sunshine Of The Spotless Mind", "2004"],
      ["500 Days Of Summer", "2009", "Hành trình lớn não của một thanh niên ất ơ."],
      ["Before Sunrise", "1995"],
      ["Before Sunset", "2004"],
      ["Before Midnight", "2013"],
      ["Stuck In Love", "2012"],
      ["5 Centimeters Per Second", "2007"],
      ["Begin Again", "2014"],
      ["One Day", "2011"],
      ["If I Stay", "2014"],
      ["Flipped", "2010"],
      ["The Fault In Our Stars", "2014"],
      ["The Longest Ride", "2015"],
      ["The Spectacular Now", "2013"],
      ["50 First Dates", "2004"],
      ["The Great Gatsby", "2013"],
      ["Love Actually", "2003"],
      ["About Time", "2013"],
      ["Lost In Translation", "2003", "Nợ vài dòng với phim này :)))"],
      ["Tro Tàn Rực Rỡ", "2022", "Chỉ còn tro rực rỡ thôi."],
      ["Marry My Dead Body", "2023"],
      ["A Sun", "2019"],
    ],
  },
  {
    t: "VIII. Không biết xếp vô list gì nữa :3",
    n: 60,
    items: [
      ["Grave Of The Fireflies", "1988"],
      ["A Man Called Ove", "2015"],
      ["Big Fish", "2003"],
      ["Minari", "2021", "Phim đẹp."],
      ["Birdman", "2014", "Phim đẹp mà ngột ngạt với hành trình đi vào nội tâm và chiến đấu với bản ngã."],
      ["Beautiful Boy", "2018"],
      ["Her", "2013"],
      ["The Usual Suspects", "1995"],
      ["First Cow", "2019", "Cứ nghĩ tới Của Chuột Và Người."],
      ["The Favourite", "2018"],
      ["Pan's Labyrinth", "2006", "Dark fairytale, đẹp và buồn."],
      ["The Lobster", "2015", "Lộn hết cả não."],
      ["Điều Kỳ Diệu Ở Phòng Giam Số 7", "2013"],
      ["Changeling", "2008"],
      ["Boyhood", "2014", "Nhẹ nhàng, bình yên."],
      ["A River Runs Through It", "1992"],
      ["Malèna", "2000"],
      ["Salt", "2010"],
      ["Loving Vincent", "2017"],
      ["A Star Is Born", "2018"],
      ["The Breakfast Club", "1985"],
      ["A League Of Their Own", "1992"],
      ["The Perks Of Being A Wallflower", "2012", "Phim sách gì cũng hay. Nên đọc lúc khủng hoảng tuổi 17 ấy :)))"],
      ["The Tree Of Life", "2011"],
      ["The Handmaiden", "2016"],
      ["Dunkirk", "2017"],
      ["Lucy", "2014", "Kind of fun fiction story. Thích cái ý 10% used brain dù nó không hẳn đúng. Khi hiểu kiểu ẩn dụ: khi ta tăng mức nhận biết thế giới, ta cảm thụ nhiều hơn — giống đạo Phật, khi ta càng quay vào sâu bên trong, cái vô minh dần bị xóa, ta minh triết hơn và cảm thụ nhiều hơn."],
      ["Emma", "2020", "Góc máy rộng, phim đẹp, do mình hay ưu ái kiểu cổ trang Anh này nọ :v"],
      ["Lady Macbeth", "2016", "F. Pugh diễn xuất thần thiệt sự."],
      ["Mary Queen Of Scots", "2018", "Saoirse."],
      ["Mulholland Drive", "2001"],
      ["The Worst Person In The World", "2021"],
      ["Drive My Car", "2021"],
      ["The Place Beyond The Pines", "2012"],
      ["Palm Springs", "2020"],
      ["Never Rarely Sometimes Always", "2020"],
      ["The World To Come", "2020"],
      ["My Octopus Teacher", "2020"],
      ["Somewhere", "2010"],
      ["I Am Sam", "2001"],
      ["Under The Skin", "2013"],
      ["CODA", "2021"],
      ["Still Alice", "2014"],
      ["When Harry Met Sally", "1989"],
      ["Collateral Beauty", "2016"],
      ["Coco", "2017"],
      ["The Secret Life Of Pets", "2016"],
      ["Closer", "2004"],
      ["No Country For Old Men", "2007"],
      ["BlacKkKlansman", "2018"],
      ["The Shape Of Water", "2018"],
      ["Blade Runner 2049", "2017"],
      ["Ocean's 8", "2018"],
      ["Joker", "2019"],
      ["Tár", "2022"],
    ],
  },
  {
    t: "IX. Không biết xếp vô list gì nữa :3 (2)",
    n: 55,
    items: [
      ["Harry Potter / Friends / Big Bang Theory / Hunger Games / GoT...", "series"],
      ["Mr & Mrs Smith / Maleficent / The Tourist / By The Sea...", "misc"],
      ["Soul", "2020", "\"A spark isn't a soul's purpose — it's just a sign that you're ready to live life on earth.\" \"Best part of living isn't chasing ambition or catching hold of a fleeting dream — it's just living.\""],
      ["Seven Years In Tibet", "1997", "Mong cái cảm giác như khi đọc Mật Mã Tây Tạng hay Thiên Táng... mà có vẻ xem khi bị bão hòa nên không đúng ý."],
      ["Chef", "2014"],
      ["Emily In Paris", "2020"],
      ["Captain Phillips", "2013"],
      ["Deadpool", "2016"],
      ["Dogtooth", "2009"],
      ["3 Idiots", "2009"],
      ["All Is Lost", "2013"],
      ["The King", "2019"],
      ["Brooklyn", "2015"],
      ["Little Miss Sunshine", "2006"],
      ["Last Christmas", "2019"],
      ["Eddie The Eagle", "2016"],
      ["Monty Python And The Holy Grail", "1975"],
      ["Up In The Air", "2009"],
      ["The Proposal", "2009"],
      ["The Words", "2012"],
      ["IT", "2017"],
      ["Noah", "2014"],
      ["Home Alone", "1990"],
      ["Lady Bird", "2017", "Lại là tuổi nổi loạn."],
      ["Mr Popper's Penguins", "2011"],
      ["This Is The End", "2013", "Emmaaaa."],
      ["Hugo", "2011"],
      ["Dumb And Dumber", "1994"],
      ["How To Train Your Dragon", "2010"],
      ["Tangled", "2010"],
      ["Brave", "2012"],
      ["Moana", "2016"],
      ["Despicable Me", "2010"],
      ["Ice Age", "2002"],
      ["Big Hero 6", "2014"],
      ["Hotel Transylvania", "2012"],
      ["Mamma Mia!", "2008"],
      ["Bambi", "1942"],
      ["Inside Out", "2015"],
      ["Alice In Wonderland", "2010"],
      ["Spirited Away", "2001"],
      ["Tomorrow I Will Date With Yesterday You", "2016"],
      ["Thor: Love And Thunder", "2022"],
      ["Turning Red", "2022"],
      ["Minions: The Rise Of Gru", "2022"],
      ["The Intern", "2015"],
      ["Where The Crawdads Sing", "2022"],
      ["Enola Holmes", "2020–2022"],
      ["Nu Family", "2023"],
      ["The Truth About Ikea", "2023"],
      ["The Gray Man", "2022"],
      ["Guardians Of The Galaxy Vol. 3", "2023"],
      ["Đất Rừng Phương Nam", "2023"],
      ["Wonka", "2023"],
    ],
  },
  {
    t: "X. Watchlist",
    n: 28,
    items: [
      ["Remember The Titans", "2000"],
      ["Everybody Wants Some!!", "2016"],
      ["Psycho", "1960"],
      ["City Lights", "1931"],
      ["Princess Mononoke", "1997"],
      ["Once Upon A Time In The West", "1968"],
      ["Once Upon A Time In America", "1984"],
      ["American Psycho", "2000"],
      ["Bohemian Rhapsody", "2018"],
      ["The Boy In The Striped Pajamas", "2008"],
      ["Phantom Thread", "2017"],
      ["The Killing Of A Sacred Deer", "2017"],
      ["1917", "2019"],
      ["The Wild Pear Tree", "2018"],
      ["Bicycle Thieves", "1948"],
      ["A Clockwork Orange", "1971"],
      ["White Oleander", "2002"],
      ["Inside Llewyn Davis", "2014"],
      ["Goodfellas", "1990"],
      ["The Greatest Showman", "2017"],
      ["Cold War", "2018"],
      ["The Aviator", "2005"],
      ["Sylvia", "2003"],
      ["Fargo"],
      ["Molly's Game"],
      ["Tenet"],
      ["Dances With Wolves"],
      ["Let Him Go"],
      ["Yellowstone", "series"],
      ["A Life On Our Planet", "2020"],
      ["Kiss The Ground"],
      ["Babette's Feast", "1987", "Cuisine."],
      ["Invictus", "2009", "Matt Damon, Morgan Freeman."],
    ],
  },
];

/* ============================================================
   BOOKS
   ============================================================ */
const BOOKS = [
  {
    t: "I. Kinh điển",
    n: 62,
    items: [
      ["Đồi Thỏ", "Richard Adams"],
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
function renderItems(items) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 9 }}>
      {items.map(([title, meta, note], i) => (
        <li key={i} style={{ borderLeft: `2px solid ${LINE}`, paddingLeft: 11 }}>
          <div style={{ fontSize: 14.3, lineHeight: 1.42 }}>
            <span style={{ fontWeight: 600 }}>{title}</span>
            {meta && (
              <span style={{ color: MUTE, fontFamily: SANS, fontSize: 12.3 }}> · {meta}</span>
            )}
          </div>
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
export default function Entertainment() {
  const [tab, setTab] = useState(() => {
    const fromUrl = getSubTabFromUrl();
    return SUBTABS.some((t) => t.id === fromUrl) ? fromUrl : "film";
  });
  useEffect(() => {
    syncSubTabToUrl(tab);
  }, [tab]);

  const [query, setQuery] = useState("");
  const [openMap, setOpenMap] = useState({ film: { 0: true }, books: { 0: true } });

  const data = tab === "film" ? FILMS : BOOKS;

  const toggleGroup = (idx) => {
    setOpenMap((prev) => ({ ...prev, [tab]: { ...prev[tab], [idx]: !prev[tab]?.[idx] } }));
  };

  const flatMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const out = [];
    data.forEach((g) => {
      const pushFrom = (items, subLabel) => {
        items.forEach(([title, meta, note]) => {
          const hay = `${title} ${meta || ""} ${note || ""}`.toLowerCase();
          if (hay.includes(q)) out.push({ title, meta, note, group: g.t, sub: subLabel });
        });
      };
      if (g.sub) g.sub.forEach((s) => pushFrom(s.items, s.t));
      else pushFrom(g.items, null);
    });
    return out;
  }, [query, data]);

  return (
    <div style={{ fontFamily: SERIF, background: PAPER, color: INK }}>
      <div style={{ padding: "26px 16px 60px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 29, lineHeight: 1.16, margin: 0, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Entertainment
          </h1>
        </div>

        <div
          style={{
            display: "flex", gap: 10, marginBottom: 22, position: "sticky", top: 0, zIndex: 10,
            background: PAPER, padding: "10px 0", borderBottom: `1px solid ${LINE}`,
          }}
        >
          {SUBTABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setQuery("");
                window.__scrollArticleToTop?.();
              }}
              style={{
                fontFamily: SANS, fontSize: 14, padding: "11px 22px", borderRadius: 9, cursor: "pointer",
                border: `1.5px solid ${tab === t.id ? ACCENT : LINE}`, background: tab === t.id ? ACCENT : CARD,
                color: tab === t.id ? "#fff" : "#5A5048", fontWeight: tab === t.id ? 700 : 600,
                boxShadow: tab === t.id ? `0 2px 10px ${ACCENT}33` : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontStyle: "italic", fontSize: 14.8, lineHeight: 1.62, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 14 }}>
            {INTRO[tab]}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 12.3, color: MUTE, marginTop: 9 }}>
            “All that we love deeply becomes part of us.” — Helen Keller
          </div>
        </div>

        <input
          type="text"
          placeholder={tab === "film" ? "Tìm phim, đạo diễn, ghi chú..." : "Tìm sách, tác giả..."}
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
            {data.map((g, i) => (
              <GroupCard key={i} group={g} isOpen={!!openMap[tab]?.[i]} onToggle={() => toggleGroup(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
