import { useEffect, useState } from "react";
import { IPgn, IPlayersInfo } from "../types";

const useGetPlayersInfo = (currentPgn: IPgn) => {
  const [playersInfo, setPlayersInfo] = useState<IPlayersInfo | null>(null);

  const getPlayerData = async (username: string) => {
    const playerResponse = await fetch(
      `https://api.chess.com/pub/player/${username}`
    );
    return playerResponse.json();
  };

  const getCountryData = async (countryUrl: string) => {
    const countryResponse = await fetch(countryUrl);
    return countryResponse.json();
  };

  useEffect(() => {
    if (!currentPgn) return;
    const fetchPlayersInfo = async () => {
      try {
        const whiteUsername = currentPgn?.headers[4].value;
        const blackUsername = currentPgn?.headers[5].value;

        const [whiteResult, blackResult] = await Promise.all([
          getPlayerData(whiteUsername),
          getPlayerData(blackUsername),
        ]);

        const [whiteCountryResult, blackCountryResult] = await Promise.all([
          getCountryData(whiteResult.country),
          getCountryData(blackResult.country),
        ]);

        setPlayersInfo({
          white: {
            avatar: whiteResult.avatar,
            country: whiteCountryResult.name,
            countryCode: whiteCountryResult.code,
          },
          black: {
            avatar: blackResult.avatar,
            country: blackCountryResult.name,
            countryCode: blackCountryResult.code,
          },
        });
      } catch (error) {
        console.log(error, "no info");
      }
    };
    fetchPlayersInfo();
  }, [currentPgn]);
  return playersInfo;
};

export default useGetPlayersInfo;
