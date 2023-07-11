import { Test, TestingModule } from '@nestjs/testing';
import { PlayerProcessorService } from './player-processor.service';
import { MatchScore } from '../types/Match';

describe('PlayerProcessorService', () => {
  let service: PlayerProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerProcessorService],
    }).compile();

    service = module.get<PlayerProcessorService>(PlayerProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('WHEN player1:3-player2:0 single match SHOULD return proper player summary', () => {
    const matchScore: MatchScore = {
      matchNumber: 1,
      player1Name: 'player1',
      player2Name: 'player2',
      rawScores: [],
      matchWinner: 'player2',
      player1SetsWon: 1,
      player2SetsWon: 2,
      player1GamesWon: 6,
      player2GamesWon: 12,
      sets: [],
    };

    const player1Summary = service.processPlayers(matchScore, 'player1', null);  
    const player2Summary = service.processPlayers(matchScore, 'player2', null);  

    expect(player1Summary).toBeDefined();
    expect(player1Summary.name).toEqual('player1');
    expect(player1Summary.matchesWon).toEqual([]);
    expect(player1Summary.matchesLost).toEqual([1]);
    expect(player1Summary.gamesWon).toEqual(matchScore.player1GamesWon);
    expect(player1Summary.gamesLost).toEqual(matchScore.player2GamesWon);

    expect(player2Summary).toBeDefined();
    expect(player2Summary.name).toEqual('player2');
    expect(player2Summary.matchesWon).toEqual([1]);
    expect(player2Summary.matchesLost).toEqual([]);
    expect(player2Summary.gamesWon).toEqual(matchScore.player2GamesWon);
    expect(player2Summary.gamesLost).toEqual(matchScore.player1GamesWon);
  });
});
