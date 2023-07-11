import { Module } from '@nestjs/common';
import { TournamentScoreController } from './tournament-score.controller';
import { PlayerModule } from '../player/player.module';
import { TournamentService } from './tournament.service';
import { ScoreModule } from '../score/score.module';

@Module({
  imports: [ PlayerModule, ScoreModule ],
  providers: [
    TournamentService,
  ],
  controllers: [TournamentScoreController],
})
export class TournamentModule {}
