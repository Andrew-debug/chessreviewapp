import { ActiveUserData, ImgWrap } from "../styles";
import CountryFlag from "../utils/CountryFlag";
import defaultAvatar from "../assets/images/noavatar.png";
import { IPgn } from "../types";

const PlayerInformation = ({
  color,
  currentPgn,
  avatar,
  country,
}: {
  color: string;
  currentPgn: IPgn;
  avatar: string;
  country: string;
}) => {
  const username =
    color === "white"
      ? currentPgn?.headers[4].value
      : currentPgn?.headers[5].value;
  const userElo =
    color === "white"
      ? currentPgn?.headers[13].value
      : currentPgn?.headers[14].value;
  return (
    <ActiveUserData>
      <ImgWrap width={45} height={45}>
        <img src={avatar || defaultAvatar} alt="black avatar" />
      </ImgWrap>
      <span style={{ margin: "0 7px 0 10px" }}>
        {currentPgn ? username : "Opponent"}
      </span>
      <span>{currentPgn ? `(${userElo})` : ""}</span>
      <div style={{ marginLeft: 8 }}>
        {country && <CountryFlag size={18} playerCountry={country} />}
      </div>
    </ActiveUserData>
  );
};

export default PlayerInformation;
