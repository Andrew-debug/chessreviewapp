import ReactCountryFlag from "react-country-flag";

const CountryFlag = ({
  size,
  playerCountry,
  countryCode,
}: {
  size: number;
  playerCountry: string;
  countryCode: string;
}) => {
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: size,
        height: size,
        paddingBottom: 2,
      }}
      title={playerCountry}
    />
  );
};

export default CountryFlag;
