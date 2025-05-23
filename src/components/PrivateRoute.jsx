import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../config";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true); // Для управления состоянием загрузки

  useEffect(() => {
    let isMounted = true;
    
    async function checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        if (isMounted) {
          setIsAuth(false);
          setLoading(false); // Останавливаем загрузку, когда нет токена
        }
        return;
      }

      try {
        const response = await fetch(`${API_URL}/check-auth`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          if (isMounted) {
            setIsAuth(true);
            setLoading(false); // Завершаем загрузку
          }
        } else {
          // Если токен невалиден, удаляем его из localStorage
          localStorage.removeItem("token");
          if (isMounted) {
            setIsAuth(false);
            setLoading(false); // Завершаем загрузку
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token"); // Если ошибка запроса, очищаем токен
        if (isMounted) {
          setIsAuth(false);
          setLoading(false); // Завершаем загрузку
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    // Можно использовать спиннер или любой другой индикатор загрузки
    return <div>Loading...</div>; // Здесь можно добавить кастомный спиннер или анимацию
  }

  return isAuth ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
