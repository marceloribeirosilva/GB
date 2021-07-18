import { Router } from 'express';
import OrdersController from '@modules/orders/infra/http/controllers/OrdersController';
import ensureAuthenticated from '@modules/dealers/infra/http/middlewares/ensureAuthenticated';

const ordersRouter = Router();
ordersRouter.use(ensureAuthenticated);

const ordersController = new OrdersController();

ordersRouter.post('/', ordersController.create);
ordersRouter.put('/:id', ordersController.update);
ordersRouter.delete('/:id', ordersController.delete);

export default ordersRouter;
