import { Router } from 'express';
import ReportsController from '@modules/reports/infra/http/controllers/ReportsController';
import ensureAuthenticated from '@modules/dealers/infra/http/middlewares/ensureAuthenticated';

const reportsRouter = Router();
reportsRouter.use(ensureAuthenticated);

const reportsController = new ReportsController();

reportsRouter.get('/orders/:cpf', reportsController.showOrders);
reportsRouter.get('/cashback/:cpf', reportsController.showTotalCashback);

export default reportsRouter;
