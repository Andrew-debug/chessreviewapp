import styled from "styled-components";
import useFetch from "../utils/useFetch";
import { useState } from "react";
import ArchivedGame from "./ArchivedGame";
import { Container } from "./NavBar";
import FetchComponent from "./FetchComponent";

import pgnParser from "pgn-parser";
const GamesContainer = styled.div`
  max-width: 500px;
  max-height: 800px;
  overflow-x: hidden;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function GamesHisory({ setcurrentPgn }: { setcurrentPgn: (pgn: any) => void }) {
  const [username, setUsername] = useState("GothamChess");

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
            <button onClick={useGamesFetch.resetData}>{"<="}</button>
            {useGamesFetch.data &&
              [...useGamesFetch.data.games.slice(-20)]
                .reverse()
                // .slice(0, 20)
                .map((game, index) => {
                  const pgn = pgnParser.parse(game.pgn)[0];
                  pgn.rawPgn = game.pgn;
                  return (
                    <ArchivedGame
                      key={index}
                      game={game}
                      pgn={pgn}
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
