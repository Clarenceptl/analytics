import { User } from 'src/models';

export const removeDataSensibleUser = (user: User): User => {
  delete user.password;
  return user;
};
