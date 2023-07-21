export const getPlayerData = async (username: string) => {
  const playerResponse = await fetch(
    `https://api.chess.com/pub/player/${username}`
  );
  return playerResponse.json();
};

export const getCountryData = async (countryUrl: string) => {
  const countryResponse = await fetch(countryUrl);
  return countryResponse.json();
};
