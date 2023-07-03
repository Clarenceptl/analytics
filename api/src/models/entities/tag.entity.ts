import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.entity';

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  _id: Types.ObjectId;

  @Prop({
    type: String || null,
    default: null
  })
  commentaire: string | null;

  @Prop({
    type: Boolean,
    default: true
  })
  isActive: boolean;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }])
  user: User;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
