import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, User } from 'src/models';
import { UserService } from 'src/user';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async createTag(user: User, comments?: string) {
    const res = new this.tagModel({
      user: user,
      commentaire: comments
    });

    await res.save();

    await this.userService.updateTags(user, res);

    return {
      success: true,
      data: 'tag created'
    };
  }

  async getTags(id: string) {
    const res = await this.tagModel.find({ user: id });
    if (!res) {
      throw new NotFoundException('Tag not found');
    }
    return {
      success: true,
      data: res
    };
  }

  async desativate(user: User, id: string) {
    const res = await this.tagModel.findOneAndUpdate({ _id: id, user: user._id }, { isActive: false });
    if (!res) {
      throw new NotFoundException('Tag not found');
    }
    return {
      success: true,
      data: 'tag desativated'
    };
  }
}
