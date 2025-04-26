import React, { useState, useEffect } from "react";
import api from "../axiosInstance";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); // Новый state для user_id
  const [showMoreGenres, setShowMoreGenres] = useState({});
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); // <-- только временно
      setUsername(decoded.sub);
      setUserId(decoded.user_id);
    }
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:8000/auth/search", {
        params: { query },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Ошибка при поиске:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Ты точно хочешь удалить аккаунт? Это навсегда!")) return;

    try {
      await axios.delete(`http://localhost:8000/auth/delete/${username}`);
      localStorage.removeItem("access_token");
      window.location.href = "/register";
    } catch (err) {
      console.error("Ошибка при удалении аккаунта:", err);
    }
  };

  const toggleShowMoreGenres = (id) => {
    setShowMoreGenres(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToFavorites = async (filmTitle) => {
    try {
      // Отправляем только название фильма на сервер
      await api.post(
        "http://localhost:8000/api/favorites/add", 
        { film_title: filmTitle }  // Отправляем название фильма
      );
      alert("Фильм добавлен в избранное!");
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Фильм уже в избранном.");
      } else if (err.response?.status === 401) {
        alert("Пожалуйста, войдите в систему.");
        navigate("/login");
      } else if (err.response?.status === 404) {
        alert("Фильм не найден.");
      } else {
        console.error("Ошибка добавления в избранное:", err);
        alert("Ошибка при добавлении.");
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-[#2C343F] text-white flex flex-col items-center p-4">
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <span className="text-lg font-semibold">Hi, {username}!</span>
        <div className="space-x-2">
          <button onClick={handleLogout} className="bg-[#F27405] hover:bg-orange-600 px-4 py-2 rounded-2xl shadow-md transition">
            Logout
          </button>
          <button onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-2xl shadow-md transition">
            Delete Account
          </button>
          <button onClick={() => navigate("/favorites")} className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-2xl shadow-md transition">
            Favorites
          </button>
        </div>
      </div>

      <div className="bg-[#414d62] p-6 rounded-2xl shadow-lg w-full max-w-3xl mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-[#F27405]">MovieRadar</h2>
        <p className="text-sm mb-4">Look up movies by keyword!</p>
        <div className="flex items-center gap-2 justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords like 'godard, love, knives'"
            className="w-2/3 px-4 py-2 rounded-lg text-white"
          />
          <button onClick={handleSearch} className="bg-[#00B021] hover:bg-green-700 px-4 py-2 rounded-xl text-white transition">
            Search
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        {results.length > 0 ? (
          <div className="space-y-10">
            {results.map((movie) => {
              return (
                <div key={movie.id} className="bg-[#14171C] rounded-2xl shadow-lg p-6 flex gap-6">
                  <div className="w-1/3">
                    <img src={movie.poster} alt={movie.title} className="rounded-xl shadow-md" />
                  </div>
                  <div className="w-2/3 space-y-4">
                    <h3 className="text-2xl font-bold text-[#F27405]">{movie.title} ({movie.year})</h3>

                    <div>
                      <h4 className="text-lg font-semibold text-white">About the Movie</h4>
                      <p className="text-gray-300">{movie.description}</p>
                    </div>

                    <p><strong>Rating:</strong> {movie.rating || "N/A"}</p>
                    <p><strong>Director:</strong> {movie.directors}</p>

                    <div>
                      <h5 className="font-semibold">Actors:</h5>
                      <div className="grid grid-cols-2 gap-x-4 text-sm">
                        {movie.actors.slice(0, 10).map((actor, index) => (
                          <span key={index}>{actor}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold">Genres:</h5>
                      <ul className="grid grid-cols-2 gap-x-4 text-sm list-disc list-inside">
                        {(showMoreGenres[movie.id] ? movie.genres : movie.genres.slice(0, 5)).map((genre, index) => (
                          <li key={index}>{genre}</li>
                        ))}
                      </ul>
                      {movie.genres.length > 5 && (
                        <button
                          onClick={() => toggleShowMoreGenres(movie.id)}
                          className="text-[#00B021] hover:underline mt-1"
                        >
                          {showMoreGenres[movie.id] ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>

                    <a
                      href={movie.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 bg-[#F27405] hover:bg-orange-700 text-white px-4 py-2 rounded-xl transition"
                    >
                      Go to Letterboxd
                    </a>

                    <button
                      onClick={() => addToFavorites(movie.title)}
                      className="mt-2 bg-green-600 hover:bg-green-800 text-white px-3 py-2 rounded-xl transition"
                    >
                      Добавить в избранное
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-white mt-10 text-lg">No results...</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
