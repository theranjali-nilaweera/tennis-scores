import { Module } from '@nestjs/common';
import { ScoreReaderService } from './score-reader.service';
import { ScoreCalculatorService } from './score-calculator.service';

@Module({
  providers: [ScoreCalculatorService, ScoreReaderService],
  exports: [ScoreCalculatorService, ScoreReaderService],
})
export class ScoreModule {}
