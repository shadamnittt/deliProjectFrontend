// src/components/Favorites.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../auth"; // Импортируем хук из контекста
import api from "../axiosInstance";


function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated, user, loading } = useAuth();


  const fetchFavorites = () => {
    api
      .get("http://localhost:8000/api/favorites")
      .then((res) => {
        const data = res.data.favorites || res.data;
        setFavorites(data);
        setError("");
      })
      .catch((err) => {
        console.error("Ошибка при получении избранного:", err);
        if (err.response?.status === 401) {
          setError("Вы не авторизованы. Пожалуйста, войдите.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          setError("Ошибка при загрузке избранного.");
        }
      });
  };

  useEffect(() => {
    if (loading) return; // ждём, пока auth провайдер загрузится
  
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setError("Вы не авторизованы. Пожалуйста, войдите.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, [isAuthenticated, loading]);

  const handleRemove = async (filmId) => {
    try {
      await api.delete("/api/favorites/remove", { params: { film_id: filmId } });
      setFavorites(prev => prev.filter(movie => movie.film_id !== filmId));
    } catch (err) {
      console.error("Ошибка при удалении из избранного:", err);
      alert("Не удалось удалить фильм из избранного.");
    }
  };

  return (
    <div className="p-4 text-white min-h-screen bg-[#2C343F]">
      <h2 className="text-3xl font-bold mb-6 text-center">Избранные фильмы</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {favorites.length === 0 && !error ? (
        <p className="text-center">Нет избранных фильмов</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <div key={movie.film_id} className="bg-[#14171C] p-4 rounded-xl shadow-md flex flex-col justify-between">
              <img
                src={movie.poster || "/default-poster.jpg"}
                alt={movie.title}
                className="w-full h-64 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-semibold text-[#F27405]">{movie.title}</h3>
              <p>Рейтинг: {movie.rating || "N/A"}</p>
              <button
                onClick={() => handleRemove(movie.film_id)}
                className="mt-3 bg-red-600 hover:bg-red-800 px-4 py-2 rounded-xl transition"
              >
                Удалить из избранного
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
