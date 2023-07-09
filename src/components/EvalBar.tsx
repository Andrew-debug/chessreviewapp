import { useState, useEffect } from "react";
import { Bar, BlackBar } from "../styles";
import { useGetPositionData } from "../utils/useGetPositionData.ts";

function EvalBar({ piecesTurn }: { piecesTurn: string }) {
  const [filteredEval, setFilteredEval] = useState(0);

  const { positionEval } = useGetPositionData();

  useEffect(() => {
    if (piecesTurn === "black") {
      // reverse eval because stockfish sends data from POV of white only
      const reversedEval = positionEval * -1;
      setFilteredEval(reversedEval);
    } else {
      setFilteredEval(positionEval);
    }
  }, [positionEval]);

  let evalScore = filteredEval;
  if (!evalScore) evalScore = 0;
  if (filteredEval > 400) evalScore = 400;
  if (filteredEval < -400) evalScore = -400;
  return (
    <Bar>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          fontSize: 11,
          fontWeight: 600,
          color: "var(--white-primary)",
        }}
      >
        <div
          style={{
            color:
              filteredEval > 0
                ? "var(--black-primary)"
                : "var(--white-primary)",
            position: "absolute",
            top: filteredEval > 0 ? 680 : 5,
            left: 6,
          }}
        >
          {filteredEval
            ? evalScore < 0
              ? Math.abs(filteredEval / 100).toFixed(1)
              : (filteredEval / 100).toFixed(1)
            : "0.0"}
        </div>
      </div>
      <BlackBar evalScore={evalScore} />
    </Bar>
  );
}

export default EvalBar;
