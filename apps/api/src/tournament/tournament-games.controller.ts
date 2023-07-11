import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentGame } from './TournamentGame';

@Controller('games')
export class TournamentGamesController {
  @Inject(TournamentService)
  private readonly tournamentService: TournamentService;

  @Get('player/:playerName/score')
  getPlayerGameSummary(@Param('playerName') playerName: string): string {
    const games: TournamentGame = this.tournamentService.getGames(playerName);
    if (games === null)
      throw new BadRequestException(`Player ${games} not found`);

    return `Player ${games.playerName}: ${games.gamesWon} games won: ${games.gamesLost} games lost`;
  }
}
