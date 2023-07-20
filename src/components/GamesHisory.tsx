import { IPgn } from "../types";
//
import { Container } from "../styles";
import FetchGamesByUsername from "./FetchGamesByUsername";
import FetchGamesByDate from "./FetchGamesByDate";
import FetchGameByLink from "./FetchGameByLink";
import { useState } from "react";
import SectionButton from "./SectionButton";

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

  const [isGamesFetched, setIsGamesFetched] = useState(false);
  return (
    <header>
      <Container>
        {!isGamesFetched && (
          <div style={{ display: "flex" }}>
            <SectionButton
              sections={sections}
              setSections={setSections}
              text="Username search"
              name="byUsername"
            />
            <SectionButton
              sections={sections}
              setSections={setSections}
              text="Date search"
              name="byDate"
            />
            <SectionButton
              sections={sections}
              setSections={setSections}
              text="Link search"
              name="byLink"
            />
          </div>
        )}
        {sections.byUsername && (
          <FetchGamesByUsername
            setcurrentPgn={setcurrentPgn}
            setPiecesTurn={setPiecesTurn}
            setIsGamesFetched={setIsGamesFetched}
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
