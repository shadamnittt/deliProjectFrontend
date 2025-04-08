import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Подключаем стили
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);

    axios.post("http://localhost:8000/auth/login", {
      email: email,
      password: password,
    })
        .then((response) => {
          debugger;
          console.log("Login response:", response.data);
          localStorage.setItem("access_token", response.data.access_token);
        })
    // После успешного логина редирект на главную страницу
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">Login</button>
        </form>
        <button onClick={() => navigate("/register")}>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
