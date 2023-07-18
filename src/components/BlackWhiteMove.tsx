import { BlackStyles, WhiteStyles } from "../styles/blackWhiteMoveStyles";
import {
  BlackWhiteMoveProps,
  // PieceMove
} from "../types";
import capture from "../assets/sounds/capture.mp3";
import castle from "../assets/sounds/castle.mp3";
import moveCheck from "../assets/sounds/move-check.mp3";
import moveSelf from "../assets/sounds/move-self.mp3";
import promote from "../assets/sounds/promote.mp3";
// TODO: refactor sounds fn
function BlackWhiteMove({
  wm,
  bm,
  index,
  // gameReviewData,
  currentPgn,
  game,
  setGame,
  setcurrentMoveNumber,
  currentMoveNumber,
  setPiecesTurn,
}: BlackWhiteMoveProps) {
  let white_color;
  let black_color;
  // if (gameReviewData) {
  //   const white_moves_review = gameReviewData.all_moves.filter(
  //     (_: any, index: number) => index % 2 === 0
  //   );
  //   const black_moves_review = gameReviewData.all_moves.filter(
  //     (_: any, index: number) => index % 2 !== 0
  //   );
  //   const white_scorr_diff =
  //     white_moves_review[index]?.score -
  //     (black_moves_review[index - 1]
  //       ? black_moves_review[index - 1].score
  //       : 33);

  //   const black_scorr_diff = black_moves_review[index]
  //     ? black_moves_review[index].score - white_moves_review[index]?.score
  //     : 0;

  //   function evalDiffToColor(evalDiff) {
  //     if (evalDiff < 10 && evalDiff > -10) {
  //       return "white";
  //     } else {
  //       if (evalDiff > 0) {
  //         if (evalDiff > 40) {
  //           return "blue";
  //         } else {
  //           return "green";
  //         }
  //       } else {
  //         if (evalDiff > -40) {
  //           return "pink";
  //         } else {
  //           return "red";
  //         }
  //       }
  //     }
  //   }
  //   white_color = evalDiffToColor(white_scorr_diff);
  //   black_color = evalDiffToColor(-black_scorr_diff);
  // } else {
  //   white_color = "white";
  //   black_color = "white";
  // }

  const makeMoveSound = (curMoveNumber: number) => {
    if (!currentPgn) return;
    const playAudio = (audio: string) => {
      new Audio(audio).play();
    };

    const moveIs = (moveType: string) =>
      currentPgn.moves[curMoveNumber].move.includes(moveType);

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
  };

  return (
    <>
      <div
        style={{
          color: "rgba(255,255,255, 0.5)",
          marginRight: 5,
          padding: 1,
        }}
      >
        {wm.move_number}.
      </div>
      <WhiteStyles
        style={{ color: white_color }}
        currentMoveNumber={currentMoveNumber}
        index={index}
        onClick={() => {
          game.reset();
          currentPgn.moves
            .slice(0, index * 2 + 1)
            .forEach((item) => game.move(item.move));
          setGame({ ...game });
          setcurrentMoveNumber(index * 2);
          setPiecesTurn("black");
          makeMoveSound(currentMoveNumber + 1);
        }}
      >
        {wm?.move}
      </WhiteStyles>
      <BlackStyles
        style={{ color: black_color }}
        currentMoveNumber={currentMoveNumber}
        index={index}
        onClick={() => {
          game.reset();
          currentPgn.moves
            .slice(0, index * 2 + 2) // they come in pairs, black is 2nd (odd)
            .forEach((item) => game.move(item.move));
          setGame({ ...game });
          setcurrentMoveNumber(index * 2 + 1);
          setPiecesTurn("white");
          makeMoveSound(currentMoveNumber + 1);
        }}
      >
        {bm?.move}
      </BlackStyles>
    </>
  );
}

export default BlackWhiteMove;
