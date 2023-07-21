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
import { IPlayersInfo, MainContentProps } from "../types/index.ts";
import { getCountryData, getPlayerData } from "../utils/index.ts";
//
import NavBar from "./NavBar.tsx";
import EvalBar from "./EvalBar.tsx";
import CustomSquareRenderer from "./CustomSquareRenderer.tsx";
import PlayerInformation from "./PlayerInformation.tsx";

const MainContent = ({
  piecesTurn,
  currentPgn,
  setPiecesTurn,
}: MainContentProps) => {
  const [game, setGame] = useState(new Chess());
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  const [playersInfo, setPlayersInfo] = useState<IPlayersInfo | null>(null);

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

  useEffect(() => {
    const fetchPlayersInfo = async () => {
      if (!currentPgn) return;
      try {
        const whiteUsername = currentPgn?.headers[4].value;
        const blackUsername = currentPgn?.headers[5].value;

        const [whiteResult, blackResult] = await Promise.all([
          getPlayerData(whiteUsername),
          getPlayerData(blackUsername),
        ]);

        const [whiteCountryResult, blackCountryResult] = await Promise.all([
          getCountryData(whiteResult.country),
          getCountryData(blackResult.country),
        ]);

        setPlayersInfo({
          white: {
            avatar: whiteResult.avatar,
            country: whiteCountryResult.name,
            countryCode: whiteCountryResult.code,
          },
          black: {
            avatar: blackResult.avatar,
            country: blackCountryResult.name,
            countryCode: blackCountryResult.code,
          },
        });
      } catch (error) {
        console.log(error, "no info");
      }
    };
    fetchPlayersInfo();
  }, [currentPgn]);

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
        setPiecesTurn={setPiecesTurn}
      />
    </>
  );
};

export default MainContent;
