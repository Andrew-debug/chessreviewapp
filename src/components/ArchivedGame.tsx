import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import rapid from "../assets/rapid.svg";
import blitz from "../assets/blitz.svg";
import bullet from "../assets/bullet.svg";
import custom from "../assets/custom.svg";
import daily from "../assets/daily.svg";
import {
  ArchivedGameContainer,
  BlackSquare,
  DrawComponent,
  GameWrap,
  LoseComponent,
  WhiteSquare,
  WinComponent,
} from "../styles/archivedGameStyles";
import { ArchivedGameProps, GameProps } from "../types";

const BlitzComponent = () => {
  return (
    <div style={{ width: 40, height: 40 }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={blitz}
        alt="blitz"
      />
    </div>
  );
};
const RapidComponent = () => {
  return (
    <div style={{ width: 30, height: 30 }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={rapid}
        alt="rapid"
      />
    </div>
  );
};
const DailyComponent = () => {
  return (
    <div style={{ width: 30, height: 30 }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={daily}
        alt="daily"
      />
    </div>
  );
};
const BulletComponent = () => {
  return (
    <div style={{ width: 20, height: 20 }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={bullet}
        alt="bullet"
      />
    </div>
  );
};
const CustomComponent = () => {
  return (
    <div style={{ width: 30, height: 30 }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={custom}
        alt="custom"
      />
    </div>
  );
};

const GameResultSquare = ({
  game,
  username,
}: {
  game: GameProps;
  username: string;
}) => {
  const lowerCurrentUsername = String(username).toLowerCase();

  const [userResult, oponentResult] = {
    [String(game.white.username).toLowerCase()]: [
      game.white.result,
      game.black.result,
    ],
    [String(game.black.username).toLowerCase()]: [
      game.black.result,
      game.white.result,
    ],
  }[lowerCurrentUsername];
  if (userResult === "win") {
    return (
      <WinComponent>
        <span>+</span>
      </WinComponent>
    );
  } else if (oponentResult === "win") {
    return (
      <LoseComponent>
        <span>-</span>
      </LoseComponent>
    );
  } else {
    return (
      <DrawComponent>
        <span>=</span>
      </DrawComponent>
    );
  }
};

function ArchivedGame({
  pgn,
  setcurrentPgn,
  game,
  username,
}: ArchivedGameProps) {
  const [isHovered, setisHovered] = useState(false);
  const whiteResult = game.white.result;
  const blackResult = game.black.result;
  console.log(pgn);
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
                }[game.time_class] || "Custom game"
              }
              placement="top"
            >
              <div>
                {{
                  blitz: <BlitzComponent />,
                  rapid: <RapidComponent />,
                  daily: <DailyComponent />,
                  bullet: <BulletComponent />,
                }[game.time_class] || <CustomComponent />}
              </div>
            </Tooltip>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <WhiteSquare whiteResult={whiteResult} />
                <span style={{ fontSize: 16 }}>{game.white.username}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BlackSquare blackResult={blackResult} />
                <span style={{ fontSize: 16 }}>{game.black.username}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <GameResultSquare game={game} username={username} />
            <div style={{ marginLeft: 30 }}>{pgn.headers[2].value}</div>
          </div>
        </div>
        <a
          style={{
            color: isHovered
              ? "var(--button-hovered)"
              : "var(--white-primary-dim)",
          }}
          href={game.url}
          target="_blank"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
        >
          {game.url}
        </a>
      </GameWrap>
    </ArchivedGameContainer>
  );
}

export default ArchivedGame;
