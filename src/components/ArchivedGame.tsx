import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import rapid from "../assets/rapid.svg";
import blitz from "../assets/blitz.svg";
import bullet from "../assets/bullet.svg";
import custom from "../assets/custom.svg";
import daily from "../assets/daily.svg";
import { ArchivedGameProps } from "../types";
import {
  ArchivedGameContainer,
  BlackSquare,
  GameWrap,
  WhiteSquare,
} from "../styles/archivedGameStyles";
import GameIcon from "../utils/GameIcon";
import GameResultSquare from "./GameResultSquare";

const ArchivedGame = ({
  pgn,
  setcurrentPgn,
  usersGameData,
  username,
}: ArchivedGameProps) => {
  const [isHovered, setisHovered] = useState(false);
  const whiteResult = usersGameData.white.result;
  const blackResult = usersGameData.black.result;
  return (
    <ArchivedGameContainer>
      <GameWrap
        style={{ padding: 10 }}
        onClick={() => {
          setcurrentPgn(pgn);
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
                <WhiteSquare whiteResult={whiteResult} />
                <span style={{ fontSize: 16 }}>
                  {usersGameData.white.username}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BlackSquare blackResult={blackResult} />
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
        <a
          style={{
            color: isHovered
              ? "var(--button-hovered)"
              : "var(--white-primary-dim)",
          }}
          href={usersGameData.url}
          target="_blank"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
        >
          {usersGameData.url}
        </a>
      </GameWrap>
    </ArchivedGameContainer>
  );
};

export default ArchivedGame;
