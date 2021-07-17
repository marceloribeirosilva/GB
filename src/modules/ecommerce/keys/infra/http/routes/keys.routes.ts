import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import KeysByIDAutcomController from '../controllers/KeysByIDAutcomController';

const keysRouter = Router();

keysRouter.use(ensureAuthenticated);

const keysByIDAutcomController = new KeysByIDAutcomController();
keysRouter.get('/:id/:source', keysByIDAutcomController.show);
keysRouter.get('/:source', keysByIDAutcomController.showList);

export default keysRouter;
