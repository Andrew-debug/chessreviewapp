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

export interface GameProps {
  url: string;
  black: {
    username: string;
    result: string;
  };
  white: {
    username: string;
    result: string;
  };
  time_class: string;
}

export interface ArchivedGameProps {
  pgn: IPgn;
  setcurrentPgn: (pgn: IPgn) => void;
  game: GameProps;
  username: string;
}

export interface BlackWhiteMoveProps {
  wm: {
    move: string;
  };
  bm: {
    move: string;
  };
  index: number;
  gameReviewData: {
    all_moves: string[];
  };
  currentPgn: IPgn;
  game: IPgn;
  setGame: (pgn: IPgn) => void;
  setcurrentMoveNumber: (move: number) => void;
  currentMoveNumber: number;
}
