import { useSyncExternalStore } from "react";
import { stockfishResultsUpdated } from "../stockfishEvents";
import { stockfishInterface } from "../stockfish";

const useGetPositionData: () => {
  bestMove: string;
  positionEval: number;
} = () => {
  const stockfish_results = useSyncExternalStore(
    (callback) => {
      addEventListener(stockfishResultsUpdated.type, callback);
      return () => {
        removeEventListener(stockfishResultsUpdated.type, callback);
      };
    },
    () => JSON.stringify(stockfishInterface.getResults())
  ); // TODO: remake on separate signals
  return { bestMove: "", positionEval: 0, ...JSON.parse(stockfish_results) };
};

export default useGetPositionData;
