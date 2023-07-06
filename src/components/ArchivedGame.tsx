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
//@ts-ignore
const GameResultSquare = ({ item, username }) => {
  const lowerCurrentUsername = String(username).toLowerCase();

  const [userResult, oponentResult] = {
    [String(item.white.username).toLowerCase()]: [
      item.white.result,
      item.black.result,
    ],
    [String(item.black.username).toLowerCase()]: [
      item.black.result,
      item.white.result,
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
//@ts-ignore
function ArchivedGame({ pgn, setcurrentPgn, item, username }) {
  const [isHovered, setisHovered] = useState(false);
  const whiteResult = item.white.result;
  const blackResult = item.black.result;
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
                //@ts-ignore
                {
                  blitz: "Blitz game",
                  rapid: "Rapid game",
                  daily: "Daily game",
                  bullet: "Bullet game",
                }[item.time_class] || "Custom game"
              }
              placement="top"
            >
              <div>
                {
                  //@ts-ignore
                  {
                    blitz: <BlitzComponent />,
                    rapid: <RapidComponent />,
                    daily: <DailyComponent />,
                    bullet: <BulletComponent />,
                  }[item.time_class] || <CustomComponent />
                }
              </div>
            </Tooltip>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <WhiteSquare whiteResult={whiteResult} />
                <span style={{ fontSize: 16 }}>{item.white.username}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BlackSquare blackResult={blackResult} />
                <span style={{ fontSize: 16 }}>{item.black.username}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <GameResultSquare item={item} username={username} />
            <div style={{ marginLeft: 30 }}>{pgn.headers[2].value}</div>
          </div>
        </div>
        <a
          style={{
            color: isHovered
              ? "var(--button-hovered)"
              : "var(--white-primary-dim)",
          }}
          href={item.url}
          target="_blank"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
        >
          {item.url}
        </a>
      </GameWrap>
    </ArchivedGameContainer>
  );
}

export default ArchivedGame;
