import { Global, Module } from '@nestjs/common';
import config from '../../config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, host, port, user, password } = configService.postgres;
        return {
          type: 'postgres',
          host: host,
          port: port,
          username: user,
          password: password,
          database: dbName,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
