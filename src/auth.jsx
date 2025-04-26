import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Именованный импорт, правильный для Vite и последних версий jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Добавили флаг загрузки

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("access_token", token);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Ошибка при логине:", err);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp * 1000;
        if (expirationTime > Date.now()) {
          setIsAuthenticated(true);
          setUser(decoded);
        } else {
          logout(); // Токен истёк
        }
      } catch (err) {
        console.error("Ошибка при декодировании токена:", err);
        logout();
      }
    }
    setLoading(false); // Завершили проверку
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
