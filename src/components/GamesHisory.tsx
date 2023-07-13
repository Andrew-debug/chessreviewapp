import { useState, useEffect } from "react";
import { IPgn } from "../types";
import pgnParser from "pgn-parser";

import ArchivedGame from "./ArchivedGame";
import FetchComponent from "./FetchComponent";
import useFetch from "../utils/useFetch";
import { GamesContainer, InputWrap } from "../styles/GameHistoryStyles";
import { Container } from "../styles";

function GamesHisory({
  setcurrentPgn,
  setPiecesTurn,
}: {
  setcurrentPgn: (pgn: IPgn) => void;
  setPiecesTurn: (pieceTurn: string) => void;
}) {
  const [username, setUsername] = useState("GothamChess");
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const url = `https://api.chess.com/pub/player/${username}/games/${year}/${
    month < 10 ? "0" + month : month
  }`;

  const useGamesFetch = useFetch("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    const updatedUrl = `https://api.chess.com/pub/player/${e.target.value}/games/${year}/${month}`;
    useGamesFetch.seturl(updatedUrl);
  };

  useEffect(() => {
    useGamesFetch.seturl(url);
  }, [url]);

  // const gamesFetch = async () => {
  //   const response1 = await fetch(
  //     `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
  //   );
  //   const data1 = await response1.json();
  //   setGames((prevData) => [...prevData, ...data1.games]);

  //   const response2 = await fetch(
  //     `https://api.chess.com/pub/player/${username}/games/${year}/${
  //       month === 1 ? 12 : "0" + (month - 1)
  //     }`
  //   );
  //   const data2 = await response2.json();
  //   setGames((prevData) => [...prevData, ...data2.games]);
  // };

  return (
    <header>
      <Container>
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
            <input value={username} onChange={handleUsernameChange} />
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
      </Container>
    </header>
  );
}

export default GamesHisory;
