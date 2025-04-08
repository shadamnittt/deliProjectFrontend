import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api";
import "../styles/Auth.css";

const AuthCard = ({ isRegister = false }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      const response = await register(username, password);
      if (response.message) {
        navigate("/login"); // После успешной регистрации переходим на логин
      } else {
        setError(response.detail || "Registration failed");
      }
    } else {
      const response = await login(username, password);
      if (response.access_token) {
        navigate("/home"); // Переход после логина
      } else {
        setError(response.detail || "Login failed");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your stage name..."
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your secret script..."
            required
          />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>
        <button onClick={() => navigate(isRegister ? "/login" : "/register")}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthCard;
