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
      throw new InternalServerErrorException({ message: 'Error creating event', error });
    }

    return {
      success: true,
      data: 'event created'
    };
  }

  async getEventsPageviews() {
    const res = await this.eventModel.find({ type: 'pageview' });

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

  async getSpecificData(filters: any) {
    // const filterExample = {
    //   type: 'pageview',
    //   tag: 'home',
    //   date: {
    //     $gte: new Date('2021-01-01T00:00:00.000Z'),
    //     $lt: new Date('2021-01-31T00:00:00.000Z'),
    //     step: 1
    //   },
    //   nbType: 'percent' || 'number',
    //   graphType: 'line' || 'bar'
    // };

    const res = await this.eventModel.find(filters);

    return {
      success: true,
      data: res
    };
  }
}
