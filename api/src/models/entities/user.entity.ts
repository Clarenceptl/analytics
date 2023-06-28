import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum USER_ROLE {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    validate: {
      validator: (email: string) => emailRegex.test(email),
      message: (props: any) => `${props.value} is not a valid email!`
    }
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 8
  })
  password: string;

  @Prop({
    default: [USER_ROLE.USER]
  })
  roles: USER_ROLE[];

  @Prop({
    required: true,
    trim: true,
    minlength: 2,
    type: String
  })
  company: string;

  @Prop({
    required: true,
    trim: true,
    type: String
  })
  siteUrl: string;

  @Prop({ type: Boolean, default: false })
  isVerify: boolean;

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  createdAt: Date;

  @Prop({
    type: Date
  })
  updatedAt: Date;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase();

  next();
});

export { UserSchema };
