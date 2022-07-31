import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

export default {
  type: 'postgres',
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  retryAttempts: 3,
  logNotifications: true,
  entities: [
    'src/**/entities/*.entity.{ts}',
    'dist/**/entities/*.entity.{ts,js}',
  ],
  migrationsRun: true,
  migrations: ['src/migration/*{.ts,.js}'],
  migrationsTableName: 'MyMigrations',
} as DataSourceOptions;
