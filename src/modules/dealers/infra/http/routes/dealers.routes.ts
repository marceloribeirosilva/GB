import { Router } from 'express';
import DealersController from '@modules/dealers/infra/http/controllers/DealersController';

const dealersRouter = Router();
const dealersController = new DealersController();

dealersRouter.post('/', dealersController.create);

export default dealersRouter;
