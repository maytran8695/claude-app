const CHUNK_QUIZ_APP_URL = "https://chunk-en.pages.dev/";
const serif = "'Source Serif 4', Georgia, serif";
const ACCENT = "#B34040"; // matches the "Thép" sector accent in vietnam_industry_primers.jsx
const INK = "#23231E";

export default function ChunkQuiz() {
  return (
    <div className="w-full h-full px-4 sm:px-6 py-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap');
      `}</style>

      <h1 style={{ fontFamily: serif, color: INK, fontSize: 32, lineHeight: 1.15, margin: "0 0 28px" }}>
        Chunk Atlas Quiz
      </h1>

      <a
        href={CHUNK_QUIZ_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 15,
          fontWeight: 600,
          color: "#FFFFFF",
          background: ACCENT,
          borderRadius: 10,
          padding: "12px 22px",
          textDecoration: "none",
        }}
      >
        Open Chunk Atlas Quiz ↗
      </a>
    </div>
  );
}
