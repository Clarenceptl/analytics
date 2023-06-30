import { Body, Controller, HttpCode, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Roles, isPublic } from 'src/decorator';
import { CreateUserDto, LoginUserDto, USER_ROLE } from '../models';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @isPublic()
  @HttpCode(201)
  public register(@Body(ValidationPipe) data: CreateUserDto) {
    return this.authService.register(data);
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
    return this.authService.verifyAccount(id);
  }
}
