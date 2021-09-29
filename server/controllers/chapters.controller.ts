import { Request, Response, Router } from 'express';
import { Connection } from 'typeorm';
import { Book, Chapter } from '../database/models';
import { validateRequestStrings } from '../utils';
import { GetOneParams, ChapterPost, ChapterPut } from './types';

const ChaptersController = (connection: Connection): Router => {
  const chapterRouter = Router();

  chapterRouter
    .route('/chapters')
    .get(async function (
      req: Request<null, null, null, null>,
      res: Response
    ): Promise<Response> {
      try {
        const chapterRepo = connection.getRepository(Chapter);
        const chapters = await chapterRepo.find();
        return res.status(200).send(chapters);
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    })
    .post(async function (
      req: Request<null, null, ChapterPost, null>,
      res: Response
    ) {
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
    });

  chapterRouter
    .route('/chapters/:id')
    .get(async function (
      req: Request<GetOneParams, null, null, null>,
      res: Response
    ) {
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
    })
    .put(async function (
      req: Request<GetOneParams, null, Partial<ChapterPut>, null>,
      res: Response
    ): Promise<Response> {
      const params = req.params;
      const id = params?.id;

      const body = req.body;
      const name = body?.name;
      const bookId = body?.bookId;
      const textBody = body?.textBody;

      try {
        const error = validateRequestStrings(id, bookId);
        if (error) {
          return res.status(400).send('Error: id and bookId must be strings');
        }

        const chapterRepo = connection.getRepository(Chapter);
        const oldChapter = await chapterRepo.findOne({ id });
        if (oldChapter) {
          const newChapter = chapterRepo.merge(oldChapter, {
            name: name || oldChapter.name,
            textBody: textBody || oldChapter.textBody
          });
          await chapterRepo.save(newChapter);
          const book = await connection
            .getRepository(Book)
            .findOne({ id: bookId }, { relations: ['chapters'] });
          if (!book) {
            return res.status(406).send('An inexplicable misfire has occurred');
          } else {
            return res.status(200).send(book);
          }
        }
        return res.status(406).send('No such chapter exists');
      } catch (e) {
        console.error(e);
        return res.status(500).send(e);
      }
    });

  return chapterRouter;
};

export default ChaptersController;
