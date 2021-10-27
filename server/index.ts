import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { initConnection } from './database';

import BooksController from './controllers/books.controller';
import ChaptersController from './controllers/chapters.controller';
import NodesController from './controllers/nodes.controller';

const app = express();
const PORT = process.env.PORT || 4000;

app.use('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, '../public/')));

const init = async () => {
  try {
    const connection = await initConnection();

    if (connection) {
      app.use(BooksController(connection));
      app.use(ChaptersController(connection));
      app.use(NodesController(connection));
    } else {
      throw new Error('Connection could not be established');
    }
  } catch (err) {
    console.error('Server initialization failed; error:', err);
  }
};

const start = async () => {
  await init();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
