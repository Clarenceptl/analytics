import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/models';

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
      throw new InternalServerErrorException(error);
    }

    return {
      success: true,
      data: 'event created'
    };
  }
}
