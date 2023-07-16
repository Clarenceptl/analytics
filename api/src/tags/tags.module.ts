import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from 'src/models';
import { UserModule } from 'src/user';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]), forwardRef(() => UserModule)],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
