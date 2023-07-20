import {
  DrawComponent,
  LoseComponent,
  WinComponent,
} from "../styles/archivedGameStyles";
import { UsersGameData } from "../types";

const GameResultSquare = ({
  usersGameData,
  username,
}: {
  usersGameData: UsersGameData;
  username: { current: string };
}) => {
  const lowerCurrentUsername = `${username.current.toLowerCase()}`;
  const [userResult, oponentResult] = {
    [String(usersGameData.white.username).toLowerCase()]: [
      usersGameData.white.result,
      usersGameData.black.result,
    ],
    [String(usersGameData.black.username).toLowerCase()]: [
      usersGameData.black.result,
      usersGameData.white.result,
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

export default GameResultSquare;
