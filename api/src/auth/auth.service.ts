import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto, LoginUserDto } from 'src/models';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly userService: UserService) {}

  async login(loginDto: LoginUserDto) {
    try {
      const { data } = await this.userService.findOneByEmail(loginDto.email);
      if (!compare(loginDto.password, data.password)) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: data._id.toString(),
        roles: data.roles
      };
      return {
        access_token: await this.jwtService.signAsync(payload, { expiresIn: '1d' })
      };
    } catch (err) {
      if (err instanceof HttpException) {
        if (err instanceof UnauthorizedException || err instanceof NotFoundException) {
          throw new UnauthorizedException("Email or password don't match");
        }
        throw err;
      }
      throw new HttpException(err.message, 500, err);
    }
  }

  async verifyAccount(id: string) {
    return await this.userService.verifyAccount(id);
  }

  async register(data: CreateUserDto) {
    return await this.userService.create(data);
  }
}
