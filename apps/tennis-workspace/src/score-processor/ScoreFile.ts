import { IMatch } from "./Match";

export interface IScoreFile {
    lineCount: number;
    matchIndexes: number[];
    matches: IMatch[];
  }