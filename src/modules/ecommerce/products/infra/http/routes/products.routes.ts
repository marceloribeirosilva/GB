import { Router } from 'express';

import ProductsAnyShopController from '@modules/ecommerce/products/infra/http/controllers/ProductsAnyShopController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

const productsAnyController = new ProductsAnyShopController();
productsRouter.get('/anyshop/pagina/:page', productsAnyController.get);
productsRouter.post('/anyshop', productsAnyController.create);
productsRouter.put('/anyshop', productsAnyController.update);
productsRouter.put('/anyshop/stock', productsAnyController.updateStock);
productsRouter.put('/anyshop/price', productsAnyController.updatePrice);
productsRouter.put(
  '/anyshop/pricestock',
  productsAnyController.updatePriceStock,
);
productsRouter.put('/anyshop/filter', productsAnyController.updateFilter);

export default productsRouter;
