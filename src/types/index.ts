import { ChessInstance } from "chess.js";
import { ParsedPGN } from "pgn-parser";
import { SetStateAction, Dispatch } from "react";
import { ReactNode } from "react";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;

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
  moves: PieceMove[];
  rawPgn: string;
  result: string;
}

export interface UsersGameData {
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
  pgn: ParsedPGN;
  setcurrentPgn: (pgn: ParsedPGN) => void;
  usersGameData: UsersGameData;
  username: string;
}

export interface PieceMove {
  move: string;
  move_number: number;
}

export interface BlackWhiteMoveProps {
  wm: PieceMove;
  bm: PieceMove;
  index: number;
  currentPgn: IPgn;
  game: ChessInstance;
  setGame: Dispatcher<ChessInstance>;
  setcurrentMoveNumber: (move: number) => void;
  currentMoveNumber: number;
}

export interface NavBarProps {
  currentPgn: IPgn;
  game: ChessInstance;
  setGame: Dispatcher<ChessInstance>;
  currentMoveNumber: number;
  setcurrentMoveNumber: (move: number) => void;
  setPiecesTurn: (piece: string) => void;
}

export interface FetchComponentProps {
  children: ReactNode;
  useFetchStates: {
    data: {
      games: UsersGameData[];
    } | null;
    isLoading: boolean;
    error: any;
  };
  DataVisualisation: ReactNode;
  CustomErrorRenderer?: any;
}
