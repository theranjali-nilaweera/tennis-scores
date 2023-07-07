import { Inject, Injectable } from '@nestjs/common';
import { ScoreReaderService } from './score-reader.service';
import { IScoreFile } from './ScoreFile';

@Injectable()
export class ScoreProcessorService {
  @Inject(ScoreReaderService)
  private readonly scoreReaderService: ScoreReaderService;

  processScores() {
    const scoreFile: IScoreFile = this.scoreReaderService.readScoreFile();
  }
}
