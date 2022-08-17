import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';

import config from '../../config';

import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EmailConfirmationController } from './email-confirmation/email-confirmation.controller';
import { UsersModule } from '../users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          transport: {
            host: configService.emailHost,
            port: 465,
            secure: true,
            auth: {
              user: configService.emailUser,
              pass: configService.emailPassword,
            },
          },
          defaults: {
            from: 'Panchos Villa <soporte@panchos.com.sv>', // outgoing email ID
          },
          template: {
            dir: process.cwd() + '/template/',
            adapter: new HandlebarsAdapter(), // or new PugAdapter()
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    ConfigModule,
    UsersModule,
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
  controllers: [EmailConfirmationController],
  providers: [EmailService, EmailConfirmationService, JwtStrategy],
  exports: [EmailService, EmailConfirmationService],
})
export class EmailModule {}
