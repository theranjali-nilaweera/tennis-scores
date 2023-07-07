import { Test, TestingModule } from '@nestjs/testing';
import { ScoreReaderService } from './score-reader.service';
import exp from 'constants';

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

  it('WHEN file is present SHOULD return file content', () => {
    expect(service.readScoreFile()).toBeDefined();
  });

  it('WHEN newline SHOULD return array of lines', () => {
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
    expect(result.matches[0].matchName).toBe('Match: 01');
    expect(result.matches[0].player1Name).toBe('Person A');
    expect(result.matches[0].player2Name).toBe('Person B');
    expect(result.matches[0].scores.length).toBe(48);
  });

});
