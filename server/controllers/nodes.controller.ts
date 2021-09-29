import { Request, Response, Router } from 'express';
import { Connection } from 'typeorm';

const NodesController = (connection: Connection) => {
  const nodeRouter = Router();

  nodeRouter.route('/nodes').post(async function (req: Request, res: Response) {
    console.debug('This is for the future!');
  });

  nodeRouter
    .route('/nodes/:id')
    .get(async function (req: Request, res: Response) {
      console.debug('This is for the future!');
    })
    .put(async function (req: Request, res: Response) {
      console.debug('This is for the future!');
    });

  return nodeRouter;
};

export default NodesController;
