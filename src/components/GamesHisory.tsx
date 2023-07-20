import { IPgn, ISectionContext } from "../types";
//
import { Container } from "../styles";
import FetchGamesByUsername from "./FetchGamesByUsername";
import FetchGamesByDate from "./FetchGamesByDate";
import FetchGameByLink from "./FetchGameByLink";
import { createContext, useState } from "react";
import SectionButton from "./SectionButton";

export const SectionContext = createContext<ISectionContext>(null!);

function GamesHisory({
  setcurrentPgn,
  setPiecesTurn,
}: {
  setcurrentPgn: (pgn: IPgn) => void;
  setPiecesTurn: (pieceTurn: string) => void;
}) {
  // https://api.chess.com/pub/player/kaarelen
  const [sections, setSections] = useState({
    byUsername: true,
    byDate: false,
    byLink: false,
  });
  return (
    <header>
      <Container>
        <SectionContext.Provider value={{ sections, setSections }}>
          <div style={{ display: "flex" }}>
            <SectionButton text="Username search" name="byUsername" />
            <SectionButton text="Date search" name="byDate" />
            <SectionButton text="Link search" name="byLink" />
          </div>
        </SectionContext.Provider>
        {sections.byUsername && (
          <FetchGamesByUsername
            setcurrentPgn={setcurrentPgn}
            setPiecesTurn={setPiecesTurn}
          />
        )}
        {sections.byDate && (
          <FetchGamesByDate
            setcurrentPgn={setcurrentPgn}
            setPiecesTurn={setPiecesTurn}
          />
        )}
        {sections.byLink && (
          <FetchGameByLink
          // setcurrentPgn={setcurrentPgn}
          // setPiecesTurn={setPiecesTurn}
          />
        )}
      </Container>
    </header>
  );
}

export default GamesHisory;
