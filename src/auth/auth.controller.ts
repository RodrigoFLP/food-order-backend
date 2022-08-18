import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
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
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailConfirmationService } from '../email/email-confirmation/email-confirmation.service';
import { TrimPipe } from '../pipes/trim-pipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  @UseGuards(AuthGuard('admin'))
  @UsePipes(new TrimPipe())
  @Post('admin/login')
  loginAdmin(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const cookie = this.authService.generateJWT(user);

    res.setHeader('Access-Control-Allow-Credentials', 'true');
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

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Set-Cookie', cookie);

    res.send({
      id: user.id,
      email: user.email,
      role: user.role,
      isEmailConfirmed: user.isEmailConfirmed,
      firstName: user.customer.firstName,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('resend-email-confirmation')
  async resendEmailConfirmation(@Req() request: Request) {
    console.log('hola');

    const user = request.user as PayloadToken;

    const currentUser = await this.userService.findOne(user.sub);

    const timestamp = new Date(Date.now());
    console.log('timestamp: ', timestamp.getSeconds());
    console.log(
      'timestamp: ',
      currentUser.lastConfirmationEmailSent.getSeconds(),
    );

    console.log(
      'es 30: ',
      timestamp.getSeconds() -
        currentUser.lastConfirmationEmailSent.getSeconds() <
        30,
    );

    if (
      timestamp.getSeconds() -
        currentUser.lastConfirmationEmailSent.getSeconds() <
      30
    ) {
      throw new ConflictException(
        'Espera al menos 30 segundos para volver a intentar',
      );
    }

    if (currentUser.isEmailConfirmed) {
      throw new UnauthorizedException('El email ya ha sido confirmado');
    }

    currentUser.lastConfirmationEmailSent = new Date(Date.now());

    await this.userService.saveUser(currentUser);

    return this.emailConfirmationService.sendVerificationLink(
      currentUser.email,
    );
  }

  @Get('logout')
  logOut(@Res({ passthrough: true }) response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      domain: '.panchos.com.sv',
      secure: true,
      sameSite: 'strict',
    });
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

  @UseGuards(AuthGuard('jwt'))
  @Get('check-admin')
  async authenticateAdmin(@Req() request: Request) {
    const user = request.user as PayloadToken;

    if (user.role === 'customer') {
      throw new UnauthorizedException('User not allowed');
    }

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
