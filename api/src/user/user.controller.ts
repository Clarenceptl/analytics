import { Body, Controller, Delete, Get, Param, Patch, Post, Req, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorator';
import { USER_ROLE } from 'src/models';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { UserService } from './user.service';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(USER_ROLE.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(USER_ROLE.ADMIN)
  @Get('unverified')
  findAllUnverified() {
    return this.userService.findAllUnverified();
  }

  @Get('getSelf')
  findSelf(@Req() req: any) {
    return this.userService.findOne(req?.user?._id ?? '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
