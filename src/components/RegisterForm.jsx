import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering with:", username, password);

    axios
      .post("http://localhost:8000/auth/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("Registration success:", response.data);
        // После успешной регистрации — редирект на логин
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            required
          />
          <button type="submit">Register</button>
        </form>
        <button onClick={() => navigate("/login")}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
