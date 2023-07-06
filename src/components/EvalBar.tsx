import styled from "styled-components";

const Bar = styled.div`
  position: relative;
  width: 40px;
  background-color: var(--black-primary);
  margin: 0 10px;
  overflow: hidden;
`;

const BlackBar = styled.div`
  background-color: var(--white-primary);
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  transition: transform 1s ease-in;
  width: 100%;
  z-index: 1;
  transform: ${({ evalScore }: { evalScore: number }) =>
    `translate3d(0px, ${100 - (evalScore / 100 + 5) * 10}%, 0px)`};
`;

function EvalBar({ game, bestMove, tmp, piecesTurn, setPiecesTurn }) {
  // const [evaluation, setEvaluation] = useState(30);
  // const [latestDependency, setLatestDependency] = useState(positionEval);

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted && latestDependency === positionEval) {
  //     setEvaluation(positionEval);
  //     if (piecesTurn === "black") {
  //       setEvaluation((prev) => prev * -1);
  //     }
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [positionEval, latestDependency]);

  // useEffect(() => {
  //   setLatestDependency(positionEval);
  // }, [positionEval]);

  // let evalScore = evaluation;
  // if (evaluation > 400) evalScore = 400;
  // if (evaluation < -400) evalScore = -400;

  // if (piecesTurn === "black") {
  //   positionEval = positionEval * -1;
  // }
  let evalScore = tmp;
  if (tmp > 400) evalScore = 400;
  if (tmp < -400) evalScore = -400;
  return (
    <Bar>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          fontSize: 14,
          color: "white",
        }}
      >
        <div
          style={{
            color: tmp > 0 ? "black" : "white",
            position: "absolute",
            top: tmp > 0 ? 530 : 0,
            left: 12,
          }}
        >
          {(tmp / 100).toFixed(1)}
        </div>
      </div>
      <BlackBar evalScore={evalScore} />
    </Bar>
  );
}

export default EvalBar;
