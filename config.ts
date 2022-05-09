import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
  };
});
