import { useRef, useState } from "react";
import { GamesContainer, InputWrap } from "../styles/GameHistoryStyles";
import useFetch from "../utils/useFetch";
import FetchComponent from "./FetchComponent";
import pgnParser from "pgn-parser";
import ArchivedGame from "./ArchivedGame";

const FetchGamesByDate = ({ setcurrentPgn, setPiecesTurn }) => {
  const username = useRef("kaarelen");
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const url = `https://api.chess.com/pub/player/${
    username.current
  }/games/${year}/${month < 10 ? "0" + month : month}`;

  const useGamesFetch = useFetch("");
  return (
    <>
      <FetchComponent
        useFetchStates={useGamesFetch}
        DataVisualisation={
          <GamesContainer>
            <button
              onClick={() => {
                setPiecesTurn("white"); //TODO: if user presses the button, the pgn of the game stays, if he keeps scrolling moves, evalbar will be incorrect
                useGamesFetch.resetData();
              }}
            >
              {"<="}
            </button>
            {useGamesFetch.data?.games ? (
              useGamesFetch.data.games.length === 0 ? (
                <div>no games this month</div>
              ) : (
                [...useGamesFetch.data.games]
                  .reverse()
                  .map((usersGameData, index) => {
                    const pgn = pgnParser.parse(usersGameData.pgn)[0];
                    //@ts-ignore
                    pgn.rawPgn = usersGameData.pgn;
                    return (
                      <ArchivedGame
                        key={index}
                        usersGameData={usersGameData}
                        pgn={pgn}
                        //@ts-ignore
                        setcurrentPgn={setcurrentPgn}
                        username={username}
                      />
                    );
                  })
              )
            ) : (
              <div>wrong username</div>
            )}
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
          <div style={{ color: "var(--white-primary)" }}>Month</div>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(+e.target.value)}
          />
          <div style={{ color: "var(--white-primary)" }}>Year</div>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(+e.target.value)}
          />
          <button onClick={useGamesFetch.fetchDataAction}>Search</button>
        </InputWrap>
      </FetchComponent>
    </>
  );
};

export default FetchGamesByDate;
