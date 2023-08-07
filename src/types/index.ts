import { ChessInstance } from "chess.js";
import { ParsedPGN } from "pgn-parser";
import { SetStateAction, Dispatch } from "react";
import { ReactNode } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface PieceMove {
  move: string;
  move_number: number;
}
export interface IPgn {
  comments: null | string;
  comments_above_header: null | string;
  headers: { value: string }[];
  moves: PieceMove[];
  // rawPgn: string;
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
  pgn: string;
}

export interface ArchivedGameProps {
  pgn: ParsedPGN;
  setcurrentPgn: (pgn: IPgn) => void;
  usersGameData: UsersGameData;
  username: { current: string };
}

export interface NavBarProps {
  currentPgn: IPgn;
  game: ChessInstance;
  setGame: Dispatcher<ChessInstance>;
  currentMoveNumber: number;
  setcurrentMoveNumber: Dispatcher<number>;
}

interface FetchComponenDataGames {
  games: UsersGameData[];
}
export interface FetchComponentDataGamesWithDateKey {
  [key: string]: UsersGameData[];
}
export interface FetchComponentProps {
  children: ReactNode;
  useFetchStates: {
    data: FetchComponenDataGames | FetchComponentDataGamesWithDateKey | null;
    isLoading: boolean;
    error: any;
  };
  DataVisualisation: ReactNode;
  CustomErrorRenderer?: any;
}

export interface MainContentProps {
  currentPgn: IPgn;
}

export interface NavButtonsProps {
  game: ChessInstance;
  setGame: Dispatcher<ChessInstance>;
  currentMoveNumber: number;
  setcurrentMoveNumber: Dispatcher<number>;
  currentPgn: IPgn;
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
