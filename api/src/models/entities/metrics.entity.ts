import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type EventDocument = HydratedDocument<Metrics>;

@Schema()
export class Metrics {
  _id: Types.ObjectId;

  @Prop({
    type: String
  })
  name: string;

  @Prop({
    type: String,
    required: true
  })
  description: string;

  @Prop({
    type: Number,
    required: true
  })
  value: number;

  @Prop({
    type: Object,
    required: true
  })
  data: object;

  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt: Date;
}
export const MetricsSchema = SchemaFactory.createForClass(Metrics);
