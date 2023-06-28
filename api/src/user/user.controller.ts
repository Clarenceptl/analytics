import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { Roles } from 'src/decorator';
import { USER_ROLE } from 'src/models';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(USER_ROLE.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('self')
  findSelf(@Req() req: any) {
    return this.userService.findOne(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
