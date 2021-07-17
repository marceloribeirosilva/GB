import { Router } from 'express';

import FiltersAnyShopController from '@modules/ecommerce/filters/infra/http/controllers/FiltersAnyShopController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const filtersRouter = Router();

filtersRouter.use(ensureAuthenticated);

const filtersAnyController = new FiltersAnyShopController();
filtersRouter.post('/anyshop', filtersAnyController.create);

export default filtersRouter;
