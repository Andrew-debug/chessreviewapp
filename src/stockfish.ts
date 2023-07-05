import { config } from "../package.json";
import debounce from "lodash.debounce";
import { stockfishResultsUpdated } from "./stockfishEvents.ts";

const stockfish_results = {
  bestMove: undefined,
  positionEval: undefined,
};
const notifyFront = debounce(() => {
  globalThis.dispatchEvent(stockfishResultsUpdated);
}, 100);
const stPost = (text: string) => {
  // console.log("SEND :::: ", text);
  stockfish.postMessage(text);
};
// init stockfish
const stockfish = new Worker("node_modules/stockfish/src/stockfish.js", {
  type: "module",
});

type StockfishType = {
  onerror: any;
  onmessage: any;
};

declare global {
  interface Window {
    stockfish: StockfishType;
  }
}
window.stockfish = stockfish;
stPost("uci");
stPost("setoption name Threads value 8");
stPost("setoption name Hash value 512");

// interface for react
export const stockfishInterface = {
  depth: 18,
  setDepth: (depth: number) => (stockfishInterface.depth = depth),
  getResults: () => stockfish_results,
  setPosition: (uciStr: string) => {
    stPost("stop");
    stPost("ucinewgame");
    stPost(`position startpos moves ${uciStr}`);
    stPost(`go depth ${stockfishInterface.depth}`);
  },
  callForEval: () => stPost("eval"),
};
// main message handler
stockfish.onmessage = (event) => {
  if (config.talkative_fish) {
    // console.log("SF ::: ", event.data);
    // console.log(event.data);
  }

  let dataChanged = false;

  const engine_analisys_regex = event.data.match(/\s.* cp (-?\d+).* pv (.+)/);
  if (engine_analisys_regex) {
    const [__, cp, pv] = engine_analisys_regex;
    const bestMove = pv.split(" ")[0];
    stockfish_results.positionEval = cp;
    stockfish_results.bestMove = bestMove;
    dataChanged = true;
  }
  if (dataChanged) {
    notifyFront();
  }
};
