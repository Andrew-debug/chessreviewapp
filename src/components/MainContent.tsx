import { useEffect, useRef, useState } from "react";
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
import { MainContentProps } from "../types/index.ts";
//
import NavBar from "./NavBar.tsx";
import EvalBar from "./EvalBar.tsx";
import CustomSquareRenderer from "./CustomSquareRenderer.tsx";
import PlayerInformation from "./PlayerInformation.tsx";
import useGetPlayersInfo from "../utils/useGetPlayersInfo.ts";
// import useGetPositionData from "../utils/useGetPositionData.ts";

// TODO: move it
const useIsMount = () => {
  const isMountRef = useRef(false);
  useEffect(() => {
    isMountRef.current = true;
  }, []);
  return isMountRef.current;
};

const MainContent = ({ currentPgn }: MainContentProps) => {
  const [game, setGame] = useState(new Chess());
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  const isMount = useIsMount();
  const playersInfo = useGetPlayersInfo(currentPgn);

  const fishGiveMeYourOpinion = () => {
    const pgn = new Pgn(game.pgn());
    const uci_moves = pgn.history.moves.map((val: { uci: string }) => val.uci);
    stockfishInterface.setPosition(uci_moves.join(" "));
  };
  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
    if (currentPgn) {
      // start fish on game load
      fishGiveMeYourOpinion();
    }
  }, [currentPgn]);

  useEffect(() => {
    if (isMount) {
      fishGiveMeYourOpinion();
    }
  }, [currentMoveNumber]);

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

  // const { bestMove } = useGetPositionData();
  // const regex = /([a-h][1-8])/g;
  // console.log(bestMove.match(regex));
  return (
    <>
      <main style={{ margin: "0 20px" }}>
        <PlayerInformation
          color="black"
          currentPgn={currentPgn}
          avatar={playersInfo?.black.avatar!}
          country={playersInfo?.black.country!}
          countryCode={playersInfo?.black.countryCode!}
        />
        <div style={{ display: "flex" }}>
          <EvalBar currentMoveNumber={currentMoveNumber} />
          <div style={{ position: "relative" }}>
            <Chessboard
              id="CustomSquare"
              animationDuration={100}
              boardWidth={700}
              position={game.fen()}
              customSquare={CustomSquareRenderer}
              // customArrows={[bestMove.match(regex)]}
            />
          </div>
        </div>
        <PlayerInformation
          color="white"
          currentPgn={currentPgn}
          avatar={playersInfo?.white.avatar!}
          country={playersInfo?.white.country!}
          countryCode={playersInfo?.white.countryCode!}
        />
      </main>
      <NavBar
        currentPgn={currentPgn!}
        game={game}
        setGame={setGame}
        setcurrentMoveNumber={setcurrentMoveNumber}
        currentMoveNumber={currentMoveNumber}
      />
    </>
  );
};

export default MainContent;
