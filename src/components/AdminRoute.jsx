import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");
  
    if (!token) return <Navigate to="/login" />;
  
    try {
      const decoded = jwtDecode(token);
  
      // Убедимся, что токен декодируется правильно
      console.log("Decoded token:", decoded);
  
      if (decoded.role !== "admin") return <Navigate to="/" />; // Если роль не админ, перенаправляем на главную
      return children;
    } catch (err) {
      console.error("Error decoding token:", err);
      return <Navigate to="/login" />; // Если не удалось декодировать токен, перенаправляем на страницу логина
    }
  };
  
  export default AdminRoute;
