import { Player } from '../player/Player';
import { Match, MatchScore } from './Match';

export interface IScoreFile {
  lineCount: number;
  matchIndexes: number[];
  matches: Match[];
  matchScores: MatchScore[];
  players: Map<string, Player>;
}
