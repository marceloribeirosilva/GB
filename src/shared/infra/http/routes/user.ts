import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const userRouter = Router();

userRouter.use('/create', usersRouter);
userRouter.use('/sessions', sessionsRouter);

export default userRouter;
