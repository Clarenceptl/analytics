import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { ApiIdGuard, isPublic } from 'src/decorator';
import { CreateEvent, Event, RequestWithUser } from 'src/models';
import { EventService } from './event.service';

@Controller({ path: 'event', version: '1' })
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiIdGuard()
  @isPublic()
  createEvent(@Req() req: RequestWithUser, @Body(ValidationPipe) createUserDto: CreateEvent) {
    const { appID, ...data } = createUserDto;
    const event: Partial<Event> = {
      user: req.user,
      ...data
    };
    console.log('event', event);
    return this.eventService.createEvent(event);
  }
}
