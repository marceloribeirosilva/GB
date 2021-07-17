import { Router } from 'express';

import dealerRouter from './dealer';

const routes = Router();

routes.use('/dealers', dealerRouter);

export default routes;
