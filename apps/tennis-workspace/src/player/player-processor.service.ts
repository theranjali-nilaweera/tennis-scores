import { Injectable } from '@nestjs/common';
import { Player } from './Player';
import { MatchScore } from '../types/Match';

@Injectable()
export class PlayerProcessorService {
  processPlayers(
    matchScore: MatchScore,
    currentPlayerName: string,
    player: Player
  ): Player {
    if (!player) {
      player = {
        name: matchScore.player1Name,
        matchesWon: [],
        matchesLost: [],
        gamesWon: 0,
        gamesLost: 0,
        setsWon: 0,
        setsLost: 0,
      };
    }

    player.name = currentPlayerName;
    let [currentPlayerNumber, opponentNumber] = ['player1', 'player2'];
    if (matchScore.player2Name === currentPlayerName)
      [currentPlayerNumber, opponentNumber] = ['player2', 'player1'];

    const currentPlayerStatus =
      matchScore.matchWinner === currentPlayerNumber ? 'Won' : 'Lost';

    currentPlayerStatus === 'Won'
      ? player.matchesWon.push(matchScore.matchNumber)
      : player.matchesLost.push(matchScore.matchNumber);

    player.gamesWon += matchScore[`${currentPlayerNumber}GamesWon`];
    player.gamesLost += matchScore[`${opponentNumber}GamesWon`];
    player.setsWon += matchScore[`${currentPlayerNumber}SetsWon`];
    player.setsLost += matchScore[`${opponentNumber}SetsWon`];
    return player;
    // }

    // player.gamesWon += matchScore[`${opponentNumber}GamesWon`];
    // player.gamesLost += matchScore[`${currentPlayerNumber}GamesWon`];
    // player.setsWon += matchScore[`${opponentNumber}SetsWon`];
    // player.setsLost += matchScore[`${currentPlayerNumber}SetsWon`];
    // return player;
  }
}
