import { Body, Controller, Param, Post, Req, Sse, ValidationPipe } from '@nestjs/common';
import { Observable, interval, map, mergeMap } from 'rxjs';
import { ApiIdGuard, ApiSecretGuard, isPublic } from 'src/decorator';
import { CreateEventFromBack, CreateEventFromClient, Event, RequestWithUser } from 'src/models';
import { EventService } from './event.service';

@Controller({ path: 'event', version: '1' })
export class EventController {
  private filters = null;
  constructor(private readonly eventService: EventService) {}

  @Post('front')
  @ApiIdGuard()
  @isPublic()
  createEvent(@Req() req: RequestWithUser, @Body(ValidationPipe) createEvent: CreateEventFromClient) {
    const { APP_ID, ...data } = createEvent;
    const event: Partial<Event> = {
      user: req.user,
      ...data
    };
    console.log(createEvent);
    return this.eventService.createEvent(event);
  }

  @Post('specific')
  getSpecificGraph(@Req() req: RequestWithUser, @Body(ValidationPipe) filter: any) {
    this.filters = filter;
    return {
      success: true,
      data: 'ok'
    };
  }

  @Sse('specific/data')
  specificData(): Observable<MessageEvent> {
    return interval(2000).pipe(
      mergeMap(async () => await this.eventService.getSpecificData(this.filters)),
      map((res) => {
        return { data: res?.data ?? [] } as MessageEvent;
      })
    );
  }

  @Post('backend')
  @ApiSecretGuard()
  @isPublic()
  createEventBack(@Req() req: RequestWithUser, @Body(ValidationPipe) createEvent: CreateEventFromBack) {
    const { APP_ID, APP_SECRET, ...data } = createEvent;
    const event: Partial<Event> = {
      user: req.user,
      ...data
    };
    console.log(createEvent);
    return this.eventService.createEvent(event);
  }

  @Sse('pageviews')
  pageviews(): Observable<MessageEvent> {
    return interval(2000).pipe(
      mergeMap(async () => await this.eventService.getEventsPageviews()),
      map((res) => {
        return { data: res?.data ?? [] } as MessageEvent;
      })
    );
  }

  @Sse('mouse')
  mouse(): Observable<MessageEvent> {
    return interval(2000).pipe(
      mergeMap(async () => await this.eventService.getEventsMouse()),
      map((res) => {
        return { data: res?.data ?? [] } as MessageEvent;
      })
    );
  }

  @Sse('tag/:tag')
  tags(@Param(ValidationPipe) tag: string): Observable<MessageEvent> {
    return interval(2000).pipe(
      mergeMap(async () => await this.eventService.getEventsByTags(tag)),
      map((res) => {
        return { data: res?.data ?? [] } as MessageEvent;
      })
    );
  }
}
