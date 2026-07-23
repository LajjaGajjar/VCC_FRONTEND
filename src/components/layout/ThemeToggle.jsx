import { useEffect, useState } from "react";
import "../../styles/main.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.body.className = saved; // 🔥 important
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    document.body.className = newTheme; // 🔥 replaces class cleanly
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button className="theme-btn" onClick={toggleTheme}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}