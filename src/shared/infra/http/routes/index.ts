import { Router } from 'express';

import ordersRouter from '@modules/orders/infra/http/routes/orders.route';
import dealerRouter from './dealer';
import reportsRouter from '@modules/reports/infra/http/routes/reports.route';

const routes = Router();

routes.use('/dealers', dealerRouter);
routes.use('/orders', ordersRouter)
routes.use('/reports', reportsRouter)

export default routes;
