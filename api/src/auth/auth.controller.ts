import { Body, Controller, HttpCode, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Roles, isPublic } from 'src/decorator';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, USER_ROLE } from '../models';
import { UserService } from 'src/user';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('register')
  @isPublic()
  @HttpCode(201)
  public register(@Body(ValidationPipe) data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Post('login')
  @isPublic()
  @HttpCode(200)
  public login(@Body(ValidationPipe) data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Patch('verify-account/:id')
  @Roles(USER_ROLE.ADMIN)
  @isPublic()
  @HttpCode(200)
  public verifyAccount(@Param('id') id: string) {
    return this.userService.verifyAccount(id);
  }
}
