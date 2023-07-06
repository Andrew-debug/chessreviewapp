import { ReactNode } from "react";
import Loader from "../utils/Loader";
//@ts-ignore
//prettier-ignore
const FetchComponent = ({children,useFetchStates,DataVisualisation,CustomErrorRenderer,
}: {
  children?: ReactNode;
}) => {
  const { 
    data, 
    // setData, 
    isLoading, 
    error, 
    // fetchDataAction 
  } = useFetchStates;
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
