import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/models';
import { UserService } from 'src/user';

@Injectable()
export class SdkGuards implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { body, headers } = request;

    if (!body?.APP_ID) return false;

    const response = await this.userService.findByAppId(body?.APP_ID);
    if (!response.success) return false;

    const user: User = response.data;
    // TODO: a decommenter
    // if (user.siteUrl !== headers.origin) return false;
    request['user'] = user;
    return true;
  }
}

export class SdkBackGuards implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { body } = request;

    if (!body?.APP_ID || !body?.APP_SECRET) return false;

    const response = await this.userService.findByAppId(body?.APP_ID);
    if (!response.success) return false;
    if (response.data.appSecret !== body.APP_SECRET) return false;
    const user: User = response.data;

    request['user'] = user;
    return true;
  }
}
