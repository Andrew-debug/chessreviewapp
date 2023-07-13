import { config } from "../package.json";
import debounce from "lodash.debounce";
import { stockfishResultsUpdated } from "./stockfishEvents.ts";

let fishPath =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "node_modules/stockfish/src/stockfish.js"
    : "/chessreviewapp/stockfish.js";

// init stockfish
const stockfish = new Worker(fishPath);

const stockfish_results = {
  bestMove: undefined,
  positionEval: undefined,
};
const notifyFront = () => {
  globalThis.dispatchEvent(stockfishResultsUpdated);
};
const stPost = (command: string) => {
  // console.log("SEND :::: ", command);
  stockfish.postMessage(command);
};
stPost("uci");
stPost(
  `setoption name Threads value ${
    (window.navigator.hardwareConcurrency || 2) - 1
  }`
);
stPost("setoption name Hash value 512");

let setPosition = debounce((uciStr: string, depth: number) => {
  stPost("stop");
  stPost("ucinewgame");
  stPost(`position startpos moves ${uciStr}`);
  stPost(`go depth ${depth}`);
}, 500);
// interface for react
export const stockfishInterface = {
  depth: 18,
  setDepth: (depth: number) => (stockfishInterface.depth = depth),
  getResults: () => stockfish_results,
  setPosition: (uciStr: string) => {
    stPost("stop");
    setPosition(uciStr, stockfishInterface.depth);
  },
  callForEval: () => stPost("eval"),
};
// main message handler
stockfish.onmessage = (event: any) => {
  if (config.talkative_fish) {
    // console.log("SF ::: ", event.data);
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
