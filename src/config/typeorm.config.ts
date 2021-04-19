import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
// import * as config from 'config';

// const dbConfig = config.get('db');

export const ORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: 5432,
  username: process.env.POSTGRES_USERNAME || "postgres",
  password: process.env.POSTGRES_PASSWORD || "Plotnikov1999",
  database: process.env.POSTGRES_DATABASE || "infochat",
  autoLoadEntities: true,
  synchronize: true,
};

// module.exports = ORMConfig;
