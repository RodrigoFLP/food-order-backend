import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apiKey: process.env.API_KEY,
    emailService: process.env.EMAIL_SERVICE,
    emailPort: process.env.EMAIL_PORT,
    emailHost: process.env.EMAIL_HOST,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    domain: process.env.DOMAIN,
    wompi: {
      appId: process.env.WOMPI_APP_ID,
      apiSecret: process.env.WOMPI_API_SECRET,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
  };
});
