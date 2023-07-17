import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models';
import { TagsModule } from 'src/tags/tags.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => TagsModule),
    forwardRef(() => EventModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
