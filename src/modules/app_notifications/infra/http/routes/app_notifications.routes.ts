import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppNotificationsController from '../controllers/AppNotificationsController';

const notificationsRouter = Router();
notificationsRouter.use(ensureAuthenticated);

const notificationsController = new AppNotificationsController();

notificationsRouter.post('/push', notificationsController.postNotifications);

export default notificationsRouter;
