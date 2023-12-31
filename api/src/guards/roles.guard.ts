import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator';
import { UserService } from 'src/user';
import { USER_ROLE } from '../models';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new UnauthorizedException();
    if (user.roles.includes(USER_ROLE.ADMIN)) return true;
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}

@Injectable()
export class OwnUserGuards implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new UnauthorizedException();
    const { id } = context.switchToHttp().getRequest().params;
    const { data } = await this.userService.findOne(id);
    if (!data) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return data._id.equals(user._id) || user.roles.includes(USER_ROLE.ADMIN);
  }
}
