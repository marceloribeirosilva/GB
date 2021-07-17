import { Router } from 'express';
import CallbacksController from '../controllers/CallbacksController';

const callbacksRouter = Router();

const callbacksController = new CallbacksController();

callbacksRouter.post('/order', callbacksController.dispatchOrder);
callbacksRouter.post('/order/json', callbacksController.dispatchJson);
callbacksRouter.post('/payment', callbacksController.dispatchPayment);

export default callbacksRouter;
