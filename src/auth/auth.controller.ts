import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PayloadToken } from './models/token.model';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailConfirmationService } from '../email/email-confirmation/email-confirmation.service';
import { TrimPipe } from '../pipes/trim-pipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @UsePipes(new TrimPipe())
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const cookie = this.authService.generateJWT(user);

    res.setHeader('Set-Cookie', cookie);

    res.send({
      id: user.id,
      email: user.email,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      firstName: user.customer.firstName,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new TrimPipe())
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(user.email);

    const cookie = this.authService.generateJWT(user);

    res.setHeader('Set-Cookie', cookie);

    res.send({
      id: user.id,
      email: user.email,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      firstName: user.customer.firstName,
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
    const {
      id,
      email,
      role,
      isEmailConfirmed,
      customer: { firstName },
    } = await this.userService.findOne(user.sub);
    return { id, email, role, isEmailConfirmed, firstName };
  }

  @UseGuards(AuthGuard('jwtheader'))
  @Get('checkheader')
  async authenticateheader(@Req() request: Request) {
    const user = request.user as PayloadToken;
    const { id, email, role } = await this.userService.findOne(user.sub);
    return { id, email, role };
  }
}
