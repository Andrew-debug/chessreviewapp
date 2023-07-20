import { FetchComponentProps } from "../types";
import Loader from "../utils/Loader";

const FetchComponent = ({
  children,
  useFetchStates,
  DataVisualisation,
  CustomErrorRenderer,
}: FetchComponentProps) => {
  const { data, isLoading, error } = useFetchStates;
  const dataType = Array.isArray(data) ? data : Object.keys(data).length !== 0;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    if (CustomErrorRenderer) {
      return <CustomErrorRenderer />;
    }
    return "error";
  }
  if (dataType && DataVisualisation === null) {
    return null;
  }
  if (dataType && DataVisualisation !== undefined) {
    return DataVisualisation;
  }

  return children;
};

export default FetchComponent;
