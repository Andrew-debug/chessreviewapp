import { ChessInstance } from "chess.js";
import { ParsedPGN } from "pgn-parser";
import { SetStateAction, Dispatch } from "react";
import { ReactNode } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

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
  username: { current: string };
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
  setcurrentMoveNumber: Dispatcher<number>;
  currentMoveNumber: number;
  setPiecesTurn: Dispatcher<string>;
}

export interface NavBarProps {
  currentPgn: IPgn;
  game: ChessInstance;
  setGame: Dispatcher<ChessInstance>;
  currentMoveNumber: number;
  setcurrentMoveNumber: Dispatcher<number>;
  setPiecesTurn: Dispatcher<string>;
}

export interface FetchComponentProps {
  children: ReactNode;
  useFetchStates: {
    data:
      | {
          games: UsersGameData[];
        }
      | { [key: string]: { games: UsersGameData[] } }
      | null;
    isLoading: boolean;
    error: any;
  };
  DataVisualisation: ReactNode;
  CustomErrorRenderer?: any;
}

export interface MainContentProps {
  piecesTurn: string;
  currentPgn: IPgn;
  setPiecesTurn: Dispatcher<string>;
}

export interface NavButtonsProps {
  game: ChessInstance;
  setGame: Dispatcher<ChessInstance>;
  currentMoveNumber: number;
  setcurrentMoveNumber: Dispatcher<number>;
  currentPgn: IPgn;
  setPiecesTurn: Dispatcher<string>;
}

export interface ISections {
  byUsername: boolean;
  byDate: boolean;
  byLink: boolean;
}
export interface ISectionContext {
  sections: ISections;
  setSections: (v: ISections) => void;
}

export interface IPlayersInfo {
  white: { avatar: string; country: string; countryCode: string };
  black: { avatar: string; country: string; countryCode: string };
}
