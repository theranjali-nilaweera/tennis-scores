export type Game = {
  player1Points: number;
  player2Points: number;
  winner: 'player1' | 'player2' | null;
};
export type TennisSet = {
  player1GamesWon: number;
  player2GamesWon: number;
  gamesInSet: Game[];
  winnerOfSet: 'player1' | 'player2' | null;
};
export type Score = {
  matchWinner: 'player1' | 'player2' | null;
  player1SetsWon: number;
  player2SetsWon: number;
  player1GamesWon: number;
  player2GamesWon: number;
  sets: TennisSet[];
};
export type Match = {
  matchNumber: number;
  player1Name: string;
  player2Name: string;
  rawScores: number[];
};

export type MatchScore = Match & Score;
