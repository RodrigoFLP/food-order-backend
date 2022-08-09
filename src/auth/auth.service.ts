import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PayloadToken } from './models/token.model';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
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

  async validateAdmin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`user ${email} doesn't exist`);
    }

    console.log(user.role);

    if (user.role !== 'admin' && user.role !== 'super-admin') {
      throw new ForbiddenException('Invalid admin');
    }

    console.log(email, user);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }

    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id, role: user.role };

    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=864000; ${
      !this.configService.domain &&
      'domain=.panchos.com.sv SameSite=strict; secure;'
    }`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly;  Path=/; Max-Age=0; ${
      !this.configService.domain &&
      'domain=.panchos.com.sv SameSite=strict; secure;'
    }`;
  }
}
