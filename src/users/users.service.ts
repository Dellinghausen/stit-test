import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entities';
import users from './data/users.json';

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<Users | undefined> {
    return users.find((user) => user.email === email);
  }
}
