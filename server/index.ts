import express from 'express';
import morgan from 'morgan';

import { ConnectionManager } from 'typeorm';
import typeOrmConfig from './config';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));

const connectionManager = new ConnectionManager();
const connection = connectionManager.create(typeOrmConfig);

const init = async () => {
  connection
    .connect()
    .then((connection) => {
      console.log('Connected!');
      // console.log('Connection:', connection);
    })
    .catch((err: Error) => {
      console.error(err);
    });
};

const start = async () => {
  await init();
  app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
};

start();
