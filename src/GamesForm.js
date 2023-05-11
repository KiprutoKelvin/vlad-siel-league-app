import React, { useState } from "react";
import "./GamesForm.css";

function GamesForm({ onGameSubmit, filterGames }) {
  const [searchState, setSearchState] = useState({
    HOME: "",
    AWAY: "",
  });

  function handleSearchChange(event) {
    const { name, value } = event.target;
    setSearchState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchState.HOME || searchState.AWAY) {
      filterGames(searchState.HOME || searchState.AWAY);
    } else {
      onGameSubmit(searchState);
    }
  }

  return (
    <div className="GamesForm">
      <form onSubmit={handleSubmit}>
        <label>
          Home:
          <input
            type="text"
            name="HOME"
            value={searchState.HOME}
            onChange={handleSearchChange}
          />
        </label>
        <label>
          Away:
          <input
            type="text"
            name="AWAY"
            value={searchState.AWAY}
            onChange={handleSearchChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default GamesForm;

