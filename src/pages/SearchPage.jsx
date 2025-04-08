import React, { useState } from "react";
import "./../styles/SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Поисковый запрос:", query);
  };

  return (
    <div className="search-wrapper">
      <div
        className="search-card"
        style={{ transform: "translateX(127px)" }} // 👈 вот здесь подвинул чуть вправо
      >
        <h2 className="title">MovieRadar</h2>
        <p className="subtitle">Look up movies by keyword!</p>

        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords like 'godard, love, knives'"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
