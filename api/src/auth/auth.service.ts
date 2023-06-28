import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/models';
import { UserService } from 'src/user';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async login(loginDto: LoginUserDto) {
    try {
      const user = await this.userService.findOneByEmail(loginDto.email);
      if (!compareSync(loginDto.password, user.password)) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: user._id.toString(),
        roles: user.roles
      };
      return {
        access_token: await this.jwtService.signAsync(payload)
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

  async register(data: any) {
    return data;
  }
}
