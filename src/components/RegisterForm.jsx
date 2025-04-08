import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";
import Notification from "./Notification"; // Импортируем компонент уведомлений

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(true); // Проверка валидности токена
  const [errorMessage, setErrorMessage] = useState(""); // Сообщение об ошибке
  const [showNotification, setShowNotification] = useState(false); // Показать уведомление

  // Проверка токена при монтировании компонента
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      // Если токен есть, проверяем его валидность
      axios.get("http://localhost:8000/auth/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        if (response.data.valid) {
          // Если токен валиден, перенаправляем пользователя на главную
          navigate("/home");
        } else {
          setIsTokenValid(false); // Если токен не валиден
          setErrorMessage("Your session has expired. Please log in again.");
          setShowNotification(true); // Показываем уведомление
        }
      })
      .catch(error => {
        setIsTokenValid(false); // Если токен отсутствует или невалиден
        setErrorMessage("No token found or invalid token.");
        setShowNotification(true); // Показываем уведомление
        console.error("Token verification failed:", error);
      });
    } else {
      setIsTokenValid(false); // Если токен отсутствует
      setErrorMessage("No token found. Please log in.");
      setShowNotification(true); // Показываем уведомление
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering with:", username, password);

    try {
      // Отправляем запрос на регистрацию
      const response = await axios.post("http://localhost:8000/auth/register", {
        username,
        password,
      });

      console.log("Registration success:", response.data);

      // Очистка полей после отправки
      setUsername("");
      setPassword("");

      // Перенаправление на страницу логина после успешной регистрации
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false); // Закрытие уведомления
  };

  if (!isTokenValid) {
    // Если токен не валиден или отсутствует, показываем форму регистрации
    return (
      <div className="auth-container">
        {showNotification && (
          <Notification message={errorMessage} onClose={handleCloseNotification} />
        )}
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
              placeholder="Your secret password..."
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
  } else {
    // Если токен валиден, перенаправляем на главную страницу
    return null;
  }
};

export default RegisterForm;
