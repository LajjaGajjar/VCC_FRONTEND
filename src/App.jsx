import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import useAuth from "./hooks/useAuth";

import "./styles/chat.css";

// 🔐 Private Route
function PrivateRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return null;

  return token ? children : <Navigate to="/" />;
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`app ${theme}`}>

      {/* THEME BUTTON */}
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>

    </div>
  );
}