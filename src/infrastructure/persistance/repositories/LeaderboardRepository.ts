import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import ILeaderboardRepository from 'src/domain/repositories/ILeaderboardRepository';
import Leaderboard from 'src/domain/aggregates/Leaderboard';
import LeaderboardDomainMapper from '../mappers/LeaderboardDomainMapper';
import LeaderboardPersistanceMapper from '../mappers/LeaderboardPersistanceMapper';
import { LeaderboardDocument } from '../models/LeaderboardSchema';
import TitleId from 'src/domain/value-objects/TitleId';
import LeaderboardId from 'src/domain/value-objects/LeaderboardId';
import Xuid from 'src/domain/value-objects/Xuid';

@Injectable()
export default class LeaderboardRepository implements ILeaderboardRepository {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    @InjectModel(Leaderboard.name)
    private LeaderboardModel: Model<LeaderboardDocument>,
    private readonly leaderboardDomainMapper: LeaderboardDomainMapper,
    private readonly leaderboardPersistanceMapper: LeaderboardPersistanceMapper,
  ) {}

  public async save(leaderboard: Leaderboard) {
    await this.LeaderboardModel.findOneAndUpdate(
      {
        id: leaderboard.id.value,
        titleId: leaderboard.titleId.toString(),
        player: leaderboard.player.value,
      },
      this.leaderboardPersistanceMapper.mapToDataModel(leaderboard),
      {
        upsert: true,
        new: true,
      },
    );
  }

  public async findLeaderboard(titleId: TitleId, id: LeaderboardId, player: Xuid) {
    const leaderboard = await this.LeaderboardModel.findOne({
      id: id.value,
      titleId: titleId.toString(),
      player: player.value,
    });

    if (!leaderboard) return undefined;

    return this.leaderboardDomainMapper.mapToDomainModel(leaderboard);
  }
}
