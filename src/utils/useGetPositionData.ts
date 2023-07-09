import { useSyncExternalStore } from "react";
import { stockfishResultsUpdated } from "../stockfishEvents";
import { stockfishInterface } from "../stockfish";

export const useGetPositionData = () => {
  const stockfish_results = useSyncExternalStore(
    (callback) => {
      addEventListener(stockfishResultsUpdated.type, callback);
      return () => {
        removeEventListener(stockfishResultsUpdated.type, callback);
      };
    },
    () => JSON.stringify(stockfishInterface.getResults())
  ); // TODO: remake on separate signals
  const { bestMove, positionEval } = JSON.parse(stockfish_results);

  return { bestMove, positionEval };
};
