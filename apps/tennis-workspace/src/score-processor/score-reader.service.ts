import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { IScoreFile } from './ScoreFile';
import { IMatch } from './Match';

@Injectable()
export class ScoreReaderService {
  readScoreFile(scoreFileName ='full_tournament.txt'): IScoreFile {
    const fileContent = this.readFile(scoreFileName);
    if (!fileContent) {
      throw new Error('Invalid file');
    }

    const lines = fileContent.split('\n');
    const matchIndexes = this.findMatchIndexes(lines);
    if(matchIndexes.length === 0) {
      throw new Error('No matches found');
    }

    return {
      lineCount: lines.length,
      matchIndexes,
      matches: this.findMatches(matchIndexes, lines),
    };
  }

  private readFile(scoreFileName: string): string {
    const scoreFile = path.join(
      __dirname,
      '..',
      'assets',
      scoreFileName,
    );
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

  private findMatches(matchIndexes: number[], lines: string[]): IMatch[] {
    const matches: IMatch[] = matchIndexes.reduce((acc, matchIndex, index) => {
      const nextMatchIndex = matchIndexes[index + 1];

      const matchName = lines[matchIndex];
      const players = lines[matchIndex + 1].split(' vs ');
      const scores = lines
        .slice(matchIndex + 2, nextMatchIndex)
        .map((score) => parseInt(score, 10));

      acc.push({
        matchName,
        player1Name: players[0],
        player2Name: players[1],
        scores,
      });
      return acc;
    }, []);

    return matches;
  }

}
