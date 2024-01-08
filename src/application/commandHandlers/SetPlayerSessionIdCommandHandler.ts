import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Player from 'src/domain/aggregates/Player';
import IPlayerRepository, { IPlayerRepositorySymbol } from 'src/domain/repositories/IPlayerRepository';
import { SetPlayerSessionIdCommand } from '../commands/SetPlayerSessionIdCommand';

@CommandHandler(SetPlayerSessionIdCommand)
export class SetPlayerSessionIdCommandHandler
  implements ICommandHandler<SetPlayerSessionIdCommand>
{
  constructor(
    @Inject(IPlayerRepositorySymbol)
    private repository: IPlayerRepository,
  ) {}

  async execute(command: SetPlayerSessionIdCommand) {
    const player = await this.repository.findByXuid(command.xuid);
    player.setSession(command.sessionId);
    await this.repository.save(player);
  }
}
