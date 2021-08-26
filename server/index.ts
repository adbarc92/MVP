import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

import { ConnectionManager, getConnection } from 'typeorm';
import typeOrmConfig from './config';

import {
  BookPost,
  GetOneParams,
  BookPut,
  getChapterParams,
  ChapterPost,
  ChapterPut
} from './types';
import {
  validateRequestStrings,
  validateRequestNumbers
} from './utils';

import { Book } from './models/Book';
import { Chapter } from './models/Chapter';
import { Node } from './models/Node';
import { Section } from './models/Section';
import { Tag } from './models/Tag';
import { WritingStats } from './models/WritingStats';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, '../public/')));

const connectionManager = new ConnectionManager();
const connection = connectionManager.create(typeOrmConfig);

const init = async () => {
  connection
    .connect()
    .then(() => {
      console.log('Connected!');
    })
    .catch((err: Error) => {
      console.error(err);
    });

  app.post(
    '/books',
    async (
      req: Request<null, null, BookPost, null>,
      res: Response
    ) => {
      const body = req.body;
      const name = body?.name;
      const textBody = body?.textBody;

      try {
        const error = validateRequestStrings(name, textBody);
        if (error) {
          return res
            .status(400)
            .send('Error: name and textBody must be strings');
        }

        const bookRepo = getConnection().getRepository(Book);
        const newBook = bookRepo.create({ name, textBody });
        return await bookRepo.save(newBook);
      } catch (e) {
        console.error(e);
        res.status(500).send(e);
      }
    }
  );

  app.get(
    '/books/:id',
    async (
      req: Request<GetOneParams, null, null, null>,
      res: Response
    ) => {
      const params = req.params;
      const id = params?.id;
      try {
        const error = validateRequestStrings(id);
        if (error) {
          return res
            .status(400)
            .send('Error: name and textBody must be strings');
        }

        const bookRepo = getConnection().getRepository(Book);
        return await bookRepo.findOne(id);
      } catch (e) {
        console.error(e);
        res.status(500).send(e);
      }
    }
  );

  app.get(
    '/books',
    async (req: Request<null, null, null, null>, res: Response) => {
      try {
        const bookRepo = getConnection().getRepository(Book);
        return await bookRepo.find();
      } catch (e) {
        console.error(e);
        res.status(500).send(e);
      }
    }
  );

  app.put(
    '/book/:id',
    async (
      req: Request<GetOneParams, null, Partial<BookPut>, null>,
      res: Response
    ) => {
      const params = req.params;
      const id = params?.id;

      const body = req.body;
      const name = body?.name;
      const sequenceNum = body?.sequenceNum;
      const textBody = body?.textBody;

      try {
        const paramsError = validateRequestStrings(id);
        if (paramsError) {
          return res.status(400).send('Error: id must be strings');
        }

        const bodyError =
          validateRequestStrings(name, textBody) &&
          validateRequestNumbers(sequenceNum);
        if (bodyError) {
          return res
            .status(400)
            .send('Error: name and textBody must be strings');
        }

        const bookRepo = getConnection().getRepository(Book);
        const oldBook = await bookRepo.findOne(id);
        if (oldBook) {
          const newBook = bookRepo.merge(oldBook, {
            name,
            sequenceNum,
            textBody
          });
          return await bookRepo.save(newBook);
        }
        return null;
      } catch (e) {
        console.error(e);
        res.status(500).send(e);
      }
    }
  );

  app.get(
    '/chapters/:bookId',
    async (
      req: Request<getChapterParams, null, null, null>,
      res: Response
    ): Promise<Chapter[] | null | Response> => {
      const params = req.params;
      const id = params?.bookId;
      try {
        const error = validateRequestStrings(id);
        if (error) {
          return res
            .status(400)
            .send('Error: name and textBody must be strings');
        }

        const bookRepo = getConnection().getRepository(Book);
        const book = await bookRepo.findOne({ id });
        if (book) {
          return book.chapters;
        } else {
          return null;
        }
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    }
  );

  app.get(
    '/chapters',
    async (req: Request<null, null, null, null>, res: Response) => {
      try {
        const chapterRepo = getConnection().getRepository(Chapter);
        return await chapterRepo.find();
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    }
  );

  app.post(
    '/chapters',
    async (
      req: Request<null, null, ChapterPost, null>,
      res: Response
    ) => {
      const body = req.body;
      const name = body?.name;
      const textBody = body?.textBody;
      const bookId = body?.bookId;

      try {
        const error = validateRequestStrings(name, textBody, bookId);
        if (error) {
          return res
            .status(400)
            .send('Error: name and textBody must be strings');
        }

        const bookRepo = getConnection().getRepository(Book);
        const book = await bookRepo.findOne({ id: bookId });
        if (!book) {
          return res.status(406).send('Error: Book does not exist');
        }

        const chapterRepo = getConnection().getRepository(Chapter);
        const newChapter = chapterRepo.create({
          name,
          textBody
        });
        book.chapters = [...book.chapters, newChapter];

        return await bookRepo.save(book);
      } catch (e) {
        console.error(e);
        res.status(500).send(e);
      }
    }
  );

  app.put(
    '/chapters/:id',
    async (
      req: Request<GetOneParams, null, Partial<ChapterPut>, null>,
      res: Response
    ): Promise<Response | null> => {
      const params = req.params;
      const id = params?.id;

      const body = req.body;
      const name = body?.name;
      const sequenceNum = body?.sequenceNum;
      const textBody = body?.textBody;

      try {
        const error = validateRequestStrings(id);
        if (error) {
          return res.status(400).send('Error: id must be strings');
        }

        const chapterRepo = getConnection().getRepository(Chapter);
        const oldChapter = await chapterRepo.findOne({ id });
        if (oldChapter) {
          const newChapter = chapterRepo.merge(oldChapter, {
            name: name || oldChapter.name,
            textBody: textBody || oldChapter.textBody,
            sequenceNum:
              parseInt(sequenceNum as string) ||
              oldChapter.sequenceNum
          });
          await chapterRepo.save(newChapter);
          res.status(200).send(newChapter);
        }
        return null;
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    }
  );

  // app.post('/section', (req: Request, res: Response) => {});
  // app.get('/section/:id', (req: Request, res: Response) => {});
  // app.put('/section/:id', (req: Request, res: Response) => {});

  // app.post('/node', (req: Request, res: Response) => {});
  // app.get('/node/:id', (req: Request, res: Response) => {});
  // app.put('/node/:id', (req: Request, res: Response) => {});
};

const start = async () => {
  await init();
  app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
};

start();
