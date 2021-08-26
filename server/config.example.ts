import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { Book } from './models/Book';
import { Chapter } from './models/Chapter';
import { Node } from './models/Node';
import { Section } from './models/Section';

const typeOrmConfig: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'DB_NAME',
  password: 'DB_PASSWORD',
  database: 'outlinear',
  synchronize: true,
  logging: true,
  // entities: [Book, Chapter, Node, Section]
  entities: [Node, Section, Chapter, Book]
};

export default typeOrmConfig;
