import React, { useState, useMemo } from "react";

const ACCENT = "#B8562F";
const INK = "#2B2117";
const MUTE = "#9C8C7C";
const NOTE = "#7A6A5C";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#FAF6F1";
const CARD = "#FFFFFF";
const LINE = "#EAE1D4";

const INTRO = "Mỗi bộ phim là sự cô đặc chất xám, cả về nội dung, màu sắc, hình ảnh, âm thanh — mà thông qua đó ta có thể du hành tới những vùng đất khác, con người khác, triết lý khác, thế giới quan khác...";

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
          ["Forrest Gump", "1994", "Cuộc đời đáng ngưỡng mộ của một chàng ngốc. “Life is like a box of chocolates, you never know what you’re gonna get.”", "Forrest Gump là một người đàn ông có chỉ số IQ thấp nhưng trái tim trong sáng, vô tình chứng kiến và góp mặt trong hàng loạt sự kiện lớn của nước Mỹ nửa sau thế kỷ 20. Xuyên suốt phim là hành trình theo đuổi tình yêu dành cho Jenny — người bạn thời thơ ấu — cùng lòng trung thành tuyệt đối với gia đình, bạn bè và đất nước. Phim giành 6 giải Oscar năm 1995, trong đó có Phim hay nhất và Nam diễn viên chính xuất sắc nhất cho Tom Hanks."],
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
   RENDER HELPERS
   ============================================================ */
const SUMMARY_COLOR = "#4C6B80";

function renderItems(items) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "9px 22px", alignItems: "start" }}>
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
              <span style={{ fontWeight: 700, fontStyle: "normal" }}>May note: </span>
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
export default function Film() {
  const [query, setQuery] = useState("");
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
                    <span style={{ fontWeight: 700, fontStyle: "normal" }}>May note: </span>
                    {m.note}
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
