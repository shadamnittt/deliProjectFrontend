import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../config";

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated, children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true); // Для управления состоянием загрузки

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        if (isMounted) {
          setIsAuth(false);
          setLoading(false); // Останавливаем загрузку, когда нет токена
          setIsAuthenticated(false); // Убираем из состояния, что пользователь не авторизован
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
            setIsAuthenticated(true); // Обновляем родительское состояние
          }
        } else {
          // Если токен невалиден, удаляем его из localStorage
          localStorage.removeItem("access_token");
          if (isMounted) {
            setIsAuth(false);
            setLoading(false); // Завершаем загрузку
            setIsAuthenticated(false); // Обновляем родительское состояние
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("access_token"); // Если ошибка запроса, очищаем токен
        if (isMounted) {
          setIsAuth(false);
          setLoading(false); // Завершаем загрузку
          setIsAuthenticated(false); // Обновляем родительское состояние
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [setIsAuthenticated]);

  if (loading) {
    // Можно использовать спиннер или любой другой индикатор загрузки
    return <div>Loading...</div>; // Здесь можно добавить кастомный спиннер или анимацию
  }

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
