import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto, LoginUserDto, RegisterMail, User } from 'src/models';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  async login(loginDto: LoginUserDto) {
    try {
      const res = await this.userService.findOneByEmail(loginDto.email);

      if (!res?.success) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }

      const data: User = res.data;

      if (!data.isVerify) {
        throw new UnauthorizedException('Un administrateur doit valider votre compte');
      }

      if (!compare(loginDto.password, data.password ?? '')) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }
      const payload = {
        id: data._id.toString(),
        roles: data.roles
      };
      const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1d' });
      return {
        success: true,
        data: {
          accessToken
        }
      };
    } catch (err) {
      if (err instanceof HttpException) {
        if (err instanceof UnauthorizedException || err instanceof NotFoundException) {
          throw new UnauthorizedException(err.message);
        }
        throw err;
      }
      throw new HttpException(err.message, 500, err);
    }
  }

  async verifyAccount(id: string, isVerify: boolean) {
    if (!isVerify) {
      return await this.userService.delete(id);
    }
    return await this.userService.verifyAccount(id);
  }

  async register(data: CreateUserDto) {
    const res = await this.userService.create(data);
    if (res.success) {
      const user = res.data;
      const payload: RegisterMail = {
        email: user.email,
        fullname: user.name
      };
      this.mailService.sendMailRegister(payload);
    }
    return res;
  }
}
