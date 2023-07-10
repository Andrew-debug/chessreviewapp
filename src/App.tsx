import { useState } from "react";
import { IPgn } from "./types/index.js";
//
import GamesHisory from "./components/GamesHisory";
import MainContent from "./components/MainContent.js";

function App() {
  const [currentPgn, setcurrentPgn] = useState<IPgn>();
  //State doesn't update if it's the same. so don't bind rerenders to piecesTurn state
  const [piecesTurn, setPiecesTurn] = useState("white"); // TODO: !!!!!!!fix turn change for navbar when clicking on black/white turn.
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <GamesHisory
        setcurrentPgn={setcurrentPgn}
        setPiecesTurn={setPiecesTurn}
      />
      <MainContent
        piecesTurn={piecesTurn}
        currentPgn={currentPgn!}
        setPiecesTurn={setPiecesTurn}
      />
    </div>
  );
}

export default App;
