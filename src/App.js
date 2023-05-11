import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import GamesTable from './transactionsTable';
import GamesForm from './GamesForm';

const url = 'http://localhost:4000/games';

function App() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const [gameState, setGameState] = useState({
    HOME: '',
    Column3: '',
    AWAY: '',
    CONFERENCE: '',
    DAY: '',
    TIME: '',
    COURT: '',
    LOCATION: '',
  });

  // fetch data from the API and update state
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
      });
  }, []);

  // filter games based on search input
  function filterGames(inputValue) {
    if (!games || !games.length) {
      return;
    }
  
    const filtered = games.filter((game) => {
      if (!game || !game.HOME) {
        return false;
      }
      const home = game.HOME;
      return home.includes(inputValue);
    });
  
    setFilteredGames(filtered);
  }
  

  // filter games based on HOME and AWAY state
  useEffect(() => {
    const { HOME, AWAY } = gameState;
    if (HOME || AWAY) {
      const filtered = games.filter((game) => {
        const home = game.HOME || '';
        const away = game.AWAY || '';
        return home.toLowerCase().includes(HOME.toLowerCase()) || away.toLowerCase().includes(AWAY.toLowerCase());
      });
      setFilteredGames(filtered);
    } else {
      setFilteredGames(games);
    }
  }, [gameState, games]);

  const handleGameSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    const { HOME } = gameState;
    if (HOME !== null && HOME !== undefined && HOME !== '') {
      setGames((prevState) => [...prevState, gameState]);
      setFilteredGames((prevState) => [...prevState, gameState]);
      setGameState({
        HOME: '',
        Column3: '',
        AWAY: '',
        CONFERENCE: '',
        DAY: '',
        TIME: '',
        COURT: '',
        LOCATION: '',
      });
    }
  };

  return (
    <div className="App">
      <Header />
      <GamesForm
        gameState={gameState}
        onGameSubmit={handleGameSubmit}
        filterGames={filterGames}
      />
      <GamesTable games={filteredGames} filterGames={filterGames} />
    </div>
  );
}

export default App;
