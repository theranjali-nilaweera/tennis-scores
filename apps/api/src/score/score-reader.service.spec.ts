import { Test, TestingModule } from '@nestjs/testing';
import { ScoreReaderService } from './score-reader.service';

describe('ScoreReaderService', () => {
  let service: ScoreReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreReaderService],
    }).compile();

    service = module.get<ScoreReaderService>(ScoreReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('WHEN file is not present SHOULD throw error', () => {
  //   expect(service.readScoreFile('test')).rejects.toThrowError();
  // });

  it('WHEN newline SHOULD return array of lines', () => {
    /**
     * linked list traversal
     */
    const traversal = (node) => {
      if (node === null) {
        return;
      }
      console.log(node.value);
    };

    expect(service.readScoreFile().lineCount).toBe(167);
  });

  it('WHEN matches present SHOULD give their indexes', () => {
    const result = service.readScoreFile();

    expect(result.matchIndexes.length).toBe(2);
    expect(result.matchIndexes[0]).toBe(0);
    expect(result.matchIndexes[1]).toBe(50);
  });

  it('WHEN matches are present in file SHOULD split file and return matches', () => {
    const result = service.readScoreFile();

    expect(result.matches.length).toBe(2);
    expect(result.matches[0].matchNumber).toBe(1);
    expect(result.matches[0].player1Name).toBe('Person A');
    expect(result.matches[0].player2Name).toBe('Person B');
    expect(result.matches[0].rawScores.length).toBe(48);
  });
});
