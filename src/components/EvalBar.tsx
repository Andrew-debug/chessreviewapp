import { Bar, BlackBar } from "../styles";
import useGetPositionData from "../utils/useGetPositionData.ts";

function EvalBar({ currentMoveNumber }: { currentMoveNumber: number }) {
  let { positionEval } = useGetPositionData();

  if (currentMoveNumber % 2 === 0) {
    positionEval *= -1;
  }
  let filteredEval = positionEval;
  let minmax = 400;
  if (filteredEval > minmax) filteredEval = minmax;
  if (filteredEval < -minmax) filteredEval = -minmax;
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
              positionEval <= 0
                ? "var(--white-primary)"
                : "var(--black-primary)",
            position: "absolute",
            top: positionEval <= 0 ? 5 : 680,
            left: 6,
          }}
        >
          {Math.abs(positionEval / 100).toFixed(1)}
        </div>
      </div>
      <BlackBar evalScore={filteredEval} />
    </Bar>
  );
}

export default EvalBar;
