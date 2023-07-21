import { CustomErrorStyles, ReturnButton } from "../styles";

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
      <ReturnButton
        onClick={() => {
          setData(null);
          setIsGamesFetched(false);
          setError(null);
        }}
      >
        Return
      </ReturnButton>
    </CustomErrorStyles>
  );
};

export default CustomError;
