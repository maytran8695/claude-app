import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: 240,
        padding: 20,
        borderRight: "1px solid #ddd",
      }}
    >
      <h2>Knowledge Hub</h2>

      <p>
        <Link to="/">Home</Link>
      </p>

      <p>
        <Link to="/finance">Finance</Link>
      </p>

      <p>
        <Link to="/health">Health</Link>
      </p>
    </div>
  );
}