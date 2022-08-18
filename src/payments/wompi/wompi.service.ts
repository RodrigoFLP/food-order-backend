import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import config from '../../../config';
import { IAccessToken } from '../interfaces/wompi';
import { PaymentsService } from '../payments.service';

@Injectable()
export class WompiService {
  constructor(
    @Inject('WOMPI_ACCESS_TOKEN') private accessToken: IAccessToken,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private httpService: HttpService,
    private paymentsService: PaymentsService,
  ) {}

  async createPaymentLink(orderId: string, total: number) {
    if (
      Date.now() - this.accessToken.createdAt >
      (this.accessToken.expires_in - 300) * 1000
    ) {
      this.accessToken =
        await this.paymentsService.createOrRefreshAccessToken();
    }

    const response = await lastValueFrom(
      this.httpService
        .post(
          'https://api.wompi.sv/EnlacePago',
          {
            identificadorEnlaceComercio: 'string',
            monto: total,
            nombreProducto: `Orden #${orderId.split('-')[0]}`,
            configuracion: {
              urlWebhook: `https://api.panchos.com.sv/tickets/confirm-payment?id=${orderId}`,
              urlRedirect: 'https://panchos.com.sv/confirm-payment-redirect',
            },
          },
          {
            headers: {
              authorization: `Bearer ${this.accessToken.access_token}`,
            },
          },
        )
        .pipe(map((res) => res.data)),
    );
    return { ...response };
  }

  async isOrderReal(id: string) {
    const response = await lastValueFrom(
      this.httpService
        .get(`https://api.wompi.sv/TransaccionCompra/${id}`, {
          headers: {
            authorization: `Bearer ${this.accessToken.access_token}`,
          },
        })
        .pipe(map((res) => res.data)),
    );

    return { isReal: response.esReal, isSuccess: response.esAprobada };
  }

  async getOrders(from: string, to: string) {
    console.log('corre');
    const response = await lastValueFrom(
      this.httpService
        .get(
          `https://api.wompi.sv/TransaccionCompra?IdAplicativo=${this.configService.wompi.appId}`,
          {
            headers: {
              authorization: `Bearer ${this.accessToken.access_token}`,
            },
          },
        )
        .pipe(map((res) => res.data)),
    );
    console.log(response);
    return { ...response };
  }
}
