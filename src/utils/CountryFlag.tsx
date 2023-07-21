import ReactCountryFlag from "react-country-flag";
import { getAfterLastSlash } from ".";

const CountryFlag = ({
  size,
  playerCountry,
}: {
  size: number;
  playerCountry: string;
}) => {
  return (
    <ReactCountryFlag
      countryCode={getAfterLastSlash(playerCountry)}
      svg
      style={{
        width: size,
        height: size,
        paddingBottom: 2,
      }}
      title={getAfterLastSlash(playerCountry)}
    />
  );
};

export default CountryFlag;
