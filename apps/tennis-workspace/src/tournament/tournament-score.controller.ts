import { Controller, Get, Inject, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentScore } from './TournamentScore';

@Controller('score')
export class TournamentScoreController {
    @Inject(TournamentService)
    private readonly tournamentService: TournamentService;

    @Get('match/:matchId')
    getScore(@Param('matchId') matchId: string): string {
        const score: TournamentScore = this.tournamentService.getScore(matchId);
        return `Match ${score.matchNumber}: ${score.winnerName} defeated ${score.opponentName} ${score.winnerSets} sets to ${score.opponentSets}`;
    }

}
