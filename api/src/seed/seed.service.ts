import { Injectable } from '@nestjs/common';
import { UserService } from '../user';

@Injectable()
export class SeedService {
  public constructor(private readonly userService: UserService) {}

  public async seed() {
    await Promise.all([this.userService.seed()]);
  }
}
