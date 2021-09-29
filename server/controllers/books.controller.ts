import express, { Request, Response, Router } from 'express';
import { Connection } from 'typeorm';
import { Book } from '../database/models';
import { validateRequestStrings } from '../utils';

import { BookPost, GetOneParams, BookPut } from './types';

const BooksController = (connection: Connection): Router => {
  const bookRouter = express.Router();

  bookRouter
    .route('/books')
    .get(async function (
      req: Request<null, null, null, null>,
      res: Response
    ): Promise<Response> {
      try {
        const bookRepo = connection.getRepository(Book);
        const books = await bookRepo.find({ relations: ['chapters'] });
        return res.status(200).send(books);
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    })
    .post(async function (
      req: Request<null, null, BookPost, null>,
      res: Response
    ) {
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
    });

  bookRouter
    .route('/books/:id')
    .get(async function (
      req: Request<GetOneParams, null, null, null>,
      res: Response
    ): Promise<Response> {
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
    })
    .put(async function (
      req: Request<GetOneParams, null, Partial<BookPut>, null>,
      res: Response
    ): Promise<Response> {
      const params = req.params;
      const id = params?.id;

      const body = req.body;
      const name = body?.name;
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
    });

  return bookRouter;
};

export default BooksController;
