import { FetchComponentProps } from "../types";
import Loader from "../utils/Loader";

const FetchComponent = ({
  children,
  useFetchStates,
  DataVisualisation,
  CustomErrorRenderer,
}: FetchComponentProps) => {
  const { data, isLoading, error } = useFetchStates;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    if (CustomErrorRenderer) {
      return <CustomErrorRenderer />;
    }
    return "error";
  }
  if (data && DataVisualisation === null) {
    return null;
  }
  if (data && DataVisualisation !== undefined) {
    return DataVisualisation;
  }
  return children;
};

export default FetchComponent;
