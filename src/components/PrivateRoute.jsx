import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../config";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        if (isMounted) setIsAuth(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/check-auth`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) setIsAuth(response.ok);
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isMounted) setIsAuth(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
