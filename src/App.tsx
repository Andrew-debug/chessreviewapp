import { useState, useEffect, useSyncExternalStore } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { stockfishResultsUpdated } from "./stockfishEvents";
//@ts-ignore
import { Pgn } from "../node_modules/cm-pgn/src/Pgn.js";
//
import GamesHisory from "./components/GamesHisory";
import EvalBar from "./components/EvalBar";
import NavBar from "./components/NavBar";
import CustomSquareRenderer from "./components/CustomSquareRenderer.js";
import { IPgn, StockfishInterface } from "./types/index.js";

function App({
  stockfishInterface,
}: {
  stockfishInterface: StockfishInterface;
}) {
  const stockfish_results = useSyncExternalStore(
    (callback) => {
      addEventListener(stockfishResultsUpdated.type, callback);
      return () => {
        removeEventListener(stockfishResultsUpdated.type, callback);
      };
    },
    () => JSON.stringify(stockfishInterface.getResults())
  ); // TODO: remake on separate signals
  const { bestMove, positionEval } = JSON.parse(stockfish_results);
  //@ts-ignore
  const [game, setGame] = useState(new Chess());
  const [currentPgn, setcurrentPgn] = useState<IPgn | undefined>(undefined);
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
    // setcurrentEval({ score: 0, is_mate: false });
  }, [currentPgn]);

  useEffect(() => {
    const pgn = new Pgn(game.pgn());
    const uci_moves = pgn.history.moves.map((val: { uci: string }) => val.uci);
    stockfishInterface.setPosition(uci_moves.join(" "));
    // console.log("SET POSITION AAAAAAAAAAAA");
  }, [currentMoveNumber]);

  // state doesn't update if it's the same. so don't bind rerenders to this state
  const [piecesTurn, setPiecesTurn] = useState("white");
  return (
    <div>
      {/* <h1 style={{ color: "white" }}>{game.fen()}</h1> */}
      <h1 style={{ color: "white" }}>{bestMove}</h1>
      <h1 style={{ color: "white" }}>{positionEval}</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GamesHisory setcurrentPgn={setcurrentPgn} />

        <div style={{ margin: "0 20px" }}>
          <div
            style={{
              height: 40,
              border: "1px solid white",
              marginBottom: 10,
              color: "white",
            }}
          >
            <span style={{ display: "flex" }}>
              <span style={{ marginRight: 10 }}>
                {currentPgn ? currentPgn.headers[5].value : "Opponent"}
              </span>
              <span>
                {currentPgn ? `(${currentPgn.headers[14].value})` : ""}
              </span>
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <EvalBar
              game={game}
              bestMove={bestMove}
              positionEval={positionEval}
              piecesTurn={piecesTurn}
              setPiecesTurn={setPiecesTurn}
            />
            <div style={{ display: "flex" }}>
              <Chessboard
                id="CustomSquare"
                animationDuration={100}
                boardWidth={700}
                position={game.fen()}
                customSquare={CustomSquareRenderer}
              />
            </div>
          </div>
          <div
            style={{
              height: 40,
              border: "1px solid white",
              marginTop: 10,
              color: "white",
            }}
          >
            <span style={{ display: "flex" }}>
              <span style={{ marginRight: 10 }}>
                {currentPgn ? currentPgn.headers[4].value : "Opponent"}
              </span>
              <span>
                {currentPgn ? `(${currentPgn.headers[13].value})` : ""}
              </span>
            </span>
          </div>
        </div>
        <NavBar
          currentPgn={currentPgn}
          game={game}
          setGame={setGame}
          setcurrentMoveNumber={setcurrentMoveNumber}
          currentMoveNumber={currentMoveNumber}
          piecesTurn={piecesTurn}
          setPiecesTurn={setPiecesTurn}
        />
      </div>
    </div>
  );
}

export default App;
