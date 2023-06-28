import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { MongoError } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await hash(createUserDto.password, 10);
      const res = new this.userModel({
        ...createUserDto
      });
      return await res.save();
    } catch (error) {
      if (error instanceof MongoError) {
        if (error.code === 11000) {
          throw new BadRequestException('email already used');
        }
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel
      .findOne({
        email: email
      })
      .select('+password')
      .exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).select('+password').exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    try {
      await this.userModel.updateOne({ _id: id }, updateUserDto);
      return;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async verifyAccount(id: string) {
    const user = await this.userModel.findById(id).select('+password').exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    try {
      await this.userModel.updateOne({ _id: id }, user);
      return;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  seed() {
    return 'This action adds a new user';
  }
}
