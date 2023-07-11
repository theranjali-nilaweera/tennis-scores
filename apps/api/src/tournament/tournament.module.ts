import { Module } from '@nestjs/common';
import { TournamentScoreController } from './tournament-score.controller';
import { PlayerModule } from '../player/player.module';
import { TournamentService } from './tournament.service';
import { ScoreModule } from '../score/score.module';
import { TournamentGamesController } from './tournament-games.controller';

@Module({
  imports: [PlayerModule, ScoreModule],
  providers: [TournamentService],
  controllers: [TournamentScoreController, TournamentGamesController],
})
export class TournamentModule {}
