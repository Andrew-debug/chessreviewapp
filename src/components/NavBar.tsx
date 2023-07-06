import _ from "lodash";
import styled from "styled-components";
import useFetch from "../utils/useFetch";
// import ChartComponent from "./ChartComponent";
import BlackWhiteMove from "./BlackWhiteMove";
// import FetchComponent from "./FetchComponent";
import NavButtons from "./NavButtons";
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 100vh;
  background-color: var(--black-primary);
  max-width: 550px;
  max-height: 800px;
`;
const HorizontalMoveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 230px;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 15px;
  font-size: 14px;
`;

function NavBar({
  currentPgn,
  game,
  setGame,
  setcurrentMoveNumber,
  currentMoveNumber,
  piecesTurn,
  setPiecesTurn,
}) {
  const whiteMoves: string[] = [];
  const blackMoves: string[] = [];
  if (currentPgn) {
    currentPgn.moves.map((item: string, index: number) => {
      if (index % 2 === 0) {
        whiteMoves.push(item);
      } else {
        blackMoves.push(item);
      }
    });
  }
  const allMoves = _.zip(whiteMoves, blackMoves);

  const useGamesFetch = useFetch();
  // useEffect(() => {
  //   useGamesFetch.resetData();
  //   useGamesFetch.seturl(
  //     `http://${packageJson.config.serverIP}:8080/get_game_review?` +
  //       new URLSearchParams({
  //         pgn: currentPgn?.rawPgn,
  //       })
  //   );
  // }, [currentPgn]);

  return (
    <Container>
      {/* <div style={{ margin: 10 }}>
        <ChartComponent gameReviewData={useGamesFetch.data} />
      </div> */}
      {/* <PossibleEngineMoves /> */}
      <HorizontalMoveList>
        {allMoves.map(([wm, bm]: string[], index: number) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <BlackWhiteMove
                gameReviewData={useGamesFetch.data}
                wm={wm}
                bm={bm}
                game={game}
                index={index}
                currentPgn={currentPgn}
                setGame={setGame}
                setcurrentMoveNumber={setcurrentMoveNumber}
                currentMoveNumber={currentMoveNumber}
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

      <div style={{ position: "absolute", bottom: 0 }}>
        <NavButtons
          game={game}
          setGame={setGame}
          setcurrentMoveNumber={setcurrentMoveNumber}
          currentPgn={currentPgn}
          currentMoveNumber={currentMoveNumber}
          piecesTurn={piecesTurn}
          setPiecesTurn={setPiecesTurn}
        />
      </div>
    </Container>
  );
}

export default NavBar;
