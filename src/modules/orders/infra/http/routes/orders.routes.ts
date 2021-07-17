import { Router } from 'express';
import OrdersController from '@modules/orders/infra/http/controllers/OrdersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const ordersRouter = Router();
// ordersRouter.use(ensureAuthenticated);

const ordersController = new OrdersController();

ordersRouter.get('/', ensureAuthenticated, ordersController.getAllOpenOrders);
ordersRouter.get(
  '/:numberOrder',
  ensureAuthenticated,
  ordersController.getOrderbyId,
);

export default ordersRouter;
