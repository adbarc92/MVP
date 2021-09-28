import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

import {
  BookPost,
  GetOneParams,
  BookPut,
  getChapterParams,
  ChapterPost,
  ChapterPut
} from './types';
import { validateRequestStrings } from './utils';
import { initConnection } from './database';
import { Book, Chapter, Node, Section } from './database/models';

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

// app.use('/books', bookRouter);

const init = async () => {
  try {
    const connection = await initConnection();

    if (connection) {
      app.post(
        '/books',
        async (
          req: Request<null, null, BookPost, null>,
          res: Response
        ): Promise<Response> => {
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

            const bookRepo = connection.getRepository(Book);
            const newBook = bookRepo.create({ name, textBody });
            await bookRepo.save(newBook);
            const books = await bookRepo.find();
            return res.status(201).send(books);
          } catch (e) {
            console.error(e);
            return res.status(500).send(e);
          }
        }
      );

      app.get(
        '/books',
        async (
          req: Request<null, null, null, null>,
          res: Response
        ): Promise<Response> => {
          try {
            const bookRepo = connection.getRepository(Book);
            const books = await bookRepo.find({ relations: ['chapters'] });
            console.log('books:', books);
            return res.status(200).send(books);
          } catch (e) {
            console.error(e);
            return res.status(500).send(e);
          }
        }
      );

      // Book Routes
      app.get(
        '/books/:id',
        async (
          req: Request<GetOneParams, null, null, null>,
          res: Response
        ): Promise<Response> => {
          const params = req.params;
          const id = params?.id;
          try {
            const error = validateRequestStrings(id);
            if (error) {
              return res
                .status(400)
                .send('Error: name and textBody must be strings');
            }

            const bookRepo = connection.getRepository(Book);
            const book = await bookRepo.findOne(id, {
              relations: ['chapters']
            });
            return res.status(200).send(book);
          } catch (e) {
            console.error(e);
            return res.status(500).send(e);
          }
        }
      );

      app.put(
        '/books/:id',
        async (
          req: Request<GetOneParams, null, Partial<BookPut>, null>,
          res: Response
        ): Promise<Response> => {
          const params = req.params;
          const id = params?.id;

          const body = req.body;
          const name = body?.name;
          // const sequenceNum = body?.sequenceNum;
          const textBody = body?.textBody;

          try {
            const paramsError = validateRequestStrings(id);
            if (paramsError) {
              return res.status(400).send('Error: id must be strings');
            }

            const bodyError = validateRequestStrings(name, textBody); // TODO: Validate sequence
            if (bodyError) {
              return res
                .status(400)
                .send('Error: name and textBody must be strings');
            }

            const bookRepo = connection.getRepository(Book);
            const oldBook = await bookRepo.findOne(id);
            if (oldBook) {
              const newBook = bookRepo.merge(oldBook, {
                name,
                textBody
              });
              const book = await bookRepo.save(newBook);
              res.status(201).send(book);
            }
            return res.status(406).send('Book does not exist');
          } catch (e) {
            console.error(e);
            return res.status(500).send(e);
          }
        }
      );

      // Chapter Routes
      app.get(
        '/chapters/:bookId',
        async (
          req: Request<getChapterParams, null, null, null>,
          res: Response
        ): Promise<Response> => {
          const params = req.params;
          const id = params?.bookId;
          try {
            const error = validateRequestStrings(id);
            if (error) {
              return res
                .status(400)
                .send('Error: name and textBody must be strings');
            }

            const bookRepo = connection.getRepository(Book);
            const book = await bookRepo.findOne({ id });
            if (book) {
              return res.status(200).send(book.chapters);
            } else {
              return res.status(406).send('No such resource exists');
            }
          } catch (e) {
            console.error(e);
            return res.status(500).send(e);
          }
        }
      );

      app.get(
        '/chapters',
        async (
          req: Request<null, null, null, null>,
          res: Response
        ): Promise<Response> => {
          try {
            const chapterRepo = connection.getRepository(Chapter);
            const chapters = await chapterRepo.find();
            return res.status(200).send(chapters);
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
        ): Promise<Response> => {
          const body = req.body;
          const name = body?.name;
          const textBody = body?.textBody;
          const bookId = body?.bookId;

          try {
            const error = validateRequestStrings(name, textBody, bookId);
            if (error) {
              return res
                .status(400)
                .send('Error: name, textBody, and bookId must be strings');
            }

            const bookRepo = connection.getRepository(Book);
            const book = await bookRepo.findOne(
              { id: bookId },
              { relations: ['chapters'] }
            );
            if (!book) {
              return res.status(406).send('Error: Book does not exist');
            }

            const chapterRepo = connection.getRepository(Chapter);
            const newChapter = chapterRepo.create({
              name,
              textBody
            });

            console.debug('');

            if (book.chapters) {
              book.chapters = [...book.chapters, newChapter];
            } else {
              book.chapters = [newChapter];
            }

            await connection.manager.save(newChapter);
            const savedBook = await connection.manager.save(book);
            return res.status(200).send(savedBook);
          } catch (e) {
            console.error(e);
            return res.status(500).send(e);
          }
        }
      );

      app.put(
        '/chapters/:id',
        async (
          req: Request<GetOneParams, null, Partial<ChapterPut>, null>,
          res: Response
        ): Promise<Response> => {
          const params = req.params;
          const id = params?.id;

          console.log('chapterPut req.body', req.body);

          const body = req.body;
          const name = body?.name;
          const bookId = body?.bookId;
          // const sequenceNum = body?.sequenceNum;
          const textBody = body?.textBody;

          try {
            const error = validateRequestStrings(id, bookId);
            if (error) {
              return res
                .status(400)
                .send('Error: id and bookId must be strings');
            }

            const chapterRepo = connection.getRepository(Chapter);
            const oldChapter = await chapterRepo.findOne({ id });
            if (oldChapter) {
              const newChapter = chapterRepo.merge(oldChapter, {
                name: name || oldChapter.name,
                textBody: textBody || oldChapter.textBody
                // sequenceNum:
                //   parseInt(sequenceNum as string) || oldChapter.sequenceNum
              });
              await chapterRepo.save(newChapter);
              const book = await connection
                .getRepository(Book)
                .findOne({ id: bookId }, { relations: ['chapters'] });
              if (!book) {
                return res
                  .status(406)
                  .send('An inexplicable misfire has occurred');
              } else {
                return res.status(200).send(book);
              }
            }
            return res.status(406).send('No such chapter exists');
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
    console.log(`Server running on port:${PORT}`);
  });
};

start();
