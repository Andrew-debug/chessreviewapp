import { useRef, useState } from "react";
import { GamesContainer, InputWrap } from "../styles/GameHistoryStyles";
import { IPgn } from "../types";
import useFetch from "../utils/useFetch";
import FetchComponent from "./FetchComponent";
import pgnParser from "pgn-parser";
import ArchivedGame from "./ArchivedGame";
import PrimaryButton from "./PrimaryButton";

const FetchGamesByDate = ({
  setcurrentPgn,
  setPiecesTurn,
}: {
  setcurrentPgn: (pgn: IPgn) => void;
  setPiecesTurn: (pieceTurn: string) => void;
}) => {
  const username = useRef("GothamChess"); // TODO: input loses value
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const url = `https://api.chess.com/pub/player/${
    username.current
  }/games/${year}/${month < 10 ? "0" + month : month}`;

  const useGamesFetch = useFetch(url);
  return (
    <>
      <FetchComponent
        useFetchStates={useGamesFetch}
        DataVisualisation={
          <GamesContainer>
            <PrimaryButton
              text="Return"
              handleClick={() => {
                setPiecesTurn("white"); //TODO: if user presses the button, the pgn of the game stays, if he keeps scrolling moves, evalbar will be incorrect
                useGamesFetch.resetData();
              }}
            />
            {useGamesFetch.data?.games ? (
              useGamesFetch.data.games.length === 0 ? (
                <div>No games this month</div>
              ) : (
                [...useGamesFetch.data.games]
                  .reverse()
                  .map((usersGameData, index) => {
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
                  })
              )
            ) : (
              <div>wrong username</div>
            )}
          </GamesContainer>
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
          <PrimaryButton
            text="Search games"
            handleClick={useGamesFetch.fetchDataAction}
          />
        </InputWrap>
      </FetchComponent>
    </>
  );
};

export default FetchGamesByDate;
