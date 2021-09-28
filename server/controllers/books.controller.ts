import express, { Request, Response } from 'express';

const bookRouter = express.Router();

bookRouter
  .route('/books')
  .get(async function (req: Request, res: Response): Promise<Response> {
    try {
      const bookRepo = connection.getRepository(Book);
      const books = await bookRepo.find({ relations: ['chapters'] });
      console.log('books:', books);
      return res.status(200).send(books);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  })
  .post(function (req: Request, res: Response) {});
