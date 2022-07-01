import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('confirm-email')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  // @Get()
  // async confirm(@Query('token') token: string) {
  //   console.log(token);
  //   const email = await this.emailConfirmationService.decodeConfirmationToken(
  //     token,
  //   );
  //   await this.emailConfirmationService.confirmEmail(email);

  //   return 'hola';
  // }

  @Post('confirm')
  async confirm(@Body() confirmationData: any) {
    console.log(confirmationData);
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
    return { message: 'Email confirmado' };
  }
}
