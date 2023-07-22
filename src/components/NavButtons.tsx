import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { NavButtonsProps } from "../types";

function NavButtons({
  game,
  setGame,
  currentMoveNumber,
  setcurrentMoveNumber,
  currentPgn,
}: NavButtonsProps) {
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
              game.reset();
              setGame({ ...game });
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
              setcurrentMoveNumber((prev) => (prev > -1 ? (prev -= 1) : prev));
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
              game.move(currentPgn.moves[currentMoveNumber + 1]?.move);
              setGame({ ...game });
              setcurrentMoveNumber((prev) => (prev += 1));
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
