
export enum Player {
  X = 'X',
  O = 'O',
}

export enum GameState {
  InProgress = 'InProgress',
  X_WINS = 'X_WINS',
  O_WINS = 'O_WINS',
  TIE = 'TIE',
}

export type CellValue = Player | null;
export type LocalBoardState = CellValue[][]; // 3x3 grid
export type GlobalBoardState = (Player | 'TIE' | null)[]; // 1D array of 9
