import PrimaryButton from "../components/PrimaryButton";
import { CustomErrorStyles } from "../styles";

interface Props {
  error: string;
  setData: any;
  setIsGamesFetched: (v: boolean) => void;
  setError: (v: string | null) => void;
}

const CustomError = ({
  error,
  setData,
  setIsGamesFetched,
  setError,
}: Props) => {
  return (
    <CustomErrorStyles>
      <p>{error}</p>
      <PrimaryButton
        text="Return"
        handleClick={() => {
          setData(null);
          setIsGamesFetched(false);
          setError(null);
        }}
      />
    </CustomErrorStyles>
  );
};

export default CustomError;
