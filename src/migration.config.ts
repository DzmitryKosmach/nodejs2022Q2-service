import { DataSource } from 'typeorm';
import configService from './ormconfig_copy';

const datasource = new DataSource(configService); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;
