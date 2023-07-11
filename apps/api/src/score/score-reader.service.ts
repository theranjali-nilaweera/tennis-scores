import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { IScoreFile } from '../types/ScoreFile';
import { Match } from '../types/Match';

@Injectable()
export class ScoreReaderService {
  readScoreFile(scoreFileName = 'full_tournament.txt'): IScoreFile {
    const fileContent = this.readFile(scoreFileName);
    if (!fileContent) {
      throw new Error('Invalid file');
    }

    const lines = fileContent.split('\n');
    const matchIndexes = this.findMatchIndexes(lines);
    if (matchIndexes.length === 0) {
      throw new Error('No matches found');
    }

    return {
      lineCount: lines.length,
      matchIndexes,
      matches: this.populateMatches(matchIndexes, lines),
      matchScores: [],
    };
  }

  private readFile(scoreFileName: string): string {
    const assetsPath =
      process.env.NODE_ENV === 'test'
        ? path.join(__dirname, '../assets'):
        path.resolve(__dirname, 'assets')
        
    console.log('assetsPath', assetsPath, process.env.NODE_ENV);
    const scoreFile = path.join(assetsPath, scoreFileName);
    return fs.readFileSync(scoreFile, 'utf8');
  }

  private findMatchIndexes(lines: string[]): number[] {
    return lines.reduce((acc, line, index) => {
      if (line.startsWith('Match')) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  private populateMatches(matchIndexes: number[], lines: string[]): Match[] {
    const matches: Match[] = matchIndexes.reduce((acc, matchIndex, index) => {
      const nextMatchIndex = matchIndexes[index + 1];

      const matchNumber = +lines[matchIndex].split(': ')[1];
      const players = lines[matchIndex + 1].split(' vs ');
      const rawScores = lines
        .slice(matchIndex + 2, nextMatchIndex)
        .filter((line) => !isNaN(parseInt(line)))
        .map((score) => +score);

      acc.push({
        matchNumber,
        player1Name: players[0],
        player2Name: players[1],
        rawScores,
      });
      return acc;
    }, []);

    return matches;
  }
}
