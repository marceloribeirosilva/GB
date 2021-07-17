import { Router } from 'express';

import clientsRouter from '@modules/ecommerce/clients/infra/http/routes/clients.routes';
import productsRouter from '@modules/ecommerce/products/infra/http/routes/products.routes';
import keysRouter from '@modules/ecommerce/keys/infra/http/routes/keys.routes';
import filtersRouter from '@modules/ecommerce/filters/infra/http/routes/filters.routes';

const ecommerceRouter = Router();

ecommerceRouter.use('/clients', clientsRouter);
ecommerceRouter.use('/products', productsRouter);
ecommerceRouter.use('/filters', filtersRouter);
ecommerceRouter.use('/keys', keysRouter);

export default ecommerceRouter;
