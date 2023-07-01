import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { USER_ROLE, User } from 'src/models';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await hash(createUserDto.password, 10);
      const res = new this.userModel({
        ...createUserDto
      });
      await res.save();
      delete res.password;
      const response: User = res;
      return {
        success: true,
        data: response
      };
    } catch (error) {
      if (error instanceof MongoError) {
        if (error.code === 11000) {
          throw new BadRequestException('email already used');
        }
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    const user: User[] = await this.userModel.find();
    if (!user || user.length === 0) {
      throw new NotFoundException(`Users not found`);
    }
    return {
      success: true,
      data: user
    };
  }

  async findAllUnverified() {
    const user: User[] = await this.userModel.find({ isVerify: false });
    if (!user || user.length === 0) {
      throw new NotFoundException(`Users not found`);
    }
    return {
      success: true,
      data: user
    };
  }

  async findOne(id: string) {
    const user: User | null = await this.userModel.findOne({ _id: id }).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return {
      success: true,
      data: user
    };
  }

  async findOneByEmail(email: string) {
    const user: User | null = await this.userModel.findOne({
      email: email
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return {
      success: true,
      data: user
    };
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).select('+password').exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    try {
      await this.userModel.updateOne({ _id: id }, updateUserDto);
      return {
        success: true,
        data: user
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async verifyAccount(id: string) {
    const user: User | null = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    try {
      await this.userModel.updateOne({ _id: id }, user);
      return {
        success: true,
        data: user
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async clear() {
    await this.userModel.deleteMany({});
  }

  async seed() {
    console.log('SEEDING USERS -----');

    await this.clear();
    const password = await hash('Test2023!', 10);
    const user: CreateUserDto = {
      email: 'user@user.com',
      password,
      company: 'My company',
      siteUrl: 'https://www.mycompany.com'
    };
    const admin: CreateUserDto = {
      email: 'admin@admin.com',
      password,
      company: 'My company admin',
      siteUrl: 'https://www.mycompanyadmin.com'
    };

    const tmpUser = new this.userModel({ ...user, isVerify: true });
    await tmpUser.save();
    const tmpAdmin = new this.userModel({ ...admin, roles: [USER_ROLE.ADMIN], isVerify: true });
    await tmpAdmin.save();
    console.log(`Created user with id: ${tmpUser.id}`);
  }
}
