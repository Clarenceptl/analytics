import { USER_ROLE } from '@/enums';

export interface User {
  _id: string;

  email: string;

  name: string;

  roles: USER_ROLE[];

  appSecret: string[];

  company: string;

  siteUrl: string;

  isVerify: boolean;

  appId?: string;

  createdAt: Date;

  updatedAt: Date;
}
