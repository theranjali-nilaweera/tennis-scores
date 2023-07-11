import { Test, TestingModule } from '@nestjs/testing';
import { TournamentGamesController } from './tournament-games.controller';
import { TournamentService } from './tournament.service';
import { PlayerProcessorService } from '../player/player-processor.service';
import { ScoreCalculatorService } from '../score/score-calculator.service';
import { ScoreReaderService } from '../score/score-reader.service';
import { MatchScore } from '../types/Match';
import { TournamentGame } from './TournamentGame';

describe('TournamentGamesController', () => {
  let controller: TournamentGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentService,
        ScoreCalculatorService,
        ScoreReaderService,
        PlayerProcessorService,
      ],
      controllers: [TournamentGamesController],
    }).compile();

    controller = module.get<TournamentGamesController>(
      TournamentGamesController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('WHEN player is present SHOULD return the games win/losses for person', () => {
    const result ='Player Person A: 18 games won: 12 games lost';

    expect(controller.getPlayerGameSummary('Person A')).toBe(result);
  });
});
