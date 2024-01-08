import { Injectable } from '@nestjs/common';
import Player from '../../../domain/aggregates/Player';
import { Player as PlayerModel } from '../models/PlayerSchema';

@Injectable()
export default class PlayerPersistanceMapper {
  public mapToDataModel(player: Player): PlayerModel {
    return {
      xuid: player.xuid.value,
      hostAddress: player.hostAddress.value,
      machineId: player.machineId.value,
      macAddress: player.macAddress.value,
      port: player.port,
      sessionId: player.sessionId?.value,
    };
  }
}
