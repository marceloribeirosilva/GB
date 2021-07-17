import { Router } from 'express';

import sessionsRouter from '@modules/dealers/infra/http/routes/sessions.routes';
import dealersRouter from '@modules/dealers/infra/http/routes/dealers.routes';

const dealerRouter = Router();

dealerRouter.use('/create', dealersRouter);
dealerRouter.use('/sessions', sessionsRouter);

export default dealerRouter;
