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

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logOut(@Req() request: Request, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  authenticate(@Req() request: Request) {
    const user = request.user as User;
    return user;
  }
}
