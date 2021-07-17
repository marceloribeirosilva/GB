import { Router } from 'express';

import ClientsAnyShopController from '@modules/ecommerce/clients/infra/http/controllers/ClientsAnyShopController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated);

const clientsAnyController = new ClientsAnyShopController();
clientsRouter.put('/anyshop/:idAnyShop', clientsAnyController.update);

export default clientsRouter;
