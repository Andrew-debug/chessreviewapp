export interface StockfishInterface {
  depth: number;
  setDepth: (depth: number) => void;
  getResults: () => any;
  setPosition: (uciStr: string) => void;
  callForEval: () => void;
}

export interface IPgn {
  comments: null | string;
  comments_above_header: null | string;
  headers: { value: string }[];
  moves: {}[];
  rawPgn: string;
  result: string;
}
