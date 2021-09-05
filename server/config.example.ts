import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const typeOrmConfig: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'FILL_ME_IN',
  password: 'FILL_ME_IN',
  database: 'outlinear',
  synchronize: true,
  logging: true
};

export default typeOrmConfig;
