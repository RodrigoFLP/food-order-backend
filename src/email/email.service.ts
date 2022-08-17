import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  sendMail(options: ISendMailOptions) {
    return this.mailerService.sendMail(options);
  }
}
