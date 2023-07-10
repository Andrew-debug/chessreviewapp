import _ from "lodash";
// import useFetch from "../utils/useFetch";
// import ChartComponent from "./ChartComponent";
import BlackWhiteMove from "./BlackWhiteMove";
// import FetchComponent from "./FetchComponent";
import NavButtons from "./NavButtons";
import { NavBarProps, PieceMove } from "../types";
import { useGetPositionData } from "../utils/useGetPositionData";
import { Container, HorizontalMoveList } from "../styles";

const NavBar = ({
  currentPgn,
  game,
  setGame,
  setcurrentMoveNumber,
  currentMoveNumber,
  setPiecesTurn,
}: NavBarProps) => {
  const whiteMoves: PieceMove[] = [];
  const blackMoves: PieceMove[] = [];
  if (currentPgn) {
    currentPgn.moves.map((item, index) => {
      if (index % 2 === 0) {
        whiteMoves.push(item);
      } else {
        blackMoves.push(item);
      }
    });
  }
  const allMoves = _.zip(whiteMoves, blackMoves);

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
  const { bestMove, positionEval } = useGetPositionData();
  return (
    <nav>
      <Container>
        {/* <div style={{ margin: 10 }}>
        <ChartComponent gameReviewData={useGamesFetch.data} />
      </div> */}
        {/* <PossibleEngineMoves /> */}
        <HorizontalMoveList>
          {allMoves.map(([wm, bm], index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <BlackWhiteMove
                  // gameReviewData={useGamesFetch.data}
                  wm={wm!}
                  bm={bm!}
                  game={game}
                  index={index}
                  currentPgn={currentPgn}
                  setGame={setGame}
                  setcurrentMoveNumber={setcurrentMoveNumber}
                  currentMoveNumber={currentMoveNumber}
                  setPiecesTurn={setPiecesTurn}
                />
              </div>
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
            setPiecesTurn={setPiecesTurn} //TODO: remove it
          />
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
