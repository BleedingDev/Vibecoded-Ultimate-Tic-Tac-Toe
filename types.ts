export enum Player {
  Cat = 'Cat',
  Dog = 'Dog',
}

export enum GameState {
  InProgress = 'InProgress',
  Cat_WINS = 'Cat_WINS',
  Dog_WINS = 'Dog_WINS',
  TIE = 'TIE',
}

export type CellValue = Player | null;
export type LocalBoardState = CellValue[][]; // 3x3 grid
export type GlobalBoardState = (Player | 'TIE' | null)[]; // 1D array of 9