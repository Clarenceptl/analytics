import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.entity';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true
  })
  visitorId: string;

  @Prop({
    type: String,
    required: true
  })
  type: string;

  @Prop({
    type: String,
    required: true
  })
  service: string;

  @Prop({ type: Object || null, default: null })
  data?: any;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }])
  user: User;

  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
