import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PayloadToken } from './models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`user ${email} doesn't exist`);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id, role: user.role };

    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=864000`;
    // return {
    //   access_token: this.jwtService.sign(payload),
    //   user,
    // };
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
