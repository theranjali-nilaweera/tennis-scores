import { Test, TestingModule } from '@nestjs/testing';
import { ScoreCalculatorService } from './score-calculator.service';
import { Match } from '../types/Match';

describe('ScoreCalculatorService', () => {
  let service: ScoreCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreCalculatorService],
    }).compile();

    service = module.get<ScoreCalculatorService>(ScoreCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('caclulateScore', () => {
    it('WHEN player2 wins 24 games SHOULD have player2 as winner by 3 sets:0', () => {
      const points = Array<number>(4 * 6 * 3).fill(1);
      const matches: Match = {
        matchNumber: 1,
        player1Name: 'Person A',
        player2Name: 'Person B',
        rawScores: points,
      };

      const result = service.calculateScore(matches);

      expect(result).toBeDefined;
      expect(result.sets?.length).toBe(3);
      expect(result.sets[0]?.winnerOfSet).toBe('player2');
      expect(result.sets[1]?.winnerOfSet).toBe('player2');
      expect(result.sets[2]?.winnerOfSet).toBe('player2');
      expect(result.matchWinner).toBe('player2');
    });
  });
  describe('extractGames', () => {
    it('WHEN only 4 games with player1 6: player2 0 SHOULD return only one set', () => {
      const points = Array<number>(4 * 6 * 3).fill(0);
      const matches: Match = {
        matchNumber: 1,
        player1Name: 'Person A',
        player2Name: 'Person B',
        rawScores: points,
      };

      const result = service.calculateScore(matches);

      expect(result).toBeDefined;
      expect(result.sets?.length).toBe(3);
      expect(result.sets[0]?.winnerOfSet).toBe('player1');
      expect(result.matchWinner).toBe('player1');
    });
  });
});
