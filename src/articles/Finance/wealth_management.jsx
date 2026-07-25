const WEALTH_APP_URL = "https://wealth-management-8nm.pages.dev/";

export default function WealthManagement() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <div
        style={{
          border: "1px solid #E3E7EE",
          borderRadius: 16,
          padding: 32,
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.4,
            textTransform: "uppercase",
            color: "#B34040",
            background: "#FBEEEE",
            borderRadius: 999,
            padding: "4px 10px",
            marginBottom: 16,
          }}
        >
          Finance
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#161A20", margin: "0 0 12px" }}>
          Quản lý gia sản
        </h1>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: "#5B6472", margin: "0 0 28px" }}>
          Ứng dụng theo dõi và quản lý tài sản riêng, mở trong một tab mới.
        </p>

        <a
          href={WEALTH_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 15,
            fontWeight: 600,
            color: "#FFFFFF",
            background: "#B34040",
            borderRadius: 10,
            padding: "12px 20px",
            textDecoration: "none",
          }}
        >
          Mở Wealth Management ↗
        </a>

        <p style={{ fontSize: 13, color: "#8B93A0", marginTop: 16, wordBreak: "break-all" }}>
          {WEALTH_APP_URL}
        </p>
      </div>
    </div>
  );
}
