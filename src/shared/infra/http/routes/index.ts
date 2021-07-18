import { Router } from 'express';

import ordersRouter from '@modules/orders/infra/http/routes/orders.route';
import dealerRouter from './dealer';

const routes = Router();

routes.use('/dealers', dealerRouter);
routes.use('/orders', ordersRouter)

export default routes;
