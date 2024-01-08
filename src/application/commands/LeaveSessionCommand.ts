import SessionId from 'src/domain/value-objects/SessionId';
import TitleId from 'src/domain/value-objects/TitleId';
import Xuid from 'src/domain/value-objects/Xuid';

export class LeaveSessionCommand {
  constructor(
    public readonly titleId: TitleId,
    public readonly sessionId: SessionId,
    public readonly xuids: Xuid[],
  ) {}
}
