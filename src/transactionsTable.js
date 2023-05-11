import React, {useState,useEffect} from "react";
import './transactionsTable.css'

function GamesTable({ games }) {
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  return (
    <div className="TransactionTable">
      <table>
        <thead>
          <tr>
            <th>HOME</th>
            <th>VS</th>
            <th>AWAY</th>
            <th>CONFERENCE</th>
            <th>DAY</th>
            <th>DATE</th>
            <th>TIME</th>
            <th>COURT</th>
            <th>LOCATION</th>
          </tr>
        </thead>
        <tbody>
        {filteredGames.length > 0 ? (
  filteredGames.map((game) => (
    <tr key={game && game.id}>
      <td>{(game && game.HOME) || "-"}</td>
<td>{(game && game.Column3) || "-"}</td>
<td>{(game && game.AWAY) || "-"}</td>
<td>{(game && game.CONFERENCE) || "-"}</td>
<td>{(game && game.DAY) || "-"}</td>
<td>{(game && game.DATE) || "-"}</td>
<td>{(game && game.TIME) || "-"}</td>
<td>{(game && game.COURT) || "-"}</td>
<td>{(game && game.LOCATION) || "-"}</td>

    </tr>
  ))
) : (
  <tr>
    <td colSpan={9}>No games found</td>
  </tr>
)}
        </tbody>
      </table>
    </div>
  );
}

export default GamesTable;
