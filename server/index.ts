import express from 'express';
import morgan from 'morgan';

import { Book } from './models/Book';
import { Chapter } from './models/Chapter';
import { Node } from './models/Node';
import { Section } from './models/Section';
import { Section_Node } from './models/Section_Node';
import { WritingStats } from './models/WritingStats';

import { ConnectionManager, ConnectionOptions } from 'typeorm';
import ormconfig from './ormconfig.json';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));

const connectionManager = new ConnectionManager();

const connectionOptions: any = ormconfig;

const connection = connectionManager.create(connectionOptions);

const init = async () => {
  connection
    .connect()
    .then((connection) => {
      console.log('Connected!');
    })
    .catch((err) => {
      console.error(err);
    });
};

init();
