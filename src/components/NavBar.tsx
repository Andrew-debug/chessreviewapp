import _ from "lodash";
// import useFetch from "../utils/useFetch";
// import ChartComponent from "./ChartComponent";
// import FetchComponent from "./FetchComponent";
import NavButtons from "./NavButtons";
import { NavBarProps } from "../types";
import useGetPositionData from "../utils/useGetPositionData";
import { Container, HorizontalMoveList } from "../styles";
import { Move, MoveWrap, Turn } from "../styles/blackWhiteMoveStyles";

const NavBar = ({
  currentPgn,
  game,
  setGame,
  setcurrentMoveNumber,
  currentMoveNumber,
}: NavBarProps) => {
  // let white_color;
  // let black_color;
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

  // const useGamesFetch = useFetch();
  // useEffect(() => {
  //   useGamesFetch.resetData();
  //   useGamesFetch.seturl(
  //     `http://${packageJson.config.serverIP}:8080/get_game_review?` +
  //       new URLSearchParams({
  //         pgn: currentPgn?.rawPgn,
  //       })
  //   );
  // }, [currentPgn]);

  const {
    bestMove,
    // positionEval
  } = useGetPositionData();

  return (
    <nav>
      <Container>
        {/* <div style={{ margin: 10 }}>
        <ChartComponent gameReviewData={useGamesFetch.data} />
      </div> */}
        {/* <PossibleEngineMoves /> */}
        <HorizontalMoveList>
          {currentPgn?.moves.map((move, index) => {
            return (
              <MoveWrap key={index}>
                {index % 2 === 0 && <Turn>{move.move_number}</Turn>}
                <Move
                  currentMoveNumber={currentMoveNumber}
                  index={index}
                  onClick={() => {
                    game.reset();
                    currentPgn.moves
                      .slice(0, index + 1)
                      .forEach((item) => game.move(item.move));
                    setGame({ ...game });
                    setcurrentMoveNumber(index);
                  }}
                >
                  {move.move}
                </Move>
              </MoveWrap>
            );
          })}
        </HorizontalMoveList>
        {/* <ReviewMsg /> */}
        {/* <FetchComponent useFetchStates={useGamesFetch} DataVisualisation={null}>
        <button
          onClick={useGamesFetch.fetchDataAction}
          disabled={currentPgn ? false : true}
        >
          show game review
        </button>
      </FetchComponent> */}

        <div>
          <h3 style={{ color: "white" }}>Best move: {bestMove}</h3>
          {/* <h3 style={{ color: "white" }}>
            evaluation bar numbers: {positionEval}
          </h3> */}
        </div>

        <div style={{ position: "absolute", bottom: 0 }}>
          <NavButtons
            game={game}
            setGame={setGame}
            currentMoveNumber={currentMoveNumber}
            setcurrentMoveNumber={setcurrentMoveNumber}
            currentPgn={currentPgn}
          />
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
