import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtHeaderStrategy } from './strategies/jwtheader.strategy';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EmailModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtHeaderStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
