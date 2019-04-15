import { Injectable } from '@nestjs/common';

import { UserService } from 'src/api/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(user: { username: string; password: string }): Promise<any> {
    return this.userService.authenticateUser(user);
  }
}
