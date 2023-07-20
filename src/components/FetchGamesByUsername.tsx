import { useRef, useState } from "react";
import FetchComponent from "./FetchComponent";
import { GamesContainer, InputWrap } from "../styles/GameHistoryStyles";
import ArchivedGame from "./ArchivedGame";
import pgnParser from "pgn-parser";
const FetchGamesByUsername = ({ setcurrentPgn, setPiecesTurn }) => {
  const username = useRef("kaarelen");
  const [allMonth, setAllMonth] = useState([]);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLastGames = async (allMonths, desiredGamesNum) => {
    const allMonthLength = allMonths.length;
    let gamesReceived = 0;

    for (let index = 0; index < allMonthLength; index++) {
      const lastMonth = allMonths.pop();
      try {
        setIsLoading(true);
        const response = await fetch(lastMonth);
        const result = await response.json();
        const curGameDate = lastMonth.slice(-7);
        setData({ ...data, [curGameDate]: result.games });
        gamesReceived += result.games.length;
        if (gamesReceived >= desiredGamesNum) break;
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setAllMonth([...allMonths]);
  };

  const infiniteScrollRange = 20;
  const getGemesForInfiniteScroll = (index) => {
    let start = index * infiniteScrollRange - 20;
    let stop = index * infiniteScrollRange;
    if (data.length < stop) fetchLastGames(allMonth, stop - data.length);
  };

  const getMonthWithGames = async () => {
    try {
      const response = await fetch(
        `https://api.chess.com/pub/player/${username.current}/games/archives`
      );
      const result = await response.json();
      if (result.archives) return result.archives;
      if (result.code === 0) return "wrong username";
    } catch (error) {
      console.log("something wrong");
    }
  };
  return (
    <>
      <FetchComponent
        useFetchStates={{ data, isLoading, error }}
        DataVisualisation={
          <GamesContainer>
            <button
              onClick={() => {
                setPiecesTurn("white"); //TODO: if user presses the button, the pgn of the game stays, if he keeps scrolling moves, evalbar will be incorrect
                setData({});
              }}
            >
              {"<="}
            </button>
            {Object.keys(data).length !== 0 &&
              Object.entries(data).map(([month, games], monthIndex) => {
                return (
                  <div key={monthIndex}>
                    <div>{month}</div>
                    {[...games].reverse().map((usersGameData, index) => {
                      const pgn = pgnParser.parse(usersGameData.pgn)[0];
                      pgn.rawPgn = usersGameData.pgn;
                      return (
                        <ArchivedGame
                          key={index}
                          usersGameData={usersGameData}
                          pgn={pgn}
                          setcurrentPgn={setcurrentPgn}
                          username={username}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </GamesContainer>
        }
      >
        <InputWrap>
          <div style={{ color: "var(--white-primary)" }}>
            Use Chess.com username
          </div>
          <input
            placeholder={"kaarelen"}
            onChange={(e) => (username.current = e.target.value)}
          />
          <button
            onClick={async () => {
              fetchLastGames(await getMonthWithGames(), 50);
            }}
          >
            aboba
          </button>
          <button
            onClick={async () => {
              fetchLastGames(allMonth, 20);
            }}
          >
            KEKL
          </button>
        </InputWrap>
      </FetchComponent>
    </>
  );
};

export default FetchGamesByUsername;
