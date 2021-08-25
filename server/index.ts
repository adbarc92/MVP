import express from 'express';
import morgan from 'morgan';

import { Book } from './models/Book';
import { Chapter } from './models/Chapter';
import { Node } from './models/Node';
import { Section } from './models/Section';
import { Section_Node } from './models/Section_Node';
import { WritingStats } from './models/WritingStats';

import { createConnection } from 'typeorm';
import ormconfig from './ormconfig.json';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));

let connection;

const init = async () => {
  connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'outliner',
    entities: [
      Book,
      Chapter,
      Node,
      Section,
      Section_Node,
      WritingStats,
    ],
    synchronize: true,
    logging: false,
  });
};
