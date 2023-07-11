import { Injectable } from '@nestjs/common';
import { Game, Match, Score, TennisSet, MatchScore } from '../types/Match';

@Injectable()
export class ScoreCalculatorService {
  calculateScore(match: Match): MatchScore {
    const games = this.extractGames(match.rawScores);
    const matchScore = this.extractSets(games);
    return {
      ...match,
      ...matchScore,
    };
  }

  private extractGames(rawScores: number[]): Game[] {
    const gamePoints: Game[] = new Array<Game>();
    let gameNumber = 0;

    rawScores.forEach((score) => {
      if (!gamePoints[gameNumber]) {
        gamePoints[gameNumber] = {
          player1Points: 0,
          player2Points: 0,
          winner: null,
        };
      }
      score === 0
        ? gamePoints[gameNumber].player1Points++
        : gamePoints[gameNumber].player2Points++;
      const winner = this.gameWinner(
        gamePoints[gameNumber].player1Points,
        gamePoints[gameNumber].player2Points
      );

      if (winner) {
        gamePoints[gameNumber].winner = winner;
        gameNumber++;
      }
    });
    return gamePoints;
  }

  private gameWinner(
    player1Points,
    player2Points
  ): 'player1' | 'player2' | null {
    if (player1Points < 4 && player2Points < 4) return null;

    const pointDifference = player1Points - player2Points;
    if (Math.abs(pointDifference) >= 2)
      return pointDifference > 0 ? 'player1' : 'player2';
  }

  private extractSets(games: Game[]): Score {
    const matchScore: Score = {
      player1SetsWon: 0,
      player2SetsWon: 0,
      player1GamesWon: 0,
      player2GamesWon: 0,
      matchWinner: null,
      sets: null,
    };
    const tennisSet: TennisSet[] = new Array<TennisSet>();
    let tennisSetNumber = 0;

    games.forEach((game) => {
      if (!tennisSet[tennisSetNumber]) {
        tennisSet[tennisSetNumber] = {
          player1GamesWon: 0,
          player2GamesWon: 0,
          gamesInSet: new Array<Game>(),
          winnerOfSet: null,
        };
      }

      tennisSet[tennisSetNumber].gamesInSet.push(game);
      game.winner === 'player1'
        ? tennisSet[tennisSetNumber].player1GamesWon++
        : tennisSet[tennisSetNumber].player2GamesWon++;

      if (tennisSet[tennisSetNumber].player1GamesWon >= 6) {
        tennisSet[tennisSetNumber].winnerOfSet = 'player1';
        matchScore.player1SetsWon++;
        matchScore.player1GamesWon +=
          tennisSet[tennisSetNumber].player1GamesWon;
        tennisSetNumber++;
        return;
      }
      if (tennisSet[tennisSetNumber].player2GamesWon >= 6) {
        tennisSet[tennisSetNumber].winnerOfSet = 'player2';
        matchScore.player2SetsWon++;
        matchScore.player2GamesWon +=
          tennisSet[tennisSetNumber].player2GamesWon;
        tennisSetNumber++;
      }
    });

    matchScore.sets = tennisSet;
    matchScore.matchWinner =
      matchScore.player1SetsWon > matchScore.player2SetsWon
        ? 'player1'
        : 'player2';
    return matchScore;
  }
}
