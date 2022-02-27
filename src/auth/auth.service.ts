import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthRequestDTO } from './dto/request.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/users.entities';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(params: AuthRequestDTO): Promise<Users | undefined> {
    const user = await this.usersService.findOne(params.email);
    if (user && user.password === params.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(params: any) {
    const user = await this.usersService.findOne(params.email);
    const payload = { email: user.email, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
