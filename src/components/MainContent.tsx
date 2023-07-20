import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { stockfishInterface } from "../stockfish.ts";
//@ts-expect-error
import { Pgn } from "cm-pgn/src/Pgn.js";
import capture from "../assets/sounds/capture.mp3";
import castle from "../assets/sounds/castle.mp3";
import moveCheck from "../assets/sounds/move-check.mp3";
import moveSelf from "../assets/sounds/move-self.mp3";
import promote from "../assets/sounds/promote.mp3";
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

  // useEffect(() => {
  //   const pgn = new Pgn(game.pgn());
  //   const uci_moves = pgn.history.moves.map((val: { uci: string }) => val.uci);
  //   stockfishInterface.setPosition(uci_moves.join(" "));
  // }, [currentMoveNumber]);

  // the reaseon why i put it onclick is that to controll backward moves
  useEffect(() => {
    if (currentMoveNumber === -1) return;

    const playAudio = (audio: string) => {
      new Audio(audio).play();
    };
    const moveIs = (moveType: string) =>
      currentPgn.moves[currentMoveNumber].move.includes(moveType);

    // x: capture, O: castle, +: check, #: mate, =: promotion
    if (moveIs("#") || moveIs("+")) {
      playAudio(moveCheck);
    } else if (moveIs("=")) {
      playAudio(promote);
    } else if (moveIs("O")) {
      playAudio(castle);
    } else if (moveIs("x")) {
      playAudio(capture);
    } else {
      playAudio(moveSelf);
    }
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
