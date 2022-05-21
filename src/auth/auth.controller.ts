import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PayloadToken } from './models/token.model';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const cookie = this.authService.generateJWT(user);

    res.setHeader('Set-Cookie', cookie);

    res.send({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  @Get('logout')
  logOut(@Res({ passthrough: true }) response: Response) {
    response.cookie('Authentication', '', { httpOnly: true });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  async authenticate(@Req() request: Request) {
    const user = request.user as PayloadToken;
    const { id, email, role } = await this.userService.findOne(user.sub);
    return { id, email, role };
  }

  @UseGuards(AuthGuard('jwtheader'))
  @Get('checkheader')
  async authenticateheader(@Req() request: Request) {
    const user = request.user as PayloadToken;
    const { id, email, role } = await this.userService.findOne(user.sub);
    return { id, email, role };
  }
}
