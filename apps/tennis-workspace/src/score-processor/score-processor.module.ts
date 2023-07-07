import { Module } from '@nestjs/common';
import { ScoreReaderService } from './score-reader.service';
import { ScoreProcessorService } from './score-processor.service';

@Module({
  providers: [ScoreReaderService, ScoreProcessorService],
  controllers: [],
})
export class ScoreProcessorModule {}
