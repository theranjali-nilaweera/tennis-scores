import { Test, TestingModule } from '@nestjs/testing';
import { ScoreProcessorService } from './score-processor.service';
import { ScoreReaderService } from './score-reader.service';

describe('ScoreProcessorService', () => {
  let service: ScoreProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreProcessorService, ScoreReaderService],
    }).compile();

    service = module.get<ScoreProcessorService>(ScoreProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
