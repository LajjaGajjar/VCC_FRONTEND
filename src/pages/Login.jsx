import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("🔵 Login clicked");

    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await loginUser(data);

      console.log("🟢 API RESPONSE:", res.data);

      // 🔥 check token exists
      if (!res.data.token) {
        alert("❌ No token received from backend");
        return;
      }

      // 🔥 SAVE TOKEN
      login(res.data.token);

      console.log("💾 Token saved:", localStorage.getItem("token"));

      // 🔥 FORCE WAIT (important)
      setTimeout(() => {
        console.log("➡️ Navigating to dashboard");
        navigate("/dashboard");
      }, 100);

    } catch (err) {
      console.error("🔴 Login error:", err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">Login to VCC</h2>

        {/* EMAIL */}
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {/* LOGIN BUTTON */}
        <button
          className="auth-btn"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* LINK */}
        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}