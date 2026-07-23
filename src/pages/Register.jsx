import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!data.name || !data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await registerUser(data);

      alert("Registration successful!");

      navigate("/"); // go to login

    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h2>Create VCC Account</h2>

        <Input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <Input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <Button
          text={loading ? "Registering..." : "Register"}
          onClick={handleRegister}
          disabled={loading}
        />

        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>

    </div>
  );
}
