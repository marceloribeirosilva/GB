import { Router } from 'express';

import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import callbacksRouter from '@modules/ecommerce/callbacks/infra/http/routes/callbacks.routes';
import appNotificationsRouter from '@modules/app_notifications/infra/http/routes/app_notifications.routes';
import ecommerceRouter from './ecommerce';
import dealerRouter from './dealer';

const routes = Router();

routes.use('/dealers', dealerRouter);
routes.use('/orders', ordersRouter);
routes.use('/customers', customersRouter);
routes.use('/ecommerce', ecommerceRouter);
routes.use('/callbacks', callbacksRouter);
routes.use('/notifications', appNotificationsRouter);

export default routes;
