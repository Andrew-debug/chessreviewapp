import Tooltip from "@mui/material/Tooltip";
import rapid from "../assets/icons/rapid.svg";
import blitz from "../assets/icons/blitz.svg";
import bullet from "../assets/icons/bullet.svg";
import custom from "../assets/icons/custom.svg";
import daily from "../assets/icons/daily.svg";
import { ArchivedGameProps, IPgn } from "../types";
import {
  ArchivedGameContainer,
  BlackSquare,
  GameWrap,
  Unsupported,
  WhiteSquare,
} from "../styles/archivedGameStyles";
import GameIcon from "../utils/GameIcon";
import GameResultSquare from "./GameResultSquare";
import { GameLink } from "../styles";

const ArchivedGame = ({
  pgn,
  setcurrentPgn,
  usersGameData,
  username,
}: ArchivedGameProps) => {
  return (
    <>
      <ArchivedGameContainer>
        <GameWrap
          style={{ padding: 10 }}
          onClick={() => {
            if (pgn?.headers![0].value === "Live Chess")
              setcurrentPgn(pgn as IPgn);
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Tooltip
                title={
                  {
                    blitz: "Blitz game",
                    rapid: "Rapid game",
                    daily: "Daily game",
                    bullet: "Bullet game",
                  }[usersGameData.time_class] || "Custom game"
                }
                placement="top"
              >
                <div>
                  {{
                    blitz: <GameIcon icon={blitz} size={40} alt="blitz" />,
                    rapid: <GameIcon icon={rapid} size={30} alt="rapid" />,
                    daily: <GameIcon icon={daily} size={30} alt="daily" />,
                    bullet: <GameIcon icon={bullet} size={20} alt="bullet" />,
                  }[usersGameData.time_class] || (
                    <GameIcon icon={custom} size={30} alt="custom" />
                  )}
                </div>
              </Tooltip>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WhiteSquare whiteResult={usersGameData.white.result} />
                  <span style={{ fontSize: 16 }}>
                    {usersGameData.white.username}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BlackSquare blackResult={usersGameData.black.result} />
                  <span style={{ fontSize: 16 }}>
                    {usersGameData.black.username}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <GameResultSquare
                usersGameData={usersGameData}
                username={username}
              />
              <div style={{ marginLeft: 30 }}>{pgn.headers![2].value}</div>
            </div>
          </div>
          <GameLink href={usersGameData.url} target="_blank">
            {usersGameData.url}
          </GameLink>
          {pgn?.headers![0].value !== "Live Chess" && (
            <>
              <Unsupported>
                <p>Game type is not supported yet</p>
              </Unsupported>
            </>
          )}
        </GameWrap>
      </ArchivedGameContainer>
    </>
  );
};

export default ArchivedGame;
