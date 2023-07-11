import { Module } from '@nestjs/common';
import { PlayerProcessorService } from './player-processor.service';
import { ScoreModule } from '../score/score.module';

@Module({
  imports: [ScoreModule],
  providers: [PlayerProcessorService],
  controllers: [],
  exports: [PlayerProcessorService],
})
export class PlayerModule {}
