import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { NavButtonsProps } from "../types";
import capture from "../assets/sounds/capture.mp3";
import castle from "../assets/sounds/castle.mp3";
import moveCheck from "../assets/sounds/move-check.mp3";
import moveSelf from "../assets/sounds/move-self.mp3";
import promote from "../assets/sounds/promote.mp3";
function NavButtons({
  game,
  setGame,
  currentMoveNumber,
  setcurrentMoveNumber,
  currentPgn,
  setPiecesTurn,
}: NavButtonsProps) {
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
      <Tooltip
        title={
          currentPgn ? (currentMoveNumber === -1 ? null : "First Move") : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color: "var(--button-active)",
              "&:disabled": { color: "var(--button-disabled)" },
            }}
            className="nav-btn--hovered"
            onClick={() => {
              const gameCopy = { ...game };
              gameCopy.reset();
              setGame(gameCopy);
              setcurrentMoveNumber(-1);
            }}
            disabled={
              currentPgn ? (currentMoveNumber === -1 ? true : false) : true
            }
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={
          currentPgn
            ? currentMoveNumber === -1
              ? null
              : "Previous Move"
            : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color: "var(--button-active)",
              "&:disabled": { color: "var(--button-disabled)" },
            }}
            className="nav-btn--hovered"
            onClick={() => {
              game.undo();
              setGame({ ...game });
              setcurrentMoveNumber((prev) => (prev > -1 ? prev - 1 : prev));
              setPiecesTurn((prev) => (prev === "white" ? "black" : "white"));
              makeMoveSound(currentMoveNumber);
            }}
            disabled={
              currentPgn ? (currentMoveNumber === -1 ? true : false) : true
            }
          >
            <NavigateBeforeIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={
          currentPgn
            ? currentMoveNumber === currentPgn?.moves.length - 1
              ? null
              : "Next Move"
            : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color: "var(--button-active)",
              "&:disabled": { color: "var(--button-disabled)" },
            }}
            className="nav-btn--hovered"
            onClick={() => {
              const gameCopy = { ...game };
              gameCopy.move(currentPgn.moves[currentMoveNumber + 1]?.move);
              setGame(gameCopy);
              setcurrentMoveNumber((prev) => prev + 1);
              setPiecesTurn((prev) => (prev === "white" ? "black" : "white"));
              makeMoveSound(currentMoveNumber + 1);
            }}
            disabled={
              currentPgn
                ? currentMoveNumber === currentPgn?.moves.length - 1
                  ? true
                  : false
                : true
            }
          >
            <NavigateNextIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={
          currentPgn
            ? currentMoveNumber === currentPgn?.moves.length - 1
              ? null
              : "Last Move"
            : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color: "var(--button-active)",
              "&:disabled": { color: "var(--button-disabled)" },
            }}
            className="nav-btn--hovered"
            onClick={() => {
              const gameCopy = { ...game };
              gameCopy.reset();
              currentPgn.moves.forEach((item) => gameCopy.move(item.move));
              setGame(gameCopy);
              setcurrentMoveNumber(currentPgn.moves.length - 1);
              makeMoveSound(currentPgn.moves.length - 1);
            }}
            disabled={
              currentPgn
                ? currentMoveNumber === currentPgn?.moves.length - 1
                  ? true
                  : false
                : true
            }
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}

export default NavButtons;
