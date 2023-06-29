import { USER_ROLE } from '@/enums';

export interface User {
  _id: string;

  email: string;

  roles: USER_ROLE[];

  company: string;

  siteUrl: string;

  isVerify: boolean;

  createdAt: Date;

  updatedAt: Date;
}
