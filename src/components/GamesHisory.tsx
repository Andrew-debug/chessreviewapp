import { useState } from "react";
import { IPgn } from "../types";
import pgnParser from "pgn-parser";

import ArchivedGame from "./ArchivedGame";
import { Container } from "./NavBar";
import FetchComponent from "./FetchComponent";
import useFetch from "../utils/useFetch";
import { GamesContainer, InputWrap } from "../styles/GameHistoryStyles";

function GamesHisory({
  setcurrentPgn,
  setPiecesTurn,
}: {
  setcurrentPgn: (pgn: IPgn) => void;
  setPiecesTurn: (pieceTurn: string) => void;
}) {
  const [username, setUsername] = useState("kaarelen");

  const useGamesFetch = useFetch(
    `https://api.chess.com/pub/player/${username}/games/2023/06`
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    const updatedUrl = `https://api.chess.com/pub/player/${e.target.value}/games/2023/06`;
    useGamesFetch.seturl(updatedUrl);
  };

  return (
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
            {useGamesFetch.data &&
              [...useGamesFetch.data.games.slice(-20)]
                .reverse()
                // .slice(0, 20)
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
                })}
          </GamesContainer>
        }
      >
        <InputWrap>
          <div style={{ color: "var(--white-primary)" }}>
            Use Chess.com username
          </div>
          <input value={username} onChange={handleUsernameChange} />
          <button onClick={useGamesFetch.fetchDataAction}>Fetch Data</button>
        </InputWrap>
      </FetchComponent>
    </Container>
  );
}

export default GamesHisory;
