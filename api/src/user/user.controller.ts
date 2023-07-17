import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Sse, ValidationPipe } from '@nestjs/common';
import { Observable, interval, map, mergeMap } from 'rxjs';
import { Roles } from 'src/decorator';
import { CreateUserDto, USER_ROLE, UpdateUserDto } from 'src/models';
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

  @Sse('unverified')
  @Roles(USER_ROLE.ADMIN)
  sse(): Observable<MessageEvent> {
    return interval(3000).pipe(
      mergeMap(async () => await this.userService.findAllUnverified()),
      map((res) => {
        return { data: res?.data ?? [] } as MessageEvent;
      })
    );
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
    return this.userService.delete(id);
  }
}
