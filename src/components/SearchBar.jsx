import { useState } from "react";
import "./../styles/SearchBar.css";

const SearchBar = ({ setMovies }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    setMovies([]); // Очистка списка перед новым поиском

    setTimeout(() => {
      const dummyMovies = [
        { title: "Inception", poster: "https://via.placeholder.com/150x220" },
        { title: "Interstellar", poster: "https://via.placeholder.com/150x220" },
        { title: "Tenet", poster: "https://via.placeholder.com/150x220" },
      ];
      setMovies(dummyMovies);
    }, 300); // Задержка для эффекта плавного обновления
  };

  return (
    <div className="centered-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
