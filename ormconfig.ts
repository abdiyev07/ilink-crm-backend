import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { mainDbConfig } from './src/config/db.config';
const typeOrmEntitiesPath = path.join('dist', 'src', 'common', 'entities', '*.entity.js');
const postgresMigrationsPath = path.join('dist', 'src', 'migrations', 'postgres', '*.js');

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: mainDbConfig.host,
  port: mainDbConfig.port,
  username: mainDbConfig.username,
  password: mainDbConfig.password,
  database: mainDbConfig.database,
  entities: [typeOrmEntitiesPath],
  migrations: [postgresMigrationsPath],
  cli: {
    migrationsDir: path.join('src', 'migrations', 'postgres'),
  },
  synchronize: false,
  schema: 'public',
};

export default config;
