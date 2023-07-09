import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { stockfishInterface } from "../stockfish.ts";
//@ts-expect-error
import { Pgn } from "cm-pgn/src/Pgn.js";
//
import NavBar from "./NavBar.tsx";
import EvalBar from "./EvalBar.tsx";
import CustomSquareRenderer from "./CustomSquareRenderer.tsx";
import { ActiveUserData } from "../styles/index.ts";
import { MainContentProps } from "../types/index.ts";

const MainContent = ({
  piecesTurn,
  currentPgn,
  setPiecesTurn,
}: MainContentProps) => {
  const [game, setGame] = useState(new Chess());
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
  }, [currentPgn]);

  useEffect(() => {
    const pgn = new Pgn(game.pgn());
    const uci_moves = pgn.history.moves.map((val: { uci: string }) => val.uci);
    stockfishInterface.setPosition(uci_moves.join(" "));
  }, [currentMoveNumber]);

  return (
    <>
      <main style={{ margin: "0 20px" }}>
        <ActiveUserData>
          <span style={{ display: "flex" }}>
            <span style={{ marginRight: 10 }}>
              {currentPgn ? currentPgn.headers[5].value : "Opponent"}
            </span>
            <span>{currentPgn ? `(${currentPgn.headers[14].value})` : ""}</span>
          </span>
        </ActiveUserData>
        <div style={{ display: "flex" }}>
          <EvalBar piecesTurn={piecesTurn} />
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
        <ActiveUserData>
          <span style={{ display: "flex" }}>
            <span style={{ marginRight: 10 }}>
              {currentPgn ? currentPgn.headers[4].value : "Opponent"}
            </span>
            <span>{currentPgn ? `(${currentPgn.headers[13].value})` : ""}</span>
          </span>
        </ActiveUserData>
      </main>
      <NavBar
        currentPgn={currentPgn!}
        game={game}
        setGame={setGame}
        setcurrentMoveNumber={setcurrentMoveNumber}
        currentMoveNumber={currentMoveNumber}
        setPiecesTurn={setPiecesTurn}
      />
    </>
  );
};

export default MainContent;
