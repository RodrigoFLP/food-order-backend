import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { HttpModule } from '@nestjs/axios';
import { WompiService } from './wompi/wompi.service';

@Module({
  imports: [HttpModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: 'WOMPI_ACCESS_TOKEN',
      useFactory: async (paymentsService: PaymentsService) => {
        const token = await paymentsService.createOrRefreshAccessToken();
        console.log(token);
        return token;
      },
      inject: [PaymentsService],
    },
    WompiService,
  ],
  exports: [WompiService, PaymentsService],
})
export class PaymentsModule {}
