import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, User } from 'src/models';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event> // @Inject(forwardRef(() => UserService)) // private readonly userService: UserService
  ) {}

  async createEvent(data: Partial<Event>) {
    const res = new this.eventModel(data);
    try {
      await res.save();
    } catch (error) {
      throw new InternalServerErrorException({ message: 'Error creating event', error });
    }

    return {
      success: true,
      data: 'event created'
    };
  }

  async getEventsPageviews(user: User) {
    const res = await this.eventModel.find({ type: 'pageview', user: user });

    return {
      success: true,
      data: res
    };
  }

  async getEventsMouse() {
    const res = await this.eventModel.find({ type: 'mouse' });

    return {
      success: true,
      data: res
    };
  }

  async getEventsByTags(tag: string) {
    const res = await this.eventModel.find({ tag: tag });

    return {
      success: true,
      data: res
    };
  }
}
