import { Router } from 'express';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const customersRouter = Router();
customersRouter.use(ensureAuthenticated);

const customersController = new CustomersController();

customersRouter.get('/:document', customersController.getCustomerByDocument);
customersRouter.get(
  '/:customerCode/orders',
  customersController.getOrdersByCustomer,
);

export default customersRouter;
