import { ConnectionManager, Connection } from 'typeorm';

import typeOrmConfig from './config';

import { Book, Chapter, Node, Section } from './models';

const connectionManager = new ConnectionManager();

const connection = connectionManager.create({
  ...typeOrmConfig,
  entities: [Book, Chapter, Node, Section]
});

export const initConnection = async (): Promise<Connection | null> => {
  try {
    await connection.connect();
    console.debug('Connected!');
    return connection;
  } catch (err) {
    console.error(err);
    return null;
  }
};
