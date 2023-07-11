import { Test, TestingModule } from '@nestjs/testing';
import { TournamentService } from './tournament.service';
import { PlayerProcessorService } from '../player/player-processor.service';
import { ScoreCalculatorService } from '../score/score-calculator.service';
import { ScoreReaderService } from '../score/score-reader.service';

describe('TournamentService', () => {
  let service: TournamentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentService,
        ScoreCalculatorService,
        ScoreReaderService,
        PlayerProcessorService,
      ],
    }).compile();

    service = module.get<TournamentService>(TournamentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
