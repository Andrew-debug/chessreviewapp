import { useRef, useState } from "react";
import { GamesContainer, InputWrap } from "../styles/GameHistoryStyles";
import { GameHistoryDate } from "../styles";
import { IPgn } from "../types";
import FetchComponent from "./FetchComponent";
import ArchivedGame from "./ArchivedGame";
import pgnParser from "pgn-parser";
import CustomError from "../utils/CustomError";
import PrimaryButton from "./PrimaryButton";

const FetchGamesByUsername = ({
  setcurrentPgn,
  setPiecesTurn,
  setIsGamesFetched,
}: {
  setcurrentPgn: (pgn: IPgn) => void;
  setPiecesTurn: (pieceTurn: string) => void;
  setIsGamesFetched: (v: boolean) => void;
}) => {
  const username = useRef("GothamChess"); //TODO: input loses value
  const [allMonth, setAllMonth] = useState([]);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchLastGames = async (allMonths, desiredGamesNum) => {
    const allMonthLength = allMonths?.length;
    let gamesReceived = 0;

    for (let index = 0; index < allMonthLength; index++) {
      const lastMonth = allMonths.pop();
      try {
        setIsLoading(true);
        const response = await fetch(lastMonth);
        const result = await response.json();
        const curGameDate = lastMonth.slice(-7);
        setData({ ...data, [curGameDate]: result.games });
        setIsGamesFetched(true);
        gamesReceived += result.games.length;
        if (gamesReceived >= desiredGamesNum) break;
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (allMonths) {
      setAllMonth([...allMonths]);
    }
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
      if (result.archives.length === 0) setError("No games played");
      if (result.code === 0) setError("wrong username");
      if (result.archives.length !== 0) return result.archives;
    } catch (error) {
      return "something wrong";
    }
  };

  return (
    <>
      <FetchComponent
        useFetchStates={{ data, isLoading, error }}
        DataVisualisation={
          <GamesContainer>
            <PrimaryButton
              text="Return"
              handleClick={() => {
                setPiecesTurn("white"); //TODO: if user presses the button, the pgn of the game stays, if he keeps scrolling moves, evalbar will be incorrect
                setData(null);
                setIsGamesFetched(false);
              }}
            />
            {data &&
              Object.entries(data).map(([date, games], dateIndex) => {
                return (
                  <div key={dateIndex}>
                    <GameHistoryDate>{date}</GameHistoryDate>
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
        CustomErrorRenderer={
          <CustomError
            error={error}
            setData={setData}
            setIsGamesFetched={setIsGamesFetched}
            setError={setError}
          />
        }
      >
        <InputWrap>
          <p>
            Use <span>Chess.com</span> username
          </p>
          <input
            placeholder={"GothamChess"}
            onChange={(e) => (username.current = e.target.value)}
          />
          <PrimaryButton
            text="Search games"
            handleClick={async () => {
              fetchLastGames(await getMonthWithGames(), 50);
            }}
          />

          {/* <PrimaryButton
            text="KEKL"
            handleClick={async () => {
              fetchLastGames(allMonth, 20);
            }}
          /> */}
        </InputWrap>
      </FetchComponent>
    </>
  );
};

export default FetchGamesByUsername;
