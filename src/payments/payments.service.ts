import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../../config';
import { lastValueFrom, map } from 'rxjs';
import FormData = require('form-data');
import { IAccessToken } from './interfaces/wompi';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private httpService: HttpService,
  ) {}

  async createOrRefreshAccessToken(): Promise<IAccessToken> {
    const timestamp = Date.now();
    const bodyFormData = new FormData();
    bodyFormData.append('grant_type', 'client_credentials');
    bodyFormData.append('audience', 'wompi_api');
    bodyFormData.append('client_id', this.configService.wompi.appId);
    bodyFormData.append('client_secret', this.configService.wompi.apiSecret);

    const response = await lastValueFrom(
      this.httpService
        .post('https://id.wompi.sv/connect/token', bodyFormData, {
          headers: bodyFormData.getHeaders(),
        })
        .pipe(map((res) => res.data)),
    );
    return { ...response, createdAt: timestamp };
  }
}
