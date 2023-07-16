import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/models/';
import { UserModule } from 'src/user';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), forwardRef(() => UserModule)],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}
