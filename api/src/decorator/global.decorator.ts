import { SetMetadata, UseGuards } from '@nestjs/common';
import { SdkGuards } from 'src/guards';
import { USER_ROLE } from 'src/models';

export const isPublic = () => {
  return SetMetadata('isPublic', true);
};

export const ROLES_KEY = 'roles';
export const Roles = (...roles: USER_ROLE[]) => SetMetadata(ROLES_KEY, roles);

export const ApiIdGuard = () => UseGuards(SdkGuards);
