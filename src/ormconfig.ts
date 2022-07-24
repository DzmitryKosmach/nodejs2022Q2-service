import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './users/entities/user.entity';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

console.log('POSTGRES_HOST = ' + POSTGRES_HOST + '\n');
console.log('POSTGRES_PORT = ' + POSTGRES_PORT + '\n');
console.log('POSTGRES_USER = ' + POSTGRES_USER + '\n');
console.log('POSTGRES_PASSWORD = ' + POSTGRES_PASSWORD + '\n');
console.log('POSTGRES_DB = ' + POSTGRES_DB + '\n');

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  retryAttempts: 3,
  //entities: ['srs/**/entities/*.entity.ts', 'build/**/entities/*.entity.js'],
  entities: [UserEntity],
  //migrations: ['src/migration/**/*{.ts,.js}', 'build/migration/**/*.js'],
  //subscribers: ['src/migration/**/*.ts'],
  /* cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    }, */
} as DataSourceOptions;
