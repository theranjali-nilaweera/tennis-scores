import { Test, TestingModule } from '@nestjs/testing';
import { TournamentScoreController } from './tournament-score.controller';
import { TournamentService } from './tournament.service';
import { MatchScore } from '../types/Match';
import { ScoreCalculatorService } from '../score/score-calculator.service';
import { ScoreReaderService } from '../score/score-reader.service';
import { PlayerProcessorService } from '../player/player-processor.service';
import { TournamentScore } from './TournamentScore';

describe('TournamentScoreController', () => {
  let controller: TournamentScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        TournamentScoreController,
      ],
      providers: [
        TournamentService,
        ScoreCalculatorService,
        ScoreReaderService,
        PlayerProcessorService,
      ],
    }).compile();

    controller = module.get<TournamentScoreController>(
      TournamentScoreController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('WHEN matchid is present SHOULD return the match score in sets', () => {
    const matchScore: MatchScore = {
      matchNumber: 1,
      player1Name: 'Person A',
      player2Name: 'Person B',
      rawScores: [],
      matchWinner: 'player2',
      player1SetsWon: 2,
      player2SetsWon: 0,
      player1GamesWon: 12,
      player2GamesWon: 0,
      sets: [],
    };
    const result = `Match ${matchScore.matchNumber}: ${matchScore.player1Name} defeated ${matchScore.player2Name} ${matchScore.player1SetsWon} sets to ${matchScore.player2SetsWon}`;

    expect(controller.getScore('01')).toBe(result);
  });
});
