import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { IsEnum, IsOptional } from 'class-validator';

export type EventDocument = HydratedDocument<Metrics>;

@Schema()
export class Metrics {
  _id: Types.ObjectId;

  @Prop({
    type: String
  })
  name: string;

  @Prop({
    type: Number,
    required: true
  })
  value: number;

  @Prop({
    type: String,
    required: true
  })
  queryDimensions: string;

  @Prop({
    type: String
  })
  timeScale: string;

  @Prop({
    type: String
  })
  dataType: string;

  @Prop({
    type: String
  })
  visualizationType: string;
}

export const MetricsSchema = SchemaFactory.createForClass(Metrics);
