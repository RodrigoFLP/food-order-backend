import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { WompiService } from './wompi/wompi.service';

@Controller('payment')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly wompiService: WompiService,
  ) {}

  // @Get()
  // async createToken() {
  //   const res = await this.paymentsService.createOrRefreshAccessToken();
  // }

  @Get('wompi')
  async createLink() {
    const res = await this.wompiService.createPaymentLink('ndifaunuea', 20);
    return res;
  }

  @Get('wompi/orders')
  async getAllOrders() {
    const res = await this.wompiService.getOrders('', '');
    return res;
  }
}
