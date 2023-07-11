import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ScoreReaderService } from '../score/score-reader.service';
import { IScoreFile } from '../types/ScoreFile';
import { ScoreCalculatorService } from '../score/score-calculator.service';
import { MatchScore } from '../types/Match';
import { Player } from '../player/Player';
import { PlayerProcessorService } from '../player/player-processor.service';
import { TournamentScore } from './TournamentScore';

@Injectable()
export class TournamentService {
  @Inject(ScoreReaderService)
  private readonly scoreReader: ScoreReaderService;

  @Inject(ScoreCalculatorService)
  private readonly scoreCalculator: ScoreCalculatorService;

  @Inject(PlayerProcessorService)
  private readonly playerProcessor: PlayerProcessorService;

  processScores():IScoreFile {
    const scoreFile: IScoreFile = this.scoreReader.readScoreFile();
    const matcheScores: MatchScore[] = [];
    const players = new Map<string, Player>();
    scoreFile?.matches?.forEach((match) => {
      const matchScore = this.scoreCalculator.calculateScore(match);
      matcheScores.push(matchScore);
      players.set(
        matchScore.player1Name,
        this.playerProcessor.processPlayers(
          matchScore,
          matchScore.player1Name,
          players.get(matchScore.player1Name)
        )
      );
      players.set(
        matchScore.player2Name,
        this.playerProcessor.processPlayers(
          matchScore,
          matchScore.player2Name,
          players.get(matchScore.player2Name)
        )
      );
    });
    scoreFile.matchScores = matcheScores;
    
    return scoreFile;
  }

  getScore(matchNumber: string): TournamentScore | null{
    const matchId = parseInt(matchNumber);
    if(isNaN(matchId)) throw new BadRequestException(`Match number should be a number`);

    const scoreFile: IScoreFile = this.processScores();
    const matchScore = scoreFile?.matchScores?.find(match => match.matchNumber === matchId);

    if(matchScore === undefined) return null;

    const [winnerName, opponentName] = matchScore.matchWinner==='player1'?[matchScore.player1Name,matchScore.player2Name]:[matchScore.player2Name,matchScore.player1Name];
    const [winnerSets, opponentSets] = matchScore.matchWinner==='player1'?[matchScore.player1SetsWon,matchScore.player2SetsWon]:[matchScore.player2SetsWon,matchScore.player1SetsWon];
    
    return { 
      matchNumber: matchId,
      winnerName,
      opponentName,
      winnerSets,
      opponentSets,
    }
  }

}
