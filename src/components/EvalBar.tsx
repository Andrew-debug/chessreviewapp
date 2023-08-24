import { useEffect } from "react";
import useGetPositionData from "../utils/useGetPositionData.ts";
import {
  Bar,
  BlackBar,
  EvalNumbers,
  WhiteBar,
} from "../styles/EvalBarStyles.ts";

let filteredEval = 0;
function EvalBar({ currentMoveNumber }: { currentMoveNumber: number }) {
  let { positionEval } = useGetPositionData();
  const minmax = 400;

  useEffect(() => {
    const delay = setTimeout(() => {
      if (currentMoveNumber % 2 === 0) {
        filteredEval = positionEval * -1;
      } else {
        filteredEval = positionEval;
      }
    }, 50);

    return () => {
      clearTimeout(delay);
    };
  }, [positionEval]);

  if (filteredEval > minmax) filteredEval = minmax;
  if (filteredEval < -minmax) filteredEval = -minmax;
  return (
    <Bar>
      <WhiteBar>
        <EvalNumbers filteredEval={filteredEval}>
          {Math.abs(positionEval / 100).toFixed(1)}
        </EvalNumbers>
      </WhiteBar>
      <BlackBar filteredEval={filteredEval} />
    </Bar>
  );
}

export default EvalBar;
