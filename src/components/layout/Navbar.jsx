import useAuth from "../../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import "../../styles/main.css";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      
      {/* LEFT */}
      <div className="nav-left">
        <h2 className="logo">VCC</h2>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <ThemeToggle />

        <button className="nav-btn logout" onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}