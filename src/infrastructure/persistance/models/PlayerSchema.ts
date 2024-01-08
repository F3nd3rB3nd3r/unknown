import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ required: true, unique: true })
  xuid: string;
  @Prop({ required: true })
  machineId: string;
  @Prop({ required: true })
  hostAddress: string;
  @Prop({ required: true })
  macAddress: string;
  @Prop({ required: true })
  port: number;
  @Prop()
  sessionId?: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);