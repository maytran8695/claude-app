import React, { useState, useMemo } from "react";

const ACCENT = "#8E3B4A";
const INK = "#211F1D";
const MUTE = "#8B8378";
const NOTE = "#7A7268";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const SERIF = "'Iowan Old Style', 'Georgia', serif";
const PAPER = "#FFFFFF";
const CARD = "#FFFFFF";
const LINE = "#E2E1DA";

const INTRO = "Mỗi bản nhạc là sự cô đặc chất xám, cả về giai điệu, hòa âm, cảm xúc — mà thông qua đó ta có thể du hành tới những vùng đất khác, con người khác, triết lý khác, thế giới quan khác...";

/* ============================================================
   MUSIC
   ============================================================ */
const MUSIC = [
  {
    t: "I. Cổ điển phương Tây",
    n: 8,
    items: [
      ["Symphony No. 9 (\"Choral\")", "Ludwig van Beethoven · 1824", undefined, "Bản giao hưởng cuối cùng hoàn chỉnh của Beethoven, nổi tiếng với chương cuối \"Ode to Joy\" (Ode an die Freude) phổ thơ Schiller, lần đầu đưa giọng hát vào thể loại giao hưởng. Beethoven sáng tác phần lớn tác phẩm khi đã hoàn toàn điếc, và tương truyền ông chỉ biết buổi công diễn thành công khi được người khác xoay lại để thấy khán giả đứng vỗ tay."],
      ["Requiem in D minor", "Wolfgang Amadeus Mozart · 1791", undefined, "Tác phẩm cầu hồn dang dở, được Mozart sáng tác trong những tháng cuối đời và qua đời trước khi hoàn thành, sau đó được học trò Franz Xaver Süssmayr hoàn tất theo ghi chú của ông. Bầu không khí u tối, trang nghiêm cùng câu chuyện về sự ra đời bí ẩn khiến đây là một trong những tác phẩm cổ điển được yêu thích và diễn giải nhiều nhất."],
      ["The Four Seasons", "Antonio Vivaldi · ~1725", undefined, "Bộ bốn concerto vĩ cầm mô phỏng âm thanh và không khí của Xuân, Hạ, Thu, Đông — tiếng chim hót, giông bão, mùa gặt, gió rét. Đây là một trong những ví dụ sớm nhất và nổi tiếng nhất của \"nhạc chương trình\" (program music), nơi âm nhạc chủ động kể một câu chuyện hoặc mô tả hình ảnh cụ thể."],
      ["Clair de Lune", "Claude Debussy · 1890 (xuất bản 1905)", undefined, "Chương thứ ba trong \"Suite bergamasque\" cho piano, lấy cảm hứng từ bài thơ cùng tên của Paul Verlaine. Giai điệu êm dịu, hòa âm mơ hồ không theo quy tắc cổ điển nghiêm ngặt là ví dụ tiêu biểu cho trường phái Ấn tượng trong âm nhạc mà Debussy tiên phong."],
      ["Nocturnes", "Frédéric Chopin · 1827–1846", undefined, "Tập hợp 21 bản dạ khúc piano trữ tình, kết hợp giai điệu du dương kiểu opera Ý với hòa âm tinh tế đặc trưng Chopin. Thể loại nocturne (nhạc đêm) do Chopin đưa lên đỉnh cao nghệ thuật, trở thành hình mẫu cho nhiều nhà soạn nhạc lãng mạn sau này."],
      ["The Well-Tempered Clavier", "Johann Sebastian Bach · 1722 & 1742", undefined, "Hai tập, mỗi tập gồm 24 khúc dạo và fugue viết cho tất cả 24 giọng trưởng-thứ, chứng minh tính khả thi của hệ thống bình quân luật (equal temperament) trong lên dây đàn phím. Tác phẩm được xem là nền tảng kỹ thuật và lý thuyết cho hầu hết âm nhạc phương Tây sau này, thường được gọi là \"Cựu Ước\" của piano."],
      ["Swan Lake", "Pyotr Ilyich Tchaikovsky · 1876", undefined, "Vở ballet kể về công chúa Odette bị phù thủy biến thành thiên nga, chỉ có thể trở lại người thật vào ban đêm, và lời thề tình yêu định mệnh với hoàng tử Siegfried. Dù công diễn đầu tiên không thành công, phần âm nhạc giàu cảm xúc sau này giúp tác phẩm trở thành vở ballet cổ điển được trình diễn nhiều nhất thế giới."],
      ["Symphony No. 5", "Ludwig van Beethoven · 1808", undefined, "Mở đầu bằng bốn nốt nhạc ngắn-ngắn-ngắn-dài nổi tiếng nhất lịch sử âm nhạc, được ví như \"số phận gõ cửa\". Hành trình từ chương đầu u ám đến chương cuối rực rỡ chiến thắng trở thành mô hình tự sự \"vượt qua nghịch cảnh\" ảnh hưởng đến vô số tác phẩm khí nhạc sau này."],
    ],
  },
  {
    t: "II. Đại chúng kinh điển thế kỷ 20",
    n: 8,
    items: [
      ["Abbey Road", "The Beatles · 1969", undefined, "Album phòng thu áp chót của The Beatles, nổi bật với medley liên khúc dài gần 16 phút ở mặt B ghép nhiều đoạn nhạc dang dở thành một tổng thể liền mạch. Bìa album chụp bốn thành viên băng qua vạch kẻ đường Abbey Road trở thành một trong những hình ảnh được nhại lại nhiều nhất lịch sử văn hóa đại chúng."],
      ["The Dark Side of the Moon", "Pink Floyd · 1973", undefined, "Album concept xoay quanh các chủ đề xung đột, thời gian, tiền bạc, cái chết và bệnh tâm thần, kết nối liền mạch không ngắt quãng giữa các bài hát. Với hơn 45 triệu bản bán ra và bìa đĩa hình lăng kính tán sắc mang tính biểu tượng, đây là một trong những album bán chạy nhất mọi thời đại."],
      ["Thriller", "Michael Jackson · 1982", undefined, "Album bán chạy nhất lịch sử với hơn 70 triệu bản, kết hợp pop, funk, rock và disco cùng các video ca nhạc đột phá về mặt điện ảnh, đặc biệt là video dài 14 phút cho ca khúc chủ đề với vũ đạo xác sống. Thriller định hình lại vai trò của MTV và video âm nhạc trong ngành công nghiệp giải trí."],
      ["Bohemian Rhapsody", "Queen · 1975", undefined, "Ca khúc dài gần 6 phút phá vỡ mọi cấu trúc pop thông thường, kết hợp đoạn mở đầu ballad, đoạn giữa mang chất opera đầy kịch tính, và đoạn hard rock bùng nổ. Ban đầu bị hãng đĩa hoài nghi vì độ dài bất thường, ca khúc trở thành một trong những bài hát nổi tiếng nhất lịch sử nhạc rock."],
      ["Imagine", "John Lennon · 1971", undefined, "Ca khúc chủ đề hòa bình với lời kêu gọi con người tưởng tượng một thế giới không biên giới, tôn giáo hay sở hữu tư nhân, trên nền piano giản dị. Trở thành một dạng \"thánh ca\" phi tôn giáo cho phong trào hòa bình toàn cầu, ca khúc thường được trình diễn tại các sự kiện tưởng niệm lớn."],
      ["Like a Rolling Stone", "Bob Dylan · 1965", undefined, "Ca khúc dài bất thường (hơn 6 phút) với lời hát châm biếm sắc bén nhắm vào một nhân vật từng giàu có nay sa cơ, đánh dấu bước chuyển của Dylan từ nhạc dân gian mộc mạc sang rock điện tử. Thường được các tạp chí âm nhạc xếp hạng là một trong những ca khúc vĩ đại nhất mọi thời đại."],
      ["Purple Rain", "Prince · 1984", undefined, "Album kiêm nhạc phim cùng tên, pha trộn rock, funk, pop và âm hưởng phúc âm, với ca khúc chủ đề là bản power ballad mang tính biểu tượng của sự nghiệp Prince. Album giúp ông giành giải Oscar cho nhạc phim hay nhất và củng cố vị thế một trong những nghệ sĩ đa tài nhất lịch sử nhạc pop."],
      ["Rumours", "Fleetwood Mac · 1977", undefined, "Album được sáng tác giữa lúc các thành viên ban nhạc trải qua chia tay, ngoại tình và đổ vỡ hôn nhân nội bộ, biến những xung đột cá nhân thành loạt ca khúc pop-rock giàu cảm xúc. Rumours trở thành một trong những album bán chạy nhất mọi thời đại, minh chứng cho việc biến đau khổ cá nhân thành nghệ thuật tập thể."],
    ],
  },
  {
    t: "III. Nhạc phim kinh điển",
    n: 6,
    items: [
      ["Star Wars (Main Theme)", "John Williams · 1977", undefined, "Chủ đề mở đầu hùng tráng với kèn đồng rực rỡ, mở ra cả một vũ trụ điện ảnh và đặt tiêu chuẩn cho nhạc phim sử thi hiện đại. John Williams sử dụng leitmotif — giai điệu riêng cho từng nhân vật/phe phái — xuyên suốt loạt phim, kỹ thuật vay mượn từ nhạc kịch opera Wagner."],
      ["The Good, the Bad and the Ugly (chủ đề)", "Ennio Morricone · 1966", undefined, "Giai điệu huýt sáo và tiếng hú \"ai-ai-ai\" đặc trưng cho dòng phim viễn Tây kiểu Ý (spaghetti western) của đạo diễn Sergio Leone. Cách phối khí phá cách, dùng cả tiếng roi quất và đàn guitar điện, biến bản nhạc thành một trong những chủ đề phim dễ nhận diện nhất lịch sử điện ảnh."],
      ["Time (từ phim Inception)", "Hans Zimmer · 2010", undefined, "Bản nhạc kết phim xây dựng dần từ một hợp âm piano đơn giản thành một dàn nhạc đầy đặn, mô phỏng chính cấu trúc \"giấc mơ trong giấc mơ\" lồng nhau của bộ phim. Kỹ thuật kéo dài âm thanh chậm rãi (thường gọi là \"Shepard tone\") tạo cảm giác căng thẳng leo thang không ngừng đặc trưng cho phong cách Zimmer."],
      ["My Heart Will Go On", "James Horner (trình bày: Celine Dion) · 1997", undefined, "Ca khúc chủ đề phim Titanic, mở đầu bằng tiếng sáo Ireland (tin whistle) trước khi Celine Dion cất giọng ballad đầy cảm xúc. Ca khúc giành giải Oscar cho nhạc phim hay nhất và trở thành một trong những đĩa đơn bán chạy nhất mọi thời đại."],
      ["The Godfather (chủ đề)", "Nino Rota · 1972", undefined, "Giai điệu kèn trumpet đơn độc, u buồn mở đầu bộ phim về gia tộc mafia Corleone, pha trộn chất nhạc dân gian Ý (đặc biệt là tarantella vùng Sicily) với không khí bi kịch cổ điển. Chủ đề nhạc trở nên gắn liền với hình ảnh thể loại phim xã hội đen đến mức gần như là một quy ước bất thành văn của dòng phim này."],
      ["Cinema Paradiso (chủ đề)", "Ennio Morricone · 1988", undefined, "Giai điệu piano và dây đầy hoài niệm cho bộ phim Ý về tình bạn giữa một cậu bé và người chiếu phim già trong rạp chiếu bóng làng quê. Bản nhạc gợi cảm giác luyến tiếc tuổi thơ và tình yêu điện ảnh, thường được xem là một trong những tác phẩm cảm động nhất của Morricone."],
    ],
  },
  {
    t: "IV. Nhạc Việt kinh điển",
    n: 6,
    items: [
      ["Diễm Xưa", "Trịnh Công Sơn · ~1960", undefined, "Ca khúc viết tặng người con gái tên Diễm mà Trịnh Công Sơn thầm thương, với giai điệu chậm rãi và ca từ mơ hồ, đầy chất thơ về mưa, tình yêu và sự phai nhạt của thời gian. Bản tiếng Nhật do Khánh Ly trình bày từng gây tiếng vang tại Nhật Bản, đưa nhạc Trịnh ra ngoài biên giới Việt Nam."],
      ["Hạ Trắng", "Trịnh Công Sơn", undefined, "Ca khúc lấy cảm hứng từ một mùa hè nóng bức khi Trịnh Công Sơn ốm nặng, mơ thấy hoa trắng rụng đầy sân, để rồi tỉnh dậy sáng tác nên giai điệu đầy chất liêu trai. Ca từ gợi hình ảnh mùa hạ trắng xóa hoa và nắng, trở thành một trong những bản tình ca được yêu thích nhất của nhạc sĩ."],
      ["Tình Ca", "Phạm Duy · 1953", undefined, "Ca khúc mở đầu bằng câu hát nổi tiếng \"Tôi yêu tiếng nước tôi từ khi mới ra đời...\", bày tỏ tình yêu với tiếng Việt, quê hương và con người Việt Nam qua ba miền đất nước. Sáng tác giữa bối cảnh đất nước chia cắt, ca khúc trở thành một trong những bản \"tình ca quê hương\" tiêu biểu nhất của tân nhạc Việt Nam."],
      ["Buồn Tàn Thu", "Văn Cao · 1939", undefined, "Một trong những sáng tác đầu tiên của Văn Cao khi mới ngoài đôi mươi, viết về nỗi buồn thiếu nữ chờ đợi người yêu nơi chinh chiến giữa cảnh thu tàn. Ca khúc là một trong những viên gạch nền móng của \"tân nhạc\" Việt Nam — dòng nhạc lãng mạn thoát ly khỏi nhạc cổ truyền, hình thành từ cuối thập niên 1930."],
      ["Thiên Thai", "Văn Cao · 1941", undefined, "Lấy cảm hứng từ tích Lưu Nguyễn lạc vào cõi tiên trong truyện cổ, ca khúc vẽ nên một thế giới thần tiên thơ mộng bằng giai điệu và ca từ giàu chất Đường thi. Với cấu trúc âm nhạc phức tạp hiếm thấy trong tân nhạc thời kỳ đầu, tác phẩm được xem là một đỉnh cao nghệ thuật của dòng nhạc tiền chiến."],
      ["Suối Mơ", "Văn Cao · 1939", undefined, "Ca khúc miêu tả một dòng suối trong rừng thu, nơi có bóng dáng người thiếu nữ mòn mỏi đợi chờ người yêu đi xa không trở lại. Giai điệu nhẹ nhàng, ca từ giàu hình ảnh thiên nhiên là ví dụ tiêu biểu cho phong cách trữ tình lãng mạn của dòng nhạc tiền chiến Việt Nam."],
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

// title -> [moodId, ...] — every piece in MUSIC has at least one entry here.
const MOOD_TAGS = {
  "Symphony No. 9 (\"Choral\")": ["motivate", "heartwarming"],
  "Requiem in D minor": ["sad", "eerie"],
  "The Four Seasons": ["adventure", "culture"],
  "Clair de Lune": ["cozy", "solitude"],
  "Nocturnes": ["solitude", "romance"],
  "The Well-Tempered Clavier": ["culture", "mindbend"],
  "Swan Lake": ["romance", "sad"],
  "Symphony No. 5": ["motivate", "thrill"],
  "Abbey Road": ["cozy", "culture"],
  "The Dark Side of the Moon": ["mindbend", "solitude"],
  "Thriller": ["fun", "thrill"],
  "Bohemian Rhapsody": ["thrill", "fun"],
  "Imagine": ["heal", "heartwarming"],
  "Like a Rolling Stone": ["culture", "motivate"],
  "Purple Rain": ["romance", "sad"],
  "Rumours": ["heartbreak", "sad"],
  "Star Wars (Main Theme)": ["adventure", "motivate"],
  "The Good, the Bad and the Ugly (chủ đề)": ["adventure", "thrill"],
  "Time (từ phim Inception)": ["thrill", "mindbend"],
  "My Heart Will Go On": ["romance", "heartbreak"],
  "The Godfather (chủ đề)": ["sad", "culture"],
  "Cinema Paradiso (chủ đề)": ["heartwarming", "sad"],
  "Diễm Xưa": ["heartbreak", "solitude"],
  "Hạ Trắng": ["sad", "cozy"],
  "Tình Ca": ["culture", "heartwarming"],
  "Buồn Tàn Thu": ["sad", "culture"],
  "Thiên Thai": ["adventure", "culture"],
  "Suối Mơ": ["cozy", "sad"],
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
export default function Music() {
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
    MUSIC.forEach((g) => {
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
    MUSIC.forEach((g) => {
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
            Music
          </h1>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontStyle: "italic", fontSize: 14.8, lineHeight: 1.62, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 14 }}>
            {INTRO}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 12.3, color: MUTE, marginTop: 9 }}>
            “Music can change the world because it can change people.” — Bono
          </div>
        </div>

        <input
          type="text"
          placeholder="Tìm bản nhạc, nghệ sĩ, mô tả..."
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
              {activeMood.icon} {activeMood.label} · {moodMatches.length} bản nhạc
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
            {MUSIC.map((g, i) => (
              <GroupCard key={i} group={g} isOpen={!!openMap[i]} onToggle={() => toggleGroup(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
