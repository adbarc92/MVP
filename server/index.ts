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
    })
    .catch((err: Error) => {
      console.error(err);
    });

  // app.get('/book/:id', (req: Request, res: Response) => {});
  // app.post('/book/:id', (req: Request, res: Response) => {

  // });
  // app.put('/book/:id', (req: Request, res: Response) => {});

  // app.get('/chapter/:id', (req: Request, res: Response) => {});
  // app.post('/chapter/:id', (req: Request, res: Response) => {});
  // app.put('/chapter/:id', (req: Request, res: Response) => {});

  // app.get('/section/:id', (req: Request, res: Response) => {});
  // app.post('/section/:id', (req: Request, res: Response) => {});
  // app.put('/section/:id', (req: Request, res: Response) => {});
};

const start = async () => {
  await init();
  app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
};

start();
